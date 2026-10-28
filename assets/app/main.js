// Gradify app: bring your notes, get a checked study pack, revise it, and watch your progress.
// Every screen reads and writes the same store, so they always agree.
import { GROUPS } from "../sites.js";
import { icon } from "../icons.js";
import { tile, ink } from "../colour.js";
import { SAMPLE, readFile } from "../studio.js";
import { LocalStore, CloudStore, cloudConfigured } from "./store.js";
import { generate, regenerateCard } from "./engine.js";
import { schedule, preview, isDue, isLearned, strength, fmtInterval, RATINGS } from "./srs.js";

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const DAY = 864e5;
const dayKey = (d) => { const x = new Date(d); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`; };
const today = () => dayKey(new Date());
const fmtDate = (d, o = { day: "numeric", month: "short" }) => new Date(d).toLocaleDateString("en-GB", o);
const SITES = GROUPS.flatMap((g) => g.items).filter((s) => s.n !== "Klerio");
const siteOf = (n) => SITES.find((s) => s.n === n) || { n: "Gradify", c: "f055dd", i: "sparkles" };
const levelOf = (xp) => Math.floor(Math.sqrt(xp / 50)) + 1;
const xpForLevel = (l) => 50 * (l - 1) ** 2;
const SEC_PER_CARD = 25;

let store, profile, view = $("#view");

// ---------- Toast ----------
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.innerHTML = msg;
  t.hidden = false;
  t.classList.remove("show"); void t.offsetWidth; t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 4500);
}

// ---------- Derived numbers (one place, used by every screen) ----------
async function stats() {
  const [cards, acts, reviews, docs] = await Promise.all([store.listCards(), store.listActivity(400), store.listReviews(30), store.listDocuments()]);
  const byDay = {};
  for (const a of acts) { const k = dayKey(a.at); byDay[k] = (byDay[k] || 0) + 1; }
  let streak = 0;
  for (let d = new Date(), first = true; ; first = false) {
    const k = dayKey(d);
    if (byDay[k]) streak++; else if (!first) break;
    d = new Date(+d - DAY);
    if (streak > 3650) break;
  }
  let longest = 0, run = 0;
  for (let i = 365; i >= 0; i--) { if (byDay[dayKey(Date.now() - i * DAY)]) longest = Math.max(longest, ++run); else run = 0; }
  const live = cards.filter((c) => !c.suspended);
  const due = live.filter((c) => isDue(c));
  const learned = live.filter(isLearned);
  const right = reviews.filter((r) => r.rating !== "again").length;
  return {
    cards: live, due, learned, docs, acts, byDay, streak, longest,
    accuracy: reviews.length ? right / reviews.length : null, reviews30: reviews.length,
    readiness: live.length ? learned.length / live.length : 0,
    xp: profile.xp || acts.reduce((a, x) => a + (x.xp || 0), 0),
  };
}

// ---------- Router ----------
const routes = { today: renderToday, start: renderStart, new: renderNew, deck: renderDeck, study: renderStudy, progress: renderProgress, plan: renderPlan, account: renderAccount };
async function route() {
  const [name, arg] = (location.hash.replace(/^#\/?/, "") || "today").split("/");
  if (!profile.goal && !["start", "account"].includes(name)) { location.replace("#/start"); return; }
  document.querySelectorAll(".app-nav a").forEach((a) => a.setAttribute("aria-current", String(a.dataset.route === name || (name === "deck" && a.dataset.route === "notes") || (name === "new" && a.dataset.route === "notes"))));
  view.innerHTML = '<div class="loading" aria-busy="true"></div>';
  try { await (routes[name] || renderToday)(arg); } catch (e) { console.error(e); view.innerHTML = `<div class="panel glass"><h3>Something went wrong</h3><p class="sub">${esc(e.message)}</p></div>`; }
  view.focus({ preventScroll: true });
  scrollTo(0, 0);
}

// ---------- First-time setup ----------
const GOALS = [
  { id: "exam", t: "Pass an exam", d: "Revise for a test with a date", i: "flame" },
  { id: "course", t: "Keep up with my course", d: "Turn every lecture into flashcards", i: "cap" },
  { id: "qualification", t: "Get a qualification", d: "Professional or career exams", i: "award" },
  { id: "curious", t: "Learn something new", d: "No deadline, just progress", i: "bulb" },
];
const picks = {}; // choices made during setup, saved together at the end
async function renderStart(stepArg) {
  const step = Number(stepArg) || 1;
  const p = profile;
  const dots = [1, 2, 3].map((n) => `<i class="${n <= step ? "on" : ""}"></i>`).join("");
  if (step === 1) {
    view.innerHTML = `<section class="setup"><div class="setup-dots">${dots}</div>
      <h1>What do you want to achieve?</h1><p class="sub">Gradify plans your revision around it. You can change it any time.</p>
      <div class="goal-grid">${GOALS.map((g) => `<button type="button" class="goal-card glass ${p.goal === g.id ? "on" : ""}" data-goal="${g.id}"><span class="g-ico">${icon(g.i)}</span><b>${g.t}</b><span>${g.d}</span></button>`).join("")}</div></section>`;
    view.querySelector(".goal-grid").addEventListener("click", (e) => {
      const b = e.target.closest("[data-goal]");
      if (!b) return;
      picks.goal = b.dataset.goal;
      location.hash = picks.site ? "#/start/3" : "#/start/2";
    });
    return;
  }
  if (step === 2) {
    const picked = p.site || "";
    const groups = GROUPS.filter((g) => g.id !== "tech").concat(GROUPS.filter((g) => g.id === "tech"));
    view.innerHTML = `<section class="setup"><div class="setup-dots">${dots}</div>
      <h1>What are you studying?</h1><p class="sub">Pick the Gradify site that fits. Your notes, cards and progress will be tagged with it.</p>
      <label class="search-field"><span class="sr-only">Search subjects</span><input id="site-q" type="search" placeholder="Search, e.g. medicine, law, maths" autocomplete="off"></label>
      ${groups.map((g) => `<h3 class="setup-group">${esc(g.title)}</h3><div class="site-grid">${g.items.filter((s) => s.n !== "Klerio").map((s) => `<button type="button" class="site-pick ${picked === s.n ? "on" : ""}" data-site="${esc(s.n)}" data-s="${esc((s.n + " " + s.d).toLowerCase())}" style="--c:#${s.c};--tile:${tile(s.c)};--ink:${ink(s.c)}"><span class="icon">${icon(s.i)}</span><span><b>${esc(s.n.replace(" · ForgeLab", ""))}</b><em>${esc(s.d.split(/[:.]/)[0])}</em></span></button>`).join("")}</div>`).join("")}
    </section>`;
    $("#site-q").addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      view.querySelectorAll(".site-pick").forEach((b) => { b.hidden = q && !b.dataset.s.includes(q); });
    });
    view.querySelector(".setup").addEventListener("click", (e) => {
      const b = e.target.closest("[data-site]");
      if (!b) return;
      picks.site = b.dataset.site;
      location.hash = "#/start/3";
    });
    return;
  }
  const goal = picks.goal || p.goal || "course";
  const site = picks.site || p.site || "UnderGradify";
  view.innerHTML = `<section class="setup"><div class="setup-dots">${dots}</div>
    <h1>A couple of details</h1><p class="sub">So Gradify can pace your revision.</p>
    <form class="setup-form panel glass" id="details">
      ${goal === "exam" || goal === "qualification" ? `<label><span>When is the exam?</span><input type="date" name="exam_date" min="${today()}" value="${p.exam_date || ""}"></label>` : ""}
      <label><span>How long can you study on a normal day?</span>
        <select name="daily_minutes">${[10, 20, 30, 45, 60, 90].map((m) => `<option value="${m}" ${Number(p.daily_minutes || 20) === m ? "selected" : ""}>${m} minutes</option>`).join("")}</select></label>
      <label><span>Level</span><select name="level">${[["school", "School"], ["undergraduate", "University"], ["postgraduate", "Postgraduate"], ["professional", "Professional"]].map(([v, l]) => `<option value="${v}" ${p.level === v ? "selected" : ""}>${l}</option>`).join("")}</select></label>
      <label><span>Your first name (optional)</span><input name="display_name" autocomplete="given-name" value="${esc(p.display_name || "")}"></label>
      <button class="btn btn-primary lg" type="submit"><span>Next: add your notes</span></button>
    </form></section>`;
  $("#details").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    profile = await store.saveProfile({ goal, site, exam_date: f.get("exam_date") || null, daily_minutes: Number(f.get("daily_minutes")), level: f.get("level"), display_name: (f.get("display_name") || "").trim() || null });
    location.hash = "#/new";
  });
}

// ---------- Add notes ----------
async function renderNew() {
  const s = siteOf(profile.site);
  const ai = store.mode === "cloud" && (await store.user());
  view.innerHTML = `<section class="new">
    <span class="kicker">${esc(s.n)}</span>
    <h1>Bring your notes</h1>
    <p class="sub">Upload a PDF of your notes, however messy, or paste them. Gradify turns them into checked flashcards in about a minute.</p>
    <div class="engine-note ${ai ? "ai" : ""}">${ai ? `${icon("sparkles")}<span><b>Gradify AI</b> (Claude) will read your notes. Every flashcard is checked against them.</span>` : `${icon("lock")}<span><b>Working on this device.</b> The quick extractor runs in your browser and handles tidy definitions best. ${cloudConfigured() ? '<a href="#/account">Sign in</a> to use Gradify AI, which handles messy notes, diagrams and scans.' : "Gradify AI switches on when accounts launch."}</span>`}</div>
    <form id="upload" class="upload panel glass">
      <label class="dropzone" id="drop"><input type="file" id="file" accept=".pdf,.txt,.md,application/pdf,text/plain"><span class="dz-ico">${icon("upload")}</span><span><b>Drop a PDF here or choose a file</b><em>PDF, .txt or .md · one lecture or topic works best</em></span></label>
      <label class="sr-only" for="text">Or paste your notes</label>
      <textarea id="text" rows="8" placeholder="…or paste your notes here"></textarea>
      <label class="title-field"><span>Title</span><input id="title" placeholder="e.g. Cardiac cycle, lecture 4" maxlength="120"></label>
      <div class="row-actions"><button class="btn btn-primary lg" type="submit" id="go"><span>Make my study pack</span></button><button type="button" class="btn btn-ghost lg" id="sample"><span>Try sample notes</span></button></div>
      <p class="sub" id="status" aria-live="polite"></p>
    </form></section>`;
  let pdfBase64 = null, pages = null, fileName = null;
  const status = $("#status");
  async function take(file) {
    if (!file) return;
    status.textContent = `Reading ${file.name}…`;
    fileName = file.name;
    try {
      const text = await readFile(file);
      $("#text").value = text.trim();
      if (!$("#title").value) $("#title").value = file.name.replace(/\.[a-z]+$/i, "").replace(/[_-]+/g, " ");
      pdfBase64 = null;
      if (/pdf$/i.test(file.name) && text.trim().length < 200 && file.size < 20e6) {
        const buf = new Uint8Array(await file.arrayBuffer());
        let bin = ""; for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
        pdfBase64 = btoa(bin);
      }
      pages = (text.match(/\f/g) || []).length || null;
      status.textContent = text.trim() ? `Read ${text.trim().split(/\s+/).length.toLocaleString("en-GB")} words from ${file.name}.` : "This PDF has no selectable text. Gradify AI can read it once you're signed in.";
    } catch { status.textContent = "Couldn't read that file. Try a PDF with selectable text, or a .txt file."; }
  }
  $("#file").addEventListener("change", (e) => take(e.target.files[0]));
  const drop = $("#drop");
  drop.addEventListener("dragover", (e) => { e.preventDefault(); drop.classList.add("over"); });
  drop.addEventListener("dragleave", () => drop.classList.remove("over"));
  drop.addEventListener("drop", (e) => { e.preventDefault(); drop.classList.remove("over"); take(e.dataTransfer.files[0]); });
  $("#sample").addEventListener("click", () => { $("#text").value = SAMPLE; $("#title").value = "Cardiac cycle"; status.textContent = "Sample notes added. Press “Make my study pack”."; });
  $("#upload").addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = $("#text").value.trim();
    const title = $("#title").value.trim() || "My notes";
    if (!text && !pdfBase64) { status.textContent = "Add a file or paste some notes first."; return; }
    const btn = $("#go");
    btn.disabled = true;
    btn.querySelector("span").textContent = ai ? "Gradify AI is reading your notes…" : "Making your pack…";
    status.textContent = ai ? "This usually takes 30 to 90 seconds." : "";
    try {
      const out = await generate({ text, pdfBase64, title, site: profile.site, level: profile.level, store });
      if (!out.cards.length) throw new Error("No flashcards could be made from these notes. Try notes with full sentences, or sign in to use Gradify AI.");
      const doc = await store.addDocument({ title: out.pack.title || title, site: profile.site, file_name: fileName, pages, text });
      if (out.engine === "claude" && store.linkPack) await store.linkPack(out.packId, doc.id);
      else await store.addPack({ document_id: doc.id, engine: out.engine, model: out.model, pack: out.pack, stats: out.stats });
      await store.addCards(out.cards.map((c) => ({ document_id: doc.id, topic: c.topic, front: c.front, back: c.back, kind: c.kind, source_quote: c.sourceQuote, source_page: c.sourcePage, grounded: c.grounded })));
      await store.logActivity({ site: profile.site, kind: "pack", xp: 15, detail: { title: doc.title, cards: out.cards.length } });
      // dates in the notes become plan items
      for (const d of out.pack.dates || []) if (d.date && d.date >= today()) await store.saveBlock({ day: d.date, start_min: 9 * 60, end_min: 9 * 60 + 30, title: d.what, cal: d.kind === "exam" ? "exam" : "deadline" });
      location.hash = `#/deck/${doc.id}`;
    } catch (err) {
      status.textContent = err.message;
      btn.disabled = false;
      btn.querySelector("span").textContent = "Make my study pack";
    }
  });
}

