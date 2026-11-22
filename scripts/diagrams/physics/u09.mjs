// Unit 9, Elasticity and Solid Mechanics. Every number in a caption or a check is computed here once.
// Run: node scripts/diagrams/physics/u09.mjs
import { mk } from "./spec.mjs";
const r1 = (x, d = 1) => +x.toFixed(d);

// u09-05 Hooke's law: the spring of the lesson
const F1 = 2.0, x1 = 0.04, k = F1 / x1, F2 = 5.0, x2 = F2 / k;
mk("u09-05", "phys-u09-hooke-spring", "graph", {
  title: "Hooke's law for the spring",
  caption: `Extension is proportional to force up to the limit of proportionality, so F against x is a straight line through the origin whose gradient is the stiffness k = ${F1.toFixed(1)}/${x1 * 100} cm = ${k} N m⁻¹ (${k / 100} N per cm). Then ${F2.toFixed(1)} N stretches it ${x2 * 100} cm.`,
  alt: `Graph of force in newtons against extension in centimetres: a straight line through the origin passing through (4, 2.0) and (10, 5.0).`,
  description: [
    "The horizontal axis is the extension x in cm; the vertical axis is the force F in N.",
    `The line passes through the origin and the measured point (${x1 * 100} cm, ${F1.toFixed(1)} N): its gradient is k = ${k} N m⁻¹.`,
    `Reading across at ${F2.toFixed(1)} N gives x = ${F2.toFixed(1)}/${k} = ${x2 * 100} cm, as long as the spring stays inside its limit.`,
  ],
  range: { x: [0, 12], y: [0, 6.5] }, ticks: [[2, 4, 6, 8, 10, 12], [1, 2, 3, 4, 5, 6]], grid: [2, 1], height: [340, 320], xLabelBelow: true,
  axisLabels: ["extension x / cm", "force F / N"],
  curves: [{ expr: `${k / 100}*x`, colour: "a1", label: `F = kx, k = ${k} N/m`, labelAt: [1, 3.4] }],
  points: [{ x: x1 * 100, y: F1, label: "4.0 cm, 2.0 N", dx: 10, dy: 22 }, { x: x2 * 100, y: F2, label: "10 cm, 5.0 N", dx: -10, dy: -12, anchor: "end" }],
  checks: [{ type: "point", expr: `${k / 100}*x`, x: 4, y: F1, name: "the line passes through (4 cm, 2.0 N)" }, { type: "point", expr: `${k / 100}*x`, x: x2 * 100, y: F2, name: `5.0 N gives ${x2 * 100} cm` }, { type: "slope", expr: `${k / 100}*x`, x: 3, value: k / 100, name: `gradient k = ${k} N/m` }],
});

// u09-06 Elastic and plastic: loading, then unloading along a line parallel to the elastic one (illustrative copper numbers)
const E = 1100, ye = 0.1, sy = E * ye, e2 = 0.6, s2 = 250, ep = e2 - s2 / E;
mk("u09-06", "phys-u09-unloading", "graph", {
  title: "Loading past the elastic limit and unloading",
  caption: `Up to the elastic limit (here ${sy} MPa at ${ye}% strain; illustrative values) the line has gradient E. Past it the wire deforms plastically. Unloading from ${s2} MPa follows a line parallel to the original one, so stress reaches zero at a permanent strain of ${ep.toFixed(2)}%.`,
  alt: `Stress–strain graph: a steep straight line to the elastic limit, a flatter curve beyond it, and an unloading line parallel to the first that meets the strain axis at a permanent strain of ${ep.toFixed(2)} percent.`,
  description: [
    "The horizontal axis is strain in %; the vertical axis is stress in MPa. The values are illustrative.",
    `Loading: σ = Eε with gradient ${E} MPa per % strain (E = 110 GPa) up to the elastic limit at (${ye}%, ${sy} MPa).`,
    `Plastic region: the curve flattens as dislocations move, up to (${e2}%, ${s2} MPa) where the load is removed.`,
    `Unloading: a line with the same gradient ${E}, reaching zero stress at ${ep.toFixed(2)}% strain. That offset is the permanent plastic strain.`,
  ],
  range: { x: [0, 0.7], y: [0, 300] }, ticks: [[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7], [50, 100, 150, 200, 250, 300]], grid: [0.1, 50], height: [340, 320], xLabelBelow: true,
  axisLabels: ["strain / %", "stress / MPa"],
  curves: [
    { expr: `${E}*x`, domain: [0, ye], colour: "a1", width: 3.4 },
    { expr: `${sy}+${r1((s2 - sy) / Math.sqrt((e2 - ye) / 1), 3)}*sqrt((x-${ye})/1)`, domain: [ye, e2], colour: "a2", label: "plastic", labelAt: [0.3, 215] },
    { expr: `${s2}+${E}*(x-${e2})`, domain: [ep, e2], colour: "a4", dash: "6 5", label: "unloading", labelAt: [0.5, 130] },
  ],
  points: [{ x: ye, y: sy, label: "elastic limit", dx: 12, dy: 18 }, { x: ep, y: 0, label: `permanent strain ${ep.toFixed(2)}%`, dx: 0, dy: -14 }],
  checks: [
    { type: "slope", expr: `${E}*x`, x: 0.05, value: E, name: `loading gradient E = ${E} MPa per %` },
    { type: "slope", expr: `${s2}+${E}*(x-${e2})`, x: 0.5, value: E, name: "the unloading line is parallel to the elastic line" },
    { type: "point", expr: `${s2}+${E}*(x-${e2})`, x: ep, y: 0, name: `unloading reaches zero stress at ${ep.toFixed(2)}% strain` },
  ],
});

