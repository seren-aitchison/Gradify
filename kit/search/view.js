// Search as a place: the study app's Search screen (#/search), and the service every search box shares.
//
//   #/search?q=equilibrium%20type:flashcards     the query (and its filters) live in the address, so a search can be
//                                                bookmarked, shared, pinned, saved by name and reached with Back
//
// The screen: one box with autocomplete (past and saved searches, the word finished, matching titles), a scope
// (everywhere, a course, a collection), a chip per kind of resource with how many of each matched, filters (exam
// board, qualification, status, completion, difficulty, date, course, collection), results grouped as a learner reads
// them (Lessons, Flashcards, Questions, Notes, Mind maps, Curriculum, …), each with where it lives (breadcrumbs), a
// preview that opens beside the results, and Pin · Save · Schedule · Open. When nothing matches it says what would.
//
//   createSearchService({ store, app, site })   → { ready(), run(raw, chips, o), suggest(raw), refresh() }
//   renderSearch(view, { store, app, site, screens, actions, toast })
import { esc, ensureStyles, isMac } from "../ui/store.js";
import { uiIcon } from "../ui/icons.js";
import { openDrawer } from "../ui/overlay.js";
import { toast as defaultToast } from "../ui/feedback.js";
import { shortcuts } from "../ui/keys.js";
import { recent } from "../ui/places.js";
import { runResourceAction } from "../ui/resource-actions.js";
import { resourceFromPlace } from "../core/resource.js";
import { parseQuery, queryString, activeFilters, without, chipsOf, TYPES, STATUSES, DIFFICULTIES, BOARDS, QUALS } from "./query.js";
import { buildIndex, buildIndexAsync, combine, search, suggest, related, GROUPS } from "./engine.js";
import { docsFromIndex, docsFromApp, applyPlaces, applyProgress, loadSearchIndex, loadLessonIndex, curriculumDocs, learnerDocs, progress } from "./sources.js";
import { searchHistory, savedSearches, remember, forgetSearch, clearSearchHistory, saveSearch, unsaveSearch, restoreSaved, isSaved } from "./memory.js";

// ---------- the service ----------
// Gradify's own content is indexed once per page (in slices, so the page stays responsive); the learner's things are
// read again whenever they may have changed (at most every 20 seconds, or when asked).
let gradify = null, building = null, lessonsTried = 0;
export function createSearchService({ store = null, app = "/app.html", site = null, extra = () => [] } = {}) {
  let mine = null, mineAt = 0, places = null, appIx = null;
  const getStore = async () => (typeof store === "function" ? store() : store);
  // built once; if the lesson index or a specification couldn't be fetched (offline), built from what came and tried
  // again a minute later
  function base() {
    if (gradify && (gradify.full || Date.now() - lessonsTried < 60e3)) return Promise.resolve(gradify);
    return (building ||= (async () => {
      const idx = await loadSearchIndex();
      const pages = Object.fromEntries((idx.courses || []).map((c) => [c.s, c.u]));
      let curOk = true;
      const [lessons, states, cur] = await Promise.all([loadLessonIndex(), getStore().then(progress).catch(() => ({})), curriculumDocs({ app, pages }).catch(() => { curOk = false; return []; })]);
      lessonsTried = Date.now();
      const ix = await buildIndexAsync([...docsFromIndex(idx, { lessons, states, site }), ...cur]);
      ix.full = Boolean(lessons) && curOk && (idx.courses || []).length > 0;
      gradify = ix;
      if (places) applyPlaces(gradify.list.map((x) => x.d), places);
      return gradify;
    })().finally(() => { building = null; }));
  }
  // the learner's things, places, tags and lesson progress: read again at most every 20 seconds (or when asked), and
  // put onto Gradify's documents too, so "done:yes" and "status:saved" are as they are now
  async function own(force = false) {
    if (!force && mine && Date.now() - mineAt < 20e3) return mine;
    const st = await getStore();
    const [r, states] = await Promise.all([learnerDocs({ store: st, app }).catch(() => ({ docs: [], places: null })), progress(st).catch(() => null)]);
    places = r.places; mine = buildIndex(r.docs); mineAt = Date.now();
    if (gradify) { const docs = gradify.list.map((x) => x.d); if (places) applyPlaces(docs, places); if (states) applyProgress(docs, states); }
    return mine;
  }
  const appDocs = () => (appIx ||= buildIndex(docsFromApp(extra() || {})));
  // Gradify's first, so where both have a thing (a lesson saved to a collection) the richer result is kept
  async function ready(force = false) { const g = await base(); const m = await own(force); return combine(g, m, appDocs()); }
  return {
    ready,
    refresh: () => { mineAt = 0; },
    async run(raw, chips = {}, o = {}) {
      const ix = await ready(o.force);
      const q = parseQuery(raw, chips);
      const rec = new Set(recent().map((p) => p.href));
      return { q, ix, ...search(ix, q, { context: { now: Date.now(), recent: rec, ...(o.context || {}) }, expand: o.expand, any: Boolean(o.any) }) };
    },
    /** only the learner's own things (quick search, which has Gradify's courses from its own index) */
    async runMine(raw) { const m = await own(); return search(m, parseQuery(raw), { context: { now: Date.now() } }).hits; },
    async suggest(raw, o = {}) { const ix = await ready(); return suggest(ix, raw, { history: searchHistory(), saved: savedSearches(), context: o.context || {} }); },
  };
}

