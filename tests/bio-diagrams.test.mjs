// Biology diagram renderers (kit/diagrams/bio-renderers*.js) and the biology they recompute (kit/diagrams/bio-core.js):
// every sample spec passes, and breaking one biological fact in a copy makes its checks fail.
import { test } from "node:test";
import assert from "node:assert/strict";
import { render } from "../kit/diagrams/renderers.js";
import "../kit/diagrams/bio-renderers.js";
import "../kit/diagrams/bio-renderers-2.js";
import { cross, sameRatio, gametes, pedigreeSolve, MODES, complement, transcribe, translate, mutationEffect, hBonds, stageCounts, pathwayTally, trophicLevels, named, waterFlow, dominanceProblems } from "../kit/diagrams/bio-core.js";
import { SAMPLES } from "./fixtures/bio-specs.mjs";

const run = (k, edit = (s) => s, text) => { const c = structuredClone(SAMPLES[k].spec), s = edit(c) || c; return render(s, { lessonText: text ?? SAMPLES[k].text }).checks; };
const failed = (checks) => checks.filter((c) => !c.ok).map((c) => c.name);
const fails = (k, edit, re, text) => { const f = failed(run(k, edit, text)); assert.ok(f.some((n) => re.test(n)), `${k}: expected a failure matching ${re}, got [${f.join(" | ")}]`); };

test("every sample spec passes all its checks at both widths", () => {
  for (const k of Object.keys(SAMPLES)) { const c = run(k); assert.ok(c.length >= 5, k); assert.deepEqual(failed(c), [], k); }
});

test("genetics: gametes, Punnett ratios, dominance", () => {
  assert.equal(gametes("AaBb").length, 4);
  const r = cross("Aa", "Aa", { AA: "tall", Aa: "tall", aa: "short" });
  assert.ok(sameRatio(r.geno, { AA: 1, Aa: 2, aa: 1 }) && sameRatio(r.pheno, { tall: 3, short: 1 }));
  const x = cross("XHXh", "XHY", { XHXH: "normal", XHXh: "normal", XhXh: "haemophilia", XHY: "normal", XhY: "haemophilia" });
  assert.ok(sameRatio(x.pheno, { normal: 3, haemophilia: 1 }) && sameRatio(x.geno, { XHXH: 1, XHXh: 1, XHY: 1, XhY: 1 }));
  assert.equal(dominanceProblems({ RR: "red", RW: "pink", WW: "white" }, "incomplete", ["R", "W"]).length, 0);
  assert.equal(dominanceProblems({ RR: "red", RW: "red", WW: "white" }, "incomplete", ["R", "W"]).length, 1);
  fails("punnett", (s) => { s.ratio.phenotypes = { purple: 1, white: 1 }; }, /phenotype ratio/);
  fails("punnett", (s) => { s.parents = ["Aa", "aa"]; }, /genotype ratio/);
  fails("punnett", (s) => { s.phenotypes.Aa = "pink"; s.ratio.phenotypes = { purple: 1, pink: 2, white: 1 }; }, /dominance/, "purple pink white");
  fails("dihybrid", (s) => { s.ratio.phenotypes = { "round, yellow": 3, "wrinkled, green": 1 }; }, /phenotype ratio/);
});

test("pedigrees: modes that fit are searched, not assumed", () => {
  const P = SAMPLES.pedigree.spec.people;
  assert.deepEqual(MODES.filter((m) => pedigreeSolve(P, m).ok), ["autosomal recessive", "X-linked recessive"]);
  // an affected daughter of unaffected parents rules out X-linked recessive and both dominant modes
  const Q = [...P, { id: "II-4", sex: "f", affected: true, parents: ["I-1", "I-2"] }];
  assert.deepEqual(MODES.filter((m) => pedigreeSolve(Q, m).ok), ["autosomal recessive"]);
  fails("pedigree", (s) => { s.mode = "autosomal dominant"; }, /stated mode/);
  fails("pedigree", (s) => { s.consistent = ["autosomal recessive"]; }, /exactly the stated modes/);
  fails("pedigree", (s) => { s.genotypes = { "II-1": "Aa" }; }, /genotypes the lesson states are certain/);
});

