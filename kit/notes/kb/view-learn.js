// Gradify Notes' learning tools: flashcards and quizzes written from a page (Gradify AI with an account, the browser
// extractor otherwise: kit/notes/engine.js), summaries, Guided Learning (a source turned into sections, each with a
// summary, clickable key terms, cards and a quiz, and mastery tracked per section), Ask your notes (answers quoted
// from the learner's own notes, kit/notes/kb/ask.js), import, export and sharing.
// Anything AI writes goes into the notes marked as generated, for the learner to check: it's never treated as
// authoritative just because it was generated.
import * as M from "./model.js";
import * as S from "./store.js";
import * as IO from "./io.js";
import { docText } from "./bridge.js";
import * as A from "./ask.js";

const { esc } = M;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const engine = () => import("../../notes/engine.js");
const level = (api) => api.ctx.profile?.level || "undergraduate";

export async function screen(kind, arg, main, api) {
  if (kind === "guided") return guided(main, api, arg);
  if (kind === "ask") return ask(main, api);
  if (kind === "io") return io(main, api);
  if (kind === "shared") return shared(main, api, arg);
}
async function sourceText(api, id) {
  const r = api.kb.rems[id];
  const own = docText(api.kb, id, 80_000);
  const pdf = r?.pdf?.file ? await S.getText(r.pdf.file) : "";
  return [pdf, own].filter(Boolean).join("\n\n").slice(0, 120_000);
}

