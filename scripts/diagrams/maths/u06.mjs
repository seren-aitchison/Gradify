// School 6, Trigonometry: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u06.mjs
import { mk } from "./spec.mjs";

const D2R = Math.PI / 180, deg = (r) => r / D2R, D = String(D2R);
const sd = (a) => Math.sin(a * D2R), cd = (a) => Math.cos(a * D2R);
const must = (c, m) => { if (!c) throw new Error(m); };
const r1 = (x) => Math.round(x * 10) / 10;
const ds = (x) => `${r1(x)}°`;
const T = (a, b) => [[...a], [...b]];
// a graph spec body in degrees
const G = (range, ticks, body) => ({ range, ticks, grid: [ticks[0].length > 1 ? ticks[0][1] - ticks[0][0] : 1, ticks[1].length > 1 ? Math.abs(ticks[1][1] - ticks[1][0]) : 1], height: [380, 340], axisLabels: ["x (degrees)", "y"], ...body });
const pt = (expr, x, y, name) => ({ type: "point", expr, x, y, name });
const X90 = [90, 180, 270, 360];
// tan x branches away from the asymptotes
const tanBranches = (from, to, colour = "a1") => { const out = []; for (let a = Math.ceil((from + 1e-9) / 180 - 0.5) ; a <= Math.floor(to / 180 + 0.5); a++) { const c = 90 + 180 * a, lo = Math.max(from, c - 90 + 0.4), hi = Math.min(to, c + 90 - 0.4); if (lo < hi) out.push({ expr: `tan(${D}*x)`, colour, domain: [lo, hi] }); } return out; };

// ---------- u06-01 Basic trigonometry ----------
{
  const C = [0, 0], A = [12, 0], B = [0, 5], AB = Math.hypot(12, 5); must(AB === 13, "5-12-13");
  mk("u06-01", "maths-u06-triangle-5-12-13", "geometry", "Naming the sides from angle A",
    "From the angle at A: the hypotenuse is AB = 13, opposite the right angle; the opposite side is BC = 5, across from A; the adjacent side is AC = 12, the other side touching A.",
    "A right-angled triangle with the right angle at C, AC = 12 along the bottom, BC = 5 up the side and the hypotenuse AB = 13. The angle at A is marked.",
    ["The right angle is at C, with AC = 12 and BC = 5.", "The hypotenuse AB = 13 is opposite the right angle.", "Looking from angle A, the side across from it is BC = 5: the opposite.", "The side next to A that is not the hypotenuse is AC = 12: the adjacent."],
    { points: { C, A, B }, polygons: [{ pts: ["C", "A", "B"], colour: "a1", opacity: 0.1 }], angles: [{ at: "C", from: "A", to: "B", right: true, colour: "ink" }, { at: "A", from: "B", to: "C", colour: "a2", r: 34 }],
      lengths: [{ a: "A", b: "C", value: 12, label: "adj 12", side: 1 }, { a: "B", b: "C", value: 5, label: "opp 5", side: 1 }, { a: "A", b: "B", value: 13, label: "hyp 13", colour: "a2", side: 1 }],
      labelAt: { C: [-12, 14], A: [14, 12], B: [0, -16] }, view: { x: [-9, 18], y: [-2.5, 7.5] }, height: [330, 330],
      checks: [{ type: "distance", a: "A", b: "B", value: "sqrt(144+25)", name: "AB = √(12² + 5²) = 13" }], fromLesson: ["AB = 13", "BC = 5", "AC = 12"] });
}

// ---------- u06-02 Trigonometric ratios: the ramp ----------
{
  const run = 8, rise = 1.2, th = deg(Math.atan(rise / run)), L = Math.hypot(run, rise);
  mk("u06-02", "maths-u06-ramp", "geometry", "The ramp as a right-angled triangle",
    `The ramp rises 1.2 m over 8 m: tan θ = 1.2/8 = 0.15, so θ = ${r1(th)}°. The slope is the hypotenuse, √(8² + 1.2²) = √65.44 ≈ ${(+L.toFixed(2))} m.`,
    `A flat triangle: 8 m along the ground, 1.2 m up at the end, and a sloping side of about ${(+L.toFixed(2))} m at an angle of ${r1(th)}° to the ground.`,
    ["The horizontal run is 8 m and the rise is 1.2 m.", "tan θ = opposite/adjacent = 1.2/8 = 0.15, so θ = tan⁻¹ 0.15 ≈ 8.5°.", "The slope length is the hypotenuse: √(64 + 1.44) = √65.44 ≈ 8.09 m."],
    { points: { P: [0, 0], Q: [run, 0], R: [run, rise] }, polygons: [{ pts: ["P", "Q", "R"], colour: "a1", opacity: 0.12 }], angles: [{ at: "Q", from: "P", to: "R", right: true, colour: "ink" }, { at: "P", from: "Q", to: "R", deg: +th.toFixed(1), tol: 0.1, label: "θ", colour: "a2", r: 60, labelR: 26 }],
      lengths: [{ a: "P", b: "Q", value: run, label: "8 m", side: 1 }, { a: "Q", b: "R", value: rise, label: "1.2 m" }, { a: "P", b: "R", value: +L.toFixed(4), tol: 0.01, label: `slope ≈ ${(+L.toFixed(2))} m`, colour: "a2", side: -1 }],
      labelAt: { P: [-12, 12], Q: [12, 14], R: [12, -10] }, view: { x: [-2, 10.5], y: [-1.6, 3.4] }, height: [260, 240],
      checks: [{ type: "distance", a: "P", b: "R", value: "sqrt(65.44)", name: "slope = √(8² + 1.2²) = √65.44" }], fromLesson: ["tan θ = 1.2/8 = 0.15"] });
}

