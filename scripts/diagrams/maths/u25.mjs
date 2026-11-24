// School 25, Control Theory and Systems: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u25.mjs
import { mk } from "./spec.mjs";

const must = (c, m) => { if (!c) throw new Error(m); };
const R = (x, d = 3) => +x.toFixed(d), ls = (a) => `${a}`.replace(/-/g, "−");
const e = Math.exp, PI = Math.PI;
// a graph spec: ranges, ticks, labels, curves, points, marks, checks
const G = (lesson, slug, title, caption, alt, steps, o) => mk(lesson, `maths-u25-${slug}`, "graph", title, caption, alt, steps, { range: { x: o.x, y: o.y }, ticks: o.t, grid: o.grid || [1, 1], axisLabels: o.ax, height: o.h || [340, 320], ...o.rest });

// ---------- u25-02 Linear Systems: x' = -2x, x(0) = 5 ----------
{ const lam = -2, x0 = 5, tau = -1 / lam, v = x0 * e(-1);
  must(R(v, 2) === 1.84, "x(tau)");
  G("u25-02", "decay", "ẋ = −2x: the time constant", `The solution 5e^{−2t} falls by a factor e each time constant τ = 1/2 s: after one τ it is 5 × 0.368 ≈ ${R(v, 2)}.`,
    "Exponential decay from 5 at t = 0 towards 0; at t = 0.5 s the value is about 1.84, marked.", ["Start at x(0) = 5.", "The eigenvalue λ = −2 gives x(t) = 5e^{−2t}.", "After one time constant τ = 1/2 s the value is 5 × 0.368 ≈ 1.84."],
    { x: [0, 3], y: [0, 5.5], t: [[1, 2, 3], [1, 2, 3, 4, 5]], ax: ["t (s)", "x"], rest: { curves: [{ expr: "5*exp(-2*x)", colour: "a1" }], marks: [{ x: tau, label: "τ = 1/2" }],
      points: [{ x: 0, y: 5, label: "5", dx: 10, dy: 4 }, { x: tau, y: R(v, 4), label: "≈ 1.84", dx: 12, dy: -8 }],
      checks: [{ type: "point", expr: "5*exp(-2*x)", x: 0, y: 5, name: "x(0) = 5" }, { type: "point", expr: "5*exp(-2*x)", x: tau, y: R(v, 4), name: "x(1/2) = 5e⁻¹ ≈ 1.84" }, { type: "slope", expr: "5*exp(-2*x)", x: 0, value: lam * x0, name: "the slope at 0 is λx(0) = −10" }], fromLesson: ["τ = 1/2 s", "≈ 1.84"] } });
}

// ---------- u25-03 Nonlinear Systems: pendulum equilibria ----------
G("u25-03", "pendulum", "Pendulum: the restoring term −sin θ", "The restoring term −sin θ is zero at θ = 0 and θ = π. Its slope there is −1 (restoring: a centre) and +1 (pushing away: a saddle).",
  "The curve −sin θ crosses zero at θ = 0 with slope −1 and at θ = π with slope +1; the two tangent lines are dashed.", ["Plot the right-hand side −sin θ.", "It is zero at θ = 0 and θ = π: the equilibria.", "At 0 the slope is −1, so θ̈ ≈ −θ: eigenvalues ±i.", "At π the slope is +1, so θ̈ ≈ +(θ − π): eigenvalues ±1, a saddle."],
  { x: [-1, 4.5], y: [-1.5, 1.5], t: [[0, 1, 2, 3, 4], [-1, 0, 1]], ax: ["θ", "θ̈"], grid: [1, 0.5], rest: { curves: [{ expr: "-sin(x)", colour: "a1" }, { expr: "-x", colour: "a2", dash: "5 4", domain: [-1, 1.2] }, { expr: `x-${PI}`, colour: "a4", dash: "5 4", domain: [2, 4.4] }],
    points: [{ x: 0, y: 0, label: "θ = 0", dx: 10, dy: -12 }, { x: PI, y: 0, label: "θ = π", dx: 8, dy: -14 }],
    checks: [{ type: "point", expr: "-sin(x)", x: 0, y: 0, name: "θ = 0 is an equilibrium" }, { type: "point", expr: "-sin(x)", x: PI, y: 0, name: "θ = π is an equilibrium" }, { type: "slope", expr: "-sin(x)", x: 0, value: -1, name: "slope −1 at 0 (a centre)" }, { type: "slope", expr: "-sin(x)", x: PI, value: 1, name: "slope +1 at π (a saddle)" }], fromLesson: ["θ = 0 and θ = π"] } });

