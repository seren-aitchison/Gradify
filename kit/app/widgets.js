// The Today board: a library of widgets, all built from the learner's real data (kit/intel model, stats, the Journey),
// in three sizes: small (one number that matters), wide (a list or a strip) and big (a picture of something). The
// learner chooses which appear (learner.intel.widgets); a calm default is used until they do. Every widget sizes to
// what's inside it, says what to do about what it shows, and has an empty state that says how to fill it.
// Wiring reuses the existing handlers (wireCockpit, wireIntel, wireTell), so the attributes here match theirs.
import { icon } from "../core/icons.js";
import { LEVELS } from "../learning/mastery.js";
import { heroCard, deckCard } from "./cockpit.js";
import { freeIntervals, windowsFor } from "../intel/schedule.js";
import { dayKey, DAY, hhmm } from "../intel/memory.js";
import { opportunities } from "../intel/autopilot.js";
import { QUESTIONS } from "../intel/ask.js";

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const pct = (v) => (v == null ? "–" : `${Math.round(v * 100)}%`);
const n0 = (x) => Number(x || 0).toLocaleString("en-GB");
const enc = encodeURIComponent;
const dl = (d, o = { weekday: "short", day: "numeric", month: "short" }) => new Date(`${d}T12:00:00`).toLocaleDateString("en-GB", o);
const daysTo = (d, today) => Math.round((Date.parse(`${d}T00:00:00`) - Date.parse(`${today}T00:00:00`)) / DAY);
const ring = (v, size = 64) => { const r = size / 2 - 5, c = 2 * Math.PI * r; return `<svg class="wd-ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="t"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="f" stroke-dasharray="${(c * Math.max(0, Math.min(1, v))).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 ${size / 2} ${size / 2})"/></svg>`; };