// ---------- A deck: check, edit and fix the cards ----------
const GROUNDED = {
  yes: ["ok", "Checked against your notes"],
  partly: ["warn", "Partly matches your notes. Worth a look"],
  no: ["bad", "Couldn't find this in your notes. Check it"],
  bonus: ["info", "Extra from Gradify AI, not in your notes"],
};
async function renderDeck(id) {
  const docs = await store.listDocuments();
  const doc = docs.find((d) => d.id === id);
  if (!id || !doc) return renderNotes();
  const [cards, pack] = await Promise.all([store.listCards({ documentId: id }), store.getPack(id)]);
  const st = pack?.stats || {};
  const flagged = cards.filter((c) => c.grounded === "no" || c.grounded === "partly");
  const due = cards.filter((c) => isDue(c) && !c.suspended);
  const topics = [...new Set(cards.map((c) => c.topic || "Cards"))];
  view.innerHTML = `<section class="deck">
    <a class="back" href="#/notes">← All notes</a>
    <div class="deck-head">
      <div><span class="kicker">${esc(doc.site || profile.site)} · ${fmtDate(doc.created_at)}</span><h1>${esc(doc.title)}</h1>
        <span class="engine-badge ${pack?.engine === "claude" ? "ai" : ""}">${pack?.engine === "claude" ? `${icon("sparkles")}Made by Gradify AI` : `${icon("lock")}Made on this device`}</span></div>
      <a class="btn btn-primary lg" href="#/study/${id}"><span>${due.length ? `Revise ${due.length} ${due.length === 1 ? "card" : "cards"}` : "Practise anyway"}</span></a>
    </div>
    <div class="deck-stats">
      <div><b>${cards.length}</b><span>cards</span></div>
      <div><b>${cards.length ? Math.round((cards.filter((c) => c.grounded === "yes").length / cards.length) * 100) : 0}%</b><span>checked against notes</span></div>
      <div class="${flagged.length ? "warn" : ""}"><b>${flagged.length}</b><span>to check</span></div>
      <div><b>${cards.filter(isLearned).length}</b><span>learned</span></div>
    </div>
    ${(pack?.pack?.unclear || []).length ? `<div class="unclear panel glass"><b>${icon("bell")}Gradify AI noticed</b><ul>${pack.pack.unclear.map((u) => `<li>${esc(u)}</li>`).join("")}</ul></div>` : ""}
    ${flagged.length ? `<p class="sub">Cards marked <span class="g-pill warn">to check</span> couldn't be fully matched to your notes. Edit them, regenerate them or delete them before you revise.</p>` : ""}
    <div class="deck-tools"><button type="button" class="btn btn-ghost lg btn-sm" id="add-card"><span>+ Add a card</span></button>
      <button type="button" class="btn btn-ghost lg btn-sm danger" id="del-deck"><span>Delete these notes</span></button></div>
    ${topics.map((t) => `<h3 class="topic-h">${esc(t)}</h3><div class="card-list">${cards.filter((c) => (c.topic || "Cards") === t).map(cardRow).join("")}</div>`).join("")}
  </section>`;
  const list = view.querySelector(".deck");
  list.addEventListener("click", async (e) => {
    const row = e.target.closest(".c-row");
    const act = e.target.closest("[data-act]")?.dataset.act;
    if (e.target.closest("#add-card")) {
      const [c] = await store.addCards([{ document_id: id, topic: "My cards", front: "New question", back: "Answer", kind: "definition", grounded: "bonus", edited: true }]);
      await renderDeck(id);
      const el = view.querySelector(`[data-id="${c.id}"]`);
      el?.querySelector('[data-act="edit"]').click();
      return;
    }
    if (e.target.closest("#del-deck")) {
      if (!confirm(`Delete “${doc.title}” and its ${cards.length} cards? This can't be undone.`)) return;
      await store.deleteDocument(id);
      toast("Deleted.");
      location.hash = "#/notes";
      return;
    }
    if (!row || !act) return;
    const card = cards.find((c) => c.id === row.dataset.id);
    if (act === "edit") {
      row.classList.add("editing");
      row.querySelector(".c-body").innerHTML = `<label><span>Question</span><textarea class="e-front" rows="2">${esc(card.front)}</textarea></label><label><span>Answer</span><textarea class="e-back" rows="3">${esc(card.back)}</textarea></label>
        <div class="row-actions"><button type="button" class="btn btn-light lg btn-sm" data-act="save"><span>Save</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-act="cancel"><span>Cancel</span></button></div>`;
      row.querySelector(".e-front").focus();
    } else if (act === "cancel") renderDeck(id);
    else if (act === "save") {
      const front = row.querySelector(".e-front").value.trim(), back = row.querySelector(".e-back").value.trim();
      if (!front || !back) { toast("A card needs a question and an answer."); return; }
      await store.updateCard(card.id, { front, back, edited: true, grounded: card.grounded === "no" || card.grounded === "partly" ? "bonus" : card.grounded });
      toast("Saved.");
      renderDeck(id);
    } else if (act === "regen") {
      e.target.closest("button").disabled = true;
      try {
        const next = await regenerateCard({ card, notes: doc.text || "", store });
        await store.updateCard(card.id, { ...next, edited: true });
        renderDeck(id);
      } catch (err) { toast(esc(err.message)); e.target.closest("button").disabled = false; }
    } else if (act === "del") {
      await store.deleteCard(card.id);
      row.remove();
      toast("Card deleted.");
    } else if (act === "ok") {
      await store.updateCard(card.id, { grounded: "yes", edited: true });
      renderDeck(id);
    }
  });
}
function cardRow(c) {
  const [cls, label] = GROUNDED[c.grounded] || GROUNDED.bonus;
  return `<article class="c-row panel glass" data-id="${c.id}">
    <div class="c-body"><p class="c-front">${esc(c.front)}</p><p class="c-back">${esc(c.back)}</p>
      ${c.edited ? `<p class="c-src"><span class="g-pill info">Edited by you</span>${c.source_quote ? ` Source: “${esc(c.source_quote)}”` : ""}</p>`
        : c.source_quote ? `<p class="c-src"><span class="g-pill ${cls}">${label}</span> “${esc(c.source_quote)}”${c.source_page ? ` · page ${c.source_page}` : ""}</p>` : `<p class="c-src"><span class="g-pill ${cls}">${label}</span></p>`}
    </div>
    <div class="c-actions">
      <button type="button" class="icon-btn" data-act="edit" aria-label="Edit card" title="Edit">${icon("pencil")}</button>
      <button type="button" class="icon-btn" data-act="regen" aria-label="Regenerate card" title="Write a new version">${icon("sparkles")}</button>
      ${c.grounded === "no" || c.grounded === "partly" ? `<button type="button" class="icon-btn" data-act="ok" aria-label="Mark as correct" title="It's correct">${icon("check")}</button>` : ""}
      <button type="button" class="icon-btn" data-act="del" aria-label="Delete card" title="Delete">${icon("x")}</button>
    </div>
    <span class="c-meta">${c.reps ? `Next review ${new Date(c.due_at) <= new Date() ? "now" : fmtDate(c.due_at)}` : "New"}</span>
  </article>`;
}

