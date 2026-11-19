// The curriculum engine: resolves the knowledge base (kit/curriculum/knowledge.js) against Gradify's lessons. Pure
// functions over data: nothing here reads files, writes files or changes a record, so the same code runs in tests,
// in scripts/curriculum.mjs and in the browser.
//
//   validate(kb, lessons)           → problems: broken references, cycles, unsupported claims, missing lessons
//   pathwaysFor(kb, conceptId)      → every specification outcome that needs the concept
//   lessonsFor(kb, conceptId)       → every lesson bound to the concept
//   coverage(kb, specId, lessons)   → for each outcome: covered, partial, pitched above or below, a gap, or no course
//   impact(kb, conceptId, lessons)  → what a change to the concept affects, and what each affected lesson needs
//   consistency(kb, lessons)        → terminology and level findings across every bound lesson
//   summary(kb, lessons)            → the counts for a coverage dashboard
//
// `lessons` is a Map of "course/lessonId" → { course, id, title, hash, text } (scripts/curriculum.mjs loadLessons
// builds it from the courses). Without it, the checks that need lesson content are skipped and say so.
//
// Findings use the classes the content audit uses: "error" (a confirmed factual error), "gap" (something required is
// missing), "editorial" (an optional improvement) and "curriculum-dependent" (right or wrong depending on the
// learner's specification). The engine only finds the last three mechanically. It never declares a factual error and
// never edits a lesson: a person or a research step with sources decides that.
import { BANDS, ROLES, CLAIMS, FITS, bandRank, checkConcept, checkSystem, checkSpec } from "./schema.js";
import { QUALIFICATIONS, SYSTEMS as COVERAGE_SYSTEMS } from "./coverage.js";

const key = (course, lesson) => `${course}/${lesson}`;
const okey = (spec, outcome) => `${spec}#${outcome}`;

/** Lookup tables for a knowledge base. */
export function indexOf(kb) {
  const by = (list, f) => { const m = new Map(); for (const x of list) { const k = f(x); if (!m.has(k)) m.set(k, []); m.get(k).push(x); } return m; };
  const concept = new Map(kb.concepts.map((c) => [c.id, c]));
  const spec = new Map(kb.specs.map((s) => [s.id, s]));
  const system = new Map(kb.systems.map((s) => [s.id, s]));
  const outcome = new Map(kb.specs.flatMap((s) => s.outcomes.map((o) => [okey(s.id, o.id), { ...o, spec: s.id }])));
  return {
    concept, spec, system, outcome,
    bindingsByConcept: by(kb.lessonMaps, (b) => b.concept),
    bindingsByCourse: by(kb.lessonMaps, (b) => b.course),
    mapsByConcept: new Map(kb.concepts.map((c) => [c.id, kb.outcomeMaps.filter((m) => m.concepts.includes(c.id))])),
    mapsByOutcome: by(kb.outcomeMaps, (m) => okey(m.spec, m.outcome)),
    pathwaysBySpec: by(kb.pathways, (p) => p.spec),
    directByOutcome: by(kb.outcomeLessons || [], (m) => okey(m.spec, m.outcome)),
  };
}

/** Concepts that build on `id`, directly or not (from prerequisites). */
export function dependents(kb, id) {
  const out = new Set(), todo = [id];
  while (todo.length) { const cur = todo.pop(); for (const c of kb.concepts) if (c.prerequisites.includes(cur) && !out.has(c.id)) { out.add(c.id); todo.push(c.id); } }
  return [...out];
}

function prerequisiteCycles(kb) {
  const cycles = [], state = new Map(), byId = new Map(kb.concepts.map((c) => [c.id, c]));
  const visit = (id, path) => {
    if (state.get(id) === "done") return;
    if (state.get(id) === "open") { cycles.push([...path.slice(path.indexOf(id)), id]); return; }
    state.set(id, "open");
    for (const p of byId.get(id)?.prerequisites || []) if (byId.has(p)) visit(p, [...path, id]);
    state.set(id, "done");
  };
  for (const c of kb.concepts) visit(c.id, []);
  return cycles;
}

