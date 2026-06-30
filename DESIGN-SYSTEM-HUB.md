# Design System Hub

The committed registry and architecture record for Tiny Wire and the repos that vendor it. This is the durable companion to the intake issue [LinzLos/tiny-wire#6](https://github.com/LinzLos/tiny-wire/issues/6): the issue is the working thread, this file is the source of record. When they disagree, reconcile toward this file.

> **Status note (2026-06-18):** All three consumers are migrated to the [`lib/CONSUMING.md`](lib/CONSUMING.md) contract and pin **v1.5**. The "three different ways" framing in issue #6 predates that migration and should be updated to match the registry below.

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
3. **Layer 3 — the React component package, one component at a time.** Radix / React Aria for behavior, shared classes/tokens for look. Start with the patterns reinvented 3/3 (segmented/tab control, button, status pill); each one retires real duplication in the existing apps. Grow as needed.

A **Vite + React + Tiny Wire starter template** is the default for new quick takes.

---

## Consumer registry

| Consumer | Profile | Vendors | Pinned | Deploy | Coupling map | Candidates |
|----------|---------|---------|--------|--------|--------------|------------|
| [`agentic-trust-ux`](https://github.com/LinzLos/agentic-trust-ux) | A — vanilla showcase | full `lib/`: tokens, base, components, globals | v1.5 | GitHub Pages | [#1](https://github.com/LinzLos/agentic-trust-ux/issues/1) | [#2](https://github.com/LinzLos/agentic-trust-ux/issues/2) |
| [`dialing-prototype`](https://github.com/LinzLos/dialing-prototype) | B — React / Tailwind | `tokens.css` only | v1.5 | Netlify | [#1](https://github.com/LinzLos/dialing-prototype/issues/1) | [#2](https://github.com/LinzLos/dialing-prototype/issues/2) |
| [`shift-prototype`](https://github.com/LinzLos/shift-prototype) | B — React / Tailwind | `tokens.css` only | v1.5 | Netlify | [#1](https://github.com/LinzLos/shift-prototype/issues/1) | [#2](https://github.com/LinzLos/shift-prototype/issues/2) |

Every consumer carries `scripts/sync-tinywire.sh`, `scripts/check-tinywire-drift.sh`, and a `.tinywire-version` pin. Once the React package ships, Profile B consumers move from vendoring `tokens.css` to importing `@linzlos/tiny-wire/react`.

---

## The two lanes

- **Lane A — downstream (DS → consumer).** Each consumer's pinned `ds:consumes` "Coupling map" issue lists which tokens/classes it binds to, plus drift debt. Reconcile on every release.
- **Lane B — upstream (consumer → DS).** Each consumer's `ds:candidate` issue lists locally invented patterns that may belong upstream.

**Labels:** `area:consumers` here; `ds:consumes` + `ds:candidate` on each consumer.

---

## Promotion candidates

**Heuristic: reinvented in N consumers = promote.** These also seed the Layer 3 build order — build the most-reinvented components first.

| Candidate | Reinvented in | Note |
|-----------|---------------|------|
| Ledger area/line chart (incl. dual-axis) | 2 (shift) | extracted to token-pure `LedgerChart` (`shift/src/components/LedgerChart.tsx`); consumed by QueueMonitor + Performance · [shift#2](https://github.com/LinzLos/shift-prototype/issues/2) · upstream-token decision [#8](https://github.com/LinzLos/tiny-wire/issues/8) |
| Segmented / tab control | **3/3** | strongest case (agentic `app.css:103`, dialing `App.css:709`, shift `QueueMonitor.tsx:127`) |
| Live status pill + pulse dot | **3/3** | custom keyframes diverging from `pulse-dot` |
| Icon system | 2 | shift (20+ inline SVGs), agentic (inline SVG); none in Tiny Wire today |
| App-bar / top header | 1 | agentic `.appbar`; Tiny Wire has only a sidebar pattern |
| Trust Dial | 1 | agentic `app.css:127` |
| Pre-flight decision surface | 1 | agentic `app.css:161` |
| Attestation Shield | 1 | agentic `index.html:84` |
| Search-with-clear input | 1 | shift `Overview.tsx:295` |
| Cursor-tracking gradient card | 1 | shift `Overview.tsx:491` |

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

On each release: re-sync every consumer, reconcile each Lane A coupling map, and bump the registry version column here. When a candidate is promoted, move it out of the table and note it in the changelog. Keep this file and issue #6 in agreement.
