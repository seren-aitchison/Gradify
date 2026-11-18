// Upgrade lessons to the Gradify Learning Standard (docs/CURRICULUM_CONTENT_STANDARD.md) without retyping, or losing, the
// existing lesson text: merge a patch of additions into a notes file, then check every lesson in it.
//   node scripts/upgrade-lessons.mjs <notes file> [patch file]     (no patch: just report the gaps)
// Patch: blocks starting "## Title" (must match a lesson). Lines before a "---" line go straight after the lesson's
// S: lead (LV:, O:, PRE:); lines after it are appended at the end of the lesson (content blocks, T:, SUM:, SRC:, EV:,
// and new questions, which go after the existing ones so position-keyed progress keys are unchanged).
// Then every lesson in the file is checked against the standard; problems are printed and the exit code is 1.
import { readFileSync, writeFileSync } from "node:fs";
import { parseNotes, norm } from "../kit/course/notes.js";

const [file, patchFile] = process.argv.slice(2);
const src = readFileSync(file, "utf8");
const head = src.slice(0, src.indexOf("export default `") + "export default `".length);
const body = src.slice(head.length, src.lastIndexOf("`"));
const tail = src.slice(src.lastIndexOf("`"));
const chunks = body.split(/\n(?=## )/);
const patches = new Map();
if (patchFile) for (const c of readFileSync(patchFile, "utf8").split(/\n(?=## )/)) {
  const m = c.match(/^## (.+)\n([\s\S]*)$/); if (!m) continue;
  const [pre, post = ""] = m[2].split(/\n---\n/);
  patches.set(norm(m[1]), { pre: pre.trim(), post: post.trim() });
}
const used = new Set();
const out = chunks.map((c) => {
  const t = c.match(/^## (.+)/m); if (!t) return c;
  const p = patches.get(norm(t[1])); if (!p) return c;
  used.add(norm(t[1]));
  let lines = c.replace(/\s+$/, "").split("\n");
  if (p.pre) { const i = lines.findIndex((l) => l.startsWith("S:")); lines.splice(i + 1, 0, ...p.pre.split("\n")); }
  if (p.post) lines.push(...p.post.split("\n"));
  return lines.join("\n") + "\n";
});
for (const k of patches.keys()) if (!used.has(k)) { console.error(`patch "${k}" matches no lesson`); process.exitCode = 1; }
const text = out.join("\n").replace(/\n{3,}/g, "\n\n");
for (const bad of ["`", "${"]) if (text.includes(bad)) { console.error(`contains ${bad}`); process.exit(1); }
writeFileSync(file, head + text + tail);

// the checks
const L = parseNotes(text); let n = 0;
for (const l of L) {
  const p = [], need = (ok, m) => ok || p.push(m);
  need(l.level, "LV"); need(l.objectives.length >= 2, "O x2"); need(l.terms.length >= 2, "T x2"); need(l.summary.length >= 1, "SUM");
  need(l.sources.length >= 2 && l.sources.every((s) => /^\d{4}/.test(s.date)), "SRC x2 dated"); need(l.evidence.length >= 1, "EV");
  const qs = [...l.mcq.map((m) => m.Q || m), ...l.tasks];
  need([1, 2, 3].every((d) => qs.some((q) => q.d === d)), `levels ${[...new Set(qs.map((q) => q.d))]}`);
  need(l.tasks.some((q) => q.type === "short"), "SA"); need(l.cards.length >= 3, "Q x3");
  for (const m of l.mcq) need(m.wrong.length >= 3, `distractors: ${m.q.slice(0, 40)}`);
  if (p.length) { n++; console.log(`${l.title}: ${p.join(", ")}`); }
}
console.log(`${L.length} lessons, ${n} with gaps`);
if (n) process.exitCode = 1;