// ---------- u25-04 State-Space: poles of x'' + 3x' + 2x = u ----------
{ const A = [[0, 1], [-2, -3]], tr = A[0][0] + A[1][1], det = A[0][0] * A[1][1] - A[0][1] * A[1][0], disc = Math.sqrt(tr * tr - 4 * det), l1 = (tr + disc) / 2, l2 = (tr - disc) / 2;
  must(l1 === -1 && l2 === -2, "poles");
  G("u25-04", "poles", "The characteristic polynomial λ² + 3λ + 2", "The eigenvalues of A = [[0, 1], [−2, −3]] are the roots of λ² + 3λ + 2 = 0: the curve crosses zero at the poles −1 and −2.",
    "A parabola λ² + 3λ + 2 crossing the horizontal axis at −2 and −1, with minimum −0.25 at −1.5.", ["Write the state equations with x₁ = x and x₂ = ẋ.", "det(λI − A) = λ² + 3λ + 2.", "Its roots are the poles −1 and −2, both negative: stable."],
    { x: [-3.2, 0.5], y: [-0.6, 3], t: [[-3, -2, -1, 0], [0, 1, 2, 3]], ax: ["λ", "λ² + 3λ + 2"], grid: [1, 1], rest: { curves: [{ expr: "x^2+3*x+2", colour: "a1" }],
      points: [{ x: l1, y: 0, label: "−1", dx: 12, dy: -10 }, { x: l2, y: 0, label: "−2", dx: -10, dy: -10, anchor: "end" }],
      checks: [{ type: "point", expr: "x^2+3*x+2", x: l1, y: 0, name: "λ = −1 is a root" }, { type: "point", expr: "x^2+3*x+2", x: l2, y: 0, name: "λ = −2 is a root" }, { type: "min", expr: "x^2+3*x+2", domain: [-3, 0], x: -1.5, y: -0.25, name: "the sum of the roots is −3 = trace A" }], fromLesson: ["poles −1 and −2"] } });
}

// ---------- u25-05 Transfer Functions: step response of 4/(s+2) ----------
{ const dc = 4 / 2;
  G("u25-05", "step-4-over-s2", "Step response of G(s) = 4/(s + 2)", "The step response is 2(1 − e^{−2t}); it settles at the DC gain G(0) = 4/2 = 2, as the final value theorem predicts.",
    "A curve rising from 0 and levelling off at 2, with a dashed line at the final value 2.", ["The output transform is Y(s) = G(s)/s.", "Inverting gives y(t) = 2(1 − e^{−2t}).", "The final value is lim s·Y(s) = 4/2 = 2, the DC gain."],
    { x: [0, 3], y: [0, 2.5], t: [[1, 2, 3], [0.5, 1, 1.5, 2]], ax: ["t (s)", "y"], grid: [1, 0.5], rest: { curves: [{ expr: `${dc}*(1-exp(-2*x))`, colour: "a1" }], marks: [{ y: dc, label: "final value 2" }],
      checks: [{ type: "point", expr: `${dc}*(1-exp(-2*x))`, x: 0, y: 0, name: "y(0) = 0" }, { type: "value", expr: `${dc}*(1-exp(-2*x))`, x: 3, between: [1.99, 2], name: "y settles at the DC gain 2" }, { type: "slope", expr: `${dc}*(1-exp(-2*x))`, x: 0, value: 4, name: "the initial slope is G(∞)-free: 4" }], fromLesson: ["= 2 (the DC gain)"] } });
}

