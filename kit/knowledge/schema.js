// The knowledge engine's entities and their checks. Seven kinds of record, kept separate and linked by stable ids:
//
//   source        where knowledge came from, and what its licence lets Gradify do with it
//                 data/knowledge/sources/<id>.json
//   knowledge     a reusable unit of subject knowledge, written by Gradify, valid over a range of levels
//                 data/knowledge/<subject>/<topic>.json
//   requirement   one curriculum requirement: a specification statement, or a Gradify course lesson's objectives
//                 (read from kit/curriculum/specs and the courses; never copied here)
//   template      how a lesson is built at a level (kit/knowledge/templates.js)
//   lesson        one lesson instance, assembled for one requirement with one template
//                 data/knowledge/lessons/<id>/lesson.json, notes.txt (the website's notes format)
//   asset         a diagram or other learning asset, generated for a lesson or selected from the library
//   review        the QA record and the lifecycle of a lesson (inside lesson.json)
//
// A lesson records the version and fingerprint of every knowledge item, source and requirement it was built from,
// so a correction to one knowledge item, or a new version of a specification, finds every lesson to revise.
// Pure: the scripts, tests and (later) the site all use these.
import { LEVELS } from "./templates.js";

export const KINDS = {
  concept: "an idea, explained", definition: "a term and what it means", fact: "a single checkable statement",
  mechanism: "how something happens, step by step", equation: "a relationship, with its quantities", method: "how to do a calculation or procedure",
  "worked-example": "a problem solved step by step", practical: "an experiment or technique", misconception: "a common wrong idea and the right one",
  application: "using the idea in situations, with outcomes",
};

/**
 * What a licence lets Gradify do. Gradify is a paid product, so NonCommercial licences forbid reusing the text;
 * ShareAlike would bind Gradify's lessons to the same licence; NoDerivatives forbids adapting. Facts aren't
 * anyone's property, so any lawfully read source can still be used to check that Gradify's own writing is right.
 *   reuse         text may be adapted into lessons, with attribution
 *   verify-only   read to check facts; never copy or adapt its wording (QA measures overlap)
 */
export const LICENCES = {
  "CC0-1.0": { name: "CC0 (public domain)", reuse: true, attribution: false },
  "PD": { name: "Public domain", reuse: true, attribution: false },
  "CC-BY-4.0": { name: "Creative Commons Attribution 4.0", reuse: true, attribution: true },
  "CC-BY-SA-4.0": { name: "Creative Commons Attribution-ShareAlike 4.0", reuse: false, attribution: true, why: "ShareAlike would put Gradify's lessons under the same licence" },
  "CC-BY-NC-4.0": { name: "Creative Commons Attribution-NonCommercial 4.0", reuse: false, attribution: true, why: "NonCommercial: Gradify is a paid product" },
  "CC-BY-NC-SA-4.0": { name: "Creative Commons Attribution-NonCommercial-ShareAlike 4.0", reuse: false, attribution: true, why: "NonCommercial (Gradify is a paid product) and ShareAlike" },
  "CC-BY-ND-4.0": { name: "Creative Commons Attribution-NoDerivatives 4.0", reuse: false, attribution: true, why: "NoDerivatives: no adaptation" },
  "OGL-3.0": { name: "Open Government Licence v3.0", reuse: true, attribution: true },
  "all-rights-reserved": { name: "All rights reserved", reuse: false, attribution: true, why: "copyright: facts may be checked against it, nothing copied" },
  "gradify": { name: "Gradify's own work", reuse: true, attribution: false },
};
export const policyOf = (licence) => (LICENCES[licence]?.reuse ? "reuse" : "verify-only");

export const LIFECYCLE = ["generated", "automated-qa", "expert-review", "approved", "published"];
/** allowed moves; a failed automated QA or a rejected review sends a lesson back to "generated" for revision */
export const NEXT = { generated: ["automated-qa"], "automated-qa": ["expert-review", "generated"], "expert-review": ["approved", "generated"], approved: ["published", "generated"], published: ["generated"] };

