// One way to show a six-dimension mastery profile (kit/learning/mastery.js sixProfile), used by the
// app's topic pages and every course's My progress. Styles: .mx-six in kit/styles/components.css.
import { SIX, ENOUGH } from "./mastery.js";

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const pct = (v) => `${Math.round(v * 100)}%`;
const CERTAINTY = { low: "low certainty", medium: "medium certainty", high: "high certainty" };

export const HOW = {
  recognition: "Comes from multiple-choice, true-or-false, matching and ordering questions.",
  recall: "Comes from flashcards and typed answers.",
  explain: "Comes from short written answers and Explain cards.",
  apply: "Comes from calculations, hard case questions and Apply cards.",
  transfer: "Comes from first tries at medium or hard questions in mixed exams and reviews, away from the lesson.",
  retention: "Comes from answering a question again a day or more after you last saw it.",
};

export function sixHtml(p, { how = HOW } = {}) {
  return `<ul class="mx-six">${SIX.map((d) => {
    const v = p.dims[d.key], thin = v.certainty === "insufficient", none = v.certainty === "none";
    const note = none ? `No evidence yet. ${how[d.key]}` : thin ? `Not enough evidence yet: ${v.n} ${v.n === 1 ? "answer" : "answers"}, ${ENOUGH} needed. ${how[d.key]}`
      : `${d.what} · ${v.n} answers${v.assisted ? `, ${v.assisted} after feedback` : ""} · ${CERTAINTY[v.certainty]}`;
    return `<li class="${none ? "none" : thin ? "thin" : ""}"><div class="mx-top"><b>${d.label}</b><em>${none ? "No evidence" : thin ? `~${pct(v.value)}` : pct(v.value)}</em></div>
      <span class="mx-bar"><i style="width:${none ? 0 : Math.round(v.value * 100)}%" class="${!none && !thin && v.value >= 0.7 ? "ok" : ""}"></i></span><small>${esc(note)}</small></li>`;
  }).join("")}</ul>`;
}

export function calibrationHtml(p) {
  const c = p.calibration; if (!c) return "";
  const acc = c.accuracyWhenSure;
  return `<p class="mx-cal">${c.sure ? `When you said you were sure, you were right ${pct(acc)} of the time (${c.sure} answers).` : "You haven't marked any answers as sure yet."}${c.sureWrong ? ` ${c.sureWrong} confident ${c.sureWrong === 1 ? "mistake is" : "mistakes are"} worth checking: they're the ones that turn into misconceptions.` : ""}${c.guessRight >= 3 ? ` ${c.guessRight} guesses were right, so you know more than you think.` : ""}</p>`;
}
