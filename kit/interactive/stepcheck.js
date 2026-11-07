// MathGradify step-by-step checker (the Step by step section). A student works a problem one line at a
// time, as on paper. Every line is checked as it's written:
//   expressions (expand, factorise, simplify, differentiate, integrate): each line must equal the answer
//     (numerically, at many points: kit/interactive/mathexpr.js); integrals may differ by a constant
//   equations: each line must still be true for every solution, and mustn't gain new ones
// so the feedback points to the exact line where an error crept in, not just "wrong answer". The final
// line must also be in the form asked for (expanded, factorised, x = …). Hints cost a little; the worked
// solution can be revealed. Each problem becomes an attempt record (ctx.record) for the mastery engine.
//
// set = { id, title, level, intro, lessons: [lesson ids], problems: [{ id, prompt, kind, start, target, form,
//   solutions, var, d, hints: [], solution: [lines], why }] }
//   kind "expression": target is the answer (defaults to start); form "expanded" | "factorised" | "number"
//   kind "derivative" / "integral": target is the derivative or an antiderivative; fn is the function or
//     integrand (a line equal to it is accepted as rewriting); range limits sampling (for sqrt, ln)
//   terms: the final answer has at most this many terms; factors: at least this many non-constant factors
//   kind "equation": start "3(x − 2) = 2x + 5", solutions [11], var "x"
import { parse, parseEquation, equivalent, satisfies, numbersFrom, sameSet, form as FORM, clean, samplePoints, variables, pretty } from "./mathexpr.js";
import { esc, inline } from "../core/text.js";

// counting terms (a + b − c has 3) and non-constant factors (3(x − 2)(x + 2) has 2; (x − 1)^2 has 2) at the top
const strip = (n) => (n.k === "()" ? strip(n.a) : n);
export const termCount = (n) => { n = strip(n); return n.k === "+" || n.k === "-" ? termCount(n.a) + termCount(n.b) : 1; };
export const factorCount = (n) => {
  n = strip(n);
  if (n.k === "neg") return factorCount(n.a);
  if (n.k === "*") return factorCount(n.a) + factorCount(n.b);
  if (n.k === "^" && strip(n.b).k === "num" && Number.isInteger(strip(n.b).v)) return strip(n.a).k === "num" ? 0 : strip(n.b).v * (strip(n.a).k === "var" ? 1 : 1);
  return n.k === "num" ? 0 : 1;
};
// strip what students write before the expression: "dy/dx =", "f'(x) =", "= …", and "+ c" on integrals
export function body(line, kind) {
  let s = clean(line);
  if (kind !== "equation" && s.includes("=")) s = s.slice(s.lastIndexOf("=") + 1).trim();
  if (kind === "integral") s = s.replace(/\+\s*[cC]\s*$/, "").trim();
  return s;
}
// an answer line like "x = 3 or x = -2", "x = 11", "x = 3, x = -2"
const answerLine = (s, v) => new RegExp(`^\\s*${v}\\s*=\\s*[^=]+(\\s*(,|or|and)\\s*${v}?\\s*=?\\s*[^=]+)*$`, "i").test(clean(s)) && !new RegExp(`=.*\\b${v}\\b`).test(clean(s).replace(new RegExp(`(,|or|and)\\s*${v}\\s*=`, "gi"), ","));

