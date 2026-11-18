// The homepage's "What's inside" numbers, kept true: read from kit/api/v1/stats.json, which scripts/build-api.mjs counts
// from the courses themselves (the page carries the same numbers, so it reads correctly with no script). Learners'
// quotes appear only once they've agreed to share them: assets/quotes.json, each with the learner's consent recorded
// (docs/PROOF.md). There are none yet, so the quotes block stays hidden.
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

fetch("kit/api/v1/stats.json").then((r) => (r.ok ? r.json() : null)).then((stats) => {
  if (!stats) return;
  document.querySelectorAll("[data-stat]").forEach((el) => {
    const n = stats[el.dataset.stat];
    if (Number.isFinite(n)) el.textContent = n.toLocaleString("en-GB");
  });
}).catch(() => {});

fetch("assets/quotes.json").then((r) => (r.ok ? r.json() : [])).then((quotes) => {
  const box = document.querySelector(".proof-quotes");
  // only quotes a learner agreed to share, with who they are as they asked to be named
  const ok = (Array.isArray(quotes) ? quotes : []).filter((q) => q?.quote && q?.name && q?.consent === true);
  if (!box || !ok.length) return;
  box.innerHTML = ok.slice(0, 3).map((q) => `<figure class="proof-quote glass"><blockquote>${esc(q.quote)}</blockquote><figcaption>${esc(q.name)}${q.studying ? `, ${esc(q.studying)}` : ""}</figcaption></figure>`).join("");
  box.hidden = false;
}).catch(() => {});
