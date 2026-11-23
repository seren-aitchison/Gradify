// Unit 4, Classical Mechanics. Every number in a caption or claim is computed here once, from the lesson's own worked
// example. Run: node scripts/diagrams/physics/u04.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));
const g = 9.8, deg = Math.PI / 180, PI = "3.14159265";

// u04-03 a car slowing from 30 m s⁻¹ to rest in 5.0 s
{ const u = 30, t = 5, a = -u / t, s = (u * t) / 2;
  mk("u04-03", "phys-u04-braking-vt", "motion", {
    title: "Slowing to a stop",
    caption: `The velocity falls steadily from ${u} m s⁻¹ to 0 in ${t.toFixed(1)} s, so the acceleration is the gradient, ${a} m s⁻². The area under the line, ${s} m, is the distance travelled while braking.`,
    alt: "Velocity–time graph falling in a straight line from 30 metres per second to zero at 5 seconds, above a constant acceleration of minus 6.",
    description: [`v falls linearly from ${u} m s⁻¹ at t = 0 to 0 at t = ${t} s.`, `Gradient: a = (0 − ${u}) / ${t} = ${a} m s⁻², constant.`, `Area under the v–t line: ½ × ${t} × ${u} = ${s} m.`],
    u, segments: [{ dt: t, a }], show: ["v", "a"],
    claims: [{ type: "v", t, value: 0, mark: false }, { type: "displacement", from: 0, to: t, value: s }],
  }); }

// u04-04 v(t) = 6 − 2t from 0 to 5 s: displacement and distance differ
{ const u = 6, a = -2, T = 5, disp = u * T + 0.5 * a * T * T, tTurn = -u / a, dist = Math.abs(u * tTurn + 0.5 * a * tTurn ** 2) + Math.abs(disp - (u * tTurn + 0.5 * a * tTurn ** 2));
  mk("u04-04", "phys-u04-displacement-distance", "motion", {
    title: "Displacement against distance",
    caption: `With v = 6 − 2t the object moves forward until t = ${tTurn} s, then back. The signed area under the v–t graph gives the displacement, ${disp} m; adding the areas as positive gives the distance, ${dist} m.`,
    alt: "Position–time and velocity–time graphs for v = 6 − 2t: the velocity line crosses zero at 3 seconds and the position peaks at 9 metres before falling back to 5.",
    description: [`v = 6 − 2t: positive until t = ${tTurn} s, negative after.`, `Area from 0 to ${tTurn} s: +9 m. Area from ${tTurn} to ${T} s: −4 m.`, `Displacement = 9 − 4 = ${disp} m. Distance = 9 + 4 = ${dist} m.`, "The position graph peaks at 9 m where v = 0, then falls back to 5 m."],
    u, segments: [{ dt: T, a }], show: ["x", "v"],
    claims: [{ type: "v", t: tTurn, value: 0, mark: false }, { type: "displacement", from: 0, to: tTurn, value: 9, label: "+9 m" }, { type: "displacement", from: tTurn, to: T, value: -4, label: "−4 m" },
      { type: "displacement", from: 0, to: T, value: disp, shade: false }, { type: "distance", from: 0, to: T, value: dist, shade: false }, { type: "x", t: tTurn, value: 9 }],
  }); }

// u04-06 stopping distance: 25 m s⁻¹ braking at 5.0 m s⁻²
{ const u = 25, a = -5, t = u / 5, s = (u * u) / 10;
  mk("u04-06", "phys-u04-stopping-distance", "motion", {
    title: "Stopping distance from v² = u² + 2as",
    caption: `Braking at ${-a}.0 m s⁻² from ${u} m s⁻¹, the car stops after ${t} s. Setting v = 0 in v² = u² + 2as gives s = ${u}² ÷ (2 × ${-a}) = ${s} m: the area under the velocity line.`,
    alt: "Position and velocity against time for a car braking from 25 metres per second to rest in 5 seconds, covering 62.5 metres.",
    description: [`Velocity falls from ${u} to 0 m s⁻¹ in ${t} s.`, `Position rises along a curve that flattens as the car slows, reaching ${s} m.`, `s = u² / 2|a| = 625 / 10 = ${s} m.`],
    u, segments: [{ dt: t, a }], show: ["x", "v"],
    claims: [{ type: "v", t, value: 0, mark: false }, { type: "displacement", from: 0, to: t, value: s }],
  }); }

