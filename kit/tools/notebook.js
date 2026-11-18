// The Notebook (app.html#/tools/notebook): personal notes in linked pages, like RemNote or Notion.
//   [[Page name]] links to a page (made when you open it), and every page lists the pages that link to it.
//   Pages are customisable: a colour, an emoji, and templates (lecture notes, Cornell notes, revision checklist).
//   Any line can become a flashcard: write it in the flashcard creator's syntax (Front >> Back, Term :: Definition,
//   {{cloze}}), or select a line and press "Make a card". Every card in the notebook is gathered into one deck,
//   "My notebook", scheduled with spaced repetition like every other deck.
// Kept with Tools (kit/tools/store.js): in this browser, and in the learner's account when signed in.
import { pages, page, savePage, deletePage, deck, saveDeck } from "./store.js";
import { parseDeck } from "./cards.js";
import { backLink, esc } from "./tools.js";

const NOTEBOOK_DECK = "dnotebook";
export const TEMPLATES = {
  blank: { name: "Blank page", text: "" },
  lecture: { name: "Lecture notes", text: "# Lecture: \nDate: \nModule: \n\n## Key points\n- \n\n## Terms\nTerm :: Definition\n\n## Questions to follow up\n- \n\nLinks: [[Module overview]]" },
  cornell: { name: "Cornell notes", text: "## Cues and questions\nWhat is …? >> \n\n## Notes\n- \n\n## Summary\n" },
  checklist: { name: "Revision checklist", text: "## To revise\n- [ ] \n- [ ] \n\n## Confident\n- [x] \n" },
  daily: { name: "Daily journal", text: `# ${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}\n\n## Studied today\n- \n\n## Tomorrow\n- [ ] ` },
};
const COLOURS = ["#4641ff", "#f055dd", "#ff5a4d", "#ffc002", "#1fae8c", "#3c78d8", "#8b3dff"];

