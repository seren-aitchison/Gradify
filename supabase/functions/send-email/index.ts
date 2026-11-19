// Supabase Edge Function: send-email
// Runs on a schedule (every minute or two) and sends what's due in public.email_outbox through the EmailService
// (../_shared/email.js), with Resend as the provider (decision D6). Emails are queued only by Gradify's own database
// functions (organisation invitations today; classroom and training emails in later stages), never by a browser.
//
// Environment: RESEND_API_KEY, GRADIFY_EMAIL_FROM (e.g. "Gradify <hello@getgradify.com>", on a domain verified in
// Resend), GRADIFY_SITE_URL, EMAIL_CRON_SECRET (the scheduler sends it as the x-cron-secret header), SUPABASE_URL,
// SUPABASE_SERVICE_ROLE_KEY.
// Deploy: supabase functions deploy send-email --no-verify-jwt   (it checks x-cron-secret itself)
// NOT DEPLOYED: deploy to staging first, after 20261121120000_audit_and_notifications.sql is applied there.
import { createClient } from "npm:@supabase/supabase-js@2.117.0";
import { emailService, resendProvider, drainOutbox } from "../_shared/email.js";

Deno.serve(async (req) => {
  const secret = Deno.env.get("EMAIL_CRON_SECRET");
  if (!secret || req.headers.get("x-cron-secret") !== secret) return new Response("Forbidden", { status: 403 });
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const mail = emailService({
    provider: resendProvider({ apiKey: Deno.env.get("RESEND_API_KEY") }),
    from: Deno.env.get("GRADIFY_EMAIL_FROM"),
    siteUrl: Deno.env.get("GRADIFY_SITE_URL") ?? "https://getgradify.com",
  });
  try {
    const result = await drainOutbox({ rpc: (name: string, args: Record<string, unknown>) => db.rpc(name, args), mail });
    return Response.json(result);
  } catch (e) {
    // never echo addresses or tokens: only the error text
    return new Response(`Couldn't send email: ${(e as Error).message}`.slice(0, 300), { status: 500 });
  }
});
