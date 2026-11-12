// Gradify study-pack function: SINGLE-FILE VERSION for pasting into the Supabase dashboard.
// Generated from supabase/functions/study-pack/index.ts + kit/notes/pack.js.
// Don't edit this file by hand; edit those two and run: npm run sync
import Anthropic from "npm:@anthropic-ai/sdk@0.133.0";
import { createClient } from "npm:@supabase/supabase-js@2.117.0";
import { runAi, ledger, estimateTokens, sha256, fail } from "../_shared/ai.js";

// ---------- Shared pack logic ----------
// Shared, dependency-free logic (plain JavaScript, so the browser can import it too) for the study-pack pipeline: the knowledge-pack schema sent
// to Claude, the prompt, grounding checks against the learner's own notes, and conversion
// to flashcards. Used by the browser, the Supabase function (Deno) and the eval script (Node).
// This is the source: supabase/functions/_shared/pack.js is a copy made by `npm run sync`.

const MODEL = "claude-opus-5-5";

// JSON schema for structured outputs. Every object closes with additionalProperties: false
// and lists every key in `required`; optional values are nullable instead.
const str = { type: "string" };
const nstr = { type: ["string", "null"] };
// Deeper questions for a topic: "why" (explain a cause or mechanism) and "apply" (use the idea
// on a situation the notes don't spell out). They feed the Mastery Engine's explanation and
// application evidence.
const QUESTIONS = {
  type: "array",
  items: {
    type: "object",
    additionalProperties: false,
    required: ["type", "question", "answer", "quote", "page"],
    properties: {
      type: { type: "string", enum: ["why", "apply"] },
      question: str,
      answer: str,
      quote: nstr,
      page: { type: ["integer", "null"] },
    },
  },
};
// Just the deeper questions, for adding them to a deck made before they existed
const QUESTIONS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["topics"],
  properties: {
    topics: { type: "array", items: { type: "object", additionalProperties: false, required: ["name", "questions"], properties: { name: str, questions: QUESTIONS } } },
  },
};

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
        required: ["name", "theme", "mnemonic", "facts", "questions"],
        properties: {
          name: str,
          theme: str,
          mnemonic: nstr,
          questions: QUESTIONS,
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

Deeper questions: for every topic, write up to three "questions" that go beyond recall.
- "why": ask the learner to explain a cause, mechanism, difference or consequence that the notes support ("Explain why...", "Explain the difference between..."). The answer is the explanation a good student would give, in 2 to 4 sentences.
- "apply": a short, realistic situation or problem that needs the idea to solve: a change to one variable, a case, a prediction, a worked number. The situation can be new, but the reasoning and every fact in the answer must come from the notes. The answer gives the result and the reasoning in 2 to 4 sentences.
- Aim for at least one of each per topic. If the notes don't support an application question for a topic, leave it out rather than inventing facts.
- "quote" is the exact phrase from the notes the answer relies on, as for facts; "page" as for facts.

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
    out.push(...questionCards(t, notes, seen));
  }
  return out;
}

// A topic's deeper questions as cards (kind "why" or "apply"), checked against the notes like facts
/** @returns {Card[]} */
function questionCards(topic, notes, seen = new Set()) {
  /** @type {Card[]} */
  const out = [];
  for (const q of topic.questions || []) {
    if (!q.question?.trim() || !q.answer?.trim()) continue;
    const key = norm(q.question);
    if (seen.has(key)) continue;
    seen.add(key);
    const g = groundingScore(q.quote, notes);
    out.push({
      topic: topic.name, front: q.question.trim(), back: q.answer.trim(), kind: q.type, importance: "core",
      sourceQuote: q.quote, sourcePage: q.page ?? null, grounded: g >= 0.85 ? "yes" : g >= 0.5 ? "partly" : "no",
    });
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
    why: cards.filter((c) => c.kind === "why").length,
    apply: cards.filter((c) => c.kind === "apply").length,
  };
}

// ---------- Function ----------
// Supabase Edge Function: study-pack
// POST { mode: "pack", title, site, level, text, pdfBase64?, documentId? }  → { pack, cards, stats, packId, reused? }
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

const MAX_OUTPUT = { pack: 32000, questions: 16000, card: 2000 };
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
    if (!text.trim() && !hasPdf) return json(req, { error: "No notes were sent." }, 400);
    if (hasPdf && body.pdfBase64.length > 30_000_000) return json(req, { error: "That PDF is too large." }, 413);
    if (mode === "questions" && !text.trim()) return json(req, { error: "These notes have no text to write questions from." }, 400);
    const topics = (Array.isArray(body.topics) ? body.topics : []).map(String).slice(0, 20);
    const notesHash = await sha256(JSON.stringify([mode, text, hasPdf ? await sha256(body.pdfBase64) : null, mode === "questions" ? topics : null]));
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

    const prompt = userPrompt({ title: String(body.title ?? "My notes").slice(0, 200), site: String(body.site ?? "Gradify"), level: String(body.level ?? "undergraduate"), text, today: new Date().toISOString().slice(0, 10) });
    // notes longer than the learner's plan allows are refused before any Claude call (the use is given back)
    const check = async (claim: { plan: string }) => {
      const { data } = await db.from("ai_plan_caps").select("pack_chars").eq("plan", claim.plan).maybeSingle();
      const limit = data?.pack_chars ?? 40_000;
      if (text.length > limit) fail(413, `These notes are too long for one ${mode === "questions" ? "question set" : "study pack"} (${Math.round(text.length / 1000)}k characters; the ${claim.plan === "pro" ? "Pro" : "Free"} limit is ${Math.round(limit / 1000)}k). Try one lecture at a time.`, "too_long");
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
    content.push({ type: "text", text: prompt });
    return send(await runAi(deps, {
      mode, site, check, maxOutput: MAX_OUTPUT.pack,
      // a scanned page costs roughly 1,500 to 3,000 tokens; reserve generously
      estInput: estimateTokens(SYSTEM_PROMPT, prompt) + (sendPdf ? Math.ceil(body.pdfBase64.length / 40) : 0),
      model: MODEL, call: (model: string) => ask(model, SYSTEM_PROMPT, content, PACK_SCHEMA, "high", MAX_OUTPUT.pack),
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
