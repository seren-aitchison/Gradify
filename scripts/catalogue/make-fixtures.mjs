// Writes data/catalogue/fixtures/bundle.json: a small, entirely FICTIONAL catalogue for tests and the harness. Every
// name is invented, every record is marked fixture: true, the only source is "src_fixture" and the reviewers are
// fixture reviewers. It covers the cases Stage 2 must prove (docs/CATALOGUE.md, "Fixtures"): UK and US systems; a
// university, schools, a college, a community college; many-to-many links (a shared module, an outcome in two units,
// an assessment over two outcomes); a merged and a split provider; a superseded structure; two cohorts; a closed
// provider; ambiguous names; missing offerings and modules; field-level status; a date-expired record; and rules
// that apply, are only partly checked, or have a pending source change.
//   node scripts/catalogue/make-fixtures.mjs        (deterministic: the same output every run)
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { newId } from "../../kit/data/catalogue-ids.js";

export function makeFixtures() {
  let seed = 42;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  let tick = Date.UTC(2026, 10, 24);
  const id = (type) => newId(type, { now: tick++, random: rnd });
  const SRC = "src_fixture", D = "2026-11-24";
  const prov = (extra = {}) => ({ source: SRC, source_url: "https://example.org/fixture", retrieved_at: D, last_checked: D, next_review: "2027-11-24", ...extra });
  const rv = (by, ev, second = null) => ({ by, second_by: second, at: D, evidence: ev });
  const F = (status, review = null) => ({ status, source: SRC, ...(review ? { review } : {}) });
  const all = (data, status = "unverified", review = null) => Object.fromEntries(Object.keys(data).map((k) => [k, F(status, review)]));
  const records = [], edges = [], aliases = [], tombstones = [];
  const rec = (type, data, opts = {}) => { const r = { id: id(type), type, fixture: true, ...opts.place, ...(opts.lifecycle ? { lifecycle: opts.lifecycle } : {}), data, fields: opts.fields || all(data), provenance: prov(opts.prov), ...(opts.versions ? { versions: opts.versions } : {}), ...(opts.pending ? { pending: opts.pending } : {}) }; records.push(r); return r; };
  const edge = (type, from, to, extra = {}) => edges.push({ type, from: from.id, to: to.id, source: SRC, status: "unverified", ...extra });

  // systems
  const eng = rec("system", { name: "England (fictional fixture)", stages: [{ key: "y1", label: "Year 1", typical_age_min: 5, typical_age_max: 6 }, { key: "y13", label: "Year 13" }, { key: "ug1", label: "Undergraduate year 1" }, { key: "ug2", label: "Undergraduate year 2" }, { key: "ug3", label: "Undergraduate final year" }], year_pattern: { start_month: 9, periods: "terms" } });
  const nir = rec("system", { name: "Northern Ireland (fictional fixture)", stages: [{ key: "p1", label: "Primary 1" }, { key: "p7", label: "Primary 7" }], year_pattern: { start_month: 9, periods: "terms" } });
  const us = rec("system", { name: "United States (fictional fixture)", stages: [{ key: "g9", label: "Grade 9" }, { key: "g12", label: "Grade 12" }, { key: "cc1", label: "Community college year 1" }], year_pattern: { start_month: 8, periods: "semesters" } });

  // providers
  const P = (name, kind, country, region, town, extra = {}) => rec("provider", { name, kind, town, ...(extra.data || {}) }, { place: { country, region }, lifecycle: extra.lifecycle || "open", fields: extra.fields });
  const uni = P("Northmoor University", "university", "GB", "ENG", "Northmoor", { data: { alt_names: ["Univ. of Northmoor"] } });
  const ncol = P("Northmoor College", "college", "GB", "ENG", "Northmoor");
  const fern = P("Fernbridge Academy", "school", "GB", "ENG", "Fernbridge");
  const tann = P("Old Tannery School", "school", "GB", "ENG", "Fernbridge", { lifecycle: "closed" });
  const aldric = P("St Aldric's College", "college", "GB", "ENG", "Aldwick");
  const lough = P("Lough Carran Primary School", "school", "GB", "NIR", "Carran");
  const red = P("Redwood Valley High School", "school", "US", "CA", "Redwood Valley");
  const mission = P("Mission Hill Academy", "school", "US", "CA", "Mission Hill");
  const blue = P("Blue Bonnet Community College", "college", "US", "TX", "Blue Bonnet");
  for (const [p, s] of [[uni, eng], [ncol, eng], [fern, eng], [tann, eng], [aldric, eng], [lough, nir], [red, us], [mission, us], [blue, us]]) edge("part_of_system", p, s);
  // a merged provider and a split provider: their IDs stay resolvable
  tombstones.push({ id: id("provider"), merged_into: fern.id, at: D, reason: "Fernbridge School became Fernbridge Academy (fixture)", display_name: "Fernbridge School" });
  tombstones.push({ id: id("provider"), split_into: [uni.id, ncol.id], at: D, reason: "Northmoor Institute split into a university and a college (fixture)", display_name: "Northmoor Institute" });
  aliases.push({ scheme: "fixture", value: "NMU-001", id: uni.id, source: SRC }, { scheme: "fixture", value: "FBA-002", id: fern.id, source: SRC });

  // offerings: field-level status (title checked, length not), a date-expired one, a US grade and a community college course
  const bsc = rec("offering", { title: "BSc Chemistry", kind: "programme", qualification: { label: "BSc" }, subjects: [{ scheme: "gradify", code: "chemistry", label: "Chemistry" }], mode: "full-time", length: { value: 3, unit: "years" } },
    { fields: { title: F("verified", rv("rev_fixture_a", "evd_fixture_1")), kind: F("verified", rv("rev_fixture_a", "evd_fixture_1")), qualification: F("verified", rv("rev_fixture_a", "evd_fixture_1")), subjects: F("unverified"), mode: F("unverified"), length: F("unverified") } });
  const mchem = rec("offering", { title: "MChem Medicinal Chemistry", kind: "programme", qualification: { label: "MChem" }, subjects: [{ scheme: "gradify", code: "chemistry", label: "Chemistry" }], mode: "full-time", length: { value: 4, unit: "years" } });
  const hist = rec("offering", { title: "BA History", kind: "programme", qualification: { label: "BA" }, subjects: [{ scheme: "gradify", code: "history", label: "History" }] }, { prov: { next_review: "2026-01-01", last_checked: "2025-11-01" } });
  const hs = rec("offering", { title: "High school diploma (Grades 9–12)", kind: "grade" });
  const assoc = rec("offering", { title: "Associate of Science, Biology", kind: "qualification", subjects: [{ scheme: "cip", code: "26.0101", label: "Biology/Biological Sciences, General" }], length: { value: 2, unit: "years" } });
  for (const [p, o] of [[uni, bsc], [uni, mchem], [uni, hist], [red, hs], [blue, assoc]]) edge("offers", p, o);

  // structures: two cohorts for BSc Chemistry year 2, a superseded version, and MChem year 2 sharing a module
  const S = (off, cohort, stage, extra = {}) => { const s = rec("structure", { offering: off.id, cohort_start: cohort, stage, size_total: { value: 120, unit: "credits" } }, extra); edge("has_structure", off, s); return s; };
  const s24 = S(bsc, "2024", "ug2");
  const s26old = S(bsc, "2026", "ug2", { prov: { effective_to: "2026-08-31" } });
  const s26 = S(bsc, "2026", "ug2", { prov: { supersedes: s26old.id } });
  edge("supersedes", s26, s26old);
  const m26 = S(mchem, "2026", "ug2");
  const U = (code, title, credits) => rec("unit", { code, title, size: { value: credits, unit: "credits" } });
  const org = U("NMU-CH201", "Organic Chemistry II", 20), spec = U("NMU-CH202", "Spectroscopy", 20), phys = U("NMU-CH203", "Physical Chemistry II", 20);
  const soc = U("NMU-CH250", "Chemistry in Society", 20), comp = U("NMU-CH251", "Computational Chemistry", 20), med = U("NMU-MC210", "Principles of Medicinal Chemistry", 20);
  const inc = (s, u, compulsory, group) => edge("includes", s, u, { attrs: { compulsory, ...(group ? { group: "opt-1", group_rule: "Choose 20 credits" } : {}) } });
  for (const s of [s24, s26]) { inc(s, org, true); inc(s, spec, true); inc(s, phys, true); inc(s, soc, false, true); inc(s, comp, false, true); }
  inc(s26old, org, true); inc(s26old, spec, true);
  inc(m26, org, true); inc(m26, med, true);   // Organic Chemistry II is in BSc and MChem

  // curriculum and assessments: an outcome covered by two units; an assessment over two outcomes
  const nmr = rec("curriculum", { framework: "Northmoor learning outcomes (fixture)", ref: "LO-NMR", label: "Interpret NMR spectra" });
  const thermo = rec("curriculum", { framework: "Northmoor learning outcomes (fixture)", ref: "LO-THERMO", label: "Apply chemical thermodynamics" });
  edge("covers", org, nmr); edge("covers", spec, nmr); edge("covers", phys, thermo);
  const exam = rec("assessment", { kind: "exam", weight: 60, label: "Spectroscopy exam" }, { fields: { kind: F("verified", rv("rev_fixture_a", "evd_fixture_2")), weight: F("verified", rv("rev_fixture_a", "evd_fixture_2", "rev_fixture_b")), label: F("verified", rv("rev_fixture_a", "evd_fixture_2")) } });
  const lab = rec("assessment", { kind: "coursework", weight: 40, label: "Lab report" }, { fields: { kind: F("partially_verified", rv("rev_fixture_a", "evd_fixture_2")), weight: F("unverified"), label: F("unverified") } });
  edge("assesses", exam, nmr); edge("assesses", exam, thermo); edge("assesses", exam, spec); edge("assesses", lab, nmr);

  // rules: one usable (two reviewers), one only partly checked, one with a pending source change (last verified kept)
  const two = rv("rev_fixture_a", "evd_fixture_3", "rev_fixture_b");
  const cls = rec("rule", { rule_kind: "classification", importance: "high", label: "Classification boundaries (fixture)", body: { boundaries: [70, 60, 50, 40] } }, { fields: { rule_kind: F("verified", two), importance: F("verified", two), label: F("verified", two), body: F("verified", two) } });
  const border = rec("rule", { rule_kind: "borderline", importance: "high", label: "Borderline zone (fixture)", body: { within: 2 } }, { fields: { rule_kind: F("partially_verified", rv("rev_fixture_a", "evd_fixture_3")), importance: F("unverified"), label: F("unverified"), body: F("unverified") } });
  const wt = rec("rule", { rule_kind: "weighting", importance: "high", label: "Year weighting (fixture)", body: { year2: 30, final: 70 } }, {
    fields: { rule_kind: F("verified", two), importance: F("verified", two), label: F("verified", two), body: F("outdated") },
    versions: [{ at: "2026-09-01", data: { rule_kind: "weighting", importance: "high", label: "Year weighting (fixture)", body: { year2: 40, final: 60 } }, fields: { rule_kind: F("verified", two), importance: F("verified", two), label: F("verified", two), body: F("verified", two) } }],
    pending: { detected_at: D, changed: ["body"], data: { body: { year2: 30, final: 70 } } } });
  edge("governed_by", uni, cls, { status: "verified", review: rv("rev_fixture_a", "evd_fixture_3", "rev_fixture_b") });
  edge("governed_by", uni, border, { status: "verified", review: rv("rev_fixture_a", "evd_fixture_3", "rev_fixture_b") });
  edge("governed_by", uni, wt, { status: "verified", review: rv("rev_fixture_a", "evd_fixture_3", "rev_fixture_b") });
  edge("governed_by", bsc, cls);   // an unchecked link: the rule must not apply through it

  return {
    schema_version: 1, kind: "fixture",
    note: "FICTIONAL test data for the Gradify catalogue. No real institution, course, module or rule. Generated by scripts/catalogue/make-fixtures.mjs.",
    sources: [{ id: SRC, name: "Gradify test fixtures (fictional)", owner: "Gradify", url: "https://example.org/fixture", verdict: "fixture", licence: null, rights: { ingest: true, publish: true, evidence: true, archive: true }, fields_allowed: {}, checked_at: D, notes: "Invented data, for tests only." }],
    reviewers: [
      { id: "rev_fixture_a", name: "Fixture reviewer A", competence: ["offering", "structure", "unit", "assessment", "rule", "edge", "provider"], approved_by_owner: false, approved_at: null, fixture: true },
      { id: "rev_fixture_b", name: "Fixture reviewer B", competence: ["structure", "assessment", "rule", "edge"], approved_by_owner: false, approved_at: null, fixture: true },
    ],
    evidence: [1, 2, 3].map((n) => ({ id: `evd_fixture_${n}`, source: SRC, url: "https://example.org/fixture", retrieved_at: D, category: "internal_extract", extract: `Fixture evidence ${n} (invented).`, retain_until: "2027-11-24" })),
    records, edges, aliases, tombstones,
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = new URL("../../data/catalogue/fixtures/bundle.json", import.meta.url);
  mkdirSync(new URL(".", out), { recursive: true });
  writeFileSync(out, JSON.stringify(makeFixtures(), null, 1) + "\n");
  console.log("✓ wrote data/catalogue/fixtures/bundle.json");
}
