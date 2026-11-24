// Practice on the checked teaching diagrams (kit/diagrams/visual.js): the same idea as the glass cards' ways to
// practise (kit/core/glass-diagrams.js), on a diagram that's a picture rather than text.
//
//   Label it         the labels on the diagram that are worth knowing (names, values with units, stages) are
//                    covered; recall each, then tap it (or Enter) to check. Bare axis numbers, single element
//                    symbols and lines of explanation stay as they are: covering them tests nothing.
//   Talk it through  "The diagram in words", one line at a time: the lines still to come are hidden, so the learner
//                    says what comes next before seeing it.
//
// Finishing either is remembered on this device with the glass cards' practice record (savePractice), under the
// diagram's own id, so the badge shows wherever the diagram appears.

import { savePractice, practiceOf } from "../core/glass-diagrams.js";

const NS = "http://www.w3.org/2000/svg";
import { esc } from "../core/text.js";
// renderers whose text is explanation split over several lines: covering a line of it would test nothing
const SENTENCE_RENDERERS = new Set(["decision-tree", "free-body"]);

/** Whether a label on a diagram is worth covering for recall. */
export function labelWorthCovering(text, renderer = "") {
  const t = String(text ?? "").replace(/\s+/g, " ").trim();
  if (SENTENCE_RENDERERS.has(renderer)) return false;
  if (t.length < 2 || t.length > 32) return false;
  if (/^[−–+-]?\d+(?:[.,]\d+)?$/.test(t)) return false;   // a bare number: an axis tick
  if (/^[A-Z][a-z]?$/.test(t)) return false;              // an element symbol on its own (H, C, Cl)
  if (/^[δ]?[+−–-]$/.test(t)) return false;               // a charge sign on its own
  return true;
}
/** The labels on a diagram's SVG (as text) that Label it would cover. */
export function coverableLabels(svgText, renderer = "") {
  return [...String(svgText).matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim()).filter((t) => labelWorthCovering(t, renderer));
}

const VERB = { label: "labelled", talk: "talked through" };
const keyOf = (fig) => fig.dataset.vxKey;
function showBadge(fig, fresh = false) {
  const el = fig.querySelector(".vx-badge"); if (!el) return;
  const r = practiceOf(keyOf(fig));
  const modes = Object.keys(r || {}).filter((m) => VERB[m]);
  el.hidden = !modes.length; if (!modes.length) return;
  el.innerHTML = `<span aria-hidden="true">✓</span> Practised<span class="vx-sr">: you've ${esc(modes.map((m) => VERB[m]).join(" and "))} this diagram</span>`;
  el.classList.toggle("vx-fresh", fresh);
}
const say = (fig, t) => { const o = fig.querySelector(".vx-say"); if (o) o.textContent = t; };

/** Add the practice bar to a filled diagram (`d`: its manifest entry, `id`: its id). Nothing if there's nothing to practise. */
export function addPractice(fig, d, id) {
  if (!fig || fig.querySelector(".vx-practice")) return;
  const wide = fig.querySelector(".vx-wide svg");
  const nLabels = wide ? [...wide.querySelectorAll("text")].filter((t) => labelWorthCovering(t.textContent, d.renderer)).length : 0;
  const canLabel = nLabels >= 2, canTalk = (d.description || []).length >= 2;
  if (!canLabel && !canTalk) return;
  fig.dataset.vxKey = `vx:${id}`;
  fig.dataset.vxRenderer = d.renderer || "";
  fig._vxLines = d.description || [];
  const btn = (mode, label) => `<button type="button" class="vx-pbtn" data-vx-mode="${mode}" aria-pressed="false">${label}</button>`;
  fig.querySelector("figcaption")?.insertAdjacentHTML("afterend", `<div class="vx-practice" role="group" aria-label="Practise this diagram">
    ${canLabel ? btn("label", `Label it <small>${nLabels}</small>`) : ""}${canTalk ? btn("talk", "Talk it through") : ""}
    <span class="vx-badge" hidden></span><p class="vx-say" aria-live="polite"></p></div>`);
  showBadge(fig);
}

