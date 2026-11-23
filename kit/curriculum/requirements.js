// The official-requirement record: one statement from a published curriculum or specification, as Gradify stores it
// (data/curriculum/requirements/*.json). Shared by the extractor's output, the import script
// (scripts/curriculum/import-requirements.mjs) and the tests, so a dataset made elsewhere — such as an earlier
// extraction of the England specifications — can be checked and merged instead of being recreated. Pure.
//
//   checkSource(id, source)     → [] or problems
//   checkRequirement(r, sources) → [] or problems

// [field, required, what it holds]
export const SOURCE_FIELDS = [
  ["name", true, "The document's title."], ["body", true, "Who publishes it (Department for Education, AQA, …)."],
  ["url", true, "Where the published document is."], ["version", true, "The document's own version or issue, and date."],
  ["retrieved", true, "YYYY-MM-DD the document was downloaded."], ["status", true, "statutory or examination."],
  ["notExtracted", false, "Parts of the document not yet extracted (practical skills, appendices, companion specifications)."],
];
export const REQUIREMENT_FIELDS = [
  ["id", true, "Stable id: <system>-<source key>-<the document's own reference>, e.g. eng-aqa8461-4.1.1.2."],
  ["source", true, "Key into the dataset's sources."], ["text", true, "The requirement's wording, preserved from the document."],
  ["loc", true, "Page or line in the source document."], ["status", true, "statutory or examination."],
  ["keyStage", true, "KS1–KS5 (England); the system's equivalent elsewhere."], ["years", true, "School years the document assigns, or the whole stage."],
  ["yearAllocation", true, "year (the document sets the year), phase (a group of years), or stage (only the key stage)."],
  ["discipline", true, "biology, or science-wide for working scientifically."], ["topic", false, "The document's topic heading."],
  ["subtopic", false, "The document's sub-heading."], ["ref", false, "The document's own reference for the statement."],
  ["curriculum", false, "The curriculum or qualification's name."], ["qualification", false, "A key into QUALIFICATIONS (kit/curriculum/coverage.js)."],
  ["body", false, "The publisher."], ["title", false, "The section title, where the document gives one."], ["include", false, "The document's 'to include' detail."],
  ["separateOnly", false, "true: separate science only; false: shared with Combined Science; null: the document doesn't say."],
  ["tier", false, "higher, where the statement is higher tier only."], ["practical", false, "true for a required or core practical."],
  ["corrected", false, "Set when wording was transcribed by hand because the text layer couldn't be parsed."],
  ["importedFrom", false, "For an imported record: the dataset it came from."],
];
const STATUSES = ["statutory", "examination"], ALLOC = ["year", "phase", "stage"];
const KNOWN = new Set(REQUIREMENT_FIELDS.map((f) => f[0]));

export function checkSource(id, s) {
  const p = [];
  for (const [f, req] of SOURCE_FIELDS) if (req && !s?.[f]) p.push(`source ${id}: missing ${f}`);
  if (s?.retrieved && !/^\d{4}-\d{2}-\d{2}$/.test(s.retrieved)) p.push(`source ${id}: retrieved should be YYYY-MM-DD`);
  if (s?.status && !STATUSES.includes(s.status)) p.push(`source ${id}: status should be statutory or examination`);
  return p;
}

export function checkRequirement(r, sources = {}) {
  const p = [], at = r?.id || "(no id)";
  for (const [f, req] of REQUIREMENT_FIELDS) if (req && (r?.[f] === undefined || r[f] === "")) p.push(`${at}: missing ${f}`);
  if (!r) return p;
  for (const k of Object.keys(r)) if (!KNOWN.has(k)) p.push(`${at}: unknown field ${k}`);
  if (r.id && !/^[a-z]{2,4}-[a-z0-9]+-[A-Za-z0-9.()-]+$/.test(r.id)) p.push(`${at}: id should look like eng-aqa8461-4.1.1.2`);
  if (r.source && !sources[r.source]) p.push(`${at}: source ${r.source} isn't in the dataset's sources`);
  if (r.status && !STATUSES.includes(r.status)) p.push(`${at}: status should be statutory or examination`);
  if (r.yearAllocation && !ALLOC.includes(r.yearAllocation)) p.push(`${at}: yearAllocation should be year, phase or stage`);
  if (!Array.isArray(r.years) || !r.years.every(Number.isInteger)) p.push(`${at}: years should be a list of whole numbers`);
  else if (r.yearAllocation === "year" && r.years.length !== 1) p.push(`${at}: a year allocation names exactly one year`);
  if (typeof r.text === "string" && r.text.trim().length < 7) p.push(`${at}: wording is too short to be a requirement`);
  if (r.separateOnly !== undefined && ![true, false, null].includes(r.separateOnly)) p.push(`${at}: separateOnly should be true, false or null`);
  return p;
}
