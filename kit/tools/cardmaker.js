// The flashcard creator (Tools): a learner types notes and cards together, RemNote-style (syntax in
// kit/tools/cards.js), adds images, and Gradify does the rest: it suggests cards for the plain notes, and schedules
// every card with FSRS spaced repetition (kit/learning/srs.js, the same scheduler as the rest of Gradify).
// Two ways to review: Card (a rectangular card that flips) or Inline (the notes themselves, with the answers hidden
// where they are, to reveal in place).
import { useTool, backLink, takePicked, lessonPicker, factKey, esc } from "./tools.js";
import { parseDeck, cardHtml, suggestCards, clozeAt, imagesIn } from "./cards.js";
import { deck as loadDeck, saveDeck, deleteDeck, schedules, saveSchedule, addImage, imageUrls, uid } from "./store.js";
import { schedule, preview, isDue, fmtInterval, RATINGS } from "../learning/srs.js";

const STARTER = `# My flashcards
Type a card on each line. Notes without a card are fine too: Gradify can suggest cards for them.

Mitochondria >> Where aerobic respiration releases energy as ATP
Osmosis :: The net movement of water across a partially permeable membrane
The {{nucleus}} holds the cell's {{DNA}}.
What are the stages of mitosis? >>>
  Prophase, metaphase, anaphase, telophase
`;
const HELP = [[">>", "Front >> Back"], ["::", "Term :: Definition (both ways)"], ["<>", "Front <> Back (both ways)"], ["{{ }}", "A {{cloze}} gap"], [">>>", "Question >>> then indented answer lines"]];
const fmt = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const summaryOf = (cards, sch) => `${fmt(cards.length, "card", "cards")} · ${cards.filter((c) => !sch[c.id] || isDue(sch[c.id])).length} to review`;

export async function renderCardMaker(view, ctx, [id = "new", mode]) {
  let d = id === "new" ? null : loadDeck(id);
  if (id !== "new" && !d) { view.innerHTML = `<div class="tl">${backLink()}<article class="panel glass"><h3>That deck isn't in this browser</h3><p class="sub">Decks you make are kept in the browser you made them in.</p></article></div>`; return; }
  if (!d) {
    const newId = uid("d");
    if (!(await useTool("cards", newId, ctx, view))) return;
    const picked = takePicked();
    d = saveDeck({ id: newId, title: picked.length ? `${picked[0].lesson}` : "My flashcards", text: picked.length ? `# ${picked[0].lesson}\n${picked.map(lineOf).join("\n")}\n` : STARTER, style: "card" });
    history.replaceState(null, "", `#/tools/cards/${d.id}`);
  }
  if (mode === "review") return review(view, ctx, d);
  return editor(view, ctx, d);
}

// a lesson fact as a line: terms both ways, formulas and points with a bold lead front to back, the rest as notes
// for Gradify to suggest cards from
function lineOf(f) {
  if (f.kind === "term" && f.detail) return `${f.title} :: ${f.detail}`;
  if (f.kind === "formula") return `${f.text.includes(":") ? `Formula: ${f.text.split(":").slice(1).join(":").trim()}` : "Formula"} >> ${f.title}`;
  if (f.title && f.title !== f.text && f.text.startsWith(f.title)) return `${f.title} >> ${f.text.slice(f.title.length).replace(/^\s*[:–—-]\s*/, "")}`;
  if (f.kind === "example" && f.steps?.length) return `${f.title} >>>\n${f.steps.map((s) => `  ${s}`).join("\n")}`;
  return f.text;
}

