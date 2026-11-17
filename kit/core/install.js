// "Get the Gradify app": a prompt, at a good moment (just after something is finished, or on a later visit), that sends
// the learner to Gradify on the App Store (APP_STORE in gradify.config.js). It never installs the website as an app
// itself. Before the listing is live it shows only when asked (appStoreButton), saying the app is on its way. It never
// shows inside an installed app, and once dismissed it stays away for three weeks.
import * as CONFIG from "../../gradify.config.js";
const KEY = "gradify.install", VISITS = "gradify.visits";
let deferred = null;
if (typeof window !== "undefined") {
  // the browser's own "install this site" offer is kept back: Gradify's app comes from the App Store
  addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferred = e; });
  addEventListener("appinstalled", () => { try { localStorage.setItem(KEY, JSON.stringify({ installed: true })); } catch { /* storage blocked */ } hide(); });
}

export function platform() {
  const ua = navigator.userAgent, touchMac = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  if (/iPad/.test(ua) || touchMac) return "ipad";
  if (/iPhone|iPod/.test(ua)) return "iphone";
  if (/Macintosh/.test(ua) && /Safari/.test(ua) && !/Chrome|Chromium|Edg|Firefox/.test(ua)) return "mac-safari";
  if (/Android/.test(ua)) return "android";
  return "desktop";
}
export const standalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; } };
const write = (v) => { try { localStorage.setItem(KEY, JSON.stringify({ ...read(), ...v })); } catch { /* storage blocked */ } };
export function shouldOffer(now = Date.now()) {
  if (standalone()) return false;
  const s = read();
  if (s.installed) return false;
  if (s.dismissedAt && now - s.dismissedAt < 21 * 864e5) return false;
  return Boolean(appStoreUrl());
}
/** The App Store listing for this device: iPhone and iPad use the iOS one, a Mac the Mac one (or the iOS one, which
 *  runs on Apple-silicon Macs). Empty until the listing is live. */
export function appStoreUrl(p = platform()) {
  const a = CONFIG.APP_STORE || {};
  if (p === "iphone" || p === "ipad") return a.ios || "";
  if (/Macintosh/.test(navigator.userAgent)) return a.mac || a.ios || "";
  return a.ios || a.mac || "";
}
// counts visits, so the prompt can wait until the learner has come back at least once
export function countVisit() { try { const n = Number(sessionStorage.getItem(VISITS) ? localStorage.getItem(VISITS) : (Number(localStorage.getItem(VISITS) || 0) + 1)); localStorage.setItem(VISITS, String(n)); sessionStorage.setItem(VISITS, "1"); return n; } catch { return 1; } }

let el = null;
function hide() { el?.classList.remove("show"); }
const BADGE = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="18" height="18"><path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.19-1.72-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.75 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.71.71 2.88.69 1.19-.02 1.94-1.08 2.67-2.14.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.32-.89-2.33-3.55zM14.17 6.13c.61-.74 1.02-1.76.91-2.78-.88.04-1.94.58-2.57 1.32-.56.65-1.06 1.69-.93 2.69.98.08 1.98-.5 2.59-1.23z"/></svg>`;
/**
 * Shows the "Get the Gradify app" sheet. With a live listing: a button to the App Store. Without one (only when
 * `force` is set, i.e. the learner asked): says the app is coming to the App Store.
 */
export function offerInstall({ reason = "", force = false } = {}) {
  if (standalone()) return false;
  const url = appStoreUrl();
  if (!force && !shouldOffer()) return false;
  if (!el) { el = document.createElement("aside"); el.className = "install-sheet"; el.setAttribute("aria-label", "Get the Gradify app"); document.body.append(el); }
  el.innerHTML = `<div class="install-card">
    <img src="${new URL("../../assets/icons/icon-192.png", import.meta.url)}" alt="" width="56" height="56">
    <div class="install-copy"><b>${url ? "Get the Gradify app" : "The Gradify app is coming to the App Store"}</b><span>${url ? (reason || "Your plan, reviews and streak one tap away, on iPhone, iPad and Mac.") : "Gradify for iPhone, iPad and Mac will be on the App Store soon. Until then, Gradify works in any browser, and your progress will move straight across."}</span>
      ${url ? `<p class="install-fine">Free on the App Store. Sign in with the same account and everything's there.</p>` : ""}</div>
    <div class="install-actions">${url ? `<a class="btn btn-primary lg btn-sm" href="${url}" target="_blank" rel="noopener" data-store>${BADGE}<span>View on the App Store</span></a>` : ""}<button type="button" class="btn btn-ghost lg btn-sm" data-later><span>${url ? "Not now" : "Got it"}</span></button></div>
  </div>`;
  el.querySelector("[data-later]").addEventListener("click", () => { write({ dismissedAt: Date.now() }); hide(); });
  el.querySelector("[data-store]")?.addEventListener("click", () => { write({ dismissedAt: Date.now() }); hide(); });
  requestAnimationFrame(() => el.classList.add("show"));
  return true;
}
