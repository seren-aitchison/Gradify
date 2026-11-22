// Unit 2, Mathematics for Physics. Every number in a caption or a claim is computed here once, from the lesson's own data.
// Run: node scripts/diagrams/physics/u02.mjs
import { mk } from "./spec.mjs";

const r1 = (x, d = 1) => +x.toFixed(d);
const PI = 3.14159265;

// u02-02 Equations and inequalities: the ball thrown up at 20 m/s is 15 m up twice
{
  const u = 20, g = 10, h = 15, disc = Math.sqrt(u * u - 2 * g * h), t1 = (u - disc) / g, t2 = (u + disc) / g, top = u / g, H = (u * u) / (2 * g);
  mk("u02-02", "phys-u02-ball-height-15", "graph", {
    title: "Two times for one height",
    caption: `Height h = ${u}t − ${g / 2}t² of a ball thrown up at ${u} m s⁻¹ (g = ${g} m s⁻²). Setting h = ${h} m gives a quadratic with two roots: t = ${t1} s on the way up and t = ${t2} s on the way down. The graph shows why: the line h = ${h} m cuts the parabola twice, either side of the top at t = ${top} s (${H} m).`,
    alt: `Parabola of height against time for a ball thrown up at ${u} metres per second, peaking at ${H} metres at ${top} seconds, with a horizontal line at ${h} metres crossing it at ${t1} and ${t2} seconds.`,
    description: [
      `Height h in metres against time t in seconds, from 0 to 4 s: h = ${u}t − ${g / 2}t².`,
      `The curve rises to ${H} m at t = ${top} s and returns to the ground at t = 4 s.`,
      `The dashed line at h = ${h} m meets the curve at t = ${t1} s (going up) and t = ${t2} s (coming down): the two roots of t² − 4t + 3 = 0.`,
    ],
    range: { x: [0, 4.2], y: [0, 24] }, ticks: [[1, 2, 3, 4], [5, 10, 15, 20]], grid: [1, 5], height: [340, 320], xLabelBelow: true,
    axisLabels: ["time t / s", "height h / m"],
    curves: [{ expr: "20*x-5*x^2", colour: "a1", label: "h = 20t − 5t²", labelAt: [2.45, 21] }],
    marks: [{ y: h, label: "h = 15 m" }],
    points: [{ x: t1, y: h, label: "t = 1 s", dx: -8, dy: 16, anchor: "end" }, { x: t2, y: h, label: "t = 3 s", dx: 8, dy: -14 }],
    checks: [{ type: "point", expr: "20*x-5*x^2", x: t1, y: h, name: "the ball is 15 m up at t = 1 s" }, { type: "point", expr: "20*x-5*x^2", x: t2, y: h, name: "the ball is 15 m up at t = 3 s" }, { type: "max", expr: "20*x-5*x^2", domain: [0, 4], x: top, y: H, name: "the top of the flight is 20 m at t = 2 s" }],
  });
}

// u02-03 Simultaneous equations, geometric view: the elastic collision as two lines in the (v1, v2) plane
{
  const m1 = 1, u = 6, v2 = (2 * m1 * u) / (m1 + 2), v1 = v2 - u;
  mk("u02-03", "phys-u02-collision-lines", "graph", {
    title: "Simultaneous equations as two lines",
    caption: `Each equation is a line in the (v₁, v₂) plane. Momentum, v₁ + 2v₂ = ${u}, and the elastic condition, v₂ − v₁ = ${u}, meet at one point: v₁ = ${v1} m s⁻¹, v₂ = ${v2} m s⁻¹. Only that point satisfies both laws, so the solution is where the lines cross.`,
    alt: `Two straight lines in the plane of the final velocities v1 and v2 crossing at v1 equals minus ${-v1}, v2 equals ${v2} metres per second.`,
    description: [
      "Horizontal axis: v₁ (final velocity of the 1.0 kg ball); vertical axis: v₂ (the 2.0 kg ball), both in m s⁻¹.",
      `Momentum conservation, ${u} = v₁ + 2v₂, is the line v₂ = (${u} − v₁)/2, sloping down.`,
      `Elastic collision (relative speed reverses), v₂ − v₁ = ${u}, is the line v₂ = v₁ + ${u}, sloping up.`,
      `They cross at (${v1}, ${v2}): the 1.0 kg ball bounces back at ${-v1} m s⁻¹ and the 2.0 kg ball moves off at ${v2} m s⁻¹.`,
    ],
    range: { x: [-6, 8], y: [-2, 9] }, ticks: [[-4, -2, 2, 4, 6], [2, 4, 6, 8]], grid: [2, 2], height: [340, 330], xLabelBelow: true,
    axisLabels: ["v₁ / m s⁻¹", "v₂ / m s⁻¹"],
    curves: [{ expr: "(6-x)/2", colour: "a1", label: "momentum", labelAt: [2.2, 0.6] }, { expr: "x+6", colour: "a2", label: "elastic", labelAt: [-5.6, 1.3] }],
    points: [{ x: v1, y: v2, label: "(−2.0, 4.0)", dx: 12, dy: 18 }],
    checks: [{ type: "intersect", a: "(6-x)/2", b: "x+6", x: v1, y: v2, name: "the two lines meet at v₁ = −2.0, v₂ = 4.0 m s⁻¹" }],
  });
}

