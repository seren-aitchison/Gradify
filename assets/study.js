// Study: the infinite flashcard feed. A vertical, swipeable feed of cards mixed with study
// tips, bonus facts and reminders. Rate each card (Again, Hard, Good, Easy) and a simple
// spaced-repetition schedule decides when you'll see it next. Zoom out for an overview of
// every card. Cards made in Capture join the feed.
import { icon } from "./icons.js";

const $ = (s, el = document) => el.querySelector(s);
let ctx, mode = "feed", exam = false, rated = 0, timer = null;

// interval in days; ease grows with Good/Easy answers (SM-2 style, simplified)
const card = (site, front, back, extra = {}) => ({ kind: "card", site, front, back, interval: extra.interval ?? 1, ease: 2.5, due: true, ...extra });
const DECK = [
  card("MedGradify", "What closes at the start of ventricular systole?", "The mitral and tricuspid valves. Their closing makes the first heart sound, S1.", { bonus: "A resting heart beats roughly 100,000 times a day." }),
  card("TechGradify · ForgeLab", "What does ReLU return for a negative input?", "Zero. ReLU(x) = max(0, x).", { interval: 3 }),
  { kind: "tip", text: "Spacing beats cramming. Ten minutes a day sticks better than an hour once a week.", i: "bulb" },
  card("LanguageGradify", "el andén", "the platform (at a train station)", { bonus: "Andén comes from an old word for a walkway or terrace." }),
  card("MedGradify", "What is isovolumetric contraction?", "The brief phase when the ventricles contract with all four valves closed, so pressure rises but volume doesn't change."),
  card("UnderGradify", "What does a p-value below 0.05 tell you?", "That results at least this extreme would happen less than 5% of the time if the null hypothesis were true. It doesn't prove your hypothesis.", { interval: 6 }),
  { kind: "reminder", text: "Physiology quiz on Friday. These cards are part of it.", i: "bell" },
  card("MedGradify", "What causes the second heart sound, S2?", "The aortic and pulmonary valves closing at the end of systole."),
  card("TechGradify · ForgeLab", "Why do we split data into training and test sets?", "To check the model works on data it hasn't seen, so you can catch overfitting."),
  card("LanguageGradify", "¿A qué hora sale el tren?", "What time does the train leave?"),
  { kind: "fact", text: "Recall practice, testing yourself without looking, roughly doubles what you remember a week later compared with re-reading.", i: "star" },
  card("HealthGradify", "Roughly how much sleep do most adults need?", "7 to 9 hours a night.", { interval: 10 }),
  card("MedGradify", "What is stroke volume?", "The amount of blood ejected by each ventricle per beat."),
  card("TechGradify · ForgeLab", "What does a learning rate that's too high usually do?", "Training becomes unstable: the loss jumps around or blows up instead of going down."),
];

const fmtDays = (d) => (d < 1 ? "10 min" : d < 30 ? `${Math.round(d)} ${Math.round(d) === 1 ? "day" : "days"}` : `${Math.round(d / 30)} mo`);
function preview(c) {
  return {
    again: 0,
    hard: Math.max(1, c.interval * 1.2),
    good: Math.max(1, c.interval * c.ease),
    easy: Math.max(4, c.interval * c.ease * 1.6),
  };
}
function rate(c, how) {
  const next = preview(c)[how];
  c.ease = Math.max(1.3, c.ease + { again: -0.2, hard: -0.15, good: 0, easy: 0.15 }[how]);
  c.interval = how === "again" ? 1 : next;
  c.due = how === "again"; // "again" comes back later in this session
  c.last = how;
  c.nextIn = next;
}

const cards = () => DECK.filter((x) => x.kind === "card");
function counts() {
  const all = cards();
  return { due: all.filter((c) => c.due).length, done: all.filter((c) => c.last).length, total: all.length };
}

function itemHtml(x, i) {
  if (x.kind !== "card") {
    return `<article class="feed-item note ${x.kind}" data-i="${i}"><span class="note-ico">${icon(x.i)}</span>
      <span class="kicker">${{ tip: "Study tip", fact: "Bonus fact", reminder: "Reminder" }[x.kind]}</span><p>${ctx.esc(x.text)}</p></article>`;
  }
  const s = ctx.site(x.site), c = ctx.colourOf(x.site), p = preview(x);
  return `<article class="feed-item fcard ${x.last ? `rated ${x.last}` : ""}" data-i="${i}" style="--c:#${c}">
    <header><span class="mini-ico">${icon(s.i)}</span>${ctx.esc(ctx.short(x.site))}${x.last ? `<em class="next-due">${x.last === "again" ? "Back later today" : `Next in ${fmtDays(x.nextIn)}`}</em>` : ""}</header>
    <button type="button" class="face" aria-pressed="false" aria-label="Show the answer">
      <span class="front">${ctx.esc(x.front)}</span>
      <span class="back">${ctx.esc(x.back)}${x.bonus ? `<em class="bonus">${icon("star")}${ctx.esc(x.bonus)}</em>` : ""}</span>
      <span class="tap">Tap to show the answer</span>
    </button>
    ${exam ? '<span class="exam-bar"><i></i></span>' : ""}
    <div class="rate" role="group" aria-label="How well did you know it?">
      ${["again", "hard", "good", "easy"].map((h) => `<button type="button" class="r-${h}" data-rate="${h}"><b>${h[0].toUpperCase() + h.slice(1)}</b><span>${h === "again" ? "<10 min" : fmtDays(p[h])}</span></button>`).join("")}
    </div>
  </article>`;
}

