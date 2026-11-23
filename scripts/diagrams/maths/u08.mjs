// School 8, Multivariable and Vector Calculus: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u08.mjs
import { mk } from "./spec.mjs";

const grid = { step: 1, axes: true, labels: 1 };

// ---------- u08-01 Multivariable Calculus: f(x, y) = x^2 y + 3 x y^2 on the slice y = 2 ----------
{
  const f = (x, y) => x * x * y + 3 * x * y * y, fx = (x, y) => 2 * x * y + 3 * y * y, fy = (x, y) => x * x + 6 * x * y;
  const f0 = f(1, 2), sx = fx(1, 2);
  if (f0 !== 14 || sx !== 16 || fy(1, 2) !== 13) throw new Error("u08-01");
  mk("u08-01", "maths-u08-partial-slice", "graph", "A partial derivative is a slope of a slice",
    `Hold y = 2 and f becomes the curve 2x² + 12x. At x = 1 it passes through (1, ${f0}) with slope f_x(1, 2) = 2xy + 3y² = ${sx}: the partial derivative is an ordinary gradient along the slice. (f_y(1, 2) = ${fy(1, 2)} is the same idea along y.)`,
    "The curve z = 2x² + 12x rising steeply, with its tangent line of slope 16 touching it at the point (1, 14).",
    ["Fix y = 2: f(x, 2) = 2x² + 12x is a curve in one variable.", "At x = 1 its height is f(1, 2) = 14.", "Its slope there is 4x + 12 = 16, which equals f_x(1, 2).", "The tangent line z = 14 + 16(x − 1) touches the curve at that point."],
    { range: { x: [-0.5, 2.5], y: [-6, 50] }, ticks: [[0.5, 1, 1.5, 2, 2.5], [10, 20, 30, 40]], grid: [0.5, 10], height: [380, 360], axisLabels: ["x", "f(x, 2)"],
      curves: [{ expr: "2*x^2+12*x", colour: "a1" }, { expr: "16*x-2", colour: "a2", dash: "6 5", width: 2.2 }],
      points: [{ x: 1, y: 14, label: "(1, 14), slope 16", colour: "a4", dx: 12, dy: 16 }],
      legend: [["z = f(x, 2) = 2x² + 12x", "a1"], ["tangent, slope f_x = 16", "a2"]], legendData: [-0.4, 47],
      checks: [{ type: "point", expr: "2*x^2+12*x", x: 1, y: 14 }, { type: "slope", expr: "2*x^2+12*x", x: 1, value: 16 }, { type: "point", expr: "16*x-2", x: 1, y: 14, name: "the tangent passes through (1, 14)" }],
      fromLesson: ["f(x, y) = x"] });
}

// ---------- u08-02 Directional derivatives: grad f = (2, 4), u = (3, 4)/5, D = 22/5 ----------
{
  const g = [2, 4], u = [3 / 5, 4 / 5], D = g[0] * u[0] + g[1] * u[1];
  if (Math.abs(D - 4.4) > 1e-12) throw new Error("u08-02");
  mk("u08-02", "maths-u08-directional", "geometry", "The rate of change in the direction (3, 4)",
    "At (1, 2) the gradient of f = x² + y² is (2, 4). The unit vector u = (3, 4)/5 = (0.6, 0.8) points the chosen way, and the rate of change is the dot product ∇f · u = 1.2 + 3.2 = 4.4 = 22/5, less than |∇f| = √20 ≈ 4.47.",
    "From the point (1, 2): the gradient vector (2, 4) and a shorter unit vector (0.6, 0.8) in the direction (3, 4), slightly turned from the gradient.",
    ["∇f = (2x, 2y) = (2, 4) at (1, 2).", "The direction (3, 4) has length 5, so the unit vector is u = (0.6, 0.8).", "D_u f = ∇f · u = 2 × 0.6 + 4 × 0.8 = 4.4."],
    { points: { P: [1, 2] }, hide: ["P"], grid, view: { x: [0, 4.5], y: [1, 7] }, height: [480, 420],
      vectors: [{ name: "∇f = (2, 4)", from: [1, 2], v: g, colour: "a1", labelSide: -1 }, { name: "u", from: [1, 2], v: u, colour: "a2", labelSide: 1 }],
      checks: [{ type: "components", vector: 0, v: [2, 4] }, { type: "magnitude", vector: 1, value: 1 }, { type: "multiple", vector: 1, of: 1, k: 1 }],
      notes: [{ at: [2.6, 3.0], text: `D_u f = ∇f · u = ${D}`, colour: "a2", size: 13 }],
      fromLesson: ["(3, 4)"] });
}

