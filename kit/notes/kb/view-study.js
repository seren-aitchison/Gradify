// Gradify Notes' flashcards and exams: Flashcard Home (what's due, every document's cards, the week's reviews, a card
// browser with each card's memory), exam plans (kit/notes/kb/exam.js) with their calendar and readiness, and the
// practice sessions the app's revision screen runs (studyQueue, called from kit/app/main.js renderStudy).
import * as M from "./model.js";
import * as S from "./store.js";
import { examPlan, examQueue, newExam, masteredCount } from "./exam.js";
import { isDue, recallNow, memoryOf, fmtInterval } from "../../learning/srs.js";

const { esc } = M;
const $ = (s, el = document) => el.querySelector(s);
const DAY = 864e5;
const pct = (x) => `${Math.round((x || 0) * 100)}%`;
const fmt = (d, o = { day: "numeric", month: "short" }) => new Date(d).toLocaleDateString("en-GB", o);

/** Each notes card with its row in the app's card table (null until it's been synced). */
async function joined(api, kbCards) {
  const appCards = await api.ctx.store.listCards();
  const by = new Map(appCards.map((c) => [c.id, c]));
  return kbCards.map((k) => ({ k, a: by.get(api.kb.cardMap[k.id]) || null }));
}
const stateOf = (a) => (!a ? "new" : a.suspended ? "off" : !a.reps ? "new" : isDue(a) ? "due" : (recallNow(a) ?? 0) >= 0.9 && a.reps >= 2 ? "mastered" : "learning");

export async function screen(kind, arg, main, api) {
  if (kind === "cards") return home(main, api);
  if (kind === "exams") return exams(main, api);
  if (kind === "exam") return examPage(main, api, arg);
}

