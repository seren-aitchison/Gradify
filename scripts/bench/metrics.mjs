// Prediction metrics for the Gradify Intelligence benchmarks (scripts/bench.mjs).
// Every model under test turns a learner's history into a probability that the next answer is right; these
// functions score those probabilities against what actually happened. The choice follows the open-spaced-repetition
// SRS benchmark (log loss, AUC and a binned calibration error) plus the Brier score and expected calibration error
// used in knowledge-tracing work. Written for Gradify; no code copied. Pure, so tests/bench.test.mjs checks them.

const EPS = 1e-6;
const clip = (p) => Math.min(1 - EPS, Math.max(EPS, p));

/** Mean negative log-likelihood of the outcomes (0/1) under the predictions. Lower is better; 0.693 is a coin toss. */
export function logLoss(ps, ys) {
  let s = 0;
  for (let i = 0; i < ps.length; i++) s -= ys[i] ? Math.log(clip(ps[i])) : Math.log(1 - clip(ps[i]));
  return ps.length ? s / ps.length : null;
}

/** Mean squared error of the probabilities (the Brier score). Lower is better; 0.25 is always saying 50%. */
export function brier(ps, ys) {
  let s = 0;
  for (let i = 0; i < ps.length; i++) s += (ps[i] - ys[i]) ** 2;
  return ps.length ? s / ps.length : null;
}

/** Area under the ROC curve: the chance a random right answer was given a higher probability than a random wrong one.
 * 0.5 is no better than chance. Ties count half. Null when every outcome is the same. */
export function auc(ps, ys) {
  const idx = ps.map((p, i) => i).sort((a, b) => ps[a] - ps[b]);
  let pos = 0, neg = 0, rankSum = 0;
  for (let i = 0; i < idx.length;) {
    let j = i;
    while (j + 1 < idx.length && ps[idx[j + 1]] === ps[idx[i]]) j++;
    const rank = (i + j) / 2 + 1;           // average rank of the tied run, 1-based
    for (let k = i; k <= j; k++) if (ys[idx[k]]) { pos++; rankSum += rank; } else neg++;
    i = j + 1;
  }
  if (!pos || !neg) return null;
  return (rankSum - (pos * (pos + 1)) / 2) / (pos * neg);
}

/** Calibration in equal-width probability bins: in each bin, the mean prediction against the share that came true.
 * ece is the bin-size-weighted mean gap (expected calibration error); rmse is its root-mean-square version (the SRS
 * benchmark's "RMSE (bins)" uses adaptive bins; equal-width bins are simpler and adequate for comparison here). */
export function calibration(ps, ys, bins = 10) {
  const b = Array.from({ length: bins }, () => ({ n: 0, p: 0, y: 0 }));
  for (let i = 0; i < ps.length; i++) {
    const k = Math.min(bins - 1, Math.floor(ps[i] * bins));
    b[k].n++; b[k].p += ps[i]; b[k].y += ys[i];
  }
  let ece = 0, sq = 0;
  const table = [];
  for (let k = 0; k < bins; k++) {
    if (!b[k].n) continue;
    const mp = b[k].p / b[k].n, my = b[k].y / b[k].n, w = b[k].n / ps.length;
    ece += w * Math.abs(mp - my); sq += w * (mp - my) ** 2;
    table.push({ from: k / bins, to: (k + 1) / bins, n: b[k].n, predicted: mp, observed: my });
  }
  return { ece: ps.length ? ece : null, rmse: ps.length ? Math.sqrt(sq) : null, table };
}

/** Everything at once, rounded for reports. */
export function score(ps, ys) {
  const r = (x) => (x == null ? null : Math.round(x * 10000) / 10000);
  const cal = calibration(ps, ys);
  return { n: ps.length, base: r(ys.reduce((a, y) => a + y, 0) / (ys.length || 1)), logLoss: r(logLoss(ps, ys)), brier: r(brier(ps, ys)), auc: r(auc(ps, ys)), ece: r(cal.ece), rmseBins: r(cal.rmse) };
}

/** Share of cases where [lo, hi] contains the true value: an honest 80% interval should land near 0.8. */
export function intervalCoverage(rows) {
  if (!rows.length) return null;
  return rows.filter((x) => x.truth >= x.lo && x.truth <= x.hi).length / rows.length;
}
