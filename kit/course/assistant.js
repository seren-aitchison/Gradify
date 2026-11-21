// Gradify AI, one tap away on every course page: a glass orb in the corner that opens a small assistant.
//   On a lesson   it knows which lesson you're on: explain it simply, give an example, quiz you (a short viva) or
//                 help you work it out (Socratic), and any question you type is answered from that lesson's notes.
//   Elsewhere     it plans your next session from your own progress (the study director), takes you back to where
//                 you left off, says what's due, and finds lessons by name, which needs no AI at all.
// Every AI request goes through the course page's askTutor (kit/course/course.js → supabase/functions/course-tutor),
// so allowances, sign-in and the lesson's canonical notes are handled exactly as in the lesson tutor. Everything the
// model returns is escaped (tutor-view.js paras); nothing here is recorded as evidence of mastery.
import { esc } from "../core/text.js";
import { paras } from "../assess/tutor-view.js";
import { upgradeLink } from "../data/functions.js";
import { uiIcon as ic } from "../ui/icons.js";
import { newConversation, directorHtml } from "./tutor-panel.js";

const EXPLAIN_SIMPLY = "Explain the main idea of this lesson simply, step by step, as if I'm meeting it for the first time.";
const EXAMPLE = "Give me one clear, real-world example of the main idea in this lesson, and say how it shows the idea.";

/**
 * @param {{ ask: (body: object) => Promise<any>, course: string,
 *   lesson: () => ({ id: string, title: string } | null),
 *   director: () => object, link: (id: string) => string, titleOf: (id: string) => string,
 *   resume: () => ({ title: string, href: string } | null), due: () => number, reviewHref: string,
 *   find: (q: string) => { title: string, href: string, sub: string }[],
 *   unavailable: (what: string) => string, pricing?: string, lab?: () => ({ title: string, state: string } | null) }} o
 * lab: the lab the learner last used on this page, sent with explain and Socratic questions as the lesson tutor does,
 * so a challenge met after the AI helped is recorded as assisted
 */
