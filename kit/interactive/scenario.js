// Gradify scenario engine: a reusable foundation for step-by-step reasoning exercises (clinical cases,
// legal case files, business decisions…). Subject modules supply the content and, optionally, a panel
// renderer that shows the changing "state" (vital signs, case documents, a timeline).
//
// scenario = {
//   title, intro, banner,                       banner: a standing notice (for example, simulation only)
//   state: {…},                                 initial state, shown by panel(state)
//   panel(state) → html,                        optional side panel
//   start: "stepId",
//   steps: { id: { title, text, set: {…},       set: state changes applied when the step opens (an object,
//                                               or a function of the current state returning one)
//     choices: [{ label, next, score: 0..1, feedback, critical: bool, set: {…} }],   one choice
//     multi:   { options: [{ label, correct: bool, why }], next, pass: 0..1 },        or choose all that apply
//     end: true, summary } },                   end step: shows the debrief
//   debrief(result) → html                       optional extra debrief content
// }
// Scores are averaged over the decisions made. A "critical" choice is one that would be unsafe or
// unlawful in reality: it's flagged in the debrief whatever the score.
import { esc, inline } from "../core/text.js";

// stable shuffle per step, so the best choice isn't always in the same place
const order = (n, seed) => { let s = [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 11); const idx = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { s = (s * 1664525 + 1013904223) >>> 0; const j = s % (i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; } return idx; };

export function mountScenario(el, sc, { onComplete } = {}) {
  let state = structuredClone(sc.state || {}), at = sc.start;
  const log = [];
  const paint = (feedback) => {
    const st = sc.steps[at];
    if (st.set && !feedback) Object.assign(state, typeof st.set === "function" ? st.set(state) : st.set);
    const panel = sc.panel ? `<aside class="sx-panel" aria-label="Case information">${sc.panel(state)}</aside>` : "";
    let body = "";
    if (feedback) body = `<div class="sx-feedback ${feedback.cls}" role="status"><b>${esc(feedback.head)}</b>${feedback.html}</div><button type="button" class="btn btn-light lg btn-sm" data-continue><span>Continue →</span></button>`;
    else if (st.end) body = debrief(st);
    else if (st.multi) body = `<fieldset class="sx-multi"><legend>Choose all that apply</legend>${order(st.multi.options.length, `${sc.title}${at}`).map((i) => `<label><input type="checkbox" value="${i}"><span>${inline(st.multi.options[i].label)}</span></label>`).join("")}</fieldset><button type="button" class="btn btn-light lg btn-sm" data-submit><span>Confirm</span></button>`;
    else body = `<div class="sx-choices">${order(st.choices.length, `${sc.title}${at}`).map((i) => `<button type="button" data-c="${i}">${inline(st.choices[i].label)}</button>`).join("")}</div>`;
    el.innerHTML = `<div class="sx">${sc.banner ? `<p class="sx-banner" role="note">${inline(sc.banner)}</p>` : ""}
      <div class="sx-head"><span class="co-kicker">${esc(sc.kind || "Scenario")}</span><h2>${esc(sc.title)}</h2>${log.length === 0 && !feedback && at === sc.start ? `<p>${inline(sc.intro || "")}</p>` : ""}</div>
      <div class="sx-body"><section class="sx-step"><h3>${esc(st.title || "")}</h3>${(st.text || "").split("\n").map((p) => `<p>${inline(p)}</p>`).join("")}${body}</section>${panel}</div>
      <ol class="sx-trail" aria-label="Your decisions">${log.map((x) => `<li class="${x.score >= 0.99 ? "ok" : x.score > 0 ? "part" : "no"}">${esc(x.step)}</li>`).join("")}</ol></div>`;
    el.querySelectorAll("[data-c]").forEach((b) => b.addEventListener("click", () => choose(st, st.choices[Number(b.dataset.c)])));
    el.querySelector("[data-submit]")?.addEventListener("click", () => chooseMulti(st, [...el.querySelectorAll(".sx-multi input:checked")].map((x) => Number(x.value))));
    el.querySelector("[data-continue]")?.addEventListener("click", () => paint());
    el.querySelector("[data-restart]")?.addEventListener("click", () => { state = structuredClone(sc.state || {}); at = sc.start; log.length = 0; paint(); });
    el.querySelector(".sx-step h3")?.focus?.();
  };
  const choose = (st, c) => {
    log.push({ step: st.title, choice: c.label, score: c.score ?? 0, critical: !!c.critical, feedback: c.feedback });
    if (c.set) Object.assign(state, typeof c.set === "function" ? c.set(state) : c.set);
    at = c.next;
    paint({ cls: c.critical ? "no crit" : (c.score ?? 0) >= 0.99 ? "ok" : (c.score ?? 0) > 0 ? "part" : "no", head: c.critical ? "Unsafe choice" : (c.score ?? 0) >= 0.99 ? "Good decision" : (c.score ?? 0) > 0 ? "Partly right" : "Not the best choice", html: `<p>${inline(c.feedback || "")}</p>` });
  };
  const chooseMulti = (st, picked) => {
    const o = st.multi.options, right = o.filter((x) => x.correct).length;
    const hits = picked.filter((i) => o[i].correct).length, wrong = picked.filter((i) => !o[i].correct).length;
    const score = Math.max(0, (hits - wrong) / right);
    log.push({ step: st.title, choice: picked.map((i) => o[i].label).join("; ") || "(none)", score, critical: false, feedback: "" });
    at = st.multi.next;
    paint({ cls: score >= 0.99 ? "ok" : score > 0 ? "part" : "no", head: `${hits} of ${right} found${wrong ? `, ${wrong} not relevant` : ""}`, html: `<ul>${o.map((x, i) => `<li class="${x.correct ? "ok" : ""}">${x.correct ? "✓" : "✗"} ${inline(x.label)}${x.why ? `: ${inline(x.why)}` : ""}${picked.includes(i) ? " <small>(you chose this)</small>" : ""}</li>`).join("")}</ul>` });
  };
  const debrief = (st) => {
    const score = log.length ? log.reduce((a, x) => a + x.score, 0) / log.length : 0, crit = log.filter((x) => x.critical);
    const result = { score, critical: crit.length, decisions: log.length, state };
    onComplete?.(result);
    return `<div class="sx-debrief"><p class="sx-score"><b>${Math.round(score * 100)}%</b> across ${log.length} decisions${crit.length ? ` · <span class="crit">${crit.length} unsafe decision${crit.length > 1 ? "s" : ""}</span>` : ""}</p>
      ${st.summary ? `<p>${inline(st.summary)}</p>` : ""}
      ${sc.debrief ? sc.debrief(result) : ""}
      <h4>Your decisions</h4><ol>${log.map((x) => `<li class="${x.critical ? "crit" : x.score >= 0.99 ? "ok" : "no"}"><b>${esc(x.step)}</b>: ${inline(x.choice)}${x.feedback ? `<br><small>${inline(x.feedback)}</small>` : ""}</li>`).join("")}</ol>
      <button type="button" class="btn btn-ghost lg btn-sm" data-restart><span>Try again</span></button></div>`;
  };
  paint();
}

// check a scenario's structure: every next points to a step, an end is reachable, scores in range
export function validateScenario(sc) {
  const errors = [], ids = new Set(Object.keys(sc.steps));
  if (!ids.has(sc.start)) errors.push(`start "${sc.start}" missing`);
  for (const [id, st] of Object.entries(sc.steps)) {
    const nexts = st.choices ? st.choices.map((c) => c.next) : st.multi ? [st.multi.next] : [];
    if (!st.end && !nexts.length) errors.push(`${id}: no choices and not an end`);
    for (const n of nexts) if (!ids.has(n)) errors.push(`${id}: next "${n}" missing`);
    for (const c of st.choices || []) { if (!(c.score >= 0 && c.score <= 1)) errors.push(`${id}: score out of range`); if (!c.feedback || c.feedback.length < 30) errors.push(`${id}: "${c.label.slice(0, 30)}" needs feedback`); }
    if (st.multi && !st.multi.options.some((o) => o.correct)) errors.push(`${id}: no correct option`);
  }
  // every step reachable from start, and an end reachable from every step
  const seen = new Set(), stack = [sc.start];
  while (stack.length) { const id = stack.pop(); if (seen.has(id) || !sc.steps[id]) continue; seen.add(id); const st = sc.steps[id]; (st.choices ? st.choices.map((c) => c.next) : st.multi ? [st.multi.next] : []).forEach((n) => stack.push(n)); }
  for (const id of ids) if (!seen.has(id)) errors.push(`${id}: unreachable`);
  if (![...seen].some((id) => sc.steps[id].end)) errors.push("no reachable end");
  return errors;
}
