// Gradify legal reasoning engine (LawGradify's Reasoning section). A student works a problem question
// the way a lawyer does, and gets structured feedback on each part of the reasoning:
//   1 Facts        mark the material facts in the client's account
//   2 Issues       identify the legal issues (and reject the red herrings)
//   3 Authorities  choose the cases and statutes that state the rule for each issue
//   4 Application  write the rule and apply it to these facts, issue by issue
//   5 Conclusions  reach a conclusion on each issue, then advise the client
//   6 Feedback     a report on each dimension, with model reasoning and lessons to revisit
// Every marked part becomes an attempt record (ctx.record), so the work feeds the shared mastery engine.
//
// Marking is deterministic and works offline. Written application is checked for the key points a good
// answer makes (case.issues[].points[].cues): that's a heuristic, so it's recorded as provisional and the
// student can ask the AI tutor (mode "mark", the case rubric) for fuller, still provisional, feedback.
//
// case = { id, title, area, jurisdiction, brief, client, facts: [[[text, why?], …], …] (paragraphs of
//   sentences; a why marks a material fact), issues: [{ id, label, correct, why, lessons, rule,
//   core: [authority names], support: [names], points: [{ text, cues: [[alternatives], …] }],
//   conclusion: { q, options: [{ t, correct, why }] } }], bank: [{ name, cite, gist }],
//   advice: { q, options: [{ t, correct, why }] }, rubric: [≤12 criteria], model, review: { verified, note } }
import { esc, inline } from "../core/text.js";

export const STAGES = ["Facts", "Issues", "Authorities", "Application", "Conclusions", "Feedback"];
export const DIMS = [
  { key: "facts", label: "Material facts", what: "Seeing which facts matter legally" },
  { key: "issues", label: "Issue spotting", what: "Identifying the legal questions the facts raise" },
  { key: "authority", label: "Authorities", what: "Choosing the cases and statutes that govern each issue" },
  { key: "application", label: "Application", what: "Applying the rule to these facts, with reasons" },
  { key: "conclusion", label: "Conclusions", what: "Reaching a reasoned conclusion and advising the client" },
];
const clamp = (x) => Math.max(0, Math.min(1, x));
const round = (x) => Math.round(x * 1000) / 1000;

// ---------- marking (pure: tests/reasoning.test.mjs) ----------
export const sentences = (c) => c.facts.flatMap((p, pi) => p.map(([t, why], si) => ({ id: `${pi}.${si}`, t, why: why || null })));

// material facts: recall of the material sentences, less a little for each immaterial one marked
export function markFacts(c, picked = []) {
  const all = sentences(c), material = all.filter((s) => s.why), set = new Set(picked);
  const hits = material.filter((s) => set.has(s.id)), extra = all.filter((s) => !s.why && set.has(s.id));
  return { score: round(material.length ? clamp(hits.length / material.length - 0.1 * extra.length) : 1), hits: hits.map((s) => s.id), missed: material.filter((s) => !set.has(s.id)).map((s) => s.id), extra: extra.map((s) => s.id) };
}

// issues: real issues found, less half an issue for each red herring chosen
export function markIssues(c, picked = []) {
  const real = c.issues.filter((i) => i.correct), set = new Set(picked);
  const hits = real.filter((i) => set.has(i.id)), wrong = c.issues.filter((i) => !i.correct && set.has(i.id));
  return { score: round(clamp((hits.length - 0.5 * wrong.length) / real.length)), hits: hits.map((i) => i.id), missed: real.filter((i) => !set.has(i.id)).map((i) => i.id), wrong: wrong.map((i) => i.id) };
}

// authorities for one issue: the core authorities found, less a quarter for each irrelevant one.
// Supporting authorities are credited in feedback but neither needed nor penalised.
export function markAuthorities(issue, picked = []) {
  const set = new Set(picked), core = issue.core || [], support = new Set(issue.support || []);
  const hits = core.filter((n) => set.has(n)), extra = picked.filter((n) => !core.includes(n) && !support.has(n));
  return { score: round(core.length ? clamp(hits.length / core.length - 0.25 * extra.length) : 1), hits, missed: core.filter((n) => !set.has(n)), supporting: picked.filter((n) => support.has(n)), irrelevant: extra };
}

