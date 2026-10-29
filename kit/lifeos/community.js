// Community: a study group, a cross-site challenge and an optional leaderboard.
// Example data; the people in the group are made up.
import { icon } from "../core/icons.js";

const $ = (s, el = document) => el.querySelector(s);
let ctx, joined = false, boardOn = false, boardTab = "group";

const MEMBERS = [
  { n: "Priya S.", c: "f055dd", xp: 610 }, { n: "Tom W.", c: "40d4b1", xp: 545 },
  { n: "Jordan K.", c: "ffc002", xp: 380 }, { n: "Mei L.", c: "3c78d8", xp: 455 },
];
const initials = (n) => n.split(/\s+/).map((w) => w[0]).join("").slice(0, 2);

function nextThursday() {
  const d = new Date(ctx.today);
  const diff = (4 - d.getDay() + 7) % 7 || 7;
  return { in: diff, date: new Date(+d + diff * ctx.DAY) };
}

function renderGroup() {
  const t = nextThursday();
  $("#group").innerHTML = `
    <div class="panel-head"><div><span class="kicker">${icon("people")}Study group · MedGradify</span><h3 class="big">Year 2 Cardiology</h3></div><span class="pill-dark">${MEMBERS.length + (joined ? 1 : 0)} members</span></div>
    <div class="avatars">${MEMBERS.map((m) => `<span style="--c:#${m.c}" title="${m.n}">${initials(m.n)}</span>`).join("")}${joined ? '<span class="me" title="Alex">AM</span>' : ""}</div>
    <div class="inset-card session">
      <span class="kicker">${icon("calendar")}Next session</span>
      <b>${ctx.fmt(t.date, { weekday: "long", day: "numeric", month: "short" })}, 19:00</b>
      <span>Heart sounds: talk through S1 to S4, then a 10-question quiz</span>
    </div>
    <button type="button" class="btn ${joined ? "btn-ghost" : "btn-light"} lg btn-sm" id="join"><span>${joined ? "Leave group" : "Join the group"}</span></button>`;
}

// Challenge progress comes from the real heatmap data for this week
function renderChallenge() {
  const week = ctx.days.slice(-(((ctx.today.getDay() + 6) % 7) + 1)); // Monday to today
  const activeDays = week.filter((d) => Object.keys(d.counts).length).length;
  const sites = new Set(week.flatMap((d) => Object.keys(d.counts))).size;
  const done = activeDays >= 5 && sites >= 3;
  $("#challenge").innerHTML = `
    <div class="panel-head"><div><span class="kicker">${icon("trophy")}Weekly challenge</span><h3 class="big">Cross-site week</h3></div><span class="pill-dark">+150 XP</span></div>
    <p class="sub">Be active on 5 days this week, across at least 3 Gradify sites.</p>
    <div class="ch-row"><span>Active days</span><b>${Math.min(activeDays, 5)}/5</b></div>
    <div class="goal-bar"><i style="width:${Math.min(1, activeDays / 5) * 100}%"></i></div>
    <div class="ch-row"><span>Gradify sites</span><b>${Math.min(sites, 3)}/3</b></div>
    <div class="goal-bar"><i style="width:${Math.min(1, sites / 3) * 100}%"></i></div>
    <p class="sub">${done ? "Challenge complete. Nice work!" : `Resets on Monday. ${7 - week.length} ${7 - week.length === 1 ? "day" : "days"} left after today.`}</p>`;
}

