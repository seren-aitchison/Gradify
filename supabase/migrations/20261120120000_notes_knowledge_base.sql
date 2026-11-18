-- Gradify Notes (app.html#/notes, kit/notes/kb): the knowledge base of documents, bullets, references, tags and the
-- flashcards written in them.
--
-- 1. The knowledge base is kept in tool_items, like the Tools notebook: one row per learner (id 'kb-main', kind 'kb'),
--    merged rem by rem on every device (kit/notes/kb/model.js merge), last change winning for each bullet. Its cards
--    are ordinary rows in public.cards (one public.documents row per notes document, file_name 'kb:<rem id>'), so
--    nothing about cards, reviews or scheduling changes here.
-- 2. kb_shares: a snapshot of a document a learner has shared. Sharing publishes a copy, so later edits stay private
--    until it's shared again. Anyone with a public link can read it; only its owner can change or delete it.
--    Writes follow the one-active-device rule for Free, like every other study table.

alter table public.tool_items drop constraint tool_items_kind_check, add constraint tool_items_kind_check check (kind in ('deck', 'map', 'note', 'kb'));

create table public.kb_shares (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  rem text not null check (length(rem) between 4 and 64),
  title text not null default '' check (length(title) <= 200),
  snapshot jsonb not null check (jsonb_typeof(snapshot) = 'object' and snapshot->>'format' = 'gradify-notes' and pg_column_size(snapshot) <= 2000000),
  public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index kb_shares_user on public.kb_shares (user_id);
alter table public.kb_shares enable row level security;
create policy "own shares" on public.kb_shares for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "public shares can be read" on public.kb_shares for select to anon, authenticated using (public);
create policy "active device: add" on public.kb_shares as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.kb_shares as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.kb_shares as restrictive for delete to authenticated using (public.may_write());
-- signed-out visitors read public shares (the policy above) and change nothing
revoke insert, update, delete, truncate, references, trigger, maintain on table public.kb_shares from anon;
revoke truncate, references, trigger, maintain on table public.kb_shares from authenticated;

create function public.kb_shares_touch() returns trigger language plpgsql as $$
begin
  if tg_op = 'UPDATE' then
    new.created_at := old.created_at;
    new.user_id := old.user_id;
    new.updated_at := greatest(clock_timestamp(), old.updated_at + interval '1 microsecond');
  else
    new.updated_at := clock_timestamp();
  end if;
  return new;
end $$;
create trigger kb_shares_touch before insert or update on public.kb_shares for each row execute function public.kb_shares_touch();
