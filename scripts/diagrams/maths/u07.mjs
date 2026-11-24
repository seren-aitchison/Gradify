// School 7, Calculus: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u07.mjs
import { mk } from "./spec.mjs";

const must = (c, m) => { if (!c) throw new Error(m); };
const r3 = (x) => +x.toFixed(3);
const m = (x) => `${x}`.replace(/-/g, "−");
const T = (a, b) => [[...a], [...b]];
const G = (range, ticks, body) => ({ range, ticks, grid: [ticks[0].length > 1 ? Math.abs(ticks[0][1] - ticks[0][0]) : 1, ticks[1].length > 1 ? Math.abs(ticks[1][1] - ticks[1][0]) : 1], height: [380, 340], axisLabels: ["x", "y"], ...body });
const pt = (expr, x, y, name) => ({ type: "point", expr, x, y, name });
const sl = (expr, x, value, name) => ({ type: "slope", expr, x, value, name });
const E = Math.E;

// ---------- u07-02 Infinitesimal calculus: circle area from rings ----------
{
  const r = 3, f = `${2 * Math.PI}*x`;
  mk("u07-02", "maths-u07-circle-rings", "graph", "Adding up thin rings",
    "A ring at distance x from the centre has circumference 2πx, so its area is about 2πx × dx. The graph of 2πx against x is a straight line, and the total area under it from 0 to r = 3 is a triangle of area ½ × 3 × 6π = 9π = πr².",
    "A straight line y = 2πx from 0 to 3 with the triangle under it shaded, labelled with area 9π.",
    ["A thin ring of radius x and width dx has area about 2πx dx.", "Plot the circumference 2πx against x: a straight line through the origin.", "Adding the rings from x = 0 to x = r is the area under this line.", "For r = 3 the area is 9π = πr²."],
    G({ x: [0, 4], y: [0, 22] }, T([1, 2, 3, 4], [5, 10, 15, 20]), { axisLabels: ["x (radius)", "circumference 2πx"], curves: [{ expr: f, colour: "a1", domain: [0, 3.9] }], areas: [{ expr: f, from: 0, to: r, colour: "a2" }], marks: [{ x: r }],
      points: [{ x: r, y: 2 * Math.PI * r, label: "(3, 6π)", colour: "a2", dx: 10, dy: 4 }], checks: [{ type: "area", expr: f, from: 0, to: r, value: 9 * Math.PI, tol: 0.01, name: "the area under 2πx from 0 to 3 is 9π = π × 3²" }], fromLesson: ["2πx dx"] }));
}

// ---------- u07-03 Limits ----------
{
  const f = "(sqrt(x)-2)/(x-4)";
  mk("u07-03", "maths-u07-limit-hole", "graph", "A limit where the function is undefined",
    "At x = 4 the fraction is 0/0 and so undefined, but away from 4 it equals 1/(√x + 2). The graph has a hole at (4, ¼): values on both sides approach ¼, which is the limit.",
    "The curve y = (√x − 2)/(x − 4) falling gently from left to right with a gap at x = 4, where the height is ¼.",
    ["The function (√x − 2)/(x − 4) is not defined at x = 4.", "Rewriting x − 4 = (√x − 2)(√x + 2) gives 1/(√x + 2) for x ≠ 4.", "As x approaches 4 from either side, the height approaches 1/4: the hole is at (4, ¼)."],
    G({ x: [0, 9], y: [0, 0.6] }, T([2, 4, 6, 8], [0.25, 0.5]), { grid: [1, 0.25], curves: [{ expr: f, colour: "a1", domain: [0, 3.99] }, { expr: f, colour: "a1", domain: [4.01, 9] }], marks: [{ y: 0.25, label: "¼" }, { x: 4, to: 0.25 }],
      points: [{ x: 3.9999, y: 0.25, label: "x = 4: undefined, both sides → ¼", colour: "a2", dx: 12, dy: -14 }], checks: [pt(f, 3.9999, 0.25, "just left of 4 the value is ≈ ¼"), pt(f, 4.0001, 0.25, "just right of 4 the value is ≈ ¼"), pt("1/(sqrt(x)+2)", 4, 0.25, "1/(√4 + 2) = ¼")], fromLesson: ["1/4"] }));
}

// ---------- u07-04 Continuity: IVT ----------
{
  const f = "x^5+3*x-7", g = (x) => x ** 5 + 3 * x - 7; let lo = 1, hi = 2; for (let i = 0; i < 60; i++) { const c = (lo + hi) / 2; if (g(c) < 0) lo = c; else hi = c; }
  must(g(1) === -3 && g(2) === 31, "IVT");
  mk("u07-04", "maths-u07-ivt-quintic", "graph", "A sign change forces a root",
    `f(x) = x⁵ + 3x − 7 is continuous, with f(1) = −3 below the axis and f(2) = 31 above it. A continuous curve cannot jump, so it crosses y = 0 between: here at x ≈ ${r3(lo)}.`,
    `The curve y = x⁵ + 3x − 7 for x from 0.5 to 2 passing from (1, −3) below the axis up through zero near x = ${r3(lo)} to (2, 31).`,
    ["f is a polynomial, so it is continuous everywhere.", "f(1) = 1 + 3 − 7 = −3 is negative.", "f(2) = 32 + 6 − 7 = 31 is positive.", "By the intermediate value theorem the curve crosses zero somewhere between x = 1 and x = 2."],
    G({ x: [0.5, 2.2], y: [-10, 36] }, T([1, 1.5, 2], [-10, 10, 20, 30]), { grid: [0.5, 10], curves: [{ expr: f, colour: "a1", domain: [0.5, 2.1] }],
      points: [{ x: 1, y: -3, label: "(1, −3)", colour: "a2", dx: 10, dy: 20 }, { x: 2, y: 31, label: "(2, 31)", colour: "a2", dx: -10, dy: 6, anchor: "end" }, { x: lo, y: 0, label: `root ≈ ${r3(lo)}`, colour: "a4", dx: 10, dy: -14 }],
      checks: [pt(f, 1, -3, "f(1) = −3"), pt(f, 2, 31, "f(2) = 31"), pt(f, lo, 0, `f(${r3(lo)}) = 0: the root lies between 1 and 2`)], fromLesson: ["f(1) = 1 + 3 − 7 = −3 < 0"] }));
}

// ---------- u07-05 Differentiability ----------
mk("u07-05", "maths-u07-smooth-join", "graph", "Joining x² to a straight line smoothly",
  "For f to be differentiable at x = 1 the two pieces must meet (1 = a + b) and have the same slope (2x = 2 gives a = 2). So b = −1 and the line 2x − 1 touches the parabola at (1, 1) without a corner.",
  "The parabola y = x² on the left and the line y = 2x − 1 on the right, meeting at (1, 1) with the same gradient 2.",
  ["For x ≤ 1, f(x) = x²; for x > 1, f(x) = ax + b.", "Continuity at 1 needs a + b = 1.", "Equal slopes at 1 need a = 2x = 2.", "So b = −1 and the pieces join smoothly at (1, 1)."],
  G({ x: [-1, 3], y: [-1, 6] }, T([-1, 1, 2, 3], [1, 2, 3, 4, 5]), { curves: [{ expr: "x^2", colour: "a1", domain: [-1, 1] }, { expr: "2*x-1", colour: "a2", domain: [1, 3] }], points: [{ x: 1, y: 1, label: "(1, 1)", colour: "a4", dx: -10, dy: 20, anchor: "end" }],
    checks: [pt("x^2", 1, 1, "the parabola gives 1 at x = 1"), pt("2*x-1", 1, 1, "the line 2x − 1 gives 1 at x = 1"), sl("x^2", 1, 2, "the parabola has gradient 2 at x = 1"), sl("2*x-1", 1, 2, "the line has gradient a = 2")], fromLesson: ["b = −1"] }));

// ---------- u07-07 First principles ----------
{
  const f = "x^2-3*x", d = "2*x-3";
  mk("u07-07", "maths-u07-first-principles", "graph", "f(x) = x² − 3x and its gradient 2x − 3",
    "From first principles f′(x) = 2x − 3. The graph shows it: f has a flat bottom at x = 1.5, where 2x − 3 = 0; to the left f falls (negative gradient) and to the right it rises (positive gradient), with slope 3 at x = 3.",
    "The parabola y = x² − 3x with its minimum at x = 1.5 and the straight line y = 2x − 3, which is zero at x = 1.5.",
    ["Dividing the change in f by h and letting h → 0 gives f′(x) = 2x − 3.", "The parabola f has its minimum at x = 1.5.", "The gradient line crosses zero at the same place.", "Where f is steepest on the right, at x = 3, the gradient line reads 3."],
    G({ x: [-1, 4], y: [-4, 5] }, T([-1, 1, 2, 3, 4], [-4, -2, 2, 4]), { curves: [{ expr: f, colour: "a1", label: "f(x)", labelAt: [-0.9, 4.2] }, { expr: d, colour: "a2", label: "f′(x)", labelAt: [3.1, 3.4] }], points: [{ x: 1.5, y: 0, label: "f′ = 0", colour: "a4", dx: 12, dy: -12 }],
      checks: [-1, 0, 1.5, 3].map((x) => sl(f, x, 2 * x - 3, `the slope of f at x = ${x} is 2x − 3 = ${m(2 * x - 3)}`)), fromLesson: ["f′(x) = 2x − 3"] }));
}

