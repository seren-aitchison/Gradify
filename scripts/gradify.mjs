#!/usr/bin/env node
// gradify: the content engine's one command (docs/CONTENT-ENGINE.md). A thin CLI over scripts/content/ and the existing
// curriculum and knowledge scripts. Adding a subject, board or country is a registry row and a config line, not code.
//
//   gradify run [--subject s] [--limit n] [--mode fast|cheap] [--minutes m]   the whole loop for the next topics
//   gradify batch [...]                     run in cheap mode (Message Batches, half price, slower)
//   gradify research <subject/topic> [--force]   build or refresh one topic's brief
//   gradify work <subject> [--limit n] [--json] [--no-map]   agent mode: drive this Claude Code session (no API key);
//                                           does every scripted step and prints the subagent steps left (docs/CONTENT-ENGINE.md)
//   gradify next [--subject s] [--emit]     print the next work packet (paste into the Writer project by hand);
//                                           --emit writes the queue's request files to content/queue/ instead
//   gradify publish <subject>               move AI-checked and expert-reviewed drafts into the course (via the rolling PR)
//   gradify standards [--lessons f.tsv]    the production standard across the library: flashcards per topic, diagrams per
//                                           lesson, by course (and per lesson into f.tsv); read-only
//   gradify preview <subject> [--topic t] [--out dir]   filed lessons drawn by the real course engine, desktop and
//                                           mobile screenshots; publishes only into a scratch copy (preview.mjs)
//   gradify evidence <topic> [--brief f] [--retrieve] [--sheet] [--apply f]   the evidence behind a brief: retrieve its
//                                           sources, report claim by claim, and the sheet a person fills in to check them
//   gradify approve-evidence <topic> --by <name> --github <login> [--accept-gaps <reason>] [--acknowledge <inputs>]
//                                           a person approves the evidence: unlocks lesson writing for that exact brief,
//                                           evidence and every other material input (revoke-evidence --why)
//   gradify verify-approval <topic> --pr <n>   links the approval to its evidence-review PR (opened by the GitHub App)
//                                           and runs the live review check every gate runs; writing and publishing
//                                           need it to PASS. Expert authority comes only from content/reviewers.json
//   gradify template [--subject s] [--limit n] [--topic t]   self-contained templates for an external model to write
//                                           from: a research template, or once the brief is in, a lesson template
//   gradify ingest [files…] [--review]      check and install the returned .md files from content/inbox/ (factory.mjs)
//   gradify map [<framework>]                fold legacy mapping decisions into the mapping store; count each status
//                                           (then node scripts/curriculum/spec-view.mjs <view> regenerates Specification Mastery)
//   gradify fixlist [--subject s]           fix lists for every lesson that failed, to paste back to the Writer
//   gradify status [--write]                progress from the files and git; --write updates knowledge-engine/CORE/
//   gradify signals                         repair queue from learners' wrong-answer rates (Supabase secrets needed)
//   gradify bench [--save]                  gates and review over the benchmark lessons, against the saved baseline
//   gradify approve <subject/topic> "<lesson title>" --by "<reviewer name>"   a named expert approves one lesson
//   gradify pr [--out file]                 the rolling PR's description from this run's records
import { readFileSync, readdirSync, existsSync, renameSync, mkdirSync } from "node:fs";
import { CONFIG, at, out, load, save, today, briefPath, inboxDir } from "./content/lib.mjs";
import { nextTopics, subjectsInRun, frameworksFor, topicsFor, diagramsFor } from "./content/queue.mjs";
import { runTopic, research } from "./content/loop.mjs";
import { runGates } from "./content/gates.mjs";
import { packet, splitUnit, fixList, parseVerdicts, numbered, parentOf } from "./content/shorthand.mjs";
import { status, writeHandover, prBody } from "./content/report.mjs";
import { evidenceApproved, gateNote } from "./content/evidence.mjs";

const argv = process.argv.slice(2), cmd = argv[0];
const opt = (k, d = null) => { const i = argv.indexOf(`--${k}`); return i > 0 ? argv[i + 1] : d; };
const flag = (k) => argv.includes(`--${k}`);
const log = (...a) => console.log(...a);

