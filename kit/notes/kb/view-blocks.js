// Gradify Notes' blocks: images (with image occlusion and drawing on them), handwriting and drawing, tables, embeds,
// scanning a page, and the PDF reader (read, search, highlight in colours, annotate, draw on pages, cut out a
// region as an image, and send any of it to notes or flashcards with a link back to its page).
// Images are kept with Tools' images (kit/tools/store.js), so they sync; PDFs stay on the device (kit/notes/kb/store.js).
import * as M from "./model.js";
import * as S from "./store.js";

const { esc } = M;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const tools = () => import("../../tools/store.js");
const PENS = ["#111111", "#e52153", "#4641ff", "#1fae8c", "#ff8a00", "#8c27ca", "#ffffff"];

// ---------- drawing the blocks in the outline ----------
export async function hydrate(tree, api) {
  const kb = api.kb, blocks = $$("[data-block]", tree);
  if (!blocks.length) return;
  const ids = blocks.map((b) => kb.rems[b.dataset.id]).flatMap((r) => [r?.image?.id, r?.drawing?.bg]).filter(Boolean);
  const src = ids.length ? await (await tools()).imageUrls(ids).catch(() => () => "") : () => "";
  for (const el of blocks) {
    const r = kb.rems[el.dataset.id]; if (!r) continue;
    const kind = el.dataset.block;
    if (kind === "image") {
      const u = src(r.image.id), occ = r.image.occl || [];
      el.innerHTML = `<figure class="kb-fig">${u ? `<div class="kb-imgwrap"><img src="${esc(u)}" alt="${esc(r.image.label || M.nameOf(kb, r.id))}" loading="lazy">${occ.map((o) => `<span class="kb-occ-show" style="left:${o.x * 100}%;top:${o.y * 100}%;width:${o.w * 100}%;height:${o.h * 100}%" title="${esc(o.label || "")}">${esc(o.label || "")}</span>`).join("")}${r.image.ink ? inkSvg(r.image.ink) : ""}</div>` : `<div class="kb-noimg">This image is on another device and hasn't arrived yet.</div>`}
        <figcaption><button type="button" class="btn btn-ghost lg btn-sm" data-b="occlude"><span>${occ.length ? `Occlusion · ${occ.length}` : "Hide parts (occlusion)"}</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-b="draw"><span>Draw on it</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-b="ocr"><span>Read its text</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-b="label"><span>Label</span></button></figcaption></figure>`;
      el.onclick = (e) => { const b = e.target.closest("[data-b]")?.dataset.b; if (b === "occlude") occlusionEditor(api, r.id, u); if (b === "draw") drawingEditor(api, r.id, { onImage: true }); if (b === "ocr") ocr(api, r.id, u); if (b === "label") { const l = window.prompt("What is this image? (It's searchable.)", r.image.label || ""); if (l != null) api.change(() => M.update(kb, r.id, { image: { ...r.image, label: l.trim() } })); } };
    }
    if (kind === "drawing") {
      const d = r.drawing;
      el.innerHTML = `<div class="kb-sketch" style="aspect-ratio:${d.w}/${d.h}">${d.bg && src(d.bg) ? `<img src="${esc(src(d.bg))}" alt="">` : ""}${inkSvg(d)}</div><div class="kb-blockbar"><button type="button" class="btn btn-ghost lg btn-sm" data-b="edit"><span>Edit drawing</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-b="page"><span>+ Another page</span></button></div>`;
      el.onclick = (e) => { const b = e.target.closest("[data-b]")?.dataset.b; if (b === "edit") drawingEditor(api, r.id); if (b === "page") { const n = api.change(() => M.create(kb, { parent: r.parent, index: kb.rems[r.parent].kids.indexOf(r.id) + 1, text: "", drawing: { w: 1000, h: 1300, strokes: [] } }), { draw: "tree" }); drawingEditor(api, n.id); } };
    }
    if (kind === "table") tableBlock(api, el, r);
    if (kind === "embed") el.innerHTML = embedHtml(r.embed);
  }
}
function inkSvg(d) {
  const w = d.w || 1000, h = d.h || 1000;
  return `<svg class="kb-ink" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">${(d.strokes || []).map((s) => `<path d="${pathOf(s.p)}" stroke="${esc(s.c)}" stroke-width="${s.w}" stroke-opacity="${s.a ?? 1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join("")}</svg>`;
}
const pathOf = (p) => (p.length === 1 ? `M${p[0][0]} ${p[0][1]}l0.1 0` : `M${p[0][0]} ${p[0][1]}${p.slice(1).map(([x, y]) => `L${x} ${y}`).join("")}`);
function embedHtml(url) {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return `<div class="kb-embed"><iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}" title="YouTube video" loading="lazy" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `<div class="kb-embed"><iframe src="https://player.vimeo.com/video/${vm[1]}" title="Vimeo video" loading="lazy" allowfullscreen></iframe></div>`;
  if (/\.(mp4|webm|mov)(\?|$)/i.test(url)) return `<video class="kb-media" controls preload="metadata" src="${esc(url)}"></video>`;
  if (/\.(mp3|m4a|ogg|wav)(\?|$)/i.test(url)) return `<audio class="kb-media" controls preload="metadata" src="${esc(url)}"></audio>`;
  if (/\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(url)) return `<img class="kb-media" src="${esc(url)}" alt="" loading="lazy">`;
  return `<a class="kb-linkcard" href="${esc(url)}" target="_blank" rel="noopener">${esc(url.replace(/^https?:\/\//, ""))}</a>`;
}

// ---------- inserting blocks (from the / menu) ----------
export async function insert(api, kind, at) {
  const kb = api.kb, r = kb.rems[at];
  const place = (patch) => { const blank = !r.text && !r.kids.length && !r.image && !r.table && !r.drawing && !r.portal && !r.embed && !r.pdf; return api.change(() => (blank ? M.update(kb, at, patch) : M.create(kb, { parent: r.parent, index: kb.rems[r.parent].kids.indexOf(at) + 1, text: "", ...patch })), { draw: "tree" }); };
  if (kind === "image" || kind === "scan" || kind === "occlusion") {
    const file = await chooseFile(kind === "scan" ? "image/*;capture=camera" : "image/*", kind === "scan");
    if (!file) return;
    const n = await addImageRem(api, file, { replace: !r.text && !r.kids.length && !r.image ? at : null, after: at });
    if (kind === "occlusion") { const u = (await (await tools()).imageUrls([n.image.id]))(n.image.id); occlusionEditor(api, n.id, u); }
    if (kind === "scan") { const u = (await (await tools()).imageUrls([n.image.id]))(n.image.id); ocr(api, n.id, u); }
    return;
  }
  if (kind === "drawing") { const n = place({ drawing: { w: 1000, h: 700, strokes: [] } }); return drawingEditor(api, n.id); }
  if (kind === "table") return place({ table: { rows: [["", ""], ["", ""]] } });
  if (kind === "embed") { const u = window.prompt("Paste a link: a YouTube or Vimeo video, an audio or video file, or a web page"); if (u && /^https?:\/\//.test(u.trim())) place({ embed: u.trim() }); else if (u) api.toast("That needs to be a full link, starting https://"); return; }
  if (kind === "pdf") { const f = await chooseFile("application/pdf,.pdf"); if (f) return importPdf(api, f, { after: at }); }
}
function chooseFile(accept, camera = false) {
  return new Promise((ok) => {
    const i = document.createElement("input"); i.type = "file"; i.accept = accept.replace(";capture=camera", "");
    if (camera) i.setAttribute("capture", "environment");
    i.onchange = () => ok(i.files[0] || null);
    i.click();
  });
}
/** An image as a new bullet (or into an empty one). */
export async function addImageRem(api, file, { after = null, replace = null } = {}) {
  const kb = api.kb;
  let id;
  try { id = await (await tools()).addImage(file); } catch (e) { api.toast(esc(e.message)); return null; }
  const bmp = await createImageBitmap(file).catch(() => null);
  const image = { id, w: bmp?.width || 0, h: bmp?.height || 0, occl: [], label: file.name.replace(/\.[^.]+$/, "").slice(0, 80) };
  if (replace) return api.change(() => M.update(kb, replace, { image }), { draw: "tree" });
  const a = after && kb.rems[after], parent = a ? a.parent : api.root;
  return api.change(() => M.create(kb, { parent, index: a ? kb.rems[parent].kids.indexOf(after) + 1 : null, text: "", image }), { draw: "tree" });
}

// ---------- image occlusion ----------
function occlusionEditor(api, id, url) {
  const kb = api.kb, r = kb.rems[id];
  if (!url) return api.toast("The image hasn't loaded yet.");
  let occl = structuredClone(r.image.occl || []), mode = r.image.mode || "one", cur = -1;
  api.modal(`<h3>Image occlusion</h3><p class="sub">Drag over each part to hide. Each box is a card; give boxes the same group to test them together. ${mode === "one" ? "" : ""}</p>
    <div class="kb-occ-ed"><div class="kb-occ-stage" id="occ-stage"><img src="${esc(url)}" alt="" draggable="false"><div id="occ-boxes"></div></div>
    <div class="kb-occ-side"><div id="occ-form"></div>
      <label>When testing one box<select id="occ-mode"><option value="one" ${mode === "one" ? "selected" : ""}>Hide that box, show the others</option><option value="all" ${mode === "all" ? "selected" : ""}>Hide every box, ask for one</option></select></label>
      <p class="sub" id="occ-n"></p><button type="button" class="btn btn-primary lg btn-sm" id="occ-save"><span>Save</span></button></div></div>`, (el) => {
    const stage = $("#occ-stage", el), boxes = $("#occ-boxes", el);
    const draw = () => {
      boxes.innerHTML = occl.map((o, i) => `<span class="kb-occ-box${i === cur ? " on" : ""}" data-i="${i}" style="left:${o.x * 100}%;top:${o.y * 100}%;width:${o.w * 100}%;height:${o.h * 100}%">${esc(o.label || String(i + 1))}${o.g ? `<em>${esc(o.g)}</em>` : ""}</span>`).join("");
      const o = occl[cur];
      $("#occ-form", el).innerHTML = o ? `<label>Label (the answer)<input id="occ-label" value="${esc(o.label || "")}" autofocus></label><label>Group <em>optional</em><input id="occ-g" value="${esc(o.g || "")}" placeholder="Boxes with one group are one card"></label><button type="button" class="btn btn-ghost lg btn-sm" id="occ-del"><span>Remove this box</span></button>` : `<p class="sub">Select a box to label it.</p>`;
      const groups = new Set(occl.map((x) => x.g || x.label || Math.random())).size;
      $("#occ-n", el).textContent = `${occl.length} ${occl.length === 1 ? "box" : "boxes"} · ${groups} ${groups === 1 ? "card" : "cards"}`;
      if (o) {
        $("#occ-label", el).oninput = (e) => { o.label = e.target.value; boxes.querySelector(`[data-i="${cur}"]`).firstChild.textContent = o.label || String(cur + 1); };
        $("#occ-g", el).oninput = (e) => { o.g = e.target.value.trim() || undefined; };
        $("#occ-del", el).onclick = () => { occl.splice(cur, 1); cur = -1; draw(); };
        setTimeout(() => $("#occ-label", el)?.focus());
      }
    };
    let start = null, temp = null;
    const pt = (e) => { const b = stage.getBoundingClientRect(); return [Math.min(1, Math.max(0, (e.clientX - b.left) / b.width)), Math.min(1, Math.max(0, (e.clientY - b.top) / b.height))]; };
    stage.addEventListener("pointerdown", (e) => {
      const hit = e.target.closest("[data-i]");
      if (hit) { cur = Number(hit.dataset.i); draw(); return; }
      start = pt(e); stage.setPointerCapture(e.pointerId);
      temp = document.createElement("span"); temp.className = "kb-occ-box on"; boxes.append(temp);
    });
    stage.addEventListener("pointermove", (e) => { if (!start) return; const [x, y] = pt(e); Object.assign(temp.style, { left: `${Math.min(x, start[0]) * 100}%`, top: `${Math.min(y, start[1]) * 100}%`, width: `${Math.abs(x - start[0]) * 100}%`, height: `${Math.abs(y - start[1]) * 100}%` }); });
    stage.addEventListener("pointerup", (e) => {
      if (!start) return; const [x, y] = pt(e), w = Math.abs(x - start[0]), h = Math.abs(y - start[1]);
      if (w > 0.01 && h > 0.01) { occl.push({ x: +Math.min(x, start[0]).toFixed(4), y: +Math.min(y, start[1]).toFixed(4), w: +w.toFixed(4), h: +h.toFixed(4), label: "" }); cur = occl.length - 1; }
      start = null; temp?.remove(); draw();
    });
    $("#occ-mode", el).onchange = (e) => { mode = e.target.value; };
    $("#occ-save", el).onclick = () => { api.change(() => M.update(kb, id, { image: { ...kb.rems[id].image, occl, mode } })); api.closeModal(); api.toast(occl.length ? `${new Set(occl.map((o) => o.g || o.label)).size} occlusion cards. They're in your reviews.` : "Saved."); };
    draw();
  });
}
/** A card's front or back for an occluded image, as HTML: used in the revision screen. */
export async function occlusionHtml(kb, card, shown) {
  const r = kb.rems[card.rem]; if (!r?.image) return null;
  const u = (await (await tools()).imageUrls([r.image.id]))(r.image.id); if (!u) return null;
  const mode = card.occl.mode, g = card.occl.group;
  return `<div class="kb-imgwrap kb-occ-card"><img src="${esc(u)}" alt="${esc(r.image.label || "")}">${(r.image.occl || []).map((o) => {
    const mine = (o.g ?? o.label ?? "") === g, hide = mine ? !shown : mode === "all";
    return `<span class="kb-occ-mask${mine ? " target" : ""}${hide ? "" : " open"}" style="left:${o.x * 100}%;top:${o.y * 100}%;width:${o.w * 100}%;height:${o.h * 100}%">${!hide && mine ? esc(o.label || "") : mine ? "?" : ""}</span>`;
  }).join("")}</div>`;
}

// ---------- handwriting and drawing ----------
function drawingEditor(api, id, { onImage = false } = {}) {
  const kb = api.kb, r = kb.rems[id];
  let data;
  if (onImage) data = structuredClone(r.image.ink || { w: r.image.w || 1000, h: r.image.h || 1000, strokes: [] });
  else data = structuredClone(r.drawing);
  const scale = 1000 / Math.max(data.w, data.h); data = { ...data, w: Math.round(data.w * scale), h: Math.round(data.h * scale), strokes: (data.strokes || []) };
  let pen = { c: PENS[0], w: 4, a: 1, tool: "pen" }, undone = [];
  api.modal(`<h3>${onImage ? "Draw on the image" : "Drawing"}</h3>
    <div class="kb-pens" role="toolbar">${PENS.map((c) => `<button type="button" class="kb-pen" data-c="${c}" style="--c:${c}" aria-label="Colour ${c}"></button>`).join("")}
      <button type="button" class="chip" data-t="pen" aria-pressed="true">Pen</button><button type="button" class="chip" data-t="hl" aria-pressed="false">Highlighter</button><button type="button" class="chip" data-t="erase" aria-pressed="false">Eraser</button>
      <label class="kb-width">Size <input type="range" min="1" max="24" value="4" id="pw"></label><button type="button" class="chip" id="pu">Undo</button><button type="button" class="chip" id="pr">Redo</button><button type="button" class="chip" id="pc">Clear</button></div>
    <div class="kb-canvas" style="aspect-ratio:${data.w}/${data.h}"><div class="kb-canvas-bg" id="kb-cbg"></div><canvas id="kb-cv" width="${data.w}" height="${data.h}"></canvas></div>
    <div class="row-actions"><button type="button" class="btn btn-primary lg btn-sm" id="psave"><span>Save</span></button><span class="sub">Pressure-sensitive with a stylus. Rest your palm: only the pen draws once it's been used.</span></div>`, async (el) => {
    const cv = $("#kb-cv", el), g = cv.getContext("2d");
    const bgId = onImage ? r.image.id : data.bg;
    if (bgId) { const u = (await (await tools()).imageUrls([bgId]))(bgId); if (u) $("#kb-cbg", el).innerHTML = `<img src="${esc(u)}" alt="">`; }
    else $("#kb-cbg", el).classList.add("paper");
    const paint = () => { g.clearRect(0, 0, cv.width, cv.height); for (const s of data.strokes) { g.strokeStyle = s.c; g.globalAlpha = s.a ?? 1; g.lineWidth = s.w; g.lineCap = g.lineJoin = "round"; const p = new Path2D(pathOf(s.p)); g.stroke(p); } g.globalAlpha = 1; };
    paint();
    let cur = null, penSeen = false;
    const at = (e) => { const b = cv.getBoundingClientRect(); return [Math.round(((e.clientX - b.left) / b.width) * cv.width), Math.round(((e.clientY - b.top) / b.height) * cv.height)]; };
    cv.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "pen") penSeen = true; else if (penSeen && e.pointerType === "touch") return;   // palm rejection
      cv.setPointerCapture(e.pointerId);
      const p = at(e);
      if (pen.tool === "erase") { data.strokes = data.strokes.filter((s) => !s.p.some(([x, y]) => Math.hypot(x - p[0], y - p[1]) < 14)); paint(); cur = { erase: true }; return; }
      cur = { c: pen.c, w: pen.tool === "hl" ? pen.w * 4 : Math.max(1, pen.w * (e.pressure > 0 && e.pointerType === "pen" ? 0.5 + e.pressure : 1)), a: pen.tool === "hl" ? 0.35 : 1, p: [p] };
      undone = [];
    });
    cv.addEventListener("pointermove", (e) => {
      if (!cur) return;
      const p = at(e);
      if (cur.erase) { const n = data.strokes.length; data.strokes = data.strokes.filter((s) => !s.p.some(([x, y]) => Math.hypot(x - p[0], y - p[1]) < 14)); if (n !== data.strokes.length) paint(); return; }
      const last = cur.p.at(-1); if (Math.hypot(p[0] - last[0], p[1] - last[1]) < 2) return;
      cur.p.push(p);
      g.strokeStyle = cur.c; g.globalAlpha = cur.a; g.lineWidth = cur.w; g.lineCap = g.lineJoin = "round"; g.beginPath(); g.moveTo(...last); g.lineTo(...p); g.stroke(); g.globalAlpha = 1;
    });
    const end = () => { if (cur && !cur.erase && cur.p.length) data.strokes.push(cur); cur = null; paint(); };
    cv.addEventListener("pointerup", end); cv.addEventListener("pointercancel", end);
    el.addEventListener("click", (e) => {
      const c = e.target.closest("[data-c]")?.dataset.c; if (c) { pen.c = c; if (pen.tool === "erase") pen.tool = "pen"; }
      const t = e.target.closest("[data-t]")?.dataset.t; if (t) { pen.tool = t; $$("[data-t]", el).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.t === t))); }
    });
    $("#pw", el).oninput = (e) => { pen.w = Number(e.target.value); };
    $("#pu", el).onclick = () => { const s = data.strokes.pop(); if (s) undone.push(s); paint(); };
    $("#pr", el).onclick = () => { const s = undone.pop(); if (s) data.strokes.push(s); paint(); };
    $("#pc", el).onclick = () => { if (confirm("Clear the whole drawing?")) { data.strokes = []; paint(); } };
    $("#psave", el).onclick = () => {
      api.change(() => (onImage ? M.update(kb, id, { image: { ...kb.rems[id].image, ink: data } }) : M.update(kb, id, { drawing: data })));
      api.closeModal();
    };
  });
}

