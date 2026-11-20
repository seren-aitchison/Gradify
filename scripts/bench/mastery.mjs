// Benchmark 2: mastery as a prediction ("will they get the next question on this topic right?").
// A mastery estimate that means anything should predict the learner's next answer on that topic. Before each answer,
// every model sees only that learner's earlier answers on the same lesson. Learners are split: BKT's parameters are
// fitted on the first 70% and every model is scored on the other 30%, so nothing is scored on data it was fitted to.
//
// Models:
//   gradify-dimension  the Six-dimension profile's value for the dimension the question tests
//                      (kit/learning/mastery.js: evidenceFromAttempts → sixProfile), 50% when there's no evidence
//   gradify-mastery    what the app predicts for the next answer: the profile's BKT model with the app's fitted
//                      parameters (kit/learning/bkt.js, bkt-params.js, fitted on a different seed), 50% with no answers
//   gradify-blend      the old overall mastery, a weighted average of the dimensions (null until two are measured → 50%)
//   running-accuracy   baseline: share right so far on this lesson, Laplace-smoothed
//   bkt                Bayesian Knowledge Tracing, fitted on the training learners (scripts/bench/bkt.mjs)
//   bkt-forget         the same with a forgetting parameter
//   oracle             synthetic data only: the simulator's true probability, the ceiling for every model
//
// Benchmark 3 (readiness) is here too: Gradify's predictive readiness (kit/intel/readiness.js) for each objective,
// compared with the simulator's true chance of a right answer on exam day, so its 80% range can be checked.
import { evidenceFromAttempts, sixProfile, dimensionOf } from "../../kit/learning/mastery.js";
import { objectiveReadiness } from "../../kit/intel/readiness.js";
import { score, intervalCoverage } from "./metrics.mjs";
import { bktTrace, fitBkt } from "./bkt.mjs";
import { simulateCourse, rng, DAY, T0 } from "./simulate.mjs";

export const MASTERY_MODELS = ["gradify-dimension", "gradify-mastery", "gradify-blend", "running-accuracy", "bkt", "bkt-forget"];

const sequences = (attempts) => {
  const by = new Map();
  for (const a of [...attempts].sort((x, y) => x.at.localeCompare(y.at))) {
    // lesson ids are only unique within a course: keep courses apart (the user stays first, for the split below)
    const k = `${a.user}|${a.site}|${a.subject}|${a.lesson}`;
    (by.get(k) || by.set(k, []).get(k)).push(a);
  }
  return by;
};

/** @param {object[]} attempts attempt records with a `user` field @param {{ trainShare?: number }} [o] */
export function masteryBenchmark(attempts, { trainShare = 0.7 } = {}) {
  const users = [...new Set(attempts.map((a) => a.user))].sort();
  if (users.length < 2) throw new Error(`the mastery benchmark needs answers from at least 2 learners (fit on some, score on the rest); got ${users.length}`);
  const train = new Set(users.slice(0, Math.min(users.length - 1, Math.max(1, Math.round(users.length * trainShare)))));
  const seqs = sequences(attempts);
  const trainSeqs = [...seqs.entries()].filter(([k]) => train.has(k.split("|")[0])).map(([, s]) => s.map((a) => (a.score >= 0.5 ? 1 : 0)));
  const bkt = fitBkt(trainSeqs), bktF = fitBkt(trainSeqs, { forgetting: true });
  const preds = Object.fromEntries(MASTERY_MODELS.map((m) => [m, []])), ys = [], oracle = [];
  for (const [k, seq] of seqs) {
    if (train.has(k.split("|")[0])) continue;
    const y = seq.map((a) => (a.score >= 0.5 ? 1 : 0));
    const b = bktTrace(y, bkt).pred, bf = bktTrace(y, bktF).pred;
    let right = 0;
    seq.forEach((a, i) => {
      const at = Date.parse(a.at);
      const prof = i ? sixProfile(evidenceFromAttempts(seq.slice(0, i)), { now: at }) : null;
      const dim = dimensionOf(a);
      preds["gradify-dimension"].push(prof?.dims[dim]?.value ?? 0.5);
      preds["gradify-mastery"].push(prof?.knows?.next ?? 0.5);
      preds["gradify-blend"].push(prof?.blend ?? 0.5);
      preds["running-accuracy"].push((right + 1) / (i + 2));
      preds.bkt.push(b[i]);
      preds["bkt-forget"].push(bf[i]);
      ys.push(y[i]); right += y[i]; oracle.push(a.truth);
    });
  }
  const r = (x) => Math.round(x * 1000) / 1000;
  return {
    answers: ys.length, trainLearners: train.size, testLearners: users.length - train.size,
    fitted: { bkt: { L0: r(bkt.L0), T: r(bkt.T), G: r(bkt.G), S: r(bkt.S) }, "bkt-forget": { L0: r(bktF.L0), T: r(bktF.T), G: r(bktF.G), S: r(bktF.S), F: r(bktF.F) } },
    models: { ...Object.fromEntries(MASTERY_MODELS.map((m) => [m, score(preds[m], ys)])), ...(oracle.every((x) => typeof x === "number") ? { oracle: score(oracle, ys) } : {}) },
  };
}

