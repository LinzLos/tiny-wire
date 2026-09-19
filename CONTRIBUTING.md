# Contributing to Tiny Wire

Thanks for wanting to contribute. Tiny Wire is a small, opinionated design system, and the bar for changes is "does this stay true to the system" more than "is this a good idea in isolation." This guide explains how to propose changes and the rules a contribution has to meet.

## The one rule that matters most

**Components read tokens. They never hardcode values.**

Every color, spacing, radius, font, and duration in `lib/components.css` must be a `var(--token)` reference — zero raw hex, zero magic pixel colors. This is what lets the whole system rebrand or theme by overriding tokens alone. A CI check fails any PR that introduces a hardcoded hex color into `lib/components.css`, so this isn't optional.

If you need a value that doesn't exist yet, add a **token** in `lib/tokens.css` (light and dark) and reference it — don't inline the value.

## Running it locally

There's no build step. To work on it:

```bash
git clone https://github.com/LinzLos/tiny-wire.git
cd tiny-wire
# open any docs page directly…
open docs/index.html
# …or serve the folder for live reload:
python3 -m http.server 8000   # then visit http://localhost:8000/docs/
```

## Project structure

What `lib/` contains and who takes each file: [`lib/CONSUMING.md` § The lib unit](lib/CONSUMING.md#the-lib-unit). The docs pages live in `docs/` — reference pages, the live WCAG checker (`a11y.html`), and focused examples like `sidebar-rail.html`.

## Adding or changing a component

1. **Edit `lib/components.css`** — add your component or variant using existing tokens. Follow the established class-naming conventions (`.thing`, `.thing-part`, `.thing--variant`, `.thing.is-state` / `.active`).
2. **Add a token if needed** to `lib/tokens.css` — define it for **both** the light `:root` and the `:root[data-theme="dark"]` block.
3. **Demo it** — add a usage example to the relevant docs page (`docs/components.html` or a focused page like `docs/sidebar-rail.html`) so it's discoverable.
4. **Check accessibility** — open `docs/a11y.html` and confirm any text/icon colors clear **WCAG AA** (4.5:1 for text, 3:1 for large text/UI). If your change shifts a token, re-run the checker in both themes.
5. **Verify dark mode** — toggle `data-theme="dark"` and confirm the component holds up.
6. **Update `CHANGELOG.md`** — add an entry under a new version heading following [SemVer](https://semver.org/): patch for fixes, minor for additive components/variants, major for breaking class/token changes.

## Pull request process

1. Fork the repo and create a branch: `git checkout -b add-<component>` or `fix-<thing>`.
2. Make your change following the checklist above.
3. Open a PR — the template will prompt you through the checklist.
4. A maintainer reviews for token-purity, a11y, naming consistency, and whether it fits the system's minimal, warm, operational character.

Small, focused PRs merge fastest. If you're proposing something big or you're unsure it fits, **open an issue first** (there's a "New component" template) so we can align before you build.

## Commit messages

Short imperative summary line, then bullets for the what/why:

```
Add sidebar rail (collapsed) variant

- .sidebar--rail icon-only variant in lib/components.css
- docs/sidebar-rail.html demo
- CHANGELOG v1.2
```

## Code of conduct

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md). Be decent.
