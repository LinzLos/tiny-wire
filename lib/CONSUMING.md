# Consuming Tiny Wire

Tiny Wire is vendored into consumer prototypes as a **verbatim copy** of the relevant `lib/` files. One source of truth, one update path: a change made here flows to every consumer on the next sync, with no per-repo hand-editing.

## The lib unit

| File | What it is | Vendored by |
|------|------------|-------------|
| `tokens.css` | Design tokens only (`:root`, light + dark). Custom properties, nothing else. | **everyone** |
| `base.css` | Reset + base typography + global utilities + keyframes. Requires `tokens.css`. | vanilla consumers |
| `components.css` | All component classes (`.btn`, `.card`, `.chip`, …). Requires the tokens. | anyone adopting components |
| `globals.css` | Compat shim = `tokens.css` + `base.css` in one import. | vanilla consumers (optional) |
| `tokens.js` | Same tokens as a JS object. | only if you script with tokens |

## Consumer profiles

**Profile `static` — vanilla HTML, no build, no CSS framework reset. e.g. agentic-trust-ux.**
Vendor `tokens.css`, `base.css`, `components.css` (and `globals.css` if you want the single-file entry). Link `globals.css` then `components.css`, or link the three files directly.

**Profile `react` — a bundled app with a framework reset (Tailwind). e.g. shift / dialing.**
Vendor `tokens.css` only (add `components.css` when you adopt component classes). Import `tokens.css`; **do not** vendor `base.css` — your framework already ships a reset, and stacking Tiny Wire's reset on top causes conflicts. Tokens still flow verbatim, so design decisions propagate; the framework keeps owning layout.

## The rules (both profiles)

1. **Never edit the vendored files.** They are overwritten on every sync, and the drift check fails if a consumer's copy differs from the pinned source.
2. **App-specific tokens and overrides live in a separate layer** — `app-tokens.css` plus your app CSS — loaded *after* the Tiny Wire files. Override by redefining a semantic token or adding a new class; never by editing a vendored file.
3. **Consume the semantic tier + component classes** for standard chrome. Build bespoke UI locally and raise it as a promotion candidate — see the hub: LinzLos/tiny-wire#6, and [Promotion](#promotion) below for how candidates are judged.
4. **Pin a version.** The synced version is written to the consumer's `lib/.tinywire-version`; the canonical number lives in this repo's `/VERSION`.

## Promotion

Rule 3 says to raise bespoke UI as a candidate. This is how a candidate is judged.

**Two implementations are the same component when one component with props could replace both without changing behavior.** Check four things:

1. **What it means to assistive tech** — role, landmark, what a screen reader announces.
2. **What moves it** — nothing, the system over time, or the user.
3. **How you interact with it** — passive, clickable, keyboard-navigable, contains form controls.
4. **What it must contain** — the required children.

If all four match, the differences are props (size, color, label, slot content) and it is one component. If any differs, it is two components, however alike they look. Tabs (`role="tablist"`, switches panels) and a segmented control (`role="group"`, sets a value) are the standing example.

**Pure-visual atoms** — icons, dividers, glyphs — match on the glyph, not on behavior. The four questions come back "same" for any two decorative SVGs.

**Counting.** Sameness is confirmed by a person, once, and recorded. Only confirmed groups are counted — five definitions sharing a name are not five copies. A group has three numbers: **spread** (how many consumers it appears in), **copies** (how many separate definitions exist), and **uses** (how many places render it).

**Two rules read those numbers:**

- **Promote** — spread ≥ 2 → a Tiny Wire promotion candidate. It goes in the hub's candidates table.
- **Consolidate** — copies ≥ 2 inside one consumer → a consolidation issue on that consumer. Tiny Wire is not involved.

Tiny Wire's own docs and patterns are not consumers for this count.

## Load order

```html
<!-- Profile static (vanilla) -->
<link rel="stylesheet" href="lib/globals.css">     <!-- vendored: tokens + base (via @import) -->
<link rel="stylesheet" href="lib/components.css">  <!-- vendored: components -->
<link rel="stylesheet" href="app-tokens.css">      <!-- local: token overrides / additions -->
<link rel="stylesheet" href="app.css">             <!-- local: app styles -->
```

```css
/* Profile react (Tailwind / build) — in your entry CSS */
@import 'tailwindcss';          /* framework reset + utilities */
@import './lib/tokens.css';     /* vendored: Tiny Wire tokens — do not edit */
/* ...then your app-specific token overrides and styles... */
```

## Updating

Run the consumer's `scripts/sync-tinywire.sh` to pull the current files and re-stamp the version, then commit and **review visually before deploy**. The drift check flags any consumer whose vendored copy has fallen behind or been edited.
