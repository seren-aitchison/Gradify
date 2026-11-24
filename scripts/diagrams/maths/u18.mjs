// School 18, Optimisation: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u18.mjs
import { mk } from "./spec.mjs";

const must = (c, m) => { if (!c) throw new Error(m); };
const r2 = (x) => +x.toFixed(2);
const T = (a, b) => [[...a], [...b]];
const G = (range, ticks, body) => ({ range, ticks, grid: [Math.abs(ticks[0][1] - ticks[0][0]), Math.abs(ticks[1][1] - ticks[1][0])], height: [380, 340], axisLabels: ["x", "y"], ...body });
const pt = (expr, x, y, name) => ({ type: "point", expr, x, y, name });
const sl = (expr, x, value, name) => ({ type: "slope", expr, x, value, name });

// ---------- u18-01 The fence ----------
{
  const f = "x*(100-2*x)", x = 25, y = 100 - 2 * x, A = x * y;
  must(A === 1250, "fence");
  mk("u18-01", "maths-u18-fence-area", "graph", "Area against width for 100 m of fencing",
    "With the wall as one side, the area is A = x(100 − 2x). The curve peaks where dA/dx = 100 − 4x = 0, at x = 25 m (so y = 50 m), giving the maximum area 1250 m².",
    "A downward parabola A = x(100 − 2x) for x from 0 to 50 with its maximum 1250 at x = 25 marked.",
    ["Two sides of width x and one of length y use 2x + y = 100 m of fence, so y = 100 − 2x.", "The area is A = x(100 − 2x).", "At the top of the curve dA/dx = 100 − 4x = 0, so x = 25 and y = 50.", "The maximum area is 25 × 50 = 1250 m²."],
    G({ x: [0, 50], y: [0, 1400] }, T([10, 20, 30, 40, 50], [250, 500, 750, 1000, 1250]), { axisLabels: ["width x (m)", "area A (m²)"], curves: [{ expr: f, colour: "a1" }], marks: [{ x, to: A }],
      points: [{ x, y: A, label: "(25, 1250)", colour: "a2", dx: 12, dy: -12 }],
      checks: [{ type: "max", expr: f, domain: [0, 50], x, y: A, name: "the maximum area is 1250 m² at x = 25" }, sl(f, x, 0, "the gradient is 0 at x = 25"), pt(f, x, A, "25 × (100 − 50) = 1250")], fromLesson: ["1250"] }));
}

// ---------- u18-03 Constrained: minimise (x − 3)² on [0, 2] ----------
{
  const f = "(x-3)^2";
  mk("u18-03", "maths-u18-feasible-endpoint", "graph", "The minimum on 0 ≤ x ≤ 2 is at the boundary",
    "The unconstrained minimum of (x − 3)² is at x = 3, outside the feasible interval [0, 2]. On the feasible part the curve keeps falling, so the best feasible point is the endpoint x = 2, where f = 1 and the constraint x ≤ 2 is active.",
    "A parabola with minimum at (3, 0), the part with 0 ≤ x ≤ 2 highlighted, and the lowest feasible point (2, 1) marked.",
    ["The unconstrained minimum is x = 3, where f = 0.", "That is infeasible: it breaks x ≤ 2.", "On [0, 2] the curve is falling, so moving right always helps until the boundary.", "The constrained minimum is f(2) = 1 at x = 2."],
    G({ x: [-0.5, 4.5], y: [-0.5, 10] }, T([1, 2, 3, 4], [2, 4, 6, 8, 10]), { curves: [{ expr: f, colour: "a1", domain: [-0.5, 4.5] }, { expr: f, colour: "a2", domain: [0, 2] }],
      points: [{ x: 2, y: 1, label: "feasible minimum (2, 1)", colour: "a2", dx: 12, dy: -14 }, { x: 3, y: 0, label: "infeasible minimum", colour: "a4", dx: 4, dy: -14 }],
      checks: [{ type: "min", expr: f, domain: [0, 2], x: 2, y: 1, tol: 0.01, name: "on [0, 2] the minimum of (x − 3)² is f(2) = 1" }, { type: "min", expr: f, domain: [-0.5, 4.5], x: 3, y: 0, tol: 0.01, name: "without the constraint the minimum is at x = 3" }, sl(f, 1, -4, "f is falling on the feasible interval")], fromLesson: ["Minimum f(2) = 1"] }));
}

