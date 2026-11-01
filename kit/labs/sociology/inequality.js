// Inequality lab (ctx.mode):
//   lorenz   Lorenz curves from real World Bank income (or consumption) shares by quintile, with the published Gini
//   gini     a Gini calculator: type incomes, or reshape a society, and see the Lorenz curve and coefficient
//   poverty  absolute and relative poverty measured on one simulated income distribution, under different changes
import { shell, canvas, seg, button, slider, panel, challenges, clear, axes, line, circle, text, C } from "../lab.js";
import { COUNTRIES, DATA } from "./data/inequality.js";
import { dataLabel, caveat, table, esc } from "../social/ui.js";
import { gini, giniFromShares, lorenz, povertyRate, median, rng } from "../social/stats.js";

const Q = ["SI.DST.FRST.20", "SI.DST.02ND.20", "SI.DST.03RD.20", "SI.DST.04TH.20", "SI.DST.05TH.20"];
// the latest year with all five quintile shares for a country
export function quintiles(c) { const yrs = Object.keys(DATA[Q[0]].values[c] || {}).filter((y) => Q.every((k) => DATA[k].values[c]?.[y] != null)).sort(); const y = yrs.at(-1); return y ? { year: +y, shares: Q.map((k) => DATA[k].values[c][y]), gini: DATA["SI.POV.GINI"].values[c]?.[y] } : null; }
const COL = ["#ec4899", "#5aa0ff", "#fbbf24", "#34d399", "#a78bfa"];

export function mount(el, ctx = {}) { return ({ lorenz: lorenzLab, gini: giniLab, poverty: povertyLab }[ctx.mode] || lorenzLab)(el, ctx); }

function frame(g, W, H) { const A = axes(g, { l: 46, t: 12, w: Math.min(W - 60, H - 46), h: H - 46 }, { x0: 0, x1: 1, y0: 0, y1: 1, xl: "cumulative share of people (poorest first)", yl: "cumulative share of income", xt: 5, yt: 5, xf: (v) => `${Math.round(v * 100)}%`, yf: (v) => `${Math.round(v * 100)}%` }); line(g, [[A.X(0), A.Y(0)], [A.X(1), A.Y(1)]], "rgba(255,255,255,.35)", 1, [4, 4]); text(g, "line of equality", A.X(0.55), A.Y(0.62), { size: 10, color: C.mute }); return A; }

