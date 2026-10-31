// Reaction kinetics (ctx.mode "kinetics"): zero-, first- and second-order rate laws, their integrated plots and
// half-lives, an experiment of unknown order to identify, and the Arrhenius equation.
// Reaction energy profiles (ctx.mode "profile"): activation energy, enthalpy change, one- and two-step
// mechanisms, and the Maxwell–Boltzmann distribution of molecular energies at your temperature.
// Catalysis (ctx.mode "catalysis"): a catalyst provides a route with a lower activation energy; the fraction of
// collisions with enough energy, and so the rate, rises sharply. The energy distribution uses the exact
// Maxwell–Boltzmann result for the fraction of molecules with energy above E (three dimensions); the
// surface-catalysis animation is illustrative.
import { shell, seg, slider, button, toggle, canvas, axes, line, clear, text, circle, challenges, panel, loop, randn, C } from "../lab.js";

const R = 8.314;
export const conc = (order, A0, k, t) => (order === 0 ? Math.max(0, A0 - k * t) : order === 1 ? A0 * Math.exp(-k * t) : A0 / (1 + k * A0 * t));
export const halfLife = (order, A0, k) => (order === 0 ? A0 / (2 * k) : order === 1 ? Math.LN2 / k : 1 / (k * A0));
// fraction of molecules with kinetic energy above E (J/mol) at T, three-dimensional Maxwell–Boltzmann
const erfc = (x) => { const t = 1 / (1 + 0.3275911 * x), y = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429)))); return y * Math.exp(-x * x); };
export const fractionAbove = (E, T) => { const x = E / (R * T); return 2 * Math.sqrt(x / Math.PI) * Math.exp(-x) + erfc(Math.sqrt(x)); };
const mbDensity = (E, T) => (2 / Math.sqrt(Math.PI)) * Math.sqrt(E) * (R * T) ** -1.5 * Math.exp(-E / (R * T));

export function mount(el, ctx = {}) { return ctx.mode === "profile" ? profile(el, ctx, false) : ctx.mode === "catalysis" ? profile(el, ctx, true) : kinetics(el, ctx); }

