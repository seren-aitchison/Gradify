// School 5, Geometry: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u05.mjs
import { mk } from "./spec.mjs";

const D2R = Math.PI / 180, deg = (r) => r / D2R, at = (r, a, c = [0, 0]) => [c[0] + r * Math.cos(a * D2R), c[1] + r * Math.sin(a * D2R)];
const angleDeg = (A, B, C) => { const u = [A[0] - B[0], A[1] - B[1]], v = [C[0] - B[0], C[1] - B[1]]; return deg(Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v)))); };
const r1 = (x) => Math.round(x * 10) / 10;
const must = (c, m) => { if (!c) throw new Error(m); };
const ls = (a) => `${a}`.replace(/-/g, "−");

// ---------- u05-01 Euclidean geometry: the angles of a triangle on a line parallel to BC ----------
{
  const B = [0, 0], C = [7, 0], A = [2.5, 3], L = [-1.5, 3], R = [8.5, 3];
  const b = angleDeg(A, B, C), c = angleDeg(A, C, B), a = angleDeg(B, A, C); must(Math.abs(a + b + c - 180) < 1e-9, "sum");
  mk("u05-01", "maths-u05-triangle-angle-sum", "geometry", "Why a triangle's angles make 180°",
    "The line through A parallel to BC makes alternate angles equal to B and C. Those two angles and the angle at A fill a straight line, so A + B + C = 180°.",
    "A triangle ABC with a line through A parallel to BC; the angles on the line either side of A equal B and C, and the three angles at A make a straight line.",
    ["Draw triangle ABC.", "Draw a line through A parallel to BC.", "The angle between the line and AB, on the left, equals angle B (alternate angles); the angle between AC and the line, on the right, equals angle C.", "The three angles at A lie along a straight line, so together they are 180°: A + B + C = 180°."],
    { points: { A, B, C, L, R }, hide: ["L", "R"], segments: [["A", "B"], ["B", "C"], ["C", "A"], { a: "L", b: "R", colour: "a2", dash: "6 4" }], parallels: [{ seg: ["L", "R"], n: 1 }, { seg: ["B", "C"], n: 1 }],
      angles: [{ at: "A", from: "L", to: "B", deg: r1(b), label: "B", colour: "a1", r: 30 }, { at: "A", from: "B", to: "C", deg: r1(a), label: "A", colour: "a3", r: 30 }, { at: "A", from: "C", to: "R", deg: r1(c), label: "C", colour: "a4", r: 30 },
        { at: "B", from: "A", to: "C", deg: r1(b), label: "B", colour: "a1", r: 28 }, { at: "C", from: "B", to: "A", deg: r1(c), label: "C", colour: "a4", r: 28 }],
      labelAt: { A: [0, -16], B: [-12, 12], C: [12, 12] }, view: { x: [-2, 9], y: [-1.2, 4.2] }, height: [300, 280],
      checks: [{ type: "parallel", a: ["L", "R"], b: ["B", "C"], name: "the line through A is parallel to BC" }, { type: "angleSum", angles: [0, 1, 2], total: 180, name: "the three angles along the line add up to 180°" }, { type: "angleSum", angles: [1, 3, 4], total: 180, name: "the angles of the triangle add up to 180°" }],
      fromLesson: ["A + B + C = 180°"] });
}

// ---------- u05-02 Plane geometry: the kite with A = 110°, C = 70° ----------
{
  const AC = 10, AB = AC * Math.cos(55 * D2R), A = [0, 0], C = [AC, 0], B = at(AB, 55), Dd = at(AB, -55);
  must(Math.abs(angleDeg(A, B, C) - 90) < 1e-9 && Math.abs(angleDeg(B, C, Dd) - 70) < 1e-9, "kite");
  mk("u05-02", "maths-u05-kite", "geometry", "The kite ABCD",
    "The four angles of a quadrilateral add up to 360°. With A = 110° and C = 70°, B + D = 180°, and as B = D the kite has B = D = 90°.",
    "A kite ABCD with angle A = 110 degrees, angle C = 70 degrees and angles B and D both 90 degrees.",
    ["The kite has angle A = 110° and angle C = 70°.", "Angles in a quadrilateral add to 360°, so B + D = 360 − 110 − 70 = 180°.", "B and D are equal, so each is 90°, marked as right angles."],
    { points: { A, B, C, D: Dd }, segments: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]], ticks: [{ seg: ["A", "B"], n: 1 }, { seg: ["A", "D"], n: 1 }, { seg: ["C", "B"], n: 2 }, { seg: ["C", "D"], n: 2 }],
      angles: [{ at: "A", from: "D", to: "B", deg: 110, label: "110°", colour: "a1" }, { at: "B", from: "A", to: "C", right: true, colour: "a2" }, { at: "C", from: "B", to: "D", deg: 70, label: "70°", colour: "a1", r: 24 }, { at: "D", from: "C", to: "A", right: true, colour: "a2" }],
      labelAt: { A: [-14, 0], B: [0, -16], C: [14, 0], D: [0, 16] }, view: { x: [-2, 12], y: [-6, 6] }, height: [320, 260],
      checks: [{ type: "angleSum", angles: [0, 1, 2, 3], total: 360, name: "the four angles add up to 360°" }], fromLesson: ["B = D = 90°"] });
}

// ---------- u05-04 Angles: two crossing lines, 76° and 104° ----------
{
  const O = [0, 0], t = 76, P = at(5, t / 2 - 0), Q = at(5, t / 2 + 180), S = at(5, t / 2 + t), T = at(5, t / 2 + t + 180);
  const Pa = at(5, 0), Qa = at(5, 180), Ra = at(5, 76), Sa = at(5, 256);
  must(3 * 22 + 10 === 76 && 5 * 22 - 6 === 104, "angles");
  mk("u05-04", "maths-u05-crossing-lines", "geometry", "Two crossing lines: 76° and 104°",
    "Adjacent angles on a straight line add to 180°: (3x + 10) + (5x − 6) = 180 gives x = 22, so the angles are 76° and 104°, and each is repeated opposite.",
    "Two straight lines crossing, making angles 76, 104, 76 and 104 degrees.",
    ["Two lines cross at O.", "The angle 3x + 10 and its neighbour 5x − 6 lie on a straight line: 8x = 176, so x = 22.", "The angles are 76° and 104°.", "Vertically opposite angles are equal, so the other two are also 76° and 104°."],
    { points: { O, P: Pa, Q: Qa, R: Ra, S: Sa }, hide: ["O", "P", "Q", "R", "S"], segments: [["P", "Q"], ["R", "S"]],
      angles: [{ at: "O", from: "P", to: "R", deg: 76, label: "76°", colour: "a1", r: 30 }, { at: "O", from: "R", to: "Q", deg: 104, label: "104°", colour: "a2", r: 30 }, { at: "O", from: "Q", to: "S", deg: 76, label: "76°", colour: "a1", r: 30 }, { at: "O", from: "S", to: "P", deg: 104, label: "104°", colour: "a2", r: 30 }],
      view: { x: [-6, 6], y: [-5.4, 5.4] }, height: [320, 300],
      checks: [{ type: "angleSum", angles: [0, 1, 2, 3], total: 360, name: "the four angles add up to 360°" }, { type: "angleSum", angles: [0, 1], total: 180, name: "76° + 104° = 180° on a straight line" }], fromLesson: ["76°, 104°, 76°, 104°"] });
}

