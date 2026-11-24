// Module handbook → tracker modules. Deterministic: plain rules for the things handbooks write in a few standard ways
// (module codes, "20 credits", "Level 6", "Exam 60%", "Due 14 January 2027"), so it's instant, private (nothing
// leaves the browser) and every result can be traced to the line it came from. It finds candidates; the student
// always confirms or edits them on a review screen before anything reaches the tracker.
//
//   parseHandbook(text, { today }) → { modules, notes }
//     modules  [{ code, name, credits, year, due, assessments: [{ name, weight, due }], from, sure }]
//              year: "2" | "3" | "" (not found); due: the next deadline found, "YYYY-MM-DD" or ""; from: the line the
//              module was found on; sure: false when something important was guessed or missing (shown on review)
//     notes    plain-English remarks for the review screen (e.g. "Credits were in ECTS and have been doubled")
// Tests: tests/handbook.test.mjs.

const CODE = /\b([A-Z]{2,6})[ -]?(\d{3,5}[A-Z]?)\b/;
const CREDITS = /(?:\b(\d{1,3}(?:\.5)?)\s*(?:UK\s*)?(credits?|credit points|cats(?: points)?|ects)\b)|(?:\b(?:credits?|credit value|cats|ects)\s*[:=-]?\s*(\d{1,3}(?:\.5)?)\b)/i;
const LEVEL = /\b(?:fheq\s*)?level\s*([3-7])\b/i;
const YEAR = /\b(?:year|stage|part)\s*([1-4]|one|two|three|four|I{1,3}V?)\b|\b(final|first|second|third)[ -]year\b/i;
const PCT = /(\d{1,3}(?:\.\d+)?)\s*%/;
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const WORDS = { one: 1, two: 2, three: 3, four: 4, i: 1, ii: 2, iii: 3, iv: 4, first: 1, second: 2, third: 3, final: 3 };
const ASSESS = /\b(exam(?:ination)?|coursework|essay|report|project|dissertation|presentation|tests?|quiz(?:zes)?|portfolio|practicals?|lab(?:oratory)? (?:report|work)|assignments?|poster|viva|reflective (?:log|journal)|literature review|problem sheets?|worksheets?|mcq|case stud(?:y|ies)|seminar|participation|critique|write-up)\b/i;
// words that start a line but aren't a module's name
const NOT_NAME = /^(module|unit|code|title|credits?|level|year|semester|term|assessment|weighting|due|deadline|submission|convenor|leader|tutor|contact|aims?|learning outcomes?|description|overview|page)\b/i;

const pad = (n) => String(n).padStart(2, "0");
const iso = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;
const validDate = (y, m, d) => { const t = new Date(Date.UTC(y, m - 1, d)); return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d; };

/** every date in a line, as "YYYY-MM-DD"; a date with no year takes the next one on or after `today` */
export function datesIn(line, today = new Date()) {
  const out = [], t0 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const add = (y, m, d) => {
    if (!y) { y = today.getFullYear(); if (Date.UTC(y, m - 1, d) < t0 - 864e5 * 60) y += 1; }
    if (y < 100) y += 2000;
    if (validDate(y, m, d)) out.push(iso(y, m, d));
  };
  for (const m of line.matchAll(/\b(\d{4})-(\d{2})-(\d{2})\b/g)) add(+m[1], +m[2], +m[3]);
  for (const m of line.matchAll(/\b(\d{1,2})\/(\d{1,2})\/(\d{2,4})\b/g)) add(+m[3], +m[2], +m[1]);   // UK order: day/month/year
  for (const m of line.matchAll(/\b(\d{1,2})(?:st|nd|rd|th)?\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?,?\s*(\d{4})?\b/gi)) add(m[3] ? +m[3] : 0, MONTHS.indexOf(m[2].slice(0, 3).toLowerCase()) + 1, +m[1]);
  for (const m of line.matchAll(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s*(\d{4})?\b/gi)) add(m[3] ? +m[3] : 0, MONTHS.indexOf(m[1].slice(0, 3).toLowerCase()) + 1, +m[2]);
  return [...new Set(out)];
}

