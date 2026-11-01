// Memory lab, three modes:
//   serial  free recall of a 15-word list, scored by position, with an optional 30-second distractor task. Early words
//           are recalled better (primacy) and the last few too (recency); a delay removes recency (Murdock, 1962;
//           Glanzer and Cunitz, 1966), evidence used for separate short- and long-term stores.
//   span    digit span: sequences one digit longer each time, until two misses at a length (Jacobs, 1887; Miller, 1956).
//   models  an explorer of the multi-store model (Atkinson and Shiffrin, 1968) and the working memory model
//           (Baddeley and Hitch, 1974; episodic buffer, Baddeley, 2000).
import { shell, canvas, panel, seg, challenges, clear, axes, line, circle, text, C, esc } from "../lab.js";
import { caveat, local } from "../social/ui.js";

export const WORDS = "apple river candle tiger jacket bottle garden hammer pillow rocket window carpet basket mirror ladder violin pencil engine island button feather lemon helmet castle wallet blanket saddle trumpet anchor kettle onion rabbit tunnel parrot cushion barrel cactus magnet pocket dragon".split(" ");
// score a free-recall attempt: which list positions were recalled (order doesn't matter; spelling must match)
export function scoreRecall(list, typed) {
  const said = new Set(String(typed).toLowerCase().split(/[^a-z]+/).filter(Boolean));
  return list.map((w) => said.has(w));
}
export function curve(runs) { const n = 15; return Array.from({ length: n }, (_, i) => { const r = runs.filter((x) => x.hits.length === n); return r.length ? r.filter((x) => x.hits[i]).length / r.length : NaN; }); }

const MODELS = {
  msm: { name: "Multi-store model", by: "Atkinson and Shiffrin (1968)", parts: [
    ["Sensory register", "Holds raw sensory input very briefly: about a quarter to half a second for vision (iconic memory, Sperling, 1960) and a few seconds for sound (echoic memory). Only attended information moves on."],
    ["Short-term memory", "A limited store held by rehearsal: a span of roughly 7 ± 2 items (Miller, 1956; Cowan, 2001, argued about 4 chunks); without rehearsal information fades within about 18–30 seconds (Peterson and Peterson, 1959). Coding is mainly acoustic (Baddeley, 1966)."],
    ["Long-term memory", "A store of very large capacity and potentially lifelong duration, coded mainly by meaning. Information enters through rehearsal and is brought back by retrieval."],
    ["Evidence and limits", "Supported by serial position effects and by patients such as HM, whose short-term memory worked while new long-term memories did not form (Scoville and Milner, 1957). Criticised for treating short- and long-term memory as single stores: KF had impaired verbal STM but intact visual STM (Shallice and Warrington, 1970), and rehearsal type matters more than amount (Craik and Lockhart, 1972)."]] },
  wmm: { name: "Working memory model", by: "Baddeley and Hitch (1974); Baddeley (2000)", parts: [
    ["Central executive", "Directs attention and coordinates the slave systems; it has very limited capacity and stores nothing itself."],
    ["Phonological loop", "Holds speech-based information: a phonological store (the inner ear) and an articulatory control process (the inner voice) that rehearses it. Explains the word-length effect: lists of short words are recalled better than lists of long ones (Baddeley, Thomson and Buchanan, 1975)."],
    ["Visuospatial sketchpad", "Holds visual and spatial information, split by Logie (1995) into a visual cache and an inner scribe."],
    ["Episodic buffer", "Added in 2000: a limited store that binds information from the other components and long-term memory into single episodes."],
    ["Evidence and limits", "Dual-task studies show two tasks interfere when they use the same component but not different ones. The central executive is the least well specified part, and the model describes short-term processing rather than long-term storage."]] },
};

export function mount(el, ctx = {}) {
  const mode = ctx.mode || "serial";
  if (mode === "models") return models(el, ctx);
  if (mode === "span") return span(el, ctx);
  return serial(el, ctx);
}

