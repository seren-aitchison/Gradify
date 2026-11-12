// Chronology: put dated events in order, round by round, from the Norman Conquest to the end of the Cold War. Every
// date is a well-established one. Keyboard: Tab to an event, then the up and down buttons move it.
import { shell, esc } from "../lab.js";

export const ROUNDS = [
  { id: "medieval", title: "Medieval England", events: [[1066, "Battle of Hastings"], [1086, "Domesday survey"], [1170, "Murder of Thomas Becket"], [1215, "Magna Carta agreed"], [1348, "Black Death reaches England"], [1381, "Peasants' Revolt"]] },
  { id: "early-modern", title: "Tudors and Stuarts", events: [[1485, "Battle of Bosworth"], [1534, "Act of Supremacy"], [1588, "Spanish Armada"], [1603, "Union of the Crowns"], [1649, "Execution of Charles I"], [1688, "Glorious Revolution"]] },
  { id: "industry", title: "Industry and reform", events: [[1819, "Peterloo Massacre"], [1825, "Stockton and Darlington Railway opens"], [1832, "Great Reform Act"], [1833, "Factory Act"], [1838, "People's Charter published"], [1918, "Representation of the People Act"]] },
  { id: "twentieth", title: "The twentieth century", events: [[1914, "Outbreak of the First World War"], [1917, "October Revolution in Russia"], [1933, "Hitler becomes Chancellor"], [1939, "Germany invades Poland"], [1948, "The NHS is founded"], [1961, "The Berlin Wall is built"], [1989, "The Berlin Wall falls"], [1991, "The Soviet Union is dissolved"]] },
];
// a stable shuffle that never starts in the right order
export function shuffled(events, seed) {
  let s = [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7), out = events.map((e) => [((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32), e]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
  if (out.every((e, i) => e === events[i])) out = [...out.slice(1), out[0]];
  return out;
}
export const inOrder = (list) => list.every((e, i) => !i || list[i - 1][0] <= e[0]);

export function mount(el, ctx = {}) {
  ctx.declare?.(ROUNDS.map((r) => ({ id: r.id, text: `Order the events: ${r.title}` })));
  const $ = shell(el, `<div class="sx-panel hx-chrono"></div>`), host = $(".hx-chrono");
  let r = 0, order = shuffled(ROUNDS[0].events, ROUNDS[0].id), checked = false;
  const paint = (msg = "") => {
    const R = ROUNDS[r];
    host.innerHTML = `<div class="sx-head"><b>Chronology: ${esc(R.title)}</b><span>Round ${r + 1} of ${ROUNDS.length}</span></div>
      <p class="sx-intro">Put the events in order, earliest at the top. Use the arrows to move an event, then check.</p>
      <ol class="hx-list">${order.map((e, i) => `<li><span>${esc(e[1])}${checked ? ` <b>${e[0]}</b>` : ""}</span><span class="hx-move"><button type="button" class="lab-btn" data-up="${i}" ${i ? "" : "disabled"} aria-label="Move ${esc(e[1])} earlier">↑</button><button type="button" class="lab-btn" data-down="${i}" ${i < order.length - 1 ? "" : "disabled"} aria-label="Move ${esc(e[1])} later">↓</button></span></li>`).join("")}</ol>
      <div class="sx-nav"><button type="button" class="lab-btn pri" data-check>Check the order</button><button type="button" class="lab-btn" data-next ${r < ROUNDS.length - 1 ? "" : "disabled"}>Next round →</button></div>
      <p class="sx-fb" aria-live="polite">${msg}</p>`;
  };
  host.addEventListener("click", (e) => {
    const up = e.target.closest("[data-up]"), down = e.target.closest("[data-down]");
    if (up || down) { const i = Number((up || down).dataset[up ? "up" : "down"]), j = up ? i - 1 : i + 1; [order[i], order[j]] = [order[j], order[i]]; checked = false; paint(); host.querySelector(`[data-${up ? "up" : "down"}="${j}"]`)?.focus(); return; }
    if (e.target.closest("[data-next]")) { r = Math.min(ROUNDS.length - 1, r + 1); order = shuffled(ROUNDS[r].events, ROUNDS[r].id); checked = false; paint(); return; }
    if (e.target.closest("[data-check]")) {
      const R = ROUNDS[r], right = order.filter((ev, i) => ev === R.events[i]).length; checked = true;
      if (inOrder(order)) { ctx.complete?.(R.id, `Ordered: ${R.title}`); paint(`<b>All in order.</b> Notice the gaps as well as the order: how long separates each event from the next?`); }
      else { ctx.fail?.(R.id, `Ordering: ${R.title}`); paint(`<b>${right} of ${order.length} in the right place.</b> The dates are now shown; move the others and check again.`); }
    }
  });
  paint();
}
