// Unit 19, Optics. Every number in a caption or claim is computed here once. Run: node scripts/diagrams/physics/u19.mjs
import { mk } from "./spec.mjs";

const f0 = (x) => x.toFixed(0), f1 = (x) => x.toFixed(1), f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3);
const K = Math.PI / 180, DEG = 180 / Math.PI, c = 3e8, r4 = (x) => +x.toFixed(4);

// u19-02 Reflection and refraction: light into glass, and the same ray back out
{
  const n = 1.52, r = Math.asin(Math.sin(40 * K) / n) * DEG;
  mk("u19-02", "phys-u19-glass-refraction", "refraction", {
    title: "Light entering glass at 40°",
    caption: `Entering glass (n = 1.52) at 40° the ray bends towards the normal: sin θ₂ = sin 40°/1.52 = ${f3(Math.sin(40 * K) / n)}, so θ₂ = ${f0(r)}°. Light rays are reversible: the same ray leaving the glass at ${f0(r)}° emerges into air at 40°. A weak reflected ray (about 4% at normal incidence) leaves at 40° too.`,
    alt: `Two ray diagrams: a ray in air at 40° entering glass bends towards the normal to ${f0(r)}°; a ray in glass at ${f0(r)}° leaves into air at 40°.`,
    description: ["A ray in air strikes a glass surface (n = 1.52) at 40° to the normal. A faint reflected ray leaves at 40° on the other side of the normal.", `Snell's law: sin θ₂ = sin 40°/1.52 = ${f3(Math.sin(40 * K) / n)}, so θ₂ = ${f0(r)}°: the refracted ray bends towards the normal in the denser glass.`, `Second panel: the reverse path. A ray in glass meeting the surface at ${f0(r)}° leaves into air at 40°, away from the normal.`],
    panels: [{ n1: 1, n2: n, i: 40, media: ["air", "glass"], title: "air to glass", expect: { r: r4(r), tir: false } }, { n1: n, n2: 1, i: r4(r), media: ["glass", "air"], title: "the same ray reversed", expect: { r: 40, tir: false } }],
  });
}

// u19-03 Snell's law: the gradient of sin i against sin r
{
  const n = 1.48, ex = `${n}*x`;
  mk("u19-03", "phys-u19-snell-gradient", "graph", {
    title: "sin i against sin r gives the refractive index",
    caption: `Snell's law for light entering the block from air is sin i = n sin r, so a graph of sin i against sin r is a straight line through the origin whose gradient is n. A gradient of ${n} identifies the block as Perspex/acrylic (crown glass would give about 1.52).`,
    alt: `Graph of sin i against sin r: a straight line through the origin with gradient ${n}, passing through (0.60, ${f3(n * 0.6)}).`,
    description: ["The horizontal axis is sin r (angle of refraction in the block) and the vertical axis is sin i (angle of incidence in air).", `Because sin i = n sin r, the points lie on a straight line through the origin with gradient n = ${n}.`, `For example sin r = 0.60 corresponds to sin i = ${f3(n * 0.6)}.`, "A gradient of 1.48 matches Perspex; glass at 1.52 would be a slightly steeper line."],
    range: { x: [0, 0.7], y: [0, 1.05] }, ticks: [[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7], [0.2, 0.4, 0.6, 0.8, 1]], grid: [0.1, 0.2], height: [320, 300], xLabelBelow: true, axisLabels: ["sin r", "sin i"],
    curves: [{ expr: ex, domain: [0, 0.7], colour: "a1", width: 3.4, label: "gradient n = 1.48", labelAt: [0.07, 0.62] }],
    points: [{ x: 0.6, y: r4(n * 0.6), label: `(0.60, ${f2(n * 0.6)})`, dx: -10, dy: 18, anchor: "end" }],
    checks: [{ type: "slope", expr: ex, x: 0.3, value: n, name: `the gradient is n = ${n}` }, { type: "point", expr: ex, x: 0.6, y: r4(n * 0.6), name: "sin r = 0.60 gives sin i = 0.888" }],
  });
}

// u19-04 Total internal reflection: the fibre core and cladding
{
  const n1 = 1.48, n2 = 1.46, crit = Math.asin(n2 / n1) * DEG, r75 = Math.asin((n1 * Math.sin(75 * K)) / n2) * DEG;
  mk("u19-04", "phys-u19-fibre-critical", "refraction", {
    title: "A fibre core meeting its cladding",
    caption: `Core n = 1.48 against cladding n = 1.46 gives sin θ_c = 1.46/1.48, so θ_c = ${f1(crit)}° from the normal. A ray meeting the boundary at 75° is below it and leaks into the cladding (bending to ${f1(r75)}°); at 85° it is totally internally reflected. Only rays nearly parallel to the fibre axis are guided.`,
    alt: `Two ray diagrams at a core–cladding boundary: a ray at 75° escapes into the cladding at ${f1(r75)}°; a ray at 85° is totally internally reflected; the critical angle is ${f1(crit)}°.`,
    description: [`The critical angle is sin⁻¹(1.46/1.48) = ${f1(crit)}° measured from the normal to the boundary.`, `A ray at 75° is less than ${f1(crit)}°, so part of it refracts into the cladding, bending away from the normal to ${f1(r75)}°.`, "A ray at 85° exceeds the critical angle: all the light is reflected back into the core.", "Because the critical angle is so close to 90°, only rays travelling at less than about 9° to the axis are trapped."],
    panels: [{ n1, n2, i: 75, media: ["core", "cladding"], title: "75°: leaks out", expect: { r: r4(r75), critical: r4(crit), tir: false } }, { n1, n2, i: 85, media: ["core", "cladding"], title: "85°: trapped", expect: { critical: r4(crit), tir: true } }],
  });
}

