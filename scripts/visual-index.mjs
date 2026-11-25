// The visual index: every visual Gradify already has, in one list, so a request for a visual explanation is matched
// to a verified asset before anything new is made (the visualisation pipeline's step 3, docs/VISUALS.md).
//   molecules     kit/visuals/molecules/index.json (RDKit structures rendered in Blender, scripts/visuals/build.py)
//   3D models     kit/models/*.js: each labelled structure in each site's interactive model
//   interactives  every course's labs and simulations (kit/courses/<slug>/interactives.js)
//   procedural    visuals computed from the physics itself (kit/visuals/procedural.js)
// Written to kit/api/v1/visuals.json by scripts/build-api.mjs. Each entry: { kind, id, title, sub, keys, href, review }
import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const root = new URL("../", import.meta.url);
const words = (...s) => [...new Set(s.join(" ").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]+/g, " ").split(" ").filter((w) => w.length > 2))];
const plain = (s) => String(s ?? "").replace(/\*\*|\*/g, "");

export async function visualIndex() {
  const out = [];
  // molecules
  const molPath = new URL("kit/visuals/molecules/index.json", root);
  if (existsSync(molPath)) for (const m of JSON.parse(await readFile(molPath, "utf8")).molecules) {
    out.push({ kind: "molecule", id: m.id, title: m.name, sub: `${m.formula} · 3D molecule, rendered in Blender from a checked structure`, keys: words(m.name, m.formula, ...m.keys), href: `#/tools/visualise/molecule/${m.id}`, still: `/kit/visuals/molecules/${m.files.sizes ? `${m.id}-960.webp` : m.files.still}`, review: m.review.status, checks: Object.keys(m.checks) });
  }
  // the sites' 3D models, a structure at a time
  const { MODELS } = await import(new URL("kit/models/index.js", root));
  const { REVIEWS } = await import(new URL("kit/models/reviews.js", root));
  const seen = new Set();
  for (const [site, m] of Object.entries(MODELS)) {
    const d = (await import(new URL(`kit/models/${m.file}`, root))).default;
    for (const [sid, s] of Object.entries(d.structures || {})) {
      const key = `${m.file}:${sid}`; if (seen.has(key)) continue; seen.add(key);
      // the site's folder, by the site's own rule (kit/core/site.js slugOf): "TechGradify" → techgradify
      const folder = site.split(" · ")[0].toLowerCase().replace(/[^a-z0-9]+/g, "");
      // the 4K Cycles preview the 3D-model pipeline renders for each model (scripts/blender/render-previews.py)
      const still = existsSync(new URL(`kit/models/previews/${m.file.replace(".js", "")}-960.webp`, root)) ? `/kit/models/previews/${m.file.replace(".js", "")}-960.webp` : null;
      out.push({ kind: "model", id: `${site}/${sid}`, title: plain(s.name), sub: `${m.title} · ${site.split(" · ")[0]}`, keys: words(s.name, ...(s.keys || []), d.groups?.[s.group]?.name || "", m.title), href: `/${folder}/3d.html`, still, review: REVIEWS[m.file.replace(".js", "")] ? "reviewed" : "pending" });
    }
  }
  // interactives
  for (const slug of (await readdir(new URL("kit/courses/", root))).sort()) {
    const f = new URL(`kit/courses/${slug}/interactives.js`, root);
    if (!existsSync(f)) continue;
    let list = [], cfg = null;
    try { list = (await import(f)).INTERACTIVES || []; cfg = (await import(new URL(`kit/courses/${slug}/course.js`, root))).default; } catch { continue; }
    for (const x of list) out.push({ kind: "interactive", id: `${slug}/${x.id}`, title: x.title, sub: `${x.kind || "Interactive"} · ${cfg?.name || slug}${x.note ? ` · ${x.note}` : ""}`, keys: words(x.title, x.sub || ""), href: cfg?.page ? `${cfg.page}#/practice/${x.id}` : null, review: "pending" });
  }
  // procedural visuals
  const { PROCEDURAL } = await import(new URL("kit/visuals/procedural.js", root));
  for (const p of PROCEDURAL) out.push({ kind: "procedural", id: p.id, title: p.title, sub: p.sub, keys: words(p.title, p.sub, ...p.keys), href: `#/tools/visualise/procedural/${p.id}`, review: "computed" });
  return { api: 1, about: "Every visual on Gradify, for matching a request to an existing asset first (scripts/visual-index.mjs).", count: out.length, visuals: out.filter((v) => v.href) };
}

export { findVisuals } from "../kit/visuals/find.js";
