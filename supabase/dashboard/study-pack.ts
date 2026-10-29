// Gradify study-pack function: SINGLE-FILE VERSION for pasting into the Supabase dashboard.
// Generated from supabase/functions/study-pack/index.ts + supabase/functions/_shared/pack.js.
// Don't edit this file by hand; edit those two and run: npm run build:dashboard
import Anthropic from "npm:@anthropic-ai/sdk@0.133.0";
import { createClient } from "npm:@supabase/supabase-js@2.117.0";

// ---------- Shared pack logic ----------
// Shared, dependency-free logic (plain JavaScript, so the browser can import it too) for the study-pack pipeline: the knowledge-pack schema sent
// to Claude, the prompt, grounding checks against the learner's own notes, and conversion
// to flashcards. Used by the Supabase function (Deno) and the eval script (Node).

const MODEL = "claude-opus-5-5";

// JSON schema for structured outputs. Every object closes with additionalProperties: false
// and lists every key in `required`; optional values are nullable instead.
const str = { type: "string" };
const nstr = { type: ["string", "null"] };
const PACK_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["title", "summary", "topics", "equations", "dates", "unclear"],
  properties: {
    title: str,
    summary: str,
    topics: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "theme", "mnemonic", "facts"],
        properties: {
          name: str,
          theme: str,
          mnemonic: nstr,
          facts: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["term", "abbreviation", "statement", "kind", "importance", "quote", "page", "card"],
              properties: {
                term: nstr,
                abbreviation: nstr,
                statement: str,
                kind: { type: "string", enum: ["definition", "cause", "process", "equation", "example", "list", "other"] },
                importance: { type: "string", enum: ["core", "supporting", "bonus"] },
                quote: nstr,
                page: { type: ["integer", "null"] },
                card: {
                  type: "object",
                  additionalProperties: false,
                  required: ["type", "front", "back"],
                  properties: { type: { type: "string", enum: ["definition", "cloze", "why", "reverse"] }, front: str, back: str },
                },
              },
            },
          },
        },
      },
    },
    equations: {
      type: "array",
      items: { type: "object", additionalProperties: false, required: ["symbolic", "spoken"], properties: { symbolic: str, spoken: str } },
    },
    dates: {
      type: "array",
      items: { type: "object", additionalProperties: false, required: ["what", "date", "kind"], properties: { what: str, date: nstr, kind: { type: "string", enum: ["exam", "deadline", "class", "other"] } } },
    },
    unclear: { type: "array", items: str },
  },
};

const SYSTEM_PROMPT = `You turn a learner's own study notes into a knowledge pack for Gradify, a learning app. The pack becomes clean notes, flashcards, a spidermap and other study materials, so accuracy matters more than anything else.

How to read the notes:
- Notes are often messy: shorthand, arrows, typos, half sentences, bullet fragments. Work out what the learner meant.
- Use only what the notes contain. Rewrite each fact clearly, but do not add facts, numbers or examples that are not in the notes. If something important is clearly missing or a fact looks wrong, do not fix it silently: add a short note to "unclear" saying what looks wrong and what the usual answer is.
- If you add anything beyond the notes (a helpful example, a memory hook), mark that fact "bonus" and set its quote to null.
- Group facts into a handful of topics (usually 2 to 6) that a teacher would recognise. "theme" is one or two words for the topic's bubble on a mind map. Give a mnemonic only when it genuinely helps; otherwise null.

For every fact:
- "quote" is a short phrase copied exactly, character for character, from the notes that supports the fact (6 to 15 words is ideal). Do not tidy the spelling inside the quote. Use null only for bonus facts.
- "page" is the page number the quote comes from when the notes are split into pages ("--- page N ---" markers), otherwise null.
- "card" is one flashcard that tests the fact. Prefer questions that make the learner recall or explain, not recognise. Keep fronts under 25 words and backs under 40 words. Use "cloze" for lists and key phrases (put _____ in the front), "why" for causes and processes, "definition" for terms, "reverse" when the learner should recall a term from its definition. Never put the answer in the question.

Dates: list exams, deadlines and classes mentioned in the notes. Give "date" as YYYY-MM-DD when the notes say a specific date and the reference date makes the year clear, otherwise null and keep the wording in "what".

Write in clear British English at the learner's level.`;

