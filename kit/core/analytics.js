// Privacy-first usage counts: a page view, and a few learning events, as anonymous rows in page_events
// (supabase/migrations/20261106140000_page_events.sql). What is sent: the site, the page path (never the
// part after # or ?), the event, the referring site's host name, and phone / tablet / desktop. No cookie,
// no identifier of any kind, no time of day. Nothing is sent:
//   - until Gradify accounts are configured (gradify.config.js)
//   - on localhost
//   - when the browser asks not to be tracked (Do Not Track or Global Privacy Control)
//   - after the learner turns it off on the privacy page (stored in this browser only)
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../../gradify.config.js";

const OFF = "gradify.noanalytics";
export const EVENTS = ["view", "lesson_complete", "exam_finish", "tutor"];

export function analyticsAllowed(env = globalThis, configured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)) {
  const nav = env.navigator || {}, loc = env.location || {};
  if (!configured) return false;
  if (/^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(loc.hostname || "")) return false;
  if (nav.doNotTrack === "1" || env.doNotTrack === "1" || nav.globalPrivacyControl === true) return false;
  try { if (env.localStorage?.getItem(OFF) === "1") return false; } catch { /* storage blocked: still anonymous */ }
  return true;
}
export function setAnalytics(on) { try { if (on) localStorage.removeItem(OFF); else localStorage.setItem(OFF, "1"); } catch { /* storage blocked */ } }
export const analyticsOptedOut = () => { try { return localStorage.getItem(OFF) === "1"; } catch { return false; } };

// the row for an event: only these fields, cut to the database's limits
export function eventRow(event, site, env = globalThis) {
  const loc = env.location || {}, doc = env.document || {}, w = env.innerWidth || 1024;
  let referrer = null;
  try { const r = doc.referrer ? new URL(doc.referrer) : null; if (r && r.hostname !== loc.hostname) referrer = r.hostname.slice(0, 100); } catch { /* not a URL */ }
  return { site: String(site || "Gradify").slice(0, 40), path: String(loc.pathname || "/").slice(0, 200), event, referrer, device: w < 640 ? "phone" : w < 1024 ? "tablet" : "desktop" };
}

export function track(event, site) {
  if (!EVENTS.includes(event) || !analyticsAllowed()) return;
  const headers = { apikey: SUPABASE_ANON_KEY, "Content-Type": "application/json", Prefer: "return=minimal" };
  if (SUPABASE_ANON_KEY.startsWith("eyJ")) headers.Authorization = `Bearer ${SUPABASE_ANON_KEY}`;
  fetch(`${SUPABASE_URL}/rest/v1/page_events`, { method: "POST", keepalive: true, headers, body: JSON.stringify(eventRow(event, site)) }).catch(() => {});
}
let viewed = false;
export function trackView(site) { if (!viewed) { viewed = true; track("view", site); } }
