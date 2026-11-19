// The Gradify knowledge model: the record types of the curriculum engine and the rules each must pass. Pure (no DOM, no
// I/O), so the engine, the QA script, the tests and the browser all read the same definition.
//
//   Layer 1  Universal knowledge   kit/curriculum/universal/<subject>/*.js   canonical concepts, one record each
//   Layer 2  Education systems     kit/curriculum/frameworks/<country>.js    systems, stages (years, key stages, levels)
//   Layer 3  Specifications        kit/curriculum/specifications/<country>/  what an exam board or framework requires
//   Mappings (Gradify's claims)    kit/curriculum/mappings/                  outcome → concept, lesson → concept, course → spec
//   Layer 4  Learner               the existing course engine (kit/course/) and Mastery Engine (kit/learning/)
//
// A specification records what an awarding body says. A mapping records what Gradify claims about it. They are kept
// apart on purpose: a specification can be checked against its published document; a mapping is a judgement that
// a reviewer confirms. See docs/CURRICULUM-ARCHITECTURE.md.

// Level bands: a neutral scale every education system's stages are placed on, so "the depth expected" can be compared
// across England, Wales, Scotland, Northern Ireland and, later, other countries. A band is not a qualification.
export const BANDS = ["early", "primary", "lower-secondary", "upper-secondary", "post-16", "undergraduate", "postgraduate"];
export const BAND_NAMES = {
  early: "Early years", primary: "Primary", "lower-secondary": "Lower secondary", "upper-secondary": "Upper secondary",
  "post-16": "Post-16", undergraduate: "Undergraduate", postgraduate: "Postgraduate",
};
export const bandRank = (b) => BANDS.indexOf(b);

// Review states for knowledge records and mappings. Nothing moves to "verified" without a named reviewer and a date
// (Quality Constitution, articles 2 and 3).
export const REVIEW = ["draft", "needs_review", "reviewed", "verified"];
// Sources, in the same vocabulary as SRC: lines in lesson notes (docs/CURRICULUM_CONTENT_STANDARD.md).
export const SOURCE_KINDS = ["legislation", "case", "rule", "guidance", "standard", "primary", "secondary", "data"];
export const CONCEPT_TYPES = ["process", "structure", "principle", "quantity", "law", "skill", "classification", "event", "theory"];
// How a lesson uses a concept: teaches it (the lesson's subject), applies it (uses it to explain something else), or
// mentions it (in passing; never counts towards coverage).
export const ROLES = ["teaches", "applies", "mentions"];
// The strength of a mapping claim, as in kit/curriculum/coverage.js.
export const CLAIMS = ["verified", "mapped", "aligned"];

// BIO-CELL-OSMOSIS-001: subject, domain, name, serial. Permanent: never reuse or rename an id; retire it instead.
export const CONCEPT_ID = /^[A-Z]{2,5}-[A-Z0-9]{2,12}-[A-Z0-9-]{2,40}-\d{3}$/;

const isStr = (x) => typeof x === "string" && x.trim().length > 0;
const isDate = (x) => typeof x === "string" && /^\d{4}(-\d{2}(-\d{2})?)?$/.test(x);

function checkSources(where, list, p) {
  if (!Array.isArray(list) || !list.length) { p.push(`${where}: needs at least one source`); return; }
  list.forEach((s, i) => {
    if (!isStr(s.cite)) p.push(`${where}: source ${i + 1} has no citation`);
    if (!SOURCE_KINDS.includes(s.kind)) p.push(`${where}: source ${i + 1} has unknown kind "${s.kind}"`);
    if (!isDate(s.date)) p.push(`${where}: source ${i + 1} needs a date (the version, or when it was checked)`);
    // a source is cited, not verified, until someone has checked the claim against it
    if (s.checked && !(isDate(s.checked.on) && isStr(s.checked.by))) p.push(`${where}: source ${i + 1} "checked" needs on and by`);
  });
}
function checkReview(where, r, p) {
  if (!r || !REVIEW.includes(r.status)) { p.push(`${where}: review.status must be one of ${REVIEW.join(", ")}`); return; }
  if ((r.status === "reviewed" || r.status === "verified") && !(isStr(r.by) && isDate(r.on))) p.push(`${where}: "${r.status}" needs review.by and review.on`);
}

