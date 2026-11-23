// School 17, Topology and Advanced Pure Mathematics: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u17.mjs
import { mk } from "./spec.mjs";

const G = (range, ticks, body) => ({ range, ticks, grid: [ticks[0].at(-1), ticks[1].at(-1)], height: [360, 320], axisLabels: ["x", "y"], ...body });
const PI = 3.141592653589793;

// ---------- u17-02 interior, closure, boundary of [0, 1) ----------
mk("u17-02", "maths-u17-interior-closure", "number-line", "Interior, closure and boundary of [0, 1)",
  "The set [0, 1) has interior (0, 1) (every point has room around it), closure [0, 1] (the limit point 1 is added) and boundary {0, 1} (the two points where the set meets its complement).",
  "Three number-line rows from −1 to 2: the set [0, 1), its interior (0, 1) and its closure [0, 1], with the boundary points 0 and 1 marked.",
  ["The set is [0, 1): 0 is included, 1 is not.", "Interior: remove 0, because no interval around 0 stays inside the set: (0, 1).", "Closure: add the limit point 1: [0, 1].", "Boundary: closure minus interior is {0, 1}."],
  { range: [-1, 2], ticks: { step: 0.5 }, narrowTicks: { step: 1 }, tickLabels: { "-1": "−1", 0: "0", 1: "1", 2: "2" },
    intervals: [{ from: 0, to: 1, closed: [true, false], inequality: "0 <= x < 1", label: "the set [0, 1)", colour: "a1" }, { from: 0, to: 1, closed: [false, false], inequality: "0 < x < 1", label: "interior (0, 1)", colour: "a2" }, { from: 0, to: 1, closed: [true, true], inequality: "0 <= x <= 1", label: "closure [0, 1]", colour: "a4" }],
    points: [{ value: 0, label: "boundary", colour: "a3", below: true }, { value: 1, label: "boundary", colour: "a3", below: true }],
    fromLesson: ["Interior: (0, 1)", "Closure: [0, 1]", "Boundary: {0, 1}"] });

// ---------- u17-04 three metrics ----------
{
  const d1 = 3 + 4, d2 = Math.hypot(3, 4), dinf = Math.max(3, 4);
  mk("u17-04", "maths-u17-three-metrics", "geometry", "Three distances from (0, 0) to (3, 4)",
    `The same two points are ${d1} apart in the taxicab metric d₁ (along the grid), ${d2} apart in the Euclidean metric d₂ (straight line) and ${dinf} apart in the maximum metric d∞ (the larger coordinate gap). Different metrics, different distances, and different open balls.`,
    "A right triangle with legs 3 and 4 and hypotenuse 5 from (0, 0) to (3, 4), labelled with the three distances 7, 5 and 4.",
    ["Go from (0, 0) to (3, 0) and up to (3, 4): the taxicab distance is 3 + 4 = 7.", "The straight line has length √(9 + 16) = 5.", "The maximum metric keeps only the larger gap, max(3, 4) = 4."],
    { points: { O: [0, 0], B: [3, 0], A: [3, 4] }, labelAt: { O: [-14, 14], B: [14, 14], A: [14, -4] }, grid: { step: 1, axes: false }, view: { x: [-1, 5.2], y: [-1, 5] }, height: [360, 340],
      polygons: [{ pts: ["O", "B", "A"], colour: "a1", opacity: 0.06 }], segments: [{ a: "O", b: "B", colour: "a1", w: 3 }, { a: "B", b: "A", colour: "a1", w: 3 }, { a: "O", b: "A", colour: "a2", w: 3 }],
      angles: [{ at: "B", from: "O", to: "A", right: true, colour: "ink" }],
      lengths: [{ a: "O", b: "B", value: 3, label: "3", colour: "a1" }, { a: "B", b: "A", value: 4, label: "4", colour: "a1" }, { a: "O", b: "A", value: d2, label: "5", colour: "a2" }],
      notes: [{ at: [4.1, 3.1], text: `d₁ = ${d1}`, colour: "a1" }, { at: [4.1, 2.4], text: `d₂ = ${d2}`, colour: "a2" }, { at: [4.1, 1.7], text: `d∞ = ${dinf}`, colour: "a4" }],
      checks: [{ type: "distance", a: "O", b: "A", value: "sqrt(9+16)", name: "d₂((0, 0), (3, 4)) = √(9 + 16) = 5" }, { type: "value", expr: "3+4", value: d1, name: "d₁ = 3 + 4 = 7" }, { type: "value", expr: "4", value: dinf, name: "d∞ = the larger gap, 4" }],
      fromLesson: ["d₁ = 3 + 4 = 7", "d₂ = √(9 + 16) = 5"] });
}

