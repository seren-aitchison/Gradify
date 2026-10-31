// Gradify assessment questions: one subject-neutral question model with parsing, rendering, interaction
// and marking, for any Gradify site (courses, mock exams, the study app). No framework; plain HTML.
//
// Text format (one line each, inside course notes or any other text source):
//   M1:   question | right | wrong | wrong | wrong | … | why            single best answer / multiple choice
//   MS2:  question | right ; right | wrong ; wrong ; wrong | why        multi-select: choose all that apply
//   SEQ2: question | first ; second ; third ; fourth | why               put the steps in order
//   MATCH2: question | item = match ; item = match ; item = match | why  match each item to its partner
//   SA3:  question | model answer | marking point ; marking point ; …  short answer, self-assessed
// The digit is difficulty: 1 easy, 2 medium, 3 hard (default 2). "why" explains the answer and is shown
// after any attempt. Short answers can't be machine-marked here: learners compare their answer with
// the model and tick the points they covered (a future AI-marking mode can replace the self-check).
import { inline, esc } from "../core/text.js";

export const TYPES = {
  sba: { label: "Single best answer", auto: true },
  mcq: { label: "Multiple choice", auto: true },
  multi: { label: "Choose all that apply", auto: true },
  order: { label: "Put in order", auto: true },
  match: { label: "Match the pairs", auto: true },
  short: { label: "Short answer", auto: false },
};

const split = (s, sep = " | ") => s.split(sep).map((x) => x.trim()).filter(Boolean);
const list = (s) => split(s, ";");

// parse one tagged line; returns a question object or null
export function parseQuestion(tag, body) {
  const m = tag.match(/^(M|MS|SEQ|MATCH|SA)([123]?)$/); if (!m) return null;
  const d = Number(m[2] || 2), parts = split(body);
  if (m[1] === "M") {
    const [q, right, ...rest] = parts;
    const why = rest.length > 3 ? rest.pop() : "";
    if (!q || !right || !rest.length) return null;
    return { type: rest.length >= 4 ? "sba" : "mcq", q, right, wrong: rest, why, d };
  }
  if (m[1] === "MS") { const [q, r, w, why = ""] = parts; if (!q || !r || !w) return null; return { type: "multi", q, right: list(r), wrong: list(w), why, d }; }
  if (m[1] === "SEQ") { const [q, s, why = ""] = parts; const steps = s ? list(s) : []; if (!q || steps.length < 3) return null; return { type: "order", q, steps, why, d }; }
  if (m[1] === "MATCH") {
    const [q, s, why = ""] = parts; const pairs = s ? list(s).map((p) => p.split(" = ").map((x) => x.trim())).filter((p) => p.length === 2) : [];
    if (!q || pairs.length < 3) return null; return { type: "match", q, pairs, why, d };
  }
  const [q, model, pts = ""] = parts; if (!q || !model) return null;
  return { type: "short", q, model, points: list(pts), why: "", d };
}

// deterministic shuffle so an option order is stable for a given question id
const seeded = (id) => { let s = [...String(id)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7); return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); };
const shuffle = (a, r) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const DIFF = ["", "Easy", "Medium", "Hard"];

