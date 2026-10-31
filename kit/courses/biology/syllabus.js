// SciGradify Biology: the full curriculum, 14 schools and every lesson in them, as given in the
// Biology brief (lesson titles verbatim). Schools are units to the course engine, grouped into modules
// ("> " lines) and into stages (TRACKS). Lesson ids are permanent (ids.js), u01-01 style, as for every Gradify course.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Foundations of Biology
> The living world
* What is biology?
* Characteristics of living organisms
* Levels of biological organisation
* The characteristics of life
> Classifying life
* Classification and taxonomy
* The three domains of life
* The kingdoms of life
> The scientific method
* Scientific method
* Hypotheses and predictions
* Variables and experimental design
* Controls and reproducibility
* Accuracy and precision
* Reliability and validity
> Measurement and data
* Biological measurements
* Units and conversions
* Scientific notation
* Graphs and data presentation
* Statistical foundations
* Sampling methods
> Ethics in research
* Ethical considerations in biological research
2. Cell Biology
> Cells and cell types
* Cell theory
* Prokaryotic cells
* Eukaryotic cells
* Animal cells
* Plant cells
* Fungal cells
* Bacterial cells
> Organelles
* Cell organelles
* Nucleus and nucleolus
* Mitochondria
* Chloroplasts
* Ribosomes
* Endoplasmic reticulum
* Golgi apparatus
* Lysosomes and peroxisomes
* Cytoskeleton
> Membranes and transport
* Cell membranes
* Membrane structure
* Membrane transport
* Diffusion
* Osmosis
* Facilitated diffusion
* Active transport
* Endocytosis and exocytosis
> Specialisation and communication
* Cell specialisation
* Stem cells
* Cell differentiation
* Cell signalling
* Cell junctions
* Cellular organisation
3. Biochemistry and Biomolecules
> Water and the chemistry of life
* Chemistry of life
* Water and biological systems
* Hydrogen bonding
* pH and biological buffers
> Carbohydrates
* Carbohydrates
* Monosaccharides
* Disaccharides
* Polysaccharides
> Lipids
* Lipids
* Fatty acids
* Triglycerides
* Phospholipids
* Steroids
> Proteins
* Proteins
* Amino acids
* Peptide bonds
* Protein primary structure
* Protein secondary structure
* Protein tertiary structure
* Protein quaternary structure
* Protein folding
* Protein denaturation
> Enzymes
* Enzymes
* Enzyme-substrate interactions
* Enzyme kinetics
* Enzyme inhibition
* Factors affecting enzyme activity
> Nucleic acids and energy
* Nucleic acids
* DNA and RNA
* ATP and biological energy
4. Genetics and Molecular Biology
> DNA and genomes
* Introduction to genetics
* DNA structure
* DNA replication
* DNA repair
* Chromosomes
* Genes and alleles
* Genomes
> From gene to protein
* RNA structure
* Transcription
* RNA processing
* Translation
* Genetic code
* Protein synthesis
> Gene regulation
* Gene regulation
* Operons
* Epigenetics
> Mutation and DNA damage
* Mutations
* Types of mutation
* DNA damage
> Patterns of inheritance
* Mendelian genetics
* Dominant and recessive inheritance
* Genotype and phenotype
* Monohybrid crosses
* Dihybrid crosses
* Incomplete dominance
* Codominance
* Sex-linked inheritance
* Pedigree analysis
> Populations and genomics
* Population genetics
* Genetic linkage
* Recombination
* Chromosomal abnormalities
* Genomics
* Human genetic variation
* Genome-wide association studies
5. Cell Division and Development
> The cell cycle and division
* Cell cycle
* Interphase
* Mitosis
* Meiosis
* Comparison of mitosis and meiosis
* Chromosome segregation
> Control and cell death
* Cell-cycle regulation
* Checkpoints
* Apoptosis
* Necrosis
* Cellular senescence
> Cancer
* Cancer biology
* Tumour development
> Stem cells and early development
* Stem-cell biology
* Embryonic development
* Fertilisation
* Cleavage
* Gastrulation
* Organogenesis
> Signalling, fate and regeneration
* Developmental signalling
* Cell fate determination
* Tissue formation
* Regeneration
6. Evolution and Natural Selection
> Evidence and natural selection
* Origins of evolutionary thought
* Evidence for evolution
* Natural selection
* Adaptation
> Sources of evolutionary change
* Genetic variation
* Mutation and evolution
* Genetic drift
* Gene flow
* Sexual selection
> Selection and fitness
* Selection pressures
* Fitness
> Speciation
* Speciation
* Reproductive isolation
* Allopatric speciation
* Sympatric speciation
> Phylogenetics and ancestry
* Phylogenetics
* Evolutionary trees
* Common ancestry
* Fossil evidence
* Molecular evolution
> Evolution today
* Human evolution
* Evolutionary medicine
* Evolution of resistance
* Population genetics
7. Human Anatomy and Physiology
> Body organisation and homeostasis
* Organisation of the human body
* Homeostasis
> Nervous and endocrine systems
* Nervous system
* Neurones
* Action potentials
* Synaptic transmission
* Central nervous system
* Peripheral nervous system
* Endocrine system
* Hormones and signalling
> Cardiovascular system
* Cardiovascular system
* Heart anatomy
* Cardiac cycle
* Blood vessels
* Blood composition
* Circulation
> Respiratory system
* Respiratory system
* Ventilation
* Gas exchange
* Oxygen transport
> Digestive system
* Digestive system
* Digestion and absorption
* Liver and pancreas
> Renal system
* Renal system
* Kidney function
* Urine formation
> Movement and support
* Musculoskeletal system
* Bone physiology
* Muscle contraction
> Defence, reproduction and regulation
* Immune system
* Reproductive system
* Human development
* Skin and thermoregulation
* Fluid and electrolyte balance
8. Plant Biology
> Plant structure
* Plant cell structure
* Plant tissues
* Roots and root systems
* Stems
* Leaves
> Transport in plants
* Plant vascular tissue
* Xylem
* Phloem
* Water transport
* Transpiration
> Nutrition and photosynthesis
* Mineral nutrition
* Photosynthesis
* Light-dependent reactions
* Calvin cycle
* C3 photosynthesis
* C4 photosynthesis
* CAM photosynthesis
* Cellular respiration in plants
> Plant hormones and responses
* Plant hormones
* Auxins
* Gibberellins
* Cytokinins
* Abscisic acid
* Ethylene
* Tropisms
* Photoperiodism
> Plant reproduction
* Flowering
* Pollination
* Fertilisation
* Seed formation
* Germination
* Plant reproduction
> Stress and biotechnology
* Plant responses to stress
* Plant biotechnology
9. Microbiology
> Bacteria
* Introduction to microbiology
* Bacterial structure
* Bacterial classification
* Bacterial growth
* Bacterial metabolism
* Bacterial genetics
* Horizontal gene transfer
> Viruses
* Viral structure
* Viral replication
* Viral evolution
> Fungi, protozoa and archaea
* Fungi
* Protozoa
* Archaea
> Microbes and their hosts
* Microbial ecology
* Microbiomes
* Host-microbe interactions
> Infection and disease
* Pathogenic microorganisms
* Virulence
* Transmission
* Infection
> Controlling microbes
* Antibiotics
* Antimicrobial resistance
* Sterilisation
* Disinfection
> Microbiology in practice
* Microbial culture
* Microscopy
* Molecular identification
* Environmental microbiology
* Industrial microbiology
* Applied microbiology
10. Immunology
> Foundations of immunity
* Introduction to immunology
* Innate immunity
* Adaptive immunity
* Physical barriers
> Immune cells
* Immune cells
* Neutrophils
* Macrophages
* Dendritic cells
* Natural killer cells
* B lymphocytes
* T lymphocytes
> Antigen recognition and signalling
* Antibodies
* Antigen recognition
* Antigen presentation
* MHC molecules
* Cytokines
> Inflammation, complement and memory
* Complement system
* Inflammation
* Immune memory
* Vaccination
> Immune disorders
* Hypersensitivity
* Allergy
* Autoimmunity
* Immunodeficiency
> Clinical immunology
* Transplant immunology
* Cancer immunology
* Immunotherapy
11. Ecology and Environmental Biology
> Organisms and ecosystems
* Introduction to ecology
* Organisms and populations
* Habitats and niches
* Ecosystems
* Biomes
> Energy flow
* Food chains
* Food webs
* Energy flow
* Trophic levels
* Primary productivity
> Nutrient cycles
* Nutrient cycles
* Carbon cycle
* Nitrogen cycle
* Water cycle
> Populations and interactions
* Population dynamics
* Competition
* Predation
* Mutualism
* Parasitism
> Communities and biodiversity
* Succession
* Biodiversity
* Species richness
> Conservation and environmental change
* Conservation biology
* Habitat fragmentation
* Invasive species
* Climate change and ecosystems
* Pollution
* Environmental monitoring
* Conservation strategies
* Sustainable ecosystems
12. Biotechnology and Genetic Engineering
> Recombinant DNA
* Foundations of biotechnology
* Recombinant DNA
* Restriction enzymes
* DNA ligase
* Plasmids
* Cloning vectors
> Amplifying and reading DNA
* Polymerase chain reaction
* Gel electrophoresis
* DNA sequencing
* Sanger sequencing
* Next-generation sequencing
* Whole-genome sequencing
> Gene editing and expression
* CRISPR-Cas systems
* Gene editing
* Gene expression systems
* Recombinant proteins
> Medical biotechnology
* Molecular diagnostics
* Genetic testing
* Gene therapy
* Cell therapy
* Biopharmaceuticals
> Industry, safety and ethics
* Industrial biotechnology
* Synthetic biology
* Biosafety
* Bioethics
13. Bioinformatics and Computational Biology
> Data and sequences
* Introduction to bioinformatics
* Biological databases
* DNA sequence analysis
* Protein sequence analysis
> Alignment and phylogenetics
* Sequence alignment
* BLAST
* Multiple sequence alignment
* Phylogenetic analysis
> Genomes and gene expression
* Genome annotation
* Gene expression analysis
* RNA sequencing
* Differential expression
> Omics and structure
* Proteomics
* Metabolomics
* Structural bioinformatics
* Protein structure prediction
* Molecular visualisation
> Networks and systems
* Biological networks
* Systems biology
> Genomic medicine and drug discovery
* Population genomics
* Variant analysis
* Precision medicine
* Computational drug discovery
> Data science and reproducibility
* Biological data science
* Reproducible computational research
14. Experimental Biology and Research Methods
> Designing experiments
* Experimental design
* Hypothesis development
* Controls
* Sampling
> Imaging and cell culture
* Microscopy
* Histology
* Cell culture
> Molecular and biochemical techniques
* Molecular biology techniques
* PCR
* Gel electrophoresis
* Western blotting
* ELISA
* Chromatography
* Spectrophotometry
* Sequencing
* Flow cytometry
> Statistics and visualisation
* Statistical analysis
* Data visualisation
> Research practice and integrity
* Research ethics
* Scientific communication
* Literature reviews
* Reproducibility
* Research integrity
* Laboratory safety
`;

// stages on the learning map; Biology's colours run through emerald, green and turquoise
export const TRACKS = [
  { name: "Stage 1 · Foundations of life", units: [1, 2, 3], from: "#10b981", to: "#14d4c4" },
  { name: "Stage 2 · Genes and cells", units: [4, 5], from: "#22c55e", to: "#0ea5a4" },
  { name: "Stage 3 · Evolution and ecology", units: [6, 11], from: "#84cc16", to: "#10b981" },
  { name: "Stage 4 · Organisms", units: [7, 8], from: "#2dd4bf", to: "#16a34a" },
  { name: "Stage 5 · Microbes and immunity", units: [9, 10], from: "#34d399", to: "#06b6d4" },
  { name: "Stage 6 · Biotechnology, data and research", units: [12, 13, 14], from: "#14b8a6", to: "#3b82f6" },
];

export const PATHS = [
  { id: "gcse", name: "GCSE Biology", sub: "The core of secondary-school biology: cells, biomolecules, genetics, the human body and ecosystems.", units: [1, 2, 3, 4, 7, 11] },
  { id: "alevel", name: "A level Biology", sub: "Everything for A level and equivalent exams, from cells to ecosystems.", units: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11] },
  { id: "year1", name: "University year 1", sub: "The first-year core of a biological sciences degree.", units: [2, 3, 4, 5, 9, 14] },
  { id: "medicine", name: "Pre-medicine and human biology", sub: "The biology behind medicine: cells, physiology, microbes and immunity.", units: [2, 3, 7, 9, 10, 5] },
  { id: "genetics", name: "Genetics and genomics", sub: "From DNA and inheritance to genome sequencing and gene editing.", units: [4, 5, 6, 12, 13] },
  { id: "compbio", name: "Computational biology", sub: "Sequences, alignment, phylogenetics, omics and reproducible data science.", units: [1, 4, 13, 6, 12, 14] },
  { id: "ecology", name: "Ecology and conservation", sub: "Evolution, plants, ecosystems and protecting biodiversity.", units: [1, 6, 8, 11] },
  { id: "research", name: "Research-ready", sub: "Experimental design, laboratory techniques, statistics and research integrity.", units: [1, 14, 12, 13] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "What life is, how it is classified, and how biologists measure, test and reason.",
  2: "Prokaryotic and eukaryotic cells, organelles, membranes, transport and signalling.",
  3: "Water, carbohydrates, lipids, proteins, enzymes and nucleic acids: the molecules of life.",
  4: "DNA, genes, the genetic code, gene regulation, mutation and patterns of inheritance.",
  5: "The cell cycle, mitosis and meiosis, cell death, cancer and embryonic development.",
  6: "Natural selection, variation, drift, speciation and reading the tree of life.",
  7: "How the human body works, from neurones and hormones to the heart, lungs and kidneys.",
  8: "Plant structure, transport, photosynthesis, hormones and reproduction.",
  9: "Bacteria, viruses, fungi and archaea, infection, antibiotics and resistance.",
  10: "Innate and adaptive immunity, antibodies, vaccination and immune disorders.",
  11: "Ecosystems, energy flow, nutrient cycles, populations, biodiversity and conservation.",
  12: "Recombinant DNA, PCR, sequencing, CRISPR, gene therapy and synthetic biology.",
  13: "Biological databases, sequence alignment, phylogenetics, omics, structure prediction and data science.",
  14: "Experimental design, microscopy, molecular techniques, statistics and research integrity.",
};

// the curriculum as schools, modules and lessons; lesson ids are u01-01 style and locked in ids.js
export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
