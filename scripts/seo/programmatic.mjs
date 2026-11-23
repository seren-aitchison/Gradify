// Pages generated from Gradify's own courses, so every unit of every live course has a crawlable page:
//   topics/<course>/<unit>/      a unit's lessons, key terms and five sample flashcards, straight from its notes
//   topics/<course>/             the course's units          topics/   every course
//   study-plan/<course>-<path>/  a week-by-week plan for each of a course's learning paths (GCSE, A level, year 1 …)
// The course pages themselves are an app (hash routes); these are static HTML that search engines and AI crawlers read
// without JavaScript, each linking into the live lesson.
import { readFile } from "node:fs/promises";
import { esc, related } from "./shell.mjs";
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
      const lessons = u.lessons.map((l, i) => { const p = byTitle.get(l.title) || parsed[i]; return p ? { ...l, lead: p.lead, cards: p.cards || [], terms: p.terms || [] } : null; }).filter(Boolean);
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

function unitPage(c, u) {
  const cards = u.lessons.reduce((s, l) => s + l.cards.length, 0), sample = sampleCards(u);
  const terms = u.lessons.flatMap((l) => l.terms.slice(0, 1)).slice(0, 14);
  const modules = [...new Set(u.lessons.map((l) => l.module).filter(Boolean))];
  const title = `${u.title}: ${c.name} Revision Notes, Key Terms and Flashcards · Gradify`;
  const description = `Free ${c.name} revision for ${u.title}: ${plural(u.lessons.length, "lesson")}${modules.length ? ` on ${modules.slice(0, 3).join("; ")}` : ""}, key terms and ${cards || "practice"} flashcards. Try five sample cards now.`;
  const at = (l) => `${c.page}#/lesson/${l.id}`;
  return {
    path: `topics/${c.slug}/${u.id}/index.html`, title, description: description.slice(0, 300), crumbs: [["Topics", "topics/"], [c.name, `topics/${c.slug}/`], [u.title, `topics/${c.slug}/${u.id}/`]],
    schema: [{ "@type": "Course", name: `${c.name}: ${u.title}`, description, url: `https://getgradify.com${c.page}#/learn/${u.id}`, provider: { "@id": "https://getgradify.com/#org" }, isAccessibleForFree: true, inLanguage: "en-GB", hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: `PT${Math.max(1, Math.round(u.lessons.length * 0.25))}H` }, offers: { "@type": "Offer", price: "0", priceCurrency: "GBP", category: "Free" } },
      ...(terms.length ? [{ "@type": "DefinedTermSet", name: `${u.title} key terms`, hasDefinedTerm: terms.map(([t, d]) => ({ "@type": "DefinedTerm", name: plain(t), description: plain(d) })) }] : [])],
    body: `<h1>${esc(u.title)}</h1>
    <p class="answer">${esc(c.unitWord)} ${u.n} of ${esc(c.site)}'s free ${esc(c.name)} course: ${plural(u.lessons.length, "lesson")}${modules.length ? ` covering ${esc(modules.join("; "))}` : ""}, with ${cards ? plural(cards, "flashcard") : "flashcards"}, practice questions and five mind maps for every lesson.</p>
    <p><a class="btn btn-primary lg" href="${c.page}#/learn/${u.id}"><span>Practise all ${cards || ""} cards free</span> <span aria-hidden="true">→</span></a></p>
    ${sample.length ? `<h2>Five sample flashcards</h2><p>Answer each from memory, then open it to check.</p>${sample.map((s) => `<details class="flash"><summary>${inline(s.q)}</summary><p>${inline(s.a)} <a href="${at(s.lesson)}">From “${esc(s.lesson.title)}” →</a></p></details>`).join("")}` : ""}
    <h2>Lessons in this ${esc(c.unitWord.toLowerCase())}</h2>
    <ol>${u.lessons.map((l) => `<li><a href="${at(l)}"><b>${esc(l.title)}</b></a>${l.lead ? `<br>${esc(firstSentence(l.lead))}` : ""}</li>`).join("")}</ol>
    ${terms.length ? `<h2>Key terms</h2><dl>${terms.map(([t, d]) => `<dt>${inline(t)}</dt><dd>${inline(d)}</dd>`).join("")}</dl>` : ""}
    <h2>How to revise ${esc(u.title)}</h2><p>Test yourself before you re-read: answer the flashcards from memory, review the ones you miss after 1, 3 and 7 days, and finish with the practice questions. <a href="/guides/active-recall/">How active recall works</a>. Got your own lecture notes on this? <a href="/pdf-to-flashcards/">Turn them into flashcards</a> checked against what you wrote.</p>
    ${related(`More ${c.name}`, c.units.filter((x) => x.id !== u.id).slice(Math.max(0, c.units.indexOf(u) - 2), Math.max(0, c.units.indexOf(u) - 2) + 4).map((x) => [`topics/${c.slug}/${x.id}/`, x.title, plural(x.lessons.length, "lesson")]))}`,
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
  const total = units.reduce((s, u) => s + u.count, 0), perWeek = 20, weeks = Math.max(1, Math.ceil(total / perWeek));
  // weeks: units in order, about 20 lessons a week (4 a study day, 5 days a week)
  const plan = []; let wk = 1, load = 0;
  for (const u of units) { let left = u.count; while (left > 0) { const take = Math.min(left, perWeek - load); (plan[wk - 1] ||= []).push(`${u.title}${take < u.count ? ` (${take} lessons)` : ""}`); left -= take; load += take; if (load >= perWeek) { wk++; load = 0; } } }
  const fam = familyOf(c.slug), tips = TIPS[fam];
  const title = `${p.name} Study Plan: ${weeks}-Week Revision Timetable · Free · Gradify`;
  const description = `A free ${weeks}-week ${p.name} study plan: ${plural(total, "lesson")} across ${plural(units.length, "topic")} in order, with flashcards and practice questions, and revision tips for ${c.name}.`;
  return {
    path: `study-plan/${c.slug}-${p.id}/index.html`, title, description, updated: "2026-11-23", crumbs: [["Study plans", "study-plan/"], [p.name, `study-plan/${c.slug}-${p.id}/`]],
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

export async function programmaticPages() {
  const all = await courses(), pages = [];
  for (const c of all) {
    pages.push(coursePage(c));
    for (const u of c.units) pages.push(unitPage(c, u));
    for (const p of c.paths) { const pg = planPage(c, p); if (pg) pages.push(pg); }
  }
  // drop plan links to plans that weren't made (a path with no lessons)
  const made = new Set(pages.map((p) => p.path.replace(/index\.html$/, "")));
  for (const pg of pages) pg.body = pg.body.replace(/<li><a href="\/(study-plan\/[^"]+)">[\s\S]*?<\/li>/g, (m, h) => (made.has(h) ? m : ""));
  pages.push({ path: "topics/index.html", title: "Free Revision Topics in 30+ Subjects: Notes and Flashcards · Gradify", description: `Free revision topics from GCSE to university: ${plural(all.reduce((s, c) => s + c.units.length, 0), "topic")} across ${all.length} subjects, each with lessons, key terms and sample flashcards.`, crumbs: [["Topics", "topics/"]], ogType: "website",
    body: `<h1>Revision topics</h1><p class="lead">Every topic in Gradify's free courses, with its lessons, key terms and sample flashcards.</p><ul class="cards">${all.map((c) => `<li><a href="/topics/${c.slug}/">${esc(c.name)}</a><span>${plural(c.units.length, c.unitWord.toLowerCase())} · ${esc(c.site)}</span></li>`).join("")}</ul>` });
  pages.push({ path: "study-plan/index.html", title: "Free Study Plans: GCSE, A Level and University Revision Timetables · Gradify", description: "Free week-by-week study plans for GCSE, A level, university and professional courses, built from Gradify's lessons, with revision tips for each subject.", crumbs: [["Study plans", "study-plan/"]], ogType: "website",
    body: `<h1>Study plans</h1><p class="lead">Week-by-week plans through Gradify's free courses. Choose your subject and level.</p>${all.filter((c) => c.paths.some((p) => made.has(`study-plan/${c.slug}-${p.id}/`))).map((c) => `<h2>${esc(c.name)}</h2><ul class="cards">${c.paths.filter((p) => made.has(`study-plan/${c.slug}-${p.id}/`)).map((p) => `<li><a href="/study-plan/${c.slug}-${p.id}/">${esc(p.name)}</a><span>${esc(p.sub || "")}</span></li>`).join("")}</ul>`).join("")}` });
  return pages;
}
