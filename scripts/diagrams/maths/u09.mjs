// School 9, Analysis: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u09.mjs
import { mk } from "./spec.mjs";

const T = (a, b) => [[...a], [...b]];
const last = (a) => (a.length > 1 ? a.at(-1) - a.at(-2) : 1);
const G = (range, ticks, body) => ({ range, ticks, grid: [last(ticks[0]), last(ticks[1])], height: [380, 340], axisLabels: ["x", "y"], ...body });
const pt = (expr, x, y, name) => ({ type: "point", expr, x, y, name });
const PI = Math.PI;

// ---------- u09-01 Real Analysis: (2n + 1)/(n + 3) → 2, with ε = 0.5 ----------
{
  const eps = 0.5, N = 5 / eps - 3, a = (n) => (2 * n + 1) / (n + 3);
  if (N !== 7 || !(2 - a(N + 1) < eps) || !(2 - a(N) >= eps)) throw new Error("u09-01");
  mk("u09-01", "maths-u09-epsilon-n", "graph", "Terms of (2n + 1)/(n + 3) entering the ε-band",
    `Each term is 5/(n + 3) below 2. With ε = 0.5 the rule N > 5/ε − 3 gives N = ${N}: from n = ${N + 1} on, every term is within 0.5 of the limit 2 (the 8th term is 17/11 ≈ ${a(N + 1).toFixed(3)}).`,
    "A rising curve for (2n + 1)/(n + 3) flattening towards the dashed line at 2, crossing the dashed line at 1.5 when n = 7.",
    ["The terms (2n + 1)/(n + 3) rise towards the limit 2, always below it.", "The lower dashed line, 1.5, is the edge of the band of width ε = 0.5 around 2.", `The curve meets 1.5 where 5/(n + 3) = 0.5, at n = ${N}: that is N = 5/ε − 3.`, "After n = 7 every term lies inside the band, and a smaller ε only moves N further right."],
    G({ x: [0, 20], y: [0, 2.5] }, T([5, 10, 15, 20], [0.5, 1, 1.5, 2, 2.5]), { axisLabels: ["n", "aₙ"],
      curves: [{ expr: "(2*x+1)/(x+3)", colour: "a1", domain: [0, 20] }, { expr: "2", colour: "a2", dash: "6 4" }, { expr: "1.5", colour: "a4", dash: "6 4" }],
      marks: [{ x: N, to: 1.5, label: "N = 7", dx: 0 }],
      points: [{ x: N, y: 1.5, colour: "a4" }, { x: 20, y: 2, label: "L = 2", colour: "a2", dx: -8, dy: -12, anchor: "end" }, { x: 12, y: 1.5, label: "2 − ε = 1.5", colour: "a4", dx: 0, dy: 26, anchor: "middle" }],
      checks: [{ type: "intersect", a: "(2*x+1)/(x+3)", b: "1.5", x: N, y: 1.5, name: "(2n + 1)/(n + 3) = 1.5 at n = 7 = 5/ε − 3" }, pt("(2*x+1)/(x+3)", N + 1, a(N + 1), "the 8th term is 17/11, inside the band"), pt("(2*x+1)/(x+3)", 1, 0.75, "the first term is 3/4")],
      fromLesson: ["5/(n + 3)", "N > 5/ε − 3"] }));
}

// ---------- u09-02 Complex Analysis: ∫ dx/(1 + x²) = π ----------
mk("u09-02", "maths-u09-lorentzian-area", "graph", "The area the residue gives: π",
  "The residue calculation gives ∫ dx/(1 + x²) = 2πi × 1/(2i) = π: exactly the area under this bell-shaped curve, which tails off so fast that almost all of it lies between −6 and 6.",
  "A bell-shaped curve 1/(1 + x²) with height 1 at x = 0, shaded between x = −6 and 6, tailing off to zero on both sides.",
  ["The integrand 1/(1 + x²) has height 1 at x = 0 and falls towards 0 on both sides.", "The residue at the pole i is 1/(2i), so the integral is 2πi × 1/(2i) = π.", "The shaded area under the curve is that number: π ≈ 3.14."],
  G({ x: [-6, 6], y: [0, 1.2] }, T([-6, -4, -2, 2, 4, 6], [0.5, 1]), { curves: [{ expr: "1/(1+x^2)", colour: "a1" }], areas: [{ expr: "1/(1+x^2)", from: -6, to: 6, colour: "a1", opacity: 0.18 }],
    points: [{ x: 0, y: 1, label: "1", colour: "a2", dx: 10, dy: -8 }],
    checks: [{ type: "area", expr: "1/(1+x^2)", from: -1000, to: 1000, value: PI, tol: 0.005, name: "the area under 1/(1 + x²) is π (computed out to ±1,000, where the rest is 0.002)" }, pt("1/(1+x^2)", 0, 1, "the curve is 1 at x = 0")],
    fromLesson: ["1/(2i)", "= π"] }));

