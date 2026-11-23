// Unit 4, Classical Mechanics. Numbers are computed once here from the lesson's own data.
// Run: node scripts/diagrams/physics/u04.mjs
import { mk } from "./spec.mjs";

const r1 = (x, d = 1) => +x.toFixed(d);
const rad = (d) => (d * Math.PI) / 180, deg = (r) => (r * 180) / Math.PI;
const g = 9.8;

// u04-02 Speed and velocity: the cyclist's out-and-back trip
{
  const d = 10, v1 = 20, v2 = 30, t1 = d / v1, t2 = d / v2, T = t1 + t2, avg = (2 * d) / T;
  mk("u04-02", "phys-u04-cyclist-average-speed", "graph", {
    title: "Out at 20, back at 30 km h⁻¹",
    caption: `The cyclist rides ${d} km out at ${v1} km h⁻¹ (${t1} h) and back at ${v2} km h⁻¹ (${r1(t2, 3)} h). The return leg is shorter in time, so the trip takes ${r1(T, 3)} h for ${2 * d} km: average speed ${avg} km h⁻¹, not the 25 km h⁻¹ of averaging the speeds. The average velocity over the round trip is zero.`,
    alt: `Position-time graph: a line rising to 10 km in 0.5 hours, then falling back to 0 at 0.833 hours with a steeper slope.`,
    description: [
      "Position in km from the start against time in hours.",
      `Out: slope ${v1} km h⁻¹ reaches ${d} km at t = ${t1} h.`,
      `Back: slope −${v2} km h⁻¹ (steeper) returns to the start at t = ${r1(T, 3)} h.`,
      `Total distance ${2 * d} km in ${r1(T, 3)} h: average speed ${avg} km h⁻¹. Displacement is 0, so the average velocity is 0.`,
    ],
    range: { x: [0, 0.95], y: [0, 12] }, ticks: [[0.2, 0.4, 0.6, 0.8], [2, 4, 6, 8, 10]], grid: [0.2, 2], height: [340, 320], xLabelBelow: true,
    axisLabels: ["time / h", "position / km"],
    curves: [{ expr: `${v1}*x`, colour: "a1", domain: [0, t1], label: "out: 20 km/h", labelAt: [0.08, 7] }, { expr: `${d}-${v2}*(x-${t1})`, colour: "a2", domain: [t1, T], label: "back: 30 km/h", labelAt: [0.66, 7.2] }],
    points: [{ x: t1, y: d, label: "10 km at 0.5 h", dx: -10, dy: -12, anchor: "end" }, { x: T, y: 0, label: "0.833 h", dx: -6, dy: -14, anchor: "end" }],
    checks: [{ type: "point", expr: `${v1}*x`, x: t1, y: d, name: "10 km is reached after 0.5 h at 20 km/h" }, { type: "point", expr: `${d}-${v2}*(x-${t1})`, x: T, y: 0, name: "the cyclist is home after 0.833 h" }, { type: "value", expr: `${2 * d}/(${t1}+${r1(t2, 6)})`, x: 0, between: [avg - 0.01, avg + 0.01], name: "average speed = 20 km ÷ 0.833 h = 24 km/h" }],
  });
}

// u04-03 Acceleration: the braking car
{
  const u = 30, T = 5, a = -u / T, s = (u * T) / 2;
  mk("u04-03", "phys-u04-braking-car", "motion", {
    title: "A car braking from 30 m s⁻¹",
    caption: `The car slows from ${u} m s⁻¹ to rest in ${T} s: a = (0 − ${u})/${T} = ${a} m s⁻². The v–t graph is a straight line with gradient ${a}; the area under it, ${s} m, is the distance travelled while stopping. The negative sign means the acceleration points opposite to the motion.`,
    alt: `Velocity–time graph falling linearly from 30 to 0 metres per second in 5 seconds, with a constant acceleration of −6 metres per second squared.`,
    description: [
      "Velocity falls in a straight line from 30 m s⁻¹ at t = 0 to 0 at t = 5.0 s.",
      `The gradient is the acceleration: (0 − ${u})/${T} = ${a} m s⁻², drawn as a constant (horizontal) line on the a–t graph.`,
      `The area under the v–t line is ½ × ${u} × ${T} = ${s} m, the stopping distance.`,
    ],
    u, segments: [{ dt: T, a }], show: ["v", "a"],
    claims: [{ type: "v", t: T, value: 0 }, { type: "a", t: 2, value: a }, { type: "displacement", from: 0, to: T, value: s, shade: true }],
  });
}

