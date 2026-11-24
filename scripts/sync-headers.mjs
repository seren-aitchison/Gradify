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

/**
 * the page's main content, for the skip link: its first <main> (given id="main" if it has no id), or a course page's
 * #course. Returns [html, id]; the page's own older skip links are removed, so there's one.
 */
export function skipTarget(html) {
  html = html.replace(/\n\s*<a class="skip-link"[^>]*>[^<]*<\/a>/g, "");   // the header adds the one skip link
  const m = html.match(/<main\b[^>]*>/);
  if (m) {
    const id = m[0].match(/\sid="([^"]+)"/)?.[1];
    if (id) return [html, id];
    return [html.replace(m[0], m[0].replace("<main", '<main id="main"')), "main"];
  }
  return [html, /id="course"/.test(html) ? "course" : "main"];
}
const skipLink = (id) => `<a class="skip-link" href="#${id}">Skip to content</a>`;

export function hubHeader(current = "", skip = "main") {
  const link = ([id, href, label]) => `<a href="${href}"${id === current ? ' class="active" aria-current="page"' : ""}>${label}</a>`;
  return `${START}
    ${skipLink(skip)}
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

// the hub footer: the same on every hub page (links, the legal pages, contact), after the page's main content
const FOOT_START = "<!-- hub-footer: written by scripts/sync-headers.mjs; edit it there -->", FOOT_END = "<!-- /hub-footer -->";
export function hubFooter() {
  return `${FOOT_START}
    <footer class="hub-foot glass">
      <div class="hub-foot-cols">
        <div class="hub-foot-brand"><b>Gradify™</b><p>Turn your notes into flashcards checked against what you wrote, and revise them at the right time.</p></div>
        <nav aria-label="Gradify"><b>Gradify</b>${HUB_LINKS.map(([, href, label]) => `<a href="${href}">${label}</a>`).join("")}<a href="/app.html">Open Gradify</a></nav>
        <nav aria-label="Free resources"><b>Free resources</b><a href="/tools/">Study tools</a><a href="/guides/">Study guides</a><a href="/topics/">Revision topics</a><a href="/study-plan/">Study plans</a><a href="/checklists/">Checklists</a><a href="/questions/">Practice questions</a><a href="/exam-traps/">Exam traps</a><a href="/glossary/">Glossary</a><a href="/terms/">Key terms A–Z</a><a href="/vs/">Concept comparisons</a><a href="/research/">Research</a><a href="/templates/">Templates</a><a href="/compare/">Compare apps</a><a href="/changelog/">What's new</a></nav>
        <nav aria-label="Popular tools"><b>Popular tools</b><a href="/tools/degree-classification-calculator/">Degree calculator</a><a href="/tools/final-grade-calculator/">Final grade needed</a><a href="/tools/cram-planner/">Cram planner</a><a href="/tools/study-timer/">Study timer</a><a href="/tools/citation-helper/">Citation helper</a><a href="/pdf-to-flashcards/">PDF to flashcards</a></nav>
        <nav aria-label="About Gradify"><b>About</b><a href="/about.html">About</a><a href="/quality.html">Quality</a><a href="/ambassadors.html">Ambassadors</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a><a href="/site-map.html">Site map</a><a href="mailto:hello@getgradify.com">Contact</a></nav>
      </div>
      <div class="hub-foot-base"><p><b>Also from the Gradify team:</b> Seren Aitchison (portfolio blog), BioFrontier, Eirova™, Erya™ and Vizeon™.</p><p>© <span class="hub-year">2026</span> Gradify™</p></div>
    </footer>
    ${FOOT_END}`;
}
export function withHubFooter(html) {
  const foot = hubFooter();
  if (html.includes(FOOT_START)) return html.replace(new RegExp(`${FOOT_START}[\\s\\S]*?${FOOT_END}`), foot);
  const old = html.match(/<footer class="glass">[\s\S]*?<\/footer>/);
  if (old) return html.replace(old[0], foot);
  // after the main content: in the page's width (pages whose main isn't inside .wrap get one round the footer)
  const wrapped = html.includes("wrap hub-top") ? `<div class="wrap hub-bottom">\n    ${foot}\n  </div>` : foot;
  return html.replace(/(<\/main>)/, `$1\n    ${wrapped}`);
}

/** the page with its hub header written in (replacing an earlier one, an older hand-written bar, or added first) */
export function withHubHeader(html, current) {
  let skip; [html, skip] = skipTarget(html);
  const head = hubHeader(current, skip);
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
export function subHeader({ name, courses, extras }, { up = "", current = "", course = false, kit = "../kit/", skip = "main" } = {}) {
  const a = (href, label, cls = "") => { const here = href === current; return `<a href="${here && course ? "./" : up + href}"${cls ? ` class="${cls}"` : ""}${here ? ' aria-current="page"' : ""}>${esc(label)}</a>`; };
  // the bar holds the courses and Study, so there are few choices to scan; everything else is one tap away in More
  // (the page you're on stays in the bar, so its current marker is always visible)
  const side = [["map.html", "Map"], ["lifeos.html", "LifeOS"], ...extras.map((x) => [x.href, x.label])];
  const main = [...courses.map((c) => a(c.href, c.label)), a("app.html#/study", "Study"), ...side.filter(([h]) => h === current).map(([h, l]) => a(h, l))];
  const more = [...side.filter(([h]) => h !== current).map(([h, l]) => a(h, l)), a("app.html#/notes", "Notes"), a("app.html#/progress", "Progress"), a("app.html#/plan", "Plan"), '<a href="/">All Gradify sites</a>'];
  return `${SUB_START}
    ${skipLink(skip)}
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

// the site footer: which family the site belongs to, and the same links on every page of every site
const SFOOT_START = "<!-- sub-footer: written by scripts/sync-headers.mjs; edit it there -->", SFOOT_END = "<!-- /sub-footer -->";
// each course folder → its free topic pages (getgradify.com/topics/<slug>/), so a subject site passes its visitors
// (and its search authority) to the free topics, study plans and tools
import { readFileSync } from "node:fs";
const CATALOGUE = (() => { try { return JSON.parse(readFileSync(new URL("kit/api/v1/catalogue.json", ROOT), "utf8")).courses; } catch { return []; } })();
export function topicSlug(href, dir) {
  const want = `/${dir}/${String(href).replace(/^\/|\/$/g, "")}/`;
  const c = CATALOGUE.find((x) => ["live", "beta"].includes(x.status) && x.page === want);
  return c && existsSync(new URL(`topics/${c.slug}/index.html`, ROOT)) ? c.slug : null;
}
export function subFooter({ name, courses = [], dir = "" }) {
  const topics = courses.map((c) => [topicSlug(c.href, dir), c.label]).filter(([s]) => s).slice(0, 4);
  return `${SFOOT_START}
    <footer class="sub-foot"><p><span data-site-name>${esc(name)}</span> is part of <a href="/">Gradify</a>. Sign in to keep your progress on every device.</p><nav aria-label="Free study resources">${topics.map(([s, l]) => `<a href="/topics/${s}/">${esc(l === "Course" ? name : l)} topics and flashcards</a>`).join("")}<a href="/study-plan/">Free study plans</a><a href="/tools/">Free study tools</a><a href="/guides/">Study guides</a></nav><nav aria-label="${esc(name)} footer"><a href="/">All Gradify sites</a><a href="/pricing.html">Pricing</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a><a href="mailto:hello@getgradify.com">Contact</a></nav></footer>
    ${SFOOT_END}`;
}
export function withSubFooter(html, items) {
  const foot = subFooter(items);
  if (html.includes(SFOOT_START)) return html.replace(new RegExp(`${SFOOT_START}[\\s\\S]*?${SFOOT_END}`), foot);
  const old = html.match(/<footer class="sub-foot">[\s\S]*?<\/footer>/);
  if (old) return html.replace(old[0], foot);
  // the LifeOS tour has none: after its main content, in the page's width
  return html.replace(/(\n\s*<\/main>)(?![\s\S]*<\/main>)/, `$1\n  <div class="wrap">\n    ${foot}\n  </div>`);
}

/** the page with its site header written in (replacing an earlier one or a hand-written one, or added at the top) */
export function withSubHeader(html, items, opts) {
  let skip; [html, skip] = skipTarget(html);
  const head = subHeader(items, { ...opts, skip });
  if (html.includes(SUB_START)) return html.replace(new RegExp(`${SUB_START}[\\s\\S]*?${SUB_END}`), head);
  const bar = html.match(/<header class="sub-nav glass">[\s\S]*?<\/header>/);
  if (bar) return html.replace(bar[0], head);
  // a page without one (the LifeOS tour): the header goes above the page, in the same width, with its stylesheet
  // (matched by pattern: skipTarget may have given the main an id; the tag itself is kept as it is)
  let out = html.replace(/<main\b[^>]*class="wrap"[^>]*>/, (main) => `<div class="wrap">\n    ${head}\n  </div>\n  ${main}`);
  if (!/styles\/subsite\.css/.test(out)) out = out.replace(/(<link rel="stylesheet" href="([^"]*?)styles\/components\.css">)/, `$1\n  <link rel="stylesheet" href="$2styles/subsite.css">`);
  return out;
}

/** every page of every site that carries the site header: [{ file, items, opts }] */
export async function sitePages(root = ROOT) {
  const out = [];
  for (const dir of (await readdir(root)).filter((d) => /gradify$/.test(d)).sort()) {
    const index = new URL(`${dir}/index.html`, root); if (!existsSync(index)) continue;
    const items = { ...siteItems(await readFile(index, "utf8")), dir }; if (!items.name) continue;
    for (const f of (await readdir(new URL(`${dir}/`, root))).sort()) {
      // pages with the site header, and the LifeOS tour (which had none); not the app, or a stub that only forwards
      const page = f.endsWith(".html") && f !== "app.html" && (f === "lifeos.html" || /class="sub-nav/.test(await readFile(new URL(`${dir}/${f}`, root), "utf8")));
      if (page) out.push({ file: `${dir}/${f}`, items, opts: { up: "", current: f === "index.html" ? "" : f, kit: "../kit/" } });
      const ci = new URL(`${dir}/${f}/index.html`, root);
      if (!f.includes(".") && existsSync(ci) && /<div id="course">/.test(await readFile(ci, "utf8"))) out.push({ file: `${dir}/${f}/index.html`, items, opts: { up: "../", current: `${f}/`, course: true, kit: "../../kit/" } });
    }
  }
  return out;
}

/** an app page (its own app bar, not rewritten): just the skip link, before the bar */
export function withAppSkip(html) {
  let skip; [html, skip] = skipTarget(html);
  return html.replace(/(\n(\s*)<header class="bar glass app-bar">)/, `\n$2${skipLink(skip)}$1`);
}
export async function appPages(root = ROOT) {
  const out = ["app.html"];
  for (const d of (await readdir(root)).filter((d) => /gradify$/.test(d)).sort()) if (existsSync(new URL(`${d}/app.html`, root))) out.push(`${d}/app.html`);
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const check = process.argv.includes("--check"), stale = [];
  for (const [page, current] of Object.entries(HUB_PAGES)) {
    const url = new URL(page, ROOT), html = await readFile(url, "utf8"), next = withHubFooter(withHubHeader(html, current));
    if (next !== html) { stale.push(page); if (!check) await writeFile(url, next); }
  }
  for (const { file, items, opts } of await sitePages()) {
    const url = new URL(file, ROOT), html = await readFile(url, "utf8"), next = withSubFooter(withSubHeader(html, items, opts), items);
    if (next !== html) { stale.push(file); if (!check) await writeFile(url, next); }
  }
  for (const file of await appPages()) {
    const url = new URL(file, ROOT), html = await readFile(url, "utf8"), next = withAppSkip(html);
    if (next !== html) { stale.push(file); if (!check) await writeFile(url, next); }
  }
  if (check && stale.length) { console.error(`Headers out of date: ${stale.slice(0, 8).join(", ")}. Run node scripts/sync-headers.mjs`); process.exit(1); }
  console.log(check ? "Headers up to date." : stale.length ? `Updated ${stale.length} pages` : "Headers up to date.");
}
