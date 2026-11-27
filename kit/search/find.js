// Find inside the page you're reading: a lesson's sections, terms and worked examples (Shift+F in a lesson, or
// "In this lesson" in quick search). Every match is marked, the bar says "3 of 12", ↵ / Shift+↵ (or the arrows) move
// between them, a match inside a closed section opens it, and the sections that match are listed to jump to.
//
//   const find = mountFind({ root: () => main.querySelector(".co-notes"), label: "Find in this lesson" });
//   find.open("equilibrium")      find.hits("equilibrium") → [{ id, title, count, snippet }] (for quick search)
//   find.close()
// The matching is the search engine's (kit/search/engine.js findInSections): words match their stems and the start
// of longer words, "quoted phrases" match as written.
import { esc, ensureStyles } from "../ui/store.js";
import { uiIcon } from "../ui/icons.js";
import { parseQuery } from "./query.js";
import { findInSections, stem } from "./engine.js";

const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** the pattern that marks a query's words and phrases in text (pure) */
export function findPattern(raw) {
  const q = parseQuery(raw), alts = [];
  // a phrase ends where a word does ("cell wall", not "cell wallpaper"); a word may be the start of a longer one
  for (const p of q.phrases) alts.push(`${p.split(" ").map(reEsc).join("[\\s\\-–]+")}(?![\\p{L}\\p{N}])`);
  for (const w of q.terms) { const s = stem(w); alts.push(`${reEsc(s.length >= 3 && s.length < w.length ? s : w)}[\\p{L}\\p{N}]*`); }
  return alts.length ? new RegExp(`(?<![\\p{L}\\p{N}])(?:${alts.sort((a, b) => b.length - a.length).join("|")})`, "giu") : null;
}
/** a page's sections: [{ id, title, text, el }] (each <section> with an id, or the root as one section) */
export function sectionsOf(root) {
  if (!root) return [];
  const list = [...root.querySelectorAll("section[id]")];
  return (list.length ? list : [root]).map((el, i) => ({ id: el.id || `gx-find-s${i}`, title: el.querySelector("h2, h3, h4")?.textContent.trim() || "", text: el.textContent || "", el }));
}

