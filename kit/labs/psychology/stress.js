// The physiology of stress, step by step: the fast sympathetic–adrenal–medullary (SAM) pathway and the slower
// hypothalamic–pituitary–adrenal (HPA) axis, with cortisol's negative feedback. Toggle chronic stress to see the
// sustained activation linked to health effects. An illustrative sequence of established physiology, not a simulation.
import { shell, seg, challenges } from "../lab.js";
import { caveat, esc } from "../social/ui.js";

export const PATHS = {
  sam: { name: "SAM pathway (seconds)", steps: [
    ["Stressor perceived", "The amygdala and cortex appraise a situation as threatening. The response is to the appraisal, which is why the same event stresses some people and not others (Lazarus and Folkman, 1984)."],
    ["Hypothalamus", "Activates the sympathetic branch of the autonomic nervous system."],
    ["Sympathetic nerves", "Nerve signals reach organs directly and stimulate the adrenal medulla, the inner part of the adrenal glands."],
    ["Adrenal medulla", "Releases adrenaline and noradrenaline into the blood."],
    ["Fight or flight", "Heart rate and blood pressure rise, airways widen, glucose is released, digestion slows and pupils dilate (Cannon, 1915). When the threat passes, the parasympathetic branch restores rest and digest."]] },
  hpa: { name: "HPA axis (minutes)", steps: [
    ["Stressor continues", "If stress lasts longer than a few minutes, a slower hormonal system takes over."],
    ["Hypothalamus releases CRH", "Corticotropin-releasing hormone travels a short distance to the pituitary gland."],
    ["Pituitary releases ACTH", "Adrenocorticotropic hormone travels in the blood to the adrenal glands."],
    ["Adrenal cortex releases cortisol", "Cortisol raises blood glucose, mobilises energy and suppresses inflammation and immune activity in the short term."],
    ["Negative feedback", "Cortisol acts on the hypothalamus and pituitary to reduce CRH and ACTH, switching the response off once the stressor ends."]] },
};
const CHRONIC = "With chronic stress the HPA axis stays active and feedback can become less effective. Sustained cortisol and sympathetic activation are associated with suppressed immune function (e.g. slower wound healing in carers, Kiecolt-Glaser et al., 1995), raised blood pressure and cardiovascular risk. Much of this evidence is correlational, and individual differences in appraisal and coping are large.";
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row sx-mode"></div><div class="sx-panel"><div class="sx-time"></div><div class="sx-card" aria-live="polite"></div><div class="sx-btns sx-list"><button type="button" data-chronic>What if the stress is chronic?</button></div></div><div class="lab-ctrl"></div>`);
  const tl = $(".sx-time"), card = $(".sx-card"), ctrl = $(".lab-ctrl");
  caveat(ctrl, "An illustrative sequence of well-established physiology. Real responses overlap in time and vary between people.");
  const seen = new Set(); let p = "sam";
  const ch = challenges(ctrl, ctx, [{ id: "sam", text: "Step through the SAM pathway", test: () => PATHS.sam.steps.every((_, i) => seen.has(`sam${i}`)) }, { id: "hpa", text: "Step through the HPA axis to negative feedback", test: () => PATHS.hpa.steps.every((_, i) => seen.has(`hpa${i}`)) }, { id: "chronic", text: "Read what changes under chronic stress", test: () => seen.has("chronic") }]);
  const paint = (k = 0) => { tl.innerHTML = PATHS[p].steps.map(([n], i) => `<button type="button" data-i="${i}" aria-pressed="${i === k}"><b>${i + 1}</b><span>${esc(n)}</span></button>`).join(""); seen.add(`${p}${k}`); ch.check({}); card.innerHTML = `<h5>${esc(PATHS[p].steps[k][0])}</h5><p>${esc(PATHS[p].steps[k][1])}</p>`; };
  seg($(".lab-row.sx-mode"), Object.entries(PATHS).map(([k, v]) => [k, v.name]), p, (v) => { p = v; paint(); });
  tl.classList.add("sx-btns");
  el.addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (b) paint(Number(b.dataset.i)); if (e.target.closest("[data-chronic]")) { seen.add("chronic"); ch.check({}); card.innerHTML = `<h5>Chronic stress</h5><p>${esc(CHRONIC)}</p>`; } });
  paint();
}
