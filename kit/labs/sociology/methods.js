// Methodology decision tool: answer five questions about a research project and get suggested methods, with the
// reasons and trade-offs, following standard methods texts (e.g. Bryman's Social Research Methods). A guide to thinking,
// not a rule: real designs combine methods and are justified in the researcher's own words.
import { shell, challenges } from "../lab.js";
import { caveat, esc } from "../social/ui.js";

export const QS = [
  ["aim", "What is the main aim?", [["measure", "Measure how common something is, or compare groups"], ["explain", "Test whether one thing affects another"], ["understand", "Understand meanings and experiences from the inside"], ["texts", "Analyse media, documents or online talk"]]],
  ["scale", "How many cases do you need to say something about?", [["large", "A large, representative population"], ["small", "A small number, in depth"]]],
  ["access", "Can you get at the people or setting directly?", [["yes", "Yes, they'll talk to me or let me observe"], ["hidden", "Hard to reach, hidden or would act differently if watched"], ["none", "No: only existing records or data"]]],
  ["topic", "Is the topic sensitive or personal?", [["no", "Not especially"], ["yes", "Yes (e.g. crime, health, sexuality, abuse)"]]],
  ["time", "Change over time?", [["no", "A snapshot is enough"], ["yes", "I need to follow change"]]],
];
export function recommend(a) {
  const out = [];
  if (a.aim === "measure") out.push(a.access === "none" ? ["Secondary analysis of survey or census data", "Large, often nationally representative samples (e.g. the Labour Force Survey or Understanding Society via the UK Data Service) at low cost; but you are limited to the questions others asked."] : ["A survey with a probability sample", "Standardised questions give reliable, comparable data that can be generalised to the population if the sample is random and the response rate is good; but closed questions lose depth and meaning (an interpretivist criticism)."]);
  if (a.aim === "explain") out.push(["A field or natural experiment, or a longitudinal survey with controls", "Experiments establish cause best but are rare in sociology because of ethics and artificiality; field experiments such as CV-based tests of hiring discrimination are an exception. Otherwise use longitudinal data and statistical controls, and be cautious about causal claims."]);
  if (a.aim === "understand") out.push(a.access === "hidden" ? ["Participant observation or ethnography (with careful ethical justification if covert)", "Being there reveals what people do, not just what they say, and reduces the Hawthorne effect if the researcher is accepted; covert research raises serious problems of consent (BSA guidelines)."] : ["Semi-structured or unstructured interviews", "Rapport and open questions let people explain meanings in their own words (high validity); but small samples limit generalisation, and the interviewer can shape the answers."]);
  if (a.aim === "texts") out.push(["Content analysis (quantitative) or discourse analysis (qualitative)", "Content analysis counts categories systematically and reliably across many texts; discourse analysis interprets how language constructs meanings and power. Both use existing documents, so there are no participants to influence."]);
  if (a.scale === "large" && a.aim === "understand") out.push(["Consider mixed methods", "A survey for scale plus interviews for meaning: triangulation can offset each method's weaknesses."]);
  if (a.scale === "small" && a.aim === "measure") out.push(["Reconsider the aim", "A small sample can't estimate how common something is in a population; use it for depth, or find secondary data."]);
  if (a.topic === "yes") out.push(["Plan for sensitivity", "Self-completion questionnaires or skilled one-to-one interviewing; guarantee confidentiality; signpost support; consider whether vulnerable participants need extra protection and ethics review."]);
  if (a.time === "yes") out.push(["Longitudinal or panel design", "Following the same people (e.g. the 1970 British Cohort Study) shows change and order of events; but it is costly, slow and loses participants (attrition)."]);
  if (a.access === "none" && a.aim !== "measure") out.push(["Documents and official statistics", "Official statistics are cheap and large-scale, but interpretivists argue they are social constructions that reflect how agencies record things (e.g. recorded crime)."]);
  return out;
}
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="sx-panel"><div class="sx-qs"></div><div class="sx-out" aria-live="polite"></div></div><div class="lab-ctrl"></div>`);
  const qs = $(".sx-qs"), out = $(".sx-out"), ctrl = $(".lab-ctrl"), a = {}, tried = new Set();
  caveat(ctrl, "Suggestions, not rules. A real design is justified by the research question, theory, practicalities and ethics, and often combines methods.");
  const ch = challenges(ctrl, ctx, [{ id: "one", text: "Complete one design", test: () => tried.size >= 1 }, { id: "four", text: "Try all four aims and compare the suggestions", test: () => ["measure", "explain", "understand", "texts"].every((x) => tried.has(x)) }]);
  qs.innerHTML = QS.map(([k, q, opts]) => `<fieldset class="sx-card"><legend><b>${esc(q)}</b></legend><div class="sx-btns sx-list">${opts.map(([v, t]) => `<button type="button" data-k="${k}" data-v="${v}" aria-pressed="false">${esc(t)}</button>`).join("")}</div></fieldset>`).join("");
  qs.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-k]"); if (!b) return; a[b.dataset.k] = b.dataset.v;
    qs.querySelectorAll(`[data-k="${b.dataset.k}"]`).forEach((x) => x.setAttribute("aria-pressed", x === b));
    if (QS.every(([k]) => a[k])) { tried.add(a.aim); ch.check({}); out.innerHTML = `<h4>Suggested approach</h4>${recommend(a).map(([h, d]) => `<div class="sx-card"><h5>${esc(h)}</h5><p>${esc(d)}</p></div>`).join("")}`; }
    else out.innerHTML = `<p class="sx-fb">${QS.filter(([k]) => !a[k]).length} question(s) left.</p>`;
  });
}
