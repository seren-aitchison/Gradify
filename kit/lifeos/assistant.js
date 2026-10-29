// Gradify AI preview. This is not a language model: replies are scripted, but they are
// worked out from Alex's live example data, the same data the rest of LifeOS shows.
import { icon } from "../core/icons.js";
import { TOPICS, ROADS, MODULES, stateOf } from "./earth.js";
import { TARGETS, readiness, forecast, gapsOf } from "./plan.js";

const $ = (s, el = document) => el.querySelector(s);
let ctx;

const PRIORITY = ["cycle", "thorax", "enzymes", "inherit"];
const fading = () => PRIORITY.map((id) => TOPICS.find((t) => t.id === id)).filter((t) => stateOf(t) === "fading");
const nameOf = (id) => TOPICS.find((t) => t.id === id).name;

const SUGGESTIONS = [
  "I have 30 minutes. What should I do?",
  "Am I ready for my exam?",
  "Why is a topic fading?",
  "Make flashcards from my notes",
  "Plan my week",
];

// ---------- Replies ----------
function sessionPlan(minutes) {
  const steps = [];
  let left = minutes;
  for (const t of fading()) { if (left < 10) break; steps.push({ what: `Review “${t.name}”`, why: `retention ${t.ev[3]}%`, min: 10, topic: t.id, site: "MedGradify" }); left -= 10; if (steps.length === 2) break; }
  const med = ctx.paths.MedGradify;
  if (left >= 10 && med.done < med.lessons.length) { steps.push({ what: `Next lesson: “${med.lessons[med.done]}”`, why: "MedGradify, Unit 2", min: 10, site: "MedGradify" }); left -= 10; }
  const spanish = ctx.goals.find((g) => g.label === "Practise Spanish");
  if (left >= 5 && spanish && spanish.n < spanish.of) { steps.push({ what: "Spanish speaking drill", why: "today's goal, and your weakest B2 skill", min: Math.min(10, left), site: "LanguageGradify" }); left -= Math.min(10, left); }
  if (!steps.length) return `<p>You're on top of everything for today. Use the ${minutes} minutes for an extra Spanish speaking drill: it's your biggest gap for B2.</p>`;
  const first = steps[0];
  return `<p>Here's the best use of ${minutes} minutes, most urgent first:</p>
    <ol class="ai-steps">${steps.map((s) => `<li><b>${ctx.esc(s.what)}</b><span>${s.min} min · ${ctx.esc(s.why)}</span></li>`).join("")}</ol>
    ${left > 0 ? `<p class="ai-dim">That leaves ${left} minutes spare. Take a break: spacing study out helps it stick.</p>` : ""}
    ${first.topic ? `<div class="ai-actions"><button type="button" class="btn btn-light lg btn-sm" data-review="${first.topic}"><span>Start step 1</span></button></div>` : ""}`;
}

function examReady() {
  const t = TARGETS.find((x) => x.id === "exam");
  const r = readiness(t), gaps = gapsOf(t).slice(0, 3);
  const steady = forecast(t, 30);
  return `<p>You're <b>${r}% ready</b> for the Cardiovascular exam in ${t.due} days.</p>
    <p>The biggest gaps are ${gaps.map((g) => `<b>${ctx.esc(g.name)}</b> (${g.now}%)`).join(", ")}. ECG basics and renal function haven't been started yet, so they're the biggest single wins.</p>
    <p>${steady.spare >= 0 ? `At 30 minutes a day you'll be ready with ${steady.spare} days to spare.` : `At 30 minutes a day you'd miss the exam by ${-steady.spare} days, so the intensive route is safer.`}</p>
    <div class="ai-actions"><a class="btn btn-light lg btn-sm" href="#plan"><span>Open the plan</span></a></div>`;
}

function whyFading() {
  const t = fading()[0];
  if (!t) return "<p>Nothing is fading right now. Every topic you've studied is holding up. Nice work.</p>";
  const unlocks = ROADS.filter(([a]) => a === t.id).map(([, b]) => nameOf(b));
  return `<p><b>${ctx.esc(t.name)}</b> is fading because it was last studied ${t.days} days ago, and retention has dropped to ${t.ev[3]}%. Recall is at ${t.ev[0]}%.</p>
    ${unlocks.length ? `<p>It matters more than it looks: it's a prerequisite for ${unlocks.map((n) => `<b>${ctx.esc(n)}</b>`).join(" and ")}, so gaps here will slow those down too.</p>` : ""}
    <p>A 10-minute review with recall practice should bring it back above 70%.</p>
    <div class="ai-actions"><button type="button" class="btn btn-light lg btn-sm" data-review="${t.id}"><span>Review it now</span></button><button type="button" class="see linkish" data-topic="${t.id}">Show on Gradify Earth</button></div>`;
}

const CARDS = [
  ["What closes at the start of ventricular systole?", "The atrioventricular (mitral and tricuspid) valves, which makes the first heart sound, S1."],
  ["What is isovolumetric contraction?", "The brief phase when the ventricles contract with all four valves closed, so pressure rises but volume doesn't change."],
  ["What causes the second heart sound, S2?", "The aortic and pulmonary valves closing at the end of systole."],
];
function flashcards() {
  return `<p>Here are 3 cards made from Alex's notes on the cardiac cycle. Tap a card to flip it.</p>
    <div class="ai-cards">${CARDS.map(([q, a]) => `<button type="button" class="flash" aria-pressed="false"><span class="q">${ctx.esc(q)}</span><span class="a">${ctx.esc(a)}</span></button>`).join("")}</div>
    <p class="ai-dim">In the full version you'll upload notes, PDFs, photos or handwriting, and the cards join your spaced-repetition reviews automatically.</p>`;
}

