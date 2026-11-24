// The SEO inventory and audit: every page the site publishes, what kind of page it is, whether search engines may
// index it, whether the sitemap lists it, and whether it has what a search result and a link preview need.
//   node scripts/seo-audit.mjs            write docs/seo/inventory.csv and docs/seo/AUDIT.md, print a summary
//   node scripts/seo-audit.mjs --check    exit 1 if any error (tests/seo-audit.test.mjs runs the same audit)
//   import { audit }                      { pages, errors, warnings, summary }
//
// It reads the repository, not Google: "in the sitemap and passing" means eligible to be indexed, never that it is.
// Search Console (docs/SEO.md) is the only source for what Google has actually indexed.
import { execFileSync } from "node:child_process";
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { classify } from "./build-site.mjs";
import { sitemapUrls, sectionOf } from "./build-sitemap.mjs";
import { keywordMap } from "./seo/keywords.mjs";

const root = new URL("../", import.meta.url), ORIGIN = "https://getgradify.com";
const read = (p) => readFileSync(new URL(p, root), "utf8");
const urlOf = (p) => `${ORIGIN}/${p.replace(/(^|\/)index\.html$/, "$1")}`;

// pages that are app screens or tools for one person's own data: never meant for a search result
// (each site's 3d.html is a public page: the 3D explorers are indexed, docs/SEO.md "Crawlability sprint")
export const PRIVATE = [/(^|\/)app\.html$/, /(^|\/)lifeos\.html$/, /(^|\/)map\.html$/, /^status\.html$/, /^harness\.html$/, /^send\.html$/, /(^|\/)embed\.html$/, /^labs\//, /^kit\//, /^assets\//, /^campaign\//];
// the public app landing is deliberately indexed: it is what "Gradify app" should find
const PUBLIC_APP = new Set(["app.html"]);

export function category(p) {
  const top = p.split("/")[0];
  if (p === "index.html") return "home";
  if (/(^|\/)3d\.html$/.test(p)) return "3d explorer";
  if (/^[a-z]+gradify$/.test(top)) return p === `${top}/index.html` ? "site home" : /\/course\/index\.html$/.test(p) || /^scigradify\/[a-z]+\/index\.html$/.test(p) || /^languagegradify\/[a-z]+\/index\.html$/.test(p) ? "course" : "site page";
  if (!p.includes("/")) return "hub page";
  return { features: "feature", lessons: "lesson", tools: "tool", guides: "guide", topics: "topic", terms: "key term", questions: "practice questions", "exam-traps": "practice questions", "study-plan": "study plan", vs: "guide", compare: "comparison", checklists: "checklist", glossary: "glossary", templates: "template" }[top] || (sectionOf(urlOf(p)) === "tools" ? "tool" : "resource");
}

function robotsDisallowed() {
  const txt = read("robots.txt"), out = [];
  for (const m of txt.matchAll(/^Disallow:\s*(\S+)/gm)) out.push(m[1].replace(/^\//, ""));
  return [...new Set(out)];
}

// the text a search result shows, not its HTML escapes ("Hund&#39;s" is 6 characters, not 10)
const dec = (s) => (s == null ? s : s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"));
/** everything about one page that the audit checks */
function inspect(p, html) {
  const g = (re) => html.match(re)?.[1] ?? null;
  const robots = g(/<meta name="robots" content="([^"]*)"/) || "";
  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => { try { return JSON.parse(m[1]); } catch { return null; } });
  const types = ld.filter(Boolean).flatMap((o) => (o["@graph"] || [o]).map((x) => x["@type"])).flat().filter(Boolean);
  const body = html.split(/<body[^>]*>/)[1] || "";
  return {
    title: dec(g(/<title>([^<]*)<\/title>/)), description: dec(g(/<meta name="description" content="([^"]*)"/)), canonical: g(/<link rel="canonical" href="([^"]*)"/),
    ogTitle: /property="og:title"/.test(html), ogImage: g(/<meta property="og:image" content="([^"]*)"/), noindex: /noindex/.test(robots),
    h1: (body.match(/<h1\b/g) || []).length, jsonld: ld.length, jsonldBad: ld.filter((x) => x === null).length, types: [...new Set(types)],
    imgNoAlt: (body.match(/<img\b(?![^>]*\balt=)[^>]*>/g) || []).length, appShell: /<main[^>]*>\s*<\/main>|id="app"|id="course"/.test(html) && !/<h1\b/.test(body),
    // links in the HTML, not ones a script builds (those contain \${…})
    links: [...body.matchAll(/href="(\/[^"#?]*|\.{1,2}\/[^"#?]*)/g)].map((m) => m[1]).filter((l) => !l.includes("${")),
  };
}

// an internal link resolves to a published file
function resolves(from, href, published) {
  let t = href.startsWith("/") ? href.slice(1) : new URL(href, `${ORIGIN}/${from}`).pathname.slice(1);
  t = decodeURIComponent(t);
  if (t === "" || t.endsWith("/")) t += "index.html";
  return published.has(t) || published.has(`${t}/index.html`) || !/\.[a-z0-9]+$/i.test(t.split("/").pop()) && published.has(`${t}.html`);
}

export async function audit() {
  const files = execFileSync("git", ["ls-files", "-co", "--exclude-standard"], { cwd: new URL(".", root), encoding: "utf8" }).split("\n").filter(Boolean).filter((f) => existsSync(new URL(f, root)));
  const { publish } = classify(files), published = new Set(publish);
  const html = publish.filter((f) => f.endsWith(".html"));
  const inMap = new Set(await sitemapUrls()), disallowed = robotsDisallowed();
  const pages = [], errors = [], warnings = [];
  const err = (p, m) => errors.push(`${p}: ${m}`), warn = (p, m) => warnings.push(`${p}: ${m}`);
  for (const p of html) {
    const h = read(p), x = inspect(p, h), url = urlOf(p);
    const blocked = disallowed.some((d) => p === d || p.startsWith(d)), priv = PRIVATE.some((re) => re.test(p)) && !PUBLIC_APP.has(p);
    const redirect = /<meta http-equiv="refresh"/i.test(h);
    const indexable = !x.noindex && !blocked && !priv && !redirect;
    const row = { path: p, url, category: redirect ? "redirect" : priv ? "private / app" : category(p), indexable, inSitemap: inMap.has(url), ...x, issues: [] };
    const e = (m) => { row.issues.push(m); err(p, m); }, w = (m) => { row.issues.push(m); warn(p, m); };
    if (row.inSitemap && (x.noindex || blocked)) e("in the sitemap but noindex or blocked by robots.txt");
    if (row.inSitemap && priv) e("a private or app page is in the sitemap");
    if (row.inSitemap && redirect) e("a redirect is in the sitemap (list where it goes instead)");
    if (indexable) {
      if (!x.title) e("no <title>"); else if (x.title.length > 65) w(`title is ${x.title.length} characters`);
      if (!x.description) e("no meta description"); else if (x.description.length > 160) w(`description is ${x.description.length} characters`);
      if (!x.canonical) e("no canonical URL"); else if (x.canonical !== url) e(`canonical points elsewhere (${x.canonical})`);
      if (!x.ogTitle || !x.ogImage) e("no link-preview title or image");
      if (x.jsonldBad) e(`${x.jsonldBad} JSON-LD block(s) don't parse`);
      if (x.imgNoAlt) w(`${x.imgNoAlt} image(s) without alt text`);
      if (!row.inSitemap) w("indexable but not in the sitemap");
      if (x.appShell) w("its content is drawn by JavaScript: no h1 in the HTML a crawler reads first");
    }
    if (x.jsonldBad && !indexable) w(`${x.jsonldBad} JSON-LD block(s) don't parse`);
    for (const l of new Set(x.links)) if (!resolves(p, l, published)) w(`broken internal link ${l}`);
    pages.push(row);
  }
  // duplicates among the pages search engines may index
  for (const key of ["title", "description"]) {
    const seen = new Map();
    for (const r of pages.filter((r) => r.indexable && r[key])) { if (seen.has(r[key])) { const m = `same ${key} as ${seen.get(r[key])}`; r.issues.push(m); err(r.path, m); } else seen.set(r[key], r.path); }
  }
  // every sitemap URL is a published page
  for (const u of inMap) { let p = u.replace(`${ORIGIN}/`, ""); if (p === "" || p.endsWith("/")) p += "index.html"; if (!published.has(p)) err(p, "in the sitemap but not published"); }
  const by = (f) => pages.reduce((m, r) => (m[f(r)] = (m[f(r)] || 0) + 1, m), {});
  const summary = {
    published: pages.length, indexable: pages.filter((r) => r.indexable).length, inSitemap: inMap.size,
    passing: pages.filter((r) => r.indexable && !r.issues.some((i) => errors.includes(`${r.path}: ${i}`))).length,
    complete: pages.filter((r) => r.indexable && r.title && r.description && r.canonical && r.ogImage && !r.jsonldBad).length,
    withStructuredData: pages.filter((r) => r.indexable && r.jsonld && !r.jsonldBad).length,
    byCategory: by((r) => r.category), indexableByCategory: pages.filter((r) => r.indexable).reduce((m, r) => (m[r.category] = (m[r.category] || 0) + 1, m), {}),
    errors: errors.length, warnings: warnings.length,
  };
  return { pages, errors, warnings, summary };
}

const csvCell = (v) => { const s = Array.isArray(v) ? v.join("; ") : String(v ?? ""); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
export function csv(pages) {
  const cols = ["path", "url", "category", "indexable", "inSitemap", "title", "description", "canonical", "types", "h1", "issues"];
  return `${cols.join(",")}\n${pages.map((r) => cols.map((c) => csvCell(r[c])).join(",")).join("\n")}\n`;
}
export function report({ summary: s, errors, warnings }, date) {
  const table = (o) => Object.entries(o).sort((a, b) => b[1] - a[1]).map(([k, v]) => `| ${k} | ${v} | ${s.indexableByCategory[k] ?? 0} |`).join("\n");
  const group = (list) => { const m = new Map(); for (const l of list) { const k = l.replace(/^[^:]+: /, "").replace(/\d+/g, "N").replace(/\(.*\)$/, "").replace(/ \/[^ ]*$/, " …"); m.set(k, (m.get(k) || 0) + 1); } return [...m].sort((a, b) => b[1] - a[1]).map(([k, n]) => `- ${n} × ${k}`).join("\n") || "- none"; };
  return `# SEO audit

Generated by \`node scripts/seo-audit.mjs\` on ${date}, from the repository. The full list, one row per page, is \`docs/seo/inventory.csv\`.

This says what is **eligible** to be indexed. It is not evidence that Google has indexed, ranked or shown any page: only Search Console says that.

| | Pages |
|---|---|
| Published HTML pages | ${s.published} |
| Indexable (not noindex, not blocked, not an app screen) | ${s.indexable} |
| In the sitemap | ${s.inSitemap} |
| Indexable with complete metadata (title, description, canonical, link preview, valid JSON-LD) | ${s.complete} |
| Indexable with structured data | ${s.withStructuredData} |
| Indexable and passing every error check | ${s.passing} |
| Errors | ${s.errors} |
| Warnings | ${s.warnings} |

## Pages by category

| Category | Published | Indexable |
|---|---|---|
${table(s.byCategory)}

## Errors (CI fails on any)

${group(errors)}

## Warnings (worth fixing, don't fail CI)

${group(warnings)}
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const r = await audit();
  if (process.argv.includes("--check")) {
    if (r.errors.length) { console.error(`${r.errors.length} SEO error(s):\n${r.errors.slice(0, 40).join("\n")}`); process.exit(1); }
    console.log(`SEO audit: ${r.summary.indexable} indexable pages, 0 errors, ${r.warnings.length} warnings.`);
  } else {
    mkdirSync(new URL("docs/seo/", root), { recursive: true });
    writeFileSync(new URL("docs/seo/inventory.csv", root), csv(r.pages));
    const date = new Date().toISOString().slice(0, 10);
    writeFileSync(new URL("docs/seo/AUDIT.md", root), report(r, date));
    writeFileSync(new URL("docs/seo/KEYWORD-MAP.md", root), keywordMap(date));
    console.log(JSON.stringify(r.summary, null, 1));
  }
}
