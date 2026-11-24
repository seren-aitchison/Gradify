// Supabase Edge Function: youtube-notes
// POST { url } → { id, title, channel, lang, auto, segments: [{ t, text }] }   (t: seconds from the start)
// Reads a YouTube video's captions (the ones its uploader added, or YouTube's automatic ones) so the YouTube to notes
// tool (kit/tools/youtube.js) can turn them into notes, flashcards and a chat about the video. Browsers can't fetch
// captions themselves (YouTube doesn't allow other sites to), so this does it for them. It only ever fetches
// youtube.com pages for an 11-character video id and sends nothing of the learner's anywhere.
// Deployed with verify_jwt off, so it works signed out. Rate limited across every instance by public.youtube_take
// (supabase/migrations/20261124180000_youtube_rate_limit.sql): 10 videos a minute and 200 a day from one caller, 5000 a
// day in all. The only thing kept is a keyed hash of the caller's IP address (HMAC-SHA-256 with the service role key,
// which never leaves the server), for one day. Uses SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (set by Supabase).
import { createClient } from "npm:@supabase/supabase-js@2.117.0";

const ALLOWED = (Deno.env.get("GRADIFY_ALLOWED_ORIGINS") ?? "https://getgradify.com,http://localhost:8080").split(",");
const cors = (req: Request) => {
  const origin = req.headers.get("origin") ?? "";
  return { "Access-Control-Allow-Origin": ALLOWED.includes(origin) ? origin : ALLOWED[0], "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS", "Vary": "Origin" };
};
const json = (req: Request, body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors(req), "Content-Type": "application/json" } });

export function videoId(url: string): string | null {
  const s = String(url ?? "").trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  try {
    const u = new URL(s.startsWith("http") ? s : `https://${s}`);
    const host = u.hostname.replace(/^www\.|^m\.|^music\./, "");
    if (host === "youtu.be") return /^[\w-]{11}$/.test(u.pathname.slice(1, 12)) ? u.pathname.slice(1, 12) : null;
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const v = u.searchParams.get("v"); if (v && /^[\w-]{11}$/.test(v)) return v;
      const m = u.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]{11})/); if (m) return m[1];
    }
  } catch { /* not a URL */ }
  return null;
}
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
type Track = { baseUrl: string; languageCode: string; kind?: string; name?: { simpleText?: string; runs?: { text: string }[] } };
const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));

