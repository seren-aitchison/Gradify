// The production loop for one topic: research (once, cached by fingerprint) → write → gates (cheapest first) →
// review → repair (changed lines only, up to config.repairs times) → file the passing lessons → record the rest.
// `ask` (one call) and `askMany` (parallel or batched) are injected, so tests run the whole loop with a fake model.
import { readFileSync, existsSync } from "node:fs";
import { CONFIG, at, fp, save, slug, today, briefPath, draftPath, loadLedger, saveLedger } from "./lib.mjs";
import { packet, parseBrief, parseVerdicts, fixList, parseRepairs, applyRepair, splitUnit, numbered } from "./shorthand.mjs";
import { runGates } from "./gates.mjs";
import { diagramsFor, reqHash } from "./queue.mjs";

const PROMPT_FP = () => fp(["research.md", "writer.md", "review.md"].map((f) => existsSync(at(`prompts/${f}`)) ? readFileSync(at(`prompts/${f}`), "utf8") : "").join("\n"));

// ---------- research: one brief per topic, reused by every board and level; redone only when its inputs change ----------
export async function research(topic, { ask, force = false } = {}) {
  const key = fp({ reqs: topic.reqs.map((r) => r.hash).sort(), level: topic.level, prompt: fp(existsSync(at("prompts/research.md")) ? readFileSync(at("prompts/research.md"), "utf8") : "") });
  const file = briefPath(topic.id), old = existsSync(file) ? readFileSync(file, "utf8") : null;
  if (!force && old && old.startsWith(`# fp=${key}`) && !parseBrief(old).problems.length) return { brief: old, parsed: parseBrief(old), cached: true, key };
  const req = [`RESEARCH ${topic.id} | levels=${topic.level} | reqs=${topic.reqs.map((r) => r.id).join(",")} | ctry=${topic.country}`,
    ...topic.reqs.map((r) => `REQ ${r.id} | ${String(r.asks).replace(/\s+/g, " ")}`), ...(old ? ["EXISTING", old.replace(/^#.*\n/, "")] : []), "END"].join("\n");
  let text = await ask("research", req), parsed = parseBrief(text);
  if (parsed.problems.length) { text = await ask("research", `${req}\nPROBLEMS ${parsed.problems.join("; ")}\nFix these and return the whole brief.`); parsed = parseBrief(text); }
  if (parsed.problems.length) return { brief: null, parsed, cached: false };
  const brief = `# fp=${key} · ${today()}\n${text.trim().replace(/\nEND\s*$/, "")}\nEND\n`;
  save(file, brief);
  return { brief, parsed, cached: false, key };
}

const reviewRequest = (s, topic, brief) => [`LESSON ${s.key}`, numbered(s.text), ...topic.reqs.map((r) => `REQ ${r.id} | ${String(r.asks).replace(/\s+/g, " ")}`), `BRIEF ${topic.id}`, brief.replace(/^#.*\n/, "").trim()].join("\n");
const repairRequest = (s, pkt) => [fixList(s.key, s.issues), `LESSON ${s.key}`, numbered(s.text), pkt].join("\n");
const isHighRisk = (topic, s, parsedBrief) => {
  const t = s.text.toLowerCase(), hr = CONFIG.highRisk;
  return { conflict: parsedBrief.conflicts.length > 0, risk: topic.reqs.some((r) => hr.types.includes(r.type)) || /^NUM/m.test(s.text) || hr.keywords.some((k) => t.includes(k)) };
};

/** write, check, review and repair one topic's lessons; file what passes; return the record for the ledger and PR */
export async function runTopic(topic, { ask, askMany, render = null, legible = null, log = () => {} } = {}) {
  const rec = { topic: topic.id, fw: topic.fw, section: topic.section, title: topic.title, date: today(), lessons: [], failures: [], uncovered: [], gaps: [], needs: [], brief: null };
  const r = await research(topic, { ask });
  if (!r.brief) { rec.failures.push({ title: "(research)", gate: "brief", issues: r.parsed.problems.map((p) => ({ code: "SRC", line: null, note: p })) }); return finish(topic, rec); }
  rec.brief = r.cached ? "reused" : "new";
  const { diagrams, renderers } = diagramsFor(topic);
  const pkt = packet({ id: `${topic.fw}/${topic.section}`, subject: topic.subject, level: topic.level, country: topic.country, framework: topic.fw, reqs: topic.reqs, reuse: topic.reuse, diagrams, renderers, brief: r.brief.replace(/^#.*\n/, "") });
  const unit = await ask("write", pkt);
  const states = splitUnit(unit).map((l, i) => ({ key: `new#${i + 1}`, title: l.title, text: l.text, issues: [], reviewFails: 0, gateFails: 0, done: false, failedAt: null }));
  if (!states.length) { rec.failures.push({ title: "(unit)", gate: "parse", issues: [{ code: "FMT", line: null, note: "the Writer returned no lessons" }] }); return finish(topic, rec); }
  const allowed = new Set(topic.reqs.map((x) => x.id)), opts = { reqs: topic.reqs, allowed, render, legible };
  let active = states;
  for (let round = 0; round <= CONFIG.repairs && active.length; round++) {
    const fix = [], toReview = [];
    for (const s of active) {
      const g = await runGates(s.text, opts);
      if (g.ok) { s.lesson = g.lesson; toReview.push(s); } else { s.issues = g.failed.issues; s.failedAt = g.failed.gate; s.gateFails++; fix.push(s); }
    }
    if (toReview.length) {
      const out = await askMany("review", toReview.map((s) => ({ key: s.key, user: reviewRequest(s, topic, r.brief) })));
      for (const s of toReview) {
        const res = out.get(s.key);
        const v = res instanceof Error ? { ok: false, issues: [{ code: "CLR", line: null, note: `review call failed: ${res.message}` }] } : parseVerdicts(res)[0] || { ok: false, issues: [{ code: "CLR", line: null, note: "reviewer returned no verdict" }] };
        if (v.ok) s.done = true; else { s.issues = v.issues; s.failedAt = "review"; s.reviewFails++; fix.push(s); }
      }
    }
    log(`  round ${round}: ${states.filter((s) => s.done).length}/${states.length} pass${fix.length ? `, ${fix.length} to repair` : ""}`);
    if (round === CONFIG.repairs || !fix.length) { active = fix; break; }
    const reps = await askMany("repair", fix.map((s) => ({ key: s.key, user: repairRequest(s, pkt) })));
    for (const s of fix) {
      const res = reps.get(s.key), ops = res instanceof Error ? null : parseRepairs(res).get(s.key) || [...parseRepairs(res).values()][0];
      if (!ops?.length) continue;
      try { s.text = applyRepair(s.text, ops); } catch (e) { s.issues = [{ code: "FMT", line: null, note: e.message }]; }
    }
    active = fix;
  }
  // file what passed; record what didn't
  const passed = states.filter((s) => s.done);
  for (const s of passed) {
    const flags = isHighRisk(topic, s, r.parsed);
    rec.lessons.push({ title: s.title, tier: flags.risk || flags.conflict ? "expert-required" : "ai-verified", reqs: s.lesson.reqs.map((x) => x.id), disagreed: s.reviewFails > 0, repairs: s.gateFails + s.reviewFails, ...(flags.conflict ? { conflict: true } : {}), ...(flags.risk ? { highRisk: true } : {}), hash: fp(s.text),
      // the build record: everything this lesson was made from, so a change to any of them lists it for rebuilding
      built: { brief: r.key, prompts: PROMPT_FP(), models: { write: CONFIG.models.write, review: CONFIG.models.review }, reqs: topic.reqs.filter((x) => s.lesson.reqs.some((y) => y.id === x.id)).map((x) => `${x.id}@${x.hash}`) } });
    rec.gaps.push(...s.lesson.gaps.map((g) => `${s.title}: ${g}`)); rec.needs.push(...s.lesson.needs.map((g) => `${s.title}: ${g}`));
  }
  for (const s of states.filter((s) => !s.done)) rec.failures.push({ title: s.title, gate: s.failedAt, issues: s.issues.slice(0, 6) });
  const covered = new Set(rec.lessons.flatMap((l) => l.reqs));
  rec.uncovered = topic.reqs.filter((x) => !covered.has(x.id)).map((x) => x.id);
  if (passed.length) {
    const file = draftPath(topic.subject, topic.fw, slug(topic.title)), prior = topic.append && existsSync(file) ? readFileSync(file, "utf8").replace(/\n+$/, "") : null;
    const head = `# draft · ${topic.fw} ${topic.section} ${topic.title} · written by the content engine (scripts/gradify.mjs) · not yet published\n# tiers and review history: content/ledger/${topic.subject}.json`;
    save(file, `${prior || head}\n\n${passed.map((s) => s.text).join("\n\n")}\n`);
  }
  return finish(topic, rec);
}

/** record the topic in its subject's ledger: filed, partial (some requirements left), failed, or blocked */
function finish(topic, rec) {
  const led = loadLedger(topic.subject), e = led.topics[topic.id] || { runs: 0, lessons: [] };
  e.runs++; e.lastRun = rec.date; e.reqHash = reqHash(topic.full || topic);
  e.file = `content/drafts/${topic.subject}/${topic.fw}/${slug(topic.title)}.txt`;
  e.lessons = [...(topic.append ? e.lessons : []), ...rec.lessons];
  e.failures = rec.failures; e.uncovered = rec.uncovered; e.gaps = rec.gaps; e.needs = rec.needs;
  e.status = rec.lessons.length || e.lessons.length ? (rec.uncovered.length ? "partial" : "filed") : e.runs >= CONFIG.repairs ? "blocked" : "failed";
  if (e.status === "partial" && e.runs >= CONFIG.repairs + 1) e.status = "filed-with-gaps";
  led.topics[topic.id] = e; saveLedger(led);
  return { ...rec, status: e.status };
}
