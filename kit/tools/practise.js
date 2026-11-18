// Practise tools (app.html#/tools/...):
//   feed    the flashcard feed: an endless scroll of cards from your decks and the subjects you choose, with bonus
//           facts, study hacks and reminders mixed in; boost a card to see it more; zoom out to a board of every card
//   quiz    quizzes from any lesson, unit, deck or notes: practice, and with Gradify Plus: timed (like the exam),
//           adaptive (harder or easier as you go) and the question bank of every question on Gradify
//   games   key-term games: Match, Speed round and Missing letters
import { mountPicker } from "./pick.js";
import { catalogue, sampleMaterial, fromDeck, shuffle, termQuestions, plain } from "./material.js";
import { decks } from "./store.js";
import { backLink, esc, useTool } from "./tools.js";
import { access, plusPanelHtml } from "../data/plan.js";

const head = (kicker, title, line) => `${backLink()}<div class="deck-head"><div><span class="kicker lo-kicker">${esc(kicker)}</span><h1>${esc(title)}</h1><p class="sub">${line}</p></div></div>`;
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* fine */ } };
const xp = (ctx, kind, n, detail) => ctx.store.logActivity?.({ kind, xp: Math.max(0, Math.min(200, Math.round(n))), detail }).catch(() => {});

// ======================= The flashcard feed =======================
export const HACKS = [
  ["Study hack", "Say the answer out loud before you flip. Speaking it makes it stick better than reading it."],
  ["Study hack", "Mix topics. Switching between subjects feels harder, and that's why it works."],
  ["Study hack", "Got one wrong? Good. Mistakes you correct are remembered better than easy wins."],
  ["Study hack", "Explain it to an imaginary 12-year-old. If you can't, that's the gap to fill."],
  ["Study hack", "Ten minutes now beats an hour the night before. Little and often."],
  ["Study hack", "Draw it. A rough sketch of a process beats rereading the paragraph."],
  ["Study hack", "Sleep is when memories set. A review before bed is a good review."],
  ["Reminder", "You don't have to feel ready to start. Starting is what makes you ready."],
  ["Reminder", "Every card you see now is one less you'll forget in the exam."],
  ["Reminder", "Progress, not perfection. One more card."],
  ["Reminder", "Drink some water and roll your shoulders. Then carry on."],
  ["Reminder", "Comparing is the thief of joy. Beat yesterday's you."],
];
const BOOST = "gradify.feed.boost", SEEN = "gradify.feed.seen";
/** A feed batch: cards (boosted ones three times as likely), a bonus fact every 5 cards, a hack or reminder every 7. Pure. */
export function feedBatch(cards, facts, { boosted = new Set(), rand = Math.random, n = 20, start = 0 } = {}) {
  const pool = cards.flatMap((c) => (boosted.has(c.key) ? [c, c, c] : [c]));
  const out = [];
  for (let i = 0; out.length < n && pool.length; i++) {
    const k = start + out.length;
    if (k % 7 === 6) { const [kind, text] = HACKS[Math.floor(rand() * HACKS.length)]; out.push({ type: "hack", kind, text }); continue; }
    if (k % 5 === 4 && facts.length) { out.push({ type: "fact", ...facts[Math.floor(rand() * facts.length)] }); continue; }
    out.push({ type: "card", ...pool[Math.floor(rand() * pool.length)] });
  }
  return out;
}
async function feed(view, ctx) {
  const cat = await catalogue(), prefs = read("gradify.feed.subjects", []);
  view.innerHTML = `<div class="tl fd-wrap">${head("Practise", "Flashcard feed", "Scroll through flashcards like a feed: tap a card to flip it, then say how well you knew it. Bonus facts pop up as you go, and study hacks keep you going. <b>Boost</b> a card and you'll see it more often. Zoom out to see every card on a board.")}
    <div class="panel glass tp"><span class="sub">Cards from</span><div class="seg-chips fd-subs">${decks().length ? `<button type="button" class="chip" data-s="mine" aria-pressed="${prefs.includes("mine") || !prefs.length}">My flashcards</button>` : ""}${cat.map((c) => `<button type="button" class="chip" data-s="${esc(c.slug)}" aria-pressed="${prefs.includes(c.slug)}">${esc(c.name)}</button>`).join("")}</div>
      <div class="tl-bar"><button type="button" class="btn btn-ghost lg btn-sm" data-zoom><span>Zoom out to the board</span></button><span class="sub fd-stat"></span></div></div>
    <div class="fd" aria-live="polite"></div><div class="fd-more" aria-hidden="true"></div></div>`;
  const box = view.querySelector(".fd"), more = view.querySelector(".fd-more"), stat = view.querySelector(".fd-stat");
  let cards = [], facts = [], shown = 0, board = false, knew = 0, seen = 0;
  const boosted = new Set(read(BOOST, []));
  const chosen = () => [...view.querySelectorAll(".fd-subs .chip[aria-pressed=true]")].map((b) => b.dataset.s);
  const gather = async () => {
    box.innerHTML = `<p class="sub">Shuffling your feed…</p>`; shown = 0;
    let subs = chosen();
    if (!subs.length) { subs = decks().length ? ["mine"] : [cat.find((c) => c.slug === "biology")?.slug || cat[0].slug]; view.querySelector(`.fd-subs [data-s="${subs[0]}"]`)?.setAttribute("aria-pressed", "true"); }
    write("gradify.feed.subjects", subs);
    cards = []; facts = [];
    if (subs.includes("mine")) for (const d of decks()) { const m = fromDeck(d.title, d.text); cards.push(...m.cards.map(([q, a]) => ({ q, a, from: d.title, key: `d:${d.id}:${q}` }))); }
    const courses = subs.filter((s) => s !== "mine");
    if (courses.length) {
      const ms = await sampleMaterial(courses, Math.max(6, 12 / courses.length | 0) * Math.min(courses.length, 3));
      for (const m of ms) {
        cards.push(...m.cards.map(([q, a]) => ({ q, a, from: `${m.from} · ${m.title}`, key: `l:${m.slug}:${q}` })));
        facts.push(...m.sections.flatMap((s) => s.facts.filter((f) => f.length > 40 && f.length < 260).map((f) => ({ text: f, from: m.title }))));
      }
    }
    box.innerHTML = cards.length ? "" : `<div class="empty-state panel glass"><h3>No cards yet</h3><p class="sub">Pick a subject above, or make your own cards in the <a href="#/tools/cards/new">flashcard creator</a>.</p></div>`;
    if (cards.length) add();
  };
  const item = (x, i) => x.type === "card"
    ? `<article class="fd-card panel glass ${boosted.has(x.key) ? "boosted" : ""}" data-i="${i}" data-key="${esc(x.key)}"><span class="tl-k">${esc(x.from)}</span><button type="button" class="fd-flip" aria-expanded="false"><span class="fd-q">${esc(x.q)}</span><span class="fd-a" hidden>${esc(x.a)}</span><span class="fd-hint sub">Tap to flip</span></button>
        <div class="fd-rate" hidden><button type="button" data-r="again">No idea</button><button type="button" data-r="hard">Not sure</button><button type="button" data-r="good">I knew it</button></div>
        <button type="button" class="fd-boost" aria-pressed="${boosted.has(x.key)}" title="Boost: see this card more often">⚡ ${boosted.has(x.key) ? "Boosted" : "Boost"}</button></article>`
    : x.type === "fact" ? `<article class="fd-fact panel glass"><span class="tl-k">✨ Bonus fact · ${esc(x.from)}</span><p>${esc(x.text)}</p></article>`
      : `<article class="fd-hack panel glass"><span class="tl-k">${esc(x.kind)}</span><p>${esc(x.text)}</p></article>`;
  const add = () => { const batch = feedBatch(cards, facts, { boosted, start: shown }); box.insertAdjacentHTML("beforeend", batch.map((x, k) => item(x, shown + k)).join("")); shown += batch.length; };
  new IntersectionObserver(([e]) => { if (e.isIntersecting && cards.length && !board) add(); }, { rootMargin: "600px" }).observe(more);
  box.addEventListener("click", (e) => {
    const card = e.target.closest(".fd-card"); if (!card) return;
    if (e.target.closest(".fd-flip")) { const a = card.querySelector(".fd-a"), open = a.hidden; a.hidden = !open; card.querySelector(".fd-hint").hidden = open; card.querySelector(".fd-rate").hidden = !open; card.querySelector(".fd-flip").setAttribute("aria-expanded", String(open)); card.classList.toggle("flipped", open); }
    const r = e.target.closest("[data-r]");
    if (r) {
      seen++; if (r.dataset.r === "good") knew++;
      card.querySelector(".fd-rate").innerHTML = `<span class="sub">${r.dataset.r === "good" ? "Nice. It'll come round less often." : r.dataset.r === "hard" ? "It'll come back soon." : "Boosted: you'll see it again shortly."}</span>`;
      if (r.dataset.r === "again") { boosted.add(card.dataset.key); write(BOOST, [...boosted].slice(-500)); }
      if (r.dataset.r === "good" && boosted.has(card.dataset.key)) { boosted.delete(card.dataset.key); write(BOOST, [...boosted]); }
      stat.textContent = `${seen} rated · ${knew} known`;
      write(SEEN, (read(SEEN, 0) || 0) + 1);
      if (seen % 10 === 0) xp(ctx, "feed", 10, { seen });
    }
    const b = e.target.closest(".fd-boost");
    if (b) { const k = card.dataset.key, on = !boosted.has(k); if (on) boosted.add(k); else boosted.delete(k); write(BOOST, [...boosted].slice(-500)); b.setAttribute("aria-pressed", String(on)); b.textContent = `⚡ ${on ? "Boosted" : "Boost"}`; card.classList.toggle("boosted", on); }
  });
  view.querySelector(".fd-subs").addEventListener("click", (e) => { const b = e.target.closest("[data-s]"); if (!b) return; b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true")); clearTimeout(gather.t); gather.t = setTimeout(gather, 450); });
  view.querySelector("[data-zoom]").addEventListener("click", (e) => {
    board = !board; box.classList.toggle("board", board); e.currentTarget.querySelector("span").textContent = board ? "Back to the feed" : "Zoom out to the board";
    if (board) { const seenK = new Set(); box.innerHTML = cards.filter((c) => !seenK.has(c.key) && seenK.add(c.key)).map((c, i) => item({ type: "card", ...c }, i)).join(""); } else { box.innerHTML = ""; shown = 0; add(); }
  });
  gather();
}

// ======================= Quizzes =======================
/** Questions from material: its own multiple-choice questions, then ones made from its key terms and flashcards. Pure. */
export function quizQuestions(m, rand = Math.random) {
  const own = m.mcq.filter((q) => q.wrong.length >= 1).map((q) => ({ ...q, src: m.title }));
  const made = termQuestions(m.terms.length >= 4 ? m.terms : m.cards.filter(([q, a]) => a.length < 140), rand).map((q) => ({ ...q, d: 1, src: m.title }));
  return shuffle([...own, ...(own.length < 12 ? made : made.slice(0, 4))], rand);
}
/** The next question for an adaptive quiz: the level moves up after two right in a row and down after a wrong one. Pure. */
export function adaptiveNext(pool, level, asked) {
  const left = pool.filter((q) => !asked.has(q));
  if (!left.length) return null;
  const by = (d) => left.filter((q) => (q.d || 2) === d);
  for (const d of [level, level + 1, level - 1, level + 2, level - 2]) { const l = by(d); if (l.length) return l[0]; }
  return left[0];
}
export const nextLevel = (level, right, streak) => Math.max(1, Math.min(3, right ? (streak >= 2 ? level + 1 : level) : level - 1));
async function quiz(view, ctx) {
  const A = await access(ctx.store).catch(() => ({ plan: "free", enforced: false, has: () => true }));
  const has = () => !A.enforced || A.has("exams");
  const mode0 = location.hash.split("/")[3] || "practice";
  view.innerHTML = `<div class="tl">${head("Practise", "Quizzes and question bank", "Multiple-choice questions from any lesson, unit, your flashcards or your notes, with feedback on every answer.")}
    <div class="seg-chips qz-modes">${[["practice", "Practice"], ["timed", "Timed quiz"], ["adaptive", "Adaptive"], ["bank", "Question bank"]].map(([k, t]) => `<a class="chip" href="#/tools/quiz/${k}" aria-pressed="${k === mode0}">${t}${k === "timed" || k === "bank" ? ' <small class="qz-plan">Plus</small>' : k === "adaptive" ? ' <small class="qz-plan">Plus</small>' : ""}</a>`).join("")}</div>
    <p class="sub qz-line"></p><div class="tl-pickbox"></div><div class="tl-out"></div></div>`;
  const LINES = { practice: "Answer at your own pace. Every answer is marked, with why.", timed: "Against the clock, like the real exam: a minute a question by default. Your score and time at the end.", adaptive: "Get two right in a row and the questions get harder; get one wrong and they get easier. Your level at the end shows where you are.", bank: "Every practice question in a subject, filtered by unit and difficulty. Answer any of them, in any order." };
  view.querySelector(".qz-line").textContent = LINES[mode0] || LINES.practice;
  if (mode0 !== "practice" && !has()) { view.querySelector(".tl-out").innerHTML = plusPanelHtml("exams", { pricing: ctx.pricing }); return; }
  if (mode0 === "bank") return bank(view, ctx);
  await mountPicker(view.querySelector(".tl-pickbox"), { label: "Start the quiz", auto: false, onPick: async (m) => {
    if (!(await useTool("quiz", `${mode0}:${m.title}`, ctx))) return;
    const pool = quizQuestions(m), out = view.querySelector(".tl-out");
    if (pool.length < 3) { out.innerHTML = `<p class="sub">There aren't enough questions in that for a quiz. Try a whole unit, or a lesson with key terms.</p>`; return; }
    const total = Math.min(mode0 === "adaptive" ? 15 : 12, pool.length), asked = new Set(), log = [];
    let level = 2, streak = 0, k = 0, t0 = Date.now(), timer = 0, limit = total * 60;
    if (mode0 === "timed") out.innerHTML = `<div class="panel glass tp"><label class="tl-sel">Time <select data-lim><option value="${total * 30}">${Math.round(total / 2)} min (fast)</option><option value="${total * 60}" selected>${total} min</option><option value="${total * 90}">${Math.round(total * 1.5)} min</option></select></label><button type="button" class="btn btn-primary lg btn-sm" data-start><span>Start the clock</span></button></div>`;
    const next = () => {
      if (k >= total) return finish();
      const q = mode0 === "adaptive" ? adaptiveNext(pool, level, asked) : pool[k];
      if (!q) return finish();
      asked.add(q);
      const opts = shuffle([q.right, ...q.wrong.slice(0, 3)]);
      out.innerHTML = `<div class="qz panel glass"><div class="qz-top"><span class="tl-k">Question ${k + 1} of ${total}${mode0 === "adaptive" ? ` · level ${["", "foundation", "intermediate", "advanced"][level]}` : ""}</span>${mode0 === "timed" ? `<span class="qz-clock" aria-live="off"></span>` : ""}</div><div class="goal-bar"><i style="width:${(k / total) * 100}%"></i></div>
        <h2>${esc(q.q)}</h2><div class="qz-opts">${opts.map((o, i) => `<button type="button" class="qz-opt" data-o="${i}"><b>${"ABCD"[i]}</b> ${esc(o)}</button>`).join("")}</div><div class="qz-why" hidden></div></div>`;
      out.querySelector(".qz-opts").addEventListener("click", (e) => {
        const b = e.target.closest(".qz-opt"); if (!b || out.querySelector(".qz-opt[disabled]")) return;
        const right = opts[+b.dataset.o] === q.right;
        out.querySelectorAll(".qz-opt").forEach((x) => { x.disabled = true; if (opts[+x.dataset.o] === q.right) x.classList.add("right"); });
        if (!right) b.classList.add("wrong");
        log.push({ q, right, level }); streak = right ? streak + 1 : 0;
        if (mode0 === "adaptive") level = nextLevel(level, right, streak);
        const why = out.querySelector(".qz-why"); why.hidden = false;
        why.innerHTML = `<p><b>${right ? "Right." : `Not quite. The answer is: ${esc(q.right)}`}</b> ${esc(q.why || "")}</p><button type="button" class="btn btn-light lg btn-sm" data-next><span>${k + 1 < total ? "Next question →" : "See your score"}</span></button>`;
        why.querySelector("[data-next]").addEventListener("click", () => { k++; next(); }); why.querySelector("[data-next]").focus();
      });
    };
    const tick = () => { const left = limit - Math.round((Date.now() - t0) / 1000), c = out.querySelector(".qz-clock"); if (c) { c.textContent = `${Math.floor(Math.max(0, left) / 60)}:${String(Math.max(0, left) % 60).padStart(2, "0")}`; c.classList.toggle("low", left < 30); } if (left <= 0) finish(true); };
    const finish = (timeUp = false) => {
      clearInterval(timer); timer = 0;
      const right = log.filter((x) => x.right).length, secs = Math.round((Date.now() - t0) / 1000);
      const weak = [...new Set(log.filter((x) => !x.right).map((x) => x.q.term || x.q.q))].slice(0, 6);
      out.innerHTML = `<div class="qz panel glass qz-done"><span class="tl-k">${timeUp ? "Time's up" : "Finished"}</span><h2>${right} / ${log.length} right${log.length ? ` · ${Math.round((right / log.length) * 100)}%` : ""}</h2>
        <p class="sub">${mode0 === "timed" ? `In ${Math.floor(secs / 60)} min ${secs % 60} s. ` : ""}${mode0 === "adaptive" ? `You finished at <b>${["", "foundation", "intermediate", "advanced"][level]}</b> level. ` : ""}+${right * 5} XP</p>
        ${weak.length ? `<h3>Look at these again</h3><ul>${weak.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>` : ""}
        <button type="button" class="btn btn-primary lg btn-sm" data-again><span>Another quiz</span></button></div>`;
      out.querySelector("[data-again]").addEventListener("click", () => { k = 0; log.length = 0; asked.clear(); level = 2; streak = 0; shuffle(pool); t0 = Date.now(); if (mode0 === "timed") { timer = setInterval(tick, 1000); } next(); });
      xp(ctx, `quiz-${mode0}`, right * 5, { title: m.title, right, of: log.length });
    };
    if (mode0 === "timed") out.querySelector("[data-start]").addEventListener("click", () => { limit = +out.querySelector("[data-lim]").value; t0 = Date.now(); timer = setInterval(tick, 1000); next(); tick(); });
    else next();
    addEventListener("hashchange", () => clearInterval(timer), { once: true });
  } });
}
// the question bank: every question in a subject, by unit and difficulty
async function bank(view, ctx) {
  const cat = await catalogue(), { loadUnit, fromLesson } = await import("./material.js");
  const box = view.querySelector(".tl-pickbox"), out = view.querySelector(".tl-out");
  box.innerHTML = `<div class="panel glass tp"><div class="tp-row"><label><span class="sub">Subject</span><select data-s>${cat.map((c) => `<option value="${esc(c.slug)}">${esc(c.name)}</option>`).join("")}</select></label><label><span class="sub">Unit</span><select data-u><option value="">Every unit</option></select></label>
    <label><span class="sub">Difficulty</span><select data-d><option value="">Any</option><option value="1">Foundation</option><option value="2">Intermediate</option><option value="3">Advanced</option></select></label><label><span class="sub">Search</span><input type="search" data-q placeholder="Words in the question"></label></div><p class="sub bk-msg" aria-live="polite"></p></div>`;
  const s = box.querySelector("[data-s]"), u = box.querySelector("[data-u]"), d = box.querySelector("[data-d]"), q = box.querySelector("[data-q]"), msg = box.querySelector(".bk-msg");
  s.value = read("gradify.bank.course", "") || s.value;
  let all = [], done = read("gradify.bank.done", {});
  const load = async () => {
    write("gradify.bank.course", s.value);
    const c = cat.find((x) => x.slug === s.value);
    u.innerHTML = `<option value="">Every unit</option>${c.units.map((x) => `<option value="${esc(x.id)}">${esc(x.title)}</option>`).join("")}`;
    all = []; msg.textContent = "Loading the questions…";
    for (const un of c.units) { const ls = await loadUnit(c.slug, un.id).catch(() => []); for (const L of ls) for (const x of fromLesson(L).mcq) all.push({ ...x, unit: un.id, lesson: L.title, id: `${c.slug}:${x.q.slice(0, 80)}` }); msg.textContent = `Loading… ${all.length} questions`; }
    paint();
  };
  const paint = () => {
    const words = q.value.trim().toLowerCase();
    const list = all.filter((x) => (!u.value || x.unit === u.value) && (!d.value || String(x.d) === d.value) && (!words || x.q.toLowerCase().includes(words)));
    const solved = list.filter((x) => done[x.id]).length;
    msg.textContent = `${list.length.toLocaleString("en-GB")} questions · ${solved} answered right`;
    out.innerHTML = `<div class="bk-list">${list.slice(0, 40).map((x, i) => { const opts = shuffle([x.right, ...x.wrong]); return `<article class="qz panel glass bk ${done[x.id] ? "solved" : ""}" data-i="${i}"><span class="tl-k">${esc(x.lesson)} · ${["", "Foundation", "Intermediate", "Advanced"][x.d] || ""}${done[x.id] ? " · ✓" : ""}</span><h3>${esc(x.q)}</h3><div class="qz-opts">${opts.map((o) => `<button type="button" class="qz-opt" data-right="${o === x.right}">${esc(o)}</button>`).join("")}</div><p class="qz-why" hidden>${esc(x.why || "")}</p></article>`; }).join("")}</div>${list.length > 40 ? `<p class="sub">Showing 40 of ${list.length}. Narrow it down with the filters.</p>` : ""}`;
    out.querySelectorAll(".bk").forEach((el) => { el._x = list[+el.dataset.i]; });
  };
  out.addEventListener("click", (e) => {
    const b = e.target.closest(".qz-opt"), card = b?.closest(".bk"); if (!b || card.querySelector(".qz-opt[disabled]")) return;
    const right = b.dataset.right === "true";
    card.querySelectorAll(".qz-opt").forEach((x) => { x.disabled = true; if (x.dataset.right === "true") x.classList.add("right"); });
    if (!right) b.classList.add("wrong");
    const why = card.querySelector(".qz-why"); why.hidden = false; why.innerHTML = `<b>${right ? "Right." : "Not quite."}</b> ${why.textContent}`;
    if (right && !done[card._x.id]) { done[card._x.id] = 1; write("gradify.bank.done", done); xp(ctx, "question-bank", 5, { q: card._x.q.slice(0, 80) }); }
  });
  s.addEventListener("change", load); [u, d].forEach((x) => x.addEventListener("change", paint)); q.addEventListener("input", paint);
  load();
}

// ======================= Key-term games =======================
/** Missing letters: hide about half of the letters of a term, never the first. Pure. */
export function hideLetters(term, rand = Math.random) {
  return [...term].map((ch, i) => (/[a-z]/i.test(ch) && i > 0 && rand() < 0.5 ? "_" : ch)).join("");
}
async function games(view, ctx) {
  view.innerHTML = `<div class="tl">${head("Practise", "Key-term games", "Quick games for learning the key terms of any topic. <b>Match</b>: pair each term with its meaning against the clock. <b>Speed round</b>: as many as you can in 60 seconds. <b>Missing letters</b>: spell the term from its meaning.")}<div class="tl-pickbox"></div><div class="tl-out"></div></div>`;
  await mountPicker(view.querySelector(".tl-pickbox"), { label: "Play", onPick: async (m) => {
    const terms = (m.terms.length >= 4 ? m.terms : m.cards.filter(([q, a]) => q.length < 70 && a.length < 160)).filter(([t, d]) => t && d);
    const out = view.querySelector(".tl-out");
    if (terms.length < 4) { out.innerHTML = `<p class="sub">That has fewer than four key terms. Pick a whole unit, or another lesson.</p>`; return; }
    if (!(await useTool("games", m.title, ctx))) return;
    const best = read("gradify.games.best", {});
    out.innerHTML = `<div class="seg-chips gm-pick"><button type="button" class="chip" data-g="match" aria-pressed="true">Match</button><button type="button" class="chip" data-g="speed" aria-pressed="false">Speed round</button><button type="button" class="chip" data-g="letters" aria-pressed="false">Missing letters</button></div><div class="gm panel glass"></div>`;
    const stage = out.querySelector(".gm");
    let timer = 0;
    const end = (game, score, line) => { clearInterval(timer); const key = `${game}:${m.title}`, prev = best[key]; const better = game === "match" ? !prev || score < prev : !prev || score > prev; if (better) { best[key] = score; write("gradify.games.best", best); } stage.innerHTML = `<h2>${line}</h2><p class="sub">${better ? "A new best!" : `Your best: ${game === "match" ? `${prev} s` : prev}`}</p><button type="button" class="btn btn-primary lg btn-sm" data-again><span>Play again</span></button>`; stage.querySelector("[data-again]").addEventListener("click", () => play(game)); xp(ctx, "game", 15, { game, title: m.title }); };
    const play = (game) => {
      clearInterval(timer);
      out.querySelectorAll(".gm-pick .chip").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.g === game)));
      if (game === "match") {
        const set = shuffle(terms).slice(0, 6), left = shuffle(set.map(([t], i) => ({ t, i }))), right = shuffle(set.map(([, d], i) => ({ t: d.length > 90 ? `${d.slice(0, 88)}…` : d, i })));
        let pick = null, pairs = 0, misses = 0; const t0 = Date.now();
        stage.innerHTML = `<div class="gm-top"><span class="tl-k">Match the pairs</span><span class="gm-clock">0 s</span></div><div class="gm-match"><div>${left.map((x) => `<button type="button" class="gm-tile" data-side="l" data-i="${x.i}">${esc(x.t)}</button>`).join("")}</div><div>${right.map((x) => `<button type="button" class="gm-tile def" data-side="r" data-i="${x.i}">${esc(x.t)}</button>`).join("")}</div></div>`;
        timer = setInterval(() => { stage.querySelector(".gm-clock").textContent = `${Math.round((Date.now() - t0) / 1000)} s`; }, 500);
        stage.querySelector(".gm-match").addEventListener("click", (e) => {
          const b = e.target.closest(".gm-tile"); if (!b || b.disabled) return;
          if (!pick || pick.dataset.side === b.dataset.side) { pick?.classList.remove("on"); pick = b; b.classList.add("on"); return; }
          if (pick.dataset.i === b.dataset.i) { [pick, b].forEach((x) => { x.disabled = true; x.classList.remove("on"); x.classList.add("done"); }); pairs++; if (pairs === set.length) { const s = Math.round((Date.now() - t0) / 1000) + misses * 2; setTimeout(() => end("match", s, `All matched in ${s} s${misses ? ` (including ${misses * 2} s for ${misses} miss${misses === 1 ? "" : "es"})` : ""}`), 300); } }
          else { misses++; [pick, b].forEach((x) => { x.classList.add("miss"); setTimeout(() => x.classList.remove("miss", "on"), 450); }); }
          pick = null;
        });
      } else if (game === "speed") {
        const qs = termQuestions(terms); let k = 0, score = 0; const t0 = Date.now();
        const ask = () => { const q = qs[k % qs.length], opts = shuffle([q.right, ...q.wrong]); stage.innerHTML = `<div class="gm-top"><span class="tl-k">Score ${score}</span><span class="gm-clock"></span></div><h2>${esc(q.term)}</h2><div class="qz-opts">${opts.map((o) => `<button type="button" class="qz-opt" data-right="${o === q.right}">${esc(o.length > 110 ? `${o.slice(0, 108)}…` : o)}</button>`).join("")}</div>`;
          stage.querySelector(".qz-opts").addEventListener("click", (e) => { const b = e.target.closest(".qz-opt"); if (!b) return; if (b.dataset.right === "true") { score++; k++; ask(); } else { b.classList.add("wrong"); b.disabled = true; score = Math.max(0, score - 1); stage.querySelector(".tl-k").textContent = `Score ${score}`; } }); tickS(); };
        const tickS = () => { const left = 60 - Math.round((Date.now() - t0) / 1000), c = stage.querySelector(".gm-clock"); if (c) c.textContent = `${Math.max(0, left)} s`; if (left <= 0) end("speed", score, `${score} in 60 seconds`); };
        ask(); timer = setInterval(tickS, 500);
      } else {
        const set = shuffle(terms).slice(0, 8); let k = 0, score = 0;
        const ask = () => { if (k >= set.length) return end("letters", score, `${score} of ${set.length} spelled right`); const [t, d] = set[k]; stage.innerHTML = `<div class="gm-top"><span class="tl-k">${k + 1} of ${set.length} · ${score} right</span></div><p class="gm-def">${esc(d)}</p><p class="gm-word" aria-label="The term, with letters missing">${esc(hideLetters(t))}</p><form class="tl-search gm-form"><input aria-label="Type the term" autocomplete="off" autocapitalize="off"><button class="btn btn-primary lg btn-sm"><span>Check</span></button></form><p class="sub gm-res" aria-live="polite"></p>`;
          const f = stage.querySelector("form"), inp = f.querySelector("input"); inp.focus();
          f.addEventListener("submit", (e) => { e.preventDefault(); const ok = plain(inp.value).toLowerCase().replace(/[^a-z0-9]/g, "") === plain(t).toLowerCase().replace(/[^a-z0-9]/g, ""); if (ok) score++; stage.querySelector(".gm-res").innerHTML = ok ? "<b>Right!</b>" : `It's <b>${esc(t)}</b>.`; inp.disabled = true; k++; setTimeout(ask, ok ? 700 : 1600); }); };
        ask();
      }
    };
    out.querySelector(".gm-pick").addEventListener("click", (e) => { const b = e.target.closest("[data-g]"); if (b) play(b.dataset.g); });
    addEventListener("hashchange", () => clearInterval(timer), { once: true });
    play("match");
  } });
}

export const PRACTISE_TOOLS = { feed, quiz, games };
