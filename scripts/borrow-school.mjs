// Reuse a written school from one course in another: the fastest way to give a new course real, checked content.
//   node scripts/borrow-school.mjs <target-slug> <target-school-n> <source-slug> <source-school-n> [--title "School title"]
// Replaces the target's (unwritten) school n with the source school's modules and lessons, copies the source notes
// (question ids removed so the target gets its own permanent ids; IX: lines removed, since the labs belong to the
// source course), retires the target school's old lesson ids (reserved forever, never reused), records the school
// as written in course.js and qa.js (standard 2, review pending), then locks ids. Refuses to replace a written school.
import { readFile, writeFile, access } from "node:fs/promises";
import { execFileSync } from "node:child_process";

const [target, tn, source, sn] = process.argv.slice(2);
const titleArg = process.argv.includes("--title") ? process.argv[process.argv.indexOf("--title") + 1] : null;
if (!target || !tn || !source || !sn) { console.log("usage: borrow-school.mjs <target> <n> <source> <n> [--title …]"); process.exit(1); }
const root = new URL("../", import.meta.url), rd = (p) => readFile(new URL(p, root), "utf8"), wr = (p, s) => writeFile(new URL(p, root), s);
const pad = (n) => `u${String(n).padStart(2, "0")}`, tid = pad(tn), sid = pad(sn), today = new Date().toISOString().slice(0, 10);
const T = `kit/courses/${target}/`, S = `kit/courses/${source}/`;

const tc = (await import(new URL(`${T}course.js`, root))).default, sc = (await import(new URL(`${S}course.js`, root))).default;
if (tc.written.includes(tid)) throw new Error(`${target} ${tid} is already written`);
if (!sc.written.includes(sid)) throw new Error(`${source} ${sid} isn't written`);
await access(new URL(`${S}notes/${sid}.js`, root));
// only sources written to the full lesson standard (levels, evidence status, objective-linked questions) can be reused
{ const { parseNotes } = await import(new URL("kit/course/notes.js", root)); const L = parseNotes(await sc.notes(sid));
  if (!L.every((x) => x.level && x.evidence.length && x.tasks.some((q) => q.type === "short"))) throw new Error(`${source} ${sid} isn't written to the full lesson standard (LV:, EV:, SA:), so it can't be reused`); }
const sUnit = sc.units.find((u) => u.id === sid), tUnit = tc.units.find((u) => u.id === tid);
const title = titleArg || sUnit.title;
// a lesson title used elsewhere in the target course would make two lessons look the same (and confuse lab links)
const others = new Set(tc.units.filter((u) => u.id !== tid).flatMap((u) => u.lessons.map((l) => l.title.toLowerCase())));
const clash = sUnit.lessons.filter((l) => others.has(l.title.toLowerCase())).map((l) => l.title);
if (clash.length) throw new Error(`${target} already has lessons titled ${clash.join(", ")}: rename them or choose another school`);

// 1. syllabus: replace the target school's block with the source school's modules and lessons
const block = (text, n) => { const m = text.match(new RegExp(`(^|\\n)(${n}\\. [^\\n]*\\n[\\s\\S]*?)(?=\\n\\d+\\. |\\n\`)`)); if (!m) throw new Error(`school ${n} not found`); return m[2]; };
const sSyl = await rd(`${S}syllabus.js`); let tSyl = await rd(`${T}syllabus.js`);
const body = block(sSyl, sn).split("\n").slice(1).join("\n");
tSyl = tSyl.replace(block(tSyl, tn), `${tn}. ${title}\n${body}`);
// the school's one-line summary
const sBlurb = sc.blurbs?.[sn];
if (sBlurb) tSyl = tSyl.replace(new RegExp(`(\\n\\s*${tn}: )"[^"\\n]*"`), `$1${JSON.stringify(sBlurb)}`);
await wr(`${T}syllabus.js`, tSyl);

// 2. retire the target school's old lesson ids (never written, but reserved forever)
const ids = await import(new URL(`${T}ids.js?t=${Date.now()}`, root));
const IDS = { ...ids.IDS }, RETIRED = { ...ids.RETIRED };
for (const l of tUnit.lessons) if (IDS[l.id]) { RETIRED[l.id] = { title: IDS[l.id], retired: today, reason: `school ${tn} replaced by ${source} school ${sn} before it was written` }; delete IDS[l.id]; }
const idsSrc = await rd(`${T}ids.js`), head = idsSrc.split("\n").filter((l) => l.startsWith("//")).join("\n");
await wr(`${T}ids.js`, `${head}\nexport const IDS = {\n${Object.entries(IDS).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join("\n")}\n};\nexport const RETIRED = ${JSON.stringify(RETIRED, null, 2)};\n`);

// 3. notes: the source school's lessons, without the source's question ids or lab placements
let notes = await rd(`${S}notes/${sid}.js`);
notes = notes.replace(/^(\s*(?:M|TF|MS|SEQ|MATCH|SA|NUM|ORD)[123]?)#[a-z0-9-]+/gm, "$1").replace(/^IX:.*\n/gm, "");
notes = `// ${tc.site} ${tc.name}, School ${tn}: ${title}. Reused from ${sc.site} ${sc.name} School ${sn} (kit/courses/${source}/notes/${sid}.js)\n// by scripts/borrow-school.mjs on ${today}; question ids are this course's own. Review state as qa.js records.\n${notes}`;
await wr(`${T}notes/${tid}.js`, notes);

// 4. written list, QA record and written date
let course = await rd(`${T}course.js`);
const written = [...new Set([...tc.written, tid])].sort();
course = course.replace(/written: \[[^\]]*\]/, `written: ${JSON.stringify(written).replace(/,/g, ", ")}`);
await wr(`${T}course.js`, course);
let qa = await rd(`${T}qa.js`);
qa = qa.replace(/export const QA = \{([\s\S]*?)\n\};/, (all, inner) => `export const QA = {${inner.replace(/\s*$/, "")}\n  ${tid}: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from ${source} ${sid}\n};`)
  .replace(/export const WRITTEN_ON = \{/, `export const WRITTEN_ON = { ${tid}: "${today}",`);
await wr(`${T}qa.js`, qa);

// 5. permanent ids for the new lessons and questions
execFileSync("node", ["scripts/new-course.mjs", "lock", target], { cwd: new URL(".", root), stdio: "inherit" });
console.log(`${target} school ${tn} is now "${title}" (${sUnit.lessons.length} lessons from ${source} ${sid}).`);
