// Specification Mastery pages for the course engine (kit/course/course.js wires them):
//   #/spec          the qualification: three measures, next steps, the heatmap of every point
//   #/spec/<topic>  one topic's requirements as a list (#/spec/4.1)
//   #/spec/<point>  one requirement: its evidence, what to do next, and the way to the points around it
// HTML only, from the model in kit/learning/spec-mastery.js. Nothing here is specific to a board or subject.
//
// Three measures are never mixed: Mastery (what the learner's answers show, a percentage with a level), Confidence
// (how much evidence that rests on, a three-step meter) and Coverage (what's taught and done, counts "x of y").
// The heatmap uses the activity tracker's scale (.co-heat in kit/styles/course.css): filled tiles get a stronger colour with more
// demonstrated understanding; an empty tile has no evidence yet, so it can't be mistaken for a weak result.
import { esc } from "../core/text.js";
import { BANDS, CONFIDENCE, basisText, weakestPoints } from "../learning/spec-mastery.js";
import { sixHtml, calibrationHtml } from "../learning/mastery-view.js";

const pct = (v) => `${Math.round(v * 100)}%`;
const SHADE = { emerging: 0.22, building: 0.4, developing: 0.58, secure: 0.78, strong: 1 };
const STEPS = { none: 0, low: 1, medium: 2, high: 3 };
const COVER = { full: ["Fully taught", "Gradify's lessons teach and test all of this point."], partial: ["Partly taught", "Gradify's lessons cover part of this point; use your class notes for the rest."], none: ["Not on Gradify yet", "No Gradify lesson teaches this point yet, so Gradify can't measure it."] };
const TREND = { improving: "Improving: your recent answers are better than earlier ones.", steady: "Steady: your recent answers are about the same as earlier ones.", slipping: "Slipping: your recent answers are clearly weaker than before. Worth revisiting soon." };

const fig = (p) => (p.estimate == null ? "" : `${p.provisional ? "~" : ""}${pct(p.estimate)}`);
const state = (p) => (p.estimate != null ? p.band.label : p.coverage.gradify === "none" ? "Not on Gradify yet" : "Not assessed yet");
const pill = (p) => `<span class="sm-pill b-${p.estimate == null ? "none" : p.band.key}">${esc(state(p))}</span>`;
const tip = (p) => `${p.id} ${p.title}: ${state(p)}${p.estimate == null ? "" : ` ${fig(p)}${p.provisional ? " (early estimate)" : ""}`}${p.trend === "slipping" ? ", slipping" : ""}`;
const tileCls = (p) => [p.estimate == null ? (p.coverage.gradify === "none" ? "gap" : "none") : `b-${p.band.key}`, p.provisional ? "prov" : "", p.trend === "slipping" ? "slip" : ""].filter(Boolean).join(" ");
const tileStyle = (p) => (p.estimate == null ? "" : ` style="--v:${SHADE[p.band.key]}"`);
const tile = (p, cur = false) => `<a href="#/spec/${esc(p.id)}" class="${tileCls(p)}"${tileStyle(p)} data-tip="${esc(tip(p))}" aria-label="${esc(tip(p))}"${cur ? ' aria-current="page"' : ""}></a>`;

/** "Summary, not official wording": shown wherever the specification hasn't been checked against the board's own */
export function summaryNote(spec, { short = false } = {}) {
  if (spec.verified && spec.wording === "verbatim") return "";
  const fl = Object.values(spec.flags || {}).map((f) => `“${f.short}”`);
  if (short) return `<small class="sm-sumtag" title="Not yet checked against ${esc(spec.board)}'s published specification">Summary, not official wording</small>`;
  const what = spec.verified ? "The requirement wording is Gradify's summary; the structure was checked against the published specification" : `Point titles, wording and classifications${fl.length ? ` (such as ${esc(fl.join(" and "))})` : ""} are Gradify's summary of ${esc(spec.board)}'s specification and haven't yet been checked against the published version`;
  return `<p class="sm-note" role="note"><b>Summary, not official wording.</b> ${what}. Use your own specification for the exact requirements.${spec.url ? ` <a href="${esc(spec.url)}" target="_blank" rel="noopener">${esc(spec.board)}'s specification ↗</a>` : ""}</p>`;
}
const flagTags = (spec, p) => p.flags.map((f) => spec.flags?.[f] ? `<span class="sm-tag" title="${esc(spec.flags[f].name)}${spec.verified ? "" : " (Gradify's summary, not yet verified)"}">${esc(spec.flags[f].short)}</span>` : "").join("");