// ---------- u07-08 Normal line ----------
{
  const f = "2*x^2-5*x+1", tg = "3*x-7", nl = "-x/3-1/3";
  mk("u07-08", "maths-u07-normal-line", "graph", "The tangent and normal at (2, −1)",
    "At x = 2 the curve y = 2x² − 5x + 1 is at (2, −1) with gradient 4x − 5 = 3. The normal is perpendicular to the tangent, with gradient −1/3, giving y = −x/3 − 1/3.",
    "The parabola y = 2x² − 5x + 1 with a tangent of gradient 3 and a perpendicular normal of gradient −1/3, both through the point (2, −1).",
    ["At x = 2: y = 8 − 10 + 1 = −1, so the point is (2, −1).", "The gradient is dy/dx = 4x − 5 = 3.", "The normal gradient is −1/3, since 3 × (−1/3) = −1.", "The normal is y + 1 = −⅓(x − 2), that is y = −x/3 − 1/3."],
    G({ x: [-2, 5], y: [-5, 8] }, T([-2, -1, 1, 2, 3, 4, 5], [-4, -2, 2, 4, 6, 8]), { curves: [{ expr: f, colour: "a1" }, { expr: tg, colour: "a2", dash: "6 4", label: "tangent", labelAt: [2.6, 0.2] }, { expr: nl, colour: "a4", label: "normal", labelAt: [-1.6, 1.0] }],
      points: [{ x: 2, y: -1, label: "(2, −1)", colour: "ink", dx: 10, dy: 22 }],
      checks: [pt(f, 2, -1, "the curve passes through (2, −1)"), sl(f, 2, 3, "the gradient at x = 2 is 3"), sl(tg, 2, 3, "the tangent has gradient 3"), sl(nl, 2, -1 / 3, "the normal has gradient −1/3, and 3 × (−1/3) = −1"), { type: "intersect", a: tg, b: nl, x: 2, y: -1, name: "tangent and normal meet at (2, −1)" }], fromLesson: ["y = −x/3 − 1/3"] }));
}

// ---------- u07-09 Higher-order derivatives ----------
{
  const s = "x^3-6*x^2+9*x", v = "3*x^2-12*x+9", a = "6*x-12";
  mk("u07-09", "maths-u07-displacement-velocity-acceleration", "graph", "Displacement, velocity and acceleration",
    "Each curve is the slope of the one before. s = t³ − 6t² + 9t has a maximum where v = 3t² − 12t + 9 is zero, first at t = 1; there a = 6t − 12 = −6, negative because v is falling through zero.",
    "Three curves against t: the cubic s, the parabola v which crosses zero at t = 1 and t = 3, and the line a which is −6 at t = 1.",
    ["s = t³ − 6t² + 9t is the displacement.", "v = ds/dt = 3t² − 12t + 9 = 3(t − 1)(t − 3), zero at t = 1 and t = 3.", "a = dv/dt = 6t − 12.", "At t = 1: a = −6 m s⁻²."],
    G({ x: [0, 4.5], y: [-12, 12] }, T([1, 2, 3, 4], [-10, -5, 5, 10]), { axisLabels: ["t (s)", ""], grid: [1, 5], curves: [{ expr: s, colour: "a1", label: "s", labelAt: [3.9, 5.5] }, { expr: v, colour: "a2", label: "v", labelAt: [0.05, 10.3] }, { expr: a, colour: "a4", label: "a", labelAt: [3.9, 10.5] }],
      points: [{ x: 1, y: 0, label: "v = 0", colour: "a2", dx: 8, dy: 16 }, { x: 1, y: -6, label: "a = −6", colour: "a4", dx: 10, dy: 10 }],
      checks: [pt(v, 1, 0, "v = 0 at t = 1"), pt(a, 1, -6, "a = −6 at t = 1"), sl(s, 1, 0, "the slope of s at t = 1 is v = 0"), sl(v, 1, -6, "the slope of v at t = 1 is a = −6"), sl(v, 3, 6, "the slope of v at t = 3 is a = 6")], fromLesson: ["a = −6 m s"] }));
}

// ---------- u07-10 Chain rule ----------
{
  const f = "sqrt(x^2+4*x)", g = 3 / Math.sqrt(5), y1 = Math.sqrt(5), tl = `${y1}+${g}*(x-1)`;
  mk("u07-10", "maths-u07-chain-rule-root", "graph", "The chain rule on y = √(x² + 4x)",
    `dy/dx = (x + 2)/√(x² + 4x). At x = 1 this is 3/√5 ≈ ${r3(g)}, the slope of the tangent drawn at (1, √5).`,
    `The curve y = √(x² + 4x) for x ≥ 0 rising from the origin, with its tangent at (1, √5 ≈ 2.236), a line of gradient ${r3(g)}.`,
    ["Write y = (x² + 4x)^½: an outer power ½ of an inner function x² + 4x.", "Outer derivative ½(x² + 4x)^(−½), inner derivative 2x + 4.", "Multiplying: dy/dx = (x + 2)/√(x² + 4x).", `At x = 1 it is 3/√5 ≈ ${r3(g)}.`],
    G({ x: [0, 4], y: [0, 6] }, T([1, 2, 3, 4], [1, 2, 3, 4, 5, 6]), { curves: [{ expr: f, colour: "a1", domain: [0, 4] }, { expr: tl, colour: "a2", dash: "6 4", domain: [0, 3.5] }], points: [{ x: 1, y: y1, label: "(1, √5)", colour: "a2", dx: 10, dy: 20 }],
      checks: [pt(f, 1, y1, "y = √5 at x = 1"), sl(f, 1, g, "the gradient at x = 1 is (1 + 2)/√5 = 3/√5"), sl(tl, 1, g, "the tangent has the same gradient")], fromLesson: ["(x + 2)/√(x"] }));
}

// ---------- u07-11 Product rule ----------
{
  const f = "x^2*exp(-x)", y2 = 4 * Math.exp(-2);
  mk("u07-11", "maths-u07-product-rule-stationary", "graph", "Stationary points of x²e⁻ˣ",
    "dy/dx = xe⁻ˣ(2 − x) is zero at x = 0 and x = 2. The curve touches the axis at (0, 0), a minimum, and peaks at (2, 4e⁻² ≈ 0.54).",
    "The curve y = x²e⁻ˣ, with a minimum at the origin, a maximum at (2, 0.54), then decaying towards zero.",
    ["The product rule gives dy/dx = 2xe⁻ˣ − x²e⁻ˣ = xe⁻ˣ(2 − x).", "e⁻ˣ is never zero, so dy/dx = 0 when x = 0 or x = 2.", "The curve has a minimum at (0, 0) and a maximum at (2, 4e⁻²)."],
    G({ x: [-1, 6], y: [-0.2, 3] }, T([-1, 1, 2, 3, 4, 5, 6], [1, 2, 3]), { grid: [1, 1], curves: [{ expr: f, colour: "a1" }], points: [{ x: 0, y: 0, label: "(0, 0)", colour: "a2", dx: 10, dy: -14 }, { x: 2, y: y2, label: "(2, 0.54)", colour: "a2", dx: 10, dy: -14 }],
      checks: [{ type: "min", expr: f, domain: [-0.5, 1], x: 0, y: 0, name: "a minimum at x = 0" }, { type: "max", expr: f, domain: [0.5, 6], x: 2, y: y2, name: "a maximum at (2, 4e⁻²)" }, sl(f, 0, 0, "gradient 0 at x = 0"), sl(f, 2, 0, "gradient 0 at x = 2")], fromLesson: ["x = 0 or x = 2"] }));
}

// ---------- u07-12 Quotient rule ----------
{
  const f = "exp(x)/(x^2+1)", y1 = E / 2;
  mk("u07-12", "maths-u07-quotient-rule-flat", "graph", "A flat point that is not a turning point",
    "dy/dx = eˣ(x − 1)²/(x² + 1)² is never negative: the curve only rises. At x = 1 the numerator (x − 1)² is zero, so the curve flattens at (1, e/2) for a moment and then carries on upwards.",
    "The curve y = eˣ/(x² + 1) rising from left to right with a momentary flat point at (1, e/2 ≈ 1.36).",
    ["Quotient rule with u = eˣ and v = x² + 1.", "dy/dx = eˣ(x − 1)²/(x² + 1)².", "A square is never negative, so the gradient is ≥ 0 everywhere.", "It is zero at x = 1, where the curve flattens but does not turn."],
    G({ x: [-3, 3], y: [0, 3] }, T([-3, -2, -1, 1, 2, 3], [1, 2, 3]), { grid: [1, 1], curves: [{ expr: f, colour: "a1" }], points: [{ x: 1, y: y1, label: "(1, e/2)", colour: "a2", dx: -10, dy: -14, anchor: "end" }],
      checks: [pt(f, 1, y1, "y = e/2 at x = 1"), sl(f, 1, 0, "the gradient is zero at x = 1"), sl(f, 0, 1, "the gradient at 0 is e⁰(0 − 1)²/1 = 1"), sl(f, 2, E ** 2 / 25, "the gradient at 2 is e²/25 > 0: still rising")], fromLesson: ["(x^{2} + 1)^{2}"] }));
}