// u19-07 Lens equations: the image runs away as the object nears F
{
  const f = 10, v = (u) => 1 / (1 / f - 1 / u), proj = 1 / (1 / 10 - 1 / 500);
  mk("u19-07", "phys-u19-projector-lens", "rays", {
    title: "Between F and 2F: the projector",
    caption: `For f = 10 cm an object at 15 cm (between F and 2F) gives a real, inverted image at ${f0(v(15))} cm, magnified ${f0(v(15) / 15)}×. Moving the object to 12 cm pushes the image to ${f0(v(12))} cm and ${f0(v(12) / 12)}×. A projector puts the slide just beyond F: for a screen 5 m away, 1/u = 1/10 − 1/500 gives u = ${f1(proj)} cm, magnification ${f0(500 / proj)}.`,
    alt: `Two ray diagrams for a converging lens of focal length 10 cm: an object at 15 cm forms a real inverted image 30 cm away, twice the size; an object at 12 cm forms one 60 cm away, five times the size.`,
    description: ["Each panel shows a converging lens of focal length 10 cm with F and 2F marked, and the three ray rules for an object between F and 2F.", `Object at 15 cm: 1/v = 1/10 − 1/15, so v = ${f0(v(15))} cm; the image is real, inverted and ${f0(v(15) / 15)} times the object's height.`, `Object at 12 cm: v = ${f0(v(12))} cm and the image is ${f0(v(12) / 12)} times as tall.`, `The closer the object is to F, the farther away and larger the image: the lesson's projector has u = ${f1(proj)} cm and v = 500 cm, magnification ${f0(500 / proj)}.`],
    f, panels: [{ title: "Object at 15 cm", u: 15, h: 2, expect: "real, inverted, magnified", result: `image at ${f0(v(15))} cm, ${f0(v(15) / 15)}× larger` }, { title: "Object at 12 cm", u: 12, h: 1, expect: "real, inverted, magnified", result: `image at ${f0(v(12))} cm, ${f0(v(12) / 12)}× larger` }],
  });
}

// u19-13 Young's double slit: the fringes
{
  const lam = 633e-9, D = 2, d = 2.5e-4, s = ((lam * D) / d) * 1e3, ex = `cos(3.14159265*x/${s})^2`;
  mk("u19-13", "phys-u19-double-slit-fringes", "graph", {
    title: "Double-slit fringes: 633 nm, slits 0.25 mm apart, screen 2.0 m away",
    caption: `Bright fringes lie where d sin θ = nλ, spaced by x = λD/d = 633 × 10⁻⁹ × 2.0/(2.5 × 10⁻⁴) = ${f1(s)} mm. The intensity I = 4I₀cos²(πdx/λD) varies smoothly between 4I₀ and zero (the single-slit envelope is ignored here). Halving d would double the spacing.`,
    alt: `Graph of relative intensity against position on the screen from -15 to 15 millimetres: equally spaced bright fringes ${f1(s)} millimetres apart with dark fringes halfway between.`,
    description: ["The horizontal axis is position on the screen in millimetres from the centre; the vertical axis is the intensity as a fraction of the maximum, 4I₀.", `The curve is cos²(πx/${f1(s)} mm): a bright fringe at the centre and at every ${f1(s)} mm, a dark fringe halfway between them.`, `The spacing is x = λD/d = ${f1(s)} mm.`],
    range: { x: [-15, 15], y: [0, 1.25] }, ticks: [[-15, -10, -5, 0, 5, 10, 15], [0.5, 1]], grid: [5, 0.5], height: [320, 300], xLabelBelow: true, axisLabels: ["x / mm", "I / 4I₀"],
    curves: [{ expr: ex, colour: "a1", width: 3, samples: 600 }],
    arrows: [{ from: [0, 1.12], to: [r4(s), 1.12], both: true, label: `${f1(s)} mm`, dy: -12 }],
    checks: [{ type: "point", expr: ex, x: 0, y: 1, name: "a bright fringe at the centre" }, { type: "point", expr: ex, x: s, y: 1, name: `the next bright fringe is x = λD/d = ${f1(s)} mm away` }, { type: "point", expr: ex, x: s / 2, y: 0, name: "a dark fringe halfway between" }],
  });
}

