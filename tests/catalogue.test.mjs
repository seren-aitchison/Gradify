// The education catalogue foundation (Stage 2): IDs, schema, validator, source registry, build and reader, run
// against the fictional fixtures (data/catalogue/fixtures/bundle.json). See docs/CATALOGUE.md.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { newId, isId, typeOfId, resolveId, bucketOf } from "../kit/data/catalogue-ids.js";
import { createCatalogue, statusOf, describeStatus, calculationValues, confirmLink, ruleUsable, normalise } from "../kit/data/catalogue.js";
import { validateBundle, PERSONAL } from "../scripts/catalogue/validate.mjs";
import { buildCatalogue } from "../scripts/catalogue/build.mjs";
import { makeFixtures } from "../scripts/catalogue/make-fixtures.mjs";
import { check } from "../scripts/catalogue/jsonschema.mjs";

const NOW = Date.UTC(2026, 10, 24, 12);
const fixtures = () => JSON.parse(readFileSync(new URL("../data/catalogue/fixtures/bundle.json", import.meta.url), "utf8"));
const SCHEMA = JSON.parse(readFileSync(new URL("../data/catalogue/schema/catalogue.schema.json", import.meta.url), "utf8"));
const codes = (b, opts) => validateBundle(b, opts).errors.map((e) => e.code);
const byName = (b, name) => b.records.find((r) => (r.data.name || r.data.title || r.data.label) === name);
const reader = (bundle = fixtures()) => { const files = buildCatalogue(bundle); return { files, cat: createCatalogue({ fetchJson: async (p) => { if (!files.has(p)) throw new Error(`404 ${p}`); return structuredClone(files.get(p)); }, now: () => NOW }) }; };

// ---------- 2.2 canonical IDs ----------
test("IDs are Gradify-owned: type prefix + ULID, never an external number", () => {
  const id = newId("provider", { now: NOW, random: () => 0.5 });
  assert.match(id, /^gp_[0-9A-HJKMNP-TV-Z]{26}$/);
  assert.equal(typeOfId(id), "provider");
  assert.ok(!isId("10007786") && !isId("gp_123"), "a UKPRN or a short code is never an ID");
  assert.equal(bucketOf(id), id.slice(-2));
  assert.throws(() => newId("school"), /Unknown catalogue type/);
});

test("tombstones: merges resolve to the survivor, splits ask the student, loops and gaps don't resolve", () => {
  const t = new Map([["gp_A", { merged_into: "gp_B" }], ["gp_B", { merged_into: "gp_C" }], ["gp_S", { split_into: ["gp_X", "gp_Y"] }], ["gp_L1", { merged_into: "gp_L2" }], ["gp_L2", { merged_into: "gp_L1" }]]);
  assert.deepEqual(resolveId("gp_A", t), { id: "gp_C" });
  assert.deepEqual(resolveId("gp_S", t), { id: null, split: ["gp_X", "gp_Y"] });
  assert.equal(resolveId("gp_L1", t).loop, true);
  assert.deepEqual(resolveId("gp_Z", t), { id: "gp_Z" });
});

// ---------- 2.1 schema and 2.5 fixtures ----------
test("the fixtures are valid, deterministic and wholly fictional", () => {
  const b = fixtures();
  const res = validateBundle(b);
  assert.deepEqual(res.errors, []);
  assert.deepEqual(makeFixtures(), b, "the committed fixtures match the generator (run scripts/catalogue/make-fixtures.mjs)");
  assert.ok(b.records.every((r) => r.fixture === true));
  assert.deepEqual([...new Set(b.records.flatMap((r) => Object.values(r.fields).map((f) => f.source)))], ["src_fixture"]);
});

test("the schema checker rejects unknown keys, wrong types and unsupported keywords", () => {
  assert.ok(check({ schema_version: 2 }, SCHEMA).length);
  assert.throws(() => check(1, { type: "integer", format: "x" }), /Unsupported schema keyword/);
  const b = fixtures(); b.records[0].colour = "red";
  assert.ok(codes(b).includes("schema"));
});