// ---------- u08-03 Gradient: grad f = (2, 4) is perpendicular to the level curve; tangent x + 2y = 3 ----------
{
  const g = [2 * 1 * 1, 1 * 1 + 3 * 1 * 1], t = [2, -1];
  if (g[0] !== 2 || g[1] !== 4 || g[0] * t[0] + g[1] * t[1] !== 0) throw new Error("u08-03");
  mk("u08-03", "maths-u08-gradient-level", "geometry", "The gradient is perpendicular to the level curve",
    "For f = x²y + y³ at (1, 1), ∇f = (2xy, x² + 3y²) = (2, 4). The tangent line to the level curve there is 2(x − 1) + 4(y − 1) = 0, i.e. x + 2y = 3, with direction (2, −1); (2, 4) · (2, −1) = 0, so the gradient points straight across the contour, uphill.",
    "From (1, 1) an arrow along the gradient (2, 4) and a dashed tangent line x + 2y = 3 with direction (2, −1), at a right angle.",
    ["∇f(1, 1) = (2, 4).", "The tangent to the level curve is x + 2y = 3, direction (2, −1), since 2 × 2 + 4 × (−1) = 0.", "So the gradient is normal to the level curve and points in the direction of steepest increase."],
    { points: { P: [1, 1], T1: [-1, 2], T2: [3, 0], G: [3, 5] }, hide: ["P", "T1", "T2", "G"], segments: [{ a: "T1", b: "T2", colour: "a3", dash: "7 5", w: 2 }], grid, view: { x: [-1.5, 4.5], y: [-1, 5.5] }, height: [480, 420],
      angles: [{ at: "P", from: "G", to: "T2", right: true, colour: "ink" }],
      vectors: [{ name: "∇f = (2, 4)", from: [1, 1], v: g, colour: "a1", labelSide: 1 }],
      notes: [{ at: [2.4, 0.9], text: "tangent x + 2y = 3", colour: "a3", size: 13 }],
      checks: [{ type: "components", vector: 0, v: [2, 4] }, { type: "perpendicular", a: ["P", "G"], b: ["T1", "T2"], name: "the gradient (2, 4) is perpendicular to the tangent direction (2, −1)" }, { type: "collinear", points: ["P", "T1", "T2"], name: "the tangent line x + 2y = 3 passes through (1, 1)" }],
      fromLesson: ["x + 2y = 3"] });
}

// ---------- u08-05 Double integrals: the triangle 0 <= y <= x <= 1 ----------
mk("u08-05", "maths-u08-triangle-region", "geometry", "The region 0 ≤ y ≤ x ≤ 1",
  "The triangle with corners (0, 0), (1, 0), (1, 1) has area ½. For each x from 0 to 1, y runs from 0 up to x, so ∬ xy dA = ∫₀¹ x · (x²/2) dx = 1/8.",
  "A right triangle under the line y = x between x = 0 and x = 1, with a vertical strip at fixed x running from y = 0 up to y = x.",
  ["The region is bounded by y = 0, x = 1 and the line y = x.", "At a fixed x the strip runs from y = 0 to y = x.", "Integrate over y first: ∫₀ˣ xy dy = x³/2; then over x: ∫₀¹ x³/2 dx = 1/8."],
  { points: { O: [0, 0], A: [1, 0], B: [1, 1], S: [0.6, 0], U: [0.6, 0.6] }, hide: ["O", "A", "B", "S", "U"], polygons: [{ pts: ["O", "A", "B"], colour: "a1", opacity: 0.15 }], segments: [{ a: "S", b: "U", colour: "a2", w: 3 }],
    grid: { step: 0.5, axes: true, labels: 0.5 }, view: { x: [-0.25, 1.4], y: [-0.25, 1.25] }, height: [480, 400],
    notes: [{ at: [0.64, 0.3], text: "y from 0 to x", colour: "a2", size: 13 }, { at: [0.12, 0.22], text: "area 0.5", colour: "a1", size: 13 }],
    checks: [{ type: "area", polygon: ["O", "A", "B"], value: 0.5, note: 1 }, { type: "distance", a: "S", b: "U", value: 0.6, name: "the strip at x = 0.6 runs up to y = x = 0.6" }],
    fromLesson: ["0 ≤ y ≤ x ≤ 1"] });