// u19-14 Interference and coherence: coherence lengths
{
  const lam = 630e-9, dl = 20e-9, lc = lam ** 2 / dl;
  mk("u19-14", "phys-u19-coherence-lengths", "scale", {
    title: "Coherence lengths of light sources",
    caption: `Fringes need path differences shorter than the coherence length l_c ≈ λ²/Δλ. For the LED, l_c = (630 nm)²/20 nm ≈ ${f0(lc * 1e6)} μm; white light manages about 1 μm, a sodium lamp about 1 mm, a HeNe laser 0.1–1 m and stabilised lasers kilometres: 9 orders of magnitude across the range.`,
    alt: "A logarithmic scale of coherence length in metres from 10^-7 to 10^4 with white light at about 1 micrometre, an LED at 20 micrometres, a sodium lamp at 1 millimetre, a HeNe laser at tenths of a metre and stabilised lasers at kilometres.",
    description: ["A horizontal logarithmic scale of coherence length in metres.", `Marked from shortest to longest: white light ~1 μm, the lesson's LED ${f0(lc * 1e6)} μm, sodium lamp ~1 mm, HeNe laser 0.1–1 m, stabilised laser ~1 km.`, "The longer the coherence length, the larger the path difference over which clear fringes appear: white light shows fringes only from thin films, lasers from interferometers many metres across."],
    quantity: "coherence length", units: "m", min: -7, max: 4,
    markers: [{ label: "white light, ~1 μm", value: 1e-6 }, { label: `LED, ${f0(lc * 1e6)} μm`, value: lc }, { label: "sodium lamp, ~1 mm", value: 1e-3 }, { label: "HeNe laser, 0.1–1 m", value: 0.3 }, { label: "stabilised laser, km", value: 1e3 }],
    claims: [{ type: "orders", a: `LED, ${f0(lc * 1e6)} μm`, b: "sodium lamp, ~1 mm", value: +Math.log10(1e-3 / lc).toFixed(2), tol: 0.05, name: "a sodium lamp is about 50 times the LED's coherence length" }, { type: "span", value: 9, tol: 0.5, name: "the sources span 9 orders of magnitude" }],
  });
}

// u19-15 Diffraction: resolution of the eye
{
  const lam = 550e-9, k = ((1.22 * lam) / 1e-3) * (180 / Math.PI) * 60, at3 = k / 3, ex = `${k}/x`;
  mk("u19-15", "phys-u19-pupil-resolution", "graph", {
    title: "Diffraction limit of a circular aperture at 550 nm",
    caption: `The smallest resolvable angle is θ = 1.22λ/D, which falls as the aperture grows: smaller apertures give wider patterns. For the 3 mm pupil, θ = 1.22 × 550 nm/3 mm = 2.2 × 10⁻⁴ rad = ${f1(at3)}′, close to the eye's actual acuity of about 1′ (dotted).`,
    alt: `Graph of the diffraction-limited angle in minutes of arc against aperture diameter in millimetres: a falling curve through ${f1(at3)} arcminutes at 3 millimetres, with the eye's 1 arcminute acuity marked.`,
    description: ["The horizontal axis is the aperture diameter D in millimetres; the vertical axis is the smallest resolvable angle in minutes of arc.", "The curve is θ = 1.22λ/D for λ = 550 nm: it is inversely proportional to D.", `At D = 3 mm (the pupil) θ = 2.2 × 10⁻⁴ rad = ${f1(at3)}′.`, "A dotted line marks the eye's actual acuity, about 1′, a little above the diffraction limit."],
    range: { x: [1, 8], y: [0, 2.5] }, ticks: [[1, 2, 3, 4, 5, 6, 7, 8], [0.5, 1, 1.5, 2]], grid: [1, 0.5], height: [320, 300], xLabelBelow: true, axisLabels: ["D / mm", "θ / arcmin"],
    marks: [{ y: 1, label: "eye acuity ≈ 1′" }],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "1.22λ/D", labelAt: [5.3, 0.62] }],
    points: [{ x: 3, y: r4(at3), colour: "a2", label: `3 mm pupil: ${f1(at3)}′`, dx: 10, dy: -14 }],
    checks: [{ type: "point", expr: ex, x: 3, y: r4(at3), name: `1.22 × 550 nm/3 mm = 2.2 × 10⁻⁴ rad = ${f1(at3)}′` }],
  });
}

