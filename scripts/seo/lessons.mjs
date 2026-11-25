// Crawlable lesson pages (getgradify.com/lessons/<course>/<lesson>/), a PILOT. Inside the course apps a lesson lives at
// a # address (/scigradify/biology/#/lesson/u02-04), which search engines treat as the course page itself, so ~9,900
// lessons are invisible to search. Each page here is the lesson's own notes rendered by the app's own renderer
// (kit/course/notes.js lessonHtml and lessonFrame), its checked diagrams as images (kit/diagrams/manifest.json, the same
// "not failed" rule as the app), key terms, a few flashcards and check questions with answers, and its sources, with a
// button into the lesson in the course (which keeps all its interactive parts). Only the units in PILOT are built: the
// rest wait until the pilot has been inspected and indexed. Thin pages are noindexed (MIN_WORDS).
import { readFile } from "node:fs/promises";
import { esc, related, fitDesc } from "./shell.mjs";
import { notation } from "./coursepages.mjs";
import { qualPhrase, firstFit, contents, titleCase, caseName } from "./serp.mjs";
import { parseNotes, lessonHtml, lessonFrame, lessonText, inline } from "../../kit/course/notes.js";

const root = new URL("../../", import.meta.url);
// course slug → units in the pilot (a spread of content: diagrams and structures, equations and worked examples,
// cases and statutes)
export const PILOT = { biology: ["u02"], chemistry: ["u01"], law: ["u01"] };
export const MIN_WORDS = 250;
const plain = (s) => notation(s).replace(/\*\*|`/g, "").replace(/\*(\S[^*]*)\*/g, "$1").replace(/<\/?[a-z][^<>]*>/gi, "").trim();
const json = async (p) => JSON.parse(await readFile(new URL(p, root), "utf8"));

// a lesson's notes for a standalone page: section headings one level up (the page's h1 is the lesson), diagrams as
// images with their checked captions, and the app's empty interactive slots left out
function notesHtml(L, diagrams) {
  return lessonHtml(L)
    .replace(/<h3>/g, "<h2>").replace(/<\/h3>/g, "</h2>")
    .replace(/<div class="co-ixslot"[^>]*><\/div>/g, "")
    .replace(/<figure class="vx" data-dg="([^"]+)" hidden><\/figure>/g, (m, id) => {
      const d = diagrams[id]; if (!d || d.status === "failed") return "";
      return `<figure class="lesson-dg"><picture><source media="(max-width: 600px)" srcset="/kit/diagrams/svg/${esc(id)}.narrow.svg"><img src="/kit/diagrams/svg/${esc(id)}.wide.svg" alt="${esc(d.alt || d.title)}" loading="lazy" decoding="async"></picture><figcaption><b>${esc(d.title)}.</b> ${esc(d.caption || "")}</figcaption></figure>`;
    });
}
const frame = (html) => html.replace(/<h3>/g, "<h2>").replace(/<\/h3>/g, "</h2>").replace(/<h4>/g, "<h3>").replace(/<\/h4>/g, "</h3>");

// the search-result title: what the page is ("revision notes"), and the one thing it has that a student searches for
// with the topic (key cases in law, a diagram, a worked example), without the brand when that would cut it short
function lessonTitle(title, api, c) {
  const t = titleCase(title), n = api.name, sep = /\?$/.test(t) ? " " : ": ", k = c.cases.length;
  const extra = k ? `Notes and Key Case${k > 1 ? "s" : ""}` : c.diagrams ? `Revision Notes and Diagram${c.diagrams > 1 ? "s" : ""}` : c.examples ? "Revision Notes and Worked Examples" : "Revision Notes and Questions";
  return firstFit([`${t}${sep}${n} ${extra}`, `${t}${sep}${n} Revision Notes`, `${t} Revision Notes`, t]);
}
// the description: the search phrase and what's on the page first (they're what a searcher scans for), then the key
// cases by name (searched as "<case> case summary"), then the lesson's own first sentence if there's room
function lessonDesc(title, lead, slug, api, c) {
  const t = titleCase(title), q = qualPhrase(slug, api.name), k = c.cases.length;
  const name = (withQ) => `${t}${/\?$/.test(t) ? " Revision notes" : " revision notes"}${withQ && q ? ` for ${q}` : ""}`;
  // what's on the page, in full and then shorter; a named key case isn't counted again
  const has = [contents({ ...c, cases: 0, cards: c.cards >= 3 ? c.cards : 0 }) || "key terms", `${c.diagrams ? "a labelled diagram, " : ""}key terms, flashcards and questions with answers`, `${c.diagrams ? "a diagram, " : ""}flashcards and questions`];
  const cases = k ? ` Key case${k > 1 ? "s" : ""}: ${c.cases.slice(0, 3).join(", ")}.` : "";
  const first = (lead.match(/^.{20,200}?[.!?](\s|$)/)?.[0] || "").trim();
  const opts = [];
  for (const h of has) {
    if (first) opts.push(`${name(true)}: ${first}${cases} Free, with ${h}.`, `${name(false)}: ${first}${cases} Free, with ${h}.`);
  }
  for (const h of has) opts.push(k ? `${name(true)}.${cases} Free, with ${h}.` : `${name(true)}, free, with ${h}.`, k ? `${name(false)}.${cases} Free, with ${h}.` : `${name(false)}, free, with ${h}.`);
  return opts.find((x) => x.length <= 155) || fitDesc(opts.at(-1));
}

export async function lessonPages() {
  const diagrams = await json("kit/diagrams/manifest.json"), cat = (await json("kit/api/v1/catalogue.json")).courses, pages = [];
  for (const [slug, unitIds] of Object.entries(PILOT)) {
    const c = cat.find((x) => x.slug === slug), api = await json(`kit/api/v1/courses/${slug}.json`); if (!c?.page) continue;
    const U = api.unitWord || "Unit";
    for (const uid of unitIds) {
      const unit = api.units.find((u) => u.id === uid), parsed = parseNotes((await import(new URL(`kit/courses/${slug}/notes/${uid}.js`, root))).default);
      const byTitle = new Map(parsed.map((l) => [l.title, l]));
      const list = unit.lessons.map((meta, i) => ({ meta, L: byTitle.get(meta.title) || parsed[i] })).filter((x) => x.L);
      list.forEach(({ meta, L }, i) => {
        const prev = list[i - 1]?.meta, next = list[i + 1]?.meta, f = lessonFrame(L), path = `lessons/${slug}/${meta.id}/index.html`;
        const words = lessonText(L).split(/\s+/).length + L.cards.reduce((n, [q, a]) => n + plain(q).split(/\s+/).length + plain(a).split(/\s+/).length, 0);
        const cards = L.cards.slice(0, 6), mcq = L.mcq.slice(0, 4);
        const lead = plain(L.lead);
        const counts = { diagrams: L.blocks.filter((b) => b.t === "dg" && diagrams[b.id] && diagrams[b.id].status !== "failed").length, examples: L.blocks.filter((b) => b.t === "ex").length,
          cases: L.authorities.filter((a) => a.kind === "case").map((a) => caseName(a.name)), terms: L.terms.length, cards: cards.length, questions: mcq.length };
        pages.push({
          path, noindex: words < MIN_WORDS, updated: L.sources.map((s) => s.date).filter((d) => /^\d{4}-\d{2}(-\d{2})?$/.test(d)).sort().at(-1) || null, updatedLabel: "Sources last checked",
          title: lessonTitle(meta.title, api, counts),
          description: lessonDesc(meta.title, lead, slug, api, counts),
          crumbs: [["Topics", "topics/"], [api.name, `topics/${slug}/`], [unit.title, `topics/${slug}/${uid}/`], [meta.title, `lessons/${slug}/${meta.id}/`]],
          schema: [{ "@type": "LearningResource", name: meta.title, description: lead, learningResourceType: "Lesson", keywords: [...new Set([meta.title, ...L.terms.map(([t]) => plain(t)), ...counts.cases].filter(Boolean))].join(", ") || undefined, educationalLevel: L.level || undefined, inLanguage: "en-GB", isAccessibleForFree: true, teaches: L.objectives.map(plain), url: `https://getgradify.com/lessons/${slug}/${meta.id}/`, isPartOf: { "@type": "Course", name: api.name, url: `https://getgradify.com${c.page}` }, provider: { "@id": "https://getgradify.com/#org" } }],
          body: `<article class="lesson-page">
    <p class="lesson-kicker">${esc(api.name)} revision notes · ${esc(U)} ${unit.n}: ${esc(unit.title)}${meta.module ? ` · ${esc(meta.module)}` : ""}${L.level ? ` · ${esc(L.level)}` : ""}</p>
    <h1>${esc(meta.title)}</h1>
    ${lead ? `<p class="answer">${inline(L.lead)}</p>` : ""}
    <p><a class="btn btn-primary lg" href="${c.page}#/lesson/${meta.id}"><span>Open this lesson in the course</span> <span aria-hidden="true">→</span></a> <small>Interactive version with practice, progress and spaced reviews. Free.</small></p>
    ${api.notice ? `<p class="lesson-notice">${plain(api.notice)}</p>` : ""}
    ${frame(f.top)}
    <div class="lesson-notes">${notesHtml(L, diagrams)}</div>
    ${frame(f.end)}
    ${cards.length ? `<section><h2>Flashcards</h2><p>Answer from memory, then open the card to check.</p>${cards.map(([q, a]) => `<details class="flash"><summary>${inline(q)}</summary><p>${inline(a)}</p></details>`).join("")}</section>` : ""}
    ${mcq.length ? `<section><h2>Check your understanding</h2><ol class="qbank">${mcq.map((m) => `<li><b>${inline(m.q)}</b><ul class="opts">${[m.right, ...m.wrong].sort((a, b) => a.localeCompare(b)).map((o) => `<li>${inline(o)}</li>`).join("")}</ul><details><summary>Show the answer</summary><p><b>${inline(m.right)}.</b> ${inline(m.why || "")}</p></details></li>`).join("")}</ol></section>` : ""}
    ${frame(f.refs)}
    <nav class="unit-nav" aria-label="Previous and next lessons">${prev ? `<a href="/lessons/${slug}/${prev.id}/">← ${esc(prev.title)}</a>` : `<a href="/topics/${slug}/${uid}/">← ${esc(unit.title)} overview</a>`}${next ? `<a href="/lessons/${slug}/${next.id}/">Next: ${esc(next.title)} →</a>` : `<a href="${c.page}">Back to the ${esc(api.name)} course →</a>`}</nav>
    ${related("Keep going", [[`topics/${slug}/${uid}/`, `${unit.title}: topic overview`, "key terms, a quick quiz and a mind map"], [`${c.page.slice(1)}`, `The ${api.name} course`, `${api.site}, free`], [`topics/${slug}/`, `All ${api.name} topics`, ""]])}
    </article>`,
        });
      });
    }
  }
  return pages;
}
/** "biology/u02-04" for every lesson that has a page, so the course and topic pages can link to them */
export async function lessonPageIds() {
  const ids = new Set();
  for (const p of await lessonPages()) ids.add(p.path.replace(/^lessons\/|\/index\.html$/g, ""));
  return ids;
}
