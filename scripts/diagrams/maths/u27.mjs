// School 27, Mathematical Software and Tools: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u27.mjs
import { mk } from "./spec.mjs";

const must = (c, m) => { if (!c) throw new Error(m); };
const r3 = (x) => +x.toFixed(3);
const T = (a, b) => [[...a], [...b]];
const G = (range, ticks, body) => ({ range, ticks, grid: [Math.abs(ticks[0][1] - ticks[0][0]) || 1, Math.abs(ticks[1][1] - ticks[1][0]) || 1], height: [380, 340], axisLabels: ["x", "y"], ...body });
const pt = (expr, x, y, name) => ({ type: "point", expr, x, y, name });
const sl = (expr, x, value, name) => ({ type: "slope", expr, x, value, name });
const PI = Math.PI;

// ---------- u27-01 roots of x^2 - 2 ----------
{
  const f = "x^2-2", s = Math.SQRT2;
  mk("u27-01", "maths-u27-sqrt2-roots", "graph", "The roots of x² − 2",
    `Solve[x^2 - 2 == 0, x] returns x = −√2 and x = √2. On the graph y = x² − 2 crosses the axis at ±${r3(s)}, and N[Sqrt[2], 10] gives the decimal 1.414213562.`,
    "The parabola y = x² − 2 with its minimum −2 at x = 0 and crossing the x-axis at −√2 and √2.",
    ["Plot y = x² − 2.", "It crosses y = 0 where x² = 2.", "The exact roots are −√2 and √2.", `Numerically √2 ≈ ${r3(s)}.`],
    G({ x: [-3, 3], y: [-3, 7] }, T([-3, -2, -1, 1, 2, 3], [-2, 2, 4, 6]), { curves: [{ expr: f, colour: "a1", domain: [-2.9, 2.9] }],
      points: [{ x: -s, y: 0, label: "−√2", colour: "a2", dx: -8, dy: 24, anchor: "end" }, { x: s, y: 0, label: "√2 ≈ 1.414", colour: "a2", dx: 8, dy: 24 }],
      checks: [pt(f, s, 0, "x = √2 is a root"), pt(f, -s, 0, "x = −√2 is a root")], fromLesson: ["1.414213562"] }));
}

// ---------- u27-03 derivative of x^2 sin x ----------
{
  const f = "x^2*sin(x)", d = "2*x*sin(x)+x^2*cos(x)", x0 = 2, m = 2 * x0 * Math.sin(x0) + x0 * x0 * Math.cos(x0);
  mk("u27-03", "maths-u27-derivative-check", "graph", "Checking x² sin x against 2x sin x + x² cos x",
    `Wolfram|Alpha returns 2x sin x + x² cos x. At x = 2 the product-rule formula gives ${r3(m)}, which is the slope of the curve there, and the second curve is that formula for every x.`,
    "The curve y = x² sin x and the curve of its derivative 2x sin x + x² cos x, with the point x = 2 marked.",
    ["Plot f(x) = x² sin x.", "Plot the returned derivative 2x sin x + x² cos x.", `At x = 2 the derivative's value ${r3(m)} equals the slope of f.`, "Where f has a turning point the derivative crosses zero."],
    G({ x: [0, 4], y: [-8, 8] }, T([1, 2, 3, 4], [-8, -4, 4, 8]), { curves: [{ expr: f, colour: "a1", label: "f(x)", labelAt: [3.3, -6.6] }, { expr: d, colour: "a2", label: "f′(x)", labelAt: [0.5, 3.2] }],
      points: [{ x: x0, y: m, colour: "a2" }],
      checks: [sl(f, x0, m, `the slope of x² sin x at x = 2 is 2x sin x + x² cos x = ${r3(m)}`), sl(f, 1, 2 * Math.sin(1) + Math.cos(1), "and at x = 1 it is 2 sin 1 + cos 1"), pt(d, x0, m, "the derivative curve passes through (2, f′(2))")], fromLesson: ["2x sin x + x"] }));
}

