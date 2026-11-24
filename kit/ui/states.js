// Every page state designed, not just the happy one: empty, loading.
//
//   emptyState({ icon: "cards", title: "No flashcards due", body: "…", actions: [{ label: "Study a lesson", href: "#/learn", primary: true }] })
//   skeleton("lesson")  skeleton("list", 6)  skeleton("cards", 4)  skeleton("text", 5)
//
// An empty page always says why it's empty and offers the next step. A loading page shows the shape of what's
// coming (no spinners), and announces itself to screen readers once (aria-busy).
import { esc, ensureStyles } from "./store.js";
import { uiIcon } from "./icons.js";
import { art as drawArt, artFor } from "./art.js";

export function emptyState({ icon = "sparkles", title, body = "", actions = [], compact = false, art } = {}) {
  ensureStyles();
  // a spot illustration (kit/ui/art.js) that fits the words, instead of a lone icon; art: false keeps the icon
  const pic = art === false || compact ? `<span class="gx-eico">${uiIcon(icon)}</span>` : drawArt(art || artFor(`${title} ${body}`, "search"), { cls: "gx-eart" });
  return `<div class="gx-empty${compact ? " compact" : ""}">${pic}<b>${esc(title)}</b>${body ? `<p>${body}</p>` : ""}${actions.length ? `<div class="gx-eacts">${actions.map((a, i) => a.href
    ? `<a class="btn ${a.primary ? "btn-light" : "btn-ghost"} lg btn-sm" href="${esc(a.href)}"><span>${esc(a.label)}</span></a>`
    : `<button type="button" class="btn ${a.primary ? "btn-light" : "btn-ghost"} lg btn-sm" data-empty-act="${i}"><span>${esc(a.label)}</span></button>`).join("")}</div>` : ""}</div>`;
}
/** wire the button actions of an empty state drawn into el (links need nothing) */
export function wireEmpty(el, actions = []) {
  el.querySelectorAll("[data-empty-act]").forEach((b) => b.addEventListener("click", () => actions[Number(b.dataset.emptyAct)]?.run?.()));
}

const line = (w) => `<i class="gx-sk" style="width:${w}%"></i>`;
export function skeleton(kind = "text", n = 4, label = "Loading") {
  ensureStyles();
  const body = {
    lesson: `<div class="gx-skl">${line(18)}<i class="gx-sk gx-skh" style="width:62%"></i>${line(85)}<div class="gx-skrow">${[16, 12, 14].map((w) => `<i class="gx-sk gx-skchip" style="width:${w}%"></i>`).join("")}</div><div class="gx-skrow">${Array.from({ length: 5 }, () => `<i class="gx-sk gx-skcard"></i>`).join("")}</div>${[96, 92, 98, 70, 0, 94, 88, 97, 60].map((w) => (w ? line(w) : "<br>")).join("")}</div>`,
    list: `<div class="gx-skl">${Array.from({ length: n }, (_, i) => `<div class="gx-skli"><i class="gx-sk gx-skdot"></i>${line(40 + ((i * 23) % 45))}</div>`).join("")}</div>`,
    cards: `<div class="gx-skgrid">${Array.from({ length: n }, () => `<div class="gx-skbox">${line(30)}${line(80)}${line(55)}</div>`).join("")}</div>`,
    text: `<div class="gx-skl">${Array.from({ length: n }, (_, i) => line(i === n - 1 ? 60 : 88 + ((i * 7) % 12))).join("")}</div>`,
  }[kind] || "";
  return `<div class="gx-skeleton" aria-busy="true" aria-label="${esc(label)}" role="status">${body}<span class="sr-only">${esc(label)}…</span></div>`;
}