// ---------- u08-07 Jacobians: x = u + v, y = u - v ----------
{
  const M = [[1, 1], [1, -1]], d = M[0][0] * M[1][1] - M[0][1] * M[1][0], sq = [[0, 0], [1, 0], [1, 1], [0, 1]], im = sq.map(([u, v]) => [u + v, u - v]);
  if (d !== -2) throw new Error("u08-07");
  mk("u08-07", "maths-u08-jacobian-area", "transform", "The Jacobian is the area scale factor",
    "x = u + v, y = u − v sends the unit square in the (u, v) plane to a tilted square in the (x, y) plane. The Jacobian determinant is 1 × (−1) − 1 × 1 = −2: areas double (the minus sign records that orientation flips), so dA = 2 du dv.",
    "The unit square with corners (0, 0), (1, 0), (1, 1), (0, 1) and its image with corners (0, 0), (1, 1), (2, 0), (1, −1), twice the area.",
    ["The corners (u, v) of the unit square map to (u + v, u − v).", "The image has corners (0, 0), (1, 1), (2, 0), (1, −1): a square rotated 45° and enlarged by √2.", "Its area is 2, matching |J| = 2."],
    { view: { x: [-1, 3], y: [-2, 2] }, grid, height: [380, 340], object: { name: "(u, v)", pts: sq, colour: "a1", labelAt: [0, 4] }, images: [{ name: "(x, y)", t: { kind: "matrix", m: M }, pts: im, colour: "a2" }],
      checks: [{ type: "areaScale", image: "(x, y)", value: 2, name: "the image has 2 times the area: |J| = |1 × (−1) − 1 × 1| = 2" }], fromLesson: ["x = u + v"] });
}

// ---------- u08-11 Curl: F = (-y, x, 0) is a rotation field ----------
{
  const F = ([x, y]) => [-y, x], pts = [[1, 0], [0, 1], [-1, 0], [0, -1]], names = ["A", "B", "C", "D"];
  const P = { O: [0, 0] }; names.forEach((n, i) => (P[n] = pts[i]));
  const curl = 1 - -1; // dFy/dx - dFx/dy = 1 - (-1)
  mk("u08-11", "maths-u08-curl-rotation", "geometry", "F = (−y, x) circulates about the origin",
    `At (1, 0) the field is (0, 1), at (0, 1) it is (−1, 0), at (−1, 0) it is (0, −1) and at (0, −1) it is (1, 0): the arrows turn anticlockwise round the origin. The curl ∂F₂/∂x − ∂F₁/∂y = 1 − (−1) = ${curl} measures that spin.`,
    "Four arrows of the field F = (−y, x) at the points (1, 0), (0, 1), (−1, 0) and (0, −1), each pointing along the tangent of the unit circle, anticlockwise.",
    ["At (1, 0), F = (0, 1): straight up.", "At (0, 1), F = (−1, 0): to the left.", "At (−1, 0), F = (0, −1): down; at (0, −1), F = (1, 0): to the right.", "The arrows circulate anticlockwise: curl F = 2 in the z direction."],
    { points: P, hide: ["O", ...names], circles: [{ centre: "O", r: 1, colour: "a3" }], grid, view: { x: [-2.2, 2.2], y: [-2.2, 2.2] }, height: [460, 400],
      vectors: pts.map((p, i) => ({ name: `F(${p[0]}, ${p[1]})`.replace(/-/g, "−"), from: p, v: F(p).map((c) => c + 0), colour: ["a1", "a2", "a4", "a3"][i], labelSide: 1 })),
      checks: [...pts.map((p, i) => ({ type: "components", vector: i, v: F(p).map((c) => c + 0), name: `F(${p.join(", ")}) = (${F(p).join(", ")})` })), { type: "onCircle", circle: 0, points: names, name: "the four points lie on the unit circle" }],
      fromLesson: ["curl"] });
}

