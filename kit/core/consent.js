// Cookie consent, and Google Analytics (gtag.js, G-CPR5LJB35L), on every Gradify page that loads kit/core/theme-boot.js
// (it loads this file). A classic script with no imports, so it works on every page.
//
// Two separate choices, both off until the visitor says yes:
//   analytics    Google Analytics cookies (_ga): visits and feature use
//   advertising  Google Ads measurement (ad_storage, ad_user_data): whether Gradify's Google ads led to a sign-up or
//                purchase, through the same tag once GA4 is linked to Google Ads. Ad personalisation (remarketing) is
//                never turned on: Gradify's audience includes under-18s.
// Nothing from Google loads until one is accepted. Rejecting, or never choosing, means nothing loads. Turning a choice
// off later deletes Google's cookies and reloads the page, so the loaded tag is gone and doesn't send cookieless pings.
//
// Google never runs, and the banner never shows:
//   - on JuniorGradify and YouthGradify (their audience is children: CHILD_SITES)
//   - when the browser sends Do Not Track or Global Privacy Control
//   - when the visitor turned off counting on the privacy page (localStorage "gradify.noanalytics", kit/core/analytics.js)
//   - away from getgradify.com (localhost, previews), unless localStorage "gradify.analytics.dev" = "1" for testing.
//     Those sessions, and any browser with localStorage "gradify.internal" = "1", are sent as traffic_type "internal"
//     so a GA4 internal-traffic filter can drop them.
//
//   localStorage "gradify.consent" = {"v":2,"analytics":true|false,"ads":true|false,"at":"YYYY-MM-DD"}
//   (a v1 record, from before advertising was asked about, keeps its analytics answer and asks about advertising)
//   window.gradifyConsent: { state(), prefs(), allowed(), adsAllowed(), blocked(), accept(), reject(), save(), open(), event() }
//
// Google's own gtag.js snippet for GA4 (G-CPR5LJB35L), loaded here after consent instead of pasted into each <head>, so it
// can't run before a visitor accepts. One Google tag per page: no GTM container is loaded alongside it.
(function () {
  var stub = window.gradifyConsent && window.gradifyConsent.stub ? window.gradifyConsent : null;
  if (window.gradifyConsent && !stub) return;
  var GA4_ID = "G-CPR5LJB35L";
  var KEY = "gradify.consent", VERSION = 2;
  var CHILD_SITES = /^\/(juniorgradify|youthgradify)(\/|$)/i;
  var PROD_HOST = /(^|\.)getgradify\.com$/i;
  var ls = function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } };

  var bool = function (x) { return typeof x === "boolean" ? x : null; };
  // {analytics, ads}: true, false, or null (not asked yet)
  function read() {
    try {
      var v = JSON.parse(ls(KEY) || "null");
      if (v && v.v === VERSION) return { analytics: bool(v.analytics), ads: bool(v.ads) };
      if (v && v.v === 1) return { analytics: bool(v.analytics), ads: null };
    } catch (e) { /* unreadable: ask again */ }
    return null;
  }
  var memo = null;   // the choice on this page, if storage is blocked
  function prefs() { return read() || memo || { analytics: null, ads: null }; }
  function write(p) {
    memo = { analytics: Boolean(p.analytics), ads: Boolean(p.ads) };
    try { localStorage.setItem(KEY, JSON.stringify({ v: VERSION, analytics: memo.analytics, ads: memo.ads, at: new Date().toISOString().slice(0, 10) })); } catch (e) { /* storage blocked: this page only */ }
  }
  function choice() { return prefs().analytics; }

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
  var allowed = function () { return !blocked() && prefs().analytics === true; };
  var adsAllowed = function () { return !blocked() && prefs().ads === true; };
  var any = function () { return allowed() || adsAllowed(); };

  // The address and referrer Google may see: no query string (sign-in codes, emails, Stripe ids) except utm_ tags (and
  // Google Ads click ids with advertising consent),
  // and only app routes after "#" (#/lesson/…), never a sign-in token. These are sent as
  // page_location and page_referrer (docs/ANALYTICS.md).
  function cleanLocation() {
    var q = new URLSearchParams(location.search), keep = new URLSearchParams();
    // Google Ads click ids only with advertising consent: they're how an ad click is matched to a sign-up or purchase
    var ads = adsAllowed();
    q.forEach(function (v, k) { if (/^utm_(source|medium|campaign|term|content)$/.test(k) || (ads && /^(gclid|gbraid|wbraid)$/.test(k))) keep.set(k, v.slice(0, 200)); });
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
  var loaded = null;   // the consent the tag was loaded with
  var g = function (on) { return on ? "granted" : "denied"; };
  function consentState() { return { analytics_storage: g(allowed()), ad_storage: g(adsAllowed()), ad_user_data: g(adsAllowed()), ad_personalization: "denied", functionality_storage: "denied", personalization_storage: "denied", security_storage: "granted" }; }
  function load() {
    if (loaded || !any()) return;
    loaded = { analytics: allowed(), ads: adsAllowed() };
    // Consent Mode: exactly what the visitor accepted. Ad personalisation is always denied.
    gtag("consent", "default", consentState());
    gtag("set", "ads_data_redaction", !adsAllowed());
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

  // a new choice: more allowed is a consent update on this page; anything taken away needs a fresh page (the tag can't
  // be unloaded), after its cookies are deleted
  function apply() {
    if (!loaded) return load();
    if ((loaded.analytics && !allowed()) || (loaded.ads && !adsAllowed())) { clearCookies(!allowed(), !adsAllowed()); location.reload(); return; }
    gtag("consent", "update", consentState()); gtag("set", "ads_data_redaction", !adsAllowed());
    loaded = { analytics: allowed(), ads: adsAllowed() };
  }

  // remove Google Analytics cookies (_ga, _ga_<id>, _gid, _gat…) for this host and its parent domains
  function clearCookies(analytics, ads) {
    var names = document.cookie.split(";").map(function (c) { return c.split("=")[0].trim(); }).filter(function (n) { return (analytics && /^(_ga|_gid|_gat)/.test(n)) || (ads && /^_gcl_/.test(n)); });
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
    if (FIRST_VALUE.test(name)) firstValue(name);
  }
  // Activation: the first meaningful learning action this browser has sent (a lesson, quiz, exam, flashcard session or
  // study block finished), once, as first_learning_action with which kind it was. A sign-up alone never counts.
  // Remembered in this browser only (gradify.firstvalue: the date), so it fires once per device, not per person.
  var FIRST_VALUE = /^(lesson_complete|quiz_complete|quiz_finish|exam_finish|flashcard_session_complete|study_plan_block_done)$/, FV_KEY = "gradify.firstvalue";
  function firstValue(kind) {
    try { if (localStorage.getItem(FV_KEY)) return; localStorage.setItem(FV_KEY, new Date().toISOString().slice(0, 10)); } catch (e) { return; }
    var exp = ""; try { var e = JSON.parse(localStorage.getItem("gradify.exp") || "{}"); exp = Object.keys(e).map(function (k) { return k + ":" + e[k]; }).join(",").slice(0, 100); } catch (err) { /* none */ }
    gtag("event", "first_learning_action", exp ? { gradify_site: siteName(), kind: kind, exp: exp } : { gradify_site: siteName(), kind: kind });
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
    var p = prefs();
    if (banner || blocked() || (p.analytics !== null && p.ads !== null) || !document.body) return;
    style();
    banner = document.createElement("section");
    banner.className = "gc-banner"; banner.setAttribute("role", "region"); banner.setAttribute("aria-label", "Cookie choices");
    banner.innerHTML = '<p>Can Gradify use Google cookies to see how the site is used (analytics) and whether its Google ads work (advertising)? No personalised ads. They\'re off unless you say yes. <a href="' + POLICY + '">How it works</a></p>' +
      '<div class="gc-row"><button type="button" class="btn btn-ghost btn-sm" data-gc="accept"><span>Accept all</span></button><button type="button" class="btn btn-ghost btn-sm" data-gc="reject"><span>Reject all</span></button><button type="button" class="btn btn-ghost btn-sm" data-gc="manage"><span>Manage preferences</span></button></div>';
    banner.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-gc]"); if (!b) return;
      var a = b.getAttribute("data-gc");
      if (a === "accept") accept(); else if (a === "reject") reject(); else open(b);
    });
    document.body.appendChild(banner);
  }

  var REASONS = {
    "child-site": "Never used on this site, whatever you choose.",
    "browser-signal": "Your browser asks sites not to track you (Do Not Track or Global Privacy Control), so this stays off.",
    "counting-off": "You've turned off usage counting in this browser on the privacy page, so this stays off too.",
    "not-live": "Only runs on getgradify.com, so it's off here.",
  };
  function open(from) {
    style();
    var d = document.createElement("dialog"), why = blocked();
    d.className = "gc-dialog"; d.setAttribute("aria-labelledby", "gc-title");
    d.innerHTML = '<h2 id="gc-title">Cookie preferences</h2><p>Your choice is kept in this browser. You can change it any time from the privacy page or the "Cookie settings" link at the bottom of a page.</p>' +
      '<div class="gc-opt"><input type="checkbox" checked disabled id="gc-ess"><label for="gc-ess"><b>Essential</b><small>Sign-in, your settings and saved study data in this browser. Always on: the site needs them.</small></label></div>' +
      '<div class="gc-opt"><input type="checkbox" id="gc-an"' + (allowed() ? " checked" : "") + (why ? " disabled" : "") + '><label for="gc-an"><b>Analytics (Google Analytics)</b><small>' + (why ? REASONS[why] : 'Sets Google Analytics cookies to count visits and how features are used. <a href="' + POLICY + '">Details</a>') + '</small></label></div>' +
      '<div class="gc-opt"><input type="checkbox" id="gc-ad"' + (adsAllowed() ? " checked" : "") + (why ? " disabled" : "") + '><label for="gc-ad"><b>Advertising measurement (Google Ads)</b><small>' + (why ? REASONS[why] : 'Lets Google tell Gradify whether its ads led to a sign-up or a purchase. Never used to show you personalised ads. <a href="' + POLICY + '">Details</a>') + '</small></label></div>' +
      '<div class="gc-row"><button type="button" class="btn btn-ghost btn-sm" data-gc="save"><span>Save choice</span></button><button type="button" class="btn btn-ghost btn-sm" data-gc="cancel"><span>Cancel</span></button></div>';
    d.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-gc]");
      if (!b) return;
      if (b.getAttribute("data-gc") === "save" && !why) { var p = { analytics: d.querySelector("#gc-an").checked, ads: d.querySelector("#gc-ad").checked }; d.close(); save(p); }
      else d.close();
    });
    d.addEventListener("close", function () { d.remove(); if (from && from.focus) from.focus(); });
    document.body.appendChild(d);
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
    return d;
  }
  function save(p) { write(p); closeBanner(); if (!p.analytics || !p.ads) clearCookies(!p.analytics, !p.ads); fire(); apply(); }
  function accept() { save({ analytics: true, ads: true }); }
  function reject() { save({ analytics: false, ads: false }); }
  function fire() { try { document.dispatchEvent(new CustomEvent("gradify:consent", { detail: { analytics: allowed(), ads: adsAllowed(), blocked: blocked() } })); } catch (e) { /* old browser */ } }

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

  window.gradifyConsent = { state: choice, prefs: prefs, allowed: allowed, adsAllowed: adsAllowed, blocked: blocked, accept: accept, reject: reject, save: save, open: open, event: event };
  // the choice made in another tab
  addEventListener("storage", function (e) { if (e.key === KEY) { closeBanner(); apply(); } });

  load();
  if (stub) stub.q.forEach(function (e) { event(e[0], e[1]); });
  function ready() { mountLinks(); showBanner(); fire(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready); else ready();
})();
