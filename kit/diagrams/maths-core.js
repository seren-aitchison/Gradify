// The mathematics the maths diagram checks rely on (kit/diagrams/maths-renderers*.js): exact fractions, number
// formatting, a safe numeric evaluator, statistics (quartiles, least squares), distributions (normal, binomial,
// Poisson) and plane geometry. Kept free of drawing so tests/maths-diagrams.test.mjs can check it against answers
// known independently.
import { compile } from "./renderers.js";

// ---------- exact fractions ----------
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
export const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);
export { gcd };
/** A fraction {n, d} in lowest terms, d > 0, from "3/7", "-2", "0.25", 0.125 or {n, d}. Throws on anything else. */
export function frac(v) {
  if (v && typeof v === "object") return norm(v.n, v.d);
  const s = String(v).trim().replace("−", "-");
  let m = s.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (m) return norm(+m[1], +m[2]);
  m = s.match(/^(-?)(\d*)(?:\.(\d+))?$/);
  if (m && (m[2] || m[3])) { const dp = (m[3] || "").length, d = 10 ** dp; return norm((m[1] ? -1 : 1) * (+(m[2] || 0) * d + +(m[3] || 0)), d); }
  throw new Error(`not a fraction: ${v}`);
}
function norm(n, d) { if (!d) throw new Error("zero denominator"); if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); return { n: n / g, d: d / g }; }
export const fadd = (a, b) => norm(a.n * b.d + b.n * a.d, a.d * b.d);
export const fmul = (a, b) => norm(a.n * b.n, a.d * b.d);
export const fdiv = (a, b) => norm(a.n * b.d, a.d * b.n);
export const feq = (a, b) => { const x = frac(a), y = frac(b); return x.n === y.n && x.d === y.d; };
export const fval = (a) => a.n / a.d;
export const fstr = (a) => (a.d === 1 ? `${a.n}` : `${a.n}/${a.d}`).replace("-", "−");

// ---------- numbers ----------
/** A number from a number or an expression ("sqrt(2)", "pi", "22/7", "e"); x is 0. */
export function num(v) {
  if (typeof v === "number") return v;
  const s = String(v).replace(/−/g, "-").replace(/π|\bpi\b/g, "(2*asin(1))").replace(/\be\b/g, "exp(1)").replace(/√\(/g, "sqrt(").replace(/√(\d+(?:\.\d+)?)/g, "sqrt($1)");
  return compile(s)(0);
}
/** Format a number for a label: at most `dp` decimals, trailing zeros removed, a true minus sign. */
export function fmt(x, dp = 3) {
  if (!Number.isFinite(x)) return String(x);
  let s = (+x.toFixed(dp)).toString();
  if (/e/.test(s)) s = x.toPrecision(3);
  if (Math.abs(x) >= 1000 && !/e/.test(s)) { const [i, d] = s.split("."); s = i.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (d ? `.${d}` : ""); }
  return s.replace("-", "−");
}
export const isPrime = (n) => { if (!Number.isInteger(n) || n < 2) return false; for (let p = 2; p * p <= n; p++) if (n % p === 0) return false; return true; };
/** Prime factors with repeats, ascending. */
export function primeFactors(n) { const out = []; for (let p = 2; p * p <= n; p++) while (n % p === 0) { out.push(p); n /= p; } if (n > 1) out.push(n); return out; }
/** "2^2 × 3 × 5" / "2² × 3 × 5" / "2*2*3*5" → [2, 2, 3, 5] */
export function readFactorisation(s) {
  const sup = { "⁰": 0, "¹": 1, "²": 2, "³": 3, "⁴": 4, "⁵": 5, "⁶": 6, "⁷": 7, "⁸": 8, "⁹": 9 };
  const t = String(s).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => `^${[...m].map((c) => sup[c]).join("")}`).replace(/\^\{(\d+)\}/g, "^$1");
  const out = [];
  for (const part of t.split(/[×x*·]/)) { const m = part.trim().match(/^(\d+)(?:\^(\d+))?$/); if (!m) throw new Error(`cannot read ${s}`); for (let i = 0; i < +(m[2] || 1); i++) out.push(+m[1]); }
  return out.sort((a, b) => a - b);
}
/** Round x to the nearest multiple of step (half away from zero), or to dp decimal places, or to sf significant figures. */
export function roundTo(x, { step, dp, sf }) {
  if (sf != null) { if (x === 0) return 0; const p = Math.floor(Math.log10(Math.abs(x))) - sf + 1; step = 10 ** p; }
  if (dp != null) step = 10 ** -dp;
  const q = Math.abs(x) / step, r = Math.floor(q + 0.5 + 1e-9) * step;
  return Math.sign(x) * +r.toPrecision(12);
}
/** Inequality in x as an interval: "-2 < x <= 3", "x > 1", "x ≤ −4". */
export function readInequality(s) {
  const t = String(s).replace(/−/g, "-").replace(/≤/g, "<=").replace(/≥/g, ">=").replace(/\s+/g, "");
  const n = "(-?\\d+(?:\\.\\d+)?)";
  let m = t.match(new RegExp(`^${n}(<=?)x(<=?)${n}$`));
  if (m) return { from: +m[1], to: +m[4], closed: [m[2] === "<=", m[3] === "<="] };
  let op, v;
  if ((m = t.match(new RegExp(`^x(<=?|>=?)${n}$`)))) [op, v] = [m[1], +m[2]];
  else if ((m = t.match(new RegExp(`^${n}(<=?|>=?)x$`)))) [op, v] = [{ "<": ">", "<=": ">=", ">": "<", ">=": "<=" }[m[2]], +m[1]];
  else throw new Error(`cannot read inequality ${s}`);
  return op[0] === "<" ? { from: null, to: v, closed: [false, op === "<="] } : { from: v, to: null, closed: [op === ">=", false] };
}