// u04-04 One dimension: v = 6 − 2t
{
  const u = 6, a = -2, T = 5, xT = u * T + 0.5 * a * T * T, tr = 3, xr = u * tr + 0.5 * a * tr * tr, dist = xr + (xr - xT);
  mk("u04-04", "phys-u04-reversing-motion", "motion", {
    title: "Displacement and distance with a reversal",
    caption: `With v = 6 − 2t the object moves forward until t = ${tr} s (x = ${xr} m) then reverses. Displacement over 0–${T} s is the net area under the v–t line, ${xT} m (positive area 9 m minus negative area 4 m); distance is the total area, ${dist} m.`,
    alt: `Position and velocity against time: velocity falls from 6 metres per second through zero at 3 seconds to −4 at 5 seconds; position rises to 9 metres then falls to 5 metres.`,
    description: [
      "Velocity falls steadily from 6 m s⁻¹ with gradient −2 m s⁻²; it is zero at t = 3 s and −4 m s⁻¹ at t = 5 s.",
      `Position x = 6t − t² rises to ${xr} m at t = ${tr} s, then falls back to ${xT} m at t = ${T} s.`,
      `Displacement = ${xr} − 4 = ${xT} m (areas above and below the axis subtract); distance = ${xr} + 4 = ${dist} m (they add).`,
    ],
    u, segments: [{ dt: T, a }], show: ["x", "v"],
    claims: [{ type: "x", t: tr, value: xr }, { type: "x", t: T, value: xT }, { type: "displacement", from: 0, to: T, value: xT }, { type: "distance", from: 0, to: T, value: dist }],
  });
}

// u04-06 Kinematic equations: stopping distance
{
  const u = 25, a = -5, T = u / -a, s = (u * u) / (2 * -a);
  mk("u04-06", "phys-u04-stopping-distance", "motion", {
    title: "Stopping from 25 m s⁻¹",
    caption: `Braking at ${-a} m s⁻² takes t = ${T} s. Using v² = u² + 2as with v = 0: s = ${u}²/(2 × ${-a}) = ${s} m. This is the area of the triangle under the v–t line, ½ × ${u} × ${T}.`,
    alt: `Velocity–time and position–time graphs of a car braking from 25 metres per second to rest in 5 seconds, stopping after 62.5 metres.`,
    description: [
      `Velocity falls from ${u} m s⁻¹ at ${-a} m s⁻² and reaches 0 at t = ${T} s.`,
      `Position rises with a flattening slope and levels off at ${s} m: the car has stopped.`,
      `Check without time: v² = u² + 2as gives 0 = ${u * u} − 2 × ${-a} × s, so s = ${s} m, the same as ½ × ${u} × ${T}.`,
    ],
    u, segments: [{ dt: T, a }], show: ["x", "v"],
    claims: [{ type: "v", t: T, value: 0 }, { type: "x", t: T, value: s }, { type: "displacement", from: 0, to: T, value: s, shade: true }],
  });
}

