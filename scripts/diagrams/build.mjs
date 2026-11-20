// Gradify Visual Learning Engine: build every diagram spec into checked, static SVG.
//
//   node scripts/diagrams/build.mjs            build all specs in kit/diagrams/specs
//   node scripts/diagrams/build.mjs chem-sn2   build the specs whose id contains "chem-sn2"
//
// For each spec it: finds the lesson the diagram belongs to; renders a wide (desktop) and a narrow (phone) SVG,
// with scripts/diagrams/chem.py for chemistry (RDKit) and kit/diagrams/renderers.js for everything else; runs the
// renderer's subject checks; checks the lesson places the diagram with a `D: <id>` line; and writes
// kit/diagrams/svg/<id>.wide.svg, <id>.narrow.svg and an entry in kit/diagrams/manifest.json.
//
// Publication status (shown to learners only when "approved"; see kit/diagrams/visual.js):
//   failed       a check failed; never shown
//   validated    every automatic check passed; no reviewer yet
//   ai-reviewed  a separate AI reviewer checked accuracy and the picture (spec.review), still awaiting a person
//   approved     a named subject reviewer approved it (spec.review.status = "approved", spec.review.by)
// Exits with status 1 if any check fails.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { render } from "../../kit/diagrams/renderers.js";
import "../../kit/diagrams/chem-renderers.js"; // registers the chemistry renderers
import "../../kit/diagrams/chem-renderers-2.js";
import "../../kit/diagrams/chem-renderers-3.js";

const ROOT = new URL("../../", import.meta.url).pathname;
const SPECS = join(ROOT, "kit/diagrams/specs"), OUT = join(ROOT, "kit/diagrams/svg"), MANIFEST = join(ROOT, "kit/diagrams/manifest.json");
mkdirSync(OUT, { recursive: true });
const only = process.argv[2] || "";

// the raw notes of one lesson, from kit/courses/<course>/notes/u*.js
function lessonSource(course, title) {
  const dir = join(ROOT, "kit/courses", course, "notes");
  if (!existsSync(dir)) return null;
  for (const f of readdirSync(dir).filter((f) => /^u\d+\.js$/.test(f))) {
    const src = readFileSync(join(dir, f), "utf8"), at = src.indexOf(`\n## ${title}\n`);
    if (at < 0) continue;
    const end = src.indexOf("\n## ", at + 4);
    return { file: `kit/courses/${course}/notes/${f}`, text: src.slice(at + 1, end < 0 ? undefined : end) };
  }
  return null;
}

// The lesson column is about 707px wide on desktop and scales the wide layout to fit. Past MAX_WIDE the atom symbols
// (19px) drop below 14px and the stage labels (15px) below 11px on screen, so a wider layout must be tightened or
// wrapped into rows (perRow) instead.
const COLUMN = 707, MAX_WIDE = 960;
function legible(svg) {
  const w = Number(/viewBox="0 0 ([\d.]+)/.exec(svg || "")?.[1] || 0);
  return { name: `wide layout legible in the ${COLUMN}px lesson column (at most ${MAX_WIDE}px wide)`, ok: w > 0 && w <= MAX_WIDE,
    detail: `${Math.round(w)}px wide, shown at ${Math.round((COLUMN / w) * 100)}% (labels ${((15 * COLUMN) / w).toFixed(1)}px)` };
}

const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};
let failed = 0;
for (const f of readdirSync(SPECS).filter((f) => f.endsWith(".json")).sort()) {
  const spec = JSON.parse(readFileSync(join(SPECS, f), "utf8"));
  if (only && !spec.id.includes(only)) continue;
  const lesson = lessonSource(spec.course, spec.lesson);
  let out;
  const PY = { mechanism: "chem.py", structures: "chem_more.py", nmr: "chem_more.py", ms: "chem_more.py", ir: "chem_more.py" };
  if (PY[spec.renderer]) {
    const r = spawnSync("python3", [join(ROOT, "scripts/diagrams", PY[spec.renderer]), join(SPECS, f)], { encoding: "utf8", maxBuffer: 64 << 20 });
    if (r.status !== 0) { console.error(r.stderr); out = { wide: "", narrow: "", checks: [{ name: "chemistry renderer ran", ok: false, detail: r.stderr.slice(-300) }] }; }
    else out = JSON.parse(r.stdout);
  } else {
    // a spec the renderer cannot draw fails on its own instead of stopping the build
    try { out = render(spec, { lessonText: lesson?.text || "" }); }
    catch (e) { out = { wide: "", narrow: "", checks: [{ name: "the renderer drew the spec", ok: false, detail: String(e.message || e).slice(0, 300) }] }; }
  }
  if (!out.checks.length) out.checks.push({ name: "the renderer checked the subject", ok: false, detail: "no subject checks ran for this spec" });
  // a diagram can be placed in more than one lesson (spec.also: [{course, lesson}]), e.g. a GCSE lesson reusing it
  const places = (l) => !!l && new RegExp(`^D:\\s*${spec.id}\\s*$`, "m").test(l.text);
  const extra = (spec.also || []).map((a) => ({ ...a, src: lessonSource(a.course, a.lesson) }));
  const checks = [
    { name: "the lesson exists", ok: !!lesson, detail: lesson ? `${lesson.file}: ${spec.lesson}` : `${spec.course}: ${spec.lesson} not found` },
    { name: "the lesson places this diagram (D: line)", ok: places(lesson) },
    ...extra.map((a) => ({ name: `also placed in ${a.course}: ${a.lesson}`, ok: places(a.src), detail: a.src ? a.src.file : "lesson not found" })),
    { name: "has alt text, a caption and a step-by-step description", ok: !!(spec.alt && spec.caption && spec.description?.length) },
    ...out.checks,
    legible(out.wide),
  ];
  const ok = checks.every((c) => c.ok);
  if (out.wide) writeFileSync(join(OUT, `${spec.id}.wide.svg`), out.wide);
  if (out.narrow) writeFileSync(join(OUT, `${spec.id}.narrow.svg`), out.narrow);
  const status = !ok ? "failed" : spec.review?.status === "approved" && spec.review.by ? "approved" : spec.review?.status === "ai-reviewed" ? "ai-reviewed" : "validated";
  manifest[spec.id] = {
    title: spec.title, caption: spec.caption, alt: spec.alt, description: spec.description,
    course: spec.course, lesson: spec.lesson, also: spec.also || [], renderer: spec.renderer, status,
    review: spec.review || null, checks,
  };
  failed += ok ? 0 : 1;
  console.log(`${ok ? "✓" : "✗"} ${spec.id.padEnd(28)} ${status.padEnd(12)} ${checks.filter((c) => c.ok).length}/${checks.length} checks`);
  for (const c of checks.filter((c) => !c.ok)) console.log(`    ✗ ${c.name}: ${c.detail || ""}`);
}
writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 1)}\n`);
process.exit(failed ? 1 : 0);
