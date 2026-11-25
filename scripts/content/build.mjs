// What a filed lesson was built from, and whether that has changed (Master Plan, decision D). Each lesson's ledger
// record carries `built`: its brief's key and text fingerprint, a hash of each prompt file, the models that wrote and
// reviewed it, its template (the content standard, the notes format and the level's example lessons) and the
// requirement hashes. When any of these changes, only the lessons that used it are listed for rebuilding: the queue
// sends their requirements back to be written (scripts/content/queue.mjs), and the report counts them as "needs update".
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { CONFIG, at, fp } from "./lib.mjs";

const text = (p) => (existsSync(at(p)) ? readFileSync(at(p), "utf8") : "");
export const promptText = (f) => text(`prompts/${f}`);
/** the prompt files a lesson depends on, each hashed on its own (research.md is in the brief's key) */
export const PROMPTS = ["writer.md", "review.md", "shorthand.md"];
export const promptHashes = () => Object.fromEntries(PROMPTS.map((f) => [f, fp(promptText(f))]));
/** the older single fingerprint of research, writer and review prompts, as records made before per-file hashes hold */
export const legacyPromptFp = () => fp(["research.md", "writer.md", "review.md"].map(promptText).join("\n"));

/** the brief's key: its requirements, level and research prompt (a brief is redone when any of these changes) */
export const briefKey = (topic) => fp({ reqs: topic.reqs.map((r) => r.hash).sort(), level: topic.level, prompt: fp(promptText("research.md")) });

/** the level's example lessons, as the Writer is given them (agent mode) */
export function levelKey(level) {
  const lv = String(level).toLowerCase();
  return /gcse|national 5|grade (9|10)/.test(lv) ? "gcse" : /a level|as level|higher/.test(lv) ? "alevel" : /university|undergraduate/.test(lv) ? "undergraduate" : /postgraduate/.test(lv) ? "postgraduate" : /primary|year [1-6]\b|ks[12]/.test(lv) ? "primary" : "gcse";
}
export function examplesFor(level) {
  const key = levelKey(level), d = at("prompts/examples/"), all = existsSync(d) ? readdirSync(d).filter((f) => f.endsWith(".txt")).sort() : [];
  const pick = all.filter((f) => f.startsWith(`${key}--`));
  return (pick.length ? pick : all.slice(0, 2)).map((f) => `prompts/examples/${f}`);
}
const notesHeader = () => text("kit/course/notes.js").split("\n").filter((l) => l.startsWith("//")).join("\n");
/** the template a lesson is written to: the content standard, the notes format and the level's example lessons */
export const templateOf = (level) => ({ level: levelKey(level), fp: fp([text("docs/CURRICULUM_CONTENT_STANDARD.md"), notesHeader(), ...examplesFor(level).map(text)].join("\n")) });

/** the models that write and review now, recorded the way each path records them */
export const AGENT_MODELS = { research: "sonnet", write: "opus", repair: "opus", review: "sonnet", map: "haiku", ...(CONFIG.agent?.models || {}) };
export const currentModels = () => ((CONFIG.provider || "api") === "agent" ? { write: `agent:${AGENT_MODELS.write}`, review: `agent:${AGENT_MODELS.review}` } : { write: CONFIG.models.write, review: CONFIG.models.review });

/** the build record for a lesson filed now */
export const buildRecord = (topic, brief, { models = currentModels(), reqs = [] } = {}) => ({
  brief: brief.key, briefText: fp(String(brief.brief || "").replace(/^#.*\n/, "")), prompts: promptHashes(), models, template: templateOf(topic.level), reqs,
});

/**
 * Why a filed lesson is out of date: the inputs in its build record that differ from what a lesson would be built
 * from now. Requirement text changes are handled by coverage (scripts/content/loop.mjs, finish), not here. A lesson
 * with no build record, or one replaced by a rebuild (superseded), is never listed.
 */
export function staleness(lesson, topic) {
  const b = lesson?.built; if (!b || lesson.superseded) return [];
  const why = [];
  if (b.brief && b.brief !== briefKey(topic)) why.push("brief");
  if (typeof b.prompts === "string") { if (b.prompts !== legacyPromptFp()) why.push("prompts"); }
  else if (b.prompts) { const now = promptHashes(); for (const f of PROMPTS) if (b.prompts[f] && b.prompts[f] !== now[f]) why.push(`prompt ${f}`); }
  if (b.models) { const now = currentModels(); for (const k of ["write", "review"]) if (b.models[k] && b.models[k] !== now[k]) why.push(`${k} model`); }
  if (b.template?.fp && b.template.fp !== templateOf(topic.level).fp) why.push("template");
  return why;
}
/** one key for everything a rebuild would use now, so repeated failed rebuilds of the same target can be capped */
export const targetKey = (topic) => fp({ brief: briefKey(topic), prompts: promptHashes(), models: currentModels(), template: templateOf(topic.level).fp });
