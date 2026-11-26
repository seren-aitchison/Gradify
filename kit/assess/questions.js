// Gradify assessment library: rendering, interaction and marking for every question type, for any
// Gradify site. Built from model.js (the data model and text format) and types.js (one handler per
// type). Attempts are recorded in the shared format in attempts.js.
//
// renderQuestion(Q, key, { mode, levels, confidence }) → html
//   key    a stable string for this question on this page (the question id where it has one)
//   mode   "practice" (feedback straight away) or "exam" (answers stored, feedback at the end)
//   levels names for difficulty 1–3 (for example ["Foundation", "Application", "Clinical reasoning"])
//   confidence  true to offer an optional "how sure are you?" rating before answering
// wireQuestions(el, lookup, onAnswer) wires every rendered question inside el; onAnswer(Q, result,
//   firstTry, box, meta) with meta = { response, confidence, ms, attempt }.
import { esc, inline } from "../core/text.js";
import { parseQuestion, normalize } from "./model.js";
import { handlerFor, LABELS, TYPES as HANDLERS } from "./types.js";
import { TAGS, rebuildTags } from "./model.js";

export { parseQuestion, normalize };
export const TYPES = Object.fromEntries(Object.entries(LABELS).map(([k, label]) => [k, { label, auto: k !== "short" }]));

/**
 * Add a question type from a subject adapter (kit/subjects/). The type then works everywhere questions do: notes
 * lines with its tag are parsed into lessons, and quizzes, exams, the problem bank and attempts render and mark it.
 *   registerQuestionType({ tag: "OUT", type: "output", label: "Predict the output", handler: { parse, render, wire, mark, feedback, paint, answer, restore } })
 * Registering the same type again with the same handler is a no-op; a clash with another type is an error.
 */
const REGISTERED = new Map();
export function registerQuestionType({ tag, type, label, handler, auto = true }) {
  if (!/^[A-Z]{2,8}$/.test(tag || "")) throw new Error(`question tag "${tag}" should be 2–8 capital letters`);
  if (!/^[a-z][a-z0-9-]*$/.test(type || "") || !label) throw new Error("a question type needs a lower-case type name and a label");
  for (const f of ["parse", "render", "wire", "mark", "feedback", "paint", "answer", "restore"]) if (typeof handler?.[f] !== "function") throw new Error(`question type ${type} needs handler.${f}()`);
  if (REGISTERED.get(type) === handler && TAGS[tag] === type) return;
  if (TYPES[type] || HANDLERS[type] || TAGS[tag]) throw new Error(`question type ${type} or tag ${tag} is already registered`);
  REGISTERED.set(type, handler); HANDLERS[type] = { label, auto, ...handler }; LABELS[type] = label; TYPES[type] = { label, auto };
  TAGS[tag] = type; rebuildTags();
}
const DEFAULT_LEVELS = ["Easy", "Medium", "Hard"];

export function renderQuestion(Q, key, { mode = "practice", levels = DEFAULT_LEVELS, confidence = false } = {}) {
  Q = normalize(Q);
  const h = handlerFor(Q), qid = `aq-${String(key).replace(/[^a-zA-Z0-9-]/g, "-")}`;
  const conf = confidence && mode === "practice" ? `<fieldset class="aq-conf"><legend>How sure are you? <small>(optional)</small></legend>${["Guessing", "Unsure", "Sure"].map((c, i) => `<label><input type="radio" name="${qid}-conf" value="${i + 1}"><span>${c}</span></label>`).join("")}</fieldset>` : "";
  return `<div class="aq aq-type-${Q.type}" data-key="${esc(key)}" data-mode="${mode}" role="group" aria-labelledby="${qid}-stem">
    <p class="aq-q" id="${qid}-stem">${inline(Q.q)}<small>${LABELS[Q.type]} · ${esc(levels[Q.d - 1] || "")}</small></p>
    ${conf}${h.render(Q, { key: String(key), mode })}
    <div class="aq-result" role="status" aria-live="polite"></div>
    <div class="aq-why" hidden>${Q.why ? `<p>${inline(Q.why)}</p>` : ""}<div class="aq-detail"></div></div></div>`;
}

export function markQuestion(Q, response) { Q = normalize(Q); return { status: "final", method: "auto", ...handlerFor(Q).mark(Q, response) }; }
export const answerText = (Q) => handlerFor(normalize(Q)).answer(normalize(Q));

/**
 * What a practice answer leads to, for every course (pure; tests/feedback.test.mjs):
 *   "correct" | "self"   right, or self-assessed: the explanation shows
 *   "retry"              wrong on the first try where a second is worth having: why that answer isn't right and a
 *                        hint, never the right answer, and "Show the answer" for whoever would rather see it
 *   "reveal"             wrong again (or a one-try quiz, or a question with only two options): the answer and why
 */
export function feedbackStage({ correct = false, self = false, attempt = 1, oneTry = false, canRetry = true } = {}) {
  if (self) return "self";
  if (correct) return "correct";
  if (oneTry || !canRetry || attempt >= 2) return "reveal";
  return "retry";
}
// a second try means something only with something left to choose between
export const canRetry = (Q, h) => Boolean(h.hint) && !(Q.options && Q.options.length < 3);