// ---------- Flashcard Home ----------
async function home(main, api) {
  const kb = api.kb;
  main.innerHTML = `<div class="kb-screen"><p class="sub">Loading your cards…</p></div>`;
  await api.syncCardsNow().catch(() => {});
  const all = await joined(api, M.allCards(kb));
  const reviews = await api.ctx.store.listReviews(30).catch(() => []);
  const mine = new Set(all.filter((x) => x.a).map((x) => x.a.id));
  const rv = reviews.filter((r) => mine.has(r.card_id));
  const days = Array.from({ length: 7 }, (_, i) => M.dayKey(Date.now() - (6 - i) * DAY));
  const perDay = days.map((d) => rv.filter((r) => M.dayKey(r.reviewed_at) === d).length);
  const goal = Math.max(10, Math.round(((api.ctx.profile?.daily_minutes || 20) * 60) / 25));
  let streak = 0; for (let i = 0; ; i++) { const d = M.dayKey(Date.now() - i * DAY); if (rv.some((r) => M.dayKey(r.reviewed_at) === d)) streak++; else if (i) break; if (i > 400) break; }
  const due = all.filter((x) => stateOf(x.a) === "due").length, fresh = all.filter((x) => stateOf(x.a) === "new").length;
  const docs = new Map();
  for (const x of all) { const d = M.docOf(kb, x.k.rem); if (!docs.has(d)) docs.set(d, []); docs.get(d).push(x); }
  const examsList = Object.values(kb.exams).filter((e) => !e.deleted && e.date >= M.dayKey()).sort((a, b) => a.date.localeCompare(b.date));
  const max = Math.max(1, ...perDay);
  main.innerHTML = `<div class="kb-screen">
    <div class="deck-head"><div><span class="kicker lo-kicker">Flashcards</span><h1>Flashcard Home</h1><p class="sub">Every card written in your notes, scheduled with the same memory model as the rest of Gradify. They're in Today and Revise too.</p></div>
      <div class="row-actions">${due ? `<button type="button" class="btn btn-primary lg" data-go="due"><span>Review ${due} due</span></button>` : `<button type="button" class="btn btn-light lg" data-go="new"><span>${fresh ? `Learn ${Math.min(fresh, 20)} new` : "Practise anyway"}</span></button>`}</div></div>
    <div class="kb-stats">
      <div class="panel glass"><span class="sub">Due now</span><b>${due}</b></div>
      <div class="panel glass"><span class="sub">New</span><b>${fresh}</b></div>
      <div class="panel glass"><span class="sub">Today</span><b>${perDay[6]} <small>/ ${goal}</small></b><span class="goal-bar"><i style="width:${Math.min(100, (perDay[6] / goal) * 100)}%"></i></span></div>
      <div class="panel glass"><span class="sub">Streak</span><b>${streak} ${streak === 1 ? "day" : "days"}</b></div>
      <div class="panel glass"><span class="sub">Mastered</span><b>${all.filter((x) => stateOf(x.a) === "mastered").length} <small>/ ${all.length}</small></b></div>
    </div>
    <div class="lo-grid kb-two">
      <article class="panel glass"><h3>This week</h3><div class="kb-bars" role="img" aria-label="Reviews each day this week: ${perDay.join(", ")}">${perDay.map((n, i) => `<span><i style="height:${(n / max) * 100}%"></i><b>${n}</b><em>${fmt(`${days[i]}T12:00`, { weekday: "short" })}</em></span>`).join("")}</div></article>
      <article class="panel glass"><div class="panel-head"><h3>Exams</h3><a class="see" href="#/notes/exams">All exams</a></div>${examsList.length ? examsList.slice(0, 3).map((e) => `<a class="kb-examrow" href="#/notes/exam/${e.id}"><b>${esc(e.name)}</b><span class="sub">${fmt(`${e.date}T12:00`)} · in ${Math.round((Date.parse(`${e.date}T12:00`) - Date.now()) / DAY)} days</span></a>`).join("") : `<p class="sub">Tell Gradify when an exam is, and it plans what to learn and review each day. <a href="#/notes/exams">Add an exam</a></p>`}</article>
    </div>
    <h2 class="lo-h">By document</h2>
    ${docs.size ? `<div class="kb-tablewrap"><table class="kb-dbtable kb-decks"><thead><tr><th>Document</th><th>Cards</th><th>Due</th><th>New</th><th>Mastered</th><th></th></tr></thead><tbody>${[...docs].sort((a, b) => b[1].filter((x) => stateOf(x.a) === "due").length - a[1].filter((x) => stateOf(x.a) === "due").length).map(([d, xs]) => { const m = xs.filter((x) => stateOf(x.a) === "mastered").length; return `<tr><td><a href="#/notes/${d}">${esc(M.nameOf(kb, d))}</a><span class="sub">${esc(M.pathOf(kb, d).join(" › "))}</span></td><td>${xs.length}</td><td>${xs.filter((x) => stateOf(x.a) === "due").length}</td><td>${xs.filter((x) => stateOf(x.a) === "new").length}</td><td><span class="goal-bar" title="${pct(m / xs.length)}"><i style="width:${pct(m / xs.length)}"></i></span></td><td class="kb-rowacts"><button type="button" class="btn btn-light lg btn-sm" data-p="${d}" data-m="due"><span>Practise</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-p="${d}" data-m="all"><span>All</span></button></td></tr>`; }).join("")}</tbody></table></div>` : `<div class="kb-empty"><h2>No flashcards yet</h2><p class="sub">Write one in any bullet: <code>Mitochondria >> where aerobic respiration happens</code>, or <code>Term :: definition</code>, or hide words with <code>{{cloze}}</code>.</p></div>`}
    <h2 class="lo-h">Every card</h2>
    <div class="kb-filters"><input id="cf-q" placeholder="Search cards" aria-label="Search cards"><select id="cf-s" aria-label="State"><option value="">Any state</option><option value="due">Due</option><option value="new">New</option><option value="learning">Learning</option><option value="mastered">Mastered</option><option value="hard">Difficult (forgotten 3+ times)</option><option value="off">Switched off</option></select><select id="cf-t" aria-label="Type"><option value="">Any type</option>${Object.entries(M.CARD_TYPES).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select></div>
    <div id="cf-list"></div></div>`;
  const list = () => {
    const q = $("#cf-q", main).value.toLowerCase(), s = $("#cf-s", main).value, t = $("#cf-t", main).value;
    const rows = all.filter((x) => (!q || `${x.k.front} ${x.k.back}`.toLowerCase().includes(q)) && (!t || x.k.type === t) && (!s || (s === "hard" ? (x.a?.lapses || 0) >= 3 : stateOf(x.a) === s))).slice(0, 200);
    $("#cf-list", main).innerHTML = rows.length ? `<ul class="kb-cardlist">${rows.map(({ k, a }) => cardRow(api, k, a)).join("")}</ul>${rows.length === 200 ? '<p class="sub">Showing the first 200. Search to narrow it down.</p>' : ""}` : `<p class="sub">No cards match.</p>`;
  };
  main.addEventListener("input", (e) => { if (e.target.closest(".kb-filters")) list(); });
  main.addEventListener("click", (e) => {
    const go = e.target.closest("[data-go]")?.dataset.go; if (go) location.hash = go === "due" ? "#/study" : `#/study/kb:${encodeURIComponent(`all|${go}`)}`;
    const p = e.target.closest("[data-p]"); if (p) api.practise(p.dataset.p, p.dataset.m);
    const open = e.target.closest("[data-open]")?.dataset.open; if (open) { location.hash = `#/notes/${M.docOf(kb, open)}`; }
  });
  list();
}
function cardRow(api, k, a) {
  const st = stateOf(a), m = a && memoryOf(a), r = a ? recallNow(a) : null;
  return `<li class="kb-cardrow"><div><span class="kind-tag">${esc(M.CARD_TYPES[k.type])}</span><p class="c-front">${esc(k.front)}</p><p class="c-back">${esc(k.back)}</p></div>
    <div class="kb-cardmeta"><span class="g-pill ${st === "due" ? "warn" : st === "mastered" ? "ok" : "info"}">${{ due: "Due", new: "New", learning: "Learning", mastered: "Mastered", off: "Off" }[st]}</span>${a?.reps ? `<span class="sub">Next ${new Date(a.due_at) <= new Date() ? "now" : fmt(a.due_at)} · recall ${pct(r)} · remembered for ~${fmtInterval(m?.S || 0)} · ${a.reps} reviews${a.lapses ? `, forgotten ${a.lapses}×` : ""}</span>` : ""}<button type="button" class="btn btn-ghost lg btn-sm" data-open="${k.rem}"><span>Open note</span></button></div></li>`;
}

