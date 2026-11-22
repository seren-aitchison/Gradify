// School 2, Number Theory and Cryptography: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u02.mjs
import { mk } from "./spec.mjs";
import { fmt } from "../../../kit/diagrams/maths-core.js";

// tiles: [{x, y, w, h, text?, colour?, size?}] -> points, polygons, notes and one area check per tile
function tiles(list, whole, link = false) {
  const points = {}, polygons = [], notes = [], checks = [];
  list.forEach((t, i) => {
    const n = `T${i}`, a = [`${n}a`, `${n}b`, `${n}c`, `${n}d`];
    points[a[0]] = [t.x, t.y]; points[a[1]] = [t.x + t.w, t.y]; points[a[2]] = [t.x + t.w, t.y + t.h]; points[a[3]] = [t.x, t.y + t.h];
    polygons.push({ pts: a, colour: t.colour || "a1", opacity: t.opacity ?? 0.16 });
    if (t.text) { notes.push({ at: [t.x + t.w / 2, t.y + t.h / 2], text: t.text, colour: t.colour || "a1", size: t.size }); checks.push(link ? { type: "area", polygon: a, value: t.w * t.h, note: notes.length - 1 } : { type: "area", polygon: a, value: t.w * t.h }); }
    else checks.push({ type: "area", polygon: a, value: t.w * t.h });
  });
  if (whole) { points.W0 = [whole.x0, whole.y0]; points.W1 = [whole.x1, whole.y0]; points.W2 = [whole.x1, whole.y1]; points.W3 = [whole.x0, whole.y1]; checks.push({ type: "area", polygon: ["W0", "W1", "W2", "W3"], value: (whole.x1 - whole.x0) * (whole.y1 - whole.y0), name: whole.name }); }
  return { points, hide: Object.keys(points), polygons, notes, checks };
}
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

// ---------- u02-04 Euclidean algorithm: gcd(252, 198) by cutting squares off a 252 × 198 rectangle ----------
{
  const steps = []; let a = 252, b = 198;
  while (b) { steps.push([a, b, Math.floor(a / b), a % b]); [a, b] = [b, a % b]; }
  if (a !== 18 || gcd(252, 198) !== 18) throw new Error("gcd");
  const T = tiles([
    { x: 0, y: 0, w: 198, h: 198, text: "198 × 198", colour: "a1" },
    { x: 198, y: 0, w: 54, h: 54, text: "54", colour: "a2" }, { x: 198, y: 54, w: 54, h: 54, text: "54", colour: "a2" }, { x: 198, y: 108, w: 54, h: 54, text: "54", colour: "a2" },
    { x: 198, y: 162, w: 36, h: 36, text: "36", colour: "a3" },
    { x: 234, y: 162, w: 18, h: 18, text: "18", colour: "a4", size: 12 }, { x: 234, y: 180, w: 18, h: 18, text: "18", colour: "a4", size: 12 },
  ], { x0: 0, y0: 0, x1: 252, y1: 198, name: "the rectangle is 252 × 198, and the squares fill it exactly" });
  mk("u02-04", "maths-u02-euclid-squares", "geometry", "Euclid's algorithm as squares",
    "A 252 × 198 rectangle is cut into squares: one of side 198, three of side 54, one of 36 and two of side 18. The last square, 18, is gcd(252, 198), and it tiles the whole rectangle.",
    "A rectangle 252 wide and 198 tall filled by a 198 square, three 54 squares, a 36 square and two 18 squares.",
    ["Start with a rectangle 252 by 198, the numbers of the example.", "Cut off the largest square, 198 × 198 (252 = 1 × 198 + 54): a strip 54 wide remains.", "Three 54 squares fit in the strip (198 = 3 × 54 + 36), leaving a 54 × 36 piece.",
      "A 36 square fits once (54 = 1 × 36 + 18), leaving 18 × 36, which is exactly two 18 squares (36 = 2 × 18 + 0).", "The last square has side 18, so gcd(252, 198) = 18."],
    { ...T, view: { x: [-4, 256], y: [-6, 204] }, height: [330, 300], fromLesson: ["252 = 1 × 198 + 54", "gcd(252, 198) = 18"],
      checks: [...T.checks, { type: "distance", a: "T5a", b: "T5b", value: 18, name: "the last square has side 18 = gcd(252, 198)" }] });
}