// u19-16 Single and multiple slits: the missing orders
{
  const ex = "(sin(3.14159265*x)/(3.14159265*x))^2*cos(3*3.14159265*x)^2", env = "(sin(3.14159265*x)/(3.14159265*x))^2";
  const y13 = (Math.sin(Math.PI / 3) / (Math.PI / 3)) ** 2;
  mk("u19-16", "phys-u19-missing-orders", "graph", {
    title: "Double slit with d = 3a: orders 3 and 6 are missing",
    caption: `The double-slit fringes cos²(πd sin θ/λ) sit inside the single-slit envelope (sin β/β)². With d/a = 0.3 mm/0.1 mm = 3, the fringe maxima fall at a sin θ/λ = n/3, and the envelope is zero at a sin θ/λ = 1, 2, …: orders 3, 6, 9… coincide with single-slit minima and are missing.`,
    alt: "Graph of intensity against a sin θ over λ from minus 2.2 to 2.2: a central fringe pattern with rapid oscillations inside a sinc-squared envelope, which is zero at plus and minus 1 and 2, where the third and sixth order fringes would have been.",
    description: ["The horizontal axis is a sin θ/λ; the vertical axis is intensity relative to the central maximum.", "The dashed curve is the single-slit envelope (sin β/β)², with zeros at a sin θ/λ = ±1, ±2.", "The solid curve is the envelope times the double-slit fringes cos²(3πu), with u = a sin θ/λ. Its maxima are at u = n/3 (orders n = 0, 1, 2, 4, 5, …).", "Orders 3 and 6 would fall at u = 1 and u = 2, exactly at the envelope's zeros, so those fringes are missing."],
    range: { x: [-2.2, 2.2], y: [0, 1.15] }, ticks: [[-2, -1, 0, 1, 2], [0.5, 1]], grid: [1, 0.5], height: [320, 300], xLabelBelow: true, axisLabels: ["a sin θ / λ", "I / I₀"],
    marks: [{ x: -2, label: "6 missing", to: 0.5 }, { x: -1, label: "3 missing", to: 0.5 }, { x: 1, label: "3 missing", to: 0.5 }, { x: 2, label: "6 missing", to: 0.5 }],
    curves: [{ expr: env, domain: [-2.2001, 2.2], colour: "a4", dash: "6 5", width: 2.2 }, { expr: ex, domain: [-2.2001, 2.2], colour: "a1", width: 2.6, samples: 900 }],
    checks: [{ type: "point", expr: ex, x: 1, y: 0, name: "order 3 (u = 1) is missing: the single-slit envelope is zero" }, { type: "point", expr: ex, x: 2, y: 0, name: "order 6 (u = 2) is missing" }, { type: "point", expr: ex, x: 1 / 3, y: r4(y13), name: `order 1 is present at u = 1/3 with intensity ${f2(y13)}` }],
  });
}

// u19-17 Diffraction gratings: angle against wavelength for each order
{
  const d = 1e6 / 600, a = (n) => `asin(${n}*x/${d})*${DEG}`, th = Math.asin(589 / d) * DEG, th2 = Math.asin(1178 / d) * DEG;
  mk("u19-17", "phys-u19-grating-orders", "graph", {
    title: "A 600 lines per mm grating: angle of each order",
    caption: `With d = 1/600 mm = ${f2(d / 1000)} μm, d sin θ = nλ puts the first-order sodium line (589 nm) at ${f1(th)}° and the second order at ${f1(th2)}°. Orders exist only while nλ < d: at 700 nm just two orders appear, and a third (shown for λ < ${f0(d / 3)} nm) needs a shorter wavelength. Higher orders spread colours more.`,
    alt: `Graph of diffraction angle against wavelength from 400 to 700 nanometres for orders 1, 2 and 3 of a 600 lines per mm grating: order 1 rises to ${f0(Math.asin(700 / d) * DEG)} degrees, order 2 rises more steeply, and order 3 exists only for wavelengths below 555 nanometres.`,
    description: ["The horizontal axis is wavelength in nanometres; the vertical axis is the angle of the diffraction maximum in degrees.", `Each curve is θ = sin⁻¹(nλ/d) with d = ${f2(d / 1000)} μm for n = 1, 2, 3.`, `At 589 nm: first order ${f1(th)}°, second order ${f1(th2)}°.`, `The third order ends at ${f0(d / 3)} nm, where sin θ reaches 1; at 700 nm only two orders fit (n < d/λ = ${f1(d / 700)}).`],
    range: { x: [400, 700], y: [0, 95] }, ticks: [[400, 450, 500, 550, 600, 650, 700], [15, 30, 45, 60, 75, 90]], grid: [50, 15], height: [330, 310], xLabelBelow: true, axisLabels: ["λ / nm", "θ / °"],
    curves: [{ expr: a(1), domain: [400, 700], colour: "a1", width: 3, label: "n = 1", labelAt: [640, 20] }, { expr: a(2), domain: [400, 700], colour: "a2", width: 3, label: "n = 2", labelAt: [450, 62] }, { expr: a(3), domain: [400, d / 3 - 0.01], colour: "a4", width: 3, label: "n = 3", labelAt: [405, 80] }],
    points: [{ x: 589, y: r4(th), colour: "ink", label: `${f1(th)}°`, dx: 10, dy: 14 }, { x: 589, y: r4(th2), colour: "ink", label: `${f1(th2)}°`, dx: 10, dy: 14 }],
    checks: [{ type: "point", expr: a(1), x: 589, y: r4(th), name: `first-order sodium line at ${f1(th)}°` }, { type: "point", expr: a(2), x: 589, y: r4(th2), name: `second order at ${f1(th2)}°` }],
  });
}

