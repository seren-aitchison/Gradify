-- Measuring real learning, with consent; adaptive-explanation events; and the visual request queue.
-- New tables and functions, plus one widened check on learning_events. No existing row changes.
--
-- 1. research_consent: a learner's own choice to let their learning count towards Gradify's measures of what teaches
--    well (docs/LEARNING-OUTCOMES.md). Off unless they switch it on; 16 or over only; withdrawn instantly, because
--    every measure below is computed live from the consenting learners at that moment. Nothing is copied anywhere.
-- 2. Three measures, readable by anyone because they hold no personal data. Each reports a group only when at least
--    10 consenting learners are in it (k-anonymity), so no one learner's answers can be picked out:
--      learning_outcomes(p_min)   per lesson: first-try accuracy, and retention (right again 7 or more days later)
--      explanation_outcomes()     per way of explaining (kit/learning/explain.js): how often the next answer was right
--      outcomes_summary()         whether there are enough consenting learners yet
-- 3. learning_events may record explanation_shown and explanation_outcome (the evidence the explanation choice learns from).
-- 4. visual_requests: learners asking for a visual Gradify hasn't got (kit/tools/visualise.js), for the visualisation team.

create table public.research_consent (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  granted boolean not null default false,
  over_16 boolean not null default false,
  version text not null default '2026-11' check (length(version) <= 20),
  updated_at timestamptz not null default now(),
  check (not granted or over_16)
);
alter table public.research_consent enable row level security;
create policy "own consent" on public.research_consent for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
revoke all on table public.research_consent from anon;

alter table public.learning_events drop constraint learning_events_event_check, add constraint learning_events_event_check check (event in (
  'card_answered', 'question_answered', 'session_started', 'session_finished', 'session_abandoned',
  'stage_reached', 'forgotten', 'misconception_fixed', 'lesson_completed', 'lesson_revisited', 'lesson_time',
  'pack_made', 'plan_accepted', 'plan_block_done', 'plan_block_missed', 'autopilot_change', 'change_undone',
  'recommendation_followed', 'mode_changed', 'tell_applied', 'calendar_synced', 'notification_opened',
  'explanation_shown', 'explanation_outcome'));

create function public.learning_outcomes(p_min int) returns table (subject text, lesson_id text, learners bigint, first_try numeric, retained_learners bigint, retention numeric) language sql stable security definer set search_path = public as $$
  with c as (select user_id from public.research_consent where granted and over_16),
  a as (select t.user_id, t.subject, t.lesson_id, t.question_id, t.correct, t.created_at from public.assessment_attempts t join c on c.user_id = t.user_id where t.lesson_id is not null and t.marking_status = 'final'),
  firsts as (select distinct on (user_id, question_id) user_id, subject, lesson_id, question_id, correct, created_at from a order by user_id, question_id, created_at),
  later as (select f.user_id, f.question_id, (select l.correct from a l where l.user_id = f.user_id and l.question_id = f.question_id and l.created_at >= f.created_at + interval '7 days' order by l.created_at limit 1) as later_correct from firsts f),
  joined as (select f.subject, f.lesson_id, f.user_id, f.correct, l.later_correct from firsts f join later l on l.user_id = f.user_id and l.question_id = f.question_id),
  grouped as (select j.subject, j.lesson_id, count(distinct j.user_id) as learners, round(avg(j.correct::int), 3) as first_try,
    count(distinct j.user_id) filter (where j.later_correct is not null) as retained_learners,
    round(avg(j.later_correct::int) filter (where j.later_correct is not null), 3) as retention
    from joined j group by j.subject, j.lesson_id)
  select g.subject, g.lesson_id, g.learners, g.first_try, g.retained_learners, case when g.retained_learners >= 10 then g.retention end
  from grouped g where g.learners >= greatest(coalesce(p_min, 10), 10) order by g.subject, g.lesson_id
$$;

create function public.explanation_outcomes() returns table (strategy text, ok bigint, no bigint, learners bigint) language sql stable security definer set search_path = public as $$
  select substr(e.source, 9), count(*) filter (where e.result = 'correct'), count(*) filter (where e.result = 'incorrect'), count(distinct e.user_id)
  from public.learning_events e join public.research_consent c on c.user_id = e.user_id and c.granted and c.over_16
  where e.event = 'explanation_outcome' and e.source like 'explain:%'
  group by 1 having count(distinct e.user_id) >= 10
$$;

create function public.outcomes_summary() returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object('enough', x.n >= 10, 'consenting', case when x.n >= 10 then x.n end, 'threshold', 10)
  from (select count(*) as n from public.research_consent where granted and over_16) x
$$;

revoke all on function public.learning_outcomes(int) from public;
revoke all on function public.explanation_outcomes() from public;
revoke all on function public.outcomes_summary() from public;
grant execute on function public.learning_outcomes(int) to anon, authenticated;
grant execute on function public.explanation_outcomes() to anon, authenticated;
grant execute on function public.outcomes_summary() to anon, authenticated;

create table public.visual_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  concept text not null check (length(btrim(concept)) between 2 and 120),
  purpose text not null default '' check (length(purpose) <= 400),
  site text not null default 'Gradify' check (length(site) <= 40),
  status text not null default 'open' check (status in ('open', 'planned', 'made', 'declined')),
  created_at timestamptz not null default now()
);
create index visual_requests_status on public.visual_requests (status, created_at);
alter table public.visual_requests enable row level security;
create policy "ask as yourself" on public.visual_requests for insert to authenticated with check (user_id = auth.uid());
create policy "see your requests" on public.visual_requests for select to authenticated using (user_id = auth.uid());
revoke all on table public.visual_requests from anon;
revoke update, delete on table public.visual_requests from authenticated;

-- at most 10 requests a day each; a new request always starts open
create function public.visual_request_check() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.visual_requests where user_id = new.user_id and created_at > now() - interval '1 day') >= 10 then
    raise exception 'You''ve asked for 10 visuals today. Try again tomorrow.' using errcode = '54000';
  end if;
  new.status := 'open'; new.created_at := now();
  return new;
end $$;
create trigger visual_request_check before insert on public.visual_requests for each row execute function public.visual_request_check();
revoke all on function public.visual_request_check() from public, anon, authenticated;
