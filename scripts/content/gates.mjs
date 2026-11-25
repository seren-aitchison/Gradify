// The content engine's deterministic gates, cheapest first (docs/CONTENT-ENGINE.md). A lesson stops at its first
// failing gate; only a lesson that passes all of them is sent to the paid review. Every gate returns
//   { gate, ok, issues: [{ code, line, note }] }
// where line is the lesson line (L1 = "## Title") the fix list points the Writer at.
import { parseNotes, norm } from "../../kit/course/notes.js";
import { longestSharedRun } from "../knowledge/lib.mjs";
import { tokens } from "../curriculum/engine.mjs";

const KNOWN = new Set(["S", "H", "P", "E", "X", "K", "!", "Q", "O", "PRE", "T", "SUM", "SAFE", "SRC", "READ", "IX", "D", "EV", "LV", "CASE", "LAW", "DRUG", "REQ", "DIA", "DNEED", "GAP"]);
const QTAG = /^(M|TF|MS|SEQ|MATCH|SA|NUM)[123]?(#[a-z0-9-]+)?(@[\d,]+)?:/;
const lineOf = (text, re) => { const i = text.split("\n").findIndex((l) => re.test(l)); return i < 0 ? null : i + 1; };
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const issue = (code, line, note) => ({ code, line, note });
const result = (gate, issues) => ({ gate, ok: !issues.length, issues });

// ---------- 1. the parser accepts the file ----------
export function parseGate(text) {
  const issues = [], lessons = parseNotes(text);
  if (lessons.length !== 1) return result("parse", [issue("FMT", 1, `expected one lesson, found ${lessons.length}`)]);
  const L = lessons[0];
  text.split("\n").forEach((raw, i) => {
    const l = raw.trim(); if (!l || i === 0 || l.startsWith("> ") || l.startsWith("- ")) return;
    const tag = l.match(/^([A-Z!]{1,6}):/)?.[1];
    if (tag && !KNOWN.has(tag) && !QTAG.test(l)) issues.push(issue("FMT", i + 1, `unknown tag ${tag}:`));
    if (/^(M|TF|MS|SEQ|MATCH|SA|NUM)[123]?(#[a-z0-9-]+)?(@[\d,]+)?:/.test(l) && ![...L.mcq.map((m) => m.Q), ...L.tasks].some((Q) => l.includes(Q.q.slice(0, 30)))) issues.push(issue("FMT", i + 1, "question line doesn't parse"));
  });
  if (L.lead.length <= 60) issues.push(issue("FMT", lineOf(text, /^S:/) || 2, "S: lead must be over 60 characters"));
  if (/^this lesson/i.test(L.lead)) issues.push(issue("FMT", lineOf(text, /^S:/), "lead starts with \"This lesson\""));
  if (!L.level) issues.push(issue("FMT", 2, "no LV: line"));
  if (L.objectives.length < 2) issues.push(issue("FMT", lineOf(text, /^O:/) || 2, "fewer than two O: objectives"));
  if (!L.reqs.length) issues.push(issue("FMT", 2, "no REQ: line"));
  if (L.terms.length < 2) issues.push(issue("FMT", lineOf(text, /^T:/) || 2, "fewer than two T: key terms"));
  for (const b of L.blocks.filter((b) => b.t === "dia")) {
    const at = lineOf(text, new RegExp(`^DIA:\\s*${esc(b.renderer)}`));
    if (!b.spec) issues.push(issue("FMT", at, "DIA: spec isn't valid JSON"));
    // accessibility: every diagram says what it shows in words
    else for (const k of ["title", "caption", "alt"]) if (!String(b.spec[k] || "").trim()) issues.push(issue("FMT", at, `DIA: spec needs ${k === "alt" ? "alt text" : `a ${k}`}`));
  }
  return { ...result("parse", issues), lesson: L };
}

// ---------- 2. every REQ has an objective and a question ----------
export function coverageGate(L, text, { allowed = null } = {}) {
  const issues = [], qs = [...L.mcq.map((m) => m.Q), ...L.tasks];
  const asked = new Set(qs.flatMap((q) => q.objectives || []));
  for (const r of L.reqs) {
    const at = lineOf(text, new RegExp(`^REQ:\\s*${esc(r.id)}`));
    if (allowed && !allowed.has(r.id)) issues.push(issue("REQ", at, `${r.id} isn't in the packet`));
    if (!r.objectives.length) issues.push(issue("REQ", at, `${r.id} names no objectives (@n)`));
    for (const o of r.objectives) {
      if (o < 1 || o > L.objectives.length) issues.push(issue("REQ", at, `${r.id} names objective ${o}; lesson has ${L.objectives.length}`));
      else if (!asked.has(o)) issues.push(issue("REQ", at, `${r.id}: objective ${o} has no question tagged @${o}`));
    }
  }
  L.objectives.forEach((_, i) => { if (!asked.has(i + 1)) issues.push(issue("COV", lineOf(text, /^O:/) + i, `objective ${i + 1} has no question`)); });
  return result("coverage", issues);
}

// ---------- 3. the course QA rules (scripts/qa-courses.mjs), applied to the one lesson ----------
export function qaGate(L, text) {
  const issues = [], at = (q) => lineOf(text, new RegExp(esc(q.slice(0, 40))));
  if (L.blocks.filter((b) => b.t === "h").length < 2) issues.push(issue("QA", null, "fewer than two H: sections"));
  if (!L.blocks.some((b) => b.t === "key")) issues.push(issue("QA", null, "no K: key point"));
  if (L.cards.length < 2) issues.push(issue("QA", lineOf(text, /^Q:/), "fewer than two Q: flashcards"));
  if (L.mcq.length < 2) issues.push(issue("QA", lineOf(text, /^M[123]?/), "fewer than two check questions"));
  if (!L.summary.length) issues.push(issue("QA", null, "no SUM: summary"));
  for (const [q, a] of L.cards) if (a.split(/\s+/).length > 40) issues.push(issue("QA", at(q), "flashcard answer over 40 words"));
  for (const x of L.sources) if (!x.kind || !/^\d{4}(-\d{2}){0,2}$/.test(x.date)) issues.push(issue("QA", lineOf(text, new RegExp(`^SRC:\\s*${esc(x.cite.slice(0, 30))}`)), "SRC: needs a kind and a YYYY-MM-DD date"));
  if (!L.sources.length) issues.push(issue("QA", null, "no SRC: sources"));
  for (const q of [...L.mcq.map((m) => m.Q), ...L.tasks]) for (const o of q.objectives || []) if (o < 1 || o > L.objectives.length) issues.push(issue("QA", at(q.q), `question names objective ${o}; lesson has ${L.objectives.length}`));
  const seen = new Set();
  for (const m of L.mcq) {
    const where = at(m.q);
    if (m.wrong.length < 3) issues.push(issue("Q", where, "fewer than three wrong options"));
    if ((m.why || "").length <= 40) issues.push(issue("Q", where, "explanation too thin (40 characters or fewer)"));
    if (m.wrong.includes(m.right) || new Set(m.wrong).size !== m.wrong.length) issues.push(issue("Q", where, "duplicate option"));
    if (m.right.length > 12 && norm(m.right).length > 8 && norm(m.q).includes(norm(m.right))) issues.push(issue("Q", where, "answer appears in the question"));
    if (m.right.length > 1.3 * Math.max(...m.wrong.map((w) => w.length))) issues.push(issue("Q", where, "right answer is much the longest option"));
    const k = norm(m.q); if (seen.has(k)) issues.push(issue("Q", where, "duplicate question")); seen.add(k);
  }
  if (text.length < 1200) issues.push(issue("QA", null, `lesson too short (${text.length} characters)`));
  return result("qa", issues);
}

// ---------- 4. no 8-word run of the specification; its key terms appear ----------
/** reqs: [{ id, text, title }] with the specification's text (local only, never committed) */
export function specGate(L, text, reqs) {
  const issues = [], lessonWords = new Set(tokens(text));
  for (const r of L.reqs) {
    const req = reqs.find((x) => x.id === r.id), at = lineOf(text, new RegExp(`^REQ:\\s*${esc(r.id)}`));
    if (!req?.text) { issues.push(issue("SPEC", at, `${r.id}: specification text not imported here, can't check copying`)); continue; }
    const run = longestSharedRun(text, req.text);
    if (run.words >= 8) issues.push(issue("COPY", lineOf(text, new RegExp(esc(run.run.split(" ").slice(0, 3).join(" ")), "i")), `${run.words} words copied from the specification`));
    const terms = [...new Set(tokens(`${req.title || ""} ${req.text}`))], missing = terms.filter((t) => !lessonWords.has(t));
    if (terms.length && missing.length / terms.length > 0.4) issues.push(issue("COV", at, `${r.id}: specification terms missing: ${missing.slice(0, 6).join(", ")}`));
  }
  return result("spec", issues);
}

// ---------- 5. every calculation recomputes; every DIA spec renders and is legible ----------
const NUMRE = /[-−]?\d[\d,]*(?:\.\d+)?(?:\s*[×x*]\s*10\^\{?[-−]?\d+\}?)?/;
const toNum = (s) => { const t = s.replace(/−/g, "-").replace(/,(?=\d{3}\b)/g, "").replace(/\s/g, ""); const m = t.match(/^(-?\d+(?:\.\d+)?)(?:[×x*]10\^\{?(-?\d+)\}?)?/); return m ? Number(m[1]) * 10 ** Number(m[2] || 0) : NaN; };
/** evaluate "25 mm ÷ 500" (units dropped); null if it isn't an arithmetic expression of two or more numbers */
export function evalExpr(s) {
  let e = String(s).replace(/−/g, "-").replace(/(\d),(?=\d{3}\b)/g, "$1").replace(/(\d)\s*[×x]\s*10\^\{?(-?\d+)\}?/g, "$1e$2").replace(/10\^\{?(-?\d+)\}?/g, "1e$1")
    .replace(/[×]/g, "*").replace(/÷/g, "/").replace(/(\d)\s*x\s*(?=[\d(])/g, "$1*").replace(/%/g, "").replace(/\^/g, "**").replace(/\{|\}/g, "");
  e = e.replace(/[A-Za-zµμΩ°£$€³²]+/g, " ");   // units and words
  const m = e.match(/[\d.\s+\-*/()e]+$/); if (!m) return null;
  let x = m[0].trim().replace(/^[+*/)\s]+/, "");
  if (!/\d/.test(x) || (x.match(/\d+(?:\.\d+)?(?:e-?\d+)?/g) || []).length < 2 || !/[+\-*/]/.test(x.replace(/^-/, "").replace(/e-/g, "e"))) return null;
  if (/[^\d.\s+\-*/()e]/.test(x) || /[a-df-z]/i.test(x)) return null;
  try { const v = Function(`"use strict";return (${x})`)(); return Number.isFinite(v) ? v : null; } catch { return null; }
}
const close = (calc, shown) => { const dp = (String(shown).split(".")[1] || "").replace(/\D.*/, "").length; return Math.abs(calc - toNum(shown)) <= Math.max(0.5 * 10 ** -dp * 1.01, Math.abs(calc) * 0.005); };
/** arithmetic claims in a line: each "<expr> = <number>" pair is recomputed */
export function checkArithmetic(line) {
  const bad = [], parts = String(line).split(/\s=\s|=(?=\s*[-−\d])/);
  for (let i = 0; i < parts.length - 1; i++) {
    const v = evalExpr(parts[i]), rhs = parts[i + 1].trim().match(NUMRE)?.[0];
    if (v == null || !rhs || !/^\s*[-−]?\d/.test(parts[i + 1])) continue;
    if (!close(v, rhs.replace(/\s+/g, ""))) bad.push(`${parts[i].trim().slice(-40)} = ${rhs} (recomputes to ${+v.toPrecision(6)})`);
  }
  return bad;
}
export async function mathsDiagramGate(L, text, { render = null, legible = null } = {}) {
  const issues = [];
  text.split("\n").forEach((l, i) => { if (/^(X:|> |E:|NUM|P:|- )/.test(l.trim())) for (const b of checkArithmetic(l)) issues.push(issue("NUM", i + 1, b)); });
  for (const q of L.tasks.filter((t) => t.type === "num")) {
    const at = lineOf(text, new RegExp(esc(q.q.slice(0, 40))));
    const steps = (q.why || "").split(/[;.](?=\s)/).flatMap((s) => { const parts = s.split(/\s=\s|=(?=\s*[-−\d])/); return parts.slice(0, -1).map((p, k) => [evalExpr(p), parts[k + 1].trim().match(NUMRE)?.[0]]).filter(([v]) => v != null); });
    if (!steps.length) issues.push(issue("NUM", at, "NUM explanation shows no working (expr = value) to recompute"));
    else if (!steps.some(([v]) => Math.abs(v - q.answer) <= (q.tol.rel ? Math.abs(q.answer) * q.tol.rel : q.tol.abs) + Math.abs(q.answer) * 0.005 + 1e-9)) issues.push(issue("NUM", at, `answer ${q.answer} isn't what the working gives`));
  }
  const dias = L.blocks.filter((b) => b.t === "dia" && b.spec);
  if (dias.length && render) {
    for (const d of dias) {
      const at = lineOf(text, new RegExp(`^DIA:\\s*${esc(d.renderer)}`));
      try {
        const out = await render({ renderer: d.renderer, course: "content", ...d.spec });
        for (const c of (out.checks || []).filter((c) => !c.ok && c.severity !== "warn")) issues.push(issue("DIA", at, `check failed: ${c.name}`));
        if (legible) for (const p of await legible([out.wide, out.narrow])) issues.push(issue("DIA", at, p));
      } catch (e) { issues.push(issue("DIA", at, `doesn't render: ${e.message.slice(0, 80)}`)); }
    }
  }
  return result("num-dia", issues);
}

/** all deterministic gates in order, stopping at the first failure */
export async function runGates(text, { reqs = [], allowed = null, render = null, legible = null } = {}) {
  const p = parseGate(text); if (!p.ok) return { ok: false, failed: p, results: [p] };
  const L = p.lesson, results = [p];
  for (const g of [() => coverageGate(L, text, { allowed }), () => qaGate(L, text), () => specGate(L, text, reqs), () => mathsDiagramGate(L, text, { render, legible })]) {
    const r = await g(); results.push(r); if (!r.ok) return { ok: false, failed: r, results, lesson: L };
  }
  return { ok: true, results, lesson: L };
}
