// Place diagrams in their lessons: for every spec in kit/diagrams/specs (or those whose id contains the argument),
// add a `D: <id>` line to the lesson named by spec.course/spec.lesson and to each lesson in spec.also, if it is not
// there yet. The line goes at the end of the lesson's first section (just before its second `H:` heading, or before
// the first P:/X:/K: line when there is only one section), so the picture sits beside the teaching it illustrates.
// Idempotent. Usage: node scripts/diagrams/place.mjs [idFilter]
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname;
const SPECS = join(ROOT, "kit/diagrams/specs");
const only = process.argv.slice(2).find((a) => !a.startsWith("--")) || "";

function placeIn(course, title, id, unit) {
  const dir = join(ROOT, "kit/courses", course, "notes");
  if (!existsSync(dir)) return `no notes for ${course}`;
  for (const f of readdirSync(dir).filter((f) => /^u\d+\.js$/.test(f) && (!unit || f === `${unit}.js`))) {
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

const specs = readdirSync(SPECS).filter((f) => f.endsWith(".json")).sort().map((f) => JSON.parse(readFileSync(join(SPECS, f), "utf8")));
const where = (spec) => [{ course: spec.course, lesson: spec.lesson, unit: spec.unit }, ...(spec.also || [])];

// --clean: remove D: lines whose diagram does not list that lesson (a lesson title can repeat across units)
if (process.argv.includes("--clean")) {
  const byId = Object.fromEntries(specs.map((s) => [s.id, s]));
  for (const course of [...new Set(specs.flatMap((s) => where(s).map((p) => p.course)))]) {
    const dir = join(ROOT, "kit/courses", course, "notes");
    for (const f of readdirSync(dir).filter((f) => /^u\d+\.js$/.test(f))) {
      const file = join(dir, f), src = readFileSync(file, "utf8"), unit = f.replace(".js", "");
      let removed = 0;
      const out = src.split(/(?=\n## )/).map((part) => {
        const title = part.startsWith("\n## ") ? part.slice(4, part.indexOf("\n", 4)) : null;
        return part.replace(/^D:\s*(\S+)\s*\n/gm, (line, id) => {
          const spec = byId[id];
          if (!spec || !title) return line;
          const ok = where(spec).some((p) => p.course === course && p.lesson === title && (!p.unit || p.unit === unit));
          if (!ok) removed++;
          return ok ? line : "";
        });
      }).join("");
      if (removed) { writeFileSync(file, out); console.log(`removed ${removed} misplaced diagram line(s) from ${course}/notes/${f}`); }
    }
  }
}

for (const spec of specs) {
  if (only && !spec.id.includes(only)) continue;
  for (const p of where(spec)) {
    const r = placeIn(p.course, p.lesson, spec.id, p.unit);
    if (r !== "already placed") console.log(`${spec.id.padEnd(34)} ${r}`);
  }
}
