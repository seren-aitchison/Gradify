# Gradify Design System: component usage guide

How to use each shared component in `kit/styles/system.css`: what it's for, the markup, and how it behaves on
phones, in light and dark, from the keyboard and with a screen reader, and in its error, empty and edge states.
The live examples are on the review page, `labs/design-system/` (never published: open it from a local server at the
repository root, then add `?theme=light` or `?theme=dark` to compare themes).

**Status: for review.** Only the Gradify homepage uses the system today, and only the editorial components. No subject
site uses these components yet; that waits for approval. `tests/design-tokens.test.mjs` fails if a component class is
missing from this guide.

## Rules that apply to every component

- **Tokens only.** Colour, type, spacing, radius and motion come from `--ds-*` variables (`kit/design/tokens.json`).
  No hex values, no `!important`, no page-specific overrides copied from `assets/styles.css`. If a component needs a
  value that isn't a token, add the token (both themes) instead.
- **Light and dark come free.** Each component reads the same tokens in both themes; nothing needs a theme-specific
  rule. Test both anyway: `?theme=light` and `?theme=dark` on the review page.
- **Contrast** (checked by tests): body and secondary text at least 4.5:1 on every surface; status text 4.5:1 on its
  own background; input borders (`--ds-field`) and focus rings (`--ds-focus`) at least 3:1 on every surface.
  `--ds-line` is for decorative separators only, never for the edge of a control.
- **Meaning is never colour alone.** A success, warning or error always has a word that says so.
- **Keyboard.** Everything that works with a pointer works with Tab, Shift+Tab, Enter and Space, with a visible
  focus ring. Never remove an outline without a replacement of at least 3:1.
- **Touch.** Interactive targets are at least 44px tall on phones (buttons are 48px; the header button is 34px on
  larger screens and 44px on phones), except dense footer links, which meet the 24px WCAG 2.2 minimum.
- **Motion.** Everything still for reduced motion: the device setting, or the learner's own (`html[data-motion="reduce"]`,
  Reading and accessibility).
- **Phones.** Check every use at 320px wide: nothing may scroll sideways.

## Page structure

### Header: `.ds-header`

A sticky, translucent bar: brand on the left, links, then one action.

```html
<a class="skip-link" href="#main">Skip to content</a>  <!-- .skip-link: kit/styles/base.css -->
<header class="ds-header">
  <a class="ds-brand" href="/">Gradify</a>
  <nav aria-label="Main"><a href="/explore.html" aria-current="page">Explore</a><a href="/pricing.html">Pricing</a></nav>
  <a class="ds-btn" href="/app.html#/new">Start free</a>
</header>
```

- **Use:** one per page, first in the body after the skip link. At most one `.ds-btn` in it.
- **Phones (≤ 640px):** brand and action share the first row; the links move to their own full-width row that scrolls
  sideways, with a fade at the right edge that shows there's more. Keep labels to one or two words.
- **Light/dark:** the bar is the page background at 80% with a blur, and a `--ds-line` hairline beneath.
- **Keyboard and screen readers:** links are in reading order; the current page has `aria-current="page"` (shown in
  full-strength text); give the `<nav>` an `aria-label`. Focus ring: 3px `--ds-focus`.
- **Don't:** put a search box, a second button or a menu of more than six links in it.

### Footer: `.ds-footer`

Small grey type in columns (`.ds-footer-cols`), a hairline, then `.ds-legal`.

```html
<footer class="ds-footer">
  <div class="ds-footer-cols">
    <div><h3>Study</h3><ul><li><a href="/explore.html">Explore subjects</a></li></ul></div>
  </div>
  <p class="ds-legal">© Gradify</p>
</footer>
```

