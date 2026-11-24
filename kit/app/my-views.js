// MyGradify home (#/my) and module pages (#/my/module/<n>). Everything here reads and writes the ONE academic profile
// (profiles.learner.academic, kit/data/academic.js): no second profile, no separate module store. Catalogue details
// (outcomes, assessments, sizes) come from the catalogue reader and are always labelled with what's been checked.
// Study progress per module isn't tracked yet, so module cards say so honestly rather than show made-up numbers.
import { icon } from "../core/icons.js";
import { actionCard } from "../core/action-card.js";
import { createCatalogue, describeStatus } from "../data/catalogue.js";
import { academicOf, completeness, saveAcademic, addUnit, updateUnit, removeUnit, sourceLabel, MODES } from "../data/academic.js";
import { learnerOf } from "../data/profile.js";
import { esc } from "../core/text.js";

export const MY_CHILD = /^(JuniorGradify|YouthGradify)$/;
const LABEL = { country: "Country", institution: "University or college", subject: "Subject", offering: "Course", start_year: "Started", current_stage: "Year", mode: "Study mode", units: "Modules" };
let catalogue = null;
const cat = () => (catalogue ||= createCatalogue({ base: "/data/catalogue/" }));
const chip = (v) => `<span class="my-src ${v?.id ? "linked" : "typed"}">${v?.id ? icon("check") : icon("pencil")}${sourceLabel(v)}</span>`;

/** ctx: { view, store, site, toast, profile(), refresh(), rerender() } */
export async function renderMy(arg, more, ctx) {
  const { view } = ctx;
  if (MY_CHILD.test(ctx.site || "")) { view.innerHTML = `<section class="my"><h1>MyGradify</h1><div class="panel glass"><p>Course details aren't collected on ${esc(ctx.site)}.</p></div></section>`; return; }
  const a = academicOf(learnerOf(ctx.profile()));
  if (arg === "module") return renderModule(Number(more?.[0]), a, ctx);

  if (!a) {
    view.innerHTML = `<section class="my"><span class="kicker lo-kicker">${icon("cap")}MyGradify</span><h1>Your course, in one place</h1>
      <p class="sub">Tell Gradify what and where you study, and your plan, tracker and revision follow your actual course.</p>
      ${actionCard({ kicker: "Start here", title: "Add your course", why: "Seven quick steps, all skippable except the country. If your university or course isn't listed yet, just type it.", actions: [{ label: "Add your course", icon: "cap", href: "#/academic/1" }] })}</section>`;
    return;
  }
  const c = completeness(a), units = a.units || [];
  const mode = MODES.find(([m]) => m === a.mode)?.[1];
  const title = a.offering?.name || a.subject?.name || "Your course";
  const next = !units.length
    ? actionCard({ kicker: "Next step", title: "Add this year's modules", why: "Import your handbook or type them in. Gradify uses them to organise revision and deadlines.", actions: [{ label: "Import a handbook", icon: "upload", href: "#/academic/6" }, { label: "Type a module", icon: "pencil", attrs: "data-focus-add", soft: true }] })
    : c.filled < c.total
      ? actionCard({ kicker: "Next step", title: `Finish your course details (${c.filled} of ${c.total})`, why: `Still to add: ${c.missing.map((f) => LABEL[f].toLowerCase()).join(", ")}. Each one helps Gradify plan around your course.`, actions: [{ label: "Finish details", icon: "checklist", href: "#/academic/7" }] })
      : actionCard({ kicker: "Next step", title: "Plan this week around your modules", why: "Your course details are complete. Smart Plan can now organise your week.", actions: [{ label: "Open Smart Plan", icon: "calendar", href: "#/plan" }] });
  view.innerHTML = `<section class="my">
    <span class="kicker lo-kicker">${icon("cap")}MyGradify</span>
    <div class="my-hero panel glass">
      <div class="my-hero-main"><h1>${esc(title)}</h1>
        <p class="sub">${esc([a.institution?.name, a.current_stage?.label, mode].filter(Boolean).join(" · ") || "Add your university and year in your course details.")}</p>
        <div class="my-hero-chips">${a.start_year ? `<span class="pill-dark">Started ${a.start_year}</span>` : ""}<span class="pill-dark">${c.filled} of ${c.total} details</span></div></div>
      <a class="btn btn-light lg btn-sm" href="#/academic/7"><span>Edit course details</span></a>
    </div>
    ${next}
    <h2 class="my-h">Your course</h2>
    <dl class="my-facts panel glass">${["institution", "subject", "offering", "current_stage", "mode", "country"].map((f) => {
      const v = a[f], text = f === "mode" ? mode : f === "current_stage" ? v?.label : v?.name;
      return `<div><dt>${LABEL[f]}</dt><dd>${text ? esc(text) : `<span class="muted">Not added</span>`}</dd>${text && ["institution", "subject", "offering"].includes(f) ? `<dd>${chip(v)}</dd>` : "<dd></dd>"}</div>`;
    }).join("")}</dl>
    <div class="my-h-row"><h2 class="my-h">This year's modules <span class="pill-dark">${units.length}</span></h2></div>
    ${units.length ? `<ul class="my-modules">${units.map((u, i) => `<li class="my-module panel glass"><a href="#/my/module/${i}" class="my-module-link"><span class="my-sq">${icon("book")}</span><span class="my-module-text"><b>${esc(u.name)}</b><small>${esc([u.code, sourceLabel(u)].filter(Boolean).join(" · "))}</small></span></a>
        <p class="my-progress">${icon("trend")}No study activity linked yet</p></li>`).join("")}</ul>`
      : `<div class="my-empty panel glass"><p><b>No modules yet.</b> Import your module handbook and Gradify finds them for you, or type them below.</p><a class="btn btn-light lg btn-sm" href="#/academic/6"><span>${icon("upload")} Import a handbook</span></a></div>`}
    <form class="my-add panel glass" data-add>
      <h3>Add a module</h3>
      <div class="my-add-row"><label><span>Module</span><input name="name" maxlength="160" required placeholder="e.g. Organic Chemistry II"></label><label class="my-code"><span>Code (optional)</span><input name="code" maxlength="40" placeholder="CH201"></label><button class="btn btn-primary lg" type="submit"><span>Add</span></button></div>
      <p class="my-hint">Added by you, so it's marked “Entered by you”. Gradify doesn't check it with your university.</p>
    </form>
  </section>`;
  const form = view.querySelector("[data-add]");
  view.querySelector("[data-focus-add]")?.addEventListener("click", () => { form.scrollIntoView({ block: "center" }); form.querySelector("input").focus(); });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = new FormData(form);
    try { await saveAcademic(ctx.store, addUnit(a, { name: f.get("name"), code: f.get("code") })); await ctx.refresh(); ctx.toast("Module added."); ctx.rerender(); }
    catch (err) { ctx.toast(esc(err.message)); }
  });
}

