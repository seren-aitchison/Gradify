// The reading and accessibility panel, opened from the "Aa" button in every page's top bar (kit/core/theme-boot.js
// applies the choices before each page paints) and from Settings in the app.
//
// Every setting stands on its own. Gradify never bundles them into "dyslexia mode" or "ADHD mode": no presentation
// works for everyone with a given diagnosis, so learners pick what helps them, see it change as they choose, and can
// reset any of it. Some starting points are suggested ("people with dyslexia often find…"), never applied for them.
// The session length a learner chooses here is also what Gradify uses to plan their study blocks (kit/intel/session.js).
//
// Baseline: WCAG 2.2 AA. The panel is a modal dialog with a heading, labelled radio groups, a visible focus, Escape to
// close, and focus returned to the button that opened it.
import { esc } from "./text.js";

export const SETTINGS = [
  { k: "size", label: "Page size", why: "Makes everything bigger, text and controls together.", opts: [["default", "100%"], ["112", "112%"], ["125", "125%"], ["150", "150%"]] },
  { k: "font", label: "Font", why: "Atkinson Hyperlegible was designed for low-vision readers; Lexend for reading fluency. Try each and keep what reads easiest.", opts: [["default", "Gradify (Geist)"], ["hyperlegible", "Atkinson Hyperlegible"], ["lexend", "Lexend"]] },
  { k: "spacing", label: "Letter and word spacing", why: "More space between letters and words can stop them crowding together.", opts: [["default", "Normal"], ["wide", "Wide"], ["wider", "Wider"]] },
  { k: "lines", label: "Line spacing", why: "More space between lines makes it easier to keep your place.", opts: [["default", "Normal"], ["relaxed", "Relaxed"], ["loose", "Loose"]] },
  { k: "measure", label: "Line length", why: "Shorter lines in lessons and notes, so your eyes travel less.", opts: [["default", "Full width"], ["short", "Shorter lines"]] },
  { k: "tint", label: "Background tint", why: "A coloured tint, like reading through a coloured overlay. Some people find it reduces glare and visual stress.", opts: [["default", "None"], ["cream", "Cream"], ["blue", "Blue"], ["green", "Green"], ["rose", "Rose"], ["grey", "Grey"]] },
  { k: "contrast", label: "Contrast", why: "Solid backgrounds instead of glass, stronger text and borders.", opts: [["default", "Standard"], ["high", "High contrast"]] },
  { k: "motion", label: "Motion", why: "Stops animations, floating icons and smooth scrolling.", opts: [["default", "Follow my device"], ["reduce", "Reduce motion"]] },
  { k: "links", label: "Links", why: "Underlines every link, so they don't rely on colour.", opts: [["default", "As designed"], ["underline", "Always underline"]] },
  { k: "focus", label: "Focus mode", why: "Hides decoration and moving backgrounds and makes the next thing to do stand out. Useful when attention drifts.", opts: [["default", "Off"], ["on", "On"]] },
  { k: "readaloud", label: "Read aloud", why: "Select any text and a Read aloud button appears beside it, using your device's voice.", opts: [["default", "Off"], ["on", "On"]] },
  { k: "sound", label: "Sounds", why: "A short, quiet sound for a right answer, a finished lesson or a new level.", opts: [["default", "Off"], ["on", "On"]] },
  { k: "haptics", label: "Haptics", why: "A small tap you can feel on phones for answers, completions and milestones.", opts: [["default", "On"], ["off", "Off"]] },
  { k: "block", label: "Study block length", why: "How long Gradify makes each study block before a break, when it plans a session for you.", opts: [["default", "25 minutes"], ["10", "10 minutes"], ["15", "15 minutes"], ["45", "45 minutes"]] },
];
// starting points people sometimes find useful: suggestions shown in the panel, never applied automatically
export const SUGGESTIONS = [
  ["Reading feels crowded", { font: "lexend", spacing: "wide", lines: "relaxed", measure: "short" }],
  ["Glare or visual stress", { tint: "cream", contrast: "default" }],
  ["Hard to stay focused", { focus: "on", motion: "reduce", block: "15" }],
  ["Low vision", { size: "125", font: "hyperlegible", contrast: "high", links: "underline" }],
];
const A = () => window.gradifyAccess;
let panel = null, opener = null, offTheme = null;

// Appearance: follow the device (the default for everyone, kit/core/theme-boot.js), or a light or dark choice for
// this device. The sun/moon button picks light or dark; this is where "follow my device" can be chosen again.
const THEMES = [["system", "Match my device"], ["light", "Light"], ["dark", "Dark"]];
function appearanceHtml() {
  const cur = window.gradifyTheme?.get?.() || "system";
  return `<fieldset class="a-set"><legend>Appearance</legend><p class="a-why" id="a-why-theme">Light or dark. Matching your device switches with it, by day and night if your device does.</p>
    <div class="a-opts" role="radiogroup" aria-describedby="a-why-theme">${THEMES.map(([v, t]) => `<label class="a-opt"><input type="radio" name="a-theme" value="${v}" ${cur === v ? "checked" : ""}><span>${esc(t)}</span></label>`).join("")}</div></fieldset>`;
}

