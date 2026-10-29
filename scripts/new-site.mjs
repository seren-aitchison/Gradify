// Start a Gradify sub-site at getgradify.com/<name>/:
//   npm run new-site -- MedGradify            (homepage and study app)
//   npm run new-site -- MedGradify --lifeos   (also the LifeOS window, with example data)
// Makes the folder from kit/templates/subsite, and marks the site as built in
// kit/core/sites.js so the directory on getgradify.com links to it.
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { SITES, slugOf } from "../kit/core/site.js";

const [name, ...flags] = process.argv.slice(2);
const site = SITES.find((s) => s.n === name || slugOf(s) === String(name).toLowerCase());
if (!site) {
  console.error(`Usage: npm run new-site -- <site name>\nSites: ${SITES.map((s) => s.n).join(", ")}`);
  process.exit(1);
}
const slug = slugOf(site), dir = slug;
if (await access(dir).then(() => true, () => false)) { console.error(`${dir}/ already exists. Nothing changed.`); process.exit(1); }
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const fill = (t) => t.replaceAll("{{NAME}}", site.n).replaceAll("{{DESC}}", esc(site.d)).replaceAll("{{WHO}}", esc(site.who || ""));
await mkdir(dir);
const pages = ["index.html", "app.html", ...(flags.includes("--lifeos") ? ["lifeos.html"] : [])];
for (const page of pages) await writeFile(`${dir}/${page}`, fill(await readFile(`kit/templates/subsite/${page}`, "utf8")));

// mark it built, so the directory links to getgradify.com/<slug>/
const file = "kit/core/sites.js";
const src = await readFile(file, "utf8");
const line = src.split("\n").find((l) => l.includes(`n: "${site.n}"`));
if (line && !/built: true/.test(line)) await writeFile(file, src.replace(line, line.replace(/ \},?\s*$/, (end) => `, built: true${end}`)));

console.log(`Made ${dir}/ (${pages.join(", ")}). It's live at getgradify.com/${slug}/ once pushed.
The directory now links to it. Build the homepage out from ${dir}/index.html.`);
