#!/usr/bin/env node
// How ready the library is for the Learn mode (docs/LESSON-SCHEMA.md): per subject, the concept blocks, how many have a
// check, and on what basis (placed inside the block or tagged with its objective, in a v2 lesson; or matched by the
// adapter, in a v1 lesson). Technical compatibility isn't educational quality: a matched check is a confident
// guess, not a verified one, and a block without a check is a gap for the writing model to fill.
//   node scripts/content/learn-coverage.mjs [--json]
import { readdirSync } from "node:fs";
import { parseNotes } from "../../kit/course/notes.js";
import { checkCoverage } from "../../kit/course/blocks.js";

const rows = [];
for (const dir of readdirSync(new URL("../../kit/courses/", import.meta.url))) {
  let course; try { course = (await import(`../../kit/courses/${dir}/course.js`)).default; } catch { continue; }
  const r = { subject: course.slug || dir, lessons: 0, v2: 0, blocks: 0, checked: 0, placed: 0, tagged: 0, matched: 0 };
  for (const id of course.written || []) for (const L of parseNotes(await course.notes(id))) {
    const c = checkCoverage(L); r.lessons++; if (c.version === 2) r.v2++;
    for (const k of ["blocks", "checked", "placed", "tagged", "matched"]) r[k] += c[k];
  }
  if (r.lessons) rows.push(r);
}
const all = rows.reduce((a, r) => { for (const k of Object.keys(r)) if (k !== "subject") a[k] = (a[k] || 0) + r[k]; return a; }, { subject: "all" });
if (process.argv.includes("--json")) { console.log(JSON.stringify([...rows, all], null, 2)); process.exit(0); }
const pc = (a, b) => (b ? `${Math.round((100 * a) / b)}%` : "–");
console.log("subject        lessons   v2   blocks  with a check   placed/tagged  matched");
for (const r of [...rows.sort((a, b) => b.lessons - a.lessons), all]) console.log(`${r.subject.padEnd(14)} ${String(r.lessons).padStart(7)} ${String(r.v2).padStart(4)} ${String(r.blocks).padStart(8)}  ${`${r.checked} (${pc(r.checked, r.blocks)})`.padStart(12)}   ${String(r.placed + r.tagged).padStart(12)} ${String(r.matched).padStart(8)}`);
