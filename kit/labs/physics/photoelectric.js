// The photoelectric effect: light on a metal plate in a vacuum tube, with a variable voltage between the plates.
// Einstein's relation KE_max = hf − φ sets the stopping voltage; the current is proportional to the light's
// intensity. Real work functions; the current scale is arbitrary and the emitted electrons' energies are spread
// evenly up to the maximum, which keeps the current–voltage curve simple.
import { shell, canvas, slider, select, axes, line, clear, text, circle, rrect, challenges, panel, loop, C } from "../lab.js";
import { wavelengthColour } from "./interference.js";

export const h = 6.62607015e-34, e = 1.602176634e-19, c = 2.99792458e8;
export const METALS = { caesium: ["Caesium", 2.1], potassium: ["Potassium", 2.3], sodium: ["Sodium", 2.36], calcium: ["Calcium", 2.9], zinc: ["Zinc", 4.3], copper: ["Copper", 4.7], platinum: ["Platinum", 5.65] };
export const photonEV = (nm) => (h * c) / (nm * 1e-9) / e;
export const kmax = (nm, phi) => Math.max(0, photonEV(nm) - phi);
// photocurrent (arbitrary units) at accelerating voltage V for light of wavelength nm and intensity I
export function current(V, nm, phi, I) {
  const K = photonEV(nm) - phi; if (K <= 0) return 0;
  if (V >= 0) return I;
  return I * Math.max(0, Math.min(1, (K + V) / K));
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.42, max: 260 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.5, max: 300 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const P = { nm: 400, I: 50, V: 0, metal: "sodium" };
  const pts = new Map(); let electrons = [], st = { threshold: false, stop: false, intensity: false, planck: false };
  const ch = challenges(ctrl, ctx, [
    { id: "thr", text: "Find the threshold: the longest wavelength that still frees electrons from sodium", test: (s) => s.threshold },
    { id: "stop", text: "Raise the reverse voltage until the current just stops (the stopping voltage)", test: (s) => s.stop },
    { id: "int", text: "Show that brighter red light still frees no electrons from zinc", test: (s) => s.intensity },
    { id: "planck", text: "Measure stopping voltages at three wavelengths and read Planck's constant from the slope", test: (s) => s.planck },
  ]);
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  select(sl, { label: "Metal", options: Object.entries(METALS).map(([k, [n, phi]]) => [k, `${n} (φ = ${phi} eV)`]), value: P.metal, onChange: (v) => { P.metal = v; pts.clear(); update(); } });
  slider(sl, { label: "Wavelength", min: 150, max: 750, step: 1, value: P.nm, unit: "nm", fmt: (v) => v.toFixed(0), onInput: (v) => { P.nm = v; update(); } });
  slider(sl, { label: "Intensity", min: 0, max: 100, step: 1, value: P.I, unit: "%", fmt: (v) => v.toFixed(0), onInput: (v) => { P.I = v; update(); } });
  slider(sl, { label: "Voltage across the tube", min: -6, max: 4, step: 0.01, value: P.V, unit: "V", fmt: (v) => v.toFixed(2), onInput: (v) => { P.V = v; update(); } });
  const rec = document.createElement("button"); rec.type = "button"; rec.className = "lab-btn"; rec.textContent = "Record the stopping voltage"; sl.append(rec);
  rec.addEventListener("click", () => { const phi = METALS[P.metal][1], K = kmax(P.nm, phi); if (K > 0 && P.I > 0 && current(P.V, P.nm, phi, P.I) < 0.5 && Math.abs(-P.V - K) < 0.05) { pts.set(P.nm, -P.V); update(); } else { rec.textContent = "The current hasn't just stopped yet"; setTimeout(() => { rec.textContent = "Record the stopping voltage"; }, 1500); } });

  function update() {
    const phi = METALS[P.metal][1], K = kmax(P.nm, phi), I = current(P.V, P.nm, phi, P.I);
    if (P.metal === "sodium" && K > 0 && K < 0.03) st.threshold = true;
    if (K > 0 && P.I > 0 && I < 0.5 && -P.V - K < 0.05) st.stop = true;
    if (P.metal === "zinc" && P.nm > 620 && P.I >= 90) st.intensity = true;
    if (pts.size >= 3) st.planck = true;
    ch.check(st); report(K, I);
  }
  loop(el, (dt) => {
    const phi = METALS[P.metal][1], K = kmax(P.nm, phi);
    if (K > 0 && Math.random() < (P.I / 100) * dt * 30) electrons.push({ x: 0, y: 0.15 + Math.random() * 0.7, v: Math.sqrt(Math.random() * K) * 0.6 });
    electrons = electrons.filter((q) => { q.v += P.V * dt * 0.12; q.x += q.v * dt; return q.x > -0.01 && q.x < 1; });
    draw();
  });
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const [r, gg, b] = wavelengthColour(Math.max(380, Math.min(750, P.nm))), uv = P.nm < 380;
    rrect(g, 30, 14, W - 60, H - 28, 30, "rgba(255,255,255,.04)", "rgba(255,255,255,.25)");
    const cx = 70, ax = W - 80;
    g.fillStyle = "#9aa0a6"; g.fillRect(cx - 6, 34, 12, H - 68); g.fillStyle = "#c7cbd1"; g.fillRect(ax - 4, 34, 8, H - 68);
    text(g, METALS[P.metal][0], cx, H - 20, { align: "center", size: 11, color: C.mute }); text(g, "collector", ax, H - 20, { align: "center", size: 11, color: C.mute });
    // the light beam
    if (P.I > 0) { g.fillStyle = uv ? `rgba(160,120,255,${0.1 + P.I / 300})` : `rgba(${r},${gg},${b},${0.12 + P.I / 250})`; g.beginPath(); g.moveTo(W * 0.35, 14); g.lineTo(W * 0.45, 14); g.lineTo(cx + 6, H * 0.7); g.lineTo(cx + 6, H * 0.3); g.fill(); text(g, uv ? `${P.nm} nm (ultraviolet)` : `${P.nm} nm`, W * 0.4, 30, { align: "center", size: 11 }); }
    for (const q of electrons) circle(g, cx + 8 + q.x * (ax - cx - 12), 34 + q.y * (H - 68), 2.6, C.blue);
    text(g, `${P.V >= 0 ? "+" : ""}${P.V.toFixed(2)} V`, (cx + ax) / 2, H - 22, { align: "center", size: 12, color: P.V < 0 ? C.red : C.green });
    // current against voltage, and the stopping-voltage plot
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    const phi = METALS[P.metal][1], half = W2 / 2 - 10;
    const A = axes(g2, { l: 46, t: 12, w: half - 52, h: H2 - 46 }, { x0: -6, x1: 4, y0: 0, y1: 110, xl: "voltage (V)", yl: "current", xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0), yt: 2 });
    line(g2, Array.from({ length: 200 }, (_, i) => { const V = -6 + (i / 199) * 10; return [A.X(V), A.Y(current(V, P.nm, phi, P.I))]; }), C.teal, 2);
    circle(g2, A.X(P.V), A.Y(current(P.V, P.nm, phi, P.I)), 4, C.white);
    const B = axes(g2, { l: half + 52, t: 12, w: half - 58, h: H2 - 46 }, { x0: 0, x1: 2, y0: 0, y1: 6, xl: "frequency (10¹⁵ Hz)", yl: "stopping voltage (V)", xf: (v) => v.toFixed(1), yf: (v) => v.toFixed(0), yt: 3 });
    const data = [...pts.entries()].map(([nm, Vs]) => [c / (nm * 1e-9) / 1e15, Vs]);
    for (const [f, Vs] of data) circle(g2, B.X(f), B.Y(Vs), 4, C.gold);
    if (data.length >= 2) { const n = data.length, mx = data.reduce((a, d) => a + d[0], 0) / n, my = data.reduce((a, d) => a + d[1], 0) / n, sxy = data.reduce((a, d) => a + (d[0] - mx) * (d[1] - my), 0), sxx = data.reduce((a, d) => a + (d[0] - mx) ** 2, 0), m = sxy / sxx, b0 = my - m * mx; line(g2, [[B.X(0), B.Y(b0)], [B.X(2), B.Y(b0 + 2 * m)]], C.gold, 1.4, [5, 3]); text(g2, `slope h/e → h = ${((m / 1e15) * e).toExponential(3)} J s`, B.X(0.05), 26, { size: 11, color: C.gold }); }
  }
  function report(K, I) {
    const phi = METALS[P.metal][1], f0 = (phi * e) / h, l0 = (h * c) / (phi * e) * 1e9;
    out(`<div class="lab-read"><div><small>Photon energy hf</small><b>${photonEV(P.nm).toFixed(2)} eV</b></div><div><small>Maximum kinetic energy</small><b>${K.toFixed(2)} eV</b></div><div><small>Stopping voltage</small><b>${K.toFixed(2)} V</b></div><div><small>Threshold</small><b>${l0.toFixed(0)} nm (${(f0 / 1e15).toFixed(2)} × 10¹⁵ Hz)</b></div><div><small>Current</small><b>${I.toFixed(0)}</b></div></div>
      <p class="lab-msg">Light arrives in photons of energy hf. One photon frees one electron if hf is more than the metal's work function φ, so below the threshold frequency no electrons come out however bright the light, and above it they come out instantly. Brighter light means more photons and a bigger current, but not faster electrons: their maximum energy hf − φ depends only on frequency. A reverse voltage V stops even the fastest when eV = hf − φ, so a graph of stopping voltage against frequency has slope h/e.</p>`);
  }
  update();
}
