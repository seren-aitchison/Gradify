// The Gradify Pro launch offer: £5 for the first month with code GRADIFY48 (campaign/plus-launch/README.md has the live
// Stripe coupon and promotion code). Someone who arrives from the campaign link keeps the offer through sign-in
// (magic link and Google both come back to app.html without the link's query string), email verification and
// set-up: it's kept in this browser, and once they're signed in, in their account (profiles.learner.offer), so the
// app can show it after set-up and on Today, and checkout can apply the code for them.
//
// The offer is only a reminder and a shortcut. Stripe decides who may use the code (first-time customers, before the
// expiry), and billing-checkout falls back to Stripe's own "Add promotion code" field if the code can't be applied.

export const OFFER = Object.freeze({
  code: "GRADIFY48",
  campaign: "pro_launch",
  firstMonthPence: 500,
  // the promotion code's expires_at in Stripe: 22 November 2026 23:59:59 UK time (GMT, so the same as UTC)
  ends: "2026-11-22T23:59:59Z",
  endsLabel: "Sunday 22 November 2026",
});

const KEY = "gradify.offer";
const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; } };
const write = (v) => { try { v ? localStorage.setItem(KEY, JSON.stringify(v)) : localStorage.removeItem(KEY); } catch { /* storage blocked: the offer lasts this page only */ } };

export const offerLive = (now = Date.now()) => now <= new Date(OFFER.ends).getTime();

/** Whether a URL carries the campaign: ?offer=GRADIFY48 or utm_campaign=pro_launch. */
export function offerInUrl(search = location.search) {
  const q = new URLSearchParams(search);
  return (q.get("offer") || "").toUpperCase() === OFFER.code || q.get("utm_campaign") === OFFER.campaign;
}

/** Remember the offer when this page was opened from the campaign. Following the link again brings back a
 *  dismissed offer. Returns the stored offer, or null. */
export function captureOffer(search = location.search, now = Date.now()) {
  if (!offerLive(now)) return null;
  if (offerInUrl(search)) write({ code: OFFER.code, at: new Date(now).toISOString(), dismissed: false });
  return storedOffer(now);
}

/** The offer kept in this browser or in the learner's account, while it's live. */
export function storedOffer(now = Date.now(), learner = null) {
  if (!offerLive(now)) return null;
  const local = read(), saved = learner?.offer;
  const o = local?.code === OFFER.code ? local : saved?.code === OFFER.code ? saved : null;
  return o ? { ...o, dismissed: Boolean(local?.dismissed ?? saved?.dismissed) } : null;
}

/** The offer to show: kept, live, not dismissed, and the learner is on Free. */
export function offerToShow({ plan = "free", learner = null, now = Date.now(), includeDismissed = false } = {}) {
  const o = storedOffer(now, learner);
  if (!o || plan !== "free") return null;
  return includeDismissed || !o.dismissed ? o : null;
}

export function dismissOffer() { const o = read(); if (o) write({ ...o, dismissed: true }); }
export function forgetOffer() { write(null); }
/** The fields to save into profiles.learner so the offer follows the learner's account to their other devices. */
export const offerForAccount = (o) => (o ? { offer: { code: o.code, at: o.at, dismissed: Boolean(o.dismissed) } } : {});

const pounds = (p) => `£${(p / 100).toFixed(p % 100 ? 2 : 0)}`;
/** One sentence of terms, from the real prices: "£5 for your first month, then £10 a month. Cancel any time." */
export const offerTerms = (renewPence) => `${pounds(OFFER.firstMonthPence)} for your first month, then ${pounds(renewPence)} a month (VAT included) until you cancel. Cancel any time.`;
