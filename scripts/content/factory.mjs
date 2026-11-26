// The content factory (owner, 25 Nov 2026): the engine builds the templates, an external model writes the content,
// and the engine checks and installs what comes back. Two modes:
//
//   templates   gradify template [--subject s] [--limit n] [--topic <subject/topic>]
//               one self-contained Markdown file per queued topic, in content/templates/<subject>/ (never committed:
//               it quotes the specification). A topic with a current research brief gets a WRITE template (every
//               instruction, the format, the standard, the level's example lessons and the work packet); one without
//               gets a RESEARCH template first.
//   ingestion   gradify ingest [files…] [--review]
//               the returned .md (or .txt) files from content/inbox/: a brief is checked and stored; a unit file goes
//               through every gate, the topic's flashcard minimum and (with --review) the review, and passing lessons
//               are filed exactly as the engine files its own. Every file gets a report beside it in content/inbox/
//               done/ or rejected/; nothing invalid is filed, and filing again replaces by title, so a resubmitted
//               file never duplicates a lesson.
//
// Nothing here publishes: filed lessons reach a course only through gradify publish and the rolling PR.
import { readFileSync, existsSync, readdirSync, mkdirSync, renameSync, writeFileSync } from "node:fs";
import { CONFIG, at, out, save, slug, today, briefPath, inboxDir } from "./lib.mjs";
import { splitUnit } from "./shorthand.mjs";
import { nextTopics, frameworksFor, topicsFor } from "./queue.mjs";
import { packetFor, researchRequest, checkBrief, stampBrief, currentBrief, runTopic, parentOf } from "./loop.mjs";
import { examplesFor, promptText } from "./build.mjs";

const STD = () => ({ flashcardsPerTopic: 20, diagramsPerLesson: 3, ...(CONFIG.standards || {}) });
const text = (p) => (existsSync(at(p)) ? readFileSync(at(p), "utf8") : "");
const notesHeader = () => text("kit/course/notes.js").split("\n").filter((l) => l.startsWith("//")).map((l) => l.replace(/^\/\/ ?/, "")).join("\n");
export const templateDir = (subject) => out(`content/templates/${subject}/`);
export const submissionName = (topic, kind) => `${slug(topic.id.split("/").pop())}${kind === "research" ? ".brief" : ""}.md`;
const fence = (s) => `\`\`\`\n${String(s).trim()}\n\`\`\``;

/** the RESEARCH template for a topic with no current brief */
export function researchTemplate(topic) {
  return [`# Gradify research template: ${topic.title}`, "",
    `Topic \`${topic.id}\` · ${topic.fw} ${topic.section} · ${topic.level} · made ${today()} by \`gradify template\`. Give this whole file to the research model.`, "",
    "## What to return", "",
    `Return **only** the research brief, in the shorthand format below, ending with \`END\`. Save it as \`content/inbox/${submissionName(topic, "research")}\`, then run \`gradify ingest\`. The brief is refused, with a report, if it cites a source not on the ALLOW list, has fewer than 3 independent publishers, copies 8 or more words of a requirement, or breaks the format.`, "",
    "## Research instructions", "", promptText("research.md").trim(), "",
    "## Formats", "", promptText("shorthand.md").trim(), "",
    "## Your research request", "", fence(researchRequest(topic, { old: existsSync(briefPath(topic.id)) ? readFileSync(briefPath(topic.id), "utf8") : null })), ""].join("\n");
}

/** the WRITE template for a topic whose brief is current */
export function writeTemplate(topic, brief) {
  const s = STD(), examples = examplesFor(topic.level).map((f) => `### Example: ${f.split("/").pop().replace(/\.txt$/, "")}\n\n${fence(text(f))}`).join("\n\n");
  return [`# Gradify lesson template: ${topic.title}`, "",
    `Topic \`${topic.id}\` · ${topic.fw} ${topic.section} · ${topic.level} · made ${today()} by \`gradify template\`. Give this whole file to the writing model.`, "",
    "## What to return", "",
    `Return **only** the unit file: the lessons in the Gradify notes format, each starting with a \`## Title\` line, then \`END\` on its own line. No commentary before or after. Save it as \`content/inbox/${submissionName(topic, "write")}\`, then run \`gradify ingest\`.`, "",
    "## Mandatory minimums (checked automatically)", "",
    "A file that misses any of these is rejected with a report naming the lesson, the line and what's wrong. Fix the file and submit it again; resubmitting never duplicates a lesson.", "",
    `- **Flashcards:** at least ${s.flashcardsPerTopic} distinct \`Q:\` flashcards across the topic's lessons, covering definitions, explanations, comparisons, processes, applications and exam knowledge. A repeated question counts once.`,
    `- **Diagrams:** at least ${s.diagramsPerLesson} distinct diagrams in every lesson: a \`D:\` id from the DIAG list in the packet, a \`DIA:\` spec for a listed renderer (RND), or a \`DNEED:\` line saying exactly what the diagram must show and label. A \`DNEED:\` diagram is drawn before the lesson is published.`,
    "- **Requirements:** a `REQ:` line, naming the objectives that teach it, for every requirement the lesson teaches, using only the REQ ids in the packet.",
    "- **Sources:** facts only from the BRIEF in the packet, and an `SRC:` line for each brief source the lesson relies on. A brief `CONFLICT:` the lesson relies on gets its own `!:` line naming each account and its source.",
    "- **Format:** only the tags of the notes format below; the level's `LV:`; objectives, key terms, check questions tagged with objectives, and summary lines, as the content standard says.", "",
    "## Writer instructions", "", promptText("writer.md").trim(), "",
    "## The notes format", "", notesHeader(), "",
    "## The content standard", "", text("docs/CURRICULUM_CONTENT_STANDARD.md").trim(), "",
    "## Example lessons at this level", "", examples, "",
    "## Your work packet", "", fence(packetFor(topic, brief.brief)), ""].join("\n");
}