// ---------- u17-05 preimage of (1, 4) under x^2 ----------
mk("u17-05", "maths-u17-preimage-square", "graph", "The preimage of (1, 4) under x²",
  "The open interval (1, 4) on the y-axis pulls back to two open intervals, (−2, −1) and (1, 2): the points whose square lies strictly between 1 and 4. A union of open intervals is open, as continuity requires.",
  "The parabola y = x² with a horizontal band between y = 1 and y = 4, and the two x-intervals (−2, −1) and (1, 2) where the curve lies inside the band.",
  ["Plot y = x² and mark the open interval (1, 4) on the y-axis.", "The curve is inside the band when 1 < x² < 4.", "That happens for x in (−2, −1) and for x in (1, 2).", "Both pieces are open intervals, so the preimage is open."],
  G({ x: [-3, 3], y: [-1.3, 5] }, [[-2, -1, 1, 2], [1, 4]], { bands: [{ x: [-2, -1], label: "(−2, −1)", colour: "a2" }, { x: [1, 2], label: "(1, 2)", colour: "a2" }], marks: [{ y: 1, label: "y = 1" }, { y: 4, label: "y = 4" }],
    curves: [{ expr: "x^2", colour: "a1", domain: [-2.2, 2.2] }],
    points: [{ x: 1, y: 1, colour: "a2", label: "(1, 1)", dx: 8, dy: 16 }, { x: 2, y: 4, colour: "a2", label: "(2, 4)", dx: 8, dy: 4 }, { x: -1, y: 1, colour: "a2", label: "(−1, 1)", anchor: "end", dx: -8, dy: 16 }, { x: -2, y: 4, colour: "a2", label: "(−2, 4)", anchor: "end", dx: -8, dy: 4 }],
    checks: [{ type: "point", expr: "x^2", x: 1, y: 1 }, { type: "point", expr: "x^2", x: 2, y: 4 }, { type: "point", expr: "x^2", x: -1, y: 1 }, { type: "point", expr: "x^2", x: -2, y: 4 }],
    fromLesson: ["(−2, −1) ∪ (1, 2)"] }));

// ---------- u17-06 tan maps (0, 1) onto the reals ----------
mk("u17-06", "maths-u17-tan-homeomorphism", "graph", "(0, 1) is homeomorphic to ℝ",
  "f(x) = tan(π(x − ½)) stretches the interval (0, 1) over the whole real line: f(½) = 0, f(¾) = 1, f(¼) = −1, and f grows without bound towards both ends. It is a continuous bijection with continuous inverse.",
  "The curve y = tan(π(x − ½)) for x between 0 and 1, rising through (¼, −1), (½, 0) and (¾, 1), and running off to −∞ and +∞ at the ends.",
  ["Shift (0, 1) to (−½, ½) with x − ½, then scale by π to (−π/2, π/2).", "tan maps (−π/2, π/2) onto all of ℝ.", "The curve passes through (¼, −1), (½, 0), (¾, 1).", "The inverse ½ + arctan(y)/π is also continuous."],
  { range: { x: [-0.25, 1.25], y: [-5, 5] }, ticks: [[0, 1], [-4, -2, 2, 4]], grid: [0.5, 2], height: [380, 340], axisLabels: ["x", "y"], marks: [{ x: 0, to: 5 }, { x: 1, to: 5 }],
    curves: [{ expr: `tan(${PI}*(x-0.5))`, colour: "a1", domain: [0.001, 0.999], samples: 600 }],
    points: [{ x: 0.5, y: 0, colour: "a2", label: "(½, 0)", anchor: "end", dx: -8, dy: -12 }, { x: 0.75, y: 1, colour: "a2", label: "(¾, 1)", dx: 8, dy: 14 }, { x: 0.25, y: -1, colour: "a2", label: "(¼, −1)", anchor: "end", dx: -8, dy: -4 }],
    checks: [{ type: "point", expr: `tan(${PI}*(x-0.5))`, x: 0.5, y: 0 }, { type: "point", expr: `tan(${PI}*(x-0.5))`, x: 0.75, y: 1 }, { type: "point", expr: `tan(${PI}*(x-0.5))`, x: 0.25, y: -1 }],
    fromLesson: ["f(x) = tan(π(x − ½))"] });