// ---------- flashcards, quizzes and summaries from a page ----------
export async function generateCards(api, id) {
  const kb = api.kb, text = await sourceText(api, id);
  if (text.trim().length < 40) return api.toast(kb.rems[id]?.pdf ? "Open the PDF once first, so Gradify can read it, then try again." : "Write a few more notes here first: Gradify needs something to make cards from.");
  api.modal(`<h3>Writing flashcards…</h3><p class="sub">${api.ctx.store.mode === "cloud" ? "Gradify AI is reading this page." : "Working on this device."}</p><div class="loading" aria-busy="true"></div>`);
  let res;
  try { res = await (await engine()).generate({ text, title: M.nameOf(kb, id), site: api.ctx.site, level: level(api), store: api.ctx.store }); }
  catch (e) { api.closeModal(); return api.toast(esc(e.message)); }
  const have = new Set(M.cardsUnder(kb, id).map((c) => c.front.toLowerCase()));
  const cards = (res.cards || []).filter((c) => c.front && c.back && !have.has(String(c.front).toLowerCase()));
  if (!cards.length) { api.closeModal(); return api.toast("No new cards: everything here is already a card, or there wasn't enough to work with."); }
  api.modal(`<h3>${cards.length} suggested cards</h3><p class="sub">${res.engine === "claude" ? "Written by Gradify AI and checked against this page." : "Found on this device."} ${res.notice ? esc(res.notice) : ""} Untick any you don't want; you can edit them after.</p>
    <ul class="kb-sugg">${cards.map((c, i) => `<li><label class="check"><input type="checkbox" data-i="${i}" ${c.grounded === "no" ? "" : "checked"}> <span><b>${esc(c.front)}</b><em>${esc(c.back)}</em>${c.grounded === "no" ? '<span class="g-pill warn">Not found in your notes</span>' : ""}</span></label></li>`).join("")}</ul>
    <div class="row-actions"><button type="button" class="btn btn-primary lg btn-sm" id="kb-addsugg"><span>Add to my notes</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-close><span>Cancel</span></button></div>`, (el) => {
    $("#kb-addsugg", el).onclick = () => {
      const pick = $$("input[data-i]", el).filter((x) => x.checked).map((x) => cards[Number(x.dataset.i)]);
      if (!pick.length) return api.closeModal();
      api.change(() => {
        const h = M.create(kb, { parent: id, text: `Generated flashcards #[[Check me]]`, heading: 3, props: { Source: res.engine === "claude" ? "Gradify AI" : "Gradify (on this device)", Made: M.dayKey() } });
        for (const c of pick) M.create(kb, { parent: h.id, text: `${oneLine(c.front)} >> ${oneLine(c.back)}` });
      }, { draw: "tree" });
      api.closeModal();
      api.toast(`Added ${pick.length} cards under “Generated flashcards”. They're tagged #Check me until you've read them.`);
    };
  });
}
const oneLine = (s) => String(s).replace(/\s*\n\s*/g, " ").replace(/>>|<<|::|;;/g, "–").trim();
/** A multiple-choice quiz from the cards on a page: the other cards' answers are the wrong options. */
export function quiz(api, id, { onDone } = {}) {
  const kb = api.kb;
  const pool = M.cardsUnder(kb, id).filter((c) => ["basic", "concept", "descriptor", "reverse", "table", "cloze"].includes(c.type) && c.back.length < 220);
  if (pool.length < 4) return api.toast("A quiz needs at least four flashcards here. Add some, or use Generate flashcards first.");
  const qs = [...pool].sort(() => Math.random() - 0.5).slice(0, 10).map((c) => {
    const right = c.type === "cloze" ? c.answer : c.back;
    const wrong = [...new Set(pool.filter((x) => x.id !== c.id).map((x) => (x.type === "cloze" ? x.answer : x.back)).filter((b) => b && b !== right))].sort((a, b) => Math.abs(a.length - right.length) - Math.abs(b.length - right.length)).slice(0, 3);
    return { c, q: c.front, right, opts: [right, ...wrong].sort(() => Math.random() - 0.5) };
  });
  let i = 0, score = 0;
  const wrongs = [];
  const el = api.modal(`<div id="kb-quiz"></div>`);
  const draw = () => {
    const box = $("#kb-quiz", el);
    if (i >= qs.length) {
      box.innerHTML = `<h3>${score} out of ${qs.length}</h3><p class="sub">${score === qs.length ? "Every one right." : "Worth another look:"}</p><ul class="kb-quiz-wrong">${wrongs.map((w) => `<li><b>${esc(w.q)}</b><span>${esc(w.right)}</span></li>`).join("")}</ul><div class="row-actions"><button type="button" class="btn btn-light lg btn-sm" id="kq-again"><span>Again</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-close><span>Done</span></button></div>`;
      $("#kq-again", box).onclick = () => quiz(api, id, { onDone });
      onDone?.(score / qs.length);
      return;
    }
    const x = qs[i];
    box.innerHTML = `<p class="sub">Question ${i + 1} of ${qs.length}</p><h3 class="kb-quiz-q">${esc(x.q)}</h3><div class="kb-quiz-opts">${x.opts.map((o, k) => `<button type="button" class="btn btn-ghost lg" data-k="${k}"><span>${esc(o)}</span></button>`).join("")}</div>`;
    box.onclick = (e) => {
      const b = e.target.closest("[data-k]"); if (!b || box.dataset.lock) return;
      box.dataset.lock = "1";
      const ok = x.opts[Number(b.dataset.k)] === x.right;
      if (ok) score++; else wrongs.push(x);
      $$("[data-k]", box).forEach((btn) => btn.classList.add(x.opts[Number(btn.dataset.k)] === x.right ? "right" : btn === b ? "wrong" : "dim"));
      setTimeout(() => { delete box.dataset.lock; i++; draw(); }, ok ? 650 : 1500);
    };
  };
  draw();
}
export async function summarise(api, id) {
  const kb = api.kb, text = await sourceText(api, id);
  if (text.trim().length < 80) return api.toast("There isn't enough here to summarise yet.");
  api.modal(`<h3>Summarising…</h3><div class="loading" aria-busy="true"></div>`);
  let res;
  try { res = await (await engine()).generate({ text, title: M.nameOf(kb, id), site: api.ctx.site, level: level(api), store: api.ctx.store }); }
  catch (e) { api.closeModal(); return api.toast(esc(e.message)); }
  const p = res.pack || {};
  const topics = (p.topics || []).slice(0, 8);
  api.modal(`<h3>Summary</h3><p>${esc(p.summary || "")}</p>${topics.map((t) => `<h4>${esc(t.name)}</h4><ul>${(t.facts || []).filter((f) => f.importance !== "bonus").slice(0, 5).map((f) => `<li>${esc(f.statement)}</li>`).join("")}</ul>`).join("")}
    <p class="sub">${res.engine === "claude" ? "Written by Gradify AI from this page." : "Put together on this device from this page."} Check it against your notes.</p>
    <div class="row-actions"><button type="button" class="btn btn-primary lg btn-sm" id="kb-addsum"><span>Add to the top of the page</span></button></div>`, (el) => {
    $("#kb-addsum", el).onclick = () => {
      api.change(() => {
        const h = M.create(kb, { parent: id, index: 0, text: "Summary #[[Check me]]", heading: 2 });
        if (p.summary) M.create(kb, { parent: h.id, text: p.summary });
        for (const t of topics) { const tt = M.create(kb, { parent: h.id, text: `**${t.name}**` }); for (const f of (t.facts || []).filter((f) => f.importance !== "bonus").slice(0, 5)) M.create(kb, { parent: tt.id, text: f.statement }); }
      }, { draw: "tree" });
      api.closeModal();
    };
  });
}

