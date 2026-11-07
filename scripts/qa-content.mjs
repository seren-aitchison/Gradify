// Subject-independent content checks on raw notes files, used by scripts/qa-courses.mjs for every course.
// Each check is deterministic: it reports only what can be established mechanically. None of them can tell
// whether mathematics, law or clinical content is right; that still needs expert review.
//
//   escaping(src)        backslashes JavaScript would swallow (\ b → " b", \frac → form feed + "rac")
//   notation(line)       ^{ or _{ opened and not closed on the same line (renders as raw braces)
//   separatorInBrackets  a " | " inside brackets, such as P(A | B), which splits the line's fields in the wrong place
//   numLine(line)        a NUM question whose answer or tolerance isn't a plain number (the parser drops it)
//   arithmetic(text)     pure-number equations such as "3 × 4 = 12" whose two sides disagree
//   numAnswerExplained   a NUM answer that appears nowhere in its own explanation (review, not proof)
//   sourceUrl(src)       a source link that isn't https

// ---------- escaping ----------
// In a template literal, "\x" for most x evaluates to x alone, so a single backslash vanishes from the page.
// \\ (a real backslash), \` and \$ are the intended escapes; \n, \t and \u are allowed too.
export function escaping(src) {
  const start = src.indexOf("export default `"); if (start < 0) return [];
  const out = [];
  for (let i = start + 16, line = src.slice(0, start).split("\n").length; i < src.length; i++) {
    const c = src[i];
    if (c === "\n") line++;
    if (c === "`") break;
    if (c !== "\\") continue;
    const n = src[i + 1];
    if (!"\\`$ntu\n".includes(n)) out.push({ line, text: src.slice(Math.max(0, i - 15), i + 15).replace(/\n/g, " ") });
    i++;
  }
  return out;
}

