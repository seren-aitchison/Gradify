// The biology the diagram checks rely on (kit/diagrams/bio-renderers.js): crosses, the genetic code, mutations,
// pedigree reasoning, transport across membranes, osmosis, the endomembrane route, stem cell potency and Gram walls.
import { test } from "node:test";
import assert from "node:assert/strict";
import { render } from "../kit/diagrams/renderers.js";
import { gametes, crossOf, translate, transcribe, complement, mutationKind, pedigreeFits, osmoticOutcome, chargeOf, codonCount, bandFractions, chromatidsAfter, divide, wrightFisher, bandsOf, cutDna, sangerFragments, needlemanScore, scoreAlignment, rfOf, bilayerNumbers, fitOk, waterCluster, hydrogenBonds, HOH } from "../kit/diagrams/bio-renderers.js";
import "../kit/diagrams/chem-renderers-3.js"; // the shared flow renderer, which route and lineage draw with

const mono = { alleles: ["T", "t"], dominance: { kind: "complete", dominant: "T", traits: ["tall", "short"] } };

test("gametes: one allele per gene, independent assortment", () => {
  assert.deepEqual(gametes(["T t"]).map((g) => g.join("")), ["T", "t"]);
  assert.deepEqual(gametes(["R r", "Y y"]).map((g) => g.join("")), ["RY", "Ry", "rY", "ry"]);
  assert.equal(gametes(["T T"]).length, 1);
});

test("monohybrid and dihybrid crosses give 3:1 and 9:3:3:1", () => {
  const m = crossOf({ loci: [mono], parents: [{ genotype: ["T t"] }, { genotype: ["T t"] }] });
  assert.deepEqual(m.geno, { TT: 1, Tt: 2, tt: 1 });
  assert.deepEqual(m.pheno, { tall: 3, short: 1 });
  const seed = { alleles: ["R", "r"], dominance: { kind: "complete", dominant: "R", traits: ["round", "wrinkled"] } };
  const colour = { alleles: ["Y", "y"], dominance: { kind: "complete", dominant: "Y", traits: ["yellow", "green"] } };
  const d = crossOf({ loci: [seed, colour], parents: [{ genotype: ["R r", "Y y"] }, { genotype: ["R r", "Y y"] }] });
  assert.deepEqual(Object.values(d.pheno).sort((a, b) => b - a), [9, 3, 3, 1]);
});

test("sex linkage: a carrier mother passes haemophilia to half her sons", () => {
  const L = { alleles: ["Xᴴ", "Xʰ", "Y"], dominance: { kind: "sexlinked", disease: "Xʰ", recessive: true, trait: "haemophiliac" } };
  const x = crossOf({ loci: [L], parents: [{ genotype: ["Xᴴ Y"] }, { genotype: ["Xᴴ Xʰ"] }] });
  assert.deepEqual(x.pheno, { "unaffected female": 1, "unaffected male": 1, "carrier female": 1, "haemophiliac male": 1 });
});

test("the genetic code: transcription, translation and stop codons", () => {
  assert.equal(complement("ATGC"), "TACG");
  assert.equal(transcribe("ATGTTT"), "AUGUUU");
  assert.deepEqual(translate("AUGUUUGGCUAA"), ["Met", "Phe", "Gly", "Stop"]);
  assert.deepEqual(translate("UGG"), ["Trp"]);
});

test("mutations: silent, missense, nonsense and frameshift", () => {
  assert.equal(mutationKind("GGA", "GGG"), "silent");
  assert.equal(mutationKind("GAG", "GTG"), "missense"); // sickle cell: Glu → Val
  assert.equal(mutationKind("TGG", "TAG"), "nonsense");
  assert.equal(mutationKind("ATGGCC", "ATGCC"), "frameshift");
});

const fam = (people) => ({ people });
test("pedigrees: two unaffected parents with an affected child rule out dominant inheritance", () => {
  const p = fam([
    { id: "I-1", sex: "m", gen: 1, x: 0 }, { id: "I-2", sex: "f", gen: 1, x: 1 },
    { id: "II-1", sex: "f", gen: 2, x: 0, affected: true, parents: ["I-1", "I-2"] }, { id: "II-2", sex: "m", gen: 2, x: 1, parents: ["I-1", "I-2"] },
  ]);
  assert.equal(pedigreeFits(p, "AR"), true);
  assert.equal(pedigreeFits(p, "AD"), false);
  assert.equal(pedigreeFits(p, "XR"), false); // an affected daughter needs an affected father
});