// ---------- the screen ----------
const ICON = { lesson: "play", pack: "cards", question: "target", note: "notes", map: "grid", curriculum: "target", topic: "flag", course: "book", collection: "inbox", task: "clock", action: "bolt", screen: "grid" };
const DATES = [["", "Any time"], ["today", "Today"], ["7d", "Past week"], ["30d", "Past month"], ["365d", "Past year"]];
const hashQuery = () => { const i = location.hash.indexOf("?"); return new URLSearchParams(i >= 0 ? location.hash.slice(i + 1) : ""); };
const absHref = (href, app) => (!href ? null : href.startsWith("#") ? `${app}${href}` : href);

export async function renderSearch(view, ctx = {}) {
  ensureStyles();
  const app = ctx.app || location.pathname, toast = ctx.toast || defaultToast;
  const svc = ctx.service || createSearchService({ store: ctx.store, app, site: ctx.site, extra: () => ({ screens: ctx.screens || [], actions: ctx.actions || [] }) });
  const params = hashQuery();
  let raw = params.get("q") || "", expand = params.get("show") || null, ac = -1, sugg = [], seq = 0, last = null;
  // the course or collection to search within, when the page that sent the learner here had one
  const scopeFrom = { course: params.get("course") || null, folder: params.get("folder") || null };
  const chips = { type: [], board: [], qual: [], status: [], difficulty: [], tag: [], done: null, scope: {}, from: null, to: null };
  if (scopeFrom.course) chips.scope.course = scopeFrom.course;
  if (scopeFrom.folder) chips.scope.folder = scopeFrom.folder;
  const [collections, tags] = await Promise.all([import("../data/links.js").then((m) => m.collections().filter((c) => !c.smart)).catch(() => []), import("../data/organise.js").then((m) => m.allTags()).catch(() => [])]);
  const idx = await loadSearchIndex();
  const courses = (idx.courses || []).map((c) => [c.s, c.n]).sort((a, b) => a[1].localeCompare(b[1]));

  view.innerHTML = `<section class="sx" aria-labelledby="sx-h">
    <header class="sx-head"><h1 id="sx-h">Search</h1><p class="sub">Every lesson, question, flashcard, note, mind map, collection and specification in Gradify, and everything of yours.</p></header>
    <form class="sx-bar" role="search" autocomplete="off">
      <label class="sx-in">${uiIcon("search")}<span class="sr-only">Search Gradify</span>
        <input type="search" name="q" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="sx-ac" spellcheck="false" enterkeyhint="search" placeholder="Try “equilibrium”, “osmosis type:questions” or “\\"le chatelier\\"”" value="${esc(raw)}">
      </label>
      <label class="sx-scope"><span class="sr-only">Search in</span><select name="scope">
        <option value="">Everywhere</option>
        <optgroup label="A course">${courses.map(([s, n]) => `<option value="course:${esc(s)}">${esc(n)}</option>`).join("")}</optgroup>
        ${collections.length ? `<optgroup label="A collection">${collections.map((c) => `<option value="folder:${esc(c.id)}">${esc(c.name)}</option>`).join("")}</optgroup>` : ""}
      </select></label>
      <button type="button" class="btn btn-ghost btn-sm sx-save" aria-pressed="false" title="Save this search">${uiIcon("bookmark")}<span>Save</span></button>
      <ul class="sx-ac" id="sx-ac" role="listbox" aria-label="Suggestions" hidden></ul>
    </form>
    <div class="sx-chips" role="group" aria-label="Show"></div>
    <details class="sx-filters"><summary>${uiIcon("menu")} Filters <span class="sx-fn"></span></summary>
      <div class="sx-fgrid">
        ${sel("board", "Exam board", [["", "Any exam board"], ...BOARDS])}
        ${sel("qual", "Qualification", [["", "Any qualification"], ...QUALS])}
        ${sel("done", "Completion", [["", "Finished or not"], ["yes", "Completed"], ["no", "Not finished"]])}
        ${sel("difficulty", "Difficulty", [["", "Any level"], ...DIFFICULTIES])}
        ${sel("date", "Created or changed", DATES)}
        ${tags.length ? sel("tag", "Tag", [["", "Any tag"], ...tags.map((t) => [t.tag, `#${t.tag} (${t.n})`])]) : ""}
        <fieldset class="sx-status"><legend>Status</legend>${STATUSES.map(([k, l]) => `<label><input type="checkbox" name="status" value="${k}"> ${esc(l)}</label>`).join("")}</fieldset>
      </div>
      <p class="sx-tip">You can type these too: <code>type:flashcards</code> <code>board:aqa</code> <code>qual:a-level</code> <code>status:saved</code> <code>done:no</code> <code>difficulty:hard</code> <code>tag:priority</code> <code>after:7d</code> <code>"exact phrase"</code> <code>-leave-out</code></p>
    </details>
    <div class="sx-pills" aria-live="polite"></div>
    <div class="sx-body">
      <div class="sx-results" aria-live="polite" aria-busy="true"><div class="loading" aria-busy="true"></div></div>
      <aside class="sx-side" aria-label="Your searches"></aside>
    </div>
  </section>`;
  const $ = (s) => view.querySelector(s);
  const form = $(".sx-bar"), input = form.querySelector("input"), scopeSel = form.querySelector("[name=scope]"), acEl = $("#sx-ac"), res = $(".sx-results");
  if (chips.scope.course) scopeSel.value = `course:${chips.scope.course}`; else if (chips.scope.folder) scopeSel.value = `folder:${chips.scope.folder}`;

  // ----- running a search -----
  // a whole query into the controls: its words in the box, its filters in the chips and menus, its scope in the scope
  // menu (an empty scope clears it). Recovery, filter pills, type chips and saved searches all go through here.
  const NO = () => ({ type: [], board: [], qual: [], status: [], difficulty: [], tag: [], done: null, from: null, to: null });
  function setQuery(q2) {
    const sc = q2.filters.scope || {};
    Object.assign(chips, NO(), chipsOf(q2), { scope: { ...(sc.course ? { course: sc.course } : {}), ...(sc.folder ? { folder: sc.folder } : {}) } });
    raw = input.value = [q2.text, sc.lesson ? `in:lesson:${sc.lesson}` : ""].filter(Boolean).join(" ");
    scopeSel.value = chips.scope.course ? `course:${chips.scope.course}` : chips.scope.folder ? `folder:${chips.scope.folder}` : "";
    syncFilterInputs();
  }
  const writeUrl = () => {
    // the scope as it applies (typed or chosen), so reloading or sharing the address searches the same place
    const q = parseQuery(raw, chips), sc = q.filters.scope, s = queryString({ ...q, filters: { ...q.filters, scope: sc.lesson ? { lesson: sc.lesson } : {} } });
    const p = new URLSearchParams(); if (s) p.set("q", s);
    if (sc.course) p.set("course", sc.course); if (sc.folder) p.set("folder", sc.folder);
    if (expand) p.set("show", expand);
    const h = `#/search${p.toString() ? `?${p}` : ""}`;
    if (location.hash !== h) history.replaceState(history.state, "", h);
  };
  async function go({ force = false, keep = false } = {}) {
    const my = ++seq;
    writeUrl();
    if (!keep) res.setAttribute("aria-busy", "true");
    const r = await svc.run(raw, chips, { force, expand, context: { course: chips.scope.course || ctx.course || null } });
    if (my !== seq) return;
    last = r;
    res.removeAttribute("aria-busy");
    paintChips(r); paintPills(r.q); paintResults(r); paintSide();
    $(".sx-save").setAttribute("aria-pressed", String(Boolean(isSaved(queryString(r.q)))));
  }
  let typing = 0;
  input.addEventListener("input", () => { raw = input.value; expand = null; clearTimeout(typing); typing = setTimeout(() => { go({ keep: true }); }, 140); openSuggest(); });
  form.addEventListener("submit", (e) => { e.preventDefault(); if (ac >= 0 && sugg[ac]) return pick(sugg[ac]); closeSuggest(); raw = input.value; go().then(() => { if (raw.trim().length > 1) remember(raw, { count: last?.total ?? null }); paintSide(); }); });
  scopeSel.addEventListener("change", () => {
    const [k, v] = scopeSel.value.split(":"); chips.scope = {}; if (k && v) chips.scope[k] = v; go();
  });

  // ----- autocomplete -----
  async function openSuggest() {
    const my = seq;
    sugg = await svc.suggest(input.value, { context: { course: chips.scope.course || null } });
    if (my !== seq && document.activeElement !== input) return;
    ac = -1;
    if (!sugg.length || document.activeElement !== input) { closeSuggest(); return; }
    const kindIcon = { saved: "bookmarked", history: "clock", word: "search", hit: null };
    acEl.innerHTML = sugg.map((s, i) => `<li role="option" id="sx-ac${i}" data-i="${i}" aria-selected="false">${uiIcon(kindIcon[s.kind] || ICON[s.hit?.type] || "search")}<span>${s.kind === "hit" ? s.hit.html : esc(s.text)}${s.label ? ` <small>${esc(s.label)}</small>` : s.kind === "history" ? " <small>Recent search</small>" : s.kind === "hit" ? ` <small>${esc(TYPES[s.hit.type]?.[0]?.replace(/s$/, "") || "")}${s.hit.sub ? ` · ${esc(s.hit.sub)}` : ""}</small>` : ""}</span>${s.kind === "history" ? `<button type="button" class="sx-acx" data-forget="${i}" aria-label="Remove ${esc(s.text)} from recent searches" title="Remove">${uiIcon("close")}</button>` : ""}</li>`).join("");
    acEl.hidden = false; input.setAttribute("aria-expanded", "true");
  }
  function closeSuggest() { acEl.hidden = true; input.setAttribute("aria-expanded", "false"); input.removeAttribute("aria-activedescendant"); ac = -1; }
  function moveSuggest(d) {
    if (acEl.hidden || !sugg.length) return false;
    // -1 is the box itself, as typed
    ac += d; if (ac >= sugg.length) ac = -1; else if (ac < -1) ac = sugg.length - 1;
    acEl.querySelectorAll("[role=option]").forEach((li) => li.setAttribute("aria-selected", String(Number(li.dataset.i) === ac)));
    if (ac >= 0) input.setAttribute("aria-activedescendant", `sx-ac${ac}`); else input.removeAttribute("aria-activedescendant");
    return true;
  }
  function pick(s) {
    closeSuggest();
    if (s.kind === "hit" && (s.hit.href || s.hit.run)) { remember(input.value || s.text); open(s.hit); return; }
    input.value = raw = s.text; go().then(() => remember(raw, { count: last?.total ?? null }));
  }
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { if (acEl.hidden) openSuggest(); else if (moveSuggest(1)) e.preventDefault(); }
    else if (e.key === "ArrowUp") { if (moveSuggest(-1)) e.preventDefault(); }
    else if (e.key === "Escape") { if (!acEl.hidden) { e.preventDefault(); e.stopPropagation(); closeSuggest(); } else if (input.value) { e.preventDefault(); input.value = raw = ""; go(); } }
  });
  // past and saved searches when the box is empty; otherwise suggestions wait for typing (or ↓)
  input.addEventListener("focus", () => { if (!input.value.trim()) openSuggest(); });
  input.addEventListener("blur", () => setTimeout(() => { if (!acEl.contains(document.activeElement)) closeSuggest(); }, 150));
  acEl.addEventListener("mousedown", (e) => e.preventDefault());
  acEl.addEventListener("click", (e) => {
    const f = e.target.closest("[data-forget]"); if (f) { forgetSearch(sugg[Number(f.dataset.forget)].text); openSuggest(); paintSide(); return; }
    const li = e.target.closest("[role=option]"); if (li) pick(sugg[Number(li.dataset.i)]);
  });

  // ----- chips and filters -----
  function paintChips(r) {
    const all = Object.values(r.counts).reduce((a, b) => a + b, 0);
    const on = r.q.filters.type;   // typed (type:lesson) or chosen: the same filter
    const order = GROUPS.map(([t]) => t).filter((t) => r.counts[t] || on.includes(t));
    $(".sx-chips").innerHTML = `<button type="button" data-type="" aria-pressed="${!on.length}">All <small>${all}</small></button>${order.map((t) => `<button type="button" data-type="${t}" aria-pressed="${on.includes(t)}">${uiIcon(ICON[t])}${esc(TYPES[t][0])} <small>${r.counts[t] || 0}</small></button>`).join("")}`;
  }
  $(".sx-chips").addEventListener("click", (e) => {
    const b = e.target.closest("[data-type]"); if (!b) return;
    const t = b.dataset.type; expand = null;
    const q = parseQuery(raw, chips), cur = q.filters.type;
    const next = !t ? [] : e.shiftKey || e.metaKey || e.ctrlKey ? (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]) : cur.length === 1 && cur[0] === t ? [] : [t];
    setQuery({ ...q, filters: { ...q.filters, type: next } });
    go();
  });
  view.querySelector(".sx-fgrid").addEventListener("change", (e) => {
    const n = e.target.name;
    if (n === "status") chips.status = [...view.querySelectorAll("[name=status]:checked")].map((x) => x.value);
    else if (n === "done") chips.done = e.target.value === "" ? null : e.target.value === "yes";
    else if (n === "date") { const v = e.target.value; chips.from = v ? parseQuery(`after:${v}`).from : null; }
    else if (["board", "qual", "difficulty", "tag"].includes(n)) chips[n] = e.target.value ? [e.target.value] : [];
    go();
  });
  function paintPills(q) {
    const list = activeFilters(q).filter((f) => !(f.key === "scope.course" && chips.scope.course) && !(f.key === "scope.folder" && chips.scope.folder));
    const n = list.length;
    $(".sx-fn").textContent = n ? `(${n})` : "";
    $(".sx-pills").innerHTML = n ? `${list.map((f, i) => `<button type="button" class="sx-pill" data-pill="${i}" aria-label="Remove the filter ${esc(f.label)}">${esc(f.label)} ${uiIcon("close")}</button>`).join("")}<button type="button" class="gx-link sx-clear" data-clear>Clear filters</button>` : "";
    $(".sx-pills").__list = list;
  }
  $(".sx-pills").addEventListener("click", (e) => {
    if (e.target.closest("[data-clear]")) { const q = parseQuery(raw, chips); setQuery({ ...q, filters: { ...NO(), scope: q.filters.scope }, from: null, to: null }); go(); return; }
    const p = e.target.closest("[data-pill]"); if (!p) return;
    const f = $(".sx-pills").__list[Number(p.dataset.pill)];
    // a filter may be typed or chosen: take it out of both
    setQuery(without(parseQuery(raw, chips), f)); go();
  });
  function syncFilterInputs() {
    const v = (n, x) => { const el = view.querySelector(`[name=${n}]`); if (el) el.value = x; };
    v("board", chips.board[0] || ""); v("qual", chips.qual[0] || ""); v("tag", chips.tag[0] || ""); v("difficulty", chips.difficulty[0] || ""); v("done", chips.done == null ? "" : chips.done ? "yes" : "no"); if (chips.from == null) v("date", "");
    view.querySelectorAll("[name=status]").forEach((x) => { x.checked = chips.status.includes(x.value); });
  }

  // ----- results -----
  const crumbHtml = (h) => (h.crumbs?.length ? `<ol class="sx-crumbs" aria-label="Where it is">${h.crumbs.map((c) => `<li>${c.href ? `<a href="${esc(absHref(c.href, app))}">${esc(c.label)}</a>` : esc(c.label)}</li>`).join("")}</ol>` : "");
  const badges = (h) => {
    const b = [];
    if (h.countLabel) b.push(`<span class="sx-b">${esc(h.countLabel)}</span>`);
    for (const s of h.status || []) { const l = STATUSES.find(([k]) => k === s)?.[1]; if (l) b.push(`<span class="sx-b s-${s}">${esc(l)}</span>`); }
    if (h.difficulty) b.push(`<span class="sx-b">${esc(DIFFICULTIES.find(([k]) => k === String(h.difficulty))?.[1] || "")}</span>`);
    for (const t of (h.tags || []).slice(0, 4)) b.push(`<span class="sx-b sx-tag">#${esc(t)}</span>`);
    if (h.mine) b.push(`<span class="sx-b sx-own" title="You made this. Only you can see it unless you share it.">Yours</span>`);
    if (h.why) b.push(`<span class="sx-b sx-why">${esc(h.why)}</span>`);
    return b.join("");
  };
  const canAct = (h) => Boolean(h.href) && !["action", "screen"].includes(h.type);
  const row = (h, gi, i) => `<li class="sx-r" data-g="${gi}" data-i="${i}">
      <span class="sx-ri" aria-hidden="true">${uiIcon(h.icon && ICON[h.type] !== h.icon && ["play", "cards", "target", "notes", "grid", "flag", "book", "inbox", "clock", "bolt", "trophy"].includes(h.icon) ? h.icon : ICON[h.type] || "search")}</span>
      <div class="sx-rt">
        <a class="sx-ra" href="${esc(absHref(h.href, app) || "#")}" ${h.run ? "data-run" : ""}>${h.html}</a>
        ${crumbHtml(h)}
        ${h.snippet ? `<p class="sx-snip">${h.snippet}</p>` : h.sub && !h.crumbs?.length ? `<p class="sx-snip">${esc(h.sub)}</p>` : ""}
        <p class="sx-badges">${badges(h)}</p>
      </div>
      <div class="sx-acts">
        ${h.preview || h.body || h.terms?.length ? `<button type="button" class="sx-ib" data-act="preview" aria-label="Preview ${esc(h.title)}" title="Preview">${uiIcon("expand")}</button>` : ""}
        ${canAct(h) ? `<button type="button" class="sx-ib" data-act="pin" aria-label="Pin ${esc(h.title)}" title="Pin" aria-pressed="${(h.status || []).includes("pinned")}">${uiIcon((h.status || []).includes("pinned") ? "pinned" : "pin")}</button>
        <button type="button" class="sx-ib" data-act="save" aria-label="Save ${esc(h.title)} to a collection" title="Save to a collection">${uiIcon((h.status || []).includes("saved") ? "bookmarked" : "bookmark")}</button>
        <button type="button" class="sx-ib" data-act="schedule" aria-label="Schedule ${esc(h.title)}" title="Schedule">${uiIcon("clock")}</button>` : ""}
      </div>
    </li>`;
  function paintResults(r) {
    if (!raw.trim() && !activeFilters(r.q).length) { res.innerHTML = startHtml(); return; }
    if (!r.total) { res.innerHTML = recoveryHtml(r); return; }
    const best = r.best && !(chips.type.length) ? `<section class="sx-best" aria-label="Best match"><p class="gx-kicker">Best match</p><ul>${row(r.best, -1, 0)}</ul></section>` : "";
    const groups = r.groups.map((g, gi) => `<section class="sx-g" aria-labelledby="sx-g${gi}"><h2 id="sx-g${gi}">${uiIcon(ICON[g.type] || "search")}${esc(g.title)} <small>${g.total}</small></h2>
      <ul>${g.items.map((h, i) => row(h, gi, i)).join("")}</ul>
      ${g.total > g.items.length ? `<button type="button" class="gx-link sx-more" data-expand="${g.type}">Show all ${g.total} ${esc(g.title.toLowerCase())}</button>` : ""}</section>`).join("");
    const rel = related(r.hits, r.q);
    res.innerHTML = `<p class="sx-count">${r.total >= 400 ? "400+" : r.total} result${r.total === 1 ? "" : "s"}${r.q.empty ? "" : ` for <b>${esc(r.q.text || raw)}</b>`}${chips.scope.course ? ` in ${esc(courses.find(([s]) => s === chips.scope.course)?.[1] || chips.scope.course)}` : chips.scope.folder ? ` in ${esc(collections.find((c) => c.id === chips.scope.folder)?.name || "this collection")}` : ""}</p>
      ${best}${groups}
      ${rel.length ? `<section class="sx-rel" aria-label="Related searches"><h2>Related searches</h2><p>${rel.map((t) => `<button type="button" class="sx-chipq" data-q="${esc(t)}">${esc(t)}</button>`).join("")}</p></section>` : ""}`;
    res.__r = r;
  }
  function startHtml() {
    const tips = [["equilibrium", "A concept, everywhere it's taught, practised and noted"], ['"le chatelier"', "An exact phrase"], ["osmosis type:questions", "Only one kind of thing"], ["board:aqa qual:gcse", "What's on a specification"], ["status:saved done:no", "What you saved and haven't finished"], ["after:7d", "What you made or changed this week"]];
    return `<section class="sx-start"><h2>Search everything</h2><p>Search works across lessons, practice questions, flashcards, your notes and mind maps, collections, your plan, the curriculum, and the app's own screens and actions. Try:</p>
      <ul class="sx-tips">${tips.map(([q, l]) => `<li><button type="button" class="sx-chipq" data-q="${esc(q)}"><code>${esc(q)}</code></button> <span>${esc(l)}</span></li>`).join("")}</ul>
      <p class="sub">Press <kbd>/</kbd> or <kbd>${isMac() ? "⌘" : "Ctrl"}</kbd><kbd>K</kbd> anywhere for quick search, and choose “See all results” to come here.</p></section>`;
  }
  function recoveryHtml(r) {
    const x = r.recover || {}, parts = [];
    if (x.didYouMean) parts.push(`<li>Did you mean <button type="button" class="gx-link" data-q="${esc(x.didYouMean.text)}">${esc(x.didYouMean.text)}</button>? <small>${x.didYouMean.count} result${x.didYouMean.count === 1 ? "" : "s"}</small></li>`);
    for (const l of x.loosen || []) parts.push(`<li><button type="button" class="gx-link" data-loosen="${esc(l.key)}">Search ${esc(l.label)}</button> <small>${l.count} result${l.count === 1 ? "" : "s"}</small></li>`);
    if (x.anyWords) parts.push(`<li><button type="button" class="gx-link" data-any>Match any of the words, not all of them</button> <small>${x.anyWords.count} result${x.anyWords.count === 1 ? "" : "s"}</small></li>`);
    for (const b of x.browse || []) parts.push(`<li><button type="button" class="gx-link" data-q="${esc(b.text)}">Search for “${esc(b.text)}”</button> <small>${b.count} result${b.count === 1 ? "" : "s"}</small></li>`);
    return `<section class="sx-none" role="status"><h2>Nothing matches “${esc(r.q.text || raw)}”</h2>
      ${parts.length ? `<p>Try instead:</p><ul class="sx-rec">${parts.join("")}</ul>` : `<p>Check the spelling, use fewer or more general words, or take a filter off.</p>`}
      <p class="sx-elsewhere"><a class="btn btn-ghost btn-sm" href="/explore.html">${uiIcon("book")}<span>Browse every course</span></a>
        <a class="btn btn-ghost btn-sm" href="${esc(app)}#/ai">${uiIcon("ai")}<span>Ask Gradify AI about it</span></a>
        <a class="btn btn-ghost btn-sm" href="${esc(app)}#/new">${uiIcon("plus")}<span>Make flashcards from your notes</span></a></p></section>`;
  }
  const hitAt = (li) => { const r = res.__r || last; const gi = Number(li.dataset.g), i = Number(li.dataset.i); return gi < 0 ? r.best : r.groups[gi]?.items[i]; };
  function open(h) {
    if (raw.trim().length > 1) remember(raw, { count: last?.total ?? null });
    if (h.run) { h.run(); return; }
    const href = absHref(h.href, app); if (!href) return;
    if (href.startsWith(`${location.pathname}#`) || href.startsWith("#")) location.hash = href.slice(href.indexOf("#") + 1); else location.href = href;
  }
  const resourceOf = (h) => resourceFromPlace({ href: absHref(h.href, app), title: h.title, sub: h.sub });
  res.addEventListener("click", (e) => {
    const qb = e.target.closest("[data-q]"); if (qb) { input.value = raw = qb.dataset.q; expand = null; go().then(() => remember(raw)); input.focus(); return; }
    const ex = e.target.closest("[data-expand]"); if (ex) { expand = ex.dataset.expand; go({ keep: true }); return; }
    const lo = e.target.closest("[data-loosen]");
    if (lo) {
      // only the criterion this option names comes off; every other filter stays, as in the count it showed
      const k = lo.dataset.loosen, q = parseQuery(raw, chips), f = { ...q.filters, scope: { ...q.filters.scope } };
      let from = q.from, to = q.to;
      if (k.startsWith("scope.")) delete f.scope[k.slice(6)]; else if (k === "date") { from = to = null; } else if (k === "done") f.done = null; else f[k] = [];
      setQuery({ ...q, filters: f, from, to }); go(); return;
    }
    if (e.target.closest("[data-any]")) { anyOnce(parseQuery(raw, chips)); return; }
    const li = e.target.closest(".sx-r"); if (!li) return;
    const h = hitAt(li); if (!h) return;
    const act = e.target.closest("[data-act]")?.dataset.act;
    if (act === "preview") { preview(h); return; }
    if (act) { const r0 = resourceOf(h); runResourceAction(act, r0, { store: async () => (typeof ctx.store === "function" ? ctx.store() : ctx.store), app }).then(() => { svc.refresh(); if (act === "pin") setTimeout(() => go({ force: true, keep: true }), 50); }); return; }
    const a = e.target.closest(".sx-ra");
    if (a && !(e.metaKey || e.ctrlKey || e.shiftKey)) { e.preventDefault(); open(h); }
  });
  // "any of the words": the results of each word alone, merged
  async function anyOnce(q) {
    // the whole query (its phrases, left-out words and filters) with only its words matched as any, not all
    const r = await svc.run(raw, chips, { any: true, context: { course: q.filters.scope.course || ctx.course || null } });
    last = r; paintChips(r); paintResults(r);
    const c = res.querySelector(".sx-count"); if (c) c.innerHTML = `${r.total} result${r.total === 1 ? "" : "s"} with any of <b>${esc(q.terms.join(", "))}</b>`;
  }
  function preview(h) {
    const href = absHref(h.href, app);
    const body = `<div class="sx-prev">${crumbHtml(h)}
      <p class="sx-badges">${badges(h)}</p>
      ${h.sub ? `<p class="sub">${esc(h.sub)}</p>` : ""}
      ${h.meta ? `<p>${esc(h.meta)}</p>` : ""}
      ${h.preview ? `<div class="sx-ptext">${esc(h.preview).replace(/\n/g, "<br>")}</div>` : h.body ? `<div class="sx-ptext">${esc(String(h.body).slice(0, 600))}${String(h.body).length > 600 ? "…" : ""}</div>` : ""}
      ${h.terms?.length ? `<h3>Key terms</h3><p>${h.terms.slice(0, 12).map((t) => `<button type="button" class="sx-chipq" data-pq="${esc(t)}">${esc(t)}</button>`).join("")}</p>` : ""}
      <p class="sx-pacts">${href ? `<a class="btn btn-primary btn-sm" href="${esc(href)}" data-open>${uiIcon("right")}<span>Open</span></a>` : ""}
        ${canAct(h) ? `<button type="button" class="btn btn-ghost btn-sm" data-pact="pin">${uiIcon("pin")}<span>Pin</span></button><button type="button" class="btn btn-ghost btn-sm" data-pact="save">${uiIcon("bookmark")}<span>Save</span></button><button type="button" class="btn btn-ghost btn-sm" data-pact="schedule">${uiIcon("clock")}<span>Schedule</span></button>` : ""}</p></div>`;
    const d = openDrawer({ title: h.title, body });
    d.box.addEventListener("click", (e) => {
      const pq = e.target.closest("[data-pq]"); if (pq) { d.close(); input.value = raw = pq.dataset.pq; go().then(() => remember(raw)); return; }
      const pa = e.target.closest("[data-pact]"); if (pa) { runResourceAction(pa.dataset.pact, resourceOf(h), { store: async () => (typeof ctx.store === "function" ? ctx.store() : ctx.store), app }).then(() => svc.refresh()); return; }
      if (e.target.closest("[data-open]") && !(e.metaKey || e.ctrlKey)) { e.preventDefault(); d.close(); open(h); }
    });
  }

  // ----- saved and recent searches -----
  function paintSide() {
    const saved = savedSearches(), hist = searchHistory().slice(0, 8);
    $(".sx-side").innerHTML = `<section><h2>${uiIcon("bookmarked")} Saved searches</h2>${saved.length ? `<ul>${saved.map((s) => `<li><button type="button" class="gx-link" data-run-q="${esc(s.q)}">${esc(s.name)}</button>${s.name !== s.q ? `<small>${esc(s.q)}</small>` : ""}<button type="button" class="sx-ib" data-unsave="${esc(s.id)}" aria-label="Remove the saved search ${esc(s.name)}" title="Remove">${uiIcon("close")}</button></li>`).join("")}</ul>` : `<p class="sub">Save a search you make often (“AQA chemistry I haven't finished”) and it waits here.</p>`}</section>
      <section><h2>${uiIcon("clock")} Recent searches</h2>${hist.length ? `<ul>${hist.map((s) => `<li><button type="button" class="gx-link" data-run-q="${esc(s.q)}">${esc(s.q)}</button>${s.n != null ? `<small>${s.n} result${s.n === 1 ? "" : "s"}</small>` : ""}</li>`).join("")}</ul><button type="button" class="gx-link sx-clearh" data-clear-history>Clear recent searches</button>` : `<p class="sub">Searches you make are kept on this device to use again.</p>`}</section>`;
  }
  $(".sx-side").addEventListener("click", (e) => {
    const q = e.target.closest("[data-run-q]");
    if (q) { setQuery(parseQuery(q.dataset.runQ)); expand = null; go().then(() => remember(q.dataset.runQ, { count: last?.total ?? null })); return; }
    const u = e.target.closest("[data-unsave]");
    if (u) { const gone = unsaveSearch(u.dataset.unsave); paintSide(); toast({ html: `Removed the saved search <b>${esc(gone?.name || "")}</b>` }, { undo: () => { restoreSaved(gone); paintSide(); } }); return; }
    if (e.target.closest("[data-clear-history]")) { const was = searchHistory(); clearSearchHistory(); paintSide(); toast("Recent searches cleared.", { undo: () => { for (const x of [...was].reverse()) remember(x.q, { count: x.n }); paintSide(); } }); }
  });
  $(".sx-save").addEventListener("click", () => {
    const q = parseQuery(raw, chips), s = queryString(q);
    if (!s) { toast("Type a search to save it."); input.focus(); return; }
    const was = isSaved(s);
    if (was) { unsaveSearch(was.id); toast({ html: `Removed the saved search <b>${esc(was.name)}</b>` }, { undo: () => { restoreSaved(was); paintSide(); } }); }
    else { const name = prompt("Name this search", q.text || s); if (name == null) return; saveSearch(name, s); toast({ html: `Saved <b>${esc(name || s)}</b>: it's under Saved searches, and in quick search.` }, { tone: "ok" }); }
    $(".sx-save").setAttribute("aria-pressed", String(!was)); paintSide();
  });

  // "/" on this screen goes to its own box rather than opening quick search
  const off = shortcuts([{ keys: "/", label: "Search", group: "Search", show: false, when: () => document.body.contains(input) && document.activeElement !== input, run: () => { input.focus(); input.select(); } }]);
  addEventListener("hashchange", function bye() { if (!location.hash.startsWith("#/search")) { off?.(); removeEventListener("hashchange", bye); } });

  paintSide();
  await go();
  // after the app has finished drawing the screen (it focuses the view last)
  setTimeout(() => { if (document.body.contains(input) && !raw) input.focus({ preventScroll: true }); }, 0);
}
function sel(name, label, options) {
  return `<label><span>${esc(label)}</span><select name="${name}">${options.map(([v, l]) => `<option value="${esc(v)}">${esc(l)}</option>`).join("")}</select></label>`;
}