// ---------- All notes ----------
async function renderNotes() {
  const [docs, cards] = await Promise.all([store.listDocuments(), store.listCards()]);
  view.innerHTML = `<section class="notes">
    <div class="deck-head"><div><h1>Your notes</h1><p class="sub">Every set of notes you've added, with its cards.</p></div><a class="btn btn-primary lg" href="#/new"><span>+ Add notes</span></a></div>
    ${docs.length ? `<div class="doc-grid">${docs.map((d) => {
      const cs = cards.filter((c) => c.document_id === d.id);
      const due = cs.filter((c) => isDue(c)).length;
      const s = siteOf(d.site);
      const m = cs.length ? cs.reduce((a, c) => a + strength(c), 0) / cs.length : 0;
      return `<a class="doc panel glass" href="#/deck/${d.id}" style="--c:#${s.c};--tile:${tile(s.c)};--ink:${ink(s.c)}"><span class="icon">${icon(s.i)}</span><b>${esc(d.title)}</b>
        <span class="sub">${cs.length} cards · ${due ? `${due} due` : "nothing due"} · ${fmtDate(d.created_at)}</span><span class="goal-bar"><i style="width:${Math.round(m * 100)}%"></i></span></a>`;
    }).join("")}</div>` : `<div class="empty-state panel glass">${icon("upload")}<h3>No notes yet</h3><p class="sub">Add your first set of notes and Gradify will make flashcards from them.</p><a class="btn btn-primary lg" href="#/new"><span>Add notes</span></a></div>`}
  </section>`;
}
routes.notes = renderNotes;