// ---------- u07-13 Implicit differentiation ----------
{
  const up = "(-3*x+sqrt(5*x^2+44))/2", lo = "(-3*x-sqrt(5*x^2+44))/2", tl = "2-8*(x-1)/7";
  mk("u07-13", "maths-u07-implicit-curve", "graph", "The curve x² + 3xy + y² = 11",
    "Solving for y gives two branches. The point (1, 2) is on the upper one, and implicit differentiation gives dy/dx = −(2x + 3y)/(3x + 2y) = −8/7 there: the tangent drawn slopes down gently.",
    "The curve x² + 3xy + y² = 11 as an upper and lower branch, with the tangent of gradient −8/7 at (1, 2).",
    ["Differentiate both sides with respect to x, treating y as a function of x.", "Collect dy/dx: dy/dx = −(2x + 3y)/(3x + 2y).", "At (1, 2): −(2 + 6)/(3 + 4) = −8/7.", "The tangent at (1, 2) has gradient −8/7."],
    G({ x: [-5, 5], y: [-10, 10] }, T([-4, -2, 2, 4], [-8, -4, 4, 8]), { grid: [1, 2], curves: [{ expr: up, colour: "a1" }, { expr: lo, colour: "a1" }, { expr: tl, colour: "a2", dash: "6 4", domain: [-2, 4] }], points: [{ x: 1, y: 2, label: "(1, 2)", colour: "a2", dx: 10, dy: -14 }],
      checks: [pt(up, 1, 2, "(1, 2) lies on the upper branch"), pt(lo, 1, -5, "the lower branch passes through (1, −5)"), sl(up, 1, -8 / 7, "the gradient at (1, 2) is −8/7"), sl(tl, 1, -8 / 7, "the tangent has gradient −8/7")], fromLesson: ["−8/7"] }));
}

// ---------- u07-14 Logarithmic differentiation ----------
{
  const f = "exp(x*log(sin(x)))", s1 = Math.sin(1), g = s1 * (Math.log(s1) + 1 / Math.tan(1)), tl = `${s1}+${g}*(x-1)`;
  mk("u07-14", "maths-u07-log-differentiation", "graph", "y = (sin x)ˣ and its tangent at x = 1",
    `Taking logs gives dy/dx = (sin x)ˣ(ln(sin x) + x cot x). At x = 1 this is sin 1 × (ln sin 1 + cot 1) ≈ ${r3(g)}, the gradient of the tangent shown at (1, sin 1 ≈ ${r3(s1)}).`,
    `The curve y = (sin x)ˣ on (0, π), rising from 0 and falling back to 0, with its tangent of gradient ${r3(g)} at x = 1.`,
    ["ln y = x ln(sin x).", "Differentiate both sides: (1/y)y′ = ln(sin x) + x cot x.", "Multiply by y = (sin x)ˣ.", `At x = 1 the gradient is ≈ ${r3(g)}.`],
    G({ x: [0, 3.2], y: [0, 1.2] }, T([1, 2, 3], [0.5, 1]), { grid: [1, 0.5], curves: [{ expr: f, colour: "a1", domain: [0.001, 3.14] }, { expr: tl, colour: "a2", dash: "6 4", domain: [0.2, 2.2] }], points: [{ x: 1, y: s1, label: "(1, sin 1)", colour: "a2", dx: -10, dy: -14, anchor: "end" }],
      checks: [pt(f, 1, s1, "y = (sin 1)¹ at x = 1"), sl(f, 1, g, "the gradient at x = 1 is sin 1 (ln sin 1 + cot 1)"), sl(tl, 1, g, "the tangent has the same gradient")], fromLesson: ["ln y = x ln(sin x)"] }));
}

// ---------- u07-15 Parametric ----------
{
  const f = "(x-1)^2/4-3*(x-1)/2", tl = "x/2-9/2";
  mk("u07-15", "maths-u07-parametric-tangent", "graph", "The tangent to x = 2t + 1, y = t² − 3t at t = 2",
    "Eliminating t gives y = (x − 1)²/4 − 3(x − 1)/2, a parabola. At t = 2 the point is (5, −2) and dy/dx = (dy/dt)/(dx/dt) = 1/2, so the tangent is y = ½x − 9/2.",
    "A parabola opening upwards with its minimum near x = 4 and the tangent of gradient ½ touching it at (5, −2).",
    ["At t = 2: x = 2(2) + 1 = 5 and y = 4 − 6 = −2.", "dx/dt = 2 and dy/dt = 2t − 3 = 1.", "dy/dx = (dy/dt)/(dx/dt) = ½.", "Tangent: y + 2 = ½(x − 5), that is y = ½x − 9/2."],
    G({ x: [-1, 8], y: [-4, 6] }, T([-1, 1, 2, 3, 4, 5, 6, 7, 8], [-4, -2, 2, 4, 6]), { curves: [{ expr: f, colour: "a1" }, { expr: tl, colour: "a2", dash: "6 4", domain: [1, 8] }], points: [{ x: 5, y: -2, label: "t = 2: (5, −2)", colour: "a2", dx: 10, dy: 22 }],
      checks: [pt(f, 5, -2, "the curve passes through (5, −2) at t = 2"), sl(f, 5, 0.5, "dy/dx = 1/2 at t = 2"), pt(tl, 5, -2, "the tangent passes through (5, −2)"), sl(tl, 5, 0.5, "the tangent has gradient ½")], fromLesson: ["y = ½x − 9/2"] }));
}

// ---------- u07-16 Rates of change ----------
{
  const f = "(10-0.5*t)^2", tl = "49-7*(x-6)";
  mk("u07-16", "maths-u07-draining-depth", "graph", "How fast the depth falls at t = 6",
    "h = (10 − 0.5t)² has gradient dh/dt = −(10 − 0.5t). At t = 6, h = 49 cm and the gradient is −7: the tangent drawn falls 7 cm for every minute.",
    "A falling parabola of depth against time from 100 cm at t = 0 to 0 at t = 20, with its tangent at (6, 49) of gradient −7.",
    ["h = (10 − 0.5t)²: depth in cm after t minutes.", "dh/dt = 2(10 − 0.5t)(−0.5) = −(10 − 0.5t).", "At t = 6: dh/dt = −7.", "The depth is falling at 7 cm per minute."],
    { ...G({ x: [0, 20], y: [0, 110] }, T([5, 10, 15, 20], [25, 50, 75, 100]), { axisLabels: ["t (min)", "h (cm)"] }), curves: [{ expr: f.replace(/t/g, "x"), colour: "a1" }, { expr: tl, colour: "a2", dash: "6 4", domain: [0, 14] }], points: [{ x: 6, y: 49, label: "(6, 49)", colour: "a2", dx: 12, dy: -12 }],
      checks: [pt(f.replace(/t/g, "x"), 6, 49, "h(6) = 7² = 49"), sl(f.replace(/t/g, "x"), 6, -7, "dh/dt = −7 at t = 6"), sl(tl, 6, -7, "the tangent has gradient −7")], fromLesson: ["dh/dt = −7"].slice(0, 0) });
}

// ---------- u07-17 Related rates: ladder ----------
{
  const x = 3, y = 4, L = Math.hypot(x, y), rate = -(2 * x * 0.3) / (2 * y);
  must(L === 5 && Math.abs(rate + 0.225) < 1e-12, "ladder");
  mk("u07-17", "maths-u07-sliding-ladder", "geometry", "The 5 m ladder at one instant",
    "When the foot is 3 m from the wall the 5 m ladder reaches 4 m up (3² + 4² = 5²). Differentiating x² + y² = 25 gives 2x dx/dt + 2y dy/dt = 0, so with dx/dt = 0.3 the top slides down at 1.8/8 = 0.225 m s⁻¹.",
    "A right-angled triangle: the wall 4 m high, the floor 3 m, and the ladder 5 m long as the hypotenuse.",
    ["The ladder, wall and ground form a right-angled triangle, so x² + y² = 25.", "When x = 3, y = 4.", "Differentiating: 2x dx/dt + 2y dy/dt = 0.", "2(3)(0.3) + 2(4) dy/dt = 0 gives dy/dt = −0.225 m s⁻¹."],
    { points: { F: [0, 0], W: [0, 4], B: [3, 0] }, hide: ["F"], polygons: [{ pts: ["F", "W", "B"], colour: "a1", opacity: 0.08 }], segments: [{ a: "W", b: "B", colour: "a2", w: 3.5 }], angles: [{ at: "F", from: "B", to: "W", right: true, colour: "ink" }],
      lengths: [{ a: "F", b: "B", value: 3, label: "x = 3 m", side: -1 }, { a: "F", b: "W", value: 4, label: "y = 4 m", side: -1 }, { a: "W", b: "B", value: 5, label: "ladder 5 m", colour: "a2" }], labelAt: { W: [-10, -8], B: [12, 12] }, view: { x: [-2.2, 5], y: [-1.5, 5] }, height: [320, 300],
      checks: [{ type: "distance", a: "W", b: "B", value: "sqrt(9+16)", name: "ladder = √(3² + 4²) = 5" }, { type: "value", expr: "-(2*3*0.3)/(2*4)", value: "-0.225", tol: 1e-12, name: "dy/dt = −(2 × 3 × 0.3)/(2 × 4) = −0.225" }], fromLesson: ["x^{2} + y^{2} = 25"] });
}

