// Gradify Intelligence, on screen: the learning-intelligence strip and "what to do next" on the Command Centre, and
// the Intelligence, My Knowledge, Revision Centre and Smart Plan sections of LifeOS, plus Ask Gradify. Everything is
// read from one model (kit/intel/model.js), so every screen agrees, and every recommendation shows its reason and
// the evidence behind it. Styles: the "Intelligence" section of kit/app/app.css.
import { icon } from "../core/icons.js";
import { haptic } from "../core/haptics.js";
import { LEVELS } from "../learning/mastery.js";
import { planDay, reschedule, INTEL_DEFAULTS, fmtRange } from "../intel/schedule.js";
import { answer, QUESTIONS } from "../intel/ask.js";
import { dayKey, hhmm, DAY } from "../intel/memory.js";

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const pct = (v) => (v == null ? "–" : `${Math.round(v * 100)}%`);
const enc = encodeURIComponent;
const dateLabel = (d, o = { weekday: "short", day: "numeric", month: "short" }) => new Date(`${d}T12:00:00`).toLocaleDateString("en-GB", o);
const ago = (iso) => { const d = Math.round((Date.now() - Date.parse(iso)) / DAY); return d <= 0 ? "today" : d === 1 ? "yesterday" : `${d} days ago`; };
export const STAGES = [["seen", "Seen"], ["understood", "Understood"], ["retained", "Retained"], ["applied", "Applied"]];
const TAG_TONE = { "High priority": "hot", "Repeated mistake": "hot", "Deadline priority": "amber", Fading: "amber", "Due today": "blue", "New material": "green", Stretch: "violet" };
const tag = (t) => (t ? `<span class="i-tag ${TAG_TONE[t] || ""}">${esc(t)}</span>` : "");

// ---------- the Command Centre ----------
export function intelStripHtml(m) {
  const { preds: p, concepts } = m, r = p.readiness;
  const v = p.velocity, a = p.adherence;
  return `<div class="intel-strip">
    <a class="i-profile" href="#/intel">
      <span class="kicker">${icon("sparkles")}Your learning intelligence</span>
      <div class="i-big">${concepts.length ? pct(r.value) : "–"}<small>${concepts.length ? ` likely ${pct(r.low)}–${pct(r.high)}` : ""}</small></div>
      <span class="i-sub">Demonstrated mastery across ${concepts.length} ${concepts.length === 1 ? "concept" : "concepts"} · ${r.enough ? `${r.certainty >= 0.6 ? "high" : "medium"} certainty` : "still gathering evidence"}</span>
      <div class="i-split"><span><b>${p.strong.length}</b> strong</span><span><b>${p.gaps.length}</b> need work</span><span><b>${concepts.filter((c) => c.level === "new").length}</b> not started</span></div>
      <span class="i-meter" aria-hidden="true"><i style="left:${r.low * 100}%;right:${100 - r.high * 100}%"></i><b style="left:${r.value * 100}%"></b></span>
    </a>
    <a class="cp-mini i-mini" href="#/revise"><span class="cp-label">Knowledge gaps</span><span class="cp-num">${p.gaps.length}</span><span class="cp-foot">${p.gaps.length ? esc(p.gaps.slice(0, 2).map((c) => c.name).join(", ")) : "None found in your answers"}</span></a>
    <a class="cp-mini i-mini" href="#/study"><span class="cp-label">Due for review</span><span class="cp-num">${p.dueCards}</span><span class="cp-foot">${p.forgetting.length ? `${p.forgetting.length} ${p.forgetting.length === 1 ? "concept" : "concepts"} fading this week` : "Nothing fading this week"}</span></a>
    <a class="cp-mini i-mini" href="#/plan"><span class="cp-label">Plan kept</span><span class="cp-num">${a.value == null ? "–" : pct(a.value)}</span><span class="cp-foot">${a.planned ? `${a.done} of ${a.planned} study blocks, 14 days` : "Plan a session and this tracks it"}</span></a>
    <a class="cp-mini i-mini" href="#/intel"><span class="cp-label">Learning velocity</span><span class="cp-num">${v.delta != null ? `${v.delta >= 0 ? "+" : "−"}${Math.abs(Math.round(v.delta * 100))}` : v.now != null ? pct(v.now) : "–"}<small>${v.delta != null ? " pts" : ""}</small></span><span class="cp-foot">${v.delta != null ? `${pct(v.now)} right this week vs ${pct(v.prev)}` : v.now != null ? `right this week · ${v.answers} answers` : "Answer cards on two weeks to see a trend"}</span></a>
  </div>`;
}