async function tools({ needBrowser = true } = {}) {
  const { renderer } = await import("./knowledge/assemble.mjs"), render = await renderer();
  let legible = null;
  if (needBrowser) try { legible = await (await import("./content/legible.mjs")).legibility(); } catch (e) { log(`(diagram legibility check unavailable: ${e.message.split("\n")[0]}; DIA lessons will fail until it runs)`); legible = async () => ["legibility check unavailable here"]; }
  return { render: (spec) => render(spec), legible };
}
const model = async () => { const m = await import("./content/model.mjs"); return { ask: m.call, askMany: (job, items) => m.many(job, items, { mode: opt("mode", CONFIG.mode) }), spend: m.spend, BudgetExceeded: m.BudgetExceeded, budgetLeft: m.budgetLeft }; };
const subjects = () => (opt("subject") ? [opt("subject")] : subjectsInRun());

async function run() {
  if ((CONFIG.provider || "api") !== "api" && opt("provider") !== "api") throw new Error(`provider is "${CONFIG.provider}" in scripts/content/config.json: the paid API loop is off. Use \`gradify work <subject>\` in a Claude Code session, or pass --provider api`);
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) throw new Error("ANTHROPIC_API_KEY isn't set (the workflow reads it from the repository secret)");
  const m = await model(), t = await tools(), stopAt = Date.now() + Number(opt("minutes", CONFIG.runMinutes)) * 60e3, records = [];
  try {
    outer: for (const subject of subjects()) {
      const topics = nextTopics(subject, { limit: Number(opt("limit", CONFIG.topicsPerRun)) });
      log(`${subject}: ${topics.length} topics this run`);
      // topics in parallel, two at a time: calls within a topic are already parallel
      const queue = [...topics];
      const worker = async () => { for (let tp; (tp = queue.shift());) {
        if (Date.now() > stopAt || m.budgetLeft() <= 0) { queue.length = 0; return; }
        log(`- ${tp.id} (${tp.reqs.length} requirements)`);
        try { const r = await runTopic(tp, { ask: m.ask, askMany: m.askMany, render: t.render, legible: t.legible, log }); records.push(r); log(`  → ${r.status}: ${r.lessons.length} passed, ${r.failures.length} failed`); }
        catch (e) { if (e instanceof m.BudgetExceeded) { log(`  stopped: ${e.message}`); queue.length = 0; return; } log(`  error: ${e.message}`); records.push({ topic: tp.id, lessons: [], failures: [{ title: "(run)", gate: "error", issues: [{ code: "ERR", line: null, note: e.message.slice(0, 120) }] }], uncovered: tp.reqs.map((r) => r.id), gaps: [], needs: [] }); }
      } };
      await Promise.all([worker(), worker()]);
      if (Date.now() > stopAt || m.budgetLeft() <= 0) break outer;
    }
  } finally { await t.legible?.close?.(); }
  // one record per run, never overwritten: <subject>-<workflow run id or time>.json
  const runId = process.env.GITHUB_RUN_ID || new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  // the workflow run id names the run; a time suffix makes each invocation's record its own file
  const runFile = out(`content/runs/${opt("subject") || "all"}-${runId}${process.env.GITHUB_RUN_ID ? `-${Date.now().toString(36)}` : ""}.json`);
  save(runFile, { date: today(), at: new Date().toISOString(), run: runId, mode: opt("mode", CONFIG.mode), spend: m.spend, records });
  writeHandover();
  log(`\n${records.reduce((a, r) => a + r.lessons.length, 0)} lessons passed, ${records.reduce((a, r) => a + r.failures.length, 0)} failed. Spent $${m.spend.usd.toFixed(2)}. Record: ${runFile.pathname}`);
  const left = subjects().some((s) => nextTopics(s, { limit: 1 }).length);
  if (process.env.GITHUB_OUTPUT) { const { appendFileSync } = await import("node:fs"); appendFileSync(process.env.GITHUB_OUTPUT, `more=${left && m.budgetLeft() > 0}\npassed=${records.reduce((a, r) => a + r.lessons.length, 0)}\n`); }
}