export function mountAssistant(o) {
  if (document.querySelector(".gai")) return null;
  const fab = document.createElement("button");
  fab.type = "button"; fab.className = "gai-fab"; fab.setAttribute("aria-expanded", "false"); fab.setAttribute("aria-controls", "gai");
  fab.innerHTML = `<span class="gai-orb" aria-hidden="true"><i></i></span><span class="gai-fabt">Ask Gradify AI</span>`;
  fab.setAttribute("aria-label", "Open Gradify AI");
  const box = document.createElement("section");
  box.className = "gai"; box.id = "gai"; box.hidden = true;
  box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "false"); box.setAttribute("aria-labelledby", "gai-h");
  box.innerHTML = `<header class="gai-head"><span class="gai-orb" aria-hidden="true"><i></i></span><div><h2 id="gai-h">Gradify AI</h2><p class="gai-ctx"></p></div>
      <button type="button" class="gai-ib" data-gai-new aria-label="New conversation" title="New conversation">${ic("undo")}</button>
      <button type="button" class="gai-ib" data-gai-close aria-label="Close Gradify AI" title="Close (Esc)">${ic("close")}</button></header>
    <div class="gai-log" aria-live="polite"></div>
    <div class="gai-mode" hidden><span></span><button type="button" data-gai-end>End</button></div>
    <form class="gai-form"><label class="sr-only" for="gai-q">Message Gradify AI</label>
      <textarea id="gai-q" rows="1" maxlength="1000" autocomplete="off" enterkeyhint="send"></textarea>
      <button type="submit" class="gai-send" aria-label="Send">${ic("up")}</button></form>
    <p class="gai-note">Gradify AI is study help and it can be wrong. Check anything important against your notes.</p>`;
  // the course's own colours, from the course element (the box and the orb sit outside it, on <body>)
  const co = document.querySelector("#course, .co"), cs = co && getComputedStyle(co);
  for (const [v, from] of [["--a", "--la"], ["--b", "--lb"]]) { const c = cs?.getPropertyValue(from).trim(); if (c) { box.style.setProperty(v, c); fab.style.setProperty(v, c); } }
  document.body.append(box, fab);
  document.body.classList.add("has-gai");

  const log = box.querySelector(".gai-log"), form = box.querySelector(".gai-form"), input = box.querySelector("textarea"), ctx = box.querySelector(".gai-ctx");
  const modeBar = box.querySelector(".gai-mode"), send = box.querySelector(".gai-send");
  // the conversation: "ask" (questions on the lesson), "viva" and "think" (multi-turn, on the lesson), "find" (lessons by name)
  let kind = "ask", turns = [], conv = newConversation(), here = null, busy = false;

  const scroll = () => requestAnimationFrame(() => { log.scrollTop = log.scrollHeight; });
  const bubble = (who, html) => { const d = document.createElement("div"); d.className = `gai-msg ${who}`; d.innerHTML = html; log.append(d); scroll(); return d; };
  const thinking = () => bubble("ai gai-wait", `<span class="gai-dots" aria-label="Thinking"><i></i><i></i><i></i></span>`);
  const failed = (el, err, what) => { el.classList.remove("gai-wait"); el.innerHTML = err?.signin ? o.unavailable(what) : `<p>${esc(err?.message || "Gradify AI couldn't answer just now. Please try again.")}${upgradeLink(err, o.pricing)}</p>`; scroll(); };
  const setKind = (k, label) => {
    kind = k; turns = []; conv = newConversation();
    modeBar.hidden = !label; modeBar.querySelector("span").textContent = label || "";
    input.placeholder = k === "viva" ? "Your answer" : k === "think" ? "Your reply" : k === "find" ? "A topic, for example: moles" : here ? `Ask about “${here.title}”` : "Search lessons by topic, for example: moles";
  };

  const SUGGEST = {
    lesson: [
      ["sparkles", "Explain it simply", "The main idea, step by step", () => ask(EXPLAIN_SIMPLY, "Explain it simply")],
      ["target", "Give me an example", "One real-world case", () => ask(EXAMPLE, "Give me an example")],
      ["trophy", "Quiz me", "Five viva questions, one at a time", () => dialogue("viva")],
      ["bolt", "Help me work it out", "Questions that lead you there", () => dialogue("think")],
    ],
    course: [
      ["flag", "Plan my next session", "From your own progress", () => plan()],
      ["play", "Continue where I left off", "", () => resume()],
      ["cards", "What's due for review?", "", () => due()],
      ["search", "Find a lesson", "Search by topic", () => { setKind("find", "Finding a lesson"); input.focus(); }],
    ],
  };
  function greet() {
    log.innerHTML = "";
    const s = SUGGEST[here ? "lesson" : "course"];
    bubble("ai", `<p>${here ? `Hi! I can help with <b>${esc(here.title)}</b>. Pick one, or ask me anything about it.` : `Hi! I can plan your study, find lessons and pick up where you left off in ${esc(o.course)}. Open a lesson to ask me about it.`}</p>`);
    const g = document.createElement("div"); g.className = "gai-sugs";
    g.innerHTML = s.map(([i, t, sub], k) => `<button type="button" data-k="${k}">${ic(i)}<b>${esc(t)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</button>`).join("");
    g.addEventListener("click", (e) => { const b = e.target.closest("[data-k]"); if (b && !busy) s[+b.dataset.k][3](); });
    log.append(g);
  }
  function refresh() {
    const l = o.lesson(), changed = (l?.id || null) !== (here?.id || null);
    here = l; ctx.textContent = here ? `On this lesson: ${here.title}` : o.course;
    if (changed || !log.childElementCount) { setKind("ask"); greet(); }
  }

  async function ask(question, shown = question) {
    if (busy) return; busy = true; send.disabled = true;
    bubble("me", `<p>${esc(shown)}</p>`);
    const w = thinking();
    try {
      const r = await o.ask({ mode: "explain", lesson: { id: here.id, title: here.title }, question, lab: o.lab?.() || undefined });
      w.classList.remove("gai-wait");
      w.innerHTML = `${paras(r.answer)}${r.fromLesson === false ? `<p class="gai-aside">This goes beyond the lesson's notes, so check it against your course materials.</p>` : ""}`;
      scroll();
    } catch (err) { failed(w, err, "Asking Gradify AI"); }
    busy = false; send.disabled = false;
  }
  // a viva or a think-it-through: Gradify AI speaks first, then the learner and the AI take turns
  async function dialogue(k, reply) {
    if (busy) return;
    if (!reply) setKind(k, k === "viva" ? "Viva on this lesson" : "Working it out together");
    else { turns.push({ role: "learner", text: reply }); bubble("me", `<p>${esc(reply)}</p>`); }
    busy = true; send.disabled = true;
    const w = thinking();
    try {
      const r = await o.ask({ mode: k === "viva" ? "examiner" : "socratic", lesson: { id: here.id, title: here.title }, goal: k === "think" ? "the main idea of this lesson" : undefined, turns, conversationId: conv, lab: k === "think" ? o.lab?.() || undefined : undefined });
      turns.push({ role: "tutor", text: r.reply });
      w.classList.remove("gai-wait"); w.innerHTML = paras(r.reply); scroll();
      if (k === "viva" && /End of viva\.?\s*$/i.test(r.reply)) setKind("ask");
      input.focus();
    } catch (err) { failed(w, err, k === "viva" ? "The viva" : "Talking it through"); if (!reply) setKind("ask"); }
    busy = false; send.disabled = false;
  }
  async function plan() {
    if (busy) return; busy = true;
    bubble("me", `<p>Plan my next session</p>`);
    const w = thinking();
    try { const r = await o.ask(o.director()); w.classList.remove("gai-wait"); w.innerHTML = directorHtml(r, { link: o.link, titleOf: o.titleOf }); scroll(); }
    catch (err) { failed(w, err, "Planning a session"); }
    busy = false;
  }
  function resume() {
    const r = o.resume();
    bubble("me", `<p>Continue where I left off</p>`);
    bubble("ai", r ? `<p>You were on <b>${esc(r.title)}</b>.</p><p><a class="gai-go" href="${esc(r.href)}">${ic("play")} Carry on reading</a></p>` : `<p>You haven't started a lesson yet. The syllabus is the place to begin.</p><p><a class="gai-go" href="#/learn">${ic("book")} Open the syllabus</a></p>`);
  }
  function due() {
    const n = o.due();
    bubble("me", `<p>What's due for review?</p>`);
    bubble("ai", n ? `<p>${n} flashcard${n === 1 ? " is" : "s are"} due. A few minutes now saves relearning later.</p><p><a class="gai-go" href="${esc(o.reviewHref)}">${ic("cards")} Review now</a></p>` : `<p>Nothing is due right now. Cards come back as they're about to fade.</p>`);
  }
  function find(q) {
    bubble("me", `<p>${esc(q)}</p>`);
    const hits = o.find(q).slice(0, 6);
    bubble("ai", hits.length ? `<p>${hits.length === 1 ? "This lesson matches" : "These lessons match"}:</p><ul class="gai-hits">${hits.map((h) => `<li><a href="${esc(h.href)}"><b>${esc(h.title)}</b><small>${esc(h.sub)}</small></a></li>`).join("")}</ul>`
      : `<p>No lesson titles match “${esc(q)}”. Try a shorter or different word.</p>`);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim(); if (!q || busy) return;
    input.value = ""; grow();
    if (kind === "viva" || kind === "think") return dialogue(kind, q);
    if (kind === "find" || !here) return find(q);
    if (q.length < 5) { bubble("ai", `<p>Ask a little more, so I know what you mean.</p>`); return; }
    ask(q);
  });
  // Enter sends; Shift+Enter is a new line. The box grows with what's typed, up to four lines.
  const grow = () => { input.style.height = "auto"; input.style.height = `${Math.min(input.scrollHeight, 112)}px`; };
  input.addEventListener("input", grow);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); form.requestSubmit(); } });
  modeBar.querySelector("[data-gai-end]").addEventListener("click", () => { setKind("ask"); bubble("ai", `<p>Stopped. Ask me anything else${here ? " about this lesson" : ""}.</p>`); input.focus(); });
  box.querySelector("[data-gai-new]").addEventListener("click", () => { if (busy) return; setKind("ask"); greet(); input.focus(); });

  // opening and closing: focus goes into the box and back to the orb; Esc closes; a link inside it closes it
  const open = (on) => {
    box.hidden = !on; fab.setAttribute("aria-expanded", String(on)); document.body.classList.toggle("gai-open", on);
    if (on) { refresh(); requestAnimationFrame(() => input.focus({ preventScroll: true })); } else fab.focus({ preventScroll: true });
  };
  fab.addEventListener("click", () => open(box.hidden));
  box.querySelector("[data-gai-close]").addEventListener("click", () => open(false));
  box.addEventListener("keydown", (e) => { if (e.key === "Escape") { e.stopPropagation(); open(false); } });
  box.addEventListener("click", (e) => { const a = e.target.closest("a[href]"); if (a && matchMedia("(max-width: 760px)").matches) open(false); });
  // a lesson renders a moment after its link is followed
  // (closed, it keeps the lesson it last showed, so reopening on another page sees the change and starts afresh)
  addEventListener("hashchange", () => setTimeout(() => { if (!box.hidden) refresh(); }, 350));
  return { open: () => open(true), close: () => open(false) };
}
