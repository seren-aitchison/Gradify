// Real-user page speed, counted the way Google's own field data reports it: for each page view, whether largest
// contentful paint (LCP), interaction to next paint (INP) and cumulative layout shift (CLS) were good, needed
// improvement or were poor. One anonymous count per metric (kit/core/analytics.js: lcp_good, inp_poor …), no numbers,
// no identifiers, nothing if counting is off. Sent once, when the page is hidden or left.
import { track } from "./analytics.js";

// Google's thresholds (web.dev/vitals): good up to the first number, poor above the second
export const LIMITS = { lcp: [2500, 4000], inp: [200, 500], cls: [0.1, 0.25] };
/** "good", "ni" (needs improvement) or "poor" for a metric's value */
export const bucket = (metric, value) => (value <= LIMITS[metric][0] ? "good" : value <= LIMITS[metric][1] ? "ni" : "poor");

/**
 * CLS as Google defines it: shifts are grouped into "session windows" (each shift less than 1 s after the previous one,
 * the window at most 5 s long) and CLS is the worst window, not the sum of every shift the page ever had. Pure.
 * entries: [{ startTime, value, hadRecentInput }]
 */
export function clsOf(entries) {
  let worst = 0, cur = 0, start = 0, last = -Infinity;
  for (const e of entries) {
    if (e.hadRecentInput) continue;
    if (cur && e.startTime - last < 1000 && e.startTime - start < 5000) cur += e.value; else { cur = e.value; start = e.startTime; }
    last = e.startTime; worst = Math.max(worst, cur);
  }
  return worst;
}

export function watchVitals(site, env = globalThis) {
  const PO = env.PerformanceObserver; if (!PO || !env.document) return;
  const shifts = [], v = { lcp: null, inp: null }, observe = (type, fn, opts = {}) => { try { new PO((l) => l.getEntries().forEach(fn)).observe({ type, buffered: true, ...opts }); return true; } catch { return false; } };
  const hasLcp = observe("largest-contentful-paint", (e) => { v.lcp = e.renderTime || e.loadTime || e.startTime; });
  const hasCls = observe("layout-shift", (e) => { shifts.push({ startTime: e.startTime, value: e.value, hadRecentInput: e.hadRecentInput }); });
  // INP: the slowest interaction (for pages with fewer than 50 interactions, which is nearly all of them, that's INP)
  observe("event", (e) => { if (e.interactionId) v.inp = Math.max(v.inp || 0, e.duration); }, { durationThreshold: 40 });
  observe("first-input", (e) => { v.inp = Math.max(v.inp || 0, e.duration); });
  let sent = false;
  const send = () => {
    if (sent) return; sent = true;
    if (hasLcp && v.lcp !== null) track(`lcp_${bucket("lcp", v.lcp)}`, site);
    if (v.inp !== null) track(`inp_${bucket("inp", v.inp)}`, site);
    if (hasCls) track(`cls_${bucket("cls", clsOf(shifts))}`, site);
  };
  env.document.addEventListener("visibilitychange", () => { if (env.document.visibilityState === "hidden") send(); });
  env.addEventListener?.("pagehide", send);
}