// ---------- u05-05 Parallel lines: co-interior angles 120° and 60° ----------
{
  const Y1 = 0, Y2 = 3, th = 60, dx = (Y2 - Y1) / Math.tan(th * D2R);
  const P1 = [0, Y1], P2 = [dx, Y2], P = [-3, Y1], Q = [9, Y1], R = [-3 + dx, Y2], S = [9 + dx, Y2], T1 = [P1[0] - 0.9 * dx / 3 * 1, -0.9], T2 = [P2[0] + 0.9 * dx / 3, Y2 + 0.9];
  mk("u05-05", "maths-u05-co-interior", "geometry", "Co-interior angles add to 180°",
    "Between two parallel lines, the angles on the same side of the transversal add to 180°: (2x + 30) + (x + 15) = 180 gives x = 45, so the angles are 120° and 60°.",
    "Two parallel lines crossed by a transversal, with the two co-interior angles marked 120 degrees and 60 degrees.",
    ["Two parallel lines are cut by a transversal.", "The co-interior angles 2x + 30 and x + 15 add to 180°, so 3x + 45 = 180 and x = 45.", "The angles are 120° (2x + 30) and 60° (x + 15)."],
    { points: { A: P, B: Q, C: R, D: S, X: P1, Y: P2, T: T1, U: T2 }, hide: ["A", "B", "C", "D", "X", "Y", "T", "U"], segments: [["A", "B"], ["C", "D"], { a: "T", b: "U", colour: "a2" }], parallels: [{ seg: ["A", "B"], n: 1 }, { seg: ["C", "D"], n: 1 }],
      angles: [{ at: "X", from: "B", to: "Y", deg: 60, label: "x + 15 = 60°", colour: "a1", r: 24, labelR: 20 }, { at: "Y", from: "X", to: "D", deg: 120, label: "2x + 30 = 120°", colour: "a2", r: 24, labelR: 20 }],
      view: { x: [-4, 10], y: [-1.4, 4.4] }, height: [320, 280],
      checks: [{ type: "parallel", a: ["A", "B"], b: ["C", "D"], name: "the lines are parallel" }, { type: "angleSum", angles: [0, 1], total: 180, name: "co-interior angles add to 180°" }], fromLesson: ["The angles are 120° and 60°"] });
}

// ---------- u05-06 Triangles: the exterior angle ----------
{
  const Pp = [0, 0], Qq = [6, 0], PR = 6 * Math.sin(67 * D2R) / Math.sin(65 * D2R), R = at(PR, 48);
  const Ee = [R[0] + (R[0] - Qq[0]) * 0.55, R[1] + (R[1] - Qq[1]) * 0.55];
  must(Math.abs(angleDeg(R, Qq, Pp) - 67) < 1e-6 && Math.abs(angleDeg(Ee, R, Pp) - 115) < 1e-6, "exterior");
  mk("u05-06", "maths-u05-exterior-angle", "geometry", "The exterior angle equals the two opposite angles",
    "In triangle PQR the exterior angle at R, 115°, equals P + Q = 48° + Q, so Q = 67°.",
    "Triangle PQR with angle P 48 degrees, angle Q 67 degrees and the side QR extended past R, making an exterior angle of 115 degrees.",
    ["Triangle PQR has P = 48°.", "Extend QR beyond R; the exterior angle at R is 115°.", "The exterior angle equals the sum of the two opposite interior angles: 115 = 48 + Q.", "So Q = 67°."],
    { points: { P: Pp, Q: Qq, R, E: Ee }, hide: ["E"], segments: [["P", "Q"], ["Q", "R"], ["R", "P"], { a: "R", b: "E", colour: "a2" }],
      angles: [{ at: "P", from: "Q", to: "R", deg: 48, label: "48°", colour: "a1", r: 30 }, { at: "Q", from: "P", to: "R", deg: 67, label: "Q = 67°", colour: "a3", r: 26 }, { at: "R", from: "P", to: "E", deg: 115, label: "115°", colour: "a2", r: 28 }],
      labelAt: { R: [-14, -8] }, view: { x: [-1.5, 8], y: [-1.2, 6.2] }, height: [320, 300],
      checks: [{ type: "collinear", points: ["Q", "R", "E"], name: "E lies on QR extended" }, { type: "angle", at: "R", from: "P", to: "E", deg: 115, name: "the exterior angle is 115° = 48° + 67°" }], fromLesson: ["Q = 67°"] });
}

// ---------- u05-07 Similarity: two similar bottles ----------
{
  const k = 18 / 12, v = 400 * k ** 3; must(Math.abs(v - 1350) < 1e-9, "volume");
  mk("u05-07", "maths-u05-similar-bottles", "geometry", "Similar bottles: lengths ×1.5, volume ×3.375",
    "The bottles are similar with length scale factor 1.5. Areas scale by 1.5² and volumes by 1.5³ = 3.375, so 400 ml becomes 400 × 3.375 = 1,350 ml.",
    "Two similar rectangles, 12 tall and 18 tall, standing for the bottles, with length scale factor 1.5.",
    ["The heights are 12 cm and 18 cm, so the length scale factor is 18/12 = 1.5.", "Volumes scale by the cube of the length scale factor: 1.5³ = 3.375.", "The larger bottle holds 400 × 3.375 = 1,350 ml."],
    { points: { A: [0, 0], B: [4, 0], C: [4, 12], D: [0, 12], E: [7, 0], F: [13, 0], G: [13, 18], H: [7, 18] }, hide: ["A", "B", "C", "D", "E", "F", "G", "H"], polygons: [{ pts: ["A", "B", "C", "D"], colour: "a1", opacity: 0.14 }, { pts: ["E", "F", "G", "H"], colour: "a2", opacity: 0.14 }],
      lengths: [{ a: "A", b: "D", value: 12, label: "12 cm", side: -1 }, { a: "F", b: "G", value: 18, label: "18 cm" }], notes: [{ at: [2, 6], text: "400 ml", colour: "a1", size: 13 }, { at: [10, 9], text: "1,350 ml", colour: "a2", size: 13 }],
      view: { x: [-3, 15.5], y: [-1.6, 19.5] }, height: [350, 340],
      checks: [{ type: "similar", a: ["A", "B", "C", "D"], b: ["E", "F", "G", "H"], k: 1.5, name: "the larger bottle is the smaller scaled by 1.5" }], fromLesson: ["400 × 3.375 = 1,350 ml"] });
}

// ---------- u05-08 Quadrilaterals: the rhombus with diagonals 10 and 24 ----------
mk("u05-08", "maths-u05-rhombus", "geometry", "A rhombus with diagonals 10 cm and 24 cm",
  "The diagonals bisect at right angles, cutting the rhombus into four right triangles with legs 5 and 12, so the side is 13 cm and the area ½ × 10 × 24 = 120 cm².",
  "A rhombus with horizontal diagonal 24 cm and vertical diagonal 10 cm meeting at right angles, with side length 13 cm.",
  ["The diagonals are 24 cm and 10 cm and cross at right angles at the centre.", "Each quarter is a right triangle with legs 12 and 5.", "The side is √(144 + 25) = 13 cm.", "The area is ½ × 10 × 24 = 120 cm²."],
  { points: { A: [-12, 0], B: [0, -5], C: [12, 0], D: [0, 5], O: [0, 0] }, hide: ["O"], polygons: [{ pts: ["A", "B", "C", "D"], colour: "a1", opacity: 0.12 }], segments: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], { a: "A", b: "C", colour: "a2", dash: "6 4" }, { a: "B", b: "D", colour: "a2", dash: "6 4" }],
    angles: [{ at: "O", from: "C", to: "D", right: true, colour: "ink" }], lengths: [{ a: "A", b: "D", value: 13, label: "13 cm", side: 1 }, { a: "O", b: "C", value: 12, label: "12", side: -1 }, { a: "O", b: "D", value: 5, label: "5", side: -1 }], ticks: [{ seg: ["A", "B"], n: 1 }, { seg: ["B", "C"], n: 1 }, { seg: ["C", "D"], n: 1 }, { seg: ["D", "A"], n: 1 }],
    notes: [{ at: [0, -2], text: "120 cm²", colour: "a1", size: 13 }], view: { x: [-15, 15], y: [-7.5, 7.5] }, height: [300, 240],
    checks: [{ type: "area", polygon: ["A", "B", "C", "D"], value: 120, note: 0, name: "area = ½ × 10 × 24 = 120" }, { type: "perpendicular", a: ["A", "C"], b: ["B", "D"], name: "the diagonals cross at right angles" }], fromLesson: ["Side = √(25 + 144) = 13 cm"] });