// ---------- u25-06 Hybrid Systems: bounce heights 1, 0.25, 0.0625 ----------
{ const eRest = 0.5, r = eRest ** 2, hs = [1, 2, 3, 4].map((n) => r ** (n - 1));
  mk("u25-06", "maths-u25-bounce-heights", "sequence", "Bounce heights with e = 0.5", "Each bounce keeps e² = 0.25 of the previous height: 1, 0.25, 0.0625, 0.015625, … infinitely many bounces, yet a finite total time (Zeno behaviour).",
    "Bounce heights 1, 0.25, 0.0625, 0.015625 metres with the constant ratio 0.25 between them.", ["The ball is dropped from 1 m.", "Each impact multiplies the speed by e = 0.5, so the height by e² = 0.25.", "Heights 1, 0.25, 0.0625, …: a geometric sequence with ratio 0.25, and infinitely many bounces."],
    { terms: hs, rule: { kind: "geometric", a: 1, r }, show: "ratios", more: true, ruleText: "height = 0.25^(n − 1) m", checks: [{ type: "nth", n: 4, value: 0.015625 }], fromLesson: ["0.0625"] });
}

// ---------- u25-08 Open-Loop Control: 3 kW gives 15 °C, or 12 °C if the gain is 4 ----------
{ const need = 15 / 5, u = need;
  G("u25-08", "open-loop-gain", "Open-loop heating with the wrong gain", "Planned with 5 °C per kW, 3 kW should give 15 °C. If the true gain is 4 °C per kW the rise is only 12 °C, and open-loop control cannot notice the 3 °C shortfall.",
    "Two lines of temperature rise against power: the assumed 5 °C per kW and the true 4 °C per kW; at 3 kW they read 15 and 12, a gap of 3.", ["Assume the room warms 5 °C per kW: for 15 °C choose u = 15/5 = 3 kW.", "If the real gain is 4 °C per kW, the same 3 kW gives 4 × 3 = 12 °C.", "The 3 °C error is never detected: there is no feedback."],
    { x: [0, 4], y: [0, 20], t: [[1, 2, 3, 4], [5, 10, 15, 20]], ax: ["power u (kW)", "temperature rise (°C)"], grid: [1, 5], rest: { curves: [{ expr: "5*x", colour: "a1" }, { expr: "4*x", colour: "a2" }], marks: [{ x: u }], legend: [["assumed 5 °C/kW", "a1"], ["true 4 °C/kW", "a2"]], legendData: [0.15, 19],
      points: [{ x: u, y: 5 * u, label: "15 °C", dx: -10, dy: -6, anchor: "end", colour: "a1" }, { x: u, y: 4 * u, label: "12 °C", dx: 10, dy: 14, colour: "a2" }],
      checks: [{ type: "point", expr: "5*x", x: u, y: 15, name: "5 × 3 = 15 °C" }, { type: "point", expr: "4*x", x: u, y: 12, name: "4 × 3 = 12 °C" }, { type: "intersect", a: "5*x", b: "4*x", x: 0, y: 0, name: "both lines start at 0" }], fromLesson: ["u = 15/5 = 3 kW", "A 3 °C error remains"] } });
}

// ---------- u25-09 Closed-Loop Control: G = 2/(s+1), C = 4 ----------
{ const L0 = 2 * 4, T0 = L0 / (1 + L0), ess = 1 / (1 + L0), a = R(T0, 9);
  must(R(T0, 3) === 0.889 && R(ess, 3) === 0.111, "closed loop");
  G("u25-09", "closed-loop-step", "Proportional control leaves a steady-state error", "With C = 4 the loop gain is L(0) = 8, so the closed-loop step response settles at 8/9 ≈ 0.889 and misses the reference 1 by 1/(1 + 8) = 1/9 ≈ 0.111.",
    "A step response rising quickly and levelling at 0.889, below the dashed reference line at 1.", ["The loop gain at zero frequency is L(0) = 2 × 4 = 8.", "The closed loop is T(s) = 8/(s + 9), so T(0) = 8/9 ≈ 0.889.", "The step ends short of the reference by 1/(1 + 8) = 1/9 ≈ 0.111."],
    { x: [0, 0.8], y: [0, 1.2], t: [[0.2, 0.4, 0.6, 0.8], [0.25, 0.5, 0.75, 1]], ax: ["t (s)", "y"], grid: [0.2, 0.25], rest: { curves: [{ expr: `${a}*(1-exp(-9*x))`, colour: "a1" }], marks: [{ y: 1, label: "reference r = 1" }],
      points: [{ x: 0.6, y: R(T0 * (1 - e(-5.4)), 4), label: "0.889", dx: 0, dy: 20, anchor: "middle" }],
      checks: [{ type: "value", expr: `${a}*(1-exp(-9*x))`, x: 0.8, between: [0.888, 0.8889], name: "the response settles at T(0) = 8/9 ≈ 0.889" }, { type: "point", expr: `${a}*(1-exp(-9*x))`, x: 0, y: 0, name: "y(0) = 0" }], fromLesson: ["8/9 ≈ 0.889", "1/9 ≈ 0.111"] } });
}

