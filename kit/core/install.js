// "Put Gradify on your Home Screen": a prompt, at a good moment (just after something is finished, or on a later
// visit), with the right steps for the learner's device. iPhone and iPad: Share → Add to Home Screen. Mac (Safari
// 17+): File → Add to Dock. Chrome and Edge (desktop and Android): the browser's own install dialog. It never shows
// inside the installed app, and once dismissed it stays away for three weeks.
const KEY = "gradify.install", VISITS = "gradify.visits";
let deferred = null;
if (typeof window !== "undefined") {
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
  const p = platform();
  return p === "iphone" || p === "ipad" || p === "mac-safari" || Boolean(deferred);
}
// counts visits, so the prompt can wait until the learner has come back at least once
export function countVisit() { try { const n = Number(sessionStorage.getItem(VISITS) ? localStorage.getItem(VISITS) : (Number(localStorage.getItem(VISITS) || 0) + 1)); localStorage.setItem(VISITS, String(n)); sessionStorage.setItem(VISITS, "1"); return n; } catch { return 1; } }

const SHARE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M8 7l4-4 4 4"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>`;
const STEPS = {
  iphone: ["Tap <b>Share</b> " + SHARE + " at the bottom of Safari", "Choose <b>Add to Home Screen</b>", "Tap <b>Add</b>. Gradify opens full screen, like an app"],
  ipad: ["Tap <b>Share</b> " + SHARE + " at the top of Safari", "Choose <b>Add to Home Screen</b>", "Tap <b>Add</b>. Gradify opens full screen, like an app"],
  "mac-safari": ["In the menu bar, choose <b>File</b>", "Choose <b>Add to Dock</b>", "Gradify opens in its own window, from your Dock"],
};
let el = null;
function hide() { el?.classList.remove("show"); }
export function offerInstall({ reason = "" } = {}) {
  if (!shouldOffer()) return false;
  const p = platform();
  if (!el) { el = document.createElement("aside"); el.className = "install-sheet"; el.setAttribute("aria-label", "Add Gradify to your Home Screen"); document.body.append(el); }
  const where = p === "mac-safari" ? "your Dock" : p === "desktop" ? "your computer" : "your Home Screen";
  el.innerHTML = `<div class="install-card">
    <img src="${new URL("../../assets/icons/icon-192.png", import.meta.url)}" alt="" width="56" height="56">
    <div class="install-copy"><b>Put Gradify on ${where}</b><span>${reason || "Your plan, reviews and streak one tap away, full screen and working offline."}</span>
      ${STEPS[p] ? `<ol>${STEPS[p].map((s) => `<li>${s}</li>`).join("")}</ol>` : ""}
      <p class="install-fine">Home Screen widgets for iPhone, iPad and Mac come with the Gradify app.</p></div>
    <div class="install-actions">${deferred ? `<button type="button" class="btn btn-primary lg btn-sm" data-install><span>Install Gradify</span></button>` : ""}<button type="button" class="btn btn-ghost lg btn-sm" data-later><span>${deferred ? "Not now" : "Got it"}</span></button></div>
  </div>`;
  el.querySelector("[data-later]").addEventListener("click", () => { write({ dismissedAt: Date.now() }); hide(); });
  el.querySelector("[data-install]")?.addEventListener("click", async () => { deferred.prompt(); const r = await deferred.userChoice.catch(() => null); deferred = null; if (r?.outcome === "accepted") write({ installed: true }); else write({ dismissedAt: Date.now() }); hide(); });
  requestAnimationFrame(() => el.classList.add("show"));
  return true;
}