/**
 * Readiness: learners study for `days`, then sit an exam `horizon` days later with no more study. For every objective
 * Gradify gives a probability and an 80% range; the simulator knows the true probability.
 * Compared with a baseline Beta estimate that ignores forgetting.
 */
export function readinessBenchmark({ seed = 3, learners = 60, days = 45, horizon = 14 } = {}) {
  const sim = simulateCourse({ seed, learners, days });
  const examAt = T0 + (days + horizon) * DAY, now = T0 + days * DAY;
  const examDate = new Date(examAt).toISOString().slice(0, 10);
  const R = rng(seed + 100);
  const rows = { gradify: [], "beta-no-forgetting": [] };
  for (const user of sim.users) {
    const mine = sim.attempts.filter((a) => a.user === user);
    const { objectives } = objectiveReadiness({ attempts: mine, examDate, now });
    // a stable order for the exam draws, so a change to how Gradify ranks objectives can't change the exam itself
    for (const o of [...objectives].sort((a, b) => a.id.localeCompare(b.id))) {
      if (o.kind !== "course" || o.status === "unknown") continue;
      const truth = sim.truth(user, o.lesson, Number(o.id.split("#o")[1]), Date.parse(`${examDate}T12:00:00Z`));
      const y = R.next() < truth ? 1 : 0;   // one exam question on this objective
      rows.gradify.push({ p: o.p, lo: o.lo, hi: o.hi, truth, y });
      // baseline: the same answers, no recency weighting and no forgetting
      const list = mine.filter((a) => a.lesson === o.lesson && a.question.objectives.includes(Number(o.id.split("#o")[1])));
      const s = 1 + list.reduce((a, x) => a + x.score, 0), f = 1 + list.length - (s - 1);
      const m = s / (s + f), sd = Math.sqrt((s * f) / ((s + f) ** 2 * (s + f + 1)));
      rows["beta-no-forgetting"].push({ p: m, lo: Math.max(0, m - 1.2816 * sd), hi: Math.min(1, m + 1.2816 * sd), truth, y });
    }
  }
  const r = (x) => (x == null ? null : Math.round(x * 10000) / 10000);
  const summarise = (xs) => ({
    ...score(xs.map((x) => x.p), xs.map((x) => x.y)),
    meanAbsError: r(xs.reduce((a, x) => a + Math.abs(x.p - x.truth), 0) / xs.length),
    bias: r(xs.reduce((a, x) => a + (x.p - x.truth), 0) / xs.length),
    interval80: r(intervalCoverage(xs)),
    intervalWidth: r(xs.reduce((a, x) => a + (x.hi - x.lo), 0) / xs.length),
  });
  return { objectives: rows.gradify.length, horizon, models: Object.fromEntries(Object.entries(rows).map(([k, v]) => [k, summarise(v)])) };
}
