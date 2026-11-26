// The mind map creator (Tools): a learner's own mind map. Facts toggled on from any lesson (the lesson search on the
// left) join the map under their lesson and section; the map itself can be edited freely (Mind Elixir, editable):
// drag ideas, rename them (double-click), add a child (Tab) or a sibling (Enter), delete (Delete). Saved in this
// browser as it changes. Exports as a 4K PNG, SVG or Markdown, like the lesson maps.
import { lessonPicker, factKey, useTool, backLink, takePicked, esc } from "./tools.js";
import { map as loadMap, saveMap, deleteMap, uid } from "./store.js";
import { mindElixir, elixirTheme, scene, toSvg, toPng, PALETTE } from "../maps/view.js";
import { split } from "../maps/build.js";
import { link, unlink, linksOf } from "../data/links.js";
import { resource, rid } from "../core/resource.js";
import { loadIndex as lessonIndex } from "./search.js";

const hash = (s) => { let h = 2166136261; for (const ch of String(s)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return (h >>> 0).toString(36); };
const idOf = { lesson: (slug, l) => `L${hash(`${slug}/${l}`)}`, section: (slug, l, s) => `S${hash(`${slug}/${l}/${s}`)}`, fact: (key) => `F${hash(key)}` };
const walk = (n, f, parent = null) => { f(n, parent); (n.children || []).forEach((c) => walk(c, f, n)); };
const find = (root, id) => { let out = null; walk(root, (n, p) => { if (n.id === id) out = { n, p }; }); return out; };

export async function renderMapMaker(view, ctx, [id = "new"]) {
  let m = id === "new" ? null : loadMap(id);
  if (id !== "new" && !m) { view.innerHTML = `<div class="tl">${backLink()}<article class="panel glass"><h3>That mind map isn't in this browser</h3><p class="sub">Maps you make are kept in the browser you made them in.</p></article></div>`; return; }
  if (!m) {
    const newId = uid("m");
    if (!(await useTool("map", newId, ctx, view))) return;
    m = saveMap({ id: newId, title: "My mind map", data: { nodeData: { id: "root", topic: "My mind map", children: [] } } });
    history.replaceState(null, "", `#/tools/map/${m.id}`);
  }
  view.innerHTML = `<div class="tl tl-wide">${backLink()}
    <div class="tl-mhead"><input class="tl-title" value="${esc(m.title)}" aria-label="Map title"><div class="tl-bar">
      <button type="button" class="btn btn-ghost lg btn-sm" data-act="fit"><span>Fit</span></button>
      <button type="button" class="btn btn-ghost lg btn-sm" data-act="add"><span>+ Idea</span></button>
      <button type="button" class="btn btn-ghost lg btn-sm" data-act="png"><span>4K image</span></button>
      <button type="button" class="btn btn-ghost lg btn-sm" data-act="svg"><span>SVG</span></button>
      <button type="button" class="btn btn-ghost lg btn-sm" data-act="md"><span>Markdown</span></button>
      <button type="button" class="btn btn-ghost lg btn-sm" data-act="delete"><span>Delete</span></button></div></div>
    <div class="tl-split"><aside class="tl-side panel glass"><h3>Add facts from lessons</h3><div class="tl-pick"></div></aside>
      <div class="tl-stage"><div class="tl-map mm-canvas" tabindex="0" aria-label="Your mind map. Double-click an idea to rename it, Tab adds a child, Enter a sibling, Delete removes it."></div>
      <p class="tl-help sub">Double-click to rename · Tab: add a child · Enter: add a sibling · Delete: remove · drag to move</p></div></div></div>`;
  const MindElixir = await mindElixir();
  const dark = document.documentElement.dataset.theme !== "light";
  const el = view.querySelector(".tl-map");
  const mind = new MindElixir({ el, direction: MindElixir.SIDE, editable: true, contextMenu: true, toolBar: false, keypress: true, allowUndo: true, alignment: "root", scaleMin: 0.15, scaleMax: 3, theme: elixirTheme(dark) });
  mind.init(m.data);
  const fit = () => fitTo(mind, view.querySelector(".tl-stage"));
  requestAnimationFrame(fit);

  // where the map came from: a "made from" link to each lesson it has facts from (kit/data/links.js), so the lesson
  // shows the map in its Connections and the map shows its lessons. It goes when the lesson's last fact goes.
  const mapRes = () => resource(rid("map", m.id), { title: m.title, sub: "Mind map", href: `${location.pathname}#/tools/map/${m.id}` });
  async function source(h, on) {
    let page = h.c?.page;
    if (!page && h.c?.slug) page = (await lessonIndex().catch(() => ({ courses: [] }))).courses.find((c) => c.slug === h.c.slug)?.page;
    if (!page || !h.lesson) return;
    const L = resource(rid("lesson", page, h.lesson), { title: h.title, subject: h.c.name, sub: h.c.name ? `${h.c.name} · lesson` : "Lesson", href: `${page}#/lesson/${h.lesson}` });
    if (on) link(mapRes(), L, { by: "source" }); else unlink(mapRes().rid, L.rid);
  }
  let timer = 0, linkedTitle = m.title;
  const save = () => { clearTimeout(timer); timer = setTimeout(() => {
    m = saveMap({ ...m, title: view.querySelector(".tl-title").value.trim() || "My mind map", data: mind.getData() });
    // renamed: its links say the new name
    if (m.title !== linkedTitle) { linkedTitle = m.title; for (const l of linksOf(mapRes().rid)) if (l.by === "source") link(mapRes(), l.other, { by: "source" }); }
  }, 300); };
  mind.bus.addListener("operation", save);
  view.querySelector(".tl-title").addEventListener("input", (e) => { const d = mind.getData(); d.nodeData.topic = e.target.value || "My mind map"; mind.refresh(d); save(); });

  // facts on and off: the map's own data, so ideas the learner added or moved stay as they are
  const has = (key) => { try { return Boolean(find(mind.getData().nodeData, idOf.fact(key))); } catch { return false; } };
  const toggle = (h, g, f, on) => {
    const d = mind.getData(), root = d.nodeData, key = factKey(h, f);
    const lid = idOf.lesson(h.c.slug, h.lesson), sid = idOf.section(h.c.slug, h.lesson, g.section), fid = idOf.fact(key);
    if (on) {
      let L = find(root, lid)?.n;
      if (!L) { L = { id: lid, topic: h.title, branchColor: PALETTE[root.children.length % PALETTE.length], children: [] }; root.children.push(L); }
      let S = find(L, sid)?.n;
      if (!S) { S = { id: sid, topic: g.section, children: [] }; L.children.push(S); }
      if (!find(S, fid)) S.children.push({ id: fid, topic: f.short || split(f.title).topic, ...(f.text !== f.short ? { note: f.text } : {}) });
      source(h, true);
    } else {
      const hit = find(root, fid); if (hit) hit.p.children = hit.p.children.filter((c) => c.id !== fid);
      // an emptied section or lesson goes too
      for (const pid of [sid, lid]) { const x = find(root, pid); if (x && !x.n.children.length && x.p) x.p.children = x.p.children.filter((c) => c.id !== pid); }
      if (!find(root, lid)) source(h, false);
    }
    mind.refresh(d); save();
  };
  lessonPicker(view.querySelector(".tl-pick"), { isOn: has, onToggle: toggle });
  // facts sent from the search page
  const picked = takePicked();
  if (picked.length) {
    for (const p of picked) toggle({ title: p.lesson, lesson: p.lessonId, c: { slug: p.slug, name: p.course } }, { section: p.section }, p, true);
    requestAnimationFrame(fit);
  }

  const download = (blob, ext) => { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `${(m.title || "mind-map").toLowerCase().replace(/[^a-z0-9]+/g, "-")}${ext === "png" ? "-4k" : ""}.${ext}`; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); };
  const shot = () => { const s = scene(mind); s.title = m.title; s.map = "Mind map"; return s; };
  view.querySelector(".tl-bar").addEventListener("click", async (e) => {
    const b = e.target.closest("[data-act]"); if (!b) return;
    const act = b.dataset.act;
    if (act === "fit") fit();
    else if (act === "add") { const sel = mind.currentNode || mind.findEle("root"); mind.addChild(sel); }
    else if (act === "svg") download(new Blob([toSvg(shot())], { type: "image/svg+xml" }), "svg");
    else if (act === "png") { b.disabled = true; try { download(await toPng(shot()), "png"); } finally { b.disabled = false; } }
    else if (act === "md") download(new Blob([markdownOf(mind.getData().nodeData)], { type: "text/markdown" }), "md");
    else if (act === "delete" && confirm(`Delete "${m.title}"? This can't be undone.`)) { deleteMap(m.id); location.hash = "#/tools"; }
  });
}