// check one line against the problem. Returns { ok, why, final } where final says it's a finished answer
export function checkLine(p, line) {
  const kind = p.kind || "expression";
  try {
    if (kind === "equation") {
      const v = p.var || "x";
      if (answerLine(line, v)) {
        const got = numbersFrom(line);
        if (got.some((x) => !Number.isFinite(x))) return { ok: false, why: "I can't read those values." };
        if (sameSet(got, p.solutions)) return { ok: true, final: true };
        const missing = p.solutions.filter((s) => !got.some((g) => Math.abs(g - s) < 1e-6)).length;
        return { ok: false, why: got.some((g) => !p.solutions.some((s) => Math.abs(g - s) < 1e-6)) ? "At least one of these values doesn't satisfy the original equation: substitute it back to check." : `You've lost ${missing === 1 ? "a solution" : "solutions"}: did you divide by something that could be zero, or forget the ± of a square root?` };
      }
      const eq = parseEquation(line);
      for (const s of p.solutions) if (!satisfies(eq, { [v]: s })) return { ok: false, why: "This line isn't true for the solution of the original equation, so an error has crept in here. Check what you did to each side (every term), and the signs." };
      // no new solutions: at sample points where the original is false, this line should be false too
      const start = parseEquation(p.start);
      for (const pt of samplePoints([v], 30, 5, [-9.3, 9.7])) if (!satisfies(start, pt) && satisfies(eq, pt)) return { ok: false, why: "This line has solutions the original equation doesn't: check the step (squaring both sides or multiplying by an expression can add solutions)." };
      return { ok: true, final: false };
    }
    const b = body(line, kind), target = p.target || p.start;
    const t = parse(b);
    for (const x of variables(t)) if (!variables(parse(target)).has(x) && !(kind === "integral" && /c/i.test(x))) return { ok: false, why: `Where has the letter ${x} come from? This problem only uses ${[...variables(parse(target))].join(", ") || "numbers"}.` };
    const ok = equivalent(b, target, { upToConstant: kind === "integral", range: p.range });
    // differentiating or integrating: rewriting the function first (3/x^2 as 3x^-2) is a valid step
    if (!ok && p.fn && (kind === "derivative" || kind === "integral") && equivalent(b, p.fn, { range: p.range })) return { ok: true, final: false, why: `That rewrites the ${kind === "derivative" ? "function" : "integrand"}: now ${kind === "derivative" ? "differentiate" : "integrate"} it.` };
    if (!ok) return { ok: false, why: kind === "derivative" ? "This isn't the derivative: check each term (powers come down and reduce by one; and the chain, product or quotient rule where needed)." : kind === "integral" ? "Differentiating this doesn't give the integrand: check each term (raise the power by one, then divide by the new power)." : "This line isn't equal to the original expression, so an error has crept in here. Check signs, and multiply every term inside the bracket." };
    let f = p.form ? FORM[p.form](b) : true, why = f ? "" : p.form === "factorised" ? "Equal, but not factorised yet." : p.form === "expanded" ? "Equal, but not fully expanded yet." : "Equal, but not simplified to a number yet.";
    if (f && p.terms && termCount(t) > p.terms) { f = false; why = "Equal, but collect the like terms to simplify it."; }
    if (f && p.factors && factorCount(t) < p.factors) { f = false; why = "Equal, but not fully factorised: can a bracket be factorised further?"; }
    return { ok: true, final: f, why };
  } catch (e) { return { ok: false, unreadable: true, why: e.message || "I can't read that line." }; }
}

// score a finished problem: a right final answer with every step valid scores 1; errors along the way
// and hints reduce it; revealing the solution scores 0
export function scoreProblem({ solved, badLines = 0, hints = 0, revealed = false }) {
  if (revealed || !solved) return 0;
  return Math.max(0.3, Math.round((1 - 0.2 * Math.min(badLines, 2) - 0.15 * hints) * 100) / 100);
}

