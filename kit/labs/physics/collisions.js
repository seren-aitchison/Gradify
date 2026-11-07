// Collisions on a frictionless air track: two gliders meet head-on. The outcome follows from conservation of
// momentum and the coefficient of restitution e (1 elastic, 0 perfectly inelastic). One dimension, no friction.
import { shell, canvas, slider, seg, clear, text, rrect, arrow, challenges, panel, loop, C } from "../lab.js";

// velocities after a 1D collision of m1 (u1) and m2 (u2) with restitution e
export function collide(m1, u1, m2, u2, e) {
  const p = m1 * u1 + m2 * u2, M = m1 + m2;
  return [(p + m2 * e * (u2 - u1)) / M, (p + m1 * e * (u1 - u2)) / M];
}
export const ke = (m, v) => 0.5 * m * v * v;

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-stage"></div><div class="lab-cols"><div class="lab-stage2"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.22, max: 180 }), bars = canvas($(".lab-stage2"), { aspect: 0.42, max: 240 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const P = { m1: 1, u1: 2, m2: 1.5, u2: -0.5, e: 0.8 };   // a start that meets no challenge: each needs a setting changed
  let sim, st = { swap: false, stick: false, bounce: false, explode: false };
  const ch = challenges(ctrl, ctx, [
    { id: "swap", text: "Elastic, equal masses, one at rest: watch the velocities swap", test: (s) => s.swap },
    { id: "stick", text: "Make the gliders stick together and find how much kinetic energy is lost", test: (s) => s.stick },
    { id: "bounce", text: "Fire a light glider at a heavy one at rest so it bounces back", test: (s) => s.bounce },
    { id: "explode", text: "Explosion: start both at rest and push them apart; total momentum stays zero", test: (s) => s.explode },
  ]);
  const presets = { custom: "Your settings", elastic: "Elastic", sticky: "Sticky (e = 0)", explosion: "Explosion" };
  seg($(".top"), Object.entries(presets), "custom", (v) => {
    if (v === "elastic") Object.assign(P, { e: 1 }); if (v === "sticky") Object.assign(P, { e: 0 });
    if (v === "explosion") Object.assign(P, { u1: 0, u2: 0 });
    for (const [k, s] of Object.entries(S)) s.value = P[k];
    start(v === "explosion");
  });
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  const S = {
    m1: slider(sl, { label: "Mass A (blue)", min: 0.2, max: 5, step: 0.1, value: P.m1, unit: "kg", fmt: (v) => v.toFixed(1), onInput: (v) => { P.m1 = v; start(); } }),
    u1: slider(sl, { label: "Velocity A", min: -3, max: 3, step: 0.1, value: P.u1, unit: "m/s", fmt: (v) => v.toFixed(1), onInput: (v) => { P.u1 = v; start(); } }),
    m2: slider(sl, { label: "Mass B (orange)", min: 0.2, max: 5, step: 0.1, value: P.m2, unit: "kg", fmt: (v) => v.toFixed(1), onInput: (v) => { P.m2 = v; start(); } }),
    u2: slider(sl, { label: "Velocity B", min: -3, max: 3, step: 0.1, value: P.u2, unit: "m/s", fmt: (v) => v.toFixed(1), onInput: (v) => { P.u2 = v; start(); } }),
    e: slider(sl, { label: "Restitution e", min: 0, max: 1, step: 0.05, value: P.e, fmt: (v) => v.toFixed(2), onInput: (v) => { P.e = v; start(); } }),
  };
  const go = document.createElement("button"); go.type = "button"; go.className = "lab-btn"; go.textContent = "Run again"; sl.append(go); go.addEventListener("click", () => start());

  function start(explosion = false) { setup(explosion); report(); }
  function setup(explosion) {
    const boom = explosion || (P.u1 === 0 && P.u2 === 0);
    // an explosion: a spring between them releases 4 J, shared so momentum stays zero
    const E = 4, vA = -Math.sqrt((2 * E * P.m2) / (P.m1 * (P.m1 + P.m2))), vB = Math.sqrt((2 * E * P.m1) / (P.m2 * (P.m1 + P.m2)));
    sim = boom ? { x1: -0.12, x2: 0.12, v1: 0, v2: 0, t: 0, hit: false, boom: true, after: [vA, vB], before: [0, 0] }
      : { x1: -1.4, x2: 0.4, v1: P.u1, v2: P.u2, t: 0, hit: false, boom: false, before: [P.u1, P.u2], after: collide(P.m1, P.u1, P.m2, P.u2, P.e) };
    if (!boom && P.u1 - P.u2 <= 0) sim.never = true;
  }
  const w = (m) => 0.12 + 0.05 * Math.sqrt(m);   // glider length grows with mass
  loop(el, (dt) => {
    if (!sim) return;
    sim.t += dt;
    if (sim.boom && !sim.hit && sim.t > 0.6) { sim.hit = true; [sim.v1, sim.v2] = sim.after; }
    if (!sim.boom && !sim.hit && sim.x2 - sim.x1 <= (w(P.m1) + w(P.m2)) / 2) { sim.hit = true; [sim.v1, sim.v2] = sim.after; }
    if (Math.abs(sim.x1) < 2.2) sim.x1 += sim.v1 * dt; if (Math.abs(sim.x2) < 2.2) sim.x2 += sim.v2 * dt;
    draw();
  });
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const X = (x) => W / 2 + (x / 2.2) * (W / 2 - 10), ty = H * 0.7;
    rrect(g, 8, ty, W - 16, 8, 4, "rgba(255,255,255,.12)");
    for (let i = 0; i < 40; i++) g.fillRect(14 + i * ((W - 28) / 40), ty + 3, 2, 2);
    const glider = (x, m, c, v) => { const L = w(m) * (W / 4.4), h = 18 + 8 * Math.sqrt(m); rrect(g, X(x) - L / 2, ty - h, L, h, 6, c); text(g, `${m.toFixed(1)} kg`, X(x), ty - h / 2 + 4, { align: "center", color: "#0b0c0e", weight: 700, size: 11 }); if (Math.abs(v) > 0.01) arrow(g, X(x), ty - h - 10, X(x) + v * 26, ty - h - 10, c, 2.2); };
    glider(sim.x1, P.m1, C.blue, sim.v1); glider(sim.x2, P.m2, C.orange, sim.v2);
    text(g, sim.hit ? "after" : "before", 14, 20, { color: C.mute, size: 12 });
    // momentum and energy bars, before and after
    const b = bars.g, BW = bars.W, BH = bars.H; clear(b, BW, BH);
    const [u1, u2] = sim.before, [v1, v2] = sim.after;
    const rows = [["momentum before", P.m1 * u1, P.m2 * u2], ["momentum after", P.m1 * v1, P.m2 * v2], ["kinetic energy before", ke(P.m1, u1), ke(P.m2, u2)], ["kinetic energy after", ke(P.m1, v1), ke(P.m2, v2)]];
    const maxP = Math.max(1, ...rows.slice(0, 2).flatMap((r) => [Math.abs(r[1]) + Math.abs(r[2])])), maxE = Math.max(1, ...rows.slice(2).map((r) => r[1] + r[2]));
    const mid = BW * 0.55, half = BW * 0.4;
    rows.forEach(([lab, a, c], i) => {
      const y = 22 + i * ((BH - 30) / 4), sc = (i < 2 ? half / maxP : (half * 2) / maxE) * 0.95;
      text(b, lab, 8, y + 9, { size: 11, color: C.mute });
      if (i < 2) { let x = mid; for (const [v, col] of [[a, C.blue], [c, C.orange]]) { const w2 = v * sc; rrect(b, Math.min(x, x + w2), y, Math.abs(w2), 14, 3, col); x += w2; } b.fillStyle = C.white; b.fillRect(mid - 1, y - 3, 2, 20); text(b, `${(a + c).toFixed(2)} kg·m/s`, BW - 6, y + 11, { align: "right", size: 11 }); }
      else { let x = BW * 0.33; for (const [v, col] of [[a, C.blue], [c, C.orange]]) { const w2 = v * sc * 0.55; rrect(b, x, y, w2, 14, 3, col); x += w2; } text(b, `${(a + c).toFixed(2)} J`, BW - 6, y + 11, { align: "right", size: 11 }); }
    });
  }
  function report() {
    if (!sim) return;
    const [v1, v2] = sim.after, keB = ke(P.m1, sim.before[0]) + ke(P.m2, sim.before[1]), keA = ke(P.m1, v1) + ke(P.m2, v2);
    if (!sim.boom && P.e === 1 && Math.abs(P.m1 - P.m2) < 0.05 && Math.abs(P.u2) < 0.05 && Math.abs(P.u1) > 0.3) st.swap = true;
    if (!sim.boom && P.e === 0 && !sim.never && keB > 0) st.stick = true;
    if (!sim.boom && P.m2 >= 2 * P.m1 && Math.abs(P.u2) < 0.05 && P.u1 > 0.3 && v1 < -0.05) st.bounce = true;
    if (sim.boom) st.explode = true;
    ch.check(st);
    const lost = keB > 0 ? ((keB - keA) / keB) * 100 : 0;
    out(`<div class="lab-read"><div><small>A after</small><b>${v1.toFixed(2)} m/s</b></div><div><small>B after</small><b>${v2.toFixed(2)} m/s</b></div><div><small>Total momentum</small><b>${(P.m1 * v1 + P.m2 * v2).toFixed(2)} kg·m/s</b></div><div><small>${sim.boom ? "Energy released" : "Kinetic energy lost"}</small><b>${sim.boom ? `${keA.toFixed(2)} J` : `${(keB - keA).toFixed(2)} J (${lost.toFixed(0)}%)`}</b></div></div>
      <p class="lab-msg">${sim.never ? "These gliders never meet: B is moving away at least as fast as A approaches. Change a velocity." : sim.boom ? "They start at rest, so total momentum is zero, and it is still zero after: the lighter glider moves off faster. A spring between them turned stored energy into kinetic energy." : `Momentum is conserved in every collision: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂. Kinetic energy is conserved only when e = 1; with e = ${P.e.toFixed(2)} the gliders separate at ${P.e.toFixed(2)} × the speed they approached, and the lost energy goes to sound, heat and deformation.`}</p>`);
  }
  start();
}
