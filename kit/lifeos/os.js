// LifeOS window: the sidebar switches between views. Links to anything inside a view
// (from the menu, footer, toasts or other panels) open that view first.
import { icon } from "../core/icons.js";

const $ = (s, el = document) => el.querySelector(s);
const os = $("#os");
const rail = $(".os-rail", os);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

rail.querySelectorAll("[data-icon]").forEach((el) => { el.innerHTML = icon(el.dataset.icon); });

function show(view, focusTab = false) {
  os.querySelectorAll(".os-view").forEach((v) => { v.hidden = v.dataset.view !== view; });
  rail.querySelectorAll(".rail-btn").forEach((b) => {
    const on = b.dataset.view === view;
    b.setAttribute("aria-selected", String(on));
    b.tabIndex = on ? 0 : -1;
    if (on && focusTab) b.focus();
  });
  document.dispatchEvent(new CustomEvent("lifeos:view", { detail: view }));
}

// Open the view holding `id`, then bring it into sight
function goto(id) {
  const target = document.getElementById(id);
  const v = target?.closest(".os-view");
  if (!v) return false;
  show(v.dataset.view);
  const el = target === v ? os : target;
  requestAnimationFrame(() => el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }));
  return true;
}

rail.addEventListener("click", (e) => {
  const b = e.target.closest(".rail-btn");
  if (b) show(b.dataset.view);
});
// Arrow keys move between tabs
rail.addEventListener("keydown", (e) => {
  const tabs = [...rail.querySelectorAll(".rail-btn")];
  const i = tabs.indexOf(document.activeElement);
  if (i < 0) return;
  const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
  if (!step) return;
  e.preventDefault();
  show(tabs[(i + step + tabs.length) % tabs.length].dataset.view, true);
});

document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (a && a.getAttribute("href").length > 1 && goto(a.getAttribute("href").slice(1))) e.preventDefault();
});
document.addEventListener("lifeos:goto", (e) => goto(e.detail));

show("today");
if (location.hash) goto(location.hash.slice(1));
