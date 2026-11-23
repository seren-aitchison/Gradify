// Gradify's search pages, all generated from scripts/seo/ so they share one shell (canonical URL, link previews,
// breadcrumbs, structured data, the hub header and footer) and stay consistent:
//   tools/                     free calculators (degree classification, final grade, weighted grade, GPA, exam countdown,
//                              spaced repetition schedule) and the countdown widget other sites can embed
//   pdf-to-flashcards/, lecture-notes-to-mind-map/, notes-to-cheat-sheet/     single-purpose landing pages
//   guides/                    the active recall pillar guide, its cluster, a tools comparison and seasonal guides
//   compare/                   Gradify vs Quizlet, vs Anki, Quizlet alternatives
//   glossary/                  learning-science terms (DefinedTerm)
//   templates/                 printable revision templates
//   topics/                    every unit of every live course, from its notes: lessons, key terms, sample flashcards
//   study-plan/                a week-by-week plan for every learning path
//   about.html, ambassadors.html, site-map.html, llms.txt
//   node scripts/build-seo.mjs           rewrite them all
//   node scripts/build-seo.mjs --check   exit 1 if any is out of date (CI and tests/seo.test.mjs)
import { readFile, writeFile, mkdir, rm, readdir } from "node:fs/promises";
import { dirname } from "node:path";
import { page, esc } from "./seo/shell.mjs";
import { toolPages, TOOLS, LANDINGS, landingPages } from "./seo/tools.mjs";
import { guidePages, GUIDES } from "./seo/guides.mjs";
import { comparePages, COMPARE, glossaryPages, TERMS, templatePages, TEMPLATES, aboutPages } from "./seo/pages.mjs";
import { programmaticPages } from "./seo/programmatic.mjs";
import { SITES, slugOf } from "../kit/core/site.js";
import { withPreloads } from "./preload-modules.mjs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
import { SEO_FOLDERS, SEO_FILES, INDEXNOW_KEY } from "./seo/folders.mjs";
export { SEO_FOLDERS, SEO_FILES, INDEXNOW_KEY };

function siteMapPage(pages, courses) {
  const list = (items) => `<ul>${items.map(([h, l]) => `<li><a href="/${h}">${esc(l)}</a></li>`).join("")}</ul>`;
  const live = SITES.filter((s) => ["live", "beta"].includes(s.status) && s.built);
  return page({
    path: "site-map.html", title: "Site Map: Every Gradify Page · Gradify", description: "Every part of Gradify on one page: the app, every subject site, free study tools, guides, comparisons, the glossary, templates, topics and study plans.", crumbs: [["Site map", "site-map.html"]], ogType: "website", share: false, cta: false,
    body: `<h1>Site map</h1>
    <h2>Gradify</h2>${list([["", "Home"], ["app.html", "The Gradify app"], ["explore.html", "Explore"], ["journey.html", "Journey"], ["pricing.html", "Pricing"], ["about.html", "About"], ["quality.html", "Quality and coverage"], ["ambassadors.html", "Campus ambassadors"], ["privacy.html", "Privacy"], ["terms.html", "Terms"]])}
    <h2>Subject sites</h2>${list(live.map((s) => [`${slugOf(s)}/`, s.n]))}
    <h2>Free study tools</h2>${list([...TOOLS.map((t) => [`tools/${t.slug}/`, t.name]), ...LANDINGS.map((l) => [`${l.slug}/`, l.name])])}
    <h2>Study guides</h2>${list(GUIDES.map((g) => [`guides/${g.slug}/`, g.h1]))}
    <h2>Comparisons</h2>${list(COMPARE.map((c) => [`compare/${c.slug}/`, c.name]))}
    <h2>Glossary</h2>${list(TERMS.map(([s, n]) => [`glossary/${s}/`, n]))}
    <h2>Templates</h2>${list(TEMPLATES.map(([s, n]) => [`templates/${s}/`, n]))}
    <h2>Topics by subject</h2>${list(courses.map((p) => [p.path.replace(/index\.html$/, ""), p.title.replace(/ Revision:.*$/, "")]))}
    <h2>Study plans</h2>${list([["study-plan/", "All study plans"]])}`,
  });
}

// llms.txt (llmstxt.org): a plain map of the site for AI assistants
function llmsTxt(courses) {
  const l = (h, n, d) => `- [${n}](https://getgradify.com/${h})${d ? `: ${d}` : ""}`;
  return `# Gradify

> Gradify turns your notes into flashcards and mind maps checked against what you wrote, and schedules revision with spaced repetition (FSRS) up to your exam. Upload a PDF or paste notes in Notes Studio with no account; every card links to the line in your notes it came from, and cards that don't fully match are marked "to check". Free, with free courses in 30+ subjects from GCSE to postgraduate.

Gradify is free to use (no card). Gradify Pro (£10 a month) adds planning and removes limits. Specialist sites live in folders of getgradify.com, one account across all of them.

## Product
${l("app.html", "Gradify app and Notes Studio", "upload notes (PDF, text) and get checked flashcards, mind maps and a revision plan")}
${l("pdf-to-flashcards/", "PDF to flashcards", "turn a lecture PDF into source-checked flashcards")}
${l("lecture-notes-to-mind-map/", "Lecture notes to mind map", "an editable mind map from notes")}
${l("notes-to-cheat-sheet/", "Notes to cheat sheet", "a one-page revision sheet or key-terms sheet")}
${l("pricing.html", "Pricing", "Free, Gradify Pro and Gradify Ultra")}
${l("quality.html", "Quality and coverage", "how lessons are audited and which qualifications are covered")}
${l("about.html", "About Gradify", "who builds it and how content is checked")}

## Specialist sites
${SITES.filter((s) => ["live", "beta"].includes(s.status) && s.built).map((s) => l(`${slugOf(s)}/`, s.n, s.d || s.desc || "")).join("\n")}

## Free tools
${TOOLS.map((t) => l(`tools/${t.slug}/`, t.name, t.line)).join("\n")}

## Guides
${GUIDES.map((g) => l(`guides/${g.slug}/`, g.h1, g.answer.split(". ")[0])).join("\n")}

## Comparisons
${COMPARE.map((c) => l(`compare/${c.slug}/`, c.name, "")).join("\n")}

## Reference
${l("glossary/", "Study glossary", "active recall, spaced repetition, FSRS and more")}
${l("topics/", "Revision topics", `every unit of ${courses.length} free courses with key terms and sample flashcards`)}
${l("study-plan/", "Study plans", "week-by-week plans for GCSE, A level, university and professional paths")}
${l("templates/", "Printable templates", "revision timetable, Cornell notes, trackers")}

## Optional
${l("kit/api/v1/catalogue.json", "Course catalogue API (JSON)", "every course with its syllabus")}
${l("site-map.html", "Site map", "")}
`;
}

