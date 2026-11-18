-- Gradify Notes (app.html#/notes, kit/notes/kb): the knowledge base of documents, bullets, references, tags and the
-- flashcards written in them.
--
-- 1. The knowledge base is kept in tool_items, like the Tools notebook: one row per learner (id 'kb-main', kind 'kb'),
--    merged rem by rem on every device (kit/notes/kb/model.js merge), last change winning for each bullet. Its cards
--    are ordinary rows in public.cards (one public.documents row per notes document, file_name 'kb:<rem id>'), so
--    nothing about cards, reviews or scheduling changes here.
-- 2. kb_shares: a snapshot of a document a learner has shared. Sharing publishes a copy, so later edits stay private
--    until it's shared again. Only its owner can see, change or delete the row. Anyone with the link reads it through
--    kb_share(id), which returns that one share's title, snapshot and date and nothing else: there is no read policy
--    for anyone but the owner, so the table can't be listed, and the sharer's user id and the shared note's id are
--    never shown. Unsharing deletes the row, and the link stops working at once.
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
create policy "active device: add" on public.kb_shares as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.kb_shares as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.kb_shares as restrictive for delete to authenticated using (public.may_write());
-- signed-out visitors can't touch the table at all: they read one share through kb_share() below
revoke select, insert, update, delete, truncate, references, trigger, maintain on table public.kb_shares from anon;
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

-- One shared note, by the id in its link: only if it exists and is still public. Returns no row otherwise (unshared,
-- made private, or never existed), so a wrong id and a revoked one look the same. Never returns user_id or rem.
create function public.kb_share(p_id uuid) returns table (title text, snapshot jsonb, updated_at timestamptz)
language sql stable security definer set search_path = public as $$
  select s.title, s.snapshot, s.updated_at from public.kb_shares s where s.id = p_id and s.public
$$;
grant execute on function public.kb_share(uuid) to anon, authenticated;
