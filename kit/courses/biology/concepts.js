// SciGradify Biology's concept graph: what each module builds on (kit/learning/concepts.js reads it). Keys and values
// are "<school id>/<module>". A prerequisite is listed only where a learner genuinely needs it to follow the module,
// not wherever it's mentioned. Written from the lessons' content; like the lessons, it awaits review by a biology
// teacher or lecturer. The chapter links (kit/learning/chapter-map.js) must agree with it: every school a module here
// builds on is one its school builds on there (tests/concepts.test.mjs checks this).
const LW = "u01/The living world", CL = "u01/Classifying life", SM = "u01/The scientific method", MD = "u01/Measurement and data", ETH = "u01/Ethics in research";
const CELLS = "u02/Cells and cell types", ORG = "u02/Organelles", MEMB = "u02/Membranes and transport", SPEC = "u02/Specialisation and communication";
const WATER = "u03/Water and the chemistry of life", CARB = "u03/Carbohydrates", PROT = "u03/Proteins", ENZ = "u03/Enzymes", NUC = "u03/Nucleic acids and energy";
const DNA = "u04/DNA and genomes", G2P = "u04/From gene to protein", REG = "u04/Gene regulation", MUT = "u04/Mutation and DNA damage", INH = "u04/Patterns of inheritance", POP = "u04/Populations and genomics";
const CYC = "u05/The cell cycle and division", CTRL = "u05/Control and cell death", CANCER = "u05/Cancer", STEM = "u05/Stem cells and early development";
const ENS = "u06/Evidence and natural selection", SRC = "u06/Sources of evolutionary change", SF = "u06/Selection and fitness", SPEC6 = "u06/Speciation", PHY = "u06/Phylogenetics and ancestry";
const BOH = "u07/Body organisation and homeostasis", NE = "u07/Nervous and endocrine systems", CV = "u07/Cardiovascular system", DRR = "u07/Defence, reproduction and regulation";
const PS = "u08/Plant structure", NP = "u08/Nutrition and photosynthesis", HORM = "u08/Plant hormones and responses";
const BACT = "u09/Bacteria", VIR = "u09/Viruses", INF = "u09/Infection and disease";
const FI = "u10/Foundations of immunity", IC = "u10/Immune cells", ARS = "u10/Antigen recognition and signalling", ICM = "u10/Inflammation, complement and memory", ID = "u10/Immune disorders";
const OE = "u11/Organisms and ecosystems", EF = "u11/Energy flow", NC = "u11/Nutrient cycles", PI = "u11/Populations and interactions", CB = "u11/Communities and biodiversity";
const RDNA = "u12/Recombinant DNA", GEE = "u12/Gene editing and expression";
const DS = "u13/Data and sequences", GGE = "u13/Genomes and gene expression";
const DE = "u14/Designing experiments";

export const CONCEPTS = {
  modules: {
    // School 1: foundations
    [CL]: [LW],
    [MD]: [SM],
    [ETH]: [SM],
    // School 2: cells (membrane lessons introduce the phospholipids they need)
    [CELLS]: [LW, CL],
    [ORG]: [CELLS],
    [MEMB]: [ORG],
    [SPEC]: [ORG, MEMB],
    // School 3: biomolecules
    [WATER]: [LW],
    [CARB]: [WATER],
    "u03/Lipids": [WATER],
    [PROT]: [WATER],
    [ENZ]: [PROT],
    [NUC]: [CARB],
    // School 4: genetics and molecular biology
    [DNA]: [NUC, ORG],
    [G2P]: [DNA, PROT],
    [REG]: [G2P],
    [MUT]: [DNA, G2P],
    [INH]: [DNA],
    [POP]: [INH, MUT, MD],
    // School 5: cell division and development
    [CYC]: [DNA, ORG],
    [CTRL]: [CYC, SPEC],
    [CANCER]: [CTRL, MUT],
    [STEM]: [CYC, SPEC],
    "u05/Signalling, fate and regeneration": [STEM, REG],
    // School 6: evolution
    [ENS]: [INH, CL],
    [SRC]: [ENS, MUT, POP],
    [SF]: [ENS],
    [SPEC6]: [SRC, SF],
    [PHY]: [ENS, DNA],
    "u06/Evolution today": [SF, SRC],
    // School 7: human anatomy and physiology
    [BOH]: [SPEC],
    [NE]: [BOH, MEMB],
    [CV]: [BOH],
    "u07/Respiratory system": [CV, MEMB],
    "u07/Digestive system": [BOH, ENZ],
    "u07/Renal system": [BOH, MEMB],
    "u07/Movement and support": [NE, PROT],
    [DRR]: [NE, CV],
    // School 8: plants
    [PS]: [CELLS],
    "u08/Transport in plants": [PS, MEMB],
    [NP]: [PS, ENZ, NUC],
    [HORM]: [PS, SPEC],
    "u08/Plant reproduction": [PS],
    "u08/Stress and biotechnology": [HORM],
    // School 9: microbiology
    [BACT]: [CELLS, DNA],
    [VIR]: [G2P],
    "u09/Fungi, protozoa and archaea": [CELLS, CL],
    "u09/Microbes and their hosts": [BACT],
    [INF]: [BACT, VIR],
    "u09/Controlling microbes": [INF],
    "u09/Microbiology in practice": [BACT, MD],
    // School 10: immunology (cancer immunology builds on School 5's cancer biology)
    [FI]: [DRR, INF],
    [IC]: [FI, SPEC],
    [ARS]: [IC, PROT],
    [ICM]: [ARS],
    [ID]: [ICM],
    "u10/Clinical immunology": [ID, CANCER],
    // School 11: ecology
    [OE]: [LW, CL],
    [EF]: [OE],
    [NC]: [EF],
    [PI]: [OE, MD],
    [CB]: [PI, SPEC6],
    "u11/Conservation and environmental change": [CB, NC],
    // School 12: biotechnology
    [RDNA]: [DNA, BACT],
    "u12/Amplifying and reading DNA": [DNA],
    [GEE]: [RDNA, G2P],
    "u12/Medical biotechnology": [GEE, MUT],
    "u12/Industry, safety and ethics": [GEE, ETH],
    // School 13: bioinformatics (phylogenetic analysis builds on School 6's evolutionary trees)
    [DS]: [G2P],
    "u13/Alignment and phylogenetics": [DS, PHY],
    [GGE]: [DS, REG],
    "u13/Omics and structure": [DS, PROT],
    "u13/Networks and systems": [GGE],
    "u13/Genomic medicine and drug discovery": [POP, GGE],
    "u13/Data science and reproducibility": [DS, MD],
    // School 14: research methods (the techniques need cells, DNA and proteins)
    [DE]: [SM],
    "u14/Imaging and cell culture": [CELLS],
    "u14/Molecular and biochemical techniques": [DNA, PROT],
    "u14/Statistics and visualisation": [MD],
    "u14/Research practice and integrity": [DE, ETH],
  },
};