function render() {
  const { due, done, total } = counts();
  $("#study-count").textContent = `${done} reviewed · ${due} due`;
  $("#study-bar").style.width = `${(done / total) * 100}%`;
  const body = $("#study-body");
  body.className = `study-body ${mode}`;
  if (mode === "feed") {
    body.innerHTML = `<div class="feed-scroll" id="feed-scroll">${DECK.map(itemHtml).join("")}
      <article class="feed-item note end"><span class="note-ico">${icon("check")}</span><span class="kicker">All caught up</span><p>That's everything due today. New cards from Capture will appear here.</p></article></div>`;
    startTimer();
  } else {
    body.innerHTML = `<div class="overview">${DECK.map((x, i) => x.kind === "card"
      ? `<button type="button" class="ov-card ${x.last || ""}" data-jump="${i}" style="--c:#${ctx.colourOf(x.site)}"><span>${ctx.esc(x.front)}</span><em>${x.last ? (x.last === "again" ? "Again" : `Next in ${fmtDays(x.nextIn)}`) : "Due today"}</em></button>`
      : `<div class="ov-note">${icon(x.i)}<span>${ctx.esc(x.text)}</span></div>`).join("")}</div>`;
  }
}

// Exam mode: 20 seconds per card, and running out counts as "Again"
function startTimer() {
  clearInterval(timer);
  if (!exam) return;
  const sc = $("#feed-scroll");
  let t0 = Date.now(), current = null;
  timer = setInterval(() => {
    if (!sc.isConnected) { clearInterval(timer); return; }
    const top = sc.scrollTop + 10;
    const item = [...sc.querySelectorAll(".fcard:not(.rated)")].find((el) => el.offsetTop + el.offsetHeight > top);
    if (!item) return;
    if (item !== current) { current = item; t0 = Date.now(); }
    const left = 1 - (Date.now() - t0) / 20000;
    const bar = item.querySelector(".exam-bar i");
    if (bar) bar.style.width = `${Math.max(0, left) * 100}%`;
    if (left <= 0) { current = null; applyRating(item, "again"); }
  }, 200);
}

function applyRating(el, how) {
  const i = +el.dataset.i;
  rate(DECK[i], how);
  rated++;
  if (rated % 5 === 0) ctx.logActivity(DECK[i].site, "Reviewed 5 flashcards", "cards", 10);
  const sc = $("#feed-scroll");
  const pos = sc.scrollTop;
  render();
  const next = $("#feed-scroll");
  next.scrollTop = pos;
  const nextEl = next.querySelector(`.feed-item[data-i="${i}"]`)?.nextElementSibling;
  if (nextEl) next.scrollTo({ top: nextEl.offsetTop - next.offsetTop, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

export function initStudy(context) {
  ctx = context;
  const view = $("#study");
  view.addEventListener("click", (e) => {
    const m = e.target.closest("[data-mode]");
    if (m) { mode = m.dataset.mode; view.querySelectorAll("[data-mode]").forEach((b) => b.setAttribute("aria-pressed", String(b === m))); render(); return; }
    const face = e.target.closest(".face");
    if (face) { face.setAttribute("aria-pressed", String(face.getAttribute("aria-pressed") !== "true")); return; }
    const r = e.target.closest("[data-rate]");
    if (r) { applyRating(r.closest(".fcard"), r.dataset.rate); return; }
    const j = e.target.closest("[data-jump]");
    if (j) {
      mode = "feed";
      view.querySelectorAll("[data-mode]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === "feed")));
      render();
      const sc = $("#feed-scroll"), el = sc.querySelector(`.feed-item[data-i="${j.dataset.jump}"]`);
      sc.scrollTop = el.offsetTop - sc.offsetTop;
    }
  });
  $("#exam-mode").addEventListener("change", (e) => { exam = e.target.checked; render(); });
  // Cards made in Capture join the deck, ready to review
  document.addEventListener("lifeos:cards", (e) => {
    for (const c of [...e.detail].reverse()) DECK.splice(1, 0, card("MedGradify", c.q, c.a));
    render();
  });
  document.addEventListener("lifeos:view", (e) => { if (e.detail !== "study") clearInterval(timer); else render(); });
  render();
}
