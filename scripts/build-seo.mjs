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
import { existsSync } from "node:fs";
import { dirname } from "node:path";
import { page, esc } from "./seo/shell.mjs";
import { toolPages, TOOLS, LANDINGS, landingPages } from "./seo/tools.mjs";
import { guidePages, GUIDES } from "./seo/guides.mjs";
import { comparePages, COMPARE, glossaryPages, TERMS, templatePages, TEMPLATES, aboutPages } from "./seo/pages.mjs";
import { programmaticPages, courses as courseData } from "./seo/programmatic.mjs";
import { coursePageOutputs, coursePagePaths } from "./seo/coursepages.mjs";
import { lessonPages } from "./seo/lessons.mjs";
import { TOOLS2, tools2Pages } from "./seo/tools2.mjs";
import { CHECKLISTS, checklistPages } from "./seo/checklists.mjs";
import { GUIDES2, GROUPS, VS, ALTS, guides2Pages } from "./seo/guides2.mjs";
import { hubPages, feedXml, CHANGES } from "./seo/hubs.mjs";
import { registry, applySeo } from "./seo/registry.mjs";
import { featurePages, FEATURE_PAGES } from "./seo/features.mjs";
import { FEATURES, featureSlug } from "../kit/data/features.js";
import { SITES, slugOf } from "../kit/core/site.js";
import { withPreloads } from "./preload-modules.mjs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
import { SEO_FOLDERS, SEO_FILES, SEO_SUBSITE_FILES, INDEXNOW_KEY } from "./seo/folders.mjs";
export { SEO_FOLDERS, SEO_FILES, SEO_SUBSITE_FILES, INDEXNOW_KEY };