// ---------- u09-04 Measure Theory: the Cantor set ----------
{
  const tx = { 9: "1", 3: "1/3", 1: "1/9" }, k = (v) => ({ value: v, text: tx[v], shade: true, colour: "a1" }), r = (v) => ({ value: v, text: tx[v] });
  const bars = [
    { label: "stage 0", parts: [k(9)] },
    { label: "stage 1", parts: [k(3), r(3), k(3)] },
    { label: "stage 2", parts: [k(1), r(1), k(1), r(3), k(1), r(1), k(1)] }];
  // lengths kept: (2/3)^n; removed after stage n: 1 − (2/3)^n → 1
  const keptN = (n) => (2 / 3) ** n, removed = 1 / 3 + 2 / 9 + 4 / 27;
  if (Math.abs(keptN(2) - 4 / 9) > 1e-12 || Math.abs(1 - keptN(3) - removed) > 1e-12) throw new Error("u09-04");
  mk("u09-04", "maths-u09-cantor-stages", "bar-model", "Building the Cantor set",
    "Each stage removes the middle third of every piece left, so the length kept is 1, 2/3, 4/9, …, (2/3)ⁿ → 0. The lengths removed, 1/3 + 2/9 + 4/27 + …, add up to 1, so the Cantor set has measure 0.",
    "Three bars of equal length. Stage 0 is a whole bar. Stage 1 keeps the outer thirds and removes the middle third. Stage 2 keeps four pieces of length 1/9 and removes the gaps between them.",
    ["Stage 0 is the whole interval [0, 1], length 1.", "Stage 1 removes the middle third (length 1/3), keeping two pieces of 1/3: total 2/3.", "Stage 2 removes the middle ninth of each piece (2 × 1/9 = 2/9), keeping four pieces of 1/9: total 4/9.", "After n stages the length kept is (2/3)ⁿ, which tends to 0: the removed lengths sum to 1."],
    { bars, checks: [{ type: "fraction", bar: 0, value: "1" }, { type: "fraction", bar: 1, value: "2/3" }, { type: "fraction", bar: 2, value: "4/9" }],
      fromLesson: ["Remove the middle third", "1/3 + 2/9 + 4/27"] });
}

// ---------- u09-05 Lebesgue Integration: ∫₀¹ xⁿ dx = 1/(n + 1) → 0 ----------
{
  const ns = [1, 2, 5, 20], cols = ["a1", "a2", "a4", "a5"];
  mk("u09-05", "maths-u09-power-areas", "graph", "xⁿ on [0, 1]: the area shrinks to 0",
    "As n grows, xⁿ hugs the x-axis except right at x = 1, and the area under it is 1/(n + 1): 1/2, 1/3, 1/6, 1/21, … → 0, matching the limit of the integrals found by dominated convergence.",
    "Four curves on [0, 1]: y = x, x squared, x to the 5 and x to the 20, each lower and closer to the axis than the last, all meeting at the point (1, 1).",
    ["Every curve xⁿ lies between 0 and the constant function 1 (the dominating function).", "For 0 ≤ x < 1, xⁿ → 0; only at the single point x = 1 does it stay at 1.", "The areas are 1/(n + 1): 1/2 for n = 1, 1/3 for n = 2, 1/6 for n = 5, 1/21 for n = 20, shrinking to 0."],
    G({ x: [0, 1], y: [0, 1.1] }, T([0.25, 0.5, 0.75, 1], [0.25, 0.5, 0.75, 1]), { height: [380, 340],
      curves: ns.map((n, i) => ({ expr: `x^${n}`, colour: cols[i] })), legend: ns.map((n, i) => [`n = ${n}`, cols[i]]), legendAt: [78, 56],
      points: [{ x: 1, y: 1, colour: "ink" }],
      checks: ns.map((n) => ({ type: "area", expr: `x^${n}`, from: 0, to: 1, value: 1 / (n + 1), tol: 0.0005, name: `the area under x^${n} on [0, 1] is 1/${n + 1}` })).concat([pt("x^20", 1, 1, "every xⁿ passes through (1, 1)")]),
      fromLesson: ["1/(n + 1)", "|x^{n}| ≤ 1"] }));
}

