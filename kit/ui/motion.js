// Movement that keeps navigation feeling continuous, and the small helpers long pages need.
//
//   await transition(() => render());     // a subtle cross-fade between views (View Transitions where supported)
//   mountToTop();                          // a quiet "back to top" button once the page is long and scrolled
//   copyLink(url, "Link to this section copied");
//   jumpTo(el)                             // scroll to an element below the sticky bars, smoothly unless reduced motion
//
// All of it honours reduced motion: the learner's own setting (kit/data/profile.js, html[data-motion="reduce"]) or
// the system's.
import { ensureStyles } from "./store.js";
import { uiIcon } from "./icons.js";
import { toast } from "./feedback.js";

export const reduced = () => document.documentElement.dataset.motion === "reduce" || matchMedia("(prefers-reduced-motion: reduce)").matches;

/** run update() as one visual change; resolves once the new view is in place */
export async function transition(update) {
  if (!document.startViewTransition || reduced() || document.visibilityState !== "visible") return update();
  let out;
  const vt = document.startViewTransition(async () => { out = await update(); });
  try { await vt.updateCallbackDone; } catch { /* the update itself threw: it has already been reported */ }
  return out;
}

export function jumpTo(el, offset = 90) {
  if (!el) return;
  // a place inside a closed accordion opens it first, so jumping there always shows something
  if (el.matches("details")) el.open = true;
  for (let d = el.closest("details"); d; d = d.parentElement?.closest("details")) d.open = true;
  scrollTo({ top: el.getBoundingClientRect().top + scrollY - offset, behavior: reduced() ? "auto" : "smooth" });
}

let toTop = null;
export function mountToTop({ after = 1.5 } = {}) {
  if (toTop) return toTop;
  ensureStyles();
  toTop = Object.assign(document.createElement("button"), { type: "button", className: "gx-totop", hidden: true });
  toTop.setAttribute("aria-label", "Back to top"); toTop.title = "Back to top";
  toTop.innerHTML = uiIcon("up");
  toTop.addEventListener("click", () => { scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" }); document.querySelector("main, [role=main], h1")?.focus?.({ preventScroll: true }); });
  document.body.append(toTop);
  const check = () => { toTop.hidden = !(scrollY > innerHeight * after && document.documentElement.scrollHeight > innerHeight * 3); };
  addEventListener("scroll", check, { passive: true }); addEventListener("resize", check);
  // the first look waits for the next frame: measuring the page while it's still being built makes the browser lay it
  // out early (it starts hidden, and a page opened part-way down is put right by then)
  requestAnimationFrame(check);
  return toTop;
}

export async function copyLink(url, message = "Link copied") {
  const href = new URL(url, location.href).href;
  try { await navigator.clipboard.writeText(href); toast(message, { tone: "ok", key: "gx-copy", icon: "link" }); return true; }
  catch { toast({ html: `Couldn't copy automatically. The link: <code>${href.replace(/</g, "&lt;")}</code>` }, { tone: "warn", key: "gx-copy", timeout: 9000 }); return false; }
}
