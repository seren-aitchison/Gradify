// Specification mapping: how each statement of an official specification is (or isn't) taught by Gradify's lessons.
// Pure functions, so the course engine, topic pages, Smart Plan, the progress view, scripts and tests share them.
//
// Two documents per specification:
//   statements  data/curriculum/specs/<specId>.json, transcribed from the official document and kept out of the
//               published site (it's the awarding body's text):
//               { spec, version, source, checkedOn, statements: [{ ref, topic: [..], text, tier?, kind? }] }
//   map         kit/curriculum/maps/<specId>.json (Gradify's own work, published: refs and lesson ids, no spec text):
//               { spec, specVersion, links: { <ref>: { lessons: [{ id, coverage: "full"|"partial", note? }],
//                 status: "proposed"|"verified", proposedBy?, reviewer?, reviewedOn?, gap? } } }
//
// A statement's coverage is one of:
//   covered       verified: a lesson teaches it fully
//   partial       verified: lessons touch it but don't teach all of it (the note says what's missing)
//   missing       verified: no Gradify lesson teaches it yet (a content gap, listed, never hidden)
//   awaiting      not reviewed yet, or proposed by the matcher only. Proposals are never shown as coverage.
// A link reviewed against an older version of the specification counts as awaiting again.

// AI decisions (status "ai-confirmed" in the map, scripts/content/mapstore.mjs) are provisional, never verified:
//   mapped             an AI reviewer found a lesson teaches the statement fully
//   partially-mapped   an AI reviewer found a lesson teaches part of it
// Only "covered", "partial" and "missing" are a person's verification, and only they allow a coverage claim (claimFor).
//
// For learners, a statement's mapping is one of three states (MAPPING), always shown apart from their mastery:
//   none          Gradify has no identified link to a lesson (nothing, or only the matcher's unchecked candidates)
//   provisional   an AI-supported match nobody has verified yet: it can inform a learner's progress view, but it's never
//                 confirmed coverage, never "specification alignment", and never says a requirement is done
//   verified      a person checked it; it updates by itself when the map records their decision
// A learner's mastery and Gradify's confidence in a mapping are separate: neither is ever computed from the other.
export const COVERAGE = {
  covered: { name: "Independently verified", line: "A named reviewer confirmed a Gradify lesson teaches this statement fully." },
  partial: { name: "Partially covered (verified)", line: "A named reviewer confirmed Gradify teaches part of this statement; the note says what's missing." },
  mapped: { name: "Provisionally mapped \u2014 awaiting verification", line: "Gradify has matched this statement to a lesson, but no person has checked the match yet. It isn't counted as coverage." },
  "partially-mapped": { name: "Provisionally mapped in part \u2014 awaiting verification", line: "Gradify has matched part of this statement to a lesson, but no person has checked the match yet. It isn't counted as coverage." },
  missing: { name: "Missing", line: "A reviewer confirmed no Gradify lesson teaches this statement yet." },
  awaiting: { name: "Awaiting verification", line: "Not reviewed yet. Any suggested lessons are proposals, not coverage." },
};

/** one statement's coverage, from its link (pure) */
export function statusOf(link, specVersion, mapVersion, hash = null) {
  if (!link || (specVersion && mapVersion !== specVersion)) return "awaiting";
  // a decision holds only for the statement text it was made on
  if (hash && link.hash && link.hash !== hash) return "awaiting";
  const full = (link.lessons || []).some((l) => l.coverage === "full");
  if (link.status === "verified") return !link.lessons?.length ? "missing" : full ? "covered" : "partial";
  if (link.status === "ai-confirmed" && link.lessons?.length) return full ? "mapped" : "partially-mapped";
  return "awaiting";
}

/** every statement with its coverage, and the totals */
export function coverageReport(spec, map) {
  const rows = spec.statements.map((s) => { const link = map?.links?.[s.ref]; return { ...s, link, status: statusOf(link, spec.version, map?.specVersion, s.hash) }; });
  const count = (k) => rows.filter((r) => r.status === k).length;
  // AI decisions are counted on their own: they never make a statement "reviewed"
  const totals = { statements: rows.length, covered: count("covered"), partial: count("partial"), missing: count("missing"), mapped: count("mapped"), partiallyMapped: count("partially-mapped"),
    rejected: rows.filter((r) => r.status === "awaiting" && r.link?.status === "rejected" && (!r.hash || !r.link.hash || r.link.hash === r.hash)).length };
  totals.awaiting = totals.statements - totals.covered - totals.partial - totals.missing;
  const reviewed = totals.statements - totals.awaiting;
  return { rows, totals, reviewed, complete: totals.statements > 0 && reviewed === totals.statements, stale: Boolean(map && spec.version && map.specVersion !== spec.version) };
}

/**
 * What Gradify may say about a specification. Nothing until every statement is reviewed against the current version;
 * then only the measured share ("covers 83% of the AQA GCSE Biology specification statements"), never "covers it".
 */
