// The shorthand formats models and scripts exchange (prompts/shorthand.md): work packets, research briefs, review
// verdicts, fix lists and repairs. Pure functions, no I/O, so every format is tested on its own (tests/content.test.mjs).
// Shorthand never reaches a learner: lessons are full English; these are the envelopes around them.

export const BRIEF_TAGS = ["F", "DEF", "MIS", "EXAM", "VAR", "NUM", "CONFLICT", "SRC"];
export const REVIEW_CODES = ["FACT", "COV", "LVL", "Q", "CLR", "SAFE", "COPY", "CONF", "REQ"];
const field = (s) => String(s ?? "").replace(/\s*\|\s*/g, " / ").replace(/\s+/g, " ").trim();

/** a work packet (engine → Writer). Fixed field order, no dates, so identical inputs give identical bytes. */
export function packet({ id, subject, level, country = "uk", framework, reqs = [], reuse = [], diagrams = [], renderers = [], brief = "" }) {
  const out = [`PKT ${id} | subj=${subject} | lvl=${level} | ctry=${country} | fw=${framework}`];
  for (const r of reqs) out.push(`REQ ${r.id} | ${field(r.asks)} | status=${r.status || "official"} | type=${r.type || "concept"}`);
  for (const r of reuse) out.push(`REUSE ${r.id} | ${field(r.title)}`);
  for (const d of diagrams) out.push(`DIAG ${d.id} | ${field(d.shows)}`);
  for (const r of renderers) out.push(`RND ${r.id} | ${field(r.schema)}`);
  out.push(`BRIEF ${brief.match(/^TOPIC (\S+)/m)?.[1] || "none"}`, briefBody(brief), "END");
  return out.filter((l) => l !== "").join("\n");
}
const briefBody = (b) => String(b || "").split("\n").map((l) => l.trim()).filter((l) => l && l !== "END").join("\n");

/** parse a research brief; problems lists what makes it unusable (the engine re-researches, never writes from it) */
export function parseBrief(text) {
  const lines = String(text || "").split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
  const b = { topic: null, levels: [], checked: null, facts: [], defs: [], mis: [], exam: [], vars: [], nums: [], conflicts: [], sources: [], problems: [] };
  for (const l of lines) {
    if (l === "END") break;
    const t = l.match(/^TOPIC (\S+)\s*\|\s*levels=([^|]*)\|\s*checked=(\S+)/);
    if (t) { b.topic = t[1]; b.levels = t[2].split(",").map((x) => x.trim()).filter(Boolean); b.checked = t[3]; continue; }
    const m = l.match(/^([A-Z]+):\s*(.*)$/);
    if (!m || !BRIEF_TAGS.includes(m[1])) { b.problems.push(`unknown line: ${l.slice(0, 60)}`); continue; }
    const parts = m[2].split(" | ").map((x) => x.trim());
    const key = { F: "facts", DEF: "defs", MIS: "mis", EXAM: "exam", VAR: "vars", NUM: "nums", CONFLICT: "conflicts", SRC: "sources" }[m[1]];
    if (m[1] === "SRC") { const [id, title, url, publisher, licence = "", checked = ""] = parts; b.sources.push({ id, title, url, publisher, licence: licence.replace(/^licence=/, ""), checked }); }
    else b[key].push(parts);
  }
  if (!b.topic) b.problems.push("no TOPIC line");
  if (b.sources.length < 3) b.problems.push(`${b.sources.length} sources: a brief needs at least 3 independent sources`);
  if (new Set(b.sources.map((s) => hostOf(s.url))).size < Math.min(3, b.sources.length)) b.problems.push("sources aren't independent (fewer than 3 different sites)");
  for (const s of b.sources) if (!/^https?:\/\//.test(s.url || "")) b.problems.push(`source ${s.id} has no URL`);
  const ids = new Set(b.sources.map((s) => s.id));
  for (const f of b.facts) { const refs = (f[1] || "").split(/[ ,]+/).filter(Boolean); if (refs.some((r) => !ids.has(r))) b.problems.push(`fact cites an unknown source: ${f[0].slice(0, 40)}`); }
  if (!b.facts.length && !b.defs.length) b.problems.push("no facts or definitions");
  return b;
}
const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };

