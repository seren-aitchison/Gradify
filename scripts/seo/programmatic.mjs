// Pages generated from Gradify's own courses, so every unit of every live course has a crawlable page:
//   topics/<course>/<unit>/      a unit's lessons, key terms and five sample flashcards, straight from its notes
//   topics/<course>/             the course's units          topics/   every course
//   study-plan/<course>-<path>/  a week-by-week plan for each of a course's learning paths (GCSE, A level, year 1 …)
// The course pages themselves are an app (hash routes); these are static HTML that search engines and AI crawlers read
// without JavaScript, each linking into the live lesson.
import { readFile } from "node:fs/promises";
import { esc, related, toc } from "./shell.mjs";
import { parseNotes, inline } from "../../kit/course/notes.js";

const root = new URL("../../", import.meta.url);
const json = async (p) => JSON.parse(await readFile(new URL(p, root), "utf8"));
const plain = (s) => String(s ?? "").replace(/\*\*|`|\{|\}|\^|_(?=\{)/g, "").replace(/\*(\S[^*]*)\*/g, "$1").trim();
const firstSentence = (s) => { const m = plain(s).match(/^.{20,220}?[.!?](\s|$)/); return m ? m[0].trim() : plain(s).slice(0, 200); };
const plural = (n, w) => `${n.toLocaleString("en-GB")} ${w}${n === 1 ? "" : "s"}`;

/** every live course with its units' parsed lessons: [{ slug, name, site, page, unitWord, units: [{ id, n, title, lessons: [{ id, title, module, lead, cards, terms }] }], paths }] */
export async function courses() {
  const cat = await json("kit/api/v1/catalogue.json"), out = [];
  for (const c of cat.courses.filter((x) => ["live", "beta"].includes(x.status) && x.page?.startsWith("/"))) {
    const api = await json(`kit/api/v1/courses/${c.slug}.json`);
    const units = [];
    for (const u of api.units.filter((x) => x.written)) {
      let parsed = [];
      try { parsed = parseNotes((await import(new URL(`kit/courses/${c.slug}/notes/${u.id}.js`, root))).default); } catch { continue; }
      const byTitle = new Map(parsed.map((l) => [l.title, l]));
      const lessons = u.lessons.map((l, i) => { const p = byTitle.get(l.title) || parsed[i]; return p ? { ...l, lead: p.lead, cards: p.cards || [], terms: p.terms || [], mcq: p.mcq || [], prereq: p.prereq || [], keys: p.blocks.filter((b) => b.t === "key").map((b) => b.x), pits: p.blocks.filter((b) => b.t === "pit").map((b) => b.x), eqs: p.blocks.filter((b) => b.t === "eq").flatMap((b) => b.rows) } : null; }).filter(Boolean);
      if (lessons.length) units.push({ id: u.id, n: u.n, title: u.title, lessons });
    }
    if (units.length) out.push({ slug: c.slug, name: api.name, site: api.site, page: c.page, unitWord: api.unitWord || "Unit", units, paths: api.paths || [], allUnits: api.units });
  }
  return out;
}

// five cards spread across the unit's lessons (deterministic, so the pages don't change between builds)
function sampleCards(unit, n = 5) {
  const pool = unit.lessons.flatMap((l) => l.cards.slice(0, 2).map(([q, a]) => ({ q, a, lesson: l })));
  if (pool.length <= n) return pool;
  return Array.from({ length: n }, (_, i) => pool[Math.floor((i * pool.length) / n)]);
}

// the quality floor: a topic page is indexed only if it has enough of its own content to be worth a search result
export const MIN_WORDS = 250, MIN_LESSONS = 3;
const words = (s) => plain(s).split(/\s+/).filter(Boolean).length;
export function unitWords(u) {
  return u.lessons.reduce((n, l) => n + words(l.lead) + l.terms.reduce((m, [t, d]) => m + words(t) + words(d), 0) + l.cards.reduce((m, [q, a]) => m + words(q) + words(a), 0), 0);
}
const LEVEL = { 1: ["foundation", "Foundation recall"], 2: ["exam", "Exam style"], 3: ["stretch", "Stretch"] };
const jsonLd = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

// a static SVG mind map of the unit: the unit in the middle, its modules (or lessons) around it
function mindMap(c, u) {
  const groups = new Map();
  for (const l of u.lessons) { const k = l.module || l.title; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(l.title); }
  const branches = [...groups.entries()].slice(0, 8), n = branches.length, W = 760, H = 460, cx = W / 2, cy = H / 2;
  const cut = (t, m) => (t.length > m ? `${t.slice(0, m - 1)}…` : t);
  const nodes = branches.map(([name, ls], i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2, x = cx + Math.cos(a) * 270, y = cy + Math.sin(a) * 165;
    return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(0)}" y2="${y.toFixed(0)}" class="mm-l"/><g class="mm-b"><rect x="${(x - 92).toFixed(0)}" y="${(y - 20).toFixed(0)}" width="184" height="40" rx="12"/><text x="${x.toFixed(0)}" y="${(y - 2).toFixed(0)}">${esc(cut(name, 26))}</text><text x="${x.toFixed(0)}" y="${(y + 13).toFixed(0)}" class="mm-s">${ls.length} lesson${ls.length === 1 ? "" : "s"}</text></g>`;
  }).join("");
  const label = `Revision mind map for ${u.title} (${c.name}) showing its ${n} main branches: ${branches.map(([b]) => b).join(", ")}`;
  return `<figure class="mindmap"><svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="mm-t mm-d" xmlns="http://www.w3.org/2000/svg"><title id="mm-t">${esc(u.title)} mind map</title><desc id="mm-d">${esc(label)}</desc><style>.mm-l{stroke:#f055dd;stroke-width:2;opacity:.55}.mm-b rect{fill:#151515;stroke:#444}.mm-c{fill:#f055dd}text{font:600 13px system-ui,sans-serif;fill:#fff;text-anchor:middle}.mm-s{font-weight:400;font-size:11px;fill:#bbb}.mm-w{font-size:10px;fill:#888;text-anchor:end}</style><rect width="${W}" height="${H}" fill="#0b0b0b" rx="16"/>${nodes}<circle cx="${cx}" cy="${cy}" r="62" class="mm-c"/><text x="${cx}" y="${cy + 4}">${esc(cut(u.title, 20))}</text><text x="${W - 14}" y="${H - 12}" class="mm-w">getgradify.com</text></svg><figcaption>${esc(label)}. <button type="button" class="mini no-print" data-mm-png>Download as PNG</button></figcaption></figure>`;
}

