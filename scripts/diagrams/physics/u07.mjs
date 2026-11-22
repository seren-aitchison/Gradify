// Unit 7, Gravitation and Orbital Mechanics. Every number in a caption or a check is computed here once.
// Run: node scripts/diagrams/physics/u07.mjs
import { mk } from "./spec.mjs";

const GM = 3.986e14; // m^3 s^-2, Earth
const r1 = (x, d = 1) => +x.toFixed(d);

// u07-02 Gravitational fields: g inside and outside a uniform Earth (example: g at half the radius)
const g0 = 9.8, gHalf = g0 / 2;
mk("u07-02", "phys-u07-g-inside-outside", "graph", {
  title: "g inside and outside a uniform Earth",
  caption: `Gauss's law for gravity: inside a uniform sphere only the mass within r pulls, so g rises in a straight line from 0 at the centre to ${g0} m s⁻² at the surface (g = g₀r/R). Outside it falls as 1/r². At r = R/2 the field is half the surface value, ${gHalf.toFixed(2)} m s⁻².`,
  alt: `Graph of g against r/R: a straight line from zero at the centre up to ${g0} metres per second squared at the surface, then a curve falling as one over r squared. The point at half the radius is marked at ${gHalf.toFixed(2)}.`,
  description: [
    "The horizontal axis is distance from the centre in Earth radii (r/R); the vertical axis is g in m s⁻².",
    `Inside (r < R) the enclosed mass grows as r³ and the surface area as r², so g = g₀(r/R): a straight line from 0 to ${g0}.`,
    `Outside (r > R) all the mass counts as if at the centre, so g = g₀(R/r)²: ${g0} at r = R, ${(g0 / 4).toFixed(2)} at r = 2R.`,
    `The example's point: at r = R/2, g = ${gHalf.toFixed(2)} m s⁻², half the surface value.`,
  ],
  range: { x: [0, 3], y: [0, 11] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3], [2, 4, 6, 8, 10]], grid: [1, 2], height: [340, 320], xLabelBelow: true,
  axisLabels: ["r / R", "g / m s^{-2}"],
  curves: [
    { expr: `${g0}*x`, domain: [0, 1], colour: "a1", label: "inside: g ∝ r", labelAt: [0.08, 7.2] },
    { expr: `${g0}/(x*x)`, domain: [1, 3], colour: "a2", label: "outside: g ∝ 1/r²", labelAt: [1.35, 7] },
  ],
  points: [{ x: 0.5, y: gHalf, label: `r = R/2: ${gHalf.toFixed(2)}`, dx: 10, dy: 22 }, { x: 1, y: g0, label: `surface ${g0}`, dx: 8, dy: -10 }],
  checks: [
    { type: "point", expr: `${g0}*x`, x: 0.5, y: gHalf, name: `g at r = R/2 is ${gHalf.toFixed(2)} m s⁻²` },
    { type: "point", expr: `${g0}*x`, x: 1, y: g0, name: "the inside line reaches g₀ at the surface" },
    { type: "point", expr: `${g0}/(x*x)`, x: 1, y: g0, name: "the outside curve starts at g₀ at the surface" },
    { type: "point", expr: `${g0}/(x*x)`, x: 2, y: g0 / 4, name: "g falls to a quarter at 2R" },
  ],
});

