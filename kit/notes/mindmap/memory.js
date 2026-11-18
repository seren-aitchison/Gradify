// The spidermap, synced with the learner's own Gradify Intelligence: for each term on the map, what their memory
// of it looks like right now, from their real flashcards and answers (this device, or their account when signed in).
// Same sources and maths as the rest of Gradify Intelligence: recall from the spaced-repetition state of each card
// (kit/learning/mastery.js), and when it fades below 70% (kit/intel/memory.js forgetIn). Nothing is guessed: a term
// with no cards says "not tracked yet".
// memoryFor is pure, so Node tests it; loadLearnerCards reads the learner's store in a browser.
import { recallProbability } from "../../learning/mastery.js";
import { forgetIn } from "../../intel/memory.js";

const DAY = 864e5;
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// a card is about a term when its question or answer names it (or its abbreviation) as whole words
export function cardsAbout(term, ab, cards) {
  const name = new RegExp(`\\b${escRe(term.toLowerCase())}(s|es)?\\b`), abbr = ab ? new RegExp(`\\b${escRe(ab)}\\b`) : null;
  return cards.filter((c) => !c.suspended && (name.test(`${c.front} ${c.back}`.toLowerCase()) || (abbr && abbr.test(`${c.front}`))));
}

/**
 * @param {object} map from buildMap
 * @param {{ cards?: object[], reviews?: object[], now?: number }} o the learner's cards and answers
 * @returns {{ terms: Map<string, object>, tracked: number, answers: number, due: number, synced: boolean }}
 * @param {string|null} [o.examDate] YYYY-MM-DD from the learner's profile: recall is forecast for that day too
 *   per term: { state: "new"|"strong"|"learning"|"fading"|"shaky", recall, atExam, fadesIn, nextReview, due, answers, wrong, sureWrong, cards, history }
 */
export function memoryFor(map, { cards = [], reviews = [], now = Date.now(), examDate = null } = {}) {
  // the learner's exam (from their profile): recall is also forecast for that morning
  const examAt = examDate ? Date.parse(`${examDate}T09:00:00`) : null, exam = examAt && examAt > now ? examAt : null;
  const byCard = new Map();
  for (const r of reviews) (byCard.get(r.card_id) || byCard.set(r.card_id, []).get(r.card_id)).push(r);
  const terms = new Map();
  let answers = 0, due = 0;
  for (const n of map.nodes) {
    if (n.type !== "term" || !n.fact) continue;
    const cs = cardsAbout(n.fact.term, n.fact.ab, cards);
    if (!cs.length) continue;
    const seen = cs.filter((c) => c.reps > 0);
    const rs = cs.flatMap((c) => byCard.get(c.id) || []).sort((a, b) => Date.parse(b.reviewed_at) - Date.parse(a.reviewed_at));
    const recent = rs.filter((r) => now - Date.parse(r.reviewed_at) < 30 * DAY);
    const wrong = recent.filter((r) => r.rating === "again").length;
    const sureWrong = recent.filter((r) => r.rating === "again" && r.confidence === "sure").length;
    const ps = seen.map((c) => recallProbability(c, now)).filter((p) => p != null);
    const recall = ps.length ? ps.reduce((a, p) => a + p, 0) / ps.length : null;
    const fadesIn = seen.length ? forgetIn(seen, now) : null;
    const ex = exam ? seen.map((c) => recallProbability(c, exam)).filter((p) => p != null) : [];
    const atExam = ex.length ? ex.reduce((a, p) => a + p, 0) / ex.length : null;
    const nextReview = seen.length ? Math.min(...seen.map((c) => Date.parse(c.due_at))) : null;
    const isDue = cs.some((c) => Date.parse(c.due_at) <= now);
    const state = !seen.length ? "new" : sureWrong || wrong >= 2 ? "shaky" : recall != null && recall < 0.7 ? "fading" : recall >= 0.85 && fadesIn > 7 ? "strong" : "learning";
    answers += rs.length; if (isDue) due++;
    terms.set(n.id, { state, recall, atExam, fadesIn, nextReview, due: isDue, answers: rs.length, wrong, sureWrong, cards: cs.length,
      history: rs.slice(0, 8).map((r) => ({ at: r.reviewed_at, rating: r.rating, confidence: r.confidence || null })) });
  }
  return { terms, tracked: terms.size, answers, due, synced: terms.size > 0, examAt: exam };
}

export const STATE = {
  new:      { label: "Not reviewed yet", colour: "8b93ad" },
  learning: { label: "Learning",          colour: "3c78d8" },
  strong:   { label: "Strong",            colour: "1fae8c" },
  fading:   { label: "Fading",            colour: "e69138" },
  shaky:    { label: "Shaky",             colour: "ff5a4d" },
};

// "in 3 days", "today", "overdue"
export function whenText(t, now = Date.now()) {
  if (t == null) return "";
  const d = Math.round((t - now) / DAY);
  return d <= 0 ? (t < now - DAY ? "overdue" : "today") : d === 1 ? "tomorrow" : `in ${d} days`;
}

// The learner's cards and answers, from their account when signed in, else this device. Never throws.
export async function loadLearnerCards() {
  try {
    const { LocalStore, CloudStore } = await import("../../data/store.js");
    let store = new LocalStore();
    try { const cloud = await CloudStore.create(); if (cloud && (await cloud.user())) store = cloud; } catch { /* this device */ }
    const [cards, reviews, profile] = await Promise.all([store.listCards().catch(() => []), store.listReviews(400).catch(() => []), store.getProfile().catch(() => ({}))]);
    return { cards, reviews, examDate: profile?.exam_date || null, mode: store.mode };
  } catch { return { cards: [], reviews: [], mode: "none" }; }
}
