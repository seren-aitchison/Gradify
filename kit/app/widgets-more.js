// More Today widgets: the ones that let the learner act where they are, without opening another screen (complete
// today's tasks, review a few cards, start a quiz or a timer), and the ones that bring their own things back (pins,
// what they saved, their collections, recent mistakes, the tools they use). kit/app/widgets.js draws them on the
// board with the rest.
//
// A widget is { id, name, icon, size: "w", what, render(d) → html, mount?(el, ctx, d), settings?: [{ key, label,
// options: [[value, label]], dflt }] }. render draws what it knows at once (or a loading skeleton); mount fills it
// in, and does what it does, when it needs the store or the learner record. ctx: { store, toast, reviewOne,
// startTimer, setting(id, key) }.
import { esc } from "../core/text.js";
import { icon } from "../core/icons.js";
import { uiIcon } from "../ui/icons.js";
import { pins } from "../ui/places.js";
import { history } from "../ui/history.js";
import { collections, itemsOf, mistakes } from "../data/links.js";
import { list as stateList } from "../data/learner-state.js";
import { syncStatus } from "../data/learner-state.js";
import { hhmm } from "../intel/memory.js";

export const skeleton = (rows = 3) => `<div class="wd-skel" aria-busy="true" aria-label="Loading">${"<i></i>".repeat(rows)}</div>`;
const link = (href, t) => `<a class="wd-link" href="${esc(href)}">${t} →</a>`;
const local = (h) => (h && h.startsWith(`${location.pathname}#`) ? h.slice(location.pathname.length) : h || "#");
const empty = (t, href, cta) => `<p class="wd-empty">${t}${href ? ` <a href="${esc(href)}">${cta} →</a>` : ""}</p>`;
const EXT = ["external", "away", "allday", "ext-exam", "ext-deadline"];
const session = () => { try { const s = JSON.parse(localStorage.getItem("gradify.session") || "null"); return s && s.i < s.steps?.length ? s : null; } catch { return null; } };

