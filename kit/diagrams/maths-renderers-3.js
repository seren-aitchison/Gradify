// Gradify Visual Learning Engine: maths renderers for statistics and probability distributions. Each recomputes from
// the raw data what the picture states:
//
//   histogram     frequency density = frequency ÷ class width for every bar; estimated counts over a range
//   boxplot       five-number summary from the data by the stated quartile method; outliers beyond 1.5 × IQR
//   scatter       the least-squares line, Pearson's r and the mean point from the data
//   barchart      totals, mode, mean and median of a frequency table
//   distribution  normal, uniform, exponential, binomial, Poisson and geometric: shaded probabilities, mean, variance
import { register, text, line, axes, col, f1, check, near, COLOURS as C } from "./renderers.js";
import { entry } from "./maths-layout.js";
import { fmt, sum, mean, median, quartiles, leastSquares, prob, pmfOf, maxK, discrete, meanVar, normalPdf, num } from "./maths-core.js";

const pad = (narrow, below) => ({ l: narrow ? 46 : 58, r: narrow ? 16 : 26, t: 40, b: below ? 58 : 40 });
const frameSpec = (spec) => ({ range: spec.range, ticks: spec.ticks, grid: spec.grid, axisLabels: spec.axisLabels, xLabelBelow: true });
const H0 = (spec, narrow, d) => spec.height?.[narrow ? 1 : 0] ?? d[narrow ? 1 : 0];

// ======================================================================== histogram
// spec: classes: [[a, b]…], freq: […], density: […] (stated), range, ticks, axisLabels, checks: [{type: "estimate", from, to, value}]
function histogram(spec, W, narrow) {
  const H = H0(spec, narrow, [360, 320]), p = pad(narrow, true), { s: base, sx, sy } = axes(frameSpec(spec), W, H, p);
  let s = base;
  spec.classes.forEach(([a, b], i) => {
    const d = spec.density[i], hi = spec.highlight?.includes(i);
    s += `<rect x="${f1(sx(a))}" y="${f1(sy(d))}" width="${f1(sx(b) - sx(a))}" height="${f1(sy(0) - sy(d))}" fill="${col(hi ? "a2" : "a1")}" fill-opacity=".28" stroke="${col(hi ? "a2" : "a1")}" stroke-width="2"/>`;
    if (spec.showFreq !== false && sx(b) - sx(a) > 26) s += text((sx(a) + sx(b)) / 2, sy(d) - 10, `f = ${fmt(spec.freq[i])}`, { size: 12, weight: 600, fill: C.soft });
  });
  return { s, H };
}
function histogramChecks(spec) {
  const bad = spec.classes.map(([a, b], i) => (near(spec.freq[i] / (b - a), spec.density[i], 1e-9) ? null : `${a}–${b}: ${spec.freq[i]} ÷ ${b - a} = ${fmt(spec.freq[i] / (b - a), 4)}, drawn ${spec.density[i]}`)).filter(Boolean);
  const gaps = spec.classes.slice(1).filter(([a], i) => a !== spec.classes[i][1]).length;
  const out = [check("every bar's height is frequency ÷ class width", !bad.length, bad.join("; ")), check("the classes meet with no gaps or overlaps", !gaps, "")];
  for (const k of spec.checks || []) if (k.type === "estimate") {
    let e = 0; spec.classes.forEach(([a, b], i) => { const o = Math.max(0, Math.min(b, k.to) - Math.max(a, k.from)); e += spec.freq[i] * (o / (b - a)); });
    out.push(check(k.name || `about ${k.value} values between ${k.from} and ${k.to}`, near(e, k.value, 1e-9), `estimate ${fmt(e, 4)}`));
  }
  return out;
}

