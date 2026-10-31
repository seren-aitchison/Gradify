// Gradify mock exams: a timed, configurable exam built from any pool of questions (kit/assess/questions.js),
// with results, explanations and weak areas. Subject-neutral: a site supplies the pool and the exam config.
//
// Exam config:
//   { id, title, sub, format: "sba" | "mixed", count, minutes, pass (0..1), types: ["sba", "multi", …],
//     feedback: "end" (default; answers shown after finishing) | "each" (after each question) }
// Pool item: { Q, id, group, groupLabel, link }  (group: the school or module it came from, for weak areas)
// Formats describe defaults for a kind of exam, so new formats can be added without changing the runner.
import { renderQuestion, wireQuestions, markQuestion, answerText, restoreResponse, TYPES } from "./questions.js";
import { esc, inline } from "../core/text.js";

export const FORMATS = {
  sba: { label: "Single best answer", types: ["sba"], perQuestion: 1.7, note: "One best answer from five options, as in SQE1." },
  mixed: { label: "Mixed question types", types: ["sba", "mcq", "multi", "order", "match"], perQuestion: 1.5, note: "Single best answer, multiple choice, multi-select, ordering and matching questions." },
  science: { label: "Mixed, with calculations", types: ["sba", "mcq", "tf", "multi", "order", "match", "num"], perQuestion: 1.6, note: "Multiple choice, true or false, multi-select, ordering, matching and numerical calculation questions." },
};

// choose questions: filter by type, spread across groups as evenly as possible, deterministic for a seed
export function buildExam(pool, cfg, seed = Date.now()) {
  const types = cfg.types || FORMATS[cfg.format || "mixed"].types;
  let s = seed >>> 0; const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const usable = pool.filter((p) => types.includes(p.Q.type) && TYPES[p.Q.type].auto);
  const groups = new Map(); for (const p of usable) { if (!groups.has(p.group)) groups.set(p.group, []); groups.get(p.group).push(p); }
  for (const g of groups.values()) for (let i = g.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [g[i], g[j]] = [g[j], g[i]]; }
  const out = [], lists = [...groups.values()];
  while (out.length < Math.min(cfg.count, usable.length)) for (const g of lists) { if (g.length && out.length < cfg.count) out.push(g.pop()); }
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  return out;
}

// mark a finished exam: per-question results, overall score, per-group breakdown and weak areas
export function markExam(items, responses, cfg) {
  const results = items.map((it, i) => ({ ...it, response: responses[i], ...(responses[i] === undefined ? { score: 0, correct: false, unanswered: true } : markQuestion(it.Q, responses[i])) }));
  const total = results.reduce((a, x) => a + x.score, 0), score = results.length ? total / results.length : 0;
  const by = new Map();
  for (const x of results) { const g = by.get(x.group) || { group: x.group, label: x.groupLabel, link: x.link, n: 0, score: 0 }; g.n++; g.score += x.score; by.set(x.group, g); }
  const groups = [...by.values()].map((g) => ({ ...g, pct: g.score / g.n })).sort((a, b) => a.pct - b.pct);
  const weak = groups.filter((g) => g.pct < Math.max(0.6, (cfg.pass || 0.6) - 0.05));
  return { score, pass: score >= (cfg.pass ?? 0.6), results, groups, weak, answered: results.filter((x) => !x.unanswered).length };
}

const fmt = (sec) => `${Math.floor(sec / 60)}:${String(Math.max(0, sec % 60)).padStart(2, "0")}`;

