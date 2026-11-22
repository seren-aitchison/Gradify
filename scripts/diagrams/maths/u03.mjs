// School 3, Algebra: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u03.mjs
import { mk } from "./spec.mjs";

const T = (a, b) => [[...a], [...b]];
// a graph spec body with the common fields
const last = (a) => (a.length > 1 ? a.at(-1) - a.at(-2) : 1);
const G = (range, ticks, body) => ({ range, ticks, grid: [last(ticks[0]), last(ticks[1])], height: [380, 340], axisLabels: ["x", "y"], ...body });
const pt = (expr, x, y, name) => ({ type: "point", expr, x, y, name });

// ---------- u03-01 Basic algebra: the taxi fare 3 + 1.8m ----------
{
  const cost = (m) => 3 + 1.8 * m;
  mk("u03-01", "maths-u03-taxi-fare", "graph", "A taxi fare as a straight line",
    `The expression 3 + 1.8m is a line: £3 at 0 miles and 1.8 more for each mile. At m = 12 it is 3 + 21.6 = £${cost(12).toFixed(2)}.`,
    "A straight-line graph of cost against miles, starting at 3 pounds and rising 1.80 per mile, with the point (12, 24.60) marked.",
    ["The cost in pounds is 3 + 1.8m, where m is the number of miles.", "At 0 miles the fare is £3, the fixed charge.", "Each extra mile adds £1.80, so the graph is a straight line of gradient 1.8.", "At 12 miles the cost is 3 + 1.8 × 12 = £24.60."],
    G({ x: [0, 14], y: [0, 30] }, T([2, 4, 6, 8, 10, 12, 14], [5, 10, 15, 20, 25, 30]), { axisLabels: ["miles m", "cost (£)"], curves: [{ expr: "3+1.8*x", colour: "a1" }],
      points: [{ x: 0, y: 3, label: "£3", colour: "a2", dx: 12, dy: 20, anchor: "start" }, { x: 12, y: cost(12), label: "£24.60 at 12 miles", colour: "a2", dx: -10, dy: -14, anchor: "end" }],
      checks: [pt("3+1.8*x", 0, 3, "0 miles costs £3"), pt("3+1.8*x", 12, +cost(12).toFixed(2), "12 miles costs 3 + 1.8 × 12 = £24.60")], fromLesson: ["£24.60"] }));
}

// ---------- u03-06 Factorisation: 3x(x − 2)(x + 2) has roots −2, 0, 2 ----------
mk("u03-06", "maths-u03-factorised-cubic", "graph", "Factors show where the graph crosses the axis",
  "y = 3x³ − 12x = 3x(x − 2)(x + 2) crosses the x-axis exactly where a factor is zero: at x = −2, 0 and 2.",
  "The graph of y = 3x³ − 12x crossing the x-axis at −2, 0 and 2.",
  ["The graph of y = 3x³ − 12x is an S-shaped cubic.", "It crosses the x-axis where 3x(x − 2)(x + 2) = 0.", "Each factor gives one crossing: x = 0, x = 2 and x = −2."],
  G({ x: [-3, 3], y: [-20, 20] }, T([-3, -2, -1, 1, 2, 3], [-20, -10, 10, 20]), { curves: [{ expr: "3*x^3-12*x", colour: "a1" }],
    points: [-2, 0, 2].map((x) => ({ x, y: 0, label: `x = ${x}`.replace("-", "−"), colour: "a2", dx: x === 0 ? 10 : -10, dy: -12, anchor: x === 0 ? "start" : "end" })),
    checks: [-2, 0, 2].map((x) => pt("3*x^3-12*x", x, 0, `3x³ − 12x is zero at x = ${x}`)), fromLesson: ["3x(x − 2)(x + 2)"] }));

// ---------- u03-09 Linear equations: x = 14/5 ----------
mk("u03-09", "maths-u03-linear-solution", "number-line", "The solution of a linear equation",
  "x = 14/5 = 2.8 is where (2x + 1)/3 − (x − 2)/4 reaches 2: substituting it gives 11.6/3 − 0.8/4 = 2.",
  "A number line from 0 to 5 with the point 14/5 = 2.8 marked.",
  ["The number line runs from 0 to 5.", "The solution x = 14/5 = 2.8 sits between 2 and 3.", "Substituting 14/5 into the left side gives exactly 2, the right side."],
  { range: [0, 5], ticks: { step: 1 }, minor: 0.2, points: [{ value: 2.8, expr: "14/5", label: "x = 14/5 = 2.8" }],
    checks: [{ type: "value", expr: "(2*(14/5)+1)/3-((14/5)-2)/4", value: "2", name: "at x = 14/5 the left side (2x + 1)/3 − (x − 2)/4 equals 2" }], fromLesson: ["x = 14/5 = 2.8"] });

// ---------- u03-10 Simultaneous equations: tickets ----------
mk("u03-10", "maths-u03-ticket-lines", "graph", "Two ticket equations cross at (9, 6)",
  "Each equation is a line in (adult price a, child price c). 2a + 3c = 36 and a + 4c = 33 cross at a = 9, c = 6: the only prices that fit both.",
  "Two straight lines, 2a + 3c = 36 and a + 4c = 33, crossing at the point (9, 6).",
  ["Plot 2a + 3c = 36 as c = (36 − 2a)/3.", "Plot a + 4c = 33 as c = (33 − a)/4.", "The lines cross at (9, 6): adult £9, child £6, matching the elimination."],
  G({ x: [0, 20], y: [0, 14] }, T([4, 8, 12, 16, 20], [2, 4, 6, 8, 10, 12, 14]), { axisLabels: ["a (£)", "c (£)"],
    curves: [{ expr: "(36-2*x)/3", colour: "a1", label: "2a + 3c = 36", labelAt: [3, 11.8] }, { expr: "(33-x)/4", colour: "a2", label: "a + 4c = 33", labelAt: [13, 6.2] }],
    points: [{ x: 9, y: 6, label: "(9, 6)", colour: "a4", dx: 12, dy: -12, anchor: "start" }],
    checks: [{ type: "intersect", a: "(36-2*x)/3", b: "(33-x)/4", x: 9, y: 6, name: "the lines meet at (9, 6): 18 + 18 = 36 and 9 + 24 = 33" }], fromLesson: ["2a + 3c = 36 and a + 4c = 33"] }));