// written application: each key point counts when every cue group has at least one alternative in the text
const fold = (t) => ` ${String(t || "").toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ")} `;
export const covers = (text, point) => { const t = fold(text); return point.cues.every((alts) => alts.some((a) => t.includes(a.toLowerCase()))); };
export function markApplication(issue, text = "") {
  const words = String(text).trim().split(/\s+/).filter(Boolean).length;
  const found = issue.points.map((p) => covers(text, p));
  return { score: round(issue.points.length ? found.filter(Boolean).length / issue.points.length : 0), found, words, short: words < 40 };
}

export const markChoice = (q, i) => ({ score: q.options[i]?.correct ? 1 : 0, chosen: i, right: q.options.findIndex((o) => o.correct) });

// the whole answer → dimension scores and an overall score. Weights favour reasoning over recognition.
export const WEIGHTS = { facts: 0.1, issues: 0.2, authority: 0.2, application: 0.35, conclusion: 0.15 };
export function report(c, ans) {
  const real = c.issues.filter((i) => i.correct);
  const facts = markFacts(c, ans.facts), issues = markIssues(c, ans.issues);
  const per = real.map((i) => ({ id: i.id, authority: markAuthorities(i, ans.auth?.[i.id]), application: markApplication(i, ans.apply?.[i.id]), conclusion: markChoice(i.conclusion, ans.concl?.[i.id]) }));
  const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
  const advice = markChoice(c.advice, ans.advice);
  const dims = { facts: facts.score, issues: issues.score, authority: round(mean(per.map((p) => p.authority.score))), application: round(mean(per.map((p) => p.application.score))), conclusion: round(mean([...per.map((p) => p.conclusion.score), advice.score])) };
  const overall = round(Object.entries(WEIGHTS).reduce((a, [k, w]) => a + w * dims[k], 0));
  return { facts, issues, per, advice, dims, overall, confidence: ans.confidence ?? null };
}

// the student's whole analysis as one written answer (for the AI tutor and for saving)
export function answerText(c, ans) {
  const name = (id) => c.issues.find((i) => i.id === id)?.label || id;
  return c.issues.filter((i) => i.correct).map((i) => [
    `ISSUE: ${name(i.id)}`,
    `AUTHORITIES: ${(ans.auth?.[i.id] || []).join("; ") || "(none chosen)"}`,
    `RULE AND APPLICATION: ${ans.apply?.[i.id] || "(not written)"}`,
    `CONCLUSION: ${i.conclusion.options[ans.concl?.[i.id]]?.t || "(none)"}`,
  ].join("\n")).join("\n\n") + `\n\nADVICE TO THE CLIENT: ${c.advice.options[ans.advice]?.t || "(none)"}`;
}

// check a case's structure (tests/reasoning.test.mjs and the QA script)
export function validateCase(c) {
  const errs = [], names = new Set(c.bank.map((b) => b.name)), real = c.issues.filter((i) => i.correct);
  if (!real.length) errs.push("no real issues");
  if (c.issues.filter((i) => !i.correct).length < 1) errs.push("needs at least one red-herring issue");
  if (!sentences(c).some((s) => s.why)) errs.push("no material facts marked");
  for (const i of c.issues) if (!i.why || i.why.length < 30) errs.push(`${i.id}: needs a reason`);
  for (const i of real) {
    if (!i.core?.length) errs.push(`${i.id}: no core authority`);
    for (const n of [...(i.core || []), ...(i.support || [])]) if (!names.has(n)) errs.push(`${i.id}: "${n}" isn't in the bank`);
    if (!i.rule || i.rule.length < 60) errs.push(`${i.id}: needs a rule statement`);
    if ((i.points || []).length < 3) errs.push(`${i.id}: needs at least 3 application points`);
    for (const p of i.points || []) if (!p.cues?.length || p.cues.some((g) => !g.length)) errs.push(`${i.id}: empty cue group in "${p.text.slice(0, 30)}"`);
    if (i.conclusion?.options.filter((o) => o.correct).length !== 1) errs.push(`${i.id}: conclusion needs exactly one right option`);
    if (!i.lessons?.length) errs.push(`${i.id}: no lessons to revisit`);
  }
  const used = new Set(real.flatMap((i) => [...i.core, ...(i.support || [])]));
  if (c.bank.filter((b) => !used.has(b.name)).length < 2) errs.push("the bank needs at least two authorities that don't apply");
  for (const b of c.bank) if (!b.cite || !b.gist) errs.push(`${b.name}: needs a citation and a gist`);
  if (c.advice?.options.filter((o) => o.correct).length !== 1) errs.push("advice needs exactly one right option");
  if (!c.rubric?.length || c.rubric.length > 12) errs.push("rubric needs 1 to 12 criteria");
  if (!c.model || c.model.length < 400) errs.push("needs a model answer");
  return errs;
}

