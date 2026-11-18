-- Community (kit/app/community.js) and the new Tools (kit/tools). New tables only, plus two changes to the Tools
-- tables from 20261118120000: notebook pages are kept in tool_items (kind 'note'), and take_allowance knows the new
-- tools. No existing row changes.
--
-- Community is for signed-in learners who have made a community profile (a display name, and confirming they're 13
-- or over). Nothing in it is readable signed out.
--   community_profiles  a learner's public face: display name, optional school, subjects, and whether they offer to
--                       tutor or mentor. Only the owner reads the row itself; others see only what the functions below
--                       return (never the school, except to rank a school leaderboard).
--   follows             friends: who a learner follows, by friend code
--   study_groups, group_members   private groups with a join code, a chat and a leaderboard
--   chat_messages       subject chats (one room per subject) and group chats. Links, email addresses and phone numbers
--                       are refused, at most 8 messages a minute, and a message reported by 3 people is hidden
--   chat_reports        reports of messages
--   help_requests       a learner asking a tutor or mentor for help, and their reply, inside Gradify

create table public.community_profiles (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  display_name text not null check (length(btrim(display_name)) between 2 and 40),
  school text check (school is null or length(school) <= 80),
  subjects text[] not null default '{}' check (cardinality(subjects) <= 12),
  bio text not null default '' check (length(bio) <= 500),
  is_tutor boolean not null default false,
  tutor_rate text not null default '' check (length(tutor_rate) <= 60),
  is_mentor boolean not null default false,
  mentor_stage text not null default '' check (length(mentor_stage) <= 80),
  on_leaderboards boolean not null default true,
  over_13 boolean not null check (over_13),
  friend_code text not null unique default upper(substr(md5(random()::text || clock_timestamp()::text), 1, 7)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.community_profiles enable row level security;
create policy "own community profile" on public.community_profiles for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
revoke all on table public.community_profiles from anon;

create table public.follows (
  follower uuid not null default auth.uid() references auth.users (id) on delete cascade,
  followee uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower, followee),
  check (follower <> followee)
);
alter table public.follows enable row level security;
create policy "own follows" on public.follows for all to authenticated using (follower = auth.uid()) with check (follower = auth.uid());
revoke all on table public.follows from anon;

create table public.study_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(btrim(name)) between 2 and 60),
  subject text not null default '' check (length(subject) <= 60),
  code text not null unique default upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6)),
  owner uuid not null default auth.uid() references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
create table public.group_members (
  group_id uuid not null references public.study_groups (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (group_id, user_id)
);
create index group_members_user on public.group_members (user_id);
alter table public.study_groups enable row level security;
alter table public.group_members enable row level security;

-- membership, checked without recursing through group_members' own policy
create function public.is_group_member(p_group uuid) returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.group_members where group_id = p_group and user_id = auth.uid())
$$;
create policy "members see their groups" on public.study_groups for select to authenticated using (public.is_group_member(id) or owner = auth.uid());
create policy "anyone signed in starts a group" on public.study_groups for insert to authenticated with check (owner = auth.uid());
create policy "owner renames or closes" on public.study_groups for update to authenticated using (owner = auth.uid()) with check (owner = auth.uid());
create policy "owner deletes" on public.study_groups for delete to authenticated using (owner = auth.uid());
create policy "members see members" on public.group_members for select to authenticated using (public.is_group_member(group_id));
create policy "leave a group" on public.group_members for delete to authenticated using (user_id = auth.uid());
revoke all on table public.study_groups from anon;
revoke all on table public.group_members from anon;

-- the group's owner is its first member
create function public.study_group_owner_joins() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.group_members (group_id, user_id) values (new.id, new.owner) on conflict do nothing;
  return new;
end $$;
create trigger study_group_owner_joins after insert on public.study_groups for each row execute function public.study_group_owner_joins();

create table public.chat_messages (
  id bigint generated always as identity primary key,
  room text not null check (room ~ '^(subject:[a-z0-9-]{1,40}|group:[0-9a-f-]{36})$'),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null default '',
  body text not null check (length(btrim(body)) between 1 and 1000),
  hidden boolean not null default false,
  created_at timestamptz not null default now()
);
create index chat_messages_room_time on public.chat_messages (room, created_at desc);
alter table public.chat_messages enable row level security;
create policy "read subject chats and your groups" on public.chat_messages for select to authenticated
  using (not hidden and (room like 'subject:%' or (room like 'group:%' and public.is_group_member(substr(room, 7)::uuid))));
