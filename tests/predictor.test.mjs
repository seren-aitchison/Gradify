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