// ---------- u06-03 .. 05 solving sin, cos, tan = k ----------
{
  const a = deg(Math.asin(0.6)), x1 = 180 + a, x2 = 360 - a;
  mk("u06-03", "maths-u06-sin-minus-06", "graph", "sin x = −0.6 has two solutions in a turn",
    `The line y = −0.6 meets the sine graph twice between 0° and 360°, in the third and fourth quadrants: x = 180° + 36.9° ≈ ${r1(x1)}° and x = 360° − 36.9° ≈ ${r1(x2)}°.`,
    `The sine graph from 0° to 360° with the line y = −0.6 crossing it at about 216.9° and 323.1°.`,
    ["The sine curve runs from 0 up to 1, down to −1 and back to 0.", "The horizontal line y = −0.6 sits below the axis.", `It meets the curve twice, at x ≈ ${r1(x1)}° and x ≈ ${r1(x2)}°.`],
    G({ x: [0, 360], y: [-1.3, 1.3] }, T(X90, [-1, 1]), { curves: [{ expr: `sin(${D}*x)`, colour: "a1" }], marks: [{ y: -0.6, label: "y = −0.6" }],
      points: [{ x: x1, y: -0.6, label: `${r1(x1)}°`, colour: "a2", dx: -8, dy: 22, anchor: "middle" }, { x: x2, y: -0.6, label: `${r1(x2)}°`, colour: "a2", dx: 0, dy: 22, anchor: "middle" }],
      checks: [pt(`sin(${D}*x)`, x1, -0.6, `sin ${r1(x1)}° = −0.6`), pt(`sin(${D}*x)`, x2, -0.6, `sin ${r1(x2)}° = −0.6`)], fromLesson: ["x ≈ 216.9° or x ≈ 323.1°"] }));
}
mk("u06-04", "maths-u06-cos-minus-half", "graph", "cos x = −½ has solutions 120° and 240°",
  "2cos x + 1 = 0 means cos x = −½. The line y = −½ meets the cosine graph at x = 180° − 60° = 120° and x = 180° + 60° = 240°, symmetric about 180°.",
  "The cosine graph from 0° to 360° with the line y = −0.5 crossing it at 120° and 240°.",
  ["The cosine curve starts at 1, falls to −1 at 180° and returns to 1.", "The line y = −½ cuts it on the way down and on the way up.", "The crossings are at 120° and 240°, 60° either side of 180°."],
  G({ x: [0, 360], y: [-1.3, 1.3] }, T(X90, [-1, 1]), { curves: [{ expr: `cos(${D}*x)`, colour: "a1" }], marks: [{ y: -0.5, label: "y = −½" }],
    points: [120, 240].map((x) => ({ x, y: -0.5, label: `${x}°`, colour: "a2", dx: 0, dy: 22, anchor: "middle" })), checks: [120, 240].map((x) => pt(`cos(${D}*x)`, x, -0.5, `cos ${x}° = −½`)), fromLesson: ["x = 180° − 60° = 120° or x = 180° + 60° = 240°"] }));
{
  const a = deg(Math.atan(4 / 3)), x2 = a + 180;
  mk("u06-05", "maths-u06-tan-four-thirds", "graph", "tan x = 4/3 repeats every 180°",
    `The tangent graph repeats every 180°, so the line y = 4/3 meets it at x ≈ ${r1(a)}° and again 180° later at x ≈ ${r1(x2)}°.`,
    "The tangent graph from 0° to 360° in three branches with the line y = 4/3 crossing the first and third branches at about 53.1° and 233.1°.",
    ["The tangent graph has vertical asymptotes at 90° and 270° and repeats every 180°.", "The line y = 4/3 crosses the first branch at tan⁻¹(4/3) ≈ 53.1°.", "It crosses the third branch exactly 180° later, at ≈ 233.1°."],
    G({ x: [0, 360], y: [-4, 4] }, T(X90, [-4, -2, 2, 4]), { curves: tanBranches(0, 360), marks: [{ y: 4 / 3, label: "y = 4/3" }],
      points: [{ x: a, y: 4 / 3, label: `${r1(a)}°`, colour: "a2", dx: -8, dy: -12, anchor: "end" }, { x: x2, y: 4 / 3, label: `${r1(x2)}°`, colour: "a2", dx: -8, dy: -12, anchor: "end" }],
      checks: [pt(`tan(${D}*x)`, a, 4 / 3, "tan 53.1° = 4/3"), pt(`tan(${D}*x)`, x2, 4 / 3, "tan 233.1° = 4/3")], fromLesson: ["x ≈ 53.1° or x ≈ 233.1°"] }));
}

// ---------- u06-06 Radians and degrees ----------
{
  const P = [cd(150), sd(150)];
  mk("u06-06", "maths-u06-radians-150", "geometry", "150° is 5π/6 radians",
    "A full turn is 360° = 2π radians, so 1° = π/180 and 150° = 150 × π/180 = 5π/6. On the unit circle the arc from (1, 0) to the point at 150° has length 5π/6 ≈ 2.62.",
    "The unit circle with an angle of 150° at the centre, measured anticlockwise from the positive x-axis and labelled 150° = 5π/6.",
    ["Draw the unit circle and measure from the positive x-axis.", "The radius to the point at 150° turns past the vertical, into the second quadrant.", "In radians, 150° = 150 × π/180 = 5π/6."],
    { points: { O: [0, 0], X: [1, 0], P }, hide: ["O"], grid: { step: 0.5, axes: true, labels: 5 }, circles: [{ centre: "O", r: 1 }], segments: [{ a: "O", b: "X", colour: "ink" }, { a: "O", b: "P", colour: "a2", w: 3 }],
      angles: [{ at: "O", from: "X", to: "P", deg: 150, label: "", colour: "a2", r: 34 }], notes: [{ at: [0.25, 0.2], text: "150°", colour: "a2", size: 13 }, { at: [-0.4, -0.2], text: "= 5π/6 radians", colour: "a2", size: 13 }], labelAt: { X: [14, 14], P: [-16, -10] }, view: { x: [-1.5, 1.6], y: [-1.3, 1.3] }, height: [340, 320],
      checks: [{ type: "onCircle", points: ["X", "P"], name: "(1, 0) and the point at 150° lie on the unit circle" }, { type: "value", expr: "150*pi/180", value: "5*pi/6", name: "150 × π/180 = 5π/6" }], fromLesson: ["150 × π/180 = 5π/6"] });
}

// ---------- u06-07 Unit circle: 240° ----------
{
  const P = [cd(240), sd(240)];
  must(Math.abs(P[0] + 0.5) < 1e-12 && Math.abs(P[1] + Math.sqrt(3) / 2) < 1e-12, "240");
  mk("u06-07", "maths-u06-unit-circle-240", "geometry", "240° on the unit circle",
    "The point at 240° is in the third quadrant, 60° past the negative x-axis. Its coordinates are (cos 240°, sin 240°) = (−½, −√3/2), so tan 240° = sin/cos = √3.",
    "The unit circle with the point at 240° in the third quadrant at (−0.5, −0.866), its reference angle of 60° marked at the centre, and dashed lines to the axes.",
    ["Turn 240° anticlockwise from the positive x-axis: the point is in the third quadrant.", "It is 60° past the negative x-axis, so the reference angle is 60°.", "Its x-coordinate is cos 240° = −cos 60° = −½.", "Its y-coordinate is sin 240° = −sin 60° = −√3/2, so tan 240° = (−√3/2)/(−½) = √3."],
    { points: { O: [0, 0], X: [1, 0], N: [-1, 0], P, F: [P[0], 0] }, hide: ["O", "X", "N", "F"], grid: { step: 0.5, axes: true, labels: 5 }, circles: [{ centre: "O", r: 1 }], segments: [{ a: "O", b: "P", colour: "a2", w: 3 }, { a: "P", b: "F", colour: "a1", dash: "5 4" }],
      angles: [{ at: "O", from: "N", to: "P", deg: 60, label: "60°", colour: "a3", r: 28, labelR: 6 }],
      lengths: [{ a: "O", b: "F", value: 0.5, label: "cos = −½", colour: "a1", side: 1 }, ],
      notes: [{ at: [-1.85, -0.45], text: "sin 240° = −√3/2", colour: "a1", size: 13 }],
      labelAt: { P: [-4, 18] }, view: { x: [-2.6, 1.6], y: [-1.35, 1.35] }, height: [350, 330],
      checks: [{ type: "onCircle", points: ["P"], name: "the point at 240° lies on the unit circle" }, { type: "distance", a: "P", b: "F", value: "sqrt(3)/2", name: "the dashed drop from the point has length √3/2 = |sin 240°|" }, { type: "value", expr: "(-sqrt(3)/2)/(-1/2)", value: "sqrt(3)", name: "tan 240° = sin/cos = √3" }, { type: "angle", at: "O", from: "X", to: "P", deg: 120, name: "the shorter angle from the positive x-axis is 120°, so the turn is 240°" }],
      fromLesson: ["tan 240° = sin/cos = √3"] });
}

