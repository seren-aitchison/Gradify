// Specification Mastery pages for the course engine (#/spec and #/spec/<point>): the learner's evidence mapped onto
// the specification they're sitting (kit/learning/spec-mastery.js). HTML only; kit/course/course.js wires it.
// The heatmap uses the activity tracker's colour scale (kit/styles/course.css .co-heat), so darker always means more.
import { esc } from "../core/text.js";
import { BANDS, UNASSESSED, CONFIDENCE, basisText, weakestPoints } from "../learning/spec-mastery.js";
import { sixHtml, calibrationHtml } from "../learning/mastery-view.js";

const pct = (v) => `${Math.round(v * 100)}%`;
// how strong each band's colour is, on the activity tracker's scale
const SHADE = { emerging: 0.2, building: 0.38, developing: 0.56, secure: 0.76, strong: 1 };
const COVER = { full: ["Taught on Gradify", "Lessons teach and assess the whole of this point."], partial: ["Partly taught on Gradify", "Lessons cover part of this point; the rest needs your class notes."], none: ["Not on Gradify yet", "No Gradify lesson teaches this point yet, so it can't be measured here."] };
const TREND = { improving: "Improving: your recent answers are better than earlier ones.", steady: "Steady: recent answers are about the same as earlier ones.", slipping: "Slipping: your recent answers are clearly weaker than before. Worth revisiting." };

const fig = (p) => (p.estimate == null ? "–" : `${p.provisional ? "~" : ""}${pct(p.estimate)}`);
const tags = (p) => `${p.ht ? `<span class="sm-tag" title="Higher tier only">HT</span>` : ""}${p.sep ? `<span class="sm-tag" title="In GCSE Biology, not Combined Science">Biology only</span>` : ""}`;
const pill = (b) => `<span class="sm-pill b-${b.key}">${esc(b.label)}</span>`;
const confPill = (c) => `<span class="sm-conf c-${c}" title="${esc(CONFIDENCE[c].what)}">${esc(CONFIDENCE[c].label)}</span>`;
const pointLabel = (p) => `${p.id} ${p.title}: ${p.estimate == null ? (p.coverage.gradify === "none" ? "not on Gradify yet" : "not yet assessed") : `${p.band.label}, ${fig(p)}, ${CONFIDENCE[p.confidence.level].label.toLowerCase()}`}`;

/** one tile of the heatmap */
function tile(p) {
  const cls = [`b-${p.band.key}`, p.provisional ? "prov" : "", p.coverage.gradify === "none" ? "gap" : "", p.trend === "slipping" ? "slip" : ""].filter(Boolean).join(" ");
  return `<a href="#/spec/${esc(p.id)}" class="${cls}" style="--v:${SHADE[p.band.key] ?? 0}" data-tip="${esc(pointLabel(p))}" aria-label="${esc(pointLabel(p))}"></a>`;
}

/** the five stages as one bar, with the learner's place on it */
function scaleHtml(v) {
  return `<div class="sm-scale" aria-hidden="true">${BANDS.map((b) => `<span class="b-${b.key}" style="--v:${SHADE[b.key]}"><small>${b.label}</small></span>`).join("")}${v == null ? "" : `<i style="left:${Math.min(99, Math.max(1, v * 100))}%"></i>`}</div>`;
}

export function legendHtml() {
  return `<ul class="sm-legend">${BANDS.map((b) => `<li><i class="b-${b.key}" style="--v:${SHADE[b.key]}"></i>${b.label} <small>${b.min}–${b.key === "strong" ? 100 : b.min + 19}%</small></li>`).join("")}
    <li><i class="b-unassessed"></i>${UNASSESSED.label}</li><li><i class="b-unassessed gap"></i>Not on Gradify yet</li><li><i class="b-developing prov" style="--v:${SHADE.developing}"></i>Early estimate</li></ul>`;
}