function weekPlan() {
  const days = Array.from({ length: 7 }, (_, k) => new Date(+ctx.today + k * ctx.DAY));
  const plan = [
    "Review the cardiac cycle · ForgeLab unit challenge prep",
    "ForgeLab unit challenge (due) · Spanish speaking",
    "Heart sounds lesson · workout",
    "ECG basics · Spanish writing",
    "Physiology lab report draft",
    "Rest day: light flashcards only",
    "Physiology lab report due · renal function intro",
  ];
  return `<p>Here's a week that keeps the exam on track without dropping ForgeLab or Spanish:</p>
    <ul class="ai-week">${days.map((d, i) => `<li><b>${ctx.fmt(d, { weekday: "short" })}</b><span>${plan[i]}</span></li>`).join("")}</ul>
    <div class="ai-actions"><button type="button" class="btn btn-light lg btn-sm" data-addweek><span>Add to my calendar</span></button></div>`;
}

function reply(text) {
  const q = text.toLowerCase();
  const mins = q.match(/(\d+)\s*(min|minute|hour|hr)/);
  if (mins || /what should i (do|study)|study next|free time/.test(q)) {
    let m = mins ? +mins[1] : 30;
    if (mins && /hour|hr/.test(mins[2])) m *= 60;
    return sessionPlan(Math.max(10, Math.min(m, 120)));
  }
  if (/ready|exam|pass/.test(q)) return examReady();
  if (/fad|forget|slipping|weak/.test(q)) return whyFading();
  if (/flash|card|notes|quiz/.test(q)) return flashcards();
  if (/week|plan|schedule|calendar/.test(q)) return weekPlan();
  return `<p>In this preview I can only answer a few kinds of question, using Alex's example data. Try one of these:</p>
    <div class="ai-try-row">${SUGGESTIONS.map((s) => `<button type="button" class="chip ai-try">${ctx.esc(s)}</button>`).join("")}</div>`;
}

// Apply the style chosen in Settings
function styled(html) {
  const style = ctx.aiStyle();
  if (style === "concise") {
    const div = document.createElement("div");
    div.innerHTML = html;
    div.querySelectorAll("p").forEach((p, i) => { if (i > 0 && !p.closest(".ai-actions")) p.remove(); });
    return div.innerHTML;
  }
  if (style === "coach") return html + '<p class="ai-coach">Don\'t wait for the perfect moment: start the first step now. I\'ll check in tonight.</p>';
  return html;
}

// ---------- Chat UI ----------
function add(who, html) {
  const log = $("#ai-log");
  const m = document.createElement("div");
  m.className = `msg ${who}`;
  m.innerHTML = who === "ai" ? `<span class="ai-av" aria-hidden="true">${icon("star")}</span><div class="chat-bubble">${html}</div>` : `<div class="chat-bubble">${html}</div>`;
  log.appendChild(m);
  log.scrollTop = log.scrollHeight;
  return m;
}
function ask(text) {
  if (!text.trim()) return;
  add("me", ctx.esc(text));
  const typing = add("ai", '<span class="typing"><i></i><i></i><i></i></span>');
  setTimeout(() => {
    typing.querySelector(".chat-bubble").innerHTML = styled(reply(text));
    $("#ai-log").scrollTop = $("#ai-log").scrollHeight;
  }, 650);
}

export function initAssistant(context) {
  ctx = context;
  $("#ai-suggest").innerHTML = SUGGESTIONS.map((s) => `<button type="button" class="chip">${ctx.esc(s)}</button>`).join("");
  $("#ai-suggest").addEventListener("click", (e) => { const c = e.target.closest(".chip"); if (c) ask(c.textContent); });
  $("#ai-form").addEventListener("submit", (e) => { e.preventDefault(); const i = $("#ai-input"); ask(i.value); i.value = ""; });
  $("#ai-log").addEventListener("click", (e) => {
    const tr = e.target.closest(".ai-try");
    if (tr) { ask(tr.textContent); return; }
    const r = e.target.closest("[data-review]");
    if (r) { ctx.startReview(r.dataset.review); r.disabled = true; r.textContent = "Done ✓"; return; }
    const t = e.target.closest("[data-topic]");
    if (t) { ctx.showTopic(t.dataset.topic); return; }
    const f = e.target.closest(".flash");
    if (f) { f.setAttribute("aria-pressed", String(f.getAttribute("aria-pressed") !== "true")); return; }
    const w = e.target.closest("[data-addweek]");
    if (w) {
      ctx.addEvent({ in: 0, what: "Week plan from Gradify AI added", site: "MedGradify", planned: true });
      w.disabled = true; w.textContent = "Added ✓";
      ctx.toast('Added this week\'s plan. <a href="#command">See Coming up ↑</a>', true);
    }
  });
  add("ai", `<p>Hi Alex. I can see your progress across MedGradify, ForgeLab, LanguageGradify and your other connected sites. Ask me what to study, whether you're ready for your exam, or to turn your notes into flashcards.</p>`);
}
