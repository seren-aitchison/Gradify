// The production loop for one topic: research (once, cached by fingerprint) → write → gates (cheapest first) →
// review → repair (changed lines only, up to config.repairs times) → file the passing lessons → record the rest.
// Two drivers share everything here: runTopic (API calls, injected as `ask`/`askMany`, so tests use a fake model) and
// agent mode (scripts/content/agent.mjs: a Claude Code session and its subagents, exchanging files).
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { titleKey } from "../../kit/course/syllabus.js";
import { SPECS } from "../../kit/curriculum/uk.js";
import { loadIndex, tokens } from "../curriculum/engine.mjs";
import { CONFIG, at, out, fp, save, slug, today, briefPath, draftPath, loadLedger, saveLedger } from "./lib.mjs";
import { packet, parseBrief, parseVerdicts, fixList, parseRepairs, applyRepair, splitUnit, numbered, parentOf, conflictStakes } from "./shorthand.mjs";
import { runGates, topicFlashcards, SKILL_WORDS } from "./gates.mjs";
import { diagramsFor, reqHash, TYPE } from "./queue.mjs";
import { longestSharedRun } from "../knowledge/lib.mjs";
import { copyCorpus, copyingReport, loadEvidence, evidenceApproved, gateNote } from "./evidence.mjs";
import { suspensionOf } from "./source-policy.mjs";
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
// a source suspended by policy isn't offered for new research (scripts/content/source-policy.mjs); briefs that already
// cite it keep their provenance, and the evidence check doesn't count it
export const allowLines = (rows = SOURCES) => rows.filter((r) => classOf(r) && !suspensionOf(r)).map((r) => `ALLOW ${r.id} | ${r.title} | ${r.urls.join(" ")} | licence=${classOf(r)}`);
/** a brief's text → { parsed, problems }: format, allowlist, licence, and (given the topic) no 8-word run of the
 * specification, since briefs are committed and the specification's text is the awarding body's copyright */
