// The crawlable part of each course page (e.g. medgradify/course/index.html). The course itself is an app that draws
// into <div id="course"> after the page loads, so without JavaScript (and for most AI crawlers) the page was nearly
// empty. This writes, between markers after that div, a course overview built only from the course's own data: what
// it covers, its units and lessons with a line from each lesson's notes, its study paths, levels and exams, and what
// qualifications it serves (kit/curriculum/coverage.js, claims only as strong as the evidence). It also gives the
// page a unique title and description. The app hides the overview on its inner views and demotes its h1 so there's
// one h1 (kit/course/course.js). Called by scripts/build-seo.mjs; edit the overview here, not in the pages.
import { readFile } from "node:fs/promises";
import { readdirSync, existsSync } from "node:fs";
import { esc, fitTitle, fitDesc } from "./shell.mjs";
import { SITES, slugOf } from "../../kit/core/site.js";
import { COURSES as COVERAGE, QUALIFICATIONS, STATUS } from "../../kit/curriculum/coverage.js";

const root = new URL("../../", import.meta.url);
const START = "<!-- course-overview: written by scripts/build-seo.mjs (scripts/seo/coursepages.mjs); edit it there -->", END = "<!-- /course-overview -->";
const plain = (s) => String(s ?? "").replace(/\*\*|`|\{|\}|\^|_(?=\{)/g, "").replace(/\*(\S[^*]*)\*/g, "$1").replace(/<[^>]+>/g, "").trim();
const first = (s) => { const m = plain(s).match(/^.{20,200}?[.!?](\s|$)/); return m ? m[0].trim() : plain(s).slice(0, 160); };
const n = (x, w) => `${x.toLocaleString("en-GB")} ${w}${x === 1 ? "" : "s"}`;

/** every page that mounts a course: [{ path, slug }] */
export function coursePagePaths() {
  const out = [];
  for (const d of readdirSync(root).filter((x) => /gradify$/.test(x)).sort()) {
    for (const sub of readdirSync(new URL(`${d}/`, root), { withFileTypes: true }).filter((e) => e.isDirectory())) {
      const p = `${d}/${sub.name}/index.html`; if (!existsSync(new URL(p, root))) continue;
      out.push(p);
    }
  }
  return out;
}

/** the overview section for one course */
export function overviewHtml(api, { leads = new Map(), lessonHref = (l) => `#/lesson/${l.id}`, topicFor = () => null, plans = [], topicsHub = null } = {}) {
  const site = SITES.find((s) => s.n === api.site), U = api.unitWord || "Unit", u1 = U.toLowerCase();
  const units = api.units, lessons = units.reduce((s, u) => s + u.lessons.length, 0), written = units.filter((u) => u.written).length;
  const cov = COVERAGE[api.slug]?.serves?.filter((x) => x.q) || [];
  const levels = (api.levels || []).filter(Boolean), paths = (api.paths || []).filter((p) => p.name), exams = (api.exams || []).length;
  const intro = `${esc(api.site)}'s free ${esc(api.name)} course runs from <b>${esc(units[0].title)}</b> to <b>${esc(units.at(-1).title)}</b>: ${n(lessons, "lesson")} in ${n(units.length, u1)}, each with notes, flashcards and check questions${levels.length ? ` at three levels (${levels.map(esc).join(", ")})` : ""}.${site?.who ? ` It's written for ${esc(site.who.charAt(0).toLowerCase() + site.who.slice(1))}.` : ""}`;
  return `${START}
    <section class="course-overview" id="course-syllabus" aria-labelledby="co-ov-h">
      <h1 id="co-ov-h" data-static-h1>${esc(api.name)}: a free course on ${esc(api.site)}</h1>
      <p class="co-ov-lead">${intro}</p>
      ${api.notice ? `<p class="co-ov-notice">${plain(api.notice)}</p>` : ""}
      <h2>Course overview</h2>
      <ul class="co-ov-facts">
        <li><b>${n(units.length, u1)}</b>, ${n(lessons, "lesson")}${written < units.length ? ` (${written} ${u1}s written so far; the rest are planned)` : ""}</li>
        ${paths.length ? `<li><b>Study paths:</b> ${paths.map((p) => esc(p.name)).join(", ")}</li>` : ""}
        ${exams ? `<li><b>${n(exams, "practice exam")}</b> to test yourself under time</li>` : ""}
        <li><b>Curriculum:</b> ${cov.length ? cov.map((x) => `${esc(QUALIFICATIONS[x.q]?.name || x.q)} (${esc(STATUS[x.status].name.toLowerCase())})`).join("; ") : "Gradify's own curriculum, not tied to an official specification"}. <a href="/exam-boards/">What this means</a></li>
      </ul>
      <h2>${esc(U)}s and lessons</h2>
      ${units.map((u) => { const t = topicFor(u); return `<details class="co-ov-unit"${u.n === 1 ? " open" : ""}><summary><h3>${esc(U)} ${u.n}: ${esc(u.title)}</h3> <span>${n(u.lessons.length, "lesson")}${u.written ? "" : " · planned"}</span></summary>
        ${t ? `<p><a href="${t}">${esc(u.title)}: key terms, sample flashcards and a quick quiz</a></p>` : ""}
        <ol>${u.lessons.map((l) => { const lead = leads.get(l.id); return `<li><a href="${lessonHref(l)}">${esc(l.title)}</a>${lead ? `: ${esc(first(lead))}` : ""}</li>`; }).join("")}</ol></details>`; }).join("\n      ")}
      ${plans.length ? `<h2>Study plans</h2><ul class="co-ov-plans">${plans.map(([h, name]) => `<li><a href="${h}">${esc(name)}</a></li>`).join("")}</ul>` : ""}
      <p class="co-ov-more">More for ${esc(api.name)}: ${topicsHub ? `<a href="${topicsHub}">all ${esc(api.name)} topics</a> · ` : ""}<a href="/tools/">free study tools</a> · <a href="/guides/">study guides</a></p>
    </section>
    ${END}`;
}

