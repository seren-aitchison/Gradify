// Reference data for chemistry diagrams. A trend chart (renderer "trend") names a dataset and the build checks every
// value it draws against the entry here, so a mistyped number fails instead of reaching a learner. Each dataset
// records its source; values are as the source gives them, rounded as stated.
export const DATA = {
  ie1: {
    name: "first ionisation energy", unit: "kJ mol⁻¹",
    source: "NIST Atomic Spectra Database ionisation energies, converted from eV and rounded to 1 kJ mol⁻¹ (beryllium, 899.50, is quoted as 899 as in the lessons)",
    values: { H: 1312, He: 2372, Li: 520, Be: 899, B: 801, C: 1086, N: 1402, O: 1314, F: 1681, Ne: 2081, Na: 496, Mg: 738, Al: 578,
      Si: 787, P: 1012, S: 1000, Cl: 1251, Ar: 1521, K: 419, Ca: 590, Rb: 403, Sr: 550, Cs: 376, Ba: 503 },
  },
  ieAl: {
    name: "successive ionisation energies of aluminium", unit: "kJ mol⁻¹",
    source: "CRC Handbook of Chemistry and Physics, ionisation energies of the elements, rounded to 1 kJ mol⁻¹",
    values: { 1: 578, 2: 1817, 3: 2745, 4: 11577, 5: 14842, 6: 18379, 7: 23326, 8: 27465, 9: 31853, 10: 38473, 11: 42647, 12: 201266, 13: 222316 },
  },
  ea1: {
    name: "first electron affinity (enthalpy change)", unit: "kJ mol⁻¹",
    source: "CRC Handbook of Chemistry and Physics, electron affinities, as enthalpy changes rounded to 1 kJ mol⁻¹",
    values: { Na: -53, Al: -42, Si: -134, P: -72, S: -200, Cl: -349 },
  },
  enPauling: {
    name: "Pauling electronegativity", unit: "",
    source: "CRC Handbook of Chemistry and Physics, Pauling electronegativities",
    values: { H: 2.20, Li: 0.98, Be: 1.57, B: 2.04, C: 2.55, N: 3.04, O: 3.44, F: 3.98, Na: 0.93, Mg: 1.31, Al: 1.61, Si: 1.90,
      P: 2.19, S: 2.58, Cl: 3.16, Br: 2.96, I: 2.66, K: 0.82 },
  },
  radiusAtomic: {
    name: "atomic radius (metallic radius for metals, covalent radius for non-metals)", unit: "pm",
    source: "Royal Society of Chemistry periodic table data, as used in A level data booklets",
    values: { Li: 152, Na: 186, K: 231, Rb: 244, Cs: 262, Mg: 160, Al: 143, Si: 117, P: 110, S: 104, Cl: 99 },
  },
  radiusIonic: {
    name: "ionic radius, six-coordinate", unit: "pm",
    source: "Shannon R. D., Acta Crystallographica A32, 751–767 (1976), six-coordinate radii rounded to 1 pm",
    values: { "O2-": 140, "F-": 133, "Na+": 102, "Mg2+": 72, "Al3+": 54 },
  },
  radiusLn3: {
    name: "Ln³⁺ ionic radius, six-coordinate", unit: "pm",
    source: "Shannon R. D., Acta Crystallographica A32, 751–767 (1976), six-coordinate radii",
    values: { La: 103.2, Ce: 101, Pr: 99, Nd: 98.3, Pm: 97, Sm: 95.8, Eu: 94.7, Gd: 93.8, Tb: 92.3, Dy: 91.2, Ho: 90.1, Er: 89, Tm: 88, Yb: 86.8, Lu: 86.1 },
  },
  mpGroup1: {
    name: "melting point", unit: "°C", source: "CRC Handbook of Chemistry and Physics, physical constants of the elements",
    values: { Li: 180.5, Na: 97.8, K: 63.5, Rb: 39.3, Cs: 28.5 },
  },
  bpHalogens: {
    name: "boiling point", unit: "°C", source: "CRC Handbook of Chemistry and Physics, rounded to 1 °C",
    values: { F2: -188, Cl2: -34, Br2: 59, I2: 184 },
  },
  bpNoble: {
    name: "boiling point", unit: "°C", source: "CRC Handbook of Chemistry and Physics, rounded to 1 °C",
    values: { He: -269, Ne: -246, Ar: -186, Kr: -153, Xe: -108, Rn: -62 },
  },
  bpHydrides: {
    name: "boiling point", unit: "°C", source: "CRC Handbook of Chemistry and Physics, rounded to 1 °C",
    values: { CH4: -162, SiH4: -112, GeH4: -88, SnH4: -52, NH3: -33, PH3: -88, AsH3: -62, SbH3: -17,
      H2O: 100, H2S: -60, H2Se: -41, H2Te: -2, HF: 20, HCl: -85, HBr: -67, HI: -35 },
  },
  bpAlkanes: {
    name: "boiling point", unit: "°C", source: "CRC Handbook of Chemistry and Physics, rounded to 1 °C",
    values: { methane: -162, ethane: -89, propane: -42, butane: -1, pentane: 36, hexane: 69, heptane: 98, octane: 126 },
  },
  latticeNaX: {
    name: "lattice enthalpy (formation of the lattice from gaseous ions)", unit: "kJ mol⁻¹",
    source: "CRC Handbook of Chemistry and Physics, lattice energies from Born–Haber cycles (NaCl as the lesson's own Born–Haber cycle gives it, −787; CRC −786)",
    values: { NaF: -923, NaCl: -787, NaBr: -747, NaI: -704 },
  },
  e0: {
    name: "standard electrode potential", unit: "V",
    source: "CRC Handbook of Chemistry and Physics, electrochemical series (reduction potentials at 298 K)",
    values: { "F2/F-": 2.87, "Cl2/Cl-": 1.36, "Br2/Br-": 1.09, "I2/I-": 0.54, "Li+/Li": -3.04, "K+/K": -2.93, "Ca2+/Ca": -2.87,
      "Na+/Na": -2.71, "Mg2+/Mg": -2.37, "Al3+/Al": -1.66, "Zn2+/Zn": -0.76, "Fe2+/Fe": -0.44, "Ni2+/Ni": -0.26, "Sn2+/Sn": -0.14,
      "Pb2+/Pb": -0.13, "H+/H2": 0.00, "Cu2+/Cu": 0.34, "Ag+/Ag": 0.80, "Au3+/Au": 1.50, "O2/H2O": 1.23, "O2/OH-": 0.40,
      "Fe3+/Fe2+": 0.77, "MnO4-/Mn2+": 1.51, "Cr2O7 2-/Cr3+": 1.33, "Li+/LiC6": -3.04 },
  },
  maxOxP3: {
    name: "highest oxidation state", unit: "", source: "from the group number: the number of outer-shell electrons",
    values: { Na: 1, Mg: 2, Al: 3, Si: 4, P: 5, S: 6, Cl: 7 },
  },
  eFactor: {
    name: "E-factor (kg waste per kg product), upper end of the typical range", unit: "kg kg⁻¹",
    source: "Sheldon R. A., Green Chemistry 9, 1273–1283 (2007), Table 1",
    values: { "oil refining": 0.1, "bulk chemicals": 5, "fine chemicals": 50, "pharmaceuticals": 100 },
  },
};