const ID = /^[a-z]+(\.[a-z0-9-]+)+$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** problems with a source record */
export function checkSource(s) {
  const p = [], at = s?.id || "(source)";
  if (!/^[a-z0-9-]+$/.test(s?.id || "")) p.push(`${at}: id must be lowercase words and hyphens`);
  for (const k of ["title", "publisher", "url", "retrievedOn", "version", "licence"]) if (!s?.[k]) p.push(`${at}: needs ${k}`);
  if (s?.licence && !LICENCES[s.licence]) p.push(`${at}: unknown licence ${s.licence}`);
  if (s?.licence && s.policy !== policyOf(s.licence)) p.push(`${at}: policy must be ${policyOf(s.licence)} for ${s.licence}`);
  if (s?.retrievedOn && !DATE.test(s.retrievedOn)) p.push(`${at}: retrievedOn must be YYYY-MM-DD`);
  if (!/^[0-9a-f]{64}$/.test(s?.sha256 || "")) p.push(`${at}: needs the sha256 of what was retrieved`);
  if (!Array.isArray(s?.passages) || !s.passages.length) p.push(`${at}: no passages indexed`);
  if (s?.policy === "verify-only" && s.passages?.some((x) => x.text)) p.push(`${at}: a verify-only source's text must not be stored in the repository`);
  return p;
}

/** problems with a subject's knowledge items (ids, levels, kinds, links, sources) */
export function checkKnowledge(items, sources = {}) {
  const p = [], ids = new Set();
  for (const k of items) {
    const at = k.id || "(item)";
    if (!ID.test(k.id || "")) p.push(`${at}: id must look like bio.osmosis.definition`);
    if (ids.has(k.id)) p.push(`${at}: duplicate id`); ids.add(k.id);
    if (!KINDS[k.kind]) p.push(`${at}: unknown kind ${k.kind}`);
    if (!k.title || !(k.text || k.kind === "misconception" || k.kind === "application")) p.push(`${at}: needs a title and text`);
    if (!LEVELS[k.level?.from] || (k.level?.to && !LEVELS[k.level.to])) p.push(`${at}: level needs from (and optionally to) from LEVELS`);
    else if (k.level.to && LEVELS[k.level.to].rank < LEVELS[k.level.from].rank) p.push(`${at}: level runs backwards`);
    if (!Number.isInteger(k.version) || k.version < 1) p.push(`${at}: version must be a whole number from 1`);
    if (!["draft", "reviewed"].includes(k.status)) p.push(`${at}: status must be draft or reviewed`);
    if (k.status === "reviewed" && !(k.reviewedBy && DATE.test(k.reviewedOn || ""))) p.push(`${at}: reviewed needs reviewedBy and reviewedOn`);
    if (!k.concepts?.length) p.push(`${at}: needs at least one concept tag`);
    if (!k.sources?.length) p.push(`${at}: needs at least one source (evidence for its facts)`);
    for (const s of k.sources || []) if (!sources[s.source]) p.push(`${at}: unknown source ${s.source}`);
    if (k.kind === "misconception" && !(k.wrong && k.right)) p.push(`${at}: a misconception needs wrong and right`);
    if (k.kind === "application" && !k.cases?.length) p.push(`${at}: an application needs cases`);
    if (k.kind === "equation" && !k.equation) p.push(`${at}: an equation needs its equation`);
    if (k.kind === "worked-example" && !k.steps?.length) p.push(`${at}: a worked example needs steps`);
    for (const t of k.terms || []) if (!t.term || !t.definition) p.push(`${at}: each term needs term and definition`);
  }
  for (const k of items) for (const r of [...(k.prereqs || []), ...(k.related || [])]) if (!ids.has(r)) p.push(`${k.id}: links to unknown item ${r}`);
  return p;
}

/** problems with a lesson instance record */
export function checkLesson(l) {
  const p = [], at = l?.id || "(lesson)";
  for (const k of ["id", "requirement", "template", "level", "knowledge", "status", "history", "qa"]) if (l?.[k] === undefined) p.push(`${at}: needs ${k}`);
  if (l?.status && !LIFECYCLE.includes(l.status)) p.push(`${at}: unknown status ${l.status}`);
  for (let i = 1; i < (l?.history || []).length; i++) { const [a, b] = [l.history[i - 1].status, l.history[i].status]; if (!NEXT[a]?.includes(b)) p.push(`${at}: can't move from ${a} to ${b}`); }
  if (l?.history?.length && l.history.at(-1).status !== l.status) p.push(`${at}: status isn't the last step of its history`);
  if (["approved", "published"].includes(l?.status) && !l.review?.approvedBy) p.push(`${at}: ${l.status} needs a named reviewer's approval`);
  if (l?.status === "published" && l.qa?.result !== "pass") p.push(`${at}: published without passing automated QA`);
  for (const k of l?.knowledge || []) if (!(k.id && k.version && k.hash)) p.push(`${at}: each knowledge link needs id, version and hash`);
  if (l?.requirement && !(l.requirement.id && l.requirement.hash)) p.push(`${at}: the requirement link needs id and hash`);
  return p;
}
