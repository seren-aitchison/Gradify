// The habits board on the Journey page (journey.html): a pixel card per habit, the coach line in green-to-violet
// glass, and sheets to look closer at a habit or add one. The numbers come from kit/game/habits.js.
// Own habits and each habit's weekly target are kept on this device ("gradify.habits").
//
//   mountHabits(el, { events, goal, actFor: (id) => ({ label, href }) })
import { LEARNING, IDEAS, PALETTE, EDIT_DAYS, dayCounts, habitStats, grid, weekdayPattern, coach } from "./habits.js";
import { dayKey, DAY } from "./engine.js";
import { icon } from "../core/icons.js";
import { esc } from "../core/text.js";

const KEY = "gradify.habits";
const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || "null") || {}; } catch { return {}; } };
const write = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* private mode: lasts this visit */ } };
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const FREQ = [[7, "Every day"], [5, "5 days a week"], [4, "4 days a week"], [3, "3 days a week"]];
const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;

export function mountHabits(el, { events = [], goal = 30, actFor = () => null, now = () => Date.now() } = {}) {
  if (!el) return;
  let D = { own: [], settings: {}, hidden: [], coachOff: null, ...read() };
  const save = () => write(D);

  function habits() {
    const t = now(), counts = dayCounts(events, D.own, { goal });
    const learning = LEARNING.filter((h) => !D.hidden.includes(h.id)).map((h) => ({ ...h, kind: "learning", perWeek: D.settings[h.id]?.perWeek || 7 }));
    const own = D.own.map((h) => ({ ...h, kind: "own", unit: "time", target: 1, perWeek: h.perWeek || 7 }));
    return [...learning, ...own].map((h) => {
      const c = counts.get(h.id) || new Map(), stats = habitStats(c, { target: h.target, perWeek: h.perWeek, now: t }), left = Math.max(0, h.target - stats.todayCount);
      const need = h.id === "goal" ? "reaching your goal" : h.kind === "own" ? "a check-in" : left === 1 ? `one ${h.unit}` : `${left} ${h.unit}s`;
      return { ...h, counts: c, stats, need, pattern: weekdayPattern(c, { target: h.target, now: t }), act: h.kind === "learning" ? actFor(h.id) : null };
    });
  }

  const cellsHtml = (h, weeks, editable = false) => grid(h.counts, { target: h.target, weeks, now: now() }).map((col) => `<span class="hb-col">${col.map((c) => {
    const can = editable && !c.future && Date.parse(`${c.d}T12:00:00`) > now() - EDIT_DAYS * DAY;
    const label = `${new Date(`${c.d}T12:00:00`).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })}: ${c.future ? "still to come" : c.n ? `${c.n}${h.target > 1 ? ` of ${h.target}` : ""}` : "not done"}`;
    return `<${can ? "button type=\"button\"" : "i"} class="hb-px hb-l${c.lvl}${c.today ? " today" : ""}${c.future ? " future" : ""}" ${can ? `data-day="${c.d}" aria-pressed="${c.n > 0}"` : ""} title="${esc(label)}" ${can ? `aria-label="${esc(label)}"` : ""}></${can ? "button" : "i"}>`;
  }).join("")}</span>`).join("");

  const foot = (h) => {
    const s = h.stats;
    if (h.kind === "own") return s.todayCount ? `<button type="button" class="hb-btn done" data-check="${h.id}" aria-label="Checked in ${s.todayCount} today. Check in again">${icon("check")}${s.todayCount > 1 ? `<span>× ${s.todayCount}</span>` : ""}</button>` : `<button type="button" class="hb-btn" data-check="${h.id}">Check-In</button>`;
    if (s.todayMet) return `<span class="hb-btn done" role="status">${icon("check")}${s.todayCount > 1 ? `<span>× ${s.todayCount}</span>` : ""}</span>`;
    return h.act ? `<a class="hb-btn" href="${esc(h.act.href)}" aria-label="${esc(`${h.act.label}: ${h.need} to go today`)}">${esc(h.act.label)}</a>` : `<span class="hb-btn idle">${esc(h.need)} to go</span>`;
  };
  const card = (h) => `<article class="hb-card${h.stats.todayMet ? " met" : ""}" style="--h:${h.colour}" data-h="${esc(h.id)}">
      <button type="button" class="hb-head" data-open="${esc(h.id)}" aria-label="${esc(`${h.name}: open its details`)}"><span class="hb-ic" ${h.kind === "learning" ? `title="Fills itself in from your courses"` : ""}>${icon(h.icon) || icon("sparkles")}</span><b>${esc(h.name)}</b></button>
      <div class="hb-grid" style="--w:10" role="img" aria-label="${esc(`${h.name}, last 10 weeks: done on ${h.stats.checkins ? h.stats.checkins : "no"} days`)}">${cellsHtml(h, 10)}</div>
      <p class="hb-meta">${h.stats.streak ? `${icon("flame")} ${plural(h.stats.streak, h.stats.unit)}` : "No streak yet"}<span>${h.stats.todayMet ? `${Math.round(h.stats.rate30 * 100)}% · 30 days` : `${esc(h.need)} today`}</span></p>
      ${foot(h)}</article>`;

  // the coach line: the green-to-violet glass (.glass-coach), one thing worth knowing, with what to do about it
  const coachHtml = (c) => {
    if (!c || D.coachOff === `${dayKey(now())}:${c.kind}:${c.habit}`) return "";
    return `<aside class="glass-coach hb-coach" aria-label="Habit coach"><header><span class="gc-mark">${icon("sparkles")}</span><b>Habit coach</b><button type="button" class="gc-x" data-coach-x aria-label="Hide for today">${icon("x")}</button></header>
      <p><b>${esc(c.title)}</b> ${esc(c.text)}</p>
      <div class="gc-acts">${c.act ? `<a class="gc-chip" href="${esc(c.act.href)}">${esc(c.act.label)}</a>` : ""}<button type="button" class="gc-chip" data-open="${esc(c.habit)}">See the pattern</button></div></aside>`;
  };

  function paint() {
    const list = habits(), c = coach(list, { now: now() }), doneToday = list.filter((h) => h.stats.todayMet).length;
    el.innerHTML = `<header class="hb-top"><div><span class="gj-kicker">Habits</span><h2>Your habits</h2><p>${doneToday} of ${list.length} done today. Learning habits fill themselves in from your courses; check in your own.</p></div>
        <button type="button" class="hb-add" data-add>${icon("sparkles")} Add habit</button></header>
      ${coachHtml(c)}
      <div class="hb-cards">${list.map(card).join("")}</div>`;
  }

  // ---------- sheets: a habit up close, and adding one ----------
  function sheet(html, wire) {
    const back = document.activeElement, d = document.createElement("div");
    d.className = "hb-sheetbg"; d.innerHTML = `<div class="hb-sheet hb-board" role="dialog" aria-modal="true">${html}</div>`;
    const close = () => { d.remove(); removeEventListener("keydown", key); back?.focus?.({ preventScroll: true }); paint(); };
    const key = (e) => { if (e.key === "Escape") close(); };
    d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("[data-close]")) close(); });
    addEventListener("keydown", key); document.body.append(d);
    wire?.(d.querySelector(".hb-sheet"), close);
    d.querySelector("[data-close]")?.focus();
  }
  function openHabit(id) {
    const draw = (box) => {
      const h = habits().find((x) => x.id === id); if (!h) return;
      const s = h.stats, wk = h.perWeek >= 7 ? null : `${s.weekDone} / ${h.perWeek}`;
      box.style.setProperty("--h", h.colour);
      box.innerHTML = `<header class="hb-sh"><span class="hb-ic">${icon(h.icon) || icon("sparkles")}</span><h3>${esc(h.name)}</h3><button type="button" class="gc-x" data-close aria-label="Close">${icon("x")}</button></header>
        <div class="hb-big" style="--w:26">${cellsHtml(h, 26, h.kind === "own")}</div>
        ${h.kind === "own" ? `<p class="hb-note">Tap a day in the last week to correct it.</p>` : `<p class="hb-note">Filled in from your courses: ${esc(h.why)}</p>`}
        <div class="hb-tiles">
          <div><small>${icon("flame")} Streak</small><b>${s.streak}</b><em>${s.unit}s · best ${s.best}</em></div>
          <div><small>${icon("check")} Days done</small><b>${s.checkins}</b><em>in total</em></div>
          <div><small>${icon("trend")} Last 30 days</small><b>${Math.round(s.rate30 * 100)}%</b><em>${wk ? `this week ${wk}` : "of days"}</em></div>
          <div><small>${icon("calendar")} Pattern</small><b class="sm">${!h.pattern ? "–" : h.pattern.even ? "Even" : esc(h.pattern.strongest)}</b><em>${!h.pattern ? "needs a few weeks" : h.pattern.even ? "no day of the week slips" : `best day · ${esc(h.pattern.weakest.toLowerCase())} slip`}</em></div></div>
        <label class="hb-freq"><span>Target</span><select data-freq>${FREQ.map(([n, l]) => `<option value="${n}" ${n === h.perWeek ? "selected" : ""}>${l}</option>`).join("")}</select></label>
        <p class="hb-note">${h.perWeek < 7 ? "A weekly target: rest days don't break the streak, weeks do." : "Every day: miss one and the streak starts again. A weekly target is kinder when life is busy."}</p>
        <div class="hb-shacts">${h.kind === "own" ? `<button type="button" class="gc-chip danger" data-del>Delete habit</button>` : `<button type="button" class="gc-chip" data-hide>Hide this habit</button>`}<button type="button" class="hb-btn" data-close>Done</button></div>`;
      box.querySelector("[data-freq]").addEventListener("change", (e) => {
        const n = Number(e.target.value);
        if (h.kind === "own") D.own = D.own.map((x) => (x.id === id ? { ...x, perWeek: n } : x)); else D.settings[id] = { ...D.settings[id], perWeek: n };
        save(); draw(box);
      });
      box.querySelectorAll("[data-day]").forEach((b) => b.addEventListener("click", () => {
        const o = D.own.find((x) => x.id === id); if (!o) return; o.checks ||= {};
        if (o.checks[b.dataset.day]) delete o.checks[b.dataset.day]; else o.checks[b.dataset.day] = 1;
        save(); draw(box); box.querySelector(`[data-day="${b.dataset.day}"]`)?.focus();
      }));
      box.querySelector("[data-del]")?.addEventListener("click", (e) => {
        if (e.currentTarget.dataset.sure) { D.own = D.own.filter((x) => x.id !== id); save(); box.closest(".hb-sheetbg").querySelector("[data-close]").click(); return; }
        e.currentTarget.dataset.sure = "1"; e.currentTarget.textContent = "Tap again to delete it and its history";
      });
      box.querySelector("[data-hide]")?.addEventListener("click", () => { D.hidden = [...new Set([...D.hidden, id])]; save(); box.closest(".hb-sheetbg").querySelector("[data-close]").click(); });
    };
    sheet("", (box) => draw(box));
  }
  function openAdd() {
    let colour = PALETTE[(D.own.length + 4) % PALETTE.length], ic = "sparkles";
    const hiddenOnes = LEARNING.filter((h) => D.hidden.includes(h.id));
    sheet(`<header class="hb-sh"><span class="hb-ic">${icon("sparkles")}</span><h3>Add a habit</h3><button type="button" class="gc-x" data-close aria-label="Close">${icon("x")}</button></header>
      <p class="hb-note">Something you want to keep up alongside your studying. You check it in yourself.</p>
      <div class="hb-ideas">${IDEAS.filter((x) => !D.own.some((o) => o.name === x.name)).map((x) => `<button type="button" class="gc-chip" data-idea="${esc(x.name)}" data-c="${x.colour}" data-i="${x.icon}">${esc(x.name)}</button>`).join("")}</div>
      <form class="hb-form"><label><span>Name</span><input name="name" maxlength="40" required placeholder="e.g. Read for 20 minutes" autocomplete="off"></label>
        <div class="hb-sw" role="radiogroup" aria-label="Colour">${PALETTE.map((c) => `<button type="button" role="radio" aria-checked="${c === colour}" aria-label="Colour ${c}" data-col="${c}" style="--c:${c}"></button>`).join("")}</div>
        <label class="hb-freq"><span>Target</span><select name="freq">${FREQ.map(([n, l]) => `<option value="${n}">${l}</option>`).join("")}</select></label>
        <div class="hb-shacts">${hiddenOnes.length ? `<button type="button" class="gc-chip" data-unhide>Show hidden learning habits (${hiddenOnes.length})</button>` : ""}<button type="submit" class="hb-btn">Add habit</button></div></form>`, (box, close) => {
      const name = box.querySelector("[name=name]");
      const pickCol = (c) => { colour = c; box.querySelectorAll("[data-col]").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.col === c))); };
      box.querySelectorAll("[data-col]").forEach((b) => b.addEventListener("click", () => pickCol(b.dataset.col)));
      box.querySelectorAll("[data-idea]").forEach((b) => b.addEventListener("click", () => { name.value = b.dataset.idea; ic = b.dataset.i; pickCol(b.dataset.c); name.focus(); }));
      box.querySelector("[data-unhide]")?.addEventListener("click", () => { D.hidden = []; save(); close(); });
      box.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault(); const n = name.value.trim(); if (!n) return;
        D.own = [...D.own, { id: `own:${Date.now().toString(36)}`, name: n, icon: ic, colour, perWeek: Number(box.querySelector("[name=freq]").value), checks: {}, created: Date.now() }];
        save(); close();
      });
      setTimeout(() => name.focus(), 50);
    });
  }

  el.addEventListener("click", (e) => {
    const chk = e.target.closest("[data-check]");
    if (chk) {
      const o = D.own.find((x) => x.id === chk.dataset.check); if (!o) return;
      const d = dayKey(now()); o.checks ||= {}; o.checks[d] = (o.checks[d] || 0) + 1; save(); paint();
      const px = el.querySelector(`.hb-card[data-h="${CSS.escape(o.id)}"] .hb-px.today`);
      if (px && !reduced()) px.classList.add("pop");
      el.querySelector(`.hb-card[data-h="${CSS.escape(o.id)}"] [data-check]`)?.focus();
      return;
    }
    const op = e.target.closest("[data-open]"); if (op) { openHabit(op.dataset.open); return; }
    if (e.target.closest("[data-add]")) { openAdd(); return; }
    if (e.target.closest("[data-coach-x]")) { const c = coach(habits(), { now: now() }); if (c) { D.coachOff = `${dayKey(now())}:${c.kind}:${c.habit}`; save(); } paint(); }
  });
  paint();
  return { paint };
}