// ---------- u17-07 no finite subcover of (0, 1) ----------
mk("u17-07", "maths-u17-no-finite-subcover", "number-line", "Covers of (0, 1) that always miss a gap",
  "Each U_n = (1/n, 1) is open and together they cover (0, 1), but any finite choice stops at its largest n = N and misses (0, 1/N]. Here N = 5: the points up to 1/5 are left uncovered.",
  "A number line from 0 to 1 with four overlapping open intervals (1/2, 1), (1/3, 1), (1/4, 1) and (1/5, 1), and a gap (0, 1/5] under them that no finite subcollection covers.",
  ["The sets U₂ = (½, 1), U₃ = (⅓, 1), U₄ = (¼, 1) and U₅ = (⅕, 1) are drawn as rows.", "Every point of (0, 1) lies in some U_n if n is large enough.", "A finite subcollection has a largest n, here N = 5, and covers only (1/5, 1).", "The points between 0 and 1/5 are missed, so there is no finite subcover."],
  { range: [0, 1], ticks: { step: 0.25 }, tickLabels: { 0: "0", 0.25: "¼", 0.5: "½", 0.75: "¾", 1: "1" }, minor: 0.05,
    intervals: [2, 3, 4, 5].map((n, i) => ({ from: 1 / n, to: 1, closed: [false, false], label: `U${"₀₁₂₃₄₅₆₇₈₉"[n]} = (1/${n}, 1)`, colour: ["a1", "a2", "a4", "a5"][i] || "a1" })).concat([{ from: 0, to: 0.2, closed: [false, true], inequality: "0 < x <= 0.2", label: "missed: (0, 1/5]", colour: "a3" }]),
    checks: [{ type: "value", expr: "1/5", value: 0.2, name: "1/N = 1/5 is the left end of the largest set U₅" }],
    fromLesson: ["no finite subcover"] });

// ---------- u17-08 ℝ minus three points ----------
mk("u17-08", "maths-u17-four-components", "number-line", "ℝ minus {0, 1, 2} has four components",
  "Removing the points 0, 1 and 2 cuts the line into (−∞, 0), (0, 1), (1, 2) and (2, ∞). Each is connected, and nothing joins one to the next.",
  "A number line from −1 to 3 with four open intervals on separate rows: x < 0, 0 < x < 1, 1 < x < 2 and x > 2.",
  ["Start with the real line and delete 0, 1 and 2.", "What remains is four open intervals.", "Each interval is connected, but the deleted points separate them.", "So there are 4 components."],
  { range: [-1, 3], ticks: { step: 1 },
    intervals: [{ from: null, to: 0, closed: [false, false], inequality: "x < 0", colour: "a1" }, { from: 0, to: 1, closed: [false, false], inequality: "0 < x < 1", colour: "a2" }, { from: 1, to: 2, closed: [false, false], inequality: "1 < x < 2", colour: "a4" }, { from: 2, to: null, closed: [false, false], inequality: "x > 2", colour: "a3" }],
    fromLesson: ["4 components"] });

// ---------- u17-10 winding class 3 - 1 = 2 ----------
mk("u17-10", "maths-u17-winding-sum", "number-line", "Winding numbers add: 3 − 1 = 2",
  "A loop's class in π₁(circle) ≅ ℤ is its net winding number: three anticlockwise turns count +3, one clockwise turn counts −1, so the loop is homotopic to going round twice.",
  "A number line from −1 to 4: a jump of +3 from 0 to 3 for the anticlockwise turns, then a jump of −1 back to 2 for the clockwise turn.",
  ["Each anticlockwise circuit counts +1 and each clockwise circuit counts −1.", "Three anticlockwise circuits: 0 → 3.", "One clockwise circuit: 3 → 2.", "The class of the loop is 2 in ℤ."],
  { range: [-1, 4], ticks: { step: 1 }, jumps: { from: 0, steps: [{ by: 3, label: "+3 anticlockwise" }, { by: -1, label: "−1 clockwise" }], to: 2 }, points: [{ value: 0, label: "start", below: true }, { value: 2, label: "class 2", below: true, colour: "a4" }],
    fromLesson: ["3 − 1 = 2"] });

