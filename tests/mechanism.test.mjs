// The Organic Chemistry Lab's mechanism engine (kit/labs/chemistry/reactions/): electron flow, validation, the
// reaction library and serialisation. Every intermediate here is produced by applying arrows, never hand-written.
import { test } from "node:test";
import assert from "node:assert/strict";
import * as E from "../kit/labs/chemistry/reactions/electron-flow.js";
import { REACTIONS, instantiate, faultyStep, arrowKinds } from "../kit/labs/chemistry/reactions/library.js";
import * as K from "../kit/labs/chemistry/skeletal.js";
import { EVIDENCE } from "../kit/courses/chemistry/evidence.js";
import INTERACTIVES_COURSE from "../kit/courses/chemistry/course.js";

const pair = (from, to) => ({ type: "pair", from, to });
const single = (from, to) => ({ type: "single", from, to });
const bondId = (s, a, b) => E.bondBetween(s, a, b).id;

test("states: lone pairs, radicals and formal charges follow from the electrons", () => {
  const s = E.build([["O", "O", 0, 0, -1, 1], ["C", "C", 2, 0, 1, 3], ["Cl", "Cl", 4, 0], ["N", "N", 6, 0, 1, 4]], []);
  const k = s.key;
  assert.equal(E.charge(s, k.O), -1); assert.equal(E.lonePairs(s, k.O), 3, "hydroxide: three lone pairs");
  assert.equal(E.charge(s, k.C), 1); assert.equal(E.lonePairs(s, k.C), 0, "methyl cation: none");
  assert.equal(E.isRadical(s, k.Cl), true, "Cl•"); assert.equal(E.charge(s, k.N), 1, "ammonium");
  // from a Structure-mode drawing: implicit hydrogens frozen, charges kept
  const m = K.graphFromSmiles("C[O-]"); const st = E.fromDrawing(m), o = st.atoms.find((a) => a.el === "O"), c = st.atoms.find((a) => a.el === "C");
  assert.equal(E.charge(st, o.id), -1); assert.equal(c.h, 3); assert.equal(E.lonePairs(st, o.id), 3);
});

test("bond formation and heterolysis update bonds and charges, conserving electrons", () => {
  const s = E.build([["O", "O", -2, 0, -1, 1], ["C", "C", 0, 0, 0, 3], ["Br", "Br", 1, 0]], [["C", "Br"]]), k = s.key;
  const r = E.applyStep(s, [pair({ lp: k.O }, { atom: k.C }), pair({ bond: bondId(s, k.C, k.Br) }, { atom: k.Br })]);
  assert.ok(r.ok, JSON.stringify(r.errors));
  assert.ok(E.bondBetween(r.state, k.O, k.C)); assert.ok(!E.bondBetween(r.state, k.C, k.Br));
  assert.equal(E.charge(r.state, k.O), 0); assert.equal(E.charge(r.state, k.Br), -1); assert.equal(E.charge(r.state, k.C), 0);
  assert.equal(r.electrons[0], r.electrons[1], "electron conservation");
  assert.deepEqual(r.chargeChanges.map((c) => [c.from, c.to]).sort(), [[-1, 0], [0, -1]].sort());
  assert.ok(r.steps.some((x) => /SN2/.test(x)), "classified as a concerted substitution");
  // a π bond moving onto oxygen
  const c = E.build([["C", "C", 0, 0, 0, 2], ["O", "O", 0, -1]], [["C", "O", 2]]);
  const r2 = E.applyStep(c, [pair({ bond: c.bonds[0].id }, { atom: c.key.O })]);
  assert.equal(E.bondBetween(r2.state, c.key.C, c.key.O).e, 2); assert.equal(E.charge(r2.state, c.key.O), -1); assert.equal(E.charge(r2.state, c.key.C), 1);
});

