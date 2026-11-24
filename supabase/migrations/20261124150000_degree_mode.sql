-- Gradify AI about your degree (kit/assess/tutor.js, mode "degree"): answers a student's question from the degree
-- tracker's own results (assets/study-tools.js degreeBrief), never calculating; a reply with any figure that isn't in
-- those results is withheld. It counts as a tutor conversation, like the coach. Run after 20261123140000_page_events_vitals.sql.
alter table public.tutor_usage drop constraint tutor_usage_mode_check;
alter table public.tutor_usage add constraint tutor_usage_mode_check
  check (mode in ('mark', 'roleplay', 'debrief', 'explain', 'diagnose', 'socratic', 'challenge', 'connect', 'examiner', 'director', 'coach', 'degree', 'pack', 'questions', 'card'));

create or replace function public.ai_feature(mode text) returns text
language sql immutable as $$
  select case
    when mode in ('mark', 'roleplay', 'debrief', 'diagnose', 'socratic', 'challenge', 'connect', 'examiner', 'director', 'coach', 'degree') then 'tutor'
    when mode in ('explain', 'card') then 'explain'
    when mode = 'pack' then 'pack'
    when mode = 'questions' then 'quiz'
  end;
$$;
