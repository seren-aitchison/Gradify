// Probabilistic mastery: Bayesian Knowledge Tracing (Corbett & Anderson, 1995), written from the published equations.
// A lesson is either known or not. P(L0): known before the first answer. P(T): learned at each answer. P(G): right
// by guessing. P(S): wrong by slipping. After every answer Bayes' rule updates P(known), so a lucky guess counts for
// less than a pattern of right answers, and one slip doesn't erase what a learner has shown.
//
// Why: Gradify's weighted-average mastery predicted a learner's next answer worse than a plain running average, and
// BKT predicted it better than both (docs/intelligence/BENCHMARKS.md, benchmark 2). The six dimensions stay as the
// explanation of *how* a learner knows something; this gives the probability *that* they know it.
//
// The parameters are fitted, not chosen: scripts/fit-bkt.mjs fits them by log loss from answers, per subject when
// a subject has enough of them, and writes kit/learning/bkt-params.js. Pure, so Node tests it.
import { BKT_PARAMS } from "./bkt-params.js";

/** P(next answer right) before each answer in a sequence of 0/1 outcomes, and the posterior P(known) after each. */
export function bktTrace(ys, { L0 = 0.3, T = 0.15, G = 0.2, S = 0.1, F = 0 } = {}) {
  let L = L0;
  const pred = [], known = [];
  for (const y of ys) {
    pred.push(L * (1 - S) + (1 - L) * G);
    const post = y ? (L * (1 - S)) / (L * (1 - S) + (1 - L) * G) : (L * S) / (L * S + (1 - L) * (1 - G));
    known.push(post);
    L = post * (1 - F) + (1 - post) * T;
  }
  return { pred, known, next: L * (1 - S) + (1 - L) * G, L };
}

/** Grid-search fit of the four (or five) parameters to many sequences by log loss. Deterministic. Guess and slip stay
 * below 0.5 so "known" means more likely right (the usual identifiability constraint). */
export function fitBkt(seqs, { forgetting = false } = {}) {
  const grid = (lo, hi, n) => Array.from({ length: n }, (_, i) => lo + ((hi - lo) * i) / (n - 1));
  let best = null;
  for (const L0 of grid(0.05, 0.85, 6)) for (const T of grid(0.02, 0.4, 7)) for (const G of grid(0.05, 0.45, 6)) for (const S of grid(0.02, 0.4, 6)) for (const F of forgetting ? grid(0, 0.15, 4) : [0]) {
    let ll = 0, n = 0;
    for (const ys of seqs) {
      const { pred } = bktTrace(ys, { L0, T, G, S, F });
      for (let i = 0; i < ys.length; i++) { const p = Math.min(1 - 1e-6, Math.max(1e-6, pred[i])); ll -= ys[i] ? Math.log(p) : Math.log(1 - p); n++; }
    }
    if (!best || ll / n < best.ll) best = { L0, T, G, S, F, ll: ll / n, answers: n };
  }
  return best;
}

const DAY = 864e5;
/**
 * The answers BKT learns from, in time order, as 0/1: only the learner's own unaided answers (assisted second tries
 * and lab help don't show knowing), only the first answer to a question in any day (so drilling one easy question
 * can't inflate it), and not the retention and transfer copies the six-dimension profile adds.
 * @param {object[]} evidence from evidenceFromAttempts or evidenceFromReviews (kit/learning/mastery.js)
 */
export function bktSequence(evidence) {
  const seen = new Map(), ys = [];
  for (const e of [...evidence].filter((x) => !x.delayed && x.dim !== "transfer" && x.independent).sort((a, b) => a.at - b.at)) {
    const last = seen.get(e.question);
    if (last != null && e.at - last < DAY) continue;
    seen.set(e.question, e.at);
    ys.push(e.score >= 0.5 ? 1 : 0);
  }
  return ys;
}

/** The fitted parameters for a subject (or the default set). */
export const paramsFor = (subject) => BKT_PARAMS.bySubject?.[subject] || BKT_PARAMS.default;

/**
 * How likely the learner is to know this material, from their answers.
 * @returns {{ p: number, next: number, answers: number } | null} p = P(known) now; next = P(next answer right);
 *   null with no unaided answers yet
 */
export function knows(evidence, { subject = null } = {}) {
  const ys = bktSequence(evidence);
  if (!ys.length) return null;
  const t = bktTrace(ys, paramsFor(subject ?? evidence.find((e) => e.subject)?.subject));
  return { p: t.L, next: t.next, answers: ys.length };
}