export function wireQuestions(el, lookup, onAnswer) {
  el.querySelectorAll(".aq").forEach((box) => {
    if (box.dataset.wired) return; box.dataset.wired = "1";
    const Q = normalize(lookup(box.dataset.key)); if (!Q) return;
    const h = handlerFor(Q), exam = box.dataset.mode === "exam", shown = Date.now(), oneTry = Boolean(box.closest("[data-one-try]"));
    let attempt = 0, solved = false, revealed = false;
    const confidence = () => Number(box.querySelector(".aq-conf input:checked")?.value) || null;
    const out = box.querySelector(".aq-result"), why = box.querySelector(".aq-why");
    // practice questions that can be marked: "Show the answer" is there from the start, so nobody is made to guess
    const practice = !exam && !oneTry && h.auto !== false && Q.type !== "short";
    const tools = document.createElement("div"); tools.className = "aq-tools";
    if (practice) { tools.innerHTML = `<div class="aq-try" hidden></div><button type="button" class="aq-show">Show the answer</button>`; out.after(tools); }
    const lock = () => box.querySelectorAll(".aq-opts button, .aq-checks input, .aq-steps button, .aq-match select, .aq-num input, .aq-submit").forEach((x) => { x.disabled = true; });
    // the answer and why: after a second wrong try, or when asked for. Nothing more is marked once it's shown.
    function reveal(res, response, asked) {
      revealed = true; box.classList.add("revealed");
      if (response !== undefined || Q.options) h.paint(box, Q, response ?? null, res || { correct: false, score: 0 }, { reveal: true });
      box.querySelector(".aq-detail").innerHTML = h.feedback(Q, response ?? null, res || { correct: false, score: 0 }, { reveal: true });
      why.hidden = false;
      tools.remove(); lock();
      out.textContent = asked ? (attempt ? "Here's the answer, and why." : "Here's the answer, and why. Try a similar question later to check it's stuck.") : "Not quite again. Here's the answer, and why.";
      out.className = "aq-result no";
      box.dispatchEvent(new CustomEvent("aq-reveal", { bubbles: true, detail: { key: box.dataset.key, attempts: attempt, asked } }));
    }
    tools.querySelector(".aq-show")?.addEventListener("click", () => { reveal(box.lastResult || null, box.response, true); why.setAttribute("tabindex", "-1"); why.focus({ preventScroll: true }); });
    h.wire(box, Q, (response, { silent } = {}) => {
      box.response = response;
      if (exam) { onAnswer?.(Q, markQuestion(Q, response), attempt === 0, box, { response, confidence: confidence(), ms: Date.now() - shown, attempt: ++attempt }); return; }
      if (silent || solved || revealed) return;
      attempt++;
      const res = markQuestion(Q, response);
      box.lastResult = res;
      const stage = feedbackStage({ correct: res.correct, self: res.self, attempt, oneTry: oneTry || !practice, canRetry: canRetry(Q, h) });
      if (stage === "retry") {
        // why that answer isn't right, and a hint; the right answer stays hidden
        h.paint(box, Q, response, res, { reveal: false });
        const notIt = h.feedback(Q, response, res, { reveal: false }), hint = h.hint?.(Q, response, res);
        if (hint?.rule) for (const v of hint.rule) box.querySelectorAll(".aq-opts button").forEach((b) => { if (b.dataset.v === v) { b.disabled = true; b.classList.add("ruled"); b.setAttribute("aria-label", `${b.textContent.trim()} (ruled out)`); } });
        const t = tools.querySelector(".aq-try");
        t.innerHTML = `${notIt}${hint?.text ? `<p class="aq-hint2"><b>Hint:</b> ${inline(hint.text)}</p>` : ""}`;
        t.hidden = !t.innerHTML;
        out.textContent = `Not quite${res.detail ? `: ${res.detail}` : ""}. Have another go.`;
        out.className = "aq-result no";
        why.hidden = true;
      } else if (stage === "reveal" && practice) {
        reveal(res, response, false);
      } else {
        // right, self-assessed, or a one-try quiz: the result and the explanation
        out.textContent = res.self ? `Self-assessed: ${Math.round(res.score * 100)}% of the marking points (provisional).` : res.correct ? (attempt > 1 ? "Correct, on the second try." : "Correct.") : `Not quite${res.detail ? `: ${res.detail}` : ""}. Here's why.`;
        out.className = `aq-result ${res.self ? "" : res.correct ? "ok" : "no"}`;
        h.paint(box, Q, response, res, { reveal: true });
        box.querySelector(".aq-detail").innerHTML = h.feedback(Q, response, res, { reveal: true });
        why.hidden = false;
        tools.remove();
        if (res.correct || res.self) { solved = true; box.classList.add("solved"); lock(); }
      }
      // every try is recorded as it happened: which try it was, and whether a hint had been given
      onAnswer?.(Q, res, attempt === 1, box, { response, confidence: confidence(), ms: Date.now() - shown, attempt, assist: attempt > 1 ? "hint" : null });
    }, { mode: box.dataset.mode });
  });
}

// show a stored response again (exam navigation)
export function restoreResponse(box, Q, response) { Q = normalize(Q); if (response !== undefined) handlerFor(Q).restore(box, Q, response); }