async function editor(view, ctx, d) {
  view.innerHTML = `<div class="tl tl-wide">${backLink()}
    <div class="tl-mhead"><input class="tl-title" value="${esc(d.title)}" aria-label="Deck title">
      <div class="tl-bar"><span class="tl-seg" role="radiogroup" aria-label="How to review">${["card", "inline"].map((s) => `<button type="button" role="radio" aria-checked="${d.style === s}" data-style="${s}">${s === "card" ? "Card" : "Inline"}</button>`).join("")}</span>
        <a class="btn btn-primary lg btn-sm" href="#/tools/cards/${esc(d.id)}/review"><span>Review</span></a>
        <button type="button" class="btn btn-ghost lg btn-sm" data-act="delete"><span>Delete</span></button></div></div>
    <div class="tl-split tl-cards">
      <div class="tl-edit panel glass">
        <div class="tl-tools"><button type="button" class="tl-mini" data-act="cloze" title="Make the selected words a cloze gap (Ctrl+Shift+C)">{{ }} Cloze</button>
          <label class="tl-mini">Add image<input type="file" accept="image/*" hidden data-img></label>
          <button type="button" class="tl-mini" data-act="suggest">Suggest cards</button>
          <button type="button" class="tl-mini" data-act="lessons">From lessons</button>
          <label class="tl-mini tl-pro" title="Gradify AI, part of Gradify Ultra">Photo of notes <span class="tl-pro-tag">Ultra</span><input type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/*" multiple hidden data-photo></label></div>
        <div class="tl-photo" hidden></div>
        <textarea class="tl-text" spellcheck="true" aria-label="Your notes and cards">${esc(d.text)}</textarea>
        <p class="tl-syntax">${HELP.map(([k, v]) => `<span><code>${esc(k)}</code> ${esc(v)}</span>`).join("")}</p>
        <div class="tl-sugg" hidden></div><div class="tl-lessons" hidden></div>
      </div>
      <div class="tl-preview"><h3 class="tl-count"></h3><ol class="tl-list"></ol></div>
    </div></div>`;
  const ta = view.querySelector(".tl-text"), list = view.querySelector(".tl-list"), count = view.querySelector(".tl-count");
  let timer = 0;
  const paint = async () => {
    const cards = parseDeck(ta.value), src = await imageUrls(imagesIn(ta.value)), sch = schedules(d.id);
    count.textContent = `${fmt(cards.length, "card", "cards")}${cards.length ? ` · ${cards.filter((c) => !sch[c.id] || isDue(sch[c.id])).length} to review` : ""}`;
    list.innerHTML = cards.map((c) => `<li class="tl-pv tl-${c.type}"><span class="tl-type">${{ basic: "Card", reverse: "Reverse", concept: "Concept", cloze: "Cloze", multi: "Multi-line" }[c.type]}</span><div class="tl-f">${cardHtml(c.front, src)}</div><div class="tl-b">${cardHtml(c.back, src)}</div></li>`).join("") || '<li class="sub">No cards yet. Write <code>Front &gt;&gt; Back</code> on a line.</li>';
  };
  const save = () => { clearTimeout(timer); timer = setTimeout(() => { const cards = parseDeck(ta.value); d = saveDeck({ ...d, title: view.querySelector(".tl-title").value.trim() || "My flashcards", text: ta.value, summary: summaryOf(cards, schedules(d.id)) }); paint(); }, 250); };
  ta.addEventListener("input", save);
  view.querySelector(".tl-title").addEventListener("input", save);
  const insert = (s) => { const a = ta.selectionStart, b = ta.selectionEnd; ta.value = ta.value.slice(0, a) + s + ta.value.slice(b); ta.selectionStart = ta.selectionEnd = a + s.length; ta.focus(); save(); };
  const cloze = () => { const a = ta.selectionStart, b = ta.selectionEnd; if (a === b) { ctx.toast?.("Select the words to hide first."); return; } ta.value = clozeAt(ta.value, a, b); ta.selectionStart = ta.selectionEnd = b + 4; ta.focus(); save(); };
  ta.addEventListener("keydown", (e) => { if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "c") { e.preventDefault(); cloze(); } });
  // images: from the button, or pasted or dropped straight into the notes
  const addImages = async (files) => { for (const f of files) { try { const id = await addImage(f); insert(`![${(f.name || "image").replace(/\.[a-z0-9]+$/i, "").replace(/[\]\[]/g, "")}](img:${id}) `); } catch (err) { ctx.toast?.(esc(err.message)); } } };
  view.querySelector("[data-img]").addEventListener("change", (e) => addImages([...e.target.files]));
  ta.addEventListener("paste", (e) => { const imgs = [...(e.clipboardData?.files || [])].filter((f) => f.type.startsWith("image/")); if (imgs.length) { e.preventDefault(); addImages(imgs); } });
  ta.addEventListener("drop", (e) => { const imgs = [...(e.dataTransfer?.files || [])].filter((f) => f.type.startsWith("image/")); if (imgs.length) { e.preventDefault(); addImages(imgs); } });
  // Gradify Ultra: photos of notes (handwritten too) become cards, written by Gradify AI (supabase/functions/study-pack)
  const photo = view.querySelector(".tl-photo");
  view.querySelector("[data-photo]").addEventListener("change", async (e) => {
    const files = [...e.target.files].slice(0, 5); e.target.value = "";
    if (!files.length) return;
    photo.hidden = false;
    const { PRO_ON_SALE } = await import("../data/billing.js");
    if (!PRO_ON_SALE) {
      photo.innerHTML = `<b>Photo to cards is coming with Gradify Ultra.</b><p class="sub">Gradify AI will read photos of your notes, handwriting included, and write the cards for you. Until then, type or paste your notes here and press Suggest cards.</p>`;
      return;
    }
    if (ctx.store?.mode !== "cloud") { photo.innerHTML = `<b>Sign in to use Gradify AI.</b><p class="sub"><a href="#/account">Sign in</a>, then try the photo again.</p>`; return; }
    photo.innerHTML = `<p class="sub">Reading ${files.length === 1 ? "your photo" : `${files.length} photos`}…</p>`;
    try {
      const images = await Promise.all(files.map(photoForAi));
      const { callFunction } = await import("../data/functions.js");
      const body = await callFunction(ctx.store, "study-pack", { mode: "pack", text: "", images, title: view.querySelector(".tl-title").value || "My notes", site: ctx.site || "Gradify", level: "undergraduate" }, { fallback: "Gradify AI couldn't read those photos. Try a clearer, closer photo." });
      const { deckOf } = await import("./convert.js");
      const lines = deckOf({ ...body.pack, title: body.pack?.title || "From your photo", topics: body.pack?.topics || [], equations: body.pack?.equations || [] });
      const n = parseDeck(lines).length;
      if (!n) throw new Error("Gradify AI couldn't find anything to make cards from in those photos.");
      ta.value = `${ta.value.replace(/\s*$/, "")}\n\n${lines}\n`; save();
      photo.innerHTML = `<b>${fmt(n, "card", "cards")} from your ${files.length === 1 ? "photo" : "photos"}.</b><p class="sub">Check each one against your notes: handwriting can be misread. Edit or delete any line in the box above.</p>`;
    } catch (err) {
      photo.innerHTML = `<b>That didn't work.</b><p class="sub">${esc(err.message || "Please try again.")}</p>`;
    }
  });
  view.querySelectorAll("[data-style]").forEach((b) => b.addEventListener("click", () => { d = saveDeck({ ...d, style: b.dataset.style }); view.querySelectorAll("[data-style]").forEach((x) => x.setAttribute("aria-checked", String(x === b))); }));
  const sugg = view.querySelector(".tl-sugg"), lessons = view.querySelector(".tl-lessons");
  view.querySelector(".tl-edit").addEventListener("click", async (e) => {
    const b = e.target.closest("[data-act], [data-add], [data-addall]"); if (!b) return;
    if (b.dataset.act === "cloze") cloze();
    else if (b.dataset.act === "suggest") {
      const s = await suggestCards(ta.value);
      sugg.hidden = false;
      sugg.innerHTML = s.length ? `<div class="tl-sh"><b>${fmt(s.length, "suggested card", "suggested cards")}</b> from your notes <button type="button" class="tl-mini" data-addall>Add all</button></div><ul>${s.map((x, i) => `<li><code>${esc(x)}</code><button type="button" class="tl-mini" data-add="${i}">Add</button></li>`).join("")}</ul>`
        : "<p class=\"sub\">No suggestions: write notes as \"Term: what it means\" or full sentences, and Gradify finds the cards in them.</p>";
      sugg._s = s;
    } else if (b.dataset.add != null) { ta.value = `${ta.value.replace(/\s*$/, "")}\n${sugg._s[+b.dataset.add]}\n`; b.closest("li").remove(); save(); }
    else if (b.dataset.addall != null) { ta.value = `${ta.value.replace(/\s*$/, "")}\n${sugg._s.join("\n")}\n`; sugg.hidden = true; save(); }
    else if (b.dataset.act === "lessons") {
      lessons.hidden = !lessons.hidden;
      if (!lessons.hidden && !lessons.childElementCount) {
        const on = new Set();
        lessonPicker(lessons, { isOn: (k) => on.has(k), onToggle: (h, g, f, yes) => { const k = factKey(h, f); if (!yes || on.has(k)) return; on.add(k); ta.value = `${ta.value.replace(/\s*$/, "")}\n${lineOf(f)}\n`; save(); } });
      }
    }
  });
  view.querySelector('[data-act="delete"]').addEventListener("click", () => { if (confirm(`Delete "${d.title}" and its review history? This can't be undone.`)) { deleteDeck(d.id); location.hash = "#/tools"; } });
  paint();
}