// ---------- small: one number that matters ----------
const small = (w, { label, value, sub, href, extra = "" }) => `<a class="wd wd-s ${w.tone ? `tone-${w.tone}` : ""}" href="${href}" data-w="${w.id}"><span class="wd-label">${icon(w.icon)}${label}</span><span class="wd-num">${value}</span>${extra}<span class="wd-sub">${sub}</span></a>`;
const SMALL = [
  { id: "s-ready", name: "Exam readiness", tone: "indigo", icon: "sparkles", what: "Demonstrated mastery, with the range it's likely in.",
    render: (d) => { const r = d.m.preds.readiness; return small(d.w, { label: "Readiness", value: d.m.concepts.length ? pct(r.value) : "–", sub: d.m.concepts.length ? `likely ${pct(r.low)}–${pct(r.high)}` : "Answer a few cards", href: "#/intel" }); } },
  { id: "s-due", name: "Due now", icon: "layers", what: "Cards due, and how long they'll take.",
    render: (d) => small(d.w, { label: "Due now", value: n0(d.m.preds.dueCards), sub: d.m.preds.dueCards ? `about ${Math.max(1, Math.ceil((d.m.preds.dueCards * 25) / 60))} min · tap to start` : "You're caught up", href: "#/study" }) },
  { id: "s-streak", name: "Streak", tone: "orange", icon: "flame", what: "Days in a row, with this week's days.",
    render: (d) => { const days = Array.from({ length: 7 }, (_, k) => dayKey(Date.now() - (6 - k) * DAY)); const by = d.s.byDay || {};
      return small(d.w, { label: "Streak", value: `${d.streak}<small> ${d.streak === 1 ? "day" : "days"}</small>`, sub: by[d.m.today] ? "Done today" : d.streak ? "Study today to keep it" : "Start one today", href: "#/progress", extra: `<span class="wd-dots">${days.map((k) => `<i class="${by[k] ? "on" : ""}"></i>`).join("")}</span>` }); } },
  { id: "s-deadline", name: "Next deadline", tone: "pink", icon: "calendar", what: "Days to your next exam or deadline.",
    render: (d) => { const x = d.m.deadlines.slice().sort((a, b) => a.day.localeCompare(b.day))[0]; const n = x ? daysTo(x.day, d.m.today) : null;
      return small(d.w, { label: x ? (x.kind === "exam" ? "Next exam" : "Next deadline") : "Deadlines", value: x ? `${n}<small> ${n === 1 ? "day" : "days"}</small>` : "–", sub: x ? esc(x.title) : "Tell Gradify your dates", href: "#/plan" }); } },
  { id: "s-gaps", name: "Knowledge gaps", icon: "alert", what: "Concepts that need work, from your answers.",
    render: (d) => small(d.w, { label: "Gaps", value: n0(d.m.preds.gaps.length), sub: d.m.preds.gaps[0] ? esc(d.m.preds.gaps[0].name) : "None in your answers", href: "#/revise/fix" }) },
  { id: "s-velocity", name: "Learning velocity", icon: "trend", what: "This week's right-rate against last week's.",
    render: (d) => { const v = d.m.preds.velocity; return small(d.w, { label: "Velocity", value: v.delta != null ? `${v.delta >= 0 ? "+" : "−"}${Math.abs(Math.round(v.delta * 100))}<small> pts</small>` : v.now != null ? pct(v.now) : "–", sub: v.delta != null ? `${pct(v.now)} right this week` : v.now != null ? `right · ${v.answers} answers` : "Two weeks of answers needed", href: "#/intel" }); } },
  { id: "s-kept", name: "Plan kept", tone: "teal", icon: "check", what: "Planned sessions done in the last two weeks.",
    render: (d) => { const a = d.m.preds.adherence; return small(d.w, { label: "Plan kept", value: a.value == null ? "–" : pct(a.value), sub: a.planned ? `${a.done} of ${a.planned} sessions` : "Plan a session to track it", href: "#/plan" }); } },
  { id: "s-goal", name: "Today's goal", tone: "sun", icon: "star", what: "XP towards today's goal.",
    render: (d) => { const G = d.G; const v = G ? Math.min(1, G.todayXp / (G.goal || 1)) : 0;
      return small(d.w, { label: "Today's goal", value: G ? `${G.todayXp}<small> / ${G.goal} XP</small>` : "–", sub: G?.goalMet ? "Met. Anything more is a bonus" : "Any lesson or review counts", href: "#/progress", extra: `<span class="wd-bar"><i style="width:${v * 100}%"></i></span>` }); } },
  { id: "s-fading", name: "Fading soon", icon: "clock", what: "Topics dropping below 70% recall in two days.",
    render: (d) => { const f = d.m.preds.forgetting.filter((x) => x.days <= 2); return small(d.w, { label: "Fading soon", value: n0(f.length), sub: f[0] ? esc(f[0].name) : "Nothing slipping", href: f[0] ? `#/study/t:${enc(f[0].key)}` : "#/knowledge" }); } },
  { id: "s-level", name: "Level", tone: "violet", icon: "award", what: "Your level and progress to the next.",
    render: (d) => { const into = d.xp - d.xpForLevel(d.lv), need = d.xpForLevel(d.lv + 1) - d.xpForLevel(d.lv);
      return small(d.w, { label: "Level", value: `${d.lv}`, sub: `${into} / ${need} XP to level ${d.lv + 1}`, href: "#/progress", extra: `<span class="wd-bar"><i style="width:${(into / need) * 100}%"></i></span>` }); } },
];

