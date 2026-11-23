// Physics unit 15, Electricity and Electrostatics. Specs are written by scripts/diagrams/physics/u15.mjs.
//   [lessonId, renderer, diagramId, what it shows] | [lessonId, "lab", labId, what it lets you do] | [lessonId, null, reason]
const DEF = "a definition or list of properties that a picture would not teach";
const FORMULA = "a one-line formula whose worked example is a single substitution; a picture would add nothing";
export default [
  ["u15-01", null, "charging by rubbing and counting electrons is arithmetic (5 nC ÷ e); no picture adds to it"],
  ["u15-02", null, "quantisation is shown by dividing the measured charges by 1.6 × 10⁻¹⁹ C; a list of numbers, not a graph"],
  ["u15-03", null, DEF],
  ["u15-04", "lab", "efield", "place charges and watch the force between them"],
  ["u15-05", "graph", "phys-u15-electron-deflection", "the electron example: a parabolic path, 1.1 cm sideways after 5 cm in a 2 × 10⁴ V m⁻¹ field"],
  ["u15-05", "lab", "efield", "move a test charge through a field and see the force"],
  ["u15-06", "field", "phys-u15-field-lines-2q-q", "the +2q and −q example: 20 lines leave, 10 end on −q, the rest escape; a null point beyond −q"],
  ["u15-06", "lab", "efield", "draw field lines and equipotentials of charge arrangements"],
  ["u15-07", "field", "phys-u15-potential-midpoint", "the +4 nC and −2 nC example: the potential at the midpoint is 180 V (scalar sum) while the field is the vector sum"],
  ["u15-07", "lab", "efield", "read the potential at any point of the field"],
  ["u15-08", "lab", "efield", "move charges and see the energy change"],
  ["u15-09", "lab", "efield", "see the potential difference between two points"],
  ["u15-10", "lab", "efield", "a dipole in the field"],
  ["u15-11", null, FORMULA],
  ["u15-12", "graph", "phys-u15-sphere-field", "the solid-sphere example: E rises linearly inside, peaks at the surface, falls as 1/r² outside"],
  ["u15-13", "graph", "phys-u15-ring-axis", "the ring example: the axial field is 3.2 kN C⁻¹ at z = 0.1 m, zero at the centre, peaking at a/√2"],
  ["u15-14", null, "the two-sphere example is a ratio, E ∝ 1/r; a graph of sphere fields would only restate it"],
  ["u15-15", "lab", "transients", "charge and discharge a capacitor"],
  ["u15-16", "lab", "efield", "plates and the field between them"],
  ["u15-17", null, "needs renderer: capacitor networks (series and parallel) with charge and voltage on each; the circuit renderer has cells and resistors only"],
  ["u15-18", null, FORMULA],
  ["u15-19", null, "a qualitative argument about polarisation; the worked example is a ratio"],
  ["u15-20", null, "needs renderer: a field crossing a dielectric boundary with the normal and tangential components"],
  ["u15-21", null, "a qualitative argument about shielding; no numbers to draw"],
  ["u15-22", null, "needs renderer: a charge and its image in a conducting plane"],
  ["u15-23", "graph", "phys-u15-poisson-slab", "the slab example: V = (ρ/2ε₀)x(d − x), a parabola with maximum ρd²/8ε₀ in the middle"],
  ["u15-24", null, "Laplace's equation is a method (separation, relaxation); no worked numbers to plot"],
];
