// Unit 52, Advanced Problem-Solving Skills. Numbers computed once from the lessons' worked examples.
// Run: node scripts/diagrams/physics/u52.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));
const g = 9.8, deg = Math.PI / 180;

// u52-03 frictionless 30° incline, per kilogram
{ const th = 30, Nn = g * Math.cos(th * deg), a = g * Math.sin(th * deg);
  mk("u52-03", "phys-u52-tilted-axes", "vectors", {
    title: "Tilted axes on a frictionless incline",
    caption: `With one axis along the slope the weight splits in two: along the slope mg sin 30° gives a = g sin 30° = ${r(a, 1)} m s⁻²; perpendicular, N = mg cos 30° (${r(Nn, 2)} N per kg) and there is no acceleration. Only weight and the normal force act.`,
    alt: "Free-body diagram for 1 kilogram on a frictionless 30 degree slope: weight down, normal force perpendicular to the slope, net force down the slope.",
    description: [`Weight ${g} N per kg, straight down; normal force ${r(Nn, 2)} N perpendicular to the slope.`, `Net force ${r(a, 1)} N down the slope, so a = g sin 30° = ${r(a, 1)} m s⁻².`],
    mode: "body", units: "N",
    vectors: [{ label: "W", mag: g, angle: 270, source: "Earth's gravity" }, { label: "N", mag: r(Nn, 4), angle: 60, source: "the slope" }],
    resultant: { label: "net force", mag: r(a, 3), angle: 330 }, showResultant: true,
  }); }

// u52-04 2 kg mass on strings at 30° and 60° to the horizontal
{ const W = 2 * 9.8, T1 = W / 2, T2 = Math.sqrt(3) * T1;
  mk("u52-04", "phys-u52-two-strings", "vectors", {
    title: "A mass hanging from two strings",
    caption: `In equilibrium the forces sum to zero. Horizontal: T₁ cos 30° = T₂ cos 60°, so T₂ = √3 T₁. Vertical: T₁ sin 30° + T₂ sin 60° = ${r(W, 1)} N, so T₁ = ${r(T1, 1)} N and T₂ ≈ ${r(T2, 1)} N.`,
    alt: "Free-body diagram of the 2 kilogram mass: weight 19.6 newtons down, tension 9.8 newtons up and left at 30 degrees, tension 17.0 newtons up and right at 60 degrees, net zero.",
    description: [`Weight ${r(W, 1)} N down.`, `T₁ = ${r(T1, 1)} N at 30° above the horizontal, to the left.`, `T₂ = ${r(T2, 2)} N at 60° above the horizontal, to the right.`, `Horizontal: ${r(T1 * Math.cos(30 * deg), 2)} N each way. Vertical: ${r(T1 * 0.5 + T2 * Math.sin(60 * deg), 2)} N up = weight.`],
    mode: "body", units: "N",
    vectors: [{ label: "W", mag: r(W, 2), angle: 270, source: "Earth's gravity" }, { label: "T_{1}", mag: r(T1, 3), angle: 150, source: "string 1" }, { label: "T_{2}", mag: r(T2, 3), angle: 60, source: "string 2" }],
    resultant: { label: "net force", mag: 0, angle: 0 }, showResultant: false,
  }); }

// u52-08 limiting cases of a = g sin θ
{ const e = `${g}*sin(x*0.0174532925)`;
  mk("u52-08", "phys-u52-limits", "graph", {
    title: "Limiting cases of a = g sin θ",
    caption: `At θ = 0 the plane is flat and a = 0; at θ = 90° it is a free fall and a = g = ${g} m s⁻²; in between a = g sin θ rises smoothly (${r(g * 0.5, 1)} m s⁻² at 30°). A formula that gave anything else at the ends would be wrong.`,
    alt: "Acceleration against incline angle from 0 to 90 degrees, rising from 0 to 9.8 metres per second squared.",
    description: ["θ = 0: a = g sin 0 = 0, no slope and no acceleration.", `θ = 30°: a = ${r(g * 0.5, 1)} m s⁻².`, `θ = 90°: a = g = ${g} m s⁻², free fall.`],
    range: { x: [0, 90], y: [0, 11] }, ticks: [[15, 30, 45, 60, 75, 90], [2, 4, 6, 8, 10]], height: [320, 300], xLabelBelow: true, axisLabels: ["θ / °", "a / m s⁻²"],
    curves: [{ expr: e, colour: "a1" }], marks: [{ y: g, label: "g" }],
    points: [{ x: 30, y: r(g * 0.5, 2), colour: "a2", label: `${r(g * 0.5, 1)} at 30°`, dx: 10, dy: 16 }],
    checks: [{ type: "point", expr: e, x: 0, y: 0, name: "a = 0 on the flat" }, { type: "point", expr: e, x: 30, y: r(g * 0.5, 6), name: "a = 4.9 at 30°" }, { type: "point", expr: e, x: 90, y: g, name: "a = g at 90°" }],
  }); }

// u52-13 Euler (h = 0.1) against exact, dy/dt = −y
{ const h = 0.1, eul = [[0, 1]]; for (let i = 0; i < 10; i++) { const [x, y] = eul.at(-1); eul.push([r(x + h, 2), r(y - h * y, 8)]); }
  const E1 = eul[10][1], ex = Math.exp(-1);
  mk("u52-13", "phys-u52-euler-check", "graph", {
    title: "Euler against the exact solution",
    caption: `Euler multiplies by (1 − 0.1) each step, so y(1) ≈ 0.9¹⁰ = ${r(E1, 3)}, against the exact e⁻¹ = ${r(ex, 3)}: an error of about ${r(((ex - E1) / ex) * 100, 0)}%. Ten times smaller steps give 0.99¹⁰⁰ ≈ ${r(0.99 ** 100, 3)}, about ten times smaller error.`,
    alt: "The exact decay e to the minus t and Euler's step points lying slightly below it, reaching 0.349 against 0.368 at t equals 1.",
    description: ["Exact: y = e^(−t). Euler with h = 0.1: y_{n+1} = 0.9 y_n.", `At t = 1: Euler ${r(E1, 4)}, exact ${r(ex, 4)}.`, `With h = 0.01: 0.99^100 = ${r(0.99 ** 100, 4)}.`],
    range: { x: [0, 1.05], y: [0, 1.05] }, ticks: [[0.2, 0.4, 0.6, 0.8, 1], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["t", "y"],
    curves: [{ expr: "exp(-x)", colour: "a1", label: "exact", labelAt: [0.3, 0.82] }],
    series: [{ points: eul, colour: "a2", width: 2, dots: true, label: "Euler, h = 0.1", labelAt: [0.55, 0.3] }],
    checks: [{ type: "point", expr: "exp(-x)", x: 1, y: r(ex, 8), name: `exact y(1) = ${r(ex, 3)}` }, { type: "point", expr: "0.9^(x/0.1)", x: 1, y: r(E1, 8), name: `Euler gives ${r(E1, 3)} at t = 1` }],
  }); }
