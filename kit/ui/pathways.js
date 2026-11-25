// Pathways: start anywhere in Gradify's curriculum graph (kit/curriculum/graph.js) and reach everything connected to it,
// in every direction. Subject → qualification → exam board → specification → topics → lessons; exam board →
// qualification → the subjects it publishes; country → education system → qualifications; stage → qualifications and
// courses; professional body → its standards → Gradify courses. Part of Explore (explore.html, kit/ui/explore.js).
//
// Routes (after explore.html#/): pathways, subjects, boards, countries, stages, professions, subject/<id>[/<qual>],
// body/<id>, qualification/<id>, award/<id>, country/<iso>, jurisdiction/<id>, spec/<id>, topic/<spec>/<topic>,
// org/<id>, stage/<id>. "?from=<node id>,<node id>" is the way the learner came, so the breadcrumb is the path they took
// and every link onward carries it (the last three steps, so it stays short).
//
// Nothing is invented: every card is an edge of the graph, and where the registry has nothing yet, the page says so
// and points to what does exist. Cards use the site directory's gleaming tiles and the action card (base.css).
import { esc } from "./store.js";
import { uiIcon } from "./icons.js";
import { emptyState } from "./states.js";
import { icon } from "../core/icons.js";
import { tile, ink } from "../core/colour.js";
import { actionCard } from "../core/action-card.js";
import { GROUPS } from "../core/sites.js";
import { pathOf } from "../core/site.js";
import { buildGraph, KINDS, subjectQualifications, bodyQualifications, alternatives, jurisdictionsOf } from "../curriculum/graph.js";

const KIND_ICON = { country: "globe", jurisdiction: "landmark", award: "award", qualification: "award", body: "badge", org: "shield", spec: "checklist", topic: "layers", subject: "book", course: "cap", site: "home", stage: "route" };
const KIND_COLOUR = { country: "0e98e5", jurisdiction: "3c78d8", award: "674ea6", qualification: "674ea6", body: "4641ff", org: "9f2f17", spec: "e69138", topic: "e69138", subject: "6aa84f", course: "6aa84f", site: "666666", stage: "a44a99" };
const CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>';
const CLAIM = { verified: "Verified", mapped: "Mapped, not yet verified", aligned: "Aligned, not mapped" };
const STARTS = [
  ["subjects", "By subject", "Biology, Law, History…", "book", "6aa84f"],
  ["boards", "By exam board", "AQA, OCR, Pearson Edexcel, SQA…", "badge", "4641ff"],
  ["countries", "By country", "England, Scotland, Australia…", "globe", "0e98e5"],
  ["stages", "By stage", "Primary to doctoral and professional", "route", "a44a99"],
  ["professions", "By profession", "Regulators and professional standards", "shield", "9f2f17"],
];

