// The production loop for one topic: research (once, cached by fingerprint) → write → gates (cheapest first) →
// review → repair (changed lines only, up to config.repairs times) → file the passing lessons → record the rest.
// Two drivers share everything here: runTopic (API calls, injected as `ask`/`askMany`, so tests use a fake model) and
// agent mode (scripts/content/agent.mjs: a Claude Code session and its subagents, exchanging files).
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { titleKey } from "../../kit/course/syllabus.js";
import { SPECS } from "../../kit/curriculum/uk.js";
import { loadIndex } from "../curriculum/engine.mjs";
import { CONFIG, at, fp, save, slug, today, briefPath, draftPath, loadLedger, saveLedger } from "./lib.mjs";
import { packet, parseBrief, parseVerdicts, fixList, parseRepairs, applyRepair, splitUnit, numbered, parentOf } from "./shorthand.mjs";
import { runGates } from "./gates.mjs";
import { diagramsFor, reqHash } from "./queue.mjs";
import { longestSharedRun } from "../knowledge/lib.mjs";
import { SOURCES, sourceFor, classOf } from "../../kit/curriculum/sources.js";

import { briefKey, buildRecord, currentModels, targetKey } from "./build.mjs";
export { briefKey } from "./build.mjs";

export { PART, parentOf } from "./shorthand.mjs";

// ---------- research briefs: parsed, licence-checked, fingerprinted ----------
export const BLOCKED_LICENCES = new Set(["noncommercial", "unknown", ""]);
/**
 * The licence gate: nothing derived from a source without adaptation rights is filed (RULES.md, rule 6). Facts (F:)
 * aren't anyone's expression, so they may rest on any source. Every other line must not rest only on sources whose
 * licence is noncommercial or unknown: cited lines by their own sources, uncited ones (DEF, MIS, VAR) by the brief's.
 */
export function licenceProblems(b) {
  const lic = new Map(b.sources.map((s) => [s.id, String(s.licence || "").toLowerCase()])), bad = (ids) => ids.length && ids.every((id) => BLOCKED_LICENCES.has(lic.get(id) ?? ""));
  const ids = (s) => String(s || "").split(/[ ,]+/).filter((x) => lic.has(x)), out = [];
  const cited = (s) => String(s || "").split(/[ ,]+/).filter(Boolean);
  for (const [tag, rows, col] of [["EXAM", b.exam, 1], ["NUM", b.nums, 1], ["CONFLICT", b.conflicts, 1]]) for (const r of rows) {
    // a citation that names no listed source supports nothing, so it can't pass the gate by being filtered out
    const unknown = cited(r[col]).filter((id) => !lic.has(id));
    if (unknown.length) out.push(`licence: ${tag} "${String(r[0]).slice(0, 40)}" cites ${unknown.join(", ")}, which the brief doesn't list`);
  }
  for (const [tag, rows, col] of [["EXAM", b.exam, 1], ["NUM", b.nums, 1], ["CONFLICT", b.conflicts, 1]]) for (const r of rows) if (bad(ids(r[col]))) out.push(`licence: ${tag} "${String(r[0]).slice(0, 40)}" rests only on noncommercial or unknown sources`);
  if ((b.defs.length || b.mis.length || b.vars.length) && bad([...lic.keys()])) out.push("licence: every source is noncommercial or unknown, so the brief's definitions and misconceptions can't be used");
  return out;
}
/**
 * The source allowlist (kit/curriculum/sources.js): every cited source must belong to a listed publication, and its
 * licence class is the row's (adapt only once a person confirmed it), whatever the Researcher wrote. Returns the
 * problems, and rewrites each source's licence in place. Independence is by owner: two sites of one publisher count once.
 */
