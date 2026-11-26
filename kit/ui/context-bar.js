// Floating contextual navigation: inside a lesson, the tools that go with it, one tap away wherever you've
// scrolled to. Revision notes, flashcards, the exam-style questions, a target test, related topics, Ask AI, the
// unit quiz and the next lesson: the same list as the lesson's "What would you like to do next?" (resources.js
// items), so the two never disagree.
//
// On a wide screen it's a slim bar along the bottom, shown once the lesson's own heading has scrolled away and
// hidden again when "What would you like to do next?" is on screen (it says the same). On a phone the course's dock
// has a Tools button that opens the same list as a sheet.
//
//   const bar = mountContextBar(root, items, { label: "Cell structure" });   bar.toggle();   bar.stop();
import { esc, ensureStyles } from "./store.js";
import { uiIcon } from "./icons.js";

/** the short name on a button: the item's own, without the long tail ("Unit 3 quiz" stays, "Ask AI to explain" → "Ask AI") */
export const shortLabel = (label) => String(label || "").replace(/ to explain$/i, "").replace(/^Explore related topics$/i, "Related topics").replace(/^Exam-style questions$/i, "Questions");

export function mountContextBar(host, items = [], { label = "", hideWhen = null, after = 320 } = {}) {
  const list = items.filter(Boolean);
  if (!host || !list.length) return { stop() {}, toggle() {}, el: null };
  ensureStyles();
  const bar = document.createElement("nav");
  bar.className = "gx-ctxbar"; bar.setAttribute("aria-label", `Tools for this lesson${label ? `: ${label}` : ""}`);
  bar.innerHTML = `<span class="gx-ctxt">${esc(label || "This lesson")}</span><button type="button" class="gx-ctxx" data-ctx-close aria-label="Close">${uiIcon("close")}</button>
    <ul>${list.map((x, i) => {
      const inner = `${uiIcon(x.icon || "sparkles")}<span>${esc(shortLabel(x.label))}</span>`;
      const tip = esc(`${x.label}${x.desc ? `: ${x.desc}` : ""}`);
      return `<li>${x.href ? `<a href="${esc(x.href)}" ${x.jump ? `data-jump="${esc(x.jump)}"` : ""} title="${tip}" class="${x.primary ? "primary" : ""}">${inner}</a>` : `<button type="button" data-ctx="${i}" title="${tip}" class="${x.primary ? "primary" : ""}">${inner}</button>`}</li>`;
    }).join("")}</ul>`;
  host.append(bar);
  const close = () => bar.classList.remove("open");
  bar.addEventListener("click", (e) => {
    if (e.target.closest("[data-ctx-close]")) { close(); return; }
    const b = e.target.closest("[data-ctx]");
    if (b) list[Number(b.dataset.ctx)]?.run?.();
    if (e.target.closest("a, [data-ctx]")) close();
  });
  const onKey = (e) => { if (e.key === "Escape" && bar.classList.contains("open")) { close(); } };
  addEventListener("keydown", onKey);
  // shown once you've scrolled into the lesson, unless the page's own list of the same tools is in view
  let hiddenByPage = false;
  const io = hideWhen && "IntersectionObserver" in globalThis ? new IntersectionObserver((es) => { hiddenByPage = es.some((x) => x.isIntersecting); place(); }) : null;
  if (io && hideWhen) io.observe(hideWhen);
  const place = () => bar.classList.toggle("shown", scrollY > after && !hiddenByPage);
  addEventListener("scroll", place, { passive: true });
  place();
  return {
    el: bar,
    toggle() { bar.classList.toggle("open"); if (bar.classList.contains("open")) bar.querySelector("a, [data-ctx]")?.focus({ preventScroll: true }); },
    stop() { removeEventListener("scroll", place); removeEventListener("keydown", onKey); io?.disconnect(); bar.remove(); },
  };
}
