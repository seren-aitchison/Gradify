// The knowledge engine (kit/knowledge/, scripts/knowledge/, the osmosisbox and magnification renderers): templates,
// level forms, schema and licences, the publishing gate, the Biology knowledge base and its evidence, question
// generation, retrieval, the validation batch of lessons, QA, lifecycle, impact and the production report.
// Requirements, items and data marked "test" are WRITTEN FOR THE TESTS.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { TEMPLATES, LEVELS, templateFor, inRange, depthOf } from "../kit/knowledge/templates.js";
import { resolve, checkForms, merge } from "../kit/knowledge/forms.js";
import { checkSource, checkKnowledge, checkLesson, policyOf, categoryOf, usesOf, LICENCES, CATEGORIES, NEXT, publishGate, notesHash } from "../kit/knowledge/schema.js";
import { generateQuestions, COMPUTE } from "../kit/knowledge/questions.js";
import { checkDataClaims, pearson, linearFit, describeCorrelation, xIntercept } from "../kit/knowledge/stats.js";
import { loadKnowledge, loadSources, load, at, itemHash, longestSharedRun } from "../scripts/knowledge/lib.mjs";
import { retrieve, assemble, visualSpec, selectLibraryDiagrams, renderer, formHash } from "../scripts/knowledge/assemble.mjs";
import { qa, advance, review, impact, fkGrade, labelsOutside } from "../scripts/knowledge/qa.mjs";
import { knowledgeFor } from "../scripts/knowledge/report.mjs";
import { parseNotes } from "../kit/course/notes.js";
import { statementsPath } from "../scripts/curriculum/engine.mjs";

const items = loadKnowledge("biology"), sources = loadSources(), byId = new Map(items.map((k) => [k.id, k]));
const evidence = load(at("biology/evidence.json")).items;
const batch = load(new URL("../scripts/knowledge/batch.json", import.meta.url)).requirements;
const lessonFor = (reqId) => { const id = `kb-${reqId.replace(/^aqa-gcse-biology:/, "aqa8461-").replace(/^gradify-biology:/, "gradify-bio-").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-${reqId.startsWith("gradify") ? "ug" : "gcse"}`.replace(/-+/g, "-"); return { id, lesson: load(at(`lessons/${id}/lesson.json`)), notes: readFileSync(at(`lessons/${id}/notes.txt`), "utf8") }; };
const AQA = existsSync(statementsPath("aqa-gcse-biology"));

// ---------- templates and levels ----------
test("templates: one for every level, chosen by level, subject and kind of requirement", () => {
  for (const l of Object.keys(LEVELS)) assert.ok(templateFor(l, "biology"), l);
  assert.equal(templateFor("gcse", "biology").id, "gcse-science");
  assert.equal(templateFor("gcse", "biology", { kind: "practical" }).id, "gcse-practical", "a required practical gets the practical template");
  assert.equal(templateFor("gcse", "biology", { kind: "skill" }).id, "gcse-science");
  assert.equal(templateFor("ug", "biology", { kind: "practical" }).id, "ug-science", "no special template at that level: the level's own");
  assert.throws(() => templateFor("gcse", "law"), /no lesson template/);
  for (const [id, t] of Object.entries(TEMPLATES)) for (const r of ["objectives", "terms", "practice", "summary"]) assert.ok(t.components.some((c) => c.id === r && c.required), `${id} requires ${r}`);
  for (const r of ["aim", "equipment", "variables", "method", "safety", "results", "analysis", "evaluation"]) assert.ok(TEMPLATES["gcse-practical"].components.some((c) => c.id === r && c.required), `a practical requires ${r}`);
  assert.ok(inRange({ from: "ks3", to: "gcse" }, "nat5")); assert.ok(!inRange({ from: "alevel" }, "gcse")); assert.equal(depthOf(TEMPLATES["gcse-science"]), 3);
});