// ======================================================================== boxplot
// spec: plots: [{label, data, summary: [min, q1, median, q3, max], outliers?: [values]}], method: "halves" | "linear" | "position",
//   range: {x}, ticks: [xticks], axisLabel
function summaryOf(pl, method) {
  const d = pl.data, [q1, m, q3] = quartiles(d, method), iqr = q3 - q1;
  if (pl.outliers) { const inside = d.filter((x) => x >= q1 - 1.5 * iqr && x <= q3 + 1.5 * iqr); return { five: [Math.min(...inside), q1, m, q3, Math.max(...inside)], out: d.filter((x) => !inside.includes(x)).sort((a, b) => a - b) }; }
  return { five: [Math.min(...d), q1, m, q3, Math.max(...d)], out: [] };
}
function boxplot(spec, W, narrow) {
  const rowH = narrow ? 78 : 84, top = 18, n = spec.plots.length, H = top + n * rowH + 44;
  const L = narrow ? (spec.plots.some((p) => p.label) ? 0 : 0) : Math.max(0, ...spec.plots.map((p) => (p.label || "").length * 7.6 + 16));
  const p = { l: (narrow ? 18 : 24) + L, r: narrow ? 18 : 26 }, [x0, x1] = spec.range.x, sx = (x) => p.l + ((x - x0) / (x1 - x0)) * (W - p.l - p.r);
  let s = "";
  const yA = top + n * rowH + 4;
  s += line(sx(x0), yA, sx(x1), yA, { stroke: C.ink, w: 1.6 });
  for (const t of spec.ticks) s += line(sx(t), yA, sx(t), yA + 6, { stroke: C.ink, w: 1.4 }) + text(sx(t), yA + 18, fmt(t), { size: 12, fill: C.soft });
  if (spec.axisLabel) s += text(W - p.r, yA + 36, spec.axisLabel, { size: 13, weight: 600, fill: C.soft, anchor: "end" });
  spec.plots.forEach((pl, i) => {
    const [mn, q1, m, q3, mx] = pl.summary, c = col(pl.colour || ["a1", "a2", "a4"][i % 3]), yc = top + i * rowH + (narrow && pl.label ? 48 : rowH / 2), h = 30;
    s += line(sx(mn), yc, sx(q1), yc, { stroke: c, w: 2 }) + line(sx(q3), yc, sx(mx), yc, { stroke: c, w: 2 });
    s += line(sx(mn), yc - 10, sx(mn), yc + 10, { stroke: c, w: 2 }) + line(sx(mx), yc - 10, sx(mx), yc + 10, { stroke: c, w: 2 });
    s += `<rect x="${f1(sx(q1))}" y="${f1(yc - h / 2)}" width="${f1(sx(q3) - sx(q1))}" height="${h}" fill="${c}" fill-opacity=".15" stroke="${c}" stroke-width="2.2"/>` + line(sx(m), yc - h / 2, sx(m), yc + h / 2, { stroke: c, w: 3 });
    for (const o of pl.outliers || []) s += text(sx(o), yc, "×", { size: 17, weight: 700, fill: c });
    if (pl.label) s += narrow ? text(p.l, yc - 30, pl.label, { size: 13, weight: 700, anchor: "start", fill: c }) : text(p.l - 14, yc, pl.label, { size: 13, weight: 700, anchor: "end", fill: c });
  });
  return { s, H: H + (spec.axisLabel ? 6 : 0) };
}
function boxplotChecks(spec) {
  const out = [];
  for (const pl of spec.plots) {
    if (!pl.data) { out.push(check(`${pl.label || "the box plot"} is drawn from data`, false, "no data to check the summary against")); continue; }
    const { five, out: o } = summaryOf(pl, spec.method || "halves");
    out.push(check(`${pl.label || "box plot"}: min, Q1, median, Q3, max = ${pl.summary.map((x) => fmt(x)).join(", ")} (${spec.method || "halves"})`, five.every((v, i) => near(v, pl.summary[i], 1e-9)), `from the data ${five.map((x) => fmt(x, 4)).join(", ")}`));
    if (pl.outliers) out.push(check(`${pl.label || "box plot"}: outliers beyond 1.5 × IQR are ${pl.outliers.join(", ") || "none"}`, o.join() === [...pl.outliers].sort((a, b) => a - b).join(), `found ${o.join(", ") || "none"}`));
  }
  return out;
}