test("validation: arrow origin, destination, valence and paired electrons", () => {
  const s = E.build([["O", "O", -2, 0, -1, 1], ["C", "C", 0, 0, 0, 3], ["Br", "Br", 1, 0]], [["C", "Br"]]), k = s.key;
  const atomStart = E.applyStep(s, [pair({ atom: k.O }, { atom: k.C })]);
  assert.equal(atomStart.ok, false); assert.equal(atomStart.errors[0].code, "origin-atom", "arrow from an atom, not its lone pair");
  const five = E.applyStep(s, [pair({ lp: k.O }, { atom: k.C })]);
  assert.equal(five.ok, false); assert.ok(five.errors.some((e) => e.code === "valence" && e.atom === k.C), "carbon would have five bonds");
  assert.match(five.errors.find((e) => e.code === "valence").text, /another bond to it must break/);
  assert.equal(E.applyStep(s, [pair({ lp: k.C }, { atom: k.O })]).errors[0].code, "no-electrons", "carbon here has no lone pair");
  assert.equal(E.applyStep(s, [pair({ lp: k.O }, { between: [k.C, k.Br] })]).errors[0].code, "lp-target");
  const half = E.applyStep(s, [single({ bond: s.bonds[0].id }, { atom: k.Br })]);
  assert.ok(half.errors.some((e) => e.code === "odd-bond"), "one fishhook leaves a one-electron bond");
  const homo = E.applyStep(s, [single({ bond: s.bonds[0].id }, { atom: k.Br }), single({ bond: s.bonds[0].id }, { atom: k.C })]);
  assert.ok(homo.ok); assert.ok(E.isRadical(homo.state, k.C) && E.isRadical(homo.state, k.Br)); assert.ok(homo.steps.some((x) => /Homolytic/.test(x)));
  assert.deepEqual(homo.checks.map((c) => c.ok), [true, true, true, true, true, true]);
  // a primary carbocation is flagged as unlikely
  const ion = E.applyStep(s, [pair({ bond: s.bonds[0].id }, { atom: k.Br })]);
  assert.ok(ion.ok); assert.ok(ion.warnings.some((w) => w.code === "unstable-cation"));
});

test("the library: every reaction replays from its own arrows to its stated products", () => {
  assert.ok(REACTIONS.length >= 6);
  for (const r of REACTIONS) {
    const t = instantiate(r), rp = E.replay({ start: t.start, steps: t.steps });
    assert.ok(rp.ok, `${r.id}: ${rp.results.flatMap((x) => x.errors.map((e) => e.text)).join("; ")}`);
    assert.deepEqual(E.species(rp.states.at(-1)).map((x) => x.formula).sort(), [...r.products].sort(), r.id);
    for (const st of r.steps) assert.ok(st.hint && st.explain && st.label, `${r.id}: hint, explanation and label for every step`);
    assert.ok(r.overview && r.outcome && r.conditions.above && r.misconceptions.length, r.id);
    for (const res of rp.results) assert.equal(res.electrons[0], res.electrons[1], `${r.id}: electrons conserved`);
  }
});

test("the library's products are the right molecules", () => {
  const named = (id) => { const t = instantiate(REACTIONS.find((r) => r.id === id)), end = E.replay({ start: t.start, steps: t.steps }).states.at(-1); return E.species(end).filter((x) => !x.charge && !x.radical).map((x) => K.analyse(E.toDrawing({ atoms: end.atoms.filter((a) => x.atoms.includes(a.id)), bonds: end.bonds.filter((b) => x.atoms.includes(b.a)) }).m).name?.name).filter(Boolean).sort(); };
  assert.deepEqual(named("sn2"), ["ethanol"]);
  assert.deepEqual(named("sn1"), ["2-methylpropan-2-ol"]);
  assert.deepEqual(named("e2"), ["prop-1-ene"]);
  assert.deepEqual(named("hbr-propene"), ["2-bromopropane"], "Markovnikov product");
  assert.deepEqual(named("hcn-ethanal"), ["2-hydroxypropanenitrile"]);
  assert.deepEqual(named("radical-chlorination"), ["chloromethane"]);
  assert.deepEqual(named("e1"), ["2-methylprop-1-ene"]);
  assert.deepEqual(named("br2-butene"), ["2,3-dibromobutane"]);
  assert.deepEqual(named("nitration"), ["nitrobenzene"]);
  assert.deepEqual(named("nabh4-propanone"), ["propan-2-ol"]);
  assert.deepEqual(named("acyl-water"), ["ethanoic acid"]);
  assert.deepEqual(named("chlorination"), ["chlorobenzene"]);
  assert.deepEqual(named("fc-acylation"), ["1-phenylethan-1-one"]);
  assert.deepEqual(named("ester-hydrolysis"), ["ethanol"]);
  assert.deepEqual(named("acyl-ammonia"), ["ethanamide"]);
  assert.deepEqual(named("grignard"), ["2-methylpropan-2-ol"]);
  // the acylium ion is recognised as stabilised, not flagged as a primary carbocation
  const fc = instantiate(REACTIONS.find((r) => r.id === "fc-acylation")), r1 = E.applyStep(fc.start, fc.steps[0].arrows);
  assert.ok(r1.steps.some((x) => /acylium/.test(x))); assert.ok(!r1.warnings.some((w) => w.code === "unstable-cation"));
  // every library reaction has a difficulty level
  for (const r of REACTIONS) assert.ok(["foundation", "intermediate", "advanced", "university"].includes(r.level), r.id);
});