/** the year of study a line names: FHEQ level 5 → year 2, level 6 → final year; "Year 3", "final year" */
export function yearIn(line) {
  const l = LEVEL.exec(line); if (l) return { 4: "1", 5: "2", 6: "3", 7: "3" }[l[1]] || "";
  const y = YEAR.exec(line); if (!y) return "";
  const n = y[1] ? (WORDS[y[1].toLowerCase()] ?? Number(y[1])) : WORDS[y[2].toLowerCase()];
  return n === 2 ? "2" : n >= 3 ? "3" : n === 1 ? "1" : "";
}

/** UK credits in a line (ECTS doubled), or null */
export function creditsIn(line) {
  const m = CREDITS.exec(line); if (!m) return null;
  const n = Number(m[1] ?? m[3]), ects = /ects/i.test(m[2] || m[0]);
  if (!(n > 0 && n <= 200)) return null;
  return { credits: ects ? n * 2 : n, ects };
}

const clean = (s) => s.replace(/\s{2,}/g, " ").replace(/^[\s:–—-]+|[\s:–—-]+$/g, "").trim();
/** a module's name from its line: what's left once the code, credits, level and dates are taken out */
function nameFrom(line, code) {
  let s = line;
  if (code) s = s.replace(code.raw, " ");
  s = s.replace(CREDITS, " ").replace(LEVEL, " ").replace(/\b(?:semester|term)\s*\d\b/gi, " ").replace(/\b(?:year|stage)\s*\d\b/gi, " ").replace(/\(\s*\)/g, " ");
  s = s.split(/\s{2,}|\s[|•·]\s|\t/).map(clean).filter((x) => x && /[a-z]/i.test(x) && !/^\d+$/.test(x)).sort((a, b) => b.length - a.length)[0] || "";
  s = clean(s.replace(/^(module|unit)\s*(title|name)?\s*[:-]?\s*/i, ""));
  return s.length >= 3 && s.length <= 80 && !NOT_NAME.test(s) && !/%|\bassessment\b/i.test(s) && !/\.{4,}/.test(s) ? s : "";
}

