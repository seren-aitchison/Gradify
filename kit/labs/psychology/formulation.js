// Case formulation with the 5 Ps (presenting, predisposing, precipitating, perpetuating and protective factors), a common
// structure in clinical psychology training (e.g. Johnstone and Dallos, 2014). The client is invented; this teaches the
// structure of a formulation, not how to assess anyone.
import { shell } from "../lab.js";
import { caveat, sorter } from "../social/ui.js";

export const VIGNETTE = "<p><b>Alex</b> (invented), 34, has had low mood for four months, sleeps badly and has stopped seeing friends. It began after being made redundant. Alex's father had depression, and Alex grew up being told that “failure is not an option”. Since the redundancy Alex stays in bed most mornings and avoids calling friends “until I've got a job”, then feels worse for being isolated. Alex has a supportive sister, enjoys running and has coped with a hard time before, at university.</p>";
export const ITEMS = [
  { t: "Low mood, poor sleep and withdrawal for four months", cat: "Presenting", why: "the current problem" }, { t: "A family history of depression", cat: "Predisposing", why: "a long-standing vulnerability" },
  { t: "Being told that “failure is not an option” in childhood", cat: "Predisposing", why: "a learned belief that makes setbacks harder" }, { t: "Being made redundant", cat: "Precipitating", why: "the trigger for this episode" },
  { t: "Staying in bed and avoiding friends", cat: "Perpetuating", why: "withdrawal reduces positive experiences and keeps low mood going (the behavioural model)" }, { t: "The belief “I can't see friends until I've got a job”", cat: "Perpetuating", why: "a rule that maintains avoidance" },
  { t: "A supportive sister", cat: "Protective", why: "social support" }, { t: "Enjoys running", cat: "Protective", why: "an existing route back to activity" }, { t: "Coped with a hard time at university", cat: "Protective", why: "evidence of past resilience" },
];
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="sx-panel"><div class="sx-card"></div></div><div class="lab-ctrl"></div>`);
  $(".sx-card").innerHTML = VIGNETTE;
  caveat($(".lab-ctrl"), "<b>Educational exercise.</b> A real formulation is built collaboratively with the client over assessment sessions, by a qualified clinician, and is revised as understanding grows. It is a hypothesis, not a diagnosis.");
  sorter($(".sx-panel"), ctx, { id: "5ps", prompt: "Sort each factor into the 5 Ps.", cats: ["Presenting", "Predisposing", "Precipitating", "Perpetuating", "Protective"], items: ITEMS, why: "Perpetuating factors are often the target of intervention, because they keep the problem going now and can be changed (for example through behavioural activation)." });
}
