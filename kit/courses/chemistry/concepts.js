// SciGradify Chemistry's concept graph: what each module builds on (kit/learning/concepts.js reads it). Keys and
// values are "<school id>/<module>". A prerequisite is listed only where a learner genuinely needs it to follow the
// module, not wherever it's mentioned. Written from the lessons' content; like the lessons, it awaits review by a
// chemistry teacher or lecturer. The chapter links (kit/learning/chapter-map.js) must agree with it: every school a
// module here builds on is one its school builds on there (tests/concepts.test.mjs checks this).
const MAT = "u01/Matter", AFE = "u01/Atoms, formulae and equations", MOLE = "u01/The mole and stoichiometry", SOL = "u01/Solutions and measurement";
const NUC = "u02/The nuclear atom", ORB = "u02/Electrons and orbitals", SPEC = "u02/Energies and spectra", QATOM = "u02/The quantum atom";
const PT = "u03/The periodic table", BLOCKS = "u03/Blocks of the table", GROUPS = "u03/The groups", TRANS = "u03/Transition and inner transition elements", TRENDS = "u03/Periodic trends";
const TYPES = "u04/Types of bond", DRAW = "u04/Drawing molecules", SHAPE = "u04/Shape and polarity", IMF = "u04/Intermolecular forces", BLE = "u04/Bond and lattice energies", BTH = "u04/Bonding theories", SOLID4 = "u04/Solids";
const GAS = "u05/Gases", LIQ = "u05/Liquids and phase changes", SOLID5 = "u05/Solids", SOLN = "u05/Solutions";
const EC = "u06/Energy changes", ENTH = "u06/Enthalpy", ENT = "u06/Entropy and free energy", LAWS = "u06/The laws of thermodynamics";
const RATES = "u07/Rates and collisions", CAT = "u07/Catalysis", RATELAW = "u07/Rate laws", TEMP = "u07/Temperature and mechanism";
const EQ = "u08/Equilibrium", SHIFT = "u08/Shifting equilibrium", EQP = "u08/Equilibrium in practice";
const ABT = "u09/Acid-base theories", PH = "u09/Strength and pH", TIT = "u09/Titrations", SCE = "u09/Solubility and complex equilibria";
const REDOX = "u10/Redox", CELLS = "u10/Electrochemical cells", ELYS = "u10/Electrolysis";
const MAIN = "u11/Main-group chemistry", COORD = "u11/Coordination chemistry";
const CH = "u12/Carbon and hydrocarbons", NFG = "u12/Naming and functional groups", ISO = "u12/Isomerism", CHIR = "u12/Chirality and stereochemistry", ORX = "u12/Organic reactions";
const MB = "u13/Mechanism basics", SE = "u13/Substitution and elimination", ADD = "u13/Addition and aromatic substitution", RO = "u13/Redox and other reaction types", SEL = "u13/Selectivity";
const OXY = "u14/Oxygen-containing groups", NHS = "u14/Nitrogen, halogen and sulfur compounds", SYN = "u14/Synthesis";
const PRIN = "u15/Principles of analysis", SPEC15 = "u15/Spectroscopy", MS = "u15/Mass spectrometry", CHROM = "u15/Chromatography";
const QC = "u16/Quantum chemistry", SP16 = "u16/Spectroscopy", STAT = "u16/Statistical thermodynamics";
const IND = "u17/Industrial chemistry";
const DT = "u18/Drugs and targets", MR = "u18/Molecular recognition", HIT = "u18/From hit to drug candidate", PK = "u18/Pharmacokinetics", DDM = "u18/Drug design methods";
const SAFE = "u19/Safety and planning", CORE = "u19/Core techniques", YPM = "u19/Yield, purity and monitoring", SPLAN = "u19/Synthesis planning";
const REP = "u20/Representing molecules", DBV = "u20/Databases and visualisation", CFF = "u20/Conformations and force fields";