function lorenzLab(el, ctx) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-out"></div></div><div class="lab-ctrl"><div class="sx-btns sx-list" role="group" aria-label="Countries"></div></div></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.75, max: 440 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out")), btns = $(".sx-btns");
  dataLabel(ctrl, { real: true, source: "World Bank, World Development Indicators: income shares by quintile (SI.DST.*) and Gini index (SI.POV.GINI)", url: "https://data.worldbank.org/indicator/SI.POV.GINI", retrieved: DATA["SI.POV.GINI"].retrieved });
  const sel = new Set(["SWE", "GBR", "ZAF"]), st = {};
  const ch = challenges(ctrl, ctx, [{ id: "most", text: "Find the most unequal country here (the curve furthest from the line of equality)", test: (x) => x.sel?.has("ZAF") && x.sel.size >= 3 }, { id: "grouped", text: "Compare the Gini from quintiles with the published Gini, and read why they differ", test: (x) => x.read }]);
  btns.innerHTML = Object.keys(COUNTRIES).filter((c) => quintiles(c)).map((c) => `<button type="button" data-c="${c}" aria-pressed="${sel.has(c)}">${esc(COUNTRIES[c])}</button>`).join("");
  btns.addEventListener("click", (e) => { const b = e.target.closest("[data-c]"); if (!b) return; const c = b.dataset.c; if (sel.has(c)) sel.delete(c); else if (sel.size < 5) sel.add(c); b.setAttribute("aria-pressed", sel.has(c)); st.touched = true; run(); });
  function run() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H); const A = frame(g, W, H), rows = [];
    [...sel].forEach((c, i) => { const q = quintiles(c); if (!q) return; let cum = 0; const pts = [[0, 0], ...q.shares.map((s, k) => { cum += s / 100; return [(k + 1) / 5, cum]; })]; line(g, pts.map(([x, y]) => [A.X(x), A.Y(y)]), COL[i], 2.5); pts.forEach(([x, y]) => circle(g, A.X(x), A.Y(y), 3, COL[i])); rows.push([`<span style="color:${COL[i]}">●</span> ${esc(COUNTRIES[c])}`, q.year, `${q.shares[0].toFixed(1)}%`, `${q.shares[4].toFixed(1)}%`, (q.shares[4] / q.shares[0]).toFixed(1), q.gini?.toFixed(1) ?? "–", (giniFromShares(q.shares) * 100).toFixed(1)]); });
    st.sel = st.touched ? sel : new Set(); st.read = st.touched && sel.size >= 2; ch.check(st);
    out(`${table(["Country", "Year", "Poorest 20%", "Richest 20%", "Ratio", "Gini (published)", "Gini from quintiles"], rows)}<p class="sx-fb">The Gini coefficient is the area between the curve and the line of equality, as a share of the whole triangle (here × 100). Computed from five quintiles it comes out lower than the published figure, because inequality within each fifth is invisible. Countries also differ in whether surveys measure income or consumption.</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}

function giniLab(el, ctx) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div></div><div class="lab-ctrl"><label for="sx-inc"><b>Incomes</b> (one per person)</label><textarea id="sx-inc" style="width:100%;min-height:90px"></textarea><div class="sx-btns sx-list"></div></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.75, max: 420 }), ta = $("textarea"), out = panel($(".lab-out")), ctrl = $(".lab-ctrl");
  dataLabel(ctrl, { real: false, how: "Invented incomes for small imaginary societies; type in any numbers you like." });
  const st = {};
  const ch = challenges(ctrl, ctx, [{ id: "zero", text: "Make a perfectly equal society (Gini 0)", test: (x) => x.g === 0 && x.n >= 3 }, { id: "high", text: "Make a society with a Gini above 0.6", test: (x) => x.g > 0.6 }, { id: "transfer", text: "Apply a transfer from rich to poor and see the Gini fall", test: (x) => x.transfer }]);
  const set = (a) => { ta.value = a.join(", "); run(); };
  const b = $(".sx-btns");
  [["Everyone equal", [30, 30, 30, 30, 30]], ["A typical spread", [12, 18, 22, 26, 30, 35, 41, 50, 65, 110]], ["One very rich person", [10, 10, 10, 10, 10, 10, 10, 10, 10, 500]]].forEach(([l, a]) => button(b, l, () => set(a)));
  button(b, "Transfer 10 from richest to poorest", () => { const a = nums(); if (a.length < 2) return; const hi = a.indexOf(Math.max(...a)), lo = a.indexOf(Math.min(...a)); const amt = Math.min(10, (a[hi] - a[lo]) / 2); a[hi] -= amt; a[lo] += amt; st.transfer = true; set(a.map((v) => +v.toFixed(2))); });
  const nums = () => ta.value.split(/[\s,;]+/).map(Number).filter((v) => Number.isFinite(v) && v >= 0);
  ta.addEventListener("input", run);
  function run() {
    const a = nums(), g = cv.g, W = cv.W, H = cv.H; clear(g, W, H); const A = frame(g, W, H);
    if (a.length < 2) { out("<p>Enter at least two incomes.</p>"); return; }
    const G = gini(a), L = lorenz(a); st.g = +G.toFixed(6); st.n = a.length; ch.check(st);
    g.save(); g.fillStyle = "rgba(236,72,153,.18)"; g.beginPath(); g.moveTo(A.X(0), A.Y(0)); L.forEach(([x, y]) => g.lineTo(A.X(x), A.Y(y))); g.lineTo(A.X(0), A.Y(0)); g.fill(); g.restore();
    line(g, L.map(([x, y]) => [A.X(x), A.Y(y)]), C.pink, 2.5); L.forEach(([x, y]) => circle(g, A.X(x), A.Y(y), 3, C.pink));
    const sorted = [...a].sort((x, y) => x - y), tot = sorted.reduce((s, v) => s + v, 0), top = sorted.slice(-Math.max(1, Math.round(a.length / 10))).reduce((s, v) => s + v, 0);
    out(`<p><b>Gini = ${G.toFixed(3)}</b> for ${a.length} people (0 = everyone has the same; values near 1 = one person has nearly everything). The richest tenth hold ${((top / tot) * 100).toFixed(0)}% of the total; the median is ${median(a).toFixed(1)}.</p><p class="sx-fb">The shaded area between the line of equality and the Lorenz curve, divided by the whole triangle, is the Gini. It summarises the whole distribution in one number, so two very different societies can share a Gini: look at the curve, or at ratios like the top 10% share (the Palma ratio compares the top 10% with the bottom 40%).</p>`);
  }
  set([12, 18, 22, 26, 30, 35, 41, 50, 65, 110]); cv.onresize = run;
  return () => cv.stop();
}

// a simulated income distribution (log-normal), for the poverty explorer
export function population(n = 2000, seed = 4) { const r = rng(seed); return Array.from({ length: n }, () => Math.exp(Math.log(30000) + 0.55 * r.n())); }
export const SCENARIOS = {
  base: ["Starting point", (a) => a],
  all10: ["Everyone's income rises 10%", (a) => a.map((v) => v * 1.1)],
  top: ["Only the richest fifth gain 30%", (a) => { const cut = [...a].sort((x, y) => x - y)[Math.floor(a.length * 0.8)]; return a.map((v) => (v >= cut ? v * 1.3 : v)); }],
  middle: ["Middle incomes rise 15%; the poorest stay put", (a) => { const s = [...a].sort((x, y) => x - y), lo = s[Math.floor(a.length * 0.3)], hi = s[Math.floor(a.length * 0.7)]; return a.map((v) => (v >= lo && v <= hi ? v * 1.15 : v)); }],
  recession: ["Recession: everyone's income falls 10%", (a) => a.map((v) => v * 0.9)],
};
function povertyLab(el, ctx) {
  const $ = shell(el, `<div class="lab-row sx-mode"></div><div class="lab-cols"><div><div class="lab-stage"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.5, max: 320 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out")), base = population(), s = { sc: "base", fixed: 15000, frac: 0.6 }, st = { seen: new Set() };
  dataLabel(ctrl, { real: false, how: "2,000 simulated household incomes from a log-normal distribution with a median of about £30,000; illustrative, not ONS data." });
  caveat(ctrl, "The UK's headline relative measure counts households below 60% of the median equivalised household income, before or after housing costs (DWP, Households Below Average Income). An absolute line here is held fixed in real terms.");
  const ch = challenges(ctrl, ctx, [{ id: "all", text: "Raise everyone's income and see relative poverty stay the same while absolute poverty falls", test: (x) => x.seen.has("all10") }, { id: "rec", text: "See relative poverty fall in a recession", test: (x) => x.seen.has("recession") }, { id: "mid", text: "Find a change that raises relative poverty without anyone becoming poorer", test: (x) => x.seen.has("middle") }]);
  seg($(".lab-row.sx-mode"), Object.entries(SCENARIOS).map(([k, v]) => [k, v[0]]), s.sc, (v) => { s.sc = v; run(); });
  slider(ctrl, { label: "Absolute line (fixed income)", min: 5000, max: 25000, step: 500, value: s.fixed, fmt: (v) => `£${v.toLocaleString()}`, onInput: (v) => { s.fixed = v; run(); } });
  slider(ctrl, { label: "Relative line (share of median)", min: 0.4, max: 0.7, step: 0.05, value: s.frac, fmt: (v) => `${Math.round(v * 100)}%`, onInput: (v) => { s.frac = v; run(); } });
  function run() {
    const a = SCENARIOS[s.sc][1](base), rel = povertyRate(a, s.frac), b0 = povertyRate(base, s.frac), abs = a.filter((v) => v < s.fixed).length / a.length, abs0 = base.filter((v) => v < s.fixed).length / base.length; st.seen.add(s.sc); ch.check(st);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H); const bins = Array(40).fill(0), w = 100000 / 40; a.forEach((v) => { if (v < 100000) bins[Math.floor(v / w)]++; });
    const A = axes(g, { l: 46, t: 12, w: W - 60, h: H - 46 }, { x0: 0, x1: 100000, y0: 0, y1: Math.max(...bins) * 1.15, xl: "household income (£)", yl: "households", xt: 5, yt: 3, xf: (v) => `${v / 1000}k`, yf: (v) => v.toFixed(0) });
    bins.forEach((n, i) => { g.fillStyle = "rgba(236,72,153,.5)"; g.fillRect(A.X(i * w) + 1, A.Y(n), A.X(w) - A.X(0) - 2, A.Y(0) - A.Y(n)); });
    for (const [x, col, lab] of [[rel.line, C.gold, `relative line ${Math.round(s.frac * 100)}% of median`], [s.fixed, C.teal, "absolute line"], [median(a), C.white, "median"]]) { line(g, [[A.X(x), A.Y(0)], [A.X(x), A.Y(Math.max(...bins) * 1.1)]], col, 2, lab === "median" ? [4, 4] : null); text(g, lab, A.X(x) + 4, 24 + (col === C.teal ? 14 : col === C.white ? 28 : 0), { size: 10, color: col }); }
    out(`${table(["Measure", "Starting point", "After this change"], [["Median income", `£${Math.round(median(base)).toLocaleString()}`, `£${Math.round(median(a)).toLocaleString()}`], [`Relative poverty (< ${Math.round(s.frac * 100)}% of median)`, `${(b0.rate * 100).toFixed(1)}%`, `${(rel.rate * 100).toFixed(1)}%`], [`Absolute poverty (< £${s.fixed.toLocaleString()})`, `${(abs0 * 100).toFixed(1)}%`, `${(abs * 100).toFixed(1)}%`]])}
      <p class="sx-fb">Relative poverty measures exclusion from the living standards of one's society (Townsend, 1979); absolute poverty measures the ability to meet a fixed standard. The two can move in opposite directions, which is why governments, campaigners and sociologists argue about which to use, and why the UK publishes both.</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}
