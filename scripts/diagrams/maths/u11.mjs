// School 11, Linear Algebra: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u11.mjs
import { mk } from "./spec.mjs";
import { fmt } from "../../../kit/diagrams/maths-core.js";

const mul = (A, v) => [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]];
const mm = (A, B) => [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]], [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]];
const det = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const sq = [[0, 0], [1, 0], [1, 1], [0, 1]];
const O = { O: [0, 0] }, H = ["O"];

// ---------- u11-05 Linear combinations: (5, 5) = 2(1, 2) + 1(3, 1) ----------
{
  const a = 2, b = 1, p = [1, 2], q = [3, 1], v = [a * p[0] + b * q[0], a * p[1] + b * q[1]];
  if (v[0] !== 5 || v[1] !== 5) throw new Error("u11-05");
  mk("u11-05", "maths-u11-linear-combination", "geometry", "(5, 5) as 2(1, 2) + (3, 1)",
    "Walk twice along (1, 2), then once along (3, 1): you arrive at (5, 5). The coefficients 2 and 1 are how many steps of each vector.",
    "A grid with a vector from the origin to (2, 4), a vector from (2, 4) to (5, 5), and their sum from the origin to (5, 5).",
    ["Two steps of (1, 2) from the origin reach (2, 4).", "From there one step of (3, 1) reaches (5, 5).", "The sum 2(1, 2) + (3, 1) = (5, 5) is the vector from the origin straight to (5, 5)."],
    { points: O, hide: H, grid: { step: 1, axes: true, labels: 1 }, view: { x: [-1, 6.5], y: [-1, 6] }, height: [520, 440],
      vectors: [{ name: "2(1, 2)", from: [0, 0], v: [a * p[0], a * p[1]], colour: "a1", labelSide: 1 }, { name: "(3, 1)", from: [a * p[0], a * p[1]], v: q, colour: "a2", labelSide: 1 }, { name: "(5, 5)", from: [0, 0], v, colour: "a4", labelSide: -1 }],
      checks: [{ type: "components", vector: 2, v: [5, 5] }, { type: "vecsum", vectors: [0, 1], is: 2 }],
      fromLesson: ["(5, 5) = 2(1, 2) + (3, 1)"] });
}

// ---------- u11-10 Matrix algebra: AB and BA ----------
{
  const A = [[1, 1], [0, 1]], B = [[1, 0], [1, 1]], AB = mm(A, B), BA = mm(B, A);
  if (JSON.stringify(AB) !== "[[2,1],[1,1]]" || JSON.stringify(BA) !== "[[1,1],[1,2]]") throw new Error("u11-10");
  const im = (name, M, colour, labelAt) => ({ name, t: { kind: "matrix", m: M }, pts: sq.map((p) => mul(M, p)), colour, labelAt });
  mk("u11-10", "maths-u11-ab-ne-ba", "transform", "AB and BA move the square differently",
    "Apply the matrices to the unit square. AB = [[2, 1], [1, 1]] sends it to one parallelogram and BA = [[1, 1], [1, 2]] to another, so AB ≠ BA. Both have determinant 1, so both keep the area.",
    "The unit square and its two images: AB gives a parallelogram with vertices (0, 0), (2, 1), (3, 2), (1, 1); BA gives (0, 0), (1, 1), (2, 3), (1, 2).",
    ["The unit square is the starting shape.", "AB = [[2, 1], [1, 1]] sends the corners to (0, 0), (2, 1), (3, 2), (1, 1).", "BA = [[1, 1], [1, 2]] sends them to (0, 0), (1, 1), (2, 3), (1, 2).", "The two parallelograms are different, so AB ≠ BA, but each has area 1 because det = 1."],
    { view: { x: [-1, 4], y: [-1, 4] }, grid: { step: 1, axes: true, labels: 1 }, height: [380, 360],
      object: { name: "square", pts: sq, colour: "a1", labelAt: [-6, 14] },
      images: [im("AB", AB, "a2", [26, 0]), im("BA", BA, "a4", [-8, -16])],
      checks: [{ type: "areaScale", image: "AB", value: det(AB) }, { type: "areaScale", image: "BA", value: det(BA) }],
      fromLesson: ["AB = [[2, 1], [1, 1]]", "BA = [[1, 1], [1, 2]]"] });
}