function unitPage(c, u) {
  const cards = u.lessons.reduce((s, l) => s + l.cards.length, 0), sample = sampleCards(u);
  const terms = u.lessons.flatMap((l) => l.terms.slice(0, 1)).slice(0, 14);
  const modules = [...new Set(u.lessons.map((l) => l.module).filter(Boolean))];
  const i = c.units.indexOf(u), prev = c.units[i - 1], next = c.units[i + 1];
  const thin = u.lessons.length < MIN_LESSONS || unitWords(u) < MIN_WORDS;
  const title = `${u.title}: ${c.name} Revision and Flashcards · Gradify`;
  const description = `Free ${c.name} revision for ${u.title}: ${plural(u.lessons.length, "lesson")}, key terms, ${cards || "practice"} flashcards and a quick quiz. Try five sample cards now.`;
  const at = (l) => `${c.page}#/lesson/${l.id}`;
  // what the page's script needs: sample cards for the drill, check questions for the quiz, where the full notes are
  const pool = u.lessons.flatMap((l) => l.cards.slice(0, 3).map(([q, a]) => ({ q: inline(q), a: inline(a), l: l.title, href: at(l) })));
  const drill = pool.length <= 20 ? pool : Array.from({ length: 20 }, (_, k) => pool[Math.floor((k * pool.length) / 20)]);
  const mcqAll = u.lessons.flatMap((l) => l.mcq.map((m) => ({ ...m, lesson: l })));
  const mcq = [1, 2, 3].flatMap((d) => mcqAll.filter((m) => m.d === d).slice(0, 3)).slice(0, 9);
  const keys = u.lessons.flatMap((l) => l.keys.slice(0, 1)).slice(0, 6), pits = u.lessons.flatMap((l) => l.pits.slice(0, 1)).slice(0, 6);
  const eqs = u.lessons.flatMap((l) => l.eqs).filter(([x]) => x && x.length < 90).slice(0, 8);
  const titles = new Set(u.lessons.map((l) => l.title));
  const allLessons = new Map(c.units.flatMap((x) => x.lessons.map((l) => [l.title, { unit: x, l }])));
  const prereq = [...new Set(u.lessons.flatMap((l) => l.prereq.flatMap((x) => x.split(/\s*;\s*/)).map((x) => x.trim()).filter(Boolean)))].filter((t) => !titles.has(t)).slice(0, 5);
  const plans = c.paths.filter((p) => (p.units || []).includes(u.n));
  const data = { title: u.title, course: c.name, page: c.page, learn: `${c.page}#/learn/${u.id}`, notes: `/kit/courses/${c.slug}/notes/${u.id}.js`, cards: drill,
    mcq: mcq.map((m) => ({ q: inline(m.q), right: inline(m.right), wrong: m.wrong.map(inline), why: inline(m.why || ""), d: m.d, l: m.lesson.title })),
    keys: keys.map(plain), pits: pits.map(plain), terms: u.lessons.flatMap((l) => l.terms).slice(0, 30).map(([t, d]) => [plain(t), plain(d)]) };
  const glance = [...terms.map(([t, d]) => [plain(t), plain(d)]), ...eqs.map(([x, note]) => [plain(x), plain(note || "")])];
  return {
    path: `topics/${c.slug}/${u.id}/index.html`, title, description, noindex: thin, crumbs: [["Topics", "topics/"], [c.name, `topics/${c.slug}/`], [u.title, `topics/${c.slug}/${u.id}/`]],
    head: `<script type="application/json" id="topic-data">${jsonLd(data)}</script>`,
    schema: [{ "@type": "Course", name: `${c.name}: ${u.title}`, description, url: `https://getgradify.com${c.page}#/learn/${u.id}`, provider: { "@id": "https://getgradify.com/#org" }, isAccessibleForFree: true, inLanguage: "en-GB", hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: `PT${Math.max(1, Math.round(u.lessons.length * 0.25))}H` }, offers: { "@type": "Offer", price: "0", priceCurrency: "GBP", category: "Free" } },
      ...(terms.length ? [{ "@type": "DefinedTermSet", name: `${u.title} key terms`, hasDefinedTerm: terms.map(([t, d]) => ({ "@type": "DefinedTerm", name: plain(t), description: plain(d) })) }] : []),
      ...(mcq.length ? [{ "@type": "Quiz", name: `${u.title} quick quiz`, about: u.title, educationalLevel: c.name, hasPart: mcq.map((m) => ({ "@type": "Question", eduQuestionType: "Multiple choice", text: plain(m.q), acceptedAnswer: { "@type": "Answer", text: plain(m.right) } })) }] : [])],
    body: `<div data-topic>
    <h1>${esc(u.title)}</h1>
    <p class="answer">${esc(c.unitWord)} ${u.n} of ${esc(c.site)}'s free ${esc(c.name)} course: ${plural(u.lessons.length, "lesson")}${modules.length ? ` covering ${esc(modules.join("; "))}` : ""}, with ${cards ? plural(cards, "flashcard") : "flashcards"}, practice questions and five mind maps for every lesson.</p>
    <p><a class="btn btn-primary lg" href="${c.page}#/learn/${u.id}"><span>Practise all ${cards || ""} cards free</span> <span aria-hidden="true">→</span></a></p>
    <div class="topic-bar no-print" aria-label="Study tools for this topic">
      <button type="button" class="mini" data-listen>▶ Listen (2 min)</button><button type="button" class="mini" data-print="cheat">Print cheat sheet</button><button type="button" class="mini" data-t="csv">Export to Anki / Quizlet</button>
      <details class="more-tools"><summary class="mini">More</summary><div><button type="button" class="mini" data-focus>Focus mode</button><button type="button" class="mini" data-print="blurting">Print blurting sheet</button><button type="button" class="mini" data-print="cards">Print index cards</button><button type="button" class="mini" data-t="md">Copy as Markdown</button><button type="button" class="mini" data-t="slides">Copy as slide bullets</button><button type="button" class="mini" data-t="prompt">Copy a study prompt</button><button type="button" class="mini" data-t="embed">Embed this deck</button></div></details>
      <span class="topic-msg" role="status" aria-live="polite"></span>
    </div>
    ${toc([["glance", "Key terms"], ["cards", "Flashcards"], ["quiz", "Quiz"], ["drill", "60-second drill"], ["map", "Mind map"], ["lessons", "Lessons"], ["check-in", "Check-in"]])}
    ${glance.length ? `<section class="glance" id="glance"><h2>Key terms and formulas at a glance</h2><dl>${glance.slice(0, 12).map(([t, d]) => `<div><dt>${esc(t)}</dt>${d ? `<dd>${esc(d)}</dd>` : ""}<button type="button" class="mini no-print" data-copy="${esc(d ? `${t}: ${d}` : t)}" aria-label="Copy ${esc(t)}">Copy</button></div>`).join("")}</dl></section>` : ""}
    ${sample.length ? `<section id="cards"><h2>Five sample flashcards</h2><p>Answer each from memory, then open it to check. Still foggy? Each card has the plain-English version.</p>${sample.map((s, k) => `<details class="flash" id="card-${k + 1}"><summary>${inline(s.q)}</summary><p>${inline(s.a)} <a href="${at(s.lesson)}">From “${esc(s.lesson.title)}” →</a></p>${s.lesson.lead ? `<p class="plain"><b>In plain English:</b> ${esc(firstSentence(s.lesson.lead))}${s.lesson.keys[0] ? ` <b>Key idea:</b> ${esc(plain(s.lesson.keys[0]))}` : ""}</p>` : ""}</details>`).join("")}</section>` : ""}
    ${mcq.length ? `<section class="quiz" id="quiz"><h2>Quick quiz: test yourself on ${esc(u.title)}</h2><p>${mcq.length} questions from the course, from foundation recall to stretch. Pick an answer, then say whether you knew it or guessed.</p><div class="quiz-live" hidden></div><ol class="quiz-static">${mcq.map((m) => `<li><b>${inline(m.q)}</b> <small>(${LEVEL[m.d][1]})</small><details><summary>Show the answer</summary><p>${inline(m.right)}.${m.why ? ` ${inline(m.why)}` : ""}</p></details></li>`).join("")}</ol></section>` : ""}
    ${drill.length >= 5 ? `<section id="drill"><h2>60-second rapid recall drill</h2><p>Race the clock through ${drill.length} cards. Press <kbd>Space</kbd> to flip, then <kbd>1</kbd> if you got it or <kbd>2</kbd> if you didn't.</p><div class="drill" data-drill><button type="button" class="btn btn-primary" data-drill-start><span>Start the drill</span></button></div></section>` : ""}
    ${keys.length ? `<h2>Key takeaways</h2><ul class="keys">${keys.map((k) => `<li>${inline(k)}</li>`).join("")}</ul>` : ""}
    ${pits.length ? `<h2>Common mistakes in ${esc(u.title)}</h2><ul class="pits">${pits.map((k) => `<li>${inline(k)}</li>`).join("")}</ul>${c.hasTraps ? `<p>More traps across the course: <a href="/exam-traps/${c.slug}/">${esc(c.name)} exam traps</a>.</p>` : ""}` : ""}
    <section id="map"><h2>${esc(u.title)} mind map</h2>${mindMap(c, u)}</section>
    <section id="lessons"><h2>Lessons in this ${esc(c.unitWord.toLowerCase())}</h2>
    <ol>${u.lessons.map((l) => `<li><a href="${at(l)}"><b>${esc(l.title)}</b></a>${l.lead ? `<br>${esc(firstSentence(l.lead))}` : ""}</li>`).join("")}</ol></section>
    ${terms.length ? `<h2>Key terms</h2><dl>${terms.map(([t, d]) => `<dt>${inline(t)}</dt><dd>${inline(d)}</dd>`).join("")}</dl>` : ""}
    ${prereq.length ? `<h2>Check these first</h2><p>This ${esc(c.unitWord.toLowerCase())} builds on:</p><ul>${prereq.map((t) => { const hit = allLessons.get(t); return `<li>${hit ? `<a href="/topics/${c.slug}/${hit.unit.id}/">${esc(t)}</a> <small>(${esc(hit.unit.title)})</small>` : esc(t)}</li>`; }).join("")}</ul>` : ""}
    <section class="check-in no-print" id="check-in"><h2>How confident are you on ${esc(u.title)}?</h2><p>Your answer stays in this browser. We'll put it in your review list: low comes back tomorrow, medium in 3 days, strong in a week.</p><div class="chips" data-confidence><button type="button" class="chip" data-level="low">Low</button><button type="button" class="chip" data-level="medium">Medium</button><button type="button" class="chip" data-level="strong">Strong</button></div><p><button type="button" class="mini" data-reviewed>Mark topic reviewed</button> <button type="button" class="mini" data-remind>Remind me in 3 days (.ics)</button> <span class="checkin-msg" role="status" aria-live="polite"></span></p></section>
    <h2>How to revise ${esc(u.title)}</h2><p>Test yourself before you re-read: answer the flashcards from memory, review the ones you miss after 1, 3 and 7 days, and finish with the practice questions. <a href="/guides/active-recall/">How active recall works</a>. Got your own lecture notes on this? <a href="/pdf-to-flashcards/">Turn them into flashcards</a> checked against what you wrote.</p>
    <nav class="unit-nav" aria-label="Next and previous topics">${prev ? `<a href="/topics/${c.slug}/${prev.id}/">← Previous: ${esc(prev.title)}</a>` : "<span></span>"}${next ? `<a href="/topics/${c.slug}/${next.id}/">What to study next: ${esc(next.title)} →</a>` : ""}</nav>
    ${plans.length ? related("Study plans that include this topic", plans.slice(0, 6).map((p) => [`study-plan/${c.slug}-${p.id}/`, p.name, p.sub || ""])) : ""}
    ${related(`More ${c.name}`, [[`topics/${c.slug}/`, `All ${c.name} topics`, ""], ...(c.hasQ ? [[`questions/${c.slug}/`, `${c.name} practice questions`, "with answers"]] : []), ...c.units.filter((x) => x.id !== u.id).slice(Math.max(0, i - 2), Math.max(0, i - 2) + 3).map((x) => [`topics/${c.slug}/${x.id}/`, x.title, plural(x.lessons.length, "lesson")])])}
    </div>`,
  };
}

function coursePage(c) {
  const lessons = c.units.reduce((s, u) => s + u.lessons.length, 0);
  return {
    path: `topics/${c.slug}/index.html`, title: `${c.name} Revision: Free Topics, Notes and Flashcards · Gradify`, description: `Free ${c.name} revision: ${plural(c.units.length, c.unitWord.toLowerCase())} and ${plural(lessons, "lesson")}, each with flashcards, practice questions and mind maps, from GCSE and A level to university.`,
    crumbs: [["Topics", "topics/"], [c.name, `topics/${c.slug}/`]], ogType: "website",
    schema: [{ "@type": "Course", name: c.name, description: `Free ${c.name} course on ${c.site}`, url: `https://getgradify.com${c.page}`, provider: { "@id": "https://getgradify.com/#org" }, isAccessibleForFree: true, hasCourseInstance: { "@type": "CourseInstance", courseMode: "online" }, offers: { "@type": "Offer", price: "0", priceCurrency: "GBP", category: "Free" } }],
    body: `<h1>${esc(c.name)} topics</h1><p class="answer">${plural(lessons, "free lesson")} in ${plural(c.units.length, c.unitWord.toLowerCase())}, each with flashcards, practice questions and mind maps. Pick a topic to see its lessons, key terms and sample flashcards.</p>
    <p><a class="btn btn-primary lg" href="${c.page}"><span>Open the ${esc(c.name)} course</span></a></p>
    <ul class="cards">${c.units.map((u) => `<li><a href="/topics/${c.slug}/${u.id}/">${esc(u.title)}</a><span>${esc(c.unitWord)} ${u.n} · ${plural(u.lessons.length, "lesson")}</span></li>`).join("")}</ul>
    ${c.paths.length ? `<h2>Study plans</h2><ul class="cards">${c.paths.map((p) => `<li><a href="/study-plan/${c.slug}-${p.id}/">${esc(p.name)}</a><span>${esc(p.sub || "")}</span></li>`).join("")}</ul>` : ""}`,
  };
}

