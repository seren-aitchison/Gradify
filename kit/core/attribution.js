// Where a learner first came from, so a launch can see which post or channel brought its signups.
// On the first visit to any Gradify page, the utm_* tags in the link (and the referring site's host name)
// are kept in this browser. When the learner later makes an account, they're written once to the account's
// user_metadata.first_touch (see recordFirstTouch, called by the app after sign-in).
// Kept: utm_source, utm_medium, utm_campaign, utm_content, ref, the referrer's host, the landing path, and the day.
const KEY = "gradify.firsttouch";
const TAGS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "ref"];

export function readFirstTouch() {
  try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
}

// the first-touch record for this visit, or null when there's nothing worth keeping
export function touchFrom(loc = globalThis.location, doc = globalThis.document) {
  const params = new URLSearchParams(loc?.search || "");
  const t = {};
  for (const k of TAGS) { const v = params.get(k); if (v) t[k] = v.slice(0, 100); }
  try {
    const r = doc?.referrer ? new URL(doc.referrer) : null;
    if (r && r.hostname !== loc?.hostname) t.referrer = r.hostname.slice(0, 100);
  } catch { /* not a URL */ }
  if (!Object.keys(t).length) return null;
  t.landing = String(loc?.pathname || "/").slice(0, 200);
  t.day = new Date().toISOString().slice(0, 10);
  return t;
}

// call on every page load: keeps the first record only (tagged links win over a bare referrer)
export function captureFirstTouch() {
  try {
    const t = touchFrom();
    if (!t) return;
    const had = readFirstTouch();
    if (!had || (!had.utm_source && t.utm_source)) localStorage.setItem(KEY, JSON.stringify(t));
  } catch { /* storage blocked */ }
}

// after sign-in: save the record to the account once (works for email links and Google alike)
export async function recordFirstTouch(db, user) {
  const t = readFirstTouch();
  if (!t || !user || user.user_metadata?.first_touch) return;
  try { await db.auth.updateUser({ data: { first_touch: t } }); } catch { /* not important enough to bother the learner */ }
}
