// Unit 11, Acoustics and Sound. Every number in a caption or claim is computed here once, from the lesson's own worked
// example. Run: node scripts/diagrams/physics/u11.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));

// u11-03 adding identical sources: +10 log₁₀ N
{ const items = [1, 2, 4, 8].map((n) => ({ key: `${n} machine${n > 1 ? "s" : ""}`, value: r(80 + 10 * Math.log10(n), 1) }));
  mk("u11-03", "phys-u11-adding-decibels", "trend", {
    title: "Adding identical machines",
    caption: `Intensities add, not decibels. N identical machines give N times the intensity, so the level rises by 10 log₁₀ N: four 80 dB machines make ${items[2].value} dB, not 320 dB. Each doubling adds only 3 dB.`,
    alt: "Bar chart of sound level: one machine 80 dB, two 83.0, four 86.0, eight 89.0.",
    description: items.map((it, i) => `${it.key}: 80 + 10 log₁₀ ${[1, 2, 4, 8][i]} = ${it.value} dB.`),
    kind: "bars", range: [0, 100], ticks: [0, 20, 40, 60, 80, 100], yLabel: "sound level / dB", items,
    claims: [{ type: "increasing" }],
  }); }

// u11-06 an open pipe with fundamental 220 Hz
{ const v = 343, f1 = 220, L = v / (2 * f1);
  mk("u11-06", "phys-u11-open-pipe-harmonics", "wave", {
    title: "Harmonics of an open pipe",
    caption: `Open at both ends, a pipe has antinodes at each end and supports every harmonic: f_n = n v / 2L. With a fundamental of ${f1} Hz the first three overtones are ${2 * f1}, ${3 * f1} and ${4 * f1} Hz.`,
    alt: "Displacement envelopes in an open pipe for harmonics 1 to 4, each with antinodes at both ends.",
    description: [`Fundamental ${f1} Hz: L = λ/2, so for v = ${v} m s⁻¹ the pipe is ${r(L, 3)} m long.`, `Overtones: ${2 * f1} Hz (n = 2), ${3 * f1} Hz (n = 3), ${4 * f1} Hz (n = 4).`, "Each harmonic adds one more node inside the pipe."],
    kind: "standing", L: r(L, 4), n: [1, 2, 3, 4], ends: "open-open", v,
    claims: { harmonics: [{ n: 1, f: r(v / (2 * r(L, 4)), 3) }, { n: 2, f: r((2 * v) / (2 * r(L, 4)), 3) }, { n: 3, f: r((3 * v) / (2 * r(L, 4)), 3) }, { n: 4, f: r((4 * v) / (2 * r(L, 4)), 3) }] },
  }); }

// u11-09 an ambulance (700 Hz) passing at 30 m s⁻¹, 10 m from the listener
{ const f0 = 700, v = 343, vs = 30, d = 10, up = (f0 * v) / (v - vs), down = (f0 * v) / (v + vs);
  const f = `${f0}*${v}/(${v}+${vs}*(${vs}*(x-6))/sqrt((${vs}*(x-6))^2+${d * d}))`;
  mk("u11-09", "phys-u11-doppler-pass", "graph", {
    title: "The pitch of a passing siren",
    caption: `Approaching at ${vs} m s⁻¹, the ${f0} Hz siren sounds at f = f₀v/(v − v_s) = ${r(up, 0)} Hz; receding, f₀v/(v + v_s) = ${r(down, 0)} Hz. The drop happens as it passes, quickly if it passes close by.`,
    alt: "Heard frequency against time: steady near 767 hertz while the ambulance approaches, dropping through 700 as it passes, then steady near 644.",
    description: [`Approaching: ${f0} × ${v} / (${v} − ${vs}) = ${r(up, 1)} Hz.`, `Receding: ${f0} × ${v} / (${v} + ${vs}) = ${r(down, 1)} Hz.`, `At the moment of passing (${d} m away) the siren moves across the line of sight, so you hear the true ${f0} Hz.`],
    range: { x: [0, 12], y: [620, 790] }, ticks: [[2, 4, 6, 8, 10, 12], [650, 700, 750]], height: [320, 300], xLabelBelow: true, axisLabels: ["time / s (passes at 6 s)", "frequency heard / Hz"],
    curves: [{ expr: f, colour: "a1" }], marks: [{ y: up }, { y: f0 }, { y: down }],
    points: [{ x: 2, y: r(up, 2), colour: "a2", label: `approaching: ${r(up, 0)} Hz`, dx: 0, dy: 16 }, { x: 10.5, y: r(down, 2), colour: "a4", label: `receding: ${r(down, 0)} Hz`, anchor: "end", dx: 0, dy: -14 }],
    checks: [{ type: "value", expr: f, x: 0, between: [up - 1, up], name: `approaching tends to ${r(up, 1)} Hz` }, { type: "value", expr: f, x: 12, between: [down, down + 1], name: `receding tends to ${r(down, 1)} Hz` }, { type: "point", expr: f, x: 6, y: f0, name: "the true frequency as it passes" }],
  }); }