// ---------- u06-08 Trigonometric geometry: cuboid ----------
{
  const bd = Math.hypot(6, 8), sdg = Math.hypot(bd, 5), th = deg(Math.atan(5 / bd)); must(bd === 10, "base diagonal");
  mk("u06-08", "maths-u06-cuboid-diagonal", "geometry", "The angle between a space diagonal and the base",
    `Take the right-angled triangle formed by the base diagonal, the vertical edge and the space diagonal. The base diagonal is √(36 + 64) = 10 cm and the edge is 5 cm, so tan θ = 5/10 and θ = ${r1(th)}°.`,
    `A right-angled triangle with a base of 10 cm (the diagonal of the 6 by 8 base), a height of 5 cm, and the space diagonal √125 ≈ ${sdg.toFixed(2)} cm, making ${r1(th)}° with the base.`,
    ["The base is 6 cm by 8 cm, so its diagonal is √(36 + 64) = 10 cm.", "The space diagonal rises 5 cm over that 10 cm of horizontal distance.", "tan θ = 5/10 = 0.5, so θ = tan⁻¹ 0.5 ≈ 26.6°."],
    { points: { A: [0, 0], M: [10, 0], T: [10, 5] }, polygons: [{ pts: ["A", "M", "T"], colour: "a1", opacity: 0.1 }], angles: [{ at: "M", from: "A", to: "T", right: true, colour: "ink" }, { at: "A", from: "M", to: "T", deg: +th.toFixed(1), tol: 0.1, label: "", colour: "a2", r: 70 }],
      lengths: [{ a: "A", b: "M", value: 10, label: "10", side: 1 }, { a: "M", b: "T", value: 5, label: "5" }, { a: "A", b: "T", value: +sdg.toFixed(4), tol: 0.01, label: "√125", colour: "a2", side: 1 }],
      labelAt: { A: [-12, 14], M: [12, 14], T: [12, -8] }, view: { x: [-2.5, 13.5], y: [-2, 7.5] }, height: [260, 250],
      checks: [{ type: "distance", a: "A", b: "M", value: "sqrt(36+64)", name: "base diagonal = √(6² + 8²) = 10" }, { type: "angle", at: "A", from: "M", to: "T", deg: 26.57, tol: 0.05, name: "tan⁻¹(5/10) = 26.57°" }], fromLesson: ["tan θ = 5/10"] });
}

// ---------- u06-09 Sine rule ----------
{
  const P_ = 52, Q_ = 71, R_ = 180 - P_ - Q_, r = 15, p = (r * sd(P_)) / sd(R_), q = (r * sd(Q_)) / sd(R_);
  must(R_ === 57, "R");
  const Pt = [0, 0], Qt = [r, 0], Rt = [q * cd(P_), q * sd(P_)];
  mk("u06-09", "maths-u06-sine-rule", "geometry", "The sine rule in triangle PQR",
    `With P = 52°, Q = 71° and so R = 57°, each side over the sine of its opposite angle is the same: p/sin 52° = 15/sin 57°, giving p = 15 sin 52°/sin 57° ≈ ${r1(p)} cm.`,
    `A triangle PQR drawn to scale with angles 52° at P, 71° at Q, 57° at R, PQ = 15 cm opposite R, and QR = p ≈ ${r1(p)} cm opposite P.`,
    ["The angles add to 180°, so R = 180° − 52° − 71° = 57°.", "Side r = PQ = 15 cm is opposite R.", "The sine rule gives p/sin 52° = 15/sin 57°.", `So p = 15 sin 52°/sin 57° ≈ ${r1(p)} cm.`],
    { points: { P: Pt, Q: Qt, R: Rt }, polygons: [{ pts: ["P", "Q", "R"], colour: "a1", opacity: 0.1 }],
      angles: [{ at: "P", from: "Q", to: "R", deg: P_, label: "52°", colour: "a2", r: 38 }, { at: "Q", from: "R", to: "P", deg: Q_, label: "71°", colour: "a3", r: 30, labelR: 12 }, { at: "R", from: "P", to: "Q", deg: R_, label: "57°", colour: "a4", r: 28, labelR: 14 }],
      lengths: [{ a: "P", b: "Q", value: r, label: "r = 15 cm", side: -1 }, { a: "Q", b: "R", value: +p.toFixed(4), tol: 0.01, label: `p ≈ ${r1(p)} cm`, colour: "a2" }],
      labelAt: { P: [-12, 14], Q: [12, 14], R: [0, -16] }, view: { x: [-3, 18], y: [-3, 15] }, height: [360, 340],
      checks: [{ type: "angleSum", angles: [0, 1, 2], total: 180 }, { type: "value", expr: "15*sin(52*pi/180)/sin(57*pi/180)", value: p, tol: 1e-6, name: "p = 15 sin 52°/sin 57°" }], fromLesson: ["R = 180 − 52 − 71 = 57°"] });
}

// ---------- u06-10 Cosine rule: ships ----------
{
  const a = 40, b = 110, A = [12 * sd(a), 12 * cd(a)], B = [15 * sd(b), 15 * cd(b)], d = Math.hypot(A[0] - B[0], A[1] - B[1]);
  mk("u06-10", "maths-u06-ships", "geometry", "How far apart are the ships?",
    `The paths are 110° − 40° = 70° apart, so the cosine rule gives d² = 12² + 15² − 2 × 12 × 15 × cos 70° ≈ ${r1(d * d)}, and d ≈ ${r1(d)} km.`,
    `A plan view: the port O, ship A 12 km away on bearing 040° and ship B 15 km away on bearing 110°, with 70° between the paths and AB ≈ ${r1(d)} km.`,
    ["Bearings are measured clockwise from north: the first ship sails 12 km on 040°, the second 15 km on 110°.", "The angle between the two paths at the port is 110° − 40° = 70°.", "Cosine rule: d² = 144 + 225 − 360 cos 70° ≈ 245.9.", `So d ≈ ${r1(d)} km.`],
    { points: { O: [0, 0], N: [0, 16], A, B }, hide: ["N"], labelAt: { O: [-14, 12], A: [-4, -16], B: [14, 8] }, segments: [{ a: "O", b: "N", colour: "soft", dash: "5 4" }, { a: "O", b: "A", colour: "a1", w: 3 }, { a: "O", b: "B", colour: "a2", w: 3 }, { a: "A", b: "B", colour: "ink", dash: "6 4" }],
      angles: [{ at: "O", from: "N", to: "A", deg: 40, label: "40°", colour: "soft", r: 40 }, { at: "O", from: "A", to: "B", deg: 70, label: "70°", colour: "a3", r: 30, labelR: 16 }],
      lengths: [{ a: "O", b: "A", value: 12, label: "12 km", colour: "a1", side: 1 }, { a: "O", b: "B", value: 15, label: "15 km", colour: "a2", side: -1 }, { a: "A", b: "B", value: +d.toFixed(4), tol: 0.01, label: `d ≈ ${r1(d)} km`, colour: "ink" }],
      notes: [{ at: [0.8, 15], text: "N", colour: "soft" }], view: { x: [-5, 19], y: [-5, 16.5] }, height: [380, 340],
      checks: [{ type: "value", expr: "sqrt(144+225-360*cos(70*pi/180))", value: d, tol: 1e-6, name: "d = √(12² + 15² − 2·12·15·cos 70°)" }], fromLesson: ["110° − 40° = 70°"] });
}

