// Supabase Edge Function: calendar-sync (retired, November 2026)
// It used to fetch a calendar feed link on a learner's behalf. Gradify no longer takes calendar links, because a feed
// link works like a password to the calendar: learners import an .ics file instead, read on their own device
// (kit/intel/calsync.js). This stub fetches nothing and keeps nothing; it answers 410 Gone so an old copy of the app
// gets a clear message. Deploy it over the old version (supabase functions deploy calendar-sync), or delete the
// function (supabase functions delete calendar-sync).
const ALLOWED = (Deno.env.get("GRADIFY_ALLOWED_ORIGINS") ?? "https://getgradify.com,http://localhost:8080").split(",");

function cors(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  return { "Access-Control-Allow-Origin": ALLOWED.includes(origin) ? origin : ALLOWED[0], "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS", "Vary": "Origin" };
}

Deno.serve((req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(req) });
  // the request body (which may hold a calendar link) is never read or logged
  return new Response(JSON.stringify({ error: "Calendar links are no longer supported. Import an .ics file instead.", reason: "retired" }), { status: 410, headers: { ...cors(req), "Content-Type": "application/json" } });
});
