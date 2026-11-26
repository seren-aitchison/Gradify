// Learn tools (app.html#/tools/...): ways to take in a lesson, a unit, your own flashcards or notes.
//   explain     an explainer video: each section a scene, narrated by the device's voice; downloads as a video
//   podcast     chant podcasts: every unit of a course as an episode of chants, played back to back, hands-free
//   audio       audio questions: a question read aloud, a pause to answer (out loud, if the browser can listen), the answer
//   poster      story posters: the topic as a picture story, with a "hide the key words" cloze mode; PNG or SVG
//   dictionary  a subject dictionary of every key term on Gradify, and a thesaurus for writing
//   sheets      key-terms sheets to print, and every lesson's resources to download
import { mountPicker } from "./pick.js";
import { catalogue, unitMaterial, loadUnit, fromLesson, shuffle, termQuestions, plain } from "./material.js";
import { speak, wait, stop, canSpeak, voicePicker } from "./voice.js";
import { backLink, esc, useTool } from "./tools.js";
import { loadIndex } from "./search.js";

const head = (kicker, title, line) => `${backLink()}<div class="deck-head"><div><span class="kicker lo-kicker">${esc(kicker)}</span><h1>${esc(title)}</h1><p class="sub">${line}</p></div></div>`;
const words = (s, n) => { const w = plain(s).split(" "); return w.length <= n ? w.join(" ") : `${w.slice(0, n).join(" ")}…`; };
const download = (name, blob) => { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); };
const slug = (s) => plain(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "gradify";
// stop any voice when the learner leaves the screen
if (typeof addEventListener === "function") addEventListener("hashchange", () => stop());

// ======================= Explainer videos =======================
/** Scenes for an explainer: a title, a scene per section (up to 4 short points), the key terms, a recap. Pure. */
export function scenesOf(m) {
  const scenes = [{ kind: "title", h: m.title, points: [m.from || "A Gradify explainer"], say: [`${m.title}.`, m.from ? `An explainer from ${m.from}.` : ""] }];
  for (const s of m.sections.slice(0, 8)) {
    const pts = s.facts.filter((f) => f.length > 12).slice(0, 4).map((f) => words(f, 22));
    if (pts.length) scenes.push({ kind: "section", h: s.h === "Overview" ? m.title : s.h, points: pts, say: [s.h === "Overview" ? "" : `${s.h}.`, ...pts] });
  }
  if (m.terms.length) { const t = m.terms.slice(0, 5); scenes.push({ kind: "terms", h: "Key terms", points: t.map(([a, b]) => `${a}: ${words(b, 12)}`), say: ["The key terms.", ...t.map(([a, b]) => `${a}: ${words(b, 12)}`)] }); }
  const recap = (m.cards.slice(0, 3).map(([q]) => q));
  if (recap.length) scenes.push({ kind: "recap", h: "Can you answer these?", points: recap, say: ["Before you go, can you answer these?", ...recap] });
  return scenes.map((s) => ({ ...s, say: s.say.filter(Boolean) }));
}
const GRADS = [["#4641ff", "#8b3dff"], ["#f055dd", "#ff6aa8"], ["#ff5a4d", "#ff8a00"], ["#1fae8c", "#3c78d8"], ["#8b3dff", "#f055dd"]];
function wrapText(ctx, text, maxW) { const out = []; let line = ""; for (const w of String(text).split(" ")) { const t = line ? `${line} ${w}` : w; if (ctx.measureText(t).width > maxW && line) { out.push(line); line = w; } else line = t; } if (line) out.push(line); return out; }
/** Draw one frame of a scene: `shown` points revealed, `t` 0..1 through the scene (the progress bar). */
function drawScene(ctx, sc, i, n, shown, t) {
  const W = ctx.canvas.width, H = ctx.canvas.height, [a, b] = GRADS[i % GRADS.length];
  const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, "#0b0b10"); g.addColorStop(1, "#16121f"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W * 0.85, H * 0.1, 10, W * 0.85, H * 0.1, W * 0.6); glow.addColorStop(0, a + "88"); glow.addColorStop(1, "transparent"); ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
  const glow2 = ctx.createRadialGradient(W * 0.1, H, 10, W * 0.1, H, W * 0.5); glow2.addColorStop(0, b + "66"); glow2.addColorStop(1, "transparent"); ctx.fillStyle = glow2; ctx.fillRect(0, 0, W, H);
  const P = W * 0.07;
  ctx.fillStyle = "rgba(255,255,255,.55)"; ctx.font = `600 ${W * 0.016}px Inter, system-ui, sans-serif`; ctx.fillText(`GRADIFY · ${i + 1} / ${n}`, P, P * 0.9);
  if (sc.kind === "title") {
    ctx.fillStyle = "#fff"; ctx.font = `800 ${W * 0.06}px Inter, system-ui, sans-serif`;
    wrapText(ctx, sc.h, W - 2 * P).slice(0, 3).forEach((l, k) => ctx.fillText(l, P, H * 0.42 + k * W * 0.068));
    ctx.fillStyle = "rgba(255,255,255,.7)"; ctx.font = `500 ${W * 0.024}px Inter, system-ui, sans-serif`; ctx.fillText(sc.points[0], P, H * 0.8);
  } else {
    ctx.fillStyle = "#fff"; ctx.font = `800 ${W * 0.042}px Inter, system-ui, sans-serif`;
    const hl = wrapText(ctx, sc.h, W - 2 * P).slice(0, 2); hl.forEach((l, k) => ctx.fillText(l, P, P * 1.9 + k * W * 0.048));
    let y = P * 1.9 + hl.length * W * 0.048 + W * 0.02;
    ctx.font = `500 ${W * 0.024}px Inter, system-ui, sans-serif`;
    sc.points.forEach((p, k) => {
      if (k >= shown) return;
      const lines = wrapText(ctx, p, W - 2 * P - W * 0.04).slice(0, 3);
      const bg = ctx.createLinearGradient(P, 0, P + W * 0.012, 0); bg.addColorStop(0, a); bg.addColorStop(1, b);
      ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(P + W * 0.008, y - W * 0.008, W * 0.007, 0, 7); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.92)"; lines.forEach((l, j) => ctx.fillText(l, P + W * 0.03, y + j * W * 0.032));
      y += lines.length * W * 0.032 + W * 0.018;
    });
  }
  ctx.fillStyle = "rgba(255,255,255,.12)"; ctx.fillRect(0, H - 6, W, 6);
  const bar = ctx.createLinearGradient(0, 0, W, 0); bar.addColorStop(0, "#4641ff"); bar.addColorStop(0.5, "#f055dd"); bar.addColorStop(1, "#ffc002");
  ctx.fillStyle = bar; ctx.fillRect(0, H - 6, W * ((i + t) / n), 6);
}
async function explain(view, ctx) {
  view.innerHTML = `<div class="tl">${head("Learn", "Explainer videos", "Pick a lesson, a unit, your flashcards or your notes. Gradify makes a short narrated explainer: one scene per part of the topic, the key terms, then three questions to check yourself. Download it as a video to watch anywhere.")}<div class="tl-pickbox"></div><div class="tl-out"></div></div>`;
  await mountPicker(view.querySelector(".tl-pickbox"), { label: "Make the explainer", onPick: async (m) => {
    if (!(await useTool("explain", m.title, ctx))) return;
    const scenes = scenesOf(m), out = view.querySelector(".tl-out");
    out.innerHTML = `<div class="ex panel glass"><canvas class="ex-stage" width="1280" height="720" aria-label="Explainer: ${esc(m.title)}"></canvas>
      <p class="ex-cap" aria-live="polite"></p>
      <div class="tl-bar"><button type="button" class="btn btn-primary lg btn-sm" data-play><span>Play</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-prev aria-label="Previous scene">‹</button><button type="button" class="btn btn-ghost lg btn-sm" data-next aria-label="Next scene">›</button>
      <button type="button" class="btn btn-light lg btn-sm" data-rec><span>Download video</span></button>
      <details class="tl-adv"><summary>Voice and speed</summary><div><label class="tl-sel">Speed <select data-rate><option value=".85">Slower</option><option value="1" selected>Normal</option><option value="1.2">Faster</option></select></label><label class="tl-sel">Voice <select data-voice></select></label></div></details></div>
      ${canSpeak() ? "" : `<p class="sub">This browser can't read aloud, so the captions carry the explainer.</p>`}</div>`;
    const cv = out.querySelector("canvas"), c2 = cv.getContext("2d"), cap = out.querySelector(".ex-cap"), btn = out.querySelector("[data-play]");
    voicePicker(out.querySelector("[data-voice]"));
    let at = 0, playing = false, recorder = null;
    const show = (i, shown, t = 0) => drawScene(c2, scenes[i], i, scenes.length, shown, t);
    show(0, 9);
    const play = async (silent = false) => {
      playing = true; btn.querySelector("span").textContent = "Pause";
      for (; at < scenes.length && playing; at++) {
        const sc = scenes[at];
        for (let k = 0; k < sc.say.length && playing; k++) {
          // the scene's heading is said first, then each point appears as it's said
          const shown = sc.kind === "title" ? 9 : Math.max(0, k - (sc.say.length - sc.points.length) + 1);
          show(at, shown, k / sc.say.length); cap.textContent = sc.say[k];
          const ok = silent ? await wait(Math.max(1500, sc.say[k].split(" ").length * 330)) : await speak(sc.say[k], { rate: +out.querySelector("[data-rate]").value });
          if (!ok) { playing = false; break; }
        }
        if (playing) { show(at, 9, 1); await wait(500); }
      }
      if (at >= scenes.length) { at = 0; playing = false; cap.textContent = "The end. Play again, or download it."; }
      btn.querySelector("span").textContent = "Play";
    };
    btn.addEventListener("click", () => { if (playing) { playing = false; stop(); } else play(); });
    out.querySelector("[data-prev]").addEventListener("click", () => { playing = false; stop(); at = Math.max(0, at - 1); show(at, 9); });
    out.querySelector("[data-next]").addEventListener("click", () => { playing = false; stop(); at = Math.min(scenes.length - 1, at + 1); show(at, 9); });
    out.querySelector("[data-rec]").addEventListener("click", async (e) => {
      if (!cv.captureStream || !window.MediaRecorder) { ctx.toast("This browser can't make video files. Try Chrome, Edge or Firefox."); return; }
      if (recorder) return;
      const b = e.currentTarget; b.disabled = true; b.querySelector("span").textContent = "Recording… (plays through once)";
      playing = false; stop(); at = 0;
      const type = ["video/mp4", "video/webm;codecs=vp9", "video/webm"].find((t) => MediaRecorder.isTypeSupported(t)) || "";
      const chunks = []; recorder = new MediaRecorder(cv.captureStream(30), type ? { mimeType: type } : {});
      recorder.ondataavailable = (ev) => ev.data.size && chunks.push(ev.data);
      const done = new Promise((ok) => { recorder.onstop = ok; });
      // the canvas only sends frames when it changes: a gentle redraw keeps the video moving
      const tick = setInterval(() => { c2.fillStyle = "rgba(0,0,0,0.002)"; c2.fillRect(0, 0, 1, 1); }, 1000 / 15);
      recorder.start(); await play(true); recorder.stop(); await done; clearInterval(tick);
      const blob = new Blob(chunks, { type: recorder.mimeType || "video/webm" }); recorder = null;
      download(`${slug(m.title)}-explainer.${/mp4/.test(blob.type) ? "mp4" : "webm"}`, blob);
      b.disabled = false; b.querySelector("span").textContent = "Download video";
    });
  } });
}

