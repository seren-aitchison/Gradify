// Pages generated from Gradify's own courses, so every unit of every live course has a crawlable page:
//   topics/<course>/<unit>/      a unit's lessons, key terms and five sample flashcards, straight from its notes
//   topics/<course>/             the course's units          topics/   every course
//   study-plan/<course>-<path>/  a week-by-week plan for each of a course's learning paths (GCSE, A level, year 1 …)
// The course pages themselves are an app (hash routes); these are static HTML that search engines and AI crawlers read
// without JavaScript, each linking into the live lesson.
import { readFile } from "node:fs/promises";
import { esc, related, toc, faq } from "./shell.mjs";
import { starterKit, stagesBlock, coreRule } from "./links.mjs";
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
      const lessons = u.lessons.map((l, i) => { const p = byTitle.get(l.title) || parsed[i]; return p ? { ...l, srcDates: p.sources.map((x) => x.date).filter((d) => /^\d{4}-\d{2}(-\d{2})?$/.test(d)), lead: p.lead, cards: p.cards || [], terms: p.terms || [], mcq: p.mcq || [], prereq: p.prereq || [], keys: p.blocks.filter((b) => b.t === "key").map((b) => b.x), pits: p.blocks.filter((b) => b.t === "pit").map((b) => b.x), eqs: p.blocks.filter((b) => b.t === "eq").flatMap((b) => b.rows) } : null; }).filter(Boolean);
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
  return `<figure class="mindmap"><svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="mm-t mm-d" xmlns="http://www.w3.org/2000/svg"><title id="mm-t">${esc(u.title)} mind map</title><desc id="mm-d">${esc(label)}</desc><style>.mm-l{stroke:#f055dd;stroke-width:2;opacity:.55}.mm-b rect{fill:#151515;stroke:#444}.mm-c{fill:#f055dd}text{font:600 13px system-ui,sans-serif;fill:#fff;text-anchor:middle}.mm-s{font-weight:400;font-size:11px;fill:#bbb}.mm-w{font-size:10px;fill:#888;text-anchor:end}</style><rect width="${W}" height="${H}" fill="#0b0b0b" rx="16"/>${nodes}<circle cx="${cx}" cy="${cy}" r="62" class="mm-c"/><text x="${cx}" y="${cy + 4}">${esc(cut(u.title, 20))}</text><text x="${W - 14}" y="${H - 12}" class="mm-w">getgradify.com</text></svg><figcaption>${esc(label)}. <button type="button" class="mini no-print" data-mm-png>Download as PNG</button></figcaption></figure>
  <details class="mm-outline"><summary>The mind map as an outline</summary><ul><li><b>${esc(u.title)}</b><ul>${[...groups.entries()].map(([name, ls]) => `<li>${esc(name)}${ls.length > 1 || ls[0] !== name ? `<ul>${ls.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}</li>`).join("")}</ul></li></ul></details>`;
}

function unitPage(c, u) {
  const cards = u.lessons.reduce((s, l) => s + l.cards.length, 0), sample = sampleCards(u);
  const terms = u.lessons.flatMap((l) => l.terms.slice(0, 1)).slice(0, 14);
  const modules = [...new Set(u.lessons.map((l) => l.module).filter(Boolean))];
  const i = c.units.indexOf(u), prev = c.units[i - 1], next = c.units[i + 1];
  const thin = u.lessons.length < MIN_LESSONS || unitWords(u) < MIN_WORDS;
  // the subject always stays in the title, so units with the same name in two courses never share one
  const title = [`${u.title}: ${c.name} Revision and Flashcards · Gradify`, `${u.title}: ${c.name} Revision · Gradify`, `${u.title}: ${c.name} Revision`, `${u.title} · ${c.name}`].find((t) => t.length <= 60) || `${u.title.slice(0, 56 - c.name.length).replace(/\s+\S*$/, "")}… · ${c.name}`;
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
  // "People also ask": the unit's own flashcards that are already phrased as questions, one per lesson, up to four
  const asked = [...new Map(u.lessons.flatMap((l) => l.cards.filter(([q, an]) => /\?$/.test(plain(q)) && plain(q).length < 120 && plain(an).length > 20).slice(0, 1).map(([q, an]) => [plain(q), plain(an)]))).entries()].filter(([q]) => !sample.some((x) => plain(x.q) === q)).slice(0, 4);
  // topped up from the unit's check questions (the right answer and why), if the flashcards give fewer than four
  for (const m of mcqAll) { if (asked.length >= 4) break; const q = plain(m.q); if (/\?$/.test(q) && q.length < 140 && !asked.some(([x]) => x === q) && !mcq.includes(m)) asked.push([q, `${plain(m.right).replace(/\.?$/, ".")}${m.why ? ` ${plain(m.why)}` : ""}`]); }
  const paa = asked.length >= 2 ? faq(asked, `${u.title}: questions students ask`) : { html: "", schema: null };
  return {
    path: `topics/${c.slug}/${u.id}/index.html`, title, description, noindex: thin,
    // freshness from the content itself: the newest date a source in this unit was checked (no date if none has one)
    ...(() => { const d = u.lessons.flatMap((l) => l.srcDates).filter((x) => x <= "2026-11-23").sort().at(-1); return d ? { updated: d, updatedLabel: "Sources last checked" } : {}; })(), crumbs: [["Topics", "topics/"], [c.name, `topics/${c.slug}/`], [u.title, `topics/${c.slug}/${u.id}/`]],
    head: `<script type="application/json" id="topic-data">${jsonLd(data)}</script>`,
    schema: [{ "@type": "Course", name: `${c.name}: ${u.title}`, description, url: `https://getgradify.com${c.page}#/learn/${u.id}`, provider: { "@id": "https://getgradify.com/#org" }, isAccessibleForFree: true, inLanguage: "en-GB", hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: `PT${Math.max(1, Math.round(u.lessons.length * 0.25))}H` }, offers: { "@type": "Offer", price: "0", priceCurrency: "GBP", category: "Free" } },
      ...(terms.length ? [{ "@type": "DefinedTermSet", name: `${u.title} key terms`, hasDefinedTerm: terms.map(([t, d]) => ({ "@type": "DefinedTerm", name: plain(t), description: plain(d) })) }] : []),
      ...(paa.schema ? [paa.schema] : []),
      ...(mcq.length ? [{ "@type": "Quiz", name: `${u.title} quick quiz`, about: u.title, educationalLevel: c.name, hasPart: mcq.map((m) => ({ "@type": "Question", eduQuestionType: "Multiple choice", text: plain(m.q), acceptedAnswer: { "@type": "Answer", text: plain(m.right) } })) }] : [])],
    body: `<div data-topic>
    <h1>${esc(u.title)}</h1>
    <p class="answer">${esc(c.unitWord)} ${u.n} of ${esc(c.site)}'s free ${esc(c.name)} course: ${plural(u.lessons.length, "lesson")}${modules.length ? ` covering ${esc(modules.join("; "))}` : ""}, with ${cards ? plural(cards, "flashcard") : "flashcards"}, practice questions and five mind maps for every lesson.</p>
    ${eqs[0] ? coreRule(`${esc(plain(eqs[0][0]))}${eqs[0][1] ? ` (${esc(plain(eqs[0][1]))})` : ""}`, "Key formula") : keys[0] ? coreRule(inline(keys[0]), "Key idea") : ""}
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
    ${terms.length ? `<h2>Key terms</h2><dl>${terms.map(([t, d]) => { const e = c.terms?.get(termKey(t)); return `<dt>${e?.indexed ? `<a href="/terms/${e.slug}/">${inline(t)}</a>` : inline(t)}</dt><dd>${inline(d)}</dd>`; }).join("")}</dl>` : ""}
    ${u.cross?.length ? `<h2>The same ideas in other subjects</h2><ul class="cards">${u.cross.map((r) => `<li><a href="/topics/${r.c.slug}/${r.u.id}/">${esc(r.u.title)}</a><span>${esc(r.c.name)} · shares ${r.terms.slice(0, 3).map((k) => esc(c.terms?.get(k)?.name || k)).join(", ")}</span></li>`).join("")}</ul>` : ""}
    ${paa.html}
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
    ${starterKit(familyOf(c.slug), c.name)}
    <ul class="cards">${c.units.map((u) => `<li><a href="/topics/${c.slug}/${u.id}/">${esc(u.title)}</a><span>${esc(c.unitWord)} ${u.n} · ${plural(u.lessons.length, "lesson")}</span></li>`).join("")}</ul>
    ${c.paths.length ? `<h2>Study plans</h2><ul class="cards">${c.paths.map((p) => `<li><a href="/study-plan/${c.slug}-${p.id}/">${esc(p.name)}</a><span>${esc(p.sub || "")}</span></li>`).join("")}</ul>` : ""}
    ${stagesBlock()}`,
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
  const named = p.name.toLowerCase().includes(c.name.toLowerCase().split(" ")[0]) ? p.name : `${c.name}: ${p.name}`;
  const title = [`${named} Study Plan: ${weeks}-Week Timetable · Gradify`, `${named} Study Plan (${weeks} Weeks)`, `${named} Study Plan`, named].find((t) => t.length <= 60) || `${named.slice(0, 57)}…`;
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

