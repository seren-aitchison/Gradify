// Unit 5, Rotational Mechanics. Numbers are computed once here from the lesson's own data.
// Run: node scripts/diagrams/physics/u05.mjs
import { mk } from "./spec.mjs";

const r1 = (x, d = 1) => +x.toFixed(d);
const rad = (d) => (d * Math.PI) / 180;
const g = 9.8;

// u05-01 Angular motion: the fan
{
  const rpm = 1200, T = 4.0, w = (rpm * 2 * Math.PI) / 60, al = w / T, th = 0.5 * al * T * T, turns = th / (2 * Math.PI);
  mk("u05-01", "phys-u05-fan-spin-up", "motion", {
    title: "A fan speeding up to 1200 rpm",
    caption: `Starting from rest, the fan reaches ${rpm} rpm = ${r1(w, 0)} rad s⁻¹ in ${T} s, so α = ${r1(w, 0)}/${T} = ${r1(al, 1)} rad s⁻². The angle turned, θ = ½αt² = ${r1(th, 0)} rad, is the area under the ω–t line: ${r1(turns, 0)} turns. (Constant angular acceleration follows the same graphs as constant linear acceleration, with θ, ω, α in place of x, v, a.)`,
    alt: `Angular velocity rising linearly from 0 to ${r1(w, 0)} radians per second in 4 seconds and angle growing as a parabola to ${r1(th, 0)} radians.`,
    description: [
      `Angle θ and angular velocity ω against time for constant α = ${r1(al, 1)} rad s⁻².`,
      `ω rises in a straight line from 0 to ${r1(w, 0)} rad s⁻¹ (1200 rpm) at t = ${T} s.`,
      `θ grows as ½αt², reaching ${r1(th, 0)} rad = ${r1(turns, 0)} turns: the area of the triangle under the ω–t line.`,
    ],
    u: 0, segments: [{ dt: T, a: al }], show: ["x", "v"], units: { x: "rad", v: "rad s^{-1}", a: "rad s^{-2}" },
    claims: [{ type: "v", t: T, value: r1(w, 2) }, { type: "a", t: 2, value: r1(al, 2) }, { type: "x", t: T, value: r1(th, 1), name: `the fan turns ${r1(th, 0)} rad (${r1(turns, 0)} turns) in 4.0 s` }],
  });
}

// u05-03 Torque: 30 N at 60 degrees to the 0.25 m spanner
{
  const F = 30, r = 0.25, th = 60, Fp = F * Math.sin(rad(th)), Fa = F * Math.cos(rad(th)), tau = r * Fp;
  mk("u05-03", "phys-u05-spanner-torque", "vectors", {
    title: "Only the perpendicular part turns the nut",
    caption: `The ${F} N push at ${th}° to the handle splits into ${r1(Fa)} N along the handle, which cannot turn the nut, and ${r1(Fp)} N perpendicular to it. The torque is τ = r × F sin θ = ${r} × ${r1(Fp)} = ${r1(tau, 1)} N m. (The handle lies along the horizontal axis here.)`,
    alt: `A ${F} newton force at ${th} degrees to the handle resolved into ${r1(Fa)} newtons along the handle and ${r1(Fp)} newtons perpendicular to it.`,
    description: [
      `Take the spanner handle along the horizontal; the force F = ${F} N makes ${th}° with it.`,
      `Along the handle: F cos ${th}° = ${r1(Fa)} N, which pushes or pulls on the pivot and produces no torque.`,
      `Perpendicular: F sin ${th}° = ${r1(Fp)} N, the part that turns the nut.`,
      `τ = r × F sin θ = ${r} m × ${r1(Fp)} N = ${r1(tau, 1)} N m.`,
    ],
    mode: "resolve", units: "N",
    vectors: [{ label: "F", mag: F, angle: th, text: `${F} N at ${th}° to the handle`, comps: [r1(Fa, 2), r1(Fp, 2)], compLabels: [`${r1(Fa)} N along handle`, `${r1(Fp)} N perpendicular`] }],
    notes: [`τ = r F sin θ = ${r} × ${F} × sin ${th}° = ${r1(tau, 1)} N m`],
  });
}