// ---------- u27-05 roots of x^2 - 5x + 6 ----------
{
  const f = "x^2-5*x+6";
  mk("u27-05", "maths-u27-maple-roots", "graph", "solve(x^2 - 5*x + 6 = 0, x) gives 2, 3",
    "The parabola y = x² − 5x + 6 crosses the x-axis at x = 2 and x = 3, the two values Maple's solve returns. Its minimum is below the axis halfway between them, at x = 2.5.",
    "The parabola y = x² − 5x + 6 crossing the x-axis at (2, 0) and (3, 0).",
    ["Plot y = x² − 5x + 6.", "It crosses the axis where the quadratic is zero.", "Those places are x = 2 and x = 3.", "That is the output of solve."],
    G({ x: [0, 5], y: [-1, 7] }, T([1, 2, 3, 4, 5], [-1, 2, 4, 6]), { curves: [{ expr: f, colour: "a1", domain: [0.1, 4.9] }],
      points: [{ x: 2, y: 0, label: "2", colour: "a2", dx: -8, dy: -12, anchor: "end" }, { x: 3, y: 0, label: "3", colour: "a2", dx: 8, dy: -12 }],
      checks: [pt(f, 2, 0, "x = 2 is a root"), pt(f, 3, 0, "x = 3 is a root"), { type: "min", expr: f, domain: [0, 5], x: 2.5, y: -0.25, name: "the minimum is at x = 2.5, halfway between the roots" }], fromLesson: ["returns 2, 3"] }));
}

// ---------- u27-06 (x+1)^3 ----------
{
  const f = "(x+1)^3", tg = "27*x-54+27";
  mk("u27-06", "maths-u27-maxima-cubic", "graph", "(x + 1)³ and its gradient at x = 2",
    "Maxima expands (x + 1)³ to x³ + 3x² + 3x + 1 and differentiates to 3x² + 6x + 3. Substituting x = 2 gives 27 for the gradient: the tangent at (2, 27) rises 27 units for every 1 across.",
    "The cubic y = (x + 1)³ with its steep tangent line touching at the point (2, 27).",
    ["The curve is y = (x + 1)³ = x³ + 3x² + 3x + 1.", "Its derivative is 3x² + 6x + 3.", "At x = 2 the derivative is 12 + 12 + 3 = 27.", "The tangent at (2, 27) has gradient 27."],
    G({ x: [-1, 3], y: [-5, 70] }, T([-1, 1, 2, 3], [10, 20, 30, 40, 50, 60, 70]), { grid: [1, 10], curves: [{ expr: f, colour: "a1", domain: [-1, 2.9] }, { expr: tg, colour: "a2", dash: "6 4", domain: [1.2, 2.5] }],
      points: [{ x: 2, y: 27, label: "(2, 27)", colour: "a4", dx: 10, dy: 22 }],
      checks: [pt(f, 2, 27, "(2 + 1)³ = 27"), sl(f, 2, 27, "the gradient at x = 2 is 3·4 + 6·2 + 3 = 27"), sl(tg, 2, 27, "the tangent has gradient 27")], fromLesson: ["3*x^2 + 6*x + 3"] }));
}

// ---------- u27-09 linear system ----------
{
  const a = "5-2*x", b = "(10-x)/3";
  mk("u27-09", "maths-u27-linear-system", "graph", "2x + y = 5 and x + 3y = 10 meet at (1, 3)",
    "Each equation is a straight line. MATLAB's A \\ b returns [1; 3], the one point where the lines cross, and A*x reproduces b.",
    "Two straight lines, y = 5 − 2x and y = (10 − x)/3, crossing at the point (1, 3).",
    ["Write each equation as a line: y = 5 − 2x and y = (10 − x)/3.", "The solution is the point on both lines.", "They cross at (1, 3), the output of A \\ b.", "Check: 2 + 3 = 5 and 1 + 9 = 10."],
    G({ x: [-1, 5], y: [-2, 8] }, T([-1, 1, 2, 3, 4, 5], [-2, 2, 4, 6, 8]), { curves: [{ expr: a, colour: "a1", label: "2x + y = 5", labelAt: [-0.8, 6.6] }, { expr: b, colour: "a2", label: "x + 3y = 10", labelAt: [3.2, 2.9] }],
      points: [{ x: 1, y: 3, label: "(1, 3)", colour: "a4", dx: 12, dy: -12 }],
      checks: [{ type: "intersect", a, b, x: 1, y: 3, name: "the two lines meet at (1, 3)" }, pt(a, 1, 3, "2(1) + 3 = 5"), pt(b, 1, 3, "1 + 3(3) = 10")], fromLesson: ["returns [1; 3]"] }));
}

