-- Push notifications: one row per device a learner has turned notifications on for (Web Push: Chrome, Edge, Firefox,
-- Safari on Mac, and Gradify on an iPhone or iPad Home Screen). The push-send Edge Function reads these with the
-- service role, decides what's worth sending with kit/intel/nudges.js (the same rules the browser uses) and records
-- what it sent today, so the daily cap and "never the same kind twice" hold across devices.
-- Owner-only: a learner can add, read, change the preferences of and delete their own devices. Run after
-- 20261113140000_learning_events.sql.
create table public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  endpoint text not null unique check (endpoint ~ '^https://' and length(endpoint) <= 1000),
  p256dh text not null check (length(p256dh) between 20 and 200),
  auth text not null check (length(auth) between 8 and 100),
  tz text not null default 'Europe/London' check (length(tz) between 1 and 64),
  prefs jsonb not null default '{}'::jsonb check (jsonb_typeof(prefs) = 'object' and pg_column_size(prefs) <= 2000),
  device text check (device is null or length(device) <= 60),
  sent_day date,
  sent_kinds text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index push_subscriptions_user on public.push_subscriptions (user_id);
alter table public.push_subscriptions enable row level security;
create policy "own devices: read" on public.push_subscriptions for select to authenticated using (user_id = auth.uid());
create policy "own devices: add" on public.push_subscriptions for insert to authenticated with check (user_id = auth.uid());
create policy "own devices: change" on public.push_subscriptions for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own devices: delete" on public.push_subscriptions for delete to authenticated using (user_id = auth.uid());
revoke all on table public.push_subscriptions from anon;
revoke truncate, references, trigger, maintain on table public.push_subscriptions from authenticated;
-- Learners can change their own rows (preferences, time zone). The only other fields there are their own "sent today"
-- counters, which affect no one else; column-level grants are kept out of migrations by scripts/supabase-admin.mjs.