// u07-04 Potential: the well, and the 400 km lift
const R = 6.371e6, h = 4e5, phiR = GM / R / 1e6, phiH = GM / (R + h) / 1e6, dU = (phiR - phiH) * 1e6 * 1000;
const phiExpr = `-${r1(GM / 1e12, 1)}/x`; // -398.6/x, x in 1000 km, MJ/kg
mk("u07-04", "phys-u07-potential-well", "graph", {
  title: "Earth's potential well",
  caption: `φ = −GM/r is negative everywhere and rises towards 0 at infinity. At the surface φ = −${phiR.toFixed(2)} MJ kg⁻¹; at 400 km it is −${phiH.toFixed(2)}. The difference, ${(phiR - phiH).toFixed(2)} MJ kg⁻¹, times 1000 kg is the ${(dU / 1e9).toFixed(1)} GJ needed to lift the satellite.`,
  alt: `Graph of gravitational potential against distance from Earth's centre: a curve rising from minus ${phiR.toFixed(1)} megajoules per kilogram at the surface towards zero. Points at the surface and 400 kilometres up are marked.`,
  description: [
    "The horizontal axis is distance from Earth's centre in thousands of km; the vertical axis is potential φ in MJ kg⁻¹.",
    `φ = −GM/r with GM = 3.986 × 10¹⁴ m³ s⁻². At r = R = 6371 km, φ = −${phiR.toFixed(2)} MJ kg⁻¹.`,
    `At r = R + 400 km = 6771 km, φ = −${phiH.toFixed(2)} MJ kg⁻¹.`,
    `Work to lift 1000 kg = m Δφ = 1000 × ${(phiR - phiH).toFixed(2)} × 10⁶ J = ${(dU / 1e9).toFixed(1)} GJ.`,
  ],
  range: { x: [6, 30], y: [-70, 0] }, ticks: [[10, 15, 20, 25, 30], [-60, -40, -20]], grid: [5, 20], height: [340, 320], xLabelBelow: true,
  axisLabels: ["r / 10³ km", "φ / MJ kg^{-1}"],
  curves: [{ expr: phiExpr, colour: "a1", label: "φ = −GM/r", labelAt: [14, -30] }],
  points: [{ x: 6.371, y: -r1(phiR, 2), label: `surface ${(-phiR).toFixed(2)}`, dx: 10, dy: -10 }, { x: 6.771, y: -r1(phiH, 2), label: `400 km: ${(-phiH).toFixed(2)}`, dx: 14, dy: 26 }],
  checks: [
    { type: "point", expr: phiExpr, x: 6.371, y: -r1(phiR, 2), name: `φ at the surface is −${phiR.toFixed(2)} MJ/kg` },
    { type: "point", expr: phiExpr, x: 6.771, y: -r1(phiH, 2), name: `φ at 400 km is −${phiH.toFixed(2)} MJ/kg` },
  ].map((c) => ({ ...c, tol: 0.01 })),
});

// u07-08 Kepler's third law: Jupiter
const aJ = 5.2, TJ = aJ ** 1.5;
mk("u07-08", "phys-u07-kepler-period", "graph", {
  title: "Kepler's third law: T² = a³",
  caption: `With a in AU and T in years, T = a^{3/2} for every planet. Earth (1 AU) has T = 1 year; Jupiter at ${aJ} AU has T = ${aJ}^{3/2} = ${TJ.toFixed(2)} years. Doubling the orbit radius multiplies the period by 2^{3/2} ≈ 2.8, not 2.`,
  alt: `Graph of orbital period in years against semi-major axis in astronomical units: a curve T equals a to the power 3 over 2, through Earth at (1, 1) and Jupiter at (5.2, ${TJ.toFixed(1)}).`,
  description: [
    "The horizontal axis is the semi-major axis a in AU; the vertical axis is the period T in years.",
    "The curve is T = a^{3/2}, which is T² = a³ in these units.",
    "Earth sits at (1, 1) by definition of the AU and the year.",
    `Jupiter: a = ${aJ} AU gives T = ${TJ.toFixed(2)} years.`,
  ],
  range: { x: [0, 6], y: [0, 14] }, ticks: [[1, 2, 3, 4, 5, 6], [2, 4, 6, 8, 10, 12, 14]], grid: [1, 2], height: [340, 320], xLabelBelow: true,
  axisLabels: ["a / AU", "T / years"],
  curves: [{ expr: "x^1.5", domain: [0, 6], colour: "a1", label: "T = a^{3/2}", labelAt: [2.6, 6.2] }],
  points: [{ x: 1, y: 1, label: "Earth", dx: 10, dy: -10 }, { x: aJ, y: r1(TJ, 2), label: `Jupiter ${TJ.toFixed(2)} yr`, dx: -12, dy: -12, anchor: "end" }],
  checks: [{ type: "point", expr: "x^1.5", x: 1, y: 1, name: "Earth: T = 1 year at 1 AU" }, { type: "point", expr: "x^1.5", x: aJ, y: r1(TJ, 3), name: `Jupiter: T = ${TJ.toFixed(2)} years at ${aJ} AU` }],
});