// ---------- u11-17 Column space: a line, with b = (3, 6) on it and (1, 0) off it ----------
mk("u11-17", "maths-u11-column-space-line", "geometry", "The column space is the line y = 2x",
  "Both columns of [[1, 2], [2, 4]] lie along (1, 2), so col(A) is a line. (3, 6) = 3(1, 2) is on it, so Ax = (3, 6) is solvable; (1, 0) is off it, so Ax = (1, 0) has no solution.",
  "A line through the origin with direction (1, 2). Vectors (1, 2), (2, 4) and (3, 6) lie along it; the vector (1, 0) does not.",
  ["The columns (1, 2) and (2, 4) point the same way, so they span only a line.", "b = (3, 6) = 3(1, 2) lies on that line.", "b = (1, 0) is not a multiple of (1, 2): it is off the line, so no x solves Ax = b."],
  { points: { O: [0, 0], P: [-1.5, -3], Q: [3.4, 6.8] }, hide: ["O", "P", "Q"], segments: [{ a: "P", b: "Q", colour: "a3", dash: "6 5", w: 1.8 }], grid: { step: 1, axes: true, labels: 1 }, view: { x: [-2, 5], y: [-3.5, 7.5] }, height: [520, 440],
    vectors: [{ name: "(1, 2)", v: [1, 2], colour: "a1", labelSide: -1, dx: 16, dy: -6 }, { name: "(3, 6)", v: [3, 6], colour: "a2", labelSide: -1 }, { name: "(1, 0)", v: [1, 0], colour: "a4", labelSide: 1, dx: 22, dy: 8 }],
    notes: [{ at: [-1.8, -2.4], text: "col(A)", colour: "a3" }],
    checks: [{ type: "multiple", vector: 1, of: 0, k: 3 }, { type: "collinear", points: ["O", "P", "Q"], name: "the line through (1, 2) is the column space" }],
    fromLesson: ["(3, 6) = 3(1, 2)", "col(A) = span{(1, 2)}"] });

// ---------- u11-21 Linear transformations: rotation by 90 degrees ----------
{
  const M = [[0, -1], [1, 0]];
  if (JSON.stringify(mul(M, [1, 0])) !== "[0,1]" || JSON.stringify(mul(M, [0, 1])) !== "[-1,0]") throw new Error("u11-21");
  mk("u11-21", "maths-u11-rotation-matrix", "transform", "The matrix of a 90° rotation",
    "The columns of the matrix are where e₁ and e₂ land: (1, 0) goes to (0, 1) and (0, 1) goes to (−1, 0), giving [[0, −1], [1, 0]]. The unit square turns a quarter turn about the origin and keeps its area.",
    "The unit square in the first quadrant and its image in the second quadrant after an anticlockwise quarter turn about the origin.",
    ["The unit square has corners (0, 0), (1, 0), (1, 1), (0, 1).", "e₁ = (1, 0) goes to (0, 1) and e₂ = (0, 1) goes to (−1, 0): these are the matrix columns.", "The image has corners (0, 0), (0, 1), (−1, 1), (−1, 0): the square turned 90° anticlockwise."],
    { view: { x: [-2.5, 2.5], y: [-1, 2.5] }, grid: { step: 1, axes: true, labels: 1 }, height: [330, 320],
      object: { name: "square", pts: sq, colour: "a1" }, images: [{ name: "image", t: { kind: "matrix", m: M }, pts: sq.map((p) => mul(M, p)), colour: "a2" }],
      checks: [{ type: "areaScale", image: "image", value: 1 }], fromLesson: ["Matrix [[0, −1], [1, 0]]"] });
}