// ---------- u07-18 L'Hôpital ----------
{
  const f = "(exp(x)-1-x)/x^2";
  mk("u07-18", "maths-u07-lhopital-limit", "graph", "(eˣ − 1 − x)/x² near 0",
    "Direct substitution gives 0/0. L'Hôpital's rule (twice) gives eˣ/2 → ½. The graph agrees: the curve passes through heights close to ½ on both sides of the hole at x = 0.",
    "The curve y = (eˣ − 1 − x)/x² rising from left to right with a gap at x = 0, where the height is ½.",
    ["At x = 0 the fraction is 0/0.", "Differentiate top and bottom: (eˣ − 1)/(2x), still 0/0.", "Again: eˣ/2, which tends to ½.", "The graph approaches height ½ at the hole x = 0."],
    G({ x: [-3, 3], y: [0, 4] }, T([-3, -2, -1, 1, 2, 3], [1, 2, 3, 4]), { grid: [1, 1], curves: [{ expr: f, colour: "a1", domain: [-3, -0.002] }, { expr: f, colour: "a1", domain: [0.002, 3] }], marks: [{ y: 0.5, label: "½" }], points: [{ x: 0.0001, y: 0.5, label: "hole at (0, ½)", colour: "a2", dx: 12, dy: -14 }],
      checks: [pt(f, 0.001, 0.5, "just right of 0 the value is ≈ ½"), pt(f, -0.001, 0.5, "just left of 0 the value is ≈ ½")], fromLesson: ["e^{x}/2"] }));
}

// ---------- u07-19 Stationary points ----------
{
  const f = "x^3-12*x";
  mk("u07-19", "maths-u07-cubic-stationary", "graph", "Maximum and minimum of x³ − 12x",
    "dy/dx = 3x² − 12 = 0 at x = ±2. The second derivative 6x is −12 at x = −2 (a maximum, (−2, 16)) and +12 at x = 2 (a minimum, (2, −16)).",
    "The S-shaped cubic y = x³ − 12x with a maximum at (−2, 16) and a minimum at (2, −16).",
    ["dy/dx = 3x² − 12 = 0 gives x = ±2.", "The points are (2, −16) and (−2, 16).", "d²y/dx² = 6x: negative at x = −2, so a maximum.", "Positive at x = 2, so a minimum."],
    G({ x: [-4, 4], y: [-24, 24] }, T([-4, -2, 2, 4], [-20, -10, 10, 20]), { grid: [1, 5], curves: [{ expr: f, colour: "a1" }], points: [{ x: -2, y: 16, label: "max (−2, 16)", colour: "a2", dx: 10, dy: -8 }, { x: 2, y: -16, label: "min (2, −16)", colour: "a2", dx: -10, dy: 20, anchor: "end" }],
      checks: [{ type: "max", expr: f, domain: [-3, 0], x: -2, y: 16, name: "the local maximum is (−2, 16)" }, { type: "min", expr: f, domain: [0, 3], x: 2, y: -16, name: "the local minimum is (2, −16)" }], fromLesson: ["(2, −16) and (−2, 16)"] }));
}

// ---------- u07-20 Critical points ----------
{
  const f = "(abs(x)^(1/3))^2*(x-5)", y2 = Math.cbrt(4) * -3;
  mk("u07-20", "maths-u07-critical-cusp", "graph", "A critical point where f′ is undefined",
    "f(x) = x^(2/3)(x − 5) has f′(x) = (5/3)x^(−1/3)(x − 2). f′ = 0 at x = 2 (a minimum) and f′ is undefined at x = 0, where the graph has a sharp point: both are critical points.",
    "The curve y = x^(2/3)(x − 5): a sharp upward cusp at the origin, then falling to a minimum at (2, −4.76) and rising to cross the axis at x = 5.",
    ["f(x) = x^(5/3) − 5x^(2/3).", "f′(x) = (5/3)x^(−1/3)(x − 2).", "f′ = 0 at x = 2.", "f′ is undefined at x = 0, which is in the domain: that is critical too."],
    G({ x: [-2, 7], y: [-7, 5] }, T([-2, -1, 1, 2, 3, 4, 5, 6, 7], [-6, -4, -2, 2, 4]), { grid: [1, 2], curves: [{ expr: f, colour: "a1" }], points: [{ x: 0, y: 0, label: "cusp (0, 0)", colour: "a2", dx: -10, dy: -14, anchor: "end" }, { x: 2, y: y2, label: "min (2, −4.76)", colour: "a2", dx: 10, dy: 22 }],
      checks: [{ type: "max", expr: f, domain: [-1, 1], x: 0, y: 0, name: "the cusp at x = 0 is a local maximum" }, { type: "min", expr: f, domain: [0.5, 5], x: 2, y: y2, name: "a local minimum at x = 2" }, sl(f, 2, 0, "f′(2) = 0")], fromLesson: ["x = 0 and x = 2"] }));
}

// ---------- u07-21 Local max/min ----------
{
  const f = "x^4-4*x^3";
  mk("u07-21", "maths-u07-quartic-inflection", "graph", "x⁴ − 4x³: flat at 0, minimum at 3",
    "f′(x) = 4x²(x − 3) is zero at x = 0 and x = 3. Near 0 the gradient is negative on both sides, so the curve flattens but keeps falling (no extremum); at x = 3 it goes from − to +, a minimum at (3, −27).",
    "The curve y = x⁴ − 4x³ falling through a flat point at the origin and reaching a minimum at (3, −27) before rising.",
    ["f′(x) = 4x³ − 12x² = 4x²(x − 3).", "f′ = 0 at x = 0 and x = 3.", "At x = 0, f′ is negative on both sides: no extremum.", "At x = 3, f′ changes from − to +: a local minimum at (3, −27)."],
    G({ x: [-1.5, 4.5], y: [-30, 30] }, T([-1, 1, 2, 3, 4], [-20, -10, 10, 20, 30]), { grid: [1, 10], curves: [{ expr: f, colour: "a1" }], points: [{ x: 0, y: 0, label: "(0, 0) flat", colour: "a2", dx: 10, dy: -16 }, { x: 3, y: -27, label: "min (3, −27)", colour: "a2", dx: 12, dy: 6 }],
      checks: [{ type: "min", expr: f, domain: [1, 4.5], x: 3, y: -27, name: "the local minimum is (3, −27)" }, sl(f, 0, 0, "the gradient is 0 at x = 0"), sl(f, -0.5, -3.5, "f′(−0.5) = −3.5 < 0 just left of 0"), sl(f, 0.5, -2.5, "f′(0.5) = −2.5 < 0 just right of 0")], fromLesson: ["(3, −27)"] }));
}

// ---------- u07-22 Global optimisation ----------
{
  const f = "200*x-2*x^2";
  mk("u07-22", "maths-u07-fence-area", "graph", "The largest pen",
    "With 200 m of fence and a wall on one side, the area is A = x(200 − 2x). It is a downward parabola with its maximum at x = 50: 50 × 100 = 5,000 m².",
    "The parabola A = 200x − 2x² for x between 0 and 100, peaking at (50, 5,000).",
    ["Sides perpendicular to the wall are x, the third side is 200 − 2x.", "A = x(200 − 2x) = 200x − 2x².", "A′ = 200 − 4x = 0 at x = 50 and A″ = −4 < 0.", "The largest area is 50 × 100 = 5,000 m²."],
    { ...G({ x: [0, 100], y: [0, 6000] }, T([25, 50, 75, 100], [2000, 4000, 6000]), { axisLabels: ["x (m)", "A (m²)"], grid: [25, 1000] }), curves: [{ expr: f, colour: "a1" }], points: [{ x: 50, y: 5000, label: "(50, 5,000)", colour: "a2", dx: 12, dy: -12 }],
      checks: [{ type: "max", expr: f, domain: [0, 100], x: 50, y: 5000, name: "the maximum area is 5,000 m² at x = 50" }, pt(f, 0, 0, "no pen at x = 0"), pt(f, 100, 0, "no pen at x = 100")], fromLesson: ["5,000"].slice(0, 0) });
}

