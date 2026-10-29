// Plan: a week calendar for time blocking. Drag on empty space to create a block, drag a
// block to move it (across days too), drag its bottom edge to resize, and click to edit.
// "Auto-plan my week" fills free time with study blocks worked out from goals, fading
// topics and deadlines. Example data; nothing is saved.
import { icon } from "../core/icons.js";
import { TOPICS, stateOf } from "./earth.js";

const $ = (s, el = document) => el.querySelector(s);
let ctx;

const START = 6, END = 23, SNAP = 0.25; // hours shown, and 15-minute snapping
const CALS = [
  { id: "class", name: "Classes", c: "3c78d8", site: "UnderGradify" },
  { id: "study", name: "Study time", c: "1fae8c", site: "MedGradify" },
  { id: "forge", name: "ForgeLab", c: "ff5a4d", site: "TechGradify · ForgeLab" },
  { id: "lang", name: "Spanish", c: "dd7d6b", site: "LanguageGradify" },
  { id: "health", name: "Health and fitness", c: "6a60ff", site: "SportGradify" },
  { id: "work", name: "Work", c: "e69138", site: "ProGradify" },
  { id: "free", name: "Free time", c: "a03fd8", site: null },
];
const calOf = (id) => CALS.find((c) => c.id === id);
const hidden = new Set();

let nextId = 1;
const B = (day, start, end, title, cal, extra = {}) => ({ id: nextId++, day, start, end, title, cal, ...extra });
const blocks = [
  B(0, 7, 8, "Gym", "health"), B(0, 9, 11, "Cardiovascular lecture", "class"), B(0, 14, 15.5, "Review: cardiac cycle", "study"), B(0, 19, 20.5, "ForgeLab: Unit 4", "forge"),
  B(1, 8, 8.5, "Spanish drill", "lang"), B(1, 10, 12, "Physiology lab", "class"), B(1, 14, 15, "Tutorial", "class"), B(1, 16, 19, "Part-time job", "work"),
  B(2, 7, 8, "Gym", "health"), B(2, 9, 10.5, "Pharmacology lecture", "class"), B(2, 13, 14, "Flashcards", "study"), B(2, 18, 19.5, "ForgeLab: backprop", "forge"), B(2, 20, 22, "Free time", "free"),
  B(3, 8, 8.5, "Spanish drill", "lang"), B(3, 9, 11, "Cardiovascular lecture", "class"), B(3, 14, 16, "Exam prep", "study"),
  B(4, 7, 8, "Gym", "health"), B(4, 11, 13, "Anatomy practical", "class"), B(4, 18, 19, "Unit 4 challenge", "forge"), B(4, 19.5, 22, "Free time", "free"),
  B(5, 8, 9, "Run", "health"), B(5, 9.25, 9.75, "Spanish drill", "lang"), B(5, 10, 12, "Weekly review", "study"), B(5, 13, 17, "Part-time job", "work"),
  B(6, 12, 16, "Free time", "free"),
];

let view = "week", selected = null, dayFocus = 0;
const weekStart = () => new Date(+ctx.today - ((ctx.today.getDay() + 6) % 7) * ctx.DAY);
const todayIdx = () => (ctx.today.getDay() + 6) % 7;
const hh = (h) => `${Math.floor(h)}:${String(Math.round((h % 1) * 60)).padStart(2, "0")}`;
const snap = (h) => Math.round(h / SNAP) * SNAP;
const dur = (b) => b.end - b.start;
const fmtDur = (h) => (h >= 1 ? `${Math.floor(h)}h${h % 1 ? ` ${Math.round((h % 1) * 60)}m` : ""}` : `${Math.round(h * 60)}m`);

