// Past Papers in a course (#/papers): Gradify's own exam-style questions by specification point, each with a mark
// scheme, a model answer, why each mark is earned, common mistakes and the lessons that teach it
// (docs/PAST-PAPERS.md, kit/papers/format.js).
//
//   #/papers                  the bank: topics, groups and questions, with the learner's best score on each
//   #/papers/q/<id>           one question (interactive model answer): answer, mark, then see the mark scheme
//   #/papers/practice/<topic> mini practice: three to six questions, marked together at the end
//
// Choice, short and number answers are marked automatically. Extended answers, and the method marks of a wrong
// calculation, are ticked by the learner against the mark scheme: self-assessed, provisional, and labelled that way.
// Every marked part is recorded as an attempt against its lesson, so progress and Specification Mastery see it.
import { markPart, lessonsFor, practiceSet } from "./format.js";

const here = new URL(".", import.meta.url);
let cssLoaded = null;
const loadCss = () => cssLoaded || (cssLoaded = new Promise((res) => {
  const l = document.createElement("link"); l.rel = "stylesheet"; l.href = new URL("../styles/papers.css", here).href;
  l.onload = l.onerror = () => res(); document.head.append(l);
}));

const LETTER = (i) => String.fromCharCode(97 + i);
const TYPE = { choice: "sba", short: "short", number: "num", extended: "short" };
const PRACTICE_N = 5;

/**
 * ctx: { bank, esc, inline, lessonTitle(id), attempts: () => [attempt], record(part, q, lessonId, result, response),
 *        go(hash) }
 */
export async function viewPapers(main, ctx, arg, sec, how) {
  await loadCss();
  const { bank } = ctx;
  if (arg === "q") return questionPage(main, ctx, bank.questions.find((q) => q.id === sec));
  if (arg === "practice") return practicePage(main, ctx, sec || bank.topics[0].id, Number(how) || Date.now() % 100000);
  return indexPage(main, ctx);
}

// the learner's best score on a question, from their attempts here: { marks, of } or null
function bestOf(ctx, q) {
  const mine = ctx.attempts().filter((a) => a.context === "papers" && a.contextId === q.id);
  if (!mine.length) return null;
  // each marking of the question records its parts together, in order: a part seen again starts the next marking
  const sittings = []; let cur = null;
  for (const a of mine) { if (!cur || cur[a.question.id]) sittings.push(cur = {}); cur[a.question.id] = a; }
  let best = null;
  for (const s of sittings) {
    const marks = q.parts.reduce((t, p) => t + (s[partKey(q, p)] ? Math.round(s[partKey(q, p)].score * p.marks) : 0), 0);
    if (!best || marks > best.marks) best = { marks, of: q.marks };
  }
  return best;
}
const partKey = (q, p) => `papers:${q.id}.${p.id}`;
const pointTitle = (bank, id) => bank.points[id]?.title || id;

// the specification points the learner is losing marks on, weakest first (for "Practise your weakest")
function weakPoints(ctx) {
  const bank = ctx.bank, by = new Map();
  for (const a of ctx.attempts()) {
    if (a.context !== "papers") continue;
    const q = bank.questions.find((x) => x.id === a.contextId); if (!q) continue;
    for (const id of q.points) { const v = by.get(id) || { n: 0, s: 0 }; v.n++; v.s += a.score; by.set(id, v); }
  }
  return [...by.entries()].map(([id, v]) => ({ id, mean: v.s / v.n })).filter((x) => x.mean < 0.7).sort((a, b) => a.mean - b.mean).map((x) => x.id);
}

function introHtml(ctx) {
  const { bank, esc } = ctx;
  return `<div class="co-intro pp-intro"><span class="co-kicker">Past papers</span><h2>${esc(bank.spec.title)}: exam-style questions</h2>
    <p>Practise answering the way the exam marks you: every question has a mark scheme, a model answer, why each mark is earned and the mistakes that lose marks. Each part links to the lesson that teaches it.</p>
    <p class="pp-own"><b>These are Gradify's own questions</b>, written in the style of ${esc(bank.spec.board)}'s papers; none is copied from a real paper. For ${esc(bank.spec.board)}'s own past papers and mark schemes, <a href="${esc(bank.spec.papersUrl)}" target="_blank" rel="noopener">see ${esc(bank.spec.board)}'s website<span class="sr-only"> (opens in a new tab)</span> ↗</a>.</p></div>`;
}

