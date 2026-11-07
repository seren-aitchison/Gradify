// Builds each course's evidence maps (kit/courses/<course>/evidence.js): for every challenge an interactive offers,
// the lesson it is mastery evidence for. The challenges come from a run of scripts/check-interactives.cjs, which
// records what every interactive declares (--declared <file>):
//   node scripts/check-interactives.cjs --serve . --declared /tmp/declared.json
//   node scripts/evidence-maps.mjs /tmp/declared.json
// Each challenge goes to the linked lesson whose title shares the most words with it (ties and no overlap go to the
// interactive's first, main lesson). Entries already in evidence.js are kept, so a mapping corrected by hand stays;
// challenges an interactive maps in its own registry entry are left to it.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { pathToFileURL } from "node:url";

const STOP = new Set("a an and are as at be by can do does each for from get has have how if in into is it its make of on one or see set so than that the their them then there these this to two up use was what when where which while who why will with you your until below above more less same each own other".split(" "));
const words = (s) => new Set(String(s).toLowerCase().replace(/<[^>]+>/g, " ").split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w)).map((w) => w.replace(/(ies|es|s)$/, "")));

export function bestLesson(text, lessons) {
  const t = words(text); let best = lessons[0], score = 0;
  for (const l of lessons) { const n = [...words(l.title)].filter((w) => t.has(w)).length; if (n > score) { best = l; score = n; } }
  return best?.id;
}

export function buildMaps(course, declared, existing = {}) {
  const byId = new Map(course.units.flatMap((u) => u.lessons).map((l) => [l.id, l]));
  const out = {};
  for (const x of course.interactives) {
    // challenges the registry already maps itself are left to it; only the rest are mapped here
    const own = x.evidence || {}, list = (declared[x.id] || []).filter((c) => !own[c.id]), lessons = (x.lessons || []).map((id) => byId.get(id)).filter(Boolean);
    if (!list.length || !lessons.length) continue;
    out[x.id] = { ...(existing[x.id] || {}) };
    for (const c of list) if (!out[x.id][c.id]) out[x.id][c.id] = bestLesson(c.text || c.id, lessons);
  }
  return out;
}

const file = (slug) => new URL(`../kit/courses/${slug}/evidence.js`, import.meta.url);
function write(slug, maps, exploration = null) {
  const body = Object.entries(maps).map(([id, m]) => `  ${JSON.stringify(id)}: { ${Object.entries(m).map(([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(", ")} },`).join("\n");
  writeFileSync(file(slug), `// Mastery evidence maps for this course's interactives: interactive → { challenge → the lesson it is evidence for }.
// Built by scripts/evidence-maps.mjs from the challenges each interactive declares; correct any mapping by hand here
// (the script keeps existing entries). Checked by tests/interactives.test.mjs and scripts/check-interactives.cjs.
export const EVIDENCE = {
${body}
};
${exploration && Object.keys(exploration).length ? `
// Exploration challenges: met by doing what they say (run, open, view, step through, "halve X and see"), not by
// reasoning towards a target. They earn XP and stay in the activity history but never count towards mastery
// (kit/learning/evidence-class.js). Every other challenge in the map above is practice evidence.
export const EXPLORATION = {
${Object.entries(exploration).map(([id, ts]) => `  ${JSON.stringify(id)}: ${JSON.stringify(ts)},`).join("\n")}
};
` : ""}`);
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const declared = JSON.parse(readFileSync(process.argv[2], "utf8"));
  for (const [slug, ixs] of Object.entries(declared)) {
    const course = (await import(new URL(`../kit/courses/${slug}/course.js`, import.meta.url))).default;
    const mod = existsSync(file(slug)) ? await import(file(slug)) : {}, existing = mod.EVIDENCE || {};
    const lists = Object.fromEntries(Object.entries(ixs).map(([id, l]) => [id, (l || []).map((c) => (typeof c === "string" ? { id: c, text: c } : c))]));
    const maps = buildMaps(course, lists, existing);
    if (Object.keys(maps).length) { write(slug, maps, mod.EXPLORATION); console.log(`${slug}: ${Object.keys(maps).length} interactives, ${Object.values(maps).reduce((a, m) => a + Object.keys(m).length, 0)} challenges mapped`); }
  }
}
