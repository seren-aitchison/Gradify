// Physics unit 24 diagram plan: rows per kit/diagrams/BUILDERS.md, one or more per written lesson (u24-MM).
// Specs are written by scripts/diagrams/physics/u24.mjs.
const LIST = "a list or classification that a picture would not teach";
const CALC = "a calculation method, carried by the worked example; a picture would not add to it";
const TABLE = "needs renderer particle-table: the fermions in three generations with charge, spin and mass, and the bosons that act on them (a labelled grid of cells)";
const FEYN = "needs renderer feynman: lines and vertices (fermion arrows, wavy photon or W, curly gluon, dashed Higgs) with charge and quantum numbers checked at each vertex";
export default [
  ["u24-01", null, LIST],
  ["u24-02", null, TABLE],
  ["u24-03", null, LIST],
  ["u24-04", "scale", "phys-u24-interaction-strengths", "the four interactions on one log scale: strong 1, electromagnetic 1/137, weak 10⁻⁶, gravity 10⁻³⁸"],
  ["u24-05", null, FEYN.replace("lines", "Compton scattering and e⁺e⁻ → γγ: lines")],
  ["u24-06", null, FEYN.replace("lines", "neutron beta decay at the quark level, d → u + W⁻ → e⁻ ν̄ₑ: lines")],
  ["u24-07", null, "needs renderer string-breaking: a gluon flux tube stretching and snapping into a quark-antiquark pair, and a jet of hadrons (energy in the tube against separation)"],
  ["u24-08", "scale", "phys-u24-energy-ladder", "energies from the proton mass to the Planck energy: the LHC is about 10¹² below the unification scale and 10¹⁵ below the Planck energy"],
  ["u24-09", null, TABLE],
  ["u24-10", "scale", "phys-u24-fermion-masses", "the masses of the nine charged fermions and the neutrino limit on one log scale, about 5.5 orders from electron to top"],
  ["u24-11", null, "the worked example is the sum N_c Σq² = 2; the lesson gives no thresholds or other plateau values to draw, and the colour-factor argument is carried by the text"],
  ["u24-12", null, "needs renderer multiplet: the baryon octet and decuplet and the meson nonet as strangeness-charge weight diagrams with quark content"],
  ["u24-13", "nuclear", "phys-u24-annihilation", "e⁻ + e⁺ → γ + γ: charge conserved, and 2 × 0.511 MeV = 1.022 MeV released"],
  ["u24-14", "graph", "phys-u24-pion-survival", "pions with γ = 10: the fraction surviving against distance, 1/e at 78 m, ten times the 7.8 m a pion would go without time dilation"],
  ["u24-15", null, "needs renderer reaction-ledger: a reaction with charge, baryon number, lepton number and strangeness totalled on each side, flagging the one that fails"],
  ["u24-16", null, FEYN.replace("lines", "Møller scattering, e⁺e⁻ → μ⁺μ⁻ and Compton scattering with the vertex count and amplitude order: lines")],
  ["u24-17", null, "needs renderer feynman: the vacuum-polarisation loop that makes α run (and the electron-photon vertex); the numbers are in the text"],
  ["u24-18", null, "needs renderer string-breaking: see u24-07; the text's confinement argument is about the energy stored in the flux tube"],
  ["u24-19", null, CALC],
  ["u24-20", "graph", "phys-u24-higgs-potential", "V = −μ²φ² + λφ⁴ in units of λv⁴: a hump at φ = 0 and minima at ±v/√2, depth −1/4"],
  ["u24-21", null, "needs renderer bars: the Higgs branching fractions bb̄ 58%, WW* 21%, ττ 6%, γγ 0.2% and the rest as bars summing to 100%"],
  ["u24-22", "graph", "phys-u24-oscillation-probability", "P(νμ → ντ) against L/E for Δm² = 2.5 × 10⁻³ eV²: first maximum at about 495 km GeV⁻¹, close to T2K's 295 km at 0.6 GeV"],
  ["u24-23", null, "CP violation is an argument about asymmetries (10⁻²⁰ against 10⁻¹⁰) with no geometry to draw; the Sakharov conditions are a list"],
  ["u24-24", null, "the symmetric-potential picture is drawn in u24-20; the pion-mass argument is carried by the text"],
  ["u24-25", "graph", "phys-u24-bending-radius", "bending radius r = p/(eB) against momentum: 2.8 km for a 7 TeV proton in 8.3 T, half that in twice the field"],
  ["u24-26", "graph", "phys-u24-collider-energy", "√s against beam energy: a collider gives 2E (14 TeV from 7 TeV beams), a fixed target only √(2Emc²) ≈ 115 GeV"],
  ["u24-27", null, "needs renderer detector-section: concentric tracker, calorimeters and muon chambers with the paths of an electron, photon, muon, hadron and neutrino; the p = 0.3BR example is a calculation"],
  ["u24-28", null, CALC],
  ["u24-29", null, LIST],
  ["u24-30", null, "the coupling-unification plot is needed in u24-31 (renderer missing)"],
  ["u24-31", null, "needs renderer running-couplings: the three inverse couplings against energy, nearly meeting near 10¹⁴–10¹⁶ GeV in the Standard Model and meeting in minimal supersymmetry (the lesson gives no coupling values, only the energies)"],
  ["u24-32", null, "an argument about backgrounds and underground depth, carried in the text"],
  ["u24-33", null, LIST],
];
