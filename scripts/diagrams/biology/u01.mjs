// Unit 1 (Foundations of Biology) diagram specs. Run: node scripts/diagrams/biology/u01.mjs
// Every label and example is taken from the lesson's own notes (kit/courses/biology/notes/u01.js).
import { mk } from "./spec.mjs";

mk("u01-03", "bio-u01-levels-of-organisation", "bio-levels", {
  title: "Levels of biological organisation",
  caption: "Each level is built from the one above it in this list and has properties the parts alone lack: a heart muscle cell contracts, but only the organised organ pumps blood.",
  alt: "A ladder of levels from atom to biosphere, each with an example, with an arrow from simplest to most inclusive.",
  description: [
    "Twelve levels are listed from top to bottom, with an arrow down the left from simplest to most inclusive.",
    "Atom (carbon, oxygen), molecule (haemoglobin, DNA), organelle (a mitochondrion) and cell (a heart muscle cell).",
    "Tissue (muscle tissue), organ (the heart), organ system (the circulatory system) and organism (an individual living thing).",
    "Population (individuals of one species in an area), community (all the populations in an area), ecosystem (a community plus its non-living environment) and biosphere (all ecosystems on Earth).",
  ],
  scale: "organisation", ends: ["simplest", "most inclusive"],
  levels: [
    { name: "Atom", example: "carbon, hydrogen, oxygen, nitrogen" }, { name: "Molecule", example: "proteins such as haemoglobin; DNA" },
    { name: "Organelle", example: "a mitochondrion" }, { name: "Cell", example: "a heart muscle cell" }, { name: "Tissue", example: "muscle tissue" },
    { name: "Organ", example: "the heart" }, { name: "Organ system", example: "the circulatory system" }, { name: "Organism", example: "an individual living thing" },
    { name: "Population", example: "individuals of one species in an area" }, { name: "Community", example: "all the populations in an area" },
    { name: "Ecosystem", example: "a community plus its non-living environment" }, { name: "Biosphere", example: "all ecosystems on Earth" },
  ],
});

mk("u01-05", "bio-u01-taxonomic-ranks", "bio-levels", {
  title: "The taxonomic ranks, with the classification of humans",
  caption: "Each rank sits inside the one above it: many species share a genus, many genera a family, up to the three domains. Humans are one species in each of the nested groups.",
  alt: "The eight taxonomic ranks from domain to species, each with the human group at that rank, from Eukarya to Homo sapiens.",
  description: [
    "The ranks are listed from broadest at the top to narrowest at the bottom: domain, kingdom, phylum, class, order, family, genus, species.",
    "Beside each rank is the group humans belong to: domain Eukarya, kingdom Animalia, phylum Chordata, class Mammalia.",
    "Then order Primates, family Hominidae, genus Homo and species Homo sapiens. The two-part species name is the genus plus the specific epithet.",
  ],
  scale: "taxonomy", complete: true, ends: ["broadest", "narrowest"],
  levels: [
    { name: "Domain", example: "Eukarya" }, { name: "Kingdom", example: "Animalia" }, { name: "Phylum", example: "Chordata" }, { name: "Class", example: "Mammalia" },
    { name: "Order", example: "Primates" }, { name: "Family", example: "Hominidae" }, { name: "Genus", example: "Homo" }, { name: "Species", example: "Homo sapiens" },
  ],
});

mk("u01-06", "bio-u01-three-domains", "bio-phylo", {
  title: "The three domains of life",
  caption: "Ribosomal RNA sequences split life into three deep groups. Archaea look like bacteria (no nucleus) but share a more recent common ancestor with eukaryotes.",
  alt: "A tree with the root splitting into Bacteria and a branch that splits into Archaea and Eukarya.",
  description: [
    "The tree starts from a single root at the left: the common ancestor of all life.",
    "The first split separates Bacteria from a lineage that later splits again into Archaea and Eukarya.",
    "So Archaea and Eukarya are each other's closest relatives, even though archaea, like bacteria, have no nucleus.",
  ],
  tree: ["Bacteria", ["Archaea", "Eukarya"]], clades: [["Archaea", "Eukarya"]], closer: [["Archaea", "Eukarya", "Bacteria"], ["Eukarya", "Archaea", "Bacteria"]],
  root: "common ancestor", highlight: { Bacteria: "a1", Archaea: "a3", Eukarya: "a4" },
});