// Every indexed page that this script doesn't write (the hub pages and every subject-site page in the sitemap) gets a
// self-referencing canonical URL and link-preview tags (Open Graph and Twitter) from its own title and description, if
// it doesn't have them already, so shared links never split ranking signals or show a blank card in a group chat.
const attr = (s) => String(s).replace(/&(?!(?:amp|lt|gt|quot|#\d+);)/g, "&amp;").replace(/"/g, "&quot;");
export function withHeadTags(html, href) {
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1], desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!title) return html;
  const want = [
    [/rel="canonical"/, `<link rel="canonical" href="${href}">`],
    [/property="og:title"/, `<meta property="og:title" content="${attr(title)}">`],
    [/property="og:description"/, desc ? `<meta property="og:description" content="${desc}">` : ""],
    [/property="og:type"/, '<meta property="og:type" content="website">'],
    [/property="og:url"/, `<meta property="og:url" content="${href}">`],
    [/property="og:site_name"/, '<meta property="og:site_name" content="Gradify">'],
    [/property="og:image"/, '<meta property="og:image" content="https://getgradify.com/assets/og.png">'],
    [/name="twitter:card"/, '<meta name="twitter:card" content="summary_large_image">'],
  ].filter(([re, tag]) => tag && !re.test(html)).map(([, tag]) => tag);
  if (!want.length) return html;
  return html.replace(/(\n?)(\s*)<title>[^<]*<\/title>/, (m, nl, sp) => `${m}\n${sp.replace(/^\n/, "") || "  "}<!-- head-tags: canonical and link previews, added by scripts/build-seo.mjs -->\n${want.map((t) => `${sp.replace(/^\n/, "") || "  "}${t}`).join("\n")}`);
}
async function headTagged() {
  const { sitemapUrls } = await import("./build-sitemap.mjs");
  const out = new Map();
  for (const u of await sitemapUrls()) {
    let p = u.replace("https://getgradify.com/", ""); if (p === "" || p.endsWith("/")) p += "index.html";
    if (SEO_FOLDERS.includes(p.split("/")[0]) || SEO_FILES.includes(p)) continue;
    const html = await readFile(new URL(p, root), "utf8").catch(() => null); if (html === null) continue;
    const next = withHeadTags(html, u); if (next !== html) out.set(p, next);
  }
  return out;
}

export async function outputs() {
  const prog = await programmaticPages();
  const specs = [...toolPages(), ...landingPages(), ...guidePages(), ...comparePages(), ...glossaryPages(), ...templatePages(), ...aboutPages(), ...prog];
  const files = new Map(specs.map((s) => [s.path, s.raw ? s.html : page(s)]));
  const courses = prog.filter((p) => /^topics\/[^/]+\/index\.html$/.test(p.path));
  files.set("site-map.html", siteMapPage(specs, courses));
  files.set("llms.txt", llmsTxt(courses));
  // each page lists the modules it loads, like every other page (scripts/preload-modules.mjs)
  for (const [p, html] of files) if (p.endsWith(".html")) files.set(p, withPreloads(fileURLToPath(new URL(p, root)), html));
  files.set(`${INDEXNOW_KEY}.txt`, `${INDEXNOW_KEY}\n`);
  for (const [p, html] of await headTagged()) files.set(p, html);
  return files;
}

async function existing() {
  const out = [];
  const walk = async (d) => { for (const e of await readdir(new URL(d, root), { withFileTypes: true }).catch(() => [])) e.isDirectory() ? await walk(`${d}${e.name}/`) : out.push(`${d}${e.name}`); };
  for (const f of SEO_FOLDERS) await walk(`${f}/`);
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const files = await outputs(), check = process.argv.includes("--check");
  if (check) {
    const stale = [];
    for (const [p, text] of files) if ((await readFile(new URL(p, root), "utf8").catch(() => null)) !== text) stale.push(p);
    for (const p of await existing()) if (!files.has(p)) stale.push(`${p} (no longer generated)`);
    if (stale.length) { console.error(`${stale.length} search page(s) out of date, e.g. ${stale.slice(0, 5).join(", ")}. Run node scripts/build-seo.mjs`); process.exit(1); }
    console.log(`Search pages up to date: ${files.size} files.`);
  } else {
    for (const f of SEO_FOLDERS) await rm(new URL(`${f}/`, root), { recursive: true, force: true });
    for (const [p, text] of files) { await mkdir(dirname(new URL(p, root).pathname), { recursive: true }); await writeFile(new URL(p, root), text); }
    console.log(`Wrote ${files.size} search pages and files.`);
  }
}