// ---------- Guided Learning ----------
// A source (a PDF, or any document) becomes sections. Each has a summary, key terms you can click, its own flashcards
// and a quiz; how familiar the learner says they are changes the order the steps come in, not what's made.
const ORDER = { new: ["read", "cards", "quiz"], some: ["cards", "read", "quiz"], know: ["quiz", "read", "cards"] };
async function guided(main, api, id) {
  const kb = api.kb, r = kb.rems[id];
  if (!r) { main.innerHTML = `<div class="kb-empty"><h2>Nothing to learn from here</h2></div>`; return; }
  const G = (kb.settings.guided ||= {});
  const g = G[id];
  const text = await sourceText(api, id);
  if (!g?.sections) {
    main.innerHTML = `<div class="kb-screen"><a class="back" href="#/notes/${id}">← ${esc(M.nameOf(kb, id))}</a><div class="deck-head"><div><span class="kicker lo-kicker">Guided learning</span><h1>${esc(M.nameOf(kb, id))}</h1><p class="sub">Gradify splits this into sections. Each has a short summary, its key terms, flashcards and a quiz, and you see how well you know each section as you go.</p></div></div>
      ${text.trim().length < 200 ? `<p class="kb-warn">${r.pdf ? "Open the PDF once so Gradify can read its text, then come back." : "There isn't much here yet. Add notes or import a PDF to this document first."}</p>` : ""}
      <form class="panel glass kb-form-col" id="g-start"><h3>How well do you know this already?</h3>
        ${[["new", "It's new to me", "Read each section first, then cards, then a quiz"], ["some", "I've seen some of it", "Cards first, then read what you missed"], ["know", "I know it fairly well", "Quiz first, to find the gaps"]].map(([v, t, d], i) => `<label class="kb-radio"><input type="radio" name="fam" value="${v}" ${i === 0 ? "checked" : ""}> <span><b>${t}</b><em>${d}</em></span></label>`).join("")}
        <button class="btn btn-primary lg" ${text.trim().length < 200 ? "disabled" : ""}><span>Prepare the sections</span></button><p class="sub">${api.ctx.store.mode === "cloud" ? "Gradify AI reads the source (uses your Gradify AI allowance)." : "Prepared on this device. Signed in, Gradify AI writes richer sections."}</p></form></div>`;
    $("#g-start", main).addEventListener("submit", async (e) => {
      e.preventDefault();
      const fam = e.target.fam.value;
      e.target.querySelector("button").disabled = true; e.target.querySelector("button span").textContent = "Preparing…";
      try {
        const res = await (await engine()).generate({ text, title: M.nameOf(kb, id), site: api.ctx.site, level: level(api), store: api.ctx.store });
        const topics = (res.pack?.topics || []).filter((t) => t.facts?.length);
        if (!topics.length) throw new Error("Gradify couldn't find sections in this source.");
        G[id] = { fam, made: Date.now(), engine: res.engine, summary: res.pack.summary || "", sections: topics.slice(0, 16).map((t) => ({ name: t.name, theme: t.theme || "", mnemonic: t.mnemonic || "", terms: t.facts.slice(0, 14).map((f) => ({ term: f.term || "", def: f.statement, page: f.page || null, quote: f.quote || "" })), questions: (t.questions || []).slice(0, 4).map((q) => ({ q: q.question, a: q.answer })), progress: {} })) };
        api.save();
        guided(main, api, id);
      } catch (err) { api.toast(esc(err.message)); e.target.querySelector("button").disabled = false; e.target.querySelector("button span").textContent = "Prepare the sections"; }
    });
    return;
  }
  const at = Number(location.hash.split("/")[4] ?? -1);
  const sec = g.sections[at];
  const mastery = (s) => { const p = s.progress || {}; return Math.min(1, (p.read ? 0.2 : 0) + 0.5 * (p.quiz || 0) + 0.3 * (p.cards || 0)); };
  const total = g.sections.reduce((a, s) => a + mastery(s), 0) / g.sections.length;
  const guide = g.guide && kb.rems[g.guide] ? g.guide : null;
  if (!sec) {
    main.innerHTML = `<div class="kb-screen"><a class="back" href="#/notes/${id}">← ${esc(M.nameOf(kb, id))}</a><div class="deck-head"><div><span class="kicker lo-kicker">Guided learning</span><h1>${esc(M.nameOf(kb, id))}</h1><p class="sub">${esc(g.summary)}</p></div><div class="row-actions">${guide ? `<a class="btn btn-ghost lg" href="#/notes/${guide}"><span>Study guide</span></a>` : `<button type="button" class="btn btn-ghost lg" id="g-guide"><span>Make a study guide</span></button>`}</div></div>
      <div class="kb-stats"><div class="panel glass"><span class="sub">Overall</span><b>${Math.round(total * 100)}%</b><span class="goal-bar"><i style="width:${total * 100}%"></i></span></div><div class="panel glass"><span class="sub">Sections</span><b>${g.sections.filter((s) => mastery(s) >= 0.8).length} <small>/ ${g.sections.length} mastered</small></b></div></div>
      <ol class="kb-sections">${g.sections.map((s, i) => `<li><a href="#/notes/guided/${id}/${i}"><b>${esc(s.name)}</b><span class="sub">${s.terms.length} key terms${s.progress?.quiz != null ? ` · quiz ${Math.round(s.progress.quiz * 100)}%` : ""}</span><span class="goal-bar"><i style="width:${mastery(s) * 100}%"></i></span></a></li>`).join("")}</ol>
      <p class="sub">${g.engine === "claude" ? "Sections written by Gradify AI from your source." : "Sections found on this device."} <button type="button" class="kb-linkbtn" id="g-redo">Start again</button></p></div>`;
    $("#g-guide", main)?.addEventListener("click", () => { makeGuide(api, id); guided(main, api, id); });
    $("#g-redo", main).onclick = () => { if (confirm("Prepare the sections again? Your section progress resets.")) { delete G[id]; api.save(); guided(main, api, id); } };
    return;
  }
  const steps = ORDER[g.fam] || ORDER.new, p = (sec.progress ||= {});
  const terms = sec.terms.filter((t) => t.term);
  main.innerHTML = `<div class="kb-screen kb-guided"><a class="back" href="#/notes/guided/${id}">← All sections</a>
    <div class="deck-head"><div><span class="kicker lo-kicker">Section ${at + 1} of ${g.sections.length}</span><h1>${esc(sec.name)}</h1></div><span class="goal-bar kb-g-bar" title="${Math.round(mastery(sec) * 100)}%"><i style="width:${mastery(sec) * 100}%"></i></span></div>
    <ol class="kb-steps">${steps.map((s, i) => `<li class="${p[s] != null ? "done" : ""}"><b>${i + 1}</b>${{ read: "Read", cards: "Flashcards", quiz: "Quiz" }[s]}</li>`).join("")}</ol>
    ${steps.map((s) => ({
      read: `<article class="panel glass"><h3>Summary</h3>${sec.theme ? `<p>${esc(sec.theme)}</p>` : ""}<ul class="kb-g-facts">${sec.terms.map((t) => `<li>${t.term ? `<button type="button" class="kb-term" data-term="${esc(t.term)}">${esc(t.term)}</button>: ` : ""}${esc(t.def)}${t.page && kb.rems[id].pdf ? ` <a class="kb-src" href="#/notes/pdf/${id}/${t.page}">p. ${t.page}</a>` : ""}</li>`).join("")}</ul>${sec.mnemonic ? `<p class="sub">Memory hook: ${esc(sec.mnemonic)}</p>` : ""}<div class="kb-g-ask"><input id="g-q" placeholder="Ask about this section" aria-label="Ask about this section"><button type="button" class="btn btn-ghost lg btn-sm" id="g-qb"><span>Ask</span></button></div><div id="g-a"></div><button type="button" class="btn btn-light lg btn-sm" data-step="read"><span>${p.read ? "Read ✓" : "I've read this"}</span></button></article>`,
      cards: `<article class="panel glass"><h3>Flashcards</h3><p class="sub">${terms.length + sec.questions.length} cards for this section${guide ? ", in your study guide" : ""}. They join your spaced repetition, so they come back before you forget them.</p><button type="button" class="btn btn-light lg btn-sm" data-step="cards"><span>${guide ? "Practise this section" : "Add to my notes and practise"}</span></button>${p.cards != null ? `<p class="sub">Recall so far: ${Math.round(p.cards * 100)}%</p>` : ""}</article>`,
      quiz: `<article class="panel glass"><h3>Quiz</h3><p class="sub">Check you understand it, and find the gaps.</p><button type="button" class="btn btn-light lg btn-sm" data-step="quiz"><span>${p.quiz != null ? `Again (last: ${Math.round(p.quiz * 100)}%)` : "Start the quiz"}</span></button></article>`,
    })[s]).join("")}
    <div class="row-actions">${at > 0 ? `<a class="btn btn-ghost lg btn-sm" href="#/notes/guided/${id}/${at - 1}"><span>← Previous</span></a>` : ""}${at < g.sections.length - 1 ? `<a class="btn btn-primary lg btn-sm" href="#/notes/guided/${id}/${at + 1}"><span>Next section →</span></a>` : `<a class="btn btn-primary lg btn-sm" href="#/notes/guided/${id}"><span>Finish</span></a>`}</div></div>`;
  const savep = (patch) => { Object.assign(p, patch); api.save(); };
  main.addEventListener("click", async (e) => {
    const t = e.target.closest("[data-term]")?.dataset.term;
    if (t) { const f = sec.terms.find((x) => x.term === t); api.modal(`<h3>${esc(t)}</h3><p>${esc(f.def)}</p>${f.quote ? `<blockquote>“${esc(f.quote)}”</blockquote>` : ""}${f.page && kb.rems[id].pdf ? `<a class="btn btn-ghost lg btn-sm" href="#/notes/pdf/${id}/${f.page}"><span>See page ${f.page}</span></a>` : ""}`); return; }
    const s = e.target.closest("[data-step]")?.dataset.step; if (!s) return;
    if (s === "read") { savep({ read: true }); guided(main, api, id); }
    if (s === "cards") {
      const gid = guide || makeGuide(api, id);
      const head = M.kidsOf(kb, gid).find((k) => k.guidedSection === at);
      savep({ cards: p.cards ?? 0 });
      if (head) api.practise(head.id, "all");
    }
    if (s === "quiz") {
      const gid = guide || makeGuide(api, id);
      const head = M.kidsOf(kb, gid).find((k) => k.guidedSection === at);
      if (head) quiz(api, head.id, { onDone: (score) => { savep({ quiz: Math.max(score, 0) }); } });
    }
  });
  $("#g-qb", main)?.addEventListener("click", () => {
    const q = $("#g-q", main).value; if (!q.trim()) return;
    const found = A.rank(sec.terms.map((t, i) => ({ id: `t${i}`, path: [sec.name], text: `${t.term ? `${t.term}: ` : ""}${t.def}` })), q, { limit: 3 });
    $("#g-a", main).innerHTML = found.length ? `<ul>${found.map((f) => `<li>${esc(f.text)}</li>`).join("")}</ul><p class="sub">From this section. <a href="#/notes/ask?q=${encodeURIComponent(q)}">Search all your notes</a></p>` : `<p class="sub">This section doesn't say. <a href="#/notes/ask?q=${encodeURIComponent(q)}">Search all your notes</a></p>`;
  });
}
/** The study guide: a document with each section's summary, key terms as concept cards and its questions as cards. */
function makeGuide(api, id) {
  const kb = api.kb, g = kb.settings.guided[id];
  const doc = api.change(() => {
    const d = M.create(kb, { parent: kb.rems[id].parent, index: (kb.rems[kb.rems[id].parent ?? ""]?.kids.indexOf(id) ?? -1) + 1, text: `Study guide: ${M.nameOf(kb, id)} #[[Check me]]`, doc: true, props: { Source: M.nameOf(kb, id), Made: g.engine === "claude" ? "Gradify AI" : "Gradify (on this device)" } });
    if (d.parent == null) { /* top level */ }
    M.create(kb, { parent: d.id, text: `From [[${id}]]. ${g.summary}`.trim() });
    g.sections.forEach((s, i) => {
      const h = M.create(kb, { parent: d.id, text: s.name, heading: 2, guidedSection: i });
      for (const t of s.terms) M.create(kb, { parent: h.id, text: t.term ? `${oneLine(t.term)} :: ${oneLine(t.def)}` : oneLine(t.def), ...(t.page && kb.rems[id].pdf ? { src: { kind: "pdf", rem: id, page: t.page } } : {}) });
      for (const q of s.questions) M.create(kb, { parent: h.id, text: `${oneLine(q.q)} >> ${oneLine(q.a)}` });
    });
    return d;
  }, { draw: "none" });
  g.guide = doc.id; api.save();
  api.toast(`Made <a href="#/notes/${doc.id}">the study guide</a>. Its cards are in your reviews.`);
  return doc.id;
}

