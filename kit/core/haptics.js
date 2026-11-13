// Haptic feedback. Two routes, because phones differ:
//  - Android browsers and installed web apps: the Vibration API, with short distinct patterns.
//  - iPhone and iPad (Safari, iOS 18 and later): Safari has no Vibration API, but toggling a native switch
//    (<input type="checkbox" switch>) plays the system haptic. Gradify keeps one hidden switch and toggles it:
//    once for a tap, twice in quick succession for "complete", which feels like Apple Pay's confirmation.
//    It fires reliably while it's part of a tap; after a long wait (an AI reply, a sync) iOS may stay silent.
// Silent where neither is available, when the learner asks for reduced motion, or when they turn haptics off.
const OFF = "gradify.haptics";
const PATTERNS = { tap: 8, select: 12, success: [12, 40, 18], complete: [14, 70, 28], warn: [30, 50, 30], shuffle: [6, 30, 10], heavy: 22 };
const IOS_TICKS = { tap: 1, select: 1, shuffle: 1, success: 2, complete: 2, warn: 3, heavy: 1 };

export const hapticsOn = () => { try { return localStorage.getItem(OFF) !== "off"; } catch { return true; } };
export const setHaptics = (on) => { try { if (on) localStorage.removeItem(OFF); else localStorage.setItem(OFF, "off"); } catch { /* storage blocked */ } };
const canVibrate = () => typeof navigator !== "undefined" && typeof navigator.vibrate === "function";
const isIOS = () => typeof navigator !== "undefined" && (/iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));
export const hapticsSupported = () => canVibrate() || isIOS();

let sw = null;
function iosTick() {
  if (typeof document === "undefined") return;
  if (!sw) {
    sw = document.createElement("label");
    sw.setAttribute("aria-hidden", "true");
    sw.style.cssText = "position:fixed;left:-100px;top:0;width:1px;height:1px;opacity:0;overflow:hidden;pointer-events:none";
    const input = document.createElement("input");
    input.type = "checkbox"; input.setAttribute("switch", ""); input.tabIndex = -1;
    sw.append(input);
    document.body.append(sw);
  }
  sw.click();
}

export function haptic(kind = "tap") {
  if (!hapticsOn() || globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  try {
    if (canVibrate()) { navigator.vibrate(PATTERNS[kind] ?? PATTERNS.tap); return; }
    if (isIOS()) { const n = IOS_TICKS[kind] ?? 1; iosTick(); for (let i = 1; i < n; i++) setTimeout(iosTick, i * 110); }
  } catch { /* not allowed here */ }
}