create policy "post as yourself" on public.chat_messages for insert to authenticated
  with check (user_id = auth.uid() and (room like 'subject:%' or (room like 'group:%' and public.is_group_member(substr(room, 7)::uuid))));
create policy "delete your own" on public.chat_messages for delete to authenticated using (user_id = auth.uid());
revoke all on table public.chat_messages from anon;
revoke update on table public.chat_messages from authenticated;

-- checks every message: a community profile, no contact details or links, at most 8 a minute; the name is the poster's
create function public.chat_message_check() returns trigger language plpgsql security definer set search_path = public as $$
declare who text; recent int;
begin
  select display_name into who from public.community_profiles where user_id = new.user_id;
  if who is null then raise exception 'Make a community profile first.' using errcode = '42501'; end if;
  if new.body ~* '(https?://|www\.|[a-z0-9-]+\.(com|co\.uk|org|net|io|me|gg|ly|app)\b)' then raise exception 'For everyone''s safety, links can''t be posted in Gradify chats.' using errcode = '22023'; end if;
  if new.body ~* '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}' or regexp_replace(new.body, '[^0-9]', '', 'g') ~ '[0-9]{9,}' then raise exception 'For everyone''s safety, email addresses and phone numbers can''t be posted in Gradify chats.' using errcode = '22023'; end if;
  select count(*) into recent from public.chat_messages where user_id = new.user_id and created_at > now() - interval '1 minute';
  if recent >= 8 then raise exception 'You''re sending messages very fast. Wait a minute and try again.' using errcode = '54000'; end if;
  new.name := who; new.hidden := false; new.created_at := now();
  return new;
end $$;
create trigger chat_message_check before insert on public.chat_messages for each row execute function public.chat_message_check();

create table public.chat_reports (
  message_id bigint not null references public.chat_messages (id) on delete cascade,
  reporter uuid not null default auth.uid() references auth.users (id) on delete cascade,
  reason text not null default '' check (length(reason) <= 300),
  created_at timestamptz not null default now(),
  primary key (message_id, reporter)
);
alter table public.chat_reports enable row level security;
create policy "report as yourself" on public.chat_reports for insert to authenticated with check (reporter = auth.uid());
create policy "see your reports" on public.chat_reports for select to authenticated using (reporter = auth.uid());
revoke all on table public.chat_reports from anon;

-- three reports hide a message for everyone
create function public.chat_report_hide() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.chat_reports where message_id = new.message_id) >= 3 then
    update public.chat_messages set hidden = true where id = new.message_id;
  end if;
  return new;
end $$;
create trigger chat_report_hide after insert on public.chat_reports for each row execute function public.chat_report_hide();