// ---------- u03-11 Quadratic equations: the 5 by 8 rectangle ----------
{
  const w = 5, l = w + 3;
  mk("u03-11", "maths-u03-rectangle-5-by-8", "geometry", "The rectangle with area 40",
    `Width w and length w + 3 give area w(w + 3) = 40. The root w = 5 gives the 5 cm by 8 cm rectangle, area ${w * l} cm²; the root w = −8 has no meaning as a length.`,
    "A rectangle 5 cm wide and 8 cm long with area 40 square centimetres.",
    ["A rectangle has width w and length w + 3.", "Its area is w(w + 3) = 40, which factorises as (w + 8)(w − 5) = 0.", "Only w = 5 is a possible width, so the rectangle is 5 cm by 8 cm.", "Check: 5 × 8 = 40 cm²."],
    { points: { A: [0, 0], B: [l, 0], C: [l, w], D: [0, w] }, hide: ["A", "B", "C", "D"], polygons: [{ pts: ["A", "B", "C", "D"], colour: "a1", opacity: 0.14 }],
      lengths: [{ a: "A", b: "B", value: l, label: "w + 3 = 8", side: -1 }, { a: "B", b: "C", value: w, label: "w = 5" }],
      notes: [{ at: [l / 2, w / 2], text: "40 cm²", colour: "a1" }], view: { x: [-1.5, 10], y: [-1.6, 6.4] }, height: [300, 280],
      checks: [{ type: "area", polygon: ["A", "B", "C", "D"], value: 40, note: 0, name: "5 × 8 = 40" }], fromLesson: ["5 cm by 8 cm"] });
}

// ---------- u03-12 Completing the square: x² − 8x + 5 ----------
{
  const r = Math.sqrt(11);
  mk("u03-12", "maths-u03-complete-square", "graph", "The vertex and roots of x² − 8x + 5",
    "Completing the square gives y = (x − 4)² − 11: the lowest point is (4, −11) and the roots are 4 ± √11, equally either side of x = 4.",
    "A parabola y = x squared minus 8x plus 5 with minimum (4, −11) and roots at about 0.68 and 7.32.",
    ["x² − 8x + 5 = (x − 4)² − 11.", "The squared term is never negative, so the minimum is −11 at x = 4.", "The graph crosses the x-axis where (x − 4)² = 11, at x = 4 ± √11 ≈ 0.68 and 7.32."],
    G({ x: [-1, 9], y: [-13, 8] }, T([2, 4, 6, 8], [-10, -5, 5]), { curves: [{ expr: "x^2-8*x+5", colour: "a1" }],
      points: [{ x: 4, y: -11, label: "(4, −11)", colour: "a2", dx: 0, dy: 20 }, { x: 4 - r, y: 0, label: "4 − √11", colour: "a4", dx: 8, dy: -12, anchor: "start" }, { x: 4 + r, y: 0, label: "4 + √11", colour: "a4", dx: -8, dy: -12, anchor: "end" }],
      checks: [{ type: "min", expr: "x^2-8*x+5", domain: [-1, 9], x: 4, y: -11, name: "the minimum of x² − 8x + 5 is (4, −11)" }, pt("x^2-8*x+5", 4 - r, 0, "4 − √11 is a root"), pt("x^2-8*x+5", 4 + r, 0, "4 + √11 is a root")], fromLesson: ["x = 4 ± √11"] }));
}

// ---------- u03-13 Quadratic formula: 3x² + 5x − 1 ----------
{
  const d = 37, x1 = (-5 + Math.sqrt(d)) / 6, x2 = (-5 - Math.sqrt(d)) / 6;
  mk("u03-13", "maths-u03-quadratic-formula", "graph", "Where 3x² + 5x − 1 crosses the axis",
    "The discriminant 25 + 12 = 37 is positive, so the parabola crosses the x-axis twice: at (−5 ± √37)/6, which is x ≈ 0.180 and x ≈ −1.85.",
    "A parabola y = 3x squared plus 5x minus 1 crossing the x-axis at about −1.85 and 0.18.",
    ["a = 3, b = 5, c = −1 give discriminant b² − 4ac = 37 > 0, so there are two roots.", "x = (−5 ± √37)/6.", "The roots are x ≈ 0.180 and x ≈ −1.85, where the graph meets the x-axis."],
    G({ x: [-3, 2], y: [-4, 10] }, T([-3, -2, -1, 1, 2], [-2, 2, 4, 6, 8, 10]), { curves: [{ expr: "3*x^2+5*x-1", colour: "a1" }],
      points: [{ x: x1, y: 0, label: "0.180", colour: "a2", dx: -8, dy: -12, anchor: "end" }, { x: x2, y: 0, label: "−1.85", colour: "a2", dx: 8, dy: -12, anchor: "start" }],
      checks: [pt("3*x^2+5*x-1", x1, 0, "x = (−5 + √37)/6 ≈ 0.180 is a root"), pt("3*x^2+5*x-1", x2, 0, "x = (−5 − √37)/6 ≈ −1.85 is a root")], fromLesson: ["x ≈ 0.180 or x ≈ −1.85"] }));
}

// ---------- u03-14 Cubic equations: roots 1, 2, 3 ----------
mk("u03-14", "maths-u03-cubic-roots", "graph", "The cubic x³ − 6x² + 11x − 6",
  "Once (x − 1) is a factor, the rest factorises as (x − 2)(x − 3): the graph crosses the x-axis at 1, 2 and 3.",
  "The graph of y = x cubed minus 6x squared plus 11x minus 6 crossing the x-axis at 1, 2 and 3.",
  ["f(1) = 0, so (x − 1) is a factor.", "Dividing leaves x² − 5x + 6 = (x − 2)(x − 3).", "So the graph crosses the x-axis at x = 1, 2 and 3."],
  G({ x: [0, 4], y: [-3, 4] }, T([1, 2, 3, 4], [-2, -1, 1, 2, 3]), { curves: [{ expr: "x^3-6*x^2+11*x-6", colour: "a1" }],
    points: [1, 2, 3].map((x) => ({ x, y: 0, label: `${x}`, colour: "a2", dx: x === 2 ? 8 : -8, dy: -12, anchor: x === 2 ? "start" : "end" })),
    checks: [1, 2, 3].map((x) => pt("x^3-6*x^2+11*x-6", x, 0, `f(${x}) = 0`)), fromLesson: ["Roots: x = 1, 2, 3"] }));

