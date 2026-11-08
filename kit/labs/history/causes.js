// Cause and consequence: sort the factors behind three turning points into long-term causes, short-term causes and
// triggers, then read why each belongs where it does. The classifications follow standard historical accounts;
// the boundaries are matters of judgement, which the explanations say where it matters.
import { shell } from "../lab.js";
import { sorter } from "../social/ui.js";

const CATS = ["Long-term cause", "Short-term cause", "Trigger"];
export const SETS = [
  { id: "ww1", prompt: "<b>The outbreak of the First World War, 1914.</b> Sort each factor.", why: "Long-term causes created the conditions; the July Crisis turned them into war; the assassination set it off.", items: [
    { t: "The alliance system (1879–1907)", cat: "Long-term cause", why: "Built over decades, it linked a Balkan quarrel to the Great Powers." },
    { t: "The Anglo-German naval race", cat: "Long-term cause", why: "From the 1898 Navy Laws, it turned Britain against Germany." },
    { t: "Germany's \"blank cheque\" to Austria-Hungary, July 1914", cat: "Short-term cause", why: "It encouraged Vienna to act against Serbia within weeks of the assassination." },
    { t: "Russian general mobilisation, 30 July 1914", cat: "Short-term cause", why: "It set off German war plans in the final days of the crisis." },
    { t: "The assassination of Franz Ferdinand, 28 June 1914", cat: "Trigger", why: "It set events in motion, but led to war only through later decisions." },
  ] },
  { id: "revolt1381", prompt: "<b>The Peasants' Revolt, 1381.</b> Sort each factor.", why: "The Black Death changed the balance of power; government responses created grievances; the poll tax set off the rising.", items: [
    { t: "The Black Death (1348–1349) and the labour shortage it caused", cat: "Long-term cause", why: "It raised peasants' bargaining power over the following decades." },
    { t: "The Statute of Labourers (1351)", cat: "Long-term cause", why: "Thirty years of attempts to hold wages down built resentment." },
    { t: "The poll taxes of 1377 and 1379", cat: "Short-term cause", why: "They added to discontent in the years just before the revolt." },
    { t: "Tax commissioners enforcing the third poll tax in Essex, May 1381", cat: "Trigger", why: "Resistance to collection at Brentwood began the rising." },
  ] },
  { id: "hitler1933", prompt: "<b>Hitler becomes chancellor, January 1933.</b> Sort each factor.", why: "Weimar's weaknesses and resentments were long-standing; the Depression and the Nazi surge followed; the elite's deal put him in office.", items: [
    { t: "Resentment of the Treaty of Versailles (1919)", cat: "Long-term cause", why: "It discredited the republic from its first year." },
    { t: "Proportional representation and Article 48 in the Weimar constitution", cat: "Long-term cause", why: "Built in from 1919, they made government unstable in a crisis." },
    { t: "Mass unemployment in the Depression, 1930–1932", cat: "Short-term cause", why: "It drove the Nazi vote from 2.6% to 37.3% in under four years." },
    { t: "Papen's deal with Hitler and Hindenburg's decision, January 1933", cat: "Trigger", why: "The final decision that made Hitler chancellor on 30 January." },
  ] },
];
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="sx-panel"><div class="sx-head"><b>Cause and consequence</b><span>Three turning points</span></div><p class="sx-intro">Historians separate the conditions that made an event possible (long-term causes), the developments that made it likely (short-term causes) and the event that set it off (the trigger). Sort the factors, then compare your reasoning with the explanations.</p><div class="hx-sets"></div></div>`);
  for (const s of SETS) sorter($(".hx-sets"), ctx, { id: s.id, prompt: s.prompt, cats: CATS, items: s.items, why: s.why });
}