// run an exam inside `el`; onFinish(summary) is called once with the marked result
export function runExam(el, cfg, items, onFinish) {
  const responses = new Array(items.length), flagged = new Set(), started = Date.now(), limit = Math.round((cfg.minutes || items.length * 1.5) * 60);
  const spent = new Array(items.length).fill(0); let since = Date.now();   // time on each question
  const tick = () => { spent[k] += Date.now() - since; since = Date.now(); };
  const lookup = Object.fromEntries(items.map((it, i) => [`exam#${i}`, it.Q]));
  let k = 0, timer = null, done = false;
  const left = () => limit - Math.round((Date.now() - started) / 1000);
  const paint = () => {
    const it = items[k];
    el.innerHTML = `<div class="ax">
      <div class="ax-top"><b>${esc(cfg.title)}</b><span class="ax-time" aria-live="off">${fmt(left())}</span></div>
      <div class="ax-nav" aria-label="Questions">${items.map((_, i) => `<button type="button" data-go="${i}" class="${i === k ? "here" : ""} ${responses[i] !== undefined ? "answered" : ""} ${flagged.has(i) ? "flag" : ""}" aria-label="Question ${i + 1}${responses[i] !== undefined ? ", answered" : ""}${flagged.has(i) ? ", flagged" : ""}">${i + 1}</button>`).join("")}</div>
      <p class="ax-count">Question ${k + 1} of ${items.length}</p>
      ${renderQuestion(it.Q, `exam#${k}`, { mode: cfg.feedback === "each" ? "practice" : "exam", levels: cfg.levels })}
      <div class="ax-row"><button type="button" class="btn btn-ghost lg btn-sm" data-prev ${k ? "" : "disabled"}><span>← Previous</span></button>
        <button type="button" class="btn btn-ghost lg btn-sm" data-flag><span>${flagged.has(k) ? "Unflag" : "Flag for review"}</span></button>
        ${k < items.length - 1 ? `<button type="button" class="btn btn-light lg btn-sm" data-next><span>Next →</span></button>` : ""}
        <button type="button" class="btn ${k === items.length - 1 ? "btn-light" : "btn-ghost"} lg btn-sm" data-finish><span>Finish exam</span></button></div></div>`;
    const box = el.querySelector(".aq");
    restoreResponse(box, it.Q, responses[k]);
    wireQuestions(el, (id) => lookup[id], (Q, res, first, b, meta) => { responses[k] = meta.response; });
    const store = () => { if (box.response !== undefined) responses[k] = box.response; };
    el.querySelector("[data-prev]")?.addEventListener("click", () => { store(); tick(); k--; paint(); });
    el.querySelector("[data-next]")?.addEventListener("click", () => { store(); tick(); k++; paint(); });
    el.querySelector("[data-flag]").addEventListener("click", () => { store(); flagged.has(k) ? flagged.delete(k) : flagged.add(k); paint(); });
    el.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => { store(); tick(); k = Number(b.dataset.go); paint(); }));
    el.querySelector("[data-finish]").addEventListener("click", () => {
      store(); const un = responses.filter((x) => x === undefined).length;
      if (un && !confirm(`${un} question${un === 1 ? " is" : "s are"} unanswered. Finish anyway?`)) return;
      finish();
    });
  };
  const finish = () => {
    if (done) return; done = true; clearInterval(timer); tick();
    const res = markExam(items, responses, cfg), used = Math.round((Date.now() - started) / 1000);
    el.innerHTML = `<div class="ax ax-results">
      <div class="ax-score ${res.pass ? "ok" : "no"}"><b>${Math.round(res.score * 100)}%</b><span>${res.pass ? "Passed" : "Not yet passed"} · practice pass mark ${Math.round((cfg.pass ?? 0.6) * 100)}% · ${res.answered} of ${items.length} answered · ${fmt(used)} used of ${fmt(limit)}</span></div>
      ${res.weak.length ? `<section><h3>Areas to work on</h3><ul class="ax-weak">${res.weak.map((g) => `<li>${g.link ? `<a href="${esc(g.link)}">${esc(g.label)}</a>` : esc(g.label)} <small>${Math.round(g.pct * 100)}% across ${g.n} question${g.n > 1 ? "s" : ""}</small></li>`).join("")}</ul></section>` : `<section><h3>No weak areas in this exam</h3><p>Every area scored 60% or more.</p></section>`}
      <section><h3>By area</h3><div class="ax-bars">${res.groups.map((g) => `<div><span>${esc(g.label)}</span><i style="--p:${g.pct}"></i><small>${Math.round(g.pct * 100)}%</small></div>`).join("")}</div></section>
      <section><h3>Every question, with explanations</h3><ol class="ax-review">${res.results.map((x, i) => `<li class="${x.correct ? "ok" : "no"}"><p>${inline(x.Q.q)}</p><p><b>${x.unanswered ? "Not answered" : x.correct ? "Correct" : `Your answer scored ${Math.round(x.score * 100)}%`}</b>${x.detail ? ` · ${esc(x.detail)}` : ""}</p><p><b>Answer:</b> ${inline(answerText(x.Q))}</p>${x.Q.why ? `<p class="ax-why">${inline(x.Q.why)}</p>` : ""}${x.link ? `<a href="${esc(x.link)}">Study this topic →</a>` : ""}</li>`).join("")}</ol></section>
      <div class="ax-row"><button type="button" class="btn btn-light lg btn-sm" data-again><span>New exam</span></button></div></div>`;
    el.querySelector("[data-again]").addEventListener("click", () => onFinish?.(null, true));
    onFinish?.({ id: cfg.id, t: Date.now(), score: res.score, pass: res.pass, n: items.length, used, weak: res.weak.map((g) => g.group), groups: res.groups.map((g) => [g.group, Math.round(g.pct * 100)]),
      // per-question results for attempt records (the host decides what to keep)
      items: res.results.map((x, i) => ({ item: x.item, key: x.id, score: x.score, correct: x.correct, unanswered: !!x.unanswered, response: x.response, ms: spent[i], method: x.method, status: x.status })) });
  };
  paint();
  timer = setInterval(() => { const t = el.querySelector(".ax-time"); if (!t) return; const l = left(); t.textContent = fmt(l); t.classList.toggle("low", l < 300); if (l <= 0) finish(); }, 1000);
  return { finish };
}
