// Supabase Edge Function: course-tutor
// POST { mode: "mark", subject, task: { title, brief, prompt, rubric, model }, answer }  → { feedback }
// POST { mode: "roleplay", subject, case: { client, persona, facts }, turns, conversationId? } → { reply }
// POST { mode: "debrief", subject, case, rubric, turns }                                 → { feedback }
// POST { mode: "explain", subject, lesson: { id, title }, question, lab? }               → { answer, fromLesson }
// POST { mode: "diagnose", subject, lesson, question: { q, options, chosen, why } }        → { misconception, explanation, check }
// POST { mode: "socratic" | "examiner", subject, lesson, goal?, turns, conversationId? }  → { reply }
// POST { mode: "challenge", subject, lesson, focus }                                     → { questions }
// POST { mode: "connect", subject, lesson, candidates: [{ id, title }] }                 → { links }
// POST { mode: "director", subject, course, summary, candidates }                        → { message, steps }
// POST { mode: "coach", subject, question, profile, turns? }                            → { answer, actions }
// Every reply also carries { usage: { feature, plan, used, allowance, resetsAt, counted } }; a refusal carries
// { error, reason, feature, plan, used, allowance, resetsAt, upgrade } (docs/APP-API.md). The website and the iOS app
// call this same function, so a learner's allowance is shared across them.
// Controls (allowances, conversations, rate limits, spending caps, the response cache, cost tracking) are in
// _shared/ai.js and public.ai_claim_for / ai_settle_for. The service role is used for those ledger calls only; the
// learner is identified from their own token. The Claude API key stays here as a server secret.
// The prompts, schemas and input checks are in _shared/tutor.js (a copy of kit/assess/tutor.js).
// Lesson-grounded modes are given the lesson's canonical notes, fetched here from the published site by lesson id
// (_shared/canon.js, a copy of kit/assess/canon.js). Any notes text the browser sends is ignored.
import Anthropic from "npm:@anthropic-ai/sdk@0.133.0";
import { createClient } from "npm:@supabase/supabase-js@2.117.0";
import { MODEL, FEEDBACK_MODES, buildRequest, checkReply } from "../_shared/tutor.js";
import { canonicalLesson } from "../_shared/canon.js";
import { runAi, ledger, estimateTokens, cacheable, cacheKey, normaliseQuestion, conversationOf, fail } from "../_shared/ai.js";

// modes that are grounded in a lesson's notes
const LESSON_MODES = ["explain", "diagnose", "socratic", "examiner", "challenge", "connect"];
// the published site the notes are read from, cached for ten minutes per file
const SITE = (Deno.env.get("GRADIFY_SITE_URL") ?? "https://getgradify.com").replace(/\/+$/, "");
const files = new Map<string, { at: number; text: string | null }>();
async function siteText(path: string): Promise<string | null> {
  const hit = files.get(path); if (hit && Date.now() - hit.at < 6e5) return hit.text;
  const res = await fetch(`${SITE}/${path}`, { redirect: "error" });
  if (!res.ok && res.status !== 404) throw new Error(`site ${res.status}`);
  const text = res.ok ? await res.text() : null;
  files.set(path, { at: Date.now(), text }); return text;
}

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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(req) });
  if (req.method !== "POST") return json(req, { error: "Use POST." }, 405);

  // who is asking: their own token
  const asUser = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } } });
  const { data: { user } } = await asUser.auth.getUser();
  if (!user) return json(req, { error: "Please sign in to use the Gradify AI tutor.", reason: "signed_out" }, 401);

  let body: any;
  try { body = await req.json(); } catch { return json(req, { error: "Bad request." }, 400); }
  if (body?.mode === "explain") body.question = normaliseQuestion(body.question);

  // the lesson's canonical notes replace whatever the browser sent
  if (LESSON_MODES.includes(body?.mode)) {
    try { body.lesson = await canonicalLesson(body, siteText); }
    catch (e) { const st = (e as { status?: number }).status; return json(req, { error: st ? (e as Error).message : "The lesson notes couldn't be loaded. Please try again in a minute." }, st ?? 502); }
  }

  let r: ReturnType<typeof buildRequest>;
  try { r = buildRequest(body); } catch (e) { return json(req, { error: (e as Error).message }, (e as { status?: number }).status ?? 400); }

  // the ledger is written with the service role, for this learner only
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const out = await runAi(ledger(admin, user.id), {
    mode: r.mode,
    site: String(body.subject ?? "").slice(0, 40) || null,
    conversationId: conversationOf(r.mode, body.conversationId),
    estInput: estimateTokens(r.system, r.messages),
    maxOutput: r.maxTokens,
    cacheKey: cacheable(r.mode, body) ? await cacheKey(MODEL, r) : null,
    model: MODEL,
    // the model for this feature comes from the claim (public.ai_feature_models): Opus for tutoring and explanations
    call: (model: string) => anthropic().beta.messages.stream({
      model,
      max_tokens: r.maxTokens,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: r.effort, ...(r.schema ? { format: { type: "json_schema", schema: r.schema } } : {}) },
      system: [{ type: "text", text: r.system, cache_control: { type: "ephemeral" } }],
      messages: r.messages,
    }).finalMessage(),
    parse: (msg: Anthropic.Beta.BetaMessage) => {
      const text = msg.content.filter((b) => b.type === "text").map((b) => (b as { text: string }).text).join("").trim();
      if (!r.schema) { if (!text) fail(502, "The tutor didn't reply. Please try again.", "empty"); return { reply: text, model: msg.model }; }
      // lesson ids must be ones the request offered, choice questions need one right answer (checkReply)
      const data = checkReply(r.mode, JSON.parse(text), body);
      return FEEDBACK_MODES.includes(r.mode) ? { feedback: data, model: msg.model } : { ...data, model: msg.model };
    },
  }).catch((e) => { console.error("course-tutor", e); return { status: 503, body: { error: "Gradify AI isn't available right now." } }; });
  return json(req, out.body, out.status);
});