/** "#/body/aqa?from=subject:biology" → { parts: ["body", "aqa"], from: ["subject:biology"] } (pure) */
export function parseRoute(hash) {
  const [path, query = ""] = String(hash || "").replace(/^#\/?/, "").split("?");
  const from = (new URLSearchParams(query).get("from") || "").split(",").filter((x) => /^[a-z]+:[\w./-]+$/.test(x));
  return { parts: path.split("/").filter(Boolean), from };
}
/** the address of a node page, carrying the way here (the last three steps) */
export function hrefOf(n, trail = []) {
  if (!n) return "#/pathways";
  // a site isn't a pathways page: it opens the site itself, as Explore's site cards do
  if (n.kind === "site") { const site = GROUPS.flatMap((x) => x.items).find((x) => x.n === n.name); return site ? pathOf(site) : "/#find"; }
  const path = n.kind === "topic" ? `topic/${n.key}` : n.kind === "course" ? `course/${n.key}` : `${n.kind}/${n.key}`;
  const t = trail.filter((x) => x !== n.id).slice(-3);
  return `#/${path}${t.length ? `?from=${t.join(",")}` : ""}`;
}

export function pathwaysFor(idx) {
  const courses = (idx?.courses || []).map((c) => ({ slug: c.s, name: c.n, site: c.site, page: c.u, lessons: (c.units || []).reduce((a, u) => a + (u[3]?.length || 0), 0) }));
  const g = buildGraph({ courses });
  const lessonTitle = new Map((idx?.courses || []).flatMap((c) => (c.units || []).flatMap((u) => (u[3] || []).map(([id, t]) => [`${c.s}:${id}`, { title: t, href: `${c.u}#/lesson/${id}`, unit: u[2] }]))));
  return { g, lessonTitle };
}

/** render a pathways page into root; returns its title, or null when the route isn't a pathways route */
export function renderPathway(root, hash, { g, lessonTitle, crumbs }) {
  const { parts, from } = parseRoute(hash), [view, a, b] = parts;
  const here = (id) => [...from, id];
  const node = (id) => g.get(id);
  const card = (n, { trail = from, href = hrefOf(n, trail), kicker = KINDS[n.kind].one, meta = n.sub, note = "", tag = "" } = {}) => {
    const c = (n.colour || KIND_COLOUR[n.kind] || "4641ff").replace("#", "");
    return `<a class="gx-pw-card g-gleam" href="${esc(href)}" style="--c:#${esc(c)}"><span class="gx-ex-tile" style="--tile:${tile(c)};--ink:${ink(c)}">${icon(n.icon || KIND_ICON[n.kind])}</span>
      <span class="gx-pw-t"><small>${esc(kicker)}${tag ? ` <em class="gx-pw-tag">${esc(tag)}</em>` : ""}</small><b>${esc(n.name)}</b>${meta ? `<span>${esc(meta)}</span>` : ""}${note ? `<i>${esc(note)}</i>` : ""}</span><span class="gx-pw-go" aria-hidden="true">${CHEV}</span></a>`;
  };
  const grid = (cards) => `<div class="gx-pw-grid">${cards.join("")}</div>`;
  const sec = (title, body, sub = "") => body ? `<section class="gx-ex-sec gx-pw-sec"><h2>${esc(title)}</h2>${sub ? `<p class="gx-ex-sub">${sub}</p>` : ""}${body}</section>` : "";
  const none = (title, body, actions = []) => emptyState({ icon: "search", title, body, actions, compact: true });
  const trailCrumbs = (current) => crumbs([["Gradify", "/"], ["Explore", "#/"], ["Pathways", "#/pathways"], ...from.map((id, i) => { const n = node(id); return n ? [n.name, hrefOf(n, from.slice(0, i))] : null; }).filter(Boolean), ...(current ? [[current, location.hash]] : [])]);
  const head = (n, extra = "") => `<header class="gx-pw-head"><span class="gx-ex-tile" style="--tile:${tile(n.colour || KIND_COLOUR[n.kind])};--ink:${ink(n.colour || KIND_COLOUR[n.kind])};width:56px;height:56px">${icon(n.icon || KIND_ICON[n.kind])}</span><div><span class="gx-kicker">${esc(KINDS[n.kind].one)}</span><h1>${esc(n.name)}</h1>${n.sub ? `<p>${esc(n.sub)}</p>` : ""}${extra}</div></header>`;
  const searchHtml = `<label class="gx-ex-search gx-pw-search">${uiIcon("search")}<input type="search" placeholder="A subject, exam board, qualification or country" aria-label="Search pathways"></label><div class="gx-pw-results" aria-live="polite"></div>`;
  const page = (crumb, html) => { root.innerHTML = `${trailCrumbs(crumb)}<div class="gx-pw">${html}</div>`; wirePwSearch(); };
  function wirePwSearch() {
    const input = root.querySelector(".gx-pw-search input"), outEl = root.querySelector(".gx-pw-results"); if (!input) return;
    const run = () => {
      const q = input.value.trim(), rest = root.querySelector(".gx-pw-body");
      if (q.length < 2) { outEl.innerHTML = ""; if (rest) rest.hidden = false; return; }
      const hits = g.search(q, { limit: 24 }); if (rest) rest.hidden = true;
      outEl.innerHTML = hits.length ? grid(hits.map((n) => card(n, { trail: [] }))) : none(`Nothing matches “${q}”`, "Try a subject (Biology), a board (AQA), a qualification (A level) or a country.");
    };
    input.addEventListener("input", run);
  }
  const list = (kind) => [...g.nodes.values()].filter((n) => n.kind === kind);
  const outs = (id, rel) => g.out(id, rel).map((e) => ({ e, n: node(e.to) })).filter((x) => x.n);

  // ---------- the start page and the lists ----------
  if (view === "pathways") {
    page(null, `<header class="gx-ex-head"><h1>Start anywhere</h1><p>Pick a subject, an exam board, a country, a stage or a profession, and follow it to everything it connects to.</p>${searchHtml}</header>
      <div class="gx-pw-body">${grid(STARTS.map(([v, t, s, i, c]) => card({ kind: "site", name: t, sub: s, icon: i, colour: c }, { href: `#/${v}`, kicker: "Start", meta: s })))}
      ${actionCard({ kicker: "At university?", title: "Add your own course and modules", why: "Universities and their modules aren't in Gradify's registry yet. Add yours in MyGradify, and your plan and revision follow it.", actions: [{ label: "Add your course", icon: "cap", href: "/app.html#/academic/1" }], cls: "gx-pw-act" })}</div>`);
    return "Pathways";
  }
  if (view === "subjects") {
    const subs = list("subject").sort((x, y) => x.name.localeCompare(y.name));
    page("Subjects", `<header class="gx-ex-head"><h1>Subjects</h1><p>Every subject Gradify teaches. Open one to see its qualifications, exam boards and courses.</p>${searchHtml}</header><div class="gx-pw-body">${grid(subs.map((n) => card(n, { trail: [], meta: `${g.out(n.id, "spec").length ? `${g.out(n.id, "spec").length} specifications · ` : ""}${n.sub}` })))}</div>`);
    return "Subjects";
  }
  if (view === "boards") {
    page("Exam boards", `<header class="gx-ex-head"><h1>Exam boards</h1><p>The awarding bodies in Gradify's registry, with the specifications it holds for each.</p>${searchHtml}</header><div class="gx-pw-body">${grid(list("body").map((n) => card(n, { trail: [], meta: `${n.sub} · ${g.out(n.id, "awards").length} specifications` })))}</div>`);
    return "Exam boards";
  }
  if (view === "countries") {
    const cs = list("country").filter((n) => n.key !== "INT").sort((x, y) => x.name.localeCompare(y.name)), intl = node("country:INT");
    page("Countries", `<header class="gx-ex-head"><h1>Countries</h1><p>Each country's education systems as they really are: nations, states and provinces have their own.</p>${searchHtml}</header><div class="gx-pw-body">${intl ? sec("International programmes", grid([card(intl, { trail: [] })])) : ""}${sec("Countries", grid(cs.map((n) => card(n, { trail: [] }))))}</div>`);
    return "Countries";
  }
  if (view === "stages") {
    page("Stages", `<header class="gx-ex-head"><h1>Stages</h1><p>From primary school to doctoral research and professional practice.</p>${searchHtml}</header><div class="gx-pw-body">${grid(list("stage").map((n) => card(n, { trail: [], meta: `${n.sub} · ${g.out(n.id, "award").length} qualifications` })))}</div>`);
    return "Stages";
  }
  if (view === "professions") {
    page("Professions", `<header class="gx-ex-head"><h1>Professions</h1><p>The regulators and professional bodies in the registry, and the standards they set.</p>${searchHtml}</header><div class="gx-pw-body">${grid(list("org").map((n) => card(n, { trail: [], meta: outs(n.id, "sets").map((x) => x.n.name).join(" · ") })))}</div>`);
    return "Professions";
  }

  // ---------- one node ----------
  const id = view === "topic" ? `topic:${a}/${b}` : `${view}:${a}`, n = node(id);
  if (!n || !KINDS[view]) {
    page("Not found", none("That isn't in the registry", "It may have moved. Start again from a subject, an exam board or a country.", [{ label: "Pathways", href: "#/pathways", primary: true }]));
    return "Pathways";
  }
  const trail = here(n.id), nav = (x, o = {}) => card(x, { trail, ...o });
  let body = "";

  if (n.kind === "subject") {
    const quals = subjectQualifications(g, n.key), qual = b ? node(`qualification:${b}`) : null;
    if (qual) {
      // Subject + qualification: every specification for it, by education system, so the learner picks their board
      const entry = quals.find((x) => x.qualification.id === qual.id), byJur = new Map();
      for (const s of entry?.specs || []) for (const j of jurisdictionsOf(g, s.id)) { if (!byJur.has(j.id)) byJur.set(j.id, { j, specs: [] }); byJur.get(j.id).specs.push(s); }
      page(`${n.name}: ${qual.name}`, `${head(n, `<p class="gx-pw-facts"><a href="${esc(hrefOf(qual, trail))}">${esc(qual.name)}</a>${qual.note ? ` · ${esc(qual.note)}` : ""}</p>`)}
        ${[...byJur.values()].map(({ j, specs }) => sec(j.name, grid(specs.map((s) => nav(s, { kicker: node(`body:${s.bodyKey}`)?.name || "Specification", meta: s.sub, tag: s.mastery ? "Mapped on Gradify" : "" }))))).join("") || none(`No ${qual.name} ${n.name} specifications in the registry yet`, "")}
        ${sec(`Other ways to study ${n.name}`, grid(quals.filter((x) => x.qualification.id !== qual.id).map((x) => nav(x.qualification, { href: `#/subject/${n.key}/${x.qualification.key}${from.length ? `?from=${from.join(",")}` : ""}`, kicker: "Qualification", meta: x.bodies.map((bd) => bd.name).join(", ") }))))}`);
      return `${n.name} ${qual.name}`;
    }
    const courses = outs(n.id, "taught-in"), related = outs(n.id, "related"), where = new Map();
    for (const { n: c } of courses) for (const { n: aw } of outs(c.id, "related-award")) if (!aw.type) where.set(aw.id, aw);
    body = `${head(n)}
      ${sec("Study it on Gradify", grid(courses.map(({ n: c }) => nav(c, { href: `#/course/${c.key}`, kicker: c.site, meta: `${c.lessons.toLocaleString()} lessons` }))))}
      ${sec("Qualifications and exam boards", quals.length ? grid(quals.map((x) => nav(x.qualification, { href: `#/subject/${n.key}/${x.qualification.key}?from=${trail.slice(-3).join(",")}`, kicker: x.qualification.sub, meta: x.bodies.map((bd) => bd.name).join(", ") })))
        : none(`No ${n.name} specifications in the registry yet`, `Gradify's own ${n.name.toLowerCase()} course is ready to study. Exam-board specifications are added as they're checked.`), quals.length ? "Pick a qualification to choose your exam board." : "")}
      ${sec("Related subjects", grid(related.map(({ e, n: r }) => nav(r, { meta: e.note }))))}
      ${sec("Also studied for", grid([...where.values()].slice(0, 12).map((aw) => nav(aw, { kicker: aw.country, meta: aw.sub }))), "Qualifications elsewhere whose subjects this course relates to. Related isn't mapped: check your own specification.")}`;
  } else if (n.kind === "body") {
    const quals = bodyQualifications(g, n.key);
    body = `${head(n, `<p class="gx-pw-facts">${outs(n.id, "in").map(({ n: j }) => `<a href="${esc(hrefOf(j, trail))}">${esc(j.name)}</a>`).join(" · ")}${n.url ? ` · <a href="${esc(n.url)}" target="_blank" rel="noopener">Official site ↗</a>` : ""}</p>`)}
      ${quals.length ? quals.map(({ qualification: q, specs }) => sec(q.name, grid(specs.map((s) => nav(s, { kicker: node(`subject:${s.subjectKey}`)?.name || "Specification", tag: s.mastery ? "Mapped on Gradify" : "" }))))).join("")
        : none(`No ${n.name} specifications in the registry yet`, "Specifications are added as they're checked against the board's own documents.")}
      <p class="gx-pw-honest">Shows only the specifications in Gradify's registry. ${esc(n.name)} offers more subjects than are listed here.</p>`;
  } else if (n.kind === "qualification") {
    const juris = outs(n.id, "in"), specs = outs(n.id, "spec").map((x) => x.n), subs = [...new Set(specs.map((s) => s.subjectKey))].map((k) => node(`subject:${k}`)).filter(Boolean);
    const bodies = [...new Set(specs.map((s) => s.bodyKey))].map((k) => node(`body:${k}`));
    body = `${head(n, n.note ? `<p class="gx-pw-facts">${esc(n.note)}</p>` : "")}
      ${sec("Where it's taken", grid(juris.map(({ n: j }) => nav(j))))}
      ${sec("Subjects", subs.length ? grid(subs.map((s) => nav(s, { href: `#/subject/${s.key}/${n.key}?from=${trail.slice(-3).join(",")}`, meta: `${specs.filter((x) => x.subjectKey === s.key).length} specifications` }))) : none(`No ${n.name} specifications in the registry yet`, ""))}
      ${sec("Exam boards", grid(bodies.map((bd) => nav(bd))))}`;
  } else if (n.kind === "award") {
    const jur = outs(n.id, "in")[0]?.n, type = outs(n.id, "is")[0]?.n, stage = outs(n.id, "stage")[0]?.n, org = outs(n.id, "set-by")[0]?.n, rel = outs(n.id, "related-course");
    body = `${head(n, `<p class="gx-pw-facts">${[n.body && `Set or awarded by ${esc(n.body)}`, n.url && `<a href="${esc(n.url)}" target="_blank" rel="noopener">Official site ↗</a>`].filter(Boolean).join(" · ")}</p>`)}
      ${type ? actionCard({ kicker: "Choose your exam board", title: `${type.name} specifications, subject by subject`, why: `See the ${type.name} specifications in the registry and choose your board.`, actions: [{ label: `Open ${type.name}`, icon: "award", href: hrefOf(type, trail) }], art: false, cls: "compact gx-pw-act" }) : ""}
      ${sec("Where it sits", grid([jur && nav(jur), stage && nav(stage), org && nav(org)].filter(Boolean)))}
      ${sec("Related Gradify courses", grid(rel.map(({ e, n: c }) => nav(c, { href: `#/course/${c.key}`, kicker: c.site, meta: `${c.lessons.toLocaleString()} lessons`, tag: CLAIM[e.claim] || "Related, not mapped" }))), "Related means the course covers subjects this qualification includes. Only a verified mapping means it covers the qualification itself.")}
      <p class="gx-pw-honest">${n.checked ? `Checked against the official source on ${esc(n.checked)}.` : "Listed from public information; not yet checked against the official source."} <a href="/app.html#/curriculum">Choose it as what you're studying →</a></p>`;
  } else if (n.kind === "country") {
    body = `${head(n)}${sec("Education systems", grid(outs(n.id, "has").map(({ n: j }) => nav(j, { meta: `${g.out(j.id, "offers").length} qualifications` }))))}`;
  } else if (n.kind === "jurisdiction") {
    const country = outs(n.id, "in")[0]?.n, awards = outs(n.id, "offers").map((x) => x.n), bodies = outs(n.id, "body").map((x) => x.n);
    body = `${head(n, country ? `<p class="gx-pw-facts"><a href="${esc(hrefOf(country, trail))}">${esc(country.name)}</a></p>` : "")}
      ${sec("Qualifications", grid(awards.map((aw) => { const t = aw.type && node(`qualification:${aw.type}`); return nav(aw, { href: t ? hrefOf(t, trail) : hrefOf(aw, trail), kicker: aw.qkind ? aw.qkind.replace(/-/g, " ") : "Qualification", meta: aw.sub }); })))}
      ${sec("Exam boards", grid(bodies.map((bd) => nav(bd, { meta: `${g.out(bd.id, "awards").length} specifications in the registry` }))))}`;
  } else if (n.kind === "spec") {
    const bd = node(`body:${n.bodyKey}`), q = node(`qualification:${n.qualKey}`), subj = node(`subject:${n.subjectKey}`), juris = jurisdictionsOf(g, n.id), alts = alternatives(g, n.key);
    const mapped = g.out(n.id, "mapped-to")[0], course = mapped && node(mapped.to), topics = outs(n.id, "topic").map((x) => x.n);
    const status = n.mastery ? `${n.mastery.points} points mapped to Gradify's lessons · ${mapped?.note || ""}` : n.confirmed ? "Code and version checked against the board's document · not yet mapped to lessons" : "Listed from public information · not yet checked or mapped";
    body = `${head(n, `<p class="gx-pw-facts">${[bd && `<a href="${esc(hrefOf(bd, trail))}">${esc(bd.name)}</a>`, q && `<a href="${esc(hrefOf(q, trail))}">${esc(q.name)}</a>`, subj && `<a href="${esc(hrefOf(subj, trail))}">${esc(subj.name)}</a>`, ...juris.map((j) => `<a href="${esc(hrefOf(j, trail))}">${esc(j.name)}</a>`)].filter(Boolean).join(" · ")}</p><p class="gx-pw-status">${esc(status)}</p>`)}
      ${course && n.mastery ? actionCard({ kicker: "Your specification", title: `Specification Mastery for ${n.name}`, why: "Every point of the specification, and how far your own answers show you can meet it.", actions: [{ label: "Open Specification Mastery", icon: "checklist", href: `${course.page}#/spec` }, { label: "Open the course", soft: true, href: course.page }], art: false, cls: "compact gx-pw-act" }) : ""}
      ${sec("Topics", topics.length ? grid(topics.map((t) => nav(t, { kicker: `Topic ${t.ref}`, meta: `${t.points} points · ${t.lessons.length} lessons` }))) : none("Not mapped to Gradify's lessons yet", subj ? `Gradify's ${subj.name.toLowerCase()} lessons are ready to study; this specification's points haven't been mapped to them yet.` : "", course || subj ? [{ label: `Study ${subj?.name || "the subject"}`, href: subj ? hrefOf(subj, trail) : "#/pathways", primary: true }] : []))}
      ${sec("Switch to another board", grid(alts.map((s) => nav(s, { trail: from, kicker: node(`body:${s.bodyKey}`)?.name || "Specification", meta: jurisdictionsOf(g, s.id).map((j) => j.name).join(", "), tag: s.mastery ? "Mapped on Gradify" : "" }))), alts.length ? "Other specifications for the same subject and qualification. They ask for different things: your progress stays with the lessons you've done, and nothing moves when you switch." : "")}
      ${n.source ? `<p class="gx-pw-honest"><a href="${esc(n.source)}" target="_blank" rel="noopener">The board's specification ↗</a></p>` : ""}`;
  } else if (n.kind === "topic") {
    const spec = outs(n.id, "of")[0]?.n, course = spec && node(`course:${n.course}`);
    const lessons = n.lessons.map((ref) => ({ ref, ...(lessonTitle.get(ref) || {}) })).filter((l) => l.title);
    body = `${head(n, spec ? `<p class="gx-pw-facts"><a href="${esc(hrefOf(spec, trail))}">${esc(spec.name)}</a></p>` : "")}
      ${course ? actionCard({ kicker: "This topic", title: `${n.points} points in ${spec?.name || "the specification"}`, why: "See each point, the lessons that teach it and how far your answers show you know it.", actions: [{ label: "Open the topic", icon: "checklist", href: `${course.page}#/spec/${n.ref}` }], art: false, cls: "compact gx-pw-act" }) : ""}
      ${sec("Lessons", lessons.length ? `<ol class="gx-pw-lessons">${lessons.map((l) => `<li><a href="${esc(l.href)}"><b>${esc(l.title)}</b><small>${esc(l.unit || "")}</small></a></li>`).join("")}</ol>` : none("No lessons mapped to this topic yet", ""))}`;
  } else if (n.kind === "org") {
    body = `${head(n)}${sec("Standards and qualifications", grid(outs(n.id, "sets").map(({ n: aw }) => nav(aw, { kicker: aw.country, meta: aw.ages ? `For: ${aw.ages}` : aw.sub }))))}
      <p class="gx-pw-honest">Individual competencies aren't in Gradify's registry yet. Gradify's courses help you study; they don't grant registration or a licence to practise.</p>`;
  } else if (n.kind === "stage") {
    const awards = outs(n.id, "award").map((x) => x.n), courses = outs(n.id, "course").map((x) => x.n), byCountry = new Map();
    for (const aw of awards) { if (!byCountry.has(aw.country)) byCountry.set(aw.country, []); byCountry.get(aw.country).push(aw); }
    body = `${head(n)}
      ${sec("Gradify courses for this stage", grid(courses.map((c) => nav(c, { href: `#/course/${c.key}`, kicker: c.site, meta: `${c.lessons.toLocaleString()} lessons` }))))}
      ${n.key === "undergraduate" || n.key === "postgraduate" ? actionCard({ kicker: "Your university", title: "Add your own course and modules", why: "Universities, programmes and modules aren't in Gradify's registry yet. Add yours, and your plan and revision follow it.", actions: [{ label: "Add your course", icon: "cap", href: "/app.html#/academic/1" }], cls: "gx-pw-act" }) : ""}
      ${[...byCountry].map(([c, list]) => sec(c, grid(list.map((aw) => { const t = aw.type && node(`qualification:${aw.type}`); return nav(aw, { href: t ? hrefOf(t, trail) : hrefOf(aw, trail), kicker: aw.system, meta: aw.ages ? `Ages ${aw.ages}` : "" }); })))).join("")
        || (courses.length ? "" : none(`Nothing for ${n.name.toLowerCase()} in the registry yet`, "Qualifications and courses for this stage are added as they're checked."))}`;
  } else {
    page(n.name, none("That isn't in the registry", "", [{ label: "Pathways", href: "#/pathways", primary: true }]));
    return n.name;
  }
  page(n.name, body);
  return n.name;
}

/** pathway hits for Explore's own search box: subjects, boards, qualifications, countries and professional bodies */
export function pathwayHits(g, q, limit = 6) {
  return g.search(q, { limit, kinds: ["subject", "body", "qualification", "country", "jurisdiction", "award", "spec", "org", "stage"] });
}
