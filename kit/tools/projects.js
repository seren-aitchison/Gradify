// Projects for XP (app.html#/tools/projects): real projects to complete, step by step, for XP and a portfolio.
// Each project has a brief, steps to tick off and somewhere to put the evidence (a link, or a write-up). Finishing one
// pays its XP once into the learner's Gradify account (the activity log, like every other XP), and it joins the
// portfolio, which prints or saves as a PDF to show a teacher, a university or an employer.
import { backLink, esc } from "./tools.js";

export const PROJECTS = [
  { id: "explainer-video", area: "Any subject", xp: 150, mins: 120, t: "Teach a topic in a 3-minute video", d: "Pick one topic you've studied and explain it to camera, or as a screen recording, for someone who's never met it.", steps: ["Choose a topic and write the three things a viewer must understand", "Plan it as a 6-shot storyboard", "Record it (a phone is fine), in under 3 minutes", "Watch it back and fix one thing", "Share the link as your evidence"] },
  { id: "revision-guide", area: "Any subject", xp: 120, mins: 180, t: "Write a one-page revision guide", d: "Turn a whole unit into one page another student could revise from.", steps: ["Pick a unit you've finished on Gradify", "List every key term and its definition", "Add one diagram you've drawn yourself", "Add three exam-style questions with answers", "Get a friend to use it and note what they found unclear"] },
  { id: "teach-a-friend", area: "Any subject", xp: 80, mins: 60, t: "Teach a friend and test them", d: "Teaching is the fastest way to find gaps in what you know.", steps: ["Choose a lesson you've completed", "Teach it to a friend or family member in 15 minutes", "Give them 5 questions afterwards", "Write down the questions they got wrong and why", "Re-explain those parts better"] },
  { id: "lab-report", area: "Science", xp: 200, mins: 240, t: "Run a kitchen-science experiment and write it up", d: "A real investigation, written up like a lab report: question, method, results, conclusion.", steps: ["Pick a question you can test at home (e.g. how temperature affects dissolving)", "Write a hypothesis and a fair-test method, with variables", "Collect results in a table, with repeats", "Draw a graph and describe the pattern", "Write a conclusion and three improvements"] },
  { id: "data-story", area: "Maths and data", xp: 180, mins: 180, t: "Tell a story with real data", d: "Find a public dataset, analyse it and present one clear finding.", steps: ["Find a dataset (ONS, data.gov.uk, Our World in Data)", "Ask one question the data can answer", "Clean it and calculate the averages and spread", "Make two charts", "Write 300 words on what it shows and what it can't"] },
  { id: "web-page", area: "Computing", xp: 200, mins: 240, t: "Build and publish a web page", d: "A real page on the internet, about something you've learned.", steps: ["Plan the page's sections on paper", "Write it in HTML and CSS", "Make it work on a phone", "Publish it free (GitHub Pages, Glitch or Netlify)", "Share the link as your evidence"] },
  { id: "small-app", area: "Computing", xp: 300, mins: 480, t: "Write a program that solves a real problem", d: "A small program for something you or a friend actually need.", steps: ["Interview someone about a problem they have", "Write down what the program must do", "Build it in any language", "Test it with three real inputs, including a strange one", "Put the code online and write a short README"] },
  { id: "case-brief", area: "Law", xp: 160, mins: 150, t: "Brief a real case", d: "Read a real judgment and brief it like a trainee solicitor.", steps: ["Find a case from your LawGradify lessons on BAILII", "Write the facts in under 150 words", "State the issue and the decision", "Explain the ratio and any obiter", "Say whether you agree, and why"] },
  { id: "clinical-case", area: "Health and medicine", xp: 160, mins: 150, t: "Write up a case study", d: "Take a condition from your lessons and write it up as a case: presentation, investigation and management.", steps: ["Pick a condition you've studied", "Describe a typical patient's presentation", "List the investigations and why each is done", "Outline management, with sources (NICE CKS is a good start)", "Add three things a patient would want to know"] },
  { id: "history-source", area: "History", xp: 150, mins: 150, t: "Analyse a primary source", d: "Find a real source from the period you're studying and analyse it like a historian.", steps: ["Find a primary source (The National Archives, British Library)", "Describe its content, origin and purpose", "Explain what it's useful for", "Explain its limits", "Compare it with one other source"] },
  { id: "business-plan", area: "Business and finance", xp: 220, mins: 300, t: "Write a one-page business plan", d: "A real idea, tested with real people.", steps: ["Describe the problem and who has it", "Ask five possible customers about it", "Set a price and work out your costs", "Calculate your break-even point", "Write the plan on one page"] },
  { id: "budget", area: "Business and finance", xp: 100, mins: 90, t: "Plan a real monthly budget", d: "Your own, or a realistic student's: income, spending and saving.", steps: ["List every income and its timing", "Track a week of spending", "Sort it into needs, wants and saving", "Set a saving goal and a plan to reach it", "Review it after a month"] },
  { id: "essay", area: "English and humanities", xp: 180, mins: 240, t: "Write and redraft an essay", d: "An argued essay, improved by feedback.", steps: ["Choose a question from your lessons", "Plan your argument and counter-argument", "Write 800 to 1,200 words", "Get feedback (a teacher, a friend, or Gradify AI)", "Redraft and note what changed"] },
  { id: "language-convo", area: "Languages", xp: 120, mins: 120, t: "Hold a 5-minute conversation", d: "Record yourself speaking with a native speaker or another learner.", steps: ["Learn 30 words on one topic", "Write 10 questions you could ask", "Have the conversation (a language exchange app works)", "Record or write down what was said", "List the mistakes you'll fix"] },
  { id: "music-piece", area: "Music and arts", xp: 180, mins: 240, t: "Compose or arrange a short piece", d: "Make something original and share it.", steps: ["Choose a form (a song, a loop, a short piece)", "Write the melody or chord progression", "Arrange it for at least two parts", "Record it", "Write a programme note about your choices"] },
  { id: "volunteer", area: "Careers", xp: 250, mins: 600, t: "Volunteer for 10 hours", d: "Real experience: a charity, a school, a club or a hospital.", steps: ["Find a placement (do-it.org, a local charity, school)", "Agree what you'll do and when", "Complete 10 hours and keep a log", "Ask your supervisor for a short reference", "Write what you learned for your CV"] },
  { id: "cv", area: "Careers", xp: 100, mins: 90, t: "Write a CV and a cover letter", d: "Ready for a real job, internship or course.", steps: ["Find a real role you'd apply for", "Write a one-page CV with achievements, not duties", "Add your Gradify courses and projects", "Write a cover letter for that role", "Get someone to review both"] },
  { id: "eco-audit", area: "Environment", xp: 150, mins: 180, t: "Audit and cut a household's footprint", d: "Measure, change and measure again.", steps: ["Measure a week of energy, water or waste", "Find the three biggest sources", "Make one change for two weeks", "Measure again and compare", "Present the result as a chart and a paragraph"] },
];
const KEY = "gradify.projects";
const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
const write = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* fine */ } };
/** How far a project is: { done: number of steps ticked, of, finished } (pure on its saved state). */
export const progressOf = (p, st = {}) => ({ done: (st.steps || []).filter(Boolean).length, of: p.steps.length, finished: Boolean(st.finishedAt) });