// ---------- 2.3 validator ----------
test("IDs: wrong prefix, duplicates and reuse of a tombstoned ID are refused", () => {
  let b = fixtures(); b.records[0].type = "provider"; b.records[0].country = "GB"; b.records[0].region = "ENG";
  assert.ok(codes(b).includes("id.prefix"));
  b = fixtures(); b.records.push(structuredClone(b.records[0]));
  assert.ok(codes(b).includes("id.duplicate"));
  b = fixtures(); const r = structuredClone(byName(b, "Fernbridge Academy")); r.id = b.tombstones[0].id; b.records.push(r);
  assert.ok(codes(b).includes("id.reused"));
});

test("personal data: named-person and contact fields are refused, whatever the source", () => {
  assert.ok(PERSONAL.test("head_first_name") && PERSONAL.test("headteacher") && PERSONAL.test("governor") && PERSONAL.test("email") && PERSONAL.test("telephone"));
  assert.ok(!PERSONAL.test("name") && !PERSONAL.test("headline") && !PERSONAL.test("phase") && !PERSONAL.test("town"));
  const b = fixtures(); const p = byName(b, "Fernbridge Academy");
  p.data.head_first_name = "Jo"; p.fields.head_first_name = { status: "unverified", source: "src_fixture" };
  assert.ok(codes(b).includes("personal_data"));
});

test("verification: reviewers must exist, be competent and approved; important records need two different reviewers", () => {
  let b = fixtures(); const off = byName(b, "BSc Chemistry");
  off.fields.title.review = null;
  assert.ok(codes(b).includes("review.missing"), "verified needs a review");
  b = fixtures(); const ex = byName(b, "Spectroscopy exam");
  ex.fields.weight.review.second_by = null;
  assert.ok(codes(b).includes("review.second"), "an assessment weight needs two reviewers");
  b = fixtures(); byName(b, "Spectroscopy exam").fields.weight.review.second_by = "rev_fixture_a";
  assert.ok(codes(b).includes("review.same"));
  b = fixtures(); b.reviewers[1].competence = ["unit"];
  assert.ok(codes(b).includes("review.competence"));
  b = fixtures(); b.kind = "source"; b.records.forEach((r) => delete r.fixture);
  assert.ok(codes(b).includes("review.fixture") && codes(b).includes("source.fixture"), "fixture reviewers and sources only in fixtures");
});

test("relationships: dangling or wrongly typed edges, alias collisions and broken tombstones are refused", () => {
  let b = fixtures(); b.edges[0].to = newId("system", { now: 1, random: () => 0.1 });
  assert.ok(codes(b).includes("edge.dangling"));
  b = fixtures(); const off = b.edges.find((e) => e.type === "offers"); off.type = "covers";
  assert.ok(codes(b).includes("edge.types"));
  b = fixtures(); b.aliases.push({ scheme: "fixture", value: "NMU-001", id: byName(b, "Northmoor College").id, source: "src_fixture" });
  assert.ok(codes(b).includes("alias.collision"));
  b = fixtures(); b.tombstones[0].merged_into = b.tombstones[0].id;
  assert.ok(codes(b).includes("tombstone.resolve"));
});

test("a pending source change must not leave the changed field looking verified", () => {
  const b = fixtures(); const wt = byName(b, "Year weighting (fixture)");
  wt.fields.body = structuredClone(wt.fields.label);
  assert.ok(codes(b).includes("pending.status"));
});

// ---------- 2.6 source registry and field-specific clearance (owner's condition 1) ----------
const registry = () => readdirSync(new URL("../data/catalogue/sources/", import.meta.url)).map((f) => JSON.parse(readFileSync(new URL(`../data/catalogue/sources/${f}`, import.meta.url), "utf8")));

