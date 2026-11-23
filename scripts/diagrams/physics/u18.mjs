// Unit 18, Electromagnetic Waves. Every number in a caption or claim is computed here once. Run: node scripts/diagrams/physics/u18.mjs
import { mk } from "./spec.mjs";

const f0 = (x) => x.toFixed(0), f1 = (x) => x.toFixed(1), f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3);
const K = Math.PI / 180, c = 3e8, LN2 = Math.LN2;

// u18-01 Electromagnetic wave propagation: spreading from a point source
{
  mk("u18-01", "phys-u18-spreading", "graph", {
    title: "Spreading from a point source",
    caption: "From a point source the intensity falls as 1/r² (the same power spread over a sphere of area 4πr²) while the field amplitude falls only as 1/r, because intensity goes as the amplitude squared. Doubling the distance halves the amplitude (0.5) and quarters the intensity (0.25).",
    alt: "Graph of relative amplitude (1/r) and relative intensity (1/r²) against distance from 1 to 4 times the first distance: both start at 1, the amplitude curve falls more slowly, and at twice the distance they are 0.5 and 0.25.",
    description: ["The horizontal axis is the distance r in units of the first distance r₀; the vertical axis is the value relative to its size at r₀.", "The field amplitude falls as 1/r: at r = 2r₀ it is 0.5.", "The intensity, proportional to amplitude squared, falls as 1/r²: at r = 2r₀ it is 0.25.", "Intensity falls faster than amplitude: the same power spreads over four times the area."],
    range: { x: [1, 4], y: [0, 1.1] }, ticks: [[1, 2, 3, 4], [0.25, 0.5, 0.75, 1]], grid: [1, 0.25], height: [320, 300], xLabelBelow: true, axisLabels: ["r / r₀", "relative size"],
    curves: [{ expr: "1/x", colour: "a1", width: 3.4, label: "amplitude ∝ 1/r", labelAt: [2.5, 0.52] }, { expr: "1/x^2", colour: "a2", width: 3.4, label: "intensity ∝ 1/r²", labelAt: [2.2, 0.15] }],
    points: [{ x: 2, y: 0.5, label: "0.5", dx: 8, dy: -12 }, { x: 2, y: 0.25, colour: "a2", label: "0.25", dx: 8, dy: -12 }],
    checks: [{ type: "point", expr: "1/x", x: 2, y: 0.5, name: "the amplitude is halved at twice the distance" }, { type: "point", expr: "1/x^2", x: 2, y: 0.25, name: "the intensity is quartered at twice the distance" }],
  });
}

// u18-04 Electromagnetic wave equation: waves in a plasma
{
  const fp = 9, ex = `sqrt(${fp * fp}+x^2)`, at12 = Math.sqrt(fp * fp + 144);
  mk("u18-04", "phys-u18-plasma-dispersion", "graph", {
    title: "Waves in the ionosphere plasma",
    caption: `In a plasma ω² = ω_p² + c²k², so for a wave of frequency f the wavenumber is real only above the plasma frequency. For the ionosphere (n = 10¹² m⁻³) f_p ≈ 9√n Hz = ${fp} MHz: the curve starts at ${fp} MHz and climbs towards the vacuum line f = ck/2π. Shortwave below ${fp} MHz has no propagating solution and reflects; FM at 100 MHz is far above the curve's start and passes through.`,
    alt: `Graph of frequency in megahertz against ck/2π in megahertz: a hyperbola starting at ${fp} MHz when k is zero and approaching the straight line f = ck/2π, which is the vacuum relation.`,
    description: ["The horizontal axis is ck/2π in megahertz (the frequency a wave of that wavenumber would have in vacuum); the vertical axis is the frequency f in megahertz.", `The plasma curve is f = √(f_p² + (ck/2π)²) with f_p = ${fp} MHz, from the lesson's ionosphere example.`, `At k = 0 it starts at f_p = ${fp} MHz: no wave of lower frequency propagates, so shortwave radio below this reflects. At ck/2π = 12 MHz, f = ${f0(at12)} MHz.`, "Far above f_p the curve approaches the dashed vacuum line f = ck/2π, so VHF and FM waves pass through."],
    range: { x: [0, 30], y: [0, 32] }, ticks: [[5, 10, 15, 20, 25, 30], [5, 10, 15, 20, 25, 30]], grid: [5, 5], height: [330, 310], xLabelBelow: true, axisLabels: ["ck/2π / MHz", "f / MHz"],
    curves: [{ expr: "x", domain: [0, 30], colour: "a4", dash: "6 5", width: 2.4, label: "vacuum: f = ck/2π", labelAt: [20.5, 16] }, { expr: ex, domain: [0, 30], colour: "a1", width: 3.4, label: "plasma", labelAt: [3, 22.5] }],
    points: [{ x: 0, y: fp, colour: "a2", label: "cut-off f_p = 9 MHz", dx: 12, dy: -14 }],
    checks: [{ type: "point", expr: ex, x: 0, y: fp, name: "the curve starts at the plasma frequency, 9 MHz, at k = 0" }, { type: "point", expr: ex, x: 12, y: at12, name: "ω² = ω_p² + c²k²: 15 MHz at ck/2π = 12 MHz" }],
  });
}

