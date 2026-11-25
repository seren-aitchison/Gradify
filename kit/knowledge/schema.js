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
import { checkForms } from "./forms.js";

export const KINDS = {
  concept: "an idea, explained", definition: "a term and what it means", fact: "a single checkable statement",
  mechanism: "how something happens, step by step", equation: "a relationship, with its quantities", method: "how to do a calculation or procedure",
  "worked-example": "a problem solved step by step", practical: "an experiment or technique, with its method, variables, safety and analysis", misconception: "a common wrong idea and the right one",
  application: "using the idea in situations, with outcomes", dataset: "a set of data to interpret, with where it came from",
};

/**
 * What a licence lets Gradify do. Gradify is a paid product. Five categories, each with explicit permitted uses:
 *   public-domain        no copyright: adapt, use commercially, no attribution needed
 *   commercial-adapt     open licences that allow adaptation and commercial use (CC BY, OGL), with attribution
 *   noncommercial-only   adaptation allowed, but not for a paid product (CC BY-NC, CC BY-NC-SA): for Gradify, verify only
 *   verify-only          readable, but no adaptation (CC BY-ND, ShareAlike for Gradify's purposes, all rights reserved)
 *   unknown              permissions not established: not even for verification until a person checks the licence
 * `uses`: adapt (rewrite or build on its text in Gradify's content), commercial (in a paid product), verify (read it
 * to check Gradify's own writing: facts aren't anyone's property, the wording is). A source's licence category
 * comes from its licence, but a person confirms it (source.licenceConfirmed) before any lesson built on it can be
 * published. Similarity checks are warnings that copying may have happened, never proof that a use is permitted.
 */
export const CATEGORIES = {
  "public-domain": { uses: { adapt: true, commercial: true, verify: true }, attribution: false },
  "commercial-adapt": { uses: { adapt: true, commercial: true, verify: true }, attribution: true },
  "noncommercial-only": { uses: { adapt: false, commercial: false, verify: true }, attribution: true, why: "NonCommercial: Gradify is a paid product" },
  "verify-only": { uses: { adapt: false, commercial: false, verify: true }, attribution: true, why: "no adaptation permitted" },
  unknown: { uses: { adapt: false, commercial: false, verify: false }, attribution: true, why: "permissions not established" },
};
export const LICENCES = {
  "CC0-1.0": { name: "CC0 (public domain)", category: "public-domain" },
  "PD": { name: "Public domain", category: "public-domain" },
  "CC-BY-4.0": { name: "Creative Commons Attribution 4.0", category: "commercial-adapt" },
  "OGL-3.0": { name: "Open Government Licence v3.0", category: "commercial-adapt" },
  "CC-BY-SA-4.0": { name: "Creative Commons Attribution-ShareAlike 4.0", category: "verify-only", why: "ShareAlike would put Gradify's lessons under the same licence" },
  "CC-BY-NC-4.0": { name: "Creative Commons Attribution-NonCommercial 4.0", category: "noncommercial-only" },
  "CC-BY-NC-SA-4.0": { name: "Creative Commons Attribution-NonCommercial-ShareAlike 4.0", category: "noncommercial-only", why: "NonCommercial (Gradify is a paid product) and ShareAlike" },
  "CC-BY-ND-4.0": { name: "Creative Commons Attribution-NoDerivatives 4.0", category: "verify-only", why: "NoDerivatives: no adaptation" },
  "all-rights-reserved": { name: "All rights reserved", category: "verify-only", why: "copyright: facts may be checked against it, nothing copied" },
  "unknown": { name: "Unknown or unverified", category: "unknown" },
  "gradify": { name: "Gradify's own work", category: "commercial-adapt", owned: true },
};
export const categoryOf = (licence) => LICENCES[licence]?.category || "unknown";
export const usesOf = (licence) => CATEGORIES[categoryOf(licence)].uses;
/** the old two-way policy, kept for records: may Gradify adapt it in a paid product? */
export const policyOf = (licence) => (usesOf(licence).adapt && usesOf(licence).commercial ? "reuse" : "verify-only");
for (const v of Object.values(LICENCES)) { v.reuse = CATEGORIES[v.category].uses.adapt && CATEGORIES[v.category].uses.commercial; v.attribution = !v.owned && CATEGORIES[v.category].attribution; v.why ||= CATEGORIES[v.category].why; }

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
  if (s?.licence && s.category !== categoryOf(s.licence)) p.push(`${at}: category must be ${categoryOf(s.licence)} for ${s.licence}`);
  if (s?.licenceConfirmed && !(s.licenceConfirmed.by && DATE.test(s.licenceConfirmed.on || ""))) p.push(`${at}: licenceConfirmed needs by and on`);
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
    if (k.kind === "mechanism" && !k.steps?.length) p.push(`${at}: a mechanism needs its steps`);
    for (const t of [...(k.terms || []), ...(k.forms || []).flatMap((f) => f.terms || [])]) if (!t.term || !t.definition) p.push(`${at}: each term needs term and definition`);
    p.push(...checkForms(k));
    const o = k.origin || { type: "original" };
    if (!["original", "adapted"].includes(o.type)) p.push(`${at}: origin must be original or adapted`);
    if (o.type === "adapted") {
      const src = sources[o.source];
      if (!src) p.push(`${at}: adapted from unknown source ${o.source}`);
      else if (!usesOf(src.licence).adapt || !usesOf(src.licence).commercial) p.push(`${at}: adapted from ${o.source}, whose licence (${src.licence}) doesn't allow commercial adaptation`);
      if (!o.passages?.length) p.push(`${at}: an adaptation names the passages it adapts`);
    }
    if (k.kind === "dataset" && !(k.data?.columns?.length && k.data?.rows?.length && k.data?.provenance)) p.push(`${at}: a dataset needs columns, rows and provenance ("illustrative", or the source it comes from)`);
    if (k.kind === "practical" && k.practical && !(k.practical.method?.length >= 4 && k.practical.variables?.independent && k.practical.variables?.dependent && k.practical.safety?.length)) p.push(`${at}: a practical needs a method, independent and dependent variables, and safety`);
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

