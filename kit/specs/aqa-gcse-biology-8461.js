// AQA GCSE Biology (8461), mapped onto SciGradify Biology's lessons for Specification Mastery
// (kit/learning/spec-mastery.js, docs/SPEC-MASTERY.md).
//
// Each point is one numbered requirement of the subject content (4.1.1.1 and so on), with:
//   lessons   lessons that teach and assess the whole point
//   partial   lessons that cover only part of it (their answers still count as evidence for the point)
//   flags     this specification's own classifications (declared in `flags` below): ht, the whole point is Higher
//             tier only; sep, Biology only (not in Combined Science)
// A point with no lessons is reported as "not yet covered by Gradify", never as something the learner doesn't know.
//
// The numbering, headings and classifications (tier, Biology only) follow the structure of the specification as Gradify
// knows it, and the requirement text is Gradify's own summary (wording: "paraphrased"), not AQA's wording. None of it
// has been checked against AQA's published specification yet: set `verified` (and `wording: "verbatim"` if the text
// is replaced with AQA's own) only once someone has checked every point against the current version.
// Which lessons teach a point comes only from the mapping store (kit/curriculum/maps/aqa-gcse-biology.json), through
// the generated LINKS (scripts/curriculum/spec-view.mjs): owner's decision 6, 25 Nov 2026. The lessons written by hand
// below are kept as `proposed`, for reviewers, and never shown as coverage.
import { LINKS } from "./aqa-gcse-biology-8461.links.js";
const P = (id, title, text, lessons, { partial = [], ht = false, sep = false } = {}) => {
  const L = LINKS[id] || { lessons: [], partial: [], evidence: null, state: "unchecked", statements: null };
  return { id, title, text, lessons: L.lessons, partial: L.partial, evidence: L.evidence, state: L.state, statements: L.statements, proposed: { lessons, partial }, flags: [ht && "ht", sep && "sep"].filter(Boolean) };
};