// ---------- u05-09 Polygons: the regular 15-gon ----------
{
  const n = 15, ext = 360 / n; must(ext === 24 && 180 - ext === 156, "polygon");
  const pts = {}; for (let i = 0; i < n; i++) pts[`V${i}`] = at(5, 90 + i * ext); pts.X = [pts.V1[0] + (pts.V1[0] - pts.V0[0]), pts.V1[1] + (pts.V1[1] - pts.V0[1])];
  mk("u05-09", "maths-u05-regular-15-gon", "geometry", "A regular polygon with interior angle 156°",
    "Interior and exterior angles make a straight line, so the exterior angle is 180 − 156 = 24°. The exterior angles of any polygon total 360°, so there are 360 ÷ 24 = 15 sides.",
    "A regular 15-sided polygon with an interior angle of 156 degrees and an exterior angle of 24 degrees marked at one corner.",
    ["Each interior angle is 156°, so each exterior angle is 180 − 156 = 24°.", "The exterior angles of a polygon add to 360°.", "The number of sides is 360 ÷ 24 = 15."],
    { points: pts, hide: Object.keys(pts), polygons: [{ pts: Array.from({ length: n }, (_, i) => `V${i}`), colour: "a1", opacity: 0.1 }], segments: [{ a: "V1", b: "X", colour: "a2", dash: "5 4" }],
      angles: [{ at: "V1", from: "V0", to: "V2", deg: 156, label: "156°", colour: "a1", r: 22, labelR: 4 }, { at: "V1", from: "X", to: "V2", deg: 24, label: "24°", colour: "a2", r: 52, labelR: 8 }],
      view: { x: [-6, 8], y: [-6, 6] }, height: [340, 320],
      checks: [{ type: "angle", at: "V1", from: "V0", to: "V2", deg: 156, name: "each interior angle is 156°" }, { type: "angle", at: "V1", from: "X", to: "V2", deg: 24, name: "the exterior angle is 24°" }, { type: "collinear", points: ["V0", "V1", "X"], name: "the exterior angle is on the extended side" }], fromLesson: ["n = 360/24"] });
}

// ---------- u05-10 Pythagorean theorem: the 3-4-5 and 5-12-13 triangles of the cuboid ----------
{
  must(3 * 3 + 4 * 4 === 25 && 5 * 5 + 12 * 12 === 169, "pyth");
  mk("u05-10", "maths-u05-cuboid-diagonal", "geometry", "The cuboid's diagonal as two right triangles",
    "Use Pythagoras twice: the base diagonal of a 3 × 4 base is √(9 + 16) = 5, then the space diagonal with height 12 is √(25 + 144) = 13.",
    "Two right triangles: one with legs 3 and 4 and hypotenuse 5, then one with legs 5 and 12 and hypotenuse 13.",
    ["The base is 3 cm by 4 cm, so its diagonal is √(3² + 4²) = 5 cm.", "That diagonal and the height 12 cm are the legs of a second right triangle.", "The longest diagonal of the cuboid is √(5² + 12²) = 13 cm."],
    { points: { A: [0, 0], B: [4, 0], C: [4, 3], F: [7, 0], D: [12, 0], E: [12, 12] }, polygons: [{ pts: ["A", "B", "C"], colour: "a1", opacity: 0.14 }, { pts: ["F", "D", "E"], colour: "a2", opacity: 0.1 }], segments: [["A", "B"], ["B", "C"], ["C", "A"], ["F", "D"], ["D", "E"], ["E", "F"]],
      angles: [{ at: "B", from: "A", to: "C", right: true, colour: "ink" }, { at: "D", from: "F", to: "E", right: true, colour: "ink" }], lengths: [{ a: "A", b: "B", value: 4, label: "4" }, { a: "B", b: "C", value: 3, label: "3" }, { a: "A", b: "C", value: 5, label: "5", side: 1 }, { a: "F", b: "D", value: 5, label: "5" }, { a: "D", b: "E", value: 12, label: "12" }, { a: "F", b: "E", value: 13, label: "13", side: 1 }],
      view: { x: [-1.5, 14], y: [-1.8, 13.5] }, height: [380, 380],
      checks: [{ type: "distance", a: "A", b: "C", value: "sqrt(3^2+4^2)", name: "base diagonal = √(9 + 16) = 5" }, { type: "distance", a: "F", b: "E", value: "sqrt(9+16+144)", name: "space diagonal = √(9 + 16 + 144) = 13" }], fromLesson: ["= √169 = 13 cm"] });
}

// ---------- u05-12 Chords and tangents: chord 16 at distance 6 ----------
{
  const O = [0, 0], A = [-8, 6], B = [8, 6], M = [0, 6]; must(Math.hypot(8, 6) === 10, "chord");
  mk("u05-12", "maths-u05-chord-radius", "geometry", "A chord 6 cm from the centre",
    "The perpendicular from the centre bisects the chord, so half-chord 8 and distance 6 are the legs of a right triangle; the radius is the hypotenuse, √(36 + 64) = 10 cm.",
    "A circle with centre O and a horizontal chord AB of length 16, whose midpoint M is 6 above O, with OA = 10 as the radius.",
    ["The chord AB is 16 cm long and 6 cm from the centre O.", "The perpendicular from O meets the chord at its midpoint M, so AM = 8 cm.", "Triangle OMA has a right angle at M with legs 6 and 8.", "The radius OA = √(36 + 64) = 10 cm."],
    { points: { O, A, B, M }, circles: [{ centre: "O", r: 10, colour: "ink" }], segments: [{ a: "A", b: "B", colour: "a2", w: 2.6 }, { a: "O", b: "M", colour: "a1" }, { a: "O", b: "A", colour: "a1" }], angles: [{ at: "M", from: "O", to: "A", right: true, colour: "ink" }],
      lengths: [{ a: "A", b: "B", value: 16, label: "16", side: 1 }, { a: "O", b: "M", value: 6, label: "6", side: 1 }, { a: "O", b: "A", value: 10, label: "r = 10", side: -1 }], labelAt: { O: [0, 16], A: [-14, -6], B: [14, -6], M: [12, 14] }, view: { x: [-12, 12], y: [-11.5, 11.5] }, height: [340, 320],
      checks: [{ type: "onCircle", points: ["A", "B"], name: "A and B are on the circle of radius 10" }, { type: "midpoint", m: "M", a: "A", b: "B", name: "M is the midpoint of the chord" }, { type: "perpendicular", a: ["O", "M"], b: ["A", "B"], name: "OM is perpendicular to the chord" }], fromLesson: ["r = √(36 + 64) = 10 cm"] });
}

// ---------- u05-13 Circle theorems: angle at the centre is twice the angle at the circumference ----------
{
  const O = [0, 0], A = at(5, 20), C = at(5, 160), B = at(5, 270); must(Math.abs(angleDeg(A, O, C) - 140) < 1e-9 && Math.abs(angleDeg(A, B, C) - 70) < 1e-9, "circle");
  mk("u05-13", "maths-u05-angle-at-centre", "geometry", "Angle at the centre is twice the angle at the circumference",
    "The arc AC makes an angle of 140° at the centre O and half of that, 70°, at B on the major arc.",
    "A circle with centre O and points A, B, C on it; angle AOC is 140 degrees and angle ABC is 70 degrees.",
    ["A, B and C lie on a circle with centre O, and angle AOC = 140°.", "B is on the major arc, opposite the 140° angle.", "The angle at the circumference is half the angle at the centre: ABC = 140 ÷ 2 = 70°."],
    { points: { O, A, B, C }, circles: [{ centre: "O", r: 5, colour: "ink" }], segments: [["O", "A"], ["O", "C"], ["B", "A"], ["B", "C"]],
      angles: [{ at: "O", from: "A", to: "C", deg: 140, label: "140°", colour: "a1", r: 26 }, { at: "B", from: "A", to: "C", deg: 70, label: "70°", colour: "a2", r: 40, labelR: 10 }], labelAt: { O: [0, 18], A: [12, -10], C: [-12, -10], B: [0, 16] },
      view: { x: [-6.6, 6.6], y: [-6.2, 6.2] }, height: [340, 320], checks: [{ type: "onCircle", points: ["A", "B", "C"], name: "A, B and C are on the circle" }], fromLesson: ["Angle ABC = 140 ÷ 2"] });
}