// u02-04 Trigonometry: 3 sin ωt + 4 cos ωt = 5 sin(ωt + φ)
{
  const a = 3, b = 4, R = Math.hypot(a, b), phi = Math.atan2(b, a), tmax = PI / 2 - phi;
  mk("u02-04", "phys-u02-sinusoid-sum", "graph", {
    title: "Two sinusoids make one",
    caption: `3 sin ωt and 4 cos ωt (thin curves) add to a single sinusoid of amplitude R = √(3² + 4²) = ${R} (heavy curve), shifted by φ = ${r1((phi * 180) / PI)}° (tan φ = 4/3). The sum peaks at ${R}, as the worked example finds, at ωt = ${r1(tmax, 3)} rad.`,
    alt: `Graph over one cycle of 3 sin ωt, 4 cos ωt and their sum, a sine wave of amplitude 5 that peaks at ωt = ${r1(tmax, 3)} radians.`,
    description: [
      "Horizontal axis: ωt in radians over one cycle, 0 to 2π; vertical axis: the value of each expression.",
      "The thin curves are 3 sin ωt (amplitude 3) and 4 cos ωt (amplitude 4).",
      `Their sum, the heavy curve, is again sinusoidal with amplitude R = √(3² + 4²) = ${R} and phase φ = arctan(4/3) = ${r1((phi * 180) / PI)}°.`,
      `Its maximum is ${R}, reached when ωt + φ = π/2, that is at ωt = ${r1(tmax, 3)} rad.`,
    ],
    range: { x: [0, 6.4], y: [-6, 6.5] }, ticks: [[1, 2, 3, 4, 5, 6], [-4, -2, 2, 4]], grid: [1, 2], height: [340, 320], xLabelBelow: true,
    axisLabels: ["ωt / rad", "value"],
    curves: [{ expr: "3*sin(x)", colour: "a4", width: 2, label: "3 sin ωt", labelAt: [1.2, -3.9] }, { expr: "4*cos(x)", colour: "a3", width: 2, label: "4 cos ωt", labelAt: [4.05, 4.4] }, { expr: "3*sin(x)+4*cos(x)", colour: "a1", label: "sum = 5 sin(ωt + φ)", labelAt: [2.6, 5.6] }],
    points: [{ x: tmax, y: R, label: "max 5", dx: -10, dy: -12, anchor: "end" }],
    checks: [{ type: "max", expr: "3*sin(x)+4*cos(x)", domain: [0, 6.2832], x: tmax, y: R, name: "the maximum of 3 sin ωt + 4 cos ωt is 5" }],
  });
}

