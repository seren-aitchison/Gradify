// The in-session review of lessons written outside Gradify (owner, 25 Nov 2026). gradify ingest files a returned
// lesson as "gates-passed" once it clears every gate; gradify work then hands each one, with its requirements and
// research brief, to a reviewer subagent that didn't write it (the review model in agent mode, so no API key).
//   OK     the lesson takes its tier by the engine's own rules (loop.mjs lessonRisk): "ai-verified" (AI-checked),
//          or "expert-required" for a practical, a calculation, a high-risk keyword or an unresolved conflict
//   FAIL   nothing is rewritten here: the lesson keeps "gates-passed" (it can't be published), the ledger records
//          the issues against that text, and content/inbox/rejected/<topic>.review.md lists them, with each
//          flagged line quoted, for the writing model to fix. A resubmitted lesson (new text) is reviewed afresh.
// Request files quote the specification and are never committed (.gitignore: *.req.txt).
import { readFileSync, existsSync, rmSync } from "node:fs";
import { out, save, slug, today, briefPath, fp, loadLedger, saveLedger } from "./lib.mjs";
import { splitUnit, parseBrief } from "./shorthand.mjs";
import { parseNotes } from "../../kit/course/notes.js";
import { reviewRequest, verdictOf, lessonRisk, parentOf } from "./loop.mjs";
import { loadIndex, loadStatements } from "../curriculum/engine.mjs";
import { SPECS, QUAL_TYPES } from "../../kit/curriculum/uk.js";
import { TYPE } from "./queue.mjs";
import { AGENT_MODELS as AGENT } from "./build.mjs";

const LEVEL = { gcse: "GCSE", "a-level": "A level", "as-level": "AS level", n5: "National 5", higher: "Higher" };
const dirOf = (subject, topicId) => out(`content/queue/${subject}/_review/${topicId.split("/").pop()}/`);
const read = (u) => (existsSync(u) ? readFileSync(u, "utf8") : null);
const rel = (u) => u.pathname.replace(out("./").pathname, "");

/** a filed topic as the reviewer sees it: its framework, and the requirements its lessons name, with their text */
export function topicOf(subject, id, e, lessons) {
  const s = SPECS.find((x) => x.id === e.fw), idx = loadIndex(e.fw), st = loadStatements(e.fw);
  const text = new Map((st?.statements || []).map((x) => [x.ref, x.text])), known = new Set((idx?.statements || []).map((x) => `${e.fw}:${x.ref}`));
  const want = new Set(lessons.flatMap((l) => l.reqs || []).map((r) => parentOf(r, known)).filter(Boolean));
  const reqs = (idx?.statements || []).filter((x) => want.has(`${e.fw}:${x.ref}`)).map((x) => ({ id: `${e.fw}:${x.ref}`, ref: x.ref, asks: text.get(x.ref) || x.ref, text: text.get(x.ref) || null, type: TYPE(x), status: x.status, hash: x.hash }));
  return { id, subject, fw: e.fw, section: e.section, title: e.title, level: LEVEL[s?.qual] || QUAL_TYPES[s?.qual]?.name || "GCSE", reqs };
}

/** the lessons waiting for review: filed as gates-passed, text unchanged since, not already failed on this text */
export function awaiting(subject) {
  const led = loadLedger(subject), res = [];
  for (const [id, e] of Object.entries(led.topics || {})) {
    if (!e.file || !existsSync(out(e.file))) continue;
    const texts = new Map(splitUnit(readFileSync(out(e.file), "utf8")).map((l) => [l.title, l.text]));
    for (const l of e.lessons || []) {
      const text = texts.get(l.title);
      if (l.tier !== "gates-passed" || l.superseded || !text || fp(text) !== l.hash || l.reviewFailed?.hash === l.hash) continue;
      res.push({ id, e, l, text });
    }
  }
  return res;
}

/**
 * Apply any reviewer replies, then write requests for the rest. Returns { actions, reviewed: [{ topic, title, tier }],
 * failed: [{ topic, title, issues }] }. Each action is one review step for a subagent (a batch of request → reply pairs).
 */
export function reviewStep(subject, { action, batch = 8 } = {}) {
  const led = loadLedger(subject), reviewed = [], failed = [], pending = new Map();
  for (const w of awaiting(subject)) {
    const e = led.topics[w.id], l = e.lessons.find((x) => x.title === w.l.title), dir = dirOf(subject, w.id), n = slug(l.title);
    const q = new URL(`${n}.req.txt`, dir), o = new URL(`${n}.out.txt`, dir), briefText = read(briefPath(w.id));
    if (!briefText) continue;
    const topic = topicOf(subject, w.id, e, [l]), key = `rev-${n}`;
    const reply = read(o);
    if (!reply) {
      save(q, reviewRequest({ key, text: w.text }, topic, briefText));
      (pending.get(w.id) || pending.set(w.id, []).get(w.id)).push([rel(q), rel(o)]);
      continue;
    }
    const v = verdictOf(reply);
    if (v.ok) {
      const s = { text: w.text, lesson: parseNotes(w.text)[0], conf: v.conf }, flags = lessonRisk(topic, s, parseBrief(briefText));
      l.tier = flags.risk || flags.conflict ? "expert-required" : "ai-verified";
      if (flags.conflict) { l.conflict = true; l.conflictsOpen = flags.conflicts.open; } else { delete l.conflict; delete l.conflictsOpen; }
      if (flags.conflicts.explained.length) l.conflictsExplained = flags.conflicts.explained;
      if (flags.risk) l.highRisk = true;
      l.reviewed = { by: `agent:${AGENT.review}`, on: today() }; delete l.reviewFailed;
      if (l.built?.models) l.built.models = { ...l.built.models, review: `agent:${AGENT.review}` };
      reviewed.push({ topic: w.id, title: l.title, tier: l.tier });
    } else {
      l.reviewFailed = { hash: l.hash, on: today(), issues: v.issues };
      failed.push({ topic: w.id, title: l.title, issues: v.issues, text: w.text });
    }
    rmSync(o, { force: true }); rmSync(q, { force: true });
  }
  if (reviewed.length || failed.length) saveLedger(led);
  for (const [topic, fs] of groupBy(failed, (f) => f.topic)) save(out(`content/inbox/rejected/${topic.split("/").pop()}.review.md`), failReport(topic, fs));
  const actions = [];
  for (const [topic, pairs] of pending) for (let i = 0; i < pairs.length; i += batch) actions.push(action("review", topic, { pairs: pairs.slice(i, i + batch) }));
  return { actions, reviewed, failed };
}
const groupBy = (xs, k) => { const m = new Map(); for (const x of xs) (m.get(k(x)) || m.set(k(x), []).get(k(x))).push(x); return m; };

/** what the writing model needs to fix: each failed lesson, each issue, and the line it's about, quoted */
export function failReport(topic, fails) {
  const out = [`# Review report: ${topic}`, "", `Reviewed ${today()} by a reviewer that didn't write these lessons. Fix each issue below, then submit the topic's whole file again (it replaces the lessons by title). Line numbers count from the lesson's \`## Title\` line as L1.`, ""];
  for (const f of fails) {
    const lines = f.text.split("\n");
    out.push(`## ${f.title}`, "");
    for (const i of f.issues) out.push(`- **${i.code}**${i.line ? ` L${i.line}` : ""}: ${i.note}${i.line && lines[i.line - 1] ? `\n  > ${lines[i.line - 1].slice(0, 240)}` : ""}`);
    out.push("");
  }
  return out.join("\n");
}
