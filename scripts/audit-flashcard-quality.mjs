// Educational quality audit for the "10 more flashcards per lesson" run, alongside the structural
// checker (scripts/check-flashcard-additions.mjs). For every new card (cards after a lesson's baseline
// cards) it flags:
//   ungrounded   the answer's content words barely appear in the lesson text (possible fact not in the lesson)
//   near-dup     the card is very similar to another card in the same lesson (existing or new)
//   yes-no       the question can be answered yes or no, so it tests recognition, not recall
//   vague        the question has no clear single target ("What is important about…", "Tell me about…")
//   echo         the answer mostly repeats the question
//   list-count   "Name three…" style questions whose answer has a different number of items
//   too-thin     a "why/how/explain" question with a one- or two-word answer
//   number-drift a number in the answer that appears nowhere in the lesson
// and writes a stratified sample (every subject × level, drawn with a fixed seed) for the rubric review in
// docs/FLASHCARD-QUALITY.md.
// Usage: node scripts/audit-flashcard-quality.mjs [--baseline <commit>] [--sample N per stratum] [--out dir] [files...]
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdtempSync, readFileSync, mkdirSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { parseNotes, lessonText } from "../kit/course/notes.js";

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); if (i < 0) return d; const v = args[i + 1]; args.splice(i, 2); return v; };
const baseline = opt("--baseline", "3719ed3");
const perStratum = +opt("--sample", "3");
const out = opt("--out", "docs/flashcard-audit");
const git = (...a) => execFileSync("git", a, { encoding: "utf8", maxBuffer: 1 << 28 });
const files = args.length ? args : git("ls-tree", "-r", "--name-only", baseline, "kit/courses").split("\n").filter((f) => /\/notes\/[^/]+\.js$/.test(f));
const tmp = mkdtempSync(join(tmpdir(), "fc-audit-"));
async function load(src, name) { const p = join(tmp, name.replace(/\//g, "_") + ".mjs"); writeFileSync(p, src); return (await import(pathToFileURL(p).href)).default; }

const STOP = new Set("a an the of to in on for and or but is are was were be been being by with as at from that this these those it its into than then which who whom whose what when where why how do does did can could should would may might must not no yes their there they them his her he she you your we our i me my also such each any all some more most less other only one two three four five first second used use uses using between within about over under after before during per via so if".split(" "));
const toks = (s) => s.toLowerCase().replace(/\*\*|[`*_]/g, "").match(/[\p{L}\p{N}]+/gu) || [];
const content = (s) => toks(s).filter((w) => w.length > 2 && !STOP.has(w));
const stem = (w) => w.replace(/(ing|ed|es|s|ly)$/u, "");
const jacc = (a, b) => { const A = new Set(a), B = new Set(b); let n = 0; for (const x of A) if (B.has(x)) n++; return n / (A.size + B.size - n || 1); };
const norm = (s) => s.toLowerCase().replace(/[\s.,;:!?'"-]+/g, " ").trim();
const NUMW = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
let seed = 20261120; const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);

const flags = [], pool = {};
let cards = 0;
for (const f of files) {
  if (!existsSync(f)) continue;
  let before; try { before = git("show", `${baseline}:${f}`); } catch { continue; }
  const after = readFileSync(f, "utf8");
  if (after === before) continue;
  const LB = parseNotes(await load(before, f + ".b")), LA = parseNotes(await load(after, f));
  const subject = f.split("/")[2], unit = f.match(/(u\d+)/)?.[1] || "";
  LA.forEach((la, k) => {
    const lb = LB[k]; if (!lb) return;
    const extra = la.cards.slice(lb.cards.length); if (!extra.length) return;
    // the lesson as written, without its flashcards, is the source the cards must come from
    const src = lessonText({ ...la, cards: [] }) + " " + la.terms.flat().join(" ") + " " + la.summary.join(" ") + " " + la.objectives.join(" ") + " " + la.lead
      + " " + la.mcq.map((m) => [m.q, m.right, m.why].join(" ")).join(" ") + " " + la.tasks.map((t) => JSON.stringify(t)).join(" ") + " " + la.authorities.map((a) => Object.values(a).join(" ")).join(" ") + " " + lb.cards.flat().join(" ");
    const srcSet = new Set(content(src).map(stem)), srcNums = new Set(src.match(/\d+(?:[.,]\d+)?/g) || []);
    const level = la.level || "unlevelled";
    extra.forEach(([q, a], i) => {
      cards++;
      const id = `${f}#L${k + 1}:${lb.cards.length + i}`, F = [];
      const ac = content(a).map(stem), hit = ac.filter((w) => srcSet.has(w)).length;
      if (ac.length >= 3 && hit / ac.length < 0.5) F.push(`ungrounded (${hit}/${ac.length} answer words in lesson)`);
      for (const n of a.match(/\d+(?:[.,]\d+)?/g) || []) if (!srcNums.has(n) && !q.includes(n)) { F.push(`number-drift (${n})`); break; }
      const others = la.cards.filter((_, j) => j !== lb.cards.length + i);
      const qa = content(q + " " + a);
      for (const [oq, oa] of others) { const s = jacc(qa, content(oq + " " + oa)), sa = jacc(content(a), content(oa)); if (s > 0.7 && sa > 0.5 && a !== oa ? true : s > 0.7 && norm(a) === norm(oa)) { F.push(`near-dup (${s.toFixed(2)}): ${oq.slice(0, 60)}`); break; } }
      if (/^(is|are|was|were|does|do|did|can|could|should|has|have|will|would)\b/i.test(q) && !/\bor\b/i.test(q)) F.push("yes-no");
      if (/^(what is important|tell me|describe everything|discuss|what about|anything)/i.test(q) || content(q).length === 0) F.push("vague");
      if (jacc(content(q), content(a)) > 0.6) F.push("echo");
      const m = q.match(/\b(name|list|give|state|identify)\s+(two|three|four|five|six|seven|eight|\d+)\b/i);
      if (m) { const want = NUMW[m[2].toLowerCase()] || +m[2]; const got = a.split(/[;,]| and | or /).filter((x) => x.trim()).length; if (got && Math.abs(got - want) > 0 && got < want) F.push(`list-count (asks ${want}, ~${got} given)`); }
      if (/^(why|explain|how (?!many|much|long|often|far|old))\b/i.test(q) && toks(a).length <= 2) F.push("too-thin");
      if (F.length) flags.push({ id, subject, level, q, a, flags: F });
      (pool[`${subject} · ${level}`] ??= []).push({ id, subject, unit, lesson: la.title, level, q, a, flags: F });
    });
  });
}

mkdirSync(out, { recursive: true });
const sample = [];
for (const [stratum, list] of Object.entries(pool).sort()) {
  const pick = new Set(); while (pick.size < Math.min(perStratum, list.length)) pick.add(Math.floor(rnd() * list.length));
  for (const i of pick) sample.push({ stratum, ...list[i] });
}
const kinds = {}; for (const x of flags) for (const k of x.flags) { const key = k.split(" ")[0]; kinds[key] = (kinds[key] || 0) + 1; }
const summary = { baseline, cards, flagged: flags.length, flagRate: +(flags.length / (cards || 1)).toFixed(3), kinds, strata: Object.keys(pool).length, sample: sample.length };
writeFileSync(join(out, "flags.json"), JSON.stringify(flags, null, 1));
writeFileSync(join(out, "sample.json"), JSON.stringify(sample, null, 1));
writeFileSync(join(out, "summary.json"), JSON.stringify(summary, null, 1));
console.log(JSON.stringify(summary, null, 1));