/** a subject's start file: the handover instructions, then its templates in the order to work through them */
export function startFile(subject, res) {
  const rows = res.filter((r) => r.subject === subject), n = (k) => rows.filter((r) => r.kind === k).length;
  return [promptText("handover.md").trim(), "", `## ${subject[0].toUpperCase()}${subject.slice(1)}: the templates in this folder`, "",
    `Made ${today()} by \`gradify template\`: ${rows.length} topic${rows.length === 1 ? "" : "s"}, ${n("research")} needing research first and ${n("write")} ready to write. Work through them in this order, which follows the specification. Give the model this file once, then one template at a time.`, "",
    "| # | Topic | Template | Save the reply as |", "|---|---|---|---|",
    ...rows.map((r, i) => `| ${i + 1} | ${r.title} (${r.section}, ${r.reqs} requirement${r.reqs === 1 ? "" : "s"}) | \`${r.file.split("/").pop()}\` | \`content/inbox/${r.save}\` |`), "",
    "After saving replies to the inbox, run `gradify ingest`. Each file gets a report in `content/inbox/done/` or `content/inbox/rejected/`. When briefs have been accepted, run `gradify template` again to get those topics' lesson templates.", ""].join("\n");
}

/** write templates for the next queued topics, and each subject's start file; returns [{ topic, kind, file }] */
export function exportTemplates(subjects, { limit = 5, topicId = null } = {}) {
  const res = [];
  for (const subject of subjects) {
    const topics = topicId ? frameworksFor(subject).flatMap((fw) => topicsFor(fw)).filter((t) => t.id === topicId) : nextTopics(subject, { limit });
    for (const topic of topics) {
      const brief = currentBrief(topic), kind = brief ? "write" : "research";
      const file = new URL(`${slug(topic.id.split("/").pop())}.${kind}.md`, templateDir(subject));
      save(file, kind === "write" ? writeTemplate(topic, brief) : researchTemplate(topic));
      res.push({ subject, topic: topic.id, title: topic.title, section: topic.section, reqs: topic.reqs.length, kind, file: file.pathname, save: submissionName(topic, kind) });
    }
    if (res.some((r) => r.subject === subject)) save(new URL("00-START-HERE.md", templateDir(subject)), startFile(subject, res));
  }
  return res;
}

