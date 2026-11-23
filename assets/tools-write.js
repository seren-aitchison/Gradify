// Writing and coursework tools for getgradify.com/tools/ (pages written by scripts/seo/tools2.mjs): syllabus and
// mark-scheme coverage checks, a reference formatter, essay, seminar, presentation, viva, research-question and
// literature-review planners, a group-project splitter, a question deconstructor, and the checklist engine behind
// getgradify.com/checklists/. Pure functions first (tests/seo-tools.test.mjs). Everything stays in the browser.
import { fmt, esc, longDay, formTool, setNext, NOTES, rowsTool, val, save, load } from "./study-tools.js";
import { studied } from "./memory.js";

// ---------- keyword coverage (syllabus checker, mark-scheme checker) ----------
const STOP = new Set("about above after again against also because been before being below between both cannot could did does doing down during each from further have having here into itself just more most must other over same should some such than that their them then there these they this those through under until very were what when where which while will with would your you yours explain describe state outline evaluate discuss compare including example examples using used understand know able the and for are was its not but can has how why use one two all any may who out own per via".split(" "));
const stem = (w) => (w.endsWith("ss") || w.endsWith("is") ? w : w.replace(/ies$/, "y").replace(/(?:ation|ing|ed|es|s)$/, "").replace(/e$/, ""));
const words = (s) => String(s).toLowerCase().match(/[a-z][a-z0-9-]{2,}/g)?.filter((w) => !STOP.has(w)) || [];
export const keywords = (s) => [...new Set(words(s).map(stem).filter((w) => w.length >= 3))];
/** for each line of `points`, which of its keywords appear in `text`; covered when at least `need` of them do */
export function coverage(points, text, need = 0.6) {
  const have = new Set(keywords(text));
  return String(points).split("\n").map((p) => p.replace(/^[\s•*\-–\d.)]+/, "").trim()).filter((p) => p.length > 3).map((point) => {
    const orig = new Map(words(point).map((w) => [stem(w), w])), k = keywords(point), hit = k.filter((w) => have.has(w)), miss = k.filter((w) => !have.has(w)).map((w) => orig.get(w) || w);
    return { point, hit, miss, share: k.length ? hit.length / k.length : 0, covered: k.length > 0 && hit.length / k.length >= need };
  });
}

