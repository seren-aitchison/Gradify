// A charged particle in uniform magnetic and electric fields: the Lorentz force F = q(E + v × B) bends it into
// circles, spirals and drifts; with E and B crossed it becomes a velocity selector. Non-relativistic; the
// magnetic field points out of the screen and E lies in the plane. Integrated with the Boris method.
import { shell, canvas, slider, seg, clear, text, circle, arrow, line, challenges, panel, loop, C } from "../lab.js";

export const radius = (m, v, q, B) => (m * v) / (Math.abs(q) * B);
export const cyclotronPeriod = (m, q, B) => (2 * Math.PI * m) / (Math.abs(q) * B);
// one Boris step for (x, y, vx, vy) with B along z and E = (Ex, Ey)
export function boris(s, { q, m, B, Ex = 0, Ey = 0 }, dt) {
  const qm = (q / m) * (dt / 2);
  let vx = s.vx + qm * Ex, vy = s.vy + qm * Ey;
  const t = qm * B, s2 = (2 * t) / (1 + t * t);
  const vpx = vx + vy * t, vpy = vy - vx * t;
  vx += vpy * s2; vy -= vpx * s2;
  vx += qm * Ex; vy += qm * Ey;
  return { x: s.x + vx * dt, y: s.y + vy * dt, vx, vy };
}

