// Quadratics: y = ax² + bx + c. Move the coefficients and see the parabola, its vertex, its roots and the
// discriminant change together, with the completed-square and factorised forms worked out live. Exact algebra.
import { shell, canvas, slider, challenges, panel, describe, C, fmt } from "../lab.js";
import { plane, curve, dot } from "./plot.js";

export function analyse(a, b, c) {
  const D = b * b - 4 * a * c, vx = -b / (2 * a), vy = c - (b * b) / (4 * a);
  const roots = D > 1e-12 ? [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)].sort((x, y) => x - y) : Math.abs(D) <= 1e-12 ? [vx] : [];
  return { D, vx, vy, roots, complex: D < -1e-12 ? [{ re: vx, im: -Math.sqrt(-D) / (2 * Math.abs(a)) }, { re: vx, im: Math.sqrt(-D) / (2 * Math.abs(a)) }] : null };
}
const n = (v) => fmt(Math.abs(v) < 1e-9 ? 0 : v, 2);
const sgn = (v) => (v < 0 ? `− ${n(-v)}` : `+ ${n(v)}`);

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.72, max: 440 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const say = describe(cv, "The graph of y = ax² + bx + c");
  const s = { a: 1, b: 0, c: -4 }, st = { roots: false, rep: false, vertex: false, none: false };
  let touched = false;
  const ch = challenges(ctrl, ctx, [
    { id: "roots", text: "Make a quadratic whose roots are x = −1 and x = 3", test: (x) => x.roots },
    { id: "rep", text: "Make the discriminant zero: the graph just touches the x-axis (a repeated root)", test: (x) => x.rep },
    { id: "vertex", text: "Move the vertex to (2, −3)", test: (x) => x.vertex },
    { id: "none", text: "Make a parabola that opens downwards and has no real roots", test: (x) => x.none },
  ]);
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  for (const [k, lo, hi] of [["a", -3, 3], ["b", -6, 6], ["c", -6, 6]]) slider(sl, { label: `${k}`, min: lo, max: hi, step: 0.1, value: s[k], fmt: (v) => v.toFixed(1), onInput: (v) => { s[k] = Math.abs(v) < 1e-9 && k === "a" ? 0.1 : +v.toFixed(1); touched = true; draw(); } });
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; g.fillStyle = C.bg; g.fillRect(0, 0, W, H);
    const P = plane(g, W, H, { x0: -6, x1: 6, y0: -8 * (H / W) * 1.4, y1: 8 * (H / W) * 1.4 }); P.draw();
    const { a, b, c } = s, A = analyse(a, b, c), f = (x) => a * x * x + b * x + c;
    curve(g, P, f, C.blue, 2.6);
    g.strokeStyle = "rgba(255,255,255,.25)"; g.setLineDash([4, 4]); g.beginPath(); g.moveTo(P.X(A.vx), 0); g.lineTo(P.X(A.vx), H); g.stroke(); g.setLineDash([]);
    dot(g, P.X(A.vx), P.Y(A.vy), C.amber, 6); for (const r of A.roots) dot(g, P.X(r), P.Y(0), C.green, 6); dot(g, P.X(0), P.Y(c), C.violet, 4);
    const near = (v, t) => Math.abs(v - t) < 0.06;
    if (touched) {
      if (A.roots.length === 2 && near(A.roots[0], -1) && near(A.roots[1], 3)) st.roots = true;
      if (Math.abs(A.D) < 0.02) st.rep = true;
      if (near(A.vx, 2) && near(A.vy, -3)) st.vertex = true;
      if (a < 0 && A.D < 0) st.none = true;
    }
    ch.check(st);
    const kind = A.D > 1e-12 ? "two real roots" : Math.abs(A.D) <= 1e-12 ? "one repeated root" : "no real roots (two complex roots)";
    const rootsTxt = A.roots.length === 2 ? `x = ${n(A.roots[0])} and x = ${n(A.roots[1])}` : A.roots.length === 1 ? `x = ${n(A.roots[0])} (repeated)` : `x = ${n(A.complex[0].re)} ± ${n(A.complex[1].im)}i`;
    const factored = A.roots.length === 2 ? `${n(a)}(x ${sgn(-A.roots[0])})(x ${sgn(-A.roots[1])})` : A.roots.length === 1 ? `${n(a)}(x ${sgn(-A.roots[0])})²` : "doesn't factorise over the real numbers";
    const text = `y = ${n(a)}x² ${sgn(b)}x ${sgn(c)}: opens ${a > 0 ? "upwards" : "downwards"}, vertex (${n(A.vx)}, ${n(A.vy)}), discriminant ${n(A.D)}, ${kind}: ${rootsTxt}.`;
    say(text); ctx.report?.(text);
    out(`<div class="lab-read"><div><small>Discriminant b² − 4ac</small><b>${n(A.D)}</b></div><div><small>Roots</small><b>${rootsTxt}</b></div><div><small>Vertex</small><b>(${n(A.vx)}, ${n(A.vy)})</b></div><div><small>y-intercept</small><b>${n(c)}</b></div></div>
      <p class="lab-msg"><b>Completed square:</b> y = ${n(a)}(x ${sgn(-A.vx)})² ${sgn(A.vy)} &nbsp;·&nbsp; <b>Factorised:</b> y = ${factored}</p>
      <p class="lab-msg">The quadratic formula x = (−b ± √(b² − 4ac)) / 2a comes from completing the square. The discriminant under the root decides everything: positive gives two crossings, zero a single touch at the vertex, negative none (the roots are complex). The axis of symmetry x = −b/2a passes through the vertex, halfway between the roots.</p>`);
  }
  cv.onresize = draw;
  draw();
}
