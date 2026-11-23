// Planners, timers and calculators for getgradify.com/tools/ (pages written by scripts/seo/tools.mjs). Pure functions
// first (tested in tests/seo-tools.test.mjs), then the code that runs each tool on its page. Everything stays in the
// browser.
import { fmt, esc, longDay, download, save, load, formTool, setNext, NOTES, ics, rowsTool, val } from "./study-tools.js";
import { studied } from "./memory.js";

const DAY = 864e5;
const at0 = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
const daysBetween = (a, b) => Math.round((at0(b) - at0(a)) / DAY);
const addDays = (d, n) => new Date(at0(d).getTime() + n * DAY);
const hm = (mins) => (mins >= 60 ? `${Math.floor(mins / 60)} h${mins % 60 ? ` ${Math.round(mins % 60)} min` : ""}` : `${Math.round(mins)} min`);

// ---------- cram planner: hours left and topics → a triage plan ----------
export function cramPlan(hoursLeft, topicNames, sleepHours = 8) {
  const days = Math.max(1, Math.ceil(hoursLeft / 24));
  const awake = Math.max(0, hoursLeft - days * sleepHours), study = Math.max(1, Math.round(awake * 0.6 * 10) / 10);
  const n = Math.max(1, topicNames.length);
  const blocks = [["High-yield core concepts", 0.4, "the topics that come up most: definitions, key processes, the formulas you must know"], ["Past-paper gaps", 0.3, "timed questions from past papers, then fix every mark you dropped"], ["Rapid active recall", 0.2, "flashcards and blank-page recall of every topic, weakest first"], ["Final light review", 0.1, "only cards you got wrong, then stop and sleep"]];
  return { study, perTopic: (study * 60 * 0.4) / n, blocks: blocks.map(([name, share, what]) => ({ name, hours: Math.round(study * share * 10) / 10, what })), sleep: days * sleepHours };
}

// ---------- deadline planner: work back from a submission date with a 48-hour buffer ----------
export function deadlinePlan(deadline, hours, daysPerWeek = 5, from = new Date()) {
  const end = addDays(deadline, -2), span = Math.max(1, daysBetween(from, end));
  const workDays = Math.max(1, Math.round(span * Math.min(7, Math.max(1, daysPerWeek)) / 7));
  const stages = [["Research and plan", 0.2], ["First draft", 0.45], ["Revise and strengthen", 0.25], ["Final read-through", 0.1]];
  let cursor = 0;
  const milestones = stages.map(([name, share]) => { cursor += share; return { name, hours: Math.round(hours * share * 10) / 10, by: addDays(from, Math.max(1, Math.round(span * cursor))) }; });
  milestones.push({ name: "Buffer: formatting, proof-reading, references and submission", hours: 0, by: at0(deadline) });
  return { span, workDays, perDay: Math.round((hours / workDays) * 10) / 10, milestones, tight: span < 3 };
}

// ---------- exam timetable: several exams → a day-by-day revision order ----------
/** exams: [{ name, date: Date, weight 1–5, difficulty 1–5 }]. Each day goes to the exam with the most need per day left. */
export function timetable(exams, from = new Date(), maxDays = 42) {
  const list = exams.filter((e) => e.name && e.date && daysBetween(from, e.date) > 0).map((e) => ({ ...e, need: (e.weight || 3) * (e.difficulty || 3), got: 0 }));
  if (!list.length) return { days: [], order: [] };
  const last = Math.min(maxDays, Math.max(...list.map((e) => daysBetween(from, e.date))));
  const days = [];
  for (let i = 0; i < last; i++) {
    const day = addDays(from, i), open = list.filter((e) => daysBetween(day, e.date) > 0);
    if (!open.length) break;
    const pick = open.reduce((a, b) => ((b.need - b.got) / daysBetween(day, b.date) > (a.need - a.got) / daysBetween(day, a.date) ? b : a));
    pick.got += 1; days.push({ day, exam: pick.name });
  }
  const order = [...new Map(days.map((d) => [d.exam, d.day])).entries()].map(([name, first]) => ({ name, first, days: days.filter((d) => d.exam === name).length }));
  return { days, order };
}

// ---------- study hours ----------
export const CONF_FACTOR = { 1: 2.2, 2: 1.8, 3: 1.4, 4: 1.1, 5: 0.8 };
export function studyHours(lectureHours, weeks, confidence = 3) {
  const total = Math.round(lectureHours * (CONF_FACTOR[confidence] || 1.4));
  return { total, weekly: Math.round((total / Math.max(1, weeks)) * 10) / 10 };
}

