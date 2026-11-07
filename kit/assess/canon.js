// The canonical notes for a lesson, as the AI tutor's server reads them. The browser sends only a lesson id (and its
// title, for courses without an ids.js); the course-tutor function fetches that course's own notes file and ids from
// the published site and grounds the tutor in them, so what the tutor is given can't be swapped by the browser.
// Dependency-free, shared by the browser tests and the server: `npm run sync` copies it to
// supabase/functions/_shared/canon.js (a test checks the copy matches).
//
// Notes files are ES modules whose default export is one template literal (kit/course/notes.js describes the
// format). They're read as text, never run: the literal is cut out and its escapes are decoded.

const SLUG = /^[a-z]{2,24}$/;
const LESSON_ID = /^(u\d{2})-[a-z0-9-]{1,40}$/i;
const norm = (s) => String(s ?? "").toLowerCase().replace(/[*`]/g, "").replace(/\s+/g, " ").trim();

// the body of `export default \`…\``, with template-literal escapes decoded
export function notesSource(file) {
  const start = file.indexOf("export default `");
  if (start < 0) return null;
  let out = "", i = start + "export default `".length;
  for (; i < file.length; i++) {
    const c = file[i];
    if (c === "`") return out;
    if (c === "$" && file[i + 1] === "{") return null;      // a substitution: not a plain notes file
    if (c !== "\\") { out += c; continue; }
    const n = file[++i];
    if (n === "n") out += "\n";
    else if (n === "t") out += "\t";
    else if (n === "r") out += "\r";
    else if (n === "u") {
      const m = file.slice(i + 1).match(/^\{([0-9a-f]+)\}|^([0-9a-f]{4})/i);
      if (!m) return null;
      out += String.fromCodePoint(parseInt(m[1] || m[2], 16)); i += m[0].length;
    } else if (n === "\n") { /* line continuation */ }
    else out += n;                                          // \\ \` \$ and any other character stand for themselves
  }
  return null;
}

// a lesson's title from a course's ids.js ("u19-10": "Bisection Method"), read as text
export function titleFromIds(file, id) {
  const m = file.match(new RegExp(`"${id.replace(/[-]/g, "\\-")}"\\s*:\\s*("(?:[^"\\\\]|\\\\.)*")`));
  if (!m) return null;
  try { return JSON.parse(m[1]); } catch { return null; }
}

// the lines of one lesson ("## Title" up to the next "## "), or null
export function lessonSection(src, title) {
  const want = norm(title), lines = src.split("\n");
  const at = lines.findIndex((l) => l.startsWith("## ") && norm(l.slice(3)) === want);
  if (at < 0) return null;
  const end = lines.findIndex((l, i) => i > at && l.startsWith("## "));
  return { title: lines[at].slice(3).trim(), lines: lines.slice(at + 1, end < 0 ? undefined : end) };
}

// What the tutor is given: the teaching, not the questions. Check questions, flashcards, interactives, sources and
// reading lists are left out, as they are from the text the lesson page sent before (kit/course/notes.js lessonText).
const KEEP = { S: "", H: "", P: "", E: "", X: "Example: ", K: "Key idea: ", "!": "Mistake to avoid: ", O: "Objective: ", T: "Term: ", SUM: "Summary: ", SAFE: "Note: ", EV: "Evidence: ", CASE: "Case: ", LAW: "Statute: ", DRUG: "Drug: " };
const DROP = /^(Q|M\d?|TF\d?|MS\d?|SEQ\d?|MATCH\d?|SA\d?|NUM\d?|IX|SRC|READ|PRE|LV)(#[^:]*)?:/;
export function teachingText({ title, lines }, max = 30000) {
  const out = [title, ""];
  for (const raw of lines) {
    const l = raw.trimEnd(); if (!l.trim()) continue;
    if (DROP.test(l)) continue;
    const m = l.match(/^([A-Z]+|!):\s?(.*)$/);
    if (m && m[1] in KEEP) { const x = m[2]; out.push(m[1] === "H" ? `\n${x.toUpperCase()}` : `${KEEP[m[1]]}${x}`); continue; }
    if (m) continue;                                        // another tag: not teaching text
    if (l.startsWith("> ")) out.push(`  ${l.slice(2)}`);
    else out.push(l);                                       // bullets and plain paragraphs
  }
  const s = out.join("\n").replace(/\*\*|`|\^\{|_\{|\}/g, "");
  return s.length > max ? s.slice(0, max) : s;
}

/**
 * The canonical { title, text } for a lesson, from the published site.
 * @param {{ subject: string, lesson: { id: string, title?: string } }} body
 * @param {(path: string) => Promise<string|null>} fetchText  fetches a path under the site (null if missing)
 */
export async function canonicalLesson(body, fetchText) {
  const subject = String(body?.subject ?? ""), id = String(body?.lesson?.id ?? "");
  const bad = (msg) => Object.assign(new Error(msg), { status: 400 });
  if (!SLUG.test(subject)) throw bad("Unknown course.");
  const m = id.match(LESSON_ID); if (!m) throw bad("Missing lesson.");
  const ids = await fetchText(`kit/courses/${subject}/ids.js`);
  // courses with permanent ids say which title the id has; the rest (physics) send the title, checked below
  const title = ids != null ? titleFromIds(ids, id) : String(body.lesson.title ?? "").slice(0, 200);
  if (!title) throw bad("That lesson isn't in this course.");
  const file = await fetchText(`kit/courses/${subject}/notes/${m[1].toLowerCase()}.js`);
  const src = file && notesSource(file);
  const sec = src && lessonSection(src, title);
  if (!sec) throw bad("That lesson's notes aren't published yet.");
  return { id, title: sec.title, text: teachingText(sec) };
}
