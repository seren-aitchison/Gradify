// Search-result wording: the titles and descriptions students see in Google, built from what each page really has.
// The words come from how students search and how the pages that rank for those searches are titled (sampled
// 2026-11-25, docs/SEO.md "Search wording"): "<topic> revision notes", "<subject> flashcards", "questions with
// answers", "worked examples", "diagram", and for law "<case> case summary" and "key cases".
// Two honesty rules, both tested (tests/seo.test.mjs):
//   - a qualification (GCSE, A level, SQE, MLA…) is named only when kit/curriculum/coverage.js says the course serves it;
//   - a content word (diagram, key cases, worked example, flashcards, questions) is used only when the page has one.
import { COURSES as COVERAGE } from "../../kit/curriculum/coverage.js";
import { SITES } from "../../kit/core/site.js";

// the short names students search with
const SHORT = { gcse: "GCSE", "a-level": "A Level", nat5: "National 5", higher: "Higher", degree: "Degree", apprenticeship: "Apprenticeship", sqe: "SQE", nmc: "NMC", gphc: "GPhC", mla: "MLA" };
const CLAIMED = new Set(["verified", "mapped", "aligned"]);

/** the qualifications coverage.js says a course serves, as searched: ["SQE", "Degree"] */
export function quals(slug) {
  return (COVERAGE[slug]?.serves || []).filter((x) => x.q && SHORT[x.q] && CLAIMED.has(x.status)).map((x) => SHORT[x.q]);
}
/** "SQE and law degrees", "GCSE, A Level and degree maths": the qualification phrase for a course, or "" */
export function qualPhrase(slug, subject) {
  const q = quals(slug); if (!q.length) return "";
  const parts = q.map((x) => (x === "Degree" ? `${subject.toLowerCase()} degrees` : x));
  return parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}`;
}
/** who the site is for, as a phrase that fits after "for": "law students and trainee lawyers" */
export function audience(siteName) {
  const who = SITES.find((s) => s.n === siteName)?.who || "";
  return who ? who.charAt(0).toLowerCase() + who.slice(1) : "";
}
/** the first title in the list that fits a search result (60 characters), else the shortest */
export const firstFit = (list, max = 60) => list.find((t) => t.length <= max) || [...list].sort((a, b) => a.length - b.length)[0];
const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;
/** "a diagram, key terms, 6 flashcards and 4 questions with answers": only what's there */
export function contents({ diagrams = 0, terms = 0, cards = 0, questions = 0, cases = 0, examples = 0 }) {
  const out = [];
  if (diagrams) out.push(diagrams === 1 ? "a labelled diagram" : `${diagrams} labelled diagrams`);
  if (examples) out.push(examples === 1 ? "a worked example" : `${examples} worked examples`);
  if (cases) out.push(cases === 1 ? "a key case" : `${cases} key cases`);
  if (terms) out.push("key terms");
  if (cards) out.push(plural(cards, "flashcard"));
  if (questions) out.push(`${plural(questions, "question")} with answers`);
  return out.length < 2 ? out.join("") : `${out.slice(0, -1).join(", ")} and ${out.at(-1)}`;
}
/** a title in title case for a lesson heading that may be in sentence case ("Animal cells" → "Animal Cells") */
const SMALL = new Set(["a", "an", "and", "as", "at", "by", "for", "in", "of", "on", "or", "the", "to", "v", "vs", "with"]);
export const titleCase = (s) => String(s).split(" ").map((w, i) => (i && SMALL.has(w.toLowerCase()) ? w.toLowerCase() : /^[a-z]/.test(w) ? w[0].toUpperCase() + w.slice(1) : w)).join(" ");
/** a case name without its citation: "Fisher v Bell [1961] 1 QB 394" → "Fisher v Bell" */
export const caseName = (s) => String(s).replace(/\s*[[(]\d{4}[\])].*$/, "").trim();
/** the qualifications as a short title phrase: "GCSE, A Level and Degree", or "" */
export function qualTitle(slug) {
  const q = quals(slug); return q.length < 2 ? q.join("") : `${q.slice(0, -1).join(", ")} and ${q.at(-1)}`;
}