/** Problems with one concept record (structure only; references are checked by the engine). */
export function checkConcept(c) {
  const p = [], w = c?.id || "(concept without id)";
  if (!CONCEPT_ID.test(c?.id || "")) p.push(`${w}: id must look like BIO-CELL-OSMOSIS-001`);
  if (!Number.isInteger(c.version) || c.version < 1) p.push(`${w}: version must be a whole number from 1`);
  for (const f of ["title", "subject", "domain", "definition", "explanation"]) if (!isStr(c[f])) p.push(`${w}: needs ${f}`);
  if (!CONCEPT_TYPES.includes(c.type)) p.push(`${w}: unknown type "${c.type}"`);
  for (const f of ["prerequisites", "related", "misconceptions"]) if (!Array.isArray(c[f])) p.push(`${w}: ${f} must be a list`);
  if (!c.terms || !Array.isArray(c.terms.preferred) || !c.terms.preferred.length) p.push(`${w}: terms.preferred needs at least one term`);
  for (const v of c.terms?.variants || []) if (!isStr(v.term) || !isStr(v.prefer)) p.push(`${w}: each terms.variants entry needs term and prefer`);
  const levels = Object.entries(c.levels || {});
  if (!levels.length) p.push(`${w}: needs at least one level (what is expected at a band)`);
  for (const [band, L] of levels) {
    if (!BANDS.includes(band)) p.push(`${w}: unknown band "${band}"`);
    if (!Array.isArray(L.expects) || !L.expects.length) p.push(`${w}: levels.${band}.expects needs at least one statement`);
    for (const f of ["terms", "beyond"]) if (L[f] && !Array.isArray(L[f])) p.push(`${w}: levels.${band}.${f} must be a list`);
  }
  checkSources(w, c.sources, p);
  checkReview(w, c.review, p);
  if (!Array.isArray(c.changelog) || !c.changelog.some((x) => x.version === c.version)) p.push(`${w}: changelog needs an entry for version ${c.version}`);
  return p;
}

/** Problems with one education system (frameworks/<country>.js). */
export function checkSystem(s) {
  const p = [], w = s?.id || "(system without id)";
  for (const f of ["id", "country", "name", "authority"]) if (!isStr(s[f])) p.push(`${w}: needs ${f}`);
  if (!Array.isArray(s.stages) || !s.stages.length) p.push(`${w}: needs stages`);
  const ids = new Set();
  for (const st of s.stages || []) {
    if (!isStr(st.id) || ids.has(st.id)) p.push(`${w}: stage ids must be present and unique (${st.id})`);
    ids.add(st.id);
    if (!isStr(st.name)) p.push(`${w}/${st.id}: needs name`);
    if (!BANDS.includes(st.band)) p.push(`${w}/${st.id}: unknown band "${st.band}"`);
    if (!Array.isArray(st.ages) || st.ages.length !== 2 || !(st.ages[0] <= st.ages[1])) p.push(`${w}/${st.id}: ages must be [from, to]`);
  }
  return p;
}

/** Problems with one specification (specifications/<country>/*.js). */
export function checkSpec(s) {
  const p = [], w = s?.id || "(specification without id)";
  for (const f of ["id", "body", "title", "system", "version", "url", "wording"]) if (!isStr(s[f])) p.push(`${w}: needs ${f}`);
  if (!["verbatim", "paraphrased"].includes(s.wording)) p.push(`${w}: wording must be "verbatim" or "paraphrased"`);
  if (!BANDS.includes(s.band)) p.push(`${w}: unknown band "${s.band}"`);
  // a specification's references and wording are "checked" only against the published document, by someone, on a date
  if (s.checked && !(isDate(s.checked.on) && isStr(s.checked.by))) p.push(`${w}: checked needs on and by`);
  const refs = new Set();
  for (const o of s.outcomes || []) {
    if (!isStr(o.id) || refs.has(o.id)) p.push(`${w}: outcome ids must be present and unique (${o.id})`);
    refs.add(o.id);
    if (!isStr(o.title) || !isStr(o.summary)) p.push(`${w}/${o.id}: needs title and summary`);
  }
  if (!refs.size) p.push(`${w}: needs outcomes`);
  return p;
}
