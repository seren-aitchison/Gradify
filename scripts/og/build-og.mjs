// Link-preview and search images (1200×630, Open Graph and Twitter cards), rendered in Chromium from the site's own
// fonts, styles, icons and diagrams, so every feature, subject and pilot lesson has a recognisable, relevant image:
//   assets/og/features/<slug>.jpg    the feature's 3D glass icon in its category colours
//   assets/og/subjects/<course>.jpg  a real diagram from the subject (or its site's icon when it has none)
//   assets/og/lessons/<course>-<id>.jpg   the lesson's own diagram (pilot lessons that have one)
// JPEG at quality 88 with full colour resolution: smooth glows, sharp diagram labels, about 60–90 KB each.
//   assets/og/manifest.json          { "<image path>": "<alt text>" }, read by scripts/seo/shell.mjs
// Same family as the existing section and site images (assets/og/, assets/og/sites/): dark card, the site font (Inter), the spectrum
// rule, getgradify.com in the corner.
//   node scripts/og/build-og.mjs            render any image that's missing or out of date (tests/og.test.mjs)
//   node scripts/og/build-og.mjs --all      render every image again
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { CATS, FEATURES, featureSlug } from "../../kit/data/features.js";
import { FEATURE_PAGES } from "../seo/features.mjs";
import { SITES, slugOf } from "../../kit/core/site.js";
import { ICONS } from "../../kit/core/icons.js";
import { glassSymbol } from "../../kit/core/glass-icons.js";
import { PILOT } from "../seo/lessons.mjs";
import { parseNotes } from "../../kit/course/notes.js";

const root = new URL("../../", import.meta.url), R = fileURLToPath(root);
const json = (p) => JSON.parse(readFileSync(new URL(p, root), "utf8"));
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const DIAGRAMS = json("kit/diagrams/manifest.json");
const first = (s) => (String(s).match(/^.{20,170}?[.!?](\s|$)/)?.[0] || String(s).slice(0, 150)).trim();
// one recognisable diagram per subject that has them
const SUBJECT_DIAGRAM = { biology: "bio-animal-cell", chemistry: "chem-table-blocks", physics: "phys-u15-field-lines-2q-q", maths: "maths-u03-line-circle", business: "bus-supply-demand" };

