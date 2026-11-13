-- Gradify AI coach (kit/assess/tutor.js, mode "coach"): answers a learner's question about their own learning from
-- the Gradify Intelligence summary their browser sends (kit/intel), and may only point to actions that summary offered.
-- It counts as a tutor conversation, like the study director. Run after 20261113120000_client_privileges.sql.
alter table public.tutor_usage drop constraint tutor_usage_mode_check;
alter table public.tutor_usage add constraint tutor_usage_mode_check
  check (mode in ('mark', 'roleplay', 'debrief', 'explain', 'diagnose', 'socratic', 'challenge', 'connect', 'examiner', 'director', 'coach', 'pack', 'questions', 'card'));

create or replace function public.ai_feature(mode text) returns text
language sql immutable as $$
  select case
    when mode in ('mark', 'roleplay', 'debrief', 'diagnose', 'socratic', 'challenge', 'connect', 'examiner', 'director', 'coach') then 'tutor'
    when mode in ('explain', 'card') then 'explain'
    when mode = 'pack' then 'pack'
    when mode = 'questions' then 'quiz'
  end;
$$;
