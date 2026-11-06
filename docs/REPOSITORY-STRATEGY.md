# Repository ownership and private-repository strategy

**Version 1, 6 November 2026.** Step 2 of the owner's sequence, after the deployment exposure fix (R2). It
details decision D1 in [COMMERCIAL-PLATFORM-PLAN.md](COMMERCIAL-PLATFORM-PLAN.md) and replaces §1A's options
where they differ.

**Status: deferred by the owner on 6 November 2026, to be revisited in about two weeks.** For now: no GitHub restructuring, no security spending and no corporate administration. The student journey comes first ([PRODUCTION-READINESS.md](PRODUCTION-READINESS.md)). Nothing below is in progress.

This is a strategy and a runbook. **Nothing in it has been done.** Creating an organisation, transferring the
repository, changing its visibility and changing billing are the owner's actions, taken in GitHub's own
settings. This session's GitHub access is limited to the repository's contents, so it can't change any of
them. Each phase starts only on the owner's explicit approval.

**Labels:**
- **Verified:** read in GitHub's documentation on 6 November 2026; the page is named.
- **Measured:** taken from this repository or its CI runs.
- **Unverified:** couldn't be checked from here.

## 1. Recommendation

Move the repository into a **GitHub organisation that the company owns, on the GitHub Team plan**, and then
make it **private**. Do it in stages, with the site checked live after each one:

1. Prepare the domain.
2. Create the organisation.
3. Transfer the repository while it's still public.
4. Reconnect Claude and CI.
5. Make CI cheaper to run in private.
6. Upgrade to Team.
7. Make it private.

The website stays public and stays on GitHub Pages throughout. Making the repository private hides the
repository (code, history, commit messages, unpublished drafts), not the website. R2 already removed
everything that shouldn't be on the website.

The plan cost is small: GitHub Team is about $4 per user per month (unverified). **The cost to watch is CI.**
Private repositories pay for Actions minutes, and the current workflow would use roughly $30 a month more than
Team includes, unless the deploy job moves to GitHub's cheaper single-CPU runner (§5).

## 2. Current state