// ---------- notation ----------
export function notation(line) {
  const open = /[\^_]\{/g; let m, bad = false;
  while ((m = open.exec(line))) { let depth = 0, j = m.index + 1; for (; j < line.length; j++) { if (line[j] === "{") depth++; else if (line[j] === "}" && --depth === 0) break; } if (j >= line.length) bad = true; }
  return bad;
}

// ---------- field separators ----------
// Tagged lines split their fields on " | ". A " | " inside brackets, such as P(A | B), is a conditional bar that
// truncates the line; write it as " ∣ " (U+2223) instead.
export function separatorInBrackets(line) {
  if (!/^[A-Z][A-Z0-9]*(#[\w-]+)?(@[\d,]+)?: /.test(line)) return false;
  for (let i = 0, d = 0; i < line.length; i++) {
    if ("([".includes(line[i])) d++; else if (")]".includes(line[i])) d = Math.max(0, d - 1);
    else if (d > 0 && line.startsWith(" | ", i)) return true;
  }
  return false;
}

// ---------- numerical questions ----------
export function numLine(line) {
  const m = line.match(/^NUM[123]?(?:#[a-z0-9-]+)?(?:@[\d,]+)?:\s*(.*)$/); if (!m) return null;
  const [q, ans = "", tol = "0", , why = ""] = m[1].split(" | ").map((x) => x.trim());
  const problems = [];
  if (!Number.isFinite(Number(ans)) || ans === "") problems.push(`answer "${ans}" isn't a plain number, so the question is dropped`);
  const t = tol.endsWith("%") ? tol.slice(0, -1) : tol;
  if (!Number.isFinite(Number(t)) || Number(t) < 0) problems.push(`tolerance "${tol}" isn't a non-negative number`);
  return { q, ans: Number(ans), tol: tol.endsWith("%") ? { rel: Number(t) / 100 } : { abs: Number(t) || 0 }, why, problems };
}

// numbers written in prose: "1,077", "−4", "3.2"; a minus sign or hyphen counts only when it starts the number
const NUM_RE = /(?<![\w.])[−-]?\d[\d,]*(?:\.\d+)?/g;
const toNum = (s) => Number(s.replace(/−/g, "-").replace(/,/g, ""));
export function numAnswerExplained(n) {
  if (!n || !Number.isFinite(n.ans) || !n.why) return true;
  const within = (x) => Math.abs(x - n.ans) <= Math.max(n.tol.abs ?? 0, (n.tol.rel ?? 0) * Math.abs(n.ans), 1e-9 + 5e-4 * Math.abs(n.ans));
  const words = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, half: 0.5, third: 1 / 3, quarter: 0.25 };
  const nums = (n.why.match(NUM_RE) || []).map(toNum);
  for (const w of n.why.toLowerCase().match(/\b[a-z]+\b/g) || []) if (w in words) nums.push(words[w]);
  for (const [, a, b] of n.why.matchAll(/(?<![\w.])(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)(?!\d|\.\d)/g)) nums.push(Number(a) / Number(b));
  const vulgar = { "½": 0.5, "⅓": 1 / 3, "⅔": 2 / 3, "¼": 0.25, "¾": 0.75 }; for (const ch of n.why) if (ch in vulgar) nums.push(vulgar[ch]);
  for (const [, a, e] of n.why.matchAll(/(\d+(?:\.\d+)?) × 10\^\{([−-]?\d+)\}/g)) nums.push(Number(a) * 10 ** toNum(e));
  // also accept the answer written as a power of ten, a percentage of it, or with its sign dropped
  return nums.some((x) => within(x) || within(-x) || within(x / 100) || within(x * 100));
}

// ---------- arithmetic ----------
// Finds "<expression> = <number>" where the expression is made only of numbers, + − × ÷ / ^{…} and brackets,
// evaluates it, and compares with the number shown to the precision shown. Chains (a = b = c) are checked link by
// link. Anything with a letter, a function or "≈" is skipped: only pure arithmetic is judged.
const OPS = /^[\d\s.,+−\-×÷/()^{}*]+$/;
function evaluate(expr) {
  let e = expr.replace(/,(?=\d{3}\b)/g, "").replace(/−/g, "-").replace(/×/g, "*").replace(/÷/g, "/").replace(/\^\{([^{}]+)\}/g, "**($1)").replace(/\^(\d+)/g, "**$1");
  if (/[^\d\s.+\-*/()]/.test(e) || !/[+\-*/]/.test(e.replace(/^\s*-/, ""))) return null;
  if (/\d\s+\d/.test(e)) return null;                       // "2 3" is prose, not arithmetic
  try { const v = Function(`"use strict"; return (${e});`)(); return Number.isFinite(v) ? v : null; } catch { return null; }
}
// Lines that state a wrong sum on purpose ("A pupil writes 52 − 37 = 25") or use modular arithmetic are skipped.
const SKIP_LINE = /\b(mod|GF\(|writes|wrote|claims|error|mistake|wrong|incorrect)\b|≡|ℤ/i;
// Only statements presented as true are checked: misconception lines (!:) and the distractors of a multiple-choice
// question (every field but the stem, the first option and the explanation) are left out.
export function assertedText(line) {
  if (/^!:/.test(line)) return "";
  const m = line.match(/^(M[123]?|MS|ORD)(#[\w-]+)?(@[\d,]+)?:\s*(.*)$/); if (!m) return line;
  const f = m[4].split(" | "); return f.length < 3 ? line : [f[0], f[1], f[f.length - 1]].join(" | ");
}
export function arithmetic(text) {
  const bad = [];
  for (const raw of String(text).split("\n").map(assertedText)) {
    if (SKIP_LINE.test(raw)) continue;
    const parts = raw.split(/(?<![<>≤≥!≠])=(?!=)/);
    for (let i = 0; i + 1 < parts.length; i++) {
      // left: the pure-arithmetic tail of this part; right: the whole number that starts the next part
      const lm = parts[i].match(/[\d\s.,+−\-×÷/()^{}*]+$/); if (!lm) continue;
      const left = lm[0].trim(), before = parts[i].slice(0, lm.index + lm[0].indexOf(left[0] ?? ""));
      const rm = parts[i + 1].match(/^\s*(?=([−-]?\d[\d,]*(?:\.\d+)?))\1(\s*%)?/);
      if (!left || !rm || !OPS.test(left)) continue;
      const next = parts[i + 1].slice(rm[0].length);
      if (/^…/.test(next)) continue;                                                       // "= 29.761…" is truncated on purpose
      if (/^\s*(?:[×÷/^*±]|[+−-]\s*[\d(]|\d|[a-zA-Zα-ωπ√(½¼¾⅓⅔])/.test(next) && !rm[2]) continue;    // "= 2,500 − 4", "= 2x", "= 1¾"
      if (/^[+−\-×÷/*]/.test(left)) continue;                                              // "+ 1 = 0": end of an algebraic expression
      if (/\S$/.test(before) && !/[:;"“(]$/.test(before)) continue;                        // "f(2) = 8", "x2 = 4", "log₂(2)"
      if (/[≈~±×÷+−\-/*^]\s*$/.test(before) || /^[\s(]*[\d.,]+\s*\)?$/.test(left)) continue;
      if (/÷/.test(left) && /\//.test(left)) continue;                                     // "150 ÷ 5/3" is ambiguous in prose
      if (/10\^\{/.test(left) && /[/÷]/.test(left)) continue;                              // "a × 10^{8}/b × 10^{9}" groups by convention
      const v = evaluate(left); if (v == null) continue;
      const shown = rm[1], dec = (shown.split(".")[1] || "").length;
      const target = toNum(shown) / (rm[2] ? 100 : 1), unit = rm[2] ? 100 : 1;
      // the shown value is taken as rounded to its last digit; an integer's trailing zeros may be rounding too ("= 1,800")
      const step = dec ? 10 ** -dec : 10 ** ((shown.replace(/[−,-]/g, "").match(/0+$/) || [""])[0].length);
      const tol = Math.max(0.5 * step / unit, 1e-9 * Math.abs(target)) + 1e-12;
      const off = (t, d) => Math.abs(v - t) > d;
      if (off(target, tol) && (!rm[2] || off(toNum(shown), 0.5 * step + 1e-12))) bad.push({ expr: `${left} = ${shown}${rm[2] ? "%" : ""}`, value: Number(v.toPrecision(8)) });
    }
  }
  return bad;
}

// ---------- sources ----------
export function sourceUrl(src) { return !src.url || /^https:\/\/[^\s/]+\.[^\s]+/.test(src.url); }