// ---------- u27-10 squares ----------
{
  const v = [1, 2, 3, 4].map((n) => n * n), mean = v.reduce((a, b) => a + b) / 4;
  must(mean === 7.5, "mean");
  mk("u27-10", "maths-u27-octave-squares", "barchart", "x = 1:4; y = x.^2",
    "The squares of 1 to 4 are 1, 4, 9, 16, which total 30, so mean(y) = 30/4 = 7.5. The same lines run unchanged in MATLAB.",
    "A bar chart of the four values 1, 4, 9 and 16 for x = 1 to 4.",
    ["x = 1:4 gives the values 1, 2, 3, 4.", "x.^2 squares each one: 1, 4, 9, 16.", "The total is 30.", "mean(y) = 30/4 = 7.5."],
    { categories: ["x = 1", "x = 2", "x = 3", "x = 4"], values: v, range: { y: [0, 18] }, ticks: [4, 8, 12, 16], axisLabels: ["x", "x²"], checks: [{ type: "total", value: 30, name: "1 + 4 + 9 + 16 = 30, so the mean is 30/4 = 7.5" }], fromLesson: ["7.5"] });
}

// ---------- u27-14 SciPy minimum ----------
{
  const f = "(x-2)^2+1";
  mk("u27-14", "maths-u27-scipy-minimum", "graph", "The minimum of (x − 2)² + 1",
    "The parabola f(x) = (x − 2)² + 1 has its lowest point at x = 2, where f = 1. These are the values res.x ≈ 2.0 and res.fun ≈ 1.0 that minimize_scalar reports.",
    "The parabola y = (x − 2)² + 1 with its lowest point marked at (2, 1).",
    ["Plot f(x) = (x − 2)² + 1.", "The curve is lowest at x = 2.", "There f(2) = 1.", "minimize_scalar returns res.x ≈ 2.0 and res.fun ≈ 1.0."],
    G({ x: [-1, 5], y: [0, 10] }, T([-1, 1, 2, 3, 4, 5], [2, 4, 6, 8, 10]), { curves: [{ expr: f, colour: "a1", domain: [-0.9, 4.9] }],
      points: [{ x: 2, y: 1, label: "min (2, 1)", colour: "a2", dx: 12, dy: 24 }], checks: [{ type: "min", expr: f, domain: [-1, 5], x: 2, y: 1, name: "the minimum of (x − 2)² + 1 is 1 at x = 2" }], fromLesson: ["res.x ≈ 2.0"] }));
}

// ---------- u27-15 SymPy antiderivative ----------
{
  const f = "x*sin(x)", F = "sin(x)-x*cos(x)";
  mk("u27-15", "maths-u27-sympy-antiderivative", "graph", "x sin x and its antiderivative",
    "SymPy gives ∫ x sin x dx = sin x − x cos x. Differentiating that returns x sin x: the slope of the antiderivative curve at each x equals the height of x sin x, which is the quick check.",
    "The curve y = x sin x and its antiderivative y = sin x − x cos x, with the slope of the second at x = 2 equal to the height of the first.",
    ["Plot f(x) = x sin x.", "Plot SymPy's antiderivative sin x − x cos x.", "At x = 2 the antiderivative's slope equals f(2) = 2 sin 2.", "That is the check: differentiate the result."],
    G({ x: [0, 5], y: [-5, 7] }, T([1, 2, 3, 4, 5], [-4, -2, 2, 4, 6]), { curves: [{ expr: f, colour: "a1", label: "x sin x", labelAt: [3.7, -1.4] }, { expr: F, colour: "a2", label: "sin x − x cos x", labelAt: [3.6, 5.2] }],
      points: [{ x: 2, y: 2 * Math.sin(2), label: "f(2)", colour: "a1", dx: 10, dy: 20 }],
      checks: [sl(F, 2, 2 * Math.sin(2), "the antiderivative's slope at x = 2 is 2 sin 2 = f(2)"), sl(F, 4, 4 * Math.sin(4), "and at x = 4 it is 4 sin 4 = f(4)"), pt(f, 2, 2 * Math.sin(2), "f(2) = 2 sin 2")], fromLesson: ["-x*cos(x) + sin(x)"] }));
}