export function openAccessPanel(from = null) {
  opener = from || document.activeElement;
  offTheme?.();
  panel?.remove();
  const p = A().get();
  panel = document.createElement("div");
  panel.className = "a-panel-wrap";
  panel.innerHTML = `<div class="a-scrim" data-close></div>
    <section class="a-panel" role="dialog" aria-modal="true" aria-labelledby="a-title">
      <div class="a-head"><h2 id="a-title">Reading and accessibility</h2><button type="button" class="a-x" data-close aria-label="Close">×</button></div>
      <p class="a-lead">Change anything, see it straight away. Every setting is separate, kept on this device, and works on every Gradify page.</p>
      <div class="a-suggest"><span>Starting points some people like:</span>${SUGGESTIONS.map(([t], i) => `<button type="button" class="a-chip" data-suggest="${i}">${esc(t)}</button>`).join("")}</div>
      ${appearanceHtml()}
      ${SETTINGS.map((s) => `<fieldset class="a-set"><legend>${esc(s.label)}</legend><p class="a-why" id="a-why-${s.k}">${esc(s.why)}</p>
        <div class="a-opts" role="radiogroup" aria-describedby="a-why-${s.k}">${s.opts.map(([v, t]) => `<label class="a-opt"><input type="radio" name="a-${s.k}" value="${v}" ${(p[s.k] || "default") === v ? "checked" : ""}><span>${esc(t)}</span></label>`).join("")}</div></fieldset>`).join("")}
      <div class="a-foot"><button type="button" class="a-reset">Reset everything</button><button type="button" class="a-done" data-close>Done</button></div>
      <p class="a-note">Gradify aims for WCAG 2.2 AA on every page. If something doesn't work for you, tell us: <a href="mailto:hello@getgradify.com?subject=Accessibility">hello@getgradify.com</a>.</p>
    </section>`;
  document.body.append(panel);
  const dlg = panel.querySelector(".a-panel");
  // another tab, the sun/moon button or the device can change the theme while the panel is open: keep the choice shown
  const onTheme = (e) => { const c = e.detail?.choice || window.gradifyTheme?.get?.() || "system"; panel?.querySelectorAll('input[name="a-theme"]').forEach((i) => { i.checked = i.value === c; }); };
  document.addEventListener("gradify:theme", onTheme);
  offTheme = () => { document.removeEventListener("gradify:theme", onTheme); offTheme = null; };
  const close = () => { panel?.remove(); panel = null; document.removeEventListener("keydown", onKey, true); offTheme?.(); opener?.focus?.(); };
  const onKey = (e) => {
    if (e.key === "Escape") { e.preventDefault(); close(); return; }
    if (e.key !== "Tab") return;
    // keep focus inside the dialog
    const f = [...dlg.querySelectorAll("button, input:checked, input:not([type=radio]), a[href]")].filter((x) => !x.disabled && x.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
  };
  document.addEventListener("keydown", onKey, true);
  panel.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) close(); });
  panel.addEventListener("change", (e) => {
    const r = e.target.closest("input[type=radio]"); if (!r) return;
    if (r.name === "a-theme") { window.gradifyTheme?.set(r.value); return; }
    const k = r.name.slice(2); A().set(k, r.value);
    if (k === "readaloud" && r.value === "on") readAloud();
  });
  panel.querySelector(".a-reset").addEventListener("click", () => {
    for (const s of SETTINGS) A().set(s.k, null);
    window.gradifyTheme?.set("system");
    panel.querySelectorAll(".a-opt input").forEach((i) => { i.checked = i.name === "a-theme" ? i.value === "system" : i.value === "default"; });
  });
  panel.querySelector(".a-suggest").addEventListener("click", (e) => {
    const b = e.target.closest("[data-suggest]"); if (!b) return;
    const set = SUGGESTIONS[+b.dataset.suggest][1];
    for (const [k, v] of Object.entries(set)) { A().set(k, v); const i = panel.querySelector(`input[name="a-${k}"][value="${v}"]`); if (i) i.checked = true; }
  });
  dlg.querySelector("h2").setAttribute("tabindex", "-1");
  dlg.querySelector("h2").focus();
}

// ---------- read aloud: select text, press the button ----------
let raBound = false;
export function readAloud() {
  if (raBound || !window.speechSynthesis) return; raBound = true;
  const btn = document.createElement("button");
  btn.type = "button"; btn.className = "a-read"; btn.hidden = true; btn.textContent = "🔊 Read aloud";
  document.body.append(btn);
  let text = "";
  const place = () => {
    if (A().get().readaloud !== "on") { btn.hidden = true; return; }
    const sel = getSelection(); text = sel && !sel.isCollapsed ? String(sel).trim() : "";
    if (!text || text.length < 2) { btn.hidden = true; return; }
    const r = sel.getRangeAt(0).getBoundingClientRect();
    btn.style.top = `${Math.max(8, r.top - 44)}px`; btn.style.left = `${Math.min(innerWidth - 150, Math.max(8, r.left))}px`; btn.hidden = false;
  };
  document.addEventListener("selectionchange", () => { clearTimeout(place.t); place.t = setTimeout(place, 250); });
  btn.addEventListener("mousedown", (e) => e.preventDefault());
  btn.addEventListener("click", () => {
    speechSynthesis.cancel();
    if (btn.dataset.on) { delete btn.dataset.on; btn.textContent = "🔊 Read aloud"; return; }
    const u = new SpeechSynthesisUtterance(text.slice(0, 4000)); u.lang = "en-GB";
    u.onend = () => { delete btn.dataset.on; btn.textContent = "🔊 Read aloud"; };
    btn.dataset.on = "1"; btn.textContent = "■ Stop"; speechSynthesis.speak(u);
  });
}

/** The study block length chosen here, in minutes (kit/intel/session.js plans breaks with it). */
export const blockMinutes = (p = (typeof window !== "undefined" && window.gradifyAccess?.get()) || {}) => Number(p.block) || 25;