// ---------- statistics ----------
export const sum = (a) => a.reduce((s, x) => s + x, 0);
export const mean = (a) => sum(a) / a.length;
const sorted = (a) => [...a].sort((x, y) => x - y);
export function median(a) { const s = sorted(a), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; }
/**
 * Quartiles. method "halves" (GCSE: medians of the lower and upper halves, the median excluded when n is odd),
 * "linear" (spreadsheet QUARTILE.INC / numpy default) or "position" ((n + 1)/4th value, interpolated).
 */
export function quartiles(a, method = "halves") {
  const s = sorted(a), n = s.length;
  if (method === "halves") { const lo = s.slice(0, Math.floor(n / 2)), hi = s.slice(Math.ceil(n / 2)); return [median(lo), median(s), median(hi)]; }
  const at = (p) => { const i = Math.floor(p), f = p - i; return i >= n - 1 ? s[n - 1] : i < 0 ? s[0] : s[i] + f * (s[i + 1] - s[i]); };
  if (method === "linear") return [at((n - 1) * 0.25), at((n - 1) * 0.5), at((n - 1) * 0.75)];
  if (method === "position") return [at((n + 1) / 4 - 1), at((n + 1) / 2 - 1), at((3 * (n + 1)) / 4 - 1)];
  throw new Error(`unknown quartile method ${method}`);
}
/** Least-squares line y = a + bx, with Pearson's r. */
export function leastSquares(pts) {
  const n = pts.length, mx = mean(pts.map((p) => p[0])), my = mean(pts.map((p) => p[1]));
  let sxx = 0, sxy = 0, syy = 0;
  for (const [x, y] of pts) { sxx += (x - mx) ** 2; sxy += (x - mx) * (y - my); syy += (y - my) ** 2; }
  const b = sxy / sxx; return { a: my - b * mx, b, r: sxy / Math.sqrt(sxx * syy), mx, my, n };
}
export function sd(a, sample = false) { const m = mean(a); return Math.sqrt(sum(a.map((x) => (x - m) ** 2)) / (a.length - (sample ? 1 : 0))); }