/** Every problem with the knowledge base, as readable lines. [] means it is sound. */
export function validate(kb, lessons = null) {
  const p = [], ix = indexOf(kb);
  const dup = (list, f, what) => { const seen = new Set(); for (const x of list) { const k = f(x); if (seen.has(k)) p.push(`duplicate ${what}: ${k}`); seen.add(k); } };
  dup(kb.concepts, (c) => c.id, "concept id");
  dup(kb.systems, (s) => s.id, "system id");
  dup(kb.specs, (s) => s.id, "specification id");
  dup(kb.lessonMaps, (b) => `${key(b.course, b.lesson)} → ${b.concept}`, "lesson binding");
  dup(kb.outcomeMaps, (m) => okey(m.spec, m.outcome), "outcome mapping");
  // one canonical record per idea: two concepts with the same title in a subject are almost always a duplicate
  dup(kb.concepts, (c) => `${c.subject}: ${c.title.toLowerCase()}`, "concept title");

  for (const c of kb.concepts) {
    p.push(...checkConcept(c));
    for (const r of [...c.prerequisites, ...c.related]) if (!ix.concept.has(r)) p.push(`${c.id}: refers to unknown concept ${r}`);
    if (c.prerequisites.includes(c.id)) p.push(`${c.id}: is its own prerequisite`);
  }
  for (const cyc of prerequisiteCycles(kb)) p.push(`prerequisite cycle: ${cyc.join(" → ")}`);

  const coverageSystems = new Set(COVERAGE_SYSTEMS.map((s) => s.id));
  for (const s of kb.systems) {
    p.push(...checkSystem(s));
    if (!coverageSystems.has(s.id)) p.push(`${s.id}: not a system in kit/curriculum/coverage.js`);
    for (const st of s.stages) for (const q of st.qualifications || []) if (!QUALIFICATIONS[q]) p.push(`${s.id}/${st.id}: unknown qualification ${q}`);
  }
  for (const s of kb.specs) {
    p.push(...checkSpec(s));
    const sys = ix.system.get(s.system);
    if (!sys) { p.push(`${s.id}: unknown system ${s.system}`); continue; }
    if (s.qualification && !QUALIFICATIONS[s.qualification]) p.push(`${s.id}: unknown qualification ${s.qualification}`);
    for (const st of s.stages || []) {
      const stage = sys.stages.find((x) => x.id === st);
      if (!stage) p.push(`${s.id}: ${s.system} has no stage ${st}`);
      else if (stage.band !== s.band) p.push(`${s.id}: stage ${st} is ${stage.band}, but the specification is ${s.band}`);
    }
  }
  for (const m of kb.outcomeMaps) {
    const w = `outcome mapping ${okey(m.spec, m.outcome)}`;
    if (!ix.spec.has(m.spec)) p.push(`${w}: unknown specification`);
    else if (!ix.outcome.has(okey(m.spec, m.outcome))) p.push(`${w}: the specification has no such outcome`);
    if (!m.concepts?.length) p.push(`${w}: maps to no concept`);
    for (const c of m.concepts || []) if (!ix.concept.has(c)) p.push(`${w}: unknown concept ${c}`);
    if (!CLAIMS.includes(m.claim)) p.push(`${w}: unknown claim ${m.claim}`);
    if (m.claim === "verified" && !(m.reviewed?.by && m.reviewed?.on)) p.push(`${w}: "verified" needs reviewed.by and reviewed.on`);
    if (m.claim === "verified" && !ix.spec.get(m.spec)?.checked) p.push(`${w}: can't be verified while the specification itself is unchecked`);
  }
  dup(kb.outcomeLessons || [], (m) => okey(m.spec, m.outcome), "direct outcome mapping");
  for (const m of kb.outcomeLessons || []) {
    const w = `direct mapping ${okey(m.spec, m.outcome)}`;
    if (!ix.outcome.has(okey(m.spec, m.outcome))) p.push(`${w}: no such specification outcome`);
    if (!Array.isArray(m.lessons)) p.push(`${w}: lessons must be a list (empty means a known gap)`);
    for (const l of m.lessons || []) {
      if (!FITS.includes(l.fit)) p.push(`${w}: unknown fit ${l.fit}`);
      if (lessons && !lessons.has(key(l.course, l.lesson))) p.push(`${w}: no written lesson ${key(l.course, l.lesson)}`);
    }
    if (!(m.mapped?.on && m.mapped?.by)) p.push(`${w}: mapped needs on and by (a person or "automated")`);
  }
  for (const b of kb.lessonMaps) {
    const w = `binding ${key(b.course, b.lesson)} → ${b.concept}`;
    if (!ix.concept.has(b.concept)) p.push(`${w}: unknown concept`);
    if (!ROLES.includes(b.role)) p.push(`${w}: unknown role ${b.role}`);
    if (!BANDS.includes(b.band)) p.push(`${w}: unknown band ${b.band}`);
    if (!Number.isInteger(b.checked?.conceptVersion) || !b.checked?.lessonHash) p.push(`${w}: checked needs conceptVersion and lessonHash`);
    if (lessons && !lessons.has(key(b.course, b.lesson))) p.push(`${w}: no such lesson with written notes`);
  }
  for (const pw of kb.pathways) {
    if (!ix.spec.has(pw.spec)) p.push(`pathway ${pw.course} → ${pw.spec}: unknown specification`);
    if (!CLAIMS.includes(pw.claim)) p.push(`pathway ${pw.course} → ${pw.spec}: unknown claim ${pw.claim}`);
  }
  return p;
}

