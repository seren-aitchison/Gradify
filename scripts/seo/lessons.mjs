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
  const used = new Set();
  return lessonHtml(L)
    // a named part in a list ("<b>Lysosomes</b>: …") gets its own anchor, so a search can link straight to it
    .replace(/<li><b>([^<]{2,60})<\/b>/g, (m, name) => { const id = anchorId(name); if (!id || used.has(id)) return m; used.add(id); return `<li id="${id}"><b>${name}</b>`; })
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

const anchorId = (t) => plain(t).toLowerCase().replace(/&[a-z#0-9]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const INTERROGATIVE = /^(what|why|how|which|when|where|who|whose|is|are|does|do|did|can|could|should|would|will|was|were|has|have|name|define|state|give|explain|describe|outline|list|identify|calculate|compare|distinguish)\b/i;
/** the questions a lesson answers, worded as a student would ask them, each with its answer from the lesson itself:
 *  every flashcard phrased as a question, "What is …?" for each key term, and for law, what happened in each case and
 *  the principle it stands for. Questions shown in "Check your understanding" aren't repeated. */
const PLURAL = /[^su]s$/i, IRREGULAR = new Set(["mitochondria", "bacteria", "criteria", "phenomena", "data", "media", "cilia", "flagella", "fungi", "nuclei", "stimuli"]);
/** "Golgi apparatus" stays capitalised (the lesson writes "the Golgi" mid-sentence); "Nucleus" becomes "nucleus" */
function lowerUnlessProper(name, L) {
  const first = name.split(/\s+/)[0];
  if (/^[A-Z0-9]{2,}$/.test(first) || /[A-Z]/.test(first.slice(1))) return name;
  // a proper name keeps its capital: the lesson capitalises it mid-sentence ("the Golgi") and never writes it in lower
  // case. Everything else is lower-cased ("nucleus", and "arbitration" though the lesson also names "the Arbitration Act")
  const low = name.charAt(0).toLowerCase() + name.slice(1), text = plain(lessonText(L)), esc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const midCap = new RegExp(`[a-z,;] ${esc(first)}\\b`).test(text), lowSeen = new RegExp(`\\b${esc(low.split(/\s+/)[0])}\\b`).test(text);
  return midCap && !lowSeen ? name : low;
}
export function questionsFor(L, skip = new Set()) {
  const out = [], seen = new Set(skip), add = (q, a) => { const k = plain(q).toLowerCase(); if (!q || !a || seen.has(k)) return; seen.add(k); out.push([q, a]); };
  for (const c of L.authorities.filter((x) => x.kind === "case")) {
    const n = caseName(c.name);
    add(`What happened in ${n}?`, `${c.facts} **Held:** ${c.held}`);
    add(`What principle does ${n} establish?`, c.principle);
  }
  for (const [t, d] of L.terms) if (!L.authorities.some((c) => caseName(c.name) === plain(t))) add(`What does “${lowerUnlessProper(plain(t), L)}” mean?`, d);
  for (const [q, a] of L.cards) if (INTERROGATIVE.test(plain(q)) && !/^Case card:|^Which case is authority/.test(plain(q))) add(q.trim(), a);
  // a named part described in a list ("**Lysosomes**: digest worn-out parts…"): "What are lysosomes?"
  for (const b of L.blocks.filter((x) => x.t === "ul")) for (const item of b.items || []) {
    const m = String(item).match(/^\*\*([^*]{2,60})\*\*:\s*(.{20,})$/); if (!m) continue;
    const name = plain(m[1]); if (name.split(/\s+/).length > 6 || /(al|ive|ing|ed|ly)$/i.test(name)) continue;
    const n = lowerUnlessProper(name, L), many = PLURAL.test(name) || IRREGULAR.has(name.toLowerCase());
    add(many ? `What are ${n}?` : `What is the ${n}?`, item);
  }
  // check questions not already on the page, with the right answer and why
  for (const m of L.mcq) if (INTERROGATIVE.test(plain(m.q))) add(m.q.trim(), `**${m.right}.** ${m.why || ""}`.trim());
  return out;
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
        const mcq = L.mcq.slice(0, 4), qa = questionsFor(L, new Set(mcq.map((m) => plain(m.q).toLowerCase()))), cards = qa;
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
    ${qa.length ? `<section class="lesson-qa"><h2 id="questions">Questions this page answers</h2><p>Use them as flashcards: cover the answer, say it out loud, then check.</p>${(() => { const ids = new Set(); return qa.map(([q, a]) => { let id = `q-${anchorId(q)}`; while (ids.has(id)) id += "-2"; ids.add(id); return `<h3 id="${id}">${inline(q)}</h3><p>${inline(a)}</p>`; }).join(""); })()}</section>` : ""}
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