// ---------- u17-11 deformation retraction of the annulus ----------
{
  const P = [1.6, 1.2], Q = [-0.6, -0.8], R = [0, 1.5], k = 1.5;
  const P2 = P.map((v) => (k * v) / Math.hypot(...P)), Q2 = Q.map((v) => (k * v) / Math.hypot(...Q));
  mk("u17-11", "maths-u17-annulus-retraction", "geometry", "The annulus retracts onto |z| = 1.5",
    "H(z, t) = (1 − t)z + t · 1.5 z/|z| slides every point along its own radius to the circle |z| = 1.5: P at |z| = 2 moves in, Q at |z| = 1 moves out, and R, already on the circle, never moves.",
    "Three concentric circles of radius 1, 1.5 and 2. An arrow from P on the outer circle points inward to P′ on the middle circle; an arrow from Q on the inner circle points outward to Q′; R on the middle circle stays put.",
    ["The annulus lies between the circles |z| = 1 and |z| = 2.", "P (|z| = 2) is pushed along its radius in to P′ on |z| = 1.5.", "Q (|z| = 1) is pushed out along its radius to Q′ on |z| = 1.5.", "R is already on the circle, so H(R, t) = R for every t."],
    { points: { O: [0, 0], P, "P′": P2, Q, "Q′": Q2, R }, hide: ["O"], labelAt: { P: [14, -12], "P′": [-14, 14], Q: [10, 14], "Q′": [-8, 16], R: [0, -16] },
      circles: [{ centre: "O", r: 1, colour: "a1" }, { centre: "O", r: 1.5, colour: "a2" }, { centre: "O", r: 2, colour: "a1" }],
      vectors: [{ from: "P", to: "P′", colour: "a4" }, { from: "Q", to: "Q′", colour: "a4" }], notes: [{ at: [0, 0.75], text: "|z| = 1", colour: "a1", size: 13 }, { at: [0, 1.25], text: "|z| = 1.5", colour: "a2", size: 13 }, { at: [0, 2.17], text: "|z| = 2", colour: "a1", size: 13 }], view: { x: [-2.5, 2.5], y: [-2.35, 2.35] }, height: [400, 360],
      checks: [{ type: "onCircle", circle: 2, points: ["P"], name: "P is on the circle |z| = 2" }, { type: "onCircle", circle: 0, points: ["Q"], name: "Q is on the circle |z| = 1" }, { type: "onCircle", circle: 1, points: ["P′", "Q′", "R"], name: "P′, Q′ and R are on the circle |z| = 1.5" },
        { type: "collinear", points: ["O", "P", "P′"], name: "P moves along its radius" }, { type: "collinear", points: ["O", "Q", "Q′"], name: "Q moves along its radius" }],
      fromLesson: ["1.5 z/|z|"] });
}