function siteMapPage(pages, courses) {
  const list = (items) => `<ul>${items.map(([h, l]) => `<li><a href="/${h}">${esc(l)}</a></li>`).join("")}</ul>`;
  const live = SITES.filter((s) => ["live", "beta"].includes(s.status) && s.built);
  return page({
    path: "site-map.html", title: "Site Map: Every Gradify Page · Gradify", description: "Every part of Gradify on one page: the app, every subject site, free study tools, guides, comparisons, the glossary, templates, topics and study plans.", crumbs: [["Site map", "site-map.html"]], ogType: "website", share: false, cta: false,
    body: `<h1>Site map</h1>
    <h2>Gradify</h2>${list([["", "Home"], ["app.html", "The Gradify app"], ["explore.html", "Explore"], ["journey.html", "Journey"], ["pricing.html", "Pricing"], ["about.html", "About"], ["quality.html", "Quality and coverage"], ["ambassadors.html", "Campus ambassadors"], ["privacy.html", "Privacy"], ["terms.html", "Terms"]])}
    <h2>Features</h2>${list([["features/", "Every Gradify feature"], ...FEATURES.filter((f) => FEATURE_PAGES[featureSlug(f)] && f.plan !== "pro").map((f) => [`features/${featureSlug(f)}/`, f.n])])}
    <h2>Subject sites</h2>${list(live.map((s) => [`${slugOf(s)}/`, s.n]))}
    <h2>Free study tools</h2>${list([...TOOLS.map((t) => [`tools/${t.slug}/`, t.name]), ...TOOLS2.map((t) => [`tools/${t.slug}/`, t.name]), ["tools/bookmarklet/", "Send to Gradify bookmarklet"], ["investorgradify/tools/", "Compound interest and fund fee calculator"], ...LANDINGS.map((l) => [`${l.slug}/`, l.name])])}
    <h2>Checklists</h2>${list(CHECKLISTS.map(([s, n]) => [`checklists/${s}/`, n]))}
    <h2>Study guides</h2>${list([...GUIDES.map((g) => [`guides/${g.slug}/`, g.h1]), ...GUIDES2.map((g) => [`guides/${g.slug}/`, g.h1])])}
    <h2>Concept comparisons</h2>${list(VS.map(([s, a, b]) => [`vs/${s}/`, `${a} vs ${b}`]))}
    <h2>Comparisons</h2>${list([...COMPARE.map((c) => [`compare/${c.slug}/`, c.name]), ...ALTS.map((c) => [`compare/${c.slug}/`, c.name])])}
    <h2>Practice and exams</h2>${list([["questions/", "Practice questions"], ["exam-traps/", "Exam traps"], ["exam-boards/", "Exam boards and qualifications"], ["terms/", "Key terms A to Z"], ["research/", "Research: common mistakes across subjects"], ["creategradify/briefs/", "Design briefs"], ["changelog/", "What's new"]])}
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

> Gradify turns your notes into flashcards and mind maps checked against what you wrote, and schedules revision with spaced repetition (FSRS) up to your exam. Its headline feature is Notes Studio: upload a PDF or paste notes with no account (zero sign-up); every card links to the line in your notes it came from, and cards that don't fully match are marked "to check". Free, with free courses in 30+ subjects from GCSE to postgraduate.

Gradify is free to use (no card). Gradify Pro (£10 a month) adds planning and removes limits. Specialist sites live in folders of getgradify.com, one account across all of them.

## Product
${l("app.html", "Gradify app and Notes Studio", "upload notes (PDF, text) and get checked flashcards, mind maps and a revision plan")}
${l("pdf-to-flashcards/", "PDF to flashcards", "turn a lecture PDF into source-checked flashcards")}
${l("lecture-notes-to-mind-map/", "Lecture notes to mind map", "an editable mind map from notes")}
${l("notes-to-cheat-sheet/", "Notes to cheat sheet", "a one-page revision sheet or key-terms sheet")}
${l("pricing.html", "Pricing", "Free, Gradify Pro and Gradify Ultra")}
${l("quality.html", "Quality and coverage", "how lessons are audited and which qualifications are covered")}
${l("about.html", "About Gradify", "who builds it and how content is checked")}

## Features
${l("features/", "Every Gradify feature", "what each one does, how to use it and what's free")}
${FEATURES.filter((f) => FEATURE_PAGES[featureSlug(f)] && f.plan !== "pro").map((f) => l(`features/${featureSlug(f)}/`, f.n, FEATURE_PAGES[featureSlug(f)].answer.split(/(?<=\.) /)[0].replace(/\.$/, ""))).join("\n")}

## Specialist sites
${SITES.filter((s) => ["live", "beta"].includes(s.status) && s.built).map((s) => l(`${slugOf(s)}/`, s.n, s.d || s.desc || "")).join("\n")}

## Free tools
${[...TOOLS, ...TOOLS2].map((t) => l(`tools/${t.slug}/`, t.name, t.line)).join("\n")}

## Checklists
${CHECKLISTS.map(([s, n, line]) => l(`checklists/${s}/`, n, line)).join("\n")}

## Guides
${[...GUIDES, ...GUIDES2].map((g) => l(`guides/${g.slug}/`, g.h1, g.answer.split(". ")[0])).join("\n")}

## Concept comparisons
${VS.map(([s, a, b]) => l(`vs/${s}/`, `${a} vs ${b}`, "")).join("\n")}

## Comparisons
${[...COMPARE, ...ALTS].map((c) => l(`compare/${c.slug}/`, c.name, "")).join("\n")}

## Reference
${l("glossary/", "Study glossary", "active recall, spaced repetition, FSRS and more")}
${l("topics/", "Revision topics", `every unit of ${courses.length} free courses with key terms, sample flashcards, a quick quiz and a mind map`)}
${l("questions/", "Practice questions", "multiple-choice questions with answers and explanations, by subject")}
${l("exam-traps/", "Exam traps", "the common mistakes in each subject")}
${l("exam-boards/", "Exam boards and qualifications", "which qualifications the courses serve, and how strong each claim is")}
${l("terms/", "Key terms A to Z", "plain-English definitions, and how meanings change between subjects")}
${l("research/", "Research: where students slip up", "counts of common-mistake warnings per subject, CC BY 4.0")}
${l("changelog/", "What's new", "")}
${l("study-plan/", "Study plans", "week-by-week plans for GCSE, A level, university and professional paths")}
${l("templates/", "Printable templates", "revision timetable, Cornell notes, trackers")}

## Optional
${l("llms-full.txt", "Full text of the guides, comparisons and key terms", "one plain-text file")}
${l("kit/api/v1/catalogue.json", "Course catalogue API (JSON)", "every course with its syllabus")}
${l("site-map.html", "Site map", "")}
`;
}

// Every indexed page that this script doesn't write (the hub pages and every subject-site page in the sitemap) gets a
// self-referencing canonical URL and link-preview tags (Open Graph and Twitter) from its own title and description, if
// it doesn't have them already, so shared links never split ranking signals or show a blank card in a group chat.
const attr = (s) => String(s).replace(/&(?!(?:amp|lt|gt|quot|#\d+);)/g, "&amp;").replace(/"/g, "&quot;");
// a subject site's pages share that site's own link-preview image (assets/og/sites/<folder>.png)
const siteImage = (href) => { const f = href.replace("https://getgradify.com/", "").split("/")[0]; return /gradify$/.test(f) && existsSync(new URL(`assets/og/sites/${f}.png`, root)) ? `https://getgradify.com/assets/og/sites/${f}.png` : null; };
export function withHeadTags(html, href) {
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1], desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!title) return html;
  const img = siteImage(href);
  if (img) html = html.replace('<meta property="og:image" content="https://getgradify.com/assets/og.png">', `<meta property="og:image" content="${img}">`);
  const want = [
    [/rel="canonical"/, `<link rel="canonical" href="${href}">`],
    [/property="og:title"/, `<meta property="og:title" content="${attr(title)}">`],
    [/property="og:description"/, desc ? `<meta property="og:description" content="${desc}">` : ""],
    [/property="og:type"/, '<meta property="og:type" content="website">'],
    [/property="og:url"/, `<meta property="og:url" content="${href}">`],
    [/property="og:site_name"/, '<meta property="og:site_name" content="Gradify">'],
    [/property="og:image"/, `<meta property="og:image" content="${img || "https://getgradify.com/assets/og.png"}">`],
    [/name="robots"/, '<meta name="robots" content="max-image-preview:large">'],
    [/hreflang="en-GB"/, `<link rel="alternate" hreflang="en-GB" href="${href}">`],
    [/hreflang="x-default"/, `<link rel="alternate" hreflang="x-default" href="${href}">`],
    [/name="twitter:card"/, '<meta name="twitter:card" content="summary_large_image">'],
  ].filter(([re, tag]) => tag && !re.test(html)).map(([, tag]) => tag);
  if (!want.length) return html;
  return html.replace(/(\n?)(\s*)<title>[^<]*<\/title>/, (m, nl, sp) => `${m}\n${sp.replace(/^\n/, "") || "  "}<!-- head-tags: canonical and link previews, added by scripts/build-seo.mjs -->\n${want.map((t) => `${sp.replace(/^\n/, "") || "  "}${t}`).join("\n")}`);
}
const COURSE_PAGES = new Set(coursePagePaths());
async function headTagged() {
  const { sitemapUrls } = await import("./build-sitemap.mjs");
  const out = new Map();
  for (const u of await sitemapUrls()) {
    let p = u.replace("https://getgradify.com/", ""); if (p === "" || p.endsWith("/")) p += "index.html";
    if (SEO_FOLDERS.includes(p.split("/")[0]) || SEO_FILES.includes(p) || SEO_SUBSITE_FILES.includes(p) || COURSE_PAGES.has(p)) continue;
    const html = await readFile(new URL(p, root), "utf8").catch(() => null); if (html === null) continue;
    const next = withHeadTags(html, u); if (next !== html) out.set(p, next);
  }
  return out;
}

// The first mention of a study-glossary term or concept comparison in a page's prose links to it, so guides, topics,
// checklists and comparisons form one web of links (at most five per page; never inside links, headings, buttons,
// summaries, scripts or the page's own term).
const AUTO = [
  ...TERMS.map(([slug, name]) => [`glossary/${slug}/`, [name.replace(/ \(.*\)$/, ""), ...(slug === "fsrs" ? ["FSRS"] : []), ...(slug === "pomodoro-technique" ? ["Pomodoro"] : []), ...(slug === "retrieval-practice" ? ["testing effect"] : [])]]),
  ["vs/correlation-vs-causation/", ["correlation", "causation"]], ["vs/accuracy-vs-precision/", ["precision"]], ["vs/validity-vs-reliability/", ["reliability", "validity"]],
  ["vs/molarity-vs-molality/", ["molality"]], ["vs/mitosis-vs-meiosis/", ["meiosis"]], ["guides/blurting-method/", ["blurting"]], ["guides/command-words/", ["command word", "command words"]],
];
export function autoLink(html, here, max = 5) {
  const m = html.match(/<main[\s\S]*<\/main>/); if (!m) return html;
  const used = new Set(), skip = /^<(a|h[1-6]|button|summary|script|style|textarea|title|code|kbd|label|select|option|svg|dt|nav)\b/i, close = /^<\/(a|h[1-6]|button|summary|script|style|textarea|title|code|kbd|label|select|option|svg|dt|nav)>/i;
  let depth = 0, n = 0;
  const parts = m[0].split(/(<[^>]+>)/).map((part) => {
    if (part.startsWith("<")) { if (skip.test(part) && !part.endsWith("/>")) depth++; else if (close.test(part)) depth = Math.max(0, depth - 1); return part; }
    if (depth || n >= max || !part.trim()) return part;
    for (const [href, words] of AUTO) {
      if (n >= max || used.has(href) || `/${href}` === here) continue;
      for (const w of words) {
        const re = new RegExp(`(^|[^\\w-])(${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(?![\\w-])`, "i"), hit = part.match(re);
        if (hit) { const i = hit.index + hit[1].length; part = `${part.slice(0, i)}<a href="/${href}">${hit[2]}</a>${part.slice(i + hit[2].length)}`; used.add(href); n++; break; }
      }
    }
    return part;
  });
  return html.replace(m[0], parts.join(""));
}

// every h2 in a page's main content gets an id, so any section can be linked to directly (#how-to-read)
export function headingIds(html) {
  const m = html.match(/<main[\s\S]*<\/main>/); if (!m) return html;
  const seen = new Set([...m[0].matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]));
  const out = m[0].replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/g, (all, attrs = "", inner) => {
    if (/\sid="/.test(attrs)) return all;
    let id = inner.replace(/<[^>]+>/g, "").toLowerCase().replace(/&[a-z#0-9]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "section";
    for (let n = 2; seen.has(id); n++) id = `${id.replace(/-\d+$/, "")}-${n}`;
    seen.add(id); return `<h2${attrs} id="${id}">${inner}</h2>`;
  });
  return html.replace(m[0], out);
}
// llms-full.txt: the full text of the guides, concept comparisons and key terms, for AI assistants that read one file
const text = (h) => h.replace(/<(script|style|nav|aside|form|button|svg|details class="mm-outline")[\s\S]*?<\/\1>/g, "").replace(/<h1[^>]*>([\s\S]*?)<\/h1>/g, "\n# $1\n").replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, "\n## $1\n").replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, "\n### $1\n").replace(/<\/summary>/g, "\n").replace(/<li[^>]*>/g, "\n- ").replace(/<\/(p|tr|ul|ol|table|dl|div|section)>/g, "\n").replace(/<t[dh][^>]*>/g, " | ").replace(/<[^>]+>/g, "")
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/[ \t]+/g, " ").replace(/\n\s*\n\s*\n+/g, "\n\n").trim();
export function llmsFull(files) {
  const pick = (re) => [...files].filter(([p, h]) => re.test(p) && !/name="robots" content="noindex/.test(h)).sort(([a], [b]) => a.localeCompare(b));
  const main = (h) => text(h.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1].replace(/<nav class="crumbs"[\s\S]*?<\/nav>/, "").replace(/<p class="updated">[\s\S]*?<\/p>/, "").replace(/<section class="related"[\s\S]*?<\/section>/g, "").replace(/<aside class="g-action cta-box"[\s\S]*?<\/aside>/, "").replace(/<form class="optin"[\s\S]*?<\/form>/, "").replace(/<p class="share-row">[\s\S]*?<\/p>/, "") || "");
  const block = (p, h) => `${main(h)}\n\nSource: https://getgradify.com/${p.replace(/index\.html$/, "")}`;
  return `# Gradify: full text of the study guides, concept comparisons and key terms

> The complete text of Gradify's free study guides, "X vs Y" concept comparisons and key-term definitions, for AI assistants. Each section ends with its source URL; please cite that page. The site map for everything else is https://getgradify.com/llms.txt

${pick(/^guides\/[^/]+\/index\.html$/).map(([p, h]) => block(p, h)).join("\n\n---\n\n")}

---

${pick(/^vs\/[^/]+\/index\.html$/).map(([p, h]) => block(p, h)).join("\n\n---\n\n")}

---

# Key terms
${pick(/^terms\/[^/]+\/index\.html$/).map(([p, h]) => `- ${text(h.match(/<p class="answer">([\s\S]*?)<\/p>/)?.[1] || "")} (https://getgradify.com/${p.replace(/index\.html$/, "")})`).join("\n")}
`;
}

export async function outputs() {
  const prog = await programmaticPages();
  const lessons = await lessonPages();
  const specs = [...lessons, ...featurePages(), ...hubPages(), ...toolPages(), ...tools2Pages(), ...landingPages(), ...checklistPages(), ...guidePages(), ...guides2Pages(), ...comparePages(), ...glossaryPages(), ...templatePages(), ...aboutPages(), ...prog];
  const files = new Map(specs.map((s) => [s.path, s.raw ? s.html : page(s)]));
  const courses = prog.filter((p) => /^topics\/[^/]+\/index\.html$/.test(p.path));
  files.set("site-map.html", siteMapPage(specs, courses));
  files.set("llms.txt", llmsTxt(courses));
  // the RSS feed: changelog entries, then every guide, tool and checklist (newest first)
  const feed = [...CHANGES.map(([d, h, items]) => ({ path: "changelog/", date: d, title: `What's new: ${h}`, description: items.join(". ") })),
    ...specs.filter((x) => !x.raw && /^(guides|tools|checklists|vs|compare)\/[^/]+\/index\.html$/.test(x.path)).map((x) => ({ path: x.path.replace(/index\.html$/, ""), date: x.updated || "2026-11-23", title: x.title.replace(/ · Gradify$/, ""), description: x.description }))];
  files.set("feed.xml", feedXml(feed.slice(0, 60)));
  // pilot lessons: topic, question and trap pages link to the lesson's own page instead of into the app
  const LESSON_IDS = new Set(lessons.map((x) => x.path.replace(/^lessons\/|\/index\.html$/g, "")));
  for (const [p, html] of files) {
    if (!/^(topics|questions|exam-traps)\/[^/]+\//.test(p)) continue;
    const slug = p.split("/")[1];
    files.set(p, html.replace(/href="\/[^"#]+#\/lesson\/([a-z0-9-]+)"/g, (m, id) => (LESSON_IDS.has(`${slug}/${id}`) ? `href="/lessons/${slug}/${id}/"` : m)));
  }
  for (const [p, html] of files) if (p.endsWith(".html") && html.includes("<main")) files.set(p, headingIds(html));
  for (const [p, html] of files) if (/^(guides|topics|vs|checklists|terms|compare)\/.+\.html$/.test(p) && !html.startsWith("<!doctype html>\n<html lang=\"en-GB\"><head><meta charset")) files.set(p, autoLink(html, `/${p.replace(/index\.html$/, "")}`));
  // each page lists the modules it loads, like every other page (scripts/preload-modules.mjs)
  for (const [p, html] of files) if (p.endsWith(".html")) files.set(p, withPreloads(fileURLToPath(new URL(p, root)), html));
  files.set(`${INDEXNOW_KEY}.txt`, `${INDEXNOW_KEY}\n`);
  files.set("llms-full.txt", llmsFull(files));
  for (const [p, html] of await headTagged()) files.set(p, html);
  // course pages: the crawlable course overview, title and description, then the same head tags as every page
  const cd = await courseData();
  const leads = new Map(cd.map((c) => [c.slug, new Map(c.units.flatMap((u) => u.lessons.map((l) => [l.id, l.lead])))]));
  for (const [p, html] of await coursePageOutputs({
    lessonPages: LESSON_IDS,
    leadsFor: (slug) => leads.get(slug) || new Map(),
    hubFor: (slug) => (files.has(`topics/${slug}/index.html`) ? `/topics/${slug}/` : null),
    topicsFor: (slug, u) => (files.has(`topics/${slug}/${u.id}/index.html`) ? `/topics/${slug}/${u.id}/` : null),
    plansFor: (slug) => [...files.keys()].filter((k) => k.startsWith(`study-plan/${slug}-`) && k.endsWith("/index.html") && !/noindex/.test(files.get(k).match(/<meta name="robots"[^>]*>/)?.[0] || "")).map((k) => [`/${k.replace(/index\.html$/, "")}`, files.get(k).match(/<h1[^>]*>([^<]*)/)?.[1].replace(/ study plan$/, "") || k]),
  })) files.set(p, withHeadTags(html, `https://getgradify.com/${p.replace(/index\.html$/, "")}`));
  // the search identity of every site home (after the course pages, which own their own titles) (scripts/seo/registry.mjs)
  for (const [p, entry] of registry()) {
    const html = files.get(p) ?? await readFile(new URL(p, root), "utf8").catch(() => null); if (html === null) continue;
    const next = applySeo(html, entry); if (next !== html || files.has(p)) files.set(p, next);
  }
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