const PARTICLES = { proton: ["Proton", 1, 1], electron: ["Electron", -1, 1 / 1836.15], alpha: ["Alpha particle", 2, 3.97], ion: ["Heavy ion (+1, 40 u)", 1, 39.7] };

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.72, max: 440 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let kind = "proton";
  const P = { v: 4, B: 1, E: 10 };   // starts with crossed fields (a drift), so the circle and the selector both need a change   // speed in units of 10⁵ m/s; B in units of 0.01 T; E in units of 1 kV/m
  let s, trail, t, st = { circle: false, double: false, period: false, select: false }, last = null;
  const ch = challenges(ctrl, ctx, [
    { id: "circ", text: "With no electric field, see the particle move in a circle at constant speed", test: (x) => x.circle },
    { id: "double", text: "Double the speed and check the radius doubles (r = mv/qB)", test: (x) => x.double },
    { id: "period", text: "Change the speed and see the time for one circle stay the same", test: (x) => x.period },
    { id: "sel", text: "Velocity selector: set E so the particle goes straight through (v = E/B)", test: (x) => x.select },
  ]);
  seg($(".top"), Object.entries(PARTICLES).map(([k2, [n]]) => [k2, n]), kind, (v) => { kind = v; reset(); });
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  slider(sl, { label: "Speed", min: 0.5, max: 10, step: 0.1, value: P.v, unit: "× 10⁵ m/s", fmt: (v) => v.toFixed(1), onInput: (v) => { P.v = v; reset(); } });
  slider(sl, { label: "Magnetic field B (out of screen)", min: -3, max: 3, step: 0.05, value: P.B, unit: "× 10 mT", fmt: (v) => v.toFixed(2), onInput: (v) => { P.B = v; reset(); } });
  slider(sl, { label: "Electric field E (upwards)", min: -40, max: 40, step: 0.5, value: P.E, unit: "kV/m", fmt: (v) => v.toFixed(1), onInput: (v) => { P.E = v; reset(); } });

  const phys = () => { const [, z, A] = PARTICLES[kind]; return { q: z * 1.602e-19, m: A * 1.6726e-27, B: P.B * 0.01, Ex: 0, Ey: P.E * 1000 }; };
  function reset() {
    s = { x: 0, y: 0, vx: P.v * 1e5, vy: 0 }; trail = []; t = 0;
    const f = phys(), r = f.B ? radius(f.m, P.v * 1e5, f.q, Math.abs(f.B)) : Infinity, T = f.B ? cyclotronPeriod(f.m, f.q, Math.abs(f.B)) : Infinity;
    // compare with the previous setting of the same particle and field, with no electric field
    if (P.E === 0 && f.B) {
      st.circle = true;
      if (last && last.kind === kind && last.B === P.B) {
        if (Math.abs(r / last.r - 2) < 0.03) st.double = true;
        if (Math.abs(last.v - P.v) > 0.2 && Math.abs(T / last.T - 1) < 1e-9) st.period = true;
      }
      last = { kind, B: P.B, v: P.v, r, T };
    }
    // selector: the electric force balances the magnetic force (qE = qvB) in magnitude and opposes it in direction
    const fm = f.q * P.v * 1e5 * f.B * -1, fe = f.q * f.Ey;   // y-components: (v × B) for v along x and B along z points along −y
    if (f.B && Math.abs(fm + fe) < 0.03 * Math.abs(fm)) st.select = true;
    ch.check(st); report(r, T);
  }
  loop(el, (dt) => {
    // about two seconds per circle, whatever the particle; without B, the same pace for the distance a circle would take
    const f = phys(), T = f.B ? cyclotronPeriod(f.m, f.q, Math.abs(f.B)) : (2 * Math.PI * 0.05) / (P.v * 1e5), n = 5, h = (T / 120) * Math.min(1, dt * 60) / n;
    for (let i = 0; i < n; i++) { s = boris(s, f, h); t += h; }
    trail.push([s.x, s.y]); if (trail.length > 900) trail.shift();
    draw();
  });
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const f = phys(), r = f.B ? radius(f.m, P.v * 1e5, f.q, Math.abs(f.B)) : 1, scale = Math.min(W, H) / (2.6 * Math.min(Math.max(r, 0.02), 2)), ox = W * 0.32, oy = H / 2;
    const X = (x) => ox + x * scale, Y = (y) => oy - y * scale;
    // field symbols: dots for out of the screen, crosses for into it
    for (let i = 20; i < W; i += 40) for (let j = 20; j < H; j += 40) { if (P.B > 0) circle(g, i, j, 1.6, "rgba(255,255,255,.3)"); else if (P.B < 0) { g.strokeStyle = "rgba(255,255,255,.3)"; g.beginPath(); g.moveTo(i - 3, j - 3); g.lineTo(i + 3, j + 3); g.moveTo(i + 3, j - 3); g.lineTo(i - 3, j + 3); g.stroke(); } }
    if (P.E) for (let i = 30; i < W; i += 90) arrow(g, i, P.E > 0 ? H - 20 : 20, i, P.E > 0 ? H - 50 : 50, "rgba(245,158,11,.5)", 1.5, 6);
    line(g, trail.map(([x, y]) => [X(x), Y(y)]), C.teal, 1.8);
    const col = f.q > 0 ? C.red : C.blue; circle(g, X(s.x), Y(s.y), 7, col, C.white); text(g, f.q > 0 ? "+" : "−", X(s.x), Y(s.y) + 4, { align: "center", size: 11, weight: 700 });
    const v = Math.hypot(s.vx, s.vy); if (v) arrow(g, X(s.x), Y(s.y), X(s.x) + (s.vx / v) * 30, Y(s.y) - (s.vy / v) * 30, C.white, 1.6, 7);
    text(g, P.B > 0 ? "B out of the screen (•)" : P.B < 0 ? "B into the screen (×)" : "no magnetic field", 10, 18, { color: C.mute, size: 11 });
    text(g, `scale: ${(100 / scale * 100).toFixed(1)} cm per 100 px`, 10, H - 10, { color: C.mute, size: 11 });
    if (Math.abs(s.x) * scale > W * 2 || Math.abs(s.y) * scale > H * 2) { s = { x: 0, y: 0, vx: P.v * 1e5, vy: 0 }; trail = []; }
  }
  function report(r, T) {
    const f = phys(), drift = f.B ? (f.Ey / f.B) : 0;
    out(`<div class="lab-read"><div><small>Radius r = mv/|q|B</small><b>${Number.isFinite(r) ? (r * 100).toFixed(2) + " cm" : "–"}</b></div><div><small>Period 2πm/|q|B</small><b>${Number.isFinite(T) ? (T * 1e6).toFixed(3) + " µs" : "–"}</b></div><div><small>Speed for a straight path E/B</small><b>${f.B ? (Math.abs(drift) / 1e5).toFixed(2) + " × 10⁵ m/s" : "–"}</b></div></div>
      <p class="lab-msg">The magnetic force qv × B is always at right angles to the motion, so it changes the direction but never the speed: the particle goes round in a circle of radius mv/qB, positive and negative charges turning opposite ways. The time for one circle, 2πm/qB, doesn't depend on speed, which is the principle of the cyclotron. Add an electric field and the circles drift sideways; when qE balances qvB, particles of exactly v = E/B pass straight through, the basis of mass spectrometers.</p>`);
  }
  reset();
}