// ---------- u02-06 Diophantine equations: lattice points on 3x + 5y = 47 ----------
{
  const sols = []; for (let x = 0; 3 * x <= 47; x++) if ((47 - 3 * x) % 5 === 0) sols.push([x, (47 - 3 * x) / 5]);
  const want = "4,7|9,4|14,1"; if (sols.map((s) => s.join(",")).join("|") !== want) throw new Error("diophantine");
  const pts = { X: [0, 47 / 5], Y: [47 / 3, 0] }; sols.forEach((s, i) => (pts["PQR"[i]] = s));
  mk("u02-06", "maths-u02-lattice-line", "geometry", "Whole-number solutions of 3x + 5y = 47",
    "Every point of the line 3x + 5y = 47 solves the equation, but only some have whole-number coordinates: (4, 7), (9, 4) and (14, 1), each step 5 across and 3 down.",
    "The line 3x + 5y = 47 on a grid with the three points (4, 7), (9, 4) and (14, 1) marked.",
    ["The line 3x + 5y = 47 crosses the axes at (0, 9.4) and (15.67, 0).", "y = 7 gives 3x = 12, so (4, 7) is a solution.", "Each step of t adds 5 to x and takes 3 from y: (9, 4), then (14, 1).", "Another step would make y negative, so there are exactly three non-negative solutions."],
    { points: pts, hide: ["X", "Y", "P", "Q", "R"], grid: { step: 1, axes: true, labels: 2 }, view: { x: [-1, 18], y: [-1, 11] }, height: [330, 300],
      segments: [{ a: "X", b: "Y", colour: "a2", w: 2.4 }], circles: sols.map((_, i) => ({ centre: "PQR"[i], r: 0.2, colour: "a1" })), 
      notes: sols.map((s) => ({ at: [s[0] + 0.2, s[1] + 0.9], text: `(${s[0]}, ${s[1]})`, colour: "a1", size: 13 })),
      fromLesson: ["(4, 7), (9, 4), (14, 1)"],
      checks: [{ type: "collinear", points: ["X", "Y", "P", "Q", "R"], name: "(4, 7), (9, 4) and (14, 1) lie on the line through (0, 47/5) and (47/3, 0), 3x + 5y = 47" }] });
}

// ---------- u02-07 Divisor functions: the divisors of 72 as a 4 × 3 grid whose area is σ(72) ----------
{
  const A = [1, 2, 4, 8], B = [1, 3, 9], d = A.length * B.length, sigma = A.reduce((s, x) => s + x, 0) * B.reduce((s, x) => s + x, 0);
  if (d !== 12 || sigma !== 195) throw new Error("sigma");
  const list = []; let x0 = 0;
  A.forEach((a) => { let y0 = 0; B.forEach((b) => { list.push({ x: x0, y: y0, w: a, h: b, text: `${a * b}`, colour: "a1", size: 13 }); y0 += b; }); x0 += a; });
  const T = tiles(list, { x0: 0, y0: 0, x1: 15, y1: 13, name: "the grid is 15 × 13 = σ(72) = 195" }, true);
  mk("u02-07", "maths-u02-divisor-grid", "geometry", "The 12 divisors of 72 as an area",
    "Every divisor of 72 = 2³ × 3² is a power of 2 times a power of 3: the 4 × 3 = 12 cells of this grid. Widths 1, 2, 4, 8 add to 15 and heights 1, 3, 9 add to 13, so the cells add to 15 × 13 = 195.",
    "A grid of 12 rectangles, widths 1, 2, 4, 8 and heights 1, 3, 9, each labelled with its area, a divisor of 72.",
    ["Widths are the powers of 2 up to 2³: 1, 2, 4, 8, which add to 15.", "Heights are the powers of 3 up to 3²: 1, 3, 9, which add to 13.", "Each cell's area is a divisor of 72, and all 12 divisors appear: d(72) = 4 × 3 = 12.", "The cells add up to the whole rectangle: σ(72) = 15 × 13 = 195."],
    { ...T, view: { x: [-0.8, 15.8], y: [-1, 14] }, height: [330, 330], fromLesson: ["d(72) = (3 + 1)(2 + 1) = 12", "σ(72) = (1 + 2 + 4 + 8)(1 + 3 + 9) = 15 × 13 = 195"] });
}