test("the source registry matches Stage 1: only GIAS is cleared, and only for named provider fields", () => {
  const reg = registry();
  for (const s of reg) assert.deepEqual(check(s, SCHEMA.$defs.source, SCHEMA), [], s.id);
  assert.deepEqual(reg.filter((s) => s.verdict === "cleared").map((s) => s.id), ["src_gias"]);
  const gias = reg.find((s) => s.id === "src_gias");
  assert.ok(gias.licence.quote && gias.licence.attribution && gias.evidence_urls.length >= 2, "a cleared source quotes its licence, attribution and evidence");
  assert.deepEqual(Object.keys(gias.fields_allowed), ["provider"]);
  assert.ok(!gias.fields_allowed.provider.some((f) => PERSONAL.test(f)));
  assert.equal(reg.find((s) => s.id === "src_discover_uni").verdict, "permission_needed");
  for (const s of reg.filter((x) => x.verdict !== "cleared")) assert.ok(Object.keys(s.fields_allowed).length === 0, `${s.id} supplies nothing until cleared`);
});

function giasBundle(mutate) {
  const b = { schema_version: 1, kind: "source", sources: registry(), reviewers: [], evidence: [], edges: [], aliases: [], tombstones: [], records: [] };
  const D = "2026-11-24", m = { status: "unverified", source: "src_gias" };
  b.records.push({ id: newId("provider", { now: NOW, random: () => 0.3 }), type: "provider", country: "GB", region: "ENG", lifecycle: "open",
    data: { name: "Example School", kind: "school", town: "Exampleton" }, fields: { name: m, kind: m, town: m },
    provenance: { source: "src_gias", source_url: "https://get-information-schools.service.gov.uk/Downloads", retrieved_at: D, last_checked: D, next_review: "2026-12-24" } });
  mutate?.(b);
  return b;
}
test("GIAS clearance is field-specific: allowed provider fields pass; anything else, or another source, is refused", () => {
  assert.deepEqual(validateBundle(giasBundle()).errors, []);
  const w = giasBundle((b) => { b.records[0].data.website = "https://example.org"; b.records[0].fields.website = { status: "unverified", source: "src_gias" }; });
  assert.deepEqual(validateBundle(w).errors, [], "website is on the allowed list");
  const notAllowed = giasBundle((b) => { b.records[0].data.alt_names = ["X"]; b.records[0].fields.alt_names = { status: "unverified", source: "src_ipeds" }; });
  assert.ok(codes(notAllowed).includes("source.not_cleared"), "IPEDS isn't cleared yet");
  const offering = giasBundle((b) => b.records.push({ id: newId("offering", { now: NOW, random: () => 0.4 }), type: "offering", data: { title: "X", kind: "grade" }, fields: { title: { status: "unverified", source: "src_gias" }, kind: { status: "unverified", source: "src_gias" } }, provenance: b.records[0].provenance }));
  assert.ok(codes(offering).includes("field.not_cleared"), "GIAS isn't cleared to supply offerings");
  const person = giasBundle((b) => { b.records[0].data.head_last_name = "Smith"; b.records[0].fields.head_last_name = { status: "unverified", source: "src_gias" }; });
  assert.ok(codes(person).includes("personal_data") && codes(person).includes("field.not_cleared"));
  const extract = giasBundle((b) => { b.sources.find((s) => s.id === "src_gias").rights.evidence = false; b.evidence.push({ id: "evd_x", source: "src_gias", url: "https://get-information-schools.service.gov.uk/Downloads", retrieved_at: "2026-11-24", category: "internal_extract", extract: "a quote" }); });
  assert.ok(codes(extract).includes("evidence.extract"), "no extracts where the source doesn't allow keeping them");
  const noPublish = giasBundle((b) => { b.sources.find((s) => s.id === "src_gias").rights.publish = false; });
  assert.ok(codes(noPublish).includes("source.no_publish"));
  assert.deepEqual(validateBundle(noPublish, { publish: false }).errors, [], "ingesting without publishing is a separate right");
});