mk("u01-08", "bio-u01-scientific-method", "bio-pathway", {
  title: "The scientific method as a cycle",
  caption: "Results usually raise new questions, so the method loops back on itself rather than ending at a conclusion.",
  alt: "Six stages in a loop: observation, question and hypothesis, prediction, experiment, analysis and conclusion, communication and peer review, back to observation.",
  description: [
    "Six stages are joined by arrows in a loop.",
    "Observation leads to a question and a testable hypothesis, then a prediction of what should happen if the hypothesis is right.",
    "An experiment or observation collects data under controlled conditions; analysis decides whether the data support or refute the hypothesis.",
    "Communication and peer review let other scientists scrutinise and repeat the work, which leads to new observations and the cycle begins again.",
  ],
  kind: "cycle", radius: 160,
  steps: [{ name: "Observation" }, { name: "Question and hypothesis" }, { name: "Prediction" }, { name: "Experiment" }, { name: "Analysis and conclusion" }, { name: "Communication and peer review" }],
});

mk("u01-12", "bio-u01-accuracy-precision", "graph", {
  title: "Accuracy and precision in repeated measurements",
  caption: "Set A is accurate and precise. Set B is precise but not accurate: a systematic error shifts every reading. Set C is accurate on average but imprecise: random error spreads the readings.",
  alt: "Three sets of five readings, labelled A, B and C, plotted against a dashed true-value line at 42: A tightly clustered on the line, B tightly clustered above it, C spread widely around it.",
  description: [
    "The vertical axis is the measured value; a dashed line marks the true value, 42.",
    "Set A: five readings between 41.8 and 42.2, close together and centred on the true value: accurate and precise.",
    "Set B: five readings between 44.8 and 45.2, close together but all about 3 too high: precise, not accurate (a systematic error).",
    "Set C: readings from 39 to 45 whose mean is 42: accurate on average but imprecise (random error).",
  ],
  range: { x: [0, 3.6], y: [37, 47] }, ticks: [[], [38, 40, 42, 44, 46]], grid: [10, 2], height: [380, 340], xLabelBelow: true,
  axisLabels: ["three sets of five repeat readings", "measured value"],
  marks: [{ y: 42, label: "true value" }],
  bands: [{ x: [0.3, 1.08], label: "A", colour: "a4" }, { x: [1.45, 2.23], label: "B", colour: "a2" }, { x: [2.6, 3.38], label: "C", colour: "a1" }],
  points: [
    ...[41.8, 42.1, 42.0, 41.9, 42.2].map((y, i) => ({ x: 0.45 + i * 0.12, y, colour: "a4" })),
    ...[45.0, 45.2, 44.9, 45.1, 44.8].map((y, i) => ({ x: 1.6 + i * 0.12, y, colour: "a2" })),
    ...[39, 45, 41, 44, 41].map((y, i) => ({ x: 2.75 + i * 0.12, y, colour: "a1" })),
  ],
  checks: [
    { type: "stats", values: [41.8, 42.1, 42.0, 41.9, 42.2], truth: 42, tolMean: 0.5, tolSd: 0.5, accurate: true, precise: true, name: "set A is accurate and precise (mean within 0.5 of 42, standard deviation under 0.5)" },
    { type: "stats", values: [45.0, 45.2, 44.9, 45.1, 44.8], truth: 42, tolMean: 0.5, tolSd: 0.5, accurate: false, precise: true, name: "set B is precise but not accurate" },
    { type: "stats", values: [39, 45, 41, 44, 41], truth: 42, tolMean: 0.5, tolSd: 0.5, accurate: true, precise: false, name: "set C is accurate on average but not precise" },
  ],
});

