// Projectile motion with and without air resistance. Integrated numerically (RK4) with quadratic drag,
// F = ½ρC_dAv², for a ball of given mass and diameter; gravity is uniform and the air is still.
import { shell, canvas, slider, seg, axes, line, clear, text, circle, challenges, panel, rk4, C } from "../lab.js";

export const PLANETS = { earth: ["Earth", 9.81, 1.225], moon: ["Moon", 1.62, 0], mars: ["Mars", 3.71, 0.02], jupiter: ["Jupiter", 24.79, 0.16] };

// flight: launch speed v (m/s), angle deg, height h (m), g, air density rho, ball mass m (kg), diameter d (m)
export function flight({ v, deg, h = 0, g = 9.81, rho = 0, m = 0.145, d = 0.074, Cd = 0.47, dt = 0.002 }) {
  const a = (deg * Math.PI) / 180, k = rho > 0 ? (0.5 * rho * Cd * Math.PI * (d / 2) ** 2) / m : 0;
  const f = (t, [x, y, vx, vy]) => { const s = Math.hypot(vx, vy); return [vx, vy, -k * s * vx, -g - k * s * vy]; };
  let y = [0, h, v * Math.cos(a), v * Math.sin(a)], t = 0, top = h;
  const path = [[0, h, 0]];
  for (let i = 0; i < 400000; i++) {
    const n = rk4(f, y, t, dt); t += dt;
    if (n[1] < 0) { const fr = y[1] / (y[1] - n[1]); const x = y[0] + fr * (n[0] - y[0]); t -= dt * (1 - fr); path.push([x, 0, t]); return { path, range: x, top, time: t, impact: Math.hypot(y[2], y[3]) }; }
    y = n; top = Math.max(top, y[1]); if (i % 10 === 0) path.push([y[0], y[1], t]);
  }
  return { path, range: y[0], top, time: t, impact: Math.hypot(y[2], y[3]) };
}
// the launch angle giving the longest range, found by golden-section search
export function bestAngle(p) {
  let a = 1, b = 89; const r = (x) => flight({ ...p, deg: x, dt: 0.004 }).range, gr = (Math.sqrt(5) - 1) / 2;
  let c = b - gr * (b - a), d = a + gr * (b - a);
  for (let i = 0; i < 40; i++) { if (r(c) > r(d)) b = d; else a = c; c = b - gr * (b - a); d = a + gr * (b - a); }
  return (a + b) / 2;
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.55, max: 380 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const P = { v: 25, deg: 45, h: 0, planet: "earth", air: false, target: 40 + Math.round(Math.random() * 18) };   // 40–58 m: never within reach of the default 64 m throw, so the challenge needs a change
  const trails = []; let st = { hit: false, drag45: false, moon: false, high: false };
  const ch = challenges(ctrl, ctx, [
    { id: "hit", text: `Land the ball within 1 m of the flag at ${P.target} m`, test: (s) => s.hit },
    { id: "angle", text: "With air resistance on, find that the best angle is below 45°", test: (s) => s.drag45 },
    { id: "moon", text: "Throw on the Moon and compare the range with the same throw on Earth", test: (s) => s.moon },
    { id: "height", text: "Launch from a 20 m cliff: is 45° still the best angle?", test: (s) => s.high },
  ]);
  seg($(".top"), Object.entries(PLANETS).map(([k, [n]]) => [k, n]), P.planet, (v) => { P.planet = v; draw(); });
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  slider(sl, { label: "Launch speed", min: 5, max: 60, step: 0.5, value: P.v, unit: "m/s", fmt: (v) => v.toFixed(1), onInput: (v) => { P.v = v; draw(); } });
  slider(sl, { label: "Angle", min: 5, max: 85, step: 1, value: P.deg, unit: "°", fmt: (v) => v.toFixed(0), onInput: (v) => { P.deg = v; draw(); } });
  slider(sl, { label: "Launch height", min: 0, max: 30, step: 1, value: P.h, unit: "m", fmt: (v) => v.toFixed(0), onInput: (v) => { P.h = v; draw(); } });
  const air = document.createElement("label"); air.className = "lab-tog"; air.innerHTML = `<input type="checkbox"><span>Air resistance (a baseball, 145 g)</span>`; sl.append(air);
  air.querySelector("input").addEventListener("change", (e) => { P.air = e.target.checked; draw(); });
  const keep = document.createElement("button"); keep.type = "button"; keep.className = "lab-btn"; keep.textContent = "Keep this path"; sl.append(keep);
  keep.addEventListener("click", () => { trails.push({ ...P }); if (trails.length > 4) trails.shift(); draw(); });
  const clr = document.createElement("button"); clr.type = "button"; clr.className = "lab-btn"; clr.textContent = "Clear kept paths"; sl.append(clr);
  clr.addEventListener("click", () => { trails.length = 0; draw(); });

  function params(p) { const [, g, rho] = PLANETS[p.planet]; return { v: p.v, deg: p.deg, h: p.h, g, rho: p.air ? rho : 0 }; }
  function draw() {
    const now = flight(params(P)), kept = trails.map((t) => ({ t, f: flight(params(t)) }));
    const all = [now, ...kept.map((k) => k.f)];
    const xmax = Math.max(P.target + 10, ...all.map((f) => f.range)) * 1.08, ymax = Math.max(5, ...all.map((f) => f.top)) * 1.15;
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const s = Math.min((W - 70) / xmax, (H - 50) / ymax);
    const A = axes(g, { l: 50, t: 10, w: xmax * s, h: ymax * s }, { x0: 0, x1: xmax, y0: 0, y1: ymax, xl: "distance (m)", yl: "height (m)", xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    if (P.h > 0) { g.fillStyle = "rgba(255,255,255,.08)"; g.fillRect(A.X(0) - 14, A.Y(P.h), 14, A.Y(0) - A.Y(P.h)); }
    const fx = A.X(P.target), fy = A.Y(0); line(g, [[fx, fy], [fx, fy - 28]], C.white, 2); g.fillStyle = C.red; g.beginPath(); g.moveTo(fx, fy - 28); g.lineTo(fx + 14, fy - 23); g.lineTo(fx, fy - 18); g.fill();
    kept.forEach(({ f }, i) => line(g, f.path.map(([x, y]) => [A.X(x), A.Y(y)]), ["rgba(90,160,255,.55)", "rgba(167,139,250,.55)", "rgba(245,158,11,.55)", "rgba(244,114,182,.55)"][i], 1.6, [5, 4]));
    line(g, now.path.map(([x, y]) => [A.X(x), A.Y(y)]), C.teal, 2.4);
    // velocity arrows each 0.5 s along the live path
    const pts = now.path.filter((p, i, a) => i === 0 || Math.floor(p[2] * 2) !== Math.floor(a[i - 1][2] * 2));
    for (const [x, y] of pts) circle(g, A.X(x), A.Y(y), 3, C.white);
    circle(g, A.X(now.range), A.Y(0), 5, C.gold);
    text(g, "dots every 0.5 s", W - 12, 22, { align: "right", color: C.mute, size: 11 });
    const best = bestAngle(params(P)), miss = now.range - P.target;
    if (Math.abs(miss) <= 1) st.hit = true;
    if (P.air && P.planet === "earth" && best < 44) st.drag45 = true;
    if (P.planet === "moon") st.moon = true;
    if (P.h >= 20 && best < 44 && !P.air) st.high = true;
    ch.check(st);
    const vacuum = !P.air || !PLANETS[P.planet][2];
    out(`<div class="lab-read"><div><small>Range</small><b>${now.range.toFixed(1)} m</b></div><div><small>Highest point</small><b>${now.top.toFixed(1)} m</b></div><div><small>Time of flight</small><b>${now.time.toFixed(2)} s</b></div><div><small>Impact speed</small><b>${now.impact.toFixed(1)} m/s</b></div><div><small>Best angle here</small><b>${best.toFixed(1)}°</b></div><div><small>Miss</small><b>${miss >= 0 ? "+" : ""}${miss.toFixed(1)} m</b></div></div>
      <p class="lab-msg">${vacuum ? `Without air, the horizontal velocity never changes and the vertical motion is uniformly accelerated, so the path is a parabola. From ground level the range is v²sin2θ/g = ${((P.v ** 2 * Math.sin((2 * P.deg * Math.PI) / 180)) / PLANETS[P.planet][1]).toFixed(1)} m, longest at 45°; from a height, a lower angle goes further.` : `Drag grows with the square of speed and always opposes the motion, so the descent is steeper than the climb and the range is shorter. Because drag costs most at high speed, the best angle drops below 45° (here ${best.toFixed(1)}°).`}</p>`);
  }
  draw();
}