// u09-08 Elastic energy: area under F-x
const ks = 800, xs = 0.05, Es = 0.5 * ks * xs * xs, ms = 0.02, vs = Math.sqrt((2 * Es) / ms);
mk("u09-08", "phys-u09-spring-energy", "graph", {
  title: "Energy stored in the spring",
  caption: `The force grows from 0 to ${ks * xs} N as the spring is compressed ${xs * 100} cm, so the work done is the area of the triangle under the line: ½ × ${ks * xs} × ${xs} = ${Es.toFixed(1)} J, not F × x. That energy launches the ${ms * 1000} g ball at √(2 × ${Es.toFixed(1)}/${ms}) = ${vs.toFixed(0)} m s⁻¹.`,
  alt: `Graph of force against compression for a spring of stiffness 800 newtons per metre: a straight line to ${ks * xs} newtons at 5 centimetres, with the triangle under it shaded and labelled ${Es.toFixed(1)} joule.`,
  description: [
    "The horizontal axis is compression x in m; the vertical axis is force F in N.",
    `F = ${ks}x reaches ${ks * xs} N at x = ${xs} m.`,
    `The shaded triangle has area ½Fx = ½ × ${ks * xs} × ${xs} = ${Es.toFixed(1)} J: the stored elastic energy.`,
    `All of it becomes kinetic energy: ½ × ${ms} × v² = ${Es.toFixed(1)} J, so v = ${vs.toFixed(0)} m s⁻¹.`,
  ],
  range: { x: [0, 0.06], y: [0, 50] }, ticks: [[0.01, 0.02, 0.03, 0.04, 0.05, 0.06], [10, 20, 30, 40, 50]], grid: [0.01, 10], height: [340, 320], xLabelBelow: true,
  axisLabels: ["compression x / m", "force F / N"],
  curves: [{ expr: `${ks}*x`, domain: [0, xs], colour: "a1", label: "F = kx", labelAt: [0.008, 22] }],
  areas: [{ expr: `${ks}*x`, from: 0, to: xs, colour: "a1", opacity: 0.2 }],
  points: [{ x: xs, y: ks * xs, label: `${ks * xs} N at 5 cm`, dx: -10, dy: -12, anchor: "end" }],
  marks: [],
  checks: [{ type: "area", expr: `${ks}*x`, from: 0, to: xs, value: Es, tol: 0.002, name: `area under F–x is ${Es.toFixed(1)} J` }, { type: "point", expr: `${ks}*x`, x: xs, y: ks * xs, name: `${ks * xs} N at 5 cm` }],
});

// u09-10 Beam deflection: the shelf, sag along the span
const L = 2, wload = 150, EI = 1e10 * ((0.25 * 0.02 ** 3) / 12), sagMax = (5 * wload * L ** 4) / (384 * EI);
const c = (100 * wload) / (24 * EI);
mk("u09-10", "phys-u09-shelf-sag", "graph", {
  title: "The shelf's sag along its span",
  caption: `A simply supported ${L} m shelf under a uniform load of ${wload} N m⁻¹ sags most at the middle: δ = 5wL⁴/384EI = ${(sagMax * 100).toFixed(2)} cm (the lesson's 1.9 cm), with no sag at the two supports. The curve is symmetrical about the midpoint.`,
  alt: `Graph of sag in centimetres against position along the shelf from 0 to 2 metres: a smooth symmetrical arch zero at both ends and ${(sagMax * 100).toFixed(2)} centimetres at the middle.`,
  description: [
    "The horizontal axis is position along the shelf in m; the vertical axis is the sag in cm (downward).",
    `I = bh³/12 = ${(EI / 1e10).toExponential(2)} m⁴, so EI = ${EI.toFixed(0)} N m².`,
    `δ(x) = w x (L³ − 2Lx² + x³)/24EI is zero at x = 0 and x = ${L} m.`,
    `At the middle (x = ${L / 2} m) δ = 5wL⁴/384EI = ${(sagMax * 100).toFixed(2)} cm.`,
  ],
  range: { x: [0, 2], y: [0, 2.4] }, ticks: [[0.5, 1, 1.5, 2], [0.5, 1, 1.5, 2]], grid: [0.5, 0.5], height: [340, 320], xLabelBelow: true,
  axisLabels: ["position x / m", "sag δ / cm"],
  curves: [{ expr: `${c.toFixed(6)}*x*(8-4*x*x+x*x*x)`, colour: "a1", label: "sag", labelAt: [0.2, 1.2] }],
  points: [{ x: 1, y: r1(sagMax * 100, 3), label: `${(sagMax * 100).toFixed(2)} cm`, dx: 0, dy: -14, anchor: "middle" }],
  checks: [
    { type: "max", expr: `${c.toFixed(6)}*x*(8-4*x*x+x*x*x)`, domain: [0, 2], x: 1, y: r1(sagMax * 100, 3), name: `maximum sag ${(sagMax * 100).toFixed(2)} cm at the midpoint` },
    { type: "point", expr: `${c.toFixed(6)}*x*(8-4*x*x+x*x*x)`, x: 2, y: 0, name: "no sag at the right support" },
  ],
});