// u05-08 Rotational dynamics: the hanging 2.0 kg mass
{
  const m = 2.0, M = 4.0, a = (m * g) / (m + M / 2), T = 0.5 * M * a, W = m * g, net = W - T;
  mk("u05-08", "phys-u05-hanging-mass-cylinder", "vectors", {
    title: "The hanging mass pulling the cylinder",
    caption: `The ${m} kg mass falls with a = mg/(m + M/2) = ${W}/${m + M / 2} = ${a} m s⁻². The string tension, T = ½Ma = ${T} N, is less than the weight ${r1(W, 1)} N because the cylinder (moment of inertia ½MR²) has to be spun up too: the net force ${r1(net, 1)} N = ma.`,
    alt: `Free-body diagram of the hanging mass: weight ${r1(W, 1)} newtons down, tension ${T} newtons up, net ${r1(net, 1)} newtons down.`,
    description: [
      `Weight of the hanging mass: ${m} × ${g} = ${r1(W, 1)} N, down.`,
      `The string tension T = ½Ma = ½ × ${M} × ${a} = ${T} N acts up on it (and exerts a torque TR on the cylinder).`,
      `Net force ${r1(W, 1)} − ${T} = ${r1(net, 1)} N down = ma = ${m} × ${a}.`,
    ],
    mode: "body", units: "N", showResultant: true,
    vectors: [{ label: "mg", mag: r1(W, 2), angle: 270, source: "Earth's gravity", text: `${r1(W, 1)} N, down` }, { label: "T", mag: T, angle: 90, colour: "a4", source: "the string", text: `${T} N, up` }],
    resultant: { label: "net force", mag: r1(net, 2), angle: 270, text: `${r1(net, 1)} N down, so a = ${a} m s^{-2}` },
  });
}

// u05-09 Rolling without slipping: a solid ball down a 1.0 m ramp, per kilogram
{
  const h = 1.0, PE = g * h, I = 2 / 5, trans = PE / (1 + I), rot = PE - trans, v = Math.sqrt(2 * trans), vslide = Math.sqrt(2 * PE);
  mk("u05-09", "phys-u05-rolling-ball-energy", "sankey", {
    title: "Where a rolling ball's energy goes",
    caption: `Per kilogram, a solid ball (I = ⅖mR²) falling ${h} m releases ${PE} J kg⁻¹. Because it also spins, only ${r1(trans, 1)} of that becomes translational kinetic energy and ${r1(rot, 1)} becomes rotational: v = √(2 × ${r1(trans, 1)}) = ${r1(v, 1)} m s⁻¹, slower than the ${r1(vslide, 1)} m s⁻¹ of a frictionless sliding block.`,
    alt: `Energy flow per kilogram: ${PE} joules of potential energy splits into ${r1(trans, 1)} translational and ${r1(rot, 1)} rotational kinetic energy.`,
    description: [
      `Potential energy released per kilogram: gh = ${g} × ${h} = ${PE} J kg⁻¹.`,
      `For rolling without slipping ½mv² : ½Iω² = 1 : ⅖, so the translational share is 1/1.4 = 5/7 = ${r1(trans, 1)} J kg⁻¹.`,
      `The rotational share is 2/7 = ${r1(rot, 1)} J kg⁻¹. Then v = √(2 × ${r1(trans, 1)}) = ${r1(v, 1)} m s⁻¹.`,
    ],
    units: "J kg^{-1}", input: { label: "potential energy", value: PE },
    outputs: [{ label: "translational KE", value: r1(trans, 3), useful: true }, { label: "rotational KE", value: r1(rot, 3) }],
  });
}

