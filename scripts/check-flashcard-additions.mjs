// Structural checker for the "10 more flashcards per lesson" run.
// Compares each notes file with its version at a pinned baseline commit (not HEAD, so committed work still
// counts as added) and checks that:
//   - every baseline line is still there, in order, and the only added lines are "Q:" flashcards
//   - lessons are unchanged in number and title
//   - every existing card keeps its index (learner review progress is keyed `${lessonId}#c${index}`)
//   - each lesson has either 0 new cards (not started) or exactly 10
//   - new cards have a question and an answer, answers are 40 words or fewer, and no card repeats another
//     in the same lesson (existing or new)
//   - the file still loads as a module
// Usage: node scripts/check-flashcard-additions.mjs [--baseline <commit>] [--json out.json] [files...]
// With no files, checks every kit/courses/*/notes/*.js that existed at the baseline.
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdtempSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { parseNotes } from "../kit/course/notes.js";

const BASELINE_DEFAULT = "3719ed3"; // main when the run was replayed onto it (2026-11-20)
const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); if (i < 0) return null; const v = args[i + 1]; args.splice(i, 2); return v; };
const baseline = opt("--baseline") || BASELINE_DEFAULT;
const jsonOut = opt("--json");
const git = (...a) => execFileSync("git", a, { encoding: "utf8", maxBuffer: 1 << 28 });
const files = args.length ? args : git("ls-tree", "-r", "--name-only", baseline, "kit/courses").split("\n").filter((f) => /\/notes\/[^/]+\.js$/.test(f));

const tmp = mkdtempSync(join(tmpdir(), "fc-check-"));
const norm = (s) => s.toLowerCase().replace(/\*\*|[`*_]/g, "").replace(/[\s.,;:!?'"-]+/g, " ").replace(/\s+/g, " ").trim();
const words = (s) => s.split(/\s+/).filter(Boolean).length;

async function load(src, name) {
  const p = join(tmp, name.replace(/\//g, "_") + ".mjs");
  writeFileSync(p, src);
  return (await import(pathToFileURL(p).href + "?" + Math.random())).default;
}

const results = [];
for (const f of files) {
  const r = { file: f, status: "", lessons: 0, done: 0, partial: 0, untouched: 0, added: 0, errors: [] };
  results.push(r);
  let before, after;
  try { before = git("show", `${baseline}:${f}`); } catch { r.status = "new-since-baseline"; continue; }
  if (!existsSync(f)) { r.status = "missing"; r.errors.push("file missing"); continue; }
  after = readFileSync(f, "utf8");
  // line diff: baseline lines must be a subsequence; extras must be Q: lines
  const B = before.split("\n"), A = after.split("\n");
  let j = 0;
  for (let i = 0; i < A.length; i++) {
    if (j < B.length && A[i] === B[j]) { j++; continue; }
    if (!/^Q: /.test(A[i].trim())) { r.errors.push(`line ${i + 1}: added or changed line is not a Q: card: ${A[i].slice(0, 80)}`); if (r.errors.length > 5) break; }
  }
  if (j < B.length) r.errors.push(`baseline line ${j + 1} removed or changed: ${B[j].slice(0, 80)}`);
  let tb, ta;
  try { tb = await load(before, f + ".base"); ta = await load(after, f); } catch (e) { r.errors.push("does not load: " + e.message); r.status = "fail"; continue; }
  const LB = parseNotes(tb), LA = parseNotes(ta);
  r.lessons = LB.length;
  if (LB.length !== LA.length) r.errors.push(`lesson count ${LB.length} → ${LA.length}`);
  LB.forEach((lb, k) => {
    const la = LA[k];
    if (!la) return;
    if (la.title !== lb.title) r.errors.push(`lesson ${k + 1} title changed`);
    for (let i = 0; i < lb.cards.length; i++) {
      if (!la.cards[i] || la.cards[i][0] !== lb.cards[i][0] || la.cards[i][1] !== lb.cards[i][1]) { r.errors.push(`lesson ${k + 1} "${lb.title}": existing card c${i} moved or changed`); break; }
    }
    const extra = la.cards.slice(lb.cards.length), n = extra.length;
    r.added += n;
    if (n === 0) r.untouched++;
    else if (n === 10) r.done++;
    else { r.partial++; r.errors.push(`lesson ${k + 1} "${lb.title}": ${n} new cards, expected 10`); }
    const seen = new Set(lb.cards.map(([q]) => norm(q)));
    const seenPair = new Set(lb.cards.map(([q, a]) => norm(q) + "|" + norm(a)));
    for (const [q, a] of extra) {
      if (!q || !a) r.errors.push(`lesson ${k + 1}: card missing question or answer`);
      if (words(a) > 40) r.errors.push(`lesson ${k + 1}: answer over 40 words: ${q.slice(0, 60)}`);
      if (seen.has(norm(q)) || seenPair.has(norm(q) + "|" + norm(a))) r.errors.push(`lesson ${k + 1}: duplicate card: ${q.slice(0, 60)}`);
      seen.add(norm(q)); seenPair.add(norm(q) + "|" + norm(a));
    }
  });
  // Q lines with a bad split are dropped silently by the parser; count them
  const qLines = A.filter((l) => /^Q: /.test(l.trim())).length - B.filter((l) => /^Q: /.test(l.trim())).length;
  if (qLines !== r.added) r.errors.push(`${qLines} added Q: lines but ${r.added} parsed cards (a line is missing " | ")`);
  r.status = r.errors.length ? "fail" : r.done === r.lessons ? "complete" : r.added === 0 ? "untouched" : "in-progress";
}

const by = (s) => results.filter((r) => r.status === s);
const sum = (k, list = results) => list.reduce((t, r) => t + r[k], 0);
const report = {
  baseline, files: results.length,
  complete: by("complete").length, inProgress: by("in-progress").length, untouched: by("untouched").length, failed: by("fail").length,
  newSinceBaseline: by("new-since-baseline").length,
  lessons: sum("lessons"), lessonsDone: sum("done"), cardsAdded: sum("added"), cardsInCompleteFiles: sum("added", by("complete")),
};
if (jsonOut) writeFileSync(jsonOut, JSON.stringify({ report, results }, null, 1));
for (const r of results) if (r.status === "fail" || r.status === "in-progress") console.log(`${r.status.padEnd(12)} ${r.file}  ${r.done}/${r.lessons} lessons${r.errors.length ? "\n    " + r.errors.slice(0, 6).join("\n    ") : ""}`);
console.log(JSON.stringify(report, null, 1));
process.exitCode = report.failed ? 1 : 0;