// ---------- u06-11 Area of a triangle ----------
{
  const C = [7 * cd(120), 7 * sd(120)], ar = (63 * Math.sqrt(3)) / 4;
  mk("u06-11", "maths-u06-triangle-area", "geometry", "Area = ½ab sin C",
    `Two sides of 7 cm and 9 cm enclose 120°, so the area is ½ × 7 × 9 × sin 120° = 63√3/4 ≈ ${r1(ar)} cm². The angle may be obtuse: sin 120° = sin 60° = √3/2.`,
    "A triangle with sides 9 cm along the bottom and 7 cm rising to the left, with an obtuse angle of 120° between them.",
    ["Two sides of 7 cm and 9 cm meet at an angle of 120°.", "Area = ½ × 7 × 9 × sin 120°.", "sin 120° = √3/2, so the area is 63√3/4 ≈ 27.3 cm²."],
    { points: { A: [0, 0], B: [9, 0], C }, polygons: [{ pts: ["A", "B", "C"], colour: "a1", opacity: 0.12 }], angles: [{ at: "A", from: "B", to: "C", deg: 120, label: "120°", colour: "a2", r: 26, labelR: 8 }],
      lengths: [{ a: "A", b: "B", value: 9, label: "9 cm", side: -1 }, { a: "A", b: "C", value: 7, label: "7 cm" }], labelAt: { A: [8, 18], B: [12, 12], C: [-10, -12] }, notes: [{ at: [2.0, 2.7], text: `≈ ${r1(ar)} cm²`, colour: "a1", size: 13 }], view: { x: [-7, 11], y: [-2, 8] }, height: [300, 290],
      checks: [{ type: "area", polygon: ["A", "B", "C"], value: "63*sqrt(3)/4", tol: 1e-6, name: "area = ½ × 7 × 9 × sin 120° = 63√3/4" }], fromLesson: ["Area = ½ × 7 × 9 × sin 120°"] });
}

// ---------- u06-12 Spherical trigonometry ----------
{
  const R = 6371, d = (R * Math.PI) / 2;
  mk("u06-12", "maths-u06-great-circle", "geometry", "Two points on the equator, 90° apart",
    `Seen from above the pole, the equator is a circle of radius R = 6,371 km. Points at longitudes 0° and 90° make a central angle of 90° = π/2, so the great-circle distance is R × π/2 ≈ ${Math.round(d).toLocaleString("en-GB")} km.`,
    "The equator as a circle with two points on it, at longitude 0° and longitude 90°, joined to the centre with a right angle between the radii.",
    ["Look down on the equator: a circle of radius R = 6,371 km.", "The points at 0° and 90° longitude are a quarter of the way round.", "The central angle is 90° = π/2 radians, so the arc length is 6,371 × π/2 ≈ 10,008 km."],
    { points: { O: [0, 0], A: [1, 0], B: [0, 1] }, circles: [{ centre: "O", r: 1 }], segments: [["O", "A"], ["O", "B"]], hide: ["O"], angles: [{ at: "O", from: "A", to: "B", right: true, colour: "a2" }], labelAt: { A: [20, 6], B: [0, -16] },
      notes: [{ at: [-0.4, -0.5], text: "R = 6,371 km", colour: "soft", size: 13 }, { at: [0.55, 0.62], text: "90° = π/2", colour: "a2", size: 13 }], lengths: [], view: { x: [-1.5, 1.7], y: [-1.3, 1.3] }, height: [320, 300],
      checks: [{ type: "onCircle", points: ["A", "B"], name: "both points lie on the equator" }, { type: "value", expr: "6371*pi/2", value: d, tol: 1e-6, name: "6,371 × π/2 ≈ 10,008 km" }], fromLesson: ["Distance = 6,371 × π/2 ≈ 10,008 km"] });
}

// ---------- u06-13 Trigonometric graphs ----------
mk("u06-13", "maths-u06-shifted-cosine", "graph", "y = 2cos(x − 30°) − 1",
  "The cosine curve is stretched to amplitude 2, shifted 30° right and 1 down: its maximum is 2 − 1 = 1 at x = 30° and its minimum is −2 − 1 = −3 at x = 210°.",
  "The graph of y = 2cos(x − 30°) − 1 from 0° to 360° with its maximum at (30°, 1) and minimum at (210°, −3) marked.",
  ["The curve oscillates about the midline y = −1 with amplitude 2.", "Its peak is 30° to the right of the usual cosine peak at 0°: maximum (30°, 1).", "Its lowest point is half a period later, at (210°, −3)."],
  G({ x: [0, 360], y: [-4, 2] }, T(X90, [-3, -1, 1]), { curves: [{ expr: `2*cos(${D}*(x-30))-1`, colour: "a1" }], marks: [{ y: -1, label: "midline y = −1" }],
    points: [{ x: 30, y: 1, label: "max (30°, 1)", colour: "a2", dx: 10, dy: -6 }, { x: 210, y: -3, label: "min (210°, −3)", colour: "a2", dx: 12, dy: 4 }],
    checks: [{ type: "max", expr: `2*cos(${D}*(x-30))-1`, domain: [0, 360], x: 30, y: 1, name: "the maximum is 1 at x = 30°" }, { type: "min", expr: `2*cos(${D}*(x-30))-1`, domain: [0, 360], x: 210, y: -3, name: "the minimum is −3 at x = 210°" }], fromLesson: ["Maximum 2 − 1 = 1, at x = 30°"] }));

// ---------- u06-14 Periodic functions: harbour ----------
{
  const W = Math.PI / 6, f = `5+3*sin(${W}*x)`;
  mk("u06-14", "maths-u06-harbour-depth", "graph", "Harbour depth d = 5 + 3 sin(πt/6)",
    "The depth swings 3 m either side of 5 m. One full cycle takes 2π ÷ (π/6) = 12 hours, so the peaks at t = 3 and t = 15 are 12 hours apart, and the maximum depth is 5 + 3 = 8 m.",
    "A wave of depth against time for 24 hours, with its peaks of 8 m at 3 and 15 hours, troughs of 2 m, and an arrow marking the period of 12 hours.",
    ["The depth is d = 5 + 3 sin(πt/6), centred on 5 m with amplitude 3 m.", "The period is 2π ÷ (π/6) = 12 hours.", "The maximum occurs when sin = 1: d = 5 + 3 = 8 m, first at t = 3 hours."],
    { ...G({ x: [0, 24], y: [0, 10] }, T([6, 12, 18, 24], [2, 4, 6, 8, 10]), { axisLabels: ["t (hours)", "d (m)"] }), curves: [{ expr: f, colour: "a1" }], marks: [{ y: 5, label: "mean depth 5 m" }],
      arrows: [{ from: [3, 9.2], to: [15, 9.2], both: true, colour: "a2", label: "period 12 hours", labelAt: [9, 9.7], anchor: "middle" }], points: [{ x: 3, y: 8, label: "8 m", colour: "a2", dx: -8, dy: 22, anchor: "end" }, { x: 15, y: 8, colour: "a2" }],
      checks: [{ type: "max", expr: f, domain: [0, 12], x: 3, y: 8, name: "the first maximum is 8 m at t = 3" }, pt(f, 15, 8, "the next maximum is at t = 15, 12 hours later"), pt(f, 12, 5, "after one period the depth is back to 5 m")], fromLesson: ["Period = 2π ÷ (π/6) = 12 hours"] });
}

