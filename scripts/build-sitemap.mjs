// sitemap.xml for search engines: the homepage, the privacy and terms pages and every page of each live or beta site
// (kit/core/sites.js status). Coming-soon sites stay out until they have content worth finding.
//   node scripts/build-sitemap.mjs     writes sitemap.xml (tests/launch.test.mjs checks it's up to date)
import { readdir, readFile, writeFile } from "node:fs/promises";
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

export async function sitemapXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${(await sitemapUrls()).map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await writeFile(new URL("sitemap.xml", root), await sitemapXml());
  console.log(`sitemap.xml: ${(await sitemapUrls()).length} pages`);
}