/** The cards one bullet makes, with each one's memory, its history, and its settings. */
export async function cardPopover(api, id) {
  const kb = api.kb, r = kb.rems[id], cards = M.cardsOf(kb, id);
  const rows = await joined(api, cards).catch(() => cards.map((k) => ({ k, a: null })));
  const reviews = await api.ctx.store.listReviews(400).catch(() => []);
  const sp = M.splitCard(r.text);
  api.modal(`<h3>${cards.length} ${cards.length === 1 ? "flashcard" : "flashcards"}</h3>
    <ul class="kb-cardlist">${rows.map(({ k, a }) => `${cardRow(api, k, a)}${a ? `<li class="kb-hist">${reviews.filter((x) => x.card_id === a.id).slice(-12).map((x) => `<span class="r-${x.rating}" title="${fmt(x.reviewed_at)}: ${x.rating}">${x.rating[0].toUpperCase()}</span>`).join("") || '<span class="sub">Not reviewed yet</span>'}</li>` : ""}`).join("")}</ul>
    ${sp?.delim === "::" ? `<label>Ask it<select id="kb-dir"><option value="both" ${(r.dir || "both") === "both" ? "selected" : ""}>Both ways</option><option value="fwd" ${r.dir === "fwd" ? "selected" : ""}>Term → definition only</option><option value="back" ${r.dir === "back" ? "selected" : ""}>Definition → term only</option></select></label>` : ""}
    <div class="row-actions"><button type="button" class="btn btn-light lg btn-sm" id="kb-pr"><span>Practise this</span></button><button type="button" class="btn btn-ghost lg btn-sm" id="kb-off"><span>${r.cards === "off" ? "Turn cards on" : "Turn cards off"}</span></button><a class="btn btn-ghost lg btn-sm" href="#/notes/ask?q=${encodeURIComponent(cards[0]?.front || "")}"><span>Ask about it</span></a></div>`, (el) => {
    $("#kb-dir", el)?.addEventListener("change", (e) => { api.change(() => M.update(kb, id, { dir: e.target.value === "both" ? null : e.target.value })); api.closeModal(); });
    $("#kb-off", el).onclick = () => { api.change(() => M.update(kb, id, { cards: r.cards === "off" ? null : "off" })); api.closeModal(); };
    $("#kb-pr", el).onclick = () => { api.closeModal(); api.practise(id, "all"); };
  });
}
export function previewCards(api, rootId) {
  const cards = M.cardsUnder(api.kb, rootId);
  api.modal(`<h3>Preview: ${cards.length} cards</h3><p class="sub">Tap a card to turn it over.</p><div class="kb-preview">${cards.map((c) => `<button type="button" class="kb-flip"><span class="kind-tag">${esc(M.CARD_TYPES[c.type])}</span><b>${esc(c.front)}</b><em>${esc(c.back)}</em></button>`).join("")}</div>`, (el) => {
    el.addEventListener("click", (e) => e.target.closest(".kb-flip")?.classList.toggle("on"));
  });
}