// Friends Alex follows, and the school-wide board (example names)
const FRIENDS = [
  { n: "Sam R.", c: "ff8a3d", xp: 520 }, { n: "Leah M.", c: "a0ff74", xp: 300 }, { n: "Kofi A.", c: "6a60ff", xp: 470 },
];
const SCHOOL = [
  { n: "Ella P.", c: "f055dd", xp: 1240 }, { n: "Noah B.", c: "40d4b1", xp: 1105 }, { n: "Amira H.", c: "ffc002", xp: 980 },
  { n: "Ravi T.", c: "3c78d8", xp: 890 }, { n: "Grace O.", c: "e52153", xp: 860 }, { n: "Ben C.", c: "0e98e5", xp: 805 },
  { n: "Isla F.", c: "8c27ca", xp: 760 }, { n: "Yusuf D.", c: "e69138", xp: 702 },
];
function renderBoard() {
  const pool = boardTab === "friends" ? FRIENDS : boardTab === "school" ? SCHOOL : MEMBERS;
  const all = [...pool, { n: "Alex (you)", c: "ffffff", xp: ctx.weekXp(), me: true }].sort((a, b) => b.xp - a.xp);
  // school board: top 5, then Alex's own row with the real rank
  const rows = boardTab === "school" ? all.slice(0, 5).concat(all.findIndex((r) => r.me) >= 5 ? [all.find((r) => r.me)] : []) : all;
  const me = rows.findIndex((r) => r.me) + 1;
  $("#board").innerHTML = `
    <div class="panel-head"><div><span class="kicker">${icon("star")}Leaderboard</span><h3 class="big">Weekly XP</h3></div>
      
      <label class="switch"><input type="checkbox" id="board-on" role="switch" ${boardOn ? "checked" : ""}><span class="sw-track lg" aria-hidden="true"><span class="sw-knob"></span></span><span>Show</span></label></div>
    ${boardOn ? `
      <div class="seg board-tabs" role="tablist" aria-label="Leaderboard">${[["group", "Study group"], ["friends", "Friends"], ["school", "School"]].map(([k, l]) => `<button type="button" class="chip" data-board="${k}" aria-pressed="${k === boardTab}">${l}</button>`).join("")}</div>
      <ol class="board">${rows.map((r) => `<li class="${r.me ? "me" : ""}"><span class="rank">${all.indexOf(r) + 1}</span><span class="av" style="--c:#${r.c}">${r.me ? "AM" : initials(r.n)}</span><span class="nm">${r.n}</span><b>${r.xp.toLocaleString("en-GB")} XP</b></li>`).join("")}</ol>
      <button type="button" class="btn btn-ghost lg btn-sm" id="share">${icon("share")}<span>Share</span></button>
      <p class="sub">${boardTab === "school" ? `${all.length} students at your school use Gradify. ` : ""}Only people on this board can see your rank. Turn it off at any time.</p>` : `
      <p class="sub">Leaderboards are optional and off by default. Turn this on to compare weekly XP with your study group. You'd be number ${me} this week.</p>`}`;
}

export function initCommunity(context) {
  ctx = context;
  document.querySelector(".community").addEventListener("click", async (e) => {
    if (e.target.closest("#join")) {
      joined = !joined;
      const t = nextThursday();
      if (joined) {
        ctx.addEvent({ in: t.in, what: "Study group: heart sounds, 19:00", site: "MedGradify", planned: true });
        ctx.toast('You joined Year 2 Cardiology. The next session is in your calendar. <a href="#command">See Coming up</a>', true);
      }
      renderGroup();
      return;
    }
    const bt = e.target.closest("[data-board]");
    if (bt) { boardTab = bt.dataset.board; renderBoard(); return; }
    if (e.target.closest("#share")) {
      const rank = [...MEMBERS.map((m) => m.xp), ctx.weekXp()].sort((a, b) => b - a).indexOf(ctx.weekXp()) + 1;
      const text = `I'm number ${rank} in my Gradify study group this week, with ${ctx.weekXp()} XP.`;
      try {
        if (navigator.share) await navigator.share({ text });
        else { await navigator.clipboard.writeText(text); ctx.toast("Copied to your clipboard: " + ctx.esc(text), true); }
      } catch { /* share sheet closed */ }
    }
  });
  document.querySelector(".community").addEventListener("change", (e) => {
    if (e.target.id === "board-on") { boardOn = e.target.checked; renderBoard(); }
  });
  document.addEventListener("lifeos:activity", () => { renderChallenge(); renderBoard(); });
  renderGroup();
  renderChallenge();
  renderBoard();
}
