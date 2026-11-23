// School 4, Abstract Algebra: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u04.mjs
import { mk } from "./spec.mjs";

const must = (c, m) => { if (!c) throw new Error(m); };
// ℤ₁₂ as a clock: 0 at the top, going round clockwise
const clock = () => { const P = { O: [0, 0] }; for (let k = 0; k < 12; k++) P[String(k)] = [Math.sin((k * Math.PI) / 6), Math.cos((k * Math.PI) / 6)]; return P; };
const names12 = Array.from({ length: 12 }, (_, k) => String(k));

// ---------- u04-03 Group theory: the subgroup ⟨4⟩ of ℤ₁₂ ----------
{
  const order = (a, n) => { let k = 1, x = a % n; while (x) { x = (x + a) % n; k++; } return k; };
  const sub = [0, 1, 2].map((i) => (4 * i) % 12);
  must(order(4, 12) === 3 && sub.join() === "0,4,8", "order of 4 in Z12");
  mk("u04-03", "maths-u04-clock-subgroup", "geometry", "The subgroup ⟨4⟩ on the clock ℤ₁₂",
    "Adding 4 repeatedly moves round the clock 0 → 4 → 8 → 12 ≡ 0: three equally spaced points, so 4 has order 3 and generates the subgroup ⟨4⟩ = {0, 4, 8} of order 3 (a divisor of 12).",
    "A clock face with 12 points marked 0 to 11. The points 0, 4 and 8 are joined into an equilateral triangle.",
    ["The twelve elements of ℤ₁₂ sit round a clock, 0 at the top.", "Adding 4 jumps four places: 0, then 4, then 8, then 12 ≡ 0 again.", "Those three points form an equilateral triangle, so 4 has order 3 and ⟨4⟩ = {0, 4, 8}."],
    { points: clock(), hide: ["O"], circles: [{ centre: "O", r: 1, colour: "line" }], polygons: [{ pts: sub.map(String), colour: "a1", opacity: 0.14 }],
      ticks: [{ seg: ["0", "4"], n: 1 }, { seg: ["4", "8"], n: 1 }, { seg: ["8", "0"], n: 1 }],
      notes: [{ at: [0, -0.05], text: "order 3", colour: "a1" }], view: { x: [-1.45, 1.45], y: [-1.4, 1.4] }, height: [340, 320],
      checks: [{ type: "onCircle", points: names12, name: "the 12 clock points lie on the circle" }, ...[["4", "8"], ["8", "0"]].map(([a, b]) => ({ type: "distance", a: "0", b: "4", value: Math.hypot(...[0, 1].map((i) => clock()[a][i] - clock()[b][i])), name: `the sides 0–4 and ${a}–${b} are equal: the steps are 4 places each` }))],
      fromLesson: ["4, 8, 12 ≡ 0", "the order of 4 is 3"] });
}

// ---------- u04-04 Homomorphisms: n ↦ n mod 5 ----------
{
  const ker = [-10, -5, 0, 5, 10], fibre = [-7, -2, 3, 8], md = (n) => ((n % 5) + 5) % 5;
  must(ker.every((n) => md(n) === 0) && fibre.every((n) => md(n) === 3), "kernel and fibre");
  mk("u04-04", "maths-u04-kernel-fibres", "number-line", "The kernel of n ↦ n mod 5",
    "The homomorphism φ(n) = n mod 5 sends the multiples of 5 (the kernel 5ℤ) to 0. Every other value has its own fibre, a copy of the kernel shifted along: the integers sent to 3 are …, −7, −2, 3, 8, ….",
    "A number line from −10 to 10. The multiples of 5 are marked as the kernel and the integers −7, −2, 3 and 8, which all map to 3, are marked as a second set, each five apart.",
    ["The line shows the integers from −10 to 10.", "The kernel, the integers that φ sends to 0, is the multiples of 5: −10, −5, 0, 5, 10.", "The integers that φ sends to 3 are −7, −2, 3, 8: the kernel shifted by 3.", "Each fibre is a coset of the kernel, so ℤ/5ℤ has five elements and is isomorphic to ℤ₅."],
    { range: [-10, 10], ticks: [], minor: 1, narrowTicks: [],
      points: [...ker.map((n) => ({ value: n, label: `${n}`.replace("-", "−"), colour: "a1" })), ...fibre.map((n) => ({ value: n, label: `${n}`.replace("-", "−"), colour: "a2", below: true }))],
      checks: [...ker.map((n) => ({ type: "value", expr: `${n}/5`, value: `${n / 5}`, name: `${n} is a multiple of 5, so φ(${n}) = 0` })), ...fibre.map((n) => ({ type: "value", expr: `(${n}-3)/5`, value: `${(n - 3) / 5}`, name: `${n} − 3 is a multiple of 5, so φ(${n}) = 3` }))],
      fromLesson: ["ker φ = 5ℤ"] });
}

