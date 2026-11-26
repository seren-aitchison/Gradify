-- The learner's state (kit/data/learner-state.js, docs/product/LEARNER-STATE.md): one row per entry of the learner's
-- record (a pin, a workspace tab, a history line, a link between two resources, a collection and what's in it, a note
-- on a resource, a mistake to revisit, something scheduled), so the same record follows the learner to every device.
-- Not content: notes, answers and documents stay in their own tables.
--
-- Adds one table, its index, one trigger function and its trigger. Changes no existing table, row, function or
-- policy. Applied by scripts/supabase-admin.mjs migrate in one transaction with its checks (all or nothing).
-- To undo: drop table public.learner_state; drop function public.learner_state_keep_newer(); (the app then keeps
-- the record on each device again, with nothing lost there).
--
-- Two devices can change the same entry. The newer change wins: t is when the device made it (ms), dev which device,
-- and an update older than what's stored is ignored (learner_state_keep_newer), so a device that comes back online
-- with old changes can't overwrite newer ones. A deletion is a row with del = true, kept so that an older copy
-- can't bring the thing back.

create table if not exists public.learner_state (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  kind text not null check (kind in ('pin', 'tab', 'activity', 'link', 'collection', 'collitem', 'note', 'mistake', 'sched')),
  key text not null check (char_length(key) between 1 and 600),
  value jsonb,
  t bigint not null,
  dev text not null check (char_length(dev) between 1 and 64),
  del boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, kind, key),
  constraint learner_state_value_size check (value is null or pg_column_size(value) <= 16384)
);
create index if not exists learner_state_pull on public.learner_state (user_id, updated_at);

-- keep the newer of two changes, and stamp the server's time on every write (devices pull by it)
create or replace function public.learner_state_keep_newer() returns trigger language plpgsql as $$
begin
  if tg_op = 'UPDATE' and (new.t < old.t or (new.t = old.t and new.dev <= old.dev)) then
    return null;   -- older than what's stored: keep what's there
  end if;
  new.updated_at := now();
  return new;
end $$;
create trigger learner_state_keep_newer before insert or update on public.learner_state for each row execute function public.learner_state_keep_newer();

-- a learner's own rows only, like every other learner table; and on Free, writes only from the active device
-- (public.may_write, supabase/migrations/20261117120000_plus_plan.sql), as for cards, plan blocks and progress
alter table public.learner_state enable row level security;
create policy "own learner state: read" on public.learner_state for select to authenticated using (user_id = auth.uid());
create policy "own learner state: add" on public.learner_state for insert to authenticated with check (user_id = auth.uid());
create policy "own learner state: change" on public.learner_state for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own learner state: delete" on public.learner_state for delete to authenticated using (user_id = auth.uid());
create policy "active device: add" on public.learner_state as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.learner_state as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.learner_state as restrictive for delete to authenticated using (public.may_write());
revoke select, insert, update, delete, truncate, references, trigger, maintain on table public.learner_state from anon;
revoke truncate, references, trigger, maintain on table public.learner_state from authenticated;
revoke all on function public.learner_state_keep_newer() from public, anon, authenticated;