// ---------- practice sessions (the app's revision screen) ----------
/**
 * The cards for a notes practice session: `spec` is "<rem id>|<mode>", "sel:<ids>|<mode>", "exam:<id>|…" or
 * "all|<mode>"; mode is due, new, all (in outline order) or shuffle. Returns { queue, practice, label, back, examDate }.
 * `practice` sessions don't move cards' schedules.
 */
export async function studyQueue(spec, appCards) {
  const kb = S.load();
  const [what, mode = "due"] = spec.split("|");
  const by = new Map(appCards.map((c) => [c.id, c]));
  const app = (kbCards) => kbCards.map((k) => by.get(kb.cardMap[k.id])).filter((c) => c && !c.suspended);
  let cards, label, back = "#/notes/cards", examDate = null;
  if (what.startsWith("exam:")) {
    const e = kb.exams[what.slice(5)];
    if (!e) return { queue: [], practice: false, label: "Exam", back };
    const scope = app(e.scope.flatMap((id) => M.cardsUnder(kb, id)));
    const uniq = [...new Map(scope.map((c) => [c.id, c])).values()];
    return { queue: await decorate(kb, examQueue(e, uniq)), practice: false, label: e.name, back: `#/notes/exam/${e.id}`, examDate: e.date };
  }
  if (what === "all") { cards = app(M.allCards(kb)); label = "Your notes"; }
  else if (what.startsWith("sel:")) { cards = app(what.slice(4).split(",").flatMap((id) => M.cardsUnder(kb, id))); label = "Selected notes"; back = `#/notes/${M.docOf(kb, what.slice(4).split(",")[0])}`; }
  else { cards = app(M.cardsUnder(kb, what)); label = M.nameOf(kb, what); back = `#/notes/${what}`; }
  cards = [...new Map(cards.map((c) => [c.id, c])).values()];
  let queue;
  if (mode === "due") queue = cards.filter((c) => c.reps && isDue(c)).sort((a, b) => Date.parse(a.due_at) - Date.parse(b.due_at)).concat(cards.filter((c) => !c.reps).slice(0, 20));
  else if (mode === "new") queue = cards.filter((c) => !c.reps);
  else if (mode === "shuffle") queue = [...cards].sort(() => Math.random() - 0.5);
  else queue = cards;
  return { queue: await decorate(kb, queue), practice: mode === "all" || mode === "shuffle", label, back, examDate };
}
/** Image occlusion cards show their image, with the right parts hidden. */
export async function decorate(kb, queue) {
  const occl = queue.filter((c) => c.kind === "occlusion");
  if (!occl.length) return queue;
  const { occlusionHtml } = await import("./view-blocks.js");
  const kbCards = M.allCards(kb), byApp = new Map(Object.entries(kb.cardMap).map(([k, s]) => [s, k]));
  for (const c of occl) {
    const k = kbCards.find((x) => x.id === byApp.get(c.id)); if (!k) continue;
    c._front = await occlusionHtml(kb, k, false).catch(() => null);
    c._back = await occlusionHtml(kb, k, true).catch(() => null);
  }
  return queue;
}
/** For app cards that came from notes (any session): their images. Called by the revision screen. */
export async function decorateAny(queue) { return decorate(S.load(), queue); }

