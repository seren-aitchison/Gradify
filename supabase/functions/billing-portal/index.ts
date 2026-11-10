// Supabase Edge Function: billing-portal
// POST { from? }  (signed in)  → { url }  Stripe's customer portal: change plan, update the card, see invoices, cancel.
// Secret: STRIPE_SECRET_KEY.
import { createClient } from "npm:@supabase/supabase-js@2.117.0";
import { stripe } from "../_shared/billing.js";

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
  if (!secret) return json(req, { error: "Billing isn't available yet." }, 503);
  const asUser = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } } });
  const { data: { user } } = await asUser.auth.getUser();
  if (!user) return json(req, { error: "Please sign in." }, 401);
  let body: { from?: string } = {};
  try { body = await req.json(); } catch { /* no body is fine */ }
  const back = typeof body.from === "string" && body.from.startsWith("/") && !body.from.startsWith("//") ? body.from : "/pricing.html";
  // the learner's own row, read with their token (row-level security)
  const { data: sub } = await asUser.from("subscriptions").select("stripe_customer_id").maybeSingle();
  if (!sub?.stripe_customer_id) return json(req, { error: "You don't have a Gradify Pro subscription yet." }, 404);
  try {
    const portal = await stripe(secret, "POST", "/billing_portal/sessions", { customer: sub.stripe_customer_id, return_url: `${SITE}${back}` });
    return json(req, { url: portal.url });
  } catch (e) {
    console.error("billing-portal", (e as Error).message);
    return json(req, { error: "The billing page couldn't be opened. Please try again in a minute." }, 502);
  }
});