// ---------- the three measures ----------
function meter(level) {
  return `<span class="sm-meter" aria-hidden="true">${[1, 2, 3].map((i) => `<i class="${STEPS[level] >= i ? "on" : ""}"></i>`).join("")}</span>`;
}
function scaleHtml(v) {
  return `<div class="sm-scale" aria-hidden="true">${BANDS.map((b) => `<span style="--v:${SHADE[b.key]}"><small>${b.label}</small></span>`).join("")}${v == null ? "" : `<i style="left:${Math.min(99, Math.max(1, v * 100))}%"></i>`}</div>`;
}
/**
 * mastery: { estimate, provisional, band, empty, scope }   confidence: { level, basis }   coverage: [[label, n, of]]
 */
function measuresHtml({ mastery, confidence, coverage }) {
  const m = mastery;
  return `<div class="sm-measures">
    <section class="sm-measure sm-m-mastery" aria-label="Mastery"><h3>Mastery</h3>
      ${m.estimate == null ? `<b class="sm-fig none">Not assessed yet</b><p>${esc(m.empty)}</p>` : `<b class="sm-fig">${m.provisional ? "~" : ""}${pct(m.estimate)}</b><p><span class="sm-pill b-${m.band.key}">${esc(m.band.label)}</span>${m.provisional ? ` <span class="sm-early">early estimate</span>` : ""}</p>${scaleHtml(m.estimate)}<p>${esc(m.scope)}</p>`}</section>
    <section class="sm-measure" aria-label="Confidence in the mastery figure"><h3>Confidence in this figure</h3>
      <b class="sm-cfig">${meter(confidence.level)}${esc(confidence.level === "none" ? "No evidence yet" : CONFIDENCE[confidence.level].label.replace(" confidence", ""))}</b>
      <p>${esc(confidence.basis)}</p></section>
    <section class="sm-measure" aria-label="Coverage"><h3>Coverage</h3>
      <ul class="sm-cov">${coverage.map(([label, n, of, note]) => `<li class="${of == null ? "txt" : ""}"><span>${esc(label)}</span><b>${of == null ? esc(n) : `${n}<small> of ${of}</small>`}</b>${of ? `<i style="--f:${of ? n / of : 0}"></i>` : ""}${note ? `<small>${esc(note)}</small>` : ""}</li>`).join("")}</ul></section>
  </div>`;
}

// ---------- shared pieces ----------
function controlsHtml(m, specs) {
  const s = m.spec;
  const pick = specs.length > 1 ? `<label class="sm-choose"><span>Change</span><select data-spec aria-label="Your qualification">${specs.map((x) => `<option value="${esc(x.id)}" ${x.id === s.id ? "selected" : ""}>${esc(x.title)}</option>`).join("")}</select></label>` : `<small class="sm-only">The only ${esc(s.subject)} specification mapped so far. More boards are coming.</small>`;
  const opts = (s.options || []).map((o) => `<div class="sm-seg" role="group" aria-label="${esc(o.label)}"><span>${esc(o.label)}</span>${o.choices.map((c) => `<button type="button" data-opt="${esc(o.id)}" data-choice="${esc(c.id)}" aria-pressed="${m.choices[o.id] === c.id}">${esc(c.label)}</button>`).join("")}</div>`).join("");
  return `<div class="sm-qual"><span class="sm-live" title="Updated every time you answer"><i></i>Live</span><span>Your qualification <b>${esc(s.title)}</b></span>${pick}${opts}</div>`;
}
const crumbs = (items) => `<nav class="sm-crumbs" aria-label="Specification">${items.map(([href, t], i) => (i === items.length - 1 ? `<span aria-current="page">${esc(t)}</span>` : `<a href="${href}">${esc(t)}</a>`)).join("")}</nav>`;
// a topic's standing, with only the part that needs action ("2 to work on") in the warning colour
const topicStatus = (t) => `${t.estimate != null ? `${t.provisional ? "~" : ""}${pct(t.estimate)} · ` : ""}${esc(t.status.replace(/ · \d+ to work on$/, ""))}${t.toWork ? ` · <span class="sm-warntext">${t.toWork} to work on</span>` : ""}`;
function action(p, practiseHref, { primary = false } = {}) {
  if (!practiseHref || !p.practise.length) return "";
  const label = p.estimate == null ? "Start" : p.band.key === "strong" ? "Keep it fresh" : "Practise";
  return `<a class="btn ${primary ? "btn-light" : "btn-ghost"} btn-sm sm-act" href="${practiseHref(p)}"><span>${label}</span></a>`;
}

