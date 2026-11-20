// Place diagrams in their lessons: for every spec in kit/diagrams/specs (or those whose id contains the argument),
// add a `D: <id>` line to the lesson named by spec.course/spec.lesson and to each lesson in spec.also, if it is not
// there yet. The line goes at the end of the lesson's first section (just before its second `H:` heading, or before
// the first P:/X:/K: line when there is only one section), so the picture sits beside the teaching it illustrates.
// Idempotent. Usage: node scripts/diagrams/place.mjs [idFilter]
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname;
const SPECS = join(ROOT, "kit/diagrams/specs");
const only = process.argv[2] || "";

function placeIn(course, title, id) {
  const dir = join(ROOT, "kit/courses", course, "notes");
  if (!existsSync(dir)) return `no notes for ${course}`;
  for (const f of readdirSync(dir).filter((f) => /^u\d+\.js$/.test(f))) {
    const file = join(dir, f), src = readFileSync(file, "utf8"), at = src.indexOf(`\n## ${title}\n`);
    if (at < 0) continue;
    const endAt = src.indexOf("\n## ", at + 4), end = endAt < 0 ? src.length : endAt;
    const lesson = src.slice(at, end);
    if (new RegExp(`^D:\\s*${id}\\s*$`, "m").test(lesson)) return "already placed";
    const lines = lesson.split("\n");
    const heads = lines.map((l, i) => (/^H:/.test(l) ? i : -1)).filter((i) => i >= 0);
    let k = heads.length > 1 ? heads[1] : lines.findIndex((l) => /^(P|X|K|EV|T|SUM|SRC|Q|M\d|D):/.test(l));
    if (k < 0) k = lines.length;
    // after any diagram lines already ending this section, so several diagrams keep their order
    while (k < lines.length && /^D:/.test(lines[k])) k++;
    lines.splice(k, 0, `D: ${id}`);
    writeFileSync(file, src.slice(0, at) + lines.join("\n") + src.slice(end));
    return `placed in ${course}/notes/${f}`;
  }
  return `lesson not found: ${course}: ${title}`;
}

for (const f of readdirSync(SPECS).filter((f) => f.endsWith(".json")).sort()) {
  const spec = JSON.parse(readFileSync(join(SPECS, f), "utf8"));
  if (only && !spec.id.includes(only)) continue;
  for (const p of [{ course: spec.course, lesson: spec.lesson }, ...(spec.also || [])]) {
    const r = placeIn(p.course, p.lesson, spec.id);
    if (r !== "already placed") console.log(`${spec.id.padEnd(34)} ${r}`);
  }
}
