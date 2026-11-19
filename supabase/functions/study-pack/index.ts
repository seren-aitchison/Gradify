// Supabase Edge Function: study-pack
// POST { mode: "pack", title, site, level, text, pdfBase64?, images?, documentId? }  → { pack, cards, stats, packId, reused? }
//      images: up to 5 photos of notes (handwritten or printed pages), [{ data: base64, type: "image/jpeg" | "image/png" |
//      "image/webp" }], read by Claude like a scanned PDF (Gradify Ultra's photo-to-cards, kit/tools/cardmaker.js)
// POST { mode: "card", fact, notes, avoid, kind? }                         → { card }   (regenerate one card)
// POST { mode: "questions", title, site, level, text, topics }              → { cards, reused? } (why and application
//      questions for a deck made before they existed)
// Every reply also carries { usage }; a refusal carries { error, reason, ... } (docs/APP-API.md).
// Saved packs are never paid for twice: a pack or question set for exactly the same notes is copied from the
// learner's own saved one, with no Claude call and no use of their allowance. Reopening a deck reads its saved
// pack from the database (kit/data/store.js getPack) and never reaches this function.
// Controls (allowances, rate limits, spending caps, cost tracking) are in _shared/ai.js and public.ai_claim_for /
// ai_settle_for; the service role is used for those ledger calls only. Packs are read and saved with the learner's
// own token, so row-level security applies. The Claude API key stays here as a server secret.
import Anthropic from "npm:@anthropic-ai/sdk@0.133.0";
import { createClient } from "npm:@supabase/supabase-js@2.117.0";
import { MODEL, PACK_SCHEMA, QUESTIONS_SCHEMA, SYSTEM_PROMPT, userPrompt, cardsFromPack, packStats, questionCards, REVIEW_SCHEMA, REVIEW_PROMPT, reviewRequest, focusOf } from "../_shared/pack.js";
import { runAi, ledger, estimateTokens, sha256, fail } from "../_shared/ai.js";

const MAX_OUTPUT = { pack: 32000, questions: 16000, card: 2000, review: 8000 };
// The independent card review (about a quarter more per pack: docs/FLASHCARD-ENGINE.md). On unless this secret is "off".
const REVIEW_ON = (Deno.env.get("GRADIFY_PACK_REVIEW") ?? "on") !== "off";
const ALLOWED = (Deno.env.get("GRADIFY_ALLOWED_ORIGINS") ?? "https://getgradify.com,http://localhost:8080").split(",");

// created on first use: without ANTHROPIC_API_KEY the SDK throws, and a request refused before any Claude call
// (AI off, allowance used) must still get its proper answer
let client: Anthropic | null = null;
const anthropic = () => (client ??= new Anthropic()); // reads ANTHROPIC_API_KEY

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
// The model comes from the claim (public.ai_feature_models): Sonnet for packs and quizzes, Opus for card rewrites.
const ask = (model: string, system: string, content: Anthropic.Beta.BetaContentBlockParam[], schema: Record<string, unknown>, effort: "low" | "medium" | "high", maxTokens: number) =>
  anthropic().beta.messages.stream({
    model,
    max_tokens: maxTokens,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort, format: { type: "json_schema", schema } },
    system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content }],
  }).finalMessage();
const textOf = (msg: Anthropic.Beta.BetaMessage) => msg.content.filter((b) => b.type === "text").map((b) => (b as { text: string }).text).join("");