// u04-07 Projectile motion: 20 m/s at 30 degrees
{
  const u = 20, th = 30, c = Math.cos(rad(th)), s = Math.sin(rad(th)), R = (u * u * Math.sin(rad(2 * th))) / g, H = (u * s) ** 2 / (2 * g);
  const k = g / (2 * u * u * c * c), tn = Math.tan(rad(th)), expr = `${tn}*x-${k}*x^2`;
  mk("u04-07", "phys-u04-projectile-path", "graph", {
    title: "The kicked ball's path",
    caption: `Kicked at ${u} m s⁻¹ at ${th}° (g = ${g}), the ball follows a parabola: R = u² sin 2θ/g = ${r1(R)} m (the lesson rounds to 35 m) and maximum height H = (u sin θ)²/2g = ${r1(H)} m, reached halfway along at x = ${r1(R / 2)} m.`,
    alt: `Parabolic path from the origin rising to ${r1(H)} metres at ${r1(R / 2)} metres along and landing ${r1(R)} metres away.`,
    description: [
      `Horizontal distance x against height y for a launch speed of ${u} m s⁻¹ at ${th}° above the horizontal.`,
      `The horizontal velocity ${r1(u * c, 2)} m s⁻¹ is constant; the vertical velocity ${r1(u * s)} m s⁻¹ is reduced by g.`,
      `The path peaks at H = ${r1(H)} m, halfway along, and returns to the ground at R = ${r1(R)} m.`,
    ],
    range: { x: [0, 38], y: [0, 7] }, ticks: [[5, 10, 15, 20, 25, 30, 35], [1, 2, 3, 4, 5, 6]], grid: [5, 1], height: [320, 300], xLabelBelow: true,
    axisLabels: ["horizontal distance x / m", "height y / m"],
    curves: [{ expr, colour: "a1", label: "launch 20 m/s at 30°", labelAt: [2, 5.8] }],
    points: [{ x: R / 2, y: H, label: "H = 5.1 m", dx: 0, dy: -14, anchor: "middle" }, { x: R, y: 0, label: "R = 35.3 m", dx: -6, dy: -14, anchor: "end" }],
    checks: [{ type: "max", expr, domain: [0, R], x: R / 2, y: H, name: "the maximum height is 5.1 m at half the range" }, { type: "point", expr, x: R, y: 0, name: "the ball lands at R = 35.3 m" }],
  });
}

// u04-08 Relative motion: the swimmer
{
  const vs = 1.5, vr = 0.9, w = 60, t = w / vs, drift = vr * t, v = Math.hypot(vs, vr), ang = deg(Math.atan2(vr, vs));
  mk("u04-08", "phys-u04-swimmer-river", "vectors", {
    title: "The swimmer aimed straight across",
    caption: `Swimming at ${vs} m s⁻¹ straight across, the swimmer crosses ${w} m in ${t} s, since the current does not change the across-component. In that time the ${vr} m s⁻¹ current carries her ${drift} m downstream. Her velocity over the ground is √(${vs}² + ${vr}²) = ${r1(v, 2)} m s⁻¹, at ${r1(ang)}° from straight across.`,
    alt: `Velocity triangle: ${vs} metres per second across the river, ${vr} downstream, resultant ${r1(v, 2)} at ${r1(ang)} degrees from the line straight across.`,
    description: [
      `Her velocity relative to the water, ${vs} m s⁻¹, points straight across the river (drawn upward).`,
      `The river's velocity relative to the bank, ${vr} m s⁻¹, is added tip to tail, downstream.`,
      `Resultant: ${r1(v, 2)} m s⁻¹ at ${r1(ang)}° from the across direction. Crossing time = ${w}/${vs} = ${t} s, drift = ${vr} × ${t} = ${drift} m.`,
    ],
    mode: "add", units: "m s^{-1}",
    vectors: [{ label: "v_{swimmer}", mag: vs, angle: 90, text: `${vs} m s^{-1}, across`, comps: [0, vs] }, { label: "v_{river}", mag: vr, angle: 0, colour: "a4", text: `${vr} m s^{-1}, downstream`, comps: [vr, 0] }],
    resultant: { label: "v", mag: r1(v, 3), angle: r1(90 - ang, 2), text: `${r1(v, 2)} m s^{-1}, ${r1(ang)}° from across` },
    notes: [`time = 60/1.5 = ${t} s`, `drift = 0.9 × ${t} = ${drift} m downstream`],
    claims: [{ type: "angleBetween", a: "v_{swimmer}", b: "v", value: r1(ang, 1), name: `the swimmer's path is ${r1(ang)}° from straight across` }],
  });
}

