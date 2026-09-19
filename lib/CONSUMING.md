# Consuming Tiny Wire

*For: you, inside a repo that takes Tiny Wire. Maintainer's view: the [hub](../DESIGN-SYSTEM-HUB.md). Front door: the [README](../README.md).*

You're in a repo that takes Tiny Wire. The deal: copy the files exactly, never edit them, pin the version — and when you build something Tiny Wire doesn't have, make the case for it here.

## The lib unit

| File | What it is | Who takes it |
| --- | --- | --- |
| `tokens.css` | Design tokens only (`:root`, light + dark). Custom properties, nothing else. | everyone |
| `base.css` | Reset + base typography + utilities + keyframes. Needs `tokens.css`. | `static` |
| `components.css` | Every component class (`.btn`, `.card`, `.chip`, …). Needs the tokens. | `static`; `react` once it adopts component classes |
| `globals.css` | `tokens.css` + `base.css` in one import. | `static`, optional |
| `tokens.js` | The same tokens as a JS object. | only if you script with tokens |

This table is the one list of what `lib/` contains. The README, the hub, and CONTRIBUTING link here instead of repeating it.

## Two profiles

A consumer is one of two things, and which one decides what it takes.

- **`static`** — plain HTML, no build, no CSS framework. Takes the whole unit. e.g. agentic-trust-ux.
- **`react`** — a bundled app with its own reset (Tailwind). Takes `tokens.css` only, so the design decisions flow and the framework keeps the layout. Adds `components.css` when it adopts component classes. e.g. shift, dialing.

## Words used below

- **vendored** — copied into your repo.
- **verbatim** — byte-for-byte the same as the source.
- **pin** — the version number written next to the copy, in `lib/.tinywire-version`.
- **drift** — your copy no longer matches the pinned source, because it was edited or the source moved on.
- **reset** — the CSS that zeroes browser defaults. Tiny Wire ships one in `base.css`; Tailwind ships its own.

## Contract

Each rule is an invariant: what must hold, what breaks if it doesn't, and what checks it. `deterministic` means a script checks it and gives the same answer every run. `judgment` means a person reviews it.

**`[vendored-verbatim]`** · deterministic · `scripts/check-tinywire-drift.sh` diffs each vendored file against the source
- **Must hold:** every Tiny Wire file under your `lib/` is verbatim the pinned source.
- **If it doesn't:** your edit is overwritten on the next sync with no warning, and the drift check fails until then.

**`[pinned]`** · deterministic · `scripts/check-tinywire-drift.sh` compares the pin to the source's `/VERSION`
- **Must hold:** `lib/.tinywire-version` exists and matches the current Tiny Wire version.
- **If it doesn't:** nobody can say which Tiny Wire this app runs, so nobody can say what the next release will change for it. Being behind is drift too.

**`[profile-matches-vendoring]`** · deterministic · the consumer's `scripts/sync-tinywire.sh` carries a file list; the drift check reads the same list
- **Must hold:** a `react` consumer vendors `tokens.css` (and `components.css` once adopted), never `base.css` or `globals.css`.
- **If it doesn't:** two resets stack — Tailwind's and Tiny Wire's — and layout breaks in ways that look like component bugs.

**`[overrides-in-own-layer]`** · judgment · reviewed; the worst case is caught by `vendored-verbatim`
- **Must hold:** app tokens and overrides live in `app-tokens.css` and your app CSS, loaded after the Tiny Wire files. You override by redefining a semantic token or adding a class.
- **If it doesn't:** the override lives in a vendored file and vanishes on sync.

**`[load-order]`** · judgment · reviewed
- **Must hold:** Tiny Wire files first, then `app-tokens.css`, then app CSS — the order in [Load order](#load-order).
- **If it doesn't:** your overrides lose to the vendored defaults and look like they don't work.

**`[bespoke-is-a-candidate]`** · judgment · the maintainer, via the hub's docket
- **Must hold:** UI you build that Tiny Wire doesn't ship is raised as a promotion candidate and judged by the rule below.
- **If it isn't:** the next app builds it again, and the record stays wrong about what exists.

## Promotion

`bespoke-is-a-candidate` says to raise what you built. This is how it's judged — one judgment step, then two deterministic ones.

**`[sameness]`** · judgment · a person, once, recorded in the maintainer's record
- **Must hold:** two implementations are called one component only when one component with props could replace both without changing behavior. Four questions decide it:
  1. **What it means to assistive tech** — role, landmark, what a screen reader announces.
  2. **What moves it** — nothing, the system over time, or the user.
  3. **How you interact with it** — passive, clickable, keyboard-navigable, contains form controls.
  4. **What it must contain** — the required children.

  All four match → the differences are props (size, color, label, slot content) and it is one component. Any differs → two components, however alike they look. Tabs (`role="tablist"`, switches panels) and a segmented control (`role="group"`, sets a value) are the standing example. **Pure-visual atoms** — icons, dividers, glyphs — match on the glyph, not on behavior.
- **If it's skipped:** counts measure appearance, not substance. The segmented control was scored as present in every consumer before this test existed; it turned out to be three different accessibility contracts.

**`[counts]`** · deterministic · the maintainer's inventory script
- **Must hold:** a confirmed group has three numbers — **spread** (how many consumers it appears in), **copies** (how many separate definitions exist), **uses** (how many places render it) — counted over confirmed groups only. Tiny Wire's own docs and patterns are not consumers.
- **If it isn't:** five definitions sharing a name read as five copies.

**`[thresholds]`** · deterministic · the same script; the result is the hub's candidates table
- **Must hold:** spread ≥ 2 → a Tiny Wire promotion candidate. Copies ≥ 2 inside one consumer → a consolidation issue on that consumer; Tiny Wire is not involved.
- **If it isn't:** either something promotes on one app's say-so, or duplication inside an app gets mistaken for a system need.

## Load order

```html
<!-- Profile static (plain HTML) -->
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

Run the consumer's `scripts/sync-tinywire.sh` to pull the current files and re-stamp the pin, then commit and **review visually before deploy**. The drift check flags any consumer whose vendored copy has fallen behind or been edited.

## What's checked, and what isn't

- **By script, in every consumer:** `vendored-verbatim`, `pinned`, `profile-matches-vendoring` — the sync and drift scripts share one file list.
- **By the maintainer's scripts:** `counts`, `thresholds`, and that the hub's table matches the record.
- **By a person:** `overrides-in-own-layer`, `load-order`, `sameness`.
- **By nothing yet:** that every bespoke thing a consumer built has reached the docket. The inventory script lists definitions with a signal that no candidate covers; a person still has to act on the list.