// u02-05 Exponentials: 800 Bq to 100 Bq in 30 days
{
  const A0 = 800, t = 30, n = Math.log2(A0 / 100), half = t / n, lam = Math.LN2 / half;
  mk("u02-05", "phys-u02-activity-halvings", "graph", {
    title: "Three halvings in 30 days",
    caption: `Activity A = ${A0}·e^{−λt} falls ${A0} → 400 → 200 → 100 Bq. That is ${n} halvings in ${t} days, so the half-life is ${t}/${n} = ${half} days and λ = ln 2/${half} = ${r1(lam, 4)} day⁻¹.`,
    alt: "Exponential decay curve of activity from 800 becquerel, passing 400 at 10 days, 200 at 20 days and 100 at 30 days.",
    description: [
      "Activity in becquerels against time in days: a falling exponential that never reaches zero.",
      "Each 10-day step cuts the activity in half: 800 at 0 days, 400 at 10, 200 at 20, 100 at 30.",
      `Three equal steps cover the 30 days, so t½ = 10 days, and λ = ln 2 / t½ = ${r1(lam, 4)} day⁻¹.`,
    ],
    range: { x: [0, 36], y: [0, 880] }, ticks: [[10, 20, 30], [200, 400, 600, 800]], grid: [10, 200], height: [340, 320], xLabelBelow: true,
    axisLabels: ["time / days", "activity / Bq"],
    curves: [{ expr: "800*exp(-0.0693147*x)", colour: "a1", label: "A = 800e^{−λt}", labelAt: [14, 620] }],
    points: [{ x: 0, y: 800, label: "800", dx: 10, dy: -4 }, { x: 10, y: 400, label: "400", dx: 10, dy: -8 }, { x: 20, y: 200, label: "200", dx: 10, dy: -10 }, { x: 30, y: 100, label: "100", dx: 8, dy: -12 }],
    checks: [10, 20, 30].map((x) => ({ type: "point", expr: "800*exp(-0.0693147*x)", x, y: A0 / 2 ** (x / half), name: `activity at ${x} days is ${A0 / 2 ** (x / half)} Bq` })),
  });
}

// u02-06 Complex numbers: Z = 30 + 40i
{
  const R = 30, X = 40, Z = Math.hypot(R, X), phi = (Math.atan2(X, R) * 180) / PI;
  mk("u02-06", "phys-u02-impedance-plane", "vectors", {
    title: "Impedance in the complex plane",
    caption: `A ${R} Ω resistor in series with an inductor of reactance ${X} Ω has Z = ${R} + ${X}i Ω. The resistance lies along the real axis and the reactance along the imaginary axis, so |Z| = √(${R}² + ${X}²) = ${Z} Ω and the phase is arctan(${X}/${R}) = ${Math.round(phi)}°, voltage leading current.`,
    alt: `Phasor triangle: a 30 ohm arrow along the real axis, a 40 ohm arrow up from its tip, and the 50 ohm impedance at ${Math.round(phi)} degrees.`,
    description: [
      `The resistance R = ${R} Ω is drawn along the real (horizontal) axis.`,
      `The reactance X_L = ${X} Ω is drawn from its tip along the imaginary (vertical) axis.`,
      `The impedance Z runs from the origin to the tip: |Z| = √(${R}² + ${X}²) = ${Z} Ω.`,
      `Its angle above the real axis is the phase: tan φ = ${X}/${R}, φ = ${Math.round(phi)}°.`,
    ],
    mode: "add", units: "Ω",
    vectors: [{ label: "R", mag: R, angle: 0, text: `${R} Ω (real axis)`, comps: [R, 0] }, { label: "X_{L}", mag: X, angle: 90, colour: "a4", text: `${X} Ω (imaginary axis)`, comps: [0, X] }],
    resultant: { label: "Z", mag: Z, angle: r1(phi, 2), text: `${Z} Ω at ${Math.round(phi)}°` },
    notes: [`|Z| = √(${R}^{2} + ${X}^{2}) = ${Z} Ω`, `φ = arctan(${X}/${R}) = ${Math.round(phi)}°`],
    claims: [{ type: "angleBetween", a: "R", b: "Z", value: r1(phi, 1), name: `the phase of Z is ${r1(phi)}° from the resistance` }],
  });
}

