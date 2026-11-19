// Supabase Edge Function: billing-checkout
// POST { plan: "plus" | "pro", interval: "month", promo?: "GRADIFY48" }  (signed in)  → { url }  a Stripe Checkout page for that plan
// With a promo, checkout opens with that promotion code applied; if Stripe won't apply it for this learner (not a
// first-time customer, expired, used up), checkout opens with Stripe's "Add promotion code" field instead.
// Learners already on a paid plan get the billing portal instead (to switch plan), so nobody can subscribe twice.
// Secrets: STRIPE_SECRET_KEY, STRIPE_PRICE_PLUS_MONTH, STRIPE_PRICE_PRO_MONTH, GRADIFY_PLUS_ON_SALE, GRADIFY_PRO_ON_SALE
// (optional: STRIPE_AUTOMATIC_TAX=on).
// Each plan is off sale until its switch is on; before that only GRADIFY_BILLING_TESTERS (comma-separated emails) may buy.
// The learner is identified from their own Supabase token; their Stripe customer id is stored with the service role.
import { createClient } from "npm:@supabase/supabase-js@2.117.0";
import { stripe, priceFor, safeBack, returnUrl, mayBuy, promoFields } from "../_shared/billing.js";

const SITE = (Deno.env.get("GRADIFY_SITE_URL") ?? "https://getgradify.com").replace(/\/+$/, "");
const ALLOWED = (Deno.env.get("GRADIFY_ALLOWED_ORIGINS") ?? "https://getgradify.com,http://localhost:8080").split(",");
const cors = (req: Request) => {
  const origin = req.headers.get("origin") ?? "";
  return { "Access-Control-Allow-Origin": ALLOWED.includes(origin) ? origin : ALLOWED[0], "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS", "Vary": "Origin" };
};
const json = (req: Request, body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors(req), "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(req) });
  if (req.method !== "POST") return json(req, { error: "Use POST." }, 405);
  const secret = Deno.env.get("STRIPE_SECRET_KEY");
  if (!secret) return json(req, { error: "Gradify Pro isn't on sale yet." }, 503);

  const asUser = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } } });
  const { data: { user } } = await asUser.auth.getUser();
  if (!user) return json(req, { error: "Please sign in to choose a plan." }, 401);
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  let body: { plan?: string; interval?: string; from?: string; promo?: string };
  try { body = await req.json(); } catch { return json(req, { error: "Bad request." }, 400); }
  // where to come back to: a page on the Gradify site only
  const back = safeBack(body.from);
  const env = Deno.env.toObject();

  try {
    const { data: sub } = await admin.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle();
    const plan = body.plan === "pro" ? "pro" : "plus";
    // already paying: change plan or billing in Stripe's portal (it switches between the plans' prices, with proration)
    const { data: current } = await admin.rpc("plan_of", { uid: user.id });
    if (current && current !== "free" && sub?.stripe_customer_id) {
      const portal = await stripe(secret, "POST", "/billing_portal/sessions", { customer: sub.stripe_customer_id, return_url: returnUrl(SITE, back) });
      return json(req, { url: portal.url, alreadySubscribed: current });
    }
    if (!mayBuy(user.email, env, plan)) return json(req, { error: plan === "pro" ? "Gradify Ultra opens when Gradify AI launches. Gradify Pro has everything else." : "Gradify Pro isn't on sale yet.", notOnSale: true }, 403);
    const price = priceFor(plan, body.interval ?? "month", env);
    let customer = sub?.stripe_customer_id as string | undefined;
    if (!customer) {
      const c = await stripe(secret, "POST", "/customers", { email: user.email, metadata: { gradify_user_id: user.id } });
      customer = c.id;
      const { error } = await admin.from("subscriptions").upsert({ user_id: user.id, stripe_customer_id: customer, status: sub?.status ?? "none", updated_at: new Date().toISOString() });
      if (error) throw error;
    }
    const sessionFor = (discount: Record<string, unknown>) => stripe(secret, "POST", "/checkout/sessions", {
      ...discount,
      mode: "subscription",
      customer,
      client_reference_id: user.id,
      line_items: [{ price, quantity: 1 }],
      subscription_data: { metadata: { gradify_user_id: user.id, gradify_plan: plan } },
      metadata: { gradify_user_id: user.id, gradify_plan: plan },
      automatic_tax: Deno.env.get("STRIPE_AUTOMATIC_TAX") === "on" ? { enabled: "true" } : undefined,
      customer_update: Deno.env.get("STRIPE_AUTOMATIC_TAX") === "on" ? { address: "auto" } : undefined,
      success_url: returnUrl(SITE, back, { checkout: "success" }),
      cancel_url: returnUrl(SITE, back, { checkout: "cancelled" }),
    });
    const discount = await promoFields(secret, body.promo);
    let session, promoApplied = Boolean(discount.discounts);
    try { session = await sessionFor(discount); }
    catch (e) {
      // Stripe refused the code for this learner (e.g. not their first purchase): the ordinary checkout instead
      if (!promoApplied) throw e;
      console.warn("billing-checkout: promotion code not applied", (e as Error).message);
      session = await sessionFor({ allow_promotion_codes: "true" });
      promoApplied = false;
    }
    return json(req, { url: session.url, promoApplied });
  } catch (e) {
    const status = (e as { status?: number }).status;
    console.error("billing-checkout", (e as Error).message);
    return json(req, { error: status === 503 || status === 400 ? (e as Error).message : "Checkout couldn't be started. Please try again in a minute." }, status === 503 || status === 400 ? status : 502);
  }
});