function kinetics(el, ctx) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.62, max: 360 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let order = 1, plot = "A", k = 0.1, A0 = 1, Ea = 50, Tk = 298, mystery = null, data = null;
  const st = { half: false, mystery: false, arr: false };
  const ch = challenges(ctrl, ctx, [
    { id: "half", text: "Show that only a first-order half-life doesn't depend on the starting concentration", test: (x) => x.half },
    { id: "unk", text: "Identify the order of the mystery reaction from which plot is a straight line", test: (x) => x.mystery },
    { id: "arr", text: "Use the Arrhenius equation: double the rate with a 10 K rise (find the Ea that does it)", test: (x) => x.arr },
  ]);
  seg($(".top"), [["0", "Zero order"], ["1", "First order"], ["2", "Second order"]], "1", (v) => { order = Number(v); mystery = null; draw(); });
  seg($(".top"), [["A", "[A] against t"], ["lnA", "ln[A] against t"], ["inv", "1/[A] against t"]], plot, (v) => { plot = v; draw(); });
  slider(ctrl, { label: "Rate constant k", min: 0.01, max: 0.5, step: 0.01, value: k, fmt: (v) => v.toFixed(2), onInput: (v) => { k = v; draw(); } });
  slider(ctrl, { label: "[A]₀", min: 0.2, max: 2, step: 0.1, value: A0, unit: "mol/dm³", fmt: (v) => v.toFixed(1), onInput: (v) => { A0 = v; if (order === 1) st.half = true; draw(); } });
  button(ctrl, "Mystery experiment", () => { mystery = Math.floor(Math.random() * 3); data = Array.from({ length: 12 }, (_, i) => { const t = i * 2.5; return [t, conc(mystery, 1, [0.03, 0.12, 0.25][mystery], t) * (1 + 0.015 * randn())]; }); ask.hidden = false; draw(); });
  const ask = document.createElement("div"); ask.className = "lab-chips"; ask.hidden = true; ctrl.append(ask);
  ask.innerHTML = `<span class="lab-msg">Order of the mystery reaction?</span>${[0, 1, 2].map((n) => `<button type="button" data-o="${n}">${n}</button>`).join("")}`;
  ask.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b || mystery == null) return; const ok = Number(b.dataset.o) === mystery; b.classList.add(ok ? "ok" : "no"); if (ok) { st.mystery = true; ch.check(st); } });
  slider(ctrl, { label: "Activation energy (Arrhenius)", min: 10, max: 120, step: 1, value: Ea, unit: "kJ/mol", fmt: (v) => v, onInput: (v) => { Ea = v; draw(); } });
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const tf = (c) => (plot === "A" ? c : plot === "lnA" ? Math.log(Math.max(c, 1e-6)) : 1 / Math.max(c, 1e-6));
    const T = 30, pts = Array.from({ length: 121 }, (_, i) => { const t = (i / 120) * T; return [t, tf(conc(order, A0, k, t))]; }).filter((p) => Number.isFinite(p[1]));
    const show = mystery == null ? pts : data.map(([t, c]) => [t, tf(c)]);
    const ys = show.map((p) => p[1]).filter((v) => Number.isFinite(v) && Math.abs(v) < 60), y0 = Math.min(0, ...ys), y1 = Math.max(...ys) * 1.1 + 0.01;
    const A = axes(g, { l: 50, t: 14, w: W - 64, h: H - 50 }, { x0: 0, x1: T, y0, y1, xl: "time (s)", yl: { A: "[A]", lnA: "ln [A]", inv: "1/[A]" }[plot], xt: 6, yt: 4, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(1) });
    if (mystery == null) { line(g, show.map(([t, y]) => [A.X(t), A.Y(y)]), C.amber, 2.4); const th = halfLife(order, A0, k); if (th < T && plot === "A") { line(g, [[A.X(th), A.Y(0)], [A.X(th), A.Y(A0 / 2)], [A.X(0), A.Y(A0 / 2)]], "rgba(255,255,255,.3)", 1, [3, 3]); text(g, `t½ = ${th.toFixed(1)} s`, A.X(th) + 4, A.Y(A0 / 2) - 6, { size: 11 }); } }
    else show.forEach(([t, y]) => circle(g, A.X(t), A.Y(y), 4, C.gold));
    const k2 = Math.exp((Ea * 1000 / R) * (1 / Tk - 1 / (Tk + 10)));
    if (Math.abs(k2 - 2) < 0.08) st.arr = true; ch.check(st);
    out(`<div class="lab-read"><div><small>Rate law</small><b>rate = k[A]${order === 0 ? "⁰" : order === 2 ? "²" : ""}</b></div><div><small>Half-life</small><b>${halfLife(order, A0, k).toFixed(2)} s</b></div><div><small>Units of k</small><b>${["mol dm⁻³ s⁻¹", "s⁻¹", "dm³ mol⁻¹ s⁻¹"][order]}</b></div><div><small>k(308 K)/k(298 K) at Ea = ${Ea}</small><b>${k2.toFixed(2)}</b></div></div>
      <p class="lab-msg">${mystery != null ? "Mystery data (with measurement noise): try each plot; the straight one gives the order." : ["Zero order: [A] falls linearly; the half-life shrinks as [A] falls.", "First order: ln[A] falls linearly with slope −k; the half-life, ln 2/k, is constant.", "Second order: 1/[A] rises linearly with slope k; the half-life doubles each time."][order]} Arrhenius: k = A e^(−Ea/RT), so a 10 K rise near room temperature doubles the rate when Ea is about 53 kJ/mol.</p>`);
  }
  draw();
}

