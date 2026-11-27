-- Tags in the learner's record (kit/data/organise.js, docs/ORGANISE.md): one entry per tagged resource, kind 'tag',
-- holding the learner's own labels for it ("difficult", "priority", "homework"), so tags follow the learner to every
-- device like their folders do.
--
-- Changes one check constraint on public.learner_state: the kinds it accepts gain 'tag'. Every existing row already
-- passes the new check (it only adds a kind). Changes no row, column, policy, function or trigger.
-- To undo: drop the constraint and add it again without 'tag' (after deleting any 'tag' rows).

alter table public.learner_state drop constraint if exists learner_state_kind_check, add constraint learner_state_kind_check check (kind in ('pin', 'tab', 'activity', 'link', 'collection', 'collitem', 'note', 'mistake', 'sched', 'tag'));
