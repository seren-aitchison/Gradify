// Kinetic theory: a few hundred hard discs bouncing in a box. Pressure is measured from the momentum they hand to
// the walls and compared with the ideal gas law; their speeds settle into the Maxwell–Boltzmann distribution.
// A two-dimensional gas of equal discs with elastic collisions; in 2D, PA = NkT and the speed distribution is
// f(v) = (mv/kT) e^(−mv²/2kT). Units are scaled so that k = m = 1.
import { shell, canvas, slider, axes, line, clear, text, circle, challenges, panel, loop, C } from "../lab.js";

export const mb2d = (v, T) => (v / T) * Math.exp((-v * v) / (2 * T));   // 2D Maxwell–Boltzmann, k = m = 1
export const idealPressure = (N, T, A) => (N * T) / A;                    // 2D ideal gas law

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.55, max: 340 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.4, max: 220 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const P = { N: 250, T: 1, width: 1 };
  const R = 0.0045, H0 = 0.55;           // disc radius and box height in box units; the width is set by the piston
  let parts = [], impulse = 0, clock = 0, pressure = 0, history = [], st = { mb: false, boyle: false, charles: false, hot: false }, boyle = [];
  const ch = challenges(ctrl, ctx, [
    { id: "mb", text: "Start every particle at the same speed and watch the speeds spread into the Maxwell–Boltzmann curve", test: (s) => s.mb },
    { id: "boyle", text: "Boyle's law: halve the volume at fixed temperature and see the pressure double", test: (s) => s.boyle },
    { id: "charles", text: "Double the temperature at fixed volume: the pressure doubles too", test: (s) => s.charles },
    { id: "hot", text: "Heat the gas and see the peak of the speed distribution move right and flatten", test: (s) => s.hot },
  ]);
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  slider(sl, { label: "Particles", min: 50, max: 500, step: 10, value: P.N, fmt: (v) => v.toFixed(0), onInput: (v) => { P.N = v; init(); } });
  let T0 = P.T, A0 = null;
  slider(sl, { label: "Temperature", min: 0.25, max: 4, step: 0.05, value: P.T, unit: "× T₀", fmt: (v) => v.toFixed(2), onInput: (v) => { const f = Math.sqrt(v / P.T); for (const p of parts) { p.vx *= f; p.vy *= f; } if (v >= 2 * T0 - 0.02 && Math.abs(P.width - wAtT0) < 0.01) st.charlesArmed = true; if (v > 2) st.hot = true; P.T = v; resetGauge(); } });
  let wAtT0 = P.width;
  slider(sl, { label: "Piston (volume)", min: 0.3, max: 1, step: 0.01, value: P.width, unit: "× V₀", fmt: (v) => v.toFixed(2), onInput: (v) => { P.width = v; for (const p of parts) p.x = Math.min(p.x, v - R); resetGauge(); } });
  const b = document.createElement("button"); b.type = "button"; b.className = "lab-btn"; b.textContent = "Restart with every speed equal"; sl.append(b); b.addEventListener("click", () => init(true));

  function init(equal = false) {
    parts = Array.from({ length: P.N }, () => { const a = Math.random() * 2 * Math.PI, v = equal ? Math.sqrt(2 * P.T) : Math.sqrt(-2 * P.T * Math.log(1 - Math.random())); return { x: R + Math.random() * (P.width - 2 * R), y: R + Math.random() * (H0 - 2 * R), vx: v * Math.cos(a), vy: v * Math.sin(a) }; });
    st.equalStart = equal ? clock : null; resetGauge();
  }
  function resetGauge() { impulse = 0; history = []; st.since = clock; }
  function step(dt) {
    const W = P.width;
    for (const p of parts) {
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.x < R) { p.x = 2 * R - p.x; p.vx = -p.vx; impulse += 2 * Math.abs(p.vx); }
      if (p.x > W - R) { p.x = 2 * (W - R) - p.x; p.vx = -p.vx; impulse += 2 * Math.abs(p.vx); }
      if (p.y < R) { p.y = 2 * R - p.y; p.vy = -p.vy; impulse += 2 * Math.abs(p.vy); }
      if (p.y > H0 - R) { p.y = 2 * (H0 - R) - p.y; p.vy = -p.vy; impulse += 2 * Math.abs(p.vy); }
    }
    // collisions between discs, found with a grid
    const cell = 2 * R, cols = Math.ceil(W / cell) + 1, grid = new Map();
    parts.forEach((p, i) => { const k = Math.floor(p.x / cell) + Math.floor(p.y / cell) * cols; (grid.get(k) || grid.set(k, []).get(k)).push(i); });
    for (const [k, list] of grid) for (const dk of [0, 1, cols - 1, cols, cols + 1]) { const other = grid.get(k + dk); if (!other) continue;
      for (const i of list) for (const j of other) { if (dk === 0 && j <= i) continue; const a = parts[i], c = parts[j], dx = c.x - a.x, dy = c.y - a.y, d2 = dx * dx + dy * dy;
        if (d2 < 4 * R * R && d2 > 0) { const d = Math.sqrt(d2), nx = dx / d, ny = dy / d, rel = (a.vx - c.vx) * nx + (a.vy - c.vy) * ny; if (rel > 0) { a.vx -= rel * nx; a.vy -= rel * ny; c.vx += rel * nx; c.vy += rel * ny; } const o = (2 * R - d) / 2; a.x -= nx * o; a.y -= ny * o; c.x += nx * o; c.y += ny * o; } } }
    clock += dt;
  }
  loop(el, (dt) => {
    for (let i = 0; i < 6; i++) step(Math.min(dt, 0.02) / 6 * 0.6);
    const perim = 2 * (P.width + H0), elapsed = clock - st.since;
    if (elapsed > 0.5) { pressure = impulse / (elapsed * perim); history.push(pressure); if (history.length > 120) history.shift(); }
    draw();
  });
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const sc = Math.min((W - 30) / 1, (H - 20) / H0), ox = 14, oy = 10;
    g.strokeStyle = "rgba(255,255,255,.5)"; g.lineWidth = 2; g.strokeRect(ox, oy, sc * 1, sc * H0);
    g.fillStyle = "rgba(255,255,255,.06)"; g.fillRect(ox + sc * P.width, oy, sc * (1 - P.width), sc * H0);
    g.fillStyle = C.mute; g.fillRect(ox + sc * P.width - 3, oy, 6, sc * H0);
    const vmax = Math.sqrt(P.T) * 3;
    for (const p of parts) { const v = Math.hypot(p.vx, p.vy), u = Math.min(1, v / vmax); g.fillStyle = `hsl(${220 - 200 * u} 90% 60%)`; g.beginPath(); g.arc(ox + p.x * sc, oy + p.y * sc, Math.max(1.6, R * sc), 0, 2 * Math.PI); g.fill(); }
    text(g, "colour: slow (blue) to fast (red)", W - 10, H - 6, { align: "right", size: 10.5, color: C.mute });
    // speed histogram against the theory curve
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    const bins = 24, top = vmax, hist = new Array(bins).fill(0);
    for (const p of parts) { const i = Math.min(bins - 1, Math.floor((Math.hypot(p.vx, p.vy) / top) * bins)); hist[i]++; }
    const dens = hist.map((n) => n / (parts.length * (top / bins))), ymax = Math.max(...dens, mb2d(Math.sqrt(P.T), P.T)) * 1.15;
    const A = axes(g2, { l: 48, t: 10, w: W2 - 60, h: H2 - 42 }, { x0: 0, x1: top, y0: 0, y1: ymax, xl: "speed", yl: "fraction", xf: (v) => v.toFixed(1), yf: (v) => v.toFixed(1), yt: 2 });
    dens.forEach((d, i) => { g2.fillStyle = "rgba(20,212,196,.45)"; g2.fillRect(A.X((i * top) / bins) + 1, A.Y(d), A.X(top / bins) - A.X(0) - 2, A.Y(0) - A.Y(d)); });
    line(g2, Array.from({ length: 120 }, (_, i) => { const v = (i / 119) * top; return [A.X(v), A.Y(mb2d(v, P.T))]; }), C.gold, 2);
    // challenges, from the measured gas
    const avgP = history.length > 30 ? history.slice(-30).reduce((a, b2) => a + b2, 0) / 30 : null, ideal = idealPressure(parts.length, P.T, P.width * H0);
    if (st.equalStart != null && clock - st.equalStart > 3) { const chi = dens.reduce((a, d, i) => a + Math.abs(d - mb2d(((i + 0.5) * top) / bins, P.T)), 0) / bins; if (chi < 0.12) st.mb = true; }
    if (avgP && Math.abs(P.T - T0) < 0.03) { boyle.push([P.width, avgP]); if (boyle.length > 400) boyle.shift(); const full = boyle.find(([w]) => w > 0.97), half = boyle.find(([w]) => Math.abs(w - 0.5) < 0.02); if (full && half && Math.abs(half[1] / full[1] - 2) < 0.25) st.boyle = true; }
    if (avgP && st.charlesArmed && Math.abs(P.T / T0 - 2) < 0.05 && Math.abs(avgP / ideal - 1) < 0.15) st.charles = true;
    ch.check(st);
    if (Math.floor(clock * 4) !== Math.floor((clock - 0.02) * 4)) out(`<div class="lab-read"><div><small>Measured pressure</small><b>${avgP ? avgP.toFixed(0) : "measuring…"}</b></div><div><small>Ideal gas law NkT/A</small><b>${ideal.toFixed(0)}</b></div><div><small>Mean kinetic energy</small><b>${(parts.reduce((a, p) => a + 0.5 * (p.vx * p.vx + p.vy * p.vy), 0) / parts.length).toFixed(2)} (kT = ${P.T.toFixed(2)})</b></div></div>
      <p class="lab-msg">Pressure is nothing but molecules hitting the walls: each bounce hands over momentum 2mv, and the measured pressure matches the ideal gas law, PV = NkT (here in two dimensions), coming out a few per cent high because the discs themselves take up room, the correction van der Waals added for real gases. Squeeze the gas and the molecules hit the walls more often (Boyle's law); heat it and they hit harder and more often. Collisions shuffle energy between molecules until the speeds follow the Maxwell–Boltzmann distribution, whatever they started as; the average kinetic energy measures the temperature.</p>`);
  }
  init();
}