// u04-07 projectile: 20 m s⁻¹ at 30°, g = 9.8
{ const u = 20, th = 30, R = (u * u * Math.sin(2 * th * deg)) / g, Hm = (u * Math.sin(th * deg)) ** 2 / (2 * g);
  const path = `x*${Math.tan(th * deg)}-${g}*x^2/(2*${(u * Math.cos(th * deg)) ** 2})`;
  mk("u04-07", "phys-u04-projectile-path", "graph", {
    title: "A projectile's path",
    caption: `Kicked at ${u} m s⁻¹ and ${th}°, the ball follows a parabola. Range R = u² sin 2θ / g = ${r(R, 1)} m; maximum height H = u² sin²θ / 2g = ${r(Hm, 2)} m, reached halfway.`,
    alt: "Parabolic trajectory of height against horizontal distance, peaking at 5.1 metres at 17.7 metres and landing at 35.3 metres.",
    description: ["Horizontal velocity is constant; vertical velocity changes at g, so the path is a parabola.", `Range: ${u}² × sin 60° / ${g} = ${r(R, 2)} m.`, `Maximum height: (${u} sin ${th}°)² / (2 × ${g}) = ${r(Hm, 2)} m at x = ${r(R / 2, 1)} m.`, "No air resistance; with drag the path is shorter and steeper coming down."],
    range: { x: [0, 40], y: [0, 8] }, ticks: [[10, 20, 30, 40], [2, 4, 6, 8]], height: [300, 280], xLabelBelow: true, axisLabels: ["horizontal distance / m", "height / m"],
    curves: [{ expr: path, domain: [0, R], colour: "a1" }],
    marks: [{ x: R / 2, to: Hm, label: `H = ${r(Hm, 1)} m` }],
    points: [{ x: R, y: 0, colour: "a2", label: `R = ${r(R, 1)} m`, anchor: "end", dx: -8, dy: -14 }],
    checks: [{ type: "max", expr: path, domain: [0, R], x: r(R / 2, 4), y: r(Hm, 4), name: `maximum height ${r(Hm, 2)} m at half the range` }, { type: "point", expr: path, x: r(R, 6), y: 0, name: `lands at R = ${r(R, 2)} m` }],
  }); }

// u04-08 a swimmer aiming straight across a river
{ const vs = 1.5, vr = 0.9, w = 60, v = Math.hypot(vs, vr), ang = Math.atan2(vr, vs) / deg, t = w / vs, drift = vr * t;
  mk("u04-08", "phys-u04-swimmer-river", "vectors", {
    title: "Swimming across a flowing river",
    caption: `Aiming straight across at ${vs} m s⁻¹ while the river flows at ${vr} m s⁻¹, the swimmer moves at ${r(v, 2)} m s⁻¹, ${Math.round(ang)}° downstream of straight across. Crossing ${w} m takes ${t} s, so the river carries them ${r(drift, 0)} m downstream.`,
    alt: "Vector triangle: 1.5 metres per second across, 0.9 downstream, and a resultant of 1.75 at 31 degrees downstream.",
    description: [`The swimmer's velocity relative to the water: ${vs} m s⁻¹ straight across.`, `The water's velocity: ${vr} m s⁻¹ downstream, drawn from the tip.`, `Resultant: √(${vs}² + ${vr}²) = ${r(v, 2)} m s⁻¹, at tan⁻¹(${vr}/${vs}) = ${r(ang, 1)}° downstream.`, `Time across = ${w} / ${vs} = ${t} s; drift = ${vr} × ${t} = ${r(drift, 0)} m.`],
    mode: "add", units: "m s^{-1}",
    vectors: [{ label: "v_{swim}", mag: vs, angle: 90, text: `${vs} m s^{-1} across`, comps: [0, vs] }, { label: "v_{river}", mag: vr, angle: 0, text: `${vr} m s^{-1} downstream`, colour: "a4", comps: [vr, 0] }],
    resultant: { label: "v", mag: r(v, 3), angle: r(90 - ang, 2), text: `${r(v, 2)} m s^{-1}` },
    claims: [{ type: "angleBetween", a: "v_{swim}", b: "v", value: r(ang, 1) }],
  }); }