// ---------- u07-23 Concavity ----------
{
  const f = "x^4-6*x^2";
  mk("u07-23", "maths-u07-convex-concave", "graph", "Where x⁴ − 6x² bends up and down",
    "f″(x) = 12(x − 1)(x + 1) is positive for x < −1 and x > 1 (convex: the curve bends up) and negative between (concave: it bends down). The bends change at (±1, −5).",
    "The W-shaped curve y = x⁴ − 6x², with the left and right parts marked convex and the middle part marked concave, changing at x = −1 and x = 1.",
    ["f′(x) = 4x³ − 12x.", "f″(x) = 12x² − 12 = 12(x − 1)(x + 1).", "f″ > 0 outside −1 < x < 1: convex there.", "Between −1 and 1, f″ < 0: concave."],
    G({ x: [-3, 3], y: [-10, 12] }, T([-3, -2, -1, 1, 2, 3], [-8, -4, 4, 8, 12]), { grid: [1, 4], bands: [{ x: [-3, -1], label: "convex", colour: "a4" }, { x: [-1, 1], label: "concave", colour: "a2" }, { x: [1, 3], label: "convex", colour: "a4" }], curves: [{ expr: f, colour: "a1" }],
      points: [-1, 1].map((x) => ({ x, y: -5, colour: "ink", label: `(${x < 0 ? "−" : ""}1, −5)`, dx: x < 0 ? -10 : 10, dy: -12, anchor: x < 0 ? "end" : "start" })),
      checks: [pt(f, 1, -5, "f(1) = −5"), pt(f, -1, -5, "f(−1) = −5"), sl("4*x^3-12*x", 1, 0, "f″(1) = 0"), sl("4*x^3-12*x", -1, 0, "f″(−1) = 0"), sl("4*x^3-12*x", 2, 36, "f″(2) = 36 > 0: convex")], fromLesson: ["f″(x) = 12x"].slice(0, 0) }));
}

// ---------- u07-24 Points of inflection ----------
{
  const f = "x*exp(x)", y0 = -2 * Math.exp(-2);
  mk("u07-24", "maths-u07-inflection-xex", "graph", "The inflection of xeˣ",
    "y″ = eˣ(x + 2) changes sign at x = −2, so (−2, −2e⁻² ≈ −0.271) is a point of inflection: the curve changes from bending down to bending up. The gradient eˣ(x + 1) is at its lowest there.",
    "The curve y = xeˣ dipping to a minimum near x = −1 and rising, with the inflection marked at (−2, −0.271) on its left-hand arm.",
    ["y′ = eˣ(x + 1) and y″ = eˣ(x + 2).", "y″ = 0 at x = −2.", "eˣ > 0 and x + 2 changes sign there, so y″ changes sign.", "The inflection is at (−2, −2e⁻²) ≈ (−2, −0.271)."],
    G({ x: [-5, 2], y: [-0.8, 3] }, T([-5, -4, -3, -2, -1, 1, 2], [1, 2, 3]), { grid: [1, 1], curves: [{ expr: f, colour: "a1" }, { expr: "exp(x)*(x+1)", colour: "a4", dash: "6 4", label: "y′", labelAt: [0.2, 1.3] }], points: [{ x: -2, y: y0, label: "inflection (−2, −0.271)", colour: "a2", dx: -10, dy: -16, anchor: "start" }],
      checks: [pt(f, -2, y0, "y = −2e⁻² at x = −2"), { type: "min", expr: "exp(x)*(x+1)", domain: [-5, 2], x: -2, y: -Math.exp(-2), name: "the gradient y′ is smallest at x = −2, where y″ = 0" }], fromLesson: ["y″ = e^{x}(x + 2)"] }));
}

// ---------- u07-25 Curve sketching ----------
{
  const f = "(x+1)/(x-2)";
  mk("u07-25", "maths-u07-sketch-hyperbola", "graph", "y = (x + 1)/(x − 2)",
    "The vertical asymptote is x = 2 and the horizontal asymptote is y = 1. The curve crosses the axes at (−1, 0) and (0, −½), and y′ = −3/(x − 2)² < 0 so it falls on each branch.",
    "A hyperbola in two branches: the left branch below y = 1 through (−1, 0) and (0, −½) falling towards x = 2, the right branch above y = 1 falling towards y = 1.",
    ["As x → 2 the denominator → 0: vertical asymptote x = 2.", "As x → ±∞ the value tends to 1: horizontal asymptote y = 1.", "The intercepts are (−1, 0) and (0, −½).", "y′ = −3/(x − 2)² < 0: decreasing on each branch."],
    G({ x: [-5, 7], y: [-5, 7] }, T([-4, -2, 2, 4, 6], [-4, -2, 2, 4, 6]), { grid: [1, 1], curves: [{ expr: f, colour: "a1", domain: [-5, 1.8] }, { expr: f, colour: "a1", domain: [2.2, 7] }], marks: [{ x: 2, label: "x = 2" }, { y: 1, label: "y = 1" }],
      points: [{ x: -1, y: 0, label: "(−1, 0)", colour: "a2", dx: -10, dy: -12, anchor: "end" }, { x: 0, y: -0.5, label: "(0, −½)", colour: "a2", dx: -10, dy: 22, anchor: "end" }],
      checks: [pt(f, -1, 0, "(−1, 0) is on the curve"), pt(f, 0, -0.5, "(0, −½) is on the curve"), sl(f, 3, -3, "y′ = −3/(3 − 2)² = −3 at x = 3"), sl(f, 0, -0.75, "y′ = −3/4 at x = 0: falling")], fromLesson: ["y = 1"] }));
}

// ---------- u07-26 Integral calculus: distance ----------
{
  const f = "3*x^2";
  mk("u07-26", "maths-u07-distance-area", "graph", "Distance as area under a velocity graph",
    "The distance travelled is the area under the velocity graph v = 3t² from t = 0 to 4. An antiderivative is t³, so the area is 4³ − 0³ = 64 m.",
    "The parabola v = 3t² from 0 to 4 s, rising to 48 m/s, with the area under it shaded and labelled 64 m.",
    ["Velocity is 3t² m/s.", "Distance is the area under the velocity–time graph from 0 to 4.", "An antiderivative of 3t² is t³.", "4³ − 0³ = 64 m."],
    { ...G({ x: [0, 5], y: [0, 55] }, T([1, 2, 3, 4, 5], [10, 20, 30, 40, 50]), { axisLabels: ["t (s)", "v (m/s)"], grid: [1, 10] }), curves: [{ expr: f, colour: "a1", domain: [0, 4.2] }], areas: [{ expr: f, from: 0, to: 4, colour: "a2" }], marks: [{ x: 4 }], points: [{ x: 4, y: 48, label: "(4, 48)", colour: "a2", dx: 10, dy: -10 }],
      notes: [], checks: [{ type: "area", expr: f, from: 0, to: 4, value: 64, tol: 0.01, name: "the area under 3t² from 0 to 4 is 4³ = 64 m" }], fromLesson: ["64 m"].slice(0, 0) });
}

// ---------- u07-27 Indefinite integrals ----------
{
  const F0 = "x^2/2-2/x", F1 = "x^2/2-2/x+3", fx = (x) => x + 2 / x ** 2;
  mk("u07-27", "maths-u07-constant-of-integration", "graph", "Every value of c gives the same slopes",
    "∫(x + 2x⁻²) dx = x²/2 − 2/x + c. Changing c slides the whole curve up or down, but the gradient at each x is still x + 2/x²: at x = 1 it is 3 on every curve.",
    "Two copies of y = x²/2 − 2/x, one shifted 3 units above the other, with parallel tangent-slopes at x = 1 and x = 2.",
    ["Split (x³ + 2)/x² into x + 2x⁻².", "Integrate each term: x²/2 and −2x⁻¹.", "Add the constant c.", "Differentiating any of these curves gives back x + 2/x²."],
    G({ x: [0.4, 4], y: [-5, 10] }, T([1, 2, 3, 4], [-4, -2, 2, 4, 6, 8, 10]), { grid: [1, 2], curves: [{ expr: F0, colour: "a1", label: "c = 0", labelAt: [2.9, 2.0] }, { expr: F1, colour: "a2", label: "c = 3", labelAt: [2.9, 5.2] }],
      checks: [1, 2, 3].flatMap((x) => [sl(F0, x, fx(x), `the slope of F at x = ${x} is x + 2/x² = ${r3(fx(x))} (c = 0)`), sl(F1, x, fx(x), `the same slope ${r3(fx(x))} with c = 3`)]).concat([{ type: "point", expr: F1, x: 1, y: -1.5 + 3, name: "F(1) = ½ − 2 = −1.5 for c = 0, and 1.5 for c = 3" }]), fromLesson: ["x^{2}/2 − 2/x + c"] }));
}

// ---------- u07-28 Riemann sums ----------
{
  const n = 4, dx = 0.5, hs = [1, 2, 3, 4].map((i) => (i * dx) ** 2), tot = hs.reduce((a, b) => a + b, 0) * dx; must(tot === 3.75, "riemann");
  const step = [[0, 0]]; hs.forEach((h, i) => { step.push([i * dx, h], [(i + 1) * dx, h], [(i + 1) * dx, 0]); });
  mk("u07-28", "maths-u07-right-endpoint-strips", "graph", "Four right-endpoint strips under x²",
    "Each strip has width 0.5 and its height is x² at its right edge: 0.25, 1, 2.25, 4. They add to 7.5, so the estimate is 7.5 × 0.5 = 3.75. The true area is 8/3 ≈ 2.67: every strip pokes above the curve because x² is increasing.",
    "The curve y = x² from 0 to 2 with four rectangles of width 0.5, each with its top-right corner on the curve, standing above the curve.",
    ["Divide [0, 2] into 4 strips of width Δx = 0.5.", "The right endpoints are 0.5, 1, 1.5 and 2, with heights 0.25, 1, 2.25 and 4.", "The heights sum to 7.5; times 0.5 gives 3.75.", "The exact area 8/3 is smaller: an overestimate."],
    { ...G({ x: [0, 2.4], y: [0, 4.6] }, T([0.5, 1, 1.5, 2], [1, 2, 3, 4]), { grid: [0.5, 1] }), series: [{ points: step, colour: "a2", width: 2 }], curves: [{ expr: "x^2", colour: "a1", domain: [0, 2.2] }], areas: [{ expr: "x^2", from: 0, to: 2, colour: "a4", opacity: 0.2 }],
      checks: [{ type: "area", expr: "x^2", from: 0, to: 2, value: 8 / 3, tol: 0.001, name: "the exact area under x² from 0 to 2 is 8/3 ≈ 2.67" }, ...hs.map((h, i) => pt("x^2", (i + 1) * dx, h, `strip ${i + 1} has height ${h} at x = ${(i + 1) * dx}`))], fromLesson: ["3.75"] });
}

