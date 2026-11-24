# Catalogue benchmarks

Measured by `scripts/catalogue/harness.cjs`; the raw results are in `benchmark-2026-11-24.json`. CI repeats the run on
every push (the `catalogue` job keeps its results as an artifact).

**Run:** 24 November 2026, in the development container (Linux x64, 4 CPUs, Intel Xeon 2.10 GHz, Node 22). The phone
profile is Pixel 7 with the CPU slowed 4×. A container is not a real phone; these figures show the design's headroom,
not a guarantee on every device.

**Targets (Addendum A, A1.4):** each region's search index ≤ 300 KB gzipped, and first results p95 ≤ 100 ms warm.

## Results

| Dataset | Providers | Shard (gzipped) | Warm p50 / p95 / max | Cold, slow 3G | Offline (fresh reader, network off) | Loading message on slow 3G | Gate |
|---|---|---|---|---|---|---|---|
| Fixtures (fictional) | 9 | 0.3 KB | see JSON / 2.2 ms | 626 ms | 2 results | shown | must: **passed** |
| California-size sample (IPEDS 668) | 668 | 14.9 KB | see JSON / 7.1 ms | 934 ms | 8 results | shown | must: **passed** |
| All IPEDS institutions in one shard | 6,072 | 45.1 KB | see JSON / 13.1 ms | 1,704 ms | 8 results | shown | must: **passed** |
| Large region, **assumed** 25,000 | 25,000 | 119.8 KB | see JSON / 37.2 ms | 3,594 ms | 8 results | shown | must: **passed** |
| Stress: 50,000 in one shard | 50,000 | 221.2 KB | see JSON / 37.4 ms | 6,408 ms | 8 results | shown | report only: within targets |

**Notes:**
- Synthetic datasets are fictional names at the volumes measured in Stage 1. **25,000 is an assumption** for
  England-scale schools, because the GIAS row count isn't measured yet (Stage 1 blocker B9). It's re-run with the
  measured count in Stage 3.
- **Cold on slow 3G** (400 ms round trip, 400 kbit/s) has no target. The search box shows a loading message, and the
  student can keep typing. At 25,000 providers the first results take about 3.6 s. **Stage 5 should fetch the region's
  index as soon as the student picks a region**, before they type.
- "Warm" times run from the keystroke to the options being drawn, after the shard is loaded.

## Accessibility (automated)

- **axe-core 4.10.3** (WCAG 2.0/2.1 A and AA, plus best practice): **0 violations** in light and dark, with the list
  closed and open.
  - The first run found one: colour contrast of the highlighted option in dark mode. It was fixed by using
    Gradify indigo `#4641ff` with white text.
- **Keyboard:** all pass.
  - Tab reaches the input.
  - `aria-expanded` follows the list.
  - ↓ highlights the first option (`aria-activedescendant`, `aria-selected`).
  - ↑ wraps to "Not listed".
  - Home/End keep focus in the input.
  - Escape closes the list and keeps the text.
  - Enter chooses a catalogue record.
  - "Not listed" links nothing.
  - The choice is announced in the status region.

**Manual screen-reader checks are NOT automated and NOT yet done:** see `MANUAL-ACCESSIBILITY.md`.