// ---------- u09-08 Banach Spaces: T(x) = x/2 + 1 ----------
{
  const T1 = (x) => x / 2 + 1; let x = 0; const its = [0]; for (let i = 0; i < 4; i++) { x = T1(x); its.push(x); }
  if (its.join() !== "0,1,1.5,1.75,1.875") throw new Error("u09-08");
  const path = []; for (let i = 0; i < its.length - 1; i++) path.push([its[i], its[i]], [its[i], its[i + 1]]); path.push([its.at(-1), its.at(-1)]);
  mk("u09-08", "maths-u09-fixed-point", "graph", "Iterating T(x) = x/2 + 1",
    "Starting at x₀ = 0 the iterates 1, 1.5, 1.75, 1.875, … step between the line y = x/2 + 1 and the diagonal y = x, each time halving the distance to the fixed point 2, where the two lines meet.",
    "The line y = x/2 + 1 and the diagonal y = x meet at (2, 2). A staircase path starting at the origin climbs between them to the meeting point.",
    ["T(x) = x/2 + 1 is a contraction with k = ½: distances to 2 halve at every step.", "From x₀ = 0, go up to the line (T(0) = 1), then across to the diagonal to make the new input, 1.", "Repeat: 1.5, 1.75, 1.875, … the staircase closes in on the crossing point.", "The lines meet at x = 2, and T(2) = 2: the unique fixed point."],
    G({ x: [0, 2.5], y: [0, 2.5] }, T([0.5, 1, 1.5, 2, 2.5], [0.5, 1, 1.5, 2, 2.5]), { axisLabels: ["x", "T(x)"],
      curves: [{ expr: "x/2+1", colour: "a1", label: "y = x/2 + 1", labelAt: [0.05, 1.8] }, { expr: "x", colour: "a2", dash: "6 4", label: "y = x", labelAt: [1.2, 0.85] }],
      series: [{ points: path, colour: "a4", width: 2.2 }],
      points: [{ x: 0, y: 0, label: "x₀ = 0", colour: "ink", dx: 8, dy: 22 }, { x: 1, y: 1, colour: "a4" }, { x: 2, y: 2, label: "fixed point 2", colour: "a2", dx: -10, dy: -14, anchor: "end" }],
      checks: [{ type: "intersect", a: "x/2+1", b: "x", x: 2, y: 2, name: "T(2) = 2: the lines meet at the fixed point" }].concat(its.slice(0, 4).map((v, i) => pt("x/2+1", v, its[i + 1], `T(${v}) = ${its[i + 1]}`))),
      fromLesson: ["1, 1.5, 1.75, 1.875", "T(2) = 1 + 1 = 2"] }));
}

// ---------- u09-09 Hilbert Spaces: ‖sin x‖² = π on [−π, π] ----------
mk("u09-09", "maths-u09-sin-norm", "graph", "The norm of sin x in L²[−π, π]",
  "‖sin x‖² is the area under sin²x from −π to π. The curve oscillates between 0 and 1 with average ½, so the area is ½ × 2π = π and the norm is √π ≈ 1.772.",
  "The curve y = sin squared x between −π and π, two humps of height 1 touching zero at −π, 0 and π, shaded underneath.",
  ["The norm squared is ∫ sin²x dx over [−π, π].", "sin²x = (1 − cos 2x)/2 averages ½ over a whole number of periods.", "The area is ½ × 2π = π, so ‖sin x‖ = √π ≈ 1.772."],
  G({ x: [-3.5, 3.5], y: [0, 1.2] }, T([-3, -2, -1, 1, 2, 3], [0.5, 1]), { axisLabels: ["x", "sin²x"], curves: [{ expr: "sin(x)^2", colour: "a1" }], areas: [{ expr: "sin(x)^2", from: -PI, to: PI, colour: "a1", opacity: 0.2 }],
    points: [{ x: PI / 2, y: 1, label: "1", colour: "a2", dx: 10, dy: -8 }],
    checks: [{ type: "area", expr: "sin(x)^2", from: -PI, to: PI, value: PI, tol: 0.001, name: "the area under sin²x on [−π, π] is π" }],
    fromLesson: ["= π", "√π ≈ 1.772"] }));