// ---------- wide: a list or a strip ----------
const shell = (w, body, { link = "", sub = "", cls = "" } = {}) => `<article class="wd wd-${w.size} ${w.tone ? `tone-${w.tone}` : ""} ${cls}" data-w="${w.id}"><header class="wd-h"><h3>${icon(w.icon)}${esc(w.name)}</h3>${link}</header>${sub ? `<p class="wd-intro">${sub}</p>` : ""}${body}</article>`;
const chip = (href, t) => `<a class="wd-link" href="${href}">${t} →</a>`;
const WIDE = [
  { id: "w-upcoming", name: "Your upcoming learning", icon: "clock", what: "The rest of today: what's planned, and what Gradify suggests.",
    render: (d) => { const m = d.m, nowMin = new Date().getHours() * 60 + new Date().getMinutes();
      const rows = [...m.blocks.filter((b) => b.day === m.today && b.end_min > nowMin && b.cal !== "allday").map((b) => ({ ...b, mine: true })), ...m.plan.blocks.map((b) => ({ ...b, suggested: true }))].sort((a, b) => a.start_min - b.start_min).slice(0, 6);
      return shell(d.w, rows.length ? `<ol class="wd-tl">${rows.map((b) => `<li class="${b.suggested ? "sug" : ""} ${b.kind === "break" ? "brk" : ""}"><time>${hhmm(b.start_min)}</time><b>${esc(b.title)}</b><em>${b.end_min - b.start_min} min${b.suggested ? " · suggested" : b.done ? " · done" : ""}</em></li>`).join("")}</ol>${m.plan.blocks.some((b) => b.kind !== "break" && b.kind !== "wrap") ? `<button type="button" class="cp-pill dark wd-act" data-accept-today>Add suggestions to today</button>` : ""}` : `<p class="wd-empty">Nothing left today. ${chip("#/plan/tomorrow", "Plan tomorrow")}</p>`, { link: chip("#/plan", "Smart Plan") }); } },
  { id: "w-answers", name: "Answers, day by day", icon: "trend", what: "How much you've revised each day this week.",
    render: (d) => { const days = Array.from({ length: 7 }, (_, k) => { const t = Date.now() - (6 - k) * DAY; return { k: dayKey(t), l: new Date(t).toLocaleDateString("en-GB", { weekday: "narrow" }), n: 0 }; }); const at = Object.fromEntries(days.map((x) => [x.k, x]));
      for (const r of d.m.reviews) { const x = at[dayKey(Date.parse(r.reviewed_at))]; if (x) x.n++; } const max = Math.max(1, ...days.map((x) => x.n));
      return shell(d.w, `<div class="wd-bars">${days.map((x, i) => `<span class="${i === 6 ? "on" : ""}"><i style="height:${Math.max(6, (x.n / max) * 100)}%"></i><b>${x.n || ""}</b><em>${i === 6 ? "Today" : x.l}</em></span>`).join("")}</div>`, { sub: `${n0(days.reduce((a, x) => a + x.n, 0))} answers this week` }); } },
  { id: "w-forecast", name: "Forgetting forecast", icon: "clock", what: "What will slip below 70% recall this week, and when.",
    render: (d) => { const f = d.m.preds.forgetting.slice(0, 5); return shell(d.w, f.length ? `<ul class="wd-list">${f.map((x) => `<li><a href="#/study/t:${enc(x.key)}"><b>${esc(x.name)}</b><span class="wd-meter"><i style="width:${Math.max(6, 100 - x.days * 14)}%"></i></span><em class="${x.days <= 1 ? "warn" : ""}">${x.days === 0 ? "now" : `in ${x.days}d`}</em></a></li>`).join("")}</ul>` : `<p class="wd-empty">Nothing is forecast to slip this week.</p>`); } },
  { id: "w-tell", name: "Tell Gradify", icon: "sparkles", what: "Exams, deadlines and plans in plain English, or a pasted email.",
    render: (d) => shell(d.w, `<div class="ap-tell-tabs" role="tablist"><button type="button" role="tab" aria-selected="true" data-tell-tab="tell">Tell</button><button type="button" role="tab" aria-selected="false" data-tell-tab="inbox">Paste an email</button></div>
      <form class="ap-tell-form" id="tell-form"><label class="sr-only" for="tell-q">Tell Gradify</label><textarea id="tell-q" rows="2" maxlength="4000" placeholder="e.g. Biology exam on 10 December, chemistry assignment due on the 4th, I'm away this weekend."></textarea><button class="cp-pill dark" type="submit">Organise</button></form><div id="tell-out" aria-live="polite"></div>`) },
  { id: "w-ask", name: "Ask Gradify", icon: "bulb", what: "Questions about your own learning, answered from your evidence.",
    render: (d) => shell(d.w, `<form class="widget-ask" data-ask-go><label class="sr-only" for="w-ask-q">Ask about your learning</label><input id="w-ask-q" placeholder="e.g. I've got 2 hours free" maxlength="140" autocomplete="off"><button class="cp-pill dark" type="submit">Ask</button></form><div class="i-chips">${QUESTIONS.slice(0, 4).map((q) => `<a class="i-chip" href="#/ai/${enc(q)}">${esc(q)}</a>`).join("")}</div>`) },
  { id: "w-opps", name: "Opportunities", icon: "bulb", what: "Free time, topics you're ready to move on from, gaps in how you practise.",
    render: (d) => { const o = opportunities(d.m); return shell(d.w, o.length ? `<ul class="ap-opps">${o.slice(0, 3).map((x) => `<li class="${x.tone}"><b>${esc(x.title)}</b><span>${esc(x.why)}</span><a href="${esc(x.href)}">${esc(x.cta)} →</a></li>`).join("")}</ul>` : `<p class="wd-empty">No openings right now. Gradify keeps watching.</p>`); } },
  { id: "w-debt", name: "Knowledge debt", tone: "ember", icon: "route", what: "Foundations under your weak topics: fix the root, not the symptom.",
    render: (d) => { const x = d.m.debts || []; return shell(d.w, x.length ? `<ul class="wd-debt">${x.slice(0, 2).map((y) => `<li><a href="${esc(y.href)}"><span><b>${esc(y.name)}</b><em>underpins ${esc(y.symptoms.slice(0, 2).map((s) => s.name).join(", "))}${y.symptoms.length > 2 ? ` +${y.symptoms.length - 2}` : ""}</em></span><span class="wd-go">${y.mins} min →</span></a></li>`).join("")}</ul>` : `<p class="wd-empty">No root causes: your weak spots don't rest on other weak topics.</p>`, { link: chip("#/knowledge", "My Knowledge") }); } },
  { id: "w-week", name: "Week ahead", icon: "calendar", what: "Each day's planned study against the time you have free.",
    render: (d) => { const m = d.m; const days = Array.from({ length: 7 }, (_, k) => { const day = dayKey(Date.now() + k * DAY); const planned = m.blocks.filter((b) => b.day === day && b.auto).reduce((a, b) => a + b.end_min - b.start_min, 0); const free = freeIntervals(day, { windows: windowsFor(day, m.intel), existing: m.blocks.filter((b) => b.day === day && !b.auto), now: Date.now() }).reduce((a, f) => a + f.to - f.from, 0); const away = m.blocks.some((b) => b.day === day && b.cal === "away"); return { day, planned, free, away }; });
      const max = Math.max(m.dailyMinutes, ...days.map((x) => x.planned));
      return shell(d.w, `<div class="wd-week">${days.map((x, i) => `<span class="${x.away ? "away" : ""}"><i class="cap" style="height:${Math.min(100, (m.dailyMinutes / max) * 100)}%"></i><i class="plan" style="height:${(x.planned / max) * 100}%"></i><b>${x.away ? "Away" : x.planned ? `${x.planned}m` : ""}</b><em>${i === 0 ? "Today" : dl(x.day, { weekday: "short" })}</em></span>`).join("")}</div>`, { sub: `Line: your ${m.dailyMinutes} min a day`, link: chip("#/plan", "Plan") }); } },
  { id: "w-courses", name: "Across Gradify", icon: "book", what: "Your courses on every Gradify site, and the next lesson in each.",
    render: (d) => { const cs = d.L?.courses || []; return shell(d.w, cs.length ? `<ul class="wd-list">${cs.slice(0, 4).map((c) => { const p = c.written ? Math.round((100 * c.done) / c.written) : 0; return `<li><a href="${esc(c.href && c.next ? `${c.href}#/lesson/${enc(c.next.id)}` : c.href || "#/learning")}"><b>${esc(c.name)}<small>${esc(c.site)}${c.timeMins ? ` · ${c.timeMins} min studied` : ""}${c.minutesPerLesson ? ` · ~${c.minutesPerLesson} min a lesson` : ""}</small></b><span class="wd-meter"><i style="width:${p}%"></i></span><em>${p}%</em></a></li>`; }).join("")}</ul>` : `<p class="wd-empty">No course started yet. ${chip("#/learning", "Find one")}</p>`); } },
  { id: "w-search", name: "Search your cards", icon: "sparkles", what: "Find any question or answer across every pack.",
    render: (d) => shell(d.w, `<form class="widget-ask" data-search><label class="sr-only" for="w-q">Search every flashcard</label><input id="w-q" type="search" placeholder="e.g. cardiac output" autocomplete="off" maxlength="120"><button class="cp-pill dark" type="submit">Find</button></form><ul class="widget-list" data-results aria-live="polite"></ul>`) },
];

// ---------- big: a picture of something ----------
const LV = [["mastered", "#1fae8c"], ["strong", "#f055dd"], ["learning", "#4641ff"], ["fading", "#ffc002"], ["shaky", "#ff5a4d"], ["new", "#5c5c66"]];
const BIG = [
  { id: "b-hero", name: "Cards learned", icon: "layers", what: "Your headline: cards learned, this week's answers and quick actions.", raw: true,
    render: (d) => `<div class="wd wd-b wd-raw" data-w="b-hero">${heroCard({ s: d.s, reviews: d.m.reviews })}</div>` },
  { id: "b-packs", name: "Your study packs", icon: "layers", what: "Every pack as a card you can shuffle through.", raw: true,
    render: (d) => `<div class="wd wd-b wd-raw" data-w="b-packs">${deckCard({ s: d.s, docs: d.m.docs })}</div>` },
  { id: "b-concepts", name: "Your concepts", icon: "brain", what: "Each concept as a card: mastery, certainty and its stage.",
    render: (d) => shell(d.w, d.m.concepts.length ? `<div class="pile pile-sm" data-cpile></div><div class="pile-controls"><button type="button" class="cp-pill" data-cshuffle ${d.m.concepts.length < 2 ? "disabled" : ""}>↻ Shuffle</button><span class="small muted" data-cnote></span></div>` : `<p class="wd-empty">Each concept you study becomes a card here.</p>`, { link: chip("#/knowledge", "All") }) },
  { id: "b-levels", name: "Topics by level", icon: "trend", what: "How well you know each topic, at a glance.",
    render: (d) => { const rows = LV.map(([lv, c]) => ({ lv, c, n: d.m.concepts.filter((x) => x.level === lv).length })).filter((r) => r.n); const total = rows.reduce((a, r) => a + r.n, 0); const R = 54, C = 2 * Math.PI * R; let at = 0;
      return shell(d.w, total ? `<div class="wd-donut"><svg viewBox="0 0 140 140" width="140" height="140" role="img" aria-label="${rows.map((r) => `${LEVELS[r.lv].label}: ${r.n}`).join(", ")}"><circle cx="70" cy="70" r="${R}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="14"/>${rows.map((r) => { const len = (C * r.n) / total; const el = `<circle cx="70" cy="70" r="${R}" fill="none" stroke="${r.c}" stroke-width="14" stroke-dasharray="${Math.max(0.1, len - (rows.length > 1 ? 4 : 0))} ${C}" stroke-dashoffset="${-at}" transform="rotate(-90 70 70)" stroke-linecap="round"/>`; at += len; return el; }).join("")}<text x="70" y="66" text-anchor="middle" class="split-small">topics</text><text x="70" y="88" text-anchor="middle" class="split-big">${total}</text></svg>
        <ul>${rows.map((r) => `<li><i style="background:${r.c}"></i><span>${esc(LEVELS[r.lv].label)}</span><b>${r.n}</b></li>`).join("")}</ul></div>` : `<p class="wd-empty">Topics appear here once you've answered some cards.</p>`, { link: chip("#/progress", "Details") }); } },
  { id: "b-exam", name: "Exam countdown", tone: "violet", icon: "flame", what: "Days left, readiness, and the daily time you need.",
    render: (d) => { const m = d.m, req = m.preds.requirement, r = m.preds.readiness, ex = m.deadlines.filter((x) => x.kind === "exam").sort((a, b) => a.day.localeCompare(b.day))[0];
      if (!ex) return shell(d.w, `<p class="wd-empty">No exam date yet. ${chip("#/plan", "Tell Gradify")}</p>`);
      const n = daysTo(ex.day, m.today);
      return shell(d.w, `<div class="wd-exam"><div class="wd-exam-n"><b>${n}</b><span>${n === 1 ? "day" : "days"} to<br>${esc(ex.title)}</span></div>
        <div class="wd-exam-r">${ring(r.value, 96)}<span><b>${pct(r.value)}</b> ready<br><em>likely ${pct(r.low)}–${pct(r.high)}</em></span></div></div>
        <p class="wd-exam-need ${req.status}">${req.perDay != null ? (req.status === "on-track" ? `On track: about ${req.perDay} min a day reaches ${pct(req.target)}, within your ${m.dailyMinutes}.` : `About ${req.perDay} min a day needed to reach ${pct(req.target)}. You have ${m.dailyMinutes}.`) : "Answer more cards for a pace."}</p>
        ${m.preds.gaps.length ? `<p class="wd-sub2">Biggest gaps: ${esc(m.preds.gaps.slice(0, 3).map((c) => c.name).join(", "))}</p>` : ""}`, { link: chip("#/intel", "Readiness") }); } },
  { id: "b-workload", name: "Revision workload", icon: "calendar", what: "Minutes of revision falling due each day for the next two weeks.",
    render: (d) => { const days = Array.from({ length: 14 }, (_, k) => ({ day: dayKey(Date.now() + k * DAY), n: 0 }));
      for (const c of d.m.cards) { if (c.suspended || !c.reps) continue; const k = Math.max(0, daysTo(dayKey(Date.parse(c.due_at)), d.m.today)); if (k < 14) days[k].n++; }
      const mins = days.map((x) => Math.ceil((x.n * 25) / 60)); const max = Math.max(d.m.dailyMinutes, ...mins); const total = mins.reduce((a, b) => a + b, 0);
      return shell(d.w, `<div class="wd-load">${days.map((x, i) => `<span class="${mins[i] > d.m.dailyMinutes ? "over" : ""}"><i style="height:${Math.max(3, (mins[i] / max) * 100)}%"></i><em>${i === 0 ? "T" : new Date(`${x.day}T12:00:00`).toLocaleDateString("en-GB", { weekday: "narrow" })}</em></span>`).join("")}<b class="cap" style="bottom:calc(${(d.m.dailyMinutes / max) * 100}% * .82 + 18px)"></b></div>`, { sub: `About ${total} min over two weeks${mins[0] ? `, ${mins[0]} today` : ""}. Line: your ${d.m.dailyMinutes} min a day.` }); } },
  { id: "b-knowledge", name: "Knowledge map", icon: "brain", what: "How many concepts are seen, understood, retained and applied.",
    render: (d) => { const st = [["new", "Not started"], ["seen", "Seen"], ["understood", "Understood"], ["retained", "Retained"], ["applied", "Applied"]];
      return shell(d.w, d.m.concepts.length ? `<div class="wd-funnel">${st.map(([k, l], i) => `<span class="s${i}"><b>${d.m.concepts.filter((c) => c.stage === k).length}</b><em>${l}</em></span>`).join("")}</div><p class="wd-sub2">Concepts move up only on evidence: right answers, kept over time, used on new problems.</p>` : `<p class="wd-empty">Your concepts appear here as you study.</p>`, { link: chip("#/knowledge", "My Knowledge") }); } },
  { id: "b-heat", name: "Last 16 weeks", icon: "calendar", what: "Every day you studied, across Gradify.",
    render: (d) => shell(d.w, d.heat, { link: chip("#/progress", "Progress"), sub: `Best streak ${d.s.longest || 0} days` }) },
  { id: "b-coming", name: "Coming up", icon: "calendar", what: "Exams, deadlines and calendar events in the next two weeks.",
    render: (d) => { const m = d.m, end = dayKey(Date.now() + 14 * DAY);
      const items = m.blocks.filter((b) => b.day >= m.today && b.day <= end && ["exam", "deadline", "ext-exam", "ext-deadline", "away"].includes(b.cal)).sort((a, b) => a.day.localeCompare(b.day)).slice(0, 6);
      return shell(d.w, items.length ? `<ul class="wd-coming">${items.map((b) => `<li class="${b.cal.replace("ext-", "")}"><time><b>${new Date(`${b.day}T12:00:00`).getDate()}</b>${dl(b.day, { month: "short" })}</time><span><b>${esc(b.title)}</b><em>${b.cal === "away" ? "Away" : b.cal.includes("exam") ? "Exam" : "Deadline"} · ${daysTo(b.day, m.today) === 0 ? "today" : `in ${daysTo(b.day, m.today)} days`}</em></span></li>`).join("")}</ul>` : `<p class="wd-empty">Nothing in the next two weeks. ${chip("#/plan", "Add dates")}</p>`, { link: chip("#/plan", "Calendar") }); } },
  { id: "b-learned", name: "How you study", icon: "brain", what: "What Gradify has learned from your plans: best session length and time.",
    render: (d) => { const c = d.m.cal; return shell(d.w, `${c.notes.length ? `<ul class="learned-notes">${c.notes.slice(0, 2).map((x) => `<li>${icon("check")}${esc(x)}</li>`).join("")}</ul>` : `<p class="wd-empty">Still watching: complete or skip a few planned sessions and Gradify learns what works for you.</p>`}
      <ul class="i-why-list">${c.byLength.map((b) => `<li><span>${esc(b.label)}</span><span class="i-why-bar"><i style="width:${b.rate == null ? 0 : Math.round(b.rate * 100)}%"></i></span></li>`).join("")}</ul>`, { link: chip("#/intel", "More") }); } },
];

export const WIDGETS = [...SMALL.map((w) => ({ ...w, size: "s" })), ...WIDE.map((w) => ({ ...w, size: "w" })), ...BIG.map((w) => ({ ...w, size: "b" }))];
export const DEFAULT_WIDGETS = ["s-ready", "s-due", "s-streak", "s-deadline", "s-gaps", "s-velocity", "w-upcoming", "w-tell", "w-debt", "w-forecast", "b-hero", "b-packs", "b-exam", "b-workload"];

/** The board: chosen widgets, grouped by size so each row's boxes fit what's inside them. */
export function boardHtml(d, chosen = DEFAULT_WIDGETS) {
  const pick = (size) => chosen.map((id) => WIDGETS.find((w) => w.id === id)).filter((w) => w && w.size === size);
  const draw = (w) => { try { return w.render({ ...d, w }); } catch (e) { console.warn("widget", w.id, e); return ""; } };
  const s = pick("s"), wd = pick("w"), b = pick("b");
  return `<section class="board" aria-label="Your widgets">
    ${s.length ? `<div class="board-s">${s.map(draw).join("")}</div>` : ""}
    ${wd.length ? `<div class="board-w">${wd.map(draw).join("")}</div>` : ""}
    ${b.length ? `<div class="board-b">${b.map(draw).join("")}</div>` : ""}
    <details class="board-edit"><summary>${icon("cog")} Customise your widgets</summary>
      <form id="widget-form">${[["s", "Small"], ["w", "Wide"], ["b", "Big"]].map(([k, l]) => `<fieldset><legend>${l}</legend><div class="gallery">${WIDGETS.filter((w) => w.size === k).map((w) => `<label class="gal ${w.tone ? `tone-${w.tone}` : ""}"><input type="checkbox" name="w" value="${w.id}" ${chosen.includes(w.id) ? "checked" : ""}><span><b>${icon(w.icon)}${esc(w.name)}</b><em>${esc(w.what)}</em></span></label>`).join("")}</div></fieldset>`).join("")}
        <div class="row-actions"><button class="cp-pill dark" type="submit">Save my board</button><button class="cp-pill" type="button" data-w-reset>Use the default</button></div></form></details>
  </section>`;
}
export function wireBoard(view, ctx) {
  const form = view.querySelector("#widget-form");
  form?.addEventListener("submit", async (e) => { e.preventDefault(); const ids = new FormData(form).getAll("w"); await ctx.saveIntel({ widgets: ids }); ctx.complete("Board saved", { sub: `${ids.length} widgets` }); ctx.rerender(); });
  view.querySelector("[data-w-reset]")?.addEventListener("click", async () => { await ctx.saveIntel({ widgets: null }); ctx.rerender(); });
}