// ---------- u18-04 Lagrange: xy = 25 touches x + y = 10 ----------
{
  const h = "25/x", L = "10-x";
  mk("u18-04", "maths-u18-lagrange-tangent", "graph", "The level curve xy = 25 just touches x + y = 10",
    "On the constraint line x + y = 10 the product xy is largest where the level curve xy = 25 only touches the line, at (5, 5). There the curve and the line have the same gradient −1, which is what ∇f = λ∇g says.",
    "The hyperbola xy = 25 touching the line x + y = 10 at the single point (5, 5).",
    ["The constraint is the line y = 10 − x; the level curves of xy are hyperbolas.", "The level xy = 25 touches the line at (5, 5) without crossing it.", "Both have gradient −1 there, so the gradients of f and g are parallel.", "Hence the maximum of xy on the line is 25."],
    G({ x: [0, 10], y: [0, 10] }, T([2, 4, 6, 8, 10], [2, 4, 6, 8, 10]), { curves: [{ expr: h, colour: "a1", domain: [2.5, 10], label: "xy = 25", labelAt: [7.3, 4.2] }, { expr: L, colour: "a2", label: "x + y = 10", labelAt: [1.2, 9.4] }],
      points: [{ x: 5, y: 5, label: "(5, 5)", colour: "a4", dx: 12, dy: -12 }],
      checks: [{ type: "intersect", a: h, b: L, x: 5, y: 5, name: "xy = 25 meets x + y = 10 at (5, 5)" }, sl(h, 5, -1, "xy = 25 has gradient −1 at (5, 5)"), sl(L, 5, -1, "the line has gradient −1"), { type: "max", expr: "x*(10-x)", domain: [0, 10], x: 5, y: 25, name: "on the line, xy = x(10 − x) is largest at x = 5 with value 25" }], fromLesson: ["Maximum f = 25"] }));
}

// ---------- u18-05 KKT: x² subject to x ≥ 1 ----------
{
  const f = "x^2";
  mk("u18-05", "maths-u18-kkt-boundary", "graph", "Minimising x² with x ≥ 1",
    "The free minimum x = 0 breaks x ≥ 1, so the constraint is active and x* = 1 with value 1. The gradient of f there is 2, equal to the multiplier μ = 2 ≥ 0.",
    "The parabola y = x² with the feasible part x ≥ 1 highlighted, the optimum at (1, 1) and the infeasible vertex at the origin.",
    ["The unconstrained minimum is x = 0, which has x < 1.", "Case μ = 0 therefore fails: the constraint must be active, so x = 1.", "Stationarity 2x − μ = 0 gives μ = 2 at x = 1.", "μ = 2 ≥ 0, so x* = 1 satisfies the KKT conditions with value 1."],
    G({ x: [-1, 3], y: [-1, 9] }, T([-1, 1, 2, 3], [2, 4, 6, 8]), { curves: [{ expr: f, colour: "a1", domain: [-1, 3] }, { expr: f, colour: "a2", domain: [1, 3] }],
      points: [{ x: 1, y: 1, label: "x* = 1, μ = 2", colour: "a2", dx: 12, dy: -14 }, { x: 0, y: 0, label: "infeasible", colour: "a4", dx: -10, dy: -14 }],
      checks: [{ type: "min", expr: f, domain: [1, 3], x: 1, y: 1, tol: 0.01, name: "on x ≥ 1 the minimum is at x = 1 with value 1" }, sl(f, 1, 2, "the gradient of f at x = 1 is 2 = μ"), pt(f, 1, 1, "f(1) = 1")], fromLesson: ["μ = 2"] }));
}