export function parseHandbook(text, { today = new Date() } = {}) {
  const lines = String(text || "").split(/\r?\n/).map((l) => l.replace(/\s+$/, "")).filter((l, i, a) => l.trim() || (a[i - 1] || "").trim());
  const notes = [];
  // a module starts on a line with a module code, or on a "Module title: …" line
  const starts = [];
  lines.forEach((l, i) => {
    const c = CODE.exec(l);
    if (c && !/^(page|tel|room)\b/i.test(l.trim()) && !/\d{4}\s*[-/]\s*\d{2,4}/.test(c[0])) starts.push({ i, code: { raw: c[0], text: `${c[1]}${c[2]}` } });
    else if (/^\s*(module|unit)\s*(title|name)\s*[:-]/i.test(l)) starts.push({ i, code: null });
  });
  // the same code can appear more than once (a contents page, a table of modules, then an assessment line): its
  // blocks are merged, the name taken from the first line that gives one
  const blocks = starts.map((s, k) => ({ ...s, lines: lines.slice(s.i, starts[k + 1]?.i ?? Math.min(lines.length, s.i + 60)) }));
  // the section a block sits in: the nearest short heading above it that names a year ("Year 2 modules", "Level 6")
  const heading = (i) => { for (let j = i - 1; j >= 0; j--) { const l = lines[j].trim(); if (l.length <= 40 && !CODE.test(l) && yearIn(l)) return yearIn(l); } return ""; };
  const groups = new Map();
  for (const b of blocks) {
    const name = nameFrom(b.lines[0], b.code) || (b.lines[1] && !CODE.test(b.lines[1]) && !/%/.test(b.lines[0]) ? nameFrom(b.lines[1], null) : "");
    const key = b.code?.text || name.toLowerCase();
    if (!key) continue;
    if (!groups.has(key)) groups.set(key, { i: b.i, code: b.code, name: "", parts: [] });
    const g = groups.get(key); if (!g.name && name) g.name = name;
    g.parts.push(b);
  }
  let ects = false;
  const t0 = iso(today.getFullYear(), today.getMonth() + 1, today.getDate());
  // several on one line ("Problem sheets 20%; Exam 80%") are split at semicolons, and at commas when each part has its own %
  const parts = (l) => l.split(";").flatMap((x) => ((x.match(/%/g) || []).length > 1 ? x.split(/,|\band\b/) : [x]));
  const modules = [...groups.values()].sort((a, b) => a.i - b.i).map((g) => {
    const all = g.parts.flatMap((b) => b.lines);
    const cr = g.parts.map((b) => creditsIn(b.lines[0])).find(Boolean) || all.map(creditsIn).find(Boolean) || null; if (cr?.ects) ects = true;
    // the year: on the module's own line, else the section heading above it, else further down its block
    let year = g.parts.map((b) => yearIn(b.lines[0])).find(Boolean) || g.parts.map((b) => heading(b.i)).find(Boolean) || g.parts.map((b) => b.lines.slice(1, 8).map(yearIn).find(Boolean)).find(Boolean) || "";
    let guessed = false;
    if (!year && g.code) { const d = /\d/.exec(g.code.text.replace(/^[A-Z]+/, ""))?.[0]; if (d === "2" || d === "5") { year = "2"; guessed = true; } else if (d === "3" || d === "6") { year = "3"; guessed = true; } }
    // assessments: a kind of assessment and a percentage, with any date beside it
    const assessments = [];
    for (const seg of all.flatMap(parts)) {
      const a = ASSESS.exec(seg), p = PCT.exec(seg);
      const key = `${(a?.[1] || "").toLowerCase()}|${p?.[1]}`;
      if (a && p && Number(p[1]) > 0 && Number(p[1]) <= 100 && !assessments.some((x) => x.key === key)) assessments.push({ key, name: clean(seg.slice(0, p.index).replace(g.code?.raw || "\u0000", " ").replace(/^\s*(assessments?|assessed by|weighting)\s*[:-]\s*/i, "").replace(/^[^:]*assessment\s*:\s*/i, "").replace(/[(:–—-]+\s*$/, "")).slice(0, 60) || a[1], weight: Number(p[1]), due: datesIn(seg, today)[0] || "" });
    }
    const dates = [...assessments.map((a) => a.due), ...all.filter((l) => /\b(due|deadline|submi|exam|hand[- ]in|date)\b/i.test(l)).flatMap((l) => datesIn(l, today))].filter(Boolean).sort();
    const due = dates.find((d) => d >= t0) || "";
    assessments.forEach((x) => delete x.key);   // the same assessment listed twice (a table, then the module's page) counts once
    const sum = assessments.reduce((x, a) => x + a.weight, 0);
    const sure = Boolean(g.name && cr && year && !guessed && (!assessments.length || Math.abs(sum - 100) < 0.5));
    return { code: g.code?.text || "", name: g.name || g.code?.text || "", credits: cr ? cr.credits : null, year, yearGuessed: guessed, due, assessments, from: g.parts[0].lines[0].trim().slice(0, 120), sure };
  }).filter((m) => m.name && (m.credits || m.assessments.length || m.year));
  if (ects) notes.push("Some credits were in ECTS, so they've been doubled to UK credits (1 ECTS = 2 UK credits).");
  if (modules.some((m) => m.yearGuessed)) notes.push("Where the handbook didn't say which year a module is in, the year was guessed from its code. Check those.");
  if (modules.some((m) => m.year === "1")) notes.push("First-year modules were found. Most UK degrees don't count year 1, so they're unticked.");
  if (!modules.length) notes.push("No modules were found. Handbooks that list modules with a code (like CHEM2001) and their credits work best; scanned pages have no text to read.");
  return { modules, notes };
}

/** a reviewed module as a tracker row (the mark is left blank: it's still to come) */
export const toRow = (m) => ({ name: m.name, mark: "", credits: m.credits ? String(m.credits) : "", year: m.year === "3" ? "3" : "2", due: m.due || "" });
