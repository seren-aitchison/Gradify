// Physics unit 36 diagram plan: rows per kit/diagrams/BUILDERS.md, one or more per written lesson (u36-MM).
// Specs are written by scripts/diagrams/physics/u36.mjs.
const CALC = "a calculation method, carried by the worked example; a picture would not add to it";
const ARG = "an argument or explanation, carried in the text";
export default [
  ["u36-01", null, CALC],
  ["u36-02", null, CALC],
  ["u36-03", null, "needs renderer: rays leaving an LED chip, with the escape cone set by total internal reflection"],
  ["u36-04", null, CALC],
  ["u36-05", "graph", "phys-u36-mzm-transfer", "a Mach–Zehnder modulator's cos² transfer: 0.5 at 1.5 V, off at V_π = 3 V"],
  ["u36-06", null, CALC],
  ["u36-07", null, CALC],
  ["u36-08", "graph", "phys-u36-fibre-loss", "0.2 dB km⁻¹: 1 mW at the start, 10 μW after 100 km"],
  ["u36-09", null, CALC],
  ["u36-10", null, CALC],
  ["u36-11", null, CALC],
  ["u36-12", "graph", "phys-u36-pulse-broadening", "a 20 fs pulse broadened to 54 fs by 360 fs² of dispersion"],
  ["u36-13", null, ARG],
  ["u36-14", null, ARG],
  ["u36-15", null, CALC],
  ["u36-16", null, ARG],
  ["u36-17", null, CALC],
  ["u36-18", null, CALC],
  ["u36-19", null, CALC],
  ["u36-20", null, CALC],
  ["u36-21", null, CALC],
];
