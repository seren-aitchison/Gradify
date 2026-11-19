#!/usr/bin/env node
// The search index for the Gradify-wide command palette (kit/ui/global-nav.js): every course, its units and modules
// and every lesson title, in one compact file the hub and subject sites load the first time someone searches.
//
//   node scripts/build-search-index.mjs            write kit/data/search-index.json
//   node scripts/build-search-index.mjs --check    exit 1 if it's out of date (tests/ui.test.mjs runs the same check)
//
// Shape: { v: 2, courses: [{ s: slug, n: name, site, u: url, U: unit word, T: [stage names],
//                            units: [[id, n, title, [[lessonId, title, moduleIndex], …], [module titles], stageIndex, blurb]],
//                            pre?: { "unitId/Module": ["unitId/Module", …] } }] }   (pre: what each topic builds on)
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { COURSES } from "../kit/learning/learner-data.js";

const OUT = new URL("../kit/data/search-index.json", import.meta.url);

export async function buildIndex() {
  const courses = [];
  for (const [slug, url] of Object.entries(COURSES)) {
    const file = new URL(`../kit/courses/${slug}/course.js`, import.meta.url);
    if (!existsSync(file)) continue;   // listed ahead of its files landing
    const cfg = (await import(file)).default;
    const units = (cfg.units || []).map((u) => {
      const mods = [];
      const lessons = (u.lessons || []).map((l) => {
        let m = -1;
        if (l.module) { m = mods.indexOf(l.module); if (m < 0) m = mods.push(l.module) - 1; }
        return m >= 0 ? [l.id, l.title, m] : [l.id, l.title];
      });
      const ti = (cfg.tracks || []).findIndex((t) => t.units.includes(u.n));
      return [u.id, u.n, u.title, lessons, mods, ti, cfg.blurbs?.[u.n] || ""];
    });
    const entry = { s: slug, n: cfg.name || slug, site: cfg.site || "", u: url, U: cfg.unitWord || "Unit", T: (cfg.tracks || []).map((t) => t.name), units };
    if (cfg.concepts?.modules) entry.pre = cfg.concepts.modules;
    courses.push(entry);
  }
  return { v: 2, courses };
}

export const serialise = (idx) => `${JSON.stringify(idx)}\n`;

if (import.meta.url === `file://${process.argv[1]}`) {
  const text = serialise(await buildIndex());
  if (process.argv.includes("--check")) {
    const same = existsSync(OUT) && readFileSync(OUT, "utf8") === text;
    console.log(same ? "search index is up to date" : "search index is out of date: run node scripts/build-search-index.mjs");
    process.exit(same ? 0 : 1);
  }
  writeFileSync(OUT, text);
  const idx = JSON.parse(text), n = idx.courses.reduce((a, c) => a + c.units.reduce((b, u) => b + u[3].length, 0), 0);
  console.log(`wrote kit/data/search-index.json: ${idx.courses.length} courses, ${n} lessons, ${(text.length / 1024).toFixed(0)} KB`);
}
