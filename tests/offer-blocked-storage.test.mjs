// offer.js when the browser blocks storage: the offer lasts for the page
import { test } from "node:test";
import assert from "node:assert/strict";
globalThis.localStorage = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); }, removeItem() { throw new Error("blocked"); } };
const { captureOffer, offerToShow } = await import("../kit/data/offer.js");
test("storage blocked: the captured offer still shows on this page", () => {
  const now = Date.parse("2026-11-20T12:00:00Z");
  assert.equal(captureOffer("?offer=GRADIFY48", now)?.code, "GRADIFY48");
  assert.equal(offerToShow({ now })?.code, "GRADIFY48");
});
