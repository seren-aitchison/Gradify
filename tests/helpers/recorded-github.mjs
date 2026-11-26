// Tests only: a recorded stand-in for scripts/content/github-review.mjs, with the same exports (TRUST, githubClient).
// It's swapped in at import time by the loader hook in recorded-github-hooks.mjs, which a test file registers by
// importing ./use-recorded-github.mjs before anything imports the evidence module. Production code never imports
// this directory, and scripts/content/ has no switch that loads it.
export const TRUST = { repo: null, prAuthor: null, reviewers: [] };
export const recorded = { pr: () => { throw new Error("no recorded PR"); }, reviews: () => [], file: () => null };
/** set the identities and recorded answers a test's GitHub gives */
export function useRecorded({ trust = null, ...answers } = {}) { if (trust) Object.assign(TRUST, trust); Object.assign(recorded, answers); }
export function githubClient() {
  // a recorded review may only ever serve a sandboxed run, so nothing it "verifies" can land in the real records
  if (!process.env.GRADIFY_OUT) throw new Error("the recorded GitHub serves sandboxed test runs only (GRADIFY_OUT)");
  return { repo: TRUST.repo, pr: (n) => recorded.pr(n), reviews: (n) => recorded.reviews(n), file: (p, ref) => recorded.file(p, ref) };
}