export function mountFind({ root, label = "Find in this page", onJump = null } = {}) {
  ensureStyles();
  let bar = null, input = null, marks = [], at = -1, timer = 0;
  const host = () => (typeof root === "function" ? root() : root);
  function clear() {
    const parents = new Set();
    for (const m of marks) { const t = document.createTextNode(m.textContent); const p = m.parentNode; m.replaceWith(t); if (p) parents.add(p); }
    parents.forEach((p) => p.normalize());
    marks = []; groups = []; at = -1;
  }
  // matched on each block's text as read (so "cell **wall**" is one phrase), then marked node by node: one match can be
  // several <mark>s (across bold, italics, links), moved to as one
  let groups = [];
  function mark(raw) {
    clear(); groups = [];
    const el = host(), re = findPattern(raw); if (!el || !re) return 0;
    const skip = (n) => n.parentElement?.closest("script, style, textarea, input, select, .gx-findbar, mark.gx-find");
    // every text node, grouped by the block it reads in (inline formatting, links and code stay in their sentence)
    const BLOCK = "p, li, h1, h2, h3, h4, h5, h6, td, th, dt, dd, figcaption, blockquote, summary, div, section, article, details, header, footer, aside, ol, ul, table, figure, pre, label, button";
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (skip(n) || !n.nodeValue ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
    const runs = []; let cur = null;
    while (walk.nextNode()) {
      const n = walk.currentNode, blk = n.parentElement.closest(BLOCK) || el;
      if (!cur || cur.blk !== blk) { cur = { blk, nodes: [], text: "" }; runs.push(cur); }
      cur.nodes.push({ n, at: cur.text.length }); cur.text += n.nodeValue;
    }
    for (const { nodes, text } of runs) {
      if (!text.trim()) continue;
      re.lastIndex = 0; let m; const found = [];
      while ((m = re.exec(text))) { if (!m[0]) { re.lastIndex++; continue; } found.push([m.index, m.index + m[0].length]); if (found.length > 200) break; }
      // wrap from the last match back, so earlier offsets stay true
      const made = [];
      for (const [s0, e0] of found.reverse()) {
        const group = [];
        for (const { n, at } of [...nodes].reverse()) {
          const end = at + n.nodeValue.length; if (end <= s0 || at >= e0) continue;
          const a0 = Math.max(0, s0 - at), b0 = Math.min(n.nodeValue.length, e0 - at);
          const mid = n.splitText(a0); mid.splitText(b0 - a0);
          const mk = Object.assign(document.createElement("mark"), { className: "gx-find", textContent: mid.nodeValue });
          mid.replaceWith(mk); group.unshift(mk);
        }
        made.unshift(group);
      }
      for (const g of made) { groups.push(g); marks.push(...g); }
      if (groups.length > 999) break;
    }
    return groups.length;
  }
  function show(i) {
    if (!groups.length) { count(); return; }
    groups[at]?.forEach((x) => x.classList.remove("on"));
    at = (i + groups.length) % groups.length;
    const m = groups[at][0];
    groups[at].forEach((x) => x.classList.add("on"));
    // a match inside a closed part opens it
    for (let d = m.closest("details:not([open])"); d; d = d.parentElement?.closest("details:not([open])")) d.open = true;
    m.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    count(); onJump?.(m);
  }
  function count() {
    if (!bar) return;
    const n = groups.length, raw = input.value.trim();
    bar.querySelector(".gx-findn").textContent = !raw ? "" : n ? `${at + 1} of ${n >= 1000 ? "1000+" : n}` : "No matches";
    bar.querySelectorAll("[data-step]").forEach((b) => { b.disabled = n < 2; });
    const list = bar.querySelector(".gx-findl");
    const secs = raw ? findInSections(sectionsOf(host()).filter((s) => s.title), parseQuery(raw)) : [];
    list.innerHTML = secs.length > 1 ? secs.slice(0, 8).map((s) => `<li><button type="button" data-sec="${esc(s.id)}"><b>${esc(s.title)}</b><small>${s.count} match${s.count === 1 ? "" : "es"}</small></button></li>`).join("") : "";
    list.hidden = !list.innerHTML;
  }
  function run() { mark(input.value); show(0); }
  function open(q = "", sectionId = null) {
    if (!bar) {
      bar = document.createElement("div"); bar.className = "gx-findbar"; bar.setAttribute("role", "search");
      bar.innerHTML = `<label>${uiIcon("search")}<span class="sr-only">${esc(label)}</span><input type="search" placeholder="${esc(label)}…" spellcheck="false" enterkeyhint="search"></label>
        <span class="gx-findn" aria-live="polite"></span>
        <button type="button" class="gx-ib" data-step="-1" aria-label="Previous match" title="Previous (Shift+Enter)">${uiIcon("up")}</button>
        <button type="button" class="gx-ib" data-step="1" aria-label="Next match" title="Next (Enter)"><span style="display:inline-block;transform:rotate(180deg)">${uiIcon("up")}</span></button>
        <button type="button" class="gx-ib" data-close aria-label="Close find" title="Close (Esc)">${uiIcon("close")}</button>
        <ul class="gx-findl" aria-label="Sections that match" hidden></ul>`;
      document.body.append(bar);
      input = bar.querySelector("input");
      input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(run, 120); });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); show(at + (e.shiftKey ? -1 : 1)); }
        else if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(); }
        else if (e.key === "ArrowDown") { e.preventDefault(); show(at + 1); } else if (e.key === "ArrowUp") { e.preventDefault(); show(at - 1); }
      });
      bar.addEventListener("click", (e) => {
        const st = e.target.closest("[data-step]"); if (st) { show(at + Number(st.dataset.step)); return; }
        if (e.target.closest("[data-close]")) { close(); return; }
        const sc = e.target.closest("[data-sec]"); if (sc) { const i = groups.findIndex((g) => g[0].closest(`[id="${CSS.escape(sc.dataset.sec)}"]`)); if (i >= 0) show(i); }
      });
      addEventListener("hashchange", close, { once: true });
    }
    input.value = q; input.focus(); input.select();
    mark(q);
    const first = sectionId ? groups.findIndex((g) => g[0].closest(`[id="${CSS.escape(sectionId)}"]`)) : 0;
    show(Math.max(0, first));
  }
  function close() { clearTimeout(timer); clear(); bar?.remove(); bar = null; input = null; }
  return {
    open, close, get isOpen() { return Boolean(bar); },
    /** the sections of this page that match, for quick search */
    hits: (raw) => findInSections(sectionsOf(host()).filter((s) => s.title), parseQuery(raw)),
  };
}