// u18-05 Electromagnetic spectrum: the bands in wavelength
{
  const eV = (nm) => 1240 / nm;
  mk("u18-05", "phys-u18-spectrum", "scale", {
    title: "The electromagnetic spectrum",
    caption: `The bands run from radio (λ > 1 m) to gamma rays (λ < 0.01 nm), all the same kind of wave. Photon energy E = hf = hc/λ with hc ≈ 1240 eV nm: green light (520 nm) carries ${f1(eV(520))} eV, a 254 nm ultraviolet photon ${f1(eV(254))} eV and the 50 kV X-ray limit (0.025 nm) ${f0(eV(0.025) / 1000)} keV.`,
    alt: "A logarithmic wavelength scale from 10^-13 m to 10^4 m with the bands radio, microwave, infrared, visible, ultraviolet, X-rays and gamma rays in order, and an FM signal, a microwave oven, a person's thermal glow, green light, a 254 nm ultraviolet lamp and an X-ray tube limit marked.",
    description: ["A horizontal logarithmic scale of wavelength in metres, long wavelengths (radio) on the right and short (gamma rays) on the left.", "Bands from the lesson: radio λ > 1 m; microwaves 1 mm–1 m; infrared 700 nm–1 mm; visible 400–700 nm; ultraviolet 10–400 nm; X-rays 0.01–10 nm; gamma rays below 0.01 nm.", `Markers: FM radio 3 m, microwave oven 12 cm, a person's thermal peak 9.4 μm, green light 520 nm (${f1(eV(520))} eV), a 254 nm UV lamp (${f1(eV(254))} eV), and the 0.025 nm limit of a 50 kV tube.`, "Higher frequency and photon energy lie to the left; the bands meet with no gaps."],
    kind: "em", quantity: "wavelength", units: "m", min: -13, max: 4,
    regions: [{ label: "radio", from: 1, to: 1e4 }, { label: "microwave", from: 1e-3, to: 1 }, { label: "infrared", from: 7e-7, to: 1e-3 }, { label: "visible", from: 4e-7, to: 7e-7 }, { label: "ultraviolet", from: 1e-8, to: 4e-7 }, { label: "X-rays", from: 1e-11, to: 1e-8 }, { label: "gamma rays", from: 1e-13, to: 1e-11 }],
    markers: [{ label: "FM radio, 3 m", value: 3, region: "radio", f: 1e8 }, { label: "microwave oven, 12 cm", value: 0.122, region: "microwave", f: 2.45e9 }, { label: "person, 9.4 μm", value: 9.4e-6, region: "infrared" }, { label: `green light, ${f1(eV(520))} eV`, value: 5.2e-7, region: "visible" }, { label: `UV lamp, ${f1(eV(254))} eV`, value: 2.54e-7, region: "ultraviolet" }, { label: "50 kV X-ray limit", value: 2.5e-11, region: "X-rays" }],
  });
}

// u18-08 Infrared radiation: thermal emission of a person
{
  const T = 310, C2 = 14387.77, a = C2 / T;
  const ex0 = (x) => 1 / (x ** 5 * (Math.exp(a / x) - 1));
  let bx = 2, by = -Infinity;
  for (let i = 0; i <= 20000; i++) { const x = 2 + (38 * i) / 20000, y = ex0(x); if (y > by) { by = y; bx = x; } }
  const k = 1 / by, ex = `${k}/(x^5*(exp(${a}/x)-1))`, peak = 2897.77 / T;
  mk("u18-08", "phys-u18-person-thermal", "graph", {
    title: "Thermal emission of a person at 310 K",
    caption: `A body at 310 K radiates a smooth spectrum that peaks at λ = 2.9 × 10⁻³ m K/310 K = ${f1(peak)} μm, in the thermal infrared (8–15 μm), far beyond the red end of the visible band (0.7 μm). That is why thermal cameras work at room temperature and the person is invisible to the eye in the dark.`,
    alt: `Graph of relative emitted power against wavelength from 2 to 40 micrometres: a skewed peak at ${f1(peak)} micrometres, with the visible range far to the left of the picture.`,
    description: ["The horizontal axis is wavelength in micrometres; the vertical axis is the emitted power per unit wavelength relative to its peak.", `The curve is Planck's law for T = 310 K. It rises steeply from the short-wavelength side, peaks at ${f1(peak)} μm (Wien: λ_max = 2.9 × 10⁻³/310) and falls slowly on the long side.`, "The peak lies in the thermal infrared band 8–15 μm; visible light (0.4–0.7 μm) is to the left of the drawn range, where the emission is negligible."],
    range: { x: [2, 40], y: [0, 1.15] }, ticks: [[5, 10, 15, 20, 25, 30, 35, 40], [0.25, 0.5, 0.75, 1]], grid: [5, 0.25], height: [320, 300], xLabelBelow: true, axisLabels: ["λ / μm", "relative power"],
    bands: [{ x: [8, 15], label: "thermal IR", colour: "a4" }],
    curves: [{ expr: ex, domain: [2, 40], colour: "a2", width: 3.4, label: "310 K", labelAt: [21, 0.55] }],
    points: [{ x: +bx.toFixed(4), y: 1, label: `${f1(peak)} μm`, dx: 10, dy: -12 }],
    checks: [{ type: "max", expr: ex, domain: [2, 40], x: bx, y: 1, name: `the curve peaks at ${f1(peak)} μm (Wien's law at 310 K)` }],
  });
}

