-- Tools in the learner's account, and Free allowances counted on the server. Three new tables; no existing table
-- changes.
--
-- 1. tool_items: the flashcard decks and mind maps a learner makes in Tools (kit/tools). Before this they lived in
--    one browser only, while Plus promises "your notes, flashcards and mind maps on every device". `id` is made on
--    the device, so an item made before signing in keeps its id when it moves into the account. `deleted` is a
--    tombstone, so a deck deleted on one device isn't brought back by another device's older copy. Last write wins,
--    by `updated_at`, which the database sets (tool_items_touch), never the client.
-- 2. tool_images: images added to a learner's cards, as data URLs (the migration tool can't create a Storage bucket,
--    and card images are small: scaled to 1200 px and compressed on the device first). At most about 1 MB each.
-- 3. free_usage: what a Free learner has opened (lessons in each course, flashcard sets, mind maps, uses of each tool),
--    so the allowances in kit/data/limits.js hold across devices and can't be reset by clearing a browser. Learners
--    can read their own rows but not write them: take_allowance() is the only way in, and it decides the limits.
--
-- Writes to tool_items and tool_images follow the one-active-device rule for Free, like every other study table.

create table public.tool_items (
  id text not null check (length(id) between 4 and 64),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  kind text not null check (kind in ('deck', 'map')),
  title text not null default '' check (length(title) <= 300),
  body jsonb not null default '{}'::jsonb check (pg_column_size(body) <= 2000000),
  deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);
create index tool_items_user_updated on public.tool_items (user_id, updated_at);
alter table public.tool_items enable row level security;
create policy "own tool items" on public.tool_items for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "active device: add" on public.tool_items as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.tool_items as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.tool_items as restrictive for delete to authenticated using (public.may_write());
revoke all on table public.tool_items from anon;

-- updated_at is the database's own, always later than before, so devices can compare copies fairly
create function public.tool_items_touch() returns trigger language plpgsql as $$
begin
  if tg_op = 'UPDATE' then
    new.created_at := old.created_at;
    new.updated_at := greatest(clock_timestamp(), old.updated_at + interval '1 microsecond');
  else
    new.updated_at := clock_timestamp();
  end if;
  return new;
end $$;
create trigger tool_items_touch before insert or update on public.tool_items for each row execute function public.tool_items_touch();

create table public.tool_images (
  id text not null check (length(id) between 4 and 64),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  mime text not null check (mime in ('image/jpeg', 'image/png', 'image/webp')),
  data text not null check (length(data) <= 1400000 and data like 'data:image/%'),
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);
alter table public.tool_images enable row level security;
create policy "own tool images" on public.tool_images for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "active device: add" on public.tool_images as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.tool_images as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.tool_images as restrictive for delete to authenticated using (public.may_write());
revoke all on table public.tool_images from anon;

create table public.free_usage (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  bucket text not null check (length(bucket) between 1 and 80),
  item text not null check (length(item) between 1 and 200),
  created_at timestamptz not null default now(),
  primary key (user_id, bucket, item)
);
alter table public.free_usage enable row level security;
create policy "own usage: read" on public.free_usage for select to authenticated using (user_id = auth.uid());
revoke insert, update, delete on table public.free_usage from anon, authenticated;
revoke all on table public.free_usage from anon;

-- Open something that counts against a Free allowance. The server decides the limit for each kind (lesson:<course>
-- 10, flashcards 5, map 5, tool:<tool> 5); Plus, Pro, or plans not yet enforced: no limit. Opening the same item again
-- is always allowed. Returns { ok, fresh, used, limit, left } or { ok: true, unlimited: true }.
create function public.take_allowance(p_bucket text, p_item text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); lim int; n int;
begin
  if uid is null then return jsonb_build_object('ok', true, 'reason', 'signed_out'); end if;
  if public.plus_allowed_for(uid) then return jsonb_build_object('ok', true, 'unlimited', true); end if;
  lim := case
    when p_bucket ~ '^lesson:[a-z0-9-]{1,40}$' then 10
    when p_bucket in ('flashcards', 'map') then 5
    when p_bucket ~ '^tool:(search|map|cards|convert)$' then 5
  end;
  if lim is null then return jsonb_build_object('ok', false, 'reason', 'unknown_allowance'); end if;
  if p_item is null or length(p_item) not between 1 and 200 then return jsonb_build_object('ok', false, 'reason', 'bad_item'); end if;
  -- one learner's allowance is counted one request at a time
  perform pg_advisory_xact_lock(hashtext(uid::text || '|' || p_bucket));
  select count(*) into n from public.free_usage where user_id = uid and bucket = p_bucket;
  if exists (select 1 from public.free_usage where user_id = uid and bucket = p_bucket and item = p_item) then
    return jsonb_build_object('ok', true, 'fresh', false, 'used', n, 'limit', lim, 'left', greatest(0, lim - n));
  end if;
  if n >= lim then return jsonb_build_object('ok', false, 'fresh', false, 'used', n, 'limit', lim, 'left', 0); end if;
  insert into public.free_usage (user_id, bucket, item) values (uid, p_bucket, p_item);
  return jsonb_build_object('ok', true, 'fresh', true, 'used', n + 1, 'limit', lim, 'left', lim - n - 1);
end $$;

revoke all on function public.take_allowance(text, text) from public, anon;
revoke all on function public.tool_items_touch() from public, anon, authenticated;
grant execute on function public.take_allowance(text, text) to authenticated;
