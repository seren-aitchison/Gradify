// How the AI tutor's replies are shown (kit/course/course.js): plain text only, always escaped, so nothing
// the model returns can inject markup into the page.
import { esc } from "../core/text.js";

export const paras = (t) => String(t || "").split(/\n{2,}/).map((x) => `<p>${esc(x.trim())}</p>`).join("");
export function feedbackHtml(fb) {
  const R = { met: "Met", partly: "Partly", "not yet": "Not yet" };
  const list = (xs) => `<ul>${(xs || []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  return `<div class="co-fb"><p class="co-fb-sum">${esc(fb.summary)}</p>
    <ul class="co-fb-crit">${(fb.criteria || []).map((c) => `<li class="r-${esc(String(c.rating).replace(" ", "-"))}"><span>${esc(R[c.rating] || c.rating)}</span><div><b>${esc(c.criterion)}</b><p>${esc(c.comment)}</p></div></li>`).join("")}</ul>
    <div class="co-fb-cols"><section><h4>Strengths</h4>${list(fb.strengths)}</section><section><h4>To improve</h4>${list(fb.improve)}</section></div>
    <p class="aq-note">AI feedback is provisional study feedback. It can be wrong, and a tutor or examiner may judge differently.</p></div>`;
}