test("pedigrees: an affected mother with an unaffected son rules out X-linked recessive", () => {
  const p = fam([{ id: "I-1", sex: "m", gen: 1, x: 0 }, { id: "I-2", sex: "f", gen: 1, x: 1, affected: true }, { id: "II-1", sex: "m", gen: 2, x: 0, parents: ["I-1", "I-2"] }]);
  assert.equal(pedigreeFits(p, "XR"), false);
  assert.equal(pedigreeFits(p, "AR"), true);
});

test("membrane checks fail passive transport drawn up a gradient", () => {
  const spec = { renderer: "membrane", alt: "x", sides: [{ id: "out", label: "outside", conc: { glucose: 1 } }, { id: "in", label: "inside", conc: { glucose: 5 } }],
    moves: [{ substance: "glucose", kind: "carrier", from: "out", to: "in" }] };
  assert.equal(render(spec).checks.every((c) => c.ok), false);
  spec.sides[0].conc.glucose = 9;
  assert.equal(render(spec).checks.every((c) => c.ok), true);
});

test("pyramid checks fail an energy pyramid that grows", () => {
  const spec = { renderer: "pyramid", alt: "x", kind: "energy", unit: "kJ", levels: [{ label: "p", value: 100 }, { label: "c", value: 120 }] };
  assert.equal(render(spec).checks.every((c) => c.ok), false);
});

test("cell checks fail a prokaryote labelled with a nucleus", () => {
  const spec = { renderer: "cellmap", alt: "x", cell: "prokaryote", labels: ["nucleoid", "nucleus"] };
  assert.equal(render(spec).checks.every((c) => c.ok), false);
});

const allPass = (spec) => render(spec).checks.every((c) => c.ok);

test("membrane: the concentration unit is printed, never the course unit", () => {
  const spec = { renderer: "membrane", alt: "x", unit: "u02", concUnit: "mmol dm^{−3}", sides: [{ id: "out", label: "outside", conc: { glucose: 5 } }, { id: "in", label: "inside", conc: { glucose: 1 } }],
    moves: [{ substance: "glucose", kind: "carrier", from: "out", to: "in" }] };
  const r = render(spec);
  assert.ok(r.wide.includes("concentrations in") && !r.wide.includes("u02"));
});

test("membrane: a pump's display label does not hide its gradient check", () => {
  const spec = { renderer: "membrane", alt: "x", sides: [{ id: "out", label: "outside", conc: { "Na⁺": 145 } }, { id: "in", label: "inside", conc: { "Na⁺": 12 } }],
    moves: [{ substance: "Na⁺", label: "3 Na⁺", count: 3, kind: "active", atp: true, from: "in", to: "out" }] };
  assert.ok(render(spec).checks.some((c) => /against its gradient/.test(c.name)));
  assert.equal(allPass(spec), true);
  spec.sides[1].conc["Na⁺"] = 200; // now it would run downhill: not active transport
  assert.equal(allPass(spec), false);
});

test("membrane: the Na⁺/K⁺ pump moves one net positive charge out per cycle", () => {
  assert.equal(chargeOf("Na⁺"), 1); assert.equal(chargeOf("Ca²⁺"), 2); assert.equal(chargeOf("Cl⁻"), -1); assert.equal(chargeOf("glucose"), 0);
  const spec = { renderer: "membrane", alt: "x", sides: [{ id: "out", label: "outside", conc: { "Na⁺": 145, "K⁺": 4 } }, { id: "in", label: "inside", conc: { "Na⁺": 12, "K⁺": 140 } }],
    proteins: { pump: "Na⁺/K⁺ pump" },
    moves: [{ substance: "Na⁺", count: 3, kind: "active", atp: true, from: "in", to: "out", protein: "pump" }, { substance: "K⁺", count: 2, kind: "active", atp: true, from: "out", to: "in", protein: "pump" }],
    claims: [{ type: "netCharge", protein: "pump", out: 1 }] };
  assert.equal(allPass(spec), true);
  spec.claims[0].out = -1;
  assert.equal(allPass(spec), false);
});

