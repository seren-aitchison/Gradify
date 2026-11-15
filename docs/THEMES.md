# Light and dark mode

Every page on every Gradify site has a light and a dark theme. Dark, Gradify's own look, is the default.

## How a learner chooses
- **The top bar:** a sun/moon button on every page switches between the two.
- **Settings:** Settings → Your learning → Appearance offers Dark, Light or Match my device. "Match my device" follows the device and changes live when the device does.
- **Where it's kept:** in this browser (`localStorage["gradify.theme"]`), like the device's own appearance setting, so it isn't synced to the account. It applies on every Gradify site, and other open tabs update straight away.

## How it works
- **Setting the theme:** `kit/core/theme-boot.js` is a classic script loaded straight after `kit/styles/base.css` in every page's `<head>`. It sets `<html data-theme="dark|light">` before the first paint, so a page never flashes the wrong colours. It also adds the top-bar button and exposes `window.gradifyTheme` (`get`, `set`, `resolved`).
- **Tokens:** colours are tokens in `kit/styles/base.css`:
  - `--bg`, `--fg`, `--mute`, `--faint` for the page and text.
  - `--ink-rgb` for lines, fills and highlights.
  - `--surface-rgb` for glass panels.
  - `--sink-rgb` for wells.
  - `--invert-bg` and `--invert-fg` for the high-contrast button.

  `:root[data-theme="light"]` redefines them, and sets `color-scheme: light`, so `light-dark()` pairs resolve too.
- **Converting colours:** `scripts/theme-tokens.mjs` turned the stylesheets' hard-coded dark-theme colours into tokens:
  - White ink becomes `--ink-rgb`, and dark glass becomes `--surface-rgb`.
  - White text becomes `--fg`, except on coloured backgrounds.
  - White buttons become inverted.
  - Dark gradient stops get a light tint of the same hue, and pastel text gets a darker shade (`light-dark()`, with the original kept as a fallback).
  - Shadows and the 3D glass icons are left alone.
- **Dark islands:** some things stay dark in light mode: 3D stages, the Earth map, lab canvases, and the app pictured on the homepage. So do cards painted in a brand colour. These carry the dark tokens (`ISLANDS` in the script, and the island rule at the end of `base.css`).
- **Overrides:** the few hand-written light-mode rules are at the end of `base.css`.

## Adding CSS
Write colours as tokens (`var(--fg)`, `rgba(var(--ink-rgb), .1)`, `var(--panel)`). If you write a hard-coded dark-theme colour, `tests/theme.test.mjs` fails and tells you to run:

```bash
node scripts/theme-tokens.mjs
```

The script is idempotent: a second run changes nothing.