// u19-18 Michelson interferometer: counting fringes
{
  const lam = 632.8e-6, N = 2000, dmm = (N * lam) / 2, ex = `${2 / lam}*x`;
  mk("u19-18", "phys-u19-michelson-fringes", "graph", {
    title: "Counting fringes with a Michelson interferometer",
    caption: `Moving one mirror by λ/2 changes the path by λ and shifts the pattern by one fringe, so the number of fringes is N = 2d/λ. For λ = 632.8 nm, 2000 fringes correspond to d = 2000 × λ/2 = ${f3(dmm)} mm.`,
    alt: `Graph of fringes counted against mirror movement from 0 to 1 millimetre: a straight line through the origin passing through 2000 fringes at ${f3(dmm)} millimetres.`,
    description: ["The horizontal axis is the mirror displacement in millimetres; the vertical axis is the number of fringes that have passed.", "The line is N = 2d/λ with λ = 632.8 nm: one fringe per λ/2 = 316.4 nm of movement.", `At 2000 fringes the mirror has moved ${f3(dmm)} mm.`],
    range: { x: [0, 1], y: [0, 3400] }, ticks: [[0.2, 0.4, 0.6, 0.8, 1], [500, 1000, 1500, 2000, 2500, 3000]], grid: [0.2, 500], height: [320, 300], xLabelBelow: true, axisLabels: ["mirror movement d / mm", "fringes N"],
    curves: [{ expr: ex, domain: [0, 1], colour: "a1", width: 3.4, label: "N = 2d/λ", labelAt: [0.1, 1100] }],
    points: [{ x: r4(dmm), y: N, colour: "a2", label: `2000 fringes, ${f3(dmm)} mm`, dx: -10, dy: 18, anchor: "end" }],
    checks: [{ type: "point", expr: ex, x: dmm, y: N, name: `2000 fringes of 632.8 nm is a movement of ${f3(dmm)} mm` }],
  });
}

// u19-19 Fabry–Pérot: the transmission peaks
{
  const d = 5e-3, R = 0.95, fsr = c / (2 * d) / 1e9, Fc = (4 * R) / (1 - R) ** 2, fin = (Math.PI * Math.sqrt(R)) / (1 - R), half = (fsr / Math.PI) * Math.asin(1 / Math.sqrt(Fc)), fw = 2 * half;
  const ex = `1/(1+${Fc}*sin(3.14159265*x/${fsr})^2)`;
  mk("u19-19", "phys-u19-fabry-perot-peaks", "graph", {
    title: "Fabry–Pérot transmission, d = 5 mm, R = 0.95",
    caption: `The transmission has sharp peaks at every resonance, spaced by the free spectral range c/2nd = ${f0(fsr)} GHz. Mirrors of R = 0.95 give finesse π√R/(1 − R) ≈ ${f0(fin)}, so each peak is only FSR/F ≈ ${f2(fw)} GHz wide: the pattern resolves frequencies about 60 times finer than the peak spacing.`,
    alt: `Graph of transmission against frequency offset from -15 to 45 gigahertz: very narrow peaks of height 1 every ${f0(fsr)} GHz, each about ${f2(fw)} GHz wide.`,
    description: ["The horizontal axis is frequency in gigahertz (measured from one resonance); the vertical axis is the transmitted fraction.", `Peaks of full transmission occur every FSR = 3 × 10⁸/(2 × 0.005) = ${f0(fsr)} GHz.`, `With R = 0.95 the finesse is π√0.95/0.05 ≈ ${f0(fin)}, so each peak has full width at half maximum FSR/F ≈ ${f2(fw)} GHz.`, "Between peaks almost nothing is transmitted."],
    range: { x: [-15, 45], y: [0, 1.15] }, ticks: [[-15, 0, 15, 30, 45], [0.5, 1]], grid: [15, 0.5], height: [320, 300], xLabelBelow: true, axisLabels: ["f offset / GHz", "transmission"],
    curves: [{ expr: ex, colour: "a1", width: 2.6, samples: 6000 }],
    arrows: [{ from: [0, 1.08], to: [fsr, 1.08], both: true, label: `FSR = ${f0(fsr)} GHz`, dy: -12 }],
    points: [{ x: r4(half), y: 0.5, colour: "a2", label: `width ${f2(fw)} GHz`, dx: 12, dy: 16 }],
    checks: [{ type: "point", expr: ex, x: 0, y: 1, name: "full transmission at resonance" }, { type: "point", expr: ex, x: fsr, y: 1, name: `the next resonance is one FSR = ${f0(fsr)} GHz away` }, { type: "point", expr: ex, x: half, y: 0.5, name: `half maximum at ±${f2(half)} GHz: width FSR/F ≈ ${f2(fw)} GHz` }],
  });
}

// u19-20 Polarisation: polariser and analyser
{
  const I0 = 100, I1 = I0 / 2, I30 = I1 * Math.cos(30 * K) ** 2, ex = `${I1}*cos(x*${K})^2`;
  mk("u19-20", "phys-u19-malus-analyser", "graph", {
    title: "Analyser after a polariser: Malus's law",
    caption: `Unpolarised light of ${I0} W m⁻² loses half at the polariser (${I1} W m⁻²). The analyser then transmits I = ${I1} cos²θ, which falls from ${I1} W m⁻² at 0° to zero at 90°. At 30°, I = ${I1} × cos²30° = ${I30} W m⁻².`,
    alt: `Graph of transmitted intensity against analyser angle from 0 to 90 degrees: a cos-squared curve from 50 watts per square metre at 0 degrees to zero at 90, passing ${I30} at 30 degrees.`,
    description: ["The horizontal axis is the angle θ between the polariser and the analyser; the vertical axis is the transmitted intensity in W m⁻².", `After the polariser the light is polarised with intensity ${I1} W m⁻², half of ${I0}.`, `Malus's law gives I = ${I1} cos²θ: ${I1} at 0°, ${I30} at 30° and 0 at 90°.`],
    range: { x: [0, 90], y: [0, 58] }, ticks: [[15, 30, 45, 60, 75, 90], [10, 20, 30, 40, 50]], grid: [15, 10], height: [320, 300], xLabelBelow: true, axisLabels: ["θ / °", "I / W m⁻²"],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "50 cos²θ", labelAt: [52, 28] }],
    points: [{ x: 30, y: I30, colour: "a2", label: `${I30} W m⁻² at 30°`, dx: 12, dy: -12 }],
    checks: [{ type: "point", expr: ex, x: 30, y: I30, name: `at 30° the transmitted intensity is ${I30} W m⁻²` }, { type: "point", expr: ex, x: 90, y: 0, name: "crossed polarisers pass nothing" }],
  });
}