export function nextHtml(m) {
  const [first, ...rest] = m.prio.items;
  if (!first) return `<article class="i-next"><span class="kicker">${icon("flame")}What Gradify thinks you should do next</span><h2>You're all caught up</h2><p class="sub">Nothing is due, fading or wrong. Add your next lecture's notes while they're fresh.</p><a class="cp-pill" href="#/new">Add notes</a></article>`;
  return `<article class="i-next">
    <div class="i-next-main">
      <span class="kicker">${icon("flame")}What Gradify thinks you should do next</span>
      ${tag(first.tag)}
      <h2>${esc(first.title)}</h2>
      <p class="sub">${esc(first.why)}</p>
      ${first.because ? `<p class="i-because">${icon("check")}<span><b>Recommended because</b> ${esc(first.because)}</span></p>` : ""}
      <div class="row-actions"><a class="cp-pill dark i-go" href="${esc(first.href)}" data-haptic="success">Start · ${first.mins} min</a><a class="i-link" href="#/revise">See everything, in order →</a></div>
    </div>
    ${rest.length ? `<ol class="i-then">${rest.slice(0, 3).map((x) => `<li><a href="${esc(x.href)}">${tag(x.tag)}<b>${esc(x.title)}</b><span>${esc(x.why)}</span><em>${x.mins} min</em></a></li>`).join("")}</ol>` : ""}
  </article>`;
}

// what the rest of today looks like: blocks already in the calendar, then Gradify's suggestions to fill the time
export function upcomingHtml(m) {
  const nowMin = new Date(m.now).getHours() * 60 + new Date(m.now).getMinutes();
  const planned = m.blocks.filter((b) => b.day === m.today && b.end_min > nowMin).map((b) => ({ ...b, kind: b.cal, planned: true }));
  const suggested = m.plan.blocks.map((b) => ({ ...b, suggested: true }));
  const rows = [...planned, ...suggested].sort((a, b) => a.start_min - b.start_min);
  return `<article class="cp-card i-upcoming" aria-labelledby="i-up-h">
    <div class="cp-head"><h2 id="i-up-h">Your upcoming learning</h2><a class="cp-chip link" href="#/plan">Smart Plan</a></div>
    ${!rows.length ? `<p class="cp-empty">${m.plan.free?.length ? "Nothing planned for the rest of today." : "No study time left in today's availability."} <a href="#/plan">Plan tomorrow</a>.</p>`
    : `<ol class="i-timeline">${rows.map((b) => `<li class="${b.kind === "break" ? "is-break" : ""} ${b.suggested ? "is-suggested" : ""} ${b.done ? "is-done" : ""}">
        <time>${hhmm(b.start_min)}</time><span class="i-dot" aria-hidden="true"></span>
        <span class="i-tl-main"><b>${esc(b.title)}</b><em>${b.suggested ? esc(b.why || "") : b.done ? "Done" : "In your calendar"}</em></span>
        <span class="i-tl-len">${b.end_min - b.start_min} min</span></li>`).join("")}</ol>
      ${suggested.filter((b) => b.kind !== "break").length ? `<div class="row-actions"><button type="button" class="cp-pill dark" data-accept-today>Add suggestions to today</button><span class="small muted">Only Gradify's own blocks are ever moved.</span></div>` : ""}`}
  </article>`;
}

export function rescheduleHtml(m) {
  const { moves, unplaced } = m.missed;
  if (!moves.length && !unplaced.length) return "";
  const auto = m.intel.autonomy === "auto";
  return `<article class="i-resched" data-resched>
    <span class="i-resched-ico" aria-hidden="true">${icon("route")}</span>
    <div><b>${moves.length + unplaced.length} missed ${moves.length + unplaced.length === 1 ? "session" : "sessions"}${auto ? ", rearranged" : ""}</b>
      <ul>${moves.map((x) => `<li>${esc(x.title)}: ${dateLabel(x.from.day, { weekday: "short" })} → ${x.to.day === m.today ? "today" : dateLabel(x.to.day, { weekday: "long" })} ${hhmm(x.to.start_min)}</li>`).join("")}${unplaced.map((x) => `<li>${esc(x.title)}: ${esc(x.why)}</li>`).join("")}</ul>
      <p class="small muted">Moved to free time that keeps each day within your ${m.dailyMinutes} minutes, so nothing gets crammed. Your own blocks and appointments are never moved.</p></div>
    ${auto ? "" : moves.length ? `<button type="button" class="cp-pill" data-apply-resched>Move them</button>` : ""}
  </article>`;
}

