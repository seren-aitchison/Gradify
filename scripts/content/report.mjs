// Status, generated from the files and git (no database to keep in sync), the rolling PR's description, and the
// handover files a new session reads (knowledge-engine/CORE/). Nothing here is written by hand.
import { readdirSync, existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { CONFIG, at, out, load, save, today, fp, loadLedger, saveLedger } from "./lib.mjs";
import { splitUnit } from "./shorthand.mjs";
import { topicsFor, frameworksFor, subjectsInRun, nextTopics, staleLessons } from "./queue.mjs";
import { mapCandidates } from "./agent.mjs";
import { loadStore, confirmedTaught } from "./mapstore.mjs";
import { SPECS } from "../../kit/curriculum/uk.js";
import { loadIndex, loadMap } from "../curriculum/engine.mjs";

// ---------- the status ladder (Master Plan, decision F) ----------
/** the rungs, lowest first. Frameworks: not researched → framework found → spec imported. Each requirement of an
 * imported specification then sits on the highest rung any of its lessons reached; "needs update" outranks the rest,
 * since it is work to do: a lesson built from inputs that changed, or edited since it was checked. */
export const LADDER = ["not researched", "framework found", "spec imported", "mapped", "drafted", "gates passed", "AI-verified", "expert-required", "expert-approved", "published", "needs update"];
export const COUNTRIES = [["uk", "United Kingdom"], ["us", "United States"], ["ca", "Canada"], ["au", "Australia"], ["nz", "New Zealand"]];
const TIER_RUNG = { "gates-passed": "gates passed", "ai-verified": "AI-verified", "expert-required": "expert-required", "expert-approved": "expert-approved" };
/**
 * Frameworks by country and wave-1 subject, from the registry (kit/curriculum/uk.js; the other countries have no
 * registry yet, so everything there is "not researched"), and requirements by rung for each imported specification.
 * Unknown stays unknown: a subject with no registry row is counted as not researched, never as covered.
 */
export function ladder() {
  const subjects = CONFIG.waves[0].subjects;
  const frameworks = COUNTRIES.map(([iso, name]) => {
    const rows = iso === "uk" ? SPECS : [];
    const per = subjects.map((sub) => { const r = rows.filter((s) => s.subject === sub); return { subject: sub, stage: !r.length ? "not researched" : r.some((s) => s.statements === "imported") ? "spec imported" : "framework found", found: r.length, imported: r.filter((s) => s.statements === "imported").length }; });
    return { country: name, subjects: per };
  });
  const requirements = {};
  for (const s of SPECS.filter((x) => x.statements === "imported")) {
    const idx = loadIndex(s.id); if (!idx) continue;
    const rung = new Map(idx.statements.map((x) => [x.ref, "spec imported"])), set = (ref, r) => { if (rung.has(ref) && LADDER.indexOf(r) > LADDER.indexOf(rung.get(ref))) rung.set(ref, r); };
    const ids = new Set(idx.statements.map((x) => `${s.id}:${x.ref}`)), refOf = (id) => (ids.has(id) ? id.slice(s.id.length + 1) : null);   // naming only a part doesn't move a statement up the ladder
    // mapped: a person confirmed an existing course lesson teaches all of it (an AI check never counts)
    const map = loadStore(s.id), hash = new Map(idx.statements.map((x) => [x.ref, x.hash]));
    for (const ref of Object.keys(map.links)) if (confirmedTaught(map, ref, hash.get(ref))) set(ref, "mapped");
    // drafted: a topic in flight has the Writer's lessons
    const q = out(`content/queue/${s.subject}/`);
    if (existsSync(q)) for (const d of readdirSync(q)) { const st = load(new URL(`${d}/state.json`, q)); if (st?.lessons?.length) for (const t of topicsFor(s.id)) if (t.id === st.topic) for (const r of t.reqs) set(r.ref, "drafted"); }
    // filed lessons, by tier; published (in the course's published unit); needs update
    const led = loadLedger(s.subject), pub = (() => { const f = out(`kit/courses/${s.subject}/published.js`); return existsSync(f) ? JSON.parse(readFileSync(f, "utf8").match(/PUBLISHED = (\{[\s\S]*\});/)?.[1] || "{}") : {}; })();
    const topics = new Map(topicsFor(s.id).map((t) => [t.id, t]));
    for (const [tid, e] of Object.entries(led.topics)) {
      if (e.fw && e.fw !== s.id) continue;
      const stale = new Set(topics.has(tid) ? staleLessons(topics.get(tid), e).map((x) => x.l) : []);
      for (const l of e.lessons || []) for (const id of l.reqs || []) { const ref = refOf(id); if (!ref) continue; if (TIER_RUNG[l.tier]) set(ref, TIER_RUNG[l.tier]); }
      for (const l of e.lessons || []) if (l.tier === "unchecked" || stale.has(l)) for (const id of l.reqs || []) { const ref = refOf(id); if (ref) set(ref, "needs update"); }
    }
    for (const m of Object.values(pub.lessons || {})) for (const id of m.reqs || []) { const ref = refOf(id); if (ref && rung.get(ref) !== "needs update") set(ref, "published"); }
    requirements[s.id] = Object.fromEntries(LADDER.slice(2).map((r) => [r, [...rung.values()].filter((x) => x === r).length]));
  }
  return { frameworks, requirements };
}

const git = (...a) => { try { return execFileSync("git", a, { cwd: at("./").pathname, encoding: "utf8" }).trim(); } catch { return null; } };
const ledgers = () => { const d = out("content/ledger/"); return existsSync(d) ? readdirSync(d).filter((f) => f.endsWith(".json")).map((f) => load(new URL(f, d))) : []; };
const count = (dir, ext) => { const d = at(dir); if (!existsSync(d)) return 0; let n = 0; const walk = (u) => { for (const e of readdirSync(u, { withFileTypes: true })) e.isDirectory() ? walk(new URL(`${e.name}/`, u)) : e.name.endsWith(ext) && n++; }; walk(d); return n; };

/**
 * Approval is per lesson file (knowledge-engine/CORE/RULES.md, rule 14): a tier holds only while the lesson's text is
 * byte-for-byte what was checked. Returns the lessons whose text changed, resets their tier and saves the ledger
 * (unless write: false), and hands back the checked ledger so callers report from it.
 */
export function checkTiers(subject, { write = true, withLedger = false } = {}) {
  const led = loadLedger(subject), changed = [];
  for (const [id, e] of Object.entries(led.topics)) {
    const f = e.file && out(e.file), texts = f && existsSync(f) ? new Map(splitUnit(readFileSync(f, "utf8")).map((l) => [l.title, l.text])) : new Map();
    for (const l of e.lessons || []) if (l.tier !== "unchecked" && fp(texts.get(l.title) ?? "") !== l.hash) { changed.push(`${id}: ${l.title}`); l.was = l.tier; l.tier = "unchecked"; delete l.approvedBy; }
  }
  if (write && changed.length) saveLedger(led);
  return withLedger ? { changed, led } : changed;
}
/** a named reviewer approves one lesson, exactly as it now reads */
export function approve(subject, topicId, title, by) {
  if (!by || by.length < 3) throw new Error("approval needs the reviewer's name (--by)");
  const led = loadLedger(subject), e = led.topics[topicId]; if (!e) throw new Error(`no topic ${topicId} in content/ledger/${subject}.json`);
  const l = (e.lessons || []).find((x) => x.title === title); if (!l) throw new Error(`no lesson "${title}" in ${topicId}`);
  const text = new Map(splitUnit(readFileSync(out(e.file), "utf8")).map((x) => [x.title, x.text])).get(title);
  if (fp(text ?? "") !== l.hash) throw new Error(`"${title}" has changed since it passed the gates and review: run it through gradify ingest again before approving`);
  Object.assign(l, { tier: "expert-approved", approvedBy: by, approvedOn: today() }); saveLedger(led);
  return l;
}

export function status() {
  const subjects = subjectsInRun().map((subject) => {
    const { changed: edited, led } = checkTiers(subject, { withLedger: true }), T = Object.values(led.topics);
    const topics = frameworksFor(subject).flatMap((fw) => { try { return topicsFor(fw); } catch { return []; } });
    const lessons = T.flatMap((t) => t.lessons || []);
    return {
      subject, frameworks: frameworksFor(subject), topicsToWrite: topics.length, requirementsToWrite: topics.reduce((a, t) => a + t.reqs.length, 0),
      topics: Object.fromEntries(["filed", "partial", "filed-with-gaps", "failed", "blocked"].map((s) => [s, T.filter((t) => t.status === s).length])),
      lessons: { total: lessons.length, aiVerified: lessons.filter((l) => l.tier === "ai-verified").length, expertRequired: lessons.filter((l) => l.tier === "expert-required").length, expertApproved: lessons.filter((l) => l.tier === "expert-approved").length, disagreements: lessons.filter((l) => l.disagreed).length },
      editedSinceChecked: edited,
      next: (() => { try { return nextTopics(subject, { limit: 1 })[0]?.id || null; } catch { return null; } })(),
      // strong matches still to confirm are work too: a session must run gradify work even with no topic queued
      mappingPending: frameworksFor(subject).reduce((a, fw) => { try { return a + mapCandidates(fw).length; } catch { return a; } }, 0),
    };
  });
  return { generated: today(), ladder: ladder(), branch: git("rev-parse", "--abbrev-ref", "HEAD"), commit: git("rev-parse", "--short", "HEAD"), dirty: !!git("status", "--porcelain"), briefs: count("content/research/", ".txt"), drafts: count("content/drafts/", ".txt"), mode: CONFIG.mode, budgetUsd: CONFIG.budgetUsd, subjects, approvals: { merge: "owner only", deploy: "owner only", publish: "owner only (merging the rolling PR approves AI-verified drafts; expert-required ones wait for a named reviewer)" } };
}

/** STATUS.json, NEXT_TASK.json and HANDOVER.md, all generated from status() */
export function writeHandover(s = status()) {
  save(out("knowledge-engine/CORE/STATUS.json"), s);
  const next = s.subjects.find((x) => x.next || x.mappingPending);
  save(out("knowledge-engine/CORE/NEXT_TASK.json"), next ? (CONFIG.provider || "api") === "agent"
    ? { task: "run the content loop in agent mode", command: `node scripts/gradify.mjs work ${next.subject}`, topic: next.next || `${next.mappingPending} strong matches to confirm (mapping)`, by: "a Claude Code session (the hourly scheduled one, or any you open): follow what gradify work prints; a person only merges the rolling PR",
      acceptance: "lessons pass every gate and the review; failures are listed in the PR" }
    : { task: "run the content loop", command: `node scripts/gradify.mjs run --subject ${next.subject}`, topic: next.next, by: "the Content engine workflow (.github/workflows/content.yml); a person only merges the rolling PR", acceptance: "lessons pass every gate and the review; failures are listed in the PR" } : { task: "nothing queued", note: "add a framework to scripts/content/config.json (frameworks) and its registry row" });
  save(out("knowledge-engine/CORE/HANDOVER.md"), `# Handover (generated by \`gradify status --write\`, ${s.generated})\n\nBranch \`${s.branch}\` at \`${s.commit}\`${s.dirty ? " (uncommitted changes)" : ""}. Read START-HERE.md and RULES.md, then only the files the task names.\n\n| Subject | To write (topics / requirements) | Filed | Partial | Failed | Blocked | Lessons | AI-verified | Expert required | Disagreements | Mapping to confirm | Next topic |\n|---|---|---|---|---|---|---|---|---|---|---|---|\n${s.subjects.map((x) => `| ${x.subject} | ${x.topicsToWrite} / ${x.requirementsToWrite} | ${x.topics.filed + x.topics["filed-with-gaps"]} | ${x.topics.partial} | ${x.topics.failed} | ${x.topics.blocked} | ${x.lessons.total} | ${x.lessons.aiVerified} | ${x.lessons.expertRequired} | ${x.lessons.disagreements} | ${x.mappingPending || 0} | ${x.next || "-"} |`).join("\n")}\n\n${s.briefs} research briefs, ${s.drafts} draft unit files. Mode ${s.mode}, budget $${s.budgetUsd} a run. Nothing is merged, deployed or published without the owner.\n\n## Status ladder\n\nRequirements of each imported specification, by the highest rung reached (\`gradify status\` → ladder):\n\n| Framework | ${LADDER.slice(2).join(" | ")} |\n|---|${LADDER.slice(2).map(() => "---").join("|")}|\n${Object.entries(s.ladder?.requirements || {}).map(([fw, c]) => `| ${fw} | ${LADDER.slice(2).map((r) => c[r]).join(" | ")} |`).join("\n")}\n\nFrameworks by country (wave 1 subjects): ${(s.ladder?.frameworks || []).map((c) => `${c.country}: ${c.subjects.filter((x) => x.stage !== "not researched").map((x) => `${x.subject} ${x.stage} (${x.found} found, ${x.imported} imported)`).join(", ") || "not researched"}`).join("; ")}. Everything not listed is not researched.\n`);
}

/**
 * The rolling PR's description: what passed, what failed, what an expert must see, and what it cost. Everything but
 * the cost comes from the subjects' ledgers as they are now (after checkTiers), so a later approval or edit shows, and
 * a topic run twice appears once. Run records are only history.
 */
export function prBody(spend, { subjects = subjectsInRun() } = {}) {
  const records = subjects.map((sub) => checkTiers(sub, { withLedger: true }).led).flatMap((led) => Object.entries(led.topics).map(([topic, e]) => ({ topic, lessons: e.lessons || [], failures: e.failures || [], uncovered: e.uncovered || [], gaps: e.gaps || [], needs: e.needs || [] })));
  const passed = records.flatMap((r) => r.lessons.map((l) => ({ ...l, topic: r.topic })));
  const line = (l) => `- **${l.title}** (${l.topic}) · ${l.tier}${l.disagreed ? " · reviewer disagreed first" : ""}${l.conflict ? " · sources conflict" : l.conflictsExplained?.length ? " · source conflict explained" : ""} · ${l.reqs.length} requirement${l.reqs.length === 1 ? "" : "s"}`;
  const fails = records.flatMap((r) => r.failures.map((f) => `- ${r.topic} · **${f.title}** stopped at \`${f.gate}\`: ${f.issues.slice(0, 3).map((i) => `${i.code}${i.line ? ` L${i.line}` : ""} ${i.note}`).join("; ")}`));
  const byGate = {}; for (const r of records) for (const f of r.failures) byGate[f.gate] = (byGate[f.gate] || 0) + 1;
  const systematic = Object.entries(byGate).filter(([, n]) => n >= 5);
  const pub = subjects.map((sub) => { const f = out(`kit/courses/${sub}/published.js`); return existsSync(f) ? { sub, n: Object.keys(JSON.parse(readFileSync(f, "utf8").match(/PUBLISHED = (\{[\s\S]*\});/)?.[1] || "{}").ids || {}).length } : null; }).filter((x) => x?.n);
  return `Content engine, ${today()}. **Merging this PR publishes** the lessons in each course's "Specification lessons" unit${pub.length ? ` (${pub.map((x) => `${x.sub}: ${x.n}`).join(", ")})` : ""}, labelled **AI-checked** or **Expert-reviewed** for learners, once the site deploys. **Expert-required** lessons stay in drafts until a named reviewer approves them.

## Passed (${passed.length})
${passed.map(line).join("\n") || "None this run."}

## For an expert (${passed.filter((l) => l.tier === "expert-required" || l.disagreed).length})
${passed.filter((l) => l.tier === "expert-required" || l.disagreed).map(line).join("\n") || "None."}

## Failed after ${CONFIG.repairs} repairs (${fails.length})
${fails.join("\n") || "None."}
${systematic.length ? `\n> **Systematic failure:** ${systematic.map(([g, n]) => `\`${g}\` failed ${n} lessons`).join(", ")}. This is probably the engine, not the content: use the fix prompt in docs/CONTENT-ENGINE.md.\n` : ""}
${(() => { const sig = subjects.map((sub) => load(out(`content/signals/${sub}.json`))).filter(Boolean).flatMap((x) => [...(x.items || []).map((i) => `- ${i.subject} ${i.lesson} · question ${i.question}: ${i.why}`), ...(x.reports || []).map((r) => `- ${r.subject} ${r.lesson}: ${r.why}`)]); return sig.length ? `## Learners flagged (repair queue)\n${sig.join("\n")}\n\n` : ""; })()}## Not covered yet
${records.filter((r) => r.uncovered.length).map((r) => `- ${r.topic}: ${r.uncovered.join(", ")}`).join("\n") || "None."}
${records.some((r) => r.gaps.length || r.needs.length) ? `\n## Research gaps and diagrams needed\n${records.flatMap((r) => [...r.gaps.map((g) => `- GAP ${g}`), ...r.needs.map((g) => `- DNEED ${g}`)]).join("\n")}\n` : ""}
## Cost
${(CONFIG.provider || "api") === "agent" && !spend.calls ? "Written in agent mode by Claude Code sessions on the Claude subscription: no API spend." : `$${spend.usd.toFixed(2)} over ${spend.calls} calls (${spend.searches} web searches); cache read ${spend.cacheRead.toLocaleString()} tokens, written ${spend.cacheWrite.toLocaleString()}. ${Object.entries(spend.byJob).map(([j, c]) => `${j} $${c.toFixed(2)}`).join(", ")}.`}
`;
}