// ---------- u02-09 Fibonacci numbers: the first ten terms ----------
{
  const F = [1, 1]; while (F.length < 10) F.push(F.at(-1) + F.at(-2));
  const phi = (1 + Math.sqrt(5)) / 2, binet = Math.round(phi ** 10 / Math.sqrt(5)); if (binet !== 55 || F[9] !== 55) throw new Error("fib");
  mk("u02-09", "maths-u02-fibonacci", "sequence", "The first ten Fibonacci numbers",
    `Each term is the sum of the two before it. Binet's formula gives φ¹⁰/√5 ≈ ${fmt(phi ** 10 / Math.sqrt(5), 2)}, which rounds to F₁₀ = 55.`,
    "The sequence 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 with each term the sum of the previous two.",
    ["The first two terms are 1 and 1.", "Each later term is the sum of the two before it: 1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, and so on.", "The tenth term is 21 + 34 = 55, matching Binet's formula."],
    { terms: F, rule: { kind: "fibonacci" }, checks: [{ type: "nth", n: 10, value: 55 }], fromLesson: ["1, 1, 2, 3, 5, 8, 13, 21, 34, 55"] });
}

// ---------- u02-10 Continued fractions: 43/19 = [2; 3, 1, 4] as squares in a 43 × 19 rectangle ----------
{
  const cf = []; let a = 43, b = 19; while (b) { cf.push(Math.floor(a / b)); [a, b] = [b, a % b]; }
  if (cf.join() !== "2,3,1,4") throw new Error("cf");
  const list = [
    { x: 0, y: 0, w: 19, h: 19, text: "19", colour: "a1" }, { x: 19, y: 0, w: 19, h: 19, text: "19", colour: "a1" },
    { x: 38, y: 0, w: 5, h: 5, text: "5", colour: "a2", size: 12 }, { x: 38, y: 5, w: 5, h: 5, text: "5", colour: "a2", size: 12 }, { x: 38, y: 10, w: 5, h: 5, text: "5", colour: "a2", size: 12 },
    { x: 38, y: 15, w: 4, h: 4, text: "4", colour: "a3", size: 12 },
    { x: 42, y: 15, w: 1, h: 1, colour: "a4" }, { x: 42, y: 16, w: 1, h: 1, colour: "a4" }, { x: 42, y: 17, w: 1, h: 1, colour: "a4" }, { x: 42, y: 18, w: 1, h: 1, colour: "a4" },
  ];
  const T = tiles(list, { x0: 0, y0: 0, x1: 43, y1: 19, name: "the squares fill the 43 × 19 rectangle exactly" });
  T.notes.push({ at: [40.5, 21.5], text: "four 1 × 1", colour: "a4", size: 12 });
  mk("u02-10", "maths-u02-cf-squares", "geometry", "43/19 = [2; 3, 1, 4] as squares",
    "Tile a 43 × 19 rectangle with the biggest squares possible: 2 squares of side 19, then 3 of side 5, then 1 of side 4, then 4 of side 1. Those counts, 2, 3, 1, 4, are the continued fraction [2; 3, 1, 4].",
    "A rectangle 43 by 19 tiled by two 19 squares, three 5 squares, one 4 square and four unit squares.",
    ["Take a rectangle 43 wide and 19 tall.", "Two squares of side 19 fit (43 = 2 × 19 + 5), leaving a 5 × 19 strip.", "Three squares of side 5 fit (19 = 3 × 5 + 4), leaving a 5 × 4 piece.", "One square of side 4 fits (5 = 1 × 4 + 1), leaving a 1 × 4 piece.", "Four unit squares finish it (4 = 4 × 1), so 43/19 = [2; 3, 1, 4]."],
    { ...T, view: { x: [-2, 45], y: [-2, 24] }, height: [250, 230], fromLesson: ["43/19 = [2; 3, 1, 4]"] });
}

