// Supabase Edge Function: study-pack
// POST { mode: "pack", title, site, level, text, pdfBase64? }  → { pack, cards, stats, packId }
// POST { mode: "card", fact, notes, avoid }                   → { card }   (regenerate one card)
// The learner must be signed in. The Claude API key stays here as a server secret.
import Anthropic from "npm:@anthropic-ai/sdk@0.133.0";
import { createClient } from "npm:@supabase/supabase-js@2.117.0";
import { MODEL, PACK_SCHEMA, SYSTEM_PROMPT, userPrompt, cardsFromPack, packStats } from "../_shared/pack.js";

const DAILY_PACKS = Number(Deno.env.get("GRADIFY_DAILY_PACKS") ?? 10);    // per learner per day
const MAX_CHARS = Number(Deno.env.get("GRADIFY_MAX_CHARS") ?? 120_000);    // about 30k tokens of notes
const ALLOWED = (Deno.env.get("GRADIFY_ALLOWED_ORIGINS") ?? "https://getgradify.com,http://localhost:8080").split(",");

const anthropic = new Anthropic(); // reads ANTHROPIC_API_KEY

function cors(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  return {
    "Access-Control-Allow-Origin": ALLOWED.includes(origin) ? origin : ALLOWED[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}
const json = (req: Request, body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors(req), "Content-Type": "application/json" } });

// One Claude call with structured output. Streams so long packs don't hit HTTP timeouts,
// and opts into server-side fallback so a rare false-positive safety decline is retried.
async function ask(system: string, content: Anthropic.Beta.BetaContentBlockParam[], schema: Record<string, unknown>, effort: "low" | "medium" | "high") {
  const stream = anthropic.beta.messages.stream({
    model: MODEL,
    max_tokens: 32000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort, format: { type: "json_schema", schema } },
    system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content }],
  });
  const msg = await stream.finalMessage();
  if (msg.stop_reason === "refusal") throw Object.assign(new Error("Gradify AI couldn't process these notes."), { status: 422 });
  if (msg.stop_reason === "max_tokens") throw Object.assign(new Error("These notes are too long to process in one go. Try splitting them."), { status: 413 });
  const text = msg.content.filter((b) => b.type === "text").map((b) => (b as { text: string }).text).join("");
  return { data: JSON.parse(text), usage: msg.usage, model: msg.model };
}

const CARD_SCHEMA: Record<string, unknown> = {
  type: "object", additionalProperties: false, required: ["type", "front", "back"],
  properties: { type: { type: "string", enum: ["definition", "cloze", "why", "reverse"] }, front: { type: "string" }, back: { type: "string" } },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(req) });
  if (req.method !== "POST") return json(req, { error: "Use POST." }, 405);

  // Who is asking? Use their own token so row-level security applies to every query.
  const auth = req.headers.get("Authorization") ?? "";
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: auth } } });
  const { data: { user } } = await db.auth.getUser();
  if (!user) return json(req, { error: "Please sign in to use Gradify AI." }, 401);

  let body: any;
  try { body = await req.json(); } catch { return json(req, { error: "Bad request." }, 400); }

  try {
    if (body.mode === "card") {
      const prompt = `Write one new flashcard for this fact from a learner's notes. Make it different from these existing versions: ${JSON.stringify(body.avoid ?? [])}.
Fact: ${String(body.fact ?? "").slice(0, 2000)}
Supporting notes: ${String(body.notes ?? "").slice(0, 4000)}
Use only what the fact and notes say. Front under 25 words, back under 40. Never put the answer in the question.`;
      const { data } = await ask(SYSTEM_PROMPT, [{ type: "text", text: prompt }], CARD_SCHEMA, "medium");
      return json(req, { card: data });
    }

    // mode "pack": daily limit per learner, counted from their saved packs
    const since = new Date(Date.now() - 864e5).toISOString();
    const { count } = await db.from("packs").select("id", { count: "exact", head: true }).eq("engine", "claude").gte("created_at", since);
    if ((count ?? 0) >= DAILY_PACKS) return json(req, { error: `You've made ${DAILY_PACKS} study packs today, the daily limit. Try again tomorrow.` }, 429);

    const text = String(body.text ?? "");
    const hasPdf = typeof body.pdfBase64 === "string" && body.pdfBase64.length > 0;
    if (!text.trim() && !hasPdf) return json(req, { error: "No notes were sent." }, 400);
    if (text.length > MAX_CHARS) return json(req, { error: "These notes are too long. Try uploading one lecture at a time." }, 413);

    const content: Anthropic.Beta.BetaContentBlockParam[] = [];
    // Scanned or handwritten PDFs have no text layer: send the pages for Claude to read.
    if (hasPdf && text.trim().length < 200) {
      if (body.pdfBase64.length > 30_000_000) return json(req, { error: "That PDF is too large." }, 413);
      content.push({ type: "document", source: { type: "base64", media_type: "application/pdf", data: body.pdfBase64 } });
    }
    content.push({ type: "text", text: userPrompt({ title: String(body.title ?? "My notes").slice(0, 200), site: String(body.site ?? "Gradify"), level: String(body.level ?? "undergraduate"), text, today: new Date().toISOString().slice(0, 10) }) });

    const { data: pack, usage, model } = await ask(SYSTEM_PROMPT, content, PACK_SCHEMA, "high");
    const cards = cardsFromPack(pack, text);
    const stats = packStats(pack, cards);

    // Saved with the learner's token, so RLS enforces ownership.
    const { data: saved, error } = await db.from("packs").insert({
      user_id: user.id, document_id: body.documentId ?? null, engine: "claude", model, pack, stats,
      input_tokens: usage.input_tokens, output_tokens: usage.output_tokens,
    }).select("id").single();
    if (error) throw error;
    return json(req, { packId: saved.id, pack, cards, stats });
  } catch (e) {
    console.error(e);
    const status = (e as { status?: number }).status;
    if (e instanceof Anthropic.RateLimitError) return json(req, { error: "Gradify AI is busy. Try again in a minute." }, 503);
    if (e instanceof Anthropic.APIError) return json(req, { error: "Gradify AI is unavailable right now." }, 502);
    return json(req, { error: (e as Error).message || "Something went wrong." }, status && status < 600 ? status : 500);
  }
});
