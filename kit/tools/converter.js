// The notes converter (Tools): notes in any format (typed, pasted, a .txt, .md or PDF file, or a Gradify lesson)
// into any of: a mind map, flashcards, a chant to say along to (read aloud in the device's own voice, on a beat),
// and a cheatsheet of Liquid Glass tiles. Built by kit/tools/convert.js from the learner's own words.
import { useTool, backLink, lessonPicker, factKey, esc } from "./tools.js";
import { packOf, mapOf, deckOf, chantOf, chantLines, cheatsheetOf } from "./convert.js";
import { parseDeck } from "./cards.js";
import { saveDeck, saveMap, uid } from "./store.js";
import { mindElixir, elixirTheme, scene, toPng } from "../maps/view.js";
import { glassDiagram } from "../core/glass-diagrams.js";
import { hydrate as glassIcons } from "../core/glass-icons.js";

const OUTPUTS = [["map", "Mind map"], ["cards", "Flashcards"], ["chant", "Chant with a voice"], ["sheet", "Cheatsheet"]];
const hash = (s) => { let h = 2166136261; for (const ch of String(s)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return (h >>> 0).toString(36); };
const fmt = (n, one, many) => `${n} ${n === 1 ? one : many}`;
let player = null;

export async function renderConverter(view, ctx) {
  view.innerHTML = `<div class="tl tl-wide">${backLink()}
    <div class="deck-head"><div><span class="kicker lo-kicker">Tools</span><h1>Notes converter</h1><p class="sub">Paste notes in any format, upload a file or pick facts from a lesson, then choose what to make.</p></div></div>
    <div class="tl-split tl-conv"><div class="tl-edit panel glass">
      <input class="tl-title" placeholder="Title (optional)" aria-label="Title">
      <textarea class="tl-text" placeholder="Paste your notes: bullet points, headings, 'term: definition' lines, paragraphs or a mix." aria-label="Your notes"></textarea>
      <div class="tl-tools"><label class="tl-mini">Upload a file<input type="file" accept=".txt,.md,.markdown,.pdf,text/plain,application/pdf" hidden data-file></label><button type="button" class="tl-mini" data-act="lessons">From lessons</button></div>
      <div class="tl-lessons" hidden></div>
      <fieldset class="tl-outs"><legend>Make</legend>${OUTPUTS.map(([k, v], i) => `<label class="tl-chip"><input type="checkbox" value="${k}" ${i < 2 ? "checked" : ""}><span>${v}</span></label>`).join("")}</fieldset>
      <button type="button" class="btn btn-primary lg" data-act="go"><span>Convert</span></button>
    </div><div class="tl-out"></div></div></div>`;
  const ta = view.querySelector(".tl-text"), out = view.querySelector(".tl-out");
  view.querySelector("[data-file]").addEventListener("change", async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try { const { readFile } = await import("../notes/studio.js"); ta.value = await readFile(f); if (!view.querySelector(".tl-title").value) view.querySelector(".tl-title").value = f.name.replace(/\.[a-z0-9]+$/i, ""); }
    catch (err) { ctx.toast?.(esc(err.message || "That file couldn't be read.")); }
  });
  const lessons = view.querySelector(".tl-lessons");
  view.querySelector(".tl-edit").addEventListener("click", async (e) => {
    const b = e.target.closest("[data-act]"); if (!b) return;
    if (b.dataset.act === "lessons") {
      lessons.hidden = !lessons.hidden;
      if (!lessons.hidden && !lessons.childElementCount) {
        const on = new Set(); let lastSection = null;
        lessonPicker(lessons, { isOn: (k) => on.has(k), onToggle: (h, g, f, yes) => {
          const k = factKey(h, f); if (!yes || on.has(k)) return; on.add(k);
          if (!view.querySelector(".tl-title").value) view.querySelector(".tl-title").value = h.title;
          const head = g.section !== lastSection ? `\n${g.section.toUpperCase()}\n` : ""; lastSection = g.section;
          ta.value = `${ta.value.replace(/\s*$/, "")}\n${head}${f.kind === "term" && f.detail ? `${f.title}: ${f.detail}` : f.text}`.replace(/^\n+/, "");
        } });
      }
    }
    if (b.dataset.act !== "go") return;
    const text = ta.value.trim(), wants = [...view.querySelectorAll(".tl-outs input:checked")].map((x) => x.value);
    if (text.length < 20) { ctx.toast?.("Add a few lines of notes first."); return; }
    if (!wants.length) { ctx.toast?.("Choose at least one thing to make."); return; }
    if (!(await useTool("convert", hash(text), ctx))) return;
    const p = packOf(text, view.querySelector(".tl-title").value.trim() || "My notes");
    if (!p.topics.length) { out.innerHTML = `<article class="panel glass"><h3>Nothing to convert yet</h3><p class="sub">Gradify reads notes written as full sentences or as "term: what it means" lines. Try adding a few of those.</p></article>`; return; }
    out.innerHTML = `<p class="sub tl-found">${esc(p.summary)}</p>${wants.map((w) => `<section class="tl-res" data-out="${w}"></section>`).join("")}`;
    for (const w of wants) await ({ map: showMap, cards: showCards, chant: showChant, sheet: showSheet })[w](out.querySelector(`[data-out="${w}"]`), p, ctx);
    out.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

async function showMap(el, p) {
  const data = { nodeData: mapOf(p) };
  el.innerHTML = `<div class="tl-rh"><h2>Mind map</h2><div class="tl-bar"><button type="button" class="btn btn-light lg btn-sm" data-edit><span>Edit in the mind map creator</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-png><span>4K image</span></button></div></div><div class="tl-stage tl-mini-stage"><div class="tl-map mm-canvas"></div></div>`;
  const MindElixir = await mindElixir();
  const mind = new MindElixir({ el: el.querySelector(".tl-map"), direction: MindElixir.SIDE, editable: false, contextMenu: false, toolBar: false, keypress: false, alignment: "root", theme: elixirTheme(document.documentElement.dataset.theme !== "light") });
  mind.init(data);
  const { fitTo } = await import("./mapmaker.js");
  requestAnimationFrame(() => fitTo(mind, el.querySelector(".tl-stage")));
  el.querySelector("[data-edit]").addEventListener("click", () => { const m = saveMap({ id: uid("m"), title: p.title, data }); location.hash = `#/tools/map/${m.id}`; });
  el.querySelector("[data-png]").addEventListener("click", async () => { const s = scene(mind); s.title = p.title; s.map = "Mind map"; const blob = await toPng(s); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `${p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-map-4k.png`; a.click(); });
}

function showCards(el, p) {
  const text = deckOf(p), cards = parseDeck(text);
  el.innerHTML = `<div class="tl-rh"><h2>Flashcards</h2><div class="tl-bar"><button type="button" class="btn btn-light lg btn-sm" data-open><span>Open in the flashcard creator</span></button></div></div>
    <p class="sub">${fmt(cards.length, "card", "cards")}, scheduled with spaced repetition once you open them.</p>
    <ol class="tl-list">${cards.slice(0, 8).map((c) => `<li class="tl-pv"><div class="tl-f">${esc(c.front.replace(/\{\{…\}\}/g, "…"))}</div><div class="tl-b">${esc(c.back.replace(/\*\*/g, ""))}</div></li>`).join("")}</ol>${cards.length > 8 ? `<p class="sub">and ${cards.length - 8} more</p>` : ""}`;
  el.querySelector("[data-open]").addEventListener("click", () => { const d = saveDeck({ id: uid("d"), title: p.title, text, style: "card" }); location.hash = `#/tools/cards/${d.id}`; });
}

// ---------- the chant: the device's own voice (Web Speech), each line on the beat ----------
function showChant(el, p) {
  const c = chantOf(p), lines = chantLines(c), synth = window.speechSynthesis;
  el.innerHTML = `<div class="tl-rh"><h2>Chant</h2><div class="tl-bar">
      <button type="button" class="btn btn-primary lg btn-sm" data-play><span>Play</span></button>
      <label class="tl-sel">Style <select data-style><option value="chant">Chant</option><option value="song">Sing-song</option><option value="calm">Calm</option></select></label>
      <label class="tl-sel">Speed <input type="range" min="70" max="130" value="96" data-bpm aria-label="Beats per minute"></label>
      <label class="tl-sel">Voice <select data-voice><option value="">Your device's voice</option></select></label></div></div>
    ${synth ? "" : '<p class="sub">This browser can\'t read aloud, but you can still say the chant yourself.</p>'}
    <ol class="tl-chant">${lines.map((l, i) => `<li data-i="${i}" class="${l.part === "Chorus" ? "chorus" : l.part === "Hook" ? "hook" : ""}">${l.part !== lines[i - 1]?.part && l.part !== "Hook" ? `<span class="tl-part">${esc(l.part)}</span>` : ""}${esc(l.text)}</li>`).join("")}</ol>`;
  const vs = el.querySelector("[data-voice]");
  const fill = () => { const voices = (synth?.getVoices() || []).filter((v) => /^en/i.test(v.lang)); vs.innerHTML = `<option value="">Your device's voice</option>${voices.map((v) => `<option value="${esc(v.name)}">${esc(v.name)}</option>`).join("")}`; };
  if (synth) { fill(); synth.onvoiceschanged = fill; }
  const btn = el.querySelector("[data-play]");
  btn.addEventListener("click", () => {
    if (player) { player.stop(); return; }
    const style = el.querySelector("[data-style]").value, bpm = +el.querySelector("[data-bpm]").value;
    const voice = synth?.getVoices().find((v) => v.name === vs.value) || null;
    player = playChant(lines, { style, bpm, voice, onLine: (i) => { el.querySelectorAll(".tl-chant li").forEach((li) => li.classList.toggle("now", +li.dataset.i === i)); el.querySelector(`.tl-chant li[data-i="${i}"]`)?.scrollIntoView({ block: "nearest", behavior: "smooth" }); },
      onEnd: () => { player = null; btn.querySelector("span").textContent = "Play"; el.querySelectorAll(".tl-chant li").forEach((li) => li.classList.remove("now")); } });
    btn.querySelector("span").textContent = "Stop";
  });
}
/** Say each line on a beat: a soft click track (Web Audio) and the line spoken at the start of its bar. */
function playChant(lines, { style, bpm, voice, onLine, onEnd }) {
  const synth = window.speechSynthesis, AC = window.AudioContext || window.webkitAudioContext, ac = AC ? new AC() : null;
  let stopped = false, i = 0, timer = 0;
  const beat = 60 / bpm, bar = beat * 4;
  const click = (t, accent) => { if (!ac || style === "calm") return; const o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = accent ? 1320 : 880; g.gain.setValueAtTime(accent ? 0.16 : 0.08, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06); o.connect(g).connect(ac.destination); o.start(t); o.stop(t + 0.07); };
  const say = (text, k) => {
    if (!synth) return;
    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.rate = style === "calm" ? 0.9 : Math.min(1.5, 0.85 + (bpm - 70) / 150);
    // sing-song: the pitch rises and falls line by line; chant: steady and bright
    u.pitch = style === "song" ? [1.0, 1.35, 1.15, 0.85][k % 4] : style === "chant" ? 1.1 : 1;
    synth.speak(u);
  };
  const next = () => {
    if (stopped) return;
    if (i >= lines.length) { stop(); return; }
    const t0 = ac ? ac.currentTime + 0.05 : 0;
    for (let b = 0; b < 4; b++) click(t0 + b * beat, b === 0);
    onLine(i); say(lines[i].text, i);
    // long lines get two bars
    const bars = lines[i].text.split(" ").length > 9 ? 2 : 1;
    i++; timer = setTimeout(next, bar * bars * 1000);
  };
  const stop = () => { stopped = true; clearTimeout(timer); synth?.cancel(); ac?.close?.(); onEnd(); };
  ac?.resume?.(); next();
  return { stop };
}

// ---------- the cheatsheet: a Liquid Glass grid, a tile per topic ----------
async function showSheet(el, p, ctx) {
  const s = cheatsheetOf(p);
  el.innerHTML = `<div class="tl-rh"><h2>Cheatsheet</h2><div class="tl-bar"><button type="button" class="btn btn-light lg btn-sm" data-print><span>Print</span></button></div></div>
    <div class="tl-sheet"><h3 class="tl-sheet-t">${esc(s.title)}</h3><div class="tl-sgrid">${s.tiles.map((t) => `<article class="tl-stile panel glass">
      <header><span data-g3d="${esc(`${t.name} ${t.items.map((x) => x.term || "").join(" ")}`)}" data-g3d-size="44" data-g3d-unique></span><b>${esc(t.name)}</b>${t.mnemonic && t.items.filter((x) => x.term).length > 1 ? `<span class="tl-mn" title="First letters, to remember them by">${esc(t.mnemonic)}</span>` : ""}</header>
      ${t.items.length >= 3 && t.items.length <= 6 && t.items.every((x) => x.term) ? glassDiagram({ kind: "hub", title: t.name, items: t.items.map((x) => x.term) }, { size: "sm", caption: false }) : ""}
      <ul>${t.items.map((x) => `<li>${x.term ? `<b>${esc(x.term)}</b> ${esc(x.text)}` : x.mono ? `<code>${esc(x.text)}</code>` : esc(x.text)}</li>`).join("")}</ul></article>`).join("")}</div></div>`;
  glassIcons(el, ctx.site || "Gradify").catch(() => {});
  el.querySelector("[data-print]").addEventListener("click", () => { document.body.classList.add("tl-printing"); el.classList.add("tl-print-me"); window.print(); setTimeout(() => { document.body.classList.remove("tl-printing"); el.classList.remove("tl-print-me"); }, 500); });
}
