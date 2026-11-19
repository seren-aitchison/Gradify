// The mastery map, drawn (data: kit/learning/mastery-map.js). Chapters read left to right from foundations outwards,
// lines show what builds on what, and each chapter wears its mastery level. Above it: the levels with counts, what's
// within reach next, and what's holding the most back.
//
//   renderMasteryMap(el, map, { hrefOf: (node) => url, unitWord: "School", title })
//
// Nodes are real links (keyboard and screen readers reach them in order); focusing or hovering one highlights the
// chapters it builds on and those that build on it. The map scrolls sideways on small screens.
import { esc, ensureStyles } from "./store.js";
import { LEVELS, LEVEL } from "../learning/mastery-map.js";

const COL = 236, W = 200, H = 64, GAP = 14, PAD = 16;

export function renderMasteryMap(el, map, { hrefOf = () => "#", unitWord = "Chapter", title = "Mastery map", intro = "" } = {}) {
  ensureStyles();
  const { nodes, edges, layers, nextUp, holding, summary } = map;
  const rows = Math.max(1, ...layers.map((c) => c?.length || 0));
  const width = PAD * 2 + Math.max(1, layers.length) * COL - (COL - W), height = PAD * 2 + rows * (H + GAP) - GAP;
  // centre each column vertically so the map reads as a shape, not a list
  const pos = new Map();
  layers.forEach((col, li) => { const off = ((rows - col.length) * (H + GAP)) / 2; col.forEach((x, ri) => pos.set(x.n, { x: PAD + li * COL, y: PAD + off + ri * (H + GAP) })); });
  const path = (e) => { const a = pos.get(e.from), b = pos.get(e.to); if (!a || !b) return ""; const x1 = a.x + W, y1 = a.y + H / 2, x2 = b.x, y2 = b.y + H / 2, m = (x1 + x2) / 2; return `<path d="M${x1} ${y1} C${m} ${y1} ${m} ${y2} ${x2} ${y2}" data-from="${e.from}" data-to="${e.to}"/>`; };
  const byN = new Map(nodes.map((x) => [x.n, x]));
  const chip = (x, extra = "") => `<a class="gx-mm-chip lv-${x.level}" href="${esc(hrefOf(x))}"><i aria-hidden="true"></i><span><b>${esc(unitWord)} ${x.n}: ${esc(x.title)}</b><small>${esc(LEVEL[x.level].label)}${extra}</small></span></a>`;
  el.classList.add("gx-mm");
  el.innerHTML = `<header class="gx-mm-head"><div><h3>${esc(title)}</h3>${intro ? `<p>${esc(intro)}</p>` : ""}</div>
      <ul class="gx-mm-legend" aria-label="Mastery levels">${LEVELS.map((l) => `<li class="lv-${l.key}" title="${esc(l.what)}"><i aria-hidden="true"></i>${esc(l.label)} <b>${summary[l.key]}</b></li>`).join("")}${summary.revise ? `<li class="lv-revise" title="Recent answers have slipped"><i aria-hidden="true"></i>Needs revision <b>${summary.revise}</b></li>` : ""}</ul></header>
    ${nextUp.length || holding.length ? `<div class="gx-mm-asides">
      ${nextUp.length ? `<section><span class="gx-kicker">Within reach</span>${nextUp.slice(0, 3).map((x) => chip(x, !x.pre.length ? " · a starting point" : x.pre.every((p) => LEVEL[byN.get(p).level].rank >= LEVEL.proficient.rank) ? " · its foundations are in place" : " · its foundations are under way")).join("")}</section>` : ""}
      ${holding.length ? `<section><span class="gx-kicker">Holding you back</span>${holding.map((x) => chip(x, `${x.revise ? " · answers have slipped" : ""}${x.unlocks ? ` · ${x.unlocks} ${x.unlocks === 1 ? "chapter builds" : "chapters build"} on it` : ""}`)).join("")}</section>` : ""}
    </div>` : ""}
    <div class="gx-mm-scroll" tabindex="0" aria-label="${esc(title)}: chapters from foundations (left) to advanced (right)">
      <div class="gx-mm-canvas" style="width:${width}px;height:${height}px">
        <svg class="gx-mm-edges" width="${width}" height="${height}" aria-hidden="true">${edges.map(path).join("")}</svg>
        ${nodes.map((x) => { const p = pos.get(x.n); return `<a class="gx-mm-node lv-${x.level}${x.revise ? " revise" : ""}" href="${esc(hrefOf(x))}" data-n="${x.n}" style="left:${p.x}px;top:${p.y}px;width:${W}px;height:${H}px" aria-label="${esc(`${unitWord} ${x.n}: ${x.title}. ${LEVEL[x.level].label}${x.revise ? ", needs revision" : ""}. ${x.pre.length ? `Builds on ${x.pre.join(", ")}.` : "A starting point."}`)}">
          <span class="gx-mm-n">${x.n}</span><span class="gx-mm-t">${esc(x.title)}</span><span class="gx-mm-bar"><i style="width:${Math.round(x.score * 100)}%"></i></span></a>`; }).join("")}
      </div></div>`;
  // the chapters around the one in focus
  const canvas = el.querySelector(".gx-mm-canvas");
  const related = (n) => { const up = new Set(), down = new Set(); const goUp = (k) => (byN.get(k)?.pre || []).forEach((p) => { if (!up.has(p)) { up.add(p); goUp(p); } }); const goDown = (k) => (byN.get(k)?.next || []).forEach((q) => { if (!down.has(q)) { down.add(q); goDown(q); } }); goUp(n); goDown(n); return { up, down }; };
  const light = (n) => {
    if (n == null) { canvas.classList.remove("focus"); canvas.querySelectorAll(".on, .up, .down").forEach((x) => x.classList.remove("on", "up", "down")); return; }
    const { up, down } = related(n); canvas.classList.add("focus");
    canvas.querySelectorAll(".gx-mm-node").forEach((a) => { const k = Number(a.dataset.n); a.classList.toggle("on", k === n); a.classList.toggle("up", up.has(k)); a.classList.toggle("down", down.has(k)); });
    canvas.querySelectorAll("path").forEach((p) => { const f = Number(p.dataset.from), t = Number(p.dataset.to); const onUp = (t === n || up.has(t)) && (up.has(f)); const onDown = (f === n || down.has(f)) && down.has(t); p.classList.toggle("up", onUp); p.classList.toggle("down", onDown); });
  };
  canvas.addEventListener("pointerover", (e) => { const a = e.target.closest(".gx-mm-node"); light(a ? Number(a.dataset.n) : null); });
  canvas.addEventListener("pointerleave", () => light(null));
  canvas.addEventListener("focusin", (e) => { const a = e.target.closest(".gx-mm-node"); if (a) light(Number(a.dataset.n)); });
  canvas.addEventListener("focusout", () => light(null));
  return { light };
}