// ---------- u18-07 Nonconvex: x⁴ − 4x² + x ----------
{
  const f = "x^4-4*x^2+x", F = (x) => x ** 4 - 4 * x ** 2 + x, d = (x) => 4 * x ** 3 - 8 * x + 1;
  const root = (a, b) => { for (let i = 0; i < 80; i++) { const c = (a + b) / 2; if (d(a) * d(c) <= 0) b = c; else a = c; } return (a + b) / 2; };
  const x1 = root(-2, -1), x2 = root(0, 0.5), x3 = root(1, 2);
  must(Math.abs(x1 + 1.47) < 0.01 && Math.abs(x2 - 0.13) < 0.01 && Math.abs(x3 - 1.35) < 0.01, "roots");
  must(F(x1) < F(x3) && Math.abs(F(x1) + 5.44) < 0.01 && Math.abs(F(x3) + 2.62) < 0.01, "values");
  mk("u18-07", "maths-u18-two-minima", "graph", "Two local minima, one global",
    `f(x) = x⁴ − 4x² + x has stationary points at x ≈ ${r2(x1)}, ${r2(x2)} and ${r2(x3)}. The outer two are minima, with f ≈ ${r2(F(x1))} and ${r2(F(x3))}, so only the left one is the global minimum; descent from the right would stop at the worse one.`,
    `A double-well curve with a deep minimum near x = ${r2(x1)}, a shallow one near x = ${r2(x3)} and a small peak near x = ${r2(x2)}.`,
    ["Solve f′(x) = 4x³ − 8x + 1 = 0: three roots near −1.47, 0.13 and 1.35.", "f″ > 0 at the outer two (minima) and f″ < 0 at 0.13 (maximum).", `f(−1.47) ≈ ${r2(F(x1))} is lower than f(1.35) ≈ ${r2(F(x3))}.`, "The left minimum is global; the right is only local."],
    G({ x: [-2.2, 2.2], y: [-7, 7] }, T([-2, -1, 1, 2], [-6, -4, -2, 2, 4, 6]), { curves: [{ expr: f, colour: "a1" }],
      points: [{ x: x1, y: F(x1), label: "global min", colour: "a2", dx: 12, dy: -12 }, { x: x3, y: F(x3), label: "local min", colour: "a4", dx: 0, dy: 20 }, { x: x2, y: F(x2), label: "local max", colour: "ink", dx: 10, dy: -10 }],
      checks: [sl(f, x1, 0, "f′ = 0 at the left minimum"), sl(f, x2, 0, "f′ = 0 at the local maximum"), sl(f, x3, 0, "f′ = 0 at the right minimum"),
        { type: "min", expr: f, domain: [-2.2, 0.0], x: x1, y: F(x1), tol: 0.01, name: "the left minimum is about −5.44" }, { type: "min", expr: f, domain: [0.6, 2.2], x: x3, y: F(x3), tol: 0.01, name: "the right minimum is about −2.62" }, { type: "max", expr: f, domain: [-0.5, 1], x: x2, y: F(x2), name: "the stationary point at 0.13 is a maximum" }], fromLesson: ["x ≈ −1.47"] }));
}

// ---------- u18-10 Pareto front ----------
{
  const P = { A: [3, 5], B: [4, 4], C: [5, 5], D: [2, 7] }, dom = (p, q) => p[0] <= q[0] && p[1] <= q[1] && (p[0] < q[0] || p[1] < q[1]);
  const nd = Object.keys(P).filter((k) => !Object.keys(P).some((j) => j !== k && dom(P[j], P[k])));
  must(nd.join("") === "ABD" && dom(P.B, P.C), "pareto");
  mk("u18-10", "maths-u18-pareto-front", "geometry", "The Pareto front of cost against emissions",
    "Minimising both, C = (5, 5) is dominated by B = (4, 4), which is lower on both axes. A, B and D each beat the others on one objective, so they form the Pareto front.",
    "Four points on a cost against emissions grid; A, B and D joined by a dashed front, and C above and to the right of B.",
    ["Plot each option as (cost, emissions); lower-left is better.", "B = (4, 4) has cost and emissions both at most C's, and strictly less, so C is dominated.", "No other pair is ordered on both objectives.", "The Pareto optimal set is {A, B, D}."],
    { points: P, grid: { step: 1, axes: true, labels: 1 }, view: { x: [0, 6.5], y: [0, 8.5] }, height: [340, 320], segments: [{ a: "D", b: "A", colour: "a2", dash: "5 4" }, { a: "A", b: "B", colour: "a2", dash: "5 4" }], circles: [{ centre: "A", r: 0.14, colour: "a2" }, { centre: "B", r: 0.14, colour: "a2" }, { centre: "D", r: 0.14, colour: "a2" }, { centre: "C", r: 0.14, colour: "a4" }],
      notes: [{ at: [3.6, 1.6], text: "x: cost, y: emissions", colour: "ink", size: 12 }],
      checks: [{ type: "value", expr: `${nd.length}`, value: 3, name: "three of the four options are Pareto optimal" }, { type: "value", expr: "5-4", value: 1, name: "C is 1 worse than B in cost and 1 worse in emissions (5 − 4)" }], fromLesson: ["Pareto optimal: A, B and D"] });
}