/** review verdicts: "REV <id> OK" or "REV <id> FAIL <code> L<n> note; …" */
export function parseVerdicts(text) {
  const out = [];
  for (const raw of String(text || "").split("\n")) {
    const m = raw.trim().match(/^REV (\S+) (OK|FAIL)\s*(.*)$/); if (!m) continue;
    const issues = m[2] === "OK" ? [] : m[3].split(";").map((x) => x.trim()).filter(Boolean).map((x) => {
      const p = x.match(/^([A-Z]+)\s+(L\d+|-)?\s*(.*)$/) || [];
      return { code: REVIEW_CODES.includes(p[1]) ? p[1] : "CLR", line: p[2] && p[2] !== "-" ? Number(p[2].slice(1)) : null, note: (p[3] || x).trim() };
    });
    out.push({ lesson: m[1], ok: m[2] === "OK", issues: m[2] === "FAIL" && !issues.length ? [{ code: "CLR", line: null, note: "failed without a reason" }] : issues });
  }
  return out;
}

/** a fix list (engine → Writer) from gate failures or review issues: { code, line, note } */
export function fixList(lessonId, issues) {
  const words = (s) => String(s).split(/\s+/).slice(0, 14).join(" ");
  return [`FIX ${lessonId}`, ...issues.map((i) => `${i.line ? `L${i.line}` : "L-"} ${i.code}: ${words(i.note)}`), "END"].join("\n");
}

/** repairs (Writer → engine): changed lines only */
export function parseRepairs(text) {
  const out = new Map(); let cur = null;
  for (const raw of String(text || "").split("\n")) {
    const l = raw.replace(/\s+$/, "");
    const h = l.match(/^REPAIR (\S+)/); if (h) { cur = []; out.set(h[1], cur); continue; }
    if (!cur) continue;
    if (l.trim() === "END") { cur = null; continue; }
    let m;
    if ((m = l.match(/^L(\d+)> ?(.*)$/))) cur.push({ op: "set", line: +m[1], text: m[2] });
    else if ((m = l.match(/^\+L(\d+)> ?(.*)$/))) cur.push({ op: "add", line: +m[1], text: m[2] });
    else if ((m = l.match(/^-L(\d+)\s*$/))) cur.push({ op: "del", line: +m[1] });
  }
  return out;
}
/** apply repairs to one lesson's text. Line numbers refer to the lesson as sent (L1 = its "## Title" line). */
export function applyRepair(lessonText, ops) {
  const lines = lessonText.replace(/\n+$/, "").split("\n").map((t) => [t]);
  for (const o of ops) {
    const i = o.line - 1; if (i < 0 || i >= lines.length) throw new Error(`repair line L${o.line} is outside the lesson (${lines.length} lines)`);
    if (o.op === "set") lines[i][0] = o.text;
    else if (o.op === "del") lines[i][0] = null;
    else lines[i].push(o.text);
  }
  return lines.flat().filter((t) => t !== null).join("\n");
}

/** a unit file (Writer output) split into lessons; text before the first "## " and after END is dropped */
export function splitUnit(text) {
  const body = String(text || "").replace(/\r/g, "").split(/^END\s*$/m)[0];
  return body.split(/^(?=## )/m).filter((x) => x.startsWith("## ")).map((x) => ({ title: x.slice(3, x.indexOf("\n") < 0 ? undefined : x.indexOf("\n")).trim(), text: x.replace(/\n+$/, "") }));
}
/** a lesson with line numbers, for the reviewer */
export const numbered = (text) => text.split("\n").map((l, i) => `L${i + 1} ${l}`).join("\n");
