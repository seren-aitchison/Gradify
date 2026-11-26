// The live GitHub side of evidence-review verification (scripts/content/evidence.mjs, reviewCheck), and nothing else.
//
// TRUST holds the identities a review is checked against: the repository, the GitHub App's bot that opens evidence-
// review PRs, and the allowlisted human reviewer(s), each pinned by numeric GitHub account id as well as login (a
// login can be renamed and then claimed by someone else; an id can't). They're read from the committed
// scripts/content/config.json only: never from GRADIFY_OUT, an environment variable or a command-line option, so
// changing who counts as a reviewer takes a reviewed commit. Being allowlisted here is a GitHub identity, never a
// scientific qualification: expert authority comes only from content/reviewers.json.
//
// githubClient talks to the GitHub REST API with curl. This module has no switch, override or test hook: tests replace
// the whole module at import time with a recorded stand-in (via a module loader hook that only
// test files register), so production code has nothing a flag, variable or option could turn into fake verification.
import { spawnSync } from "node:child_process";
import { CONFIG } from "./lib.mjs";

const cfg = CONFIG.evidence?.github || {};
export const TRUST = Object.freeze({
  repo: cfg.repo || null,
  prAuthor: cfg.prAuthor || null,
  reviewers: Object.freeze((cfg.reviewers || []).filter((r) => r && r.login && Number.isInteger(r.id)).map((r) => Object.freeze({ login: String(r.login), id: r.id }))),
});

/** a GitHub API client for TRUST.repo: { pr(n), reviews(n), file(path, ref) }. A read-only token (GITHUB_TOKEN or
 * GH_TOKEN) is passed to curl on stdin, never in arguments or logs; in a cloud session the network proxy can add the
 * credential instead. A token only authenticates the calls: it can't change what GitHub answers. Any failure throws,
 * and the check reports NOT RUN */
export function githubClient() {
  const repo = TRUST.repo, token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null;
  const call = (path, { raw = false } = {}) => {
    const args = ["-sS", "--max-time", "30", "-w", "\n%{http_code}", "-H", `Accept: application/vnd.github${raw ? ".raw" : ""}+json`, "-H", "X-GitHub-Api-Version: 2022-11-28", ...(token ? ["-H", "@-"] : []), `https://api.github.com/repos/${repo}/${path}`];
    const r = spawnSync("curl", args, { encoding: "utf8", input: token ? `Authorization: Bearer ${token}\n` : undefined, timeout: 45_000 });
    const body_ = String(r.stdout || ""), cut = body_.lastIndexOf("\n"), code = Number(body_.slice(cut + 1)), body = body_.slice(0, cut);
    if (r.status !== 0 || !code) throw new Error("the GitHub API couldn't be reached");
    if (code === 404 && raw) return null;
    if (code !== 200) throw new Error(`the GitHub API answered HTTP ${code}`);
    return raw ? body : JSON.parse(body);
  };
  return {
    repo,
    pr: (n) => call(`pulls/${n}`),
    reviews: (n) => { const all = []; for (let p = 1; p < 20; p++) { const page = call(`pulls/${n}/reviews?per_page=100&page=${p}`); all.push(...page); if (page.length < 100) break; } return all; },
    file: (path, ref) => call(`contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(ref)}`, { raw: true }),
  };
}