// u02-07 Vectors: the 50 N force at 30° and the work done over 4.0 m
{
  const F = 50, th = 30, d = 4.0, Fx = F * Math.cos((th * PI) / 180), Fy = F * Math.sin((th * PI) / 180), W = Fx * d;
  mk("u02-07", "phys-u02-force-components", "vectors", {
    title: "Resolving the 50 N force",
    caption: `The ${F} N force at ${th}° above the horizontal resolves into ${Fx.toFixed(1)} N along the motion and ${Fy.toFixed(0)} N up. Only the horizontal component does work: W = ${Fx.toFixed(1)} × ${d.toFixed(1)} = ${W.toFixed(0)} J; the vertical component, perpendicular to the displacement, does none.`,
    alt: `A 50 newton force arrow at 30 degrees above the horizontal with its horizontal component of ${Fx.toFixed(1)} newtons and vertical component of ${Fy.toFixed(0)} newtons dashed.`,
    description: [
      `The force F = ${F} N is drawn at ${th}° above the horizontal, the direction of the crate's motion.`,
      `Dashed components: F cos ${th}° = ${Fx.toFixed(1)} N horizontally and F sin ${th}° = ${Fy.toFixed(0)} N vertically.`,
      `Work is the component along the displacement times the distance: ${Fx.toFixed(1)} N × ${d.toFixed(1)} m = ${W.toFixed(0)} J.`,
    ],
    mode: "resolve", units: "N",
    vectors: [{ label: "F", mag: F, angle: th, text: `${F} N at ${th}° above horizontal`, comps: [r1(Fx, 2), r1(Fy, 2)], compLabels: [`${Fx.toFixed(1)} N`, `${Fy.toFixed(0)} N`] }],
    notes: [`W = F cos θ × d = ${Fx.toFixed(1)} × ${d.toFixed(1)} = ${W.toFixed(0)} J`],
  });
}

// u02-11 Differentiation: x = 5t² − 2t³ at t = 1 s
{
  const x = (t) => 5 * t * t - 2 * t ** 3, v1 = 10 - 6, a1 = 10 - 12;
  mk("u02-11", "phys-u02-derivative-tangent", "graph", {
    title: "The derivative is the gradient",
    caption: `For x = 5t² − 2t³ the velocity is v = dx/dt = 10t − 6t². At t = 1 s the position is ${x(1)} m and the tangent (dashed) has gradient v = ${v1} m s⁻¹. The acceleration there is a = dv/dt = 10 − 12t = ${a1} m s⁻²: the curve is already bending over.`,
    alt: "Graph of x = 5t^2 − 2t^3, rising to a maximum near 1.7 seconds, with the tangent at t = 1 second having gradient 4 metres per second.",
    description: [
      "Position x in metres against time t in seconds, 0 to 2.5 s.",
      `At t = 1 s the curve passes through x = ${x(1)} m. The dashed tangent there rises ${v1} m for each second: v = 10(1) − 6(1)² = ${v1} m s⁻¹.`,
      `The curve peaks at t = 5/3 s, where v = 0, and then falls back. The curve is concave down at t = 1 s because a = 10 − 12(1) = ${a1} m s⁻² is negative.`,
    ],
    range: { x: [0, 2.6], y: [-1, 6.5] }, ticks: [[0.5, 1, 1.5, 2, 2.5], [1, 2, 3, 4, 5, 6]], grid: [0.5, 1], height: [340, 320], xLabelBelow: true,
    axisLabels: ["time t / s", "position x / m"],
    curves: [{ expr: "5*x^2-2*x^3", colour: "a1", label: "x = 5t² − 2t³", labelAt: [1.75, 2.2] }, { expr: "3+4*(x-1)", colour: "a2", dash: "6 5", width: 2.2, domain: [0.3, 1.7], label: "gradient 4", labelAt: [0.3, 1.2] }],
    points: [{ x: 1, y: x(1), label: "t = 1 s", dx: 10, dy: 18 }],
    checks: [{ type: "point", expr: "5*x^2-2*x^3", x: 1, y: x(1), name: "x(1 s) = 3 m" }, { type: "slope", expr: "5*x^2-2*x^3", x: 1, value: v1, name: "the gradient at t = 1 s is v = 4 m s⁻¹" }, { type: "slope", expr: "10*x-6*x^2", x: 1, value: a1, name: "the gradient of v at t = 1 s is a = −2 m s⁻²" }],
  });
}

