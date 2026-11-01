// Statistics for the PsychGradify and SocGradify labs: descriptive statistics, the normal, t, F and chi-squared
// distributions, correlation, regression, t-tests, one-way ANOVA, effect sizes, the Gini coefficient and the
// Lorenz curve. Pure functions with no DOM, pinned to textbook values in tests/social-labs.test.mjs.
import { chiSquareP, gammaP } from "../lab.js";
export { chiSquareP };

export const sum = (a) => a.reduce((s, v) => s + v, 0);
export const mean = (a) => (a.length ? sum(a) / a.length : NaN);
export function median(a) { if (!a.length) return NaN; const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; }
export function modes(a) { const c = new Map(); for (const v of a) c.set(v, (c.get(v) || 0) + 1); const top = Math.max(0, ...c.values()); return top > 1 ? [...c].filter(([, n]) => n === top).map(([v]) => v).sort((x, y) => x - y) : []; }
// sample variance and standard deviation (n − 1), as psychology and sociology reports use
export const variance = (a) => { const m = mean(a); return a.length > 1 ? sum(a.map((v) => (v - m) ** 2)) / (a.length - 1) : NaN; };
export const sd = (a) => Math.sqrt(variance(a));
export const range = (a) => (a.length ? Math.max(...a) - Math.min(...a) : NaN);
// sample skewness and excess kurtosis (the adjusted Fisher–Pearson estimators used by SPSS and Excel)
export function skewness(a) { const n = a.length, m = mean(a), s = sd(a); if (n < 3 || !s) return NaN; return (n / ((n - 1) * (n - 2))) * sum(a.map((v) => ((v - m) / s) ** 3)); }
export function kurtosis(a) { const n = a.length, m = mean(a), s = sd(a); if (n < 4 || !s) return NaN; return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sum(a.map((v) => ((v - m) / s) ** 4)) - (3 * (n - 1) ** 2) / ((n - 2) * (n - 3)); }
export const se = (a) => sd(a) / Math.sqrt(a.length);
export function quantile(a, p) { const s = [...a].sort((x, y) => x - y), h = (s.length - 1) * p, lo = Math.floor(h); return s[lo] + (h - lo) * ((s[lo + 1] ?? s[lo]) - s[lo]); }

// ---------- distributions ----------
// the error function (Abramowitz and Stegun 7.1.26 is too coarse for p-values; this series/continued fraction is ~1e-14)
export function erf(x) { const s = Math.sign(x); x = Math.abs(x); return s * gammaP(0.5, x * x); }
export const normCdf = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
export const normPdf = (z) => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);
// inverse normal CDF (Acklam's algorithm, relative error below 1.2e-9)
export function normInv(p) {
  if (p <= 0) return -Infinity; if (p >= 1) return Infinity;
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425;
  if (p < pl) { const q = Math.sqrt(-2 * Math.log(p)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  if (p > 1 - pl) return -normInv(1 - p);
  const q = p - 0.5, r = q * q;
  return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}
// the regularised incomplete beta function I_x(a, b), by Lentz's continued fraction
function lnGamma(z) { const g = 7, c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]; if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z); z -= 1; let x = c[0]; for (let i = 1; i < g + 2; i++) x += c[i] / (z + i); const t = z + g + 0.5; return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x); }
function betacf(x, a, b) {
  const tiny = 1e-300; let c = 1, d = 1 - ((a + b) * x) / (a + 1); if (Math.abs(d) < tiny) d = tiny; d = 1 / d; let h = d;
  for (let m = 1; m <= 300; m++) {
    const m2 = 2 * m; let aa = (m * (b - m) * x) / ((a + m2 - 1) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < tiny) d = tiny; c = 1 + aa / c; if (Math.abs(c) < tiny) c = tiny; d = 1 / d; h *= d * c;
    aa = (-(a + m) * (a + b + m) * x) / ((a + m2) * (a + m2 + 1));
    d = 1 + aa * d; if (Math.abs(d) < tiny) d = tiny; c = 1 + aa / c; if (Math.abs(c) < tiny) c = tiny; d = 1 / d; const del = d * c; h *= del;
    if (Math.abs(del - 1) < 1e-14) break;
  }
  return h;
}
export function ibeta(x, a, b) {
  if (x <= 0) return 0; if (x >= 1) return 1;
  const bt = Math.exp(lnGamma(a + b) - lnGamma(a) - lnGamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  return x < (a + 1) / (a + b + 2) ? (bt * betacf(x, a, b)) / a : 1 - (bt * betacf(1 - x, b, a)) / b;
}
// Student's t: two-tailed p for a t statistic with df degrees of freedom, and the CDF
export const tCdf = (t, df) => { const x = df / (df + t * t), p = 0.5 * ibeta(x, df / 2, 0.5); return t >= 0 ? 1 - p : p; };
export const tP2 = (t, df) => ibeta(df / (df + t * t), df / 2, 0.5);
// critical t for a two-tailed test at alpha (bisection on the CDF)
export function tCrit(df, alpha = 0.05) { let lo = 0, hi = 100; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (tP2(m, df) > alpha) lo = m; else hi = m; } return (lo + hi) / 2; }
// F distribution: upper-tail p
export const fP = (F, d1, d2) => (F <= 0 ? 1 : ibeta(d2 / (d2 + d1 * F), d2 / 2, d1 / 2));

