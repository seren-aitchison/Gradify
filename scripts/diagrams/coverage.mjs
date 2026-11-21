// Diagram coverage for a course plan (kit/diagrams/plans/<course>.mjs): which lessons have a diagram placed and passing,
// which were planned but have none, and which were deliberately left without one (with the reason).
//
//   node scripts/diagrams/coverage.mjs            the chemistry plan (SciGradify Chemistry and the GCSE chemistry school)
//   node scripts/diagrams/coverage.mjs --list     also list every lesson and its diagrams
//
// A lesson counts as covered when its notes contain a `D: <id>` line whose diagram built without a failed check.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { CHEMISTRY, GCSE } from "../../kit/diagrams/plans/chemistry.mjs";

const ROOT = new URL("../../", import.meta.url).pathname;
const manifest = JSON.parse(readFileSync(join(ROOT, "kit/diagrams/manifest.json"), "utf8"));
const list = process.argv.includes("--list");

function lessons(course) {
  const ids = Object.fromEntries([...readFileSync(join(ROOT, `kit/courses/${course}/ids.js`), "utf8").matchAll(/"(u\d\d-\d\d)":\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => [m[1], m[2]]));
  const placed = {};
  const dir = join(ROOT, `kit/courses/${course}/notes`);
  for (const f of readdirSync(dir).filter((f) => /^u\d+\.js$/.test(f))) {
    const src = readFileSync(join(dir, f), "utf8");
    for (const part of src.split(/\n## /).slice(1)) {
      const title = part.slice(0, part.indexOf("\n"));
      placed[`${f.replace(".js", "")} ${title}`] = [...part.matchAll(/^D:\s*(\S+)\s*$/gm)].map((m) => m[1]);
    }
  }
  return { ids, placed };
}

function report(name, course, plan) {
  const { ids, placed } = lessons(course);
  let covered = 0, skipped = 0, failed = 0, notPlaced = 0;
  const missing = [], distinct = new Set();
  for (const row of plan) {
    const [lid, renderer] = row, title = ids[lid], ds = placed[`${lid.slice(0, 3)} ${title}`] || [];
    const ok = ds.filter((d) => manifest[d] && manifest[d].status !== "failed");
    if (!renderer) { skipped++; if (list) console.log(`  ${lid} ${title}: no diagram (${row[2]})`); continue; }
    if (ok.length) { covered++; ok.forEach((d) => distinct.add(d)); }
    else if (ds.length) { failed++; missing.push(`${lid} ${title}: placed but failing (${ds.join(", ")})`); }
    else { notPlaced++; missing.push(`${lid} ${title}: planned ${row[2]}, nothing placed`); }
    if (list && ok.length) console.log(`  ${lid} ${title}: ${ok.join(", ")}`);
  }
  console.log(`${name}: ${plan.length} lessons · ${covered} with a passing diagram (${distinct.size} distinct diagrams; one can serve several lessons) · ${skipped} without one by design · ${notPlaced} planned but not placed · ${failed} failing`);
  for (const m of missing) console.log(`  ✗ ${m}`);
  return missing.length;
}

const bad = report("SciGradify Chemistry", "chemistry", CHEMISTRY) + report("GCSE chemistry school", "gcse", GCSE);
const statuses = {};
for (const [id, d] of Object.entries(manifest)) if (id.startsWith("chem-")) statuses[d.status] = (statuses[d.status] || 0) + 1;
console.log(`chemistry diagrams by status: ${Object.entries(statuses).map(([k, v]) => `${v} ${k}`).join(", ")}`);
process.exit(bad ? 1 : 0);
