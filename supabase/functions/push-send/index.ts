// Supabase Edge Function: push-send
// Runs on a schedule (every 15 minutes; see docs/NOTIFICATIONS.md) and sends each learner the few notifications worth
// sending now, by the same rules as the app (kit/intel/nudges.js, copied to _shared by `npm run sync`):
// a morning plan digest, topics about to slip, tomorrow's deadlines, a session about to start, a streak at risk.
// At most the learner's daily cap, never in their quiet hours, never the same kind twice in a day.
//
// Environment: VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT (mailto: or https: contact for push services),
// PUSH_CRON_SECRET (the scheduler sends it as the x-cron-secret header), SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
// Deploy: supabase functions deploy push-send --no-verify-jwt   (it checks x-cron-secret itself)
import webpush from "npm:web-push@3.6.7";
import { createClient } from "npm:@supabase/supabase-js@2.117.0";
import { decideNudges, summaryFromRows, localClock, prefsOf } from "../_shared/nudges.js";

const SITE = (Deno.env.get("GRADIFY_SITE_URL") ?? "https://getgradify.com").replace(/\/+$/, "");

Deno.serve(async (req) => {
  if (req.headers.get("x-cron-secret") !== Deno.env.get("PUSH_CRON_SECRET")) return new Response("Forbidden", { status: 403 });
  webpush.setVapidDetails(Deno.env.get("VAPID_SUBJECT")!, Deno.env.get("VAPID_PUBLIC_KEY")!, Deno.env.get("VAPID_PRIVATE_KEY")!);
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const now = Date.now();
  const { data: subs, error } = await db.from("push_subscriptions").select("*");
  if (error) return new Response(error.message, { status: 500 });

  const byUser = new Map<string, any[]>();
  for (const s of subs ?? []) if (prefsOf(s.prefs).on) (byUser.get(s.user_id) || byUser.set(s.user_id, []).get(s.user_id)!).push(s);
  let sent = 0, gone = 0;
  for (const [userId, devices] of byUser) {
    const tz = devices[0].tz, prefs = devices[0].prefs;
    const { day } = localClock(now, tz);
    // what this learner has been sent today, on any device
    const kinds = [...new Set(devices.filter((d) => d.sent_day === day).flatMap((d) => d.sent_kinds || []))];
    const since = new Date(now - 400 * 864e5).toISOString();
    const [cards, blocks, activity] = await Promise.all([
      db.from("cards").select("document_id, topic, reps, last_rating, due_at, suspended").eq("user_id", userId).then((r) => r.data ?? []),
      db.from("plan_blocks").select("day, start_min, end_min, title, cal, done").eq("user_id", userId).gte("day", new Date(now - 864e5).toISOString().slice(0, 10)).lte("day", new Date(now + 2 * 864e5).toISOString().slice(0, 10)).then((r) => r.data ?? []),
      db.from("activity").select("at").eq("user_id", userId).gte("at", since).then((r) => r.data ?? []),
    ]);
    const nudges = decideNudges(summaryFromRows({ cards, blocks, activity, now, tz }), { now, tz, prefs, sent: { day, kinds } });
    if (!nudges.length) continue;
    for (const n of nudges) for (const d of devices) {
      try {
        await webpush.sendNotification({ endpoint: d.endpoint, keys: { p256dh: d.p256dh, auth: d.auth } },
          JSON.stringify({ title: n.title, body: n.body, url: `${SITE}/${n.url}`, tag: n.tag }), { TTL: 3600, urgency: n.kind === "session" ? "high" : "normal" });
        sent++;
      } catch (e) {
        const code = (e as { statusCode?: number }).statusCode;
        if (code === 404 || code === 410) { await db.from("push_subscriptions").delete().eq("id", d.id); gone++; }
      }
    }
    const newKinds = [...kinds, ...nudges.map((n) => n.kind)];
    await db.from("push_subscriptions").update({ sent_day: day, sent_kinds: newKinds }).eq("user_id", userId);
  }
  return new Response(JSON.stringify({ learners: byUser.size, sent, removed: gone }), { headers: { "Content-Type": "application/json" } });
});