/**
 * The publishing gate: every reason a lesson may not be published. Hard rules, not warnings:
 *   approved by a named reviewer, after passing automated QA
 *   every knowledge item it uses reviewed by a subject specialist, with an evidence trail
 *   no item adapted from a source whose licence doesn't allow commercial adaptation
 *   every source it rests on has a licence category a person has confirmed, and none is "unknown"
 *   attribution for every source that requires it
 * Similarity scores are not consulted here: they can suggest copying, never establish permission.
 */
/** a short fingerprint of a lesson's notes text (FNV-1a; no crypto, so it runs in the browser too) */
export const notesHash = (s) => { let h = 0x811c9dc5; for (const ch of String(s)) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, "0"); };
export function publishGate({ lesson, items, sources, evidence = {}, attributed = [], stale = null, notes = null }) {
  const p = [];
  // approval is of a text (RULES.md rule 14): the notes must be exactly what the reviewer approved
  if (notes == null) p.push("the lesson's notes weren't read, so the gate can't tell they are what was approved");
  else if (lesson.status === "approved" && lesson.review?.notesHash !== notesHash(notes)) p.push(lesson.review?.notesHash ? "the notes changed after approval: QA and review must run again" : "the approval doesn't record which text was approved: approve it again");
  // what changed since QA and approval (scripts/knowledge/qa.mjs impact()): knowledge for this level, or the requirement.
  // Callers must pass it; a gate run without it can't know the approval still holds.
  if (stale == null) p.push("the change check (impact) wasn't run, so the approval may describe different knowledge");
  for (const w of stale || []) p.push(`changed since QA and approval: ${w}`);
  if (lesson.status !== "approved") p.push(`the lesson is ${lesson.status}, not approved`);
  if (!lesson.review?.approvedBy) p.push("no named reviewer has approved it");
  if (lesson.qa?.result !== "pass") p.push("it hasn't passed automated QA");
  for (const k of items) {
    if (k.status !== "reviewed") p.push(`${k.id} hasn't been reviewed by a subject specialist`);
    if (!evidence[k.id]?.passages?.length) p.push(`${k.id} has no evidence trail`);
    const o = k.origin || { type: "original" };
    if (o.type === "adapted" && !(usesOf(sources[o.source]?.licence).adapt && usesOf(sources[o.source]?.licence).commercial)) p.push(`${k.id} is adapted from ${o.source}, which Gradify may not adapt commercially`);
    for (const s of k.sources) {
      const src = sources[s.source];
      if (!src) { p.push(`${k.id}: source ${s.source} has no record`); continue; }
      if (categoryOf(src.licence) === "unknown") p.push(`${s.source}: its licence is unknown or unverified`);
      if (!src.licenceConfirmed && !LICENCES[src.licence]?.owned) p.push(`${s.source}: no person has confirmed its licence (${src.licence})`);
    }
  }
  for (const id of new Set(items.flatMap((k) => k.sources.map((s) => s.source)))) { const src = sources[id]; if (src && LICENCES[src.licence]?.attribution && !attributed.includes(id)) p.push(`${id}: attribution required and missing`); }
  return [...new Set(p)];
}