// ======================================================================== scatter
// spec: points: [[x, y]…], line: {a, b} (y = a + bx, stated), r?: stated, meanPoint?: true, range, ticks, axisLabels, lineLabel?
function scatter(spec, W, narrow) {
  const H = H0(spec, narrow, [380, 340]), p = pad(narrow, true), { s: base, sx, sy } = axes(frameSpec(spec), W, H, p);
  let s = base;
  if (spec.line) { const [x0, x1] = spec.lineDomain || spec.range.x, f = (x) => spec.line.a + spec.line.b * x; s += line(sx(x0), sy(f(x0)), sx(x1), sy(f(x1)), { stroke: col("a2"), w: 2.6 }); if (spec.lineLabel) s += text(sx(spec.lineLabelAt[0]), sy(spec.lineLabelAt[1]), spec.lineLabel, { size: 13, weight: 700, fill: col("a2"), anchor: "start" }); }
  for (const [x, y] of spec.points) s += `<circle cx="${f1(sx(x))}" cy="${f1(sy(y))}" r="4.4" fill="${col("a1")}" fill-opacity=".85"/>`;
  if (spec.meanPoint) { const L = leastSquares(spec.points); s += `<circle cx="${f1(sx(L.mx))}" cy="${f1(sy(L.my))}" r="7" fill="none" stroke="${col("a3")}" stroke-width="2.6"/>`; }
  return { s, H };
}
function scatterChecks(spec) {
  const L = leastSquares(spec.points), out = [];
  if (spec.line) out.push(check(`the line is the least-squares line y = ${fmt(spec.line.a)} + ${fmt(spec.line.b)}x`, Math.abs(L.a - spec.line.a) <= (spec.tol ?? 0.01) * Math.max(1, Math.abs(L.a)) && Math.abs(L.b - spec.line.b) <= (spec.tol ?? 0.01) * Math.max(1, Math.abs(L.b)), `from the data y = ${fmt(L.a, 4)} + ${fmt(L.b, 4)}x`));
  if (spec.r != null) out.push(check(`r = ${spec.r}`, Math.abs(L.r - spec.r) <= 0.005, `r = ${fmt(L.r, 4)}`));
  return out;
}

// ======================================================================== barchart
// spec: categories: [labels], values: [frequencies], range: {y}, ticks: [yticks], axisLabels, highlight?: [i],
//   checks: [{type: "total" | "mode" | "mean" | "median", value}] (mean/median treat numeric categories as values)
function barchart(spec, W, narrow) {
  const n = spec.categories.length, sp = { range: { x: [0, n], y: spec.range.y }, ticks: [[], spec.ticks], grid: spec.grid, axisLabels: spec.axisLabels || ["", ""], xLabelBelow: true };
  const H = H0(spec, narrow, [340, 300]), p = pad(narrow, true), { s: base, sx, sy } = axes(sp, W, H, p);
  let s = base;
  spec.values.forEach((v, i) => {
    const w = (sx(1) - sx(0)) * 0.64, x = sx(i + 0.5) - w / 2, hi = spec.highlight?.includes(i);
    s += `<rect x="${f1(x)}" y="${f1(sy(v))}" width="${f1(w)}" height="${f1(sy(0) - sy(v))}" fill="${col(hi ? "a2" : "a1")}" fill-opacity=".3" stroke="${col(hi ? "a2" : "a1")}" stroke-width="2"/>`;
    s += text(sx(i + 0.5), sy(0) + 17, String(spec.categories[i]), { size: 12.5, fill: C.soft });
  });
  return { s, H };
}
function barchartChecks(spec) {
  const out = [], v = spec.values, xs = spec.categories.map(Number), N = sum(v);
  for (const k of spec.checks || []) {
    let got;
    if (k.type === "total") got = N;
    else if (k.type === "mode") got = spec.categories[v.indexOf(Math.max(...v))];
    else if (k.type === "mean") got = sum(xs.map((x, i) => x * v[i])) / N;
    else if (k.type === "median") got = median(xs.flatMap((x, i) => Array(v[i]).fill(x)));
    const ok = typeof got === "number" ? near(got, num(k.value), 1e-9) : String(got) === String(k.value);
    out.push(check(k.name || `${k.type} = ${k.value}`, ok, `computed ${typeof got === "number" ? fmt(got, 4) : got}`));
  }
  if (spec.range.y[1] < Math.max(...v)) out.push(check("every bar fits on the axis", false, ""));
  return out;
}