// ---------- u25-10 Feedback Control: x' = 2x + u, u = -Kx, K = 5 ----------
{ const a = 2, K = 5, cl = a - K;
  must(cl === -3, "pole");
  G("u25-10", "pole-placement", "Feedback moves the pole from +2 to −3", "Without control ẋ = 2x grows like e^{2t}. With u = −5x the closed loop is ẋ = −3x and x(t) = e^{−3t} decays with time constant 1/3 s.",
    "From x(0) = 1, one curve grows rapidly (open loop e^{2t}) and one decays (closed loop e^{−3t}); the decaying one is at 0.368 at t = 1/3.", ["Open loop: ẋ = 2x, pole at +2, so x = e^{2t} grows.", "Choose u = −Kx: ẋ = (2 − K)x, and 2 − K = −3 needs K = 5.", "Closed loop x = e^{−3t}: it reaches 1/e ≈ 0.368 at t = 1/3 s."],
    { x: [0, 1.5], y: [0, 3], t: [[0.5, 1, 1.5], [1, 2, 3]], ax: ["t (s)", "x"], grid: [0.5, 1], rest: { curves: [{ expr: "exp(2*x)", colour: "a2" }, { expr: "exp(-3*x)", colour: "a1" }], legend: [["open loop e^{2t}", "a2"], ["closed loop e^{−3t}", "a1"]], legendData: [0.55, 2.8],
      points: [{ x: 1 / 3, y: R(e(-1), 4), label: "τ = 1/3", dx: 10, dy: -12 }],
      checks: [{ type: "slope", expr: "exp(2*x)", x: 0, value: a, name: "open-loop slope at 0 is +2" }, { type: "slope", expr: "exp(-3*x)", x: 0, value: cl, name: "closed-loop slope at 0 is 2 − K = −3" }, { type: "point", expr: "exp(-3*x)", x: 1 / 3, y: R(e(-1), 4), name: "after τ = 1/3 the value is e⁻¹" }], fromLesson: ["K = 5 stabilises it"] } });
}

// ---------- u25-13 Lyapunov: V = x^2 and dV/dt = -2x^4 ----------
G("u25-13", "lyapunov-v", "V = x² and its rate −2x⁴", "V = x² is positive away from 0 and V̇ = 2x(−x³) = −2x⁴ is negative away from 0, so the energy-like V always decreases: the origin is asymptotically stable.",
  "Two curves: V = x², a parabola above the axis, and V̇ = −2x⁴, a flat-bottomed curve below the axis, both touching zero only at x = 0.", ["Take V = x², positive for every x ≠ 0.", "Along ẋ = −x³: V̇ = 2x·ẋ = −2x⁴.", "V̇ < 0 for every x ≠ 0, so V falls to 0 and the origin is globally asymptotically stable."],
  { x: [-1.2, 1.2], y: [-4.5, 3], t: [[-1, 0, 1], [-4, -2, 0, 2]], ax: ["x", ""], grid: [0.5, 1], rest: { curves: [{ expr: "x^2", colour: "a1" }, { expr: "-2*x^4", colour: "a2" }], legend: [["V = x²", "a1"], ["V̇ = −2x⁴", "a2"]], legendData: [-1.15, 2.85],
    checks: [{ type: "point", expr: "x^2", x: 1, y: 1, name: "V(1) = 1 > 0" }, { type: "point", expr: "-2*x^4", x: 1, y: -2, name: "V̇(1) = −2 < 0" }, { type: "max", expr: "-2*x^4", domain: [-1.2, 1.2], x: 0, y: 0, name: "V̇ ≤ 0, with 0 only at x = 0" }], fromLesson: ["−2x^{4}"] } });

