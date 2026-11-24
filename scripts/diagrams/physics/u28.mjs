// Unit 28, Semiconductor Physics and Electronics. Every number in a caption or claim is computed here once, from the
// lesson's own worked example. Run: node scripts/diagrams/physics/u28.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));
const VT = 0.025852; // kT/e at 300 K, volts

// u28-10 the diode's exponential I–V: 1 mA at 0.60 V
{ const I = `exp((x-0.6)/${VT})`, at = Math.exp(0.06 / VT);
  mk("u28-10", "phys-u28-diode-iv", "graph", {
    title: "A diode's exponential current",
    caption: `Forward current grows as e^(V/V_T), with V_T = kT/e ≈ 25.9 mV at 300 K. A diode passing 1 mA at 0.60 V passes ${r(at, 1)} mA at 0.66 V: each extra 60 mV multiplies the current by about ten.`,
    alt: "Diode current in milliamps against voltage: almost zero below 0.5 volts, then rising steeply, through 1 milliamp at 0.60 volts and 10 milliamps at 0.66.",
    description: ["I = I_s(e^(V/V_T) − 1), V_T = 25.9 mV at 300 K (n = 1).", "At 0.60 V: 1.0 mA.", `At 0.66 V: 1.0 × e^(0.06/0.0259) = ${r(at, 2)} mA.`, "Below about 0.5 V the current is too small to see on this scale: the familiar 'turn-on voltage'."],
    range: { x: [0.4, 0.7], y: [0, 14] }, ticks: [[0.45, 0.5, 0.55, 0.6, 0.65, 0.7], [2, 4, 6, 8, 10, 12]], height: [320, 300], xLabelBelow: true, axisLabels: ["voltage / V", "current / mA"],
    curves: [{ expr: I, domain: [0.4, 0.675], colour: "a1" }], marks: [{ x: 0.6, to: 1 }, { x: 0.66, to: at }],
    points: [{ x: 0.6, y: 1, colour: "a4", label: "1 mA at 0.60 V", anchor: "end", dx: -10, dy: -10 }, { x: 0.66, y: r(at, 4), colour: "a2", label: `${r(at, 1)} mA at 0.66 V`, anchor: "end", dx: -10, dy: -6 }],
    checks: [{ type: "point", expr: I, x: 0.6, y: 1, name: "1 mA at 0.60 V" }, { type: "point", expr: I, x: 0.66, y: r(at, 6), name: `${r(at, 2)} mA at 0.66 V` }],
  }); }

