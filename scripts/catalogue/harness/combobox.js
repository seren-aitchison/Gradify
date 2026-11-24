// Reference search box for the catalogue harness: the WAI-ARIA combobox pattern (list autocomplete, focus stays in the
// input, aria-activedescendant for the highlighted option). Arrow keys move, Enter chooses, Escape closes (a second
// Escape clears), Home/End stay in the text. Results are suggestions; choosing one is the student's explicit
// confirmation. The last option is always "Not listed: use what I typed", which links nothing (id: null).
// Query string: ?ds=<dataset folder under /catalogue-build/>&country=GB&region=ENG
import { createCatalogue } from "/kit/data/catalogue.js";

const qs = new URLSearchParams(location.search);
const DS = qs.get("ds") || "fixtures", COUNTRY = qs.get("country") || "GB", REGION = qs.get("region") || "ENG";
const make = () => createCatalogue({ base: `/catalogue-build/${DS}/`, cacheName: `gradify-catalogue-${DS}` });
let cat = make();
window.__newReader = () => { cat = make(); };   // the harness uses this to prove a fresh reader works offline

const input = document.getElementById("q"), list = document.getElementById("q-list"), status = document.getElementById("q-help"), chosen = document.querySelector("[data-chosen]");
let options = [], active = -1, seq = 0, loaded = false;
window.__timings = [];

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
function render() {
  list.innerHTML = options.map((o, i) => `<li id="opt-${i}" role="option" aria-selected="${i === active}">${esc(o.name)}<small>${o.custom ? "Links nothing; you can import a handbook later" : `${esc(o.town || "")}${o.closed ? " · Closed" : ""}`}</small></li>`).join("");
  const open = options.length > 0;
  list.hidden = !open;
  input.setAttribute("aria-expanded", String(open));
  if (active >= 0) input.setAttribute("aria-activedescendant", `opt-${active}`); else input.removeAttribute("aria-activedescendant");
}
function close() { options = []; active = -1; render(); }
function choose(i) {
  const o = options[i]; if (!o) return;
  input.value = o.custom ? o.typed : o.name;
  const entry = o.custom ? { id: null, name: o.typed } : { id: o.id, name: o.name };
  chosen.textContent = o.custom ? `Using “${o.typed}” (not linked to the catalogue)` : `Chosen: ${o.name}`;
  chosen.dataset.id = entry.id || "";
  status.textContent = chosen.textContent;
  close();
}

input.addEventListener("input", async () => {
  const t0 = performance.now(), my = ++seq, q = input.value;
  if (!q.trim()) { close(); status.textContent = ""; return; }
  if (!loaded) { status.textContent = "Loading the list of schools, colleges and universities…"; input.setAttribute("aria-busy", "true"); }
  let res;
  try { res = await cat.searchProviders(COUNTRY, REGION, q, { limit: 8 }); }
  catch { status.textContent = "Couldn't load the list. You can type your school's name and carry on."; res = []; }
  loaded = true; input.removeAttribute("aria-busy");
  if (my !== seq) return;   // a newer keystroke has already searched
  options = [...res, { custom: true, typed: q, name: `Not listed: use “${q}”` }];
  active = -1;
  render();
  status.textContent = res.length ? `${res.length} suggestion${res.length === 1 ? "" : "s"}. Use the arrow keys to choose.` : "No matches. You can use what you typed.";
  window.__timings.push({ q, ms: performance.now() - t0, n: res.length });
});
input.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") { e.preventDefault(); if (!options.length) return; active = (active + 1) % options.length; render(); }
  else if (e.key === "ArrowUp") { e.preventDefault(); if (!options.length) return; active = active <= 0 ? options.length - 1 : active - 1; render(); }
  else if (e.key === "Enter") { if (active >= 0) { e.preventDefault(); choose(active); } }
  else if (e.key === "Escape") { if (options.length) close(); else { input.value = ""; status.textContent = ""; } }
});
list.addEventListener("click", (e) => { const li = e.target.closest('[role="option"]'); if (li) { choose(Number(li.id.slice(4))); input.focus(); } });
list.addEventListener("mousedown", (e) => e.preventDefault());   // keep focus in the input