// u04-10 Newton's second law: 10 N pull, 4.0 N friction, 2.0 kg
{ const m = 2, P = 10, f = 4, W = m * g, net = P - f, a = net / m;
  mk("u04-10", "phys-u04-second-law-block", "vectors", {
    title: "Forces on a pulled block",
    caption: `Weight and the normal force cancel. Horizontally, ${P} N forward and ${f.toFixed(1)} N of friction leave a net ${net} N, so a = F/m = ${net} / ${m.toFixed(1)} = ${a.toFixed(1)} m s⁻².`,
    alt: "Free-body diagram of a block: weight down and normal force up, equal; a 10 newton pull to the right and 4 newtons of friction to the left; net 6 newtons to the right.",
    description: [`Weight: mg = ${m} × ${g} = ${r(W, 1)} N down. Normal force: ${r(W, 1)} N up.`, `Pull: ${P} N to the right. Friction: ${f} N to the left.`, `Net force: ${net} N to the right, so a = ${a} m s⁻².`],
    mode: "body", units: "N",
    vectors: [{ label: "W", mag: r(W, 2), angle: 270, source: "Earth's gravity" }, { label: "N", mag: r(W, 2), angle: 90, source: "the surface" }, { label: "P", mag: P, angle: 0, source: "the pull", colour: "a3" }, { label: "f", mag: f, angle: 180, source: "friction", colour: "a2" }],
    resultant: { label: "net force", mag: net, angle: 0 }, showResultant: true,
  }); }

// u04-11 scales in a lift accelerating upward at 2.0 m s⁻²
{ const m = 60, a = 2, W = m * g, R = m * (g + a);
  mk("u04-11", "phys-u04-lift-scales", "vectors", {
    title: "Weighing yourself in an accelerating lift",
    caption: `To accelerate upward at ${a.toFixed(1)} m s⁻² the scales must push up harder than the weight: R = m(g + a) = ${m} × ${g + a} = ${r(R, 0)} N, against a weight of ${r(W, 0)} N. The scales read the push, ${r(R, 0)} N, as if the mass were ${r(R / g, 1)} kg.`,
    alt: "Free-body diagram of a person in a lift: weight 588 newtons down, normal force 708 newtons up, net 120 newtons up.",
    description: [`Weight: ${m} × ${g} = ${r(W, 0)} N down.`, `Normal force from the scales: R, up.`, `Newton's second law upward: R − ${r(W, 0)} = ${m} × ${a}, so R = ${r(R, 0)} N.`, `Net force ${r(R - W, 0)} N up.`],
    mode: "body", units: "N",
    vectors: [{ label: "W", mag: r(W, 1), angle: 270, source: "Earth's gravity" }, { label: "R", mag: r(R, 1), angle: 90, source: "the scales" }],
    resultant: { label: "net force", mag: r(R - W, 1), angle: 90 }, showResultant: true,
  }); }

// u04-12 the existing free-body diagram on a slope
// (phys-fbd-slope is planned in plans/physics/u04.mjs; its spec predates the unit batches)

// u04-13 Atwood machine: 3.0 kg and 2.0 kg
{ const m1 = 3, m2 = 2, a = ((m1 - m2) * g) / (m1 + m2), T = (2 * m1 * m2 * g) / (m1 + m2), W2 = m2 * g;
  mk("u04-13", "phys-u04-atwood-light-mass", "vectors", {
    title: "Forces on the lighter mass of an Atwood machine",
    caption: `The masses accelerate at a = (m₁ − m₂)g / (m₁ + m₂) = ${r(a, 2)} m s⁻². For the ${m2}.0 kg mass, rising, tension T = ${r(T, 1)} N exceeds its weight ${r(W2, 1)} N by m₂a = ${r(m2 * a, 2)} N.`,
    alt: "Free-body diagram of the 2 kilogram mass: tension 23.5 newtons up and weight 19.6 newtons down, net 3.9 newtons up.",
    description: [`a = (${m1} − ${m2}) × ${g} / ${m1 + m2} = ${r(a, 2)} m s⁻².`, `T = 2m₁m₂g / (m₁ + m₂) = ${r(T, 2)} N.`, `On the ${m2} kg mass: T = ${r(T, 2)} N up, weight ${r(W2, 1)} N down, net ${r(T - W2, 2)} N up = m₂a.`],
    mode: "body", units: "N",
    vectors: [{ label: "T", mag: r(T, 3), angle: 90, source: "the string" }, { label: "W", mag: r(W2, 3), angle: 270, source: "Earth's gravity" }],
    resultant: { label: "net force", mag: r(T - W2, 3), angle: 90 }, showResultant: true,
  }); }

