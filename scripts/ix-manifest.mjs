// Writes kit/course/ix-manifest.js: a fingerprint of every interactive's code, so the site can tell when an
// interactive has changed since its expert review (kit/course/review.js). The fingerprint is a short SHA-256 of the
// module it loads and of the modules that one imports from the same folder or the shared kits.
//   node scripts/ix-manifest.mjs           (CI checks the file is up to date, like the sitemap)
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const COURSES = readdirSync(resolve(root, "kit/courses"), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();

// the module a registry entry loads, from its load() source: import("…") relative to the course folder
function moduleOf(slug, x) {
  // a path built from the entry's file name (import(`../../labs/maths/${f}`)) takes x.file
  const m = String(x.load).match(/import\(\s*["'`]([^"'`]+)["'`]\s*\)/);
  return m ? resolve(root, "kit/courses", slug, m[1].replace(/\$\{[^}]+\}/g, x.file || "")) : null;
}
// the module and its relative imports (one level of the lab's own helpers is enough to notice a change)
function files(entry) {
  const out = new Set([entry]), src = readFileSync(entry, "utf8");
  for (const m of src.matchAll(/(?:import|export)\s[^;]*?from\s*["']([^"']+)["']/g)) if (m[1].startsWith(".")) { const f = resolve(dirname(entry), m[1]); if (existsSync(f)) out.add(f); }
  return [...out].sort();
}

export async function manifest() {
  const out = {};
  for (const slug of COURSES) {
    const course = (await import(pathToFileURL(resolve(root, "kit/courses", slug, "course.js")))).default;
    for (const x of course.interactives || []) {
      const entry = moduleOf(slug, x); if (!entry || !existsSync(entry)) continue;
      const h = createHash("sha256"); for (const f of files(entry)) { h.update(relative(root, f)); h.update(readFileSync(f)); }
      out[`${slug}/${x.id}`] = h.digest("hex").slice(0, 16);
    }
  }
  return out;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const m = await manifest();
  writeFileSync(resolve(root, "kit/course/ix-manifest.js"), `// Fingerprints of every interactive's code, built by scripts/ix-manifest.mjs (don't edit by hand). Used with
// kit/course/reviews.js to show "Updated since last review" when an interactive changes after its expert review.
export const FINGERPRINTS = ${JSON.stringify(m, null, 1).replace(/\n\s*/g, " ")};
`);
  console.log(`ix-manifest: ${Object.keys(m).length} interactives`);
}