export function forecastWidget(m) {
  const f = m.preds.forgetting.slice(0, 5);
  return `<article class="cp-card widget" aria-labelledby="w-fc">
    <div class="cp-row"><h2 id="w-fc" class="widget-title">${icon("clock")} Forgetting forecast</h2><span class="small muted">next 7 days</span></div>
    ${!f.length ? `<p class="small muted">Nothing is forecast to drop below 70% recall this week.</p>` : `<ul class="widget-list fc-list">${f.map((x) => `<li><a class="widget-row" href="#/study/t:${enc(x.key)}"><span class="widget-row-main"><b class="small truncate">${esc(x.name)}</b><span class="fc-bar"><i style="width:${Math.max(4, 100 - x.days * 14)}%"></i></span></span><span class="small ${x.days <= 1 ? "warn-text" : "muted"}">${x.days === 0 ? "now" : `${x.days}d`}</span></a></li>`).join("")}</ul>`}
  </article>`;
}

export function askWidget() {
  return `<article class="cp-card widget i-askw" aria-labelledby="w-ask">
    <h2 id="w-ask" class="widget-title">${icon("sparkles")} Ask Gradify</h2>
    <form class="widget-ask" data-ask-go><label class="sr-only" for="w-ask-q">Ask about your learning</label><input id="w-ask-q" placeholder="e.g. I've got 2 hours free" maxlength="140" autocomplete="off"><button class="cp-pill dark" type="submit">Ask</button></form>
    <div class="i-chips">${QUESTIONS.slice(0, 4).map((q) => `<a class="i-chip" href="#/ai/${enc(q)}">${esc(q)}</a>`).join("")}</div>
  </article>`;
}

// the concept pile: one card per concept, with its stage of learning
const DECKC = ["dk-indigo", "dk-pink", "dk-orange", "dk-teal", "dk-violet", "dk-sun"];
export function conceptPileWidget(m) {
  return `<article class="cp-card widget" aria-labelledby="w-cp">
    <div class="cp-row"><h2 id="w-cp" class="widget-title">${icon("layers")} Your concepts</h2><a class="cp-chip link" href="#/knowledge">My Knowledge</a></div>
    ${!m.concepts.length ? `<p class="small muted">Each concept you study becomes a card here, with how far you've got: seen, understood, retained, applied.</p>` : `<div class="pile pile-sm" data-cpile></div><div class="pile-controls"><button type="button" class="cp-pill" data-cshuffle ${m.concepts.length < 2 ? "disabled" : ""}>↻ Shuffle</button><span class="small muted" data-cnote></span></div>`}
  </article>`;
}
function ladder(c) { return `<span class="ladder">${STAGES.map(([k, l]) => `<i class="${c.stages[k] ? "on" : ""}" title="${l}">${l}</i>`).join("")}</span>`; }
function drawConceptPile(el, list, order) {
  const shown = order.slice(0, 4).map((i) => list[i]);
  el.style.setProperty("--n", shown.length);
  el.innerHTML = [...shown].reverse().map((c, ri) => {
    const depth = shown.length - 1 - ri, col = DECKC[list.indexOf(c) % DECKC.length];
    return depth === 0
      ? `<a class="pile-card front ${col}" href="#/topic/${enc(c.key)}"><span class="dc-top"><span class="dc-name">${esc(c.name)}</span><span class="dc-score">${esc(LEVELS[c.level].label)}</span></span>
          <span class="dc-num">${pct(c.mastery)}<small> mastery</small></span>${ladder(c)}
          <span class="dc-bottom"><span>${c.certaintyLabel} certainty</span><span>${c.forgetInDays == null ? "Not tested" : c.forgetInDays === 0 ? "Review now" : `Fades in ${c.forgetInDays}d`}</span></span></a>`
      : `<button type="button" class="pile-card behind ${col}" style="--d:${depth}" data-cbring="${esc(c.key)}" aria-label="Bring ${esc(c.name)} forward" ${depth > 2 ? 'tabindex="-1"' : ""}><span class="dc-peek"><span class="dc-name">${esc(c.name)}</span><span>${pct(c.mastery)}</span></span></button>`;
  }).join("");
}

/** Handlers for the Command Centre's intelligence parts. ctx: { store, toast, rerender } */
export function wireIntel(view, m, ctx) {
  const pile = view.querySelector("[data-cpile]");
  if (pile) {
    let order = m.concepts.map((_, i) => i);
    const note = view.querySelector("[data-cnote]");
    const draw = () => { drawConceptPile(pile, m.concepts, order); note.textContent = `${m.concepts.length} ${m.concepts.length === 1 ? "concept" : "concepts"} · most urgent first`; };
    draw();
    view.querySelector("[data-cshuffle]")?.addEventListener("click", () => { haptic("shuffle"); pile.querySelector(".front")?.classList.add("leaving"); setTimeout(() => { order = [...order.slice(1), order[0]]; draw(); }, 240); });
    pile.addEventListener("click", (e) => { const b = e.target.closest("[data-cbring]"); if (!b) return; haptic("select"); const k = order.findIndex((i) => m.concepts[i].key === b.dataset.cbring); order = [order[k], ...order.filter((_, j) => j !== k)]; draw(); });
  }
  view.querySelector("[data-ask-go]")?.addEventListener("submit", (e) => { e.preventDefault(); const q = e.target.querySelector("input").value.trim(); if (q) { haptic("tap"); location.hash = `#/ai/${enc(q)}`; } });
  view.querySelector("[data-accept-today]")?.addEventListener("click", async (e) => {
    e.target.disabled = true; haptic("success");
    for (const b of m.plan.blocks.filter((x) => x.kind !== "break" && x.kind !== "wrap")) await ctx.store.saveBlock({ day: b.day, start_min: b.start_min, end_min: b.end_min, title: b.title, cal: "study", auto: true });
    ctx.toast("Added to today. Gradify will move them if you miss one."); ctx.rerender();
  });
  view.querySelector("[data-apply-resched]")?.addEventListener("click", async (e) => { e.target.disabled = true; await applyMoves(m, ctx.store); haptic("success"); ctx.toast("Moved. Each day stays within your study time."); ctx.rerender(); });
  view.querySelectorAll("[data-haptic]").forEach((a) => a.addEventListener("click", () => haptic(a.dataset.haptic)));
}
export async function applyMoves(m, store) {
  for (const mv of m.missed.moves) { const b = m.blocks.find((x) => x.id === mv.id); if (b) await store.saveBlock({ ...b, ...mv.to, done: false }); }
}

