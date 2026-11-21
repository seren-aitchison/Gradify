// Learning-quality corpus audit: reads every lesson in kit/courses/*/notes and measures the signals that
// structural QA does not: explanation density, worked examples, visual coverage, assessment flaws, boilerplate.
// Usage: node scripts/learning-audit/corpus-audit.mjs [--json out.json]
import { readdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { parseNotes } from "../../kit/course/notes.js";

const ROOT = new URL("../../kit/courses/", import.meta.url).pathname;
const plain = (s) => String(s || "").replace(/\*\*|`|_\{|\^\{|\}/g, "");
const words = (s) => plain(s).split(/\s+/).filter(Boolean).length;
const VISUAL = /mechanism|cycle|pathway|structure of|anatomy|circuit|ray diagram|free.body|graph|curve|diagram|apparatus|orbital|field line|wave|transformation|geometry|vector|titration|energy profile|cell|organelle|heart|lung|kidney|neuron|synapse|supply and demand|map|timeline|flowchart|decision/i;
const CAUSAL = /\b(because|so that|therefore|which means|this means|so |as a result|due to|since|hence|explains why|leads to|causes)\b/gi;

const rows = [];
for (const course of readdirSync(ROOT).sort()) {
  const dir = join(ROOT, course, "notes");
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir).filter((f) => /^u\d+\.js$/.test(f)).sort()) {
    const mod = await import(pathToFileURL(join(dir, f)).href);
    const lessons = parseNotes(mod.default);
    lessons.forEach((L, i) => {
      const b = L.blocks;
      const prose = b.filter((x) => x.t === "p").map((x) => x.x).join(" ");
      const bullets = b.filter((x) => x.t === "ul").flatMap((x) => x.items);
      const body = [L.lead, prose, ...bullets, ...b.filter((x) => x.t === "key" || x.t === "pit").map((x) => x.x)].join(" ");
      const exs = b.filter((x) => x.t === "ex");
      const mcq = L.mcq;
      // test-wiseness flaw: right answer is uniquely the longest option by 30%+
      const longCue = mcq.filter((q) => { const r = q.right.length, w = Math.max(...q.wrong.map((x) => x.length)); return r > w * 1.3; }).length;
      // absurd distractors: obviously silly options that nobody would choose
      const absurd = mcq.flatMap((q) => q.wrong).filter((w) => /\balways (gases|zero|infinite)|to a crawl|purely decorative|has no effect on anything|only on Tuesdays|never matters|is irrelevant to\b|magic|randomly chosen/i.test(w)).length;
      const trivia = L.cards.filter(([q, a]) => /^(who|when|in what year|what year)\b/i.test(q) || /^\d{4}\.?$/.test(plain(a).trim())).length;
      rows.push({
        course, unit: f.replace(".js", ""), n: i + 1, title: L.title, level: L.level || "",
        words: words(body) + exs.reduce((s, e) => s + words(e.x + e.steps.join(" ")), 0),
        sections: b.filter((x) => x.t === "h").length, bullets: bullets.length, proseWords: words(prose),
        bulletShare: +(words(bullets.join(" ")) / Math.max(1, words(body))).toFixed(2),
        causalPer100: +((body.match(CAUSAL) || []).length / Math.max(1, words(body)) * 100).toFixed(2),
        workedExamples: exs.length, exampleSteps: exs.reduce((s, e) => s + e.steps.length, 0),
        formulas: b.filter((x) => x.t === "eq").reduce((s, e) => s + e.rows.length, 0),
        keys: b.filter((x) => x.t === "key").length, pitfalls: b.filter((x) => x.t === "pit").length,
        interactives: b.filter((x) => x.t === "ix").length, cards: L.cards.length, mcq: mcq.length, tasks: L.tasks.length,
        sources: L.sources.length, objectives: L.objectives.length,
        visualTopic: VISUAL.test(L.title + " " + L.lead), longCue, absurd, trivia,
        shortSum: L.summary.filter((s) => words(s) <= 3).length, sum: L.summary.length,
        lead: L.lead,
      });
    });
  }
}

const by = (k) => rows.reduce((m, r) => ((m[r[k]] ||= []).push(r), m), {});
const avg = (a, k) => +(a.reduce((s, r) => s + r[k], 0) / Math.max(1, a.length)).toFixed(2);
const pct = (a, f) => Math.round((a.filter(f).length / Math.max(1, a.length)) * 100);
const summary = Object.entries(by("course")).map(([course, a]) => ({
  course, lessons: a.length, words: avg(a, "words"), bulletShare: avg(a, "bulletShare"), causalPer100: avg(a, "causalPer100"),
  pctNoWorkedExample: pct(a, (r) => r.workedExamples === 0), pctVisualTopicNoIx: pct(a.filter((r) => r.visualTopic), (r) => r.interactives === 0),
  visualTopics: a.filter((r) => r.visualTopic).length, pctLongCue: Math.round(a.reduce((s, r) => s + r.longCue, 0) / Math.max(1, a.reduce((s, r) => s + r.mcq, 0)) * 100),
  absurd: a.reduce((s, r) => s + r.absurd, 0), pctNoSources: pct(a, (r) => r.sources === 0), cardsPerLesson: avg(a, "cards"),
  pctThisLessonLead: pct(a, (r) => /this lesson/i.test(r.lead)),
}));
const all = { lessons: rows.length, courses: summary.length, words: avg(rows, "words"),
  pctNoWorkedExample: pct(rows, (r) => r.workedExamples === 0), pctBulletHeavy: pct(rows, (r) => r.bulletShare > 0.6),
  visualTopics: rows.filter((r) => r.visualTopic).length, pctVisualTopicNoIx: pct(rows.filter((r) => r.visualTopic), (r) => r.interactives === 0),
  pctLongCue: Math.round(rows.reduce((s, r) => s + r.longCue, 0) / rows.reduce((s, r) => s + r.mcq, 0) * 100),
  pctThisLessonLead: pct(rows, (r) => /this lesson/i.test(r.lead)), pctShortSum: Math.round(rows.reduce((s, r) => s + r.shortSum, 0) / rows.reduce((s, r) => s + r.sum, 0) * 100),
  pctTwoCardsOrFewer: pct(rows, (r) => r.cards <= 2) };
console.log(JSON.stringify(all, null, 1));
console.table(summary);
const i = process.argv.indexOf("--json");
if (i > 0) writeFileSync(process.argv[i + 1], JSON.stringify({ all, summary, rows }, null, 1));