test("level forms: one canonical item, each level's own wording, fingerprinted per level", () => {
  const def = byId.get("bio.osmosis.definition");
  const g = resolve(def, "gcse"), u = resolve(def, "ug");
  assert.equal(g.id, u.id); assert.equal(g.version, u.version);
  assert.match(g.text, /dilute solution/); assert.doesNotMatch(g.text, /water potential/);
  assert.match(u.text, /water potential/); assert.equal(g.form, "default"); assert.equal(u.form, "alevel-pg");
  assert.notEqual(formHash(def, "gcse"), formHash(def, "ug"));
  assert.equal(formHash(def, "gcse"), formHash(def, "ks3"), "levels sharing a form share a fingerprint");
  // editing the university form changes university fingerprints only
  const edited = structuredClone(def); edited.forms[0].text += " (edited)";
  assert.equal(formHash(edited, "gcse"), formHash(def, "gcse")); assert.notEqual(formHash(edited, "ug"), formHash(def, "ug"));
  // a form can remove a field (the university form of the prokaryotic cell has no generated diagram)
  assert.ok(resolve(byId.get("bio.cells.prokaryotic"), "gcse").visual); assert.equal(resolve(byId.get("bio.cells.prokaryotic"), "ug").visual, null);
  assert.equal(resolve(byId.get("bio.enzymes.induced-fit"), "gcse"), null, "not valid at GCSE");
  assert.deepEqual(merge({ a: 1, b: { c: 2, d: 3 } }, { b: { c: 9 } }), { a: 1, b: { c: 9, d: 3 } });
  const bad = { id: "test.x.y", level: { from: "gcse", to: "alevel" }, forms: [{ level: { from: "ks3", to: "gcse" } }, { level: { from: "gcse", to: "alevel" } }, { level: { from: "as", to: "as" }, colour: "red" }] };
  const p = checkForms(bad);
  for (const re of [/outside the item's levels/, /overlap/, /can't override colour/]) assert.ok(p.some((x) => re.test(x)), String(re));
  assert.ok(items.filter((k) => k.forms?.length).length >= 10, "level forms are used throughout, not a one-off");
});

// ---------- licences and the publishing gate ----------
test("licence categories: explicit permitted uses for each", () => {
  assert.deepEqual(Object.keys(CATEGORIES), ["public-domain", "commercial-adapt", "noncommercial-only", "verify-only", "unknown"]);
  assert.equal(categoryOf("CC0-1.0"), "public-domain"); assert.equal(categoryOf("CC-BY-4.0"), "commercial-adapt"); assert.equal(categoryOf("OGL-3.0"), "commercial-adapt");
  assert.equal(categoryOf("CC-BY-NC-SA-4.0"), "noncommercial-only"); assert.equal(categoryOf("CC-BY-ND-4.0"), "verify-only"); assert.equal(categoryOf("made-up"), "unknown");
  assert.deepEqual(usesOf("CC-BY-NC-4.0"), { adapt: false, commercial: false, verify: true }, "NonCommercial: verify only, for a paid product");
  assert.deepEqual(usesOf("unknown"), { adapt: false, commercial: false, verify: false }, "unknown permissions: not even for checking until confirmed");
  assert.equal(policyOf("CC-BY-4.0"), "reuse"); assert.equal(policyOf("CC-BY-NC-SA-4.0"), "verify-only");
  assert.equal(LICENCES.PD.attribution, false); assert.equal(LICENCES["CC-BY-4.0"].attribution, true); assert.equal(LICENCES.gradify.attribution, false);
});

