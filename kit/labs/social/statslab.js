// The statistics workspace, shared by PsychGradify and SocGradify (ctx.mode):
//   describe     paste or generate numbers: descriptive statistics and a histogram
//   correlation  add points by clicking or with the buttons; Pearson's r, Spearman's ρ, the regression line and R²,
//                with Anscombe's (1973) quartet: four real published data sets with the same r and very different shapes
//   ttest        a hypothesis-test simulator: draw two groups from populations with a true effect d, test them, and repeat
//                thousands of times to see p-values, power, Type I errors and the "winner's curse"
import { shell, canvas, slider, seg, button, panel, challenges, clear, axes, line, circle, text, C } from "../lab.js";
import * as S from "./stats.js";
import { dataLabel, table } from "./ui.js";

// Anscombe, F. J. (1973). Graphs in statistical analysis. The American Statistician, 27(1), 17–21.
export const ANSCOMBE = {
  I: { x: [10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5], y: [8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68] },
  II: { x: [10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5], y: [9.14, 8.14, 8.74, 8.77, 9.26, 8.10, 6.13, 3.10, 9.13, 7.26, 4.74] },
  III: { x: [10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5], y: [7.46, 6.77, 12.74, 7.11, 7.81, 8.84, 6.08, 5.39, 8.15, 6.42, 5.73] },
  IV: { x: [8, 8, 8, 8, 8, 8, 8, 19, 8, 8, 8], y: [6.58, 5.76, 7.71, 8.84, 8.47, 7.04, 5.25, 12.50, 5.56, 7.91, 6.89] },
};
const f2 = (v, d = 2) => (Number.isFinite(v) ? v.toFixed(d) : "–");
const pf = (p) => (p < 0.001 ? "< .001" : p.toFixed(3).replace(/^0/, ""));

export function mount(el, ctx = {}) { return ({ describe, correlation, ttest, crosstab }[ctx.mode] || describe)(el, ctx); }

// crosstab: a contingency table with row percentages, expected counts, chi-square and Cramér's V. The example counts are
// invented for practice; type in counts from a real table to analyse it.
export const CROSSTAB_EXAMPLE = { rows: ["Degree", "No degree"], cols: ["Voted", "Didn't vote"], n: [[160, 40], [210, 140]] };
function crosstab(el, ctx) {
  const E = CROSSTAB_EXAMPLE, $ = shell(el, `<div class="sx-panel"><table class="sx-tbl"><thead><tr><th></th>${E.cols.map((c) => `<th scope="col">${c}</th>`).join("")}</tr></thead><tbody>${E.rows.map((r, i) => `<tr><th scope="row">${r}</th>${E.cols.map((c, j) => `<td><label class="sr-only" for="ct${i}${j}">${r}, ${c}</label><input id="ct${i}${j}" type="number" min="0" value="${E.n[i][j]}" style="width:90px"></td>`).join("")}</tr>`).join("")}</tbody></table></div><div class="lab-ctrl"></div><div class="lab-out"></div>`);
  const out = panel($(".lab-out")), ctrl = $(".lab-ctrl"), st = {};
  dataLabel(ctrl, { real: false, how: "Invented counts for practice; enter the counts from a published table to analyse real data." });
  const ch = challenges(ctrl, ctx, [{ id: "sig", text: "Read the result for the example table", test: (x) => x.run }, { id: "none", text: "Enter counts with no association (equal row percentages)", test: (x) => x.V < 0.02 }]);
  const read = () => [0, 1].map((i) => [0, 1].map((j) => Math.max(0, Number($(`#ct${i}${j}`).value) || 0)));
  el.addEventListener("input", run);
  function run(initial) {
    const T = read(); if (T.flat().some((v) => v === 0) && T.flat().reduce((a, b) => a + b, 0) === 0) return;
    // the example table's result is shown on opening; it counts as read once the learner changes a count
    const R = S.chiSquare(T); if (initial !== true) st.run = true; st.V = R.V; ch.check(st);
    const pct = T.map((r) => r.map((v) => (100 * v) / (r[0] + r[1] || 1)));
    out(`${table(["", ...E.cols.map((c) => `${c} (row %)`), "Expected counts"], T.map((r, i) => [E.rows[i], ...pct[i].map((p) => `${p.toFixed(1)}%`), R.expected[i].map((v) => v.toFixed(1)).join(" · ")]))}
      <p><b>χ²(${R.df}) = ${f2(R.x2)}, p ${pf(R.p).startsWith("<") ? pf(R.p) : `= ${pf(R.p)}`}, Cramér's V = ${f2(R.V)}.</b> ${R.p < 0.05 ? "The difference in percentages is unlikely if there were no association in the population." : "Differences this size could easily arise by chance."}</p>
      <p class="sx-fb">Compare row percentages to describe the association; χ² says whether it is statistically significant, and Cramér's V how strong it is (0 to 1). χ² needs expected counts of at least 5 in each cell. An association isn't causation: education and voting are both linked to age and class.</p>`);
  }
  run(true);
}

