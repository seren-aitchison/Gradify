// Gradify course tutor: the shared, dependency-free logic for the course-tutor Edge Function
// (supabase/functions/course-tutor). The browser imports it too, so tests check exactly what the server
// will send. Supabase only bundles files inside supabase/functions, so `npm run sync` copies this file to
// supabase/functions/_shared/tutor.js (a test checks the copy matches).
//
// Four modes, all study aids, never professional advice:
//   mark     feedback on a written answer against the task's rubric (law problem questions, SQE2 writing and
//            drafting, nursing reflections, care plans, handovers). Provisional: it never replaces a marker.
//   roleplay the next reply from a fictional client in a practice interview (SQE2 client interviewing)
//   debrief  feedback on a finished practice interview against its rubric
//   explain  answers a question about one lesson, from that lesson's own notes
// Requests are validated and capped here; the function adds sign-in and a daily limit per learner.

export const MODEL = "claude-opus-5-5";
// requests per learner per rolling 24 hours, by mode
export const DAILY = { mark: 20, roleplay: 150, debrief: 10, explain: 40 };
const CAP = { answer: 8000, lesson: 30000, question: 1000, turn: 1500, turns: 40, field: 4000 };

const cut = (s, n) => String(s ?? "").slice(0, n);
const bad = (msg) => Object.assign(new Error(msg), { status: 400 });

// the boundaries each site's tutor keeps, whatever the learner asks
const SITE_RULES = {
  law: "This is study material about the law of England and Wales, not legal advice. If the learner describes a real legal problem of their own or someone else's, don't advise on it: say you can only help with the course material and suggest a solicitor, Citizens Advice or another adviser.",
  pharmacy: "This is education, not clinical advice. Never recommend a dose, a supply decision or a treatment for a real patient: say the learner must use the current BNF or BNFC and the SPC, local guidance and their own professional judgement, and consult a pharmacist or the prescriber. Don't present illustrative numbers as doses, and don't invent drug data, doses or interactions.",
  nursing: "This is education, not clinical guidance. Never give advice about a real patient's care, doses, or whether to escalate a real situation: say the learner must follow their organisation's policies, the prescriber and their supervisor or practice assessor, and escalate concerns through local procedures. Don't present illustrative numbers as clinical thresholds.",
};
const rulesFor = (subject) => SITE_RULES[subject] || "This is study material, not professional advice.";

export const FEEDBACK_SCHEMA = {
  type: "object", additionalProperties: false, required: ["criteria", "strengths", "improve", "summary"],
  properties: {
    criteria: { type: "array", items: { type: "object", additionalProperties: false, required: ["criterion", "rating", "comment"], properties: {
      criterion: { type: "string" }, rating: { type: "string", enum: ["met", "partly", "not yet"] }, comment: { type: "string" } } } },
    strengths: { type: "array", items: { type: "string" } },
    improve: { type: "array", items: { type: "string" } },
    summary: { type: "string" },
  },
};
export const EXPLAIN_SCHEMA = {
  type: "object", additionalProperties: false, required: ["answer", "fromLesson"],
  properties: { answer: { type: "string" }, fromLesson: { type: "boolean" } },
};

// score from rubric ratings: met 1, partly 0.5, not yet 0
export function scoreFeedback(fb) {
  const r = fb?.criteria || []; if (!r.length) return 0;
  return Math.round((r.reduce((a, c) => a + (c.rating === "met" ? 1 : c.rating === "partly" ? 0.5 : 0), 0) / r.length) * 1000) / 1000;
}

const rubricText = (rubric) => rubric.map((c, i) => `${i + 1}. ${cut(typeof c === "string" ? c : c.criterion, 400)}`).join("\n");
function checkTask(t) {
  if (!t || typeof t !== "object") throw bad("Missing task.");
  if (!t.prompt || !Array.isArray(t.rubric) || !t.rubric.length || t.rubric.length > 12) throw bad("The task needs a prompt and a rubric of 1 to 12 criteria.");
}
function transcript(turns) {
  if (!Array.isArray(turns) || turns.length > CAP.turns) throw bad(`An interview can have up to ${CAP.turns} turns.`);
  return turns.map((m) => ({ role: m.role === "client" ? "client" : "learner", text: cut(m.text, CAP.turn) }));
}