test("membrane: co-transport needs something running down its gradient, and no ATP", () => {
  const spec = { renderer: "membrane", alt: "x", cell: "cell", proteins: { s: "SGLT1" },
    sides: [{ id: "lumen", label: "lumen", conc: { "Na⁺": 140, glucose: 0.5 } }, { id: "cell", label: "cell", conc: { "Na⁺": 12, glucose: 8 } }],
    moves: [{ substance: "Na⁺", kind: "cotransport", from: "lumen", to: "cell", protein: "s" }, { substance: "glucose", kind: "cotransport", from: "lumen", to: "cell", protein: "s" }] };
  assert.equal(allPass(spec), true);
  spec.sides[1].conc["Na⁺"] = 160; // sodium would have to go uphill too: nothing pays
  assert.equal(allPass(spec), false);
  spec.sides[1].conc["Na⁺"] = 12; spec.moves[1].atp = true;
  assert.equal(allPass(spec), false);
});

test("osmosis: water moves to the lower water potential, and the cell responds as its kind does", () => {
  assert.equal(osmoticOutcome("animal", -750, 0, 0), "bursts");
  assert.equal(osmoticOutcome("animal", -750, 0, -1500), "crenated");
  assert.equal(osmoticOutcome("plant", -700, 300, 0), "turgid");
  assert.equal(osmoticOutcome("plant", -700, 300, -400), "unchanged");
  assert.equal(osmoticOutcome("plant", -700, 300, -500), "flaccid"); // the lesson's worked example: water leaves
  assert.equal(osmoticOutcome("plant", -700, 300, -1400), "plasmolysed");
  const spec = { renderer: "tonicity", alt: "x", columns: ["a"], rows: [{ cell: "plant", label: "plant cell", psiS: -700, psiP: 300, panels: [{ solution: 0, outcome: "bursts" }] }] };
  assert.equal(allPass(spec), false); // a walled plant cell does not burst in water
});

test("route: every arrow is a real step, and mitochondria are not on the endomembrane route", () => {
  const node = (id, is, col) => ({ id, label: is, is, col, row: 0 });
  const spec = { renderer: "route", alt: "x", layout: "grid", nodes: [node("a", "rough ER", 0), node("b", "transport vesicle", 1), node("c", "Golgi apparatus", 2)],
    edges: [{ from: "a", to: "b" }, { from: "b", to: "c" }] };
  assert.equal(allPass(spec), true);
  spec.edges = [{ from: "a", to: "c" }, { from: "c", to: "b" }]; // ER straight into the Golgi, then back: not how cargo travels
  assert.equal(allPass(spec), false);
  spec.edges = [{ from: "a", to: "b" }, { from: "b", to: "c" }]; spec.nodes[1].is = "mitochondrion";
  assert.equal(allPass(spec), false);
});

test("lineage: potency narrows along a line of descent unless the cell is reprogrammed", () => {
  const n = (id, cell, potency) => ({ id, label: cell, cell, potency });
  const spec = { renderer: "lineage", alt: "x", layout: "line", nodes: [n("a", "zygote", "totipotent"), n("b", "inner cell mass", "pluripotent"), n("c", "haematopoietic stem cell", "multipotent")],
    edges: [{ from: "a", to: "b" }, { from: "b", to: "c" }] };
  assert.equal(allPass(spec), true);
  spec.nodes[2].potency = "pluripotent"; // a haematopoietic stem cell cannot make every body cell type
  assert.equal(allPass(spec), false);
  const ipsc = { renderer: "lineage", alt: "x", layout: "line", nodes: [n("a", "skin fibroblast", "specialised"), n("b", "induced pluripotent stem cell", "pluripotent")], edges: [{ from: "a", to: "b" }] };
  assert.equal(allPass(ipsc), false);
  ipsc.edges[0].reprogram = true;
  assert.equal(allPass(ipsc), true);
});

