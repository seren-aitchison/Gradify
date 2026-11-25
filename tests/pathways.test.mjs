// Pathways (kit/curriculum/graph.js, kit/ui/pathways.js): the curriculum graph is built only from the registries, it
// works in both directions, nothing in it is invented, and every page and every link a page shows works.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildGraph, subjectQualifications, bodyQualifications, alternatives, jurisdictionsOf } from "../kit/curriculum/graph.js";
import { SPECS as UK_SPECS, BODIES, QUAL_TYPES, NATIONS, nationsOf } from "../kit/curriculum/uk.js";
import { qualifications, WORLD } from "../kit/curriculum/world.js";
import { SUBJECTS, STAGES, checkSubjects } from "../kit/curriculum/subjects.js";
import { parseRoute, hrefOf, pathwaysFor, renderPathway } from "../kit/ui/pathways.js";

const root = new URL("../", import.meta.url);
const idx = JSON.parse(readFileSync(new URL("kit/data/search-index.json", root), "utf8"));
const catalogue = JSON.parse(readFileSync(new URL("kit/api/v1/catalogue.json", root), "utf8"));
const g = buildGraph({ courses: catalogue.courses });
const SOURCES = new Set(["world.js", "uk.js", "kit/specs", "subjects.js", "catalogue.json"]);

test("the graph is built only from the registries: every edge names one, and the graph's own checks pass", () => {
  assert.deepEqual(g.check(), []);
  for (const e of g.edges) assert.ok(SOURCES.has(e.src), `${e.from} ${e.rel} ${e.to}: unknown source ${e.src}`);
  assert.deepEqual(checkSubjects(catalogue.courses.map((c) => c.slug)), []);
  // world.js's UK qualifications name a real qualification type, offered in their own nation
  for (const q of qualifications().filter((x) => x.type)) {
    assert.ok(QUAL_TYPES[q.type], `${q.id}: unknown type ${q.type}`);
    const nation = Object.keys(NATIONS).find((n) => NATIONS[n].name === q.system);
    assert.ok(QUAL_TYPES[q.type].nations.includes(nation), `${q.id}: ${q.type} isn't taken in ${q.system}`);
  }
});

test("subject → qualification → exam board: exactly the boards with a specification for it, from uk.js", () => {
  for (const { qualification, bodies, specs } of subjectQualifications(g, "biology")) {
    const want = new Set(UK_SPECS.filter((s) => s.subject === "biology" && s.qual === qualification.key).map((s) => s.body));
    assert.deepEqual(new Set(bodies.map((b) => b.key)), want, qualification.name);
    assert.equal(specs.length, UK_SPECS.filter((s) => s.subject === "biology" && s.qual === qualification.key).length);
  }
  const gcse = subjectQualifications(g, "biology").find((x) => x.qualification.key === "gcse");
  assert.deepEqual(gcse.bodies.map((b) => b.name).sort(), ["AQA", "CCEA", "OCR", "Pearson Edexcel", "WJEC", "WJEC Eduqas"]);
  // a subject with no specifications in the registry shows none, rather than borrowing another subject's boards
  assert.deepEqual(subjectQualifications(g, "law"), []);
});

test("exam board → qualification → subject: only what the board publishes, and nothing a board doesn't award", () => {
  const aqa = bodyQualifications(g, "aqa");
  assert.deepEqual(aqa.map((x) => x.qualification.key).sort(), ["a-level", "as", "gcse", "gcse-combined"]);
  assert.ok(aqa.find((x) => x.qualification.key === "gcse").specs.some((s) => s.key === "aqa-gcse-biology"));
  for (const [k] of Object.entries(BODIES)) for (const { qualification, specs } of bodyQualifications(g, k)) for (const s of specs) {
    assert.ok(UK_SPECS.some((u) => u.id === s.key && u.body === k && u.qual === qualification.key), `${k} → ${qualification.key} → ${s.key} isn't in uk.js`);
  }
  // SQA awards Scottish qualifications only
  assert.deepEqual(bodyQualifications(g, "sqa").map((x) => x.qualification.key).sort(), ["adv-higher", "higher", "nat5"]);
});

