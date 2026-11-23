// Analytics consent, and Google Analytics (gtag.js, G-CPR5LJB35L), on every Gradify page that loads
// kit/core/theme-boot.js (it loads this file). A classic script with no imports, so it works on every page.
//
// Nothing from Google loads until a visitor chooses "Accept analytics". Until then no Google script, cookie or request.
// Rejecting, or never choosing, means nothing loads. Withdrawing consent later deletes the Google Analytics cookies and
// reloads the page, so the loaded tag is gone and doesn't send cookieless pings.
//
// Google Analytics never runs, and the banner never shows:
//   - on JuniorGradify and YouthGradify (their audience is children: CHILD_SITES)
//   - when the browser sends Do Not Track or Global Privacy Control
//   - when the visitor turned off counting on the privacy page (localStorage "gradify.noanalytics", kit/core/analytics.js)
//   - away from getgradify.com (localhost, previews), unless localStorage "gradify.analytics.dev" = "1" for testing.
//     Those sessions, and any browser with localStorage "gradify.internal" = "1", are sent as traffic_type "internal"
//     so a GA4 internal-traffic filter can drop them.
//
//   localStorage "gradify.consent" = {"v":1,"analytics":true|false,"at":"YYYY-MM-DD"}
//   window.gradifyConsent: { state(), blocked(), accept(), reject(), open(), event(name, params) }
//
// Google's own gtag.js snippet for GA4 (G-CPR5LJB35L), loaded here after consent instead of pasted into each <head>, so it
// can't run before a visitor accepts. One Google tag per page: no GTM container is loaded alongside it.
(function () {
  var stub = window.gradifyConsent && window.gradifyConsent.stub ? window.gradifyConsent : null;
  if (window.gradifyConsent && !stub) return;
  var GA4_ID = "G-CPR5LJB35L";
  var KEY = "gradify.consent", VERSION = 1;
  var CHILD_SITES = /^\/(juniorgradify|youthgradify)(\/|$)/i;
  var PROD_HOST = /(^|\.)getgradify\.com$/i;
  var ls = function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } };

  function read() {
    try { var v = JSON.parse(ls(KEY) || "null"); return v && v.v === VERSION && typeof v.analytics === "boolean" ? v : null; } catch (e) { return null; }
  }
  function write(on) {
    try { localStorage.setItem(KEY, JSON.stringify({ v: VERSION, analytics: on, at: new Date().toISOString().slice(0, 10) })); } catch (e) { /* storage blocked: this page only */ }
    memo = on;
  }
  var memo = null;   // the choice on this page, if storage is blocked
  function choice() { var r = read(); return r ? r.analytics : memo; }

  // why analytics can't run here at all ("" when it can, given consent)
  function blocked() {
    var n = navigator || {};
    if (CHILD_SITES.test(location.pathname)) return "child-site";
    if (n.doNotTrack === "1" || window.doNotTrack === "1" || n.globalPrivacyControl === true) return "browser-signal";
    if (ls("gradify.noanalytics") === "1") return "counting-off";
    if (!PROD_HOST.test(location.hostname) && ls("gradify.analytics.dev") !== "1") return "not-live";
    return "";
  }
  var internal = function () { return !PROD_HOST.test(location.hostname) || ls("gradify.internal") === "1"; };
  var allowed = function () { return !blocked() && choice() === true; };

  // The address and referrer Google may see: no query string (sign-in codes, emails, Stripe ids) except utm_ tags,
  // and only app routes after "#" (#/lesson/…), never a sign-in token. These are sent as
  // page_location and page_referrer (docs/ANALYTICS.md).
  function cleanLocation() {
    var q = new URLSearchParams(location.search), keep = new URLSearchParams();
    q.forEach(function (v, k) { if (/^utm_(source|medium|campaign|term|content)$/.test(k)) keep.set(k, v.slice(0, 100)); });
    var hash = /^#\/[\w\/.-]*$/.test(location.hash) ? location.hash.slice(0, 120) : "";
    var qs = keep.toString();
    return location.origin + location.pathname + (qs ? "?" + qs : "") + hash;
  }
  function cleanReferrer() {
    try { var r = document.referrer ? new URL(document.referrer) : null; return r ? r.origin + "/" : ""; } catch (e) { return ""; }
  }
  function siteName() { var m = location.pathname.match(/^\/([a-z]+gradify)(\/|$)/i); return m ? m[1].toLowerCase() : "gradify"; }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  var loaded = false;
  function load() {
    if (loaded || !allowed()) return;
    loaded = true;
    // Consent Mode: analytics only. Advertising storage, ad user data and ad personalisation stay denied.
    gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", functionality_storage: "denied", personalization_storage: "denied", security_storage: "granted" });
    gtag("set", "ads_data_redaction", true);
    gtag("set", "url_passthrough", false);
    // what Google sees as the page: the cleaned address and referrer, not the raw ones
    gtag("set", { page_location: cleanLocation(), page_referrer: cleanReferrer() });
    // Google's snippet: gtag("js", new Date()); gtag("config", "G-CPR5LJB35L"), with privacy settings added
    gtag("js", new Date());
    var cfg = { gradify_site: siteName(), cookie_expires: 33696000, allow_google_signals: false, allow_ad_personalization_signals: false };
    if (internal()) cfg.traffic_type = "internal";
    gtag("config", GA4_ID, cfg);
    var s = document.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_ID;
    document.head.appendChild(s);
    // app pages route by "#": keep the cleaned address current for events sent after a route change
    addEventListener("hashchange", function () { gtag("set", { page_location: cleanLocation() }); });
  }

  // remove Google Analytics cookies (_ga, _ga_<id>, _gid, _gat…) for this host and its parent domains
  function clearCookies() {
    var names = document.cookie.split(";").map(function (c) { return c.split("=")[0].trim(); }).filter(function (n) { return /^(_ga|_gid|_gat|_gcl_)/.test(n); });
    var parts = location.hostname.split("."), domains = [""];
    for (var i = 0; i < parts.length - 1; i++) domains.push("; domain=." + parts.slice(i).join("."));
    names.forEach(function (n) { domains.forEach(function (d) { document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + d; }); });
  }

  // Events from Gradify code. Only sent once consent is given; only short strings, numbers and booleans, never
  // anything that looks like personal data.
  var SAFE_NAME = /^[a-z][a-z0-9_]{0,39}$/, BAD_KEY = /(email|name|phone|password|token|card|address|user|uid|id_token|answer|note|text)/i;
  function event(name, params) {
    if (!loaded || !SAFE_NAME.test(name || "")) return;
    var out = { gradify_site: siteName() };
    if (params) for (var k in params) {
      if (!Object.prototype.hasOwnProperty.call(params, k) || BAD_KEY.test(k) || !/^[a-z][a-z0-9_]{0,39}$/.test(k)) continue;
      var v = params[k];
      if (typeof v === "number" && isFinite(v)) out[k] = v;
      else if (typeof v === "boolean") out[k] = v;
      else if (typeof v === "string" && !/@/.test(v)) out[k] = v.slice(0, 100);
    }
    gtag("event", name, out);
  }

  // ---------- the banner and the preferences dialog ----------
  var CSS = ".gc-banner{position:fixed;z-index:2147483000;left:16px;right:16px;bottom:16px;max-width:560px;margin:0 auto;padding:16px 18px;border-radius:16px;background:var(--panel-strong,#111);color:var(--fg,#fff);border:1px solid var(--line-strong,rgba(255,255,255,.2));box-shadow:0 12px 40px rgba(0,0,0,.35);font:14px/1.45 var(--sans,system-ui,sans-serif);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}" +
    ".gc-banner p{margin:0 0 12px}.gc-banner a{color:inherit;text-decoration:underline}.gc-row{display:flex;flex-wrap:wrap;gap:8px}.gc-row .btn{flex:1 1 140px;justify-content:center}" +
    ".gc-dialog{max-width:480px;width:calc(100% - 32px);padding:20px;border-radius:18px;background:var(--panel-strong,#111);color:var(--fg,#fff);border:1px solid var(--line-strong,rgba(255,255,255,.2));font:14px/1.45 var(--sans,system-ui,sans-serif)}" +
    ".gc-dialog::backdrop{background:rgba(0,0,0,.5)}.gc-dialog h2{margin:0 0 8px;font-size:18px}.gc-dialog p{margin:0 0 12px;color:var(--mute,inherit)}" +
    ".gc-opt{display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-top:1px solid var(--line,rgba(255,255,255,.12))}.gc-opt input{margin-top:3px;width:18px;height:18px;flex:none}.gc-opt b{display:block}.gc-opt small{display:block;color:var(--mute,inherit)}" +
    ".gc-link{background:none;border:0;padding:0;color:inherit;font:inherit;text-decoration:underline;cursor:pointer}@media print{.gc-banner{display:none}}";
  function style() { if (document.getElementById("gc-style")) return; var s = document.createElement("style"); s.id = "gc-style"; s.textContent = CSS; document.head.appendChild(s); }
  var POLICY = "/privacy.html#analytics";
  var banner = null;
  function closeBanner() { if (banner) { banner.remove(); banner = null; } }
  function showBanner() {
    if (banner || blocked() || choice() !== null || !document.body) return;
    style();
    banner = document.createElement("section");
    banner.className = "gc-banner"; banner.setAttribute("role", "region"); banner.setAttribute("aria-label", "Analytics cookies");
    banner.innerHTML = '<p>Can Gradify use Google Analytics cookies to see how the site is used and make it better? They\'re off unless you say yes. <a href="' + POLICY + '">How it works</a></p>' +
      '<div class="gc-row"><button type="button" class="btn btn-ghost btn-sm" data-gc="accept"><span>Accept analytics</span></button><button type="button" class="btn btn-ghost btn-sm" data-gc="reject"><span>Reject analytics</span></button><button type="button" class="btn btn-ghost btn-sm" data-gc="manage"><span>Manage preferences</span></button></div>';
    banner.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-gc]"); if (!b) return;
      var a = b.getAttribute("data-gc");
      if (a === "accept") accept(); else if (a === "reject") reject(); else open(b);
    });
    document.body.appendChild(banner);
  }

  var REASONS = {
    "child-site": "Analytics is never used on this site, whatever you choose.",
    "browser-signal": "Your browser asks sites not to track you (Do Not Track or Global Privacy Control), so Google Analytics stays off.",
    "counting-off": "You've turned off usage counting in this browser on the privacy page, so Google Analytics stays off too.",
    "not-live": "Analytics only runs on getgradify.com, so it's off here.",
  };
  function open(from) {
    style();
    var d = document.createElement("dialog"), why = blocked();
    d.className = "gc-dialog"; d.setAttribute("aria-labelledby", "gc-title");
    d.innerHTML = '<h2 id="gc-title">Cookie preferences</h2><p>Your choice is kept in this browser. You can change it any time from the privacy page or the "Cookie settings" link at the bottom of a page.</p>' +
      '<div class="gc-opt"><input type="checkbox" checked disabled id="gc-ess"><label for="gc-ess"><b>Essential</b><small>Sign-in, your settings and saved study data in this browser. Always on: the site needs them.</small></label></div>' +
      '<div class="gc-opt"><input type="checkbox" id="gc-an"' + (allowed() ? " checked" : "") + (why ? " disabled" : "") + '><label for="gc-an"><b>Analytics (Google Analytics)</b><small>' + (why ? REASONS[why] : 'Sets Google Analytics cookies to count visits and how features are used. No advertising. <a href="' + POLICY + '">Details</a>') + '</small></label></div>' +
      '<div class="gc-row"><button type="button" class="btn btn-ghost btn-sm" data-gc="save"><span>Save choice</span></button><button type="button" class="btn btn-ghost btn-sm" data-gc="cancel"><span>Cancel</span></button></div>';
    d.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-gc]");
      if (!b) return;
      if (b.getAttribute("data-gc") === "save" && !why) { var on = d.querySelector("#gc-an").checked; d.close(); on ? accept() : reject(); }
      else d.close();
    });
    d.addEventListener("close", function () { d.remove(); if (from && from.focus) from.focus(); });
    document.body.appendChild(d);
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
    return d;
  }
  function accept() { write(true); closeBanner(); load(); fire(); }
  function reject() {
    var was = loaded;
    write(false); closeBanner(); clearCookies(); fire();
    if (was) location.reload();   // the loaded tag can't be unloaded; a fresh page has none
  }
  function fire() { try { document.dispatchEvent(new CustomEvent("gradify:consent", { detail: { analytics: allowed(), blocked: blocked() } })); } catch (e) { /* old browser */ } }

  // a "Cookie settings" link in each page's footer, and any element with data-cookie-settings, opens the dialog
  function mountLinks() {
    document.addEventListener("click", function (e) {
      var t = e.target.closest && e.target.closest("[data-cookie-settings], a[href='#cookie-settings']");
      if (t) { e.preventDefault(); open(t); }
    });
    if (CHILD_SITES.test(location.pathname)) return;
    var f = document.querySelector(".hub-foot-base") || document.querySelector("body > footer, footer");
    if (f && !f.querySelector("[data-cookie-settings]")) {
      var b = document.createElement("button"); b.type = "button"; b.className = "gc-link"; b.setAttribute("data-cookie-settings", "");
      b.textContent = "Cookie settings"; style();
      var p = document.createElement("p"); p.style.margin = "8px 0 0"; p.style.fontSize = "13px"; p.appendChild(b); f.appendChild(p);
    }
  }

  window.gradifyConsent = { state: choice, allowed: allowed, blocked: blocked, accept: accept, reject: reject, open: open, event: event };
  // the choice made in another tab
  addEventListener("storage", function (e) { if (e.key === KEY) { if (allowed()) { closeBanner(); load(); } else if (loaded) location.reload(); else closeBanner(); } });

  load();
  if (stub) stub.q.forEach(function (e) { event(e[0], e[1]); });
  function ready() { mountLinks(); showBanner(); fire(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready); else ready();
})();