// ---------- relationships ----------
export function pearson(x, y) {
  const n = Math.min(x.length, y.length); if (n < 3) return { r: NaN, n };
  const mx = mean(x), my = mean(y); let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) { sxy += (x[i] - mx) * (y[i] - my); sxx += (x[i] - mx) ** 2; syy += (y[i] - my) ** 2; }
  const r = sxy / Math.sqrt(sxx * syy), df = n - 2, t = r * Math.sqrt(df / Math.max(1e-15, 1 - r * r));
  return { r, n, df, t, p: tP2(t, df) };
}
// ranks with ties given their average rank
export function ranks(a) { const idx = a.map((v, i) => [v, i]).sort((p, q) => p[0] - q[0]), r = new Array(a.length); for (let i = 0; i < idx.length;) { let j = i; while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++; for (let k = i; k <= j; k++) r[idx[k][1]] = (i + j) / 2 + 1; i = j + 1; } return r; }
export const spearman = (x, y) => { const p = pearson(ranks(x), ranks(y)); return { rho: p.r, n: p.n, p: p.p }; };
// ordinary least squares, simple: y = a + b x
export function regression(x, y) {
  const n = x.length, mx = mean(x), my = mean(y); let sxy = 0, sxx = 0;
  for (let i = 0; i < n; i++) { sxy += (x[i] - mx) * (y[i] - my); sxx += (x[i] - mx) ** 2; }
  const b = sxy / sxx, a = my - b * mx, res = y.map((v, i) => v - (a + b * x[i])), sst = sum(y.map((v) => (v - my) ** 2)), sse = sum(res.map((e) => e * e));
  const r2 = 1 - sse / sst, seB = Math.sqrt(sse / (n - 2) / sxx), t = b / seB;
  return { a, b, r2, residuals: res, seB, t, df: n - 2, p: tP2(t, n - 2) };
}
// multiple regression by the normal equations (small k): returns coefficients [b0, b1, …], R², adjusted R²
export function multiple(X, y) {
  const n = y.length, k = X[0].length, A = X.map((row) => [1, ...row]);
  const XtX = Array.from({ length: k + 1 }, (_, i) => Array.from({ length: k + 1 }, (_, j) => sum(A.map((r) => r[i] * r[j]))));
  const Xty = Array.from({ length: k + 1 }, (_, i) => sum(A.map((r, m) => r[i] * y[m])));
  const b = solve(XtX, Xty), my = mean(y), fit = A.map((r) => sum(r.map((v, i) => v * b[i])));
  const sse = sum(fit.map((f, i) => (y[i] - f) ** 2)), sst = sum(y.map((v) => (v - my) ** 2)), r2 = 1 - sse / sst;
  return { b, r2, adjR2: 1 - ((1 - r2) * (n - 1)) / (n - k - 1) };
}
function solve(M, v) { const n = v.length, A = M.map((r, i) => [...r, v[i]]); for (let c = 0; c < n; c++) { let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r; [A[c], A[p]] = [A[p], A[c]]; for (let r = 0; r < n; r++) if (r !== c) { const f = A[r][c] / A[c][c]; for (let k = c; k <= n; k++) A[r][k] -= f * A[c][k]; } } return A.map((r, i) => r[n] / r[i]); }

