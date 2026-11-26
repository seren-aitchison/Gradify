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

// ---------- long pages: sections that fold (smart accordions) ----------
// Every headed section of a lesson (section[id] > h3) gets a heading that folds it. Open by default; what the learner
// folds is remembered for that page; nothing folds by itself (finishing a section never hides it); jumping to a
// folded section ("On this page", search, a link) opens it. allBtn, if given, expands or collapses every section.
//
//   wireSections(prose, { scope: "physics", key: "shut:u01-03", allBtn })
const CHEV = '<svg class="gx-sechv" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export function wireSections(root, { scope = "gradify", key = "sections", allBtn = null, select = 'section[id] > h3:first-child' } = {}) {
  if (!root) return null;
  ensureStyles();
  const shut = prefSet(scope, key);
  const secs = [];
  for (const h of root.querySelectorAll(select)) {
    const s = h.parentElement;
    if (s.dataset.fold) { secs.push(s); continue; }
    s.dataset.fold = "1";
    const body = document.createElement("div"); body.className = "gx-secb"; body.id = `${s.id}-body`;
    while (h.nextSibling) body.append(h.nextSibling);
    s.append(body);
    // a link or button already in the heading (a section's "copy link") stays beside the toggle, never inside it:
    // interactive content inside a button is unreachable for keyboard and screen-reader users (axe nested-interactive)
    const keep = [...h.querySelectorAll("a[href], button, input, select, textarea, [tabindex]")];
    keep.forEach((x) => x.remove());
    const b = document.createElement("button"); b.type = "button"; b.className = "gx-sech"; b.setAttribute("aria-controls", body.id);
    b.innerHTML = `<span>${h.innerHTML}</span>${CHEV}`;
    h.replaceChildren(b, ...keep);
    secs.push(s);
  }
  const set = (s, open, remember = true) => {
    s.classList.toggle("gx-shut", !open);
    s.querySelector(":scope > h3 > .gx-sech")?.setAttribute("aria-expanded", String(open));
    s.querySelector(":scope > .gx-secb").hidden = !open;
    if (remember) shut.toggle(s.id, !open);
  };
  secs.forEach((s) => set(s, !shut.has(s.id), false));
  const paintAll = () => {
    if (!allBtn) return;
    const any = secs.some((s) => s.classList.contains("gx-shut"));
    allBtn.textContent = any ? "Expand all sections" : "Collapse all sections";
    allBtn.setAttribute("aria-pressed", String(!any));
  };
  root.addEventListener("click", (e) => {
    const b = e.target.closest(".gx-sech"); if (!b || !root.contains(b)) return;
    const s = b.closest("section"); set(s, s.classList.contains("gx-shut")); paintAll();
  });
  allBtn?.addEventListener("click", () => { const any = secs.some((s) => s.classList.contains("gx-shut")); secs.forEach((s) => set(s, any)); paintAll(); });
  // a jump to a folded section, or to something inside one, opens it first
  const openFor = (id) => { const el = id && document.getElementById(id), s = el?.closest?.("section.gx-shut"); if (s && secs.includes(s)) { set(s, true); paintAll(); } };
  const onJump = (e) => { const a = e.target.closest?.("[data-jump], a[href^='#co-']"); if (a) openFor(a.dataset.jump || a.getAttribute("href").slice(1)); };
  document.addEventListener("click", onJump, true);
  paintAll();
  return { openAll: () => { secs.forEach((s) => set(s, true)); paintAll(); }, open: openFor, stop: () => document.removeEventListener("click", onJump, true) };
}