// ---------- u11-22 Change of basis: v = (4, 3) = 1 b1 + 2 b2 ----------
{
  const b1 = [2, 1], b2 = [1, 1], c = [1, 2], v = [c[0] * b1[0] + c[1] * b2[0], c[0] * b1[1] + c[1] * b2[1]];
  if (v[0] !== 4 || v[1] !== 3) throw new Error("u11-22");
  mk("u11-22", "maths-u11-change-of-basis", "geometry", "v = (4, 3) in the basis b₁, b₂",
    "In the new basis b₁ = (2, 1), b₂ = (1, 1) the vector v = (4, 3) has coordinates (1, 2): one step of b₁ then two steps of b₂ reach the same point.",
    "A grid with b₁ = (2, 1) from the origin, then two copies of b₂ = (1, 1) tip to tail to reach (4, 3), and v drawn straight from the origin to (4, 3).",
    ["b₁ = (2, 1) takes you from the origin to (2, 1).", "Two steps of b₂ = (1, 1) go from (2, 1) to (4, 3).", "So v = 1·b₁ + 2·b₂, coordinates (1, 2) in the new basis, and (4, 3) in the standard basis."],
    { points: O, hide: H, grid: { step: 1, axes: true, labels: 1 }, view: { x: [-1, 5.5], y: [-1, 4.5] }, height: [520, 440],
      vectors: [{ name: "b₁", v: b1, colour: "a1", labelSide: -1 }, { name: "2b₂", from: b1, v: [2 * b2[0], 2 * b2[1]], colour: "a2", labelSide: -1 }, { name: "v = (4, 3)", v, colour: "a4", labelSide: 1 }],
      checks: [{ type: "components", vector: 2, v: [4, 3] }, { type: "vecsum", vectors: [0, 1], is: 2 }],
      fromLesson: ["1 × (2, 1) + 2 × (1, 1) = (4, 3)"] });
}

// ---------- u11-25 Eigenvectors: A(1, 1) = 5(1, 1), A(1, -2) = 2(1, -2) ----------
{
  const A = [[4, 1], [2, 3]], e1 = [1, 1], e2 = [1, -2], a1 = mul(A, e1), a2 = mul(A, e2);
  if (a1[0] !== 5 * e1[0] || a1[1] !== 5 * e1[1] || a2[0] !== 2 * e2[0] || a2[1] !== 2 * e2[1]) throw new Error("u11-25");
  mk("u11-25", "maths-u11-eigenvectors", "geometry", "Eigenvectors stay on their own line",
    "A = [[4, 1], [2, 3]] sends (1, 1) to (5, 5) = 5(1, 1) and (1, −2) to (2, −4) = 2(1, −2): each eigenvector is only stretched, by its eigenvalue, and keeps its direction.",
    "The vector (1, 1) and its image (5, 5) along the same direction; the vector (1, −2) and its image (2, −4) along the same direction.",
    ["v = (1, 1) is mapped to Av = (5, 5), five times as long and pointing the same way (λ = 5).", "w = (1, −2) is mapped to Aw = (2, −4), twice as long and pointing the same way (λ = 2).", "Other vectors would be turned off their line; eigenvectors are the exceptions."],
    { points: O, hide: H, grid: { step: 1, axes: true, labels: 1 }, view: { x: [-1.5, 6], y: [-5, 6] }, height: [520, 440],
      vectors: [{ name: "Av = 5v", v: a1, colour: "a2", labelSide: -1, dx: -26 }, { name: "v", v: e1, colour: "a1", labelSide: -1, dx: -4 }, { name: "Aw = 2w", v: a2, colour: "a4", labelSide: -1, dx: 14 }, { name: "w", v: e2, colour: "a3", labelSide: 1, dx: 4 }],
      checks: [{ type: "multiple", vector: 0, of: 1, k: 5 }, { type: "multiple", vector: 2, of: 3, k: 2 }, { type: "components", vector: 0, v: a1, name: "A(1, 1) = (5, 5) recomputed from the matrix" }],
      fromLesson: ["A(1, 1) = (5, 5)", "A(1, −2) = (2, −4)"] });
}

