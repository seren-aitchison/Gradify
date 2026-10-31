// Bacterial growth in a closed culture: lag, exponential (log), stationary and death phases from Monod
// kinetics (growth slows as the nutrient runs out), with a bactericidal or bacteriostatic antibiotic and a
// rare resistant mutant (1 in a million cells) to show how resistance is selected.
// Simplified: one nutrient, a smooth lag, and a constant death rate once the nutrient is gone.
import { shell, canvas, slider, seg, button, toggle, axes, line, clear, text, challenges, panel, rk4, C } from "../lab.js";

export function simulate({ td = 30, lag = 60, hours = 24, abx = null, abxAt = 4, resist = 1e-6, N0 = 1e6, kill = 3 } = {}) {
  const mu = Math.log(2) / (td / 60), K = 1e9, Y = K, S0 = 1, Ks = 0.05, death = 0.35; // per hour; S is nutrient, fraction of the start
  let y = [N0 * (1 - resist), N0 * resist, S0, 0], t = 0; // sensitive, resistant, nutrient, hours starved
  const out = [], h = 0.025;
  const f = (tt, [n, r, s, z]) => {
    const lagF = 1 / (1 + Math.exp(-(tt - lag / 60) / 0.15)), g = mu * lagF * Math.max(0, s) / (Ks + Math.max(0, s));
    // cells survive a few hours of starvation (stationary phase) before dying off
    const on = abx && tt >= abxAt, starve = death / (1 + Math.exp(-(z - 5) / 0.8));
    const gn = on && abx === "static" ? 0 : g;
    const dn = gn * n - (on && abx === "cidal" ? kill * n : 0) - starve * n;
    const dr = g * r - starve * r;
    return [dn, dr, -(gn * n + g * r) / Y, s < 0.02 ? 1 : 0];
  };
  for (let i = 0; t <= hours + 1e-9; i++, t = i * h) { if (i % 10 === 0) out.push({ t, n: Math.max(1e-3, y[0]), r: Math.max(1e-3, y[1]), s: y[2] }); y = rk4(f, y, t, h).map((v) => Math.max(0, v)); }
  return out;
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.62, max: 380 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { td: 30, lag: 60, abx: "none", abxAt: 4, log: true, phases: true };
  const st = { log: false, cidal: false, resist: false, static: false };
  const ch = challenges(ctrl, ctx, [
    { id: "log", text: "Switch to a linear scale and see why growth curves are plotted on a log scale", test: (x) => x.log },
    { id: "cidal", text: "Add a bactericidal antibiotic during the exponential phase", test: (x) => x.cidal },
    { id: "static", text: "Compare a bacteriostatic antibiotic", test: (x) => x.static },
    { id: "res", text: "Watch the resistant mutants take over after treatment", test: (x) => x.resist },
  ]);
  slider(ctrl, { label: "Doubling time", min: 15, max: 120, step: 5, value: s.td, unit: "min", fmt: (v) => v, onInput: (v) => { s.td = v; draw(); } });
  slider(ctrl, { label: "Lag phase", min: 0, max: 240, step: 10, value: s.lag, unit: "min", fmt: (v) => v, onInput: (v) => { s.lag = v; draw(); } });
  seg(ctrl, [["none", "No antibiotic"], ["cidal", "Bactericidal"], ["static", "Bacteriostatic"]], s.abx, (v) => { s.abx = v; draw(); });
  slider(ctrl, { label: "Add antibiotic at", min: 1, max: 20, step: 0.5, value: s.abxAt, unit: "h", fmt: (v) => v.toFixed(1), onInput: (v) => { s.abxAt = v; draw(); } });
  toggle(ctrl, "Log scale", true, (v) => { s.log = v; if (!v) st.log = true; draw(); });
  toggle(ctrl, "Label phases", true, (v) => { s.phases = v; draw(); });
  function draw() {
    const tr = simulate({ td: s.td, lag: s.lag, abx: s.abx === "none" ? null : s.abx, abxAt: s.abxAt });
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const total = tr.map((p) => p.n + p.r), mx = Math.max(...total);
    const A = axes(g, { l: 56, t: 14, w: W - 70, h: H - 52 }, s.log ? { x0: 0, x1: 24, y0: 1, y1: 1e10, logy: true, xl: "time (h)", yl: "cells per mL", xt: 6, xf: (v) => v.toFixed(0) } : { x0: 0, x1: 24, y0: 0, y1: mx * 1.1, xl: "time (h)", yl: "cells per mL", xt: 6, yt: 4, xf: (v) => v.toFixed(0), yf: (v) => v.toExponential(0) });
    line(g, tr.map((p, i) => [A.X(p.t), A.Y(total[i])]), C.green, 2.6);
    if (s.abx !== "none") { line(g, tr.map((p) => [A.X(p.t), A.Y(p.r)]), C.red, 1.6, [4, 3]); line(g, [[A.X(s.abxAt), A.Y(s.log ? 1 : 0)], [A.X(s.abxAt), A.Y(s.log ? 1e10 : mx * 1.1)]], "rgba(255,255,255,.35)", 1, [3, 3]); text(g, "antibiotic", A.X(s.abxAt) + 4, 26, { size: 11, color: C.mute }); text(g, "resistant cells", A.X(20), A.Y(Math.max(1.5, tr.at(-20).r)) - 6, { size: 11, color: C.red, align: "right" }); }
    // phases from the growth rate of the untreated culture
    const base = simulate({ td: s.td, lag: s.lag });
    const gr = base.map((p, i) => (i ? Math.log((p.n + p.r) / (base[i - 1].n + base[i - 1].r)) / 0.25 : 0)), gmax = Math.max(...gr);
    const iExp = gr.findIndex((v) => v > gmax * 0.5), iStat = gr.findIndex((v, i) => i > iExp && v < gmax * 0.1), iDeath = gr.findIndex((v, i) => i > iStat && v < -0.05);
    if (s.phases && s.abx === "none") {
      [["lag", 0, iExp], ["exponential (log)", iExp, iStat], ["stationary", iStat, iDeath > 0 ? iDeath : base.length - 1], ["death", iDeath, base.length - 1]].forEach(([nm, a, b], j) => { if (a < 0 || b <= a) return; const x = A.X((base[a].t + base[b].t) / 2); text(g, nm, x, H - 46 - (j % 2) * 14, { align: "center", size: 11, color: [C.mute, C.green, C.gold, C.red][j] }); line(g, [[A.X(base[a].t), H - 40], [A.X(base[a].t), 16]], "rgba(255,255,255,.08)", 1); });
    }
    const end = tr.at(-1), resFrac = end.r / (end.n + end.r);
    if (s.abx === "cidal" && s.abxAt > base[iExp]?.t && s.abxAt < base[iStat]?.t) st.cidal = true;
    if (s.abx === "static") st.static = true;
    if (s.abx !== "none" && resFrac > 0.5) st.resist = true;
    ch.check(st);
    out(`<div class="lab-read"><div><small>Growth rate constant</small><b>${(Math.log(2) / (s.td / 60)).toFixed(2)} h⁻¹</b></div><div><small>Generations per hour</small><b>${(60 / s.td).toFixed(2)}</b></div><div><small>Final population</small><b>${(end.n + end.r).toExponential(1)}</b></div><div><small>Resistant at 24 h</small><b>${(resFrac * 100).toFixed(resFrac < 0.01 ? 4 : 1)}%</b></div></div>
      <p class="lab-msg">In the exponential phase N = N₀ × 2<sup>t/g</sup>, a straight line on a log scale. ${s.abx === "cidal" ? "The bactericidal drug kills sensitive cells, but the rare resistant mutants survive and regrow into a resistant population: selection, not mutation caused by the drug." : s.abx === "static" ? "The bacteriostatic drug stops sensitive cells dividing without killing them; resistant mutants keep growing." : "Growth stops when the nutrient runs out (stationary phase), then cells die faster than they divide."}</p>`);
  }
  draw();
}