// u05-10 Rotational equilibrium: the ladder against a smooth wall
{
  const W = 200, L = 5, th = 60, R = (W * (L / 2) * Math.cos(rad(th))) / (L * Math.sin(rad(th))), mu = R / W;
  mk("u05-10", "phys-u05-ladder-forces", "vectors", {
    title: "Forces on the ladder",
    caption: `The ${L} m, ${W} N ladder at ${th}° rests against a smooth wall. Moments about the foot: R × ${L} sin ${th}° = ${W} × ${L / 2} cos ${th}°, so the wall force R = ${r1(R, 1)} N. The floor must supply the same ${r1(R, 1)} N as friction (and N = ${W} N), so μ ≥ ${r1(R, 1)}/${W} = ${r1(mu, 2)}.`,
    alt: `Four forces on a ladder in equilibrium: weight ${W} newtons down, floor normal force ${W} up, wall force ${r1(R, 1)} newtons horizontal and floor friction ${r1(R, 1)} newtons the other way.`,
    description: [
      `Vertical forces: weight ${W} N down, floor normal force N = ${W} N up.`,
      `Horizontal forces: the smooth wall pushes the ladder away from itself with R, and friction f at the floor pushes back.`,
      `Moments about the foot: R × ${L} sin ${th}° = ${W} × ${L / 2} cos ${th}°, giving R = ${r1(R, 1)} N = f.`,
      `The floor must supply f = ${r1(R, 1)} N out of at most μN, so μ ≥ ${r1(mu, 2)}.`,
    ],
    mode: "body", units: "N", showResultant: true,
    vectors: [{ label: "W", mag: W, angle: 270, source: "Earth's gravity", text: `${W} N, down` }, { label: "N", mag: W, angle: 90, colour: "a4", source: "the floor", text: `${W} N, up` }, { label: "R", mag: r1(R, 2), angle: 180, colour: "a3", source: "the smooth wall", text: `${r1(R, 1)} N, away from the wall` }, { label: "f", mag: r1(R, 2), angle: 0, colour: "a2", source: "friction at the floor", text: `${r1(R, 1)} N, towards the wall` }],
    resultant: { label: "net force", mag: 0 },
  });
}

// u05-20 Coupled translation and rotation: the bowling ball
{
  const u = 8.0, mu = 0.1, a = mu * g, alR = 2.5 * mu * g, t = u / (a + alR), v = u - a * t;
  mk("u05-20", "phys-u05-bowling-ball-rolling", "graph", {
    title: "A bowling ball starts to roll",
    caption: `Launched at ${u} m s⁻¹ with no spin, kinetic friction (μₖ = ${mu}) slows the ball at μg = ${r1(a, 2)} m s⁻² and spins it up so that ωR grows at 5μg/2 = ${r1(alR, 2)} m s⁻². Rolling without slipping begins when v = ωR, at t = ${r1(t, 1)} s and v = (5/7) × ${u} = ${r1(v, 1)} m s⁻¹. After that, friction no longer acts and the speed stays constant.`,
    alt: `Graph of the ball's speed falling linearly and the rim speed ωR rising linearly from zero; they meet at ${r1(t, 1)} seconds at ${r1(v, 1)} metres per second.`,
    description: [
      "Horizontal axis: time in seconds. Two speeds are plotted: the ball's centre speed v and the rim speed ωR.",
      `v falls at μg = ${r1(a, 2)} m s⁻² from ${u} m s⁻¹; ωR rises from 0 at 5μg/2 = ${r1(alR, 2)} m s⁻².`,
      `The ball slips while v > ωR. The lines meet at t = ${r1(t, 1)} s, v = ${r1(v, 1)} m s⁻¹: from here it rolls without slipping.`,
    ],
    range: { x: [0, 3.2], y: [0, 9] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3], [2, 4, 6, 8]], grid: [0.5, 2], height: [340, 320], xLabelBelow: true,
    axisLabels: ["time / s", "speed / m s⁻¹"],
    curves: [{ expr: `${u}-${a}*x`, colour: "a1", domain: [0, t], label: "v (centre)", labelAt: [0.2, 7.2] }, { expr: `${alR}*x`, colour: "a2", domain: [0, t], label: "ωR (rim)", labelAt: [0.3, 1.6] }, { expr: `${v}`, colour: "a1", dash: "6 5", domain: [t, 3.2], label: "rolling", labelAt: [2.6, 6.2] }],
    points: [{ x: t, y: v, label: "rolls at 2.3 s, 5.7 m/s", dx: 10, dy: 22 }],
    checks: [{ type: "intersect", a: `${u}-${a}*x`, b: `${alR}*x`, x: t, y: v, name: "v = ωR at t = 2.3 s" }, { type: "value", expr: `5*${u}/7`, x: 0, between: [5.7, 5.72], name: "the rolling speed is (5/7)u = 5.7 m/s" }],
  });
}