test("country → education system → qualification: each UK nation keeps its own structure", () => {
  assert.deepEqual(g.out("country:GB", "has").map((e) => e.to).sort(), ["jurisdiction:gb-eng", "jurisdiction:gb-nir", "jurisdiction:gb-prof", "jurisdiction:gb-sct", "jurisdiction:gb-wls"]);
  const typesIn = (j) => g.out(j, "has-qualification").map((e) => g.get(e.to).key).sort();
  assert.ok(typesIn("jurisdiction:gb-eng").includes("gcse"));
  assert.ok(!typesIn("jurisdiction:gb-sct").includes("gcse"), "Scotland doesn't sit GCSEs");
  assert.deepEqual(typesIn("jurisdiction:gb-sct"), ["adv-higher", "higher", "nat5"]);
  assert.ok(!typesIn("jurisdiction:gb-eng").includes("nat5"));
  // England's GCSE is the GCSE qualification, and leads to its subjects
  assert.ok(g.out("award:gb-eng-gcse", "is").some((e) => e.to === "qualification:gcse"));
  assert.ok(g.out("qualification:gcse", "spec").some((e) => g.get(e.to).subjectKey === "biology"));
  // a specification is taken where its board and its qualification overlap
  for (const s of UK_SPECS) assert.deepEqual(jurisdictionsOf(g, `spec:${s.id}`).map((j) => j.name).sort(), nationsOf(s).map((n) => NATIONS[n].name).sort(), s.id);
  // the US and Canada are listed as their own systems, never given a national curriculum
  for (const iso of ["US", "CA"]) assert.ok(g.out(`country:${iso}`, "has").length >= 1);
  assert.equal(WORLD.find((c) => c.iso === "US").systems.length, g.out("country:US", "has").length);
});

test("switching board: the alternatives are the other specifications for the same subject and qualification", () => {
  const alts = alternatives(g, "aqa-gcse-biology").map((s) => s.key).sort();
  assert.deepEqual(alts, UK_SPECS.filter((s) => s.subject === "biology" && s.qual === "gcse" && s.id !== "aqa-gcse-biology").map((s) => s.id).sort());
  assert.ok(!alts.some((k) => k.includes("a-level")));
});

test("specification → topics → lessons: every lesson a mapped topic names exists in its course", () => {
  const spec = g.get("spec:aqa-gcse-biology");
  assert.equal(spec.mastery.course, "biology");
  const topics = g.out(spec.id, "topic").map((e) => g.get(e.to));
  assert.ok(topics.length >= 7);
  const ids = new Set(idx.courses.flatMap((c) => c.units.flatMap((u) => u[3].map(([id]) => `${c.s}:${id}`))));
  for (const t of topics) for (const ref of t.lessons) assert.ok(ids.has(ref), `${t.id}: no lesson ${ref}`);
});

test("professions: a regulator → its standard → the Gradify course, with the claim's real strength", () => {
  const nmc = g.get("org:nursing-and-midwifery-council");
  assert.ok(nmc, "the NMC is a professional body node");
  const std = g.out(nmc.id, "sets").map((e) => e.to);
  assert.deepEqual(std, ["award:gb-nmc"]);
  const e = g.out("award:gb-nmc", "related-course").find((x) => x.to === "course:nursing");
  assert.equal(e.claim, "mapped");
  // no claim is ever stronger than coverage.js makes it: nothing here is "verified"
  assert.ok(!g.edges.some((x) => x.claim === "verified"));
});

test("stages and subjects: every subject reaches a course and a site; every stage is a node", () => {
  for (const s of SUBJECTS) { const cs = g.out(`subject:${s.id}`, "taught-in"); assert.ok(cs.length, s.id); for (const c of cs) assert.ok(g.out(c.to, "on").length, `${c.to} has no site`); }
  for (const st of STAGES) assert.ok(g.get(`stage:${st.id}`));
  assert.ok(g.out("stage:undergraduate", "course").some((e) => e.to === "course:university"));
  // related subjects go both ways, each with what they share
  for (const e of g.edges.filter((x) => x.rel === "related")) { assert.ok(e.note); assert.ok(g.out(e.to, "related").some((b) => b.to === e.from)); }
});

test("search finds each kind, with ambiguous words returning every context to choose from", () => {
  assert.equal(g.search("aqa")[0].id, "body:aqa");
  assert.equal(g.search("biology")[0].id, "subject:biology");
  const gcse = g.search("gcse").map((n) => n.id);
  assert.equal(gcse[0], "qualification:gcse");
  for (const id of ["award:gb-wls-gcse", "award:gb-nir-gcse"]) assert.ok(gcse.includes(id), `GCSE search shows ${id}`);
  assert.equal(g.search("scotland")[0].id, "jurisdiction:gb-sct");
  assert.deepEqual(g.search("zzqx"), []);
});