// ---------- reading the text in an image (scans and photos of pages) ----------
const TESSERACT = "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js";
let tessP = null;
const loadTesseract = () => (tessP ||= new Promise((ok, no) => { if (window.Tesseract) return ok(window.Tesseract); const s = document.createElement("script"); s.src = TESSERACT; s.onload = () => ok(window.Tesseract); s.onerror = () => { tessP = null; no(new Error("The text reader couldn't load. Check your connection.")); }; document.head.append(s); }));
async function ocr(api, id, url) {
  if (!url) return api.toast("The image hasn't loaded yet.");
  api.toast("Reading the text on your device… (the first time takes a little longer)");
  try {
    const T = await loadTesseract();
    const { data } = await T.recognize(url, "eng");
    const lines = String(data.text || "").split("\n").map((l) => l.trim()).filter((l) => l.length > 1);
    if (!lines.length) return api.toast("No text found in that image.");
    api.change(() => { for (const l of lines) M.create(api.kb, { parent: id, text: l }); M.update(api.kb, id, { image: { ...api.kb.rems[id].image, label: api.kb.rems[id].image.label || lines[0].slice(0, 80) } }); });
    api.toast(`Added ${lines.length} lines of text under the image. Check them: scans aren't always read perfectly.`);
  } catch (e) { api.toast(esc(e.message || "Couldn't read the text.")); }
}