// render a question; `id` keeps option order stable; `mode` "practice" shows feedback immediately,
// "exam" records the answer without feedback until the end
export function renderQuestion(Q, id, { mode = "practice" } = {}) {
  const r = seeded(id), head = `<p class="aq-q">${inline(Q.q)}<small>${TYPES[Q.type].label} · ${DIFF[Q.d]}</small></p>`;
  const why = Q.why ? `<p class="aq-why" hidden>${inline(Q.why)}</p>` : "";
  const wrap = (body, extra = "") => `<div class="aq aq-${Q.type}" data-id="${esc(id)}" data-mode="${mode}">${head}${body}${extra}<div class="aq-result" role="status" aria-live="polite"></div>${why}</div>`;
  if (Q.type === "sba" || Q.type === "mcq") {
    const opts = shuffle([Q.right, ...Q.wrong], r);
    return wrap(`<div class="aq-opts">${opts.map((o) => `<button type="button" data-v="${esc(o)}">${inline(o)}</button>`).join("")}</div>`);
  }
  if (Q.type === "multi") {
    const opts = shuffle([...Q.right, ...Q.wrong], r);
    return wrap(`<div class="aq-opts aq-checks">${opts.map((o, i) => `<label><input type="checkbox" value="${esc(o)}" id="${esc(id)}-${i}"><span>${inline(o)}</span></label>`).join("")}</div>`, `<button type="button" class="btn btn-ghost lg btn-sm aq-submit"><span>Check answer</span></button>`);
  }
  if (Q.type === "order") {
    let opts = shuffle(Q.steps, r); if (opts.every((s, i) => s === Q.steps[i])) opts = [...opts.slice(1), opts[0]];
    return wrap(`<ol class="aq-order">${opts.map((o) => `<li data-v="${esc(o)}"><span>${inline(o)}</span><button type="button" data-up aria-label="Move up">↑</button><button type="button" data-down aria-label="Move down">↓</button></li>`).join("")}</ol>`, `<button type="button" class="btn btn-ghost lg btn-sm aq-submit"><span>Check order</span></button>`);
  }
  if (Q.type === "match") {
    const rights = shuffle(Q.pairs.map((p) => p[1]), r);
    return wrap(`<div class="aq-match">${Q.pairs.map(([left], i) => `<label><span>${inline(left)}</span><select data-left="${esc(left)}" aria-label="Match for ${esc(left)}"><option value="">Choose…</option>${rights.map((x) => `<option value="${esc(x)}">${esc(x)}</option>`).join("")}</select></label>`).join("")}</div>`, `<button type="button" class="btn btn-ghost lg btn-sm aq-submit"><span>Check matches</span></button>`);
  }
  return wrap(`<textarea class="aq-text" rows="4" aria-label="Your answer" placeholder="Write your answer, then compare it with the model answer."></textarea>
    <button type="button" class="btn btn-ghost lg btn-sm aq-submit"><span>Show model answer</span></button>
    <div class="aq-model" hidden><b>Model answer</b><p>${inline(Q.model)}</p>${Q.points.length ? `<p class="aq-tick">Tick the points your answer covered:</p>${Q.points.map((p, i) => `<label><input type="checkbox" data-pt="${i}"><span>${inline(p)}</span></label>`).join("")}<button type="button" class="btn btn-ghost lg btn-sm aq-self"><span>Record my score</span></button>` : ""}</div>`);
}

// mark a response: returns { score: 0..1, correct, detail }
export function markQuestion(Q, response) {
  if (Q.type === "sba" || Q.type === "mcq") { const ok = response === Q.right; return { score: ok ? 1 : 0, correct: ok }; }
  if (Q.type === "multi") {
    const chosen = new Set(response || []), hits = Q.right.filter((x) => chosen.has(x)).length, false_ = [...chosen].filter((x) => !Q.right.includes(x)).length;
    const score = Math.max(0, (hits - false_) / Q.right.length); return { score, correct: hits === Q.right.length && !false_, detail: `${hits} of ${Q.right.length} correct options${false_ ? `, ${false_} incorrect chosen` : ""}` };
  }
  if (Q.type === "order") { const ok = (response || []).filter((s, i) => s === Q.steps[i]).length; return { score: ok / Q.steps.length, correct: ok === Q.steps.length, detail: `${ok} of ${Q.steps.length} in the right place` }; }
  if (Q.type === "match") { const ok = Q.pairs.filter(([l, rr]) => response?.[l] === rr).length; return { score: ok / Q.pairs.length, correct: ok === Q.pairs.length, detail: `${ok} of ${Q.pairs.length} matched` }; }
  const n = Q.points.length ? (response || []).length / Q.points.length : 0; return { score: n, correct: n >= 0.7, detail: "Self-assessed against the model answer", self: true };
}

