// The knowledge engine (kit/knowledge/, scripts/knowledge/, the osmosisbox renderer): templates, schema and
// licences, the Biology knowledge base and its evidence, question generation, retrieval, the two assembled lessons,
// QA, lifecycle and impact. Requirements and items marked "test" are WRITTEN FOR THE TESTS.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { TEMPLATES, LEVELS, templateFor, inRange, depthOf } from "../kit/knowledge/templates.js";
import { checkSource, checkKnowledge, checkLesson, policyOf, LICENCES, NEXT } from "../kit/knowledge/schema.js";
import { generateQuestions, COMPUTE } from "../kit/knowledge/questions.js";
import { loadKnowledge, loadSources, load, at, itemHash, longestSharedRun } from "../scripts/knowledge/lib.mjs";
import { retrieve, assemble, visualSpec, selectLibraryDiagrams } from "../scripts/knowledge/assemble.mjs";
import { qa, advance, review, impact, fkGrade } from "../scripts/knowledge/qa.mjs";
import { parseNotes } from "../kit/course/notes.js";
import { statementsPath } from "../scripts/curriculum/engine.mjs";
import "../kit/diagrams/bio-renderers-2.js";
import { render } from "../kit/diagrams/renderers.js";

const items = loadKnowledge("biology"), sources = loadSources(), byId = new Map(items.map((k) => [k.id, k]));
const GCSE = "kb-aqa8461-4-1-3-2-a-gcse", UG = "kb-gradify-bio-u02-21-ug";
const lessonOf = (id) => ({ lesson: load(at(`lessons/${id}/lesson.json`)), notes: readFileSync(at(`lessons/${id}/notes.txt`), "utf8") });

test("templates: one for every level from primary to postgraduate, chosen by level and subject", () => {
  for (const l of Object.keys(LEVELS)) assert.ok(templateFor(l, "biology"), l);
  assert.equal(templateFor("gcse", "biology").id, "gcse-science"); assert.equal(templateFor("nat5", "chemistry").id, "gcse-science");
  assert.equal(templateFor("ug", "biology").id, "ug-science"); assert.equal(templateFor("advhigher", "physics").id, "alevel-science");
  assert.throws(() => templateFor("gcse", "law"), /no lesson template/);
  for (const [id, t] of Object.entries(TEMPLATES)) {
    for (const r of ["objectives", "terms", "practice", "summary"]) assert.ok(t.components.some((c) => c.id === r && c.required), `${id} requires ${r}`);
    assert.ok(t.questions.min >= 3 && t.readability[0] < t.readability[1], id);
  }
  assert.notDeepEqual(TEMPLATES["gcse-science"].components.map((c) => c.id), TEMPLATES["pg-science"].components.map((c) => c.id), "levels differ in structure, not only in look");
  assert.ok(inRange({ from: "ks3", to: "gcse" }, "nat5")); assert.ok(!inRange({ from: "alevel" }, "gcse")); assert.equal(depthOf(TEMPLATES["gcse-science"]), 3);
});

test("licences: only text Gradify may adapt commercially is reusable; the rest is for checking facts", () => {
  assert.equal(policyOf("CC-BY-4.0"), "reuse"); assert.equal(policyOf("CC0-1.0"), "reuse"); assert.equal(policyOf("OGL-3.0"), "reuse");
  for (const l of ["CC-BY-NC-SA-4.0", "CC-BY-NC-4.0", "CC-BY-SA-4.0", "CC-BY-ND-4.0", "all-rights-reserved"]) assert.equal(policyOf(l), "verify-only", l);
  assert.equal(policyOf("unknown"), "verify-only", "an unknown licence is never reused");
  for (const [k, v] of Object.entries(LICENCES)) if (!v.reuse) assert.ok(v.why, `${k} says why`);
});

