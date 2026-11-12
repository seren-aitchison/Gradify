// The Journey page (journey.html): the learner's whole Gradify progress in one place, and what to do next.
// Reads each course's own progress from this device (kit/course/course.js keeps it under "gradify.course.<slug>"),
// computes everything with the game engine, and keeps only its own reward ledger ("gradify.game").
import { gameState, claim, dayKey, weekStart, DAY, unsynced, rewardKind, outsideCourses } from "./engine.js";
import { quests, nextSteps } from "./quests.js";
import { achievements, nextAchievement } from "./achievements.js";
import { dailyChallenge, challengeReward } from "./challenges.js";
import { COURSES } from "../learning/learner-data.js";
import { startedCourses } from "../learning/course-states.js";
import { conceptGraph } from "../learning/concepts.js";
import { weaknessTargets } from "../learning/targets.js";
import { parseNotes } from "../course/notes.js";
import { renderQuestion, wireQuestions } from "../assess/questions.js";
import { icon } from "../core/icons.js";
import { esc } from "../core/text.js";
import { CloudStore, LocalStore } from "../data/store.js";

const GAME_KEY = "gradify.game";
const read = (k) => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode: rewards last this visit */ } };
const ic = (n) => `<span class="gj-ic" aria-hidden="true">${icon(n) || icon("star")}</span>`;
const fmt = (n) => Number(n).toLocaleString("en-GB");
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// the courses this learner has started, with their configs: this device's progress, then the account's
// (kit/learning/course-states.js, the same source goals use, so goal XP and the level always agree)
const loadCourses = (store) => startedCourses(store);

// embedded: inside the LifeOS app (My Progress), with an h2 heading instead of the page's h1
// the learner's store, when the page doesn't pass one: the account when signed in, otherwise this device
async function resolveStore(store) {
  if (store) return store;
  const local = new LocalStore();
  try { const cloud = await CloudStore.create(); if (cloud && (await cloud.user())) return cloud; } catch { /* this device */ }
  return local;
}
// learning outside courses (flashcards, packs, workouts), so the level and streak here match the account's
async function outsideActivity(store) {
  try { return outsideCourses(await store.listActivity(400), Object.keys(COURSES)); } catch { return []; }
}

/** The learner's level, XP, rank and streak, worked out exactly as the Journey does (for the LifeOS Command Centre). */
export async function journeySummary({ store = null, now = Date.now() } = {}) {
  store = await resolveStore(store);
  const [courses, extra] = await Promise.all([loadCourses(store), outsideActivity(store)]);
  const s = gameState(courses, read(GAME_KEY) || {}, { now, extra });
  const graphs = Object.fromEntries(courses.filter((c) => c.cfg.concepts).map((c) => [c.slug, conceptGraph(c.units, c.cfg.concepts)]));
  const Q = courses.length ? quests(s, { graphs }) : [];
  return { xp: s.xp, level: s.level, rank: s.rank, streak: s.habits.streak, restBank: s.habits.restBank, todayXp: s.habits.todayXp, goal: s.habits.goal, today: s.habits.today,
    goalMet: s.habits.goalMet, quests: Q.filter((q) => q.kind === "daily").map(({ key, title, why, n, of, xp, done, paid }) => ({ key, title, why, n, of, xp, done, paid })),
    readyToClaim: Q.filter((q) => q.done && !q.paid).length, nextAchievement: (() => { const a = nextAchievement(achievements(s)); return a && { name: a.name, d: a.d, n: a.n, of: a.of }; })() };
}