/** Zoom a map to fill `stage` (at most 1.3×) and centre it. */
export function fitTo(mind, stage) {
  try {
    const box = stage.getBoundingClientRect(), ext = () => { let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity; mind.nodes.querySelectorAll(".me-tpc").forEach((t) => { const r = t.getBoundingClientRect(); if (!r.width) return; x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); }); return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }; };
    let e = ext(); if (!isFinite(e.w) || !e.w) return;
    const k = mind.scaleVal || 1, want = Math.max(0.2, Math.min(1.3, k * (box.width - 60) / e.w, k * (box.height - 70) / e.h));
    mind.scale(want); e = ext();
    mind.move(box.left + box.width / 2 - (e.x + e.w / 2), box.top + box.height / 2 - (e.y + e.h / 2));
  } catch { /* an empty map */ }
}

/** A map as Markdown headings and bullets (Markmap reads it as a mind map). */
export function markdownOf(root) {
  const out = [`# ${root.topic}`, ""];
  const line = (n, d) => { out.push(d === 1 ? `## ${n.topic}` : `${"  ".repeat(d - 2)}- ${n.topic}${n.note ? `: ${n.note}` : ""}`); (n.children || []).forEach((c) => line(c, d + 1)); if (d === 1) out.push(""); };
  (root.children || []).forEach((c) => line(c, 1));
  return out.join("\n");
}
