// Reaction mode's predictor (kit/labs/chemistry/reactions/predictor.js): rule-template products checked against
// known answers, "no reaction" explanations, and the layout of starting materials.
import { test } from "node:test";
import assert from "node:assert/strict";
import * as P from "../kit/labs/chemistry/reactions/predictor.js";
import * as K from "../kit/labs/chemistry/skeletal.js";
import { descriptor } from "../kit/labs/chemistry/reactions/configuration.js";
import { REACTIONS } from "../kit/labs/chemistry/reactions/library.js";
import { EVIDENCE } from "../kit/courses/chemistry/evidence.js";
import COURSE from "../kit/courses/chemistry/course.js";

const name = (m) => K.analyse(m).name?.name;
const run = (start, reagent) => P.predict(P.starter(start), reagent);
const roles = (r) => Object.fromEntries(r.products.map((p) => [name(p.m), p.role]));

test("starting materials are laid out on the paper as valid, correctly named molecules", () => {
  for (const [n] of P.STARTERS) {
    const m = P.starter(n), A = K.analyse(m);
    assert.equal(A.problems.length, 0, n); assert.equal(A.components, 1, n);
    for (const a of m.atoms) for (const b of m.atoms) if (a !== b) assert.ok(Math.hypot(a.x - b.x, a.y - b.y) > 0.5, `${n}: atoms overlap`);
  }
  assert.equal(name(P.starter("2-bromo-2-methylpropane")), "2-bromo-2-methylpropane");
  // stereoisomer starters are drawn as the isomer their name says
  for (const [n] of P.STARTERS.filter(([x]) => x.startsWith("("))) { const m = P.starter(n), d = descriptor(m); assert.ok(n.startsWith(`${d}-`), `${n} is drawn as ${d}`); assert.equal(`${d}-${name(m)}`, n); }
  assert.equal(name(P.starter("methylbenzene")), "methylbenzene");
});

test("electrophilic addition follows Markovnikov's rule; symmetrical alkenes give one product", () => {
  assert.deepEqual(roles(run("propene", "hbr")), { "2-bromopropane": "major", "1-bromopropane": "minor" });
  assert.deepEqual(roles(run("2-methylpropene", "hbr")), { "2-bromo-2-methylpropane": "major", "1-bromo-2-methylpropane": "minor" });
  assert.deepEqual(roles(run("propene", "steam")), { "propan-2-ol": "major", "propan-1-ol": "minor" });
  assert.deepEqual(roles(run("ethene", "hbr")), { bromoethane: "product" });
  assert.equal(name(run("ethene", "br2").products[0].m), "1,2-dibromoethane");
  assert.equal(name(run("cyclohexene", "br2").products[0].m), "1,2-dibromocyclohexane");
  assert.equal(name(run("propene", "h2-ni").products[0].m), "propane");
  assert.equal(run("propene", "hbr").mechanism, "hbr-propene");
});

test("halogenoalkanes: substitution by class, elimination by Zaitsev's rule", () => {
  const sn = (s) => run(s, "naoh-aq");
  assert.equal(name(sn("bromoethane").products[0].m), "ethanol"); assert.equal(sn("bromoethane").mechanism, "sn2");
  assert.equal(name(sn("2-bromo-2-methylpropane").products[0].m), "2-methylpropan-2-ol"); assert.equal(sn("2-bromo-2-methylpropane").mechanism, "sn1");
  assert.equal(name(run("bromoethane", "kcn").products[0].m), "propanenitrile", "cyanide adds a carbon");
  assert.equal(name(run("bromoethane", "nh3").products[0].m), "ethylamine");
  const e = run("2-bromobutane", "koh-eth"), major = e.products.find((p) => p.role === "major");
  assert.equal(name(major.m), "but-2-ene"); assert.match(major.note, /E and Z/);
  assert.equal(name(e.products.find((p) => p.role === "minor").m), "but-1-ene");
  assert.equal(name(run("2-bromo-2-methylpropane", "koh-eth").products[0].m), "2-methylprop-1-ene");
});