// ---------- u03-15 Polynomial equations: x⁴ − 13x² + 36 ----------
mk("u03-15", "maths-u03-quartic-roots", "graph", "Four roots from a quadratic in x²",
  "With u = x² the equation is (u − 4)(u − 9) = 0, so x² = 4 or 9. Each gives two roots, and the graph crosses the axis four times, at −3, −2, 2 and 3.",
  "The graph of y = x to the fourth minus 13x squared plus 36, a W shape crossing the x-axis at −3, −2, 2 and 3.",
  ["Let u = x²: u² − 13u + 36 = 0 gives u = 4 or u = 9.", "x² = 4 gives x = ±2 and x² = 9 gives x = ±3.", "The W-shaped graph crosses the x-axis at all four values."],
  G({ x: [-3.5, 3.5], y: [-10, 40] }, T([-3, -2, -1, 1, 2, 3], [-10, 10, 20, 30, 40]), { curves: [{ expr: "x^4-13*x^2+36", colour: "a1" }],
    points: [-3, -2, 2, 3].map((x) => ({ x, y: 0, label: `${x}`.replace("-", "−"), colour: "a2", dx: x === -3 || x === 2 ? 8 : -8, dy: -12, anchor: x === -3 || x === 2 ? "start" : "end" })),
    checks: [-3, -2, 2, 3].map((x) => pt("x^4-13*x^2+36", x, 0, `x = ${x} is a root`)), fromLesson: ["x = ±2 or ±3"] }));

// ---------- u03-16 Inequalities: 2x² − 5x − 3 ≥ 0 ----------
mk("u03-16", "maths-u03-quadratic-inequality", "number-line", "Where 2x² − 5x − 3 ≥ 0",
  "The roots −1/2 and 3 split the line; the parabola opens upwards, so the expression is non-negative outside them: x ≤ −1/2 or x ≥ 3.",
  "A number line with the solution set x at most −1/2 and x at least 3 shaded, with closed ends.",
  ["The critical values are x = −1/2 and x = 3, where 2x² − 5x − 3 = 0.", "An upward parabola is above the axis outside its roots.", "Both ends are included because the inequality is ≥."],
  { range: [-3, 5], ticks: { step: 1 }, minor: 0.5, points: [{ value: -0.5, expr: "-1/2", label: "−1/2", below: true }, { value: 3, label: "3", below: true }],
    intervals: [{ from: null, to: -0.5, closed: [false, true], inequality: "x <= -0.5", label: "x ≤ −1/2", colour: "a1" }, { from: 3, to: null, closed: [true, false], inequality: "x >= 3", colour: "a1" }],
    checks: [{ type: "value", expr: "2*(-1/2)^2-5*(-1/2)-3", value: "0", name: "2x² − 5x − 3 = 0 at x = −1/2" }, { type: "value", expr: "2*3^2-5*3-3", value: "0", name: "2x² − 5x − 3 = 0 at x = 3" }], fromLesson: ["x ≤ −1/2 or x ≥ 3"] });

// ---------- u03-17 Simultaneous inequalities: the region and its lattice points ----------
{
  const pts = []; for (let x = 1; x <= 6; x++) for (let y = 0; y <= 7; y++) if (x >= 1 && y > x && x + y <= 6) pts.push([x, y]);
  if (pts.map((p) => p.join(",")).join("|") !== "1,2|1,3|1,4|1,5|2,3|2,4") throw new Error("lattice");
  const P = { A: [1, 1], B: [1, 5], C: [3, 3] }; pts.forEach((p, i) => (P[`Z${i}`] = p));
  mk("u03-17", "maths-u03-inequality-region", "geometry", "The region x ≥ 1, y > x, x + y ≤ 6",
    "The three inequalities enclose a triangle with corners (1, 1), (1, 5) and (3, 3). The six whole-number points inside it, (1, 2) to (2, 4), are the answers.",
    "A triangle on a grid with corners (1, 1), (1, 5) and (3, 3) and six marked lattice points inside or on its edge.",
    ["x ≥ 1 gives the left edge x = 1.", "y > x lies above the line y = x, and x + y ≤ 6 lies below the line x + y = 6.", "The three boundary lines make the triangle.", "The whole-number points in it are (1, 2), (1, 3), (1, 4), (1, 5), (2, 3) and (2, 4)."],
    { points: P, hide: Object.keys(P), polygons: [{ pts: ["A", "B", "C"], colour: "a1", opacity: 0.14 }], grid: { step: 1, axes: true, labels: 1 }, view: { x: [-0.5, 6.5], y: [-0.5, 6.5] }, height: [330, 320],
      circles: pts.map((_, i) => ({ centre: `Z${i}`, r: 0.12, colour: "a2" })), notes: [{ at: [4.5, 2.2], text: "x + y = 6", colour: "a1", size: 12 }, { at: [2.2, 1.2], text: "y = x", colour: "a1", size: 12 }],
      segments: [{ a: "A", b: "B", colour: "a1" }, { a: "B", b: "C", colour: "a1" }, { a: "A", b: "C", colour: "a1", dash: "5 4" }],
      checks: [{ type: "area", polygon: ["A", "B", "C"], value: 4, name: "the triangle has area 4: base 4 and height 2" }, ], fromLesson: ["(1, 2), (1, 3), (1, 4), (1, 5), (2, 3), (2, 4)"] });
}

