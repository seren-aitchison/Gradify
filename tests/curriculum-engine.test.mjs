// The curriculum knowledge engine (kit/curriculum/engine.js) over the real knowledge base and the real lessons.
// The two acceptance tests of the first milestone (docs/CURRICULUM-ARCHITECTURE.md §8) are marked ACCEPTANCE.
import test from "node:test";
import assert from "node:assert/strict";
import { KB } from "../kit/curriculum/knowledge.js";
import { validate, coverage, impact, consistency, summary, pathwaysFor, lessonsFor, bindingState, dependents } from "../kit/curriculum/engine.js";
import { checkConcept, CONCEPT_ID } from "../kit/curriculum/schema.js";
import { loadLessons, coursesIn } from "../scripts/curriculum.mjs";

const lessons = await loadLessons(coursesIn(KB));
const OSMOSIS = "BIO-CELL-OSMOSIS-001";
// a deep copy with one concept changed, as a reviewer's edit would change it
const withConcept = (id, f) => { const kb = structuredClone(KB); f(kb.concepts.find((c) => c.id === id)); return kb; };
const deepFreeze = (o) => { if (o && typeof o === "object" && !Object.isFrozen(o)) { Object.freeze(o); Object.values(o).forEach(deepFreeze); } return o; };

test("the knowledge base is valid against the schema, the coverage registry and the real lessons", () => {
  assert.deepEqual(validate(KB, lessons), []);
});

test("every bound lesson exists and its recorded hash is the lesson's current one", () => {
  for (const b of KB.lessonMaps) {
    const L = lessons.get(`${b.course}/${b.lesson}`);
    assert.ok(L, `${b.course}/${b.lesson} has written notes`);
    assert.equal(b.checked.lessonHash, L.hash, `${b.course}/${b.lesson}: run node scripts/curriculum.mjs hash ${b.course}/${b.lesson}`);
    assert.equal(bindingState(KB, b, lessons).state, "current");
  }
});

test("nothing claims more than its evidence: unchecked specifications, unconfirmed bindings, concepts awaiting review", () => {
  for (const s of KB.specs) assert.equal(s.checked, null, `${s.id} is marked checked: add who checked it and when, against which published version`);
  for (const m of KB.outcomeMaps) assert.notEqual(m.claim, "verified");
  for (const c of KB.concepts) { assert.ok(["draft", "needs_review"].includes(c.review.status) || c.review.by); for (const s of c.sources) assert.equal(s.checked ?? null, null); }
});

test("ACCEPTANCE 1: one canonical osmosis record serves several pathways without duplicating its knowledge", () => {
  // exactly one record holds the knowledge
  assert.equal(KB.concepts.filter((c) => /osmosis/i.test(c.title)).length, 1);
  assert.match(OSMOSIS, CONCEPT_ID);
  const p = pathwaysFor(KB, OSMOSIS);
  const specs = new Set(p.map((x) => x.spec)), quals = new Set(p.map((x) => x.qualification)), bands = new Set(p.map((x) => x.band));
  assert.deepEqual([...specs].sort(), ["aqa-7402", "aqa-8461", "aqa-8464"]);
  assert.deepEqual([...quals].sort(), ["a-level", "gcse"]);
  assert.deepEqual([...bands].sort(), ["post-16", "upper-secondary"]);
  // and the lessons of three courses, each in its own words, point at it
  assert.deepEqual([...new Set(lessonsFor(KB, OSMOSIS).map((b) => b.course))].sort(), ["biology", "chemistry", "physics"]);
  // the depth differs by band: GCSE works with dilute and concentrated solutions, water potential is beyond it
  const c = KB.concepts.find((x) => x.id === OSMOSIS);
  assert.ok(c.levels["upper-secondary"].beyond.includes("water potential"));
  assert.ok(c.levels["post-16"].terms.includes("water potential"));
  // Key Stage 3 asks for diffusion, not osmosis, so osmosis is not on that pathway
  assert.ok(!p.some((x) => x.spec === "dfe-ks3-science"));
  assert.ok(pathwaysFor(KB, "BIO-CELL-DIFFUSION-001").some((x) => x.spec === "dfe-ks3-science"));
});

test("ACCEPTANCE 2: improving the canonical concept flags every affected lesson and changes none of them", () => {
  const before = structuredClone(KB.lessonMaps), lessonSnapshot = new Map([...lessons].map(([k, v]) => [k, { ...v }]));
  const kb = deepFreeze(withConcept(OSMOSIS, (c) => {
    c.version = 2;
    c.explanation += " Aquaporins can be opened and closed, so cells regulate their water permeability.";
    c.changelog.push({ version: 2, date: "2026-12-01", change: "Added how cells regulate aquaporins." });
  }));
  assert.deepEqual(validate(kb, lessons), []);
  const im = impact(kb, OSMOSIS, lessons);
  // every osmosis lesson needs review, with the reason and the change
  assert.deepEqual(im.lessons.map((l) => `${l.course}/${l.lesson}`).sort(), ["biology/u02-21", "chemistry/u05-17", "physics/u34-05"]);
  for (const l of im.lessons) {
    assert.equal(l.state, "concept-changed");
    assert.match(l.reasons[0], /version 1 → 2/);
    assert.match(l.reasons[0], /regulate aquaporins/);
    assert.match(l.action, /adapt the lesson only if/);
  }
  // the pathways that depend on it are reported too
  assert.equal(new Set(im.pathways.map((p) => p.spec)).size, 3);
  // lessons bound to other concepts are untouched by this change
  for (const b of kb.lessonMaps.filter((x) => x.concept !== OSMOSIS)) assert.equal(bindingState(kb, b, lessons).state, "current");
  // nothing was overwritten: the bindings and the lessons are exactly as they were (and kb was frozen throughout)
  assert.deepEqual(KB.lessonMaps, before);
  for (const [k, v] of lessons) assert.deepEqual(v, lessonSnapshot.get(k));
  assert.equal(summary(kb, lessons).bindingsNeedReview, 3);
});

