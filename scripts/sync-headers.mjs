// One header for every Gradify page outside the app and the subject sites: the same links, in the same order, with the
// current page marked, search, sign-in and "Open Gradify", and a menu on phones. The markup is written into each page
// (no flash before scripts run, and it works without them); kit/core/hubnav.js adds the behaviour.
//   node scripts/sync-headers.mjs           rewrite every hub page's header
//   node scripts/sync-headers.mjs --check   exit 1 if any page differs (tests/navigation.test.mjs runs this)
import { readFile, writeFile } from "node:fs/promises";

const ROOT = new URL("../", import.meta.url);
// page → which link is the current one ("" when none is)
export const HUB_PAGES = {
  "index.html": "", "explore.html": "explore", "journey.html": "journey", "pricing.html": "pricing",
  "privacy.html": "", "terms.html": "", "status.html": "", "quality.html": "", "ai-usage.html": "", "404.html": "",
};
export const HUB_LINKS = [
  ["explore", "/explore.html", "Explore"],
  ["sites", "/#find", "Sites"],
  ["journey", "/journey.html", "Journey"],
  ["pricing", "/pricing.html", "Pricing"],
];
const G = `<svg viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4641ff"/><stop offset=".35" stop-color="#f055dd"/><stop offset=".7" stop-color="#ff5600"/><stop offset="1" stop-color="#ffc002"/></linearGradient></defs><rect x=".75" y=".75" width="30.5" height="30.5" rx="9" fill="#0b0b0b" stroke="rgba(255,255,255,.22)" stroke-width="1.5"/><path d="M22.9 10.9A8.6 8.6 0 1 0 24.6 16H16.4" fill="none" stroke="url(#gg)" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const START = "<!-- hub-header: written by scripts/sync-headers.mjs; edit it there -->", END = "<!-- /hub-header -->";

export function hubHeader(current = "") {
  const link = ([id, href, label]) => `<a href="${href}"${id === current ? ' class="active" aria-current="page"' : ""}>${label}</a>`;
  return `${START}
    <header class="bar glass hub-bar">
      <a class="brand" href="/">${G} Gradify</a>
      <nav class="sections" aria-label="Gradify">${HUB_LINKS.map(link).join("")}</nav>
      <div class="right">
        <a class="link hub-signin" href="/app.html#/account">Sign in</a>
        <a class="btn btn-primary btn-sm lg hub-open" href="/app.html">Open Gradify</a>
        <button class="icon-btn menu-btn" id="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
      </div>
      <nav class="menu" id="menu" aria-label="Menu" hidden>${HUB_LINKS.map(link).join("")}<a class="hub-signin" href="/app.html#/account">Sign in</a><a class="btn btn-primary lg hub-open" href="/app.html">Open Gradify</a></nav>
    </header>
    <script type="module" src="/kit/core/hubnav.js"></script>
    ${END}`;
}

/** the page with its hub header written in (replacing an earlier one, an older hand-written bar, or added first) */
export function withHubHeader(html, current) {
  const head = hubHeader(current);
  if (html.includes(START)) return html.replace(new RegExp(`${START}[\\s\\S]*?${END}`), head);
  const bar = html.match(/<header class="bar glass">[\s\S]*?<\/header>/);
  if (bar) return html.replace(bar[0], head);
  // a page without a top bar (the legal and status pages): the header goes first in the body, in the page's width,
  // and the old "← Gradify" link it replaces goes
  return html.replace(/\n\s*<a href="\/">← Gradify<\/a>/, "").replace(/<body([^>]*)>/, `<body$1>\n  <div class="wrap hub-top">\n    ${head}\n  </div>`);
}

// ---------- Subject sites ----------
// Every page of a site has the same header: its courses, Study, Map, LifeOS and any 3D page, with Notes, Progress, Plan
// and the way back to all Gradify sites under "More". The courses and 3D pages come from the site's homepage, so a new
// course or page appears in every header once it's on the homepage. kit/core/subheader.js adds the behaviour.
import { readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
const SUB_START = "<!-- sub-header: written by scripts/sync-headers.mjs; edit it there -->", SUB_END = "<!-- /sub-header -->";
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

/** a site's header items, read from its homepage's links: courses (folders) and extra pages (3D and the like) */
export function siteItems(indexHtml) {
  const nav = indexHtml.match(/<nav class="sub-links"[\s\S]*?<\/nav>/)?.[0] || "";
  const name = (indexHtml.match(/<meta name="gradify-site" content="([^"]+)"/) || indexHtml.match(/data-site-name>([^<]+)</))?.[1];
  const links = [...nav.matchAll(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].map((m) => ({ href: m[1], label: m[2].trim() }));
  const courses = links.filter((l) => /^[a-z0-9-]+\/$/.test(l.href));
  const extras = links.filter((l) => /^[a-z0-9-]+\.html$/.test(l.href) && !["map.html", "lifeos.html", "app.html"].includes(l.href));
  return { name, courses, extras };
}

/**
 * the header for one page of a site. `up`: the path from the page to the site's folder ("" or "../"); `current`: the
 * href (relative to the site) of the page's own item; `course`: a course page, whose button starts the course;
 * `kit`: the path from the page to kit/
 */
export function subHeader({ name, courses, extras }, { up = "", current = "", course = false, kit = "../kit/" } = {}) {
  const a = (href, label, cls = "") => { const here = href === current; return `<a href="${here && course ? "./" : up + href}"${cls ? ` class="${cls}"` : ""}${here ? ' aria-current="page"' : ""}>${esc(label)}</a>`; };
  const main = [...courses.map((c) => a(c.href, c.label)), a("app.html#/study", "Study"), a("map.html", "Map"), a("lifeos.html", "LifeOS"), ...extras.map((x) => a(x.href, x.label))];
  const more = [a("app.html#/notes", "Notes"), a("app.html#/progress", "Progress"), a("app.html#/plan", "Plan"), '<a href="/">All Gradify sites</a>'];
  return `${SUB_START}
    <header class="sub-nav glass">
      <a class="sub-brand" href="${up || "./"}"><span class="icon"></span><span data-site-name>${esc(name)}</span></a>
      <nav class="sub-links" aria-label="${esc(name)}">
        ${main.join("\n        ")}
        <details class="sub-more"><summary>More</summary><div class="sub-more-list">${more.join("")}</div></details>
      </nav>
      <div class="sub-right">
        <a class="signin" href="${up}app.html#/account">Sign in</a>
        <a class="btn btn-light lg btn-sm sub-cta" href="${course ? "#/learn" : `${up}app.html`}"><span>Start free</span></a>
      </div>
    </header>
    <script type="module" src="${kit}core/subheader.js"></script>
    ${SUB_END}`;
}

/** the page with its site header written in (replacing an earlier one or a hand-written one, or added at the top) */
export function withSubHeader(html, items, opts) {
  const head = subHeader(items, opts);
  if (html.includes(SUB_START)) return html.replace(new RegExp(`${SUB_START}[\\s\\S]*?${SUB_END}`), head);
  const bar = html.match(/<header class="sub-nav glass">[\s\S]*?<\/header>/);
  if (bar) return html.replace(bar[0], head);
  // a page without one (the LifeOS tour): the header goes above the page, in the same width, with its stylesheet
  let out = html.replace(/<main class="wrap">/, `<div class="wrap">\n    ${head}\n  </div>\n  <main class="wrap">`);
  if (!/styles\/subsite\.css/.test(out)) out = out.replace(/(<link rel="stylesheet" href="([^"]*?)styles\/components\.css">)/, `$1\n  <link rel="stylesheet" href="$2styles/subsite.css">`);
  return out;
}

/** every page of every site that carries the site header: [{ file, items, opts }] */
export async function sitePages(root = ROOT) {
  const out = [];
  for (const dir of (await readdir(root)).filter((d) => /gradify$/.test(d)).sort()) {
    const index = new URL(`${dir}/index.html`, root); if (!existsSync(index)) continue;
    const items = siteItems(await readFile(index, "utf8")); if (!items.name) continue;
    for (const f of (await readdir(new URL(`${dir}/`, root))).sort()) {
      if (f.endsWith(".html") && f !== "app.html") out.push({ file: `${dir}/${f}`, items, opts: { up: "", current: f === "index.html" ? "" : f, kit: "../kit/" } });
      const ci = new URL(`${dir}/${f}/index.html`, root);
      if (!f.includes(".") && existsSync(ci) && /<div id="course">/.test(await readFile(ci, "utf8"))) out.push({ file: `${dir}/${f}/index.html`, items, opts: { up: "../", current: `${f}/`, course: true, kit: "../../kit/" } });
    }
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const check = process.argv.includes("--check"), stale = [];
  for (const [page, current] of Object.entries(HUB_PAGES)) {
    const url = new URL(page, ROOT), html = await readFile(url, "utf8"), next = withHubHeader(html, current);
    if (next !== html) { stale.push(page); if (!check) await writeFile(url, next); }
  }
  for (const { file, items, opts } of await sitePages()) {
    const url = new URL(file, ROOT), html = await readFile(url, "utf8"), next = withSubHeader(html, items, opts);
    if (next !== html) { stale.push(file); if (!check) await writeFile(url, next); }
  }
  if (check && stale.length) { console.error(`Headers out of date: ${stale.slice(0, 8).join(", ")}. Run node scripts/sync-headers.mjs`); process.exit(1); }
  console.log(check ? "Headers up to date." : stale.length ? `Updated ${stale.length} pages` : "Headers up to date.");
}
