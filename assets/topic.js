// The interactive parts of a topic page (getgradify.com/topics/<course>/<unit>/, written by scripts/seo/programmatic.mjs).
// The page works without this; it adds: the quick quiz (difficulty filter, why-wrong notes, "knew it or guessed",
// retake, challenge a friend), a 60-second recall drill, Listen (the browser's own speech), copy as Markdown / slide
// bullets / a study prompt, a full Anki/Quizlet CSV export, embed code, links to single cards, the mind map as a PNG,
// and the confidence check-in with a review reminder. Nothing leaves the browser.
import { rate, markReviewed, topics, studied } from "./memory.js";
import { esc } from "../kit/core/text.js";
let copy, act;   // from ./seo.js, loaded in mount() so the pure helpers import cleanly in tests

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const text = (h) => { const d = document.createElement("div"); d.innerHTML = h; return d.textContent.trim(); };
const LEVELS = { 1: "Foundation recall", 2: "Exam style", 3: "Stretch" };

// ---------- pure helpers (tests/seo-tools.test.mjs) ----------
/** a stable shuffle of a question's options, so the right answer isn't always first */
export function options(m, seed = 0) {
  const all = [m.right, ...m.wrong]; let h = seed + m.q.length;
  return all.map((o, i) => ({ o, k: ((h = (h * 9301 + 49297 + i) % 233280) / 233280) })).sort((a, b) => a.k - b.k).map((x) => x.o);
}
/** the quiz result line: score, and how many right answers were lucky guesses */
export function quizSummary(answers) {
  const right = answers.filter((a) => a.ok).length, lucky = answers.filter((a) => a.ok && a.guessed).length;
  return { right, of: answers.length, lucky, solid: right - lucky };
}
/** CSV of [front, back] rows that Anki and Quizlet both import */
export function cardsCsv(cards, credit = "") {
  const q = (s) => `"${String(s).replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
  return [...cards.map(([f, b]) => `${q(f)},${q(b)}`), ...(credit ? [`${q(credit)},${q("")}`] : [])].join("\n") + "\n";
}
/** how long a passage takes to say aloud at a clear speaking pace (130 words a minute) */
export const speakMinutes = (s, wpm = 130) => Math.max(0.1, Math.round((String(s).split(/\s+/).filter(Boolean).length / wpm) * 10) / 10);

export async function mount() {
  ({ copy, act } = await import("./seo.js"));
  const D = JSON.parse($("#topic-data")?.textContent || "{}"), msg = $(".topic-msg"), page = location.origin + location.pathname;
  const say = (t) => { if (msg) msg.textContent = t; };
  const cardsText = () => D.cards.map((c) => [text(c.q), text(c.a)]);

  // ---------- copy and export ----------
  const md = () => `# ${D.title} (${D.course})\n\n## Key terms\n${D.terms.map(([t, d]) => `- **${t}**: ${d}`).join("\n")}\n\n## Key takeaways\n${D.keys.map((k) => `- ${k}`).join("\n")}\n\n## Common mistakes\n${D.pits.map((k) => `- ${k}`).join("\n")}\n\n## Flashcards\n${cardsText().map(([q, a]) => `- **Q:** ${q}\n  **A:** ${a}`).join("\n")}\n\nSource: ${page} (Gradify, free revision)\n`;
  const slides = () => { const lines = [D.title, ...D.keys.map((k) => `• ${k.split(/[.;:] /)[0].slice(0, 90)}`), ...D.terms.slice(0, 6).map(([t, d]) => `• ${t}: ${d.split(/[.;] /)[0].slice(0, 70)}`)]; return lines.join("\n"); };
  const prompt = () => `Quiz me on ${D.title} (${D.course}) using only my notes below. Ask one question at a time, starting with the common exam traps and exceptions${D.pits.length ? ` (for example: ${D.pits[0].slice(0, 120)})` : ""}, then definitions, then a compare-and-explain question. After each answer, tell me what I missed.\n\n[paste your notes here]`;
  $(".topic-bar")?.addEventListener("click", async (e) => {
    const t = e.target.closest("[data-t]")?.dataset.t; if (!t) return;
    if (t === "md") { act("export"); copy(md(), msg, "Copied as Markdown: paste it into Notion, Obsidian or a doc."); }
    if (t === "slides") { act("export"); const s = slides(); copy(`${s}\n(from ${page})`, msg, `Copied ${s.split("\n").length} slide bullets. Read aloud, they take about ${speakMinutes(s)} minutes at 130 words a minute.`); }
    if (t === "prompt") copy(prompt(), msg, "Study prompt copied: paste it into Notes Studio's chat with your own notes, or any assistant.");
    if (t === "embed") { act("share"); copy(`<iframe src="${page}?embed=1#cards" title="${esc(D.title)} flashcards" width="100%" height="620" style="border:0;border-radius:14px;max-width:760px" loading="lazy"></iframe>\n<p style="font:12px sans-serif">${esc(D.title)} flashcards by <a href="${page}">Gradify</a></p>`, msg, "Embed code copied: paste it into your blog, school site or Notion (/embed)."); }
    if (t === "csv") {
      say("Building the full deck…");
      let rows = cardsText();
      try {
        const [{ parseNotes }, notes] = await Promise.all([import("/kit/course/notes.js"), import(D.notes)]);
        rows = parseNotes(notes.default).flatMap((l) => l.cards).map(([q, a]) => [text(q.replace(/\*\*/g, "")), text(a.replace(/\*\*/g, ""))]);
      } catch { /* fall back to the sample cards */ }
      const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([cardsCsv(rows, `Verified with GetGradify: free source-checked flashcards at ${page}`)], { type: "text/csv" }));
      a.download = `${D.title.replace(/[^\w]+/g, "-").toLowerCase()}-flashcards.csv`; a.click(); act("export");
      say(`${rows.length} cards downloaded. Anki: File → Import, comma-separated. Quizlet: Import → paste, between term and definition: comma.`);
    }
  });

  // ---------- links to single cards ----------
  for (const d of $$(".flash[id]")) {
    const b = document.createElement("button"); b.type = "button"; b.className = "mini card-link no-print"; b.textContent = "Copy link to this card";
    b.addEventListener("click", () => copy(`${page}#${d.id}`, null).then(() => { b.textContent = "Link copied"; }));
    d.append(b);
  }
  if (/^#card-\d+$/.test(location.hash)) { const d = $(location.hash); if (d) { d.open = true; d.classList.add("lit"); } }

  // ---------- listen: the browser's own speech engine ----------
  const lb = $("[data-listen]");
  if (lb && "speechSynthesis" in window) lb.addEventListener("click", () => {
    if (speechSynthesis.speaking) { speechSynthesis.cancel(); lb.textContent = "▶ Listen (2 min)"; return; }
    const script = `${D.title}. ${$(".answer")?.textContent || ""} Key takeaways. ${D.keys.join(" ")} Common mistakes. ${D.pits.join(" ")} Key terms. ${D.terms.slice(0, 8).map(([t, d]) => `${t}: ${d}`).join(". ")}.`;
    const u = new SpeechSynthesisUtterance(script); u.lang = "en-GB"; u.rate = 1;
    u.onend = () => { lb.textContent = "▶ Listen (2 min)"; studied(); };
    speechSynthesis.speak(u); lb.textContent = "■ Stop"; act("tool_use");
  });
  else if (lb) lb.hidden = true;

  // ---------- the quick quiz ----------
  const live = $(".quiz-live");
  if (live && D.mcq.length) {
    $(".quiz-static").hidden = true; live.hidden = false;
    const qs = new URLSearchParams(location.search), vs = Number(qs.get("vs")), of = Number(qs.get("of"));
    let level = 0, i = 0, answers = [], list = [];
    const start = () => { list = D.mcq.filter((m) => !level || m.d === level); i = 0; answers = []; show(); };
    const filter = () => `<div class="chips" role="group" aria-label="Difficulty">${[[0, "All"], [1, LEVELS[1]], [2, LEVELS[2]], [3, LEVELS[3]]].filter(([d]) => !d || D.mcq.some((m) => m.d === d)).map(([d, l]) => `<button type="button" class="chip${d === level ? " on" : ""}" data-level="${d}">${l}</button>`).join("")}</div>`;
    const show = () => {
      if (i >= list.length) return finish();
      const m = list[i], opts = options(m, i);
      live.innerHTML = `${filter()}${vs && of ? `<p class="challenge">Your friend scored <b>${vs}/${of}</b> on this quiz. Can you beat them?</p>` : ""}<p class="q-count">Question ${i + 1} of ${list.length} · ${LEVELS[m.d]}</p><p class="q">${m.q}</p><div class="opts">${opts.map((o, k) => `<button type="button" class="opt" data-k="${k}">${o}</button>`).join("")}</div><div class="q-after" hidden></div>`;
      $$(".opt", live).forEach((b) => b.addEventListener("click", () => pick(m, opts, b)));
    };
    const pick = (m, opts, b) => {
      const ok = opts[b.dataset.k] === m.right;
      $$(".opt", live).forEach((x) => { x.disabled = true; if (opts[x.dataset.k] === m.right) x.classList.add("right"); });
      if (!ok) b.classList.add("wrong");
      const after = $(".q-after", live); after.hidden = false;
      after.innerHTML = `<p>${ok ? "<b>Right.</b>" : `<b>Not quite.</b> Why that option trips people up: it sounds close, but the answer is <b>${m.right}</b>.`} ${m.why}</p><p>${ok ? 'Did you <button type="button" class="mini" data-g="0">know it</button> or <button type="button" class="mini" data-g="1">guess</button>?' : '<button type="button" class="mini" data-g="0">Next question</button>'}</p><p class="small"><a href="${D.learn}">Revise “${esc(m.l)}” in the course →</a></p>`;
      $$("[data-g]", after).forEach((g) => g.addEventListener("click", () => { answers.push({ ok, guessed: g.dataset.g === "1", m }); i++; show(); }));
    };
    const finish = () => {
      const s = quizSummary(answers); studied(); act("quiz_finish");
      const weak = answers.filter((a) => !a.ok || a.guessed).map((a) => a.m);
      live.innerHTML = `${filter()}<p class="score"><span class="big">${s.right}/${s.of}</span>${s.lucky ? `${s.lucky} of those were guesses, so treat them as gaps: you really know ${s.solid}.` : "No lucky guesses: that's solid recall."}${vs && of ? ` Your friend scored ${vs}/${of}.` : ""}</p>
        <div class="next-best"><b>Next best step:</b> ${weak.length ? `<button type="button" class="btn btn-primary" data-retry><span>Drill your ${weak.length} weak question${weak.length === 1 ? "" : "s"} again</span></button>` : `<a class="btn btn-primary" href="${$(".unit-nav a:last-child")?.getAttribute("href") || D.learn}"><span>Move on to the next topic</span></a>`} <a href="${D.learn}">practise every card in the course</a> or <a href="/tools/mistake-log/">log what you missed</a>.</div>
        <p><button type="button" class="mini" data-again>Retake the whole quiz</button> <button type="button" class="mini" data-challenge>Challenge a friend</button> <span class="quiz-msg" role="status"></span></p>`;
      $("[data-again]", live).addEventListener("click", start);
      $("[data-retry]", live)?.addEventListener("click", () => { list = weak; i = 0; answers = []; show(); });
      $("[data-challenge]", live).addEventListener("click", () => { act("share"); copy(`I scored ${s.right}/${s.of} on the ${D.title} quiz. Can you beat me? ${page}?vs=${s.right}&of=${s.of}#quiz`, $(".quiz-msg", live), "Challenge copied: paste it into your group chat."); });
      rateSuggest(s.right / Math.max(1, s.of));
    };
    live.addEventListener("click", (e) => { const d = e.target.closest("[data-level]"); if (d && e.target.closest(".chips")) { level = Number(d.dataset.level); start(); } });
    start();
  }

  // ---------- 60-second drill ----------
  const drill = $("[data-drill]");
  drill?.querySelector("[data-drill-start]")?.addEventListener("click", () => {
    const deck = [...D.cards].sort(() => Math.random() - 0.5); let k = 0, got = 0, seen = 0, flipped = false;
    const end = Date.now() + 60e3;
    drill.innerHTML = `<div class="drill-top"><span class="drill-clock">60</span><span class="drill-score">0 cleared</span></div><div class="drill-card" tabindex="0" aria-live="polite"></div><div class="drill-keys"><button type="button" class="mini" data-d="flip">Flip (Space)</button><button type="button" class="mini" data-d="1">Got it (1)</button><button type="button" class="mini" data-d="2">Missed (2)</button></div>`;
    const card = $(".drill-card", drill), render = () => { const c = deck[k % deck.length]; card.innerHTML = flipped ? `<small>Answer</small>${c.a}` : `<small>Question</small>${c.q}`; };
    const act2 = (x) => { if (Date.now() > end) return; if (x === "flip") { flipped = !flipped; render(); return; } if (!flipped) { flipped = true; render(); return; } seen++; if (x === "1") got++; k++; flipped = false; $(".drill-score", drill).textContent = `${got} cleared`; render(); };
    const keys = (e) => { if (e.target.closest("input,textarea")) return; if (e.code === "Space") { e.preventDefault(); act2("flip"); } if (e.key === "1" || e.key === "2") act2(e.key); };
    document.addEventListener("keydown", keys);
    drill.addEventListener("click", (e) => { const x = e.target.closest("[data-d]")?.dataset.d; if (x) act2(x); });
    render(); card.focus();
    const t = setInterval(() => {
      const left = Math.ceil((end - Date.now()) / 1000); $(".drill-clock", drill).textContent = Math.max(0, left);
      if (left > 0) return;
      clearInterval(t); document.removeEventListener("keydown", keys); studied(); act("quiz_finish");
      const pc = seen ? Math.round((got / seen) * 100) : 0, line = `Cleared ${got} verified cards in 60s with ${pc}% accuracy on GetGradify (${D.title}).`;
      drill.innerHTML = `<p class="score"><span class="big">${got} cards</span>${seen} seen, ${pc}% recalled.</p><p><button type="button" class="mini" data-share-drill>Copy my score</button> <button type="button" class="btn btn-primary" data-drill-start><span>Go again</span></button></p>`;
      $("[data-share-drill]", drill).addEventListener("click", (e) => copy(`${line} ${page}#drill`, null).then(() => { e.target.textContent = "Copied"; }));
      drill.querySelector("[data-drill-start]").addEventListener("click", () => location.reload());
    }, 250);
  });

  // ---------- mind map as a PNG ----------
  $("[data-mm-png]")?.addEventListener("click", () => {
    const svg = $(".mindmap svg"), img = new Image(), src = new XMLSerializer().serializeToString(svg);
    img.onload = () => { const c = document.createElement("canvas"); c.width = 1520; c.height = 920; c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); c.toBlob((b) => { const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = `${D.title.replace(/[^\w]+/g, "-").toLowerCase()}-mind-map.png`; a.click(); act("export"); }); };
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(src)}`;
  });

  // ---------- confidence check-in, reviewed, reminder ----------
  const path = location.pathname, cmsg = $(".checkin-msg"), mine = topics()[path];
  const mark = (lvl) => $$("[data-confidence] .chip").forEach((c) => c.classList.toggle("on", c.dataset.level === lvl));
  if (mine?.level) { mark(mine.level); if (mine.level === "low" && cmsg) cmsg.textContent = "You marked this low last time: try the quick quiz before moving on."; }
  function rateSuggest(share) { if (cmsg && !topics()[path]?.level) cmsg.textContent = `Suggested from your quiz: ${share >= 0.8 ? "strong" : share >= 0.5 ? "medium" : "low"}. Tap one above to save it.`; }
  $("[data-confidence]")?.addEventListener("click", (e) => { const l = e.target.closest("[data-level]")?.dataset.level; if (!l) return; rate(path, D.title, l); mark(l); studied(); cmsg.textContent = `Saved. It'll be in your review list ${l === "low" ? "tomorrow" : l === "medium" ? "in 3 days" : "in a week"}.`; });
  const rb = $("[data-reviewed]"), syncR = () => { const on = Boolean(topics()[path]?.reviewed); rb.textContent = on ? "✓ Reviewed" : "Mark topic reviewed"; rb.setAttribute("aria-pressed", String(on)); };
  if (rb) { syncR(); rb.addEventListener("click", () => { markReviewed(path, D.title, !topics()[path]?.reviewed); studied(); syncR(); }); }
  $("[data-remind]")?.addEventListener("click", async () => {
    const { icsEvents } = await import("./tools-plan.js"), d = new Date(Date.now() + 3 * 864e5);
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([icsEvents([{ date: d, title: `Review: ${D.title}`, note: `Quick quiz and flashcards: ${page} (search GetGradify for free source-checked flashcards)` }])], { type: "text/calendar" }));
    a.download = "gradify-review.ics"; a.click(); act("export"); cmsg.textContent = "Reminder downloaded: open it to add it to your calendar.";
  });
}
