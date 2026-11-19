// "Continue learning", anywhere in Gradify: every course (kit/course/course.js noteVisit) writes the last lesson
// opened to one list on this device ("gradify.recent"), and this strip offers it back: on the Gradify homepage
// (every course) and on each subject site's homepage (that site's courses). Nothing shows for someone who hasn't
// started a course, so a first visit looks exactly as before.
//
//   import { mountContinue } from "/kit/core/continue.js";
//   mountContinue(el, { site: "SciGradify" });          // site: optional, limits it to one site's courses

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const ago = (t) => { const m = Math.round((Date.now() - t) / 6e4); return m < 2 ? "just now" : m < 60 ? `${m} min ago` : m < 1440 ? `${Math.round(m / 60)} h ago` : `${Math.round(m / 1440)} d ago`; };

export function recentLearning({ site = null, limit = 3 } = {}) {
  let list = [];
  try { list = JSON.parse(localStorage.getItem("gradify.recent") || "[]"); } catch { /* private mode */ }
  return list.filter((r) => r && r.href && r.title && (!site || r.site === site)).sort((a, b) => b.t - a.t).slice(0, limit);
}

const CSS = `
.gc-strip { margin: 22px 0; padding: 18px; border-radius: 18px; border: 1px solid var(--line, rgba(255,255,255,.12)); background: linear-gradient(120deg, rgba(var(--ink-rgb, 255,255,255), .06), rgba(var(--ink-rgb, 255,255,255), .02)); }
.gc-strip h2 { display: flex; align-items: center; gap: 8px; margin: 0 0 12px; font-size: 17px; letter-spacing: -.01em; }
.gc-strip h2 i { width: 8px; height: 8px; border-radius: 50%; background: #34d399; box-shadow: 0 0 10px #34d399; }
.gc-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px; }
.gc-item { display: grid; grid-template-columns: 1fr auto; gap: 4px 12px; align-items: center; padding: 14px 16px; border-radius: 14px; border: 1px solid var(--line, rgba(255,255,255,.12)); background: rgba(var(--surface-rgb, 20,20,20), .55); color: var(--fg, #fff); text-decoration: none; transition: transform .15s, border-color .15s; }
.gc-item:hover { transform: translateY(-2px); border-color: var(--line-strong, rgba(255,255,255,.3)); }
.gc-item small { font: 600 10.5px var(--mono, monospace); letter-spacing: .1em; text-transform: uppercase; color: var(--mute, #aaa); }
.gc-item b { grid-column: 1; font-size: 15.5px; line-height: 1.3; }
.gc-item em { grid-column: 1; font-style: normal; font-size: 12.5px; color: var(--mute, #aaa); }
.gc-item span { grid-column: 2; grid-row: 1 / span 3; display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: var(--invert-bg, #fff); color: var(--invert-fg, #000); font-size: 18px; }
.gc-bar { grid-column: 1; height: 4px; margin-top: 6px; border-radius: 9px; background: rgba(var(--ink-rgb, 255,255,255), .1); overflow: hidden; }
.gc-bar i { display: block; height: 100%; background: linear-gradient(90deg, #4641ff, #f055dd, #ff5600); }
@media (prefers-reduced-motion: reduce) { .gc-item { transition: none; } }`;

export function mountContinue(el, { site = null, title = "Continue learning" } = {}) {
  if (!el) return null;
  const list = recentLearning({ site });
  if (!list.length) { el.hidden = true; return null; }
  if (!document.getElementById("gc-css")) document.head.append(Object.assign(document.createElement("style"), { id: "gc-css", textContent: CSS }));
  el.hidden = false; el.classList.add("gc-strip");
  el.setAttribute("aria-label", title);
  el.innerHTML = `<h2><i aria-hidden="true"></i>${esc(title)}</h2><div class="gc-list">${list.map((r) => `<a class="gc-item" href="${esc(r.href)}">
      <small>${esc(site ? r.course : `${r.site} · ${r.course}`)}</small><b>${esc(r.title)}</b><em>${esc(r.unit || "")} · ${ago(r.t)}</em>
      <div class="gc-bar" title="${Math.round((r.course_pct || 0) * 100)}% of the course complete"><i style="width:${Math.max(2, Math.round((r.course_pct || 0) * 100))}%"></i></div>
      <span aria-hidden="true">▶</span></a>`).join("")}</div>`;
  return list;
}
