// Fix guessable check questions across every course: rewrite the WRONG options so they are real misconceptions of
// about the same length as the right answer. The right answer, the question and the explanation are never changed,
// so the answer key cannot get less accurate; only the distractors move.
//
//   node scripts/quality/fix-questions.mjs plan    [--course chemistry] [--limit 50]   what would be sent, and the cost
//   node scripts/quality/fix-questions.mjs try     [--course chemistry] [--limit 5]    a few lessons now (no batch), then apply
//   node scripts/quality/fix-questions.mjs submit  [--course …] [--limit …]            send everything as Message Batches (half price)
//   node scripts/quality/fix-questions.mjs collect                                       wait for the batches, save the results
//   node scripts/quality/fix-questions.mjs apply                                         validate and write the results into the notes
//
// Which questions: single-answer (M) questions where the right answer is more than 30% longer than every wrong option,
// or where a wrong option is an obvious throwaway ("always zero", "is magic"). The lessons that carry an approved
// Visual Learning Engine diagram are held out until their before/after measurement is done (--include-pilot to override).
//
// Every rewritten question is validated before it is written: same number of wrong options; none equal to the right
// answer or to each other; the right answer no more than 20% longer than the longest wrong option; no throwaway
// options; nothing that would break the notes format (" | ", " :: ", backticks, "${"). Failures are left unchanged and
// listed. Every change is logged with its before and after in docs/learning-audit/question-fix/changes.jsonl.
// apply also bumps each changed question's version in its course registry, which is what lets
// scripts/learning-audit/measure.mjs compare results on the old wording with the new.
//
// Needs Claude API credentials (ANTHROPIC_API_KEY, or the session's credential proxy). Model: claude-opus-5-5.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, appendFileSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";
import { parseNotes, lessonText } from "../../kit/course/notes.js";
import { updateRegistry } from "../curriculum-registry.mjs";

const ROOT = new URL("../../", import.meta.url);
const WORK = new URL("scripts/quality/.work/", ROOT), LOG = new URL("docs/learning-audit/question-fix/", ROOT);
const MODEL = "claude-opus-5-5";
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const has = (k) => process.argv.includes(`--${k}`);

export const ABSURD = /\balways (gases|zero|infinite)\b|to a crawl|purely decorative|has no effect on anything|only on Tuesdays|is magic\b|randomly chosen|never matters\b/i;
export const guessable = (right, wrong) => right.length > 1.3 * Math.max(...wrong.map((w) => w.length));
const FORBIDDEN = /\s\|\s|\s::\s|`|\$\{|\n/;

// ---------- finding the questions ----------
async function pilotLessons() {
  const m = JSON.parse(readFileSync(new URL("kit/diagrams/manifest.json", ROOT), "utf8"));
  return new Set(Object.values(m).filter((d) => d.status === "approved").map((d) => `${d.course}|${d.lesson}`));
}

/** Work items, one per lesson with at least one question to fix. */
export async function findItems({ course, limit = Infinity, includePilot = false } = {}) {
  const held = includePilot ? new Set() : await pilotLessons();
  const items = [];
  for (const c of readdirSync(new URL("kit/courses/", ROOT)).sort()) {
    if (course && c !== course) continue;
    const dir = new URL(`kit/courses/${c}/notes/`, ROOT);
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir).filter((f) => /^u\d+\.js$/.test(f)).sort()) {
      const file = `kit/courses/${c}/notes/${f}`, src = readFileSync(new URL(file, ROOT), "utf8");
      const lessons = parseNotes((await import(new URL(file, ROOT).href)).default);
      for (const L of lessons) {
        if (held.has(`${c}|${L.title}`)) continue;
        const qs = L.mcq.filter((m) => guessable(m.right, m.wrong) || m.wrong.some((w) => ABSURD.test(w)));
        if (!qs.length) continue;
        // the lesson's source block, to find each question's exact line
        const at = src.indexOf(`\n## ${L.title}\n`), end = src.indexOf("\n## ", at + 4), block = src.slice(at, end < 0 ? undefined : end);
        const questions = [];
        for (const m of qs) {
          const line = block.split("\n").find((ln) => /^M[123]?(#[a-z0-9-]+)?(@[\d,]+)?:/.test(ln.trim()) && ln.includes(m.q) && ln.includes(m.right));
          if (line) questions.push({ key: `q${questions.length + 1}`, line: line.trim(), question: m.q, correct: m.right, wrong: m.wrong, explanation: m.why || "" });
        }
        if (questions.length) items.push({ id: `${c}:${f.replace(".js", "")}:${lessons.indexOf(L) + 1}`, course: c, file, title: L.title, level: L.level || "", text: lessonText(L), questions });
        if (items.length >= limit) return items;
      }
    }
  }
  return items;
}

