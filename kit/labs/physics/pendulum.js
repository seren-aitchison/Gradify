// Pendulums: the full nonlinear pendulum against its small-angle approximation, and the double pendulum, whose
// motion is chaotic. Point masses on light rigid rods, no friction or air resistance; integrated with RK4.
import { shell, canvas, slider, seg, axes, line, clear, text, circle, challenges, panel, loop, rk4, C } from "../lab.js";

// exact period of a simple pendulum of length L released from amplitude th0 (rad), by the AGM method
export function period(L, g, th0) {
  let a = 1, b = Math.cos(th0 / 2);
  for (let i = 0; i < 30; i++) [a, b] = [(a + b) / 2, Math.sqrt(a * b)];
  return (2 * Math.PI * Math.sqrt(L / g)) / a;
}
export const smallPeriod = (L, g) => 2 * Math.PI * Math.sqrt(L / g);
// the double pendulum's equations of motion (equal-form, masses m1 m2, lengths l1 l2)
export function doubleDeriv(m1, m2, l1, l2, g) {
  return (t, [a1, a2, w1, w2]) => {
    const d = a1 - a2, den = 2 * m1 + m2 - m2 * Math.cos(2 * d);
    const dw1 = (-g * (2 * m1 + m2) * Math.sin(a1) - m2 * g * Math.sin(a1 - 2 * a2) - 2 * Math.sin(d) * m2 * (w2 * w2 * l2 + w1 * w1 * l1 * Math.cos(d))) / (l1 * den);
    const dw2 = (2 * Math.sin(d) * (w1 * w1 * l1 * (m1 + m2) + g * (m1 + m2) * Math.cos(a1) + w2 * w2 * l2 * m2 * Math.cos(d))) / (l2 * den);
    return [w1, w2, dw1, dw2];
  };
}
export function doubleEnergy(m1, m2, l1, l2, g, [a1, a2, w1, w2]) {
  const y1 = -l1 * Math.cos(a1), y2 = y1 - l2 * Math.cos(a2);
  const v1 = l1 * w1, v2sq = v1 * v1 + (l2 * w2) ** 2 + 2 * l1 * l2 * w1 * w2 * Math.cos(a1 - a2);
  return 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2sq + g * (m1 * y1 + m2 * y2);
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.62, max: 420 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let mode = ctx.mode === "double" ? "double" : "simple";
  const P = { L: 1, L0: 1, amp: 20, g: 9.81, nudge: 1e-3, start: 120 };
  let st = { small: false, big: false, chaos: false, length: false }, s1, s2, d1, d2, t = 0, sep = [], trail = [];
  const ch = challenges(ctrl, ctx, [
    { id: "small", text: "At 10° or less, see the exact period agree with 2π√(L/g) to within 0.2%", test: (s) => s.small },
    { id: "big", text: "Release from 90° or more: how much longer is the period?", test: (s) => s.big },
    { id: "length", text: "Make the pendulum four times longer and see the period double", test: (s) => s.length },
    { id: "chaos", text: "Double pendulum: watch two almost identical starts drift completely apart", test: (s) => s.chaos },
  ]);
  seg($(".top"), [["simple", "Simple pendulum"], ["double", "Double pendulum (chaos)"]], mode, (v) => { mode = v; controls(); reset(); });
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  function controls() {
    sl.innerHTML = "";
    if (mode === "simple") {
      slider(sl, { label: "Length L", min: 0.25, max: 4, step: 0.05, value: P.L, unit: "m", fmt: (v) => v.toFixed(2), onInput: (v) => { if (Math.abs(v - 4 * P.L0) < 0.03) st.length = true; P.L = v; reset(); } });
      slider(sl, { label: "Release angle", min: 2, max: 170, step: 1, value: P.amp, unit: "°", fmt: (v) => v.toFixed(0), onInput: (v) => { P.amp = v; reset(); } });
    } else {
      slider(sl, { label: "Release angle (both arms)", min: 20, max: 175, step: 1, value: P.start, unit: "°", fmt: (v) => v.toFixed(0), onInput: (v) => { P.start = v; reset(); } });
      slider(sl, { label: "Difference between the twins", min: -6, max: -1, step: 1, value: Math.log10(P.nudge), fmt: (v) => `10^${v} rad`.replace("^", "<sup>").replace(" rad", "</sup> rad"), onInput: (v) => { P.nudge = 10 ** v; reset(); } });
    }
    const b = document.createElement("button"); b.type = "button"; b.className = "lab-btn"; b.textContent = "Release again"; sl.append(b); b.addEventListener("click", reset);
  }
  function reset() {
    t = 0; sep = []; trail = [];
    const a = (P.amp * Math.PI) / 180, s = (P.start * Math.PI) / 180;
    s1 = [a, 0]; s2 = [a, 0];
    d1 = [s, s, 0, 0]; d2 = [s + P.nudge, s, 0, 0];
    if (mode === "simple") {
      const T = period(P.L, P.g, a), T0 = smallPeriod(P.L, P.g);
      if (P.amp <= 10 && Math.abs(T / T0 - 1) < 0.002) st.small = true;
      if (P.amp >= 90) st.big = true;
      ch.check(st);
    }
    report();
  }
  loop(el, (dt) => {
    const n = 10, h = dt / n;
    if (mode === "simple") {
      const f = (tt, [th, w]) => [w, (-P.g / P.L) * Math.sin(th)], fs = (tt, [th, w]) => [w, (-P.g / P.L) * th];
      for (let i = 0; i < n; i++) { s1 = rk4(f, s1, t, h); s2 = rk4(fs, s2, t, h); t += h; }
    } else {
      const f = doubleDeriv(1, 1, 1, 1, P.g);
      for (let i = 0; i < n * 2; i++) { d1 = rk4(f, d1, t, h / 2); d2 = rk4(f, d2, t, h / 2); t += h / 2; }
      const pos = (s) => [Math.sin(s[0]) + Math.sin(s[1]), -Math.cos(s[0]) - Math.cos(s[1])];
      const [x1, y1] = pos(d1), [x2, y2] = pos(d2); sep.push([t, Math.max(1e-9, Math.hypot(x1 - x2, y1 - y2))]); trail.push([x1, y1, x2, y2]); if (trail.length > 400) trail.shift();
      if (t > 3 && sep.at(-1)[1] > 0.5 && P.start >= 90) { st.chaos = true; ch.check(st); }
    }
    draw();
  });
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    if (mode === "simple") {
      const ox = W * 0.3, oy = 24;
      const L = Math.min(H - 50, 60 + P.L * 70), bob = (th, col) => { const x = ox + L * Math.sin(th), y = oy + L * Math.cos(th); line(g, [[ox, oy], [x, y]], col, 1.5); circle(g, x, y, 11, col); };
      g.fillStyle = "rgba(255,255,255,.3)"; g.fillRect(ox - 40, oy - 4, 80, 4);
      bob(s2[0], "rgba(90,160,255,.45)"); bob(s1[0], C.teal);
      text(g, "exact", 12, H - 30, { color: C.teal, size: 11 }); text(g, "small-angle approximation", 12, H - 14, { color: C.blue, size: 11 });
      // period against amplitude
      const A = axes(g, { l: W * 0.58, t: 14, w: W * 0.38, h: H * 0.62 }, { x0: 0, x1: 180, y0: 1, y1: 2.5, xl: "release angle (°)", yl: "T / T₀", xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(1), xt: 4, yt: 3 });
      line(g, Array.from({ length: 170 }, (_, i) => { const d = 1 + i; return [A.X(d), A.Y(Math.min(2.5, period(1, 1, (d * Math.PI) / 180) / smallPeriod(1, 1)))]; }), C.teal, 2);
      circle(g, A.X(P.amp), A.Y(Math.min(2.5, period(P.L, P.g, (P.amp * Math.PI) / 180) / smallPeriod(P.L, P.g))), 5, C.white);
    } else {
      const ox = W * 0.32, oy = H * 0.42, sc = Math.min(W * 0.15, H * 0.2);
      g.globalAlpha = 0.5; line(g, trail.map((p) => [ox + p[0] * sc, oy - p[1] * sc]), C.teal, 1); line(g, trail.map((p) => [ox + p[2] * sc, oy - p[3] * sc]), C.orange, 1); g.globalAlpha = 1;
      for (const [s, col] of [[d2, C.orange], [d1, C.teal]]) {
        const x1 = ox + sc * Math.sin(s[0]), y1 = oy + sc * Math.cos(s[0]), x2 = x1 + sc * Math.sin(s[1]), y2 = y1 + sc * Math.cos(s[1]);
        line(g, [[ox, oy], [x1, y1], [x2, y2]], col, 2); circle(g, x1, y1, 7, col); circle(g, x2, y2, 9, col);
      }
      circle(g, ox, oy, 4, C.white);
      const A = axes(g, { l: W * 0.66, t: 14, w: W * 0.31, h: H * 0.62 }, { x0: 0, x1: Math.max(10, t), y0: 1e-7, y1: 10, xl: "time (s)", yl: "separation (m)", xf: (v) => v.toFixed(0), logy: true, xt: 4 });
      line(g, sep.map(([tt, d]) => [A.X(tt), A.Y(d)]), C.pink, 1.6);
      text(g, `energy drift ${(Math.abs(doubleEnergy(1, 1, 1, 1, P.g, d1) - doubleEnergy(1, 1, 1, 1, P.g, [(P.start * Math.PI) / 180, (P.start * Math.PI) / 180, 0, 0])) * 1000).toFixed(2)} mJ`, 12, H - 12, { color: C.mute, size: 11 });
    }
  }
  function report() {
    if (mode === "simple") {
      const a = (P.amp * Math.PI) / 180, T = period(P.L, P.g, a), T0 = smallPeriod(P.L, P.g);
      out(`<div class="lab-read"><div><small>Exact period</small><b>${T.toFixed(3)} s</b></div><div><small>2π√(L/g)</small><b>${T0.toFixed(3)} s</b></div><div><small>Difference</small><b>${((T / T0 - 1) * 100).toFixed(2)}%</b></div></div>
        <p class="lab-msg">For small swings sin θ ≈ θ, the motion is simple harmonic and the period 2π√(L/g) doesn't depend on the amplitude, which is why pendulum clocks work. At larger angles the restoring force is weaker than the approximation assumes, so the real pendulum falls behind its blue twin and the period grows, becoming infinite as the release angle approaches 180°.</p>`);
    } else {
      out(`<p class="lab-msg">Two double pendulums released ${P.nudge.toExponential(0)} rad apart. The motion is fully deterministic, yet the gap grows roughly exponentially (a straight rise on the log scale) until the two are unrelated: sensitive dependence on initial conditions, the signature of chaos. At small release angles the motion is nearly regular and the twins stay together much longer.</p>`);
    }
  }
  controls(); reset();
}