test("new families: E1 goes through a protonated alcohol and a carbocation; addition–elimination re-forms C=O", () => {
  const t = instantiate(REACTIONS.find((r) => r.id === "e1")), rp = E.replay({ start: t.start, steps: t.steps });
  assert.equal(E.charge(rp.states[1], t.key.O), 1, "–OH₂⁺"); assert.equal(E.charge(rp.states[2], t.key.C), 1, "tertiary carbocation");
  assert.ok(rp.results[1].steps.some((x) => /tertiary carbocation/.test(x)));
  const wrong = E.applyStep(t.start, [pair({ bond: E.bondBetween(t.start, t.key.C, t.key.O).id }, { atom: t.key.O })]);
  assert.ok(wrong.ok); assert.ok(REACTIONS.find((r) => r.id === "e1").mistakes[0].test(wrong.state, t.key), "OH⁻ leaving is recognised");
  const a = instantiate(REACTIONS.find((r) => r.id === "acyl-water")), ra = E.replay({ start: a.start, steps: a.steps });
  assert.equal(E.charge(ra.states[1], a.key.O), -1, "tetrahedral alkoxide"); assert.equal(E.bondBetween(ra.states[2], a.key.C, a.key.O).e, 4, "C=O re-formed");
  assert.ok(ra.results[1].steps.some((x) => /addition–elimination/.test(x))); assert.ok(!ra.results[1].steps.some((x) => /SN2/.test(x)), "not mistaken for SN2");
  const sn2like = E.applyStep(a.start, [pair({ lp: a.key.Ow }, { atom: a.key.C }), pair({ bond: E.bondBetween(a.start, a.key.C, a.key.Cl).id }, { atom: a.key.Cl })]);
  assert.ok(sn2like.ok); assert.ok(REACTIONS.find((r) => r.id === "acyl-water").mistakes[0].test(sn2like.state, a.key));
  const n = instantiate(REACTIONS.find((r) => r.id === "nitration")), rn = E.replay({ start: n.start, steps: n.steps });
  assert.equal(E.charge(rn.states[1], n.key.N), 1); assert.equal(E.charge(rn.states[1], n.key.Oa), -1, "nitro group N⁺–O⁻");
  const h = instantiate(REACTIONS.find((r) => r.id === "nabh4-propanone"));
  assert.equal(E.charge(h.start, h.key.Hy), -1); assert.equal(E.lonePairs(h.start, h.key.Hy), 1, "hydride: one pair, − charge");
});

test("spot the error: every changed arrow is confirmed wrong by the engine, with an explanation", () => {
  let n = 0;
  for (const r of REACTIONS) {
    const t = instantiate(r), states = E.replay({ start: t.start, steps: t.steps }).states;
    t.steps.forEach((st, k) => {
      for (let seed = 0; seed < 4; seed++) {
        const f = faultyStep(t, k, seed); if (!f) continue; n++;
        assert.equal(f.arrows.length, st.arrows.length); assert.ok(f.why.length > 20, `${r.id} ${k}`);
        const res = E.applyStep(states[k], f.arrows), good = E.applyStep(states[k], st.arrows).state;
        assert.ok(!res.ok || !E.sameState(res.state, good), `${r.id} step ${k + 1}: the changed arrow really is wrong`);
        f.arrows.forEach((a, i) => { if (i !== f.wrong) assert.deepEqual(a, st.arrows[i], "only one arrow changed"); });
      }
    });
  }
  assert.ok(n >= 40);
  const t = instantiate(REACTIONS.find((r) => r.id === "radical-chlorination")), f = faultyStep(t, 0, 0);
  assert.match(f.why, /heterolysis/, "a misplaced fishhook is explained as heterolysis");
});

test("error carried forward: arrow kinds match the model step on a different intermediate", () => {
  // anti-Markovnikov first step (valid, wrong), then bromide attacking that primary carbocation: same kind of step
  const h = instantiate(REACTIONS.find((r) => r.id === "hbr-propene")), s = h.start, k = h.key;
  const wrong = E.applyStep(s, [pair({ bond: E.bondBetween(s, k.C1, k.C2).id }, { between: [k.C2, k.H] }), pair({ bond: E.bondBetween(s, k.H, k.Br).id }, { atom: k.Br })]).state;
  const model = E.applyStep(s, h.steps[0].arrows).state, mine = [pair({ lp: k.Br }, { atom: k.C1 })];
  assert.ok(E.applyStep(wrong, mine).ok);
  assert.deepEqual(arrowKinds(wrong, mine), arrowKinds(model, h.steps[1].arrows));
  assert.notDeepEqual(arrowKinds(wrong, [pair({ bond: E.bondBetween(wrong, k.C1, k.C2).id }, { atom: k.C1 })]), arrowKinds(model, h.steps[1].arrows));
});