/** Where a binding stands against the current concept and lesson. */
export function bindingState(kb, b, lessons = null) {
  const c = indexOf(kb).concept.get(b.concept), L = lessons?.get(key(b.course, b.lesson));
  const reasons = [];
  if (lessons && !L) return { state: "lesson-missing", reasons: ["The lesson no longer exists or has no notes."] };
  if (c && c.version !== b.checked.conceptVersion) reasons.push(`The concept changed since this lesson was checked (version ${b.checked.conceptVersion} → ${c.version}): ${c.changelog.filter((x) => x.version > b.checked.conceptVersion).map((x) => x.change).join(" ")}`);
  if (L && L.hash !== b.checked.lessonHash) reasons.push("The lesson changed since its binding was checked: confirm it still teaches this concept at this band.");
  const state = !reasons.length ? "current" : c && c.version !== b.checked.conceptVersion ? "concept-changed" : "lesson-changed";
  return { state, reasons, confirmed: Boolean(b.checked.by) };
}

/** Every specification outcome that needs the concept, with its system and band. */
export function pathwaysFor(kb, conceptId) {
  const ix = indexOf(kb);
  return (ix.mapsByConcept.get(conceptId) || []).map((m) => {
    const s = ix.spec.get(m.spec), o = ix.outcome.get(okey(m.spec, m.outcome)), sys = ix.system.get(s.system);
    return { spec: s.id, title: `${s.body} ${s.title}`, outcome: o.id, outcomeTitle: o.title, system: sys.name, qualification: s.qualification, band: s.band, claim: m.claim, practical: Boolean(m.practical) };
  });
}

/** Every lesson bound to the concept. */
export const lessonsFor = (kb, conceptId) => indexOf(kb).bindingsByConcept.get(conceptId) || [];

const RANK = { gap: 0, "no-course": 0, unmapped: 0, "below-level": 1, partial: 2, "above-level": 2, covered: 3 };
/** For each outcome of a specification: is there a lesson, on a course that offers the specification, that teaches
 *  what it needs at the right band? */
