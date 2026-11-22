// Unit 8, Fluid Mechanics. Every number in a caption or a check is computed here once.
// Run: node scripts/diagrams/physics/u08.mjs
import { mk } from "./spec.mjs";
const r1 = (x, d = 1) => +x.toFixed(d);
const g = 9.8;

// u08-02 Hydrostatic equilibrium: gauge pressure against depth, Mariana Trench
const rho = 1030, hT = 10.9, pT = rho * g * hT * 1e3 / 1e6; // MPa per km = rho g * 1000 / 1e6
const slope = (rho * g * 1000) / 1e6;
mk("u08-02", "phys-u08-pressure-depth", "graph", {
  title: "Pressure rises linearly with depth",
  caption: `Gauge pressure in a liquid is p = ρgh: a straight line from zero at the surface. With ρ = ${rho} kg m⁻³ it gains ${slope.toFixed(2)} MPa for every kilometre, about 1 atm per 10 m. At the bottom of the Mariana Trench (${hT} km) it reaches ${pT.toFixed(0)} MPa, about 1100 atm.`,
  alt: `Graph of gauge pressure in megapascals against depth in kilometres: a straight line from the origin rising ${slope.toFixed(1)} megapascals per kilometre to ${pT.toFixed(0)} megapascals at 10.9 kilometres.`,
  description: [
    "The horizontal axis is depth in km; the vertical axis is gauge pressure ρgh in MPa.",
    `The slope is ρg = ${rho} × ${g} = ${(rho * g).toFixed(0)} Pa per m = ${slope.toFixed(2)} MPa per km, the same whatever the container's shape.`,
    `At h = ${hT} km: p = ${rho} × ${g} × ${hT * 1000} = ${pT.toFixed(0)} MPa, about 1100 atm (1 atm ≈ 0.1 MPa).`,
  ],
  range: { x: [0, 12], y: [0, 125] }, ticks: [[2, 4, 6, 8, 10, 12], [25, 50, 75, 100, 125]], grid: [2, 25], height: [340, 320], xLabelBelow: true,
  axisLabels: ["depth h / km", "ρgh / MPa"],
  curves: [{ expr: `${r1(slope, 4)}*x`, colour: "a1", label: "p = ρgh", labelAt: [3, 40] }],
  points: [{ x: hT, y: r1(pT, 2), label: `Mariana: ${pT.toFixed(0)} MPa`, dx: -10, dy: -14, anchor: "end" }],
  checks: [{ type: "point", expr: `${r1(slope, 4)}*x`, x: hT, y: r1(pT, 2), name: `ρgh at ${hT} km is ${pT.toFixed(0)} MPa` }, { type: "slope", expr: `${r1(slope, 4)}*x`, x: 5, value: r1(slope, 4), name: `the gradient is ρg = ${slope.toFixed(2)} MPa per km` }],
});

// u08-04 Archimedes: the crown weighed in air and in water
const Wa = 7.84, Tw = 6.86, B = Wa - Tw, V = B / (1000 * g), rhoC = Wa / g / V;
mk("u08-04", "phys-u08-crown-forces", "vectors", {
  title: "The crown hanging in water",
  caption: `In water the crown hangs in equilibrium: the tension ${Tw.toFixed(2)} N plus the buoyant force ${B.toFixed(2)} N balance the weight ${Wa.toFixed(2)} N. The buoyant force is the weight of displaced water, so V = ${B.toFixed(2)}/(1000 × ${g}) = ${(V * 1e4).toFixed(0)} × 10⁻⁴ m³ and ρ = ${rhoC.toFixed(0)} kg m⁻³, far below gold's 19 300.`,
  alt: `Free-body diagram of the crown in water: weight ${Wa.toFixed(2)} N down, tension ${Tw.toFixed(2)} N up and buoyant force ${B.toFixed(2)} N up, with zero net force.`,
  description: [
    `Weight: ${Wa.toFixed(2)} N down (the reading in air).`,
    `Tension (the scale reading in water): ${Tw.toFixed(2)} N up.`,
    `Buoyant force: ${Wa.toFixed(2)} − ${Tw.toFixed(2)} = ${B.toFixed(2)} N up; the two upward forces add to the weight, so the net force is zero.`,
    `Then V = F_B/(ρ_w g) = ${(V * 1e4).toFixed(0)} × 10⁻⁴ m³, m = ${(Wa / g).toFixed(1)} kg, ρ = ${rhoC.toFixed(0)} kg m⁻³.`,
  ],
  mode: "body", units: "N", showResultant: true,
  vectors: [
    { label: "W", mag: Wa, angle: 270, source: "Earth's gravity", text: `${Wa.toFixed(2)} N, down` },
    { label: "T", mag: Tw, angle: 90, colour: "a4", source: "string", text: `${Tw.toFixed(2)} N, up` },
    { label: "F_{B}", mag: r1(B, 2), angle: 90, colour: "a2", source: "displaced water", text: `${B.toFixed(2)} N, up` },
  ],
  resultant: { label: "net force", mag: 0, angle: 90, text: "0 N" },
  notes: [`F_{B} = ${B.toFixed(2)} N, V = ${(V * 1e4).toFixed(0)} × 10^{-4} m^{3}`, `ρ = ${rhoC.toFixed(0)} kg m^{-3}`],
});