// ---------- Revision session ----------
async function renderStudy(deckId) {
  const all = await store.listCards(deckId ? { documentId: deckId } : {});
  let queue = all.filter((c) => isDue(c) && !c.suspended);
  const practice = !queue.length && deckId;
  if (practice) queue = [...all].sort(() => Math.random() - 0.5);
  const cap = Math.max(10, Math.round(((profile.daily_minutes || 20) * 60) / SEC_PER_CARD));
  // reviews first, then new cards
  queue.sort((a, b) => (a.reps ? 0 : 1) - (b.reps ? 0 : 1) || new Date(a.due_at) - new Date(b.due_at));
  queue = queue.slice(0, cap);
  if (!queue.length) {
    view.innerHTML = `<div class="empty-state panel glass">${icon("check")}<h3>All caught up</h3><p class="sub">Nothing is due right now. Add more notes, or come back later.</p><div class="row-actions"><a class="btn btn-primary lg" href="#/new"><span>Add notes</span></a><a class="btn btn-ghost lg" href="#/today"><span>Back to Today</span></a></div></div>`;
    return;
  }
  const total = queue.length;
  const results = { again: 0, hard: 0, good: 0, easy: 0 };
  let i = 0, shown = false, t0 = Date.now(), xp = 0;
  const again = [];
  const draw = () => {
    const c = queue[i];
    const p = preview(c);
    view.innerHTML = `<section class="session">
      <div class="sess-top"><a href="${deckId ? `#/deck/${deckId}` : "#/today"}" class="back">✕ End</a><span class="goal-bar"><i style="width:${(i / total) * 100}%"></i></span><span class="sub">${Math.min(i + 1, total)} / ${total}${practice ? " · practice" : ""}</span></div>
      <article class="flash-card ${shown ? "shown" : ""}" aria-live="polite">
        <span class="kicker">${esc(c.topic || "")}${c.reps ? "" : " · new"}</span>
        <p class="fc-front">${esc(c.front)}</p>
        ${shown ? `<p class="fc-back">${esc(c.back)}</p>${c.source_quote ? `<p class="c-src">From your notes: “${esc(c.source_quote)}”</p>` : ""}` : ""}
      </article>
      ${shown ? `<div class="rate4" role="group" aria-label="How well did you know it?">${RATINGS.map((r, k) => `<button type="button" class="r-${r}" data-r="${r}"><b>${r[0].toUpperCase() + r.slice(1)}</b><span>${fmtInterval(p[r])}</span><kbd>${k + 1}</kbd></button>`).join("")}</div>`
        : `<button type="button" class="btn btn-light lg reveal" id="reveal"><span>Show answer</span><kbd>Space</kbd></button>`}
    </section>`;
  };
  const rate = async (r) => {
    const c = queue[i];
    const next = practice ? {} : schedule(c, r);
    results[r]++;
    xp += r === "again" ? 1 : 2;
    if (!practice) {
      await store.updateCard(c.id, next);
      await store.addReview({ card_id: c.id, rating: r, interval_days: next.interval_days, ms: Date.now() - t0 });
      if (r === "again" && !again.includes(c.id)) { again.push(c.id); queue.push({ ...c, ...next }); }
    }
    i++; shown = false; t0 = Date.now();
    if (i >= queue.length) return finish();
    draw();
  };
  const finish = async () => {
    removeEventListener("keydown", keys);
    const answered = Object.values(results).reduce((a, b) => a + b, 0);
    xp += 10;
    await store.logActivity({ site: profile.site, kind: "session", xp: Math.min(xp, 500), detail: { cards: answered, ...results, practice: Boolean(practice) } });
    // tick off today's review block in the plan
    const blocks = await store.listBlocks(today(), today());
    for (const b of blocks) if (b.auto && !b.done && /review/i.test(b.title)) await store.saveBlock({ ...b, done: true });
    profile = await store.getProfile();
    const s = await stats();
    const right = answered - results.again;
    view.innerHTML = `<section class="done-screen">
      <div class="done-burst">${icon("check")}</div>
      <h1>Session done</h1>
      <p class="sub">${answered} ${answered === 1 ? "answer" : "answers"} · ${Math.round((right / answered) * 100)}% right first time · +${Math.min(xp, 500)} XP</p>
      <div class="deck-stats">
        <div><b>${s.streak}</b><span>day streak ${icon("flame")}</span></div>
        <div><b>${s.learned.length}</b><span>cards learned</span></div>
        <div><b>${s.due.length}</b><span>still due</span></div>
        <div><b>Level ${levelOf(s.xp)}</b><span>${s.xp} XP</span></div>
      </div>
      <div class="rate-sum">${RATINGS.map((r) => `<span class="r-${r}"><b>${results[r]}</b>${r}</span>`).join("")}</div>
      <div class="row-actions"><a class="btn btn-primary lg" href="#/today"><span>Back to Today</span></a><a class="btn btn-ghost lg" href="#/progress"><span>See progress</span></a></div>
    </section>`;
  };
  const keys = (e) => {
    if (e.target.closest("input, textarea")) return;
    if (!shown && (e.key === " " || e.key === "Enter")) { e.preventDefault(); shown = true; draw(); }
    else if (shown && ["1", "2", "3", "4"].includes(e.key)) rate(RATINGS[+e.key - 1]);
  };
  addEventListener("keydown", keys);
  addEventListener("hashchange", () => removeEventListener("keydown", keys), { once: true });
  view.addEventListener("click", (e) => {
    if (e.target.closest("#reveal")) { shown = true; draw(); return; }
    const r = e.target.closest("[data-r]");
    if (r) rate(r.dataset.r);
  });
  draw();
}

// ---------- Today ----------
async function ensureReviewBlock(s) {
  const blocks = await store.listBlocks(today(), today());
  const mins = Math.max(5, Math.min(profile.daily_minutes || 20, Math.ceil((s.due.length * SEC_PER_CARD) / 60)));
  const existing = blocks.find((b) => b.auto && /review/i.test(b.title));
  if (s.due.length && !existing) {
    const now = new Date();
    const start = Math.min(22 * 60, Math.ceil((now.getHours() * 60 + now.getMinutes() + 15) / 15) * 15);
    return [...blocks, await store.saveBlock({ day: today(), start_min: start, end_min: Math.min(1440, start + mins), title: `Review ${s.due.length} due cards`, cal: "study", auto: true })];
  }
  return blocks;
}
function heatmap(byDay, weeks = 16) {
  const end = new Date(); const start = new Date(+end - (weeks * 7 - 1) * DAY);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  let cells = "";
  for (let d = new Date(start); d <= end; d = new Date(+d + DAY)) {
    const n = byDay[dayKey(d)] || 0;
    const lv = n === 0 ? 0 : n === 1 ? 1 : n <= 3 ? 2 : n <= 6 ? 3 : 4;
    cells += `<i class="l${lv} ${dayKey(d) === today() ? "today" : ""}" title="${fmtDate(d, { weekday: "short", day: "numeric", month: "short" })}: ${n} ${n === 1 ? "activity" : "activities"}"></i>`;
  }
  return `<div class="hm" style="--weeks:${Math.ceil(((+end - +start) / DAY + 1) / 7)}">${cells}</div>`;
}
async function renderToday() {
  const s = await stats();
  const blocks = (await ensureReviewBlock(s)).sort((a, b) => a.start_min - b.start_min);
  const site = siteOf(profile.site);
  const lv = levelOf(s.xp), into = s.xp - xpForLevel(lv), need = xpForLevel(lv + 1) - xpForLevel(lv);
  const examIn = profile.exam_date ? Math.ceil((new Date(profile.exam_date) - new Date(today())) / DAY) : null;
  const mins = Math.ceil((s.due.length * SEC_PER_CARD) / 60);
  const next = !s.cards.length
    ? { t: "Add your first notes", d: "Upload a PDF or paste your notes. Gradify turns them into flashcards you can trust.", href: "#/new", cta: "Add notes" }
    : s.due.length
      ? { t: `Review ${s.due.length} ${s.due.length === 1 ? "card" : "cards"}`, d: `About ${mins} ${mins === 1 ? "minute" : "minutes"}. Cards come back just before you'd forget them.`, href: "#/study", cta: "Start session" }
      : { t: "You're all caught up", d: "Nothing is due. Add the next lecture's notes while it's fresh.", href: "#/new", cta: "Add notes" };
  const hour = new Date().getHours();
  view.innerHTML = `<section class="today">
    <h1>${hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"}${profile.display_name ? `, ${esc(profile.display_name)}` : ""}</h1>
    <div class="today-grid">
      <article class="panel glass next-up" style="--c:#${site.c}">
        <span class="kicker">${icon("flame")}Do this next</span><h2>${next.t}</h2><p class="sub">${next.d}</p>
        <a class="btn btn-light lg" href="${next.href}"><span>${next.cta}</span></a>
      </article>
      <article class="panel glass stat-tiles">
        <div><b>${s.streak}</b><span>day streak</span></div>
        <div><b>${s.learned.length}<small>/${s.cards.length}</small></b><span>cards learned</span></div>
        <div><b>${s.accuracy == null ? "–" : Math.round(s.accuracy * 100) + "%"}</b><span>right, last 30 days</span></div>
        <div class="lvl"><b>Level ${lv}</b><span class="goal-bar"><i style="width:${(into / need) * 100}%"></i></span><span>${into}/${need} XP to level ${lv + 1}</span></div>
      </article>
      ${examIn != null ? `<article class="panel glass exam">
        <span class="kicker">${icon("calendar")}${examIn >= 0 ? `Exam in ${examIn} ${examIn === 1 ? "day" : "days"}` : "Exam date has passed"}</span>
        <div class="ring-sm"><svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="34" class="track"/><circle cx="40" cy="40" r="34" class="fill" style="stroke-dasharray:${2 * Math.PI * 34};stroke-dashoffset:${2 * Math.PI * 34 * (1 - s.readiness)}"/></svg><b>${Math.round(s.readiness * 100)}%</b></div>
        <p class="sub">ready: the share of your cards you've learned.${(() => { const n = Math.ceil((s.cards.length - s.learned.length) / Math.max(1, examIn)); return s.cards.length && examIn > 0 && n ? ` Learn about ${n} more ${n === 1 ? "card" : "cards"} a day to be ready in time.` : ""; })()}</p>
      </article>` : ""}
      <article class="panel glass plan-today">
        <div class="panel-head"><h3>Today's plan</h3><a class="see" href="#/plan">Plan the week</a></div>
        ${blocks.length ? `<ul class="blocks">${blocks.map((b) => `<li class="${b.done ? "done" : ""} cal-${b.cal}"><time>${String(Math.floor(b.start_min / 60)).padStart(2, "0")}:${String(b.start_min % 60).padStart(2, "0")}</time><span>${esc(b.title)}</span>${b.done ? icon("check") : ""}</li>`).join("")}</ul>` : `<p class="sub">Nothing planned. Add study blocks in Plan.</p>`}
      </article>
      <article class="panel glass hm-panel">
        <div class="panel-head"><h3>Last 16 weeks</h3><a class="see" href="#/progress">Progress</a></div>
        ${heatmap(s.byDay)}
      </article>
    </div>
  </section>`;
}

// ---------- Progress ----------
async function renderProgress() {
  const s = await stats();
  const docs = s.docs;
  const forecast = Array.from({ length: 7 }, (_, k) => {
    const end = new Date(today()).getTime() + (k + 1) * DAY;
    const start = k === 0 ? -Infinity : end - DAY;
    return s.cards.filter((c) => { const t = new Date(c.due_at).getTime(); return t >= start && t < end; }).length;
  });
  const fmax = Math.max(1, ...forecast);
  const topics = {};
  for (const c of s.cards) { const k = `${c.document_id}|${c.topic || "Cards"}`; (topics[k] ||= []).push(c); }
  view.innerHTML = `<section class="progress">
    <h1>Progress</h1>
    <div class="deck-stats">
      <div><b>${s.streak}</b><span>day streak</span></div><div><b>${s.longest}</b><span>longest streak</span></div>
      <div><b>${s.reviews30}</b><span>reviews, 30 days</span></div><div><b>${s.xp}</b><span>XP · level ${levelOf(s.xp)}</span></div>
    </div>
    <article class="panel glass"><div class="panel-head"><h3>Your year</h3><span class="pill-dark">${Object.keys(s.byDay).length} active days</span></div><div class="hm-scroll">${heatmap(s.byDay, 52)}</div></article>
    <div class="prog-grid">
      <article class="panel glass"><div class="panel-head"><h3>Mastery by topic</h3></div>
        ${Object.keys(topics).length ? `<ul class="mastery">${Object.entries(topics).map(([k, cs]) => {
          const [docId, t] = k.split("|"); const d = docs.find((x) => x.id === docId);
          const m = cs.reduce((a, c) => a + strength(c), 0) / cs.length;
          return `<li><a href="#/deck/${docId}"><span><b>${esc(t)}</b><em>${esc(d?.title || "")}</em></span><span class="goal-bar"><i style="width:${Math.round(m * 100)}%"></i></span><em>${cs.filter(isLearned).length}/${cs.length}</em></a></li>`;
        }).join("")}</ul>` : `<p class="sub">Add notes to see your topics here.</p>`}
      </article>
      <article class="panel glass"><div class="panel-head"><h3>Reviews due this week</h3></div>
        <div class="forecast">${forecast.map((n, k) => `<div><span>${n}</span><i style="height:${(n / fmax) * 100}%"></i><em>${k === 0 ? "Today" : fmtDate(Date.now() + k * DAY, { weekday: "short" })}</em></div>`).join("")}</div>
      </article>
    </div>
  </section>`;
}

// ---------- Plan ----------
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
async function renderPlan() {
  const s = await stats();
  await ensureReviewBlock(s);
  const days = Array.from({ length: 7 }, (_, k) => dayKey(Date.now() + k * DAY));
  const blocks = await store.listBlocks(days[0], days[6]);
  view.innerHTML = `<section class="planner">
    <div class="deck-head"><div><h1>Plan</h1><p class="sub">Your next 7 days. Review blocks are added and ticked off automatically.</p></div><button type="button" class="btn btn-primary lg" id="autoplan"><span>Auto-plan my week</span></button></div>
    <form class="panel glass add-block" id="add-block">
      <label><span>Day</span><select name="day">${days.map((d, k) => `<option value="${d}">${k === 0 ? "Today" : fmtDate(d, { weekday: "long", day: "numeric" })}</option>`).join("")}</select></label>
      <label><span>From</span><input type="time" name="from" value="18:00" step="900" required></label>
      <label><span>To</span><input type="time" name="to" value="19:00" step="900" required></label>
      <label class="grow"><span>What</span><input name="title" placeholder="e.g. Physiology reading" required maxlength="80"></label>
      <button class="btn btn-light lg btn-sm" type="submit"><span>Add block</span></button>
    </form>
    <div class="week-list">${days.map((d, k) => {
      const list = blocks.filter((b) => b.day === d).sort((a, b) => a.start_min - b.start_min);
      const exam = profile.exam_date === d;
      return `<article class="panel glass day-col ${k === 0 ? "is-today" : ""}"><h3>${k === 0 ? "Today" : fmtDate(d, { weekday: "long" })} <em>${fmtDate(d)}</em></h3>
        ${exam ? `<p class="exam-flag">${icon("flame")}Exam day</p>` : ""}
        ${list.length ? `<ul class="blocks">${list.map((b) => `<li class="${b.done ? "done" : ""} cal-${b.cal}" data-id="${b.id}"><time>${hhmm(b.start_min)}–${hhmm(b.end_min)}</time><span>${esc(b.title)}</span>
          <button type="button" class="icon-btn" data-act="done" aria-label="${b.done ? "Mark not done" : "Mark done"}">${icon("check")}</button><button type="button" class="icon-btn" data-act="del" aria-label="Delete block">${icon("x")}</button></li>`).join("")}</ul>` : `<p class="sub">Free</p>`}
      </article>`;
    }).join("")}</div>
  </section>`;
  view.querySelector("#add-block").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const toMin = (t) => { const [h, m] = String(t).split(":").map(Number); return h * 60 + m; };
    const a = toMin(f.get("from")), b = toMin(f.get("to"));
    if (b <= a) { toast("The end time needs to be after the start."); return; }
    await store.saveBlock({ day: f.get("day"), start_min: a, end_min: b, title: String(f.get("title")).trim(), cal: "study" });
    renderPlan();
  });
  view.querySelector(".week-list").addEventListener("click", async (e) => {
    const li = e.target.closest("li[data-id]"), act = e.target.closest("[data-act]")?.dataset.act;
    if (!li || !act) return;
    const b = blocks.find((x) => x.id === li.dataset.id);
    if (act === "del") await store.deleteBlock(b.id);
    else {
      await store.saveBlock({ ...b, done: !b.done });
      if (!b.done) await store.logActivity({ site: profile.site, kind: "block", xp: Math.min(60, Math.round((b.end_min - b.start_min) / 3)), detail: { title: b.title } });
    }
    renderPlan();
  });
  $("#autoplan").addEventListener("click", async () => {
    // Each day: enough review time for what's due that day, at the learner's usual length
    const mins = profile.daily_minutes || 20;
    let made = 0;
    for (const [k, d] of days.entries()) {
      if (k === 0) continue;
      const end = new Date(d).getTime() + DAY;
      const due = s.cards.filter((c) => new Date(c.due_at).getTime() < end).length;
      const has = blocks.some((b) => b.day === d && b.auto);
      if (has || (!due && !profile.exam_date)) continue;
      const len = Math.max(10, Math.min(mins, Math.ceil((Math.max(due, 10) * SEC_PER_CARD) / 60)));
      await store.saveBlock({ day: d, start_min: 18 * 60, end_min: 18 * 60 + len, title: due ? `Review cards (about ${due})` : "Learn new cards", cal: "study", auto: true });
      made++;
    }
    toast(made ? `Added ${made} study ${made === 1 ? "block" : "blocks"} at 18:00. Drag isn't needed: edit the time by deleting and re-adding.` : "Your week already has study blocks.");
    renderPlan();
  });
}