// ---------- #/spec ----------
function nextStepsHtml(m, practiseHref) {
  const weak = weakestPoints(m, 3);
  if (weak.length) return `<section class="co-panel sm-next-steps"><h3>Your next steps</h3><p class="co-acct">The requirements your answers show are weakest${m.overall.slipping ? ", with any that are slipping raised" : ""}. Each practice session is 5 minutes.</p>
    <ul class="sm-rows">${weak.map((p) => `<li><span class="sm-tiles sm-swatch">${tile(p)}</span><a class="sm-rt" href="#/spec/${esc(p.id)}"><span class="sm-id">${esc(p.id)}</span>${esc(p.title)}<small>${esc(p.next)}</small></a><span class="sm-rs">${pill(p)}<b>${fig(p)}</b></span>${action(p, practiseHref, { primary: true })}</li>`).join("")}</ul></section>`;
  if (!m.overall.assessed) {
    const start = m.points.filter((p) => p.coverage.gradify === "full").slice(0, 3);
    return start.length ? `<section class="co-panel sm-next-steps"><h3>Start here</h3><p class="co-acct">Gradify hasn't seen you answer anything yet. Try a few questions on the first requirements and your map starts filling in.</p>
      <ul class="sm-rows">${start.map((p) => `<li><span class="sm-tiles sm-swatch">${tile(p)}</span><a class="sm-rt" href="#/spec/${esc(p.id)}"><span class="sm-id">${esc(p.id)}</span>${esc(p.title)}<small>${esc(p.text)}</small></a>${action(p, practiseHref, { primary: true })}</li>`).join("")}</ul></section>` : "";
  }
  return `<section class="co-panel sm-next-steps"><h3>Your next steps</h3><p class="co-empty">Nothing you've been assessed on is weak. Pick a requirement you haven't tried yet (an empty tile below) to widen your evidence.</p></section>`;
}

export function keyHtml() {
  return `<div class="sm-key" aria-label="Key"><span><i class="sm-k none"></i>Not assessed yet</span>
    <span class="sm-ramp"><small>Emerging</small>${BANDS.map((b) => `<i class="sm-k b-${b.key}" style="--v:${SHADE[b.key]}" title="${b.label}: ${b.min}–${b.key === "strong" ? 100 : b.min + 19}%"></i>`).join("")}<small>Strong</small></span>
    <span><i class="sm-k b-developing prov" style="--v:${SHADE.developing}"></i>Early estimate</span><span><i class="sm-k b-secure slip" style="--v:${SHADE.secure}"></i>Slipping</span><span><i class="sm-k gap"></i>Not on Gradify yet</span></div>`;
}

