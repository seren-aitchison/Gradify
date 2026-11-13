// Haptic feedback on phones that support it (the Vibration API: Android browsers and installed web apps).
// Short, distinct patterns for a tap, a success, a warning and a shuffle. Silent where it isn't supported, when the
// learner asks for reduced motion, or when they turn it off in Settings (stored in this browser).
const OFF = "gradify.haptics";
const PATTERNS = { tap: 8, select: 12, success: [12, 40, 18], warn: [30, 50, 30], shuffle: [6, 30, 10], heavy: 22 };

export const hapticsOn = () => { try { return localStorage.getItem(OFF) !== "off"; } catch { return true; } };
export const setHaptics = (on) => { try { if (on) localStorage.removeItem(OFF); else localStorage.setItem(OFF, "off"); } catch { /* storage blocked */ } };
export const hapticsSupported = () => typeof navigator !== "undefined" && typeof navigator.vibrate === "function";

export function haptic(kind = "tap") {
  if (!hapticsSupported() || !hapticsOn()) return;
  if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  try { navigator.vibrate(PATTERNS[kind] ?? PATTERNS.tap); } catch { /* not allowed here */ }
}
