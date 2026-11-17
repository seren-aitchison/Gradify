// Lesson objectives that a lesson's own notes don't answer, found while building its mind maps (kit/maps/build.js).
// Each one is shown in the exam map as "The notes don't cover this directly yet"; this lists them all, by subject,
// so the lessons can be improved. Writes docs/reports/map-gaps.md.
//   node scripts/map-gaps.mjs [--subject law]
import { readdir, writeFile, mkdir } from "node:fs/promises";
import { parseNotes } from "../kit/course/notes.js";
import { buildMaps, plain } from "../kit/maps/build.js";

const only = process.argv.includes("--subject") ? process.argv[process.argv.indexOf("--subject") + 1] : null;
const root = new URL("../kit/courses/", import.meta.url);
const bySubject = [];
let lessons = 0, gaps = 0;
for (const subject of (await readdir(root)).sort()) {
  if (only && subject !== only) continue;
  let files = [];
  try { files = (await readdir(new URL(`${subject}/notes/`, root))).filter((f) => f.endsWith(".js")).sort(); } catch { continue; }
  const rows = [];
  let count = 0;
  for (const f of files) {
    const text = (await import(new URL(`${subject}/notes/${f}`, root))).default;
    if (typeof text !== "string") continue;
    parseNotes(text).forEach((L, i) => {
      count++;
      const g = buildMaps(L, { id: `${subject}:${f}:${i}`, notes: text }).coverage.gaps;
      if (g.length) rows.push({ unit: f.replace(/\.js$/, ""), lesson: plain(L.title), gaps: g });
    });
  }
  lessons += count;
  const n = rows.reduce((a, r) => a + r.gaps.length, 0); gaps += n;
  if (count) bySubject.push({ subject, count, rows, n });
}
const md = [`# Objectives the notes don't answer yet`, ``,
  `Made by \`node scripts/map-gaps.mjs\` from the mind map engine. An objective is listed when no point, term, example or`,
  `summary in its own lesson shares enough of its key words to answer it. Each is a prompt to improve the lesson, not`,
  `necessarily an error.`, ``,
  `**${gaps} objectives in ${bySubject.reduce((a, s) => a + s.rows.length, 0)} of ${lessons} lessons.**`, ``,
  `| Subject | Lessons | With a gap | Objectives |`, `|---|---:|---:|---:|`,
  ...bySubject.map((s) => `| ${s.subject} | ${s.count} | ${s.rows.length} | ${s.n} |`), ``];
for (const s of bySubject.filter((x) => x.rows.length)) {
  md.push(`## ${s.subject}`, ``);
  for (const r of s.rows) md.push(`- **${r.unit}: ${r.lesson.replace(/\|/g, "/")}**`, ...r.gaps.map((g) => `  - ${g}`));
  md.push(``);
}
await mkdir(new URL("../docs/reports/", import.meta.url), { recursive: true });
await writeFile(new URL("../docs/reports/map-gaps.md", import.meta.url), md.join("\n"));
console.log(`${gaps} objectives not answered by their notes, in ${lessons} lessons. Written to docs/reports/map-gaps.md`);