export function mount(el, set, ctx = {}) {
  let i = 0;
  const results = [];
  const fresh = () => ({ lines: [], hints: 0, revealed: false, solved: false, bad: 0 });
  let st = fresh();

  const paint = (focus = true) => {
    if (i >= set.problems.length) return summary();
    const p = set.problems[i];
    el.innerHTML = `<div class="mx">${set.banner ? `<p class="sx-banner" role="note">${inline(set.banner)}</p>` : ""}
      <div class="mx-head"><span class="co-kicker">Step by step · ${esc(set.level || "")}</span><h2>${esc(set.title)}</h2><p>Problem ${i + 1} of ${set.problems.length}</p></div>
      <div class="mx-problem"><p class="mx-prompt">${inline(p.prompt)}</p><p class="mx-start"><code>${esc(pretty(p.start))}</code></p></div>
      <ol class="mx-lines">${st.lines.map((l, k) => `<li class="${l.ok ? (l.final ? "final" : "ok") : "no"}"><code>${esc(pretty(l.text))}</code><span class="mx-mark" aria-label="${l.ok ? "valid step" : "error"}">${l.ok ? (l.final ? "✓ answer" : "✓") : "✗"}</span>${l.why ? `<small>${esc(l.why)}</small>` : ""}${k === st.lines.length - 1 && !st.solved && !st.revealed ? ` <button type="button" class="mx-undo" data-undo aria-label="Remove this line">Remove</button>` : ""}</li>`).join("")}</ol>
      ${st.solved || st.revealed ? done(p) : `<form class="mx-input" data-add><label for="mx-line">${st.lines.length ? "Next line" : "First line of your working"}</label>
        <div class="mx-row"><input id="mx-line" autocomplete="off" spellcheck="false" placeholder="${esc(p.placeholder || (p.kind === "equation" ? "e.g. 3x − 6 = 2x + 5" : "e.g. 2x^2 + 6x"))}"><button class="btn btn-light lg btn-sm"><span>Check line</span></button></div>
        <p class="mx-help">Type maths as you would on a calculator: 2x^2, (x+1)(x−3), sqrt(x), sin(x), e^x, ln(x), 3/4. ${p.kind === "equation" ? "Finish with the answer, like x = 4 or x = 2 or x = −3." : ""}</p></form>
        <div class="mx-tools"><button type="button" class="btn btn-ghost lg btn-sm" data-hint ${st.hints >= (p.hints || []).length ? "disabled" : ""}><span>Hint${(p.hints || []).length ? ` (${(p.hints || []).length - st.hints} left)` : ""}</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-reveal><span>Show a worked solution</span></button></div>
        ${st.hints ? `<ul class="mx-hints">${p.hints.slice(0, st.hints).map((h) => `<li>${esc(pretty(h))}</li>`).join("")}</ul>` : ""}`}
      <p class="mx-progress">${results.map((r) => `<span class="${r.score >= 0.99 ? "ok" : r.score > 0 ? "part" : "no"}" title="${esc(r.id)}"></span>`).join("")}${set.problems.slice(results.length).map(() => "<span></span>").join("")}</p></div>`;
    wire();
    if (focus) el.querySelector("#mx-line")?.focus();
  };
  const done = (p) => {
    const sc = scoreProblem({ solved: st.solved, badLines: st.bad, hints: st.hints, revealed: st.revealed });
    return `<div class="sx-feedback ${sc >= 0.99 ? "ok" : sc > 0 ? "part" : "no"}" role="status"><b>${st.revealed ? "Worked solution" : sc >= 0.99 ? "Solved, with every step valid" : "Solved"}</b>
      ${!st.revealed && st.bad ? `<p>You fixed ${st.bad === 1 ? "an error" : `${st.bad} errors`} along the way: look back at ${st.bad === 1 ? "the line marked ✗" : "the lines marked ✗"} to see what went wrong.</p>` : ""}
      <ol class="mx-solution">${p.solution.map((x) => `<li><code>${esc(pretty(x))}</code></li>`).join("")}</ol>${p.why ? `<p>${inline(p.why)}</p>` : ""}</div>
      <button type="button" class="btn btn-light lg btn-sm" data-next><span>${i + 1 < set.problems.length ? "Next problem →" : "See your summary"}</span></button>`;
  };
  function finishProblem() {
    const p = set.problems[i], score = scoreProblem({ solved: st.solved, badLines: st.bad, hints: st.hints, revealed: st.revealed });
    results.push({ id: p.id, score });
    ctx.record?.(p.id, { type: "reasoning", d: p.d || 2, score, response: st.lines.map((l) => l.text).join("\n"), lesson: p.lesson || set.lessons?.[0] || null });
  }
  function summary() {
    const mean = results.reduce((a, r) => a + r.score, 0) / (results.length || 1);
    ctx.finish?.(mean);
    el.innerHTML = `<div class="mx"><div class="mx-head"><span class="co-kicker">Step by step</span><h2>${esc(set.title)}</h2></div>
      <div class="rx-score"><b>${Math.round(mean * 100)}%</b><span>${results.filter((r) => r.score >= 0.99).length} of ${results.length} solved with every step valid</span></div>
      <ul class="rx-points">${set.problems.map((p, k) => `<li class="${results[k].score >= 0.99 ? "ok" : results[k].score > 0 ? "part" : "miss"}">${results[k].score >= 0.99 ? "✓" : results[k].score > 0 ? "◐" : "○"} ${inline(p.prompt)} <code>${esc(pretty(p.start))}</code></li>`).join("")}</ul>
      ${set.lessons?.length && ctx.lessonHref ? `<p class="rx-next"><b>Lessons on this:</b> ${set.lessons.map((l) => `<a href="${ctx.lessonHref(l)}">${esc(ctx.lessonTitle?.(l) || l)}</a>`).join(" · ")}</p>` : ""}
      <button type="button" class="btn btn-ghost lg btn-sm" data-restart><span>Do this set again</span></button></div>`;
    el.querySelector("[data-restart]").addEventListener("click", () => { i = 0; results.length = 0; st = fresh(); paint(); });
  }
  function wire() {
    const p = set.problems[i];
    el.querySelector("[data-add]")?.addEventListener("submit", (e) => {
      e.preventDefault(); const input = e.target.querySelector("input"), text = input.value.trim(); if (!text) return;
      const r = checkLine(p, text);
      if (r.unreadable) { el.querySelector(".mx-help").innerHTML = `<span class="mx-err">${esc(r.why)}</span> Type maths as you would on a calculator: 2x^2, (x+1)(x−3), sqrt(x), 3/4.`; input.focus(); return; }
      st.lines.push({ text, ok: r.ok, final: r.ok && r.final, why: r.ok ? (r.final ? "" : r.why || "") : r.why });
      if (!r.ok) st.bad++;
      if (r.ok && r.final && (p.kind !== "equation" || true)) { st.solved = true; finishProblem(); }
      paint();
    });
    el.querySelector("[data-undo]")?.addEventListener("click", () => { st.lines.pop(); paint(); });
    el.querySelector("[data-hint]")?.addEventListener("click", () => { st.hints++; paint(false); });
    el.querySelector("[data-reveal]")?.addEventListener("click", () => { st.revealed = true; finishProblem(); paint(false); });
    el.querySelector("[data-next]")?.addEventListener("click", () => { i++; st = fresh(); paint(); });
  }
  paint(false);
  return () => { el.innerHTML = ""; };
}

// check a problem set: every worked solution passes its own checker, line by line
export function validateSet(set) {
  const errs = [];
  for (const p of set.problems) {
    if (!p.solution?.length) { errs.push(`${p.id}: no worked solution`); continue; }
    p.solution.forEach((line, k) => {
      const r = checkLine(p, line);
      if (!r.ok) errs.push(`${p.id}: solution line ${k + 1} "${line}" fails: ${r.why}`);
      if (k === p.solution.length - 1 && !r.final) errs.push(`${p.id}: the last solution line isn't accepted as a finished answer`);
    });
    if (p.kind === "equation" && !p.solutions?.length) errs.push(`${p.id}: no solutions`);
    if (p.kind === "equation") for (const s of p.solutions) if (!satisfies(p.start, { [p.var || "x"]: s })) errs.push(`${p.id}: ${s} doesn't satisfy the equation`);
    if (!(p.hints || []).length) errs.push(`${p.id}: no hints`);
  }
  return errs;
}