// ---------- u05-15 Loci: the goat tied to a corner of the shed ----------
{
  const area = 0.75 * Math.PI * 16; must(Math.abs(area - 37.699) < 1e-3 && Math.abs(area - 12 * Math.PI) < 1e-9, "goat");
  mk("u05-15", "maths-u05-goat-locus", "geometry", "The goat's grazing region",
    "The rope sweeps a circle of radius 4 m about the corner, but the shed blocks one quarter. The grazing region is three quarters of the circle, ¾ × π × 4² = 12π ≈ 37.7 m².",
    "A 10 by 6 shed with a goat tied at one corner by a 4 metre rope; the circle of radius 4 about the corner is blocked by the shed in one quarter.",
    ["The goat is tied to the corner O of the shed with a 4 m rope.", "The rope can sweep a circle of radius 4 m about O.", "The shed fills one quarter of that circle, so the goat reaches three quarters.", "Area = ¾ × π × 4² = 12π ≈ 37.7 m²."],
    { points: { O: [0, 0], A: [10, 0], B: [10, 6], C: [0, 6], P: [4, 0], Q: [0, 4], N: [-4, 0], S: [0, -4] }, hide: ["O", "A", "B", "C", "P", "Q", "N", "S"], polygons: [{ pts: ["O", "A", "B", "C"], colour: "a3", opacity: 0.35 }], circles: [{ centre: "O", r: 4, colour: "a1" }],
      segments: [{ a: "O", b: "P", colour: "a2", dash: "5 4" }], lengths: [{ a: "O", b: "P", value: 4, label: "4 m", side: -1 }], notes: [{ at: [6, 3], text: "shed 10 m × 6 m", colour: "ink", size: 13 }, { at: [1, -4.5], text: "grazes ¾ of the circle", colour: "a1", size: 12 }],
      view: { x: [-5.5, 11.5], y: [-5, 7.5] }, height: [300, 280],
      checks: [{ type: "onCircle", points: ["P", "Q", "N", "S"], name: "the rope's reach is 4 m in every direction", circle: 0 }, { type: "area", polygon: ["O", "A", "B", "C"], value: 60, name: "the shed is 10 × 6 = 60 m²" }], fromLesson: ["12π"] });
}

// ---------- u05-16 Bearings: 300 km east then 400 km north ----------
{
  const th = deg(Math.atan(300 / 400)); must(Math.abs(th - 36.87) < 0.01 && Math.abs(Math.hypot(300, 400) - 500) < 1e-9, "bearing");
  mk("u05-16", "maths-u05-bearing-plane", "geometry", "The plane's bearing is 036.9°",
    "After 300 km east and 400 km north the plane is 500 km from the start. The angle from north is θ with tan θ = 300/400, so θ = 36.9° and the bearing is 037°.",
    "A right triangle from the start O, 300 km east to A and 400 km north to B, with the angle from north at O marked 36.9 degrees.",
    ["The plane flies 300 km due east, then 400 km due north.", "The direct line from the start makes angle θ with north, where tan θ = 300/400.", "θ = 36.9°, so the bearing is 036.9°, about 037°."],
    { points: { O: [0, 0], A: [300, 0], B: [300, 400], N: [0, 300] }, hide: ["N"], polygons: [{ pts: ["O", "A", "B"], colour: "a1", opacity: 0.1 }], segments: [["O", "A"], ["A", "B"], ["O", "B"], { a: "O", b: "N", dash: "5 4", colour: "ink" }],
      angles: [{ at: "O", from: "N", to: "B", deg: r1(th), label: "36.9°", colour: "a2", r: 70, labelR: 6 }, { at: "A", from: "O", to: "B", right: true, colour: "ink" }], lengths: [{ a: "O", b: "A", value: 300, label: "300 km", side: -1 }, { a: "A", b: "B", value: 400, label: "400 km" }, { a: "O", b: "B", value: 500, label: "500 km", side: 1 }],
      labelAt: { O: [-14, 8], A: [12, 12], B: [12, -4] }, view: { x: [-70, 380], y: [-60, 450] }, height: [380, 380], checks: [], fromLesson: ["Bearing = 036.9° ≈ 037°"] });
}

// ---------- u05-18 Area: the garden with a pond ----------
{
  const pond = Math.PI * 1.5 ** 2, net = 96 - pond, cost = net * 6.5; must(Math.abs(net - 88.93) < 0.01 && Math.abs(cost - 578.05) < 0.1, "garden");
  mk("u05-18", "maths-u05-garden-pond", "geometry", "The garden around the pond",
    `The garden is 12 × 8 = 96 m² and the pond takes π × 1.5² ≈ ${pond.toFixed(2)} m², leaving ${net.toFixed(2)} m² of turf, which costs ${net.toFixed(2)} × £6.50 ≈ £${cost.toFixed(2)}.`,
    "A 12 metre by 8 metre rectangular garden with a circular pond of radius 1.5 metres in it.",
    ["The garden is a 12 m by 8 m rectangle, area 96 m².", "The pond is a circle of radius 1.5 m, area π × 1.5² ≈ 7.07 m².", "Turf area ≈ 96 − 7.07 = 88.93 m², costing ≈ £578.05."],
    { points: { A: [0, 0], B: [12, 0], C: [12, 8], D: [0, 8], P: [6, 4], Q: [7.5, 4] }, hide: ["A", "B", "C", "D", "P", "Q"], polygons: [{ pts: ["A", "B", "C", "D"], colour: "a4", opacity: 0.14 }], circles: [{ centre: "P", r: 1.5, colour: "a1" }], segments: [{ a: "P", b: "Q", colour: "a1" }],
      lengths: [{ a: "A", b: "B", value: 12, label: "12 m", side: -1 }, { a: "B", b: "C", value: 8, label: "8 m" }, { a: "P", b: "Q", value: 1.5, label: "1.5", side: -1 }], notes: [{ at: [2.5, 6.6], text: "turf 88.93 m²", colour: "a4", size: 13 }], view: { x: [-1.5, 14.5], y: [-1.6, 9.4] }, height: [300, 280],
      checks: [{ type: "area", polygon: ["A", "B", "C", "D"], value: 96, name: "the garden is 12 × 8 = 96 m²" }, { type: "onCircle", points: ["Q"], name: "the radius PQ is 1.5 m" }], fromLesson: ["88.93 m"] });
}

// ---------- u05-19 Arc length: sector with radius 9 and perimeter 30 ----------
{
  const th = 12 / 9, d = deg(th); must(Math.abs(d - 76.39) < 0.01, "arc");
  const O = [0, 0], A = at(9, 0), B = at(9, d);
  mk("u05-19", "maths-u05-sector", "geometry", "The sector with radius 9 cm and perimeter 30 cm",
    "The two radii use 18 cm, so the arc is 30 − 18 = 12 cm and θ = arc/radius = 12/9 = 4/3 radians ≈ 1.33, which is 76.4°.",
    "A circle of radius 9 centred at O with a sector bounded by radii OA and OB, angle 76.4 degrees at the centre and arc length 12.",
    ["The sector has radius 9 cm and perimeter 30 cm.", "Perimeter = 2 × 9 + arc, so the arc is 12 cm.", "θ = 12/9 = 4/3 radians.", "In degrees: (4/3) × 180/π ≈ 76.4°."],
    { points: { O, A, B }, circles: [{ centre: "O", r: 9, colour: "a3" }], segments: [{ a: "O", b: "A", colour: "a1", w: 3 }, { a: "O", b: "B", colour: "a1", w: 3 }], angles: [{ at: "O", from: "A", to: "B", deg: r1(d), label: "76.4°", colour: "a2", r: 30, labelR: 24 }],
      lengths: [{ a: "O", b: "A", value: 9, label: "9", side: -1 }], notes: [{ at: at(10.6, d / 2), text: "arc 12", colour: "a2", size: 13 }], labelAt: { O: [-14, 12], A: [14, 10], B: [10, -10] },
      view: { x: [-11, 13], y: [-11, 11] }, height: [340, 320], checks: [{ type: "onCircle", points: ["A", "B"], name: "A and B are on the circle" }], fromLesson: ["θ = 12/9 = 4/3 ≈ 1.33 radians"] });
}

// ---------- u05-22 Surface area: the cone with r = 6 and h = 8 ----------
{
  must(Math.hypot(6, 8) === 10 && 60 + 36 === 96, "cone");
  mk("u05-22", "maths-u05-cone-slant", "geometry", "The cone's slant height",
    "Radius 6 and height 8 are the legs of a right triangle; the slant height is its hypotenuse, √(36 + 64) = 10. Then curved surface πrl = 60π, base πr² = 36π, total 96π cm².",
    "A right triangle with legs 6 (radius) and 8 (height) and hypotenuse 10 (slant height), the cross-section of the cone.",
    ["The cone has radius 6 cm and perpendicular height 8 cm.", "A cross-section through the axis gives a right triangle with legs 8 and 6.", "The slant height is √(36 + 64) = 10 cm.", "Curved surface = π × 6 × 10 = 60π; base = π × 6² = 36π; total = 96π cm²."],
    { points: { A: [0, 0], B: [6, 0], C: [0, 8] }, polygons: [{ pts: ["A", "B", "C"], colour: "a1", opacity: 0.12 }], segments: [["A", "B"], ["A", "C"], { a: "B", b: "C", colour: "a2", w: 3 }], angles: [{ at: "A", from: "B", to: "C", right: true, colour: "ink" }],
      lengths: [{ a: "A", b: "B", value: 6, label: "r = 6", side: -1 }, { a: "A", b: "C", value: 8, label: "h = 8", side: -1 }, { a: "B", b: "C", value: 10, label: "l = 10", colour: "a2", side: 1 }], labelAt: { A: [-12, 12], B: [12, 10], C: [0, -14] }, view: { x: [-3, 9], y: [-1.8, 9.8] }, height: [340, 320],
      checks: [{ type: "distance", a: "B", b: "C", value: "sqrt(36+64)", name: "slant height = √(36 + 64) = 10" }], fromLesson: ["Total = 96π cm"] });
}