| Fact | Value | Source |
|---|---|---|
| Owner | `seren-aitchison`, a personal account (type User) | Measured (GitHub API) |
| Visibility | Public, since 28 October 2026 | Measured |
| Forks, stars, watchers | 0, 0, 0 | Measured. Going private now leaves **no public forks** behind |
| Licence | None. The default is "all rights reserved"; GitHub's terms still let anyone view and fork a public repository on GitHub | Measured; the terms are from GitHub's documentation |
| Secret scanning, push protection | Enabled (they're free on public repositories) | Measured |
| Branch protection on `main` | None | Measured |
| Branches | `main`, `claude/lawgradify-nursegradify`, `feat/psych-soc-gradify` | Measured |
| Pages | Deployed by the "Test and deploy" workflow; custom domain getgradify.com; DNS on Cloudflare (four `A` records at the apex; `www` is a `CNAME` to `seren-aitchison.github.io`) | Measured (README.md, deployments) |
| Is getgradify.com *verified* for Pages on the personal account? | **Unknown.** DNS lookups don't work from this environment | Owner to check: GitHub → Settings → Pages |
| Code that depends on the owner's name | One line: the `www` DNS note in README.md. No site code or script uses it | Measured |
| How often CI runs | About 60 runs in the last day, from several Claude sessions; 52 of the last 54 commits to `main` changed the published site | Measured |
| Time per run | Tests about 1 minute. Deploy 4–7 minutes, nearly all of it `deploy-pages` waiting for GitHub to publish (211 s and 397 s in the two runs measured) | Measured |
| How many times the public repository has been cloned | **Unknown.** Insights → Traffic shows the last 14 days to the owner | Owner to check |
| Organisation names (`gradify`, `getgradify`, `gradify-ltd`) | **Unknown.** This session can't look up GitHub accounts | Owner to check on github.com |

## 3. What GitHub's documentation says (verified)

From the pages *GitHub's plans*, *Setting repository visibility*, *Transferring a repository*, *Verifying your
custom domain for GitHub Pages*, *GitHub Actions billing* and *GitHub-hosted runners*:

- **Pages from a private repository needs a paid plan.** GitHub Free includes "GitHub Pages in public
  repositories". Pro (personal) and Team (organisation) include Pages in private repositories. The site
  itself stays public. Only Enterprise Cloud can publish a Pages site privately.
- **Making a repository private on a free plan unpublishes its Pages site immediately**, and GitHub warns
  that a custom domain left pointing at GitHub then risks a domain takeover. So on Free this would take
  getgradify.com down. Upgrade first, then change visibility.
- **Going private erases stars and watchers** (there are none) and **detaches public forks, which stay public**
  (there are none).
- **Secret scanning and push protection stop** on a private repository unless the organisation buys GitHub
  Secret Protection (available on Team as an add-on). The repository's own check, `tests/secrets.test.mjs`,
  and the site build's credential check keep running in CI either way. They catch a secret after it's pushed
  rather than blocking the push.
- **Actions:**
  - Standard runners are free and unlimited on public repositories.
  - Private repositories draw from monthly included compute: $12 on Free, $18 on Pro and Team, $300 on
    Enterprise Cloud.
  - A standard Linux runner costs **$0.006 a minute**. The single-CPU runner (`ubuntu-slim`) costs **$0.002 a
    minute**, with a 15-minute job limit.
  - **Every job is rounded up to a whole minute.**
- **What a transfer moves and keeps:**
  - Issues, pull requests, stars, watchers, secrets, webhooks and deploy keys move with the repository.
  - Git URLs and web links redirect, so `git push` keeps working, though GitHub recommends updating remotes.
  - **The old `github.io` address isn't redirected.** That doesn't matter for getgradify.com itself, but the
    `www` `CNAME` must point at the new owner's `github.io`.
- **The old name is retired.** A repository with more than 100 Actions uses in the week before transfer has
  its old `owner/name` permanently retired. Gradify qualifies, so `seren-aitchison/Gradify` can never be
  reused. That's harmless, and it stops anyone squatting on the redirect.
- **The original owner stays on as a collaborator.** After a transfer, the original owner is added as a
  collaborator on the repository, and the organisation's default permissions apply.
- **Domain verification is per account.** A domain verified for a personal account can only be published to
  from that account's repositories, and the same goes for an organisation. Verifying a domain that another
  account has already verified fails. So **if getgradify.com is verified on the personal account, that
  verification has to be removed before the organisation can verify it and publish to it.** Verification
  also protects every immediate subdomain, which covers `www`.

Still unverified: the price of Pro and Team; whether the Pages custom domain setting survives a transfer
unchanged (the runbook checks it and re-enters it if needed); the price of Secret Protection.

## 4. Options

| Option | Monthly cost (unverified prices) | What it protects | What it doesn't |
|---|---|---|---|
| **A. Stay public (today)** | £0 | Premium content and internal documents, through R2's allowlist and Supabase-held premium content | The code, all free lessons, the history and commit messages stay readable and copyable; weak IP signal |
| **B. Private on the personal account (GitHub Pro)** | About $4, plus CI (§5) | Code and history from that moment | The company doesn't own the repository; a second move to an organisation is needed later anyway |
| **C. Company organisation on Team, private (recommended)** | About $4 for one member, plus CI (§5) | As B, plus **the company holds the repository and Pages site**; access per person; rulesets and branch protection on private repositories (D16) | Copies already made while public |
| D. Company organisation on Free, still public | £0 | Company holds the repository | As A |
| E. Private repository, site moved to another host (for example Cloudflare Pages, since DNS is already on Cloudflare) | Possibly £0 (unverified) | As C | Adds a second hosting provider and a migration just before the Supabase work; not worth it now |

**Why C over B:**
- Ownership by the company is what investors, an acquirer and the IP register (workstream 11) will look for.
- It allows more than one owner, so access doesn't depend on a single personal account.
- It's where Claude's GitHub access and future collaborators are granted.

**D first, then C, is the safe route.** It splits the change: the transfer (organisation, Claude access,
domain) is tested while nothing costs money and the repository stays public. Visibility is changed only once
everything works.

## 5. CI cost when private, and how to cut it

**Measured usage:** about 40 pushes to `main` a day (each one a test job plus a deploy job), and about 20 branch
pushes (test only).

| Set-up | Per push to `main` | Per month, at 40 `main` and 20 branch pushes a day | Above Team's $18 |
|---|---|---|---|
| As now: both jobs on `ubuntu-latest` | 1 + about 6 minutes × $0.006 ≈ $0.042 | about $54 | **about $36** |
| **Deploy job on `ubuntu-slim`** (it only builds the file list, uploads and waits) | 1 min × $0.006 + 6 min × $0.002 ≈ $0.018 | about $25 | **about $7** |
| Also: deploy at most every 15 minutes, so a burst of pushes publishes once (assumes about 25 deploys a day) | fewer deploy jobs | about $20 | about $2 |

**Not worth it:** skipping the deploy when a push changes nothing on the site. 52 of the last 54 commits
changed the site.

**What is worth it:**
- **Spending limit.** Set an Actions spending limit in the organisation's billing settings, so a runaway loop
  can't produce a surprise bill.
- **The test job stays on the standard runner.** The real-PostgreSQL rehearsals need it, and at 46 seconds it's
  billed as 1 minute anyway.

These figures assume today's pace. Content work across several sessions could double them.

## 6. Ownership: GitHub control versus legal ownership

**Owning the GitHub organisation is administrative control. It isn't legal ownership** of the code and
content, which follows authorship and written agreements. For the company to own Gradify's IP:

- **The company must exist** (Gradify Ltd is assumed in the plan; **Decision O1**).
- **An assignment.** The owner, as author and commissioner of the AI-assisted work, assigns copyright in the
  code, lessons and designs to the company in writing. A solicitor should draft it; the IP register
  (workstream 11) records it.
- **A copyright notice in the repository** naming the owner, plus a pointer to the third-party licences that
  stay in force. The vendor libraries are MIT and Apache-2.0, and the anatomy models are CC BY 4.0 with their
  attribution file.
  - This is a small change in the repository, made once the owner is decided.
  - "All rights reserved" is already the default without a licence. An explicit notice removes any doubt.
- **AI-assisted material.** How UK copyright treats AI-assisted and computer-generated work (CDPA 1988 s9(3))
  is a question for the solicitor (unverified here). The practical step is the same either way: assign
  whatever rights exist to the company, and keep the record of who directed the work.

## 7. Runbook

Each phase:
- has **stop conditions**: if one is met, stop, change nothing more, and report
- has a **check**, which I can run from a session once access works: `node scripts/check-site.cjs --url
  https://getgradify.com` loads all pages, probes every excluded path and tests offline mode
- has a **rollback**

Phases 1–3 cost nothing.

### Phase 0: decisions (owner)
O1 to O6 in §9.

### Phase 1: before touching anything (owner, about 15 minutes)

1. GitHub → **Settings → Pages**: is getgradify.com listed as a verified domain? Note the answer.
2. **Insights → Traffic** on the repository: note clones and unique cloners over the last 14 days. This tells
   us how widely the public code was copied.
3. Check that the chosen organisation name is free.
4. Cloudflare: note the current DNS records for `getgradify.com` and `www`. Make a screenshot or an export.
5. Tell me, and I'll record the starting point: the last commit, the live deployment and a baseline
   `check-site` run.

### Phase 2: create the organisation (owner, about 20 minutes)

1. **Create the organisation** on the Free plan, under the chosen name. Use the business option if the
   company exists. GitHub then asks for the company name (unverified wording).
2. **Organisation settings:**
   - **Members:** require two-factor authentication for everyone.
   - **Base permissions:** "No permission" (members only see what they're given).
   - **Visibility changes and deletion:** allow only owners to change repository visibility, and only owners
     to delete or transfer repositories.
3. **Add a second owner** if there's someone trusted, or a separate recovery account the owner controls.
   GitHub recommends at least two owners, so that losing one account doesn't lock the company out.

### Phase 3: move the domain verification and transfer (owner, about 30 minutes; do it at a quiet time)

The site may be briefly unavailable in step 5.

1. **Pause the Claude sessions.** Let in-flight pushes finish, and don't start new work until phase 4 is done.
   Sessions that push during a transfer may fail.
2. **Create the TXT record.** In the organisation's settings → Pages → Add a domain → getgradify.com, GitHub
   shows a TXT record (`_github-pages-challenge-<org>.getgradify.com`). Create it in Cloudflare.
3. **If phase 1 showed the domain verified on the personal account,** remove it there first. Then, in the
   organisation, click **Verify**. The gap between the two should be minutes, and the domain stays configured
   on the repository throughout.
4. **Transfer.** Repository → Settings → Danger Zone → **Transfer** → the new organisation. Keep the name
   `Gradify`.
5. **Repoint and recheck.**
   - Cloudflare: change `www` to `CNAME <org>.github.io`. The apex `A` records don't change.
   - Repository → Settings → Pages: check that the source is still "GitHub Actions" and the custom domain is
     still getgradify.com with HTTPS enforced. Re-enter the domain if it's empty.

**Stop if:**
- the site doesn't answer within 30 minutes
- Pages refuses the domain
- the transfer fails

**Rollback:** the organisation can transfer the repository back to the personal account. Put the `www`
`CNAME` and the personal domain verification back as they were.

### Phase 4: reconnect Claude and CI (owner, then me)

1. At claude.ai/connect-github, **install the Claude GitHub App on the new organisation** and give it access
   to the Gradify repository.
2. In this cloud environment's settings, select the repository under its new owner, then **start a new
   session**. Sessions are bound to their repositories when they start.
3. **Then I:**
   - point the remote at the new URL
   - make one small docs commit (the README DNS line)
   - confirm that CI tests and deploys from the organisation
   - run `check-site` against getgradify.com and compare it with the phase 1 baseline
4. **Resume the other sessions.** Each new session starts from the new repository.

**Stop if:** CI doesn't run, the deploy fails, or `check-site` reports any new problem.

### Phase 5: make CI cheaper (me, on approval, while still public)

1. **Move the deploy job to `ubuntu-slim`** and check that a real deploy succeeds. While the repository is
   public this costs nothing, so a failure is free.
2. **Optionally, batch deploys** (§5).
3. **The owner sets an Actions spending limit** in the organisation's billing.

**Stop if:** the deploy fails on the single-CPU runner. In that case, keep `ubuntu-latest` and budget the
higher cost.

### Phase 6: upgrade and go private (owner, about 10 minutes, then me)

1. **Upgrade the organisation to Team.** Optionally, buy Secret Protection; otherwise CI's own credential
   checks are the guard.
2. **Wait until GitHub shows Team as active.** Then: repository → Settings → Danger Zone → **Change visibility
   → Private**.
3. **Check:**
   - In a private browser window, signed out, the repository's GitHub page answers 404.
   - getgradify.com still loads.
   - I run CI and `check-site` again.
   - The owner checks Actions usage after a day.
4. **Turn on branch protection or a ruleset for `main`** (D16): CI must pass before merging. Only then is the
   multi-session model in plan §8 enforced, rather than relied on.

**Stop if:** the site is unpublished, or Pages shows an error. Make the repository public again at once. That
is reversible: stars and watchers would be erased, but there are none.

## 8. What changes for Claude sessions

- Sessions reach the repository through the Claude GitHub App. **After the transfer, the app must be installed
  on the organisation**, and sessions must be started again with the repository selected. Until then they can't
  clone or push.
- This environment ("Gradify") needs no network change. Its allowed hosts (getgradify.com, docs.github.com)
  don't depend on the owner.
- Nothing in the code needs to change for the move. The single owner-specific line is in README.md.

## 9. Decisions for the owner

| # | Decision | Recommendation |
|---|---|---|
| O1 | Who legally owns Gradify: the owner personally, or Gradify Ltd (does it exist yet)? | The company, with a written IP assignment from the owner (solicitor) |
| O2 | Organisation name | `gradify` if it's free; otherwise `getgradify` (matches the domain) |
| O3 | Route: C directly, or D first and then C (§4) | D first: transfer while public and free, then go private once everything is verified |
| O4 | Second organisation owner or recovery account | Yes, before the transfer |
| O5 | CI budget once private: the cheaper runner (about $7 over Team's included amount), batched deploys (about $2), or keep as is (about $36) | The cheaper runner, plus a spending limit; batching only if the bill needs it |
| O6 | Buy Secret Protection when private, or rely on CI's checks | Rely on CI's checks for now; revisit when there's more than one human contributor |

Already decided and unchanged:
- The site stays public on GitHub Pages.
- Premium content will live in Supabase, never in the published site (plan §1A).
- Everything already published stays free (plan §1A).
