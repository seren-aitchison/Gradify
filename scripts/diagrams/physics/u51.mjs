// Unit 51, Physics Education and Communication. Numbers computed once from the lessons' worked examples.
// Run: node scripts/diagrams/physics/u51.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));
const g = 9.8, deg = Math.PI / 180;

// u51-02 box at rest on a 30° incline with friction, per kilogram
{ const th = 30, W = g, Nn = g * Math.cos(th * deg), f = g * Math.sin(th * deg);
  mk("u51-02", "phys-u51-incline-fbd", "vectors", {
    title: "Free-body diagram of a box on an incline",
    caption: `Three forces only: weight (${W} N per kg, straight down), the normal force ${r(Nn, 2)} N perpendicular to the slope, and friction up the slope. At rest friction balances the slope component of the weight, mg sin 30° = ${r(f, 2)} N; there is no separate "downhill force" arrow.`,
    alt: "Free-body diagram for 1 kilogram on a 30 degree slope: weight down, normal force perpendicular to the slope, friction up the slope.",
    description: [`Weight ${W} N per kg, vertically down.`, `Normal force mg cos 30° = ${r(Nn, 2)} N, perpendicular to the slope.`, `Friction up the slope, equal to mg sin 30° = ${r(f, 2)} N while the box stays at rest.`, "The three forces sum to zero."],
    mode: "body", units: "N",
    vectors: [{ label: "W", mag: W, angle: 270, source: "Earth's gravity" }, { label: "N", mag: r(Nn, 4), angle: 60, source: "the slope" }, { label: "f", mag: r(f, 4), angle: 150, source: "friction", colour: "a2" }],
    resultant: { label: "net force", mag: 0, angle: 0 }, showResultant: false,
  }); }

// u51-04 skydiver: v = vt tanh(g t / vt), vt = sqrt(2mg/(ρ Cd A))
{ const m = 80, Cd = 1.0, A = 0.7, rho = 1.2, G = 9.81, vt = Math.sqrt((2 * m * G) / (rho * Cd * A)), V = r(vt, 4), z = `${2 * G / V}*x`, e = `${V}*(exp(${z})-1)/(exp(${z})+1)`;
  mk("u51-04", "phys-u51-skydiver", "graph", {
    title: "A skydiver approaches terminal velocity",
    caption: `Setting weight equal to drag, mg = ½ρC_dAv², gives v_t = √(2mg/ρC_dA) = √${r(vt * vt, 0)} ≈ ${r(vt, 0)} m s⁻¹. The speed starts with slope g and flattens towards v_t; after about 10 s it is within 2% of it.`,
    alt: "Speed against time for a skydiver, rising from zero with slope g and levelling off at a dashed line at 43 metres per second.",
    description: [`v_t = √(2 × ${m} × ${G} / (${rho} × ${Cd} × ${A})) = ${r(vt, 1)} m s⁻¹.`, `With drag, v(t) = v_t tanh(gt/v_t); at t = 10 s v = ${r(vt * Math.tanh((G * 10) / vt), 1)} m s⁻¹.`, "At first drag is negligible and v ≈ gt."],
    range: { x: [0, 20], y: [0, 50] }, ticks: [[5, 10, 15, 20], [10, 20, 30, 40, 50]], height: [320, 300], xLabelBelow: true, axisLabels: ["time / s", "speed / m s⁻¹"],
    curves: [{ expr: e, colour: "a1" }], marks: [{ y: r(vt, 1), label: `terminal ${r(vt, 0)}` }],
    checks: [{ type: "value", expr: e, x: 20, between: [r(vt * 0.98, 2), r(vt, 2)], name: "approaches but stays below v_t" }, { type: "point", expr: `sqrt(2*${m}*${G}/(${rho}*${Cd}*${A}))+0*x`, x: 0, y: r(vt, 6), name: `v_t = ${r(vt, 1)} m s⁻¹` }, { type: "slope", expr: e, x: 0, value: G, name: "initial slope g" }],
  }); }

// u51-07 log–log plot of T against r, gradient 1.5 (r in AU, T in years)
{ const pts = [["Earth", 1], ["Mars", 1.524], ["Jupiter", 5.203]].map(([n, a]) => ({ n, x: r(Math.log10(a), 4), y: r(Math.log10(a ** 1.5), 4) }));
  mk("u51-07", "phys-u51-loglog", "graph", {
    title: "A log–log gradient of 1.5",
    caption: `If log T = 1.5 log r + c, then T = 10^c r^1.5: a power law. Planets (r in AU, T in years) lie on a straight line of gradient 1.5 through the origin, since Earth has r = T = 1. Squaring gives T² ∝ r³, Kepler's third law.`,
    alt: "Straight line of log T against log r with gradient 1.5 through the origin, with points for Earth, Mars and Jupiter.",
    description: ["Plot log₁₀ T against log₁₀ r.", "Gradient 1.5 means T ∝ r^1.5.", `Mars: log r = ${pts[1].x}, log T = ${pts[1].y} (T = 1.88 years). Jupiter: log r = ${pts[2].x}, log T = ${pts[2].y} (T = 11.9 years).`, "T² ∝ r³."],
    range: { x: [-0.1, 0.9], y: [-0.1, 1.4] }, ticks: [[0.2, 0.4, 0.6, 0.8], [0.4, 0.8, 1.2]], height: [320, 300], xLabelBelow: true, axisLabels: ["log r", "log T"],
    curves: [{ expr: "1.5*x", domain: [-0.05, 0.9], colour: "a1", label: "gradient 1.5", labelAt: [0.55, 0.5] }],
    points: pts.map((p, i) => ({ x: p.x, y: p.y, colour: "a2", label: p.n, dx: i === 0 ? 10 : -8, dy: i === 0 ? 18 : i === 1 ? -6 : 14, ...(i ? { anchor: "end" } : {}) })),
    checks: [{ type: "slope", expr: "1.5*x", x: 0.4, value: 1.5, name: "gradient 1.5" }, { type: "point", expr: "1.5*x", x: pts[2].x, y: pts[2].y, tol: 0.001, name: "Jupiter on the line" }],
  }); }