// ---------- u11-30 Symmetric matrices: orthogonal eigenvectors ----------
{
  const A = [[2, 1], [1, 2]], v3 = [1, 1], v1 = [1, -1], r3 = mul(A, v3), r1 = mul(A, v1);
  if (r3[0] !== 3 || r3[1] !== 3 || r1[0] !== 1 || r1[1] !== -1) throw new Error("u11-30");
  mk("u11-30", "maths-u11-symmetric-orthogonal", "geometry", "Eigenvectors of a symmetric matrix are perpendicular",
    "A = [[2, 1], [1, 2]] has eigenvalue 3 along (1, 1) and eigenvalue 1 along (1, −1). The two eigen-directions meet at a right angle, which is why A = QΛQᵀ with Q orthogonal.",
    "The vector (1, 1) stretched to (3, 3) and the vector (1, −1) unchanged, meeting at a right angle at the origin.",
    ["A(1, 1) = (3, 3): the direction (1, 1) is stretched by λ = 3.", "A(1, −1) = (1, −1): the direction (1, −1) is unchanged, λ = 1.", "The two directions are perpendicular, so normalising them gives the orthogonal matrix Q."],
    { points: { O: [0, 0], P: [1, 1], R: [1, -1] }, hide: ["O", "P", "R"], grid: { step: 1, axes: true, labels: 1 }, view: { x: [-1.5, 4], y: [-2.5, 4] }, height: [520, 440],
      angles: [{ at: "O", from: "P", to: "R", right: true, colour: "ink" }],
      vectors: [{ name: "λ = 3", v: r3, colour: "a2", labelSide: 1 }, { name: "(1, 1)", v: v3, colour: "a1", labelSide: -1, dx: -4 }, { name: "λ = 1", v: v1, colour: "a4", labelSide: 1, dx: 8 }],
      checks: [{ type: "perpendicular", a: ["O", "P"], b: ["O", "R"], name: "the eigenvectors (1, 1) and (1, −1) are perpendicular" }, { type: "multiple", vector: 0, of: 1, k: 3 }, { type: "multiple", vector: 2, of: 2, k: 1 }],
      fromLesson: ["λ = 1 and λ = 3"] });
}

// ---------- u11-33 Inner product: <x, x^2> = 1/4, |x|^2 = 1/3 ----------
mk("u11-33", "maths-u11-inner-product-areas", "graph", "Inner products as areas",
  "With ⟨f, g⟩ = ∫₀¹ f g dx, the inner product is an area: ⟨x, x²⟩ is the area under x³, which is ¼, and ‖x‖² = ⟨x, x⟩ is the area under x², which is ⅓, so ‖x‖ = 1/√3 ≈ 0.577.",
  "Graphs of y = x³ and y = x² between 0 and 1, with the area under x³ shaded (¼) and the larger area under x² (⅓).",
  ["The curve y = x² is the product x · x; the area under it from 0 to 1 is ⅓, so ‖x‖² = ⅓.", "The curve y = x³ is the product x · x²; the area under it is ¼, so ⟨x, x²⟩ = ¼.", "‖x‖ = √(⅓) = 1/√3 ≈ 0.577."],
  { range: { x: [-0.1, 1.2], y: [-0.1, 1.2] }, ticks: [[0.5, 1], [0.5, 1]], grid: [0.25, 0.25], height: [360, 340], axisLabels: ["x", "y"],
    curves: [{ expr: "x^2", colour: "a1" }, { expr: "x^3", colour: "a2" }], areas: [{ expr: "x^3", from: 0, to: 1, colour: "a2", opacity: 0.3 }],
    legend: [["y = x² (area ⅓)", "a1"], ["y = x³ (area ¼)", "a2"]], legendData: [0.05, 1.15],
    checks: [{ type: "area", expr: "x^3", from: 0, to: 1, value: 0.25, tol: 1e-4, name: "⟨x, x²⟩ = ∫₀¹ x³ dx = ¼" }, { type: "area", expr: "x^2", from: 0, to: 1, value: 1 / 3, tol: 1e-4, name: "‖x‖² = ∫₀¹ x² dx = ⅓" }],
    fromLesson: ["‖x‖ = 1/√3"] });