// ---------- u02-21 Algebraic number theory: 13 = (2 + 3i)(2 − 3i) in the Gaussian integers ----------
{
  const re = 2 * 2 - 3 * -3, im = 2 * -3 + 3 * 2; if (re !== 13 || im !== 0 || 4 + 9 !== 13) throw new Error("gaussian");
  mk("u02-21", "maths-u02-gaussian-13", "geometry", "13 splits as (2 + 3i)(2 − 3i)",
    "2 + 3i and 2 − 3i are mirror images in the real axis, each at distance √13 from the origin. Multiplying them gives 13 = 4 + 9, and the norms agree: 13 × 13 = 169 = N(13).",
    "The points 2 + 3i and 2 − 3i on the complex plane, each at distance √13 from the origin.",
    ["Plot 2 + 3i at (2, 3) and its conjugate 2 − 3i at (2, −3).", "Each lies at distance √(2² + 3²) = √13 from the origin, so its norm is 13.", "(2 + 3i)(2 − 3i) = 4 + 9 = 13, so the prime 13 is no longer prime in the Gaussian integers."],
    { points: { O: [0, 0], A: [2, 3], B: [2, -3] }, hide: ["O"], grid: { step: 1, axes: true, labels: 1 }, view: { x: [-1.5, 4.5], y: [-4.5, 4.5] }, height: [320, 330],
      vectors: [{ from: [0, 0], v: [2, 3], colour: "a1" }, { from: [0, 0], v: [2, -3], colour: "a2" }],
      labelAt: { A: [-30, -2], B: [-30, 4] }, notes: [{ at: [3.6, 3], text: "2 + 3i", colour: "a1", size: 13 }, { at: [3.6, -3], text: "2 − 3i", colour: "a2", size: 13 }, { at: [0.45, 1.75], text: "√13", colour: "a1", size: 12 }],
      checks: [{ type: "distance", a: "O", b: "A", value: "sqrt(13)", name: "|2 + 3i| = √13" }, { type: "distance", a: "O", b: "B", value: "sqrt(13)", name: "|2 − 3i| = √13" }],
      fromLesson: ["13 = (2 + 3i)(2 − 3i)"] });
}

// ---------- u02-23 Elliptic curves: P + Q on y^2 = x^3 - 2x + 1 ----------
{
  const f = (x) => x ** 3 - 2 * x + 1, P = [0, 1], Q = [1, 0];
  const lam = (Q[1] - P[1]) / (Q[0] - P[0]), x3 = lam * lam - P[0] - Q[0], y3 = lam * (P[0] - x3) - P[1];
  if (f(0) !== 1 || f(1) !== 0 || lam !== -1 || x3 !== 0 || y3 !== -1) throw new Error("ec");
  mk("u02-23", "maths-u02-elliptic-add", "graph", "Adding points on y² = x³ − 2x + 1",
    "The line through P = (0, 1) and Q = (1, 0) has slope −1. It meets the curve again at P (it is tangent there), so the third point is P itself; reflecting it in the x-axis gives P + Q = (0, −1).",
    "The elliptic curve y squared equals x cubed minus 2x plus 1, with the line y = 1 − x through (0, 1) and (1, 0), and the point (0, −1) marked as the sum.",
    ["The curve has an oval for −1.6 ≤ x ≤ 0.6 and an open branch from x = 1.", "The chord through P = (0, 1) and Q = (1, 0) is y = 1 − x, with slope λ = −1.", "Substituting gives x²(x − 1) = 0, so the third intersection is at x = 0 again: the line touches the curve at P.", "Reflect that point in the x-axis: P + Q = (0, −1)."],
    { range: { x: [-2, 3], y: [-3, 3] }, ticks: [[-2, -1, 1, 2, 3], [-2, -1, 1, 2]], grid: [1, 1], height: [380, 360], axisLabels: ["x", "y"],
      curves: [{ expr: "sqrt(x^3-2*x+1)", colour: "a1", domain: [-1.618, 0.618] }, { expr: "-sqrt(x^3-2*x+1)", colour: "a1", domain: [-1.618, 0.618] },
        { expr: "sqrt(x^3-2*x+1)", colour: "a1", domain: [1, 2.9] }, { expr: "-sqrt(x^3-2*x+1)", colour: "a1", domain: [1, 2.9] }, { expr: "1-x", colour: "a2", dash: "6 4" }],
      points: [{ x: 0, y: 1, label: "P (0, 1)", colour: "a2", dx: 10, dy: -16 }, { x: 1, y: 0, label: "Q (1, 0)", colour: "a2", dx: -10, dy: 22, anchor: "end" }, { x: 0, y: -1, label: "P + Q (0, −1)", colour: "a4", dx: 10, dy: 16 }],
      checks: [{ type: "point", expr: "sqrt(x^3-2*x+1)", x: 0, y: 1, name: "P = (0, 1) is on the curve: 1² = 0 − 0 + 1" }, { type: "point", expr: "sqrt(x^3-2*x+1)", x: 1, y: 0, name: "Q = (1, 0) is on the curve: 0² = 1 − 2 + 1" },
        { type: "point", expr: "-sqrt(x^3-2*x+1)", x: 0, y: -1, name: "P + Q = (0, −1) is on the curve: (−1)² = 0 − 0 + 1" }, { type: "point", expr: "1-x", x: 0, y: 1, name: "the line y = 1 − x passes through P" }, { type: "point", expr: "1-x", x: 1, y: 0, name: "the line y = 1 − x passes through Q" }],
      fromLesson: ["P + Q = (0, −1)"] });
}

