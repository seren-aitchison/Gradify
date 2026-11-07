// Orbits around a star: launch a planet and Newtonian gravity does the rest. Integrated with a symplectic
// (velocity Verlet) step so energy doesn't drift; the star is fixed and much heavier than the planet. Units: AU,
// years and solar masses, where GM☉ = 4π² AU³/yr².
import { shell, canvas, slider, clear, text, circle, line, challenges, panel, loop, C } from "../lab.js";

export const GM = 4 * Math.PI * Math.PI;
// orbital elements from a position (r, AU) and velocity (v, AU/yr), for a star of mass M (solar masses)
export function elements([x, y], [vx, vy], M = 1) {
  const mu = GM * M, r = Math.hypot(x, y), v2 = vx * vx + vy * vy, E = v2 / 2 - mu / r, h = x * vy - y * vx;
  const a = -mu / (2 * E), e = Math.sqrt(Math.max(0, 1 + (2 * E * h * h) / (mu * mu)));
  return { E, h, a, e, bound: E < 0, T: E < 0 ? Math.sqrt(a ** 3 / M) : Infinity, rp: a * (1 - e), escape: Math.sqrt((2 * mu) / r), circular: Math.sqrt(mu / r) };
}
export function verlet(s, M, dt) {
  const acc = (x, y) => { const r3 = Math.hypot(x, y) ** 3; return [(-GM * M * x) / r3, (-GM * M * y) / r3]; };
  const [ax, ay] = acc(s.x, s.y);
  const x = s.x + s.vx * dt + 0.5 * ax * dt * dt, y = s.y + s.vy * dt + 0.5 * ay * dt * dt;
  const [bx, by] = acc(x, y);
  return { x, y, vx: s.vx + 0.5 * (ax + bx) * dt, vy: s.vy + 0.5 * (ay + by) * dt };
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.75, max: 460 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const P = { r: 1, v: 5.2, dir: 90, M: 1, areas: true };   // starts on an ellipse: finding the circle is a challenge
  let s, t, trail, sweeps, crashed, st = { circ: false, ellipse: false, escape: false, kepler: false }, periods = new Map();
  const ch = challenges(ctrl, ctx, [
    { id: "circ", text: "Put the planet in a circular orbit (eccentricity below 0.02)", test: (x) => x.circ },
    { id: "ell", text: "Make an ellipse with eccentricity above 0.6 and watch it speed up near the star", test: (x) => x.ellipse },
    { id: "esc", text: "Give it escape velocity so it never comes back", test: (x) => x.escape },
    { id: "kep", text: "Kepler's third law: try orbits of two sizes and compare T² with a³", test: (x) => x.kepler },
  ]);
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  slider(sl, { label: "Starting distance", min: 0.4, max: 3, step: 0.05, value: P.r, unit: "AU", fmt: (v) => v.toFixed(2), onInput: (v) => { P.r = v; reset(); } });
  const vS = slider(sl, { label: "Launch speed", min: 1, max: 14, step: 0.05, value: P.v, fmt: (v) => `${v.toFixed(2)} AU/yr (${(v * 4.74).toFixed(1)} km/s)`, onInput: (v) => { P.v = v; reset(); } });
  slider(sl, { label: "Launch direction", min: 30, max: 150, step: 1, value: P.dir, unit: "° from outward", fmt: (v) => v.toFixed(0), onInput: (v) => { P.dir = v; reset(); } });
  slider(sl, { label: "Star mass", min: 0.3, max: 3, step: 0.1, value: P.M, unit: "M☉", fmt: (v) => v.toFixed(1), onInput: (v) => { P.M = v; reset(); } });
  const tog = document.createElement("label"); tog.className = "lab-tog"; tog.innerHTML = `<input type="checkbox" checked><span>Shade equal times (Kepler's second law)</span>`; sl.append(tog);
  tog.querySelector("input").addEventListener("change", (e) => { P.areas = e.target.checked; });
  const row = document.createElement("div"); row.className = "lab-row"; sl.append(row);
  const btn = (label, fn) => { const b = document.createElement("button"); b.type = "button"; b.className = "lab-btn"; b.textContent = label; b.addEventListener("click", fn); row.append(b); };
  btn("Circular speed", () => { P.v = Math.sqrt((GM * P.M) / P.r); P.dir = 90; vS.value = P.v; reset(); });
  btn("Escape speed", () => { P.v = Math.sqrt((2 * GM * P.M) / P.r) * 1.001; vS.value = P.v; reset(); });

  function reset() {
    const a = (P.dir * Math.PI) / 180;
    s = { x: P.r, y: 0, vx: P.v * Math.cos(a), vy: P.v * Math.sin(a) }; t = 0; trail = []; sweeps = []; crashed = false;
    const el0 = elements([s.x, s.y], [s.vx, s.vy], P.M);
    if (el0.bound && el0.e < 0.02) st.circ = true;
    if (el0.bound && el0.e > 0.6 && el0.rp > 0.05) st.ellipse = true;
    if (!el0.bound) st.escape = true;
    if (el0.bound && el0.e < 0.9) { periods.set(el0.a.toFixed(1), el0); const sizes = [...periods.values()]; if (sizes.length >= 2 && Math.max(...sizes.map((x) => x.a)) / Math.min(...sizes.map((x) => x.a)) > 1.5) st.kepler = true; }
    ch.check(st); report(el0);
  }
  loop(el, (dt) => {
    if (crashed) { draw(); return; }
    const sim = dt * 0.35, n = 200;
    for (let i = 0; i < n; i++) { s = verlet(s, P.M, sim / n); t += sim / n; if (Math.hypot(s.x, s.y) < 0.03) { crashed = true; break; } }
    trail.push([s.x, s.y, t]); if (trail.length > 1500) trail.shift();
    draw();
  });
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const el0 = elements([P.r, 0], [P.v * Math.cos((P.dir * Math.PI) / 180), P.v * Math.sin((P.dir * Math.PI) / 180)], P.M);
    const span = el0.bound ? Math.max(P.r, el0.a * (1 + el0.e)) * 1.15 : P.r * 3.5, sc = Math.min(W, H) / (2 * span), cx = W / 2, cy = H / 2;
    const X = (x) => cx + x * sc, Y = (y) => cy - y * sc;
    for (let i = 0; i < 70; i++) { const rx = (Math.sin(i * 91.7) * 0.5 + 0.5) * W, ry = (Math.sin(i * 47.3) * 0.5 + 0.5) * H; g.fillStyle = "rgba(255,255,255,.18)"; g.fillRect(rx, ry, 1.2, 1.2); }
    // equal-time wedges: one every tenth of the period (or every 0.1 yr if unbound)
    if (P.areas && trail.length > 2) {
      const step = el0.bound ? el0.T / 10 : 0.1, cols = ["rgba(20,212,196,.18)", "rgba(167,139,250,.18)"];
      let k0 = 0;
      for (let i = 1; i < trail.length; i++) {
        const k = Math.floor(trail[i][2] / step);
        if (k !== Math.floor(trail[k0][2] / step) || i === trail.length - 1) {
          g.fillStyle = cols[Math.floor(trail[k0][2] / step) % 2]; g.beginPath(); g.moveTo(X(0), Y(0)); for (let j = k0; j <= i; j++) g.lineTo(X(trail[j][0]), Y(trail[j][1])); g.closePath(); g.fill(); k0 = i;
        }
      }
    }
    line(g, trail.map(([x, y]) => [X(x), Y(y)]), C.teal, 1.6);
    const glow = g.createRadialGradient(cx, cy, 0, cx, cy, 26 + 8 * P.M); glow.addColorStop(0, "rgba(255,210,90,.9)"); glow.addColorStop(1, "rgba(255,160,40,0)"); g.fillStyle = glow; g.fillRect(cx - 60, cy - 60, 120, 120);
    circle(g, cx, cy, 6 + 2 * P.M, C.gold);
    circle(g, X(s.x), Y(s.y), 6, crashed ? C.red : C.blue);
    if (!crashed) { const v = Math.hypot(s.vx, s.vy); line(g, [[X(s.x), Y(s.y)], [X(s.x) + (s.vx / v) * 26, Y(s.y) - (s.vy / v) * 26]], C.white, 1.5); }
    text(g, crashed ? "It fell into the star" : `${t.toFixed(2)} years`, 12, 22, { color: crashed ? C.red : C.mute, size: 12 });
    text(g, `1 AU`, 12, H - 12, { color: C.mute, size: 11 }); line(g, [[44, H - 16], [44 + sc, H - 16]], C.mute, 2);
  }
  function report(e) {
    out(`<div class="lab-read"><div><small>Orbit</small><b>${e.bound ? (e.e < 0.02 ? "circle" : "ellipse") : e.e >= 1.0005 ? "hyperbola (escapes)" : "parabola (escapes)"}</b></div><div><small>Eccentricity</small><b>${e.e.toFixed(3)}</b></div><div><small>Semi-major axis</small><b>${e.bound ? `${e.a.toFixed(2)} AU` : "–"}</b></div><div><small>Period</small><b>${e.bound ? `${e.T.toFixed(2)} yr` : "–"}</b></div><div><small>Circular speed here</small><b>${e.circular.toFixed(2)} AU/yr</b></div><div><small>Escape speed here</small><b>${e.escape.toFixed(2)} AU/yr</b></div></div>
      <p class="lab-msg">Gravity pulls towards the star with a force ∝ 1/r². Launched sideways at √(GM/r) the planet falls round in a circle; faster or slower and the path is an ellipse with the star at one focus; at √(2GM/r) or more its kinetic energy beats the gravitational well and it escapes. Equal-time wedges have equal areas (Kepler's second law: angular momentum is conserved), and ${e.bound ? `T² = a³/M: here ${(e.T ** 2).toFixed(2)} = ${(e.a ** 3 / P.M).toFixed(2)}` : "a bound orbit's period obeys T² ∝ a³"} (Kepler's third law).</p>`);
  }
  reset();
}
