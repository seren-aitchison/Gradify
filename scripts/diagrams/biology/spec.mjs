// Write biology diagram specs (mirrors scripts/diagrams/chemistry/spec.py). Each batch file
// (scripts/diagrams/biology/uNN.mjs) calls mk() once per diagram; running it rewrites those specs in
// kit/diagrams/specs/. The lesson is named by its permanent id ("u02-08") and the title looked up in
// kit/courses/biology/ids.js, so a renamed lesson cannot leave a diagram pointing nowhere.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../../", import.meta.url).pathname, SPECS = join(ROOT, "kit/diagrams/specs");
const ids = (course) => Object.fromEntries([...readFileSync(join(ROOT, `kit/courses/${course}/ids.js`), "utf8").matchAll(/"(u\d\d-\d\d)":\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => [m[1], m[2]]));
const IDS = { biology: ids("biology") };

/** lesson: a biology lesson id ("u01-03"); id: "bio-u01-<slug>"; description: steps; body: the renderer's data. */
export function mk(lesson, id, renderer, { title, caption, alt, description, also = [], ...body }) {
  if (!IDS.biology[lesson]) throw new Error(`no biology lesson ${lesson}`);
  if (!/^bio-u\d\d-[a-z0-9-]+$/.test(id) || id.slice(4, 7) !== lesson.slice(0, 3)) throw new Error(`spec id ${id} should be bio-${lesson.slice(0, 3)}-<slug>`);
  const spec = { id, renderer, course: "biology", unit: lesson.slice(0, 3), lesson: IDS.biology[lesson], title, caption, alt, description: [...description] };
  if (also.length) spec.also = also.map((a) => { const [course, l] = a.split(":"); IDS[course] ||= ids(course); return { course, unit: l.slice(0, 3), lesson: IDS[course][l] }; });
  Object.assign(spec, body);
  writeFileSync(join(SPECS, `${id}.json`), `${JSON.stringify(spec, null, 1)}\n`);
  return spec;
}