// ---------- study plans ----------
const FAMILY = {
  science: ["biology", "chemistry", "physics", "ecology", "engineering", "medicine", "dentistry", "veterinary", "nursing", "pharmacy", "health", "sport"],
  maths: ["maths", "finance", "investing"],
  words: ["history", "literature", "law", "sociology", "psychology", "art", "music", "design", "teaching", "research"],
  language: ["japanese", "spanish"],
};
const TIPS = {
  science: ["Learn definitions word for word with flashcards: mark schemes reward exact terms.", "Draw every process (cycles, pathways, mechanisms) from memory on a blank page, then check it.", "Mix calculation and data questions from different topics in one session so you learn to spot which method each needs."],
  maths: ["Do problems, not notes: cover the worked example and solve it yourself before reading on.", "Interleave question types in each session; exams don't tell you which method to use.", "Keep an error log and redo every wrong question a week later."],
  words: ["Turn each topic into exam-style questions and plan answers from memory in five minutes.", "Make flashcards for the key evidence, cases, dates and quotations your arguments need.", "Write at least one timed answer a week and compare it with the mark scheme or model answers."],
  language: ["Review vocabulary daily with spaced repetition, in both directions.", "Say answers aloud: speaking is recall too.", "Learn grammar through example sentences you can recall, not rules alone."],
  general: ["Test yourself before you re-read: answer each lesson's flashcards from memory first.", "Space your reviews: come back after 1, 3 and 7 days.", "Apply it: use each lesson's practice questions or a real example from your own work."],
};
const familyOf = (slug) => Object.keys(FAMILY).find((k) => FAMILY[k].includes(slug)) || "general";

