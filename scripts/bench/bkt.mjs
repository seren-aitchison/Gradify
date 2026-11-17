// Bayesian Knowledge Tracing, for comparison in the benchmarks only (it is not used by the product).
// The standard four-parameter model (Corbett & Anderson, 1995): a skill is known or not; P(L0) known at the start,
// P(T) learned after each opportunity, P(G) right by guessing, P(S) wrong by slipping. pyBKT (MIT) adds per-item
// guess/slip and forgetting; this is the plain model, written from the published equations, so the benchmark
// can tell whether a probabilistic mastery model beats Gradify's weighted averages before any product work starts.
// Optional forgetting P(F): a known skill becomes unknown between opportunities (the pyBKT "forgets" variant).

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
  return { pred, known };
}

/** Grid-search fit of the four (or five) parameters to many sequences by log loss: simple, deterministic, enough
 * for a baseline. Expectation-maximisation, as pyBKT uses, would fit faster and finer. */
export function fitBkt(seqs, { forgetting = false } = {}) {
  const grid = (lo, hi, n) => Array.from({ length: n }, (_, i) => lo + ((hi - lo) * i) / (n - 1));
  let best = null;
  // guess and slip stay below 0.5 so "known" means more likely right (the usual identifiability constraint)
  for (const L0 of grid(0.05, 0.85, 6)) for (const T of grid(0.02, 0.4, 7)) for (const G of grid(0.05, 0.45, 6)) for (const S of grid(0.02, 0.4, 6)) for (const F of forgetting ? grid(0, 0.15, 4) : [0]) {
    let ll = 0, n = 0;
    for (const ys of seqs) {
      const { pred } = bktTrace(ys, { L0, T, G, S, F });
      for (let i = 0; i < ys.length; i++) { const p = Math.min(1 - 1e-6, Math.max(1e-6, pred[i])); ll -= ys[i] ? Math.log(p) : Math.log(1 - p); n++; }
    }
    if (!best || ll / n < best.ll) best = { L0, T, G, S, F, ll: ll / n };
  }
  return best;
}