export function allowlistProblems(b, rows = SOURCES) {
  const out = [], owners = new Set();
  for (const s of b.sources) {
    const row = sourceFor(s.url, rows), cls = classOf(row);
    if (!row) { out.push(`source ${s.id} (${String(s.url).slice(0, 80)}) isn't on the source allowlist (kit/curriculum/sources.js): use only the sources the request lists`); s.licence = "unknown"; continue; }
    if (!cls) { out.push(`source ${s.id} is ${row.id}, which the allowlist says not to use`); s.licence = "unknown"; continue; }
    s.licence = cls; s.allow = row.id; owners.add(row.owner);
  }
  if (!out.length && owners.size < 3) out.push(`sources come from ${owners.size} publisher${owners.size === 1 ? "" : "s"} on the allowlist: a brief needs at least 3 independent ones`);
  return out;
}
/** the allowlist as the research request gives it: one ALLOW line per usable publication */
export const allowLines = (rows = SOURCES) => rows.filter((r) => classOf(r)).map((r) => `ALLOW ${r.id} | ${r.title} | ${r.urls.join(" ")} | licence=${classOf(r)}`);
/** a brief's text → { parsed, problems }: format, allowlist, licence, and (given the topic) no 8-word run of the
 * specification, since briefs are committed and the specification's text is the awarding body's copyright */
