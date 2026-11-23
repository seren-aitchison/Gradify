// Per-unit diagram status for maths or physics, as a Markdown table, from the plans, the syllabus/ids and the
// manifest. Paste its output into the subject's HANDOVER.md after a unit lands (or read it to see what is left).
//
//   node scripts/diagrams/unit-status.mjs maths
//   node scripts/diagrams/unit-status.mjs physics --needs     also list every "needs renderer" plan row
//
// Status: done = every lesson in the unit has a plan row; partial = some do; not started = none do.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname;
const course = process.argv[2];
if (!["maths", "physics"].includes(course)) { console.error("usage: unit-status.mjs maths|physics [--needs]"); process.exit(2); }
const needsList = process.argv.includes("--needs");
const P = course === "maths" ? "maths" : "phys";
const manifest = JSON.parse(readFileSync(join(ROOT, "kit/diagrams/manifest.json"), "utf8"));

const titles = {};
const ids = join(ROOT, `kit/courses/${course}/ids.js`), syl = join(ROOT, `kit/courses/${course}/syllabus.js`);
if (existsSync(ids)) for (const m of readFileSync(ids, "utf8").matchAll(/"(u\d\d-\d\d)":\s*"((?:[^"\\]|\\.)*)"/g)) titles[m[1]] = m[2];
else for (const u of (await import(syl)).UNITS || []) for (const l of u.lessons || []) titles[l.id] = l.title;

const units = readdirSync(join(ROOT, `kit/diagrams/plans/${course}`)).filter((f) => /^u\d\d\.mjs$/.test(f)).sort();
const rows = [], needs = [];
const tot = { lessons: 0, planned: 0, diagrams: 0, lab: 0, none: 0, failing: 0 };
for (const f of units) {
  const u = f.slice(0, 3);
  const plan = (await import(join(ROOT, `kit/diagrams/plans/${course}/${f}`))).default;
  const lessons = Object.keys(titles).filter((id) => id.startsWith(u + "-")).length;
  const by = new Map();
  for (const r of plan) by.set(r[0], [...(by.get(r[0]) || []), r]);
  const diagIds = new Set(plan.filter((r) => r[1] && r[1] !== "lab").map((r) => r[2]));
  const lab = [...by.values()].filter((rs) => rs.some((r) => r[1] === "lab")).length;
  const none = [...by.values()].filter((rs) => rs.every((r) => !r[1])).length;
  const failing = [...diagIds].filter((d) => !manifest[d] || manifest[d].status === "failed").length;
  for (const r of plan) if (!r[1] && /needs renderer/i.test(r[2])) needs.push(`${r[0]}: ${r[2]}`);
  const head = readFileSync(join(ROOT, `kit/courses/${course}/notes/${u}.js`), "utf8").split("\n")[0];
  const title = (head.match(/^\/\/ (?:Unit|School) \d+: (.*?)(?:\. Format.*)?$/) || [, ""])[1];
  const status = by.size === 0 ? "not started" : by.size >= lessons ? "done" : "partial";
  rows.push(`| ${u} | ${title} | ${status} | ${lessons} | ${by.size} | ${diagIds.size} | ${lab} | ${none} | ${failing} |`);
  Object.assign(tot, { lessons: tot.lessons + lessons, planned: tot.planned + by.size, diagrams: tot.diagrams + diagIds.size, lab: tot.lab + lab, none: tot.none + none, failing: tot.failing + failing });
}
console.log(`| unit | title | status | lessons | planned | diagrams (\`${P}-uNN-*\`) | lessons with a lab | lessons with no visual | failing |`);
console.log("|---|---|---|---:|---:|---:|---:|---:|---:|");
console.log(rows.join("\n"));
console.log(`| all | | ${rows.filter((r) => r.includes("| done |")).length} of ${units.length} done | ${tot.lessons} | ${tot.planned} | ${tot.diagrams} | ${tot.lab} | ${tot.none} | ${tot.failing} |`);
if (needsList) { console.log(`\n${needs.length} plan rows need a renderer:`); for (const n of needs) console.log(`- ${n}`); }