create table public.help_requests (
  id uuid primary key default gen_random_uuid(),
  from_user uuid not null default auth.uid() references auth.users (id) on delete cascade,
  to_user uuid not null references auth.users (id) on delete cascade,
  kind text not null check (kind in ('tutor', 'mentor')),
  from_name text not null default '',
  to_name text not null default '',
  subject text not null default '' check (length(subject) <= 80),
  message text not null check (length(btrim(message)) between 5 and 1500),
  reply text not null default '' check (length(reply) <= 1500),
  status text not null default 'open' check (status in ('open', 'answered', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (from_user <> to_user)
);
create index help_requests_to on public.help_requests (to_user, created_at desc);
create index help_requests_from on public.help_requests (from_user, created_at desc);
alter table public.help_requests enable row level security;
create policy "both sides read" on public.help_requests for select to authenticated using (from_user = auth.uid() or to_user = auth.uid());
create policy "ask as yourself" on public.help_requests for insert to authenticated with check (from_user = auth.uid());
create policy "the tutor or mentor replies" on public.help_requests for update to authenticated using (to_user = auth.uid()) with check (to_user = auth.uid());
create policy "the asker withdraws" on public.help_requests for delete to authenticated using (from_user = auth.uid());
revoke all on table public.help_requests from anon;

-- a request goes only to someone offering that kind of help; names are filled in here; the asker's words can't be
-- changed by the person replying, and replies follow the same contact-details rule as chats
create function public.help_request_check() returns trigger language plpgsql security definer set search_path = public as $$
declare a text; b text;
begin
  if tg_op = 'INSERT' then
    select display_name into a from public.community_profiles where user_id = new.from_user;
    if a is null then raise exception 'Make a community profile first.' using errcode = '42501'; end if;
    select display_name into b from public.community_profiles where user_id = new.to_user and ((new.kind = 'tutor' and is_tutor) or (new.kind = 'mentor' and is_mentor));
    if b is null then raise exception 'That person isn''t offering this kind of help any more.' using errcode = '22023'; end if;
    new.from_name := a; new.to_name := b; new.reply := ''; new.status := 'open';
    if (select count(*) from public.help_requests where from_user = new.from_user and created_at > now() - interval '1 day') >= 10 then raise exception 'You''ve sent 10 requests today. Try again tomorrow.' using errcode = '54000'; end if;
  else
    new.id := old.id; new.from_user := old.from_user; new.to_user := old.to_user; new.kind := old.kind; new.from_name := old.from_name; new.to_name := old.to_name; new.subject := old.subject; new.message := old.message; new.created_at := old.created_at;
    new.updated_at := now();
  end if;
  if new.message ~* '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}' or regexp_replace(new.message, '[^0-9]', '', 'g') ~ '[0-9]{9,}' or new.reply ~* '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}' or regexp_replace(new.reply, '[^0-9]', '', 'g') ~ '[0-9]{9,}' then
    raise exception 'For everyone''s safety, email addresses and phone numbers can''t be shared here. Keep the conversation on Gradify.' using errcode = '22023';
  end if;
  return new;
end $$;
create trigger help_request_check before insert or update on public.help_requests for each row execute function public.help_request_check();

-- ---------- what others can see, through functions only ----------
-- tutors or mentors, optionally for a subject: name, subjects, bio, rate or stage
create function public.community_directory(p_kind text, p_subject text) returns table (user_id uuid, display_name text, subjects text, bio text, detail text) language sql stable security definer set search_path = public as $$
  select c.user_id, c.display_name, array_to_string(c.subjects, '|'), c.bio, case when p_kind = 'tutor' then c.tutor_rate else c.mentor_stage end
  from public.community_profiles c
  where auth.uid() is not null and ((p_kind = 'tutor' and c.is_tutor) or (p_kind = 'mentor' and c.is_mentor))
    and (coalesce(p_subject, '') = '' or p_subject = any (c.subjects))
  order by c.updated_at desc limit 100
$$;
-- someone to follow, by their friend code: just their name
create function public.find_by_friend_code(p_code text) returns table (user_id uuid, display_name text) language sql stable security definer set search_path = public as $$
  select user_id, display_name from public.community_profiles where auth.uid() is not null and friend_code = upper(btrim(p_code)) limit 1
$$;
-- the people a learner follows, by name
create function public.my_friends() returns table (user_id uuid, display_name text) language sql stable security definer set search_path = public as $$
  select c.user_id, c.display_name from public.follows f join public.community_profiles c on c.user_id = f.followee where f.follower = auth.uid() order by c.display_name
$$;
-- a group's members, by name, for its members only
create function public.group_people(p_group uuid) returns table (user_id uuid, display_name text) language sql stable security definer set search_path = public as $$
  select m.user_id, coalesce(c.display_name, 'A learner') from public.group_members m left join public.community_profiles c on c.user_id = m.user_id
  where m.group_id = p_group and public.is_group_member(p_group) order by m.joined_at
$$;
-- join a group by its code
create function public.join_group(p_code text) returns jsonb language plpgsql security definer set search_path = public as $$
declare g public.study_groups;
begin
  if auth.uid() is null then return jsonb_build_object('ok', false, 'reason', 'signed_out'); end if;
  select * into g from public.study_groups where code = upper(btrim(p_code));
  if g.id is null then return jsonb_build_object('ok', false, 'reason', 'no_group'); end if;
  if (select count(*) from public.group_members where group_id = g.id) >= 50 then return jsonb_build_object('ok', false, 'reason', 'full'); end if;
  insert into public.group_members (group_id, user_id) values (g.id, auth.uid()) on conflict do nothing;
  return jsonb_build_object('ok', true, 'id', g.id, 'name', g.name);
end $$;
-- leaderboards: XP this week and in all, from the activity log. 'friends' is you and who you follow; 'school' is
-- everyone at your school (as you typed it) who shows on leaderboards; 'group:<id>' is a group you're in.
create function public.leaderboard(p_scope text) returns table (display_name text, xp_week bigint, xp_total bigint, me boolean) language plpgsql stable security definer set search_path = public as $$
declare uid uuid := auth.uid(); my_school text;
begin
  if uid is null then return; end if;
  select lower(btrim(school)) into my_school from public.community_profiles where user_id = uid;
  return query
    with people as (
      select c.user_id, c.display_name from public.community_profiles c
      where (c.on_leaderboards or c.user_id = uid) and (
        (p_scope = 'friends' and (c.user_id = uid or c.user_id in (select followee from public.follows where follower = uid)))
        or (p_scope = 'school' and my_school is not null and my_school <> '' and lower(btrim(c.school)) = my_school)
        or (p_scope like 'group:%' and public.is_group_member(substr(p_scope, 7)::uuid) and c.user_id in (select gm.user_id from public.group_members gm where gm.group_id = substr(p_scope, 7)::uuid))
      )
    )
    select p.display_name,
      coalesce(sum(a.xp) filter (where a.at >= date_trunc('week', now())), 0)::bigint,
      coalesce(sum(a.xp), 0)::bigint,
      p.user_id = uid
    from people p left join public.activity a on a.user_id = p.user_id
    group by p.user_id, p.display_name
    order by 2 desc, 3 desc limit 100;
end $$;

revoke all on function public.is_group_member(uuid) from public, anon;
revoke all on function public.community_directory(text, text) from public, anon;
revoke all on function public.find_by_friend_code(text) from public, anon;
revoke all on function public.my_friends() from public, anon;
revoke all on function public.group_people(uuid) from public, anon;
revoke all on function public.join_group(text) from public, anon;
revoke all on function public.leaderboard(text) from public, anon;
revoke all on function public.chat_message_check() from public, anon, authenticated;
revoke all on function public.chat_report_hide() from public, anon, authenticated;
revoke all on function public.help_request_check() from public, anon, authenticated;
revoke all on function public.study_group_owner_joins() from public, anon, authenticated;
grant execute on function public.is_group_member(uuid) to authenticated;
grant execute on function public.community_directory(text, text) to authenticated;
grant execute on function public.find_by_friend_code(text) to authenticated;
grant execute on function public.my_friends() to authenticated;
grant execute on function public.group_people(uuid) to authenticated;
grant execute on function public.join_group(text) to authenticated;
grant execute on function public.leaderboard(text) to authenticated;

-- ---------- Tools ----------
-- notebook pages live with decks and maps
alter table public.tool_items drop constraint tool_items_kind_check, add constraint tool_items_kind_check check (kind in ('deck', 'map', 'note'));

-- the Free allowance knows the new tools (5 uses each, like the others)
create or replace function public.take_allowance(p_bucket text, p_item text) returns jsonb language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); lim int; n int;
begin
  if uid is null then return jsonb_build_object('ok', true, 'reason', 'signed_out'); end if;
  if public.plus_allowed_for(uid) then return jsonb_build_object('ok', true, 'unlimited', true); end if;
  lim := case
    when p_bucket ~ '^lesson:[a-z0-9-]{1,40}$' then 10
    when p_bucket in ('flashcards', 'map') then 5
    when p_bucket ~ '^tool:(search|map|cards|convert|explain|podcast|audio|poster|sheets|quiz|games|handwriting|youtube)$' then 5
  end;
  if lim is null then return jsonb_build_object('ok', false, 'reason', 'unknown_allowance'); end if;
  if p_item is null or length(p_item) not between 1 and 200 then return jsonb_build_object('ok', false, 'reason', 'bad_item'); end if;
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
grant execute on function public.take_allowance(text, text) to authenticated;