// ---------- u27-17 R fit ----------
mk("u27-17", "maths-u27-r-fit", "scatter", "lm(y ~ x): intercept 0, slope 2",
  "The five points (1, 2) to (5, 10) lie exactly on y = 2x, so coef(fit) gives intercept 0 and slope 2 and R² is 1, a perfect fit.",
  "Five points on the straight line y = 2x from (1, 2) to (5, 10), with the fitted line through them all.",
  ["Plot the five points x = 1:5 against y = 2, 4, 6, 8, 10.", "Every point lies on one straight line.", "The fitted line has intercept 0 and slope 2.", "The fit is perfect, so R² = 1."],
  { points: [[1, 2], [2, 4], [3, 6], [4, 8], [5, 10]], line: { a: 0, b: 2 }, r: 1, range: { x: [0, 6], y: [0, 12] }, ticks: T([1, 2, 3, 4, 5, 6], [2, 4, 6, 8, 10, 12]), grid: [1, 2], axisLabels: ["x", "y"], lineLabel: "y = 2x", lineLabelAt: [4.2, 8.2], fromLesson: ["intercept 0 and slope 2"] });

// ---------- u27-27 Beta posterior ----------
{
  const f = "1320*x^7*(1-x)^3";
  mk("u27-27", "maths-u27-beta-posterior", "graph", "The Beta(8, 4) posterior",
    "With a uniform Beta(1, 1) prior and 7 heads in 10 tosses the posterior is Beta(8, 4), with density 1320 x⁷(1 − x)³. It has area 1 and mean 8/12 ≈ 0.67, which az.summary reports.",
    "A single-humped curve over p from 0 to 1, peaking near 0.7 and centred near 0.67.",
    ["Start from a flat prior on the coin's bias p.", "Seven heads in ten tosses multiply by p⁷(1 − p)³.", "The result is the Beta(8, 4) density 1320 p⁷(1 − p)³.", "Its mean is 8/12 ≈ 0.67."],
    G({ x: [0, 1], y: [0, 3.5] }, T([0.25, 0.5, 0.75, 1], [1, 2, 3]), { grid: [0.25, 1], axisLabels: ["p", "density"], curves: [{ expr: f, colour: "a1", domain: [0, 1] }], marks: [{ x: 8 / 12, label: "mean 0.67" }],
      checks: [{ type: "area", expr: f, from: 0, to: 1, value: 1, tol: 0.001, name: "the posterior density has area 1" }, { type: "area", expr: `x*${f}`, from: 0, to: 1, value: 8 / 12, tol: 0.001, name: "its mean is 8/12 ≈ 0.67" }, { type: "max", expr: f, domain: [0, 1], x: 0.7, y: 1320 * 0.7 ** 7 * 0.3 ** 3, name: "its peak is at p = 7/10" }], fromLesson: ["8/12"] }));
}

