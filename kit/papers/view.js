// Past Papers in a course page (docs/LEARNING-ENVIRONMENT-ROADMAP.md §4): a topic's questions grouped by specification
// point, and each question with its parts answered one try each, like an exam, then marked with the mark scheme, a model
// answer, why the marks are given, common mistakes and the lessons to revise. "Show model answers" lets a student
// study a question without answering it; answers given after that aren't recorded as evidence.
//
// mount(el, { banks, bankId, qid }, ctx)
//   banks   [{ id, title, kind, load: () => import(…) }] from the course's cfg.papers
//   ctx     { base: "#/papers", record(key, attempt), lessonHref(id), lessonTitle(id), results: { get(key), set(key, v) } }
import { esc, inline } from "../core/text.js";
import { renderQuestion, wireQuestions } from "../assess/questions.js";
import { markPart, totalMarks, bankMarks } from "./model.js";

const points = (topic) => topic.groups.flatMap((g) => g.points.map((p) => ({ ...p, group: g })));
const letter = (i) => `(${"abcdefghij"[i]})`;

function honesty(bank) {
  return `<p class="sx-banner" role="note"><b>Gradify's own exam-style questions</b>, written for this specification: they aren't from the exam board's papers, and the marks are Gradify's. Practise with official papers too: <a href="${esc(bank.official.url)}" target="_blank" rel="noopener">${esc(bank.official.label)}</a>.</p>`;
}