// store: the learner's store, when the page already has one (the LifeOS app); otherwise this device's, or the account's
export async function mountJourney(root, { embedded = false, store = null } = {}) {
  let game = read(GAME_KEY) || {};
  store = await resolveStore(store);
  const [courses, extra] = await Promise.all([loadCourses(store), outsideActivity(store)]);
  const graphs = Object.fromEntries(courses.filter((c) => c.cfg.concepts).map((c) => [c.slug, conceptGraph(c.units, c.cfg.concepts)]));
  let challenge = null, challengeState = null;
  const href = (slug, lesson) => `${COURSES[slug]}#/lesson/${lesson}`;
  const state = () => gameState(courses, game, { now: Date.now(), extra });

  // pay a finished reward once, then celebrate it
  let pay = function (reward, label) {
    const before = state(), next = claim(game, reward, Date.now());
    if (next === game) return;
    game = next; write(GAME_KEY, game);
    const after = state();
    toast(`${ic("bolt")} +${reward.xp} XP · ${esc(label || reward.title)}`);
    if (after.level.n > before.level.n) celebrate(`Level ${after.level.n}`, `You reached level ${after.level.n}: ${esc(after.rank.name)}.`);
    paint();
  };

  function paint() {
    const s = state(), H = s.habits, Q = quests(s, { graphs }), A = achievements(s), got = A.filter((a) => a.done);
    // achievements unlock (and pay) as soon as they're earned, with their animation the first time
    const fresh = A.filter((a) => a.done && !a.paid);
    if (fresh.length) {
      for (const a of fresh) game = claim(game, a, Date.now());
      write(GAME_KEY, game); syncRewards();
      fresh.slice(0, 2).forEach(unlock);
      if (fresh.length > 2) toast(`${ic("award")} ${fresh.length - 2} more achievement${fresh.length > 3 ? "s" : ""} unlocked: see your collection`);
      return paint();
    }
    const ready = Q.filter((q) => q.done && !q.paid), steps = nextSteps(s, { graphs }), nextA = nextAchievement(A);
    const goalPct = Math.min(1, H.todayXp / H.goal), R = 34, C = 2 * Math.PI * R;
    const dayOfWeek = Math.floor((Date.now() - weekStart(Date.now())) / DAY) + 1;
    root.innerHTML = `
      <header class="gj-head"><span class="gj-kicker">Gradify</span>${embedded ? "<h2>Level, quests and achievements</h2>" : "<h1>Your learning journey</h1>"}
        <p>${courses.length ? `Across ${courses.length} subject${courses.length > 1 ? "s" : ""} on this device. Everything here comes from what you've actually done.` : "Start any Gradify course and your progress, quests and achievements appear here."}</p></header>
      <section class="gj-stats" aria-label="Your progress at a glance">
        <article class="gj-card gj-level"><div class="gj-ring" style="--p:${(s.level.into / (s.level.to - s.level.from)) * 100}%"><b>${s.level.n}</b><small>level</small></div>
          <div><span class="gj-label">${esc(s.rank.name)}</span><b class="gj-big">${fmt(s.xp)}</b><span class="gj-sub">XP earned${s.todayGain ? ` · <em>+${fmt(s.todayGain)} today</em>` : ""}</span>
          <span class="gj-sub">${fmt(s.level.need)} XP until level ${s.level.n + 1}${s.rank.next ? ` · ${esc(s.rank.next.name)} at level ${s.rank.next.at}` : ""}</span></div></article>
        <article class="gj-card"><span class="gj-label">${ic("flame")} Streak</span><b class="gj-big">${H.streak}<small> day${H.streak === 1 ? "" : "s"}</small></b>
          <span class="gj-sub">${H.today ? "Today counts." : H.streak ? "Learn today to extend it." : "Any learning today starts one."}${H.restBank ? ` ${H.restBank} rest day${H.restBank > 1 ? "s" : ""} banked.` : ""}</span></article>
        <article class="gj-card gj-goal"><svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="${R}" class="bg"/><circle cx="40" cy="40" r="${R}" class="fg" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - goalPct)}"/></svg>
          <div><span class="gj-label">Daily goal</span><b class="gj-big">${H.todayXp}<small> / ${H.goal} XP</small></b><span class="gj-sub">${H.goalDays} of ${dayOfWeek} day${dayOfWeek > 1 ? "s" : ""} met this week${H.goalMet ? " · done today" : ""}</span>
          <label class="gj-sub">Goal <select data-goal aria-label="Daily XP goal">${[20, 30, 50, 80, 120].map((g) => `<option ${g === H.goal ? "selected" : ""} value="${g}">${g} XP</option>`).join("")}</select></label></div></article>
        <article class="gj-card"><span class="gj-label">${ic("award")} Achievements</span><b class="gj-big">${got.length}<small> / ${A.length}</small></b><span class="gj-sub">Your collection</span></article>
        <article class="gj-card"><span class="gj-label">${ic("checklist")} Quests</span><b class="gj-big">${Q.filter((q) => !q.paid).length}<small> active</small></b><span class="gj-sub">${ready.length ? `<em>${ready.length} ready to claim</em>` : "Progress updates as you learn"}</span></article>
      </section>
      ${steps.length ? `<section class="gj-next" aria-label="What to do next">${steps.slice(0, 2).map((x) => `<a class="gj-card gj-step ${x.kind}" href="${x.lesson ? href(x.lesson.course, x.lesson.id) : x.unit ? `${COURSES[x.unit.course]}#/quiz/${x.unit.id}` : "#challenge"}"><span class="gj-label">${{ return: "Gently back", recover: "Recover", next: "Next", stretch: "Stretch", continue: "Continue" }[x.kind]}</span><b>${esc(x.title)}</b><span class="gj-sub">${esc(x.text)}</span></a>`).join("")}</section>` : ""}
      <div class="gj-cols">
        <div>
          ${questsHtml("Today's quests", Q.filter((q) => q.kind === "daily"))}
          ${questsHtml("This week", Q.filter((q) => q.kind === "weekly"))}
          <section class="gj-card gj-challenge" id="challenge"></section>
          <section class="gj-card"><h2>Subjects</h2>${s.subjects.length ? s.subjects.map((x) => `<a class="gj-subject" href="${COURSES[x.slug]}"><div><b>${esc(x.name)}</b><span class="gj-sub">${esc(x.site)} · ${esc(x.rank.name)} · level ${x.level.n} · ${fmt(x.xp)} XP</span></div>
            <div class="gj-bar" role="img" aria-label="${x.done} of ${x.lessons} lessons"><i style="width:${x.lessons ? (100 * x.done) / x.lessons : 0}%"></i></div><span class="gj-sub">${x.done} / ${x.lessons} lessons · ${x.unitsDone} complete</span></a>`).join("") : `<p class="gj-sub">No courses started on this device yet.</p>`}
            <p class="gj-sub gj-more">Explore: ${Object.entries(COURSES).filter(([k]) => !courses.some((c) => c.slug === k)).map(([k, p]) => `<a href="${p}">${esc(k[0].toUpperCase() + k.slice(1))}</a>`).join(" · ")}</p></section>
        </div>
        <div>
          ${nextA ? `<section class="gj-card gj-nexta"><span class="gj-label">Next achievement</span><div class="gj-ach">${badge(nextA)}<div><b>${esc(nextA.name)}</b><span class="gj-sub">${esc(nextA.d)}</span><div class="gj-bar"><i style="width:${(100 * nextA.n) / nextA.of}%"></i></div><span class="gj-sub">${nextA.n} / ${nextA.of}</span></div></div></section>` : ""}
          <section class="gj-card"><h2>Learning calendar</h2>${calendar(H.calendar, H.restDays)}</section>
          <section class="gj-card"><h2>Personal records</h2><dl class="gj-records">
            <div><dt>Best streak</dt><dd>${H.best} days</dd></div><div><dt>Best day</dt><dd>${fmt(H.bestDay)} XP</dd></div>
            <div><dt>Best week</dt><dd>${fmt(H.bestWeek)} XP</dd></div><div><dt>Consistent weeks</dt><dd>${H.consistentWeeks}</dd></div></dl>
            <p class="gj-sub">A consistent week is three or more days of study. Every seven days of learning banks a rest day (up to three) that covers a missed day automatically, so illness or a break doesn't wipe your streak.</p></section>
          <section class="gj-card"><h2>Recent rewards</h2>${s.recent.length ? `<ul class="gj-recent">${s.recent.map((e) => `<li><b>+${e.xp}</b> ${esc(label(e))}<time>${new Date(e.t).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</time></li>`).join("")}</ul>` : `<p class="gj-sub">Nothing yet.</p>`}</section>
        </div>
      </div>
      <section class="gj-card gj-collection" aria-label="Achievement collection"><h2>Collection</h2>${groups(A)}</section>`;
    root.querySelector("[data-goal]")?.addEventListener("change", (e) => { game = { ...game, goal: Number(e.target.value) }; write(GAME_KEY, game); paint(); });
    root.querySelectorAll("[data-claim]").forEach((b) => b.addEventListener("click", () => { const q = Q.find((x) => x.key === b.dataset.claim); if (q) pay(q, q.title); }));
    paintChallenge(s);
  }

  const LIFE = { session: "Flashcard session", pack: "Study pack", quiz: "Quiz", block: "Planned study block", workout: "Workout", body_checkin: "Body check-in", fitness_test: "Fitness test" };
  const label = (e) => e.k === "life" ? `${e.site && e.site !== "Gradify" ? `${e.site}: ` : ""}${LIFE[e.id] || "Activity"}` : e.k === "game" ? (game.paid?.[e.id]?.title || "Reward") : `${courses.find((c) => c.slug === e.course)?.name || ""}: ${{ lesson: "lesson", check: "question", quiz: "quiz", chest: "chest", review: "review", practice: "lab or practice", mock: "mock exam", write: "written task", weekly: "weekly challenge" }[e.k] || e.k}`;
  function questsHtml(title, list) {
    if (!list.length) return "";
    return `<section class="gj-card"><h2>${title}</h2><ul class="gj-quests">${list.map((q) => `<li class="${q.paid ? "paid" : q.done ? "ready" : ""}">
      <div><b>${esc(q.title)}</b><span class="gj-sub">${esc(q.why || "")}</span><div class="gj-bar" role="img" aria-label="${q.n} of ${q.of}"><i style="width:${(100 * q.n) / q.of}%"></i></div></div>
      ${q.paid ? `<span class="gj-xp done">${ic("check")} +${q.xp}</span>` : q.done ? `<button class="gj-claim" data-claim="${esc(q.key)}">Claim +${q.xp} XP</button>` : `<span class="gj-xp">${q.n} / ${q.of} · +${q.xp} XP</span>`}</li>`).join("")}</ul></section>`;
  }
  const badge = (a) => `<span class="gj-badge ${a.tier} ${a.done ? "on" : ""}">${ic(a.icon)}</span>`;
  function groups(A) {
    const by = new Map(); for (const a of A) (by.get(a.group) || by.set(a.group, []).get(a.group)).push(a);
    return [...by].map(([g, list]) => `<h3>${esc(g)}</h3><ul class="gj-achs">${list.map((a) => `<li class="${a.done ? "on" : ""}" title="${esc(a.d)}">${badge(a)}<b>${esc(a.name)}</b><span class="gj-sub">${esc(a.d)}</span>${a.done ? `<span class="gj-sub">Unlocked${a.xp ? ` · +${a.xp} XP` : ""}</span>` : `<div class="gj-bar"><i style="width:${(100 * a.n) / a.of}%"></i></div><span class="gj-sub">${fmt(a.n)} / ${fmt(a.of)}</span>`}</li>`).join("")}</ul>`).join("");
  }
  function calendar(cal, rest) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const start = weekStart(today.getTime() - 11 * 7 * DAY), cells = [];
    for (let t = start; t <= today.getTime(); t += DAY) { const k = dayKey(t), xp = cal.get(k) || 0, lvl = xp ? Math.min(4, 1 + Math.floor(xp / 25)) : 0; cells.push(`<i class="l${lvl}${rest.includes(k) ? " rest" : ""}" title="${k}: ${xp} XP${rest.includes(k) ? " (rest day)" : ""}"></i>`); }
    return `<div class="gj-cal" role="img" aria-label="Study days over the last twelve weeks: ${[...cal.keys()].filter((k) => k >= dayKey(start)).length} active">${cells.join("")}</div><p class="gj-sub gj-legend">Less <i class="l0"></i><i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i> More · <i class="l0 rest"></i> rest day</p>`;
  }

  // ---------- the daily challenge ----------
  async function buildChallenge(s) {
    const itemsByLesson = {}, doneLessons = [], lessons = [], weak = [], attempts = [];
    for (const c of courses) {
      const doneUnits = new Set(c.units.filter((u) => u.lessons.some((l) => c.S.done?.[l.id])).map((u) => u.id));
      for (const u of c.units.filter((u) => doneUnits.has(u.id) && c.written.includes(u.id))) {
        let parsed = []; try { parsed = parseNotes(await c.notes(u.id)); } catch { continue; }
        u.lessons.forEach((l, i) => {
          const L = parsed.find((p) => p.title.toLowerCase() === l.title.toLowerCase()) || parsed[i]; if (!L) return;
          const key = `${c.slug}:${l.id}`;
          itemsByLesson[key] = [...L.mcq.map((m) => m.Q), ...L.tasks].map((Q, j) => ({ key: `${key}:${j}`, Q, course: c.slug, lesson: key }));
          if (c.S.done?.[l.id]) doneLessons.push(key);
          lessons.push({ ...L, id: l.id, course: c.slug });
        });
      }
      for (const t of weaknessTargets(c.S.attempts || [], { graph: graphs[c.slug] || null, levels: c.levels || null, exploration: c.exploration || null, limit: 3 })) weak.push({ ...t, lesson: `${c.slug}:${t.lesson}` });
      attempts.push(...(c.S.attempts || []).map((a) => ({ ...a, lesson: `${c.slug}:${a.lesson}` })));
    }
    return dailyChallenge({ day: dayKey(s.now), weak, attempts, itemsByLesson, doneLessons, lessons, subjects: courses.map((c) => c.slug) });
  }
  async function paintChallenge(s) {
    const box = root.querySelector(".gj-challenge"); if (!box) return;
    if (challenge === null) { box.innerHTML = `<h2>${ic("target")} Daily challenge</h2><p class="gj-sub">Building today's challenge from your courses…</p>`; challenge = (await buildChallenge(s)) || false; }
    if (!challenge) { box.innerHTML = `<h2>${ic("target")} Daily challenge</h2><p class="gj-sub">Complete a few lessons and a challenge built from them appears here each day.</p>`; return; }
    const paid = game.paid?.[challenge.key];
    if (!challengeState) {
      box.innerHTML = `<h2>${ic("target")} Daily challenge: ${esc(challenge.title)}</h2><p class="gj-sub">${esc(challenge.blurb)}</p>${paid ? `<p class="gj-sub"><em>Done today: +${paid.xp} XP.</em> A new challenge appears tomorrow; you can still practise this one.</p>` : `<p class="gj-sub">Up to +50 XP, once a day.</p>`}<button class="gj-claim" data-start>${paid ? "Practise again" : "Start the challenge"}</button>`;
      box.querySelector("[data-start]").addEventListener("click", () => { challengeState = { first: {}, started: Date.now() }; paintChallenge(s); });
      return;
    }
    const lookup = Object.fromEntries(challenge.items.map((it) => [it.key, it.Q]));
    box.innerHTML = `<h2>${ic("target")} ${esc(challenge.title)}</h2>${challenge.seconds ? `<p class="gj-sub" data-timer aria-live="off"></p>` : ""}<div class="gj-qs">${challenge.items.map((it) => renderQuestion(it.Q, it.key, { levels: courses.find((c) => c.slug === it.course)?.levels })).join("")}</div><p class="gj-sub" data-result role="status" aria-live="polite"></p>`;
    if (challenge.seconds) { const t = box.querySelector("[data-timer]"), tick = () => { const left = Math.max(0, challenge.seconds - Math.round((Date.now() - challengeState.started) / 1000)); t.textContent = left ? `${left} seconds left (answers after the time still count, at no extra XP)` : "Time's up: finish at your own pace."; if (left && box.isConnected) setTimeout(tick, 1000); }; tick(); }
    wireQuestions(box, (k) => lookup[k], (Q, res, first, el) => {
      const k = el.dataset.key; if (first && !(k in challengeState.first)) challengeState.first[k] = { correct: !!res.correct, score: res.score ?? (res.correct ? 1 : 0), inTime: !challenge.seconds || Date.now() - challengeState.started <= challenge.seconds * 1000 };
      if (Object.keys(challengeState.first).length < challenge.items.length) return;
      const r = Object.values(challengeState.first), result = { correct: r.filter((x) => x.correct && x.inTime).length, score: r.reduce((a, x) => a + x.score, 0) / r.length };
      const reward = challengeReward(result, challenge);
      box.querySelector("[data-result]").innerHTML = `<b>${r.filter((x) => x.correct).length} of ${r.length} right first time.</b> ${game.paid?.[challenge.key] ? "Today's reward is already yours." : reward.xp ? `+${reward.xp} XP.` : "No XP this time, but every attempt counts as practice."}`;
      if (!game.paid?.[challenge.key]) { game = claim(game, reward, Date.now()); write(GAME_KEY, game); syncRewards(); toast(`${ic("target")} Daily challenge done${reward.xp ? ` · +${reward.xp} XP` : ""}`); setTimeout(() => { challengeState = null; paint(); }, 2500); }
    });
  }

  // ---------- celebrations (short, dismissible, and still for reduced motion) ----------
  function toast(html) {
    let box = document.querySelector(".gj-toasts");
    if (!box) { box = document.createElement("div"); box.className = "gj-toasts"; box.setAttribute("role", "status"); box.setAttribute("aria-live", "polite"); document.body.append(box); }
    if (box.children.length >= 3) box.firstElementChild.remove();
    const t = document.createElement("div"); t.className = "gj-toast"; t.innerHTML = html;
    box.append(t); setTimeout(() => t.classList.add("out"), 3200); setTimeout(() => t.remove(), 3800);
  }
  function celebrate(title, text) {
    const d = document.createElement("div"); d.className = "gj-celebrate"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true"); d.setAttribute("aria-label", title);
    d.innerHTML = `<div class="gj-cel-card"><div class="gj-burst${reduced() ? " still" : ""}">${ic("trophy")}</div><h2>${title}</h2><p>${text}</p><button class="gj-claim" data-close>Keep going</button></div>`;
    document.body.append(d); const b = d.querySelector("[data-close]"); b.focus();
    const close = () => d.remove(); b.addEventListener("click", close); d.addEventListener("keydown", (e) => e.key === "Escape" && close());
  }
  function unlock(a) { toast(`<span class="gj-badge ${a.tier} on pop">${ic(a.icon)}</span> <span><b>Achievement unlocked: ${esc(a.name)}</b><br>${esc(a.d)}${a.xp ? ` +${a.xp} XP` : ""}</span>`); }

  // ---------- account sync ----------
  // When signed in, every paid game reward is logged to the account once (activity kind "game-<key>"), so it counts in
  // the account's XP, LifeOS and on other devices. A reward the account already holds is never sent again, and the
  // database refuses a second row for the same key (migration 20261107120000_game_rewards.sql).
  let syncing = false;
  async function syncRewards() {
    if (syncing) return; syncing = true;
    try {
      const cloud = await CloudStore.create(), user = cloud ? await cloud.user() : null; if (!user) return;
      const have = new Set(((await cloud.listActivity(400)) || []).map((a) => a.kind).filter((k) => k?.startsWith("game-")));
      for (const [key, r] of Object.entries(game.paid || {})) {
        if (game.synced?.[key]) continue;
        if (unsynced({ paid: { [key]: r } }, have).length) {
          try { await cloud.logActivity({ site: "Gradify", kind: rewardKind(key), xp: r.xp, detail: r.title }); }
          catch (e) { if (e?.code !== "23505") throw e; }        // already recorded by another tab or device
          have.add(rewardKind(key));
        }
        game = { ...game, synced: { ...(game.synced || {}), [key]: Date.now() } }; write(GAME_KEY, game);
      }
    } catch { /* offline or signed out: rewards stay on this device and sync next time */ }
    finally { syncing = false; }
  }
  const _pay = pay;
  pay = (reward, label) => { _pay(reward, label); syncRewards(); };

  paint();
  syncRewards();
  // progress made in a course tab shows here when the learner comes back
  addEventListener("storage", (e) => { if (e.key?.startsWith("gradify.course.") || e.key === GAME_KEY) location.reload(); });
}
