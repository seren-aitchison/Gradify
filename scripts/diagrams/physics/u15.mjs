// Unit 15, Electricity and Electrostatics. Every number in a caption or claim is computed here once.
// Run: node scripts/diagrams/physics/u15.mjs
import { mk } from "./spec.mjs";

const f0 = (x) => x.toFixed(0), f1 = (x) => x.toFixed(1), f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3);
const k = 8.9875517923e9, e = 1.602176634e-19, me = 9.1093837e-31;

// u15-05 Electric fields: the electron entering a uniform field
{
  const E = 2e4, v = 2e7, L = 0.05, a = (e * E) / me, t = L / v, y = 0.5 * a * t * t, cm = 100 * 0.5 * a / (1e4 * v * v);
  const ex = `${cm}*x^2`;
  mk("u15-05", "phys-u15-electron-deflection", "graph", {
    title: "An electron deflected by a uniform field",
    caption: `The electron crosses the field at constant speed ${v / 1e7} × 10⁷ m s⁻¹, taking t = ${L}/(2 × 10⁷) = ${(t * 1e9).toFixed(1)} ns, while the field accelerates it sideways at a = eE/m = ${(a / 1e15).toFixed(1)} × 10¹⁵ m s⁻². Its path is a parabola, y = ½at² ∝ x², and after 5 cm it has moved ${f1(y * 100)} cm sideways.`,
    alt: `Graph of sideways deflection against distance travelled: a parabola reaching ${f1(y * 100)} cm at 5 cm.`,
    description: ["The horizontal axis is the distance travelled through the field in cm; the vertical axis is the sideways deflection in cm.", `Constant speed along the field: x = vt. Uniform acceleration across it: a = eE/m = ${(a / 1e15).toFixed(1)} × 10¹⁵ m s⁻².`, `So y = ½a(x/v)², a parabola. At x = 5 cm (t = ${(t * 1e9).toFixed(1)} ns) the deflection is ${f1(y * 100)} cm.`],
    range: { x: [0, 6], y: [0, 1.6] }, ticks: [[1, 2, 3, 4, 5, 6], [0.5, 1, 1.5]], grid: [1, 0.5], height: [320, 300], xLabelBelow: true, axisLabels: ["x / cm", "y / cm"],
    curves: [{ expr: ex, domain: [0, 5], colour: "a1", width: 3.4, label: "y = ½a(x/v)²", labelAt: [0.4, 0.9] }],
    points: [{ x: 5, y: y * 100, label: `${f1(y * 100)} cm`, dx: -8, dy: -14, anchor: "end" }],
    checks: [{ type: "point", expr: ex, x: 5, y: y * 100, name: `y = ½at² = ${f1(y * 100)} cm after 5 cm` }, { type: "point", expr: ex, x: 2.5, y: y * 25, name: "the path is a parabola: half the distance, a quarter of the deflection" }],
  });
}

// u15-06 Field lines of +2q and -q
{
  const q = 1e-9, s = 1 / (1 - Math.SQRT1_2); // in separations; charges are 2 apart
  mk("u15-06", "phys-u15-field-lines-2q-q", "field", {
    title: "Field lines of +2q and −q",
    caption: `Line counts are proportional to charge: 20 lines leave +2q and 10 end on −q. The other 10 run off to infinity, as for a net charge of +q. Far away the field looks like that of a single +q. Between the charges the field points from + to −, and a null point, where the two fields cancel, lies on the axis beyond −q at ${f2(s)} separations from +2q (2/s² = 1/(s − 1)² gives s = 1/(1 − 1/√2)).`,
    alt: "Field lines from a charge +2q on the left and a charge −q on the right: twice as many lines leave +2q as end on −q, and the rest spread outwards; a null point lies beyond −q.",
    description: ["Two point charges on a line: +2q on the left and −q on the right.", "20 lines leave +2q; 10 of them curve round and end on −q.", "The other 10 escape to infinity: the net charge is +q.", `Beyond −q on the axis, at ${f2(s)} separations from +2q, the two fields cancel exactly: a null point.`],
    kind: "electric", range: { x: [-2, 9], y: [-3.5, 3.5] },
    charges: [{ x: 0, y: 0, q: 2 * q, label: "+2q", start: 9 }, { x: 2, y: 0, q: -q, label: "−q" }],
    linesPerUnit: 10 / q,
    claims: [{ type: "lines", charge: 0, count: 20, name: "20 lines leave +2q" }, { type: "lines", charge: 1, count: 10, name: "10 lines end on −q" }, { type: "null", at: [2 * s, 0], name: "the fields cancel at the null point beyond −q" }],
  });
}