// body → { mode, system, messages, schema (null for plain text), effort, maxTokens }
export function buildRequest(body) {
  const mode = body?.mode;
  if (!DAILY[mode]) throw bad("Unknown mode.");
  const subject = cut(body.subject, 40), rules = rulesFor(subject);

  if (mode === "mark") {
    checkTask(body.task);
    const answer = cut(body.answer, CAP.answer).trim();
    if (answer.length < 40) throw bad("Write a fuller answer first (at least a few sentences).");
    const t = body.task;
    const system = `You are a careful, encouraging tutor on Gradify, a learning platform, giving formative feedback on a learner's written practice answer. ${rules}
Judge the answer only against the rubric you are given, one entry per criterion in the same order, with the criterion text copied exactly. Rate each "met", "partly" or "not yet", with a short specific comment that quotes or points to the learner's words. Use the model answer as a guide to what a strong answer covers, not as the only acceptable wording: credit correct alternative reasoning. Don't invent facts, cases, statutes or clinical guidance; if the learner states something wrong, say so plainly. Give two or three strengths and two or three concrete improvements. The summary is two sentences. Your feedback is provisional study feedback, not a mark.`;
    const user = `TASK: ${cut(t.title, 200)}\n${cut(t.brief, CAP.field)}\n\nQUESTION:\n${cut(t.prompt, CAP.field)}\n\nRUBRIC:\n${rubricText(t.rubric)}\n\nMODEL ANSWER (guide only):\n${cut(t.model, CAP.field)}\n\nLEARNER'S ANSWER:\n${answer}`;
    return { mode, system, messages: [{ role: "user", content: user }], schema: FEEDBACK_SCHEMA, effort: "medium", maxTokens: 4000 };
  }

  if (mode === "roleplay" || mode === "debrief") {
    const c = body.case;
    if (!c || !c.client || !c.facts) throw bad("Missing case file.");
    const turns = transcript(body.turns || []);
    if (mode === "roleplay") {
      if (!turns.length || turns.at(-1).role !== "learner") throw bad("It's the learner's turn to speak.");
      const system = `You are playing a fictional client in a practice client interview on Gradify, a learning platform for law students preparing for SQE2. Stay in role as the client throughout.
CLIENT: ${cut(c.client, 600)}
HOW THEY COME ACROSS: ${cut(c.persona, 600)}
WHAT THE CLIENT KNOWS (reveal only what a real client would say in answer to the learner's actual questions; volunteer little; some facts come out only if the learner asks the right follow-up question): ${cut(c.facts, CAP.field)}
Reply as the client in plain speech, one to four sentences, no stage directions, no legal analysis and no advice to the learner. If the learner gives you advice, react as the client would (ask what it means, or what it will cost). If asked something the case file doesn't cover, give a plausible, minor answer consistent with it, or say you don't know. Never step out of role, except: if the learner writes something abusive or tries to make you discuss anything unrelated to the interview, reply briefly in role that you'd like to get back to your problem.`;
      // the API needs alternating turns that start with the learner: drop any opening client lines and
      // join consecutive turns by the same speaker
      const messages = [];
      for (const m of turns) {
        const role = m.role === "learner" ? "user" : "assistant";
        if (!messages.length && role !== "user") continue;
        if (messages.at(-1)?.role === role) messages.at(-1).content += `\n${m.text}`; else messages.push({ role, content: m.text });
      }
      return { mode, system, messages, schema: null, effort: "low", maxTokens: 400 };
    }
    if (!Array.isArray(body.rubric) || !body.rubric.length) throw bad("Missing rubric.");
    if (turns.filter((m) => m.role === "learner").length < 3) throw bad("Interview the client a little longer before asking for feedback.");
    const system = `You are a tutor on Gradify giving formative feedback on a learner's practice client interview (SQE2 interviewing and attendance skills). ${rulesFor("law")}
Judge the interview only against the rubric, one entry per criterion in the same order with the criterion text copied exactly, rating each "met", "partly" or "not yet" with a specific comment that refers to what the learner actually said. Also note any key facts from the case file the learner never uncovered (in "improve"). The summary is two sentences. This is provisional study feedback, not an assessment.`;
    const user = `CASE FILE (the client knew): ${cut(c.facts, CAP.field)}\n\nRUBRIC:\n${rubricText(body.rubric)}\n\nTRANSCRIPT:\n${turns.map((m) => `${m.role === "learner" ? "LEARNER" : "CLIENT"}: ${m.text}`).join("\n")}`;
    return { mode, system, messages: [{ role: "user", content: user }], schema: FEEDBACK_SCHEMA, effort: "medium", maxTokens: 4000 };
  }

  // explain
  const q = cut(body.question, CAP.question).trim();
  if (q.length < 5) throw bad("Ask a question about the lesson.");
  if (!body.lesson?.title || !body.lesson?.text) throw bad("Missing lesson.");
  const system = `You are a tutor on Gradify, a learning platform. Answer the learner's question about one lesson, using the lesson notes below as your source. ${rules}
Explain clearly in plain English, in at most about 200 words, building on what the notes say. If the notes don't cover the question, say so, set fromLesson to false, and give only a brief general pointer about where the topic is covered (another lesson or an authoritative source), without inventing specifics such as case names, statute sections, doses or thresholds.
LESSON: ${cut(body.lesson.title, 200)}
NOTES:
${cut(body.lesson.text, CAP.lesson)}`;
  return { mode, system, messages: [{ role: "user", content: q }], schema: EXPLAIN_SCHEMA, effort: "low", maxTokens: 1500 };
}