// ---------- build: what's never published ----------
test("the build publishes no evidence, reviewer names, aliases or pending values, and carries attribution", () => {
  const files = buildCatalogue(fixtures());
  const all = JSON.stringify([...files.values()]);
  assert.ok(!all.includes("Fixture evidence") && !all.includes("Fixture reviewer") && !all.includes("NMU-001"));
  assert.ok(!all.includes('"year2":30'), "the pending (unreviewed) value isn't published");
  assert.ok(all.includes('"year2":40'), "the last verified value is");
  const m = files.get("manifest.json");
  assert.equal(m.counts.provider, 9);
  assert.deepEqual(m.regions, { GB: ["ENG", "NIR"], US: ["CA", "TX"] });
  assert.match(m.build_id, /^[0-9a-f]{12}$/);
  assert.throws(() => buildCatalogue(giasBundle((b) => { b.records[0].data.email = "x@y"; b.records[0].fields.email = { status: "unverified", source: "src_gias" }; })), /Invalid catalogue bundle/);
});

// ---------- 2.4 reader over fixtures (owner's condition 3: missing, ambiguous, closed, custom) ----------
test("search: ambiguous names return every match; closed providers are flagged and ranked lower; nothing is linked", async () => {
  const { cat } = reader();
  const nm = await cat.searchProviders("GB", "ENG", "northmoor");
  assert.deepEqual(nm.map((x) => x.name).sort(), ["Northmoor College", "Northmoor University"], "an ambiguous name shows both");
  assert.ok(nm.every((x) => !("linked" in x)), "results are suggestions only");
  const fb = await cat.searchProviders("GB", "ENG", "fernbridge");
  assert.deepEqual(fb.map((x) => [x.name, x.closed]), [["Fernbridge Academy", false], ["Old Tannery School", true]], "matched by town; the closed school is last and flagged");
  assert.deepEqual((await cat.searchProviders("GB", "ENG", "st aldric")).map((x) => x.name), ["St Aldric's College"]);
  assert.deepEqual((await cat.searchProviders("GB", "ENG", "univ northmoor")).map((x) => x.name), ["Northmoor University"], "alternative names");
  assert.deepEqual(await cat.searchProviders("GB", "ENG", "Zzyzx Institute"), [], "not listed: no match, no guess");
  assert.deepEqual(await cat.searchProviders("GB", "SCT", "anything"), [], "a region with no data yet is empty, not an error");
  assert.equal(normalise("St. Mary's Coll."), "saint mary s college");
});

test("missing data never blocks: a provider with no offerings, an offering with no structure, an unknown ID", async () => {
  const b = fixtures(), { cat } = reader(b);
  assert.deepEqual(await cat.offerings(byName(b, "Lough Carran Primary School").id), []);
  assert.equal(await cat.structure(byName(b, "High school diploma (Grades 9–12)").id, "2026"), null);
  assert.equal(await cat.record(newId("provider", { now: 5, random: () => 0.9 })), null);
  assert.deepEqual(await cat.rulesFor({ id: null, name: "My own course" }), { apply: [], info: [], reason: "not linked to a catalogue record" });
});

test("merged and split providers keep stored references working", async () => {
  const b = fixtures(), { cat } = reader(b);
  const merged = await cat.record(b.tombstones[0].id);
  assert.equal(merged.data.name, "Fernbridge Academy");
  assert.equal(merged.resolved_from, b.tombstones[0].id);
  const split = await cat.record(b.tombstones[1].id);
  assert.deepEqual(split, { split: b.tombstones[1].split_into, display_name: "Northmoor Institute" });
  assert.match((await cat.rulesFor({ id: b.tombstones[1].id })).reason, /split/);
});

