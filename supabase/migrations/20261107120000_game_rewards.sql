-- Game rewards (kit/game/, docs/GAMIFICATION.md) are logged to activity with kind 'game-<reward key>', for example
-- 'game-quest:2026-11-07:lessons' or 'game-ach:scholar'. Each reward key can be paid to an account only once, even if
-- two tabs or devices sync at the same moment: a second insert fails and the client treats it as already synced.
create unique index if not exists activity_game_reward_once on public.activity (user_id, kind) where kind like 'game-%';