// u04-10 Newton's laws: the 2.0 kg block
{
  const m = 2.0, P = 10, f = 4.0, net = P - f, a = net / m;
  mk("u04-10", "phys-u04-block-forces", "vectors", {
    title: "Forces on the 2.0 kg block",
    caption: `Vertically the weight ${r1(m * g, 1)} N and the normal force cancel. Horizontally the ${P} N pull is opposed by ${f} N of friction, leaving ΣF = ${net} N and a = ΣF/m = ${net}/${m} = ${a} m s⁻².`,
    alt: `Free-body diagram of a block: weight ${r1(m * g)} N down, normal force ${r1(m * g)} N up, pull ${P} N right, friction ${f} N left, net force ${net} N to the right.`,
    description: [
      `The block is a box. Weight mg = ${m} × ${g} = ${r1(m * g, 1)} N acts down; the surface pushes up with an equal normal force, so there is no vertical acceleration.`,
      `The ${P} N pull acts to the right and ${f} N of friction to the left.`,
      `Net force ${P} − ${f} = ${net} N to the right, so a = ${net}/${m} = ${a} m s⁻².`,
    ],
    mode: "body", units: "N", showResultant: true,
    vectors: [{ label: "W", mag: r1(m * g, 2), angle: 270, source: "Earth's gravity", text: `${r1(m * g, 1)} N, down` }, { label: "N", mag: r1(m * g, 2), angle: 90, colour: "a4", source: "the surface", text: `${r1(m * g, 1)} N, up` }, { label: "P", mag: P, angle: 0, colour: "a3", source: "the applied pull", text: `${P} N, right` }, { label: "f", mag: f, angle: 180, colour: "a2", source: "friction with the surface", text: `${f} N, left` }],
    resultant: { label: "net force", mag: net, angle: 0, text: `${net} N right, so a = ${a} m s^{-2}` },
  });
}

// u04-11 Non-inertial frames: scales in a lift
{
  const m = 60, a = 2.0, W = m * g, R = m * (g + a), net = m * a;
  mk("u04-11", "phys-u04-lift-scales", "vectors", {
    title: "Scales in an accelerating lift",
    caption: `In the ground frame, Newton's second law gives R − mg = ma, so the scales push up with R = ${m}(${g} + ${a}) = ${R} N: ${r1(R - W)} N more than the ${W} N weight. In the lift's own (non-inertial) frame the same ${net} N appears as a fictitious downward force ma.`,
    alt: `Free-body diagram of a person in a lift: weight ${W} newtons down, scales force ${R} newtons up, net ${net} newtons upward.`,
    description: [
      `Weight mg = ${m} × ${g} = ${W} N acts down.`,
      `The scales' reaction R = ${R} N acts up.`,
      `The net force ${R} − ${W} = ${net} N upward equals ma = ${m} × ${a}: the person accelerates upward with the lift.`,
    ],
    mode: "body", units: "N", showResultant: true,
    vectors: [{ label: "W", mag: W, angle: 270, source: "Earth's gravity", text: `${W} N, down` }, { label: "R", mag: R, angle: 90, colour: "a4", source: "the scales", text: `${R} N, up (the reading)` }],
    resultant: { label: "net force", mag: net, angle: 90, text: `${net} N up = ma` },
  });
}

// u04-13 Normal force and tension: Atwood machine, the 3.0 kg mass
{
  const m1 = 3.0, m2 = 2.0, a = ((m1 - m2) * g) / (m1 + m2), T = (2 * m1 * m2 * g) / (m1 + m2), W = m1 * g, net = W - T;
  mk("u04-13", "phys-u04-atwood-3kg", "vectors", {
    title: "The 3.0 kg mass of the Atwood machine",
    caption: `The heavier mass has weight ${r1(W, 1)} N but the rope pulls up with only T = ${r1(T, 1)} N, so the net force ${r1(net, 2)} N downward gives a = ${r1(net, 2)}/${m1} = ${a} m s⁻². The same tension pulls the 2.0 kg mass up with ${r1(T, 1)} N against its ${r1(m2 * g, 1)} N weight, accelerating it upward at ${a} m s⁻².`,
    alt: `Free-body diagram of the 3.0 kg mass: weight ${r1(W, 1)} newtons down, tension ${r1(T, 1)} newtons up, net ${r1(net, 2)} newtons down.`,
    description: [
      `Weight of the 3.0 kg mass: ${m1} × ${g} = ${r1(W, 1)} N, down.`,
      `Tension: T = 2m₁m₂g/(m₁ + m₂) = ${r1(T, 1)} N, up. T is less than the weight because the mass is accelerating downward.`,
      `Net force ${r1(W, 1)} − ${r1(T, 1)} = ${r1(net, 2)} N down, equal to m₁a = ${m1} × ${a}.`,
    ],
    mode: "body", units: "N", showResultant: true,
    vectors: [{ label: "W", mag: r1(W, 2), angle: 270, source: "Earth's gravity", text: `${r1(W, 1)} N, down` }, { label: "T", mag: r1(T, 2), angle: 90, colour: "a4", source: "the rope", text: `${r1(T, 1)} N, up` }],
    resultant: { label: "net force", mag: r1(net, 2), angle: 270, text: `${r1(net, 2)} N down, so a = ${a} m s^{-2}` },
  });
}