// the video's caption tracks, from its public watch page. If YouTube refuses (it sometimes asks servers to prove
// they're not a bot), Gradify doesn't try to get round that: the learner is asked to paste the transcript instead.
async function tracksOf(id: string): Promise<{ title: string; channel: string; tracks: Track[] }> {
  const page = await fetch(`https://www.youtube.com/watch?v=${id}&hl=en&gl=GB`, { headers: { "User-Agent": UA, "Accept-Language": "en-GB,en;q=0.9", Cookie: "CONSENT=YES+1" } }).then((r) => r.text());
  const m = page.match(/ytInitialPlayerResponse\s*=\s*(\{.+?\})\s*;\s*(?:var\s|<\/script)/s);
  if (!m) throw new Error("page");
  const p = JSON.parse(m[1]);
  if (p?.playabilityStatus?.status && p.playabilityStatus.status !== "OK") throw Object.assign(new Error("unplayable"), { why: p.playabilityStatus.reason });
  return { title: p?.videoDetails?.title ?? "", channel: p?.videoDetails?.author ?? "", tracks: p?.captions?.playerCaptionsTracklistRenderer?.captionTracks ?? [] };
}
// English uploaded captions first, then English automatic ones, then anything (translated to English where YouTube can)
function pick(tracks: Track[]): { url: string; lang: string; auto: boolean } | null {
  const en = (t: Track) => /^en/i.test(t.languageCode);
  const t = tracks.find((x) => en(x) && x.kind !== "asr") || tracks.find((x) => en(x)) || tracks.find((x) => x.kind !== "asr") || tracks[0];
  if (!t) return null;
  const url = en(t) ? t.baseUrl : `${t.baseUrl}&tlang=en`;
  return { url, lang: en(t) ? t.languageCode : `${t.languageCode} → en`, auto: t.kind === "asr" };
}
async function segmentsOf(url: string) {
  const r = await fetch(url.replace(/&fmt=[^&]*/, ""), { headers: { "User-Agent": UA } });
  const xml = await r.text();
  const out: { t: number; text: string }[] = [];
  // srv1: <text start="1.2" dur="3">…</text>; srv3: <p t="1200" d="3000">…<s>…</s></p>
  for (const m of xml.matchAll(/<text start="([\d.]+)"[^>]*>([\s\S]*?)<\/text>/g)) out.push({ t: +m[1], text: decode(decode(m[2]).replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim() });
  if (!out.length) for (const m of xml.matchAll(/<p t="(\d+)"[^>]*>([\s\S]*?)<\/p>/g)) out.push({ t: +m[1] / 1000, text: decode(m[2].replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim() });
  return out.filter((s) => s.text);
}

// The caller's key for the rate limit: an HMAC of their IP address, so the address itself is never stored, and the key
// can't be reversed by hashing every IPv4 address without the server's key.
export async function callerKey(ip: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`youtube-notes:${ip}`));
  return [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
export const LIMITED: Record<string, string> = {
  rate: "Too many videos in a minute. Wait a moment and try again.",
  daily: "That's the most videos Gradify can read for you today. Try again tomorrow, or paste the transcript.",
  busy: "Gradify has read as many videos as it can today. Try again tomorrow, or paste the transcript.",
};

// A first, per-instance limit (no database round trip for an obvious burst); the shared one is youtube_take.
const hits = new Map<string, number[]>();
const SECRET = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const admin = SECRET ? createClient(Deno.env.get("SUPABASE_URL")!, SECRET) : null;
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(req) });
  if (req.method !== "POST") return json(req, { error: "Use POST." }, 405);
  const who = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "?";
  const now = Date.now(), recent = (hits.get(who) ?? []).filter((t) => now - t < 60_000);
  if (recent.length >= 10) return json(req, { error: LIMITED.rate }, 429);
  hits.set(who, [...recent, now]);
  if (hits.size > 5000) hits.clear(); // a long-lived instance doesn't grow without bound
  // The shared limit. If the database can't be reached the request is refused rather than let through unmetered.
  if (!admin) return json(req, { error: "Reading YouTube isn't set up on this server. Paste the transcript instead." }, 503);
  const { data: turn, error } = await admin.rpc("youtube_take", { p_caller: await callerKey(who, SECRET) });
  if (error) return json(req, { error: "Couldn't read this video just now. Try again in a minute, or paste the transcript." }, 503);
  if (turn !== "ok") return json(req, { error: LIMITED[turn as string] ?? LIMITED.rate, limited: turn }, 429);
  let body: { url?: string } = {};
  try { body = await req.json(); } catch { return json(req, { error: "Send { url }." }, 400); }
  const id = videoId(body.url ?? "");
  if (!id) return json(req, { error: "That doesn't look like a YouTube link. Paste the link from the Share button." }, 400);
  try {
    const { title, channel, tracks } = await tracksOf(id);
    const t = pick(tracks);
    if (!t) return json(req, { error: "This video has no captions, so Gradify can't read it. Try another video, or paste the transcript.", id, title }, 422);
    const segments = await segmentsOf(t.url);
    if (!segments.length) return json(req, { error: "YouTube didn't send this video's captions. Paste the transcript instead (on YouTube: … More → Show transcript).", id, title }, 502);
    return json(req, { id, title, channel, lang: t.lang, auto: t.auto, segments });
  } catch (e) {
    const why = String((e as { why?: string }).why ?? "");
    const blocked = /bot|sign in/i.test(why);
    return json(req, { error: blocked ? "YouTube isn't letting Gradify read this video right now. Paste its transcript instead: on YouTube, open the description and press Show transcript." : why ? `YouTube says: ${why}` : "Couldn't read this video's captions just now. Paste the transcript instead: on YouTube, open the description and press Show transcript.", id, blocked }, 502);
  }
});
