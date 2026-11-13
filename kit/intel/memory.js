// Gradify Intelligence: learner memory and predictions.
// One evolving model of what a learner knows, built only from evidence they have produced: every flashcard
// answer (with how sure they were and how long it took), every study pack, lesson, quiz and plan block. It sits
// on the Mastery Engine (kit/learning/mastery.js) and the spaced-repetition state of each card, and adds what a
// recommendation needs: how certain the estimate is, how fast memory is fading, where the errors are, and which
// stage of learning each concept has reached. Nothing here is guessed: a concept with little evidence says so.
// Pure functions, no browser APIs, so Node can test them (tests/intel.test.mjs).
import { topicProfiles, recallProbability } from "../learning/mastery.js";

export const DAY = 864e5;
export const SEC_PER_CARD = 25;
const keyOf = (c) => `${c.document_id}|${c.topic || "Cards"}`;
const SURE = { sure: 1, unsure: 0.5, guess: 0 };

// ---------- the unified event stream ----------
// Everything a learner does, as one list of events, newest first. It's derived from the tables Gradify already
// keeps (reviews, activity, plan blocks), so every past answer counts from day one and every site feeds it.
const ACTIVITY_EVENT = { pack: "study_pack_made", session: "study_session", block: "plan_block_done", quiz: "quiz_finished", lesson_complete: "lesson_completed", exam_finish: "exam_finished", tutor: "tutor_used", workout: "workout_logged" };
export function eventStream({ cards = [], reviews = [], activity = [], blocks = [], now = Date.now() } = {}) {
  const byId = new Map(cards.map((c) => [c.id, c]));
  const out = [];
  for (const r of reviews) {
    const c = byId.get(r.card_id);
    out.push({ event: "flashcard_answered", at: r.reviewed_at, concept: c ? keyOf(c) : null, card: c?.front || null, result: r.rating === "again" ? "incorrect" : "correct", rating: r.rating,
      confidence: r.confidence in SURE ? SURE[r.confidence] : null, response_ms: r.ms ?? null, source: r.mode === "practice" ? "practice" : "study_pack" });
  }
  for (const a of activity) out.push({ event: ACTIVITY_EVENT[a.kind] || a.kind || "activity", at: a.at, site: a.site || null, xp: a.xp || 0, detail: a.detail ?? null });
  const today = dayKey(now), nowMin = minuteOf(now);
  for (const b of blocks) {
    const over = b.day < today || (b.day === today && b.end_min <= nowMin);
    if (over && !b.done && (b.cal || "study") === "study") out.push({ event: "plan_block_missed", at: `${b.day}T${hhmm(b.end_min)}:00`, title: b.title, auto: Boolean(b.auto) });
  }
  return out.filter((e) => e.at).sort((a, b) => Date.parse(b.at) - Date.parse(a.at));
}

// ---------- learner memory: one model per concept ----------
/**
 * @param {{ cards: object[], reviews: object[], docs?: object[], examDate?: string|null, now?: number }} o
 * @returns {object[]} concepts, most in need of attention first
 */
export function learnerMemory({ cards = [], reviews = [], docs = [], examDate = null, now = Date.now() } = {}) {
  const live = cards.filter((c) => !c.suspended);
  const profiles = topicProfiles(live, reviews, { now, examDate });
  const byCard = new Map();
  for (const r of reviews) (byCard.get(r.card_id) || byCard.set(r.card_id, []).get(r.card_id)).push(r);
  const docTitle = new Map(docs.map((d) => [d.id, d.title])), docSite = new Map(docs.map((d) => [d.id, d.site || null]));
  return profiles.map((p) => {
    const tc = live.filter((c) => keyOf(c) === p.key);
    const rs = tc.flatMap((c) => (byCard.get(c.id) || []).map((r) => ({ ...r, front: c.front }))).sort((a, b) => Date.parse(b.reviewed_at) - Date.parse(a.reviewed_at));
    const n = rs.length;
    // how sure Gradify is about its own estimate: grows with evidence, and with evidence of more than one kind
    const kinds = ["recall", "explain", "apply"].filter((k) => p.dims[k].n > 0).length;
    const certainty = Math.min(0.97, (n / (n + 6)) * (0.8 + 0.1 * kinds));
    const recent = rs.filter((r) => now - Date.parse(r.reviewed_at) < 30 * DAY);
    const wrong = recent.filter((r) => r.rating === "again");
    const repeated = tc.filter((c) => (byCard.get(c.id) || []).filter((r) => r.rating === "again" && now - Date.parse(r.reviewed_at) < 14 * DAY).length >= 2);
    const slow = recent.filter((r) => r.ms && r.ms > 20000 && r.rating !== "again").length;
    const rec = p.dims.recall.value ?? p.dims.explain.value;
    const stages = {
      seen: p.seen > 0,
      understood: p.seen > 0 && rec != null && rec >= 0.7 && (p.dims.explain.value == null || p.dims.explain.value >= 0.6) && !p.misconceptions.length,
      retained: p.dims.retention.value != null && p.dims.retention.value >= 0.8 && p.depth >= 0.3,
      applied: p.dims.apply.n >= 2 && p.dims.apply.value >= 0.6,
    };
    const stage = !stages.seen ? "new" : !stages.understood ? "seen" : !stages.retained ? "understood" : !stages.applied ? "retained" : "applied";
    const seenCards = tc.filter((c) => c.reps > 0);
    const nextReview = seenCards.length ? new Date(Math.min(...seenCards.map((c) => Date.parse(c.due_at)))).toISOString() : null;
    return {
      key: p.key, name: p.topic, documentId: p.documentId, pack: docTitle.get(p.documentId) || null, site: docSite.get(p.documentId) || null,
      mastery: p.mastery, level: p.level, certainty, certaintyLabel: certainty >= 0.75 ? "high" : certainty >= 0.45 ? "medium" : "low",
      retention: p.dims.retention.value, forgetInDays: forgetIn(seenCards, now), lastTested: p.lastSeen ? new Date(p.lastSeen).toISOString() : null, nextReview,
      errors: { recent: wrong.length, confident: p.misconceptions.length, repeated: repeated.map((c) => c.front), slow },
      stage, stages, dims: p.dims, cards: p.cards, seen: p.seen, due: p.due, fresh: p.fresh, next: p.next, priority: p.priority,
      misconceptions: p.misconceptions, underconfident: p.underconfident,
      evidence: rs.slice(0, 6).map((r) => ({ at: r.reviewed_at, front: r.front, rating: r.rating, confidence: r.confidence || null, ms: r.ms ?? null })),
      answers: n,
    };
  });
}