test("Gram walls: thickness, outer membrane and stain must agree", () => {
  const pos = { gram: "positive", example: "Staphylococcus", stain: "purple", layers: [{ kind: "peptidoglycan", nm: 30 }, { kind: "plasma membrane", nm: 8 }, { kind: "cytoplasm", nm: 10 }] };
  const spec = { renderer: "envelope", alt: "x", panels: [pos] };
  assert.equal(allPass(spec), true);
  pos.stain = "pink"; assert.equal(allPass(spec), false);
  pos.stain = "purple"; pos.example = "E. coli"; assert.equal(allPass(spec), false);
  pos.example = "Staphylococcus"; pos.layers.unshift({ kind: "outer membrane", nm: 8 }); assert.equal(allPass(spec), false);
});

test("the genetic code: 64 codons, 61 for amino acids, three stops, degeneracy", () => {
  assert.equal(codonCount("Stop"), 3);
  assert.equal(codonCount("Met"), 1); assert.equal(codonCount("Trp"), 1);
  for (const aa of ["Leu", "Ser", "Arg"]) assert.equal(codonCount(aa), 6);
  const spec = { renderer: "codontable", alt: "x", claims: [{ type: "stops", value: ["UAA", "UAG", "UGA"] }, { type: "sense", value: 61 }, { type: "amino", value: 20 }, { type: "family", prefix: "GG", aa: "Gly" }] };
  assert.equal(allPass(spec), true);
  spec.claims = [{ type: "count", aa: "Leu", value: 4 }]; // leucine has six codons, not four
  assert.equal(allPass(spec), false);
  spec.claims = [{ type: "family", prefix: "AU", aa: "Ile" }]; // AUG is methionine, so AUN is not one family
  assert.equal(allPass(spec), false);
});

test("Meselson and Stahl: only semi-conservative copying gives the bands that were seen", () => {
  assert.deepEqual(bandFractions("semiconservative", 1), { heavy: 0, hybrid: 1, light: 0 });
  assert.deepEqual(bandFractions("semiconservative", 2), { heavy: 0, hybrid: 0.5, light: 0.5 });
  assert.ok(bandFractions("conservative", 1).heavy > 0); // a heavy band would remain at generation 1
  const observed = { 0: { heavy: 1 }, 1: { hybrid: 1 }, 2: { hybrid: 0.5, light: 0.5 } };
  const g = (model, agrees) => ({ label: model, model, gens: [0, 1, 2], agrees });
  assert.equal(allPass({ renderer: "density", alt: "x", observed, groups: [g("semiconservative", true), g("conservative", false)] }), true);
  assert.equal(allPass({ renderer: "density", alt: "x", observed, groups: [g("conservative", true)] }), false); // claiming a ruled-out model fits
  assert.equal(allPass({ renderer: "density", alt: "x", observed, groups: [g("semiconservative", false)] }), false);
});

test("crossing over: a crossover between linked genes makes two recombinant chromatids of four, never more", () => {
  const genes = [{ alleles: ["A", "a"] }, { alleles: ["B", "b"] }];
  const between = chromatidsAfter({ genes, crossover: "between" });
  assert.equal(between.recombinant, 2); assert.equal(between.parental, 2);
  assert.deepEqual(between.after.map((c) => c.join("")).sort(), ["AB", "Ab", "aB", "ab"]);
  assert.equal(chromatidsAfter({ genes, crossover: "outside" }).recombinant, 0); // beyond both genes, nothing is reshuffled
  const spec = { renderer: "crossover", alt: "x", genes, crossover: "between", claims: [{ type: "recombinant", value: 2 }, { type: "max", value: 0.5 }] };
  assert.equal(allPass(spec), true);
  spec.claims = [{ type: "recombinant", value: 4 }];
  assert.equal(allPass(spec), false);
});

test("pedigrees: the unit 4 families fit their mode of inheritance and rule out the others", () => {
  const rec = [{ id: "I-1", sex: "m", gen: 1, x: 0 }, { id: "I-2", sex: "f", gen: 1, x: 1 }, { id: "II-1", sex: "m", gen: 2, x: 0, affected: true, parents: ["I-1", "I-2"] }];
  assert.equal(pedigreeFits({ people: rec }, "AD"), false); // unaffected parents, affected child
  assert.equal(pedigreeFits({ people: rec }, "AR"), true);
  assert.equal(pedigreeFits({ people: rec }, "XR"), true);
});

