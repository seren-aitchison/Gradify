// Visualise (app.html#/tools/visualise): ask for a visual explanation of any concept.
// The visualisation pipeline (docs/VISUALS.md), as the learner sees it:
//   1. you ask ("benzene", "electric field", "the heart")
//   2. Gradify works out the concept and finds what it already has: a molecule made by the Blender pipeline, a labelled
//      structure in a 3D model, a course simulation, or a visual computed from the physics itself
//   3. existing, checked visuals come first; nothing is generated on the spot without checks
//   4. if nothing fits, you can ask for it: the request joins the queue the visualisation agent works from, and the
//      new visual goes through the same pipeline (structure checks, Blender render, subject review) before it's shown
//   #/tools/visualise/molecule/<id>     a molecule
//   #/tools/visualise/procedural/<id>   a computed visual
import { findVisuals } from "../visuals/find.js";
import { backLink, esc } from "./tools.js";

const here = new URL(".", import.meta.url);
let indexP = null;
const index = () => (indexP ||= fetch(new URL("../api/v1/visuals.json", here)).then((r) => r.json()).then((d) => d.visuals).catch((e) => { indexP = null; throw e; }));
const KIND = { molecule: "3D molecule", model: "3D model", interactive: "Simulation", procedural: "Computed visual" };
const REVIEW = { pending: "Checks passed · expert review pending", computed: "Computed from the equations", reviewed: "Expert reviewed" };
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* fine */ } };
const SUGGEST = ["water", "glucose", "caffeine", "benzene", "electric field", "standing wave", "projectile", "the heart", "mitochondria", "sine"];