function indexPage(main, ctx) {
  const { bank, esc } = ctx, weak = weakPoints(ctx);
  main.innerHTML = `${introHtml(ctx)}
    ${bank.topics.map((t) => {
      const qs = bank.questions.filter((q) => q.topic === t.id), marks = qs.reduce((s, q) => s + q.marks, 0);
      return `<section class="co-panel pp-topic" aria-labelledby="pp-t-${esc(t.id)}">
        <div class="pp-thead"><div><span class="pp-num">${esc(t.id)}</span><h3 id="pp-t-${esc(t.id)}">${esc(t.title)}</h3><p>${qs.length} questions · ${marks} marks</p></div>
          <div class="pp-acts"><a class="btn btn-sm" href="#/papers/practice/${esc(t.id)}"><span>Mini practice: ${PRACTICE_N} questions</span></a>
          ${weak.some((id) => id.startsWith(`${t.id}.`)) ? `<a class="btn btn-ghost btn-sm" href="#/papers/practice/${esc(t.id)}/weak"><span>Practise your weakest</span></a>` : ""}</div></div>
        ${t.groups.map((g) => `<h4 class="pp-group"><span class="pp-num">${esc(g.id)}</span> ${esc(g.title)}</h4>
          <ol class="pp-list">${qs.filter((q) => q.group === g.id).map((q) => {
            const best = bestOf(ctx, q);
            return `<li><a href="#/papers/q/${esc(q.id)}"><span class="pp-qt">${q.points.map((id) => `<span class="pp-num">${esc(id)}</span> ${esc(pointTitle(bank, id))}`).join(", ")}</span>
              <span class="pp-meta">${q.marks} marks${best ? ` · <b>best ${best.marks}/${best.of}</b>` : ""}</span></a></li>`;
          }).join("")}</ol>`).join("")}
      </section>`;
    }).join("")}`;
}

// ---------- one question's parts, its answer areas and its mark scheme ----------
function partInput(ctx, q, p, i, name) {
  const { esc, inline } = ctx, id = `${name}-${p.id}`;
  if (p.input === "choice") return `<div class="pp-opts" role="group" aria-labelledby="${id}-q">${p.options.map((o) => `<button type="button" class="pp-opt" data-opt="${esc(o.text)}" aria-pressed="false">${inline(o.text)}</button>`).join("")}</div>`;
  if (p.input === "short") return `<label class="sr-only" for="${id}-in">Your answer</label><input id="${id}-in" class="pp-in" type="text" autocomplete="off" spellcheck="true" data-text>`;
  if (p.input === "number") return `<div class="pp-numrow"><label class="sr-only" for="${id}-in">Your answer${p.unit ? ` (${esc(p.unit)})` : ""}</label><input id="${id}-in" class="pp-in pp-num-in" type="text" inputmode="decimal" autocomplete="off" data-text>${p.unit ? `<span class="pp-unit">${esc(p.unit)}</span>` : ""}</div>`;
  return `<label class="sr-only" for="${id}-in">Your answer</label><textarea id="${id}-in" class="pp-in" rows="${Math.min(8, 2 + p.marks)}" data-text placeholder="Write your answer as you would in the exam."></textarea>`;
}

function questionHtml(ctx, q, n, name, { practice = false } = {}) {
  const { bank, esc, inline } = ctx;
  return `<article class="co-panel pp-q" data-q="${esc(q.id)}" aria-labelledby="${name}-h">
    <header class="pp-qhead"><h3 id="${name}-h">${practice ? `Question ${n}` : "Question"} <small>${q.marks} marks</small></h3>
      <p class="pp-pts">${q.points.map((id) => `<span class="pp-pt"><span class="pp-num">${esc(id)}</span> ${esc(pointTitle(bank, id))}</span>`).join("")}</p></header>
    ${q.context ? `<p class="pp-context">${inline(q.context)}</p>` : ""}
    ${q.parts.map((p, i) => `<div class="pp-part" data-p="${esc(p.id)}">
      <p class="pp-prompt" id="${name}-${p.id}-q"><b>(${LETTER(i)})</b> ${inline(p.prompt)} <span class="pp-marks">[${p.marks} mark${p.marks > 1 ? "s" : ""}]</span></p>
      ${partInput(ctx, q, p, i, name)}
      <div class="pp-result" role="status" aria-live="polite"></div>
      <div class="pp-scheme" hidden></div></div>`).join("")}
  </article>`;
}