// u18-09 Visible light: Rayleigh scattering
{
  const ratio = (700 / 450) ** 4, ex = "(700/x)^4";
  mk("u18-09", "phys-u18-rayleigh", "graph", {
    title: "Rayleigh scattering across the visible",
    caption: `Scattering by air molecules goes as 1/λ⁴. Taking 700 nm light as 1, 450 nm light is scattered (700/450)⁴ = ${f1(ratio)} times as strongly and violet (400 nm) over nine times, so scattered blue fills the sky while the unscattered red and orange remain at sunset.`,
    alt: `Graph of relative scattering against wavelength from 400 to 700 nanometres: a curve falling from about 9.4 at 400 nm through ${f1(ratio)} at 450 nm to 1 at 700 nm.`,
    description: ["The horizontal axis is wavelength in nanometres across the visible band; the vertical axis is the scattered intensity relative to that of 700 nm light.", "The curve is (700/λ)⁴, from the Rayleigh law I ∝ 1/λ⁴.", `At 450 nm it is (700/450)⁴ = ${f1(ratio)}; at 700 nm it is 1; at 400 nm it is ${f1((700 / 400) ** 4)}.`, "Short wavelengths are scattered out of the beam far more than long ones."],
    range: { x: [400, 700], y: [0, 10.5] }, ticks: [[400, 450, 500, 550, 600, 650, 700], [2, 4, 6, 8, 10]], grid: [50, 2], height: [320, 300], xLabelBelow: true, axisLabels: ["λ / nm", "scattering relative to 700 nm"],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "(700/λ)⁴", labelAt: [520, 4.2] }],
    points: [{ x: 450, y: +ratio.toFixed(3), label: `${f1(ratio)} at 450 nm`, dx: 12, dy: -6 }, { x: 700, y: 1, colour: "a2", label: "1 at 700 nm", dx: -8, dy: -14, anchor: "end" }],
    checks: [{ type: "point", expr: ex, x: 450, y: +ratio.toFixed(3), name: `450 nm is scattered ${f1(ratio)} times as strongly as 700 nm` }, { type: "point", expr: ex, x: 700, y: 1, name: "the reference, 700 nm, is 1" }],
  });
}

// u18-10 Ultraviolet radiation: the bands
{
  const eV = (nm) => 1240 / nm, rr = Math.log10(254 / 13.5);
  mk("u18-10", "phys-u18-uv-bands", "scale", {
    title: "The ultraviolet bands",
    caption: `Ultraviolet runs from 400 nm down to 10 nm: UVA (315–400 nm) reaches the ground, UVB (280–315 nm) is mostly absorbed by ozone, UVC (100–280 nm) is fully absorbed and extreme UV (10–100 nm) is absorbed by air. A germicidal 254 nm lamp (UVC) carries ${f1(eV(254))} eV per photon; the 13.5 nm EUV used in chip lithography carries ${f0(eV(13.5))} eV, from a wavelength ${f0(254 / 13.5)} times shorter.`,
    alt: "A logarithmic wavelength scale from 1 to 1000 nanometres with extreme UV, UVC, UVB, UVA and the visible band marked, and the 13.5 nm lithography wavelength and the 254 nm germicidal lamp placed in their bands.",
    description: ["A horizontal logarithmic scale of wavelength in nanometres.", "The bands from the lesson: extreme UV 10–100 nm, UVC 100–280 nm, UVB 280–315 nm, UVA 315–400 nm, then visible light from 400 nm.", `A 254 nm germicidal lamp lies in UVC (photon energy ${f1(eV(254))} eV); 13.5 nm chip-lithography light lies in the extreme UV (${f0(eV(13.5))} eV).`, "Shorter wavelength means more energetic photons, so the lower bands are more damaging."],
    quantity: "wavelength", units: "nm", min: 0.5, max: 3,
    regions: [{ label: "extreme UV", from: 10, to: 100, colour: "a5" }, { label: "UVC", from: 100, to: 280, colour: "a2" }, { label: "UVB", from: 280, to: 315, colour: "a3" }, { label: "UVA", from: 315, to: 400, colour: "a4" }, { label: "visible", from: 400, to: 700, colour: "a1" }],
    markers: [{ label: `13.5 nm lithography, ${f0(eV(13.5))} eV`, value: 13.5, region: "extreme UV" }, { label: `254 nm lamp, ${f1(eV(254))} eV`, value: 254, region: "UVC" }],
    claims: [{ type: "orders", a: `13.5 nm lithography, ${f0(eV(13.5))} eV`, b: `254 nm lamp, ${f1(eV(254))} eV`, value: +rr.toFixed(2), tol: 0.05, name: "254 nm is about 19 times 13.5 nm" }],
  });
}