// u08-05 Fluid statics: pressure on the gate, area under the p–h line is the force per metre of width
const w = 2, H = 3, perM = 0.5 * 1000 * g * H * H / 1e3, F = perM * w;
mk("u08-05", "phys-u08-gate-pressure", "graph", {
  title: "Force on a gate from the pressure triangle",
  caption: `Pressure on the gate grows from 0 at the surface to ${(1000 * g * H / 1e3).toFixed(1)} kPa at ${H} m. The area under the line, ${perM.toFixed(1)} kN per metre of width, times the ${w} m width is the total force ${F.toFixed(1)} kN: the same as ρg h_c A with the centroid depth ${H / 2} m. It acts at the triangle's centroid, 2/3 of the way down (${(2 * H / 3).toFixed(0)} m).`,
  alt: `Graph of water pressure in kilopascals against depth from 0 to 3 metres, a straight line to ${(1000 * g * H / 1e3).toFixed(1)} kilopascals, with the triangle underneath shaded; its area is ${perM.toFixed(1)} kilonewtons per metre.`,
  description: [
    "The horizontal axis is depth in m; the vertical axis is gauge pressure ρgh in kPa.",
    `The line p = ${(1000 * g / 1e3).toFixed(1)}h kPa reaches ${(1000 * g * H / 1e3).toFixed(1)} kPa at ${H} m.`,
    `The shaded triangle has area ½ × ${H} × ${(1000 * g * H / 1e3).toFixed(1)} = ${perM.toFixed(1)} kN per metre of gate width.`,
    `Times the width ${w} m: F = ${F.toFixed(1)} kN (the lesson's 88 kN), acting at depth 2/3 × ${H} = ${(2 * H / 3).toFixed(0)} m.`,
  ],
  range: { x: [0, 3.5], y: [0, 35] }, ticks: [[1, 2, 3], [10, 20, 30]], grid: [1, 10], height: [340, 320], xLabelBelow: true,
  axisLabels: ["depth h / m", "ρgh / kPa"],
  curves: [{ expr: `${r1(g, 2)}*x`, domain: [0, 3], colour: "a1", label: "p = ρgh", labelAt: [0.5, 12] }],
  areas: [{ expr: `${g}*x`, from: 0, to: H, colour: "a1", opacity: 0.2 }],
  points: [{ x: 3, y: g * 3, label: `${(g * 3).toFixed(1)} kPa`, dx: -10, dy: -12, anchor: "end" }, { x: 2, y: g * 2, label: "force acts at 2 m", dx: 12, dy: 26 }],
  checks: [{ type: "area", expr: `${g}*x`, from: 0, to: H, value: r1(perM, 2), tol: 0.01, name: `area under the line is ${perM.toFixed(1)} kN per metre of width` }, { type: "point", expr: `${g}*x`, x: 3, y: r1(g * 3, 2), name: `pressure at 3 m is ${(g * 3).toFixed(1)} kPa` }],
});