// ---------- the request ----------
const SYSTEM = `You improve multiple-choice check questions in a revision course. Learners currently guess many answers because the correct option is noticeably longer and more detailed than the wrong ones, and some wrong options are absurd. You rewrite only the WRONG options.

For each question you are given the question, the correct answer, the current wrong options and the lesson it belongs to. Write the same number of new wrong options. Each one must:
- Be a specific misconception a real learner at this level holds: confusing two related ideas, reversing a relationship or direction, applying a rule outside its scope, a step missed, a plausible but wrong value from a common slip. Prefer misconceptions the lesson itself warns about.
- Be definitely wrong according to the lesson and the subject. Never partly correct, never arguably correct, never correct under a different reading of the question.
- Match the correct answer in length (between 85% and 120% of its character count, which you are given), grammatical form, register, specificity and tone, so that length, detail, hedging or technical vocabulary do not single out the correct answer.
- Never be a throwaway: no jokes, no impossible or silly claims, no "always zero"-style absolutes unless that overgeneralisation is the genuine misconception, no "all/none of the above".
- Be plain text in British English, keeping the notation the question uses (x^{2}, v_{0}, chemical formulae). Do not use the characters "|", "::", backticks or "\${".

For each wrong option also write "why": one sentence of at most 25 words naming the misconception and why it is wrong.

Do not change the question, the correct answer or the explanation. Return every question you were given, by its key.`;

export const SCHEMA = {
  type: "object", additionalProperties: false, required: ["questions"],
  properties: { questions: { type: "array", items: { type: "object", additionalProperties: false, required: ["key", "wrong"],
    properties: { key: { type: "string" }, wrong: { type: "array", items: { type: "object", additionalProperties: false, required: ["text", "why"], properties: { text: { type: "string" }, why: { type: "string" } } } } } } } },
};

export function params(item) {
  const qs = item.questions.map((q) => ({ key: q.key, question: q.question, correct: q.correct, correct_length: q.correct.length, wrong_options_needed: q.wrong.length, current_wrong: q.wrong, explanation: q.explanation }));
  return {
    model: MODEL, max_tokens: 16000,
    system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
    output_config: { format: { type: "json_schema", schema: SCHEMA } },
    messages: [{ role: "user", content: `Course: ${item.course}${item.level ? ` (${item.level})` : ""}\nLesson: ${item.title}\n\n<lesson>\n${item.text}\n</lesson>\n\n<questions>\n${JSON.stringify(qs, null, 1)}\n</questions>` }],
  };
}

