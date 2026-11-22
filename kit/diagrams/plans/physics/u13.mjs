// Physics unit 13, Statistical Mechanics. Specs are written by scripts/diagrams/physics/u13.mjs.
//   [lessonId, renderer, diagramId, what it shows] | [lessonId, "lab", labId, what it lets you do] | [lessonId, null, reason]
const DEF = "a definition or list of results that a picture would not teach";
const METHOD = "a derivation or calculation taught by the worked example rather than a picture";
export default [
  ["u13-01", null, "needs renderer: a bar chart of counts (the 4-coin microstates 1, 4, 6, 4, 1) with a binomial check; the graph renderer has no bars"],
  ["u13-02", null, DEF],
  ["u13-03", "graph", "phys-u13-two-level-energy", "the two-level worked example: ⟨E⟩ = ε/(e^{ε/kT} + 1), rising to ε/2 and no further"],
  ["u13-04", "graph", "phys-u13-boltzmann-balmer", "the stellar-hydrogen example: N₂/N₁ = 4e^{−ΔE/kT} against T, 3 × 10⁻⁵ at 10 000 K"],
  ["u13-05", "graph", "phys-u13-maxwell-o2-h2", "the O₂ and H₂ example: two normalised speed distributions at 300 K, v_rms ratio 4"],
  ["u13-05", "lab", "gas", "change temperature and see the speed distribution"],
  ["u13-06", "graph", "phys-u13-oscillator-energy", "the oscillator example: ⟨E⟩ from zero-point ½ħω up to k_BT"],
  ["u13-07", null, METHOD],
  ["u13-08", null, METHOD],
  ["u13-09", "lab", "gas", "see equipartition in the energy of the molecules as temperature changes"],
  ["u13-10", "lab", "gas", "a classical gas: change N, V and T"],
  ["u13-11", null, METHOD],
  ["u13-12", "lab", "gas", "the speed distribution of the gas molecules"],
  ["u13-13", null, METHOD],
  ["u13-14", "graph", "phys-u13-fermi-sodium", "the sodium example: f(E) is a near-step at E_F = 3.1 eV, blurred only over a few kT at 300 K"],
  ["u13-15", null, "a short argument that photon number is not conserved; no number to draw"],
  ["u13-16", null, METHOD],
  ["u13-17", null, METHOD],
  ["u13-18", "graph", "phys-u13-planck-sun", "Planck curves at 5000, 5800 and 6500 K with Wien peaks; the Sun's 500 nm gives 5800 K"],
  ["u13-19", null, METHOD],
  ["u13-20", null, "Landau free-energy plots need a symbolic order-parameter graph; the lesson's example is a power-law exponent, not a numeric plot"],
  ["u13-21", null, "a table of critical exponents and universality classes"],
  ["u13-22", null, METHOD],
  ["u13-23", null, "the decimation example is a single identity, tanh K′ = tanh²K; flow diagrams need a dedicated renderer"],
  ["u13-24", null, "a dimension-counting argument, not a picture"],
  ["u13-25", "graph", "phys-u13-metropolis-acceptance", "the spin-flip example: acceptance probability e^{−ΔE/kT}, 0.135 at ΔE = 2kT"],
  ["u13-26", "graph", "phys-u13-brownian-msd", "the Brownian example: ⟨r²⟩ = 6Dt grows linearly, 12 μm² after 10 s"],
];