// u08-13 Poiseuille: parabolic profile in the needle, area-weighted integral is the flow rate
const R = 0.2e-3, L = 0.03, eta = 1e-3, dp = 5e4, vmax = (dp * R * R) / (4 * eta * L), Q = (Math.PI * R ** 4 * dp) / (8 * eta * L);
mk("u08-13", "phys-u08-poiseuille-profile", "graph", {
  title: "Laminar flow in the needle",
  caption: `Laminar flow in a tube has a parabolic velocity profile, fastest on the axis (v_max = Δp R²/4ηL = ${vmax.toFixed(1)} m s⁻¹) and zero at the wall. The mean speed is half of that, ${(vmax / 2).toFixed(1)} m s⁻¹, and the flow through the area πR² is Q = ${(Q * 1e6).toFixed(2)} × 10⁻⁶ m³ s⁻¹ = 1 mL s⁻¹.`,
  alt: `Graph of fluid speed against radius in the needle: a parabola from ${vmax.toFixed(1)} metres per second on the axis down to zero at the wall at 0.2 millimetres.`,
  description: [
    "The horizontal axis is distance from the axis in mm, from 0 to the wall at R = 0.2 mm; the vertical axis is speed v(r).",
    `v(r) = v_max(1 − r²/R²) with v_max = Δp R²/4ηL = ${vmax.toFixed(1)} m s⁻¹.`,
    `Adding up v × 2πr dr over the cross-section gives Q = πR⁴Δp/8ηL = ${(Q * 1e6).toFixed(2)} × 10⁻⁶ m³ s⁻¹, equal to the mean speed ${(vmax / 2).toFixed(1)} m s⁻¹ times πR².`,
  ],
  range: { x: [0, 0.22], y: [0, 20] }, ticks: [[0.05, 0.1, 0.15, 0.2], [5, 10, 15, 20]], grid: [0.05, 5], height: [340, 320], xLabelBelow: true,
  axisLabels: ["r / mm", "v / m s^{-1}"],
  curves: [{ expr: `${r1(vmax, 4)}*(1-(x/0.2)^2)`, domain: [0, 0.2], colour: "a1", label: "v(r) = v_max(1 − r²/R²)", labelAt: [0.07, 17.5] }],
  points: [{ x: 0, y: r1(vmax, 2), label: `axis ${vmax.toFixed(1)}`, dx: 10, dy: 20 }, { x: 0.2, y: 0, label: "wall: v = 0", dx: -8, dy: -12, anchor: "end" }],
  checks: [
    { type: "point", expr: `${r1(vmax, 4)}*(1-(x/0.2)^2)`, x: 0, y: r1(vmax, 2), name: `v_max = ${vmax.toFixed(1)} m/s on the axis` },
    { type: "point", expr: `${r1(vmax, 4)}*(1-(x/0.2)^2)`, x: 0.2, y: 0, name: "no slip: v = 0 at the wall" },
    { type: "area", expr: `${r1(vmax, 4)}*(1-(x/0.2)^2)*2*3.14159265*x*0.000001`, from: 0, to: 0.2, value: Q, tol: 2e-8, name: `∫ v 2πr dr = ${(Q * 1e6).toFixed(2)} × 10⁻⁶ m³/s, the Poiseuille flow rate` },
  ],
});

// u08-21 Vorticity: free vortex speed
const Gam = 2, vv = (r) => Gam / (2 * Math.PI * r);
mk("u08-21", "phys-u08-free-vortex", "graph", {
  title: "Speed around a free vortex",
  caption: `Outside the core a vortex of circulation Γ = ${Gam} m² s⁻¹ has v = Γ/2πr: the speed falls as 1/r, so the product v × r stays at ${(Gam / (2 * Math.PI)).toFixed(3)} m² s⁻¹. At r = 0.1 m the speed is ${vv(0.1).toFixed(1)} m s⁻¹; at 0.2 m it halves to ${vv(0.2).toFixed(1)}.`,
  alt: `Graph of speed against distance from the vortex axis, a 1/r curve passing through ${vv(0.1).toFixed(1)} metres per second at 0.1 metres.`,
  description: [
    "The horizontal axis is distance r from the axis in m; the vertical axis is the speed v in m s⁻¹.",
    `v = Γ/2πr = ${Gam}/(2πr). At r = 0.1 m, v = ${vv(0.1).toFixed(1)} m s⁻¹.`,
    `At r = 0.2 m, v = ${vv(0.2).toFixed(2)} m s⁻¹: doubling r halves v, so the circulation round every circle is the same.`,
  ],
  range: { x: [0, 0.5], y: [0, 8] }, ticks: [[0.1, 0.2, 0.3, 0.4, 0.5], [2, 4, 6, 8]], grid: [0.1, 2], height: [340, 320], xLabelBelow: true,
  axisLabels: ["r / m", "v / m s^{-1}"],
  curves: [{ expr: `${r1(Gam / (2 * Math.PI), 4)}/x`, domain: [0.04, 0.5], colour: "a1", label: "v = Γ/2πr", labelAt: [0.2, 4] }],
  points: [{ x: 0.1, y: r1(vv(0.1), 2), label: `0.1 m: ${vv(0.1).toFixed(1)} m/s`, dx: 12, dy: -8 }],
  checks: [{ type: "point", expr: `${(Gam / (2 * Math.PI)).toFixed(6)}/x`, x: 0.1, y: r1(vv(0.1), 2), name: `v = ${vv(0.1).toFixed(1)} m/s at 0.1 m` }, { type: "point", expr: `${(Gam / (2 * Math.PI)).toFixed(6)}/x`, x: 0.2, y: r1(vv(0.2), 2), name: "v halves when r doubles" }],
});
