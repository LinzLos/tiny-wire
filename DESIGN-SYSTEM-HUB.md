# Design System Hub

*For: the maintainer. Consumers read [`lib/CONSUMING.md`](lib/CONSUMING.md); newcomers read the [README](README.md).*

I build prototypes, make the case for what should move up, and this is where the cases sit until they're decided.

The tables and the two closing sections are rendered from the maintainer's record by script; the prose between them is hand-written. Where they disagree, the rendered parts win — they were checked more recently. Working thread: [#6](https://github.com/LinzLos/tiny-wire/issues/6).

Repo `LinzLos/tiny-wire` · version `<!-- record:version start -->1.5<!-- record:version end -->` (rendered from [`/VERSION`](VERSION)) · deploy: GitHub Pages, push to `main` = publish — https://linzlos.github.io/tiny-wire/

## State

### Consumers

<!-- record:registry start -->
| Consumer | Profile | Vendors | Pinned | Drift | Deploy | Coupling map | Candidates |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [`agentic-trust-devtools`](https://github.com/LinzLos/agentic-trust-devtools) | `static` — vanilla HTML | `tokens.css`, `base.css`, `components.css`, `globals.css` | v1.5 | behind-source | GitHub Pages | — | — |
| [`agentic-trust-ux`](https://github.com/LinzLos/agentic-trust-ux) | `static` — vanilla HTML | `tokens.css`, `base.css`, `components.css`, `globals.css` | v1.5 | behind-source | GitHub Pages | [#1](https://github.com/LinzLos/agentic-trust-ux/issues/1) | [#2](https://github.com/LinzLos/agentic-trust-ux/issues/2) |
| [`dialing-prototype`](https://github.com/LinzLos/dialing-prototype) | `react` — React / Tailwind | `tokens.css` | v1.5 | none | Netlify | [#1](https://github.com/LinzLos/dialing-prototype/issues/1) | [#2](https://github.com/LinzLos/dialing-prototype/issues/2) |
| [`shift-prototype`](https://github.com/LinzLos/shift-prototype) | `react` — React / Tailwind | `tokens.css` | v1.5 | none | Netlify | [#1](https://github.com/LinzLos/shift-prototype/issues/1) | [#2](https://github.com/LinzLos/shift-prototype/issues/2) |
<!-- record:registry end -->

Every consumer carries `scripts/sync-tinywire.sh`, `scripts/check-tinywire-drift.sh`, and a `.tinywire-version` pin; the rules they hold to are in [`lib/CONSUMING.md` § Contract](lib/CONSUMING.md#contract). *Coupling map* is the consumer's `ds:consumes` issue — what it binds to, and its drift debt. The candidates issues are closed; the table below is the docket now.

### Candidates

Rows are the candidates assessed against the [promotion rule](lib/CONSUMING.md#promotion); ideas not yet assessed are `unassessed` rows, not a separate list. Spread · copies · uses are the rule's three counts. Sorted most-reinvented first — that is the build order. A shipped candidate stays, with status `shipped`, so the trail is visible.

<!-- record:candidates start -->
| Candidate | What it is | Where | Spread | Copies | Uses | Status | Build |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Shell | The frame every screen sits in — sidebar on the left, page in the middle. | `shift-prototype`, `dialing-prototype` | 2 | 2 | 2 | promote | not-started |
| Sidenav | The sidebar: logo, links, theme toggle. | `shift-prototype`, `dialing-prototype` | 2 | 2 | 2 | promote | not-started |
| Icon system | Icons for every app — which library, what sizes, what stroke. | `shift-prototype`, `agentic-trust-ux` | 2 | 0 | 0 | resolved | not-started |
| Ledger chart | An area chart with an optional second axis. | `shift-prototype` | 1 | 1 | 2 | candidate | not-started |
| Live indicator | A Real Time pill with a pulsing dot and a tooltip you can tab to. | `shift-prototype` | 1 | 1 | 3 | candidate | not-started |
| Segmented control | A row of buttons, one selected — a toggle with more than two options. | `agentic-trust-ux` | 1 | 1 | 2 | candidate | not-started |
| Status chip | A pill with a pulsing dot and a state word: ok, warn, critical. | `dialing-prototype` | 1 | 1 | 1 | candidate | not-started |
| Tabs | Click a tab, the panel changes. | `shift-prototype` | 1 | 1 | 1 | candidate | not-started |
| App bar | The strip across the top: logo, links, actions. | `agentic-trust-ux` | 1 | 1 | 1 | unassessed | not-started |
| Attestation shield | A card that flips between plain-words proof and raw proof. | `agentic-trust-ux` | 1 | 1 | 1 | unassessed | not-started |
| Cursor card | A card that glows where your mouse is. | `shift-prototype` | 1 | 1 | 1 | unassessed | not-started |
| Formula box | A recessed box that shows the math. | `dialing-prototype` | 1 | 1 | 1 | unassessed | not-started |
| Lever slider | A horizontal slider with a thumb you grab. | `dialing-prototype` | 1 | 1 | 1 | unassessed | not-started |
| Pre-flight surface | The approve-or-stop screen before an agent acts. | `agentic-trust-ux` | 1 | 1 | 1 | unassessed | not-started |
| Search with clear | A search box with an × that empties it. | `shift-prototype` | 1 | 1 | 1 | unassessed | not-started |
| Solver table | A grid for picking one option out of several, numbers side by side. | `agentic-trust-ux` | 1 | 1 | 1 | unassessed | not-started |
| Trust dial | A dial you drag to set how far the agent may go. | `agentic-trust-ux` | 1 | 1 | 1 | unassessed | not-started |
| Stat tile | A big number in a box with a label and a delta. | `shift-prototype` | 1 | 2 | 4 | shipped | shipped |
<!-- record:candidates end -->

**Assessment per candidate:** the four questions · token / a11y debt · API shape · decision: promote / keep-local / reject.

## Contract

What must hold across the system and its consumers is in [`lib/CONSUMING.md` § Contract](lib/CONSUMING.md#contract) — one invariant per rule, with what breaks and what checks it. This page doesn't repeat them.

**How a release reaches consumers**

1. Ship the change here; bump [`/VERSION`](VERSION) per the release ritual (audit + changelog + version copy).
2. In each consumer, pull the current source (sync script today; `npm update` once packaged) and re-stamp the pin.
3. Review visually, then deploy by the consumer's host path.
4. `scripts/check-tinywire-drift.sh` flags any consumer behind the pin or hand-editing a vendored file.

A gated, human-reviewed version of this flow is epic [#1](https://github.com/LinzLos/tiny-wire/issues/1).

## Decisions

Judgment calls, dated, with the reason. Everything in this section is an opinion that was decided; the State section is what's checked.

| Date | Decision | Why |
| --- | --- | --- |
| 2026-06-18 | Components are authored once. No vanilla + React twins of the same component. | Keeping two runtimes behaving identically is what large design-system teams fund staff to do. One maintainer. Static pages take the CSS for look and native HTML (`<dialog>`, `<details>`) for behavior — visual parity, not behavioral parity. |
| 2026-06-18 | Hosting per stack, not one host: React / Vite → Netlify; static HTML → GitHub Pages; image and video → Cloudinary. | Each host builds and routes its stack without configuration. |
| 2026-09-18 | A consumer is one of two profiles, `static` or `react`, and the profile decides what it vendors. | A bundled app ships its own reset; stacking Tiny Wire's on top breaks layout in ways that look like component bugs. |
| 2026-09-18 | Promote when a second app builds the same thing; consolidate when one app builds it twice. | The lower bar had already been treated as promotable; the second rule exists because the first sameness pass found duplication that belongs to one app, not to Tiny Wire. |
| 2026-09-18 | The stat tile ships as Card parts, not a new component. | Every difference between the copies was an optional prop on a card. |
| 2026-09-18 | Icons: name a library (Phosphor) and ship size / stroke conventions; don't draw a set. | One consumer already used it; the finding was "no icon system," not "wrong glyphs." |
| 2026-09-19 | The tables on this page are rendered from the record, never hand-edited. | The hand-maintained half of this page drifted in eight weeks while the script-maintained half stayed exact. |
| open | Shell + Sidenav: ship as CSS classes, or as the first React package. | The first rows to reach `promote`; the answer sets the form of every later promotion. |

## Verified clean

<!-- record:verified start -->
As of 2026-09-20, the latest verification date in the record.

- 2 of 4 consumers match the source exactly, at pin v1.5
- 15 of 18 candidates carry definitions the inventory script checks against the consumer repos
- The registry, candidates, version, and these two sections are rendered from the record; nothing in them was typed
<!-- record:verified end -->

## Coverage

<!-- record:coverage start -->
- Consumers in the record: `agentic-trust-devtools`, `agentic-trust-ux`, `dialing-prototype`, `shift-prototype`
- Behind the source, faithful to their pin (the source carries unreleased changes; clears at the next release and sync): `agentic-trust-devtools`, `agentic-trust-ux`
- Candidates with no definition the script can watch: Cursor card, Icon system, Search with clear
- Sameness assessments without a confirmation: HeaderBar
<!-- record:coverage end -->

## Maintaining this hub

The registry, candidates, version, verified and coverage blocks sit between `record:` markers and are rendered by the maintainer's `render-hub.py`; `inventory.py` checks the record against the consumer repos first. Change the record and re-render; hand edits between the markers are overwritten. When a candidate ships, its status becomes `shipped` and the changelog gets the entry. Keep this file and issue #6 in agreement.
