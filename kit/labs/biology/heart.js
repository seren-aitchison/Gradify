// The cardiac cycle: a lumped-parameter model of the left heart. The ventricle is a time-varying elastance
// (its stiffness rises in systole and falls in diastole, the double-Hill activation of Stergiopulos et al.,
// 1996); the mitral and aortic valves are one-way resistances; the arteries are a two-element Windkessel.
// It produces the Wiggers diagram (pressures and volume through two beats) and the pressure–volume loop,
// and responds to heart rate, contractility and peripheral resistance.
// Simplified: left heart only, constant left atrial pressure, no inertia, no reflexes.
import { shell, canvas, slider, axes, line, clear, text, rrect, challenges, panel, loop, C } from "../lab.js";

const BASE = { HR: 72, Emax: 2.5, Emin: 0.07, V0: 10, Pla: 8, Rmv: 0.006, Rav: 0.004, Rp: 1.3, Ca: 1.2 }; // gives about 120/80 mmHg, EDV 123 mL, SV 66 mL, EF 53%
const hill = (x, a, n) => (x / a) ** n / (1 + (x / a) ** n);
export function simulate(p = {}, beats = 8) {
  const P = { ...BASE, ...p }, T = 60 / P.HR, Tmax = 0.2 + 0.15 * T;
  // normalising constant for the double-Hill activation
  let peak = 0; for (let x = 0; x < 3; x += 0.001) peak = Math.max(peak, hill(x, 0.7, 1.9) * (1 / (1 + (x / 1.17) ** 21.9)));
  const act = (t) => { const x = (t % T) / Tmax; return (hill(x, 0.7, 1.9) / (1 + (x / 1.17) ** 21.9)) / peak; };
  let V = 120, Pao = 80; const dt = 0.0005, out = [];
  for (let t = 0; t < beats * T; t += dt) {
    const E = P.Emin + (P.Emax - P.Emin) * act(t), Plv = E * (V - P.V0);
    const Qmv = Plv < P.Pla ? (P.Pla - Plv) / P.Rmv : 0, Qav = Plv > Pao ? (Plv - Pao) / P.Rav : 0;
    if (t >= (beats - 2) * T && Math.round(t / dt) % 4 === 0) out.push({ t: t - (beats - 2) * T, V, Plv, Pao, Pla: P.Pla, mv: Qmv > 0, av: Qav > 0 });
    V += dt * (Qmv - Qav); Pao += (dt * (Qav - Pao / P.Rp)) / P.Ca;
  }
  const one = out.filter((s) => s.t >= T);
  const EDV = Math.max(...one.map((s) => s.V)), ESV = Math.min(...one.map((s) => s.V)), SV = EDV - ESV;
  return { out, T, EDV, ESV, SV, EF: SV / EDV, CO: (SV * P.HR) / 1000, sys: Math.max(...one.map((s) => s.Pao)), dia: Math.min(...one.map((s) => s.Pao)) };
}
const phaseOf = (s, prev) => (s.av ? "Ejection" : s.mv ? "Filling" : prev && prev.Plv < s.Plv ? "Isovolumetric contraction" : "Isovolumetric relaxation");

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.62, max: 380 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.5, max: 300 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const p = { HR: 72, Emax: 2.5, Rp: 1.3 };
  let R = simulate(p), cursor = 0;
  const st = { hr: false, hyper: false, failure: false };
  const ch = challenges(ctrl, ctx, [
    { id: "hr", text: "Raise the heart rate above 120 bpm and see how filling time and stroke volume change", test: (x) => x.hr },
    { id: "hyp", text: "Raise peripheral resistance until systolic pressure exceeds 140 mmHg (hypertension)", test: (x) => x.hyper },
    { id: "fail", text: "Weaken contractility until the ejection fraction falls below 40% (systolic heart failure)", test: (x) => x.failure },
  ]);
  const upd = () => { R = simulate(p); if (p.HR > 120) st.hr = true; if (R.sys > 140) st.hyper = true; if (R.EF < 0.4) st.failure = true; ch.check(st); };
  slider(ctrl, { label: "Heart rate", min: 40, max: 180, step: 1, value: p.HR, unit: "bpm", fmt: (v) => v, onInput: (v) => { p.HR = v; upd(); } });
  slider(ctrl, { label: "Contractility (E<sub>max</sub>)", min: 0.6, max: 4, step: 0.1, value: p.Emax, unit: "mmHg/mL", fmt: (v) => v.toFixed(1), onInput: (v) => { p.Emax = v; upd(); } });
  slider(ctrl, { label: "Peripheral resistance", min: 0.5, max: 2.5, step: 0.05, value: p.Rp, unit: "mmHg·s/mL", fmt: (v) => v.toFixed(2), onInput: (v) => { p.Rp = v; upd(); } });
  const info = panel(ctrl);
  function draw() {
    const o = R.out, n = o.length, s = o[Math.floor(cursor) % n], prev = o[(Math.floor(cursor) - 1 + n) % n];
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const top = { l: 50, t: 12, w: W - 64, h: (H - 60) * 0.62 }, bot = { l: 50, t: top.t + top.h + 22, w: W - 64, h: (H - 60) * 0.38 - 10 };
    const A = axes(g, top, { x0: 0, x1: 2 * R.T, y0: 0, y1: 180, yl: "pressure (mmHg)", xt: 4, yt: 3, xf: () => "", yf: (v) => v.toFixed(0) });
    line(g, o.map((x) => [A.X(x.t), A.Y(x.Pao)]), C.red, 2); line(g, o.map((x) => [A.X(x.t), A.Y(x.Plv)]), C.green, 2.2); line(g, o.map((x) => [A.X(x.t), A.Y(x.Pla)]), C.blue, 1.5, [5, 3]);
    text(g, "aorta", A.X(0.02), A.Y(R.sys) - 6, { color: C.red, size: 11 }); text(g, "left ventricle", A.X(R.T * 0.4), A.Y(R.sys) + 26, { color: C.green, size: 11 }); text(g, "left atrium", A.X(R.T * 0.6), A.Y(10) - 6, { color: C.blue, size: 11 });
    const B = axes(g, bot, { x0: 0, x1: 2 * R.T, y0: 0, y1: 200, xl: "time (s)", yl: "LV volume (mL)", xt: 4, yt: 2, xf: (v) => v.toFixed(2), yf: (v) => v.toFixed(0) });
    line(g, o.map((x) => [B.X(x.t), B.Y(x.V)]), C.gold, 2);
    line(g, [[A.X(s.t), top.t], [A.X(s.t), bot.t + bot.h]], "rgba(255,255,255,.5)", 1);
    // the PV loop
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    const L = axes(g2, { l: 50, t: 10, w: W2 * 0.62 - 60, h: H2 - 44 }, { x0: 0, x1: 200, y0: 0, y1: 180, xl: "LV volume (mL)", yl: "LV pressure", xt: 4, yt: 3, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    line(g2, o.map((x) => [L.X(x.V), L.Y(x.Plv)]), C.green, 2); g2.fillStyle = C.white; g2.beginPath(); g2.arc(L.X(s.V), L.Y(s.Plv), 4, 0, 7); g2.fill();
    // heart schematic: atrium, ventricle, valves
    const hx = W2 * 0.68, hw = W2 * 0.28, ph = phaseOf(s, prev);
    rrect(g2, hx, 16, hw, 50, 10, "rgba(77,171,247,.25)", C.blue); text(g2, "left atrium", hx + hw / 2, 46, { align: "center", size: 11 });
    rrect(g2, hx, 84, hw, 90 * (s.V / 160), 12, `rgba(16,185,129,${0.2 + 0.5 * Math.min(1, s.Plv / 130)})`, C.green); text(g2, "left ventricle", hx + hw / 2, 84 + 45 * (s.V / 160) + 4, { align: "center", size: 11 });
    text(g2, s.mv ? "mitral valve open" : "mitral valve closed", hx + hw / 2, 78, { align: "center", size: 10, color: s.mv ? C.teal : C.mute });
    text(g2, s.av ? "aortic valve open" : "aortic valve closed", hx + hw / 2, H2 - 14, { align: "center", size: 10, color: s.av ? C.red : C.mute });
    info(`<h4>${ph}</h4><p class="lab-msg">${{ Filling: "Ventricular pressure is below atrial pressure, so the mitral valve is open and blood fills the ventricle.", "Isovolumetric contraction": "The ventricle contracts with both valves closed: pressure rises steeply at constant volume until it exceeds aortic pressure.", Ejection: "Ventricular pressure exceeds aortic pressure: the aortic valve opens and blood is ejected.", "Isovolumetric relaxation": "The ventricle relaxes with both valves shut: pressure falls until it drops below atrial pressure and the mitral valve opens." }[ph]}</p>`);
  }
  function summary() {
    out(`<div class="lab-read"><div><small>Blood pressure</small><b>${R.sys.toFixed(0)}/${R.dia.toFixed(0)} mmHg</b></div><div><small>End-diastolic volume</small><b>${R.EDV.toFixed(0)} mL</b></div><div><small>Stroke volume</small><b>${R.SV.toFixed(0)} mL</b></div><div><small>Ejection fraction</small><b>${(R.EF * 100).toFixed(0)}%</b></div><div><small>Cardiac output</small><b>${R.CO.toFixed(1)} L/min</b></div></div>
      <p class="lab-msg">Cardiac output = heart rate × stroke volume. The width of the PV loop is the stroke volume and its area the work done per beat. At high heart rates diastole shortens most, so filling and stroke volume fall. Model values are for a resting adult and are approximate.</p>`);
  }
  let last = null;
  const stop = loop(el, (dt) => { cursor = (cursor + dt * (R.out.length / (2 * R.T)) * 0.5) % R.out.length; draw(); if (last !== R) { summary(); last = R; } });
  return stop;
}
