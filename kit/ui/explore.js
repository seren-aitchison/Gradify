// Explore: every Gradify course, browsable the way a learner thinks about it, so following curiosity is easy.
//
//   Explore › group (by stage of life, profession, subject…) › site › course › chapter › topic › lesson
//
// Overview (#/): the sites that have courses, grouped as on the Gradify homepage, each with its courses; recently
// explored; and a search over every course, chapter, topic and lesson. Course (#/course/<slug>[/<unitId>]): stages to
// filter by, chapters as accordions (remembered; the one you came for opens), and inside each, topic preview cards
// with their lessons, estimated time, the learner's own progress (from their answers: kit/learning/topic-status.js),
// what the topic builds on and what it leads to (where the course has a concept graph), and one-click Start / Revise.
// Nothing is locked: any lesson opens from here.
//
//   import { mountExplore } from "/kit/ui/explore.js"; mountExplore(document.getElementById("explore"));
//
// Data: kit/data/search-index.json (scripts/build-search-index.mjs) and this device's course progress.
import { esc, ensureStyles, readJson } from "./store.js";
import { uiIcon } from "./icons.js";
import { loadIndex, searchIndex, myCourses } from "./global-nav.js";
import { visit, recent } from "./places.js";
import { wireAccordion } from "./disclosure.js";
import { emptyState, skeleton } from "./states.js";
import { lessonSignals, topicStatus, STATUS } from "../learning/topic-status.js";
import { encodeTest } from "../assess/target-test.js";
import { GROUPS } from "../core/sites.js";
import { pathOf } from "../core/site.js";
import { icon } from "../core/icons.js";
import { tile, ink } from "../core/colour.js";
import { minutesPerLesson } from "../course/lesson-time.js";
import { masteryMap } from "../learning/mastery-map.js";
import { renderMasteryMap } from "./mastery-map-view.js";
import { segmentedHtml, wireSegmented } from "./disclosure.js";
import { pref, setPref } from "./prefs.js";
import { pathwaysFor, renderPathway, pathwayHits, hrefOf } from "./pathways.js";
import { actionCard } from "../core/action-card.js";
import { KINDS } from "../curriculum/graph.js";

const MIN_DEFAULT = 8;   // a lesson, roughly, until this learner's own pace is known
const pc = (x) => `${Math.round((x || 0) * 100)}%`;
const dot = (st) => `<i class="cx-st s-${st}" aria-hidden="true"></i>`;
const hours = (m) => (m < 60 ? `${Math.max(5, Math.round(m / 5) * 5)} min` : `${Math.round(m / 6) / 10} h`);

/** this device's progress in one course: done lessons, statuses from evidence, the learner's own pace. Pure given S. */
export function courseProgress(S = {}) {
  const sig = lessonSignals(S.attempts || []), done = S.done || {};
  const visited = (id) => Boolean(S.time?.[id] || (S.recent || []).some((r) => r.id === id));
  return { status: (id) => topicStatus({ done: Boolean(done[id]), visited: visited(id), sig: sig.get(id) }), done: (id) => Boolean(done[id]), right: (id) => (sig.get(id)?.right || 0) > 0, mins: minutesPerLesson(S) || MIN_DEFAULT };
}

/** a course's chapters → topics (modules) → lessons, with progress; pure (tests/ui.test.mjs) */
export function courseTree(c, prog) {
  const pre = c.pre || {}, leadsTo = {};
  for (const [to, froms] of Object.entries(pre)) for (const f of froms) (leadsTo[f] ||= []).push(to);
  return c.units.map(([id, n, title, lessons, mods = [], ti = -1, blurb = ""]) => {
    const groups = [];
    for (const [lid, lt, mi] of lessons) {
      const name = mi != null ? mods[mi] : null, last = groups.at(-1);
      if (last && last.name === name) last.lessons.push({ id: lid, title: lt }); else groups.push({ name, lessons: [{ id: lid, title: lt }] });
    }
    const topics = groups.map((g, i) => {
      const key = `${id}/${g.name}`, ls = g.lessons.map((l) => ({ ...l, st: prog.status(l.id), done: prog.done(l.id) }));
      return { key, i, name: g.name, lessons: ls, done: ls.filter((l) => l.done).length, mastered: ls.filter((l) => l.st === "mastered").length, revise: ls.filter((l) => l.st === "revise").length,
        mins: ls.length * prog.mins, pre: (pre[key] || []).filter((k) => k !== key), next: (leadsTo[key] || []).filter((k) => k !== key) };
    });
    const total = lessons.length, done = topics.reduce((a, t) => a + t.done, 0);
    return { id, n, title, blurb, stage: c.T?.[ti] || "", stageIndex: ti, topics, total, done, pct: total ? done / total : 0, mins: total * prog.mins, revise: topics.reduce((a, t) => a + t.revise, 0) };
  });
}

