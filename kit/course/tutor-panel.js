// The Gradify AI tutor on a lesson or lab page: one panel, five ways to use it, all grounded in a lesson's notes
// (kit/assess/tutor.js builds the requests; supabase/functions/course-tutor answers them).
//   Ask             a question about the lesson (explain)
//   Talk it through Socratic questioning towards an idea, without being told the answer (socratic)
//   Viva            five examiner questions with a verdict on each (examiner)
//   Challenge me    three harder questions aimed at the learner's weakest kind of evidence (challenge)
//   Connections     other lessons in the course this one links to (connect)
// Everything the model returns is escaped (tutor-view.js paras). Challenge questions are practice only: they
// aren't checked by a person, so they're not recorded as evidence of mastery.
import { esc } from "../core/text.js";
import { paras } from "../assess/tutor-view.js";

const MODES = [
  ["explain", "Ask"], ["socratic", "Talk it through"], ["examiner", "Viva"], ["challenge", "Challenge me"], ["connect", "Connections"],
];
const FOCUS_NAME = { recognition: "telling similar ideas apart", recall: "precise recall", explain: "explaining why", apply: "applying it", transfer: "using it in new contexts", retention: "the ideas most worth keeping" };

/**
 * @param {HTMLElement} el
 * @param {{ ask: (body: object) => Promise<any>, lesson: { id, title, text }, candidates: () => {id,title}[], focus: string|null,
 *           note: string, unavailable: (what: string) => string, link: (id: string) => string, titleOf: (id: string) => string,
 *           lab?: () => ({ title: string, state: string } | null), modes?: string[], heading?: string }} o
 * lab: the interactive lab the learner last used on this page and what it shows now; Ask and Talk it through send it,
 * so the tutor explains what the learner is looking at. modes: which of MODES to offer (all by default).
 */
// a random id for one tutor conversation (crypto.randomUUID where available)
import { upgradeLink } from "../data/functions.js";

export const newConversation = () => globalThis.crypto?.randomUUID?.() ?? "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => (c ^ (Math.random() * 16) >> (c / 4)).toString(16));