// ---------- reading time ----------
export const DENSITY = { light: { words: 300, wpm: 250, label: "light reading or a novel" }, textbook: { words: 450, wpm: 200, label: "a textbook" }, paper: { words: 550, wpm: 130, label: "a dense academic paper" } };
export function readingTime({ pages = 0, words = 0, density = "textbook" }) {
  const d = DENSITY[density] || DENSITY.textbook, w = words || pages * d.words;
  const read = w / d.wpm, notes = read * 0.5;
  return { words: w, read, notes, reviews: 3 * 10, total: read + notes + 30 };
}

// ---------- topic prioritiser ----------
export function prioritise(rows) {
  const t = rows.filter((r) => r.topic).map((r) => ({ topic: r.topic, weight: Number(r.weight) || 3, conf: Number(r.conf) || 3 })).map((r) => ({ ...r, score: r.weight * (6 - r.conf) }));
  t.sort((a, b) => b.score - a.score);
  return {
    first: t.filter((r) => r.weight >= 4 && r.conf <= 3),
    next: t.filter((r) => !(r.weight >= 4 && r.conf <= 3) && r.conf <= 3),
    later: t.filter((r) => r.conf >= 4),
  };
}

// ---------- module grade: coursework done, what the exam needs ----------
export function moduleNeed(parts, target) {
  const done = parts.filter((p) => p.mark !== "" && Number(p.weight) > 0).map((p) => ({ mark: Number(p.mark), weight: Number(p.weight) }));
  const w = done.reduce((s, p) => s + p.weight, 0), banked = done.reduce((s, p) => s + (p.mark * p.weight) / 100, 0);
  const left = 100 - w;
  if (left <= 0) return { banked, left: 0, need: null, final: banked };
  return { banked, left, need: ((target - banked) / left) * 100, safe: ((target + 3 - banked) / left) * 100 };
}

// ---------- grade boundaries ----------
/** boundaries: [{ grade, mark }] in any order → the grade for a raw mark, and the marks to the next one */
export function gradeFor(raw, boundaries) {
  const b = boundaries.filter((x) => x.grade && x.mark !== "" && !isNaN(x.mark)).map((x) => ({ grade: x.grade, mark: Number(x.mark) })).sort((a, z) => z.mark - a.mark);
  const i = b.findIndex((x) => raw >= x.mark);
  const got = i === -1 ? null : b[i], next = i === -1 ? b[b.length - 1] : i > 0 ? b[i - 1] : null;
  return { grade: got?.grade || "below the lowest boundary", next: next?.grade || null, toNext: next ? next.mark - raw : 0 };
}

// ---------- units ----------
export const UNITS = {
  mass: { kg: 1e3, g: 1, mg: 1e-3, "µg": 1e-6, ng: 1e-9 },
  volume: { "m³": 1e3, "dm³ (L)": 1, "cm³ (mL)": 1e-3, "µL": 1e-6 },
  amount: { mol: 1, mmol: 1e-3, "µmol": 1e-6, nmol: 1e-9 },
  concentration: { "mol dm⁻³ (M)": 1, "mmol dm⁻³ (mM)": 1e-3, "µmol dm⁻³ (µM)": 1e-6, "nmol dm⁻³ (nM)": 1e-9 },
  energy: { MJ: 1e6, kJ: 1e3, J: 1, kcal: 4184, cal: 4.184 },
  pressure: { atm: 101325, bar: 1e5, kPa: 1e3, Pa: 1, mmHg: 133.322 },
  length: { km: 1e3, m: 1, cm: 1e-2, mm: 1e-3, "µm": 1e-6, nm: 1e-9 },
  time: { day: 86400, h: 3600, min: 60, s: 1, ms: 1e-3 },
};
export function convert(value, kind, from, to) { const u = UNITS[kind]; if (!u || !(from in u) || !(to in u)) return null; const factor = u[from] / u[to]; return { value: value * factor, factor }; }

