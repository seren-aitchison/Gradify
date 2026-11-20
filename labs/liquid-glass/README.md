# Liquid Glass material lab

A research prototype for a premium glass material that keeps Gradify's identity: near-black surfaces, white Geist type and indigo-to-teal accents. It is not linked from the site, and `scripts/build-site.mjs` never publishes `labs/`.

Open it with any static server from the repository root, at `/labs/liquid-glass/`. The page reads these URL options, which make screenshots repeatable:
- `mode`: `css`, `svg` or `gl`
- `bg`: `dark`, `light`, `colour`, `lesson` or `motion`
- `angle`: the light direction in degrees

## What's on the page

**Four surfaces**, each the same material at a different thickness:

| Surface | Glass | Frost | Bevel |
|---|---|---|---|
| Navigation bar | Nearly clear | Light | Thin |
| Dashboard card | Frosted | Full | Medium |
| Floating round button | Fully clear | None | Deep |
| Overlay panel | Thick, tinted | Full | Wide |

**Five backgrounds:**
- Dark: Gradify black, with a grid and lesson text.
- Light: the light theme, with a dot grid and pastel colour.
- Colourful: the Gradify spectrum.
- Lesson: stripes, a warm glow and dense text. This is the hardest case.
- Animated: moving colour and scrolling text.

**Interactions:**
- The light follows the pointer. You can also turn that off and set it with a slider.
- You can drag the card, the button and the panel across the background.
- The Refraction slider sets how strongly the surfaces bend what's behind them.

## The three renderers

### CSS
How it's built:
- `backdrop-filter: blur() saturate() brightness()` over a tint.
- A 1.5px rim drawn with a conic gradient whose brightest point faces the light. It sits in `::before`, masked so only the edge shows.
- A gloss falling from the lit corner (`::after`).
- An inset highlight on the lit edge and inset shade on the far edge, both moved by `--lx`/`--ly`.

Result: clean and cheap. But it can only blur, never bend what's behind it, so next to the others it reads as good glassmorphism rather than glass. It is the right fallback.

### SVG refraction
How it's built:
- For each surface, a script builds a displacement map at that surface's exact size and corner radius. The map is a signed-distance rounded rectangle with a bevel that only bends near the rim.
- The map goes into `backdrop-filter: url(#lens)`.
- The displacement runs three times, at 100%, 97% and 94% strength. Each pass keeps one colour channel, and the three are screen-blended. That splits the colours slightly at the edge, as real glass does.

Result: the edges really bend and magnify what's behind them. Limitations:
- **Chromium only.** Safari and Firefox ignore SVG filters inside `backdrop-filter`.
- The map has to be rebuilt when a surface changes size.
- The light can't move the refraction itself, only the CSS rim on top of it.

### WebGL shader
How it's built: the background becomes a texture, and one fragment shader draws all four surfaces. For each surface it uses:
- a signed-distance rounded rectangle with a circular bevel;
- refraction through the bevel, plus a slight overall magnification;
- colour splitting at the edge;
- frost taken from a quarter-size blurred copy of the background. Taking many samples gave ghosted copies of the text, so it doesn't do that;
- a tint;
- Fresnel brightening at grazing angles;
- a Blinn-Phong specular highlight from the pointer's light;
- shade on the side away from the light;
- a hairline rim and a soft contact shadow.

It redraws only when something changes, and the pixel ratio is capped at 1.5.

Result: **the most convincing by a clear margin.**
- The round button reads as a glass marble: the stripes and text bend round its rim.
- The panel has a thick, lit edge.
- In light mode the white glass looks solid and wet rather than milky.

## Verdict

| | CSS | SVG refraction | WebGL shader |
|---|---|---|---|
| Looks like real glass | No: frosted panels | Partly: real bending at the edges | Yes |
| Light-reactive | Rim and gloss | Rim and gloss | Highlight, Fresnel, shade, rim |
| Browsers | All with `backdrop-filter` | Chromium | All with WebGL |
| Glass over live DOM | Yes | Yes | No: the background must be a texture |
| Relative cost, animated background* | 50 fps | 21 fps | 7 fps, but 0.8 ms per redraw when only the light or a surface moves |

\* Headless Chromium with software rendering (no GPU), so only the ratios mean anything. Almost all of WebGL's cost in that row is repainting and re-uploading a full-screen 2D canvas every frame. A real hero would draw its background in the shader or upload it once.

### Recommendation

Use all three, each where it fits:
1. **CSS everywhere, as the base material.** Bring in the rim tied to the light, the corner gloss and the lit-edge shading as Gradify components. This is the fallback for every browser and for reduced transparency.
2. **SVG refraction as an enhancement in Chromium**, on small, fixed-size controls such as the phone dock, the floating buttons and the toolbar. Build each lens once per size.
3. **WebGL only for hero surfaces whose background Gradify owns.** Good candidates are the course home hero, Up next, the folder backs and a "lesson complete" moment. These sit over art Gradify paints itself, so the shader can have the background as a texture. Not for text-heavy reading surfaces.

### What to adopt (components)

- **`gx-glass`**: the CSS material, with `--frost`, `--tint`, the light-facing rim, the gloss and lit-edge shading. Variants: `clear`, `frosted`, `thick`.
- **`lens.js`**: builds SVG lenses (a displacement map per size, cached by width × height × radius). Turned on only in Chromium and when transparency isn't reduced.
- **`glass-gl.js`**: the shader renderer for up to 8 surfaces over a background Gradify paints. It redraws on demand, caps the pixel ratio and pauses when hidden.
- **`light.js`**: one shared light direction (`--lx`, `--ly`, `--la`). It follows the pointer on desktop and could follow device tilt on phones. It stays still under reduced motion.

## Screenshots (`shots/`)

- `contact-sheet.png`: every renderer (columns) over every background (rows).
- `nav.png`, `card.png`, `fab.png`, `panel.png`: each surface close up, comparing CSS (left) with WebGL (right), over the lesson background (top) and the light background (bottom).
- `drag-light45.png`: the light moved to the lower right and the button dragged over the heading, in CSS, SVG and WebGL.
