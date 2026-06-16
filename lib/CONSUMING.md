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

**Profile A — vanilla (no build, no CSS framework reset), e.g. agentic-trust-ux.**
Vendor `tokens.css`, `base.css`, `components.css` (and `globals.css` if you want the single-file entry). Link `globals.css` then `components.css`, or link the three files directly.

**Profile B — build + framework reset (Tailwind), e.g. shift / dialing.**
Vendor `tokens.css` only (add `components.css` when you adopt component classes). Import `tokens.css`; **do not** vendor `base.css` — your framework already ships a reset, and stacking Tiny Wire's reset on top causes conflicts. Tokens still flow verbatim, so design decisions propagate; the framework keeps owning layout.

## The rules (both profiles)

1. **Never edit the vendored files.** They are overwritten on every sync, and the drift check fails if a consumer's copy differs from the pinned source.
2. **App-specific tokens and overrides live in a separate layer** — `app-tokens.css` plus your app CSS — loaded *after* the Tiny Wire files. Override by redefining a semantic token or adding a new class; never by editing a vendored file.
3. **Consume the semantic tier + component classes** for standard chrome. Build bespoke UI locally and raise it as a promotion candidate — see the hub: LinzLos/tiny-wire#6.
4. **Pin a version.** The synced version is written to the consumer's `lib/.tinywire-version`; the canonical number lives in this repo's `/VERSION`.

## Load order

```html
<!-- Profile A (vanilla) -->
<link rel="stylesheet" href="lib/globals.css">     <!-- vendored: tokens + base (via @import) -->
<link rel="stylesheet" href="lib/components.css">  <!-- vendored: components -->
<link rel="stylesheet" href="app-tokens.css">      <!-- local: token overrides / additions -->
<link rel="stylesheet" href="app.css">             <!-- local: app styles -->
```

```css
/* Profile B (Tailwind / build) — in your entry CSS */
@import 'tailwindcss';          /* framework reset + utilities */
@import './lib/tokens.css';     /* vendored: Tiny Wire tokens — do not edit */
/* ...then your app-specific token overrides and styles... */
```

## Updating

Run the consumer's `scripts/sync-tinywire.sh` to pull the current files and re-stamp the version, then commit and **review visually before deploy**. The drift check flags any consumer whose vendored copy has fallen behind or been edited.
