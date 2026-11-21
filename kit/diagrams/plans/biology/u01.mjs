// Biology unit 1 (Foundations of Biology) diagram plan: every lesson, with its diagram, lab or the reason it has none.
//   [lessonId, renderer, diagramId, what it shows] | [lessonId, "lab", labId, what it lets you do] | [lessonId, null, reason]
const PROSE = "a list of ideas or criteria the text teaches directly; a picture would only decorate";
const METHOD = "a method or calculation set out step by step in the text; no structure or process to picture";
export default [
  ["u01-01", null, "an overview of the subject: no single picture carries it"],
  ["u01-02", null, PROSE],
  ["u01-03", "bio-levels", "bio-u01-levels-of-organisation", "the levels of organisation from atom to biosphere, each with the lesson's example"],
  ["u01-04", null, PROSE],
  ["u01-05", "bio-levels", "bio-u01-taxonomic-ranks", "the eight ranks from domain to species, with the human classification at each"],
  ["u01-06", "bio-phylo", "bio-u01-three-domains", "the three-domain tree: Archaea and Eukarya share a more recent common ancestor than either does with Bacteria"],
  ["u01-06", "lab", "tree-of-life", "explore the tree of life"],
  ["u01-07", null, "the kingdoms are a list; the tree that matters (and the problem with protists) needs more groups than the lesson names"],
  ["u01-08", "bio-pathway", "bio-u01-scientific-method", "the scientific method as a cycle of six stages that loops back to new observations"],
  ["u01-09", null, PROSE],
  ["u01-10", null, PROSE],
  ["u01-11", null, PROSE],
  ["u01-12", "graph", "bio-u01-accuracy-precision", "three sets of repeat readings against the true value: accurate and precise, precise only, accurate only"],
  ["u01-13", null, PROSE],
  ["u01-14", "bio-scale", "bio-u01-scales", "sizes of proteins, viruses, bacteria and eukaryotic cells on a log scale, the light microscope limit and the magnification example"],
  ["u01-15", null, METHOD],
  ["u01-16", null, METHOD],
  ["u01-17", null, "how to choose, draw and read graphs: the rules are clearer as text, and the lesson gives no dataset to plot"],
  ["u01-18", "graph", "bio-u01-normal-distribution", "the normal distribution with 68% within one standard deviation and 95% within two"],
  ["u01-19", null, "sampling strategies described in prose; a quadrat picture would only decorate"],
  ["u01-20", null, "ethics: a discussion, not a structure or process"],
];
