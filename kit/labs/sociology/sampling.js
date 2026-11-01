// Sampling simulator: estimate the average weekly hours of paid work in a simulated population of 10,000 adults with
// three groups (students, workers, retired people) who differ in hours and in how easy they are to reach. Draw many
// samples by different methods and compare their bias (the average error) and spread (the standard error).
import { shell, canvas, seg, slider, button, panel, challenges, clear, axes, line, text, C } from "../lab.js";
import { dataLabel, table } from "../social/ui.js";
import { mean, sd, rng } from "../social/stats.js";

export function makePopulation(seed = 3) {
  const r = rng(seed), P = [];
  const groups = [["student", 0.15, 12, 8, 0.95], ["worker", 0.6, 36, 9, 0.2], ["retired", 0.25, 2, 4, 0.3]];
  for (const [g, share, m, s, online] of groups) for (let i = 0; i < 10000 * share; i++) P.push({ g, hours: Math.max(0, m + s * r.n()), online: r.u() < online, keen: r.u() });
  return P;
}
export const METHODS = {
  random: ["Simple random", (P, n, r) => Array.from({ length: n }, () => P[Math.floor(r.u() * P.length)])],
  stratified: ["Stratified (proportional)", (P, n, r) => ["student", "worker", "retired"].flatMap((g) => { const G = P.filter((p) => p.g === g), k = Math.round((n * G.length) / P.length); return Array.from({ length: k }, () => G[Math.floor(r.u() * G.length)]); })],
  opportunity: ["Opportunity (an online poll)", (P, n, r) => { const O = P.filter((p) => p.online); return Array.from({ length: n }, () => O[Math.floor(r.u() * O.length)]); }],
  volunteer: ["Volunteer (those who reply)", (P, n, r) => { const out = []; while (out.length < n) { const p = P[Math.floor(r.u() * P.length)]; if (r.u() < (p.g === "retired" ? 0.6 : 0.15)) out.push(p); } return out; }],
};
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row sx-mode"></div><div class="lab-cols"><div><div class="lab-stage"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.5, max: 300 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out")), P = makePopulation(), truth = mean(P.map((p) => p.hours)), r = rng(21);
  dataLabel(ctrl, { real: false, how: "A simulated population of 10,000: 15% students, 60% in work, 25% retired, with invented hours and response patterns." });
  const s = { m: "random", n: 50 }, res = {}, st = {};
  const ch = challenges(ctrl, ctx, [{ id: "all", text: "Draw 500 samples with every method", test: () => Object.keys(METHODS).every((k) => res[k]?.length >= 500) }, { id: "bias", text: "Show that a bigger opportunity sample is more precise but no less biased", test: (x) => x.bigBiased }, { id: "strat", text: "Find which method has the smallest spread", test: () => res.stratified?.length >= 500 && res.random?.length >= 500 }]);
  seg($(".lab-row.sx-mode"), Object.entries(METHODS).map(([k, v]) => [k, v[0]]), s.m, (v) => { s.m = v; run(); });
  slider(ctrl, { label: "Sample size", min: 10, max: 400, step: 10, value: s.n, fmt: (v) => v, onInput: (v) => { s.n = v; Object.keys(res).forEach((k) => delete res[k]); run(); } });
  button(ctrl, "Draw one sample", () => draw(1), "pri"); button(ctrl, "Draw 500 samples", () => draw(500));
  function draw(k) { const L = (res[s.m] ||= []); for (let i = 0; i < k; i++) L.push(mean(METHODS[s.m][1](P, s.n, r).map((p) => p.hours))); if (s.m === "opportunity" && s.n >= 200 && L.length >= 500 && Math.abs(mean(L) - truth) > 3) st.bigBiased = true; run(); }
  function run() {
    ch.check(st); const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H); const L = res[s.m] || [], bins = Array(40).fill(0); L.forEach((v) => { const b = Math.floor((v - 5) / 1); if (b >= 0 && b < 40) bins[b]++; });
    const A = axes(g, { l: 44, t: 12, w: W - 58, h: H - 46 }, { x0: 5, x1: 45, y0: 0, y1: Math.max(5, ...bins) * 1.15, xl: "sample mean (hours per week)", yl: "samples", xt: 8, yt: 3, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    bins.forEach((b, i) => { g.fillStyle = "rgba(236,72,153,.5)"; g.fillRect(A.X(5 + i) + 1, A.Y(b), A.X(1) - A.X(0) - 2, A.Y(0) - A.Y(b)); });
    line(g, [[A.X(truth), A.Y(0)], [A.X(truth), A.Y(Math.max(5, ...bins) * 1.1)]], C.gold, 2); text(g, `true mean ${truth.toFixed(1)}`, A.X(truth) + 4, 24, { size: 11, color: C.gold });
    out(`${table(["Method", "Samples", "Average estimate", "Bias", "Standard error"], Object.entries(METHODS).map(([k, v]) => { const R = res[k] || []; return [v[0], R.length, R.length ? mean(R).toFixed(1) : "–", R.length ? (mean(R) - truth).toFixed(1) : "–", R.length > 1 ? sd(R).toFixed(2) : "–"]; }))}
      <p class="sx-fb"><b>Bias</b> is systematic error that a bigger sample can't fix: the online poll reaches people in full-time work least, so it over-represents students and retired people and underestimates hours. <b>Standard error</b> is random error, which shrinks as the sample grows (by √n). Stratifying by a variable related to the outcome reduces it further.</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}