// ---------- tables ----------
function tableBlock(api, el, r) {
  const kb = api.kb, rows = r.table.rows;
  el.innerHTML = `<div class="kb-tablewrap"><table class="kb-grid">${rows.map((row, i) => `<tr>${row.map((c, j) => `<${i ? "td" : "th"}><input data-r="${i}" data-c="${j}" value="${esc(c)}" aria-label="Row ${i + 1}, column ${j + 1}"></${i ? "td" : "th"}>`).join("")}</tr>`).join("")}</table></div>
    <div class="kb-blockbar"><button type="button" class="btn btn-ghost lg btn-sm" data-t="row"><span>+ Row</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-t="col"><span>+ Column</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-t="unrow"><span>− Row</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-t="uncol"><span>− Column</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-t="cards"><span>Make cards from rows</span></button></div>`;
  el.onchange = (e) => { const i = e.target.dataset.r, j = e.target.dataset.c; if (i == null) return; const t = structuredClone(kb.rems[r.id].table); t.rows[i][j] = e.target.value; api.change(() => M.update(kb, r.id, { table: t }), { draw: "none" }); };
  el.onclick = (e) => {
    const a = e.target.closest("[data-t]")?.dataset.t; if (!a) return;
    const t = structuredClone(kb.rems[r.id].table), w = t.rows[0].length;
    if (a === "row") t.rows.push(Array(w).fill(""));
    if (a === "col") t.rows.forEach((x) => x.push(""));
    if (a === "unrow" && t.rows.length > 1) t.rows.pop();
    if (a === "uncol" && w > 1) t.rows.forEach((x) => x.pop());
    if (a === "cards") return tableCards(api, r.id);
    api.change(() => M.update(kb, r.id, { table: t }));
  };
}
/** A table's rows become notes with a tag that makes cards from their properties: one card per cell. */
function tableCards(api, id) {
  const kb = api.kb, rows = kb.rems[id].table.rows, head = rows[0].map((h, i) => h.trim() || `Column ${i + 1}`);
  if (rows.length < 2 || head.length < 2) return api.toast("Add a header row and at least one row first.");
  const name = window.prompt("What is each row? (This becomes a tag, e.g. Element, Author, Muscle)", head[0] || "Item");
  if (!name) return;
  api.change(() => {
    M.defineTag(kb, name, { schema: head.slice(1), cards: true });
    const tag = /[^\p{L}\p{N}_\-/]/u.test(name) ? `#[[${name}]]` : `#${name}`;
    for (const row of rows.slice(1)) if (row[0]?.trim()) M.create(kb, { parent: id, text: `${row[0].trim()} ${tag}`, props: Object.fromEntries(head.slice(1).map((h, i) => [h, row[i + 1] || ""]).filter(([, v]) => v.trim())) });
  });
  api.toast(`Made a card for each filled cell, tagged #${esc(name)}. <a href="#/notes/tag/${encodeURIComponent(M.tagKey(name))}">See the table</a>`);
}

