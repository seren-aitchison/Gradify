// Parse a course syllabus written as text into units (schools), modules and lessons.
//   7. Land Law            a unit (school), numbered
//   > Registration         a module: the lessons after it, until the next module, belong to it
//   * Registered land      a lesson (a topic taught as one lesson)
// Lesson ids are permanent identifiers, separate from a lesson's position. Progress, saved notes,
// flashcards, bookmarks and assessment attempts are keyed by them, so a course passes its id lock
// (ids.js IDS: { "u07-08": "Registered land", … }) and every lesson keeps the id recorded there,
// wherever it moves. Retired ids (ids.js RETIRED) are reserved forever: a new lesson never receives
// one, even if it has the same title. A lesson not yet locked gets the next number never used in its
// unit; `npm run qa` then records it. Renaming: change the title in the syllabus and the lock (the id
// stays). Removing: move the id from IDS to RETIRED. tests/courses.test.mjs enforces all of this.
// Each lesson also carries its current `position` ({ school, module, order }), which may change.
// Module ids are "u07:registration": stable while the module's title is unchanged. Units without
// module lines get one unnamed module.
const key = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
export function parseSyllabus(text, lock = {}, retired = {}) {
  const lockedByTitle = new Map(Object.entries(lock).map(([id, title]) => [`${id.slice(0, 3)}|${key(title)}`, id]));
  return text.trim().split(/\n(?=\d+\. )/).map((block) => {
    const [head, ...rest] = block.split("\n");
    const n = Number(head.match(/^(\d+)\./)[1]), id = `u${String(n).padStart(2, "0")}`;
    const lessons = [], modules = [];
    const used = new Set([...Object.keys(lock), ...Object.keys(retired)].filter((x) => x.startsWith(`${id}-`)));
    let next = Math.max(0, ...[...used].map((x) => Number(x.slice(4)))) + 1;
    let mod = null;
    for (const raw of rest) {
      const line = raw.trim();
      if (line.startsWith("> ")) { const title = line.slice(2).trim(); mod = { id: `${id}:${key(title).replace(/ /g, "-")}`, title, lessons: [] }; modules.push(mod); continue; }
      if (!line.startsWith("* ")) continue;
      if (!mod) { mod = { id: `${id}:main`, title: "", lessons: [] }; modules.push(mod); }
      const title = line.slice(2).trim();
      const lid = lockedByTitle.get(`${id}|${key(title)}`) || `${id}-${String(next++).padStart(2, "0")}`;
      const l = { id: lid, title, module: mod.title, position: { school: n, module: mod.title, order: lessons.length + 1 } };
      lessons.push(l); mod.lessons.push(l.id);
    }
    return { n, id, title: head.replace(/^\d+\.\s*/, ""), modules, lessons };
  });
}
