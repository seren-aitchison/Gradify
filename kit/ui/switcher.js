// Recently opened courses, one click apart: a dropdown of the courses and subjects the learner is working on, newest
// first, each with how far through they are and the lesson they were on, opening where they left off. In the study
// app's top bar (kit/app/app-nav.js) and every course's header (kit/course/course.js). G then O opens it.
// Hidden for someone who hasn't started a course.
//
//   mountCourseSwitcher(el, { current: "/scigradify/biology/", where: "beforeend" });
import { esc, ensureStyles } from "./store.js";
import { uiIcon } from "./icons.js";
import { shortcuts } from "./keys.js";
import { myCourses } from "./global-nav.js";

/** one row per course (the courses' list can hold a course more than once), newest first. Pure. */
export function recentCourses(list = [], { limit = 8 } = {}) {
  const seen = new Set(), out = [];
  for (const r of [...list].sort((a, b) => (b.t || 0) - (a.t || 0))) {
    const base = String(r.href || "").split("#")[0], key = `${r.site}|${r.course}|${base}`;
    if (!r.href || seen.has(key)) continue;
    seen.add(key); out.push({ ...r, base });
  }
  return out.slice(0, limit);
}

let opened = null;
export function mountCourseSwitcher(host, { current = null, where = "beforeend", label = "Your courses", explore = "/explore.html" } = {}) {
  if (!host) return null;
  ensureStyles();
  const wrap = document.createElement("div");
  wrap.className = "gx-cs";
  wrap.innerHTML = `<button type="button" class="gx-csb" aria-haspopup="menu" aria-expanded="false"></button><div class="gx-csm" role="menu" hidden></div>`;
  host.insertAdjacentElement(where, wrap);
  const btn = wrap.querySelector(".gx-csb"), menu = wrap.querySelector(".gx-csm");
  const list = () => recentCourses(myCourses());
  const cur = () => list().find((c) => current && c.base === current) || null;
  function paintButton() {
    const xs = list();
    wrap.hidden = !xs.length;
    const c = cur();
    btn.innerHTML = `${uiIcon("book")}<span>${esc(c ? c.course : label)}</span>${uiIcon("right", "gx-cschev")}`;
    btn.setAttribute("aria-label", `${c ? `${c.course}: switch course` : label}`);
    btn.title = "Switch between your courses (G then O)";
  }
  function paintMenu() {
    const xs = list();
    menu.innerHTML = `<p class="gx-csh">Recently opened</p>${xs.map((c) => {
      const on = current && c.base === current, p = Math.round((c.course_pct || 0) * 100);
      return `<a role="menuitem" href="${esc(c.href)}" class="gx-csi${on ? " on" : ""}" ${on ? 'aria-current="true"' : ""}><span class="gx-cst"><b>${esc(c.course)}</b><small>${esc([c.site, c.title].filter(Boolean).join(" · "))}</small></span><span class="gx-csp" aria-label="${p}% through"><i style="width:${Math.max(3, p)}%"></i></span><em>${p}%</em></a>`;
    }).join("")}<a role="menuitem" href="${esc(explore)}" class="gx-csi gx-csall">${uiIcon("search")}<span class="gx-cst"><b>Every course</b><small>Explore Gradify</small></span></a>`;
  }
  const items = () => [...menu.querySelectorAll("[role=menuitem]")];
  function open(focus = true) {
    opened?.close?.();
    paintMenu(); menu.hidden = false; btn.setAttribute("aria-expanded", "true"); wrap.classList.add("open");
    opened = api;
    if (focus) (menu.querySelector(".on") || items()[0])?.focus();
  }
  function close(refocus = false) {
    if (menu.hidden) return;
    menu.hidden = true; btn.setAttribute("aria-expanded", "false"); wrap.classList.remove("open");
    if (opened === api) opened = null;
    if (refocus) btn.focus();
  }
  btn.addEventListener("click", () => (menu.hidden ? open() : close()));
  btn.addEventListener("keydown", (e) => { if (e.key === "ArrowDown") { e.preventDefault(); open(); } });
  menu.addEventListener("keydown", (e) => {
    const xs = items(), i = xs.indexOf(document.activeElement);
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(true); }
    else if (e.key === "ArrowDown") { e.preventDefault(); xs[(i + 1) % xs.length]?.focus(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); xs[(i - 1 + xs.length) % xs.length]?.focus(); }
    else if (e.key === "Home") { e.preventDefault(); xs[0]?.focus(); }
    else if (e.key === "End") { e.preventDefault(); xs.at(-1)?.focus(); }
    else if (e.key === "Tab") close();
  });
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) close(); });
  document.addEventListener("click", (e) => { if (!wrap.contains(e.target)) close(); });
  addEventListener("storage", (e) => { if (e.key === "gradify.recent") paintButton(); });
  const api = { open, close, refresh: paintButton, el: wrap };
  if (!mountCourseSwitcher.keyed) {
    mountCourseSwitcher.keyed = true;
    shortcuts([{ keys: "g o", label: "Switch course", group: "Go to", run: () => { const vis = [...document.querySelectorAll(".gx-cs:not([hidden])")].find((x) => x.offsetParent); vis?.querySelector(".gx-csb")?.click(); } }]);
  }
  paintButton();
  return api;
}