// ---------- key terms across every course: term pages (getgradify.com/terms/…) and "same topic elsewhere" links ----------
export const termKey = (t) => plain(t).replace(/\([^)]*\)/g, "").replace(/\s+/g, " ").trim().toLowerCase();
export const termSlug = (k) => k.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/[\s-]+/g, "-").slice(0, 60).replace(/-$/, "");
/** every key term (T: lines) → where it's used; a page for terms in 3+ lessons, indexed only with enough substance */
export function termIndex(all) {
  const idx = new Map();
  for (const c of all) for (const u of c.units) for (const l of u.lessons) for (const [t, d] of l.terms) {
    const k = termKey(t); if (k.length < 3) continue;
    if (!idx.has(k)) idx.set(k, { key: k, name: plain(t).replace(/\s*\([^)]*\)\s*$/, "").trim(), uses: [] });
    idx.get(k).uses.push({ c, u, l, d: plain(d) });
  }
  const taken = new Set(), out = new Map();
  for (const e of [...idx.values()].sort((a, b) => b.uses.length - a.uses.length)) {
    if (e.uses.length < 3) continue;
    const slug = termSlug(e.key); if (slug.length < 3 || taken.has(slug)) continue; taken.add(slug);
    const courses = [...new Set(e.uses.map((x) => x.c.slug))], defs = [...new Set(e.uses.map((x) => x.d))];
    const words = defs.join(" ").split(/\s+/).length;
    out.set(e.key, { ...e, slug, courses, defs, indexed: words >= 40 && (courses.length >= 2 || e.uses.length >= 4) });
  }
  return out;
}
const GENERIC = 6; // a term in more than this many courses ("context", "interpretation") says nothing about topic overlap
/** for each unit, units in other courses that share at least two specific key terms */
function crossLinks(all) {
  const by = new Map();
  for (const c of all) for (const u of c.units) for (const k of new Set(u.lessons.flatMap((l) => l.terms.map(([t]) => termKey(t))))) { if (!by.has(k)) by.set(k, []); by.get(k).push({ c, u }); }
  for (const [k, v] of by) if (new Set(v.map((x) => x.c.slug)).size > GENERIC) by.delete(k);
  for (const c of all) for (const u of c.units) {
    const score = new Map();
    for (const k of new Set(u.lessons.flatMap((l) => l.terms.map(([t]) => termKey(t))))) for (const o of by.get(k) || []) if (o.c !== c) { const id = `${o.c.slug}/${o.u.id}`; const r = score.get(id) || { ...o, n: 0, terms: [] }; r.n++; r.terms.push(k); score.set(id, r); }
    u.cross = [...score.values()].filter((r) => r.n >= 2).sort((a, b) => b.n - a.n).slice(0, 4);
  }
}
function termPage(e, terms) {
  const byCourse = new Map(); for (const x of e.uses) { if (!byCourse.has(x.c)) byCourse.set(x.c, []); byCourse.get(x.c).push(x); }
  const first = e.uses[0], name = e.name, lower = /^[A-Z][a-z]+(?: [a-z]+)*$/.test(name) ? name.toLowerCase() : name;
  const card = (x) => x.l.cards.find(([q]) => new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(plain(q)));
  const near = [...new Set(e.uses.flatMap((x) => x.u.lessons.flatMap((l) => l.terms.map(([t]) => termKey(t)))))].filter((k) => k !== e.key && terms.get(k)?.indexed).slice(0, 10);
  const courseNames = [...byCourse.keys()].map((c) => c.name);
  return {
    path: `terms/${e.slug}/index.html`, noindex: !e.indexed, updated: "2026-11-23",
    title: `What Is ${lower === name ? name : name}? Meaning and Examples · Gradify`,
    description: `${name}: ${first.d.replace(/\.?$/, ".")} ${courseNames.length > 1 ? `How it's used in ${courseNames.slice(0, 3).join(", ")}.` : "What it means, and where to revise it."}`,
    crumbs: [["Key terms", "terms/"], [name, `terms/${e.slug}/`]],
    schema: [{ "@type": "DefinedTerm", name, description: first.d, url: `https://getgradify.com/terms/${e.slug}/`, inDefinedTermSet: { "@type": "DefinedTermSet", name: "Gradify key terms", url: "https://getgradify.com/terms/" } }],
    body: `<h1>What is ${esc(lower)}?</h1><p class="answer"><b>${esc(name)}</b>: ${esc(first.d)}</p>
    <p>It comes up in ${e.uses.length} Gradify lessons${courseNames.length > 1 ? ` across ${courseNames.length} subjects (${esc(courseNames.join(", "))}), and the meaning shifts a little with the subject` : ""}.</p>
    ${[...byCourse.entries()].slice(0, 6).map(([c, xs]) => { const cd = xs.map(card).find(Boolean); return `<h2>${esc(name)} in ${esc(c.name)}</h2><p>${esc(xs[0].d)}</p><ul>${[...new Map(xs.map((x) => [x.u.id, x])).values()].slice(0, 4).map((x) => `<li><a href="/topics/${c.slug}/${x.u.id}/">${esc(x.u.title)}</a>: ${esc(x.l.title)}</li>`).join("")}</ul>${cd ? `<details class="flash"><summary>${inline(cd[0])}</summary><p>${inline(cd[1])}</p></details>` : ""}`; }).join("")}
    ${near.length ? `<h2>Related terms</h2><ul class="cards">${near.map((k) => `<li><a href="/terms/${terms.get(k).slug}/">${esc(terms.get(k).name)}</a></li>`).join("")}</ul>` : ""}
    <h2>How to remember it</h2><p>Write the definition from memory, then check it word for word: mark schemes reward the exact key terms. Turn it into a flashcard and review it after 1, 3 and 7 days (<a href="/glossary/spaced-repetition/">spaced repetition</a>), or <a href="/pdf-to-flashcards/">make cards from your own notes</a>.</p>`,
  };
}
function termsHub(terms) {
  const list = [...terms.values()].filter((e) => e.indexed).sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
  const letters = [...new Set(list.map((e) => e.name[0].toUpperCase()).filter((x) => /[A-Z]/.test(x)))];
  return { path: "terms/index.html", ogType: "website", crumbs: [["Key terms", "terms/"]], title: "Key Terms A to Z: Definitions Across 30+ Subjects · Gradify",
    description: `${list.length} key terms from Gradify's free courses, each defined in plain English, with how the meaning changes between subjects and where to revise it.`,
    body: `<h1>Key terms A to Z</h1><p class="answer">${list.length} key terms that come up again and again in Gradify's courses, each defined in plain English, with how the meaning changes between subjects and the topics to revise it in. For study techniques (active recall, spaced repetition), see the <a href="/glossary/">study glossary</a>.</p>
    <nav class="chips no-print" aria-label="Jump to a letter">${letters.map((x) => `<a class="chip" href="#t-${x}">${x}</a>`).join("")}</nav>
    ${letters.map((x) => `<h2 id="t-${x}">${x}</h2><ul class="term-list">${list.filter((e) => e.name[0].toUpperCase() === x).map((e) => `<li><a href="/terms/${e.slug}/">${esc(e.name)}</a></li>`).join("")}</ul>`).join("")}` };
}

