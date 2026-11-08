// EcoGradify Ecology and Environmental Science: the full curriculum, 11 schools. Modelled on the ecology content of
// AQA A level Biology (7402), the whole of AQA A level Environmental Science (7447) and the first two years of a UK
// ecology or environmental science degree (QAA Subject Benchmark Statement for Earth Sciences, Environmental
// Sciences and Environmental Studies). Each topic is taught as one lesson, grouped into modules ("> " lines) and
// stages (TRACKS). Lesson ids are permanent (ids.js, written by node scripts/new-course.mjs lock ecology): never
// renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Foundations of Ecology
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
2. Population Ecology
> Describing populations
* What is a population?
* Population size and density
* Dispersion patterns
* Estimating population size: mark–release–recapture
> Population growth
* Births, deaths, immigration and emigration
* Exponential growth
* Logistic growth and carrying capacity
* Density-dependent and density-independent factors
* Population cycles and fluctuations
> Life histories
* Life tables and survivorship curves
* Life-history strategies: r and K selection
* Age structure
* Metapopulations
> Human populations
* Human population growth
* The demographic transition
> Applied population ecology
* Small populations and extinction risk
* Harvesting and maximum sustainable yield
* Population viability analysis
3. Communities and Species Interactions
> Competition
* Intraspecific and interspecific competition
* The competitive exclusion principle
* Resource partitioning and niche differentiation
> Consumers and their prey
* Predation
* Predator–prey dynamics
* Herbivory and plant defences
* Parasitism and disease
> Positive interactions
* Mutualism
* Commensalism and facilitation
> Community structure
* What is an ecological community?
* Keystone species and trophic cascades
* Species richness and evenness
* Island biogeography
> Change over time
* Ecological succession
* Primary and secondary succession
* Climax communities and plagioclimax
* Disturbance and the intermediate disturbance hypothesis
* Invasive non-native species
4. Ecosystems and Energy Flow
> Ecosystem structure
* What is an ecosystem?
* Producers, consumers and decomposers
* Food chains and food webs
* Trophic levels
> Energy and productivity
* Photosynthesis and energy capture
* Gross and net primary productivity
* Secondary productivity
* Efficiency of energy transfer
* Ecological pyramids
> Decomposition
* Decomposition and detritus food webs
* Soil ecosystems
> Ecosystems across the planet
* Productivity across biomes
* Ocean productivity
* Ecosystem stability and resilience
> Ecosystem services
* Ecosystem services
* Agricultural ecosystems
5. Biogeochemical Cycles
> Matter in ecosystems
* Cycling of matter
* The water cycle
> The carbon cycle
* The carbon cycle
* Carbon stores and fluxes
* Peatlands, forests and blue carbon
> Nitrogen and phosphorus
* The nitrogen cycle
* Nitrogen fixation
* Human alteration of the nitrogen cycle
* The phosphorus cycle
* Eutrophication
> Other cycles and limits
* The sulfur cycle and acid deposition
* Nutrient limitation
* Planetary boundaries
* Coupled cycles and global change
6. Biodiversity and Evolution
> What biodiversity is
* Defining biodiversity
* Genetic, species and ecosystem diversity
* Species concepts
* Classification and naming
> Where biodiversity comes from
* Variation and natural selection
* Adaptation and fitness
* Speciation
* Coevolution
* The history of life and mass extinctions
> Patterns of biodiversity
* The latitudinal diversity gradient
* Biodiversity hotspots
* Endemism
> Measuring and losing biodiversity
* Measuring biodiversity: diversity indices
* Biodiversity in the UK
* The global state of biodiversity
* Drivers of biodiversity loss
* Extinction risk and the IUCN Red List
* Why biodiversity matters
7. Conservation Biology
> Principles
* What is conservation biology?
* Conservation values and ethics
* Conservation genetics
* Minimum viable populations
> In situ conservation
* Protected areas
* UK protected sites: SSSIs, SACs and SPAs
* Habitat management
* Habitat restoration
* Rewilding
* Species reintroductions
* Wildlife corridors and landscape connectivity
> Ex situ conservation
* Zoos and captive breeding
* Seed banks and botanic gardens
> Conservation in practice
* Conservation on farmland
* Marine conservation
* International conservation agreements
* Evidence-based conservation
* Community-based conservation
8. Climate Change
> The climate system
* Weather and climate
* The atmosphere
* Earth's energy balance
* The greenhouse effect
* Greenhouse gases
* Radiative forcing
> Evidence and causes
* The instrumental record
* Past climates and proxies
* Attribution of climate change
* Climate feedbacks
* Tipping points
> Projections
* Climate models and scenarios
* Sea-level rise
* Ocean warming and acidification
> Impacts on ecosystems
* Phenology and mismatch
* Range shifts
* Coral reefs under climate change
* Climate change and extinction risk
> Responses
* Mitigation
* Adaptation
* Nature-based solutions
9. Field Methods and Statistics
> Designing ecological studies
* The scientific method in ecology
* Hypotheses and null hypotheses
* Experimental and observational studies
* Replication and pseudoreplication
* Fieldwork ethics and safety
> Sampling
* Random, systematic and stratified sampling
* Quadrats
* Transects
* Measuring abundance: frequency, cover and ACFOR
* Sampling animals
* Freshwater sampling and biotic indices
* Measuring abiotic factors
> Statistics
* Types of data and variables
* Descriptive statistics
* Standard deviation and standard error
* Choosing a statistical test
* The chi-squared test
* Spearman's rank correlation
* The t-test
* The Mann–Whitney U test
> Modern methods
* Remote sensing and GIS
* Environmental DNA
* Citizen science
10. Resources and Pollution
> Energy
* Energy resources
* Fossil fuels
* Nuclear power
* Renewable energy
* Energy efficiency and storage
> Land, water and food
* Soil degradation and conservation
* Water resources
* Agriculture and food security
* Fisheries
* Forestry
* Mineral resources
> Pollution
* Principles of pollution
* Air pollution
* Water pollution
* Plastics and persistent pollutants
* Pesticides and bioaccumulation
* Noise and light pollution
> Waste
* Waste management
* Life-cycle assessment
* The circular economy
11. Sustainability and Environmental Policy
> Sustainability
* What is sustainability?
* Sustainable development and the SDGs
* Ecological footprints
* Environmental ethics
> Environmental economics
* Market failure and externalities
* Valuing nature
* Policy instruments: regulation, taxes and markets
> Law and policy
* International environmental agreements
* UK environmental law
* Environmental impact assessment
* Biodiversity net gain
* The precautionary principle
> People and the environment
* Environmental justice
* Indigenous and local knowledge
* Behaviour change and the environment
* Monitoring progress: environmental indicators
`;

// stages on the map; EcoGradify's colours run from leaf green through teal to sky blue
export const TRACKS = [
  { name: "Stage 1 · Foundations and fieldwork", units: [1, 9], from: "#6aa84f", to: "#a3c76b" },
  { name: "Stage 2 · Populations and communities", units: [2, 3], from: "#7cb342", to: "#2e9e6b" },
  { name: "Stage 3 · Ecosystems and cycles", units: [4, 5], from: "#43a047", to: "#14b8a6" },
  { name: "Stage 4 · Biodiversity and conservation", units: [6, 7], from: "#2e9e6b", to: "#0ea5a4" },
  { name: "Stage 5 · Global change and sustainability", units: [8, 10, 11], from: "#14b8a6", to: "#22d3ee" },
];

export const PATHS = [
  { id: "alevel-bio", name: "A level Biology ecology", sub: "The ecology of A level Biology: populations, communities, ecosystems, nutrient cycles, biodiversity and the fieldwork and statistics behind them.", units: [1, 2, 3, 4, 5, 6, 9] },
  { id: "alevel-env", name: "A level Environmental Science", sub: "The AQA A level Environmental Science course: the living and physical environment, energy, pollution, resources, sustainability and research methods.", units: [1, 4, 5, 8, 10, 11, 9] },
  { id: "year1", name: "University ecology, years 1 and 2", sub: "The core of an ecology degree: from individuals and populations to communities and ecosystems, with field methods and statistics.", units: [1, 2, 3, 4, 5, 9, 6] },
  { id: "conservation", name: "Conservation", sub: "What biodiversity is, why it is being lost and what the evidence says works to protect and restore it.", units: [6, 7, 2, 3, 11] },
  { id: "climate", name: "Climate and the carbon cycle", sub: "How the climate system works, how we know it is changing, what that does to ecosystems and how societies respond.", units: [8, 5, 4, 10, 11] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "What ecology studies, the physical environment, tolerance, adaptation and the niche, and the biomes of the living world.",
  2: "How populations are measured, grow, are regulated and age, from mark–release–recapture to human demography and extinction risk.",
  3: "Competition, predation, parasitism and mutualism, how communities are structured, and how they change through succession.",
  4: "Producers, consumers and decomposers, food webs, primary productivity, energy transfer and the services ecosystems provide.",
  5: "Water, carbon, nitrogen, phosphorus and sulfur on the move, eutrophication, nutrient limits and planetary boundaries.",
  6: "Genes, species and ecosystems: how diversity evolves, where it is concentrated, how it is measured and why it is declining.",
  7: "Protecting and restoring nature: genetics of small populations, protected areas, rewilding, reintroductions and the evidence.",
  8: "The greenhouse effect, the evidence for warming, feedbacks and projections, and the impacts on species and ecosystems.",
  9: "Designing ecological studies, sampling plants and animals, measuring the environment and testing results with statistics.",
  10: "Energy, soil, water, food, fisheries and minerals, the main kinds of pollution and how waste is managed.",
  11: "Sustainable development, environmental economics, law and policy, environmental justice and measuring progress.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