// ---------- u17-13 dθ around the unit circle ----------
mk("u17-13", "maths-u17-dtheta-circle", "geometry", "dθ along the unit circle",
  "On the unit circle dθ = −y dx + x dy points along the tangent with length 1 per unit of arc, so one full circuit gives ∮ dθ = 2π. If dθ were exact, a closed loop would give 0.",
  "The unit circle with a unit tangent arrow at (1, 0), (0, 1), (−1, 0) and (0, −1), each pointing anticlockwise, perpendicular to its radius.",
  ["On the circle x = cos t and y = sin t.", "At (1, 0) the form −y dx + x dy points straight up; at (0, 1) it points left.", "The arrows follow the circle anticlockwise, always tangent.", "Integrating dt from 0 to 2π gives 2π, not 0, so dθ is not exact."],
  { points: { O: [0, 0], A: [1, 0], B: [0, 1], C: [-1, 0], D: [0, -1], A2: [1, 1], B2: [-1, 1], C2: [-1, -1], D2: [1, -1] }, hide: ["O", "A2", "B2", "C2", "D2"], labelAt: { A: [-16, 14], B: [14, 14], C: [14, 14], D: [14, -12] },
    circles: [{ centre: "O", r: 1, colour: "a1" }], vectors: [{ from: "A", to: "A2", colour: "a2" }, { from: "B", to: "B2", colour: "a2" }, { from: "C", to: "C2", colour: "a2" }, { from: "D", to: "D2", colour: "a2" }],
    notes: [{ at: [0, 0], text: "∮ dθ = 2π", colour: "a4", size: 16 }], view: { x: [-2.3, 2.3], y: [-2.3, 2.3] }, height: [380, 340],
    checks: [{ type: "tangent", circle: 0, at: "A", through: "A2" }, { type: "tangent", circle: 0, at: "B", through: "B2" }, { type: "tangent", circle: 0, at: "C", through: "C2" }, { type: "tangent", circle: 0, at: "D", through: "D2" },
      { type: "value", expr: "2*pi", value: 2 * PI, name: "the circuit integral ∫₀^{2π} dt = 2π" }],
    fromLesson: ["∮ dθ = ∫₀^{2π} dt = 2π"] });

// ---------- u17-16 two stereographic charts (also used for CP^1 in u17-19) ----------
{
  const Pp = [0.6, 0.8], tN = 1 / 0.2, Qn = [Pp[0] * tN, 0], tS = 1 / 1.8, Qs = [Pp[0] * tS, 0];
  mk("u17-16", "maths-u17-stereographic-charts", "geometry", "Two stereographic charts cover the sphere",
    `Projecting from the north pole N sends P to Q = (${Qn[0]}, 0) but cannot reach N itself; projecting from the south pole S sends P to Q′ = (1/3, 0) and cannot reach S. Together the two charts cover every point, and neither chart alone can, since a sphere is compact and a plane is not. The same picture shows ℂP¹ as the plane plus one point at infinity.`,
    "A circle (the sphere seen edge-on) with north pole N and south pole S. A line from N through P on the circle meets the horizontal axis at Q; a line from S through P meets it at Q′.",
    ["The circle stands for the sphere, the horizontal axis for the plane.", "The line from N through P = (0.6, 0.8) meets the axis at Q = (3, 0): this is the chart missing N.", "The line from S through P meets the axis at Q′ = (⅓, 0): this is the chart missing S.", "Every point of the sphere is covered by at least one chart, but N is never in the first."],
    { points: { O: [0, 0], N: [0, 1], S: [0, -1], P: Pp, Q: Qn, "Q′": Qs, L: [-3.4, 0], R: [3.6, 0] }, hide: ["O", "L", "R"], labelAt: { N: [-12, -12], S: [12, 14], P: [8, -16], Q: [4, 18], "Q′": [10, 18] },
      circles: [{ centre: "O", r: 1, colour: "a1" }], segments: [{ a: "L", b: "R", colour: "ink", w: 1.6 }, { a: "N", b: "Q", colour: "a2", w: 2.4 }, { a: "S", b: "P", colour: "a4", w: 2.4, dash: "6 4" }, { a: "P", b: "Q′", colour: "a4", w: 2.4, dash: "6 4" }],
      view: { x: [-1.6, 3.9], y: [-1.5, 1.5] }, height: [300, 280],
      checks: [{ type: "onCircle", circle: 0, points: ["N", "S", "P"], name: "N, S and P are on the sphere" }, { type: "collinear", points: ["N", "P", "Q"], name: "N, P and Q are on one line" }, { type: "collinear", points: ["S", "P", "Q′"], name: "S, P and Q′ are on one line" },
        { type: "value", expr: "3*(1/3)", value: 1, name: "the two chart images satisfy |Q| · |Q′| = 1" }],
      also: ["maths:u17-19"], fromLesson: ["stereographic projections from both poles"] });
}

