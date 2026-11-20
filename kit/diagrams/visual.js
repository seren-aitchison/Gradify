// Gradify Visual Learning Engine: puts checked teaching diagrams into a lesson.
//
// A lesson places a diagram with a `D: <id>` line in its notes (kit/course/notes.js renders an empty
// <figure class="vx" data-dg="id" hidden>). hydrateDiagrams() fills each one from kit/diagrams/manifest.json and the
// prebuilt SVGs in kit/diagrams/svg/ (scripts/diagrams/build.mjs).
//
// Publishing rule: learners only see a diagram whose status is "approved" (a named subject reviewer signed it off).
// Anything else stays hidden, unless preview mode is on (?diagrams=preview in the address, or
// localStorage "gradify:diagrams" = "preview"), when it shows with a banner saying what has and hasn't been checked.
//
// Each diagram has: a wide layout for desktop and a narrow one for phones (chosen by the figure's own width), a
// caption that says what to notice, a full-size view, and a step-by-step text description for screen readers and for
// anyone who wants the diagram in words.

const BASE = new URL("./", import.meta.url);
let manifest = null;
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export function previewMode() {
  try {
    if (/[?&#]diagrams=preview\b/.test(location.search + location.hash)) { localStorage.setItem("gradify:diagrams", "preview"); return true; }
    if (/[?&#]diagrams=off\b/.test(location.search + location.hash)) { localStorage.removeItem("gradify:diagrams"); return false; }
    return localStorage.getItem("gradify:diagrams") === "preview";
  } catch { return false; }
}
const STATUS = {
  validated: "Draft: every automatic check passed; not yet reviewed",
  "ai-reviewed": "Draft: automatic checks passed and an AI reviewer checked it; awaiting a subject expert",
  approved: "Checked by a subject reviewer",
};

async function loadManifest() {
  if (!manifest) manifest = fetch(new URL("manifest.json", BASE)).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  return manifest;
}
const svgCache = new Map();
function loadSvg(id, kind) {
  const key = `${id}.${kind}`;
  if (!svgCache.has(key)) svgCache.set(key, fetch(new URL(`svg/${key}.svg`, BASE)).then((r) => (r.ok ? r.text() : "")).catch(() => ""));
  return svgCache.get(key);
}
// ids inside an inline SVG (clip paths) must be unique on the page
let uid = 0;
const uniq = (svg) => { const n = ++uid; return svg.replace(/id="([^"]+)"/g, `id="$1-${n}"`).replace(/url\(#([^)]+)\)/g, `url(#$1-${n})`); };

/** Fill every placed diagram inside `root`. Safe to call more than once. */
export async function hydrateDiagrams(root, { preview = previewMode() } = {}) {
  const figs = [...root.querySelectorAll("figure.vx[data-dg]:not([data-vx-done])")];
  if (!figs.length) return;
  const m = await loadManifest();
  for (const fig of figs) {
    fig.dataset.vxDone = "1";
    const d = m[fig.dataset.dg];
    if (!d || d.status === "failed" || (d.status !== "approved" && !preview)) { fig.remove(); continue; }
    const [wide, narrow] = await Promise.all([loadSvg(fig.dataset.dg, "wide"), loadSvg(fig.dataset.dg, "narrow")]);
    if (!wide) { fig.remove(); continue; }
    const passed = d.checks.filter((c) => c.ok).length;
    fig.innerHTML = `
      ${d.status !== "approved" ? `<p class="vx-draft" role="note"><b>Preview</b> ${esc(STATUS[d.status] || d.status)} (${passed}/${d.checks.length} checks).</p>` : ""}
      <button type="button" class="vx-art" aria-label="Open the diagram full size: ${esc(d.title)}">
        <span class="vx-wide">${uniq(wide)}</span><span class="vx-narrow">${uniq(narrow || wide)}</span>
      </button>
      <figcaption><b>${esc(d.title)}.</b> ${esc(d.caption)}</figcaption>
      <details class="vx-desc"><summary>The diagram in words</summary><ol>${d.description.map((x) => `<li>${esc(x)}</li>`).join("")}</ol></details>
      ${preview ? `<details class="vx-checks"><summary>What was checked</summary><ul>${d.checks.map((c) => `<li class="${c.ok ? "ok" : "no"}">${c.ok ? "✓" : "✗"} ${esc(c.name)}${c.detail ? ` <small>${esc(c.detail)}</small>` : ""}</li>`).join("")}</ul>${d.review?.notes ? `<p><b>Review:</b> ${esc(d.review.notes)}</p>` : ""}</details>` : ""}`;
    fig.hidden = false;
    fig.querySelector(".vx-art").addEventListener("click", () => openFull(d, wide));
  }
}

// full size: the wide layout in a dialog that can scroll and pinch-zoom on a phone
function openFull(d, wide) {
  const dlg = document.createElement("dialog");
  dlg.className = "vx-full";
  dlg.setAttribute("aria-label", d.title);
  dlg.innerHTML = `<div class="vx-fullart">${uniq(wide)}</div><p><b>${esc(d.title)}.</b> ${esc(d.caption)}</p><button type="button" class="vx-close" aria-label="Close">×</button>`;
  const close = () => { dlg.close(); dlg.remove(); };
  dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest(".vx-close")) close(); });
  dlg.addEventListener("cancel", (e) => { e.preventDefault(); close(); });
  document.body.append(dlg);
  dlg.showModal();
  dlg.querySelector(".vx-close").focus();
}
