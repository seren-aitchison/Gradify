// Gradify's light and dark themes, on every page of every site. A classic (not module) script loaded straight after
// kit/styles/base.css in each page's <head>, so the theme is set before the first paint and a page never flashes the
// wrong colours.
//
//   localStorage "gradify.theme" = "dark" (the default, Gradify's own look) | "light" | "system" (follow the device)
//   <html data-theme="dark|light">  the resolved theme; the colours are tokens in kit/styles/base.css
//
// It's a choice for this device, like the device's own appearance setting, so it isn't synced to the account.
// It also adds a sun/moon switch to the top bar of every page, and exposes window.gradifyTheme for Settings.
(function () {
  var KEY = "gradify.theme", root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
  function choice() { try { var v = localStorage.getItem(KEY); return v === "light" || v === "system" ? v : "dark"; } catch (e) { return "dark"; } }
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