// ---------- u09-11 Spectral Theory: det(A − λI) = (2 − λ)² − 1 ----------
mk("u09-11", "maths-u09-characteristic", "graph", "The eigenvalues of [[2, 1], [1, 2]] are where det(A − λI) = 0",
  "The characteristic polynomial (2 − λ)² − 1 is a parabola that crosses zero at λ = 1 and λ = 3: the spectrum σ(A) = {1, 3}, with spectral radius 3.",
  "A parabola with its lowest point at (2, −1) crossing the horizontal axis at 1 and 3.",
  ["det(A − λI) = (2 − λ)² − 1 is a parabola in λ with minimum −1 at λ = 2.", "It equals zero where (2 − λ)² = 1, so 2 − λ = ±1.", "The roots are λ = 1 and λ = 3, the eigenvalues; the larger, 3, is the spectral radius."],
  G({ x: [-0.5, 4.5], y: [-1.5, 4] }, T([0, 1, 2, 3, 4], [-1, 1, 2, 3]), { axisLabels: ["λ", "det(A − λI)"], curves: [{ expr: "(2-x)^2-1", colour: "a1" }],
    points: [{ x: 1, y: 0, label: "λ = 1", colour: "a2", dx: -10, dy: 36, anchor: "end" }, { x: 3, y: 0, label: "λ = 3", colour: "a2", dx: 10, dy: 36, anchor: "start" }, { x: 2, y: -1, label: "(2, −1)", colour: "a4", dx: 0, dy: 24, anchor: "middle" }],
    checks: [pt("(2-x)^2-1", 1, 0, "λ = 1 is a root"), pt("(2-x)^2-1", 3, 0, "λ = 3 is a root"), { type: "min", expr: "(2-x)^2-1", domain: [-0.5, 4.5], x: 2, y: -1, name: "the lowest point is (2, −1)" }],
    fromLesson: ["(2 − λ)^{2} − 1 = 0", "λ = 1 or λ = 3"] }));

// ---------- u09-12 Banach Algebras: σ(x² + 1) = [1, 2] ----------
mk("u09-12", "maths-u09-range-spectrum", "graph", "The spectrum of f(x) = x² + 1 is its range",
  "f − λ fails to be invertible exactly when it vanishes somewhere on [0, 1], that is, when λ is a value f takes. f rises from 1 to 2, so σ(f) = [1, 2].",
  "The curve y = x squared plus 1 over 0 to 1, rising from (0, 1) to (1, 2), with the heights from 1 to 2 on the vertical axis highlighted.",
  ["f(x) = x² + 1 on [0, 1] rises steadily from f(0) = 1 to f(1) = 2.", "f − λ has a zero exactly when λ is a height f reaches.", "Every value between 1 and 2 is reached, so the spectrum is the whole interval [1, 2]."],
  G({ x: [-0.25, 1.25], y: [0, 2.5] }, T([0.25, 0.5, 0.75, 1], [0.5, 1, 1.5, 2, 2.5]), { axisLabels: ["x", "f(x)"], curves: [{ expr: "x^2+1", colour: "a1", domain: [0, 1] }, { expr: "1", colour: "a2", dash: "5 5", domain: [0, 1], width: 1.6 }, { expr: "2", colour: "a2", dash: "5 5", domain: [0, 1], width: 1.6 }],
    points: [{ x: 0, y: 1, label: "(0, 1)", colour: "a2", dx: 12, dy: 22 }, { x: 1, y: 2, label: "(1, 2)", colour: "a2", dx: -10, dy: -12, anchor: "end" }],
    checks: [{ type: "min", expr: "x^2+1", domain: [0, 1], x: 0, y: 1, name: "the smallest value of f on [0, 1] is 1" }, { type: "max", expr: "x^2+1", domain: [0, 1], x: 1, y: 2, name: "the largest value of f on [0, 1] is 2" }],
    fromLesson: ["σ(f) = [1, 2]"] }));