/** the cards to render: { file, kind, kicker, title, line, url, visual: { icon } | { diagram }, colours, alt } */
export async function cards() {
  const out = [];
  for (const f of FEATURES) {
    const slug = featureSlug(f), p = FEATURE_PAGES[slug]; if (!p) continue;
    const c = CATS[f.cat];
    out.push({ file: `assets/og/features/${slug}.jpg`, kicker: `Gradify · ${c.name}`, title: f.n, line: first(p.answer), url: `getgradify.com/features/${slug}/`, visual: { icon: f.i, seed: f.n }, colours: [`#${c.c}`, `#${c.c2}`], alt: `${f.n} on Gradify: ${first(p.answer)}` });
  }
  const cat = json("kit/api/v1/catalogue.json");
  for (const c of cat.courses.filter((x) => ["live", "beta"].includes(x.status) && x.page)) {
    const api = json(`kit/api/v1/courses/${c.slug}.json`), site = SITES.find((s) => c.page.startsWith(`/${slugOf(s)}/`));
    const lessons = api.units.reduce((n, u) => n + (u.written ? u.lessons.length : 0), 0);
    // a representative diagram: the named one, or the first in the course's diagram set
    const prefix = { biology: "bio-", chemistry: "chem-", physics: "phys-", maths: "maths-", business: "bus-" }[c.slug];
    const dg = SUBJECT_DIAGRAM[c.slug] || (prefix && Object.keys(DIAGRAMS).filter((k) => k.startsWith(prefix) && existsSync(new URL(`kit/diagrams/svg/${k}.wide.svg`, root)) && DIAGRAMS[k].status !== "failed").sort()[0]);
    const acc = site ? `#${site.c}` : "#4641ff";   // the site's own colour, as on its site image
    out.push({ file: `assets/og/subjects/${c.slug}.jpg`, kicker: `Gradify · ${site?.n.split(" · ")[0] || "Gradify"}`, title: `${api.name} revision`, line: `${lessons.toLocaleString("en-GB")} free lessons with notes, diagrams, flashcards and practice questions.`, url: `getgradify.com/topics/${c.slug}/`, visual: dg ? { diagram: dg } : { icon: site?.i || "cap", seed: c.slug }, colours: [acc, "#f055dd"], alt: dg ? `${api.name} on Gradify, with a diagram: ${DIAGRAMS[dg].title}` : `${api.name} revision on Gradify` });
  }
  for (const [slug, units] of Object.entries(PILOT)) {
    const api = json(`kit/api/v1/courses/${slug}.json`), site = SITES.find((s) => cat.courses.find((x) => x.slug === slug)?.page?.startsWith(`/${slugOf(s)}/`));
    for (const uid of units) {
      const parsed = parseNotes((await import(new URL(`kit/courses/${slug}/notes/${uid}.js`, root))).default), unit = api.units.find((u) => u.id === uid);
      unit.lessons.forEach((meta, i) => {
        const L = parsed.find((p) => p.title === meta.title) || parsed[i]; if (!L) return;
        const dg = L.blocks.find((b) => b.t === "dg" && DIAGRAMS[b.id] && DIAGRAMS[b.id].status !== "failed" && existsSync(new URL(`kit/diagrams/svg/${b.id}.wide.svg`, root)))?.id;
        if (!dg) return;
        out.push({ file: `assets/og/lessons/${slug}-${meta.id}.jpg`, kicker: `${api.name} · ${unit.title}`, title: meta.title, line: first(L.lead), url: `getgradify.com/lessons/${slug}/${meta.id}/`, visual: { diagram: dg }, colours: [site ? `#${site.c}` : "#4641ff", "#f055dd"], alt: `${meta.title}: ${DIAGRAMS[dg].title}` });
      });
    }
  }
  return out;
}

