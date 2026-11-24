// A drag-up sheet for a tool's inputs (the degree tracker's module list): [data-sheet] with a .sheet-handle button and
// a .sheet-body. If the handle holds other controls (the degree tracker's page tabs), a .sheet-toggle button inside
// it opens and closes the sheet, and taps on those controls are left to them.
//   Phones: the sheet floats at the bottom of the screen while its tool is in view, with only its handle showing.
//     Drag it up (or tap) to edit; drag it down to see the results. It moves with transform alone, on the compositor:
//     no layout or paint while dragging, one write per frame, and a flick carries it on, like an iOS sheet.
//   Larger screens: an ordinary card whose handle folds the list away.
// Open or closed is kept per tool in this browser.
const PHONE = matchMedia("(max-width: 700px)");
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)");
const EASE = "transform .5s cubic-bezier(.32, .72, 0, 1)";   // the iOS sheet curve

export function mount(sheet) {
  const handle = sheet.querySelector(".sheet-handle"), body = sheet.querySelector(".sheet-body"), toggle = sheet.querySelector(".sheet-toggle") || handle;
  const own = (t) => !t.closest("button, a, input, select, textarea") || t.closest(".sheet-toggle") || t === handle;   // a tap meant for the sheet itself
  if (!handle || !body || sheet.dataset.ready) return;
  sheet.dataset.ready = "1";
  const tool = sheet.closest("[data-tool]") || sheet.parentElement, key = `gradify.sheet.${tool.dataset.tool || "tool"}`;
  const spacer = document.createElement("div"); spacer.className = "sheet-spacer"; spacer.setAttribute("aria-hidden", "true");
  sheet.after(spacer);

  let open = true, docked = false, shown = false, y = 0, frame = 0, peek = 0, height = 0;
  const remember = () => { try { localStorage.setItem(key, open ? "1" : "0"); } catch { /* storage blocked */ } };
  const hasMarks = () => [...tool.querySelectorAll('.rows [name="mark"]')].some((i) => i.value !== "");

  // where the sheet sits when docked: 0 open, (height - peek) closed, past the bottom when its tool is off screen
  const rest = () => (!shown ? height + 40 : open ? 0 : height - peek);
  const paint = (to, animate) => {
    y = to;
    sheet.style.transition = animate && !REDUCED.matches ? EASE : "none";
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => { sheet.style.transform = `translate3d(0, ${Math.round(y)}px, 0)`; });
  };
  const measure = () => { height = sheet.offsetHeight; peek = handle.offsetHeight; spacer.style.height = docked ? `${peek + 24}px` : "0px"; };

  function state(next, animate = true) {
    open = next;
    toggle.setAttribute("aria-expanded", String(open));
    sheet.classList.toggle("open", open);
    if (docked) { body.inert = !open; body.hidden = false; paint(rest(), animate); }
    else { body.inert = false; body.hidden = !open; }
  }

  // docked on phones, in the page elsewhere
  function mode() {
    docked = PHONE.matches;
    sheet.classList.toggle("docked", docked);
    if (!docked) { sheet.style.transform = ""; sheet.style.transition = ""; sheet.inert = false; spacer.style.height = "0px"; state(open, false); return; }
    body.hidden = false; measure(); onScroll(true); state(open, false);
  }
  // show the docked sheet only while its tool fills a good part of the screen, so it never covers the article
  function onScroll(force) {
    if (!docked) return;
    const r = tool.getBoundingClientRect(), vh = innerHeight;
    const want = r.top < vh * 0.7 && r.bottom > vh * 0.45;
    if (want !== shown || force === true) { shown = want; sheet.classList.toggle("shown", shown); sheet.inert = !shown; if (!shown && open && toggle !== handle) state(false, false); if (!drag) paint(rest(), force !== true); }
  }
  let ticking = false;
  addEventListener("scroll", () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; onScroll(); }); }, { passive: true });
  addEventListener("resize", () => { if (docked) { measure(); paint(rest(), false); } }, { passive: true });
  PHONE.addEventListener?.("change", mode);
  // rows added or removed change the sheet's height
  if ("ResizeObserver" in window) new ResizeObserver(() => { if (docked && !drag) { measure(); paint(rest(), false); } }).observe(body);

  // drag: follow the finger on the compositor, then snap by position or by a flick
  let drag = null;
  handle.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    drag = { start: e.clientY, from: y, moved: false, v: 0, last: e.clientY, t: e.timeStamp, id: e.pointerId };
    // follow the pointer anywhere on the page until it lets go (a mouse leaves the handle at once)
    addEventListener("pointermove", move, { passive: true }); addEventListener("pointerup", end); addEventListener("pointercancel", end);
    // the pointer is only captured once it moves: capturing on touch would send every tap to the handle instead of
    // the button under the finger (the page tabs)
  });
  function move(e) {
    if (!drag || e.pointerId !== drag.id) return;
    const dy = e.clientY - drag.start;
    if (!drag.moved && Math.abs(dy) < 6) return;
    if (!drag.moved) { drag.moved = true; handle.setPointerCapture(e.pointerId); if (docked) { sheet.style.transition = "none"; body.inert = false; } }
    const dt = Math.max(1, e.timeStamp - drag.t); drag.v = 0.8 * ((e.clientY - drag.last) / dt) + 0.2 * drag.v; drag.last = e.clientY; drag.t = e.timeStamp;
    if (!docked) return;
    const max = height - peek, raw = drag.from + dy;
    // rubber-band past either end, like iOS
    const to = raw < 0 ? raw / 3 : raw > max ? max + (raw - max) / 3 : raw;
    y = to; cancelAnimationFrame(frame); frame = requestAnimationFrame(() => { sheet.style.transform = `translate3d(0, ${Math.round(y)}px, 0)`; });
  }
  function end(e) {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag; drag = null;
    removeEventListener("pointermove", move); removeEventListener("pointerup", end); removeEventListener("pointercancel", end);
    if (handle.hasPointerCapture?.(e.pointerId)) handle.releasePointerCapture(e.pointerId);
    if (!d.moved) return;   // a tap: the click handler toggles
    handle.dataset.dragged = "1";
    if (!docked) { state(d.v < 0 ? true : d.v > 0 ? false : open); remember(); return; }
    const max = height - peek;
    state(d.v < -0.35 ? true : d.v > 0.35 ? false : y < max / 2); remember();
  }
  handle.addEventListener("click", (e) => {
    if (handle.dataset.dragged) { delete handle.dataset.dragged; e.preventDefault(); e.stopPropagation(); return; }
    if (!own(e.target)) return;
    state(!open); remember();
  }, true);
  // other code can close it (a page chosen from the list)
  sheet.addEventListener("sheet:close", () => { if (open) { state(false); remember(); } });
  // anything that asks for the list (the dashboard's "Add a module") opens it and focuses the first field
  tool.addEventListener("click", (e) => {
    if (!e.target.closest("[data-open-sheet]")) return;
    state(true); remember();
    setTimeout(() => body.querySelector("input, select")?.focus({ preventScroll: true }), REDUCED.matches ? 0 : 350);
  });

  // where it starts: as left last time; on a first visit open, except on a phone once there are marks to show
  let saved = null; try { saved = localStorage.getItem(key); } catch { /* storage blocked */ }
  open = toggle !== handle ? false : saved === null ? !(PHONE.matches && hasMarks()) : saved === "1";   // a menu sheet starts closed
  mode();
}
