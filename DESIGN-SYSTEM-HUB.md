# Design System Hub

The committed registry and architecture record for Tiny Wire and the repos that vendor it. This is the durable companion to the intake issue [LinzLos/tiny-wire#6](https://github.com/LinzLos/tiny-wire/issues/6): the issue is the working thread, this file is the source of record. When they disagree, reconcile toward this file.

> **Status note (2026-09-17):** All four consumers are migrated to the [`lib/CONSUMING.md`](lib/CONSUMING.md) contract and pin **v1.5**. `agentic-trust-devtools` was already wired to the contract — pinned, both sync scripts, zero drift — but missing from this registry until now. The "three different ways" framing in issue #6 predates that migration and should be updated to match the registry below.

---

## Architecture: React-first, on a framework-agnostic foundation

Tiny Wire is a **React-first design system**. The design decisions live in a framework-agnostic foundation; the thing you actually build products with is a React component library on top of it.

```
┌──────────────────────────────────────────────────┐
│  React component package   (what you build with)   │  ← <Button>, <Tabs>, <Dialog>
│  behavior: Radix / React Aria · look: tokens+classes │     interaction + a11y, authored once
├──────────────────────────────────────────────────┤
│  Foundation   (framework-agnostic)                 │
│  tokens.css · components.css · Tailwind @theme bridge │  ← color / type / spacing + component look
└──────────────────────────────────────────────────┘
```

**One stack, two depths.** A "quick take" and a complex build are the *same* stack — Vite + React + Tiny Wire — at different depth. A quick take mostly composes existing components; a complex build adds bespoke interaction. There is no separate "vanilla for speed" track: with the component package installed, React *is* the fast path.

**Why not dual vanilla + React component implementations.** Keeping two runtimes behaving identically is what large design-system teams fund staff to do. As a solo-maintained system, components are authored **once**, in React. Vanilla pages (the static showcases) consume the foundation — tokens + `components.css` for look — and use native HTML (`<dialog>`, `<details>`) for behavior. They get visual parity, not behavioral parity, and that is the right trade.

**Nothing already built is wasted.** The existing tokens and component CSS become the foundation layer the React components sit on. The static demos (`tiny-wire.html`, `agentic-trust-ux`) stay as showcases; the system you build forward is React.

---

## The system

- **Repo:** `LinzLos/tiny-wire`
- **Current version:** `1.5` (canonical number in [`/VERSION`](VERSION))
- **Vendoring contract:** [`lib/CONSUMING.md`](lib/CONSUMING.md)
- **Deploy:** GitHub Pages, push to `main` = publish — https://linzlos.github.io/tiny-wire/

### The foundation unit

| File | What it is | Used by |
|------|------------|---------|
| `tokens.css` | Design tokens only (`:root`, light + dark) | everyone |
| `components.css` | Component look as CSS classes (`.btn`, `.card`, …) | React package + vanilla showcases |
| `base.css` | Reset + base typography + utilities + keyframes | vanilla (non-framework) only |
| `globals.css` | Compat shim = `tokens.css` + `base.css` | vanilla showcases (optional) |
| `tokens.js` | The same tokens as a JS object | scripting / theme generation |

### Distribution (target)

Publish Tiny Wire as a package with subpath exports so one versioned source serves both doors:

- `@linzlos/tiny-wire/tokens.css` · `@linzlos/tiny-wire/components.css`
- `@linzlos/tiny-wire/theme` — Tailwind preset that maps tokens into `@theme`
- `@linzlos/tiny-wire/react` — the React components

React apps `npm install`; static showcases copy or CDN-link the CSS. No forks.

---

## Roadmap: Layers 1 → 3 (ship in order, each is usable alone)

1. **Layer 1 — token parity + Tailwind bridge.** Tokens flow today; add a `@theme` bridge so Vite/Tailwind apps get `bg-brand`, `text-success`. Color/type/spacing parity everywhere. *Cheapest, ships first.*
2. **Layer 2 — `components.css` as the shared look contract.** Promote to "used by everyone," document the class API. Static builds get visual component fidelity with zero JS to maintain.
3. **Layer 3 — the React component package, one component at a time.** Radix / React Aria for behavior, shared classes/tokens for look. Start with the candidates table's highest-spread rows — each one retires real duplication in the existing apps. Grow as needed.

A **Vite + React + Tiny Wire starter template** is the default for new quick takes.

---

## Consumer registry

<!-- record:registry start -->
| Consumer | Profile | Vendors | Pinned | Deploy | Coupling map | Candidates |
| --- | --- | --- | --- | --- | --- | --- |
| [`agentic-trust-devtools`](https://github.com/LinzLos/agentic-trust-devtools) | `static` — vanilla HTML | `tokens.css`, `base.css`, `components.css`, `globals.css` | v1.5 | GitHub Pages | — | — |
| [`agentic-trust-ux`](https://github.com/LinzLos/agentic-trust-ux) | `static` — vanilla HTML | `tokens.css`, `base.css`, `components.css`, `globals.css` | v1.5 | GitHub Pages | [#1](https://github.com/LinzLos/agentic-trust-ux/issues/1) | [#2](https://github.com/LinzLos/agentic-trust-ux/issues/2) |
| [`dialing-prototype`](https://github.com/LinzLos/dialing-prototype) | `react` — React / Tailwind | `tokens.css` | v1.5 | Netlify | [#1](https://github.com/LinzLos/dialing-prototype/issues/1) | [#2](https://github.com/LinzLos/dialing-prototype/issues/2) |
| [`shift-prototype`](https://github.com/LinzLos/shift-prototype) | `react` — React / Tailwind | `tokens.css` | v1.5 | Netlify | [#1](https://github.com/LinzLos/shift-prototype/issues/1) | [#2](https://github.com/LinzLos/shift-prototype/issues/2) |
<!-- record:registry end -->

Every consumer carries `scripts/sync-tinywire.sh`, `scripts/check-tinywire-drift.sh`, and a `.tinywire-version` pin. Once the React package ships, `react` consumers move from vendoring `tokens.css` to importing `@linzlos/tiny-wire/react`.

---

## The two lanes

- **Lane A — downstream (DS → consumer).** Each consumer's pinned `ds:consumes` "Coupling map" issue lists which tokens/classes it binds to, plus drift debt. Reconcile on every release.
- **Lane B — upstream (consumer → DS).** Each consumer's `ds:candidate` issue lists locally invented patterns that may belong upstream.

**Labels:** `area:consumers` here; `ds:consumes` + `ds:candidate` on each consumer.

---

## Promotion candidates

**Rule: present in 2 or more consumers = promotion candidate. 2 or more copies inside one consumer = consolidate there, not here.** Counts are of confirmed component groups, not of definitions sharing a name — full rule in [`lib/CONSUMING.md`](lib/CONSUMING.md#promotion). These also seed the Layer 3 build order — build the most-reinvented components first.

Rows are the candidates that have been assessed against the rule. Ideas not yet assessed stay in each consumer's `ds:candidate` issue (the registry's Candidates column). Spread · copies · uses are the three counts from the rule; a shipped candidate stays in the table with status `shipped` so the trail is visible.

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
| Stat tile | A big number in a box with a label and a delta. | `shift-prototype` | 1 | 2 | 4 | shipped | shipped |
<!-- record:candidates end -->

**Assessment per candidate:** generalizes beyond one prototype? · token / a11y debt · API shape · decision: promote / keep-local / reject.

---

## Propagation: how a release reaches consumers

1. Ship the change in Tiny Wire; bump [`/VERSION`](VERSION) per the release ritual (audit + changelog + version copy).
2. In each consumer, pull the current source (sync script today; `npm update` once packaged) and re-stamp the pinned version.
3. Review visually, then deploy by the consumer's host path.
4. `scripts/check-tinywire-drift.sh` flags any consumer behind the pinned source or hand-editing a vendored file.

**Rules:** never edit vendored files; keep app overrides in a separate layer loaded after Tiny Wire; pin a version. Full contract in [`lib/CONSUMING.md`](lib/CONSUMING.md). A gated, human-reviewed version of this flow is epic [#1](https://github.com/LinzLos/tiny-wire/issues/1).

---

## Deploy convention

Hosting is chosen per stack, not forced onto one host:

- **React / Vite / Tailwind SPA → Netlify** (builds for you, handles SPA routing; CD off, ship via `netlify deploy --prod --build`).
- **Static HTML / CSS / TS → GitHub Pages** (push to `main` = deploy).
- **Image / video → Cloudinary.**
- **At scale:** revisit Cloudflare Pages for the React apps.

---

## Maintaining this hub

On each release: re-sync every consumer, reconcile each Lane A coupling map, and bump the registry version column here. The registry and candidates tables sit between `record:` markers and are generated from the maintainer's record — change the record and re-render; hand edits between the markers are overwritten. When a candidate ships, its status becomes `shipped` and the changelog gets the entry. Keep this file and issue #6 in agreement.
