# Organising: folders, tags and the curriculum

Gradify lets learners organise without making them administrators of their own learning. There are three ways a
thing is placed, and they are kept apart on purpose:

| | What it says | Who sets it | Example |
| --- | --- | --- | --- |
| **Folders** | where the learner keeps it | the learner | My mock exam revision › Chemistry |
| **Tags** | what it's like | the learner (Gradify suggests) | difficult, priority, homework, memorise |
| **Curriculum** | what it teaches | Gradify, from the course and the specification | AQA GCSE Chemistry › 4.6 › 4.6.2 |

One lesson can be in a folder, carry two tags and be mapped to the curriculum, and it is still one thing. A folder
holds a reference to the lesson, never a copy, and tags and curriculum points are labels on that same thing. The
Organise dialog (••• → Save to a folder, **S**, or Tags, **G**, on anything) shows all three side by side. Curriculum
is read-only there.

Code: `kit/data/organise.js` (the model; pure functions tested in `tests/organise.test.mjs`),
`kit/app/collections-view.js` (the Collections screen), `kit/ui/resource-actions.js` (`organiseDialog`).

## Where it's kept

- **Folders.** Each folder is a collection in the learner's record: kind `collection`, with `name`, and optionally
  `parent`, `colour`, `icon`, `desc`, `archived`, `order` and `smart: { q }`. What's in a folder is kind `collitem`,
  with an `order` the learner sets by dragging. Both sync to every device.
- **Tags.** One entry per tagged thing, kind `tag`, keyed by the thing's universal id, with `{ r, tags }`. They sync
  too. `supabase/migrations/20261128120000_learner_state_tags.sql` adds the kind to the table's check constraint.
- **Recently deleted** (`gradify.trash`) stays on this device for 30 days.
  - A deleted folder keeps its folders, what was in them and their order.
  - A deleted flashcard set keeps its cards, with where each card had got to, so restoring it brings the learning
    back too.

## The features (151–175)

| # | Feature | Where |
| --- | --- | --- |
| 151 | Nested folders | "Folder inside" on a folder; drag a folder onto another; Edit → Inside. A folder can never go inside itself, and a loop made by two devices is shown at the top level |
| 152 | Smart collections | "Smart folder": filled by a search such as `tag:difficult done:no` or `type:flashcards in:course:chemistry` (the query language in docs/SEARCH.md), kept up to date, nothing copied |
| 153 | Manual collections | "New folder", and Save to a folder from any ••• menu |
| 154 | Tags | ••• → Tags (**G**) on anything; tag several at once from a folder or the Library; `#/collections/tags` to rename or delete |
| 155 | Auto-tagging | Suggested tags in the Organise dialog: its subject, its topic, what kind of thing it is, and "revisit" when it has questions to get right. Suggestions only: the learner adds them |
| 156 | Multiple-folder references | A folder holds references: the same thing in several folders is one thing, with nothing duplicated |
| 157 | Folder colours | Edit → Colour (nine, plus none), shown on the card, the icon and the progress bar |
| 158 | Folder icons | Edit → Icon (sixteen) |
| 159 | Folder descriptions | Edit → Description, shown under the name |
| 160 | Folder progress | How much of what's in it (and in the folders inside it) is done, how much is in progress, and when something was last added |
| 161 | Folder-level filtering | In a folder: by kind, by tag, and "Not finished" |
| 162 | Folder sorting | Your order (drag), recently added, title or type; and the folders by your order, name, recently changed or size |
| 163 | Folder search | "Find in this folder", and "Search inside", which opens Search scoped to the folder |
| 164 | Drag and drop | Folders: drag onto a folder to put it inside, or onto the top of one to put it before. Items: drag into your order, or onto a folder above to move them there. Alt+↑/↓ does the same from the keyboard |
| 165 | Breadcrumb navigation | Collections › Mock revision › Chemistry on every folder |
| 166 | Bulk organisation | Select several: move, copy, tag, export or remove things; move folders into a folder, archive, duplicate, export or delete them; tag sets from the Library |
| 167 | Templates | "From a template": Mock exam revision, Course by topic (a folder for each unit of a chosen course), Project or coursework, and This week. They include smart folders |
| 168 | Duplicate detection | "Possible duplicates" on Collections: the same title of the same kind (ignoring "(copy)"), or flashcard sets with 80% of their cards in common. Each group has "Not duplicates"; nothing is merged or deleted for the learner |
| 169 | Archive | Archive a folder, or several, to hide it without deleting it. Archived folders are listed under "Archived" and can be unarchived |
| 170 | Recently deleted | `#/collections/trash`: folders and flashcard sets for 30 days, with Restore and Delete now. Every delete also has Undo on its notice |
| 171 | Ownership | "Yours" or "Gradify" on everything in a folder, in search results and in the Organise dialog |
| 172 | Visibility | Gradify (the same for every learner), Private (in your account, or on this device when signed out), or Shared (with a link) |
| 173 | Organisational suggestions | "Not in a folder yet" on Collections: the learner's own sets, notes and maps that aren't in a folder, each with the folder it most likely belongs in (by name, subject, course and what's already there) and "Choose a folder…". The Organise dialog suggests folders too |
| 174 | Universal organisation | The same ••• menu (Save to a folder, Tags) on lessons, units, specification points, flashcard sets, Notes documents, mind maps, notebook pages and every app screen, and on Search results |
| 175 | Flexible views | Grid, list and compact, for folders and for what's in a folder (remembered on this device) |

## Limits

- **Recently deleted stays on one device.** It is the device that did the deleting. A folder deleted there is gone
  on the learner's other devices straight away.
- **Smart folders can't be ordered by hand.** Their contents come from a search, so items can't be dragged into an
  order or taken out. Changing the search changes what they hold.
- **Visibility is only known for some things.** "Shared" is shown where Gradify knows about the sharing: Notes
  documents shared with a link. Nothing else in Gradify is shared yet.
