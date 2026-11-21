// Gradify's light and dark themes, on every page of every site. A classic (not module) script loaded straight after
// kit/styles/base.css in each page's <head>, so the theme is set before the first paint and a page never flashes the
// wrong colours.
//
//   localStorage "gradify.theme" = "system" (the default: follow the device) | "light" | "dark"
//   <html data-theme="dark|light">  the resolved theme; the colours are tokens in kit/styles/base.css
//
// It's a choice for this device, like the device's own appearance setting, so it isn't synced to the account.
// It also adds a sun/moon switch to the top bar of every page, and exposes window.gradifyTheme for Settings.
(function () {
  var KEY = "gradify.theme", root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
  // until someone chooses, follow the device: a phone set to light (most are, by day) gets light mode first
  function choice() { try { var v = localStorage.getItem(KEY); return v === "light" || v === "dark" ? v : "system"; } catch (e) { return "system"; } }
  function resolved(c) { return c === "system" ? (media && media.matches ? "light" : "dark") : c; }
  function apply() {
    var t = resolved(choice());
    root.dataset.theme = t;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "light" ? "#f6f6fb" : "#000000");
    var btns = document.querySelectorAll(".theme-btn");
    for (var i = 0; i < btns.length; i++) { btns[i].setAttribute("aria-pressed", String(t === "light")); btns[i].setAttribute("aria-label", t === "light" ? "Switch to dark mode" : "Switch to light mode"); btns[i].title = btns[i].getAttribute("aria-label"); }
    try { document.dispatchEvent(new CustomEvent("gradify:theme", { detail: { theme: t, choice: choice() } })); } catch (e) { /* old browser */ }
  }
  function set(c) { try { localStorage.setItem(KEY, c); } catch (e) { /* storage blocked: this page only */ } apply(); }
  apply();
  if (media) { var onChange = function () { if (choice() === "system") apply(); }; media.addEventListener ? media.addEventListener("change", onChange) : media.addListener(onChange); }
  // another tab changed it
  window.addEventListener("storage", function (e) { if (e.key === KEY) apply(); });
  window.gradifyTheme = { get: choice, resolved: function () { return resolved(choice()); }, set: set };

  var SUN = '<svg class="t-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON = '<svg class="t-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11z"/></svg>';
  function mount() {
    var bar = document.querySelector("header.bar, header.sub-nav");
    if (!bar || bar.querySelector(".theme-btn")) return;
    var b = document.createElement("button");
    b.type = "button"; b.className = "icon-btn theme-btn"; b.innerHTML = SUN + MOON;
    b.addEventListener("click", function () { set(resolved(choice()) === "light" ? "dark" : "light"); });
    var host = bar.querySelector(".right, .sub-right");
    if (host) host.insertBefore(b, host.firstChild);
    else { var chip = bar.querySelector(".mode-chip"); chip ? bar.insertBefore(b, chip) : bar.appendChild(b); }
    apply();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();

// Reading and accessibility settings (kit/core/access-panel.js has the panel and the details). Each setting is chosen
// on its own, never bundled by diagnosis, and applied here before the first paint as attributes on <html>, which
// kit/styles/base.css styles: data-a-size, data-a-font, data-a-spacing, data-a-lines, data-a-measure, data-a-tint,
// data-a-contrast, data-a-motion, data-a-links, data-a-focus. Kept on this device, like the theme.
(function () {
  var KEY = "gradify.access", root = document.documentElement;
  var FONTS = { hyperlegible: "Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400", lexend: "Lexend:wght@400;500;700" };
  function prefs() { try { return JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { return {}; } }
  function apply() {
    var p = prefs(), names = ["size", "font", "spacing", "lines", "measure", "tint", "contrast", "motion", "links", "focus", "readaloud"];
    for (var i = 0; i < names.length; i++) { var v = p[names[i]]; if (v && v !== "default") root.setAttribute("data-a-" + names[i], v); else root.removeAttribute("data-a-" + names[i]); }
    if (p.font && FONTS[p.font] && !document.getElementById("a-font-" + p.font)) {
      var l = document.createElement("link"); l.rel = "stylesheet"; l.id = "a-font-" + p.font;
      l.href = "https://fonts.googleapis.com/css2?family=" + FONTS[p.font] + "&display=swap"; document.head.appendChild(l);
    }
    try { document.dispatchEvent(new CustomEvent("gradify:access", { detail: p })); } catch (e) { /* old browser */ }
  }
  apply();
  window.addEventListener("storage", function (e) { if (e.key === KEY) apply(); });
  var base = (document.currentScript && document.currentScript.src) || "";
  function open(from) { import(base.replace(/theme-boot\.js(\?.*)?$/, "access-panel.js")).then(function (m) { m.openAccessPanel(from); }); }
  window.gradifyAccess = { get: prefs, apply: apply, open: open,
    set: function (k, v) { var p = prefs(); if (v == null || v === "default") delete p[k]; else p[k] = v; try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) { /* this page only */ } apply(); } };
  var AA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 19 8.5 5h1L15 19M5.2 14h7.6"/><path d="M17 10.5c.6-.9 1.6-1.4 2.6-1.2 1.1.2 1.9 1.1 1.9 2.3V19m0-4.5c-2.9 0-4.7.8-4.7 2.4 0 1.3 1 2.1 2.2 2.1 1.4 0 2.5-1 2.5-2.6"/></svg>';
  function mount() {
    var bar = document.querySelector("header.bar, header.sub-nav");
    if ((bar && bar.querySelector(".access-btn")) || document.querySelector(".access-float")) return;
    var b = document.createElement("button");
    b.type = "button"; b.className = bar ? "icon-btn access-btn" : "icon-btn access-btn access-float"; b.innerHTML = AA;
    b.setAttribute("aria-label", "Reading and accessibility settings"); b.title = "Reading and accessibility settings";
    b.setAttribute("aria-haspopup", "dialog");
    // until it has been opened once, the button says what it is ("Reading"), so the settings are easy to find
    var SEEN = "gradify.access.seen", seen = false; try { seen = !!localStorage.getItem(SEEN); } catch (e) { seen = true; }
    if (!seen && bar) { b.classList.add("access-named"); b.insertAdjacentHTML("beforeend", '<span class="access-name">Reading</span>'); }
    b.addEventListener("click", function () { try { localStorage.setItem(SEEN, "1"); } catch (e) { /* fine */ } b.classList.remove("access-named"); var n = b.querySelector(".access-name"); if (n) n.remove(); open(b); });
    // pages without a top bar (terms, privacy, quality…) get the button in the corner, so the settings are on every page
    if (!bar) document.body.appendChild(b);
    else { var t = bar.querySelector(".theme-btn"); if (t) t.parentNode.insertBefore(b, t); else { var host = bar.querySelector(".right, .sub-right"); host ? host.insertBefore(b, host.firstChild) : bar.appendChild(b); } }
    // read aloud: select any text and a "Read aloud" button appears beside it
    if (prefs().readaloud === "on") import(base.replace(/theme-boot\.js(\?.*)?$/, "access-panel.js")).then(function (m) { m.readAloud(); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();

// "Skip to content" (every page, scripts/sync-headers.mjs): move focus to the main content without changing the
// address. Course and app pages route by the part after "#", so following the link's own href would change the view.
document.addEventListener("click", function (e) {
  var a = e.target.closest && e.target.closest("a.skip-link"); if (!a) return;
  var t = document.getElementById((a.getAttribute("href") || "").slice(1)); if (!t) return;
  e.preventDefault();
  if (!t.hasAttribute("tabindex")) t.setAttribute("tabindex", "-1");
  t.focus({ preventScroll: true }); t.scrollIntoView({ block: "start" });
});

// Liquid Glass on the GPU (kit/ui/liquid-gl.js): opt-in. By default every page draws the frosted CSS glass (kit/styles/base.css,
// the look of the Pro banner); the GPU material bends and magnifies what's behind it, so it only runs when
// localStorage "gradify.glass" is "on", "lite" or "force", once the page has loaded and gone quiet.
(function () {
  var src = (document.currentScript && document.currentScript.src) || "";
  if (!src || !("noModule" in HTMLScriptElement.prototype)) return;
  var pref = null; try { pref = localStorage.getItem("gradify.glass"); } catch (e) { /* storage blocked: CSS glass */ }
  if (!/^(on|lite|force)$/.test(pref || "")) return;
  var go = function () { import(src.replace(/core\/theme-boot\.js(\?.*)?$/, "ui/liquid-gl.js")).then(function (m) { m.start(); }).catch(function () { /* CSS glass stays */ }); };
  var later = function () { "requestIdleCallback" in window ? requestIdleCallback(go, { timeout: 1500 }) : setTimeout(go, 300); };
  if (document.readyState === "complete") later(); else addEventListener("load", later);
})();