mk("u01-14", "bio-u01-scales", "bio-scale", {
  title: "The sizes of biological objects",
  caption: "Each step on the scale is ten times the last. Light microscopes resolve down to about 0.2 µm, enough for cells and bacteria; viruses and proteins need an electron microscope.",
  alt: "A logarithmic size scale from 1 nanometre to 100 micrometres with bars for proteins, viruses, the light microscope limit, bacteria and eukaryotic cells.",
  description: [
    "A logarithmic scale runs from 1 nm to 100 µm; each tick is ten times the one before.",
    "Proteins are about 2–10 nm across and viruses 20–300 nm.",
    "The light microscope's resolution, about 0.2 µm, falls between viruses and bacteria, which are about 1–5 µm.",
    "Eukaryotic cells are about 10–100 µm.",
    "Worked example from the lesson: an image 15 mm long at ×10,000 is 15,000 µm ÷ 10,000 = 1.5 µm long.",
  ],
  items: [
    { name: "protein", from: 2, to: 10, unit: "nm" }, { name: "virus", from: 20, to: 300, unit: "nm", aka: ["viruses"] },
    { name: "light microscope resolution", size: 0.2, unit: "µm", aka: ["light microscopes resolve"] },
    { name: "bacterium", from: 1, to: 5, unit: "µm", aka: ["bacteria"] }, { name: "eukaryotic cell", from: 10, to: 100, unit: "µm" },
  ],
  magnification: { image: [15, "mm"], actual: [1.5, "µm"], M: 10000 },
});

mk("u01-18", "bio-u01-normal-distribution", "graph", {
  title: "The normal distribution",
  caption: "About 68% of values lie within one standard deviation of the mean and about 95% within two, which is why the standard deviation is a useful measure of spread.",
  alt: "A bell-shaped curve centred on the mean, with the region within one standard deviation shaded darker and within two standard deviations shaded lighter.",
  description: [
    "The horizontal axis is the distance from the mean in standard deviations, from −3 to +3. The curve is bell-shaped and symmetrical about the mean.",
    "The darker band between −1 and +1 standard deviations holds about 68% of the values.",
    "The lighter band out to −2 and +2 standard deviations brings the total to about 95%.",
  ],
  range: { x: [-3.5, 3.5], y: [0, 0.48] }, ticks: [[-3, -2, -1, 0, 1, 2, 3], []], grid: [1, 1], height: [340, 300], xLabelBelow: true,
  axisLabels: ["standard deviations from the mean", "frequency"],
  areas: [{ expr: "exp(-x^2/2)/sqrt(2*3.14159265)", from: -2, to: 2, colour: "a1", opacity: 0.14 }, { expr: "exp(-x^2/2)/sqrt(2*3.14159265)", from: -1, to: 1, colour: "a1", opacity: 0.28 }],
  curves: [{ expr: "exp(-x^2/2)/sqrt(2*3.14159265)", colour: "a1" }],
  arrows: [{ from: [-1, 0.3], to: [1, 0.3], both: true, colour: "ink", label: "about 68%", labelAt: [0, 0.33], anchor: "middle" },
    { from: [-2, 0.08], to: [2, 0.08], both: true, colour: "soft", label: "about 95%", labelAt: [0, 0.11], anchor: "middle" }],
  checks: [
    { type: "area", expr: "exp(-x^2/2)/sqrt(2*3.14159265)", from: -1, to: 1, value: 0.6827, tol: 0.002, name: "68% of values lie within one standard deviation of the mean" },
    { type: "area", expr: "exp(-x^2/2)/sqrt(2*3.14159265)", from: -2, to: 2, value: 0.9545, tol: 0.002, name: "95% of values lie within two standard deviations" },
    { type: "area", expr: "exp(-x^2/2)/sqrt(2*3.14159265)", from: -6, to: 6, value: 1, tol: 0.001, name: "the curve is a normalised distribution (area 1)" },
    { type: "max", expr: "exp(-x^2/2)/sqrt(2*3.14159265)", domain: [-3, 3], x: 0, y: 0.398942, name: "the peak is at the mean" },
  ],
});