// u07-10 Orbital energy: 500 kg satellite from 7000 to 8000 km
const m = 500;
const c = (GM * m) / 1e6 / 1e9; // GJ·(10^3 km)
const E = (x) => -c / (2 * x), dE = E(8) - E(7), dK = c / 16 - c / 14, dUv = -c / 8 + c / 7;
mk("u07-10", "phys-u07-orbit-energies", "graph", {
  title: "Energies of a circular orbit",
  caption: `In a circular orbit K = GMm/2r, U = −GMm/r and E = −GMm/2r = −K. Raising the 500 kg satellite from 7000 to 8000 km changes E by +${dE.toFixed(2)} GJ: the potential energy rises by ${dUv.toFixed(2)} GJ but the kinetic energy falls by ${(-dK).toFixed(2)} GJ.`,
  alt: `Graph of energy in gigajoules against orbital radius in thousands of kilometres: U falls steeply, K is positive and half its size, and the total E is minus K. Values at 7000 and 8000 km are marked.`,
  description: [
    "The horizontal axis is the orbit radius in thousands of km; the vertical axis is energy in GJ for the 500 kg satellite.",
    `U = −GMm/r = −${c.toFixed(1)}/r (r in 10³ km) is the lowest curve; K = +${(c / 2).toFixed(1)}/r is half its size and opposite in sign; E = K + U = −${(c / 2).toFixed(1)}/r lies between them.`,
    `At 7000 km E = ${E(7).toFixed(2)} GJ; at 8000 km E = ${E(8).toFixed(2)} GJ, so ΔE = +${dE.toFixed(2)} GJ.`,
    `ΔK = ${dK.toFixed(2)} GJ and ΔU = +${dUv.toFixed(2)} GJ add to ΔE: ${dK.toFixed(2)} + ${dUv.toFixed(2)} = ${(dK + dUv).toFixed(2)}.`,
  ],
  range: { x: [6, 12], y: [-35, 20] }, ticks: [[7, 8, 9, 10, 11, 12], [-30, -20, -10, 0, 10]], grid: [1, 10], height: [340, 320], xLabelBelow: true,
  axisLabels: ["r / 10³ km", "energy / GJ"],
  curves: [
    { expr: `${r1(c / 2, 3)}/x`, colour: "a2", label: "K", labelAt: [6.8, 19] },
    { expr: `-${r1(c, 3)}/x`, colour: "a1", label: "U", labelAt: [10.2, -26] },
    { expr: `-${r1(c / 2, 3)}/x`, colour: "a4", label: "E = K + U", labelAt: [9.3, -15.5] },
  ],
  points: [{ x: 7, y: r1(E(7), 2), label: `E = ${E(7).toFixed(2)}`, dx: 10, dy: 20 }, { x: 8, y: r1(E(8), 2), label: `E = ${E(8).toFixed(2)}`, dx: 8, dy: -16 }],
  checks: [
    { type: "point", expr: `-${r1(c / 2, 3)}/x`, x: 7, y: r1(E(7), 2), name: `E = ${E(7).toFixed(2)} GJ at 7000 km` },
    { type: "point", expr: `-${r1(c / 2, 3)}/x`, x: 8, y: r1(E(8), 2), name: `E = ${E(8).toFixed(2)} GJ at 8000 km` },
    { type: "point", expr: `-${r1(c, 3)}/x`, x: 8, y: r1(-c / 8, 2), name: `U = ${(-c / 8).toFixed(2)} GJ at 8000 km, twice E` },
  ].map((k) => ({ ...k, tol: 0.02 })),
});