function serial(el, ctx) {
  const $ = shell(el, `<div class="sx-panel"><div class="lab-row sx-mode"></div><div class="sx-stage"><div><p class="sx-big" aria-live="polite">Ready</p><p class="sx-inst">You'll see 15 words, one per second. Then type every word you remember, in any order.</p></div></div><div class="sx-keys"></div><div class="lab-stage2"></div><div class="sx-res"></div></div><div class="lab-ctrl"></div>`);
  const big = $(".sx-big"), inst = $(".sx-inst"), keys = $(".sx-keys"), res = panel($(".sx-res")), cv = canvas($(".lab-stage2"), { aspect: 0.45, max: 260 }), ctrl = $(".lab-ctrl");
  const runs = local.get("serial-runs", []);
  const ch = challenges(ctrl, ctx, [
    { id: "one", text: "Complete one immediate recall run", test: () => runs.some((r) => !r.delay) },
    { id: "three", text: "Complete three immediate runs to see your serial position curve", test: () => runs.filter((r) => !r.delay).length >= 3 },
    { id: "delay", text: "Complete a run with the 30-second distractor task and compare the last few positions", test: () => runs.some((r) => r.delay) },
  ]);
  caveat(ctrl, "Your answers are scored on this device only. With a few runs the curve is noisy; class data pooled over many people shows the shape far more clearly.");
  let delay = false, timers = [];
  seg($(".lab-row.sx-mode"), [["0", "Recall straight away"], ["1", "30-second delay first"]], "0", (v) => { delay = v === "1"; });
  const later = (ms, fn) => timers.push(setTimeout(fn, ms));
  function start() {
    const pool = [...WORDS]; for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    const list = pool.slice(0, 15); keys.innerHTML = ""; res(""); inst.textContent = "";
    list.forEach((w, i) => later(i * 1000, () => { big.textContent = w; }));
    later(15000, () => {
      if (!delay) return recall(list);
      let n = 30, x = 300 + Math.floor(Math.random() * 600); big.textContent = `Count back in 3s from ${x}`; inst.textContent = "Say the numbers aloud or in your head: this stops you rehearsing the words.";
      const tick = () => { n--; x -= 3; big.textContent = `${x}…`; if (n > 0) later(1000, tick); else recall(list); }; later(1000, tick);
    });
  }
  function recall(list) {
    big.textContent = "Recall"; inst.textContent = "";
    keys.innerHTML = `<label class="sr-only" for="sp-recall">Words you remember</label><textarea id="sp-recall" style="width:100%;min-height:90px" placeholder="Type the words you remember, separated by spaces"></textarea><button type="button" class="lab-btn pri" data-done>Score my recall</button>`;
    keys.querySelector("textarea").focus();
    keys.querySelector("[data-done]").addEventListener("click", () => {
      const hits = scoreRecall(list, keys.querySelector("textarea").value); runs.push({ at: Date.now(), delay, hits }); local.set("serial-runs", runs.slice(-40)); ch.check({});
      res(`<p><b>${hits.filter(Boolean).length} of 15 recalled.</b> ${list.map((w, i) => `<span style="color:${hits[i] ? "#40d4b1" : "#9aa0a6"}">${i + 1}. ${esc(w)}</span>`).join(" · ")}</p>`);
      keys.innerHTML = `<button type="button" class="lab-btn pri" data-start>Another list</button>`; big.textContent = "Ready"; plot();
    });
  }
  function plot() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const A = axes(g, { l: 46, t: 12, w: W - 62, h: H - 46 }, { x0: 1, x1: 15, y0: 0, y1: 1, xl: "position in list", yl: "proportion recalled", xt: 7, yt: 4, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(1) });
    for (const [d, col, lab] of [[false, C.violet, "immediate"], [true, C.amber, "after delay"]]) {
      const c = curve(runs.filter((r) => r.delay === d)); const pts = c.map((v, i) => [A.X(i + 1), A.Y(v)]).filter((p) => Number.isFinite(p[1]));
      line(g, pts, col, 2); pts.forEach(([x, y]) => circle(g, x, y, 3, col));
      text(g, `● ${lab} (${runs.filter((r) => r.delay === d).length} runs)`, d ? W - 140 : W - 290, 22, { color: col, size: 11 });
    }
  }
  keys.addEventListener("click", (e) => { if (e.target.closest("[data-start]")) start(); });
  keys.innerHTML = `<button type="button" class="lab-btn pri" data-start>Start</button>`; plot();
  return () => { timers.forEach(clearTimeout); cv.stop(); };
}

