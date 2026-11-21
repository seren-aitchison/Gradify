// Moving between related parts of Gradify without hunting: the learner shouldn't need to know which area holds
// which resource, so the page brings them.
//
//   resourceSwitcher({ kicker: "Organic chemistry · Alkenes", title: "What would you like to do next?", items: [
//     { icon: "notes", label: "Revision notes", desc: "The key ideas on one page.", run | href, meta: "2 min", primary },
//   ] })
//   courseCard({ site, course, status, pct, done, total, next: { label, mins, href }, href })
//
// Both return HTML; wireActions(el, items) connects the items that run code instead of linking.
import { esc, ensureStyles } from "./store.js";
import { uiIcon } from "./icons.js";

export function resourceSwitcher({ kicker = "", title = "What would you like to do next?", items = [], id = "" } = {}) {
  ensureStyles();
  const list = items.filter(Boolean);
  if (!list.length) return "";
  const card = (x, i) => {
    const inner = `<span class="gx-rico">${uiIcon(x.icon || "sparkles")}</span><span class="gx-rtx"><b>${esc(x.label)}</b><small>${esc(x.desc || "")}</small></span>${x.meta ? `<em>${esc(x.meta)}</em>` : ""}`;
    return x.href ? `<a class="gx-res${x.primary ? " primary" : ""}" href="${esc(x.href)}" ${x.jump ? `data-jump="${esc(x.jump)}"` : ""}>${inner}</a>`
      : `<button type="button" class="gx-res${x.primary ? " primary" : ""}" data-res="${i}">${inner}</button>`;
  };
  return `<section class="gx-switch" ${id ? `id="${esc(id)}"` : ""} aria-label="${esc(title)}">${kicker ? `<span class="gx-kicker">${esc(kicker)}</span>` : ""}<h3>${esc(title)}</h3><div class="gx-resgrid">${list.map(card).join("")}</div></section>`;
}
export function wireActions(el, items = []) {
  const list = items.filter(Boolean);
  el.querySelectorAll("[data-res]").forEach((b) => b.addEventListener("click", () => list[Number(b.dataset.res)]?.run?.()));
}

const STATUS_TEXT = { new: "Not started", started: "In progress", learned: "In progress", practised: "In progress", mastered: "Mastered", revise: "Needs revision", done: "Complete" };
/** the intelligent course card: where you are, how far through, and the one most useful next step */
export function courseCard({ site = "", course, status = "started", pct = 0, done = 0, total = 0, unitWord = "lessons", next = null, href, pinned = null, pinHref = null }) {
  ensureStyles();
  const p = Math.round(Math.max(0, Math.min(1, pct)) * 100);
  return `<article class="gx-ccard">
    <header><span class="gx-kicker">${esc(site)}</span>${pinned != null ? `<button type="button" class="gx-pinb" data-pin="${esc(pinHref || href)}" aria-pressed="${pinned}" aria-label="${pinned ? "Unpin" : "Pin"} ${esc(course)}" title="${pinned ? "Unpin" : "Pin to the top"}">${uiIcon(pinned ? "pinned" : "pin")}</button>` : ""}</header>
    <h3><a href="${esc(href)}">${esc(course)}</a></h3>
    <p class="gx-cst"><span class="gx-pill s-${esc(status)}">${esc(STATUS_TEXT[status] || status)}</span><span>${p}% complete${total ? ` · ${done} of ${total} ${esc(unitWord)}` : ""}</span></p>
    <div class="gx-bar" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100" aria-label="${esc(course)} progress"><i style="width:${Math.max(2, p)}%"></i></div>
    ${next ? `<div class="gx-cnext"><span class="gx-kicker">Recommended next${next.mins ? ` · ${esc(next.mins)} min` : ""}</span><p>${esc(next.label)}</p></div>` : ""}
    <a class="btn btn-light lg btn-sm gx-cgo" href="${esc(next?.href || href)}"><span>${next?.go ? esc(next.go) : "Continue learning"} ${uiIcon("right")}</span></a>
  </article>`;
}