// u18-11 X-rays: the continuous spectrum and its short-wavelength limit
{
  const hc = 1240, l50 = hc / 50000, l30 = hc / 30000;
  const brem = (lm) => `(x/${lm}-1)/x^2/100`, peak = (lm) => 1 / (4 * lm * lm) / 100;
  mk("u18-11", "phys-u18-xray-continuum", "graph", {
    title: "X-ray tube: the short-wavelength limit",
    caption: `The bremsstrahlung spectrum of a tube is continuous but has a sharp short-wavelength limit λ_min = hc/eV (Duane–Hunt). At 50 kV, λ_min = 1240 eV nm/50 000 eV = ${f3(l50)} nm; at 30 kV it is ${f3(l30)} nm. A higher voltage moves the limit to shorter wavelength and raises the whole curve. (Characteristic lines of the target are not drawn.)`,
    alt: `Graph of relative X-ray intensity against wavelength from 0 to 0.3 nanometres: two curves that start at zero at ${f3(l50)} nm (50 kV) and ${f3(l30)} nm (30 kV), rise to a peak and fall away, the 50 kV curve higher and starting further left.`,
    description: ["The horizontal axis is wavelength in nanometres; the vertical axis is relative intensity (arbitrary units).", `Each curve is a continuous spectrum that is zero below its limit: 50 kV gives λ_min = 1240/50 000 = ${f3(l50)} nm and 30 kV gives ${f3(l30)} nm.`, "Above the limit the intensity rises steeply to a peak at twice λ_min and then falls off.", "Raising the tube voltage moves λ_min to shorter wavelength and increases the intensity."],
    range: { x: [0, 0.3], y: [0, 4.4] }, ticks: [[0.05, 0.1, 0.15, 0.2, 0.25, 0.3], []], grid: [0.05, 1], height: [320, 300], xLabelBelow: true, axisLabels: ["λ / nm", "relative intensity"],
    curves: [{ expr: brem(l50), domain: [l50, 0.3], colour: "a1", width: 3.4, label: "50 kV", labelAt: [0.08, 3.9], samples: 400 }, { expr: brem(l30), domain: [l30, 0.3], colour: "a2", width: 3.4, label: "30 kV", labelAt: [0.14, 1.9], samples: 400 }],
    points: [{ x: +l50.toFixed(4), y: 0, label: "λ_min = 0.025 nm", dx: 8, dy: -16 }, { x: +l30.toFixed(4), y: 0, colour: "a2", label: "0.041 nm", dx: 8, dy: -32 }],
    checks: [{ type: "point", expr: brem(l50), x: l50, y: 0, name: `no X-rays below λ_min = hc/eV = ${f3(l50)} nm at 50 kV` }, { type: "point", expr: brem(l30), x: l30, y: 0, name: `no X-rays below ${f3(l30)} nm at 30 kV` }, { type: "max", expr: brem(l50), domain: [l50, 0.3], x: 2 * l50, y: peak(l50), name: "the 50 kV spectrum peaks at 2λ_min" }],
  });
}

// u18-12 Gamma rays: attenuation in lead
{
  const mu = 0.77, T3 = Math.exp(-mu * 3), hvl = LN2 / mu, ex = `exp(-${mu}*x)`;
  mk("u18-12", "phys-u18-gamma-lead", "graph", {
    title: "Gamma rays through lead",
    caption: `With μ = ${mu} cm⁻¹ the transmitted fraction is I/I₀ = e^{−μx}. After 3 cm it is e^{−${f2(mu * 3)}} = ${f2(T3)}: about 10% gets through. Every ${f2(hvl)} cm (the half-value thickness ln 2/μ) halves the beam, in line with the lesson's ~9 mm for 1 MeV.`,
    alt: `Graph of transmitted fraction against thickness of lead from 0 to 6 cm: an exponential fall passing 0.5 at ${f2(hvl)} cm and ${f2(T3)} at 3 cm.`,
    description: ["The horizontal axis is the thickness of lead in centimetres; the vertical axis is the fraction of the beam transmitted.", `The curve is e^{−0.77x}, from I = I₀e^{−μx} with μ = ${mu} cm⁻¹.`, `It reaches 0.5 at x = ln 2/μ = ${f2(hvl)} cm.`, `At 3 cm the exponent is ${f2(mu * 3)} and the fraction is ${f2(T3)}, about 10%.`],
    range: { x: [0, 6], y: [0, 1.1] }, ticks: [[1, 2, 3, 4, 5, 6], [0.25, 0.5, 0.75, 1]], grid: [1, 0.25], height: [320, 300], xLabelBelow: true, axisLabels: ["thickness x / cm", "I/I₀"],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "e^{−μx}", labelAt: [3.6, 0.35] }],
    points: [{ x: +hvl.toFixed(3), y: 0.5, label: `half at ${f2(hvl)} cm`, dx: 12, dy: -8 }, { x: 3, y: +T3.toFixed(4), colour: "a2", label: `${f2(T3)} at 3 cm`, dx: 12, dy: -14 }],
    checks: [{ type: "point", expr: ex, x: 3, y: +T3.toFixed(4), name: `3 cm of lead transmits e^{−2.31} = ${f2(T3)}` }, { type: "point", expr: ex, x: hvl, y: 0.5, name: `the half-value thickness is ln 2/μ = ${f2(hvl)} cm` }],
  });
}

