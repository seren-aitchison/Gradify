// "Your Gradify": the learner's own LifeOS, at the top of the LifeOS tour, built only from their real data
// (kit/learning/learner-data.js). It appears only when there is something real to show; the tour below it
// keeps its example learner, labelled as such. Styles: .mine in kit/styles/components.css.
import { loadLearner } from "../learning/learner-data.js";
import { drawTree } from "./tree.js";
import { SITES, slugOf } from "../core/site.js";

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const site = (n) => SITES.find((s) => s.n === n);
const colour = (n) => { const s = site(n); return s ? s.spot || s.c : "f055dd"; };
const pct = (x) => `${Math.round(x * 100)}%`;
const LEVELS = ["Explorer", "Apprentice", "Scholar", "Specialist", "Expert"];
const levelOf = (xp) => Math.floor(Math.sqrt(xp / 50)) + 1;
const PACE = { "on-track": "On track for your exam", tight: "Tight for your exam", behind: "Behind for your exam", past: "Exam date has passed", done: "All written lessons done", "no-date": "" };
function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

export async function mountMine({ after = document.querySelector("#lifeos .life-head") } = {}) {
  if (!after) return null;
  let L;
  try { L = await loadLearner(); } catch (e) { console.warn("LifeOS couldn't read your progress", e); return null; }
  if (!L.hasData) return null;

  const days = L.days, recent = days.slice(-30), last60 = days.slice(-60);
  const sum = (list, n) => list.reduce((a, d) => a + (d.counts[n] || 0), 0);
  const used = [...new Set(days.flatMap((d) => Object.keys(d.counts)))].sort((a, b) => sum(recent, b) - sum(recent, a));
  const lessons = L.courses.reduce((a, c) => a + c.done, 0), lvl = levelOf(L.xp);
  const name = L.profile.display_name ? `, ${esc(L.profile.display_name)}` : "";

  const sec = document.createElement("section");
  sec.className = "mine glass"; sec.id = "mine"; sec.setAttribute("aria-labelledby", "mine-title");
  sec.innerHTML = `
    <div class="mine-top"><div><span class="kicker">Your Gradify · ${L.mode === "cloud" ? "from your account" : "saved in this browser"}</span><h3 id="mine-title">Welcome back${name}</h3></div>
      <div class="mine-tiles">${[["Level", `${lvl} · ${LEVELS[Math.min(4, Math.floor((lvl - 1) / 3))]}`], ["XP", L.xp.toLocaleString()], ["Day streak", `${L.streak.n}${L.streak.today ? "" : L.streak.n ? " · study today to keep it" : ""}`], ["Lessons done", lessons.toLocaleString()]].map(([k, v]) => `<div><small>${k}</small><b>${esc(v)}</b></div>`).join("")}</div></div>
    <div class="mine-grid">
      <article><h4>Do next</h4>${L.next.length ? `<ol class="mine-next">${L.next.map((x) => `<li${x.site ? ` style="--c:#${colour(x.site)}"` : ""}><a href="${esc(x.href)}">${esc(x.label)}</a><small>${esc(x.why)}</small></li>`).join("")}</ol>` : `<p class="mine-empty">Nothing due. Start a lesson or add notes, and Gradify will suggest what to do next.</p>`}</article>
      <article><h4>Your courses</h4>${L.courses.length ? `<ul class="mine-courses">${L.courses.map((c) => {
        const s = site(c.site), map = s?.built ? `/${slugOf(s)}/map.html` : null, m = c.six;
        return `<li style="--c:#${colour(c.site)}"><div class="mine-ch"><b>${esc(c.name)}</b><small>${esc(c.site)}</small></div>
          <div class="mine-bar" role="img" aria-label="${c.done} of ${c.total} lessons"><i style="width:${(c.done / Math.max(1, c.total)) * 100}%"></i></div>
          <p>${c.done} of ${c.total} lessons · ${m.mastery == null ? "not enough evidence for a mastery figure yet" : `${pct(m.mastery)} mastery from ${m.measured.length} of 6 kinds of evidence`}${PACE[c.pace.status] ? ` · ${PACE[c.pace.status]}` : ""}</p>
          <div class="mine-links">${c.href ? `<a href="${c.href}${c.next ? `#/lesson/${c.next.id}` : ""}">${c.next ? "Continue" : "Open"}</a><a href="${c.href}#/me">Mastery</a>` : ""}${map ? `<a href="${map}">Earth map</a>` : ""}</div></li>`; }).join("")}</ul>` : `<p class="mine-empty">No course started yet.</p>`}
        ${L.decks.length ? `<p class="mine-decks"><a href="/app.html#/progress">${L.decks.length} ${L.decks.length === 1 ? "topic" : "topics"} from your own notes</a></p>` : ""}</article>
    </div>
    <div class="mine-grid">
      <article><h4>Your year</h4><div class="mine-heat" role="img" aria-label="Days you studied in the last 26 weeks">${days.slice(-26 * 7 - ((days.length - 1) % 7) - 1).map((d) => { const top = Object.entries(d.counts).sort((a, b) => b[1] - a[1])[0], n = Object.values(d.counts).reduce((a, b) => a + b, 0);
        return `<i title="${d.key}: ${n} ${n === 1 ? "activity" : "activities"}"${top ? ` style="background:color-mix(in srgb, #${colour(top[0])} ${Math.min(100, 35 + n * 13)}%, #151515)"` : ""}></i>`; }).join("")}</div>
        <p class="mine-empty">${days.filter((d) => Object.keys(d.counts).length).length} days with study in the last year · best streak ${L.streak.best} days</p></article>
      <article><h4>Your tree</h4>${used.length ? `<div class="mine-tree" id="mine-tree"></div><p class="mine-empty">One limb for each site you've studied on. Each canopy fills out with that site's activity over the last 30 days.</p>` : `<p class="mine-empty">Your tree grows as you study.</p>`}</article>
    </div>`;
  after.after(sec);
  if (used.length) {
    drawTree(sec.querySelector("#mine-tree"), {
      sites: used.slice(0, 8).map((n) => ({ n, c: colour(n), act: sum(recent, n), k: Math.min(1, sum(recent, n) / 36), creds: [] })),
      bars: last60.map((d) => Object.values(d.counts).reduce((a, b) => a + b, 0)), rand: rng(11),
    });
  }
  const note = after.querySelector(".example-note");
  if (note) note.textContent = "Your own progress is just below. The tour after it still uses example data for one learner, Alex, and shows where Gradify is heading.";
  return L;
}
