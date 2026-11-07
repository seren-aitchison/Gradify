// First-order differential equations dy/dx = f(x, y): the slope field, and solution curves from an initial value
// you choose by clicking. Compare Euler's method with the classical fourth-order Runge–Kutta method (RK4) at the
// same step size h; where an exact solution is known, the error at the end of the interval is shown.
import { shell, canvas, slider, select, panel, challenges, clear, fmt, C } from "../lab.js";
import { plane, curve, dot } from "./plot.js";

export const ODES = {
  exp: { label: "dy/dx = y (growth)", f: (x, y) => y, exact: (x, x0, y0) => y0 * Math.exp(x - x0) },
  decay: { label: "dy/dx = −0.5y (decay)", f: (x, y) => -0.5 * y, exact: (x, x0, y0) => y0 * Math.exp(-0.5 * (x - x0)) },
  logistic: { label: "dy/dx = y(1 − y/3) (logistic)", f: (x, y) => y * (1 - y / 3), exact: (x, x0, y0) => (3 * y0) / (y0 + (3 - y0) * Math.exp(-(x - x0))) },
  linear: { label: "dy/dx = x − y", f: (x, y) => x - y, exact: (x, x0, y0) => x - 1 + (y0 - x0 + 1) * Math.exp(-(x - x0)) },
  sinxy: { label: "dy/dx = sin(x) − y/2", f: (x, y) => Math.sin(x) - y / 2, exact: null },
  xy: { label: "dy/dx = −x/y (circles)", f: (x, y) => -x / y, exact: null },
};
export function euler(f, x0, y0, x1, h) { const pts = [[x0, y0]]; let x = x0, y = y0; while (x < x1 - 1e-12) { const s = Math.min(h, x1 - x); y += s * f(x, y); x += s; pts.push([x, y]); if (!Number.isFinite(y) || Math.abs(y) > 1e6) break; } return pts; }
// one classical fourth-order Runge–Kutta step for a scalar equation
const rk4s = (f, x, y, h) => { const k1 = f(x, y), k2 = f(x + h / 2, y + (h / 2) * k1), k3 = f(x + h / 2, y + (h / 2) * k2), k4 = f(x + h, y + h * k3); return y + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4); };
export function rk(f, x0, y0, x1, h) { const pts = [[x0, y0]]; let x = x0, y = y0; while (x < x1 - 1e-12) { const s = Math.min(h, x1 - x); y = rk4s(f, x, y, s); x += s; pts.push([x, y]); if (!Number.isFinite(y) || Math.abs(y) > 1e6) break; } return pts; }

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><p class="mg-tip">Click or tap the plane to choose the initial value (x₀, y₀).</p></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.75, max: 460 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { key: "logistic", x0: -3, y0: 0.4, h: 0.5 }, P0 = { x0: -4, x1: 6, y0: -3, y1: 5 };
  const ch = challenges(ctrl, ctx, [
    { id: "euler", text: "See Euler's method drift: an end-point error above 0.5 for dy/dx = y", test: (x) => x.key === "exp" && x.eErr > 0.5 },
    { id: "rk", text: "Get RK4 within 0.001 of the exact answer with h ≥ 0.25", test: (x) => x.rErr != null && x.rErr < 1e-3 && x.h >= 0.25 },
    { id: "eq", text: "Start the logistic equation at an equilibrium (y₀ = 0 or 3): the solution stays flat", test: (x) => x.key === "logistic" && (Math.abs(x.y0) < 0.06 || Math.abs(x.y0 - 3) < 0.06) },
  ]);
  select(ctrl, { label: "Equation", options: Object.entries(ODES).map(([k, v]) => [k, v.label]), value: s.key, onChange: (v) => { s.key = v; run(); } });
  slider(ctrl, { label: "Step size h", min: 0.05, max: 1, step: 0.05, value: s.h, onInput: (v) => { s.h = v; run(); } });
  slider(ctrl, { label: "Initial y₀", min: -3, max: 5, step: 0.05, value: s.y0, onInput: (v) => { s.y0 = v; run(); } });
  cv.cv.addEventListener("pointerdown", (e) => { const [px, py] = cv.pos(e), P = plane(cv.g, cv.W, cv.H, P0); s.x0 = Math.round(P.ix(px) * 20) / 20; s.y0 = Math.round(P.iy(py) * 20) / 20; run(); });
  function run() {
    const O = ODES[s.key], g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const P = plane(g, W, H, P0); P.draw();
    g.save(); g.strokeStyle = "rgba(167,139,250,.55)"; g.lineWidth = 1.2;
    for (let x = Math.ceil(P0.x0); x <= P0.x1; x += 0.5) for (let y = Math.ceil(P0.y0); y <= P0.y1; y += 0.5) {
      const m = O.f(x, y); if (!Number.isFinite(m)) continue; const L = 0.18 / Math.sqrt(1 + m * m);
      g.beginPath(); g.moveTo(P.X(x - L), P.Y(y - m * L)); g.lineTo(P.X(x + L), P.Y(y + m * L)); g.stroke();
    }
    g.restore();
    const x1 = P0.x1, E = euler(O.f, s.x0, s.y0, x1, s.h), R = rk(O.f, s.x0, s.y0, x1, s.h);
    if (O.exact) curve(g, { ...P, x0: s.x0 }, (x) => (x >= s.x0 ? O.exact(x, s.x0, s.y0) : NaN), C.white, 1.5, [5, 4]);
    for (const [pts, c] of [[E, C.amber], [R, C.green]]) { g.save(); g.strokeStyle = c; g.lineWidth = 2.2; g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(P.X(x), P.Y(y)) : g.moveTo(P.X(x), P.Y(y)))); g.stroke(); g.restore(); if (pts.length < 60) pts.forEach(([x, y]) => dot(g, P.X(x), P.Y(y), c, 2.5)); }
    dot(g, P.X(s.x0), P.Y(s.y0), C.white, 5);
    const ex = O.exact ? O.exact(E.at(-1)[0], s.x0, s.y0) : null, eErr = ex != null ? Math.abs(E.at(-1)[1] - ex) : null, rErr = ex != null && R.at(-1)[0] === E.at(-1)[0] ? Math.abs(R.at(-1)[1] - ex) : null;
    ch.check({ key: s.key, h: s.h, y0: s.y0, eErr, rErr });
    out(`<p>From (${fmt(s.x0, 2)}, ${fmt(s.y0, 2)}) with h = ${s.h}: <span style="color:${C.amber}">Euler</span> reaches y(${fmt(E.at(-1)[0], 2)}) ≈ <b>${fmt(E.at(-1)[1], 5)}</b>, <span style="color:${C.green}">RK4</span> ≈ <b>${fmt(R.at(-1)[1], 5)}</b>${ex != null && Number.isFinite(ex) ? `, exact (white dashes) = <b>${fmt(ex, 5)}</b>. Errors: Euler ${fmt(eErr, 4)}, RK4 ${fmt(rErr, 6)}.` : ". No closed-form solution is shown for this equation."}</p>
      <p>Euler's error shrinks in proportion to h; RK4's in proportion to h⁴, so halving h cuts it about sixteenfold. Each short line in the slope field has the gradient the equation gives at that point: solution curves follow them.</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}