// ---------- u05-24 Geometric transformations: enlargement by scale factor -2 ----------
{
  const o = [[1, 1], [3, 1], [1, 2]], im = o.map(([x, y]) => [-2 * x, -2 * y]); must(JSON.stringify(im) === "[[-2,-2],[-6,-2],[-2,-4]]", "enlarge");
  mk("u05-24", "maths-u05-enlarge-minus-2", "transform", "Enlargement by scale factor −2",
    "Each coordinate is multiplied by −2: (1, 1) → (−2, −2), (3, 1) → (−6, −2), (1, 2) → (−2, −4). The image is twice the size, on the other side of the origin and turned through 180°.",
    "Triangle A with vertices (1, 1), (3, 1), (1, 2) and its image B, twice the size on the opposite side of the origin.",
    ["Triangle A has vertices (1, 1), (3, 1) and (1, 2).", "Enlarging by −2 about the origin multiplies every coordinate by −2.", "The image B has vertices (−2, −2), (−6, −2) and (−2, −4): twice as big, inverted through the origin."],
    { view: { x: [-7, 4], y: [-5, 3] }, grid: { step: 1, axes: true, labels: 1 }, object: { name: "A", pts: o, colour: "a1" }, images: [{ name: "B", t: { kind: "enlarge", centre: [0, 0], k: -2 }, pts: im, colour: "a2", rays: true }], height: [320, 300], checks: [{ type: "areaScale", image: "B", value: 4 }], fromLesson: ["(1, 1) → (−2, −2); (3, 1) → (−6, −2); (1, 2) → (−2, −4)"] });
}

// ---------- u05-25 Symmetry: the six lines of a regular hexagon ----------
{
  const V = Array.from({ length: 6 }, (_, i) => at(5, 90 + 60 * i)), M = V.map((p, i) => at(5 * Math.cos(30 * D2R), 90 + 30 + 60 * i));
  const P = { O: [0, 0] }; V.forEach((p, i) => (P[`V${i}`] = p)); M.forEach((p, i) => (P[`M${i}`] = p));
  const seg = []; for (let i = 0; i < 3; i++) { seg.push({ a: `V${i}`, b: `V${i + 3}`, colour: "a2", dash: "6 4" }); seg.push({ a: `M${i}`, b: `M${i + 3}`, colour: "a1", dash: "6 4" }); }
  mk("u05-25", "maths-u05-hexagon-symmetry", "geometry", "The six lines of symmetry of a regular hexagon",
    "Three lines of symmetry join opposite vertices and three join the midpoints of opposite sides: 6 in all. A turn of 60° maps the hexagon onto itself, so its rotational symmetry has order 6.",
    "A regular hexagon with six dashed lines of symmetry through its centre: three through opposite corners and three through midpoints of opposite sides.",
    ["A regular hexagon has six equal sides and angles.", "Three lines of symmetry join opposite vertices.", "Three more join the midpoints of opposite sides.", "Rotating by 60° maps the hexagon onto itself, so the order of rotational symmetry is 6."],
    { points: P, hide: Object.keys(P), polygons: [{ pts: V.map((_, i) => `V${i}`), colour: "a3", opacity: 0.1 }], segments: [...V.map((_, i) => ({ a: `V${i}`, b: `V${(i + 1) % 6}`, colour: "ink" })), ...seg],
      view: { x: [-6.2, 6.2], y: [-6, 6] }, height: [340, 320],
      checks: [...[0, 1, 2].map((i) => ({ type: "collinear", points: [`V${i}`, "O", `V${i + 3}`], name: `V${i}, the centre and V${i + 3} are on one line of symmetry` })), ...[0, 1, 2].map((i) => ({ type: "perpendicular", a: [`M${i}`, `M${i + 3}`], b: [`V${(i + 1) % 6}`, `V${(i + 2) % 6}`], name: `line M${i}M${i + 3} is perpendicular to the side it bisects` })).slice(0, 0)], fromLesson: ["Order of rotational symmetry 6"] });
}

// ---------- u05-26 Tessellations: two octagons and a square meet at a point ----------
{
  const s = 3, poly = (V0, h0, n) => { const out = [V0]; let p = V0, h = h0; for (let i = 0; i < n - 1; i++) { p = [p[0] + s * Math.cos(h * D2R), p[1] + s * Math.sin(h * D2R)]; out.push(p); h += 360 / n; } return out; };
  const V = [0, 0], o1 = poly(V, 0, 8), sq = poly(V, 135, 4), o2 = poly(V, 225, 8), P = { V };
  const add = (n, a) => a.forEach((p, i) => { if (i) P[`${n}${i}`] = p; });
  add("A", o1); add("S", sq); add("B", o2);
  const ids = (n, k) => ["V", ...Array.from({ length: k - 1 }, (_, i) => `${n}${i + 1}`)];
  must(135 + 135 + 90 === 360, "tess");
  mk("u05-26", "maths-u05-octagon-square", "geometry", "Octagons and squares fit round a point",
    "A regular octagon has interior angle 135°, and 360 ÷ 135 is not a whole number, so octagons cannot tessellate alone. But 135° + 135° + 90° = 360°: two octagons and a square fit round a point.",
    "Two regular octagons and a square meeting at a point, with angles 135, 90 and 135 degrees filling the full turn.",
    ["Each interior angle of a regular octagon is 135°.", "360 ÷ 135 is not a whole number, so octagons alone leave gaps.", "Two octagons and a square meet at a vertex: 135 + 135 + 90 = 360°, with no gap.", "So octagons tessellate together with squares."],
    { points: P, hide: Object.keys(P), polygons: [{ pts: ids("A", 8), colour: "a1", opacity: 0.16 }, { pts: ids("S", 4), colour: "a2", opacity: 0.22 }, { pts: ids("B", 8), colour: "a1", opacity: 0.16 }],
      angles: [{ at: "V", from: "A1", to: "S1", deg: 135, label: "135°", colour: "a1", r: 20, labelR: 22 }].slice(0, 0), notes: [],
      view: { x: [-9, 6], y: [-7, 8] }, height: [360, 340],
      checks: [{ type: "distance", a: "V", b: "A1", value: 3, name: "the sides are equal: 3" }, { type: "distance", a: "V", b: "S1", value: 3, name: "the square's side is 3, the same" }] });
}

// ---------- u05-27 Coordinate geometry: the perpendicular bisector of A(2, 5) and B(6, -3) ----------
{
  const A = [2, 5], B = [6, -3], M = [4, 1]; must(-8 / 4 === -2 && 0.5 * 4 - 1 === 1, "bisector");
  mk("u05-27", "maths-u05-perpendicular-bisector", "geometry", "The perpendicular bisector of AB",
    "The midpoint of AB is (4, 1) and the gradient of AB is −2, so the bisector has gradient ½ through (4, 1): y = ½x − 1.",
    "The segment from A(2, 5) to B(6, −3), its midpoint M(4, 1) and the perpendicular line y = x/2 − 1 through M.",
    ["A = (2, 5) and B = (6, −3) have midpoint (4, 1).", "The gradient of AB is −8/4 = −2, so the perpendicular gradient is 1/2.", "The line through (4, 1) with gradient 1/2 is y = ½x − 1."],
    { points: { A, B, M, P: [-2, -2], Q: [10, 4] }, hide: ["P", "Q"], grid: { step: 1, axes: true, labels: 2 }, segments: [["A", "B"], { a: "P", b: "Q", colour: "a2" }], view: { x: [-3, 11], y: [-4.5, 6.5] }, height: [330, 320], labelAt: { A: [-12, -8], B: [12, 8], M: [12, 14] },
      checks: [{ type: "midpoint", m: "M", a: "A", b: "B", name: "M(4, 1) is the midpoint of AB" }, { type: "perpendicular", a: ["A", "B"], b: ["P", "Q"], name: "the line y = ½x − 1 is perpendicular to AB" }, { type: "collinear", points: ["P", "M", "Q"], name: "(−2, −2), (4, 1) and (10, 4) lie on y = ½x − 1" }], fromLesson: ["y = ½x − 1"] });
}

