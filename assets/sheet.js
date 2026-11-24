// A drag-up sheet for a tool's inputs (the degree tracker's module list): [data-sheet] with a .sheet-handle button and
// a .sheet-body. On phones (assets/seo.css) it sticks to the bottom of the screen while its tool is in view, so the
// results stay visible above it. Drag the handle up to open it and down to tuck it away, or tap it. On larger screens
// it's an ordinary card whose handle folds the list away. Open and closed are kept per tool in this browser.
const PHONE = "(max-width: 700px)";
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function mount(sheet) {
  const handle = sheet.querySelector(".sheet-handle"), body = sheet.querySelector(".sheet-body");
  if (!handle || !body || sheet.dataset.ready) return;
  sheet.dataset.ready = "1";
  const tool = sheet.closest("[data-tool]"), key = `gradify.sheet.${tool?.dataset.tool || "tool"}`;
  const phone = () => matchMedia(PHONE).matches;
  const max = () => Math.round(innerHeight * (phone() ? 0.7 : 10));
  let open = true;

  function set(next, animate = true) {
    open = next;
    handle.setAttribute("aria-expanded", String(open));
    sheet.classList.toggle("open", open);
    try { localStorage.setItem(key, open ? "1" : "0"); } catch { /* storage blocked */ }
    const done = () => { body.style.height = ""; body.hidden = !open; body.removeEventListener("transitionend", done); };
    if (!animate || reduced()) { body.style.transition = "none"; done(); requestAnimationFrame(() => { body.style.transition = ""; }); return; }
    body.hidden = false;
    const from = body.getBoundingClientRect().height;
    body.style.height = `${from}px`;
    const to = open ? Math.min(body.scrollHeight, max()) : 0;
    requestAnimationFrame(() => { body.style.transition = ""; body.style.height = `${to}px`; });
    body.addEventListener("transitionend", done);
    setTimeout(done, 400);   // in case transitionend doesn't fire (no change in height)
  }

  // where it starts: open on a first visit (there's nothing to see until marks are in), as left otherwise; on phones,
  // tucked away once there are marks, so the results show
  let saved = null; try { saved = localStorage.getItem(key); } catch { /* storage blocked */ }
  const hasMarks = () => [...(tool?.querySelectorAll('.rows [name="mark"]') || [])].some((i) => i.value !== "");
  set(saved === null ? !(phone() && hasMarks()) : saved === "1", false);

  // drag on the handle: the list follows the finger, then snaps open or shut
  let drag = null;
  handle.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    body.hidden = false;
    drag = { y: e.clientY, h: open ? body.getBoundingClientRect().height : 0, t: performance.now(), moved: false, last: e.clientY, v: 0 };
    body.style.transition = "none";
    handle.setPointerCapture(e.pointerId);
  });
  handle.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dy = drag.y - e.clientY;
    if (Math.abs(dy) > 6) drag.moved = true;
    if (!drag.moved) return;
    const now = performance.now(); drag.v = (drag.last - e.clientY) / Math.max(1, now - drag.t); drag.last = e.clientY; drag.t = now;
    body.style.height = `${Math.max(0, Math.min(max(), Math.min(body.scrollHeight, drag.h + dy)))}px`;
  });
  const end = (e) => {
    if (!drag) return;
    const d = drag; drag = null;
    if (handle.hasPointerCapture?.(e.pointerId)) handle.releasePointerCapture(e.pointerId);
    body.style.transition = "";
    if (!d.moved) { body.style.height = open ? "" : "0px"; body.hidden = !open; return; }   // a tap: the click handler toggles
    handle.dataset.dragged = "1";
    const h = body.getBoundingClientRect().height, full = Math.min(body.scrollHeight, max());
    set(d.v > 0.4 ? true : d.v < -0.4 ? false : h > full / 2);
  };
  handle.addEventListener("pointerup", end);
  handle.addEventListener("pointercancel", end);
  handle.addEventListener("click", () => {
    if (handle.dataset.dragged) { delete handle.dataset.dragged; return; }
    set(!open);
  });
  // anything that asks for the list (the empty dashboard's "Add a module mark") opens it
  tool?.addEventListener("click", (e) => {
    if (!e.target.closest("[data-open-sheet]")) return;
    set(true);
    setTimeout(() => body.querySelector("input, select")?.focus(), reduced() ? 0 : 320);
  });
}
