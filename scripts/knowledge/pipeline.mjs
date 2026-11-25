// The knowledge engine's command line: from sources to a lesson waiting for an expert.
//
//   node scripts/knowledge/pipeline.mjs ingest                 fetch every source in data/knowledge/registry.json
//   node scripts/knowledge/pipeline.mjs evidence [subject]     link each knowledge item to the passages that support it
//   node scripts/knowledge/pipeline.mjs check [subject]        check sources and knowledge items against the schema
//   node scripts/knowledge/pipeline.mjs build <requirement> [--level <level>]
//        assemble one lesson, run automated QA, and write data/knowledge/lessons/<id>/ (lesson.json, notes.txt,
//        assets/, preview.html). e.g. aqa-gcse-biology:4.1.3.2.a  or  gradify-biology:u02-21
//   node scripts/knowledge/pipeline.mjs batch                  build every requirement in scripts/knowledge/batch.json
//   node scripts/knowledge/pipeline.mjs review <lessonId> --approve --by "<name>"   or   --changes "<note>" --by …
//   node scripts/knowledge/pipeline.mjs report [specId]        production report: coverage, lessons, reuse, the gate
//   node scripts/knowledge/pipeline.mjs reuse                  how the GCSE and university lessons share knowledge
//   node scripts/knowledge/pipeline.mjs gate <lessonId>        may this lesson be published? (every reason it may not)
//   node scripts/knowledge/pipeline.mjs confirm-licence <sourceId> --by "<name>"   a person confirms a source's licence
//   node scripts/knowledge/pipeline.mjs impact [subject]       lessons to revise after knowledge or specifications change
//
// In a cloud session, `ingest` needs NODE_USE_ENV_PROXY=1 so Node's fetch goes through the proxy.
import { readdirSync, existsSync, readFileSync } from "node:fs";
import { at, load, save, loadKnowledge, loadSources, ROOT } from "./lib.mjs";
import { ingestAll } from "./ingest.mjs";
import { writeEvidence } from "./evidence.mjs";
import { assemble, writeLesson, loadRequirement } from "./assemble.mjs";
import { qa, advance, review, impact, DIMENSIONS } from "./qa.mjs";
import { checkKnowledge, checkSource } from "../../kit/knowledge/schema.js";
import { parseNotes, lessonHtml } from "../../kit/course/notes.js";
import { LEVELS } from "../../kit/knowledge/templates.js";

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const KIND = { multi: "choose all that apply", order: "put in order", num: "calculation", tf: "true or false" };
/** a non-choice question in the preview, with its answer shown for the reviewer */
function taskHtml(t) {
  const head = `<p>${esc(t.q || t.prompt || "")} <span class="kind">${esc(KIND[t.type] || t.type)}</span></p>`;
  let body = "";
  if (t.type === "multi") body = `<ul>${t.options.map((o) => `<li${o.correct ? ' class="right"' : ""}>${esc(o.text)}</li>`).join("")}</ul>`;
  else if (t.type === "order") body = `<ol>${t.steps.map((x) => `<li>${esc(x)}</li>`).join("")}</ol><p class="ans">(shown in the correct order; the learner sees them shuffled)</p>`;
  else if (t.type === "num") body = `<p class="ans">Answer: ${esc(t.answer)} ${esc(t.unit || "")} (±${esc(t.tolerance ?? t.tol ?? 0)})</p>`;
  else body = `<p class="ans">Answer: ${esc(String(t.answer ?? t.correct ?? t.options?.find((o) => o.correct)?.text ?? ""))}</p>`;
  return `<li>${head}${body}${t.why ? `<p class="why">${esc(t.why)}</p>` : ""}</li>`;
}
/** a page to look at a lesson as a learner would, with its QA record: the site's own lesson renderer, diagrams inline */
export function preview({ lesson, notes, assets }) {
  const L = parseNotes(notes)[0];
  const svgOf = (id) => { const a = assets.find((x) => x.id === id); if (a?.svg) return a.svg.wide; const f = new URL(`kit/diagrams/svg/${id}.wide.svg`, ROOT); return existsSync(f) ? readFileSync(f, "utf8") : ""; };
  const body = lessonHtml(L).replace(/<figure class="vx" data-dg="([^"]+)" hidden><\/figure>/g, (_, id) => { const a = assets.find((x) => x.id === id), m = load(new URL("kit/diagrams/manifest.json", ROOT))?.[id]; const cap = a?.spec?.caption || m?.caption || ""; return `<figure class="vx">${svgOf(id)}<figcaption>${esc(cap)}<span class="origin">${a?.origin === "generated" ? "generated for this lesson" : "from the diagram library"}: ${esc(id)}</span></figcaption></figure>`; });
  const q = (L.mcq || []).map((x) => `<li><p>${esc(x.q)}</p><ul>${[x.right, ...x.wrong].map((o, i) => `<li${i ? "" : ' class="right"'}>${esc(o)}</li>`).join("")}</ul></li>`).concat((L.tasks || []).map(taskHtml)).join("");
  const dims = Object.entries(lesson.qa.dimensions).map(([k, d]) => `<tr><td>${k}</td><td class="${d.status}">${d.status}</td><td>${d.checks.length}</td><td>${d.checks.filter((x) => !x.ok).map((x) => esc(`${x.name}${x.detail ? `: ${x.detail}` : ""}`)).join("<br>")}</td></tr>`).join("");
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(L.title)} · ${esc(LEVELS[lesson.level].name)} (preview)</title><style>
:root{--ink:#151826;--soft:#5b6275;--line:#d9dcea;--bg:#fff;--panel:#f4f5fb;--good:#16a34a;--warn:#b45309;--bad:#dc2626;--a1:#4f46e5}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]){--ink:#e8eaf3;--soft:#a3a9bd;--line:#2e3346;--bg:#10121a;--panel:#181b26}}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 system-ui,sans-serif;overflow-wrap:anywhere}main{max-width:760px;margin:0 auto;padding:24px 16px 64px}
.meta{font-size:13px;color:var(--soft);border:1px solid var(--line);border-radius:10px;padding:10px 14px;background:var(--panel)}h1{margin:16px 0 4px}h3{margin-top:28px}
.lead{font-size:18px;color:var(--soft)}figure.vx{margin:18px 0;padding:12px;border:1px solid var(--line);border-radius:12px;background:#fff;color:#151826}figure svg{width:100%;height:auto}figcaption{font-size:14px}figcaption .origin{display:block;font-size:12px;color:#5b6275;margin-top:4px}
.mv-key{border-left:4px solid var(--a1);padding:8px 12px;background:var(--panel)}.co-pit{border-left:4px solid var(--warn);padding:8px 12px;background:var(--panel);margin:10px 0}.co-pit b{display:block}
.co-eq code{font-size:17px}.co-ex{border:1px solid var(--line);border-radius:10px;padding:10px 14px}dl{display:grid;grid-template-columns:minmax(0,max-content) minmax(0,1fr);gap:6px 14px}dt{font-weight:700}
table{border-collapse:collapse;width:100%;font-size:13px;display:block;overflow-x:auto}td,th{border:1px solid var(--line);padding:6px;vertical-align:top;text-align:left}.pass{color:var(--good);font-weight:700}.review{color:var(--warn);font-weight:700}.fail{color:var(--bad);font-weight:700}
.q>li{margin-bottom:12px}.kind{font-size:12px;color:var(--soft);border:1px solid var(--line);border-radius:8px;padding:1px 6px}.why,.ans{font-size:14px;color:var(--soft)}.co-safe{border-left:4px solid var(--bad);padding:8px 12px;background:var(--panel);margin:8px 0}.co-safe b{display:block}.q li.right{font-weight:700}.q li.right::after{content:"  ✓ correct"}</style></head><body><main>
<div class="meta"><b>Preview, not published.</b> ${esc(lesson.status)} · template ${esc(lesson.template)} · built for <b>${esc(lesson.requirement.id)}</b> (${esc(lesson.requirement.title)}) · ${lesson.knowledge.length} knowledge items · automated QA: <b>${esc(lesson.qa.result)}</b> (${lesson.qa.checks} checks, ${lesson.qa.fails} failed, ${lesson.qa.reviews} for the reviewer)</div>
<h1>${esc(L.title)}</h1><p class="lead">${esc(L.lead).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")}</p><p><b>${esc(L.level)}</b></p>
<h3>Learning objectives</h3><ul>${L.objectives.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>${L.prereq.length ? `<h3>What you need to know first</h3><ul>${L.prereq.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>` : ""}
${body}<h3>Key terms</h3><dl>${L.terms.map(([t, d]) => `<dt>${esc(t)}</dt><dd>${esc(d)}</dd>`).join("")}</dl>
<h3>Summary</h3><ul>${L.summary.map((s) => `<li>${esc(s)}</li>`).join("")}</ul><h3>Practice</h3><ol class="q">${q}</ol>
<h3>Sources</h3><ul>${L.sources.map((s) => `<li>${esc(s.cite)}${s.url ? ` <a href="${esc(s.url)}">link</a>` : ""}</li>`).join("")}</ul>
<h3>Automated QA</h3><table><tr><th>Dimension</th><th>Result</th><th>Checks</th><th>Failed or flagged for the reviewer</th></tr>${dims}</table>
<p class="meta">Built from: ${lesson.knowledge.map((k) => `${esc(k.id)} v${k.version} (${esc(k.why)})`).join(", ")}</p></main></body></html>`;
}

export async function build(reqId, opts = {}) {
  const a = await assemble(reqId, opts);
  advance(a.lesson, qa(a));
  const dir = writeLesson(a);
  save(new URL("preview.html", dir), preview(a));
  return { ...a, dir };
}

const allLessons = () => { const d = at("lessons/"); return existsSync(d) ? readdirSync(d).map((id) => load(at(`lessons/${id}/lesson.json`))).filter(Boolean) : []; };

if (import.meta.url === `file://${process.argv[1]}`) {
  const [cmd, a] = process.argv.slice(2), arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
  try {
    if (cmd === "ingest") for (const s of await ingestAll()) console.log(`${s.id}: ${s.passages.length} passages, ${s.licenceName} → ${s.policy}`);
    else if (cmd === "evidence") { const sub = a || "biology", ev = writeEvidence(sub, loadKnowledge(sub), loadSources()); console.log(`${Object.keys(ev).length} items linked → data/knowledge/${sub}/evidence.json`); }
    else if (cmd === "check") { const sub = a || "biology", s = loadSources(), p = [...Object.values(s).flatMap(checkSource), ...checkKnowledge(loadKnowledge(sub), s)]; console.log(p.length ? p.join("\n") : "sources and knowledge: no problems"); if (p.length) process.exit(1); }
    else if (cmd === "build") {
      const r = await build(a, { level: arg("--level") || undefined }), q = r.lesson.qa;
      console.log(`${r.lesson.id}: ${r.lesson.knowledge.length} knowledge items, ${r.lesson.assets.length} diagram(s), ${r.lesson.questions.length} questions`);
      console.log(`automated QA ${q.result}: ${q.checks} checks, ${q.fails} failed, ${q.reviews} for the reviewer → ${r.lesson.status}`);
      for (const [k, d] of Object.entries(q.dimensions)) console.log(`  ${k.padEnd(13)} ${d.status}`);
      console.log(`→ data/knowledge/lessons/${r.lesson.id}/ (preview.html to look at it)`);
    } else if (cmd === "batch") {
      const list = load(new URL("scripts/knowledge/batch.json", ROOT)).requirements;
      for (const { id, type } of list) { const r = await build(id), q = r.lesson.qa; console.log(`${q.result.padEnd(4)} ${String(q.checks).padStart(3)} checks, ${q.fails} failed, ${q.reviews} flagged  ${r.lesson.id}  (${type})`); }
    } else if (cmd === "report") {
      const { productionReport } = await import("./report.mjs"), d = productionReport(a || "aqa-gcse-biology");
      console.log(`${d.statements} statements: ${d.relevant} with relevant knowledge, ${d.complete} complete; ${d.lessons.generated} lessons, ${d.lessons.qaPass} passed QA, ${d.lessons.awaiting} awaiting review, ${d.lessons.approved} approved → docs/knowledge/PRODUCTION-${(a || "aqa-gcse-biology").toUpperCase()}.md`);
    } else if (cmd === "reuse") {
      const { reuseReport } = await import("./report.mjs");
      reuseReport([["Osmosis", "kb-aqa8461-4-1-3-2-a-gcse", "kb-gradify-bio-u02-21-ug"], ["Prokaryotic cells", "kb-aqa8461-4-1-1-1-b-gcse", "kb-gradify-bio-u02-02-ug"], ["Enzymes", "kb-aqa8461-4-2-2-1-e-gcse", "kb-gradify-bio-u03-24-ug"]]);
      console.log("docs/knowledge/REUSE.md");
    } else if (cmd === "gate") {
      const { publishGate } = await import("../../kit/knowledge/schema.js"), { resolve } = await import("../../kit/knowledge/forms.js");
      const l = load(at(`lessons/${a}/lesson.json`)); if (!l) throw new Error(`no lesson ${a}`);
      const items = loadKnowledge(l.subject), p = publishGate({ lesson: l, items: l.knowledge.map((k) => resolve(items.find((x) => x.id === k.id), l.level)).filter(Boolean), sources: loadSources(), evidence: load(at(`${l.subject}/evidence.json`))?.items || {}, attributed: l.attributed || [], stale: impact([l], l.subject)[0]?.why || [] });
      console.log(p.length ? `${a} can't be published:\n  ${p.join("\n  ")}` : `${a} passes the publishing gate. (Placing it in a course is a separate step, not automated.)`);
      if (p.length) process.exit(1);
    } else if (cmd === "confirm-licence") {
      // a person confirms they have checked a source's licence and its category; recorded with their name
      const f = at(`sources/${a}.json`), src = load(f); if (!src) throw new Error(`no source ${a}`);
      if (!arg("--by")) throw new Error("--by \"<your name>\" is required: a licence is confirmed by a person");
      src.licenceConfirmed = { by: arg("--by"), on: new Date().toISOString().slice(0, 10), licence: src.licence, category: src.category };
      save(f, src); console.log(`${a}: ${src.licence} (${src.category}) confirmed by ${arg("--by")}`);
    } else if (cmd === "review") {
      const f = at(`lessons/${a}/lesson.json`), l = load(f); if (!l) throw new Error(`no lesson ${a}`);
      save(f, review(l, { approve: process.argv.includes("--approve"), by: arg("--by"), note: arg("--changes") }));
      console.log(`${a}: ${l.status}${l.status === "approved" ? ` by ${l.review.approvedBy}` : ""}`);
    } else if (cmd === "impact") { const r = impact(allLessons(), a || "biology"); console.log(r.length ? r.map((x) => `${x.lesson} (${x.status}): ${x.why.join("; ")}`).join("\n") : "every lesson is up to date with its knowledge and requirement"); }
    else { console.error("usage: ingest | evidence | check | build <requirement> | review <lesson> | impact (see the top of this file)"); process.exit(2); }
  } catch (e) { console.error(e.message); process.exit(1); }
}
void DIMENSIONS;