test("source records: provenance, category and uses; no text from a source Gradify may not adapt", () => {
  for (const s of Object.values(sources)) assert.deepEqual(checkSource(s), [], s.id);
  assert.ok(Object.keys(sources).length >= 11);
  for (const s of Object.values(sources).filter((x) => x.publisher.startsWith("OpenStax"))) {
    assert.equal(s.category, "noncommercial-only"); assert.match(s.url, /\/[0-9a-f]{40}\/modules\/m\d+\//, "pinned to a commit");
    assert.ok(s.passages.every((p) => !p.text));
  }
  const ox = sources["openstax-biology-2e-5-2"];
  assert.ok(checkSource({ ...ox, category: "commercial-adapt" }).some((x) => /category must be noncommercial-only/.test(x)));
  assert.ok(checkSource({ ...ox, passages: [{ id: "x", text: "copied" }] }).some((x) => /must not be stored/.test(x)));
  assert.ok(checkSource({ ...ox, licenceConfirmed: { by: "" } }).some((x) => /licenceConfirmed needs/.test(x)));
});

test("adapting is only allowed from sources that permit commercial adaptation", () => {
  const base = { ...byId.get("bio.osmosis.passive"), id: "test.osmosis.adapted" };
  const fromNc = checkKnowledge([{ ...base, origin: { type: "adapted", source: "openstax-biology-2e-5-2", passages: ["fs-id1"] } }], sources);
  assert.ok(fromNc.some((x) => /doesn't allow commercial adaptation/.test(x)));
  const fromOwn = checkKnowledge([{ ...base, origin: { type: "adapted", source: "gradify-biology-u02-21", passages: ["L700"] } }], sources);
  assert.deepEqual(fromOwn, []);
  assert.ok(checkKnowledge([{ ...base, origin: { type: "adapted", source: "gradify-biology-u02-21" } }], sources).some((x) => /names the passages/.test(x)));
  assert.equal(items.filter((k) => k.origin?.type === "adapted").length, 0, "today every item is Gradify's own writing");
});

test("the publishing gate: hard rules, and similarity never stands in for permission", () => {
  const { lesson } = lessonFor("aqa-gcse-biology:4.1.1.5.c");
  const its = lesson.knowledge.map((k) => resolve(byId.get(k.id), lesson.level));
  const p = publishGate({ lesson, items: its, sources, evidence, attributed: lesson.attributed });
  for (const re of [/not approved/, /no named reviewer/, /hasn't been reviewed/, /no person has confirmed its licence/]) assert.ok(p.some((x) => re.test(x)), String(re));
  // everything a person would do: approve, review every item, confirm every licence → publishable
  const notes = "## The approved text\nS: exactly what the reviewer read";
  const ok = { ...lesson, status: "approved", review: { approvedBy: "A. Reviewer", notesHash: notesHash(notes) } };
  const reviewed = its.map((k) => ({ ...k, status: "reviewed", reviewedBy: "A. Reviewer", reviewedOn: "2026-12-01" }));
  const confirmed = Object.fromEntries(Object.entries(sources).map(([id, s]) => [id, { ...s, licenceConfirmed: { by: "A. Owner", on: "2026-12-01" } }]));
  assert.deepEqual(publishGate({ lesson: ok, items: reviewed, sources: confirmed, evidence, attributed: lesson.attributed, stale: [], notes }), []);
  // approval is of a text: edited notes, notes not read, or an approval with no fingerprint all block publishing
  assert.ok(publishGate({ lesson: ok, items: reviewed, sources: confirmed, evidence, attributed: lesson.attributed, stale: [], notes: `${notes} (edited)` }).some((x) => /notes changed after approval/.test(x)));
  assert.ok(publishGate({ lesson: ok, items: reviewed, sources: confirmed, evidence, attributed: lesson.attributed, stale: [] }).some((x) => /notes weren't read/.test(x)));
  assert.ok(publishGate({ lesson: { ...ok, review: { approvedBy: "A. Reviewer" } }, items: reviewed, sources: confirmed, evidence, attributed: lesson.attributed, stale: [], notes }).some((x) => /doesn't record which text/.test(x)));
  // knowledge that changed after QA and approval blocks publishing, and so does skipping the change check
  assert.ok(publishGate({ lesson: ok, items: reviewed, sources: confirmed, evidence, attributed: lesson.attributed, stale: ["bio.x changed for this level (v1 → v2)"] }).some((x) => /changed since QA/.test(x)));
  assert.ok(publishGate({ lesson: ok, items: reviewed, sources: confirmed, evidence, attributed: lesson.attributed }).some((x) => /change check/.test(x)));
  // each hard rule, broken on its own
  assert.ok(publishGate({ lesson: ok, items: reviewed.map((k, i) => (i ? k : { ...k, origin: { type: "adapted", source: "openstax-biology-2e-4-1", passages: ["x"] } })), sources: confirmed, evidence, attributed: lesson.attributed }).some((x) => /may not adapt commercially/.test(x)));
  assert.ok(publishGate({ lesson: ok, items: reviewed, sources: { ...confirmed, "openstax-biology-2e-4-1": { ...confirmed["openstax-biology-2e-4-1"], licence: "unknown" } }, evidence, attributed: lesson.attributed }).some((x) => /unknown or unverified/.test(x)));
  assert.ok(publishGate({ lesson: ok, items: reviewed, sources: confirmed, evidence: {}, attributed: lesson.attributed }).some((x) => /no evidence trail/.test(x)));
  assert.ok(publishGate({ lesson: ok, items: reviewed, sources: confirmed, evidence, attributed: [] }).some((x) => /attribution required/.test(x)));
  // Gradify's own lessons need no licence confirmation
  assert.ok(!p.some((x) => /gradify-biology-u14-05: no person/.test(x)));
});

// ---------- the knowledge base ----------
test("the Biology knowledge base: valid, sourced, evidenced against its current version, not copied", () => {
  assert.deepEqual(checkKnowledge(items, sources), []);
  assert.ok(items.length >= 60, `${items.length} items`);
  for (const k of ["definition", "concept", "fact", "mechanism", "equation", "method", "worked-example", "practical", "dataset", "application", "misconception"]) assert.ok(items.some((x) => x.kind === k), k);
  for (const k of items) {
    assert.equal(evidence[k.id]?.itemHash, itemHash(k), `${k.id}: evidence linked to its current version (run pipeline.mjs evidence)`);
    assert.ok(evidence[k.id].passages.length, `${k.id} has supporting passages`);
    assert.ok(evidence[k.id].overlap.words < 12, `${k.id}: ${evidence[k.id].overlap.words} words in a row from a source it may not adapt`);
  }
  for (const l of Object.keys(LEVELS)) assert.ok(items.map((k) => resolve(k, l)).filter((k) => k?.terms?.some((t) => t.term === "Osmosis")).length <= 1, `one definition of osmosis at ${l}`);
  const retired = load(at("biology/retired.json")).retired;
  for (const [old, r] of Object.entries(retired)) { assert.ok(!byId.has(old), `${old} is retired, never reused`); assert.ok(byId.has(r.replacedBy)); }
  for (const k of items.filter((x) => x.kind === "dataset")) assert.ok(k.data.provenance === "illustrative" || k.data.provenance.length > 10);
});

test("dataset claims are recomputed from the data", () => {
  for (const k of items.filter((x) => x.kind === "dataset")) for (const r of checkDataClaims(k.data)) assert.ok(r.ok, `${k.id}: ${r.claim} (${r.detail})`);
  const test = { x: "a", y: "b", columns: [{ key: "a" }, { key: "b" }], rows: [[1, 2], [2, 4], [3, 6.1], [4, 7.9]], claims: [{ type: "correlation", sign: "negative", strength: "strong" }, { type: "xIntercept", value: 5, tol: 0.1 }] };
  assert.deepEqual(checkDataClaims(test).map((r) => r.ok), [false, false], "a wrong claim fails");
  assert.ok(pearson([[1, 2], [2, 4], [3, 6]]) > 0.999); assert.deepEqual(describeCorrelation(-0.85), { sign: "negative", strength: "strong" }); assert.equal(describeCorrelation(0.1).sign, "none");
  assert.equal(xIntercept(linearFit([[0, 2], [1, 1], [2, 0]])), 2);
});

test("copying is measured as the longest run of shared words", () => {
  assert.equal(longestSharedRun("The cat sat on the mat today", "a cat sat on the mat").words, 5);
  assert.equal(longestSharedRun("Water moves by osmosis.", "Completely different words here.").words, 0);
});

// ---------- questions ----------
test("generated questions: every kind parses in the course engine, answers recompute, same every time", () => {
  const ids = ["bio.osmosis.definition", "bio.membrane.partially-permeable", "bio.osmosis.particle-model", "bio.osmosis.cells", "bio.osmosis.mistake-direction", "bio.osmosis.mistake-energy", "bio.osmosis.mistake-solute-moves", "bio.osmosis.practical-tissue", "bio.osmosis.percent-change", "bio.osmosis.rp-tissue-data", "bio.microscopy.magnification", "bio.microscopy.rearranging", "bio.microscopy.standard-form"];
  const its = ids.map((id) => resolve(byId.get(id), "gcse"));
  const q1 = generateQuestions(its, { slug: "test-q", objectiveOf: () => [1] }), q2 = generateQuestions(its, { slug: "test-q", objectiveOf: () => [1] });
  assert.deepEqual(q1, q2, "deterministic");
  assert.deepEqual([...new Set(q1.map((q) => q.type))].sort(), ["M", "MS", "NUM", "SEQ", "TF"]);
  const L = parseNotes(`## T\n${q1.map((q) => q.line).join("\n")}\n`)[0];
  assert.equal(L.mcq.length + L.tasks.length, q1.length, "every question parses");
  for (const q of q1.filter((x) => x.compute && COMPUTE[x.compute.fn])) { const got = COMPUTE[q.compute.fn](q.compute.inputs); assert.ok(Math.abs(got - q.compute.answer) <= 10 ** -q.compute.dp, `${q.id}: ${got} vs ${q.compute.answer}`); }
  assert.equal(COMPUTE.magnification({ image: { value: 90, unit: "mm" }, real: { value: 60, unit: "µm" } }), 1500);
  assert.equal(COMPUTE.realSize({ image: { value: 30, unit: "mm" }, magnification: 1500 }), 20);
  assert.equal(COMPUTE.convert({ value: 25, from: "µm", to: "m" }), 0.000025);
});

// ---------- diagrams ----------
test("diagram checks catch wrong pictures: osmosis, magnification, and labels outside the picture", async () => {
  const render = await renderer();
  const osm = visualSpec(byId.get("bio.osmosis.particle-model"), "gcse", "test-osm");
  assert.equal(osm.sides[0].label, "dilute solution"); assert.equal(visualSpec(byId.get("bio.osmosis.particle-model"), "alevel", "t").sides[0].label, "higher water potential");
  assert.ok(render(osm).checks.every((c) => c.ok));
  assert.ok(render({ ...osm, claims: [{ type: "net", from: 1, to: 0 }] }).checks.some((c) => !c.ok && /lesson's claim/.test(c.name)));
  assert.ok(render({ ...osm, sizes: { water: 1, solute: 2 } }).checks.some((c) => !c.ok && /doesn't fit/.test(c.name)));
  const mag = visualSpec(byId.get("bio.microscopy.magnification"), "gcse", "test-mag");
  assert.ok(render(mag).checks.every((c) => c.ok));
  assert.ok(render({ ...mag, claims: [{ type: "magnification", value: 15 }] }).checks.some((c) => !c.ok), "forgetting to convert units (×15 not ×1500) fails");
  const cell = visualSpec(byId.get("bio.cells.prokaryotic"), "gcse", "test-cell"), out = render(cell);
  assert.match(out.wide, /single loop of DNA/, "the GCSE form's words, not 'nucleoid'"); assert.deepEqual(labelsOutside(out.wide), []);
  assert.deepEqual(labelsOutside(render({ ...cell, names: { ...cell.names, plasmid: "plasmid (small ring of DNA)" } }).wide), ["plasmid (small ring of DNA)"], "a label running off the picture is caught");
});

test("library diagrams are chosen only when they fit the topic and level", () => {
  const its = (ids, l) => ids.map((id) => resolve(byId.get(id), l));
  const g = selectLibraryDiagrams("osmosis cells solution water", "gcse", its(["bio.osmosis.definition", "bio.osmosis.cells"], "gcse"), items, { subject: "biology", main: "osmosis" });
  assert.equal(g.find((d) => d.id === "bio-osmosis-cells")?.usable, false); assert.match(g.find((d) => d.id === "bio-osmosis-cells").reason, /water potential.*beyond GCSE/);
  const u = selectLibraryDiagrams("prokaryote nucleoid plasmid cell wall ribosomes", "ug", its(["bio.cells.prokaryotic", "bio.cells.bacterial-dna"], "ug"), items, { subject: "biology", main: "prokaryotes" });
  assert.equal(u.find((d) => d.id === "bio-prokaryotic-cell")?.usable, true);
});

// ---------- retrieval ----------
test("retrieval: each kind of requirement gets its own kind of lesson", () => {
  const req = (level, statementKind, text, sectionTitle) => ({ id: "test", level, text, sectionTitle, statementKind });
  const content = retrieve(req("gcse", "content", "Water moves across cell membranes by osmosis through a partially permeable membrane.", "Osmosis"), items).items.map((x) => x.id);
  assert.ok(content.includes("bio.osmosis.definition") && !content.some((id) => /practical|percent|rp-tissue/.test(id)), "a content statement's lesson doesn't pull in the practical");
  const practical = retrieve(req("gcse", "practical", "investigate the effect of a range of concentrations of salt or sugar solutions on the mass of plant tissue.", "Osmosis"), items);
  assert.ok(practical.items.some((x) => x.id === "bio.osmosis.practical-tissue")); assert.ok(practical.prior.some((x) => x.id === "bio.osmosis.definition"), "the theory is prior knowledge in the practical");
  const skill = retrieve(req("gcse", "skill", "use a scatter diagram to identify a correlation between two variables in terms of risk factors.", "The effect of lifestyle on some non-communicable diseases"), items).items.map((x) => x.id);
  assert.ok(skill.includes("bio.disease.waist-bp-data") && skill.includes("bio.data.correlation"));
  const ug = retrieve(req("ug", "content", "Water moves across cell membranes by osmosis through a partially permeable membrane.", "Osmosis"), items);
  const gc = retrieve(req("gcse", "content", "Water moves across cell membranes by osmosis through a partially permeable membrane.", "Osmosis"), items);
  assert.ok(gc.excludedAboveLevel.includes("bio.water-potential.concept"), "deeper knowledge is recorded for 'where this leads'");
  assert.deepEqual(ug.excludedAboveLevel, [], "nothing on osmosis is beyond university level");
});

// ---------- the batch ----------
test("the validation batch: five kinds of AQA requirement and three university reuses, all through QA to expert review", () => {
  assert.equal(batch.length, 9);
  for (const { id, type } of batch) {
    const { lesson, notes } = lessonFor(id);
    assert.ok(lesson, `${id} (${type}) is built`);
    assert.deepEqual(checkLesson(lesson), [], id);
    assert.equal(lesson.qa.result, "pass", `${id}: automated QA`); assert.equal(lesson.qa.fails, 0);
    assert.equal(lesson.status, "expert-review", `${id}: waits for a person`);
    assert.deepEqual(lesson.history.map((h) => h.status), ["generated", "automated-qa", "expert-review"]);
    assert.equal(lesson.review.approvedBy, null);
    const L = parseNotes(notes)[0];
    assert.equal(L.mcq.length + L.tasks.length, lesson.questions.length, `${id}: every question parses`);
    assert.ok(lesson.assets.length >= 1, `${id}: a diagram`);
    assert.ok(lesson.knowledge.every((k) => k.formHash && k.form), "each item recorded with its level form");
  }
  const kinds = Object.fromEntries(batch.map(({ id }) => [id, lessonFor(id).lesson]));
  // a genuine practical
  const P = kinds["aqa-gcse-biology:4.1.3.2.RP3"], Pn = lessonFor("aqa-gcse-biology:4.1.3.2.RP3").notes;
  assert.equal(P.template, "gcse-practical");
  for (const h of ["Aim", "Equipment", "Variables", "Method", "Safety", "Recording results", "Analysing results", "Evaluating the investigation"]) assert.ok(Pn.includes(`H: ${h}`), h);
  assert.ok(P.questions.some((q) => q.type === "SEQ") && P.questions.some((q) => q.type === "MS"), "method order and control variables are assessed");
  assert.ok(P.assets.some((a) => a.renderer === "graph")); assert.match(Pn, /illustrative data/i);
  // a calculation with recomputed answers
  const C = kinds["aqa-gcse-biology:4.1.1.5.c"];
  assert.ok(C.questions.filter((q) => q.compute).length >= 3); assert.ok(C.assets.some((a) => a.renderer === "magnification"));
  // data interpretation with data and reasoning
  const D = kinds["aqa-gcse-biology:4.2.2.6.h"], Dn = lessonFor("aqa-gcse-biology:4.2.2.6.h").notes;
  assert.equal(D.assets.filter((a) => a.renderer === "graph").length, 2); assert.ok(D.questions.some((q) => q.data)); assert.ok(D.questions.some((q) => q.compute?.fn === "fitAt"));
  assert.match(Dn, /TF2#[^:]+: These data show that a larger waist causes/, "correlation is not causation, assessed");
  // a mechanism, with its steps assessed in order
  assert.ok(kinds["aqa-gcse-biology:4.2.2.1.e"].questions.some((q) => q.type === "SEQ"));
  // reuse: university lessons take the same items in their own forms, with library diagrams
  for (const [g, u] of [["aqa-gcse-biology:4.1.1.1.b", "gradify-biology:u02-02"], ["aqa-gcse-biology:4.2.2.1.e", "gradify-biology:u03-24"], ["aqa-gcse-biology:4.1.3.2.a", "gradify-biology:u02-21"]]) {
    const G = kinds[g], U = kinds[u], shared = G.knowledge.filter((k) => U.knowledge.some((x) => x.id === k.id));
    assert.ok(shared.length >= 3, `${g} and ${u} share ${shared.length} items`);
    assert.ok(shared.some((k) => U.knowledge.find((x) => x.id === k.id).formHash !== k.formHash), "and some read differently at each level");
    assert.ok(U.assets.some((a) => a.origin === "library")); assert.ok(G.assets.some((a) => a.origin === "generated"));
  }
});

test("rebuilding is deterministic: the university lessons reassemble to the committed notes", async () => {
  for (const id of ["gradify-biology:u02-21", "gradify-biology:u02-02", "gradify-biology:u03-24"]) assert.equal((await assemble(id)).notes, lessonFor(id).notes, id);
});

test("rebuilding every AQA lesson gives the committed notes and passes QA", { skip: !AQA && "AQA text not imported here" }, async () => {
  for (const { id } of batch.filter((x) => x.id.startsWith("aqa"))) { const a = await assemble(id); assert.equal(a.notes, lessonFor(id).notes, id); assert.equal(qa(a).result, "pass", id); }
});

// ---------- QA, lifecycle, impact ----------
test("QA fails a lesson that's wrong, and the lifecycle can't skip review", async () => {
  const a = await assemble("gradify-biology:u02-21");
  const bad = structuredClone(a); bad.lesson.questions.find((q) => q.compute).compute.answer += 10;
  assert.equal(qa(bad).dimensions.accuracy.status, "fail");
  const deep = structuredClone(a); deep.lesson.level = "gcse"; deep.lesson.template = "gcse-science";
  assert.equal(qa(deep).dimensions.depth.status, "fail");
  const untested = structuredClone(a); untested.lesson.objectives.push("Explain something no question asks about");
  assert.equal(qa(untested).dimensions.assessment.status, "fail");
  const noSrc = structuredClone(a); noSrc.notes = noSrc.notes.split("\n").filter((l) => !l.startsWith("SRC: OpenStax")).join("\n");
  assert.equal(qa(noSrc).dimensions.sources.status, "fail");
  const l = structuredClone(a.lesson); advance(l, qa(a), a.notes); assert.equal(l.status, "expert-review");
  // approval is of the notes QA checked: edited notes can't be approved until QA runs on them
  assert.throws(() => review(structuredClone(l), { approve: true, by: "A. Reviewer", notes: `${a.notes}\nP: an unchecked addition` }), /aren't the ones that passed automated QA/);
  assert.throws(() => review(structuredClone(l), { approve: true }), /reviewer's name/);
  assert.throws(() => review(structuredClone(l), { approve: false, by: "A. Reviewer" }), /needs a note/);
  const ok = review(structuredClone(l), { approve: true, by: "A. Reviewer", notes: a.notes }); assert.equal(ok.status, "approved"); assert.deepEqual(checkLesson(ok), []);
  const failed = structuredClone(a.lesson); advance(failed, qa(bad)); assert.equal(failed.status, "generated");
  assert.ok(!NEXT.generated.includes("published") && !NEXT["automated-qa"].includes("approved"));
});

test("QA holds a practical to being a practical", { skip: !AQA && "AQA text not imported here" }, async () => {
  const a = await assemble("aqa-gcse-biology:4.1.3.2.RP3"), r = qa(a);
  for (const re of [/five steps/, /control variables/, /safety/, /results table/, /calculation and a graph/, /errors and improvements/]) assert.ok(r.dimensions.coverage.checks.some((c) => re.test(c.name) && c.ok), String(re));
  // a "practical" without its results graph and without method questions is not a practical lesson
  const thin = structuredClone(a); thin.lesson.assets = []; thin.lesson.questions = thin.lesson.questions.filter((q) => !["MS", "SEQ"].includes(q.type) && !/variable/.test(q.line || ""));
  const t = qa(thin);
  assert.equal(t.dimensions.coverage.status, "fail"); assert.ok(t.dimensions.coverage.checks.some((c) => /graph/.test(c.name) && !c.ok));
  assert.equal(t.dimensions.visuals.status, "fail", "the template requires a visual");
});

test("impact: a correction finds every lesson built from that form; retired ids are reported as replaced", () => {
  const lessons = batch.map(({ id }) => lessonFor(id).lesson);
  assert.deepEqual(impact(lessons, "biology"), [], "everything is current");
  const sharedId = "bio.osmosis.definition";
  const users = lessons.filter((l) => l.knowledge.some((k) => k.id === sharedId));
  const edited = users.map((l) => ({ ...l, knowledge: l.knowledge.map((k) => (k.id === sharedId ? { ...k, formHash: "0000000000000000" } : k)) }));
  assert.deepEqual(impact(edited, "biology").map((x) => x.lesson).sort(), users.map((l) => l.id).sort());
  const old = [{ ...lessons[0], knowledge: [{ id: "bio.osmosis.definition-solutions", version: 1, hash: "x", formHash: "x" }] }];
  assert.match(impact(old, "biology")[0].why[0], /replaced by bio.osmosis.definition/);
  const spec = [{ ...lessons[0], requirement: { ...lessons[0].requirement, hash: "ffffffffffffffff" } }];
  assert.match(impact(spec, "biology")[0].why.at(-1), /text changed/);
});

test("the production report measures knowledge coverage per statement", { skip: !AQA && "AQA text not imported here" }, () => {
  const st = (ref) => load(statementsPath("aqa-gcse-biology")).statements.find((x) => x.ref === ref);
  const osm = knowledgeFor({ ...st("4.1.3.2.a"), title: "Osmosis" }, "gcse", items);
  assert.ok(osm.complete && osm.relevant);
  const measles = knowledgeFor({ ...st("4.3.1.2.a"), title: "Viral diseases" }, "gcse", items);
  assert.ok(!measles.complete && measles.missing.some((w) => w.startsWith("measl")), "a topic with no knowledge yet is reported as missing");
  const rp = knowledgeFor({ ...st("4.1.3.2.RP3"), title: "Osmosis" }, "gcse", items);
  assert.ok(rp.complete, "the practical has its practical item");
  const data = load(at("production/aqa-gcse-biology.json"));
  assert.equal(data.statements, 475); assert.ok(data.complete >= 6 && data.relevant >= data.complete); assert.equal(data.lessons.generated, 6); assert.equal(data.lessons.approved, 0);
  assert.ok(data.gate.every((g) => !g.publishable), "nothing is publishable before review");
});

test("readability is measured", () => {
  assert.ok(fkGrade("The cat sat. The dog ran.") < 3);
  assert.ok(fkGrade("Osmotic equilibration necessitates consideration of hydrostatic and solute potential contributions.") > 15);
});