/** The whole specification: headline, heatmap by topic, and where to focus. */
export function specPageHtml(m, { specs = [], tier = "higher", practiseHref, single = false } = {}) {
  const s = m.spec, o = m.overall, weak = weakestPoints(m, 3);
  const chooser = specs.length > 1 ? `<label class="sm-choose">Specification <select data-spec>${specs.map((x) => `<option value="${esc(x.id)}" ${x.id === s.id ? "selected" : ""}>${esc(x.title)}</option>`).join("")}</select></label>` : "";
  const tiers = s.tiers ? `<div class="sm-tier" role="group" aria-label="Tier">${[["higher", "Higher"], ["foundation", "Foundation"]].map(([k, l]) => `<button type="button" data-tier="${k}" aria-pressed="${tier === k}">${l}</button>`).join("")}</div>` : "";
  const headline = o.estimate == null
    ? `<div class="sm-big none"><b>Not yet assessed</b><span>Answer a few check questions and Gradify will start mapping what you can do onto the specification. It won't guess from nothing.</span></div>`
    : `<div class="sm-big"><b>${pct(o.estimate)}</b><span>Estimated specification mastery ${pill(o.band)} ${confPill(o.confidence)}</span><small>Across the ${o.assessed} ${o.assessed === 1 ? "point" : "points"} you have evidence on, weighted by how much evidence each has. Points you haven't been assessed on aren't counted as zero.</small></div>`;
  return `<div class="co-intro sm-head"><span class="co-kicker">Specification mastery</span>
      <h2>${esc(s.subject)} <span class="sm-dot">·</span> ${esc(s.qualification)} ${esc(s.board)}</h2>
      <p>How far your own answers show you can do each point of <b>${esc(s.title)}</b>, built from your check questions, quizzes, exams, flashcards and labs across Gradify.</p>
      <div class="sm-controls"><span class="sm-live"><i></i>Live tracking</span>${chooser}${tiers}</div></div>
    <section class="co-panel sm-hero">${headline}
      <div class="sm-stats">${[["Specification points", o.total, s.tiers ? `${tier === "foundation" ? "Foundation" : "Higher"} tier` : ""], ["With learning evidence", o.assessed, `${o.measured} measured, ${o.assessed - o.measured} early estimates`], ["Taught on Gradify", o.covered, `${o.full} fully, ${o.covered - o.full} in part`], ["Lessons completed", `${o.lessonsDone}`, `of ${o.lessonsMapped} mapped lessons`]].map(([k, v, d]) => `<div><small>${k}</small><b>${v}</b><em>${esc(d)}</em></div>`).join("")}</div>
      ${scaleHtml(o.estimate)}
      <p class="co-acct">Updated every time you answer. Based on learning evidence across Gradify.</p></section>
    <section class="co-panel sm-map"><div class="cx-acth"><h3>Specification heatmap</h3><span>${o.assessed} of ${o.total} points assessed</span></div>
      <p class="co-acct">Each tile is one specification point. Darker, stronger colours mean more demonstrated understanding. Pick one to see the evidence behind it.</p>
      ${legendHtml()}
      <div class="sm-topics">${m.topics.map((t) => `<div class="sm-topic"><div class="sm-th"><b>${esc(t.id)} ${esc(t.title)}</b><span class="${t.attention ? "warn" : ""}">${esc(t.status)}${t.estimate != null ? ` · ${pct(t.estimate)}` : ""}</span></div>
        <div class="sm-tiles">${t.points.map(tile).join("")}</div></div>`).join("")}</div>
      <p class="sm-tipline" aria-live="polite">Hover over or focus a tile to see its point.</p></section>
    ${weak.length ? `<section class="co-panel sm-focus"><h3>Where to focus next</h3><p class="co-acct">The assessed points your answers show are weakest${o.slipping ? ", with any that are slipping raised" : ""}.</p>
      <ul>${weak.map((p) => `<li><a href="#/spec/${esc(p.id)}"><span class="sm-id">${esc(p.id)}</span>${esc(p.title)}</a>${pill(p.band)}<small>${fig(p)}${p.trend === "slipping" ? " · slipping" : ""}</small>${practiseHref && p.practise.length ? `<a class="btn btn-ghost btn-sm" href="${practiseHref(p)}"><span>Practise</span></a>` : ""}</li>`).join("")}</ul></section>` : ""}
    <section class="co-panel sm-how"><h3>How this is worked out</h3>
      <div class="sm-three">${[["Coverage", "Does Gradify teach this point, and have you completed those lessons? Completing a lesson is coverage, never mastery."], ["Demonstrated mastery", "How well your own answers show you can do it: recognising, recalling, explaining, applying, using it cold and remembering it weeks later."], ["Confidence", "How much evidence the figure rests on. 85% from 40 varied answers means more than 85% from two easy ones."]].map(([h, d]) => `<div><b>${h}</b><p>${d}</p></div>`).join("")}</div>
      <p class="co-acct">${esc(s.title)}: ${esc(s.version)}. ${s.wording === "verbatim" ? "Point wording is the board's own." : "Point wording is Gradify's own summary of each requirement, not the board's wording; check the exact wording in the published specification."}${s.url ? ` <a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.board)}'s specification ↗</a>` : ""} Gradify isn't endorsed by ${esc(s.board)}.</p></section>`;
}

/** One point: the wording, the estimate and its basis, what the learner can and can't yet show, and what to do. */
export function pointPageHtml(p, { spec, titleOf = (id) => id, statusOf = () => null, practiseHref } = {}) {
  const c = p.confidence, cov = COVER[p.coverage.gradify];
  const lessonRow = (id, kind) => {
    const r = p.byLesson[id] || { state: "unanswered", n: 0 }, st = statusOf(id);
    const read = r.n ? `${r.n} ${r.n === 1 ? "answer" : "answers"} · latest ${pct(r.latest)}${r.state === "inconsistent" ? " · inconsistent" : ""}` : "no answers yet";
    return `<li class="r-${r.state}"><a href="#/lesson/${esc(id)}">${esc(titleOf(id))}</a><small>${kind === "partial" ? "Covers part of this point · " : ""}${st ? `${esc(st)} · ` : ""}${read}</small><span class="sm-res" data-res="${esc(id)}"></span></li>`;
  };
  const series = p.series || [], has = series.some((v) => v != null);
  return `<div class="sm-point">
    <a class="sm-back" href="#/spec">← Specification mastery</a>
    <span class="co-kicker">${esc(p.topic.id)} ${esc(p.topic.title)} · ${esc(p.group.title)}</span>
    <h2><span class="sm-id">${esc(p.id)}</span> ${esc(p.title)} ${tags(p)}</h2>
    <blockquote class="sm-wording"><p>${esc(p.text)}</p><footer>${esc(spec.title)} · ${spec.wording === "verbatim" ? "the board's wording" : "Gradify's summary of the requirement; check the exact wording in the specification"}${spec.url ? ` <a href="${esc(spec.url)}" target="_blank" rel="noopener">↗</a>` : ""}</footer></blockquote>
    <section class="co-panel sm-hero sm-phero">
      <div class="sm-big ${p.estimate == null ? "none" : ""}"><b>${p.estimate == null ? (p.coverage.gradify === "none" ? "Not on Gradify yet" : "Not yet assessed") : fig(p)}</b>
        <span>${p.estimate == null ? "" : `${pill(p.band)} `}${confPill(c.level)}${p.provisional ? ` <em class="sm-early">Early estimate</em>` : ""}</span><small>${esc(basisText(c))}</small></div>
      ${scaleHtml(p.estimate)}
      <p class="sm-next">${esc(p.next)}</p>
      <div class="co-row">${practiseHref && p.practise.length ? `<a class="btn btn-light lg btn-sm" href="${practiseHref(p)}"><span>${p.estimate == null ? "Try some questions on this" : "Practise the weakest area"}</span></a>` : ""}${p.practise[0] ? `<a class="btn btn-ghost lg btn-sm" href="#/lesson/${esc(p.practise[0])}"><span>Open ${esc(titleOf(p.practise[0]))}</span></a>` : ""}</div></section>
    <div class="sm-stats sm-pstats">${[["Coverage", cov[0], cov[1]], ["Your lessons", `${p.coverage.done} of ${p.coverage.total}`, "completed (coverage, not mastery)"], ["Confidence in the estimate", CONFIDENCE[c.level].label.replace(" confidence", ""), CONFIDENCE[c.level].what]].map(([k, v, d]) => `<div><small>${k}</small><b>${esc(v)}</b><em>${esc(d)}</em></div>`).join("")}</div>
    <div class="sm-two">
      <section class="co-panel"><h3>What you can already show</h3>${p.can.length ? `<ul class="sm-list ok">${p.can.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p class="co-empty">${c.level === "none" ? "Nothing yet: no answers on this point." : "Nothing consistently yet. Keep practising."}</p>`}</section>
      <section class="co-panel"><h3>Where you're struggling</h3>${p.struggle.length ? `<ul class="sm-list lo">${p.struggle.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p class="co-empty">${c.level === "none" ? "Nothing measured yet." : "Nothing stands out from your answers so far."}</p>`}</section>
    </div>
    <section class="co-panel"><h3>Recent performance</h3>
      ${has ? `<div class="sm-spark" role="img" aria-label="Average score each week for the last 8 weeks">${series.map((v, i) => `<span title="${v == null ? "No answers" : pct(v)} · ${8 - i === 1 ? "this week" : `${8 - i} weeks ago`}"><i style="height:${v == null ? 0 : Math.max(6, v * 100)}%" class="${v == null ? "" : v >= 0.7 ? "hi" : v < 0.5 ? "lo" : ""}"></i></span>`).join("")}</div><div class="sm-sparkx"><small>8 weeks ago</small><small>This week</small></div>` : ""}
      <p class="co-empty">${p.trend ? TREND[p.trend] : has ? "Not enough answers yet, in the last two weeks and before them, to say whether this is improving." : "No answers yet."}</p></section>
    <section class="co-panel co-mx"><h3>Six kinds of evidence</h3><p class="co-acct">What your answers on this point show, kind by kind. A kind with fewer than three answers is shown as an estimate.</p>${sixHtml(p.profile)}${calibrationHtml(p.profile)}</section>
    <section class="co-panel"><h3>Lessons, questions and flashcards for this point</h3>
      ${p.lessons.length || p.partial.length ? `<ul class="sm-lessons">${p.lessons.map((id) => lessonRow(id, "full")).join("")}${p.partial.map((id) => lessonRow(id, "partial")).join("")}</ul>` : `<p class="co-empty">${esc(cov[1])}</p>`}</section>
  </div>`;
}

/** A short panel for the Progress page. */
export function specSummaryHtml(m) {
  const o = m.overall;
  return `<section class="co-panel sm-mini"><div class="cx-acth"><h3>Specification mastery</h3><span>${esc(m.spec.title)}</span></div>
    <div class="sm-mrow"><b>${o.estimate == null ? "–" : pct(o.estimate)}</b><div>${o.estimate == null ? "<p>Not yet assessed. Answer some check questions to start.</p>" : `<p>${pill(o.band)} ${confPill(o.confidence)}</p>`}<small>${o.assessed} of ${o.total} points with evidence · ${o.covered} taught on Gradify</small></div>
    <a class="btn btn-light lg btn-sm" href="#/spec"><span>See the specification</span></a></div>
    <div class="sm-tiles sm-mtiles" aria-hidden="true">${m.points.map((p) => `<i class="b-${p.band.key} ${p.provisional ? "prov" : ""} ${p.coverage.gradify === "none" ? "gap" : ""}" style="--v:${SHADE[p.band.key] ?? 0}"></i>`).join("")}</div></section>`;
}