// u02-14 ODEs: falling with linear drag, dv/dt = g − kv
{
  const g = 9.8, k = 0.5, vt = g / k, t1 = 1 / k, vtau = vt * (1 - Math.exp(-1));
  mk("u02-14", "phys-u02-linear-drag-solution", "graph", {
    title: "Falling with linear drag",
    caption: `The solution v = (g/k)(1 − e^{−kt}) starts with slope g and levels off at the terminal velocity g/k. Shown for g = ${g} m s⁻² and k = ${k} s⁻¹ (an illustrative k): v_t = ${vt} m s⁻¹, and after one time constant 1/k = ${t1} s the velocity has reached ${r1(vtau)} m s⁻¹, 63% of v_t.`,
    alt: "Velocity against time curve rising from zero with initial slope 9.8 and levelling off at the terminal velocity of 19.6 metres per second.",
    description: [
      `Velocity v against time t for dv/dt = g − kv with g = ${g} and k = ${k} (illustrative values).`,
      `At t = 0 the velocity is 0 and the slope is g = ${g} m s⁻²: the drag is zero, so the ball falls freely.`,
      `As v grows the drag kv grows, the slope falls, and v approaches the terminal velocity g/k = ${vt} m s⁻¹ (dashed line), where drag balances weight.`,
      `After t = 1/k = ${t1} s the velocity is ${r1(vtau)} m s⁻¹, 63% of the way there.`,
    ],
    range: { x: [0, 10], y: [0, 23] }, ticks: [[2, 4, 6, 8, 10], [5, 10, 15, 20]], grid: [2, 5], height: [340, 320], xLabelBelow: true,
    axisLabels: ["time t / s", "velocity v / m s⁻¹"],
    curves: [{ expr: "19.6*(1-exp(-0.5*x))", colour: "a1", label: "v(t)", labelAt: [5.2, 17.2] }],
    marks: [{ y: vt, label: "terminal velocity g/k = 19.6 m s⁻¹" }],
    points: [{ x: t1, y: vtau, label: "63% at t = 1/k", dx: 10, dy: 16 }],
    checks: [{ type: "slope", expr: "19.6*(1-exp(-0.5*x))", x: 0, value: g, name: "the initial gradient is g = 9.8 m s⁻²" }, { type: "point", expr: "19.6*(1-exp(-0.5*x))", x: t1, y: vtau, name: "v(1/k) = (1 − 1/e) g/k" }, { type: "value", expr: "19.6*(1-exp(-0.5*x))", x: 10, between: [vt * 0.99, vt], name: "v approaches g/k" }],
  });
}

// u02-16 Second-order ODE: y'' + 4y = 0, y(0) = 1, y'(0) = 0
mk("u02-16", "phys-u02-oscillator-solution", "graph", {
  title: "y″ + 4y = 0 with y(0) = 1, y′(0) = 0",
  caption: "The characteristic equation λ² + 4 = 0 gives λ = ±2i, so the solutions oscillate. The initial conditions pick y = cos 2t: it starts at 1 with zero slope, and repeats every π s (ω = 2).",
  alt: "Graph of y = cos 2t from 0 to 2π: starts at 1 with zero slope, crosses zero at π/4, reaches −1 at π/2 and repeats with period π.",
  description: [
    "y against t (the independent variable) from 0 to 2π.",
    "y(0) = 1 and the curve starts flat, y′(0) = 0: the two conditions that fix A = 1, B = 0.",
    "The curve falls to −1 at t = π/2 and is back at 1 at t = π: the period is 2π/ω = π.",
  ],
  range: { x: [0, 6.5], y: [-1.4, 1.5] }, ticks: [[1.5708, 3.1416, 4.7124, 6.2832], [-1, 0.5, 1]], grid: [1.5708, 1], height: [340, 300], xLabelBelow: true,
  axisLabels: ["t", "y"],
  curves: [{ expr: "cos(2*x)", colour: "a1", label: "y = cos 2t", labelAt: [4.4, 1.22] }],
  points: [{ x: 0, y: 1, label: "y(0) = 1", dx: 10, dy: -8 }, { x: PI / 2, y: -1, label: "−1 at π/2", dx: 0, dy: 20, anchor: "middle" }, { x: PI, y: 1, label: "period π", dx: 8, dy: -10 }],
  checks: [{ type: "point", expr: "cos(2*x)", x: 0, y: 1, name: "y(0) = 1" }, { type: "slope", expr: "cos(2*x)", x: 0, value: 0, name: "y′(0) = 0" }, { type: "point", expr: "cos(2*x)", x: PI, y: 1, name: "the period is π" }, { type: "min", expr: "cos(2*x)", domain: [0, 3], x: PI / 2, y: -1, name: "the first minimum is −1 at t = π/2" }],
});