// ---------- Intelligence: the whole picture, why Gradify recommends what it does, and the controls ----------
export function renderIntelPage(view, m, ctx) {
  const p = m.preds, r = p.readiness, i = m.intel;
  const win = (w) => (w || []).map((x) => `${hhmm(x.from)}–${hhmm(x.to)}`).join(", ") || "none";
  view.innerHTML = `<section class="intel-page">
    <span class="kicker lo-kicker">${icon("sparkles")}Gradify Intelligence</span>
    <h1>What Gradify knows about your learning</h1>
    <p class="sub">One model, updated by every answer, lesson, pack and plan block on every Gradify site. Each figure below links to the evidence behind it, and you're in control of how it plans for you.</p>
    ${intelStripHtml(m)}
    <div class="i-grid">
      <article class="panel glass"><div class="panel-head"><h3>Exam readiness</h3><span class="pill-dark">${r.enough ? "Enough evidence" : "Gathering evidence"}</span></div>
        <div class="i-ready"><b>${pct(r.value)}</b><span>likely between ${pct(r.low)} and ${pct(r.high)}</span></div>
        <p class="sub">${esc(r.note)} The range narrows as Gradify sees more answers of more kinds. Readiness weighs recall, explanation, application and how well memory lasts, not just scores.</p>
        ${p.requirement.perDay != null ? `<p class="sub"><b>To reach ${pct(p.requirement.target)} by your exam:</b> about ${p.requirement.perDay} min a day for ${p.requirement.examIn} days (${p.requirement.status === "on-track" ? "within" : "more than"} your ${m.dailyMinutes} min).</p>` : `<p class="sub">Set an exam date in <a href="#/account">Settings</a> and Gradify will work out the daily time you need.</p>`}
      </article>
      <article class="panel glass"><div class="panel-head"><h3>How Gradify decides</h3></div>
        <ol class="i-how">
          <li><b>Evidence in.</b> Every answer, with how sure you were and how long it took; lessons, packs, quizzes and plan blocks.</li>
          <li><b>Learner memory.</b> Per concept: mastery, certainty, retention, errors, and stage (seen → understood → retained → applied).</li>
          <li><b>Predictions.</b> What you'll forget and when, readiness with a range, time needed, plan kept, velocity.</li>
          <li><b>Priorities.</b> Misconceptions first, then fading memory, deadlines, due cards and new material, always with a reason.</li>
          <li><b>Your plan.</b> Fitted to your free time and energy, with breaks; missed sessions are moved without cramming.</li>
        </ol>
        <p class="small muted">Mastery only changes when you show it. Gradify AI can write cards, but a card isn't evidence you know something.</p>
      </article>
    </div>
    <article class="panel glass"><div class="panel-head"><h3>Every concept, with its evidence</h3><a class="see" href="#/knowledge">My Knowledge</a></div>
      ${!m.concepts.length ? `<p class="sub">Nothing yet. Add notes and answer a few cards.</p>` : `<div class="i-table" role="table" aria-label="Concepts">
        <div class="i-tr i-th" role="row"><span role="columnheader">Concept</span><span role="columnheader">Mastery</span><span role="columnheader">Certainty</span><span role="columnheader">Retention</span><span role="columnheader">Errors</span><span role="columnheader">Next review</span></div>
        ${m.concepts.map((c) => `<details class="i-tr-wrap"><summary class="i-tr" role="row"><span role="cell"><b>${esc(c.name)}</b>${ladder(c)}</span><span role="cell">${pct(c.mastery)}</span><span role="cell">${c.certaintyLabel}</span><span role="cell">${pct(c.retention)}</span><span role="cell">${c.errors.confident ? `<b class="warn-text">${c.errors.confident} sure-wrong</b>` : c.errors.recent ? `${c.errors.recent} wrong` : "–"}</span><span role="cell">${c.nextReview ? new Date(c.nextReview).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "–"}</span></summary>
          <div class="i-ev"><p class="small muted">${esc(c.next.why)}</p>${c.evidence.length ? `<ul>${c.evidence.map((e) => `<li><span class="ev-r ${e.rating}">${esc(e.rating)}</span><span class="truncate">${esc(e.front)}</span><em>${e.confidence ? esc(e.confidence) : ""}${e.ms ? ` · ${Math.round(e.ms / 1000)}s` : ""} · ${ago(e.at)}</em></li>`).join("")}</ul>` : `<p class="small muted">No answers yet.</p>`}</div></details>`).join("")}
      </div>`}
    </article>
    <div class="i-grid">
      <article class="panel glass"><div class="panel-head"><h3>Recent evidence</h3><span class="pill-dark">${m.events.length} events</span></div>
        <ul class="i-events">${m.events.slice(0, 12).map((e) => `<li><span class="ev-dot ${e.event}"></span><span><b>${esc(eventLabel(e))}</b><em>${ago(e.at)}</em></span></li>`).join("") || `<li class="sub">Nothing yet.</li>`}</ul></article>
      <form class="panel glass i-controls" id="intel-controls"><div class="panel-head"><h3>You're in control</h3></div>
        <label><span>When Gradify plans for you</span><select name="autonomy"><option value="suggest" ${i.autonomy === "suggest" ? "selected" : ""}>Suggest changes, I'll approve them</option><option value="auto" ${i.autonomy === "auto" ? "selected" : ""}>Rearrange Gradify's study blocks for me</option></select></label>
        <label><span>Your energy</span><select name="energy"><option value="none" ${i.energy === "none" ? "selected" : ""}>Just go by priority</option><option value="morning" ${i.energy === "morning" ? "selected" : ""}>Hardest work first</option><option value="evening" ${i.energy === "evening" ? "selected" : ""}>Warm up with lighter work</option></select></label>
        <div class="i-two"><label><span>Weekdays, free from</span><input type="time" name="wd_from" value="${hhmm(i.weekday[0]?.from ?? 1020)}" step="900"></label><label><span>to</span><input type="time" name="wd_to" value="${hhmm(i.weekday[0]?.to ?? 1260)}" step="900"></label></div>
        <div class="i-two"><label><span>Weekends, free from</span><input type="time" name="we_from" value="${hhmm(i.weekend[0]?.from ?? 600)}" step="900"></label><label><span>to</span><input type="time" name="we_to" value="${hhmm(i.weekend[0]?.to ?? 780)}" step="900"></label></div>
        <label><span>A break after</span><select name="breakEvery">${[25, 45, 60, 90].map((n) => `<option value="${n}" ${i.breakEvery === n ? "selected" : ""}>${n} minutes of focus</option>`).join("")}</select></label>
        <p class="small muted">Now: weekdays ${win(i.weekday)}, weekends ${win(i.weekend)}. Outside these times is protected: Gradify never plans there. Your own blocks and appointments are never moved.</p>
        <button class="cp-pill dark" type="submit">Save</button>
      </form>
    </div>
    <article class="panel glass"><div class="panel-head"><h3>Your data</h3></div><p class="sub">Gradify stores your answers, packs, plan and progress, and works everything on this page out from them in your browser. Nothing here is sold or shared. You can download or delete everything in <a href="#/account">Settings</a>. When you use Gradify AI, the text it needs is sent to Anthropic's Claude API.</p></article>
  </section>`;
  view.querySelector("#intel-controls").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = new FormData(e.target), t = (v) => { const [h, mm] = String(v).split(":").map(Number); return h * 60 + mm; };
    const wd = { from: t(f.get("wd_from")), to: t(f.get("wd_to")) }, we = { from: t(f.get("we_from")), to: t(f.get("we_to")) };
    if (wd.to <= wd.from || we.to <= we.from) { ctx.toast("Each window needs to end after it starts."); return; }
    await ctx.saveIntel({ autonomy: f.get("autonomy"), energy: f.get("energy"), weekday: [wd], weekend: [we], breakEvery: Number(f.get("breakEvery")) });
    haptic("success"); ctx.toast("Saved. Your plan now follows these settings.");
  });
}
function eventLabel(e) {
  if (e.event === "flashcard_answered") return `${e.result === "correct" ? "Right" : "Wrong"}${e.confidence === 1 ? " (sure)" : e.confidence === 0 ? " (guess)" : ""}: ${e.card || "a card"}`;
  if (e.event === "plan_block_missed") return `Missed: ${e.title}`;
  const d = e.detail && typeof e.detail === "object" ? e.detail : {};
  return { study_pack_made: `Made a study pack${d.title ? `: ${d.title}` : ""}`, study_session: `Study session${d.cards ? `: ${d.cards} cards` : ""}`, plan_block_done: `Finished: ${d.title || "a plan block"}`, quiz_finished: `Quiz${d.quiz ? `: ${d.quiz}` : ""}`, lesson_completed: "Finished a lesson", tutor_used: "Used the tutor" }[e.event] || e.event.replace(/_/g, " ");
}

