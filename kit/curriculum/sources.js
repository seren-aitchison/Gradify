// The source allowlist: every publication a research brief may cite, one row each, with the licence evidence it was
// checked against (knowledge-engine/CORE/RULES.md, rule 6). A brief citing anything not listed here is refused
// (scripts/content/loop.mjs, checkBrief), and each source's licence class in a brief comes from its row here, never
// from the Researcher's own label.
//
//   use        what the licence permits Gradify to do: "adapt" (reuse and adapt the wording commercially, with
//              attribution), "facts-only" (read it to check facts and write everything in Gradify's own words) or
//              "none" (don't use it at all)
//   commercial whether the licence allows commercial use
//   text / figures   whether the text, and separately the figures, may be reused (figures often carry other terms)
//   licence    { name, url, text, checkedOn }: the licence as the publisher states it, quoted from its own page
//   confirmedBy / confirmedOn   the person who checked the licence and agreed the row. Until then a row's effective
//              use is at most "facts-only": nothing gets "adapt" without a named person's confirmation.
//   urls       the publication's URL prefixes. A cited URL matches a prefix exactly or continues it with / ? or #, so
//              ".../books/biology" never matches ".../books/biology-2e".
//
// Listing a source is not a claim that it's correct: briefs still need three independent sources and two per
// non-trivial fact. Rows are added and confirmed by PR, so merging is the owner's approval of the row.

export const USES = ["adapt", "facts-only", "none"];

const openstax = (slug, title, cc, o = {}) => ({
  id: `openstax-${slug}`, title: `OpenStax ${title}`, owner: "OpenStax, Rice University", urls: [`https://openstax.org/books/${slug}`, `https://openstax.org/details/books/${slug}`],
  ...(cc === "by"
    ? { use: "adapt", commercial: true, text: true, figures: false, licence: { name: "Creative Commons Attribution 4.0 (CC BY 4.0)", url: "https://creativecommons.org/licenses/by/4.0/", text: "Licence as listed for this book in OpenStax's catalogue: \"Creative Commons Attribution License\". Some images in OpenStax books carry their own terms, so figures are not assumed reusable.", checkedOn: "2026-11-25" } }
    : { use: "facts-only", commercial: false, text: false, figures: false, licence: { name: "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0)", url: "https://creativecommons.org/licenses/by-nc-sa/4.0/", text: "Licence as listed for this book in OpenStax's catalogue: \"Creative Commons Attribution-NonCommercial-ShareAlike License\". Non-commercial only, so Gradify may only check facts against it.", checkedOn: "2026-11-25" } }),
  confirmedBy: null, confirmedOn: null, evidence: `https://openstax.org/apps/cms/api/v2/pages/?type=books.Book&slug=${slug}&fields=title,license_name,license_url`, ...o,
});

export const SOURCES = [
  // OpenStax: the live second editions are CC BY-NC-SA; the retired first editions are CC BY 4.0
  openstax("biology-2e", "Biology 2e", "by-nc-sa"),
  openstax("concepts-biology", "Concepts of Biology", "by-nc-sa"),
  openstax("microbiology", "Microbiology", "by-nc-sa"),
  openstax("biology", "Biology (1st edition, retired)", "by", { note: "Retired by OpenStax in favour of Biology 2e, so some content may be out of date: check facts against a current source too." }),
  openstax("chemistry-2e", "Chemistry 2e", "by-nc-sa"),
  openstax("chemistry", "Chemistry (1st edition, retired)", "by", { note: "Retired by OpenStax in favour of Chemistry 2e: check facts against a current source too." }),
  {
    id: "ncbi-bookshelf", title: "NCBI Bookshelf", owner: "National Library of Medicine (NCBI)", urls: ["https://www.ncbi.nlm.nih.gov/books"],
    use: "facts-only", commercial: false, text: false, figures: false,
    licence: { name: "Varies by publication", url: "https://www.ncbi.nlm.nih.gov/books/about/copyright/", text: null, checkedOn: null },
    confirmedBy: null, confirmedOn: null,
    note: "Each book on Bookshelf has its own copyright and licence. The copyright page could not be read from the engine's environment (it returns a reCAPTCHA to automated requests), so this row stays facts-only until a person checks it. Promote a single book to its own row only after checking that book's licence.",
  },
  {
    id: "bbc-bitesize", title: "BBC Bitesize", owner: "BBC", urls: ["https://www.bbc.co.uk/bitesize"],
    use: "facts-only", commercial: false, text: false, figures: false,
    licence: { name: "BBC terms of use (all rights reserved)", url: "https://www.bbc.co.uk/usingthebbc/terms/can-i-share-things-from-the-bbc/", text: "\"You'll need to get our permission first for any business use\" (BBC, Can I share things from the BBC?).", checkedOn: "2026-11-25" },
    confirmedBy: null, confirmedOn: null, note: "Use only to check facts and how a topic is framed at a level; never copy or adapt its wording or figures.",
  },
  {
    id: "aqa-specifications", title: "AQA specifications and published assessment materials", owner: "AQA", urls: ["https://www.aqa.org.uk", "https://filestore.aqa.org.uk"],
    use: "facts-only", commercial: false, text: false, figures: false,
    licence: { name: "AQA copyright (all rights reserved)", url: "https://filestore.aqa.org.uk/resources/biology/specifications/AQA-8461-SP-2016.PDF", text: "\"AQA retains the copyright on all its publications, including the specifications. However, schools and colleges registered with AQA are permitted to copy material from this specification for their own internal use.\" (AQA GCSE Biology 8461 specification, version 1.0)", checkedOn: "2026-11-25" },
    confirmedBy: null, confirmedOn: null, note: "Proves what is required, not that an explanation is correct. Never copy its wording (the spec gate checks 8-word runs).",
  },
];

