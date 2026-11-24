# Gradify release register

Every product change that reaches getgradify.com, with the commit that actually deployed it. Several sessions push to
`main`, and a deploy publishes everything on `main` at that moment, so a deployed commit can carry other sessions' work.
Each row names the change's own commit(s) and the deploy that published them. Every release is checked on the live site
afterwards, not just in CI.

| Release | Change's own commit(s) | Reached `main` | Deployed by (run → commit) | Live check |
|---|---|---|---|---|
| Homepage on the design system (PR #166) | `0b93e611` | merge `26d5cc04`, 23 Nov | run for `26d5cc04` | Homepage served |
| Shared components, Appearance setting (PR #167) | `a6962ba2` … `ded44a8d` | merge `48d1422c`, 23 Nov | run 45177418055 → `48d1422c` | `access-panel.js` and `system.css` served with the new code. Real devices and screen readers not yet tested |
| **Task 1**: topic cards open their topic (PR #168) | `490cfb85` … `3baa3267` | merge `1cbae7ce`, 23 Nov 14:07 | run 45190766120 → `1cbae7ce` (test, signed-in, deploy all passed) | getgradify.com, Chromium: 190 / 190 linked cards land correctly (18 on a phone); 14 unlinked cards render as plain cards |
| **Task 2**: set-up never interrupts a student | `7a62cff6` | merge `6305ca2e`, 23 Nov 14:56 (pushed directly, no PR, at the owner's request) | First run for `6305ca2e` **failed** on a stale visual-learning inventory left by another session's maths diagrams (`bc123c11`), so the deploy was skipped. Fixed by regenerating the inventory: `70ecbfe5` (its run was superseded and cancelled). **Published by run 45200707667 → `90e9c98c`**, which also carried one other session's commit, `90e9c98c` itself (diagram handovers: unit claims) | getgradify.com, Chromium, first visits: Progress, Tools, Notes, Smart Plan, Learn, Today, Audio and Convert each open directly; Today offers set-up |
| **Task 3**: the app's 15 destinations as five sections | branch `claude/exciting-heisenberg-1kho51` | not yet, awaiting the owner's approval | | |

## Outstanding after release

- PR #167: Safari, Firefox, Android Chrome and hands-on screen-reader testing (VoiceOver, NVDA).
- The "Pro" badge in light mode is 3.93:1, below 4.5:1 (seen while checking Task 3; it predates it).