// ---------- research: what 30+ courses' notes contain, counted (getgradify.com/research/) ----------
function researchPage(all, terms) {
  const rows = all.map((c) => { const L = c.units.flatMap((u) => u.lessons); return { c, lessons: L.length, cards: L.reduce((n, l) => n + l.cards.length, 0), qs: L.reduce((n, l) => n + l.mcq.length, 0), pits: L.reduce((n, l) => n + l.pits.length, 0), terms: L.reduce((n, l) => n + l.terms.length, 0) }; }).filter((r) => r.lessons >= 20);
  for (const r of rows) r.pitRate = r.pits / r.lessons;
  const tot = (k) => rows.reduce((n, r) => n + r[k], 0), fmt = (n) => n.toLocaleString("en-GB"), dp = (n) => (Math.round(n * 100) / 100).toFixed(2);
  const byPit = [...rows].sort((a, b) => b.pitRate - a.pitRate), max = byPit[0].pitRate;
  const shared = [...terms.values()].sort((a, b) => b.courses.length - a.courses.length || b.uses.length - a.uses.length).slice(0, 12);
  const bar = (r) => `<li><span class="rb-l"><a href="/exam-traps/${r.c.slug}/">${esc(r.c.name)}</a></span><span class="rb"><i style="width:${Math.round((r.pitRate / max) * 100)}%"></i></span><span class="rb-n">${dp(r.pitRate)}</span></li>`;
  return {
    path: "research/index.html", updated: "2026-11-23", crumbs: [["Research", "research/"]],
    title: "Where Students Slip Up: Common Mistakes in 30+ Subjects · Gradify",
    description: `We counted the common-mistake warnings in ${fmt(tot("lessons"))} lessons across ${rows.length} subjects. The subjects with the most traps per lesson, and the terms shared across subjects.`,
    schema: [{ "@type": "Dataset", name: "Common-mistake warnings and key terms in Gradify's courses", description: "Counts of lessons, flashcards, check questions, common-mistake warnings and key terms per subject, from Gradify's course notes.", creator: { "@id": "https://getgradify.com/#org" }, isAccessibleForFree: true, license: "https://creativecommons.org/licenses/by/4.0/", dateModified: "2026-11-23", variableMeasured: ["lessons", "flashcards", "check questions", "common-mistake warnings", "key terms"] }],
    body: `<h1>Where students slip up: common mistakes across ${rows.length} subjects</h1>
    <p class="answer">Gradify's lessons flag the mistakes students commonly make with a "common mistake" warning. We counted them: ${fmt(tot("pits"))} warnings in ${fmt(tot("lessons"))} lessons across ${rows.length} subjects. ${esc(byPit[0].c.name)} has the most per lesson (${dp(byPit[0].pitRate)}), then ${esc(byPit[1].c.name)} and ${esc(byPit[2].c.name)}.</p>
    <p class="note"><b>What this measures:</b> the warnings our course writers put in each lesson, not the mistakes real students made in exams. A high number means a subject has many well-known traps worth checking before an exam. Counted from the course notes on 23 November 2026; free to cite with a link to this page (CC BY 4.0).</p>
    <h2>Common-mistake warnings per lesson, by subject</h2><ul class="rbars">${byPit.map(bar).join("")}</ul>
    <h2>The terms that cross the most subjects</h2><p>The same word can mean different things in different subjects, and that's where students mix them up. These key terms appear in the most subjects:</p>
    <div class="scroll"><table><thead><tr><th>Term</th><th>Subjects</th><th>Lessons</th></tr></thead><tbody>${shared.map((e) => `<tr><th scope="row">${e.indexed ? `<a href="/terms/${e.slug}/">${esc(e.name)}</a>` : esc(e.name)}</th><td>${e.courses.length}</td><td>${e.uses.length}</td></tr>`).join("")}</tbody></table></div>
    <h2>The full table</h2><div class="scroll"><table><thead><tr><th>Subject</th><th>Lessons</th><th>Flashcards</th><th>Check questions</th><th>Mistake warnings</th><th>Key terms</th></tr></thead><tbody>${[...rows].sort((a, b) => a.c.name.localeCompare(b.c.name)).map((r) => `<tr><th scope="row"><a href="/topics/${r.c.slug}/">${esc(r.c.name)}</a></th><td>${fmt(r.lessons)}</td><td>${fmt(r.cards)}</td><td>${fmt(r.qs)}</td><td>${fmt(r.pits)}</td><td>${fmt(r.terms)}</td></tr>`).join("")}</tbody><tfoot><tr><th>All</th><td>${fmt(tot("lessons"))}</td><td>${fmt(tot("cards"))}</td><td>${fmt(tot("qs"))}</td><td>${fmt(tot("pits"))}</td><td>${fmt(tot("terms"))}</td></tr></tfoot></table></div>
    <h2>How we counted</h2><p>Each lesson's notes mark common mistakes with their own tag, flashcards and check questions with theirs, and key terms with a term and definition. We counted every tag in every written lesson of each live course with at least 20 lessons. Flashcards here are the cards written into the notes; the app makes more from your own notes.</p>
    ${related("Use it", [["exam-traps/", "Exam traps by subject", "read the warnings themselves"], ["terms/", "Key terms A to Z", ""], ["guides/mcq-traps/", "Multiple-choice traps", ""]])}`,
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
  const terms = termIndex(all); for (const c of all) c.terms = terms;
  crossLinks(all);
  for (const e of terms.values()) pages.push(termPage(e, terms));
  pages.push(termsHub(terms));
  pages.push(researchPage(all, terms));
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
