# Start here

For any session (Claude, another model or a person) picking up Gradify's content engine. Read in this order, and nothing else unless the task names it:

1. `RULES.md`, the non-negotiables.
2. `STATUS.json` and `HANDOVER.md`, generated from the files and git by `node scripts/gradify.mjs status --write`. Never edit them by hand; regenerate them.
3. `NEXT_TASK.json`, the next thing to do and the command that does it.
4. `docs/CONTENT-ENGINE.md`, only if the task changes the engine.

Check the branch and commit in `STATUS.json` against `git log -1` before editing anything. History is `git log`, and the work queue is `gradify next` / `gradify status`: there are no hand-kept checkpoint or queue files to fall out of date.

Production runs itself (`.github/workflows/content.yml`). A coding session is needed only when the rolling PR reports a systematic gate failure. Then use the fix prompt in `docs/CONTENT-ENGINE.md`.
