#!/usr/bin/env bash
# Land one or more finished diagram units on main, with the same gate CI runs.
#
#   scripts/diagrams/land-unit.sh maths u15 [u16 ...]
#   scripts/diagrams/land-unit.sh physics u18
#
# Run it from a worktree whose branch holds your committed unit work (clean tree). It:
#   1. takes a machine-wide lock, so parallel unit agents land one at a time;
#   2. fetches and rebases on origin/main; conflicts in the generated files (manifest.json, registry.js,
#      docs/visual-learning/) take origin's copy, any other conflict aborts;
#   3. rebuilds your units (specs, placement, build with every check, registry), regenerates the visual
#      learning inventory, and amends your top commit if anything changed;
#   4. checks scope: only your units' files and the generated files, and manifest keys only for your units;
#   5. runs the CI gate (npm test, audit-sites, qa-audit, build-site --check, generated files, inventory --check)
#      and reverts the docs the test run rewrites;
#   6. pushes HEAD to main. If main moved meanwhile, it goes round again (at most 3 times).
# Output goes to the terminal; the full test log is in $LOG (default /tmp/land-<subject>-<units>.log).
set -uo pipefail

S="${1:?subject: maths or physics}"; shift
[ $# -gt 0 ] || { echo "usage: $0 maths|physics uNN [uNN ...]"; exit 2; }
UNITS=("$@"); ALT="$(IFS="|"; echo "${UNITS[*]}")"
case "$S" in maths) P=maths ;; physics) P=phys ;; *) echo "subject must be maths or physics"; exit 2 ;; esac
for u in "${UNITS[@]}"; do [[ "$u" =~ ^u[0-9]{2}$ ]] || { echo "bad unit '$u' (want uNN)"; exit 2; }; done

ROOT="$(git rev-parse --show-toplevel)" || exit 2
cd "$ROOT"
LOG="${LOG:-/tmp/land-$S-$(IFS=-; echo "${UNITS[*]}").log}"
fail() { echo "LAND FAILED: $*"; exit 1; }

[ -z "$(git status --porcelain --untracked-files=no)" ] || fail "working tree has uncommitted changes; commit your unit first"
[ "$(git rev-parse --abbrev-ref HEAD)" != "main" ] || fail "run from your own branch, not main"

exec 9>/tmp/gradify-land.lock
echo "waiting for the landing lock..."
flock 9
echo "lock taken"

GENERATED='^(kit/diagrams/manifest\.json|kit/courses/(maths|physics)/registry\.js|docs/visual-learning/.*)$'

rebase_on_main() {
  git fetch -q origin main || fail "fetch"
  git rebase origin/main >/dev/null 2>&1 && return 0
  while [ -d "$(git rev-parse --git-path rebase-merge)" ] || [ -d "$(git rev-parse --git-path rebase-apply)" ]; do
    local conflicted; conflicted="$(git diff --name-only --diff-filter=U)"
    for f in $conflicted; do
      if [[ "$f" =~ $GENERATED ]]; then git checkout --ours -- "$f" && git add "$f"   # in a rebase, --ours = origin's
      else git rebase --abort; fail "conflict in $f (not a generated file); resolve it yourself"; fi
    done
    GIT_EDITOR=true git rebase --continue >/dev/null 2>&1 || { [ -z "$(git diff --name-only --diff-filter=U)" ] && GIT_EDITOR=true git -c core.editor=true rebase --skip >/dev/null 2>&1; } || true
  done
  echo "rebased on $(git rev-parse --short origin/main)"
}

rebuild() {
  for u in "${UNITS[@]}"; do
    node "scripts/diagrams/$S/$u.mjs" >/dev/null || fail "spec script $u"
    if [ "$S" = maths ]; then node scripts/diagrams/maths/place.mjs "maths-$u" >/dev/null || fail "place $u"; fi
    node scripts/diagrams/build.mjs "$P-$u" > "/tmp/land-build-$P-$u.txt" 2>&1 || { tail -20 "/tmp/land-build-$P-$u.txt"; fail "build $P-$u has failing checks"; }
  done
  if [ "$S" = maths ]; then node scripts/diagrams/maths/registry.mjs >/dev/null || fail "registry"; fi
  node scripts/diagrams/coverage.mjs "$S" > /tmp/land-coverage.txt || { grep '✗' /tmp/land-coverage.txt | head; fail "coverage: planned but not placed, or failing"; }
  head -1 /tmp/land-coverage.txt
  node scripts/visual/inventory.mjs >/dev/null || fail "inventory"
  git add -A kit/diagrams kit/courses/"$S" docs/visual-learning scripts/diagrams/"$S"
  if ! git diff --cached --quiet; then git commit -q --amend --no-edit && echo "rebuild changed generated files; amended the top commit"; fi
}

