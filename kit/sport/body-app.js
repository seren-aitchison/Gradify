// Body Intelligence page (sportgradify/body.html): wires the 3D view (body-view.js), the
// calculations (body-intel.js) and storage (body-store.js) into the interface.
import { MUSCLES, EXERCISES, TESTS, PART_FACTORS, exercisesFor } from "./exercises.js";
import { recommendations } from "./recommend.js";
import { partName } from "./anatomy-parts.js";
import { stimulus, development, recovery, fitness, muscleSummary, heatColour, hex, meshKeys, dayTime, STIMULUS_TOP } from "./body-intel.js";
import { openBodyStore, XP } from "./body-store.js";
import { mountBody, ATTRIBUTION } from "./body-view.js";

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const today = () => new Date().toISOString().slice(0, 10);
const DAY = 864e5;
const fmt = (n, d = 1) => (Math.round(n * 10 ** d) / 10 ** d).toLocaleString();
const pct = (x) => `${x >= 0 ? "+" : ""}${fmt(x * 100, 1)}%`;

const MODES = {
  stimulus: { name: "Training stimulus", label: "Recent training stimulus, from your logged sets",
    legend: ["None", "Low", "Moderate", "High", "Very high"], note: `Effective hard sets per week, weighted by how much each exercise loads the muscle and fading with a 7-day half-life. Around 10–20 hard sets a week per muscle is common evidence-based guidance for growth; ${STIMULUS_TOP}+ is the top of the scale.` },
  development: { name: "Development", label: "Estimated strength progression: last 4 weeks vs the 8 weeks before",
    legend: ["−10%", "", "No change", "", "+10%"], note: "From estimated one-rep maxes (Epley, sets of 1–12 reps) or best reps for bodyweight moves. It tracks strength in the exercises you log. It does not measure muscle size. Grey means not enough logged history yet." },
  recovery: { name: "Recovery", label: "Recovery estimate from recent load and reported soreness (not a medical assessment)",
    legend: ["Recovered", "", "Recovering", "", "Fatigued"], note: "Recent sets fade with a 36-hour time constant; soreness you report adds to them. Real recovery varies with sleep, nutrition, stress and training age, so treat this as a guide." },
  fitness: { name: "Fitness", label: "Measured tests, compared only with your own first result",
    legend: ["Worse", "", "Baseline", "", "Improved"], note: "Only measured results count here. Log the same test again to see change. Turn on Heart & lungs to see cardiovascular tests." },
};

