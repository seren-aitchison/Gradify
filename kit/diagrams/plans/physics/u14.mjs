// Physics unit 14, Heat Transfer and Thermal Physics. Specs are written by scripts/diagrams/physics/u14.mjs.
//   [lessonId, renderer, diagramId, what it shows] | [lessonId, "lab", labId, what it lets you do] | [lessonId, null, reason]
const DEF = "a definition or list of properties that a picture would not teach";
const FORMULA = "a one-line formula whose worked example is a single substitution; a graph would add nothing";
export default [
  ["u14-01", "graph", "phys-u14-copper-rod", "the copper-rod example: a straight temperature profile, 100 to 20 °C over 0.5 m, giving 6.4 W"],
  ["u14-02", null, FORMULA],
  ["u14-03", null, "the person's net radiation is one T⁴ difference; the Stefan–Boltzmann law lessons (u14-06, u13-18) carry the pictures"],
  ["u14-04", "graph", "phys-u14-penetration-depth", "the soil example: temperature swing decays as e^{−z/δ}, δ = 0.12 m daily and about 2.2 m annually"],
  ["u14-05", "graph", "phys-u14-coffee-cooling", "the coffee example: exponential cooling from 90 °C, 60 °C at 10 min, 40 °C at 22.4 min"],
  ["u14-06", null, FORMULA],
  ["u14-07", "graph", "phys-u14-wien-star", "the 290 nm star: the Planck curve for 10 000 K peaks at 290 nm, in the ultraviolet"],
  ["u14-08", null, FORMULA],
  ["u14-09", "graph", "phys-u14-counterflow", "the counterflow example: oil and water temperature lines with gaps of 80 K and 70 K, ΔT_lm = 74.9 K"],
  ["u14-10", null, "needs renderer: a layered wall with a temperature profile through series thermal resistances; the lesson's numbers give R only, no temperatures"],
  ["u14-11", null, "the worked example's selective-surface result (634 K) does not follow from 0.1σT⁴ = 950 (640 K), so no diagram can recompute it; reported for the notes owner"],
  ["u14-12", null, "Kirchhoff's law and a table of emissivities; the thermal-camera example is one ratio"],
  ["u14-13", null, "forcing from CO₂ is a logarithm formula; the greenhouse layer model needs a radiation-balance renderer"],
  ["u14-14", null, DEF],
  ["u14-15", null, "needs renderer: a Peltier energy flow with two inputs (20 W from the cold side and 40 W electricity) and one output of 60 W; the sankey narrow layout fails without a waste output"],
  ["u14-16", null, FORMULA],
  ["u14-17", null, DEF],
  ["u14-18", null, DEF],
  ["u14-19", null, "a comparison of mechanisms in words; no worked numbers"],
  ["u14-20", null, "an engineering survey of cooling methods; no numbers to draw"],
];
