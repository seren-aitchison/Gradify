// Statistics a dataset's claims are checked against: a lesson says "strong positive correlation" or "the line crosses
// zero at 0.33 mol/dm³", and QA recomputes it from the data. Pure.
export const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
/** least-squares line through [[x, y], …] */
export function linearFit(pts) {
  const mx = mean(pts.map((p) => p[0])), my = mean(pts.map((p) => p[1]));
  const sxx = pts.reduce((a, [x]) => a + (x - mx) ** 2, 0), sxy = pts.reduce((a, [x, y]) => a + (x - mx) * (y - my), 0);
  const slope = sxy / sxx; return { slope, intercept: my - slope * mx };
}
/** Pearson's correlation coefficient */
export function pearson(pts) {
  const mx = mean(pts.map((p) => p[0])), my = mean(pts.map((p) => p[1]));
  const sxy = pts.reduce((a, [x, y]) => a + (x - mx) * (y - my), 0), sxx = pts.reduce((a, [x]) => a + (x - mx) ** 2, 0), syy = pts.reduce((a, [, y]) => a + (y - my) ** 2, 0);
  return sxy / Math.sqrt(sxx * syy);
}
/** how a GCSE student would describe it: positive, negative or none; strong or weak */
export function describeCorrelation(r) {
  // no variation in x or y: r is undefined, and the data show no correlation in either direction
  if (!Number.isFinite(r)) return { sign: "undefined", strength: "none" };
  const a = Math.abs(r);
  return { sign: a < 0.3 ? "none" : r > 0 ? "positive" : "negative", strength: a >= 0.7 ? "strong" : a >= 0.3 ? "weak" : "none" };
}
export const xIntercept = ({ slope, intercept }) => -intercept / slope;
/** the [x, y] points of a dataset item's two named columns */
export const pointsOf = (data, x = data.x, y = data.y) => { const ix = data.columns.findIndex((c) => c.key === x), iy = data.columns.findIndex((c) => c.key === y); return data.rows.map((r) => [r[ix], r[iy]]); };

/** recompute a dataset's claims: [{ claim, ok, detail }] */
export function checkDataClaims(data) {
  const out = [], pts = pointsOf(data), fit = linearFit(pts), r = pearson(pts), d = describeCorrelation(r);
  for (const c of data.claims || []) {
    if (c.type === "correlation") out.push({ claim: `${c.strength} ${c.sign} correlation`, ok: d.sign === c.sign && d.strength === c.strength, detail: `r = ${r.toFixed(3)}: ${d.strength} ${d.sign}` });
    else if (c.type === "xIntercept") { const x0 = xIntercept(fit); out.push({ claim: `the line of best fit crosses zero at ${c.value}`, ok: Math.abs(x0 - c.value) <= (c.tol ?? 0.01), detail: `recomputed ${x0.toFixed(3)}` }); }
    else if (c.type === "predict") { const y = fit.slope * c.x + fit.intercept; out.push({ claim: `at ${c.x} the line gives about ${c.y}`, ok: Math.abs(y - c.y) <= (c.tol ?? 0.5), detail: `recomputed ${y.toFixed(2)}` }); }
    else out.push({ claim: c.type, ok: false, detail: "unknown claim type" });
  }
  return out;
}