// ---------- u11-35 Orthogonality: v = (3, 1) in the basis q1, q2 ----------
{
  const s = Math.SQRT2, q1 = [1 / s, 1 / s], q2 = [1 / s, -1 / s], v = [3, 1], c1 = (v[0] + v[1]) / s, c2 = (v[0] - v[1]) / s;
  if (Math.abs(c1 - 2 * s) > 1e-12 || Math.abs(c2 - s) > 1e-12 || Math.abs(c1 * c1 + c2 * c2 - 10) > 1e-9) throw new Error("u11-35");
  const p1 = [c1 * q1[0], c1 * q1[1]], p2 = [c2 * q2[0], c2 * q2[1]];
  mk("u11-35", "maths-u11-orthonormal-coordinates", "geometry", "Coordinates in an orthonormal basis",
    "The coordinates of v = (3, 1) along q₁ and q₂ are just dot products: c₁ = 2√2 and c₂ = √2. The two pieces (2, 2) and (1, −1) are perpendicular, and c₁² + c₂² = 8 + 2 = 10 = ‖v‖².",
    "The vector (3, 1) drawn as the sum of (2, 2) along q₁ and (1, −1) along q₂, tip to tail, at a right angle.",
    ["q₁ = (1, 1)/√2 and q₂ = (1, −1)/√2 are perpendicular unit vectors.", "c₁ = v · q₁ = 2√2 gives the piece (2, 2) along q₁.", "c₂ = v · q₂ = √2 gives the piece (1, −1) along q₂.", "The pieces add to (3, 1), and 8 + 2 = 10 = ‖v‖²."],
    { points: { O: [0, 0], A: [2, 2], B: [1, -1] }, hide: ["O", "A", "B"], grid: { step: 1, axes: true, labels: 1 }, view: { x: [-1, 4], y: [-2, 3.2] }, height: [520, 440],
      angles: [{ at: "O", from: "A", to: "B", right: true, colour: "ink" }],
      vectors: [{ name: "c₁q₁", v: p1.map((x) => +x.toFixed(10)), colour: "a1", labelSide: -1 }, { name: "c₂q₂", v: p2.map((x) => +x.toFixed(10)), from: p1.map((x) => +x.toFixed(10)), colour: "a2", labelSide: -1 }, { name: "v", v, colour: "a4", labelSide: 1 }],
      checks: [{ type: "perpendicular", a: ["O", "A"], b: ["O", "B"] }, { type: "vecsum", vectors: [0, 1], is: 2 }, { type: "magnitude", vector: 2, value: "sqrt(10)" }],
      fromLesson: ["2√2"] });
}

