// Gradify's 3D glass icons: a coloured tile behind a frosted-glass pane, a white symbol on the glass, a thin rainbow
// edge, a soft glow underneath, and a slow float. Each Gradify site has its own set of about 50 symbols
// (kit/icons3d/<site>.js, built by scripts/build-icons.mjs); `pickIcon` chooses the one that fits a lesson, topic or
// card by its words, so the same set is remixed across the site's homepage, lessons and flashcards.
// Styles: "3D glass icons" in kit/styles/components.css.
const cache = new Map();
export const slugOf = (site) => String(site || "Gradify").split(" ")[0].toLowerCase().replace(/[^a-z]/g, "") || "gradify";

/** The icon set for a site ("MedGradify" → kit/icons3d/medgradify.js); Gradify's own for LifeOS. */
export function loadSet(site) {
  const slug = slugOf(site);
  if (!cache.has(slug)) cache.set(slug, import(`../icons3d/${slug}.js`).then((m) => m.default).catch(() => import("../icons3d/gradify.js").then((m) => m.default)));
  return cache.get(slug);
}

// colour pairs for the tile behind the glass: Gradify's spectrum, with the site's own colour mixed in
const PAIRS = [["#4641ff", "#8b3dff"], ["#f055dd", "#ff6aa8"], ["#ff5600", "#ffc002"], ["#1fae8c", "#3c78d8"], ["#8b3dff", "#f055dd"], ["#3c78d8", "#40d4b1"], ["#ff5a4d", "#f055dd"], ["#ffc002", "#ff8a00"]];
const hash = (s) => { let h = 2166136261; for (const ch of String(s)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return h >>> 0; };
const words = (t) => (String(t).toLowerCase().match(/[a-z]{3,}/g) || []).map((w) => w.replace(/(ies|es|s)$/, ""));

/** The symbol in a set that best fits some text (a lesson title, a topic, a card); a stable choice when nothing fits. */
export function pickIcon(set, text, { avoid = [] } = {}) {
  const names = Object.keys(set || {});
  if (!names.length) return null;
  const ws = words(text);
  let best = null, bestScore = 0;
  for (const n of names) {
    if (avoid.includes(n)) continue;
    const parts = n.split("-"), tags = set[n].t || [];
    let sc = 0;
    for (const w of ws) {
      if (parts.includes(w)) sc += 4;
      else if (tags.some((t) => t === w || t.replace(/s$/, "") === w)) sc += 3;
      else if (w.length >= 5 && tags.some((t) => t.includes(w))) sc += 1;
    }
    if (sc > bestScore) { bestScore = sc; best = n; }
  }
  if (best) return best;
  const pool = names.filter((n) => !avoid.includes(n));
  return pool[hash(text) % pool.length] || names[0];
}

/**
 * One glass icon, as HTML. `size` in px; `seed` varies the colours and the float timing.
 * @param {object} set  a loaded set; @param {string} name  a symbol in it
 */
export function glassIcon(set, name, { size = 56, seed = name, label = "" } = {}) {
  const icon = set?.[name];
  if (!icon) return "";
  const h = hash(seed), [a, b] = PAIRS[h % PAIRS.length];
  const delay = -((h % 4000) / 1000).toFixed(2), turn = ((h >> 4) % 2 ? 1 : -1) * (6 + ((h >> 6) % 6));
  return `<span class="g3d" style="--s:${size}px;--a:${a};--b:${b};--dl:${delay}s;--tw:${turn}deg" ${label ? `role="img" aria-label="${String(label).replace(/"/g, "&quot;")}"` : 'aria-hidden="true"'}>
    <span class="g3d-glow"></span><span class="g3d-back"></span>
    <span class="g3d-pane"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${icon.d}</svg></span>
  </span>`;
}

/** Fill every [data-g3d] element in `root`: data-g3d="words to match", data-g3d-size, optional data-g3d-site. */
export async function hydrate(root = document, site = "Gradify") {
  const els = [...root.querySelectorAll("[data-g3d]:not([data-g3d-done])")];
  if (!els.length) return;
  const sets = new Map();
  const used = [];
  for (const el of els) {
    const s = el.dataset.g3dSite || site;
    if (!sets.has(s)) sets.set(s, await loadSet(s));
    const set = sets.get(s), name = pickIcon(set, el.dataset.g3d, { avoid: el.dataset.g3dUnique != null ? used : [] });
    if (!name) continue;
    used.push(name);
    el.innerHTML = glassIcon(set, name, { size: Number(el.dataset.g3dSize) || 56, seed: `${el.dataset.g3d}${used.length}`, label: el.dataset.g3dLabel || "" });
    el.dataset.g3dDone = "";
  }
}

/** A floating cluster of a set's icons (for a hero or a section head). */
export async function cluster(el, site, { count = 8, size = 64, words: w = "" } = {}) {
  const set = await loadSet(site), names = Object.keys(set);
  const start = hash(`${site}${w}`) % Math.max(1, names.length);
  const pick = Array.from({ length: Math.min(count, names.length) }, (_, i) => names[(start + i * 7) % names.length]);
  el.innerHTML = pick.map((n, i) => `<span class="g3d-slot" style="--i:${i}">${glassIcon(set, n, { size: size - (i % 3) * 10, seed: `${site}${n}` })}</span>`).join("");
}