// ---------- exams ----------
export async function newExamFrom(api, rootId) {
  const e = newExam({ name: M.nameOf(api.kb, rootId), scope: [rootId], created: new Date().toISOString() });
  api.kb.exams[e.id] = e; api.save();
  location.hash = `#/notes/exam/${e.id}`;
}
function exams(main, api) {
  const kb = api.kb, list = Object.values(kb.exams).filter((e) => !e.deleted).sort((a, b) => a.date.localeCompare(b.date));
  main.innerHTML = `<div class="kb-screen"><div class="deck-head"><div><span class="kicker lo-kicker">Exams</span><h1>Your exams</h1><p class="sub">Choose what an exam covers and when it is. Gradify works out how many new cards to learn and how many to review each day, with a final review before the day, and adjusts when you fall behind or add notes.</p></div><button type="button" class="btn btn-primary lg" id="kb-newexam"><span>+ New exam</span></button></div>
    ${list.length ? `<div class="lo-grid">${list.map((e) => `<a class="panel glass kb-examcard" href="#/notes/exam/${e.id}"><h3>${esc(e.name)}</h3><p class="sub">${fmt(`${e.date}T12:00`, { weekday: "short", day: "numeric", month: "long", year: "numeric" })}${e.date < M.dayKey() ? " · passed" : ` · in ${Math.round((Date.parse(`${e.date}T12:00`) - Date.now()) / DAY)} days`}</p><p class="sub">${e.scope.map((s) => esc(M.nameOf(kb, s))).join(", ") || "Nothing chosen yet"}</p></a>`).join("")}</div>` : `<div class="kb-empty"><h2>No exams yet</h2><p class="sub">Add one, or open a document and choose Learn → Create an exam from this.</p></div>`}</div>`;
  $("#kb-newexam", main).onclick = () => { const e = newExam({ created: new Date().toISOString() }); kb.exams[e.id] = e; api.save(); location.hash = `#/notes/exam/${e.id}`; };
}
async function examPage(main, api, id) {
  const kb = api.kb, e = kb.exams[id];
  if (!e || e.deleted) { main.innerHTML = `<div class="kb-empty"><h2>That exam isn't here</h2><a class="btn btn-ghost lg btn-sm" href="#/notes/exams"><span>All exams</span></a></div>`; return; }
  await api.syncCardsNow().catch(() => {});
  const appCards = await api.ctx.store.listCards();
  const by = new Map(appCards.map((c) => [c.id, c]));
  const kbCards = [...new Map(e.scope.flatMap((s) => M.cardsUnder(kb, s)).map((c) => [c.id, c])).values()];
  const cards = kbCards.map((k) => by.get(kb.cardMap[k.id])).filter(Boolean);
  if (e.startCount == null && cards.length) { e.startCount = cards.filter((c) => !c.reps).length; e.created ||= new Date().toISOString(); api.save(); }
  const plan = examPlan(e, cards);
  const months = [...new Set(plan.days.map((d) => d.day.slice(0, 7)))].slice(0, 3);
  const byDay = new Map(plan.days.map((d) => [d.day, d]));
  const peak = Math.max(1, ...plan.days.map((d) => d.total));
  const weeks = []; for (let i = 0; i < plan.days.length; i += 7) weeks.push(plan.days.slice(i, i + 7));
  const PH = { learning: "Learning", "catch-up": "Catch-up", review: "Review", final: "Final review" };
  const sel = (n, v, opts) => `<select name="${n}">${opts.map(([a, b]) => `<option value="${a}" ${String(v) === String(a) ? "selected" : ""}>${b}</option>`).join("")}</select>`;
  const isMine = api.ctx.profile?.exam_date === e.date;
  main.innerHTML = `<div class="kb-screen"><a class="back" href="#/notes/exams">← Exams</a>
    <div class="deck-head"><div><span class="kicker lo-kicker">Exam plan</span><h1>${esc(e.name)}</h1><p class="sub">${fmt(`${e.date}T12:00`, { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · ${cards.length} cards · ${masteredCount(cards)} mastered</p></div>
      <div class="row-actions"><button type="button" class="btn btn-primary lg" id="ex-go"${plan.days.length ? "" : " disabled"}><span>Today's set${plan.days[0] ? ` · ${Math.min(e.maxPerDay, plan.days[0].total)} cards` : ""}</span></button></div></div>
    ${plan.warnings.map((w) => `<p class="kb-warn">${esc(w)}</p>`).join("")}
    <div class="kb-stats">
      <div class="panel glass"><span class="sub">Ready now</span><b>${pct(plan.readiness)}</b><span class="sub">likely remembered on the day if you stopped now</span></div>
      <div class="panel glass"><span class="sub">To learn</span><b>${plan.remaining.learn}</b><span class="sub">${plan.newPerDay} new a day</span></div>
      <div class="panel glass"><span class="sub">Reviews planned</span><b>${plan.remaining.reviews}</b></div>
      <div class="panel glass"><span class="sub">Study days left</span><b>${plan.days.length}</b></div>
    </div>
    <div class="kb-phases">${plan.phases.map((p) => `<span class="ph-${p.phase}" style="flex:${plan.days.filter((d) => d.day >= p.from && d.day <= p.to).length}"><b>${PH[p.phase]}</b><em>${fmt(`${p.from}T12:00`)}${p.to !== p.from ? `–${fmt(`${p.to}T12:00`)}` : ""}</em></span>`).join("")}</div>
    <div class="lo-grid kb-two">
      <article class="panel glass"><h3>Each week</h3><div class="kb-bars">${weeks.map((w, i) => { const n = w.reduce((a, d) => a + d.total, 0); return `<span><i style="height:${(n / Math.max(1, ...weeks.map((x) => x.reduce((a, d) => a + d.total, 0)))) * 100}%"></i><b>${n}</b><em>Wk ${i + 1}</em></span>`; }).join("")}</div></article>
      <article class="panel glass"><h3>Calendar</h3>${months.map((m) => { const first = new Date(`${m}-01T12:00`), pad = (first.getDay() + 6) % 7, n = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate(); return `<div class="kb-month"><b>${first.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</b><div class="kb-cal">${"MTWTFSS".split("").map((d) => `<em>${d}</em>`).join("")}${"<span></span>".repeat(pad)}${Array.from({ length: n }, (_, i) => { const k = `${m}-${String(i + 1).padStart(2, "0")}`, d = byDay.get(k); return `<span class="${d ? `ph-${d.phase}` : ""}${k === e.date ? " exam" : ""}" title="${d ? `${PH[d.phase]}: ${d.learn} new, ${d.review + d.final} reviews` : k === e.date ? "Exam day" : ""}" style="${d ? `--a:${0.25 + 0.75 * (d.total / peak)}` : ""}">${i + 1}</span>`; }).join("")}</div></div>`; }).join("")}</article>
    </div>
    <form class="panel glass kb-examform" id="ex-form"><h3>Settings</h3>
      <label>Name<input name="name" value="${esc(e.name)}" required></label>
      <label>Date<input type="date" name="date" value="${e.date}" required></label>
      <fieldset><legend>What's in it</legend><div class="kb-chips">${e.scope.map((s) => `<span class="chip">${esc(M.nameOf(kb, s))} <button type="button" class="kb-x" data-unscope="${s}" aria-label="Remove">×</button></span>`).join("")}<button type="button" class="chip" id="ex-add">+ Add a document or folder</button></div></fieldset>
      <fieldset><legend>Study days</legend><div class="kb-chips">${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => `<label class="chip"><input type="checkbox" name="d${i}" ${e.days.includes(i) ? "checked" : ""}> ${d}</label>`).join("")}</div></fieldset>
      <label>Most cards a day<input type="number" name="maxPerDay" min="5" max="1000" value="${e.maxPerDay}"></label>
      <label>Reviews of each card before the exam${sel("reps", e.reps, [[2, "2"], [3, "3 (recommended)"], [4, "4"], [5, "5"]])}</label>
      <label>Final review period${sel("finalDays", e.finalDays, [[0, "None"], [1, "The day before"], [2, "2 days"], [3, "3 days"], [5, "5 days"], [7, "A week"]])}</label>
      <label>Cards you'll still write<input type="number" name="extra" min="0" max="5000" value="${e.extra || 0}"><em>Gradify leaves room for notes from lectures still to come</em></label>
      <label>New cards come${sel("order", e.order, [["sequential", "In the order of your notes"], ["shuffled", "Shuffled"]])}</label>
      <label class="check"><input type="checkbox" name="mine" ${isMine ? "checked" : ""}> <span>Make this my exam date everywhere in Gradify (no card is scheduled after it)</span></label>
      <div class="row-actions"><button class="btn btn-light lg btn-sm"><span>Save</span></button><button type="button" class="btn btn-ghost lg btn-sm" id="ex-del"><span>Delete exam</span></button></div>
      ${e.scope.length ? `<p class="sub">Sources: ${e.scope.map((s) => `<a href="#/notes/${s}">${esc(M.nameOf(kb, s))}</a>`).join(", ")}</p>` : ""}
    </form></div>`;
  const put = (patch) => { kb.exams[id] = { ...kb.exams[id], ...patch, u: Date.now() }; api.save(); examPage(main, api, id); };
  $("#ex-form", main).addEventListener("submit", async (ev) => {
    ev.preventDefault(); const f = ev.target;
    const days = [0, 1, 2, 3, 4, 5, 6].filter((i) => f[`d${i}`].checked);
    if (!days.length) return api.toast("Choose at least one study day.");
    if (f.mine.checked && !isMine) await api.ctx.store.saveProfile({ exam_date: f.date.value }).then(() => api.toast("Your exam date is set across Gradify.")).catch(() => {});
    put({ name: f.name.value.trim() || "Exam", date: f.date.value, days, maxPerDay: Number(f.maxPerDay.value) || 120, reps: Number(f.reps.value), finalDays: Number(f.finalDays.value), extra: Number(f.extra.value) || 0, order: f.order.value });
  });
  $("#ex-add", main).onclick = async () => { const to = await api.pick("Add which document or folder?", { docs: true }); if (to) put({ scope: [...new Set([...e.scope, to])], startCount: null }); };
  main.addEventListener("click", (ev) => { const s = ev.target.closest("[data-unscope]")?.dataset.unscope; if (s) put({ scope: e.scope.filter((x) => x !== s), startCount: null }); });
  $("#ex-del", main).onclick = () => { if (!confirm(`Delete the plan for ${e.name}? Your notes and cards stay.`)) return; kb.exams[id] = { ...e, deleted: true, u: Date.now() }; api.save(); location.hash = "#/notes/exams"; };
  $("#ex-go", main).onclick = () => api.practise(`exam:${id}`, "due");
}
