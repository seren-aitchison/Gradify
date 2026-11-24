// sitemap.xml is a sitemap index; each section has its own file in sitemaps/, so Search Console reports indexing per
// section (are the topic pages being indexed? the key terms?).
// sitemap.xml for search engines: the homepage, the privacy and terms pages and every page of each live or beta site
// (kit/core/sites.js status). Coming-soon sites stay out until they have content worth finding.
//   node scripts/build-sitemap.mjs     writes sitemap.xml (tests/launch.test.mjs checks it's up to date)
import { readdir, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { SITES, slugOf } from "../kit/core/site.js";
import { SEO_FOLDERS, SEO_SUBSITE_FILES } from "./seo/folders.mjs";

const root = new URL("../", import.meta.url), ORIGIN = "https://getgradify.com";
// tool pages every site shares; the copies on getgradify.com itself are the ones to index
const SHARED = new Set(["app.html", "lifeos.html", "3d.html", "map.html"]);

async function pagesIn(dir) {
  const out = [];
  for (const e of await readdir(new URL(dir, root), { withFileTypes: true }).catch(() => [])) {
    if (e.isDirectory()) out.push(...(await pagesIn(`${dir}${e.name}/`)));
    else if (e.name.endsWith(".html") && !SHARED.has(e.name)) out.push(`${dir}${e.name}`);
  }
  // pages that ask not to be indexed (thin generated pages, widgets) stay out of the sitemap
  const keep = [];
  for (const p of out) if (!/<meta name="robots" content="noindex/.test(await readFile(new URL(p, root), "utf8"))) keep.push(p);
  return keep;
}

export async function sitemapUrls() {
  const urls = ["", "app.html", "explore.html", "journey.html", "pricing.html", "about.html", "ambassadors.html", "site-map.html", "privacy.html", "terms.html", "quality.html"];
  for (const s of SITES.filter((x) => x.built && ["live", "beta"].includes(x.status))) urls.push(...(await pagesIn(`${slugOf(s)}/`)).sort());
  // the search pages (scripts/build-seo.mjs), apart from the countdown widget other sites embed (noindex)
  for (const f of SEO_FOLDERS) urls.push(...(await pagesIn(`${f}/`)).filter((p) => !p.endsWith("/embed.html")).sort());
  for (const p of SEO_SUBSITE_FILES) if (p.endsWith(".html") && !urls.includes(p)) urls.push(p);
  return urls.map((u) => `${ORIGIN}/${u.replace(/(^|\/)index\.html$/, "$1")}`);
}

// the date a page says it was last changed (its article:modified_time, which the visible "Last updated" date matches);
// pages without one get no lastmod rather than a guessed date
async function lastmod(u) {
  let p = u.replace(`${ORIGIN}/`, ""); if (p === "" || p.endsWith("/")) p += "index.html";
  const html = await readFile(new URL(p, root), "utf8").catch(() => "");
  return html.match(/<meta property="article:modified_time" content="(\d{4}-\d{2}(?:-\d{2})?)/)?.[1] || null;
}
/** which section's sitemap a URL belongs in */
export function sectionOf(u) {
  const f = u.replace(`${ORIGIN}/`, "").split("/")[0];
  if (/^[a-z]+gradify$/.test(f)) return "sites";
  if (["topics", "terms", "tools", "questions", "exam-traps"].includes(f)) return f === "exam-traps" ? "questions" : f;
  if (["pdf-to-flashcards", "lecture-notes-to-mind-map", "notes-to-cheat-sheet", "youtube-to-flashcards", "notes-to-study-chant"].includes(f)) return "tools";
  if (f === "study-plan") return "study-plans";
  if (f === "features") return "features";
  if (["guides", "vs", "checklists", "compare", "glossary", "templates", "research", "exam-boards", "changelog"].includes(f)) return "guides";
  return "pages";
}
export const SECTIONS = ["pages", "sites", "features", "tools", "topics", "terms", "guides", "questions", "study-plans"];
/** { "sitemap.xml": the index, "sitemaps/<section>.xml": … } */
export async function sitemapFiles() {
  const urls = await sitemapUrls(), out = {};
  for (const s of SECTIONS) {
    const mine = urls.filter((u) => sectionOf(u) === s); if (!mine.length) continue;
    out[`sitemaps/${s}.xml`] = await urlset(mine);
  }
  out["sitemap.xml"] = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(out).map((f) => `  <sitemap><loc>${ORIGIN}/${f}</loc></sitemap>`).join("\n")}
</sitemapindex>
`;
  return out;
}
export const sitemapXml = async () => (await sitemapFiles())["sitemap.xml"];
async function urlset(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${(await Promise.all(urls.map(async (u) => { const d = await lastmod(u); return `  <url><loc>${u}</loc>${d ? `<lastmod>${d}</lastmod>` : ""}</url>`; }))).join("\n")}
</urlset>
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const files = await sitemapFiles();
  await rm(new URL("sitemaps/", root), { recursive: true, force: true }); await mkdir(new URL("sitemaps/", root), { recursive: true });
  for (const [f, xml] of Object.entries(files)) await writeFile(new URL(f, root), xml);
  console.log(`sitemap.xml: an index of ${Object.keys(files).length - 1} section sitemaps, ${(await sitemapUrls()).length} pages`);
}
