// The law adapter (LawGradify). SQE1-style single best answers need five options (minWrong in
// scripts/qa-courses.mjs); core legal content should cite authority; reviewers are pointed at changing law.
const srcYear = (L) => Math.max(0, ...L.sources.map((x) => Number(String(x.date).slice(0, 4)) || 0));
function lawFlags(L, text) {
  const f = [];
  if (/£\s?\d/.test(text)) f.push("money figures (fees, limits, thresholds) that change");
  if (srcYear(L) >= 2024 || /\b(Bill|not yet in force|expected to|when in force|commencement|consultation)\b/i.test(text)) f.push("recent or changing law");
  if (/\bCPR\b|\bCrimPR\b|\bPD\s?\d|\br(ule)?\s\d+\.\d+/.test(text)) f.push("procedure rule numbers (not yet checked)");
  if (L.sources.some((x) => x.kind === "guidance" || x.kind === "rule")) f.push("regulator guidance or rules (not yet checked)");
  if (/Shayler|Nicklinson/.test(text)) f.push("citation corrected 2026-11-03: confirm");
  if (L.authorities?.length) f.push(`${L.authorities.length} case or statute card${L.authorities.length > 1 ? "s" : ""}: check facts and holdings`);
  return f;
}
function lawRules(unit, L, text) {
  const w = [];
  // single best answer: every check question should have five options
  for (const m of L.mcq) if (m.wrong.length < 4) w.push(`not five-option SBA: "${m.q.slice(0, 60)}…"`);
  // core legal content should be anchored in authority
  if (![18, 19].includes(unit.n) && !/\[\d{4}\]|\(\d{4}\)|Act \d{4}|Regulations \d{4}|\bCPR\b|\bSRA\b|Code/.test(text)) w.push("no case, statute or rule cited");
  return w;
}

export default {
  id: "law", name: "Law",
  defaults: {},
  questionTypes: [],
  qa: { expert: "a practising solicitor or barrister", rules: lawRules, flags: lawFlags },
};
