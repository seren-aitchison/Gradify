// YouthGradify GCSE Core: the full curriculum, 9 schools. Modelled on the DfE GCSE subject content for English
// Language (2013), Combined Science (2015) and Geography (2014), and on the AQA (8700, 8464, 8035), Pearson Edexcel
// (1EN0, 1SC0, 1GA0) and OCR (J351, J250, J383) specifications built on it, with study skills and PSHE-style life
// skills (DfE statutory guidance on relationships, sex and health education; the Gatsby Benchmarks for careers).
// Maths is taught by MathGradify. Each topic is taught as one lesson, grouped into modules ("> " lines) and stages
// (TRACKS). Lesson ids are permanent (ids.js, written by node scripts/new-course.mjs lock gcse): never renumber,
// delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Revision and Exam Skills
> How learning works
* How memory works
* Retrieval practice
* Spaced practice and revision timetables
* Interleaving and worked examples
> Revision methods
* Flashcards and the Leitner system
* Mind maps, dual coding and summaries
* Past papers and mark schemes
> The exam itself
* Command words
* Planning extended answers
* Timing and exam technique
* Exam stress and wellbeing
* Making a revision plan
2. Foundations of Literary Study
> What literature is
* What is literature?
* Genre and form
* Author, narrator and reader
* Text and context
* The literary canon
> Close reading
* Close reading: a method
* Diction and register
* Imagery
* Metaphor, simile and personification
* Symbol and motif
* Tone and mood
* Syntax and sentence structure
* The sound of language
> Interpretation
* Ambiguity and multiple meanings
* Irony
* Intertextuality and allusion
* Using quotations as evidence
* From annotation to argument
3. English Language: Writing
> Writing to describe and narrate
* Descriptive writing
* Narrative writing: openings and structure
* Character, setting and voice
* Crafting sentences for effect
> Writing to present a viewpoint
* Viewpoint writing: forms and audiences
* Planning an argument
* Rhetorical and persuasive techniques
* Letters, articles and speeches
> Technical accuracy
* Sentence demarcation and punctuation
* Spelling strategies
* Grammar and Standard English
* Vocabulary for effect
* Spoken language endorsement
4. The Human Body
> Organisation and control
* Cells, tissues and organs
* Homeostasis
* Body temperature regulation
* Blood glucose regulation
* The nervous system
* The endocrine system
> Transport and exchange
* The heart
* Blood vessels and blood pressure
* Blood
* The respiratory system
* Gas exchange and breathing
> Processing, defence and movement
* The digestive system
* The liver
* The kidneys and fluid balance
* The immune system
* The musculoskeletal system
* The skin
5. Chemistry
> Atoms and the periodic table
* Atomic structure and isotopes
* The development of the atomic model
* The periodic table and groups
> Bonding and structure
* Ionic, covalent and metallic bonding
* Structure and properties of substances
> Quantitative chemistry
* Conservation of mass and relative formula mass
* Moles and concentration
> Chemical changes
* Reactivity series and extraction of metals
* Acids, alkalis and salts
* Electrolysis
> Energy, rates and equilibrium
* Exothermic and endothermic reactions
* Rates of reaction
* Reversible reactions and equilibrium
> Organic and analysis
* Crude oil and hydrocarbons
* Chemical analysis and chromatography
* Tests for gases
> The atmosphere and resources
* The Earth's atmosphere and climate change
* Using resources: water and life cycle assessment
* Chemistry required practicals
6. Physics
> Energy
* Energy stores and transfers
* Work, power and efficiency
* Energy resources
> Electricity
* Circuits, current and potential difference
* Resistance and I–V characteristics
* Series and parallel circuits
* Mains electricity and the National Grid
> Particle model and atomic structure
* Density and states of matter
* Specific heat capacity and latent heat
* Atomic structure and radioactive decay
* Half-life and the uses and dangers of radiation
> Forces and motion
* Scalars, vectors and resultant forces
* Speed, velocity and acceleration
* Newton's laws of motion
* Stopping distances and momentum
* Forces, springs and Hooke's law
> Waves and magnetism
* Properties of waves
* The electromagnetic spectrum
* Magnetism and electromagnetism
> Equations and practicals
* Physics equations: recall and use
* Physics required practicals
7. Foundations of Ecology
> What ecology is
* What is ecology?
* Levels of ecological organisation
* Ecology as a science: hypotheses and scale
* Ecology and environmental science
> The physical environment
* Abiotic factors
* Climate and the distribution of life
* Soils
* Water and aquatic environments
> Organisms in their environment
* Tolerance ranges and limiting factors
* Adaptation to the environment
* Habitats and the ecological niche
* Biotic interactions: an overview
> The living world
* Terrestrial biomes
* Aquatic biomes
* Biogeography and the distribution of species
* Humans as an ecological force
8. Geography: Human Environments and Skills
> Urban issues
* Global urbanisation
* Cities in lower-income countries
* UK cities: change and regeneration
* Sustainable urban living
> The changing economic world
* Measuring development
* Reducing the development gap
* Economic change in an emerging economy
* The changing UK economy
> Resource management
* Food, water and energy: global patterns
* Resource management strategies
> Geographical skills
* Map skills and grid references
* Graphs, statistics and data presentation
* Fieldwork enquiry
* Issue evaluation and decision making
9. Foundations of Health and Wellbeing
> Defining health
* What is health?
* Models of health: biomedical and biopsychosocial
* Wellbeing and how it is measured
* Holistic health: physical, mental and social
> What shapes health
* The determinants of health
* Health inequalities
* Lifestyle factors and health
* The wider determinants: housing, work and environment
> Evidence about health
* Judging health information
* Levels of evidence
* Understanding risk: absolute and relative
* Screening: benefits and harms
> Health in the UK
* Measuring the nation's health
* Leading causes of death and ill health in the UK
`;

export const TRACKS = [
  { name: "Stage 1 · Learning to learn", units: [1], from: "#ffd84a", to: "#f59e0b" },
  { name: "Stage 2 · English Language", units: [2, 3], from: "#fde047", to: "#fb923c" },
  { name: "Stage 3 · Combined Science", units: [4, 5, 6], from: "#facc15", to: "#22d3ee" },
  { name: "Stage 4 · Geography", units: [7, 8], from: "#fbbf24", to: "#34d399" },
  { name: "Stage 5 · Life beyond the exam", units: [9], from: "#fcd34d", to: "#a78bfa" },
];

export const PATHS = [
  { id: "core", name: "The GCSE core", sub: "Every school in order, from how to revise to life after Year 11.", units: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { id: "english", name: "English Language", sub: "Revision skills, then both papers: reading fiction and non-fiction, and writing to describe, narrate and argue.", units: [1, 2, 3] },
  { id: "science", name: "Combined Science", sub: "Revision skills, then biology, chemistry and physics with every required practical and equation.", units: [1, 4, 5, 6] },
  { id: "geography", name: "Geography", sub: "Revision skills, physical and human geography, map skills, fieldwork and issue evaluation.", units: [1, 7, 8] },
  { id: "year11", name: "Year 11 exam year", sub: "Revision and exam technique first, then the subjects, then next steps after GCSEs.", units: [1, 2, 3, 6, 4, 5, 9] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "How memory works and the revision methods that use it: retrieval, spacing, flashcards, past papers, command words and calm exams.",
  2: "What literature is and how to read it closely: diction, imagery, tone, syntax, sound, irony, allusion and argument.",
  3: "Descriptive, narrative and viewpoint writing, and the spelling, punctuation and grammar that earn the technical accuracy marks.",
  4: "Cells to systems: homeostasis, the heart, lungs, gut, liver, kidneys, immune, nervous, endocrine and musculoskeletal systems.",
  5: "Atoms, bonding, moles, reactions, electrolysis, rates, organic chemistry, analysis and the atmosphere.",
  6: "Energy, electricity, particles, radioactivity, forces, waves and magnetism, with every equation and required practical.",
  7: "What ecology studies, the physical environment, tolerance, adaptation and the niche, and the biomes of the living world.",
  8: "Urbanisation, development, the changing economy, resources, map and data skills, fieldwork and decision making.",
  9: "What health and wellbeing mean, what shapes them, how inequalities arise and how to judge health evidence and risk.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