// u02-17 Boundary conditions quantise: the guitar string
{
  const L = 0.65, v = 420, f = [1, 2, 3].map((n) => (n * v) / (2 * L));
  mk("u02-17", "phys-u02-guitar-string-modes", "wave", {
    title: "Fixed ends allow only some frequencies",
    caption: `With both ends fixed, only whole numbers of half-wavelengths fit: λₙ = 2L/n. For L = ${L} m and v = ${v} m s⁻¹, f = nv/(2L) gives ${f.map((x) => Math.round(x)).join(" Hz, ")} Hz for the first three modes.`,
    alt: `Three standing waves on a ${L} metre string fixed at both ends with one, two and three half-wavelengths, at ${f.map((x) => Math.round(x)).join(", ")} hertz.`,
    description: [
      `A string of length ${L} m fixed at both ends, wave speed ${v} m s⁻¹.`,
      `Mode 1: half a wavelength fits, λ = 2L = ${2 * L} m, f = ${v}/${2 * L} = ${Math.round(f[0])} Hz.`,
      `Mode 2: one wavelength fits, λ = L = ${L} m, f = ${Math.round(f[1])} Hz, with a node in the middle.`,
      `Mode 3: λ = 2L/3 = ${r1((2 * L) / 3, 3)} m, f = ${Math.round(f[2])} Hz. Frequencies between these cannot satisfy the boundary conditions.`,
    ],
    kind: "standing", L, n: [1, 2, 3], ends: "fixed-fixed", v,
    claims: { harmonics: [1, 2, 3].map((n, i) => ({ n, lambda: r1((2 * L) / n, 4), f: Math.round(f[i]) })) },
  });
}

// u02-18 Taylor series: g(h) = g0 (1 + h/R)^-2 against its first-order step
{
  const R = 6400, h = 10, drop = (2 * h) / R;
  mk("u02-18", "phys-u02-taylor-gravity", "graph", {
    title: "A Taylor step for g(h)",
    caption: `g(h)/g₀ = (1 + h/R)⁻² (curve) is replaced by its first Taylor step 1 − 2h/R (dashed line), whose gradient −2 matches the curve at h = 0. At h = ${h} km, h/R = ${r1(h / R, 4)} and g has fallen by only ${r1(drop * 100, 1)}%, where line and curve are indistinguishable. Far above the surface (right of the graph) they part company.`,
    alt: "Graph of g over g0 against h over R: a curve (1 + h/R)^-2 and its tangent line 1 − 2h/R, which agree near zero and separate as h/R grows.",
    description: [
      "Horizontal axis: h/R, the height as a fraction of the Earth's radius; vertical axis: g/g₀.",
      "The curve is g/g₀ = (1 + h/R)⁻². The dashed line is 1 − 2h/R, the first-order Taylor series about h = 0.",
      `Near the surface the two are indistinguishable. At h = ${h} km, h/R = ${r1(h / R, 4)} and g/g₀ = ${r1(1 - drop, 4)}: a ${r1(drop * 100, 1)}% fall.`,
      "At h/R = 0.3 the line has dropped to 0.4 but the true value is 0.59: the step is only valid for small h/R.",
    ],
    range: { x: [0, 0.4], y: [0.3, 1.05] }, ticks: [[0.1, 0.2, 0.3, 0.4], [0.4, 0.6, 0.8, 1]], grid: [0.1, 0.2], height: [340, 320], xLabelBelow: true,
    axisLabels: ["h / R", "g / g₀"],
    curves: [{ expr: "1/(1+x)^2", colour: "a1", label: "(1 + h/R)⁻²", labelAt: [0.2, 0.74] }, { expr: "1-2*x", colour: "a2", dash: "6 5", width: 2.2, label: "1 − 2h/R", labelAt: [0.08, 0.56] }],
    checks: [{ type: "slope", expr: "1/(1+x)^2", x: 0, value: -2, name: "the gradient of g/g₀ at h = 0 is −2 (the Taylor coefficient)" }, { type: "point", expr: "1-2*x", x: 0.0015625, y: 1 - drop, name: "at h = 10 km, the Taylor step gives 1 − 2h/R = 0.997 (0.3% lower)" }, { type: "point", expr: "1-2*x", x: 0.3, y: 0.4, name: "the straight line gives 0.4 at h/R = 0.3 (the step fails there)" }],
  });
}

