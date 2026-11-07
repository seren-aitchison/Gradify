-- More Gradify AI modes in the usage ledger: the tutor's diagnose, socratic, challenge, connect, examiner and
-- study director (kit/assess/tutor.js), and the study-pack function's pack, questions and card, whose daily
-- limits were counted from the packs table (which learners can delete from, resetting the count).
-- tutor_usage has no update or delete policy, so these counts can't be erased by the learner.
-- Run after 20261105130000_tutor_usage.sql.
alter table public.tutor_usage drop constraint tutor_usage_mode_check;
alter table public.tutor_usage add constraint tutor_usage_mode_check
  check (mode in ('mark', 'roleplay', 'debrief', 'explain', 'diagnose', 'socratic', 'challenge', 'connect', 'examiner', 'director', 'pack', 'questions', 'card'));
