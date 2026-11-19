// The UK coverage matrix: every row of the catalogue (kit/curriculum/catalogue/uk.js) set against Gradify's courses
// and the knowledge engine. Pure: data in, data out.
//
// Each row gets the strongest status the evidence supports, and never more:
//   none        no Gradify course teaches this subject at this band for this nation
//   related     a course teaches a related subject at this band (GCSE combined science for GCSE biology)
//   subject     a course teaches the subject at this band, not mapped to this specification
//   aligned     a course claims to be written for this qualification (coverage.js or mappings/courses.js)
//   measured    the specification is modelled and its outcomes mapped to lessons: `measure` gives the counts
//   verified    measured, the specification checked by a person, and its mappings confirmed (none yet)
import { ROWS, SUBJECTS, BODIES, SPEC_BY_CODE } from "./catalogue/uk.js";
import { PROFILES } from "./mappings/course-profiles.js";
import { COURSES as CLAIMS } from "./coverage.js";
import { coverage, indexOf } from "./engine.js";

export const LEVELS = ["none", "related", "subject", "aligned", "measured", "verified"];
export const LEVEL_NAMES = {
  none: "No Gradify course", related: "Related course only", subject: "Subject taught, not mapped", aligned: "Aligned, not mapped",
  measured: "Outcomes mapped (unverified)", verified: "Verified",
};

/** One catalogue row, resolved. */
export function resolveRow(row, kb, lessons = null, ix = indexOf(kb)) {
  const fits = (p) => p.bands.includes(row.band) && row.nations.some((n) => p.nations.includes(n));
  const teach = Object.entries(PROFILES).filter(([, p]) => fits(p) && p.subjects.includes(row.subject)).map(([c]) => c);
  const related = Object.entries(PROFILES).filter(([, p]) => fits(p) && (p.related || []).includes(row.subject)).map(([c]) => c);
  const specId = row.spec || (row.code && SPEC_BY_CODE[`${row.body}:${row.code}`]);
  const spec = specId && ix.spec.get(specId);
  const aligned = [...teach, ...related].filter((c) =>
    kb.pathways.some((p) => p.course === c && p.spec === specId) ||
    (row.qualification && (CLAIMS[c]?.serves || []).some((s) => s.q === row.qualification && s.status !== "gradify")));
  let measure = null;
  if (spec) {
    const r = coverage(kb, specId, lessons), n = (st) => r.outcomes.filter((o) => o.status === st).length;
    measure = { spec: specId, outcomes: r.outcomes.length, covered: n("covered"), partial: n("partial") + n("above-level") + n("below-level"), gap: n("gap"), unmapped: n("unmapped") + n("no-course"),
      extracted: Boolean(spec.extracted), checked: Boolean(spec.checked) };
    measure.mappedShare = measure.outcomes ? (measure.outcomes - measure.unmapped) / measure.outcomes : 0;
  }
  const verified = measure && measure.checked && kb.outcomeLessons.filter((m) => m.spec === specId).every((m) => m.mapped.by !== "automated");
  const status = verified ? "verified" : measure && measure.mappedShare > 0 ? "measured" : aligned.length ? "aligned" : teach.length ? "subject" : related.length ? "related" : "none";
  return { ...row, bodyName: BODIES[row.body]?.name || row.body, subjectName: SUBJECTS[row.subject]?.[0] || row.subject, group: SUBJECTS[row.subject]?.[1] || "Other", courses: teach, related, aligned, measure, status };
}

/** The whole matrix, with totals by nation, band, group and status. */
export function matrix(kb, lessons = null) {
  const ix = indexOf(kb), resolved = ROWS.map((r) => resolveRow(r, kb, lessons, ix));
  const tally = (f) => { const m = {}; for (const r of resolved) for (const k of [].concat(f(r))) { m[k] ??= Object.fromEntries(LEVELS.map((l) => [l, 0])); m[k][r.status]++; } return m; };
  const outcomes = resolved.filter((r) => r.measure).reduce((a, r) => ({ outcomes: a.outcomes + r.measure.outcomes, covered: a.covered + r.measure.covered, partial: a.partial + r.measure.partial, gap: a.gap + r.measure.gap, unmapped: a.unmapped + r.measure.unmapped }), { outcomes: 0, covered: 0, partial: 0, gap: 0, unmapped: 0 });
  return {
    rows: resolved,
    byStatus: Object.fromEntries(LEVELS.map((l) => [l, resolved.filter((r) => r.status === l).length])),
    byNation: tally((r) => r.nations), byBand: tally((r) => r.band), byGroup: tally((r) => r.group), byQualification: tally((r) => r.qualification || `curriculum:${r.band}`),
    byBody: tally((r) => r.body),
    outcomes,
  };
}