export const CONCEPTS = {
  modules: {
    // School 1: foundations
    [AFE]: [MAT],
    [MOLE]: [AFE],
    [SOL]: [MOLE],
    // School 2: atomic structure
    [NUC]: [AFE],
    [ORB]: [NUC],
    [SPEC]: [ORB],
    [QATOM]: [ORB, SPEC],
    // School 3: the periodic table
    [PT]: [NUC],
    [BLOCKS]: [PT, ORB],
    [GROUPS]: [BLOCKS],
    [TRANS]: [BLOCKS],
    [TRENDS]: [PT, SPEC],
    // School 4: bonding and structure
    [TYPES]: [TRENDS],
    [DRAW]: [TYPES],
    [SHAPE]: [DRAW],
    [IMF]: [SHAPE],
    [BLE]: [TYPES, SPEC],
    [BTH]: [SHAPE, QATOM],
    [SOLID4]: [TYPES],
    // School 5: states of matter
    [GAS]: [MOLE],
    [LIQ]: [IMF],
    [SOLID5]: [SOLID4],
    [SOLN]: [SOL, IMF],
    "u05/Transport and surface properties": [IMF, LIQ],
    // School 6: energetics and thermodynamics
    [EC]: [AFE],
    [ENTH]: [EC, MOLE, BLE],
    [ENT]: [ENTH],
    [LAWS]: [ENT],
    // School 7: kinetics
    [RATES]: [EC, GAS],
    [CAT]: [RATES],
    [RATELAW]: [RATES, SOL],
    [TEMP]: [RATELAW, CAT],
    // School 8: equilibrium
    [EQ]: [SOL, GAS],
    [SHIFT]: [EQ, EC],
    [EQP]: [SHIFT, ENT],
    // School 9: acids, bases and aqueous chemistry
    [ABT]: [AFE, TYPES],
    [PH]: [ABT, EQ],
    "u09/Buffers": [PH],
    [TIT]: [PH],
    [SCE]: [PH, SOLN],
    // School 10: redox and electrochemistry
    [REDOX]: [AFE, TRENDS],
    [CELLS]: [REDOX, ENT, EQ],
    [ELYS]: [REDOX, MOLE],
    "u10/Applied electrochemistry": [CELLS, ELYS],
    // School 11: inorganic chemistry
    [MAIN]: [GROUPS, TYPES],
    [COORD]: [TRANS, TYPES],
    "u11/Bonding and properties of complexes": [COORD, QATOM],
    "u11/Organometallics and catalysis": [COORD, CAT],
    "u11/Applied inorganic chemistry": [MAIN, REDOX],
    "u11/f-block chemistry": [TRANS],
    // School 12: organic foundations
    [CH]: [TYPES, SHAPE],
    [NFG]: [CH],
    [ISO]: [NFG],
    [CHIR]: [ISO],
    [ORX]: [NFG],
    // School 13: mechanisms (energy profiles come from School 7's reaction profiles)
    [MB]: [ORX, SHAPE, RATES],
    [SE]: [MB, CHIR],
    [ADD]: [MB],
    [RO]: [MB, REDOX],
    [SEL]: [SE, ADD],
    // School 14: functional groups
    [OXY]: [SE, ADD, RO],
    [NHS]: [SE, ABT],
    "u14/Carbonyl and heterocyclic chemistry": [OXY, ADD],
    [SYN]: [OXY, NHS, SEL],
    // School 15: analysis and spectroscopy (titrimetry builds on School 9's titrations)
    [PRIN]: [SOL, TIT],
    [SPEC15]: [NFG, SPEC],
    [MS]: [NFG, NUC],
    "u15/Other techniques": [SPEC15, SOLID4],
    [CHROM]: [IMF, MS],
    "u15/Structure and validation": [SPEC15, MS, PRIN],
    // School 16: physical chemistry
    [QC]: [QATOM, BTH],
    [SP16]: [QC, SPEC],
    [STAT]: [LAWS, QC],
    "u16/Kinetics and surfaces": [TEMP, IMF],
    "u16/Photochemistry and molecular interactions": [SP16, IMF],
    // School 17: materials, environmental and industrial chemistry (industry leans on School 7's catalysts)
    "u17/Materials": [SOLID5, ADD],
    "u17/Environmental chemistry": [GAS, SCE],
    [IND]: [EQP, CAT],
    "u17/Sustainability": [IND, MOLE],
    // School 18: medicinal chemistry
    [DT]: [NFG],
    [MR]: [DT, IMF, CHIR],
    [HIT]: [MR, SOLN],
    [PK]: [HIT, RO],
    [DDM]: [MR],
    "u18/Prodrugs, formulation and computation": [PK, DDM],
    // School 19: synthesis and the laboratory
    [SAFE]: [MOLE],
    [CORE]: [SAFE, CHROM],
    [YPM]: [CORE],
    [SPLAN]: [SYN],
    "u19/Good practice": [SPLAN, YPM],
    // School 20: computational chemistry (molecules are written down with School 12's functional groups)
    [REP]: [NFG],
    [DBV]: [REP],
    [CFF]: [ISO, IMF],
    "u20/Quantum chemical methods": [QC],
    "u20/Simulation": [CFF, STAT],
    "u20/Docking and screening": [CFF, IMF],
    "u20/Cheminformatics and machine learning": [REP, DBV],
    "u20/Data and reproducibility": [DBV],
  },
};
