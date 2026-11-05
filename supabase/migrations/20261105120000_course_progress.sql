-- Course progress in the account, so a learner's place in a course follows them across devices.
-- One row per learner per course; the state is the course's own progress object (kit/course/progress.js),
-- merged with the device copy on sign-in, never blindly overwritten. Attempts live in assessment_attempts.
-- Owner-only, like every learner table. Run after the earlier migrations.
create table public.course_progress (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  subject text not null,                    -- course slug: "law", "nursing"
  site text not null,                       -- "LawGradify", "NurseGradify"
  state jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, subject),
  constraint course_progress_size check (pg_column_size(state) < 2000000)
);
alter table public.course_progress enable row level security;
create policy "own course progress: read" on public.course_progress for select to authenticated using (user_id = auth.uid());
create policy "own course progress: add" on public.course_progress for insert to authenticated with check (user_id = auth.uid());
create policy "own course progress: change" on public.course_progress for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own course progress: delete" on public.course_progress for delete to authenticated using (user_id = auth.uid());
