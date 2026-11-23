// Unit 10, Waves and Wave Motion. Every number in a caption or claim is computed here once, from the lesson's own
// worked example. Run: node scripts/diagrams/physics/u10.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));
const PI = "3.14159265";

// u10-02 a slinky: compressions 30 cm apart, 4 per second
{ const lam = 0.3, f = 4, v = lam * f;
  mk("u10-02", "phys-u10-slinky-compressions", "wave", {
    title: "Coils of a slinky",
    caption: `The coils bunch into compressions and spread into rarefactions. Compressions ${lam * 100} cm apart give λ = ${lam} m; ${f} pass each second, so f = ${f} Hz and v = fλ = ${r(v, 1)} m s⁻¹.`,
    alt: "A row of coils along a line, bunched together every 0.30 metres (compressions) and spread out halfway between (rarefactions).",
    description: [`Coils bunch at compressions every ${lam} m; rarefactions lie halfway between.`, `λ = distance from one compression to the next = ${lam} m.`, `f = ${f} Hz, so v = ${f} × ${lam} = ${r(v, 1)} m s⁻¹.`, "Each coil only moves back and forth along the line; the pattern travels."],
    kind: "longitudinal", A: 0.025, lambda: lam, xmax: 0.9, showLambda: true,
    claims: { compressions: [0.15, 0.45, 0.75], rarefactions: [0, 0.3, 0.6, 0.9] },
  }); }

// u10-05 inverse-square spreading: 80 dB at 2 m
{ const L = "80-20*log(x/2)/log(10)", L20 = 80 - 20 * Math.log10(10);
  mk("u10-05", "phys-u10-spreading-loss", "graph", {
    title: "Sound level falling with distance",
    caption: `Spreading over a sphere, intensity falls as 1/r², so the level drops 20 log₁₀(r₂/r₁) dB: 6 dB for each doubling of distance. Ten times further, from 2 m to 20 m, the 80 dB falls by 20 dB to ${L20} dB.`,
    alt: "Sound level in decibels against distance: falling quickly near the speaker and more slowly further away, from 80 at 2 metres to 60 at 20 metres.",
    description: ["Level L = 80 − 20 log₁₀(r / 2 m) dB, for spherical spreading only.", "At 4 m: 74 dB. At 8 m: 68 dB. Each doubling of distance costs 6 dB.", `At 20 m: ${L20} dB.`],
    range: { x: [0, 24], y: [50, 90] }, ticks: [[2, 4, 8, 12, 16, 20, 24], [55, 60, 65, 70, 75, 80, 85]], height: [320, 300], xLabelBelow: true, axisLabels: ["distance / m", "sound level / dB"],
    curves: [{ expr: L, domain: [1.2, 24], colour: "a1" }],
    points: [{ x: 2, y: 80, colour: "a2", label: "80 dB at 2 m", dx: 10, dy: -10 }, { x: 4, y: r(80 - 20 * Math.log10(2), 4), colour: "a4", label: "74 dB at 4 m", dx: 10, dy: -10 }, { x: 20, y: L20, colour: "a2", label: `${L20} dB at 20 m`, anchor: "end", dx: -10, dy: -14 }],
    checks: [{ type: "point", expr: L, x: 20, y: L20, name: "20 dB lower ten times further away" }, { type: "point", expr: L, x: 4, y: r(80 - 20 * Math.log10(2), 6), name: "about 6 dB lower at twice the distance" }],
  }); }