// ---------- u27-32 / u27-48 Solver region ----------
{
  const P = { O: [0, 0], A: [4, 0], B: [3, 1], C: [0, 2] }, obj = ([x, y]) => 3 * x + 2 * y;
  const vals = Object.fromEntries(Object.entries(P).map(([k, v]) => [k, obj(v)]));
  must(vals.A === 12 && Math.max(...Object.values(vals)) === 12 && P.B[0] + P.B[1] === 4 && P.B[0] + 3 * P.B[1] === 6 && P.C[0] + 3 * P.C[1] === 6, "LP");
  const body = {
    points: P, labelAt: { O: [-14, 14], A: [14, 14], B: [14, -8], C: [-16, -4] }, grid: { step: 1, axes: false }, view: { x: [-0.8, 5.5], y: [-0.8, 3.5] }, height: [340, 320],
    polygons: [{ pts: ["O", "A", "B", "C"], colour: "a1", opacity: 0.12 }], segments: [{ a: "O", b: "A", colour: "a1", w: 3 }, { a: "A", b: "B", colour: "a1", w: 3 }, { a: "B", b: "C", colour: "a1", w: 3 }, { a: "C", b: "O", colour: "a1", w: 3 }],
    notes: [{ at: [4.25, 0.8], text: "x + y = 4", colour: "a1" }, { at: [1.2, 1.9], text: "x + 3y = 6", colour: "a1" }, { at: [3.0, -0.5], text: "profit 12 at (4, 0)", colour: "a2" }, { at: [3.2, 1.45], text: "(3, 1): 11", colour: "a4" }],
    checks: [{ type: "value", expr: "3*4+2*0", value: 12, name: "profit 3x + 2y at (4, 0) is 12" }, { type: "value", expr: "3*3+2*1", value: 11, name: "profit at the corner (3, 1) is 11" }, { type: "value", expr: "3*0+2*2", value: 4, name: "profit at the corner (0, 2) is 4" },
      { type: "value", expr: "4+0", value: 4, name: "(4, 0) satisfies x + y = 4" }, { type: "value", expr: "4+3*0", value: 4, tol: 2, name: "(4, 0) satisfies x + 3y ≤ 6" }, { type: "value", expr: "3+1", value: 4, name: "(3, 1) lies on x + y = 4" }, { type: "value", expr: "3+3*1", value: 6, name: "(3, 1) lies on x + 3y = 6" }, { type: "value", expr: "0+3*2", value: 6, name: "(0, 2) lies on x + 3y = 6" }],
  };
  const desc = ["The constraints x + y ≤ 4, x + 3y ≤ 6, x ≥ 0 and y ≥ 0 bound a four-cornered region.", "The corners are (0, 0), (4, 0), (3, 1) and (0, 2).", "Profit 3x + 2y is 0, 12, 11 and 4 at them.", "The largest is 12 at (4, 0): x = 4, y = 0."];
  mk("u27-32", "maths-u27-solver-region", "geometry", "The feasible region and the best corner",
    "Solver's answer x = 4, y = 0 is a corner of the feasible region. Profit 3x + 2y is 0 at the origin, 12 at (4, 0), 11 at (3, 1) and 4 at (0, 2), so the largest profit, 12, is at (4, 0).",
    "A four-sided region with corners (0, 0), (4, 0), (3, 1) and (0, 2), bounded by x + y = 4 and x + 3y = 6.", desc, { ...body, also: ["maths:u27-48"], fromLesson: ["x = 4, y = 0"] });
}

