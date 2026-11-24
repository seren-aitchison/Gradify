// Unit 35, Medical Physics. Every number in a caption or claim is computed here once, from the lesson's own worked
// example. Run: node scripts/diagrams/physics/u35.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));

// u35-05 effective half-life: physical 6 h, biological 3 h, effective 2 h; 600 MBq administered
{ const Tp = 6, Tb = 3, Te = 1 / (1 / Tp + 1 / Tb), A = (T) => `600*2^(-x/${T})`;
  mk("u35-05", "phys-u35-effective-half-life", "graph", {
    title: "Effective half-life in the body",
    caption: `A tracer leaves the body by decay (T_phys = ${Tp} h) and by excretion (T_bio = ${Tb} h) at once, so the rates add: 1/T_eff = 1/${Tp} + 1/${Tb}, T_eff = ${Te} h. Of 600 MBq given, 150 MBq remains after 4 h, two effective half-lives.`,
    alt: "Activity in the body against time: physical decay alone falling slowly, biological clearance alone falling faster, and the effective curve falling fastest, with 150 megabecquerels at 4 hours.",
    description: [`Physical decay alone: half-life ${Tp} h.`, `Biological clearance alone: half-life ${Tb} h.`, `Both together: 1/T_eff = 1/${Tp} + 1/${Tb} = 1/${Te}, T_eff = ${Te} h.`, "Starting from 600 MBq: 300 MBq at 2 h, 150 MBq at 4 h."],
    range: { x: [0, 12], y: [0, 650] }, ticks: [[2, 4, 6, 8, 10, 12], [150, 300, 450, 600]], height: [320, 300], xLabelBelow: true, axisLabels: ["time / h", "activity in the body / MBq"],
    curves: [{ expr: A(Tp), colour: "a3", dash: "6 5" }, { expr: A(Tb), colour: "a4", dash: "6 5" }, { expr: A(Te), colour: "a1" }],
    legend: [[`decay only (${Tp} h)`, "a3", "6 5"], [`excretion only (${Tb} h)`, "a4", "6 5"], [`effective (${Te} h)`, "a1"]], legendData: [4.6, 610],
    points: [{ x: 4, y: 150, colour: "a2", label: "150 MBq at 4 h", anchor: "end", dx: -10, dy: 16 }],
    checks: [{ type: "point", expr: A(Te), x: 4, y: 150, name: "150 MBq after 4 h" }, { type: "point", expr: `600*2^(-x/${Tp})*2^(-x/${Tb})`, x: 2, y: 300, name: "decay and clearance together halve the activity in 2 h" }],
  }); }

// u35-12 inverse square: 80 μSv h⁻¹ at 0.5 m
{ const D = "80*(0.5/x)^2";
  mk("u35-12", "phys-u35-inverse-square", "graph", {
    title: "Distance is the cheapest shielding",
    caption: "From a small source the dose rate falls as 1/r². Stepping back from 0.5 m to 2 m, four times as far, cuts 80 μSv h⁻¹ by a factor of 16, to 5 μSv h⁻¹.",
    alt: "Dose rate against distance from the source, falling steeply as one over r squared from 80 microsieverts per hour at 0.5 metres to 5 at 2 metres.",
    description: ["Dose rate ∝ 1/r² for a point source.", "0.5 m: 80 μSv h⁻¹. 1 m: 20 μSv h⁻¹. 2 m: 5 μSv h⁻¹."],
    range: { x: [0.3, 3], y: [0, 100] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3], [20, 40, 60, 80, 100]], height: [320, 300], xLabelBelow: true, axisLabels: ["distance / m", "dose rate / μSv h⁻¹"],
    curves: [{ expr: D, domain: [0.45, 3], colour: "a1" }],
    points: [{ x: 0.5, y: 80, colour: "a4", label: "80 at 0.5 m", dx: 10, dy: -6 }, { x: 2, y: 5, colour: "a2", label: "5 at 2 m", dx: 4, dy: -16 }],
    checks: [{ type: "point", expr: D, x: 2, y: 5, name: "5 μSv h⁻¹ at 2 m" }, { type: "point", expr: D, x: 1, y: 20, name: "a quarter at twice the distance" }],
  }); }

// u35-18 511 keV absorption in 2 cm of crystal: NaI (μ = 0.34 cm⁻¹) against LSO (0.87 cm⁻¹)
{ const nai = "1-exp(-0.34*x)", lso = "1-exp(-0.87*x)", a = 1 - Math.exp(-0.68), b = 1 - Math.exp(-1.74);
  mk("u35-18", "phys-u35-crystal-absorption", "graph", {
    title: "Stopping 511 keV photons in a PET crystal",
    caption: `The fraction absorbed in thickness x is 1 − e^(−μx). In 2 cm, NaI (μ = 0.34 cm⁻¹) stops ${r(a * 100, 0)}% of 511 keV photons while dense LSO (0.87 cm⁻¹) stops ${r(b * 100, 0)}%, which is why PET scanners use LSO.`,
    alt: "Fraction absorbed against crystal thickness for NaI and LSO, both rising towards 1, LSO much faster: 0.82 against 0.49 at 2 centimetres.",
    description: ["Absorbed fraction = 1 − e^(−μx).", `NaI at 2 cm: 1 − e^(−0.68) = ${r(a, 3)}.`, `LSO at 2 cm: 1 − e^(−1.74) = ${r(b, 3)}.`],
    range: { x: [0, 5], y: [0, 1.05] }, ticks: [[1, 2, 3, 4, 5], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["crystal thickness / cm", "fraction absorbed"],
    curves: [{ expr: lso, colour: "a1", label: "LSO", labelAt: [3, 0.98] }, { expr: nai, colour: "a3", label: "NaI", labelAt: [3.4, 0.62] }],
    marks: [{ x: 2, to: b }],
    points: [{ x: 2, y: r(b, 5), colour: "a1", label: `${r(b * 100, 0)}%`, anchor: "end", dx: -8, dy: -10 }, { x: 2, y: r(a, 5), colour: "a3", label: `${r(a * 100, 0)}%`, dx: 10, dy: 12 }],
    checks: [{ type: "point", expr: nai, x: 2, y: r(a, 8), name: `NaI absorbs ${r(a * 100, 1)}% in 2 cm` }, { type: "point", expr: lso, x: 2, y: r(b, 8), name: `LSO absorbs ${r(b * 100, 1)}% in 2 cm` }],
  }); }
