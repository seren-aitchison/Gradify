// Unit 39, Computational Physics. Every number in a caption or claim is computed here once, from the lesson's own
// worked example. Run: node scripts/diagrams/physics/u39.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));

// u39-02 the trapezium rule for ∫₀¹ x² dx with h = 0.5
{ const h = 0.5, ys = [0, 0.25, 1], T = h * (ys[0] / 2 + ys[1] + ys[2] / 2);
  mk("u39-02", "phys-u39-trapezium", "graph", {
    title: "The trapezium rule",
    caption: `With h = 0.5 the trapezium rule joins (0, 0), (0.5, 0.25) and (1, 1) with straight lines and adds the trapezia: ${T} against the exact 1/3. The straight tops lie above the curving x², so it overestimates; Simpson's rule (parabolas) gets 1/3 exactly.`,
    alt: "The curve y = x squared from 0 to 1, with two straight-topped trapezia under it from 0 to 0.5 and 0.5 to 1 lying slightly above the curve.",
    description: ["f(x) = x², sampled at x = 0, 0.5 and 1: 0, 0.25, 1.", `Trapezium rule: 0.5 × (0/2 + 0.25 + 1/2) = ${T}.`, `Exact: 1/3 ≈ 0.3333, so the error is ${r(T - 1 / 3, 4)}.`, "Halving h would cut the error by about four."],
    range: { x: [0, 1.1], y: [0, 1.1] }, ticks: [[0.5, 1], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["x", "y"],
    areas: [{ expr: "x^2", from: 0, to: 1, colour: "a4", opacity: 0.18 }],
    curves: [{ expr: "x^2", domain: [0, 1.05], colour: "a1", label: "y = x²", labelAt: [0.68, 0.2] }],
    series: [{ points: [[0, 0], [0.5, 0.25], [1, 1]], colour: "a2", width: 2.4, dots: true }, { points: [[0.5, 0], [0.5, 0.25]], colour: "a2", width: 1.4 }, { points: [[1, 0], [1, 1]], colour: "a2", width: 1.4 }],
    checks: [{ type: "area", expr: "x^2", from: 0, to: 1, value: r(1 / 3, 6), tol: 0.0005, name: "exact area 1/3" }, { type: "point", expr: "0.5*(0/2+x^2+1/2)", x: 0.5, y: T, name: `trapezium estimate ${T}` }],
  }); }

// u39-04 one Newton step for √2: f = x² − 2 from x₀ = 1
{ const x0 = 1, f0 = x0 * x0 - 2, d0 = 2 * x0, x1 = x0 - f0 / d0, tan = `${f0}+${d0}*(x-${x0})`;
  mk("u39-04", "phys-u39-newton-step", "graph", {
    title: "Newton's method follows the tangent",
    caption: `Newton's method replaces the curve by its tangent and solves that instead: x₁ = x₀ − f(x₀)/f′(x₀). From x₀ = 1 on f = x² − 2, the tangent meets zero at x₁ = 1 − (−1)/2 = ${x1}; the next step gives 1.4167, already close to √2 = 1.41421.`,
    alt: "The parabola x squared minus 2 with its tangent at x = 1, which crosses the x-axis at 1.5, near the root at 1.414.",
    description: [`f(1) = ${f0}, f′(1) = ${d0}.`, `Tangent: y = ${f0} + ${d0}(x − 1), zero at x = ${x1}.`, "Repeating: x₂ = 1.5 − 0.25/3 = 1.41667, x₃ = 1.41422.", "The number of correct digits roughly doubles each step."],
    range: { x: [0.5, 2], y: [-2, 2] }, ticks: [[1, 2], [-2, -1, 1, 2]], height: [320, 300], xLabelBelow: true, axisLabels: ["x", "f(x) = x² − 2"],
    curves: [{ expr: "x^2-2", colour: "a1", label: "f(x)", labelAt: [1.75, 1.6], anchor: "end" }, { expr: tan, domain: [0.7, 1.75], colour: "a2", dash: "6 5", label: "tangent at x₀ = 1", labelAt: [1.12, -1.75] }],
    points: [{ x: x0, y: f0, colour: "a2", label: "x₀", dx: 6, dy: 16 }, { x: x1, y: 0, colour: "a2", label: `x₁ = ${x1}`, dx: 8, dy: 14 }, { x: r(Math.SQRT2, 5), y: 0, colour: "a4", label: "√2", anchor: "end", dx: -6, dy: -12 }],
    checks: [{ type: "point", expr: tan, x: x1, y: 0, name: `the tangent crosses zero at ${x1}` }, { type: "slope", expr: "x^2-2", x: x0, value: d0, name: "f′(1) = 2" }],
  }); }

// u39-05 Euler's method for y′ = −y, y(0) = 1, h = 0.1
{ const h = 0.1, eul = [[0, 1]]; for (let i = 0; i < 10; i++) { const [x, y] = eul.at(-1); eul.push([r(x + h, 2), r(y - h * y, 8)]); }
  mk("u39-05", "phys-u39-euler", "graph", {
    title: "Euler's method against the exact solution",
    caption: `Euler's method steps along the slope at the start of each step: y_{n+1} = y_n + h f(y_n) = 0.9y_n. After two steps, y(0.2) ≈ 0.81 against the exact e^(−0.2) = ${r(Math.exp(-0.2), 4)}. The error per unit time shrinks only in proportion to h.`,
    alt: "The exact decay e to the minus x and Euler's step-by-step points lying slightly below it, from 0 to 1.",
    description: ["Exact: y = e^(−x).", "Euler with h = 0.1: 1, 0.9, 0.81, 0.729, … (multiply by 0.9 each step).", `At x = 0.2: Euler 0.81, exact ${r(Math.exp(-0.2), 4)}. At x = 1: Euler ${r(eul[10][1], 4)}, exact ${r(Math.exp(-1), 4)}.`],
    range: { x: [0, 1.05], y: [0, 1.05] }, ticks: [[0.2, 0.4, 0.6, 0.8, 1], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["x", "y"],
    curves: [{ expr: "exp(-x)", colour: "a1", label: "exact e^{−x}", labelAt: [0.55, 0.72] }],
    series: [{ points: eul, colour: "a2", width: 2, dots: true, label: "Euler, h = 0.1", labelAt: [0.4, 0.4] }],
    checks: [{ type: "point", expr: "exp(-x)", x: 0.2, y: r(Math.exp(-0.2), 8), name: `exact y(0.2) = ${r(Math.exp(-0.2), 4)}` }, { type: "point", expr: "0.9^(x/0.1)", x: 0.2, y: 0.81, name: "Euler gives 0.81 after two steps" }],
  }); }

// u39-17 gradient descent on (x − 3)² with η = 0.25 from x = 0
{ const eta = 0.25, xs = [0]; for (let i = 0; i < 4; i++) { const x = xs.at(-1); xs.push(r(x - eta * 2 * (x - 3), 6)); }
  mk("u39-17", "phys-u39-gradient-descent", "graph", {
    title: "Gradient descent towards a minimum",
    caption: `Each step moves against the gradient: x ← x − η f′(x). With f = (x − 3)² and η = ${eta}, the steps from 0 go ${xs.slice(1).join(", ")}: each halves the distance to the minimum at 3. Too large a step would overshoot and oscillate.`,
    alt: "The parabola (x − 3) squared with dots at x = 0, 1.5, 2.25, 2.625 and 2.8125 sliding down towards the minimum at 3.",
    description: ["f(x) = (x − 3)², f′(x) = 2(x − 3).", `x₁ = 0 − 0.25 × (−6) = ${xs[1]}; x₂ = ${xs[2]}; x₃ = ${xs[3]}; x₄ = ${xs[4]}.`, "The distance to 3 halves each step because η f″ = 0.5."],
    range: { x: [0, 5], y: [0, 10] }, ticks: [[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], height: [320, 300], xLabelBelow: true, axisLabels: ["x", "f(x) = (x − 3)²"],
    curves: [{ expr: "(x-3)^2", domain: [0, 5], colour: "a1" }],
    points: xs.map((x, i) => ({ x, y: r((x - 3) ** 2, 6), colour: "a2", ...(i < 3 ? { label: `x${["₀", "₁", "₂"][i]} = ${x}`, dx: 8, dy: -10 } : {}) })),
    checks: [{ type: "min", expr: "(x-3)^2", domain: [0, 5], x: 3, y: 0, name: "minimum at x = 3" }, { type: "point", expr: `x-${eta}*2*(x-3)`, x: 0, y: 1.5, name: "first step to 1.5" }, { type: "point", expr: `x-${eta}*2*(x-3)`, x: 1.5, y: 2.25, name: "second step to 2.25" }],
  }); }

// u39-20 Amdahl's law: 95% parallel
{ const p = 0.95, S = `1/(${1 - p}+${p}/x)`, at = 1 / (0.05 + 0.95 / 100);
  mk("u39-20", "phys-u39-amdahl", "graph", {
    title: "Amdahl's law",
    caption: `If 95% of a code runs in parallel, N cores give a speed-up S = 1/(0.05 + 0.95/N). On 100 cores that is ${r(at, 1)}; with infinitely many it can never pass 1/0.05 = 20, because the serial 5% always remains.`,
    alt: "Speed-up against number of cores, rising steeply then flattening towards a dashed limit of 20, with 16.8 at 100 cores marked.",
    description: ["S(N) = 1 / ((1 − p) + p/N), p = 0.95.", `N = 10: ${r(1 / (0.05 + 0.095), 1)}. N = 100: ${r(at, 1)}. N = 1000: ${r(1 / (0.05 + 0.00095), 1)}.`, "Limit as N → ∞: 1/(1 − p) = 20."],
    range: { x: [1, 400], y: [0, 22] }, ticks: [[100, 200, 300, 400], [5, 10, 15, 20]], height: [320, 300], xLabelBelow: true, axisLabels: ["number of cores", "speed-up"],
    curves: [{ expr: S, colour: "a1" }], marks: [{ y: 20, label: "limit 20" }, { x: 100, to: at }],
    points: [{ x: 100, y: r(at, 4), colour: "a2", label: `${r(at, 1)} on 100 cores`, dx: 10, dy: 14 }],
    checks: [{ type: "point", expr: S, x: 100, y: r(at, 6), name: `speed-up ${r(at, 1)} on 100 cores` }, { type: "value", expr: S, x: 400, between: [19, 20], name: "approaching but below 20" }],
  }); }