// ---------- u27-34 circumcentre ----------
{
  const A = [0, 0], B = [6, 0], C = [2, 4], O = [3, 1], r = Math.hypot(3, 1);
  must(Math.abs(Math.hypot(C[0] - O[0], C[1] - O[1]) - r) < 1e-9, "circumcentre");
  mk("u27-34", "maths-u27-circumcentre", "geometry", "The circumcentre of a triangle",
    "The perpendicular bisectors of the three sides of triangle ABC meet at one point O = (3, 1). A circle centred there passes through A, B and C. Dragging a vertex in GeoGebra moves everything but keeps this true.",
    "A triangle ABC with a circle through its three vertices, centred at O where the perpendicular bisectors of the sides cross.",
    ["Draw triangle ABC with A = (0, 0), B = (6, 0), C = (2, 4).", "Mark the midpoint of each side and draw its perpendicular bisector.", "All three bisectors pass through O = (3, 1).", "The circle centred at O through A also passes through B and C."],
    { points: { A, B, C, O, M: [3, 0], N: [1, 2], K: [4, 2] }, labelAt: { A: [-14, 14], B: [14, 14], C: [0, -12], O: [12, -8], M: [0, 16], N: [-14, -4], K: [14, -4] }, grid: { step: 1, axes: false }, view: { x: [-3, 9], y: [-3.5, 5.5] }, height: [380, 340],
      polygons: [{ pts: ["A", "B", "C"], colour: "a1", opacity: 0.06 }], segments: [{ a: "A", b: "B", colour: "a1", w: 3 }, { a: "B", b: "C", colour: "a1", w: 3 }, { a: "C", b: "A", colour: "a1", w: 3 }, { a: "M", b: "O", colour: "a2", dash: "5 4" }, { a: "N", b: "O", colour: "a2", dash: "5 4" }, { a: "K", b: "O", colour: "a2", dash: "5 4" }],
      circles: [{ centre: "O", through: "A", colour: "a4" }],
      checks: [{ type: "midpoint", m: "M", a: "A", b: "B" }, { type: "midpoint", m: "N", a: "A", b: "C" }, { type: "midpoint", m: "K", a: "B", b: "C" }, { type: "perpendicular", a: ["M", "O"], b: ["A", "B"], name: "OM is perpendicular to AB" }, { type: "perpendicular", a: ["N", "O"], b: ["A", "C"], name: "ON is perpendicular to AC" }, { type: "perpendicular", a: ["K", "O"], b: ["B", "C"], name: "OK is perpendicular to BC" }, { type: "onCircle", circle: 0, points: ["A", "B", "C"], name: "the circle centred at O passes through A, B and C" }],
      fromLesson: ["circumcentre"] });
}

// ---------- u27-35 Desmos slider ----------
{
  const c = (a) => `${a}*(x-2)^2+1`;
  mk("u27-35", "maths-u27-desmos-slider", "graph", "y = a(x − 2)² + 1 for three values of a",
    "Every value of a gives a parabola with its vertex at (2, 1). Positive a opens upwards, negative a opens downwards, and a larger |a| makes the curve narrower: a = 2 is steeper than a = 1.",
    "Three parabolas with the same vertex (2, 1): a = 1 and a = 2 opening upwards, a = −1 opening downwards.",
    ["Type y = a(x − 2)² + 1 and accept the slider for a.", "With a = 1 the parabola opens upwards from (2, 1).", "With a = 2 it is narrower; with a = −1 it opens downwards.", "The vertex stays at (2, 1) throughout."],
    G({ x: [-1, 5], y: [-6, 8] }, T([-1, 1, 2, 3, 4, 5], [-6, -4, -2, 2, 4, 6, 8]), { curves: [{ expr: c(1), colour: "a1", label: "a = 1", labelAt: [4.2, 4.0] }, { expr: c(2), colour: "a2", label: "a = 2", labelAt: [1.0, 7.0] }, { expr: c(-1), colour: "a4", label: "a = −1", labelAt: [4.2, -1.2] }],
      points: [{ x: 2, y: 1, label: "vertex (2, 1)", colour: "ink", dx: 0, dy: -30, anchor: "middle" }],
      checks: [-1, 1, 2].map((a) => pt(c(a), 2, 1, `with a = ${a} the vertex is (2, 1)`)).concat([sl(c(2), 3, 4, "a = 2: the gradient at x = 3 is 4"), sl(c(1), 3, 2, "a = 1: the gradient at x = 3 is only 2")]), fromLesson: ["vertex stays at (2, 1)"] }));
}

// ---------- u27-40 factor 360 ----------
mk("u27-40", "maths-u27-factor-360", "factor-tree", "factor(360) = 2³ × 3² × 5",
  "GP returns the matrix [2, 3; 3, 2; 5, 1]: the primes of 360 with their exponents. The factor tree shows where they come from, and eulerphi(360) = 360 × (1/2)(2/3)(4/5) = 96 uses the same three primes.",
  "A factor tree for 360 splitting into 2 and 180, then down to three 2s, two 3s and a 5.",
  ["Split 360 = 2 × 180.", "Keep splitting: 180 = 2 × 90, 90 = 2 × 45, 45 = 5 × 9, 9 = 3 × 3.", "The prime leaves are 2, 2, 2, 5, 3, 3.", "So 360 = 2³ × 3² × 5, as factor(360) reports."],
  { tree: { n: 360, children: [{ n: 2 }, { n: 180, children: [{ n: 2 }, { n: 90, children: [{ n: 2 }, { n: 45, children: [{ n: 5 }, { n: 9, children: [{ n: 3 }, { n: 3 }] }] }] }] }] }, result: "2^{3} × 3^{2} × 5", fromLesson: ["96"] });