/** a page with its overview, title and description (and link-preview titles) updated */
export function withOverview(html, api, opts) {
  const block = overviewHtml(api, opts);
  if (html.includes(START)) html = html.replace(new RegExp(`${START}[\\s\\S]*?${END}`), block);
  else html = html.replace('<div id="course"></div>', `<div id="course"></div>\n    ${block}`);
  const lessons = api.units.reduce((s, u) => s + u.lessons.length, 0);
  const title = fitTitle(`${api.name} Course: Free Lessons and Flashcards · ${api.site}`);
  const desc = fitDesc(`Free ${api.name} course on ${api.site}: ${lessons} lessons from ${api.units[0].title} to ${api.units.at(-1).title}, with flashcards, check questions and practice exams.`);
  const a = (s) => esc(s);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${a(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${a(desc)}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${a(title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${a(desc)}">`);
  // Course structured data, once
  const ld = { "@context": "https://schema.org", "@type": "Course", name: api.name, description: desc, url: `https://getgradify.com${opts.page}`, provider: { "@type": "EducationalOrganization", name: "Gradify", url: "https://getgradify.com/" }, isAccessibleForFree: true, inLanguage: "en-GB", hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: `PT${Math.max(1, Math.round(lessons * 0.25))}H` }, offers: { "@type": "Offer", price: "0", priceCurrency: "GBP", category: "Free" }, syllabusSections: api.units.map((u) => ({ "@type": "Syllabus", name: `${api.unitWord || "Unit"} ${u.n}: ${u.title}` })) };
  const tag = `<script type="application/ld+json" data-course-ld>${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`;
  html = /<script type="application\/ld\+json" data-course-ld>[\s\S]*?<\/script>/.test(html) ? html.replace(/<script type="application\/ld\+json" data-course-ld>[\s\S]*?<\/script>/, tag) : html.replace("</head>", `  ${tag}\n</head>`);
  return html;
}

/** { path: html } for every course page, from the disk copy */
export async function coursePageOutputs({ leadsFor, topicsFor, plansFor, hubFor = () => null, lessonPages = new Set() }) {
  const out = new Map();
  for (const p of coursePagePaths()) {
    const html = await readFile(new URL(p, root), "utf8");
    if (!html.includes('<div id="course">')) continue;
    const slug = html.match(/kit\/courses\/([a-z0-9-]+)\/course\.js/)?.[1]; if (!slug) continue;
    const api = await readFile(new URL(`kit/api/v1/courses/${slug}.json`, root), "utf8").then(JSON.parse).catch(() => null); if (!api?.units?.length) continue;
    const page = `/${p.replace(/index\.html$/, "")}`;
    out.set(p, withOverview(html, api, { page, leads: leadsFor(slug), topicFor: (u) => topicsFor(slug, u), plans: plansFor(slug), topicsHub: hubFor(slug), lessonHref: (l) => (lessonPages.has(`${slug}/${l.id}`) ? `/lessons/${slug}/${l.id}/` : `#/lesson/${l.id}`) }));
  }
  return out;
}
export { slugOf };
