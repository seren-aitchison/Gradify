// Unit 36, Optoelectronics and Photonics. Every number in a caption or claim is computed here once, from the lesson's
// own worked example. Run: node scripts/diagrams/physics/u36.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));
const PI = "3.14159265";

// u36-05 a Mach–Zehnder modulator: T = cos²(πV / 2V_π), V_π = 3 V
{ const Vpi = 3, T = `cos(${PI}*x/(2*${Vpi}))^2`;
  mk("u36-05", "phys-u36-mzm-transfer", "graph", {
    title: "Transfer curve of a Mach–Zehnder modulator",
    caption: `The voltage shifts the phase in one arm, so the two arms interfere: T = cos²(πV/2V_π). With V_π = ${Vpi} V, the output is fully on at 0 V, half at 1.5 V (the quadrature point, where modulation is most linear) and off at ${Vpi} V.`,
    alt: "Transmitted fraction against voltage, a cosine-squared curve from 1 at 0 volts through 0.5 at 1.5 volts to 0 at 3 volts and back up.",
    description: [`T = cos²(πV / (2 × ${Vpi} V)).`, "V = 0: T = 1. V = 1.5 V: cos²(π/4) = 0.5. V = 3 V: T = 0.", "Around 1.5 V the curve is steepest and nearly straight, the usual bias point."],
    range: { x: [0, 6], y: [0, 1.1] }, ticks: [[1.5, 3, 4.5, 6], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["voltage / V", "fraction transmitted"],
    curves: [{ expr: T, colour: "a1" }], marks: [{ x: 1.5, to: 0.5 }],
    points: [{ x: 1.5, y: 0.5, colour: "a2", label: "0.5 at 1.5 V", dx: 10, dy: -10 }, { x: Vpi, y: 0, colour: "ink" }],
    checks: [{ type: "point", expr: T, x: 1.5, y: 0.5, name: "half transmitted at 1.5 V" }, { type: "point", expr: T, x: Vpi, y: 0, name: "fully off at V_π" }, { type: "slope", expr: T, x: 1.5, value: r(-Math.PI / (2 * Vpi), 8), name: "steepest at the quadrature point" }],
  }); }

// u36-08 a 100 km fibre at 0.2 dB km⁻¹ launched at 1 mW (0 dBm)
{ const P = "-0.2*x";
  mk("u36-08", "phys-u36-fibre-loss", "graph", {
    title: "Power along an optical fibre",
    caption: "In decibels, fibre loss is a straight line: 0.2 dB km⁻¹ over 100 km is 20 dB, a factor of 100. Launched at 1 mW (0 dBm), the signal arrives at −20 dBm = 10 μW.",
    alt: "Power in dBm against distance, a straight line falling from 0 at the start to minus 20 at 100 kilometres.",
    description: ["Power in dBm = 10 log₁₀(P / 1 mW).", "Loss 0.2 dB km⁻¹: after 50 km, −10 dBm (100 μW); after 100 km, −20 dBm (10 μW).", "On a linear power axis the same fall would be an exponential."],
    range: { x: [0, 120], y: [-25, 6] }, ticks: [[20, 40, 60, 80, 100, 120], [-20, -15, -10, -5, 0]], height: [320, 300], xLabelBelow: true, axisLabels: ["distance / km", "power / dBm"],
    curves: [{ expr: P, colour: "a1" }],
    points: [{ x: 0, y: 0, colour: "a4", label: "1 mW (0 dBm)", dx: 10, dy: -14 }, { x: 100, y: -20, colour: "a2", label: "10 μW (−20 dBm)", anchor: "end", dx: -10, dy: 14 }],
    checks: [{ type: "point", expr: P, x: 100, y: -20, name: "20 dB lost in 100 km" }, { type: "point", expr: "10*log(10^(-0.2*x/10))/log(10)", x: 100, y: -20, name: "−20 dBm is 10 μW" }],
  }); }

// u36-12 a 20 fs Gaussian pulse broadened by group-delay dispersion
{ const t0 = 20, f = `${t0}*sqrt(1+(4*0.693147*x/${t0 * t0})^2)`, at = t0 * Math.sqrt(1 + ((4 * Math.LN2 * 360) / (t0 * t0)) ** 2);
  mk("u36-12", "phys-u36-pulse-broadening", "graph", {
    title: "A femtosecond pulse spreads in glass",
    caption: `A short pulse has a wide spectrum, and glass delays its colours by different amounts. A ${t0} fs pulse through 1 cm of glass (GDD = 360 fs²) leaves about ${r(at, 0)} fs long: τ = τ₀√(1 + (4 ln 2 GDD/τ₀²)²). Shorter pulses broaden far more.`,
    alt: "Output pulse duration against group-delay dispersion, rising from 20 femtoseconds and becoming nearly a straight line, with 54 femtoseconds at 360 square femtoseconds marked.",
    description: [`τ₀ = ${t0} fs (Gaussian, FWHM).`, "τ = τ₀ √(1 + (4 ln 2 × GDD / τ₀²)²).", `GDD = 360 fs²: 4 ln 2 × 360 / 400 = ${r((4 * Math.LN2 * 360) / 400, 2)}, so τ ≈ ${r(at, 1)} fs.`, "Chirped mirrors or prism pairs add opposite GDD to undo it."],
    range: { x: [0, 800], y: [0, 120] }, ticks: [[200, 400, 600, 800], [20, 40, 60, 80, 100, 120]], height: [320, 300], xLabelBelow: true, axisLabels: ["group-delay dispersion / fs²", "pulse duration / fs"],
    curves: [{ expr: f, colour: "a1" }], marks: [{ x: 360, to: at }],
    points: [{ x: 360, y: r(at, 4), colour: "a2", label: `${r(at, 0)} fs`, anchor: "end", dx: -10, dy: -10 }],
    checks: [{ type: "point", expr: f, x: 360, y: r(at, 6), name: `${r(at, 1)} fs at 360 fs²` }, { type: "point", expr: f, x: 0, y: t0, name: "unchanged with no dispersion" }],
  }); }
