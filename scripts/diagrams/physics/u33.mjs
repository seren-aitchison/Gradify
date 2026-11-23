// Unit 33, Atmospheric Physics and Climate. Every number in a caption or claim is computed here once, from the lesson's
// own worked example. Run: node scripts/diagrams/physics/u33.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));

// u33-01 the environmental lapse rate: 6.5 K km⁻¹ from 15 °C
{ const T = "15-6.5*x";
  mk("u33-01", "phys-u33-lapse-rate", "graph", {
    title: "Temperature falling with height",
    caption: "In the troposphere the air cools by about 6.5 K for every kilometre of height. From 15 °C at the surface it reaches −37 °C at 8 km, close to where airliners cruise.",
    alt: "Temperature against height, a straight line falling from 15 degrees at the surface to minus 37 degrees at 8 kilometres.",
    description: ["Lapse rate 6.5 K km⁻¹; surface 15 °C.", "T = 15 − 6.5h.", "At 8 km: 15 − 52 = −37 °C.", "Above the tropopause (about 11 km) the temperature stops falling."],
    range: { x: [0, 10], y: [-60, 20] }, ticks: [[2, 4, 6, 8, 10], [-60, -40, -20, 0, 20]], height: [320, 300], xLabelBelow: true, axisLabels: ["height / km", "temperature / °C"],
    curves: [{ expr: T, colour: "a1" }], marks: [{ x: 8, to: -37 }],
    points: [{ x: 8, y: -37, colour: "a2", label: "−37 °C at 8 km", anchor: "end", dx: -10, dy: 12 }],
    checks: [{ type: "point", expr: T, x: 8, y: -37, name: "−37 °C at 8 km" }, { type: "slope", expr: T, x: 3, value: -6.5, name: "−6.5 K per km" }],
  }); }

// u33-02 pressure falling with height: scale height 8 km
{ const p = "1013*exp(-x/8)", at3 = 1013 * Math.exp(-3 / 8);
  mk("u33-02", "phys-u33-pressure-height", "graph", {
    title: "Pressure falls exponentially with height",
    caption: `With a scale height H = 8 km, p = p₀e^(−h/H). At 3000 m the pressure is 1013 × e^(−3/8) ≈ ${r(at3, -1)} hPa; it halves about every ${r(8 * Math.log(2), 1)} km.`,
    alt: "Pressure in hectopascals against height, an exponential decay from 1013 at sea level through 700 at 3 kilometres.",
    description: ["p = 1013 hPa × e^(−h / 8 km).", `h = 3 km: ${r(at3, 0)} hPa.`, `Halves every 8 ln 2 = ${r(8 * Math.log(2), 2)} km.`],
    range: { x: [0, 20], y: [0, 1100] }, ticks: [[5, 10, 15, 20], [250, 500, 750, 1000]], height: [320, 300], xLabelBelow: true, axisLabels: ["height / km", "pressure / hPa"],
    curves: [{ expr: p, colour: "a1" }], marks: [{ x: 3, to: at3 }],
    points: [{ x: 3, y: r(at3, 3), colour: "a2", label: `${r(at3, -1)} hPa at 3 km`, dx: 10, dy: -10 }],
    checks: [{ type: "point", expr: p, x: 3, y: r(at3, 6), name: `${r(at3, 0)} hPa at 3 km` }, { type: "point", expr: p, x: r(8 * Math.log(2), 8), y: 506.5, name: "half the sea-level pressure at 8 ln 2 km" }],
  }); }