function planPage(c, p) {
  const byN = new Map(c.allUnits.map((u) => [u.n, u])), parsed = new Map(c.units.map((u) => [u.n, u]));
  const units = (p.units || []).map((n) => byN.get(n)).filter(Boolean).map((u) => {
    const pick = p.select?.[u.n];
    const lessons = pick ? u.lessons.filter((l) => pick.includes(l.module)) : u.lessons;
    return { ...u, count: lessons.length, live: parsed.has(u.n) };
  }).filter((u) => u.count);
  if (!units.length) return null;
  const thin = units.length < 3;
  const total = units.reduce((s, u) => s + u.count, 0), perWeek = 20, weeks = Math.max(1, Math.ceil(total / perWeek));
  // weeks: units in order, about 20 lessons a week (4 a study day, 5 days a week)
  const plan = []; let wk = 1, load = 0;
  for (const u of units) { let left = u.count; while (left > 0) { const take = Math.min(left, perWeek - load); (plan[wk - 1] ||= []).push(`${u.title}${take < u.count ? ` (${take} lessons)` : ""}`); left -= take; load += take; if (load >= perWeek) { wk++; load = 0; } } }
  const fam = familyOf(c.slug), tips = TIPS[fam];
  const title = `${p.name} Study Plan: ${weeks}-Week Timetable · Gradify`;
  const description = `A free ${weeks}-week ${p.name} study plan: ${plural(total, "lesson")} across ${plural(units.length, "topic")} in order, with flashcards and practice questions, and revision tips for ${c.name}.`;
  return {
    path: `study-plan/${c.slug}-${p.id}/index.html`, title, description, noindex: thin, updated: "2026-11-23", crumbs: [["Study plans", "study-plan/"], [p.name, `study-plan/${c.slug}-${p.id}/`]],
    schema: [{ "@type": "Course", name: p.name, description: p.sub || description, url: `https://getgradify.com${c.page}#/paths`, provider: { "@id": "https://getgradify.com/#org" }, isAccessibleForFree: true, hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: `P${weeks}W` }, offers: { "@type": "Offer", price: "0", priceCurrency: "GBP", category: "Free" } }],
    body: `<h1>${esc(p.name)} study plan</h1>
    <p class="answer">${esc(p.sub || `A path through ${c.name}.`)} At four lessons a study day, five days a week, the ${plural(total, "lesson")} in this plan take about ${plural(weeks, "week")}, with flashcards and practice questions in every lesson.</p>
    <p><a class="btn btn-primary lg" href="${c.page}#/paths"><span>Start this plan free</span> <span aria-hidden="true">→</span></a></p>
    <h2>Week by week</h2><div class="scroll"><table><thead><tr><th>Week</th><th>Topics</th></tr></thead><tbody>${plan.map((w, i) => `<tr><th>${i + 1}</th><td>${w.map(esc).join("<br>")}</td></tr>`).join("")}</tbody></table></div>
    <p>Each day, do the reviews that are due before any new lesson. Keep the last week before an exam for past papers: see <a href="/guides/active-recall-schedule-before-finals/">the 6-week schedule before finals</a>.</p>
    <h2>Topics in this plan</h2><ul>${units.map((u) => `<li>${u.live ? `<a href="/topics/${c.slug}/${u.id}/">${esc(u.title)}</a>` : esc(u.title)} · ${plural(u.count, "lesson")}</li>`).join("")}</ul>
    <h2>Three revision tips for ${esc(c.name)}</h2><ol>${tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ol>
    ${related("Other plans in " + c.name, c.paths.filter((x) => x.id !== p.id).slice(0, 6).map((x) => [`study-plan/${c.slug}-${x.id}/`, x.name, x.sub || ""]))}`,
  };
}