// u28-14 a MOSFET output curve at V_GS = 1.5 V: k = μC_ox W/L = 2 mA V⁻², V_T = 0.5 V
{ const k = 2, Vov = 1.5 - 0.5, Isat = 0.5 * k * Vov * Vov, lin = `${k}*(${Vov}*x-x^2/2)`;
  mk("u28-14", "phys-u28-mosfet-output", "graph", {
    title: "MOSFET output characteristic",
    caption: `With V_GS = 1.5 V and V_T = 0.5 V the overdrive is ${Vov.toFixed(1)} V. The drain current rises with V_DS until V_DS = V_GS − V_T, then saturates at I_D = ½(μC_ox W/L)(V_GS − V_T)² = ½ × 2 × 1² = ${Isat.toFixed(1)} mA.`,
    alt: "Drain current against drain–source voltage, rising in a curve to 1 milliamp at 1 volt and staying flat beyond it.",
    description: [`Triode region (V_DS < ${Vov} V): I_D = k[(V_GS − V_T)V_DS − V_DS²/2].`, `At V_DS = ${Vov} V the channel pinches off.`, `Saturation (V_DS > ${Vov} V): I_D = ${Isat} mA, independent of V_DS (channel-length modulation ignored).`],
    range: { x: [0, 3], y: [0, 1.3] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["V_{DS} / V", "I_{D} / mA"],
    curves: [{ expr: lin, domain: [0, Vov], colour: "a1", label: "triode", labelAt: [0.5, 0.42] }, { expr: `${Isat}+0*x`, domain: [Vov, 3], colour: "a2", label: "saturation", labelAt: [1.9, 1.1] }],
    marks: [{ x: Vov, to: Isat, label: "V_{GS} − V_{T}" }],
    checks: [{ type: "point", expr: lin, x: Vov, y: Isat, name: `the triode curve meets saturation at ${Isat} mA` }, { type: "max", expr: lin, domain: [0, Vov], x: Vov, y: Isat, name: "the triode current peaks exactly at pinch-off" }, { type: "point", expr: `0.5*${k}*(1.5-0.5)^2+0*x`, x: 0, y: Isat, name: "½k(V_GS − V_T)² = 1.0 mA" }],
  }); }

// u28-16 silicon photodiode responsivity R = ηλe/hc, η = 0.8, cut-off at hc/E_g
{ const eta = 0.8, Eg = 1.12, cut = 1239.84 / Eg, R = `${eta}*x/1239.84`, at850 = (eta * 850) / 1239.84;
  mk("u28-16", "phys-u28-photodiode-responsivity", "graph", {
    title: "Responsivity of a silicon photodiode",
    caption: `Each absorbed photon gives at most one electron, so the current per watt, R = ηλe/hc, grows with wavelength (longer-wavelength photons each carry less energy). With η = ${eta}, R = ${r(at850, 2)} A W⁻¹ at 850 nm. Beyond λ = hc/E_g = ${r(cut, 0)} nm photons cannot cross silicon's band gap and the response stops.`,
    alt: "Responsivity in amps per watt against wavelength, a straight line rising from 400 nanometres to a cut-off at about 1100 nanometres, with 0.55 at 850 marked.",
    description: [`R = η × λ (nm) / 1240 A W⁻¹, with η = ${eta}.`, `At 850 nm: ${r(at850, 3)} A W⁻¹.`, `Cut-off: 1240 / ${Eg} eV = ${r(cut, 0)} nm; no response beyond it.`, "Real silicon diodes fall off before the cut-off because absorption becomes weak near the gap (not shown)."],
    range: { x: [400, 1200], y: [0, 0.8] }, ticks: [[400, 600, 800, 1000, 1200], [0.2, 0.4, 0.6, 0.8]], height: [320, 300], xLabelBelow: true, axisLabels: ["wavelength / nm", "responsivity / A W⁻¹"],
    curves: [{ expr: R, domain: [400, cut], colour: "a1" }], marks: [{ x: cut, to: (eta * cut) / 1239.84, label: `cut-off ${r(cut, 0)} nm` }, { x: 850, to: at850 }],
    points: [{ x: 850, y: r(at850, 5), colour: "a2", label: `${r(at850, 2)} A W⁻¹ at 850 nm`, anchor: "end", dx: -10, dy: -10 }],
    checks: [{ type: "point", expr: R, x: 850, y: r(at850, 8), name: `${r(at850, 3)} A W⁻¹ at 850 nm` }, { type: "point", expr: "1239.84/1.12+0*x", x: 0, y: r(cut, 6), name: `cut-off at ${r(cut, 0)} nm` }],
  }); }

// u28-17 a 1.6 m² solar panel at 22% under 1000 W m⁻²
{ const P = 1.6 * 1000, out = 0.22 * P;
  mk("u28-17", "phys-u28-solar-panel", "sankey", {
    title: "Energy through a solar panel",
    caption: `The panel receives 1.6 m² × 1000 W m⁻² = ${P} W of sunlight. At 22% efficiency it delivers ${r(out, 0)} W of electrical power; the other ${r(P - out, 0)} W (about ${r(P - out, -1)} W) is reflected or becomes heat, mostly because photons above the band gap waste their excess energy and those below it are not absorbed.`,
    alt: "Energy flow diagram: 1600 watts of sunlight in, 352 watts of electrical power out and 1248 watts lost as heat and reflection.",
    description: [`Input: ${P} W of sunlight.`, `Electrical output: 0.22 × ${P} = ${r(out, 0)} W.`, `Losses: ${r(P - out, 0)} W.`],
    units: "W", input: { label: "sunlight", value: P }, outputs: [{ label: "electrical power", value: r(out, 2), useful: true }, { label: "heat and reflection", value: r(P - out, 2) }], efficiency: 0.22,
  }); }