export function claimFor(spec, map) {
  // only a person's verification allows a claim: AI-mapped statements count as awaiting here
  const r = coverageReport(spec, map);
  if (!r.complete || r.stale) return { allowed: false, reason: r.stale ? "the map was reviewed against an older version" : `${r.totals.awaiting} of ${r.totals.statements} statements are awaiting verification` };
  const share = (r.totals.covered + 0.5 * r.totals.partial) / r.totals.statements;
  return { allowed: true, fullyCovered: r.totals.covered, partial: r.totals.partial, missing: r.totals.missing, share, line: `Covers ${r.totals.covered} of ${r.totals.statements} specification statements fully and ${r.totals.partial} in part` };
}

/** problems with a map: unknown refs or lessons, verified links without a reviewer and date (tests, CI) */
export function checkMap(spec, map, lessonIds) {
  const p = [], refs = new Set(spec.statements.map((s) => s.ref));
  if (map.spec !== spec.spec) p.push(`map is for ${map.spec}, statements are for ${spec.spec}`);
  for (const [ref, link] of Object.entries(map.links || {})) {
    if (!refs.has(ref)) p.push(`${ref}: not a statement of ${spec.spec}`);
    for (const l of link.lessons || []) {
      if (!lessonIds.has(l.id)) p.push(`${ref}: unknown lesson ${l.id}`);
      if (!["full", "partial"].includes(l.coverage)) p.push(`${ref}: coverage must be full or partial`);
    }
    if (!["proposed", "ai-confirmed", "rejected", "verified"].includes(link.status)) p.push(`${ref}: status must be proposed, ai-confirmed, rejected or verified`);
    if (["ai-confirmed", "rejected"].includes(link.status) && !(link.by && /^\d{4}-\d{2}-\d{2}$/.test(link.on || ""))) p.push(`${ref}: an AI decision needs by and on`);
    if (link.status === "ai-confirmed" && !link.lessons?.length) p.push(`${ref}: ai-confirmed needs the lesson it confirmed`);
    if (link.status === "rejected" && !link.missing?.length) p.push(`${ref}: a rejection needs what's missing`);
    if (link.status === "verified" && !(link.reviewer && /^\d{4}-\d{2}-\d{2}$/.test(link.reviewedOn || ""))) p.push(`${ref}: verified needs a reviewer and reviewedOn`);
    if (link.status === "verified" && !link.lessons?.length && !link.gap) p.push(`${ref}: a verified gap needs a note on what's missing`);
  }
  return p;
}

// ---------- for learners: "know exactly where you stand against your specification" ----------
export const STANDING = {
  secure: "Secure", developing: "Developing", "not-started": "Not started yet", "not-on-gradify": "Not taught on Gradify yet", unmapped: "Not mapped",
};
/** a statement's mapping state for learners, from the map alone (never from the learner's answers) */
export const MAPPING = {
  none: { name: "Not mapped", line: "Gradify hasn't linked this statement to a lesson yet, so it can't measure it." },
  provisional: { name: "Provisionally mapped \u2014 awaiting verification", line: "Gradify has matched this to a lesson, but nobody has checked the match yet. Your results on that lesson show here as progress, not as a confirmed part of your specification." },
  verified: { name: "Verified mapping", line: "A person has checked which Gradify lesson teaches this statement." },
};
export const mappingOf = (status) => (["covered", "partial", "missing"].includes(status) ? "verified" : ["mapped", "partially-mapped"].includes(status) ? "provisional" : "none");
/**
 * Each statement of a learner's specification with where they stand, from their per-lesson mastery (0–1, or absent
 * when they haven't been assessed). Only verified links count: an unreviewed statement is "unmapped", never guessed.
 * A statement is as strong as the weakest lesson that fully teaches it (or the weakest of its partial lessons).
 */
export function whereYouStand(spec, map, mastery, { secure = 0.8, developing = 0.4 } = {}) {
  const rows = coverageReport(spec, map).rows.map((r) => {
    // mapping comes from the map only; standing comes from the learner's answers only (an unmapped statement has no
    // lesson to measure, so it has no standing)
    const mapping = mappingOf(r.status);
    if (r.status === "awaiting") return { ref: r.ref, topic: r.topic, standing: "unmapped", mapping };
    // a provisionally mapped statement shows where the learner stands, always with its mapping state beside it
    const evidence = mapping === "provisional" ? "ai-mapped" : "verified";
    if (r.status === "missing") return { ref: r.ref, topic: r.topic, standing: "not-on-gradify", mapping };
    const full = r.link.lessons.filter((l) => l.coverage === "full"), use = full.length ? full : r.link.lessons;
    const vals = use.map((l) => mastery[l.id]).filter((v) => typeof v === "number");
    if (!vals.length) return { ref: r.ref, topic: r.topic, standing: "not-started", mapping, evidence, lessons: use.map((l) => l.id) };
    const m = Math.min(...vals);
    return { ref: r.ref, topic: r.topic, mastery: m, standing: m >= secure ? "secure" : m >= developing ? "developing" : "not-started", mapping, evidence, lessons: use.map((l) => l.id) };
  });
  const by = Object.fromEntries(Object.keys(STANDING).map((k) => [k, rows.filter((r) => r.standing === k).length]));
  const mapped = Object.fromEntries(Object.keys(MAPPING).map((k) => [k, rows.filter((r) => r.mapping === k).length]));
  return { rows, by, mapped, next: rows.filter((r) => r.standing === "developing" || r.standing === "not-started").slice(0, 5) };
}
