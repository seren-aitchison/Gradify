// Chemical equilibrium and Le Chatelier's principle: reactions run forward and back until the rates are equal.
// Disturb the system (add or remove a substance, change the volume, change the temperature) and watch it
// shift until Q equals K again. Rates use mass-action expressions so that kf/kr = Kc; K changes with
// temperature by the van 't Hoff equation from the reaction's ΔH. The K values are chosen to show the
// behaviour clearly, not taken from data; real mechanisms (and the iron catalyst in the Haber process) differ.
import { shell, seg, button, canvas, axes, line, clear, text, challenges, panel, C } from "../lab.js";

const R = 8.314;
export const SYSTEMS = {
  haber: { name: "N₂ + 3H₂ ⇌ 2NH₃", sp: ["N₂", "H₂", "NH₃"], nu: [-1, -3, 2], dH: -92000, K0: 0.5, T0: 700, init: [1, 3, 0], gas: true, cols: [C.blue, C.white, C.amber] },
  ester: { name: "A + B ⇌ C + D (endothermic)", sp: ["A", "B", "C", "D"], nu: [-1, -1, 1, 1], dH: 25000, K0: 4, T0: 300, init: [1, 1, 0, 0], gas: false, cols: [C.blue, C.teal, C.amber, C.orange] },
  no2: { name: "2NO₂ ⇌ N₂O₄", sp: ["NO₂ (brown)", "N₂O₄ (colourless)"], nu: [-2, 1], dH: -57000, K0: 8, T0: 298, init: [1, 0], gas: true, cols: [C.orange, C.white] },
};
export const Kc = (sys, T) => sys.K0 * Math.exp((-sys.dH / R) * (1 / T - 1 / sys.T0));
export const Q = (sys, c) => sys.nu.reduce((q, n, i) => q * Math.max(c[i], 1e-12) ** n, 1);

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-row tools"></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.62, max: 360 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let key = "haber", sys, c, T, V, hist, t, events = [];
  const st = { conc: false, press: false, temp: false };
  const ch = challenges(ctrl, ctx, [
    { id: "conc", text: "Add a reactant and watch more product form", test: (x) => x.conc },
    { id: "pr", text: "Halve the volume of the Haber system: equilibrium shifts to fewer gas molecules", test: (x) => x.press },
    { id: "temp", text: "Heat an exothermic equilibrium: K falls and it shifts left", test: (x) => x.temp },
  ]);
  const reset = () => { sys = SYSTEMS[key]; c = [...sys.init]; T = sys.T0; V = 1; hist = []; t = 0; events = []; run(60); draw(); };
  seg($(".top"), Object.entries(SYSTEMS).map(([k, v]) => [k, v.name]), key, (v) => { key = v; reset(); });
  function run(steps) {
    const K = Kc(sys, T), kf = 0.4, kr = kf / K;
    for (let s = 0; s < steps; s++) for (let k = 0; k < 40; k++) {
      const rf = kf * sys.nu.reduce((p, n, i) => (n < 0 ? p * Math.max(c[i], 0) ** -n : p), 1), rr = kr * sys.nu.reduce((p, n, i) => (n > 0 ? p * Math.max(c[i], 0) ** n : p), 1);
      const dt = 0.002, x = (rf - rr) * dt;
      c = c.map((v, i) => Math.max(0, v + sys.nu[i] * x)); t += dt; if (k === 0) hist.push([t, ...c]);
    }
  }
  const act = (label, fn, check) => button($(".tools"), label, () => { const before = c.slice(); fn(); events.push([t, label]); const prodBefore = before.at(-1); run(60); check?.(prodBefore); ch.check(st); draw(); });
  act("Add reactant", () => { c[0] += 0.5; }, (pb) => { if (c.at(-1) > pb + 0.01) st.conc = true; });
  act("Remove product", () => { c[c.length - 1] *= 0.3; });
  act("Halve the volume", () => { V /= 2; c = c.map((x) => x * 2); }, () => { if (key === "haber") st.press = true; });
  act("Heat (+50 K)", () => { T += 50; }, () => { if (sys.dH < 0) st.temp = true; });
  act("Cool (−50 K)", () => { T -= 50; });
  button($(".tools"), "Reset", reset);
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const tmax = Math.max(1, t), ymax = Math.max(1, ...hist.flatMap((h) => h.slice(1))) * 1.1;
    const A = axes(g, { l: 46, t: 14, w: W - 60, h: H - 50 }, { x0: 0, x1: tmax, y0: 0, y1: ymax, xl: "time", yl: "concentration (mol/dm³)", xt: 4, yt: 4, xf: () => "", yf: (v) => v.toFixed(1) });
    sys.sp.forEach((nm, i) => { line(g, hist.map((h) => [A.X(h[0]), A.Y(h[i + 1])]), sys.cols[i], 2); text(g, nm, A.X(tmax) - 4, A.Y(hist.at(-1)[i + 1]) - 5, { align: "right", size: 11, color: sys.cols[i] }); });
    for (const [te, lab] of events) { line(g, [[A.X(te), A.Y(0)], [A.X(te), A.Y(ymax)]], "rgba(255,255,255,.25)", 1, [3, 3]); text(g, lab, A.X(te) + 3, 24, { size: 9, color: C.mute }); }
    const K = Kc(sys, T), q = Q(sys, c);
    out(`<div class="lab-read"><div><small>Temperature</small><b>${T} K</b></div><div><small>K<sub>c</sub></small><b>${K.toPrecision(3)}</b></div><div><small>Q</small><b>${q.toPrecision(3)}</b></div>${sys.sp.map((nm, i) => `<div><small>[${nm.split(" ")[0]}]</small><b>${c[i].toFixed(3)}</b></div>`).join("")}</div>
      <p class="lab-msg">At equilibrium Q = K and the forward and reverse rates are equal (dynamic equilibrium). A change in concentration or pressure makes Q ≠ K for a moment and the system shifts until they match; only a temperature change alters K itself (ΔH = ${sys.dH / 1000} kJ/mol, so heating ${sys.dH < 0 ? "lowers" : "raises"} K). Illustrative K values.</p>`);
  }
  reset();
}
