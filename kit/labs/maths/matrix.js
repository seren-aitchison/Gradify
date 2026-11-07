// Matrices as transformations of the plane. Set the 2×2 matrix [[a, b], [c, d]] and watch the grid, the unit
// square and the basis vectors move: the columns are where i and j land, the determinant is the signed area of
// the image of the unit square, and real eigenvectors are the directions that are only stretched.
import { shell, canvas, slider, panel, challenges, clear, button, fmt, C } from "../lab.js";
import { plane, seg, dot } from "./plot.js";

// eigenvalues of a 2×2 matrix, with eigenvectors when they're real
export function eigen(a, b, c, d) {
  const tr = a + d, det = a * d - b * c, disc = tr * tr - 4 * det;
  if (disc < -1e-12) return { real: false, re: tr / 2, im: Math.sqrt(-disc) / 2 };
  const r = Math.sqrt(Math.max(0, disc)), ls = [(tr + r) / 2, (tr - r) / 2];
  const vec = (l) => { const v = Math.abs(b) > 1e-9 ? [b, l - a] : Math.abs(c) > 1e-9 ? [l - d, c] : l === a ? [1, 0] : [0, 1]; const m = Math.hypot(...v) || 1; return [v[0] / m, v[1] / m]; };
  return { real: true, values: ls, vectors: ls.map(vec) };
}
const PRESETS = [["Identity", [1, 0, 0, 1]], ["Rotate 90°", [0, -1, 1, 0]], ["Reflect in y = x", [0, 1, 1, 0]], ["Shear", [1, 1, 0, 1]], ["Stretch", [2, 0, 0, 0.5]], ["Singular", [1, 2, 0.5, 1]]];

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 1, max: 460 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const m = { a: 1, b: 1, c: 0, d: 1 };
  const ch = challenges(ctrl, ctx, [
    { id: "zero", text: "Make the determinant 0: the plane collapses onto a line", test: (x) => Math.abs(x.det) < 1e-9 },
    { id: "rot", text: "Build a rotation by 90° anticlockwise", test: (x) => x.a === 0 && x.b === -1 && x.c === 1 && x.d === 0 },
    { id: "flip", text: "Find a matrix with negative determinant: orientation reverses", test: (x) => x.det < 0 },
    { id: "complex", text: "Find a matrix with no real eigenvectors", test: (x) => !x.eig.real },
    { id: "area3", text: "Make the unit square's image have area 3", test: (x) => Math.abs(Math.abs(x.det) - 3) < 1e-9 },
  ]);
  const sl = {};
  for (const k of ["a", "b", "c", "d"]) sl[k] = slider(ctrl, { label: `${k} (${{ a: "row 1, column 1", b: "row 1, column 2", c: "row 2, column 1", d: "row 2, column 2" }[k]})`, min: -3, max: 3, step: 0.5, value: m[k], onInput: (v) => { m[k] = v; run(); } });
  const pre = document.createElement("div"); pre.className = "mg-pre"; ctrl.append(pre);
  for (const [name, v] of PRESETS) button(pre, name, () => { ["a", "b", "c", "d"].forEach((k, i) => { m[k] = v[i]; sl[k].value = v[i]; }); run(); });
  function run() {
    const { a, b, c, d } = m, det = a * d - b * c, eig = eigen(a, b, c, d), g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const P = plane(g, W, H, { x0: -5, x1: 5, y0: -5, y1: 5, step: 1 }); P.draw();
    const T = (x, y) => [a * x + b * y, c * x + d * y];
    g.save(); g.strokeStyle = "rgba(167,139,250,.35)"; g.lineWidth = 1;
    for (let k = -6; k <= 6; k++) for (const [p, q] of [[[k, -6], [k, 6]], [[-6, k], [6, k]]]) { const [x1, y1] = T(...p), [x2, y2] = T(...q); g.beginPath(); g.moveTo(P.X(x1), P.Y(y1)); g.lineTo(P.X(x2), P.Y(y2)); g.stroke(); }
    const sq = [[0, 0], [1, 0], [1, 1], [0, 1]].map(([x, y]) => T(x, y));
    g.fillStyle = det >= 0 ? "rgba(90,160,255,.3)" : "rgba(255,77,109,.3)"; g.beginPath(); sq.forEach(([x, y], i) => (i ? g.lineTo(P.X(x), P.Y(y)) : g.moveTo(P.X(x), P.Y(y)))); g.closePath(); g.fill(); g.restore();
    seg(g, P.X(0), P.Y(0), P.X(a), P.Y(c), C.green, 3); dot(g, P.X(a), P.Y(c), C.green, 4);
    seg(g, P.X(0), P.Y(0), P.X(b), P.Y(d), C.amber, 3); dot(g, P.X(b), P.Y(d), C.amber, 4);
    if (eig.real) eig.vectors.forEach(([vx, vy], i) => seg(g, P.X(-6 * vx), P.Y(-6 * vy), P.X(6 * vx), P.Y(6 * vy), i ? C.pink : C.teal, 1.5, [4, 4]));
    ch.check({ a, b, c, d, det, eig });
    out(`<p>M = [[${a}, ${b}], [${c}, ${d}]] · <span style="color:${C.green}">M i = (${a}, ${c})</span> · <span style="color:${C.amber}">M j = (${b}, ${d})</span> · det M = ad − bc = <b>${fmt(det, 3)}</b></p>
      <p>${Math.abs(det) < 1e-9 ? "The determinant is 0: the whole plane is squashed onto a line (or a point), so M has no inverse." : `The unit square becomes a parallelogram of area |det M| = ${fmt(Math.abs(det), 3)}${det < 0 ? ", flipped over (negative determinant reverses orientation)" : ""}.`}
      ${eig.real ? `Eigenvalues λ = ${eig.values.map((v) => fmt(v, 3)).join(" and ")}: vectors along the <span style="color:${C.teal}">dashed</span> <span style="color:${C.pink}">lines</span> are only scaled by λ.` : `Eigenvalues are complex (${fmt(eig.re, 3)} ± ${fmt(eig.im, 3)}i): no real direction is left unrotated.`}</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}