const courseState = (slug) => readJson(`gradify.course.${slug}`, null);

export function mountExplore(root) {
  ensureStyles();
  root.innerHTML = skeleton("cards", 6, "Loading every course");
  let idx = null, pw = null;
  const bySite = () => { const m = new Map(); for (const c of idx.courses) { if (!m.has(c.site)) m.set(c.site, []); m.get(c.site).push(c); } return m; };
  const groupOfSite = (site) => GROUPS.find((g) => g.items.some((s) => s.n === site));
  const siteOf = (name) => GROUPS.flatMap((g) => g.items).find((s) => s.n === name);
  const tileHtml = (s, size = 44) => s ? `<span class="gx-ex-tile" style="--tile:${tile(s.c)};--ink:${ink(s.c)};width:${size}px;height:${size}px">${icon(s.i)}</span>` : "";
  const crumbs = (parts) => `<nav class="gx-ex-crumbs" aria-label="Breadcrumb">${parts.map(([t, h], i) => (i === parts.length - 1 ? `<span aria-current="page">${esc(t)}</span>` : `<a href="${esc(h)}">${esc(t)}</a>`)).join("")}</nav>`;
  const progressOf = (c) => { const S = courseState(c.s); return S ? courseProgress(S) : courseProgress({}); };
  const coursePct = (c) => { const S = courseState(c.s); if (!S) return null; const total = c.units.reduce((a, u) => a + u[3].length, 0), d = Object.keys(S.done || {}).length; return total ? d / total : 0; };

  function searchBox(value = "") {
    return `<label class="gx-ex-search">${uiIcon("search")}<input type="search" value="${esc(value)}" placeholder="Search every course, chapter, topic and lesson" aria-label="Search Gradify"></label><div class="gx-ex-results" aria-live="polite"></div>`;
  }
  function wireSearch() {
    const input = root.querySelector(".gx-ex-search input"), out = root.querySelector(".gx-ex-results"), rest = root.querySelector(".gx-ex-browse");
    const run = () => {
      const q = input.value.trim();
      if (q.length < 2) { out.innerHTML = ""; if (rest) rest.hidden = false; return; }
      pw ||= pathwaysFor(idx);
      const hits = searchIndex(idx, q, { limit: 30 }), paths = pathwayHits(pw.g, q);
      if (rest) rest.hidden = true;
      const pathHtml = paths.length ? `<ul class="gx-ex-hits gx-pw-hits">${paths.map((n) => `<li><a href="${esc(hrefOf(n))}"><span class="gx-ex-kind">${esc(KINDS[n.kind].one)}</span><b>${esc(n.name)}</b>${n.sub ? `<small>${esc(n.sub)}</small>` : ""}</a></li>`).join("")}</ul>` : "";
      out.innerHTML = pathHtml + (hits.length || pathHtml ? `<ul class="gx-ex-hits">${hits.map((h) => `<li><a href="${esc(h.type === "course" ? `#/course/${idx.courses.find((c) => c.u === h.href)?.s}` : h.href)}"><span class="gx-ex-kind">${{ course: "Course", topic: "Topic", lesson: "Lesson" }[h.type] || ""}</span><b>${h.html}</b><small>${esc(h.k)}</small></a></li>`).join("")}</ul>`
        : emptyState({ icon: "search", title: `Nothing matches “${q}”`, body: "Try a key term, or fewer words. Every course, chapter, topic and lesson is searchable.", compact: true }));
    };
    input.addEventListener("input", run); run();
  }

  // ---------- the overview ----------
  function overview() {
    const sites = bySite(), mine = myCourses();
    const explored = recent().filter((r) => r.kind === "explore").slice(0, 6);
    const groups = GROUPS.map((g) => ({ g, items: g.items.filter((s) => sites.has(s.n)) })).filter((x) => x.items.length);
    const total = idx.courses.reduce((a, c) => a + c.units.reduce((b, u) => b + u[3].length, 0), 0);
    root.innerHTML = `${crumbs([["Gradify", "/"], ["Explore", "#/"]])}
      <header class="gx-ex-head"><h1>Explore</h1><p>${idx.courses.length} courses and ${total.toLocaleString()} lessons across the Gradify sites. Open anything: nothing is locked behind anything else.</p>${searchBox()}</header>
      <div class="gx-ex-browse">
      ${actionCard({ kicker: "Start anywhere", title: "Find your course by subject, exam board or country", why: "Biology to GCSE to your exam board, AQA to every subject it publishes, England to its qualifications: follow any of them to the lessons.", actions: [{ label: "Explore pathways", icon: "route", href: "#/pathways" }, { label: "By exam board", soft: true, href: "#/boards" }, { label: "By country", soft: true, href: "#/countries" }], cls: "gx-pw-act" })}
      ${mine.length || explored.length ? `<section class="gx-ex-sec"><h2>Pick up where you were</h2><div class="gx-ex-row">${mine.slice(0, 4).map((r) => `<a class="gx-ex-mini" href="${esc(r.href)}">${uiIcon("play")}<span><b>${esc(r.title)}</b><small>${esc(r.course)} · ${pc(r.course_pct)} complete</small></span></a>`).join("")}${explored.filter((e) => !mine.some((m) => m.href.startsWith(e.href))).slice(0, 4).map((r) => `<a class="gx-ex-mini" href="${esc(r.href)}">${uiIcon("clock")}<span><b>${esc(r.title)}</b><small>${esc(r.sub || "Explored")}</small></span></a>`).join("")}</div></section>` : ""}
      ${groups.map(({ g, items }) => `<section class="gx-ex-sec"><h2>${esc(g.title)}</h2>${g.blurb ? `<p class="gx-ex-sub">${esc(g.blurb)}</p>` : ""}<div class="gx-ex-sites">${items.map((s) => {
        const cs = sites.get(s.n);
        return `<article class="gx-ex-site"><header>${tileHtml(s)}<div><a href="${esc(pathOf(s))}"><b>${esc(s.n)}</b></a><small>${esc(s.who || "")}</small></div></header>
          <ul>${cs.map((c) => { const p = coursePct(c), n = c.units.reduce((a, u) => a + u[3].length, 0); return `<li><a href="#/course/${esc(c.s)}"><span><b>${esc(c.n)}</b><small>${c.units.length} ${esc(c.U.toLowerCase())}s · ${n} lessons</small></span>${p != null ? `<em class="gx-ex-pct" title="${pc(p)} complete"><i style="width:${Math.max(3, p * 100)}%"></i></em>` : uiIcon("right")}</a></li>`; }).join("")}</ul></article>`;
      }).join("")}</div></section>`).join("")}
      <p class="gx-ex-foot">Looking for a site without a course yet? <a href="/#find">Every Gradify site</a>.</p></div>`;
    wireSearch();
  }

  // ---------- a course ----------
  function course(slug, focusUnit) {
    const c = idx.courses.find((x) => x.s === slug);
    if (!c) { root.innerHTML = `${crumbs([["Gradify", "/"], ["Explore", "#/"]])}${emptyState({ icon: "search", title: "That course isn't here", body: "It may have moved. Every course is listed on Explore.", actions: [{ label: "Explore every course", href: "#/", primary: true }] })}`; return; }
    const prog = progressOf(c), tree = courseTree(c, prog), site = siteOf(c.site), g = groupOfSite(c.site);
    const total = tree.reduce((a, u) => a + u.total, 0), done = tree.reduce((a, u) => a + u.done, 0), mins = tree.reduce((a, u) => a + u.mins, 0);
    const cont = myCourses().find((r) => r.slug === c.s);
    const firstOpen = tree.flatMap((u) => u.topics.flatMap((t) => t.lessons)).find((l) => !l.done);
    const topicName = (key) => { const [uid, name] = key.split("/"); const u = tree.find((x) => x.id === uid); return { u, name: name || u?.title || key }; };
    const stage = (() => { try { return sessionStorage.getItem(`gx-ex-stage:${slug}`) || "all"; } catch { return "all"; } })();
    visit({ href: `/explore.html#/course/${c.s}`, title: c.n, sub: `${c.site} · explored`, kind: "explore" });
    const topicCard = (u, t) => {
      const lessonHref = (l) => `${c.u}#/lesson/${l.id}`, start = t.lessons.find((l) => !l.done) || t.lessons[0];
      const testHref = `${c.u}#/target/${encodeTest({ minutes: 5, scope: "lessons", lessons: t.lessons.map((l) => l.id) })}`;
      const links = (keys, label) => keys.length ? `<p class="gx-ex-rel"><span>${label}</span>${keys.slice(0, 3).map((k) => { const x = topicName(k); return x.u ? `<a href="#/course/${esc(c.s)}/${esc(x.u.id)}">${esc(x.name)}</a>` : ""; }).join("")}</p>` : "";
      const st = t.done === t.lessons.length ? (t.mastered === t.lessons.length ? "mastered" : "learned") : t.revise ? "revise" : t.done ? "started" : "new";
      return `<article class="gx-ex-topic s-${st}">
        <header><span class="gx-kicker">${u.n}.${t.i + 1}</span><h4>${esc(t.name || "Lessons")}</h4></header>
        <p class="gx-ex-meta"><span>${dot(st)}${esc(STATUS[st]?.label || "")}</span><span>${t.lessons.length} lesson${t.lessons.length > 1 ? "s" : ""}</span><span>≈ ${hours(t.mins)}</span></p>
        <div class="gx-bar"><i style="width:${(t.done / t.lessons.length) * 100}%"></i></div>
        ${links(t.pre, "Builds on")}${links(t.next, "Leads to")}
        <details class="gx-ex-ls"><summary>${t.lessons.length} lesson${t.lessons.length > 1 ? "s" : ""}</summary><ol>${t.lessons.map((l) => `<li><a href="${esc(lessonHref(l))}">${dot(l.st)}<span>${esc(l.title)}</span></a></li>`).join("")}</ol></details>
        <div class="gx-ex-acts"><a class="btn btn-light lg btn-sm" href="${esc(lessonHref(start))}"><span>${t.done ? (t.done === t.lessons.length ? "Review" : "Continue") : "Start"}</span></a>${t.done ? `<a class="btn btn-ghost lg btn-sm" href="${esc(testHref)}"><span>5-min test</span></a>` : ""}</div>
      </article>`;
    };
    const chapters = tree.filter((u) => stage === "all" || String(u.stageIndex) === stage || u.id === focusUnit);
    // the course as chapters (accordions) or as its mastery map; arriving at a chapter always shows the chapters
    const view = focusUnit ? "chapters" : pref("explore", "view", "chapters");
    root.innerHTML = `${crumbs([["Gradify", "/"], ["Explore", "#/"], ...(g ? [[g.title, "#/"]] : []), [c.site, site ? pathOf(site) : "#/"], [c.n, `#/course/${c.s}`]])}
      <header class="gx-ex-course">
        <div class="gx-ex-ctitle">${tileHtml(site, 56)}<div><span class="gx-kicker">${esc(c.site)} · course</span><h1>${esc(c.n)}</h1>
        <p class="gx-ex-meta"><span>${c.units.length} ${esc(c.U.toLowerCase())}s</span><span>${tree.reduce((a, u) => a + u.topics.length, 0)} topics</span><span>${total} lessons</span><span>≈ ${hours(mins)} in all</span></p></div></div>
        <div class="gx-ex-cprog">${done ? `<b>${pc(done / total)}</b><small>${done} of ${total} lessons done</small><div class="gx-bar"><i style="width:${(done / total) * 100}%"></i></div>` : `<small>Not started yet. Begin anywhere.</small>`}
          <div class="gx-ex-acts">${cont ? `<a class="btn btn-light lg btn-sm" href="${esc(cont.href)}"><span>${uiIcon("play")} Continue: ${esc(cont.title)}</span></a>` : firstOpen ? `<a class="btn btn-light lg btn-sm" href="${esc(`${c.u}#/lesson/${firstOpen.id}`)}"><span>${uiIcon("play")} ${done ? "Continue the course" : "Start the course"}</span></a>` : ""}<a class="btn btn-ghost lg btn-sm" href="${esc(c.u)}"><span>Course home</span></a></div></div>
      </header>
      ${searchBox()}
      <div class="gx-ex-browse">
      <div class="gx-ex-views">${segmentedHtml("view", [["chapters", "Chapters"], ["map", "Mastery map"]], view, "Show the course as")}</div>
      ${view === "map" ? `<div class="gx-ex-map"></div>` : `
      ${c.T?.length > 1 ? `<div class="gx-ex-stages" role="group" aria-label="Show stage"><button type="button" data-stage="all" aria-pressed="${stage === "all"}">All stages</button>${c.T.map((t, i) => `<button type="button" data-stage="${i}" aria-pressed="${stage === String(i)}">${esc(t)}</button>`).join("")}</div>` : ""}
      <div class="gx-ex-tools"><button type="button" class="gx-link" data-acc-all>Expand all</button></div>
      <div class="gx-ex-chapters">${chapters.map((u) => `<details class="gx-ex-ch" id="${esc(u.id)}" data-acc="${esc(u.id)}" ${u.id === focusUnit ? "data-acc-here open" : ""}>
        <summary><span class="gx-ex-n">${u.n}</span><span class="gx-ex-ct"><b>${esc(u.title)}</b>${u.blurb ? `<small>${esc(u.blurb)}</small>` : ""}<em>${u.stage ? `${esc(u.stage)} · ` : ""}${u.topics.length} topic${u.topics.length > 1 ? "s" : ""} · ${u.total} lessons · ≈ ${hours(u.mins)}${u.revise ? ` · <b class="gx-ex-warn">${u.revise} to revise</b>` : ""}</em></span>
          <span class="gx-ex-cp" title="${u.done} of ${u.total} lessons done"><span class="gx-bar"><i style="width:${u.pct * 100}%"></i></span><small>${pc(u.pct)}</small></span></summary>
        <div class="gx-ex-topics">${u.topics.map((t) => topicCard(u, t)).join("")}</div></details>`).join("")}</div>`}</div>`;
    // switching view goes back to the course-level address, so choosing a chapter afterwards always changes the URL
    wireSegmented(root, (v) => { setPref("explore", "view", v); if (location.hash !== `#/course/${slug}`) history.replaceState(null, "", `#/course/${slug}`); course(slug); });
    if (view === "map") {
      const map = masteryMap(tree.map((u) => ({ n: u.n, id: u.id, title: u.title, lessons: u.topics.flatMap((t) => t.lessons.map((l) => l.id)) })), c.cp || {}, prog.status, prog.right);
      renderMasteryMap(root.querySelector(".gx-ex-map"), map, { hrefOf: (x) => `#/course/${c.s}/${x.id}`, unitWord: c.U, title: `How ${c.n} fits together`, intro: `Each ${c.U.toLowerCase()} sits to the right of what it builds on. Colours show how far your own answers have got: open any ${c.U.toLowerCase()} to start.` });
      wireSearch();
      return;
    }
    wireSearch();
    const acc = wireAccordion(root.querySelector(".gx-ex-browse"), { scope: `explore:${slug}`, key: "open" });
    root.querySelectorAll("[data-stage]").forEach((b) => b.addEventListener("click", () => { try { sessionStorage.setItem(`gx-ex-stage:${slug}`, b.dataset.stage); } catch { /* private mode */ } course(slug); }));
    if (focusUnit) { const el = document.getElementById(focusUnit); if (el) { el.open = true; requestAnimationFrame(() => el.scrollIntoView({ block: "start" })); } }
    else if (!root.querySelector(".gx-ex-ch[open]")) { const cur = tree.find((u) => u.done && u.done < u.total) || tree.find((u) => !u.done); const el = cur && document.getElementById(cur.id); if (el) el.open = true; }
    void acc;
  }

  const PATHWAY_VIEWS = new Set(["pathways", "subjects", "boards", "countries", "stages", "professions", "subject", "body", "qualification", "award", "country", "jurisdiction", "spec", "topic", "org", "stage"]);
  function route() {
    const [, view0, slug, unit] = location.hash.replace(/^#/, "").split("/"), view = (view0 || "").split("?")[0];
    if (PATHWAY_VIEWS.has(view)) {
      pw ||= pathwaysFor(idx);
      const title = renderPathway(root, location.hash, { ...pw, crumbs });
      scrollTo({ top: 0 }); document.title = `${title} · Explore · Gradify`;
      return;
    }
    if (view === "course" && slug) course(slug, unit); else overview();
    if (!unit) scrollTo({ top: 0 });
    document.title = view === "course" ? `${idx.courses.find((c) => c.s === slug)?.n || "Course"} · Explore · Gradify` : "Explore · Gradify";
  }
  loadIndex().then((x) => { idx = x; if (!idx.courses?.length) { root.innerHTML = emptyState({ icon: "offline", title: "Explore couldn't load", body: "The course list didn't arrive. Check your connection and try again.", actions: [{ label: "Try again", href: location.href, primary: true }] }); return; } route(); addEventListener("hashchange", route); });
}