// ---------- the interface ----------
const pct = (x) => `${Math.round((x || 0) * 100)}%`;
const bar = (x) => `<span class="rx-bar" aria-hidden="true"><i style="width:${pct(x)}"></i></span>`;
const band = (x) => (x >= 0.8 ? "ok" : x >= 0.5 ? "part" : "no");
const order = (n, seed) => { let s = [...String(seed)].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) >>> 0, 7); const idx = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { s = (s * 1664525 + 1013904223) >>> 0; const j = s % (i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; } return idx; };

export function mount(el, c, ctx = {}) {
  const fresh = () => ({ stage: 0, facts: [], issues: [], auth: {}, apply: {}, concl: {}, advice: null, confidence: null, shown: {} });
  let A = (() => { try { const d = ctx.draft?.("state"); return d ? JSON.parse(d) : fresh(); } catch { return fresh(); } })();
  const keep = () => ctx.draft?.("state", JSON.stringify(A));
  const real = c.issues.filter((i) => i.correct), issue = (id) => c.issues.find((i) => i.id === id);
  const all = sentences(c), byS = Object.fromEntries(all.map((s) => [s.id, s]));
  let recorded = false;

  const factsPanel = () => `<aside class="rx-file" aria-label="The client's facts"><div class="rx-filehead"><span class="co-kicker">${esc(c.area)} · ${esc(c.jurisdiction)}</span><h4>${esc(c.title)}</h4></div>
    ${A.stage === 0 ? `<p class="rx-tip">Select each sentence that states a <b>material fact</b>: one that could change the legal answer.</p>` : ""}
    <div class="rx-facts">${c.facts.map((p, pi) => `<p>${p.map(([t], si) => { const id = `${pi}.${si}`, on = A.facts.includes(id), rev = A.stage > 0;
      const cls = [on ? "on" : "", rev && byS[id].why ? "mat" : "", rev && on && !byS[id].why ? "extra" : ""].join(" ");
      return A.stage === 0 ? `<button type="button" class="rx-s ${cls}" data-s="${id}" aria-pressed="${on}">${esc(t)}</button> ` : `<span class="rx-s ${cls}"${rev && byS[id].why ? ` title="${esc(byS[id].why)}"` : ""}>${esc(t)}</span> `; }).join("")}</p>`).join("")}</div>
    ${A.stage > 0 ? `<p class="rx-legend"><span class="rx-s mat">material</span> <span class="rx-s on">you marked</span></p>` : ""}
    ${notebook()}</aside>`;
  // the student's IRAC notebook, built up as they go
  const notebook = () => {
    if (A.stage < 2) return "";
    const rows = real.map((i) => `<li><b>${esc(i.label)}</b>${(A.auth[i.id] || []).length ? `<small>${esc(A.auth[i.id].join("; "))}</small>` : ""}${A.concl[i.id] != null ? `<small>→ ${esc(i.conclusion.options[A.concl[i.id]].t)}</small>` : ""}</li>`).join("");
    return `<div class="rx-note"><h4>Your analysis</h4><ol>${rows}</ol></div>`;
  };
  const stepper = () => `<ol class="rx-steps" aria-label="Stages">${STAGES.map((s, i) => `<li class="${i < A.stage ? "done" : i === A.stage ? "now" : ""}"${i === A.stage ? ' aria-current="step"' : ""}><span>${i + 1}</span>${esc(s)}</li>`).join("")}</ol>`;

  const stageHtml = () => {
    switch (A.stage) {
      case 0: return `<h3>1. Read the facts and mark what matters</h3><p class="rx-brief">${inline(c.brief)}</p>
        <p>Read the client's account on the right. Select every sentence containing a fact that could affect the legal outcome. You'll see which facts were material before moving on.</p>
        <p class="rx-count">${A.facts.length} ${A.facts.length === 1 ? "sentence" : "sentences"} marked</p>
        ${A.shown.facts ? factsFeedback() : `<button type="button" class="btn btn-light lg btn-sm" data-check="facts"><span>Check my facts</span></button>`}`;
      case 1: return `<h3>2. Identify the legal issues</h3><p>Which legal questions do these facts raise? Choose every issue you would need to deal with in your advice. Some options are red herrings.</p>
        <fieldset class="rx-pick" ${A.shown.issues ? "disabled" : ""}><legend class="sr-only">Issues</legend>${order(c.issues.length, c.id).map((k) => { const i = c.issues[k]; return `<label class="${A.shown.issues ? (i.correct ? "ok" : A.issues.includes(i.id) ? "no" : "") : ""}"><input type="checkbox" data-i="${esc(i.id)}" ${A.issues.includes(i.id) ? "checked" : ""}><span>${inline(i.label)}${A.shown.issues ? `<small>${i.correct ? "A real issue. " : "Not an issue here. "}${inline(i.why)}</small>` : ""}</span></label>`; }).join("")}</fieldset>
        ${A.shown.issues ? issuesFeedback() : `<button type="button" class="btn btn-light lg btn-sm" data-check="issues"><span>Check my issues</span></button>`}`;
      case 2: return `<h3>3. Find the governing authorities</h3><p>For each issue, choose the cases and statutes that state the rule you'll apply. Choose only the ones you'd actually rely on: irrelevant authorities weaken an answer.</p>
        ${real.map((i) => `<section class="rx-issue"><h4>${esc(i.label)}</h4><div class="rx-bank">${order(c.bank.length, `${c.id}${i.id}`).map((k) => { const b = c.bank[k], on = (A.auth[i.id] || []).includes(b.name), m = A.shown.auth ? markAuthorities(i, A.auth[i.id]) : null;
          const cls = m ? (i.core.includes(b.name) ? (on ? "ok" : "miss") : (i.support || []).includes(b.name) ? (on ? "ok" : "") : on ? "no" : "") : "";
          return `<label class="${cls}"><input type="checkbox" data-a="${esc(i.id)}" value="${esc(b.name)}" ${on ? "checked" : ""} ${A.shown.auth ? "disabled" : ""}><span><b>${esc(b.name)}</b> <small>${esc(b.cite)}</small>${m && (on || i.core.includes(b.name) || (i.support || []).includes(b.name)) ? `<small class="rx-gist">${inline(b.gist)}${i.core.includes(b.name) ? " <em>Key authority for this issue.</em>" : (i.support || []).includes(b.name) ? " <em>Supporting.</em>" : " <em>Not relevant to this issue.</em>"}</small>` : ""}</span></label>`; }).join("")}</div>
          ${A.shown.auth ? `<p class="rx-rule"><b>The rule:</b> ${inline(i.rule)}</p>` : ""}</section>`).join("")}
        ${A.shown.auth ? next("Continue to application") : `<button type="button" class="btn btn-light lg btn-sm" data-check="auth"><span>Check my authorities</span></button>`}`;
      case 3: return `<h3>4. Apply the law to the facts</h3><p>For each issue, state the rule briefly and apply it to <b>these</b> facts: say which facts satisfy (or fail) each element, and why. Deal with the strongest counter-argument. Aim for a short paragraph or two per issue.</p>
        ${real.map((i) => `<section class="rx-issue"><h4>${esc(i.label)}</h4><label class="sr-only" for="rx-ap-${esc(i.id)}">Your application for ${esc(i.label)}</label>
          <textarea id="rx-ap-${esc(i.id)}" class="aq-text" rows="7" data-ap="${esc(i.id)}" placeholder="Rule: … Application: on these facts … Counter-argument: … So …">${esc(A.apply[i.id] || "")}</textarea><small class="rx-wc" data-wc="${esc(i.id)}"></small></section>`).join("")}
        ${next("Continue to conclusions")}`;
      case 4: return `<h3>5. Conclude and advise</h3>
        ${real.map((i) => `<section class="rx-issue"><h4>${esc(i.label)}</h4><p>${inline(i.conclusion.q)}</p><div class="rx-opts">${order(i.conclusion.options.length, `${c.id}c${i.id}`).map((k) => `<label><input type="radio" name="rx-c-${esc(i.id)}" data-c="${esc(i.id)}" value="${k}" ${A.concl[i.id] === k ? "checked" : ""}><span>${inline(i.conclusion.options[k].t)}</span></label>`).join("")}</div></section>`).join("")}
        <section class="rx-issue"><h4>Your advice</h4><p>${inline(c.advice.q)}</p><div class="rx-opts">${order(c.advice.options.length, `${c.id}adv`).map((k) => `<label><input type="radio" name="rx-adv" data-adv value="${k}" ${A.advice === k ? "checked" : ""}><span>${inline(c.advice.options[k].t)}</span></label>`).join("")}</div></section>
        <section class="rx-issue"><h4>How confident are you in your advice?</h4><div class="rx-opts rx-row">${[[1, "Guessing"], [2, "Unsure"], [3, "Confident"]].map(([v, t]) => `<label><input type="radio" name="rx-conf" data-conf value="${v}" ${A.confidence === v ? "checked" : ""}><span>${t}</span></label>`).join("")}</div></section>
        <button type="button" class="btn btn-light lg btn-sm" data-finish ${real.every((i) => A.concl[i.id] != null) && A.advice != null ? "" : "disabled"}><span>Finish and see feedback</span></button>`;
      default: return feedbackReport();
    }
  };
  const next = (label) => `<button type="button" class="btn btn-light lg btn-sm" data-next><span>${esc(label)} →</span></button>`;

  const factsFeedback = () => { const m = markFacts(c, A.facts); return `<div class="sx-feedback ${band(m.score)}" role="status"><b>${m.hits.length} of ${m.hits.length + m.missed.length} material facts found${m.extra.length ? `, ${m.extra.length} not material` : ""}</b>
    <ul class="rx-why">${sentences(c).filter((s) => s.why).map((s) => `<li class="${A.facts.includes(s.id) ? "ok" : "miss"}">${A.facts.includes(s.id) ? "✓" : "Missed:"} “${esc(s.t)}” <small>${inline(s.why)}</small></li>`).join("")}</ul></div>${next("Continue to issues")}`; };
  const issuesFeedback = () => { const m = markIssues(c, A.issues); return `<div class="sx-feedback ${band(m.score)}" role="status"><b>${m.hits.length} of ${real.length} issues found${m.wrong.length ? `, ${m.wrong.length} red ${m.wrong.length === 1 ? "herring" : "herrings"}` : ""}</b><p>${m.missed.length ? "You'll work through every real issue from here, including the ones you missed." : "You found every issue. Now find the law for each."}</p></div>${next("Continue to authorities")}`; };

  function feedbackReport() {
    const r = report(c, A), weak = DIMS.filter((d) => r.dims[d.key] < 0.6);
    const lessons = [...new Set(r.per.filter((p) => p.application.score < 0.6 || p.authority.score < 0.6 || p.conclusion.score < 1).flatMap((p) => issue(p.id).lessons))];
    return `<h3>Feedback on your reasoning</h3>
      <div class="rx-score"><b>${pct(r.overall)}</b><span>overall${r.confidence ? ` · you said you were ${["", "guessing", "unsure", "confident"][r.confidence]}` : ""}</span></div>
      ${r.confidence === 3 && r.advice.score === 0 ? `<p class="sx-feedback no">You were confident, but your advice wasn't the best available. Look at which issue led you there: overconfidence is worth correcting before an exam.</p>` : ""}
      <table class="rx-dims"><caption class="sr-only">Your reasoning by dimension</caption><tbody>${DIMS.map((d) => `<tr class="${band(r.dims[d.key])}"><th scope="row">${esc(d.label)}<small>${esc(d.what)}</small></th><td>${bar(r.dims[d.key])}</td><td>${pct(r.dims[d.key])}</td></tr>`).join("")}</tbody></table>
      ${r.per.map((p) => { const i = issue(p.id), ap = p.application;
        return `<section class="rx-issue rx-fb"><h4>${esc(i.label)}</h4>
        <p><b>Authorities:</b> ${p.authority.hits.length ? `found ${esc(p.authority.hits.join(", "))}` : "none of the key authorities"}${p.authority.missed.length ? `; missed ${esc(p.authority.missed.join(", "))}` : ""}${p.authority.irrelevant.length ? `; not relevant: ${esc(p.authority.irrelevant.join(", "))}` : ""}.</p>
        <p><b>Application</b> (key points a strong answer makes; detected automatically, so check your own wording)${ap.short ? ` <em>Your answer is very short (${ap.words} words): explain how each fact meets the rule.</em>` : ""}</p>
        <ul class="rx-points">${i.points.map((pt, k) => `<li class="${ap.found[k] ? "ok" : "miss"}">${ap.found[k] ? "✓" : "○"} ${inline(pt.text)}</li>`).join("")}</ul>
        <p><b>Conclusion:</b> ${p.conclusion.score ? "✓ " : ""}${inline(i.conclusion.options[p.conclusion.right].t)} <small>${inline(i.conclusion.options[p.conclusion.right].why || "")}</small></p></section>`; }).join("")}
      <section class="rx-issue rx-fb"><h4>Advice</h4><p>${r.advice.score ? "✓ " : ""}${inline(c.advice.options[r.advice.right].t)}</p><p><small>${inline(c.advice.options[r.advice.right].why || "")}</small></p></section>
      ${weak.length ? `<p class="rx-next"><b>Work on next:</b> ${weak.map((d) => esc(d.label.toLowerCase())).join(", ")}.</p>` : `<p class="rx-next"><b>Strong reasoning.</b> Try another case, or attempt this one again in a week without notes.</p>`}
      ${lessons.length && ctx.lessonHref ? `<p class="rx-next"><b>Lessons to revisit:</b> ${lessons.map((l) => `<a href="${ctx.lessonHref(l)}">${esc(ctx.lessonTitle?.(l) || l)}</a>`).join(" · ")}</p>` : ""}
      <details class="rx-model"><summary>Model answer</summary>${c.model.split("\n").filter(Boolean).map((x) => `<p>${inline(x)}</p>`).join("")}</details>
      <div class="rx-ai"><h4>Detailed feedback from the tutor</h4><p>The automatic marking checks for key points. For feedback on your actual reasoning and wording against the full rubric, ask Gradify AI. Its feedback is provisional study help.</p>
        <button type="button" class="btn btn-ghost lg btn-sm" data-ai><span>Get AI feedback</span></button><div class="rx-aiout"></div></div>
      ${c.review?.verified ? "" : `<p class="sx-banner">This case is awaiting review by a qualified lawyer. ${inline(c.review?.note || "")}</p>`}
      <button type="button" class="btn btn-ghost lg btn-sm" data-restart><span>Start the case again</span></button>`;
  }

  // one attempt record per marked part (once per completed run)
  function recordRun() {
    if (recorded || !ctx.record) return; recorded = true;
    const r = report(c, A), lead = real[0]?.lessons?.[0] || null;
    ctx.record("facts", { type: "multi", d: 2, score: r.facts.score, response: A.facts, lesson: lead });
    ctx.record("issues", { type: "multi", d: 3, score: r.issues.score, response: A.issues, lesson: lead });
    for (const p of r.per) {
      const l = issue(p.id).lessons[0];
      ctx.record(`${p.id}:authorities`, { type: "multi", d: 2, score: p.authority.score, response: A.auth[p.id] || [], lesson: l });
      ctx.record(`${p.id}:application`, { type: "reasoning", d: 3, score: p.application.score, response: A.apply[p.id] || "", lesson: l, status: "provisional" });
      ctx.record(`${p.id}:conclusion`, { type: "reasoning", d: 3, score: p.conclusion.score, response: A.concl[p.id], lesson: l });
    }
    ctx.record("advice", { type: "reasoning", d: 3, score: r.advice.score, response: A.advice, lesson: lead });
    ctx.finish?.(r.overall);
  }

  const paint = () => {
    el.innerHTML = `<div class="rx">${c.banner ? `<p class="sx-banner" role="note">${inline(c.banner)}</p>` : ""}
      <div class="rx-head"><span class="co-kicker">Legal reasoning · ${esc(c.area)}</span><h2>${esc(c.title)}</h2></div>${stepper()}
      <div class="rx-body"><section class="rx-work" aria-live="polite">${stageHtml()}</section>${factsPanel()}</div></div>`;
    wire();
  };
  const go = (n) => { A.stage = n; keep(); paint(); el.querySelector(".rx-work h3")?.setAttribute("tabindex", "-1"); el.querySelector(".rx-work h3")?.focus(); };
  function wire() {
    el.querySelectorAll("[data-s]").forEach((b) => b.addEventListener("click", () => { const id = b.dataset.s; A.facts = A.facts.includes(id) ? A.facts.filter((x) => x !== id) : [...A.facts, id]; keep(); paint(); }));
    el.querySelectorAll("[data-i]").forEach((b) => b.addEventListener("change", () => { A.issues = [...el.querySelectorAll("[data-i]:checked")].map((x) => x.dataset.i); keep(); }));
    el.querySelectorAll("[data-a]").forEach((b) => b.addEventListener("change", () => { const id = b.dataset.a; A.auth[id] = [...el.querySelectorAll(`[data-a="${CSS.escape(id)}"]:checked`)].map((x) => x.value); keep(); }));
    el.querySelectorAll("[data-ap]").forEach((t) => { const wc = el.querySelector(`[data-wc="${CSS.escape(t.dataset.ap)}"]`); const upd = () => { wc.textContent = `${t.value.trim().split(/\s+/).filter(Boolean).length} words`; }; upd(); t.addEventListener("input", () => { A.apply[t.dataset.ap] = t.value; upd(); keep(); }); });
    el.querySelectorAll("[data-c]").forEach((b) => b.addEventListener("change", () => { A.concl[b.dataset.c] = Number(b.value); keep(); toggleFinish(); }));
    el.querySelectorAll("[data-adv]").forEach((b) => b.addEventListener("change", () => { A.advice = Number(b.value); keep(); toggleFinish(); }));
    el.querySelectorAll("[data-conf]").forEach((b) => b.addEventListener("change", () => { A.confidence = Number(b.value); keep(); }));
    el.querySelectorAll("[data-check]").forEach((b) => b.addEventListener("click", () => { A.shown[b.dataset.check] = true; keep(); paint(); }));
    el.querySelector("[data-next]")?.addEventListener("click", () => go(A.stage + 1));
    el.querySelector("[data-finish]")?.addEventListener("click", () => { go(5); recordRun(); });
    el.querySelector("[data-restart]")?.addEventListener("click", () => { A = fresh(); recorded = false; keep(); paint(); });
    el.querySelector("[data-ai]")?.addEventListener("click", askAi);
  }
  const toggleFinish = () => { const f = el.querySelector("[data-finish]"); if (f) f.disabled = !(real.every((i) => A.concl[i.id] != null) && A.advice != null); };
  async function askAi(e) {
    const btn = e.currentTarget, out = el.querySelector(".rx-aiout");
    if (!ctx.ask) { out.innerHTML = `<p class="co-empty">AI feedback isn't available here.</p>`; return; }
    btn.disabled = true; out.innerHTML = `<p class="co-empty">The tutor is reading your analysis…</p>`;
    try {
      const { feedback } = await ctx.ask({ mode: "mark", task: { title: c.title, brief: c.brief, prompt: `${c.brief}\n\nFACTS:\n${c.facts.map((p) => p.map(([t]) => t).join(" ")).join("\n")}`, rubric: c.rubric, model: c.model }, answer: answerText(c, A) });
      out.innerHTML = `<ul class="rx-points">${feedback.criteria.map((x) => `<li class="${x.rating === "met" ? "ok" : x.rating === "partly" ? "part" : "miss"}"><b>${esc(x.criterion)}</b>: ${esc(x.rating)}. ${esc(x.comment)}</li>`).join("")}</ul>
        ${feedback.strengths?.length ? `<p><b>Strengths:</b> ${feedback.strengths.map(esc).join(" ")}</p>` : ""}${feedback.improve?.length ? `<p><b>To improve:</b> ${feedback.improve.map(esc).join(" ")}</p>` : ""}<p>${esc(feedback.summary || "")}</p>`;
      const sc = feedback.criteria.length ? feedback.criteria.reduce((a, x) => a + (x.rating === "met" ? 1 : x.rating === "partly" ? 0.5 : 0), 0) / feedback.criteria.length : 0;
      ctx.record?.("ai-review", { type: "reasoning", d: 3, score: sc, response: answerText(c, A), lesson: real[0]?.lessons?.[0], method: "ai-assisted", status: "provisional" });
    } catch (err) { out.innerHTML = err.signin && ctx.signinLine ? ctx.signinLine("AI feedback", "use the model answer and key points above") : `<p class="co-empty">${esc(err.message)}</p>`; }
    btn.disabled = false;
  }
  paint();
  if (A.stage === 5) recorded = true;   // a finished run reopened: don't record it twice
  return () => { el.innerHTML = ""; };
}