// u04-14 Friction and drag: the 20 kg box
{
  const m = 20, ms = 0.5, mk_ = 0.4, Fs = ms * m * g, Fk = mk_ * m * g;
  mk("u04-14", "phys-u04-static-kinetic-friction", "graph", {
    title: "Friction on the 20 kg box",
    caption: `While the box is at rest the friction equals the applied force, up to the static maximum μₛmg = ${Fs} N. Once it moves, friction drops to the kinetic value μₖmg = ${r1(Fk, 1)} N, so a push of ${r1(Fk, 1)} N keeps it moving at constant speed but ${Fs} N is needed to start it.`,
    alt: `Graph of friction against applied force: a line of gradient 1 up to ${Fs} newtons, then a drop to a flat ${r1(Fk, 1)} newtons.`,
    description: [
      "Horizontal axis: the applied horizontal force; vertical axis: the friction force that opposes it.",
      `Static friction rises one-for-one with the push up to a maximum μₛmg = ${ms} × ${m} × ${g} = ${Fs} N.`,
      `At that point the box starts to slide and friction drops to μₖmg = ${mk_} × ${m} × ${g} = ${r1(Fk, 1)} N, which stays constant.`,
    ],
    range: { x: [0, 150], y: [0, 120] }, ticks: [[25, 50, 75, 100, 125, 150], [20, 40, 60, 80, 100]], grid: [25, 20], height: [340, 320], xLabelBelow: true,
    axisLabels: ["applied force / N", "friction force / N"],
    curves: [{ expr: "x", colour: "a1", domain: [0, Fs], label: "static: f = F", labelAt: [8, 52] }, { expr: `${Fk}`, colour: "a2", domain: [Fs, 150], label: "kinetic: 78.4 N", labelAt: [105, 70] }],
    points: [{ x: Fs, y: Fs, label: "start: 98 N", dx: -8, dy: -12, anchor: "end" }, { x: Fs, y: Fk, colour: "a2" }],
    checks: [{ type: "point", expr: "x", x: Fs, y: Fs, name: "static friction peaks at μₛmg = 98 N" }, { type: "point", expr: `${Fk}`, x: 120, y: Fk, name: "kinetic friction is μₖmg = 78.4 N" }, { type: "value", expr: `${mk_}*${m}*${g}`, x: 0, between: [Fk - 0.01, Fk + 0.01], name: "0.4 × 20 × 9.8 = 78.4 N" }],
  });
}