export async function mount(el, { banks, bankId, qid }, ctx) {
  const base = ctx.base || "#/papers";
  if (!bankId) {
    // every bank this course has
    const loaded = await Promise.all(banks.map(async (b) => ({ ...b, mod: await b.load() })));
    el.innerHTML = `<div class="co-intro"><span class="co-kicker">Past papers</span><h2>Exam questions, marked like the exam</h2>
      <p>Answer exam-style questions one part at a time. Each answer is marked against a mark scheme, with a model answer, why the marks are given and the mistakes that lose them. Every question is tied to the specification, so your answers count towards your mastery of each point.</p></div>
      <div class="co-grid">${loaded.map((b) => { const bank = b.mod.default, done = bank.questions.filter((q) => ctx.results.get(q.id)).length; return `<a class="co-pcard" href="${base}/${b.id}"><span class="co-kicker">${esc(b.kind || "")}</span><h3>${esc(b.title)}</h3><p>${bank.questions.length} questions · ${bankMarks(bank)} marks</p><small>${done ? `${done} of ${bank.questions.length} answered` : "Not started"}</small></a>`; }).join("")}</div>`;
    return;
  }
  const entry = banks.find((b) => b.id === bankId);
  if (!entry) { el.innerHTML = `<p class="co-empty">That topic isn't here. <a href="${base}">Back to past papers</a></p>`; return; }
  const mod = await entry.load(), bank = mod.default, topic = mod.TOPIC, P = points(topic), home = `${base}/${bankId}`;
  const pointOf = (id) => P.find((p) => p.id === id);

  if (!qid) {
    // the topic: questions grouped by specification point
    const got = bank.questions.map((q) => ctx.results.get(q.id)).filter(Boolean);
    const scored = got.reduce((s, r) => s + r.marks, 0), outOf = got.reduce((s, r) => s + r.of, 0);
    el.innerHTML = `<div class="co-crumbs"><a href="${base}">← Past papers</a></div>
      <div class="co-intro"><span class="co-kicker">${esc(entry.kind || "")}</span><h2>${esc(topic.id)} ${esc(topic.title)}</h2>
      <p>${bank.questions.length} questions, ${bankMarks(bank)} marks.${got.length ? ` You've answered ${got.length} and scored ${scored} of ${outOf} marks.` : ""}</p>
      <p><a class="btn btn-light lg btn-sm" href="${home}/${(bank.questions.find((q) => !ctx.results.get(q.id)) || bank.questions[0]).id}"><span>${got.length ? "Continue" : "Start the first question"}</span></a></p></div>
      ${honesty(bank)}
      ${topic.groups.map((g) => `<section class="pp-group"><h3>${esc(g.id)} ${esc(g.title)}</h3><ul class="pp-list">${g.points.map((pt) => bank.questions.filter((q) => q.points.includes(pt.id)).map((q) => {
        const r = ctx.results.get(q.id);
        return `<li><a href="${home}/${q.id}"><span class="pp-pt">${esc(pt.id)} ${esc(pt.title)}</span><span class="pp-meta">${totalMarks(q)} marks${q.tier === "higher" ? " · Higher" : ""}${q.sep ? ` · <span class="pp-badge">Biology only</span>` : ""}</span><span class="pp-score">${r ? `${r.marks} / ${r.of}` : "Not answered"}</span></a></li>`;
      }).join("")).join("")}</ul></section>`).join("")}`;
    return;
  }

  const qi = bank.questions.findIndex((q) => q.id === qid), q = bank.questions[qi];
  if (!q) { el.innerHTML = `<p class="co-empty">That question isn't here. <a href="${home}">Back to ${esc(topic.title)}</a></p>`; return; }
  const next = bank.questions[qi + 1], pts = q.points.map(pointOf).filter(Boolean);
  const state = { revealed: false, answered: {} };
  const key = (p) => `pp-${q.id}${p.id}`;
  el.innerHTML = `<div class="co-crumbs"><a href="${home}">← ${esc(topic.id)} ${esc(topic.title)}</a><span>Question ${qi + 1} of ${bank.questions.length}</span></div>
    <article class="pp-q" data-one-try>
      <header class="pp-head"><span class="co-kicker">${pts.map((p) => `${esc(p.id)} ${esc(p.title)}`).join(" · ")}${q.sep ? ` · <span class="pp-badge">Biology only</span>` : ""}</span>
        <h2>Question ${qi + 1} <small>${totalMarks(q)} marks</small></h2></header>
      ${q.context ? `<p class="pp-context">${inline(q.context)}</p>` : ""}
      ${q.parts.map((p, i) => `<section class="pp-part" data-part="${esc(p.id)}"><h3><span>${letter(i)}</span><span class="pp-marks">[${p.marks} mark${p.marks === 1 ? "" : "s"}]</span></h3>
        ${renderQuestion(p.Q, key(p), { mode: "practice" })}<div class="pp-out" aria-live="polite"></div><div class="pp-ms" hidden></div></section>`).join("")}
      <div class="pp-foot"><button type="button" class="btn btn-ghost lg btn-sm" data-reveal><span>Show model answers</span></button>
        <p class="pp-total" role="status"></p>
        <a class="btn btn-light lg btn-sm" href="${next ? `${home}/${next.id}` : home}"><span>${next ? "Next question →" : "Back to the topic"}</span></a></div>
    </article>`;

  // the mark scheme, model answer, examiner notes, mistakes and lessons for one part
  const scheme = (p) => `${p.Q.type === "short" && !state.revealed ? "" : `<p><b>Model answer.</b> ${inline(p.model)}</p>`}
    ${p.Q.type === "short" && !state.revealed ? `<p class="pp-note">Mark scheme: the points you ticked against, up to ${p.marks} mark${p.marks === 1 ? "" : "s"}, one for each point made.</p>` : `<div class="pp-scheme"><b>Mark scheme</b><ul>${p.scheme.map((s) => `<li>${inline(s.text)}${s.marks > 1 ? ` (${s.marks} marks)` : ""}</li>`).join("")}</ul>${p.Q.type === "short" ? `<p class="pp-note">Up to ${p.marks} mark${p.marks === 1 ? "" : "s"}: one for each point made.</p>` : ""}</div>`}
    <p><b>Why the marks are given.</b> ${inline(p.examiner)}</p>
    <div class="pp-mistakes"><b>Common mistakes</b><ul>${p.mistakes.map((m) => `<li>${inline(m)}</li>`).join("")}</ul></div>
    <p class="pp-revise"><b>Revise this concept:</b> ${p.lessons.map((l) => `<a href="${ctx.lessonHref(l)}">${esc(ctx.lessonTitle(l) || l)}</a>`).join(" · ")}</p>`;
  const showScheme = (sec, p) => { const ms = sec.querySelector(".pp-ms"); if (ms.hidden) { ms.innerHTML = scheme(p); ms.hidden = false; } };

  const total = () => {
    const done = q.parts.filter((p) => state.answered[p.id]);
    if (done.length < q.parts.length) return;
    const marks = done.reduce((s, p) => s + state.answered[p.id].marks, 0), of = totalMarks(q), self = done.some((p) => state.answered[p.id].self);
    el.querySelector(".pp-total").textContent = `${marks} of ${of} marks${self ? " (some self-assessed)" : ""}.`;
    if (!state.revealed) ctx.results.set(q.id, { marks, of, self, at: Date.now() });
  };

  wireQuestions(el, (k) => q.parts.find((p) => key(p) === k)?.Q, (Q, res, first, box, meta) => {
    const p = q.parts.find((x) => key(x) === box.dataset.key), sec = box.closest(".pp-part");
    if (!p || state.answered[p.id]) return;
    const r = markPart(p, meta.response);
    state.answered[p.id] = r;
    // one try, as in the exam: the part is closed once answered
    box.querySelectorAll("button, input, select, textarea").forEach((x) => { x.disabled = true; });
    sec.querySelector(".pp-out").innerHTML = `<p class="pp-got ${r.correct ? "ok" : r.marks ? "part" : "no"}"><b>${r.self ? `You gave yourself ${r.marks} of ${r.of}` : `${r.marks} of ${r.of}`} mark${r.of === 1 ? "" : "s"}.</b>${r.self ? " Self-assessed against the mark scheme: it's your judgement, so it counts as provisional evidence." : ""}${state.revealed ? " Not recorded: you'd seen the model answers." : ""}</p>`;
    showScheme(sec, p);
    if (!state.revealed) ctx.record(`${q.id}${p.id}`, { type: p.Q.type, d: q.tier === "higher" ? 3 : 2, score: r.score, response: meta.response, lesson: p.lessons[0], method: r.self ? "self" : "auto", status: r.self ? "provisional" : "final" });
    total();
  });

  el.querySelector("[data-reveal]").addEventListener("click", (e) => {
    state.revealed = true; e.currentTarget.disabled = true;
    el.querySelectorAll(".pp-part").forEach((sec) => showScheme(sec, q.parts.find((p) => p.id === sec.dataset.part)));
    el.querySelector(".pp-total").textContent = "Model answers shown: answers you give now are marked but not recorded.";
    el.querySelector(".pp-ms")?.closest(".pp-part")?.querySelector(".pp-ms b")?.setAttribute("tabindex", "-1");
  });
}