// ---------- worked solutions, one step at a time ----------
// A worked example ([data-steps] with an <ol> of steps) shows its question and keeps the working back: "Show the
// first step", then each next step, or "Show the full solution" at once; the last step is marked as the answer, and
// "Hide the solution" puts it away again. The HTML has every step in it (pages read without scripts, and search
// engines, see the whole example); this hides them once the page runs.
export function wireSteps(root) {
  if (!root) return;
  ensureStyles();
  for (const ex of root.querySelectorAll("[data-steps]")) {
    if (ex.dataset.stepsWired) continue;
    const ol = ex.querySelector("ol"), steps = ol ? [...ol.children] : [];
    if (!steps.length) continue;
    ex.dataset.stepsWired = "1";
    if (steps.length > 1) steps.at(-1).classList.add("gx-ans");
    const bar = document.createElement("div"); bar.className = "gx-stepbar"; ol.after(bar);
    let shown = 0;
    const paint = () => {
      steps.forEach((li, i) => { li.hidden = i >= shown; });
      ol.hidden = shown === 0;
      const n = steps.length, left = n - shown;
      bar.innerHTML = left
        ? `<button type="button" class="gx-stepb" data-step="next">${shown === 0 ? (n > 1 ? "Show the first step" : "Show the answer") : left === 1 ? "Show the answer" : `Next step (${shown + 1} of ${n})`}</button>${n > 1 ? `<button type="button" class="gx-stepb ghost" data-step="all">Show the full solution</button>` : ""}<small>${shown === 0 ? "Try it first, then check each step." : `${shown} of ${n} shown`}</small>`
        : `<button type="button" class="gx-stepb ghost" data-step="hide">Hide the solution</button>`;
    };
    bar.addEventListener("click", (e) => {
      const b = e.target.closest("[data-step]"); if (!b) return;
      const was = shown;
      shown = b.dataset.step === "next" ? shown + 1 : b.dataset.step === "all" ? steps.length : 0;
      paint();
      if (shown > was) steps[was]?.setAttribute("tabindex", "-1"), steps[was]?.focus({ preventScroll: false });
      else bar.querySelector("button")?.focus();
    });
    paint();
  }
}

// ---------- compact or full ----------
// A two-way switch between the full page and a compact overview: the switch's state is a class on `target`
// (CSS decides what compact hides), remembered under scope/key.
//
//   el.innerHTML = densityHtml("lesson-view");  wireDensity(el, { target: article, scope: "physics", key: "compact" })
export function densityHtml(name = "view", { full = "Full lesson", compact = "Key points" } = {}) {
  return segmentedHtml(name, [["full", full], ["compact", compact]], "full", "How much to show");
}
export function wireDensity(root, { target, scope = "gradify", key = "compact", cls = "gx-compact", onChange } = {}) {
  if (!root || !target) return null;
  const apply = (v, remember = true) => {
    target.classList.toggle(cls, v === "compact");
    root.querySelectorAll(".gx-seg button[data-v]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === v)));
    if (remember) setPref(scope, key, v === "compact" ? true : null);
    onChange?.(v);
  };
  wireSegmented(root, (v) => apply(v));
  apply(pref(scope, key, false) ? "compact" : "full", false);
  return { set: apply };
}

// ---------- rows that open ----------
// A list or table row whose detail opens under it: a [data-row] button with aria-controls naming the detail element.
// Remembered under scope/key when given (by the button's data-row value).
export function wireRows(root, { scope = null, key = null } = {}) {
  if (!root) return;
  const open = scope && key ? prefSet(scope, key) : null;
  const set = (b, on, remember = true) => {
    const d = document.getElementById(b.getAttribute("aria-controls")); if (!d) return;
    d.hidden = !on; b.setAttribute("aria-expanded", String(on)); b.closest("li, tr")?.classList.toggle("gx-rowopen", on);
    if (remember && open) open.toggle(b.dataset.row, on);
  };
  root.querySelectorAll("[data-row]").forEach((b) => set(b, Boolean(open?.has(b.dataset.row)), false));
  root.addEventListener("click", (e) => { const b = e.target.closest("[data-row]"); if (b && root.contains(b)) set(b, b.getAttribute("aria-expanded") !== "true"); });
}
