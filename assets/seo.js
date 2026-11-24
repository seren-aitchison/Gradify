// Behaviour for Gradify's free pages (scripts/build-seo.mjs). The pages work without it; this adds what needs a script:
//   - share with a study group, the study-tips opt-in, print buttons (cheat sheet, blurting sheet, index cards)
//   - every tool ([data-tool]): Try an example, Reset, Copy summary (group-chat format), Share link (?s= state), Print,
//     Embed (?embed=1), pin to the tools page; the tool's own code lives in the module named by data-mod
//   - embed mode, focus mode, recently used pages, the study streak and "(2 due)" in the tab title
//   - copy buttons ([data-copy]), privacy-first counts of views and actions, and Microsoft Clarity when configured
import { remember, togglePin, pins, studied, badgeTitle, resumeHtml } from "./memory.js";

const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const params = new URLSearchParams(location.search);
const html = document.documentElement;
const title = () => (document.querySelector("h1")?.textContent || document.title).trim();

// ---------- counts (kit/core/analytics.js): anonymous, and only where allowed ----------
let analytics = null;
const counts = () => (analytics ||= import("/kit/core/analytics.js").catch(() => null));
export const act = (event) => counts().then((m) => m?.track(event, "Gradify"));
counts().then((m) => m?.trackView("Gradify"));
import("/kit/core/vitals.js").then((m) => m.watchVitals("Gradify")).catch(() => {});
import("/kit/core/attribution.js").then((m) => m.captureFirstTouch()).catch(() => {});

// ---------- copy ----------
export async function copy(text, msgEl, done = "Copied.") {
  try { await navigator.clipboard.writeText(text); if (msgEl) msgEl.textContent = done; return true; }
  catch { if (msgEl) msgEl.textContent = "Couldn't copy: select the text and copy it yourself."; return false; }
}
// copy an element's text exactly (citations), without the "(from …)" line the other copy buttons add
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-copy-el]"); if (!b) return;
  const el = document.querySelector(b.dataset.copyEl); if (!el) return;
  copy(el.innerText.trim(), null).then((ok) => { if (ok) { const old = b.textContent; b.textContent = "Copied"; setTimeout(() => { b.textContent = old; }, 1500); } });
});
// the "accessed" date in citations is today's
for (const el of $$("[data-today]")) el.textContent = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-copy]"); if (!b) return;
  const src = b.dataset.copy.startsWith("#") ? document.querySelector(b.dataset.copy)?.innerText : b.dataset.copy;
  const old = b.textContent;
  copy(`${src}\n(from ${location.origin}${location.pathname})`).then((ok) => { if (ok) { b.textContent = "Copied"; setTimeout(() => { b.textContent = old; }, 1500); } });
});

// ---------- calls to action into the app (counted, so we can see which pages send people to study) ----------
document.addEventListener("click", (e) => { const a = e.target.closest('a[href^="/app.html"], a[href*="lifeos.html"]'); if (a) act("cta_click"); });

// ---------- share with a study group ----------
for (const b of $$("[data-share]")) b.addEventListener("click", async () => {
  const msg = b.parentElement.querySelector(".share-msg");
  const link = new URL(location.pathname, location.origin);
  link.searchParams.set("utm_source", "share"); link.searchParams.set("utm_medium", "group-chat");
  const data = { title: document.title, text: document.querySelector('meta[name="description"]')?.content || "", url: link.href };
  act("share");
  try {
    if (navigator.share) { await navigator.share(data); return; }
    await navigator.clipboard.writeText(`${data.title}\n${data.url}`);
    msg.textContent = "Link copied. Paste it into your group chat.";
  } catch (e) { if (e?.name !== "AbortError") msg.textContent = data.url; }
});

// ---------- study-tips opt-in ----------
for (const f of $$("[data-optin]")) f.addEventListener("submit", async (e) => {
  e.preventDefault();
  const msg = f.querySelector(".optin-msg"), email = f.querySelector("input[type=email]").value;
  msg.textContent = "Sending…";
  try {
    const { joinWaitlist } = await import("/kit/data/waitlist.js");
    await joinWaitlist(email, "Study tips");
    msg.innerHTML = 'You\'re on the list. Your plan is ready now: <a href="/templates/7-day-exam-plan/">open the 7-day exam plan</a>.';
    f.querySelector("button").disabled = true;
  } catch (err) { msg.textContent = err?.invalid ? err.message : "That didn't send. Try again in a moment."; }
});

