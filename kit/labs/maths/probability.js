// Probability by simulation, in two modes (ctx.mode):
//   "lln": the law of large numbers. Flip coins or roll dice and watch the running proportion of successes settle
//          towards the true probability, while the absolute gap between successes and expectation keeps wandering.
//   "clt": the central limit theorem. Take many samples of size n from a skewed or uniform population and plot
//          the sample means: their histogram becomes bell-shaped, with spread σ/√n.
// Random numbers come from the browser's generator; every run is different, which is the point.
import { shell, canvas, slider, select, button, panel, challenges, clear, fmt, C } from "../lab.js";
import { plane, curve } from "./plot.js";

export const EVENTS = { coin: { label: "Coin lands heads", p: 1 / 2 }, six: { label: "Die shows a six", p: 1 / 6 }, even: { label: "Die shows an even number", p: 1 / 2 }, two: { label: "Two dice total 7", p: 6 / 36 } };
export const draw = { coin: () => Math.random() < 0.5, six: () => Math.random() * 6 < 1, even: () => Math.floor(Math.random() * 6) % 2 === 1, two: () => Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 2 === 7 };
export const POPS = {
  uniform: { label: "Uniform on [0, 1]", mean: 0.5, sd: Math.sqrt(1 / 12), r: () => Math.random() },
  exp: { label: "Exponential (skewed), mean 1", mean: 1, sd: 1, r: () => -Math.log(1 - Math.random()) },
  die: { label: "One die roll", mean: 3.5, sd: Math.sqrt(35 / 12), r: () => Math.floor(Math.random() * 6) + 1 },
};
// k sample means, each of n draws from r (a population's sampler)
export function sampleMeans(r, n, k) { const out = []; for (let i = 0; i < k; i++) { let s = 0; for (let j = 0; j < n; j++) s += r(); out.push(s / n); } return out; }
// mean and sample standard deviation
export function meanSd(xs) { const m = xs.length, mu = m ? xs.reduce((a, b) => a + b, 0) / m : NaN; return { mu, sd: m > 1 ? Math.sqrt(xs.reduce((a, b) => a + (b - mu) ** 2, 0) / (m - 1)) : NaN }; }
// the normal density the central limit theorem predicts
export const normalPdf = (x, mu, sd) => Math.exp(-((x - mu) ** 2) / (2 * sd * sd)) / (sd * Math.sqrt(2 * Math.PI));
export function mount(el, ctx = {}) { return ctx.mode === "clt" ? clt(el, ctx) : lln(el, ctx); }

