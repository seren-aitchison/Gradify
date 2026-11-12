// The social-science adapters (PsychGradify, SocGradify). standard2Rules is the content-standard-2 check every
// course scaffolded by scripts/new-course.mjs shares (evidence status on claims, questions at three levels); each
// subject adds its own rule on top.
const EV_STATUS = new Set(["established", "contested", "hypothetical"]);
export function standard2Rules(unit, L) {
  const w = [];
  if (!L.evidence?.length) w.push("no evidence-status (EV:) lines");
  for (const e of L.evidence || []) if (!EV_STATUS.has(e.status)) w.push(`evidence status "${e.status}" isn't established, contested or hypothetical`);
  const levels = new Set([...L.mcq.map((m) => m.d), ...L.tasks.map((t) => t.d)]);
  if (levels.size < 3) w.push("questions don't cover all three levels (Foundation, Application, Evaluation)");
  return w;
}
function psychRules(unit, L, text) {
  const w = standard2Rules(unit, L);
  // psychopathology and clinical schools: say what the lesson is not
  if ([8, 9].includes(unit.n) && !/not (a )?(diagnos|therapy|treatment|clinical advice)|qualified (professional|clinician)|educational/i.test(text + L.blocks.filter((b) => b.t === "safe").map((b) => b.x).join(" "))) w.push("clinical lesson without an education-not-diagnosis statement");
  return w;
}
function socRules(unit, L, text) {
  const w = standard2Rules(unit, L);
  // a percentage or rate should carry the year or period it describes
  // (worked examples with invented numbers must say so: "illustrative")
  if (/\d+(\.\d+)?\s?(%|per cent)/.test(text) && !/(19|20)\d\d/.test(text) && !/illustrative|invented/i.test(text)) w.push("a statistic without a year");
  return w;
}

const defaults = { unitWord: "School", trackWord: "Stage", practiceLabel: "Lab" };
export const psychology = {
  id: "psychology", name: "Psychology", defaults, questionTypes: [],
  qa: { expert: "a university psychology lecturer or chartered psychologist", rules: psychRules, flags: () => [] },
};
export const sociology = {
  id: "sociology", name: "Sociology", defaults, questionTypes: [],
  qa: { expert: "a university sociology lecturer", rules: socRules, flags: () => [] },
};