// ---------- Label it ----------
function labelOn(fig) {
  // the picture is a button (it opens the diagram full size); a button can't hold other controls, so while labelling
  // its contents move into a plain box, and back when done
  const art = fig.querySelector("button.vx-art");
  if (art) { const box = document.createElement("div"); box.className = "vx-art vx-artl"; box.append(...art.childNodes); art.hidden = true; art.after(box); }
  const r = fig.dataset.vxRenderer;
  for (const svg of fig.querySelectorAll(".vx-artl svg")) {
    const shown = svg.getBoundingClientRect().width > 0;
    // a band is at least 26px tall and 40px wide on screen, however small the diagram is drawn, so it's easy to tap
    const scale = shown && svg.viewBox?.baseVal?.width ? svg.getBoundingClientRect().width / svg.viewBox.baseVal.width : 1;
    for (const t of svg.querySelectorAll("text")) {
      if (!labelWorthCovering(t.textContent, r)) continue;
      t.classList.add("vx-cov");
      if (!shown) continue;
      const b = t.getBBox(), w = Math.max(b.width + 6, 40 / scale), h = Math.max(b.height + 6, 26 / scale);
      const band = document.createElementNS(NS, "rect");
      for (const [k, v] of Object.entries({ x: b.x + b.width / 2 - w / 2, y: b.y + b.height / 2 - h / 2, width: w, height: h, rx: 4 })) band.setAttribute(k, v.toFixed(1));
      band.setAttribute("class", "vx-band"); band.setAttribute("role", "button"); band.setAttribute("tabindex", "0"); band.setAttribute("aria-label", "Hidden label: reveal");
      band._t = t; t.before(band);
    }
  }
  sayLabels(fig);
  fig.querySelector(".vx-band")?.focus({ preventScroll: true });
}
function labelOff(fig) {
  fig.querySelectorAll(".vx-band").forEach((b) => b.remove());
  fig.querySelectorAll(".vx-cov").forEach((t) => t.classList.remove("vx-cov"));
  const box = fig.querySelector(".vx-artl"), art = fig.querySelector("button.vx-art");
  if (box && art) { art.append(...box.childNodes); box.remove(); art.hidden = false; }
}
function sayLabels(fig) {
  const left = fig.querySelectorAll(".vx-band").length, all = fig._vxTotal ??= left;
  say(fig, left ? `${all - left} of ${all} labels revealed. Say each one before you tap it.` : `All ${all} labels revealed. How many did you know?`);
  if (!left && all) { savePractice(keyOf(fig), "label"); showBadge(fig, true); }
}
function reveal(band) {
  const fig = band.closest(".vx"), t = band._t, label = t.textContent;
  t.classList.remove("vx-cov"); band.remove();
  // the same label in the other layout (wide or narrow) too
  for (const o of fig.querySelectorAll(".vx-artl text.vx-cov")) if (o.textContent === label && !o.previousElementSibling?.classList?.contains("vx-band")) { o.classList.remove("vx-cov"); break; }
  sayLabels(fig);
  fig.querySelector(".vx-band")?.focus({ preventScroll: true });
}

// ---------- Talk it through ----------
function talkOn(fig) {
  const lines = fig._vxLines;
  fig.querySelector(".vx-practice").insertAdjacentHTML("afterend", `<div class="vx-talk"><ol>${lines.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
    <div class="vx-talkbar"><button type="button" class="vx-pbtn" data-vx-prev aria-label="Previous line">←</button><button type="button" class="vx-pbtn vx-main" data-vx-next>Next →</button></div></div>`);
  talkShow(fig, 0);
  fig.querySelector("[data-vx-next]").focus({ preventScroll: true });
}
function talkOff(fig) { fig.querySelector(".vx-talk")?.remove(); delete fig.dataset.vxLine; }
function talkShow(fig, i) {
  const lis = [...fig.querySelectorAll(".vx-talk li")], n = lis.length;
  i = Math.max(0, Math.min(n - 1, i)); fig.dataset.vxLine = i;
  lis.forEach((li, k) => { li.classList.toggle("on", k === i); li.classList.toggle("todo", k > i); k > i ? li.setAttribute("aria-hidden", "true") : li.removeAttribute("aria-hidden"); });
  say(fig, `Line ${i + 1} of ${n}${i < n - 1 ? ". Say what comes next, then check." : ". That's the whole diagram."}`);
  fig.querySelector("[data-vx-prev]").disabled = i === 0;
  fig.querySelector("[data-vx-next]").textContent = i < n - 1 ? "What comes next? →" : "Start again";
  if (i === n - 1) { savePractice(keyOf(fig), "talk"); showBadge(fig, true); }
}

// while practising, the caption's explanation and "The diagram in words" would give the answers away: the title
// stays, the rest waits until the learner is done
function holdAnswers(fig, on) {
  const cap = fig.querySelector("figcaption"), words = fig.querySelector(".vx-desc");
  if (on && cap && !cap._full) { cap._full = cap.innerHTML; const title = cap.querySelector("b"); cap.innerHTML = `${title ? title.outerHTML : ""} <span class="vx-held">The explanation is hidden while you practise.</span>`; }
  if (!on && cap?._full) { cap.innerHTML = cap._full; cap._full = null; }
  if (words) words.hidden = on;
}
// ---------- one listener for every diagram on the page ----------
const MODES = { label: [labelOn, labelOff], talk: [talkOn, talkOff] };
function setMode(fig, mode) {
  const cur = fig.dataset.vxOn;
  if (cur) { MODES[cur][1](fig); delete fig.dataset.vxOn; fig._vxTotal = undefined; say(fig, ""); holdAnswers(fig, false); }
  fig.querySelectorAll("[data-vx-mode]").forEach((b) => { b.setAttribute("aria-pressed", "false"); b.classList.remove("on"); });
  if (!mode || mode === cur) return;
  fig.dataset.vxOn = mode;
  const b = fig.querySelector(`[data-vx-mode="${mode}"]`); b.setAttribute("aria-pressed", "true"); b.classList.add("on");
  holdAnswers(fig, true);
  MODES[mode][0](fig);
}
if (typeof document !== "undefined" && !globalThis.__vxPracticeWired) {
  globalThis.__vxPracticeWired = true;
  document.addEventListener("click", (e) => {
    const t = e.target instanceof Element ? e.target : null, fig = t?.closest(".vx[data-vx-key]"); if (!fig) return;
    const m = t.closest("button[data-vx-mode]"); if (m) { setMode(fig, m.dataset.vxMode); return; }
    const band = t.closest(".vx-band"); if (band) { reveal(band); return; }
    if (t.closest("[data-vx-next]")) { const i = Number(fig.dataset.vxLine) + 1; talkShow(fig, i >= fig._vxLines.length ? 0 : i); return; }
    if (t.closest("[data-vx-prev]")) talkShow(fig, Number(fig.dataset.vxLine) - 1);
  });
  document.addEventListener("keydown", (e) => {
    const t = e.target instanceof Element ? e.target : null;
    if (t?.classList?.contains("vx-band") && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); reveal(t); }
  });
}