export function mountTutorPanel(el, o) {
  const modes = MODES.filter(([m]) => !o.modes || o.modes.includes(m));
  // conv: one id per conversation, so its turns share a single use of the learner's allowance (_shared/ai.js)
  let mode = modes[0][0], turns = [], conv = null;
  el.innerHTML = `<h3>${esc(o.heading || "Gradify AI tutor")}</h3>
    <div class="co-tmodes" role="tablist">${modes.map(([m, l]) => `<button type="button" role="tab" data-m="${m}" aria-selected="${m === mode}">${l}</button>`).join("")}</div>
    <p class="co-tlab" hidden></p><div class="co-tbody"></div><p class="aq-note">${esc(o.note)}</p>`;
  const body = el.querySelector(".co-tbody"), labLine = el.querySelector(".co-tlab");
  // what the tutor will be told about the lab, shown so the learner knows it can see it
  const lab = () => { const x = (mode === "explain" || mode === "socratic") ? o.lab?.() : null; labLine.hidden = !x; if (x) labLine.textContent = `The tutor can see what the “${x.title}” lab shows right now.`; return x || undefined; };
  if (o.lab) el.addEventListener("pointerenter", lab), el.addEventListener("focusin", lab);
  const fail = (err, what) => { body.querySelector(".co-tout").innerHTML = err.signin ? o.unavailable(what) : `<p class="co-empty">${esc(err.message)}${upgradeLink(err, o.pricing)}</p>`; };
  const busy = (t) => `<p class="co-empty">${esc(t)}</p>`;

  function paint() {
    lab();
    el.querySelectorAll("[data-m]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.m === mode)));
    turns = []; conv = newConversation();
    if (mode === "explain") {
      body.innerHTML = `<form class="co-askform"><label class="sr-only" for="co-askq">Your question about this lesson</label><input id="co-askq" type="text" maxlength="1000" autocomplete="off" placeholder="For example: why does this work?"><button class="btn btn-ghost lg btn-sm" type="submit"><span>Ask</span></button></form><div class="co-tout co-askout" aria-live="polite"></div>`;
      body.querySelector("form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const input = e.currentTarget.querySelector("input"), q = input.value.trim(), out = body.querySelector(".co-tout"); if (q.length < 5) return;
        out.innerHTML = busy("Thinking…");
        try {
          const r = await o.ask({ mode: "explain", lesson: o.lesson, question: q, lab: lab() });
          out.innerHTML = `<div class="co-askans"><p class="co-askq">${esc(q)}</p>${paras(r.answer)}${r.fromLesson ? "" : `<p class="aq-note">This goes beyond what the lesson covers, so check it against your course materials.</p>`}</div>`;
          input.value = "";
        } catch (err) { fail(err, "Asking the tutor"); }
      });
    } else if (mode === "socratic" || mode === "examiner") {
      const soc = mode === "socratic";
      body.innerHTML = `<p class="co-tintro">${soc ? "Say what you want to understand. The tutor asks you questions to help you work it out yourself, rather than telling you." : "Five exam-style questions on this lesson, one at a time, with a verdict on each answer. Answer from memory."}</p>
        ${soc ? `<label class="sr-only" for="co-goal">What do you want to understand?</label><input id="co-goal" class="co-tin" maxlength="400" placeholder="For example: why the rate depends on temperature">` : ""}
        <div class="co-chat" aria-live="polite"></div><div class="co-tout"></div>
        <form class="co-askform co-reply" ${soc ? "hidden" : ""}><label class="sr-only" for="co-rep">Your answer</label><input id="co-rep" type="text" maxlength="1500" autocomplete="off" placeholder="Your answer"><button class="btn btn-ghost lg btn-sm" type="submit"><span>Send</span></button></form>
        <button type="button" class="btn btn-light btn-sm co-start"><span>${soc ? "Start" : "Start the viva"}</span></button>`;
      const chat = body.querySelector(".co-chat"), form = body.querySelector(".co-reply"), start = body.querySelector(".co-start"), out = body.querySelector(".co-tout");
      const show = () => { chat.innerHTML = turns.map((t) => `<div class="co-msg ${t.role}"><b>${t.role === "learner" ? "You" : soc ? "Tutor" : "Examiner"}</b>${paras(t.text)}</div>`).join(""); };
      const next = async () => {
        out.innerHTML = busy(soc ? "Thinking…" : "The examiner is reading your answer…"); form.querySelector("button").disabled = true;
        try {
          const r = await o.ask({ mode, lesson: o.lesson, goal: soc ? body.querySelector("#co-goal").value.trim() : undefined, turns, lab: soc ? lab() : undefined, conversationId: conv });
          turns.push({ role: "tutor", text: r.reply }); show(); out.innerHTML = "";
          const over = !soc && /End of viva\.?\s*$/i.test(r.reply);
          form.hidden = over; start.hidden = true;
          if (over) out.innerHTML = `<button type="button" class="btn btn-ghost btn-sm co-again"><span>Another viva</span></button>`, out.querySelector(".co-again").onclick = paint;
          else form.querySelector("input").focus();
        } catch (err) { fail(err, soc ? "Talking it through" : "The viva"); start.hidden = false; }
        form.querySelector("button").disabled = false;
      };
      start.addEventListener("click", () => { if (soc && body.querySelector("#co-goal").value.trim().length < 3) { body.querySelector("#co-goal").focus(); return; } next(); });
      form.addEventListener("submit", (e) => { e.preventDefault(); const v = form.querySelector("input").value.trim(); if (!v) return; turns.push({ role: "learner", text: v }); form.querySelector("input").value = ""; show(); next(); });
    } else if (mode === "challenge") {
      body.innerHTML = `<p class="co-tintro">Three harder questions written from this lesson's notes${o.focus ? `, aimed at ${FOCUS_NAME[o.focus]}, your weakest kind of evidence so far` : ""}. They're practice only and don't count towards your mastery, because no one has checked them.</p><button type="button" class="btn btn-light btn-sm co-start"><span>Write my questions</span></button><div class="co-tout"></div>`;
      body.querySelector(".co-start").addEventListener("click", async (e) => {
        const out = body.querySelector(".co-tout"); e.currentTarget.disabled = true; out.innerHTML = busy("Writing your questions…");
        try {
          const r = await o.ask({ mode: "challenge", lesson: o.lesson, focus: o.focus });
          out.innerHTML = r.questions.length ? r.questions.map((q, i) => `<div class="co-chq" data-i="${i}"><p><b>${i + 1}.</b> ${esc(q.question)}</p>
            ${q.kind === "choice" ? `<div class="co-chopts">${q.options.map((op, j) => `<button type="button" data-j="${j}">${esc(op.text)}</button>`).join("")}</div>` : `<details><summary>Show a model answer</summary>${paras(q.answer)}</details>`}
            <p class="co-chwhy" hidden>${esc(q.why)}</p></div>`).join("") + `<p class="aq-note">Written by Gradify AI from the lesson notes. If a question looks wrong, trust the notes.</p>` : busy("The tutor couldn't write good questions for this lesson. Try again later.");
          out.querySelectorAll(".co-chq").forEach((box) => {
            const q = r.questions[box.dataset.i], why = box.querySelector(".co-chwhy");
            box.querySelectorAll("[data-j]").forEach((b) => b.addEventListener("click", () => {
              box.querySelectorAll("[data-j]").forEach((x) => { x.disabled = true; if (q.options[x.dataset.j].correct) x.classList.add("ok"); });
              if (!q.options[b.dataset.j].correct) b.classList.add("no");
              why.hidden = false;
            }));
            box.querySelector("details")?.addEventListener("toggle", () => { why.hidden = false; });
          });
        } catch (err) { fail(err, "Challenge questions"); e.currentTarget.disabled = false; }
      });
    } else {
      body.innerHTML = `<p class="co-tintro">Lessons elsewhere in the course that this one builds on, leads to, or parallels.</p><button type="button" class="btn btn-light btn-sm co-start"><span>Find connections</span></button><div class="co-tout"></div>`;
      body.querySelector(".co-start").addEventListener("click", async (e) => {
        const out = body.querySelector(".co-tout"); e.currentTarget.disabled = true; out.innerHTML = busy("Looking across the course…");
        try {
          const r = await o.ask({ mode: "connect", lesson: o.lesson, candidates: o.candidates() });
          out.innerHTML = r.links.length ? `<ul class="co-weak">${r.links.map((l) => `<li><a href="${o.link(l.id)}">${esc(o.titleOf(l.id))}</a> <small>${esc(l.why)}</small></li>`).join("")}</ul>` : busy("No strong connections found.");
        } catch (err) { fail(err, "Finding connections"); e.currentTarget.disabled = false; }
      });
    }
  }
  el.querySelector(".co-tmodes").addEventListener("click", (e) => { const b = e.target.closest("[data-m]"); if (b && b.dataset.m !== mode) { mode = b.dataset.m; paint(); } });
  paint();
}

// the study director's plan, on My progress
export function directorHtml(r, { link, titleOf }) {
  const A = { review: "Review", revisit: "Revisit", lesson: "Learn", exam: "Exam", practice: "Practise", rest: "Rest" };
  return `<div class="co-director"><p>${esc(r.message)}</p><ol>${r.steps.map((s) => `<li><span class="co-dact">${A[s.action] || "Do"} · ${s.mins} min</span><b>${s.lessonId ? `<a href="${link(s.lessonId)}">${esc(s.label)}</a>` : esc(s.label)}</b>${s.lessonId ? ` <small>${esc(titleOf(s.lessonId))}</small>` : ""}<p>${esc(s.why)}</p></li>`).join("")}</ol>
    <p class="aq-note">Planned by Gradify AI from your progress data only. It can be wrong, and your own judgement comes first.</p></div>`;
}