async function next() {
  const [tp] = subjects().flatMap((s) => nextTopics(s, { limit: 1 }));
  if (!tp) return log("Nothing queued.");
  if (tp.reqs.every((r) => !r.text)) log(`# Note: the specification text isn't imported here, so the packet names requirements by reference only.\n#   node scripts/curriculum/engine.mjs fetch ${tp.fw} && node scripts/curriculum/engine.mjs import ${tp.fw}\n`);
  if (!existsSync(briefPath(tp.id))) return log(`# No research brief for ${tp.id} yet. Paste this into the Researcher project, save the reply to content/research/${tp.id}.txt, then run gradify next again:\n\nRESEARCH ${tp.id} | levels=${tp.level} | reqs=${tp.reqs.map((r) => r.id).join(",")} | ctry=${tp.country}\n${tp.reqs.map((r) => `REQ ${r.id} | ${r.asks}`).join("\n")}\nEND`);
  if (!evidenceApproved(tp.id, { topic: tp })) return log(`# ${gateNote(tp.id, { topic: tp })}.`);
  const { diagrams, renderers } = diagramsFor(tp);
  log(packet({ id: `${tp.fw}/${tp.section}`, subject: tp.subject, level: tp.level, country: tp.country, framework: tp.fw, reqs: tp.reqs, reuse: tp.reuse, diagrams, renderers, brief: readFileSync(briefPath(tp.id), "utf8").replace(/^#.*\n/, "") }));
}

// files written by an external model (gradify template), saved to content/inbox/ as .md or .txt: briefs are checked
// and stored; unit files go through every gate (and the review with --review) and passing lessons are filed. Each file
// moves to content/inbox/done/ or rejected/ with a report (scripts/content/factory.mjs)
// the evidence behind a topic's brief (scripts/content/evidence.mjs): retrieve its sources, report, and the sheet a
// person fills in to check each claim against its sources. --brief <file> assesses a brief that isn't stored yet.
async function evidence() {
  const E = await import("./content/evidence.mjs"), { parseTable } = await import("./growth/sources.mjs"), id = argv[1];
  if (!id || id.startsWith("--")) throw new Error("usage: gradify evidence <subject/topic> [--brief file] [--retrieve] [--manual <source id> --url <url> --by <name> --on <date> --note <how>] [--sheet] [--apply <sheet.csv>]");
  const briefText = opt("brief") ? readFileSync(opt("brief"), "utf8") : existsSync(briefPath(id)) ? readFileSync(briefPath(id), "utf8") : null;
  if (!briefText) throw new Error(`${id} has no stored research brief: pass one with --brief <file>`);
  const fw = subjects().flatMap((s) => frameworksFor(s).flatMap((f) => topicsFor(f))).find((t) => t.id === id)?.fw || null, dir = out("content/inbox/evidence/"), name = id.split("/").pop();
  if (flag("retrieve")) { const e = E.retrieveAll(id, briefText); for (const s of Object.values(e.sources)) log(`${s.id}: ${s.retrieval}${s.reason ? ` (${s.reason})` : ""}`); }
  if (opt("manual")) log(`${opt("manual")}: recorded as opened by ${E.recordManual(id, opt("manual"), { url: opt("url"), by: opt("by"), on: opt("on"), note: opt("note") }).by}`);
  if (opt("apply")) { const r = E.applySheet(id, briefText, parseTable(readFileSync(opt("apply"), "utf8"))); if (r.problems.length) throw new Error(`Nothing recorded. ${r.problems.length} problem(s):\n  ${r.problems.join("\n  ")}`); log(`${r.applied} verdict(s) recorded.`); }
  if (flag("sheet")) { const f = new URL(`${name}.claims.csv`, dir); save(f, E.claimSheet(briefText, E.loadEvidence(id))); log(`Sheet: ${f.pathname} (fill in verdict, note, by and on for each source you checked, then --apply it)`); }
  const r = E.evidenceReport(id, briefText, E.loadEvidence(id), { fw }), f = new URL(`${name}.md`, dir);
  save(f, r.markdown);
  log(`${r.assessment.sufficient ? "Sufficient" : `Not sufficient: ${r.assessment.gaps.length} gap(s)`} · ${r.copies.filter((m) => m.severity === "block").length} blocking copy match(es) · report: ${f.pathname}`);
}

async function ingest() {
  const { ingestAll } = await import("./content/factory.mjs");
  const files = argv.slice(1).filter((a) => !a.startsWith("--"));
  const all = subjects().flatMap((s) => frameworksFor(s).flatMap((fw) => topicsFor(fw))), t = await tools();
  const m = flag("review") ? await model() : null;
  if (!m) log("(no --review: gates only; passing lessons are filed as gates-passed and still need the review before they can be published)");
  try {
    const res = await ingestAll(files, { all, askMany: m?.askMany, tools: t, reviewed: !!m, log });
    if (!res.length) return log("Nothing in content/inbox/. Save each returned file there as .md, then run gradify ingest.");
    for (const r of res) log(`${r.file}: ${r.ok ? "installed" : "rejected"}${r.topic ? ` (${r.topic})` : ""}: report in content/inbox/${r.ok ? "done" : "rejected"}/${r.file.replace(/\.(md|txt)$/, "")}.report.md`);
  } finally { await t.legible?.close?.(); }
}

// agent mode: one round of `gradify work`, printed as the steps this session hands to subagents
async function agentWork(subject, { print = true } = {}) {
  const { work } = await import("./content/agent.mjs"), t = await tools();
  let r; try { r = await work(subject, { limit: Number(opt("limit", CONFIG.topicsPerRun)), render: t.render, legible: t.legible, map: !flag("no-map") }); } finally { await t.legible?.close?.(); }
  save(out(`content/queue/${subject}/ACTIONS.json`), { generated: new Date().toISOString(), actions: r.actions });
  if (!print) return r;
  if (flag("json")) { log(JSON.stringify(r, null, 1)); return r; }
  for (const f of r.filed) log(`filed ${f.topic}: ${f.status}, ${f.lessons.length} lessons passed${f.failures.length ? `, ${f.failures.length} failed` : ""}`);
  for (const w of r.awaiting || []) log(`waiting: ${w}`);
  for (const m of r.mapped) log(`mapped ${m}`);
  for (const x of r.reviewed || []) log(`reviewed ${x.topic}: "${x.title}" passed → ${x.tier}`);
  for (const x of r.reviewFailed || []) log(`reviewed ${x.topic}: "${x.title}" failed (${x.issues.map((i) => i.code).join(", ")}): report in content/inbox/rejected/${x.topic.split("/").pop()}.review.md for the writing model`);
  if (r.external && r.done) log(`Nothing waiting for review or mapping. New lessons come from the writing model: gradify template --subject ${subject}, then gradify ingest.`);
  if (r.filed.length || r.mapped.length || r.reviewed?.length || r.reviewFailed?.length) log(`\nCOMMIT NOW, so nothing is lost if the session stops:\n  node scripts/gradify.mjs publish ${subject}\n  node scripts/gradify.mjs pr --out content/PR.md && node scripts/gradify.mjs status --write\n  git add content kit/courses knowledge-engine && git commit -m "Content engine: ${subject}" && git push origin HEAD:content/rolling\n  then open or update the pull request from content/rolling, with content/PR.md as its description.\n`);
  if (r.done) { log(`DONE: nothing left to write or map for ${subject}.`); return r; }
  if (!r.actions.length) { log("Nothing waiting on a subagent: run gradify work again."); return r; }
  log(`${r.actions.length} steps for subagents. Start them all at once, one Agent call each, with the model and prompt shown. Each writes only its reply file. When every reply is saved, run \`node scripts/gradify.mjs work ${subject}\` again.\nIf the session is close to its usage limit, start no new steps: commit what's filed (above) and stop. Everything else is saved in content/queue/ for the next session.\n`);
  r.actions.forEach((a, i) => log(`[${i + 1}] ${a.kind} · ${a.topic} · model ${a.model}\n${a.prompt}\n`));
  return r;
}

function fixlists() {
  for (const s of subjects()) { const led = load(out(`content/ledger/${s}.json`)); if (!led) continue;
    for (const [id, e] of Object.entries(led.topics)) for (const f of e.failures || []) log(`# ${id}\n${fixList(f.title, f.issues)}\n`); }
}

async function bench() {
  const dir = existsSync(at("prompts/benchmark/")) ? at("prompts/benchmark/") : at("prompts/examples/");
  const files = readdirSync(dir).filter((f) => f.endsWith(".txt")).sort(), t = await tools(), m = flag("review") ? await model() : null, rows = [];
  try {
    for (const f of files) for (const l of splitUnit(readFileSync(new URL(f, dir), "utf8"))) {
      const text = /^REQ:/m.test(l.text) ? l.text : l.text.replace(/\n(O:[^\n]*)/, "\n$1\nREQ: bench:1 @1");
      const g = await runGates(text, { reqs: [{ id: "bench:1", text: l.title, title: l.title }], render: t.render, legible: t.legible });
      let review = null;
      if (m && g.ok) review = parseVerdicts((await m.askMany("review", [{ key: "b#1", user: `LESSON b#1\n${numbered(text)}` }])).get("b#1"))[0]?.ok ?? false;
      rows.push({ file: f, title: l.title, gates: g.ok, failedAt: g.failed?.gate || null, review });
    }
  } finally { await t.legible?.close?.(); }
  const score = rows.filter((r) => r.gates && r.review !== false).length / rows.length, base = load(out("content/bench.json"));
  for (const r of rows) log(`${r.gates ? "pass" : `fail ${r.failedAt}`.padEnd(9)} ${r.review == null ? "" : r.review ? "review OK" : "review FAIL"}  ${r.file}`);
  log(`\nscore ${(score * 100).toFixed(0)}% (${dir.pathname.includes("benchmark") ? "benchmark" : "examples: no expert benchmark yet"})${base ? `, baseline ${(base.score * 100).toFixed(0)}%: ${score >= base.score ? "matches or beats it" : "WORSE, don't adopt this prompt change"}` : ""}`);
  if (flag("save")) save(out("content/bench.json"), { date: today(), score, rows });
  if (base && score < base.score) process.exitCode = 1;
}

try {
  if (cmd === "run") await run();
  else if (cmd === "batch") { argv.push("--mode", "cheap"); await run(); }
  else if (cmd === "research") { const m = await model(), tp = subjects().flatMap((s) => frameworksFor(s).flatMap((fw) => topicsFor(fw))).find((x) => x.id === argv[1]); if (!tp) throw new Error(`no queued topic ${argv[1]}`); const r = await research(tp, { ask: m.ask, force: flag("force") }); log(r.brief ? `${r.cached ? "unchanged" : "written"}: content/research/${tp.id}.txt ($${m.spend.usd.toFixed(2)})` : `unusable brief: ${r.parsed.problems.join("; ")}`); }
  else if (cmd === "next" && flag("emit")) { const s = opt("subject") || subjectsInRun()[0], r = await agentWork(s, { print: false }); for (const a of r.actions) log(`${a.kind.padEnd(8)} ${a.topic}  ${a.req || a.pairs?.map((p) => p[0]).join(" ")}`); if (!r.actions.length) log("Nothing to emit."); }
  else if (cmd === "next") await next();
  else if (cmd === "work") await agentWork(argv[1] && !argv[1].startsWith("--") ? argv[1] : opt("subject") || subjectsInRun()[0]);
  else if (cmd === "publish") { const { publish } = await import("./content/publish.mjs"); const r = await publish(argv[1] || opt("subject")); log(r.unit ? `${r.unit}: ${r.added.length} added, ${r.updated.length} updated${r.hooks?.length ? `; course files wired: ${r.hooks.join(", ")}` : ""}${[...r.added, ...r.updated].map((x) => `\n  ${x}`).join("")}${r.skipped.length ? `\nnot published (${r.skipped.length}): ${r.skipped.slice(0, 12).join("; ")}` : ""}` : "Nothing to publish yet.");
    // wiring a course adds an import, which changes its page's module preloads (tests/smooth-load.test.mjs)
    if (r.hooks?.length) { const { execFileSync } = await import("node:child_process"); execFileSync("node", ["scripts/preload-modules.mjs"], { cwd: at("./").pathname, stdio: "inherit" }); } }
  else if (cmd === "ingest") await ingest();
  else if (cmd === "evidence") await evidence();
  else if (cmd === "approve-evidence" || cmd === "revoke-evidence") {
    const E = await import("./content/evidence.mjs"), id = argv[1];
    if (!id || id.startsWith("--")) throw new Error(`usage: gradify ${cmd} <subject/topic> --by "<name>" --github <login> --on YYYY-MM-DD ${cmd === "approve-evidence" ? '[--note "…"] [--accept-gaps "<reason>"] [--acknowledge <changed inputs, comma-separated>]' : '--why "<reason>"'}`);
    const r = cmd === "approve-evidence" ? E.approveEvidence(id, { by: opt("by"), github: opt("github"), on: opt("on", today()), note: opt("note", ""), acceptGaps: opt("accept-gaps"), acknowledge: String(opt("acknowledge", "")).split(",").map((x) => x.trim()).filter(Boolean) }) : E.revokeEvidence(id, { by: opt("by"), github: opt("github"), on: opt("on", today()), why: opt("why") });
    log(cmd === "approve-evidence" ? `Evidence for ${id} approved by ${r.by} on ${r.on}${r.sufficient ? "" : `, accepting ${r.acceptedGaps.length} gap(s): ${r.acceptGaps}`}. Approval ${r.approvalId}. Nothing is unlocked until ${r.github} approves the evidence-review PR opened by the GitHub App and the live check passes: gradify verify-approval ${id} --pr <n>.` : `Approval for ${id} revoked by ${r.by} on ${r.on}. Lesson writing and publishing are locked again.`);
  }
  else if (cmd === "verify-approval") {
    const E = await import("./content/evidence.mjs"), id = argv[1];
    if (!id || id.startsWith("--")) throw new Error("usage: gradify verify-approval <subject/topic> --pr <number>   (an APPROVED review on that PR by the allowlisted reviewer's GitHub account)");
    const r = E.verifyApproval(id, { pr: Number(opt("pr")) });
    log(`Review verification ${r.status}: ${r.detail}`);
    if (r.status !== "PASS") process.exitCode = 2;
  }
  else if (cmd === "standards") { const { report } = await import("./content/standards.mjs"); log(await report({ lessonsFile: opt("lessons") })); }
  else if (cmd === "preview") {
    const { preview } = await import("./content/preview.mjs"), subject = argv[1] && !argv[1].startsWith("--") ? argv[1] : subjects()[0];
    const r = await preview(subject, { topic: opt("topic"), outDir: opt("out") });
    for (const x of r.lessons) log(`${x.id} ${x.view}: ${x.file}${x.errors.length ? ` · ${x.errors.length} console error(s): ${x.errors[0].slice(0, 120)}` : ""}`);
    if (r.skipped?.length) log(`not previewed: ${r.skipped.join("; ")}`);
  }
  else if (cmd === "template") {
    const { exportTemplates } = await import("./content/factory.mjs");
    const res = exportTemplates(subjects(), { limit: Number(opt("limit", 5)), topicId: opt("topic") });
    if (!res.length) log("Nothing queued.");
    for (const r of res) log(r.kind === "approval" ? `${r.topic}: no lesson template: ${r.awaiting}` : `${r.topic}: ${r.kind} template → ${r.file.replace(out("").pathname, "")}`);
    if (res.length) log("Give each file to the writing model, save its reply to content/inbox/ as the .md name the template gives, then run gradify ingest.");
  }
  else if (cmd === "map") {
    // the mapping store (scripts/content/mapstore.mjs): fold legacy decisions in, and count each status
    const { consolidate } = await import("./content/mapstore.mjs");
    for (const fw of argv[1] && !argv[1].startsWith("--") ? [argv[1]] : subjects().flatMap((s) => frameworksFor(s))) { const r = consolidate(fw); log(`${fw}: ${r.folded ? "legacy decisions folded in; " : ""}${Object.entries(r.counts).map(([k, v]) => `${v} ${k}`).join(", ")}`); }
  }
  else if (cmd === "fixlist") fixlists();
  else if (cmd === "status") { const s = status(); if (flag("write")) writeHandover(s); log(JSON.stringify(s, null, 1)); }
  else if (cmd === "signals") { const { fetchSignals } = await import("./content/signals.mjs"); log(JSON.stringify(await fetchSignals())); }
  else if (cmd === "bench") await bench();
  else if (cmd === "approve") { const { approve } = await import("./content/report.mjs"); const l = approve(argv[1].split("/")[0], argv[1], argv[2], opt("by")); log(`approved: ${l.title} by ${l.approvedBy} (${l.approvedOn})`); }
  else if (cmd === "pr") { const d = out("content/runs/"), runs = existsSync(d) ? readdirSync(d).filter((f) => f.endsWith(".json")).map((f) => load(new URL(f, d))) : [];
    const spend = runs.reduce((a, r) => { for (const k of ["usd", "calls", "searches", "cacheRead", "cacheWrite"]) a[k] += r.spend?.[k] || 0; for (const [j, c] of Object.entries(r.spend?.byJob || {})) a.byJob[j] = (a.byJob[j] || 0) + c; return a; }, { usd: 0, calls: 0, searches: 0, cacheRead: 0, cacheWrite: 0, byJob: {} });
    const body = prBody(spend); if (opt("out")) save(new URL(opt("out"), `file://${process.cwd()}/`), body); else log(body); }
  else { log(readFileSync(new URL(import.meta.url), "utf8").split("\n").filter((l) => l.startsWith("//")).join("\n").replace(/^\/\/ ?/gm, "")); process.exitCode = cmd ? 2 : 0; }
} catch (e) { console.error(e.message); process.exitCode = 1; }