// ---------- u03-18 Absolute value equation |x| = 2x − 3 ----------
mk("u03-18", "maths-u03-absolute-value", "graph", "|x| = 2x − 3 has one solution",
  "y = |x| and y = 2x − 3 meet only at (3, 3). The other case, x = 1, would need −x = 2x − 3 with x < 0, and the lines do not meet there.",
  "The V-shaped graph y = |x| and the line y = 2x − 3 crossing once at (3, 3).",
  ["Draw y = |x|, a V with its point at the origin.", "Draw y = 2x − 3, a line with gradient 2 crossing the y-axis at −3.", "They meet once, at (3, 3); x = 1 is not a solution because |1| = 1 but 2(1) − 3 = −1."],
  G({ x: [-3, 6], y: [-4, 8] }, T([-2, 2, 4, 6], [-4, -2, 2, 4, 6, 8]), { axisLabels: ["x", "y"], curves: [{ expr: "abs(x)", colour: "a1", label: "y = |x|", labelAt: [-2.8, 3.4] }, { expr: "2*x-3", colour: "a2", label: "y = 2x − 3", labelAt: [3.4, 7], anchor: "end" }],
    points: [{ x: 3, y: 3, label: "(3, 3)", colour: "a4", dx: 12, dy: 18, anchor: "start" }],
    checks: [{ type: "intersect", a: "abs(x)", b: "2*x-3", x: 3, y: 3, name: "|3| = 3 = 2(3) − 3" }], fromLesson: ["The only solution is x = 3"] }));

// ---------- u03-22 Exponential equations: 1000 × 1.04^n ----------
{
  const n = Math.log(1.5) / Math.log(1.04), v11 = 1000 * 1.04 ** 11; if (Math.floor(n) !== 10 || v11 < 1500) throw new Error("exp");
  mk("u03-22", "maths-u03-compound-growth", "graph", "£1,000 at 4% passes £1,500 in year 11",
    `The curve 1000 × 1.04ⁿ meets £1,500 at n = ln 1.5 / ln 1.04 ≈ ${n.toFixed(2)}, so the first whole year above £1,500 is year 11, with £${v11.toFixed(2)}.`,
    "A rising curve for money against years, crossing the line at 1,500 pounds between 10 and 11 years.",
    ["The balance after n years is 1000 × 1.04ⁿ.", "The dashed line is £1,500.", "The curve meets it at n ≈ 10.34, so the balance first exceeds £1,500 after 11 years."],
    G({ x: [0, 14], y: [0, 1800] }, T([2, 4, 6, 8, 10, 12, 14], [400, 800, 1200, 1600]), { axisLabels: ["years n", "balance (£)"], curves: [{ expr: "1000*1.04^x", colour: "a1" }, { expr: "1500", colour: "a2", dash: "6 4" }],
      points: [{ x: n, y: 1500, label: "n ≈ 10.34", colour: "a4", dx: -12, dy: -14, anchor: "end" }, { x: 11, y: v11, label: "£1,539", colour: "a2", dx: 12, dy: 22, anchor: "start" }],
      checks: [{ type: "intersect", a: "1000*1.04^x", b: "1500", x: n, y: 1500, name: "1000 × 1.04ⁿ = 1500 at n = ln 1.5 / ln 1.04" }, pt("1000*1.04^x", 11, v11, "after 11 years the balance is £1,539.45")], fromLesson: ["11 years"] }));
}

// ---------- u03-24 Polynomials: y = −2x³ + 5x² − x + 4 ----------
mk("u03-24", "maths-u03-cubic-shape", "graph", "A cubic with negative leading coefficient",
  "With leading term −2x³ the graph rises on the left and falls on the right; it crosses the y-axis at (0, 4), and a cubic can turn at most twice.",
  "The graph of y = −2x cubed plus 5x squared minus x plus 4, rising on the left and falling on the right, crossing the y-axis at (0, 4).",
  ["The leading term −2x³ dominates for large |x|: the graph is up on the left and down on the right.", "At x = 0, y = 4: the y-intercept.", "A cubic has at most 2 turning points; this one has a minimum then a maximum."],
  G({ x: [-2, 3], y: [-10, 45] }, T([-2, -1, 1, 2, 3], [10, 20, 30, 40]), { curves: [{ expr: "-2*x^3+5*x^2-x+4", colour: "a1" }],
    points: [{ x: 0, y: 4, label: "(0, 4)", colour: "a2", dx: 12, dy: -10, anchor: "start" }], checks: [pt("-2*x^3+5*x^2-x+4", 0, 4, "the y-intercept is (0, 4)")], fromLesson: ["It crosses the y-axis at (0, 4)"] }));

// ---------- u03-27 Remainder theorem: f(x) = 2x³ + 2x² + 3x − 3 ----------
{
  const a = 2, b = 3, f = (x) => 2 * x ** 3 + a * x ** 2 + b * x - 3; if (f(1) !== 4 || f(-1) !== -6) throw new Error("remainder");
  mk("u03-27", "maths-u03-remainder-values", "graph", "Remainders are values of f",
    "The remainder on dividing by (x − 1) is f(1) and by (x + 1) is f(−1). With a = 2 and b = 3 the curve passes through (1, 4) and (−1, −6), as the question requires.",
    "The graph of f(x) = 2x cubed plus 2x squared plus 3x minus 3 through the points (1, 4) and (−1, −6).",
    ["The remainder theorem says dividing by (x − 1) leaves f(1) and dividing by (x + 1) leaves f(−1).", "The equations f(1) = 4 and f(−1) = −6 give a = 2 and b = 3.", "The curve f(x) = 2x³ + 2x² + 3x − 3 passes through (1, 4) and (−1, −6)."],
    G({ x: [-2, 1.5], y: [-20, 14] }, T([-2, -1, 1], [-20, -10, 10]), { curves: [{ expr: "2*x^3+2*x^2+3*x-3", colour: "a1" }],
      points: [{ x: 1, y: 4, label: "(1, 4)", colour: "a2", dx: -12, dy: -12, anchor: "end" }, { x: -1, y: -6, label: "(−1, −6)", colour: "a2", dx: 12, dy: 20, anchor: "start" }],
      checks: [pt("2*x^3+2*x^2+3*x-3", 1, 4, "f(1) = 4"), pt("2*x^3+2*x^2+3*x-3", -1, -6, "f(−1) = −6")], fromLesson: ["a = 2 and b = 3"] }));
}

