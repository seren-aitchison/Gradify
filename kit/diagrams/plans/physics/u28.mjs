// Physics unit 28 diagram plan: rows per kit/diagrams/BUILDERS.md, one or more per written lesson (u28-MM).
// Specs are written by scripts/diagrams/physics/u28.mjs.
const CALC = "a calculation method, carried by the worked example; a picture would not add to it";
const ARG = "an argument or explanation, carried in the text";
export default [
  ["u28-01", null, "needs renderer: band diagrams (valence band, gap, conduction band) for metals, semiconductors and insulators"],
  ["u28-02", null, CALC],
  ["u28-03", null, CALC],
  ["u28-04", null, CALC],
  ["u28-05", null, CALC],
  ["u28-06", null, "needs renderer: a band diagram with the Fermi level moving with doping"],
  ["u28-07", null, CALC],
  ["u28-08", null, CALC],
  ["u28-09", null, "needs renderer: a p–n junction with its depletion region and bent bands"],
  ["u28-10", "graph", "phys-u28-diode-iv", "the diode's exponential I–V: 1 mA at 0.60 V, 10.2 mA at 0.66 V"],
  ["u28-11", null, CALC],
  ["u28-12", null, CALC],
  ["u28-13", null, ARG],
  ["u28-14", "graph", "phys-u28-mosfet-output", "I_D against V_DS: triode, then saturation at 1.0 mA from V_DS = V_GS − V_T"],
  ["u28-15", null, ARG],
  ["u28-16", "graph", "phys-u28-photodiode-responsivity", "silicon responsivity ηλ/1240: 0.55 A W⁻¹ at 850 nm, cut-off at 1107 nm"],
  ["u28-17", "sankey", "phys-u28-solar-panel", "1600 W of sunlight into 352 W of electrical power at 22%"],
  ["u28-18", null, CALC],
  ["u28-19", null, CALC],
  ["u28-20", null, CALC],
  ["u28-21", null, ARG],
  ["u28-22", null, "needs renderer: a tunnel diode I–V with its negative-resistance region"],
  ["u28-23", null, CALC],
  ["u28-24", null, CALC],
  ["u28-25", null, CALC],
];
