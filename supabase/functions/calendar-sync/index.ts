// Supabase Edge Function: calendar-sync
// POST { url }  →  { ics }     (signed-in learners only)
// Fetches an iCalendar feed (Google Calendar's "secret address in iCal format", an iCloud public calendar, an
// Outlook published calendar, a university timetable or a Moodle/Canvas/Blackboard export) on the learner's
// behalf, because those servers don't allow browsers to read them directly. The browser parses the feed itself
// (kit/intel/ical.js) and keeps the events as busy time; nothing from the feed is stored here.
// Guards: https only, public hosts only (no IP literals, localhost or internal names), a 2 MB cap, a 15-second
// timeout, and the reply must look like a calendar. Deploy: supabase functions deploy calendar-sync
import { createClient } from "npm:@supabase/supabase-js@2.117.0";

const ALLOWED = (Deno.env.get("GRADIFY_ALLOWED_ORIGINS") ?? "https://getgradify.com,http://localhost:8080").split(",");
const MAX_BYTES = 2_000_000;

function cors(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  return { "Access-Control-Allow-Origin": ALLOWED.includes(origin) ? origin : ALLOWED[0], "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS", "Vary": "Origin" };
}
const json = (req: Request, body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors(req), "Content-Type": "application/json" } });

// a public https host: no IP addresses, no single-label or internal names
function publicUrl(raw: string): URL | null {
  let u: URL;
  try { u = new URL(String(raw).trim().replace(/^webcal:\/\//i, "https://")); } catch { return null; }
  if (u.protocol !== "https:" || u.username || u.password || (u.port && u.port !== "443")) return null;
  const h = u.hostname.toLowerCase();
  if (!h.includes(".") || /^[\d.]+$/.test(h) || h.includes(":") || /(^|\.)(localhost|local|internal|intranet|lan|home|corp)$/.test(h)) return null;
  return u;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(req) });
  if (req.method !== "POST") return json(req, { error: "Use POST." }, 405);
  const asUser = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } } });
  const { data: { user } } = await asUser.auth.getUser();
  if (!user) return json(req, { error: "Please sign in to sync a calendar link.", reason: "signed_out" }, 401);

  let body: { url?: string };
  try { body = await req.json(); } catch { return json(req, { error: "Bad request." }, 400); }
  const url = publicUrl(body?.url ?? "");
  if (!url) return json(req, { error: "That doesn't look like a public calendar link. It should start with https:// or webcal://." }, 400);

  const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 15_000);
  try {
    const res = await fetch(url, { signal: ctl.signal, redirect: "follow", headers: { Accept: "text/calendar, text/plain;q=0.8" } });
    if (!publicUrl(res.url)) return json(req, { error: "The calendar link redirected somewhere Gradify can't read." }, 400);
    if (!res.ok) return json(req, { error: `The calendar server said ${res.status}. Check the link is the secret or public iCal address.` }, 502);
    const reader = res.body!.getReader(); const chunks: Uint8Array[] = []; let n = 0;
    for (;;) { const { done, value } = await reader.read(); if (done) break; n += value.length; if (n > MAX_BYTES) { reader.cancel(); return json(req, { error: "That calendar is too big to sync (over 2 MB)." }, 413); } chunks.push(value); }
    const ics = new TextDecoder().decode(chunks.length === 1 ? chunks[0] : new Uint8Array(chunks.flatMap((c) => [...c])));
    if (!/BEGIN:VCALENDAR/i.test(ics)) return json(req, { error: "That link didn't return a calendar. Use the address ending in .ics." }, 422);
    return json(req, { ics });
  } catch (e) {
    return json(req, { error: (e as Error).name === "AbortError" ? "The calendar server took too long to answer." : "The calendar couldn't be reached." }, 502);
  } finally { clearTimeout(timer); }
});