// ---------- comparing groups ----------
// independent t-test: Student's (pooled) by default, Welch's when welch is true; Cohen's d uses the pooled SD
export function tIndependent(a, b, { welch = false } = {}) {
  const na = a.length, nb = b.length, va = variance(a), vb = variance(b), diff = mean(a) - mean(b);
  const sp = Math.sqrt(((na - 1) * va + (nb - 1) * vb) / (na + nb - 2)), d = diff / sp;
  let t, df;
  if (welch) { const s = va / na + vb / nb; t = diff / Math.sqrt(s); df = s * s / ((va / na) ** 2 / (na - 1) + (vb / nb) ** 2 / (nb - 1)); }
  else { t = diff / (sp * Math.sqrt(1 / na + 1 / nb)); df = na + nb - 2; }
  return { t, df, p: tP2(t, df), d, diff };
}
export function tPaired(a, b) { const d = a.map((v, i) => v - b[i]), n = d.length, t = mean(d) / (sd(d) / Math.sqrt(n)); return { t, df: n - 1, p: tP2(t, n - 1), dz: mean(d) / sd(d), diff: mean(d) }; }
// one-way ANOVA over groups (arrays): F, dfs, p and eta squared
export function anova(groups) {
  const all = groups.flat(), gm = mean(all), k = groups.length, N = all.length;
  const ssb = sum(groups.map((g) => g.length * (mean(g) - gm) ** 2)), ssw = sum(groups.map((g) => sum(g.map((v) => (v - mean(g)) ** 2))));
  const d1 = k - 1, d2 = N - k, F = (ssb / d1) / (ssw / d2);
  return { F, d1, d2, p: fP(F, d1, d2), eta2: ssb / (ssb + ssw) };
}
// chi-squared test of independence on a table of observed counts (rows × columns), with Cramér's V
export function chiSquare(table) {
  const R = table.map(sum), Cs = table[0].map((_, j) => sum(table.map((r) => r[j]))), N = sum(R);
  let x2 = 0; const expected = table.map((r, i) => r.map((_, j) => (R[i] * Cs[j]) / N));
  table.forEach((r, i) => r.forEach((o, j) => { x2 += (o - expected[i][j]) ** 2 / expected[i][j]; }));
  const df = (table.length - 1) * (table[0].length - 1);
  return { x2, df, p: chiSquareP(x2, df), expected, V: Math.sqrt(x2 / (N * (Math.min(table.length, table[0].length) - 1))) };
}
// Mann–Whitney U with the normal approximation (no continuity correction; ties use average ranks)
export function mannWhitney(a, b) {
  const r = ranks([...a, ...b]), ra = sum(r.slice(0, a.length)), U1 = ra - (a.length * (a.length + 1)) / 2, U = Math.min(U1, a.length * b.length - U1);
  const mu = (a.length * b.length) / 2, sigma = Math.sqrt((a.length * b.length * (a.length + b.length + 1)) / 12), z = (U - mu) / sigma;
  return { U, z, p: 2 * normCdf(-Math.abs(z)) };
}
// power of a two-tailed independent t-test for effect size d with n per group (normal approximation to the noncentral t)
export function powerT(d, n, alpha = 0.05) { const df = 2 * n - 2, tc = tCrit(df, alpha), ncp = d * Math.sqrt(n / 2); return 1 - normCdf(tc - ncp) + normCdf(-tc - ncp); }
// a confidence interval for a mean
export function ciMean(a, level = 0.95) { const m = mean(a), h = tCrit(a.length - 1, 1 - level) * se(a); return [m - h, m + h]; }

// ---------- inequality ----------
// the Gini coefficient of individual values (0 = equal, 1 = one person has everything); the mean-difference formula
export function gini(values) {
  const v = values.filter((x) => x >= 0).sort((a, b) => a - b), n = v.length, total = sum(v); if (!n || !total) return 0;
  let cum = 0; for (let i = 0; i < n; i++) cum += (2 * (i + 1) - n - 1) * v[i];
  return cum / (n * total);
}
// the Gini coefficient from grouped shares (e.g. quintile income shares in %): the trapezium area under the Lorenz curve.
// Grouped data understates the true Gini, because inequality within each group is ignored.
export function giniFromShares(shares) { const t = sum(shares), p = 1 / shares.length; let L = 0, B = 0; for (const s of shares) { const L2 = L + s / t; B += p * (L + L2) / 2; L = L2; } return 1 - 2 * B; }
export function lorenz(values) { const v = [...values].sort((a, b) => a - b), t = sum(v); let c = 0; return [[0, 0], ...v.map((x, i) => { c += x; return [(i + 1) / v.length, c / t]; })]; }
// the share of people below a relative poverty line (a fraction of the median, 0.6 in the UK and EU convention)
export const povertyRate = (incomes, fraction = 0.6) => { const line = fraction * median(incomes); return { line, rate: incomes.filter((x) => x < line).length / incomes.length }; };

// a seeded normal random number generator, so simulated data sets are reproducible
export function rng(seed = 1) { let s = seed >>> 0 || 1; const u = () => ((s = (s * 1664525 + 1013904223) >>> 0) + 0.5) / 4294967296; return { u, n: () => Math.sqrt(-2 * Math.log(u())) * Math.cos(2 * Math.PI * u()) }; }
