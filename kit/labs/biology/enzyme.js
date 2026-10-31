// Enzyme kinetics: Michaelis–Menten rates with competitive, uncompetitive and non-competitive (mixed with
// equal constants) inhibition, the Lineweaver–Burk plot, a noisy simulated assay to fit, and a mystery
// inhibitor to identify. The kinetics are the standard steady-state equations. The temperature and pH curves
// are illustrative (an Arrhenius rise times a two-state unfolding model, and a bell around the optimum pH).
import { shell, canvas, slider, seg, button, axes, line, clear, circle, text, challenges, panel, randn, C } from "../lab.js";

// v = Vmax·S / (Km·(1 + I/Ki) + S·(1 + I/Ki′))
export function rate(S, { Vmax, Km, I = 0, Ki = 1, type = "none" }) {
  const a = type === "competitive" || type === "noncompetitive" ? 1 + I / Ki : 1;
  const b = type === "uncompetitive" || type === "noncompetitive" ? 1 + I / Ki : 1;
  return (Vmax * S) / (Km * a + S * b);
}
export const apparent = ({ Vmax, Km, I = 0, Ki = 1, type = "none" }) => {
  const a = type === "competitive" || type === "noncompetitive" ? 1 + I / Ki : 1, b = type === "uncompetitive" || type === "noncompetitive" ? 1 + I / Ki : 1;
  return { Vmax: Vmax / b, Km: (Km * a) / b };
};
const tempFactor = (T, opt = 37) => { const k = Math.exp(0.06 * (T - 25)); const unf = 1 / (1 + Math.exp((T - (opt + 8)) / 2.5)); return k * unf / (Math.exp(0.06 * (opt - 25)) / (1 + Math.exp(-8 / 2.5))); };
const phFactor = (pH, opt = 7) => Math.exp(-((pH - opt) ** 2) / (2 * 1.1 ** 2));

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.55, max: 330 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.42, max: 260 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const E = { Vmax: 100, Km: 2, I: 0, Ki: 1, type: "none", T: 37, pH: 7 };
  let view = "mm", data = [], mystery = null, guess = { Vmax: 60, Km: 5 };
  const TYPES = ["competitive", "uncompetitive", "noncompetitive"];
  const st = { fit: false, mystery: false, half: false, denat: false };
  const ch = challenges(ctrl, ctx, [
    { id: "half", text: "Read K<sub>m</sub> off the curve: set [S] equal to K<sub>m</sub> and see v = V<sub>max</sub>/2", test: (x) => x.half },
    { id: "fit", text: "Fit the simulated assay: estimate V<sub>max</sub> and K<sub>m</sub> within 10%", test: (x) => x.fit },
    { id: "mystery", text: "Identify the mystery inhibitor from its Lineweaver–Burk plot", test: (x) => x.mystery },
    { id: "denat", text: "Raise the temperature until most of the enzyme has denatured", test: (x) => x.denat },
  ]);
  seg($(".top"), [["mm", "v against [S]"], ["lb", "Lineweaver–Burk"]], view, (v) => { view = v; draw(); });
  seg($(".top"), [["none", "No inhibitor"], ...TYPES.map((t) => [t, t[0].toUpperCase() + t.slice(1)])], E.type, (v) => { E.type = v; mystery = null; draw(); });
  let probe = 6;
  slider(ctrl, { label: "[I] inhibitor", min: 0, max: 5, step: 0.1, value: 0, unit: "mM", fmt: (v) => v.toFixed(1), onInput: (v) => { E.I = v; draw(); } });
  slider(ctrl, { label: "Probe [S]", min: 0.1, max: 20, step: 0.1, value: probe, unit: "mM", fmt: (v) => v.toFixed(1), onInput: (v) => { probe = v; draw(); } });
  slider(ctrl, { label: "Temperature", min: 0, max: 70, step: 1, value: 37, unit: "°C", fmt: (v) => v, onInput: (v) => { E.T = v; if (tempFactor(v) < 0.1 && v > 40) st.denat = true; ch.check(st); draw(); } });
  slider(ctrl, { label: "pH", min: 2, max: 12, step: 0.1, value: 7, fmt: (v) => v.toFixed(1), onInput: (v) => { E.pH = v; draw(); } });
  const row = document.createElement("div"); row.className = "lab-row"; ctrl.append(row);
  button(row, "Run assay", () => { const Vt = 40 + Math.random() * 120, Kt = 0.5 + Math.random() * 8; data = { Vmax: Vt, Km: Kt, pts: [0.25, 0.5, 1, 2, 4, 8, 16].map((S) => [S, rate(S, { Vmax: Vt, Km: Kt }) * (1 + 0.04 * randn())]) }; fitBox.hidden = false; draw(); });
  button(row, "Mystery inhibitor", () => { mystery = TYPES[Math.floor(Math.random() * 3)]; E.I = 0; view = "lb"; $.root.querySelector(".top .lab-seg button[data-v=lb]")?.click(); askBox.hidden = false; draw(); });
  const fitBox = document.createElement("div"); fitBox.className = "lab-ctrl"; fitBox.hidden = true; ctrl.append(fitBox);
  slider(fitBox, { label: "Your V<sub>max</sub>", min: 10, max: 200, step: 1, value: guess.Vmax, fmt: (v) => v, onInput: (v) => { guess.Vmax = v; draw(); } });
  slider(fitBox, { label: "Your K<sub>m</sub>", min: 0.2, max: 12, step: 0.1, value: guess.Km, unit: "mM", fmt: (v) => v.toFixed(1), onInput: (v) => { guess.Km = v; draw(); } });
  const askBox = document.createElement("div"); askBox.className = "lab-chips"; askBox.hidden = true; ctrl.append(askBox);
  askBox.innerHTML = `<span class="lab-msg">Which type is it?</span>${TYPES.map((t) => `<button type="button" data-t="${t}">${t}</button>`).join("")}`;
  askBox.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b || !mystery) return; const ok = b.dataset.t === mystery; b.classList.add(ok ? "ok" : "no"); if (ok) { st.mystery = true; ch.check(st); } });
  const k = () => tempFactor(E.T) * phFactor(E.pH);
  function draw() {
    const t = mystery || E.type, Iset = mystery ? [0, 1, 2.5] : [E.I];
    const params = (I) => ({ ...E, Vmax: E.Vmax * k(), I, type: t });
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const box = { l: 52, t: 14, w: W - 66, h: H - 52 }, cols = [C.green, C.orange, C.pink];
    if (view === "mm") {
      const A = axes(g, box, { x0: 0, x1: 20, y0: 0, y1: 120, xl: "[S] (mM)", yl: "rate v (µmol/min)", xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
      line(g, Array.from({ length: 200 }, (_, i) => { const S = (i / 199) * 20; return [A.X(S), A.Y(rate(S, { Vmax: E.Vmax, Km: E.Km }))]; }), "rgba(255,255,255,.25)", 1.5, [5, 4]);
      Iset.forEach((I, j) => line(g, Array.from({ length: 200 }, (_, i) => { const S = (i / 199) * 20; return [A.X(S), A.Y(rate(S, params(I)))]; }), cols[j], 2.4));
      const vp = rate(probe, params(Iset[0])); circle(g, A.X(probe), A.Y(vp), 5, C.white);
      text(g, `v = ${vp.toFixed(1)}`, A.X(probe) + 8, A.Y(vp) - 8, { size: 11 });
      if (data.pts) { data.pts.forEach(([S, v]) => circle(g, A.X(S), A.Y(v), 4, C.gold)); line(g, Array.from({ length: 120 }, (_, i) => { const S = (i / 119) * 20; return [A.X(S), A.Y(rate(S, guess))]; }), C.gold, 1.6, [3, 3]); }
    } else {
      const A = axes(g, box, { x0: -1.5, x1: 4, y0: 0, y1: 0.12, xl: "1/[S] (per mM)", yl: "1/v", xf: (v) => v.toFixed(1), yf: (v) => v.toFixed(2) });
      line(g, [[A.X(0), A.Y(0)], [A.X(0), A.Y(0.12)]], "rgba(255,255,255,.3)", 1);
      Iset.forEach((I, j) => { const ap = apparent(params(I)); const f = (x) => (ap.Km / ap.Vmax) * x + 1 / ap.Vmax; line(g, [[A.X(-1 / ap.Km), A.Y(0)], [A.X(4), A.Y(f(4))]], cols[j], 2.2); if (mystery) text(g, `[I] = ${I} mM`, A.X(3.2), A.Y(f(3.2)) - 6, { color: cols[j], size: 11 }); });
      text(g, "y-intercept = 1/V_max · x-intercept = −1/K_m", box.l + 6, box.t + 12, { size: 11, color: C.mute });
    }
    // temperature and pH
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    const half = W2 / 2;
    const A1 = axes(g2, { l: 40, t: 10, w: half - 56, h: H2 - 44 }, { x0: 0, x1: 70, y0: 0, y1: 1.3, xl: "temperature (°C)", yl: "relative rate", xt: 7, yt: 2, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(1) });
    line(g2, Array.from({ length: 140 }, (_, i) => { const T = i / 2; return [A1.X(T), A1.Y(tempFactor(T))]; }), C.orange, 2); circle(g2, A1.X(E.T), A1.Y(tempFactor(E.T)), 4, C.white);
    const A2 = axes(g2, { l: half + 34, t: 10, w: half - 50, h: H2 - 44 }, { x0: 2, x1: 12, y0: 0, y1: 1.3, xl: "pH", xt: 5, yt: 2, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(1) });
    line(g2, Array.from({ length: 100 }, (_, i) => { const p = 2 + i / 10; return [A2.X(p), A2.Y(phFactor(p))]; }), C.teal, 2); circle(g2, A2.X(E.pH), A2.Y(phFactor(E.pH)), 4, C.white);
    const ap = apparent(params(Iset[0]));
    if (!mystery && E.type === "none" && E.I === 0 && Math.abs(probe - E.Km) < 0.15 && Math.abs(k() - 1) < 0.05) st.half = true;
    if (data.pts && Math.abs(guess.Vmax - data.Vmax) / data.Vmax < 0.1 && Math.abs(guess.Km - data.Km) / data.Km < 0.1) st.fit = true;
    ch.check(st);
    out(mystery ? `<p><b>Mystery inhibitor</b> at three concentrations. Look at what stays the same: lines meeting on the y-axis mean V<sub>max</sub> is unchanged; parallel lines mean K<sub>m</sub>/V<sub>max</sub> is unchanged; lines meeting on the x-axis mean K<sub>m</sub> is unchanged.</p>`
      : `<div class="lab-read"><div><small>Apparent V<sub>max</sub></small><b>${ap.Vmax.toFixed(1)}</b></div><div><small>Apparent K<sub>m</sub></small><b>${ap.Km.toFixed(2)} mM</b></div><div><small>Temperature × pH factor</small><b>${k().toFixed(2)}</b></div>${data.pts ? `<div><small>Your fit</small><b>${guess.Vmax} / ${guess.Km.toFixed(1)}</b></div>` : ""}</div>
      <p class="lab-msg">${{ none: "K<sub>m</sub> is the substrate concentration giving half the maximum rate: a low K<sub>m</sub> means high affinity.", competitive: "A competitive inhibitor binds the active site, so enough substrate outcompetes it: K<sub>m</sub> rises, V<sub>max</sub> is unchanged.", uncompetitive: "An uncompetitive inhibitor binds only the enzyme–substrate complex: both V<sub>max</sub> and K<sub>m</sub> fall by the same factor.", noncompetitive: "A non-competitive inhibitor binds elsewhere with equal affinity for E and ES: V<sub>max</sub> falls and K<sub>m</sub> is unchanged." }[E.type]}${data.pts ? " Gold points: a simulated assay with 4% noise. Adjust your V<sub>max</sub> and K<sub>m</sub> until the dashed curve fits." : ""}</p>`);
  }
  draw();
}