test("alcohols: oxidation depends on class and conditions; dehydration gives alkenes", () => {
  assert.equal(name(run("ethanol", "cr-distil").products[0].m), "ethanal");
  assert.equal(name(run("ethanol", "cr-reflux").products[0].m), "ethanoic acid");
  assert.equal(name(run("propan-2-ol", "cr-reflux").products[0].m), "propan-2-one");
  const t = run("2-methylpropan-2-ol", "cr-reflux"); assert.equal(t.reacts, false); assert.match(t.why[0], /tertiary alcohol/);
  assert.equal(name(run("ethanal", "cr-reflux").products[0].m), "ethanoic acid");
  assert.equal(run("ethanal", "cr-distil").reacts, false);
  assert.deepEqual(roles(run("butan-2-ol", "h3po4")), { "but-2-ene": "major", "but-1-ene": "minor" });
  assert.equal(run("2-methylpropan-2-ol", "h3po4").mechanism, "e1");
  assert.equal(name(run("ethanoic acid", "esterify").products[0].m), "ethyl ethanoate");
});

test("carbonyls: NaBH₄ reduces aldehydes and ketones but not acids", () => {
  assert.equal(name(run("ethanal", "nabh4").products[0].m), "ethanol");
  assert.equal(name(run("propanone", "nabh4").products[0].m), "propan-2-ol");
  const a = run("ethanoic acid", "nabh4"); assert.equal(a.reacts, false); assert.match(a.why[0], /LiAlH₄/);
});

test("arenes: nitration with directing effects; benzene resists addition", () => {
  assert.equal(name(run("benzene", "nitration").products[0].m), "nitrobenzene");
  assert.deepEqual(Object.keys(roles(run("methylbenzene", "nitration"))).sort(), ["1-methyl-2-nitrobenzene", "1-methyl-4-nitrobenzene"], "alkyl: 2,4-directing");
  assert.deepEqual(Object.keys(roles(run("benzoic acid", "nitration"))), ["3-nitrobenzoic acid"], "COOH: 3-directing");
  assert.deepEqual(Object.keys(roles(run("chlorobenzene", "nitration"))).sort(), ["1-chloro-2-nitrobenzene", "1-chloro-4-nitrobenzene"], "halogen: 2,4-directing");
  for (const r of ["br2", "h2-ni"]) { const b = run("benzene", r); assert.equal(b.reacts, false, r); assert.match(b.why[0], /delocalised/); }
});

test("radical substitution lists each monobromo isomer; unsupported cases say why", () => {
  assert.deepEqual(run("propane", "br2-uv").products.map((p) => name(p.m)).sort(), ["1-bromopropane", "2-bromopropane"]);
  const x = run("ethanol", "br2-uv"); assert.equal(x.reacts, false); assert.match(x.why[0], /only for alkanes/);
  const none = run("propane", "naoh-aq"); assert.equal(none.reacts, false); assert.match(none.why[0], /^No reaction/);
  assert.equal(P.predict({ atoms: [], bonds: [], next: 1 }, "hbr").reacts, false);
});

test("predictions on a learner's own drawing (implicit H, coordinates kept) and every product is a valid molecule", () => {
  const m = K.empty(); K.addChain(m, K.chainPath(m, 0, 0, 3, 0)); const end = m.atoms.at(-1); K.setElement(m, end.id, "Br");
  const r = P.predict(m, "naoh-aq"); assert.ok(r.reacts); assert.equal(K.analyse(r.products[0].m).formula.replace(/\d/g, "").includes("Br"), false);
  for (const [n] of P.STARTERS) for (const g of P.REAGENTS) { const o = P.predict(P.starter(n), g.id); if (!o.reacts) { assert.ok(o.why[0].length > 20, `${n}+${g.id}: explains`); continue; } for (const p of o.products) assert.equal(K.analyse(p.m).problems.length, 0, `${n} + ${g.id}`); }
});

test("registration: Reaction mode challenges map to lessons, and mechanism links exist", () => {
  const x = COURSE.interactives.find((i) => i.id === "organic-notes");
  for (const id of ["rx-predict", "rx-markovnikov", "rx-zaitsev", "rx-directing", "rx-two-step", "mech-spot"]) { const l = EVIDENCE["organic-notes"][id]; assert.ok(l, id); assert.ok(x.lessons.includes(l), `${id} → ${l}`); }
  for (const g of P.REAGENTS) if (g.mechanism) assert.ok(REACTIONS.some((r) => r.id === g.mechanism), `${g.id} → ${g.mechanism}`);
});