function profile(el, ctx, cat) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.55, max: 320 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.5, max: 280 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { Ea: 80, dH: -40, T: 298, two: false, catOn: cat, catEa: 50 };
  const st = { endo: false, two: false, temp: false, cat: false };
  const ch = challenges(ctrl, ctx, cat ? [
    { id: "cat", text: "Lower the catalysed activation energy until the rate rises a million-fold", test: (x) => x.cat },
    { id: "temp", text: "Compare: how much hotter would you need to get the same gain without a catalyst?", test: (x) => x.temp },
  ] : [
    { id: "endo", text: "Make the reaction endothermic", test: (x) => x.endo },
    { id: "two", text: "Show a two-step mechanism with an intermediate", test: (x) => x.two },
    { id: "temp", text: "Raise the temperature and see the fraction of molecules above Ea grow", test: (x) => x.temp },
  ]);
  slider(ctrl, { label: "Activation energy Ea", min: 20, max: 150, step: 1, value: s.Ea, unit: "kJ/mol", fmt: (v) => v, onInput: (v) => { s.Ea = v; draw(); } });
  slider(ctrl, { label: "Enthalpy change ΔH", min: -120, max: 80, step: 1, value: s.dH, unit: "kJ/mol", fmt: (v) => v, onInput: (v) => { s.dH = v; if (v > 0) st.endo = true; draw(); } });
  slider(ctrl, { label: "Temperature", min: 200, max: 1000, step: 5, value: s.T, unit: "K", fmt: (v) => v, onInput: (v) => { s.T = v; if (v >= 350) st.temp = true; draw(); } });
  if (cat) slider(ctrl, { label: "Catalysed Ea", min: 10, max: 150, step: 1, value: s.catEa, unit: "kJ/mol", fmt: (v) => v, onInput: (v) => { s.catEa = v; s.moved = true; draw(); } });
  else toggle(ctrl, "Two-step mechanism", false, (v) => { s.two = v; if (v) st.two = true; draw(); });
  let ph = 0;
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const Ea = Math.max(s.Ea, s.dH + 5), y0 = Math.min(0, s.dH) - 20, y1 = Math.max(Ea, 0) + 30;
    const A = axes(g, { l: 50, t: 14, w: W - 64, h: H - 46 }, { x0: 0, x1: 1, y0, y1, xl: "reaction progress", yl: "energy (kJ/mol)", xt: 1, yt: 4, xf: () => "", yf: (v) => v.toFixed(0) });
    const curve = (ea, two) => Array.from({ length: 200 }, (_, i) => { const x = i / 199; let y; if (!two) y = x < 0.5 ? ea * Math.sin(Math.PI * x) ** 2 : s.dH + (ea - s.dH) * Math.sin(Math.PI * x) ** 2; else { const mid = s.dH / 2 + 15; y = x < 0.25 ? ea * Math.sin(2 * Math.PI * x) ** 2 : x < 0.5 ? mid + (ea - mid) * Math.sin(2 * Math.PI * x) ** 2 : x < 0.75 ? mid + (ea * 0.75 - mid) * Math.sin(2 * Math.PI * x) ** 2 : s.dH + (ea * 0.75 - s.dH) * Math.sin(2 * Math.PI * x) ** 2; } return [A.X(x), A.Y(y)]; });
    line(g, curve(Ea, s.two), C.amber, 2.4);
    if (cat) line(g, curve(Math.min(s.catEa, Ea), false), C.teal, 2, [5, 3]);
    line(g, [[A.X(0), A.Y(0)], [A.X(0.2), A.Y(0)]], "rgba(255,255,255,.4)", 1); line(g, [[A.X(0.8), A.Y(s.dH)], [A.X(1), A.Y(s.dH)]], "rgba(255,255,255,.4)", 1);
    text(g, "reactants", A.X(0.01), A.Y(0) + 14, { size: 11 }); text(g, "products", A.X(0.99), A.Y(s.dH) + 14, { size: 11, align: "right" });
    text(g, `Ea = ${Ea} kJ/mol`, A.X(0.5), A.Y(Ea) - 8, { align: "center", size: 11, color: C.amber }); text(g, `ΔH = ${s.dH} kJ/mol`, A.X(0.85), A.Y((s.dH) / 2), { size: 11, color: s.dH < 0 ? C.green : C.red });
    if (s.two) text(g, "intermediate", A.X(0.5), A.Y(s.dH / 2 + 15) + 14, { align: "center", size: 10, color: C.mute });
    if (cat) text(g, `catalysed Ea = ${Math.min(s.catEa, Ea)}`, A.X(0.5), A.Y(Math.min(s.catEa, Ea)) + 16, { align: "center", size: 11, color: C.teal });
    // Maxwell–Boltzmann distribution
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    const Emax = 40000, B = axes(g2, { l: 50, t: 12, w: W2 - 64, h: H2 - 44 }, { x0: 0, x1: Emax / 1000, y0: 0, y1: mbDensity(R * 200 / 2, 200) * 1.05, xl: "molecular kinetic energy (kJ/mol)", yl: "fraction", xt: 4, yt: 1, xf: (v) => v.toFixed(0), yf: () => "" });
    line(g2, Array.from({ length: 200 }, (_, i) => { const E = (i / 199) * Emax; return [B.X(E / 1000), B.Y(mbDensity(E, s.T))]; }), C.white, 2);
    const scaleE = (ea) => Math.min(Emax * 0.95, ea * 1000 * (Emax / 150000) * 3); // energy axis compressed so Ea fits
    const shade = (ea, col) => { const e0 = scaleE(ea); g2.fillStyle = col; g2.beginPath(); g2.moveTo(B.X(e0 / 1000), B.Y(0)); for (let i = 0; i <= 60; i++) { const E = e0 + (i / 60) * (Emax - e0); g2.lineTo(B.X(E / 1000), B.Y(mbDensity(E, s.T))); } g2.lineTo(B.X(Emax / 1000), B.Y(0)); g2.fill(); line(g2, [[B.X(e0 / 1000), B.Y(0)], [B.X(e0 / 1000), 14]], col.replace(/[\d.]+\)$/, "1)"), 1.5, [4, 3]); };
    shade(Ea, "rgba(245,159,0,.35)"); if (cat) shade(Math.min(s.catEa, Ea), "rgba(20,212,196,.25)");
    text(g2, "energy axis compressed: the shaded tail is schematic; the numbers below are exact", 54, 22, { size: 10, color: C.mute });
    const f = fractionAbove(Ea * 1000, s.T), fc = cat ? fractionAbove(Math.min(s.catEa, Ea) * 1000, s.T) : null, gain = fc ? fc / f : null;
    if (cat && gain > 1e6) st.cat = true;
    const Tneeded = cat ? (Ea * 1000) / (R * Math.log(1 / Math.max(fc, 1e-300))) : null; if (cat && fc && s.moved && s.catEa < s.Ea - 10) st.temp = true;
    ch.check(st);
    out(`<div class="lab-read"><div><small>Fraction with E ≥ Ea at ${s.T} K</small><b>${f.toExponential(2)}</b></div>${cat ? `<div><small>With the catalyst</small><b>${fc.toExponential(2)}</b></div><div><small>Rate increase</small><b>${gain > 1e4 ? gain.toExponential(1) : gain.toFixed(1)} ×</b></div><div><small>Same gain by heating alone</small><b>about ${Tneeded.toFixed(0)} K</b></div>` : `<div><small>Rise for +10 K</small><b>${(fractionAbove(Ea * 1000, s.T + 10) / f).toFixed(2)} ×</b></div>`}</div>
      <p class="lab-msg">${cat ? "A catalyst offers a different pathway with a lower activation energy; it doesn't change ΔH or the position of equilibrium, and it is regenerated at the end. Heterogeneous catalysts work by adsorbing reactants on their surface, weakening bonds; enzymes are biological catalysts." : "Only collisions with at least the activation energy (and the right orientation) react. Raising the temperature shifts the distribution so that a much larger fraction exceeds Ea: this, more than the extra collisions, is why rates rise so steeply with temperature."}</p>`);
  }
  draw();
}