// u04-14 static then kinetic friction: 20 kg box, μs = 0.5, μk = 0.4
{ const m = 20, Fs = 0.5 * m * g, Fk = 0.4 * m * g;
  mk("u04-14", "phys-u04-friction-graph", "graph", {
    title: "Static friction gives way to kinetic friction",
    caption: `As the push grows, static friction matches it, up to μₛmg = ${r(Fs, 0)} N. Then the box starts to slide and friction drops to the kinetic value μₖmg = ${r(Fk, 1)} N, so it takes ${r(Fs, 0)} N to start the box but only ${r(Fk, 1)} N to keep it moving steadily.`,
    alt: "Friction force against applied force: rising along the line friction equals push up to 98 newtons, then dropping to a flat 78.4 newtons.",
    description: ["Horizontal axis: the applied push. Vertical axis: the friction force.", `Before sliding, friction equals the push, up to ${r(Fs, 0)} N (0.5 × ${m} × ${g}).`, `Once sliding, friction is constant at ${r(Fk, 1)} N (0.4 × ${m} × ${g}).`],
    range: { x: [0, 140], y: [0, 120] }, ticks: [[20, 40, 60, 80, 100, 120, 140], [20, 40, 60, 80, 100]], height: [320, 300], xLabelBelow: true, axisLabels: ["applied force / N", "friction / N"],
    series: [{ points: [[0, 0], [Fs, Fs]], colour: "a1", label: "static", labelAt: [52, 60] }, { points: [[Fs, Fs], [Fs, Fk], [140, Fk]], colour: "a2", label: "kinetic", labelAt: [112, Fk + 8] }],
    points: [{ x: r(Fs, 2), y: r(Fs, 2), colour: "a1", label: `${r(Fs, 0)} N`, anchor: "end", dx: -10, dy: -10 }],
    checks: [{ type: "point", expr: `0.5*${m}*${g}+0*x`, x: 0, y: r(Fs, 6), name: `limiting static friction μₛmg = ${r(Fs, 1)} N` }, { type: "point", expr: `0.4*${m}*${g}+0*x`, x: 0, y: r(Fk, 6), name: `kinetic friction μₖmg = ${r(Fk, 1)} N` }],
  }); }

// u04-15 sliding down a 30° slope with μk = 0.2 (forces per kilogram)
{ const th = 30, mu = 0.2, W = g, Nn = g * Math.cos(th * deg), f = mu * Nn, a = g * Math.sin(th * deg) - f, v = Math.sqrt(2 * a * 4);
  mk("u04-15", "phys-u04-slope-forces", "vectors", {
    title: "Sliding down a rough slope",
    caption: `Per kilogram: the weight's component down the slope is g sin 30° = ${r(g * Math.sin(th * deg), 2)} N; friction μₖg cos 30° = ${r(f, 2)} N opposes it, leaving a = ${r(a, 2)} m s⁻². After 4.0 m from rest, v = √(2as) = ${r(v, 2)} m s⁻¹.`,
    alt: "Free-body diagram for 1 kilogram on a 30 degree slope: weight down, normal force perpendicular to the slope, friction up the slope, net force down the slope.",
    description: [`Weight ${g} N straight down; normal force ${r(Nn, 2)} N perpendicular to the slope.`, `Friction ${r(f, 2)} N up the slope (μₖN).`, `Net: ${r(a, 2)} N down the slope, so a = ${r(a, 2)} m s⁻².`, `v² = 2 × ${r(a, 2)} × 4.0, v = ${r(v, 2)} m s⁻¹.`],
    mode: "body", units: "N",
    vectors: [{ label: "W", mag: W, angle: 270, source: "Earth's gravity" }, { label: "N", mag: r(Nn, 4), angle: 60, source: "the slope" }, { label: "f", mag: r(f, 4), angle: 150, source: "friction", colour: "a2" }],
    resultant: { label: "net force", mag: r(a, 3), angle: 330 }, showResultant: true,
  }); }

