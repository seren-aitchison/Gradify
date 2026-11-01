// A CBT thought record, step by step, with an invented client (Jordan). Thought records are a standard cognitive therapy
// technique (Beck, 1979; Greenberger and Padesky, 2016). This simulation teaches the structure; it is not therapy.
import { shell, challenges } from "../lab.js";
import { caveat, esc } from "../social/ui.js";

export const STEPS = [
  { k: "situation", h: "1. Situation", p: "What happened, where and when? Facts only.", ex: "Tuesday, 10 a.m. I sent my manager a report; two hours later she hadn't replied.", opts: [["My manager hasn't replied to my report after two hours", true, "Correct: a factual description, with no interpretation."], ["My manager thinks my report is rubbish", false, "That's an interpretation (a thought), not the situation."], ["I felt sick all morning", false, "That's a feeling or body sensation; it belongs in the next column."]] },
  { k: "mood", h: "2. Emotions", p: "What did Jordan feel, and how strongly (0–100)?", ex: "Anxious 80, embarrassed 50.", opts: [["Anxious (80), embarrassed (50)", true, "Emotions are usually one word; rating them lets Jordan see change later."], ["I'm going to be sacked", false, "That's a thought. A test: emotions can usually be named in one word."], ["Nothing: I'm overreacting", false, "Dismissing the feeling stops it being examined."]] },
  { k: "thought", h: "3. Automatic thought", p: "What went through Jordan's mind? Which is the “hot” thought, most linked to the anxiety?", ex: "She hasn't replied because the report is bad. I'll be put on a performance plan.", opts: [["“The report is bad and I'll be put on a performance plan”", true, "This is the hot thought: it carries the most emotional charge."], ["“I wonder if she's busy”", false, "That's a balanced alternative, not the thought that caused the anxiety."], ["“I should have had a coffee”", false, "Not linked to the emotion."]] },
  { k: "distortion", h: "4. Thinking pattern", p: "Which unhelpful thinking pattern best describes the hot thought?", opts: [["Jumping to conclusions (mind reading and fortune telling)", true, "Jordan assumes they know what the manager thinks and predicts a bad outcome without evidence."], ["All-or-nothing thinking", false, "That would be seeing things in extremes (“if it isn't perfect, it's a failure”)."], ["Emotional reasoning", false, "Close, but the clearest pattern is predicting and mind reading; emotional reasoning is “I feel anxious, so something must be wrong”."]] },
  { k: "evidence", h: "5. Evidence", p: "Which is the best evidence <b>against</b> the hot thought?", opts: [["She often replies late in the day, and last month praised a similar report", true, "Specific, factual evidence that doesn't fit the thought."], ["I'm just being silly", false, "Self-criticism isn't evidence and tends to keep anxiety going."], ["Everything will be fine", false, "Reassurance isn't evidence; a thought record looks for facts."]] },
  { k: "balanced", h: "6. Balanced thought", p: "Which balanced thought takes account of all the evidence?", opts: [["“She's probably busy; she usually replies later and has liked my work before. If there's a problem, I can fix it.”", true, "A balanced thought is believable, uses the evidence for and against, and points to a way of coping."], ["“My report is brilliant and she'll love it”", false, "Overly positive thoughts are hard to believe; balanced isn't the same as positive."], ["“It doesn't matter what she thinks”", false, "Dismissive, and probably not believed."]] },
  { k: "rerate", h: "7. Re-rate", p: "Jordan re-rates anxiety at 40. What does the change show?", opts: [["The thought, not just the situation, was driving much of the anxiety", true, "The cognitive model: emotions follow interpretations of events (Beck, 1976). Change is often gradual, and thought records are practised repeatedly."], ["The anxiety has been cured", false, "One record lowers the intensity of one episode; that is not a cure."], ["Jordan was never really anxious", false, "The initial rating was real; the point is that it changed with re-appraisal."]] },
];
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="sx-panel"><div class="sx-cases"></div></div><div class="lab-ctrl"></div>`);
  const host = $(".sx-cases"), ctrl = $(".lab-ctrl");
  caveat(ctrl, "<b>Educational simulation, not therapy.</b> Jordan is invented. CBT is delivered by trained therapists after an assessment. If you're struggling, speak to your GP or NHS 111, or in the UK refer yourself to NHS Talking Therapies.");
  const ch = challenges(ctrl, ctx, [{ id: "done", text: "Complete Jordan's thought record", test: (x) => x.done }]);
  let i = 0; const got = [];
  const paint = (msg = "") => {
    const s = STEPS[i];
    host.innerHTML = `<div class="sx-head"><b>Jordan's thought record</b><span>Step ${i + 1} of ${STEPS.length}</span></div>
      <div class="sx-card">${got.map((g, j) => `<p><b>${esc(STEPS[j].h.slice(3))}:</b> ${esc(g)}</p>`).join("") || "<p>Jordan, 27, has been feeling anxious about work. Help them complete a thought record.</p>"}</div>
      <article class="sx-case"><h4>${s.h}</h4><p class="sx-q">${s.p}</p><div class="sx-opts">${s.opts.map(([t], j) => `<button type="button" data-j="${j}">${esc(t)}</button>`).join("")}</div><p class="sx-fb" aria-live="polite">${msg}</p></article>`;
  };
  host.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-j]"); if (!b) return; const [t, ok, why] = STEPS[i].opts[Number(b.dataset.j)];
    if (!ok) { b.classList.add("no"); host.querySelector(".sx-fb").innerHTML = `<b>Not quite.</b> ${esc(why)}`; return; }
    got.push(t); ctx?.complete?.(STEPS[i].k, STEPS[i].h);
    if (i < STEPS.length - 1) { i++; paint(`<b>Yes.</b> ${esc(why)}`); } else { ch.check({ done: true }); ctx?.onComplete?.({ score: 1 }); paint(`<b>Complete.</b> ${esc(why)}`); host.querySelector(".sx-opts").innerHTML = ""; }
  });
  paint();
}
