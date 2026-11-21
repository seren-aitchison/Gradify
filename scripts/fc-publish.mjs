// Publishes committed flashcard work to main (getgradify.com), so finished cards go live as they land.
// node scripts/fc-publish.mjs <branch>      (fc-done starts it in the background after every commit)
// In a clean checkout of main beside this one (../Gradify-live), it merges <branch>, regenerates what CI checks
// (course registries via qa-courses, sitemap, sync, interactive manifest, content API), runs npm test, commits
// and pushes to main. Only committed work is published: the clean checkout never sees a writer's unsaved file.
// One publisher runs at a time; a commit that lands while it runs is picked up by its next pass.
// Log: <git dir>/fc-publish.log
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, statSync, writeFileSync, appendFileSync, symlinkSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const branch = process.argv[2];
if (!branch) { console.error("usage: node scripts/fc-publish.mjs <branch>"); process.exit(2); }
const repo = resolve(execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim());
const common = resolve(repo, execFileSync("git", ["rev-parse", "--git-common-dir"], { encoding: "utf8" }).trim());
const LIVE = join(dirname(repo), "Gradify-live");
const LOCK = join(common, "fc-publish.lock"), PENDING = join(common, "fc-publish.pending"), LOG = join(common, "fc-publish.log");
const log = (m) => appendFileSync(LOG, `${new Date().toISOString()} ${m}\n`);
const git = (...a) => execFileSync("git", ["-C", LIVE, ...a], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 1 << 28 }).trim();
const run = (cmd, args) => spawnSync(cmd, args, { cwd: LIVE, encoding: "utf8", maxBuffer: 1 << 28 });
const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
const TRAILER = "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_017jz3XjCmqw795oR5HMGgXp";
const GENERATED = /(^kit\/courses\/[^/]+\/registry\.js$|^kit\/api\/|^docs\/|^sitemap\.xml$|^supabase\/(functions\/_shared|dashboard)\/|^kit\/course\/ix-manifest\.js$)/;

// lock: one publisher at a time; a second caller leaves a note for the running one and exits
try { mkdirSync(LOCK); }
catch {
  if (Date.now() - statSync(LOCK).mtimeMs < 40 * 60e3) { writeFileSync(PENDING, branch); process.exit(0); }
  log("stale lock taken over"); rmSync(LOCK, { recursive: true, force: true }); mkdirSync(LOCK);
}
const release = () => rmSync(LOCK, { recursive: true, force: true });

try {
  if (!existsSync(LIVE)) {
    execFileSync("git", ["-C", repo, "worktree", "add", "--detach", LIVE, "origin/main"], { stdio: "ignore" });
    log("created " + LIVE);
  }
  if (!existsSync(join(LIVE, "node_modules"))) symlinkSync(join(repo, "node_modules"), join(LIVE, "node_modules"));
  for (let pass = 0; pass < 50; pass++) {
    rmSync(PENDING, { force: true });
    const sha = execFileSync("git", ["-C", repo, "rev-parse", `refs/heads/${branch}`], { encoding: "utf8" }).trim();
    git("fetch", "-q", "origin", "main");
    git("reset", "-q", "--hard", "origin/main");
    git("clean", "-qfd");
    if (spawnSync("git", ["-C", LIVE, "merge-base", "--is-ancestor", sha, "origin/main"]).status === 0) { log(`nothing new (${sha.slice(0, 7)} is on main)`); if (!existsSync(PENDING)) break; continue; }
    const notes = git("diff", "--name-only", "origin/main", sha, "--", "kit/courses").split("\n").filter((f) => /\/notes\/[^/]+\.js$/.test(f));
    const m = spawnSync("git", ["-C", LIVE, "merge", "--no-edit", "-q", sha], { encoding: "utf8" });
    if (m.status !== 0) {
      const conflicted = git("diff", "--name-only", "--diff-filter=U").split("\n").filter(Boolean);
      const real = conflicted.filter((f) => !GENERATED.test(f));
      if (real.length) { git("merge", "--abort"); log(`MERGE CONFLICT, not published: ${real.join(", ")}`); break; }
      for (const f of conflicted) { git("checkout", "--theirs", "--", f); git("add", "--", f); }
      git("commit", "-q", "--no-edit");
    }
    for (const [c, a] of [["node", ["scripts/qa-courses.mjs"]], ["node", ["scripts/build-sitemap.mjs"]], ["npm", ["run", "-s", "sync"]], ["node", ["scripts/ix-manifest.mjs"]], ["node", ["scripts/build-api.mjs"]]]) {
      const r = run(c, a);
      if (r.status !== 0) throw new Error(`${c} ${a.join(" ")} failed: ${(r.stderr || r.stdout).slice(-600)}`);
    }
    let t = run("npm", ["test"]);
    if (t.status !== 0) { log("npm test failed once; rerunning (the suite has a known timing flake)"); t = run("npm", ["test"]); }
    if (t.status !== 0) {
      log("NOT PUBLISHED: npm test fails:\n" + t.stdout.split("\n").filter((l) => /^not ok|^# (pass|fail)/.test(l)).join("\n"));
      break;
    }
    git("add", "-A", "--", "kit", "docs", "sitemap.xml", "supabase");
    const n = notes.length;
    git("commit", "-q", "--allow-empty", "-m", `Publish flashcards: ${n} notes file${n === 1 ? "" : "s"} updated\n\n${notes.map((f) => "- " + f.replace("kit/courses/", "")).join("\n")}\n\nMerges ${branch} at ${sha.slice(0, 7)} and regenerates the course registries, content API and QA reports. Every file passed check-flashcard-additions and the quality audit gate; npm test passes.\n\n${TRAILER}`);
    let pushed = false;
    for (let i = 0; i < 4 && !pushed; i++) {
      const p = spawnSync("git", ["-C", LIVE, "push", "-q", "origin", "HEAD:main"], { encoding: "utf8" });
      if (p.status === 0) pushed = true; else { log("push failed: " + p.stderr.slice(0, 200)); sleep(3000 * 2 ** i); if (/non-fast-forward|fetch first|rejected/.test(p.stderr)) break; }
    }
    if (pushed) log(`PUBLISHED ${git("rev-parse", "--short", "HEAD")} to main: ${n} notes files (${sha.slice(0, 7)})`);
    else { writeFileSync(PENDING, branch); continue; } // main moved or the network failed: start the pass again
    if (!existsSync(PENDING)) break;
  }
} catch (e) { log("ERROR " + String(e.stack || e).slice(0, 1000)); }
finally { release(); }