// days until the average chance of recalling this concept's cards drops below 70% (0 = already below; null = no evidence)
export function forgetIn(seenCards, now = Date.now(), threshold = 0.7) {
  if (!seenCards.length) return null;
  const at = (t) => seenCards.reduce((a, c) => a + (recallProbability(c, t) ?? 0), 0) / seenCards.length;
  for (let d = 0; d <= 60; d++) if (at(now + d * DAY) < threshold) return d;
  return 61;
}

// ---------- predictions ----------
export function predictions({ concepts = [], cards = [], reviews = [], blocks = [], examDate = null, dailyMinutes = 20, target = 0.8, now = Date.now() } = {}) {
  const totalCards = concepts.reduce((a, c) => a + c.cards, 0);
  const w = (f) => (totalCards ? concepts.reduce((a, c) => a + f(c) * c.cards, 0) / totalCards : 0);
  const mastery = w((c) => c.mastery), certainty = w((c) => c.certainty);
  const coverage = totalCards ? concepts.reduce((a, c) => a + c.seen, 0) / totalCards : 0;
  const band = Math.round((1 - certainty) * 25);
  const enough = reviews.length >= 20 && coverage >= 0.5;
  const readiness = { value: mastery, low: Math.max(0, mastery - band / 100), high: Math.min(1, mastery + band / 100), certainty, coverage, enough,
    note: enough ? `Based on ${reviews.length} answers across ${Math.round(coverage * 100)}% of your cards.` : `Not enough evidence yet for a firm figure: ${reviews.length} answers, ${Math.round(coverage * 100)}% of cards tried.` };

  const forgetting = concepts.filter((c) => c.forgetInDays != null && c.forgetInDays <= 7 && c.level !== "new").sort((a, b) => a.forgetInDays - b.forgetInDays)
    .map((c) => ({ key: c.key, name: c.name, days: c.forgetInDays, retention: c.retention }));

  // learning velocity: share of answers right this week against last week (first answers of practice included)
  const win = (from, to) => reviews.filter((r) => { const t = Date.parse(r.reviewed_at); return t >= now - from * DAY && t < now - to * DAY; });
  const rate = (rs) => (rs.length ? rs.filter((r) => r.rating !== "again").length / rs.length : null);
  const thisWeek = win(7, 0), lastWeek = win(14, 7);
  const velocity = { now: rate(thisWeek), prev: rate(lastWeek), answers: thisWeek.length, prevAnswers: lastWeek.length,
    delta: rate(thisWeek) != null && rate(lastWeek) != null && lastWeek.length >= 5 && thisWeek.length >= 5 ? rate(thisWeek) - rate(lastWeek) : null };

  // plan adherence: planned study blocks in the last 14 days that were done
  const today = dayKey(now), nowMin = minuteOf(now), from = dayKey(now - 14 * DAY);
  const past = blocks.filter((b) => (b.cal || "study") === "study" && b.day >= from && (b.day < today || (b.day === today && b.end_min <= nowMin)));
  const adherence = { planned: past.length, done: past.filter((b) => b.done).length, value: past.length ? past.filter((b) => b.done).length / past.length : null };

  // study requirement: minutes of practice to bring every concept to the target, and per day until the exam
  const examIn = examDate ? Math.ceil((Date.parse(`${examDate}T00:00:00`) - Date.parse(`${today}T00:00:00`)) / DAY) : null;
  const gapMins = Math.ceil(concepts.reduce((a, c) => a + Math.max(0, target - c.mastery) * c.cards * SEC_PER_CARD * 2.5, 0) / 60);
  const perDay = examIn > 0 ? Math.ceil(gapMins / examIn) : null;
  const requirement = { minutes: gapMins, perDay, examIn, target, status: perDay == null ? (examIn != null && examIn < 0 ? "past" : "no-date") : perDay <= dailyMinutes ? "on-track" : perDay <= dailyMinutes * 1.5 ? "tight" : "behind" };

  const gaps = concepts.filter((c) => c.level === "shaky" || c.level === "fading" || (c.seen && c.mastery < 0.5));
  const strong = concepts.filter((c) => c.level === "strong" || c.level === "mastered");
  return { readiness, forgetting, velocity, adherence, requirement, gaps, strong, dueCards: cards.filter((c) => !c.suspended && c.reps >= 0 && Date.parse(c.due_at) <= now).length };
}

// ---------- shared helpers ----------
export function dayKey(t) { const x = new Date(t); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`; }
export function minuteOf(t) { const x = new Date(t); return x.getHours() * 60 + x.getMinutes(); }
export function hhmm(m) { return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`; }