export async function renderVisualise(view, ctx, [kind, id]) {
  if (kind === "molecule" && id) {
    view.innerHTML = `<div class="tl">${backLink("#/tools/visualise", "Visualise")}<div class="vz-one"></div></div>`;
    const { mountMolecule } = await import("../visuals/molecule.js"), { speak } = await import("./voice.js");
    return mountMolecule(view.querySelector(".vz-one"), id, { speak });
  }
  if (kind === "procedural" && id) {
    const { PROCEDURAL, mountProcedural } = await import("../visuals/procedural.js");
    const p = PROCEDURAL.find((x) => x.id === id);
    view.innerHTML = `<div class="tl">${backLink("#/tools/visualise", "Visualise")}<div class="deck-head"><div><span class="kicker lo-kicker">Computed visual</span><h1>${esc(p?.title || "Visual")}</h1><p class="sub">${esc(p?.sub || "")}</p></div></div><div class="panel glass pv"></div></div>`;
    return mountProcedural(view.querySelector(".pv"), id);
  }
  view.innerHTML = `<div class="tl">${backLink()}<div class="deck-head"><div><span class="kicker lo-kicker">Learn</span><h1>Visualise</h1><p class="sub">Ask to see any concept. Gradify finds the best checked visual it has: a 3D molecule built from a verified structure and rendered in Blender, a part of one of its 3D models, a course simulation, or a diagram computed from the physics itself. If it hasn't got one, ask for it and it joins the queue to be made, checked and reviewed.</p></div></div>
    <form class="tl-search panel glass vz-form" role="search"><input type="search" placeholder="What do you want to see? caffeine, electric field, the heart…" aria-label="Concept to visualise" autocomplete="off"><button class="btn btn-primary lg btn-sm"><span>Visualise</span></button></form>
    <p class="sub vz-try">Try: ${SUGGEST.map((s) => `<button type="button" class="tl-mini" data-s="${esc(s)}">${esc(s)}</button>`).join(" ")}</p>
    <div class="vz-out" aria-live="polite"></div>
    <h2 class="lo-h">Made by the visual pipeline</h2><div class="vz-grid"></div></div>`;
  const input = view.querySelector("input"), out = view.querySelector(".vz-out");
  // requests kept on this device (signed out, or before the queue opened) go to the queue once they can
  const waiting = read("gradify.visual.requests", []);
  if (waiting.length && ctx.store?.mode === "cloud" && ctx.store.db) {
    const { error } = await ctx.store.db.from("visual_requests").insert(waiting.slice(0, 10).map((r) => ({ concept: r.concept, purpose: r.why || "", site: ctx.site || "Gradify" })));
    if (!error) write("gradify.visual.requests", waiting.slice(10));
  }
  let ix = [];
  try { ix = await index(); } catch { out.innerHTML = `<p class="sub">The visual library didn't load. Check your connection.</p>`; return; }
  view.querySelector(".vz-grid").innerHTML = ix.filter((v) => v.kind === "molecule" || v.kind === "procedural").map(card).join("");
  const run = () => {
    const q = input.value.trim(); if (!q) { out.innerHTML = ""; return; }
    const hits = findVisuals(ix, q, 12);
    out.innerHTML = hits.length ? `<div class="vz-grid">${hits.map(card).join("")}</div><p class="sub">Not what you meant? <button type="button" class="tl-mini" data-req>Ask for a visual of "${esc(q)}"</button></p>`
      : `<div class="panel glass vz-none"><h3>Gradify hasn't got a visual of "${esc(q)}" yet</h3><p class="sub">Ask for it, and say what you want to understand. It joins the queue for Gradify's visualisation team: the structure or process is checked against sources, made (in Blender where 3D helps), checked again, and reviewed by a subject expert before anyone sees it.</p>
          <form class="vz-req"><label><span class="sub">What do you want to understand about it?</span><textarea rows="2" maxlength="400" placeholder="e.g. how the shape of the enzyme fits its substrate"></textarea></label><button class="btn btn-light lg btn-sm"><span>Ask for this visual</span></button></form></div>`;
  };
  view.querySelector("form").addEventListener("submit", (e) => { e.preventDefault(); run(); });
  input.addEventListener("input", () => { clearTimeout(run.t); run.t = setTimeout(run, 200); });
  view.querySelector(".vz-try").addEventListener("click", (e) => { const b = e.target.closest("[data-s]"); if (b) { input.value = b.dataset.s; run(); } });
  out.addEventListener("click", (e) => { if (e.target.closest("[data-req]")) { out.querySelector(".vz-grid")?.remove(); out.innerHTML = ""; out.insertAdjacentHTML("beforeend", `<div class="panel glass vz-none"><form class="vz-req"><label><span class="sub">What do you want to understand about "${esc(input.value)}"?</span><textarea rows="2" maxlength="400"></textarea></label><button class="btn btn-light lg btn-sm"><span>Ask for this visual</span></button></form></div>`); } });
  out.addEventListener("submit", async (e) => {
    const f = e.target.closest(".vz-req"); if (!f) return; e.preventDefault();
    const concept = input.value.trim().slice(0, 120), why = f.querySelector("textarea").value.trim().slice(0, 400);
    let saved = false;
    if (ctx.store?.mode === "cloud" && ctx.store.db) { const { error } = await ctx.store.db.from("visual_requests").insert({ concept, purpose: why, site: ctx.site || "Gradify" }); saved = !error; }
    if (!saved) write("gradify.visual.requests", [...read("gradify.visual.requests", []), { concept, why, at: new Date().toISOString() }].slice(-50));
    const signedIn = ctx.store?.mode === "cloud";
    f.outerHTML = `<p><b>Thanks.</b> ${saved ? "Your request is in the queue." : signedIn ? "It's saved on this device for now, and Gradify's queue will pick it up once it's open." : "It's saved on this device; sign in so it reaches Gradify's queue."} New visuals are checked and reviewed before they appear here, so it won't be instant.</p>`;
  });
}
const card = (v) => `<a class="vz-card panel glass" href="${esc(v.href)}">${v.still ? `<img src="${esc(v.still)}" alt="" loading="lazy">` : `<span class="vz-ico" aria-hidden="true">${v.kind === "procedural" ? "∿" : v.kind === "model" ? "◈" : "▶"}</span>`}<span class="tl-k">${KIND[v.kind]}</span><b>${esc(v.title)}</b><span class="sub">${esc(v.sub)}</span><span class="vz-rev">${REVIEW[v.review] || ""}</span></a>`;
