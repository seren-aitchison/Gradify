# Maths and physics diagrams: the lead's playbook

For a model picking up the maths or physics diagram work. Read this, then the subject's `HANDOVER.md`
(`kit/diagrams/maths/` or `kit/diagrams/physics/`): its status table says what is done and its claims table what is
being built. The per-unit recipe agents follow is `UNIT-AGENT.md` in the same folder; the quality bar is
`kit/diagrams/BUILDERS.md`.

## How the work is organised

- One **unit** (`uNN`) is the unit of work: one plan file `kit/diagrams/plans/<subject>/uNN.mjs` with a row for every
  lesson, one batch script `scripts/diagrams/<subject>/uNN.mjs` that writes the specs, the specs and SVGs
  (`maths-uNN-*` / `phys-uNN-*`), and `D:` lines in `kit/courses/<subject>/notes/uNN.js`.
- The lead runs **one maths agent and one physics agent**, each given **three units**, and lands nothing itself except
  shared changes (handovers, scripts, lesson fixes the owner approved).
- Agents **land every unit as soon as it is done** with `scripts/diagrams/land-unit.sh`; nothing finished should sit
  unpushed, because the container can be reset (worktrees and anything outside the repo vanish) and usage limits stop
  agents mid-unit.
- Agents never edit `HANDOVER.md` (parallel edits made landings conflict). The lead updates it from each agent's
  report, straight after the report, and pushes.

## Setting up a fresh container

```bash
cd /home/user/Gradify && npm ci --no-audit --no-fund
grep -qx node_modules .git/info/exclude || echo node_modules >> .git/info/exclude
git fetch origin main
git worktree add -b diagrams/m1 /home/user/wt-m1 origin/main && ln -s /home/user/Gradify/node_modules /home/user/wt-m1/node_modules
```

(One worktree per agent; `.git/info/exclude` keeps the `node_modules` symlink out of `git status`.) Baseline: `npm test`
on main passes (1144 tests on 23 Nov 2026, about 3 minutes). It rewrites `docs/qa/*` and
`docs/CURRICULUM_PROGRESS.md`; revert those, never commit them.

## Starting a batch

1. `node scripts/diagrams/unit-status.mjs <subject>` and the claims table: pick the next three units nobody has claimed.
2. Put them in the claims table (`| u20, u21, u22 | lead session <id>, agent M1 |`), commit and push to main **before**
   launching, so another session sees them.
3. Launch the agent (Sonnet is enough) with the prompt below, filled in.

```text
You are diagram unit agent {AGENT} for Gradify {SUBJECT}. Build the diagrams for units {UNITS}, in that order, one at a time.

Work only in your worktree: {WT} (branch {BRANCH}, already on origin/main, node_modules linked). cd there first; never
touch /home/user/Gradify or other worktrees.

Follow kit/diagrams/{SUBJECT}/UNIT-AGENT.md exactly (read it and the files it names first). For each unit:
1. Plan every lesson, write the batch file and specs, place the D: lines, build your prefix only, check the SVGs (both
   layouts), run coverage.
2. Commit only that unit's files. The commit message ends with exactly these two lines:
   Co-Authored-By: {MODEL TRAILER}
   Claude-Session: {SESSION URL}
3. Land it: `scripts/diagrams/land-unit.sh {SUBJECT} uNN > /tmp/land-{agent}.log 2>&1; echo EXIT $? >> /tmp/land-{agent}.log`
   (run it with Bash run_in_background). Then wait in the foreground, repeating until it ends:
   `timeout 580 bash -c 'until grep -q "^EXIT" /tmp/land-{agent}.log; do sleep 10; done'; tail -15 /tmp/land-{agent}.log`
   On `LAND FAILED: <reason>` fix the cause in your unit, commit, and land again. Never push any other way.
4. Move on to the next unit on the same branch.

Rules:
- Do not edit HANDOVER.md, renderers, build/coverage scripts or other units' files. A missing renderer becomes a
  `null, "needs renderer …"` plan row.
- If a lesson's own text contains a mathematical or physical error, do not fix it: leave that lesson without a diagram
  (null row saying why) and report it with the file:line.
- Never run a full diagram build (no RDKit here); never use git stash; never force-push.
- Keep tool output short (pipe long output through tail/grep) to save tokens.

Final report (short): per unit, lessons assessed / with a diagram / lab / none, the LANDED sha; renderers you lacked
(one line each); lesson errors (file:line, what is wrong). If you stop before finishing, say which unit was in progress
and whether its work is committed.
```

The landing waits in rounds because six agents once queued for the lock longer than a 10-minute foreground command.

## What `land-unit.sh` does

`scripts/diagrams/land-unit.sh <maths|physics> uNN [uNN …]`, from a worktree with the unit committed and a clean tree:
takes `/tmp/gradify-land.lock` (one landing at a time), rebases on origin/main (conflicts in `manifest.json`,
`registry.js` or `docs/visual-learning/` take origin's copy; anything else aborts), rebuilds the unit, regenerates the
visual learning inventory and amends the top commit, checks scope (only that unit's files plus generated files, and
only that unit's manifest keys), runs the whole CI gate (`npm test`, `audit-sites`, `qa-audit`, `build-site --check`,
generated files, `inventory.mjs --check`), reverts what the gate rewrote, and pushes to main. It goes round again if
main moved (three tries). `DRY_RUN=1` does everything but push. The lead can hold the same lock for its own pushes:
`exec 9>/tmp/gradify-land.lock; flock 9`.

## When an agent reports

1. Check the unit is on main: `git log origin/main --oneline -- kit/diagrams/plans/<subject>/uNN.mjs`.
2. In the subject's `HANDOVER.md`: paste a fresh `node scripts/diagrams/unit-status.mjs <subject>` table, add the
   unit's line under "Unit notes" (counts, renderers lacked, anything odd), add lesson errors under "Lesson errors"
   (owner decides; do not fix without their say-so), and remove the unit from the claims table.
3. Commit, hold the lock, rebase, `npm test`, `node scripts/visual/inventory.mjs --check`, push to main.
4. When the agent's three units are all on main, claim the next three and launch again.

If an agent stops part-way (usage limit, reset), its worktree may hold a finished commit: land it with the script. Save
unfinished work as `git push origin HEAD:wip/<subject>-uNN` and record the branch in the handover's "WIP branches".

## Pitfalls that cost time before

- **Never run a full `node scripts/diagrams/build.mjs`**: RDKit is not installed, so chemistry diagrams get marked
  failed (this once overwrote three approved diagrams). Build a prefix only: `build.mjs maths-u15`.
- **The visual learning inventory** (`docs/visual-learning/`) is checked by CI but not by `npm test`. Landing diagrams
  without regenerating it once failed main's CI and blocked every deploy. The landing script handles it; lead commits
  that touch plans must run `node scripts/visual/inventory.mjs` too.
- **Dependencies move**: if tests fail that pass on plain main, rerun `npm ci` (main gained `esbuild` once).
- **Git stash is shared across worktrees**; don't use it.
- **Container resets** delete worktrees, `/tmp` and anything outside the repo. Everything durable is in the repo:
  this file, the handovers, `land-unit.sh`, `unit-status.mjs`.
- **One diagram in two maths lessons**: `scripts/diagrams/maths/place.mjs` places a diagram in its own lesson only and
  ignores `also`; add the second `D:` line by hand (done for `maths-u17-stereographic-charts`).