/** The [[links]] in a page's text. Pure. */
export const linksIn = (text) => [...new Set([...String(text ?? "").matchAll(/\[\[([^\]\n]{1,120})\]\]/g)].map((m) => m[1].trim()))];
/** Pages that link to `title`. Pure. */
export const backlinks = (all, title) => all.filter((p) => linksIn(p.text).some((l) => l.toLowerCase() === String(title).toLowerCase()));
/** A line turned into a card: "Term: definition" → "Term :: definition", a question → "Question >> ", anything else a cloze on its longest word. Pure. */
export function lineToCard(line) {
  const t = line.replace(/^\s*[-•*]\s+/, "").trim();
  if (!t || />>|<<|::|<>|\{\{/.test(t)) return line;
  const m = t.match(/^(.{2,80}?)\s*[:–—-]\s+(.+)$/);
  if (m) return `${m[1]} :: ${m[2]}`;
  if (/\?$/.test(t)) return `${t} >> `;
  const w = t.split(/\s+/).filter((x) => x.replace(/[^a-z]/gi, "").length > 4).sort((a, b) => b.length - a.length)[0];
  return w ? t.replace(w, `{{${w.replace(/[.,;:!?]+$/, "")}}}${w.match(/[.,;:!?]+$/)?.[0] || ""}`) : `${t} >> `;
}
/** Every card line in every page, as one deck's text, a heading per page. Pure. */
export function notebookDeckText(all) {
  return all.map((p) => { const lines = String(p.text || "").split("\n").filter((l) => />>|<<|::|<>|\{\{/.test(l)); return lines.length ? `# ${p.title}\n${lines.join("\n")}` : ""; }).filter(Boolean).join("\n\n");
}
/** A page's text as HTML: headings, lists, checkboxes, bold, italic, [[links]], and cards marked as cards. */
export function pageHtml(text, exists = () => true) {
  const inline = (s) => esc(s).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/(^|[^*])\*([^*]+)\*/g, "$1<i>$2</i>").replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[\[([^\]]+)\]\]/g, (_, t) => `<a href="#/tools/notebook/open/${encodeURIComponent(t.trim())}" class="nb-link ${exists(t.trim()) ? "" : "new"}">${t}</a>`);
  const out = []; let list = false;
  for (const raw of String(text ?? "").split("\n")) {
    const l = raw.trimEnd(), card = />>|<<|::|<>|\{\{/.test(l);
    const li = l.match(/^\s*[-•*]\s+(.*)$/);
    if (li && !list) { out.push("<ul>"); list = true; } else if (!li && list) { out.push("</ul>"); list = false; }
    if (card) { const c = parseDeck(l)[0]; out.push(c ? `<div class="nb-card"><span class="tl-k">Card</span><b>${inline(c.front.replace(/\{\{…\}\}/g, "___"))}</b><span>${inline(c.back.replace(/\*\*/g, ""))}</span></div>` : `<p>${inline(l)}</p>`); continue; }
    if (li) { const box = li[1].match(/^\[( |x)\]\s*(.*)$/i); out.push(box ? `<li class="nb-check"><input type="checkbox" disabled ${box[1].trim() ? "checked" : ""}> ${inline(box[2])}</li>` : `<li>${inline(li[1])}</li>`); continue; }
    const h = l.match(/^(#{1,3})\s+(.*)$/);
    if (h) out.push(`<h${h[1].length + 1}>${inline(h[2])}</h${h[1].length + 1}>`);
    else if (l.trim()) out.push(`<p>${inline(l)}</p>`);
  }
  if (list) out.push("</ul>");
  return out.join("");
}

export async function renderNotebook(view, ctx, [act, arg]) {
  if (act === "open" && arg) {
    // open a page by its title, making it if it's new
    const title = decodeURIComponent(arg), p = pages().find((x) => x.title.toLowerCase() === title.toLowerCase()) || savePage({ title, text: "", colour: COLOURS[pages().length % COLOURS.length], emoji: "📄" });
    location.replace(`#/tools/notebook/${p.id}`); return;
  }
  const all = pages();
  let cur = act && act !== "new" ? page(act) : null;
  if (act === "new") { cur = savePage({ title: "Untitled", text: TEMPLATES[arg]?.text || "", colour: COLOURS[all.length % COLOURS.length], emoji: "📄" }); location.replace(`#/tools/notebook/${cur.id}`); return; }
  if (!cur && all.length) { location.replace(`#/tools/notebook/${all[0].id}`); return; }
  view.innerHTML = `<div class="tl tl-wide">${backLink()}<div class="deck-head"><div><span class="kicker lo-kicker">Notes and creation</span><h1>Notebook</h1><p class="sub">Your own notes, as linked pages. Type <code>[[</code> a page name <code>]]</code> to link pages. Any line can become a flashcard: write <code>Front &gt;&gt; Back</code> or <code>Term :: Definition</code>, or put the cursor on a line and press <b>Make a card</b>.</p></div></div>
    <div class="nb">
      <aside class="nb-side panel glass"><input type="search" class="nb-find" placeholder="Search your notebook" aria-label="Search your notebook">
        <div class="nb-new"><select aria-label="Template">${Object.entries(TEMPLATES).map(([k, t]) => `<option value="${k}">${t.name}</option>`).join("")}</select><button type="button" class="btn btn-primary lg btn-sm" data-new><span>+ New page</span></button></div>
        <ul class="nb-pages"></ul>
        <button type="button" class="btn btn-light lg btn-sm" data-review><span>Review my notebook cards</span></button><p class="sub nb-count"></p></aside>
      <section class="nb-main">${cur ? `<div class="nb-head panel glass" style="--c:${esc(cur.colour || COLOURS[0])}"><button type="button" class="nb-emoji" aria-label="Change the page's emoji">${esc(cur.emoji || "📄")}</button><input class="tl-title" value="${esc(cur.title)}" aria-label="Page title">
          <div class="nb-colours">${COLOURS.map((c) => `<button type="button" style="background:${c}" data-colour="${c}" aria-label="Colour ${c}" aria-pressed="${c === cur.colour}"></button>`).join("")}</div>
          <div class="tl-bar"><button type="button" class="btn btn-ghost lg btn-sm" data-card><span>Make a card</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-mode><span>Preview</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-del><span>Delete</span></button></div></div>
        <textarea class="nb-text" spellcheck="true" aria-label="Page">${esc(cur.text || "")}</textarea><div class="nb-view panel glass" hidden></div>
        <div class="nb-back panel glass"></div>` : `<div class="empty-state panel glass"><h3>Your notebook is empty</h3><p class="sub">Start a page: pick a template on the left and press New page.</p></div>`}</section></div></div>`;
  const list = view.querySelector(".nb-pages"), find = view.querySelector(".nb-find");
  const paintList = () => { const q = find.value.trim().toLowerCase(), ps = pages().filter((p) => !q || p.title.toLowerCase().includes(q) || String(p.text).toLowerCase().includes(q)); list.innerHTML = ps.map((p) => `<li><a href="#/tools/notebook/${esc(p.id)}" aria-current="${p.id === cur?.id}" style="--c:${esc(p.colour || COLOURS[0])}"><span>${esc(p.emoji || "📄")}</span>${esc(p.title || "Untitled")}</a></li>`).join("") || `<li class="sub">No pages match.</li>`; const n = parseDeck(notebookDeckText(pages())).length; view.querySelector(".nb-count").textContent = `${pages().length} pages · ${n} cards`; };
  find.addEventListener("input", paintList); paintList();
  view.querySelector("[data-new]").addEventListener("click", () => { location.hash = `#/tools/notebook/new/${view.querySelector(".nb-new select").value}`; });
  view.querySelector("[data-review]").addEventListener("click", () => {
    const text = notebookDeckText(pages());
    if (!parseDeck(text).length) { ctx.toast("No cards in your notebook yet. Write a line like Term :: Definition."); return; }
    const d = deck(NOTEBOOK_DECK); saveDeck({ ...(d || {}), id: NOTEBOOK_DECK, title: "My notebook", text, style: d?.style || "card" });
    location.hash = `#/tools/cards/${NOTEBOOK_DECK}/review`;
  });
  if (!cur) return;
  const ta = view.querySelector(".nb-text"), title = view.querySelector(".tl-title"), pv = view.querySelector(".nb-view");
  let timer = 0;
  const exists = (t) => pages().some((p) => p.title.toLowerCase() === t.toLowerCase());
  const paintBack = () => { const b = backlinks(pages(), cur.title).filter((p) => p.id !== cur.id), out = linksIn(cur.text); view.querySelector(".nb-back").innerHTML = `<h3>Linked here from</h3>${b.length ? `<ul>${b.map((p) => `<li><a href="#/tools/notebook/${esc(p.id)}">${esc(p.emoji || "📄")} ${esc(p.title)}</a></li>`).join("")}</ul>` : `<p class="sub">No pages link here yet. Write [[${esc(cur.title)}]] on another page.</p>`}${out.length ? `<h3>Links from this page</h3><p>${out.map((t) => `<a class="nb-link ${exists(t) ? "" : "new"}" href="#/tools/notebook/open/${encodeURIComponent(t)}">${esc(t)}</a>`).join(" · ")}</p>` : ""}`; };
  const save = () => { clearTimeout(timer); timer = setTimeout(() => { cur = savePage({ ...cur, title: title.value.trim() || "Untitled", text: ta.value }); paintList(); paintBack(); }, 300); };
  ta.addEventListener("input", save); title.addEventListener("input", save);
  paintBack();
  view.querySelector("[data-mode]").addEventListener("click", (e) => { const on = pv.hidden; pv.hidden = !on; ta.hidden = on; if (on) pv.innerHTML = pageHtml(ta.value, exists) || `<p class="sub">Nothing on this page yet.</p>`; e.currentTarget.querySelector("span").textContent = on ? "Edit" : "Preview"; });
  view.querySelector("[data-card]").addEventListener("click", () => {
    const v = ta.value, s = ta.selectionStart, a = v.lastIndexOf("\n", s - 1) + 1, b = v.indexOf("\n", s) < 0 ? v.length : v.indexOf("\n", s);
    if (ta.selectionEnd > s && !v.slice(s, ta.selectionEnd).includes("\n")) { ta.value = `${v.slice(0, s)}{{${v.slice(s, ta.selectionEnd)}}}${v.slice(ta.selectionEnd)}`; }
    else { const line = v.slice(a, b); if (!line.trim()) { ctx.toast("Put the cursor on a line of notes first."); return; } ta.value = v.slice(0, a) + lineToCard(line) + v.slice(b); }
    save(); ctx.toast("Made a card. It joins your notebook deck.");
  });
  view.querySelector(".nb-colours").addEventListener("click", (e) => { const b = e.target.closest("[data-colour]"); if (!b) return; cur = savePage({ ...cur, colour: b.dataset.colour }); view.querySelector(".nb-head").style.setProperty("--c", cur.colour); view.querySelectorAll("[data-colour]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); paintList(); });
  view.querySelector(".nb-emoji").addEventListener("click", (e) => { const E = ["📄", "📘", "🧪", "🧠", "⚖️", "🩺", "📐", "🎵", "🌍", "💡", "✅", "⭐"], i = (E.indexOf(cur.emoji) + 1) % E.length; cur = savePage({ ...cur, emoji: E[i] }); e.currentTarget.textContent = E[i]; paintList(); });
  view.querySelector("[data-del]").addEventListener("click", () => { if (!confirm(`Delete "${cur.title}"? This can't be undone.`)) return; deletePage(cur.id); location.hash = "#/tools/notebook"; });
  ta.focus();
}