// ---------- Account ----------
async function renderAccount() {
  const user = store.mode === "cloud" ? await store.user() : null;
  const s = siteOf(profile.site);
  view.innerHTML = `<section class="account">
    <h1>Account</h1>
    <article class="panel glass">
      ${user ? `<div class="panel-head"><div><h3>Signed in</h3><p class="sub">${esc(user.email)} · your notes and progress are saved to your Gradify account.</p></div><button type="button" class="btn btn-ghost lg btn-sm" id="signout"><span>Sign out</span></button></div>`
        : cloudConfigured() ? `<h3>Save your progress to a Gradify account</h3><p class="sub">Sign in to keep your notes on every device and to use Gradify AI. Anything on this device moves across.</p>
          <form id="signin" class="signin"><label class="sr-only" for="email">Email</label><input id="email" type="email" required placeholder="you@example.com" autocomplete="email"><button class="btn btn-primary lg btn-sm" type="submit"><span>Email me a sign-in link</span></button></form>
          <button type="button" class="btn btn-ghost lg btn-sm" id="google"><span>Continue with Google</span></button>`
        : `<h3>Saved on this device</h3><p class="sub">Gradify accounts aren't switched on yet, so your notes and progress are saved in this browser${store.persistent ? "" : " for this visit only (this browser is blocking storage)"}. Export a copy below to keep it safe.</p>`}
    </article>
    <form class="panel glass setup-form" id="prefs">
      <h3>Your learning</h3>
      <label><span>Goal</span><select name="goal">${GOALS.map((g) => `<option value="${g.id}" ${profile.goal === g.id ? "selected" : ""}>${g.t}</option>`).join("")}</select></label>
      <label><span>Subject</span><select name="site">${SITES.map((x) => `<option ${x.n === s.n ? "selected" : ""}>${esc(x.n)}</option>`).join("")}</select></label>
      <label><span>Exam date</span><input type="date" name="exam_date" value="${profile.exam_date || ""}"></label>
      <label><span>Daily study time</span><select name="daily_minutes">${[10, 20, 30, 45, 60, 90].map((m) => `<option value="${m}" ${Number(profile.daily_minutes) === m ? "selected" : ""}>${m} minutes</option>`).join("")}</select></label>
      <button class="btn btn-light lg btn-sm" type="submit"><span>Save</span></button>
    </form>
    <article class="panel glass"><h3>Your data</h3><p class="sub">It's yours. Download everything, or delete it.</p>
      <div class="row-actions"><button type="button" class="btn btn-light lg btn-sm" id="export"><span>Download my data</span></button><button type="button" class="btn btn-ghost lg btn-sm danger" id="wipe"><span>Delete all my data</span></button></div></article>
  </section>`;
  $("#prefs").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    profile = await store.saveProfile({ goal: f.get("goal"), site: f.get("site"), exam_date: f.get("exam_date") || null, daily_minutes: Number(f.get("daily_minutes")) });
    toast("Saved.");
  });
  $("#export").addEventListener("click", async () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(await store.exportAll(), null, 2)], { type: "application/json" }));
    a.download = `gradify-data-${today()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  $("#wipe").addEventListener("click", async () => {
    if (!confirm("Delete all your notes, cards and progress? This can't be undone.")) return;
    await store.wipe();
    profile = await store.getProfile();
    location.hash = "#/start";
  });
  $("#signin")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    try { await store.signInWithEmail($("#email").value.trim()); toast("Check your email for a sign-in link."); } catch (err) { toast(esc(err.message)); }
  });
  $("#google")?.addEventListener("click", () => store.signInWithGoogle().catch((err) => toast(esc(err.message))));
  $("#signout")?.addEventListener("click", async () => { await store.signOut(); location.reload(); });
}

