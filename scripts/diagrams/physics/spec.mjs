// Write physics diagram specs. Each unit's batch script (scripts/diagrams/physics/uNN.mjs) calls mk() once per
// diagram; running it rewrites those specs in kit/diagrams/specs/. The lesson is named by its syllabus id (u04-12) and
// its title is looked up in kit/courses/physics/syllabus.js, so a renamed lesson cannot leave a diagram pointing
// nowhere. Compute numbers once in the batch script and use them in the spec, the caption and the claims.
//
//   import { mk } from "./spec.mjs";
//   mk("u01-06", "phys-u01-boat-velocity", "vectors", { title, caption, alt, description: [steps], ...renderer data });
//
// As a command, it lists a unit for planning: lesson ids, titles, section headings, labs and placed diagrams.
//   node scripts/diagrams/physics/spec.mjs u04
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { UNITS } from "../../../kit/courses/physics/syllabus.js";

const ROOT = new URL("../../../", import.meta.url).pathname;
const SPECS = join(ROOT, "kit/diagrams/specs");
export const TITLES = Object.fromEntries(UNITS.flatMap((u) => u.lessons.map((l) => [l.id, l.title])));

/** Write one spec. Keeps a recorded review if the spec's content has not changed. */
export function mk(lesson, id, renderer, { title, caption, alt, description, also, ...body }) {
  if (!TITLES[lesson]) throw new Error(`${id}: no physics lesson ${lesson}`);
  if (!id.startsWith(`phys-${lesson.slice(0, 3)}-`)) throw new Error(`${id}: ids for ${lesson} start with phys-${lesson.slice(0, 3)}-`);
  for (const [k, v] of Object.entries({ title, caption, alt })) if (!v) throw new Error(`${id}: missing ${k}`);
  if ("unit" in body || "course" in body || "lesson" in body) throw new Error(`${id}: unit, course and lesson are set by mk(); a renderer's unit of measurement is \`units\``);
  if (!Array.isArray(description) || !description.length) throw new Error(`${id}: description must be a list of steps`);
  const spec = { id, renderer, course: "physics", unit: lesson.slice(0, 3), lesson: TITLES[lesson], title, caption, alt, description };
  if (also) spec.also = also.map((a) => ({ course: "physics", unit: a.slice(0, 3), lesson: TITLES[a] }));
  Object.assign(spec, body);
  const file = join(SPECS, `${id}.json`);
  if (existsSync(file)) {
    const old = JSON.parse(readFileSync(file, "utf8"));
    const strip = (s) => JSON.stringify({ ...s, review: undefined });
    if (old.review && strip(old) === strip(spec)) spec.review = old.review;
  }
  writeFileSync(file, `${JSON.stringify(spec, null, 1)}\n`);
  return spec;
}

if (process.argv[1] && process.argv[1].endsWith("spec.mjs") && process.argv[2]) {
  const unit = process.argv[2], u = UNITS.find((x) => x.id === unit);
  if (!u) { console.error(`no unit ${unit}`); process.exit(1); }
  const src = readFileSync(join(ROOT, `kit/courses/physics/notes/${unit}.js`), "utf8");
  const { INTERACTIVES } = await import(join(ROOT, "kit/courses/physics/interactives.js"));
  console.log(`${u.id} ${u.title}: ${u.lessons.length} lessons`);
  for (const l of u.lessons) {
    const at = src.indexOf(`\n## ${l.title}\n`), end = src.indexOf("\n## ", at + 4), part = at < 0 ? "" : src.slice(at, end < 0 ? undefined : end);
    const heads = [...part.matchAll(/^H: (.*)$/gm)].map((m) => m[1]), ds = [...part.matchAll(/^D:\s*(\S+)/gm)].map((m) => m[1]);
    const labs = INTERACTIVES.filter((x) => (x.lessons || []).includes(l.id)).map((x) => x.id);
    const ex = (part.match(/^X: .*/m) || [""])[0].slice(3, 110);
    console.log(`${l.id} ${l.title}${at < 0 ? "  [NOT WRITTEN]" : ""}\n    sections: ${heads.join(" · ")}${ex ? `\n    example: ${ex}` : ""}${labs.length ? `\n    labs: ${labs.join(", ")}` : ""}${ds.length ? `\n    placed: ${ds.join(", ")}` : ""}`);
  }
}
