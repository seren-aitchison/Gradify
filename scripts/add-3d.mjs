// Give every sub-site that has a model in kit/models/index.js its 3D page (<site>/3d.html, from
// kit/templates/subsite/3d.html) and a link to it in the navigation of its other pages.
//   npm run add-3d
import { readFile, writeFile, readdir, access } from "node:fs/promises";
import { SITES, slugOf } from "../kit/core/site.js";
import { MODELS } from "../kit/models/index.js";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const template = await readFile("kit/templates/subsite/3d.html", "utf8");
// models built on the anatomy GLB: preload it (and its decoder) with the page
const ANATOMY = ["body.js", "athlete.js", "mouth.js", "brain.js"];
const PRELOAD_ANATOMY = `
  <link rel="preload" as="fetch" crossorigin href="../kit/vendor/anatomy/anatomy-male.glb">
  <link rel="preload" as="fetch" crossorigin href="../kit/vendor/anatomy/catalog.json">
  <link rel="modulepreload" href="../kit/vendor/three/addons/meshopt_decoder.module.js">`;
for (const [name, m] of Object.entries(MODELS)) {
  const site = SITES.find((s) => s.n === name), dir = slugOf(site);
  if (!(await access(dir).then(() => true, () => false))) { console.log(`${dir}/ doesn't exist yet: run npm run new-site -- ${name} first.`); continue; }
  // an existing page may have hand-made navigation: only create missing pages unless asked (npm run add-3d -- --force)
  const exists = await access(`${dir}/3d.html`).then(() => true, () => false);
  if (!exists || process.argv.includes("--force")) await writeFile(`${dir}/3d.html`, template.replaceAll("{{NAME}}", name).replaceAll("{{TITLE}}", esc(m.title)).replaceAll("{{BLURB}}", esc(m.blurb)).replaceAll("{{NAV}}", esc(m.nav)).replaceAll("{{FILE}}", m.file).replaceAll("{{POSTER}}", m.file.replace(".js", "")).replaceAll("{{PRELOAD}}", ANATOMY.includes(m.file) ? PRELOAD_ANATOMY : "")
    .replaceAll("{{COURSE}}", (await access(`${dir}/course`).then(() => true, () => false)) ? `        <a href="course/">Course</a>\n` : ""));
  for (const f of (await readdir(dir)).filter((f) => f.endsWith(".html") && f !== "3d.html")) {
    let html = await readFile(`${dir}/${f}`, "utf8");
    if (html.includes('href="3d.html"')) html = html.replace(/<a href="3d.html"([^>]*)>[^<]*<\/a>/, `<a href="3d.html"$1>${esc(m.nav)}</a>`);
    else html = html.replace(/(\n(\s*)<a href="\/">Gradify<\/a>)/, `\n$2<a href="3d.html">${esc(m.nav)}</a>$1`);
    await writeFile(`${dir}/${f}`, html);
  }
  console.log(`${dir}/3d.html`);
}