// u02-27 Probability distributions: 400 counts, Poisson uncertainty sqrt(400) = 20
{
  const N = 400, s = Math.sqrt(N), pk = 1 / (s * Math.sqrt(2 * PI));
  mk("u02-27", "phys-u02-poisson-counts", "graph", {
    title: "400 counts, ±20",
    caption: `For a mean of ${N} counts the Poisson distribution is almost a bell curve with standard deviation σ = √${N} = ${s}. About 68% of repeats fall within ±${s} of ${N}, so the rate is ${N} ± ${s} per minute (${(100 * s) / N}%).`,
    alt: "Bell curve of the probability of each count centred on 400 with standard deviation 20, with the region from 380 to 420 shaded.",
    description: [
      `Horizontal axis: the number of counts in one minute; vertical axis: probability per count. The curve is centred on the mean ${N}.`,
      `Its width is σ = √${N} = ${s} counts: the curve falls to 61% of its peak at ${N - s} and ${N + s}.`,
      `The shaded area between ${N - s} and ${N + s} is 68% of all the probability.`,
      `Quoted result: ${N} ± ${s} counts, a ${(100 * s) / N}% uncertainty.`,
    ],
    range: { x: [330, 470], y: [0, 0.024] }, ticks: [[340, 360, 380, 400, 420, 440, 460], [0.005, 0.01, 0.015, 0.02]], grid: [20, 0.005], height: [340, 320], xLabelBelow: true,
    axisLabels: ["counts in one minute", "probability per count"],
    areas: [{ expr: "exp(-(x-400)^2/800)/50.1325", from: 380, to: 420, colour: "a1" }],
    curves: [{ expr: "exp(-(x-400)^2/800)/50.1325", colour: "a1", label: "mean 400", labelAt: [408, 0.0225] }],
    points: [{ x: 380, y: pk * Math.exp(-0.5), label: "−σ", dx: -8, dy: -10, anchor: "end" }, { x: 420, y: pk * Math.exp(-0.5), label: "+σ", dx: 8, dy: -10 }],
    checks: [{ type: "area", expr: "exp(-(x-400)^2/800)/50.1325", from: 300, to: 500, value: 1, tol: 0.005, name: "the distribution is normalised (area 1)" }, { type: "area", expr: "exp(-(x-400)^2/800)/50.1325", from: 380, to: 420, value: 0.6827, tol: 0.005, name: "68% of the area lies within one σ = 20 of the mean" }, { type: "max", expr: "exp(-(x-400)^2/800)/50.1325", domain: [330, 470], x: 400, y: pk, name: "the peak is at the mean of 400 counts" }],
  });
}