// ---------- u18-14 Linear programming ----------
{
  const V = [[0, 0], [4, 0], [3, 1], [0, 2]], obj = ([x, y]) => 3 * x + 2 * y, vals = V.map(obj);
  must(vals.join() === "0,12,11,4" && 4 - 1 === 3 && 3 + 3 * 1 === 6, "lp");
  const sh = V.reduce((a, [x, y], i) => a + (x * V[(i + 1) % 4][1] - V[(i + 1) % 4][0] * y), 0) / 2;
  const names = ["O", "P", "Q", "R"], pts = Object.fromEntries(names.map((n, i) => [n, V[i]]));
  mk("u18-14", "maths-u18-lp-vertices", "geometry", "The feasible region and its vertices",
    "The constraints x + y ≤ 4 and x + 3y ≤ 6 with x, y ≥ 0 bound a quadrilateral with vertices (0, 0), (4, 0), (3, 1) and (0, 2). The objective 3x + 2y takes 0, 12, 11 and 4 there, so the optimum is 12 at the vertex (4, 0).",
    "A shaded quadrilateral with corners (0, 0), (4, 0), (3, 1) and (0, 2), each labelled with the value of 3x + 2y, the largest 12 at (4, 0).",
    ["Draw x + y = 4 and x + 3y = 6 with the axes: they meet at (3, 1).", "The feasible region is the quadrilateral with vertices (0, 0), (4, 0), (3, 1), (0, 2).", "Evaluate 3x + 2y at each vertex: 0, 12, 11, 4.", "An optimum of a linear objective is at a vertex: here (4, 0) with value 12."],
    { points: pts, hide: names, polygons: [{ pts: names, colour: "a1", opacity: 0.14 }], segments: [], circles: [{ centre: "P", r: 0.14, colour: "a2" }], grid: { step: 1, axes: true, labels: 1 }, view: { x: [-0.8, 5.5], y: [-1, 3.2] }, height: [330, 300],
      notes: [{ at: [0.35, 0.3], text: "0", colour: "ink", size: 13 }, { at: [4.0, -0.5], text: "(4, 0): 12", colour: "a2", size: 13 }, { at: [3.3, 1.5], text: "(3, 1): 11", colour: "ink", size: 13 }, { at: [0.7, 2.4], text: "(0, 2): 4", colour: "ink", size: 13 }],
      checks: [{ type: "area", polygon: names, value: sh, name: `the feasible region has area ${sh}` }, { type: "value", expr: "3*4+2*0", value: Math.max(...vals), name: "3x + 2y = 12 at (4, 0), the largest vertex value" }, { type: "value", expr: "3*3+2*1", value: 11, name: "3x + 2y = 11 at (3, 1)" }, { type: "value", expr: "3+3*1", value: 6, name: "(3, 1) satisfies x + 3y = 6" }], fromLesson: ["The optimum is 12 at (4, 0)"] });
}

// ---------- u18-28 Simulated annealing acceptance ----------
{
  const g = "exp(-5/x)", p10 = Math.exp(-0.5), p1 = Math.exp(-5);
  mk("u18-28", "maths-u18-annealing-acceptance", "graph", "Acceptance probability of a worsening move, Δ = 5",
    `A move that worsens the cost by Δ = 5 is accepted with probability e^(−Δ/T). At T = 10 that is ${r2(p10)}; at T = 1 it falls to ${+p1.toFixed(4)}: cooling makes uphill moves rare.`,
    `A rising curve e^(−5/T) against temperature T, passing through (10, ${r2(p10)}) and (1, ${+p1.toFixed(4)}).`,
    ["Acceptance probability is e^(−Δ/T) with Δ = 5.", `At T = 10: e^(−0.5) ≈ ${r2(p10)}.`, `At T = 1: e^(−5) ≈ ${+p1.toFixed(4)}.`, "The curve shows the probability rising with T: hot searches accept most uphill moves, cold ones almost none."],
    G({ x: [0, 12], y: [0, 1] }, T([2, 4, 6, 8, 10, 12], [0.25, 0.5, 0.75, 1]), { axisLabels: ["temperature T", "P(accept)"], curves: [{ expr: g, colour: "a1", domain: [0.2, 12] }],
      points: [{ x: 10, y: p10, label: `T = 10: ${r2(p10)}`, colour: "a2", dx: -8, dy: -16, anchor: "end" }, { x: 1, y: p1, label: `T = 1: ${+p1.toFixed(4)}`, colour: "a4", dx: 14, dy: -22 }],
      checks: [pt(g, 10, p10, "at T = 10, e^(−0.5) ≈ 0.61"), pt(g, 1, p1, "at T = 1, e^(−5) ≈ 0.0067")], fromLesson: ["0.0067"] }));
}

