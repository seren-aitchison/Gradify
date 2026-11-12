// Builds the public website from an allowlist, and refuses to publish if the result is wrong.
//   node scripts/build-site.mjs <out-dir>     copy the allowlisted files into <out-dir>, then verify it; exit 1 on any problem
//   node scripts/build-site.mjs --check       build into a temporary folder and verify it (CI, before deploying)
//   import { PUBLISH, EXCLUDE, classify, build, verify }   used by tests/deploy.test.mjs
//
// Only files committed to git are published, and only those the allowlist names. Everything else (documentation,
// operational scripts, database migrations, server functions, tests, package files) stays in the repository.
// Every top-level entry in the repository must be listed in PUBLISH or EXCLUDE, so a new folder is never
// published, or silently left out, without a decision.
import { execFileSync } from "node:child_process";
import { mkdir, copyFile, readFile, readdir, stat, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname, resolve, relative, sep, posix } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// what the website needs
export const PUBLISH = {
  files: [
    ".nojekyll", "CNAME", "404.html", "index.html", "app.html", "journey.html", "privacy.html", "terms.html", "pricing.html", "status.html", "ai-usage.html",
    "robots.txt", "sitemap.xml", "manifest.webmanifest", "sw.js", "gradify.config.js",
  ],
  // folders published whole, apart from EXCLUDE.inside. Sub-site folders (lawgradify/, medgradify/ …) are matched by
  // name and must each be registered in kit/core/site.js.
  folders: ["assets", "kit"],
  subsite: /^[a-z]+gradify$/,
};

// what stays in the repository, and why
export const EXCLUDE = {
  top: {
    ".github": "CI configuration",
    ".gitignore": "repository settings",
    ".mcp.json": "Claude Code MCP server settings",
    "README.md": "repository documentation",
    "docs": "internal documentation, plans and audit records",
    "scripts": "operational and deployment scripts",
    "supabase": "database migrations and server function source",
    "tests": "automated tests",
    "package.json": "development tooling",
    "package-lock.json": "development tooling",
  },
  // inside published folders: developer material nothing loads (a trailing / means the whole folder). The sub-site
  // templates are what scripts/new-site.mjs copies; published, they're broken pages. Licences and attributions stay.
  inside: ["kit/README.md", "kit/VERSION", "kit/templates/"],
};
const insideExcluded = (f) => EXCLUDE.inside.some((x) => (x.endsWith("/") ? f.startsWith(x) : f === x));

