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
];