// ---------- u07-29 Definite integrals: area between ----------
{
  mk("u07-29", "maths-u07-area-between-curves", "graph", "The area between y = x² and y = 2x",
    "The curves meet at x = 0 and x = 2, with 2x above x². The area between them is ∫₀² (2x − x²) dx = [x² − x³/3]₀² = 4 − 8/3 = 4/3.",
    "A parabola y = x² and a line y = 2x meeting at (0, 0) and (2, 4), with the lens-shaped region between them shaded.",
    ["Solve x² = 2x: x = 0 or x = 2.", "On [0, 2] the line 2x is above the parabola.", "Area = ∫₀² (2x − x²) dx = [x² − x³/3]₀².", "= 4 − 8/3 = 4/3."],
    G({ x: [-0.5, 3], y: [-0.5, 6] }, T([1, 2, 3], [1, 2, 3, 4, 5, 6]), { grid: [1, 1], areas: [{ expr: "2*x", from: 0, to: 2, colour: "a2", opacity: 0.25 }, { expr: "x^2", from: 0, to: 2, colour: "panel", opacity: 1 }], curves: [{ expr: "x^2", colour: "a1", label: "y = x²", labelAt: [0.3, 4.6] }, { expr: "2*x", colour: "a4", domain: [-0.5, 2.9], label: "y = 2x", labelAt: [-0.4, 1.4] }],
      points: [{ x: 0, y: 0, label: "(0, 0)", colour: "ink", dx: 10, dy: 18 }, { x: 2, y: 4, label: "(2, 4)", colour: "ink", dx: -10, dy: 4, anchor: "end" }],
      checks: [{ type: "intersect", a: "x^2", b: "2*x", x: 0, y: 0, name: "the curves meet at (0, 0)" }, { type: "intersect", a: "x^2", b: "2*x", x: 2, y: 4, name: "the curves meet at (2, 4)" }, { type: "area", expr: "2*x-x^2", from: 0, to: 2, value: 4 / 3, tol: 0.001, name: "the area between them is 4/3" }], fromLesson: ["4 − 8/3 = 4/3"] }));
}

// ---------- u07-30 FTC ----------
{
  const F = "3*x*log(3*x)-3*x+1", g = "3*log(3*x)", gx = (x) => 3 * Math.log(3 * x);
  mk("u07-30", "maths-u07-ftc-slope", "graph", "The area function F(x) = ∫₁^{3x} ln t dt",
    "F(x) = 3x ln(3x) − 3x + 1 is the area under ln t from 1 to 3x. Its slope at each x is 3 ln(3x), the height of the integrand at 3x times the rate 3 at which 3x moves: F′ is the dashed curve.",
    "The curve F(x) = 3x ln 3x − 3x + 1, which is zero at x = 1/3, rising steeply, with the curve 3 ln(3x) for its gradient; the slopes match at x = 0.5, 1 and 2.",
    ["F(x) is the area under ln t between t = 1 and t = 3x.", "By part 1 with the chain rule, F′(x) = ln(3x) × 3 = 3 ln(3x).", "Check: differentiating 3x ln(3x) − 3x + 1 gives 3 ln(3x) + 3 − 3.", "At x = 1/3 the limits coincide, so F = 0 there."],
    G({ x: [0.1, 2.5], y: [-2, 8] }, T([0.5, 1, 1.5, 2, 2.5], [-2, 2, 4, 6, 8]), { grid: [0.5, 2], curves: [{ expr: F, colour: "a1", label: "F(x)", labelAt: [2.05, 2.6] }, { expr: g, colour: "a2", dash: "6 4", label: "F′(x) = 3 ln(3x)", labelAt: [0.2, 6.4] }],
      points: [{ x: 1 / 3, y: 0, label: "F = 0", colour: "a4", dx: 10, dy: -12 }],
      checks: [pt(F, 1 / 3, 0, "F(1/3) = 0: the limits meet"), ...[0.5, 1, 2].map((x) => sl(F, x, gx(x), `the slope of F at x = ${x} is 3 ln(3x) = ${r3(gx(x))}`))], fromLesson: ["3 ln(3x)"] }));
}

// ---------- u07-31 Substitution ----------
mk("u07-31", "maths-u07-substitution-area", "graph", "The area under x√(1 − x²)",
  "With u = 1 − x² the integral becomes ½∫₀¹ u^½ du = ⅓. The graph shows the same area directly: the region under y = x√(1 − x²) from 0 to 1 is exactly 1/3.",
  "The curve y = x√(1 − x²) rising from the origin to a peak of 0.5 near x = 0.71 and returning to zero at x = 1, with the area under it shaded.",
  ["u = 1 − x² gives du = −2x dx, so x dx = −½ du.", "The limits x = 0 → 1 become u = 1 → 0.", "The integral becomes ½∫₀¹ u^½ du = ½ × ⅔ = ⅓.", "The shaded area under the original curve is 1/3."],
  G({ x: [0, 1.2], y: [0, 0.7] }, T([0.5, 1], [0.25, 0.5]), { grid: [0.25, 0.25], curves: [{ expr: "x*sqrt(1-x^2)", colour: "a1", domain: [0, 1] }], areas: [{ expr: "x*sqrt(1-x^2)", from: 0, to: 1, colour: "a2" }],
    checks: [{ type: "area", expr: "x*sqrt(1-x^2)", from: 0, to: 1, value: 1 / 3, tol: 0.001, name: "the area under x√(1 − x²) from 0 to 1 is 1/3" }, { type: "max", expr: "x*sqrt(1-x^2)", domain: [0, 1], x: Math.SQRT1_2, y: 0.5, name: "the peak is ½ at x = 1/√2" }], fromLesson: ["x = 0 → u = 1"] }));

// ---------- u07-32 Parts ----------
{
  const F = "x*sin(x)+cos(x)", f = "x*cos(x)";
  mk("u07-32", "maths-u07-parts-antiderivative", "graph", "x cos x and its antiderivative",
    "Integration by parts gives ∫x cos x dx = x sin x + cos x + c. The dashed curve x cos x is the slope of the solid curve at every point: where x cos x is zero, F has a turning point.",
    "The curve F(x) = x sin x + cos x and, dashed, its gradient x cos x, which crosses zero where F turns.",
    ["Take u = x and dv/dx = cos x, so v = sin x.", "∫x cos x dx = x sin x − ∫sin x dx.", "= x sin x + cos x + c.", "Differentiating x sin x + cos x gives x cos x back."],
    G({ x: [0, 6], y: [-6, 6] }, T([1, 2, 3, 4, 5, 6], [-4, -2, 2, 4]), { grid: [1, 2], curves: [{ expr: F, colour: "a1", label: "F", labelAt: [4.6, 3.8] }, { expr: f, colour: "a2", dash: "6 4", label: "x cos x", labelAt: [5.2, 4.6] }],
      checks: [1, 2, 4, 5].map((x) => sl(F, x, x * Math.cos(x), `the slope of F at x = ${x} is x cos x = ${r3(x * Math.cos(x))}`)), fromLesson: ["x sin x + cos x + c"] }));
}

// ---------- u07-33 Partial fractions ----------
{
  const f = "5/((x-1)*(x+4))", v = Math.log(12 / 7);
  mk("u07-33", "maths-u07-partial-fractions-area", "graph", "The area under 5/((x − 1)(x + 4))",
    `Splitting into 1/(x − 1) − 1/(x + 4) gives ∫₂³ = ln(12/7) ≈ ${r3(v)}. The shaded area under the curve between x = 2 and x = 3 has exactly this size.`,
    "The curve y = 5/((x − 1)(x + 4)) falling from x = 1.3, with the area between x = 2 and x = 3 shaded.",
    ["5/((x − 1)(x + 4)) = 1/(x − 1) − 1/(x + 4).", "Integrate: ln|x − 1| − ln|x + 4|.", "Evaluate from 2 to 3: (ln 2 − ln 7) − (ln 1 − ln 6) = ln(12/7).", `The area is ≈ ${r3(v)}.`],
    G({ x: [1.3, 4], y: [0, 3] }, T([2, 3, 4], [1, 2, 3]), { grid: [0.5, 1], curves: [{ expr: f, colour: "a1", domain: [1.3, 4] }], areas: [{ expr: f, from: 2, to: 3, colour: "a2" }], marks: [{ x: 2 }, { x: 3 }],
      checks: [{ type: "area", expr: f, from: 2, to: 3, value: v, tol: 0.0005, name: "the area from 2 to 3 is ln(12/7) ≈ 0.539" }, pt(f, 2, 5 / 6, "y = 5/6 at x = 2")], fromLesson: ["ln(12/7)"] }));
}