// u04-16 vertical circle: tension at the bottom
{ const m = 0.2, R = 0.5, v2b = g * R + 4 * g * R, T = m * g + (m * v2b) / R, W = m * g;
  mk("u04-16", "phys-u04-vertical-circle-bottom", "vectors", {
    title: "At the bottom of a vertical circle",
    caption: `At the lowest point the string must supply the weight and the centripetal force: T = mg + mv²/r = ${r(W, 2)} + ${r((m * v2b) / R, 1)} = ${r(T, 1)} N. The net force, ${r(T - W, 1)} N, points up to the centre.`,
    alt: "Free-body diagram of the ball at the bottom: tension 11.8 newtons up, weight 1.96 newtons down, net 9.8 newtons up towards the centre.",
    description: [`v at the top is √(gr) = ${r(Math.sqrt(g * R), 2)} m s⁻¹, the slowest that keeps the string taut.`, `Falling 2r = 1.0 m adds 2g(2r): v² at the bottom = ${r(g * R, 1)} + ${r(4 * g * R, 1)} = ${r(v2b, 1)} m² s⁻².`, `T = ${r(W, 2)} + ${m} × ${r(v2b, 1)} / ${R} = ${r(T, 1)} N.`],
    mode: "body", units: "N",
    vectors: [{ label: "T", mag: r(T, 3), angle: 90, source: "the string" }, { label: "W", mag: r(W, 3), angle: 270, source: "Earth's gravity" }],
    resultant: { label: "net (centripetal)", mag: r(T - W, 3), angle: 90 }, showResultant: true,
  }); }

// u04-17 a banked curve needing no friction (θ = 15°, r = 100 m), per tonne
{ const th = 15, R = 100, m = 1000, W = m * g, Nn = W / Math.cos(th * deg), Fc = W * Math.tan(th * deg), v = Math.sqrt(g * R * Math.tan(th * deg));
  mk("u04-17", "phys-u04-banked-curve", "vectors", {
    title: "A banked curve with no friction",
    caption: `On a ${th}° bank the normal force tilts towards the centre. Its vertical part balances the weight and its horizontal part, mg tan ${th}°, is the centripetal force. Then v = √(gr tan θ) = ${r(v, 1)} m s⁻¹ for r = ${R} m.`,
    alt: "Free-body diagram of a car on a banked curve: weight down and a normal force tilted 15 degrees towards the centre, with the net force horizontal, towards the centre.",
    description: [`For a 1000 kg car: weight ${r(W, 0)} N down.`, `Normal force N = mg / cos ${th}° = ${r(Nn, 0)} N, tilted ${th}° from vertical towards the centre.`, `Net force: N sin ${th}° = mg tan ${th}° = ${r(Fc, 0)} N, horizontal, towards the centre.`, `mv²/r = mg tan θ, so v = √(${g} × ${R} × tan ${th}°) = ${r(v, 1)} m s⁻¹.`],
    mode: "body", units: "N",
    vectors: [{ label: "W", mag: W, angle: 270, source: "Earth's gravity" }, { label: "N", mag: r(Nn, 2), angle: 90 + th, source: "the banked road" }],
    resultant: { label: "net (towards centre)", mag: r(Fc, 2), angle: 180 }, showResultant: true,
  }); }

