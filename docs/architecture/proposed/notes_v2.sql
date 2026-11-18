-- ============================================================================================================
-- PROPOSAL ONLY. NOT A MIGRATION. DO NOT APPLY.
-- Sketch of the Gradify Notes v2 storage described in docs/architecture/NOTES-ARCHITECTURE-REVIEW.md §3, §6.
-- It lives outside supabase/migrations/ so no tool runs it. Before it becomes a migration it needs: approval,
-- review against the live migration history, a pg-rehearsal run (scripts/pg-rehearsal.mjs) and a verified backup
-- (docs/RECOVERY.md). The kb-assets Storage bucket is an owner action and is not created here.
-- ============================================================================================================

-- One server-assigned version sequence: the change feed's order, independent of device clocks.
create sequence public.kb_version_seq;

-- Every rem (bullet, document, folder) is a block. `id` is the rem id the device already made (stable).
create table public.kb_blocks (
  id text not null check (length(id) between 6 and 32),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  doc_id text,                                   -- the nearest document (null for top-level documents and folders)
  parent_id text,                                -- null: top level
  sort_key text not null check (length(sort_key) between 1 and 64),   -- fractional index among siblings
  kind text not null default 'text' check (kind in ('text', 'doc', 'folder', 'daily', 'image', 'drawing', 'table', 'pdf', 'embed', 'portal', 'code')),
  body jsonb not null default '{}'::jsonb check (jsonb_typeof(body) = 'object' and pg_column_size(body) <= 200000),
  version bigint not null default 0,             -- set by kb_blocks_touch, never by the client
  deleted boolean not null default false,        -- tombstone, kept ≥ 12 months
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id),
  check (parent_id is null or parent_id <> id)
);
create index kb_blocks_feed on public.kb_blocks (user_id, version);
create index kb_blocks_doc on public.kb_blocks (user_id, doc_id) where not deleted;
create index kb_blocks_text on public.kb_blocks using gin (to_tsvector('simple', coalesce(body->>'text', ''))) where not deleted;
alter table public.kb_blocks enable row level security;
create policy "own blocks" on public.kb_blocks for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "active device: add" on public.kb_blocks as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.kb_blocks as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.kb_blocks as restrictive for delete to authenticated using (public.may_write());

create function public.kb_blocks_touch() returns trigger language plpgsql as $$
begin
  new.version := nextval('public.kb_version_seq');
  new.updated_at := clock_timestamp();
  if tg_op = 'UPDATE' then new.created_at := old.created_at; new.user_id := old.user_id; end if;
  return new;
end $$;
create trigger kb_blocks_touch before insert or update on public.kb_blocks for each row execute function public.kb_blocks_touch();

-- Links, derived from block bodies on write (kb_push), for backlinks, lesson panels, search and the knowledge graph.
create table public.kb_links (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  from_block text not null,
  to_kind text not null check (to_kind in ('block', 'lesson', 'concept', 'asset', 'tag')),
  to_id text not null check (length(to_id) between 1 and 120),
  kind text not null check (kind in ('reference', 'portal', 'tag', 'lesson', 'concept', 'source')),
  primary key (user_id, from_block, to_kind, to_id, kind)
);
create index kb_links_to on public.kb_links (user_id, to_kind, to_id);
alter table public.kb_links enable row level security;
create policy "own links" on public.kb_links for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Earlier versions of a block's text: pruned to 90 days / N per block by a scheduled job.
create table public.kb_history (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  block_id text not null,
  version bigint not null,
  body jsonb not null check (pg_column_size(body) <= 200000),
  at timestamptz not null default now(),
  primary key (user_id, block_id, version)
);
alter table public.kb_history enable row level security;
create policy "own history: read" on public.kb_history for select to authenticated using (user_id = auth.uid());

-- Tag settings and exam plans (today inside the single row as tagDefs and exams).
create table public.kb_tags (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  key text not null check (length(key) between 1 and 80),
  def jsonb not null check (jsonb_typeof(def) = 'object' and pg_column_size(def) <= 20000),
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);
create table public.kb_exams (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id text not null check (length(id) between 2 and 40),
  plan jsonb not null check (jsonb_typeof(plan) = 'object' and pg_column_size(plan) <= 50000),
  deleted boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);
alter table public.kb_tags enable row level security;
alter table public.kb_exams enable row level security;
create policy "own tags" on public.kb_tags for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own exams" on public.kb_exams for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Assets: metadata for files in the private kb-assets bucket (<user id>/<asset id>), and their extracted text.
create table public.kb_assets (
  id text not null check (length(id) between 6 and 40),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  kind text not null check (kind in ('pdf', 'image', 'scan', 'drawing', 'audio', 'file')),
  mime text not null check (length(mime) <= 100),
  bytes bigint not null check (bytes > 0 and bytes <= 200000000),
  sha256 text not null check (sha256 ~ '^[0-9a-f]{64}$'),
  pages int,
  storage_path text not null,
  deleted boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (user_id, id),
  unique (user_id, sha256)
);
create table public.kb_asset_text (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  asset_id text not null,
  page int not null check (page >= 1),
  text text not null check (length(text) <= 100000),
  primary key (user_id, asset_id, page)
);
create index kb_asset_text_fts on public.kb_asset_text using gin (to_tsvector('simple', text));
alter table public.kb_assets enable row level security;
alter table public.kb_asset_text enable row level security;
create policy "own assets" on public.kb_assets for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own asset text" on public.kb_asset_text for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Cards made from notes: one per notes card id, even when two devices create it at once (replaces kb.cardMap).
alter table public.cards add column source_ref text check (source_ref is null or length(source_ref) between 4 and 120);
create unique index cards_source_ref on public.cards (user_id, source_ref) where source_ref is not null;

-- Still to write, with tests, before any of this is proposed as a migration:
--   kb_push(changes jsonb)   one transaction: optimistic versions per block, cycle check, conflict copies for text,
--                            kb_links re-derived for changed blocks, kb_history copy, idempotent per client op id
--   kb_share(p_id uuid)      security definer: one public share's title, snapshot, updated_at (blocker B2 on #116)
--   storage.objects policies for kb-assets: own folder only (owner action, reviewed like a migration)