// ---------- Render ----------
function days() {
  return view === "week" ? [0, 1, 2, 3, 4, 5, 6] : [dayFocus];
}
function render() {
  const ws = weekStart();
  const ds = days();
  const grid = $("#cal-grid");
  grid.style.setProperty("--cols", ds.length);
  $("#cal-steps").hidden = view === "week";
  const allDay = ctx.events().filter((e) => e.in >= -todayIdx() && e.in < 7 - todayIdx());
  $("#cal-title").textContent = view === "week"
    ? `${ctx.fmt(ws, { day: "numeric", month: "short" })} – ${ctx.fmt(new Date(+ws + 6 * ctx.DAY), { day: "numeric", month: "short", year: "numeric" })}`
    : ctx.fmt(new Date(+ws + dayFocus * ctx.DAY), { weekday: "long", day: "numeric", month: "long" });
  grid.innerHTML = `
    <div class="cal-corner"></div>
    ${ds.map((d) => {
      const date = new Date(+ws + d * ctx.DAY);
      const ad = allDay.filter((e) => e.in + todayIdx() === d);
      return `<div class="cal-dayhead ${d === todayIdx() ? "today" : ""}" data-day="${d}"><em>${ctx.fmt(date, { weekday: "short" })}</em><b>${date.getDate()}</b>
        <div class="allday">${ad.map((e) => `<span style="--c:#${ctx.colourOf(e.site)}" title="${ctx.esc(e.what)}">${ctx.esc(e.what)}</span>`).join("")}</div></div>`;
    }).join("")}
    <div class="cal-times">${Array.from({ length: END - START }, (_, i) => `<span>${START + i}:00</span>`).join("")}</div>
    ${ds.map((d) => `<div class="cal-col ${d === todayIdx() ? "today" : ""}" data-day="${d}">
      ${blocks.filter((b) => b.day === d && !hidden.has(b.cal)).map(blockHtml).join("")}
      ${d === todayIdx() ? `<i class="now-line" style="top:${pos(nowH())}"></i>` : ""}
    </div>`).join("")}`;
  renderSide();
}
const nowH = () => { const n = new Date(); return n.getHours() + n.getMinutes() / 60; };
const pos = (h) => `calc(${h - START} * var(--hr))`;
function blockHtml(b) {
  const c = calOf(b.cal);
  return `<div class="blk ${b.auto ? "auto" : ""} ${b.done ? "done" : ""} ${selected === b.id ? "sel" : ""} ${dur(b) < 0.75 ? "short" : ""} ${dur(b) <= 0.5 ? "tiny" : ""}" data-id="${b.id}" style="--c:#${c.c};top:${pos(b.start)};height:calc(${dur(b)} * var(--hr))" tabindex="0" role="button" aria-label="${ctx.esc(b.title)}, ${hh(b.start)} to ${hh(b.end)}">
    <b>${b.done ? "✓ " : ""}${ctx.esc(b.title)}</b><span>${hh(b.start)}–${hh(b.end)}</span><i class="grip" aria-hidden="true"></i></div>`;
}

function renderSide() {
  const week = blocks.filter((b) => !hidden.has(b.cal));
  $("#cal-list").innerHTML = CALS.map((c) => {
    const h = blocks.filter((b) => b.cal === c.id).reduce((a, b) => a + dur(b), 0);
    return `<label class="cal-item" style="--c:#${c.c}"><input type="checkbox" data-cal="${c.id}" ${hidden.has(c.id) ? "" : "checked"}><span class="tick" aria-hidden="true"></span><span class="nm">${c.name}</span><em>${fmtDur(h)}</em></label>`;
  }).join("");
  const study = week.filter((b) => ["study", "forge", "lang"].includes(b.cal)).reduce((a, b) => a + dur(b), 0);
  const total = week.reduce((a, b) => a + dur(b), 0);
  $("#cal-sum").innerHTML = `<div><b>${fmtDur(study)}</b><span>study planned</span></div><div><b>${fmtDur(total)}</b><span>blocked in total</span></div>
    <div class="cal-bar">${CALS.filter((c) => !hidden.has(c.id)).map((c) => { const h = blocks.filter((b) => b.cal === c.id).reduce((a, b) => a + dur(b), 0); return h ? `<i style="flex:${h};background:#${c.c}" title="${c.name}: ${fmtDur(h)}"></i>` : ""; }).join("")}</div>`;
  const b = blocks.find((x) => x.id === selected);
  $("#cal-edit").innerHTML = b ? `
    <span class="mini-label">Selected block</span>
    <input id="blk-title" class="blk-title" value="${ctx.esc(b.title)}" aria-label="Block title">
    <select id="blk-cal" aria-label="Calendar">${CALS.map((c) => `<option value="${c.id}" ${c.id === b.cal ? "selected" : ""}>${c.name}</option>`).join("")}</select>
    <span class="blk-when">${ctx.fmt(new Date(+weekStart() + b.day * ctx.DAY), { weekday: "long" })}, ${hh(b.start)}–${hh(b.end)} · ${fmtDur(dur(b))}</span>
    <div class="blk-actions">
      ${calOf(b.cal).site && !b.done ? '<button type="button" class="btn btn-light lg btn-sm" id="blk-done"><span>Mark done</span></button>' : ""}
      <button type="button" class="btn btn-ghost lg btn-sm" id="blk-del"><span>Delete</span></button>
    </div>` : `<p class="sub">Drag on the calendar to block out time. Click a block to rename it, change its calendar or mark it done.</p>`;
}

