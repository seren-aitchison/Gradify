// Physics unit 01, Foundations of Physics: the worked example. Specs are written by scripts/diagrams/physics/u01.mjs.
//   [lessonId, renderer, diagramId, what it shows] | [lessonId, "lab", labId, what it lets you do] | [lessonId, null, reason]
const DEF = "a definition or classification that a picture would not teach";
const METHOD = "a calculation method or set of rules, taught by worked examples rather than a picture";
export default [
  ["u01-01", "scale", "phys-u01-scales-of-length", "lengths from the Planck length to the observable universe on one log scale, with the regime of each theory"],
  ["u01-02", null, DEF],
  ["u01-03", null, "a table of units and their definitions; a picture adds nothing to the table"],
  ["u01-04", null, METHOD],
  ["u01-05", "scale", "phys-u01-si-prefixes", "every 10^{3n} SI prefix at its power of ten, quecto to quetta"],
  ["u01-06", "vectors", "phys-u01-boat-velocity", "the boat-and-river worked example: 4.0 north + 3.0 east = 5.0 m s⁻¹ at 37° east of north, tip to tail"],
  ["u01-07", null, METHOD],
  ["u01-08", null, METHOD],
  ["u01-09", null, "a list of constants and their values"],
  ["u01-10", null, "the modelling cycle is a short list of steps; a cycle graphic would only decorate it"],
  ["u01-11", "vectors", "phys-u01-tennis-ball-5", "free-body diagram of the tennis ball at 5 m s⁻¹: drag about 4% of the weight, so it can be neglected"],
  ["u01-11", "vectors", "phys-u01-tennis-ball-30", "the same ball at 30 m s⁻¹: drag exceeds the weight, the idealisation fails"],
  ["u01-12", "graph", "phys-u01-decay-fluctuations", "N₀e^{−λt} against a random run of 10 nuclei: deterministic for large N, probabilistic for few"],
  ["u01-13", "sankey", "phys-u01-collision-energy", "the sticking-trolleys example: 9.0 J of kinetic energy becomes 6.0 J kinetic + 3.0 J heat and sound"],
  ["u01-14", null, "Noether's theorem and kinds of symmetry are abstract correspondences, not pictures"],
  ["u01-15", null, DEF],
  ["u01-16", null, "a history of the failures of classical physics; each is drawn in its own unit (black body u20, photoelectric u20, spectra u21)"],
  ["u01-17", null, "the micro/macro distinction is conceptual; particle pictures belong to kinetic theory (u12, u13)"],
  ["u01-18", null, "measurement uncertainty is drawn in u03 (error bars, accuracy and precision)"],
  ["u01-19", null, "reasoning and falsifiability are argument, not a picture"],
];