test("a lesson edited after its binding was checked is flagged for re-confirmation", () => {
  const edited = new Map(lessons); const L = edited.get("biology/u02-21");
  edited.set("biology/u02-21", { ...L, text: L.text + "\nP: A new paragraph.", hash: "000000000000" });
  const b = KB.lessonMaps.find((x) => x.lesson === "u02-21");
  assert.equal(bindingState(KB, b, edited).state, "lesson-changed");
});

test("coverage tells covered, partial, above-level, gaps and pathways no course offers apart", () => {
  const status = (spec) => Object.fromEntries(coverage(KB, spec, lessons).outcomes.map((o) => [o.outcome.id, o.status]));
  // A level: SciGradify Biology teaches all four at post-16; the required practical has no lesson
  assert.deepEqual(status("aqa-7402"), { "3.2.3-membrane": "covered", "3.2.3-diffusion": "covered", "3.2.3-osmosis": "covered", "3.2.3-active": "covered", "rp-water-potential": "gap" });
  // GCSE Biology via SciGradify Biology: taught, but pitched at A level
  assert.equal(status("aqa-8461")["4.1.3.2"], "above-level");
  // GCSE Combined Science via GCSE Core: diffusion applied at the alveoli only, and no osmosis or active transport lesson
  assert.deepEqual(status("aqa-8464"), { "4.1.3.1": "partial", "4.1.3.2": "gap", "4.1.3.3": "gap", "rp-osmosis": "gap" });
  // Key Stage 3: modelled, but no course offers it
  assert.ok(Object.values(status("dfe-ks3-science")).every((s) => s === "no-course"));
});

test("terminology: a variant is flagged as editorial only where exam wording matters, never as an error", () => {
  // the real lessons: chemistry says "semipermeable", which is right for undergraduate chemistry, so no finding
  assert.ok(!consistency(KB, lessons).some((f) => f.kind === "terminology"));
  assert.ok(!consistency(KB, lessons).some((f) => f.severity === "error"));
  // bound at upper secondary instead, the same lesson would be flagged, as an editorial suggestion
  const kb = structuredClone(KB); kb.lessonMaps.find((b) => b.lesson === "u05-17").band = "upper-secondary";
  const f = consistency(kb, lessons).filter((x) => x.kind === "terminology");
  assert.equal(f.length, 1);
  assert.equal(f[0].severity, "editorial");
  assert.equal(f[0].prefer, "partially permeable");
});

test("the validator catches unknown references, cycles, unsupported claims and missing lessons", () => {
  const kb = structuredClone(KB);
  kb.concepts.find((c) => c.id === "BIO-CELL-DIFFUSION-001").prerequisites.push(OSMOSIS);          // cycle
  kb.concepts.find((c) => c.id === OSMOSIS).related.push("BIO-CELL-NOPE-001");                       // unknown
  kb.concepts.find((c) => c.id === OSMOSIS).review = { status: "verified", by: null, on: null };      // unsupported
  kb.outcomeMaps[0].claim = "verified";                                                              // unsupported
  kb.lessonMaps.push({ ...kb.lessonMaps[0], lesson: "u02-99" });                                     // no such lesson
  kb.concepts.push({ ...structuredClone(kb.concepts[0]), id: "BIO-CELL-MEMBRANE-002" });             // duplicate idea
  const p = validate(kb, lessons).join("\n");
  assert.match(p, /prerequisite cycle/);
  assert.match(p, /unknown concept BIO-CELL-NOPE-001/);
  assert.match(p, /"verified" needs review.by and review.on/);
  assert.match(p, /"verified" needs reviewed.by and reviewed.on/);
  assert.match(p, /u02-99 → .*no such lesson/);
  assert.match(p, /duplicate concept title/);
});

test("schema: a concept needs sources with kinds and dates, levels on known bands, and a changelog entry", () => {
  const c = structuredClone(KB.concepts[0]);
  c.sources = [{ cite: "A book", kind: "blog", date: "" }]; c.levels = { "year-10": { expects: [] } }; c.version = 3;
  const p = checkConcept(c).join("\n");
  assert.match(p, /unknown kind "blog"/);
  assert.match(p, /needs a date/);
  assert.match(p, /unknown band "year-10"/);
  assert.match(p, /changelog needs an entry for version 3/);
});

test("prerequisites: osmosis and active transport build on diffusion and membranes", () => {
  assert.deepEqual(dependents(KB, "BIO-CELL-DIFFUSION-001").sort(), ["BIO-CELL-ACTIVE-TRANSPORT-001", OSMOSIS]);
});