function describe(el, ctx) {
  const $ = shell(el, `<div class="lab-cols"><div class="sx-panel"><label for="sx-nums"><b>Your data</b> (numbers separated by spaces, commas or new lines)</label><textarea id="sx-nums"></textarea><div class="sx-btns sx-list"></div><div class="lab-stage"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const ta = $("textarea"), cv = canvas($(".lab-stage"), { aspect: 0.45, max: 260 }), out = panel($(".lab-out")), ctrl = $(".lab-ctrl"), st = {};
  const lab = dataLabel(ctrl, { real: false, how: "The example sets are generated in your browser from known distributions; paste in your own data to analyse it." });
  const ch = challenges(ctrl, ctx, [{ id: "skew", text: "Generate a positively skewed set and see the mean pulled above the median", test: (x) => x.skewed }, { id: "outlier", text: "Add an outlier and see which statistics change most", test: (x) => x.outlier }, { id: "own", text: "Analyse a set of your own numbers", test: (x) => x.own }]);
  const r = S.rng(7), set = (a) => { ta.value = a.map((v) => +v.toFixed(1)).join(", "); run(); };
  button($(".sx-btns"), "Normal (mean 100, SD 15)", () => { st.kind = "normal"; set(Array.from({ length: 60 }, () => 100 + 15 * r.n())); });
  button($(".sx-btns"), "Positively skewed (reaction times)", () => { st.kind = "skew"; set(Array.from({ length: 60 }, () => 300 + Math.exp(5 + 0.6 * r.n()))); });
  button($(".sx-btns"), "Add an outlier", () => { st.outlier = true; ta.value += `, ${Math.round(Math.max(...nums()) * 3)}`; run(); });
  const nums = () => ta.value.split(/[\s,;]+/).map(Number).filter(Number.isFinite);
  ta.addEventListener("input", () => { st.own = nums().length >= 5; run(); });
  function run() {
    const a = nums(); if (st.kind === "skew" && S.mean(a) > S.median(a)) st.skewed = true; ch.check(st);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H); if (a.length < 2) { out("<p>Enter at least two numbers.</p>"); return; }
    const lo = Math.min(...a), hi = Math.max(...a), k = Math.min(20, Math.max(5, Math.ceil(Math.sqrt(a.length)))), w = (hi - lo) / k || 1, bins = Array(k).fill(0);
    for (const v of a) bins[Math.min(k - 1, Math.floor((v - lo) / w))]++;
    const A = axes(g, { l: 40, t: 10, w: W - 54, h: H - 40 }, { x0: lo, x1: lo + w * k, y0: 0, y1: Math.max(...bins) * 1.15, xl: "value", yl: "frequency", xt: 5, yt: 3, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    bins.forEach((b, i) => { g.fillStyle = "rgba(167,139,250,.55)"; g.fillRect(A.X(lo + i * w) + 1, A.Y(b), A.X(lo + (i + 1) * w) - A.X(lo + i * w) - 2, A.Y(0) - A.Y(b)); });
    for (const [v, col, lab] of [[S.mean(a), C.gold, "mean"], [S.median(a), C.teal, "median"]]) { line(g, [[A.X(v), A.Y(0)], [A.X(v), A.Y(Math.max(...bins) * 1.1)]], col, 2); text(g, lab, A.X(v) + 3, 20 + (lab === "median" ? 14 : 0), { size: 11, color: col }); }
    const md = S.modes(a);
    out(table(["Statistic", "Value", "What it tells you"], [["n", a.length, "number of observations"], ["Mean", f2(S.mean(a)), "the balance point; pulled by outliers and skew"], ["Median", f2(S.median(a)), "the middle value; robust to outliers"], ["Mode", md.length && md.length < 4 ? md.map((v) => f2(v)).join(", ") : "none", "most frequent value (useful for nominal data)"], ["Range", f2(S.range(a)), "max − min; very sensitive to outliers"], ["Interquartile range", f2(S.quantile(a, 0.75) - S.quantile(a, 0.25)), "spread of the middle 50%"], ["SD (n − 1)", f2(S.sd(a)), "typical distance from the mean"], ["Variance", f2(S.variance(a)), "SD squared"], ["Skewness", f2(S.skewness(a)), "> 0: long right tail; < 0: long left tail"], ["Excess kurtosis", f2(S.kurtosis(a)), "> 0: heavier tails than normal"], ["Standard error of the mean", f2(S.se(a)), "SD / √n: precision of the mean"], ["95% CI for the mean", S.ciMean(a).map((v) => f2(v)).join(" to "), "range of plausible population means (t distribution)"]]));
    lab.className = `sx-data ${st.own ? "real" : "sim"}`; lab.innerHTML = st.own ? "<b>Your data</b> analysed in your browser; nothing is uploaded." : "<b>Simulated data</b> generated in your browser from known distributions; paste in your own data to analyse it.";
  }
  set(Array.from({ length: 60 }, () => 100 + 15 * r.n())); cv.onresize = run;
  return () => cv.stop();
}

function correlation(el, ctx) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="sx-btns sx-list"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.7, max: 420 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out")), st = { seen: new Set() };
  const lab = dataLabel(ctrl, { real: true, source: "Anscombe (1973), The American Statistician 27(1): 17–21", url: "https://doi.org/10.1080/00031305.1973.10478966" });
  const ch = challenges(ctrl, ctx, [{ id: "quartet", text: "Look at all four of Anscombe's data sets: same r, very different data", test: (x) => ["I", "II", "III", "IV"].every((k) => x.seen.has(k)) }, { id: "out", text: "Make your own data with |r| > .8, then add one outlier that drops it below .3", test: (x) => x.drop }, { id: "neg", text: "Build a strong negative correlation (r < −.7)", test: (x) => x.r < -0.7 }]);
  let P = ANSCOMBE.I.x.map((x, i) => [x, ANSCOMBE.I.y[i]]), own = false, maxR = 0, showRes = false;
  seg(ctrl, ["I", "II", "III", "IV", ["own", "Your own"]], "I", (v) => { if (v === "own") { own = true; P = []; maxR = 0; } else { own = false; st.seen.add(v); P = ANSCOMBE[v].x.map((x, i) => [x, ANSCOMBE[v].y[i]]); } run(); });
  st.seen.add("I");
  const X0 = 0, X1 = 20, Y0 = 0, Y1 = 14; let A = null;
  button($(".sx-btns"), "Add a random point", () => { own = true; P.push([2 + Math.random() * 16, 1 + Math.random() * 12]); run(); });
  button($(".sx-btns"), "Add an outlier", () => { own = true; P.push([19, 1]); run(); });
  button($(".sx-btns"), "Remove the last point", () => { P.pop(); run(); });
  button($(".sx-btns"), "Show residuals", (e) => { showRes = !showRes; e.currentTarget.textContent = showRes ? "Hide residuals" : "Show residuals"; run(); });
  cv.cv.setAttribute("aria-label", "Scatter plot: click to add a point"); cv.cv.addEventListener("click", (e) => { if (!A) return; const [px, py] = cv.pos(e); own = true; const x = X0 + ((px - 44) / (cv.W - 58)) * (X1 - X0), y = Y0 + ((cv.H - 34 - py) / (cv.H - 46)) * (Y1 - Y0); if (x >= X0 && x <= X1 && y >= Y0 && y <= Y1) { P.push([x, y]); run(); } });
  function run() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    A = axes(g, { l: 44, t: 12, w: W - 58, h: H - 46 }, { x0: X0, x1: X1, y0: Y0, y1: Y1, xl: "x", yl: "y", xt: 5, yt: 7, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    const x = P.map((p) => p[0]), y = P.map((p) => p[1]);
    if (P.length >= 3) {
      const R = S.regression(x, y), r = S.pearson(x, y), sp = S.spearman(x, y);
      line(g, [[A.X(X0), A.Y(R.a + R.b * X0)], [A.X(X1), A.Y(R.a + R.b * X1)]], C.gold, 2);
      if (showRes) P.forEach(([px, py]) => line(g, [[A.X(px), A.Y(py)], [A.X(px), A.Y(R.a + R.b * px)]], "rgba(255,77,109,.7)", 1.5));
      if (own) { maxR = Math.max(maxR, Math.abs(r.r)); if (maxR > 0.8 && Math.abs(r.r) < 0.3) st.drop = true; st.r = r.r; }
      ch.check(st);
      out(`<p><b>r = ${f2(r.r, 3)}</b> (t(${r.df}) = ${f2(r.t)}, p ${pf(r.p).startsWith("<") ? pf(r.p) : `= ${pf(r.p)}`}) · Spearman's ρ = ${f2(sp.rho, 3)} · <b>ŷ = ${f2(R.a)} + ${f2(R.b, 3)}x</b> · R² = ${f2(R.r2, 3)} · n = ${P.length}</p><p>${own ? "Click the plot to add points. Watch how one extreme point can create or destroy a correlation: Spearman's ρ, based on ranks, is much less affected." : "Anscombe built these four sets to have the same mean and variance of x and y, the same correlation (r ≈ .82) and the same regression line (ŷ ≈ 3.00 + 0.50x). Only a graph shows that II is curved, III has one outlier and IV's correlation comes from a single point. Always plot your data."}</p>`);
    } else { ch.check(st); out("<p>Add at least three points by clicking the plot or with the buttons.</p>"); }
    P.forEach(([px, py]) => circle(g, A.X(px), A.Y(py), 5, C.violet, "#fff"));
    lab.className = `sx-data ${own ? "sim" : "real"}`; lab.innerHTML = own ? "<b>Your own points</b>, placed by you: illustrative, not observations." : `<b>Real data</b> <a href="https://doi.org/10.1080/00031305.1973.10478966" target="_blank" rel="noopener">Anscombe (1973), The American Statistician 27(1): 17–21</a>.`;
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}

