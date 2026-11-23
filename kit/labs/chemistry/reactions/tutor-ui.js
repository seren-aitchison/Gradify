// The Organic Chemistry Lab's AI tutor panel. It sends the lab engine's own data (predictor.explainContext,
// electron-flow.tutorContext or a synthesis route) to Gradify AI (kit/assess/tutor.js, mode "chemistry"), with
// the learner's recent mistakes, and shows the reply. The engine stays the authority: nothing the tutor says changes a
// prediction, a mark or an evidence record. Every reply is shown with the evidence level it was given.
//   mountTutor(host, { ask, getContext, intents: [[intent, label]], learner, onUse }) → { refresh, reset }
import { esc } from "../../lab.js";

const LEVEL = {
  provisional: "Based on the lab's provisional rules (not yet independently reviewed).",
  reviewed: "Based on a rule an independent chemist has reviewed.",
  validated: "Based on a validated rule.",
  disputed: "A reviewer has disputed this rule: treat the lab's answer as uncertain.",
  unsupported: "The lab can't reliably predict this case, so the tutor won't guess a product.",
};
const newId = () => globalThis.crypto?.randomUUID?.() ?? `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
// the reply is model text: escaped, then paragraphs
const paras = (t) => esc(String(t || "")).split(/\n{2,}/).map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");

/**
 * What the learner reads when the tutor can't answer. A refusal that says why (sign-in, an allowance used up, busy) is
 * shown as it is; a request the server doesn't support yet (a 400 or 404, as when the site is updated before the
 * backend, which answers "Unknown mode.", or a ledger without the chemistry mode, "Unknown request.") becomes a plain "not available" message rather than a raw server error.
 */
export function failureText(e) {
  if (e?.reason === "unknown_mode") return UNAVAILABLE;
  if (e?.signin || e?.expired || e?.reason) return e.message || UNAVAILABLE;
  if (e?.status === 400 || e?.status === 404) return UNAVAILABLE;
  return e?.message || UNAVAILABLE;
}
const UNAVAILABLE = "The tutor isn't available for this lab right now. The lab's own working still stands, and nothing is marked as done with help.";
export function mountTutor(host, { ask = null, getContext, intents, learner = () => ({}), onUse = () => {} }) {
  host.classList.add("ct-tutor");
  // gen: the conversation's generation. Replacing the conversation (another reaction, a reset, a new question) starts a
  // new one, and a reply that arrives for an older generation is dropped: it can't land in the new conversation, under
  // its evidence label, or keep the new question from being sent.
  let intent = null, turns = [], conv = null, busy = false, lastCtx = null, gen = 0;
  if (!ask) { host.innerHTML = `<details class="ct-box"><summary>Ask the AI tutor</summary><p class="osk-aka">The AI tutor works inside the SciGradify Chemistry course, with a Gradify account. It explains what the lab works out; it never changes the lab's answers.</p></details>`; return { refresh() {}, reset() {} }; }
  host.innerHTML = `<details class="ct-box"><summary>Ask the AI tutor</summary>
    <div class="lab-row ct-intents"></div><div class="ct-level osk-aka" aria-live="polite"></div><div class="ct-log" aria-live="polite"></div>
    <form class="lab-row ct-reply" hidden><input type="text" class="ct-input" maxlength="600" placeholder="Reply to the tutor…" aria-label="Your reply"><button type="submit" class="lab-btn">Send</button></form>
    <p class="osk-aka ct-note">Gradify AI explains the lab's own result and can be wrong in how it explains it; the lab's answer is what counts. Using the tutor marks later challenges here as done with help.</p></details>`;
  const q = (s) => host.querySelector(s), log = q(".ct-log"), form = q(".ct-reply"), input = q(".ct-input");
  const replace = () => { gen++; busy = false; intent = null; turns = []; conv = null; log.innerHTML = ""; form.hidden = true; };
  function paintIntents() {
    const ctx = getContext(), box = q(".ct-intents"); lastCtx = ctx;
    box.innerHTML = ctx ? intents.filter(([k, , when]) => !when || when(ctx)).map(([k, label]) => `<button type="button" class="lab-btn${k === intent ? " pri" : ""}" data-i="${k}">${esc(label)}</button>`).join("") : `<p class="osk-aka">Choose a reaction, mechanism or route first.</p>`;
    const conf = ctx ? (ctx.outcome === "unsupported" ? "unsupported" : ctx.rule?.confidence || ctx.confidence || null) : null;
    q(".ct-level").textContent = conf ? LEVEL[conf] || "" : "";
  }
  async function send(text = null) {
    if (busy) return; const ctx = getContext(); if (!ctx) return;
    const mine = gen, myTurns = turns;
    if (text) myTurns.push({ role: "learner", text });
    busy = true; log.insertAdjacentHTML("beforeend", `${text ? `<div class="ct-msg me">${esc(text)}</div>` : ""}<div class="ct-msg wait">Thinking…</div>`);
    try {
      const out = await ask({ mode: "chemistry", intent, context: ctx, learner: learner(), turns: myTurns.slice(), conversationId: conv });
      if (mine !== gen) return; // the conversation was replaced while this was pending
      onUse();
      log.querySelector(".wait")?.remove();
      myTurns.push({ role: "tutor", text: out.reply || "" });
      log.insertAdjacentHTML("beforeend", `<div class="ct-msg ai">${paras(out.reply)}</div>`);
      form.hidden = false;
    } catch (e) {
      if (mine !== gen) return;
      log.querySelector(".wait")?.remove();
      if (text) myTurns.pop();
      log.insertAdjacentHTML("beforeend", `<p class="lab-msg">${esc(failureText(e))}</p>`);
    } finally { if (mine === gen) busy = false; }
  }
  q(".ct-intents").addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (!b) return; const next = b.dataset.i; replace(); intent = next; conv = newId(); paintIntents(); send(); });
  form.addEventListener("submit", (e) => { e.preventDefault(); const t = input.value.trim(); if (!t || !intent) return; input.value = ""; send(t); });
  paintIntents();
  return {
    // the lab's data changed (another reaction, step or route): the conversation starts again
    refresh() { const ctx = getContext(); if (JSON.stringify(ctx) !== JSON.stringify(lastCtx)) replace(); paintIntents(); },
    reset() { replace(); paintIntents(); },
  };
}
