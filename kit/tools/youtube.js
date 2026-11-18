// YouTube to notes (app.html#/tools/youtube): paste a YouTube link and get notes in chapters, flashcards, a mind map
// and a chat about the video. The captions come through Gradify's youtube-notes function
// (supabase/functions/youtube-notes), because browsers can't read them from YouTube directly; or paste the transcript.
// Notes, cards and the map are made in the browser by Gradify's extractor (kit/tools/convert.js), and the chat answers
// only from what's said in the video, with the moment it's said, so it never makes anything up.
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../../gradify.config.js";
import { packOf, deckOf, mapOf } from "./convert.js";
import { saveDeck, saveMap } from "./store.js";
import { backLink, esc, useTool } from "./tools.js";

const STOP = new Set("a an the and or but of to in on at by for with from into is are was were be been it its this that these those i you he she we they what which who how why does do did so as if then than there here about just like um uh yeah okay really very can will would could should".split(" "));
const wordsOf = (s) => (String(s).toLowerCase().match(/[a-z0-9']+/g) || []).filter((w) => w.length > 2 && !STOP.has(w)).map((w) => w.replace(/(ies)$/, "y").replace(/(s|ing|ed)$/, ""));
export const clock = (t) => { t = Math.max(0, Math.floor(t)); const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60; return `${h ? `${h}:${String(m).padStart(2, "0")}` : m}:${String(s).padStart(2, "0")}`; };
export { videoIdOf };
function videoIdOf(url) {
  const s = String(url ?? "").trim(); if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|[?&]v=|\/(?:embed|shorts|live|v)\/)([\w-]{11})/); return m ? m[1] : null;
}

/** Chapters: the captions joined into passages of about `secs` seconds, each starting a sentence where it can. Pure. */
export function chaptersOf(segments, secs = 75) {
  const out = []; let cur = null;
  for (const s of segments) {
    if (!cur || (s.t - cur.t >= secs && /[.!?]$/.test(cur.text)) || s.t - cur.t >= secs * 1.6) { cur = { t: s.t, text: "" }; out.push(cur); }
    cur.text = `${cur.text} ${s.text}`.trim();
  }
  return out.map((c) => ({ ...c, text: c.text.replace(/\s+/g, " ").replace(/\[(music|applause|laughter)\]/gi, "").trim() })).filter((c) => c.text);
}
/** Transcript text pasted from YouTube ("0:12 words…" lines) as segments. Pure. */
export function parseTranscript(text) {
  const segs = []; let t = 0;
  for (const line of String(text).split("\n").map((l) => l.trim()).filter(Boolean)) {
    const m = line.match(/^(\d{1,2}:)?\d{1,2}:\d{2}\s*(.*)$/);
    if (m) { const parts = line.match(/^[\d:]+/)[0].split(":").map(Number); t = parts.reduce((a, x) => a * 60 + x, 0); if (m[2]) segs.push({ t, text: m[2] }); }
    else segs.push({ t, text: line });
  }
  return segs;
}
/** The passages that best answer a question, by shared words (rarer words count more). Pure. */
export function answerFrom(chapters, q, n = 2) {
  const qw = [...new Set(wordsOf(q))]; if (!qw.length) return [];
  const docs = chapters.map((c) => new Set(wordsOf(c.text)));
  const idf = (w) => Math.log((1 + docs.length) / (1 + docs.filter((d) => d.has(w)).length)) + 0.2;
  return chapters.map((c, i) => ({ c, score: qw.reduce((a, w) => a + (docs[i].has(w) ? idf(w) : 0), 0) })).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, n).map((x) => x.c);
}
// the sentence of a passage that shares most words with the question
const bestSentence = (text, q) => { const qw = new Set(wordsOf(q)); return (text.match(/[^.!?]+[.!?]?/g) || [text]).map((s) => [wordsOf(s).filter((w) => qw.has(w)).length, s.trim()]).sort((a, b) => b[0] - a[0])[0][1]; };

async function fetchCaptions(url) {
  if (!SUPABASE_URL) throw new Error("Reading YouTube needs Gradify's server, which isn't set up on this copy. Paste the transcript instead.");
  const r = await fetch(`${SUPABASE_URL}/functions/v1/youtube-notes`, { method: "POST", headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY }, body: JSON.stringify({ url }) });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(d.error || "Couldn't read that video."), { data: d });
  return d;
}