// u04-15 Inclined planes: the block on the 30 degree slope, forces per kilogram
{
  const th = 30, mu = 0.2, Nn = g * Math.cos(rad(th)), fr = mu * Nn, a = g * (Math.sin(rad(th)) - mu * Math.cos(rad(th))), v = Math.sqrt(2 * a * 4);
  mk("u04-15", "phys-u04-slope-forces", "vectors", {
    title: "Forces per kilogram on the slope",
    caption: `Drawn per kilogram of block (so N is in N kg⁻¹, the same as m s⁻²), on a ${th}° slope with μₖ = ${mu}. Along the slope, g sin ${th}° = ${r1(g * Math.sin(rad(th)), 2)} down is opposed by friction μg cos ${th}° = ${r1(fr, 2)}, leaving a = ${r1(a, 1)} m s⁻². After 4.0 m: v = √(2 × ${r1(a, 1)} × 4.0) = ${r1(v, 1)} m s⁻¹.`,
    alt: `Forces on a block on a 30 degree slope, per kilogram: weight 9.8 down, normal force ${r1(Nn, 2)} perpendicular to the slope, friction ${r1(fr, 2)} up the slope, net ${r1(a, 1)} down the slope.`,
    description: [
      `Weight: g = ${g} N kg⁻¹ straight down.`,
      `Normal force: g cos ${th}° = ${r1(Nn, 2)} N kg⁻¹ perpendicular to the slope.`,
      `Friction: μₖN = ${mu} × ${r1(Nn, 2)} = ${r1(fr, 2)} N kg⁻¹ up the slope.`,
      `Net: ${r1(a, 2)} N kg⁻¹ down the slope, so a = ${r1(a, 1)} m s⁻² and v = ${r1(v, 1)} m s⁻¹ after 4.0 m.`,
    ],
    mode: "body", units: "N kg^{-1}", showResultant: true,
    vectors: [{ label: "W", mag: g, angle: 270, source: "Earth's gravity", text: `${g} N/kg, down` }, { label: "N", mag: r1(Nn, 3), angle: 60, colour: "a4", source: "the slope", text: `${r1(Nn, 2)} N/kg, perpendicular to slope` }, { label: "f", mag: r1(fr, 3), angle: 150, colour: "a2", source: "friction with the slope", text: `${r1(fr, 2)} N/kg, up the slope` }],
    resultant: { label: "net force", mag: r1(a, 3), angle: 330, text: `${r1(a, 2)} N/kg down the slope = a` },
  });
}

// u04-17 Banked curve: forces per kilogram with no friction
{
  const th = 15, r = 100, N = g / Math.cos(rad(th)), net = g * Math.tan(rad(th)), v = Math.sqrt(r * net);
  mk("u04-17", "phys-u04-banked-curve", "vectors", {
    title: "A banked curve needs no friction",
    caption: `Per kilogram, on a ${th}° bank the normal force N = g/cos ${th}° = ${r1(N, 2)} N kg⁻¹ has a horizontal part g tan ${th}° = ${r1(net, 2)} that points to the centre and supplies v²/r. Setting v²/r = g tan θ gives v = √(${r} × ${g} × ${r1(Math.tan(rad(th)), 3)}) = ${r1(v)} m s⁻¹ (58 km h⁻¹). The car is drawn with the centre of the curve to the left.`,
    alt: `Forces per kilogram on a car on a banked curve: weight 9.8 down, normal force ${r1(N, 2)} tilted 15 degrees towards the centre, net ${r1(net, 2)} horizontal towards the centre.`,
    description: [
      `Weight: ${g} N kg⁻¹ down; no friction.`,
      `Normal force, perpendicular to the road, tilted ${th}° from vertical towards the centre of the curve: its vertical part cancels the weight, so N = g/cos ${th}° = ${r1(N, 2)} N kg⁻¹.`,
      `Its horizontal part g tan ${th}° = ${r1(net, 2)} N kg⁻¹ is the net force, pointing to the centre: it equals v²/r, so v = √(rg tan θ) = ${r1(v)} m s⁻¹.`,
    ],
    mode: "body", units: "N kg^{-1}", showResultant: true,
    vectors: [{ label: "W", mag: g, angle: 270, source: "Earth's gravity", text: `${g} N/kg, down` }, { label: "N", mag: r1(N, 3), angle: 90 + th, colour: "a4", source: "the banked road", text: `${r1(N, 2)} N/kg, ${th}° from vertical` }],
    resultant: { label: "net force", mag: r1(net, 3), angle: 180, text: `${r1(net, 2)} N/kg to the centre = v²/r` },
  });
}

