// Unit 44, Experimental and Applied Physics. Every number in a caption or claim is computed here once, from the
// lesson's own worked example. Run: node scripts/diagrams/physics/u44.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => +(+x).toFixed(d);

// u44-04 work needed per watt of heat removed, rejection at 300 K
{ const Th = 300, W = (T) => (Th - T) / T, E = `(${Th}-x)/x`;
  mk("u44-04", "phys-u44-cryo-cost", "graph", {
    title: "The cost of cold",
    caption: `The Carnot COP T_c/(T_h − T_c) means that removing 1 W at temperature T_c needs at least (300 − T_c)/T_c watts of work. At 77 K that is ${r(W(77), 1)} W; at 4 K it is ${r(W(4), 0)} W (COP ${r(4 / 296, 4)}). Real refrigerators are far worse, needing about 1000 W per watt at 4 K.`,
    alt: "Minimum work per watt of heat removed against cold temperature from 3 to 100 kelvin: a curve that climbs steeply as the temperature falls, passing 2.9 at 77 K and 74 at 4 K.",
    description: ["Carnot: COP = T_c/(T_h − T_c) with T_h = 300 K, so work per watt removed = (T_h − T_c)/T_c.", `T_c = 77 K: ${r(W(77), 1)} W per watt.`, `T_c = 4 K: 296/4 = ${r(W(4), 0)} W per watt, so COP ≈ ${r(4 / 296, 4)}.`, "Real systems need about 1000 W/W at 4 K, far above this ideal limit."],
    range: { x: [0, 100], y: [0, 90] }, ticks: [[20, 40, 60, 80, 100], [20, 40, 60, 80]], height: [320, 300], xLabelBelow: true, axisLabels: ["cold temperature T_{c} / K", "minimum work per watt removed / W"],
    curves: [{ expr: E, domain: [3, 100], colour: "a1", label: "(T_{h} − T_{c})/T_{c}", labelAt: [30, 38] }],
    points: [{ x: 4, y: r(W(4), 3), colour: "a2", label: `4 K: ${r(W(4), 0)} W`, dx: 12, dy: 6 }, { x: 77, y: r(W(77), 3), colour: "a2", label: `77 K: ${r(W(77), 1)} W`, dx: -6, dy: -14, anchor: "end" }],
    checks: [{ type: "point", expr: E, x: 4, y: r(W(4), 6), name: `74 W per watt at 4 K` }, { type: "point", expr: E, x: 77, y: r(W(77), 6), name: `${r(W(77), 1)} W per watt at 77 K` }],
  }); }

// u44-06 Gaussian beam of a HeNe, w0 = 0.5 mm
{ const lam = 633e-9, w0 = 0.5e-3, zR = (Math.PI * w0 * w0) / lam, th = lam / (Math.PI * w0), W = `0.5*sqrt(1+(x/${r(zR, 4)})^2)`, slope = r(th * 1000, 4);
  mk("u44-06", "phys-u44-gaussian-beam", "graph", {
    title: "A laser beam spreads beyond its Rayleigh range",
    caption: `A HeNe beam (633 nm) with waist w₀ = 0.5 mm stays nearly parallel over the Rayleigh range z_R = πw₀²/λ ≈ ${r(zR, 2)} m, where its radius has grown by √2 to ${r(0.5 * Math.SQRT2, 2)} mm. Farther out the radius grows linearly at the divergence θ = λ/(πw₀) ≈ ${r(th * 1000, 2)} mrad (dashed).`,
    alt: "Beam radius in millimetres against distance from the waist, starting at 0.5 mm, reaching 0.71 mm at 1.24 metres and approaching a straight dashed line of slope 0.4 millimetres per metre.",
    description: ["w(z) = w₀√(1 + (z/z_R)²), with w₀ = 0.5 mm.", `z_R = π(5 × 10⁻⁴)²/(6.33 × 10⁻⁷) ≈ ${r(zR, 2)} m, where w = √2 w₀ ≈ ${r(0.5 * Math.SQRT2, 2)} mm.`, `Far field: w ≈ θz with θ = 6.33 × 10⁻⁷/(π × 5 × 10⁻⁴) ≈ ${r(th * 1000, 2)} mrad, i.e. ${r(th * 1000, 2)} mm per metre.`],
    range: { x: [0, 4], y: [0, 2] }, ticks: [[1, 2, 3, 4], [0.5, 1, 1.5, 2]], height: [320, 300], xLabelBelow: true, axisLabels: ["distance from the waist z / m", "beam radius w / mm"],
    curves: [{ expr: `${slope}*x`, colour: "a4", dash: "6 5", label: "w = θz", labelAt: [2.8, 0.78] }, { expr: W, colour: "a1", label: "w(z)", labelAt: [2.2, 1.58] }],
    marks: [{ x: r(zR, 4), to: r(0.5 * Math.SQRT2, 4) }],
    points: [{ x: 0, y: 0.5, colour: "a2", label: "w₀ = 0.5 mm", dx: 10, dy: -12 }, { x: r(zR, 4), y: r(0.5 * Math.SQRT2, 4), colour: "a2", label: `z_{R} ≈ ${r(zR, 2)} m`, dx: 10, dy: 22 }],
    checks: [{ type: "point", expr: W, x: r(zR, 4), y: r(0.5 * Math.SQRT2, 5), name: "w = √2 w₀ at z = z_R" }, { type: "point", expr: W, x: 0, y: 0.5, name: "w = w₀ at the waist" }, { type: "value", expr: `${slope}*x`, x: 4, between: [1.6, 1.62], name: `θ ≈ ${r(th * 1000, 2)} mrad far-field slope` }],
  }); }