// u09-13 Viscoelasticity: Maxwell relaxation
const tau = 1e6 / 1e6;
mk("u09-13", "phys-u09-maxwell-relaxation", "graph", {
  title: "Stress relaxation of a Maxwell material",
  caption: `Held at fixed strain, a Maxwell material's stress decays as σ = σ₀e^{−t/τ} with relaxation time τ = η/E = ${tau} s. After one τ the stress is 1/e = ${Math.exp(-1).toFixed(3)} of its starting value, after ${3} τ only ${Math.exp(-3).toFixed(3)}.`,
  alt: `Graph of stress divided by initial stress against time in seconds: an exponential decay falling to 0.368 at 1 second.`,
  description: [
    "The horizontal axis is time in s after the strain is applied; the vertical axis is σ/σ₀.",
    `τ = η/E = 10⁶ Pa s / 10⁶ Pa = ${tau} s.`,
    `σ/σ₀ = e^{−t/τ}: ${Math.exp(-1).toFixed(3)} at t = 1 s, ${Math.exp(-2).toFixed(3)} at 2 s, ${Math.exp(-3).toFixed(3)} at 3 s.`,
  ],
  range: { x: [0, 4], y: [0, 1.1] }, ticks: [[1, 2, 3, 4], [0.25, 0.5, 0.75, 1]], grid: [1, 0.25], height: [340, 320], xLabelBelow: true,
  axisLabels: ["time t / s", "σ/σ₀"],
  curves: [{ expr: `exp(-x/${tau})`, colour: "a1", label: "e^{−t/τ}", labelAt: [1.6, 0.5] }],
  points: [{ x: tau, y: r1(Math.exp(-1), 4), label: "t = τ: 0.368", dx: 12, dy: -10 }],
  checks: [{ type: "point", expr: `exp(-x/${tau})`, x: tau, y: r1(Math.exp(-1), 4), name: "stress falls to 1/e after one relaxation time" }, { type: "point", expr: `exp(-x/${tau})`, x: 3, y: r1(Math.exp(-3), 4), name: "0.050 of the stress is left after 3τ" }],
});

// u09-19 Fracture: critical crack length
const KIC = 50, Y = 1.12, sig = 200, ac = (KIC / (Y * sig)) ** 2 / Math.PI * 1000;
mk("u09-19", "phys-u09-critical-crack", "graph", {
  title: "When a crack becomes critical",
  caption: `The stress intensity K = Yσ√(πa) rises with the crack length a. At σ = ${sig} MPa it reaches the steel's toughness K_IC = ${KIC} MPa √m when a = ${ac.toFixed(1)} mm: any longer and the plate fractures. At half the crack length K is only ${(Y * sig * Math.sqrt(Math.PI * ac / 2000)).toFixed(0)} MPa √m.`,
  alt: `Graph of stress intensity against crack length in millimetres: a rising square-root curve crossing the horizontal toughness line at 50 MPa root metre at a crack length of ${ac.toFixed(1)} millimetres.`,
  description: [
    "The horizontal axis is the edge-crack length a in mm; the vertical axis is K in MPa √m.",
    `K = Yσ√(πa) with Y = ${Y} and σ = ${sig} MPa rises as the square root of a.`,
    `The dashed line is the toughness K_IC = ${KIC} MPa √m.`,
    `They cross at a_c = (K_IC/Yσ)²/π = (${KIC}/${Y * sig})²/π = ${ac.toFixed(1)} mm.`,
  ],
  range: { x: [0, 30], y: [0, 80] }, ticks: [[5, 10, 15, 20, 25, 30], [20, 40, 60, 80]], grid: [5, 20], height: [340, 320], xLabelBelow: true,
  axisLabels: ["crack length a / mm", "K / MPa m^{1/2}"],
  curves: [{ expr: `${Y * sig}*sqrt(3.14159265*x/1000)`, colour: "a1", label: "K = Yσ√(πa)", labelAt: [20, 66] }, { expr: `${KIC}`, colour: "a2", dash: "6 5", label: "K_IC = 50", labelAt: [1, 54] }],
  points: [{ x: r1(ac, 2), y: KIC, label: `a_c = ${ac.toFixed(1)} mm`, dx: 12, dy: 28 }],
  checks: [{ type: "intersect", a: `${Y * sig}*sqrt(3.14159265*x/1000)`, b: `${KIC}`, x: r1(ac, 2), y: KIC, name: `K reaches K_IC at a = ${ac.toFixed(1)} mm` }],
});