const DATE = /^\d{4}-\d{2}-\d{2}$/;
/** problems with the allowlist (tests, and the queue before any research) */
export function checkSources(rows = SOURCES) {
  const p = [], ids = new Set(), prefixes = new Map();
  for (const s of rows) {
    const at = s.id || "(no id)";
    if (!s.id || ids.has(s.id)) p.push(`${at}: needs a unique id`); ids.add(s.id);
    for (const k of ["title", "owner"]) if (!s[k]) p.push(`${at}: needs ${k}`);
    if (!USES.includes(s.use)) p.push(`${at}: use must be one of ${USES.join(", ")}`);
    for (const k of ["commercial", "text", "figures"]) if (typeof s[k] !== "boolean") p.push(`${at}: ${k} must be true or false`);
    if (s.use === "adapt" && !(s.commercial && s.text)) p.push(`${at}: adapt needs a licence that allows commercial reuse of the text`);
    if (!/^https:\/\//.test(s.licence?.url || "") || !s.licence?.name) p.push(`${at}: licence needs a name and an https url`);
    if (s.use !== "none" && s.licence?.text && !DATE.test(s.licence.checkedOn || "")) p.push(`${at}: quoted licence text needs the date it was checked`);
    if (s.use === "adapt" && !s.licence?.text) p.push(`${at}: adapt needs the licence text quoted from the publisher`);
    if ((s.confirmedBy || s.confirmedOn) && !(String(s.confirmedBy || "").trim().length >= 3 && DATE.test(s.confirmedOn || ""))) p.push(`${at}: a confirmation needs the person's name (confirmedBy) and the date (confirmedOn)`);
    if (!s.urls?.length) p.push(`${at}: needs at least one url prefix`);
    for (const u of s.urls || []) { const n = norm(u); if (!/^https:\/\//.test(u)) p.push(`${at}: url ${u} must be https`); if (prefixes.has(n)) p.push(`${at}: url ${u} is also listed by ${prefixes.get(n)}`); prefixes.set(n, s.id); }
  }
  return p;
}
const norm = (u) => String(u || "").trim().replace(/^http:\/\//i, "https://").replace(/^(https:\/\/[^/]+)/i, (h) => h.toLowerCase()).replace(/[/]+$/, "");
/** the allowlist row a cited URL belongs to (the longest matching prefix), or null */
export function sourceFor(url, rows = SOURCES) {
  const u = norm(url); let best = null, len = -1;
  for (const s of rows) for (const p of s.urls || []) { const n = norm(p); if ((u === n || (u.startsWith(n) && "/?#".includes(u[n.length]))) && n.length > len) { best = s; len = n.length; } }
  return best;
}
export const confirmed = (s) => !!(s?.confirmedBy && DATE.test(s.confirmedOn || ""));
/** the licence class a brief may use for this source: "adapt" only once a person confirmed it; null = not usable */
export function classOf(s) {
  if (!s || s.use === "none") return null;
  return s.use === "adapt" && confirmed(s) ? "adapt" : "facts";
}