// u04-19 a 0.5 kg ball dropped from 20 m: KE + PE constant
{ const m = 0.5, h = 20, E = m * g * h, v = Math.sqrt(2 * g * h), KE = `${m * g}*x`, PE = `${E}-${m * g}*x`;
  mk("u04-19", "phys-u04-energy-exchange", "graph", {
    title: "Potential energy becomes kinetic energy",
    caption: `As the ball falls, every joule of gravitational potential energy lost becomes kinetic energy, so the total stays at mgh = ${E} J. At the ground all ${E} J is kinetic: v = √(2gh) = ${r(v, 1)} m s⁻¹.`,
    alt: "Energy against distance fallen: potential energy falling from 98 joules to zero, kinetic energy rising from zero to 98, and total energy a flat line at 98.",
    description: [`Total energy mgh = ${m} × ${g} × ${h} = ${E} J.`, "Potential energy falls in a straight line with distance fallen; kinetic energy rises by the same amount.", `They cross at ${h / 2} m, where each is ${E / 2} J.`, `At the ground: ½mv² = ${E} J, v = ${r(v, 1)} m s⁻¹.`],
    range: { x: [0, 20], y: [0, 115] }, ticks: [[5, 10, 15, 20], [25, 50, 75, 100]], height: [320, 300], xLabelBelow: true, axisLabels: ["distance fallen / m", "energy / J"],
    curves: [{ expr: PE, colour: "a1", label: "potential", labelAt: [1, 86] }, { expr: KE, colour: "a2", label: "kinetic", labelAt: [15.5, 64] }, { expr: `${E}+0*x`, colour: "a4", dash: "6 5", label: "total", labelAt: [1, 106] }],
    checks: [{ type: "intersect", a: PE, b: KE, x: h / 2, y: E / 2, name: "equal halves at half the height" }, { type: "point", expr: KE, x: h, y: E, name: `all ${E} J is kinetic at the ground` }, { type: "point", expr: `0.5*${m}*${r(v, 8)}^2+0*x`, x: 0, y: E, name: `½mv² = ${E} J at v = ${r(v, 2)} m s⁻¹` }],
  }); }

// u04-20 energy down a rough slope: 2.0 kg, 5.0 m along a 30° slope, 4.0 N friction
{ const m = 2, L = 5, h = L * Math.sin(30 * deg), PE = m * g * h, Wf = 4 * L, KE = PE - Wf, v = Math.sqrt((2 * KE) / m);
  mk("u04-20", "phys-u04-slope-energy", "sankey", {
    title: "Where the energy goes on a rough slope",
    caption: `Sliding ${L.toFixed(1)} m down the 30° slope, the block loses ${r(PE, 0)} J of potential energy. Friction (a non-conservative force) turns ${Wf} J into heat; the remaining ${r(KE, 0)} J is kinetic energy, giving v = ${r(v, 2)} m s⁻¹.`,
    alt: "Energy flow diagram: 49 joules of potential energy in, 29 joules out as kinetic energy and 20 joules as heat from friction.",
    description: [`Height lost: ${L} × sin 30° = ${h} m; potential energy lost: ${m} × ${g} × ${h} = ${r(PE, 0)} J.`, `Work against friction: 4.0 × ${L} = ${Wf} J, becoming heat.`, `Kinetic energy gained: ${r(PE, 0)} − ${Wf} = ${r(KE, 0)} J, so v = √(2 × ${r(KE, 0)} / ${m}) = ${r(v, 2)} m s⁻¹.`],
    units: "J", input: { label: "potential energy lost", value: r(PE, 2) }, outputs: [{ label: "kinetic energy", value: r(KE, 2), useful: true }, { label: "heat (friction)", value: Wf }], efficiency: r(KE / PE, 4),
  }); }

// u04-22 impulse: the same change of momentum over 0.05 s or 0.20 s
{ const m = 0.15, v = 30, dp = m * v, t1 = 0.05, t2 = 0.2, F1 = dp / t1, F2 = dp / t2, pk = (T) => (dp * Math.PI) / (2 * T);
  const c1 = `${pk(t1)}*sin(${PI}*x/${t1})`, c2 = `${pk(t2)}*sin(${PI}*x/${t2})`;
  mk("u04-22", "phys-u04-impulse-time", "graph", {
    title: "The same impulse, spread over more time",
    caption: `Stopping the ${m} kg ball needs an impulse of ${dp} N s, the area under each force–time curve. Over ${t1} s the average force is ${F1} N; letting the hands move back so it takes ${t2.toFixed(2)} s cuts it to ${F2} N.`,
    alt: "Force against time: a tall narrow pulse lasting 0.05 seconds and a low wide pulse lasting 0.20 seconds, enclosing the same area.",
    description: [`Change of momentum: ${m} × ${v} = ${dp} kg m s⁻¹.`, `Stopped in ${t1} s: average force ${dp} / ${t1} = ${F1} N (peak about ${r(pk(t1), 0)} N for this pulse shape).`, `Stopped in ${t2} s: average force ${F2} N (peak about ${r(pk(t2), 0)} N).`, "Both pulses enclose the same area, 4.5 N s."],
    range: { x: [0, 0.22], y: [0, 160] }, ticks: [[0.05, 0.1, 0.15, 0.2], [40, 80, 120, 160]], height: [320, 300], xLabelBelow: true, axisLabels: ["time / s", "force / N"],
    areas: [{ expr: c1, from: 0, to: t1, colour: "a2", opacity: 0.2 }, { expr: c2, from: 0, to: t2, colour: "a1", opacity: 0.16 }],
    curves: [{ expr: c1, domain: [0, t1], colour: "a2", label: `${t1} s: average ${F1} N`, labelAt: [0.056, 140] }, { expr: c2, domain: [0, t2], colour: "a1", label: `${t2.toFixed(2)} s: average ${F2} N`, labelAt: [0.13, 52] }],
    checks: [{ type: "area", expr: c1, from: 0, to: t1, value: dp, tol: 0.005, name: `${t1} s pulse: impulse ${dp} N s` }, { type: "area", expr: c2, from: 0, to: t2, value: dp, tol: 0.005, name: `${t2} s pulse: impulse ${dp} N s` }],
  }); }