// ---------- u06-15 Cosecant ----------
{
  const a = deg(Math.asin(0.5)), x1 = 180 + a, x2 = 360 - a, f = `1/sin(${D}*x)`, br = (c) => ({ expr: f, colour: c, domain: [0.5, 179.5] });
  mk("u06-15", "maths-u06-cosec-minus-2", "graph", "cosec x = −2",
    "cosec x = 1/sin x has branches above 1 and below −1. The line y = −2 meets only the lower branch, twice: where sin x = −½, at x = 210° and 330°.",
    "The cosecant graph from 0° to 360°: an upward U on 0°–180° and a downward U on 180°–360°, with the line y = −2 meeting the lower branch at 210° and 330°.",
    ["cosec x is 1/sin x, so it has asymptotes wherever sin x = 0: at 0°, 180° and 360°.", "Between 0° and 180° the branch lies above y = 1; between 180° and 360° it lies below y = −1.", "The line y = −2 cuts the lower branch at 210° and 330°, where sin x = −½."],
    G({ x: [0, 360], y: [-5, 5] }, T(X90, [-4, -2, 2, 4]), { curves: [br("a1"), { expr: f, colour: "a1", domain: [180.5, 359.5] }], marks: [{ y: -2, label: "y = −2" }],
      points: [210, 330].map((x) => ({ x, y: -2, label: `${x}°`, colour: "a2", dx: 0, dy: -16, anchor: "middle" })), checks: [210, 330].map((x) => pt(f, x, -2, `cosec ${x}° = −2`)), fromLesson: ["x = 210° or x = 330°"] }));
}

// ---------- u06-16 Secant lesson: tan roots ----------
{
  const t1 = (3 + Math.sqrt(17)) / 4, t2 = (3 - Math.sqrt(17)) / 4, x1 = deg(Math.atan(t1)), x2 = 180 + deg(Math.atan(t2));
  mk("u06-16", "maths-u06-sec-tan-roots", "graph", "The two tan values from the quadratic",
    `Replacing sec²x gives 2tan²x − 3tan x − 1 = 0, so tan x = (3 ± √17)/4 ≈ ${(+t1.toFixed(3))} or ${(+t2.toFixed(3))}. On 0° ≤ x < 180° each value meets the tangent graph once: x ≈ ${r1(x1)}° and x ≈ ${r1(x2)}°.`,
    "The tangent graph from 0° to 180° in two branches. The line y = 1.781 meets the first branch at about 60.7° and the line y = −0.281 meets the second branch at about 164.3°.",
    ["The quadratic in tan x has roots tan x ≈ 1.781 and tan x ≈ −0.281.", "tan x = 1.781 gives x ≈ 60.7° on the first branch.", "tan x = −0.281 is negative, so it lies on the second branch: x = 180° − 15.7° ≈ 164.3°."],
    G({ x: [0, 180], y: [-3, 3] }, T([45, 90, 135, 180], [-2, -1, 1, 2]), { curves: tanBranches(0, 180), marks: [{ y: t1, label: "y = 1.781" }, { y: t2, label: "y = −0.281" }],
      points: [{ x: x1, y: t1, label: `${r1(x1)}°`, colour: "a2", dx: -8, dy: -12, anchor: "end" }, { x: x2, y: t2, label: `${r1(x2)}°`, colour: "a2", dx: 10, dy: -14, anchor: "start" }],
      checks: [pt(`tan(${D}*x)`, x1, t1, "tan 60.7° = (3 + √17)/4"), pt(`tan(${D}*x)`, x2, t2, "tan 164.3° = (3 − √17)/4")], fromLesson: ["x ≈ 60.7° or x ≈ 164.3°"] }));
}

// ---------- u06-17 Cotangent ----------
{
  const s3 = Math.sqrt(3), xs = [60, 120, 240, 300], ys = [s3, -s3, s3, -s3];
  mk("u06-17", "maths-u06-cot-roots", "graph", "3cot²x = 1 gives tan x = ±√3",
    "cot²x = 1/3 means tan²x = 3, so tan x = √3 or −√3. Each line meets the tangent graph twice in a turn: x = 60° and 240° for +√3, 120° and 300° for −√3.",
    "The tangent graph from 0° to 360° with the lines y = √3 and y = −√3 each crossing it twice, at 60°, 240° and at 120°, 300°.",
    ["3 cot²x = 1 gives cot²x = 1/3, so tan²x = 3.", "tan x = √3 ≈ 1.73 at 60° and 240°.", "tan x = −√3 at 120° and 300°.", "That is four solutions in one turn."],
    G({ x: [0, 360], y: [-4, 4] }, T(X90, [-3, -1, 1, 3]), { curves: tanBranches(0, 360), marks: [{ y: s3, label: "y = √3" }, { y: -s3, label: "y = −√3" }],
      points: xs.map((x, i) => ({ x, y: ys[i], label: `${x}°`, colour: "a2", dx: ys[i] > 0 ? -8 : 8, dy: ys[i] > 0 ? -12 : 20, anchor: ys[i] > 0 ? "end" : "start" })),
      checks: xs.map((x, i) => pt(`tan(${D}*x)`, x, ys[i], `tan ${x}° = ${ys[i] > 0 ? "" : "−"}√3`)), fromLesson: ["x = 60°, 120°, 240°, 300°"] }));
}

// ---------- u06-18 Inverse trig: cos(arcsin 3/5) ----------
{
  const th = deg(Math.asin(3 / 5));
  mk("u06-18", "maths-u06-arcsin-triangle", "geometry", "cos(arcsin(3/5)) from a 3-4-5 triangle",
    `θ = arcsin(3/5) is the angle whose opposite side is 3 and hypotenuse 5, so the adjacent side is 4 and cos θ = 4/5. The angle is ${r1(th)}°, in [−π/2, π/2], where cosine is positive.`,
    `A right-angled triangle with hypotenuse 5, opposite side 3, adjacent side 4 and the angle θ ≈ ${r1(th)}° at the origin.`,
    ["sin θ = 3/5: draw a right-angled triangle with opposite 3 and hypotenuse 5.", "The adjacent side is √(25 − 9) = 4.", "cos θ = adjacent/hypotenuse = 4/5."],
    { points: { O: [0, 0], A: [4, 0], B: [4, 3] }, polygons: [{ pts: ["O", "A", "B"], colour: "a1", opacity: 0.1 }], angles: [{ at: "A", from: "O", to: "B", right: true, colour: "ink" }, { at: "O", from: "A", to: "B", deg: +th.toFixed(1), tol: 0.1, label: "θ", colour: "a2", r: 40, labelR: 24 }],
      lengths: [{ a: "O", b: "A", value: 4, label: "adj 4", side: 1 }, { a: "A", b: "B", value: 3, label: "opp 3" }, { a: "O", b: "B", value: 5, label: "hyp 5", colour: "a2", side: 1 }], labelAt: { O: [-12, 12], A: [12, 14], B: [12, -8] }, view: { x: [-2, 7], y: [-1.5, 4.6] }, height: [290, 280],
      checks: [{ type: "distance", a: "O", b: "B", value: "sqrt(16+9)", name: "hypotenuse = √(4² + 3²) = 5" }, { type: "value", expr: "sqrt(1-9/25)", value: "4/5", name: "cos θ = √(1 − 9/25) = 4/5" }], fromLesson: ["cos θ = √(1 − 9/25)"] });
}