// ---------- u05-28 Analytic geometry: the distance from (2, 3) to 3x + 4y − 8 = 0 ----------
{
  const P = [2, 3], F = [0.8, 1.4]; must(Math.abs(3 * F[0] + 4 * F[1] - 8) < 1e-9 && Math.abs(Math.hypot(P[0] - F[0], P[1] - F[1]) - 2) < 1e-9, "distance");
  mk("u05-28", "maths-u05-point-line-distance", "geometry", "Distance from (2, 3) to 3x + 4y − 8 = 0",
    "The shortest distance is along the perpendicular. The formula |3(2) + 4(3) − 8| / √(3² + 4²) = 10/5 = 2 matches the drawn foot of the perpendicular F = (0.8, 1.4), 2 units from P.",
    "The line 3x + 4y = 8 and the point P(2, 3), with the perpendicular from P to the line of length 2 ending at F(0.8, 1.4).",
    ["The line 3x + 4y − 8 = 0 passes through (4, −1) and (−4, 5).", "The perpendicular from P(2, 3) meets it at F(0.8, 1.4).", "The formula gives |6 + 12 − 8| ÷ 5 = 2, the length PF."],
    { points: { P, F, L1: [4, -1], L2: [-4, 5] }, hide: ["L1", "L2"], grid: { step: 1, axes: true, labels: 1 }, segments: [{ a: "L1", b: "L2", colour: "a1" }, { a: "P", b: "F", colour: "a2", w: 3 }], angles: [{ at: "F", from: "P", to: "L1", right: true, colour: "ink" }],
      lengths: [{ a: "P", b: "F", value: 2, label: "2", colour: "a2", side: 1 }], view: { x: [-4.5, 5.5], y: [-2, 5.5] }, height: [330, 320], labelAt: { P: [10, -10], F: [-14, 10] },
      checks: [{ type: "perpendicular", a: ["P", "F"], b: ["L1", "L2"], name: "PF is perpendicular to the line" }, { type: "collinear", points: ["L1", "F", "L2"], name: "F is on the line 3x + 4y = 8" }], fromLesson: ["Distance = 2"] });
}

// ---------- u05-29 Vectors in geometry: MN = ½AB ----------
mk("u05-29", "maths-u05-midpoint-theorem", "geometry", "MN is parallel to AB and half its length",
  "With M and N the midpoints of OA and OB, MN = ½b − ½a = ½(b − a) = ½AB, so MN is parallel to AB and half as long.",
  "Triangle OAB with midpoints M of OA and N of OB; MN is parallel to AB and half its length.",
  ["OA = a and OB = b; M and N are the midpoints of OA and OB.", "MN = ON − OM = ½b − ½a = ½(b − a).", "AB = b − a, so MN = ½AB: parallel, and half the length."],
  { points: { O: [0, 0], A: [8, 0], B: [2, 6], M: [4, 0], N: [1, 3] }, polygons: [{ pts: ["O", "A", "B"], colour: "a1", opacity: 0.08 }], segments: [["O", "A"], ["O", "B"], ["A", "B"], { a: "M", b: "N", colour: "a2", w: 3 }], parallels: [{ seg: ["M", "N"], n: 1 }, { seg: ["A", "B"], n: 1 }],
    vectors: [{ from: [0, 0], v: [8, 0], name: "a", colour: "a1", labelSide: -1 }, { from: [0, 0], v: [2, 6], name: "b", colour: "a3" }].slice(0, 0), labelAt: { O: [-12, 10], A: [12, 10], B: [0, -14], M: [0, 16], N: [-14, 0] }, view: { x: [-2, 10], y: [-1.8, 7.5] }, height: [320, 300],
    checks: [{ type: "parallel", a: ["M", "N"], b: ["A", "B"], name: "MN is parallel to AB" }, { type: "midpoint", m: "M", a: "O", b: "A", name: "M is the midpoint of OA" }, { type: "midpoint", m: "N", a: "O", b: "B", name: "N is the midpoint of OB" }, { type: "distance", a: "M", b: "N", value: "sqrt(9+9)", name: "MN = √18" }, { type: "distance", a: "A", b: "B", value: "sqrt(36+36)", name: "AB = √72 = 2 × √18" }], fromLesson: ["MN = ½AB"] });

// ---------- u05-31 Conic sections: 4x² − 9y² = 36 ----------
mk("u05-31", "maths-u05-hyperbola-classify", "graph", "4x² − 9y² = 36 is a hyperbola",
  "Dividing by 36 gives x²/9 − y²/4 = 1: the squares have opposite signs, so the conic is a hyperbola with vertices (±3, 0) and two branches.",
  "A hyperbola with two branches, vertices at (3, 0) and (−3, 0), opening left and right.",
  ["Divide 4x² − 9y² = 36 by 36 to get x²/9 − y²/4 = 1.", "Opposite signs on x² and y²: a hyperbola.", "The vertices are at (±3, 0), and the branches open left and right."],
  { range: { x: [-8, 8], y: [-5, 5] }, ticks: [[-6, -3, 3, 6], [-4, -2, 2, 4]], grid: [3, 2], height: [360, 320], axisLabels: ["x", "y"],
    curves: [{ expr: "(2/3)*sqrt(x^2-9)", colour: "a1", domain: [3, 8] }, { expr: "-(2/3)*sqrt(x^2-9)", colour: "a1", domain: [3, 8] }, { expr: "(2/3)*sqrt(x^2-9)", colour: "a1", domain: [-8, -3] }, { expr: "-(2/3)*sqrt(x^2-9)", colour: "a1", domain: [-8, -3] }],
    points: [{ x: 3, y: 0, label: "(3, 0)", colour: "a2", dx: 8, dy: -12 }, { x: -3, y: 0, label: "(−3, 0)", colour: "a2", dx: -8, dy: -12, anchor: "end" }],
    checks: [{ type: "point", expr: "(2/3)*sqrt(x^2-9)", x: 3, y: 0, name: "(3, 0) is on 4x² − 9y² = 36" }, { type: "point", expr: "(2/3)*sqrt(x^2-9)", x: 5, y: 8 / 3, name: "(5, 8/3): 100 − 64 = 36" }, { type: "point", expr: "(2/3)*sqrt(x^2-9)", x: -3, y: 0, name: "(−3, 0) is on the curve" }], fromLesson: ["hyperbola, with vertices at (±3, 0)"] });

// ---------- u05-32 Parabolas: y² = 12x ----------
{
  must(Math.hypot(0, 6) === 6 && 3 - -3 === 6 && 6 * 6 === 12 * 3, "parabola");
  mk("u05-32", "maths-u05-focus-directrix", "graph", "(3, 6) is equidistant from the focus and directrix",
    "For y² = 12x, a = 3: the focus is (3, 0) and the directrix is x = −3. The point (3, 6) is 6 from the focus and 3 − (−3) = 6 from the directrix.",
    "The parabola y squared equals 12x with focus (3, 0), directrix x = −3 and the point (3, 6), which is 6 from both.",
    ["y² = 12x has 4a = 12, so a = 3.", "The focus is (3, 0) and the directrix is the line x = −3.", "The point (3, 6) is on the curve: 36 = 12 × 3.", "Its distance to the focus is 6, and to the directrix 6: equal."],
    { range: { x: [-5, 8], y: [-9, 9] }, ticks: [[-4, -2, 2, 4, 6, 8], [-8, -4, 4, 8]], grid: [2, 4], height: [360, 340], axisLabels: ["x", "y"],
      curves: [{ expr: "sqrt(12*x)", colour: "a1", domain: [0, 8] }, { expr: "-sqrt(12*x)", colour: "a1", domain: [0, 8] }], marks: [{ x: -3, label: "directrix x = −3", dx: 4 }],
      arrows: [{ from: [3, 6], to: [3, 0.3], colour: "a2", dash: "5 4", label: "6", labelAt: [3.2, 3], anchor: "start" }, { from: [3, 6], to: [-2.8, 6], colour: "a4", dash: "5 4", label: "6", labelAt: [0, 6.6], anchor: "middle" }],
      points: [{ x: 3, y: 0, label: "focus (3, 0)", colour: "a2", dx: -10, dy: 18, anchor: "end" }, { x: 3, y: 6, label: "(3, 6)", colour: "a1", dx: 12, dy: -12 }],
      checks: [{ type: "point", expr: "sqrt(12*x)", x: 3, y: 6, name: "(3, 6) is on y² = 12x" }], fromLesson: ["focus (3, 0), directrix x = −3"] });
}