// Regressions from the PR #159 review. Expected answers are standard A-level / first-year chemistry, not the lab's output.
const pred = (smiles, reagent, edit) => { const m = P.drawSmiles(smiles); if (edit) edit(m); return P.predict(m, reagent); };
const hashOf = (smiles) => K.analyse(K.graphFromSmiles(smiles)).hash;
const has = (r, smiles, role) => r.products.some((p) => K.analyse(p.m).hash === hashOf(smiles) && (!role || p.role === role));
const drawOH = (m) => { for (const o of m.atoms.filter((a) => a.el === "O" && K.neighbours(m, a.id).length === 1 && K.neighbours(m, a.id)[0].bond.order === 1)) K.addBond(m, o.id, K.addAtom(m, o.x + 0.6, o.y, "H").id, 1); };
const valid = (r) => r.products.every((p) => !K.analyse(p.m).problems.length);

test("products: methanoic acid from a methanoate ester is a product, and ethene + hot KMnO₄ is a reaction with no organic product", () => {
  const h = pred("COC=O", "acid-hydrolysis");
  assert.ok(has(h, "OC=O") && has(h, "CO"), "methyl methanoate → methanoic acid + methanol"); assert.ok(!h.byproducts.includes("HCOOH"));
  const e = pred("C=C", "kmno4-hot");
  assert.equal(e.outcome, "reaction"); assert.equal(e.products.length, 0); assert.deepEqual([...e.byproducts].sort(), ["CO₂", "H₂O"]);
  const p = pred("C=CC", "kmno4-hot"); assert.ok(has(p, "CC(=O)O") && p.byproducts.includes("CO₂ + H₂O"), "propene → ethanoic acid + CO₂");
  assert.ok(has(pred("C=C", "ozone"), "C=O"), "ozonolysis stops at methanal");
});

test("site recognition: N≡N is not a nitrile, and a pyridine ring is not given benzene's substitution rules", () => {
  const n = pred("N#N", "acid-hydrolysis"); assert.equal(n.reacts, false); assert.equal(n.products.length, 0);
  assert.ok(has(pred("CCC#N", "acid-hydrolysis"), "CCC(=O)O"), "propanenitrile → propanoic acid");
  for (const g of ["nitration", "br2-febr3", "cl2-alcl3", "fc-acyl"]) { const r = pred("c1ccncc1", g); assert.equal(r.outcome, "unsupported", g); assert.match(r.why[0], /heteroaromatic/); }
  assert.ok(has(pred("c1ccccc1", "nitration"), "[O-][N+](=O)c1ccccc1"), "benzene is still nitrated");
});

test("HBr: the benzylic cation decides, and conflicting effects are declined rather than contradicted", () => {
  const sty = pred("C=Cc1ccccc1", "hbr"); assert.ok(has(sty, "CC(Br)c1ccccc1", "major"), "styrene → (1-bromoethyl)benzene");
  const pp = pred("CC=Cc1ccccc1", "hbr"); assert.ok(has(pp, "CCC(Br)c1ccccc1", "major"), "1-phenylpropene → (1-bromopropyl)benzene, not a 50:50 mixture");
  const cf = pred("CC(C)=Cc1ccccc1", "hbr"); assert.equal(cf.outcome, "unsupported", "benzylic secondary against tertiary");
  assert.ok(has(pred("C=CC", "hbr"), "CC(C)Br", "major"), "propene is unchanged: Markovnikov");
  assert.equal(pred("C=CCC#C", "hbr").outcome, "unsupported", "an enyne is declined until C=C/C≡C selectivity is modelled");
  assert.ok(has(pred("C#CC", "hbr"), "CC(C)(Br)Br"), "an alkyne alone still gives the geminal dibromide");
});

test("bromine water fills every free 2-, 4- and 6-position of a phenol, even one between two groups", () => {
  assert.ok(has(pred("Cc1cccc(O)c1", "br2"), "Cc1c(Br)cc(Br)c(O)c1Br"), "3-methylphenol → 2,4,6-tribromo-3-methylphenol");
  assert.ok(has(pred("Oc1ccccc1", "br2"), "Oc1c(Br)cc(Br)cc1Br")); assert.ok(has(pred("Nc1ccccc1", "br2"), "Nc1c(Br)cc(Br)cc1Br"));
});

