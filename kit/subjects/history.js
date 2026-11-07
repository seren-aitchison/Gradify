// The history adapter (HistoryGradify). History lessons follow content standard 2 (shared with the social sciences:
// evidence status on claims, questions at three levels) and add one check a script can make: a history lesson
// should anchor itself in time with at least one date. Reviewers are pointed at dates, figures and contested claims.
import { standard2Rules } from "./social.js";

function historyRules(unit, L, text) {
  const w = standard2Rules(unit, L);
  if (!/\b(1[0-9]|20)\d\d\b|\b\d{2,3} (BCE|CE|BC|AD)\b/.test(text)) w.push("no date anywhere in the lesson");
  return w;
}
function historyFlags(L, text) {
  const f = ["dates, names and figures: check against the cited sources"];
  if (L.evidence.some((e) => e.status === "contested")) f.push("contested interpretations: check they are presented as debated, with the main positions fairly stated");
  if (/\b(killed|died|deaths|casualties|million)\b/i.test(text)) f.push("casualty or population figures: check the range and the source");
  return f;
}

export default {
  id: "history", name: "History",
  defaults: { unitWord: "School", trackWord: "Stage", levels: ["Foundation", "Application", "Evaluation"], practiceLabel: "Lab" },
  questionTypes: [],
  qa: { expert: "a history teacher or university historian", rules: historyRules, flags: historyFlags },
};