// ---------- u11-40 QR: a2 = 4 q1 + (-2.4, 1.8) ----------
{
  const a1 = [3, 4], a2 = [0, 5], q1 = [0.6, 0.8], r12 = q1[0] * a2[0] + q1[1] * a2[1], pr = [r12 * q1[0], r12 * q1[1]], res = [a2[0] - pr[0], a2[1] - pr[1]], r22 = Math.hypot(...res), q2 = res.map((x) => x / r22);
  if (r12 !== 4 || Math.abs(r22 - 3) > 1e-12 || Math.abs(q2[0] + 0.8) > 1e-12) throw new Error("u11-40");
  const r = (x) => +x.toFixed(10);
  mk("u11-40", "maths-u11-qr-gram-schmidt", "geometry", "QR: a₂ = 4q₁ + 3q₂",
    "Gram–Schmidt on the columns of A: q₁ = a₁/5 = (0.6, 0.8). The part of a₂ along q₁ is r₁₂q₁ = 4q₁ = (2.4, 3.2); what is left, (−2.4, 1.8), is perpendicular to q₁ and has length 3 = r₂₂.",
    "The vector a₂ = (0, 5) split into (2.4, 3.2) along q₁ and the perpendicular remainder (−2.4, 1.8) of length 3.",
    ["a₁ = (3, 4) has length 5, so q₁ = (0.6, 0.8) and r₁₁ = 5.", "r₁₂ = q₁ · a₂ = 4, so the part of a₂ along q₁ is 4q₁ = (2.4, 3.2).", "a₂ − 4q₁ = (−2.4, 1.8) is perpendicular to q₁ and has length 3 = r₂₂, so q₂ = (−0.8, 0.6)."],
    { points: { O: [0, 0], P: [pr[0], pr[1]], T: [0, 5] }, hide: ["O", "P", "T"], grid: { step: 1, axes: true, labels: 1 }, view: { x: [-3.5, 4.5], y: [-1, 6] }, height: [520, 440],
      angles: [{ at: "P", from: "O", to: "T", right: true, colour: "ink" }],
      vectors: [{ name: "a₁", v: a1, colour: "a3", labelSide: 1 }, { name: "4q₁", v: pr.map(r), colour: "a1", labelSide: -1 }, { name: "(−2.4, 1.8)", from: pr.map(r), v: res.map(r), colour: "a2", labelSide: 1, dx: 22, dy: 6 }, { name: "a₂", v: a2, colour: "a4", labelSide: -1 }],
      checks: [{ type: "distance", a: "P", b: "T", value: 3, name: "the remainder has length r₂₂ = 3" }, { type: "vecsum", vectors: [1, 2], is: 3 }, { type: "perpendicular", a: ["O", "P"], b: ["P", "T"], name: "the remainder is perpendicular to q₁" }, { type: "magnitude", vector: 0, value: 5 }],
      fromLesson: ["r₁₁ = ‖a₁‖ = 5"] });
}

// ---------- u11-42 SVD: the unit square under A has area det = sigma1 sigma2 = 15 ----------
{
  const A = [[3, 0], [4, 5]], d = det(A), s1 = Math.sqrt(45), s2 = Math.sqrt(5);
  if (Math.abs(s1 * s2 - Math.abs(d)) > 1e-9 || d !== 15) throw new Error("u11-42");
  mk("u11-42", "maths-u11-svd-area", "transform", "Singular values and area: σ₁σ₂ = |det A| = 15",
    `A = [[3, 0], [4, 5]] turns the unit square into a parallelogram of area 15. The singular values σ₁ = √45 ≈ ${fmt(s1, 3)} and σ₂ = √5 ≈ ${fmt(s2, 3)} are the stretches along its two perpendicular axes, and their product is the area scale factor.`,
    "The unit square and its image under A, a parallelogram with vertices (0, 0), (3, 4), (3, 9), (0, 5) and area 15.",
    ["The unit square has area 1.", "A sends (1, 0) to (3, 4) and (0, 1) to (0, 5), so the image has corners (0, 0), (3, 4), (3, 9), (0, 5).", "Its area is |det A| = 15, and σ₁σ₂ = √45 × √5 = √225 = 15."],
    { view: { x: [-1, 5], y: [-1, 10] }, grid: { step: 1, axes: true, labels: 2 }, height: [420, 400],
      object: { name: "square", pts: sq, colour: "a1", labelAt: [0, -4] }, images: [{ name: "A × square", t: { kind: "matrix", m: A }, pts: sq.map((p) => mul(A, p)), colour: "a2" }],
      checks: [{ type: "areaScale", image: "A × square", value: 15, name: "the image has 15 times the area: σ₁σ₂ = √45 × √5 = 15 = |det A|" }],
      fromLesson: ["σ₁σ₂ = √225 = 15 = |det A|"] });
}

