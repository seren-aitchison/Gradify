// "Done": the moment something is finished on Gradify (a study session, a pack, a plan, a sync, a goal), shown the
// way Apple Pay confirms a payment: a ring that fills, a tick that draws itself, the double-tap haptic, then it's
// gone. One call, everywhere: complete("Plan added"). Styles: .done-* in kit/styles/components.css.
import { haptic } from "./haptics.js";

let el = null, timer = null;
export function complete(message = "Done", { sub = "" } = {}) {
  haptic("complete");
  if (typeof document === "undefined") return;
  if (!el) {
    el = document.createElement("div");
    el.className = "done-sheet"; el.setAttribute("role", "status"); el.setAttribute("aria-live", "polite");
    document.body.append(el);
  }
  el.innerHTML = `<div class="done-card"><svg class="done-mark" viewBox="0 0 52 52" aria-hidden="true"><defs><linearGradient id="done-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4641ff"/><stop offset=".5" stop-color="#f055dd"/><stop offset="1" stop-color="#ff5600"/></linearGradient></defs><circle class="done-ring" cx="26" cy="26" r="23"/><path class="done-tick" d="M15 27.5l7.2 7.2L37.5 19"/></svg><b></b><span></span></div>`;
  el.querySelector("b").textContent = message;
  el.querySelector("span").textContent = sub;
  el.classList.remove("show"); void el.offsetWidth; el.classList.add("show");
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove("show"), 1700);
}
