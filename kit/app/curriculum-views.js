// My curriculum (app.html#/curriculum): find what you're studying in Gradify's database of the world's curricula
// (kit/curriculum/world.js), and see honestly what Gradify has for it.
//   - choose a qualification ("This is what I'm studying"), with your institution and year: kept with your profile,
//     so Gradify can put the right courses first
//   - for it: the Gradify courses that relate to it, each with its quality audit score (kit/api/v1/quality.json), and
//     Gradify's coverage claim: verified, mapped, aligned, or not mapped (kit/curriculum/coverage.js)
// Every listing says it hasn't yet been checked against the official source, until it has.
import { WORLD, qualifications, find, stats } from "../curriculum/world.js";
import { STATUS, COURSES as COVERAGE } from "../curriculum/coverage.js";
import { learnerOf, saveLearner } from "../data/profile.js";
import { icon } from "../core/icons.js";
import { esc } from "../core/text.js";

const here = new URL(".", import.meta.url);
const json = (p) => fetch(new URL(p, here)).then((r) => r.json()).catch(() => null);
const KIND = { "school-leaving": "School-leaving", secondary: "Secondary", entrance: "University entrance", vocational: "Vocational", higher: "Higher education", professional: "Professional", framework: "Curriculum framework" };
const LEVEL = { 1: "Primary", 2: "Lower secondary", 3: "Upper secondary", 4: "Post-secondary", 5: "Short tertiary", 6: "Bachelor's", 7: "Master's", 8: "Doctoral", P: "Professional licensing" };

/** Gradify's claim for a qualification: the coverage registry's strongest status for it, otherwise "not mapped". Pure. */
export function claimFor(q) {
  if (!q?.coverage) return { status: null, line: "Gradify hasn't mapped its lessons to this qualification. The courses below cover related subjects: check them against your own specification." };
  const statuses = Object.values(COVERAGE).flatMap((c) => c.serves.filter((s) => s.q === q.coverage).map((s) => s.status));
  const best = ["verified", "mapped", "aligned"].find((r) => statuses.includes(r));
  return best ? { status: best, line: STATUS[best].line } : { status: null, line: "Gradify hasn't mapped its lessons to this qualification yet." };
}