// ======================================================================== distribution
// spec: dist: {dist: "normal", mu, sigma} | {dist: "binomial", n, p} | …, range, ticks, axisLabels, shade: [a | null, b | null],
//   p (stated probability of the shaded region, rounded to dp, default 4), dp, marks: [{x, label}],
//   checks: [{type: "mean" | "variance", value} | {type: "prob", from, to, p}]
function distribution(spec, W, narrow) {
  const H = H0(spec, narrow, [360, 320]), p = pad(narrow, true), { s: base, sx, sy } = axes(frameSpec(spec), W, H, p), d = spec.dist;
  let s = base;
  const [a, b] = spec.shade || [null, null], inShade = (x) => spec.shade && (a == null || x >= a - 1e-9) && (b == null || x <= b + 1e-9);
  if (discrete(d)) {
    const f = pmfOf(d), [x0, x1] = spec.range.x, w = Math.min(0.7, 0.7) * (sx(1) - sx(0));
    for (let k = Math.max(0, Math.ceil(x0)); k <= Math.min(maxK(d), Math.floor(x1)); k++) { const y = f(k), hi = inShade(k); s += `<rect x="${f1(sx(k) - w / 2)}" y="${f1(sy(y))}" width="${f1(w)}" height="${f1(sy(0) - sy(y))}" fill="${col(hi ? "a2" : "a1")}" fill-opacity="${hi ? 0.55 : 0.25}" stroke="${col(hi ? "a2" : "a1")}" stroke-width="1.6"/>`; }
  } else {
    const [x0, x1] = spec.range.x, pdf = d.dist === "normal" ? (x) => normalPdf(x, d.mu, d.sigma) : d.dist === "uniform" ? (x) => (x >= d.a && x <= d.b ? 1 / (d.b - d.a) : 0) : (x) => (x < 0 ? 0 : d.lambda * Math.exp(-d.lambda * x));
    const N = 300, X = (i) => x0 + ((x1 - x0) * i) / N, pts = Array.from({ length: N + 1 }, (_, i) => [sx(X(i)), sy(pdf(X(i)))]);
    if (spec.shade) { const lo = Math.max(x0, a ?? x0), hi = Math.min(x1, b ?? x1), sh = []; for (let i = 0; i <= 120; i++) { const x = lo + ((hi - lo) * i) / 120; sh.push(`L${f1(sx(x))} ${f1(sy(pdf(x)))}`); } s += `<path d="M${f1(sx(lo))} ${f1(sy(0))} ${sh.join(" ")} L${f1(sx(hi))} ${f1(sy(0))} Z" fill="${col("a2")}" fill-opacity=".3"/>`; }
    s += `<path d="${pts.map(([x, y], i) => `${i ? "L" : "M"}${f1(x)} ${f1(y)}`).join(" ")}" fill="none" stroke="${col("a1")}" stroke-width="2.8"/>`;
  }
  for (const m of spec.marks || []) s += line(sx(m.x), sy(0), sx(m.x), sy(spec.range.y[1] * 0.92), { stroke: C.line, w: 1.4, dash: "5 5" }) + (m.label ? text(sx(m.x), sy(spec.range.y[1] * 0.92) - 10, m.label, { size: 12.5, weight: 600, fill: C.soft }) : "");
  if (spec.p != null && spec.pAt) s += text(sx(spec.pAt[0]), sy(spec.pAt[1]), spec.pLabel ?? `P = ${spec.p}`, { size: 14, weight: 700, fill: col("a2") });
  return { s, H };
}
function distributionChecks(spec) {
  const out = [], d = spec.dist, dp = spec.dp ?? 4, tol = 0.5 * 10 ** -dp + 1e-12;
  if (spec.shade && spec.p != null) { const v = prob(d, ...spec.shade); out.push(check(`the shaded probability is ${spec.p}`, Math.abs(v - num(spec.p)) <= tol, `computed ${v.toFixed(dp + 2)}`)); }
  const [m, v] = meanVar(d);
  for (const k of spec.checks || []) {
    if (k.type === "mean") out.push(check(k.name || `mean ${k.value}`, near(m, num(k.value), 1e-9), fmt(m, 5)));
    else if (k.type === "variance") out.push(check(k.name || `variance ${k.value}`, near(v, num(k.value), 1e-9), fmt(v, 5)));
    else if (k.type === "prob") { const q = prob(d, k.from, k.to); out.push(check(k.name || `P(${k.from ?? "−∞"} ≤ X ≤ ${k.to ?? "∞"}) = ${k.p}`, Math.abs(q - num(k.p)) <= 0.5 * 10 ** -(k.dp ?? 4) + 1e-12, q.toFixed(6))); }
  }
  return out;
}

register({
  histogram: entry(histogram, histogramChecks, [640, 380]),
  boxplot: entry(boxplot, boxplotChecks, [640, 380]),
  scatter: entry(scatter, scatterChecks, [640, 380]),
  barchart: entry(barchart, barchartChecks, [640, 380]),
  distribution: entry(distribution, distributionChecks, [640, 380]),
});
export { summaryOf };