// u19-21 Brewster's angle: reflectance of the two polarisations at an air–diamond surface
{
  const n = 2.42, tB = Math.atan(n) * DEG, t = (x) => `asin(sin(${x}*${K})/${n})`;
  const Rp = `(tan(x*${K}-${t("x")})/tan(x*${K}+${t("x")}))^2`, Rs = `(sin(x*${K}-${t("x")})/sin(x*${K}+${t("x")}))^2`;
  const R0 = ((n - 1) / (n + 1)) ** 2;
  mk("u19-21", "phys-u19-brewster-diamond", "graph", {
    title: "Reflection from diamond (n = 2.42) for both polarisations",
    caption: `Light reflects differently by polarisation. The component in the plane of incidence (p) has no reflection at Brewster's angle θ_B = tan⁻¹ 2.42 = ${f1(tB)}°, so reflected light there is purely s-polarised. At normal incidence both reflect ${f0(100 * R0)}%; at grazing incidence both tend to 100%.`,
    alt: `Graph of reflectance against angle of incidence from 0 to 90 degrees for diamond: the p curve falls from ${f0(100 * R0)} percent to zero at ${f1(tB)} degrees then rises to 100 percent, while the s curve rises steadily from ${f0(100 * R0)} percent to 100 percent.`,
    description: ["The horizontal axis is the angle of incidence in degrees; the vertical axis is the fraction of light reflected.", `At 0° both polarisations reflect ((2.42 − 1)/(2.42 + 1))² = ${f2(R0)}.`, `The s curve (E perpendicular to the plane of incidence) rises steadily to 1 at 90°.`, `The p curve falls to zero at θ_B = tan⁻¹ 2.42 = ${f1(tB)}°, where the reflected and refracted rays are 90° apart, and then rises to 1.`],
    range: { x: [0, 90], y: [0, 1.08] }, ticks: [[15, 30, 45, 60, 75, 90], [0.25, 0.5, 0.75, 1]], grid: [15, 0.25], height: [330, 310], xLabelBelow: true, axisLabels: ["angle of incidence / °", "reflectance"],
    curves: [{ expr: Rs, domain: [0.2, 89.9], colour: "a2", width: 3.2, label: "s", labelAt: [30, 0.34], samples: 500 }, { expr: Rp, domain: [0.2, 89.9], colour: "a1", width: 3.2, label: "p", labelAt: [16, 0.04], samples: 500 }],
    arrows: [{ from: [62, 0.14], to: [r4(tB) - 0.3, 0.012], label: `Brewster ${f1(tB)}°`, labelAt: [66, 0.17], anchor: "end" }],
    points: [{ x: r4(tB), y: 0, colour: "ink" }],
    checks: [{ type: "point", expr: Rp, x: tB, y: 0, name: `no p reflection at θ_B = tan⁻¹ 2.42 = ${f1(tB)}°` }, { type: "point", expr: Rs, x: tB, y: r4(((Math.sin((tB - Math.asin(Math.sin(tB * K) / n) * DEG) * K)) / Math.sin((tB + Math.asin(Math.sin(tB * K) / n) * DEG) * K)) ** 2), name: "s-polarisation is still partly reflected at θ_B" }, { type: "point", expr: Rp, x: 0.2, y: r4(R0), name: `normal-incidence reflectance ${f2(R0)}`}],
  });
}

