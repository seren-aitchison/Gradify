// Unit 32, Geophysics. Every number in a caption or claim is computed here once, from the lesson's own worked example.
// Run: node scripts/diagrams/physics/u32.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));

// u32-04 the geothermal gradient: 30 °C km⁻¹ from 10 °C at the surface
{ const T = "10+30*x";
  mk("u32-04", "phys-u32-geotherm", "graph", {
    title: "Temperature rising with depth",
    caption: "In the upper crust temperature rises by about 30 °C per kilometre. Starting from 10 °C at the surface, rock at 5 km is about 160 °C: hot enough to drive a geothermal power plant.",
    alt: "Temperature against depth, a straight line from 10 degrees at the surface to 160 at 5 kilometres.",
    description: ["Gradient: 30 °C km⁻¹; surface 10 °C.", "T = 10 + 30 × depth (km).", "At 5 km: 10 + 150 = 160 °C.", "The gradient is not constant all the way down; it flattens in the mantle."],
    range: { x: [0, 6], y: [0, 200] }, ticks: [[1, 2, 3, 4, 5, 6], [50, 100, 150, 200]], height: [320, 300], xLabelBelow: true, axisLabels: ["depth / km", "temperature / °C"],
    curves: [{ expr: T, colour: "a1" }], marks: [{ x: 5, to: 160 }],
    points: [{ x: 5, y: 160, colour: "a2", label: "160 °C at 5 km", anchor: "end", dx: -10, dy: -10 }],
    checks: [{ type: "point", expr: T, x: 5, y: 160, name: "160 °C at 5 km" }, { type: "slope", expr: T, x: 2, value: 30, name: "30 °C per km" }],
  }); }

// u32-05 P and S travel-time curves; with v_P = 6.0 and v_S = 24/7 km s⁻¹ the S–P delay is d/8 s per km
{ const vp = 6, vs = 24 / 7, tp = `x/${vp}`, ts = `x/${vs}`, d = 30 * 8;
  mk("u32-05", "phys-u32-travel-times", "graph", {
    title: "Locating an earthquake from the S–P delay",
    caption: `P waves (about ${vp} km s⁻¹) outrun S waves (about ${r(vs, 1)} km s⁻¹), so the gap between their arrivals grows with distance: about 1 s for every 8 km. An S wave 30 s behind the P wave puts the quake about ${d} km away; three stations fix the epicentre.`,
    alt: "Arrival time against distance for P and S waves, two straight lines from the origin that spread apart, with a 30 second gap at 240 kilometres marked.",
    description: [`P arrival: t = d / ${vp}. S arrival: t = d / ${r(vs, 2)}.`, "The gap grows as d (1/v_S − 1/v_P) = d / 8 s per km.", `A 30 s gap: d = 8 × 30 = ${d} km (P at ${d / vp} s, S at ${r(d / vs, 0)} s).`],
    range: { x: [0, 400], y: [0, 120] }, ticks: [[100, 200, 300, 400], [30, 60, 90, 120]], height: [320, 300], xLabelBelow: true, axisLabels: ["distance from the quake / km", "arrival time / s"],
    curves: [{ expr: tp, colour: "a1", label: "P wave", labelAt: [330, 46] }, { expr: ts, colour: "a2", label: "S wave", labelAt: [280, 100], anchor: "end" }],
    arrows: [{ from: [d, d / vp], to: [d, d / vs], both: true, colour: "ink", label: "30 s", labelAt: [d + 12, 55] }],
    checks: [{ type: "point", expr: `${ts}-${tp}`, x: d, y: 30, name: `a 30 s gap at ${d} km` }, { type: "slope", expr: `${ts}-${tp}`, x: 100, value: 0.125, name: "the gap grows 1 s per 8 km" }],
  }); }

// u32-07 Gutenberg–Richter with b = 1: ten times as many quakes per unit of magnitude lower
{ const items = [4, 5, 6, 7].map((M) => ({ key: `M = ${M}`, value: 10 ** (8 - M) }));
  mk("u32-07", "phys-u32-gutenberg-richter", "trend", {
    title: "Small earthquakes are far more common",
    caption: "The Gutenberg–Richter law, log₁₀ N = a − bM, with b ≈ 1, means each step down in magnitude brings ten times as many earthquakes: for every M6 there are about ten M5s and a hundred M4s.",
    alt: "Bar chart on a log scale of earthquake counts by magnitude: 10 000 at M4, 1000 at M5, 100 at M6, 10 at M7 (illustrative).",
    description: ["Counts for a region and time span chosen so that M7 has 10 (illustrative).", "M6: 100. M5: 1000. M4: 10 000.", "Each magnitude step is a factor of ten in number (b = 1), while each step up releases about 32 times more energy."],
    kind: "bars", log: true, range: [1, 100000], ticks: [1, 10, 100, 1000, 10000, 100000], yLabel: "number of earthquakes (log scale)", items,
    claims: [{ type: "decreasing" }],
  }); }