test("mitosis and meiosis: cell and chromosome counts follow from the divisions", () => {
  const m = divide("mitosis", 2, false), e = divide("meiosis", 2, true);
  assert.equal(m.cells.length, 2); assert.ok(m.cells.every((c) => c.length === 4)); assert.equal(m.divisions, 1);
  assert.equal(e.cells.length, 4); assert.ok(e.cells.every((c) => c.length === 2)); assert.equal(e.divisions, 2);
  assert.equal(new Set(e.cells.map((c) => [...c].sort().join())).size, 4); // a crossover makes all four different
  assert.ok(new Set(divide("meiosis", 2, false).cells.map((c) => [...c].sort().join())).size < 4); // without it they come in identical pairs
  assert.equal(allPass({ renderer: "ploidy", alt: "x", pairs: 2, crossover: true, claims: [{ type: "cells", process: "meiosis", value: 4 }, { type: "chromosomes", process: "meiosis", value: 2 }] }), true);
  assert.equal(allPass({ renderer: "ploidy", alt: "x", pairs: 2, crossover: true, claims: [{ type: "cells", process: "mitosis", value: 4 }] }), false);
  assert.equal(allPass({ renderer: "ploidy", alt: "x", pairs: 2, crossover: false, claims: [] }), true);
});

test("germ layers: each tissue must come from the layer it is listed under", () => {
  const layer = (name, items) => ({ name, position: "x", items });
  const ok = [layer("ectoderm", ["nervous system"]), layer("mesoderm", ["heart"]), layer("endoderm", ["liver"])];
  assert.equal(allPass({ renderer: "germlayers", alt: "x", layers: ok }), true);
  assert.equal(allPass({ renderer: "germlayers", alt: "x", layers: [layer("ectoderm", ["liver"]), ok[1], ok[2]] }), false); // the liver is endoderm
  assert.equal(allPass({ renderer: "germlayers", alt: "x", layers: ok.slice(0, 2) }), false); // two layers is not triploblastic
});

test("drift: a Wright–Fisher population loses or fixes alleles and stays in 0–1", () => {
  let k = 1; const rnd = () => ((k = (k * 16807) % 2147483647) / 2147483647); // a simple deterministic generator
  const run = wrightFisher(20, 0.5, 200, rnd);
  assert.ok(run.every((p) => p >= 0 && p <= 1));
  assert.ok(run.at(-1) === 0 || run.at(-1) === 1); // a small population reaches 0 or 1 within 200 generations
  const spec = { renderer: "drift", alt: "x", seed: 5, p0: 0.5, gens: 50, reps: 4, panels: [{ N: 20, label: "a" }, { N: 500, label: "b" }], claims: [{ type: "moreSpread", small: 20, large: 500, factor: 2 }, { type: "theory", N: 20 }] };
  assert.equal(allPass(spec), true);
  spec.claims = [{ type: "moreSpread", small: 500, large: 20, factor: 1 }]; // the wrong way round
  assert.equal(allPass(spec), false);
});

test("cladograms: a trait that does not match one clade, or arose twice, is rejected", () => {
  const tree = ["lancelet", ["shark", ["frog", ["lizard", "mouse"]]]];
  const ok = { renderer: "cladogram", alt: "x", tree, characters: [{ name: "jaws", taxa: ["shark", "frog", "lizard", "mouse"] }, { name: "amniotic egg", taxa: ["lizard", "mouse"] }], claims: [{ type: "closer", taxa: ["lizard", "mouse"], than: ["frog", "lizard"] }] };
  assert.equal(allPass(ok), true);
  assert.equal(allPass({ ...ok, characters: [{ name: "wings", taxa: ["shark", "mouse"] }] }), false); // no single clade: it would have arisen twice
  assert.equal(allPass({ ...ok, claims: [{ type: "closer", taxa: ["frog", "lizard"], than: ["lizard", "mouse"] }] }), false);
});

test("sarcomere: contraction shortens the I band and H zone, never the A band", () => {
  const spec = { thick: 1.6, thin: 1.0 };
  assert.deepEqual([bandsOf(spec, 2.4).A, bandsOf(spec, 1.8).A], [1.6, 1.6]);
  assert.ok(bandsOf(spec, 1.8).I < bandsOf(spec, 2.4).I);
  assert.equal(bandsOf(spec, 1.8).H, 0);
  const ok = { renderer: "sarcomere", alt: "x", thick: 1.6, thin: 1.0, states: [{ label: "relaxed", L: 2.4 }, { label: "contracted", L: 1.8 }], claims: [{ type: "shortening", value: 0.6 }] };
  assert.equal(allPass(ok), true);
  assert.equal(allPass({ ...ok, states: [{ label: "relaxed", L: 1.8 }, { label: "contracted", L: 2.4 }] }), false); // a "contracted" sarcomere that is longer
});