// ---------- references ----------
const names = (s) => String(s).split(/;|\band\b|&/).map((x) => x.trim()).filter(Boolean).map((n) => { const [last, first = ""] = n.includes(",") ? n.split(",").map((x) => x.trim()) : [n.split(" ").pop(), n.split(" ").slice(0, -1).join(" ")]; return { last, first, init: first.split(/[\s.-]+/).filter(Boolean).map((p) => `${p[0].toUpperCase()}.`).join(" ") }; });
const joinAll = (list, sep, last) => (list.length <= 1 ? list.join("") : `${list.slice(0, -1).join(sep)}${last}${list.at(-1)}`);
/** a reference and its in-text form. style: harvard | apa | vancouver | ieee; type: journal | book | web */
export function cite(style, type, f) {
  const a = names(f.authors || "Anon."), y = f.year || "n.d.", t = f.title || "Untitled", src = f.source || "", vol = f.volume || "", iss = f.issue || "", pp = f.pages || "", link = f.url || f.doi || "", acc = f.accessed || "";
  const doi = f.doi ? (f.doi.startsWith("http") ? f.doi : `https://doi.org/${f.doi}`) : f.url || "";
  if (style === "apa") {
    const au = joinAll(a.map((x) => `${x.last}, ${x.init}`), ", ", a.length > 1 ? ", & " : "");
    const ref = type === "journal" ? `${au} (${y}). ${t}. *${src}*${vol ? `, *${vol}*` : ""}${iss ? `(${iss})` : ""}${pp ? `, ${pp}` : ""}.${doi ? ` ${doi}` : ""}` : type === "book" ? `${au} (${y}). *${t}*${f.edition ? ` (${f.edition} ed.)` : ""}. ${f.publisher || src}.` : `${au} (${y}). *${t}*. ${src ? `${src}. ` : ""}${link}`;
    return { ref, intext: `(${a.length > 2 ? `${a[0].last} et al.` : a.map((x) => x.last).join(" & ")}, ${y})` };
  }
  if (style === "vancouver") {
    const au = (a.length > 6 ? [...a.slice(0, 6), { last: "et al", init: "" }] : a).map((x) => `${x.last} ${x.init.replace(/[.\s]/g, "")}`.trim()).join(", ");
    const ref = type === "journal" ? `${au}. ${t}. ${src}. ${y}${vol ? `;${vol}` : ""}${iss ? `(${iss})` : ""}${pp ? `:${pp}` : ""}.${f.doi ? ` doi:${f.doi.replace(/^https?:\/\/doi.org\//, "")}` : ""}` : type === "book" ? `${au}. ${t}.${f.edition ? ` ${f.edition} ed.` : ""} ${f.place ? `${f.place}: ` : ""}${f.publisher || src}; ${y}.` : `${au}. ${t} [Internet]. ${src ? `${src}; ` : ""}${y}${acc ? ` [cited ${acc}]` : ""}. Available from: ${link}`;
    return { ref, intext: "(1) or a superscript number, in order of first citation" };
  }
  if (style === "ieee") {
    const au = joinAll(a.map((x) => `${x.init} ${x.last}`.trim()), ", ", a.length > 2 ? ", and " : " and ");
    const ref = type === "journal" ? `[1] ${au}, "${t}," *${src}*${vol ? `, vol. ${vol}` : ""}${iss ? `, no. ${iss}` : ""}${pp ? `, pp. ${pp}` : ""}, ${y}${f.doi ? `, doi: ${f.doi.replace(/^https?:\/\/doi.org\//, "")}` : ""}.` : type === "book" ? `[1] ${au}, *${t}*${f.edition ? `, ${f.edition} ed` : ""}. ${f.place ? `${f.place}: ` : ""}${f.publisher || src}, ${y}.` : `[1] ${au}, "${t}," ${src ? `${src}, ` : ""}${y}. [Online]. Available: ${link}${acc ? ` (accessed ${acc})` : ""}.`;
    return { ref, intext: "[1], numbered in order of first citation" };
  }
  // Harvard (the common UK "Cite Them Right" form)
  const au = joinAll(a.map((x) => `${x.last}, ${x.init}`), ", ", " and ");
  const ref = type === "journal" ? `${au} (${y}) '${t}', *${src}*${vol ? `, ${vol}` : ""}${iss ? `(${iss})` : ""}${pp ? `, pp. ${pp}` : ""}.${f.doi ? ` Available at: ${doi}` : ""}` : type === "book" ? `${au} (${y}) *${t}*.${f.edition ? ` ${f.edition} edn.` : ""} ${f.place ? `${f.place}: ` : ""}${f.publisher || src}.` : `${au} (${y}) *${t}*. ${src ? `${src}. ` : ""}Available at: ${link}${acc ? ` (Accessed: ${acc})` : ""}.`;
  return { ref, intext: `(${a.length > 3 ? `${a[0].last} et al.` : joinAll(a.map((x) => x.last), ", ", " and ")}, ${y})` };
}

// ---------- essay outline ----------
export function essayOutline(prompt, words = 2000, thesis = "", points = 3) {
  const n = Math.min(6, Math.max(2, points)), intro = Math.round(words * 0.1 / 10) * 10, concl = intro, counter = Math.round(words * 0.15 / 10) * 10;
  const body = Math.round((words - intro - concl - counter) / n / 10) * 10;
  return [
    { part: "Introduction and thesis", words: intro, do: `Define the key terms in the question, give context in two sentences, and state your answer: ${thesis || "your one-sentence argument"}. Signpost the ${n} points you'll make.` },
    ...Array.from({ length: n }, (_, i) => ({ part: `Point ${i + 1}`, words: body, do: "Topic sentence that answers the question → evidence (source, data, case or quotation) → analysis: why it matters → evaluation: how strong or limited it is → link back to the thesis." })),
    { part: "Counter-argument and nuance", words: counter, do: "The strongest case against your thesis, taken seriously, then why your argument still holds (or where it needs qualifying)." },
    { part: "Conclusion", words: concl, do: `Answer "${String(prompt || "the question").slice(0, 80)}" directly, weigh your points, and say what follows. No new evidence.` },
  ];
}

// ---------- seminar prep ----------
export function seminarPrep(reading, claim, tension) {
  const r = reading || "the reading", c = claim || "its main claim", t = tension || "its biggest limitation";
  return {
    points: [`The core argument of ${r}: ${c}. Say it in one sentence, then give the evidence it rests on.`, `Where it's strongest: the part of ${r} you found most convincing, and why (method, data, logic).`, `The tension: ${t}. What would someone who disagrees say, and what would change your mind?`],
    questions: [`Would the argument still hold if ${t.replace(/\.$/, "")}?`, `How does ${r} connect to (or contradict) another reading from this module?`],
  };
}

// ---------- presentation pacing: about 130 words a minute spoken ----------
export function presentationPlan(minutes = 10, points = [], wpm = 130) {
  const m = Math.max(1, minutes), body = points.filter(Boolean).length ? points.filter(Boolean) : ["Point 1", "Point 2", "Point 3"];
  const introT = Math.max(0.5, Math.round(m * 0.12 * 2) / 2), endT = Math.max(0.5, Math.round(m * 0.1 * 2) / 2), each = Math.max(0.5, (m - introT - endT) / body.length);
  const slides = [{ title: "Title and hook", mins: introT }, ...body.map((p) => ({ title: p, mins: Math.round(each * 2) / 2 })), { title: "Summary and one takeaway", mins: endT }];
  return { slides: slides.map((s) => ({ ...s, words: Math.round(s.mins * wpm) })), words: m * wpm };
}
export const likelyQuestions = (topic, points = []) => [`What's the main limitation of ${points[0] || "your first point"}?`, `How would you apply ${topic || "this"} to a different case?`, `Why did you choose this evidence over alternatives?`];

// ---------- viva and project defence ----------
export function vivaQuestions(title, finding, limitation) {
  const t = title || "your project", f = finding || "your main finding", l = limitation || "its main limitation";
  return {
    "Methodology and evidence": [`Why did you choose this method for ${t}, and what else did you consider?`, `How confident are you in ${f}? What would make it wrong?`, "Talk me through your data: how was it collected, cleaned and checked?"],
    "Limitations and edge cases": [`You mention ${l}. How much does it weaken ${f}?`, "Which result surprised you, and how did you explain it?", "If you started again tomorrow, what would you change?"],
    "Next steps and impact": [`What's the single most important follow-up to ${t}?`, `Who should care about ${f}, and why?`, "How does your work fit with the key papers in your field?"],
  };
}

// ---------- research questions: PICO, SPIDER, FINER ----------
export function researchQuestions(f) {
  const topic = f.topic || "your topic", pop = f.population || "a defined group", comp = f.comparison || "the usual approach", out = f.outcome || "a measurable outcome";
  return {
    options: [
      { kind: "Too broad", q: `What is the effect of ${topic}?`, why: "No population, comparison or measure: impossible to answer in one project." },
      { kind: "Focused (PICO)", q: `In ${pop}, does ${topic} compared with ${comp} change ${out}?`, why: "Population, intervention, comparison and outcome are all named, so you know what data to collect." },
      { kind: "Analytical", q: `How and why does ${topic} affect ${out} in ${pop}, and under what conditions does this change?`, why: "Asks for mechanism and context: good for qualitative or mixed methods (SPIDER: sample, phenomenon, design, evaluation, research type)." },
    ],
    finer: ["Feasible: can you get the data, participants and time?", "Interesting: to you and to your supervisor?", "Novel: does it add something the literature doesn't already answer?", "Ethical: will it get approval?", "Relevant: does the answer matter to practice, policy or theory?"],
  };
}

// ---------- literature review grouping ----------
/** sources: [{ who, claim, stance: agree | disagree | gap, method }] → themes by agreement, tension and gap */
export function litGroups(sources) {
  const s = sources.filter((x) => x.who || x.claim);
  return { agree: s.filter((x) => x.stance === "agree"), tension: s.filter((x) => x.stance === "disagree" || x.stance === "method"), gap: s.filter((x) => x.stance === "gap") };
}

// ---------- group project ----------
/** tasks: [{ task, hours }] shared between members as evenly as possible (biggest first), with check-ins before the deadline */
export function groupSplit(members, tasks, deadline, from = new Date()) {
  const ms = members.filter(Boolean); if (!ms.length) return { load: [], checkpoints: [] };
  const load = ms.map((m) => ({ member: m, tasks: [], hours: 0 }));
  for (const t of [...tasks.filter((x) => x.task)].sort((a, b) => (Number(b.hours) || 1) - (Number(a.hours) || 1))) { const lo = load.reduce((a, b) => (b.hours < a.hours ? b : a)); lo.tasks.push(t.task); lo.hours += Number(t.hours) || 1; }
  const span = deadline ? Math.max(3, Math.round((deadline - from) / 864e5)) : 14, day = (p) => new Date(from.getTime() + Math.round(span * p) * 864e5);
  return { load, checkpoints: [["Everyone has started: share a rough draft of your part", day(0.33)], ["Full draft stitched together in one doc", day(0.66)], ["Internal deadline: final version, formatting and references", day(0.85)]].map(([what, when]) => ({ what, when })) };
}

// ---------- question deconstructor ----------
export const COMMAND = {
  state: ["Give the fact or name, no explanation.", "About 1 mark per point."], identify: ["Pick out or name it from the information given.", "Short, no reasoning."], define: ["Give the precise meaning, in the textbook's terms.", "Use the key words the mark scheme expects."],
  describe: ["Say what happens or what something is like, step by step.", "No 'why' needed."], outline: ["Give the main points briefly.", "One line each."], explain: ["Say why or how: a cause and its effect, linked with 'because' or 'so'.", "Each link usually earns a mark."],
  calculate: ["Work out a number, showing working and units.", "Marks for method even if the answer is wrong."], compare: ["Give similarities and differences, side by side.", "Use 'whereas' or 'both' in each sentence."], contrast: ["Give differences only, side by side.", "Each sentence names both things."],
  analyse: ["Break it into parts and show how they connect.", "Use evidence for each part."], evaluate: ["Weigh strengths and weaknesses, then judge.", "End with a supported conclusion."], assess: ["Weigh up how important or effective, then judge.", "A clear 'to what extent' answer."],
  discuss: ["Give arguments on more than one side.", "Reach a balanced view."], justify: ["Give reasons for a decision or answer.", "Back each reason with evidence."], suggest: ["Apply what you know to a new situation.", "Plausible answers get credit."], predict: ["Say what will happen, with a reason.", "Link to a principle."],
  "to what extent": ["Argue how far something is true, both sides, then judge.", "A clear verdict in the conclusion."], sketch: ["Draw the shape with key features labelled.", "No need for precise values."], determine: ["Get the answer from the data or a calculation.", "Show how."],
};
export function deconstruct(question, marks = 4) {
  const q = String(question).toLowerCase(), cw = Object.keys(COMMAND).filter((k) => new RegExp(`\\b${k}\\b`).test(q)).sort((a, b) => q.indexOf(a) - q.indexOf(b));
  const m = Math.max(1, Number(marks) || 4), word = cw[0] || null;
  const units = /\b(g|kg|mol|dm|cm|m\/s|j|kj|%|°c|pa)\b|calculate|determine/.test(q);
  return {
    command: word, meaning: word ? COMMAND[word] : null, points: m,
    steps: ["Read the constraints: underline the command word, the marks and any 'using the data' or 'in your answer' instruction.", `Identify the core concept the question is testing${word ? ` and what "${word}" asks you to do` : ""}.`, `Map your answer: about ${m} separate, creditable point${m === 1 ? "" : "s"}${m >= 6 ? ", in a logical chain, with a judgement at the end if it asks you to evaluate" : ""}.`, units ? "Check units, significant figures and that your number is sensible." : "Check every sentence answers the question as asked, not the one you hoped for."],
    time: Math.round(m * 1.2 * 10) / 10,
  };
}

// ---------- on the page ----------
const out = (root) => root.querySelector(".result");
const lines = (s) => String(s || "").split("\n").map((x) => x.trim()).filter(Boolean);
const covHtml = (rows, label) => `<p><span class="big">${rows.filter((r) => r.covered).length} of ${rows.length}</span>${label}</p><ul class="cov">${rows.map((r) => `<li class="${r.covered ? "ok" : "gap"}"><b>${r.covered ? "✓" : "✗"}</b> ${esc(r.point)}${r.miss.length ? ` <small>missing words: ${r.miss.map(esc).join(", ")}</small>` : ""}</li>`).join("")}</ul><p class="small">This checks whether the words appear, not whether you've understood or explained them: it's word matching, not marking.</p>`;
const TOOLS = {
  syllabus(root) {
    formTool(root, "syllabus", (f) => {
      if (!f.spec?.trim()) { out(root).textContent = "Paste the specification points, one per line."; return; }
      const r = coverage(f.spec, f.notes || ""); out(root).innerHTML = covHtml(r, "specification points appear in your notes.");
      const gaps = r.filter((x) => !x.covered).length;
      setNext(root, gaps ? `fill the ${gaps} gap${gaps === 1 ? "" : "s"} first, then ${NOTES}.` : `${NOTES}, and test yourself on every point.`);
    });
  },
  markscheme(root) {
    formTool(root, "markscheme", (f) => {
      if (!f.scheme?.trim()) { out(root).textContent = "Paste the mark-scheme points, one per line."; return; }
      const r = coverage(f.scheme, f.answer || "", 0.5); out(root).innerHTML = covHtml(r, "mark-scheme points are mentioned in your answer.");
      setNext(root, `<a href="/guides/command-words/">check what the command word wants</a> and <a href="/guides/long-answer-questions/">plan 6- and 8-mark answers</a>.`);
    });
  },
  cite(root) {
    const sync = () => { const t = root.querySelector("[name=type]").value; root.querySelectorAll("[data-for]").forEach((el) => { el.hidden = !el.dataset.for.split(" ").includes(t); }); };
    root.querySelector("[name=type]").addEventListener("change", sync); sync();
    formTool(root, "cite", (f) => {
      const c = cite(f.style, f.type, f), md = (s) => esc(s).replace(/\*([^*]+)\*/g, "<i>$1</i>");
      out(root).innerHTML = `<p><b>Reference list:</b><br><span class="ref">${md(c.ref)}</span></p><p><b>In the text:</b> ${esc(c.intext)}</p><p><button type="button" class="mini" data-copy-ref>Copy reference</button></p><p class="small">Styles vary between universities and journals: check your department's style guide for punctuation and italics before you submit.</p>`;
      out(root).querySelector("[data-copy-ref]").addEventListener("click", (e) => navigator.clipboard?.writeText(c.ref.replace(/\*/g, "")).then(() => { e.target.textContent = "Copied"; }));
      setNext(root, `<a href="/checklists/proofreading/">run the proofreading checklist</a> before you submit.`);
    });
  },
  essay(root) {
    formTool(root, "essay", (f) => {
      const o = essayOutline(f.prompt, Number(f.words) || 2000, f.thesis, Number(f.points) || 3);
      out(root).innerHTML = `<ol class="plan">${o.map((p) => `<li><b>${esc(p.part)}</b> · about ${p.words} words<br>${esc(p.do)}</li>`).join("")}</ol>`;
      setNext(root, `turn your readings into evidence cards: ${NOTES}.`);
    });
  },
  seminar(root) {
    formTool(root, "seminar", (f) => {
      const s = seminarPrep(f.reading, f.claim, f.tension);
      out(root).innerHTML = `<h2 class="h3">Three talking points</h2><ol>${s.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ol><h2 class="h3">Two questions to ask the group</h2><ol>${s.questions.map((p) => `<li>${esc(p)}</li>`).join("")}</ol>`;
      setNext(root, `turn the reading into checked flashcards: ${NOTES}.`);
    });
  },
  presentation(root) {
    formTool(root, "presentation", (f) => {
      const pts = lines(f.points), p = presentationPlan(Number(f.minutes) || 10, pts);
      out(root).innerHTML = `<p>About <b>${p.words.toLocaleString("en-GB")} spoken words</b> in ${f.minutes || 10} minutes at a clear 130 words a minute.</p><ol class="plan">${p.slides.map((s) => `<li><b>${esc(s.title)}</b> · ${fmt(s.mins)} min · about ${s.words} words</li>`).join("")}</ol><h2 class="h3">Questions you're likely to get</h2><ul>${likelyQuestions(f.topic, pts).map((q) => `<li>${esc(q)}</li>`).join("")}</ul>`;
      setNext(root, `practise answering out loud, then <a href="/checklists/peer-review/">swap feedback with your group</a>.`);
    });
  },
  viva(root) {
    formTool(root, "viva", (f) => {
      const v = vivaQuestions(f.title, f.finding, f.limitation);
      out(root).innerHTML = Object.entries(v).map(([h, qs]) => `<h2 class="h3">${h}</h2><ol>${qs.map((q) => `<li>${esc(q)}</li>`).join("")}</ol>`).join("");
      setNext(root, `turn your key points into flashcards to rehearse: ${NOTES}.`);
    });
  },
  research(root) {
    formTool(root, "research", (f) => {
      const r = researchQuestions(f);
      out(root).innerHTML = `${r.options.map((o) => `<p><b>${o.kind}:</b> ${esc(o.q)}<br><small>${o.why}</small></p>`).join("")}<h2 class="h3">FINER feasibility check</h2><ul>${r.finer.map((x) => `<li>${x}</li>`).join("")}</ul>`;
      setNext(root, `<a href="/tools/lit-review-helper/">group your sources into themes</a>.`);
    });
  },
  litreview(root) {
    const row = () => `<div class="row"><div><label>Source (author, year)</label><input name="who" maxlength="80"></div><div><label>Its claim or finding</label><input name="claim" maxlength="200"></div><div><label>Relation</label><select name="stance"><option value="agree">Agrees with the main view</option><option value="disagree">Disagrees</option><option value="method">Differs in method</option><option value="gap">Shows a gap</option></select></div><button type="button" class="icon" data-del aria-label="Remove this source">✕</button></div>`;
    rowsTool(root, "litreview", row, val, (rows) => {
      const g = litGroups(rows), theme = root.querySelector("[name=theme]").value || "your theme", li = (l) => (l.length ? `<ul>${l.map((x) => `<li><b>${esc(x.who)}</b>: ${esc(x.claim)}</li>`).join("")}</ul>` : "<p>None yet.</p>");
      out(root).innerHTML = `<h2 class="h3">1. Where the literature on ${esc(theme)} agrees</h2>${li(g.agree)}<h2 class="h3">2. Tensions and method differences</h2>${li(g.tension)}<p class="small">Write this section comparing studies with each other ("whereas", "in contrast"), not one paragraph per author.</p><h2 class="h3">3. The gap your work fills</h2>${li(g.gap)}`;
      setNext(root, `<a href="/tools/citation-helper/">format each reference</a>.`);
    });
  },
  group(root) {
    formTool(root, "group", (f) => {
      const tasks = lines(f.tasks).map((l) => { const m = l.match(/^(.*?)\s*[|,]\s*(\d+(?:\.\d+)?)\s*h?$/); return m ? { task: m[1].trim(), hours: Number(m[2]) } : { task: l, hours: 2 }; });
      const g = groupSplit(lines(f.members), tasks, f.due ? new Date(`${f.due}T00:00`) : null);
      if (!g.load.length) { out(root).textContent = "Add each member on their own line."; return; }
      out(root).innerHTML = `<h2 class="h3">Who does what</h2><ul>${g.load.map((m) => `<li><b>${esc(m.member)}</b> (${fmt(m.hours)} h): ${m.tasks.map(esc).join(", ") || "support and editing"}</li>`).join("")}</ul><h2 class="h3">Check-ins before the real deadline</h2><ol>${g.checkpoints.map((c) => `<li>${longDay(c.when)}: ${c.what}</li>`).join("")}</ol>`;
      setNext(root, `use <b>Copy summary</b> below to paste the plan into your group chat.`);
    });
  },
  deconstruct(root) {
    formTool(root, "deconstruct", (f) => {
      if (!f.question?.trim()) { out(root).textContent = "Paste an exam question."; return; }
      const d = deconstruct(f.question, f.marks);
      out(root).innerHTML = `<p><b>Command word:</b> ${d.command ? `“${esc(d.command)}”: ${esc(d.meaning[0])} <small>${esc(d.meaning[1])}</small>` : "none found: look for what the question wants you to do."}</p><ol>${d.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol><p>Time guide: about <b>${d.time} minutes</b> at 1.2 minutes a mark.</p>`;
      setNext(root, `<a href="/guides/command-words/">see every command word with examples</a>.`);
    });
  },
  // ---------- checklists: ticks saved, progress, copy what's left, filtered by draft type ----------
  checklist(root) {
    const id = `check-${root.dataset.key}`, saved = load(id) || {}, boxes = [...root.querySelectorAll("input[type=checkbox][data-item]")], type = root.querySelector("[name=type]");
    for (const b of boxes) b.checked = Boolean(saved[b.dataset.item]);
    const run = () => {
      const t = type?.value; for (const li of root.querySelectorAll("li[data-types]")) li.hidden = Boolean(t) && !li.dataset.types.split(" ").includes(t);
      const vis = boxes.filter((b) => !b.closest("li").hidden), done = vis.filter((b) => b.checked).length;
      save(id, Object.fromEntries(boxes.map((b) => [b.dataset.item, b.checked])));
      out(root).innerHTML = `<span class="big">${done} / ${vis.length}</span>done${done === vis.length && vis.length ? ": ready. Good luck." : ""}<div class="bar"><span style="width:${vis.length ? Math.round((done / vis.length) * 100) : 0}%"></span></div>`;
      if (done && done === vis.length) studied();
    };
    root.addEventListener("change", run); run();
    root.querySelector("[data-left]")?.addEventListener("click", (e) => {
      const left = boxes.filter((b) => !b.checked && !b.closest("li").hidden).map((b) => `☐ ${b.closest("label").textContent.trim()}`);
      navigator.clipboard?.writeText(`${document.querySelector("h1").textContent}: still to do\n${left.join("\n")}\n(checklist: ${location.origin}${location.pathname})`).then(() => { e.target.textContent = "Copied for your group chat"; });
    });
    root.querySelector("[data-clear]")?.addEventListener("click", () => { boxes.forEach((b) => { b.checked = false; }); run(); });
  },
};

export function mount(root) { TOOLS[root.dataset.tool]?.(root); }