// ---------- u05-33 Ellipses: 4x² + 9y² = 36 ----------
mk("u05-33", "maths-u05-ellipse-4-9", "graph", "The ellipse 4x² + 9y² = 36",
  "Dividing by 36 gives x²/9 + y²/4 = 1: semi-axes a = 3 and b = 2, area πab = 6π. The foci are at (±√5, 0), since c = √(9 − 4), so e = √5/3 ≈ 0.745.",
  "An ellipse crossing the x-axis at ±3 and the y-axis at ±2, with its two foci at plus and minus root 5 on the x-axis.",
  ["x²/9 + y²/4 = 1 gives a = 3 and b = 2.", "The ellipse crosses the axes at (±3, 0) and (0, ±2).", "The foci are c = √(9 − 4) = √5 from the centre, so e = √5/3 ≈ 0.745."],
  { range: { x: [-4, 4], y: [-3, 3] }, ticks: [[-3, -2, -1, 1, 2, 3], [-2, -1, 1, 2]], grid: [1, 1], height: [330, 300], axisLabels: ["x", "y"],
    curves: [{ expr: "(2/3)*sqrt(9-x^2)", colour: "a1", domain: [-3, 3] }, { expr: "-(2/3)*sqrt(9-x^2)", colour: "a1", domain: [-3, 3] }],
    points: [{ x: 3, y: 0, label: "(3, 0)", colour: "a2", dx: -4, dy: -12, anchor: "end" }, { x: 0, y: 2, label: "(0, 2)", colour: "a2", dx: 10, dy: -4 }, { x: Math.sqrt(5), y: 0, label: "focus", colour: "a4", dx: -8, dy: 22, anchor: "end" }, { x: -Math.sqrt(5), y: 0, label: "focus", colour: "a4", dx: 8, dy: 22, anchor: "start" }],
    checks: [{ type: "point", expr: "(2/3)*sqrt(9-x^2)", x: 0, y: 2, name: "(0, 2) is on 4x² + 9y² = 36" }, { type: "point", expr: "(2/3)*sqrt(9-x^2)", x: 3, y: 0, name: "(3, 0) is on the ellipse" }, { type: "point", expr: "(2/3)*sqrt(9-x^2)", x: Math.sqrt(5), y: 4 / 3, name: "(√5, 4/3): the point above a focus satisfies 20 + 16 = 36" }], fromLesson: ["a = 3 and b = 2"] });

// ---------- u05-34 Hyperbolas: 9x² - 16y² = 144 ----------
mk("u05-34", "maths-u05-hyperbola-foci", "graph", "9x² − 16y² = 144: foci and asymptotes",
  "Dividing by 144 gives x²/16 − y²/9 = 1, so a = 4, b = 3 and c² = 16 + 9 = 25: the foci are (±5, 0). The branches approach the asymptotes y = ±(3/4)x.",
  "A hyperbola with vertices at (4, 0) and (−4, 0), foci at (5, 0) and (−5, 0), and the dashed asymptotes y = 3/4 x and y = −3/4 x.",
  ["x²/16 − y²/9 = 1 gives a = 4 and b = 3.", "c² = a² + b² = 25, so the foci are (±5, 0).", "The branches approach the dashed asymptotes y = ±(3/4)x."],
  { range: { x: [-9, 9], y: [-7, 7] }, ticks: [[-8, -4, 4, 8], [-6, -3, 3, 6]], grid: [4, 3], height: [360, 320], axisLabels: ["x", "y"],
    curves: [{ expr: "0.75*sqrt(x^2-16)", colour: "a1", domain: [4, 9] }, { expr: "-0.75*sqrt(x^2-16)", colour: "a1", domain: [4, 9] }, { expr: "0.75*sqrt(x^2-16)", colour: "a1", domain: [-9, -4] }, { expr: "-0.75*sqrt(x^2-16)", colour: "a1", domain: [-9, -4] },
      { expr: "0.75*x", colour: "a4", dash: "5 4", domain: [-9, 9] }, { expr: "-0.75*x", colour: "a4", dash: "5 4", domain: [-9, 9] }],
    points: [{ x: 5, y: 0, label: "(5, 0)", colour: "a2", dx: 8, dy: 20 }, { x: -5, y: 0, label: "(−5, 0)", colour: "a2", dx: -8, dy: 20, anchor: "end" }, { x: 4, y: 0, label: "", colour: "a1" }, { x: -4, y: 0, label: "", colour: "a1" }],
    checks: [{ type: "point", expr: "0.75*sqrt(x^2-16)", x: 4, y: 0, name: "(4, 0) is on 9x² − 16y² = 144" }, { type: "point", expr: "0.75*sqrt(x^2-16)", x: 5, y: 2.25, name: "(5, 9/4): 225 − 81 = 144" }], fromLesson: ["Asymptotes y = ±(3/4)x"] });

// ---------- u05-39 Projective geometry: the cross-ratio of 0, 1, 3, 4 ----------
{
  const cr = (3 * 3) / (2 * 4); must(cr === 9 / 8, "cr");
  mk("u05-39", "maths-u05-cross-ratio", "number-line", "The cross-ratio (A, B; C, D) = 9/8",
    "With A, B, C, D at 0, 1, 3, 4 the distances are AC = 3, BD = 3, BC = 2, AD = 4, so (A, B; C, D) = (3 × 3)/(2 × 4) = 9/8.",
    "A number line with the four points A, B, C, D at 0, 1, 3 and 4.",
    ["The points A, B, C, D sit at 0, 1, 3 and 4.", "AC = 3, BD = 3, BC = 2 and AD = 4.", "The cross-ratio is (3 × 3)/(2 × 4) = 9/8, unchanged by any projection of the line."],
    { range: [-0.5, 4.5], ticks: { step: 1 }, minor: 0.5, points: [{ value: 0, label: "A" }, { value: 1, label: "B" }, { value: 3, label: "C" }, { value: 4, label: "D" }],
      checks: [{ type: "value", expr: "((3-0)*(4-1))/((3-1)*(4-0))", value: "9/8", name: "(AC × BD)/(BC × AD) = 9/8" }], fromLesson: ["9/8"] });
}

// ---------- u05-40 Fractal geometry: the Cantor set ----------
{
  const rows = [], D = Math.log(2) / Math.log(3); must(Math.abs(D - 0.6309) < 1e-4, "cantor");
  const level = (k) => { let segs = [[0, 27]]; for (let i = 0; i < k; i++) segs = segs.flatMap(([a, b]) => { const t = (b - a) / 3; return [[a, a + t], [b - t, b]]; }); return segs; };
  const list = []; for (let k = 0; k <= 3; k++) level(k).forEach(([a, b]) => list.push({ x: a, y: (3 - k) * 2.2, w: b - a, h: 1.2, colour: "a1", opacity: 0.45 }));
  const P = {}, polys = [], checks = [];
  list.forEach((t, i) => { const n = [`a${i}`, `b${i}`, `c${i}`, `d${i}`]; P[n[0]] = [t.x, t.y]; P[n[1]] = [t.x + t.w, t.y]; P[n[2]] = [t.x + t.w, t.y + t.h]; P[n[3]] = [t.x, t.y + t.h]; polys.push({ pts: n, colour: "a1", opacity: 0.45 }); });
  must(level(3).length === 8 && level(3).every(([a, b]) => b - a === 1), "cantor3");
  checks.push({ type: "area", polygon: ["a0", "b0", "c0", "d0"], value: 27 * 1.2, name: "step 0 is one interval of length 27" }, { type: "area", polygon: ["a7", "b7", "c7", "d7"], value: 1.2, name: "step 3 has pieces of length 1" });
  mk("u05-40", "maths-u05-cantor-set", "geometry", "The Cantor set: 2 pieces, each 1/3 the size",
    "Each step removes the middle third of every interval: 1 piece, then 2 of length 1/3, 4 of 1/9, 8 of 1/27. With N = 2 pieces scaled by r = 1/3, D = log 2 / log 3 ≈ 0.631.",
    "Four rows of bars: one interval of length 27, then 2 of 9, 4 of 3 and 8 of 1, each row removing the middle third of the row above.",
    ["Start with one interval, here of length 27.", "Remove the middle third of every interval, leaving 2, then 4, then 8 pieces.", "Each step keeps N = 2 pieces scaled by r = 1/3, so D = log 2 / log 3 ≈ 0.631."],
    { points: P, hide: Object.keys(P), polygons: polys, notes: [{ at: [13.5, -1.2], text: "D = log 2 / log 3 ≈ 0.631", colour: "a2", size: 13 }], view: { x: [-1, 28], y: [-2.2, 8] }, height: [300, 240], checks, fromLesson: ["D = log 2 / log 3"] });
}

