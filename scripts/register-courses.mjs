// Register every course made with scripts/new-course.mjs across Gradify's shared files (run by the coordinating
// session after merging subject builders' work; builders never edit these files):
//   kit/core/sites.js   a site with written lessons moves from "soon" to "beta" (scripts/audit-sites.mjs rules)
//   sw.js               the course's config files are precached for offline use, and the cache version bumped
//   node scripts/register-courses.mjs [--check]     --check: report what would change, write nothing
import { readdir, readFile, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url), check = process.argv.includes("--check");
const read = (p) => readFile(new URL(p, root), "utf8");
let sites = await read("kit/core/sites.js"), sw = await read("sw.js");
const changes = [];
for (const slug of (await readdir(new URL("kit/courses/", root))).sort()) {
  const c = (await import(new URL(`kit/courses/${slug}/course.js`, root))).default;
  if (!c.page || !c.written?.length) continue;
  const line = sites.split("\n").find((l) => l.includes(`n: "${c.site}"`));
  if (line && /status: "soon"/.test(line)) { sites = sites.replace(line, line.replace('status: "soon"', 'status: "beta"')); changes.push(`${c.site}: soon → beta`); }
  const files = ["course.js", "syllabus.js", "ids.js", "qa.js", "interactives.js", "evidence.js", "registry.js"].map((f) => `"kit/courses/${slug}/${f}"`);
  if (!sw.includes(files[0])) {
    sw = sw.replace(/(\n\s*\/\/ the shared interactive engine)/, `\n  ${files.join(", ")},$1`);
    changes.push(`sw.js: precache ${slug}`);
  }
}
if (changes.some((x) => x.startsWith("sw.js"))) sw = sw.replace(/const CACHE = "gradify-v(\d+)";/, (_, n) => `const CACHE = "gradify-v${Number(n) + 1}";`);
console.log(changes.length ? changes.join("\n") : "Nothing to register.");
if (!check && changes.length) { await writeFile(new URL("kit/core/sites.js", root), sites); await writeFile(new URL("sw.js", root), sw); }