// u19-22 Birefringence: retardation in quartz
{
  const lam = 0.633, dn = 0.0092, per = (360 * dn) / lam, dq = lam / (4 * dn), ex = `${per}*x`;
  mk("u19-22", "phys-u19-quartz-retardation", "graph", {
    title: "Retardation in a quartz plate at 633 nm",
    caption: `The two polarisations pick up a phase difference Δφ = 2π(n_e − n_o)d/λ. With n_e − n_o = 0.0092 at 633 nm it grows by ${f2(per)}° per μm of quartz, so a quarter-wave plate (90°, linear ↔ circular) is d = λ/4Δn = ${f1(dq)} μm thick, and a half-wave plate (180°) twice that.`,
    alt: `Graph of retardation in degrees against plate thickness in micrometres: a straight line through the origin reaching 90 degrees at ${f1(dq)} micrometres and 180 degrees at ${f1(2 * dq)} micrometres.`,
    description: ["The horizontal axis is the plate thickness in micrometres; the vertical axis is the phase difference between the two polarisations in degrees.", `The line is Δφ = 360° × 0.0092 × d/0.633 μm = ${f2(per)}° per μm.`, `It reaches 90° (quarter-wave) at ${f1(dq)} μm and 180° (half-wave) at ${f1(2 * dq)} μm.`],
    range: { x: [0, 40], y: [0, 220] }, ticks: [[10, 20, 30, 40], [45, 90, 135, 180]], grid: [10, 45], height: [320, 300], xLabelBelow: true, axisLabels: ["thickness d / μm", "Δφ / °"],
    curves: [{ expr: ex, domain: [0, 40], colour: "a1", width: 3.4, label: "Δφ ∝ d", labelAt: [5, 110] }],
    points: [{ x: r4(dq), y: 90, colour: "a2", label: `quarter-wave: ${f1(dq)} μm`, dx: 12, dy: 18 }, { x: r4(2 * dq), y: 180, colour: "a2", label: `half-wave: ${f1(2 * dq)} μm`, dx: -10, dy: 18, anchor: "end" }],
    checks: [{ type: "point", expr: ex, x: dq, y: 90, name: `a quarter-wave plate is ${f1(dq)} μm thick` }, { type: "point", expr: ex, x: 2 * dq, y: 180, name: "twice the thickness gives a half-wave plate" }],
  });
}

// u19-23 Optical activity: rotation against concentration
{
  const al = 66.5, l = 2, k = al * l, c0 = 13.3 / k, ex = `${k}*x`;
  mk("u19-23", "phys-u19-sucrose-rotation", "graph", {
    title: "Rotation by sucrose in a 20 cm tube",
    caption: `The rotation is θ = [α]lc. With [α] = 66.5° dm⁻¹ (g/mL)⁻¹ and l = 2 dm, θ = ${k}° × c, a straight line through the origin. The observed 13.3° therefore gives c = 13.3/(66.5 × 2) = ${f2(c0)} g mL⁻¹; measuring the rotation is how a polarimeter reads sugar concentration.`,
    alt: `Graph of rotation in degrees against concentration in grams per millilitre: a straight line through the origin of gradient ${k} degrees per gram per millilitre, passing 13.3 degrees at 0.10 grams per millilitre.`,
    description: ["The horizontal axis is the concentration of sucrose in g mL⁻¹; the vertical axis is the rotation of the plane of polarisation in degrees.", `θ = [α]lc = 66.5 × 2 × c = ${k}c, a straight line through the origin.`, `A measured rotation of 13.3° corresponds to c = ${f2(c0)} g mL⁻¹.`],
    range: { x: [0, 0.16], y: [0, 22] }, ticks: [[0.04, 0.08, 0.12, 0.16], [5, 10, 15, 20]], grid: [0.04, 5], height: [320, 300], xLabelBelow: true, axisLabels: ["c / g mL⁻¹", "θ / °"],
    curves: [{ expr: ex, domain: [0, 0.16], colour: "a1", width: 3.4, label: "θ = [α]lc", labelAt: [0.02, 9] }],
    points: [{ x: r4(c0), y: 13.3, colour: "a2", label: "13.3° at 0.10 g mL⁻¹", dx: 12, dy: 18 }],
    checks: [{ type: "slope", expr: ex, x: 0.05, value: k, name: `gradient [α]l = ${k}° per g mL⁻¹` }, { type: "point", expr: ex, x: c0, y: 13.3, name: `13.3° means c = ${f2(c0)} g mL⁻¹` }],
  });
}

// u19-25 Optical cavities: longitudinal modes under the gain curve
{
  const L = 0.3, df = c / (2 * L) / 1e6, g = (x) => Math.exp(-4 * Math.LN2 * (x / 1500) ** 2), ex = `exp(-${4 * Math.LN2}*(x/1500)^2)`;
  mk("u19-25", "phys-u19-cavity-modes", "graph", {
    title: "Longitudinal modes of a 30 cm HeNe cavity",
    caption: `Standing waves fit the cavity when f = qc/2L, spaced by Δf = c/2L = ${f0(df)} MHz for L = 30 cm. Under a gain curve 1.5 GHz wide, three modes (centre and ±${f0(df)} MHz) lie above half gain; the next ones, ±1000 MHz, fall outside it. Real lasers use the modes that reach threshold.`,
    alt: `Graph of gain against frequency from -1100 to 1100 megahertz: a bell-shaped gain curve 1500 megahertz wide with three vertical lines at -500, 0 and 500 megahertz marking the cavity modes.`,
    description: ["The horizontal axis is frequency relative to the centre of the gain curve in megahertz; the vertical axis is the relative gain.", `The bell curve is the gain, 1.5 GHz wide at half maximum (it is 0.5 at ±750 MHz).`, `The cavity modes are the vertical lines, spaced by c/2L = 3 × 10⁸/0.6 = ${f0(df)} MHz: at −${f0(df)}, 0 and +${f0(df)} MHz.`, "About 3 modes fit within the gain bandwidth."],
    range: { x: [-1100, 1100], y: [0, 1.15] }, ticks: [[-1000, -500, 0, 500, 1000], [0.5, 1]], grid: [500, 0.5], height: [320, 300], xLabelBelow: true, axisLabels: ["f offset / MHz", "gain"],
    marks: [{ x: -df, to: r4(g(-df)) }, { x: 0, to: 1 }, { x: df, to: r4(g(df)) }],
    curves: [{ expr: ex, colour: "a2", width: 3, label: "gain", labelAt: [620, 0.8] }],
    arrows: [{ from: [0, 0.1], to: [df, 0.1], both: true, label: `${f0(df)} MHz`, dy: -12 }],
    checks: [{ type: "point", expr: ex, x: 750, y: 0.5, name: "the gain is half its peak at ±750 MHz (1.5 GHz wide)" }, { type: "point", expr: ex, x: df, y: r4(g(df)), name: `the mode at +${f0(df)} MHz sees gain ${f2(g(df))}` }],
  });
}