// ---------- u18-33 Queueing: L = ρ/(1 − ρ) ----------
{
  const L = "x/(1-x)";
  mk("u18-33", "maths-u18-queue-blowup", "graph", "Queue length L = ρ/(1 − ρ)",
    "With λ = 8 and μ = 10 the utilisation is ρ = 0.8 and the mean number in the system is L = 0.8/0.2 = 4. The curve climbs steeply as ρ nears 1, so a busy server brings long queues.",
    "The curve L = ρ/(1 − ρ) for ρ from 0 to 0.95, passing through (0.8, 4) and rising steeply near 1.",
    ["Utilisation ρ = λ/μ = 8/10 = 0.8.", "L = ρ/(1 − ρ) = 0.8/0.2 = 4 customers.", "Little's law: W = L/λ = 0.5 hours, matching 1/(μ − λ).", "Small rises in ρ near 1 make L grow very fast."],
    G({ x: [0, 1], y: [0, 20] }, T([0.2, 0.4, 0.6, 0.8, 1], [5, 10, 15, 20]), { axisLabels: ["utilisation ρ", "mean number L"], curves: [{ expr: L, colour: "a1", domain: [0, 0.95] }],
      points: [{ x: 0.8, y: 4, label: "ρ = 0.8: L = 4", colour: "a2", dx: -10, dy: -16, anchor: "end" }, { x: 0.95, y: 19, label: "ρ = 0.95: L = 19", colour: "a4", dx: -8, dy: 16, anchor: "end" }],
      checks: [pt(L, 0.8, 4, "ρ = 8/10 = 0.8 gives L = 0.8/0.2 = 4"), pt(L, 0.95, 19, "ρ = 0.95 gives L = 19"), { type: "value", expr: "8*(1/(10-8))", x: 0, between: [3.999, 4.001], name: "Little's law: λW = 8 × 0.5 = 4" }], fromLesson: ["L = 0.8/0.2 = 4"] }));
}

// ---------- u18-34 EOQ ----------
{
  const D = 1200, S = 50, H = 3, Q = Math.sqrt((2 * D * S) / H), tc = (q) => (D / q) * S + (H * q) / 2;
  must(Q === 200 && tc(Q) === 600 && D / Q === 6, "eoq");
  const ord = `${D * S}/x`, hold = `${H / 2}*x`, tot = `${D * S}/x+${H / 2}*x`;
  mk("u18-34", "maths-u18-eoq-curves", "graph", "Ordering and holding cost against order size",
    "Ordering cost 60000/Q falls with Q while holding cost 1.5Q rises. Their sum is smallest where the two are equal, at Q = 200, with each costing £300 and the total £600 a year.",
    "Three curves against order size Q: a falling ordering cost, a rising holding-cost line and their U-shaped sum with its minimum 600 at Q = 200 where the first two cross at 300.",
    ["Orders per year D/Q cost S each: 60000/Q.", "Average stock Q/2 costs H each: 1.5Q.", "The total is smallest where they cross: Q = √(2DS/H) = 200, with 6 orders a year.", "At Q = 200 each cost is £300, total £600."],
    G({ x: [0, 500], y: [0, 1200] }, T([100, 200, 300, 400, 500], [300, 600, 900, 1200]), { axisLabels: ["order size Q", "annual cost £"], curves: [{ expr: ord, colour: "a2", domain: [50, 500], label: "ordering", labelAt: [70, 900] }, { expr: hold, colour: "a4", domain: [0, 500], label: "holding", labelAt: [420, 520] }, { expr: tot, colour: "a1", domain: [50, 500], label: "total", labelAt: [440, 860] }],
      points: [{ x: Q, y: tc(Q), label: "Q = 200, £600", colour: "ink", dx: 14, dy: 30 }, { x: Q, y: 300, label: "£300 each", colour: "ink", dx: 10, dy: 22 }],
      checks: [{ type: "min", expr: tot, domain: [50, 500], x: Q, y: tc(Q), tol: 0.5, name: "the total cost is least at Q = 200, £600" }, { type: "intersect", a: ord, b: hold, x: Q, y: 300, name: "ordering and holding cost are equal at Q = 200: £300" }, pt(tot, Q, 600, "300 + 300 = 600")], fromLesson: ["EOQ"] }));
}