// u10-08 Young's double slits: d = 0.5 mm, fringes 1.2 mm apart, D = 1.0 m
{ const d = 0.5e-3, y = 1.2e-3, D = 1, lam = (d * y) / D, I = `cos(${PI}*x/1.2)^2`;
  mk("u10-08", "phys-u10-double-slit-fringes", "graph", {
    title: "Double-slit fringes",
    caption: `Bright fringes form where the path difference is a whole number of wavelengths, 1.2 mm apart on the screen. λ = d × fringe spacing / D = 0.5 mm × 1.2 mm / 1.0 m = ${r(lam * 1e9, 0)} nm.`,
    alt: "Intensity across the screen: equally spaced bright peaks every 1.2 millimetres with dark minima halfway between.",
    description: ["Intensity on the screen against position, measured from the central bright fringe.", "Bright fringes at 0, ±1.2, ±2.4 mm; dark fringes halfway, at ±0.6, ±1.8 mm.", `λ = (${d * 1000} × 10⁻³ m × ${y * 1000} × 10⁻³ m) / ${D} m = ${r(lam * 1e9, 0)} nm.`, "Real fringes fade away from the centre because each slit also diffracts; that envelope is left out here."],
    range: { x: [-3.6, 3.6], y: [0, 1.25] }, ticks: [[-3.6, -2.4, -1.2, 0, 1.2, 2.4, 3.6], []], height: [300, 280], xLabelBelow: true, axisLabels: ["position on screen / mm", "intensity"],
    curves: [{ expr: I, colour: "a1", samples: 600 }],
    arrows: [{ from: [0, 1.1], to: [1.2, 1.1], both: true, colour: "a2", label: "1.2 mm", labelAt: [0.6, 1.19] }],
    checks: [{ type: "point", expr: I, x: 1.2, y: 1, name: "the next bright fringe is 1.2 mm from the centre" }, { type: "point", expr: I, x: 0.6, y: 0, name: "dark halfway between" },
      { type: "point", expr: `${d}*${y}/${D}*1000000000+0*x`, x: 0, y: r(lam * 1e9, 6), name: `λ = dy/D = ${r(lam * 1e9, 0)} nm` }],
  }); }

// u10-10 microwave standing waves: nodes 6 cm apart
{ const sp = 0.06, lam = 2 * sp, c = 3e8, f = c / lam, L = 4 * sp;
  mk("u10-10", "phys-u10-microwave-standing", "wave", {
    title: "Standing microwaves in an oven",
    caption: `Neighbouring nodes are half a wavelength apart, so nodes ${sp * 100} cm apart mean λ = ${lam * 100} cm and f = c/λ = ${r(f / 1e9, 1)} GHz. Food at a node barely heats, which is why ovens use a turntable.`,
    alt: "A standing wave with nodes every 6 centimetres across a 24 centimetre span, antinodes halfway between.",
    description: [`Nodes every ${sp * 100} cm: λ/2 = ${sp} m, so λ = ${lam} m.`, `f = 3.00 × 10⁸ / ${lam} = ${r(f / 1e9, 1)} × 10⁹ Hz.`, "Antinodes, where the field and the heating are strongest, lie halfway between nodes."],
    kind: "standing", L, n: 4, ends: "fixed-fixed", v: c,
    claims: { harmonics: [{ n: 4, nodes: [0, 0.06, 0.12, 0.18, 0.24], antinodes: [0.03, 0.09, 0.15, 0.21], lambda: lam, f }] },
  }); }

// u10-12 refraction into water, and total internal reflection back out
{ const n = 1.33, i = 50, rr = (Math.asin(Math.sin((i * Math.PI) / 180) / n) * 180) / Math.PI, c = (Math.asin(1 / n) * 180) / Math.PI;
  mk("u10-12", "phys-u10-refraction-water", "refraction", {
    title: "Refraction into water, and back out",
    caption: `Entering water at ${i}°, light bends towards the normal: sin r = sin ${i}° / ${n}, so r = ${r(rr, 1)}°. Going the other way, from water to air, any ray beyond the critical angle ${r(c, 1)}° is totally internally reflected.`,
    alt: "Three ray diagrams: air to water at 50 degrees refracting to 35.2 degrees; water to air at 30 degrees refracting away from the normal; water to air at 60 degrees totally internally reflected.",
    description: [`Air (n = 1) to water (n = ${n}) at ${i}°: r = sin⁻¹(sin ${i}° / ${n}) = ${r(rr, 1)}°.`, `Water to air at 30°: the ray bends away from the normal, to ${r((Math.asin(n * 0.5) * 180) / Math.PI, 1)}°.`, `Critical angle sin⁻¹(1/${n}) = ${r(c, 1)}°; at 60° the ray cannot leave and reflects totally.`],
    panels: [{ n1: 1, n2: n, i, media: ["air", "water"], expect: { r: r(rr, 2) } }, { n1: n, n2: 1, i: 30, media: ["water", "air"], expect: { r: r((Math.asin(n * 0.5) * 180) / Math.PI, 2), critical: r(c, 2), tir: false } }, { n1: n, n2: 1, i: 60, media: ["water", "air"], expect: { tir: true } }],
  }); }