function lln(el, ctx) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.6, max: 380 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let ev = "coin", trials = [], hits = 0;
  const ch = challenges(ctrl, ctx, [
    { id: "k1", text: "Run 1,000 trials", test: (x) => x.n >= 1000 },
    { id: "k10", text: "Run 10,000 trials and get within 0.01 of the true probability", test: (x) => x.n >= 10000 && x.gap < 0.01 },
    { id: "six", text: "Do the same experiment for rolling a six", test: (x) => x.ev === "six" && x.n >= 1000 },
  ]);
  select(ctrl, { label: "Event", options: Object.entries(EVENTS).map(([k, v]) => [k, v.label]), value: ev, onChange: (v) => { ev = v; reset(); } });
  for (const k of [1, 10, 100, 1000]) button(ctrl, `+${k.toLocaleString()} trial${k > 1 ? "s" : ""}`, () => add(k));
  button(ctrl, "Reset", () => reset());
  function reset() { trials = []; hits = 0; run(); }
  function add(k) { for (let i = 0; i < k; i++) { hits += draw[ev]() ? 1 : 0; trials.push(hits / (trials.length + 1)); } run(); }
  function run() {
    const p = EVENTS[ev].p, n = trials.length, g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const P = plane(g, W, H, { x0: 0, x1: Math.max(10, n), y0: 0, y1: 1, pad: 26 }); P.draw();
    curve(g, P, () => p, C.green, 1.5, [6, 4]);
    g.save(); g.strokeStyle = C.blue; g.lineWidth = 2; g.beginPath(); const stride = Math.max(1, Math.floor(n / 1500));
    for (let i = 0; i < n; i += stride) { const x = P.X(i + 1), y = P.Y(trials[i]); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.restore();
    const prop = n ? hits / n : NaN, gap = Math.abs(prop - p);
    if (n) ch.check({ n, gap, ev });
    out(n ? `<p>${n.toLocaleString()} trials · successes <b>${hits.toLocaleString()}</b> · proportion <b>${fmt(prop, 4)}</b> · true probability <b>${fmt(p, 4)}</b> · gap ${fmt(gap, 4)}</p><p>The <i>proportion</i> settles towards p (the law of large numbers), but the <i>count</i> of successes can still drift: here it is ${fmt(hits - n * p, 1)} away from the expected ${fmt(n * p, 1)}. Luck doesn't "even out"; it gets diluted.</p>` : `<p>Add some trials to start.</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}

function clt(el, ctx) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.6, max: 380 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let pop = "exp", n = 1, means = [];
  const ch = challenges(ctrl, ctx, [
    { id: "n1", text: "Plot 1,000 sample means with n = 1: the histogram is the population's shape", test: (x) => x.n === 1 && x.m >= 1000 },
    { id: "n30", text: "With n = 30 from the skewed population, see a bell curve", test: (x) => x.n >= 30 && x.pop === "exp" && x.m >= 1000 },
    { id: "sd", text: "Check the spread: get the sample means' SD within 10% of σ/√n", test: (x) => x.m >= 1000 && x.ratio > 0.9 && x.ratio < 1.1 && x.n >= 4 },
  ]);
  select(ctrl, { label: "Population", options: Object.entries(POPS).map(([k, v]) => [k, v.label]), value: pop, onChange: (v) => { pop = v; means = []; run(); } });
  slider(ctrl, { label: "Sample size n", min: 1, max: 50, step: 1, value: n, fmt: (v) => v.toFixed(0), onInput: (v) => { n = v; means = []; run(); } });
  for (const k of [100, 1000]) button(ctrl, `Take ${k.toLocaleString()} samples`, () => { means.push(...sampleMeans(POPS[pop].r, n, k)); run(); });
  button(ctrl, "Clear", () => { means = []; run(); });
  function run() {
    const Q = POPS[pop], se = Q.sd / Math.sqrt(n), g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const x0 = pop === "die" ? 0.5 : pop === "exp" ? 0 : 0, x1 = pop === "die" ? 6.5 : pop === "exp" ? Math.max(3, Q.mean + 4 * se) : 1, bins = 40, w = (x1 - x0) / bins;
    const counts = new Array(bins).fill(0); for (const m of means) { const i = Math.floor((m - x0) / w); if (i >= 0 && i < bins) counts[i]++; }
    const dens = counts.map((c) => c / Math.max(1, means.length) / w), peak = Math.max(1 / (se * Math.sqrt(2 * Math.PI)), ...dens, 0.1);
    const P = plane(g, W, H, { x0, x1, y0: 0, y1: peak * 1.15, pad: 24 }); P.draw();
    g.save(); g.fillStyle = "rgba(90,160,255,.45)"; dens.forEach((d, i) => g.fillRect(P.X(x0 + i * w) + 0.5, P.Y(d), P.X(x0 + (i + 1) * w) - P.X(x0 + i * w) - 1, P.Y(0) - P.Y(d))); g.restore();
    if (n > 1) curve(g, P, (x) => normalPdf(x, Q.mean, se), C.amber, 2, [6, 4]);
    const m = means.length, { mu, sd } = meanSd(means);
    if (m) ch.check({ n, m, pop, ratio: sd / se });
    out(m ? `<p>${m.toLocaleString()} sample means of size ${n} · their mean <b>${fmt(mu, 4)}</b> (population μ = ${fmt(Q.mean, 4)}) · their SD <b>${fmt(sd, 4)}</b> (σ/√n = ${fmt(se, 4)})</p><p>${n === 1 ? "With n = 1 you just see the population itself." : "The dashed curve is the normal distribution the central limit theorem predicts: N(μ, σ²/n). It fits better as n grows, even for a skewed population."}</p>` : `<p>Take some samples to start.</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}