export async function startBodyApp(root) {
  root.innerHTML = `
  <div class="bi">
    <div class="bi-stage">
      <div class="bi-modes" role="tablist" aria-label="Heat map">${Object.entries(MODES).map(([k, m], i) => `<button role="tab" type="button" data-mode="${k}" aria-selected="${i === 0}">${m.name}</button>`).join("")}</div>
      <div class="bi-ctl" role="group" aria-label="Camera">
        <button type="button" data-zoom="0.75" aria-label="Zoom in">+</button><button type="button" data-zoom="1.33" aria-label="Zoom out">−</button>
        <button type="button" data-view="reset" aria-label="Reset view">⟲</button>
      </div>
      <div class="bi-views" role="group" aria-label="Views">${["front", "back", "left", "right"].map((v) => `<button type="button" data-view="${v}">${v[0].toUpperCase() + v.slice(1)}</button>`).join("")}</div>
      <div class="bi-legend"><p class="bi-legend-label"></p><div class="bi-ramp"></div><div class="bi-ticks"></div></div>
      <div class="bi-layers" role="group" aria-label="Layers">
        <label><input type="checkbox" data-layer="skeleton" checked> Skeleton</label>
        <label><input type="checkbox" data-layer="organs"> Heart &amp; lungs</label>
        <label><input type="checkbox" data-layer="skin"> Skin</label>
        <label><input type="checkbox" data-detail> Individual muscles</label>
        <label><input type="checkbox" data-spin> Turn</label>
      </div>
      <div class="bi-tip" hidden></div>
      <div class="bi-loading">Loading the anatomy model…</div>
      <p class="bi-credit">${esc(ATTRIBUTION)} <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a></p>
    </div>
    <aside class="bi-side">
      <div class="bi-tabs" role="tablist">${[["muscle", "Body"], ["log", "Log workout"], ["check", "Check-in"], ["tests", "Tests"], ["ex", "Exercises"]].map(([k, n], i) => `<button role="tab" type="button" data-tab="${k}" aria-selected="${i === 0}">${n}</button>`).join("")}</div>
      <div class="bi-pane" data-pane="muscle"></div>
      <div class="bi-pane" data-pane="log" hidden></div>
      <div class="bi-pane" data-pane="check" hidden></div>
      <div class="bi-pane" data-pane="tests" hidden></div>
      <div class="bi-pane" data-pane="ex" hidden></div>
    </aside>
  </div>
  <div class="bi-time glass">
    <label>Showing your body as of <b class="bi-asof"></b><input type="range" class="bi-date" min="-365" max="0" value="0" step="1" aria-label="Date"></label>
    <span class="bi-status"></span>
  </div>
  <section class="bi-history glass"><h3>Training history</h3><div class="bi-hist"></div></section>
  <div class="bi-toast" role="status" aria-live="polite" hidden></div>`;
  const $ = (s) => root.querySelector(s), $$ = (s) => [...root.querySelectorAll(s)];

  const { store, user, importError } = await openBodyStore();
  const data = { workouts: [], checkins: [], tests: [] };
  const ui = { mode: "stimulus", selected: null, part: null, organ: null, at: Date.now(), tab: "muscle", preview: null, detail: false };
  async function reload() { [data.workouts, data.checkins, data.tests] = await Promise.all([store.listWorkouts(), store.listCheckins(), store.listTests()]); }
  await reload();
  $(".bi-status").innerHTML = user ? `Saved to your Gradify account` : `Saved in this browser · <a href="app.html#/account">sign in</a> to keep it on every device`;
  if (importError) toast("Couldn't move your browser data into your account yet. It's still saved here.");

  let view;
  try { view = await mountBody($(".bi-stage"), { onSelect, onHover }); root.bodyView = view; $(".bi-loading").remove(); }
  catch (e) { $(".bi-loading").textContent = "The 3D model couldn't load on this device (WebGL is needed). Your data and the panels still work."; console.error(e); }

  // ---------- computation for the current mode and date ----------
  function compute() {
    const at = ui.at;
    if (ui.mode === "stimulus") { const s = stimulus(data.workouts, at), p = stimulus(data.workouts, at, { parts: true }); return { muscles: map(s, (v) => (v.weekly > 0.05 ? v.t : null)), parts: map(p, (v) => (v.weekly > 0.05 ? v.t : null)), organs: {} }; }
    if (ui.mode === "development") { const d = development(data.workouts, at); return { muscles: map(d, (v) => v?.t ?? null), organs: {} }; }
    if (ui.mode === "recovery") { const r = recovery(data.workouts, data.checkins, at), p = recovery(data.workouts, data.checkins, at, { parts: true }); return { muscles: map(r, (v) => v.t), parts: map(p, (v) => v.t), organs: {} }; }
    const f = fitness(data.tests, at).map, muscles = {}, organs = {};
    for (const [k, v] of Object.entries(f)) (/^(heart|lung)/.test(k) ? organs : muscles)[k] = v.t;
    return { muscles, organs };
  }
  const map = (o, f) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, f(v)]));
  const toColours = (o) => Object.fromEntries(Object.entries(o).filter(([, t]) => t != null).map(([k, t]) => [k, { rgb: heatColour(t) }]));
  function repaint() {
    const c = compute();
    view?.paint(toColours(c.muscles), toColours(c.organs), toColours(c.parts || {}));
    const m = MODES[ui.mode];
    $(".bi-legend-label").textContent = m.label;
    $(".bi-ramp").style.background = `linear-gradient(90deg, ${[0, 0.25, 0.5, 0.75, 1].map((t) => hex(heatColour(t))).join(", ")})`;
    $(".bi-ticks").innerHTML = m.legend.map((l) => `<span>${esc(l)}</span>`).join("") + `<span class="nd"><i></i>No data</span>`;
    $(".bi-asof").textContent = new Date(ui.at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
    renderPanel();
  }

  // ---------- side panel: overview or the selected muscle ----------
  // where a number comes from: logged (what you entered), calculated (arithmetic on logs),
  // estimated (a model on top of logs), measured (a test result)
  const tag = (kind) => `<i class="bi-tag t-${kind}" title="${{ logged: "What you logged", calculated: "Calculated from your logs", estimated: "Estimated by a model from your logs", measured: "A measured test result" }[kind]}">${kind}</i>`;
  const day = (iso) => new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short" });
  function chart(weeks) {
    // effective sets per week for 12 weeks, with the 10–20 sets guideline band behind the bars
    const top = Math.max(22, ...weeks) * 1.05, W = 300, H = 120, pad = 22, bw = (W - pad) / weeks.length, y = (v) => H - 14 - (v / top) * (H - 24);
    return `<svg class="bi-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Effective sets per week for the last 12 weeks">
      <rect x="${pad}" y="${y(20)}" width="${W - pad}" height="${y(10) - y(20)}" class="band"/><text x="${W - 2}" y="${y(20) + 10}" class="bl">10–20 guideline</text>
      ${[0, 10, 20].map((v) => `<text x="${pad - 4}" y="${y(v) + 3}" class="ax">${v}</text>`).join("")}
      ${weeks.map((v, i) => `<rect x="${pad + i * bw + 2}" y="${y(v)}" width="${bw - 4}" height="${Math.max(1, y(0) - y(v))}" rx="2" class="bar${i === weeks.length - 1 ? " now" : ""}"><title>${fmt(v)} sets, ${11 - i ? `${11 - i} week${11 - i > 1 ? "s" : ""} ago` : "this week"}</title></rect>`).join("")}
      <text x="${pad}" y="${H - 2}" class="ax" text-anchor="start">12 weeks ago</text><text x="${W}" y="${H - 2}" class="ax">this week</text></svg>`;
  }
  const delta = (now, before) => { const d = now - before; return Math.abs(d) < 0.05 ? `<small>no change vs 4 weeks ago</small>` : `<small class="${d > 0 ? "up" : "down"}">${d > 0 ? "+" : "−"}${fmt(Math.abs(d))} vs 4 weeks ago</small>`; };
  function recHtml(list) {
    return list.map((r) => `<li class="bi-rec k-${r.kind}"><div><b>${esc(r.title)}</b> ${tag(r.basis)}<p>${esc(r.detail)}</p></div>${r.muscles.length ? `<button type="button" class="bi-show" data-show='${esc(JSON.stringify(r.muscles))}'>Show</button>` : ""}</li>`).join("");
  }

  function renderPanel() {
    const pane = $('[data-pane="muscle"]');
    if (ui.organ) return (pane.innerHTML = organPanel(ui.organ));
    if (!ui.selected) return (pane.innerHTML = overview());
    const s = muscleSummary(ui.selected, data.workouts, data.checkins, ui.at), f = fitness(data.tests, ui.at).map[meshKeys(ui.selected)[0]];
    const asym = s.sides && Math.max(s.sides.l, s.sides.r) > 1 && Math.abs(s.sides.l - s.sides.r) / Math.max(s.sides.l, s.sides.r) > 0.2;
    const dev = s.development, part = ui.part && s.parts.find((p) => p.id === ui.part);
    const recs = recommendations(data, ui.at).filter((r) => r.muscles.includes(ui.selected));
    pane.innerHTML = `
      <div class="bi-mhead"><button type="button" class="bi-back" data-act="${part ? "group" : "clear"}" aria-label="Back">←</button><div><h3>${esc(part ? part.name : s.name)}</h3><p>${esc(part ? `Part of ${s.name}` : s.detail)}</p></div></div>
      ${part ? `
        <p class="bi-about">${esc(part.about)}</p>
        <div class="bi-stats">
          <div><b>${fmt(part.weekly)}</b><span>effective sets / week ${tag("estimated")}<small>group sets weighted by how each exercise loads this muscle</small></span></div>
          <div><b class="st-${part.recovery.state}">${esc(part.recovery.state)}</b><span>${part.recovery.hours ? `≈${part.recovery.hours} h to recover` : "recovery"} ${tag("estimated")}</span></div>
        </div>
        ${part.sides ? `<p class="mute">Left ${fmt(part.sides.l)} · right ${fmt(part.sides.r)} effective sets a week.</p>` : ""}
        <h4>Exercises that load it most</h4>
        <div class="bi-chips">${exercisesFor(ui.selected).map((x) => ({ ...x, w: x.weight * (PART_FACTORS[x.id]?.[ui.selected]?.[ui.part] ?? 1) })).filter((x) => x.w >= 0.5).sort((a, b) => b.w - a.w).slice(0, 8).map((x) => `<button type="button" class="chip" data-preview="${x.id}">${esc(x.name)}</button>`).join("") || `<span class="mute">Trained indirectly by the exercises for ${esc(s.name)}.</span>`}</div>
        <h4>${esc(s.name)} as a whole</h4>` : `<p class="bi-about">${esc(s.about)}</p>`}
      <div class="bi-stats">
        <div><b>${fmt(s.weekly)}</b><span>effective sets / week ${tag("calculated")}${delta(s.weekly, s.weeklyBefore)}</span></div>
        <div><b>${fmt(s.perWeek, 1)}</b><span>sessions / week ${tag("calculated")}<small>${s.sessions28} in the last 4 weeks</small></span></div>
        <div><b>${s.lastTrained ? esc(day(s.lastTrained)) : "—"}</b><span>last trained ${tag("logged")}</span></div>
        <div><b class="st-${s.recovery.state}">${esc(s.recovery.state)}</b><span>${s.recovery.hours ? `≈${s.recovery.hours} h to recover` : "recovery"} ${tag("estimated")}</span></div>
      </div>
      ${s.sides ? `<div class="bi-lr"><span>Left</span><div><i style="width:${Math.round((s.sides.l / Math.max(1, s.sides.l, s.sides.r)) * 100)}%"></i></div><b>${fmt(s.sides.l)}</b><span>Right</span><div><i style="width:${Math.round((s.sides.r / Math.max(1, s.sides.l, s.sides.r)) * 100)}%"></i></div><b>${fmt(s.sides.r)}</b></div>` : ""}
      ${asym ? `<p class="bi-flag">Left/right difference over 20%, from the unilateral sets you logged.</p>` : ""}
      ${recs.length ? `<h4>Suggestions</h4><ul class="bi-recs">${recHtml(recs.slice(0, 3))}</ul>` : ""}
      <h4>Weekly training ${tag("calculated")}</h4>
      ${chart(s.weeks)}
      ${s.parts.length && !part ? `<h4>Individual muscles ${tag("estimated")}</h4><ul class="bi-list">${s.parts.map((p) => `<li><button type="button" class="linkish" data-select="${ui.selected}" data-part="${p.id}">${esc(p.name)}</button><b>${fmt(p.weekly)} sets/wk <small class="st-${p.recovery.state}">${esc(p.recovery.state)}</small></b></li>`).join("")}</ul>` : ""}
      ${s.topExercises.length ? `<h4>What trained it (last 4 weeks) ${tag("calculated")}</h4><ul class="bi-contrib">${s.topExercises.map((x) => `<li><span>${esc(x.name)}</span><div><i style="width:${Math.round(x.share * 100)}%"></i></div><b>${Math.round(x.share * 100)}%</b></li>`).join("")}</ul>` : ""}
      <h4>Estimated strength ${tag("estimated")}</h4>
      ${dev ? `<p><b>${pct(dev.change)}</b> over the last 4 weeks vs the 8 before.</p><ul class="bi-list sm">${dev.evidence.map((c) => `<li><span>${esc(EXERCISES[c.exercise].name)}</span><b>${c.metric} ${fmt(c.before)} → ${fmt(c.now)}</b></li>`).join("")}</ul>` : `<p class="mute">Not enough history yet: log an exercise that trains this muscle in two different months to see a trend.</p>`}
      ${f ? `<h4>Measured ${tag("measured")}</h4><p>${f.tests.map((r) => `${esc(r.name)}: ${fmt(r.last)} ${esc(r.unit)}${r.count > 1 ? ` (${pct(r.change)} vs your first)` : " (baseline)"}`).join("<br>")}</p>` : ""}
      ${part ? "" : `<h4>Exercises that train it</h4>
      <div class="bi-chips">${exercisesFor(ui.selected).slice(0, 8).map((x) => `<button type="button" class="chip" data-preview="${x.id}">${esc(x.name)}${x.weight >= 1 ? " ●" : ""}</button>`).join("")}</div>`}
      <p class="bi-fine">${esc(MODES[ui.mode].note)}</p>`;
  }
  function overview() {
    const s = stimulus(data.workouts, ui.at), byMuscle = Object.keys(MUSCLES).map((m) => ({ m, w: meshKeys(m).reduce((a, k) => a + s[k].weekly, 0) / meshKeys(m).length })).sort((a, b) => b.w - a.w);
    const recent = data.workouts.filter((w) => dayTime(w.date) > ui.at - 28 * DAY && dayTime(w.date) <= ui.at);
    if (!data.workouts.length && !data.tests.length) return `
      <h3>Your body, from your training</h3>
      <p>Log your workouts and the model colours each muscle by how much it's been trained, how your strength is trending, how recovered it is and how your measured fitness is changing.</p>
      <ol class="bi-steps"><li><button type="button" class="linkish" data-goto="log">Log a workout</button>: exercises, sets, reps and load.</li><li>Tap any muscle for its stimulus, trend and the exercises that train it. Turn on <b>Individual muscles</b> to tap single muscles like the rectus femoris or lateral deltoid.</li><li>Add a <button type="button" class="linkish" data-goto="tests">fitness test</button> (5 km, push-ups, sit-and-reach…) to track measured performance.</li></ol>
      <p class="bi-fine">Body Intelligence is a training guide, not a medical device. It can only know what you log.</p>`;
    const trained = byMuscle.filter((x) => x.w > 0.05), quiet = byMuscle.filter((x) => x.w < 2);
    const sets = recent.reduce((a, w) => a + w.sets.length, 0), recs = recommendations(data, ui.at);
    return `
      <h3>${esc(MODES[ui.mode].name)}</h3>
      <p class="mute">${esc(MODES[ui.mode].label)}.</p>
      <div class="bi-stats"><div><b>${recent.length}</b><span>workouts in 4 weeks ${tag("logged")}</span></div><div><b>${sets}</b><span>sets in 4 weeks ${tag("logged")}</span></div></div>
      ${recs.length ? `<h4>Suggestions from your data</h4><ul class="bi-recs">${recHtml(recs.slice(0, 5))}</ul>` : ""}
      ${trained.length ? `<h4>Most trained ${tag("calculated")}</h4><ul class="bi-list">${trained.slice(0, 5).map((x) => `<li><button type="button" class="linkish" data-select="${x.m}">${esc(MUSCLES[x.m].name)}</button><b>${fmt(x.w)} sets/wk</b></li>`).join("")}</ul>` : ""}
      ${quiet.length ? `<h4>Little recent training</h4><div class="bi-chips">${quiet.slice(0, 8).map((x) => `<button type="button" class="chip" data-select="${x.m}">${esc(MUSCLES[x.m].name)}</button>`).join("")}</div>` : ""}
      <p class="bi-fine">${esc(MODES[ui.mode].note)}</p>
      <p class="bi-fine"><button type="button" class="linkish" data-act="export">Download my body data (JSON)</button></p>`;
  }
  function organPanel(organ) {
    const f = fitness(data.tests, ui.at).results.filter((r) => (r.organs || []).includes(organ));
    return `<div class="bi-mhead"><button type="button" class="bi-back" data-act="clear" aria-label="Back">←</button><div><h3>${organ === "heart" ? "Heart" : "Lungs"}</h3><p>Cardiovascular fitness</p></div></div>
      ${f.length ? `<ul class="bi-list">${f.map((r) => `<li><span>${esc(r.name)}</span><b>${fmt(r.last)} ${esc(r.unit)}${r.count > 1 ? ` · ${pct(r.change)}` : ""}</b></li>`).join("")}</ul>` : `<p class="mute">No cardiovascular tests yet. Add a 5 km time, resting heart rate or VO₂max estimate under <button type="button" class="linkish" data-goto="tests">Tests</button>.</p>`}
      <p class="bi-fine">Compared only with your own earlier results.</p>`;
  }

  function onSelect(m, opts = {}) {
    ui.preview = null; ui.organ = opts.organ ? m : null; ui.selected = opts.organ ? null : m; ui.part = opts.part || null;
    if (m && !opts.organ) view?.select(m, { part: ui.part });
    if (m) openTab("muscle"); renderPanel();
  }
  const tip = $(".bi-tip");
  function onHover(name, x, y) {
    tip.hidden = !name; if (!name) return;
    tip.textContent = name;
    tip.style.transform = `translate(${x + 14}px, ${y + 12}px)`;
  }

  // ---------- log workout ----------
  const grouped = Object.entries(EXERCISES).reduce((a, [id, x]) => ((a[x.category] ||= []).push([id, x]), a), {});
  const exOptions = (sel) => Object.entries(grouped).map(([cat, list]) => `<optgroup label="${esc(cat)}">${list.map(([id, x]) => `<option value="${id}"${id === sel ? " selected" : ""}>${esc(x.name)}</option>`).join("")}</optgroup>`).join("");
  function rowHtml(r = {}) {
    const x = EXERCISES[r.exercise || "back_squat"];
    return `<div class="bi-row">
      <select data-f="exercise" aria-label="Exercise">${exOptions(r.exercise || "back_squat")}</select>
      <label>Sets<input data-f="sets" type="number" min="1" max="20" value="${r.sets || 3}"></label>
      <label>Reps<input data-f="reps" type="number" min="1" max="100" value="${r.reps || 8}"></label>
      <label>kg<input data-f="load_kg" type="number" min="0" max="1000" step="0.5" value="${r.load_kg ?? (x.bodyweight ? 0 : 20)}"></label>
      <label>RPE<input data-f="rpe" type="number" min="1" max="10" step="0.5" placeholder="–" value="${r.rpe ?? ""}"></label>
      <label class="bi-side-sel"${x.unilateral ? "" : " hidden"}>Side<select data-f="side"><option value="">Both</option><option value="l">Left</option><option value="r">Right</option></select></label>
      <button type="button" class="bi-x" data-act="rmrow" aria-label="Remove">×</button></div>`;
  }
  function renderLog() {
    $('[data-pane="log"]').innerHTML = `
      <form class="bi-form" data-form="workout">
        <div class="bi-two"><label>Date<input type="date" name="date" value="${today()}" max="${today()}" required></label><label>Name<input name="name" placeholder="e.g. Lower body" maxlength="120"></label></div>
        <div class="bi-rows">${rowHtml()}</div>
        <button type="button" class="btn btn-sm" data-act="addrow"><span>+ Add exercise</span></button>
        <p class="bi-fine">RPE (rate of perceived exertion, 1–10) is optional. Sets at RPE 8+ count fully, lighter sets count less; without RPE a set counts as moderately hard. Bodyweight moves: leave kg at 0 or add extra load.</p>
        <button class="btn btn-light lg" type="submit"><span>Save workout · +${XP.workout} XP</span></button>
      </form>`;
  }
  renderLog();

  // ---------- soreness check-in ----------
  function renderCheck() {
    $('[data-pane="check"]').innerHTML = `
      <form class="bi-form" data-form="checkin">
        <p>How sore does each area feel today? Leave anything that feels normal at 0.</p>
        <div class="bi-sore">${Object.entries(MUSCLES).map(([m, x]) => `<div><span>${esc(x.name)}</span><div class="seg" role="radiogroup" aria-label="${esc(x.name)}">${[0, 1, 2, 3].map((v) => `<label><input type="radio" name="s_${m}" value="${v}"${v === 0 ? " checked" : ""}><span>${v}</span></label>`).join("")}</div></div>`).join("")}</div>
        <label>Overall fatigue <select name="fatigue"><option value="">–</option>${[1, 2, 3, 4, 5].map((v) => `<option>${v}</option>`).join("")}</select></label>
        <p class="bi-fine">0 none · 1 mild · 2 moderate · 3 very sore. Sharp pain, swelling or pain that doesn't ease isn't normal soreness: please get it checked by a health professional.</p>
        <button class="btn btn-light lg" type="submit"><span>Save check-in · +${XP.checkin} XP</span></button>
      </form>`;
  }
  renderCheck();

  // ---------- fitness tests ----------
  function renderTests() {
    const res = fitness(data.tests, Date.now()).results;
    $('[data-pane="tests"]').innerHTML = `
      <form class="bi-form" data-form="test">
        <label>Test<select name="test">${Object.entries(TESTS).map(([id, t]) => `<option value="${id}">${esc(t.name)} (${esc(t.unit)})</option>`).join("")}</select></label>
        <div class="bi-two"><label>Result<input name="value" type="number" step="any" min="0" required></label><label>Date<input type="date" name="date" value="${today()}" max="${today()}" required></label></div>
        <button class="btn btn-light lg" type="submit"><span>Save result · +${XP.test} XP</span></button>
      </form>
      ${res.length ? `<h4>Your results</h4><ul class="bi-list">${res.map((r) => `<li><span>${esc(r.name)}<small>${esc(r.area)} · ${r.count} result${r.count > 1 ? "s" : ""}</small></span><b>${fmt(r.last)} ${esc(r.unit)}${r.count > 1 ? `<small class="${r.change >= 0 ? "up" : "down"}">${pct(r.change)}</small>` : ""}</b></li>`).join("")}</ul>
        <h4>All entries</h4><ul class="bi-list sm">${data.tests.map((t) => `<li><span>${esc(TESTS[t.test]?.name || t.test)} · ${esc(t.date)}</span><b>${fmt(Number(t.value), 2)} <button type="button" class="bi-x" data-del-test="${t.id}" aria-label="Delete">×</button></b></li>`).join("")}</ul>` : `<p class="mute">No results yet. Do the same test every 4–8 weeks to see real change.</p>`}`;
  }
  renderTests();

  // ---------- exercise explorer ----------
  function renderEx(q = "") {
    const list = Object.entries(EXERCISES).filter(([, x]) => x.name.toLowerCase().includes(q.toLowerCase()));
    const p = ui.preview && EXERCISES[ui.preview];
    $('[data-pane="ex"]').innerHTML = `
      <input class="bi-search" type="search" placeholder="Search exercises" value="${esc(q)}" aria-label="Search exercises">
      ${p ? `<div class="bi-preview"><h4>${esc(p.name)}</h4><ul class="bi-list">${Object.entries(p.muscles).sort((a, b) => b[1] - a[1]).map(([m, w]) => `<li><span>${esc(MUSCLES[m].name)}</span><b>${w >= 1 ? "Primary" : w >= 0.5 ? "Secondary" : "Stabiliser"}</b></li>`).join("")}</ul><button type="button" class="btn btn-sm" data-act="endpreview"><span>Back to my heat map</span></button></div>` : `<p class="mute">Pick an exercise to light up the muscles it trains.</p>`}
      <div class="bi-chips">${list.map(([id, x]) => `<button type="button" class="chip${id === ui.preview ? " on" : ""}" data-preview="${id}">${esc(x.name)}</button>`).join("")}</div>`;
  }
  renderEx();

  // ---------- history ----------
  function renderHistory() {
    $(".bi-hist").innerHTML = data.workouts.length ? data.workouts.slice(0, 30).map((w) => {
      const byEx = {}; for (const s of w.sets) (byEx[s.exercise] ||= []).push(s);
      return `<article><header><b>${esc(w.name || "Workout")}</b><span>${esc(new Date(w.date).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", year: "numeric" }))}</span><button type="button" class="bi-x" data-del-workout="${w.id}" aria-label="Delete workout">×</button></header>
        <p>${Object.entries(byEx).map(([id, sets]) => `${esc(EXERCISES[id]?.name || id)} ${sets.length}×${esc(sets[0].reps)}${Number(sets[0].load_kg) ? ` @ ${fmt(Number(sets[0].load_kg))} kg` : ""}${sets[0].side ? ` (${sets[0].side === "l" ? "left" : "right"})` : ""}`).join(" · ")}</p></article>`;
    }).join("") : `<p class="mute">Your logged workouts will appear here.</p>`;
  }
  renderHistory();

  // ---------- events ----------
  function setDetail(on) { ui.detail = on; const box = $("[data-detail]"); if (box) box.checked = on; view?.detail(on); if (!on && ui.part) { ui.part = null; view?.select(ui.selected); } renderPanel(); }
  function openTab(t) { ui.tab = t; $$(".bi-tabs [data-tab]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === t))); $$(".bi-pane").forEach((p) => (p.hidden = p.dataset.pane !== t)); }
  async function afterChange(msg) { await reload(); repaint(); renderTests(); renderHistory(); toast(msg); }
  function toast(msg) { const t = $(".bi-toast"); t.textContent = msg; t.hidden = false; clearTimeout(toast.h); toast.h = setTimeout(() => (t.hidden = true), 3200); }

  root.addEventListener("click", async (e) => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.mode) { ui.mode = b.dataset.mode; $$(".bi-modes button").forEach((x) => x.setAttribute("aria-selected", String(x === b))); if (ui.mode === "fitness") { const box = $('[data-layer="organs"]'); if (!box.checked && data.tests.some((t) => TESTS[t.test]?.organs)) { box.checked = true; view?.layer("organs", true); } } if (ui.preview) { ui.preview = null; renderEx(); } repaint(); }
    else if (b.dataset.zoom) view?.zoom(Number(b.dataset.zoom));
    else if (b.dataset.view) view?.view(b.dataset.view);
    else if (b.dataset.tab) openTab(b.dataset.tab);
    else if (b.dataset.goto) openTab(b.dataset.goto);
    else if (b.dataset.select) {
      ui.selected = b.dataset.select; ui.part = b.dataset.part || null; ui.organ = null;
      if (ui.part && !ui.detail) setDetail(true);
      view?.select(ui.selected, { part: ui.part, zoom: true }); openTab("muscle"); renderPanel();
    }
    else if (b.dataset.show) { const ms = JSON.parse(b.dataset.show); ui.preview = null; view?.preview(Object.fromEntries(ms.map((m) => [m, 1]))); toast(`Showing: ${ms.map((m) => MUSCLES[m]?.name || m).join(", ")} · tap the body to go back`); }
    else if (b.dataset.act === "group") { ui.part = null; view?.select(ui.selected, { zoom: true }); renderPanel(); }
    else if (b.dataset.preview) { ui.preview = b.dataset.preview; view?.preview(EXERCISES[ui.preview].muscles, ui.detail ? PART_FACTORS[ui.preview] || null : null); openTab("ex"); renderEx($(".bi-search")?.value || ""); }
    else if (b.dataset.act === "endpreview") { ui.preview = null; view?.preview(null); view?.select(ui.selected); renderEx(); }
    else if (b.dataset.act === "clear") { ui.selected = null; ui.part = null; ui.organ = null; view?.select(null); renderPanel(); }
    else if (b.dataset.act === "addrow") { b.previousElementSibling.insertAdjacentHTML("beforeend", rowHtml()); }
    else if (b.dataset.act === "rmrow") { const rows = b.closest(".bi-rows"); if (rows.children.length > 1) b.closest(".bi-row").remove(); }
    else if (b.dataset.act === "export") { const blob = new Blob([JSON.stringify(await store.exportAll(), null, 2)], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `gradify-body-${today()}.json`; a.click(); URL.revokeObjectURL(a.href); }
    else if (b.dataset.delWorkout) { if (confirm("Delete this workout?")) { await store.deleteWorkout(b.dataset.delWorkout); await afterChange("Workout deleted"); } }
    else if (b.dataset.delTest) { if (confirm("Delete this result?")) { await store.deleteTest(b.dataset.delTest); await afterChange("Result deleted"); } }
  });
  root.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset.layer) view?.layer(t.dataset.layer, t.checked);
    else if (t.hasAttribute("data-detail")) setDetail(t.checked);
    else if (t.hasAttribute("data-spin")) view?.spin(t.checked);
    else if (t.dataset.f === "exercise") { const row = t.closest(".bi-row"), x = EXERCISES[t.value]; row.querySelector(".bi-side-sel").hidden = !x.unilateral; if (x.bodyweight) row.querySelector('[data-f="load_kg"]').value = 0; }
  });
  root.addEventListener("input", (e) => {
    if (e.target.classList.contains("bi-date")) { const off = Number(e.target.value); ui.at = off === 0 ? Date.now() : Date.parse(`${new Date(Date.now() + off * DAY).toISOString().slice(0, 10)}T23:59:59Z`); repaint(); }   // a past day: as of the end of that day
    else if (e.target.classList.contains("bi-search")) { const v = e.target.value; renderEx(v); const s = $(".bi-search"); s.focus(); s.setSelectionRange(v.length, v.length); }
  });
  root.addEventListener("submit", async (e) => {
    e.preventDefault(); const f = e.target, btn = f.querySelector('[type="submit"]'); btn.disabled = true;
    try {
      if (f.dataset.form === "workout") {
        const sets = [];
        for (const row of f.querySelectorAll(".bi-row")) {
          const v = (k) => row.querySelector(`[data-f="${k}"]`).value;
          const n = Math.min(20, Math.max(1, Number(v("sets")) || 1)), ex = v("exercise"), side = EXERCISES[ex].unilateral ? v("side") || null : null;
          for (let i = 0; i < n; i++) sets.push({ exercise: ex, reps: Number(v("reps")) || 0, load_kg: Number(v("load_kg")) || 0, ...(v("rpe") ? { rpe: Number(v("rpe")) } : {}), ...(side ? { side } : {}) });
        }
        await store.saveWorkout({ date: f.date.value, name: f.name.value.trim() || null, sets });
        renderLog(); await afterChange(`Workout saved · +${XP.workout} XP`); openTab("muscle");
      } else if (f.dataset.form === "checkin") {
        const soreness = {}; for (const m of Object.keys(MUSCLES)) { const v = Number(f[`s_${m}`].value); if (v) soreness[m] = v; }
        await store.saveCheckin({ soreness, fatigue: f.fatigue.value ? Number(f.fatigue.value) : null });
        renderCheck(); ui.mode = "recovery"; $$(".bi-modes button").forEach((x) => x.setAttribute("aria-selected", String(x.dataset.mode === "recovery"))); await afterChange(`Check-in saved · +${XP.checkin} XP`); openTab("muscle");
      } else if (f.dataset.form === "test") {
        await store.saveTest({ test: f.test.value, value: Number(f.value.value), date: f.date.value });
        await afterChange(`Result saved · +${XP.test} XP`);
      }
    } catch (err) { console.error(err); toast("Couldn't save. Check your connection and try again."); }
    finally { btn.disabled = false; }
  });

  repaint();
}