// a photo ready for Gradify AI: at most 1568 px on its long side (larger is scaled down by the model anyway) as a JPEG
async function photoForAi(file) {
  const bmp = await createImageBitmap(file), k = Math.min(1, 1568 / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas"); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
  c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
  const url = c.toDataURL("image/jpeg", 0.85);
  return { type: "image/jpeg", data: url.slice(url.indexOf(",") + 1) };
}

async function review(view, ctx, d) {
  const all = parseDeck(d.text), sch = schedules(d.id);
  const src = await imageUrls(imagesIn(d.text));
  let queue = all.filter((c) => !sch[c.id] || isDue(sch[c.id]));
  const practice = !queue.length;
  if (practice) queue = [...all];
  if (!all.length) { view.innerHTML = `<div class="tl">${backLink(`#/tools/cards/${esc(d.id)}`, d.title)}<article class="panel glass"><h3>No cards yet</h3><p class="sub">Write a card on a line, such as <code>Front &gt;&gt; Back</code>.</p></article></div>`; return; }
  const total = queue.length; let done = 0;
  const rate = (c, r) => {
    const st = schedule({ ...(sch[c.id] || {}), due_at: sch[c.id]?.due_at || new Date().toISOString() }, r);
    sch[c.id] = st; saveSchedule(d.id, c.id, st); done++;
    // a forgotten card comes back later in this session
    if (r === "again") queue.push(c);
  };
  const buttons = (c) => { const p = preview({ ...(sch[c.id] || {}), due_at: sch[c.id]?.due_at || new Date().toISOString() }); return `<div class="tl-rate">${RATINGS.map((r) => `<button type="button" class="tl-r tl-r-${r}" data-rate="${r}"><b>${r[0].toUpperCase()}${r.slice(1)}</b><span>${fmtInterval(p[r])}</span></button>`).join("")}</div>`; };
  const top = () => `<div class="sess-top"><a href="#/tools/cards/${esc(d.id)}" class="back">✕ End</a><span class="goal-bar"><i style="width:${Math.min(100, (done / Math.max(total, 1)) * 100)}%"></i></span><span class="sub">${Math.min(done + 1, total)} / ${total}${practice ? " · practice" : ""}</span></div>`;
  const finish = () => { saveDeck({ ...d, summary: summaryOf(all, schedules(d.id)) }); view.innerHTML = `<div class="tl">${top()}<article class="panel glass tl-done"><h3>Done</h3><p class="sub">${fmt(done, "answer", "answers")}. Gradify has scheduled each card for when you're about to forget it.</p><div class="row-actions"><a class="btn btn-primary lg" href="#/tools/cards/${esc(d.id)}"><span>Back to the deck</span></a><a class="btn btn-ghost lg" href="#/tools"><span>Tools</span></a></div></article></div>`; };

  if (d.style === "inline") {
    // Inline: the cards in the order they're written, each answer hidden where it is
    const paint = () => {
      const left = queue.slice(0, 40);
      if (!left.length) return finish();
      view.innerHTML = `<div class="tl">${top()}<article class="panel glass tl-inline"><h3>${esc(d.title)}</h3><p class="sub">Tap a hidden answer to reveal it, then say how well you knew it.</p>
        <ol>${left.map((c, i) => `<li data-i="${i}"><div class="tl-q">${cardHtml(c.front, src)}</div><button type="button" class="tl-hide" data-show="${i}" aria-label="Reveal the answer">Reveal</button><div class="tl-a" hidden>${cardHtml(c.back, src)}${buttons(c)}</div></li>`).join("")}</ol></article></div>`;
      view.querySelector(".tl-inline").addEventListener("click", (e) => {
        const show = e.target.closest("[data-show]");
        if (show) { show.hidden = true; show.nextElementSibling.hidden = false; return; }
        const r = e.target.closest("[data-rate]"); if (!r) return;
        const li = r.closest("li"), c = left[+li.dataset.i];
        rate(c, r.dataset.rate); queue.splice(queue.indexOf(c), 1);   // answered (a forgotten one was added again at the end)
        li.classList.add("rated"); li.querySelector(".tl-rate").outerHTML = `<p class="tl-rated">${r.dataset.rate === "again" ? "Again: it'll come back" : "Scheduled"}</p>`;
        if (!view.querySelector(".tl-inline li:not(.rated)")) setTimeout(paint, 500);
      });
    };
    return paint();
  }
  // Card: one rectangular card at a time, flipped to see the answer
  const next = () => {
    const c = queue.shift(); if (!c) return finish();
    view.innerHTML = `<div class="tl tl-review">${top()}<button type="button" class="tl-card" aria-live="polite"><span class="tl-face tl-front">${cardHtml(c.front, src)}<small>Tap or press Space to reveal</small></span><span class="tl-face tl-back" hidden>${cardHtml(c.back, src)}</span></button><div class="tl-after" hidden>${buttons(c)}</div></div>`;
    const card = view.querySelector(".tl-card"), after = view.querySelector(".tl-after");
    const flip = () => { card.classList.add("flipped"); card.querySelector(".tl-back").hidden = false; card.querySelector(".tl-front small").hidden = true; after.hidden = false; after.querySelector("[data-rate=good]").focus(); };
    card.addEventListener("click", flip);
    after.addEventListener("click", (e) => { const r = e.target.closest("[data-rate]"); if (r) { rate(c, r.dataset.rate); next(); } });
    view.onkeydown = (e) => { if (e.key === " " && after.hidden) { e.preventDefault(); flip(); } else if (!after.hidden && /^[1-4]$/.test(e.key)) { rate(c, RATINGS[+e.key - 1]); next(); } };
    card.focus();
  };
  next();
}
