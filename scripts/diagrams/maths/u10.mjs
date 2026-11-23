// School 10, Differential Equations: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u10.mjs
import { mk } from "./spec.mjs";

const G = (range, ticks, body) => ({ range, ticks, grid: [ticks[0].at(-1), ticks[1].at(-1)], height: [360, 320], axisLabels: ["x", "y"], ...body });
const f2 = (v) => +v.toFixed(3);

// ---------- u10-01 y = 3e^(2x) ----------
{
  const y = (x) => 3 * Math.exp(2 * x);
  mk("u10-01", "maths-u10-exponential-solution", "graph", "y = Ce²ˣ with y(0) = 3",
    "y = Ce²ˣ has y′ = 2Ce²ˣ = 2y for every C. The condition y(0) = 3 picks C = 3: the curve y = 3e²ˣ through (0, 3).",
    "The curve y = 3e^(2x) rising steeply through the point (0, 3).",
    ["Differentiate y = Ce²ˣ: y′ = 2Ce²ˣ = 2y.", "Put x = 0: C = 3.", "The solution is y = 3e²ˣ."],
    G({ x: [-1.5, 1], y: [0, 12] }, [[-1, 0, 1], [3, 6, 9, 12]], { curves: [{ expr: "3*exp(2*x)", colour: "a1" }],
      points: [{ x: 0, y: 3, label: "(0, 3)", colour: "a2", dx: 10, dy: -10 }],
      checks: [{ type: "point", expr: "3*exp(2*x)", x: 0, y: 3 }, { type: "point", expr: "3*exp(2*x)", x: 1, y: f2(y(1)) }, { type: "point", expr: "(3*exp(2*(x+0.001))-3*exp(2*x))/0.001", x: 0, y: 6, name: "slope at x = 0 is 2y = 6" }] }));
}
// ---------- u10-02 coffee cooling ----------
{
  const k = Math.log(70 / 40) / 10, T = (t) => 20 + 70 * Math.exp(-k * t);
  mk("u10-02", "maths-u10-coffee-cooling", "graph", "Coffee cooling from 90°C towards 20°C",
    `T = 20 + 70e^(−kt) with k = ln(7/4)/10 ≈ ${k.toFixed(4)} per minute: 90°C at t = 0 and 60°C at t = 10. The room's 20°C is the asymptote.`,
    "A decaying curve from 90 at t = 0 to 60 at t = 10, levelling off towards 20.",
    ["T − 20 decays exponentially: T = 20 + 70e^(−kt).", "T(10) = 60 gives e^(−10k) = 40/70, so k = ln(7/4)/10.", "T falls towards 20°C and never goes below it."],
    { range: { x: [0, 40], y: [0, 100] }, ticks: [[10, 20, 30, 40], [20, 40, 60, 80, 100]], grid: [10, 20], height: [360, 320], axisLabels: ["t (min)", "T (°C)"],
      curves: [{ expr: `20+70*exp(-${k}*x)`, colour: "a1" }], marks: [{ y: 20, label: "room 20°C" }],
      points: [{ x: 0, y: 90, label: "(0, 90)", colour: "a2" }, { x: 10, y: 60, label: "(10, 60)", colour: "a2" }],
      checks: [{ type: "point", expr: `20+70*exp(-${k}*x)`, x: 0, y: 90 }, { type: "point", expr: `20+70*exp(-${k}*x)`, x: 10, y: 60 }] });
}
// ---------- u10-03 dy/dx = xy ----------
{
  mk("u10-03", "maths-u10-separable", "graph", "y = 2e^(x²/2) solves dy/dx = xy",
    `Separating, dy/y = x dx gives ln y = x²/2 + c, so y = Ce^(x²/2); y(0) = 2 makes C = 2. At x = 1, y = 2e^½ ≈ ${f2(2 * Math.exp(0.5))}.`,
    "The curve y = 2e^(x²/2), symmetric about the y axis, through (0, 2).",
    ["Separate: dy/y = x dx.", "Integrate: ln y = x²/2 + c, so y = Ce^(x²/2).", "y(0) = 2 gives C = 2."],
    G({ x: [-2.5, 2.5], y: [0, 14] }, [[-2, -1, 1, 2], [2, 4, 8, 12]], { curves: [{ expr: "2*exp(x^2/2)", colour: "a1" }],
      points: [{ x: 0, y: 2, label: "(0, 2)", colour: "a2", dx: 10, dy: -10 }],
      checks: [{ type: "point", expr: "2*exp(x^2/2)", x: 0, y: 2 }, { type: "point", expr: "2*exp(x^2/2)", x: 1, y: f2(2 * Math.exp(0.5)) }, { type: "point", expr: "(2*exp((x+0.0001)^2/2)-2*exp(x^2/2))/0.0001", x: 1, y: f2(2 * Math.exp(0.5)), name: "dy/dx = xy at x = 1" }] }));
}
// ---------- u10-04 y' + 2y = 4 ----------
{
  mk("u10-04", "maths-u10-linear-first-order", "graph", "y = 2 − 2e^(−2x) levels off at 2",
    "The integrating factor e²ˣ gives (e²ˣy)′ = 4e²ˣ, so y = 2 + Ce^(−2x); y(0) = 0 makes C = −2. The transient dies away and y tends to 2.",
    "The curve y = 2 − 2e^(−2x) rising from (0, 0) towards the horizontal line y = 2.",
    ["Multiply by e²ˣ: (e²ˣy)′ = 4e²ˣ.", "Integrate: y = 2 + Ce^(−2x).", "y(0) = 0 gives C = −2."],
    G({ x: [0, 4], y: [0, 2.5] }, [[1, 2, 3, 4], [0.5, 1, 1.5, 2]], { curves: [{ expr: "2-2*exp(-2*x)", colour: "a1" }], marks: [{ y: 2, label: "y = 2" }],
      points: [{ x: 0, y: 0, label: "(0, 0)", colour: "a2", dy: -10 }],
      checks: [{ type: "point", expr: "2-2*exp(-2*x)", x: 0, y: 0 }, { type: "point", expr: "2-2*exp(-2*x)", x: 1, y: f2(2 - 2 * Math.exp(-2)) }, { type: "point", expr: "(2-2*exp(-2*(x+0.0001))-(2-2*exp(-2*x)))/0.0001+2*(2-2*exp(-2*x))", x: 1, y: 4, name: "y′ + 2y = 4 at x = 1" }] }));
}
// ---------- u10-10 y' = y^2, y(0) = 2 ----------
{
  mk("u10-10", "maths-u10-blow-up", "graph", "y = 1/(½ − x) blows up at x = ½",
    "Separating, −1/y = x + c, so y = 1/(½ − x) from y(0) = 2. The denominator vanishes at x = ½: the solution goes to infinity in finite time.",
    "The curve y = 1/(0.5 − x) through (0, 2), rising without bound as x approaches 0.5.",
    ["Separate: dy/y² = dx.", "Integrate: −1/y = x + c; y(0) = 2 gives c = −½.", "y = 1/(½ − x), undefined at x = ½."],
    G({ x: [-1, 0.6], y: [0, 12] }, [[-1, -0.5, 0, 0.5], [2, 4, 6, 8, 10, 12]], { curves: [{ expr: "1/(0.5-x)", colour: "a1", domain: [-1, 0.45] }], marks: [{ x: 0.5, label: "x = ½" }],
      points: [{ x: 0, y: 2, label: "(0, 2)", colour: "a2", dx: 10, dy: -10 }],
      checks: [{ type: "point", expr: "1/(0.5-x)", x: 0, y: 2 }, { type: "point", expr: "1/(0.5-x)", x: 0.4, y: 10 }, { type: "point", expr: "(1/(0.5-(x+0.0001))-1/(0.5-(x-0.0001)))/0.0002-(1/(0.5-x))^2", x: 0.25, y: 0, name: "y′ = y² at x = 0.25" }] }));
}
// ---------- u10-13 y'' + y = 0 ----------
{
  mk("u10-13", "maths-u10-cosine-ivp", "graph", "y = cos x solves y″ + y = 0, y(0) = 1, y′(0) = 0",
    "The general solution is A cos x + B sin x. y(0) = 1 gives A = 1 and y′(0) = B = 0, so y = cos x: starts at 1 with zero slope.",
    "The cosine curve starting at its maximum (0, 1) with a horizontal tangent.",
    ["Characteristic roots ±i: y = A cos x + B sin x.", "y(0) = A = 1.", "y′(0) = B = 0, so y = cos x."],
    G({ x: [-1, 7], y: [-1.5, 1.5] }, [[1, 2, 3, 4, 5, 6, 7], [-1, 1]], { curves: [{ expr: "cos(x)", colour: "a1", domain: [0, 7] }],
      points: [{ x: 0, y: 1, label: "(0, 1)", colour: "a2", dx: 10, dy: -8 }],
      checks: [{ type: "point", expr: "cos(x)", x: 0, y: 1 }, { type: "max", expr: "cos(x)", domain: [0, 1], x: 0, y: 1 }, { type: "point", expr: "-cos(x)-(cos(x+0.001)-2*cos(x)+cos(x-0.001))/0.000001", x: 1, y: 0, name: "y″ + y = 0 at x = 1" }] }));
}
// ---------- u10-14 y'' = 6x ----------
{
  mk("u10-14", "maths-u10-boundary-value", "graph", "y = x³ − x meets both boundary conditions",
    "Integrating twice gives y = x³ + Ax + B. y(0) = 0 gives B = 0 and y(1) = 1 + A = 0 gives A = −1, so y = x³ − x, zero at both ends.",
    "The curve y = x³ − x on 0 to 1, starting and ending at zero and dipping below the axis in between.",
    ["Integrate y″ = 6x twice: y = x³ + Ax + B.", "y(0) = 0 gives B = 0.", "y(1) = 0 gives A = −1."],
    G({ x: [-0.2, 1.2], y: [-0.5, 0.2] }, [[0.5, 1], [-0.4, -0.2, 0.2]], { curves: [{ expr: "x^3-x", colour: "a1", domain: [0, 1] }],
      points: [{ x: 0, y: 0, label: "y(0) = 0", colour: "a2", dy: -10 }, { x: 1, y: 0, label: "y(1) = 0", colour: "a2", anchor: "end", dx: -8, dy: -10 }],
      checks: [{ type: "point", expr: "x^3-x", x: 0, y: 0 }, { type: "point", expr: "x^3-x", x: 1, y: 0 }, { type: "min", expr: "x^3-x", domain: [0, 1], x: f2(1 / Math.sqrt(3)), y: null, tol: 0.01, name: "lowest point at x = 1/√3" }] }));
}
// ---------- u10-18 Green's function solution u = x(1-x)/2 ----------
{
  mk("u10-18", "maths-u10-greens-solution", "graph", "−u″ = 1 on [0, 1]: u = x(1 − x)/2",
    "Integrating the Green's function G(x, s) against f = 1 gives u(x) = x(1 − x)/2: zero at both ends, with maximum 1/8 at the midpoint.",
    "A parabola u = x(1 − x)/2 over 0 to 1, zero at both ends with its peak 0.125 at x = 0.5.",
    ["u(x) = ∫ G(x, s) · 1 ds with G built from the two boundary conditions.", "The integral gives u = x(1 − x)/2.", "Peak at x = ½: u = 1/8."],
    G({ x: [-0.2, 1.2], y: [-0.05, 0.2] }, [[0.5, 1], [0.05, 0.1, 0.15]], { curves: [{ expr: "x*(1-x)/2", colour: "a1", domain: [0, 1] }],
      points: [{ x: 0.5, y: 0.125, label: "(½, 1/8)", colour: "a2", dy: -12 }],
      checks: [{ type: "max", expr: "x*(1-x)/2", domain: [0, 1], x: 0.5, y: 0.125 }, { type: "point", expr: "x*(1-x)/2", x: 0, y: 0 }, { type: "point", expr: "-(((x+0.001)*(1-x-0.001)/2)-2*(x*(1-x)/2)+((x-0.001)*(1-x+0.001)/2))/0.000001", x: 0.3, y: 1, name: "−u″ = 1" }] }));
}
// ---------- u10-21 heat equation ----------
{
  const u = (t) => `3*exp(-${t}*1)*sin(x)+exp(-${4 * t})*sin(2*x)`;
  mk("u10-21", "maths-u10-heat-smoothing", "graph", "The heat equation damps the high mode faster",
    "u = 3e^(−t) sin x + e^(−4t) sin 2x: the sin 2x part decays four times as fast. At t = 0.5 the profile is already close to a single smooth hump.",
    "Two curves on 0 to π: the initial profile 3 sin x + sin 2x with a skewed peak, and the profile at t = 0.5, lower and smoother.",
    ["Each mode sin(nx) decays as e^(−n²t).", "At t = 0: u = 3 sin x + sin 2x.", "At t = 0.5: u = 3e^(−0.5) sin x + e^(−2) sin 2x."],
    G({ x: [-0.3, 3.6], y: [-1, 4] }, [[1, 2, 3], [1, 2, 3, 4]], { curves: [{ expr: u(0), colour: "a1", domain: [0, Math.PI], label: "t = 0", labelAt: [1.0, 3.7] }, { expr: u(0.5), colour: "a2", domain: [0, Math.PI], label: "t = 0.5", labelAt: [1.0, 2.0] }],
      checks: [{ type: "point", expr: u(0), x: Math.PI / 2, y: 3 }, { type: "point", expr: u(0.5), x: Math.PI / 2, y: f2(3 * Math.exp(-0.5)) }, { type: "point", expr: u(0), x: 0, y: 0 }, { type: "point", expr: u(0.5), x: Math.PI, y: 0 }] }));
}
// ---------- u10-24 Poisson in the disc ----------
{
  mk("u10-24", "maths-u10-poisson-disc", "graph", "∇²u = 1 in the unit disc: u = (r² − 1)/4",
    "By symmetry u depends on r only: (1/r)(ru′)′ = 1 gives u = r²/4 + c, and u(1) = 0 gives c = −1/4. The minimum is u(0) = −1/4 at the centre.",
    "A parabola u = (r² − 1)/4 against r from 0 to 1, from −0.25 at the centre up to 0 at the boundary r = 1.",
    ["Radial form: (1/r) d/dr (r du/dr) = 1.", "u = r²/4 + c.", "u(1) = 0 gives c = −¼."],
    { range: { x: [0, 1.2], y: [-0.3, 0.1] }, ticks: [[0.5, 1], [-0.2, -0.1, 0]], grid: [0.5, 0.1], height: [360, 320], axisLabels: ["r", "u"],
      curves: [{ expr: "(x^2-1)/4", colour: "a1", domain: [0, 1] }],
      points: [{ x: 0, y: -0.25, label: "u(0) = −¼", colour: "a2", dx: 10, dy: 14 }, { x: 1, y: 0, label: "u(1) = 0", colour: "a2", anchor: "end", dx: -8, dy: 16 }],
      checks: [{ type: "point", expr: "(x^2-1)/4", x: 0, y: -0.25 }, { type: "point", expr: "(x^2-1)/4", x: 1, y: 0 }, { type: "min", expr: "(x^2-1)/4", domain: [0, 1], x: 0, y: -0.25 }] });
}
// ---------- u10-28 advection ----------
{
  mk("u10-28", "maths-u10-advected-peak", "graph", "The peak of e^(−x²) moves from 0 to 6 at speed 3",
    "Advection with c = 3 slides the profile unchanged: u(x, t) = e^(−(x − 3t)²). At t = 2 the peak is at x = 6.",
    "Two identical bell curves: one peaked at x = 0 (t = 0) and one at x = 6 (t = 2).",
    ["u(x, t) = u₀(x − ct).", "At t = 2 the argument is x − 6.", "The peak, where x − 6 = 0, is at x = 6."],
    G({ x: [-3, 9], y: [0, 1.2] }, [[-2, 0, 2, 4, 6, 8], [0.5, 1]], { curves: [{ expr: "exp(-x^2)", colour: "a1", label: "t = 0", labelAt: [-2.2, 0.2] }, { expr: "exp(-(x-6)^2)", colour: "a2", label: "t = 2", labelAt: [7.0, 0.5] }],
      checks: [{ type: "max", expr: "exp(-(x-3*2)^2)", domain: [-3, 9], x: 6, y: 1 }, { type: "max", expr: "exp(-x^2)", domain: [-3, 9], x: 0, y: 1 }] }));
}
// ---------- u10-32 particle in a box ----------
{
  mk("u10-32", "maths-u10-box-states", "graph", "Particle in a box (L = 1): ψ₁ and ψ₂",
    "Normalising φ = A sin(πx/L) gives A = √(2/L) (here √2). The second state sin(2πx/L) has twice the wave number, so E₂/E₁ = 4.",
    "Two curves on 0 to 1: ψ₁ a single hump with peak √2 at x = ½, and ψ₂ with one positive and one negative hump.",
    ["∫ A² sin²(πx/L) dx = A²L/2 = 1 gives A = √(2/L).", "Eₙ ∝ n², so E₂/E₁ = 4.", "ψ₂ has a node at x = L/2."],
    G({ x: [-0.1, 1.1], y: [-1.8, 1.8] }, [[0.5, 1], [-1, 1]], { curves: [{ expr: "sqrt(2)*sin(3.141592653589793*x)", colour: "a1", domain: [0, 1], label: "ψ₁", labelAt: [0.1, 1.0] }, { expr: "sqrt(2)*sin(6.283185307179586*x)", colour: "a2", domain: [0, 1], label: "ψ₂", labelAt: [0.62, -1.6] }],
      checks: [{ type: "max", expr: "sqrt(2)*sin(3.141592653589793*x)", domain: [0, 1], x: 0.5, y: f2(Math.SQRT2) }, { type: "area", expr: "2*sin(3.141592653589793*x)^2", from: 0, to: 1, value: 1, name: "ψ₁² has total area 1" }, { type: "point", expr: "sqrt(2)*sin(6.283185307179586*x)", x: 0.5, y: 0 }] }));
}
// ---------- u10-36 FEM ----------
{
  mk("u10-36", "maths-u10-fem-hat", "graph", "Two linear elements for −u″ = 1",
    "With one interior node at ½, the finite-element solution is the piecewise-linear 'tent' with u(½) = 1/8, which is exact at the node; the true solution x(1 − x)/2 curves above the straight pieces between nodes.",
    "The parabola x(1 − x)/2 and the straight-line tent through (0, 0), (0.5, 0.125) and (1, 0).",
    ["Stiffness: 2/h × u₁ = ∫ φ₁ = h = ½ with h = ½, so u₁ = 1/8.", "u_h is linear on [0, ½] and [½, 1].", "It matches the exact solution at the nodes."],
    G({ x: [-0.2, 1.2], y: [-0.05, 0.2] }, [[0.5, 1], [0.05, 0.1, 0.15]], { curves: [{ expr: "x*(1-x)/2", colour: "a1", domain: [0, 1], label: "exact", labelAt: [0.6, 0.17] }, { expr: "x/4", colour: "a2", domain: [0, 0.5], label: "FEM", labelAt: [0.1, 0.0] }, { expr: "(1-x)/4", colour: "a2", domain: [0.5, 1] }],
      points: [{ x: 0.5, y: 0.125, label: "1/8", colour: "a2", dy: -12 }],
      checks: [{ type: "point", expr: "x*(1-x)/2", x: 0.5, y: 0.125 }, { type: "point", expr: "x/4", x: 0.5, y: 0.125 }, { type: "point", expr: "(1-x)/4", x: 0.5, y: 0.125 }] }));
}
// ---------- u10-41 saddle-node ----------
{
  mk("u10-41", "maths-u10-saddle-node", "graph", "x′ = r + x²: equilibria x = ±√(−r)",
    "Equilibria satisfy x² = −r. For r < 0 there are two, x = ±√(−r); they merge at r = 0 and vanish for r > 0. The lower branch is stable, the upper unstable.",
    "A sideways parabola of equilibria x = ±√(−r) against r, opening to the left and ending at the origin.",
    ["Set r + x² = 0.", "r < 0: two equilibria ±√(−r).", "r = 0: one; r > 0: none."],
    { range: { x: [-4, 1], y: [-2.5, 2.5] }, ticks: [[-4, -3, -2, -1], [-2, -1, 1, 2]], grid: [1, 1], height: [360, 320], axisLabels: ["r", "x"],
      curves: [{ expr: "sqrt(-x)", colour: "a1", domain: [-4, 0] }, { expr: "-sqrt(-x)", colour: "a2", dash: true, domain: [-4, 0] }],
      points: [{ x: 0, y: 0, label: "r = 0", colour: "a2", dx: 8, dy: -10 }],
      checks: [{ type: "point", expr: "sqrt(-x)", x: -4, y: 2 }, { type: "point", expr: "-sqrt(-x)", x: -1, y: -1 }, { type: "point", expr: "x+(sqrt(-x))^2", x: -2, y: 0, name: "r + x² = 0 on the upper branch" }] });
}
// ---------- u10-44 delay equation ----------
{
  mk("u10-44", "maths-u10-delay-steps", "graph", "x′(t) = −x(t − 1) solved step by step",
    "On 0 ≤ t ≤ 1 the delayed value is 1, so x = 1 − t. On 1 ≤ t ≤ 2 the delayed value is 1 − (t − 1), giving x = (t − 1)(t − 3)/2, so x(2) = −½.",
    "A line falling from 1 to 0 on 0 to 1, then a curved piece dipping to −0.5 at t = 2.",
    ["0 ≤ t ≤ 1: x′ = −1 and x(0) = 1, so x = 1 − t.", "1 ≤ t ≤ 2: x′ = t − 2, with x(1) = 0.", "x(t) = (t − 1)(t − 3)/2; x(2) = −½."],
    { range: { x: [0, 2.4], y: [-0.8, 1.2] }, ticks: [[1, 2], [-0.5, 0.5, 1]], grid: [1, 0.5], height: [360, 320], axisLabels: ["t", "x"],
      curves: [{ expr: "1-x", colour: "a1", domain: [0, 1] }, { expr: "(x-1)*(x-3)/2", colour: "a2", domain: [1, 2] }],
      points: [{ x: 1, y: 0, label: "(1, 0)", colour: "a2", dx: 8, dy: -10 }, { x: 2, y: -0.5, label: "(2, −½)", colour: "a2", dx: 8, dy: -8 }],
      checks: [{ type: "point", expr: "1-x", x: 1, y: 0 }, { type: "point", expr: "(x-1)*(x-3)/2", x: 1, y: 0 }, { type: "point", expr: "(x-1)*(x-3)/2", x: 2, y: -0.5 }, { type: "point", expr: "((x+0.0001-1)*(x+0.0001-3)/2-(x-1)*(x-3)/2)/0.0001+(1-(x-1))", x: 1.5, y: 0, name: "x′(t) = −x(t − 1) at t = 1.5" }] });
}