// ---------- u27-45 damped oscillation ----------
{
  const w = Math.sqrt(99), f = `exp(-x)*cos(${w}*x)`;
  mk("u27-45", "maths-u27-damped-oscillation", "graph", "The mass–spring–damper oscillation",
    `For m = 1 kg, c = 2 N·s/m and k = 100 N/m, ẍ + 2ẋ + 100x = 0 gives x = e^{−t} cos(√99 t) from a start at x = 1: it oscillates at √99 ≈ ${r3(w)} rad/s, close to √100 = 10, inside the decaying envelope e^{−t}.`,
    "A cosine wave of about ten radians per second starting at 1 and shrinking inside the dashed envelope e^{−t}.",
    ["The model is ẍ + 2ẋ + 100x = 0 with the mass displaced to x = 1.", "The solution is x = e^{−t} cos(√99 t).", "The oscillation has angular frequency about 10 rad/s.", "The amplitude decays like e^{−t}."],
    G({ x: [0, 4], y: [-1.2, 1.2] }, T([1, 2, 3, 4], [-1, -0.5, 0.5, 1]), { grid: [1, 0.5], axisLabels: ["t (s)", "x"], height: [320, 300], curves: [{ expr: "exp(-x)", colour: "a2", dash: "6 4", domain: [0, 4] }, { expr: "-exp(-x)", colour: "a2", dash: "6 4", domain: [0, 4] }, { expr: f, colour: "a1", domain: [0, 4], samples: 600 }],
      checks: [pt(f, 0, 1, "x(0) = 1"), pt(f, 2 * PI / w, Math.exp(-2 * PI / w), `one period 2π/√99 ≈ ${r3(2 * PI / w)} s later the displacement is e^{−t}`), { type: "value", expr: "exp(-x)*cos(9.9498743710662*x)", x: 2, between: [-0.1354, 0.1354], name: "at t = 2 s the oscillation is inside the envelope ±e^{−2}" }], fromLesson: ["√100 = 10"] }));
}

// ---------- u27-46 step response ----------
{
  const f = "1-exp(-x/2)";
  mk("u27-46", "maths-u27-step-response", "graph", "Step response of 1/(2s + 1)",
    "A first-order system with time constant 2 s responds to a unit step with y = 1 − e^{−t/2}. At t = 2 s it has reached 1 − e^{−1} = 0.632 of the final value 1, about 63%.",
    "A curve rising from 0 towards 1, passing the point (2, 0.63) marked by a dashed guide.",
    ["A step input drives the transfer function 1/(2s + 1).", "The output is y = 1 − e^{−t/2}.", "At t = 2 s, y = 1 − e⁻¹ ≈ 0.632.", "The response is about 63% of the way to its final value."],
    G({ x: [0, 10], y: [0, 1.2] }, T([2, 4, 6, 8, 10], [0.5, 1]), { grid: [2, 0.5], axisLabels: ["t (s)", "output"], curves: [{ expr: f, colour: "a1", domain: [0, 10] }], marks: [{ y: 1, label: "final value 1" }, { x: 2, to: 1 - Math.exp(-1) }],
      points: [{ x: 2, y: 1 - Math.exp(-1), label: "63% at t = 2", colour: "a2", dx: 10, dy: 22 }],
      checks: [pt(f, 2, 1 - Math.exp(-1), "y(2) = 1 − e⁻¹ ≈ 0.632"), pt(f, 0, 0, "the output starts at 0"), sl(f, 0, 0.5, "the initial slope is 1/τ = 0.5")], fromLesson: ["63%"] }));
}