// the mark scheme for a part, after marking: what earned the marks, the model answer, why, mistakes and lessons.
// For a self-assessed part it carries the tick boxes.
function schemeHtml(ctx, q, p, res, name) {
  const { bank, esc, inline, lessonTitle } = ctx;
  const ticks = p.input === "extended" ? p.points : p.input === "number" && res && !res.final && res.marks < res.of ? p.method : p.input === "number" && res && res.marks === 0 && p.method?.length ? p.method : null;
  const tickList = ticks?.length ? `<fieldset class="pp-ticks"><legend>${p.input === "extended" ? `Tick each point your answer made (up to ${p.marks} mark${p.marks > 1 ? "s" : ""}):` : `Your answer isn't right, but working can still earn marks. Tick what your working showed (up to ${p.marks - 1}):`}</legend>
      ${ticks.map((m) => `<label><input type="checkbox" data-tick="${esc(m.id)}"${res?.got?.includes(m.id) ? " checked" : ""}> <span>${inline(m.text)}</span></label>`).join("")}</fieldset>` : "";
  const lessons = lessonsFor(bank, q, p);
  return `<div class="pp-sch">
      ${tickList}
      <h4>Model answer</h4><p>${inline(p.model)}</p>
      <h4>How the marks are earned</h4><p>${inline(p.why)}</p>
      ${p.input === "choice" ? (() => { const wrong = p.options.filter((o) => !o.correct && o.why); return wrong.length ? `<ul class="pp-why">${wrong.map((o) => `<li><b>Not “${inline(o.text)}”:</b> ${inline(o.why)}</li>`).join("")}</ul>` : ""; })() : ""}
      <h4>Common mistakes</h4><ul class="pp-mistakes">${p.mistakes.map((m) => `<li>${inline(m)}</li>`).join("")}</ul>
      <p class="pp-revise"><span>Revise this concept:</span> ${lessons.map((l) => `<a href="#/lesson/${esc(l)}">${esc(lessonTitle(l))}</a>`).join(" · ")}</p></div>`;
}

// what the learner entered for each part of a question
function responsesOf(box) {
  const out = {};
  box.querySelectorAll(".pp-part").forEach((el) => {
    const pressed = el.querySelector(".pp-opt[aria-pressed=true]");
    out[el.dataset.p] = { text: pressed ? pressed.dataset.opt : el.querySelector("[data-text]")?.value || "", ticked: [...el.querySelectorAll("[data-tick]:checked")].map((x) => x.dataset.tick) };
  });
  return out;
}

function wireInputs(box) {
  box.querySelectorAll(".pp-opts").forEach((g) => g.addEventListener("click", (e) => {
    const b = e.target.closest(".pp-opt"); if (!b || g.closest(".pp-q")?.classList.contains("marked")) return;
    g.querySelectorAll(".pp-opt").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  }));
}

// mark a question in place: results, mark schemes and tick boxes; returns a function that reads the final marks
function markInPlace(ctx, box, q, name, totalEl = null) {
  box.classList.add("marked");
  box.querySelectorAll("input[data-text], textarea[data-text]").forEach((x) => { x.readOnly = true; });
  const resp = responsesOf(box);
  const paint = () => {
    const now = responsesOf(box);
    let total = 0, provisional = false;
    const parts = q.parts.map((p) => {
      const r = markPart(p, now[p.id]); total += r.marks; provisional ||= !r.final;
      const el = box.querySelector(`.pp-part[data-p="${CSS.escape(p.id)}"] .pp-result`);
      el.className = `pp-result ${r.marks === r.of ? "ok" : r.marks ? "part" : "no"}`;
      el.textContent = `${r.marks}/${r.of} ${r.of === 1 ? "mark" : "marks"}${r.final ? "" : " (self-assessed)"}${p.input === "choice" || p.input === "short" ? `: ${r.marks ? "correct" : "not correct"}` : p.input === "number" && r.auto ? `: ${r.marks ? "correct" : "not the right answer"}` : ""}`;
      return { p, r, response: now[p.id] };
    });
    const sum = totalEl;
    if (sum) sum.innerHTML = `<b>${total}/${q.marks}</b> marks${provisional ? ` <span class="pp-prov">includes self-assessed marks</span>` : ""}`;
    return { parts, total, provisional };
  };
  for (const p of q.parts) {
    const r = markPart(p, resp[p.id]);
    const sch = box.querySelector(`.pp-part[data-p="${CSS.escape(p.id)}"] .pp-scheme`);
    sch.innerHTML = schemeHtml(ctx, q, p, r, name); sch.hidden = false;
    // a choice: show the right option and the learner's pick
    box.querySelectorAll(`.pp-part[data-p="${CSS.escape(p.id)}"] .pp-opt`).forEach((b) => { b.disabled = true; const o = p.options.find((x) => x.text === b.dataset.opt); if (o?.correct) b.classList.add("right"); else if (b.getAttribute("aria-pressed") === "true") b.classList.add("wrong"); });
  }
  box.addEventListener("change", (e) => { if (e.target.matches("[data-tick]")) paint(); });
  paint();
  return paint;
}

// record each part of a marked question as an attempt (once per marking)
function recordQuestion(ctx, q, marked, sitting) {
  for (const { p, r, response } of marked.parts) {
    const lesson = lessonsFor(ctx.bank, q, p)[0];
    ctx.record({ key: partKey(q, p), Q: { type: TYPE[p.input], d: 2, objectives: [] } }, q, lesson, { score: r.of ? r.marks / r.of : 0, correct: r.marks === r.of, method: r.final ? "auto" : "self", status: r.final ? "final" : "provisional" }, { response, sitting });
  }
}

function questionPage(main, ctx, q) {
  const { bank, esc } = ctx;
  if (!q) { ctx.go("#/papers"); return; }
  const i = bank.questions.indexOf(q), prev = bank.questions[i - 1], next = bank.questions[i + 1], name = "ppq";
  main.innerHTML = `<nav class="pp-crumbs" aria-label="Past papers"><a href="#/papers">Past papers</a> › <span>${esc(bank.topics.find((t) => t.id === q.topic)?.title || q.topic)}</span></nav>
    ${questionHtml(ctx, q, 1, name)}
    <div class="pp-bar"><span class="pp-total" aria-live="polite"></span>
      <button type="button" class="btn" data-mark><span>Mark my answer</span></button>
      <button type="button" class="btn btn-ghost" data-show><span>Just show the mark scheme</span></button>
      <button type="button" class="btn" data-save hidden><span>Save my marks</span></button></div>
    <nav class="pp-pager" aria-label="Questions">${prev ? `<a class="btn btn-ghost btn-sm" href="#/papers/q/${esc(prev.id)}"><span>← Previous question</span></a>` : "<span></span>"}${next ? `<a class="btn btn-ghost btn-sm" href="#/papers/q/${esc(next.id)}"><span>Next question →</span></a>` : `<a class="btn btn-ghost btn-sm" href="#/papers"><span>All questions</span></a>`}</nav>`;
  const box = main.querySelector(".pp-q"); wireInputs(box);
  const bar = main.querySelector(".pp-bar");
  let read = null;
  bar.querySelector("[data-mark]").addEventListener("click", () => {
    read = markInPlace(ctx, box, q, name, bar.querySelector(".pp-total"));
    bar.querySelector("[data-mark]").hidden = true; bar.querySelector("[data-show]").hidden = true;
    const needsTicks = q.parts.some((p) => p.input === "extended" || (p.input === "number" && markPart(p, responsesOf(box)[p.id]).marks < p.marks && p.method?.length));
    if (needsTicks) bar.querySelector("[data-save]").hidden = false;
    else { recordQuestion(ctx, q, read(), Date.now()); bar.querySelector(".pp-total").insertAdjacentHTML("beforeend", ` <span class="pp-saved">Saved to your progress.</span>`); }
    box.querySelector(".pp-scheme:not([hidden]) input, .pp-result")?.focus?.();
  });
  bar.querySelector("[data-save]").addEventListener("click", (e) => {
    recordQuestion(ctx, q, read(), Date.now());
    e.currentTarget.hidden = true; box.querySelectorAll("[data-tick]").forEach((x) => { x.disabled = true; });
    bar.querySelector(".pp-total").insertAdjacentHTML("beforeend", ` <span class="pp-saved">Saved to your progress.</span>`);
  });
  // see the mark scheme without answering: nothing is marked or recorded
  bar.querySelector("[data-show]").addEventListener("click", () => {
    for (const p of q.parts) { const sch = box.querySelector(`.pp-part[data-p="${CSS.escape(p.id)}"] .pp-scheme`); sch.innerHTML = schemeHtml(ctx, q, { ...p, points: p.input === "extended" ? [] : p.points, method: [] }, null, name); sch.hidden = false; }
    bar.querySelector("[data-show]").hidden = true;
    bar.querySelector(".pp-total").textContent = "Answer it first next time: trying before reading the answer is what makes it stick.";
  });
}

function practicePage(main, ctx, topic, seed) {
  const { bank, esc } = ctx;
  const t = bank.topics.find((x) => x.id === topic) || bank.topics[0], weak = String(seed) === "weak" || location.hash.endsWith("/weak");
  const qs = practiceSet(bank, { topic: t.id, n: PRACTICE_N, seed: weak ? 1 : seed, prefer: weakPoints(ctx) });
  const marks = qs.reduce((s, q) => s + q.marks, 0);
  main.innerHTML = `<nav class="pp-crumbs" aria-label="Past papers"><a href="#/papers">Past papers</a> › <span>Mini practice</span></nav>
    <div class="co-intro"><span class="co-kicker">Mini practice</span><h2>${esc(t.title)}: ${qs.length} questions</h2><p>${marks} marks, about ${Math.round(marks * 1.2)} minutes at exam pace (roughly a mark a minute, plus reading). Answer everything, then mark it all at the end.${weak ? " Questions on the points you've been losing marks on come first." : ""}</p></div>
    ${qs.map((q, i) => questionHtml(ctx, q, i + 1, `pp${i}`, { practice: true })).join("")}
    <div class="pp-bar"><button type="button" class="btn" data-mark><span>Mark my answers</span></button></div>
    <div class="pp-summary" hidden></div>`;
  const boxes = [...main.querySelectorAll(".pp-q")]; boxes.forEach(wireInputs);
  const bar = main.querySelector(".pp-bar"), summary = main.querySelector(".pp-summary");
  bar.querySelector("[data-mark]").addEventListener("click", () => {
    const reads = boxes.map((b, i) => markInPlace(ctx, b, qs[i], `pp${i}`));
    bar.innerHTML = `<p class="pp-note">Tick the mark-scheme points your extended answers made, then finish.</p><button type="button" class="btn" data-finish><span>Finish and see my results</span></button>`;
    bar.querySelector("[data-finish]").addEventListener("click", () => {
      const sitting = Date.now(), results = reads.map((r, i) => { const m = r(); recordQuestion(ctx, qs[i], m, sitting); return { q: qs[i], ...m }; });
      boxes.forEach((b) => b.querySelectorAll("[data-tick]").forEach((x) => { x.disabled = true; }));
      const total = results.reduce((s, r) => s + r.total, 0), provisional = results.some((r) => r.provisional);
      // the lessons behind the marks lost, most marks lost first
      const lost = new Map();
      for (const r of results) for (const { p, r: pr } of r.parts) if (pr.marks < pr.of) for (const l of lessonsFor(bank, r.q, p).slice(0, 1)) lost.set(l, (lost.get(l) || 0) + pr.of - pr.marks);
      const revise = [...lost.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
      bar.hidden = true; summary.hidden = false;
      summary.innerHTML = `<section class="co-panel pp-res" aria-labelledby="pp-res-h"><h3 id="pp-res-h">Your result: ${total}/${marks} marks (${Math.round((total / marks) * 100)}%)</h3>
        ${provisional ? `<p class="pp-prov">Includes marks you gave yourself against the mark scheme: they're provisional, and an examiner might mark differently.</p>` : ""}
        <ol class="pp-rlist">${results.map((r, i) => `<li><a href="#pp${i}-h">Question ${i + 1}</a>: ${r.total}/${r.q.marks} <span class="pp-meta">${r.q.points.map((id) => esc(pointTitle(bank, id))).join(", ")}</span></li>`).join("")}</ol>
        ${revise.length ? `<h4>Revise these next</h4><ul class="pp-revlist">${revise.map(([l, n]) => `<li><a href="#/lesson/${esc(l)}">${esc(ctx.lessonTitle(l))}</a> <span class="pp-meta">${n} mark${n > 1 ? "s" : ""} lost</span></li>`).join("")}</ul>` : `<p>Full marks: well done.</p>`}
        <p class="pp-acts"><a class="btn btn-sm" href="#/papers/practice/${esc(t.id)}/${(seed % 99991) + 7}"><span>Another set</span></a> <a class="btn btn-ghost btn-sm" href="#/papers"><span>All questions</span></a></p></section>`;
      summary.querySelector("h3").setAttribute("tabindex", "-1"); summary.querySelector("h3").focus();
    });
  });
}
