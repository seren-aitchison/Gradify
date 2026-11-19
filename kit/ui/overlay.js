// Modals and slide-out drawers, one implementation for every Gradify page.
//
//   const m = openModal({ title: "Keyboard shortcuts", body: html, actions: [{ label: "Done", primary: true }] });
//   const value = await m.done;        // the chosen action's value, or null when closed
//   const d = openDrawer({ side: "left", title: "Course outline", body: el });   d.close();
//
// Both: focus moves inside and is kept there (Tab cycles), Escape closes, a click on the backdrop closes, focus goes
// back to whatever opened it, the page behind is inert to screen readers and doesn't scroll. Use a modal for short
// actions that don't need their own page, never to confirm something Undo could reverse (see feedback.js).
import { esc, ensureStyles } from "./store.js";
import { uiIcon } from "./icons.js";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
const stack = [];

function layer({ cls, label, inner, onClose, closeOnBackdrop = true }) {
  ensureStyles();
  const back = document.activeElement;
  const el = document.createElement("div");
  el.className = `gx-layer ${cls}`;
  el.innerHTML = inner;
  const box = el.firstElementChild;
  box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", label);
  let resolve; const done = new Promise((r) => (resolve = r));
  const inerted = [...document.body.children].filter((c) => !c.inert && !c.classList.contains("gx-layer") && !c.classList.contains("gx-toasts"));
  const close = (value = null) => {
    if (!el.isConnected) return;
    const i = stack.indexOf(api); if (i >= 0) stack.splice(i, 1);
    el.classList.add("out");
    const finish = () => { el.remove(); if (!stack.length) { document.documentElement.classList.remove("gx-lock"); inerted.forEach((c) => (c.inert = false)); } back?.focus?.({ preventScroll: true }); };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) finish(); else setTimeout(finish, 160);
    onClose?.(value); resolve(value);
  };
  el.addEventListener("click", (e) => { if (closeOnBackdrop && e.target === el) close(); if (e.target.closest("[data-gx-close]")) close(); });
  el.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { e.stopPropagation(); e.preventDefault(); close(); return; }
    if (e.key !== "Tab") return;
    const f = [...box.querySelectorAll(FOCUSABLE)].filter((x) => x.offsetParent !== null || x === document.activeElement);
    if (!f.length) { e.preventDefault(); return; }
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
  });
  document.body.append(el);
  inerted.forEach((c) => (c.inert = true));
  document.documentElement.classList.add("gx-lock");
  const api = { el, box, close, done };
  stack.push(api);
  requestAnimationFrame(() => (box.querySelector("[autofocus]") || box.querySelector(FOCUSABLE) || box).focus?.());
  return api;
}

const bodyOf = (body) => (typeof body === "string" ? body : "");
const attach = (api, body) => { if (body instanceof Node) api.box.querySelector(".gx-body").append(body); return api; };

/** a modal dialog; actions: [{ label, value, primary, danger, run }] (run(close) may keep it open by returning false) */
export function openModal({ title, body = "", actions = [], size = "md", label = title, onClose } = {}) {
  const api = layer({ cls: "gx-modal", label, onClose, inner: `<div class="gx-dialog gx-${size}" tabindex="-1">
    <header class="gx-dhead"><h2>${esc(title)}</h2><button type="button" class="gx-x" data-gx-close aria-label="Close">${uiIcon("close")}</button></header>
    <div class="gx-body">${bodyOf(body)}</div>
    ${actions.length ? `<footer class="gx-dfoot">${actions.map((a, i) => `<button type="button" class="btn ${a.primary ? "btn-light" : "btn-ghost"} lg btn-sm${a.danger ? " gx-danger" : ""}" data-gx-act="${i}" ${a.primary ? "autofocus" : ""}><span>${esc(a.label)}</span></button>`).join("")}</footer>` : ""}
  </div>` });
  api.box.addEventListener("click", (e) => {
    const b = e.target.closest("[data-gx-act]"); if (!b) return;
    const a = actions[Number(b.dataset.gxAct)];
    if (a.run && a.run(api.close) === false) return;
    api.close(a.value ?? a.label);
  });
  return attach(api, body);
}

/** a slide-out drawer from the left or right (navigation, contextual tools) */
export function openDrawer({ title, body = "", side = "right", label = title, onClose } = {}) {
  const api = layer({ cls: `gx-drawer gx-${side}`, label, onClose, inner: `<div class="gx-panel" tabindex="-1">
    <header class="gx-dhead"><h2>${esc(title)}</h2><button type="button" class="gx-x" data-gx-close aria-label="Close">${uiIcon("close")}</button></header>
    <div class="gx-body">${bodyOf(body)}</div></div>` });
  return attach(api, body);
}

/** is any modal or drawer open (keyboard shortcuts stand aside while one is) */
export const overlayOpen = () => stack.length > 0 || Boolean(document.querySelector(".co-modal, .gd-zoom, .cx-pal, .gx-pal"));
