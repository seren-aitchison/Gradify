-- Learners' feedback about a Gradify tool or page ("an idea", "a problem", "something I like"), from Send feedback in
-- the quick tools (kit/ui/quick-actions.js feedbackDialog). Read by the Gradify team with the service role; nothing
-- here is read by other learners. Owner-only, as lesson_reports: a learner adds, reads and deletes their own
-- feedback and can't edit it. page is a path with no query or fragment, so no learner data rides along with it.
-- Until this is applied, feedback waits on the learner's device (the outbox) and is sent once it is.
-- Run after 20261126120000_learner_state.sql.
create table public.app_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  at timestamptz not null default now(),
  site text check (site is null or length(site) <= 40),
  about text not null check (length(about) between 1 and 80),
  kind text not null check (kind in ('idea', 'problem', 'praise', 'other')),
  note text not null check (length(note) between 1 and 2000),
  page text check (page is null or (length(page) <= 200 and page !~ '[?#]')),
  status text not null default 'new' check (status in ('new', 'read', 'done'))
);
create index app_feedback_new on public.app_feedback (at desc) where status = 'new';
create index app_feedback_user_time on public.app_feedback (user_id, at desc);
alter table public.app_feedback enable row level security;
create policy "own feedback: read" on public.app_feedback for select to authenticated using (user_id = auth.uid());
create policy "own feedback: add" on public.app_feedback for insert to authenticated with check (user_id = auth.uid() and status = 'new');
create policy "own feedback: delete" on public.app_feedback for delete to authenticated using (user_id = auth.uid());
-- append-only for learners and least privilege, as in 20261113120000_client_privileges.sql
revoke all on table public.app_feedback from anon;
revoke update, truncate, references, trigger, maintain on table public.app_feedback from authenticated;
