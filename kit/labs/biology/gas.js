// Respiratory gas exchange: oxygen loading along a pulmonary capillary, and the haemoglobin–oxygen
// dissociation curve. Blood enters at mixed-venous PO₂ (40 mmHg) and equilibrates with alveolar gas by
// diffusion; how fast depends on membrane thickness and area (Fick's law) and on the steep part of the
// dissociation curve. Alveolar PO₂ comes from the alveolar gas equation. The Hill equation (n = 2.7,
// P₅₀ = 26.8 mmHg) is shifted right by CO₂, acid and heat (the Bohr effect).
// Simplified: one capillary, no shunt or V/Q mismatch, an empirical P₅₀ shift.
import { shell, canvas, slider, toggle, axes, line, clear, text, circle, challenges, panel, bisect, C } from "../lab.js";

export const sat = (P, P50 = 26.8, n = 2.7) => P ** n / (P ** n + P50 ** n);
export const content = (P, Hb = 15, P50) => 1.34 * Hb * sat(P, P50) + 0.003 * P; // mL O₂ per dL
export const alveolarPO2 = (Patm, FiO2 = 0.21, PaCO2 = 40) => FiO2 * (Patm - 47) - PaCO2 / 0.8;
export function capillary({ PA, D = 1, transit = 0.75, Hb = 15, P50 = 26.8 }) {
  let P = 40, Cc = content(40, Hb, P50); const out = [], dt = 0.002, k = 0.55 * D; // k: diffusing capacity per unit capillary volume (mL/dL per s per mmHg)
  for (let t = 0; t <= transit + 1e-9; t += dt) { out.push([t, P]); Cc += dt * k * (PA - P); P = bisect((p) => content(p, Hb, P50) - Cc, 0, 700, 50); }
  return out;
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.5, max: 300 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.5, max: 300 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { alt: 0, D: 1, exercise: false, Hb: 15, shift: 0 };
  const st = { alt: false, limit: false, bohr: false };
  const ch = challenges(ctrl, ctx, [
    { id: "alt", text: "Go high enough that arterial saturation falls below 85%", test: (x) => x.alt },
    { id: "lim", text: "Make diffusion limiting: thicken the membrane and exercise until blood leaves unsaturated", test: (x) => x.limit },
    { id: "bohr", text: "Shift the curve right (Bohr effect) and see more oxygen unloaded at the tissues", test: (x) => x.bohr },
  ]);
  slider(ctrl, { label: "Altitude", min: 0, max: 8800, step: 100, value: 0, unit: "m", fmt: (v) => v.toLocaleString(), onInput: (v) => { s.alt = v; draw(); } });
  slider(ctrl, { label: "Diffusing capacity", min: 0.15, max: 1.5, step: 0.05, value: 1, unit: "× normal", fmt: (v) => v.toFixed(2), onInput: (v) => { s.D = v; draw(); } });
  toggle(ctrl, "Heavy exercise (transit time 0.25 s)", false, (v) => { s.exercise = v; draw(); });
  slider(ctrl, { label: "Haemoglobin", min: 6, max: 20, step: 0.5, value: 15, unit: "g/dL", fmt: (v) => v.toFixed(1), onInput: (v) => { s.Hb = v; draw(); } });
  slider(ctrl, { label: "Curve shift (CO₂, H⁺, temp)", min: -6, max: 10, step: 1, value: 0, unit: "mmHg", fmt: (v) => (v > 0 ? `+${v}` : v), onInput: (v) => { s.shift = v; draw(); } });
  function draw() {
    // at altitude people hyperventilate, lowering arterial PCO₂ (to roughly 10 mmHg on the summit of Everest)
    const Patm = 760 * Math.exp(-s.alt / 8434), PaCO2 = Math.max(10, 40 - (3.4 * s.alt) / 1000), PA = alveolarPO2(Patm, 0.21, PaCO2), transit = s.exercise ? 0.25 : 0.75, P50 = 26.8 + s.shift;
    const tr = capillary({ PA: Math.max(1, PA), D: s.D, transit, Hb: s.Hb, P50 }), Pend = tr.at(-1)[1], Sa = sat(Pend, P50);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const A = axes(g, { l: 48, t: 12, w: W - 62, h: H - 46 }, { x0: 0, x1: 0.75, y0: 0, y1: 110, xl: "time in capillary (s)", yl: "capillary PO₂ (mmHg)", xt: 3, yt: 4, xf: (v) => v.toFixed(2), yf: (v) => v.toFixed(0) });
    line(g, [[A.X(0), A.Y(PA)], [A.X(0.75), A.Y(PA)]], "rgba(255,255,255,.35)", 1, [5, 4]); text(g, `alveolar PO₂ ${PA.toFixed(0)}`, A.X(0.74), A.Y(PA) - 5, { align: "right", size: 11, color: C.mute });
    line(g, tr.map(([t, P]) => [A.X(t), A.Y(P)]), C.red, 2.4);
    if (s.exercise) line(g, [[A.X(0.25), A.Y(0)], [A.X(0.25), A.Y(110)]], "rgba(255,255,255,.25)", 1, [3, 3]);
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    const B = axes(g2, { l: 48, t: 12, w: W2 - 62, h: H2 - 46 }, { x0: 0, x1: 120, y0: 0, y1: 1, xl: "PO₂ (mmHg)", yl: "Hb saturation", xt: 6, yt: 4, xf: (v) => v.toFixed(0), yf: (v) => `${(v * 100).toFixed(0)}%` });
    line(g2, Array.from({ length: 121 }, (_, P) => [B.X(P), B.Y(sat(P))]), "rgba(255,255,255,.35)", 1.5, [4, 3]);
    line(g2, Array.from({ length: 121 }, (_, P) => [B.X(P), B.Y(sat(P, P50))]), C.red, 2.2);
    circle(g2, B.X(Pend), B.Y(Sa), 5, C.white); text(g2, "arterial", B.X(Pend) + 6, B.Y(Sa) + 14, { size: 11 });
    circle(g2, B.X(40), B.Y(sat(40, P50)), 5, C.blue); text(g2, "tissues (40 mmHg)", B.X(40) + 6, B.Y(sat(40, P50)) + 14, { size: 11, color: C.blue });
    const unload = (content(Pend, s.Hb, P50) - content(40, s.Hb, P50)), unload0 = content(Pend, s.Hb) - content(40, s.Hb);
    if (Sa < 0.85 && s.alt > 0) st.alt = true;
    if (PA - Pend > 10 && s.D < 1) st.limit = true;
    if (s.shift >= 4 && unload > unload0 + 0.3) st.bohr = true;
    ch.check(st);
    out(`<div class="lab-read"><div><small>Barometric pressure</small><b>${Patm.toFixed(0)} mmHg</b></div><div><small>Arterial PCO₂</small><b>${PaCO2.toFixed(0)} mmHg</b></div><div><small>Alveolar PO₂</small><b>${PA.toFixed(0)} mmHg</b></div><div><small>End-capillary PO₂</small><b>${Pend.toFixed(0)} mmHg</b></div><div><small>Saturation</small><b>${(Sa * 100).toFixed(0)}%</b></div><div><small>O₂ content</small><b>${content(Pend, s.Hb, P50).toFixed(1)} mL/dL</b></div><div><small>Unloaded to tissues</small><b>${unload.toFixed(1)} mL/dL</b></div></div>
      <p class="lab-msg">Normally blood equilibrates within about a third of the 0.75 s it spends in the capillary, leaving a reserve for exercise. The flat top of the curve protects saturation when alveolar PO₂ falls a little; the steep middle releases oxygen to tissues. Barometric pressure follows a standard exponential with altitude, so values above about 5,000 m are approximate.</p>`);
  }
  draw();
}
