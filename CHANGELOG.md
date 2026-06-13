## Changelog

All notable changes to **Tiny Wire** are tracked here. Versioning follows [SemVer](https://semver.org/).

---

### v1.3 — 2026-06-12 · "Pedigree pass"

Additive, non-breaking. A systematic rigor + signature pass: warm-neutral foundation, a single cobalt accent, editorial type discipline, and a three-tier token architecture. Token **values** changed but no public token name was renamed or removed — anything built on the semantic tier inherits the refresh unchanged.

#### Added

- **Three-tier token architecture** — `primitive` (`--warm-*`, `--cobalt-*`, `--green-*`, `--clay-*`, `--red-*`, `--elevation-*`) → `semantic` (every existing name, now aliasing primitives) → `component` (`--button-bg`, `--card-shadow`, `--input-border`). The semantic tier is the public API; layering it this way is the headline structural change.
- `--cobalt-*` ramp — a single cool interactive accent (links / focus / secondary actions).
- `--elevation-sm/md/lg/xl` — a multi-layer, low-opacity, warm-tinted shadow scale. Role shadows (`--shadow-card`, `--shadow-modal`, …) now alias it.
- `--border-hairline` — a single low-opacity container signal for elevated surfaces.
- `--numeric-tabular` token + `.nums-tabular` utility; tabular + lining numerals applied to all data contexts (tables, slider readout, status stats, pagination).
- Disabled states for `.tab` and `.pagination-item`.

#### Changed

- Neutrals consolidated into one coherent warm-neutral ramp; the over-red `--border-dashed` desaturated into it.
- Accent repointed azure → cobalt; the two overlapping blues (accent + info) collapsed into one cobalt family; focus ring → cobalt.
- `--warning` brown → a disciplined amber (`--clay-600`); brown demoted to a foundation neutral only.
- Type: display sizes (`--text-xl`…`--text-4xl`) snapped to a 1.2 modular run; tracking moved from `px` → `em`; unused weight `300` dropped from the font load.
- Default `--radius` sharpened `10px` → `8px`; arbitrary spacing `5`/`7` snapped to `4`/`8`.
- Floating overlays (popover, menu, dialog, sheet, toast, command) swap their solid border for `--border-hairline` — elevation does the lifting. The baked `1px` ring removed from `--shadow-card`.

#### Fixed

- Dark `--text-tertiary` lifted `#948682` → `#A0928E` — the old value scored 4.05 on `--surface-inset`, under the 4.5:1 AA threshold. The live a11y checker now passes every pair in both themes.
- `lib/tokens.js` resynced to `globals.css` — three values had drifted (light/dark tertiary, dark disabled), shipping pre-AA hexes to any JS consumer.

---

### v1.2 — 2026-06-11 · "Sidebar rail"

Additive, non-breaking. Introduces the collapsed/icon-only form of the app sidebar.

#### Added

- `.sidebar--rail` — collapsed sidebar variant at `--sidebar-w` (56px). Reuses every existing `.sidebar*` rule and token; hides labels, centers icons, grows them to 20px. Active state unchanged (`.sidebar-link.active`).
- `docs/sidebar-rail.html` — standalone demo of the rail rendered through the system tokens (shown with the Shift product icons).

---

### v1.1.1 — 2026-05-20 · "Live checker findings"

Patch release. Shipped alongside the new live a11y checker at [`docs/a11y.html`](docs/a11y.html), which immediately surfaced five contrast issues across the v1.1 token set.

#### Changed

- `--text-tertiary` (light) darkened from `#7A6E6D` → `#6E625F`. The v1.1 nudge wasn't enough; the checker found tertiary still scored 4.22 / 4.48 on muted and subtle backgrounds, under the 4.5:1 AA threshold.

#### Documented (not yet fixed)

Five further findings logged on the audit page (F-014 through F-017) with explicit deferral reasons. The two real misses (brand-on-text, accent-button) need broader hue review and are scheduled for v1.2. Two are documented boundaries (subtle borders, disabled state) — known WCAG-exempt by design.

---

### v1.1 — 2026-05-20 · "First audit"

The first maintenance pass after v1.0 shipped. Twelve findings logged across accessibility, motion, and naming consistency. Six fixes landed. Zero breaking changes — every existing class still renders the same shape on screen; only colors, focus rings, and motion behaviour changed.

See the full audit narrative at [`docs/audit.html`](docs/audit.html).

#### Added

- `prefers-reduced-motion` honoured globally — ambient loops (`monitoring-dot`, `skeleton-shimmer`) freeze; entrance animations collapse to instant.
- `.banner-warn` — fills the gap with `.alert-warn` and `.chip-warn`.
- `.checkbox:indeterminate` — for "some-but-not-all" multi-select headers.
- `.dot-warn` — semantically named warning dot (the old `.dot-amber` rerouted to the actual amber chart token).
- Explicit `:focus-visible` rings for `.switch` and `.slider` thumb (Webkit + Moz pseudos).

#### Changed

- `--text-tertiary` darkened from `#8A7E7D` → `#7A6E6D` in light mode for AA contrast on body copy. Dark mode tertiary nudged in the same direction.
- `--text-disabled` lightened from `#5F5450` → `#756763` in dark mode so disabled text is perceivable on `--surface-muted`.
- `.btn-link` now uses `--info` instead of `--text-tertiary` — it no longer reads as disabled text and now passes AA contrast.
- The global theme-swap transition is now one-shot. Previously a permanent `:root *` rule slowed every micro-interaction whose property list included a colour (especially SVG `fill`/`stroke`). Now scoped to a `.theme-swapping` class the toggle adds and removes after the cross-fade.

#### Removed

- The `:focus-visible { border-color: var(--brand) !important }` override — it was clobbering invalid-state red borders on focused inputs. The shadow ring is now the only focus indicator and components own their own border colour.

#### Deprecated

- `.dot-amber` previously meant "warning brown" — kept as a class but now correctly renders the amber chart colour. Migrate to `.dot-warn` for the old behaviour.

---

### v1.0 — 2026-04 · "First commit"

Initial release.

- 2 fonts · ~150 tokens · 28 components · 5 patterns
- Light + dark themes
- Docs site under `/docs`

---

## How versions are decided

| Bump  | Trigger                                                          |
| ----- | ---------------------------------------------------------------- |
| Major | A class is removed or its visual contract changes meaningfully.  |
| Minor | A new component / variant ships, or a token is added.            |
| Patch | Bug fix, contrast nudge, ARIA hook, doc-only correction.         |

v1.1 is a minor bump because tokens shifted (text-tertiary, text-disabled) — defensible for any consumer who built on top of them. No CSS class was renamed or removed.
