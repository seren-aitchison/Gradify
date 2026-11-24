// The Organic Chemistry Lab's saved work (localStorage: the current drawing and the notebook of drawings and
// mechanisms) is read back field by field before anything is drawn. A tampered or corrupted save is dropped, never
// rendered: an element symbol becomes SVG text, so markup in one must not reach the page. Genuine saves round-trip.
import { test } from "node:test";
import assert from "node:assert/strict";
import * as K from "../kit/labs/chemistry/skeletal.js";
import * as E from "../kit/labs/chemistry/reactions/electron-flow.js";
import { REACTIONS, instantiate } from "../kit/labs/chemistry/reactions/library.js";
import { restoreNote, MAX_STEPS } from "../kit/labs/chemistry/reactions/mechanism-ui.js";
import { restorePage } from "../kit/labs/chemistry/sketch.js";

const PAYLOAD = '<img src=x onerror="alert(1)">';
const ethanol = () => { const m = K.graphFromSmiles("CCO"); m.atoms.forEach((a, i) => { a.x = i; a.y = 0; }); return JSON.parse(JSON.stringify(m)); };
const roundTrip = (v) => JSON.parse(JSON.stringify(v)); // what localStorage gives back
const render = (m) => K.render(m, K.analyse(m), K.fit(m, [300, 200]), [300, 200], {});

test("a genuine drawing round-trips through restore unchanged in what it draws", () => {
  const m = ethanol(), r = K.restore(roundTrip(m));
  assert.ok(r); assert.equal(r.atoms.length, 3); assert.equal(r.bonds.length, 2); assert.ok(r.next > Math.max(...r.atoms.map((a) => a.id), ...r.bonds.map((b) => b.id)));
  assert.equal(K.analyse(r).name.name, K.analyse(m).name.name);
  const w = K.clone(m); w.bonds[0].stereo = "wedge"; assert.equal(K.restore(roundTrip(w)).bonds[0].stereo, "wedge");
  const ion = K.clone(m); ion.atoms[2].charge = -1; assert.equal(K.restore(roundTrip(ion)).atoms[2].charge, -1);
  assert.deepEqual(K.restore(K.empty()), K.empty());
});

test("a drawing with a tampered element symbol, charge or bond is dropped whole", () => {
  const bad = [
    (m) => { m.atoms[0].el = PAYLOAD; }, (m) => { m.atoms[0].el = "Xx"; }, (m) => { m.atoms[0].el = "__proto__"; }, (m) => { m.atoms[0].el = ["C"]; },
    (m) => { m.atoms[0].charge = "<b>"; }, (m) => { m.atoms[0].charge = 1.5; }, (m) => { m.atoms[0].charge = 99; },
    (m) => { m.atoms[0].x = "1\" onload=\"x"; }, (m) => { m.atoms[0].x = Infinity; }, (m) => { m.atoms[0].id = "1"; }, (m) => { m.atoms[1].id = m.atoms[0].id; },
    (m) => { m.bonds[0].b = 999; }, (m) => { m.bonds[0].order = 4; }, (m) => { m.bonds[0].stereo = PAYLOAD; }, (m) => { m.bonds[0].b = m.bonds[0].a; },
    (m) => { m.bonds.push({ ...m.bonds[0], id: 500 }); }, (m) => { m.atoms.push(null); }, (m) => { m.bonds = "x"; },
  ];
  for (const [i, f] of bad.entries()) { const m = ethanol(); f(m); assert.equal(K.restore(roundTrip(m)), null, `case ${i}`); }
  for (const v of [null, undefined, 3, "x", [], { atoms: [] }, { atoms: {}, bonds: [] }]) assert.equal(K.restore(v), null);
});

test("restore copies only the lab's own fields, so nothing else from storage reaches the renderer", () => {
  const m = ethanol(); m.atoms[0].label = PAYLOAD; m.bonds[0].extra = PAYLOAD; m.evil = PAYLOAD;
  const r = K.restore(roundTrip(m)); assert.ok(r);
  assert.doesNotMatch(JSON.stringify(r), /onerror/);
  assert.deepEqual(Object.keys(r.atoms[0]).sort(), ["charge", "el", "id", "x", "y"]);
});

