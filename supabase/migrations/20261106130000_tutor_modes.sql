-- More Gradify AI tutor modes (kit/assess/tutor.js): diagnose, socratic, challenge, connect, examiner and
-- the study director. Widens the usage table's mode list so their daily limits can be counted.
-- Run after 20261105130000_tutor_usage.sql.
alter table public.tutor_usage drop constraint tutor_usage_mode_check;
alter table public.tutor_usage add constraint tutor_usage_mode_check
  check (mode in ('mark', 'roleplay', 'debrief', 'explain', 'diagnose', 'socratic', 'challenge', 'connect', 'examiner', 'director'));