export function specPageHtml(m, { specs = [], practiseHref } = {}) {
  const s = m.spec, o = m.overall;
  return `<div class="co-intro sm-head"><span class="co-kicker">Specification mastery</span><h2>How ready you are for ${esc(s.board)} ${esc(s.subject)}</h2>
      <p>Every requirement of your specification, and how well your own answers across Gradify show you can meet it.</p>
      ${controlsHtml(m, specs)}${summaryNote(s)}</div>
    ${measuresHtml({
      mastery: { estimate: o.estimate, provisional: o.provisional, band: o.band, scope: `Across the ${o.assessed} ${o.assessed === 1 ? "requirement" : "requirements"} you've been assessed on. Requirements without answers aren't counted as zero.`, empty: "Answer some check questions and Gradify starts measuring. It doesn't guess from nothing." },
      confidence: { level: o.confidence, basis: o.assessed ? `${o.firm} of the ${o.assessed} assessed requirements have a fair amount of varied evidence. Covering more of the specification makes the figure firmer.` : "No answers yet." },
      coverage: [["Requirements with evidence", o.assessed, o.total], ["Taught on Gradify", o.covered, o.total, o.covered - o.full ? `${o.covered - o.full} only in part` : ""], ["Lessons you've completed", o.lessonsDone, o.lessonsMapped]],
    })}
    ${nextStepsHtml(m, practiseHref)}
    <section class="co-panel sm-map"><div class="cx-acth"><h3>Your specification map</h3><span>${o.assessed} of ${o.total} assessed</span></div>
      <p class="co-acct">One tile per requirement. The stronger the colour, the more your answers show; an empty tile isn't assessed yet. Pick any tile to see it.</p>
      ${keyHtml()}
      <div class="sm-topics">${m.topics.map((t) => `<section class="sm-topic"><a class="sm-th" href="#/spec/${esc(t.id)}"><b><span class="sm-id">${esc(t.id)}</span>${esc(t.title)}</b><span>${topicStatus(t)}</span></a>
        <div class="sm-tiles">${groupsOf(t.points).map((g) => `<span class="sm-grp">${g.map((p) => tile(p)).join("")}</span>`).join("")}</div></section>`).join("")}</div></section>
    <section class="co-panel sm-how"><h3>How Gradify works this out</h3>
      <div class="sm-three">${[["Mastery", "What your answers show you can do: recognising, recalling, explaining, applying, using it cold and remembering it weeks later. Only answers count. Finishing a lesson doesn't."], ["Confidence", "How much evidence the mastery figure rests on. 85% from 40 varied answers over several days means more than 85% from two easy ones."], ["Coverage", "How much of the specification Gradify teaches, how much you've been assessed on, and how many of the lessons you've completed."]].map(([h, d]) => `<div><b>${h}</b><p>${d}</p></div>`).join("")}</div>
      <p class="co-acct">${esc(s.title)}: ${esc(s.version)}. Gradify isn't endorsed by ${esc(s.board)}.</p></section>`;
}
// a topic's points in their groups (4.1.1, 4.1.2, …), so the tiles have a rhythm that follows the specification
function groupsOf(points) { const out = new Map(); for (const p of points) (out.get(p.group.id) || out.set(p.group.id, []).get(p.group.id)).push(p); return [...out.values()]; }

// ---------- #/spec/<topic> ----------
export function topicPageHtml(m, t, { practiseHref } = {}) {
  const i = m.topics.indexOf(t), prev = m.topics[i - 1], next = m.topics[i + 1];
  return `${crumbs([["#/spec", "Specification"], ["", `${t.id} ${t.title}`]])}
    <div class="sm-topicnav">${m.topics.map((x) => `<a href="#/spec/${esc(x.id)}" ${x === t ? 'aria-current="page"' : ""}>${esc(x.id)} ${esc(x.title)}</a>`).join("")}</div>
    <div class="co-intro"><span class="co-kicker">Topic ${esc(t.id)}</span><h2>${esc(t.title)}</h2><p>${topicStatus(t)} · ${t.assessed} of ${t.total} requirements assessed</p>${summaryNote(m.spec, { short: true })}</div>
    ${groupsOf(t.points).map((g) => `<section class="co-panel sm-group"><h3><span class="sm-id">${esc(g[0].group.id)}</span>${esc(g[0].group.title)}</h3>
      <ul class="sm-rows">${g.map((p) => `<li><span class="sm-tiles sm-swatch">${tile(p)}</span><a class="sm-rt" href="#/spec/${esc(p.id)}"><span class="sm-id">${esc(p.id)}</span>${esc(p.title)}${flagTags(m.spec, p)}<small>${p.estimate == null ? esc(COVER[p.coverage.gradify][0]) : `${esc(CONFIDENCE[p.confidence.level].label)}${p.trend === "slipping" ? " · slipping" : ""}`}</small></a><span class="sm-rs">${pill(p)}<b>${fig(p)}</b></span>${action(p, practiseHref)}</li>`).join("")}</ul></section>`).join("")}
    <nav class="sm-pager">${prev ? `<a href="#/spec/${esc(prev.id)}">← ${esc(prev.id)} ${esc(prev.title)}</a>` : "<span></span>"}${next ? `<a href="#/spec/${esc(next.id)}">${esc(next.id)} ${esc(next.title)} →</a>` : ""}</nav>`;
}