// ---------- validating and writing ----------
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
/** Problems with one rewritten question, or [] when it can be written. */
export function check(q, wrong) {
  const out = [];
  if (!Array.isArray(wrong) || wrong.length !== q.wrong.length) return [`expected ${q.wrong.length} wrong options, got ${wrong?.length ?? 0}`];
  const texts = wrong.map((w) => String(w.text || "").trim());
  if (texts.some((t) => !t)) out.push("an empty option");
  if (texts.some((t) => norm(t) === norm(q.correct))) out.push("a wrong option equals the right answer");
  if (new Set(texts.map(norm)).size !== texts.length) out.push("duplicate wrong options");
  if (q.correct.length > 1.2 * Math.max(...texts.map((t) => t.length))) out.push(`still guessable: right ${q.correct.length} chars, longest wrong ${Math.max(...texts.map((t) => t.length))}`);
  if (texts.some((t) => ABSURD.test(t))) out.push("a throwaway option");
  if ([...texts, ...wrong.map((w) => String(w.why || ""))].some((t) => FORBIDDEN.test(` ${t} `) || t.includes("::") || t.includes("|"))) out.push("characters that break the notes format");
  return out;
}
/** The question's line with its wrong options replaced; the tag, question, right answer (with any note) and explanation kept. */
export function rewriteLine(line, q, wrong) {
  const colon = line.indexOf(":"), tag = line.slice(0, colon), parts = line.slice(colon + 1).trim().split(" | ");
  // parts: question, right[ :: why], wrong…, explanation (the last field is the explanation when 4+ fields follow the right answer)
  const hasWhy = parts.length - 2 >= 4;
  const explanation = hasWhy ? parts.at(-1) : null;
  return `${tag}: ${[parts[0], parts[1], ...wrong.map((w) => `${w.text.trim()} :: ${w.why.trim()}`), ...(hasWhy ? [explanation] : [])].join(" | ")}`;
}

function applyResults(results, items) {
  mkdirSync(LOG, { recursive: true });
  const byId = new Map(items.map((i) => [i.id, i]));
  const files = new Map(), report = { written: 0, failed: [], missing: 0 };
  for (const { id, output, error } of results) {
    const item = byId.get(id);
    if (!item) { report.missing++; continue; }
    if (error) { report.failed.push({ id, why: error }); continue; }
    const got = new Map((output?.questions || []).map((q) => [q.key, q.wrong]));
    for (const q of item.questions) {
      const problems = got.has(q.key) ? check(q, got.get(q.key)) : ["not returned"];
      if (problems.length) { report.failed.push({ id, key: q.key, question: q.question.slice(0, 80), why: problems.join("; ") }); continue; }
      const src = files.get(item.file) ?? readFileSync(new URL(item.file, ROOT), "utf8");
      if (src.split(q.line).length !== 2) { report.failed.push({ id, key: q.key, why: "line not found exactly once (changed since planning?)" }); continue; }
      const next = rewriteLine(q.line, q, got.get(q.key));
      files.set(item.file, src.replace(q.line, () => next));
      appendFileSync(new URL("changes.jsonl", LOG), `${JSON.stringify({ course: item.course, file: item.file, lesson: item.title, question: q.question, correct: q.correct, before: q.wrong, after: got.get(q.key).map((w) => w.text), at: new Date().toISOString().slice(0, 10) })}\n`);
      report.written++;
    }
  }
  for (const [f, src] of files) writeFileSync(new URL(f, ROOT), src);
  writeFileSync(new URL("failed.json", LOG), JSON.stringify(report.failed, null, 1));
  report.courses = [...new Set([...files.keys()].map((f) => f.split("/")[2]))];
  return report;
}

// new question versions in each touched course's registry, so stored attempts on the old wording stay distinct
async function register(courses) {
  for (const c of courses) {
    const course = (await import(new URL(`kit/courses/${c}/course.js`, ROOT).href)).default;
    const { log } = await updateRegistry(c, course);
    console.log(`${c}: ${log.length} registry change${log.length === 1 ? "" : "s"}`);
  }
}

// ---------- running ----------
const parseOut = (msg) => {
  if (msg.stop_reason === "refusal") throw new Error(`refused (${msg.stop_details?.category || "no category"})`);
  if (msg.stop_reason === "max_tokens") throw new Error("ran out of tokens");
  const t = msg.content.find((b) => b.type === "text");
  return JSON.parse(t.text);
};