// u02-29 Newton-Raphson for sqrt 2
{
  const f = (x) => x * x - 2, x0 = 1, x1 = x0 - f(x0) / (2 * x0), x2 = x1 - f(x1) / (2 * x1);
  mk("u02-29", "phys-u02-newton-raphson", "graph", {
    title: "Newton–Raphson for √2",
    caption: `Start at x₀ = 1 on f(x) = x² − 2. The tangent there (gradient 2) meets the axis at x₁ = ${x1}; the tangent at x₁ (gradient 3) meets it at x₂ = ${r1(x2, 4)}. Each tangent lands much closer to the root √2 = 1.41421.`,
    alt: `Parabola x squared minus 2 with the tangent at x = 1 crossing the axis at ${x1}, and the tangent there crossing at ${r1(x2, 4)}, close to the root 1.41421.`,
    description: [
      "The curve is f(x) = x² − 2 for x from 0.9 to 1.7; it crosses zero at √2 = 1.41421.",
      `At x₀ = 1, f = −1 and the gradient is 2. The tangent crosses zero at x₁ = 1 − (−1)/2 = ${x1}.`,
      `At x₁ = ${x1}, f = ${f(x1)} and the gradient is 3. The tangent crosses zero at x₂ = ${x1} − ${f(x1)}/3 = ${r1(x2, 4)}.`,
      "x₃ = 1.41422: the number of correct digits doubles each step.",
    ],
    range: { x: [0.9, 1.7], y: [-1.3, 1.1] }, ticks: [[1, 1.2, 1.4, 1.6], [-1, -0.5, 0.5, 1]], grid: [0.2, 0.5], height: [340, 320], xLabelBelow: true,
    axisLabels: ["x", "f(x)"],
    curves: [{ expr: "x^2-2", colour: "a1", label: "x² − 2", labelAt: [1.5, 0.55] }, { expr: "2*x-3", colour: "a2", dash: "6 5", width: 2.2, domain: [0.95, 1.55], label: "tangent at 1", labelAt: [0.93, -0.8] }, { expr: "3*x-4.25", colour: "a4", dash: "6 5", width: 2.2, domain: [1.3, 1.65], label: "tangent at x₁", labelAt: [1.1, 0.7] }],
    points: [{ x: x0, y: f(x0), label: "x₀ = 1", dx: 10, dy: 14 }, { x: x1, y: f(x1), label: "x₁ = 1.5", dx: 12, dy: 8 }],
    checks: [{ type: "point", expr: "x^2-2", x: x0, y: -1, name: "f(1) = −1" }, { type: "slope", expr: "x^2-2", x: x0, value: 2, name: "f′(1) = 2" }, { type: "point", expr: "2*x-3", x: x1, y: 0, name: "the tangent at x₀ crosses zero at x₁ = 1.5" }, { type: "point", expr: "x^2-2", x: x1, y: f(x1), name: "f(1.5) = 0.25" }, { type: "slope", expr: "x^2-2", x: x1, value: 3, name: "f′(1.5) = 3" }, { type: "point", expr: "3*x-4.25", x: x2, y: 0, name: "the tangent at x₁ crosses zero at x₂ = 1.4167" }],
  });
}

// u02-30 Optimisation: perimeter 20 m
mk("u02-30", "phys-u02-rectangle-area", "graph", {
  title: "The largest rectangle of perimeter 20 m",
  caption: "With perimeter 20 m, a rectangle x by (10 − x) has area A = x(10 − x). The area is largest at x = 5 m, where the gradient dA/dx = 10 − 2x is zero, giving a square of area 25 m².",
  alt: "Parabola of area against side length x for a rectangle of perimeter 20 metres, with its maximum of 25 square metres at x = 5 metres.",
  description: [
    "Horizontal axis: one side x in metres, from 0 to 10; the other side is 10 − x.",
    "Vertical axis: area A = x(10 − x). It is 0 at x = 0 and x = 10 (a flat rectangle) and rises between.",
    "The maximum is at x = 5 m, where dA/dx = 10 − 2x = 0: the rectangle is a square, A = 25 m².",
  ],
  range: { x: [0, 10.4], y: [0, 29] }, ticks: [[2, 4, 6, 8, 10], [5, 10, 15, 20, 25]], grid: [2, 5], height: [340, 320], xLabelBelow: true,
  axisLabels: ["side x / m", "area A / m²"],
  curves: [{ expr: "x*(10-x)", colour: "a1", label: "A = x(10 − x)", labelAt: [7, 22] }],
  points: [{ x: 5, y: 25, label: "x = y = 5 m, A = 25 m²", dx: 10, dy: -12 }],
  checks: [{ type: "max", expr: "x*(10-x)", domain: [0, 10], x: 5, y: 25, name: "the maximum area is 25 m² at x = 5 m" }, { type: "slope", expr: "x*(10-x)", x: 5, value: 0, name: "dA/dx = 0 at x = 5 m" }],
});