// ---------- print: plain, or a mode (cheat sheet, blurting sheet, index cards) set on <html> while printing ----------
for (const b of $$("[data-print]")) b.addEventListener("click", () => {
  const mode = b.dataset.print;
  if (mode) html.dataset.print = mode;
  act("print"); studied(); print();
  setTimeout(() => { delete html.dataset.print; }, 500);
});

// answers inside closed <details> (flashcards, FAQs, quiz answers) print too: open them for the printout only
let opened = [];
addEventListener("beforeprint", () => { opened = $$("details:not([open])"); opened.forEach((d) => { d.open = true; }); });
addEventListener("afterprint", () => { opened.forEach((d) => { d.open = false; }); opened = []; });

// ---------- embed mode (?embed=1): just the tool or deck, links open in a new tab ----------
if (params.get("embed") === "1") {
  html.classList.add("embed");
  for (const a of $$("a[href]")) { a.target = "_blank"; a.rel = "noopener"; }
}

// ---------- focus mode: hide the navigation and everything but the study material ----------
const FOCUS = "gradify.focus";
try { if (localStorage.getItem(FOCUS) === "1") html.classList.add("focus"); } catch { /* storage blocked */ }
for (const b of $$("[data-focus]")) {
  const sync = () => { b.setAttribute("aria-pressed", String(html.classList.contains("focus"))); b.textContent = html.classList.contains("focus") ? "Exit focus mode" : "Focus mode"; };
  sync();
  b.addEventListener("click", () => { html.classList.toggle("focus"); try { localStorage.setItem(FOCUS, html.classList.contains("focus") ? "1" : "0"); } catch { /* storage blocked */ } sync(); });
}

// ---------- tools ----------
const enc = (o) => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const dec = (s) => { try { return JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/"))))); } catch { return null; } };
/** a tool's inputs: fixed fields, and its repeating rows */
export function stateOf(root) {
  const field = (el) => (el.type === "checkbox" ? el.checked : el.value);
  const f = {}; for (const el of $$("[name]", root)) if (!el.closest(".row") && !el.closest("[data-nostate]")) f[el.name] = field(el);
  const r = $$(".rows > .row", root).map((row) => Object.fromEntries($$("[name]", row).map((el) => [el.name, field(el)])));
  return { f, r };
}
/** "+10d" in an example means ten days from today, so examples with dates never go stale */
export const relDate = (v, now = new Date()) => (typeof v === "string" && /^\+\d+d$/.test(v) ? new Date(now.getTime() + Number(v.slice(1, -1)) * 864e5).toISOString().slice(0, 10) : v);
export function applyState(root, s) {
  if (!s) return;
  // field by field, with a change event each, so a select that fills another (unit kind → units) runs first
  for (const [k, v] of Object.entries(s.f || {})) { const el = root.querySelector(`[name="${k}"]:not(.row [name])`); if (el) { if (el.type === "checkbox") el.checked = Boolean(v); else el.value = relDate(v); el.dispatchEvent(new Event("change", { bubbles: true })); } }
  if (s.r && root.loadRows) root.loadRows(s.r.map((r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k, relDate(v)]))));
  root.dispatchEvent(new Event("input", { bubbles: true }));
}