// u15-07 Potential midway between +4 nC and -2 nC
{
  const q1 = 4e-9, q2 = -2e-9, r = 0.1, V = (k * (q1 + q2)) / r, E = (k * (q1 - q2)) / (r * r);
  mk("u15-07", "phys-u15-potential-midpoint", "field", {
    title: "Potential midway between +4 nC and −2 nC",
    caption: `Potential is a scalar, so the contributions add with their signs: V = k(4 × 10⁻⁹ − 2 × 10⁻⁹)/0.1 = ${f0(V)} V. The field there, in contrast, is a vector: both charges push the same way, from + towards −, so E = k(4 + 2) × 10⁻⁹/0.1² = ${f0(E)} V m⁻¹, not the difference.`,
    alt: `Two point charges 0.2 m apart, +4 nC and −2 nC, with field lines and equipotentials; the midpoint is at ${f0(V)} V and the field there points from the positive to the negative charge.`,
    description: ["Two point charges 0.2 m apart: +4 nC on the left and −2 nC on the right, with field lines and equipotential lines.", `At the midpoint, 0.1 m from each, the potentials add as numbers: k × 4 nC/0.1 + k × (−2 nC)/0.1 = ${f0(V)} V.`, `The fields add as vectors: both point from + to −, so E = ${f0(E)} V m⁻¹ towards the −2 nC charge.`],
    kind: "electric", range: { x: [-0.1, 0.3], y: [-0.15, 0.15] },
    charges: [{ x: 0, y: 0, q: q1, label: "+4" }, { x: 0.2, y: 0, q: q2, label: "−2" }], equipotentials: true,
    claims: [{ type: "V", at: [0.1, 0], value: V, name: `V = ${f0(V)} V at the midpoint` }, { type: "E", at: [0.1, 0], value: E, name: `E = ${f0(E)} V/m at the midpoint` }, { type: "direction", at: [0.1, 0], angle: 0, name: "the field points from + towards −" }],
  });
}

// u15-12 Gauss's law: field of a uniformly charged solid sphere
{
  const inside = "x", outside = "1/(x*x)";
  mk("u15-12", "phys-u15-sphere-field", "graph", {
    title: "Field of a uniformly charged solid sphere",
    caption: `Gauss's law with Q_enc = Q(r/R)³ inside gives E = Qr/(4πε₀R³), rising linearly from zero at the centre; outside, the sphere acts like a point charge, E = Q/(4πε₀r²), falling as 1/r². The two meet at the surface, r = R, where E reaches its maximum. Here E is in units of Q/(4πε₀R²) and r in units of R.`,
    alt: "Graph of field against distance from the centre: a straight line rising from zero to a peak at the sphere's surface, then a curve falling as one over r squared.",
    description: ["The horizontal axis is r/R; the vertical axis is E in units of Q/(4πε₀R²).", "Inside (r < R): the enclosed charge is Q(r/R)³, so E = (r/R) in these units: a straight line from 0.", "At the surface E = 1 (the peak).", "Outside (r > R): E = 1/(r/R)², the point-charge field."],
    range: { x: [0, 3.2], y: [0, 1.2] }, ticks: [[1, 2, 3], [0.5, 1]], grid: [1, 0.5], height: [320, 300], xLabelBelow: true, axisLabels: ["r / R", "E / (Q/4πε₀R²)"],
    curves: [{ expr: inside, domain: [0, 1], colour: "a1", width: 3.4, label: "∝ r", labelAt: [0.2, 0.34] }, { expr: outside, domain: [1, 3.2], colour: "a2", width: 3.4, label: "∝ 1/r²", labelAt: [1.6, 0.6] }],
    points: [{ x: 1, y: 1, label: "surface, r = R", dx: 8, dy: -10 }],
    checks: [{ type: "point", expr: inside, x: 1, y: 1, name: "inside field reaches the surface value E = Q/(4πε₀R²)" }, { type: "point", expr: outside, x: 1, y: 1, name: "outside field equals the same value at r = R (continuous)" }, { type: "slope", expr: inside, x: 0.5, value: 1, name: "inside, E rises linearly with r" }, { type: "point", expr: outside, x: 2, y: 0.25, name: "outside, E falls as 1/r² (a quarter at 2R)" }],
  });
}