// ---------- u06-19 Sinusoidal modelling ----------
{
  const w = Math.PI / 5, f = `22-20*cos(${w}*x)`;
  mk("u06-19", "maths-u06-ferris-wheel", "graph", "h(t) = 22 − 20cos(πt/5)",
    "The rider oscillates about the centre height 22 m with amplitude 20 m, so h runs from 2 m to 42 m. A turn takes 10 minutes, and starting at the bottom means −cos: h(0) = 22 − 20 = 2.",
    "A wave of height against time for 20 minutes starting at the minimum 2 m at t = 0, rising to 42 m at t = 5 minutes and back to 2 m at t = 10 minutes.",
    ["The midline is the centre height, 22 m, and the amplitude is the radius, 20 m.", "The period is 10 minutes, so B = 2π/10 = π/5.", "A cosine starts at its maximum; the rider starts at the minimum, so use −cos.", "h(t) = 22 − 20 cos(πt/5): minimum 2 m at t = 0, maximum 42 m at t = 5."],
    { ...G({ x: [0, 20], y: [0, 45] }, T([5, 10, 15, 20], [10, 20, 30, 40]), { axisLabels: ["t (minutes)", "h (m)"] }), curves: [{ expr: f, colour: "a1" }], marks: [{ y: 22, label: "centre 22 m" }],
      points: [{ x: 0, y: 2, label: "2 m", colour: "a2", dx: 10, dy: -8 }, { x: 5, y: 42, label: "42 m", colour: "a2", dx: 10, dy: -6 }, { x: 10, y: 2, colour: "a2" }],
      checks: [{ type: "min", expr: f, domain: [0, 10], x: 0, y: 2, tol: 0.02, name: "the rider starts at the minimum, 2 m" }, { type: "max", expr: f, domain: [0, 10], x: 5, y: 42, name: "the maximum is 42 m at t = 5" }, pt(f, 10, 2, "back at the bottom after 10 minutes")], fromLesson: ["h(t) = 22 − 20 cos(πt/5) metres"] });
}

// ---------- u06-20 Harmonic functions ----------
{
  const ph = deg(Math.atan2(4, 3)), a = deg(Math.asin(0.4)), x1 = 180 - a - ph, x2 = 360 + a - ph, f = `3*sin(${D}*x)+4*cos(${D}*x)`;
  mk("u06-20", "maths-u06-harmonic-roots", "graph", "3 sin x + 4 cos x = 2",
    `3 sin x + 4 cos x = 5 sin(x + 53.13°) is a wave of amplitude 5. The line y = 2 meets it twice in a turn, at x ≈ ${r1(x1)}° and x ≈ ${r1(x2)}°.`,
    `The graph of 3 sin x + 4 cos x from 0° to 360°, peaking at 5 and bottoming at −5, with the line y = 2 crossing it at about ${r1(x1)}° and ${r1(x2)}°.`,
    ["3 sin x + 4 cos x combines into 5 sin(x + 53.13°): amplitude 5.", "Solving sin(x + 53.13°) = 0.4 gives the two crossings with y = 2.", `They are at x ≈ ${r1(x1)}° and x ≈ ${r1(x2)}°.`],
    G({ x: [0, 360], y: [-6, 6] }, T(X90, [-5, -2, 2, 5]), { curves: [{ expr: f, colour: "a1" }], marks: [{ y: 2, label: "y = 2" }],
      points: [{ x: x1, y: 2, label: `${r1(x1)}°`, colour: "a2", dx: 10, dy: -12 }, { x: x2, y: 2, label: `${r1(x2)}°`, colour: "a2", dx: -10, dy: -12, anchor: "end" }],
      checks: [pt(f, x1, 2, `3 sin ${r1(x1)}° + 4 cos ${r1(x1)}° = 2`), pt(f, x2, 2, `3 sin ${r1(x2)}° + 4 cos ${r1(x2)}° = 2`), { type: "max", expr: f, domain: [0, 360], x: 90 - ph, y: 5, tol: 0.01, name: "the amplitude is 5, at x = 36.9°" }], fromLesson: ["x ≈ 103.3° or x ≈ 330.4°"] }));
}

// ---------- u06-22 Compound angles: cos 75° ----------
{
  const M = [cd(45), sd(45)], P = [cd(75), sd(75)], v = (Math.sqrt(6) - Math.sqrt(2)) / 4;
  mk("u06-22", "maths-u06-angle-75", "geometry", "75° = 45° + 30° on the unit circle",
    `Turning 45° and then a further 30° reaches 75°. The x-coordinate of the point at 75° is cos 75° = cos 45° cos 30° − sin 45° sin 30° = (√6 − √2)/4 ≈ ${(+v.toFixed(3))}.`,
    "The unit circle with the radius at 45° and a second radius at 75°, the angles of 45° and 30° marked between them, and the x-coordinate of the 75° point marked on the axis.",
    ["Start at the positive x-axis and turn 45°.", "Turn a further 30° to reach 75°.", "The x-coordinate at 75° is cos 75° = cos(45° + 30°).", "The compound angle formula gives (√6 − √2)/4 ≈ 0.259."],
    { points: { O: [0, 0], X: [1, 0], M, P, F: [P[0], 0] }, hide: ["O", "X", "F"], labelAt: { M: [14, -4], P: [-6, -14] }, grid: { step: 0.5, axes: true, labels: 5 }, circles: [{ centre: "O", r: 1 }], segments: [{ a: "O", b: "M", colour: "a1", w: 2.4 }, { a: "O", b: "P", colour: "a2", w: 3 }, { a: "P", b: "F", colour: "a2", dash: "5 4" }],
      angles: [{ at: "O", from: "X", to: "M", deg: 45, label: "45°", colour: "a1", r: 48, labelR: 8 }, { at: "O", from: "M", to: "P", deg: 30, label: "30°", colour: "a3", r: 66, labelR: 6 }],
      lengths: [{ a: "O", b: "F", value: +v.toFixed(5), tol: 0.001, label: "cos 75° ≈ 0.259", colour: "a2", side: 1 }], view: { x: [-1.5, 1.7], y: [-1.25, 1.3] }, height: [340, 320],
      checks: [{ type: "onCircle", points: ["X", "M", "P"], name: "the radii end on the unit circle" }, { type: "angle", at: "O", from: "X", to: "P", deg: 75, name: "45° + 30° = 75°" }, { type: "value", expr: "(sqrt(6)-sqrt(2))/4", value: cd(75), tol: 1e-9, name: "cos 75° = (√6 − √2)/4" }], fromLesson: ["(√6 − √2)/4"] });
}