// ---------- dissertation word splitter ----------
export const SPLITS = {
  empirical: [["Abstract", 0.03], ["Introduction", 0.1], ["Literature review", 0.25], ["Methodology", 0.15], ["Results", 0.2], ["Discussion", 0.2], ["Conclusion", 0.07]],
  humanities: [["Abstract", 0.02], ["Introduction", 0.1], ["Chapter 1", 0.25], ["Chapter 2", 0.25], ["Chapter 3", 0.25], ["Conclusion", 0.13]],
  review: [["Abstract", 0.03], ["Introduction", 0.12], ["Methods of the review", 0.15], ["Themes and findings", 0.45], ["Discussion", 0.17], ["Conclusion", 0.08]],
};
export function splitWords(total, type = "empirical", deadline = null, daysPerWeek = 5, from = new Date()) {
  const parts = (SPLITS[type] || SPLITS.empirical).map(([name, share]) => ({ name, words: Math.round((total * share) / 50) * 50 }));
  const days = deadline ? Math.max(1, Math.round(daysBetween(from, addDays(deadline, -7)) * daysPerWeek / 7)) : null;
  return { parts, days, perDay: days ? Math.ceil(total / days / 50) * 50 : null };
}

// ---------- compound interest and fund fees ----------
export function growth({ start = 0, monthly = 0, years = 10, rate = 5, fee = 0 }) {
  const run = (r) => { let v = start; for (let m = 0; m < years * 12; m++) v = v * (1 + r / 1200) + monthly; return v; };
  const gross = run(rate), net = run(rate - fee), paid = start + monthly * years * 12;
  return { paid, gross, net, drag: gross - net };
}

// ---------- winter break ----------
/** a day-by-day plan from the end of term to the exam: rest days first, light reviews, then focused blocks */
export function winterPlan(start, exam, restDays = 4) {
  const n = daysBetween(start, exam); if (n <= 0) return [];
  return Array.from({ length: n }, (_, i) => {
    const day = addDays(start, i), left = n - i;
    const kind = i < Math.min(restDays, Math.floor(n / 3)) ? "rest" : left <= Math.max(3, Math.round(n * 0.4)) ? "focus" : "light";
    return { day, kind };
  });
}

// ---------- mistake log ----------
export const REASONS = { misread: "Misread the question", forgot: "Forgot a fact or formula", concept: "Didn't understand the idea", rushed: "Rushed or ran out of time", guessed: "Guessed" };
export function mistakeBreakdown(entries) {
  const n = entries.length, by = {};
  for (const e of entries) by[e.reason] = (by[e.reason] || 0) + 1;
  return Object.entries(by).map(([reason, c]) => ({ reason, count: c, share: Math.round((c / n) * 100) })).sort((a, b) => b.count - a.count);
}

// ---------- timers: the shared clock of a focus room ----------
/** pure: where a room is in its cycle (focus then break, aligned to UTC midnight), so everyone sees the same timer */
export function roomPhase(now = Date.now(), focus = 50, rest = 10) {
  const cycle = (focus + rest) * 60e3, into = now % cycle;
  return into < focus * 60e3 ? { phase: "focus", left: focus * 60e3 - into } : { phase: "break", left: cycle - into };
}
const clock = (ms) => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };

// ---------- noise for the study timer (Web Audio, nothing downloaded) ----------
let audio = null;
function noise(kind) {
  if (audio) { audio.ctx.close(); audio = null; }
  if (kind === "off") return;
  const ctx = new (window.AudioContext || window.webkitAudioContext)(), len = 2 * ctx.sampleRate, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; if (kind === "brown") { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w * (kind === "rain" ? 0.35 : 0.2); }
  const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
  const gain = ctx.createGain(); gain.gain.value = kind === "white" ? 0.08 : 0.5;
  let out = src;
  if (kind === "rain") { const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 1200; f.Q.value = 0.6; src.connect(f); out = f; }
  out.connect(gain).connect(ctx.destination); src.start();
  audio = { ctx };
}
function chime() { try { const c = new (window.AudioContext || window.webkitAudioContext)(), o = c.createOscillator(), g = c.createGain(); o.frequency.value = 660; g.gain.setValueAtTime(0.2, c.currentTime); g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 1.2); o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime + 1.2); } catch { /* no audio */ } }
export const BREAK_IDEAS = ["Stand up and stretch", "Refill your water", "Step outside for fresh air", "Look at something far away for 20 seconds", "Review 3 flashcards", "Tidy your desk"];