test("the Calvin cycle: carbon is conserved at every step, so a miscounted step fails", () => {
  const nodes = [{ id: "a", label: "A" }, { id: "b", label: "B" }];
  const spec = { renderer: "carbonflow", alt: "x", layout: "line", nodes, edges: [{ from: "a", to: "b" }], balance: [{ name: "fixation", in: [[3, 1], [3, 5]], out: [[6, 3]] }, { name: "regeneration", in: [[5, 3]], out: [[3, 5]] }] };
  assert.equal(allPass(spec), true);
  spec.balance[0].out = [[6, 4]]; // 24 carbons out of 18 in
  assert.equal(allPass(spec), false);
});

test("nutrient cycles: each arrow must be a real process between the right stores, and no store is a dead end", () => {
  const nodes = [{ id: "atmosphere", label: "air" }, { id: "producers", label: "plants" }, { id: "consumers", label: "animals" }];
  const ok = { renderer: "biocycle", alt: "x", cycle: "carbon", nodes, edges: [{ from: "atmosphere", to: "producers", process: "photosynthesis" }, { from: "producers", to: "consumers", process: "feeding" }, { from: "consumers", to: "atmosphere", process: "respiration" }] };
  assert.equal(allPass(ok), true);
  assert.equal(allPass({ ...ok, edges: [{ ...ok.edges[0], from: "consumers" }, ok.edges[1], ok.edges[2]] }), false); // animals do not photosynthesise
  assert.equal(allPass({ ...ok, edges: ok.edges.slice(0, 2) }), false); // animals would be a dead end: no way back to the air
});

test("restriction: EcoRI cuts G^AATTC, leaves a self-complementary AATT overhang, and ligation restores the site", () => {
  const r = cutDna("TAGAATTCATGGCCAAAGGGAATTCCTA", "GAATTC", 1);
  assert.deepEqual(r.sites, [2, 19]); assert.equal(r.frags.length, 3); assert.equal(r.overhang, "AATT");
  const spec = { renderer: "restriction", alt: "x", enzyme: { name: "EcoRI", site: "GAATTC", cutAfter: 1 }, molecules: [{ id: "gene", label: "g", dna: "TAGAATTCATGGCCAAAGGGAATTCCTA" }, { id: "vec", label: "v", dna: "CCTAGAATTCGGTCA" }],
    recombinant: { label: "r", from: [["vec", 0], ["gene", 1], ["vec", 1]] }, claims: [{ type: "fragments", id: "gene", value: 3 }] };
  assert.equal(allPass(spec), true);
  assert.equal(allPass({ ...spec, enzyme: { name: "x", site: "GAATTG", cutAfter: 1 }, molecules: [{ id: "gene", label: "g", dna: "TAGAATTGATGGCC" }, spec.molecules[1]] }), false); // not palindromic
  assert.equal(allPass({ ...spec, recombinant: { label: "r", from: [["vec", 1], ["gene", 1], ["vec", 0]] } }), false); // pieces joined in the wrong order lose the site
});

test("Sanger: a fragment of every length, read back into the new strand", () => {
  assert.deepEqual(sangerFragments("GAT").map((f) => f.last), ["G", "A", "T"]);
  assert.equal(allPass({ renderer: "sanger", alt: "x", newStrand: "GATTACA", template: "CTAATGT", claims: [{ type: "reads", value: "GATTACA" }] }), true);
  assert.equal(allPass({ renderer: "sanger", alt: "x", newStrand: "GATTACA", template: "CTAATGA" }), false); // template is not the complement
});

