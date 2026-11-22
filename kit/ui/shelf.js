// "Your shelf": the learner's courses as a stack of 3D spines, each in its subject's colour, like tapes on a shelf.
// As the page scrolls, each spine tilts back the further it is from the middle of the screen and lies flat as it
// reaches it, so the one you're looking at opens towards you. A spine is one tap to the recommended next step.
// With reduced motion the spines stay flat. Used by kit/ui/global-nav.js mountYourLearning({ layout: "shelf" }).
//
//   el.innerHTML = shelfHtml(courses, { colourOf });   const stop = wireShelf(el);
import { esc } from "./store.js";

const CSS = `
.gx-shelf { --shelf-tilt: 34deg; display: grid; gap: 14px; padding: 6px 0 10px; perspective: 900px; perspective-origin: 50% 40%; list-style: none; margin: 0; }
.gx-spine { --c: #6c63ff; --t: 0deg; position: relative; display: block; height: 104px; border-radius: 16px; color: #fff; text-decoration: none;
  transform: rotateX(var(--t)); transform-origin: 50% 50%; transform-style: preserve-3d; transition: transform .12s linear; will-change: transform;
  background: linear-gradient(135deg, color-mix(in srgb, var(--c) 92%, #fff 8%), color-mix(in srgb, var(--c) 62%, #000 38%));
  box-shadow: 0 1px 0 rgba(255,255,255,.35) inset, 0 -1px 0 rgba(0,0,0,.25) inset, 0 22px 40px -22px color-mix(in srgb, var(--c) 80%, #000); }
/* the spine's thickness: a lit top face and a shaded bottom face, which show as it tilts */
.gx-spine::before, .gx-spine::after { content: ""; position: absolute; left: 10px; right: 10px; height: 26px; border-radius: 10px; pointer-events: none; }
.gx-spine::before { bottom: 100%; transform-origin: 50% 100%; transform: rotateX(90deg); background: linear-gradient(color-mix(in srgb, var(--c) 40%, #fff), color-mix(in srgb, var(--c) 75%, #fff)); }
.gx-spine::after { top: 100%; transform-origin: 50% 0; transform: rotateX(-90deg); background: color-mix(in srgb, var(--c) 45%, #000); }
/* the label strip, like a tape's: ruled lines, the course name, progress and the next step */
.gx-sp-face { position: absolute; inset: 12px 64px 12px 12px; display: grid; grid-template-rows: auto 1fr auto; gap: 4px; padding: 10px 14px; border-radius: 10px;
  background: repeating-linear-gradient(180deg, transparent 0 21px, rgba(13,13,24,.05) 21px 22px), #fbfbfd; color: #0d0d18; overflow: hidden; }
.gx-sp-face small { font: 600 10px var(--mono, monospace); letter-spacing: .12em; text-transform: uppercase; color: color-mix(in srgb, var(--c) 70%, #0d0d18); }
.gx-sp-face b { font-size: 17px; letter-spacing: -.01em; line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.gx-sp-foot { display: flex; align-items: center; gap: 10px; font-size: 12px; color: #3a3a4a; min-width: 0; }
.gx-sp-foot span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.gx-sp-bar { flex: none; width: 64px; height: 5px; border-radius: 9px; background: rgba(13,13,24,.12); overflow: hidden; }
.gx-sp-bar i { display: block; height: 100%; background: var(--c); border-radius: inherit; }
.gx-sp-play { position: absolute; right: 14px; top: 50%; translate: 0 -50%; display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%;
  background: rgba(255,255,255,.95); color: #0d0d18; box-shadow: 0 6px 16px -6px rgba(0,0,0,.6); }
.gx-sp-play svg { width: 16px; height: 16px; margin-left: 2px; }
.gx-spine:hover .gx-sp-play, .gx-spine:focus-visible .gx-sp-play { transform: scale(1.08); }
.gx-spine:focus-visible { outline: 3px solid var(--fg, #fff); outline-offset: 4px; }
.gx-shelfnote { margin: 4px 0 0; font-size: 12.5px; color: var(--mute); }
@media (min-width: 900px) { .gx-shelf { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 420px) { .gx-spine { height: 96px; } .gx-sp-face { inset: 10px 58px 10px 10px; padding: 8px 12px; } .gx-sp-face b { font-size: 15.5px; } }
@media (prefers-reduced-motion: reduce) { .gx-spine { transform: none !important; transition: none; } }`;

const play = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>';

/** courses: [{ site, course, course_pct, next: { label, href }, href, title }] */
export function shelfHtml(courses, { colourOf = () => "#6c63ff" } = {}) {
  if (!document.getElementById("gx-shelf-css")) document.head.append(Object.assign(document.createElement("style"), { id: "gx-shelf-css", textContent: CSS }));
  return `<ol class="gx-shelf">${courses.map((r) => {
    const pct = Math.round((r.course_pct || 0) * 100), to = r.next?.href || r.href, step = r.next?.label || `Carry on with “${r.title}”`;
    return `<li><a class="gx-spine" href="${esc(to)}" style="--c:${esc(colourOf(r.site))}" aria-label="${esc(`${r.course}, ${pct}% complete. ${step}`)}">
      <span class="gx-sp-face"><small>${esc(r.site || "")}</small><b>${esc(r.course || r.title)}</b><span class="gx-sp-foot"><span class="gx-sp-bar"><i style="width:${Math.max(3, pct)}%"></i></span><span>${pct}% · ${esc(step)}</span></span></span>
      <span class="gx-sp-play">${play}</span></a></li>`;
  }).join("")}</ol>`;
}

/** tilt each spine by its distance from the middle of the screen; returns a function that stops it */
export function wireShelf(el) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  let raf = 0;
  const tilt = () => {
    raf = 0;
    const mid = innerHeight / 2;
    for (const s of el.querySelectorAll(".gx-spine")) {
      const r = s.getBoundingClientRect(), d = (r.top + r.height / 2 - mid) / (innerHeight / 2);   // -1 … 1 across the screen
      s.style.setProperty("--t", `${Math.max(-42, Math.min(42, -d * 50)).toFixed(1)}deg`);
    }
  };
  const on = () => { if (!raf) raf = requestAnimationFrame(tilt); };
  addEventListener("scroll", on, { passive: true }); addEventListener("resize", on);
  tilt();
  return () => { removeEventListener("scroll", on); removeEventListener("resize", on); };
}