export async function renderProjects(view, ctx, [id]) {
  const all = read();
  if (id === "portfolio") return portfolio(view, all);
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) {
    const areas = [...new Set(PROJECTS.map((x) => x.area))];
    const earned = PROJECTS.filter((x) => all[x.id]?.finishedAt).reduce((a, x) => a + x.xp, 0);
    view.innerHTML = `<div class="tl">${backLink()}<div class="deck-head"><div><span class="kicker lo-kicker">Progress and rewards</span><h1>Projects for XP</h1><p class="sub">Real projects to complete, step by step. Finish one to earn its XP and add it to your portfolio, ready to show a teacher, a university or an employer.</p></div><a class="btn btn-light lg" href="#/tools/projects/portfolio"><span>My portfolio</span></a></div>
      <p class="sub">${earned ? `${earned.toLocaleString("en-GB")} XP earned from projects so far.` : "Pick one that fits what you're studying."}</p>
      ${areas.map((a) => `<h2 class="lo-h">${esc(a)}</h2><div class="tl-grid">${PROJECTS.filter((x) => x.area === a).map((x) => { const pr = progressOf(x, all[x.id]); return `<a class="tl-tile panel glass pj-tile ${pr.finished ? "done" : ""}" href="#/tools/projects/${x.id}"><span class="tl-k">+${x.xp} XP · about ${Math.round(x.mins / 60 * 2) / 2} h</span><b>${esc(x.t)}</b><span class="sub">${esc(x.d)}</span><span class="tl-left">${pr.finished ? "✓ Finished" : pr.done ? `${pr.done} of ${pr.of} steps` : "Not started"}</span></a>`; }).join("")}</div>`).join("")}</div>`;
    return;
  }
  const st = all[p.id] || { steps: [], evidence: "" };
  const paint = () => {
    const pr = progressOf(p, st);
    view.innerHTML = `<div class="tl">${backLink("#/tools/projects", "Projects")}<div class="deck-head"><div><span class="kicker lo-kicker">${esc(p.area)} · +${p.xp} XP</span><h1>${esc(p.t)}</h1><p class="sub">${esc(p.d)}</p></div></div>
      <article class="panel glass pj"><div class="goal-bar"><i style="width:${(pr.done / pr.of) * 100}%"></i></div>
        <ol class="pj-steps">${p.steps.map((s, i) => `<li><label class="tl-fact"><input type="checkbox" class="tl-switch" data-s="${i}" ${st.steps[i] ? "checked" : ""} ${pr.finished ? "disabled" : ""}><span>${esc(s)}</span></label></li>`).join("")}</ol>
        <label class="pj-ev"><b>Your evidence</b><span class="sub">A link to what you made, or a short write-up of what you did and learned.</span><textarea rows="5" ${pr.finished ? "readonly" : ""}>${esc(st.evidence || "")}</textarea></label>
        ${pr.finished ? `<p><b>✓ Finished ${new Date(st.finishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}.</b> +${p.xp} XP. It's in your <a href="#/tools/projects/portfolio">portfolio</a>.</p><button type="button" class="btn btn-ghost lg btn-sm" data-reopen><span>Edit it</span></button>`
          : `<button type="button" class="btn btn-primary lg" data-finish ${pr.done < pr.of ? "disabled" : ""}><span>${pr.done < pr.of ? `Tick every step to finish (${pr.done} of ${pr.of})` : `Finish and earn ${p.xp} XP`}</span></button>`}</article></div>`;
    view.querySelectorAll("[data-s]").forEach((b) => b.addEventListener("change", () => { st.steps[+b.dataset.s] = b.checked; all[p.id] = st; write(all); paint(); }));
    view.querySelector("textarea").addEventListener("input", (e) => { st.evidence = e.target.value; all[p.id] = st; write(all); });
    view.querySelector("[data-finish]")?.addEventListener("click", async () => {
      if (String(st.evidence || "").trim().length < 20) { ctx.toast("Add your evidence first: a link or a few sentences."); view.querySelector("textarea").focus(); return; }
      st.finishedAt = new Date().toISOString();
      // XP is paid once per project, however often it's reopened
      if (!st.paid) { try { await ctx.store.logActivity({ kind: "project", xp: p.xp, detail: { project: p.id, title: p.t } }); st.paid = true; } catch (e) { ctx.toast(`Saved, but the XP couldn't be added just now: ${esc(e.message)}`); } }
      all[p.id] = st; write(all); ctx.toast(`Project finished. +${p.xp} XP`); paint();
    });
    view.querySelector("[data-reopen]")?.addEventListener("click", () => { delete st.finishedAt; all[p.id] = st; write(all); paint(); });
  };
  paint();
}
function portfolio(view, all) {
  const done = PROJECTS.filter((p) => all[p.id]?.finishedAt).sort((a, b) => all[b.id].finishedAt.localeCompare(all[a.id].finishedAt));
  const link = (s) => esc(s).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" rel="noopener" target="_blank">$1</a>');
  view.innerHTML = `<div class="tl">${backLink("#/tools/projects", "Projects")}<div class="deck-head"><div><span class="kicker lo-kicker">Portfolio</span><h1>My portfolio</h1><p class="sub">Every project you've finished, with your evidence. Print it, or save it as a PDF from the print window.</p></div>${done.length ? `<button type="button" class="btn btn-light lg" onclick="print()"><span>Print or save as PDF</span></button>` : ""}</div>
    ${done.length ? done.map((p) => `<article class="panel glass pj-done"><span class="tl-k">${esc(p.area)} · ${new Date(all[p.id].finishedAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })} · +${p.xp} XP</span><h3>${esc(p.t)}</h3><p class="sub">${esc(p.d)}</p><p>${link(all[p.id].evidence)}</p></article>`).join("")
      : `<div class="empty-state panel glass"><h3>No finished projects yet</h3><p class="sub">Finish a project and it appears here.</p><a class="btn btn-primary lg" href="#/tools/projects"><span>Choose a project</span></a></div>`}</div>`;
}