// ---------- u03-28 Factor theorem: 2x³ − 5x² − x + 6 ----------
mk("u03-28", "maths-u03-factor-theorem", "graph", "Roots of 2x³ − 5x² − x + 6",
  "f(2) = 0 makes (x − 2) a factor; the quadratic left over gives (2x − 3)(x + 1). The graph crosses the axis at −1, 3/2 and 2.",
  "The graph of y = 2x cubed minus 5x squared minus x plus 6 crossing the x-axis at −1, 1.5 and 2.",
  ["f(2) = 16 − 20 − 2 + 6 = 0, so (x − 2) is a factor.", "The other factors are (2x − 3) and (x + 1).", "The roots are x = −1, 3/2 and 2, where the graph meets the x-axis."],
  G({ x: [-1.5, 3], y: [-12, 14] }, T([-1, 1, 2, 3], [-10, -5, 5, 10]), { curves: [{ expr: "2*x^3-5*x^2-x+6", colour: "a1" }],
    points: [{ x: -1, y: 0, label: "−1", colour: "a2", dx: -8, dy: -14, anchor: "end" }, { x: 1.5, y: 0, label: "3/2", colour: "a2", dx: 0, dy: 22 }, { x: 2, y: 0, label: "2", colour: "a2", dx: 10, dy: -14, anchor: "start" }],
    checks: [-1, 1.5, 2].map((x) => pt("2*x^3-5*x^2-x+6", x, 0, `f(${x}) = 0`)), fromLesson: ["(x − 2)(2x − 3)(x + 1)"] }));

// ---------- u03-29 Roots of polynomials: 2(x + 1)(x − 2)(x − 3) ----------
mk("u03-29", "maths-u03-cubic-through-12", "graph", "The cubic with roots −1, 2, 3 through (0, 12)",
  "The roots fix the shape k(x + 1)(x − 2)(x − 3); passing through (0, 12) fixes k = 2, so f(x) = 2x³ − 8x² + 2x + 12.",
  "The graph of y = 2(x + 1)(x − 2)(x − 3) crossing the x-axis at −1, 2 and 3 and the y-axis at 12.",
  ["The roots −1, 2, 3 give f(x) = k(x + 1)(x − 2)(x − 3).", "At x = 0 the value is 6k, and the curve must pass through (0, 12), so k = 2.", "The graph crosses the x-axis at −1, 2 and 3 and the y-axis at 12."],
  G({ x: [-1.5, 3.5], y: [-20, 20] }, T([-1, 1, 2, 3], [-20, -10, 10, 20]), { curves: [{ expr: "2*(x+1)*(x-2)*(x-3)", colour: "a1" }],
    points: [{ x: -1, y: 0, label: "−1", colour: "a2", dx: -8, dy: -12, anchor: "end" }, { x: 2, y: 0, label: "2", colour: "a2", dx: 6, dy: -12, anchor: "start" }, { x: 3, y: 0, label: "3", colour: "a2", dx: 8, dy: -12, anchor: "start" }, { x: 0, y: 12, label: "(0, 12)", colour: "a4", dx: 10, dy: -10, anchor: "start" }],
    checks: [pt("2*(x+1)*(x-2)*(x-3)", 0, 12, "f(0) = 12"), pt("2*(x+1)*(x-2)*(x-3)", -1, 0, "f(−1) = 0"), pt("2*(x+1)*(x-2)*(x-3)", 2, 0, "f(2) = 0"), pt("2*(x+1)*(x-2)*(x-3)", 3, 0, "f(3) = 0"),
      pt("2*x^3-8*x^2+2*x+12", 1, 8, "the expanded form 2x³ − 8x² + 2x + 12 agrees: f(1) = 8"), pt("2*(x+1)*(x-2)*(x-3)", 1, 8, "the factored form gives f(1) = 8")], fromLesson: ["2x^{3} − 8x^{2} + 2x + 12".replace("^{3}", "^{3}")] }));

// ---------- u03-30 Vieta's formulas: 2x² − 6x + 1 ----------
{
  const s = 3, p = 0.5, ss = s * s - 2 * p; if (ss !== 8) throw new Error("vieta");
  const a = (3 - Math.sqrt(7)) / 2, b = (3 + Math.sqrt(7)) / 2; if (Math.abs(a * a + b * b - 8) > 1e-9) throw new Error("vieta2");
  mk("u03-30", "maths-u03-vieta-roots", "graph", "Roots α and β of 2x² − 6x + 1",
    "The roots sum to 3 and multiply to 1/2, so they sit symmetrically about x = 3/2 and α² + β² = 3² − 2 × 1/2 = 8 without finding them.",
    "A parabola y = 2x squared minus 6x plus 1 crossing the x-axis at α, about 0.18, and β, about 2.82, symmetric about x = 1.5.",
    ["The parabola 2x² − 6x + 1 meets the x-axis at α and β.", "Their sum is 6/2 = 3, so their midpoint is x = 3/2, the axis of symmetry.", "Their product is 1/2, so α² + β² = (α + β)² − 2αβ = 9 − 1 = 8."],
    G({ x: [-1, 4], y: [-5, 8] }, T([-1, 1, 2, 3, 4], [-4, -2, 2, 4, 6, 8]), { curves: [{ expr: "2*x^2-6*x+1", colour: "a1" }], marks: [{ x: 1.5, label: "x = 3/2" }],
      points: [{ x: a, y: 0, label: "α", colour: "a2", dx: 6, dy: -12, anchor: "start" }, { x: b, y: 0, label: "β", colour: "a2", dx: -6, dy: -12, anchor: "end" }],
      checks: [pt("2*x^2-6*x+1", a, 0, "α = (3 − √7)/2 is a root"), pt("2*x^2-6*x+1", b, 0, "β = (3 + √7)/2 is a root"), { type: "min", expr: "2*x^2-6*x+1", domain: [-1, 4], x: 1.5, y: -3.5, name: "the axis of symmetry is x = (α + β)/2 = 3/2" }], fromLesson: ["= 8"] }));
}