export function checkBrief(text, topic = null) {
  const parsed = parseBrief(text), allow = parsed.problems.length ? [] : allowlistProblems(parsed);
  const problems = [...parsed.problems, ...allow, ...(parsed.problems.length ? [] : licenceProblems(parsed))];
  for (const r of topic?.reqs || []) if (r.text) { const run = longestSharedRun(text, r.text); if (run.words >= 8) problems.push(`copies ${run.words} words of ${r.id}'s wording ("${run.run.split(" ").slice(0, 6).join(" ")}…"): condense it in your own words`); }
  return { parsed, problems };
}
export const stampBrief = (topic, text) => `# fp=${briefKey(topic)} · ${today()}\n${String(text).replace(/^#.*\n/, "").trim().replace(/\nEND\s*$/, "")}\nEND\n`;
/** the topic's stored brief, if it is current (same requirements and research prompt) and passes its checks */
export function currentBrief(topic) {
  const f = briefPath(topic.id); if (!existsSync(f)) return null;
  const text = readFileSync(f, "utf8"); if (!text.startsWith(`# fp=${briefKey(topic)}`)) return null;
  const c = checkBrief(text); return c.problems.length ? null : { brief: text, parsed: c.parsed, key: briefKey(topic) };
}
export const researchRequest = (topic, { old = null, problems = [] } = {}) => [`RESEARCH ${topic.id} | levels=${topic.level} | reqs=${topic.reqs.map((r) => r.id).join(",")} | ctry=${topic.country}`,
  ...topic.reqs.map((r) => `REQ ${r.id} | ${String(r.asks).replace(/\s+/g, " ")}`),
  // only these publications may be cited: the brief is refused if any SRC isn't one of them (allowlistProblems)
  ...allowLines(), "ALLOWED ONLY: cite only sources under these URL prefixes; licence= comes from this list", ...(old ? ["EXISTING", old.replace(/^#.*\n/, "")] : []), ...(problems.length ? [`PROBLEMS ${problems.join("; ")}`, "Fix these and return the whole brief."] : []), "END"].join("\n");

export async function research(topic, { ask, force = false } = {}) {
  const cur = !force && currentBrief(topic); if (cur) return { ...cur, cached: true };
  const old = existsSync(briefPath(topic.id)) ? readFileSync(briefPath(topic.id), "utf8") : null;
  let text = await ask("research", researchRequest(topic, { old })), c = checkBrief(text, topic);
  if (c.problems.length) { text = await ask("research", researchRequest(topic, { old, problems: c.problems })); c = checkBrief(text, topic); }
  if (c.problems.length) return { brief: null, parsed: c.parsed, problems: c.problems, cached: false };
  const brief = stampBrief(topic, text); save(briefPath(topic.id), brief);
  return { brief, parsed: c.parsed, cached: false, key: briefKey(topic) };
}

// ---------- the messages each step sends ----------
export function packetFor(topic, brief) {
  const { diagrams, renderers } = diagramsFor(topic);
  return packet({ id: `${topic.fw}/${topic.section}`, subject: topic.subject, level: topic.level, country: topic.country, framework: topic.fw, reqs: topic.reqs, reuse: topic.reuse, diagrams, renderers, brief: brief.replace(/^#.*\n/, "") });
}
export const reviewRequest = (s, topic, brief) => [`LESSON ${s.key}`, numbered(s.text), ...topic.reqs.map((r) => `REQ ${r.id} | ${String(r.asks).replace(/\s+/g, " ")}`), `BRIEF ${topic.id}`, brief.replace(/^#.*\n/, "").trim()].join("\n");
export const repairRequest = (s, pkt) => [fixList(s.key, s.issues), `LESSON ${s.key}`, numbered(s.text), pkt].join("\n");
export const gateOptions = (topic, { siblings = [], ...extra } = {}) => ({ reqs: topic.reqs, allowed: new Set(topic.reqs.map((x) => x.id)), prereq: prereqResolver(topic.subject, siblings), ...extra });
/**
 * PRE: lines (decision C) resolve to a lesson title in the subject's course or in the unit being written (case and
 * punctuation ignored, as the syllabus matches titles), or to a requirement id of an imported specification.
 */
export function prereqResolver(subject, siblings = []) {
  const dir = at(`kit/courses/${subject}/notes/`), titles = new Set(siblings.map(titleKey));
  if (existsSync(dir)) for (const f of readdirSync(dir).filter((x) => x.endsWith(".js"))) for (const m of readFileSync(new URL(f, dir), "utf8").matchAll(/^## (.+)$/gm)) titles.add(titleKey(m[1]));
  const reqIds = new Set(SPECS.filter((s) => s.statements === "imported").flatMap((s) => (loadIndex(s.id)?.statements || []).map((x) => `${s.id}:${x.ref}`)));
  return (p) => { const v = String(p).trim(); return titles.has(titleKey(v)) || reqIds.has(v) || !!parentOf(v, reqIds); };
}
export const lessonState = (l, i) => ({ key: `new#${i + 1}`, title: l.title, text: l.text, issues: [], reviewFails: 0, gateFails: 0, done: false, failedAt: null });
/** apply a Writer's REPAIR reply to a lesson state; returns false when it changed nothing */
export function applyRepairReply(s, reply) {
  const all = parseRepairs(reply), ops = all.get(s.key) || [...all.values()][0];
  if (!ops?.length) return false;
  try { s.text = applyRepair(s.text, ops); return true; } catch (e) { s.issues = [{ code: "FMT", line: null, note: e.message }]; return false; }
}
/** a reviewer's reply → verdict */
export const verdictOf = (reply) => (reply instanceof Error ? { ok: false, issues: [{ code: "CLR", line: null, note: `review call failed: ${reply.message}` }] } : parseVerdicts(reply)[0] || { ok: false, issues: [{ code: "CLR", line: null, note: "reviewer returned no verdict" }] });

const isHighRisk = (topic, s, parsedBrief) => {
  const t = s.text.toLowerCase(), hr = CONFIG.highRisk;
  return { conflict: parsedBrief.conflicts.length > 0, risk: topic.reqs.some((r) => hr.types.includes(r.type)) || /^NUM/m.test(s.text) || hr.keywords.some((k) => t.includes(k)) };
};

/** write, check, review and repair one topic's lessons; file what passes; return the record for the ledger and PR */
export async function runTopic(topic, { ask, askMany, render = null, legible = null, log = () => {}, reviewed = true } = {}) {
  const r = await research(topic, { ask });
  if (!r.brief) return fileTopic(topic, [], { failures: [{ title: "(research)", gate: "brief", issues: (r.problems || []).map((p) => ({ code: "SRC", line: null, note: p })) }] });
  const pkt = packetFor(topic, r.brief);
  const states = splitUnit(await ask("write", pkt)).map((l, i) => ({ ...lessonState(l, i), models: { write: CONFIG.models.write, review: CONFIG.models.review } }));
  if (!states.length) return fileTopic(topic, [], { brief: r, failures: [{ title: "(unit)", gate: "parse", issues: [{ code: "FMT", line: null, note: "the Writer returned no lessons" }] }] });
  const opts = gateOptions(topic, { render, legible, siblings: states.map((s) => s.title) });
  let active = states, stopped = null;
  try {
    for (let round = 0; round <= CONFIG.repairs && active.length; round++) {
      const fix = [], toReview = [];
      for (const s of active) {
        const g = await runGates(s.text, opts);
        if (g.ok) { s.lesson = g.lesson; toReview.push(s); } else { s.issues = g.failed.issues; s.failedAt = g.failed.gate; s.gateFails++; fix.push(s); }
      }
      if (toReview.length) {
        const out = await askMany("review", toReview.map((s) => ({ key: s.key, user: reviewRequest(s, topic, r.brief) })));
        // a batch that timed out was cancelled: its unanswered reviews aren't failures, and no further paid round starts
        if (out.timedOut) { for (const s of toReview) { const res = out.get(s.key); if (res && !(res instanceof Error) && verdictOf(res).ok) s.done = true; } log(`  ${out.timedOut}: stopping this topic`); break; }
        for (const s of toReview) { const v = verdictOf(out.get(s.key)); if (v.ok) s.done = true; else { s.issues = v.issues; s.failedAt = "review"; s.reviewFails++; fix.push(s); } }
      }
      log(`  round ${round}: ${states.filter((s) => s.done).length}/${states.length} pass${fix.length ? `, ${fix.length} to repair` : ""}`);
      if (round === CONFIG.repairs || !fix.length) break;
      const reps = await askMany("repair", fix.map((s) => ({ key: s.key, user: repairRequest(s, pkt) })));
      if (reps.timedOut) { log(`  ${reps.timedOut}: stopping this topic`); break; }
      for (const s of fix) { const res = reps.get(s.key); if (!(res instanceof Error)) applyRepairReply(s, res); }
      active = fix;
    }
  } catch (e) {
    // out of budget part-way: keep what already passed, leave the rest queued, then stop the run
    if (e?.constructor?.name !== "BudgetExceeded") throw e;
    stopped = e;
  }
  const out = fileTopic(topic, states, { brief: r, reviewed });
  if (stopped) throw Object.assign(stopped, { record: out });
  return out;
}

/**
 * File one topic's results. Passing lessons are merged into the topic's draft by title: a lesson rechecked now replaces
 * its earlier copy, and lessons not part of this pass are kept. `reviewed: false` (gates only, as in a hand ingest
 * without --review) files them as "gates-passed", which claims no review.
 */
export function fileTopic(topic, states, { brief = null, failures = [], reviewed = true } = {}) {
  const rec = { topic: topic.id, fw: topic.fw, section: topic.section, title: topic.title, date: today(), lessons: [], failures: [...failures], uncovered: [], gaps: [], needs: [], brief: brief ? (brief.cached ? "reused" : "new") : null };
  const passed = states.filter((s) => s.done && s.lesson);
  for (const s of passed) {
    const flags = isHighRisk(topic, s, brief.parsed), title = s.lesson.title;
    rec.lessons.push({ title, tier: !reviewed ? "gates-passed" : flags.risk || flags.conflict ? "expert-required" : "ai-verified", reqs: s.lesson.reqs.map((x) => x.id), disagreed: s.reviewFails > 0, repairs: s.gateFails + s.reviewFails, ...(flags.conflict ? { conflict: true } : {}), ...(flags.risk ? { highRisk: true } : {}), hash: fp(s.text),
      // the build record: everything this lesson was made from, so a change to any of them lists it for rebuilding
      built: buildRecord(topic, brief, { models: s.models || currentModels(), reqs: topic.reqs.filter((x) => s.lesson.reqs.some((y) => parentOf(y.id, new Set([x.id])))).map((x) => `${x.id}@${x.hash}`) }) });
    rec.gaps.push(...s.lesson.gaps.map((g) => `${title}: ${g}`)); rec.needs.push(...s.lesson.needs.map((g) => `${title}: ${g}`));
  }
  for (const s of states.filter((s) => !s.done)) rec.failures.push({ title: s.title, gate: s.failedAt || "unfinished", issues: (s.issues || []).slice(0, 6) });
  if (passed.length) {
    const file = draftPath(topic.subject, topic.fw, slug(topic.title)), prior = existsSync(file) ? readFileSync(file, "utf8") : null;
    const head = prior ? prior.split(/\n(?=## )/)[0].replace(/\n+$/, "") : `# draft · ${topic.fw} ${topic.section} ${topic.title} · written by the content engine (scripts/gradify.mjs) · not yet published\n# tiers and review history: content/ledger/${topic.subject}.json`;
    const merged = new Map(prior ? splitUnit(prior).map((l) => [l.title, l.text]) : []);
    for (const s of passed) merged.set(s.lesson.title, s.text);
    save(file, `${head}\n\n${[...merged.values()].join("\n\n")}\n`);
  }
  return finish(topic, rec);
}

/** record the topic in its subject's ledger: filed, partial (some requirements left), failed, or blocked */
function finish(topic, rec) {
  const led = loadLedger(topic.subject), e = led.topics[topic.id] || { runs: 0, lessons: [] };
  e.runs++; e.lastRun = rec.date; e.reqHash = reqHash(topic.full || topic);
  e.file = `content/drafts/${topic.subject}/${topic.fw}/${slug(topic.title)}.txt`;
  Object.assign(e, { title: topic.title, fw: topic.fw, section: topic.section });
  const byTitle = new Map((e.lessons || []).map((l) => [l.title, l]));
  for (const l of rec.lessons) byTitle.set(l.title, l);
  e.lessons = [...byTitle.values()];
  // a rebuild (inputs changed: decision D): an old lesson whose requirements a freshly built lesson now covers is
  // superseded, so it's no longer listed for rebuilding; it stays in the ledger and, if published, in the course
  if (topic.rebuild) {
    const fresh = new Set(rec.lessons.flatMap((l) => l.reqs));
    for (const l of e.lessons) if (!rec.lessons.includes(l) && !l.superseded && l.reqs.length && l.reqs.every((id) => fresh.has(id))) l.superseded = rec.date;
    const key = targetKey(topic.full || topic); e.rebuilds = e.rebuildKey === key ? (e.rebuilds || 0) + 1 : 1; e.rebuildKey = key;
  }
  // a requirement is covered by a lesson naming it, or naming one of its parts
  const all = (topic.full || topic).reqs, known = new Set(all.map((x) => x.id));
  // a lesson covers a requirement only if it was built from that requirement's current text: when a statement changes,
  // the old lesson stays in the draft but its requirement is queued again until a replacement passes
  const hashOf = new Map(all.map((x) => [x.id, x.hash]));
  const current = (l, id) => { const b = l.built?.reqs; if (!b) return true; return b.includes(`${id}@${hashOf.get(id)}`) || !b.some((x) => x.startsWith(`${id}@`)); };
  const covered = new Set(e.lessons.flatMap((l) => l.reqs.map((id) => parentOf(id, known)).filter((id) => id && current(l, id))));
  rec.uncovered = all.filter((x) => !covered.has(x.id)).map((x) => x.id);
  e.failures = rec.failures; e.uncovered = rec.uncovered; e.gaps = rec.gaps; e.needs = rec.needs;
  e.status = e.lessons.length ? (rec.uncovered.length ? "partial" : "filed") : e.runs >= CONFIG.repairs ? "blocked" : "failed";
  if (e.status === "partial" && e.runs >= CONFIG.repairs + 1) e.status = "filed-with-gaps";
  led.topics[topic.id] = e; saveLedger(led);
  return { ...rec, status: e.status };
}
