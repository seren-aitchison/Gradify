// The Gradify Pro launch offer: kept from the campaign link through sign-in and set-up (kit/data/offer.js), and
// applied at checkout when Stripe accepts it, with Stripe's own code field otherwise (supabase/functions/_shared/billing.js).
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";

const mem = new Map();
globalThis.localStorage = { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) };
const { OFFER, captureOffer, offerInUrl, offerToShow, storedOffer, dismissOffer, offerForAccount, offerTerms, offerLive } = await import("../kit/data/offer.js");
const { promoFields, cleanPromo } = await import("../supabase/functions/_shared/billing.js");

const BEFORE = Date.parse("2026-11-20T12:00:00Z"), AFTER = Date.parse("2026-11-23T00:00:01Z");
beforeEach(() => mem.clear());

test("the offer matches the live Stripe promotion code and ends with it", () => {
  assert.equal(OFFER.code, "GRADIFY48");
  assert.equal(Date.parse(OFFER.ends) / 1000, 1795391999);   // promo_1UdWwnEOmpIuKzUMqORXVU9l expires_at
  assert.ok(offerLive(BEFORE)); assert.ok(!offerLive(AFTER));
  assert.equal(offerTerms(1000), "£5 for your first month, then £10 a month (VAT included) until you cancel. Cancel any time.");
});

test("the campaign link is recognised by its code or its campaign tag, and nothing else", () => {
  assert.ok(offerInUrl("?offer=gradify48"));
  assert.ok(offerInUrl("?utm_source=email&utm_medium=email&utm_campaign=pro_launch"));
  assert.ok(!offerInUrl("?utm_campaign=other"));
  assert.ok(!offerInUrl(""));
});

test("the offer survives a sign-in redirect that drops the query string", () => {
  captureOffer("?offer=GRADIFY48", BEFORE);
  // back from the magic link or Google: app.html with no query string
  assert.equal(captureOffer("", BEFORE)?.code, "GRADIFY48");
  assert.equal(offerToShow({ now: BEFORE })?.code, "GRADIFY48");
});

test("arriving without the campaign shows nothing", () => {
  assert.equal(captureOffer("", BEFORE), null);
  assert.equal(offerToShow({ now: BEFORE }), null);
});

test("learners already on Pro or Ultra never see it", () => {
  captureOffer("?offer=GRADIFY48", BEFORE);
  assert.equal(offerToShow({ plan: "plus", now: BEFORE }), null);
  assert.equal(offerToShow({ plan: "pro", now: BEFORE }), null);
});

test("dismissing hides the card; following the link again brings it back", () => {
  captureOffer("?offer=GRADIFY48", BEFORE);
  dismissOffer();
  assert.equal(offerToShow({ now: BEFORE }), null);
  assert.ok(offerToShow({ now: BEFORE, includeDismissed: true }));
  captureOffer("?offer=GRADIFY48", BEFORE);
  assert.ok(offerToShow({ now: BEFORE }));
});

test("the offer kept in the account shows on another device, and nothing after it ends", () => {
  const learner = offerForAccount({ code: "GRADIFY48", at: "2026-11-20T12:00:00Z" });
  assert.equal(storedOffer(BEFORE, learner)?.code, "GRADIFY48");
  assert.equal(offerToShow({ learner, now: AFTER }), null);
  assert.equal(captureOffer("?offer=GRADIFY48", AFTER), null);
});

test("promotion codes are cleaned before they reach Stripe", () => {
  assert.equal(cleanPromo(" gradify48 "), "GRADIFY48");
  assert.equal(cleanPromo("x&active=false"), null);
  assert.equal(cleanPromo(""), null);
  assert.equal(cleanPromo(undefined), null);
});

