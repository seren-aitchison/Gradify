// Kidney function: glomerular filtration from Starling forces, glucose reabsorption with a transport maximum,
// and water reabsorption along the nephron under antidiuretic hormone (ADH).
//   GFR = Kf × (P_GC − P_BS − π_GC); glucose excreted = filtered load − reabsorbed (capped at the Tm, with a
//   little "splay" because nephrons differ).
// Typical textbook values: GFR about 125 mL/min, glucose Tm about 375 mg/min, threshold about 10–11 mmol/L.
// Simplified: pressures are set directly (no autoregulation), and the segment fractions are averages.
import { shell, canvas, slider, axes, line, clear, text, rrect, circle, challenges, panel, C } from "../lab.js";

export const gfr = ({ Pgc = 55, Pbs = 15, onc = 30, Kf = 12.5 }) => Math.max(0, Kf * (Pgc - Pbs - onc));
// glucose reabsorption: complete below the threshold load, rising to the transport maximum with "splay"
// (nephrons differ, so some saturate before others): a quadratic join between the threshold and 2Tm − threshold
export function glucose({ GFR, plasma, Tm = 375, L0 = 250 }) {
  const load = (GFR * plasma * 18) / 100; // mmol/L × 18 = mg/dL; ÷ 100 = mg/mL; × mL/min = mg/min
  const L2 = 2 * Tm - L0, reab = load <= L0 ? load : load >= L2 ? Tm : load - (load - L0) ** 2 / (2 * (L2 - L0));
  return { load, reab, excreted: Math.max(0, load - reab) };
}
// urine output against ADH (0–1): from about 20 L/day with none (as in diabetes insipidus) to about 0.5 L/day at
// maximum, roughly 1.3 L/day in between; about 600 mOsm of solute is excreted a day
export function urine({ GFR, adh }) {
  const perDay = Math.min((GFR * 1440) / 1000 * 0.15, 20 * (0.5 / 20) ** (adh ** 0.45) * (GFR / 125)), filtered = (GFR * 1440) / 1000;
  const cd = Math.max(0, filtered * 0.15 - perDay) / filtered;
  return { flow: (perDay * 1000) / 1440, perDay, osm: Math.min(1200, Math.max(50, 600 / perDay)), segments: [["Proximal tubule", 0.65], ["Loop of Henle", 0.15], ["Distal tubule", 0.05], ["Collecting duct", cd]] };
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.5, max: 300 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.5, max: 300 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { Pgc: 55, Pbs: 15, onc: 30, glu: 5, adh: 0.5 };
  const st = { glycosuria: false, obstruct: false, concentrate: false };
  const ch = challenges(ctrl, ctx, [
    { id: "gly", text: "Raise blood glucose until glucose appears in the urine", test: (x) => x.glycosuria },
    { id: "obs", text: "Block the ureter (raise Bowman's capsule pressure) until GFR halves", test: (x) => x.obstruct },
    { id: "adh", text: "Use ADH to make a small volume of concentrated urine (under 1 L a day)", test: (x) => x.concentrate },
  ]);
  slider(ctrl, { label: "Glomerular capillary pressure", min: 35, max: 75, step: 1, value: s.Pgc, unit: "mmHg", fmt: (v) => v, onInput: (v) => { s.Pgc = v; draw(); } });
  slider(ctrl, { label: "Bowman's capsule pressure", min: 5, max: 40, step: 1, value: s.Pbs, unit: "mmHg", fmt: (v) => v, onInput: (v) => { s.Pbs = v; draw(); } });
  slider(ctrl, { label: "Plasma oncotic pressure", min: 15, max: 40, step: 1, value: s.onc, unit: "mmHg", fmt: (v) => v, onInput: (v) => { s.onc = v; draw(); } });
  slider(ctrl, { label: "Blood glucose", min: 2, max: 30, step: 0.5, value: s.glu, unit: "mmol/L", fmt: (v) => v.toFixed(1), onInput: (v) => { s.glu = v; draw(); } });
  slider(ctrl, { label: "ADH", min: 0, max: 1, step: 0.05, value: s.adh, fmt: (v) => (v < 0.2 ? "low (well hydrated)" : v > 0.8 ? "high (dehydrated)" : "moderate"), onInput: (v) => { s.adh = v; draw(); } });
  function draw() {
    const G = gfr(s), gl = glucose({ GFR: G, plasma: s.glu }), u = urine({ GFR: G, adh: s.adh });
    if (gl.excreted > 1) st.glycosuria = true; if (G <= 62.5 && s.Pbs > 15) st.obstruct = true; if (u.perDay < 1 && G > 90) st.concentrate = true; ch.check(st);
    // nephron schematic with Starling forces
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    circle(g, W * 0.18, H * 0.42, H * 0.26, "rgba(255,107,107,.12)", "#ff8787"); text(g, "glomerulus", W * 0.18, H * 0.42 + 4, { align: "center", size: 11 });
    circle(g, W * 0.18, H * 0.42, H * 0.34, null, "rgba(255,255,255,.4)"); text(g, "Bowman's capsule", W * 0.18, H * 0.08 + 4, { align: "center", size: 10, color: C.mute });
    const arrow = (label, val, dir, y, col) => { text(g, `${label} ${val} mmHg ${dir}`, W * 0.36, y, { size: 12, color: col }); };
    arrow("P_GC (blood pressure)", s.Pgc, "→ out", H * 0.22, C.red); arrow("P_BS (capsule pressure)", s.Pbs, "← back", H * 0.36, C.blue); arrow("π_GC (plasma proteins)", s.onc, "← back", H * 0.5, C.violet);
    text(g, `Net filtration pressure = ${s.Pgc} − ${s.Pbs} − ${s.onc} = ${s.Pgc - s.Pbs - s.onc} mmHg`, W * 0.36, H * 0.66, { size: 12, weight: 600 });
    text(g, `GFR = K_f × NFP = ${G.toFixed(0)} mL/min (${((G * 1440) / 1000).toFixed(0)} L/day)`, W * 0.36, H * 0.8, { size: 12, weight: 600, color: C.green });
    // reabsorption bars
    let y = H * 0.9; u.segments.forEach(([nm, f], i) => { const x = 20 + i * ((W - 40) / 4); rrect(g, x, y - 6, (W - 60) / 4, 8, 3, "rgba(255,255,255,.08)"); rrect(g, x, y - 6, ((W - 60) / 4) * Math.min(1, f / 0.65), 8, 3, C.teal); text(g, `${nm} ${Math.round(f * 100)}%`, x, y - 10, { size: 10, color: C.mute }); });
    // glucose titration curve
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    const A = axes(g2, { l: 52, t: 12, w: W2 - 66, h: H2 - 46 }, { x0: 0, x1: 30, y0: 0, y1: 900, xl: "plasma glucose (mmol/L)", yl: "glucose (mg/min)", xt: 6, yt: 3, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    const pts = Array.from({ length: 121 }, (_, i) => { const p = i / 4; return { p, ...glucose({ GFR: G, plasma: p }) }; });
    line(g2, pts.map((q) => [A.X(q.p), A.Y(q.load)]), C.gold, 1.8); line(g2, pts.map((q) => [A.X(q.p), A.Y(q.reab)]), C.green, 2.2); line(g2, pts.map((q) => [A.X(q.p), A.Y(q.excreted)]), C.red, 2.2);
    text(g2, "filtered", A.X(26), A.Y(Math.min(880, pts[104].load)) - 6, { color: C.gold, size: 11 }); text(g2, "reabsorbed (Tm)", A.X(18), A.Y(375) - 6, { color: C.green, size: 11 }); text(g2, "excreted", A.X(24), A.Y(pts[96].excreted) + 14, { color: C.red, size: 11 });
    line(g2, [[A.X(s.glu), A.Y(0)], [A.X(s.glu), A.Y(900)]], "rgba(255,255,255,.35)", 1, [4, 3]);
    out(`<div class="lab-read"><div><small>GFR</small><b>${G.toFixed(0)} mL/min</b></div><div><small>Glucose filtered</small><b>${gl.load.toFixed(0)} mg/min</b></div><div><small>Glucose in urine</small><b>${gl.excreted.toFixed(0)} mg/min</b></div><div><small>Urine</small><b>${u.perDay.toFixed(1)} L/day</b></div><div><small>Urine osmolality</small><b>${u.osm.toFixed(0)} mOsm/kg</b></div></div>
      <p class="lab-msg">${gl.excreted > 1 ? "The filtered load exceeds what the SGLT transporters of the proximal tubule can reabsorb (the transport maximum), so glucose spills into the urine, as in uncontrolled diabetes mellitus. " : ""}About two-thirds of filtered water and sodium are reabsorbed in the proximal tubule whatever the body needs; ADH inserts aquaporin-2 channels in the collecting duct to fine-tune water loss. Urine volumes here are approximate.</p>`);
  }
  draw();
}