// ---------- u02-24 Arithmetic geometry: slope t = 1/2 on the unit circle gives (3/5, 4/5) ----------
{
  const t = 1 / 2, x = (1 - t * t) / (1 + t * t), y = (2 * t) / (1 + t * t); if (Math.abs(x - 0.6) > 1e-12 || Math.abs(y - 0.8) > 1e-12 || 9 + 16 !== 25) throw new Error("rational circle");
  mk("u02-24", "maths-u02-rational-circle", "geometry", "A rational point on the unit circle",
    "The line of slope 1/2 through (−1, 0) meets the circle again at (3/5, 4/5). Both coordinates are fractions, and clearing denominators gives the Pythagorean triple 3, 4, 5.",
    "The unit circle with a line of slope 1/2 from (−1, 0) through (0, 1/2) to the point (3/5, 4/5), and a right triangle with sides 3/5, 4/5 and 1.",
    ["Start at the point (−1, 0) on the unit circle x² + y² = 1.", "Draw the line of slope t = 1/2; it crosses the y-axis at (0, 1/2).", "It meets the circle again at (3/5, 4/5), found from x = (1 − t²)/(1 + t²) and y = 2t/(1 + t²).", "The right triangle with legs 3/5 and 4/5 and hypotenuse 1 scales to 3, 4, 5."],
    { points: { O: [0, 0], P: [-1, 0], Q: [0.6, 0.8], R: [0.6, 0], Y: [0, 0.5] }, grid: { step: 0.2, axes: true, labels: 1 }, view: { x: [-1.4, 1.5], y: [-1.15, 1.2] }, height: [330, 320],
      circles: [{ centre: "O", r: 1, colour: "ink" }], segments: [{ a: "P", b: "Q", colour: "a2", w: 2.4 }, { a: "O", b: "Q", colour: "a1" }, { a: "R", b: "Q", colour: "a1" }, { a: "O", b: "R", colour: "a1" }],
      angles: [{ at: "R", from: "O", to: "Q", right: true, colour: "ink" }], hide: ["O", "Y"], labelAt: { P: [-6, -16], Q: [14, -10], R: [0, 18] },
      lengths: [{ a: "O", b: "R", value: 0.6, label: "3/5", side: -1 }, { a: "R", b: "Q", value: 0.8, label: "4/5", side: 1 }], notes: [{ at: [0.2, 0.55], text: "1", colour: "a1", size: 13 }],
      checks: [{ type: "onCircle", points: ["P", "Q"], name: "(−1, 0) and (3/5, 4/5) lie on x² + y² = 1" }, { type: "collinear", points: ["P", "Y", "Q"], name: "(−1, 0), (0, 1/2) and (3/5, 4/5) are on the line of slope 1/2" }],
      fromLesson: ["(3/5, 4/5)"] });
}
