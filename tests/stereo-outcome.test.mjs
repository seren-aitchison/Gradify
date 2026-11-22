// Stereochemistry carried through Reaction mode's predictions (kit/labs/chemistry/reactions/stereo-outcome.js):
// textbook outcomes for syn and anti additions, SN2 inversion, SN1 racemisation, retention, Lindlar reduction,
// eliminations and new stereocentres next to existing ones.
import { test } from "node:test";
import assert from "node:assert/strict";
import * as K from "../kit/labs/chemistry/skeletal.js";
import * as C from "../kit/labs/chemistry/reactions/configuration.js";
import { drawSmiles, predict } from "../kit/labs/chemistry/reactions/predictor.js";

const run = (smiles, reagent) => predict(drawSmiles(smiles), reagent);
const only = (smiles, reagent, name) => { const out = run(smiles, reagent); const p = out.products.find((x) => K.analyse(x.m).name?.name === name || (!name && x)); assert.ok(p, `${smiles} + ${reagent}: no ${name}`); return { out, p, c: p.config }; };

test("anti addition of Br₂: E alkene → meso, Z alkene → racemate; a ring alkene → trans", () => {
  let { c } = only("C/C=C/C", "br2", "2,3-dibromobutane");
  assert.equal(c.form, "meso"); assert.ok(["(2R,3S)", "(2S,3R)"].includes(c.text));
  ({ c } = only("C/C=C\\C", "br2", "2,3-dibromobutane"));
  assert.equal(c.form, "racemic"); assert.ok(["(2R,3R)", "(2S,3S)"].includes(c.text)); assert.ok(c.mirror && c.mirror !== c.text);
  const { out, p } = only("C1CC=CCC1", "br2");
  assert.equal(p.config.form, "racemic", "trans-1,2-dibromocyclohexane is chiral");
  assert.ok(out.stereo.some((n) => /trans/.test(n)));
});

test("syn additions: cold KMnO₄ and H₂/Ni give the opposite outcome to Br₂", () => {
  assert.equal(only("C/C=C/C", "kmno4-cold", "butane-2,3-diol").c.form, "racemic");
  assert.equal(only("C/C=C\\C", "kmno4-cold", "butane-2,3-diol").c.form, "meso");
  assert.equal(only("CC/C(C)=C(/C)CC", "h2-ni", "3,4-dimethylhexane").c.form, "meso", "Z alkene + syn H₂ → meso");
  assert.equal(only("CC/C(C)=C(\\C)CC", "h2-ni", "3,4-dimethylhexane").c.form, "racemic");
  assert.equal(only("CC1=C(C)CCCC1", "h2-ni").c.form, "meso", "cis-1,2-dimethylcyclohexane");
});

test("SN2 inverts a drawn stereocentre and SN1 racemises it", () => {
  let { c } = only("CC[C@H](C)Br", "naoh-aq", "butan-2-ol");
  assert.equal(c.text, "(R)", "(S)-2-bromobutane → (R)-butan-2-ol"); assert.equal(c.centres[0].how, "inverted"); assert.equal(c.form, "single");
  ({ c } = only("CC[C@@H](C)Br", "naoh-aq", "butan-2-ol")); assert.equal(c.text, "(S)");
  // the mirror image of the product is what the other enantiomer of the halide gives
  const a = only("CC[C@H](C)Br", "naoh-aq", "butan-2-ol").p.m, b = only("CC[C@@H](C)Br", "naoh-aq", "butan-2-ol").p.m;
  assert.equal(C.relation(a, b), "enantiomers");
  ({ c } = only("CC[C@](C)(Br)CCC", "water", "3-methylhexan-3-ol"));
  assert.equal(c.form, "racemic"); assert.equal(c.centres[0].how, "racemised"); assert.equal(c.text, "");
});

test("untouched stereocentres keep their arrangement; unfollowed changes aren't guessed", () => {
  let { c } = only("C[C@H](O)CC=O", "nabh4", "butane-1,3-diol");
  assert.equal(c.centres[0].how, "kept"); assert.equal(c.form, "single"); assert.equal(c.text, "(S)");
  ({ c } = only("C[C@H](O)CC", "socl2", "2-chlorobutane"));
  assert.equal(c.centres[0].how, "unknown"); assert.equal(c.centres[0].label, null); assert.equal(c.form, "unspecified");
  ({ c } = only("CC[C@H](C)O", "cr-distil", "butan-2-one")); assert.equal(c.form, "achiral", "the stereocentre is oxidised away");
});

test("new stereocentres: racemic from achiral starting materials, diastereomers next to an existing centre", () => {
  for (const [s, r, name] of [["C=CCC", "hbr", "2-bromobutane"], ["CC(=O)CC", "nabh4", "butan-2-ol"], ["CCC=O", "hcn", "2-hydroxybutanenitrile"]]) {
    const { c } = only(s, r, name); assert.equal(c.form, "racemic", `${s} + ${r}`); assert.equal(c.centres[0].how, "formed");
  }
  const { c } = only("C[C@H](O)CC(C)=O", "nabh4", "pentane-2,4-diol");
  assert.equal(c.form, "diastereomers"); assert.deepEqual(c.centres.map((x) => x.how).sort(), ["formed", "kept"]);
  assert.equal(c.centres.find((x) => x.how === "formed").label, null, "the new centre isn't drawn as one or the other");
});

test("C=C geometry: Lindlar gives Z, an elimination is drawn as the major E isomer", () => {
  let { c } = only("CC#CC", "lindlar", "but-2-ene"); assert.equal(c.text, "(Z)"); assert.equal(c.bonds[0].how, "formed-Z");
  ({ c } = only("CCC(C)Br", "koh-eth", "but-2-ene")); assert.equal(c.text, "(E)"); assert.equal(c.bonds[0].how, "formed-E");
  ({ c } = only("C/C=C\\C(C)O", "cr-reflux")); assert.equal(c.bonds[0].how, "kept"); assert.equal(c.text, "(Z)", "an untouched C=C keeps its geometry");
});

test("every reaction in the library either records a configuration or reports none", () => {
  for (const s of ["CC[C@H](C)Br", "C/C=C/C", "C[C@H](O)CC", "CC(=O)[C@@H](C)CC", "C[C@@H](N)C(=O)O"]) for (const r of ["h2-ni", "br2", "hbr", "naoh-aq", "koh-eth", "nabh4", "cr-reflux", "esterify", "socl2", "kcn", "nh3"]) {
    const out = run(s, r); if (!out.reacts) continue;
    for (const p of out.products) assert.ok(p.config && typeof p.config.form === "string", `${s} + ${r}`);
  }
});

test("several independent addition units give a mixture of stereoisomers, not one racemate or a meso compound", () => {
  // C=CCC/C=C/CC + Br₂: a lone new centre (C2) and an anti-added pair (C5, C6), two units: four stereoisomers
  assert.equal(run("C=CCC/C=C/CC", "br2").products[0].config.form, "stereoisomers");
  assert.equal(run("C/C=C/CC/C=C/C", "br2").products[0].config.form, "stereoisomers", "two anti-added pairs");
  // single units keep their textbook outcomes
  assert.equal(run("C/C=C/C", "br2").products[0].config.form, "meso"); assert.equal(run("C/C=C\\C", "br2").products[0].config.form, "racemic");
  assert.equal(run("C/C=C/C", "kmno4-cold").products[0].config.form, "racemic"); assert.equal(run("C/C=C\\C", "kmno4-cold").products[0].config.form, "meso");
  assert.equal(run("C=CC", "br2").products[0].config.form, "racemic");
});
