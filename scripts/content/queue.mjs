// What to write next: topics from the requirement map, in wave order, skipping what is filed or blocked.
// A topic is one section of a specification (AQA 4.1.1.1 "Eukaryotes and prokaryotes"). Its requirements are the
// statements in that section that no existing lesson covers strongly: existing lessons are reused, never rewritten.
import { readFileSync, existsSync } from "node:fs";
import { SPECS, QUAL_TYPES } from "../../kit/curriculum/uk.js";
import { loadIndex, loadStatements, loadMap, tokens, checkIndex } from "../curriculum/engine.mjs";
import { CONFIG, at, out, load, slug, loadLedger, briefPath } from "./lib.mjs";
import { staleness, targetKey } from "./build.mjs";

const LEVEL = { gcse: "GCSE", "a-level": "A level", "as-level": "AS level", n5: "National 5", higher: "Higher" };
export const TYPE = (s) => (s.kind === "practical" ? "prac" : s.kind === "skill" ? (s.skills || []).some((k) => /math|calc/i.test(k)) ? "method" : "data" : "concept");
const lessonRef = (subject, id) => { const m = String(id).match(/^(u\d+)-(\d+)$/); return m ? `${subject}/${m[1]}#${Number(m[2])}` : `${subject}/${id}`; };

/** every topic of a framework with requirements still to write */
export function topicsFor(fwId, { titles = new Map() } = {}) {
  const s = SPECS.find((x) => x.id === fwId); if (!s) throw new Error(`no framework ${fwId} in the registry (kit/curriculum/uk.js)`);
  const idx = loadIndex(fwId); if (!idx) throw new Error(`${fwId} has no statement index (kit/curriculum/specs/${fwId}.json): import it first`);
  // nothing is queued from an index that doesn't say what kind of requirement each statement is, or when it applies
  const bad = checkIndex(idx); if (bad.length) throw new Error(`${fwId}: ${bad.join("; ")}`);
  const st = loadStatements(fwId), text = new Map((st.statements || []).map((x) => [x.ref, x])), map = loadMap(fwId) || { links: {} };
  const sections = new Map((idx.sections || []).map((x) => [x.ref, x]));
  // strong matches are confirmed in a session first (scripts/content/agent.mjs, mapping): confirmed ones are taught
  // already and get REQ: lines; rejected ones are written like any gap; unconfirmed ones wait for their check
  const confirmed = load(out(`content/mapping/${fwId}.json`), { confirmed: {} }).confirmed;
  const byTopic = new Map();
  for (const x of idx.statements) {
    const link = map.links[x.ref];
    // a decision holds for the statement text it was made on; one recorded before hashes were stored still counts
    const m0 = confirmed[x.ref], m = m0 && (!m0.hash || m0.hash === x.hash) ? m0 : null;
    // a reviewed link holds only for the statement text it was reviewed on; a changed statement is written or re-reviewed
    const verified = link?.status === "verified" && link.hash === x.hash;
    if (verified || m?.ok) continue;                                                // already taught: mapped, not written
    if (link?.confidence === "strong" && !m) continue;                             // waiting for its mapping check
    const sec = sections.get(x.section) || { ref: x.section, title: x.section };
    const id = `${s.subject}/${slug(sec.title)}`;
    if (!byTopic.has(id)) byTopic.set(id, { id, subject: s.subject, fw: fwId, section: sec.ref, title: sec.title, level: LEVEL[s.qual] || QUAL_TYPES[s.qual]?.name || s.qual, country: "uk", reqs: [], reuse: new Map() });
    const t = byTopic.get(id), full = text.get(x.ref);
    t.reqs.push({ id: `${fwId}:${x.ref}`, ref: x.ref, asks: full?.text ? full.text.slice(0, 400) : `${sec.title} (${x.ref})`, text: full?.text || null, title: sec.title, type: TYPE(x), status: x.status, reqType: x.type, spec: { version: idx.version, published: idx.published }, hash: x.hash, ...(x.higherTier ? { higherTier: true } : {}) });
    for (const l of link?.lessons || []) t.reuse.set(lessonRef(s.subject, l.id), titles.get(l.id) || l.id);
  }
  return [...byTopic.values()].map((t) => ({ ...t, reuse: [...t.reuse].map(([id, title]) => ({ id, title })) }));
}

/** the subjects in wave order, and the frameworks in the run (config.frameworks) */
export function waveOrder(subjects) {
  const rank = (sub) => { for (const w of CONFIG.waves) if (w.subjects.includes(sub) || w.subjects.includes("*")) return w.wave * 100 + Math.max(0, w.subjects.indexOf(sub)); return 999; };
  return [...subjects].sort((a, b) => rank(a) - rank(b));
}
export const frameworksFor = (subject) => CONFIG.frameworks.filter((id) => SPECS.find((s) => s.id === id)?.subject === subject);
export const subjectsInRun = () => waveOrder([...new Set(CONFIG.frameworks.map((id) => SPECS.find((s) => s.id === id)?.subject).filter(Boolean))]);