// ---------- Start ----------
async function boot() {
  const local = new LocalStore();
  const cloud = await CloudStore.create();
  const user = cloud ? await cloud.user() : null;
  store = user ? cloud : (cloud && cloudConfigured() ? Object.assign(local, { signInWithEmail: (e) => cloud.signInWithEmail(e), signInWithGoogle: () => cloud.signInWithGoogle() }) : local);
  if (user && local.hasData() && !localStorage.getItem(`gradify.moved.${user.id}`)) {
    try { await cloud.importLocal(local); localStorage.setItem(`gradify.moved.${user.id}`, "1"); await local.wipe(); toast("Moved your notes and progress from this device into your account."); }
    catch (e) { console.error(e); toast("Couldn't move this device's data into your account. It's still saved here."); }
  }
  cloud?.onAuth((u) => { if (Boolean(u) !== Boolean(user)) location.reload(); });
  profile = await store.getProfile();
  // arriving from a site card: "Study MedGradify in Gradify"
  const fromSite = new URLSearchParams(location.search).get("site");
  if (fromSite && SITES.some((x) => x.n === fromSite)) {
    picks.site = fromSite;
    if (profile.goal && profile.site !== fromSite) { profile = await store.saveProfile({ site: fromSite }); toast(`Switched to ${esc(fromSite)}.`); }
    history.replaceState(null, "", location.pathname + location.hash);
  }
  $("#mode").innerHTML = user ? `${icon("check")}<span>${esc(user.email)}</span>` : `${icon("lock")}<span>On this device</span>`;
  addEventListener("hashchange", route);
  route();
}
boot();
