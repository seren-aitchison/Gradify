-- SportGradify Body Intelligence: workouts, soreness check-ins and measured fitness tests.
-- Private to their owner through row-level security, like every Gradify table. XP for this
-- activity goes through public.activity (site = 'SportGradify'), so Sport progress counts in the
-- same personal development system as every other Gradify site.

-- One training session. Sets are stored with the session (jsonb) because they are always read and
-- written together; each set is { exercise, reps, load_kg, rpe?, side? } with exercise ids from
-- kit/sport/exercises.js.
create table public.workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  date date not null,
  name text check (char_length(name) <= 120),
  sets jsonb not null default '[]'::jsonb check (jsonb_typeof(sets) = 'array' and jsonb_array_length(sets) <= 200),
  note text check (char_length(note) <= 2000),
  created_at timestamptz not null default now()
);
create index workouts_user_date on public.workouts (user_id, date desc);

-- How sore each muscle group feels (0–3) and overall fatigue (1–5): feeds the recovery estimate.
create table public.body_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  at timestamptz not null default now(),
  soreness jsonb not null default '{}'::jsonb check (jsonb_typeof(soreness) = 'object'),
  fatigue int check (fatigue between 1 and 5),
  note text check (char_length(note) <= 2000)
);
create index body_checkins_user_time on public.body_checkins (user_id, at desc);

-- Measured results (5 km time, push-ups, sit-and-reach...): test ids from kit/sport/exercises.js.
create table public.fitness_tests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  date date not null,
  test text not null check (char_length(test) <= 60),
  value numeric not null check (value >= 0 and value < 100000),
  note text check (char_length(note) <= 500),
  created_at timestamptz not null default now()
);
create index fitness_tests_user_test on public.fitness_tests (user_id, test, date);

alter table public.workouts enable row level security;
alter table public.body_checkins enable row level security;
alter table public.fitness_tests enable row level security;
create policy "own workouts" on public.workouts for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own body checkins" on public.body_checkins for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own fitness tests" on public.fitness_tests for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
