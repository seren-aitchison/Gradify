// Write maths diagram specs. Each batch file (scripts/diagrams/maths/uNN.mjs) calls mk() once per diagram; running it
// rewrites those specs in kit/diagrams/specs/. The lesson is named by its permanent id (u01-05) and the title is
// looked up in kit/courses/maths/ids.js, so a renamed lesson cannot leave a diagram pointing nowhere. Compute every
// number once in the batch file and use it in the caption, the drawing and the checks.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../../", import.meta.url).pathname;
const SPECS = join(ROOT, "kit/diagrams/specs");
const ids = (course) => Object.fromEntries([...readFileSync(join(ROOT, `kit/courses/${course}/ids.js`), "utf8").matchAll(/"(u\d\d-\d\d)":\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => [m[1], m[2]]));
const IDS = { maths: ids("maths") };

/**
 * lesson: a maths lesson id ("u01-05"); id: "maths-u01-<slug>"; description: steps; body: the renderer's data, plus
 * fromLesson: [strings the lesson's notes must contain] and also: ["maths:u05-13"] for extra placements.
 */
export function mk(lesson, id, renderer, title, caption, alt, description, body = {}) {
  if (!IDS.maths[lesson]) throw new Error(`no maths lesson ${lesson}`);
  if (!new RegExp(`^maths-${lesson.slice(0, 3)}-[a-z0-9-]+$`).test(id)) throw new Error(`${id}: ids are maths-${lesson.slice(0, 3)}-<slug>`);
  const { also = [], ...rest } = body;
  const spec = { id, renderer, course: "maths", unit: lesson.slice(0, 3), lesson: IDS.maths[lesson], title, caption, alt, description: [...description] };
  if (also.length) spec.also = also.map((a) => { const [course, l] = a.split(":"); return { course, unit: l.slice(0, 3), lesson: (IDS[course] ||= ids(course))[l] }; });
  Object.assign(spec, rest);
  writeFileSync(join(SPECS, `${id}.json`), `${JSON.stringify(spec, null, 1)}\n`);
  return spec;
}
