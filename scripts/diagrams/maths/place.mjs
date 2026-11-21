// Place maths diagrams after the worked example they draw: for every maths-<unit>-* spec (or those whose id contains
// the argument), add `D: <id>` after the last "> " step of the lesson's first X: example (or at the end of the
// lesson's first section when it has no example). Idempotent. Usage: node scripts/diagrams/maths/place.mjs maths-u01
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../../", import.meta.url).pathname, SPECS = join(ROOT, "kit/diagrams/specs");
const only = process.argv[2] || "maths-";
for (const f of readdirSync(SPECS).filter((f) => f.startsWith("maths-") && f.includes(only)).sort()) {
  const spec = JSON.parse(readFileSync(join(SPECS, f), "utf8"));
  if (!spec.unit) continue;
  const file = join(ROOT, "kit/courses/maths/notes", `${spec.unit}.js`), lines = readFileSync(file, "utf8").split("\n");
  const start = lines.indexOf(`## ${spec.lesson}`);
  if (start < 0) { console.log(`✗ ${spec.id}: no lesson ${spec.lesson} in ${spec.unit}`); continue; }
  let end = lines.findIndex((l, i) => i > start && l.startsWith("## ")); if (end < 0) end = lines.length;
  if (lines.slice(start, end).some((l) => l.trim() === `D: ${spec.id}`)) continue;
  let at = lines.findIndex((l, i) => i > start && i < end && l.startsWith("X: "));
  if (at > 0) { while (lines[at + 1]?.startsWith("> ")) at++; }
  else { at = lines.findIndex((l, i) => i > start + 1 && i < end && /^(H|X|K|P): /.test(l)) - 1; if (at < 0) at = end - 1; }
  while (lines[at + 1]?.startsWith("D: ")) at++;
  lines.splice(at + 1, 0, `D: ${spec.id}`);
  writeFileSync(file, lines.join("\n"));
  console.log(`placed ${spec.id} in ${spec.unit} ${spec.lesson}`);
}
