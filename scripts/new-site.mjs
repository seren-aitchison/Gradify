// Start a Gradify sub-site at getgradify.com/<name>/:
//   npm run new-site -- MedGradify     one site
//   npm run new-site -- --all          every site that has opening copy in kit/core/site-pages.js
// Makes the folder from kit/templates/subsite (homepage, study app, learning map and LifeOS window), fills in
// the homepage's opening section from kit/core/site-pages.js, and marks the site built in
// kit/core/sites.js so the directory on getgradify.com links to it. Never overwrites a folder.
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { SITES, slugOf } from "../kit/core/site.js";
import { SITE_PAGES } from "../kit/core/site-pages.js";

const arg = process.argv[2];
const targets = arg === "--all" ? SITES.filter((s) => SITE_PAGES[s.n]) : SITES.filter((s) => s.n === arg || slugOf(s) === String(arg).toLowerCase());
if (!targets.length) {
  console.error(`Usage: npm run new-site -- <site name>   or   npm run new-site -- --all\nSites: ${SITES.map((s) => s.n).join(", ")}`);
  process.exit(1);
}
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const templates = Object.fromEntries(await Promise.all(["index.html", "app.html", "lifeos.html", "map.html"].map(async (f) => [f, await readFile(`kit/templates/subsite/${f}`, "utf8")])));
let sitesSrc = await readFile("kit/core/sites.js", "utf8");
const made = [];

for (const site of targets) {
  const dir = slugOf(site);
  if (await access(dir).then(() => true, () => false)) { console.log(`${dir}/ already exists, left as it is.`); continue; }
  const page = SITE_PAGES[site.n] || { h: [site.n, "on Gradify."], sub: site.d, go: "Start with your notes", ticks: ["Works with your own notes", "Every card checked", "Free to start"],
    card: { file: "your-notes.pdf", level: "Start", q: "What's the first idea in your notes?", a: "Add your notes and Gradify will ask.", checks: ["Recall", "Explain", "Apply", "Remember"] } };
  const fill = (t) => t
    .replaceAll("{{NAME}}", site.n).replaceAll("{{WHO}}", esc(site.who || "")).replaceAll("{{DESC}}", esc(site.d))
    .replaceAll("{{H1A}}", esc(page.h[0])).replaceAll("{{H1B}}", esc(page.h[1])).replaceAll("{{SUB}}", esc(page.sub)).replaceAll("{{GO}}", esc(page.go))
    .replaceAll("{{TICKS}}", page.ticks.map((x) => `<li>${esc(x)}</li>`).join(""))
    .replaceAll("{{CARD_FILE}}", esc(page.card.file)).replaceAll("{{CARD_LEVEL}}", esc(page.card.level))
    .replaceAll("{{CARD_Q}}", esc(page.card.q)).replaceAll("{{CARD_A}}", esc(page.card.a))
    .replaceAll("{{CHECKS}}", page.card.checks.map((x) => `<li>${esc(x)}</li>`).join(""));
  await mkdir(dir);
  for (const [f, t] of Object.entries(templates)) await writeFile(`${dir}/${f}`, fill(t));
  // mark it built, so the directory links to getgradify.com/<slug>/
  const line = sitesSrc.split("\n").find((l) => l.includes(`n: "${site.n}"`));
  if (line && !/built: true/.test(line)) sitesSrc = sitesSrc.replace(line, line.replace(/ \},?\s*$/, (end) => `, built: true${end}`));
  made.push(dir);
}
await writeFile("kit/core/sites.js", sitesSrc);
if (made.length) console.log(`Made ${made.map((d) => `${d}/`).join(", ")}. Live at getgradify.com/<name>/ once pushed; the directory links there now.`);
