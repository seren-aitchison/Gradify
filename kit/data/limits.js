// Free plan allowances, for every Gradify site: on Free a learner can open 10 lessons in each course they start,
// 5 flashcard sets and 5 mind maps in all, and use each tool in Tools 5 times. Opening something they've already
// opened never uses more. Plus and Pro have no limits.
//
// Like the other Plus features (kit/data/plan.js), the limits apply only once Plus is on sale (PLUS_ON_SALE in
// kit/data/billing.js). Before then nothing is limited, so no learner is asked to buy something they can't buy.
// To see them working before then, open any page with ?limits=preview (and ?limits=off to stop).
//
// What a learner has opened is counted in this browser. It's a nudge towards Plus, not a security boundary: the
// lessons themselves are public pages.
import { access } from "./plan.js";
import { PLUS_ON_SALE, PLAN_PRICES } from "./billing.js";

export const FREE = { lesson: 10, flashcards: 5, map: 5, tool: 5 };
export const TOOLS = { search: "Lesson search", map: "Mind map creator", cards: "Flashcard creator", convert: "Notes converter" };
const KEY = "gradify.limits", PREVIEW = "gradify.limits.preview";
const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
const write = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* private mode: nothing counted */ } };
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// ?limits=preview / ?limits=off, remembered in this browser
try {
  const q = new URLSearchParams(location.search).get("limits");
  if (q === "preview") localStorage.setItem(PREVIEW, "on"); else if (q === "off") localStorage.removeItem(PREVIEW);
} catch { /* no page */ }
export const previewing = () => { try { return localStorage.getItem(PREVIEW) === "on"; } catch { return false; } };

// where each allowance is counted: lessons per course, each tool on its own, the rest in one list each
const bucket = (kind, { course, tool } = {}) => (kind === "lesson" ? `lesson:${course || "?"}` : kind === "tool" ? `tool:${tool || "?"}` : kind);
const limitOf = (kind) => (kind === "lesson" ? FREE.lesson : kind === "flashcards" ? FREE.flashcards : kind === "map" ? FREE.map : FREE.tool);
/** How much of an allowance is used: { used, limit, left, has(key) } (pure on the stored counts). */
export function usage(kind, o = {}, counts = read()) {
  const list = counts[bucket(kind, o)] || [], limit = limitOf(kind);
  return { used: list.length, limit, left: Math.max(0, limit - list.length), has: (key) => list.includes(String(key)) };
}
/** Count `key` against an allowance if there's room. Returns { ok, used, limit, left, fresh }. */
export function take(kind, key, o = {}, counts = read(), save = write) {
  const b = bucket(kind, o), list = counts[b] || [], limit = limitOf(kind);
  key = String(key);
  if (list.includes(key)) return { ok: true, used: list.length, limit, left: Math.max(0, limit - list.length), fresh: false };
  if (list.length >= limit) return { ok: false, used: list.length, limit, left: 0, fresh: false };
  counts[b] = [...list, key]; save(counts);
  return { ok: true, used: list.length + 1, limit, left: limit - list.length - 1, fresh: true };
}

/** Whether limits apply to this learner now: Free, and Plus on sale (or a preview). */
export async function limited(store) {
  if (!PLUS_ON_SALE && !previewing()) return false;
  // the store can be passed as a store, a promise of one, or a function that returns one (course pages)
  try { const st = typeof store === "function" ? await store() : await store; const a = await access(st); return a.plan === "free"; } catch { return true; }
}

const WHAT = {
  lesson: (n) => `${n} lessons in this course`, flashcards: (n) => `${n} flashcard sets`, map: (n) => `${n} mind maps`, tool: (n, t) => `${t || "each tool"} ${n} times`,
};
/**
 * Open something that counts against an allowance. Returns true if the learner may open it (and counts it); false if
 * they've used their Free allowance, after showing the Plus banner. Also shows a gentle banner on the last free one.
 * @param {"lesson"|"flashcards"|"map"|"tool"} kind
 * @param {string} key   what's being opened (a lesson id, a deck id…), so opening it again is free
 * @param {{ course?: string, tool?: string, store?: object, pricing?: string }} o
 */
export async function gate(kind, key, o = {}) {
  if (!(await limited(o.store))) return true;
  const r = take(kind, key, o), tool = TOOLS[o.tool];
  if (!r.ok) { banner({ kind, locked: true, pricing: o.pricing, tool }); return false; }
  if (r.fresh && r.left === 0) banner({ kind, locked: false, pricing: o.pricing, tool });
  return true;
}

/** One tool's allowance: { used, limit, left } */
export const toolUsage = (tool, counts = read()) => usage("tool", { tool }, counts);

const pricingUrl = (p) => p || (/(^|\.)getgradify\.com$|^localhost|^127\./.test(location.hostname) ? "/pricing.html" : "https://getgradify.com/pricing.html");
/** The Liquid Glass banner: the Plus offer, when an allowance runs out (locked) or on its last free item. */
export function banner({ kind, locked = true, pricing, tool } = {}) {
  document.querySelector(".lim-banner")?.remove();
  const what = WHAT[kind]?.(limitOf(kind), tool) || "this";
  const el = document.createElement("aside");
  el.className = `lim-banner${locked ? " locked" : ""}`;
  el.setAttribute("role", locked ? "alertdialog" : "status"); el.setAttribute("aria-live", "polite"); el.setAttribute("aria-label", "Gradify Plus");
  const price = `£${PLAN_PRICES.plus.month / 100}`;
  el.innerHTML = `<span class="lim-gem" aria-hidden="true"><span class="g3d-back"></span><span class="g3d-pane"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg></span></span>
    <div class="lim-text"><b>${locked ? `You've used Free's ${esc(what)}` : `That's the last of Free's ${esc(what)}`}</b>
      <span>${locked ? "Gradify Plus opens every lesson, flashcard set, mind map and tool, with no limits." : "Go further with Gradify Plus: every lesson, flashcard set, mind map and tool, with no limits."} ${price} a month.</span></div>
    <a class="lim-cta" href="${esc(pricingUrl(pricing))}">Get Gradify Plus</a>
    <button type="button" class="lim-x" aria-label="Close">×</button>`;
  el.querySelector(".lim-x").addEventListener("click", () => { el.classList.add("out"); setTimeout(() => el.remove(), 250); });
  document.body.append(el);
  requestAnimationFrame(() => el.classList.add("in"));
  if (!locked) setTimeout(() => { if (el.isConnected) { el.classList.add("out"); setTimeout(() => el.remove(), 250); } }, 9000);
  return el;
}

/** What to show in place of something locked (the banner is shown as well). */
export function lockedHtml(kind, { pricing, tool } = {}) {
  const what = WHAT[kind]?.(limitOf(kind), tool) || "this";
  return `<article class="panel glass plus-lock lim-lock"><span class="plus-badge">Plus</span><h3>You've used Free's ${esc(what)}</h3>
    <p class="sub">Everything you've already opened stays open. Gradify Plus, £${PLAN_PRICES.plus.month / 100} a month, opens all of it with no limits.</p>
    <a class="btn btn-light lg btn-sm" href="${esc(pricingUrl(pricing))}"><span>See Gradify Plus</span></a></article>`;
}