test("drawn hydrogens: an explicit O–H gives the same, valid product as an implicit one", () => {
  for (const [s, g, want] of [["CCO", "cr-reflux", "CC(=O)O"], ["CCO", "cr-distil", "CC=O"], ["CC(O)C", "cr-reflux", "CC(=O)C"], ["CC(=O)O", "esterify", "CCOC(C)=O"], ["CCO", "ethanoic-h2so4", "CCOC(C)=O"], ["CC(=O)O", "naoh-aq", "CC(=O)[O-]"]]) {
    const a = pred(s, g), b = pred(s, g, drawOH);
    assert.ok(has(a, want), `${s} + ${g} (implicit H)`); assert.ok(has(b, want), `${s} + ${g} (drawn O–H)`); assert.ok(valid(b), `${s} + ${g}: drawn O–H gives an invalid product`);
  }
  const ald = P.drawSmiles("CC=O"), c = ald.atoms.find((a) => a.el === "C" && K.neighbours(ald, a.id).some((n) => n.bond.order === 2)); K.addBond(ald, c.id, K.addAtom(ald, c.x, c.y + 0.6, "H").id, 1);
  for (const g of ["cr-reflux", "tollens"]) { const r = P.predict(ald, g); assert.ok(r.reacts && valid(r), `ethanal with its drawn H + ${g}`); }
});

test("hydrolysis and hydroxide: alkaline anhydride hydrolysis gives two carboxylates; halogen + C=O is declined", () => {
  const an = pred("CC(=O)OC(C)=O", "naoh-aq"); assert.equal(an.products.length, 2); assert.ok(an.products.every((p) => K.analyse(p.m).charge === -1), "two ethanoate ions");
  const ac = pred("CC(=O)OC(C)=O", "acid-hydrolysis"); assert.ok(ac.products.every((p) => K.analyse(p.m).charge === 0), "acid hydrolysis gives two neutral acids");
  for (const s of ["CC(Cl)C=O", "CC(=O)CBr", "BrCC=O"]) assert.equal(pred(s, "naoh-aq").outcome, "unsupported", s);
  assert.ok(has(pred("CCBr", "naoh-aq"), "CCO"), "bromoethane still gives ethanol");
});

test("Grignard: any O–H, including a phenol's, destroys the reagent", () => {
  for (const s of ["O=Cc1ccc(O)cc1", "Oc1ccccc1", "CC(O)C=O", "OC(=O)C"]) { const r = pred(s, "grignard"); assert.equal(r.reacts, false, s); assert.match(r.why[0], /O–H/); }
  assert.ok(has(pred("O=Cc1ccccc1", "grignard"), "CC(O)c1ccccc1"), "benzaldehyde still adds");
});

test("starting materials from SMILES: a mixture is refused, not truncated to its first molecule", () => {
  assert.throws(() => P.drawSmiles("CCO.CCBr"), /mixture/);
  assert.equal(K.analyse(P.drawSmiles("CCO")).components, 1);
});

test("every product the predictor reports is a valid structure, for every starting material and reagent", () => {
  for (const [n] of P.STARTERS) for (const g of P.REAGENTS) { const r = P.predict(P.starter(n), g.id); if (r.reacts) assert.ok(valid(r), `${n} + ${g.id}`); }
});

test("alkynes: equally substituted ends give both products whichever way the SMILES is written; several such sites are declined", () => {
  const names = (r) => r.products.map((p) => K.analyse(p.m).hash).sort();
  for (const g of ["hbr", "hg-hydration"]) {
    const a = pred("CC#CCC", g), b = pred("CCC#CC", g);
    assert.deepEqual(names(a), names(b), `${g}: pent-2-yne is the same reaction written either way`);
    assert.equal(a.products.length, 2, `${g}: both products form`);
    assert.equal(pred("CC#CCCCC#CCC", g).outcome, "unsupported", `${g}: two tied sites`);
  }
  assert.ok(has(pred("CC#CCC", "hbr"), "CC(Br)(Br)CCC") && has(pred("CC#CCC", "hbr"), "CCC(Br)(Br)CC"));
  assert.ok(has(pred("C#CC", "hbr"), "CC(C)(Br)Br") && pred("C#CC", "hbr").products.length === 1, "propyne: one product");
  assert.equal(pred("CC#CC", "hbr").products.length, 1, "symmetric but-2-yne: one product");
});

test("the applied rule record names the mechanism actually applied", () => {
  const ph = pred("Oc1ccccc1", "br2"); assert.equal(ph.mechanism, null); assert.equal(ph.rule.mechanism, null, "phenol + Br₂ is substitution, not the alkene-addition mechanism");
  const al = pred("CC=CC", "br2"); assert.equal(al.mechanism, "br2-butene"); assert.equal(al.rule.mechanism, "br2-butene");
});