/** @param {{ title: string, site: string, level: string, text: string, today: string }} o */
function userPrompt(o) {
  return `Learner: studying on ${o.site}, level: ${o.level}. Reference date: ${o.today}.
Document title: ${o.title}

<notes>
${o.text}
</notes>

Build the knowledge pack for these notes.`;
}

// ---------- Grounding: does each quote really appear in the notes? ----------
const norm = (/** @type {string} */ s) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

// Exact match after normalising; otherwise the share of the quote's words that appear in
// order within a window of the notes. 0.85 or above counts as grounded.
/** @param {string | null} quote @param {string} notes @returns {number} */
function groundingScore(quote, notes) {
  if (!quote) return 0;
  const q = norm(quote), n = norm(notes);
  if (!q) return 0;
  if (n.includes(q)) return 1;
  const qw = q.split(" "), nw = n.split(" ");
  let best = 0;
  for (let i = 0; i < nw.length; i++) {
    if (nw[i] !== qw[0] && nw[i] !== qw[1]) continue;
    let j = 0, k = i, hit = 0;
    while (j < qw.length && k < nw.length && k < i + qw.length * 2) {
      if (nw[k] === qw[j]) { hit++; j++; k++; } else if (nw[k + 1] === qw[j]) k++; else j++;
    }
    best = Math.max(best, hit / qw.length);
  }
  return best;
}

/** @typedef {{ topic: string, front: string, back: string, kind: string, importance: string,
 *   sourceQuote: string | null, sourcePage: number | null, grounded: "yes" | "partly" | "no" | "bonus" }} Card */

// Turn a pack into flashcards, flagging any whose quote can't be found in the notes.
/** @returns {Card[]} */
function cardsFromPack(pack, notes) {
  /** @type {Card[]} */
  const out = [];
  const seen = new Set();
  for (const t of pack.topics || []) {
    for (const f of t.facts || []) {
      const c = f.card;
      if (!c || !c.front?.trim() || !c.back?.trim()) continue;
      const key = norm(c.front);
      if (seen.has(key)) continue;
      seen.add(key);
      const g = f.importance === "bonus" ? -1 : groundingScore(f.quote, notes);
      out.push({
        topic: t.name, front: c.front.trim(), back: c.back.trim(), kind: c.type, importance: f.importance,
        sourceQuote: f.quote, sourcePage: f.page ?? null,
        grounded: g < 0 ? "bonus" : g >= 0.85 ? "yes" : g >= 0.5 ? "partly" : "no",
      });
    }
  }
  return out;
}

// Quality numbers for a pack, used by the eval script and stored with each pack.
/** @param {Card[]} cards */
function packStats(pack, cards) {
  const facts = (pack.topics || []).flatMap((t) => t.facts || []);
  const nonBonus = cards.filter((c) => c.grounded !== "bonus");
  // the whole answer appears, as whole words, inside the question
  const leaks = cards.filter((c) => { const b = norm(c.back); return c.kind !== "cloze" && b.length >= 2 && ` ${norm(c.front)} `.includes(` ${b} `); }).length;
  return {
    topics: (pack.topics || []).length,
    facts: facts.length,
    cards: cards.length,
    grounded: nonBonus.length ? nonBonus.filter((c) => c.grounded === "yes").length / nonBonus.length : 1,
    ungrounded: nonBonus.filter((c) => c.grounded === "no").length,
    bonus: cards.length - nonBonus.length,
    answerLeaks: leaks,
    longFronts: cards.filter((c) => c.front.split(/\s+/).length > 30).length,
    unclear: (pack.unclear || []).length,
  };
}

// ---------- Function ----------
// Supabase Edge Function: study-pack
// POST { mode: "pack", title, site, level, text, pdfBase64? }  → { pack, cards, stats, packId }
// POST { mode: "card", fact, notes, avoid }                   → { card }   (regenerate one card)
// The learner must be signed in. The Claude API key stays here as a server secret.

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