test("intermediates: carbocations and radicals are recognised", () => {
  const t = instantiate(REACTIONS.find((r) => r.id === "sn1")), r1 = E.applyStep(t.start, t.steps[0].arrows);
  assert.equal(E.charge(r1.state, t.key.C), 1); assert.ok(r1.steps.some((x) => /tertiary carbocation/.test(x))); assert.ok(!r1.warnings.some((w) => w.code === "unstable-cation"));
  const h = instantiate(REACTIONS.find((r) => r.id === "hbr-propene")), r2 = E.applyStep(h.start, h.steps[0].arrows);
  assert.ok(r2.steps.some((x) => /secondary carbocation/.test(x)));
  const f = instantiate(REACTIONS.find((r) => r.id === "radical-chlorination")), r3 = E.applyStep(f.start, f.steps[0].arrows);
  assert.ok(E.isRadical(r3.state, f.key.Cla) && E.isRadical(r3.state, f.key.Clb));
});

test("marking support: arrows that do the same thing compare equal; wrong turns are recognised", () => {
  const h = instantiate(REACTIONS.find((r) => r.id === "hbr-propene")), s = h.start, k = h.key;
  // the π arrow pointed at H (an atom) and at the space between C1 and H are the same electron movement
  const piId = E.bondBetween(s, k.C1, k.C2).id;
  assert.equal(E.arrowKey(s, pair({ bond: piId }, { atom: k.H })), E.arrowKey(s, pair({ bond: piId }, { between: [k.C1, k.H] })));
  // anti-Markovnikov: H to C2 gives a primary carbocation, flagged, and the template's mistake explains it
  const wrong = E.applyStep(s, [pair({ bond: piId }, { between: [k.C2, k.H] }), pair({ bond: E.bondBetween(s, k.H, k.Br).id }, { atom: k.Br })]);
  assert.ok(wrong.ok); assert.ok(wrong.warnings.some((w) => w.code === "unstable-cation"));
  const r = REACTIONS.find((x) => x.id === "hbr-propene"); assert.ok(r.mistakes.some((m) => m.test(wrong.state, k)));
  assert.ok(!E.sameState(wrong.state, E.applyStep(s, h.steps[0].arrows).state));
  // E2 conditions: hydroxide attacking carbon is recognised as substitution
  const e = instantiate(REACTIONS.find((x) => x.id === "e2")), sub = E.applyStep(e.start, [pair({ lp: e.key.O }, { atom: e.key.Ca }), pair({ bond: E.bondBetween(e.start, e.key.Ca, e.key.Br).id }, { atom: e.key.Br })]);
  assert.ok(sub.ok); assert.ok(REACTIONS.find((x) => x.id === "e2").mistakes[0].test(sub.state, e.key));
});

test("serialisation: a mechanism is plain JSON that replays identically", () => {
  const t = instantiate(REACTIONS.find((r) => r.id === "sn1")), mech = { v: 1, title: "SN1", reactionId: "sn1", start: t.start, steps: t.steps.map((s) => ({ arrows: s.arrows })) };
  const back = JSON.parse(JSON.stringify(mech)), a = E.replay(mech), b = E.replay(back);
  assert.ok(b.ok); assert.equal(a.states.length, b.states.length);
  a.states.forEach((s, i) => assert.ok(E.sameState(s, b.states[i]), `state ${i}`));
  // the structured context an AI tutor would get carries the engine's verdict
  const ctx = E.tutorContext({ title: "SN1", reaction: REACTIONS[1], state: t.start, arrows: [pair({ atom: t.key.O1 }, { atom: t.key.C })], result: E.applyStep(t.start, [pair({ atom: t.key.O1 }, { atom: t.key.C })]), stepIndex: 0 });
  assert.equal(ctx.verdict.valid, false); assert.match(ctx.verdict.errors[0], /lone pair/); assert.equal(ctx.arrows[0].from, "atom O1");
});

test("partial charges: δ+ carbon and δ− halogen in a polar bond", () => {
  const s = E.build([["C", "C", 0, 0, 0, 3], ["Br", "Br", 1, 0]], [["C", "Br"]]);
  assert.deepEqual(E.partialCharges(s).map((p) => p.sign).sort(), ["δ+", "δ−"]);
});

test("registration: each mechanism challenge is evidence for a lesson the lab links to", () => {
  const x = INTERACTIVES_COURSE.interactives.find((i) => i.id === "organic-notes");
  for (const r of REACTIONS) { const l = EVIDENCE["organic-notes"][`mech-${r.id}`]; assert.ok(l, r.id); assert.ok(x.lessons.includes(l), `${r.id} → ${l}`); }
  assert.ok(REACTIONS.length >= 16);
});