export default {
  id: "aqa-gcse-biology-8461",
  // the framework whose mapping store links this view's points to lessons (kit/curriculum/maps/<framework>.json)
  framework: "aqa-gcse-biology",
  // where it sits: an education system and qualification from kit/curriculum/coverage.js, the awarding body and code
  system: "uk-eng", qualification: "gcse", board: "AQA", subject: "Biology", code: "8461",
  title: "AQA GCSE Biology (8461)",
  course: "biology",
  url: "https://www.aqa.org.uk/subjects/biology/gcse/biology-8461/specification",
  version: "Subject content as known to Gradify (first teaching 2016)",
  wording: "paraphrased",
  verified: null,   // { date, by, version } once checked point by point against the published specification
  // what each point flag means, and the choices a learner makes that hide points (here, sitting Foundation tier)
  flags: {
    ht: { short: "HT", name: "Higher tier only" },
    sep: { short: "Biology only", name: "In GCSE Biology, not Combined Science" },
  },
  options: [
    { id: "tier", label: "Tier", choices: [{ id: "higher", label: "Higher" }, { id: "foundation", label: "Foundation", hides: ["ht"] }] },
  ],
  topics: [
    { id: "4.1", title: "Cell biology", groups: [
      { id: "4.1.1", title: "Cell structure", points: [
        P("4.1.1.1", "Eukaryotes and prokaryotes", "Describe how eukaryotic and prokaryotic cells differ in structure, and use orders of magnitude to compare the sizes of cells and their parts.", ["u02-02", "u02-03", "u02-07"], { partial: ["u01-16"] }),
        P("4.1.1.2", "Animal and plant cells", "Describe the main parts of animal and plant cells, and explain how each part is related to its function.", ["u02-04", "u02-05", "u02-08", "u02-09", "u02-10", "u02-11", "u02-12"]),
        P("4.1.1.3", "Cell specialisation", "Explain how the structure of specialised animal and plant cells (such as sperm, nerve, muscle, root hair, xylem and phloem cells) suits their function.", ["u02-25"]),
        P("4.1.1.4", "Cell differentiation", "Explain what cell differentiation is, and compare when and how it happens in animals and in plants.", ["u02-27"], { partial: ["u05-21"] }),
        P("4.1.1.5", "Microscopy", "Explain how electron microscopes have improved our understanding of cells, and calculate magnification, real size and image size.", ["u09-26", "u01-14"], { partial: ["u01-15", "u02-01"] }),
        P("4.1.1.6", "Culturing microorganisms", "Describe how bacteria multiply and how to grow them safely with aseptic technique, and calculate the number of bacteria and the area of a culture.", ["u09-25", "u09-04"], { partial: ["u09-23"], sep: true }),
      ] },
      { id: "4.1.2", title: "Cell division", points: [
        P("4.1.2.1", "Chromosomes", "Describe how genetic material is carried in chromosomes in the nucleus, in pairs in body cells.", ["u04-05"], { partial: ["u04-06"] }),
        P("4.1.2.2", "Mitosis and the cell cycle", "Describe the stages of the cell cycle, including mitosis, and explain why cell division matters for growth and repair.", ["u05-01", "u05-02", "u05-03"]),
        P("4.1.2.3", "Stem cells", "Describe the function of stem cells in embryos, adults and plant meristems, and evaluate their medical use, including therapeutic cloning.", ["u02-26", "u05-14"], { partial: ["u12-20"] }),
      ] },
      { id: "4.1.3", title: "Transport in cells", points: [
        P("4.1.3.1", "Diffusion", "Explain diffusion, the factors that affect its rate, and how surface area to volume ratio and exchange surfaces are adapted for it.", ["u02-20"], { partial: ["u02-17", "u07-19"] }),
        P("4.1.3.2", "Osmosis", "Explain osmosis and use it to predict what happens to cells and plant tissue in solutions of different concentration.", ["u02-21"], { partial: ["u02-19"] }),
        P("4.1.3.3", "Active transport", "Explain how active transport moves substances against a concentration gradient using energy from respiration, and why root hair cells and the gut need it.", ["u02-23"], { partial: ["u08-11"] }),
      ] },
    ] },
    { id: "4.2", title: "Organisation", groups: [
      { id: "4.2.1", title: "Principles of organisation", points: [
        P("4.2.1", "Principles of organisation", "Describe how cells form tissues, tissues form organs, and organs form organ systems.", ["u07-01"], { partial: ["u01-03", "u02-30"] }),
      ] },
      { id: "4.2.2", title: "Animal tissues, organs and organ systems", points: [
        P("4.2.2.1", "The human digestive system", "Describe how the digestive system works, how enzymes break down food (the lock and key model), and the factors that affect enzyme activity.", ["u07-21", "u07-22", "u03-23", "u03-27"], { partial: ["u07-23", "u03-24"] }),
        P("4.2.2.2", "The heart and blood vessels", "Describe the structure of the heart, lungs and blood vessels, and explain how they are adapted to their functions.", ["u07-12", "u07-14", "u07-16", "u07-19"], { partial: ["u07-11", "u07-13", "u07-17"] }),
        P("4.2.2.3", "Blood", "Describe what blood is made of and explain how red cells, white cells and platelets are adapted to their functions.", ["u07-15"], { partial: ["u07-20"] }),
        P("4.2.2.4", "Coronary heart disease", "Describe coronary heart disease and evaluate the treatments for it, such as stents, statins and replacement valves.", ["u07-11"]),
        P("4.2.2.5", "Health issues", "Describe health and how communicable and non-communicable diseases and other factors interact to affect it.", [], { partial: ["u09-17", "u07-11"] }),
        P("4.2.2.6", "Lifestyle and non-communicable diseases", "Explain how diet, smoking, alcohol and exercise affect the risk of non-communicable diseases, and interpret the data.", ["u07-11", "u07-17"], { partial: ["u05-12"] }),
        P("4.2.2.7", "Cancer", "Describe cancer as the result of uncontrolled cell division, the difference between benign and malignant tumours, and the risk factors.", ["u05-12", "u05-13"]),
      ] },
      { id: "4.2.3", title: "Plant tissues, organs and systems", points: [
        P("4.2.3.1", "Plant tissues", "Describe the tissues of a leaf and explain how their structure suits their functions.", ["u08-02", "u08-05"]),
        P("4.2.3.2", "Plant organ system", "Explain how roots, stems and leaves transport water and food through xylem and phloem, including transpiration and translocation.", ["u08-06", "u08-07", "u08-08", "u08-09", "u08-10"]),
      ] },
    ] },
    { id: "4.3", title: "Infection and response", groups: [
      { id: "4.3.1", title: "Communicable diseases", points: [
        P("4.3.1.1", "Communicable diseases", "Explain how pathogens (viruses, bacteria, protists and fungi) cause disease and how their spread can be reduced.", ["u09-17", "u09-19"]),
        P("4.3.1.2", "Viral diseases", "Describe measles, HIV and tobacco mosaic virus: their symptoms, how they spread and how they are controlled.", ["u09-08", "u09-19"], { partial: ["u09-09"] }),
        P("4.3.1.3", "Bacterial diseases", "Describe salmonella food poisoning and gonorrhoea: their symptoms, how they spread and how they are controlled.", ["u09-17", "u09-19"]),
        P("4.3.1.4", "Fungal diseases", "Describe rose black spot: its symptoms, how it spreads and how it is treated.", [], { partial: ["u09-11"] }),
        P("4.3.1.5", "Protist diseases", "Describe malaria: its symptoms, its life cycle and how its spread is controlled.", ["u09-12"]),
        P("4.3.1.6", "Human defence systems", "Describe the body's non-specific defences and how white blood cells defend against pathogens.", ["u10-04", "u10-02", "u07-30"], { partial: ["u10-06", "u10-07", "u10-12"] }),
        P("4.3.1.7", "Vaccination", "Explain how vaccination works and why vaccinating a large part of the population protects it.", ["u10-20", "u10-19"]),
        P("4.3.1.8", "Antibiotics and painkillers", "Explain why antibiotics kill bacteria but not viruses, why painkillers treat only symptoms, and why antibiotic resistance matters.", ["u09-21"], { partial: ["u12-21"] }),
        P("4.3.1.9", "Discovery and development of drugs", "Describe where drugs come from, and how new drugs are tested in preclinical and clinical trials, including placebos and double-blind trials.", [], { partial: ["u01-11", "u13-23"] }),
      ] },
      { id: "4.3.2", title: "Monoclonal antibodies", points: [
        P("4.3.2.1", "Producing monoclonal antibodies", "Describe how monoclonal antibodies are produced from hybridoma cells.", ["u10-27", "u12-21"], { partial: ["u10-10"], sep: true }),
        P("4.3.2.2", "Uses of monoclonal antibodies", "Describe the uses of monoclonal antibodies in diagnosis, research and treatment, and evaluate their advantages and disadvantages.", ["u10-27", "u12-21"], { sep: true }),
      ] },
      { id: "4.3.3", title: "Plant disease", points: [
        P("4.3.3.1", "Detecting and identifying plant diseases", "Describe the signs of plant disease and how to identify it, including ion deficiencies and pests such as aphids.", [], { partial: ["u08-11", "u08-08"], sep: true }),
        P("4.3.3.2", "Plant defence responses", "Describe the physical, chemical and mechanical ways plants defend themselves.", [], { partial: ["u08-33"], sep: true }),
      ] },
    ] },
    { id: "4.4", title: "Bioenergetics", groups: [
      { id: "4.4.1", title: "Photosynthesis", points: [
        P("4.4.1.1", "Photosynthetic reaction", "Describe photosynthesis as an endothermic reaction, with its word and symbol equations.", ["u08-12"], { partial: ["u08-13", "u08-14"] }),
        P("4.4.1.2", "Rate of photosynthesis", "Explain how temperature, light intensity, carbon dioxide and chlorophyll limit the rate of photosynthesis, and interpret graphs of limiting factors.", ["u08-12"], { partial: ["u08-15"] }),
        P("4.4.1.3", "Uses of glucose from photosynthesis", "Describe how plants use the glucose they make: respiration, starch, cellulose, fats and oils, and amino acids.", ["u08-12"], { partial: ["u03-08", "u08-11"] }),
      ] },
      { id: "4.4.2", title: "Respiration", points: [
        P("4.4.2.1", "Aerobic and anaerobic respiration", "Compare aerobic and anaerobic respiration in animals, plants and yeast, with their equations.", ["u08-18"], { partial: ["u03-30", "u09-05"] }),
        P("4.4.2.2", "Response to exercise", "Explain how heart rate, breathing and oxygen debt change during and after exercise.", [], { partial: ["u07-16", "u07-18"] }),
        P("4.4.2.3", "Metabolism", "Describe metabolism as the sum of the reactions in a cell or the body, with examples.", ["u03-23"], { partial: ["u01-04", "u03-30"] }),
      ] },
    ] },
    { id: "4.5", title: "Homeostasis and response", groups: [
      { id: "4.5.1", title: "Homeostasis", points: [
        P("4.5.1", "Homeostasis", "Explain why internal conditions must be kept stable, and describe the parts of an automatic control system.", ["u07-02"]),
      ] },
      { id: "4.5.2", title: "The human nervous system", points: [
        P("4.5.2.1", "Structure and function", "Describe how the nervous system lets us react to our surroundings, including the reflex arc.", ["u07-03", "u07-04", "u07-06"], { partial: ["u07-08"] }),
        P("4.5.2.2", "The brain", "Describe the main regions of the brain and their functions, and why the brain is difficult to study and treat.", ["u07-07"], { sep: true }),
        P("4.5.2.3", "The eye", "Describe the structure of the eye, how it focuses on near and far objects, and how short and long sight are corrected.", [], { sep: true }),
        P("4.5.2.4", "Control of body temperature", "Explain how the thermoregulatory centre and the skin keep body temperature stable.", ["u07-33"], { sep: true }),
      ] },
      { id: "4.5.3", title: "Hormonal coordination in humans", points: [
        P("4.5.3.1", "Human endocrine system", "Describe the endocrine system, its main glands, and how hormones act compared with nerves.", ["u07-09", "u07-10"]),
        P("4.5.3.2", "Control of blood glucose", "Explain how insulin and glucagon control blood glucose, and compare type 1 and type 2 diabetes.", ["u07-23", "u07-02"]),
        P("4.5.3.3", "Water and nitrogen balance", "Explain how the kidneys control water and remove urea, the role of ADH, and the treatments for kidney failure.", ["u07-24", "u07-25", "u07-26"], { partial: ["u07-34"], sep: true }),
        P("4.5.3.4", "Hormones in human reproduction", "Describe the hormones of puberty and how they control the menstrual cycle.", ["u07-31"]),
        P("4.5.3.5", "Contraception", "Evaluate hormonal and non-hormonal methods of contraception.", ["u07-31"]),
        P("4.5.3.6", "Hormones to treat infertility", "Explain how hormones are used in fertility treatment and IVF, and evaluate the issues they raise.", ["u07-31"], { partial: ["u05-16"], ht: true }),
        P("4.5.3.7", "Negative feedback", "Explain how adrenaline and thyroxine are controlled, including negative feedback.", ["u07-09", "u07-10"], { partial: ["u07-02"], ht: true }),
      ] },
      { id: "4.5.4", title: "Plant hormones", points: [
        P("4.5.4.1", "Control and coordination", "Explain how auxin causes phototropism and gravitropism.", ["u08-20", "u08-25"], { partial: ["u08-19"], sep: true }),
        P("4.5.4.2", "Use of plant hormones", "Describe how auxins, ethene and gibberellins are used in agriculture and horticulture.", ["u08-20", "u08-21", "u08-24"], { ht: true, sep: true }),
      ] },
    ] },
    { id: "4.6", title: "Inheritance, variation and evolution", groups: [
      { id: "4.6.1", title: "Reproduction", points: [
        P("4.6.1.1", "Sexual and asexual reproduction", "Compare sexual and asexual reproduction, and the role of gametes and mitosis in each.", [], { partial: ["u08-32", "u05-04"] }),
        P("4.6.1.2", "Meiosis", "Explain how meiosis halves the number of chromosomes and produces genetically different gametes.", ["u05-04", "u05-05"], { partial: ["u05-16"] }),
        P("4.6.1.3", "Sexual and asexual reproduction compared", "Evaluate the advantages and disadvantages of sexual and asexual reproduction, including organisms that use both.", [], { partial: ["u08-32", "u06-05"], sep: true }),
        P("4.6.1.4", "DNA and the genome", "Describe DNA, genes and the genome, and why studying the human genome matters.", ["u04-01", "u04-07"], { partial: ["u04-33"] }),
        P("4.6.1.5", "DNA structure", "Describe the structure of DNA and explain how its base sequence codes for proteins, and how mutations change them.", ["u04-02", "u04-12", "u04-13"], { partial: ["u04-17"], sep: true }),
        P("4.6.1.6", "Genetic inheritance", "Explain dominant and recessive alleles, genotype and phenotype, and use Punnett squares and genetic crosses.", ["u04-20", "u04-21", "u04-22", "u04-23"]),
        P("4.6.1.7", "Inherited disorders", "Describe polydactyly and cystic fibrosis, and evaluate embryo screening.", ["u04-21"], { partial: ["u04-18", "u12-18"] }),
        P("4.6.1.8", "Sex determination", "Explain how the sex chromosomes determine sex, with a genetic cross.", ["u04-27"]),
      ] },
      { id: "4.6.2", title: "Variation and evolution", points: [
        P("4.6.2.1", "Variation", "Describe genetic and environmental variation, and how mutations produce new variants.", ["u06-05"], { partial: ["u04-34", "u06-06"] }),
        P("4.6.2.2", "Evolution", "Explain evolution by natural selection.", ["u06-03", "u06-04"]),
        P("4.6.2.3", "Selective breeding", "Describe how selective breeding works and evaluate its benefits and risks.", [], { partial: ["u12-01"] }),
        P("4.6.2.4", "Genetic engineering", "Describe how genes are transferred between organisms, and evaluate the benefits and risks of GM crops and gene therapy.", ["u12-02", "u12-03", "u12-05"], { partial: ["u08-34", "u12-19"] }),
        P("4.6.2.5", "Cloning", "Describe tissue culture, cuttings, embryo transplants and adult cell cloning, and evaluate their use.", [], { partial: ["u08-34", "u08-32"], sep: true }),
      ] },
      { id: "4.6.3", title: "Genetics and evolution: how understanding developed", points: [
        P("4.6.3.1", "Theory of evolution", "Describe Darwin's theory and why it was slow to be accepted, and compare it with Lamarck's ideas.", ["u06-01"], { sep: true }),
        P("4.6.3.2", "Speciation", "Explain how new species form, including Wallace's work on speciation.", ["u06-12", "u06-13", "u06-14"], { sep: true }),
        P("4.6.3.3", "Understanding of genetics", "Describe how Mendel's work led to our modern understanding of genes and chromosomes.", ["u04-20"], { partial: ["u04-01"], sep: true }),
        P("4.6.3.4", "Evidence for evolution", "Describe the evidence for evolution, including fossils and antibiotic resistance.", ["u06-02"]),
        P("4.6.3.5", "Fossils", "Describe how fossils form and what they show, and why the record is incomplete.", ["u06-19"]),
        P("4.6.3.6", "Extinction", "Describe the factors that can cause a species to become extinct.", [], { partial: ["u06-19", "u11-23"] }),
        P("4.6.3.7", "Resistant bacteria", "Explain how antibiotic-resistant bacteria evolve and how their spread can be reduced.", ["u06-23", "u09-22"]),
      ] },
      { id: "4.6.4", title: "Classification of living organisms", points: [
        P("4.6.4", "Classification", "Describe the Linnaean system and the three-domain system, and interpret evolutionary trees.", ["u01-05", "u01-06", "u06-17"], { partial: ["u01-07"] }),
      ] },
    ] },
    { id: "4.7", title: "Ecology", groups: [
      { id: "4.7.1", title: "Adaptations, interdependence and competition", points: [
        P("4.7.1.1", "Communities", "Describe ecosystems, interdependence and competition in plants and animals.", ["u11-04", "u11-16"], { partial: ["u11-07"] }),
        P("4.7.1.2", "Abiotic factors", "Explain how abiotic factors such as light, temperature and water affect communities.", ["u11-01"], { partial: ["u11-04"] }),
        P("4.7.1.3", "Biotic factors", "Explain how biotic factors such as food, predators and pathogens affect communities.", ["u11-16", "u11-17"]),
        P("4.7.1.4", "Adaptations", "Describe structural, behavioural and functional adaptations, including extremophiles.", ["u06-04"], { partial: ["u11-03"] }),
      ] },
      { id: "4.7.2", title: "Organisation of an ecosystem", points: [
        P("4.7.2.1", "Levels of organisation", "Describe food chains and predator–prey cycles, and how to measure the abundance and distribution of species with quadrats and transects.", ["u11-06", "u11-17", "u01-19"], { partial: ["u11-02"] }),
        P("4.7.2.2", "How materials are cycled", "Describe the carbon and water cycles and the role of microorganisms in returning materials to the environment.", ["u11-11", "u11-12", "u11-14"]),
        P("4.7.2.3", "Decomposition", "Explain how temperature, water and oxygen affect the rate of decay, and how compost and biogas are made.", ["u11-11"], { partial: ["u11-04"], sep: true }),
        P("4.7.2.4", "Impact of environmental change", "Evaluate how environmental change affects the distribution of species.", ["u11-26"], { ht: true, sep: true }),
      ] },
      { id: "4.7.3", title: "Biodiversity and human interaction", points: [
        P("4.7.3.1", "Biodiversity", "Explain what biodiversity is and why it matters for the stability of ecosystems.", ["u11-21", "u11-22"]),
        P("4.7.3.2", "Waste management", "Describe how human waste pollutes water, air and land.", ["u11-27"]),
        P("4.7.3.3", "Land use", "Describe how building, farming and peat extraction reduce the land for other animals and plants.", [], { partial: ["u11-12"] }),
        P("4.7.3.4", "Deforestation", "Describe why large-scale deforestation happens and its effects.", [], { partial: ["u11-14", "u11-12"] }),
        P("4.7.3.5", "Global warming", "Describe the causes and biological consequences of global warming.", ["u11-26"]),
        P("4.7.3.6", "Maintaining biodiversity", "Evaluate the ways people reduce the negative effects of human activity on ecosystems and biodiversity.", ["u11-29", "u11-23"]),
      ] },
      { id: "4.7.4", title: "Trophic levels in an ecosystem", points: [
        P("4.7.4.1", "Trophic levels", "Describe trophic levels, from producers to apex predators and decomposers.", ["u11-09"], { sep: true }),
        P("4.7.4.2", "Pyramids of biomass", "Construct and interpret pyramids of biomass.", ["u11-09"], { sep: true }),
        P("4.7.4.3", "Transfer of biomass", "Explain why only a small fraction of biomass passes to the next trophic level, and calculate the efficiency of transfer.", ["u11-08"], { partial: ["u11-10"], sep: true }),
      ] },
      { id: "4.7.5", title: "Food production", points: [
        P("4.7.5.1", "Factors affecting food security", "Describe the biological factors that threaten food security.", [], { partial: ["u11-30", "u11-11"], sep: true }),
        P("4.7.5.2", "Farming techniques", "Evaluate how intensive farming increases the efficiency of food production, and the ethical objections.", [], { partial: ["u11-30"], sep: true }),
        P("4.7.5.3", "Sustainable fisheries", "Explain how fish stocks are kept at a sustainable level.", ["u11-30"], { sep: true }),
        P("4.7.5.4", "Role of biotechnology", "Describe how mycoprotein and GM crops can help feed a growing population.", [], { partial: ["u09-29", "u12-01"], sep: true }),
      ] },
    ] },
  ],
};