// ---------- My Knowledge: every concept and its stage, grouped by where it came from ----------
export function renderKnowledgePage(view, m, { courses = [] } = {}) {
  const groups = new Map();
  for (const c of m.concepts) { const k = c.pack || "Your notes"; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(c); }
  const count = (k) => m.concepts.filter((c) => c.stage === k || (k === "seen" && c.stage === "seen")).length;
  view.innerHTML = `<section class="knowledge-page">
    <span class="kicker lo-kicker">${icon("brain")}My Knowledge</span>
    <h1>Everything you know, and how well</h1>
    <p class="sub">Each concept moves through four stages, and only on evidence: <b>seen</b> (you've been tested), <b>understood</b> (right, and no misconceptions), <b>retained</b> (still right after time has passed), <b>applied</b> (used on a new problem).</p>
    <div class="k-funnel">${[["new", "Not started"], ...STAGES].map(([k, l], ix) => { const n = m.concepts.filter((c) => c.stage === k).length; return `<div class="k-step s${ix}"><b>${n}</b><span>${l}</span></div>`; }).join("")}</div>
    ${!m.concepts.length ? `<article class="panel glass"><p class="sub">No concepts yet. <a href="#/new">Add notes</a> and answer a few cards.</p></article>` : [...groups.entries()].map(([g, list]) => `<article class="panel glass"><div class="panel-head"><h3>${esc(g)}</h3><span class="pill-dark">${list.length}</span></div>
      <div class="k-grid">${list.map((c) => `<a class="k-card lvl-${c.level}" href="#/topic/${enc(c.key)}"><span class="k-top"><b>${esc(c.name)}</b><span class="i-tag ${c.level === "shaky" ? "hot" : c.level === "fading" ? "amber" : c.level === "mastered" || c.level === "strong" ? "green" : ""}">${esc(LEVELS[c.level].label)}</span></span>
        ${ladder(c)}<span class="k-bar"><i style="width:${Math.round(c.mastery * 100)}%"></i></span>
        <span class="k-meta"><span>${pct(c.mastery)} mastery · ${c.certaintyLabel} certainty</span><span>${c.forgetInDays == null ? "Not tested" : c.forgetInDays === 0 ? "Review now" : `Fades in ${c.forgetInDays}d`}</span></span></a>`).join("")}</div></article>`).join("")}
    ${courses.length ? `<article class="panel glass"><div class="panel-head"><h3>Your courses</h3><a class="see" href="#/earth">See it on Earth</a></div><ul class="lo-courses">${courses.map((c) => { const p = c.written ? Math.round((100 * c.done) / c.written) : 0; return `<li><a href="${esc(c.href || "#/learning")}"><span><b>${esc(c.name)}</b><em>${c.done} of ${c.written} lessons${c.six?.mastery != null ? ` · ${pct(c.six.mastery)} mastery` : ""}</em></span><span class="goal-bar"><i style="width:${p}%"></i></span><em>${p}%</em></a></li>`; }).join("")}</ul></article>` : ""}
  </section>`;
}

