// The curriculum graph: every registry Gradify keeps, joined into one set of real relationships, so a learner can
// start anywhere (a subject, an exam board, a country, a qualification, a stage, a professional body, a lesson) and
// reach everything connected to it. Explore's pathways (kit/ui/pathways.js) draw it; nothing here is invented.
//
// It's a graph, not a hierarchy: Biology belongs to several qualifications, boards, countries and stages at once.
// Every edge names the registry it comes from (`src`), and tests check each one against that registry:
//   kit/curriculum/world.js     country → jurisdiction → qualification (as each country names it), with its stage, body
//                               and the Gradify courses that relate to it (related, not mapped)
//   kit/curriculum/uk.js        UK qualification types, awarding bodies and individual specifications (Biology so far)
//   kit/curriculum/coverage.js  how strong each course's claim to a qualification is
//   kit/specs/                  specifications mapped point by point for Specification Mastery, with their topics
//   kit/curriculum/subjects.js  subjects, stages and related subjects
//   kit/api/v1/catalogue.json   courses and the site each lives on (passed in: this file never fetches)
//
//   const g = buildGraph({ courses });       courses: catalogue.json's `courses`
//   g.get("subject:biology")                 a node: { id, kind, key, name, sub, ... }
//   g.out(id, rel?) / g.in(id, rel?)         edges from / to a node: [{ from, rel, to, src, note? }]
//   g.search("aqa")                          nodes matching words, best first, each with its context
//   g.check()                                [] or problems (tests)
// Node ids are "<kind>:<key>". Kinds: country, jurisdiction, award (a qualification as one country names it),
// qualification (a UK qualification type: GCSE, A level...), body (awarding body), org (professional or other body),
// spec (one specification), topic (a mapped specification's topic), subject, course, site, stage.
import { WORLD, qualifications } from "./world.js";
import { NATIONS, BODIES, QUAL_TYPES, SPECS as UK_SPECS, nationsOf } from "./uk.js";
import { COURSES as COVERAGE, STATUS } from "./coverage.js";
import { SPECS as MAPPED, pointsOf } from "../specs/index.js";
import { SUBJECTS, RELATED, STAGES, stageOfLevel } from "./subjects.js";
import { GROUPS } from "../core/sites.js";