// u10-15 Malus's law: unpolarised light through polarisers at 60°
{ const I = `0.5*cos(x*${PI}/180)^2`, at60 = r(0.5 * Math.cos(Math.PI / 3) ** 2, 4);
  mk("u10-15", "phys-u10-malus-law", "graph", {
    title: "Malus's law through two polarisers",
    caption: `The first polariser passes half of unpolarised light. The second passes cos²θ of what reaches it, so at 60° the final intensity is ½ × cos² 60° = ${at60} I₀: one eighth.`,
    alt: "Final intensity as a fraction of the original against the angle between the polarisers, falling from 0.5 at 0 degrees to 0.125 at 60 degrees and zero at 90.",
    description: ["After the first polariser: ½I₀, whatever its orientation.", "After the second, at angle θ: ½I₀ cos²θ.", `θ = 60°: ½ × 0.25 = ${at60} I₀.`, "At 90° (crossed polarisers) no light gets through."],
    range: { x: [0, 90], y: [0, 0.6] }, ticks: [[15, 30, 45, 60, 75, 90], [0.125, 0.25, 0.375, 0.5]], height: [320, 300], xLabelBelow: true, axisLabels: ["angle between polarisers / °", "final intensity / I₀"],
    curves: [{ expr: I, colour: "a1" }], marks: [{ x: 60, to: at60 }],
    points: [{ x: 60, y: at60, colour: "a2", label: `${at60} I₀ at 60°`, anchor: "end", dx: -10, dy: -12 }],
    checks: [{ type: "point", expr: I, x: 60, y: at60, name: "I₀/8 at 60°" }, { type: "point", expr: I, x: 0, y: 0.5, name: "half the light passes when aligned" }, { type: "point", expr: I, x: 90, y: 0, name: "none when crossed" }],
  }); }

// u10-18 a 0.30 m pipe closed at one end
{ const L = 0.3, v = 343, f1 = v / (4 * L), f3 = (3 * v) / (4 * L);
  mk("u10-18", "phys-u10-closed-pipe", "wave", {
    title: "Resonances of a pipe closed at one end",
    caption: `A closed end must be a displacement node and an open end an antinode, so only odd quarter-wavelengths fit: λ = 4L/n with n = 1, 3, 5. For L = ${L} m, the lowest two resonances are ${r(f1, 0)} Hz and ${r(f3, 0)} Hz.`,
    alt: "Displacement envelopes in a pipe closed at the left: a quarter wavelength for the first harmonic and three quarters for the third.",
    description: [`Fundamental: L = λ/4, λ = ${4 * L} m, f = ${v} / ${4 * L} = ${r(f1, 1)} Hz.`, `Next: L = 3λ/4, λ = ${r((4 * L) / 3, 3)} m, f = ${r(f3, 1)} Hz, three times the fundamental.`, "Even harmonics cannot fit: they would need an antinode at the closed end."],
    kind: "standing", L, n: [1, 3], ends: "closed-open", v,
    claims: { harmonics: [{ n: 1, lambda: 4 * L, f: r(f1, 3), nodes: [0] }, { n: 3, f: r(f3, 3) }] },
  }); }

// u10-25 a string plucked at its midpoint: b_n ∝ sin(nπ/2)/n²
{ const b = [1, 2, 3, 4, 5, 6, 7].map((n) => [String(n), r(Math.abs(Math.sin((n * Math.PI) / 2)) / (n * n), 4)]);
  mk("u10-25", "phys-u10-plucked-harmonics", "trend", {
    title: "Harmonics of a string plucked at its middle",
    caption: "Plucking at the midpoint puts an antinode there, so every harmonic with a node at the middle (the even ones) is missing. The odd harmonics fall off as 1/n²: the third has 1/9 of the fundamental's amplitude, the fifth 1/25.",
    alt: "Bar chart of harmonic amplitudes 1 to 7 relative to the fundamental: 1, 0, 0.11, 0, 0.04, 0, 0.02.",
    description: ["Amplitude of harmonic n ∝ sin(nπ/2) / n² for a pluck at the centre.", "n = 1: 1. n = 3: 1/9 ≈ 0.111. n = 5: 1/25 = 0.04. n = 7: 1/49 ≈ 0.020.", "n = 2, 4, 6: zero, because each has a node at the plucked point."],
    kind: "bars", range: [0, 1.1], ticks: [0, 0.25, 0.5, 0.75, 1], yLabel: "amplitude relative to the fundamental", xTitle: "harmonic number n",
    items: b.map(([key, value]) => ({ key, value })), highlight: { "1": "a1", "3": "a1", "5": "a1", "7": "a1" },
    claims: [{ type: "max", key: "1" }, { type: "decreasing", keys: ["1", "3", "5", "7"] }],
  }); }
