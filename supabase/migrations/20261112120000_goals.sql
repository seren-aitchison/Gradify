-- Goals: the learner's goals across every Gradify site (learning, career, skills, health, personal), shown in LifeOS
-- (Command Centre, Goals, Calendar) and, later, the native apps. One new table; no existing table changes.
--
-- Progress is never stored as a counter: a tracked goal names what it measures (`metric`) and every client works it out
-- from records that already exist (course progress, the activity log, flashcard reviews) with kit/learning/goals.js.
-- Only things Gradify can't see (applications sent, books read) are counted by hand, in `manual_value`.
--
-- `id` is made on the device (a UUID), so a goal created before signing in keeps its id when it moves into the account:
-- moving it again inserts nothing (on conflict do nothing), and an account goal is never overwritten by a device copy.
-- `updated_at` is compared on every change, so two devices editing the same goal can't silently overwrite each other.
-- The database sets it (goals_touch below), never the client: every update moves it strictly forward, so an edit that
-- started from an older copy always finds it changed, whatever timestamp the client sends.
create table public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null check (length(btrim(title)) between 1 and 120),
  area text not null default 'learning' check (area in ('learning', 'career', 'skills', 'health', 'personal')),
  site text check (site is null or length(site) <= 40),
  status text not null default 'active' check (status in ('active', 'paused', 'done', 'archived')),
  pinned boolean not null default false,
  target_date date,
  tz text not null default 'Europe/London' check (length(tz) between 1 and 64),
  -- a number to reach, and its unit ("lessons", "XP", "days", "applications")
  target numeric check (target is null or (target > 0 and target <= 1000000)),
  unit text check (unit is null or length(unit) <= 24),
  -- what a tracked goal measures: { source, metric, course?, site?, period }
  -- coalesce(…, false): a missing key makes the test NULL, which a check would otherwise let through
  metric jsonb check (metric is null or coalesce(
    jsonb_typeof(metric) = 'object'
    -- only the pairs kit/learning/goals.js METRICS can measure; a course metric names its course
    and ((metric->>'source' = 'course' and metric->>'metric' in ('lessons', 'units', 'xp')
          and jsonb_typeof(metric->'course') = 'string' and length(metric->>'course') between 1 and 60)
      or (metric->>'source' = 'xp' and metric->>'metric' = 'xp')
      or (metric->>'source' = 'activity' and metric->>'metric' = 'days')
      or (metric->>'source' = 'reviews' and metric->>'metric' = 'cards'))
    and coalesce(metric->>'period', 'since_start') in ('since_start', 'week', 'month', 'all_time'), false)),
  -- a count kept by hand, only for goals with no metric
  manual_value numeric check (manual_value is null or (manual_value >= 0 and manual_value <= 1000000)),
  -- a habit: { mode: daily | weekdays | per_week, days?: [1..7] (Mon = 1), per_week?: n, site?, kind? }
  habit jsonb check (habit is null or coalesce(jsonb_typeof(habit) = 'object' and habit->>'mode' in ('daily', 'weekdays', 'per_week'), false)),
  -- a checklist: [{ id, title, done_at }]
  milestones jsonb not null default '[]' check (jsonb_typeof(milestones) = 'array' and jsonb_array_length(milestones) <= 50),
  done_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (metric is null or manual_value is null)
);
create index goals_user_status on public.goals (user_id, status);
alter table public.goals enable row level security;
-- the learner's own goals only, like notes and plans
create policy "own goals" on public.goals for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
-- updated_at is the database's own: set on every insert and update, always later than the previous value (even within
-- one microsecond), so the overwrite check can't be bypassed by sending an old or unchanged timestamp. created_at is kept.
create function public.goals_touch() returns trigger language plpgsql as $$
begin
  if tg_op = 'UPDATE' then
    new.created_at := old.created_at;
    new.updated_at := greatest(clock_timestamp(), old.updated_at + interval '1 microsecond');
  else
    new.updated_at := clock_timestamp();
  end if;
  return new;
end $$;
create trigger goals_touch before insert or update on public.goals for each row execute function public.goals_touch();