test("source records: provenance, licence and policy; no text from a verify-only source in the repository", () => {
  for (const s of Object.values(sources)) assert.deepEqual(checkSource(s), [], s.id);
  const ox = sources["openstax-biology-2e-5-2"];
  assert.equal(ox.licence, "CC-BY-NC-SA-4.0"); assert.equal(ox.policy, "verify-only");
  assert.match(ox.url, /\/[0-9a-f]{40}\/modules\/m66374\//, "pinned to a commit"); assert.match(ox.sha256, /^[0-9a-f]{64}$/);
  assert.ok(ox.passages.every((p) => !p.text && /^[0-9a-f]{16}$/.test(p.hash)));
  assert.equal(sources["gradify-biology-u02-21"].policy, "reuse");
  const bad = { ...ox, policy: "reuse", passages: [{ id: "x", hash: "0", text: "copied" }] };
  const p = checkSource(bad);
  assert.ok(p.some((x) => /policy must be verify-only/.test(x))); assert.ok(checkSource({ ...ox, passages: [{ id: "x", text: "copied" }] }).some((x) => /must not be stored/.test(x)));
  assert.ok(checkSource({ ...ox, licence: "made-up" }).some((x) => /unknown licence/.test(x)));
});

test("the Biology knowledge base: valid, sourced, evidenced against its current text, and not copied", () => {
  assert.deepEqual(checkKnowledge(items, sources), []);
  assert.ok(items.length >= 20);
  const ev = load(at("biology/evidence.json")).items;
  for (const k of items) {
    assert.equal(ev[k.id]?.itemHash, itemHash(k), `${k.id}: evidence linked to its current version (run pipeline.mjs evidence)`);
    assert.ok(ev[k.id].passages.length, `${k.id} has supporting passages`);
    assert.ok(ev[k.id].overlap.words < 12, `${k.id} shares ${ev[k.id].overlap.words} words in a row with a verify-only source`);
  }
  // the same idea at different depths: one definition to GCSE, another from A level, never both at one level
  for (const l of Object.keys(LEVELS)) assert.ok(items.filter((k) => k.terms?.some((t) => t.term === "Osmosis") && inRange(k.level, l)).length <= 1, `one definition of osmosis at ${l}`);
  const bad = [{ id: "Bad id", kind: "nope", title: "", level: { from: "gcse", to: "ks3" }, version: 0, status: "done", concepts: [], sources: [{ source: "nowhere" }], prereqs: ["bio.none"] }, { ...items[0] }, { ...items[0] }];
  const p = checkKnowledge(bad, sources);
  for (const re of [/id must look like/, /unknown kind/, /level runs backwards/, /version/, /status/, /concept tag/, /unknown source/, /unknown item/, /duplicate id/]) assert.ok(p.some((x) => re.test(x)), String(re));
});

test("copying is measured as the longest run of shared words", () => {
  assert.equal(longestSharedRun("The cat sat on the mat today", "a cat sat on the mat").words, 5);
  assert.equal(longestSharedRun("Water moves by osmosis.", "Completely different words here.").words, 0);
});

test("generated questions: parsed by the course engine, answers recomputed, objectives tagged, same every time", () => {
  const its = ["bio.osmosis.definition-solutions", "bio.membrane.partially-permeable", "bio.osmosis.particle-model", "bio.osmosis.cells", "bio.osmosis.percent-change", "bio.osmosis.mistake-direction", "bio.osmosis.mistake-energy", "bio.osmosis.mistake-solute-moves"].map((id) => byId.get(id));
  const q1 = generateQuestions(its, { slug: "test-q", objectiveOf: () => [1] }), q2 = generateQuestions(its, { slug: "test-q", objectiveOf: () => [1] });
  assert.deepEqual(q1, q2, "deterministic");
  assert.deepEqual([...new Set(q1.map((q) => q.type))].sort(), ["M", "NUM", "TF"]);
  const L = parseNotes(`## T\n${q1.map((q) => q.line).join("\n")}\n`)[0];
  assert.equal(L.mcq.length + L.tasks.length, q1.length, "every question parses");
  for (const q of q1.filter((x) => x.compute)) assert.equal(Math.round(COMPUTE[q.compute.fn](q.compute.inputs) * 10) / 10, q.compute.answer);
  for (const m of L.mcq) assert.equal(new Set([m.right, ...m.wrong]).size, 1 + m.wrong.length, "distinct options");
  assert.equal(COMPUTE.percentChange({ initial: 2.5, final: 2.8 }).toFixed(6), (12).toFixed(6)); assert.equal(COMPUTE.waterPotential({ psiS: -750, psiP: 250 }), -500);
});

test("the osmosisbox diagram's checks catch a wrong picture", () => {
  const spec = visualSpec(byId.get("bio.osmosis.particle-model"), "gcse", "test-osmosis");
  assert.equal(spec.sides[0].label, "dilute solution"); assert.equal(visualSpec(byId.get("bio.osmosis.particle-model"), "alevel", "t").sides[0].label, "higher water potential", "labels follow the level");
  assert.equal(visualSpec(byId.get("bio.osmosis.particle-model"), "ug", "t"), null, "no brief for a level it doesn't cover");
  const ok = render(spec); assert.ok(ok.checks.every((c) => c.ok)); assert.match(ok.wide, /role="img"/); assert.match(ok.narrow, /viewBox="0 0 380/);
  const backwards = render({ ...spec, claims: [{ type: "net", from: 1, to: 0 }] });
  assert.ok(backwards.checks.some((c) => !c.ok && /lesson's claim/.test(c.name)), "a lesson claiming the wrong direction fails");
  const leaky = render({ ...spec, sizes: { water: 1, solute: 2 } });
  assert.ok(leaky.checks.some((c) => !c.ok && /doesn't fit through a pore/.test(c.name)), "a solute small enough to cross fails");
  const equal = render({ ...spec, sides: [{ ...spec.sides[0], water: 8, solute: 4 }, { ...spec.sides[1], water: 8, solute: 4 }] });
  assert.ok(equal.checks.some((c) => !c.ok), "no gradient, no net movement to show");
});

test("retrieval: the same knowledge base gives each level its own depth", () => {
  const req = (level) => ({ id: "test", level, text: "Water moves across cell membranes by osmosis through a partially permeable membrane.", sectionTitle: "Osmosis", statementKind: "content" });
  const g = retrieve(req("gcse"), items), u = retrieve(req("ug"), items), gi = g.items.map((x) => x.id), ui = u.items.map((x) => x.id);
  assert.ok(gi.includes("bio.osmosis.definition-solutions") && !gi.includes("bio.osmosis.definition-water-potential"));
  assert.ok(ui.includes("bio.osmosis.definition-water-potential") && !ui.includes("bio.osmosis.definition-solutions"));
  assert.ok(!gi.some((id) => byId.get(id).level.from === "ug" || byId.get(id).level.from === "alevel"), "nothing above GCSE");
  assert.ok(g.excludedAboveLevel.includes("bio.water-potential.concept"));
  assert.ok(gi.filter((id) => ui.includes(id)).length >= 3, "shared knowledge is reused, not copied");
  assert.ok(!gi.includes("bio.osmosis.practical-tissue"), "a content statement's lesson doesn't pull in another statement's practical");
});

test("library diagrams are chosen only when they fit the level", () => {
  const its = (ids) => ids.map((id) => byId.get(id));
  const gcse = selectLibraryDiagrams("osmosis cells solution water", "gcse", its(["bio.osmosis.definition-solutions", "bio.osmosis.cells"]), items, { subject: "biology", main: "osmosis" });
  assert.equal(gcse.find((d) => d.id === "bio-osmosis-cells")?.usable, false); assert.match(gcse.find((d) => d.id === "bio-osmosis-cells").reason, /water potential, beyond GCSE/);
  const ug = selectLibraryDiagrams("osmosis cells solution water potential", "ug", its(["bio.osmosis.definition-water-potential", "bio.water-potential.concept", "bio.osmosis.cells", "bio.osmosis.tonicity"]), items, { subject: "biology", main: "osmosis" });
  assert.equal(ug.find((d) => d.id === "bio-osmosis-cells")?.usable, true);
});

test("the two assembled lessons: one AQA statement at GCSE, one Gradify lesson at university, from shared knowledge", () => {
  const g = lessonOf(GCSE), u = lessonOf(UG);
  for (const { lesson } of [g, u]) {
    assert.deepEqual(checkLesson(lesson), []);
    assert.equal(lesson.status, "expert-review", "waiting for a person; nothing approved or published");
    assert.equal(lesson.qa.result, "pass"); assert.equal(lesson.qa.fails, 0);
    assert.deepEqual(lesson.history.map((h) => h.status), ["generated", "automated-qa", "expert-review"]);
    assert.equal(lesson.review.approvedBy, null);
    assert.ok(lesson.review.flagged.some((f) => /drafts/.test(f)), "draft knowledge is flagged to the reviewer");
  }
  assert.equal(g.lesson.requirement.id, "aqa-gcse-biology:4.1.3.2.a"); assert.equal(g.lesson.template, "gcse-science"); assert.equal(u.lesson.template, "ug-science");
  const gk = new Map(g.lesson.knowledge.map((k) => [k.id, k.hash])), shared = u.lesson.knowledge.filter((k) => gk.get(k.id) === k.hash);
  assert.ok(shared.length >= 3, `${shared.length} knowledge items shared, same version`);
  assert.ok(g.lesson.knowledge.every((k) => !["alevel", "ug"].includes(byId.get(k.id).level.from)));
  assert.ok(g.lesson.assets.some((a) => a.origin === "generated" && a.checks.every((c) => c.ok)));
  assert.ok(u.lesson.assets.some((a) => a.origin === "library" && a.id === "bio-osmosis-cells"));
  for (const a of g.lesson.assets.filter((x) => x.origin === "generated")) for (const f of [`${a.id}.json`, `${a.id}.wide.svg`, `${a.id}.narrow.svg`]) assert.ok(existsSync(at(`lessons/${GCSE}/assets/${f}`)), f);
  const L = parseNotes(g.notes)[0];
  assert.equal(L.title, "Osmosis"); assert.ok(L.objectives.length >= 3 && L.terms.length >= 5 && L.mcq.length >= 5);
  assert.ok(!/water potential/i.test(g.notes.split("H: Where this leads")[0]), "no water potential before 'where this leads' in a GCSE lesson");
  assert.match(u.notes, /ψ = ψs \+ ψp/);
  assert.ok(L.sources.some((s) => /OpenStax/.test(s.cite) && /not reproduced/.test(s.cite)), "attribution, and how the source was used");
});

test("rebuilding is deterministic: the university lesson reassembles to exactly the committed notes", async () => {
  const a = await assemble("gradify-biology:u02-21");
  assert.equal(a.notes, lessonOf(UG).notes);
});

test("rebuilding the GCSE lesson from the AQA statement gives the committed notes", { skip: !existsSync(statementsPath("aqa-gcse-biology")) && "AQA text not imported here" }, async () => {
  const a = await assemble("aqa-gcse-biology:4.1.3.2.a");
  assert.equal(a.notes, lessonOf(GCSE).notes);
  assert.equal(qa(a).result, "pass");
});

test("QA fails a lesson that's wrong, and the lifecycle can't skip review", async () => {
  const a = await assemble("gradify-biology:u02-21");
  // a wrong computed answer
  const bad = structuredClone(a); bad.lesson.questions.find((q) => q.compute).compute.answer += 10;
  assert.equal(qa(bad).dimensions.accuracy.status, "fail");
  // a term above the level
  const deep = structuredClone(a); deep.lesson.level = "gcse"; deep.lesson.template = "gcse-science";
  assert.equal(qa(deep).dimensions.depth.status, "fail");
  // an objective nothing tests
  const untested = structuredClone(a); untested.lesson.objectives.push("Explain something no question asks about");
  assert.equal(qa(untested).dimensions.assessment.status, "fail");
  // missing attribution
  const noSrc = structuredClone(a); noSrc.notes = noSrc.notes.split("\n").filter((l) => !l.startsWith("SRC: OpenStax")).join("\n");
  assert.equal(qa(noSrc).dimensions.sources.status, "fail");
  // lifecycle
  const l = structuredClone(a.lesson); advance(l, qa(a));
  assert.equal(l.status, "expert-review");
  assert.throws(() => review(structuredClone(l), { approve: true }), /reviewer's name/);
  assert.throws(() => review(structuredClone(l), { approve: false, by: "A. Reviewer" }), /needs a note/);
  const ok = review(structuredClone(l), { approve: true, by: "A. Reviewer" });
  assert.equal(ok.status, "approved"); assert.deepEqual(checkLesson(ok), []);
  const failed = structuredClone(a.lesson); advance(failed, qa(bad)); assert.equal(failed.status, "generated", "a failed lesson goes back for revision");
  assert.ok(checkLesson({ ...ok, status: "published", history: [...ok.history, { status: "published" }], review: { ...ok.review, approvedBy: null } }).some((p) => /approval/.test(p)));
  assert.ok(!NEXT.generated.includes("published") && !NEXT["automated-qa"].includes("approved"));
});

test("impact: a corrected knowledge item finds every lesson built from it", () => {
  const lessons = [lessonOf(GCSE).lesson, lessonOf(UG).lesson];
  assert.deepEqual(impact(lessons, "biology"), [], "everything is current");
  const sharedId = lessons[0].knowledge.find((k) => lessons[1].knowledge.some((x) => x.id === k.id)).id;
  const edited = lessons.map((l) => ({ ...l, knowledge: l.knowledge.map((k) => (k.id === sharedId ? { ...k, hash: "0000000000000000" } : k)) }));
  const r = impact(edited, "biology");
  assert.deepEqual(r.map((x) => x.lesson).sort(), [GCSE, UG].sort()); assert.ok(r.every((x) => x.why.some((w) => w.includes(sharedId))));
  const spec = [{ ...lessons[0], requirement: { ...lessons[0].requirement, hash: "ffffffffffffffff" } }];
  assert.match(impact(spec, "biology")[0].why[0], /text changed/, "a changed specification statement is caught too");
});

test("readability is measured", () => {
  assert.ok(fkGrade("The cat sat. The dog ran.") < 3);
  assert.ok(fkGrade("Osmotic equilibration necessitates consideration of hydrostatic and solute potential contributions.") > 15);
});