// ---------- u25-16 Frequency Response: |G| = 10/sqrt(100 + w^2) ----------
{ const g = 10 / Math.sqrt(200);
  G("u25-16", "gain-first-order", "Gain of G(s) = 10/(s + 10)", "At ω = 10 rad/s, G(10i) = 1/(1 + i): the gain is 1/√2 ≈ 0.707 (−3 dB) and the phase −45°. The gain falls away at higher frequencies.",
    "A curve starting at gain 1 and falling; at ω = 10 rad/s the gain is 0.707, marked.", ["Substitute s = iω: G(iω) = 10/(10 + iω).", "Its gain is |G| = 10/√(100 + ω²).", "At ω = 10: |G| = 10/√200 = 1/√2 ≈ 0.707, which is −3 dB."],
    { x: [0, 50], y: [0, 1.1], t: [[10, 20, 30, 40, 50], [0.25, 0.5, 0.75, 1]], ax: ["ω (rad/s)", "|G|"], grid: [10, 0.25], rest: { curves: [{ expr: "10/sqrt(100+x^2)", colour: "a1" }], marks: [{ x: 10 }],
      points: [{ x: 10, y: R(g, 4), label: "0.707", dx: 12, dy: -8 }],
      checks: [{ type: "point", expr: "10/sqrt(100+x^2)", x: 10, y: R(g, 4), name: "|G(10i)| = 1/√2 ≈ 0.707" }, { type: "point", expr: "10/sqrt(100+x^2)", x: 0, y: 1, name: "the DC gain is 1" }], fromLesson: ["|G| = 1/√2 ≈ 0.707"] } });
}

// ---------- u25-17 Bode: 100/(s+10) in dB against log10 w ----------
{ const dB = (w) => 40 - 10 * Math.log10(w * w + 100), pts = [0, 1, 2].map((k) => ({ k, v: dB(10 ** k) })), ex = "40-10*log(10^(2*x)+100)/log(10)";
  must(R(pts[0].v, 0) === 20 && R(pts[1].v, 0) === 17 && Math.abs(pts[2].v) < 0.1, "bode");
  G("u25-17", "bode-gain", "Bode gain of G(s) = 100/(s + 10)", "The gain is 20 dB at low frequency, about 17 dB at the corner ω = 10 (3 dB down) and about 0 dB a decade later, falling 20 dB per decade.",
    "Gain in decibels against log of frequency: flat at 20 dB, then falling; marked values 20 dB at ω = 1, 17 dB at ω = 10 and 0 dB at ω = 100.", ["The low-frequency gain is G(0) = 10, which is 20 dB.", "At the corner ω = 10 the gain is 3 dB lower: about 17 dB.", "One decade later, at ω = 100, it has fallen about 20 dB to roughly 0 dB."],
    { x: [-1, 3], y: [-20, 25], t: [[-1, 0, 1, 2, 3], [-20, -10, 0, 10, 20]], ax: ["log₁₀ ω", "gain (dB)"], grid: [1, 10], h: [360, 340], rest: { xLabelBelow: true, curves: [{ expr: ex, colour: "a1" }],
      points: pts.map((p, i) => ({ x: p.k, y: R(p.v, 4), label: ["20 dB", "17 dB", "0 dB"][i], dx: i ? 12 : 10, dy: i ? -10 : -12 })),
      checks: pts.map((p, i) => ({ type: "point", expr: ex, x: p.k, y: R(p.v, 4), name: `ω = ${10 ** p.k}: ${R(p.v, 1)} dB` })), fromLesson: ["about 20 − 3 = 17 dB"] } });
}