// u18-13 Polarisation: three polarisers
{
  const ex = `0.125*sin(2*x*${K})^2`;
  mk("u18-13", "phys-u18-three-polarisers", "graph", {
    title: "A third polariser between crossed polarisers",
    caption: "Unpolarised light through a polariser at 0° loses half its intensity. If an analyser at 90° follows, nothing passes. Place a polariser at angle θ between them and the fraction transmitted is ½cos²θ cos²(90° − θ) = ⅛ sin²2θ, which is zero at 0° and 90° and largest, 1/8, at 45°: the lesson's example.",
    alt: "Graph of the fraction of unpolarised light transmitted against the angle of the middle polariser from 0 to 90 degrees: a curve that is zero at both ends and peaks at 0.125 at 45 degrees.",
    description: ["The horizontal axis is the angle θ of the middle polariser, measured from the first polariser (the last is at 90°); the vertical axis is the fraction of the unpolarised input transmitted.", "The first polariser passes ½; Malus's law gives cos²θ for the middle one and cos²(90° − θ) for the last.", "Multiplying: ½ × cos²θ × sin²θ = ⅛ sin²2θ.", "At 0° or 90° the fraction is zero (without the middle polariser, none passes); at 45° it is ½ × ½ × ½ = ⅛ = 0.125."],
    range: { x: [0, 90], y: [0, 0.15] }, ticks: [[15, 30, 45, 60, 75, 90], [0.05, 0.1, 0.15]], grid: [15, 0.05], height: [320, 300], xLabelBelow: true, axisLabels: ["θ / °", "fraction transmitted"],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "⅛ sin²2θ", labelAt: [58, 0.09] }],
    points: [{ x: 45, y: 0.125, label: "1/8 at 45°", dx: 12, dy: -10 }],
    checks: [{ type: "max", expr: ex, domain: [0, 90], x: 45, y: 0.125, name: "the maximum is 1/8 at 45°" }, { type: "point", expr: ex, x: 0, y: 0, name: "crossed polarisers pass nothing (θ = 0°)" }, { type: "point", expr: ex, x: 90, y: 0, name: "crossed polarisers pass nothing (θ = 90°)" }],
  });
}

// u18-14 Reflection and transmission
{
  const R = (n) => ((1 - n) / (1 + n)) ** 2, ex = "((x-1)/(x+1))^2", mats = [["water", 1.33], ["glass", 1.5], ["diamond", 2.42], ["silicon", 3.5]];
  const pct = (n) => `${f0(100 * R(n))}%`;
  mk("u18-14", "phys-u18-reflectance-n", "graph", {
    title: "Reflection at an air–material surface",
    caption: `At normal incidence R = ((n₁ − n₂)/(n₁ + n₂))². Air to water reflects ${pct(1.33)}, to glass ${pct(1.5)}, to diamond ${pct(2.42)} (its sparkle) and to silicon ${pct(3.5)}, rising steeply with the refractive index.`,
    alt: "Graph of the fraction reflected against refractive index from 1 to 3.8: a rising curve through water 2%, glass 4%, diamond 17% and silicon 31%.",
    description: ["The horizontal axis is the refractive index n of the second material (the first is air, n = 1); the vertical axis is the fraction of light reflected at normal incidence.", "The curve is R = ((n − 1)/(n + 1))².", `Marked points: water (n = 1.33) ${pct(1.33)}, glass (1.5) ${pct(1.5)}, diamond (2.42) ${pct(2.42)}, silicon (about 3.5) ${pct(3.5)}.`, "The more the index differs from 1, the more light is reflected."],
    range: { x: [1, 3.8], y: [0, 0.4] }, ticks: [[1, 1.5, 2, 2.5, 3, 3.5], [0.1, 0.2, 0.3, 0.4]], grid: [0.5, 0.1], height: [320, 300], xLabelBelow: true, axisLabels: ["n", "R"],
    curves: [{ expr: ex, colour: "a1", width: 3.4 }],
    arrows: [{ from: [1.3, 0.19], to: [1.33, 0.03], label: "water 2%", labelAt: [1.2, 0.21] }, { from: [1.75, 0.13], to: [1.52, 0.05], label: "glass 4%", labelAt: [1.7, 0.15] }],
    points: mats.map(([m, n], i) => ({ x: n, y: +R(n).toFixed(4), colour: i === 3 ? "a2" : "ink", ...(i >= 2 ? { label: `${m} ${pct(n)}`, dx: i === 3 ? -10 : 10, dy: i === 3 ? -12 : 14, ...(i === 3 ? { anchor: "end" } : {}) } : {}) })),
    checks: mats.map(([m, n]) => ({ type: "point", expr: ex, x: n, y: +R(n).toFixed(4), name: `air to ${m} (n = ${n}) reflects ${pct(n)}` })),
  });
  const T = 0.96, T10 = T ** 10, ex2 = `exp(${Math.log(T)}*x)`;
  mk("u18-14", "phys-u18-lens-transmission", "graph", {
    title: "Light left after many uncoated surfaces",
    caption: `Each uncoated air–glass surface transmits 96%, so N surfaces transmit 0.96^N. For the lens with 10 surfaces that is 0.96¹⁰ = ${f2(T10)}: about ${f0(100 * (1 - T10))}% of the light is lost, much of it as stray reflections that cause flare, which is why lenses are coated.`,
    alt: `Graph of transmitted fraction against the number of air–glass surfaces from 0 to 12: a decaying curve passing ${f2(T10)} at 10 surfaces.`,
    description: ["The horizontal axis is the number of uncoated air–glass surfaces N; the vertical axis is the fraction of light transmitted.", "Each surface transmits 96%, so the fraction is 0.96^N, drawn as a smooth curve.", `At N = 10 it is 0.96¹⁰ = ${f2(T10)}, so ${f0(100 * (1 - T10))}% is lost.`],
    range: { x: [0, 12], y: [0, 1.1] }, ticks: [[2, 4, 6, 8, 10, 12], [0.25, 0.5, 0.75, 1]], grid: [2, 0.25], height: [320, 300], xLabelBelow: true, axisLabels: ["surfaces N", "fraction transmitted"],
    curves: [{ expr: ex2, colour: "a1", width: 3.4, label: "0.96^N", labelAt: [2.5, 0.62] }],
    points: [{ x: 10, y: +T10.toFixed(4), colour: "a2", label: `${f2(T10)} at N = 10`, dx: -8, dy: -16, anchor: "end" }],
    checks: [{ type: "point", expr: ex2, x: 10, y: +T10.toFixed(4), name: `ten surfaces transmit 0.96^10 = ${f2(T10)}` }],
  });
}