// u15-13 Charge distributions: the axis of a ring
{
  const Q = 10e-9, a = 0.1, z0 = 0.1, Ez = (z) => (k * Q * z) / (z * z + a * a) ** 1.5, zm = a / Math.SQRT2;
  const kq = (k * Q) / 1000, ex = `${kq}*x/(x*x+${a * a})^1.5`;
  mk("u15-13", "phys-u15-ring-axis", "graph", {
    title: "Field on the axis of a charged ring",
    caption: `For a ring of charge Q = 10 nC and radius a = 0.1 m, E_z = kQz/(z² + a²)^{3/2}. At z = 0.1 m this is ${(Ez(z0) / 1e3).toFixed(1)} kN C⁻¹ (the lesson's 3.2 × 10³). It is zero at the centre by symmetry, peaks at z = a/√2 = ${f3(zm)} m with ${(Ez(zm) / 1e3).toFixed(2)} kN C⁻¹, and for z ≫ a falls as 1/z², like a point charge.`,
    alt: `Graph of the axial field against distance z: zero at the ring's centre, a peak of ${(Ez(zm) / 1e3).toFixed(2)} kilonewtons per coulomb at z = ${f3(zm)} m, then a slow fall.`,
    description: ["The horizontal axis is the distance z along the axis from the ring's centre in metres; the vertical axis is E in kN C⁻¹.", "At z = 0 the contributions of opposite sides cancel: E = 0.", `The field peaks at z = a/√2 = ${f3(zm)} m with ${(Ez(zm) / 1e3).toFixed(2)} kN C⁻¹.`, `At z = 0.1 m: E = ${f1(Ez(z0) / 1e3)} kN C⁻¹ ≈ 3.2 × 10³ N C⁻¹.`, "Far away it falls as kQ/z²."],
    range: { x: [0, 0.5], y: [0, 4] }, ticks: [[0.1, 0.2, 0.3, 0.4, 0.5], [1, 2, 3, 4]], grid: [0.1, 1], height: [320, 300], xLabelBelow: true, axisLabels: ["z / m", "E / kN C^{-1}"],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "E_{z}", labelAt: [0.3, 2.6] }],
    points: [{ x: z0, y: Ez(z0) / 1e3, label: `${f1(Ez(z0) / 1e3)} kN/C at 0.1 m`, dx: 12, dy: 12 }],
    checks: [{ type: "point", expr: ex, x: z0, y: Ez(z0) / 1e3, name: `E = kQz/(z² + a²)^{3/2} = ${(Ez(z0)).toFixed(0)} N/C at z = 0.1 m` }, { type: "max", expr: ex, domain: [0.01, 0.5], x: zm, y: Ez(zm) / 1e3, name: `peak at z = a/√2 = ${f3(zm)} m` }, { type: "point", expr: ex, x: 0, y: 0, name: "E = 0 at the centre of the ring" }],
  });
}

// u15-23 Poisson's equation: uniform charge between grounded plates
{
  mk("u15-23", "phys-u15-poisson-slab", "graph", {
    title: "Potential across a uniformly charged slab",
    caption: `With ρ uniform between x = 0 and x = d and V = 0 at both ends, Poisson's equation V″ = −ρ/ε₀ integrates twice to V = (ρ/2ε₀)x(d − x). The potential is a parabola, symmetric about the middle, with its maximum ρd²/8ε₀ at x = d/2 (where the field is zero). Drawn in units of ρd²/2ε₀ against x/d: V = u(1 − u), maximum ¼.`,
    alt: "Graph of potential across the slab: a downward-opening parabola that is zero at both ends and peaks at one quarter in the middle.",
    description: ["The horizontal axis is x/d across the slab; the vertical axis is V in units of ρd²/(2ε₀).", "V″ = −ρ/ε₀ is constant and negative, so V is a parabola opening downwards.", "The boundary conditions V(0) = V(d) = 0 give V = u(1 − u).", "The maximum, at u = 1/2, is 1/4 of the unit, that is ρd²/8ε₀, and E = −dV/dx is zero there."],
    range: { x: [0, 1.1], y: [0, 0.32] }, ticks: [[0.25, 0.5, 0.75, 1], [0.1, 0.2, 0.3]], grid: [0.25, 0.1], height: [320, 300], xLabelBelow: true, axisLabels: ["x/d", "V / (ρd²/2ε₀)"],
    curves: [{ expr: "x*(1-x)", domain: [0, 1], colour: "a1", width: 3.4, label: "V = u(1 − u)", labelAt: [0.62, 0.12] }],
    points: [{ x: 0.5, y: 0.25, label: "ρd²/8ε₀", dx: 10, dy: -10 }],
    checks: [{ type: "point", expr: "x*(1-x)", x: 0, y: 0, name: "V = 0 at x = 0" }, { type: "point", expr: "x*(1-x)", x: 1, y: 0, name: "V = 0 at x = d" }, { type: "max", expr: "x*(1-x)", domain: [0, 1], x: 0.5, y: 0.25, name: "maximum ρd²/8ε₀ at the middle" }, { type: "slope", expr: "x*(1-x)", x: 0.5, value: 0, name: "E = 0 at the middle" }, { type: "slope", expr: "x*(1-x)", x: 0.25, value: 0.5, name: "V'' = −ρ/ε₀ (gradient falls 2 per unit: 0.5 at 0.25, −0.5 at 0.75)" }],
  });
}
