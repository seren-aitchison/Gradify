// Gradify assessment question types. Each type is a handler:
//   label, auto (machine-markable?)
//   parse(body) → type fields                     from the text format (model.js)
//   render(Q, ctx) → html                         the answer area (render.js wraps it in the shell)
//   wire(box, Q, emit, ctx)                       interaction; calls emit(response) when answered
//   restore(box, Q, response)                     show a saved response (exams)
//   mark(Q, response) → { score 0..1, correct, detail, status }
//   feedback(Q, response, result) → html          explanation of the learner's specific answer
//   answer(Q) → text                              the correct answer, for results pages
// To add a type: add a handler here and a tag in model.js. Nothing else changes.
import { esc, inline } from "../core/text.js";
import { option, splitParts, splitList } from "./model.js";

const seeded = (seed) => { let s = [...String(seed)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7); return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); };
// a typed number: commas and spaces ignored; "3.2e-4", "3.2 × 10^-4", "3.2x10-4" and a unicode minus accepted
export function numberOf(v) {
  if (v == null) return null;
  const s = String(v).trim().replace(/[\s,]/g, "").replace(/−/g, "-").replace(/(?:×|x|\*)10\^?\(?(-?\d+)\)?/i, "e$1");
  if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(s)) return null;
  return Number(s);
}
const fmtNum = (n) => (Math.abs(n) >= 1e5 || (Math.abs(n) < 1e-3 && n !== 0) ? n.toExponential(3).replace(/\.?0+e/, "e") : String(+n.toPrecision(6)));
export const shuffle = (a, seed) => { const r = seeded(seed); a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// single choice from options (single best answer, multiple choice, true or false)
const choice = {
  render(Q, ctx) {
    const opts = Q.type === "tf" ? Q.options : shuffle(Q.options, ctx.key);
    return `<div class="aq-opts" role="group" aria-label="Answer options">${opts.map((o) => `<button type="button" data-v="${esc(o.text)}" aria-pressed="false">${inline(o.text)}</button>`).join("")}</div>`;
  },
  wire(box, Q, emit) {
    box.querySelectorAll(".aq-opts button").forEach((b) => b.addEventListener("click", () => {
      box.querySelectorAll(".aq-opts button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      emit(b.dataset.v);
    }));
  },
  restore(box, Q, v) { box.querySelectorAll(".aq-opts button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === v))); },
  mark(Q, v) { const ok = Q.options.some((o) => o.correct && o.text === v); return { score: ok ? 1 : 0, correct: ok }; },
  feedback(Q, v, res) {
    const picked = Q.options.find((o) => o.text === v), right = Q.options.find((o) => o.correct);
    return `${!res.correct && picked?.why ? `<p class="aq-optwhy"><b>Why not “${inline(picked.text)}”:</b> ${inline(picked.why)}</p>` : ""}${!res.correct ? `<p><b>Answer:</b> ${inline(right.text)}</p>` : ""}`;
  },
  paint(box, Q, v, res) { box.querySelectorAll(".aq-opts button").forEach((b) => { if (b.dataset.v === v) b.classList.add(res.correct ? "right" : "wrong"); if (!res.correct && Q.options.some((o) => o.correct && o.text === b.dataset.v)) b.classList.add("right"); }); },
  answer: (Q) => Q.options.find((o) => o.correct).text,
};

export const TYPES = {
  choice: {
    label: "Multiple choice", auto: true,
    parse(body) {
      const [q, right, ...rest] = splitParts(body);
      const why = rest.length > 3 ? rest.pop() : "";
      if (!q || !right || !rest.length) return null;
      return { type: rest.length >= 4 ? "sba" : "mcq", q, why, options: [option(right, true), ...rest.map((w) => option(w, false))] };
    },
    ...choice,
  },
  tf: {
    label: "True or false", auto: true,
    parse(body) { const [q, ans, why = ""] = splitParts(body); if (!q || !/^(true|false)$/i.test(ans || "")) return null; const t = /^true$/i.test(ans); return { type: "tf", q, why, options: [{ text: "True", correct: t, why: "" }, { text: "False", correct: !t, why: "" }] }; },
    ...choice,
  },
  multi: {
    label: "Choose all that apply", auto: true,
    parse(body) { const [q, r, w, why = ""] = splitParts(body); if (!q || !r || !w) return null; return { type: "multi", q, why, options: [...splitList(r).map((x) => option(x, true)), ...splitList(w).map((x) => option(x, false))] }; },
    render(Q, ctx) { return `<fieldset class="aq-checks"><legend class="sr-only">Choose all that apply</legend>${shuffle(Q.options, ctx.key).map((o, i) => `<label><input type="checkbox" value="${esc(o.text)}" id="${esc(ctx.key)}-o${i}"><span>${inline(o.text)}</span></label>`).join("")}</fieldset><button type="button" class="btn btn-ghost lg btn-sm aq-submit"><span>Check answer</span></button>`; },
    wire(box, Q, emit, ctx) {
      const read = () => [...box.querySelectorAll(".aq-checks input:checked")].map((x) => x.value);
      if (ctx.mode === "exam") box.querySelector(".aq-checks").addEventListener("change", () => emit(read(), { silent: true }));
      box.querySelector(".aq-submit").addEventListener("click", () => emit(read()));
    },
    restore(box, Q, v) { box.querySelectorAll(".aq-checks input").forEach((x) => { x.checked = (v || []).includes(x.value); }); },
    mark(Q, v) {
      const chosen = new Set(v || []), right = Q.options.filter((o) => o.correct);
      const hits = right.filter((o) => chosen.has(o.text)).length, wrong = [...chosen].filter((x) => !right.some((o) => o.text === x)).length;
      return { score: Math.max(0, (hits - wrong) / right.length), correct: hits === right.length && !wrong, detail: `${hits} of ${right.length} correct options${wrong ? `, ${wrong} incorrect chosen` : ""}` };
    },
    feedback(Q, v) { const chosen = new Set(v || []); return `<ul class="aq-optlist">${Q.options.map((o) => `<li class="${o.correct ? "ok" : ""}">${o.correct ? "Applies" : "Doesn't apply"}: ${inline(o.text)}${chosen.has(o.text) ? " <small>(you chose this)</small>" : ""}${o.why ? `<br><small>${inline(o.why)}</small>` : ""}</li>`).join("")}</ul>`; },
    paint(box, Q) { box.querySelectorAll(".aq-checks label").forEach((l) => { const val = l.querySelector("input").value, ok = Q.options.some((o) => o.correct && o.text === val); l.classList.toggle("right", ok); l.classList.toggle("wrong", !ok && l.querySelector("input").checked); }); },
    answer: (Q) => Q.options.filter((o) => o.correct).map((o) => o.text).join("; "),
  },
  order: {
    label: "Put in order", auto: true,
    parse(body) { const [q, s, why = ""] = splitParts(body); const steps = s ? splitList(s) : []; return q && steps.length >= 3 ? { type: "order", q, steps, why } : null; },
    render(Q, ctx) {
      let opts = shuffle(Q.steps, ctx.key); if (opts.every((s, i) => s === Q.steps[i])) opts = [...opts.slice(1), opts[0]];
      return `<p class="aq-hint">Use the move buttons (or Tab then Enter) to reorder.</p><ol class="aq-steps">${opts.map((o) => `<li data-v="${esc(o)}"><span>${inline(o)}</span><button type="button" data-up aria-label="Move up: ${esc(o)}">↑</button><button type="button" data-down aria-label="Move down: ${esc(o)}">↓</button></li>`).join("")}</ol><p class="sr-only aq-moved" aria-live="polite"></p><button type="button" class="btn btn-ghost lg btn-sm aq-submit"><span>Check order</span></button>`;
    },
    wire(box, Q, emit, ctx) {
      const ol = box.querySelector(".aq-steps"), read = () => [...ol.children].map((x) => x.dataset.v);
      ol.addEventListener("click", (e) => {
        const li = e.target.closest("li"); if (!li) return;
        const up = e.target.closest("[data-up]"), down = e.target.closest("[data-down]");
        if (up && li.previousElementSibling) ol.insertBefore(li, li.previousElementSibling);
        else if (down && li.nextElementSibling) ol.insertBefore(li.nextElementSibling, li);
        else return;
        (up ? li.querySelector("[data-up]") : li.querySelector("[data-down]")).focus();
        box.querySelector(".aq-moved").textContent = `${li.dataset.v}: now position ${[...ol.children].indexOf(li) + 1} of ${ol.children.length}`;
        if (ctx.mode === "exam") emit(read(), { silent: true });
      });
      box.querySelector(".aq-submit").addEventListener("click", () => emit(read()));
    },
    restore(box, Q, v) { const ol = box.querySelector(".aq-steps"); for (const s of v || []) { const li = [...ol.children].find((x) => x.dataset.v === s); if (li) ol.append(li); } },
    mark(Q, v) { const ok = (v || []).filter((s, i) => s === Q.steps[i]).length; return { score: ok / Q.steps.length, correct: ok === Q.steps.length, detail: `${ok} of ${Q.steps.length} in the right place` }; },
    feedback(Q, v, res) { return res.correct ? "" : `<p><b>Correct order:</b></p><ol>${Q.steps.map((s) => `<li>${inline(s)}</li>`).join("")}</ol>`; },
    paint(box, Q) { box.querySelectorAll(".aq-steps li").forEach((li, i) => li.classList.toggle("right", li.dataset.v === Q.steps[i])); },
    answer: (Q) => Q.steps.map((s, i) => `${i + 1}. ${s}`).join("  "),
  },
  match: {
    label: "Match the pairs", auto: true,
    parse(body) { const [q, s, why = ""] = splitParts(body); const pairs = s ? splitList(s).map((p) => p.split(" = ").map((x) => x.trim())).filter((p) => p.length === 2) : []; return q && pairs.length >= 3 ? { type: "match", q, pairs, why } : null; },
    render(Q, ctx) { const rights = shuffle(Q.pairs.map((p) => p[1]), ctx.key); return `<div class="aq-match">${Q.pairs.map(([left], i) => `<label><span id="${esc(ctx.key)}-m${i}">${inline(left)}</span><select data-left="${esc(left)}" aria-labelledby="${esc(ctx.key)}-m${i}"><option value="">Choose…</option>${rights.map((x) => `<option value="${esc(x)}">${esc(x)}</option>`).join("")}</select></label>`).join("")}</div><button type="button" class="btn btn-ghost lg btn-sm aq-submit"><span>Check matches</span></button>`; },
    wire(box, Q, emit, ctx) {
      const read = () => Object.fromEntries([...box.querySelectorAll(".aq-match select")].map((s) => [s.dataset.left, s.value]));
      if (ctx.mode === "exam") box.querySelector(".aq-match").addEventListener("change", () => emit(read(), { silent: true }));
      box.querySelector(".aq-submit").addEventListener("click", () => emit(read()));
    },
    restore(box, Q, v) { box.querySelectorAll(".aq-match select").forEach((s) => { s.value = v?.[s.dataset.left] || ""; }); },
    mark(Q, v) { const ok = Q.pairs.filter(([l, r]) => v?.[l] === r).length; return { score: ok / Q.pairs.length, correct: ok === Q.pairs.length, detail: `${ok} of ${Q.pairs.length} matched` }; },
    feedback(Q, v, res) { return res.correct ? "" : `<ul>${Q.pairs.map(([l, r]) => `<li>${inline(l)} → ${inline(r)}${v?.[l] && v[l] !== r ? ` <small>(you chose ${esc(v[l])})</small>` : ""}</li>`).join("")}</ul>`; },
    paint(box, Q) { box.querySelectorAll(".aq-match select").forEach((s) => s.parentElement.classList.toggle("right", Q.pairs.find(([l]) => l === s.dataset.left)?.[1] === s.value)); },
    answer: (Q) => Q.pairs.map(([a, b]) => `${a} → ${b}`).join("; "),
  },
  num: {
    // a calculation: "question | answer | tolerance | unit | why"; tolerance is absolute ("0.05") or relative ("2%").
    // Answers may be typed with commas, spaces, "e" notation or "× 10^"; the unit is shown, not typed
    label: "Calculation", auto: true,
    parse(body) {
      const [q, ans, tol = "0", unit = "", why = ""] = body.split(" | ").map((x) => x.trim());
      const answer = Number(ans); if (!q || !Number.isFinite(answer)) return null;
      return { type: "num", q, answer, tol: tol.endsWith("%") ? { rel: Number(tol.slice(0, -1)) / 100 } : { abs: Number(tol) || 0 }, unit, why };
    },
    render(Q, ctx) { return `<div class="aq-num"><label class="sr-only" for="${esc(ctx.key)}-num">Your answer</label><input id="${esc(ctx.key)}-num" type="text" inputmode="decimal" autocomplete="off" placeholder="Your answer">${Q.unit ? `<span>${inline(Q.unit)}</span>` : ""}</div><button type="button" class="btn btn-ghost lg btn-sm aq-submit"><span>Check answer</span></button>`; },
    wire(box, Q, emit, ctx) {
      const inp = box.querySelector(".aq-num input"), read = () => inp.value;
      if (ctx.mode === "exam") inp.addEventListener("input", () => emit(read(), { silent: true }));
      box.querySelector(".aq-submit").addEventListener("click", () => emit(read()));
      inp.addEventListener("keydown", (e) => { if (e.key === "Enter") emit(read()); });
    },
    restore(box, Q, v) { box.querySelector(".aq-num input").value = v || ""; },
    mark(Q, v) {
      const x = numberOf(v); if (x == null) return { score: 0, correct: false, detail: "Not a number" };
      const tol = Q.tol.rel != null ? Math.abs(Q.answer) * Q.tol.rel : Q.tol.abs, ok = Math.abs(x - Q.answer) <= tol + 1e-12 * Math.max(1, Math.abs(Q.answer));
      return { score: ok ? 1 : 0, correct: ok, detail: ok ? "Within tolerance" : `You gave ${v}` };
    },
    feedback(Q, v, res) { return res.correct ? "" : `<p><b>Answer:</b> ${esc(fmtNum(Q.answer))}${Q.unit ? ` ${inline(Q.unit)}` : ""}${Q.tol.rel ? ` (within ${+(Q.tol.rel * 100).toFixed(2)}%)` : Q.tol.abs ? ` (± ${Q.tol.abs})` : ""}</p>`; },
    paint(box, Q, v, res) { box.querySelector(".aq-num input").classList.toggle(res.correct ? "right" : "wrong", true); },
    answer: (Q) => `${fmtNum(Q.answer)}${Q.unit ? ` ${Q.unit}` : ""}`,
  },
  short: {
    // not machine-marked: the learner compares with the model answer and ticks the points covered.
    // The result is "provisional" until confirmed by a human marker; an AI-assisted suggestion, if one
    // is ever added, is also provisional and never replaces the learner's or a marker's judgement.
    label: "Short answer", auto: false,
    parse(body) { const [q, model, pts = ""] = splitParts(body); return q && model ? { type: "short", q, model, points: splitList(pts), why: "" } : null; },
    render(Q, ctx) {
      return `<label class="sr-only" for="${esc(ctx.key)}-sa">Your answer</label><textarea id="${esc(ctx.key)}-sa" class="aq-text" rows="4" placeholder="Write your answer, then compare it with the model answer."></textarea>
        <button type="button" class="btn btn-ghost lg btn-sm aq-submit"><span>Show model answer</span></button>
        <div class="aq-model" hidden><b>Model answer</b><p>${inline(Q.model)}</p>${Q.points.length ? `<fieldset><legend class="aq-tick">Tick the points your answer covered:</legend>${Q.points.map((p, i) => `<label><input type="checkbox" data-pt="${i}"><span>${inline(p)}</span></label>`).join("")}</fieldset><button type="button" class="btn btn-ghost lg btn-sm aq-self"><span>Record my self-assessment</span></button>` : ""}</div>`;
    },
    wire(box, Q, emit) {
      box.querySelector(".aq-submit").addEventListener("click", () => { box.querySelector(".aq-model").hidden = false; box.querySelector(".aq-submit").hidden = true; box.querySelector(".aq-model b").setAttribute("tabindex", "-1"); box.querySelector(".aq-model b").focus(); if (!Q.points.length) emit({ text: box.querySelector(".aq-text").value, points: [] }); });
      box.querySelector(".aq-self")?.addEventListener("click", () => emit({ text: box.querySelector(".aq-text").value, points: [...box.querySelectorAll("[data-pt]:checked")].map((x) => Number(x.dataset.pt)) }));
    },
    restore(box, Q, v) { if (v?.text) box.querySelector(".aq-text").value = v.text; },
    mark(Q, v) { const pts = Array.isArray(v) ? v : v?.points || []; const n = Q.points.length ? pts.length / Q.points.length : 0; return { score: n, correct: n >= 0.7, detail: "Self-assessed against the model answer", self: true, status: "provisional", method: "self" }; },
    feedback() { return `<p class="aq-note">Self-assessment is provisional: it helps you revise, and a tutor or examiner may mark differently.</p>`; },
    paint() {},
    answer: (Q) => Q.model,
  },
};

// the handler for a question's type ("sba" and "mcq" share the choice handler)
export const handlerFor = (Q) => TYPES[Q.type === "sba" || Q.type === "mcq" ? "choice" : Q.type];
export const LABELS = { sba: "Single best answer", mcq: "Multiple choice", tf: "True or false", multi: "Choose all that apply", order: "Put in order", match: "Match the pairs", short: "Short answer", num: "Calculation" };