// ---------- PDFs ----------
let pdfReady = null;
const loadPdf = () => (pdfReady ||= new Promise((ok, no) => {
  if (window.pdfjsLib) return ok(window.pdfjsLib);
  const s = document.createElement("script"); s.src = new URL("../../vendor/pdfjs/pdf.min.js", import.meta.url).href;
  s.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("../../vendor/pdfjs/pdf.worker.min.js", import.meta.url).href; ok(window.pdfjsLib); };
  s.onerror = () => { pdfReady = null; no(new Error("The PDF reader couldn't load.")); };
  document.head.append(s);
}));
/** Imports a PDF (or a PowerPoint or Word file saved as PDF) as a document with a reader. */
export async function importPdf(api, file, { after = null, parent = undefined } = {}) {
  const kb = api.kb;
  try {
    const lib = await loadPdf();
    const pdf = await lib.getDocument({ data: await file.arrayBuffer() }).promise;
    const fid = await S.putFile(file);
    const name = file.name.replace(/\.pdf$/i, "");
    const a = after && kb.rems[after];
    const p = parent !== undefined ? parent : a ? a.parent : null;
    const r = api.change(() => M.create(kb, { parent: p, index: a ? kb.rems[p].kids.indexOf(after) + 1 : null, text: name, doc: true, pdf: { file: fid, name, pages: pdf.numPages } }), { draw: "none" });
    location.hash = `#/notes/pdf/${r.id}`;
    return r;
  } catch (e) { api.toast(`Couldn't open that PDF: ${esc(e.message)}`); return null; }
}
const HL = { yellow: "#ffe45c", green: "#7ee2a8", blue: "#8ec5ff", pink: "#ff9ccf", orange: "#ffb870" };
export async function screen(kind, id, main, api) {
  const [, , pageArg] = location.hash.replace(/^#\/?notes\/?/, "").split("/");
  const kb = api.kb, r = kb.rems[id];
  if (!r?.pdf) { main.innerHTML = `<div class="kb-empty"><h2>No PDF here</h2><a class="btn btn-ghost lg btn-sm" href="#/notes"><span>Back to notes</span></a></div>`; return; }
  main.innerHTML = `<div class="kb-pdf"><div class="kb-pdf-top"><a class="back" href="#/notes/${id}">← ${esc(M.nameOf(kb, id))}</a>
    <div class="kb-pdf-tools"><input id="pdf-q" placeholder="Search the PDF" aria-label="Search the PDF"><button type="button" class="chip" id="pdf-zo" aria-label="Zoom out">−</button><button type="button" class="chip" id="pdf-zi" aria-label="Zoom in">+</button>
      <button type="button" class="chip" id="pdf-region" aria-pressed="false" title="Drag over a diagram to cut it out as an image">Region</button><button type="button" class="chip" id="pdf-ink" aria-pressed="false">Draw</button><a class="chip" href="#/notes/guided/${id}">Guided learning</a></div></div>
    <div class="kb-pdf-body"><div class="kb-pdf-pages" id="pdf-pages"><p class="sub">Opening…</p></div><aside class="kb-pdf-notes glass" id="pdf-notes"></aside></div>
    <div class="kb-pop glass kb-hlbar" id="hlbar" hidden>${Object.keys(HL).map((c) => `<button type="button" data-hl="${c}" style="--c:${HL[c]}" aria-label="Highlight ${c}"></button>`).join("")}<button type="button" data-hla="note">Note</button><button type="button" data-hla="card">Card</button></div></div>`;
  drawNotes();
  const blob = r.pdf.file ? await S.getFile(r.pdf.file) : null;
  if (!blob) { $("#pdf-pages", main).innerHTML = `<div class="kb-empty"><h2>The PDF file is on another device</h2><p class="sub">PDFs stay on the device they were added on; their highlights and notes are here. Add the file again to read it on this device.</p><button type="button" class="btn btn-light lg btn-sm" id="pdf-re"><span>Add the file</span></button></div>`; $("#pdf-re", main).onclick = async () => { const f = await chooseFile("application/pdf,.pdf"); if (!f) return; const fid = await S.putFile(f); api.change(() => M.update(kb, id, { pdf: { ...r.pdf, file: fid } }), { draw: "none" }); screen(kind, id, main, api); }; return; }
  const lib = await loadPdf();
  const pdf = await lib.getDocument({ data: await blob.arrayBuffer() }).promise;
  let zoom = kb.settings.pdfZoom || 1.25, mode = null;
  const texts = new Map();
  const pagesEl = $("#pdf-pages", main);
  const build = () => {
    pagesEl.innerHTML = Array.from({ length: pdf.numPages }, (_, i) => `<div class="kb-pdf-page" data-p="${i + 1}" id="pdf-p${i + 1}"><span class="kb-pdf-pn">${i + 1}</span></div>`).join("");
    const io = new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting && !e.target.dataset.done) { e.target.dataset.done = "1"; drawPage(Number(e.target.dataset.p)); } }, { rootMargin: "600px" });
    $$(".kb-pdf-page", pagesEl).forEach((p) => io.observe(p));
    pdf.getPage(1).then((pg) => { const vp = pg.getViewport({ scale: zoom }); $$(".kb-pdf-page", pagesEl).forEach((p) => { p.style.width = `${vp.width}px`; p.style.height = `${vp.height}px`; }); if (pageArg) $(`#pdf-p${pageArg}`, main)?.scrollIntoView({ block: "start" }); });
  };
  const drawPage = async (n) => {
    const host = $(`#pdf-p${n}`, main); if (!host) return;
    const pg = await pdf.getPage(n), vp = pg.getViewport({ scale: zoom }), dpr = Math.min(2, devicePixelRatio || 1);
    host.style.width = `${vp.width}px`; host.style.height = `${vp.height}px`;
    const cv = document.createElement("canvas"); cv.width = vp.width * dpr; cv.height = vp.height * dpr; cv.style.width = `${vp.width}px`; cv.style.height = `${vp.height}px`;
    host.append(cv);
    await pg.render({ canvasContext: cv.getContext("2d"), viewport: vp, transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : null }).promise;
    const tc = await pg.getTextContent(); texts.set(n, tc.items.map((i) => i.str).join(" "));
    const layer = document.createElement("div"); layer.className = "textLayer"; layer.style.setProperty("--scale-factor", String(zoom)); host.append(layer);
    try { await lib.renderTextLayer({ textContentSource: tc, container: layer, viewport: vp, textDivs: [] }).promise; } catch { /* selection unavailable on this page */ }
    const marks = document.createElement("div"); marks.className = "kb-pdf-marks"; host.prepend(marks);
    const ink = document.createElement("div"); ink.className = "kb-pdf-ink"; host.append(ink);
    paintMarks(n);
  };
  const paintMarks = (n) => {
    const host = $(`#pdf-p${n}`, main), marks = host && $(".kb-pdf-marks", host); if (!marks) return;
    marks.innerHTML = M.kidsOf(kb, id).filter((k) => k.src?.page === n && k.src.rects).flatMap((k) => k.src.rects.map(([x, y, w, h]) => `<span class="kb-pdf-hl" data-hl-id="${k.id}" style="left:${x * 100}%;top:${y * 100}%;width:${w * 100}%;height:${h * 100}%;--c:${HL[k.src.colour] || HL.yellow}" title="${esc(M.nameOf(kb, k.id))}"></span>`)).join("");
    const ink = $(".kb-pdf-ink", host), d = r.pdf.ink?.[n];
    if (ink) ink.innerHTML = d ? inkSvg(d) : "";
  };
  function drawNotes() {
    const list = M.kidsOf(kb, id);
    $("#pdf-notes", main).innerHTML = `<h3>Highlights and notes <span class="sub">${list.length}</span></h3><p class="sub">Select text to highlight it. Each highlight is a bullet in this document: add >> to make it a card.</p>
      <ul class="kb-pdf-list">${list.map((k) => `<li style="--c:${HL[k.src?.colour] || "transparent"}"><a href="#/notes/pdf/${id}/${k.src?.page || 1}" data-jump="${k.src?.page || 1}">${k.src?.page ? `p. ${k.src.page}` : ""}</a> <span>${M.inlineHtml(kb, k.text) || esc(M.nameOf(kb, k.id))}</span>${M.cardsOf(kb, k.id).length ? ' <b class="kb-cardchip">→</b>' : ""}</li>`).join("") || ""}</ul><a class="btn btn-ghost lg btn-sm" href="#/notes/${id}"><span>Open as notes</span></a>`;
  }
  $("#pdf-notes", main).addEventListener("click", (e) => { const p = e.target.closest("[data-jump]")?.dataset.jump; if (p) { e.preventDefault(); $(`#pdf-p${p}`, main)?.scrollIntoView({ block: "start", behavior: "smooth" }); } });
  build();
  // selecting text: the highlight bar
  const bar = $("#hlbar", main);
  let picked = null;
  const onSel = () => {
    const s = getSelection(); if (!s || s.isCollapsed || mode) { bar.hidden = true; return; }
    const page = s.anchorNode?.parentElement?.closest(".kb-pdf-page"); if (!page) { bar.hidden = true; return; }
    const rg = s.getRangeAt(0), b = page.getBoundingClientRect();
    const rects = [...rg.getClientRects()].filter((x) => x.width > 1).map((x) => [(x.left - b.left) / b.width, (x.top - b.top) / b.height, x.width / b.width, x.height / b.height].map((v) => +v.toFixed(4)));
    picked = { page: Number(page.dataset.p), rects, quote: s.toString().replace(/\s+/g, " ").trim() };
    const last = rg.getBoundingClientRect();
    bar.hidden = false; bar.style.top = `${last.bottom + 8}px`; bar.style.left = `${Math.max(8, last.left)}px`;
  };
  document.addEventListener("selectionchange", onSel);
  addEventListener("hashchange", () => document.removeEventListener("selectionchange", onSel), { once: true });
  bar.addEventListener("mousedown", (e) => e.preventDefault());
  bar.addEventListener("click", (e) => {
    if (!picked?.quote) return;
    const colour = e.target.closest("[data-hl]")?.dataset.hl || "yellow", action = e.target.closest("[data-hla]")?.dataset.hla;
    let text = picked.quote.slice(0, 1500);
    if (action === "note") { const n = window.prompt("Your note on this:"); if (n == null) return; text = `${text} — ${n.trim()}`; }
    const made = api.change(() => M.create(kb, { parent: id, text: action === "card" ? `${text} >> ` : text, src: { kind: "pdf", rem: id, page: picked.page, rects: picked.rects, colour, quote: picked.quote.slice(0, 500) } }), { draw: "none" });
    getSelection().removeAllRanges(); bar.hidden = true;
    paintMarks(picked.page); drawNotes();
    if (action === "card") { const back = window.prompt("The answer for this card (the highlight is the question):"); if (back) api.change(() => M.update(kb, made.id, { text: `${text} >> ${back.trim()}` }), { draw: "none" }); drawNotes(); }
    api.toast(action === "card" ? "Added a card." : "Highlighted. It's a bullet in this document too.");
  });
  // region: drag over a diagram to cut it out as an image (for image occlusion)
  const region = $("#pdf-region", main), inkBtn = $("#pdf-ink", main);
  const setMode = (m) => { mode = mode === m ? null : m; region.setAttribute("aria-pressed", String(mode === "region")); inkBtn.setAttribute("aria-pressed", String(mode === "ink")); pagesEl.classList.toggle("regioning", mode === "region"); pagesEl.classList.toggle("inking", mode === "ink"); };
  region.onclick = () => setMode("region"); inkBtn.onclick = () => setMode("ink");
  let drag = null;
  pagesEl.addEventListener("pointerdown", (e) => {
    if (!mode) return; const page = e.target.closest(".kb-pdf-page"); if (!page) return;
    e.preventDefault(); page.setPointerCapture(e.pointerId);
    const b = page.getBoundingClientRect(), p = [(e.clientX - b.left) / b.width, (e.clientY - b.top) / b.height];
    if (mode === "region") { const box = document.createElement("span"); box.className = "kb-region"; page.append(box); drag = { page, b, p, box }; }
    else { drag = { page, b, stroke: { c: "#e52153", w: 3, a: 1, p: [[Math.round(p[0] * 1000), Math.round(p[1] * 1000 * b.height / b.width)]] } }; }
  });
  pagesEl.addEventListener("pointermove", (e) => {
    if (!drag) return; const { b } = drag, x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
    if (drag.box) Object.assign(drag.box.style, { left: `${Math.min(x, drag.p[0]) * 100}%`, top: `${Math.min(y, drag.p[1]) * 100}%`, width: `${Math.abs(x - drag.p[0]) * 100}%`, height: `${Math.abs(y - drag.p[1]) * 100}%` });
    else { drag.stroke.p.push([Math.round(x * 1000), Math.round(y * 1000 * b.height / b.width)]); const n = Number(drag.page.dataset.p), d = { w: 1000, h: Math.round(1000 * b.height / b.width), strokes: [...(r.pdf.ink?.[n]?.strokes || []), drag.stroke] }; $(".kb-pdf-ink", drag.page).innerHTML = inkSvg(d); }
  });
  pagesEl.addEventListener("pointerup", async (e) => {
    if (!drag) return; const d = drag; drag = null;
    const n = Number(d.page.dataset.p);
    if (!d.box) { const cur = r.pdf.ink?.[n] || { w: 1000, h: Math.round(1000 * d.b.height / d.b.width), strokes: [] }; api.change(() => M.update(kb, id, { pdf: { ...kb.rems[id].pdf, ink: { ...(kb.rems[id].pdf.ink || {}), [n]: { ...cur, strokes: [...cur.strokes, d.stroke] } } } }), { draw: "none" }); r.pdf = kb.rems[id].pdf; return; }
    const x = (e.clientX - d.b.left) / d.b.width, y = (e.clientY - d.b.top) / d.b.height; d.box.remove();
    const box = [Math.min(x, d.p[0]), Math.min(y, d.p[1]), Math.abs(x - d.p[0]), Math.abs(y - d.p[1])];
    if (box[2] < 0.03 || box[3] < 0.03) return;
    const cv = $("canvas", d.page); if (!cv) return;
    const out = document.createElement("canvas"); out.width = Math.round(box[2] * cv.width); out.height = Math.round(box[3] * cv.height);
    out.getContext("2d").drawImage(cv, box[0] * cv.width, box[1] * cv.height, out.width, out.height, 0, 0, out.width, out.height);
    const blobOut = await new Promise((ok) => out.toBlob(ok, "image/png"));
    const imgId = await (await tools()).addImage(new File([blobOut], `page-${n}.png`, { type: "image/png" }));
    api.change(() => M.create(kb, { parent: id, text: "", image: { id: imgId, w: out.width, h: out.height, occl: [], label: `${M.nameOf(kb, id)}, page ${n}` }, src: { kind: "pdf", rem: id, page: n } }), { draw: "none" });
    drawNotes(); setMode("region");
    api.toast(`Cut out as an image in your notes. <a href="#/notes/${id}">Open it</a> to hide labels for image occlusion.`);
  });
  $("#pdf-zi", main).onclick = () => { zoom = Math.min(3, zoom + 0.25); kb.settings.pdfZoom = zoom; S.save(); build(); };
  $("#pdf-zo", main).onclick = () => { zoom = Math.max(0.5, zoom - 0.25); kb.settings.pdfZoom = zoom; S.save(); build(); };
  // search: the first page with each word, then the next on Enter
  let hits = [], hi = 0;
  $("#pdf-q", main).addEventListener("keydown", async (e) => {
    if (e.key !== "Enter") return;
    const q = e.target.value.trim().toLowerCase(); if (!q) return;
    if (!hits.length || hits.q !== q) {
      for (let i = 1; i <= pdf.numPages; i++) if (!texts.has(i)) { const tc = await (await pdf.getPage(i)).getTextContent(); texts.set(i, tc.items.map((x) => x.str).join(" ")); }
      hits = [...texts].filter(([, t]) => t.toLowerCase().includes(q)).map(([p]) => p).sort((a, b) => a - b); hits.q = q; hi = 0;
    } else hi = (hi + 1) % hits.length;
    if (!hits.length) return api.toast("Not found in this PDF.");
    $(`#pdf-p${hits[hi]}`, main)?.scrollIntoView({ block: "start", behavior: "smooth" });
    api.toast(`Page ${hits[hi]} (${hi + 1} of ${hits.length} pages). Enter for the next.`);
  });
  // keep the PDF's text with the document, for guided learning and Ask your notes
  if (!(await S.getText(r.pdf.file))) {
    (async () => { let t = ""; for (let i = 1; i <= Math.min(pdf.numPages, 80); i++) { if (!texts.has(i)) { const tc = await (await pdf.getPage(i)).getTextContent(); texts.set(i, tc.items.map((x) => x.str).join(" ")); } t += `\n[page ${i}]\n${texts.get(i)}`; } await S.setText(r.pdf.file, t); })().catch(() => {});
  }
}