test("routes and links: the breadcrumb is the way here, kept to three steps, never the page itself", () => {
  assert.deepEqual(parseRoute("#/body/aqa?from=subject:biology,qualification:gcse"), { parts: ["body", "aqa"], from: ["subject:biology", "qualification:gcse"] });
  assert.deepEqual(parseRoute("#/spec/x?from=<script>,subject:biology").from, ["subject:biology"]);
  assert.equal(hrefOf(g.get("body:aqa"), ["a:1", "b:2", "c:3", "d:4"]), "#/body/aqa?from=b:2,c:3,d:4");
  assert.equal(hrefOf(g.get("body:aqa"), ["body:aqa"]), "#/body/aqa");
  assert.equal(hrefOf(g.get("topic:aqa-gcse-biology-8461/4.1")), "#/topic/aqa-gcse-biology-8461/4.1");
});

// ---------- every page renders, and every link on it leads somewhere real ----------
function fakeRoot() { return { innerHTML: "", querySelector: () => null, querySelectorAll: () => [] }; }
const crumbs = (parts) => `<nav class="gx-ex-crumbs">${parts.map(([t, h]) => `<a href="${h}">${t}</a>`).join("")}</nav>`;
const pw = pathwaysFor(idx);
function render(hash) {
  globalThis.location = { hash };
  const r = fakeRoot(), title = renderPathway(r, hash, { ...pw, crumbs });
  return { html: r.innerHTML, title };
}
const STARTS = ["#/pathways", "#/subjects", "#/boards", "#/countries", "#/stages", "#/professions"];
const NOT_FOUND = /That isn(?:'|&#39;)t in the registry/;

test("every node has a page, and every page renders", () => {
  for (const h of STARTS) assert.doesNotMatch(render(h).html, NOT_FOUND, h);
  for (const n of pw.g.nodes.values()) {
    if (n.kind === "course" || n.kind === "site") continue;   // courses open in Explore's course view; sites on their own pages
    const { html } = render(hrefOf(n));
    assert.doesNotMatch(html, NOT_FOUND, n.id);
    assert.ok(html.includes(`<h1>`), `${n.id}: no heading`);
  }
});

test("no broken links: every pathway link on every page leads to a real page; course links open real courses", () => {
  const courses = new Set(idx.courses.map((c) => c.s)), seen = new Set();
  const pages = [...STARTS, ...[...pw.g.nodes.values()].filter((n) => !["course", "site"].includes(n.kind)).map((n) => hrefOf(n)), "#/subject/biology/gcse", "#/subject/biology/nat5"];
  for (const p of pages) for (const [, h] of render(p).html.matchAll(/href="(#\/[^"]+)"/g)) {
    const href = h.replace(/&amp;/g, "&"); if (seen.has(href)) continue; seen.add(href);
    const { parts } = parseRoute(href);
    if (parts[0] === "course") { assert.ok(courses.has(parts[1]), `${p} links to a course that doesn't exist: ${href}`); continue; }
    assert.doesNotMatch(render(href).html, NOT_FOUND, `${p} links to ${href}`);
  }
  assert.ok(seen.size > 100, `checked ${seen.size} links`);
});

test("a subject with no specifications, a stage with nothing yet and an unknown address all say so honestly", () => {
  assert.match(render("#/subject/law").html, /No Law specifications in the registry yet/);
  assert.match(render("#/stage/early-years").html, /Nothing for early years in the registry yet/);
  assert.match(render("#/body/nope").html, NOT_FOUND);
  assert.match(render("#/stage/undergraduate").html, /Add your own course and modules/);
  // the breadcrumb follows the path taken
  const html = render("#/spec/aqa-gcse-biology?from=subject:biology,qualification:gcse").html;
  assert.match(html, /Pathways<\/a><a href="#\/subject\/biology">Biology<\/a><a href="#\/qualification\/gcse\?from=subject:biology">GCSE<\/a>/);
  // switching board doesn't claim progress moves
  assert.match(html, /nothing moves when you switch/);
});

test("the coverage report is up to date (node scripts/curriculum/pathways-report.mjs)", async () => {
  const { report } = await import("../scripts/curriculum/pathways-report.mjs");
  assert.equal(readFileSync(new URL("docs/curriculum/PATHWAYS-COVERAGE.md", root), "utf8"), report(), "docs/curriculum/PATHWAYS-COVERAGE.md is out of date: run node scripts/curriculum/pathways-report.mjs");
});
