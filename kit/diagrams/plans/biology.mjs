// The biology diagram plan: every written lesson in SciGradify Biology (kit/courses/biology), each with the diagram
// it gets, the interactive lab that already covers it, or the reason it has neither.
//
//   [lessonId, renderer, diagramId, what it shows]   a diagram (spec in kit/diagrams/specs/<id>.json)
//   [lessonId, "lab", labId, what it lets you do]    an interactive in kit/courses/biology/interactives.js
//   [lessonId, null, reason]                         no visual, and why
//
// Specs are written by scripts/diagrams/biology/u*.py; renderers are in kit/diagrams/bio-renderers.js (cross, strand,
// pyramid, pedigree, cellmap, membrane) and the shared graph, flow, trend and decision-tree renderers.
export const NAME = "SciGradify Biology";
const NOT_VISUAL = "the idea is a definition, method or argument that a picture would not teach";
export const PLAN = [
  // 1. Foundations of Biology
  ["u01-01", null, "an overview of the subject: no single picture carries it"],
  ["u01-02", null, "a list of the properties of life and the case of viruses: carried in the text"],
  ["u01-03", "flow", "bio-levels-of-organisation", "the hierarchy from atoms and molecules to the biosphere"],
  ["u01-03", "lab", "organ-systems", "explore the organ systems of the body"],
  ["u01-04", null, "applies the characteristics of life to hard cases: an argument, not a picture"],
  ["u01-05", "flow", "bio-taxonomic-ranks", "the eight ranks from domain to species, for humans"],
  ["u01-06", "lab", "tree-of-life", "explore the three domains on the tree of life"],
  ["u01-07", null, "the kingdoms are described by their features; no single test separates the protists, so a key would mislead"],
  ["u01-08", "flow", "bio-scientific-method", "the cycle of observation, hypothesis, prediction, experiment, conclusion and review"],
  ["u01-09", null, NOT_VISUAL],
  ["u01-10", "lab", "enzyme-kinetics", "change one variable and hold the others constant"],
  ["u01-11", null, NOT_VISUAL],
  ["u01-12", "graph", "bio-accuracy-precision", "four sets of repeats: accurate, precise, both or neither"],
  ["u01-13", null, NOT_VISUAL],
  ["u01-14", "trend", "bio-scale-of-life", "sizes from a protein to an egg cell on a logarithmic axis"],
  ["u01-15", null, NOT_VISUAL],
  ["u01-16", null, NOT_VISUAL],
  ["u01-17", "decision-tree", "bio-which-graph", "choosing a bar chart, histogram, scatter graph or line graph"],
  ["u01-18", "graph", "bio-normal-distribution", "the normal curve with 68% and 95% of values within one and two standard deviations"],
  ["u01-18", "lab", "punnett", "test observed genetic ratios against expected with chi-squared"],
  ["u01-19", "lab", "population", "sample a population"],
  ["u01-20", null, "the ethics of research is an argument: carried in the text"],

  // 2. Cell Biology
  ["u02-01", null, "the three principles and a magnification calculation: carried in the text and the worked question"],
  ["u02-02", "cellmap", "bio-prokaryotic-cell", "a labelled bacterium: nucleoid, plasmid, 70S ribosomes, wall, capsule, pili, flagellum"],
  ["u02-03", "lab", "cell-explorer", "compare animal and plant cells organelle by organelle"],
  ["u02-04", "cellmap", "bio-animal-cell", "a labelled animal cell"],
  ["u02-04", "lab", "cell-explorer", "tap every organelle in an animal cell"],
  ["u02-05", "cellmap", "bio-plant-cell", "a labelled plant cell with wall, chloroplasts and the vacuole"],
  ["u02-05", "lab", "cell-explorer", "compare the plant cell with the animal cell"],
  ["u02-06", "cellmap", "bio-fungal-cell", "a labelled fungal hypha with its chitin wall and septum"],
  ["u02-07", "envelope", "bio-gram-walls", "Gram-positive and Gram-negative walls drawn to scale"],
  ["u02-08", "route", "bio-secretory-pathway", "the route of a secreted protein through the endomembrane system"],
  ["u02-08", "lab", "cell-explorer", "sort the organelles by job"],
  ["u02-08", "lab", "organelle-id", "find each organelle"],
  ["u02-09", "lab", "organelle-id", "find the nucleus and nucleolus"],
  ["u02-10", "lab", "organelle-id", "find the mitochondria"],
  ["u02-11", "lab", "organelle-id", "find the chloroplasts"],
  ["u02-12", "lab", "ribosome", "watch a ribosome translate an mRNA"],
  ["u02-13", "route", "bio-secretory-pathway", "rough ER as the first stop on the secretory route"],
  ["u02-14", "route", "bio-secretory-pathway", "the Golgi apparatus between the ER and the cell surface"],
  ["u02-14", "lab", "organelle-id", "find the Golgi apparatus"],
  ["u02-15", null, "two kinds of small digestive compartment and their disorders: carried in the text"],
  ["u02-16", null, "three filament types and their motors: a list of properties a picture would not add to"],
  ["u02-17", null, "the functions of membranes: a list, drawn properly in the next lesson"],
  ["u02-18", null, "the fluid mosaic structure: needs a cross-section drawing, not yet built (a bilayer renderer is planned)"],
  ["u02-19", "decision-tree", "bio-which-route", "choosing the route across a membrane from size, gradient and chemistry"],
  ["u02-20", "graph", "bio-surface-area-volume", "surface area to volume ratio falling as a cube grows"],
  ["u02-21", "tonicity", "bio-osmosis-cells", "a red blood cell and a plant cell in higher, equal and lower water potential"],
  ["u02-22", "membrane", "bio-facilitated-diffusion", "oxygen through the lipid, potassium through a channel, glucose on a carrier"],
  ["u02-22", "graph", "bio-diffusion-saturation", "facilitated diffusion levels off while simple diffusion keeps rising"],
  ["u02-23", "membrane", "bio-active-transport-gut", "the sodium-potassium pump and SGLT1 co-transport in a gut lining cell"],
  ["u02-24", "membrane", "bio-bulk-transport", "phagocytosis, receptor-mediated endocytosis and exocytosis"],
  ["u02-25", null, "specialised cells: a list of cell-by-cell structure and function pairs"],
  ["u02-26", "lineage", "bio-stem-cell-potency", "potency narrowing from zygote to red blood cell"],
  ["u02-27", null, "gene regulation in outline: an argument about the same genome used differently"],
  ["u02-28", "flow", "bio-adrenaline-cascade", "from one adrenaline molecule to many glucose molecules"],
  ["u02-29", null, "three animal junctions and plant plasmodesmata: needs a tissue drawing, not yet built"],
  ["u02-30", "flow", "bio-levels-of-organisation", "cells, tissues, organs and organ systems in the chain of levels"],
  ["u02-30", "lab", "organ-systems", "explore the organ systems of the body"],
];