// ---------- on the page ----------
const out = (root) => root.querySelector(".result");
const TOOLS = {
  cram(root) {
    formTool(root, "cram", (f) => {
      const topics = String(f.topics || "").split(/\n|,/).map((t) => t.trim()).filter(Boolean);
      const p = cramPlan(Number(f.hours) || 48, topics.length ? topics : Array(Number(f.count) || 6).fill(""), Number(f.sleep) || 8);
      out(root).innerHTML = `<span class="big">${fmt(p.study)} study hours</span>after ${p.sleep} hours of sleep and breaks. Spend them like this:<ol>${p.blocks.map((b) => `<li><b>${b.name}: ${fmt(b.hours)} h.</b> ${b.what}.</li>`).join("")}</ol>${topics.length ? `About ${hm(p.perTopic)} of core time per topic, in this order: ${topics.map(esc).join(" → ")}.` : `About ${hm(p.perTopic)} of core time per topic.`} Sleep is not optional: memories are consolidated overnight.`;
      setNext(root, `${NOTES}, then <a href="/guides/how-to-revise-in-two-weeks/">read the triage method</a>.`);
    });
  },
  deadline(root) {
    let plan = null;
    if (!root.querySelector("[name=due]").value) root.querySelector("[name=due]").value = addDays(new Date(), 21).toISOString().slice(0, 10);
    formTool(root, "deadline", (f) => {
      plan = deadlinePlan(new Date(`${f.due}T00:00`), Number(f.hours) || 20, Number(f.days) || 5);
      out(root).innerHTML = `<span class="big">${fmt(plan.perDay)} h a working day</span>over ${plan.workDays} working days, finishing two days early.${plan.tight ? " <b>That's tight:</b> cut the research stage and draft today." : ""}<ol>${plan.milestones.map((m) => `<li><b>${esc(m.name)}</b>${m.hours ? ` (${fmt(m.hours)} h)` : ""}: done by ${longDay(m.by)}</li>`).join("")}</ol>`;
      setNext(root, `<a href="/checklists/proofreading/">use the proofreading checklist</a> in your buffer, and <a href="/tools/citation-helper/">format your references</a>.`);
    });
    root.querySelector("[data-ics]").addEventListener("click", () => download("gradify-deadline.ics", icsEvents(plan.milestones.map((m) => ({ date: m.by, title: m.name }))), "text/calendar"));
  },
  timetable(root) {
    const row = () => `<div class="row"><div><label>Exam</label><input name="name" maxlength="40"></div><div><label>Date</label><input name="date" type="date"></div><div><label>Weight 1–5</label><input name="weight" type="number" min="1" max="5" value="3"></div><div><label>Difficulty 1–5</label><input name="difficulty" type="number" min="1" max="5" value="3"></div><button type="button" class="icon" data-del aria-label="Remove this exam">✕</button></div>`;
    rowsTool(root, "timetable", row, val, (rows) => {
      const t = timetable(rows.map((r) => ({ ...r, date: r.date ? new Date(`${r.date}T00:00`) : null, weight: Number(r.weight), difficulty: Number(r.difficulty) })));
      if (!t.days.length) { out(root).textContent = "Add at least one exam with a future date."; return; }
      out(root).innerHTML = `<b>Start with:</b> ${t.order.map((o) => `${esc(o.name)} (${o.days} day${o.days === 1 ? "" : "s"})`).join(" → ")}<ol class="days">${t.days.map((d) => `<li>${longDay(d.day)}: <b>${esc(d.exam)}</b></li>`).join("")}</ol>Each day goes to the exam with the most revision still needed per day left, so a heavy, close exam gets time first. Keep 15 minutes of flashcards for the others every day.`;
      setNext(root, `<a href="/study-plan/">match each exam to a week-by-week study plan</a>.`);
    });
  },
  hours(root) {
    formTool(root, "hours", (f) => {
      const h = studyHours(Number(f.lectures) || 0, Number(f.weeks) || 1, Number(f.conf) || 3);
      out(root).innerHTML = `<span class="big">${h.total} hours</span>of revision, about <b>${fmt(h.weekly)} hours a week</b> for ${f.weeks} weeks. That's roughly ${fmt(CONF_FACTOR[f.conf] || 1.4)} hours of revision per lecture hour at your confidence level. Start with your lowest-confidence unit.`;
      setNext(root, `<a href="/tools/topic-prioritiser/">rank your topics</a>, then ${NOTES}.`);
    });
  },
  reading(root) {
    formTool(root, "reading", (f) => {
      const words = String(f.text || "").trim() ? f.text.trim().split(/\s+/).length : 0;
      const r = readingTime({ pages: Number(f.pages) || 0, words, density: f.density });
      out(root).innerHTML = `<span class="big">${hm(r.read)}</span>to read ${r.words.toLocaleString("en-GB")} words of ${DENSITY[f.density].label}. Add ${hm(r.notes)} for active notes and three 10-minute reviews: <b>${hm(r.total)} in all</b>.`;
      setNext(root, r.total > 120 ? `<a href="/pdf-to-flashcards/">compress the PDF into a study pack</a> once you've read it.` : `<a href="/notes-to-cheat-sheet/">condense it into a one-page sheet</a>.`);
    });
  },
  prioritise(root) {
    const row = () => `<div class="row"><div><label>Topic</label><input name="topic" maxlength="60"></div><div><label>Exam weight 1–5</label><input name="weight" type="number" min="1" max="5" value="3"></div><div><label>Confidence 1–5</label><input name="conf" type="number" min="1" max="5" value="3"></div><button type="button" class="icon" data-del aria-label="Remove this topic">✕</button></div>`;
    rowsTool(root, "prioritise", row, val, (rows) => {
      const p = prioritise(rows), li = (l) => (l.length ? `<ul>${l.map((r) => `<li>${esc(r.topic)}</li>`).join("")}</ul>` : "<p>None.</p>");
      out(root).innerHTML = `<h3>1. Urgent, high-yield: start here</h3>${li(p.first)}<h3>2. Build confidence next</h3>${li(p.next)}<h3>3. Quick polish later</h3>${li(p.later)}`;
      setNext(root, p.first.length ? `<a href="/tools/cram-planner/">plan the hours for "${esc(p.first[0].topic)}" and the rest</a>.` : "");
    });
  },
  module(root) {
    const row = () => `<div class="row two"><div><label>Mark %</label><input name="mark" type="number" min="0" max="100" step="0.1"></div><div><label>Weight %</label><input name="weight" type="number" min="0" max="100"></div><button type="button" class="icon" data-del aria-label="Remove this assessment">✕</button></div>`;
    {
      const go = (rows) => {
        const t = Number(root.querySelector("[name=target]").value), m = moduleNeed(rows, t);
        if (m.need === null) { out(root).innerHTML = `<span class="big">${fmt(m.final)}%</span>is your module mark: every assessment is in.`; return; }
        out(root).innerHTML = m.need <= 0 ? `<span class="big">0%</span>You've already banked ${fmt(m.banked)} marks: ${t}% is safe.` : `<span class="big">${fmt(m.need)}%</span>on the remaining ${fmt(m.left, 0)}% (your exam) gets you ${t}%. Aim for <b>${fmt(Math.min(100, m.safe))}%</b> to be safe.${m.need > 100 ? " That's over 100%, so this target isn't reachable." : ""}`;
        setNext(root, m.need > 75 ? `<a href="/tools/cram-planner/">plan the hours</a> and ${NOTES}.` : `<a href="/tools/exam-countdown/">count down to the exam</a>.`);
      };
      rowsTool(root, "module", row, val, go);
      root.querySelector("[name=target]").addEventListener("change", () => root.dispatchEvent(new Event("input")));
    }
  },
  boundaries(root) {
    formTool(root, "boundaries", (f) => {
      const b = String(f.table || "").split("\n").map((l) => l.split(/[:=,\t]/)).filter((p) => p.length >= 2).map(([grade, mark]) => ({ grade: grade.trim(), mark: mark.trim() }));
      const raw = Number(f.raw), max = Number(f.max) || 0, g = gradeFor(raw, b);
      out(root).innerHTML = `<span class="big">${esc(g.grade)}</span>${max ? `${raw} out of ${max} is ${fmt((raw / max) * 100)}%. ` : ""}${g.next ? `You're <b>${g.toNext} mark${g.toNext === 1 ? "" : "s"}</b> off ${esc(g.next)}.` : "That's the top grade."}`;
      setNext(root, g.next ? `${g.toNext} marks is one or two questions: <a href="/tools/mistake-log/">log the ones you dropped</a> and ${NOTES}.` : "");
    });
  },
  units(root) {
    const kind = root.querySelector("[name=kind]"), from = root.querySelector("[name=from]"), to = root.querySelector("[name=to]");
    const fill = () => { const u = Object.keys(UNITS[kind.value]); const opt = u.map((x) => `<option>${x}</option>`).join(""); const f = from.value, t = to.value; from.innerHTML = opt; to.innerHTML = opt; from.value = u.includes(f) ? f : u[0]; to.value = u.includes(t) ? t : u[1]; };
    kind.addEventListener("change", fill); fill();
    formTool(root, "units", (f) => {
      const c = convert(Number(f.value), f.kind, f.from, f.to);
      if (!c) { out(root).textContent = "Choose two units."; return; }
      out(root).innerHTML = `<span class="big">${Number(c.value.toPrecision(6)).toLocaleString("en-GB", { maximumSignificantDigits: 6 })} ${esc(f.to)}</span>Multiply by ${c.factor >= 1e-3 && c.factor < 1e6 ? Number(c.factor.toPrecision(6)).toLocaleString("en-GB", { maximumSignificantDigits: 6 }) : c.factor.toExponential(3)} to go from ${esc(f.from)} to ${esc(f.to)}. Sanity check: converting to a <b>smaller</b> unit gives a <b>bigger</b> number.`;
    });
  },
  split(root) {
    formTool(root, "split", (f) => {
      const s = splitWords(Number(f.words) || 10000, f.type, f.due ? new Date(`${f.due}T00:00`) : null, Number(f.days) || 5);
      out(root).innerHTML = `<table><tbody>${s.parts.map((p) => `<tr><th>${esc(p.name)}</th><td>${p.words.toLocaleString("en-GB")} words</td></tr>`).join("")}</tbody></table>${s.perDay ? `Write about <b>${s.perDay.toLocaleString("en-GB")} words a writing day</b> to finish a week early for editing.` : ""} Check your handbook: some departments set their own split.`;
      setNext(root, `<a href="/tools/lit-review-helper/">structure the literature review</a> and <a href="/tools/citation-helper/">format references</a>.`);
    });
  },
  growth(root) {
    formTool(root, "growth", (f) => {
      const g = growth({ start: Number(f.start), monthly: Number(f.monthly), years: Number(f.years), rate: Number(f.rate), fee: Number(f.fee) });
      const gbp = (v) => v.toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
      out(root).innerHTML = `<span class="big">${gbp(g.net)}</span>after ${f.years} years, from ${gbp(g.paid)} paid in. Without the ${f.fee}% yearly fee it would be ${gbp(g.gross)}: <b>fees cost ${gbp(g.drag)}</b>. Returns aren't guaranteed; this assumes a steady ${f.rate}% a year, which real markets never give.`;
      setNext(root, `learn what drives those numbers in <a href="/investorgradify/">InvestorGradify's free lessons on funds, ETFs and valuation</a>.`);
    });
  },
  winter(root) {
    const q = (n) => root.querySelector(`[name=${n}]`);
    if (!q("start").value) q("start").value = new Date().toISOString().slice(0, 10);
    if (!q("exam").value) q("exam").value = addDays(new Date(), 35).toISOString().slice(0, 10);
    formTool(root, "winter", (f) => {
      const p = winterPlan(new Date(`${f.start}T00:00`), new Date(`${f.exam}T00:00`), Number(f.rest) || 4);
      if (!p.length) { out(root).textContent = "Choose an exam date after the start date."; return; }
      const label = { rest: "Rest and reset (no revision)", light: "Light: 20 minutes of flashcards", focus: "Focus: two 50-minute blocks + past questions" };
      out(root).innerHTML = `<p>${p.filter((d) => d.kind === "rest").length} rest days, ${p.filter((d) => d.kind === "light").length} light days, ${p.filter((d) => d.kind === "focus").length} focus days.</p><ol class="days">${p.map((d) => `<li>${longDay(d.day)}: <b>${label[d.kind]}</b></li>`).join("")}</ol>`;
      setNext(root, `<a href="/tools/exam-timetable-planner/">split the focus days between several exams</a>.`);
    });
  },
  timer(root) {
    const show = root.querySelector(".timer-face"), phaseEl = root.querySelector(".timer-phase"), q = (n) => root.querySelector(`[name=${n}]`);
    let end = 0, phase = "focus", tick = null, paused = 0, blocks = 0;
    const mins = () => (phase === "focus" ? Number(q("focus").value) : Number(q("rest").value)) || 25;
    const render = () => { const left = paused || Math.max(0, end - Date.now()); show.textContent = clock(left); document.title = `${clock(left)} · ${phase === "focus" ? "Focus" : "Break"} · Study timer`; phaseEl.textContent = phase === "focus" ? `Focus block ${blocks + 1}` : "Break"; root.querySelector(".break-ideas").hidden = phase !== "break"; };
    const next = () => {
      chime();
      if (phase === "focus") { blocks++; studied(); root.querySelector(".reflect").hidden = false; phase = "break"; } else phase = "focus";
      end = Date.now() + mins() * 60e3; render();
    };
    const loop = () => { if (!paused && Date.now() >= end) next(); render(); };
    root.querySelector("[data-start]").addEventListener("click", (e) => {
      if (!tick) { end = Date.now() + mins() * 60e3; tick = setInterval(loop, 250); e.target.textContent = "Pause"; }
      else if (paused) { end = Date.now() + paused; paused = 0; e.target.textContent = "Pause"; }
      else { paused = Math.max(0, end - Date.now()); e.target.textContent = "Resume"; }
      render();
    });
    root.querySelector("[data-reset-timer]").addEventListener("click", () => { clearInterval(tick); tick = null; paused = 0; phase = "focus"; end = Date.now() + mins() * 60e3; paused = mins() * 60e3; root.querySelector("[data-start]").textContent = "Start"; render(); });
    root.querySelector("[name=sound]").addEventListener("change", (e) => noise(e.target.value));
    root.querySelector("[name=preset]").addEventListener("change", (e) => { const [f, r] = e.target.value.split("/"); if (f) { q("focus").value = f; q("rest").value = r; } });
    root.querySelector(".break-ideas").innerHTML = `<b>Break ideas (stay off your phone):</b> ${BREAK_IDEAS.map((b) => `<span class="chip">${b}</span>`).join(" ")} <a href="/topics/">or review a topic's flashcards</a>.`;
    const log = load("timer-log") || [];
    const renderLog = () => { root.querySelector(".reflect-log").innerHTML = log.slice(-5).reverse().map((l) => `<li><b>${esc(l.day)}:</b> clicked: ${esc(l.clicked)} · revisit: ${esc(l.revisit)}</li>`).join(""); };
    root.querySelector("[data-save-reflect]").addEventListener("click", () => {
      log.push({ day: new Date().toLocaleString("en-GB", { weekday: "short", hour: "2-digit", minute: "2-digit" }), clicked: q("clicked").value, revisit: q("revisit").value });
      save("timer-log", log.slice(-50)); q("clicked").value = ""; q("revisit").value = ""; root.querySelector(".reflect").hidden = true; renderLog();
    });
    root.querySelector("[data-copy-log]").addEventListener("click", (e) => navigator.clipboard?.writeText(log.map((l) => `${l.day}: clicked: ${l.clicked}; revisit: ${l.revisit}`).join("\n") + "\n(Study timer: getgradify.com/tools/study-timer/)").then(() => { e.target.textContent = "Copied"; }));
    const goal = new URLSearchParams(location.search).get("goal"); if (goal) root.querySelector(".goal-banner").innerHTML = `Your study partner's goal: <b>${esc(goal.slice(0, 120))}</b>. Start a block and match it.`;
    root.querySelector("[data-goal-link]").addEventListener("click", (e) => { const g = q("goal").value.trim(); if (!g) return; navigator.clipboard?.writeText(`${location.origin}${location.pathname}?goal=${encodeURIComponent(g)}`).then(() => { e.target.textContent = "Goal link copied"; }); });
    paused = mins() * 60e3; render(); renderLog();
    out(root).textContent = "Press Start. The tab title shows the time left, so you can switch tabs.";
  },
  room(root) {
    const p = new URLSearchParams(location.search), name = (p.get("room") || "gradify").slice(0, 40).replace(/[^\w-]/g, "");
    const q = (n) => root.querySelector(`[name=${n}]`);
    q("room").value = name;
    const goal = load(`room-goal-${name}`); if (goal) q("goal").value = goal;
    q("goal").addEventListener("input", () => save(`room-goal-${name}`, q("goal").value));
    let last = null;
    const loop = () => {
      const r = roomPhase(Date.now());
      if (last && last !== r.phase) { chime(); if (r.phase === "break") studied(); }
      last = r.phase;
      root.querySelector(".timer-face").textContent = clock(r.left);
      root.querySelector(".timer-phase").textContent = r.phase === "focus" ? "Focus block (50 min)" : "Break (10 min)";
      document.title = `${clock(r.left)} · ${r.phase === "focus" ? "Focus" : "Break"} · Focus room ${name}`;
      out(root).innerHTML = `${r.phase === "focus" ? "Heads down" : "Break: stand up, stretch, drink water"}. ${q("goal").value ? `Today's goal: <b>${esc(q("goal").value)}</b>.` : ""}`;
    };
    setInterval(loop, 500); loop();
    root.querySelector("[data-room-link]").addEventListener("click", (e) => { const r = q("room").value.replace(/[^\w-]/g, "") || "gradify"; navigator.clipboard?.writeText(`${location.origin}${location.pathname}?room=${r}`).then(() => { e.target.textContent = "Room link copied"; }); });
  },
  calm(root) {
    const ring = root.querySelector(".breath"), say = root.querySelector(".breath-say");
    let t = null;
    root.querySelector("[data-breathe]").addEventListener("click", (e) => {
      if (t) { clearInterval(t); t = null; ring.className = "breath"; say.textContent = "Ready"; e.target.textContent = "Start 60 seconds"; return; }
      const steps = [["in", "Breathe in", 4], ["hold", "Hold", 4], ["out", "Breathe out", 6]], start = Date.now(); e.target.textContent = "Stop";
      const run = () => {
        const s = (Date.now() - start) / 1000; if (s >= 60) { clearInterval(t); t = null; say.textContent = "Done. Now pick one small task below."; ring.className = "breath"; e.target.textContent = "Start 60 seconds"; return; }
        let k = s % 14, i = 0; while (k >= steps[i][2]) { k -= steps[i][2]; i++; }
        ring.className = `breath ${steps[i][0]}`; say.textContent = `${steps[i][1]} · ${Math.ceil(steps[i][2] - k)}`;
      };
      t = setInterval(run, 200); run();
    });
    out(root).textContent = "One slow minute lowers your heart rate. Then do just one 10-minute task.";
  },
  mistakes(root) {
    const list = load("mistakes") || [], q = (n) => root.querySelector(`[name=${n}]`);
    const render = () => {
      const b = mistakeBreakdown(list);
      out(root).innerHTML = list.length ? `<p><b>${list.length} mistakes logged.</b> ${b.map((x) => `${x.share}% ${REASONS[x.reason].toLowerCase()}`).join(" · ")}</p><ul>${list.slice(-12).reverse().map((m) => `<li><b>${esc(m.topic)}</b> (${REASONS[m.reason]}): ${esc(m.rule)}</li>`).join("")}</ul>` : "Log the first question you got wrong.";
      const top = b[0]?.reason;
      setNext(root, !top ? "" : top === "misread" ? `<a href="/guides/command-words/">learn the command words</a> and <a href="/tools/question-deconstructor/">break questions down</a>.` : top === "concept" ? `<a href="/topics/">revisit the topic</a> and ${NOTES}.` : top === "rushed" ? `<a href="/guides/exam-technique/">use the exam technique timing rule</a>.` : `${NOTES}: spaced reviews fix forgetting.`);
    };
    root.querySelector("[data-log]").addEventListener("click", () => {
      if (!q("topic").value.trim()) return;
      list.push({ topic: q("topic").value.trim().slice(0, 80), reason: q("reason").value, rule: q("rule").value.trim().slice(0, 240), at: Date.now() });
      save("mistakes", list); q("topic").value = ""; q("rule").value = ""; studied(); render();
    });
    root.querySelector("[data-export]").addEventListener("click", () => download("mistake-log.csv", ["topic,reason,right rule", ...list.map((m) => [m.topic, REASONS[m.reason], m.rule].map((x) => `"${String(x).replace(/"/g, '""')}"`).join(","))].join("\n") + "\n\"Made with the free mistake log at getgradify.com\",,", "text/csv"));
    render();
  },
};

/** an iCalendar file of all-day events (deadline milestones and the like) */
export function icsEvents(events, stamp = new Date()) {
  const ymd = (d) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const clean = (s) => String(s).replace(/[\r\n,;\\]/g, " ").slice(0, 90);
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Gradify//Planner//EN", ...events.map((e, i) => ["BEGIN:VEVENT", `UID:gradify-${ymd(e.date)}-${i}@getgradify.com`, `DTSTAMP:${stamp.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "")}`, `DTSTART;VALUE=DATE:${ymd(e.date)}`, `SUMMARY:${clean(e.title)}`, `DESCRIPTION:${clean(e.note || "Planned with GetGradify (getgradify.com)")}`, "END:VEVENT"].join("\r\n")), "END:VCALENDAR", ""].join("\r\n");
}
export { ics };

export function mount(root) { TOOLS[root.dataset.tool]?.(root); }