function ttest(el, ctx) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.42, max: 240 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.42, max: 240 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  dataLabel(ctrl, { real: false, how: "Every “experiment” draws two random samples from normal populations whose true difference you set: a simulation of sampling, not real data." });
  const s = { d: 0.5, n: 20, alpha: 0.05 }, st = {}, r = S.rng(11);
  const ch = challenges(ctrl, ctx, [{ id: "t1", text: "With no true effect (d = 0), run 1,000 studies and see about 5% come out significant: Type I errors", test: (x) => x.null }, { id: "pow", text: "Find a sample size that gives at least 80% power for d = 0.5", test: (x) => x.power80 }, { id: "curse", text: "See the winner's curse: with low power, significant studies overestimate the true effect", test: (x) => x.curse }]);
  slider(ctrl, { label: "True effect size d", min: 0, max: 1.5, step: 0.05, value: s.d, fmt: (v) => v.toFixed(2), onInput: (v) => { s.d = v; reset(); } });
  slider(ctrl, { label: "Participants per group", min: 5, max: 200, step: 1, value: s.n, fmt: (v) => v, onInput: (v) => { s.n = v; reset(); } });
  slider(ctrl, { label: "Significance level α", min: 0.01, max: 0.1, step: 0.005, value: s.alpha, fmt: (v) => v.toFixed(3), onInput: (v) => { s.alpha = v; reset(); } });
  let ps = [], ds = [], last = null;
  const one = () => { const a = Array.from({ length: s.n }, () => s.d + r.n()), b = Array.from({ length: s.n }, () => r.n()), t = S.tIndependent(a, b); return { ...t, a, b }; };
  button(ctrl, "Run one study", () => { last = one(); ps.push(last.p); ds.push(last.d); draw(); }, "pri");
  button(ctrl, "Run 1,000 studies", () => { for (let i = 0; i < 1000; i++) { const t = one(); ps.push(t.p); ds.push(t.d); last = t; } draw(); });
  function reset() { ps = []; ds = []; last = null; draw(); }
  function draw() {
    let g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const A = axes(g, { l: 40, t: 10, w: W - 54, h: H - 40 }, { x0: -4, x1: 5, y0: 0, y1: 0.45, xl: "score (SD units)", yl: "density", xt: 9, yt: 3, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(1) });
    const xs = Array.from({ length: 181 }, (_, i) => -4 + i * 0.05);
    line(g, xs.map((x) => [A.X(x), A.Y(S.normPdf(x))]), C.mute, 2); line(g, xs.map((x) => [A.X(x), A.Y(S.normPdf(x - s.d))]), C.violet, 2);
    if (last) { last.b.forEach((v) => circle(g, A.X(v), A.Y(0.03), 2.5, C.mute)); last.a.forEach((v) => circle(g, A.X(v), A.Y(0.07), 2.5, C.violet)); }
    text(g, "control population", A.X(0), A.Y(0.42), { align: "center", size: 11, color: C.mute }); text(g, "treatment population", A.X(s.d) + 30, A.Y(0.44), { align: "left", size: 11, color: C.violet });
    g = cv2.g; W = cv2.W; H = cv2.H; clear(g, W, H);
    const bins = Array(20).fill(0); ps.forEach((p) => bins[Math.min(19, Math.floor(p * 20))]++);
    const B = axes(g, { l: 40, t: 10, w: W - 54, h: H - 40 }, { x0: 0, x1: 1, y0: 0, y1: Math.max(10, ...bins) * 1.1, xl: "p-value", yl: "studies", xt: 5, yt: 3, xf: (v) => v.toFixed(1), yf: (v) => v.toFixed(0) });
    bins.forEach((b, i) => { g.fillStyle = (i + 1) / 20 <= s.alpha + 1e-9 ? "rgba(64,212,177,.75)" : "rgba(167,139,250,.45)"; g.fillRect(B.X(i / 20) + 1, B.Y(b), B.X(1 / 20) - B.X(0) - 2, B.Y(0) - B.Y(b)); });
    const sig = ps.filter((p) => p < s.alpha).length, rate = ps.length ? sig / ps.length : NaN, pw = S.powerT(s.d, s.n, s.alpha), dSig = S.mean(ds.filter((_, i) => ps[i] < s.alpha));
    if (s.d === 0 && ps.length >= 1000) st.null = true; if (s.d >= 0.45 && s.d <= 0.55 && pw >= 0.8) st.power80 = true; if (s.d > 0 && pw < 0.5 && ps.length >= 500 && dSig > 1.4 * s.d) st.curse = true; ch.check(st);
    out(`${last ? `<p><b>Last study:</b> t(${last.df}) = ${f2(last.t)}, p ${pf(last.p).startsWith("<") ? pf(last.p) : `= ${pf(last.p)}`}, observed d = ${f2(last.d)}: ${last.p < s.alpha ? "significant" : "not significant"} at α = ${s.alpha}.</p>` : ""}
      <p><b>${ps.length.toLocaleString()} studies: ${Number.isFinite(rate) ? `${(rate * 100).toFixed(1)}% significant` : "none run yet"}.</b> Calculated power for d = ${s.d.toFixed(2)} with ${s.n} per group: <b>${(pw * 100).toFixed(1)}%</b>${s.d === 0 ? " (with no true effect, every significant result is a Type I error, and their rate equals α)" : `; the Type II error rate β is ${((1 - pw) * 100).toFixed(1)}%`}.${Number.isFinite(dSig) && s.d > 0 ? ` Significant studies found an average d of ${f2(dSig)} against a true ${s.d.toFixed(2)}${dSig > 1.3 * s.d ? ": the winner's curse, which is one reason small, significant findings often shrink on replication" : ""}.` : ""}</p>
      <p class="sx-fb">With no true effect, p-values are spread evenly between 0 and 1; with a real effect they pile up near 0, more so as power rises.</p>`);
  }
  draw(); cv.onresize = draw; cv2.onresize = draw;
  return () => { cv.stop(); cv2.stop(); };
}