// wire interaction for every question inside `el`. onAnswer(Q, result, firstTry, box) fires once per
// question; in exam mode the response is stored on the box (box.response) and no feedback is shown.
export function wireQuestions(el, lookup, onAnswer) {
  el.querySelectorAll(".aq").forEach((box) => {
    if (box.dataset.wired) return; box.dataset.wired = "1";
    const Q = lookup(box.dataset.id); if (!Q) return;
    const exam = box.dataset.mode === "exam";
    let tried = false;
    const finish = (response, mark) => {
      const res = markQuestion(Q, response); box.response = response;
      if (exam) { onAnswer?.(Q, res, !tried, box); return; }
      if (mark) mark(res);
      const out = box.querySelector(".aq-result");
      out.textContent = res.self ? `Recorded: ${Math.round(res.score * 100)}% of the marking points.` : res.correct ? "Correct." : `Not quite${res.detail ? `: ${res.detail}` : ""}.`;
      out.className = `aq-result ${res.correct ? "ok" : "no"}`;
      box.querySelector(".aq-why")?.removeAttribute("hidden");
      if (res.correct || !tried || res.self) onAnswer?.(Q, res, !tried, box);
      if (res.correct || res.self) box.classList.add("solved");
      tried = true;
    };
    if (Q.type === "sba" || Q.type === "mcq") {
      box.querySelectorAll(".aq-opts button").forEach((b) => b.addEventListener("click", () => {
        if (box.classList.contains("solved") && !exam) return;
        if (exam) { box.querySelectorAll(".aq-opts button").forEach((x) => x.classList.toggle("picked", x === b)); finish(b.dataset.v); return; }
        finish(b.dataset.v, (res) => b.classList.add(res.correct ? "right" : "wrong"));
      }));
      return;
    }
    if (Q.type === "order") {
      const ol = box.querySelector(".aq-order");
      ol.addEventListener("click", (e) => {
        const li = e.target.closest("li"); if (!li) return;
        if (e.target.closest("[data-up]") && li.previousElementSibling) ol.insertBefore(li, li.previousElementSibling);
        if (e.target.closest("[data-down]") && li.nextElementSibling) ol.insertBefore(li.nextElementSibling, li);
        if (exam) box.response = [...ol.children].map((x) => x.dataset.v);
      });
    }
    box.querySelector(".aq-submit")?.addEventListener("click", () => {
      if (Q.type === "multi") { const v = [...box.querySelectorAll("input:checked")].map((x) => x.value); finish(v, (res) => box.querySelectorAll(".aq-checks label").forEach((l) => { const val = l.querySelector("input").value; l.classList.toggle("right", Q.right.includes(val)); l.classList.toggle("wrong", !Q.right.includes(val) && l.querySelector("input").checked); })); }
      if (Q.type === "order") { const v = [...box.querySelectorAll(".aq-order li")].map((x) => x.dataset.v); finish(v, () => box.querySelectorAll(".aq-order li").forEach((li, i) => li.classList.toggle("right", li.dataset.v === Q.steps[i]))); }
      if (Q.type === "match") { const v = Object.fromEntries([...box.querySelectorAll("select")].map((s) => [s.dataset.left, s.value])); finish(v, () => box.querySelectorAll("select").forEach((s) => s.parentElement.classList.toggle("right", Q.pairs.find(([l]) => l === s.dataset.left)?.[1] === s.value))); }
      if (Q.type === "short") { box.querySelector(".aq-model").hidden = false; box.querySelector(".aq-submit").hidden = true; if (!Q.points.length) finish([]); }
    });
    box.querySelector(".aq-self")?.addEventListener("click", () => finish([...box.querySelectorAll("[data-pt]:checked")].map((x) => Number(x.dataset.pt))));
    if (exam) box.addEventListener("change", () => {
      if (Q.type === "multi") box.response = [...box.querySelectorAll("input:checked")].map((x) => x.value);
      if (Q.type === "match") box.response = Object.fromEntries([...box.querySelectorAll("select")].map((s) => [s.dataset.left, s.value]));
    });
  });
}

// a short text description of the correct answer, for results pages
export function answerText(Q) {
  if (Q.type === "sba" || Q.type === "mcq") return Q.right;
  if (Q.type === "multi") return Q.right.join("; ");
  if (Q.type === "order") return Q.steps.map((s, i) => `${i + 1}. ${s}`).join("  ");
  if (Q.type === "match") return Q.pairs.map(([a, b]) => `${a} → ${b}`).join("; ");
  return Q.model;
}
