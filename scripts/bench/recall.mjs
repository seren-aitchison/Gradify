// Benchmark 1: flashcard recall prediction ("will they remember this card right now?").
// Replays review logs in time order. Before each review every model predicts the chance of recall, using only what
// happened before it; the outcome is "again" (forgot) or anything else (remembered). Same protocol as the
// open-spaced-repetition SRS benchmark: first exposures are excluded, because there is nothing to predict from.
//
// Models:
//   fsrs5           Gradify's scheduler (kit/learning/srs.js): card state from schedule(), recall from recallNow()
//   mastery-card    the per-card recall the Mastery Engine uses (kit/learning/mastery.js recallProbability), which
//                   reads any card last rated "again" as 30% however long ago that was
//   learner-mean    baseline: this learner's share of remembered reviews so far (smoothed towards 85%)
//   oracle          synthetic data only: the simulator's true probability, the ceiling for every model
import { schedule, recallNow } from "../../kit/learning/srs.js";
import { recallProbability } from "../../kit/learning/mastery.js";
import { score } from "./metrics.mjs";

export const RECALL_MODELS = ["fsrs5", "mastery-card", "learner-mean"];

/**
 * @param {{ user: string, card: string, at: number|string, rating: string, mode?: string, first?: boolean }[]} log
 * @returns {{ models: Record<string, object>, reviews: number, users: number }}
 */
export function recallBenchmark(log) {
  const rows = log.map((r) => ({ ...r, at: typeof r.at === "number" ? r.at : Date.parse(r.at) })).sort((a, b) => a.at - b.at);
  const cards = new Map(), users = new Map();
  const preds = Object.fromEntries(RECALL_MODELS.map((m) => [m, []])), ys = [], oracle = [];
  for (const r of rows) {
    const key = `${r.user}|${r.card}`;
    const card = cards.get(key) || { reps: 0 };
    const u = users.get(r.user) || { right: 0, n: 0 };
    if (card.reps > 0) {
      const y = r.rating === "again" ? 0 : 1;
      ys.push(y);
      preds.fsrs5.push(recallNow(card, r.at) ?? 0.5);
      preds["mastery-card"].push(recallProbability(card, r.at) ?? 0.5);
      preds["learner-mean"].push((u.right + 0.85 * 4) / (u.n + 4));
      oracle.push(r.truth);
      u.right += y; u.n++;
      users.set(r.user, u);
    }
    // as in the app (kit/app/main.js rate): a review stored as "practice" is scored but doesn't move the card
    if (r.mode !== "practice") cards.set(key, { ...card, ...schedule(card, r.rating, { now: r.at }) });
  }
  const models = Object.fromEntries(RECALL_MODELS.map((m) => [m, score(preds[m], ys)]));
  // synthetic logs carry the simulator's true recall probability: the best any model could do on this data
  if (oracle.length && oracle.every((x) => typeof x === "number")) models.oracle = score(oracle, ys);
  return { reviews: ys.length, users: users.size, models };
}

/** Reads an exported review log: one JSON object per line, { user, card, reviewed_at | at, rating, mode }. */
export function parseReviewLog(text) {
  return text.split("\n").filter((l) => l.trim()).map((l) => { const o = JSON.parse(l); return { user: String(o.user ?? o.user_id), card: String(o.card ?? o.card_id), at: o.at ?? o.reviewed_at, rating: o.rating, mode: o.mode ?? "scheduled" }; });
}
