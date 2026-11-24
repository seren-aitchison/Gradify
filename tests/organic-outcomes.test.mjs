// Reaction mode's three outcomes (kit/labs/chemistry/reactions/predictor.js): "reaction", "no_reaction" and
// "unsupported". Regression cases from the chemistry audit of 2026-11-23: the lab must never say "no reaction" just
// because a molecule lacks the group a rule handles, and must not give a confident product where a carbocation would
// rearrange. outcomeOf() also reads the older { status } shape, so this file can be run against the code before the
// fix to show those cases failing there.
import { test } from "node:test";
import assert from "node:assert/strict";
import * as P from "../kit/labs/chemistry/reactions/predictor.js";
import * as K from "../kit/labs/chemistry/skeletal.js";

const OLD = { reacts: "reaction", "no-reaction": "no_reaction", declined: "unsupported" };
const outcomeOf = (r) => r.outcome ?? OLD[r.status];
const run = (smiles, reagent) => P.predict(P.drawSmiles(smiles), reagent);
const hash = (smiles) => K.analyse(K.graphFromSmiles(smiles)).hash;
const mainHashes = (r) => (r.products || []).filter((p) => p.role !== "minor").map((p) => K.analyse(p.m).hash);

test("audit: reactions the lab used to call “no reaction” are now predicted", () => {
  for (const s of ["Cc1ccccc1", "CCc1ccccc1"]) {
    const r = run(s, "kmno4-hot");
    assert.equal(outcomeOf(r), "reaction", `${s} + hot KMnO₄: side-chain oxidation`);
    assert.deepEqual(mainHashes(r), [hash("OC(=O)c1ccccc1")], `${s}: benzoic acid`);
  }
  const f = run("OC=O", "tollens");
  assert.equal(outcomeOf(f), "reaction", "methanoic acid reduces Tollens' reagent");
  assert.ok(f.byproducts?.includes("Ag"), "a silver mirror"); assert.equal(f.products.length, 0, "no organic product (CO₂)");
  const ac = run("CCC(=O)Cl", "grignard");
  assert.equal(outcomeOf(ac), "reaction"); assert.deepEqual(mainHashes(ac), [hash("CCC(C)(C)O")], "acyl chloride + 2 CH₃MgBr: tertiary alcohol");
  const ni = run("CCC#N", "grignard");
  assert.equal(outcomeOf(ni), "reaction"); assert.deepEqual(mainHashes(ni), [hash("CCC(C)=O")], "nitrile + CH₃MgBr, then acid: butanone");
});

test("audit: cases the lab can't assess are unsupported, never “no reaction”", () => {
  for (const [s, reagent, why] of [
    ["O=Cc1ccccc1", "naoh-aq", "benzaldehyde with hydroxide (Cannizzaro)"],
    ["OCC(C)(C)C", "h3po4", "neopentyl alcohol rearranges in hot acid"],
    ["CCS", "cr-reflux", "thiols are oxidised"],
    ["C1CC1", "br2", "cyclopropane can ring-open"],
    ["COC=O", "tollens", "a methanoate ester can reduce Tollens' reagent"],
  ]) {
    const r = run(s, reagent);
    assert.equal(outcomeOf(r), "unsupported", `${s} + ${reagent}: ${why}`);
    assert.ok(r.why[0].length > 40 && !/^No reaction/.test(r.why[0]), `${s} + ${reagent}: says why, and doesn't claim no reaction`);
  }
});

test("audit: no confident product where a carbocation would rearrange", () => {
  const h = run("C=CC(C)C", "hbr");
  assert.equal(outcomeOf(h), "unsupported", "3-methylbut-1-ene + HBr: a hydride shift gives the tertiary cation");
  assert.match(h.why[0], /rearrange/);
  assert.equal(outcomeOf(run("CC(O)C(C)C", "h3po4")), "unsupported", "3-methylbutan-2-ol dehydration (E1 via a cation that shifts)");
  // no shift is possible here, so these stay predicted
  assert.deepEqual(mainHashes(run("C=CC", "hbr")), [hash("CC(C)Br")]);
  assert.deepEqual(mainHashes(run("C=CCC", "hbr")), [hash("CCC(C)Br")]);
  assert.deepEqual(mainHashes(run("CC(C)(C)O", "h3po4")), [hash("C=C(C)C")]);
});

test("audit: phenol with concentrated nitrating mixture gives 2,4,6-trinitrophenol", () => {
  const r = run("Oc1ccccc1", "nitration");
  assert.equal(outcomeOf(r), "reaction");
  assert.deepEqual(mainHashes(r), [hash("Oc1c(cc(cc1[N+](=O)[O-])[N+](=O)[O-])[N+](=O)[O-]")]);
  assert.match(r.why.join(" "), /dilute nitric acid/, "says how to stop at one nitro group");
});

test("true negatives stay “no reaction” when every group is accounted for", () => {
  for (const [s, reagent] of [["CC(C)(C)c1ccccc1", "kmno4-hot"], ["CCC", "naoh-aq"], ["CC(C)(C)O", "cr-reflux"], ["CC(C)=O", "tollens"], ["CC(=O)O", "nabh4"], ["c1ccccc1", "br2"], ["CCOCC", "naoh-aq"]]) {
    const r = run(s, reagent);
    assert.equal(outcomeOf(r), "no_reaction", `${s} + ${reagent}`); assert.deepEqual(r.unaccounted, [], `${s} + ${reagent}: every feature accounted for`);
  }
  assert.equal(outcomeOf(run("Oc1ccccc1", "naoh-aq")), "reaction", "phenol is neutralised by NaOH (phenoxide)");
});

test("across every starter and reagent: a “no reaction” or a product never leaves a feature unaccounted for", () => {
  const counts = { reaction: 0, no_reaction: 0, unsupported: 0 };
  for (const [name] of P.STARTERS) for (const g of P.REAGENTS) {
    const r = P.predict(P.starter(name), g.id);
    assert.ok(P.OUTCOMES.includes(r.outcome), `${name} + ${g.id}: an outcome`); counts[r.outcome]++;
    assert.equal(r.reacts, r.outcome === "reaction");
    if (r.outcome !== "unsupported") assert.deepEqual(r.unaccounted, [], `${name} + ${g.id}: ${r.outcome} with ${r.unaccounted?.join(", ")} unaccounted`);
    if (r.outcome === "unsupported") assert.ok(!/^No reaction/.test(r.why[0]), `${name} + ${g.id}: unsupported must not read as "no reaction"`);
  }
  assert.ok(counts.reaction > 150 && counts.no_reaction > 600 && counts.unsupported > 100, JSON.stringify(counts));
});