// u18-15 Refraction: a ray in water meeting the surface
{
  const n1 = 1.33, crit = Math.asin(1 / n1) / K, r45 = Math.asin(n1 * Math.sin(45 * K)) / K;
  mk("u18-15", "phys-u18-water-surface", "refraction", {
    title: "A ray in water meeting the surface",
    caption: `Going from water (n = 1.33) to air the ray bends away from the normal. The critical angle is sin θ_c = 1/1.33, θ_c = ${f1(crit)}°. At 45°, below θ_c, the ray escapes at sin⁻¹(1.33 sin 45°) = ${f0(r45)}°; at 60° it is above θ_c and is totally reflected.`,
    alt: `Two ray diagrams at a water–air surface: a ray at 45° leaves into the air at ${f0(r45)}° from the normal, and a ray at 60° is totally internally reflected.`,
    description: [`The lesson's ray in water (n = 1.33) hits the surface at 45°. The critical angle is sin⁻¹(1/1.33) = ${f1(crit)}°.`, `45° is less than ${f1(crit)}°, so the ray escapes, bending away from the normal to ${f0(r45)}°: n₁ sin 45° = n₂ sin r.`, "A second ray at 60° is greater than the critical angle: nothing escapes and the ray is totally internally reflected."],
    panels: [{ n1, n2: 1, i: 45, media: ["water", "air"], title: "45°: escapes", expect: { r: +r45.toFixed(1), critical: +crit.toFixed(1), tir: false } }, { n1, n2: 1, i: 60, media: ["water", "air"], title: "60°: totally reflected", expect: { critical: +crit.toFixed(1), tir: true } }],
  });
}

// u18-17 Absorption: Beer–Lambert
{
  const ex = `exp(-${LN2}*x)`, T3 = 0.5 ** 3;
  mk("u18-17", "phys-u18-beer-lambert", "graph", {
    title: "A solution that absorbs half the light per centimetre",
    caption: `Each centimetre of the solution passes half of the light that reaches it, so the fraction through x cm is I/I₀ = 0.5^x = e^{−αx} with α = ln 2 = ${f3(LN2)} cm⁻¹. After 3 cm: 0.5³ = ${T3} = 12.5%.`,
    alt: "Graph of transmitted fraction against path length from 0 to 4 centimetres: an exponential decay through 0.5 at 1 cm, 0.25 at 2 cm and 0.125 at 3 cm.",
    description: ["The horizontal axis is the path length in centimetres; the vertical axis is the fraction of light transmitted.", "The curve is e^{−αx} with α = ln 2 per cm, equal to 0.5^x.", `At 1 cm the fraction is 0.5, at 2 cm 0.25 and at 3 cm 0.5³ = ${T3}: 12.5% gets through.`],
    range: { x: [0, 4], y: [0, 1.1] }, ticks: [[1, 2, 3, 4], [0.25, 0.5, 0.75, 1]], grid: [1, 0.25], height: [320, 300], xLabelBelow: true, axisLabels: ["path length / cm", "I/I₀"],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "0.5^x", labelAt: [1.8, 0.62] }],
    points: [{ x: 1, y: 0.5, label: "50%", dx: 10, dy: -10 }, { x: 3, y: T3, colour: "a2", label: "12.5% at 3 cm", dx: -4, dy: -18, anchor: "end" }],
    checks: [{ type: "point", expr: ex, x: 1, y: 0.5, name: "1 cm passes 50%" }, { type: "point", expr: ex, x: 3, y: T3, name: "3 cm passes 0.5³ = 12.5%" }],
  });
}

