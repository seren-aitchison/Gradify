// Supabase Edge Function: course-tutor
// POST { mode: "mark", subject, task: { title, brief, prompt, rubric, model }, answer }  → { feedback }
// POST { mode: "roleplay", subject, case: { client, persona, facts }, turns }            → { reply }
// POST { mode: "debrief", subject, case, rubric, turns }                                 → { feedback }
// POST { mode: "explain", subject, lesson: { id, title }, question, lab? }               → { answer, fromLesson }
// POST { mode: "diagnose", subject, lesson, question: { q, options, chosen, why } }        → { misconception, explanation, check }
// POST { mode: "socratic" | "examiner", subject, lesson, goal?, turns }                 → { reply }
// POST { mode: "challenge", subject, lesson, focus }                                     → { questions }
// POST { mode: "connect", subject, lesson, candidates: [{ id, title }] }                 → { links }
// POST { mode: "director", subject, course, summary, candidates }                        → { message, steps }
// The learner must be signed in; each mode has a daily limit per learner (DAILY in _shared/tutor.js),
// counted from the tutor_usage table. The Claude API key stays here as a server secret.
// The prompts, schemas and input checks are in _shared/tutor.js (a copy of kit/assess/tutor.js).
// Lesson-grounded modes are given the lesson's canonical notes, fetched here from the published site by lesson id
// (_shared/canon.js, a copy of kit/assess/canon.js). Any notes text the browser sends is ignored.
import Anthropic from "npm:@anthropic-ai/sdk@0.133.0";
import { createClient } from "npm:@supabase/supabase-js@2.117.0";
import { MODEL, DAILY, FEEDBACK_MODES, buildRequest, checkReply } from "../_shared/tutor.js";
import { canonicalLesson } from "../_shared/canon.js";

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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(req) });
  if (req.method !== "POST") return json(req, { error: "Use POST." }, 405);

  // who is asking: their own token, so row-level security applies to the usage table
  const auth = req.headers.get("Authorization") ?? "";
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: auth } } });
  const { data: { user } } = await db.auth.getUser();
  if (!user) return json(req, { error: "Please sign in to use the Gradify AI tutor." }, 401);

  let body: any;
  try { body = await req.json(); } catch { return json(req, { error: "Bad request." }, 400); }

  // the lesson's canonical notes replace whatever the browser sent
  if (LESSON_MODES.includes(body?.mode)) {
    try { body.lesson = await canonicalLesson(body, siteText); }
    catch (e) { const st = (e as { status?: number }).status; return json(req, { error: st ? (e as Error).message : "The lesson notes couldn't be loaded. Please try again in a minute." }, st ?? 502); }
  }

  let r: ReturnType<typeof buildRequest>;
  try { r = buildRequest(body); } catch (e) { return json(req, { error: (e as Error).message }, (e as { status?: number }).status ?? 400); }

  // daily limit for this mode
  const since = new Date(Date.now() - 864e5).toISOString();
  const { count, error: countErr } = await db.from("tutor_usage").select("id", { count: "exact", head: true }).eq("mode", r.mode).gte("created_at", since);
  if (countErr) return json(req, { error: "The tutor isn't set up yet." }, 503);
  if ((count ?? 0) >= DAILY[r.mode as keyof typeof DAILY]) return json(req, { error: `You've reached today's limit for this tutor feature (${DAILY[r.mode as keyof typeof DAILY]}). Try again tomorrow.` }, 429);

  try {
    const stream = anthropic.beta.messages.stream({
      model: MODEL,
      max_tokens: r.maxTokens,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: r.effort, ...(r.schema ? { format: { type: "json_schema", schema: r.schema } } : {}) },
      system: [{ type: "text", text: r.system, cache_control: { type: "ephemeral" } }],
      messages: r.messages,
    });
    const msg = await stream.finalMessage();
    if (msg.stop_reason === "refusal") return json(req, { error: "The tutor couldn't help with that. Try rephrasing, and keep to the course material." }, 422);
    const text = msg.content.filter((b) => b.type === "text").map((b) => (b as { text: string }).text).join("").trim();
    await db.from("tutor_usage").insert({ mode: r.mode, site: String(body.subject ?? "").slice(0, 40), input_tokens: msg.usage.input_tokens, output_tokens: msg.usage.output_tokens });
    if (!r.schema) return json(req, { reply: text, model: msg.model });
    // lesson ids must be ones the request offered, choice questions need one right answer (checkReply)
    const data = checkReply(r.mode, JSON.parse(text), body);
    return json(req, FEEDBACK_MODES.includes(r.mode) ? { feedback: data, model: msg.model } : { ...data, model: msg.model });
  } catch (e) {
    console.error(e);
    return json(req, { error: "The tutor is busy or unavailable. Please try again in a minute." }, 502);
  }
});
