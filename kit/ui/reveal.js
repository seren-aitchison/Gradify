// Calm motion for Design System pages (kit/styles/system.css): .ds-reveal elements fade up once as they come into view,
// and a .ds-zoom product shot opens from 90% to full size as it scrolls up the screen. Both stay still for reduced
// motion (the system setting or the learner's own, html[data-motion="reduce"]).
//   import { mountReveal } from "/kit/ui/reveal.js"; mountReveal();
export function mountReveal(root = document) {
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "reduce";
  const items = [...root.querySelectorAll(".ds-reveal")];
  if (still || !("IntersectionObserver" in window)) { items.forEach((el) => el.classList.add("in")); return; }
  // anything already on screen shows straight away; only what's further down waits to fade up
  for (const el of items) if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in");
  document.documentElement.classList.add("ds-js");
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
  items.forEach((el) => io.observe(el));
  const zooms = [...root.querySelectorAll(".ds-zoom")]; if (!zooms.length) return;
  let raf = 0;
  const tick = () => { raf = 0; for (const z of zooms) { const r = z.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.85))); z.style.setProperty("--ds-zoom", (0.9 + 0.1 * p).toFixed(4)); } };
  addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
  tick();
}
