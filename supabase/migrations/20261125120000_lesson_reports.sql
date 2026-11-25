-- Learners' reports of a lesson ("this is wrong", "this is unclear"): the second half of student data as QA. The
-- content engine reads open reports, as aggregates, into its repair queue (scripts/content/signals.mjs) with the
-- service role; nothing here is read by other learners. Owner-only, as learning_events: a learner adds, reads and
-- deletes their own reports and can't edit one; status changes are made by the service role when a fix ships.
-- subject must be a course slug, and lesson_id a lesson id, so these values can safely name files and look-ups.
-- Run after 20261124190000_plus_funnel.sql.
create table public.lesson_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  at timestamptz not null default now(),
  site text check (site is null or length(site) <= 40),
  subject text not null check (subject ~ '^[a-z0-9-]{1,40}$'),
  lesson_id text not null check (lesson_id ~ '^[a-z0-9-]{1,40}$'),
  question_id text check (question_id is null or question_id ~ '^[a-z0-9-]{1,80}$'),
  kind text not null check (kind in ('wrong', 'unclear', 'typo', 'broken', 'other')),
  note text check (note is null or length(note) <= 1000),
  status text not null default 'open' check (status in ('open', 'fixed', 'dismissed'))
);
create index lesson_reports_open on public.lesson_reports (subject, lesson_id) where status = 'open';
create index lesson_reports_user_time on public.lesson_reports (user_id, at desc);
alter table public.lesson_reports enable row level security;
create policy "own reports: read" on public.lesson_reports for select to authenticated using (user_id = auth.uid());
create policy "own reports: add" on public.lesson_reports for insert to authenticated with check (user_id = auth.uid() and status = 'open');
create policy "own reports: delete" on public.lesson_reports for delete to authenticated using (user_id = auth.uid());
-- append-only for learners and least privilege, as in 20261113120000_client_privileges.sql
revoke all on table public.lesson_reports from anon;
revoke update, truncate, references, trigger, maintain on table public.lesson_reports from authenticated;
