# Tiny Wire

A minimal, warm-neutral design system with a single cobalt accent, built for dense operational interfaces.

**[Live demo & docs →](https://linzlos.github.io/tiny-wire/)** · License: MIT · No build step

- **2 fonts**: Bricolage Grotesque (display) + DM Sans (body)
- **~180 tokens, three tiers** (primitive → semantic → component): colors, type, spacing, radius, elevation, animation — all light & dark
- **28 components**: forms, feedback, navigation, overlays, data
- **5 patterns**: dashboard, data table, settings, login, empty states
- **Built-in WCAG checker**: `docs/a11y.html` computes live contrast in both themes
- **No framework, no build step**: drop two CSS files in and go

## Files

```
lib/
├── globals.css      Tokens (light + dark) + reset + base + keyframes
├── components.css   All 28 components
└── tokens.js        Same tokens as a JS object (for scripts/generators)

docs/
├── index.html       Intro + quick start
├── foundations.html Token reference
├── components.html  Component library
├── patterns.html    Composed patterns
├── docs.css         Docs-only styles
└── docs.js          Sidebar, dark mode, code reveal
```

## Quick start

1. Add the fonts to your `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400..700&family=DM+Sans:wght@400..600&display=swap" rel="stylesheet">
```

2. Link the stylesheets:

```html
<link rel="stylesheet" href="lib/globals.css">
<link rel="stylesheet" href="lib/components.css">
```

3. Use the components:

```html
<button class="btn btn-primary">Apply changes</button>

<div class="card">
  <div class="card-title">Section title</div>
  <p class="card-desc">Card content.</p>
</div>
```

4. Enable dark mode:

```js
document.documentElement.setAttribute('data-theme', 'dark');
```

## Conventions

| Prefix         | Purpose                                          |
| -------------- | ------------------------------------------------ |
| `.btn-*`       | Buttons (`.btn-primary`, `.btn-ghost`, etc.)     |
| `.input`       | Text input                                       |
| `.select`      | Select dropdown                                  |
| `.checkbox`    | Checkbox                                         |
| `.radio`       | Radio                                            |
| `.switch`      | Toggle switch                                    |
| `.slider`      | Range slider                                     |
| `.card`        | Container                                        |
| `.tag-*`       | Loud, all-caps tags                              |
| `.badge`       | Quiet metadata                                   |
| `.chip-*`      | Status pills                                     |
| `.dot-*`       | Status indicators                                |
| `.alert-*`     | Inline messages                                  |
| `.banner-*`    | Full-width banners                               |
| `.dialog`      | Modal                                            |
| `.sheet`       | Side drawer                                      |
| `.tooltip`     | Tooltip                                          |
| `.popover`     | Click popover                                    |
| `.menu`        | Dropdown menu                                    |
| `.tabs-list`   | Tabs                                             |
| `.accordion`   | Accordion                                        |
| `.breadcrumb`  | Breadcrumb                                       |
| `.pagination`  | Pagination                                       |
| `.toast`       | Toast notification                               |
| `.command`     | Command palette (⌘K)                             |
| `.table`       | Data table                                       |
| `.sidebar`     | App sidebar (`.sidebar--rail` for the collapsed icon rail) |
| `.empty-state` | Empty state placeholder                          |

## Token map

Every component reads from CSS custom properties. To rebrand, override the tokens — never touch the component CSS.

```css
/* Override at any scope */
.brand-acme {
  --brand:       #0066CC;
  --brand-fg:    #FFFFFF;
  --brand-light: #E6F0FB;
  --brand-dark:  #003D7A;
}
```

## Contributing

Contributions welcome — new components, variants, fixes, accessibility improvements. The one hard rule: components read **tokens**, never hardcoded values (a CI check enforces it). See **[CONTRIBUTING.md](CONTRIBUTING.md)** for the workflow and **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)** for community expectations.

## License

[MIT](LICENSE) © 2026 Lindsay Zuniga ([@LinzLos](https://github.com/LinzLos)). Use it, fork it, ship it.