export const KINDS = {
  country: { one: "Country", many: "Countries" },
  jurisdiction: { one: "Education system", many: "Education systems" },
  award: { one: "Qualification", many: "Qualifications" },
  qualification: { one: "Qualification", many: "Qualifications" },
  body: { one: "Exam board", many: "Exam boards" },
  org: { one: "Professional body", many: "Professional bodies" },
  spec: { one: "Specification", many: "Specifications" },
  topic: { one: "Topic", many: "Topics" },
  subject: { one: "Subject", many: "Subjects" },
  course: { one: "Gradify course", many: "Gradify courses" },
  site: { one: "Gradify site", many: "Gradify sites" },
  stage: { one: "Stage", many: "Stages" },
};
const slug = (s) => String(s).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const norm = (s) => String(s ?? "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
const SITES = GROUPS.flatMap((g) => g.items);

export function buildGraph({ courses = [] } = {}) {
  const nodes = new Map(), out = new Map(), inn = new Map(), edges = [];
  const add = (kind, key, o) => { const id = `${kind}:${key}`; if (!nodes.has(id)) nodes.set(id, { id, kind, key, ...o }); return id; };
  const link = (from, rel, to, src, note) => {
    if (!nodes.has(from) || !nodes.has(to)) return;
    if ((out.get(from) || []).some((e) => e.rel === rel && e.to === to)) return;
    const e = { from, rel, to, src, ...(note ? { note } : {}) };
    edges.push(e); (out.get(from) || out.set(from, []).get(from)).push(e); (inn.get(to) || inn.set(to, []).get(to)).push(e);
  };

  // sites and courses (catalogue.json, sites.js)
  for (const s of SITES) add("site", slug(s.n), { name: s.n, sub: s.who || "", colour: s.c, icon: s.i, status: s.status, path: s.n });
  for (const c of courses) {
    const site = SITES.find((s) => s.n === c.site);
    add("course", c.slug, { name: c.name, sub: `${c.site} · ${(c.lessonsWritten ?? c.lessons ?? 0).toLocaleString()} lessons`, colour: site?.c, icon: site?.i, page: c.page, site: c.site, lessons: c.lessonsWritten ?? c.lessons ?? 0 });
    if (site) link(`course:${c.slug}`, "on", `site:${slug(site.n)}`, "catalogue.json");
  }
  const courseOf = (slugName) => (nodes.has(`course:${slugName}`) ? `course:${slugName}` : null);

  // subjects, related subjects and stages (subjects.js)
  for (const s of SUBJECTS) {
    const first = s.courses.map(courseOf).find(Boolean), n = first && nodes.get(first);
    add("subject", s.id, { name: s.name, sub: s.courses.map((c) => nodes.get(`course:${c}`)?.site).filter(Boolean).join(", "), colour: n?.colour, icon: n?.icon, aliases: s.aliases || [], uk: s.uk || null });
    for (const c of s.courses) link(`subject:${s.id}`, "taught-in", `course:${c}`, "subjects.js");
  }
  for (const [a, b, why] of RELATED) { link(`subject:${a}`, "related", `subject:${b}`, "subjects.js", why); link(`subject:${b}`, "related", `subject:${a}`, "subjects.js", why); }
  for (const st of STAGES) {
    add("stage", st.id, { name: st.name, sub: `Ages ${st.ages}`, levels: st.levels });
    for (const c of st.courses) link(`stage:${st.id}`, "course", `course:${c}`, "subjects.js");
  }

  // countries, jurisdictions and their qualifications (world.js)
  for (const c of WORLD) {
    const cid = add("country", c.iso, { name: c.country, sub: c.systems.map((s) => s.name).join(" · "), iso: c.iso });
    for (const s of c.systems) {
      const jid = add("jurisdiction", s.id, { name: s.name, sub: s.regulator ? `Regulator: ${s.regulator}` : c.country, country: c.country, regulator: s.regulator || null });
      link(cid, "has", jid, "world.js"); link(jid, "in", cid, "world.js");
    }
  }
  for (const q of qualifications()) {
    const aid = add("award", q.id, { name: q.name, sub: [q.system, q.ages && `ages ${q.ages}`].filter(Boolean).join(" · "), body: q.body, ages: q.ages, level: q.level, qkind: q.kind, url: q.url, checked: q.checked, country: q.country, system: q.system, type: q.type || null, coverage: q.coverage || null });
    link(`jurisdiction:${q.systemId}`, "offers", aid, "world.js"); link(aid, "in", `jurisdiction:${q.systemId}`, "world.js");
    const st = stageOfLevel(q.level); if (st) { link(aid, "stage", `stage:${st.id}`, "world.js"); link(`stage:${st.id}`, "award", aid, "world.js"); }
    for (const g of q.gradify) { const cn = courseOf(g); if (cn) { link(aid, "related-course", cn, "world.js"); link(cn, "related-award", aid, "world.js"); } }
    // professional and licensing qualifications are set by the named regulator or professional body (one entry, even
    // when it names a partnership, such as "FSMB and NBME" for the USMLE; a list separated by commas is several bodies)
    if (q.kind === "professional" && q.body && !/[,;]/.test(q.body)) {
      const oid = add("org", slug(q.body), { name: q.body, sub: `${q.country}` });
      link(oid, "sets", aid, "world.js"); link(aid, "set-by", oid, "world.js");
    }
  }

  // UK qualification types, awarding bodies and specifications (uk.js); a nation is the world.js jurisdiction of that name
  const jurOfNation = (n) => [...nodes.values()].find((x) => x.kind === "jurisdiction" && x.country === "United Kingdom" && x.name === NATIONS[n]?.name)?.id || null;
  for (const [k, q] of Object.entries(QUAL_TYPES)) {
    const qid = add("qualification", k, { name: q.name, sub: q.nations.map((n) => NATIONS[n].name).join(", "), note: q.note || "" });
    for (const n of q.nations) { const j = jurOfNation(n); if (j) { link(qid, "in", j, "uk.js"); link(j, "has-qualification", qid, "uk.js"); } }
  }
  for (const a of nodes.values()) if (a.kind === "award" && a.type && nodes.has(`qualification:${a.type}`)) { link(a.id, "is", `qualification:${a.type}`, "world.js"); link(`qualification:${a.type}`, "as", a.id, "world.js"); }
  for (const [k, b] of Object.entries(BODIES)) {
    const bid = add("body", k, { name: b.name, sub: b.nations.map((n) => NATIONS[n].name).join(", "), url: b.site });
    for (const n of b.nations) { const j = jurOfNation(n); if (j) { link(bid, "in", j, "uk.js"); link(j, "body", bid, "uk.js"); } }
  }
  for (const s of UK_SPECS) {
    const subj = SUBJECTS.find((x) => x.uk === s.subject), sid = add("spec", s.id, { name: s.title, sub: [s.code && `Code ${s.code}`, s.firstTeaching && `first taught ${s.firstTeaching}`].filter(Boolean).join(" · "), code: s.code, confirmed: s.confirmed, statements: s.statements, source: s.source || null, note: s.note || null, bodyKey: s.body, qualKey: s.qual, subjectKey: subj?.id || null });
    link(sid, "by", `body:${s.body}`, "uk.js"); link(`body:${s.body}`, "awards", sid, "uk.js");
    link(sid, "for", `qualification:${s.qual}`, "uk.js"); link(`qualification:${s.qual}`, "spec", sid, "uk.js");
    if (subj) { link(sid, "of", `subject:${subj.id}`, "uk.js"); link(`subject:${subj.id}`, "spec", sid, "uk.js"); }
    for (const n of nationsOf(s)) { const j = jurOfNation(n); if (j) link(sid, "in", j, "uk.js"); }
  }

  // specifications mapped point by point (kit/specs), matched to their uk.js entry by board and code
  for (const m of MAPPED) {
    const uk = UK_SPECS.find((s) => m.code && s.code === m.code && BODIES[s.body]?.name === m.board);
    const sid = uk ? `spec:${uk.id}` : add("spec", m.id, { name: m.title, sub: m.code ? `Code ${m.code}` : "", code: m.code });
    const sn = nodes.get(sid); sn.mastery = { id: m.id, course: m.course, wording: m.wording, verified: m.verified, points: pointsOf(m).length };
    if (courseOf(m.course)) { link(sid, "mapped-to", `course:${m.course}`, "kit/specs", m.verified ? "Verified point by point" : "Mapped point by point, not yet verified"); link(`course:${m.course}`, "maps", sid, "kit/specs"); }
    for (const t of m.topics) {
      const lessons = t.groups.flatMap((g) => g.points.flatMap((p) => [...p.lessons, ...(p.partial || [])])).map((ref) => (String(ref).includes(":") ? ref : `${m.course}:${ref}`));
      const tid = add("topic", `${m.id}/${t.id}`, { name: t.title, sub: `${m.board} ${m.subject} ${t.id}`, ref: t.id, spec: m.id, course: m.course, points: t.groups.reduce((a, g) => a + g.points.length, 0), lessons: [...new Set(lessons)] });
      link(sid, "topic", tid, "kit/specs"); link(tid, "of", sid, "kit/specs");
    }
  }

  // each course's claim to a qualification (coverage.js), on the qualifications world.js names with that coverage code
  for (const [slugName, c] of Object.entries(COVERAGE)) for (const s of c.serves) {
    if (!s.q || !courseOf(slugName)) continue;
    for (const a of nodes.values()) if (a.kind === "award" && a.coverage === s.q) { const e = (out.get(a.id) || []).find((x) => x.rel === "related-course" && x.to === `course:${slugName}`); if (e) e.claim = s.status; }
  }

  const get = (id) => nodes.get(id) || null;
  const outOf = (id, rel) => (out.get(id) || []).filter((e) => !rel || e.rel === rel);
  const inOf = (id, rel) => (inn.get(id) || []).filter((e) => !rel || e.rel === rel);
  /** every node matching the words, best first; each hit carries a context line (its country, board or site) */
  function search(q, { limit = 20, kinds = null } = {}) {
    const words = norm(q).split(" ").filter(Boolean); if (!words.length) return [];
    const hits = [];
    for (const n of nodes.values()) {
      if (kinds && !kinds.includes(n.kind)) continue;
      const name = norm(n.name), hay = `${name} ${norm((n.aliases || []).join(" "))} ${norm(n.code || "")} ${norm(KINDS[n.kind].one)}`;
      if (!words.every((w) => hay.includes(w))) continue;
      const exact = name === norm(q) || (n.aliases || []).some((a) => norm(a) === norm(q)), starts = name.startsWith(words[0]);
      const weight = { subject: 6, body: 6, qualification: 5, country: 5, org: 4, spec: 4, jurisdiction: 3, award: 3, stage: 3, course: 2, topic: 1, site: 1 }[n.kind];
      hits.push({ node: n, score: (exact ? 100 : 0) + (starts ? 20 : 0) + weight - name.length / 100 });
    }
    return hits.sort((a, b) => b.score - a.score).slice(0, limit).map((h) => h.node);
  }
  function check() {
    const p = [];
    for (const e of edges) { if (!e.src) p.push(`${e.from} ${e.rel} ${e.to}: no source`); }
    for (const n of nodes.values()) if (!n.name) p.push(`${n.id}: no name`);
    // a body is shown under a subject or qualification only through a specification it publishes
    for (const e of edges.filter((x) => x.rel === "awards")) if (nodes.get(e.to)?.kind !== "spec") p.push(`${e.from} awards ${e.to}: not a specification`);
    return p;
  }
  return { nodes, edges, get, out: outOf, in: inOf, search, check, STATUS };
}

// ---------- views of the graph the pages use (pure) ----------
/** the specifications of a subject, by qualification, each qualification's specs grouped by jurisdiction */
export function subjectQualifications(g, subjectId) {
  const specs = g.out(`subject:${subjectId}`, "spec").map((e) => g.get(e.to)), by = new Map();
  for (const s of specs) { const q = `qualification:${s.qualKey}`; if (!by.has(q)) by.set(q, []); by.get(q).push(s); }
  return [...by].map(([q, list]) => ({ qualification: g.get(q), specs: list, bodies: [...new Set(list.map((s) => s.bodyKey))].map((b) => g.get(`body:${b}`)) }));
}
/** what a body publishes: qualification → subjects → specifications */
export function bodyQualifications(g, bodyKey) {
  const specs = g.out(`body:${bodyKey}`, "awards").map((e) => g.get(e.to)), by = new Map();
  for (const s of specs) { const q = `qualification:${s.qualKey}`; if (!by.has(q)) by.set(q, []); by.get(q).push(s); }
  return [...by].map(([q, list]) => ({ qualification: g.get(q), specs: list }));
}
/** the other specifications for the same subject and qualification (another board, or a sibling route) */
export function alternatives(g, specKey) {
  const s = g.get(`spec:${specKey}`); if (!s) return [];
  return g.out(`subject:${s.subjectKey}`, "spec").map((e) => g.get(e.to)).filter((x) => x.id !== s.id && x.qualKey === s.qualKey);
}
/** jurisdictions a specification is taken in */
export const jurisdictionsOf = (g, id) => g.out(id, "in").map((e) => g.get(e.to)).filter((n) => n?.kind === "jurisdiction");