/** the next topics to work on for a subject: not filed, not blocked (failed in `repairs` runs), document order */
export function nextTopics(subject, { limit = CONFIG.topicsPerRun, titles } = {}) {
  const led = loadLedger(subject), out = [];
  for (const fw of frameworksFor(subject)) for (const t of topicsFor(fw, { titles })) {
    const e = led.topics[t.id];
    const same = e?.reqHash === reqHash(t);
    // lessons built from inputs that have since changed (brief, prompts, models, template) are rebuilt: their
    // requirements go back to be written, and only theirs. A target that failed `repairs` times isn't retried.
    const rebuild = same ? rebuildReqs(t, e) : [];
    if (same && ["filed", "filed-with-gaps", "blocked"].includes(e.status) && !rebuild.length) continue;
    // partly done, or out of date: write only the requirements left, and add to the draft
    if (same && (e.status === "partial" || rebuild.length)) { const left = new Set([...(e.status === "partial" ? e.uncovered || [] : []), ...rebuild]); out.push({ ...t, reqs: t.reqs.filter((r) => left.has(r.id)), append: true, full: t, ...(rebuild.length ? { rebuild } : {}) }); }
    else out.push(t);
    if (out.length >= limit) return out;
  }
  return out;
}
export const reqHash = (t) => t.reqs.map((r) => `${r.id}:${r.hash}`).join(",");
/** the topic's lessons that are out of date, with why (scripts/content/build.mjs) */
export const staleLessons = (t, e) => (e?.lessons || []).map((l) => ({ l, why: staleness(l, t) })).filter((x) => x.why.length);
/** the requirements to rebuild for a topic: those its out-of-date lessons teach, unless this target already failed */
export function rebuildReqs(t, e) {
  const stale = staleLessons(t, e); if (!stale.length) return [];
  if (e.rebuildKey === targetKey(t) && (e.rebuilds || 0) >= CONFIG.repairs) return [];
  const known = new Set(t.reqs.map((r) => r.id));
  return [...new Set(stale.flatMap((x) => x.l.reqs.map((id) => (known.has(id) ? id : [...known].find((k) => id.startsWith(`${k}.`)))).filter(Boolean)))];
}

// ---------- what a packet offers the Writer: library diagrams on the topic, and the renderers they use ----------
export function diagramsFor(topic, { max = 6 } = {}) {
  const man = load(at("kit/diagrams/manifest.json"), {}), want = new Set(tokens(`${topic.title} ${topic.reqs.map((r) => r.asks).join(" ")}`));
  const prefix = { biology: "bio-", chemistry: "chem-", physics: "phys-", maths: "maths-" }[topic.subject] || `${topic.subject}-`;
  const scored = Object.entries(man).filter(([id, d]) => id.startsWith(prefix) && d.status !== "failed")
    .map(([id, d]) => ({ id, shows: d.caption || d.title || id, score: tokens(`${d.title} ${d.title} ${d.caption}`).filter((w) => [...want].some((x) => stemMatch(x, w))).length }))
    .filter((d) => d.score >= (want.size > 4 ? 2 : 1)).sort((a, b) => b.score - a.score).slice(0, max);
  const renderers = new Map([["graph", '{"range":{"x":[0,10],"y":[0,10]},"axisLabels":["x (unit)","y (unit)"],"points":[{"x":1,"y":2}],"curves":[{"expr":"2*x"}],"title":"…","caption":"…","alt":"…"}']]);
  for (const d of scored) {
    const f = at(`kit/diagrams/specs/${d.id}.json`); if (!existsSync(f)) continue;
    const spec = JSON.parse(readFileSync(f, "utf8")); if (!spec.renderer || renderers.has(spec.renderer)) continue;
    const { id, course, renderer, ...rest } = spec, ex = JSON.stringify(rest);
    if (ex.length <= 900) renderers.set(spec.renderer, ex);
  }
  return { diagrams: scored.map(({ id, shows }) => ({ id, shows: shows.slice(0, 140) })), renderers: [...renderers].map(([id, schema]) => ({ id, schema })) };
}
// shared stems: "prokaryot" matches "prokaryotic"
const stemMatch = (a, b) => { const n = Math.min(a.length, b.length); return n >= 5 ? a.slice(0, n - 1) === b.slice(0, n - 1) && Math.abs(a.length - b.length) <= 3 : a === b; };
export const hasBrief = (topic) => existsSync(briefPath(topic.id));