async function renderModule(i, a, ctx) {
  const { view } = ctx;
  const u = a?.units?.[i];
  if (!u) { view.innerHTML = `<section class="my"><a class="my-back" href="#/my">← MyGradify</a><div class="panel glass"><p>That module isn't in your list any more.</p></div></section>`; return; }
  // catalogue details for a linked module: size, outcomes it covers, assessments that cover it, each with its status
  let rec = null, outcomes = [], assessments = [];
  if (u.id) {
    try {
      rec = await cat().record(u.id);
      if (rec && !rec.split) {
        const rel = await cat().relations(rec.id);
        outcomes = (await Promise.all(rel.filter((e) => e.type === "covers" && e.from === rec.id).map((e) => cat().record(e.to)))).filter(Boolean);
        assessments = (await Promise.all(rel.filter((e) => e.type === "assesses" && e.to === rec.id).map((e) => cat().record(e.from)))).filter(Boolean);
      }
    } catch { rec = null; }
  }
  const size = rec?.data?.size ? `${rec.data.size.value} ${rec.data.size.unit}` : null;
  view.innerHTML = `<section class="my">
    <a class="my-back" href="#/my">← MyGradify</a>
    <div class="my-hero panel glass"><div class="my-hero-main"><span class="kicker">Module</span><h1>${esc(u.name)}</h1>
      <p class="sub">${esc([u.code, size].filter(Boolean).join(" · ") || "No code added")}</p><div class="my-hero-chips">${chip(u)}${rec ? `<span class="pill-dark">${esc(describeStatus(rec, ["title", "size"]))}</span>` : ""}</div></div></div>
    <h2 class="my-h">Learning outcomes</h2>
    ${outcomes.length ? `<ul class="my-list panel glass">${outcomes.map((o) => `<li><span>${esc(o.data.label)}</span><small>${esc(describeStatus(o, ["label"]))}</small></li>`).join("")}</ul>`
      : `<div class="my-empty panel glass"><p>${u.id ? (rec ? "Gradify's list doesn't have this module's learning outcomes yet." : "Gradify's course list isn't available right now.") : "Learning outcomes appear when a module comes from Gradify's list. Your handbook usually lists them: keep it to hand for revision."}</p></div>`}
    <h2 class="my-h">Assessments</h2>
    ${assessments.length ? `<ul class="my-list panel glass">${assessments.map((x) => `<li><span>${esc(x.data.label || x.data.kind)}${x.data.weight != null ? ` · ${x.data.weight}%` : ""}</span><small>${esc(describeStatus(x, ["kind", "weight"]))}</small></li>`).join("")}</ul>`
      : `<div class="my-empty panel glass"><p>No assessments listed for this module yet. Weightings only count towards your grades once they're checked.</p></div>`}
    <h2 class="my-h">Progress</h2>
    <div class="my-empty panel glass"><p>${icon("trend")} Study activity isn't linked to modules yet. Your flashcards, notes and lessons still count in Progress.</p></div>
    ${u.id ? `<div class="my-actions"><button type="button" class="btn btn-ghost lg" data-remove><span>Remove from this year</span></button></div>`
      : `<form class="my-add panel glass" data-edit><h3>Edit this module</h3><div class="my-add-row"><label><span>Module</span><input name="name" maxlength="160" required value="${esc(u.name)}"></label><label class="my-code"><span>Code (optional)</span><input name="code" maxlength="40" value="${esc(u.code || "")}"></label><button class="btn btn-primary lg" type="submit"><span>Save</span></button></div>
          <button type="button" class="btn btn-ghost lg" data-remove><span>Remove from this year</span></button></form>`}
  </section>`;
  view.querySelector("[data-edit]")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    try { await saveAcademic(ctx.store, updateUnit(a, i, { name: f.get("name"), code: f.get("code") })); await ctx.refresh(); ctx.toast("Saved."); ctx.rerender(); }
    catch (err) { ctx.toast(esc(err.message)); }
  });
  view.querySelector("[data-remove]").addEventListener("click", async () => {
    if (!confirm(`Remove ${u.name} from this year's modules? Your notes and progress stay.`)) return;
    try { await saveAcademic(ctx.store, removeUnit(a, i)); await ctx.refresh(); ctx.toast("Module removed."); location.hash = "#/my"; }
    catch (err) { ctx.toast(esc(err.message)); }
  });
}