// u04-24 an explosion from rest: 3.0 kg shell into 1.0 kg and 2.0 kg, 600 J released
{ const m1 = 1, m2 = 2, E = 600, v2 = Math.sqrt(E / (0.5 * m2 * m2 / m1 + 0.5 * m2)), v1 = (m2 * v2) / m1, p = m1 * v1;
  mk("u04-24", "phys-u04-explosion-momenta", "vectors", {
    title: "An explosion from rest",
    caption: `Momentum before is zero, so the two pieces carry equal and opposite momenta of ${r(p, 1)} kg m s⁻¹. Sharing the ${E} J between them gives the ${m1}.0 kg piece ${r(v1, 1)} m s⁻¹ and the ${m2}.0 kg piece ${r(v2, 1)} m s⁻¹.`,
    alt: "Two momentum arrows of 28.3 kilogram metres per second pointing in opposite directions from the explosion point, adding to zero.",
    description: [`Momentum: ${m1}v₁ = ${m2}v₂, so v₁ = 2v₂.`, `Energy: ½(${m1})v₁² + ½(${m2})v₂² = ${E} J, so 3v₂² = ${E} and v₂ = ${r(v2, 2)} m s⁻¹, v₁ = ${r(v1, 2)} m s⁻¹.`, `Each piece has momentum ${r(p, 2)} kg m s⁻¹, in opposite directions; the total stays zero.`],
    mode: "body", units: "kg m s^{-1}",
    vectors: [{ label: "p_{1}", mag: r(p, 3), angle: 180, source: `${m1}.0 kg piece, ${r(v1, 1)} m s^{-1}` }, { label: "p_{2}", mag: r(p, 3), angle: 0, source: `${m2}.0 kg piece, ${r(v2, 1)} m s^{-1}`, colour: "a4" }],
    resultant: { label: "total momentum", mag: 0, angle: 0 },
  }); }

// u04-28 the rocket equation: u = 3000 m s⁻¹, 100 t to 25 t
{ const u = 3000, ratio = 100 / 25, dv = u * Math.log(ratio), f = `${u}*log(x)`;
  mk("u04-28", "phys-u04-rocket-equation", "graph", {
    title: "The rocket equation",
    caption: `Δv = u ln(m₀/m) grows only logarithmically with the mass ratio. Burning from 100 t to 25 t (ratio ${ratio}) gives Δv = ${u} ln ${ratio} = ${r(dv, -1)} m s⁻¹; doubling the ratio to 8 adds only another ${r(u * Math.log(2), -1)} m s⁻¹.`,
    alt: "Graph of change in velocity against mass ratio, a logarithmic curve, with the point at ratio 4 and 4160 metres per second marked.",
    description: [`Exhaust speed u = ${u} m s⁻¹.`, `Δv = u ln(m₀/m): at ratio 2, ${r(u * Math.log(2), -1)} m s⁻¹; at ratio ${ratio}, ${r(dv, 0)} m s⁻¹; at ratio 8, ${r(u * Math.log(8), -1)} m s⁻¹.`, "Each doubling of the mass ratio adds the same Δv, which is why rockets use stages."],
    range: { x: [1, 10], y: [0, 7500] }, ticks: [[2, 4, 6, 8, 10], [2000, 4000, 6000]], height: [320, 300], xLabelBelow: true, axisLabels: ["mass ratio m₀/m", "Δv / m s⁻¹"],
    curves: [{ expr: f, colour: "a1" }], marks: [{ x: ratio, to: dv }, { y: dv, to: ratio }],
    points: [{ x: ratio, y: r(dv, 2), colour: "a2", label: `${r(dv, -1)} m s⁻¹`, dx: 10, dy: 14 }],
    checks: [{ type: "point", expr: f, x: ratio, y: r(dv, 6), name: `Δv = ${u} ln 4 = ${r(dv, 0)} m s⁻¹` }, { type: "point", expr: f, x: 1, y: 0, name: "no fuel burnt, no Δv" }],
  }); }