- **Phones:** columns wrap to fit (160px minimum each).
- **Keyboard and screen readers:** the column headings are real headings; links underline on hover and show the focus
  ring. Footer links are 26px tall (WCAG 2.2's 24px minimum); keep at least 4px between them.

### Section: `.ds-section`, `.alt`, `.tight`

A full-width band with generous vertical space, centred. `.alt` is the soft grey band; `.tight` has less space.

- **Use:** alternate plain and `.alt` bands down a marketing page. Content pages and the app don't use bands.
- **Phones:** the vertical space scales down with the screen (`--ds-space-section` is fluid).

## Type

| Class | Use | Notes |
| --- | --- | --- |
| `.ds-eyebrow` (`.accent`) | A short label above a headline | `.accent` uses `--ds-link`. Not a heading: use a `<span>` or `<p>` |
| `.ds-hero` | The one main headline on a marketing page | `<h1>`. One per page |
| `.ds-title` | Section headlines | `<h2>` |
| `.ds-heading` | Tile and card group headings | `<h3>` |
| `.ds-lead` | The sentence under a headline | `<b>` inside is full-strength text |
| `.ds-spectrum` | The brand gradient on one phrase | At most one per page. A deeper gradient in light mode keeps it readable. Screen readers read it as ordinary text |

Keep heading levels in order (h1 → h2 → h3) whatever the visual size. All type sizes are fluid, so check the longest
headline at 320px.

## Actions

### Buttons: `.ds-btn`, `.ds-btn.secondary`

```html
<a class="ds-btn" href="/app.html#/new">Turn my notes into a course</a>
<button class="ds-btn secondary" type="button">See an example</button>
```

- **Use:** `<a>` when it goes somewhere, `<button type="button">` when it does something on the page. One primary
  button per view; `.secondary` (an outline in the link colour) only for a real alternative.
- **Group:** `.ds-actions` lays out buttons and links side by side, centred; on phones they stack.
- **Size:** 48px tall. Write the label as what happens ("Turn my notes into a course"), not "Submit" or "Click here".
- **Keyboard:** Enter activates links and buttons; Space activates buttons. Focus ring: 3px, offset 3px.
- **States:** hover lightens; pressed scales to 98% (still for reduced motion). There is **no disabled style**:
  rather than greying out a button, leave it enabled and say what's missing when it's pressed (see Fields). If a
  disabled state turns out to be needed, it gets a design and a token first.

### More link: `.ds-more`

"Learn more ›" for going deeper. The chevron is added by CSS.

```html
<a class="ds-more" href="#flashcards">Learn more<span class="ds-sr-only"> about flashcards</span></a>
```

- **Screen readers:** if several "Learn more" links share a page, make each unique with `.ds-sr-only` text, as above, or `aria-label`.
- **Touch:** 44px tall.

## Cards and badges

### Card: `.ds-card` in `.ds-cards`

A surface with a hairline. With a `.ds-card-link` inside, the whole card is clickable.

```html
<div class="ds-cards">
  <article class="ds-card">
    <span class="ds-badge success">74% mastered</span>
    <h3><a class="ds-card-link" href="/scigradify/maths/">GCSE Maths</a></h3>
    <p>Higher tier, every topic with worked examples.</p>
  </article>
</div>
```

- **Use:** the link goes on the card's heading, so the card is announced by its name. One card-wide link per card.
  Any other control inside (a pin button, a second link) is lifted above the card-wide link and stays separately
  clickable; put it after the heading in the markup.
- **Phones:** `.ds-cards` is a grid of 260px-minimum columns; on a phone, one column.
- **Keyboard:** Tab reaches the card's link; the focus ring is drawn around the whole card. Enter opens it.
- **States:** hover lifts the card 2px (still for reduced motion). A card without a link stays still.
- **Don't:** nest cards, or put a whole form in one.

### Badge: `.ds-badge` (`.accent`, `.success`, `.warning`, `.danger`)

A short label: a level, a status, "New".

```html
<span class="ds-badge warning">Due today</span>
```

- **Use:** one or two words. Neutral by default; a colour only when it carries meaning, and the word must say the
  same thing (never a coloured dot alone).
- **Light/dark:** each status has its own background token; text is 4.5:1 on it in both themes.
- **Screen readers:** read as plain text in place. If a badge only makes sense with the card's title, keep it inside
  the card. Badges are not interactive.

## Forms

### Field: `.ds-field`, `.ds-input`, `.ds-hint`, `.ds-error`

Label above, input, then a hint; an error replaces the hint.

```html
<div class="ds-field">
  <label for="email">Email</label>
  <input class="ds-input" id="email" type="email" autocomplete="email" aria-describedby="email-hint">
  <p class="ds-hint" id="email-hint">We'll send one link, nothing else.</p>
</div>

<!-- after a failed check -->
<div class="ds-field">
  <label for="name">Course name</label>
  <input class="ds-input" id="name" aria-invalid="true" aria-describedby="name-err">
  <p class="ds-error" id="name-err">Give the course a name.</p>
</div>
```

- **Labels:** always a visible `<label for>`; never a placeholder instead of a label. Mark optional fields
  "(optional)" rather than marking required ones with a star.
- **Errors:**
  - Check when the form is sent, or when the learner leaves a field. Never check while they're still typing.
  - Set `aria-invalid="true"`, which gives the danger border, and point `aria-describedby` at the error.
  - Write the error as what to do ("Give the course a name"), not what went wrong ("Invalid input").
  - On sending, move focus to the first field with an error. If there are several, show a `.ds-notice.danger` with
    `role="alert"` above the form that lists them.
- **Border and focus:** the border is `--ds-field` (3:1 on every surface). Focus adds a solid 2px `--ds-focus` ring,
  offset 2px.
- **Phones:**
  - Inputs are 48px tall with 17px text, which stops iOS zooming in.
  - Use the right `type` and `autocomplete` so the right keyboard appears.
- **Light/dark:** inputs sit on `--ds-surface` and the placeholder is `--ds-fg-2`. A placeholder is only an example,
  never the instruction.

### Search: `.ds-search`

A rounded search box with its icon.

```html
<label class="ds-search">
  <svg aria-hidden="true">…</svg>
  <span class="ds-sr-only">Search subjects</span>
  <input class="ds-input" type="search" placeholder="Search subjects">
</label>
```

- **Use:** a visible label (`.ds-label` with `aria-labelledby`), or a screen-reader-only one (`.ds-sr-only`) as above when the context
  makes the purpose obvious. The icon is decorative (`aria-hidden`).
- **Keyboard:** Escape clears a `type="search"` input in most browsers. If results update as you type, announce the
  count in a `role="status"` region ("12 subjects").
- **Empty results:** show a `.ds-empty` that says what was searched and offers a next step ("No subjects match
  'astro'. Clear the search").
- **Border:** the search box keeps the `--ds-field` border, because its grey fill alone is only 1.1:1 against the page.

## Feedback

### Notice: `.ds-notice` (`.info`, `.success`, `.warning`, `.danger`)

An inline message in the flow of the page.

```html
<div class="ds-notice warning" role="status"><p><b>You're offline.</b> Everything you do is saved on this device and syncs when you're back.</p></div>
```

- **Roles:**
  - `role="status"` for news that can wait: saved, offline, a unit completed.
  - `role="alert"` only for errors that need attention now: a failed sign-in, or a form that didn't send.
  - Use no role for a notice that's part of the page when it loads.
- **Writing:** a bold first phrase says what happened. The rest says what it means and what to do. Offline,
  sign-in expired and sync failures say plainly that work is saved on the device.
- **Light/dark:** each status has its own background and a 4px edge in the status colour; text stays `--ds-fg`.
- **Not for** what an action just did: that's a toast with Undo (`kit/ui/feedback.js`).

### Empty state: `.ds-empty`

Says why there's nothing here, and offers the next step.

```html
<div class="ds-empty"><h3>No bookmarks yet</h3><p>Bookmark any page in a course and it'll wait for you here.</p><a class="ds-btn secondary" href="/explore.html">Browse courses</a></div>
```

- **Use:** a heading at the right level for its place, one sentence, at most one action. Never just "Nothing here".
- **Loading is not empty:** while data loads, show a skeleton of what's coming (the UX rules in `DESIGN-SYSTEM.md`),
  and only show the empty state once loading has finished.

## Numbers

### Stat: `.ds-stat` in `.ds-stat-row`; `.ds-stats` for marketing

```html
<div class="ds-stat-row"><div class="ds-stat"><b>12</b><span>day streak</span></div></div>
<dl class="ds-stats"><div><dt>schools of law</dt><dd>19</dd></div></dl>
```

- **Use:** `.ds-stat` in the app and on progress pages; `.ds-stats` (a `<dl>`, the number shown first) on marketing
  pages. Numbers use tabular figures so they don't jump as they change.
- **Screen readers:** `.ds-stat` reads "12 day streak". `.ds-stats` reads the term and then the number.
- **Phones:** both wrap; keep the labels to two or three words.
- **Zero and missing:** show "0", not a blank. If a number can't be known yet, show "–" with a label that explains.

## Marketing moments

| Class | Use | Keyboard, screen readers, phones |
| --- | --- | --- |
| `.ds-tiles` / `.ds-tile` | Flat feature tiles in a grid; on an `.alt` band they turn white | Tiles aren't interactive; a link goes inside as `.ds-more`. One column on phones |
| `.ds-shot` | A large product screenshot in a `<figure>` with a caption | Real `alt` text describing what it shows; the caption is visible text |
| `.ds-zoom` | The screenshot opens up as it scrolls into view (`kit/ui/reveal.js`) | One per page. Still for reduced motion |
| `.ds-reveal` | A calm fade-up for content below the fold (`mountReveal()`) | Never on the hero or anything above the fold. Content is visible without JavaScript: hiding only applies under `html.ds-js`, which the script sets |

## Before a component is used on a subject site

For each page it's added to, check and record:

1. Phone at 320px and 390px: no sideways scroll, targets 44px.
2. Light and dark: text, borders and focus visible (the repository's contrast check, `scripts/check-a11y.cjs`).
3. Keyboard only: every action reachable, in order, with a visible focus ring; Escape closes anything that opens.
4. Screen reader: names, roles and announcements as described above (VoiceOver on iPhone and Mac, TalkBack on
   Android).
5. Error, empty, loading and offline states shown and worded as above.
6. Reduced motion: nothing moves.
7. Nothing else on the page changes: URLs, saved progress and offline behaviour are unaffected.
