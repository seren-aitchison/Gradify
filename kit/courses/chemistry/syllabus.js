// SciGradify Chemistry: the full curriculum, 20 schools and every lesson in them, as given in the
// Chemistry brief (lesson titles verbatim). Schools are units to the course engine, grouped into modules
// ("> " lines) and into eight stages (TRACKS) so the learning map stays readable. Lesson ids are
// permanent (ids.js), u01-01 style, as for every Gradify course.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Foundations of Chemistry
> Matter
* What is chemistry?
* Matter and its classification
* Elements and compounds
* Mixtures
* Physical and chemical changes
* States of matter
> Atoms, formulae and equations
* Atomic theory
* Chemical symbols
* Chemical formulae
* Chemical equations
* Balancing equations
> The mole and stoichiometry
* Relative atomic mass
* Relative molecular mass
* The mole
* Avogadro's constant
* Molar mass
* Stoichiometry
* Limiting reagents
* Percentage yield
* Atom economy
> Solutions and measurement
* Concentration
* Dilutions
* Significant figures
* Scientific notation
* Units and measurements
2. Atomic Structure and Quantum Chemistry
> The nuclear atom
* Structure of the atom
* Protons, neutrons and electrons
* Isotopes
* Atomic number and mass number
> Electrons and orbitals
* Electron shells
* Atomic orbitals
* Quantum numbers
* Electron configurations
* Aufbau principle
* Pauli exclusion principle
* Hund's rule
> Energies and spectra
* Ionisation energy
* Electron affinity
* Atomic spectra
* Emission and absorption
> The quantum atom
* Wave-particle duality
* Quantum mechanical model
* Atomic orbitals and shapes
* Periodic trends
* Electronic structure and chemical properties
3. Periodic Table and Periodicity
> The periodic table
* Development of the periodic table
* Modern periodic law
* Periods and groups
> Blocks of the table
* s-block elements
* p-block elements
* d-block elements
* f-block elements
> The groups
* Group 1
* Group 2
* Group 13
* Group 14
* Group 15
* Group 16
* Group 17
* Group 18
> Transition and inner transition elements
* Transition metals
* Lanthanides
* Actinides
> Periodic trends
* Atomic radius
* Ionic radius
* Ionisation energy trends
* Electronegativity
* Reactivity trends
* Oxidation states
* Periodic relationships
4. Chemical Bonding and Molecular Structure
> Types of bond
* Introduction to chemical bonding
* Ionic bonding
* Covalent bonding
* Coordinate bonding
* Metallic bonding
> Drawing molecules
* Lewis structures
* Formal charge
* Resonance
> Shape and polarity
* VSEPR theory
* Molecular geometry
* Bond polarity
* Molecular polarity
* Electronegativity
> Intermolecular forces
* Intermolecular forces
* London dispersion forces
* Dipole-dipole interactions
* Hydrogen bonding
> Bond and lattice energies
* Bond enthalpy
* Lattice enthalpy
* Born-Haber cycles
> Bonding theories
* Molecular orbital theory
* Hybridisation
* Sigma and pi bonding
* Delocalisation
> Solids
* Crystal structures
* Solid-state bonding
5. States of Matter and Physical Chemistry
> Gases
* Gases
* Gas laws
* Ideal gas equation
* Real gases
* Kinetic molecular theory
> Liquids and phase changes
* Liquids
* Vapour pressure
* Boiling and melting
* Phase diagrams
> Solids
* Solids
* Crystalline solids
* Amorphous solids
> Solutions
* Solutions
* Solubility
* Concentration
* Colligative properties
* Osmosis
> Transport and surface properties
* Diffusion
* Surface tension
* Viscosity
* Intermolecular interactions
* Materials properties
6. Chemical Energetics and Thermodynamics
> Energy changes
* Energy in chemical systems
* Exothermic reactions
* Endothermic reactions
> Enthalpy
* Enthalpy
* Standard enthalpy changes
* Enthalpy of formation
* Enthalpy of combustion
* Enthalpy of neutralisation
* Hess's law
* Bond enthalpies
* Calorimetry
> Entropy and free energy
* Entropy
* Gibbs free energy
* Spontaneity
* Thermodynamic equilibrium
> The laws of thermodynamics
* First law of thermodynamics
* Second law of thermodynamics
* Chemical potential
* Temperature dependence
* Thermodynamic cycles
7. Chemical Kinetics
> Rates and collisions
* Introduction to reaction rates
* Collision theory
* Activation energy
* Reaction profiles
> Catalysis
* Catalysts
* Homogeneous catalysis
* Heterogeneous catalysis
* Enzyme catalysis
> Rate laws
* Rate equations
* Reaction order
* Zero-order reactions
* First-order reactions
* Second-order reactions
* Rate constants
* Half-life
* Integrated rate laws
> Temperature and mechanism
* Arrhenius equation
* Temperature effects
* Reaction mechanisms
* Rate-determining steps
* Catalytic cycles
* Experimental kinetics
8. Chemical Equilibrium
> Equilibrium
* Reversible reactions
* Dynamic equilibrium
* Equilibrium constants
* Kc
* Kp
* Reaction quotients
> Shifting equilibrium
* Le Chatelier's principle
* Temperature and equilibrium
* Pressure and equilibrium
* Concentration and equilibrium
> Equilibrium in practice
* Heterogeneous equilibria
* Equilibrium calculations
* Industrial equilibrium
* Coupled equilibria
* Thermodynamic interpretation
9. Acids, Bases and Aqueous Chemistry
> Acid-base theories
* Introduction to acids and bases
* Arrhenius theory
* Brønsted-Lowry theory
* Lewis acid-base theory
> Strength and pH
* Strong acids and bases
* Weak acids and bases
* pH
* pOH
* Acid dissociation constants
* Base dissociation constants
* Ka and Kb
> Buffers
* Buffers
* Henderson-Hasselbalch equation
> Titrations
* Acid-base titrations
* Indicators
* Equivalence points
> Solubility and complex equilibria
* Solubility equilibria
* Ksp
* Common-ion effect
* Complex ion equilibria
* Amphoteric substances
* Polyprotic acids
10. Redox and Electrochemistry
> Redox
* Oxidation and reduction
* Oxidation states
* Redox equations
* Balancing redox reactions
* Oxidising agents
* Reducing agents
> Electrochemical cells
* Electrochemical cells
* Galvanic cells
* Electrolytic cells
* Standard electrode potentials
* Cell potentials
* Electrochemical series
* Nernst equation
> Electrolysis
* Electrolysis
* Faraday's laws
> Applied electrochemistry
* Batteries
* Fuel cells
* Corrosion
* Corrosion prevention
* Industrial electrochemistry
11. Inorganic Chemistry
> Main-group chemistry
* Introduction to inorganic chemistry
* Main-group chemistry
* s-block chemistry
* p-block chemistry
> Coordination chemistry
* Transition metal chemistry
* Coordination compounds
* Ligands
* Coordination numbers
* Isomerism in complexes
> Bonding and properties of complexes
* Crystal field theory
* Ligand field theory
* Magnetic properties
* Colour in transition metal complexes
* Oxidation states
> Organometallics and catalysis
* Organometallic chemistry
* Catalytic complexes
> Applied inorganic chemistry
* Metal extraction
* Industrial inorganic chemistry
* Bioinorganic chemistry
* Solid-state inorganic chemistry
> f-block chemistry
* Lanthanide chemistry
* Actinide chemistry
12. Organic Chemistry Foundations
> Carbon and hydrocarbons
* Introduction to organic chemistry
* Carbon bonding
* Hydrocarbons
* Alkanes
* Alkenes
* Alkynes
* Aromatic compounds
* Benzene structure
> Naming and functional groups
* Functional groups
* IUPAC nomenclature
> Isomerism
* Structural isomerism
* Stereoisomerism
* Constitutional isomers
* Conformational analysis
> Chirality and stereochemistry
* Chirality
* Enantiomers
* Diastereomers
* Optical activity
* R and S nomenclature
* E and Z nomenclature
> Organic reactions
* Functional group interconversion
* Organic reaction classification
13. Organic Reaction Mechanisms
> Mechanism basics
* Curly arrow notation
* Electrophiles and nucleophiles
* Homolytic and heterolytic cleavage
* Carbocations
* Carbanions
* Radical intermediates
* Reaction energy profiles
> Substitution and elimination
* Substitution reactions
* SN1 mechanisms
* SN2 mechanisms
* Elimination reactions
* E1 mechanisms
* E2 mechanisms
> Addition and aromatic substitution
* Addition reactions
* Electrophilic addition
* Nucleophilic addition
* Electrophilic aromatic substitution
* Nucleophilic aromatic substitution
> Redox and other reaction types
* Oxidation reactions
* Reduction reactions
* Condensation reactions
* Hydrolysis
* Rearrangements
> Selectivity
* Reaction selectivity
* Chemoselectivity
* Regioselectivity
* Stereoselectivity
14. Functional Group Chemistry
> Oxygen-containing groups
* Alcohols
* Phenols
* Ethers
* Aldehydes
* Ketones
* Carboxylic acids
* Acyl chlorides
* Acid anhydrides
* Esters
* Amides
> Nitrogen, halogen and sulfur compounds
* Amines
* Nitriles
* Nitro compounds
* Halogenoalkanes
* Aromatic compounds
* Thiols and sulfides
* Organohalogen compounds
> Carbonyl and heterocyclic chemistry
* Carbonyl chemistry
* Enolates and enols
* Heterocyclic compounds
> Synthesis
* Functional group synthesis
* Multi-step synthesis
15. Analytical Chemistry and Spectroscopy
> Principles of analysis
* Foundations of analytical chemistry
* Qualitative analysis
* Quantitative analysis
* Accuracy and precision
* Calibration
* Titrimetry
* Gravimetric analysis
> Spectroscopy
* UV-visible spectroscopy
* Infrared spectroscopy
* Nuclear magnetic resonance
* Proton NMR
* Carbon-13 NMR
* NMR chemical shifts
* Spin-spin coupling
> Mass spectrometry
* Mass spectrometry
* Fragmentation patterns
* High-resolution mass spectrometry
> Other techniques
* Raman spectroscopy
* Fluorescence spectroscopy
* X-ray diffraction
> Chromatography
* Chromatography
* Thin-layer chromatography
* Gas chromatography
* High-performance liquid chromatography
* GC-MS
* LC-MS
> Structure and validation
* Structure elucidation
* Analytical method validation
16. Physical Chemistry and Molecular Science
> Quantum chemistry
* Molecular structure
* Molecular orbitals
* Quantum chemistry
* Schrödinger equation
* Particle in a box
* Harmonic oscillator
> Spectroscopy
* Rotational spectroscopy
* Vibrational spectroscopy
* Electronic transitions
* Atomic and molecular spectra
> Statistical thermodynamics
* Statistical thermodynamics
* Partition functions
* Molecular energy distributions
> Kinetics and surfaces
* Chemical kinetics
* Surface chemistry
* Adsorption
* Colloids
* Interfaces
> Photochemistry and molecular interactions
* Photochemistry
* Molecular interactions
* Solvation
* Computational molecular modelling
17. Materials, Environmental and Industrial Chemistry
> Materials
* Materials chemistry
* Metals and alloys
* Polymers
* Polymerisation
* Biopolymers
* Ceramics
* Semiconductors
* Nanomaterials
* Composite materials
* Biomaterials
> Environmental chemistry
* Environmental chemistry
* Atmospheric chemistry
* Aquatic chemistry
* Soil chemistry
* Water treatment
* Air pollution
* Greenhouse gases
* Climate chemistry
> Industrial chemistry
* Industrial chemical processes
* Chemical manufacturing
* Catalysis in industry
* Petroleum chemistry
* Fertilisers
> Sustainability
* Sustainable chemistry
* Green chemistry
* Circular chemistry
* Chemical waste management
18. Medicinal and Pharmaceutical Chemistry
> Drugs and targets
* Introduction to medicinal chemistry
* Drug discovery
* Drug targets
> Molecular recognition
* Structure-activity relationships
* Pharmacophores
* Molecular recognition
* Binding interactions
* Drug-receptor interactions
* Enzyme inhibitors
* Agonists and antagonists
> From hit to drug candidate
* Lead identification
* Lead optimisation
* Bioisosterism
* Lipophilicity
* Solubility and permeability
> Pharmacokinetics
* ADME
* Drug metabolism
> Drug design methods
* Structure-based drug design
* Ligand-based drug design
* Molecular docking
* Quantitative structure-activity relationships
> Prodrugs, formulation and computation
* Prodrugs
* Drug formulation chemistry
* Biopharmaceuticals
* Computational drug discovery
19. Synthetic Chemistry and Laboratory Methods
> Safety and planning
* Laboratory safety
* Experimental planning
* Reagent handling
> Core techniques
* Reaction setup
* Reflux
* Distillation
* Extraction
* Recrystallisation
* Filtration
* Chromatographic purification
* Thin-layer chromatography
* Column chromatography
> Yield, purity and monitoring
* Yield calculations
* Purity assessment
* Reaction monitoring
> Synthesis planning
* Organic synthesis planning
* Retrosynthetic analysis
* Protecting groups
* Multi-step synthesis
> Good practice
* Green synthesis
* Laboratory documentation
* Experimental reproducibility
* Research integrity
20. Computational Chemistry and Chemical Data Science
> Representing molecules
* Introduction to computational chemistry
* Molecular representations
* SMILES
* InChI
* Molecular descriptors
* Molecular fingerprints
> Databases and visualisation
* Chemical databases
* Molecular visualisation
> Conformations and force fields
* Conformational searching
* Molecular mechanics
* Force fields
> Quantum chemical methods
* Quantum chemical methods
* Hartree-Fock theory
* Density functional theory
* Basis sets
> Simulation
* Molecular dynamics
* Monte Carlo methods
> Docking and screening
* Molecular docking
* Virtual screening
> Cheminformatics and machine learning
* Cheminformatics
* Quantitative structure-property relationships
* Chemical machine learning
> Data and reproducibility
* Chemical datasets
* Chemical data curation
* Reproducible computational chemistry
`;

// stages on the learning map; Chemistry's colours run through amber, orange and warm gold
export const TRACKS = [
  { name: "Stage 1 · Core chemistry", units: [1, 2, 3], from: "#f59e0b", to: "#fbbf24" },
  { name: "Stage 2 · Bonding and matter", units: [4, 5], from: "#f97316", to: "#facc15" },
  { name: "Stage 3 · Energy, rates and equilibrium", units: [6, 7, 8], from: "#ea580c", to: "#f59e0b" },
  { name: "Stage 4 · Aqueous, redox and inorganic", units: [9, 10, 11], from: "#d97706", to: "#fcd34d" },
  { name: "Stage 5 · Organic chemistry", units: [12, 13, 14], from: "#fb923c", to: "#e11d48" },
  { name: "Stage 6 · Analysis and physical chemistry", units: [15, 16], from: "#fbbf24", to: "#f97316" },
  { name: "Stage 7 · Applied chemistry", units: [17, 18, 19], from: "#f59e0b", to: "#dc2626" },
  { name: "Stage 8 · Computational chemistry", units: [20], from: "#facc15", to: "#ea580c" },
];

export const PATHS = [
  { id: "gcse", name: "GCSE Chemistry", sub: "The core of secondary-school chemistry: atoms, the periodic table, bonding, moles, energy and rates.", units: [1, 2, 3, 4, 6, 7] },
  { id: "alevel", name: "A level Chemistry", sub: "Everything for A level and equivalent exams, physical, inorganic and organic.", units: [1, 2, 3, 4, 6, 7, 8, 9, 10, 12, 13, 14, 15] },
  { id: "year1", name: "University year 1", sub: "The first-year core of a chemistry degree.", units: [2, 4, 5, 6, 7, 8, 9, 11, 12] },
  { id: "organic", name: "Organic chemistry", sub: "Structure, stereochemistry, mechanisms, functional groups and synthesis.", units: [12, 13, 14, 19, 15] },
  { id: "medchem", name: "Medicinal chemistry", sub: "From organic mechanisms to drug targets, ADME, docking and drug design.", units: [12, 13, 14, 18, 20, 15] },
  { id: "comp", name: "Computational chemistry", sub: "Quantum chemistry, molecular modelling, cheminformatics and machine learning.", units: [2, 16, 20, 18] },
  { id: "analytical", name: "Analytical chemist", sub: "Measurement, titration, spectroscopy, chromatography and laboratory practice.", units: [1, 9, 15, 19] },
  { id: "green", name: "Materials and sustainability", sub: "States of matter, inorganic materials, the environment and green chemistry.", units: [5, 11, 17] },
];

export const BLURBS = {
  1: "Matter, elements and compounds, equations, the mole and stoichiometry.",
  2: "Inside the atom: isotopes, orbitals, quantum numbers, electron configurations and spectra.",
  3: "How the periodic table is built, the groups and blocks, and the trends across it.",
  4: "Ionic, covalent and metallic bonding, Lewis structures, shapes, polarity and intermolecular forces.",
  5: "Gases, liquids, solids and solutions, phase diagrams and colligative properties.",
  6: "Enthalpy, Hess's law, entropy, Gibbs free energy and the laws of thermodynamics.",
  7: "Reaction rates, collision theory, rate laws, half-lives, the Arrhenius equation and catalysis.",
  8: "Reversible reactions, equilibrium constants and Le Chatelier's principle.",
  9: "Acid-base theories, pH, Ka, buffers, titrations and solubility equilibria.",
  10: "Oxidation states, redox equations, electrochemical cells, electrolysis, batteries and corrosion.",
  11: "Main-group and transition metal chemistry, complexes, crystal field theory and organometallics.",
  12: "Hydrocarbons, functional groups, naming, isomerism and stereochemistry.",
  13: "Curly arrows, nucleophiles and electrophiles, substitution, elimination, addition and selectivity.",
  14: "Alcohols, carbonyls, carboxylic acids and derivatives, amines and multi-step synthesis.",
  15: "Spectroscopy (UV-vis, IR, NMR), mass spectrometry, chromatography and structure elucidation.",
  16: "Quantum chemistry, molecular spectroscopy, statistical thermodynamics and surfaces.",
  17: "Polymers and materials, atmospheric and water chemistry, industrial processes and green chemistry.",
  18: "Drug targets, binding, structure-activity relationships, ADME, docking and drug design.",
  19: "Laboratory technique, purification, yield and purity, retrosynthesis and protecting groups.",
  20: "SMILES, descriptors, force fields, DFT, molecular dynamics, docking and chemical machine learning.",
};

// the curriculum as schools, modules and lessons; lesson ids are u01-01 style and locked in ids.js
export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