// u04-30 terminal velocity of a steel ball in glycerol (Stokes' law)
{ const rad = 1e-3, rs = 7800, rf = 1260, eta = 1.4, vt = (2 * rad * rad * (rs - rf) * g) / (9 * eta), tau = (vt * rs) / ((rs - rf) * g) * 1000, vmm = vt * 1000;
  const vf = `${vmm}*(1-exp(-x/${tau}))`;
  mk("u04-30", "phys-u04-terminal-velocity", "graph", {
    title: "Reaching terminal velocity",
    caption: `Drag grows with speed until it balances weight minus upthrust. For the steel ball in glycerol, v_t = 2r²(ρ_s − ρ_f)g / 9η = ${r(vmm, 1)} mm s⁻¹, reached within a few milliseconds (time constant ${r(tau, 2)} ms).`,
    alt: "Speed against time rising steeply then levelling off at the terminal velocity of about 10 millimetres per second.",
    description: [`r = 1.0 mm, ρ_s = ${rs} kg m⁻³, ρ_f = ${rf} kg m⁻³, η = ${eta} Pa s.`, `v_t = 2 × (10⁻³)² × ${rs - rf} × ${g} / (9 × ${eta}) = ${r(vt, 5)} m s⁻¹ = ${r(vmm, 1)} mm s⁻¹.`, `With linear drag the approach is exponential, time constant v_t ρ_s / ((ρ_s − ρ_f) g) = ${r(tau, 2)} ms.`, "Measuring v_t is how a falling-ball viscometer finds η."],
    range: { x: [0, 6], y: [0, 12] }, ticks: [[1, 2, 3, 4, 5, 6], [2, 4, 6, 8, 10]], height: [320, 300], xLabelBelow: true, axisLabels: ["time / ms", "speed / mm s⁻¹"],
    curves: [{ expr: vf, colour: "a1" }], marks: [{ y: vmm, label: `terminal velocity ${r(vmm, 1)} mm s⁻¹` }],
    checks: [{ type: "value", expr: vf, x: 6, between: [0.99 * vmm, vmm], name: "the speed levels off at the terminal velocity" }, { type: "point", expr: `2*0.001^2*${rs - rf}*${g}/(9*${eta})*1000+0*x`, x: 0, y: r(vmm, 8), name: `Stokes: v_t = ${r(vmm, 2)} mm s⁻¹` }],
  }); }

// u04-32 a 4-rope pulley: MA, VR and efficiency
{ const load = 800, effort = 250, VR = 4, MA = load / effort, eff = MA / VR, Win = effort * VR, Wout = load;
  mk("u04-32", "phys-u04-pulley-efficiency", "sankey", {
    title: "Energy through a pulley system",
    caption: `With 4 supporting ropes the effort moves 4 m for every 1 m the load rises (VR = ${VR}). MA = ${load} / ${effort} = ${MA}, so efficiency = MA/VR = ${Math.round(eff * 100)}%: of ${Win} J put in per metre of lift, ${Wout} J raises the load.`,
    alt: "Energy flow diagram: 1000 joules of work in, 800 joules raising the load and 200 joules wasted.",
    description: [`Per metre the load rises: work in = ${effort} N × ${VR} m = ${Win} J.`, `Useful work = ${load} N × 1 m = ${Wout} J.`, `Wasted: ${Win - Wout} J, against friction and in lifting the lower pulley block.`, `Efficiency ${Wout} / ${Win} = ${Math.round(eff * 100)}% = MA / VR = ${MA} / ${VR}.`],
    units: "J", input: { label: "work done by effort", value: Win }, outputs: [{ label: "raising the load", value: Wout, useful: true }, { label: "friction, pulley block", value: Win - Wout }], efficiency: eff,
  }); }