// ---------- Revision Centre: everything, in learning-priority order ----------
export function renderRevisePage(view, m, arg) {
  const kinds = [["all", "Everything"], ["fix", "Fix"], ["review", "Review"], ["new", "New"], ["stretch", "Stretch"]];
  const of = (x) => (x.kind === "misconception" || x.kind === "weak" ? "fix" : x.kind === "review" ? "review" : x.kind === "stretch" ? "stretch" : x.isNew ? "new" : x.kind === "deadline" ? "fix" : "review");
  const pick = kinds.some(([k]) => k === arg) ? arg : "all";
  const list = m.prio.items.filter((x) => pick === "all" || of(x) === pick);
  const total = list.reduce((a, x) => a + x.mins, 0);
  view.innerHTML = `<section class="revise-page">
    <span class="kicker lo-kicker">${icon("checklist")}Revision Centre</span>
    <h1>Everything worth doing, best first</h1>
    <p class="sub">Cards, lessons, deadlines and stretch questions from every Gradify site, ranked by how much each will move your learning. About ${total} min in all.</p>
    <div class="seg-chips">${kinds.map(([k, l]) => `<a class="chip" href="#/revise/${k}" aria-pressed="${k === pick}">${l} <small>${k === "all" ? m.prio.items.length : m.prio.items.filter((x) => of(x) === k).length}</small></a>`).join("")}</div>
    ${list.length ? `<ol class="r-list">${list.map((x, ix) => `<li><a href="${esc(x.href)}" data-haptic="tap"><span class="r-n">${ix + 1}</span><span class="r-main">${tag(x.tag)}<b>${esc(x.title)}</b><span>${esc(x.why)}</span>${x.because ? `<em>${esc(x.because)}</em>` : ""}</span><span class="r-min">${x.mins} min</span></a></li>`).join("")}</ol>` : `<article class="panel glass"><p class="sub">Nothing here right now.</p></article>`}
    ${m.prio.stop.length ? `<article class="panel glass"><div class="panel-head"><h3>You can ease off these</h3><span class="pill-dark">${m.prio.stop.length}</span></div><p class="sub">Strong and lasting. Gradify brings each back before you'd forget, so time is better spent elsewhere.</p><div class="i-chips">${m.prio.stop.map((c) => `<span class="i-chip static">${esc(c.name)}</span>`).join("")}</div></article>` : ""}
  </section>`;
  view.querySelectorAll("[data-haptic]").forEach((a) => a.addEventListener("click", () => haptic(a.dataset.haptic)));
}

// ---------- Ask Gradify, inside Gradify AI ----------
export function askHtml(initial) {
  return `<article class="panel glass i-ask">
    <div class="panel-head"><h3>${icon("sparkles")} Ask Gradify about your learning</h3><span class="pill-dark">From your evidence</span></div>
    <form class="widget-ask" id="ask-form"><label class="sr-only" for="ask-q">Your question</label><input id="ask-q" value="${esc(initial || "")}" placeholder="e.g. What am I most likely to forget?" maxlength="160" autocomplete="off"><button class="cp-pill dark" type="submit">Ask</button></form>
    <div class="i-chips">${QUESTIONS.map((q) => `<button type="button" class="i-chip" data-q="${esc(q)}">${esc(q)}</button>`).join("")}</div>
    <div class="i-answer" id="ask-out" aria-live="polite"></div>
  </article>`;
}
export function wireAsk(view, m) {
  const out = view.querySelector("#ask-out"), input = view.querySelector("#ask-q");
  const run = (q) => {
    if (!q) return;
    haptic("tap");
    const a = answer(q, { concepts: m.concepts, preds: m.preds, prio: m.prio, intel: m.intel, dailyMinutes: m.dailyMinutes, existing: m.blocks, now: Date.now() });
    out.innerHTML = `<p class="i-q">${esc(q)}</p><p class="i-lead">${esc(a.lead)}</p>${a.items.length ? `<ol>${a.items.map((x) => `<li>${x.href ? `<a href="${esc(x.href)}">` : "<span>"}<b>${esc(x.title)}</b>${x.detail ? `<em>${esc(x.detail)}</em>` : ""}${x.href ? "</a>" : "</span>"}</li>`).join("")}</ol>` : ""}${a.note ? `<p class="small muted">${esc(a.note)}</p>` : ""}`;
    out.classList.remove("in"); void out.offsetWidth; out.classList.add("in");
  };
  view.querySelector("#ask-form").addEventListener("submit", (e) => { e.preventDefault(); run(input.value.trim()); });
  view.querySelectorAll("[data-q]").forEach((b) => b.addEventListener("click", () => { input.value = b.dataset.q; run(b.dataset.q); }));
  if (input.value.trim()) run(input.value.trim());
}

// ---------- Smart Plan: the intelligent day, the week, and missed-session rescheduling ----------
export function smartPlanHtml(m, dayArg) {
  const target = dayArg === "tomorrow" ? dayKey(m.now + DAY) : m.today;
  const plan = target === m.today ? m.plan : planDay({ items: m.prio.items, day: target, minutes: m.dailyMinutes, intel: m.intel, existing: m.blocks.filter((b) => b.day === target), now: m.now });
  const existing = m.blocks.filter((b) => b.day === target).map((b) => ({ ...b, kind: b.cal, mine: true }));
  const rows = [...existing, ...plan.blocks.map((b) => ({ ...b, suggested: true }))].sort((a, b) => a.start_min - b.start_min);
  const focus = plan.blocks.filter((b) => b.kind !== "break" && b.kind !== "wrap").reduce((a, b) => a + b.end_min - b.start_min, 0);
  return `<article class="i-dayplan">
    <div class="i-dp-head"><div><span class="kicker">${icon("sparkles")}${target === m.today ? "Today's" : "Tomorrow's"} intelligent plan</span><h2>${dateLabel(target, { weekday: "long", day: "numeric", month: "long" })}</h2>
      <p class="sub">${focus ? `${focus} min of focused study, fitted to your free time (${(target === m.today || ![0, 6].includes(new Date(`${target}T12:00:00`).getDay()) ? m.intel.weekday : m.intel.weekend).map((w) => `${hhmm(w.from)}–${hhmm(w.to)}`).join(", ")}) and your ${m.dailyMinutes}-minute day.` : "No study time left in this day's availability. Change your hours in Intelligence."}</p></div>
      <div class="seg-chips"><a class="chip" href="#/plan" aria-pressed="${target === m.today}">Today</a><a class="chip" href="#/plan/tomorrow" aria-pressed="${target !== m.today}">Tomorrow</a></div></div>
    ${rows.length ? `<ol class="i-timeline big">${rows.map((b) => `<li class="${b.kind === "break" ? "is-break" : ""} ${b.suggested ? "is-suggested" : ""} ${b.done ? "is-done" : ""}">
      <time>${fmtRange(b)}</time><span class="i-dot" aria-hidden="true"></span>
      <span class="i-tl-main"><b>${esc(b.title)}</b>${b.tag && b.suggested ? tag(b.tag) : ""}<em>${b.suggested ? esc(b.why || "") : b.done ? "Done" : b.auto ? "Planned by Gradify" : "Yours: never moved"}</em></span>
      <span class="i-tl-len">${b.end_min - b.start_min} min</span></li>`).join("")}</ol>` : ""}
    ${plan.blocks.some((b) => b.kind !== "break") ? `<div class="row-actions"><button type="button" class="cp-pill dark" data-accept-day="${target}">Add this plan to my calendar</button><span class="small muted">Suggestions only appear in your calendar when you add them.</span></div>` : ""}
    ${plan.left.length ? `<p class="small muted">Didn't fit: ${esc(plan.left.slice(0, 3).map((x) => x.title).join(", "))}${plan.left.length > 3 ? ` and ${plan.left.length - 3} more` : ""}. They roll into the next day.</p>` : ""}
  </article>`;
}
export function wireSmartPlan(view, m, ctx, dayArg) {
  view.querySelector("[data-accept-day]")?.addEventListener("click", async (e) => {
    const day = e.target.dataset.acceptDay; e.target.disabled = true;
    const plan = day === m.today ? m.plan : planDay({ items: m.prio.items, day, minutes: m.dailyMinutes, intel: m.intel, existing: m.blocks.filter((b) => b.day === day), now: m.now });
    for (const b of plan.blocks.filter((x) => x.kind !== "break" && x.kind !== "wrap")) await ctx.store.saveBlock({ day, start_min: b.start_min, end_min: b.end_min, title: b.title, cal: "study", auto: true });
    haptic("success"); ctx.toast("Added. If you miss a session, Gradify moves it to free time."); ctx.rerender();
  });
  view.querySelector("[data-apply-resched]")?.addEventListener("click", async (e) => { e.target.disabled = true; await applyMoves(m, ctx.store); haptic("success"); ctx.toast("Moved."); ctx.rerender(); });
}
// the week: each day's due reviews, plus the ranked work spread across days, so nothing is planned twice
export async function planWeek(m, store, cards) {
  let queue = m.prio.items.filter((x) => x.id !== "due");
  let made = 0;
  for (let k = 1; k <= 6; k++) {
    const day = dayKey(m.now + k * DAY), end = Date.parse(`${day}T23:59:59`);
    if (m.blocks.some((b) => b.day === day && b.auto)) continue;
    const due = cards.filter((c) => !c.suspended && c.reps > 0 && Date.parse(c.due_at) <= end && Date.parse(c.due_at) > end - DAY).length;
    const items = [...(due ? [{ id: `due:${day}`, title: `Review about ${due} due ${due === 1 ? "card" : "cards"}`, mins: Math.max(5, Math.ceil((due * 25) / 60)), weight: "light", kind: "review" }] : []), ...queue];
    const plan = planDay({ items, day, minutes: m.dailyMinutes, intel: m.intel, existing: m.blocks.filter((b) => b.day === day), now: m.now });
    const used = new Set(plan.blocks.map((b) => b.id));
    queue = queue.filter((x) => !used.has(x.id));
    for (const b of plan.blocks.filter((x) => x.kind !== "break" && x.kind !== "wrap")) { await store.saveBlock({ day, start_min: b.start_min, end_min: b.end_min, title: b.title, cal: "study", auto: true }); made++; }
  }
  return made;
}
export { reschedule, INTEL_DEFAULTS };