const fakeStripe = (data) => async (url) => ({ ok: true, json: async () => ({ data, url }) });
test("checkout applies an active code, and falls back to Stripe's code field otherwise", async () => {
  let asked;
  const found = await promoFields("sk_test", "GRADIFY48", async (url) => { asked = url; return { ok: true, json: async () => ({ data: [{ id: "promo_1" }] }) }; });
  assert.deepEqual(found, { discounts: [{ promotion_code: "promo_1" }] });
  assert.match(asked, /\/promotion_codes\?code=GRADIFY48&active=true&limit=1$/);
  // never both: Stripe rejects discounts together with allow_promotion_codes
  assert.equal(found.allow_promotion_codes, undefined);
  assert.deepEqual(await promoFields("sk_test", "GRADIFY48", fakeStripe([])), { allow_promotion_codes: "true" });
  assert.deepEqual(await promoFields("sk_test", undefined, fakeStripe([{ id: "promo_1" }])), { allow_promotion_codes: "true" });
  assert.deepEqual(await promoFields("sk_test", "GRADIFY48", async () => ({ ok: false, status: 500, json: async () => ({}) })), { allow_promotion_codes: "true" });
});

test("Checkout tells the buyer it's a monthly membership that renews automatically, and at what price", async () => {
  const { renewalNote } = await import("../supabase/functions/_shared/billing.js");
  assert.equal(renewalNote(1000, { duration: "once", amount_off: 500 }),
    "A monthly membership: £5 for your first month, then £10 a month (VAT included), taken automatically each month until you cancel. Cancel any time from Manage billing on your Gradify Account page.");
  assert.match(renewalNote(1000), /^A monthly membership: £10 a month \(VAT included\), taken automatically/);
  assert.match(renewalNote(1500), /£15 a month/);
  // any other discount: no amount the line can't be sure of (a "forever" £5 off makes every month £5, not £10)
  for (const c of [{ duration: "forever", amount_off: 500 }, { duration: "once", percent_off: 50 }, { duration: "repeating", amount_off: 500 }]) {
    const note = renewalNote(1000, c);
    assert.doesNotMatch(note, /£/, JSON.stringify(c));
    assert.match(note, /^A monthly membership, taken automatically each month at the price shown above/);
  }
  // Checkout with the code field: the buyer may still add GRADIFY48, so the £10 is what follows any discount
  assert.equal(renewalNote(1000, null, { codeEntry: true }),
    "A monthly membership: £10 a month (VAT included) once any discount shown above has ended, taken automatically each month until you cancel. Cancel any time from Manage billing on your Gradify Account page.");
  assert.ok(renewalNote(1000, { duration: "once", amount_off: 500 }).length <= 1200, "Stripe's custom_text limit");
});

test("dismissing an offer that only the account knows (another device) keeps it, marked dismissed", () => {
  const fromAccount = { code: "GRADIFY48", at: "2026-11-19T10:00:00Z", dismissed: false };
  dismissOffer(fromAccount);   // nothing in this browser yet
  assert.equal(offerToShow({ now: BEFORE, learner: { offer: fromAccount } }), null, "hidden here");
  const kept = storedOffer(BEFORE, { offer: fromAccount });
  assert.deepEqual(offerForAccount(kept), { offer: { code: "GRADIFY48", at: "2026-11-19T10:00:00Z", dismissed: true } }, "what's saved back keeps the code");
});

test("billing-checkout opens monthly checkouts only", async () => {
  const src = await (await import("node:fs/promises")).readFile(new URL("../supabase/functions/billing-checkout/index.ts", import.meta.url), "utf8");
  assert.match(src, /\(body\.interval \?\? "month"\) !== "month"\) return json\(req, \{ error: "Choose monthly billing\." \}, 400\)/);
  assert.match(src, /priceFor\(plan, "month", env\)/);
});

test("Pricing keeps the campaign's tracking tags, so sign-ups from each post can be counted", async () => {
  const html = await (await import("node:fs/promises")).readFile(new URL("../pricing.html", import.meta.url), "utf8");
  assert.match(html, /import \{ captureFirstTouch \} from "\/kit\/core\/attribution\.js";/);
  assert.ok(html.indexOf("captureFirstTouch();") > -1 && html.indexOf("captureFirstTouch();") < html.indexOf("captureOffer();"), "captured on arrival");
});