// u32-11 paleomagnetic inclination: tan I = 2 tan λ
{ const lam = (Math.atan(Math.tan(Math.PI / 6) / 2) * 180) / Math.PI, I = "asin(2*tan(x*3.14159265/180)/sqrt(1+4*tan(x*3.14159265/180)^2))*180/3.14159265";
  mk("u32-11", "phys-u32-inclination-latitude", "graph", {
    title: "Magnetic inclination records latitude",
    caption: `In a dipole field the dip of the field lines depends on latitude: tan I = 2 tan λ. A lava that froze in a 30° inclination formed at λ = tan⁻¹(tan 30°/2) ≈ ${r(lam, 0)}°, so the rock has moved if it now lies elsewhere.`,
    alt: "Magnetic inclination against latitude, rising from zero at the equator to 90 degrees at the pole, with 30 degrees of inclination at 16 degrees of latitude marked.",
    description: ["tan I = 2 tan λ: horizontal field at the equator (I = 0), vertical at the poles (I = 90°).", `I = 30°: tan λ = tan 30° / 2 = ${r(Math.tan(Math.PI / 6) / 2, 3)}, so λ = ${r(lam, 1)}°.`, "Rocks of different ages from one continent give different latitudes: evidence of drift."],
    range: { x: [0, 90], y: [0, 95] }, ticks: [[15, 30, 45, 60, 75, 90], [30, 60, 90]], height: [320, 300], xLabelBelow: true, axisLabels: ["latitude / °", "inclination / °"],
    curves: [{ expr: I, domain: [0, 89.9], colour: "a1" }], marks: [{ x: lam, to: 30 }, { y: 30, to: lam }],
    points: [{ x: r(lam, 4), y: 30, colour: "a2", label: `30° at ${r(lam, 0)}° latitude`, dx: 10, dy: 14 }],
    checks: [{ type: "point", expr: I, x: r(lam, 8), y: 30, name: `I = 30° at λ = ${r(lam, 1)}°` }, { type: "point", expr: I, x: 45, y: r((Math.atan(2) * 180) / Math.PI, 6), name: "tan I = 2 at 45° latitude" }],
  }); }

// u32-20 tsunami speed v = √(gd)
{ const v = "sqrt(9.8*x)", at = Math.sqrt(9.8 * 4000), hours = 3e6 / at / 3600;
  mk("u32-20", "phys-u32-tsunami-speed", "graph", {
    title: "Tsunami speed depends on ocean depth",
    caption: `A tsunami's wavelength is far longer than the ocean is deep, so it travels as a shallow-water wave at v = √(gd). Over 4000 m of ocean that is ${r(at, 0)} m s⁻¹ (about 710 km h⁻¹), crossing 3000 km in about ${r(hours, 1)} hours; it slows and grows taller as the water shallows.`,
    alt: "Wave speed against ocean depth, a square-root curve, with 198 metres per second at 4000 metres marked.",
    description: ["v = √(g d), g = 9.8 m s⁻².", `d = 4000 m: v = ${r(at, 1)} m s⁻¹.`, `3000 km takes ${r(3e6 / at, 0)} s ≈ ${r(hours, 1)} h.`, "At 10 m depth near the coast: about 10 m s⁻¹."],
    range: { x: [0, 6000], y: [0, 260] }, ticks: [[1000, 2000, 3000, 4000, 5000, 6000], [50, 100, 150, 200, 250]], height: [320, 300], xLabelBelow: true, axisLabels: ["ocean depth / m", "speed / m s⁻¹"],
    curves: [{ expr: v, colour: "a1" }], marks: [{ x: 4000, to: at }],
    points: [{ x: 4000, y: r(at, 4), colour: "a2", label: `${r(at, 0)} m s⁻¹ at 4000 m`, anchor: "end", dx: -10, dy: -10 }],
    checks: [{ type: "point", expr: v, x: 4000, y: r(at, 6), name: `${r(at, 0)} m s⁻¹ at 4000 m` }],
  }); }