export async function renderYouTube(view, ctx) {
  view.innerHTML = `<div class="tl">${backLink()}<div class="deck-head"><div><span class="kicker lo-kicker">Notes and creation</span><h1>YouTube to notes</h1><p class="sub">Paste a YouTube link (or the video's transcript) and Gradify makes notes in chapters, flashcards and a mind map, and you can ask questions about it: every answer comes from what's said in the video, with the moment it's said. YouTube doesn't always let Gradify read a video; when it doesn't, paste the transcript below.</p></div></div>
    <form class="tl-search panel glass yt-form"><input type="url" placeholder="https://www.youtube.com/watch?v=…" aria-label="YouTube link" required><button class="btn btn-primary lg btn-sm"><span>Make notes</span></button></form>
    <details class="panel glass yt-paste"><summary>Paste the transcript instead</summary><p class="sub">On YouTube, open the video's description, press <b>Show transcript</b>, select it all and paste it here.</p><textarea rows="6" aria-label="Transcript"></textarea><button type="button" class="btn btn-light lg btn-sm" data-paste><span>Use this transcript</span></button></details>
    <p class="sub yt-msg" aria-live="polite"></p><div class="yt-out"></div></div>`;
  const msg = view.querySelector(".yt-msg"), out = view.querySelector(".yt-out"), input = view.querySelector(".yt-form input");
  let lastId = null, lastTitle = "";
  view.querySelector(".yt-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = videoIdOf(input.value); if (!id) { msg.textContent = "That doesn't look like a YouTube link."; return; }
    if (!(await useTool("youtube", id, ctx))) return;
    msg.textContent = "Reading the video…"; out.innerHTML = ""; lastId = id;
    try { const d = await fetchCaptions(input.value); lastTitle = d.title; msg.textContent = `${d.auto ? "From YouTube's automatic captions, so a few words may be wrong." : "From the video's captions."}`; show(d.id, d.title, d.channel, d.segments); }
    catch (err) { lastTitle = err.data?.title || ""; msg.textContent = err.message; view.querySelector(".yt-paste").open = true; }
  });
  view.querySelector("[data-paste]").addEventListener("click", async () => {
    const segs = parseTranscript(view.querySelector(".yt-paste textarea").value);
    if (segs.length < 3) { msg.textContent = "Paste a few lines of the transcript first."; return; }
    if (!(await useTool("youtube", lastId || `paste-${segs.length}`, ctx))) return;
    msg.textContent = ""; show(lastId || videoIdOf(input.value), lastTitle || "YouTube video", "", segs);
  });

  function show(id, title, channel, segs) {
    const chapters = chaptersOf(segs), text = chapters.map((c) => c.text).join("\n"), pack = packOf(text, title || "YouTube video");
    out.innerHTML = `<div class="yt">
      ${id ? `<div class="yt-player panel glass"><iframe src="https://www.youtube-nocookie.com/embed/${esc(id)}" title="${esc(title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>` : ""}
      <div class="yt-head"><h2>${esc(title || "Your video")}</h2>${channel ? `<span class="sub">${esc(channel)}</span>` : ""}
        <div class="tl-bar"><button type="button" class="btn btn-light lg btn-sm" data-cards><span>Save as flashcards</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-map><span>Make a mind map</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-copy><span>Copy the notes</span></button></div></div>
      <div class="seg-chips" role="tablist"><button type="button" class="chip" data-t="notes" aria-pressed="true">Notes</button><button type="button" class="chip" data-t="key" aria-pressed="false">Key points</button><button type="button" class="chip" data-t="chat" aria-pressed="false">Chat about the video</button></div>
      <section data-p="notes" class="panel glass yt-notes"><ol>${chapters.map((c) => `<li><button type="button" class="yt-t" data-at="${c.t}">${clock(c.t)}</button><p>${esc(c.text)}</p></li>`).join("")}</ol></section>
      <section data-p="key" class="panel glass" hidden>${pack.topics.length ? pack.topics.map((t) => `<h3>${esc(t.name)}</h3><ul>${t.facts.map((f) => `<li>${f.term ? `<b>${esc(f.term)}</b>: ` : ""}${esc(f.term ? f.statement.replace(new RegExp(`^${f.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*[:–-]?\\s*`, "i"), "") : f.statement)}</li>`).join("")}</ul>`).join("") : `<p class="sub">Gradify couldn't pick out definitions from this video. The notes tab has everything that was said.</p>`}</section>
      <section data-p="chat" class="panel glass yt-chat" hidden><ol class="yt-msgs"><li class="yt-bot">Ask anything about the video. I answer only from what's said in it, and show you where.</li></ol><form class="tl-search"><input placeholder="What does it say about…?" aria-label="Ask about the video"><button class="btn btn-primary lg btn-sm"><span>Ask</span></button></form></section></div>`;
    const seek = (t) => { const f = out.querySelector("iframe"); if (f) { f.src = `https://www.youtube-nocookie.com/embed/${id}?start=${Math.floor(t)}&autoplay=1`; f.scrollIntoView({ behavior: "smooth", block: "center" }); } };
    out.addEventListener("click", (e) => { const t = e.target.closest("[data-at]"); if (t) seek(+t.dataset.at); const tab = e.target.closest("[data-t]"); if (tab) { out.querySelectorAll("[data-t]").forEach((x) => x.setAttribute("aria-pressed", String(x === tab))); out.querySelectorAll("[data-p]").forEach((p) => { p.hidden = p.dataset.p !== tab.dataset.t; }); } });
    out.querySelector("[data-cards]").addEventListener("click", () => { const d = saveDeck({ title: title || "YouTube video", text: `${deckOf(pack)}\n\n# Source\nhttps://youtu.be/${id || ""}` }); ctx.toast("Saved. Check the cards, then review them."); location.hash = `#/tools/cards/${d.id}`; });
    out.querySelector("[data-map]").addEventListener("click", () => { const m = saveMap({ title: title || "YouTube video", data: { nodeData: mapOf(pack) } }); location.hash = `#/tools/map/${m.id}`; });
    out.querySelector("[data-copy]").addEventListener("click", () => navigator.clipboard?.writeText(`${title}\n\n${chapters.map((c) => `[${clock(c.t)}] ${c.text}`).join("\n\n")}`).then(() => ctx.toast("Copied.")));
    out.querySelector(".yt-chat form").addEventListener("submit", (e) => {
      e.preventDefault(); const inp = e.target.querySelector("input"), q = inp.value.trim(); if (!q) return; inp.value = "";
      const list = out.querySelector(".yt-msgs"), hits = answerFrom(chapters, q);
      list.insertAdjacentHTML("beforeend", `<li class="yt-me">${esc(q)}</li><li class="yt-bot">${hits.length ? hits.map((c) => `<p>“${esc(bestSentence(c.text, q))}” <button type="button" class="yt-t" data-at="${c.t}">${clock(c.t)}</button></p>`).join("") : "The video doesn't seem to talk about that. Try other words for it."}</li>`);
      list.lastElementChild.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  }
}