const CARD_SCHEMA: Record<string, unknown> = {
  type: "object", additionalProperties: false, required: ["type", "front", "back"],
  properties: { type: { type: "string", enum: ["definition", "cloze", "why", "reverse", "apply"] }, front: { type: "string" }, back: { type: "string" } },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(req) });
  if (req.method !== "POST") return json(req, { error: "Use POST." }, 405);

  // Who is asking? Their own token, so row-level security applies to every pack read and write.
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } } });
  const { data: { user } } = await db.auth.getUser();
  if (!user) return json(req, { error: "Please sign in to use Gradify AI.", reason: "signed_out" }, 401);

  let body: any;
  try { body = await req.json(); } catch { return json(req, { error: "Bad request." }, 400); }
  const mode = body.mode === "card" ? "card" : body.mode === "questions" ? "questions" : "pack";
  const site = String(body.site ?? "").slice(0, 40) || null;
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const deps = ledger(admin, user.id);
  const send = (out: { status: number; body: unknown }) => json(req, out.body, out.status);

  try {
    if (mode === "card") {
      const prompt = `Write one new flashcard for this fact from a learner's notes. Make it different from these existing versions: ${JSON.stringify(body.avoid ?? []).slice(0, 2000)}.
Fact: ${String(body.fact ?? "").slice(0, 2000)}
Supporting notes: ${String(body.notes ?? "").slice(0, 4000)}
Use only what the fact and notes say. Front under 25 words, back under 40. Never put the answer in the question.${["why", "apply"].includes(body.kind) ? ` Keep it a "${body.kind}" question: ${body.kind === "why" ? "the learner must explain a cause, mechanism or difference" : "the learner must use the idea on a situation or problem"}. Backs for these can run to 60 words.` : ""}`;
      return send(await runAi(deps, {
        mode, site, estInput: estimateTokens(SYSTEM_PROMPT, prompt), maxOutput: MAX_OUTPUT.card,
        model: MODEL, call: (model: string) => ask(model, SYSTEM_PROMPT, [{ type: "text", text: prompt }], CARD_SCHEMA, "medium", MAX_OUTPUT.card),
        parse: (msg: Anthropic.Beta.BetaMessage) => ({ card: JSON.parse(textOf(msg)) }),
      }));
    }

    const text = String(body.text ?? "");
    const hasPdf = typeof body.pdfBase64 === "string" && body.pdfBase64.length > 0;
    // photos of notes: at most 5, each a JPEG, PNG or WebP of at most about 5 MB (Claude's limit per image)
    const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
    const images = (Array.isArray(body.images) ? body.images : []).filter((im: { data?: unknown; type?: unknown }) => typeof im?.data === "string" && im.data.length > 0 && IMAGE_TYPES.includes(String(im.type)));
    if (Array.isArray(body.images) && images.length !== body.images.length) return json(req, { error: "Photos must be JPEG, PNG or WebP images." }, 400);
    if (images.length > 5) return json(req, { error: "Send at most 5 photos at a time." }, 400);
    if (images.some((im: { data: string }) => im.data.length > 6_900_000)) return json(req, { error: "One of those photos is too large. Try a smaller photo." }, 413);
    const hasImages = images.length > 0;
    if (!text.trim() && !hasPdf && !hasImages) return json(req, { error: "No notes were sent." }, 400);
    if (hasPdf && body.pdfBase64.length > 30_000_000) return json(req, { error: "That PDF is too large." }, 413);
    if (mode === "questions" && !text.trim()) return json(req, { error: "These notes have no text to write questions from." }, 400);
    const topics = (Array.isArray(body.topics) ? body.topics : []).map(String).slice(0, 20);
    // the learner's focus changes what's written, so it's part of what makes a request the same as an earlier one
    const notesHash = await sha256(JSON.stringify([mode, text, hasPdf ? await sha256(body.pdfBase64) : null, ...(hasImages ? [await Promise.all(images.map((im: { data: string }) => sha256(im.data)))] : []), mode === "questions" ? topics : null, ...(mode === "pack" && focusOf(body.focus).length ? [focusOf(body.focus)] : [])]));
    const engine = mode === "pack" ? "claude" : "claude-questions";

    // the same notes again: copy the learner's saved result (a copy, so linking it to a new deck never takes it from
    // the old one). No Claude call, no allowance, no cost.
    const { data: prior } = await db.from("packs").select("pack, stats, model").eq("notes_sha256", notesHash).eq("engine", engine).order("created_at", { ascending: false }).limit(1);
    if (prior?.length) {
      const p = prior[0];
      const { data: copy, error } = await db.from("packs").insert({ user_id: user.id, document_id: mode === "pack" ? body.documentId ?? null : null, engine, model: p.model, pack: p.pack, stats: p.stats, notes_sha256: notesHash, input_tokens: 0, output_tokens: 0 }).select("id").single();
      if (error) throw error;
      if (mode === "questions") { const seen = new Set<string>(); return json(req, { cards: (p.pack.topics ?? []).flatMap((t: { name: string; questions: unknown[] }) => questionCards(t, text, seen)), reused: true }); }
      const cards = cardsFromPack(p.pack, text);
      return json(req, { packId: copy.id, pack: p.pack, cards, stats: p.stats ?? packStats(p.pack, cards), model: p.model, reused: true });
    }

    const prompt = userPrompt({ title: String(body.title ?? "My notes").slice(0, 200), site: String(body.site ?? "Gradify"), level: String(body.level ?? "undergraduate"), text, today: new Date().toISOString().slice(0, 10), focus: focusOf(body.focus), attached: !text.trim() && (hasImages || hasPdf) });
    // notes longer than the learner's plan allows are refused before any Claude call (the use is given back)
    const check = async (claim: { plan: string }) => {
      const { data } = await db.from("ai_plan_caps").select("pack_chars").eq("plan", claim.plan).maybeSingle();
      const limit = data?.pack_chars ?? 40_000;
      if (text.length > limit) fail(413, `These notes are too long for one ${mode === "questions" ? "question set" : "study pack"} (${Math.round(text.length / 1000)}k characters; the ${claim.plan === "pro" ? "Ultra" : "Free"} limit is ${Math.round(limit / 1000)}k). Try one lecture at a time.`, "too_long");
    };

    if (mode === "questions") {
      const ask_ = `${prompt}

The learner already has recall flashcards for these notes. Write only the deeper questions ("why" and "apply"), following the rules for deeper questions. Use exactly these topic names: ${JSON.stringify(topics)}.`;
      return send(await runAi(deps, {
        mode, site, estInput: estimateTokens(SYSTEM_PROMPT, ask_), maxOutput: MAX_OUTPUT.questions, check,
        model: MODEL, call: (model: string) => ask(model, SYSTEM_PROMPT, [{ type: "text", text: ask_ }], QUESTIONS_SCHEMA, "high", MAX_OUTPUT.questions),
        parse: async (msg: Anthropic.Beta.BetaMessage) => {
          const data = JSON.parse(textOf(msg));
          const seen = new Set<string>();
          const cards = (data.topics ?? []).flatMap((t: { name: string; questions: unknown[] }) => questionCards(t, text, seen));
          // saved without a document, so it never replaces the deck's pack, and so the same request isn't paid for twice
          await db.from("packs").insert({ user_id: user.id, document_id: null, engine, model: msg.model, pack: data, notes_sha256: notesHash, stats: { why: cards.filter((c: { kind: string }) => c.kind === "why").length, apply: cards.filter((c: { kind: string }) => c.kind === "apply").length }, input_tokens: msg.usage.input_tokens, output_tokens: msg.usage.output_tokens });
          return { cards };
        },
      }));
    }

    const content: Anthropic.Beta.BetaContentBlockParam[] = [];
    // Scanned or handwritten PDFs have no text layer: send the pages for Claude to read.
    const sendPdf = hasPdf && text.trim().length < 200;
    if (sendPdf) content.push({ type: "document", source: { type: "base64", media_type: "application/pdf", data: body.pdfBase64 } });
    // photos of notes come before the instructions, in the order taken, like the pages of a scanned PDF
    for (const im of images) content.push({ type: "image", source: { type: "base64", media_type: im.type as "image/jpeg" | "image/png" | "image/webp", data: im.data } });
    content.push({ type: "text", text: prompt });
    // Two calls under one claim: Claude writes the pack, then a separate request reviews every card against the notes
    // (kit/notes/pack.js: REVIEW_PROMPT). Their token counts are added together, so the ledger and allowance see one
    // request at its real cost. If the review fails, the pack is still returned, with every card checked in code.
    const generateAndReview = async (model: string) => {
      const gen = await ask(model, SYSTEM_PROMPT, content, PACK_SCHEMA, "high", MAX_OUTPUT.pack);
      if (gen.stop_reason !== "end_turn") return gen;
      const pack = JSON.parse(textOf(gen));
      try {
        // reviewed against the notes' text; a scanned PDF has none, so its cards are checked in code only
        if (REVIEW_ON && text.trim().length >= 200) {
          const rev = await ask(model, REVIEW_PROMPT, [{ type: "text", text: reviewRequest(cardsFromPack(pack, text), text) }], REVIEW_SCHEMA, "medium", MAX_OUTPUT.review);
          if (rev.stop_reason === "end_turn") pack.review = { verdicts: JSON.parse(textOf(rev)).verdicts, model: rev.model };
          gen.usage = { ...gen.usage, input_tokens: gen.usage.input_tokens + rev.usage.input_tokens, output_tokens: gen.usage.output_tokens + rev.usage.output_tokens,
            cache_read_input_tokens: (gen.usage.cache_read_input_tokens ?? 0) + (rev.usage.cache_read_input_tokens ?? 0),
            cache_creation_input_tokens: (gen.usage.cache_creation_input_tokens ?? 0) + (rev.usage.cache_creation_input_tokens ?? 0) };
        }
      } catch (e) { console.error("study-pack review", (e as Error)?.message); }
      return { ...gen, content: [{ type: "text", text: JSON.stringify(pack), citations: null }] } as Anthropic.Beta.BetaMessage;
    };
    return send(await runAi(deps, {
      mode, site, check, maxOutput: MAX_OUTPUT.pack + (REVIEW_ON ? MAX_OUTPUT.review : 0),
      // a scanned page costs roughly 1,500 to 3,000 tokens; reserve generously. The review reads the notes again.
      estInput: estimateTokens(SYSTEM_PROMPT, prompt) * (REVIEW_ON ? 2 : 1) + (REVIEW_ON ? estimateTokens(REVIEW_PROMPT) : 0) + (sendPdf ? Math.ceil(body.pdfBase64.length / 40) : 0) + images.length * 1800,
      model: MODEL, call: generateAndReview,
      parse: async (msg: Anthropic.Beta.BetaMessage) => {
        const pack = JSON.parse(textOf(msg));
        const cards = cardsFromPack(pack, text);
        const stats = packStats(pack, cards);
        // Saved with the learner's token, so RLS enforces ownership.
        const { data: saved, error } = await db.from("packs").insert({
          user_id: user.id, document_id: body.documentId ?? null, engine, model: msg.model, pack, stats, notes_sha256: notesHash,
          input_tokens: msg.usage.input_tokens, output_tokens: msg.usage.output_tokens,
        }).select("id").single();
        if (error) throw error;
        return { packId: saved.id, pack, cards, stats, model: msg.model };
      },
    }));
  } catch (e) {
    console.error("study-pack", e);
    return json(req, { error: "Something went wrong. Please try again." }, 500);
  }
});
