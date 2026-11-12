// Supabase Edge Function: billing-webhook  (deployed with verify_jwt off: Stripe calls it, not a learner)
// Stripe sends subscription events here; each is verified with the webhook signing secret, applied once (billing_events
// records processed ids) and written to public.subscriptions with the service role. Nothing else writes subscriptions.
// The decision itself is handleStripeEvent in ../_shared/billing.js, tested in tests/billing-stripe.test.mjs.
// Events: checkout.session.completed, customer.subscription.created / updated / deleted / paused / resumed.
// Secrets: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET.
import { createClient } from "npm:@supabase/supabase-js@2.117.0";
import { stripe, handleStripeEvent } from "../_shared/billing.js";

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Use POST.", { status: 405 });
  const secret = Deno.env.get("STRIPE_SECRET_KEY"), whsec = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (!secret || !whsec) return new Response("Billing isn't configured.", { status: 503 });
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const out = await handleStripeEvent(await req.text(), req.headers.get("stripe-signature") ?? "", {
    whsec,
    getSubscription: (id: string) => stripe(secret, "GET", `/subscriptions/${id}`),
    async claimEvent(id: string, type: string) {
      const { error } = await admin.from("billing_events").insert({ id, type });
      if (!error) return "new";
      if (error.code === "23505") return "duplicate";
      throw error;
    },
    async releaseEvent(id: string) { await admin.from("billing_events").delete().eq("id", id); },
    async storedFor(user: string) { return (await admin.from("subscriptions").select("stripe_subscription_id, status").eq("user_id", user).maybeSingle()).data; },
    async userForCustomer(customer: string) { return (await admin.from("subscriptions").select("user_id").eq("stripe_customer_id", customer).maybeSingle()).data?.user_id ?? null; },
    async save(user: string, row: Record<string, unknown>) { const { error } = await admin.from("subscriptions").upsert({ user_id: user, ...row }); if (error) throw error; },
  }).catch((e) => ({ status: 500, body: "Try again.", reason: (e as Error).message }));
  if (out.status !== 200 || out.reason) console.warn("billing-webhook", out.status, out.reason ?? out.body);
  return new Response(out.body, { status: out.status });
});