async function mountTools() {
  const tools = $$("[data-tool]"); if (!tools.length) return;
  for (const root of tools) {
    const initial = stateOf(root);
    const mod = await import(`/assets/${root.dataset.mod || "study-tools"}.js`);
    mod.mount?.(root);
    const shared = params.get("s") && dec(params.get("s")); if (shared) applyState(root, shared);
    // a drag-up sheet for the tool's inputs (assets/sheet.js), once its rows are in
    for (const s of $$("[data-sheet]", root)) import("/assets/sheet.js").then((m) => m.mount(s)).catch(() => {});
    for (const b of $$("[data-load-example]")) b.addEventListener("click", () => { applyState(root, JSON.parse(root.dataset.example)); root.scrollIntoView({ behavior: "smooth", block: "start" }); });
    if (root.dataset.bar === "off") continue;
    const bar = document.createElement("div"); bar.className = "tool-bar no-print";
    bar.innerHTML = `${root.dataset.example ? '<button type="button" class="ghost" data-x="example">Try an example</button>' : ""}<button type="button" class="ghost" data-x="reset">Reset</button><button type="button" class="ghost" data-x="copy">Copy summary</button><button type="button" class="ghost" data-x="link">Copy share link</button><button type="button" class="ghost" data-x="print">Print</button><button type="button" class="ghost" data-x="embed">Embed</button><span class="tool-msg" role="status" aria-live="polite"></span><textarea class="embed-code" rows="3" readonly hidden aria-label="Embed code"></textarea>`;
    root.append(bar);
    const msg = bar.querySelector(".tool-msg"), code = bar.querySelector(".embed-code");
    const link = (extra = "") => `${location.origin}${location.pathname}?s=${enc(stateOf(root))}${extra}`;
    bar.addEventListener("click", (e) => {
      const x = e.target.closest("[data-x]")?.dataset.x; if (!x) return;
      if (x === "example") { applyState(root, JSON.parse(root.dataset.example)); msg.textContent = "Example loaded: change any number to try your own."; }
      if (x === "reset") { try { localStorage.removeItem(`gradify.tool.${root.dataset.tool}`); } catch { /* storage blocked */ } applyState(root, { f: initial.f, r: [{}, {}, {}] }); history.replaceState(null, "", location.pathname); msg.textContent = "Reset."; }
      if (x === "copy") { act("share"); copy(`${title()}\n${(root.dataset.summary || root.querySelector(".result")?.innerText || "").trim()}\n\nOpen it: ${link()}`, msg, "Summary copied. Paste it into your notes or group chat."); }
      if (x === "link") { act("share"); copy(link(), msg, "Link copied: it opens this tool with your numbers filled in."); }
      if (x === "print") { act("print"); print(); }
      if (x === "embed") { code.hidden = false; code.value = `<iframe src="${link("&embed=1")}" title="${esc(title())}" width="100%" height="560" style="border:0;border-radius:14px;max-width:720px" loading="lazy"></iframe>\n<p style="font:12px sans-serif">${esc(title())} by <a href="${location.origin}${location.pathname}">Gradify</a></p>`; code.select(); copy(code.value, msg, "Embed code copied: paste it into your site, blog or Notion (/embed)."); }
    });
    let used = false;
    root.addEventListener("input", () => { if (!used) { used = true; act("tool_use"); studied(); } });
  }
}
mountTools().catch((e) => console.warn("tools", e));
for (const el of $$("[data-tool-hub]")) import("/assets/hub.js").then((m) => m.mount(el));

// ---------- pin, remember, streak, due badge ----------
for (const b of $$("[data-pin]")) {
  const path = location.pathname, sync = (on) => { b.setAttribute("aria-pressed", String(on)); b.textContent = on ? "★ Pinned" : "☆ Pin this tool"; };
  sync(pins().some((x) => x.path === path));
  b.addEventListener("click", () => sync(togglePin(path, title())));
}
if (!html.classList.contains("embed")) remember(location.pathname, title());
for (const el of $$("[data-resume]")) el.innerHTML = resumeHtml(esc, location.pathname);
badgeTitle();

// ---------- topic pages ----------
if (document.querySelector("[data-topic]")) import("/assets/topic.js").then((m) => m.mount()).catch((e) => console.warn("topic", e));

// ---------- Microsoft Clarity (gradify.config.js CLARITY_ID): only where counts are allowed, and cookieless ----------
import("/gradify.config.js").then(async ({ CLARITY_ID }) => {
  if (!CLARITY_ID || !(await counts())?.analyticsAllowed()) return;
  window.clarity = window.clarity || function (...a) { (window.clarity.q = window.clarity.q || []).push(a); };
  window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });
  const s = document.createElement("script"); s.async = true; s.src = `https://www.clarity.ms/tag/${encodeURIComponent(CLARITY_ID)}`; document.head.append(s);
}).catch(() => {});
