// The programming adapter (TechGradify · ForgeLab, techgradify.com). TechGradify is a separate site; this adapter is
// what it would give the shared engine. It adds one assessment type that programming needs and no other subject
// does: predict the output of a piece of code. Its styles are in programming.css, which the site's pages link. The example course in tests/fixtures/programming/ runs on it.
//
//   OUT2#prog-u01-q1@1: What does this print? | print(len("abc") * 2) | 6 | len("abc") is 3, and 3 × 2 = 6.
//   body: question | code | expected output (one line; use \n inside it for several lines) | explanation
import { esc } from "../core/text.js";

const clean = (s) => String(s ?? "").replace(/\r/g, "").split("\n").map((l) => l.replace(/\s+$/, "")).join("\n").trim();
export const outputType = {
  tag: "OUT", type: "output", label: "Predict the output",
  handler: {
    parse(body) {
      const [q, code, out, why = ""] = body.split(" | ").map((x) => x.trim());
      if (!q || !code || out == null || out === "") return null;
      return { type: "output", q, code: code.replace(/\\n/g, "\n"), output: out.replace(/\\n/g, "\n"), why };
    },
    render(Q, ctx) {
      return `<pre class="aq-code"><code>${esc(Q.code)}</code></pre><div class="aq-out"><label for="${esc(ctx.key)}-out">What does it print?</label><textarea id="${esc(ctx.key)}-out" rows="2" spellcheck="false" autocapitalize="off" autocomplete="off"></textarea></div><button type="button" class="btn btn-ghost lg btn-sm aq-submit"><span>Check answer</span></button>`;
    },
    wire(box, Q, emit, ctx) {
      const t = box.querySelector(".aq-out textarea"), read = () => t.value;
      if (ctx.mode === "exam") t.addEventListener("input", () => emit(read(), { silent: true }));
      box.querySelector(".aq-submit").addEventListener("click", () => emit(read()));
    },
    restore(box, Q, v) { box.querySelector(".aq-out textarea").value = v || ""; },
    // exact output, ignoring trailing spaces and blank lines at either end, as a terminal shows it
    mark(Q, v) { const ok = clean(v) === clean(Q.output); return { score: ok ? 1 : 0, correct: ok, detail: ok ? "Output matches" : `You gave ${String(v ?? "").slice(0, 80)}` }; },
    feedback(Q, v, res) { return res.correct ? "" : `<p><b>It prints:</b></p><pre class="aq-code"><code>${esc(Q.output)}</code></pre>`; },
    paint(box, Q, v, res) { box.querySelector(".aq-out textarea").classList.toggle(res.correct ? "right" : "wrong", true); },
    answer(Q) { return Q.output; },
  },
};

export default {
  id: "programming", name: "Programming",
  defaults: {
    site: "TechGradify", unitWord: "Module",
    levels: ["Read", "Trace", "Debug"],
    practiceLabel: "Playground",
    tutor: "Answers come from Gradify AI, using this lesson's notes. Run any code it suggests yourself before relying on it.",
  },
  questionTypes: [outputType],
  qa: {
    expert: "a software engineer or computing lecturer",
    rules(unit, L) {
      const w = [];
      // a programming lesson should make the learner read code, not only about code
      if (!L.tasks.some((t) => t.type === "output") && !L.blocks.some((b) => b.t === "ex")) w.push("no code to read (an OUT: question or a worked example)");
      return w;
    },
    flags: () => ["code: run every example and expected output in the stated language version"],
  },
};