test("the renderer escapes atom labels even when handed an unchecked molecule", () => {
  const m = ethanol(); m.atoms[2].el = PAYLOAD;
  const svg = render(m);
  assert.doesNotMatch(svg, /<img|onerror="/); assert.match(svg, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
});

test("a genuine mechanism note (a library reaction, partly or wholly done, and the learner's own) round-trips", () => {
  for (const r of REACTIONS.slice(0, 6)) {
    const t = instantiate(r), full = roundTrip({ v: 1, title: r.title, reactionId: r.id, conditions: r.conditions, start: t.start, steps: t.steps.map((s) => ({ arrows: s.arrows })), ecf: null });
    const back = restoreNote(full); assert.ok(back, r.id);
    assert.ok(E.sameState(E.replay(back).states.at(-1), E.replay({ start: t.start, steps: t.steps.map((s) => ({ arrows: s.arrows })) }).states.at(-1)), r.id);
    assert.ok(restoreNote({ ...full, steps: full.steps.slice(0, 1), ecf: 0 }), `${r.id} partly done`);
  }
  const own = roundTrip({ v: 1, title: "My mechanism", reactionId: null, conditions: null, start: E.fromDrawing(ethanol()), steps: [], ecf: null });
  assert.ok(restoreNote(own));
});

test("a tampered mechanism note is dropped: element, reaction, arrows, error-carried-forward step, or one that no longer replays", () => {
  const r = REACTIONS[0], t = instantiate(r);
  const good = () => roundTrip({ v: 1, title: r.title, reactionId: r.id, conditions: r.conditions, start: t.start, steps: t.steps.map((s) => ({ arrows: s.arrows })), ecf: null });
  const bad = [
    (n) => { n.start.atoms[0].el = PAYLOAD; }, (n) => { n.start.atoms[0].el = "Zz"; }, (n) => { n.start.atoms[0].n = -1; }, (n) => { n.start.bonds[0].e = 3; },
    (n) => { n.reactionId = "no-such-reaction"; }, (n) => { n.title = { toString: 1 }; }, (n) => { n.conditions = { above: PAYLOAD.repeat(100), below: "" }; },
    (n) => { n.steps[0].arrows[0].type = PAYLOAD; }, (n) => { n.steps[0].arrows[0].to = { atom: "1" }; }, (n) => { n.steps[0].arrows = []; }, (n) => { n.steps = {}; },
    (n) => { n.ecf = 99; }, (n) => { n.ecf = "0"; },
    (n) => { n.steps[0].arrows[0] = { type: "pair", from: { lp: 999 }, to: { atom: 998 } }; }, // valid shape, but it doesn't replay
  ];
  for (const [i, f] of bad.entries()) { const n = good(); f(n); assert.equal(restoreNote(roundTrip(n)), null, `case ${i}`); }
  assert.equal(restoreNote(null), null); assert.equal(restoreNote([]), null);
});

test("notebook pages: genuine drawings and mechanisms are kept, tampered ones dropped, and only known fields kept", () => {
  const draw = { id: "abc12", title: "ethanol", note: "my note", mol: ethanol(), at: "2026-11-20", name: "ethanol", formula: "C2H6O", smiles: "CCO" };
  const kept = restorePage(roundTrip(draw)); assert.ok(kept); assert.equal(kept.title, "ethanol"); assert.equal(kept.note, "my note");
  const r = REACTIONS[0], t = instantiate(r);
  const mech = { id: "abc13", kind: "mech", title: r.title, mech: { v: 1, title: r.title, reactionId: r.id, conditions: r.conditions, start: t.start, steps: [], ecf: null }, at: "2026-11-20" };
  assert.ok(restorePage(roundTrip(mech)));
  assert.equal(restorePage({ ...draw, mol: { ...ethanol(), atoms: [{ id: 1, x: 0, y: 0, el: PAYLOAD, charge: 0 }] } }), null);
  assert.equal(restorePage({ ...mech, mech: { ...mech.mech, start: { ...t.start, atoms: [{ ...t.start.atoms[0], el: PAYLOAD }, ...t.start.atoms.slice(1)] } } }), null);
  assert.equal(restorePage({ ...draw, kind: "other" }), null); assert.equal(restorePage({ ...draw, title: 3 }), null); assert.equal(restorePage({ ...draw, mol: K.empty() }), null);
  const odd = restorePage(roundTrip({ ...draw, id: '"><x', at: "<script>", extra: PAYLOAD }));
  assert.equal(odd.id, null); assert.equal(odd.at, ""); assert.equal(odd.extra, undefined);
});

test("the limits on a restored note are the editor's own: a learner's 40-step mechanism reopens; a large drawing too", () => {
  // H–Cl broken and re-formed, step after step: valid chemistry the editor accepts up to MAX_STEPS (browser check S4)
  const m = K.empty(), h = K.addAtom(m, 0, 0, "H"), cl = K.addAtom(m, 1, 0, "Cl"); K.addBond(m, h.id, cl.id, 1);
  const brk = { type: "pair", from: { ends: [h.id, cl.id] }, to: { atom: cl.id } }, mk = { type: "pair", from: { lp: cl.id }, to: { atom: h.id } };
  const note = (n) => roundTrip({ v: 1, title: "My mechanism", reactionId: null, conditions: null, start: E.fromDrawing(m), steps: Array.from({ length: n }, (_, i) => ({ arrows: [i % 2 ? mk : brk] })), ecf: null });
  assert.equal(MAX_STEPS, 40);
  assert.ok(restoreNote(note(MAX_STEPS)), "a note at the limit reopens");
  assert.equal(restoreNote(note(MAX_STEPS + 1)), null, "past it (which the editor no longer allows) it doesn't");
  // the drawing editor has no size limit, so neither does restore: a 1500-atom chain comes back whole
  const big = K.empty(); let prev = K.addAtom(big, 0, 0); for (let i = 1; i < 1500; i++) { const a = K.addAtom(big, i * 0.87, i % 2 ? 0.5 : 0); K.addBond(big, prev.id, a.id, 1); prev = a; }
  assert.equal(K.restore(roundTrip(big))?.atoms.length, 1500);
});