// ---------- practice questions and exam traps, one page per course ----------
const qItems = (c) => c.units.flatMap((u) => [1, 2, 3].flatMap((d) => u.lessons.flatMap((l) => l.mcq.filter((m) => m.d === d).map((m) => ({ ...m, l, u }))).slice(0, 1)));
const trapItems = (c) => c.units.flatMap((u) => u.lessons.flatMap((l) => l.pits.map((x) => ({ x, l, u }))).slice(0, 4));
function questionsPage(c) {
  const items = qItems(c), byUnit = new Map(); for (const it of items) { if (!byUnit.has(it.u)) byUnit.set(it.u, []); byUnit.get(it.u).push(it); }
  return {
    path: `questions/${c.slug}/index.html`, title: `${c.name} Practice Questions with Answers · Gradify`, ogType: "website",
    description: `${items.length} free ${c.name} practice questions with answers and explanations, from foundation recall to stretch, grouped by topic.`,
    crumbs: [["Practice questions", "questions/"], [c.name, `questions/${c.slug}/`]],
    schema: [{ "@type": "Quiz", name: `${c.name} practice questions`, about: c.name, hasPart: items.slice(0, 60).map((m) => ({ "@type": "Question", eduQuestionType: "Multiple choice", text: plain(m.q), acceptedAnswer: { "@type": "Answer", text: plain(m.right) } })) }],
    body: `<h1>${esc(c.name)} practice questions</h1><p class="answer">${items.length} questions from Gradify's free ${esc(c.name)} course, with the answer and why behind each reveal. Answer before you open it: that's what makes it stick.</p>
    ${[...byUnit.entries()].map(([u, list]) => `<h2>${esc(u.title)}</h2><ol class="qbank">${list.map((m) => `<li><b>${inline(m.q)}</b> <small>(${LEVEL[m.d][1]})</small><ul class="opts">${[m.right, ...m.wrong].sort((a, b) => a.localeCompare(b)).map((o) => `<li>${inline(o)}</li>`).join("")}</ul><details><summary>Reveal the answer and mark-scheme reasoning</summary><p><b>${inline(m.right)}.</b> ${inline(m.why || "")} <a href="/topics/${c.slug}/${u.id}/">Revise ${esc(u.title)} →</a></p></details></li>`).join("")}</ol>`).join("")}
    ${related("Keep going", [[`topics/${c.slug}/`, `${c.name} topics`, "flashcards, quizzes and mind maps"], ...(c.hasTraps ? [[`exam-traps/${c.slug}/`, `${c.name} exam traps`, "the mistakes that cost marks"]] : []), ["guides/command-words/", "Exam command words", "what describe, explain and evaluate want"]])}`,
  };
}
function trapsPage(c) {
  const items = trapItems(c), byUnit = new Map(); for (const it of items) { if (!byUnit.has(it.u)) byUnit.set(it.u, []); byUnit.get(it.u).push(it); }
  return {
    path: `exam-traps/${c.slug}/index.html`, title: `${c.name} Common Exam Mistakes and Traps · Gradify`, ogType: "website",
    description: `The ${items.length} most common ${c.name} mistakes, topic by topic, from Gradify's course notes: what students get wrong and the right idea instead.`,
    crumbs: [["Exam traps", "exam-traps/"], [c.name, `exam-traps/${c.slug}/`]],
    body: `<h1>${esc(c.name)}: common exam mistakes</h1><p class="answer">These are the mistakes our ${esc(c.name)} lessons warn about most, grouped by topic. Read each trap, then cover it and explain the right idea from memory.</p>
    ${[...byUnit.entries()].map(([u, list]) => `<h2>${esc(u.title)}</h2><ul class="pits">${list.map((t) => `<li>${inline(t.x)} <small><a href="${c.page}#/lesson/${t.l.id}">From “${esc(t.l.title)}”</a></small></li>`).join("")}</ul>`).join("")}
    ${related("Keep going", [[`topics/${c.slug}/`, `${c.name} topics`, ""], ...(c.hasQ ? [[`questions/${c.slug}/`, `${c.name} practice questions`, ""]] : []), ["guides/mcq-traps/", "Multiple-choice traps", "how distractors are built"], ["tools/mistake-log/", "Mistake log", "track your own errors"]])}`,
  };
}

