// Universal concept identity: one id for one idea, wherever it appears. "Cardiac output" in a learner's own notes,
// "Cardiac Output (CO)" in another pack and the "Cardiac output" module of MedGradify's course are the same concept,
// so evidence from each counts towards one model, and a link found in one place (a course prerequisite) applies in
// another (the learner's notes).
//
// The rule is deliberately conservative: two names are the same concept only when they normalise to the same set
// of words (case, plurals, punctuation, word order, a leading "Introduction to" and known abbreviations aside).
// "Cardiac output" and "Cardiac output regulation" stay separate: a false merge would mix evidence about different
// ideas, which is worse than missing a match. Pure, so Node can test it (tests/intel3.test.mjs).

// abbreviations common enough across Gradify's subjects to expand without evidence; learnAliases adds the learner's own
const ABBR = {
  bp: "blood pressure", hr: "heart rate", co: "cardiac output", sv: "stroke volume", ecg: "electrocardiogram", ekg: "electrocardiogram",
  mi: "myocardial infarction", copd: "chronic obstructive pulmonary disease", gfr: "glomerular filtration rate", atp: "adenosine triphosphate",
  dna: "deoxyribonucleic acid", rna: "ribonucleic acid", cns: "central nervous system", gdp: "gross domestic product", cpi: "consumer price index",
  npv: "net present value", irr: "internal rate of return", roi: "return on investment", wacc: "weighted average cost of capital",
};
const LEAD = /^(?:introduction to|intro to|an introduction to|basics of|the basics of|principles of|overview of|understanding)\s+/;
const STOP = new Set(["and", "of", "the", "in", "to", "for", "a", "an", "on", "with", "its", "their", "&"]);
const singular = (w) => (w.length <= 3 ? w : /ies$/.test(w) ? `${w.slice(0, -3)}y` : /(ss|us|is|ics)$/.test(w) ? w : /s$/.test(w) ? w.slice(0, -1) : w);

/** The normalised words of a concept name, with abbreviations expanded. */
export function canonical(name, aliases = new Map()) {
  let s = String(name || "").toLowerCase().replace(/\(([^)]*)\)/g, " ").replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim().replace(LEAD, "");
  const expand = (w) => aliases.get(w) || ABBR[w] || w;
  s = s.split(" ").map(expand).join(" ");
  return [...new Set(s.split(/[\s-]+/).filter((w) => w && !STOP.has(w)).map(singular))];
}
/** A stable id for a concept name: "c:cardiac-output". Word order doesn't matter ("contract law" = "law of contract"). */
export const conceptId = (name, aliases) => { const w = canonical(name, aliases); return w.length ? `c:${[...w].sort().join("-")}` : null; };

/** Abbreviations the learner's own cards define: "Cardiac output (CO)" teaches co → cardiac output. */
export function learnAliases(cards = []) {
  const out = new Map();
  for (const c of cards) for (const m of `${c.front || ""} ${c.back || ""}`.matchAll(/([A-Za-z][A-Za-z-]+(?:\s+[A-Za-z][A-Za-z-]+){0,3})\s*\(([A-Z][A-Za-z0-9]{1,5})\)/g)) {
    const abbr = m[2].toLowerCase(), words = m[1].toLowerCase().split(/\s+/).filter((w) => !STOP.has(w));
    // keep only the words the abbreviation's letters account for ("the heart's cardiac output (CO)" → "cardiac output")
    const take = words.slice(-Math.min(words.length, abbr.length));
    if (take.length >= 2 && take.map((w) => w[0]).join("") === abbr.slice(0, take.length)) out.set(abbr, take.join(" "));
  }
  return out;
}

/**
 * Group mentions of concepts from every source into one list of concepts.
 * @param {{ kind: string, key: string, name: string, site?: string|null }[]} mentions notes topics, course modules, lessons…
 * @returns {{ concepts: {id, name, members, sites, kinds}[], idOf: Map<string, string> }} idOf: mention key → concept id
 */
export function unify(mentions = [], aliases = new Map()) {
  const byId = new Map(), idOf = new Map();
  for (const m of mentions) {
    const id = conceptId(m.name, aliases);
    if (!id) continue;
    idOf.set(m.key, id);
    if (!byId.has(id)) byId.set(id, { id, name: m.name, members: [], sites: new Set(), kinds: new Set() });
    const c = byId.get(id);
    if (!c.members.some((x) => x.key === m.key)) c.members.push(m);
    if (m.site) c.sites.add(m.site);
    c.kinds.add(m.kind);
  }
  const concepts = [...byId.values()].map((c) => ({ ...c, sites: [...c.sites], kinds: [...c.kinds] }));
  return { concepts, idOf };
}

/** Concepts that appear in more than one place (two sites, or a course and the learner's notes). */
export const shared = (concepts) => concepts.filter((c) => c.members.length > 1 && (c.sites.length > 1 || c.kinds.length > 1));