// ======================= Chant podcasts =======================
/** A chant episode: for each section a line per point, key terms said twice, and a recap chorus. Pure. */
export function episodeOf(m) {
  const lines = [{ text: `${m.title}.`, part: "Intro" }];
  for (const s of m.sections.slice(0, 10)) {
    const pts = s.facts.filter((f) => f.length > 12).slice(0, 3);
    if (!pts.length) continue;
    if (s.h !== "Overview") lines.push({ text: `${s.h}.`, part: s.h });
    pts.forEach((p) => lines.push({ text: words(p, 16), part: s.h }));
  }
  const terms = m.terms.slice(0, 8);
  terms.forEach(([t, d]) => { lines.push({ text: `${t}: ${words(d, 9)}`, part: "Key terms" }); lines.push({ text: `${t}! ${t}!`, part: "Key terms" }); });
  if (terms.length > 1) {
    const hook = terms.slice(0, 5).map(([t]) => t[0].toUpperCase()).join("-");
    lines.push({ text: `Remember: ${hook}. ${terms.slice(0, 5).map(([t]) => t).join(", ")}.`, part: "Chorus" });
  }
  lines.push({ text: `That's ${m.title}. Say it again!`, part: "Chorus" });
  return lines;
}
async function podcast(view, ctx) {
  const cat = await catalogue();
  const last = (() => { try { return localStorage.getItem("gradify.podcast.course") || ""; } catch { return ""; } })();
  view.innerHTML = `<div class="tl">${head("Learn", "Chant podcasts", "Every unit of a course as an episode: the key points chanted on a beat, each key term said twice, then a chorus to remember them by. Episodes play back to back, so it works on a walk or a commute. Lock your screen and it keeps going on most phones.")}
    <div class="panel glass tp"><div class="tp-row"><label><span class="sub">Show</span><select data-c>${cat.map((c) => `<option value="${esc(c.slug)}" ${c.slug === last ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select></label>
      <details class="tl-adv"><summary>Voice, speed and beat</summary><div><label class="tl-sel">Voice <select data-voice></select></label><label class="tl-sel">Speed <select data-rate><option value=".9">Steady</option><option value="1.05" selected>Normal</option><option value="1.2">Quick</option></select></label>
      <label class="tl-sel"><input type="checkbox" data-beat checked> Beat</label></div></details></div></div>
    <div class="pod panel glass"><div class="pod-now"><span class="pod-art" aria-hidden="true"></span><div><span class="tl-k">Now playing</span><b class="pod-t">Choose an episode</b><span class="sub pod-l" aria-live="polite"></span></div>
      <div class="tl-bar"><button type="button" class="btn btn-ghost lg btn-sm" data-back aria-label="Previous episode">⏮</button><button type="button" class="btn btn-primary lg btn-sm" data-play><span>Play</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-fwd aria-label="Next episode">⏭</button></div></div>
      <ol class="pod-list"></ol></div></div>`;
  voicePicker(view.querySelector("[data-voice]"));
  const sel = view.querySelector("[data-c]"), list = view.querySelector(".pod-list"), btn = view.querySelector("[data-play]");
  let eps = [], cur = -1, playing = false, ac = null;
  const click = () => { if (!view.querySelector("[data-beat]").checked) return; try { ac ||= new (window.AudioContext || window.webkitAudioContext)(); const t = ac.currentTime + 0.02; for (let b = 0; b < 4; b++) { const o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = b ? 880 : 1320; g.gain.setValueAtTime(b ? 0.06 : 0.12, t + b * 0.32); g.gain.exponentialRampToValueAtTime(0.0001, t + b * 0.32 + 0.06); o.connect(g).connect(ac.destination); o.start(t + b * 0.32); o.stop(t + b * 0.32 + 0.07); } } catch { /* no audio */ } };
  const paintList = () => { list.innerHTML = eps.map((e, i) => `<li><button type="button" class="pod-ep ${i === cur ? "now" : ""}" data-i="${i}"><span class="tl-k">Episode ${i + 1}</span><b>${esc(e.title)}</b><span class="sub">${e.lessons} lessons</span></button></li>`).join(""); };
  const load = () => { const c = cat.find((x) => x.slug === sel.value); eps = c.units.map((u) => ({ slug: c.slug, unit: u.id, title: u.title, lessons: u.lessons.length })); cur = -1; paintList(); try { localStorage.setItem("gradify.podcast.course", c.slug); } catch { /* fine */ } };
  sel.addEventListener("change", () => { playing = false; stop(); load(); });
  load();
  const playFrom = async (i) => {
    if (!(await useTool("podcast", `${eps[i].slug}/${eps[i].unit}`, ctx))) return;
    stop(); playing = true; cur = i; paintList(); btn.querySelector("span").textContent = "Pause";
    const e = eps[i]; view.querySelector(".pod-t").textContent = e.title;
    if ("mediaSession" in navigator) { try { navigator.mediaSession.metadata = new MediaMetadata({ title: e.title, artist: "Gradify chant podcast", album: sel.selectedOptions[0].textContent }); navigator.mediaSession.setActionHandler("nexttrack", () => i + 1 < eps.length && playFrom(i + 1)); navigator.mediaSession.setActionHandler("previoustrack", () => playFrom(Math.max(0, i - 1))); } catch { /* fine */ } }
    let m; try { m = await unitMaterial(e.slug, e.unit); } catch (err) { view.querySelector(".pod-l").textContent = err.message; if (i + 1 < eps.length) return playFrom(i + 1); return; }
    const lines = episodeOf(m), rate = () => +view.querySelector("[data-rate]").value;
    for (const [k, l] of lines.entries()) {
      if (!playing || cur !== i) return;
      view.querySelector(".pod-l").textContent = `${l.part}: ${l.text}`;
      click();
      if (!(await speak(l.text, { rate: rate(), pitch: l.part === "Chorus" ? 1.25 : [1, 1.15, 1.05, 0.95][k % 4] }))) return;
      if (!(await wait(250))) return;
    }
    if (playing && cur === i && i + 1 < eps.length) playFrom(i + 1); else { playing = false; btn.querySelector("span").textContent = "Play"; }
  };
  list.addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (b) playFrom(+b.dataset.i); });
  btn.addEventListener("click", () => { if (playing) { playing = false; stop(); btn.querySelector("span").textContent = "Play"; } else playFrom(Math.max(0, cur)); });
  view.querySelector("[data-fwd]").addEventListener("click", () => playFrom(Math.min(eps.length - 1, cur + 1)));
  view.querySelector("[data-back]").addEventListener("click", () => playFrom(Math.max(0, cur - 1)));
}

// ======================= Audio questions =======================
/** The questions to ask aloud: the material's flashcards, then multiple-choice questions said as questions. Pure. */
export function audioQuestions(m, rand = Math.random) {
  const qs = [...m.cards.map(([q, a]) => ({ q, a })), ...m.mcq.map((x) => ({ q: x.q, a: x.right })), ...(m.cards.length + m.mcq.length < 4 ? termQuestions(m.terms, rand).map((x) => ({ q: `What is ${x.term}?`, a: x.right })) : [])];
  return shuffle(qs.filter((x) => x.q && x.a), rand).slice(0, 20);
}
const close = (said, ans) => { const w = (s) => new Set(plain(s).toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((x) => x.length > 3)); const A = w(ans), S = w(said); if (!A.size) return false; let hit = 0; for (const x of A) if (S.has(x)) hit++; return hit / A.size >= 0.5; };
async function audio(view, ctx) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  view.innerHTML = `<div class="tl">${head("Learn", "Audio questions", `Hands-free revision: each question is read aloud, then there's a pause for you to answer, then the answer. ${SR ? "Answer out loud and Gradify listens and tells you if you got it." : "Say your answer in the pause."} Pick what to be asked about.`)}<div class="tl-pickbox"></div><div class="tl-out"></div></div>`;
  await mountPicker(view.querySelector(".tl-pickbox"), { label: "Start", auto: false, onPick: async (m) => {
    if (!(await useTool("audio", m.title, ctx))) return;
    const qs = audioQuestions(m), out = view.querySelector(".tl-out");
    if (!qs.length) { out.innerHTML = `<p class="sub">There are no questions in that yet. Try another lesson.</p>`; return; }
    out.innerHTML = `<div class="aq panel glass"><span class="tl-k aq-n"></span><h2 class="aq-q"></h2><p class="aq-a" hidden></p><p class="sub aq-heard" aria-live="polite"></p>
      <div class="aq-ring" aria-hidden="true"><i></i></div>
      <div class="tl-bar"><button type="button" class="btn btn-primary lg btn-sm" data-go><span>Start</span></button>
      <details class="tl-adv"><summary>Timing and voice</summary><div><label class="tl-sel">Pause to answer <select data-gap><option value="4000">4 s</option><option value="6000" selected>6 s</option><option value="10000">10 s</option></select></label>
      ${SR ? `<label class="tl-sel"><input type="checkbox" data-listen checked> Listen to my answer</label>` : ""}<label class="tl-sel">Voice <select data-voice></select></label></div></details></div>
      <p class="aq-score sub"></p></div>`;
    voicePicker(out.querySelector("[data-voice]"));
    let running = false, right = 0, asked = 0;
    const $ = (s) => out.querySelector(s), btn = $("[data-go]");
    const listen = (ms) => new Promise((ok) => {
      if (!SR || !$("[data-listen]")?.checked) { wait(ms).then(() => ok(null)); return; }
      const r = new SR(); r.lang = "en-GB"; r.interimResults = true; let said = "";
      r.onresult = (e) => { said = [...e.results].map((x) => x[0].transcript).join(" "); $(".aq-heard").textContent = `You said: ${said}`; };
      const end = () => { try { r.stop(); } catch { /* fine */ } ok(said); };
      r.onerror = () => end(); const t = setTimeout(end, ms); r.onend = () => { clearTimeout(t); ok(said); };
      try { r.start(); } catch { clearTimeout(t); wait(ms).then(() => ok(null)); }
    });
    const run = async () => {
      running = true; btn.querySelector("span").textContent = "Stop";
      for (const [i, x] of qs.entries()) {
        if (!running) break;
        $(".aq-n").textContent = `Question ${i + 1} of ${qs.length}`; $(".aq-q").textContent = x.q; $(".aq-a").hidden = true; $(".aq-heard").textContent = "";
        if (!(await speak(x.q))) break;
        $(".aq-ring").classList.add("on"); $(".aq-ring i").style.animationDuration = `${$("[data-gap]").value}ms`;
        const said = await listen(+$("[data-gap]").value); $(".aq-ring").classList.remove("on");
        if (!running) break;
        $(".aq-a").hidden = false; $(".aq-a").textContent = x.a; asked++;
        let verdict = "";
        if (said) { const ok = close(said, x.a); if (ok) right++; verdict = ok ? "That's right. " : "Not quite. "; $(".aq-heard").textContent = `${verdict}You said: ${said}`; }
        if (!(await speak(`${verdict}The answer: ${x.a}`))) break;
        $(".aq-score").textContent = said !== null && SR ? `${right} of ${asked} right so far` : `${asked} asked`;
        await wait(700);
      }
      if (running && asked) { await ctx.store.logActivity?.({ kind: "audio-questions", xp: Math.min(60, asked * 2), detail: { title: m.title, asked, right } }).catch(() => {}); speak(`Done. ${asked} questions.`); }
      running = false; btn.querySelector("span").textContent = "Start again";
    };
    btn.addEventListener("click", () => { if (running) { running = false; stop(); btn.querySelector("span").textContent = "Start again"; } else { right = asked = 0; run(); } });
  } });
}

// ======================= Story posters =======================
/** A poster: the topic told as a story in panels ("Meet…", "What happens", "Watch out", "Remember"). Pure. */
export function posterOf(m) {
  const secs = m.sections.filter((s) => s.facts.length);
  const panels = [];
  const intro = secs[0]?.facts[0]; if (intro) panels.push({ cap: "The story begins", text: words(intro, 30) });
  for (const s of secs.slice(intro ? 0 : 0, 6)) { const f = s.facts.find((x) => x !== intro && x.length > 15); if (f) panels.push({ cap: s.h === "Overview" ? "Then" : s.h, text: words(f, 28) }); if (panels.length >= 6) break; }
  const terms = m.terms.slice(0, 8);
  return { title: m.title, from: m.from, panels: panels.slice(0, 6), terms, moral: m.cards[0] ? `${m.cards[0][0]} ${m.cards[0][1]}` : "" };
}
// the key words of a panel, hidden in cloze mode: the terms that appear in it
const hideTerms = (text, terms) => { let t = esc(text); for (const [w] of [...terms].sort((a, b) => b[0].length - a[0].length)) { if (w.length < 3) continue; t = t.replace(new RegExp(`\\b(${esc(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`, "gi"), '<button type="button" class="ps-gap" data-w="$1">$1</button>'); } return t; };
const SYMBOLS = ["M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z", "M12 3a9 9 0 1 0 9 9M12 7v5l3 3", "M4 19l5-6 4 4 7-9", "M12 2a7 7 0 0 1 4 12.7V18H8v-3.3A7 7 0 0 1 12 2zM9 21h6", "M3 12h4l3-8 4 16 3-8h4", "M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"];
function posterSvg(p) {
  const W = 1200, cols = 3, pw = 360, ph = 300, gap = 30, x0 = 30, y0 = 220, rows = Math.ceil(p.panels.length / cols), H = y0 + rows * (ph + gap) + 260;
  const e = (s) => esc(s).replace(/'/g, "&#39;");
  const wrap = (s, n) => { const out = []; let l = ""; for (const w of String(s).split(" ")) { if ((l + " " + w).trim().length > n) { out.push(l.trim()); l = w; } else l += " " + w; } out.push(l.trim()); return out; };
  const panel = (pn, i) => { const x = x0 + (i % cols) * (pw + gap), y = y0 + Math.floor(i / cols) * (ph + gap), [a, b] = GRADS[i % GRADS.length];
    return `<g transform="translate(${x} ${y})"><rect width="${pw}" height="${ph}" rx="26" fill="url(#pg${i % GRADS.length})" opacity=".18"/><rect width="${pw}" height="${ph}" rx="26" fill="none" stroke="${a}" stroke-opacity=".5" stroke-width="2"/>
      <circle cx="46" cy="50" r="26" fill="${a}"/><text x="46" y="58" text-anchor="middle" font-size="22" font-weight="800" fill="#fff">${i + 1}</text>
      <g transform="translate(${pw - 76} 22) scale(2)" fill="none" stroke="${b}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${SYMBOLS[i % SYMBOLS.length]}"/></g>
      <text x="86" y="58" font-size="19" font-weight="700" fill="${b}">${e(pn.cap.slice(0, 26))}</text>
      ${wrap(pn.text, 33).slice(0, 8).map((l, k) => `<text x="26" y="${110 + k * 24}" font-size="17" fill="#f4f4f8">${e(l)}</text>`).join("")}</g>`; };
  const ty = y0 + rows * (ph + gap) + 10;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Geist, system-ui, sans-serif"><defs>${GRADS.map(([a, b], i) => `<linearGradient id="pg${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`).join("")}<linearGradient id="pgt" x1="0" x2="1"><stop offset="0" stop-color="#4641ff"/><stop offset=".35" stop-color="#f055dd"/><stop offset=".7" stop-color="#ff5600"/><stop offset="1" stop-color="#ffc002"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="#0c0b12"/><circle cx="${W - 120}" cy="80" r="260" fill="#4641ff" opacity=".18"/><circle cx="80" cy="${H - 60}" r="240" fill="#f055dd" opacity=".14"/>
    <text x="30" y="70" font-size="18" font-weight="600" fill="#aaa" letter-spacing="2">${e((p.from || "GRADIFY STORY POSTER").toUpperCase().slice(0, 60))}</text>
    ${wrap(p.title, 38).slice(0, 2).map((l, k) => `<text x="30" y="${130 + k * 52}" font-size="48" font-weight="800" fill="url(#pgt)">${e(l)}</text>`).join("")}
    ${p.panels.map(panel).join("")}
    <text x="30" y="${ty + 30}" font-size="20" font-weight="800" fill="#fff">Key words</text>
    ${p.terms.map(([t, d], i) => `<text x="${30 + (i % 2) * 580}" y="${ty + 66 + Math.floor(i / 2) * 44}" font-size="16" fill="#ddd"><tspan font-weight="700" fill="#ffc002">${e(t.slice(0, 30))}</tspan> ${e(words(d, 9))}</text>`).join("")}
    <text x="${W - 30}" y="${H - 24}" text-anchor="end" font-size="14" fill="#777">getgradify.com</text></svg>`;
}
async function poster(view, ctx) {
  view.innerHTML = `<div class="tl">${head("Learn", "Story posters", "Your topic told as a picture story, panel by panel, with its key words. Switch on <b>Hide the key words</b> to test yourself: tap a gap to reveal it. Download it as a picture to print or set as a wallpaper.")}<div class="tl-pickbox"></div><div class="tl-out"></div></div>`;
  await mountPicker(view.querySelector(".tl-pickbox"), { label: "Make the poster", onPick: async (m) => {
    if (!(await useTool("poster", m.title, ctx))) return;
    const p = posterOf(m), out = view.querySelector(".tl-out");
    out.innerHTML = `<div class="tl-bar"><label class="tl-sel"><input type="checkbox" data-cloze> Hide the key words</label><button type="button" class="btn btn-light lg btn-sm" data-png><span>Download picture</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-svg><span>Download SVG</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-print><span>Print</span></button></div>
      <article class="ps panel glass"><span class="tl-k">${esc(p.from || "")}</span><h2 class="ps-title">${esc(p.title)}</h2><div class="ps-grid">${p.panels.map((pn, i) => `<section class="ps-panel" style="--a:${GRADS[i % GRADS.length][0]};--b:${GRADS[i % GRADS.length][1]}"><span class="ps-n">${i + 1}</span><svg viewBox="0 0 24 24" class="ps-sym" aria-hidden="true"><path d="${SYMBOLS[i % SYMBOLS.length]}"/></svg><h3>${esc(pn.cap)}</h3><p data-text="${esc(pn.text)}">${esc(pn.text)}</p></section>`).join("")}</div>
      ${p.terms.length ? `<div class="ps-terms"><h3>Key words</h3><dl>${p.terms.map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(words(d, 14))}</dd></div>`).join("")}</dl></div>` : ""}</article>`;
    out.querySelector("[data-cloze]").addEventListener("change", (e) => {
      out.querySelectorAll(".ps-panel p").forEach((el) => { el.innerHTML = e.target.checked ? hideTerms(el.dataset.text, p.terms) : esc(el.dataset.text); });
      out.querySelector(".ps").classList.toggle("cloze", e.target.checked);
    });
    out.addEventListener("click", (e) => { const g = e.target.closest(".ps-gap"); if (g) g.classList.toggle("shown"); });
    const svg = () => posterSvg(p);
    out.querySelector("[data-svg]").addEventListener("click", () => download(`${slug(p.title)}-poster.svg`, new Blob([svg()], { type: "image/svg+xml" })));
    out.querySelector("[data-png]").addEventListener("click", async () => {
      const s = svg(), img = new Image(), [, w, h] = s.match(/viewBox="0 0 (\d+) (\d+)"/);
      img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(s)}`; await img.decode();
      const c = document.createElement("canvas"); c.width = w * 2; c.height = h * 2; c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      c.toBlob((b) => download(`${slug(p.title)}-poster.png`, b), "image/png");
    });
    out.querySelector("[data-print]").addEventListener("click", () => printHtml(p.title, `<div class="pr-poster">${svg()}</div>`));
  } });
}

// ======================= Dictionary and thesaurus =======================
let dict = null;
/** Every key term on Gradify, from every lesson's notes: [{ term, def, course, slug, page, lesson, title }] */
async function loadDictionary(slugs, onProgress) {
  const cat = await catalogue();
  dict ||= new Map();
  for (const c of cat.filter((x) => slugs.includes(x.slug))) {
    if (dict.has(c.slug)) continue;
    const rows = [];
    for (const u of c.units) {
      const ls = await loadUnit(c.slug, u.id).catch(() => []);
      for (const L of ls) for (const [t, d] of L.terms || []) {
        const l = u.lessons.find((x) => x.title === L.title);
        rows.push({ term: plain(t), def: plain(d), course: c.name, slug: c.slug, href: c.page && l ? `${c.page}#/lesson/${l.id}` : "", lesson: L.title });
      }
      onProgress?.(c.name, u.title);
    }
    dict.set(c.slug, rows);
  }
  return slugs.flatMap((s) => dict.get(s) || []);
}
/** Dictionary entries matching a query: exact term first, then terms starting with it, then definitions containing it. Pure. */
export function lookup(rows, q, limit = 60) {
  const f = (s) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
  const k = f(q.trim()); if (!k) return [];
  const score = (r) => { const t = f(r.term); return t === k ? 0 : t.startsWith(k) ? 1 : t.includes(k) ? 2 : f(r.def).includes(k) ? 3 : 9; };
  return rows.map((r) => [score(r), r]).filter(([s]) => s < 9).sort((a, b) => a[0] - b[0] || a[1].term.length - b[1].term.length).slice(0, limit).map(([, r]) => r);
}
async function dictionary(view) {
  const cat = await catalogue();
  view.innerHTML = `<div class="tl">${head("Learn", "Dictionaries and thesaurus", "Every key term defined in Gradify's lessons, as a dictionary for each subject, with a link to the lesson it comes from. The thesaurus finds other words for the word you're writing, from the free Datamuse word database.")}
    <div class="seg-chips" role="tablist"><button type="button" class="chip" data-tab="dict" aria-pressed="true">Dictionary</button><button type="button" class="chip" data-tab="thes" aria-pressed="false">Thesaurus</button></div>
    <section data-p="dict" class="panel glass tp"><div class="tl-search"><input type="search" placeholder="Look up a term: osmosis, consideration, mitosis…" aria-label="Look up a term"><select aria-label="Subject"><option value="">Every subject</option>${cat.map((c) => `<option value="${esc(c.slug)}">${esc(c.name)}</option>`).join("")}</select></div>
      <p class="sub dc-msg" aria-live="polite"></p><dl class="dc-list"></dl><div class="dc-az"></div></section>
    <section data-p="thes" class="panel glass tp" hidden><div class="tl-search"><input type="search" placeholder="A word you're writing: important, show, increase…" aria-label="Word" data-tw><button type="button" class="btn btn-primary lg btn-sm" data-tgo><span>Find words</span></button></div><div class="th-out" aria-live="polite"></div></section></div>`;
  view.querySelector(".seg-chips").addEventListener("click", (e) => { const b = e.target.closest("[data-tab]"); if (!b) return; view.querySelectorAll("[data-tab]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); view.querySelectorAll("[data-p]").forEach((p) => { p.hidden = p.dataset.p !== b.dataset.tab; }); });
  const input = view.querySelector('[data-p="dict"] input'), sel = view.querySelector('[data-p="dict"] select'), msg = view.querySelector(".dc-msg"), list = view.querySelector(".dc-list"), az = view.querySelector(".dc-az");
  let rows = [], timer = 0;
  const entry = (r) => `<div class="dc-e"><dt>${esc(r.term)}</dt><dd>${esc(r.def)}<small>${esc(r.course)} · ${r.href ? `<a href="${esc(r.href)}">${esc(r.lesson)}</a>` : esc(r.lesson)}</small></dd></div>`;
  const show = () => {
    const q = input.value.trim();
    if (!q) {
      // a subject chosen and nothing typed: browse it A to Z
      if (sel.value && rows.length) { const letters = [...new Set(rows.map((r) => r.term[0]?.toUpperCase()).filter((x) => /[A-Z]/.test(x)))].sort(); az.innerHTML = letters.map((l) => `<button type="button" class="tl-mini" data-l="${l}">${l}</button>`).join(""); list.innerHTML = ""; msg.textContent = `${rows.length.toLocaleString("en-GB")} terms in ${sel.selectedOptions[0].textContent}. Pick a letter or type a term.`; }
      else { list.innerHTML = ""; az.innerHTML = ""; }
      return;
    }
    az.innerHTML = "";
    const hits = lookup(rows, q);
    list.innerHTML = hits.length ? hits.map(entry).join("") : "";
    msg.textContent = hits.length ? `${hits.length === 60 ? "The first 60" : hits.length} ${hits.length === 1 ? "entry" : "entries"}` : `No term matches "${q}" yet.`;
  };
  az.addEventListener("click", (e) => { const b = e.target.closest("[data-l]"); if (!b) return; const hits = rows.filter((r) => r.term[0]?.toUpperCase() === b.dataset.l).sort((a, c) => a.term.localeCompare(c.term)); list.innerHTML = hits.map(entry).join(""); });
  const load = async () => {
    const slugs = sel.value ? [sel.value] : cat.map((c) => c.slug);
    msg.textContent = "Gathering the terms…";
    rows = await loadDictionary(slugs, (c) => { msg.textContent = `Gathering the terms… ${c}`; });
    // the same term in the same subject, said twice, is one entry
    const seen = new Set(); rows = rows.filter((r) => { const k = `${r.slug}|${r.term.toLowerCase()}`; if (seen.has(k)) return false; seen.add(k); return true; });
    msg.textContent = `${rows.length.toLocaleString("en-GB")} terms.`; show();
  };
  input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(show, 150); });
  sel.addEventListener("change", load);
  sel.value = (() => { try { return localStorage.getItem("gradify.dict.course") || ""; } catch { return ""; } })() || cat[1]?.slug || "";
  sel.addEventListener("change", () => { try { localStorage.setItem("gradify.dict.course", sel.value); } catch { /* fine */ } });
  load();
  // the thesaurus
  const tw = view.querySelector("[data-tw]"), tout = view.querySelector(".th-out");
  const thes = async () => {
    const w = tw.value.trim().toLowerCase(); if (!w) return;
    tout.innerHTML = `<p class="sub">Looking…</p>`;
    try {
      const get = (q) => fetch(`https://api.datamuse.com/words?${q}&max=24`).then((r) => r.json());
      const [syn, like, opp] = await Promise.all([get(`rel_syn=${encodeURIComponent(w)}`), get(`ml=${encodeURIComponent(w)}`), get(`rel_ant=${encodeURIComponent(w)}`)]);
      const chips = (a) => a.map((x) => `<button type="button" class="tl-mini" data-w="${esc(x.word)}">${esc(x.word)}</button>`).join(" ");
      const likeOnly = like.filter((x) => !syn.some((s) => s.word === x.word)).slice(0, 18);
      tout.innerHTML = syn.length || likeOnly.length ? `${syn.length ? `<h3>Synonyms</h3><p>${chips(syn)}</p>` : ""}${likeOnly.length ? `<h3>Words with a similar meaning</h3><p>${chips(likeOnly)}</p>` : ""}${opp.length ? `<h3>Opposites</h3><p>${chips(opp)}</p>` : ""}<p class="sub">Tap a word to look it up. Words from <a href="https://www.datamuse.com/api/" rel="noopener">Datamuse</a>.</p>` : `<p class="sub">No other words found for "${esc(w)}". Check the spelling.</p>`;
    } catch { tout.innerHTML = `<p class="sub">The thesaurus needs an internet connection. Try again when you're online.</p>`; }
  };
  view.querySelector("[data-tgo]").addEventListener("click", thes);
  tw.addEventListener("keydown", (e) => { if (e.key === "Enter") thes(); });
  tout.addEventListener("click", (e) => { const b = e.target.closest("[data-w]"); if (b) { tw.value = b.dataset.w; thes(); } });
}

// ======================= Key-terms sheets and downloads =======================
function printHtml(title, body) {
  const w = window.open("", "_blank");
  if (!w) { alert("Allow pop-ups for Gradify to print."); return; }
  w.document.write(`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title><style>
    body{font:14px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;color:#111;margin:28px;} h1{font-size:24px;margin:0 0 2px} .from{color:#666;margin:0 0 16px;font-size:12px;text-transform:uppercase;letter-spacing:.06em}
    table{width:100%;border-collapse:collapse} th,td{border:1px solid #ccc;padding:7px 9px;text-align:left;vertical-align:top} th{background:#f3f3f7} td:first-child{font-weight:700;width:30%}
    .blank td:last-child{height:38px} h2{font-size:16px;margin:18px 0 6px} ol li{margin:4px 0} .pr-poster svg{width:100%;height:auto} footer{margin-top:18px;color:#888;font-size:11px}
    @media print{body{margin:12mm}}</style></head><body>${body}<footer>getgradify.com</footer><script>setTimeout(()=>print(),300)<\/script></body></html>`);
  w.document.close();
}
/** A key-terms sheet as printable HTML: every term and definition, or with the definitions left blank to fill in. Pure. */
export function sheetHtml(m, { blank = false } = {}) {
  const terms = m.terms.length ? m.terms : m.cards.slice(0, 30);
  return `<h1>${esc(m.title)}: key terms</h1><p class="from">${esc(m.from || "")}</p><table class="${blank ? "blank" : ""}"><thead><tr><th>Term</th><th>${blank ? "Write the definition" : "Definition"}</th></tr></thead><tbody>${terms.map(([t, d]) => `<tr><td>${esc(t)}</td><td>${blank ? "" : esc(d)}</td></tr>`).join("")}</tbody></table>`;
}
function notesHtml(m) { return `<h1>${esc(m.title)}</h1><p class="from">${esc(m.from || "")}</p>${m.sections.map((s) => `<h2>${esc(s.h)}</h2><ul>${s.facts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>`).join("")}${m.terms.length ? sheetHtml(m).replace(/<h1>.*?<\/p>/, "<h2>Key terms</h2>") : ""}`; }
function quizHtml(m) { const qs = [...m.mcq.map((x) => ({ q: x.q, a: x.right, opts: shuffle([x.right, ...x.wrong]) })), ...m.cards.map(([q, a]) => ({ q, a }))].slice(0, 25); return `<h1>${esc(m.title)}: practice questions</h1><p class="from">${esc(m.from || "")}</p><ol>${qs.map((x) => `<li>${esc(x.q)}${x.opts ? `<br>${x.opts.map((o, i) => `${"ABCD"[i]}. ${esc(o)}`).join(" &nbsp; ")}` : "<br><br>"}</li>`).join("")}</ol><h2>Answers</h2><ol>${qs.map((x) => `<li>${esc(x.a)}</li>`).join("")}</ol>`; }
const csv = (rows) => rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
async function sheets(view, ctx) {
  const which = location.hash.includes("downloads") ? "downloads" : "sheets";
  view.innerHTML = `<div class="tl">${head("Learn", which === "sheets" ? "Key-terms sheets" : "Downloadable resources", which === "sheets" ? "A key-terms sheet for any lesson, unit, deck or notes, ready to print: with the definitions, or with them left blank to test yourself." : "Everything for a lesson or unit, to download and print: the notes, a key-terms sheet, a blank sheet to fill in, practice questions with answers, a story poster and the flashcards for Anki or a spreadsheet.")}<div class="tl-pickbox"></div><div class="tl-out"></div></div>`;
  await mountPicker(view.querySelector(".tl-pickbox"), { label: "Get the resources", onPick: async (m) => {
    if (!(await useTool("sheets", m.title, ctx))) return;
    const out = view.querySelector(".tl-out"), n = m.terms.length || Math.min(30, m.cards.length);
    out.innerHTML = `<div class="dl-grid">
      ${[["sheet", "Key-terms sheet", `${n} terms with definitions`, "Print"], ["blank", "Blank key-terms sheet", "Definitions left blank, to test yourself", "Print"], ...(which === "downloads" ? [["notes", "Revision notes", `${m.sections.length} sections, tidy and printable`, "Print"], ["quiz", "Practice questions", `${Math.min(25, m.mcq.length + m.cards.length)} questions, answers at the back`, "Print"], ["poster", "Story poster", "The topic as a picture story", "Download"], ["anki", "Flashcards for Anki", `${m.cards.length + m.terms.length} cards, tab-separated`, "Download"], ["csv", "Key terms as a spreadsheet", "CSV for Excel, Numbers or Sheets", "Download"]] : [])]
        .map(([k, t, d, a]) => `<article class="panel glass dl-item"><b>${t}</b><span class="sub">${d}</span><button type="button" class="btn btn-light lg btn-sm" data-dl="${k}"><span>${a}</span></button></article>`).join("")}</div>
      ${which === "sheets" ? `<div class="panel glass ks-preview">${sheetHtml(m)}</div>` : ""}`;
    out.addEventListener("click", (e) => {
      const k = e.target.closest("[data-dl]")?.dataset.dl; if (!k) return;
      if (k === "sheet") printHtml(`${m.title}: key terms`, sheetHtml(m));
      if (k === "blank") printHtml(`${m.title}: key terms`, sheetHtml(m, { blank: true }));
      if (k === "notes") printHtml(m.title, notesHtml(m));
      if (k === "quiz") printHtml(`${m.title}: questions`, quizHtml(m));
      if (k === "poster") download(`${slug(m.title)}-poster.svg`, new Blob([posterSvg(posterOf(m))], { type: "image/svg+xml" }));
      if (k === "anki") download(`${slug(m.title)}-anki.txt`, new Blob([[...m.cards, ...m.terms].map(([q, a]) => `${q.replace(/\t/g, " ")}\t${a.replace(/\t/g, " ")}`).join("\n")], { type: "text/plain" }));
      if (k === "csv") download(`${slug(m.title)}-key-terms.csv`, new Blob([csv([["Term", "Definition"], ...(m.terms.length ? m.terms : m.cards)])], { type: "text/csv" }));
    });
  } });
}

export const LEARN_TOOLS = { explain, podcast, audio, poster, dictionary, sheets, downloads: sheets };
export { posterSvg, loadIndex };