check_scope() {
  local bad=0 pat="^(kit/diagrams/plans/$S/($ALT)\.mjs|scripts/diagrams/$S/($ALT)\.mjs|kit/diagrams/specs/$P-($ALT)-.*|kit/diagrams/svg/$P-($ALT)-.*|kit/courses/$S/notes/($ALT)\.js)$"
  while read -r f; do
    [ -z "$f" ] && continue
    if ! [[ "$f" =~ $pat || "$f" =~ $GENERATED ]]; then echo "  out of scope: $f"; bad=1; fi
  done < <(git diff --name-only origin/main...HEAD)
  local keys; keys="$(node -e '
    const { execSync } = require("child_process");
    const a = JSON.parse(execSync("git show origin/main:kit/diagrams/manifest.json", { maxBuffer: 1 << 30 }));
    const b = require(process.cwd() + "/kit/diagrams/manifest.json");
    const ok = new RegExp("^" + process.argv[1] + "-(" + process.argv[2] + ")-");
    const changed = [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((k) => JSON.stringify(a[k]) !== JSON.stringify(b[k]));
    console.log(changed.filter((k) => !ok.test(k)).join("\n"));' "$P" "$ALT")"
  if [ -n "$keys" ]; then echo "  manifest entries outside your units changed:"; echo "$keys" | head | sed 's/^/    /'; bad=1; fi
  [ $bad = 0 ] || fail "scope check"
  echo "scope ok: $(git diff --name-only origin/main...HEAD | wc -l) files"
}

ci_gate() {
  echo "running the CI gate (about 4 minutes); log in $LOG"
  local ok=1
  npm test > "$LOG" 2>&1 || ok=0
  grep -E '^# (tests|pass|fail) ' "$LOG"
  node scripts/audit-sites.mjs >> "$LOG" 2>&1 || { echo "  audit-sites failed"; ok=0; }
  node scripts/qa-audit.mjs >> "$LOG" 2>&1 || { echo "  qa-audit failed"; ok=0; }
  node scripts/build-site.mjs --check >> "$LOG" 2>&1 || { echo "  build-site --check failed"; ok=0; }
  { node scripts/build-sitemap.mjs && npm run sync && node scripts/ix-manifest.mjs && node scripts/build-api.mjs; } >> "$LOG" 2>&1
  git diff --quiet -- sitemap.xml supabase/functions/_shared/ supabase/dashboard/ kit/course/ix-manifest.js kit/api/ || { echo "  generated files out of date"; ok=0; }
  node scripts/visual/inventory.mjs --check >> "$LOG" 2>&1 || { echo "  inventory out of date"; ok=0; }
  # revert everything the gate rewrote (the tree was clean before it ran)
  git diff --name-only | xargs -r git checkout --
  [ $ok = 1 ] || { grep -E '^not ok' "$LOG" | head; fail "CI gate (see $LOG)"; }
}

for attempt in 1 2 3; do
  rebase_on_main
  rebuild
  check_scope
  ci_gate
  git fetch -q origin main
  if [ "$(git merge-base HEAD origin/main)" != "$(git rev-parse origin/main)" ]; then
    echo "main moved during the gate; going round again"; continue
  fi
  if [ -n "${DRY_RUN:-}" ]; then echo "DRY RUN: everything passed; not pushing"; exit 0; fi
  if git push -q origin HEAD:main; then
    echo "LANDED $(git rev-parse --short HEAD) on main: $S ${UNITS[*]}"; exit 0
  fi
  echo "push rejected; going round again"
done
fail "main kept moving; run the script again"