// u44-10 reflection coefficient of a load on a 50 ohm line
{ const Z0 = 50, G = (Z) => Math.abs((Z - Z0) / (Z + Z0)), E = `abs((x-${Z0})/(x+${Z0}))`, g = G(75), vswr = r((1 + g) / (1 - g), 3);
  mk("u44-10", "phys-u44-reflection", "graph", {
    title: "Mismatch reflects power",
    caption: `On a 50 Ω line the reflection |Γ| = |Z_L − 50|/(Z_L + 50) is zero only for a matched load. A 75 Ω load gives Γ = 25/125 = ${g}, VSWR = (1 + ${g})/(1 − ${g}) = ${vswr}, and ${r(g * g * 100, 0)}% of the power is reflected. Open and short circuits reflect everything.`,
    alt: "Magnitude of the reflection coefficient against load impedance from 0 to 200 ohms: zero at 50 ohms, rising either side, with 0.2 marked at 75 ohms and approaching 1 for very large and very small loads.",
    description: ["|Γ| = |Z_L − Z₀|/(Z_L + Z₀), Z₀ = 50 Ω.", `Z_L = 75 Ω: Γ = 25/125 = ${g}; VSWR = ${r(1 + g, 1)}/${r(1 - g, 1)} = ${vswr}.`, `Reflected power = Γ² = ${r(g * g, 2)}, i.e. ${r(g * g * 100, 0)}%.`, "Z_L = 50 Ω gives Γ = 0 and no reflection."],
    range: { x: [0, 200], y: [0, 1.05] }, ticks: [[50, 100, 150, 200], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["load impedance Z_L / Ω", "|Γ|"],
    curves: [{ expr: E, colour: "a1", label: "|Γ|", labelAt: [150, 0.7] }],
    points: [{ x: 50, y: 0, colour: "a2", label: "matched", dx: -8, dy: -14, anchor: "end" }, { x: 75, y: g, colour: "a2", label: `Γ = ${g}, VSWR ${vswr}`, dx: 12, dy: 8 }],
    checks: [{ type: "point", expr: E, x: 75, y: g, name: `|Γ| = ${g} for 75 Ω` }, { type: "point", expr: E, x: 50, y: 0, name: "matched load reflects nothing" }, { type: "point", expr: `(1+${E})/(1-${E})`, x: 75, y: vswr, name: `VSWR = ${vswr}` }],
  }); }

// u44-13 tunnelling current against gap, phi = 4.5 eV
{ const m = 9.109e-31, eV = 1.602e-19, hb = 1.0546e-34, kap = Math.sqrt(2 * m * 4.5 * eV) / hb / 1e9, K = r(kap, 3), fall = Math.exp(-2 * kap * 0.1), E = `exp(-2*${K}*x)`;
  mk("u44-13", "phys-u44-tunnel-current", "graph", {
    title: "The tunnelling current is exquisitely sensitive to the gap",
    caption: `For φ = 4.5 eV, κ = √(2mφ)/ħ ≈ ${r(kap, 1)} nm⁻¹ and I ∝ e^(−2κd). Retracting the tip by only 0.1 nm multiplies the current by e^(−2.2) ≈ ${r(fall, 2)}: about ${r(1 / fall, 0)}× smaller. That sensitivity is what lets an STM feel individual atoms.`,
    alt: "Relative tunnelling current against increase in gap from 0 to 0.3 nanometres: an exponential decay from 1 that has fallen to 0.11 at 0.1 nanometre and about 0.01 at 0.2.",
    description: [`κ = √(2 × 9.11 × 10⁻³¹ × 7.2 × 10⁻¹⁹)/1.055 × 10⁻³⁴ ≈ ${r(kap, 2)} nm⁻¹ for φ = 4.5 eV.`, `Gap increase Δd = 0.1 nm: I/I₀ = e^(−2κΔd) = e^(−${r(2 * kap * 0.1, 2)}) ≈ ${r(fall, 2)}, about ${r(1 / fall, 0)}× smaller.`, `Δd = 0.2 nm: ${r(Math.exp(-2 * kap * 0.2), 3)}; each 0.1 nm costs about a factor of 9.`],
    range: { x: [0, 0.3], y: [0, 1.05] }, ticks: [[0.1, 0.2, 0.3], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["increase in gap Δd / nm", "current I/I₀"],
    curves: [{ expr: E, colour: "a1", label: "e^(−2κΔd)", labelAt: [0.14, 0.5] }],
    marks: [{ x: 0.1, to: r(fall, 4) }],
    points: [{ x: 0.1, y: r(fall, 4), colour: "a2", label: `${r(fall, 2)} at 0.1 nm`, dx: 12, dy: -12 }],
    checks: [{ type: "point", expr: E, x: 0.1, y: r(fall, 5), name: `current falls to ${r(fall, 2)} for 0.1 nm` }, { type: "point", expr: E, x: 0, y: 1, name: "I = I₀ at no change" }],
  }); }

// u44-15 Bragg angles for copper (FCC, a = 0.3615 nm), Cu K-alpha
{ const lam = 0.15406, a = 0.3615, tt = (N) => (2 * Math.asin((lam * N) / (2 * a)) * 180) / Math.PI, E = `114.5916*asin(${r(lam / (2 * a), 6)}*x)`, pk = (h, k, l) => tt(Math.sqrt(h * h + k * k + l * l)), d111 = a / Math.sqrt(3);
  mk("u44-15", "phys-u44-bragg-peaks", "graph", {
    title: "Which planes diffract, and where",
    caption: `Cu Kα from copper (a = 0.3615 nm): Bragg's law puts a reflection with N = √(h² + k² + l²) at 2θ = 2 sin⁻¹(λN/2a). FCC needs h, k, l all even or all odd, so (111) at 2θ ≈ ${r(pk(1, 1, 1), 1)}° and (200) at ${r(pk(2, 0, 0), 1)}° appear, while (100) and (110) (grey) are absent.`,
    alt: "Peak angle 2 theta against the square root of h squared plus k squared plus l squared: a rising curve with the 111 and 200 reflections marked present at 43.3 and 50.4 degrees and the 100 and 110 positions marked grey as absent.",
    description: [`d₁₁₁ = 0.3615/√3 = ${r(d111, 4)} nm; sin θ = 0.15406/(2 × ${r(d111, 4)}) = ${r(lam / (2 * d111), 3)}, so θ = ${r(pk(1, 1, 1) / 2, 1)}°, 2θ ≈ ${r(pk(1, 1, 1), 1)}°.`, `(200): d = 0.18075 nm, 2θ ≈ ${r(pk(2, 0, 0), 1)}°.`, `Positions only: (100) would be at ${r(pk(1, 0, 0), 1)}° and (110) at ${r(pk(1, 1, 0), 1)}°, but mixed parity cancels them in FCC.`],
    range: { x: [0.5, 2.5], y: [15, 60] }, ticks: [[1, 1.5, 2, 2.5], [20, 30, 40, 50, 60]], height: [320, 300], xLabelBelow: true, axisLabels: ["√(h² + k² + l²)", "peak position 2θ / °"],
    curves: [{ expr: E, domain: [0.5, 2.5], colour: "a1" }],
    points: [{ x: 1, y: r(pk(1, 0, 0), 3), colour: "a4", label: "(100)", dx: 8, dy: 22 }, { x: r(Math.SQRT2, 5), y: r(pk(1, 1, 0), 3), colour: "a4", label: "(110)", dx: 8, dy: 22 }, { x: r(Math.sqrt(3), 5), y: r(pk(1, 1, 1), 3), colour: "a2", label: `(111) ${r(pk(1, 1, 1), 1)}°`, dx: -8, dy: -12, anchor: "end" }, { x: 2, y: r(pk(2, 0, 0), 3), colour: "a2", label: `(200) ${r(pk(2, 0, 0), 1)}°`, dx: 8, dy: 22 }],
    checks: [{ type: "point", expr: E, x: r(Math.sqrt(3), 6), y: r(pk(1, 1, 1), 5), name: `(111) at 2θ = ${r(pk(1, 1, 1), 1)}°` }, { type: "point", expr: E, x: 2, y: r(pk(2, 0, 0), 5), name: `(200) at 2θ = ${r(pk(2, 0, 0), 1)}°` }],
  }); }