// ---------- u04-07 Quotient structures: the four cosets of ⟨4⟩ ----------
{
  const cosets = [0, 1, 2, 3].map((c) => [c, c + 4, c + 8].map(String));
  must(cosets.flat().length === 12 && new Set(cosets.flat()).size === 12, "cosets partition Z12");
  mk("u04-07", "maths-u04-cosets-clock", "geometry", "The four cosets of ⟨4⟩ in ℤ₁₂",
    "Adding 1, 2 or 3 to ⟨4⟩ = {0, 4, 8} turns the triangle round the clock. The four triangles use every number exactly once, so there are 12 ÷ 3 = 4 cosets, and 1 + ⟨4⟩ has order 4 in the quotient: ℤ₁₂/⟨4⟩ ≅ ℤ₄.",
    "A clock face with 12 points. Four equilateral triangles, {0, 4, 8}, {1, 5, 9}, {2, 6, 10} and {3, 7, 11}, in four colours, each point in exactly one triangle.",
    ["The subgroup ⟨4⟩ = {0, 4, 8} is a triangle on the clock.", "Adding 1 turns it to {1, 5, 9}, adding 2 to {2, 6, 10} and adding 3 to {3, 7, 11}.", "The four triangles are the cosets: congruent, with no point shared, and together they use all 12 numbers.", "Adding 1 four times (0 → 1 → 2 → 3 → 4) returns to ⟨4⟩, so the quotient has order 4: ℤ₁₂/⟨4⟩ ≅ ℤ₄."],
    { points: clock(), hide: ["O"], circles: [{ centre: "O", r: 1, colour: "line" }], polygons: cosets.map((c, i) => ({ pts: c, colour: ["a1", "a2", "a3", "a4"][i], opacity: 0.06 })),
      view: { x: [-1.45, 1.45], y: [-1.4, 1.4] }, height: [340, 320],
      checks: [{ type: "onCircle", points: names12, name: "the 12 clock points lie on the circle" }, ...cosets.slice(1).map((c, i) => ({ type: "congruent", a: cosets[0], b: c, name: `the coset ${i + 1} + ⟨4⟩ is a copy of ⟨4⟩ turned round the clock` }))],
      fromLesson: ["2 + ⟨4⟩", "12/3 = 4 cosets"] });
}

// ---------- u04-10 Ring theory: the residues mod 12 ----------
{
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const units = [1, 5, 7, 11], zd = [2, 3, 4, 6, 8, 9, 10];
  must(units.join() === [...Array(12).keys()].filter((n) => n && gcd(n, 12) === 1).join(), "units");
  must(zd.join() === [...Array(12).keys()].filter((n) => n && gcd(n, 12) > 1).join(), "zero divisors");
  mk("u04-10", "maths-u04-units-zero-divisors", "bar-model", "Units and zero divisors of ℤ₁₂",
    "Of the 12 residues, 0 is the zero, 4 are units (1, 5, 7, 11, those coprime to 12) and the other 7 (2, 3, 4, 6, 8, 9, 10) are zero divisors, for example 3 × 4 = 0. Every non-zero element is one or the other.",
    "One bar of 12 equal units split into three parts: 1 for the zero, 4 for the units 1, 5, 7 and 11, and 7 for the zero divisors 2, 3, 4, 6, 8, 9 and 10.",
    ["There are 12 residues, 0 to 11.", "The zero element 0 is one part.", "The units, coprime to 12, are 1, 5, 7 and 11: four of them.", "The remaining seven, 2, 3, 4, 6, 8, 9 and 10, share a factor with 12, so each is a zero divisor."],
    { bars: [{ label: "ℤ₁₂", parts: [{ value: 1, text: "0", colour: "soft" }, { value: units.length, text: "4 units", colour: "a1" }, { value: zd.length, text: "7 zero divisors", colour: "a2" }] }],
      braces: [{ bar: 0, from: 0, to: 2, value: 12, text: "12 residues" }], checks: [{ type: "ratio", bar: 0, ratio: [1, 4, 7], total: 12, name: "1 zero + 4 units + 7 zero divisors = 12 residues" }],
      fromLesson: ["1, 5, 7, 11", "2, 3, 4, 6, 8, 9, 10"] });
}

