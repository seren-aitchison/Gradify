-- Assessment attempts: one row per answer, from any Gradify course (kit/assess/attempts.js, schema 1).
-- Rows are never updated: a later re-mark (for example human review of a short answer) is a new row.
-- Owner-only, like every learner table. Run after the earlier migrations.
create table public.assessment_attempts (
  id text primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  schema smallint not null default 1,
  site text not null,                       -- "LawGradify", "NurseGradify"…
  subject text not null,                    -- course slug: "law", "nursing", "physics"
  context text not null check (context in ('lesson', 'quiz', 'problems', 'exam', 'review', 'practice')),
  context_id text,                          -- the quiz, exam or interactive id
  question_id text not null,                -- permanent question id (registry.js)
  question_version integer,                 -- the version the learner answered
  question_type text not null,
  difficulty smallint check (difficulty between 1 and 3),
  objectives smallint[] not null default '{}',
  lesson_id text, module text, unit_id text,
  response jsonb,
  score numeric(4, 3) not null check (score between 0 and 1),
  correct boolean not null,
  attempt integer not null default 1,
  confidence smallint check (confidence between 1 and 3),
  ms integer,
  misconception text,
  marking_method text not null default 'auto' check (marking_method in ('auto', 'self', 'human', 'ai-assisted')),
  marking_status text not null default 'final' check (marking_status in ('final', 'provisional')),
  created_at timestamptz not null default now()
);
create index assessment_attempts_user_time on public.assessment_attempts (user_id, created_at);
create index assessment_attempts_user_question on public.assessment_attempts (user_id, question_id);
alter table public.assessment_attempts enable row level security;
create policy "own attempts: read" on public.assessment_attempts for select to authenticated using (user_id = auth.uid());
create policy "own attempts: add" on public.assessment_attempts for insert to authenticated with check (user_id = auth.uid());
create policy "own attempts: delete" on public.assessment_attempts for delete to authenticated using (user_id = auth.uid());
-- no update policy: attempts are append-only
