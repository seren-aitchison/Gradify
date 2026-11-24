// MyGradify academic profile: the student's academic context, saved once in `profiles.learner.academic` and read by
// every Gradify feature (one source; no feature keeps its own copy). Exactly EIGHT student-entered fields
// (docs/PROPOSAL-mygradify-catalogue.md, section 3.3):
//   country, institution, subject, offering (programme or qualification), start_year, current_stage, mode, units
// plus system metadata that isn't student-entered: verification_status (always "not_independently_verified"),
// last_updated, schema_version, catalogue_build.
// Each named field is { id, name }: `id` is a catalogue ID only when the student explicitly chose a catalogue record,
// otherwise null (typed by the student). Saving touches only `academic`: other learner settings, notes, progress,
// attempts and mastery are never read or changed here. Pure apart from saveAcademic, so Node can test it.
import { saveLearner, learnerOf } from "./profile.js";
import { isId } from "./catalogue-ids.js";

export const FIELDS = ["country", "institution", "subject", "offering", "start_year", "current_stage", "mode", "units"];
export const METADATA = ["verification_status", "last_updated", "schema_version", "catalogue_build"];
export const MAX_UNITS = 30;
export const MODES = [["full-time", "Full-time"], ["part-time", "Part-time"], ["distance", "Distance or online"], ["apprenticeship", "Apprenticeship or work-based"]];
export const COUNTRIES = [["GB", "United Kingdom"], ["US", "United States"]];
// search regions (used only to pick which catalogue list to search; never saved)
export const REGIONS = {
  GB: [["ENG", "England"], ["SCT", "Scotland"], ["WLS", "Wales"], ["NIR", "Northern Ireland"]],
  US: "AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split(" ").map((c) => [c, c]),
};
// stages offered in the first release: post-16 and higher education only (decision D2: no children's academic profiles yet)
export const STAGES = {
  GB: [["y12", "Year 12 / first year of college"], ["y13", "Year 13 / second year of college"], ["fe", "Further education or apprenticeship"], ["ug1", "University, year 1"], ["ug2", "University, year 2"], ["ug3", "University, year 3"], ["ug4", "University, year 4"], ["ug5", "University, year 5 or later"], ["pgt", "Master's"], ["pgr", "PhD or research degree"]],
  US: [["cc1", "Community college, year 1"], ["cc2", "Community college, year 2"], ["fy", "College freshman"], ["so", "College sophomore"], ["jr", "College junior"], ["sr", "College senior"], ["gr", "Graduate school"], ["phd", "Doctoral program"]],
  other: [["y1", "Year 1"], ["y2", "Year 2"], ["y3", "Year 3"], ["y4", "Year 4"], ["y5", "Year 5 or later"], ["pg", "Postgraduate"]],
};
export const stagesFor = (code) => STAGES[code] || STAGES.other;
const LIMITS = { name: 160, code: 40 };

