// Mappings, specification → knowledge: which canonical concepts each specification outcome needs. These are Gradify's
// judgements about what a specification requires, kept apart from the specification records themselves. `claim` uses
// the vocabulary of kit/curriculum/coverage.js: "mapped" until a reviewer has checked the mapping against the
// published specification, then "verified" with `reviewed: { by, on }`.
//
// `practical: true` means the outcome is a practical activity: a lesson covers it only if its binding says so
// (covers: ["practical"] in mappings/lessons.js), not merely by teaching the concept.

const M = (spec, outcome, concepts, extra = {}) => ({ spec, outcome, concepts, claim: "mapped", reviewed: null, ...extra });

export const OUTCOME_MAPS = [
  // national curriculum in England, Key Stage 3
  M("dfe-ks3-science", "bio-cells-structure", ["BIO-CELL-MEMBRANE-001"]),
  M("dfe-ks3-science", "bio-cells-diffusion", ["BIO-CELL-DIFFUSION-001"]),
  // AQA GCSE Combined Science: Trilogy
  M("aqa-8464", "4.1.3.1", ["BIO-CELL-DIFFUSION-001"]),
  M("aqa-8464", "4.1.3.2", ["BIO-CELL-OSMOSIS-001", "BIO-CELL-MEMBRANE-001"]),
  M("aqa-8464", "4.1.3.3", ["BIO-CELL-ACTIVE-TRANSPORT-001"]),
  M("aqa-8464", "rp-osmosis", ["BIO-CELL-OSMOSIS-001"], { practical: true }),
  // AQA GCSE Biology
  M("aqa-8461", "4.1.3.1", ["BIO-CELL-DIFFUSION-001"]),
  M("aqa-8461", "4.1.3.2", ["BIO-CELL-OSMOSIS-001", "BIO-CELL-MEMBRANE-001"]),
  M("aqa-8461", "4.1.3.3", ["BIO-CELL-ACTIVE-TRANSPORT-001"]),
  M("aqa-8461", "rp-osmosis", ["BIO-CELL-OSMOSIS-001"], { practical: true }),
  // AQA A level Biology
  M("aqa-7402", "3.2.3-membrane", ["BIO-CELL-MEMBRANE-001"]),
  M("aqa-7402", "3.2.3-diffusion", ["BIO-CELL-DIFFUSION-001"]),
  M("aqa-7402", "3.2.3-osmosis", ["BIO-CELL-OSMOSIS-001"]),
  M("aqa-7402", "3.2.3-active", ["BIO-CELL-ACTIVE-TRANSPORT-001"]),
  M("aqa-7402", "rp-water-potential", ["BIO-CELL-OSMOSIS-001"], { practical: true }),
];