// ---------- u03-33 Functions: f(x) = x² − 4x ----------
mk("u03-33", "maths-u03-function-values", "graph", "f(x) = x² − 4x takes the value 5 twice",
  "f(−1) = 5, and f(x) = 5 has two solutions, x = −1 and x = 5, where the curve meets the line y = 5.",
  "The parabola y = x squared minus 4x and the line y = 5 meeting at x = −1 and x = 5.",
  ["Plot f(x) = x² − 4x.", "f(−1) = 1 + 4 = 5, so (−1, 5) is on the curve.", "The line y = 5 meets the curve again at x = 5, the second solution of f(x) = 5."],
  G({ x: [-2, 7], y: [-6, 22] }, T([-2, 2, 4, 6], [-5, 5, 10, 15, 20]), { curves: [{ expr: "x^2-4*x", colour: "a1" }, { expr: "5", colour: "a2", dash: "6 4" }],
    points: [{ x: -1, y: 5, label: "(−1, 5)", colour: "a4", dx: 8, dy: -12, anchor: "start" }, { x: 5, y: 5, label: "(5, 5)", colour: "a4", dx: -8, dy: -12, anchor: "end" }],
    checks: [{ type: "intersect", a: "x^2-4*x", b: "5", x: -1, y: 5, name: "f(−1) = 5" }, { type: "intersect", a: "x^2-4*x", b: "5", x: 5, y: 5, name: "f(5) = 5" }], fromLesson: ["x = 5 or x = −1"] }));

// ---------- u03-34 Domain and range: h(x) = 3 + √(x − 1) ----------
mk("u03-34", "maths-u03-domain-range", "graph", "Domain x ≥ 1 and range h ≥ 3",
  "The curve starts at (1, 3) and has no points to the left of x = 1 (the root needs x − 1 ≥ 0). It rises from 3 upwards: the range is h(x) ≥ 3.",
  "The graph of h(x) = 3 plus the square root of x minus 1, starting at the point (1, 3) and rising to the right.",
  ["The root needs x − 1 ≥ 0, so the curve exists only for x ≥ 1.", "The first point is (1, 3), the lowest point of the graph.", "The curve rises without limit, so the range is every value from 3 upwards."],
  G({ x: [-1, 10], y: [0, 8] }, T([2, 4, 6, 8, 10], [2, 4, 6, 8]), { curves: [{ expr: "3+sqrt(x-1)", colour: "a1", domain: [1, 10] }],
    points: [{ x: 1, y: 3, label: "(1, 3)", colour: "a2", dx: -10, dy: -12, anchor: "end" }],
    checks: [{ type: "min", expr: "3+sqrt(x-1)", domain: [1, 10], x: 1, y: 3, name: "the lowest value is h(1) = 3" }], fromLesson: ["the range is h(x) ≥ 3"] }));

// ---------- u03-35 Composite functions: gf(x) = 1/(3x − 2) ----------
mk("u03-35", "maths-u03-composite", "graph", "gf(x) = 1/(3x − 2) meets 1/5 at x = 7/3",
  "gf has a break at x = 2/3, where 3x − 2 = 0, so that value is excluded from the domain. The curve meets y = 1/5 at x = 7/3.",
  "The two branches of y = 1/(3x − 2) either side of x = 2/3, and the horizontal line y = 0.2 meeting the right branch at x = 7/3.",
  ["gf(x) = g(3x − 4) = 1/(3x − 2).", "At x = 2/3 the denominator is zero: the graph has a break and the domain excludes it.", "1/(3x − 2) = 1/5 gives 3x − 2 = 5, so x = 7/3, where the right branch meets y = 1/5."],
  G({ x: [-2, 4], y: [-3, 3] }, T([-2, -1, 1, 2, 3, 4], [-2, -1, 1, 2]), { curves: [{ expr: "1/(3*x-2)", colour: "a1", domain: [-2, 0.5] }, { expr: "1/(3*x-2)", colour: "a1", domain: [0.85, 4] }, { expr: "0.2", colour: "a2", dash: "6 4" }],
    marks: [{ x: 2 / 3, label: "x = 2/3" }], points: [{ x: 7 / 3, y: 0.2, label: "(7/3, 1/5)", colour: "a4", dx: 8, dy: -14, anchor: "start" }],
    checks: [{ type: "intersect", a: "1/(3*x-2)", b: "0.2", x: 7 / 3, y: 0.2, name: "gf(7/3) = 1/5" }], fromLesson: ["x ≠ 2/3"] }));

// ---------- u03-36 Inverse functions: f(x) = √(x − 2) ----------
mk("u03-36", "maths-u03-inverse", "graph", "f and f⁻¹ are reflections in y = x",
  "f(x) = √(x − 2) for x ≥ 2 and f⁻¹(x) = x² + 2 for x ≥ 0 swap their coordinates: (3, 1) on f matches (1, 3) on f⁻¹, a reflection in the line y = x.",
  "The curve y = square root of x minus 2, the curve y = x squared plus 2 for x at least 0, and the line y = x, with the points (3, 1) and (1, 3).",
  ["f(x) = √(x − 2) starts at (2, 0).", "f⁻¹(x) = x² + 2 is its reflection in y = x, so it starts at (0, 2) and exists only for x ≥ 0.", "The point (3, 1) on f reflects to (1, 3) on f⁻¹."],
  G({ x: [-1, 8], y: [-1, 8] }, T([2, 4, 6, 8], [2, 4, 6, 8]), { curves: [{ expr: "sqrt(x-2)", colour: "a1", domain: [2, 8], label: "f", labelAt: [6.2, 2.3] }, { expr: "x^2+2", colour: "a2", domain: [0, 2.45], label: "f⁻¹", labelAt: [1.3, 6.6] }, { expr: "x", colour: "a4", dash: "6 4", domain: [-1, 8] }],
    points: [{ x: 3, y: 1, label: "(3, 1)", colour: "a1", dx: 4, dy: 18, anchor: "start" }, { x: 1, y: 3, label: "(1, 3)", colour: "a2", dx: 12, dy: 4, anchor: "start" }],
    checks: [pt("sqrt(x-2)", 3, 1, "f(3) = 1"), pt("x^2+2", 1, 3, "f⁻¹(1) = 3"), pt("sqrt(x-2)", 2, 0, "f starts at (2, 0)"), pt("x^2+2", 0, 2, "f⁻¹ starts at (0, 2)")], fromLesson: ["f^{−1}(x) = x^{2} + 2"] }));

