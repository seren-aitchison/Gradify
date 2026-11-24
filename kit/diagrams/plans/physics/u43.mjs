// Physics unit 43 diagram plan: rows per kit/diagrams/BUILDERS.md, one or more per written lesson (u43-MM).
// Specs are written by scripts/diagrams/physics/u43.mjs.
const CALC = "a calculation method, carried by the worked example; a picture would not add to it";
const ARG = "an argument or explanation, carried in the text";
export default [
  ["u43-01", null, CALC],
  ["u43-02", "graph", "phys-u43-dead-time", "a GM counter with τ = 100 μs: reading 2000 counts/s means a true rate of 2500, and no reading can pass 1/τ"],
  ["u43-03", "graph", "phys-u43-compton-edge", "recoil-electron energy against scattering angle for 662 keV: the Compton edge at 478 keV"],
  ["u43-04", null, CALC],
  ["u43-05", null, ARG],
  ["u43-06", null, ARG],
  ["u43-07", null, ARG],
  ["u43-08", null, ARG],
  ["u43-09", null, CALC],
  ["u43-10", "graph", "phys-u43-tof-separation", "pion–kaon flight-time difference over 3.7 m: 1.39 ns at 1 GeV, falling as 1/p²"],
  ["u43-11", "graph", "phys-u43-beta-momentum", "β against p for pion, kaon and proton: 0.963 and 0.470 at 0.5 GeV"],
  ["u43-12", null, ARG],
  ["u43-13", null, ARG],
  ["u43-14", null, CALC],
  ["u43-15", "graph", "phys-u43-calibration", "the straight-line calibration through 662 keV at ADC 1650 and 1332 keV at 3240"],
  ["u43-16", null, ARG],
  ["u43-17", null, ARG],
  ["u43-18", null, ARG],
  ["u43-19", "graph", "phys-u43-significance", "S/√B against the Asimov significance for B = 16: 6.25 against 5.2 at S = 25"],
];