// ---------- u07-34 Trigonometric integration ----------
mk("u07-34", "maths-u07-cos-squared-area", "graph", "The area under cos²x",
  "Using cos²x = ½(1 + cos 2x), ∫₀^(π/2) cos²x dx = [x/2 + sin 2x/4] = π/4 ≈ 0.785. The curve cos²x falls from 1 to 0, and the shaded area is exactly π/4.",
  "The curve y = cos²x falling from 1 at x = 0 to 0 at x = π/2, with the area under it shaded.",
  ["cos²x = ½(1 + cos 2x).", "The antiderivative is x/2 + (sin 2x)/4.", "At π/2 it is π/4; at 0 it is 0.", "The area is π/4."],
  G({ x: [0, 2], y: [0, 1.2] }, T([0.5, 1, 1.5, 2], [0.5, 1]), { grid: [0.5, 0.5], curves: [{ expr: "cos(x)^2", colour: "a1", domain: [0, 1.9] }], areas: [{ expr: "cos(x)^2", from: 0, to: Math.PI / 2, colour: "a2" }], marks: [{ x: Math.PI / 2, label: "π/2" }],
    checks: [{ type: "area", expr: "cos(x)^2", from: 0, to: Math.PI / 2, value: Math.PI / 4, tol: 0.0005, name: "the area under cos²x from 0 to π/2 is π/4" }], fromLesson: ["= π/4 + 0 − 0 = π/4"].slice(0, 0) }));

// ---------- u07-35 Improper integrals ----------
mk("u07-35", "maths-u07-improper-area", "graph", "A finite area that never ends",
  "The curve y = xe^(−x²) never reaches the axis, yet the area under it from 0 to b is ½ − ½e^(−b²), which tends to ½: the improper integral converges to ½. By x = 3 the curve is already almost flat on the axis.",
  "The curve y = xe^(−x²) rising to a peak of about 0.43 at x = 0.71 and then decaying towards zero, with the area under it from 0 to 4 shaded.",
  ["∫ x e^(−x²) dx = −½e^(−x²).", "From 0 to b: ½ − ½e^(−b²).", "As b → ∞, e^(−b²) → 0.", "The area tends to ½."],
  G({ x: [0, 4], y: [0, 0.6] }, T([1, 2, 3, 4], [0.25, 0.5]), { grid: [1, 0.25], curves: [{ expr: "x*exp(-x^2)", colour: "a1" }], areas: [{ expr: "x*exp(-x^2)", from: 0, to: 4, colour: "a2" }],
    checks: [{ type: "area", expr: "x*exp(-x^2)", from: 0, to: 6, value: 0.5, tol: 0.0005, name: "the area from 0 to 6 is already ½ − ½e⁻³⁶ ≈ ½" }, { type: "max", expr: "x*exp(-x^2)", domain: [0, 4], x: Math.SQRT1_2, y: Math.SQRT1_2 * Math.exp(-0.5), name: "the peak is at x = 1/√2" }], fromLesson: ["½"].slice(0, 0) }));

// ---------- u07-36 Trapezium rule ----------
{
  const ys = [0, 0.5, 1, 1.5, 2].map((x) => Math.exp(x)), tz = 0.25 * (ys[0] + 2 * (ys[1] + ys[2] + ys[3]) + ys[4]);
  must(Math.abs(tz - 6.5216) < 1e-3, "trapezium");
  const pts = [[0, 0], ...[0, 0.5, 1, 1.5, 2].map((x, i) => [x, ys[i]]), [2, 0]];
  mk("u07-36", "maths-u07-trapezium-exp", "graph", "Four trapezia under eˣ",
    `Joining the points on y = eˣ at x = 0, 0.5, 1, 1.5, 2 with straight lines makes four trapezia of total area ${(+tz.toFixed(2))}. The exact area is e² − 1 ≈ 6.39: the chords lie above the convex curve, so the estimate is too big.`,
    "The curve y = eˣ from 0 to 2 with a straight-edged polygon of four trapezia under it, whose top edges lie just above the curve.",
    ["h = 0.5; the y-values are 1, 1.6487, 2.7183, 4.4817 and 7.3891.", "Trapezium rule: ½h[y₀ + 2(y₁ + y₂ + y₃) + y₄] = 0.25 × 26.0865.", `The estimate is ≈ ${(+tz.toFixed(2))}.`, "The exact value e² − 1 ≈ 6.39 is smaller, since eˣ is convex."],
    { ...G({ x: [0, 2.4], y: [0, 8.5] }, T([0.5, 1, 1.5, 2], [2, 4, 6, 8]), { grid: [0.5, 2] }), series: [{ points: pts, colour: "a2", width: 2 }], curves: [{ expr: "exp(x)", colour: "a1", domain: [0, 2.2] }], areas: [{ expr: "exp(x)", from: 0, to: 2, colour: "a4", opacity: 0.2 }],
      checks: [{ type: "area", expr: "exp(x)", from: 0, to: 2, value: E ** 2 - 1, tol: 0.001, name: "the exact area is e² − 1 ≈ 6.389" }, ...[0, 0.5, 1, 1.5, 2].map((x, i) => pt("exp(x)", x, ys[i], `eˣ at x = ${x} is ${r3(ys[i])}`))], fromLesson: ["26.0865"] });
}

// ---------- u07-37 Arc length ----------
{
  const f = "2*x*sqrt(1+x^2)", L = (2 / 3) * (2 * Math.SQRT2 - 1);
  mk("u07-37", "maths-u07-arc-length-integrand", "graph", "Arc length as an area under the speed",
    `For x = t², y = ⅔t³ the speed is √((dx/dt)² + (dy/dt)²) = 2t√(1 + t²). The curve's length for 0 ≤ t ≤ 1 is the area under this speed graph: (2/3)(2√2 − 1) ≈ ${r3(L)}.`,
    "The speed curve 2t√(1 + t²) rising from 0 at t = 0 to 2.83 at t = 1, with the area under it shaded.",
    ["dx/dt = 2t and dy/dt = 2t².", "Speed = √(4t² + 4t⁴) = 2t√(1 + t²).", "Length = ∫₀¹ 2t√(1 + t²) dt = [(2/3)(1 + t²)^(3/2)]₀¹.", `= (2/3)(2√2 − 1) ≈ ${r3(L)}.`],
    G({ x: [0, 1.2], y: [0, 3.4] }, T([0.5, 1], [1, 2, 3]), { axisLabels: ["t", "speed"], grid: [0.25, 1], curves: [{ expr: f, colour: "a1", domain: [0, 1.1] }], areas: [{ expr: f, from: 0, to: 1, colour: "a2" }], marks: [{ x: 1 }], points: [{ x: 1, y: 2 * Math.SQRT2, label: "(1, 2√2)", colour: "a2", dx: -10, dy: -10, anchor: "end" }],
      checks: [{ type: "area", expr: f, from: 0, to: 1, value: L, tol: 0.0005, name: "the area under 2t√(1 + t²) from 0 to 1 is (2/3)(2√2 − 1) ≈ 1.219" }], fromLesson: ["2t√(1 + t^{2})"] }));
}

// ---------- u07-38 Volumes of revolution ----------
{
  const f = `${Math.PI}*(4*x^2-x^4)`, V = (64 * Math.PI) / 15;
  mk("u07-38", "maths-u07-revolution-volume", "graph", "Volume as area under the cross-section",
    `Each slice at x is a washer of area π((2x)² − (x²)²) = π(4x² − x⁴). The volume is the area under this graph from 0 to 2, 64π/15 ≈ ${r3(V)}.`,
    "The curve A(x) = π(4x² − x⁴) rising from 0 to a peak of about 12.6 at x = √2 and falling back to 0 at x = 2, with the area under it shaded.",
    ["The curves meet at x = 0 and x = 2, with 2x outside.", "A slice has area π((2x)² − (x²)²) = π(4x² − x⁴).", "V = π∫₀² (4x² − x⁴) dx = π[4x³/3 − x⁵/5]₀².", "= π(32/3 − 32/5) = 64π/15."],
    G({ x: [0, 2.4], y: [0, 14] }, T([0.5, 1, 1.5, 2], [4, 8, 12]), { axisLabels: ["x", "A(x)"], grid: [0.5, 2], curves: [{ expr: f, colour: "a1", domain: [0, 2.2] }], areas: [{ expr: f, from: 0, to: 2, colour: "a2" }],
      checks: [{ type: "area", expr: f, from: 0, to: 2, value: V, tol: 0.001, name: "the area under π(4x² − x⁴) from 0 to 2 is 64π/15" }, pt(f, 2, 0, "the slice shrinks to nothing at x = 2")], fromLesson: ["64π/15"] }));
}