// patterns that must never appear in a published file (the repository-wide check is tests/secrets.test.mjs)
export const SECRET_PATTERNS = [
  ["Anthropic API key", /sk-ant-[A-Za-z0-9_-]{16,}/],
  ["Supabase secret key", /sb_secret_[A-Za-z0-9_-]{16,}/],
  ["Supabase personal access token", /\bsbp_[a-f0-9]{30,}\b/],
  ["private key", /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ["GitHub token", /\b(ghp|gho|ghs|ghu|github_pat)_[A-Za-z0-9_]{20,}/],
  ["service-role key assignment", /SERVICE_ROLE_KEY\s*[=:]\s*["'`]?[A-Za-z0-9_.-]{20,}/],
  ["database connection string with a password", /postgres(?:ql)?:\/\/[^\s'"`:@/]+:[^\s'"`@]+@/],
];
const BINARY = /\.(png|jpe?g|gif|webp|glb|gltf|bin|ico|woff2?|ttf|pdf|mp4|wasm)$/i;

export function tracked(root = REPO) {
  return execFileSync("git", ["ls-files", "-z"], { cwd: root, encoding: "utf8" }).split("\0").filter(Boolean);
}

// The files the site would be built from once the current work is committed: tracked files that still exist, plus new
// files git isn't told to ignore. The tests check this, so local changes are validated before anything is committed;
// publishing itself (the build above, run on a clean checkout) still takes committed files only.
export function workingTree(root = REPO) {
  const git = (...args) => execFileSync("git", ["ls-files", "-z", ...args], { cwd: root, encoding: "utf8" }).split("\0").filter(Boolean);
  const deleted = new Set(git("--deleted"));
  return [...new Set(git("--cached", "--others", "--exclude-standard"))].filter((f) => !deleted.has(f)).sort();
}

// every tracked file → publish, exclude, or unclassified (a new top-level entry nobody has decided about)
export function classify(files) {
  const publish = [], excluded = [], unclassified = new Set();
  for (const f of files) {
    const top = f.split("/")[0], isFolder = f.includes("/");
    if (EXCLUDE.top[top] !== undefined) excluded.push(f);
    else if (insideExcluded(f)) excluded.push(f);
    else if (!isFolder && PUBLISH.files.includes(f)) publish.push(f);
    else if (isFolder && (PUBLISH.folders.includes(top) || PUBLISH.subsite.test(top))) publish.push(f);
    else unclassified.add(top);
  }
  return { publish, excluded, unclassified: [...unclassified].sort() };
}

export async function build(out, { root = REPO, files = tracked(root) } = {}) {
  const { publish, unclassified } = classify(files);
  if (unclassified.length) throw new Error(`not in the allowlist or the exclusions: ${unclassified.join(", ")}. Add each to PUBLISH or EXCLUDE in scripts/build-site.mjs`);
  for (const f of publish) {
    await mkdir(dirname(join(out, f)), { recursive: true });
    await copyFile(join(root, f), join(out, f));
  }
  return publish;
}

async function walk(dir, base = dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(p, base)); else out.push(relative(base, p).split(sep).join("/"));
  }
  return out;
}

// local references a file makes: HTML attributes and inline modules, JS imports and new URL(…, import.meta.url),
// CSS url() and @import, manifest icons, and the service worker's offline list
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|#|\/\/|data:)/i;
export function references(file, text) {
  const refs = [];
  const add = (r) => { if (r && !EXTERNAL.test(r) && !/\$\{|\{\{|`/.test(r)) refs.push(r); };
  const all = (re) => { for (const m of text.matchAll(re)) add(m[1]); };
  const js = () => {
    all(/\b(?:import|export)\s[^;'"`]*?\sfrom\s*["']([^"']+)["']/g);
    all(/\bimport\s*["']([^"']+)["']/g);
    all(/\bimport\(\s*["']([^"']+)["']\s*\)/g);
    all(/new URL\(\s*["']([^"']+)["']\s*,\s*import\.meta\.url\s*\)/g);
  };
  if (/\.html$/.test(file)) { all(/\s(?:href|src)="([^"]+)"/g); all(/\s(?:href|src)='([^']+)'/g); js(); }
  else if (/\.m?js$/.test(file)) js();
  else if (/\.css$/.test(file)) { all(/url\(\s*["']?([^"')]+)["']?\s*\)/g); all(/@import\s+["']([^"']+)["']/g); }
  else if (/\.webmanifest$/.test(file)) { try { const m = JSON.parse(text); [m.start_url, ...(m.icons || []).map((i) => i.src)].forEach(add); } catch { /* not JSON: nothing to resolve */ } }
  if (file === "sw.js") { const shell = text.match(/const SHELL = \[([\s\S]*?)\];/); if (shell) for (const m of shell[1].matchAll(/"([^"]*)"/g)) add(m[1] || "./"); }
  return [...new Set(refs.map((r) => r.split(/[?#]/)[0]).filter(Boolean))];
}

// resolve a reference made by `from` (a path inside the site) to a site path, or null if it leaves the site
function target(from, ref) {
  const p = ref.startsWith("/") ? posix.normalize(ref.slice(1)) : posix.normalize(posix.join(posix.dirname(from), ref));
  return p.startsWith("..") ? null : p.replace(/^\.\/?/, "");
}
async function present(root, p) {
  const s = await stat(join(root, p)).catch(() => null);
  if (!s) return false;
  return s.isDirectory() ? Boolean(await stat(join(root, p, "index.html")).catch(() => null)) : true;
}

// Checks a built site. Problems are returned as plain sentences; an empty list means it may be published.
export async function verify(out, { root = REPO, files = tracked(root) } = {}) {
  const problems = [];
  const built = (await walk(out)).sort();
  const { publish } = classify(files);
  const expected = new Set(publish), have = new Set(built);

  // 1. nothing that isn't allowlisted, and nothing from an excluded place
  for (const f of built) {
    const top = f.split("/")[0];
    if (EXCLUDE.top[top] !== undefined || insideExcluded(f)) problems.push(`excluded file published: ${f} (${EXCLUDE.top[top] ?? "developer material"})`);
    else if (!expected.has(f)) problems.push(`not in the allowlist: ${f}`);
  }
  // 2. every allowlisted file is there
  for (const f of expected) if (!have.has(f)) problems.push(`missing: ${f}`);
  for (const f of ["index.html", "404.html", "CNAME", "sw.js", "app.html", "gradify.config.js"]) if (!have.has(f)) problems.push(`required file missing: ${f}`);

  // 3. every sub-site folder in the repository is published with its home page
  const folders = [...new Set(files.map((f) => f.split("/")[0]).filter((t) => PUBLISH.subsite.test(t) && files.some((f) => f.startsWith(`${t}/`))))];
  const { SITES, slugOf } = await import(new URL("../kit/core/site.js", import.meta.url));
  const registered = new Set(SITES.map(slugOf));
  for (const s of folders) {
    if (!registered.has(s)) problems.push(`${s}/ is not a registered Gradify site (kit/core/site.js), so it isn't published by name`);
    if (!have.has(`${s}/index.html`)) problems.push(`sub-site home missing: ${s}/index.html`);
  }

  // 4. every reference that resolves in the repository still resolves in the built site
  for (const f of built.filter((x) => /\.(html|m?js|css|webmanifest)$/.test(x))) {
    const text = await readFile(join(out, f), "utf8");
    for (const ref of references(f, text)) {
      const p = target(f, ref);
      if (p === null) continue;
      if (await present(root, p) && !await present(out, p)) problems.push(`${f} needs ${ref}, which is not published`);
    }
  }

  // 5. no credential in anything published
  for (const f of built.filter((x) => !BINARY.test(x))) {
    const text = await readFile(join(out, f), "utf8");
    for (const [name, re] of SECRET_PATTERNS) if (re.test(text)) problems.push(`${f}: looks like a ${name}`);
  }
  return { problems, files: built.length };
}

// ---------- command line ----------
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const arg = process.argv[2];
  if (!arg) { console.error("usage: node scripts/build-site.mjs <out-dir> | --check"); process.exit(2); }
  const out = arg === "--check" ? await mkdtemp(join(tmpdir(), "gradify-site-")) : resolve(arg);
  if (arg !== "--check" && (await readdir(out).catch(() => [])).length) { console.error(`${out} is not empty`); process.exit(2); }
  try {
    const n = (await build(out)).length;
    const { problems, files } = await verify(out);
    if (problems.length) {
      console.error(`The site build failed ${problems.length} check(s); nothing should be published:\n- ${problems.join("\n- ")}`);
      process.exitCode = 1;
    } else {
      const { excluded } = classify(tracked());
      console.log(`Site built: ${files} files (${n} allowlisted), ${excluded.length} repository files left out (${Object.keys(EXCLUDE.top).join(", ")}, ${EXCLUDE.inside.join(", ")}). All checks passed.`);
    }
  } finally {
    if (arg === "--check") await rm(out, { recursive: true, force: true });
  }
}