// ---------- u17-17 Stokes on the unit square ----------
mk("u17-17", "maths-u17-stokes-square", "geometry", "∮ x dy around the unit square",
  "Going anticlockwise round the unit square, only the right edge contributes to ∮ x dy: there x = 1 and y rises by 1, giving 1. The left edge has x = 0, and the top and bottom have dy = 0. Stokes' theorem says the same: ∬ dx ∧ dy is the area, 1.",
  "The unit square with anticlockwise arrows on its four edges. The right edge is labelled x = 1 and contributes 1; the left edge is labelled x = 0 and contributes 0; the area inside is 1.",
  ["ω = x dy, so dω = dx ∧ dy.", "On the right edge x = 1 and ∫ dy = 1, so it contributes 1.", "On the left edge x = 0, so it contributes 0; top and bottom have dy = 0.", "The boundary integral is 1, equal to the area ∬ dx ∧ dy."],
  { points: { A: [0, 0], B: [1, 0], C: [1, 1], D: [0, 1] }, labelAt: { A: [-14, 14], B: [14, 14], C: [14, -12], D: [-14, -12] }, polygons: [{ pts: ["A", "B", "C", "D"], colour: "a1", opacity: 0.1 }],
    vectors: [{ from: "A", to: "B", colour: "a2", labelSide: -1 }, { from: "B", to: "C", colour: "a2" }, { from: "C", to: "D", colour: "a2" }, { from: "D", to: "A", colour: "a2" }],
    notes: [{ at: [0.5, 0.5], text: "area = 1", colour: "a1", size: 15 }, { at: [1.5, 0.5], text: "x = 1: +1", colour: "a4" }, { at: [-0.45, 0.5], text: "x = 0: 0", colour: "a4" }, { at: [0.5, -0.22], text: "dy = 0", colour: "soft", size: 13 }, { at: [0.5, 1.2], text: "dy = 0", colour: "soft", size: 13 }],
    view: { x: [-1.1, 2.1], y: [-0.6, 1.5] }, height: [320, 300],
    checks: [{ type: "area", polygon: ["A", "B", "C", "D"], value: 1, note: 0, name: "the square has area 1, so ∬ dx ∧ dy = 1" }], fromLesson: ["∮ x dy = 1"] });

// ---------- u17-20 genus of a smooth plane curve ----------
{
  const g = (d) => ((d - 1) * (d - 2)) / 2;
  mk("u17-20", "maths-u17-plane-curve-genus", "graph", "Genus of a smooth plane curve of degree d",
    `The genus (d − 1)(d − 2)/2 grows quadratically with the degree: lines and conics have genus 0, a cubic has genus ${g(3)} (a torus, an elliptic curve) and a quartic has genus ${g(4)}.`,
    `The parabola g = (d − 1)(d − 2)/2 with dots at the whole-number degrees: 0, 0, 1, 3, 6, 10 for d = 1 to 6, the cubic (1) and the quartic (3) labelled.`,
    ["Plot g = (d − 1)(d − 2)/2 against the degree d.", `The cubic, d = 3, gives 2 × 1/2 = ${g(3)}: a torus.`, `The quartic, d = 4, gives 3 × 2/2 = ${g(4)}.`, "Lines (d = 1) and conics (d = 2) both give genus 0."],
    { range: { x: [0, 6.6], y: [-1, 11] }, ticks: [[1, 2, 3, 4, 5, 6], [2, 4, 6, 8, 10]], grid: [1, 2], height: [360, 320], axisLabels: ["d", "g"], curves: [{ expr: "(x-1)*(x-2)/2", colour: "a1", domain: [0.6, 6.4] }],
      points: [1, 2, 5, 6].map((d) => ({ x: d, y: g(d), colour: "a1", dx: -8, dy: -12, anchor: "end" })).concat([{ x: 3, y: g(3), colour: "a2", label: "cubic: g = 1", anchor: "end", dx: -10, dy: -10 }, { x: 4, y: g(4), colour: "a2", label: "quartic: g = 3", anchor: "end", dx: -10, dy: -10 }]),
      checks: [{ type: "point", expr: "(x-1)*(x-2)/2", x: 3, y: 1 }, { type: "point", expr: "(x-1)*(x-2)/2", x: 4, y: 3 }, { type: "point", expr: "(x-1)*(x-2)/2", x: 2, y: 0 }], fromLesson: ["Quartic: 3 × 2/2 = 3"] });
}
