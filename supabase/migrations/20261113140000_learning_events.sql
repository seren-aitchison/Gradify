-- The learning event ledger: one append-only row for every meaningful thing a learner does on any Gradify site, so
-- Gradify Intelligence (kit/intel) can keep one understanding of the learner across subjects and devices, and so the
-- iOS app and future analytics read the same stream. It records what happened, never a judgement: mastery is worked
-- out from these events and the existing tables, and no AI writes here.
-- Owner-only: a learner reads and adds their own events and can delete them (Settings → Delete all my data); nobody
-- can edit an event. Run after 20261113130000_coach_mode.sql.
create table public.learning_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  at timestamptz not null default now(),
  site text check (site is null or length(site) <= 40),
  event text not null check (event in (
    'card_answered', 'question_answered', 'session_started', 'session_finished', 'session_abandoned',
    'stage_reached', 'forgotten', 'misconception_fixed', 'lesson_completed', 'lesson_revisited',
    'pack_made', 'plan_accepted', 'plan_block_done', 'plan_block_missed', 'autopilot_change', 'change_undone',
    'recommendation_followed', 'mode_changed', 'tell_applied', 'calendar_synced', 'notification_opened')),
  concept text check (concept is null or length(concept) <= 200),       -- "<document id>|<topic>" or a course lesson id
  card_id uuid,                                                          -- no foreign key: an event outlives a deleted card
  result text check (result is null or result in ('correct', 'incorrect', 'partial')),
  confidence real check (confidence is null or (confidence >= 0 and confidence <= 1)),
  response_ms integer check (response_ms is null or (response_ms >= 0 and response_ms <= 3600000)),
  source text check (source is null or length(source) <= 40),
  detail jsonb check (detail is null or (jsonb_typeof(detail) = 'object' and pg_column_size(detail) <= 4000))
);
create index learning_events_user_time on public.learning_events (user_id, at desc);
alter table public.learning_events enable row level security;
create policy "own events: read" on public.learning_events for select to authenticated using (user_id = auth.uid());
create policy "own events: add" on public.learning_events for insert to authenticated with check (user_id = auth.uid());
create policy "own events: delete" on public.learning_events for delete to authenticated using (user_id = auth.uid());
-- append-only and least privilege, as in 20261113120000_client_privileges.sql
revoke all on table public.learning_events from anon;
revoke update, truncate, references, trigger, maintain on table public.learning_events from authenticated;
