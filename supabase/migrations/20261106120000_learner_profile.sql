-- The shared learner profile (kit/data/profile.js): what set-up asks beyond the existing columns,
-- in one object so it can grow without a migration per question:
--   { subjects: text[], prior: { site: "new" | "some" | "confident" }, prefs: { motion, text }, onboarded_at, skipped_at }
-- It's covered by the existing "own profile" policy. Until this runs, the app keeps it on the device.
alter table public.profiles
  add column learner jsonb not null default '{}'::jsonb,
  add constraint profiles_learner_size check (pg_column_size(learner) < 20000);