/** today's study blocks, in time order, without the learner's own calendar's events. Pure. */
export const todaysTasks = (blocks = [], today) => blocks.filter((b) => b.day === today && !EXT.includes(b.cal)).sort((a, b) => a.start_min - b.start_min);
/** the tools the learner opens most, from History, then the usual ones. Pure. */
export function topTools(hist = [], { limit = 5 } = {}) {
  const NAMES = { cards: "Flashcard creator", map: "Mind map", notebook: "Notebook", quiz: "Quizzes", audio: "Listen to notes", convert: "Notes converter", search: "Lesson search", youtube: "YouTube to notes", explain: "Explain it", dictionary: "Dictionary", games: "Games", podcast: "Podcast", poster: "Poster", projects: "Projects", sheets: "Cheat sheets", visualise: "Visualise", handwriting: "Handwriting", feed: "Feed", downloads: "Downloads" };
  const count = new Map();
  for (const h of hist) { const m = /#\/tools\/([a-z]+)/.exec(h.href || ""); if (m && NAMES[m[1]]) count.set(m[1], (count.get(m[1]) || 0) + 1); }
  const order = [...count].sort((a, b) => b[1] - a[1]).map(([k]) => k);
  for (const k of ["cards", "map", "quiz", "notebook", "audio"]) if (!order.includes(k)) order.push(k);
  return order.slice(0, limit).map((k) => ({ key: k, name: NAMES[k], href: `#/tools/${k}`, used: count.get(k) || 0 }));
}
/**
 * The updates worth acting on, most pressing first, leaving out anything a widget already on the board shows (so
 * the board doesn't say the same thing twice). Pure: d is the board's data, on: the widget ids on the board.
 */
export function alertsFor({ due = 0, missed = [], mistakes: open = 0, sync = null, deadline = null } = {}, on = new Set()) {
  const out = [];
  if (sync && (sync.state === "failed" || sync.state === "offline") && sync.waiting) out.push({ tone: "warn", t: sync.state === "offline" ? `Offline: ${sync.waiting} change${sync.waiting === 1 ? "" : "s"} waiting to sync` : `${sync.waiting} change${sync.waiting === 1 ? "" : "s"} couldn't sync yet: Gradify will retry`, href: "#/account" });
  if (deadline && deadline.days <= 3 && !on.has("s-deadline") && !on.has("b-exam")) out.push({ tone: "warn", t: deadline.days <= 0 ? `${deadline.title} is today` : `${deadline.title} in ${deadline.days} day${deadline.days === 1 ? "" : "s"}`, href: "#/plan" });
  if (missed.length && !on.has("w-tasks")) out.push({ t: `${missed.length} study block${missed.length === 1 ? "" : "s"} from earlier today not done`, href: "#/plan" });
  if (due && !on.has("s-due") && !on.has("w-flash") && !on.has("b-hero")) out.push({ t: `${due} card${due === 1 ? "" : "s"} due`, href: "#/study" });
  if (open && !on.has("w-mistakes")) out.push({ t: `${open} mistake${open === 1 ? "" : "s"} to revisit`, href: "#/revise" });
  return out;
}

export const MORE = [
  { id: "w-tasks", size: "w", name: "Today's tasks", icon: "checklist", what: "Today's study blocks: tick them off here.",
    render: (d) => {
      const rows = todaysTasks(d.m.blocks, d.m.today);
      return rows.length ? `<ul class="wd-tasks">${rows.map((b) => `<li class="${b.done ? "done" : ""}"><label><input type="checkbox" data-wtask="${esc(b.id)}" ${b.done ? "checked" : ""}><span><b>${esc(b.title)}</b><small>${hhmm(b.start_min)}–${hhmm(b.end_min)}</small></span></label></li>`).join("")}</ul>${link("#/plan", "Your plan")}`
        : empty("Nothing planned for today.", "#/plan", "Plan your day");
    },
    mount(el, ctx) {
      el.addEventListener("change", async (e) => {
        const box = e.target.closest("[data-wtask]"); if (!box) return;
        const day = new Date(); const ymd = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
        const b = (await ctx.store.listBlocks(ymd, ymd)).find((x) => String(x.id) === box.dataset.wtask);
        if (!b) return;
        await ctx.store.saveBlock({ ...b, done: box.checked });
        box.closest("li").classList.toggle("done", box.checked);
        ctx.toast(box.checked ? `Done: <b>${esc(b.title)}</b>` : "Marked as not done.");
      });
    } },
  { id: "w-flash", size: "w", name: "Quick flashcards", icon: "layers", what: "Review a few due cards right here.",
    settings: [{ key: "n", label: "Cards each time", options: [["5", "5"], ["10", "10"], ["20", "20"]], dflt: "5" }],
    render: () => skeleton(2),
    mount(el, ctx, d) {
      const n = Number(ctx.setting("w-flash", "n")) || 5, queue = (d.s.due || []).slice(0, n);
      const body = el.querySelector(".wd-body") || el;
      let i = 0, shown = false, t0 = Date.now(), right = 0;
      const draw = () => {
        if (!queue.length) { body.innerHTML = empty("No cards are due. Nice.", "#/study", "Practise anyway"); return; }
        if (i >= queue.length) { body.innerHTML = `<p class="wd-empty"><b>${queue.length} reviewed</b>, ${right} you knew. ${d.s.due.length > queue.length ? `<a href="#/study">${d.s.due.length - queue.length} more due →</a>` : "That's everything due."}</p>`; return; }
        const c = queue[i];
        body.innerHTML = `<div class="wd-card"><small>${i + 1} of ${queue.length}${c.topic ? ` · ${esc(c.topic)}` : ""}</small><p class="wd-cf">${esc(c.front)}</p>${shown ? `<p class="wd-cb">${esc(c.back)}</p>` : ""}</div>
          <div class="wd-cact">${shown ? [["again", "Again"], ["hard", "Hard"], ["good", "Good"], ["easy", "Easy"]].map(([r, l]) => `<button type="button" class="cp-pill${r === "good" ? " dark" : ""}" data-rate="${r}">${l}</button>`).join("") : `<button type="button" class="cp-pill dark" data-show>Show the answer</button>`}</div>`;
        body.querySelector("button")?.focus({ preventScroll: true });
      };
      body.addEventListener("click", async (e) => {
        if (e.target.closest("[data-show]")) { shown = true; draw(); return; }
        const r = e.target.closest("[data-rate]")?.dataset.rate; if (!r) return;
        body.querySelectorAll("button").forEach((b) => { b.disabled = true; });
        await ctx.reviewOne(queue[i], r, Date.now() - t0);   // the same review a study session records
        if (r !== "again") right++;
        i++; shown = false; t0 = Date.now(); draw();
      });
      draw();
    } },
  { id: "w-quiz", size: "w", name: "Quick quiz", icon: "trophy", what: "Start a short practice: your cards, or a quiz.",
    render: (d) => `<div class="wd-launch"><a class="cp-pill dark" href="#/study">${uiIcon("cards")}${d.s.due.length ? `${Math.min(10, d.s.due.length)} due cards` : "Practise your cards"}</a><a class="cp-pill" href="#/tools/quiz/practice">${uiIcon("target")}Practice quiz</a><a class="cp-pill" href="#/tools/quiz/timed">${uiIcon("clock")}Timed quiz</a></div>` },
  { id: "w-timer", size: "w", name: "Quick timer", icon: "clock", what: "A focus or revision timer that keeps running as you move around.",
    settings: [{ key: "focus", label: "Focus length", options: [["15", "15 min"], ["25", "25 min"], ["45", "45 min"], ["60", "60 min"]], dflt: "25" }],
    render: () => `<div class="wd-launch" data-timer></div>`,
    mount(el, ctx) {
      const focus = Number(ctx.setting("w-timer", "focus")) || 25;
      el.querySelector("[data-timer]").innerHTML = [[focus, "Focus"], [5, "Short break"], [15, "Long break"]].map(([m, l], k) => `<button type="button" class="cp-pill${k ? "" : " dark"}" data-start="${m}" data-label="${l}">${l} · ${m} min</button>`).join("");
      el.addEventListener("click", (e) => { const b = e.target.closest("[data-start]"); if (b) ctx.startTimer(Number(b.dataset.start), b.dataset.label); });
    } },
  { id: "w-weak", size: "w", name: "Weakest topics", icon: "alert", what: "The topics that need you most, from your answers.",
    render: (d) => {
      const t = (d.s.topics || []).filter((x) => x.cards && x.reviews !== 0).sort((a, b) => a.mastery - b.mastery).slice(0, 4);
      return t.length ? `<ul class="wd-list">${t.map((x) => `<li><a href="${esc(d.topicHref ? d.topicHref(x.key) : "#/progress")}"><b>${esc(x.topic)}</b><small>${Math.round(x.mastery * 100)}% · ${esc(x.next?.label || "Practise")}</small></a></li>`).join("")}</ul>` : empty("Answer some cards and your weakest topics show here.", "#/study", "Start");
    } },
  { id: "w-pins", size: "w", name: "Pinned", icon: "star", what: "What you've pinned, from anywhere in Gradify.",
    render: () => { const p = pins().slice(0, 6); return p.length ? `<ul class="wd-list">${p.map((x) => `<li><a href="${esc(local(x.href))}"><b>${esc(x.title)}</b><small>${esc(x.sub || "")}</small></a></li>`).join("")}</ul>` : empty("Pin a lesson, a set or a screen from its ••• menu and it's here."); } },
  { id: "w-saved", size: "w", name: "Recently saved", icon: "upload", what: "What you last saved to a collection.",
    render: () => {
      const items = stateList("collitem").slice(0, 5).map((e) => ({ ...e.value.r, cid: e.value.cid }));
      const names = new Map(collections().map((c) => [c.id, c.name]));
      return items.length ? `<ul class="wd-list">${items.map((x) => `<li><a href="${esc(local(x.href))}"><b>${esc(x.title)}</b><small>in ${esc(names.get(x.cid) || "a collection")}</small></a></li>`).join("")}</ul>${link("#/collections", "Collections")}` : empty("Save things to a collection from their ••• menu.", "#/collections", "Collections");
    } },
  { id: "w-collections", size: "w", name: "Your collections", icon: "book", what: "Your collections, one tap away.",
    render: () => { const c = collections().slice(0, 6); return c.length ? `<ul class="wd-list">${c.map((x) => `<li><a href="#/collections/${esc(x.id)}"><b>${esc(x.name)}</b><small>${itemsOf(x.id).length} items</small></a></li>`).join("")}</ul>` : empty("No collections yet.", "#/collections", "Make one"); } },
  { id: "w-mistakes", size: "w", name: "Recent mistakes", icon: "alert", what: "Questions you got wrong and haven't got right since.",
    render: () => { const m = mistakes().filter((x) => !x.resolved).sort((a, b) => b.t - a.t).slice(0, 4); return m.length ? `<ul class="wd-list">${m.map((x) => `<li><a href="${esc(x.href || x.lesson?.href || "#")}"><b>${esc(x.question || "A question")}</b><small>${esc(x.lesson?.title || "")}${x.times > 1 ? ` · wrong ${x.times} times` : ""}</small></a></li>`).join("")}</ul>${link("#/revise", "Revision Centre")}` : empty("No mistakes waiting. Each one you get wrong in a course comes here until you get it right."); } },
  { id: "w-session", size: "w", name: "Study session", icon: "route", what: "Start, or carry on with, a planned study session.",
    render: () => { const s = session(); return s ? `<p class="wd-big">Step ${s.i + 1} of ${s.steps.length}</p><p class="wd-sub">${esc(s.steps[s.i]?.title || "")}</p><div class="wd-launch"><a class="cp-pill dark" href="#/session">Carry on</a></div>` : `${empty("No session running.")}<div class="wd-launch"><a class="cp-pill dark" href="#/today" data-plan-session>Plan a session</a></div>`; },
    mount(el) { el.querySelector("[data-plan-session]")?.addEventListener("click", (e) => { const p = document.querySelector(".ss-plan"); if (p) { e.preventDefault(); p.scrollIntoView({ behavior: "smooth", block: "start" }); } }); } },
  { id: "w-tools", size: "w", name: "Your tools", icon: "forge", what: "The tools you use most, one tap away.",
    render: () => `<div class="wd-launch">${topTools(history()).map((t) => `<a class="cp-pill" href="${t.href}">${esc(t.name)}</a>`).join("")}</div>${link("#/tools", "Every tool")}` },
  { id: "w-alerts", size: "w", name: "Worth doing", icon: "bell", what: "Updates that need you, without repeating what's already on your board.",
    render: (d) => {
      const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
      const missed = todaysTasks(d.m.blocks, d.m.today).filter((b) => !b.done && b.end_min < nowMin);
      const dl = (d.m.deadlines || []).map((x) => ({ title: x.title, days: Math.round((Date.parse(`${x.day}T00:00:00`) - Date.parse(`${d.m.today}T00:00:00`)) / 864e5) })).sort((a, b) => a.days - b.days)[0] || null;
      const a = alertsFor({ due: d.s.due.length, missed, mistakes: mistakes().filter((x) => !x.resolved).length, sync: syncStatus(), deadline: dl }, new Set(d.chosen || []));
      return a.length ? `<ul class="wd-list wd-alerts">${a.map((x) => `<li class="${x.tone || ""}"><a href="${esc(x.href)}"><b>${esc(x.t)}</b></a></li>`).join("")}</ul>` : empty("Nothing needs you right now.");
    } },
].map((w) => ({ ...w, size: w.size || "w" }));
