-- Gradify AI tutor in the Organic Chemistry Lab (kit/assess/tutor.js, mode "chemistry"): explains a verdict the lab's
-- deterministic chemistry engine already reached, at the authority it has. It counts as a tutor conversation, like
-- the Socratic tutor (its follow-up turns share one use). Run after 20261120120000_notes_knowledge_base.sql.
alter table public.tutor_usage drop constraint tutor_usage_mode_check;
alter table public.tutor_usage add constraint tutor_usage_mode_check
  check (mode in ('mark', 'roleplay', 'debrief', 'explain', 'diagnose', 'socratic', 'challenge', 'connect', 'examiner', 'director', 'coach', 'chemistry', 'pack', 'questions', 'card'));

create or replace function public.ai_feature(mode text) returns text
language sql immutable as $$
  select case
    when mode in ('mark', 'roleplay', 'debrief', 'diagnose', 'socratic', 'challenge', 'connect', 'examiner', 'director', 'coach', 'chemistry') then 'tutor'
    when mode in ('explain', 'card') then 'explain'
    when mode = 'pack' then 'pack'
    when mode = 'questions' then 'quiz'
  end;
$$;
