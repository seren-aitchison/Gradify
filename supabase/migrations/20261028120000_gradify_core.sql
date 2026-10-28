-- Gradify core schema: one learner's notes, study packs, flashcards, reviews and activity.
-- Every table is private to its owner through row-level security.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  goal text check (goal in ('exam', 'course', 'qualification', 'curious')),
  site text,                         -- the Gradify site they chose, e.g. 'MedGradify'
  level text default 'undergraduate',
  exam_date date,
  daily_minutes int default 20 check (daily_minutes between 5 and 600),
  xp int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null,
  site text,
  file_name text,
  pages int,
  text text,                         -- extracted text, kept so facts can be checked against it
  created_at timestamptz not null default now()
);

create table public.packs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  document_id uuid references public.documents (id) on delete cascade,
  engine text not null check (engine in ('claude', 'browser')),
  model text,
  pack jsonb not null,
  stats jsonb,
  input_tokens int,
  output_tokens int,
  created_at timestamptz not null default now()
);

create table public.cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  pack_id uuid references public.packs (id) on delete cascade,
  document_id uuid references public.documents (id) on delete cascade,
  topic text,
  front text not null check (length(front) between 1 and 2000),
  back text not null check (length(back) between 1 and 4000),
  kind text,
  source_quote text,
  source_page int,
  grounded text check (grounded in ('yes', 'partly', 'no', 'bonus')),
  edited boolean not null default false,
  suspended boolean not null default false,
  -- spaced repetition state
  reps int not null default 0,
  lapses int not null default 0,
  ease real not null default 2.5,
  interval_days real not null default 0,
  due_at timestamptz not null default now(),
  last_rating text check (last_rating in ('again', 'hard', 'good', 'easy')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index cards_due on public.cards (user_id, due_at) where not suspended;

create table public.reviews (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  card_id uuid not null references public.cards (id) on delete cascade,
  rating text not null check (rating in ('again', 'hard', 'good', 'easy')),
  interval_days real,
  ms int,
  reviewed_at timestamptz not null default now()
);
create index reviews_user_time on public.reviews (user_id, reviewed_at);

-- Everything that counts as learning, from any Gradify site: drives the heatmap, XP and streaks
create table public.activity (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  site text not null default 'Gradify',
  kind text not null,                -- 'review', 'pack', 'session', 'block', ...
  xp int not null default 0 check (xp between 0 and 500),
  detail jsonb,
  at timestamptz not null default now()
);
create index activity_user_time on public.activity (user_id, at);

create table public.plan_blocks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  day date not null,
  start_min int not null check (start_min between 0 and 1440),
  end_min int not null check (end_min > start_min and end_min <= 1440),
  title text not null,
  cal text not null default 'study',
  done boolean not null default false,
  auto boolean not null default false,
  created_at timestamptz not null default now()
);

-- Interest in sites that aren't live yet
create table public.waitlist (
  id bigint generated always as identity primary key,
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  site text not null,
  created_at timestamptz not null default now(),
  unique (email, site)
);

-- ---------- Row-level security ----------
alter table public.profiles enable row level security;
alter table public.documents enable row level security;
alter table public.packs enable row level security;
alter table public.cards enable row level security;
alter table public.reviews enable row level security;
alter table public.activity enable row level security;
alter table public.plan_blocks enable row level security;
alter table public.waitlist enable row level security;

create policy "own profile" on public.profiles for all to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "own documents" on public.documents for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own packs" on public.packs for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own cards" on public.cards for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own reviews" on public.reviews for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own activity" on public.activity for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own blocks" on public.plan_blocks for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
-- anyone may join a waitlist; nobody can read it back through the API
create policy "join waitlist" on public.waitlist for insert to anon, authenticated with check (true);

-- XP is only ever added through activity, never set directly from the browser. (A column
-- revoke isn't enough: Supabase grants table-wide UPDATE, which overrides it.) Direct updates
-- run as the API roles; the activity trigger runs as its owner, so only it can change XP.
create function public.guard_xp() returns trigger language plpgsql as $$
begin
  if new.xp is distinct from old.xp and current_user in ('authenticated', 'anon') then
    new.xp := old.xp;
  end if;
  return new;
end $$;
create trigger profiles_guard_xp before update on public.profiles for each row execute function public.guard_xp();
create function public.add_activity_xp() returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.profiles set xp = xp + new.xp, updated_at = now() where id = new.user_id;
  return new;
end $$;
create trigger activity_xp after insert on public.activity for each row execute function public.add_activity_xp();

-- A profile row for every new account
create function public.new_user_profile() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id) values (new.id) on conflict do nothing;
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.new_user_profile();

-- Heatmap: activity per day, computed in the database
create view public.daily_activity with (security_invoker = true) as
  select user_id, (at at time zone 'Europe/London')::date as day, count(*) as n, sum(xp) as xp
  from public.activity group by 1, 2;
