// Supabase Edge Function: billing-webhook  (deployed with verify_jwt off: Stripe calls it, not a learner)
// Stripe sends subscription events here; each is verified with the webhook signing secret, applied once (billing_events
// records processed ids) and written to public.subscriptions with the service role. Nothing else writes subscriptions.
// Events: checkout.session.completed, customer.subscription.created / updated / deleted / paused / resumed.
// Secrets: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET.
import { createClient } from "npm:@supabase/supabase-js@2.117.0";
import { stripe, verifyStripeEvent, subscriptionRow, userOf } from "../_shared/billing.js";

const SUB_EVENTS = new Set(["customer.subscription.created", "customer.subscription.updated", "customer.subscription.deleted", "customer.subscription.paused", "customer.subscription.resumed"]);

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Use POST.", { status: 405 });
  const secret = Deno.env.get("STRIPE_SECRET_KEY"), whsec = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (!secret || !whsec) return new Response("Billing isn't configured.", { status: 503 });
  const payload = await req.text();
  let event: any;
  try { event = await verifyStripeEvent(payload, req.headers.get("stripe-signature") ?? "", whsec); }
  catch (e) { console.warn("billing-webhook: rejected", (e as Error).message); return new Response("Bad signature.", { status: 400 }); }

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  // apply each event once: a redelivery finds its id already recorded
  const { error: dup } = await admin.from("billing_events").insert({ id: event.id, type: event.type });
  if (dup) {
    if (dup.code === "23505") return new Response("Already processed.", { status: 200 });
    console.error("billing-webhook: ledger", dup.message); return new Response("Try again.", { status: 500 });
  }
  try {
    let sub: any = null, user: string | null = null;
    if (event.type === "checkout.session.completed" && event.data.object.mode === "subscription") {
      const s = event.data.object;
      user = userOf(s);
      // always read the subscription fresh from Stripe rather than trusting the event's copy
      sub = await stripe(secret, "GET", `/subscriptions/${s.subscription}`);
    } else if (SUB_EVENTS.has(event.type)) {
      sub = await stripe(secret, "GET", `/subscriptions/${event.data.object.id}`);
      user = userOf(sub);
    } else return new Response("Ignored.", { status: 200 });

    const row = subscriptionRow(sub);
    if (!user) {
      // fall back to the customer the checkout function linked to the learner
      const { data } = await admin.from("subscriptions").select("user_id").eq("stripe_customer_id", row.stripe_customer_id).maybeSingle();
      user = data?.user_id ?? null;
    }
    if (!user) throw new Error(`no Gradify user for customer ${row.stripe_customer_id}`);
    const { error } = await admin.from("subscriptions").upsert({ user_id: user, ...row });
    if (error) throw error;
    return new Response("OK", { status: 200 });
  } catch (e) {
    // let Stripe retry: forget the event id so the retry is processed
    await admin.from("billing_events").delete().eq("id", event.id);
    console.error("billing-webhook", event.type, (e as Error).message);
    return new Response("Try again.", { status: 500 });
  }
});