async function main() {
  const cmd = process.argv[2];
  mkdirSync(WORK, { recursive: true });
  const opts = { course: arg("course"), limit: +arg("limit", Infinity), includePilot: has("include-pilot") };
  if (cmd === "plan" || cmd === "submit" || cmd === "try") {
    const items = await findItems(opts);
    const nq = items.reduce((s, i) => s + i.questions.length, 0);
    const chars = items.reduce((s, i) => s + JSON.stringify(params(i).messages).length, 0);
    // rough: 4 characters a token in; about 250 tokens of options and up to 1,000 of thinking out per lesson
    const inTok = chars / 4 + items.length * 900, outTok = items.length * 1250 + nq * 180;
    console.log(`${items.length} lessons, ${nq} questions. Estimated ${(inTok / 1e6).toFixed(1)}M input and ${(outTok / 1e6).toFixed(1)}M output tokens: about $${((inTok * 2 + outTok * 10) / 1e6).toFixed(0)} as batches (Opus 5.5, half price), $${((inTok * 4 + outTok * 20) / 1e6).toFixed(0)} without.`);
    writeFileSync(new URL("items.json", WORK), JSON.stringify(items));
    if (cmd === "plan") return;
    const client = new Anthropic();
    if (cmd === "try") {
      const results = [];
      for (const item of items) {
        try { results.push({ id: item.id, output: parseOut(await client.messages.create(params(item))) }); }
        catch (e) { results.push({ id: item.id, error: e.message }); }
        process.stdout.write(".");
      }
      const r = applyResults(results, items);
      await register(r.courses);
      console.log(`\n${r.written} questions rewritten, ${r.failed.length} left unchanged (docs/learning-audit/question-fix/failed.json).`);
      return;
    }
    const ids = [];
    for (let i = 0; i < items.length; i += 5000) {
      const b = await client.messages.batches.create({ requests: items.slice(i, i + 5000).map((it) => ({ custom_id: it.id.replace(/[^a-zA-Z0-9_-]/g, "_"), params: params(it) })) });
      ids.push(b.id); console.log(`batch ${b.id}: ${Math.min(5000, items.length - i)} lessons`);
    }
    writeFileSync(new URL("batches.json", WORK), JSON.stringify(ids));
  } else if (cmd === "collect") {
    const client = new Anthropic(), ids = JSON.parse(readFileSync(new URL("batches.json", WORK), "utf8"));
    const items = JSON.parse(readFileSync(new URL("items.json", WORK), "utf8"));
    const back = new Map(items.map((i) => [i.id.replace(/[^a-zA-Z0-9_-]/g, "_"), i.id]));
    const results = [];
    for (const id of ids) {
      let b;
      while ((b = await client.messages.batches.retrieve(id)).processing_status !== "ended") { console.log(`${id}: ${JSON.stringify(b.request_counts)}`); await new Promise((r) => setTimeout(r, 60_000)); }
      for await (const r of await client.messages.batches.results(id)) {
        const itemId = back.get(r.custom_id);
        if (r.result.type !== "succeeded") { results.push({ id: itemId, error: r.result.type }); continue; }
        try { results.push({ id: itemId, output: parseOut(r.result.message) }); } catch (e) { results.push({ id: itemId, error: e.message }); }
      }
    }
    writeFileSync(new URL("results.json", WORK), JSON.stringify(results));
    console.log(`${results.length} results saved; ${results.filter((r) => r.error).length} errors. Next: apply.`);
  } else if (cmd === "apply") {
    const items = JSON.parse(readFileSync(new URL("items.json", WORK), "utf8")), results = JSON.parse(readFileSync(new URL("results.json", WORK), "utf8"));
    const r = applyResults(results, items);
    await register(r.courses);
    console.log(`${r.written} questions rewritten; ${r.failed.length} left unchanged (see docs/learning-audit/question-fix/failed.json).`);
  } else {
    console.error("Usage: fix-questions.mjs plan|try|submit|collect|apply [--course c] [--limit n] [--include-pilot]");
    process.exit(2);
  }
}
if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => { console.error(e.message); process.exit(1); });
