// Path: the planning view of LifeOS. Pick a goal, compare where you are with where you
// need to be, see the gaps and choose a route. Example data; the exam goal reads live
// from Gradify Earth, so reviewing topics there raises readiness here.
import { icon } from "../core/icons.js";
import { TOPICS, MODULES, strength } from "./earth.js";

const $ = (s, el = document) => el.querySelector(s);
let ctx;

const ROUTES = [
  { id: "light", name: "Light", min: 15, note: "Fits around everything else" },
  { id: "steady", name: "Steady", min: 30, note: "Balanced with your other goals" },
  { id: "intensive", name: "Intensive", min: 60, note: "Fastest, but crowds out other study" },
];

// rate: skill points gained per minute of focused study (example values; real ones come from the learner's history)
export const TARGETS = [
  {
    id: "exam", name: "Pass the Cardiovascular exam", short: "Cardiovascular exam", site: "MedGradify", due: 15, rate: 0.7,
    skills: () => TOPICS.filter((t) => ["cardio", "phys"].includes(t.m)).map((t) => ({ name: t.name, now: strength(t), target: 75, c: MODULES[t.m].c, topic: t.id })),
  },
  {
    id: "job", name: "Land a junior data scientist role", short: "Data scientist role", site: "TechGradify · ForgeLab", due: 240, rate: 0.02,
    skills: () => [
      { name: "Python", now: 82, target: 80 }, { name: "Statistics", now: 58, target: 75 },
      { name: "Machine learning", now: 64, target: 75 }, { name: "SQL", now: 40, target: 70 },
      { name: "Deep learning", now: 35, target: 60 }, { name: "Presenting results", now: 55, target: 70 },
    ],
  },
  {
    id: "b2", name: "Reach Spanish B2", short: "Spanish B2", site: "LanguageGradify", due: 23, rate: 0.07,
    skills: () => [
      { name: "Listening", now: 72, target: 75 }, { name: "Speaking", now: 54, target: 75 },
      { name: "Reading", now: 80, target: 75 }, { name: "Writing", now: 61, target: 75 }, { name: "Vocabulary", now: 68, target: 75 },
    ],
  },
];

let goalId = "exam", routeId = "steady";

// Readiness: how close each skill is to its target, averaged
export function readiness(target) {
  const sk = target.skills();
  return Math.round((sk.reduce((a, s) => a + Math.min(1, s.now / s.target), 0) / sk.length) * 100);
}
export function forecast(target, minutes) {
  const gap = target.skills().reduce((a, s) => a + Math.max(0, s.target - s.now), 0);
  const days = Math.ceil(gap / (minutes * target.rate));
  return { gap, days, spare: target.due - days };
}
export const gapsOf = (target) => target.skills().filter((s) => s.now < s.target).sort((a, b) => (b.target - b.now) - (a.target - a.now));