// ---------- u06-23 Double angle: cos 2x = cos x ----------
{
  const f2 = `cos(${D}*2*x)`, f1_ = `cos(${D}*x)`, ys = [1, -0.5, -0.5];
  mk("u06-23", "maths-u06-cos2x-cosx", "graph", "Where cos 2x meets cos x",
    "Solutions of cos 2x = cos x are the crossings of the two graphs: at x = 0°, where both are 1, and at x = 120° and 240°, where both equal −½. They match cos x = −½ and cos x = 1 from the factorised equation.",
    "The graphs of cos x and cos 2x from 0° to 360°, which cross at 0°, 120° and 240°.",
    ["cos x makes one cycle and cos 2x makes two over 0° to 360°.", "At x = 0° both equal 1.", "At 120° and at 240° both equal −½.", "Those are the solutions 0°, 120° and 240°."],
    G({ x: [0, 360], y: [-1.3, 1.4] }, T(X90, [-1, 1]), { curves: [{ expr: f1_, colour: "a1", label: "cos x", labelAt: [262, 0.56] }, { expr: f2, colour: "a2", label: "cos 2x", labelAt: [10, -0.8] }],
      points: [0, 120, 240].map((x, i) => ({ x, y: ys[i], label: `${x}°`, colour: "a4", dx: i ? 0 : 10, dy: i ? 22 : -10, anchor: i ? "middle" : "start" })),
      checks: [0, 120, 240].map((x, i) => ({ type: "intersect", a: f1_, b: f2, x, y: ys[i], name: `cos ${x}° = cos ${2 * x}° = ${ys[i]}` })), fromLesson: ["x = 0°, 120° or 240°"] }));
}

// ---------- u06-24 Half angle: cos 15° ----------
{
  const H = [cd(15), sd(15)], A = [cd(30), sd(30)], v = (Math.sqrt(6) + Math.sqrt(2)) / 4;
  must(Math.abs(Math.sqrt(2 + Math.sqrt(3)) / 2 - v) < 1e-12, "cos15");
  mk("u06-24", "maths-u06-half-angle-15", "geometry", "15° is half of 30°",
    `cos²15° = (1 + cos 30°)/2 = (2 + √3)/4. The point at 15° is acute, so its x-coordinate is positive: cos 15° = √(2 + √3)/2 = (√6 + √2)/4 ≈ ${(+v.toFixed(3))}.`,
    "The unit circle with a radius at 30° and a radius at 15°, half way, and the x-coordinate of the 15° point marked on the axis.",
    ["The angle 30° is known exactly: cos 30° = √3/2.", "15° is half of 30°, so the half angle formula applies.", "cos²15° = (1 + cos 30°)/2 = (2 + √3)/4.", "15° is acute, so take the positive root: cos 15° = √(2 + √3)/2 ≈ 0.966."],
    { points: { O: [0, 0], X: [1, 0], H, A, F: [H[0], 0] }, hide: ["O", "X", "F"], labelAt: { H: [16, 8], A: [8, -14] }, grid: { step: 0.5, axes: true, labels: 5 }, circles: [{ centre: "O", r: 1 }], segments: [{ a: "O", b: "A", colour: "a1" }, { a: "O", b: "H", colour: "a2", w: 3 }, { a: "H", b: "F", colour: "a2", dash: "5 4" }],
      angles: [{ at: "O", from: "X", to: "H", deg: 15, label: "15°", colour: "a2", r: 70, labelR: 6 }, { at: "O", from: "H", to: "A", deg: 15, colour: "a1", r: 90 }],
      lengths: [{ a: "O", b: "F", value: +v.toFixed(5), tol: 0.001, label: "cos 15° ≈ 0.966", colour: "a2", side: 1 }], view: { x: [-1.5, 1.8], y: [-1.25, 1.3] }, height: [340, 320],
      checks: [{ type: "onCircle", points: ["X", "H", "A"], name: "the radii end on the unit circle" }, { type: "angle", at: "O", from: "X", to: "A", deg: 30, name: "30° is twice 15°" }, { type: "value", expr: "sqrt(2+sqrt(3))/2", value: "(sqrt(6)+sqrt(2))/4", tol: 1e-9, name: "√(2 + √3)/2 = (√6 + √2)/4" }, { type: "value", expr: "(sqrt(6)+sqrt(2))/4", value: cd(15), tol: 1e-9, name: "cos 15° = (√6 + √2)/4" }], fromLesson: ["cos^{2} 15° = (1 + cos 30°)/2"] });
}

// ---------- u06-25 Trigonometric equations ----------
{
  const f = `2*cos(${D}*x)^2+3*sin(${D}*x)`, xs = [30, 90, 150];
  mk("u06-25", "maths-u06-quadratic-in-sin", "graph", "2cos²x + 3 sin x = 3",
    "Replacing cos²x by 1 − sin²x gives 2sin²x − 3 sin x + 1 = 0, so sin x = ½ or sin x = 1. On the graph of 2cos²x + 3 sin x the line y = 3 is met at 30°, 90° (where the curve just touches it) and 150°.",
    "The graph of y = 2cos²x + 3 sin x from 0° to 360° with the line y = 3 touching or crossing it at 30°, 90° and 150°.",
    ["Rewrite cos²x = 1 − sin²x: 2sin²x − 3 sin x + 1 = 0.", "Factorise: (2 sin x − 1)(sin x − 1) = 0.", "sin x = ½ gives 30° and 150°; sin x = 1 gives 90°.", "These are the three places the curve reaches the line y = 3."],
    G({ x: [0, 360], y: [-4, 4.4] }, T(X90, [-3, 3]), { curves: [{ expr: f, colour: "a1" }], marks: [{ y: 3, label: "y = 3" }],
      points: xs.map((x) => ({ x, y: 3, label: `${x}°`, colour: "a2", dx: x === 90 ? 0 : x === 30 ? -8 : 8, dy: -14, anchor: x === 90 ? "middle" : x === 30 ? "end" : "start" })),
      checks: xs.map((x) => pt(f, x, 3, `2cos²${x}° + 3 sin ${x}° = 3`)), fromLesson: ["x = 30°, 90° or 150°"] }));
}

