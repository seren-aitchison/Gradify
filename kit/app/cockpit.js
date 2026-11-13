// The Command Centre cockpit: the top of a learner's dashboard. The same layout as Klerio's Overview (a headline
// card, two small cards, a week of bars, a split by type, recent activity, a deck you can shuffle, what's coming up
// and a row of widgets), in Gradify's own look and built only from the learner's real data: their cards, reviews,
// study packs, topics, activity and plan. Nothing here is example data; every empty state says how to fill it.
// Styles: the "Cockpit" section of kit/app/app.css.
import { icon } from "../core/icons.js";
import { LEVELS } from "../learning/mastery.js";
import { haptic } from "../core/haptics.js";

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const n = (x) => Number(x || 0).toLocaleString("en-GB");
const DAY = 864e5;
const dayKey = (d) => { const x = new Date(d); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`; };
export function timeAgo(iso) {
  const s = Math.max(0, (Date.now() - Date.parse(iso)) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  const d = Math.floor(s / 86400);
  return d === 1 ? "yesterday" : d < 30 ? `${d} days ago` : new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

// the deck's colours: Gradify's spectrum, two stops each
const DECK = ["dk-indigo", "dk-pink", "dk-orange", "dk-teal", "dk-violet", "dk-sun"];
// topic levels in the order a learner should act on them, with a colour from the spectrum
const LEVEL_ORDER = [["shaky", "#ff5a4d"], ["fading", "#ffc002"], ["learning", "#4641ff"], ["strong", "#f055dd"], ["mastered", "#1fae8c"], ["new", "#5c5c66"]];

/**
 * The cockpit's HTML. Call wireCockpit(view, ctx) after it's in the page.
 * ctx: { s (stats()), reviews, blocks (next 14 days), docs, profile, examIn, mins, studyHref, topicHref }
 */
export function cockpitHtml(ctx) {
  const { s } = ctx;
  return `<div class="cockpit">
    <div class="cockpit-main">
      ${heroCard(ctx)}
      <div class="cp-stack">${masteryCard(ctx)}${dueCard(ctx)}</div>
      ${barsCard(ctx)}
      ${splitCard(ctx)}
      ${activityCard(s.acts)}
    </div>
    <aside class="cockpit-rail" aria-label="Your study packs and what's coming up">
      ${deckCard(ctx)}
      ${comingUpCard(ctx)}
    </aside>
  </div>
  <div class="widget-grid">${searchWidget()}${ringsWidget(ctx)}${aiWidget()}</div>`;
}

// ---------- the headline card ----------
function heroCard({ s, reviews }) {
  const week = reviews.filter((r) => Date.parse(r.reviewed_at) >= Date.now() - 7 * DAY).length;
  return `<article class="cp-hero" aria-labelledby="cp-hero-h">
    <span class="cp-hero-shape" aria-hidden="true"></span>
    <h2 id="cp-hero-h" class="cp-label">Cards you've learned</h2>
    <div class="cp-big">${n(s.learned.length)}<small> / ${n(s.cards.length)}</small></div>
    <p class="cp-sub">${week ? `${n(week)} ${week === 1 ? "answer" : "answers"} in the last 7 days · ` : ""}${n(s.docs.length)} study ${s.docs.length === 1 ? "pack" : "packs"}, ${n(s.topics.length)} ${s.topics.length === 1 ? "topic" : "topics"}</p>
    <div class="cp-actions">
      <a class="cp-pill dark" href="#/study">Revise</a>
      <a class="cp-pill" href="#/new">Add notes</a>
      <a class="cp-round" href="#/notes" aria-label="Open your library" title="Library">↗</a>
    </div>
  </article>`;
}

// ---------- the two small cards ----------
function masteryCard({ s }) {
  const pct = s.topics.length ? Math.round(s.readiness * 100) : null;
  const count = (lv) => s.topics.filter((t) => t.level === lv).length;
  const dims = [
    ["shaky", "Fix first", "topics where you felt sure about answers you got wrong"],
    ["fading", "Worth reviewing", "topics you knew but haven't practised recently"],
    ["learning", "In progress", "topics where evidence is still coming in"],
    ["strong", "Nearly there", "topics with good recall and retention"],
    ["mastered", "Done", "topics strong on every kind of evidence so far"],
  ];
  return `<div class="cp-mini cp-mastery">
    <span class="cp-label cp-row">Exam readiness <button type="button" class="cp-info" aria-expanded="false" aria-controls="cp-explain">How is this worked out?</button></span>
    <span class="cp-num">${pct == null ? "–" : `${pct}%`}</span>
    <span class="cp-foot">Average mastery, weighted by cards${s.accuracy != null ? `<span class="cp-delta ${s.accuracy >= 0.7 ? "up" : "down"}">${Math.round(s.accuracy * 100)}% right · 30 days</span>` : ""}</span>
    <div class="cp-explain" id="cp-explain" hidden>
      <p>Each topic's mastery comes from the evidence in your answers: recall, explaining why, applying it, keeping it over time, and connecting it to other topics. This is the average across your topics, with bigger topics counting for more.</p>
      <ul class="cp-dims">${dims.map(([lv, tag, what]) => { const c = count(lv); return `<li class="${c ? "" : "ok"}"><span class="dim-head"><b>${esc(LEVELS[lv].label)}</b><span class="dim-level ${lv}">${c ? tag : "None"}</span></span><span class="small">${c ? `${c} ${what}` : esc(LEVELS[lv].note)}</span></li>`; }).join("")}</ul>
      <p><a href="#/progress">See every topic →</a></p>
    </div>
  </div>`;
}
function dueCard({ s, mins }) {
  const topics = new Set(s.due.map((c) => `${c.document_id}|${c.topic || "Cards"}`)).size;
  return `<a class="cp-mini" href="#/study">
    <span class="cp-label">Due now</span>
    <span class="cp-num">${n(s.due.length)}</span>
    <span class="cp-foot">${s.due.length ? `About ${mins} min · ${topics} ${topics === 1 ? "topic" : "topics"}<span class="cp-delta down">to do</span>` : "Nothing due. You're caught up."}</span>
  </a>`;
}

// ---------- answers, day by day ----------
function barsCard({ reviews }) {
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(Date.now() - (6 - i) * DAY); return { key: dayKey(d), label: d.toLocaleDateString("en-GB", { weekday: "short" }), n: 0 }; });
  const at = Object.fromEntries(days.map((d) => [d.key, d]));
  for (const r of reviews) { const d = at[dayKey(r.reviewed_at)]; if (d) d.n++; }
  const active = days.filter((d) => d.n).length, max = Math.max(1, ...days.map((d) => d.n));
  const last = days[6], prev = days[5];
  const change = prev.n ? Math.round((100 * (last.n - prev.n)) / prev.n) : null;
  return `<article class="cp-card cp-bars" aria-labelledby="cp-bars-h">
    <div class="cp-head"><h2 id="cp-bars-h">Answers, day by day</h2><span class="cp-chip">7 days</span><a class="cp-round sm" href="#/progress" aria-label="See your progress">↗</a></div>
    ${active < 2 ? `<div class="cbars-ghost"><div class="cbars-wrap" aria-hidden="true">${[38, 55, 46, 70, 60, 84, 64].map((v) => `<div class="cbar-col"><span class="cbar ghost" style="height:${v}%"></span><span class="cbar-x">&nbsp;</span></div>`).join("")}</div>
        <div class="cp-empty"><span>Your week fills in as you revise.</span><span class="small">Answer a few cards on two different days and your trend starts here.</span><a class="cp-pill" href="#/study">Revise now</a></div></div>`
    : `<div class="cbars-wrap" role="img" aria-label="${days.map((d) => `${d.label}: ${d.n}`).join(", ")}">${days.map((d, i) => { const on = i === 6;
        return `<div class="cbar-col ${on ? "on" : ""}"><span class="cbar" style="height:${Math.max(8, (100 * d.n) / max)}%">${on ? `<span class="cbar-tip">${n(d.n)}${change != null ? `<small>${change >= 0 ? "+" : ""}${change}%</small>` : ""}</span>` : ""}<em>${d.n || ""}</em></span><span class="cbar-x">${on ? "Today" : d.label}</span></div>`; }).join("")}</div>`}
  </article>`;
}

// ---------- topics by level ----------
function splitCard({ s }) {
  const rows = LEVEL_ORDER.map(([lv, c]) => ({ lv, c, count: s.topics.filter((t) => t.level === lv).length })).filter((r) => r.count);
  const total = rows.reduce((a, r) => a + r.count, 0);
  const size = 150, R = 58, C = 2 * Math.PI * R;
  let at = 0;
  return `<article class="cp-card cp-split" aria-labelledby="cp-split-h">
    <div class="cp-head"><h2 id="cp-split-h">Topics by level</h2><a class="cp-chip link" href="#/progress">Details</a></div>
    ${!total ? `<p class="cp-empty">Add notes and answer a few cards: each topic then shows here by how well you know it.</p>` : `<div class="split-row">
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${rows.map((r) => `${LEVELS[r.lv].label}: ${r.count}`).join(", ")}">
        <circle cx="75" cy="75" r="${R}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="16"/>
        ${rows.map((r) => { const len = (C * r.count) / total; const el = `<circle cx="75" cy="75" r="${R}" fill="none" stroke="${r.c}" stroke-width="16" stroke-linecap="round" stroke-dasharray="${Math.max(0.1, len - (rows.length > 1 ? 6 : 0))} ${C}" stroke-dashoffset="${-at - (rows.length > 1 ? 3 : 0)}" transform="rotate(-90 75 75)"/>`; at += len; return el; }).join("")}
        <text x="50%" y="44%" text-anchor="middle" class="split-small">Topics</text><text x="50%" y="60%" text-anchor="middle" class="split-big">${n(total)}</text>
      </svg>
      <ul class="split-legend">${rows.map((r) => `<li><span class="tick" style="background:${r.c}"></span><span class="small">${esc(LEVELS[r.lv].label)}</span><b>${Math.round((100 * r.count) / total)}%</b></li>`).join("")}</ul>
    </div>`}
  </article>`;
}

// ---------- recent activity ----------
function activityText(a) {
  const d = a.detail && typeof a.detail === "object" ? a.detail : {};
  switch (a.kind) {
    case "pack": return [`Made a study pack: ${d.title || "your notes"}${d.cards ? ` (${d.cards} cards)` : ""}`, "upload"];
    case "session": return [`${d.practice ? "Practised" : "Revised"} ${d.cards || ""} ${d.cards === 1 ? "card" : "cards"}${d.topic ? `: ${d.topic}` : ""}`, "layers"];
    case "block": return [`Finished a planned block: ${d.title || "study"}`, "calendar"];
    case "quiz": return [`Quiz${d.quiz ? `: ${d.quiz}` : ""}${d.of ? ` · ${d.score}/${d.of}` : ""}`, "checklist"];
    case "workout": return ["Logged a workout", "dumbbell"];
    case "body_checkin": return ["Body check-in", "heartbeat"];
    case "fitness_test": return ["Fitness test", "dumbbell"];
    default: return [typeof a.detail === "string" ? a.detail : `${a.site || "Gradify"}: ${String(a.kind || "activity").replace(/_/g, " ")}`, "star"];
  }
}
function activityCard(acts) {
  const recent = [...acts].sort((a, b) => Date.parse(b.at) - Date.parse(a.at)).slice(0, 5);
  return `<article class="cp-card cp-activity" aria-labelledby="cp-act-h">
    <div class="cp-head"><h2 id="cp-act-h">Recent activity <sup>${recent.length}</sup></h2></div>
    ${!recent.length ? `<p class="cp-empty">Everything you do shows here: packs made, cards revised, plan blocks finished, lessons on every Gradify site.</p>`
    : `<ul class="act-rows">${recent.map((a) => { const [t, ic] = activityText(a); return `<li><span class="act-ico" aria-hidden="true">${icon(ic)}</span><span class="act-text">${esc(t)}</span><span class="act-pill">+${n(a.xp)} XP</span><span class="act-when">${timeAgo(a.at)}</span></li>`; }).join("")}</ul>`}
  </article>`;
}

// ---------- the deck of study packs ----------
function packsOf({ s, docs }) {
  return docs.map((d, i) => {
    const cards = s.cards.filter((c) => c.document_id === d.id);
    const learned = s.learned.filter((c) => c.document_id === d.id).length;
    const due = s.due.filter((c) => c.document_id === d.id).length;
    return { id: d.id, title: d.title, site: d.site, at: d.created_at, total: cards.length, learned, due, colour: DECK[i % DECK.length] };
  });
}
function deckCard(ctx) {
  const packs = packsOf(ctx);
  return `<article class="cp-card cp-deck-card" aria-labelledby="cp-deck-h">
    <div class="cp-head"><h2 id="cp-deck-h">Your study packs <sup>${packs.length}</sup></h2><a class="cp-chip link" href="#/new">+ New</a></div>
    ${!packs.length ? `<p class="cp-empty">Each set of notes you bring becomes a card here. <a href="#/new">Add your first notes</a>.</p>`
    : `<div class="pile" data-deck></div><div class="pile-controls"><button type="button" class="cp-pill" data-shuffle ${packs.length < 2 ? "disabled" : ""}>↻ Shuffle</button><span class="small muted" data-deck-note></span></div>`}
  </article>`;
}
function drawDeck(el, packs, order) {
  const cards = order.map((i) => packs[i]);
  const shown = cards.slice(0, 4);
  el.style.setProperty("--n", shown.length);
  el.innerHTML = [...shown].reverse().map((p, ri) => {
    const depth = shown.length - 1 - ri;
    const pct = p.total ? Math.round((100 * p.learned) / p.total) : 0;
    return depth === 0
      ? `<a class="pile-card front ${p.colour}" href="#/deck/${esc(p.id)}" aria-label="Open ${esc(p.title)}">
          <span class="dc-top"><span class="dc-name">${esc(p.title)}</span><span class="dc-score">${pct}% learned</span></span>
          <span class="dc-num">${n(p.total)}<small> cards</small></span>
          <span class="dc-bottom"><span>Made ${timeAgo(p.at)}</span><span>${p.due ? `${p.due} due` : "Nothing due"}</span></span></a>`
      : `<button type="button" class="pile-card behind ${p.colour}" style="--d:${depth}" data-bring="${esc(p.id)}" aria-label="Bring ${esc(p.title)} to the front" ${depth > 2 ? 'tabindex="-1"' : ""}>
          <span class="dc-peek"><span class="dc-name">${esc(p.title)}</span><span>${pct}%</span></span></button>`;
  }).join("");
}

// ---------- coming up ----------
function comingUpCard({ blocks, profile, examIn }) {
  const now = new Date(), nowMin = now.getHours() * 60 + now.getMinutes(), today = dayKey(now);
  const items = blocks.filter((b) => !b.done && (b.day > today || (b.day === today && b.end_min > nowMin)))
    .sort((a, b) => (a.day + String(a.start_min).padStart(4, "0")).localeCompare(b.day + String(b.start_min).padStart(4, "0")))
    .slice(0, 4).map((b) => ({ ico: b.cal === "exam" ? "flame" : b.cal === "deadline" ? "alert" : "clock", late: b.cal === "exam" || b.cal === "deadline", text: b.title,
      when: `${new Date(b.day + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })} · ${String(Math.floor(b.start_min / 60)).padStart(2, "0")}:${String(b.start_min % 60).padStart(2, "0")}` }));
  if (profile.exam_date && examIn != null && examIn >= 0 && !items.some((i) => /exam/i.test(i.text))) {
    items.unshift({ ico: "flame", late: true, text: `Your exam${examIn === 0 ? " is today" : ` in ${examIn} ${examIn === 1 ? "day" : "days"}`}`, when: new Date(profile.exam_date + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) });
  }
  return `<article class="cp-card" aria-labelledby="cp-next-h">
    <div class="cp-head"><h2 id="cp-next-h">Coming up <sup>${items.length}</sup></h2><a class="cp-chip link" href="#/plan">Plan</a></div>
    ${!items.length ? `<p class="cp-empty">Add study blocks or an exam date in Plan and they show here.</p>`
    : `<ul class="next-rows">${items.map((c) => `<li><a href="#/plan"><span class="next-ico ${c.late ? "late" : ""}" aria-hidden="true">${icon(c.ico)}</span><span class="next-text"><b class="truncate">${esc(c.text)}</b><span class="small muted">${esc(c.when)}</span></span><span class="next-go" aria-hidden="true">›</span></a></li>`).join("")}</ul>`}
  </article>`;
}

// ---------- the widget row ----------
function searchWidget() {
  return `<article class="cp-card widget" aria-labelledby="w-search">
    <h2 id="w-search" class="widget-title">${icon("sparkles")} Search your cards</h2>
    <form class="widget-ask" data-search><label class="sr-only" for="w-q">Search every flashcard you've made</label><input id="w-q" type="search" placeholder="e.g. cardiac output" autocomplete="off" maxlength="120"><button class="cp-pill dark" type="submit">Find</button></form>
    <ul class="widget-list" data-results aria-live="polite"><li class="small muted">Every question and answer across all your study packs.</li></ul>
  </article>`;
}
function ring(value, cls) {
  const r = 15, c = 2 * Math.PI * r;
  return `<svg width="40" height="40" viewBox="0 0 40 40" class="cring ${cls}" role="img" aria-label="${value} out of 100"><circle cx="20" cy="20" r="${r}" class="cring-track"/><circle cx="20" cy="20" r="${r}" class="cring-fill" stroke-dasharray="${(c * value) / 100} ${c}" transform="rotate(-90 20 20)"/><text x="20" y="24" text-anchor="middle" class="cring-text">${value}</text></svg>`;
}
function ringsWidget({ s, topicHref }) {
  // the topics most worth a look first, then the strongest
  const order = { shaky: 0, fading: 1, learning: 2, new: 3, strong: 4, mastered: 5 };
  const rows = [...s.topics].sort((a, b) => order[a.level] - order[b.level] || a.mastery - b.mastery).slice(0, 5);
  const good = s.topics.filter((t) => t.level === "strong" || t.level === "mastered").length;
  return `<article class="cp-card widget" aria-labelledby="w-rings">
    <div class="cp-row"><h2 id="w-rings" class="widget-title">Topic mastery</h2>${s.topics.length ? `<span class="small muted">${good} of ${s.topics.length} strong</span>` : ""}</div>
    ${!rows.length ? `<p class="small muted">Each topic gets a score once you've answered its cards.</p>`
    : `<ul class="widget-list">${rows.map((t) => { const v = Math.round(t.mastery * 100), ok = t.level === "strong" || t.level === "mastered";
        return `<li><a class="widget-row" href="${topicHref(t.key)}">${ring(v, ok ? "ok" : t.level === "shaky" || t.level === "fading" ? "warn" : "mid")}<span class="widget-row-main"><b class="small truncate">${esc(t.topic)}</b><span class="small ${ok ? "good-text" : "muted"}">${esc(LEVELS[t.level].label)} · ${esc(t.next.label)}</span></span></a></li>`; }).join("")}</ul>`}
  </article>`;
}
function aiWidget() {
  return `<article class="cp-card widget" aria-labelledby="w-ai" data-ai>
    <h2 id="w-ai" class="widget-title">${icon("sparkles")} Gradify AI</h2>
    <p class="small muted" data-ai-body>Reads messy notes, diagrams and scans, writes explain-and-apply questions, and tutors you inside every course.</p>
    <a class="cp-pill" href="#/ai">Open Gradify AI</a>
  </article>`;
}

/** Event handlers and the parts that need the page: the deck, the explainer, card search, the AI allowance. */
export function wireCockpit(view, ctx) {
  const packs = packsOf(ctx);
  const deck = view.querySelector("[data-deck]");
  if (deck) {
    let order = packs.map((_, i) => i), leaving = false;
    const note = view.querySelector("[data-deck-note]");
    const draw = () => { drawDeck(deck, packs, order); note.textContent = packs.length > 1 ? `1 of ${packs.length} · tap a card behind to bring it forward` : "Your only pack for now"; };
    draw();
    view.querySelector("[data-shuffle]")?.addEventListener("click", () => {
      if (packs.length < 2 || leaving) return;
      leaving = true; haptic("shuffle");
      deck.querySelector(".front")?.classList.add("leaving");
      setTimeout(() => { order = [...order.slice(1), order[0]]; leaving = false; draw(); }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 260);
    });
    deck.addEventListener("click", (e) => {
      const b = e.target.closest("[data-bring]");
      if (!b) return;
      haptic("select");
      const k = order.findIndex((i) => packs[i].id === b.dataset.bring);
      order = [order[k], ...order.filter((_, j) => j !== k)];
      draw();
    });
  }
  const info = view.querySelector(".cp-info");
  info?.addEventListener("click", () => {
    const box = view.querySelector("#cp-explain"), open = box.hidden;
    box.hidden = !open; info.setAttribute("aria-expanded", String(open)); info.textContent = open ? "Close" : "How is this worked out?";
  });
  const form = view.querySelector("[data-search]");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = form.querySelector("input").value.trim().toLowerCase();
    const out = view.querySelector("[data-results]");
    if (!q) { out.innerHTML = `<li class="small muted">Type a word or two from your notes.</li>`; return; }
    const hits = ctx.s.cards.filter((c) => `${c.front} ${c.back} ${c.topic || ""}`.toLowerCase().includes(q)).slice(0, 5);
    const title = (id) => ctx.docs.find((d) => d.id === id)?.title || "Study pack";
    out.innerHTML = hits.length ? hits.map((c) => `<li><a class="widget-row" href="#/deck/${esc(c.document_id)}"><span class="widget-row-main"><b class="small truncate">${esc(c.front)}</b><span class="small muted truncate">${esc(c.back)} · ${esc(title(c.document_id))}</span></span><span aria-hidden="true">→</span></a></li>`).join("")
      : `<li class="small muted">No card mentions “${esc(q)}”. <a href="#/new">Add notes on it</a>.</li>`;
  });
  if (ctx.allowance) ctx.allowance.then((uses) => {
    const body = view.querySelector("[data-ai-body]");
    const on = (uses || []).filter((u) => u.enabled);
    if (!body || !on.length) return;
    body.outerHTML = `<ul class="widget-list ai-uses">${on.slice(0, 3).map((u) => `<li class="small"><span>${esc(u.label)}</span><b>${u.used} of ${u.allowance}</b></li>`).join("")}</ul>`;
  }).catch(() => {});
}

/** Klerio's welcome, for a learner with nothing yet: two ways to start, and quick jobs. */
export function welcomeHtml(name) {
  return `<div class="cp-welcome">
    <div class="cp-welcome-copy">
      <span class="kicker">Welcome to Gradify</span>
      <h2>${name ? `Let's make your first study pack, ${esc(name)}.` : "Let's make your first study pack."}</h2>
      <p class="sub">Bring one lecture's notes. In about a minute you'll have flashcards checked against what you wrote, and Gradify will plan when to revise them.</p>
      <div class="start-cards">
        <a class="start-card primary" href="#/new"><span class="start-icon" aria-hidden="true">${icon("upload")}</span><b>Upload your notes</b><span>A PDF, a .txt file, or paste them in. One topic at a time works best.</span></a>
        <a class="start-card" href="#/new?sample=1"><span class="start-icon" aria-hidden="true">${icon("sparkles")}</span><b>Try it with sample notes</b><span>Notes on the cardiac cycle. See a whole pack in 30 seconds.</span></a>
      </div>
      <div class="quick-jobs" aria-label="Or start with something else"><span class="kicker">Or start with</span>
        <a href="#/learning">${icon("book")}A course on your subject</a><a href="#/plan">${icon("calendar")}Planning your week</a><a href="#/goals">${icon("route")}A goal to aim for</a>
      </div>
    </div>
  </div>`;
}
