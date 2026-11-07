// Writes docs/SUBJECT_CONFIG_SPEC.md from kit/course/spec.js, so the documented spec is always the checked one.
//   node scripts/subject-spec-doc.mjs        (also run by npm run qa; tests/cross-site.test.mjs checks it's current)
import { writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { FIELDS } from "../kit/course/spec.js";

export function specDoc() {
  const caps = [...new Set(FIELDS.map((f) => f[3]))];
  return ["# Subject configuration spec", "",
    "Generated from `kit/course/spec.js` by `scripts/subject-spec-doc.mjs`; edit the spec there, not here.", "",
    "A Gradify course is a config object handed to the shared course engine (`mountCourse(el, cfg)` in `kit/course/course.js`). `checkCourse(cfg)` checks a config against this spec and `tests/cross-site.test.mjs` runs it on every course. A subject adapter (`kit/subjects/`) can supply any of these fields as defaults, which the course's own fields override. See [GRADIFY_PLATFORM.md](GRADIFY_PLATFORM.md) for how the pieces fit.", "",
    ...caps.flatMap((cap) => [`## ${cap}`, "", "| Field | Type | Required | What it does |", "|---|---|---|---|",
      ...FIELDS.filter((f) => f[3] === cap).map(([n, t, r, , d]) => `| \`${n}\` | ${t} | ${r ? "yes" : ""} | ${d.replace(/\|/g, "\\|")} |`), ""]),
    "## Checks beyond types", "",
    "- Unit ids, lesson ids and slugs are unique; `slug` is lower case.",
    "- `written`, `tracks` and `paths` name units that exist; `levels` has exactly three names.",
    "- Every interactive has `id`, `title` and `load()`, and names only lessons that exist; every `evidence` entry names a real lesson.",
    "- `workspace` has a `route` and `engine()`; `concepts` has a `modules` object (its references are checked by `npm run qa`).",
    "- Any field not listed here is reported as unknown, so a typo can't silently switch something off.", ""].join("\n");
}
if (import.meta.url === pathToFileURL(process.argv[1]).href) { await writeFile(new URL("../docs/SUBJECT_CONFIG_SPEC.md", import.meta.url), specDoc()); console.log("docs/SUBJECT_CONFIG_SPEC.md written"); }
