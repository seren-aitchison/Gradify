// A mass on a spring with damping and an optional sinusoidal driving force: m x'' + b x' + k x = F₀ cos ωt.
// Integrated numerically (RK4) for the motion; the resonance curve is the exact steady-state amplitude.
// Linear spring and viscous damping assumed.
import { shell, canvas, slider, seg, axes, line, clear, text, circle, rrect, challenges, panel, loop, rk4, C } from "../lab.js";

export const omega0 = (m, k) => Math.sqrt(k / m);
export const zeta = (m, k, b) => b / (2 * Math.sqrt(k * m));
export const regime = (z) => (z < 0.999 ? "underdamped" : z <= 1.001 ? "critically damped" : "overdamped");
export const quality = (m, k, b) => (b > 0 ? Math.sqrt(k * m) / b : Infinity);
// steady-state amplitude and phase lag of the driven oscillator
export function steady(m, k, b, F0, w) {
  const A = F0 / Math.sqrt((k - m * w * w) ** 2 + (b * w) ** 2);
  return { A, phase: Math.atan2(b * w, k - m * w * w) };
}
export function trace({ m, k, b, F0 = 0, w = 0, x0 = 1, v0 = 0, T = 20, h = 0.005 }) {
  const f = (t, [x, v]) => [v, (F0 * Math.cos(w * t) - b * v - k * x) / m];
  let y = [x0, v0]; const out = [];
  for (let t = 0, i = 0; t <= T; t += h, i++) { if (i % 4 === 0) out.push([t, y[0], y[1]]); y = rk4(f, y, t, h); }
  return out;
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.42, max: 260 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.42, max: 260 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let mode = ctx.mode === "driven" ? "driven" : "free";
  const P = { m: 1, k: 10, b: 0.4, F0: 1, w: 2 };
  let st = { crit: false, over: false, res: false, q: false, period: false }, t = 0, y = [1, 0], tr = [];
  const ch = challenges(ctrl, ctx, [
    { id: "period", text: "Double the mass and see the period grow by √2, not 2", test: (s) => s.period },
    { id: "crit", text: "Find critical damping: the fastest return with no overshoot", test: (s) => s.crit },
    { id: "res", text: "Driven: tune the driving frequency to within 2% of resonance", test: (s) => s.res },
    { id: "q", text: "Make a sharp resonance with a quality factor above 10", test: (s) => s.q },
  ]);
  seg($(".top"), [["free", "Released from 1 m"], ["driven", "Driven by a force"]], mode, (v) => { mode = v; reset(); });
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  const mass0 = P.m;
  slider(sl, { label: "Mass m", min: 0.2, max: 5, step: 0.1, value: P.m, unit: "kg", fmt: (v) => v.toFixed(1), onInput: (v) => { P.m = v; if (Math.abs(v - 2 * mass0) < 0.05) st.period = true; reset(); } });
  slider(sl, { label: "Spring constant k", min: 1, max: 40, step: 0.5, value: P.k, unit: "N/m", fmt: (v) => v.toFixed(1), onInput: (v) => { P.k = v; reset(); } });
  const bS = slider(sl, { label: "Damping b", min: 0, max: 20, step: 0.05, value: P.b, unit: "kg/s", fmt: (v) => v.toFixed(2), onInput: (v) => { P.b = v; reset(); } });
  const wS = slider(sl, { label: "Driving frequency ω", min: 0.2, max: 8, step: 0.01, value: P.w, unit: "rad/s", fmt: (v) => v.toFixed(2), onInput: (v) => { P.w = v; reset(); } });
  const crit = document.createElement("button"); crit.type = "button"; crit.className = "lab-btn"; crit.textContent = "Show critical damping"; sl.append(crit);
  crit.addEventListener("click", () => { P.b = 2 * Math.sqrt(P.k * P.m); bS.value = P.b; reset(); });

  function reset() {
    wS.el.style.display = mode === "driven" ? "" : "none";
    t = 0; y = mode === "driven" ? [0, 0] : [1, 0]; tr = [];
    const z = zeta(P.m, P.k, P.b), w0 = omega0(P.m, P.k);
    if (mode === "free" && Math.abs(z - 1) < 0.03) st.crit = true;
    if (mode === "driven" && Math.abs(P.w - Math.sqrt(Math.max(0, w0 * w0 - P.b * P.b / (2 * P.m * P.m)))) / w0 < 0.02 && z < 0.5) st.res = true;
    if (mode === "driven" && quality(P.m, P.k, P.b) > 10 && Math.abs(P.w - w0) / w0 < 0.05) st.q = true;
    ch.check(st); report();
  }
  loop(el, (dt) => {
    const F = mode === "driven" ? P.F0 : 0, f = (tt, [x, v]) => [v, (F * Math.cos(P.w * tt) - P.b * v - P.k * x) / P.m];
    for (let i = 0; i < 8; i++) { y = rk4(f, y, t, dt / 8); t += dt / 8; }
    tr.push([t, y[0]]); while (tr.length && tr[0][0] < t - 12) tr.shift();
    draw();
  });
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const amp = mode === "driven" ? Math.max(0.3, steady(P.m, P.k, P.b, P.F0, P.w).A * 1.3) : 1.2;
    // the spring and block, on the left
    const cx = 70, top = 14, eq = H / 2, px = (x) => eq + (x / amp) * (H / 2 - 30);
    const by = px(y[0]);
    g.strokeStyle = C.mute; g.lineWidth = 2; g.beginPath(); g.moveTo(cx, top);
    const n = 14; for (let i = 1; i <= n; i++) g.lineTo(cx + (i % 2 ? 12 : -12), top + ((by - 16 - top) * i) / (n + 1)); g.lineTo(cx, by - 16); g.stroke();
    g.fillStyle = "rgba(255,255,255,.25)"; g.fillRect(cx - 30, top - 4, 60, 4);
    rrect(g, cx - 22, by - 16, 44, 32, 6, C.teal); text(g, `${P.m.toFixed(1)} kg`, cx, by + 4, { align: "center", color: "#0b0c0e", weight: 700, size: 11 });
    line(g, [[cx - 40, eq], [cx + 40, eq]], "rgba(255,255,255,.25)", 1, [3, 3]);
    // displacement against time, on the right
    const A = axes(g, { l: 170, t: 10, w: W - 184, h: H - 40 }, { x0: Math.max(0, t - 12), x1: Math.max(12, t), y0: -amp, y1: amp, xl: "time (s)", yl: "x (m)", xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(1), yt: 4 });
    line(g, tr.map(([tt, x]) => [A.X(tt), A.Y(x)]), C.teal, 2);
    if (tr.length) circle(g, A.X(tr.at(-1)[0]), A.Y(tr.at(-1)[1]), 4, C.white);
    if (mode === "free" && P.b > 0) { const z = zeta(P.m, P.k, P.b); if (z < 1) { const env = (tt) => Math.exp((-P.b / (2 * P.m)) * tt); for (const s of [1, -1]) line(g, Array.from({ length: 60 }, (_, i) => { const tt = Math.max(0, t - 12) + (i / 59) * 12; return [A.X(tt), A.Y(s * env(tt))]; }), "rgba(255,255,255,.3)", 1, [4, 3]); } }
    // the resonance curve, or energy for the free oscillator
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    if (mode === "driven") {
      const w0 = omega0(P.m, P.k), wmax = Math.max(8, 2 * w0), pts = Array.from({ length: 300 }, (_, i) => { const w = 0.01 + (i / 299) * wmax; return [w, steady(P.m, P.k, P.b, P.F0, w).A]; });
      const ymax = Math.min(10, Math.max(...pts.map((p) => p[1]))) * 1.1;
      const B = axes(g2, { l: 52, t: 10, w: W2 - 66, h: H2 - 44 }, { x0: 0, x1: wmax, y0: 0, y1: ymax, xl: "driving frequency ω (rad/s)", yl: "steady amplitude (m)", xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(1) });
      line(g2, pts.map(([w, a]) => [B.X(w), B.Y(Math.min(a, ymax))]), C.violet, 2);
      line(g2, [[B.X(w0), B.Y(0)], [B.X(w0), B.Y(ymax)]], "rgba(255,255,255,.3)", 1, [4, 3]); text(g2, "ω₀", B.X(w0) + 4, 22, { color: C.mute, size: 11 });
      const s = steady(P.m, P.k, P.b, P.F0, P.w); circle(g2, B.X(P.w), B.Y(Math.min(s.A, ymax)), 5, C.white);
    } else {
      const E = tr.map(([tt, x], i) => { const v = i ? (x - tr[i - 1][1]) / Math.max(1e-6, tt - tr[i - 1][0]) : 0; return [tt, 0.5 * P.k * x * x, 0.5 * P.m * v * v]; }).slice(1);
      const E0 = 0.5 * P.k;
      const B = axes(g2, { l: 52, t: 10, w: W2 - 66, h: H2 - 44 }, { x0: Math.max(0, t - 12), x1: Math.max(12, t), y0: 0, y1: E0 * 1.15, xl: "time (s)", yl: "energy (J)", xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(1) });
      line(g2, E.map(([tt, pe]) => [B.X(tt), B.Y(pe)]), C.blue, 1.6); line(g2, E.map(([tt, , k]) => [B.X(tt), B.Y(Math.min(k, E0 * 1.15))]), C.orange, 1.6); line(g2, E.map(([tt, pe, k]) => [B.X(tt), B.Y(Math.min(pe + k, E0 * 1.15))]), C.white, 1.6);
      text(g2, "elastic PE", B.X(Math.max(0, t - 12)) + 6, 24, { color: C.blue, size: 11 }); text(g2, "kinetic", B.X(Math.max(0, t - 12)) + 76, 24, { color: C.orange, size: 11 }); text(g2, "total", B.X(Math.max(0, t - 12)) + 130, 24, { size: 11 });
    }
  }
  function report() {
    const w0 = omega0(P.m, P.k), z = zeta(P.m, P.k, P.b), Q = quality(P.m, P.k, P.b), T0 = (2 * Math.PI) / w0;
    const s = steady(P.m, P.k, P.b, P.F0, P.w);
    out(`<div class="lab-read"><div><small>Natural period</small><b>${T0.toFixed(2)} s</b></div><div><small>ω₀ = √(k/m)</small><b>${w0.toFixed(2)} rad/s</b></div><div><small>Damping ratio ζ</small><b>${z.toFixed(2)}</b></div><div><small>Quality factor Q</small><b>${Number.isFinite(Q) ? Q.toFixed(1) : "∞"}</b></div>${mode === "driven" ? `<div><small>Steady amplitude</small><b>${s.A.toFixed(2)} m</b></div><div><small>Phase lag</small><b>${((s.phase * 180) / Math.PI).toFixed(0)}°</b></div>` : ""}</div>
      <p class="lab-msg">${mode === "free" ? `This oscillator is <b>${regime(z)}</b>. ${z < 1 ? `It overshoots and rings down inside the dashed envelope e^(−bt/2m).` : z > 1.001 ? "It creeps back without overshooting, more slowly than at critical damping." : "It returns as fast as possible without overshooting: what car suspensions and door closers aim for."} Without damping, energy passes back and forth between the spring and the mass with the total fixed.` : `After the start-up transient dies away the mass moves at the driving frequency, not its own. The amplitude peaks near ω₀ = ${w0.toFixed(2)} rad/s; the lighter the damping, the taller and narrower the peak (width about ω₀/Q). Below resonance the motion follows the force; at resonance it lags by 90°; well above, by nearly 180°.`}</p>`);
  }
  reset();
}