// ---------- u06-26 Trigonometric inequalities ----------
mk("u06-26", "maths-u06-tan-inequality", "number-line", "tan x < 1 on 0° ≤ x < 180°",
  "The boundary is x = 45°, where tan x = 1. On the first branch tan x < 1 for x < 45°; on the second branch (90° < x < 180°) tan x is negative, so always below 1. The point 90° is excluded: tan is undefined there.",
  "A number line from 0° to 180° with a shaded interval from 0° to 45°, closed at 0° and open at 45°, and another from 90° to 180°, open at both ends.",
  ["Mark the boundary x = 45°, where tan x = 1, and the excluded point x = 90°.", "From 0° up to 45°, tan x is below 1: 0° ≤ x < 45°.", "Between 90° and 180°, tan x is negative, so tan x < 1 throughout.", "The solution is 0° ≤ x < 45° or 90° < x < 180°."],
  { range: [0, 180], ticks: { step: 45 }, minor: 15, narrowTicks: { step: 45 }, intervals: [{ from: 0, to: 45, closed: [true, false], inequality: "0 <= x < 45", label: "0° ≤ x < 45°", colour: "a1" }, { from: 90, to: 180, closed: [false, false], inequality: "90 < x < 180", label: "90° < x < 180°", colour: "a2" }],
    checks: [{ type: "value", expr: "tan(45*pi/180)", value: "1", tol: 1e-9, name: "tan 45° = 1 is the boundary" }], fromLesson: ["0° ≤ x < 45° or 90° < x < 180°"] });

// ---------- u06-27 Hyperbolic functions ----------
{
  const x0 = Math.log(2 + Math.sqrt(3)), f = "(exp(x)+exp(-x))/2";
  mk("u06-27", "maths-u06-cosh-2", "graph", "cosh x = 2",
    `The curve y = cosh x = (eˣ + e⁻ˣ)/2 has its minimum 1 at x = 0 and is symmetric. It meets y = 2 at x = ±ln(2 + √3) ≈ ±${(+x0.toFixed(3))}, where eˣ = 2 ± √3.`,
    `The graph of y = cosh x, a symmetric U-shape with minimum (0, 1), and the line y = 2 meeting it at x ≈ −1.317 and x ≈ 1.317.`,
    ["cosh x = (eˣ + e⁻ˣ)/2 is symmetric about the y-axis with minimum 1.", "cosh x = 2 gives u² − 4u + 1 = 0 with u = eˣ, so u = 2 ± √3.", "Then x = ln(2 + √3) ≈ 1.317 or x = ln(2 − √3) = −1.317."],
    { ...G({ x: [-3, 3], y: [0, 6] }, T([-3, -2, -1, 1, 2, 3], [1, 2, 3, 4, 5]), { axisLabels: ["x", "y"] }), curves: [{ expr: f, colour: "a1" }], marks: [{ y: 2, label: "y = 2" }],
      points: [{ x: -x0, y: 2, label: `−${(+x0.toFixed(3))}`, colour: "a2", dx: -8, dy: -12, anchor: "end" }, { x: x0, y: 2, label: `${(+x0.toFixed(3))}`, colour: "a2", dx: 8, dy: -12 }],
      checks: [pt(f, x0, 2, "cosh(ln(2 + √3)) = 2"), pt(f, -x0, 2, "cosh(−ln(2 + √3)) = 2"), { type: "min", expr: f, domain: [-3, 3], x: 0, y: 1, name: "the minimum of cosh x is 1 at x = 0" }], fromLesson: ["x = ln(2 ± √3)"] });
}

// ---------- u06-28 Inverse hyperbolic functions ----------
{
  const x0 = Math.log(2), f = "(exp(x)-exp(-x))/2";
  mk("u06-28", "maths-u06-arsinh", "graph", "arsinh(3/4) = ln 2",
    "arsinh(3/4) is the x for which sinh x = 3/4. Since sinh(ln 2) = (2 − ½)/2 = 3/4, the answer is exactly ln 2 ≈ 0.693.",
    "The graph of y = sinh x, rising through the origin, with the line y = 3/4 meeting it at x = ln 2 ≈ 0.693.",
    ["sinh x = (eˣ − e⁻ˣ)/2 rises steadily through the origin.", "arsinh(3/4) asks: for which x is sinh x = 3/4?", "At x = ln 2, eˣ = 2 and e⁻ˣ = ½, so sinh x = (2 − ½)/2 = 3/4."],
    { ...G({ x: [-2, 2], y: [-3, 3] }, T([-2, -1, 1, 2], [-2, -1, 1, 2]), { axisLabels: ["x", "y"] }), curves: [{ expr: f, colour: "a1" }], marks: [{ y: 0.75, label: "y = 3/4" }, { x: x0, to: 0.75 }],
      points: [{ x: x0, y: 0.75, label: "x = ln 2 ≈ 0.693", colour: "a2", dx: 10, dy: 22 }], checks: [pt(f, x0, 0.75, "sinh(ln 2) = 3/4"), pt(f, Math.log(3 / 4 + Math.sqrt(9 / 16 + 1)), 0.75, "sinh(ln(3/4 + 5/4)) = 3/4")], fromLesson: ["arsinh(3/4) = ln(3/4 + 5/4) = ln 2"] });
}

// ---------- u06-29 Fourier series: b1 ----------
{
  const f = "x*sin(x)";
  mk("u06-29", "maths-u06-fourier-b1", "graph", "b₁ is the area under x sin x",
    "b₁ = (1/π)∫ x sin x dx over (−π, π). The curve x sin x is never negative on this interval and the shaded area is 2π, so b₁ = 2π/π = 2.",
    "The graph of y = x sin x from −π to π, an even M-shaped curve touching zero at the ends and the middle, with the area under it shaded and labelled 2π.",
    ["f(x) = x is odd, so every aₙ = 0.", "b₁ = (1/π)∫ x sin x dx from −π to π.", "The integrand x sin x is non-negative on (−π, π); its area is [−x cos x + sin x] = 2π.", "So b₁ = 2π/π = 2."],
    { range: { x: [-3.6, 3.6] , y: [-0.4, 2.2] }, ticks: [[-3, -2, -1, 1, 2, 3], [1, 2]], grid: [1, 1], height: [330, 310], axisLabels: ["x", "y"], curves: [{ expr: f, colour: "a1", domain: [-Math.PI, Math.PI] }], areas: [{ expr: f, from: -Math.PI, to: Math.PI, colour: "a2" }],
      points: [{ x: 0, y: 0.05, colour: "ink" }], marks: [], arrows: [], legend: undefined,
      checks: [{ type: "area", expr: f, from: -Math.PI, to: Math.PI, value: 2 * Math.PI, tol: 0.001, name: "the area under x sin x on (−π, π) is 2π, so b₁ = 2π/π = 2" }], fromLesson: ["So b₁ = 2π/π = 2"] });
}

// ---------- u06-30 Fourier analysis: the spectrum ----------
mk("u06-30", "maths-u06-spectrum", "barchart", "The spectrum of the signal",
  "The signal is a sum of two sine waves, so its spectrum has two spikes: 50 Hz with amplitude 3 and 120 Hz with amplitude 1. The first is three times as tall.",
  "A spectrum with two spikes: a tall one of height 3 at 50 hertz and a short one of height 1 at 120 hertz.",
  ["The signal is 3 sin(2π × 50t) + sin(2π × 120t).", "Each sine wave gives one spike in the spectrum, at its frequency.", "The 50 Hz spike has height 3 and the 120 Hz spike height 1: three times smaller."],
  { categories: ["50 Hz", "120 Hz"], values: [3, 1], range: { y: [0, 4] }, ticks: [1, 2, 3, 4], axisLabels: ["frequency", "amplitude"], checks: [{ type: "total", value: 4 }], fromLesson: ["50 Hz with amplitude 3"] });