// ---------- Ask your notes ----------
async function ask(main, api) {
  const kb = api.kb, q0 = decodeURIComponent((location.hash.split("?q=")[1] || "").replace(/\+/g, " "));
  main.innerHTML = `<div class="kb-screen"><div class="deck-head"><div><span class="kicker lo-kicker">Ask your notes</span><h1>Ask your notes</h1><p class="sub">Ask a question and Gradify finds where your own notes and PDFs answer it, with a link to each source. It only quotes what you've written or imported, so you can check every word.</p></div></div>
    <form class="kb-askform" id="ask-f"><input name="q" value="${esc(q0)}" placeholder="e.g. Where does the Krebs cycle happen?" aria-label="Your question" autofocus><button class="btn btn-primary lg"><span>Ask</span></button></form><div id="ask-out"></div></div>`;
  const pdfs = await Promise.all(Object.values(kb.rems).filter((r) => r.pdf?.file).map(async (r) => ({ r, t: await S.getText(r.pdf.file) })));
  const extra = pdfs.filter((x) => x.t).flatMap(({ r, t }) => t.split(/\n\[page (\d+)\]\n/).reduce((acc, part, i, arr) => { if (i % 2 === 1) acc.push({ id: `${r.id}@${part}`, doc: r.id, page: Number(part), path: [M.nameOf(kb, r.id), `page ${part}`], text: arr[i + 1] || "" }); return acc; }, []));
  const list = A.passages(kb, extra);
  const run = (q) => {
    const found = A.rank(list, q, { limit: 6 });
    const out = $("#ask-out", main);
    if (!found.length) { out.innerHTML = `<div class="kb-empty"><h2>Your notes don't seem to cover that</h2><p class="sub">Try other words, or add notes on it. <a href="#/learning">Your Gradify courses</a> may cover it.</p></div>`; return; }
    const ans = A.answer(found, q);
    const link = (p) => (p.page ? `#/notes/pdf/${p.doc}/${p.page}` : `#/notes/${p.doc}`);
    out.innerHTML = `${ans.length ? `<article class="panel glass kb-answer"><h3>From your notes</h3>${ans.map((a) => `<p>“${esc(a.s)}” <a class="kb-src" href="${link(found[a.pi])}">${esc(found[a.pi].path.slice(-2).join(" › "))}</a></p>`).join("")}</article>` : ""}
      <h2 class="lo-h">Where it's covered</h2><ul class="kb-found">${found.map((p) => `<li><a href="${link(p)}"><b>${esc(p.path.join(" › "))}</b></a><p>${esc(p.text.slice(0, 400))}${p.text.length > 400 ? "…" : ""}</p></li>`).join("")}</ul>`;
  };
  $("#ask-f", main).addEventListener("submit", (e) => { e.preventDefault(); const q = e.target.q.value.trim(); if (q) { history.replaceState(null, "", `#/notes/ask?q=${encodeURIComponent(q)}`); run(q); } });
  if (q0) run(q0);
}