// ---------- #/spec/<point> ----------
export function pointPageHtml(m, p, { titleOf = (id) => id, statusOf = () => null, practiseHref } = {}) {
  const spec = m.spec, c = p.confidence, cov = COVER[p.coverage.gradify];
  const i = m.points.findIndex((x) => x.id === p.id), prev = m.points[i - 1], next = m.points[i + 1], topic = m.topics.find((t) => t.id === p.topic.id);
  const lessonRow = (id, kind) => {
    const r = p.byLesson[id] || { state: "unanswered", n: 0 }, st = statusOf(id);
    const read = r.n ? `${r.n} ${r.n === 1 ? "answer" : "answers"}, latest ${pct(r.latest)}${r.state === "inconsistent" ? ", inconsistent" : ""}` : "no answers yet";
    return `<li class="r-${r.state}"><a href="#/lesson/${esc(id)}">${esc(titleOf(id))}</a><small>${kind === "partial" ? "Covers part of this requirement · " : ""}${st ? `${esc(st)} · ` : ""}${read}</small><span class="sm-res" data-res="${esc(id)}"></span></li>`;
  };
  const series = p.series || [], has = series.some((v) => v != null);
  return `<div class="sm-point">
    ${crumbs([["#/spec", "Specification"], [`#/spec/${p.topic.id}`, `${p.topic.id} ${p.topic.title}`], ["", p.id]])}
    <div class="sm-strip"><span class="sm-tiles">${topic.points.map((x) => tile(x, x === p)).join("")}</span><span class="sm-stepper">${prev ? `<a href="#/spec/${esc(prev.id)}" title="${esc(prev.id)} ${esc(prev.title)}">← Previous</a>` : ""}${next ? `<a href="#/spec/${esc(next.id)}" title="${esc(next.id)} ${esc(next.title)}">Next →</a>` : ""}</span></div>
    <span class="co-kicker">${esc(p.group.id)} ${esc(p.group.title)}</span>
    <h2><span class="sm-id">${esc(p.id)}</span>${esc(p.title)} ${flagTags(spec, p)}</h2>
    <blockquote class="sm-wording"><p>${esc(p.text)}</p><footer>${esc(spec.title)} · ${spec.wording === "verbatim" ? "the board's own wording" : `<b>Gradify's summary, not official wording.</b> Check the exact requirement in your specification`}${spec.url ? ` <a href="${esc(spec.url)}" target="_blank" rel="noopener">↗</a>` : ""}</footer></blockquote>
    <section class="co-panel sm-do"><p class="sm-nextline">${esc(p.next)}</p>
      <div class="co-row">${practiseHref && p.practise.length ? `<a class="btn btn-light lg btn-sm" href="${practiseHref(p)}"><span>${p.estimate == null ? "Try 5 minutes of questions" : p.band.key === "strong" ? "Keep it fresh: 5 minutes" : "Practise the weakest area: 5 minutes"}</span></a>` : ""}${p.practise[0] ? `<a class="btn btn-ghost lg btn-sm" href="#/lesson/${esc(p.practise[0])}"><span>Open the lesson: ${esc(titleOf(p.practise[0]))}</span></a>` : ""}</div></section>
    ${measuresHtml({
      mastery: { estimate: p.estimate, provisional: p.provisional, band: p.band, scope: p.provisional ? "An early estimate: not enough answers yet for a full measurement." : "Measured from your answers on this requirement's lessons.", empty: p.coverage.gradify === "none" ? "Gradify doesn't teach this requirement yet, so it can't measure it." : "No answers on this requirement yet." },
      confidence: { level: c.level, basis: basisText(c) },
      coverage: [["Gradify", cov[0], null, cov[1]], ["Lessons you've completed", p.coverage.done, p.coverage.total, "Completing a lesson is coverage, not mastery."]],
    })}
    <div class="sm-two">
      <section class="co-panel"><h3>What you can already show</h3>${p.can.length ? `<ul class="sm-list ok">${p.can.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p class="co-empty">${c.level === "none" ? "Nothing yet: no answers on this requirement." : "Nothing consistently yet. Keep practising."}</p>`}</section>
      <section class="co-panel"><h3>Where you're struggling</h3>${p.struggle.length ? `<ul class="sm-list lo">${p.struggle.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p class="co-empty">${c.level === "none" ? "Nothing measured yet." : "Nothing stands out from your answers so far."}</p>`}</section>
    </div>
    <section class="co-panel"><h3>Recent performance</h3>
      ${has ? `<div class="sm-spark" role="img" aria-label="Average score each week for the last 8 weeks">${series.map((v, k) => `<span title="${8 - k === 1 ? "This week" : `${8 - k} weeks ago`}: ${v == null ? "no answers" : pct(v)}"><i style="height:${v == null ? 0 : Math.max(6, v * 100)}%" class="${v == null ? "" : v >= 0.7 ? "hi" : v < 0.5 ? "lo" : ""}"></i></span>`).join("")}</div><div class="sm-sparkx"><small>8 weeks ago</small><small>This week</small></div>` : ""}
      <p class="co-empty">${p.trend ? TREND[p.trend] : has ? "Not enough answers yet, both recently and before, to say whether this is improving." : "No answers yet."}</p></section>
    <section class="co-panel co-mx"><h3>Six kinds of evidence</h3><p class="co-acct">What your answers on this requirement show, kind by kind. A kind with fewer than three answers is shown as an estimate.</p>${sixHtml(p.profile)}${calibrationHtml(p.profile)}</section>
    <section class="co-panel"><h3>Lessons, questions and flashcards</h3>
      ${p.lessons.length || p.partial.length ? `<ul class="sm-lessons">${p.lessons.map((id) => lessonRow(id, "full")).join("")}${p.partial.map((id) => lessonRow(id, "partial")).join("")}</ul>` : `<p class="co-empty">${esc(cov[1])}</p>`}</section>
    <nav class="sm-pager">${prev ? `<a href="#/spec/${esc(prev.id)}">← ${esc(prev.id)} ${esc(prev.title)}</a>` : "<span></span>"}${next ? `<a href="#/spec/${esc(next.id)}">${esc(next.id)} ${esc(next.title)} →</a>` : ""}</nav>
  </div>`;
}

/** A short panel for the Progress page: the three measures in one line, and the map in miniature. */
export function specSummaryHtml(m) {
  const o = m.overall;
  return `<section class="co-panel sm-mini"><div class="cx-acth"><h3>Specification mastery</h3><span>${esc(m.spec.title)} ${summaryNote(m.spec, { short: true })}</span></div>
    <div class="sm-mrow"><div><small>Mastery</small><b>${o.estimate == null ? "Not assessed yet" : `${o.provisional ? "~" : ""}${pct(o.estimate)}`}</b>${o.estimate == null ? "" : `<span class="sm-pill b-${o.band.key}">${esc(o.band.label)}</span>`}</div>
      <div><small>Confidence</small><b class="sm-cfig">${meter(o.confidence)}${esc(o.confidence === "none" ? "None yet" : CONFIDENCE[o.confidence].label.replace(" confidence", ""))}</b></div>
      <div><small>Coverage</small><b>${o.assessed}<small> of ${o.total} assessed</small></b></div>
      <a class="btn btn-light lg btn-sm" href="#/spec"><span>Open your specification</span></a></div>
    <a class="sm-tiles sm-mtiles" href="#/spec" aria-label="Open your specification map">${m.points.map((p) => `<i class="${tileCls(p)}"${tileStyle(p)}></i>`).join("")}</a></section>`;
}