export async function programmaticPages() {
  const all = await courses(), pages = [];
  for (const c of all) { c.hasQ = qItems(c).length >= 8; c.hasTraps = trapItems(c).length >= 6; }
  for (const c of all) {
    if (c.hasQ) pages.push(questionsPage(c));
    if (c.hasTraps) pages.push(trapsPage(c));
    pages.push(coursePage(c));
    for (const u of c.units) pages.push(unitPage(c, u));
    for (const p of c.paths) { const pg = planPage(c, p); if (pg) pages.push(pg); }
  }
  // drop plan links to plans that weren't made (a path with no lessons)
  const made = new Set(pages.map((p) => p.path.replace(/index\.html$/, "")));
  for (const pg of pages) pg.body = pg.body.replace(/<li><a href="\/(study-plan\/[^"]+)">[\s\S]*?<\/li>/g, (m, h) => (made.has(h) ? m : ""));
  const hub = (folder, name, has, line) => ({ path: `${folder}/index.html`, ogType: "website", crumbs: [[name, `${folder}/`]], title: `${name}: Free, by Subject · Gradify`,
    description: `Free ${name.toLowerCase()} for ${all.filter(has).length} subjects, from GCSE and A level to university, taken from Gradify's course notes.`,
    body: `<h1>${name}</h1><p class="lead">${line}</p><ul class="cards">${all.filter(has).map((c) => `<li><a href="/${folder}/${c.slug}/">${esc(c.name)}</a><span>${esc(c.site)}</span></li>`).join("")}</ul>` });
  pages.push(hub("questions", "Practice questions", (c) => c.hasQ, "Practice questions with answers and explanations, from foundation recall to stretch. Answer first, then reveal."));
  pages.push(hub("exam-traps", "Exam traps", (c) => c.hasTraps, "The mistakes that cost marks, topic by topic, with the right idea instead."));
  pages.push({ path: "topics/index.html", title: "Free Revision Topics in 30+ Subjects: Notes and Flashcards · Gradify", description: `Free revision topics from GCSE to university: ${plural(all.reduce((s, c) => s + c.units.length, 0), "topic")} across ${all.length} subjects, each with lessons, key terms and sample flashcards.`, crumbs: [["Topics", "topics/"]], ogType: "website",
    body: `<h1>Revision topics</h1><p class="lead">Every topic in Gradify's free courses, with its lessons, key terms and sample flashcards.</p><ul class="cards">${all.map((c) => `<li><a href="/topics/${c.slug}/">${esc(c.name)}</a><span>${plural(c.units.length, c.unitWord.toLowerCase())} · ${esc(c.site)}</span></li>`).join("")}</ul>` });
  pages.push({ path: "study-plan/index.html", title: "Free Study Plans: GCSE, A Level and University Revision Timetables · Gradify", description: "Free week-by-week study plans for GCSE, A level, university and professional courses, built from Gradify's lessons, with revision tips for each subject.", crumbs: [["Study plans", "study-plan/"]], ogType: "website",
    body: `<h1>Study plans</h1><p class="lead">Week-by-week plans through Gradify's free courses. Choose your subject and level.</p><nav class="chips no-print" aria-label="Jump to a subject">${all.filter((c) => c.paths.some((p) => made.has(`study-plan/${c.slug}-${p.id}/`))).map((c) => `<a class="chip" href="#plans-${c.slug}">${esc(c.name)}</a>`).join("")}</nav>${all.filter((c) => c.paths.some((p) => made.has(`study-plan/${c.slug}-${p.id}/`))).map((c) => `<h2 id="plans-${c.slug}">${esc(c.name)}</h2><ul class="cards">${c.paths.filter((p) => made.has(`study-plan/${c.slug}-${p.id}/`)).map((p) => `<li><a href="/study-plan/${c.slug}-${p.id}/">${esc(p.name)}</a><span>${esc(p.sub || "")}</span></li>`).join("")}</ul>`).join("")}` });
  return pages;
}
