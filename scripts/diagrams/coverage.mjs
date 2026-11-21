// Visual coverage for every course that has a plan (kit/diagrams/plans/<course>.mjs): which lessons have a diagram
// placed and passing, which have an interactive lab instead, which were planned but have nothing yet, and which were
// deliberately left without a visual (with the reason).
//
//   node scripts/diagrams/coverage.mjs                 every planned course
//   node scripts/diagrams/coverage.mjs physics maths   just these
//   node scripts/diagrams/coverage.mjs --list          also list every lesson and its visuals
//   node scripts/diagrams/coverage.mjs --json          machine-readable, one object per course
//
// A plan row is one of:
//   [lessonId, renderer, diagramId, what it shows]   a diagram (spec kit/diagrams/specs/<diagramId>.json, D: line placed)
//   [lessonId, "lab", labId, what it lets you do]     an existing interactive (kit/courses/<course>/interactives.js)
//   [lessonId, null, reason]                          no visual, and why
// A lesson may have several rows (a diagram and a lab, or two diagrams). Plans export PLAN (and NAME); the chemistry
// plan exports CHEMISTRY and GCSE (the GCSE chemistry school, which reuses the A level drawings).
// Exits 1 if anything planned is missing or failing.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname;
const manifest = JSON.parse(readFileSync(join(ROOT, "kit/diagrams/manifest.json"), "utf8"));
const args = process.argv.slice(2), list = args.includes("--list"), json = args.includes("--json");
const only = args.filter((a) => !a.startsWith("--"));

/** Lesson titles (ids.js, else the syllabus), the D: lines placed in each lesson's notes, and the course's labs. */
async function lessons(course) {
  const titles = {};
  const ids = join(ROOT, `kit/courses/${course}/ids.js`), syl = join(ROOT, `kit/courses/${course}/syllabus.js`);
  if (existsSync(ids)) for (const m of readFileSync(ids, "utf8").matchAll(/"(u\d\d-\d\d)":\s*"((?:[^"\\]|\\.)*)"/g)) titles[m[1]] = m[2];
  else if (existsSync(syl)) for (const u of (await import(syl)).UNITS || []) for (const l of u.lessons || []) titles[l.id] = l.title;
  const placed = {}, dir = join(ROOT, `kit/courses/${course}/notes`);
  if (existsSync(dir)) for (const f of readdirSync(dir).filter((f) => /^u\d+\.js$/.test(f))) {
    const src = readFileSync(join(dir, f), "utf8");
    for (const part of src.split(/\n## /).slice(1)) placed[`${f.replace(".js", "")} ${part.slice(0, part.indexOf("\n"))}`] = [...part.matchAll(/^D:\s*(\S+)\s*$/gm)].map((m) => m[1]);
  }
  const labs = new Set(), ix = join(ROOT, `kit/courses/${course}/interactives.js`);
  if (existsSync(ix)) for (const x of (await import(ix)).INTERACTIVES || []) labs.add(x.id);
  return { titles, placed, labs };
}

async function report(name, course, plan) {
  const { titles, placed, labs } = await lessons(course);
  const byLesson = new Map();
  for (const row of plan) byLesson.set(row[0], [...(byLesson.get(row[0]) || []), row]);
  const r = { name, course, lessons: byLesson.size, withDiagram: 0, withLab: 0, withBoth: 0, skipped: 0, notPlaced: 0, failing: 0, missing: [], reasons: {} };
  for (const [lid, rows] of byLesson) {
    const title = titles[lid], ds = placed[`${lid.slice(0, 3)} ${title}`] || [];
    const ok = ds.filter((d) => manifest[d] && manifest[d].status !== "failed");
    const dRows = rows.filter((x) => x[1] && x[1] !== "lab"), lRows = rows.filter((x) => x[1] === "lab"), none = rows.filter((x) => !x[1]);
    if (!title) r.missing.push(`${lid}: not in the ${course} syllabus`);
    if (!dRows.length && !lRows.length) { r.skipped++; for (const x of none) r.reasons[x[2]] = (r.reasons[x[2]] || 0) + 1; if (list) console.log(`  ${lid} ${title}: no visual (${none[0]?.[2]})`); continue; }
    const missingD = dRows.filter((x) => !ok.includes(x[2])), badL = lRows.filter((x) => !labs.has(x[2]));
    for (const x of missingD) { if (ds.includes(x[2])) { r.failing++; r.missing.push(`${lid} ${title}: ${x[2]} placed but failing`); } else { r.notPlaced++; r.missing.push(`${lid} ${title}: planned ${x[1]} ${x[2]}, not placed`); } }
    for (const x of badL) r.missing.push(`${lid} ${title}: lab ${x[2]} is not one of the course's interactives`);
    const hasD = dRows.length > 0 && !missingD.length, hasL = lRows.length > 0 && !badL.length;
    if (hasD) r.withDiagram++; if (hasL) r.withLab++; if (hasD && hasL) r.withBoth++;
    if (list) console.log(`  ${lid} ${title}: ${[...ok, ...lRows.map((x) => `lab:${x[2]}`)].join(", ")}`);
  }
  const counts = {}; for (const ds of Object.values(placed)) for (const d of ds) counts[d] = (counts[d] || 0) + 1;
  r.placements = Object.values(counts).reduce((t, n) => t + n, 0); r.ids = Object.keys(counts).length; r.reused = Object.entries(counts).filter(([, n]) => n > 1);
  return r;
}

const plans = readdirSync(join(ROOT, "kit/diagrams/plans")).filter((f) => f.endsWith(".mjs")).map((f) => f.replace(".mjs", ""));
const out = [];
for (const course of plans.filter((c) => !only.length || only.includes(c))) {
  const m = await import(join(ROOT, `kit/diagrams/plans/${course}.mjs`));
  out.push(await report(m.NAME || (course === "chemistry" ? "SciGradify Chemistry" : course), course, m.PLAN || m.CHEMISTRY));
  if (m.GCSE) out.push(await report("GCSE chemistry school", "gcse", m.GCSE));
}
if (json) console.log(JSON.stringify(out, null, 1));
else {
  for (const r of out) {
    console.log(`${r.name}: ${r.lessons} lessons assessed · ${r.lessons - r.skipped} with a visual planned · ${r.withDiagram} with a passing diagram · ${r.withLab} with a lab${r.withBoth ? ` (${r.withBoth} both)` : ""} · ${r.skipped} without one by design · ${r.notPlaced} planned but not placed · ${r.failing} failing`);
    console.log(`  ${r.placements} placements of ${r.ids} diagram ids; ${r.reused.length} reused${r.reused.length ? ` (${r.reused.map(([d, n]) => `${d} ×${n}`).join(", ")})` : ""}`);
    if (Object.keys(r.reasons).length) console.log(`  without a visual, by reason: ${Object.entries(r.reasons).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${n} × ${k}`).join("; ")}`);
    for (const m of r.missing) console.log(`  ✗ ${m}`);
  }
  const statuses = {}; for (const d of Object.values(manifest)) statuses[d.status] = (statuses[d.status] || 0) + 1;
  console.log(`all diagrams by status: ${Object.entries(statuses).map(([k, v]) => `${v} ${k}`).join(", ")}`);
}
process.exit(out.some((r) => r.missing.length) ? 1 : 0);
