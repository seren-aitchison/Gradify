// Level-specific forms of one knowledge item. An item is one canonical concept with a stable id and version; its
// fields (text, steps, cases, terms, examples, summary, misconception wording, visual) are its default form, and
// `forms` override any of them for a range of levels:
//
//   { id: "bio.osmosis.definition", version: 2, title, concepts, prereqs, sources, level: { from: "ks3", to: "pg" },
//     text, terms, …                                   the default form
//     forms: [{ level: { from: "ks3", to: "gcse" }, text, terms, examples, … },   GCSE wording and depth
//             { level: { from: "alevel", to: "pg" }, text, terms, … }] }          A level and university
//
// resolve(item, level) gives the item as a lesson at that level sees it. A lesson records the fingerprint of that
// resolved form, so rewording the university form flags university lessons for revision and leaves GCSE ones alone,
// while a change to the default form (or the concept itself) flags every lesson whose form inherits it.
// Pure, so the assembler, QA, tests and (later) the site share it.
import { inRange } from "./templates.js";

const FORM_FIELDS = ["title", "text", "steps", "cases", "terms", "examples", "summary", "wrong", "right", "equation", "equationNote", "values", "visual", "practical", "data", "depth", "ask"];

/** deep merge for visual and practical overrides: objects merge, arrays and values replace */
export function merge(a, b) {
  if (b === undefined) return a;
  if (a && b && typeof a === "object" && typeof b === "object" && !Array.isArray(a) && !Array.isArray(b)) {
    const out = { ...a }; for (const [k, v] of Object.entries(b)) out[k] = merge(a[k], v); return out;
  }
  return b;
}

/** the form of an item that applies at a level: its default fields with the matching form's overrides */
export function resolve(item, level) {
  if (!inRange(item.level, level)) return null;
  const f = (item.forms || []).find((x) => inRange(x.level, level));
  const out = { ...item, form: f ? `${f.level.from}-${f.level.to || "pg"}` : "default" };
  delete out.forms;
  if (f) for (const k of FORM_FIELDS) if (f[k] !== undefined) out[k] = k === "visual" || k === "practical" || k === "data" ? merge(item[k], f[k]) : f[k];
  return out;
}

/** the fields a lesson at this level actually uses, for fingerprinting */
export function formContent(item, level) {
  const r = resolve(item, level); if (!r) return null;
  const { form, file, subject, status, reviewedBy, reviewedOn, ...rest } = r;
  return rest;
}

/** problems with an item's forms: ranges inside the item's, not overlapping, overriding only known fields */
export function checkForms(item) {
  const p = [], fs = item.forms || [];
  for (const [i, f] of fs.entries()) {
    if (!f.level?.from) { p.push(`${item.id}: form ${i + 1} needs a level`); continue; }
    if (!inRange(item.level, f.level.from) || !inRange(item.level, f.level.to || "pg")) p.push(`${item.id}: form ${f.level.from}–${f.level.to} is outside the item's levels`);
    for (const g of fs.slice(i + 1)) if (g.level && (inRange(f.level, g.level.from) || inRange(g.level, f.level.from))) p.push(`${item.id}: forms ${f.level.from}–${f.level.to} and ${g.level.from}–${g.level.to} overlap`);
    for (const k of Object.keys(f)) if (k !== "level" && !FORM_FIELDS.includes(k)) p.push(`${item.id}: a form can't override ${k}`);
  }
  return p;
}