// ---------- u08-16 Green's theorem: circulation round the unit circle = 2 x area = 2 pi ----------
{
  const pts = [[1, 0], [0, 1], [-1, 0], [0, -1]], F = ([x, y]) => [-y, x];
  mk("u08-16", "maths-u08-green-circle", "geometry", "Green's theorem on the unit circle",
    "Along the unit circle F = (−y, x) is a tangent vector of length 1, so ∮ (−y dx + x dy) = (length 1) × (circumference 2π) = 2π. Green's theorem gives the same: ∬ 2 dA = 2 × area π = 2π.",
    "The unit circle with four tangent arrows of the field (−y, x), all of length 1 and pointing anticlockwise, enclosing area π.",
    ["On the circle, F = (−y, x) is tangent to the circle and has length 1.", "The circumference is 2π, so the line integral is 1 × 2π = 2π.", "Green: ∬ (∂Q/∂x − ∂P/∂y) dA = ∬ 2 dA = 2π, the same value."],
    { points: { O: [0, 0], A: [1, 0], B: [0, 1], C: [-1, 0], D: [0, -1] }, hide: ["O", "A", "B", "C", "D"], circles: [{ centre: "O", r: 1, colour: "a3" }], grid, view: { x: [-2, 2], y: [-2, 2] }, height: [460, 400],
      vectors: pts.map((p, i) => ({ from: p, v: F(p).map((c) => c + 0), colour: "a1", name: i === 0 ? "|F| = 1" : undefined, labelSide: 1 })),
      notes: [{ at: [-0.7, 0.1], text: "area π", colour: "a3", size: 14 }],
      checks: [...pts.map((p, i) => ({ type: "magnitude", vector: i, value: 1, name: `|F| = 1 at (${p.join(", ")})` })), { type: "onCircle", circle: 0, points: ["A", "B", "C", "D"] }],
      fromLesson: ["unit circle"] });
}

// ---------- u08-22 Fractional calculus: D^(1/2) x = 2 sqrt(x / pi), and again gives 1 ----------
{
  const h = (x) => 2 * Math.sqrt(x / Math.PI);
  if (Math.abs(h(Math.PI) - 2) > 1e-12) throw new Error("u08-22");
  mk("u08-22", "maths-u08-half-derivative", "graph", "Half-way between x and 1",
    "D^½ x = 2√(x/π) sits between f = x and its ordinary derivative 1: it is 2 at x = π. Applying the half-derivative again gives 1, so two half-steps make one whole derivative.",
    "Three graphs for x between 0 and 4: the line y = x, the square-root curve y = 2√(x/π) rising from 0, and the horizontal line y = 1.",
    ["f(x) = x is the line through the origin.", "D^½ f = 2√(x/π) is the curve between them; at x = π it equals 2.", "D^½ applied to that curve gives the constant 1 = f′."],
    { range: { x: [0, 4], y: [0, 4.4] }, ticks: [[1, 2, 3, 4], [1, 2, 3, 4]], grid: [1, 1], height: [360, 340], axisLabels: ["x", "y"],
      curves: [{ expr: "x", colour: "a1" }, { expr: "2*sqrt(x/3.14159265358979)", colour: "a2", samples: 400 }, { expr: "1+0*x", colour: "a4", dash: "6 5" }],
      points: [{ x: Math.PI, y: 2, label: "(π, 2)", colour: "a2", dx: 8, dy: 18 }],
      legend: [["f = x", "a1"], ["D^½ f = 2√(x/π)", "a2"], ["D^½ D^½ f = 1", "a4"]], legendData: [0.15, 4.25],
      checks: [{ type: "point", expr: "2*sqrt(x/3.14159265358979)", x: Math.PI, y: 2, name: "D^½ x = 2√(x/π) equals 2 at x = π" }, { type: "point", expr: "1+0*x", x: 2, y: 1, name: "D^½ D^½ x = 1 = d/dx of x" }],
      fromLesson: ["half-derivative"] });
}