// ---------- u07-39 Sequences and series ----------
{
  const terms = Array.from({ length: 10 }, (_, i) => 2 * (i + 1) ** 2 - 3), tot = terms.reduce((a, b) => a + b, 0); must(tot === 740, "sigma");
  mk("u07-39", "maths-u07-sigma-terms", "sequence", "The ten terms of 2r² − 3",
    "The terms of Σ(2r² − 3) for r = 1 to 10 are −1, 5, 15, 29, 47, 69, 95, 125, 159, 197. They add to 740, matching 2Σr² − Σ3 = 770 − 30.",
    "Ten boxes holding −1, 5, 15, 29, 47, 69, 95, 125, 159 and 197, with their sum 740.",
    ["The rth term is 2r² − 3.", "For r = 1 to 10 the terms are −1, 5, 15, …, 197.", "2Σr² = 2 × 10 × 11 × 21/6 = 770 and Σ3 = 30.", "The total is 770 − 30 = 740."],
    { terms, rule: { kind: "nth", expr: "2*n^2-3" }, show: "differences", ruleText: "sum of the ten terms = 740", checks: [{ type: "sum", n: 10, value: 740 }, { type: "nth", n: 10, value: 197 }], fromLesson: ["= 740"].slice(0, 0) });
}

// ---------- u07-40 Infinite series: ball ----------
{
  const first = 10, rest = 2 * (6 / (1 - 0.6)); must(first + rest === 40, "ball");
  mk("u07-40", "maths-u07-bouncing-ball", "bar-model", "The ball's total distance",
    "The ball falls 10 m, then rises and falls 6, 3.6, 2.16, … each twice. The bounces add to 2 × 6/(1 − 0.6) = 30 m, so the total distance is 10 + 30 = 40 m.",
    "One bar of 40 m split into a part of 10 m for the first drop and a part of 30 m for all the bounces.",
    ["The first drop is 10 m.", "Each rebound is 60% of the previous height: 6, 3.6, 2.16, …, travelled up and down.", "The bounces: 2 × 6/(1 − 0.6) = 30 m.", "Total = 10 + 30 = 40 m."],
    { bars: [{ label: "distance", parts: [{ value: 10, text: "drop 10 m", colour: "a1" }, { value: 30, text: "bounces 30 m", colour: "a2" }] }], braces: [{ bar: 0, from: 0, to: 1, value: 40, text: "40 m" }],
      checks: [{ type: "ratio", bar: 0, ratio: [1, 3], total: 40, name: "10 m + 30 m = 40 m" }], fromLesson: ["= 10 + 30 = 40 m"].slice(0, 0) });
}

// ---------- u07-41 Convergence: ratio ----------
{
  const terms = [1, 2, 3, 4, 5].map((n) => n / 2 ** n);
  mk("u07-41", "maths-u07-ratio-test-terms", "sequence", "n/2ⁿ and the ratio test",
    "The terms of Σ n/2ⁿ are ½, ½, ⅜, ¼, 5/32, … Each term divided by the one before is (n + 1)/(2n), which falls towards ½ and is below 1 from the second term on, so the terms shrink geometrically and the series converges (to 2).",
    "Five boxes ½, ½, ⅜, ¼, 5/32 with the ratios of consecutive terms 1, ¾, ⅔, ⅝ beneath.",
    ["The nth term is n/2ⁿ: 0.5, 0.5, 0.375, 0.25, …", "The ratio of consecutive terms is (n + 1)/(2n).", "It tends to ½ as n grows.", "½ < 1, so the series converges."],
    { terms, more: true, rule: { kind: "nth", expr: "n/2^n" }, show: "ratios", ruleText: "ratio = (n + 1)/(2n) → ½", checks: [{ type: "nth", n: 5, value: 5 / 32 }], fromLesson: ["(n + 1)/(2n)"] });
}

// ---------- u07-42 Power series: radius ----------
mk("u07-42", "maths-u07-radius-half", "number-line", "The interval of convergence",
  "The ratio of successive terms tends to |2x|, so the series converges for |2x| < 1, that is −½ < x < ½. The radius of convergence is R = ½.",
  "A number line from −1 to 1 with the interval from −½ to ½ shaded, open at both ends, and centre 0.",
  ["The ratio test gives |2x|(n + 1)/(n + 2) → |2x|.", "The series converges when |2x| < 1.", "That is −½ < x < ½: an interval centred at 0.", "The radius of convergence is ½."],
  { range: [-1, 1], ticks: { step: 0.5 }, minor: 0.1, narrowTicks: { step: 0.5 }, tickLabels: { "-1": "−1", "-0.5": "−½", 0: "0", 0.5: "½", 1: "1" }, intervals: [{ from: -0.5, to: 0.5, closed: [false, false], inequality: "-0.5 < x < 0.5", label: "converges: R = ½", colour: "a1" }],
    checks: [{ type: "value", expr: "1/2", value: "0.5", name: "|2x| < 1 gives |x| < 1/2" }], fromLesson: ["R = 1/2"] });

// ---------- u07-43 Taylor ----------
{
  const P = "2+(x-4)/4-(x-4)^2/64", y41 = 2 + 0.025 - 0.01 ** 2 * 100 / 64 / 100 * 100; // placeholder replaced below
  const p41 = 2 + 0.1 / 4 - 0.1 ** 2 / 64;
  mk("u07-43", "maths-u07-taylor-sqrt", "graph", "A quadratic that hugs √x at x = 4",
    "The degree-2 Taylor polynomial 2 + (x − 4)/4 − (x − 4)²/64 touches √x at (4, 2) with the same slope ¼ and the same bending. Near x = 4 the curves are indistinguishable: at x = 4.1 they give 2.024844 and 2.024846.",
    "The square root curve and the parabola 2 + (x − 4)/4 − (x − 4)²/64, which touch at (4, 2) and stay close for a while either side before separating.",
    ["f(4) = 2, f′(4) = ¼ and f″(4) = −1/32.", "√x ≈ 2 + (x − 4)/4 − (x − 4)²/64.", "At x = 4.1 the polynomial gives 2.024844.", "The true √4.1 is 2.024846…, very close."],
    G({ x: [0, 10], y: [0, 4] }, T([2, 4, 6, 8, 10], [1, 2, 3, 4]), { grid: [1, 1], curves: [{ expr: "sqrt(x)", colour: "a1", label: "√x", labelAt: [8.2, 3.1] }, { expr: P, colour: "a2", dash: "6 4", label: "Taylor", labelAt: [0.2, 1.1] }], points: [{ x: 4, y: 2, label: "(4, 2)", colour: "a4", dx: 10, dy: 20 }],
      checks: [pt("sqrt(x)", 4, 2, "√4 = 2"), pt(P, 4, 2, "the polynomial is 2 at x = 4"), sl("sqrt(x)", 4, 0.25, "f′(4) = ¼"), sl(P, 4, 0.25, "the polynomial has the same slope ¼"), pt("sqrt(x)", 4.1, p41, "√4.1 ≈ 2.024844"), pt(P, 4.1, p41, "the polynomial at 4.1 is 2.024844")], fromLesson: ["2.024844"] }));
}

// ---------- u07-44 Maclaurin ----------
{
  const f = "exp(2*x)*cos(x)", P = "1+2*x+1.5*x^2";
  mk("u07-44", "maths-u07-maclaurin-product", "graph", "e²ˣ cos x and its quadratic",
    "Multiplying the series gives e²ˣ cos x = 1 + 2x + (3/2)x² + …. The quadratic 1 + 2x + 1.5x² and the curve both pass through (0, 1) with slope 2, and stay close near x = 0.",
    "The curve y = e²ˣ cos x and the parabola 1 + 2x + 1.5x², which touch at (0, 1) with the same gradient 2 and nearly coincide for small x.",
    ["e²ˣ = 1 + 2x + 2x² + … and cos x = 1 − x²/2 + ….", "Multiply, keeping terms up to x².", "The x² coefficient is 2 − ½ = 3/2.", "e²ˣ cos x ≈ 1 + 2x + (3/2)x²."],
    G({ x: [-1, 1], y: [-1, 5] }, T([-1, -0.5, 0.5, 1], [1, 2, 3, 4, 5]), { grid: [0.5, 1], curves: [{ expr: f, colour: "a1", label: "e²ˣ cos x", labelAt: [0.3, 3.4] }, { expr: P, colour: "a2", dash: "6 4", label: "1 + 2x + 1.5x²", labelAt: [-0.95, 1.2] }], points: [{ x: 0, y: 1, label: "(0, 1)", colour: "a4", dx: 10, dy: 20 }],
      checks: [{ type: "intersect", a: f, b: P, x: 0, y: 1, name: "both curves pass through (0, 1)" }, sl(f, 0, 2, "e²ˣ cos x has gradient 2 at 0"), sl(P, 0, 2, "the quadratic has gradient 2 at 0"), pt(f, 0.1, Math.exp(0.2) * Math.cos(0.1), "at x = 0.1 the curve is 1.2153"), pt(P, 0.1, 1.215, "at x = 0.1 the quadratic is 1.215")], fromLesson: ["(3/2)x^{2}"] }));
}