test("alignment: the drawn alignment must score the dynamic-programming optimum", () => {
  const sc = { match: 1, mismatch: -1, gap: -2 };
  assert.equal(needlemanScore("GATTACA", "GATACA", sc), 4);
  assert.equal(scoreAlignment("GATTACA", "GA-TACA", sc).score, 4);
  const pair = (a1, a2) => ({ seq1: "GATTACA", seq2: "GATACA", aligned1: a1, aligned2: a2, label: "x" });
  assert.equal(allPass({ renderer: "align", alt: "x", scoring: sc, pairs: [pair("GATTACA", "GA-TACA")] }), true);
  assert.equal(allPass({ renderer: "align", alt: "x", scoring: sc, pairs: [pair("GATTACA-", "GA-TAC-A")] }), false); // two gaps score worse than the optimum, and the second is not even a valid alignment
});

test("chromatography: Rf is the spot's distance over the solvent front's, and lies between 0 and 1", () => {
  assert.equal(rfOf(72, 80), 0.9);
  const spec = { renderer: "tlc", alt: "x", origin: 0, front: 80, spots: [{ label: "a", d: 72 }, { label: "b", d: 32 }], claims: [{ type: "rf", spot: "a", value: 0.9 }, { type: "rf", spot: "b", value: 0.4 }] };
  assert.equal(allPass(spec), true);
  assert.equal(allPass({ ...spec, claims: [{ type: "rf", spot: "b", value: 0.5 }] }), false); // 32 ÷ 80 is 0.4
  assert.equal(allPass({ ...spec, spots: [{ label: "a", d: 90 }] }), false); // a spot beyond the solvent front
});

test("bilayer: drawn to scale, carbohydrate chains outside, cholesterol only in animal membranes", () => {
  const N = bilayerNumbers(14); assert.ok(N.thickness >= 5 && N.thickness <= 10 && N.core >= 3 && N.core <= 4);
  const ok = { renderer: "bilayer", alt: "x", cell: "animal", scale: 14, proteins: [{ kind: "channel", at: 0.3 }, { kind: "receptor", at: 0.7, carb: true }], cholesterol: [0.1], claims: [{ type: "count", kind: "channel", value: 1 }] };
  assert.equal(allPass(ok), true);
  assert.equal(allPass({ ...ok, cell: "bacterium" }), false); // bacterial membranes lack cholesterol
  assert.equal(allPass({ ...ok, scale: 40 }), false); // at 40 px per nm the bilayer would be about 1.8 nm thick: not a membrane
  assert.equal(allPass({ ...ok, proteins: [{ kind: "receptor", at: 0.7, carb: true, side: "inner" }] }), false); // sugars are on the outer surface only
});

test("induced fit: the active site changes shape to fit, and the products add up to the substrate", () => {
  assert.equal(fitOk({ before: 58, after: 40 }, 40), true);
  const ok = { renderer: "inducedfit", alt: "x", substrate: { w: 40, h: 46 }, products: [{ w: 22 }, { w: 18 }], models: [{ name: "lock and key", before: 40, after: 40 }, { name: "induced fit", before: 58, after: 40 }] };
  assert.equal(allPass(ok), true);
  assert.equal(allPass({ ...ok, models: [ok.models[0], { name: "induced fit", before: 40, after: 40 }] }), false); // no shape change is not induced fit
  assert.equal(allPass({ ...ok, models: [{ name: "lock and key", before: 50, after: 40 }, ok.models[1]] }), false); // a lock-and-key site that changes shape
  assert.equal(allPass({ ...ok, products: [{ w: 22 }, { w: 30 }] }), false); // products larger than the substrate
});

test("water: 104.5° molecules, hydrogen bonds longer than O–H and in line, at most 2 donated and 2 accepted", () => {
  const mols = waterCluster(450), bonds = hydrogenBonds(mols, 450);
  assert.equal(bonds.length, 4); assert.ok(bonds.every((b) => b.length > 0.096 && b.length < 0.2 && b.angle >= 150));
  assert.equal(bonds.filter((b) => b.donor === 0).length, 2); assert.equal(bonds.filter((b) => b.acceptor === 0).length, 2);
  assert.equal(HOH, 104.5);
  assert.equal(allPass({ renderer: "hbond", alt: "x", scale: 450, energies: { hbond: [5, 30], cc: 350 } }), true);
  assert.equal(allPass({ renderer: "hbond", alt: "x", scale: 450, energies: { hbond: [5, 300], cc: 350 } }), false); // not far weaker than a covalent bond
});
