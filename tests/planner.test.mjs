// Synthesis planning (kit/labs/chemistry/reactions/planner.js) and substitution-versus-elimination competition
// (competition.js): every challenge is solvable by the predictor's own rules in its stated number of steps, routes
// found are valid step by step, retrosynthesis only offers real precursors, and the conditions model ranks pathways
// as textbooks do.
import { test } from "node:test";
import assert from "node:assert/strict";
import * as PL from "../kit/labs/chemistry/reactions/planner.js";
import * as P from "../kit/labs/chemistry/reactions/predictor.js";
import { competition } from "../kit/labs/chemistry/reactions/competition.js";
import { breakdown } from "../kit/labs/chemistry/reactions/marking.js";
import * as K from "../kit/labs/chemistry/skeletal.js";

test("every synthesis challenge is solvable in its stated shortest number of steps, at its level", () => {
  for (const t0 of PL.TASKS) {
    const t = PL.task(t0.id), r = PL.routes(t.start, t.targetHash, { depth: t.best, level: t.level });
    assert.ok(r.routes.length, `${t.id}: a route in ${t.best} steps`);
    assert.equal(r.routes[0].length, t.best, `${t.id}: shortest is ${t.best}`);
    if (t.best > 1) assert.equal(PL.routes(t.start, t.targetHash, { depth: t.best - 1, level: t.level }).routes.length, 0, `${t.id}: nothing shorter`);
    for (const route of r.routes) for (const e of route) assert.ok(PL.checkStep(r.graph.nodes.get(e.from).m, e.reagent, e.to), `${t.id}: each step checks`);
  }
});

test("multiple acceptable routes are found where they exist; level limits the reagents", () => {
  const t = PL.task("tertiary"), r = PL.routes(t.start, t.targetHash, { depth: 2 });
  assert.ok(r.routes.length >= 2, "propan-2-ol → propanone (either dichromate condition) → Grignard");
  const f = PL.task("propanol-switch");
  assert.equal(PL.routes(f.start, f.targetHash, { depth: 2, level: "foundation" }).routes.length, 0, "dehydration is above foundation level");
  assert.ok(PL.moves(P.drawSmiles("CCO"), "foundation").every((mv) => P.atLevel(P.reagentOf(mv.reagent), "foundation")));
});

test("retrosynthesis: precursors of a target really make it", () => {
  const t = PL.task("aryl-alcohol"), gr = PL.explore(t.start, { depth: 3 });
  const pre = PL.precursors(gr, t.targetHash);
  assert.ok(pre.length >= 1);
  for (const e of pre) assert.ok(PL.checkStep(gr.nodes.get(e.from).m, e.reagent, t.targetHash));
  assert.ok(pre.some((e) => K.analyse(gr.nodes.get(e.from).m).name?.name === "1-phenylethan-1-one" && e.reagent === "nabh4"));
});

test("competition: substrate, base, solvent and temperature change the main pathway", () => {
  const main = (s, c) => competition(P.drawSmiles(s), c).pathways.filter((p) => p.share === "major").map((p) => p.mech).sort().join("+");
  assert.equal(main("CCBr", { nuc: "hydroxide", solvent: "water", temp: "warm" }), "SN2");
  assert.equal(main("CCBr", { nuc: "tbuo", solvent: "ethanol", temp: "hot" }), "E2", "bulky base");
  assert.equal(main("CC(Br)CC", { nuc: "hydroxide", solvent: "water", temp: "warm" }), "SN2");
  assert.equal(main("CC(Br)CC", { nuc: "hydroxide", solvent: "ethanol", temp: "hot" }), "E2", "ethanolic and hot");
  assert.equal(main("CC(Br)CC", { nuc: "cyanide", solvent: "aprotic", temp: "warm" }), "SN2");
  assert.equal(main("CC(C)(C)Br", { nuc: "water", solvent: "water", temp: "rt" }), "SN1");
  assert.equal(main("CC(C)(C)Br", { nuc: "ethanol", solvent: "ethanol", temp: "hot" }), "E1", "weak base, heat");
  assert.equal(main("CC(C)(C)Br", { nuc: "ethoxide", solvent: "ethanol", temp: "hot" }), "E2");
  assert.equal(competition(P.drawSmiles("CCBr"), { nuc: "water", solvent: "water", temp: "rt" }).ok, false, "primary + water: too slow");
  const hof = competition(P.drawSmiles("CC(Br)CC"), { nuc: "tbuo", solvent: "ethanol", temp: "hot" }).pathways[0].products;
  assert.equal(K.analyse(hof.find((p) => p.role === "major").m).name.name, "but-1-ene", "Hofmann");
  assert.match(competition(P.drawSmiles("CCC"), {}).why, /halogenoalkane/);
  // the predictor's reagents use the same model
  assert.equal(P.predict(P.drawSmiles("CC(Br)CC"), "koh-eth").competition.pathways[0].mech, "E2");
});

test("marking: breakdown out of 10, partial credit, error carried forward", () => {
  const perfect = breakdown({ arrows: [2, 1], first: [2, 1], conditions: true, explanation: true });
  assert.equal(perfect.got, 10); assert.equal(perfect.rows.reduce((t, r) => t + r.max, 0), 10);
  const one = breakdown({ arrows: [3], first: [3] }); assert.equal(one.got, 10, "one-step scheme scales to 10");
  const ecf = breakdown({ arrows: [2, 1], first: [1, 1], ecf: 0, conditions: true, explanation: false });
  assert.equal(ecf.got, 5); assert.ok(ecf.rows.find((r) => r.label === "Later electron movement").got === 2, "later steps credited on the learner's intermediate");
  assert.ok(ecf.rows.find((r) => r.label === "Final product").got > 0, "partial credit for a consistent product");
  const zero = breakdown({ arrows: [2, 1, 2], first: [0, 0, 0], conditions: false, explanation: false });
  assert.equal(zero.got, 0);
});