// ---------- u11-43 PCA: principal axes of the covariance [[5, 2], [2, 2]] ----------
{
  const C = [[5, 2], [2, 2]], l1 = 6, l2 = 1, u1 = [2, 1], u2 = [-1, 2], c1 = mul(C, u1), c2 = mul(C, u2);
  if (c1[0] !== l1 * u1[0] || c1[1] !== l1 * u1[1] || c2[0] !== l2 * u2[0] || c2[1] !== l2 * u2[1]) throw new Error("u11-43");
  mk("u11-43", "maths-u11-pca-axes", "geometry", "Principal axes of the covariance matrix",
    "The covariance matrix [[5, 2], [2, 2]] has eigenvalue 6 along (2, 1) and eigenvalue 1 along (−1, 2). The axes are perpendicular, PC1 carries 6 of the total variance 7 (6/7 ≈ 85.7%), and PC2 carries 1.",
    "Two perpendicular directions from the origin: PC1 along (2, 1), drawn with length 3 times that of PC2 along (−1, 2), and a right angle between them.",
    ["C(2, 1) = (12, 6) = 6(2, 1): PC1 is the direction (2, 1) with variance 6.", "C(−1, 2) = (−1, 2) = 1(−1, 2): PC2 is the perpendicular direction with variance 1.", "Variance explained by PC1 is 6/(6 + 1) = 6/7 ≈ 85.7%."],
    { points: { O: [0, 0], P: [2, 1], R: [-1, 2] }, hide: ["O", "P", "R"], grid: { step: 1, axes: true, labels: 1 }, view: { x: [-2.5, 3.5], y: [-1, 3] }, height: [520, 440],
      angles: [{ at: "O", from: "P", to: "R", right: true, colour: "ink" }],
      vectors: [{ name: "PC1", v: u1, colour: "a1", labelSide: -1 }, { name: "PC2", v: u2, colour: "a2", labelSide: -1 }],
      checks: [{ type: "perpendicular", a: ["O", "P"], b: ["O", "R"], name: "PC1 and PC2 are perpendicular" }, { type: "components", vector: 0, v: [2, 1], name: "C(2, 1) = 6(2, 1) checked in the batch: variance 6/7 = 85.7%" }],
      fromLesson: ["6/7 ≈ 85.7%"] });
}

// ---------- u11-50 Exterior algebra: the wedge is the signed area ----------
{
  const a = [2, 3], b = [1, 4], w = a[0] * b[1] - a[1] * b[0];
  if (w !== 5) throw new Error("u11-50");
  mk("u11-50", "maths-u11-wedge-area", "geometry", "The wedge product is an area",
    "(2e₁ + 3e₂) ∧ (e₁ + 4e₂) = (8 − 3) e₁ ∧ e₂ = 5 e₁ ∧ e₂: the coefficient 5 is the area of the parallelogram the two vectors span, which is also det [[2, 1], [3, 4]].",
    "A parallelogram with sides (2, 3) and (1, 4) from the origin, vertices (0, 0), (2, 3), (3, 7), (1, 4), and area 5.",
    ["The vectors a = (2, 3) and b = (1, 4) are two sides from the origin.", "Completing the parallelogram gives the fourth vertex (3, 7).", "Its area is 2 × 4 − 3 × 1 = 5, the coefficient of e₁ ∧ e₂."],
    { points: { O: [0, 0], A: a, S: [3, 7], B: b }, hide: ["O", "A", "S", "B"], polygons: [{ pts: ["O", "A", "S", "B"], colour: "a1", opacity: 0.15 }], grid: { step: 1, axes: true, labels: 1 }, view: { x: [-1, 4.5], y: [-1, 8] }, height: [520, 440],
      vectors: [{ name: "a", v: a, colour: "a1", labelSide: 1 }, { name: "b", v: b, colour: "a2", labelSide: -1 }],
      notes: [{ at: [1.0, 3.6], text: "area 5", colour: "a1" }],
      checks: [{ type: "area", polygon: ["O", "A", "S", "B"], value: 5, note: 0 }],
      fromLesson: ["5e₁ ∧ e₂"] });
}