// ---------- ingestion ----------
/** a returned file's text, without a code fence or chat preamble around it; and what it is */
export function readSubmission(raw) {
  let t = String(raw).replace(/\r/g, "");
  const f = t.match(/```[a-z]*\n([\s\S]*?)\n```/);
  if (f && (/^## /m.test(f[1]) || /^TOPIC /m.test(f[1]))) t = f[1];
  if (/^TOPIC \S+/m.test(t) && !/^## /m.test(t)) return { kind: "brief", text: t.slice(t.search(/^TOPIC /m)).trim() };
  const at = t.search(/^## /m);
  return at < 0 ? { kind: "unknown", text: t } : { kind: "unit", text: t.slice(at).trim() };
}
const issueLine = (i) => `  - ${i.code}${i.line ? ` L${i.line}` : ""}: ${i.note}`;

/**
 * Check and install one returned file. Returns { ok, kind, topic, report, filed, failures }; `ok` means it was valid
 * and fully installed. Lessons that pass are filed even when a sibling fails; the report lists every failure.
 */
export async function ingestFile(name, raw, { all = [], ask = null, askMany = null, tools = {}, reviewed = false, log = () => {} } = {}) {
  const sub = readSubmission(raw), lines = [`# Ingest report: ${name}`, "", `Checked ${today()} by gradify ingest.`, ""];
  if (sub.kind === "unknown") return { ok: false, kind: "unknown", report: [...lines, "**Rejected.** The file holds neither a research brief (a `TOPIC` line) nor lessons (`## Title` lines).", ""].join("\n") };
  if (sub.kind === "brief") {
    const id = sub.text.match(/^TOPIC (\S+)/m)[1], topic = all.find((t) => t.id === id);
    if (!topic) return { ok: false, kind: "brief", report: [...lines, `**Rejected.** \`TOPIC ${id}\` isn't a queued topic.`, ""].join("\n") };
    const c = checkBrief(sub.text, topic);
    if (c.problems.length) return { ok: false, kind: "brief", topic: id, report: [...lines, `**Rejected:** the brief for \`${id}\` has ${c.problems.length} problem${c.problems.length === 1 ? "" : "s"}. Fix them and submit it again.`, "", ...c.problems.map((p) => `- ${p}`), ""].join("\n") };
    save(briefPath(topic.id), stampBrief(topic, sub.text));
    return { ok: true, kind: "brief", topic: id, report: [...lines, `**Stored** as the brief for \`${id}\` (${c.parsed.sources.length} sources, ${c.parsed.facts.length} facts, ${c.parsed.background.length} background lines). Run \`gradify template\` for its lesson template.`, ""].join("\n") };
  }
  const lessons = splitUnit(sub.text);
  const reqIds = lessons.flatMap((l) => [...l.text.matchAll(/^REQ:\s*(\S+)/gm)].map((x) => x[1]));
  const topic = all.find((x) => { const known = new Set(x.reqs.map((r) => r.id)); return reqIds.some((id) => parentOf(id, known)); });
  if (!topic) return { ok: false, kind: "unit", report: [...lines, `**Rejected.** No \`REQ:\` line names a queued requirement${reqIds.length ? ` (found ${[...new Set(reqIds)].join(", ")})` : " (the file has none)"}.`, ""].join("\n") };
  const brief = currentBrief(topic);
  if (!brief) return { ok: false, kind: "unit", topic: topic.id, report: [...lines, `**Rejected.** \`${topic.id}\` has no current research brief: run \`gradify template\` for its research template first.`, ""].join("\n") };
  const fake = async (job) => { if (job === "write") return `${sub.text.replace(/\nEND\s*$/, "")}\nEND`; if (job === "research") return brief.brief.replace(/^#.*\n/, ""); throw new Error(`${job} isn't available while ingesting`); };
  // repairs are the writer's job: a failing lesson is reported, never rewritten here
  const noRepair = async (job, items) => new Map(items.map((it) => [it.key, job === "review" ? `REV ${it.key} OK` : new Error("repairs come back as a resubmitted file")]));
  const r = await runTopic(topic, { ask: fake, askMany: reviewed && askMany ? askMany : noRepair, render: tools.render || null, legible: tools.legible || null, log, reviewed });
  const ok = !r.failures.length;
  lines.push(`Topic \`${topic.id}\` · ${lessons.length} lesson${lessons.length === 1 ? "" : "s"} · ${r.lessons.length} filed · ${r.failures.length} rejected${reviewed ? "" : " · gates only (no review yet): filed lessons are \"gates-passed\" and can't be published until reviewed"}.`, "");
  if (r.lessons.length) lines.push("## Filed", "", ...r.lessons.map((l) => `- ${l.title} (${l.tier})`), "");
  if (r.failures.length) lines.push("## Rejected: fix these and submit the file again", "", ...r.failures.flatMap((f) => [`- **${f.title}** failed \`${f.gate}\`:`, ...(f.issues || []).map(issueLine)]), "");
  if (r.needs?.length) lines.push("## Diagrams to draw before publishing", "", ...r.needs.map((n) => `- ${n}`), "");
  return { ok, kind: "unit", topic: topic.id, filed: r.lessons, failures: r.failures, report: lines.join("\n") };
}

/** ingest every file given (or every .md and .txt in content/inbox/); each moves to done/ or rejected/ with its report */
export async function ingestAll(files, opts = {}) {
  const list = files.length ? files : existsSync(inboxDir) ? readdirSync(inboxDir).filter((f) => /\.(md|txt)$/.test(f) && !f.endsWith(".report.md")).map((f) => new URL(f, inboxDir).pathname) : [];
  const res = [];
  for (const f of list) {
    const name = f.split("/").pop(), r = await ingestFile(name, readFileSync(f, "utf8"), opts);
    const dest = out(`content/inbox/${r.ok ? "done" : "rejected"}/`); mkdirSync(dest, { recursive: true });
    writeFileSync(new URL(`${name.replace(/\.(md|txt)$/, "")}.report.md`, dest), r.report);
    if (f.startsWith(inboxDir.pathname)) renameSync(f, new URL(name, dest));
    res.push({ file: name, ...r });
  }
  return res;
}
