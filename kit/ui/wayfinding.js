// "Back to where I was": after following a link away from something (a lesson to its unit quiz, a search result to
// another course), a small chip offers the way back, to the same scroll position. It leaves by itself after a
// while, and never covers the page's own controls.
//
//   offerBack({ href, title, y })    // from kit/ui/places.js backPlace()
import { esc, ensureStyles } from "./store.js";
import { uiIcon } from "./icons.js";

let chip = null, timer = null;
export function hideBack() { clearTimeout(timer); chip?.remove(); chip = null; }

export function offerBack(place, { label = "Back to", ms = 15000, onGo = null } = {}) {
  hideBack();
  if (!place?.href) return null;
  ensureStyles();
  chip = Object.assign(document.createElement("div"), { className: "gx-back" });
  chip.setAttribute("role", "navigation"); chip.setAttribute("aria-label", "Back to where you were");
  chip.innerHTML = `<a href="${esc(place.href)}">${uiIcon("back")}<span>${esc(label)} <b>${esc(place.title || "where you were")}</b></span></a><button type="button" class="gx-tx" aria-label="Dismiss">${uiIcon("close")}</button>`;
  chip.querySelector("a").addEventListener("click", (e) => { if (onGo) { e.preventDefault(); onGo(place); } hideBack(); });
  chip.querySelector("button").addEventListener("click", hideBack);
  document.body.append(chip);
  timer = setTimeout(hideBack, ms);
  return chip;
}

/** after arriving somewhere by going back, put the page where it was (once the view has drawn) */
export function restoreScroll(y) {
  if (y == null) return;
  requestAnimationFrame(() => requestAnimationFrame(() => scrollTo({ top: y, behavior: "instant" })));
}
