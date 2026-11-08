// The timeline: reigns, wars and events from 1066 to 1991 on one scale, so duration, overlap and gaps are visible.
// Every date is a well-established one. Challenges ask questions the timeline answers.
import { shell, esc } from "../lab.js";

export const START = 1066, END = 1991;
export const BANDS = [
  { id: "normans", name: "Normans", from: 1066, to: 1154 }, { id: "plantagenets", name: "Plantagenets", from: 1154, to: 1485 },
  { id: "tudors", name: "Tudors", from: 1485, to: 1603 }, { id: "stuarts", name: "Stuarts", from: 1603, to: 1714 },
  { id: "victoria", name: "Victoria", from: 1837, to: 1901 }, { id: "ww1", name: "First World War", from: 1914, to: 1918 },
  { id: "ww2", name: "Second World War", from: 1939, to: 1945 }, { id: "coldwar", name: "Cold War", from: 1947, to: 1991 },
];
export const EVENTS = [
  [1066, "Battle of Hastings"], [1086, "Domesday survey"], [1170, "Murder of Thomas Becket"], [1215, "Magna Carta"], [1265, "Simon de Montfort's parliament"],
  [1348, "Black Death reaches England"], [1381, "Peasants' Revolt"], [1485, "Battle of Bosworth"], [1534, "Act of Supremacy"], [1588, "Spanish Armada"],
  [1642, "Civil War begins"], [1649, "Execution of Charles I"], [1688, "Glorious Revolution"], [1832, "Great Reform Act"], [1914, "First World War begins"],
  [1918, "Women over 30 gain the vote"], [1933, "Hitler becomes chancellor"], [1945, "Second World War ends"], [1948, "NHS founded"], [1989, "Berlin Wall falls"],
];
export const CHALLENGES = [
  { id: "longest", q: "Which dynasty ruled England for longer: the Tudors or the Stuarts (to 1714)?", options: ["The Tudors", "The Stuarts", "They ruled for exactly the same time"], answer: 0, why: "Tudors 1485–1603 is 118 years; Stuarts 1603–1714 is 111 years (with the interruption of 1649–1660)." },
  { id: "during", q: "Which of these happened during the reign of the Tudors?", options: ["The Spanish Armada", "Magna Carta", "The Glorious Revolution", "The Peasants' Revolt"], answer: 0, why: "The Armada sailed in 1588, under Elizabeth I; the others fall outside 1485–1603." },
  { id: "gap", q: "How many years separate Magna Carta and the Great Reform Act?", numeric: 617, why: "1832 − 1215 = 617 years." },
  { id: "overlap", q: "Which of these is the latest event that fell inside the Cold War (1947–1991)?", options: ["The founding of the NHS", "The fall of the Berlin Wall", "Hitler becoming chancellor", "Women over 30 gaining the vote"], answer: 1, why: "Both the NHS (1948) and the fall of the Berlin Wall (1989) fall inside 1947–1991; the Wall's fall is the later. The others are before 1947." },
];

const pct = (y) => ((y - START) / (END - START)) * 100;
export function mount(el, ctx = {}) {
  ctx.declare?.(CHALLENGES.map((c) => ({ id: c.id, text: c.q })));
  const $ = shell(el, `<div class="sx-panel hx-tl"><div class="sx-head"><b>Timeline, 1066–1991</b><span>Select an event or a period for its dates</span></div>
    <div class="hx-axis" role="group" aria-label="Periods and events from 1066 to 1991">
      <div class="hx-bands">${BANDS.map((b) => `<button type="button" class="hx-band${pct(b.to) - pct(b.from) < 4 ? " tiny" : ""}" data-band="${b.id}" style="left:${pct(b.from)}%;width:${Math.max(0.8, pct(b.to) - pct(b.from))}%" aria-label="${esc(b.name)}, ${b.from} to ${b.to}"><span>${esc(b.name)}</span></button>`).join("")}</div>
      <div class="hx-events">${EVENTS.map(([y, t], i) => `<button type="button" class="hx-ev" data-ev="${i}" style="left:${pct(y)}%" aria-label="${y}: ${esc(t)}"></button>`).join("")}</div>
      <div class="hx-ticks">${[1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900].map((y) => `<span style="left:${pct(y)}%">${y}</span>`).join("")}</div>
    </div>
    <p class="hx-detail" aria-live="polite">Each dot is an event; each bar is a reign or a war. Notice how long the gaps are, and how short the world wars look on a scale of nine centuries.</p>
    <div class="hx-challenges"></div></div>`);
  const detail = $(".hx-detail");
  $.root.addEventListener("click", (e) => {
    const b = e.target.closest("[data-band]"), ev = e.target.closest("[data-ev]");
    if (b) { const x = BANDS.find((y) => y.id === b.dataset.band); detail.innerHTML = `<b>${esc(x.name)}</b>: ${x.from}–${x.to}, ${x.to - x.from} years.`; }
    if (ev) { const [y, t] = EVENTS[Number(ev.dataset.ev)]; detail.innerHTML = `<b>${y}</b>: ${esc(t)}.`; }
  });
  const host = $(".hx-challenges");
  host.innerHTML = CHALLENGES.map((c) => `<article class="sx-case" data-c="${c.id}"><p class="sx-q">${esc(c.q)}</p>${c.numeric != null
    ? `<label class="hx-num">Years <input type="number" inputmode="numeric" aria-label="Number of years"></label><button type="button" class="lab-btn pri" data-check>Check</button>`
    : `<div class="sx-opts" role="group" aria-label="Answers">${c.options.map((o, j) => `<button type="button" data-j="${j}">${esc(o)}</button>`).join("")}</div>`}<p class="sx-fb" aria-live="polite"></p></article>`).join("");
  host.addEventListener("click", (e) => {
    const card = e.target.closest("[data-c]"); if (!card) return;
    const c = CHALLENGES.find((x) => x.id === card.dataset.c), fb = card.querySelector(".sx-fb");
    let ok = null;
    if (e.target.closest("[data-j]")) { const j = Number(e.target.closest("[data-j]").dataset.j); ok = j === c.answer; card.querySelectorAll("[data-j]").forEach((x) => x.classList.remove("ok", "no")); e.target.closest("[data-j]").classList.add(ok ? "ok" : "no"); }
    if (e.target.closest("[data-check]")) ok = Number(card.querySelector("input").value) === c.numeric;
    if (ok == null) return;
    fb.className = `sx-fb ${ok ? "ok" : "no"}`; fb.innerHTML = `<b>${ok ? "Yes." : "Not quite."}</b> ${ok ? esc(c.why) : "Use the timeline: select the periods or events to read their dates."}`;
    if (ok) ctx.complete?.(c.id, c.q.slice(0, 60)); else ctx.fail?.(c.id, c.q.slice(0, 60));
  });
}
