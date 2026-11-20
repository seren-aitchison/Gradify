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

const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};
let failed = 0;
for (const f of readdirSync(SPECS).filter((f) => f.endsWith(".json")).sort()) {
  const spec = JSON.parse(readFileSync(join(SPECS, f), "utf8"));
  if (only && !spec.id.includes(only)) continue;
  const lesson = lessonSource(spec.course, spec.lesson);
  let out;
  if (spec.renderer === "mechanism") {
    const r = spawnSync("python3", [join(ROOT, "scripts/diagrams/chem.py"), join(SPECS, f)], { encoding: "utf8" });
    if (r.status !== 0) { console.error(r.stderr); out = { wide: "", narrow: "", checks: [{ name: "chemistry renderer ran", ok: false, detail: r.stderr.slice(-300) }] }; }
    else out = JSON.parse(r.stdout);
  } else out = render(spec, { lessonText: lesson?.text || "" });
  const checks = [
    { name: "the lesson exists", ok: !!lesson, detail: lesson ? `${lesson.file}: ${spec.lesson}` : `${spec.course}: ${spec.lesson} not found` },
    { name: "the lesson places this diagram (D: line)", ok: !!lesson && new RegExp(`^D:\\s*${spec.id}\\s*$`, "m").test(lesson.text) },
    { name: "has alt text, a caption and a step-by-step description", ok: !!(spec.alt && spec.caption && spec.description?.length) },
    ...out.checks,
  ];
  const ok = checks.every((c) => c.ok);
  if (out.wide) writeFileSync(join(OUT, `${spec.id}.wide.svg`), out.wide);
  if (out.narrow) writeFileSync(join(OUT, `${spec.id}.narrow.svg`), out.narrow);
  const status = !ok ? "failed" : spec.review?.status === "approved" && spec.review.by ? "approved" : spec.review?.status === "ai-reviewed" ? "ai-reviewed" : "validated";
  manifest[spec.id] = {
    title: spec.title, caption: spec.caption, alt: spec.alt, description: spec.description,
    course: spec.course, lesson: spec.lesson, renderer: spec.renderer, status,
    review: spec.review || null, checks,
  };
  failed += ok ? 0 : 1;
  console.log(`${ok ? "✓" : "✗"} ${spec.id.padEnd(28)} ${status.padEnd(12)} ${checks.filter((c) => c.ok).length}/${checks.length} checks`);
  for (const c of checks.filter((c) => !c.ok)) console.log(`    ✗ ${c.name}: ${c.detail || ""}`);
}
writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 1)}\n`);
process.exit(failed ? 1 : 0);
