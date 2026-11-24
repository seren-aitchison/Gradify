// Shared pieces of the Organic Chemistry Lab's interface, so every mode uses the same patterns.
//   challengePanel(host, ctx, list, title)  the lab's challenges (kit/labs/lab.js challenges) in a collapsible panel
//                                           whose summary shows progress ("Challenges · 2 of 22 done")
//   outcomeBanner(outcome, title, detail)   the headline of a prediction: a reaction, no reaction, or not supported
import { challenges, esc } from "../lab.js";

export function challengePanel(host, ctx, list, title = "Challenges") {
  const box = document.createElement("details"); box.className = "osk-chal";
  box.innerHTML = `<summary><span>${esc(title)}</span><span class="osk-chal-n"></span></summary>`;
  host.append(box);
  const ch = challenges(box, ctx, list), count = box.querySelector(".osk-chal-n");
  const paint = () => { const n = list.filter((c) => ch.done(c.id)).length; count.textContent = `${n} of ${list.length} done`; box.classList.toggle("all", n === list.length); };
  paint();
  // "Try this" focuses a challenge: keep the panel open while one is being tried
  return { check(state) { ch.check(state); paint(); }, done: ch.done, open() { box.open = true; } };
}

const OUTCOME = {
  reaction: ["ok", "Reaction"],
  no_reaction: ["none", "No reaction"],
  unsupported: ["warn", "Not predicted"],
};
/** The headline for a prediction's outcome, with a one-line summary under it. */
export function outcomeBanner(outcome, title, detail = "") {
  const [cls, label] = OUTCOME[outcome] || OUTCOME.unsupported;
  return `<div class="osk-outcome ${cls}" role="status"><span class="osk-outcome-tag">${esc(label)}</span><div><b>${esc(title)}</b>${detail ? `<p>${esc(detail)}</p>` : ""}</div></div>`;
}
