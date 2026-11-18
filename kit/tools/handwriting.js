// Handwriting to text (app.html#/tools/handwriting): write with a finger, pen or stylus (or upload a photo of a
// handwritten page) and get searchable text, to keep in the Notebook or turn into flashcards.
// Recognition runs on the device: the browser's own handwriting recogniser where there is one (Chrome on Android and
// ChromeOS: navigator.createHandwritingRecognizer, which reads the strokes), and otherwise Tesseract OCR
// (tesseract.js, loaded on first use), which reads the picture. Nothing is sent to Gradify.
import { savePage, saveDeck } from "./store.js";
import { backLink, esc, useTool } from "./tools.js";

const TESSERACT = "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js";
let tessP = null;
const loadTesseract = () => (tessP ||= new Promise((ok, no) => { if (window.Tesseract) return ok(window.Tesseract); const s = document.createElement("script"); s.src = TESSERACT; s.onload = () => ok(window.Tesseract); s.onerror = () => { tessP = null; no(new Error("The text reader couldn't load. Check your connection and try again.")); }; document.head.append(s); }));

export async function renderHandwriting(view, ctx) {
  const native = "createHandwritingRecognizer" in navigator;
  view.innerHTML = `<div class="tl">${backLink()}<div class="deck-head"><div><span class="kicker lo-kicker">Notes and creation</span><h1>Handwriting to text</h1><p class="sub">Write by hand with your finger, a pen or a stylus, or upload a photo of handwritten notes, and Gradify turns it into text you can search, keep in your Notebook or make into flashcards. It's read on your device. Clear, joined-up-free writing reads best.</p></div></div>
    <div class="hw panel glass"><div class="tl-bar"><button type="button" class="chip" data-tool="pen" aria-pressed="true">Pen</button><button type="button" class="chip" data-tool="erase" aria-pressed="false">Eraser</button>
      <label class="tl-sel">Size <input type="range" min="2" max="10" value="4" data-size aria-label="Pen size"></label><button type="button" class="btn btn-ghost lg btn-sm" data-undo><span>Undo</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-clear><span>Clear</span></button>
      <label class="btn btn-ghost lg btn-sm hw-up"><span>Upload a photo</span><input type="file" accept="image/*" hidden></label></div>
      <canvas class="hw-pad" aria-label="Writing pad: write here with a finger, pen or stylus"></canvas>
      <div class="tl-bar"><button type="button" class="btn btn-primary lg btn-sm" data-read><span>Turn into text</span></button><span class="sub hw-msg" aria-live="polite">${native ? "Using your device's handwriting reader." : ""}</span></div></div>
    <div class="hw-out panel glass" hidden><h3>Your text</h3><textarea class="hw-text" rows="8" aria-label="The recognised text: correct anything it misread"></textarea>
      <div class="tl-bar"><button type="button" class="btn btn-light lg btn-sm" data-page><span>Save to my Notebook</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-cards><span>Make flashcards from it</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-copy><span>Copy</span></button></div></div></div>`;
  const cv = view.querySelector(".hw-pad"), g = cv.getContext("2d"), msg = view.querySelector(".hw-msg");
  const strokes = []; let photo = null, tool = "pen";
  const size = () => +view.querySelector("[data-size]").value;
  const fit = () => { const r = cv.getBoundingClientRect(), d = devicePixelRatio || 1; cv.width = r.width * d; cv.height = r.height * d; g.setTransform(d, 0, 0, d, 0, 0); redraw(); };
  function redraw() {
    const r = cv.getBoundingClientRect(); g.fillStyle = "#fff"; g.fillRect(0, 0, r.width, r.height);
    if (photo) { const k = Math.min(r.width / photo.width, r.height / photo.height); g.drawImage(photo, 0, 0, photo.width * k, photo.height * k); }
    g.strokeStyle = "#dfe3ee"; g.lineWidth = 1; for (let y = 48; y < r.height; y += 48) { g.beginPath(); g.moveTo(12, y); g.lineTo(r.width - 12, y); g.stroke(); }
    for (const s of strokes) { g.strokeStyle = s.erase ? "#fff" : "#111"; g.lineWidth = s.w; g.lineCap = g.lineJoin = "round"; g.beginPath(); s.pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke(); }
  }
  let cur = null;
  const pos = (e) => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top, Date.now()]; };
  cv.addEventListener("pointerdown", (e) => { cv.setPointerCapture(e.pointerId); cur = { pts: [pos(e)], w: tool === "erase" ? size() * 5 : size() * (e.pressure && e.pointerType === "pen" ? 0.6 + e.pressure : 1), erase: tool === "erase" }; strokes.push(cur); e.preventDefault(); });
  cv.addEventListener("pointermove", (e) => { if (!cur) return; cur.pts.push(pos(e)); redraw(); });
  addEventListener("pointerup", () => { cur = null; });
  cv.style.touchAction = "none";
  view.querySelectorAll("[data-tool]").forEach((b) => b.addEventListener("click", () => { tool = b.dataset.tool; view.querySelectorAll("[data-tool]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); }));
  view.querySelector("[data-undo]").addEventListener("click", () => { strokes.pop(); redraw(); });
  view.querySelector("[data-clear]").addEventListener("click", () => { strokes.length = 0; photo = null; redraw(); });
  view.querySelector(".hw-up input").addEventListener("change", async (e) => { const f = e.target.files[0]; if (!f) return; photo = await createImageBitmap(f); redraw(); msg.textContent = "Photo added. Press Turn into text."; });
  new ResizeObserver(fit).observe(cv); fit();

  const viaNative = async () => {
    const rec = await navigator.createHandwritingRecognizer({ languages: ["en"] });
    const drawing = rec.startDrawing({ recognitionType: "text", inputType: "touch" });
    for (const s of strokes.filter((x) => !x.erase)) { const st = new HandwritingStroke(); const t0 = s.pts[0][2]; s.pts.forEach(([x, y, t]) => st.addPoint({ x, y, t: t - t0 })); drawing.addStroke(st); }
    const res = await drawing.getPrediction(); drawing.clear(); rec.finish?.();
    return res?.[0]?.text || "";
  };
  const viaOcr = async () => {
    const T = await loadTesseract();
    msg.textContent = "Reading your writing… (the first time takes a few seconds)";
    const { data } = await T.recognize(cv, "eng");
    return String(data.text || "").replace(/\n{3,}/g, "\n\n").trim();
  };
  view.querySelector("[data-read]").addEventListener("click", async (e) => {
    if (!strokes.length && !photo) { msg.textContent = "Write something first, or upload a photo."; return; }
    if (!(await useTool("handwriting", `hw-${Date.now()}`, ctx))) return;
    const b = e.currentTarget; b.disabled = true; msg.textContent = "Reading…";
    let text = "";
    try { text = native && strokes.length && !photo ? await viaNative().catch(() => viaOcr()) : await viaOcr(); }
    catch (err) { msg.textContent = err.message; b.disabled = false; return; }
    b.disabled = false;
    msg.textContent = text ? "Done. Correct anything it misread." : "Couldn't make out any words. Try writing larger and more clearly, in print.";
    const out = view.querySelector(".hw-out"), ta = view.querySelector(".hw-text");
    out.hidden = false; ta.value = (ta.value ? `${ta.value}\n` : "") + text; ta.focus();
  });
  const text = () => view.querySelector(".hw-text").value.trim();
  view.querySelector("[data-page]").addEventListener("click", () => { if (!text()) return; const p = savePage({ title: `Handwritten notes, ${new Date().toLocaleDateString("en-GB")}`, text: text(), emoji: "✍️", colour: "#8b3dff" }); location.hash = `#/tools/notebook/${p.id}`; });
  view.querySelector("[data-cards]").addEventListener("click", async () => {
    if (!text()) return;
    const { suggestCards } = await import("./cards.js");
    const lines = await suggestCards(text());
    const d = saveDeck({ title: "From my handwriting", text: `${text()}\n\n${lines.join("\n")}` });
    ctx.toast(lines.length ? `Made ${lines.length} suggested cards. Check them in the flashcard creator.` : "Saved as a deck. Add cards with >> or :: in the flashcard creator.");
    location.hash = `#/tools/cards/${d.id}`;
  });
  view.querySelector("[data-copy]").addEventListener("click", () => { navigator.clipboard?.writeText(text()).then(() => ctx.toast("Copied.")); });
}
export { esc };
