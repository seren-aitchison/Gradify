// The Gradify action card: one clear next step, why it matters, and buttons that do it. First made for the degree
// tracker's "Your next best action"; use it wherever a page tells someone what to do next. Styles: .g-action in
// kit/styles/base.css. Docs: docs/DESIGN-SYSTEM.md, "Action card".
//
//   actionCard({ kicker: "Your next best action", title: "Spend 90 minutes on Statistics today.",
//                why: "Worth 10% of your degree and due in 5 days.",
//                actions: [{ label: "Add 3 sessions to my calendar", icon: "calendar", attrs: 'data-ics="0"' },
//                          { label: "Make flashcards", icon: "layers", href: "/app.html#/new", soft: true }] })
//
// Text is escaped; `icon` names come from kit/core/icons.js, or pass `iconSvg` with your own SVG.
import { icon as iconOf } from "./icons.js";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
export const SPARK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"/><path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/></svg>';

/**
 * `tag` sets the outer element (an <aside> for a page's closing call to action) and `heading` turns the title into a
 * real heading ("h2") where it belongs in the page outline.
 * @param {{ kicker?: string, title: string, why?: string, iconSvg?: string, cls?: string, tag?: string, heading?: string,
 *           actions?: { label: string, icon?: string, iconSvg?: string, href?: string, attrs?: string, soft?: boolean }[] }} o
 * @returns {string} HTML
 */
export function actionCard({ kicker = "Your next best action", title, why = "", iconSvg = SPARK, actions = [], cls = "", tag = "section", heading = "" }) {
  const btn = (a) => {
    const inner = `${a.iconSvg || (a.icon ? iconOf(a.icon) : "")}<span>${esc(a.label)}</span>`;
    const c = `g-act${a.soft ? " soft" : ""}`;
    return a.href ? `<a class="${c}" href="${esc(a.href)}" ${a.attrs || ""}>${inner}</a>` : `<button type="button" class="${c}" ${a.attrs || ""}>${inner}</button>`;
  };
  const t = heading ? `<${heading} class="g-title">${esc(title)}</${heading}>` : `<b>${esc(title)}</b>`;
  return `<${tag} class="g-action${cls ? ` ${esc(cls)}` : ""}"><span class="g-sq">${iconSvg}</span><div class="g-action-text"><span class="g-kicker">${esc(kicker)}</span>${t}${why ? `<p>${esc(why)}</p>` : ""}${actions.length ? `<div class="g-action-buttons">${actions.map(btn).join("")}</div>` : ""}</div></${tag}>`;
}
