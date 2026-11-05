-- NMC revalidation record (NurseGradify #/revalidation, kit/course/revalidation.js): a registrant's private log
-- of practice hours, CPD, feedback, reflective accounts, the reflective discussion and their settings and
-- declarations. One row per entry; the entry's fields are in jsonb. The page tells users not to record
-- anything that could identify a person they care for.
-- Owner-only, like every learner table. Run after the earlier migrations.
create table public.revalidation_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  kind text not null check (kind in ('settings', 'hours', 'cpd', 'feedback', 'reflection', 'discussion')),
  occurred_on date not null,
  entry jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint revalidation_entry_size check (pg_column_size(entry) < 64000)
);
create index revalidation_entries_user on public.revalidation_entries (user_id, occurred_on);
alter table public.revalidation_entries enable row level security;
create policy "own revalidation: read" on public.revalidation_entries for select to authenticated using (user_id = auth.uid());
create policy "own revalidation: add" on public.revalidation_entries for insert to authenticated with check (user_id = auth.uid());
create policy "own revalidation: change" on public.revalidation_entries for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own revalidation: delete" on public.revalidation_entries for delete to authenticated using (user_id = auth.uid());