// u18-21 Waveguides: group and phase velocity in WR-90
{
  const a = 0.0229, fc = c / (2 * a) / 1e9, vg = (f) => Math.sqrt(1 - (fc / f) ** 2), g10 = vg(10);
  const eg = `sqrt(1-(${fc}/x)^2)`, ep = `1/sqrt(1-(${fc}/x)^2)`;
  mk("u18-21", "phys-u18-wr90-velocities", "graph", {
    title: "Group and phase velocity in WR-90 waveguide",
    caption: `The TE₁₀ cut-off of WR-90 (a = 2.29 cm) is f_c = c/2a = ${f1(fc)} GHz. Above it v_g = c√(1 − (f_c/f)²) rises from zero while v_p = c/√(1 − (f_c/f)²) falls from infinity; at 10 GHz, inside X-band, v_g = ${f2(g10)}c and v_p = ${f2(1 / g10)}c. The product v_g v_p = c² always, so the phase velocity exceeds c while the signal travels slower than c.`,
    alt: `Graph of velocity relative to c against frequency from 6.5 to 12 gigahertz: the group velocity rising from zero at ${f1(fc)} GHz towards 1, and the phase velocity falling from a large value towards 1, with the X-band range 8 to 12 GHz shaded.`,
    description: ["The horizontal axis is frequency in gigahertz; the vertical axis is velocity in units of c.", `Below f_c = 3 × 10⁸/(2 × 0.0229) = ${f1(fc)} GHz nothing propagates.`, `The group velocity starts at zero at cut-off and rises towards c; at 10 GHz it is ${f2(g10)}c.`, `The phase velocity starts very large at cut-off and falls towards c; at 10 GHz it is ${f2(1 / g10)}c. The two multiply to c².`, "X-band, 8–12 GHz, is shaded."],
    range: { x: [6.5, 12], y: [0, 3] }, ticks: [[7, 8, 9, 10, 11, 12], [0.5, 1, 1.5, 2, 2.5]], grid: [1, 0.5], height: [330, 310], xLabelBelow: true, axisLabels: ["f / GHz", "velocity / c"],
    bands: [{ x: [8, 12], label: "X-band", colour: "a4" }],
    curves: [{ expr: eg, domain: [fc + 0.001, 12], colour: "a1", width: 3.4, label: "group v_g", labelAt: [7.0, 0.85], samples: 400 }, { expr: ep, domain: [fc + 0.001, 12], colour: "a2", width: 3.4, label: "phase v_p", labelAt: [9.2, 1.9], samples: 400 }],
    points: [{ x: 10, y: +g10.toFixed(4), label: `${f2(g10)}`, dx: 8, dy: 16 }, { x: 10, y: +(1 / g10).toFixed(4), colour: "a2", label: `${f2(1 / g10)}`, dx: 8, dy: -12 }],
    checks: [{ type: "point", expr: eg, x: 10, y: +g10.toFixed(4), name: `v_g = ${f2(g10)}c at 10 GHz` }, { type: "point", expr: ep, x: 10, y: +(1 / g10).toFixed(4), name: `v_p = ${f2(1 / g10)}c at 10 GHz` }, { type: "point", expr: `(${eg})*(${ep})`, x: 10, y: 1, name: "v_g v_p = c²" }],
  });
}

// u18-23 Near-field and far-field behaviour: regions for a 1 m antenna at 10 GHz
{
  const D = 1, f = 10e9, lam = c / f, react = lam / (2 * Math.PI), far = (2 * D * D) / lam;
  mk("u18-23", "phys-u18-field-regions", "scale", {
    title: "Field regions of a 1 m antenna at 10 GHz",
    caption: `For λ = c/f = ${f0(lam * 100)} cm and antenna size D = 1 m the reactive near field ends at λ/2π = ${f1(react * 1000)} mm, the radiating near field extends to 2D²/λ = ${f0(far)} m, and beyond that the far field has plane-wave behaviour with intensity ∝ 1/r². Antenna patterns must be measured beyond ${f0(far)} m.`,
    alt: `A logarithmic distance scale from 1 millimetre to 1 kilometre with three regions: the reactive near field out to ${f1(react * 1000)} mm, the radiating near field out to ${f0(far)} m, and the far field beyond.`,
    description: ["A horizontal logarithmic scale of distance from the antenna in metres.", `λ = 3 × 10⁸/10¹⁰ = ${f0(lam * 100)} cm. The reactive near field, where fields store energy and E and B are not in the ratio c, ends at λ/2π = ${f1(react * 1000)} mm.`, `The radiating near field extends to the far-field distance 2D²/λ = 2 × 1²/0.03 = ${f0(far)} m.`, "Beyond that is the far field: plane-wave-like, E/B = c, intensity falling as 1/r²."],
    quantity: "distance from the antenna", units: "m", min: -3, max: 3,
    regions: [{ label: "reactive near field", from: 1e-3, to: react, colour: "a5" }, { label: "radiating near field", from: react, to: far, colour: "a4" }, { label: "far field", from: far, to: 1e3, colour: "a1" }],
    markers: [{ label: `λ/2π = ${f1(react * 1000)} mm`, value: react }, { label: `λ = ${f0(lam * 100)} cm`, value: lam }, { label: "D = 1 m", value: D }, { label: `2D²/λ = ${f0(far)} m`, value: far }],
    claims: [{ type: "orders", a: "D = 1 m", b: `2D²/λ = ${f0(far)} m`, value: +Math.log10(far / D).toFixed(2), tol: 0.05, name: "the far-field distance is 67 times the antenna size" }],
  });
}