// ---------- Dragging ----------
let drag = null;
function hourAt(col, clientY) {
  const r = col.getBoundingClientRect();
  const hr = r.height / (END - START);
  return Math.min(END, Math.max(START, START + (clientY - r.top) / hr));
}
function colAt(clientX) {
  return [...document.querySelectorAll("#cal-grid .cal-col")].find((c) => { const r = c.getBoundingClientRect(); return clientX >= r.left && clientX < r.right; });
}
function onDown(e) {
  if (e.button !== 0) return;
  const blk = e.target.closest(".blk");
  const col = e.target.closest(".cal-col");
  if (!col) return;
  e.preventDefault();
  if (blk) {
    const b = blocks.find((x) => x.id === +blk.dataset.id);
    const resize = e.target.classList.contains("grip");
    drag = { mode: resize ? "resize" : "move", b, el: blk, x0: e.clientX, y0: e.clientY, off: hourAt(col, e.clientY) - b.start, moved: false };
  } else {
    const h = snap(hourAt(col, e.clientY));
    const ghost = document.createElement("div");
    ghost.className = "blk ghost";
    ghost.style.cssText = `--c:#${calOf("study").c};top:${pos(h)};height:calc(${SNAP} * var(--hr))`;
    col.appendChild(ghost);
    drag = { mode: "create", col, h0: h, el: ghost, start: h, end: h + SNAP };
  }
  addEventListener("pointermove", onMove);
  addEventListener("pointerup", onUp, { once: true });
}
function onMove(e) {
  if (!drag) return;
  if (drag.mode === "create") {
    const h = snap(hourAt(drag.col, e.clientY));
    drag.start = Math.min(drag.h0, h);
    drag.end = Math.max(drag.h0 + SNAP, h);
    drag.el.style.top = pos(drag.start);
    drag.el.style.height = `calc(${drag.end - drag.start} * var(--hr))`;
    drag.el.innerHTML = `<b>New block</b><span>${hh(drag.start)}–${hh(drag.end)}</span>`;
    return;
  }
  if (Math.abs(e.clientX - drag.x0) + Math.abs(e.clientY - drag.y0) > 4) drag.moved = true;
  if (!drag.moved) return;
  const b = drag.b;
  if (drag.mode === "resize") {
    const col = drag.el.parentElement;
    b.end = Math.max(b.start + SNAP, snap(hourAt(col, e.clientY)));
  } else {
    const col = colAt(e.clientX) || drag.el.parentElement;
    const len = dur(b);
    b.start = Math.min(END - len, Math.max(START, snap(hourAt(col, e.clientY) - drag.off)));
    b.end = b.start + len;
    if (col !== drag.el.parentElement) { col.appendChild(drag.el); b.day = +col.dataset.day; }
  }
  drag.el.style.top = pos(b.start);
  drag.el.style.height = `calc(${dur(b)} * var(--hr))`;
  drag.el.querySelector("span").textContent = `${hh(b.start)}–${hh(b.end)}`;
  drag.el.classList.add("dragging");
}
function onUp() {
  removeEventListener("pointermove", onMove);
  const d = drag;
  drag = null;
  if (!d) return;
  if (d.mode === "create") {
    if (d.end - d.start < SNAP) { d.el.remove(); return; }
    const b = B(+d.col.dataset.day, d.start, d.end, "New block", "study");
    blocks.push(b);
    selected = b.id;
    render();
    $("#blk-title").select();
    return;
  }
  selected = d.b.id;
  render();
}

