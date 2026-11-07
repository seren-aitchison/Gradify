// Shared exercise and display helpers for the PsychGradify and SocGradify labs, built on kit/labs/lab.js. Everything is
// keyboard-operable (real buttons and selects, no drag needed) and announces feedback through polite live regions.
import { esc } from "../lab.js";
export { esc };

// a label saying what kind of data a lab shows: real (with source and date) or simulated (with how it was made)
export function dataLabel(host, { real, source, url, retrieved, how }) {
  const p = document.createElement("p"); p.className = `sx-data ${real ? "real" : "sim"}`;
  p.innerHTML = real ? `<b>Real data</b> ${url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(source)}</a>` : esc(source)}${retrieved ? `, retrieved ${esc(retrieved)}` : ""}.` : `<b>Simulated data</b> ${esc(how || "generated in your browser for teaching; not real observations.")}`;
  host.append(p); return p;
}

// a short standing note (e.g. "an educational demonstration, not a test")
export function caveat(host, html) { const p = document.createElement("p"); p.className = "sx-caveat"; p.setAttribute("role", "note"); p.innerHTML = html; host.append(p); return p; }

// cases: a sequence of scenarios, each with options that carry their own feedback.
// items: [{ id, title, text, q, options: [{ t, ok, why }] }]; each correct case is a challenge (+XP once)
export function cases(host, ctx, items, { title = "Cases", intro = "" } = {}) {
  const box = document.createElement("div"); box.className = "sx-cases"; host.append(box);
  ctx?.declare?.(items.map((x) => ({ id: x.id, text: (x.title || x.q).replace(/<[^>]+>/g, "") })));
  let i = 0; const done = new Set(items.filter((x) => ctx?.solved?.(x.id)).map((x) => x.id));
  const paint = (msg = "") => {
    const x = items[i];
    box.innerHTML = `<div class="sx-head"><b>${esc(title)}</b><span>${i + 1} of ${items.length} · ${done.size} solved</span></div>${intro && i === 0 ? `<p class="sx-intro">${intro}</p>` : ""}
      <article class="sx-case"><h4>${x.title || ""}</h4>${x.text ? `<div class="sx-text">${x.text}</div>` : ""}<p class="sx-q">${x.q}</p>
      <div class="sx-opts" role="group" aria-label="Answers">${x.options.map((o, j) => `<button type="button" data-j="${j}">${o.t}</button>`).join("")}</div>
      <p class="sx-fb" aria-live="polite">${msg}</p></article>
      <div class="sx-nav"><button type="button" class="lab-btn" data-prev ${i ? "" : "disabled"}>← Previous</button><button type="button" class="lab-btn pri" data-next ${i < items.length - 1 ? "" : "disabled"}>Next case →</button></div>`;
  };
  box.addEventListener("click", (e) => {
    if (e.target.closest("[data-prev]")) { i = Math.max(0, i - 1); paint(); return; }
    if (e.target.closest("[data-next]")) { i = Math.min(items.length - 1, i + 1); paint(); return; }
    const b = e.target.closest("button[data-j]"); if (!b) return;
    const x = items[i], o = x.options[Number(b.dataset.j)];
    box.querySelectorAll(".sx-opts button").forEach((q) => q.classList.remove("ok", "no")); b.classList.add(o.ok ? "ok" : "no");
    box.querySelector(".sx-fb").innerHTML = `<b>${o.ok ? "Yes." : "Not quite."}</b> ${o.why}`;
    box.querySelector(".sx-fb").className = `sx-fb ${o.ok ? "ok" : "no"}`;
    if (!o.ok && !done.has(x.id)) ctx?.fail?.(x.id, (x.title || x.q).replace(/<[^>]+>/g, "").slice(0, 60));
    if (o.ok && !done.has(x.id)) { done.add(x.id); ctx?.complete?.(x.id, (x.title || x.q).replace(/<[^>]+>/g, "").slice(0, 60)); box.querySelector(".sx-head span").textContent = `${i + 1} of ${items.length} · ${done.size} solved`; if (done.size === items.length) ctx?.onComplete?.({ score: 1 }); }
  });
  paint();
  return { go(n) { i = n; paint(); } };
}

// sorter: put each item into a category with a select, then check. { id, prompt, cats: [..], items: [{ t, cat, why? }] }
export function sorter(host, ctx, { id, prompt, cats, items, why = "" }) {
  const box = document.createElement("div"); box.className = "sx-sort"; host.append(box);
  ctx?.declare?.([{ id, text: prompt.replace(/<[^>]+>/g, "") }]);
  box.innerHTML = `<p class="sx-q">${prompt}</p><ol>${items.map((x, i) => `<li><span>${x.t}</span><label class="sr-only" for="${id}-${i}">Category</label><select id="${id}-${i}"><option value="">Choose…</option>${cats.map((c) => `<option>${esc(c)}</option>`).join("")}</select><small class="sx-why"></small></li>`).join("")}</ol>
    <button type="button" class="lab-btn pri">Check</button><p class="sx-fb" aria-live="polite"></p>`;
  box.querySelector("button").addEventListener("click", () => {
    let right = 0;
    box.querySelectorAll("li").forEach((li, i) => {
      const v = li.querySelector("select").value, ok = v === items[i].cat; right += ok;
      li.className = v ? (ok ? "ok" : "no") : ""; li.querySelector(".sx-why").innerHTML = v && !ok ? `${esc(items[i].cat)}${items[i].why ? `: ${items[i].why}` : ""}` : ok && items[i].why ? items[i].why : "";
    });
    const all = right === items.length, fb = box.querySelector(".sx-fb");
    fb.className = `sx-fb ${all ? "ok" : ""}`; fb.innerHTML = all ? `<b>All ${items.length} right.</b> ${why}` : `${right} of ${items.length} right. The corrections are shown under each one you missed.`;
    // a full set right is a success; a checked set with mistakes shows the corrections, so a later success is assisted
    if (all) ctx?.complete?.(id, prompt.replace(/<[^>]+>/g, "").slice(0, 60)); else ctx?.fail?.(id, prompt.replace(/<[^>]+>/g, "").slice(0, 60), { revealed: true });
  });
  return box;
}

// a simple accessible data table
export const table = (head, rows, cls = "") => `<table class="sx-tbl ${cls}"><thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => (i ? `<td>${c}</td>` : `<th scope="row">${c}</th>`)).join("")}</tr>`).join("")}</tbody></table>`;

// keep the learner's own experimental data on this device only (never sent anywhere)
export const local = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(`gradify-lab:${k}`)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(`gradify-lab:${k}`, JSON.stringify(v)); } catch { /* private mode */ } },
};