// ---------- distributions ----------
export function erf(x) {
  // Abramowitz and Stegun 7.1.26 is only 1e-7; use the series / continued fraction for full double precision
  const t = Math.abs(x);
  if (t < 3) { let s = 0, term = t, k = 0; while (Math.abs(term) > 1e-17 * Math.abs(s || 1) && k < 200) { s += term / (2 * k + 1); k++; term *= (-t * t) / k; } return Math.sign(x) * (2 / Math.sqrt(Math.PI)) * s; }
  let f = 0; for (let k = 60; k >= 1; k--) f = (k / 2) / (t + f);
  return Math.sign(x) * (1 - Math.exp(-t * t) / Math.sqrt(Math.PI) / (t + f));
}
export const normalCdf = (x, mu = 0, s = 1) => 0.5 * (1 + erf((x - mu) / (s * Math.SQRT2)));
export const normalPdf = (x, mu = 0, s = 1) => Math.exp(-(((x - mu) / s) ** 2) / 2) / (s * Math.sqrt(2 * Math.PI));
export function choose(n, k) { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return Math.round(r); }
export const binomialPmf = (k, n, p) => choose(n, k) * p ** k * (1 - p) ** (n - k);
export function poissonPmf(k, l) { let r = Math.exp(-l); for (let i = 1; i <= k; i++) r *= l / i; return r; }
export const geometricPmf = (k, p) => (k >= 1 ? (1 - p) ** (k - 1) * p : 0);
/** P(a ≤ X ≤ b) for a named distribution; a or b null for an open end. Continuous: normal, uniform, exponential. */
export function prob(d, a, b) {
  const lo = a ?? -Infinity, hi = b ?? Infinity;
  if (d.dist === "normal") return normalCdf(hi, d.mu, d.sigma) - normalCdf(lo, d.mu, d.sigma);
  if (d.dist === "uniform") { const c = (x) => Math.min(1, Math.max(0, (x - d.a) / (d.b - d.a))); return c(hi) - c(lo); }
  if (d.dist === "exponential") { const c = (x) => (x <= 0 ? 0 : 1 - Math.exp(-d.lambda * x)); return c(hi) - c(lo); }
  const pmf = pmfOf(d); let s = 0;
  for (let k = Math.max(0, Math.ceil(lo)); k <= Math.min(maxK(d), Math.floor(hi)); k++) s += pmf(k);
  return s;
}
export function pmfOf(d) {
  if (d.dist === "binomial") return (k) => binomialPmf(k, d.n, d.p);
  if (d.dist === "poisson") return (k) => poissonPmf(k, d.lambda);
  if (d.dist === "geometric") return (k) => geometricPmf(k, d.p);
  throw new Error(`unknown distribution ${d.dist}`);
}
export const maxK = (d) => (d.dist === "binomial" ? d.n : d.kMax ?? 60);
export const discrete = (d) => ["binomial", "poisson", "geometric"].includes(d.dist);
export function meanVar(d) {
  return { normal: [d.mu, d.sigma ** 2], uniform: [(d.a + d.b) / 2, (d.b - d.a) ** 2 / 12], exponential: [1 / d.lambda, 1 / d.lambda ** 2],
    binomial: [d.n * d.p, d.n * d.p * (1 - d.p)], poisson: [d.lambda, d.lambda], geometric: [1 / d.p, (1 - d.p) / d.p ** 2] }[d.dist];
}

// ---------- plane geometry ----------
export const dist = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
/** The angle at B between BA and BC, in degrees (0–180). */
export function angleAt(A, B, C) {
  const u = [A[0] - B[0], A[1] - B[1]], v = [C[0] - B[0], C[1] - B[1]];
  return (Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))))) * 180) / Math.PI;
}
export const cross = (u, v) => u[0] * v[1] - u[1] * v[0];
export const sub = (P, Q) => [P[0] - Q[0], P[1] - Q[1]];
/** Signed area by the shoelace formula (positive anticlockwise). */
export function area(pts) { let s = 0; for (let i = 0; i < pts.length; i++) s += cross(pts[i], pts[(i + 1) % pts.length]); return s / 2; }
/** Apply a transformation to a point: translate, reflect (in x = k, y = k, or y = mx + c), rotate (about a centre, degrees anticlockwise), enlarge, matrix. */
export function transformPoint(t, [x, y]) {
  if (t.kind === "translate") return [x + t.v[0], y + t.v[1]];
  if (t.kind === "enlarge") { const [a, b] = t.centre || [0, 0]; return [a + t.k * (x - a), b + t.k * (y - b)]; }
  if (t.kind === "rotate") { const [a, b] = t.centre || [0, 0], r = (t.deg * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r); return clean([a + c * (x - a) - s * (y - b), b + s * (x - a) + c * (y - b)]); }
  if (t.kind === "matrix") { const [[p, q], [r, s]] = t.m; return [p * x + q * y, r * x + s * y]; }
  if (t.kind === "reflect") {
    const L = t.line;
    if (L.x != null) return [2 * L.x - x, y];
    if (L.y != null && L.m == null) return [x, 2 * L.y - y];
    const m = L.m, c = L.c || 0, d = (x + (y - c) * m) / (1 + m * m);
    return clean([2 * d - x, 2 * d * m - y + 2 * c]);
  }
  throw new Error(`unknown transformation ${t.kind}`);
}
const clean = (P) => P.map((v) => (Math.abs(v - Math.round(v)) < 1e-9 ? Math.round(v) : v));
