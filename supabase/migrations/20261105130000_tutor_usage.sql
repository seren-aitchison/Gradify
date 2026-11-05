-- Gradify AI tutor usage: one row per successful request to the course-tutor Edge Function, so the
-- function can apply a daily limit per learner and mode (DAILY in kit/assess/tutor.js) and the owner can
-- see costs. The learner's answers and the tutor's replies are NOT stored here.
-- Owner-only, like every learner table. Run after the earlier migrations.
create table public.tutor_usage (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  mode text not null check (mode in ('mark', 'roleplay', 'debrief', 'explain')),
  site text,
  input_tokens integer,
  output_tokens integer,
  created_at timestamptz not null default now()
);
create index tutor_usage_user_mode_time on public.tutor_usage (user_id, mode, created_at);
alter table public.tutor_usage enable row level security;
create policy "own tutor usage: read" on public.tutor_usage for select to authenticated using (user_id = auth.uid());
create policy "own tutor usage: add" on public.tutor_usage for insert to authenticated with check (user_id = auth.uid());
-- no update or delete policy: usage rows can't be edited or removed by the learner (they go with the account)