test("DNA, RNA and protein: pairing, transcription, translation, mutation", () => {
  assert.equal(complement("ATGC"), "TACG");
  assert.equal(transcribe("ATGTTT"), "AUGUUU");
  assert.deepEqual(translate("AUGUGGUAAGGG"), ["Met", "Trp", "Stop"]);
  assert.equal(hBonds("ATGC"), 10);
  assert.equal(mutationEffect("ATGGCA", "ATGGCG"), "silent");
  assert.equal(mutationEffect("ATGTGG", "ATGTGA"), "nonsense");
  assert.equal(mutationEffect("ATGGCA", "ATGCA"), "frameshift");
  fails("sequence", (s) => { s.template = "TACCGTAAAATA"; }, /template strand pairs/);
  fails("sequence", (s) => { s.mrna = "ATGGCATTTTAA"; }, /mRNA/);
  fails("sequence", (s) => { s.protein = ["Met", "Ala", "Leu", "Stop"]; }, /amino acids/);
  fails("sequence", (s) => { s.mutated.effect = "silent"; }, /mutation is silent/, "complementary mRNA codon silent");
});

test("cell division: counts per stage", () => {
  assert.deepEqual(stageCounts("mitosis", "anaphase", 46), { chromosomes: 92, chromatids: 92, nuclei: 1 });
  assert.deepEqual(stageCounts("meiosis", "telophase I", 46), { chromosomes: 23, chromatids: 46, nuclei: 2 });
  fails("division", (s) => { s.stages[3].chromosomes = 4; }, /chromosome and chromatid counts/);
  fails("division", (s) => { s.stages.reverse(); }, /order/);
  fails("division", (s) => { s.process = "mitosis"; }, /counts/);
});

test("pathways: carbon conserved, totals tallied", () => {
  assert.deepEqual(pathwayTally(SAMPLES.calvin.spec.steps, true).problems, []);
  fails("calvin", (s) => { s.steps[0].in.CO2 = 2; }, /carbon atoms conserved/);
  fails("calvin", (s) => { s.totals.ATP = -6; }, /stated totals/);
  fails("calvin", (s) => { s.steps[1].in.sugar = 1; }, /carbon atoms conserved/);
});

test("ecology: trophic levels and efficiencies", () => {
  const lv = trophicLevels(SAMPLES.foodweb.spec.organisms, SAMPLES.foodweb.spec.eats);
  assert.deepEqual(lv.fox, [3, 4]);
  fails("foodweb", (s) => { s.organisms[3].level = 2; }, /trophic levels/);
  fails("foodweb", (s) => { s.eats.push(["grass", "fox"]); }, /no loops/);
  fails("pyramid", (s) => { s.efficiencies = [10, 20]; }, /transfer efficiency =/);
  fails("pyramid", (s) => { s.levels[2].value = 3000; s.efficiencies = [10, 150]; }, /energy falls/);
});

test("water potential and osmosis", () => {
  assert.equal(waterFlow({ psiS: -700, psiP: 300 }, { psiS: -900, psiP: 200 }), "a→b");
  fails("water", (s) => { s.flows = [["cell B", "cell A"]]; }, /higher to lower water potential/);
  fails("water", (s) => { s.compartments[0].psi = -700; }, /ψ = ψs \+ ψp/);
  fails("water", (s) => { s.compartments[0].psiS = 100; }, /solute potential/);
  fails("water", (s) => { s.compartments[1].result = "swells"; s.flows = [["cell A", "cell B"]]; s.compartments[0].result = "swells"; }, /follows from its net water movement/);
});

test("structures, levels, scale and trees: vetted vocabulary and lesson terms", () => {
  fails("structure", (s) => { s.structure = "bacterial-cell"; s.labels = ["cell wall", "nucleoid", "nucleus"]; }, /every label is a part/, "cell wall nucleoid nucleus");
  fails("structure", (s) => { s.labels = s.labels.filter((l) => l !== "vacuole"); }, /defining parts/);
  fails("structure", () => {}, /named in the lesson/, "A plant cell has a cell wall.");
  fails("structure", (s) => { s.structure = "liver"; }, /vetted template/);
  fails("levels", (s) => { s.levels.reverse(); }, /correct organisation order/);
  fails("levels", (s) => { s.levels[0].name = "Molecule thing"; }, /every level is/);
  fails("scale", (s) => { s.items[1].to = 3; s.items[1].unit = "µm"; }, /inside its vetted range/);
  fails("scale", (s) => { s.magnification.M = 1000; }, /magnification/);
  fails("phylo", (s) => { s.tree = ["Eukarya", ["Archaea", "Bacteria"]]; }, /clade|more recent/);
  assert.ok(named("mitochondrion", "the mitochondria make ATP") && named("GP", "RuBP forms GP") && !named("GP", "a group"));
});

test("layout: a label pushed outside the picture fails", () => {
  fails("levels", (s) => { s.levels[0].example = "x".repeat(400); s.levels[0].name = "Molecule"; }, /inside the picture|overprint/);
});