// ---------- u03-38 Piecewise functions: continuous when k = 0 ----------
mk("u03-38", "maths-u03-piecewise", "graph", "The pieces meet at (2, 1) when k = 0",
  "At x = 2 the right piece gives 2² − 3 = 1 and the left piece gives 2k + 1; they agree when k = 0, and the graph has no jump.",
  "A horizontal line y = 1 for x below 2 joined at (2, 1) to the curve y = x squared minus 3 for x from 2 upwards.",
  ["For x ≥ 2 the curve is x² − 3, which is 1 at x = 2.", "For x < 2 the line is kx + 1, which is 2k + 1 at x = 2.", "Setting 2k + 1 = 1 gives k = 0: the pieces join at (2, 1)."],
  G({ x: [-2, 4], y: [-3, 10] }, T([-2, -1, 1, 2, 3, 4], [-2, 2, 4, 6, 8, 10]), { curves: [{ expr: "0*x+1", colour: "a1", domain: [-2, 2] }, { expr: "x^2-3", colour: "a2", domain: [2, 3.6] }],
    points: [{ x: 2, y: 1, label: "(2, 1)", colour: "a4", dx: -8, dy: -14, anchor: "end" }],
    checks: [pt("0*x+1", 2, 1, "the left piece kx + 1 with k = 0 gives 1 at x = 2"), pt("x^2-3", 2, 1, "the right piece gives 4 − 3 = 1 at x = 2")], fromLesson: ["k = 0"] }));

// ---------- u03-39 Parametric equations: x = 2t + 1, y = t² − 3 ----------
{
  const P = [-1, 0, 1, 2, 3].map((t) => [2 * t + 1, t * t - 3]);
  mk("u03-39", "maths-u03-parametric", "graph", "x = 2t + 1, y = t² − 3 traces a parabola",
    "Each value of t gives a point (2t + 1, t² − 3), and every such point lies on y = (x − 1)²/4 − 3, the Cartesian equation.",
    "A parabola y = (x − 1) squared over 4 minus 3 with points marked for t from −1 to 3.",
    ["Eliminating t: t = (x − 1)/2.", "Substituting gives y = (x − 1)²/4 − 3, a parabola with vertex (1, −3).", "The marked points are t = −1, 0, 1, 2, 3, and each lies on it."],
    G({ x: [-3, 8], y: [-4, 8] }, T([-2, 2, 4, 6, 8], [-4, -2, 2, 4, 6, 8]), { curves: [{ expr: "(x-1)^2/4-3", colour: "a1" }],
      points: P.map((p, i) => ({ x: p[0], y: p[1], label: `t = ${i - 1}`.replace("-", "−"), colour: "a2", dx: i === 1 ? 0 : i < 1 ? 10 : -10, dy: i === 1 ? 20 : -12, anchor: i === 1 ? "middle" : i < 1 ? "start" : "end" })),
      checks: P.map((p, i) => pt("(x-1)^2/4-3", p[0], p[1], `t = ${i - 1} gives (${p[0]}, ${p[1]}), on the curve`)), fromLesson: ["y = (x − 1)^{2}/4 − 3"] }));
}

// ---------- u03-40 Implicit equations: x² + 2y² = 18 meets y = x ----------
{
  const r = Math.sqrt(6);
  mk("u03-40", "maths-u03-ellipse-line", "graph", "The ellipse x² + 2y² = 18 and the line y = x",
    "Putting y = x gives 3x² = 18, so x = ±√6: the line meets the ellipse at (√6, √6) and (−√6, −√6).",
    "An ellipse x squared plus 2y squared equals 18 and the line y = x crossing it at (2.45, 2.45) and (−2.45, −2.45).",
    ["Solve the ellipse for y: y = ±√((18 − x²)/2), the upper and lower halves.", "The line y = x enters at x = −√6 and leaves at x = √6.", "The meeting points are (√6, √6) and (−√6, −√6), about (2.45, 2.45) and (−2.45, −2.45)."],
    G({ x: [-5, 5], y: [-4, 4] }, T([-4, -2, 2, 4], [-3, -2, -1, 1, 2, 3]), { height: [340, 320], curves: [{ expr: "sqrt((18-x^2)/2)", colour: "a1", domain: [-4.24, 4.24] }, { expr: "-sqrt((18-x^2)/2)", colour: "a1", domain: [-4.24, 4.24] }, { expr: "x", colour: "a2", dash: "6 4" }],
      points: [{ x: r, y: r, label: "(√6, √6)", colour: "a4", dx: 10, dy: -12, anchor: "start" }, { x: -r, y: -r, label: "(−√6, −√6)", colour: "a4", dx: -10, dy: 20, anchor: "end" }],
      checks: [{ type: "intersect", a: "sqrt((18-x^2)/2)", b: "x", x: r, y: r, name: "(√6, √6) is on both" }, { type: "intersect", a: "-sqrt((18-x^2)/2)", b: "x", x: -r, y: -r, name: "(−√6, −√6) is on both" }], fromLesson: ["Points: (√6, √6) and (−√6, −√6)"] }));
}

// ---------- u03-41 Recurrence relations: P(n+1) = 0.9 P(n) + 30 ----------
{
  const P = [210]; for (let i = 0; i < 3; i++) P.push(+(0.9 * P[i] + 30).toFixed(6)); if (P[1] !== 219 || 0.9 * 200 + 30 !== 210 || 0.9 * 300 + 30 !== 300) throw new Error("recurrence");
  mk("u03-41", "maths-u03-pond-recurrence", "sequence", "The pond population settles at 300",
    "From 200 fish, each year the population is 0.9 of last year's plus 30: P₁ = 210, P₂ = 219, 227.1, … The terms climb towards 300, the value where 0.9L + 30 = L.",
    "The sequence 210, 219, 227.1, 234.39 and onwards, rising towards 300.",
    ["The population starts at 200 and each year is 0.9 × the previous value + 30.", "P₁ = 0.9 × 200 + 30 = 210 and P₂ = 0.9 × 210 + 30 = 219.", "The terms increase by less each year and approach 300, where 0.9L + 30 = L."],
    { terms: P, rule: { kind: "recurrence", a: 210, expr: "0.9*x+30" }, more: true, fromLesson: ["P_{2} = 0.9 × 210 + 30 = 219"] });
}

