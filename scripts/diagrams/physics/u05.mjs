// Unit 5, Rotational Mechanics. Every number in a caption or claim is computed here once, from the lesson's own worked
// example. Run: node scripts/diagrams/physics/u05.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));
const g = 9.8;

// u05-01 a fan from rest to 1200 rpm in 4.0 s
{ const w = (1200 * 2 * Math.PI) / 60, t = 4, a = w / t, th = (w * t) / 2, turns = th / (2 * Math.PI), f = `${a}*x`;
  mk("u05-01", "phys-u05-fan-spin-up", "graph", {
    title: "Spinning up a fan",
    caption: `ω rises steadily from 0 to 1200 rpm = ${r(w, 1)} rad s⁻¹ in ${t.toFixed(1)} s, so α = ${r(a, 1)} rad s⁻². The area under the ω–t line is the angle turned, ${r(th, 0)} rad, which is ${r(turns, 0)} turns.`,
    alt: "Angular velocity against time rising in a straight line from zero to 126 radians per second at 4 seconds, with the area under it shaded.",
    description: [`1200 rpm = 1200 × 2π / 60 = ${r(w, 1)} rad s⁻¹.`, `α = ${r(w, 1)} / ${t} = ${r(a, 1)} rad s⁻² (the gradient).`, `Angle turned = ½ × ${t} × ${r(w, 1)} = ${r(th, 0)} rad (the area).`, `Turns = ${r(th, 0)} / 2π = ${r(turns, 0)}.`],
    range: { x: [0, 4.4], y: [0, 140] }, ticks: [[1, 2, 3, 4], [40, 80, 120]], height: [320, 300], xLabelBelow: true, axisLabels: ["time / s", "ω / rad s⁻¹"],
    areas: [{ expr: f, from: 0, to: t, colour: "a4", opacity: 0.18 }], curves: [{ expr: f, domain: [0, t], colour: "a1" }],
    points: [{ x: t, y: r(w, 3), colour: "a2", label: `${r(w, 1)} rad s⁻¹`, anchor: "end", dx: -10, dy: -10 }],
    checks: [{ type: "slope", expr: f, x: 2, value: r(a, 6), name: `α = ${r(a, 2)} rad s⁻²` }, { type: "area", expr: f, from: 0, to: t, value: r(th, 4), tol: 0.01, name: `${r(th, 1)} rad turned, ${r(turns, 1)} turns` }],
  }); }

// u05-03 torque on a spanner: 30 N on 0.25 m at 60°
{ const F = 30, d = 0.25, th = 60, tau = F * d * Math.sin((th * Math.PI) / 180), f = `${F * d}*sin(x*3.14159265/180)`;
  mk("u05-03", "phys-u05-torque-angle", "graph", {
    title: "Torque depends on the angle of the push",
    caption: `τ = rF sin θ. Pushing the ${d} m spanner with ${F} N at ${th}° to the handle gives τ = ${r(tau, 2)} N m; pushing at 90° gives the most, ${F * d} N m, and pushing along the handle gives none.`,
    alt: "Torque against the angle between force and spanner, a sine curve rising from zero to 7.5 newton metres at 90 degrees, with 6.5 marked at 60 degrees.",
    description: [`r = ${d} m, F = ${F} N, so rF = ${F * d} N m.`, `At ${th}°: τ = ${F * d} × sin ${th}° = ${r(tau, 2)} N m.`, "At 90° the whole force is perpendicular to the handle and the torque is greatest; at 0° and 180° it is zero."],
    range: { x: [0, 180], y: [0, 8.5] }, ticks: [[30, 60, 90, 120, 150, 180], [2, 4, 6, 8]], height: [320, 300], xLabelBelow: true, axisLabels: ["angle between force and handle / °", "torque / N m"],
    curves: [{ expr: f, colour: "a1" }], marks: [{ x: th, to: tau }],
    points: [{ x: th, y: r(tau, 4), colour: "a2", label: `${r(tau, 2)} N m`, anchor: "end", dx: -10, dy: -10 }, { x: 90, y: F * d, colour: "a4", label: `${F * d} N m`, dy: -12 }],
    checks: [{ type: "point", expr: f, x: th, y: r(tau, 5), name: `τ at ${th}° = ${r(tau, 2)} N m` }, { type: "max", expr: f, domain: [0, 180], x: 90, y: F * d, name: "greatest torque at 90°" }],
  }); }

