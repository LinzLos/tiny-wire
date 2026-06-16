# Consuming Tiny Wire

Tiny Wire is vendored into consumer prototypes as a **verbatim copy** of `lib/`. One source of truth, one update path — a change made here flows to every consumer on the next sync, with no per-repo hand-editing.

## The contract

1. **Vendor `lib/globals.css` + `lib/components.css` verbatim.** (Add `tokens.js` only if you script with tokens.)
2. **Never edit the vendored files.** They are overwritten on every sync, and the drift check fails if a consumer's copy differs from the pinned source.
3. **App-specific overrides live in a separate layer** — `app-tokens.css` (token overrides/additions) plus your app CSS — loaded *after* the Tiny Wire files. Override by redefining a semantic token or adding a new class; never by editing a vendored file.
4. **Consume the semantic tier + component classes** (`.btn`, `.card`, `.chip`, `.dot-*`, `.dialog`, …) for standard chrome. Build bespoke UI locally and raise it as a promotion candidate — see the hub: LinzLos/tiny-wire#6.
5. **Pin a version.** The synced version is written to the consumer's `lib/.tinywire-version`; the canonical number lives in this repo's `/VERSION`.

## Load order (example)

```html
<link rel="stylesheet" href="lib/globals.css">     <!-- vendored: tokens + reset + base -->
<link rel="stylesheet" href="lib/components.css">  <!-- vendored: components -->
<link rel="stylesheet" href="app-tokens.css">      <!-- local: token overrides / additions -->
<link rel="stylesheet" href="app.css">             <!-- local: app styles -->
```

## Updating

Run the consumer's `scripts/sync-tinywire.sh` to pull the current `lib/` and re-stamp the version, then commit and **review visually before deploy**. The drift check flags any consumer whose vendored copy has fallen behind or been edited.