// u33-04 transmission through an optical depth τ: e^(−τ)
{ const f = "exp(-x)", at = Math.exp(-0.3);
  mk("u33-04", "phys-u33-optical-depth", "graph", {
    title: "Transmission through an optical depth",
    caption: `Light is attenuated exponentially: the fraction transmitted is e^(−τ). An atmosphere of optical depth 0.3 lets through ${r(at * 100, 0)}% of the beam; at τ = 1, 37%.`,
    alt: "Fraction transmitted against optical depth, an exponential decay from 1, with 0.74 marked at 0.3.",
    description: ["Transmitted fraction = e^(−τ).", `τ = 0.3: ${r(at, 3)}.`, "τ = 1: 0.368. τ = 3: 0.050."],
    range: { x: [0, 3], y: [0, 1.05] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["optical depth τ", "fraction transmitted"],
    curves: [{ expr: f, colour: "a1" }], marks: [{ x: 0.3, to: at }],
    points: [{ x: 0.3, y: r(at, 5), colour: "a2", label: `${r(at * 100, 0)}% at τ = 0.3`, dx: 10, dy: -10 }],
    checks: [{ type: "point", expr: f, x: 0.3, y: r(at, 8), name: `${r(at * 100, 1)}% transmitted at τ = 0.3` }],
  }); }

// u33-09 saturation vapour pressure (the lesson's form): 611 Pa × exp(17.27T/(T + 237.3))
{ const es = "611*exp(17.27*x/(x+237.3))", at20 = 611 * Math.exp((17.27 * 20) / 257.3);
  mk("u33-09", "phys-u33-saturation-vapour", "graph", {
    title: "Warm air holds much more water vapour",
    caption: `The saturation vapour pressure rises roughly exponentially with temperature, about 7% per kelvin. At 20 °C it is ${r(at20, -1)} Pa; at 30 °C nearly twice that. This is why a warmer climate brings heavier rain.`,
    alt: "Saturation vapour pressure in pascals against temperature, rising ever more steeply, with 2340 pascals at 20 degrees marked.",
    description: ["e_s = 611 Pa × exp(17.27T / (T + 237.3)), T in °C.", `T = 0 °C: 611 Pa. T = 20 °C: ${r(at20, 0)} Pa. T = 30 °C: ${r(611 * Math.exp((17.27 * 30) / 267.3), 0)} Pa.`, "Cooling air towards this curve brings it to saturation: cloud forms."],
    range: { x: [-10, 35], y: [0, 6000] }, ticks: [[-10, 0, 10, 20, 30], [1000, 2000, 3000, 4000, 5000, 6000]], height: [320, 300], xLabelBelow: true, axisLabels: ["temperature / °C", "saturation vapour pressure / Pa"],
    curves: [{ expr: es, colour: "a1" }], marks: [{ x: 20, to: at20 }],
    points: [{ x: 20, y: r(at20, 3), colour: "a2", label: `${r(at20, -1)} Pa at 20 °C`, anchor: "end", dx: -10, dy: -10 }],
    checks: [{ type: "point", expr: es, x: 20, y: r(at20, 6), name: `${r(at20, 0)} Pa at 20 °C` }, { type: "point", expr: es, x: 0, y: 611, name: "611 Pa at 0 °C" }],
  }); }

// u33-15 the logarithmic wind profile: 5 m s⁻¹ at 10 m over grass (z₀ = 0.03 m)
{ const z0 = 0.03, u = `5*log(x/${z0})/log(10/${z0})`, at100 = (5 * Math.log(100 / z0)) / Math.log(10 / z0);
  mk("u33-15", "phys-u33-wind-profile", "graph", {
    title: "Wind speed grows with height",
    caption: `Near the ground the wind follows a logarithmic profile, u ∝ ln(z/z₀). Over grass (z₀ = ${z0} m), 5 m s⁻¹ at 10 m becomes ${r(at100, 1)} m s⁻¹ at 100 m, which is why wind turbines are tall.`,
    alt: "Wind speed against height on a linear axis: rising quickly near the ground then slowly, from 5 metres per second at 10 metres to 7 at 100 metres.",
    description: [`u(z) = 5 m s⁻¹ × ln(z / ${z0}) / ln(10 / ${z0}).`, `At 100 m: 5 × 8.11 / 5.81 = ${r(at100, 2)} m s⁻¹.`, "The profile holds for neutral stability; on calm nights or sunny afternoons it changes."],
    range: { x: [0, 150], y: [0, 9] }, ticks: [[10, 50, 100, 150], [2, 4, 6, 8]], height: [320, 300], xLabelBelow: true, axisLabels: ["height / m", "wind speed / m s⁻¹"],
    curves: [{ expr: u, domain: [0.5, 150], colour: "a1" }], marks: [{ x: 10, to: 5 }, { x: 100, to: at100 }],
    points: [{ x: 10, y: 5, colour: "a4", label: "5 m s⁻¹ at 10 m", dx: 10, dy: 14 }, { x: 100, y: r(at100, 4), colour: "a2", label: `${r(at100, 1)} m s⁻¹ at 100 m`, anchor: "end", dx: -10, dy: -12 }],
    checks: [{ type: "point", expr: u, x: 100, y: r(at100, 6), name: `${r(at100, 2)} m s⁻¹ at 100 m` }, { type: "point", expr: u, x: 10, y: 5, name: "5 m s⁻¹ at 10 m" }],
  }); }