// u04-19 Energy: the ball dropped from 20 m
{
  const m = 0.5, H = 20, v = Math.sqrt(2 * g * H), E = m * g * H;
  mk("u04-19", "phys-u04-energy-exchange", "graph", {
    title: "Potential energy turning into kinetic energy",
    caption: `A ${m} kg ball dropped from ${H} m starts with E = mgh = ${E} J of potential energy. As it falls, PE = mgh falls linearly with height and KE rises by the same amount, so their sum stays ${E} J. At the ground all ${E} J is kinetic: ½mv² = ${E} gives v = √(2gh) = ${r1(v, 1)} m s⁻¹.`,
    alt: `Graph of energy against height: potential energy rising linearly with height from 0 to 98 joules at 20 metres, kinetic energy falling linearly from 98 to 0, with a flat total of 98 joules.`,
    description: [
      `Horizontal axis: height above the ground (20 m at the start, so the ball moves from right to left); vertical axis: energy in joules.`,
      `Potential energy mgh = ${m} × ${g} × h rises from 0 at the ground to ${E} J at 20 m.`,
      `Kinetic energy is ${E} − mgh, the mirror image: ${E} J at the ground.`,
      `The total (dashed) is constant at ${E} J: v = √(2 × ${g} × ${H}) = ${r1(v, 1)} m s⁻¹.`,
    ],
    range: { x: [0, 21], y: [0, 112] }, ticks: [[5, 10, 15, 20], [20, 40, 60, 80, 100]], grid: [5, 20], height: [340, 320], xLabelBelow: true,
    axisLabels: ["height h / m", "energy / J"],
    curves: [{ expr: `${m * g}*x`, colour: "a1", label: "potential", labelAt: [14, 50] }, { expr: `${m * g}*(${H}-x)`, colour: "a2", label: "kinetic", labelAt: [3, 70] }, { expr: `${E}`, colour: "ink", dash: "6 5", width: 2, label: "total 98 J", labelAt: [8, 104] }],
    checks: [{ type: "point", expr: `${m * g}*x`, x: H, y: E, name: "the potential energy at 20 m is mgh = 98 J" }, { type: "point", expr: `${m * g}*(${H}-x)`, x: 0, y: E, name: "all 98 J is kinetic at the ground" }, { type: "value", expr: `sqrt(2*${g}*${H})`, x: 0, between: [19.79, 19.81], name: "v = √(2gh) = 19.8 m s⁻¹" }, { type: "point", expr: `${m * g}*x+${m * g}*(${H}-x)`, x: 7, y: E, name: "PE + KE is 98 J at every height" }],
  });
}

// u04-20 Non-conservative forces: the slope with friction
{
  const m = 2.0, d = 5.0, th = 30, f = 4.0, h = d * Math.sin(rad(th)), PE = m * g * h, Wf = f * d, KE = PE - Wf, v = Math.sqrt((2 * KE) / m);
  mk("u04-20", "phys-u04-slope-energy", "sankey", {
    title: "Energy of the block sliding down the slope",
    caption: `The ${m} kg block drops ${h} m, releasing mgh = ${PE} J. Friction (${f} N over ${d} m) takes ${Wf} J as heat, which cannot be recovered because friction is non-conservative. The remaining ${KE} J is kinetic: v = √(2 × ${KE}/${m}) = ${r1(v, 1)} m s⁻¹.`,
    alt: `Energy flow: ${PE} joules of gravitational potential energy splits into ${KE} joules of kinetic energy and ${Wf} joules of heat from friction.`,
    description: [
      `Height lost: ${d} × sin ${th}° = ${h} m, so mgh = ${m} × ${g} × ${h} = ${PE} J.`,
      `Work done against friction: ${f} × ${d} = ${Wf} J, dissipated as heat.`,
      `Kinetic energy at the bottom: ${PE} − ${Wf} = ${KE} J, giving v = ${r1(v, 1)} m s⁻¹.`,
    ],
    units: "J", input: { label: "potential energy released", value: PE },
    outputs: [{ label: "kinetic energy", value: KE, useful: true }, { label: "heat (friction)", value: Wf }],
  });
}