export function cardHtml(c) {
  const [a, b] = c.colours;
  const visual = c.visual.diagram
    ? `<div class="dg"><img src="/kit/diagrams/svg/${c.visual.diagram}.wide.svg" alt=""></div>`
    : `<div class="ic">${glassSymbol(ICONS[c.visual.icon] || ICONS.sparkles, { size: 300, seed: c.visual.seed, colours: [a, b] })}</div>`;
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="/kit/styles/base.css"><link rel="stylesheet" href="/kit/styles/components.css">
<style>
@font-face { font-family: Inter; src: url(/assets/fonts/Inter-Variable.woff2) format("woff2"); font-weight: 100 900; }
html, body { margin: 0; width: 1200px; height: 630px; background: #0b0b0c; overflow: hidden; }
.card { position: relative; width: 1200px; height: 630px; font-family: Inter, system-ui, sans-serif; color: #fff; }
.glow { position: absolute; right: -170px; top: -150px; width: 820px; height: 820px; border-radius: 50%; background: radial-gradient(circle, ${a}cc 0%, ${b}55 38%, transparent 68%); filter: blur(10px); }
.text { position: absolute; left: 80px; top: 72px; width: ${c.visual.diagram ? 470 : 640}px; }
.kick { font-size: 26px; text-transform: none; font-weight: 600; color: #d6d6dc; letter-spacing: .2px; }
h1 { margin: 64px 0 0; font-size: ${c.visual.diagram ? (c.title.length > 18 ? 56 : 72) : c.title.length > 26 ? 64 : 84}px; line-height: 1.02; font-weight: 750; letter-spacing: -2px; }
p { margin: 26px 0 0; font-size: 29px; line-height: 1.3; color: #cfcfd6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.rule { position: absolute; left: 80px; bottom: 64px; width: 240px; height: 6px; border-radius: 3px; background: linear-gradient(90deg, #4641ff, #f055dd, #ff5600, #ffc002); }
.url { position: absolute; right: 80px; bottom: 54px; font-size: 25px; color: #d6d6dc; }
.ic { position: absolute; right: 120px; top: 150px; }
.dg { position: absolute; right: 56px; top: 96px; width: 560px; height: 400px; background: #fff; border-radius: 28px; box-shadow: 0 30px 80px rgba(0,0,0,.45); display: grid; place-items: center; padding: 22px; box-sizing: border-box; }
.dg img { max-width: 100%; max-height: 100%; }
</style></head><body class="dark"><div class="card"><div class="glow"></div>
<div class="text"><div class="kick">${esc(c.kicker)}</div><h1>${esc(c.title)}</h1><p>${esc(c.line)}</p></div>
${visual}<div class="rule"></div><div class="url">${esc(c.url)} · free</div></div></body></html>`;
}
// a card's fingerprint: re-render only when what's on it changes
export const fp = (c) => createHash("sha256").update(cardHtml(c) + (c.visual.diagram ? readFileSync(new URL(`kit/diagrams/svg/${c.visual.diagram}.wide.svg`, root)) : "")).digest("hex").slice(0, 16);

async function render(list) {
  const { chromium } = createRequire(import.meta.url)("playwright");
  const TYPES = { ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".png": "image/png", ".js": "text/javascript" };
  const b = await chromium.launch(), ctx = await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await ctx.route("**/*", (r) => { const u = new URL(r.request().url()); if (u.hostname !== "og.test") return r.abort(); const f = `${R}${decodeURIComponent(u.pathname).slice(1)}`; return existsSync(f) ? r.fulfill({ body: readFileSync(f), contentType: TYPES[f.slice(f.lastIndexOf("."))] || "text/html" }) : r.fulfill({ status: 404, body: "" }); });
  const page = await ctx.newPage();
  for (const c of list) {
    await ctx.route("http://og.test/card.html", (r) => r.fulfill({ body: cardHtml(c), contentType: "text/html" }));
    await page.goto("http://og.test/card.html", { waitUntil: "networkidle" }); await page.evaluate(() => document.fonts.ready);
    mkdirSync(new URL(c.file.slice(0, c.file.lastIndexOf("/") + 1), root), { recursive: true });
    const tmp = `${R}${c.file}.raw.png`; await page.screenshot({ path: tmp });
    execFileSync("python3", ["-I", "-c", "import sys,os;from PIL import Image;im=Image.open(sys.argv[1]).convert('RGB');im.save(sys.argv[2],'JPEG',quality=88,optimize=True,progressive=True,subsampling=0);os.remove(sys.argv[1])", tmp, `${R}${c.file}`]);
    await ctx.unroute("http://og.test/card.html");
  }
  await b.close();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const list = await cards(), all = process.argv.includes("--all");
  const manifestPath = new URL("assets/og/manifest.json", root), old = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : { alt: {}, fp: {} };
  const oi = process.argv.indexOf("--only"), only = oi > 0 ? process.argv[oi + 1] : null;   // --only <part of a path>: try a design
  const todo = list.filter((c) => (only ? c.file.includes(only) : all || !existsSync(new URL(c.file, root)) || old.fp?.[c.file] !== fp(c)));
  if (todo.length) await render(todo);
  if (only) { console.log(`${todo.length} rendered (trial; manifest unchanged).`); process.exit(0); }
  writeFileSync(manifestPath, `${JSON.stringify({ alt: Object.fromEntries(list.map((c) => [c.file, c.alt])), fp: Object.fromEntries(list.map((c) => [c.file, fp(c)])) }, null, 1)}\n`);
  console.log(`${list.length} images (${todo.length} rendered).`);
}