export function coverage(kb, specId, lessons = null) {
  const ix = indexOf(kb), s = ix.spec.get(specId);
  if (!s) throw new Error(`unknown specification ${specId}`);
  const direct = s.outcomes.flatMap((o) => ix.directByOutcome.get(okey(specId, o.id)) || []);
  const courses = [...new Set([...(ix.pathwaysBySpec.get(specId) || []).map((p) => p.course), ...direct.flatMap((m) => m.lessons.map((l) => l.course))])];
  const outcomes = s.outcomes.map((o) => {
    const maps = ix.mapsByOutcome.get(okey(specId, o.id)) || [];
    // an outcome with no concept mapping is resolved through its direct lesson mapping, if it has one
    const dm = ix.directByOutcome.get(okey(specId, o.id))?.[0];
    if (!maps.length) {
      if (!dm) return { outcome: o, concepts: [], status: "unmapped", lessons: [], note: "Not yet mapped to lessons." };
      const live = dm.lessons.filter((l) => !lessons || lessons.has(key(l.course, l.lesson)));
      const st = live.some((l) => l.fit === "covers") ? "covered" : live.length ? "partial" : courses.length ? "gap" : "no-course";
      return { outcome: o, concepts: [], status: st, lessons: live.map((l) => key(l.course, l.lesson)), note: dm.note || (st === "gap" ? "No Gradify lesson teaches this yet." : ""), direct: true };
    }
    const concepts = [...new Set(maps.flatMap((m) => m.concepts))], practical = maps.some((m) => m.practical);
    if (!courses.length) return { outcome: o, concepts, status: "no-course", lessons: [], note: "No Gradify course offers this specification yet." };
    let worst = "covered"; const found = [], notes = [];
    for (const cid of concepts) {
      const cands = kb.lessonMaps.filter((b) => b.concept === cid && courses.includes(b.course) && b.role !== "mentions" && (!practical || (b.covers || []).includes("practical")) && (!lessons || lessons.has(key(b.course, b.lesson))));
      let st;
      if (!cands.length) { st = "gap"; notes.push(`No lesson ${practical ? "covers the practical for" : "teaches"} ${ix.concept.get(cid)?.title || cid} on ${courses.join(" or ")}.`); }
      else {
        // full coverage needs a lesson at this band that teaches the concept; one that only applies it (say, diffusion
        // inside a gas exchange lesson) is partial coverage
        const exact = cands.filter((b) => b.band === s.band), teaching = exact.filter((b) => b.role === "teaches");
        st = teaching.length ? "covered" : exact.length ? "partial" : cands.some((b) => bandRank(b.band) > bandRank(s.band)) ? "above-level" : "below-level";
        found.push(...(teaching.length ? teaching : exact.length ? exact : cands));
        if (st === "partial") notes.push(`${ix.concept.get(cid).title} is applied at this level (${exact.map((b) => key(b.course, b.lesson)).join(", ")}) but no lesson teaches it as a topic.`);
        if (st === "above-level") notes.push(`${ix.concept.get(cid).title} is taught only above ${s.band} (${cands.map((b) => `${key(b.course, b.lesson)}, ${b.band}`).join("; ")}): check its terms and depth suit this specification.`);
        if (st === "below-level") notes.push(`${ix.concept.get(cid).title} is taught only below ${s.band}: the lesson may not reach the depth this outcome needs.`);
      }
      if (RANK[st] < RANK[worst]) worst = st;
    }
    return { outcome: o, concepts, status: worst, lessons: found.map((b) => key(b.course, b.lesson)), note: notes.join(" ") };
  });
  return { spec: s, courses, outcomes };
}

/** What a change to a concept touches: every bound lesson with what it needs, every pathway, every dependent concept.
 *  Proposes; never applies. A lesson pitched at another band may rightly differ from the canonical record. */
export function impact(kb, conceptId, lessons = null) {
  const ix = indexOf(kb), c = ix.concept.get(conceptId);
  if (!c) throw new Error(`unknown concept ${conceptId}`);
  const affected = lessonsFor(kb, conceptId).map((b) => {
    const st = bindingState(kb, b, lessons), level = c.levels[b.band];
    const action = st.state === "current" ? "None: checked against the current version."
      : st.state === "concept-changed" ? `Review against the change${level ? `, keeping what the ${b.band} band expects` : ""}; adapt the lesson only if it is now wrong or incomplete for its learners, then record the check.`
      : st.state === "lesson-changed" ? "Confirm the lesson still teaches this concept at this band, then record the new hash."
      : "Remove the binding or point it at the lesson's new id.";
    return { course: b.course, lesson: b.lesson, role: b.role, band: b.band, ...st, action, levelKnown: Boolean(level) };
  });
  return { concept: { id: c.id, title: c.title, version: c.version }, lessons: affected, pathways: pathwaysFor(kb, conceptId), dependents: dependents(kb, conceptId) };
}