// ---------- u25-18 Nyquist: |L| = K/(1+w^2)^1.5 at K = 8, phase -180 at w = sqrt3 ----------
{ const w = Math.sqrt(3), K = 8, mag = K / (1 + w * w) ** 1.5;
  must(Math.abs(3 * Math.atan(w) - PI) < 1e-12 && Math.abs(mag - 1) < 1e-12, "nyquist");
  G("u25-18", "nyquist-gain-margin", "Critical gain for K/(s + 1)³", "The phase is −180° at ω = √3, where |L| = K/8. At the critical K = 8 the gain there is exactly 1, so the locus passes through −1; any K < 8 keeps it clear.",
    "The gain curve 8/(1 + ω²)^{3/2} falling from 8; it crosses the level 1 at ω = √3 ≈ 1.73.", ["The phase of 1/(s + 1)³ is −3 arctan ω; it equals −180° when ω = √3.", "There |L| = K/(1 + 3)^{3/2} = K/8.", "The locus touches −1 when K/8 = 1: stable for K < 8."],
    { x: [0, 4], y: [0, 9], t: [[1, 2, 3, 4], [2, 4, 6, 8]], ax: ["ω (rad/s)", "|L| at K = 8"], grid: [1, 2], rest: { curves: [{ expr: "8/(1+x^2)^1.5", colour: "a1" }], marks: [{ y: 1, label: "|L| = 1" }],
      points: [{ x: R(w, 4), y: 1, label: "ω = √3", dx: 10, dy: -14 }],
      checks: [{ type: "point", expr: "8/(1+x^2)^1.5", x: w, y: 1, name: "|L(i√3)| = 8/8 = 1 at K = 8" }, { type: "point", expr: "8/(1+x^2)^1.5", x: 0, y: 8, name: "|L(0)| = K = 8" }], fromLesson: ["K < 8"] } });
}

// ---------- u25-19 Root Locus: s^2 + 2s + K = 0 ----------
{ const poles = (K) => [-1 + Math.sqrt(1 - K), -1 - Math.sqrt(1 - K)];
  must(poles(1)[0] === -1 && poles(1)[1] === -1, "double pole");
  G("u25-19", "root-locus-real", "Closed-loop poles of 1/(s(s + 2)) as K grows", "For K ≤ 1 the poles −1 ± √(1 − K) are real and move together; they meet at −1 when K = 1 (critical damping). Beyond K = 1 they are complex with real part −1.",
    "Real parts of the two poles against K: two branches from 0 and −2 meeting at −1 when K = 1, then a single line at −1 for K above 1.", ["The characteristic equation is s² + 2s + K = 0, with poles −1 ± √(1 − K).", "At K = 0 they are 0 and −2; as K grows they approach each other.", "At K = 1 they meet at −1: critical damping. For K > 1 they are −1 ± i√(K − 1), real part −1."],
    { x: [0, 3], y: [-2.4, 0.4], t: [[1, 2, 3], [-2, -1, 0]], ax: ["gain K", "real part of the poles"], grid: [1, 1], rest: { curves: [{ expr: "-1+sqrt(1-x)", colour: "a1", domain: [0, 1] }, { expr: "-1-sqrt(1-x)", colour: "a2", domain: [0, 1] }, { expr: "-1", colour: "a4", domain: [1, 3], dash: "6 4" }],
      points: [{ x: 1, y: -1, label: "K = 1", dx: 12, dy: -12 }, { x: 0, y: 0, label: "0", dx: 10, dy: 14 }, { x: 0, y: -2, label: "−2", dx: 12, dy: 18 }],
      checks: [{ type: "point", expr: "-1+sqrt(1-x)", x: 1, y: -1, name: "the poles meet at −1 when K = 1" }, { type: "point", expr: "-1-sqrt(1-x)", x: 1, y: -1, name: "(the other branch too)" }, { type: "point", expr: "-1+sqrt(1-x)", x: 0, y: 0, name: "K = 0 gives the open-loop pole 0" }, { type: "point", expr: "-1-sqrt(1-x)", x: 0, y: -2, name: "K = 0 gives the open-loop pole −2" }], fromLesson: ["K = 1"] } });
}

// ---------- u25-20 State Estimation: error e' = (-1 - L)e ----------
{ const L1 = 4, rate = 1 + L1;
  G("u25-20", "observer-error", "Estimation error with and without correction", "With L = 4 the error obeys ė = −5e and shrinks five times faster than the plain model's e^{−t}: after 0.2 s it has fallen to 1/e.",
    "Two decaying curves from error 1: the slow one e^{−t} with no correction and the fast one e^{−5t} with L = 4.", ["The error dynamics are ė = (A − LC)e = (−1 − L)e.", "Rate 5 needs −1 − L = −5, so L = 4.", "The error e^{−5t} dies out five times faster than e^{−t}."],
    { x: [0, 2], y: [0, 1.1], t: [[0.5, 1, 1.5, 2], [0.25, 0.5, 0.75, 1]], ax: ["t (s)", "estimation error"], grid: [0.5, 0.25], rest: { curves: [{ expr: "exp(-1*x)", colour: "a2" }, { expr: "exp(-5*x)", colour: "a1" }], legend: [["L = 0: e^{−t}", "a2"], ["L = 4: e^{−5t}", "a1"]], legendData: [0.9, 1.05],
      points: [{ x: 0.2, y: R(e(-1), 4), label: "0.2 s", dx: 10, dy: -10 }],
      checks: [{ type: "slope", expr: "exp(-1*x)", x: 0, value: -1, name: "L = 0: rate −1" }, { type: "slope", expr: "exp(-5*x)", x: 0, value: -rate, name: "L = 4: rate −1 − L = −5" }, { type: "point", expr: "exp(-5*x)", x: 0.2, y: R(e(-1), 4), name: "after 1/5 s the error is 1/e" }], fromLesson: ["L = 4"] } });
}