// u05-08 a 2.0 kg mass unwinding from a 4.0 kg solid cylinder
{ const m = 2, M = 4, a = (m * g) / (m + M / 2), T = (M / 2) * a, W = m * g;
  mk("u05-08", "phys-u05-unwinding-mass", "vectors", {
    title: "A mass unwinding from a cylinder",
    caption: `The cylinder resists turning (I = ½MR²), so the string's tension holds the mass back. Solving mg − T = ma and TR = Iα with a = αR: a = mg / (m + M/2) = ${r(a, 2)} m s⁻² and T = ${r(T, 2)} N.`,
    alt: "Free-body diagram of the hanging 2 kilogram mass: tension 9.8 newtons up, weight 19.6 newtons down, net 9.8 newtons down.",
    description: [`For the mass: ${m} × ${g} − T = ${m}a.`, `For the cylinder: TR = ½MR² × a/R, so T = ½Ma = ${M / 2}a.`, `Adding: a = ${r(W, 1)} / ${m + M / 2} = ${r(a, 2)} m s⁻², T = ${r(T, 2)} N.`, `On the mass: ${r(T, 1)} N up, ${r(W, 1)} N down, net ${r(W - T, 1)} N down.`],
    mode: "body", units: "N",
    vectors: [{ label: "T", mag: r(T, 3), angle: 90, source: "the string" }, { label: "W", mag: r(W, 3), angle: 270, source: "Earth's gravity" }],
    resultant: { label: "net force", mag: r(W - T, 3), angle: 270 }, showResultant: true,
  }); }

// u05-09 a rolling race down a 1.0 m ramp: v = √(2gh / (1 + I/mR²))
{ const h = 1, shapes = [["sliding block", 0], ["solid sphere", 0.4], ["solid cylinder", 0.5], ["hoop", 1]], v = (k) => Math.sqrt((2 * g * h) / (1 + k));
  mk("u05-09", "phys-u05-rolling-race", "trend", {
    title: "Which reaches the bottom fastest?",
    caption: `Rolling from rest down ${h.toFixed(1)} m, part of the energy goes into spinning: v = √(2gh / (1 + I/mR²)). The solid ball reaches ${r(v(0.4), 2)} m s⁻¹; a hoop, with all its mass at the rim, only ${r(v(1), 2)}. A frictionless sliding block gets ${r(v(0), 2)}.`,
    alt: "Bar chart of speeds at the bottom of a 1 metre ramp: sliding block 4.43, solid sphere 3.74, solid cylinder 3.61, hoop 3.13 metres per second.",
    description: shapes.map(([n, k]) => `${n} (I = ${k} mR²): v = √(2 × ${g} × ${h} / ${1 + k}) = ${r(v(k), 2)} m s⁻¹.`),
    kind: "bars", range: [0, 5], ticks: [0, 1, 2, 3, 4, 5], yLabel: "speed at the bottom / m s⁻¹",
    items: shapes.map(([key, k]) => ({ key, value: r(v(k), 3) })), highlight: { "solid sphere": "a2" },
    claims: [{ type: "decreasing" }, { type: "max", key: "sliding block" }],
  }); }

// u05-20 a bowling ball skidding until it rolls (μk = 0.1, launched at 8.0 m s⁻¹)
{ const v0 = 8, mu = 0.1, dv = mu * g, dw = 2.5 * mu * g, t = v0 / (dv + dw), vr = v0 - dv * t, v = `${v0}-${dv}*x`, wr = `${dw}*x`;
  mk("u05-20", "phys-u05-skid-to-roll", "graph", {
    title: "From skidding to rolling",
    caption: `Friction slows the ball (v falls at μg = ${r(dv, 2)} m s⁻²) and spins it up (ωR rises at 5μg/2 = ${r(dw, 2)} m s⁻²). They meet at t = ${r(t, 2)} s, when v = ωR = ${r(vr, 2)} m s⁻¹ (5/7 of the launch speed) and the ball rolls without slipping.`,
    alt: "Two lines against time: speed falling from 8 and rim speed omega R rising from zero, meeting at 2.33 seconds and 5.71 metres per second.",
    description: [`Speed: v = ${v0} − ${r(dv, 2)}t.`, `Rim speed: ωR = ${r(dw, 3)}t, since α = μmgR / (⅖mR²) = 5μg / 2R.`, `They are equal at t = ${v0} / (${r(dv, 2)} + ${r(dw, 3)}) = ${r(t, 2)} s, where v = ${r(vr, 2)} m s⁻¹ = 5/7 × ${v0}.`, "After that there is no slipping and kinetic friction stops acting."],
    range: { x: [0, 3.5], y: [0, 9] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3, 3.5], [2, 4, 6, 8]], height: [320, 300], xLabelBelow: true, axisLabels: ["time / s", "speed / m s⁻¹"],
    curves: [{ expr: v, domain: [0, t], colour: "a1", label: "v (skidding)", labelAt: [0.15, 8.4] }, { expr: wr, domain: [0, t], colour: "a2", label: "ωR", labelAt: [1.1, 2] }, { expr: `${vr}+0*x`, domain: [t, 3.5], colour: "a4", label: "rolling", labelAt: [2.6, 6.4] }],
    points: [{ x: r(t, 4), y: r(vr, 4), colour: "ink", label: `${r(t, 2)} s, ${r(vr, 2)} m s⁻¹`, dx: 10, dy: 14 }],
    checks: [{ type: "intersect", a: v, b: wr, x: r(t, 6), y: r(vr, 6), name: `v = ωR at t = ${r(t, 2)} s` }, { type: "point", expr: `${v0 * 5 / 7}+0*x`, x: 0, y: r(vr, 6), name: "the rolling speed is 5/7 of the launch speed" }],
  }); }