const clean = (s, max) => String(s ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
function named(v, field, errors, { allowCode = false } = {}) {
  if (v == null || v === "") return null;
  if (typeof v !== "object") { errors.push(`${field} must be { id, name }`); return null; }
  const name = clean(v.name, LIMITS.name);
  const id = v.id == null || v.id === "" ? null : String(v.id);
  if (id && !isId(id)) { errors.push(`${field}.id isn't a catalogue ID`); return null; }
  if (!name) { errors.push(`${field} needs a name`); return null; }
  const out = { id, name };
  if (allowCode && v.code) out.code = clean(v.code, LIMITS.code);
  return out;
}

/**
 * Check and tidy an academic profile. Unknown keys are refused (the eight-field boundary), strings are trimmed and
 * capped, IDs must be catalogue IDs, years must be plausible. Returns { ok, errors, value } with `value` holding only
 * the eight fields plus metadata.
 */
export function validateAcademic(input, { now = Date.now(), build = null } = {}) {
  const errors = [];
  if (!input || typeof input !== "object") return { ok: false, errors: ["academic must be an object"], value: null };
  for (const k of Object.keys(input)) if (!FIELDS.includes(k) && !METADATA.includes(k)) errors.push(`"${k}" isn't one of the eight academic fields`);
  const year = new Date(now).getUTCFullYear();
  const value = {};
  if (input.country != null) {
    const c = input.country;
    const code = c && typeof c === "object" ? (c.code ?? null) : null;
    if (code != null && !/^[A-Z]{2}$/.test(String(code))) errors.push("country.code must be a two-letter code");
    const name = clean(c?.name ?? (COUNTRIES.find(([k]) => k === code)?.[1] || ""), 80);
    if (!name) errors.push("country needs a name"); else value.country = { code: code ?? null, name };
  }
  for (const f of ["institution", "subject", "offering"]) { const v = named(input[f], f, errors); if (v) value[f] = v; }
  if (input.start_year != null && input.start_year !== "") {
    const y = Number(input.start_year);
    if (!Number.isInteger(y) || y < year - 15 || y > year + 1) errors.push(`start_year must be between ${year - 15} and ${year + 1}`); else value.start_year = y;
  }
  if (input.current_stage != null) {
    const s = input.current_stage, key = clean(s?.value, 20), label = clean(s?.label, 80);
    if (!key || !label) errors.push("current_stage needs a value and a label"); else value.current_stage = { value: key, label };
  }
  if (input.mode != null && input.mode !== "") {
    if (!MODES.some(([m]) => m === input.mode)) errors.push("mode isn't a known study mode"); else value.mode = input.mode;
  }
  if (input.units != null) {
    if (!Array.isArray(input.units)) errors.push("units must be a list");
    else {
      if (input.units.length > MAX_UNITS) errors.push(`no more than ${MAX_UNITS} modules`);
      const seen = new Set(), units = [];
      for (const [i, u] of input.units.slice(0, MAX_UNITS).entries()) {
        const v = named(u, `units[${i}]`, errors, { allowCode: true });
        if (!v) continue;
        const k = (v.id || v.name).toLowerCase(); if (seen.has(k)) continue; seen.add(k);
        units.push(v);
      }
      value.units = units;
    }
  }
  value.verification_status = "not_independently_verified";
  value.last_updated = new Date(now).toISOString();
  value.schema_version = 1;
  value.catalogue_build = build ?? (typeof input.catalogue_build === "string" ? clean(input.catalogue_build, 40) : null);
  return { ok: !errors.length, errors, value };
}

/** The student's academic profile, or null. */
export const academicOf = (learner) => (learner?.academic && typeof learner.academic === "object" ? learner.academic : null);

/** How many of the eight fields are filled: shown as progress, never as a penalty. */
export function completeness(academic) {
  const a = academic || {};
  const filled = FIELDS.filter((f) => (f === "units" ? (a.units || []).length > 0 : a[f] != null));
  return { filled: filled.length, total: FIELDS.length, missing: FIELDS.filter((f) => !filled.includes(f)) };
}

/** A one-line summary, e.g. "BSc Chemistry · Northmoor University · University, year 2". */
export function summary(academic) {
  const a = academic || {};
  return [a.offering?.name || a.subject?.name, a.institution?.name, a.current_stage?.label].filter(Boolean).join(" · ");
}

/**
 * Save the academic profile to the student's account (profiles.learner, own-row protected) and this browser. Only the
 * `academic` key changes; everything else in the learner object is kept. Throws on invalid input.
 */
export async function saveAcademic(store, academic, opts = {}) {
  const res = validateAcademic(academic, opts);
  if (!res.ok) { const err = new Error(res.errors[0]); err.errors = res.errors; throw err; }
  const next = await saveLearner(store, { academic: res.value });
  return next.academic;
}
/** Remove the academic profile (the student can switch personalisation off). Notes, progress and mastery stay. */
export async function clearAcademic(store) {
  return saveLearner(store, { academic: null });
}
export { learnerOf };

// ---------- module management (MyGradify dashboard): every change returns a new academic object for saveAcademic ----------
const sameUnit = (a, b) => (a.id && b.id ? a.id === b.id : a.name.trim().toLowerCase() === b.name.trim().toLowerCase());
/** Add a typed module (id: null). Refuses a duplicate or more than the cap. */
export function addUnit(academic, { name, code } = {}) {
  const units = [...(academic?.units || [])], u = { id: null, name: String(name || "").trim(), ...(code && String(code).trim() ? { code: String(code).trim() } : {}) };
  if (!u.name) throw new Error("Give the module a name.");
  if (units.some((x) => sameUnit(x, u))) throw new Error("That module is already in your list.");
  if (units.length >= MAX_UNITS) throw new Error(`You can add up to ${MAX_UNITS} modules.`);
  return { ...(academic || {}), units: [...units, u] };
}
/** Edit a module the student typed. A module linked to Gradify's list keeps its catalogue name (remove it instead). */
export function updateUnit(academic, index, { name, code } = {}) {
  const units = [...(academic?.units || [])], cur = units[index];
  if (!cur) throw new Error("That module isn't in your list.");
  if (cur.id) throw new Error("This module comes from Gradify's list, so its name can't be changed here.");
  const next = { id: null, name: String(name ?? cur.name).trim(), ...(code ?? cur.code ? { code: String(code ?? cur.code).trim() } : {}) };
  if (!next.name) throw new Error("Give the module a name.");
  if (!next.code) delete next.code;
  if (units.some((x, i) => i !== index && sameUnit(x, next))) throw new Error("That module is already in your list.");
  units[index] = next;
  return { ...academic, units };
}
/** Remove a module from this year's list. Study progress isn't stored on modules, so nothing else changes. */
export function removeUnit(academic, index) {
  const units = [...(academic?.units || [])];
  if (!units[index]) throw new Error("That module isn't in your list.");
  units.splice(index, 1);
  return { ...academic, units };
}
/** Plain words for where a value came from. */
export const sourceLabel = (v) => (v?.id ? "From Gradify's list" : "Entered by you");