// u19-26 Fibre optics: loss against length
{
  const ex = `exp(-${Math.LN10 * 0.02}*x)`, p = (L) => 10 ** (-0.02 * L);
  mk("u19-26", "phys-u19-fibre-loss", "graph", {
    title: "Power left in a fibre at 0.2 dB km⁻¹",
    caption: `Loss in decibels adds along the fibre, so the power fraction falls exponentially: 10^(−0.02L). After 10 km ${f2(p(10))} remains, after 50 km ${f2(p(50))}, and after 100 km the loss is 20 dB: ${f2(p(100))}, only 1%. That is why long links need optical amplifiers.`,
    alt: `Graph of the fraction of power received against fibre length from 0 to 120 kilometres: a fall from 1 through ${f2(p(10))} at 10 km, ${f2(p(50))} at 50 km and ${f2(p(100))} at 100 km.`,
    description: ["The horizontal axis is the fibre length in kilometres; the vertical axis is the fraction of the launched power that arrives.", "At 0.2 dB km⁻¹ the loss in dB is 0.2L, and the fraction is 10^(−0.2L/10).", `After 10 km: ${f2(p(10))}; 50 km: ${f2(p(50))} (10 dB); 100 km: 20 dB, or ${f2(p(100))}, 1% of the power.`],
    range: { x: [0, 120], y: [0, 1.1] }, ticks: [[20, 40, 60, 80, 100, 120], [0.25, 0.5, 0.75, 1]], grid: [20, 0.25], height: [320, 300], xLabelBelow: true, axisLabels: ["length L / km", "P/P₀"],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "10^(−0.02L)", labelAt: [30, 0.5] }],
    points: [{ x: 50, y: r4(p(50)), label: `${f2(p(50))}, 50 km`, dx: 10, dy: -14 }, { x: 100, y: r4(p(100)), colour: "a2", label: "0.01, 100 km", dx: -8, dy: -52, anchor: "end" }],
    checks: [{ type: "point", expr: ex, x: 100, y: 0.01, name: "20 dB over 100 km leaves 1%" }, { type: "point", expr: ex, x: 50, y: r4(p(50)), name: "10 dB over 50 km leaves 10%" }],
  });
}

// u19-30 Adaptive optics: diffraction limit against seeing
{
  const AS = (180 / Math.PI) * 3600, dl = ((1.22 * 2.2e-6) / 8) * AS, eye = ((1.22 * 550e-9) / 3e-3) * AS, seeing = 0.6;
  mk("u19-30", "phys-u19-seeing-limit", "scale", {
    title: "Angular resolution: diffraction limit against seeing",
    caption: `An 8 m telescope at 2.2 μm could resolve θ = 1.22λ/D = ${f2(dl)}″, but turbulence limits it to about ${seeing}″ unless adaptive optics corrects the wavefront: a gain of about ${f0(seeing / dl)}×. For comparison the 3 mm pupil of the eye is diffraction-limited at ${f0(eye)}″.`,
    alt: `A logarithmic scale of angle in arcseconds from 0.01 to 100 with the 8 metre telescope's diffraction limit at ${f2(dl)}, typical seeing at 0.6 and the eye's diffraction limit at ${f0(eye)}.`,
    description: ["A horizontal logarithmic scale of angular resolution in arcseconds (smaller is sharper).", `The 8 m telescope's diffraction limit at 2.2 μm: 1.22 × 2.2 × 10⁻⁶/8 = 3.4 × 10⁻⁷ rad = ${f2(dl)}″.`, `Typical seeing without correction: ${seeing}″, about ${f0(seeing / dl)} times worse; adaptive optics recovers most of the difference.`, `The eye (3 mm pupil, 550 nm): ${f0(eye)}″, shown for scale.`],
    quantity: "angular resolution", units: "arcsec", min: -2, max: 2,
    markers: [{ label: `8 m telescope, diffraction limit ${f2(dl)}″`, value: r4(dl) }, { label: "typical seeing 0.6″", value: seeing }, { label: `eye, 3 mm pupil: ${f0(eye)}″`, value: r4(eye) }],
    claims: [{ type: "orders", a: `8 m telescope, diffraction limit ${f2(dl)}″`, b: "typical seeing 0.6″", value: +Math.log10(seeing / dl).toFixed(2), tol: 0.05, name: "seeing is about 9 times the diffraction limit" }],
  });
}