// ---------- u05-41 Discrete geometry: Pick's theorem on the 3-4-5 triangle ----------
{
  const B = 8, I = 3, area = I + B / 2 - 1; must(area === 6 && 0.5 * 4 * 3 === 6, "pick");
  const P = { A: [0, 0], B: [4, 0], C: [0, 3] }, bd = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 1], [0, 2], [0, 3]], inn = [[1, 1], [2, 1], [1, 2]];
  bd.forEach((p, i) => (P[`P${i}`] = p)); inn.forEach((p, i) => (P[`I${i}`] = p));
  mk("u05-41", "maths-u05-picks-theorem", "geometry", "Pick's theorem on the 3-4-5 triangle",
    "The triangle has B = 8 lattice points on its boundary and I = 3 inside. Pick's theorem gives area = I + B/2 − 1 = 3 + 4 − 1 = 6, the same as ½ × 4 × 3.",
    "A right triangle with vertices (0, 0), (4, 0), (0, 3) on a grid, with 8 boundary lattice points and 3 interior ones marked.",
    ["The triangle has vertices (0, 0), (4, 0) and (0, 3).", "There are 8 lattice points on its boundary and 3 inside, at (1, 1), (2, 1) and (1, 2).", "Area = I + B/2 − 1 = 3 + 4 − 1 = 6, which agrees with ½ × 4 × 3."],
    { points: P, hide: Object.keys(P), grid: { step: 1, axes: true, labels: 1 }, polygons: [{ pts: ["A", "B", "C"], colour: "a1", opacity: 0.1 }], segments: [["A", "B"], ["B", "C"], ["C", "A"]],
      circles: [...bd.map((_, i) => ({ centre: `P${i}`, r: 0.11, colour: "a2" })), ...inn.map((_, i) => ({ centre: `I${i}`, r: 0.11, colour: "a4" }))],
      view: { x: [-1, 5.5], y: [-1, 4] }, height: [300, 280], checks: [{ type: "area", polygon: ["A", "B", "C"], value: 6, name: "the area is 3 + 8/2 − 1 = 6" }], fromLesson: ["Area = 3 + 4 − 1 = 6"] });
}

// ---------- u05-43 Computational geometry: a left turn at b ----------
{
  const a = [0, 0], b = [4, 1], c = [2, 3], x = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]); must(x === 10, "cross");
  mk("u05-43", "maths-u05-left-turn", "geometry", "Left or right turn: the cross product is 10",
    "The cross product (4 × 3) − (1 × 2) = 10 is positive, so a → b → c turns left. It is also twice the area of triangle abc: 10/2 = 5.",
    "The path from a(0, 0) to b(4, 1) to c(2, 3), turning anticlockwise.",
    ["a = (0, 0), b = (4, 1), c = (2, 3).", "Cross product = 4 × 3 − 1 × 2 = 10, positive: a left turn (anticlockwise).", "Half of it, 5, is the area of the triangle abc."],
    { points: { a, b, c }, grid: { step: 1, axes: true, labels: 1 }, polygons: [{ pts: ["a", "b", "c"], colour: "a1", opacity: 0.12 }], vectors: [{ from: [0, 0], v: [4, 1], colour: "a1", name: "ab", labelSide: -1 }, { from: [4, 1], v: [-2, 2], colour: "a2", name: "bc" }], labelAt: { a: [-12, 10], b: [12, 8], c: [0, -14] },
      view: { x: [-1, 5.5], y: [-1, 4] }, height: [320, 300], checks: [{ type: "area", polygon: ["a", "b", "c"], value: 5, name: "the triangle has area 10/2 = 5" }], fromLesson: ["Positive, so a → b → c turns left (anticlockwise)"] });
}

// ---------- u05-45 Differential geometry: y = x² and its osculating circle at the origin ----------
mk("u05-45", "maths-u05-curvature", "graph", "Curvature of y = x² at the origin",
  "At x = 0 the curvature is κ = 2, so the circle that best fits the parabola has radius 1/κ = ½: it touches at (0, 0) and its top is at (0, 1).",
  "The parabola y = x squared and the circle of radius one half centred at (0, 1/2), touching it at the origin.",
  ["y′ = 2x and y″ = 2, so at x = 0 the curvature is κ = 2/(1 + 0)^(3/2) = 2.", "The osculating circle has radius 1/κ = ½ and centre (0, ½).", "It hugs the parabola at the origin; at x = 1 the curvature is lower, 2/5^(3/2) ≈ 0.179."],
  { range: { x: [-1.5, 1.5], y: [-0.5, 2.5] }, ticks: [[-1, -0.5, 0.5, 1], [0.5, 1, 1.5, 2]], grid: [0.5, 0.5], height: [340, 320], axisLabels: ["x", "y"],
    curves: [{ expr: "x^2", colour: "a1" }, { expr: "0.5-sqrt(0.25-x^2)", colour: "a2", domain: [-0.5, 0.5] }, { expr: "0.5+sqrt(0.25-x^2)", colour: "a2", domain: [-0.5, 0.5] }],
    points: [{ x: 0, y: 0, label: "(0, 0)", colour: "a4", dx: 10, dy: 20 }, { x: 0, y: 1, label: "(0, 1)", colour: "a2", dx: 10, dy: -6 }],
    checks: [{ type: "point", expr: "x^2", x: 0, y: 0, name: "the parabola passes through the origin" }, { type: "point", expr: "0.5-sqrt(0.25-x^2)", x: 0, y: 0, name: "the circle of radius 1/2 touches at the origin" }, { type: "point", expr: "0.5+sqrt(0.25-x^2)", x: 0, y: 1, name: "the circle's top is (0, 1)" }], fromLesson: ["osculating circle radius ½"] });

// ---------- u05-48 Algebraic geometry: the circle and the parabola ----------
mk("u05-48", "maths-u05-bezout", "graph", "The circle x² + y² = 25 and the parabola y = x² − 5",
  "Bézout allows up to 4 intersections. Substituting gives y² + y − 20 = 0, so y = 4 or −5: the points (3, 4), (−3, 4) and (0, −5), where the parabola touches the circle's bottom.",
  "A circle of radius 5 and the parabola y = x squared minus 5 meeting at (3, 4), (−3, 4) and (0, −5).",
  ["The circle has degree 2 and the parabola degree 2, so Bézout allows at most 4 common points.", "Substitute x² = y + 5: y² + y − 20 = 0, so y = 4 or y = −5.", "y = 4 gives x = ±3; y = −5 gives x = 0 (a touching point)."],
  { range: { x: [-6, 6], y: [-7, 7] }, ticks: [[-4, -2, 2, 4], [-6, -3, 3, 6]], grid: [2, 3], height: [360, 340], axisLabels: ["x", "y"],
    curves: [{ expr: "sqrt(25-x^2)", colour: "a1", domain: [-5, 5] }, { expr: "-sqrt(25-x^2)", colour: "a1", domain: [-5, 5] }, { expr: "x^2-5", colour: "a2", domain: [-3.4, 3.4] }],
    points: [{ x: 3, y: 4, label: "(3, 4)", colour: "a4", dx: 8, dy: -10 }, { x: -3, y: 4, label: "(−3, 4)", colour: "a4", dx: -8, dy: -10, anchor: "end" }, { x: 0, y: -5, label: "(0, −5)", colour: "a4", dx: 12, dy: 20 }],
    checks: [{ type: "intersect", a: "sqrt(25-x^2)", b: "x^2-5", x: 3, y: 4, name: "(3, 4) is on both" }, { type: "intersect", a: "sqrt(25-x^2)", b: "x^2-5", x: -3, y: 4, name: "(−3, 4) is on both" }, { type: "intersect", a: "-sqrt(25-x^2)", b: "x^2-5", x: 0, y: -5, name: "(0, −5) is on both" }], fromLesson: ["Points (3, 4), (−3, 4) and (0, −5)"] });