test("many-to-many: a shared module, an outcome in two units, an assessment over two outcomes; cohorts and supersession", async () => {
  const b = fixtures(), { cat } = reader(b);
  const bsc = byName(b, "BSc Chemistry"), org = byName(b, "Organic Chemistry II"), nmr = byName(b, "Interpret NMR spectra"), exam = byName(b, "Spectroscopy exam");
  assert.equal((await cat.relations(org.id, "includes")).filter((e) => e.to === org.id).length, 4, "in BSc 2024, BSc 2026 (old and new) and MChem 2026");
  assert.equal((await cat.relations(nmr.id, "covers")).length, 2);
  assert.equal((await cat.relations(exam.id, "assesses")).filter((e) => e.from === exam.id).length, 3);
  const s26 = await cat.structure(bsc.id, "2026", "ug2");
  assert.equal(s26.units.length, 5, "the current 2026 version, not the superseded one");
  assert.ok(s26.units.some((u) => u.group === "opt-1" && !u.compulsory));
  assert.ok(await cat.structure(bsc.id, "2024", "ug2"), "a 2024 starter has their own structure");
  assert.equal(await cat.structure(bsc.id, "2025", "ug2"), null);
  assert.deepEqual((await cat.offerings(byName(b, "Northmoor University").id, { subject: "chemistry" })).map((o) => o.data.title).sort(), ["BSc Chemistry", "MChem Medicinal Chemistry"]);
});

test("field-level status: a checked title never makes the programme read as checked; review dates expire", async () => {
  const b = fixtures(), { cat } = reader(b);
  const bsc = await cat.record(byName(b, "BSc Chemistry").id);
  assert.equal(statusOf(bsc, ["title"], NOW), "verified");
  assert.equal(statusOf(bsc, ["title", "length"], NOW), "unverified");
  assert.equal(statusOf(bsc, null, NOW), "unverified");
  assert.equal(describeStatus(bsc, ["title", "kind", "length"], NOW), "Title, Type checked · Length not yet checked");
  const hist = await cat.record(byName(b, "BA History").id);
  assert.equal(statusOf(hist, ["title"], NOW), "outdated", "past its review date");
});

test("calculations get verified values only; a pending source change keeps the last verified value", async () => {
  const b = fixtures(), { cat } = reader(b);
  const wt = await cat.record(byName(b, "Year weighting (fixture)").id);
  const cv = calculationValues(wt, NOW);
  assert.deepEqual(cv.values.body, { year2: 40, final: 60 }, "never the unreviewed 30/70");
  const bsc = await cat.record(byName(b, "BSc Chemistry").id);
  assert.deepEqual(Object.keys(calculationValues(bsc, NOW).values).sort(), ["kind", "qualification", "title"]);
  assert.ok(calculationValues(bsc, NOW).withheld.includes("length"));
});

test("rules: only a confirmed link and a fully verified rule (two reviewers) change numbers; typed names inherit nothing", async () => {
  const b = fixtures(), { cat } = reader(b);
  const uni = byName(b, "Northmoor University"), bsc = byName(b, "BSc Chemistry");
  // a typed entry that looks exactly like the catalogue record is NOT linked without confirmation
  const typed = { id: null, name: "Northmoor University" };
  const [suggestion] = await cat.searchProviders("GB", "ENG", typed.name);
  assert.equal(suggestion.id, uni.id);
  assert.equal(confirmLink(typed, suggestion).id, null, "a suggestion alone links nothing");
  assert.equal(confirmLink(typed, suggestion, { confirmed: "yes" }).id, null, "only an explicit true confirms");
  assert.deepEqual((await cat.rulesFor(typed)).apply, []);
  const linked = confirmLink(typed, suggestion, { confirmed: true });
  assert.equal(linked.id, uni.id);
  const r = await cat.rulesFor(linked);
  assert.deepEqual(r.apply.map((x) => x.data.label), ["Classification boundaries (fixture)"]);
  assert.deepEqual(r.info.map((x) => [x.data.label, x.not_applied]).sort(), [["Borderline zone (fixture)", "Rule type is partly checked"], ["Year weighting (fixture)", "a source change is waiting for review"]]);
  // confirmation doesn't make an unchecked link authoritative
  const viaCourse = await cat.rulesFor(confirmLink({ id: null, name: "BSc Chemistry" }, { id: bsc.id, name: "BSc Chemistry" }, { confirmed: true }));
  assert.deepEqual(viaCourse.apply, []);
  assert.match(viaCourse.info[0].not_applied, /link between this course and the rule isn't checked/);
  assert.equal(ruleUsable({ type: "offering" }).usable, false);
});