// u18-25 Electromagnetic shielding: skin depth in aluminium at 100 MHz
{
  const mu0 = 4e-7 * Math.PI, sigma = 3.5e7, fr = 1e8, d = Math.sqrt(2 / (2 * Math.PI * fr * mu0 * sigma)) * 1e6, foil = 16, atFoil = Math.exp(-foil / d), ex = `exp(-x/${d})`;
  mk("u18-25", "phys-u18-skin-depth-aluminium", "graph", {
    title: "Field inside aluminium at 100 MHz",
    caption: `In a conductor the field decays as e^{−z/δ}. For aluminium (σ = 3.5 × 10⁷ S m⁻¹) at 100 MHz, δ = √(2/ωμσ) = ${f1(d)} μm. After one skin depth the amplitude is 1/e = ${f2(Math.exp(-1))}; household foil (about 16 μm) is about ${f1(foil / d)} skin depths thick and leaves only ${f2(atFoil)} of the amplitude, so it attenuates strongly.`,
    alt: `Graph of field amplitude relative to the surface against depth in aluminium from 0 to 30 micrometres: an exponential decay through ${f2(Math.exp(-1))} at ${f1(d)} micrometres and ${f2(atFoil)} at 16 micrometres.`,
    description: ["The horizontal axis is the depth into the metal in micrometres; the vertical axis is the field amplitude relative to its value at the surface.", `The curve is e^{−z/δ} with δ = ${f1(d)} μm, the skin depth of aluminium at 100 MHz.`, `At z = δ the amplitude is 1/e = ${f2(Math.exp(-1))}.`, `At 16 μm, the thickness of foil, it is ${f2(atFoil)}.`],
    range: { x: [0, 30], y: [0, 1.1] }, ticks: [[5, 10, 15, 20, 25, 30], [0.25, 0.5, 0.75, 1]], grid: [5, 0.25], height: [320, 300], xLabelBelow: true, axisLabels: ["depth z / μm", "amplitude / surface value"],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "e^{−z/δ}", labelAt: [15, 0.55] }],
    points: [{ x: +d.toFixed(2), y: +Math.exp(-1).toFixed(4), label: `δ = ${f1(d)} μm`, dx: 12, dy: -12 }, { x: foil, y: +atFoil.toFixed(4), colour: "a2", label: `foil, 16 μm: ${f2(atFoil)}`, dx: 8, dy: -16 }],
    checks: [{ type: "point", expr: ex, x: d, y: +Math.exp(-1).toFixed(4), name: `the amplitude is 1/e at one skin depth, ${f1(d)} μm` }, { type: "point", expr: ex, x: foil, y: +atFoil.toFixed(4), name: `16 μm of aluminium leaves ${f2(atFoil)} of the amplitude` }],
  });
}

// u18-26 Microwave engineering: reflection from a mismatched load
{
  const gam = (zl) => (zl - 50) / (zl + 50), g75 = gam(75), ex1 = "abs((x-50)/(x+50))", ex2 = "((x-50)/(x+50))^2";
  mk("u18-26", "phys-u18-reflection-coefficient", "graph", {
    title: "Reflection from a mismatched load on a 50 Ω line",
    caption: `The reflection coefficient Γ = (Z_L − Z₀)/(Z_L + Z₀) is zero for a matched load (Z_L = 50 Ω) and the power reflected is Γ². For the 75 Ω antenna Γ = (75 − 50)/125 = ${g75}, so Γ² = ${f2(g75 ** 2)}: 4% of the power is reflected.`,
    alt: `Graph of |Γ| and Γ² against load impedance from 10 to 150 ohms: both reach zero at 50 ohms; at 75 ohms |Γ| is ${g75} and the reflected power fraction is ${f2(g75 ** 2)}.`,
    description: ["The horizontal axis is the load impedance Z_L in ohms for a line of Z₀ = 50 Ω; the vertical axis is the size of the reflection coefficient |Γ| and the fraction of power reflected, Γ².", "Both curves touch zero at Z_L = 50 Ω: a matched load reflects nothing.", `At Z_L = 75 Ω, |Γ| = 25/125 = ${g75} and the reflected power is Γ² = ${f2(g75 ** 2)}, 4%.`, "The power curve lies below |Γ| because Γ² is smaller than |Γ| when |Γ| < 1."],
    range: { x: [10, 150], y: [0, 0.75] }, ticks: [[25, 50, 75, 100, 125, 150], [0.2, 0.4, 0.6]], grid: [25, 0.2], height: [320, 300], xLabelBelow: true, axisLabels: ["Z_L / Ω", "reflected"],
    curves: [{ expr: ex1, colour: "a1", width: 3.4, label: "|Γ|", labelAt: [20, 0.5] }, { expr: ex2, colour: "a2", width: 3.4, label: "power Γ²", labelAt: [100, 0.1] }],
    points: [{ x: 75, y: g75, label: "0.2", dx: 10, dy: -12 }, { x: 75, y: +(g75 ** 2).toFixed(4), colour: "a2", label: "0.04", dx: 10, dy: -12 }],
    checks: [{ type: "point", expr: ex1, x: 75, y: g75, name: "Γ = 0.2 for a 75 Ω load on 50 Ω" }, { type: "point", expr: ex2, x: 75, y: +(g75 ** 2).toFixed(4), name: "4% of the power is reflected" }, { type: "point", expr: ex1, x: 50, y: 0, name: "a matched load (50 Ω) reflects nothing" }],
  });
}
