// QA audit: a score out of 100 for every Gradify site, from evidence in the repository, with the rule behind
// every point written into the report. Weights from the platform brief: Functionality 20, Content 20,
// Learning experience 15, Engineering 15, Backend 10, Academic quality 10, Accessibility 10.
//   node scripts/qa-audit.mjs        write docs/QA-SCORES.md; exit 1 if any page has a broken internal link
//   import { audit, scoreSite, pageChecks }   used by tests/qa-audit.test.mjs
// It reads static files only. Things it can't see are scored as unproven, not assumed: whether the backend
// works in production (docs/BACKEND-STATUS.md, written by scripts/verify-backend.mjs), contrast, keyboard use,
// and anything a page builds with JavaScript.
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { inventory } from "./audit-sites.mjs";
import { SITES, slugOf } from "../kit/core/site.js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../gradify.config.js";

const root = new URL("../", import.meta.url);
const exists = (p) => stat(new URL(p, root)).then((s) => s, () => null);

export const WEIGHTS = { functionality: 20, content: 20, learning: 15, engineering: 15, backend: 10, academic: 10, accessibility: 10 };
export const RULES = {
  functionality: "Homepage built (4) · every internal link on its pages resolves (6, less a share for each broken one) · a course or dedicated subject tool (6) · the shared notes tools (4)",
  content: "Written lessons, up to 300 (12) · share of the course's lessons written (8) · a subject tool without a course counts 6",
  learning: "The course engine's learning tools: paths, review, mastery, revisit, plan and AI tutor (5) · interactives, up to 15 (5) · cumulative exams, up to 3 (3) · a dedicated subject tool (2)",
  engineering: "Automated tests that cover its course or tool (4) · title, description, viewport and language on every page (4, by share) · no broken internal links (3) · homepage HTML under 150 KB (2) · built on the shared Gradify Kit (2)",
  backend: "Shared by every site: backend code in the repository (2) · project configured in gradify.config.js (3) · accounts verified working in production (3) · AI verified working in production (2), both from the last scripts/verify-backend.mjs run",
  academic: "For each school: reviewed (4) · sources checked (3) · expert sign-off (3), by share of schools. No course means nothing to review: 0",
  accessibility: "Static, on every page by share: a language set (1) · zoom not disabled (2) · a title (1) · every static image has alt text (1) · every static button has a name (1). In a real browser (scripts/check-a11y.cjs, homepage and course page): text meeting WCAG AA contrast (2) and focus stops with a visible indicator (2), by share. Not run means 0 for those 4",
};

// ---------- static page checks ----------
const SKIP = /^(?:[a-z][a-z0-9+.-]*:|#|\/\/|\$\{|\{\{)/i;
export function pageChecks(html, file) {
  const attr = (re) => [...html.matchAll(re)].map((m) => m[1]);
  const refs = [...attr(/\s(?:href|src)="([^"]+)"/g), ...attr(/\s(?:href|src)='([^']+)'/g)].filter((h) => !SKIP.test(h) && !h.includes("${"));
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const buttons = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)];
  const viewport = (html.match(/<meta[^>]+name="viewport"[^>]*>/i) || [""])[0];
  return {
    file,
    lang: /<html[^>]*\blang="[a-z]{2}/i.test(html),
    title: /<title>[^<]{2,}<\/title>/i.test(html),
    description: /<meta[^>]+name="description"[^>]+content="[^"]{20,}"/i.test(html),
    viewport: Boolean(viewport),
    zoom: !/user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?\b/i.test(viewport),
    imgAlt: imgs.every((i) => /\balt="/i.test(i)),
    buttonNames: buttons.every(([, a, inner]) => /aria-label(ledby)?="[^"]+"|title="[^"]+"/.test(a) || inner.replace(/<[^>]+>/g, "").trim() || /aria-label="[^"]+"/.test(inner)),
    refs,
    bytes: Buffer.byteLength(html),
  };
}

async function resolveRef(fromFile, ref) {
  const clean = ref.split(/[?#]/)[0];
  if (!clean) return true;
  const u = clean.startsWith("/") ? new URL(`.${clean}`, root) : new URL(clean, new URL(fromFile, root));
  const s = await stat(u).catch(() => null);
  if (s?.isDirectory()) return Boolean(await stat(new URL("index.html", u.href.endsWith("/") ? u : `${u.href}/`)).catch(() => null));
  return Boolean(s);
}

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(new URL(dir, root), { withFileTypes: true }).catch(() => [])) {
    if (e.isDirectory()) out.push(...(await htmlFiles(`${dir}${e.name}/`)));
    else if (e.name.endsWith(".html")) out.push(`${dir}${e.name}`);
  }
  return out;
}

async function checkPages(files) {
  const pages = [];
  for (const f of files) {
    const p = pageChecks(await readFile(new URL(f, root), "utf8"), f);
    p.broken = [];
    for (const r of [...new Set(p.refs)]) if (!(await resolveRef(f, r))) p.broken.push(r);
    pages.push(p);
  }
  return pages;
}