// ---------- u25-21 Kalman Filtering: P = P/(P+1) + 1 ----------
{ const Pm = (1 + Math.sqrt(5)) / 2, K = Pm / (Pm + 1);
  must(R(Pm, 3) === 1.618 && R(K, 3) === 0.618, "kalman");
  G("u25-21", "kalman-fixed-point", "Steady-state predicted variance as a fixed point", "The predicted variance repeats P⁻ → P⁻/(P⁻ + 1) + 1. The curve meets the line y = x at P⁻ = (1 + √5)/2 ≈ 1.618, giving gain 1.618/2.618 ≈ 0.618.",
    "The curve y = P/(P + 1) + 1 and the diagonal y = x cross at 1.618, marked.", ["Update with R = 1: P = P⁻/(P⁻ + 1); predict with Q = 1: next P⁻ = P + 1.", "At steady state P⁻ = P⁻/(P⁻ + 1) + 1, so P⁻² − P⁻ − 1 = 0.", "P⁻ = (1 + √5)/2 ≈ 1.618 and the gain is K = 1.618/2.618 ≈ 0.618."],
    { x: [0, 3], y: [0, 3], t: [[1, 2, 3], [1, 2, 3]], ax: ["P⁻ now", "P⁻ next"], grid: [1, 1], h: [340, 340], rest: { curves: [{ expr: "x/(x+1)+1", colour: "a1" }, { expr: "x", colour: "a2", dash: "5 4" }], points: [{ x: R(Pm, 5), y: R(Pm, 5), label: "1.618", dx: 12, dy: 18 }],
      checks: [{ type: "intersect", a: "x/(x+1)+1", b: "x", x: Pm, y: Pm, name: "the fixed point is (1 + √5)/2 ≈ 1.618" }], fromLesson: ["1.618", "0.618"] } });
}

// ---------- u25-22 System Identification: y_t = 0.8 y_{t-1} + 2 u_{t-1}, unit step ----------
{ const a = 0.8, b = 2, dc = R(b / (1 - a), 9); let y = 0; const ys = [0]; for (let t = 1; t <= 20; t++) { y = a * y + b; ys.push(y); }
  must(dc === 10 && R(ys[2], 9) === 3.6 && Math.abs(ys[1] - 2) < 1e-12 && Math.abs(ys[20] - dc * (1 - a ** 20)) < 1e-9, "arx");
  G("u25-22", "arx-step", "Step response of y_t = 0.8y_{t−1} + 2u_{t−1}", "Fed a unit step, the model's output creeps from 0 towards 10 as 10(1 − 0.8^t): the first step gives 2, and the DC gain is b/(1 − a) = 2/0.2 = 10.",
    "A curve rising from 0 by 2 at t = 1 and levelling off at 10, with a dashed line at 10.", ["The model has a₁ = −0.8 and b₁ = 2.", "A unit step gives y₁ = 2, y₂ = 3.6, … following 10(1 − 0.8^t).", "At steady state y = 0.8y + 2u, so the DC gain is 2/0.2 = 10."],
    { x: [0, 20], y: [0, 11], t: [[5, 10, 15, 20], [2, 4, 6, 8, 10]], ax: ["step t", "y"], grid: [5, 2], rest: { curves: [{ expr: "10*(1-0.8^x)", colour: "a1" }], marks: [{ y: dc, label: "DC gain 10" }], points: [{ x: 1, y: ys[1], label: "2", dx: 10, dy: 14 }],
      checks: [{ type: "point", expr: "10*(1-0.8^x)", x: 1, y: ys[1], name: "y₁ = 2 from the recursion" }, { type: "point", expr: "10*(1-0.8^x)", x: 2, y: ys[2], name: "y₂ = 3.6 from the recursion" }, { type: "value", expr: "10*(1-0.8^x)", x: 20, between: [9.8, 10], name: "the output approaches the DC gain 10" }], fromLesson: ["DC gain y/u = 2/0.2 = 10"] } });
}