// ---------- Auto-plan ----------
function gaps(day, from = 8, to = 21.5) {
  const busy = blocks.filter((b) => b.day === day).sort((a, b) => a.start - b.start);
  const out = [];
  let t = from;
  for (const b of busy) {
    if (b.start - 0.25 > t) out.push([t, b.start - 0.25]);
    t = Math.max(t, b.end + 0.25);
  }
  if (to > t) out.push([t, to]);
  return out;
}
function place(day, len, title, cal, prefer = 13) {
  const g = gaps(day).map(([a, b]) => [Math.max(a, prefer), b]).find(([a, b]) => b - a >= len)
    || gaps(day).find(([a, b]) => b - a >= len);
  if (!g) return null;
  const b = B(day, g[0], g[0] + len, title, cal, { auto: true });
  blocks.push(b);
  return b;
}
function autoPlan() {
  const fading = TOPICS.filter((t) => stateOf(t) === "fading");
  const ev = ctx.events();
  const forgeDue = ev.find((e) => e.site === "TechGradify · ForgeLab" && !e.planned);
  const made = [];
  for (let d = todayIdx(); d < 7; d++) {
    const hasLang = blocks.some((b) => b.day === d && b.cal === "lang");
    const t = fading[(d - todayIdx()) % Math.max(1, fading.length)];
    if (t) made.push(place(d, 0.75, `Review: ${t.name.replace(/^The /, "")}`, "study"));
    if (forgeDue && d < todayIdx() + forgeDue.in) made.push(place(d, 1, "ForgeLab: unit challenge prep", "forge", 17));
    if (!hasLang && d < 6) made.push(place(d, 0.33, "Spanish speaking", "lang", 8));
    made.push(place(d, 0.33, "Flashcard feed", "study", 12));
  }
  const ok = made.filter(Boolean);
  const hrs = ok.reduce((a, b) => a + dur(b), 0);
  render();
  ctx.toast(`Auto-planned ${ok.length} blocks (${fmtDur(hrs)}) around your classes, work and free time. Dashed blocks are the new ones. <button type="button" class="linkish" id="undo-auto">Undo</button>`, true);
}

export function initCalendar(context) {
  ctx = context;
  const root = $("#plan-cal");
  if (matchMedia("(max-width: 640px)").matches) { view = "day"; dayFocus = todayIdx(); }
  root.querySelectorAll("[data-calview]").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.calview === view)));
  root.querySelector("#cal-grid").addEventListener("pointerdown", onDown);
  root.addEventListener("click", (e) => {
    const blk = e.target.closest(".blk:not(.ghost)");
    if (blk && !e.target.classList.contains("grip")) { selected = +blk.dataset.id; render(); return; }
    const v = e.target.closest("[data-calview]");
    if (v) { view = v.dataset.calview; if (view === "day") dayFocus = todayIdx(); root.querySelectorAll("[data-calview]").forEach((x) => x.setAttribute("aria-pressed", String(x === v))); render(); return; }
    const head = e.target.closest(".cal-dayhead");
    if (head && view === "week") { view = "day"; dayFocus = +head.dataset.day; root.querySelectorAll("[data-calview]").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.calview === "day"))); render(); return; }
    const step = e.target.closest("[data-step]");
    if (step && view === "day") { dayFocus = (dayFocus + +step.dataset.step + 7) % 7; render(); return; }
    if (e.target.closest("#auto-plan")) { autoPlan(); return; }
    if (e.target.closest("#blk-del")) { blocks.splice(blocks.findIndex((b) => b.id === selected), 1); selected = null; render(); return; }
    if (e.target.closest("#blk-done")) {
      const b = blocks.find((x) => x.id === selected);
      b.done = true;
      ctx.logActivity(calOf(b.cal).site, `Finished time block “${b.title}”`, "block", Math.round(dur(b) * 20));
      render();
    }
  });
  root.addEventListener("input", (e) => {
    const b = blocks.find((x) => x.id === selected);
    if (!b) return;
    if (e.target.id === "blk-title") { b.title = e.target.value; const el = root.querySelector(`.blk[data-id="${b.id}"] b`); if (el) el.textContent = b.title; }
  });
  root.addEventListener("change", (e) => {
    if (e.target.dataset.cal) { if (e.target.checked) hidden.delete(e.target.dataset.cal); else hidden.add(e.target.dataset.cal); render(); }
    if (e.target.id === "blk-cal") { blocks.find((x) => x.id === selected).cal = e.target.value; render(); }
  });
  root.addEventListener("keydown", (e) => {
    const blk = e.target.closest(".blk");
    if (blk && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); selected = +blk.dataset.id; render(); root.querySelector(`.blk[data-id="${selected}"]`)?.focus(); }
    if (blk && (e.key === "Delete" || e.key === "Backspace")) { blocks.splice(blocks.findIndex((b) => b.id === +blk.dataset.id), 1); selected = null; render(); }
  });
  document.addEventListener("click", (e) => {
    if (e.target.id !== "undo-auto") return;
    for (let i = blocks.length - 1; i >= 0; i--) if (blocks[i].auto) blocks.splice(i, 1);
    render();
    ctx.toast("Removed the auto-planned blocks.");
  });
  document.addEventListener("lifeos:view", (e) => {
    if (e.detail !== "plan") return;
    render();
    const sc = $("#cal-scroll");
    sc.scrollTop = (8 - START) * parseFloat(getComputedStyle(sc).getPropertyValue("--hr"));
  });
  document.addEventListener("lifeos:events", render);
  render();
}