// ---------- u04-18 Representation theory: ℤ₄ acting by rotations ----------
{
  const R = [[0, -1], [1, 0]], mul = (A, B) => A.map((r, i) => B[0].map((_, j) => r[0] * B[0][j] + r[1] * B[1][j]));
  const pw = [R, mul(R, R), mul(R, mul(R, R))];
  must(JSON.stringify(pw[1]) === "[[-1,0],[0,-1]]" && JSON.stringify(mul(R, pw[2])) === "[[1,0],[0,1]]", "R^2 = -I, R^4 = I");
  const o = [[1, 0.5], [3, 0.5], [1, 1.5]], app = (M) => o.map(([x, y]) => [M[0][0] * x + M[0][1] * y + 0, M[1][0] * x + M[1][1] * y + 0].map((v) => (v === 0 ? 0 : v)));
  mk("u04-18", "maths-u04-rotation-rep", "transform", "ℤ₄ as four rotations",
    "Sending k ∈ ℤ₄ to Rᵏ, the quarter turn R = [[0, −1], [1, 0]] applied k times, turns the shape through 0°, 90°, 180° and 270°. A fourth quarter turn returns it to the start, since R⁴ = I, which is why the exponent can be added mod 4.",
    "A small triangle in the first quadrant and its images under R, R² and R³: the same triangle turned through 90°, 180° and 270° about the origin.",
    ["Start with a triangle I in the first quadrant: the image of k = 0.", "R turns it a quarter turn anticlockwise into the second quadrant.", "R² = −I turns it through 180° into the third quadrant, and R³ through 270° into the fourth.", "Another quarter turn is R⁴ = I: back to the start, matching 4 ≡ 0 in ℤ₄."],
    { view: { x: [-4, 4], y: [-4, 4] }, grid: { step: 1, axes: true, labels: 1 }, object: { name: "I", pts: o, colour: "a1" },
      images: [{ name: "R", t: { kind: "matrix", m: pw[0] }, pts: app(pw[0]), colour: "a2" }, { name: "R²", t: { kind: "matrix", m: pw[1] }, pts: app(pw[1]), colour: "a3" }, { name: "R³", t: { kind: "matrix", m: pw[2] }, pts: app(pw[2]), colour: "a4" }],
      height: [340, 320], checks: [0, 1, 2].map((i) => ({ type: "areaScale", image: ["R", "R²", "R³"][i], value: 1 })), fromLesson: ["R^{2} = −I", "R^{4} = I"] });
}

// ---------- u04-19 Group representations: dimensions of D₄ ----------
{
  const dims = [1, 1, 1, 1, 2];
  must(dims.reduce((s, d) => s + d * d, 0) === 8 && dims.length === 5, "D4 dimension count");
  mk("u04-19", "maths-u04-d4-dimensions", "bar-model", "Squares of dimensions add to |D₄| = 8",
    "D₄ has five conjugacy classes, so five irreducible representations, and the squares of their dimensions must add to the order 8. The only way is 1² + 1² + 1² + 1² + 2² = 1 + 1 + 1 + 1 + 4 = 8: four 1-dimensional and one 2-dimensional.",
    "One bar of 8 units split into five parts: four parts of 1 labelled 1² and one part of 4 labelled 2².",
    ["Five classes give five irreducible representations.", "Each contributes the square of its dimension to the total 8.", "Four of dimension 1 give four parts of 1; one of dimension 2 gives a part of 4.", "1 + 1 + 1 + 1 + 4 = 8, the order of the group."],
    { bars: [{ label: "|D₄|", parts: [...dims.slice(0, 4).map(() => ({ value: 1, text: "1²", colour: "a1" })), { value: 4, text: "2² = 4", colour: "a2" }] }],
      braces: [{ bar: 0, from: 0, to: 4, value: 8, text: "1 + 1 + 1 + 1 + 4 = 8" }], checks: [{ type: "ratio", bar: 0, ratio: [1, 1, 1, 1, 4], total: 8, name: "the squares of the dimensions 1, 1, 1, 1, 2 are 1, 1, 1, 1, 4, adding to 8" }],
      fromLesson: ["1 + 1 + 1 + 1 + 4 = 8"] });
}

// ---------- u04-20 Ring representations: ℂ[S₃] ----------
{
  const dims = [1, 1, 2];
  must(dims.reduce((s, d) => s + d * d, 0) === 6, "S3 dimension count");
  mk("u04-20", "maths-u04-s3-algebra", "bar-model", "ℂ[S₃] ≅ ℂ × ℂ × M₂(ℂ) has dimension 6",
    "Each factor of the Artin–Wedderburn decomposition contributes the square of an irreducible's dimension: ℂ gives 1, ℂ gives 1 and M₂(ℂ) gives 4. They add to 6 = |S₃|, the dimension of the group algebra.",
    "One bar of 6 units split into three parts: 1 for ℂ, 1 for ℂ and 4 for M₂(ℂ).",
    ["S₃ has irreducible representations of dimensions 1, 1 and 2.", "A d-dimensional irreducible gives a block M_d(ℂ) of dimension d².", "The blocks have dimensions 1, 1 and 4.", "Together 1 + 1 + 4 = 6 = |S₃|, the dimension of ℂ[S₃]."],
    { bars: [{ label: "ℂ[S₃]", parts: [{ value: 1, text: "ℂ", colour: "a1" }, { value: 1, text: "ℂ", colour: "a1" }, { value: 4, text: "M₂(ℂ)", colour: "a2" }] }],
      braces: [{ bar: 0, from: 0, to: 2, value: 6, text: "1 + 1 + 4 = 6" }], checks: [{ type: "ratio", bar: 0, ratio: [1, 1, 4], total: 6, name: "block dimensions 1², 1², 2² = 1, 1, 4 add to 6 = |S₃|" }],
      fromLesson: ["1 + 1 + 4 = 6"] });
}