// ---------- u25-23 LQR: scalar Riccati -P^2 + 9 = 0 ----------
{ const Q = 9, Rr = 1, P = Math.sqrt(Q * Rr), K = P / Rr;
  must(K === 3, "lqr");
  G("u25-23", "lqr-riccati", "The scalar Riccati equation 9 − P² = 0", "With A = 0, B = 1, Q = 9 and R = 1 the Riccati equation is −P² + 9 = 0. The positive root P = 3 gives the gain K = 3 and the closed loop ẋ = −3x.",
    "The downward parabola 9 − P² crossing the horizontal axis at P = 3, marked.", ["For ẋ = u the Riccati equation reads −P² + Q = 0, that is 9 − P² = 0.", "The positive root is P = 3.", "K = R⁻¹BP = 3, and the closed loop is ẋ = −3x."],
    { x: [0, 4], y: [-2, 10], t: [[1, 2, 3, 4], [0, 2, 4, 6, 8, 10]], ax: ["P", "9 − P²"], grid: [1, 2], rest: { curves: [{ expr: "9-x^2", colour: "a1" }], points: [{ x: P, y: 0, label: "P = 3", dx: 10, dy: -12 }],
      checks: [{ type: "point", expr: "9-x^2", x: P, y: 0, name: "P = 3 solves the Riccati equation" }, { type: "point", expr: "9-x^2", x: 0, y: Q, name: "the constant term is Q = 9" }], fromLesson: ["P = 3"] } });
}

// ---------- u25-29 Distributed Control: three-agent consensus on a line ----------
{ const Lap = [[1, -1, 0], [-1, 2, -1], [0, -1, 1]], x0 = [0, 3, 6], xdot = Lap.map((r) => -r.reduce((s, v, j) => s + v * x0[j], 0)), avg = x0.reduce((a, b) => a + b) / 3;
  must(avg === 3 && xdot.join() === "3,0,-3", "consensus");
  G("u25-29", "consensus-three", "Three agents agree on the average", "Each agent moves towards its neighbours: x₁ = 3 − 3e^{−t}, x₂ = 3, x₃ = 3 + 3e^{−t}. All three meet at (0 + 3 + 6)/3 = 3.",
    "Three curves starting at 0, 3 and 6 and converging to 3: the middle agent stays at 3, the others approach it.", ["Agents 1–2–3 start at 0, 3 and 6.", "The graph is connected and undirected, so the states converge to the average.", "(0 + 3 + 6)/3 = 3: every agent ends at 3."],
    { x: [0, 5], y: [-0.3, 6.5], t: [[1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5, 6]], ax: ["t", "state"], grid: [1, 1], rest: { curves: [{ expr: "3-3*exp(-x)", colour: "a1" }, { expr: "3", colour: "a2" }, { expr: "3+3*exp(-x)", colour: "a4" }], marks: [{ y: avg, label: "average 3" }],
      legend: [["agent 3", "a4"], ["agent 2", "a2"], ["agent 1", "a1"]], legendData: [2.6, 5.6],
      checks: [{ type: "point", expr: "3-3*exp(-x)", x: 0, y: 0, name: "agent 1 starts at 0" }, { type: "point", expr: "3+3*exp(-x)", x: 0, y: 6, name: "agent 3 starts at 6" }, { type: "slope", expr: "3-3*exp(-x)", x: 0, value: xdot[0], name: "agent 1's initial rate x₂ − x₁ = 3" }, { type: "slope", expr: "3+3*exp(-x)", x: 0, value: xdot[2], name: "agent 3's initial rate x₂ − x₃ = −3" }, { type: "value", expr: "3-3*exp(-x)", x: 5, between: [2.97, 3], name: "agent 1 approaches 3" }], fromLesson: ["(0 + 3 + 6)/3 = 3"] } });
}
