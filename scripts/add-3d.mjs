// Give every sub-site that has a model in kit/models/index.js its 3D page (<site>/3d.html, from
// kit/templates/subsite/3d.html) and a link to it in the navigation of its other pages.
//   npm run add-3d
import { readFile, writeFile, readdir, access } from "node:fs/promises";
import { SITES, slugOf } from "../kit/core/site.js";
import { MODELS } from "../kit/models/index.js";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const template = await readFile("kit/templates/subsite/3d.html", "utf8");
for (const [name, m] of Object.entries(MODELS)) {
  const site = SITES.find((s) => s.n === name), dir = slugOf(site);
  if (!(await access(dir).then(() => true, () => false))) { console.log(`${dir}/ doesn't exist yet: run npm run new-site -- ${name} first.`); continue; }
  await writeFile(`${dir}/3d.html`, template.replaceAll("{{NAME}}", name).replaceAll("{{TITLE}}", esc(m.title)).replaceAll("{{BLURB}}", esc(m.blurb)).replaceAll("{{NAV}}", esc(m.nav)).replaceAll("{{FILE}}", m.file));
  for (const f of (await readdir(dir)).filter((f) => f.endsWith(".html") && f !== "3d.html")) {
    let html = await readFile(`${dir}/${f}`, "utf8");
    if (html.includes('href="3d.html"')) html = html.replace(/<a href="3d.html"([^>]*)>[^<]*<\/a>/, `<a href="3d.html"$1>${esc(m.nav)}</a>`);
    else html = html.replace(/(\n(\s*)<a href="\/">Gradify<\/a>)/, `\n$2<a href="3d.html">${esc(m.nav)}</a>$1`);
    await writeFile(`${dir}/${f}`, html);
  }
  console.log(`${dir}/3d.html`);
}