// ---------- u03-42 Intermediate algebra: the line y = x + 1 and the circle x² + y² = 13 ----------
mk("u03-42", "maths-u03-line-circle", "geometry", "The line y = x + 1 meets the circle x² + y² = 13",
  "Substituting gives x² + x − 6 = 0, so x = −3 or 2: the line cuts the circle at (−3, −2) and (2, 3), both at distance √13 from the centre.",
  "A circle of radius √13 centred at the origin and the line y = x + 1 meeting it at (−3, −2) and (2, 3).",
  ["The circle x² + y² = 13 has centre O and radius √13 ≈ 3.61.", "The line y = x + 1 crosses the y-axis at (0, 1).", "Solving gives the two points (−3, −2) and (2, 3), each on both the circle and the line."],
  { points: { O: [0, 0], A: [-3, -2], B: [2, 3], L: [0, 1] }, hide: ["O", "L"], circles: [{ centre: "O", r: Math.sqrt(13), colour: "ink" }], segments: [{ a: "A", b: "B", colour: "a2", w: 2.4 }], grid: { step: 1, axes: true, labels: 1 },
    view: { x: [-5, 5], y: [-4.5, 4.5] }, height: [330, 320], labelAt: { A: [-14, 14], B: [14, -10] },
    checks: [{ type: "onCircle", points: ["A", "B"], name: "(−3, −2) and (2, 3) satisfy x² + y² = 13" }, { type: "collinear", points: ["A", "L", "B"], name: "(−3, −2), (0, 1) and (2, 3) lie on y = x + 1" }], fromLesson: ["Points: (−3, −2) and (2, 3)"] });

// ---------- u03-43 Advanced algebra: (1 − 2x)^(1/2) ≈ 1 − x − x²/2 ----------
mk("u03-43", "maths-u03-binomial-sqrt", "graph", "√(1 − 2x) and its three-term expansion",
  "1 − x − x²/2 hugs √(1 − 2x) near x = 0 and the two drift apart towards the edge of validity at |x| = 1/2, where the expansion stops being reliable.",
  "The curve y = the square root of 1 minus 2x and the dashed parabola y = 1 − x − x squared over 2, almost identical near x = 0.",
  ["The expansion is 1 − x − ½x² + …, valid for |x| < ½.", "Near x = 0 the parabola and the curve are almost the same.", "Further from 0 they separate; the curve exists only for x ≤ ½."],
  G({ x: [-1, 1], y: [0, 2] }, T([-1, -0.5, 0.5, 1], [0.5, 1, 1.5, 2]), { curves: [{ expr: "(1-2*x)^0.5", colour: "a1", domain: [-1, 0.5] }, { expr: "1-x-0.5*x^2", colour: "a2", dash: "6 4", domain: [-1, 1] }],
    marks: [{ x: -0.5, label: "−1/2" }, { x: 0.5, label: "1/2" }], points: [{ x: 0, y: 1, label: "(0, 1)", colour: "a4", dx: 12, dy: -12, anchor: "start" }],
    checks: [pt("(1-2*x)^0.5", 0, 1, "√(1 − 2x) = 1 at x = 0"), pt("1-x-0.5*x^2", 0, 1, "the expansion is 1 at x = 0"), pt("(1-2*x)^0.5", 0.5, 0, "the curve ends at x = 1/2")], fromLesson: ["|x| < ½"] }));

// ---------- u03-44 Complex numbers: z = 3 ± 5i ----------
mk("u03-44", "maths-u03-complex-roots", "geometry", "The roots 3 ± 5i of z² − 6z + 34 = 0",
  "The roots are a conjugate pair, mirror images in the real axis, and each has modulus √(9 + 25) = √34 ≈ 5.83.",
  "The points 3 + 5i and 3 − 5i on the complex plane, mirror images in the real axis, each at distance square root of 34 from the origin.",
  ["The formula gives z = (6 ± √−100)/2 = 3 ± 5i.", "Plot 3 + 5i at (3, 5) and 3 − 5i at (3, −5): mirror images in the real axis.", "Each is √(3² + 5²) = √34 from the origin."],
  { points: { O: [0, 0], A: [3, 5], B: [3, -5] }, hide: ["O"], grid: { step: 1, axes: true, labels: 1 }, view: { x: [-1.5, 5.5], y: [-6.5, 6.5] }, height: [350, 360],
    vectors: [{ from: [0, 0], v: [3, 5], colour: "a1" }, { from: [0, 0], v: [3, -5], colour: "a2" }], labelAt: { A: [-30, -2], B: [-30, 4] },
    notes: [{ at: [4.6, 5], text: "3 + 5i", colour: "a1", size: 13 }, { at: [4.6, -5], text: "3 − 5i", colour: "a2", size: 13 }, { at: [0.6, 2.9], text: "√34", colour: "a1", size: 12 }],
    checks: [{ type: "distance", a: "O", b: "A", value: "sqrt(34)", name: "|3 + 5i| = √34" }, { type: "distance", a: "O", b: "B", value: "sqrt(34)", name: "|3 − 5i| = √34" }], fromLesson: ["3 ± 5i"] });

// ---------- u03-45 Boolean algebra: A + A'B = A + B ----------
mk("u03-45", "maths-u03-boolean-venn", "venn", "A + Ā·B covers the same region as A + B",
  "In the Venn diagram A together with the part of B outside A is the same region as A ∪ B: the shaded regions agree, so A·B + A·B̄ + Ā·B = A + B.",
  "A two-set Venn diagram with sets A and B; A together with B-not-A covers the same three regions as A or B.",
  ["The four regions of the diagram are A only, both, B only and neither.", "A + Ā·B takes all of A and the part of B outside A.", "Together that is A only, both and B only: exactly A ∪ B."],
  { sets: [{ name: "A", label: "A" }, { name: "B", label: "B" }], regions: { A: 1, AB: 1, B: 1, "": 1 }, universe: { label: "all inputs" },
    checks: [{ type: "count", event: "A∪(A′∩B)", n: 3, name: "A + Ā·B covers 3 regions" }, { type: "count", event: "A∪B", n: 3, name: "A + B covers the same 3 regions" }], fromLesson: ["A + B"] });