const plain = (s) => String(s || "").replace(/\*\*|\*|`/g, "").toLowerCase();
const has = (text, term) => new RegExp(`(^|[^a-z])${term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i").test(text);
/** Terminology and level findings in every lesson bound to a concept. Needs lesson content. */
export function consistency(kb, lessons) {
  if (!lessons) return [{ kind: "skipped", severity: "editorial", note: "Lesson content wasn't loaded, so terminology wasn't checked." }];
  const ix = indexOf(kb), out = [];
  for (const b of kb.lessonMaps) {
    const c = ix.concept.get(b.concept), L = lessons.get(key(b.course, b.lesson));
    if (!c || !L) continue;
    const text = plain(L.text), where = { course: b.course, lesson: b.lesson, title: L.title, concept: c.id, band: b.band };
    for (const v of c.terms.variants || []) if ((!v.bands || v.bands.includes(b.band)) && has(text, v.term) && !has(text, v.prefer))
      out.push({ ...where, kind: "terminology", severity: "editorial", term: v.term, prefer: v.prefer, note: v.note });
    const level = c.levels[b.band];
    if (!level) { if (b.role === "teaches") out.push({ ...where, kind: "no-level", severity: "gap", note: `The concept has no ${b.band} expectations yet, so this lesson's depth can't be checked.` }); continue; }
    for (const t of level.beyond || []) if (has(text, t)) out.push({ ...where, kind: "beyond-level", severity: "curriculum-dependent", term: t, note: `"${t}" is beyond what ${b.band} usually expects: fine as extension, but label it or check the learner's specification.` });
  }
  // the terms a band expects, checked across all of a course's lessons that teach the concept at that band together:
  // a course often spreads one concept over a run of lessons
  const groups = new Map();
  for (const b of kb.lessonMaps.filter((x) => x.role === "teaches" && lessons.has(key(x.course, x.lesson)))) {
    const g = `${b.course}|${b.concept}|${b.band}`;
    if (!groups.has(g)) groups.set(g, { course: b.course, concept: b.concept, band: b.band, lessons: [], text: "" });
    const G = groups.get(g); G.lessons.push(b.lesson); G.text += "\n" + plain(lessons.get(key(b.course, b.lesson)).text);
  }
  for (const G of groups.values()) {
    const level = ix.concept.get(G.concept)?.levels[G.band]; if (!level) continue;
    const missing = (level.terms || []).filter((t) => !has(G.text, t));
    if (missing.length) out.push({ course: G.course, lesson: G.lessons.join(", "), title: "", concept: G.concept, band: G.band, kind: "terms-missing", severity: "gap", terms: missing, note: `Terms expected at ${G.band} that none of these lessons uses: ${missing.join(", ")}.` });
  }
  return out;
}

/** The counts for a coverage dashboard. */
export function summary(kb, lessons = null) {
  const sources = kb.concepts.flatMap((c) => c.sources);
  const states = kb.lessonMaps.map((b) => bindingState(kb, b, lessons).state);
  const cov = kb.specs.map((s) => coverage(kb, s.id, lessons)).flatMap((r) => r.outcomes);
  const count = (list, v) => list.filter((x) => x === v).length;
  return {
    subjects: new Set(kb.concepts.map((c) => c.subject)).size,
    concepts: kb.concepts.length,
    conceptsByReview: Object.fromEntries(["draft", "needs_review", "reviewed", "verified"].map((r) => [r, kb.concepts.filter((c) => c.review.status === r).length])),
    countries: new Set(kb.systems.map((s) => s.country)).size,
    systems: kb.systems.length,
    stages: kb.systems.reduce((n, s) => n + s.stages.length, 0),
    qualifications: new Set(kb.specs.map((s) => s.qualification).filter(Boolean)).size,
    specifications: kb.specs.length,
    awardingBodies: new Set(kb.specs.map((s) => s.body)).size,
    specificationsChecked: kb.specs.filter((s) => s.checked).length,
    outcomes: cov.length,
    outcomesMapped: cov.filter((o) => o.status !== "unmapped").length,
    outcomesUnmapped: cov.filter((o) => o.status === "unmapped").length,
    specificationsExtracted: kb.specs.filter((s) => s.extracted).length,
    outcomesCovered: count(cov.map((o) => o.status), "covered"),
    outcomesAboveLevel: count(cov.map((o) => o.status), "above-level"),
    outcomesPartial: count(cov.map((o) => o.status), "partial"),
    outcomesGap: cov.filter((o) => o.status === "gap" || o.status === "below-level").length,
    outcomesNoCourse: count(cov.map((o) => o.status), "no-course"),
    lessonsBound: new Set(kb.lessonMaps.map((b) => key(b.course, b.lesson))).size,
    bindings: kb.lessonMaps.length,
    bindingsCurrent: count(states, "current"),
    bindingsNeedReview: states.length - count(states, "current"),
    bindingsConfirmed: kb.lessonMaps.filter((b) => b.checked.by).length,
    sources: sources.length,
    sourcesChecked: sources.filter((s) => s.checked).length,
  };
}
