// Thermodynamics: ΔG = ΔH − TΔS for real reactions, using standard enthalpy and entropy changes at 298 K
// (rounded from standard data tables such as the NIST Chemistry WebBook) and assuming they don't change with
// temperature (the main simplification over wide ranges). Shows where ΔG changes sign, the equilibrium
// constant K = exp(−ΔG°/RT), and the four combinations of signs of ΔH and ΔS.
import { shell, seg, slider, canvas, axes, line, clear, text, circle, challenges, panel, quiz, C } from "../lab.js";

export const REACTIONS = {
  caco3: ["CaCO₃(s) → CaO(s) + CO₂(g)", 178.3, 160.5], ice: ["H₂O(s) → H₂O(l)", 6.01, 22.0], haber: ["N₂(g) + 3H₂(g) → 2NH₃(g)", -92.2, -198.7],
  water: ["2H₂(g) + O₂(g) → 2H₂O(l)", -571.6, -326.7], nh4no3: ["NH₄NO₃(s) → NH₄⁺(aq) + NO₃⁻(aq)", 25.7, 108.7], ozone: ["3O₂(g) → 2O₃(g)", 285.4, -137.5],
};
export const dG = (dH, dS, T) => dH - (T * dS) / 1000; // kJ/mol, with ΔS in J/K/mol

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div><div class="lab-q"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.62, max: 360 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let key = "caco3", T = 298;
  const st = { caco3: false, never: false, all: false };
  const ch = challenges(ctrl, ctx, [
    { id: "lime", text: "Find the temperature above which limestone decomposes", test: (x) => x.caco3 },
    { id: "all", text: "Find a reaction that is spontaneous at every temperature", test: (x) => x.all },
    { id: "never", text: "Find one that is never spontaneous", test: (x) => x.never },
  ]);
  quiz($(".lab-q"), ctx, [{ id: "ice", q: "Melting ice has ΔH > 0 and ΔS > 0. When is it spontaneous?", options: ["Always", "Never", "Above 273 K, when TΔS exceeds ΔH", "Below 273 K"], answer: 2, why: "ΔG = ΔH − TΔS is negative only when TΔS > ΔH: T > 6010 / 22.0 ≈ 273 K. At 273 K, ΔG = 0 and ice and water are at equilibrium." }]);
  seg($(".top"), Object.entries(REACTIONS).map(([k, v]) => [k, v[0]]), key, (v) => { key = v; draw(); });
  slider(ctrl, { label: "Temperature", min: 100, max: 2000, step: 5, value: T, unit: "K", fmt: (v) => v, onInput: (v) => { T = v; draw(); } });
  function draw() {
    const [eq, dH, dS] = REACTIONS[key], g0 = dG(dH, dS, T), Tc = dS ? (dH * 1000) / dS : null;
    if (key === "caco3" && T >= 1100 && T <= 1125) st.caco3 = true; if (dH < 0 && dS > 0) st.all = true; if (dH > 0 && dS < 0) st.never = true;
    if (key === "water") st.all = st.all || false; ch.check(st);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const ys = [dG(dH, dS, 100), dG(dH, dS, 2000), 0], y0 = Math.min(...ys) - 20, y1 = Math.max(...ys) + 20;
    const A = axes(g, { l: 56, t: 14, w: W - 70, h: H - 50 }, { x0: 0, x1: 2000, y0, y1, xl: "temperature (K)", yl: "ΔG (kJ/mol)", xt: 4, yt: 4, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    g.fillStyle = "rgba(64,212,177,.06)"; g.fillRect(A.X(0), A.Y(0), A.X(2000) - A.X(0), A.Y(y0) - A.Y(0)); text(g, "spontaneous (ΔG < 0)", A.X(1990), A.Y(y0) - 6, { align: "right", size: 10, color: C.teal });
    line(g, [[A.X(0), A.Y(0)], [A.X(2000), A.Y(0)]], "rgba(255,255,255,.35)", 1);
    line(g, [[A.X(0), A.Y(dG(dH, dS, 0))], [A.X(2000), A.Y(dG(dH, dS, 2000))]], C.amber, 2.4);
    circle(g, A.X(T), A.Y(g0), 5, C.white);
    if (Tc && Tc > 0 && Tc < 2000) { circle(g, A.X(Tc), A.Y(0), 4, C.red); text(g, `${Tc.toFixed(0)} K`, A.X(Tc) + 6, A.Y(0) - 6, { size: 11, color: C.red }); }
    const K = Math.exp((-g0 * 1000) / (8.314 * T));
    out(`<h4>${eq}</h4><div class="lab-read"><div><small>ΔH°</small><b>${dH} kJ/mol</b></div><div><small>ΔS°</small><b>${dS} J K⁻¹ mol⁻¹</b></div><div><small>ΔG at ${T} K</small><b>${g0.toFixed(1)} kJ/mol</b></div><div><small>K</small><b>${K > 1e4 || K < 1e-3 ? K.toExponential(1) : K.toPrecision(3)}</b></div></div>
      <p class="lab-msg">${dH < 0 && dS > 0 ? "ΔH negative and ΔS positive: spontaneous at all temperatures." : dH > 0 && dS < 0 ? "ΔH positive and ΔS negative: never spontaneous as written (the reverse reaction always is)." : dH < 0 ? `Both negative: spontaneous below ${Tc.toFixed(0)} K, where the enthalpy term wins.` : `Both positive: spontaneous above ${Tc.toFixed(0)} K, where TΔS outweighs ΔH.`} "Spontaneous" means thermodynamically favourable, not fast: kinetics decides the rate.</p>`);
  }
  draw();
}