// ---------- import and export ----------
const download = (name, text, type = "text/plain") => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: `${type};charset=utf-8` })); a.download = name; document.body.append(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000); };
const safe = (s) => String(s).replace(/[^\p{L}\p{N} _-]+/gu, "").trim().slice(0, 60) || "notes";
const FORMATS = [["md", "Markdown", "For Obsidian, Notion and most apps"], ["opml", "OPML", "For Workflowy, Dynalist, Logseq and RemNote"], ["html", "Web page", "To read, print or send"], ["txt", "Plain text", "Indented"], ["anki", "Anki", "The flashcards, to import in Anki"], ["csv", "CSV", "The flashcards, for a spreadsheet"], ["json", "Gradify Notes", "Everything, to bring back into Gradify"]];
function exportAs(api, id, f) {
  const kb = api.kb, n = safe(id ? M.nameOf(kb, id) : "Gradify Notes");
  if (f === "json") return download(`${n}.gradify.json`, JSON.stringify(IO.toNative(kb, id)), "application/json");
  if (!id) return;
  ({ md: () => download(`${n}.md`, IO.toMarkdown(kb, id), "text/markdown"), opml: () => download(`${n}.opml`, IO.toOPML(kb, id), "text/x-opml"), html: () => download(`${n}.html`, IO.toHTML(kb, id), "text/html"), txt: () => download(`${n}.txt`, IO.toText(kb, id)), anki: () => download(`${n} (Anki).txt`, IO.toAnki(kb, id)), csv: () => download(`${n} cards.csv`, IO.toCSV(kb, id), "text/csv") })[f]();
}
export function exportDialog(api, id) {
  api.modal(`<h3>Export “${esc(M.nameOf(api.kb, id))}”</h3><p class="sub">With everything inside it.</p><div class="kb-formats">${FORMATS.map(([f, t, d]) => `<button type="button" class="btn btn-ghost lg" data-f="${f}"><span><b>${t}</b><em>${d}</em></span></button>`).join("")}</div><p class="sub">Images and PDFs aren't included in these files (as in most note apps); the Gradify Notes format keeps their places for when you bring it back.</p>`, (el) => {
    el.addEventListener("click", (e) => { const f = e.target.closest("[data-f]")?.dataset.f; if (f) exportAs(api, id, f); });
  });
}
async function io(main, api) {
  const kb = api.kb;
  const pages = await import("../../tools/store.js").then((t) => t.pages()).catch(() => []);
  main.innerHTML = `<div class="kb-screen"><div class="deck-head"><div><span class="kicker lo-kicker">Import and export</span><h1>Bring notes in, take them out</h1><p class="sub">Your notes are yours. Bring them from other apps, and take everything out whenever you like.</p></div></div>
    <div class="lo-grid kb-two">
      <article class="panel glass"><h3>Import</h3><p class="sub">Markdown and Obsidian (.md: links stay links), OPML (Workflowy, Dynalist, Logseq, RemNote), text, CSV or a spreadsheet saved as CSV, Anki (File → Export → Notes in plain text), PDFs (and PowerPoint or Word saved as PDF), and Gradify Notes exports. You can choose several files.</p>
        <label class="btn btn-primary lg btn-sm kb-file"><input type="file" id="io-files" multiple accept=".md,.markdown,.txt,.opml,.xml,.csv,.tsv,.json,.pdf,text/*,application/pdf"><span>Choose files</span></label>
        <label>Put them in<select id="io-where"><option value="">New documents at the top level</option>${M.docTree(kb).map((d) => `<option value="${d.id}">${"— ".repeat(d.depth)}${esc(M.nameOf(kb, d.id))}</option>`).join("")}</select></label>
        <textarea id="io-paste" rows="5" placeholder="…or paste Markdown, an outline, or CSV here"></textarea><button type="button" class="btn btn-light lg btn-sm" id="io-pastego"><span>Import what I pasted</span></button>
        ${pages.length ? `<hr><p class="sub">You have ${pages.length} ${pages.length === 1 ? "page" : "pages"} in the Tools notebook.</p><button type="button" class="btn btn-ghost lg btn-sm" id="io-nb"><span>Bring my notebook pages in</span></button>` : ""}
        <p class="sub" id="io-msg" role="status"></p></article>
      <article class="panel glass"><h3>Export everything</h3><p class="sub">${Object.keys(kb.rems).length} bullets, ${M.allCards(kb).length} flashcards. The Gradify Notes file brings it all back exactly, with links, tags and settings.</p>
        <button type="button" class="btn btn-light lg btn-sm" id="io-all"><span>Download everything</span></button>
        <p class="sub">To export one document in another format, open it and choose ⋯ → Export.</p>
        <p class="sub">${S.status.mode === "cloud" ? `Synced to your account (${Math.round(S.sizeOf() / 1024)} KB of ${Math.round(S.MAX / 1024)} KB).` : "Kept on this device. Sign in to have your notes on every device."}</p></article>
    </div></div>`;
  const msg = (t) => { $("#io-msg", main).innerHTML = t; };
  const where = () => $("#io-where", main).value || null;
  const importText = (name, text) => {
    const ext = name.split(".").pop().toLowerCase();
    if (ext === "json") { const made = api.change(() => IO.fromNative(kb, JSON.parse(text), where()), { draw: "none" }); return made.length; }
    const items = ext === "opml" || ext === "xml" || /^\s*<\?xml|<opml/i.test(text) ? IO.fromOPML(text) : ext === "csv" || ext === "tsv" ? IO.fromCSV(text) : /^#separator:/m.test(text) ? IO.fromAnki(text) : IO.fromMarkdown(text);
    api.change(() => { const parent = where(); const d = M.create(kb, { parent, text: name.replace(/\.[^.]+$/, ""), doc: true }); IO.insertOutline(kb, d.id, items); }, { draw: "none" });
    return items.length;
  };
  $("#io-files", main).addEventListener("change", async (e) => {
    let n = 0; const files = [...e.target.files];
    for (const f of files) {
      try {
        if (/\.pdf$/i.test(f.name) || f.type === "application/pdf") { await (await import("./view-blocks.js")).importPdf(api, f, { parent: where() }); n++; continue; }
        n += importText(f.name, await f.text()) ? 1 : 0;
      } catch (err) { msg(`Couldn't import ${esc(f.name)}: ${esc(err.message)}`); }
    }
    if (n && !files.some((f) => /\.pdf$/i.test(f.name))) { msg(`Imported ${n} ${n === 1 ? "file" : "files"}. <a href="#/notes">See your notes</a>`); api.rerender?.(); }
  });
  $("#io-pastego", main).onclick = () => { const t = $("#io-paste", main).value; if (!t.trim()) return; const n = importText(/^[^,\n]+,[^,\n]+/.test(t) && !/^#/.test(t) ? "Pasted.csv" : "Pasted notes.md", t); msg(`Imported ${n} ${n === 1 ? "item" : "items"}.`); api.rerender?.(); };
  $("#io-nb", main)?.addEventListener("click", () => { api.change(() => { const f = M.create(kb, { parent: where(), text: "From my notebook", folder: true }); IO.insertOutline(kb, f.id, IO.fromNotebookPages(pages)); }, { draw: "none" }); msg(`Brought in ${pages.length} pages. The notebook is unchanged.`); api.rerender?.(); });
  $("#io-all", main).onclick = () => exportAs(api, null, "json");
}

// ---------- sharing ----------
export async function shareDialog(api, id) {
  const kb = api.kb, st = api.ctx.store;
  if (st.mode !== "cloud") return api.toast('Sign in to share notes. <a href="#/account">Sign in</a>');
  const mine = (await S.myShares(st).catch(() => [])).filter((s) => s.rem === id)[0];
  const url = (sid) => `${location.origin}${location.pathname}#/notes/shared/${sid}`;
  api.modal(`<h3>Share “${esc(M.nameOf(kb, id))}”</h3><p class="sub">Sharing publishes a copy of this document as it is now. Anyone with the link can read it and copy it into their own notes. Later edits stay private until you update the shared copy.</p>
    ${mine ? `<label>Link<input readonly value="${esc(url(mine.id))}" id="sh-url"></label><p class="sub">Shared ${new Date(mine.updated_at).toLocaleString("en-GB")}.</p><div class="row-actions"><button type="button" class="btn btn-light lg btn-sm" id="sh-copy"><span>Copy link</span></button><button type="button" class="btn btn-ghost lg btn-sm" id="sh-up"><span>Update the shared copy</span></button><button type="button" class="btn btn-ghost lg btn-sm" id="sh-stop"><span>Stop sharing</span></button></div>`
      : `<button type="button" class="btn btn-primary lg btn-sm" id="sh-go"><span>Create a link</span></button>`}`, (el) => {
    const publish = async (sid) => { try { const r = await S.share(st, { id: sid, rem: id, title: M.nameOf(kb, id), snapshot: IO.toNative(kb, id) }); api.closeModal(); await navigator.clipboard?.writeText(url(r.id)).catch(() => {}); api.toast(sid ? "Updated the shared copy." : "Link copied. Anyone with it can read this document."); } catch (e) { api.toast(esc(e.message)); } };
    $("#sh-go", el)?.addEventListener("click", () => publish(null));
    $("#sh-up", el)?.addEventListener("click", () => publish(mine.id));
    $("#sh-copy", el)?.addEventListener("click", async () => { await navigator.clipboard?.writeText(url(mine.id)).catch(() => {}); api.toast("Copied."); });
    $("#sh-stop", el)?.addEventListener("click", async () => { try { await S.unshare(st, mine.id); api.closeModal(); api.toast("No longer shared. The link stops working."); } catch (e) { api.toast(esc(e.message)); } });
  });
}
async function shared(main, api, sid) {
  main.innerHTML = `<div class="kb-screen"><p class="sub">Opening…</p></div>`;
  let row;
  try { row = await S.openShare(api.ctx.store, sid); } catch (e) { main.innerHTML = `<div class="kb-empty"><h2>Can't open this</h2><p class="sub">${esc(e.message)}</p></div>`; return; }
  const tmp = M.normalise({ rems: row.snapshot.rems, tagDefs: row.snapshot.tagDefs });
  const rootId = row.snapshot.root;
  const tree = (id) => `<ul class="kb-tree ro">${M.kidsOf(tmp, id).map((k) => `<li><div class="kb-line${k.heading ? ` h${k.heading}` : ""}"><span class="kb-bullet"></span>${k.todo ? `<input type="checkbox" disabled ${k.todo === "done" ? "checked" : ""}>` : ""}<div class="kb-text">${M.inlineHtml(tmp, k.text).replace(/href="#\/notes\/[^"]*"/g, "")}</div></div>${k.kids.length ? tree(k.id) : ""}</li>`).join("")}</ul>`;
  main.innerHTML = `<div class="kb-screen"><div class="deck-head"><div><span class="kicker lo-kicker">Shared with you</span><h1>${esc(M.nameOf(tmp, rootId))}</h1><p class="sub">${M.cardsUnder(tmp, rootId).length} flashcards · shared ${new Date(row.updated_at).toLocaleDateString("en-GB")}</p></div><button type="button" class="btn btn-primary lg" id="sh-copyin"><span>Copy into my notes</span></button></div><div class="kb-page">${tree(rootId)}</div></div>`;
  $("#sh-copyin", main).onclick = () => { const [made] = api.change(() => IO.fromNative(api.kb, row.snapshot, null), { draw: "none" }); api.toast("Copied into your notes. Its cards join your reviews."); location.hash = `#/notes/${made}`; };
}