function render() {
  const t = TARGETS.find((x) => x.id === goalId);
  const c = ctx.colourOf(t.site);
  const panel = $("#plan");
  panel.style.setProperty("--c", "#" + c);
  const ready = readiness(t);
  const gaps = gapsOf(t);
  const R = 46, C = 2 * Math.PI * R;
  const due = new Date(+ctx.today + t.due * ctx.DAY);

  $("#plan-goals").innerHTML = TARGETS.map((g) =>
    `<button type="button" class="chip" data-goal="${g.id}" aria-pressed="${g.id === goalId}">${icon(ctx.site(g.site).i)}<span>${ctx.esc(g.short)}</span></button>`).join("");

  $("#plan-body").innerHTML = `
    <div class="plan-summary">
      <div class="ready-ring">
        <svg viewBox="0 0 110 110" aria-hidden="true"><circle cx="55" cy="55" r="${R}" class="track"/><circle cx="55" cy="55" r="${R}" class="fill" style="stroke-dasharray:${C};stroke-dashoffset:${C * (1 - ready / 100)}"/></svg>
        <span><b>${ready}%</b>ready</span>
      </div>
      <div class="plan-goal">
        <span class="kicker">Goal · ${ctx.esc(ctx.short(t.site))}</span>
        <b>${ctx.esc(t.name)}</b>
        <span class="plan-due">${t.due > 60 ? `Target: ${ctx.fmt(due, { month: "long", year: "numeric" })}` : `${ctx.fmt(due, { weekday: "short", day: "numeric", month: "short" })} · in ${t.due} days`}</span>
        <span class="plan-due">${gaps.length ? `${gaps.length} of ${t.skills().length} areas still below target` : "Every area is at or above target"}</span>
      </div>
    </div>

    <div class="gaps">
      <span class="mini-label">Where you are vs where you need to be</span>
      ${t.skills().sort((a, b) => (b.target - b.now) - (a.target - a.now)).map((s) => `
        <div class="gap ${s.now >= s.target ? "met" : ""}"${s.topic ? ` data-topic="${s.topic}"` : ""}>
          <span class="gap-name">${ctx.esc(s.name)}</span>
          <span class="gap-bar"><i style="width:${s.now}%;${s.c ? `background:${s.c}` : ""}"></i><em style="left:${s.target}%" title="Target ${s.target}%"></em></span>
          <span class="gap-val">${s.now >= s.target ? icon("check") : `${s.now}<small>/${s.target}</small>`}</span>
        </div>`).join("")}
    </div>

    <div class="routes" role="radiogroup" aria-label="Choose a route">
      ${ROUTES.map((r) => {
        const f = forecast(t, r.min);
        const on = f.spare >= 0;
        const when = f.days <= 0 ? "Ready now" : `Ready in ${f.days} ${f.days === 1 ? "day" : "days"}`;
        return `<button type="button" class="route ${r.id === routeId ? "on" : ""} ${on ? "" : "late"}" role="radio" aria-checked="${r.id === routeId}" data-route="${r.id}">
          <span class="route-top"><b>${r.name}</b><em>${r.min} min a day</em></span>
          <span class="route-when">${when}</span>
          <span class="route-status">${f.days <= 0 ? "Already on target" : on ? `${f.spare} ${f.spare === 1 ? "day" : "days"} to spare` : `Misses the date by ${-f.spare} ${f.spare === -1 ? "day" : "days"}`}</span>
          <span class="route-note">${r.note}</span>
        </button>`;
      }).join("")}
    </div>

    <div class="plan-steps">
      <span class="mini-label">Route order: biggest gaps first, prerequisites before the topics that need them</span>
      <ol>${gaps.slice(0, 4).map((s) => `<li>${ctx.esc(s.name)}</li>`).join("")}</ol>
      <button type="button" class="btn btn-light lg btn-sm" id="use-route"><span>Add this route to my plan</span></button>
    </div>`;
}

export function initPlan(context) {
  ctx = context;
  const panel = $("#plan");
  panel.addEventListener("click", (e) => {
    const g = e.target.closest("[data-goal]");
    if (g) { goalId = g.dataset.goal; render(); return; }
    const r = e.target.closest("[data-route]");
    if (r) { routeId = r.dataset.route; render(); return; }
    const gap = e.target.closest(".gap[data-topic]");
    if (gap) { ctx.showTopic(gap.dataset.topic); return; }
    if (e.target.closest("#use-route")) {
      const t = TARGETS.find((x) => x.id === goalId), route = ROUTES.find((x) => x.id === routeId);
      ctx.addEvent({ in: 1, what: `${route.name} route starts: ${route.min} min on ${t.short}`, site: t.site, planned: true });
      ctx.toast(`Added the ${route.name.toLowerCase()} route for “${t.short}” to your plan. <a href="#command">See Coming up ↑</a>`, true);
    }
  });
  document.addEventListener("lifeos:activity", render);
  render();
}