export function checkBrief(text, topic = null) {
  const parsed = parseBrief(text), allow = parsed.problems.length ? [] : allowlistProblems(parsed);
  const problems = [...parsed.problems, ...allow, ...(parsed.problems.length ? [] : licenceProblems(parsed))];
  const briefWords = new Set(tokens(text));
  // copying: every statement of the specification, not just the topic's own (scripts/content/evidence.mjs, decision D)
  if (topic?.fw) {
    const own = new Set((topic.reqs || []).map((r) => r.id)), corpus = copyCorpus(topic.fw);
    corpus.items = corpus.items.filter((c) => !own.has(c.id));
    for (const m of copyingReport(text, corpus)) if (m.severity === "block") problems.push(`line ${m.line} copies ${m.words} words of ${m.source} ("${m.passage.split(" ").slice(0, 6).join(" ")}…"): condense it in your own words`);
  }
  for (const r of topic?.reqs || []) if (r.text) {
    const run = longestSharedRun(text, r.text); if (run.words >= 8) problems.push(`copies ${run.words} words of ${r.id}'s wording ("${run.run.split(" ").slice(0, 6).join(" ")}…"): condense it in your own words`);
    // evidence: a lesson is written from the brief alone, so the brief must cover what each requirement names (the
    // specification gate later asks the lesson for the same terms)
    const terms = [...new Set(tokens(`${r.title || ""} ${r.text}`))].filter((t) => !SKILL_WORDS.has(t)), missing = terms.filter((t) => !briefWords.has(t));
    if (terms.length && missing.length / terms.length > 0.4) problems.push(`doesn't support ${r.id}: the brief never covers ${missing.slice(0, 8).join(", ")}`);
  }
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
  // the whole statement (asks is cut at 400 characters): a researcher given half a requirement researches half of it
  ...topic.reqs.map((r) => `REQ ${r.id} | ${String(r.text || r.asks).replace(/\s+/g, " ")}`),
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
export const reviewRequest = (s, topic, brief) => [`LESSON ${s.key}`, numbered(s.text), ...topic.reqs.map((r) => `REQ ${r.id} | ${String(r.asks).replace(/\s+/g, " ")}`),
  // each library diagram the lesson uses, as the learner will see it, so the reviewer can judge what it teaches
  ...diagramLines(s.text), `BRIEF ${topic.id}`, brief.replace(/^#.*\n/, "").trim(),
  // the brief's conflicts, numbered as the verdict's Cn= names them
  ...parseBrief(brief).conflicts.map((c, i) => `CONF C${i + 1} | ${c[0]} | src=${c[1] || ""} | stakes=${conflictStakes(c)}`)].join("\n");
let MANIFEST = null;
/** "DIAG <id> | <title> | <caption> | alt: <alt>" for each D: line, or a note that the id isn't in the library */
export function diagramLines(text) {
  MANIFEST ||= (() => { try { const m = JSON.parse(readFileSync(at("kit/diagrams/manifest.json"), "utf8")); return m.diagrams || m; } catch { return {}; } })();
  const one = (x) => String(x || "").replace(/\s+/g, " ").trim();
  return [...new Set([...String(text).matchAll(/^D:\s*(\S+)/gm)].map((m) => m[1]))].map((id) => { const d = MANIFEST[id]; return d ? `DIAG ${id} | ${one(d.title)} | ${one(d.caption)} | alt: ${one(d.alt)}` : `DIAG ${id} | not in the diagram library`; });
}
export const repairRequest = (s, pkt) => [fixList(s.key, s.issues), `LESSON ${s.key}`, numbered(s.text), pkt].join("\n");
export const gateOptions = (topic, { siblings = [], brief = null, ...extra } = {}) => ({ reqs: topic.reqs, sources: brief ? (brief.sources || []).map((x) => x.url) : null, allowed: new Set(topic.reqs.map((x) => x.id)), prereq: prereqResolver(topic.subject, siblings), taken: takenTitle(topic.subject), corpus: lessonCorpus(topic), ...extra });
// what a lesson mustn't copy beyond its own requirements (those are the spec gate's): the rest of the specification
// and the topic's retrieved sources
const lessonCorpus = (topic) => { const own = new Set((topic.reqs || []).map((r) => r.id)), c = copyCorpus(topic.fw, loadEvidence(topic.id)); c.items = c.items.filter((x) => !own.has(x.id)); return c; };
/** the course's own lesson titles, keyed as the syllabus keys them; the engine's published unit is left out, since a
 * lesson published there keeps its title when it's rebuilt */
export function courseTitles(subject, { withPublished = true } = {}) {
  const dir = at(`kit/courses/${subject}/notes/`), out = new Map(); if (!existsSync(dir)) return out;
  let pub = null; try { pub = JSON.parse(readFileSync(at(`kit/courses/${subject}/published.js`), "utf8").match(/PUBLISHED = (\{[\s\S]*\});/)?.[1] || "{}").id || null; } catch {}
  for (const f of readdirSync(dir).filter((x) => x.endsWith(".js"))) { if (!withPublished && pub && f === `${pub}.js`) continue; for (const m of readFileSync(new URL(f, dir), "utf8").matchAll(/^## (.+)$/gm)) out.set(titleKey(m[1]), `${f.replace(/\.js$/, "")}: ${m[1]}`); }
  return out;
}
/** a new lesson's title must not be one the course already uses: the syllabus identifies lessons by title */
export const takenTitle = (subject) => { const t = courseTitles(subject, { withPublished: false }); return (title) => t.get(titleKey(title)) || null; };
/**
 * PRE: lines (decision C) resolve to a lesson title in the subject's course or in the unit being written (case and
 * punctuation ignored, as the syllabus matches titles), or to a requirement id of an imported specification.
 */
export function prereqResolver(subject, siblings = []) {
  const titles = new Set([...siblings.map(titleKey), ...courseTitles(subject).keys()]);
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

const escRe = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** the high-risk keywords found in a lesson's text (not its D:/DIA: diagram references). A keyword matches at the start of a word
 * (so the stem "pregnan" finds "pregnancy", but "acid" no longer fires inside "placid"), and
 * phrases in `notKeywords` ("amino acid") are removed first, so molecule names aren't hazards. */
export function riskKeywords(text, hr = CONFIG.highRisk) {
  // diagram references are file names and render specs, not teaching text ("D: bio-amino-acids" isn't about acids)
  let t = String(text).split("\n").filter((l) => !/^(D|DIA):/.test(l)).join("\n").toLowerCase();
  for (const n of hr.notKeywords || []) t = t.replace(new RegExp(`\\b${escRe(n.toLowerCase())}`, "g"), " ");
  return hr.keywords.filter((k) => new RegExp(`\\b${escRe(k.toLowerCase())}`).test(t));
}
const normUrl = (u) => String(u || "").trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/[/#?]+$/, "");
/**
 * How a lesson handles each of its brief's CONFLICT lines (decision G). A conflict stops a lesson being AI-checked
 * unless the reviewer says the lesson doesn't rely on it (Cn=none), or says it's explained at a `!:` line (Cn=L<n>)
 * and the engine confirms all of: the Researcher marked it stakes=low, it names no high-risk keyword, that line of
 * the lesson really is a `!:` line, and the lesson's SRC lines cite at least two of the conflict's sources. Anything
 * missing (no verdict, open, high stakes) leaves it open, which sends the lesson to an expert.
 */
export function conflictsOf(s, parsedBrief, hr = CONFIG.highRisk) {
  const srcUrl = new Map((parsedBrief.sources || []).map((x) => [x.id, normUrl(x.url)]));
  const lines = String(s.text || "").split("\n"), cited = new Set(lines.filter((l) => /^SRC:/.test(l)).map((l) => normUrl(l.split("|").pop())));
  const explained = [], open = [];
  (parsedBrief.conflicts || []).forEach((row, i) => {
    const n = i + 1, v = s.conf?.[n], label = `C${n} ${String(row[0]).slice(0, 60)}`;
    if (v === "none") return;
    if (!v || v === "open") return open.push(`${label}: ${v ? "reviewer left it open" : "no reviewer verdict"}`);
    const at = Number(v.slice(1)), ids = String(row[1] || "").split(/[ ,]+/).filter((x) => srcUrl.has(x));
    const hits = ids.filter((id) => cited.has(srcUrl.get(id))).length, need = Math.min(2, Math.max(ids.length, 1));
    const why = conflictStakes(row) !== "low" ? "high stakes" : riskKeywords(row[0], hr).length ? `high-risk keyword (${riskKeywords(row[0], hr).join(", ")})`
      : !/^!:/.test(lines[at - 1] || "") ? `L${at} isn't a !: line` : hits < need ? `the lesson cites ${hits} of its ${ids.length} sources` : null;
    if (why) open.push(`${label}: ${why}`); else explained.push(`C${n}@L${at}`);
  });
  return { explained, open };
}
/** a lesson's tier flags: `risk` from its own requirements (a practical elsewhere in the topic doesn't count), NUM
 * questions and keywords; `conflict` when a brief conflict it relies on isn't resolved (conflictsOf) */
export const lessonRisk = (topic, s, parsedBrief) => {
  const hr = CONFIG.highRisk;
  // only the requirements this lesson teaches: a practical elsewhere in the topic doesn't make every lesson high-risk
  const own = new Set(s.lesson?.reqs?.map((x) => x.id) || []), ids = new Set(topic.reqs.map((r) => r.id));
  const mine = topic.reqs.filter((r) => [...own].some((id) => parentOf(id, ids) === r.id));
  const c = conflictsOf(s, parsedBrief, hr);
  return { conflict: c.open.length > 0, conflicts: c, risk: (own.size ? mine : topic.reqs).some((r) => hr.types.includes(r.type)) || /^NUM/m.test(s.text) || riskKeywords(s.text, hr).length > 0 };
};

/** write, check, review and repair one topic's lessons; file what passes; return the record for the ledger and PR */
export async function runTopic(topic, { ask, askMany, render = null, legible = null, log = () => {}, reviewed = true } = {}) {
  const r = await research(topic, { ask });
  if (!r.brief) return fileTopic(topic, [], { failures: [{ title: "(research)", gate: "brief", issues: (r.problems || []).map((p) => ({ code: "SRC", line: null, note: p })) }] });
  // nothing is written from a brief until a person has approved its evidence (scripts/content/evidence.mjs, decision C)
  if (!evidenceApproved(topic.id)) return { topic: topic.id, status: "awaiting-approval", awaiting: gateNote(topic.id), lessons: [], failures: [], uncovered: topic.reqs.map((x) => x.id), gaps: [], needs: [] };
  const pkt = packetFor(topic, r.brief);
  const states = splitUnit(await ask("write", pkt)).map((l, i) => ({ ...lessonState(l, i), models: { write: CONFIG.models.write, review: CONFIG.models.review } }));
  if (!states.length) return fileTopic(topic, [], { brief: r, failures: [{ title: "(unit)", gate: "parse", issues: [{ code: "FMT", line: null, note: "the Writer returned no lessons" }] }] });
  const opts = gateOptions(topic, { render, legible, siblings: states.map((s) => s.title), brief: r.parsed });
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
        if (out.timedOut) { for (const s of toReview) { const res = out.get(s.key); if (res && !(res instanceof Error) && verdictOf(res).ok) { s.done = true; s.conf = verdictOf(res).conf; } } log(`  ${out.timedOut}: stopping this topic`); break; }
        for (const s of toReview) { const v = verdictOf(out.get(s.key)); if (v.ok) { s.done = true; s.conf = v.conf; } else { s.issues = v.issues; s.failedAt = "review"; s.reviewFails++; fix.push(s); } }
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
  let passed = states.filter((s) => s.done && s.lesson);
  // the topic's flashcard minimum (config.standards), over every lesson its draft will hold: the ones filed before and
  // the ones passing now. Short of it, nothing new is filed; the lessons are listed with what's missing
  if (passed.length) {
    const file = draftPath(topic.subject, topic.fw, slug(topic.title)), prior = existsSync(file) ? splitUnit(readFileSync(file, "utf8")) : [];
    const merged = new Map(prior.map((l) => [l.title, l.text])); for (const s of passed) merged.set(s.lesson.title, s.text);
    const f = topicFlashcards([...merged.values()]);
    if (!f.ok) { for (const s of passed) { s.done = false; s.failedAt = "standards"; s.issues = [{ code: "STD", line: null, note: f.note }]; } passed = []; }
  }
  for (const s of passed) {
    const flags = lessonRisk(topic, s, brief.parsed), title = s.lesson.title;
    rec.lessons.push({ title, tier: !reviewed ? "gates-passed" : flags.risk || flags.conflict ? "expert-required" : "ai-verified", reqs: s.lesson.reqs.map((x) => x.id), disagreed: s.reviewFails > 0, repairs: s.gateFails + s.reviewFails, ...(flags.conflict ? { conflict: true, conflictsOpen: flags.conflicts.open } : {}), ...(flags.conflicts.explained.length ? { conflictsExplained: flags.conflicts.explained } : {}), ...(flags.risk ? { highRisk: true } : {}), hash: fp(s.text),
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

/**
 * Re-apply the current high-risk rules to lessons already filed and not yet approved, so a fix to the rules (or a new
 * keyword) reaches them without a rewrite. Only a lesson whose draft text still has its filed hash is changed; a
 * conflict, a gates-only lesson, an approved one or a superseded one keeps its tier. Each change is recorded on the
 * lesson as `retiered`. Returns [{ topic, title, from, to }].
 */
export function retier(subject, { date = today() } = {}) {
  const led = loadLedger(subject), changed = [], types = new Map();
  const typeOf = (id) => {
    const [fw, ref] = String(id).split(":");
    if (!types.has(fw)) types.set(fw, new Map((loadIndex(fw)?.statements || []).map((x) => [x.ref, TYPE(x)])));
    const m = types.get(fw); let r = ref;
    while (r && !m.has(r)) r = r.includes(".") ? r.slice(0, r.lastIndexOf(".")) : "";
    return m.get(r);
  };
  for (const [id, e] of Object.entries(led.topics || {})) {
    if (!e.file || !existsSync(out(e.file))) continue;
    const texts = new Map(splitUnit(readFileSync(out(e.file), "utf8")).map((l) => [l.title, l.text]));
    for (const l of e.lessons || []) {
      if (!["ai-verified", "expert-required"].includes(l.tier) || l.conflict || l.superseded) continue;
      const text = texts.get(l.title); if (!text || fp(text) !== l.hash) continue;
      const hr = CONFIG.highRisk, risk = l.reqs.some((r) => hr.types.includes(typeOf(r))) || /^NUM/m.test(text) || riskKeywords(text, hr).length > 0;
      const tier = risk ? "expert-required" : "ai-verified";
      if (tier === l.tier) continue;
      changed.push({ topic: id, title: l.title, from: l.tier, to: tier });
      l.retiered = { from: l.tier, date, why: risk ? `high-risk: ${riskKeywords(text, hr).join(", ") || "requirement type or NUM"}` : "high-risk rules no longer match" };
      l.tier = tier;
      if (risk) l.highRisk = true; else delete l.highRisk;
    }
  }
  if (changed.length) saveLedger(led);
  return changed;
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
  // a requirement is covered only by a lesson naming the whole requirement: a lesson naming one of its parts
  // (4.1.1.1.b.ii) teaches that part, but the index doesn't list a statement's parts, so the engine can't tell the
  // rest are taught; the requirement stays uncovered and is written (owner, 26 Nov 2026, rule H)
  const all = (topic.full || topic).reqs, known = new Set(all.map((x) => x.id));
  // a lesson covers a requirement only if it was built from that requirement's current text: when a statement changes,
  // the old lesson stays in the draft but its requirement is queued again until a replacement passes
  const hashOf = new Map(all.map((x) => [x.id, x.hash]));
  const current = (l, id) => { const b = l.built?.reqs; if (!b) return true; return b.includes(`${id}@${hashOf.get(id)}`) || !b.some((x) => x.startsWith(`${id}@`)); };
  const covered = new Set(e.lessons.flatMap((l) => l.reqs.filter((id) => known.has(id) && current(l, id))));
  rec.uncovered = all.filter((x) => !covered.has(x.id)).map((x) => x.id);
  e.failures = rec.failures; e.uncovered = rec.uncovered; e.gaps = rec.gaps; e.needs = rec.needs;
  e.status = e.lessons.length ? (rec.uncovered.length ? "partial" : "filed") : e.runs >= CONFIG.repairs ? "blocked" : "failed";
  if (e.status === "partial" && e.runs >= CONFIG.repairs + 1) e.status = "filed-with-gaps";
  led.topics[topic.id] = e; saveLedger(led);
  return { ...rec, status: e.status };
}