// ---------- backend evidence (shared by every site) ----------
async function backendEvidence() {
  const doc = await readFile(new URL("docs/BACKEND-STATUS.md", root), "utf8").catch(() => "");
  const block = (doc.match(/<!-- verify:start -->([\s\S]*?)<!-- verify:end -->/) || [, ""])[1];
  const stage = (n) => new RegExp(`\\|\\s*${n}\\s*\\|[^|]*\\|\\s*\\*\\*working\\*\\*`).test(block);
  const code = Boolean(await exists("supabase/functions/study-pack/index.ts")) && Boolean(await exists("kit/data/store.js"));
  return { code, configured: Boolean(SUPABASE_URL && SUPABASE_ANON_KEY), accounts: stage(4), ai: stage(5), lastRun: (block.match(/Last run: ([0-9-]+)/) || [])[1] || null };
}

// ---------- scoring ----------
const share = (xs, f) => (xs.length ? xs.filter(f).length / xs.length : 0);
const r1 = (x) => Math.round(x * 10) / 10;

/** @param row inventory row; @param x { pages, courses, backend, tested, browser: results from check-a11y for this site } */
export function scoreSite(row, { pages = [], courses = [], backend, tested = false, browser = null }) {
  const s = {}, why = {};
  const linkTotal = pages.reduce((a, p) => a + new Set(p.refs).size, 0), broken = pages.reduce((a, p) => a + p.broken.length, 0);
  const linkScore = linkTotal ? Math.max(0, 1 - (broken / linkTotal) * 10) : broken ? 0 : 1; // each broken link costs a tenth of its share
  const course = row.courses.length > 0, tool = row.tools.length > 0;
  if (!row.built) {
    for (const k of Object.keys(WEIGHTS)) s[k] = 0;
    s.backend = (backend.code ? 2 : 0) + (backend.configured ? 3 : 0) + (backend.accounts ? 3 : 0) + (backend.ai ? 2 : 0);
    return { scores: s, total: s.backend, broken, why: { functionality: "No page of its own on getgradify.com" } };
  }
  s.functionality = 4 + 6 * linkScore + (course || tool ? 6 : 0) + (row.notesTools ? 4 : 0);
  s.content = course ? 12 * Math.min(1, row.written / 300) + 8 * row.coverage : tool ? 6 : 0;
  s.learning = course ? 5 + 5 * Math.min(1, row.interactives / 15) + 3 * Math.min(1, row.exams / 3) + (tool ? 2 : 0) : tool ? 2 : 0;
  s.engineering = (tested ? 4 : 0) + 4 * share(pages, (p) => p.title && p.description && p.viewport && p.lang) + (broken ? 0 : 3) + ((pages.find((p) => p.file.endsWith(`${slugOf({ n: row.name })}/index.html`))?.bytes ?? 0) < 150_000 ? 2 : 0) + 2;
  s.backend = (backend.code ? 2 : 0) + (backend.configured ? 3 : 0) + (backend.accounts ? 3 : 0) + (backend.ai ? 2 : 0);
  const schools = row.schools, sourced = courses.reduce((a, c) => a + c.sourced, 0);
  s.academic = schools ? 4 * (row.reviewed / schools) + 3 * (sourced / schools) + 3 * (row.signedOff / schools) : 0;
  const b = (browser || []).filter((r) => r.contrast), sum = (f) => b.reduce((a, r) => a + f(r), 0);
  const contrast = sum((r) => r.contrast.checked) ? sum((r) => r.contrast.pass) / sum((r) => r.contrast.checked) : 0;
  const focus = sum((r) => r.focus.stops) ? sum((r) => r.focus.visible) / sum((r) => r.focus.stops) : 0;
  s.accessibility = share(pages, (p) => p.lang) + 2 * share(pages, (p) => p.zoom) + share(pages, (p) => p.title) + share(pages, (p) => p.imgAlt) + share(pages, (p) => p.buttonNames) + 2 * contrast + 2 * focus;
  if (!b.length) why.accessibility = "Browser checks (contrast, focus) not run";
  for (const k of Object.keys(s)) s[k] = r1(Math.min(WEIGHTS[k], s[k]));
  if (!course) why.content = tool ? "A subject tool but no course" : "No course yet: coming soon";
  if (broken) why.functionality = `${broken} broken internal link${broken === 1 ? "" : "s"}`;
  return { scores: s, total: r1(Object.values(s).reduce((a, b) => a + b, 0)), broken, why };
}

// the biggest gaps, in points, with what would close them
export function gaps(scores) {
  return Object.entries(WEIGHTS).map(([k, w]) => [k, r1(w - scores[k])]).filter(([, g]) => g >= 1).sort((a, b) => b[1] - a[1]);
}