// u04-28 Variable-mass systems: the rocket equation
{
  const ue = 3000, m0 = 100, m1 = 25, dv = ue * Math.log(m0 / m1);
  mk("u04-28", "phys-u04-rocket-equation", "graph", {
    title: "Δv from burning fuel",
    caption: `The rocket equation Δv = u ln(m₀/m) gives the speed gained as the mass falls from ${m0} t. With exhaust speed u = ${ue} m s⁻¹, burning down to ${m1} t (a mass ratio of 4) gives Δv = ${ue} ln 4 = ${Math.round(dv / 10) * 10} m s⁻¹. The logarithm means each extra km s⁻¹ needs ever more fuel.`,
    alt: `Curve of velocity gain against remaining mass from 100 down to 20 tonnes, passing 4160 metres per second at 25 tonnes.`,
    description: [
      `Horizontal axis: rocket mass in tonnes, falling from ${m0} t on the right as fuel burns; vertical axis: Δv in m s⁻¹.`,
      `Δv = ${ue} ln(${m0}/m) is 0 at ${m0} t and rises more steeply as less mass remains.`,
      `At ${m1} t, the mass ratio is 4 and Δv = ${ue} ln 4 = ${Math.round(dv / 10) * 10} m s⁻¹ (no gravity).`,
    ],
    range: { x: [20, 105], y: [0, 5200] }, ticks: [[25, 50, 75, 100], [1000, 2000, 3000, 4000, 5000]], grid: [25, 1000], height: [340, 320], xLabelBelow: true,
    axisLabels: ["rocket mass m / t", "Δv / m s⁻¹"],
    curves: [{ expr: `${ue}*log(${m0}/x)`, colour: "a1", label: "Δv = u ln(m₀/m)", labelAt: [48, 2300] }],
    points: [{ x: m1, y: dv, label: "25 t: 4160 m/s", dx: 12, dy: -6 }],
    checks: [{ type: "point", expr: `${ue}*log(${m0}/x)`, x: m1, y: dv, name: "Δv at 25 t is 3000 ln 4 = 4159 m/s" }, { type: "point", expr: `${ue}*log(${m0}/x)`, x: m0, y: 0, name: "Δv is zero before any fuel burns" }],
  });
}

// u04-31 Statics: the beam with a person on it
{
  const L = 4.0, Wb = 200, Wp = 600, xp = 1.0, RR = (Wp * xp + Wb * (L / 2)) / L, RL = Wb + Wp - RR;
  mk("u04-31", "phys-u04-beam-supports", "vectors", {
    title: "Forces on the beam: equilibrium",
    caption: `The ${L} m, ${Wb} N beam has a ${Wp} N person ${xp} m from the left end. Taking moments about the left end: R_R × ${L} = ${Wp} × ${xp} + ${Wb} × ${L / 2}, so R_R = ${RR} N and R_L = ${Wb + Wp} − ${RR} = ${RL} N. The two upward supports balance the two downward loads, ${Wb + Wp} N each way, so there is no net force.`,
    alt: `Four vertical forces on the beam: supports of ${RL} and ${RR} newtons up, beam weight ${Wb} and person ${Wp} newtons down, summing to zero.`,
    description: [
      `Downward: the beam's weight ${Wb} N (at its centre, 2.0 m from the left end) and the person's ${Wp} N (1.0 m from the left end): ${Wb + Wp} N in all.`,
      `Moments about the left end give the right support: R_R = (${Wp} × ${xp} + ${Wb} × ${L / 2})/${L} = ${RR} N.`,
      `Forces balance: R_L = ${Wb + Wp} − ${RR} = ${RL} N.`,
      "The arrows are drawn from one point to show the force balance; their lines of action are what the moment equation uses.",
    ],
    mode: "body", units: "N", showResultant: true,
    vectors: [{ label: "R_{L}", mag: RL, angle: 90, colour: "a4", source: "left support", text: `${RL} N, up` }, { label: "R_{R}", mag: RR, angle: 90, colour: "a4", source: "right support", text: `${RR} N, up` }, { label: "W_{beam}", mag: Wb, angle: 270, source: "Earth's gravity on the beam", text: `${Wb} N, down` }, { label: "W_{person}", mag: Wp, angle: 270, source: "Earth's gravity on the person", text: `${Wp} N, down` }],
    resultant: { label: "net force", mag: 0 },
  });
}
