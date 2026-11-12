-- PROPOSED, NOT APPLIED. XP that can't be counted twice: each activity row can carry an `event_id`, a stable name for
-- the award made on the device that earned it (the iPhone, iPad and Mac apps send "biology:1700000000123:lesson:u01-01",
-- ProgressSync's eventID). Uploads use `on conflict (user_id, event_id) do nothing`, so a retried or interrupted upload
-- inserts nothing the second time, and the XP trigger (activity_xp, after insert) only runs for the first.
--
-- Backwards compatible: existing rows keep event_id null, and rows written without one (the website today, every row
-- so far) are never constrained, because Postgres treats nulls as distinct in a unique index. No existing value changes.
-- Additive only: one nullable column, one check, one index.
-- Rollback: drop index public.activity_event_once; alter table public.activity drop column event_id;
-- (rows written meanwhile keep their XP; only the duplicate protection goes).
alter table public.activity
  add column event_id text check (event_id is null or length(event_id) between 1 and 200);
create unique index activity_event_once on public.activity (user_id, event_id);