export async function audit() {
  const { rows, courses } = await inventory(), backend = await backendEvidence();
  const a11y = JSON.parse(await readFile(new URL("docs/qa/a11y-browser.json", root), "utf8").catch(() => "null"));
  const tests = (await Promise.all((await readdir(new URL("tests/", root))).filter((f) => f.endsWith(".mjs")).map((f) => readFile(new URL(`tests/${f}`, root), "utf8")))).join("\n");
  const rootPages = [];
  for (const f of ["index.html", "app.html", "status.html", "404.html", "privacy.html"]) if (await exists(f)) rootPages.push(...(await checkPages([f])));
  const sites = [];
  for (const row of rows) {
    const slug = slugOf(SITES.find((s) => s.n === row.name)), cs = courses.filter((c) => c.site === row.name);
    const pages = row.built ? await checkPages(await htmlFiles(`${slug}/`)) : [];
    const tested = cs.some((c) => new RegExp(`["'/]${c.slug}["'/]`).test(tests)) || row.tools.some((t) => tests.includes(t));
    sites.push({ ...row, slug, pages, ...scoreSite(row, { pages, courses: cs, backend, tested, browser: a11y?.results?.[row.name] }) });
  }
  return { sites, rootPages, backend, a11yDate: a11y?.date || null };
}

const LABEL = { functionality: "Functionality", content: "Content", learning: "Learning experience", engineering: "Engineering", backend: "Backend", academic: "Academic quality", accessibility: "Accessibility" };
async function write() {
  const { sites, rootPages, backend, a11yDate } = await audit();
  const today = new Date().toISOString().slice(0, 10);
  const live = sites.filter((s) => ["live", "beta"].includes(s.status));
  const mean = (xs) => (xs.length ? r1(xs.reduce((a, s) => a + s.total, 0) / xs.length) : 0);
  const broken = [...sites.flatMap((s) => s.pages), ...rootPages].filter((p) => p.broken.length);
  const md = `# Gradify QA scores

Generated by \`node scripts/qa-audit.mjs\` on ${today}. Don't edit by hand: rerun it.

**Live and beta sites average ${mean(live)}/100** (${live.length} sites). All ${sites.length} sites average ${mean(sites)}/100.

These scores are evidence-based proxies, not judgements:
- Every point comes from a rule in the table below, checked against the repository.
- What the repository can't show is scored as unproven, not assumed: whether the backend works in production, contrast, keyboard use, and anything built with JavaScript.
- A site's release status comes from \`scripts/audit-sites.mjs\`, not from this score.
- Browser accessibility checks (\`scripts/check-a11y.cjs\`): ${a11yDate ? `last run ${a11yDate}` : "**not run yet**, so 4 accessibility points are 0 everywhere"}.

## Shared backend: ${sites[0]?.scores.backend ?? 0}/10 for every site

| Evidence | State |
|---|---|
| Backend code in the repository | ${backend.code ? "Yes" : "No"} |
| Project configured in gradify.config.js | ${backend.configured ? "Yes" : "**No**"} |
| Accounts verified working in production | ${backend.accounts ? "Yes" : "**Not yet**"}${backend.lastRun ? ` (last check ${backend.lastRun})` : ""} |
| AI verified working in production | ${backend.ai ? "Yes" : "**Not yet**"} |

## Sites

| Site | Status | Total | ${Object.values(LABEL).join(" | ")} | Biggest gaps |
|---|---|---|${Object.keys(LABEL).map(() => "---").join("|")}|---|
${[...sites].sort((a, b) => b.total - a.total).map((s) => `| ${s.name} | ${s.status} | **${s.total}** | ${Object.keys(LABEL).map((k) => `${s.scores[k]}/${WEIGHTS[k]}`).join(" | ")} | ${gaps(s.scores).slice(0, 3).map(([k, g]) => `${LABEL[k].toLowerCase()} −${g}`).join(", ")}${s.why.content ? ` (${s.why.content.toLowerCase()})` : ""} |`).join("\n")}

## Rules

| Area | Points | How they're earned |
|---|---|---|
${Object.keys(LABEL).map((k) => `| ${LABEL[k]} | ${WEIGHTS[k]} | ${RULES[k]} |`).join("\n")}

## Broken internal links

${broken.length ? broken.map((p) => `- \`${p.file}\`: ${p.broken.map((b) => `\`${b}\``).join(", ")}`).join("\n") : "None found in static HTML. Links that pages build with JavaScript aren't checked here; `scripts/check-pages` and the tests cover the main ones."}
`;
  await writeFile(new URL("docs/QA-SCORES.md", root), md);
  console.log(`Live and beta sites average ${mean(live)}/100; all sites ${mean(sites)}/100. ${broken.length} pages with broken links.`);
  for (const p of broken) console.log("  ", p.file, p.broken.join(", "));
  if (broken.length) process.exitCode = 1;
}
if (import.meta.url === `file://${process.argv[1]}`) await write();