// u11-10 two speakers in phase, path difference 0.5 m at 343 Hz
{ const v = 343, f = 343, lam = v / f, pd = 0.5;
  mk("u11-10", "phys-u11-path-difference", "wave", {
    title: "Half a wavelength apart: quiet",
    caption: `At ${f} Hz, λ = ${v}/${f} = ${lam} m. Your distances to the speakers differ by ${pd} m = λ/2, so the two waves arrive half a cycle apart and cancel: you hear a quiet spot.`,
    alt: "Two equal waves half a wavelength out of step, adding to a flat line.",
    description: [`λ = ${lam} m; path difference ${pd} m = ½λ, a phase difference of 180°.`, "The two waves arriving are equal and opposite at every moment, so they sum to zero.", "A path difference of a whole number of wavelengths would give a loud spot."],
    kind: "superposition", xmax: 2, waves: [{ A: 1, lambda: lam, phase: 0, label: "from speaker 1" }, { A: 1, lambda: lam, phase: 180, label: "from speaker 2" }],
    claims: { amplitude: 0, interference: "destructive" },
  }); }

// u11-13 reverberation: V = 2000 m³, absorption 200 m² sabins
{ const V = 2000, A = 200, RT = (0.161 * V) / A, Ldec = `-60*x/${RT}`, need = (0.161 * V) / 1.0;
  mk("u11-13", "phys-u11-reverberation", "graph", {
    title: "Reverberation time",
    caption: `Sabine's formula RT₆₀ = 0.161V/A gives ${r(RT, 2)} s for ${V} m³ and ${A} m² of absorption: the time for the sound to fall by 60 dB after the source stops. For 1.0 s the hall needs ${r(need, 0)} m² of absorption.`,
    alt: "Sound level relative to the start, falling in a straight line from 0 to minus 60 decibels at 1.61 seconds.",
    description: ["After the source stops, the level falls at a steady rate in decibels per second.", `RT₆₀ = 0.161 × ${V} / ${A} = ${r(RT, 2)} s.`, `To get 1.0 s: A = 0.161 × ${V} / 1.0 = ${r(need, 0)} m².`],
    range: { x: [0, 2], y: [-70, 0] }, ticks: [[0.5, 1, 1.5, 2], [-60, -40, -20]], height: [320, 300], xLabelBelow: true, axisLabels: ["time after the source stops / s", "level / dB"],
    curves: [{ expr: Ldec, domain: [0, 2], colour: "a1" }], marks: [{ y: -60 }, { x: RT, to: -60 }],
    points: [{ x: r(RT, 4), y: -60, colour: "a2", label: `RT₆₀ = ${r(RT, 2)} s`, anchor: "end", dx: -10, dy: 14 }],
    checks: [{ type: "point", expr: Ldec, x: r(RT, 6), y: -60, name: `60 dB down after ${r(RT, 2)} s` }, { type: "point", expr: `0.161*${V}/${A}+0*x`, x: 0, y: r(RT, 6), name: "Sabine: 0.161V/A" }],
  }); }

// u11-19 permitted daily exposure: 85 dB for 8 h, 3 dB exchange rate
{ const T = "8/2^((x-85)/3)", at94 = 8 / 2 ** ((94 - 85) / 3);
  mk("u11-19", "phys-u11-noise-exposure", "graph", {
    title: "How long is safe at each sound level?",
    caption: `With an 85 dB limit for 8 hours and a 3 dB exchange rate, each 3 dB more halves the safe time. At 94 dB, 9 dB over, the limit is 8 ÷ 2³ = ${at94} hour.`,
    alt: "Permitted daily hours against sound level, halving every 3 decibels from 8 hours at 85 decibels to 1 hour at 94.",
    description: ["Safe time = 8 h ÷ 2^((L − 85)/3).", "88 dB: 4 h. 91 dB: 2 h.", `94 dB: ${at94} h. 100 dB: 15 minutes.`],
    range: { x: [84, 101], y: [0, 9] }, ticks: [[85, 88, 91, 94, 97, 100], [2, 4, 6, 8]], height: [320, 300], xLabelBelow: true, axisLabels: ["sound level / dB(A)", "safe exposure per day / h"],
    curves: [{ expr: T, domain: [85, 101], colour: "a1" }],
    points: [{ x: 85, y: 8, colour: "a4", label: "8 h at 85 dB", dx: 10, dy: -10 }, { x: 94, y: at94, colour: "a2", label: `${at94} h at 94 dB`, dx: 10, dy: -14 }],
    checks: [{ type: "point", expr: T, x: 94, y: at94, name: "1 hour at 94 dB" }, { type: "point", expr: T, x: 88, y: 4, name: "each 3 dB halves the time" }],
  }); }