function span(el, ctx) {
  const $ = shell(el, `<div class="sx-panel"><div class="sx-stage"><div><p class="sx-big" aria-live="polite">Ready</p><p class="sx-inst">Digits appear one per second. Then type them back in order. Each sequence is one digit longer, until you miss two at the same length.</p></div></div><div class="sx-keys"></div><div class="sx-res"></div></div><div class="lab-ctrl"></div>`);
  const big = $(".sx-big"), keys = $(".sx-keys"), res = panel($(".sx-res")), ctrl = $(".lab-ctrl");
  const best = local.get("digit-span", []);
  const ch = challenges(ctrl, ctx, [{ id: "span", text: "Measure your digit span", test: () => best.length > 0 }, { id: "chunk", text: "Read about chunking, then try again and see if your span changes", test: () => best.length > 1 }]);
  caveat(ctrl, "Most adults recall about 5 to 9 digits forwards (Miller, 1956), though this partly reflects grouping digits into chunks; with chunking controlled, Cowan (2001) argued the true limit is about 4 items.");
  let len = 3, misses = 0, longest = 0, timers = [];
  function trial() {
    const seq = Array.from({ length: len }, () => Math.floor(Math.random() * 10)); keys.innerHTML = ""; res("");
    seq.forEach((d, i) => { timers.push(setTimeout(() => { big.textContent = d; }, i * 1000)); timers.push(setTimeout(() => { big.textContent = "·"; }, i * 1000 + 750)); });
    timers.push(setTimeout(() => {
      big.textContent = `Type the ${len} digits`;
      keys.innerHTML = `<label class="sr-only" for="ds-in">Digits</label><input id="ds-in" type="text" inputmode="numeric" autocomplete="off" style="font-size:22px;letter-spacing:.2em"><button type="button" class="lab-btn pri" data-check>Check</button>`;
      const inp = keys.querySelector("input"); inp.focus();
      const go = () => {
        const ok = inp.value.replace(/\D/g, "") === seq.join("");
        if (ok) { longest = len; len++; misses = 0; res(`<p class="sx-fb ok"><b>Correct.</b> Next: ${len} digits.</p>`); }
        else { misses++; res(`<p class="sx-fb no"><b>It was ${seq.join(" ")}.</b> ${misses < 2 ? "One more try at this length." : ""}</p>`); }
        if (misses >= 2) { best.push(longest); local.set("digit-span", best.slice(-20)); ch.check({}); big.textContent = `Your span: ${longest}`; keys.innerHTML = `<button type="button" class="lab-btn pri" data-start>Try again</button>`; res(`<p><b>Digit span: ${longest}</b>. Previous: ${best.slice(0, -1).join(", ") || "none"}.</p><p class="sx-fb">Chunking: grouping digits (e.g. 1 9 6 6 as the year 1966) lets more fit within the same limit. Try saying the digits in pairs or triples.</p>`); return; }
        keys.innerHTML = `<button type="button" class="lab-btn pri" data-next>Next sequence</button>`; keys.querySelector("button").focus();
      };
      keys.querySelector("[data-check]").addEventListener("click", go); inp.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
    }, len * 1000 + 200));
  }
  keys.addEventListener("click", (e) => { if (e.target.closest("[data-start]")) { len = 3; misses = 0; longest = 0; trial(); } else if (e.target.closest("[data-next]")) trial(); });
  keys.innerHTML = `<button type="button" class="lab-btn pri" data-start>Start</button>`;
  return () => timers.forEach(clearTimeout);
}

function models(el, ctx) {
  const $ = shell(el, `<div class="sx-panel"><div class="lab-row sx-mode"></div><div class="sx-btns sx-list" role="group" aria-label="Components"></div><div class="sx-card" aria-live="polite"></div></div><div class="lab-ctrl"></div>`);
  const ctrl = $(".lab-ctrl"), card = $(".sx-card"), btns = $(".sx-btns");
  const seen = new Set();
  const ch = challenges(ctrl, ctx, [{ id: "msm", text: "Explore every part of the multi-store model", test: () => MODELS.msm.parts.every((p) => seen.has(`msm:${p[0]}`)) }, { id: "wmm", text: "Explore every part of the working memory model", test: () => MODELS.wmm.parts.every((p) => seen.has(`wmm:${p[0]}`)) }]);
  let m = "msm";
  const paint = (k = 0) => { const M = MODELS[m]; btns.innerHTML = M.parts.map(([n], j) => `<button type="button" data-k="${j}" aria-pressed="${j === k}">${n}</button>`).join(""); const [n, d] = M.parts[k]; seen.add(`${m}:${n}`); ch.check({}); card.innerHTML = `<h5>${M.name}: ${n}</h5><p>${d}</p><p><small>${M.by}</small></p>`; };
  seg($(".lab-row.sx-mode"), [["msm", "Multi-store model"], ["wmm", "Working memory model"]], m, (v) => { m = v; paint(); });
  btns.addEventListener("click", (e) => { const b = e.target.closest("button[data-k]"); if (b) paint(Number(b.dataset.k)); });
  paint();
}
