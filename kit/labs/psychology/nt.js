// Neurotransmitters and receptors: an explorer of the main transmitters, their receptors and the drugs that act on them,
// then a sorting exercise on agonists and antagonists. Drug descriptions are mechanisms for study, not medical advice.
import { shell, seg, challenges } from "../lab.js";
import { caveat, sorter, table, esc } from "../social/ui.js";

export const NT = [
  ["Glutamate", "The main excitatory transmitter in the brain", "Ionotropic (AMPA, NMDA, kainate) and metabotropic (mGluR)", "Learning and memory (NMDA receptors in long-term potentiation)", "Ketamine blocks NMDA receptors (antagonist)"],
  ["GABA", "The main inhibitory transmitter in the brain", "GABA-A (ionotropic, a chloride channel) and GABA-B (metabotropic)", "Reducing neural excitability; anxiety, sleep, seizures", "Benzodiazepines and alcohol enhance GABA-A responses (positive allosteric modulators)"],
  ["Dopamine", "A monoamine; modulatory", "Metabotropic D1–D5", "Movement (nigrostriatal pathway), reward prediction and motivation (mesolimbic pathway)", "Antipsychotics block D2 receptors; amphetamine and cocaine raise synaptic dopamine; L-DOPA is a precursor used in Parkinson's disease"],
  ["Serotonin (5-HT)", "A monoamine; modulatory", "Mostly metabotropic (5-HT1, 5-HT2…); 5-HT3 is ionotropic", "Mood, sleep, appetite, impulse control", "SSRIs block its reuptake; LSD and psilocybin are 5-HT2A agonists"],
  ["Noradrenaline", "A monoamine; modulatory, and a hormone from the adrenal medulla", "Metabotropic α and β adrenoceptors", "Arousal, attention, the fight-or-flight response", "Beta-blockers block β receptors and reduce the physical symptoms of anxiety"],
  ["Acetylcholine", "Excitatory at the neuromuscular junction; modulatory in the brain", "Nicotinic (ionotropic) and muscarinic (metabotropic)", "Muscle contraction, attention, memory", "Nicotine is a nicotinic agonist; curare a nicotinic antagonist; cholinesterase inhibitors are used in Alzheimer's disease"],
  ["Endorphins", "Neuropeptides (endogenous opioids)", "Opioid receptors (μ, δ, κ), metabotropic", "Pain relief, reward", "Morphine and heroin are μ-receptor agonists; naloxone is an antagonist used to reverse overdose"],
];
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row sx-mode"></div><div class="sx-panel"></div><div class="lab-ctrl"></div>`);
  const host = $(".sx-panel"), ctrl = $(".lab-ctrl");
  caveat(ctrl, "Mechanisms for study only. Most transmitters act at several receptor types, and most drugs at several transmitters: the “one chemical, one function” picture is a simplification.");
  const ch = challenges(ctrl, ctx, [{ id: "browse", text: "Read the profile of every transmitter", test: (x) => x.seen.size >= NT.length }]); const st = { seen: new Set() };
  function explore() {
    host.innerHTML = `<div class="sx-btns sx-list" role="group" aria-label="Transmitters">${NT.map((n, i) => `<button type="button" data-i="${i}">${esc(n[0])}</button>`).join("")}</div><div class="sx-card" aria-live="polite"></div>`;
    const show = (i) => { st.seen.add(i); ch.check(st); host.querySelectorAll("[data-i]").forEach((b) => b.setAttribute("aria-pressed", Number(b.dataset.i) === i)); const n = NT[i]; host.querySelector(".sx-card").innerHTML = table(["", NT[i][0]], [["Type", n[1]], ["Receptors", n[2]], ["Main roles", n[3]], ["Drugs that act here", n[4]]]); };
    host.addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (b) show(Number(b.dataset.i)); }); show(0);
  }
  function sort() {
    host.innerHTML = ""; sorter(host, ctx, { id: "agonist", prompt: "Is each drug an <b>agonist</b> (mimics or enhances the transmitter's effect) or an <b>antagonist</b> (blocks it)?", cats: ["Agonist", "Antagonist"], why: "Agonists activate receptors or increase transmitter action; antagonists bind without activating, blocking the transmitter.",
      items: [{ t: "Morphine at μ-opioid receptors", cat: "Agonist" }, { t: "Naloxone at μ-opioid receptors", cat: "Antagonist" }, { t: "Haloperidol (an antipsychotic) at D2 receptors", cat: "Antagonist" }, { t: "Nicotine at nicotinic acetylcholine receptors", cat: "Agonist" }, { t: "Curare at nicotinic acetylcholine receptors", cat: "Antagonist" }, { t: "Ketamine at NMDA receptors", cat: "Antagonist" }, { t: "Psilocybin (as psilocin) at 5-HT2A receptors", cat: "Agonist" }, { t: "Propranolol at β-adrenoceptors", cat: "Antagonist" }] });
  }
  seg($(".lab-row.sx-mode"), [["explore", "Explore"], ["sort", "Agonist or antagonist?"]], "explore", (v) => (v === "sort" ? sort() : explore()));
  explore();
}