export async function renderCurriculum({ view, store, toast, profile }) {
  const [cat, quality] = await Promise.all([json("../api/v1/catalogue.json"), json("../api/v1/quality.json")]);
  const courses = new Map((cat?.courses || []).map((c) => [c.slug, c]));
  const scores = new Map((quality?.courses || []).map((c) => [c.slug, c.overall]));
  const L = learnerOf(profile), mine = L.curriculum?.qualification ? find(L.curriculum.qualification) : null;
  const st = stats();
  view.innerHTML = `<section class="cu">
    <div class="deck-head"><div><span class="kicker lo-kicker">${icon("cap")}My curriculum</span><h1>What are you studying?</h1>
      <p class="sub">Find your qualification in Gradify's database of ${st.countries} countries' education systems: ${st.qualifications} qualifications, from GCSEs and the IB to the gaokao and the USMLE. Gradify then shows you what it has for it, and how far you can rely on it.</p></div></div>
    ${mine ? `<article class="panel glass cu-mine"><span class="tl-k">You're studying</span><h2>${esc(mine.name)}</h2><p class="sub">${esc(mine.country)} · ${esc(mine.system)}${L.curriculum.institution ? ` · ${esc(L.curriculum.institution)}` : ""}${L.curriculum.year ? ` · ${esc(L.curriculum.year)}` : ""}</p>${detail(mine, courses, scores)}<button type="button" class="tl-mini" data-change>Change</button></article>` : ""}
    <form class="tl-search panel glass cu-search" role="search"><input type="search" placeholder="Search: A level, IB, HSC, NCEA, SAT, gaokao, SQE…" aria-label="Search qualifications"><select aria-label="Country"><option value="">Every country</option>${WORLD.map((c) => `<option>${esc(c.country)}</option>`).join("")}</select></form>
    <div class="cu-list"></div>
    <p class="sub cu-note">Every listing comes from public information and hasn't yet been checked against the official source (${st.checked} of ${st.qualifications} checked so far). Listing a qualification isn't a claim that Gradify covers it. Is yours missing, or wrong? <a href="mailto:hello@getgradify.com?subject=Curriculum">Tell us</a>.</p></section>`;
  const list = view.querySelector(".cu-list"), input = view.querySelector("input"), sel = view.querySelector("select");
  const all = qualifications();
  const paint = () => {
    const q = input.value.trim().toLowerCase(), c = sel.value;
    const hits = all.filter((x) => (!c || x.country === c) && (!q || `${x.name} ${x.id.replace(/-/g, " ")} ${x.body} ${x.country} ${x.system}`.toLowerCase().includes(q)));
    const by = new Map(); for (const x of hits) (by.get(`${x.country} · ${x.system}`) || by.set(`${x.country} · ${x.system}`, []).get(`${x.country} · ${x.system}`)).push(x);
    list.innerHTML = hits.length ? [...by.entries()].map(([k, xs]) => `<h2 class="lo-h">${esc(k)}</h2><div class="cu-grid">${xs.map((x) => `<article class="panel glass cu-q" data-id="${esc(x.id)}"><span class="tl-k">${KIND[x.kind] || ""} · ${LEVEL[x.level] || ""}${x.ages ? ` · ages ${esc(x.ages)}` : ""}</span><b>${esc(x.name)}</b><span class="sub">${esc(x.body)}</span>
      <details><summary>What Gradify has for it</summary>${detail(x, courses, scores)}</details>
      <div class="row-actions">${x.url ? `<a class="tl-mini" href="${esc(x.url)}" target="_blank" rel="noopener">Official site</a>` : ""}<button type="button" class="btn btn-light lg btn-sm" data-pick="${esc(x.id)}"><span>This is what I'm studying</span></button></div></article>`).join("")}</div>`).join("")
      : `<p class="sub">Nothing matches. Try fewer words, or <a href="mailto:hello@getgradify.com?subject=Curriculum">tell us what's missing</a>.</p>`;
  };
  input.addEventListener("input", paint); sel.addEventListener("change", paint);
  sel.value = WORLD.some((c) => c.country === L.curriculum?.country) ? L.curriculum.country : ""; paint();
  view.querySelector("[data-change]")?.addEventListener("click", () => { view.querySelector(".cu-mine").remove(); input.focus(); });
  list.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-pick]"); if (!b) return;
    const q = find(b.dataset.pick);
    const card = b.closest(".cu-q");
    card.insertAdjacentHTML("beforeend", `<form class="cu-form"><label><span class="sub">School, college or university (optional)</span><input name="inst" maxlength="120"></label><label><span class="sub">Year or stage (optional)</span><input name="year" maxlength="40" placeholder="e.g. Year 12, second year"></label><button class="btn btn-primary lg btn-sm"><span>Save</span></button></form>`);
    b.remove();
    card.querySelector(".cu-form").addEventListener("submit", async (ev) => {
      ev.preventDefault(); const f = new FormData(ev.target);
      await saveLearner(store, { curriculum: { qualification: q.id, country: q.country, institution: f.get("inst").trim(), year: f.get("year").trim(), chosen_at: new Date().toISOString() } });
      toast(`Saved: ${esc(q.name)}.`); dispatchEvent(new HashChangeEvent("hashchange"));
    });
  });
}
function detail(q, courses, scores) {
  const claim = claimFor(q);
  const rel = q.gradify.map((s) => courses.get(s)).filter(Boolean);
  return `<p class="cu-claim">${claim.status ? `<span class="pill-dark">${esc(STATUS[claim.status].name)}</span> ` : ""}${esc(claim.line)}</p>
    ${rel.length ? `<ul class="cu-courses">${rel.map((c) => `<li><a href="${esc(c.page)}">${esc(c.name)}</a> <span class="sub">${c.lessonsWritten} lessons${scores.has(c.slug) ? ` · audit ${scores.get(c.slug)}/100` : ""}</span></li>`).join("")}</ul>` : `<p class="sub">No related Gradify course yet.</p>`}`;
}
