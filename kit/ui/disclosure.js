// Tabs, accordions and segmented controls: ways to show less at once without hiding where things are.
//
//   el.innerHTML = tabsHtml("lesson-side", [{ id: "q", label: "Questions", html }, …], selected);
//   wireTabs(el, { scope: "chemistry", key: "sideTab", onChange(id) {} });   // arrow keys, Home/End, remembered
//
//   wireAccordion(el, { scope: "chemistry", key: "faqOpen" });   // <details data-acc="id"> remembered open/closed;
//                                                                 // a [data-acc-all] button expands or collapses all
//   segmentedHtml("view", [["next", "Next up"], ["all", "Full syllabus"]], value) + wireSegmented(el, onChange)
//
// Nesting rule: at most two levels of accordion on one page (unit → module is fine; unit → module → lesson → part is
// a maze). Open the one containing the learner's current position by default.
import { esc, ensureStyles } from "./store.js";
import { pref, setPref, prefSet } from "./prefs.js";

export function tabsHtml(id, tabs, selected = tabs[0]?.id) {
  ensureStyles();
  return `<div class="gx-tabs" data-tabs="${esc(id)}"><div class="gx-tablist" role="tablist">${tabs.map((t) => `<button type="button" role="tab" id="${esc(id)}-t-${esc(t.id)}" aria-controls="${esc(id)}-p-${esc(t.id)}" aria-selected="${t.id === selected}" tabindex="${t.id === selected ? 0 : -1}" data-tab="${esc(t.id)}">${t.icon || ""}${esc(t.label)}${t.badge ? `<small>${esc(t.badge)}</small>` : ""}</button>`).join("")}</div>${tabs.map((t) => `<div role="tabpanel" class="gx-tabpanel" id="${esc(id)}-p-${esc(t.id)}" aria-labelledby="${esc(id)}-t-${esc(t.id)}" tabindex="0" ${t.id === selected ? "" : "hidden"}>${t.html || ""}</div>`).join("")}</div>`;
}

export function wireTabs(root, { scope = null, key = null, onChange } = {}) {
  const box = root.matches?.(".gx-tabs") ? root : root.querySelector(".gx-tabs");
  if (!box) return null;
  const tabs = [...box.querySelectorAll('[role="tab"]')];
  const select = (t, focus = false) => {
    tabs.forEach((x) => { const on = x === t; x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute("aria-controls")).hidden = !on; });
    if (focus) t.focus();
    if (scope && key) setPref(scope, key, t.dataset.tab);
    onChange?.(t.dataset.tab);
  };
  const saved = scope && key ? pref(scope, key) : null, first = tabs.find((t) => t.dataset.tab === saved);
  if (first && first.getAttribute("aria-selected") !== "true") select(first);
  box.querySelector('[role="tablist"]').addEventListener("click", (e) => { const t = e.target.closest('[role="tab"]'); if (t) select(t); });
  box.querySelector('[role="tablist"]').addEventListener("keydown", (e) => {
    const i = tabs.indexOf(document.activeElement); if (i < 0) return;
    const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault(); select(tabs[(to + tabs.length) % tabs.length], true);
  });
  return { select: (id) => { const t = tabs.find((x) => x.dataset.tab === id); if (t) select(t); } };
}

export function wireAccordion(root, { scope = "gradify", key = "acc", openFirst = false } = {}) {
  ensureStyles();
  const open = prefSet(scope, key);
  const items = () => [...root.querySelectorAll("details[data-acc]")];
  const remembered = open.all();
  items().forEach((d, i) => { if (remembered.length) d.open = remembered.includes(d.dataset.acc) || d.hasAttribute("data-acc-here"); else if (openFirst && i === 0) d.open = true; });
  root.addEventListener("toggle", (e) => { const d = e.target; if (d.matches?.("details[data-acc]")) { open.toggle(d.dataset.acc, d.open); paintAll(); } }, true);
  const all = root.querySelector("[data-acc-all]");
  const paintAll = () => { if (!all) return; const shut = items().some((d) => !d.open); all.textContent = shut ? "Expand all" : "Collapse all"; all.setAttribute("aria-expanded", String(!shut)); };
  all?.addEventListener("click", () => { const shut = items().some((d) => !d.open); items().forEach((d) => (d.open = shut)); });
  paintAll();
  return { openAll: () => items().forEach((d) => (d.open = true)), closeAll: () => items().forEach((d) => (d.open = false)) };
}

export function segmentedHtml(name, options, value, label = name) {
  ensureStyles();
  return `<div class="gx-seg" role="group" aria-label="${esc(label)}" data-seg="${esc(name)}">${options.map(([v, t, icon = ""]) => `<button type="button" data-v="${esc(v)}" aria-pressed="${v === value}">${icon}${esc(t)}</button>`).join("")}</div>`;
}
export function wireSegmented(root, onChange) {
  root.querySelectorAll(".gx-seg").forEach((g) => g.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-v]"); if (!b || b.getAttribute("aria-pressed") === "true") return;
    g.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    onChange(b.dataset.v, g.dataset.seg);
  }));
}
