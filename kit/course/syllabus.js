// Parse a course syllabus written as text into units (schools), modules and lessons.
//   7. Land Law            a unit (school), numbered
//   > Registration         a module: the lessons after it, until the next module, belong to it
//   * Registered land      a lesson (a topic taught as one lesson)
// Lesson ids are permanent. Progress, saved notes, flashcards and bookmarks are keyed by them, so a
// course passes its id lock (ids.js: { "u07-08": "Registered land", … }) and every lesson keeps the id
// recorded there, wherever it moves in the syllabus. A lesson not yet in the lock gets the next unused
// number in its unit; run `npm run qa` to add it to the lock. Renaming a lesson: change the title in
// both the syllabus and the lock (the id stays). tests/courses.test.mjs checks that no locked id is lost.
// Module ids are "u07:registration": stable while the module's title is unchanged. Units without
// module lines get one unnamed module.
const key = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
export function parseSyllabus(text, lock = {}) {
  const lockedByTitle = new Map(Object.entries(lock).map(([id, title]) => [`${id.slice(0, 3)}|${key(title)}`, id]));
  return text.trim().split(/\n(?=\d+\. )/).map((block) => {
    const [head, ...rest] = block.split("\n");
    const n = Number(head.match(/^(\d+)\./)[1]), id = `u${String(n).padStart(2, "0")}`;
    const lessons = [], modules = [];
    const used = new Set(Object.keys(lock).filter((x) => x.startsWith(`${id}-`)));
    let next = Math.max(0, ...[...used].map((x) => Number(x.slice(4)))) + 1;
    let mod = null;
    for (const raw of rest) {
      const line = raw.trim();
      if (line.startsWith("> ")) { const title = line.slice(2).trim(); mod = { id: `${id}:${key(title).replace(/ /g, "-")}`, title, lessons: [] }; modules.push(mod); continue; }
      if (!line.startsWith("* ")) continue;
      if (!mod) { mod = { id: `${id}:main`, title: "", lessons: [] }; modules.push(mod); }
      const title = line.slice(2).trim();
      const lid = lockedByTitle.get(`${id}|${key(title)}`) || `${id}-${String(next++).padStart(2, "0")}`;
      const l = { id: lid, title, module: mod.title };
      lessons.push(l); mod.lessons.push(l.id);
    }
    return { n, id, title: head.replace(/^\d+\.\s*/, ""), modules, lessons };
  });
}
