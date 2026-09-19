#!/usr/bin/env python3
"""Render every typed number in the docs from lib/ and the docs pages.

    python3 scripts/render-docs.py           # check: exit 1 if anything is stale
    python3 scripts/render-docs.py --write   # rewrite the rendered spots in place

Each number means one thing:
  tokens      custom properties declared in lib/tokens.css
  components  <h2> sections on docs/components.html — the documented set
  families    top-level class families in lib/components.css, minus parts
  patterns    <h2> sections on docs/patterns.html
  findings    distinct F-### ids across docs/audit.html and docs/a11y.html
  version     /VERSION

Rendered spots sit between markers. Blocks: `<!-- record:counts start -->`
in README.md, `<!-- record:tokens start -->` in docs/foundations.html.
Inline: `<!-- record:n-tokens start -->186<!-- record:n-tokens end -->` and
friends (n-components, n-families, n-patterns, n-findings, version) anywhere
in the HTML; `/* record:version start */` in docs/docs.js.

It also lists what lib/components.css ships that has no docs section of its
own. That list should be empty; while it isn't, those are components a
reader cannot find.
"""
import argparse
import difflib
import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Class families that are parts of a form or a page, not components.
PARTS = {"field", "helper", "label", "section"}
# Heading word -> class family, where the two differ.
ALIASES = {"button": "btn", "divider": "separator"}
# Families that share one docs section with another family.
SHARED = {"tabs": {"tab"}, "dot": {"monitoring"}}
WORDS = {1: "one", 2: "two", 3: "three", 4: "four", 5: "five"}


# ------------------------------------------------------------------ sources

def strip_comments(css):
    return re.sub(r"/\*.*?\*/", "", css, flags=re.S)


def tokens():
    """[(tier, name, light)] in file order, plus {name: dark}. Several
    declarations can share a line, so match anywhere."""
    css = (ROOT / "lib" / "tokens.css").read_text()
    light, dark, tier = [], {}, "Tokens"
    block = None
    for line in css.splitlines():
        if re.match(r"^:root\s*\{", line):
            block = "light"
        elif re.match(r"^:root\[data-theme=\"dark\"\]\s*\{", line):
            block = "dark"
        elif line.startswith("}"):
            block = None
        m = re.search(r"TIER (\d) — ([A-Z]+)", line)
        if m:
            tier = f"Tier {m.group(1)} — {m.group(2).title()}"
        for name, value in re.findall(r"(--[a-z0-9-]+)\s*:\s*([^;]+);", strip_comments(line)):
            if block == "light":
                light.append((tier, name, value.strip()))
            elif block == "dark":
                dark[name] = value.strip()
    return light, dark


def token_tiers():
    return sorted(set(re.findall(r"TIER (\d)", (ROOT / "lib" / "tokens.css").read_text())))


def families():
    """Top-level class families: the first segment of every class selector
    that starts a rule or follows a comma."""
    css = strip_comments((ROOT / "lib" / "components.css").read_text())
    return sorted(set(re.findall(r"(?:^|,)\s*\.([a-z][a-z0-9]*)", css, re.M)))


def sections(page):
    """(heading, classes used under it) for every <h2> on a docs page."""
    text = (ROOT / "docs" / page).read_text()
    out = []
    for chunk in re.split(r"<h2[^>]*>", text)[1:]:
        title = re.sub(r"<[^>]+>", "", chunk.split("</h2>", 1)[0]).replace("&amp;", "&").strip()
        classes = set()
        for attr in re.findall(r'class="([^"]*)"', chunk):
            classes.update(attr.split())
        out.append((title, classes))
    return out


def documented(secs, fams):
    """family -> section title, when a heading names the family and the
    section actually uses it."""
    home = {}
    for title, classes in secs:
        words = [ALIASES.get(w.lower(), w.lower()) for w in re.split(r"[\s/&]+", title) if w]
        for fam in fams:
            if fam not in words:
                continue
            names = {fam} | SHARED.get(fam, set())
            if names & classes or any(c.startswith(fam + "-") for c in classes):
                for n in names:
                    if n in fams:
                        home.setdefault(n, title)
    return home


def shown_inside(fam, secs):
    for title, classes in secs:
        if fam in classes or any(c.startswith(fam + "-") for c in classes):
            return title
    return None


def finding_ids():
    ids = set()
    for page in ("audit.html", "a11y.html"):
        ids.update(re.findall(r"\bF-\d{3}\b", (ROOT / "docs" / page).read_text()))
    return sorted(ids)


def version():
    return (ROOT / "VERSION").read_text().strip()


# ------------------------------------------------------------------ renders

def render_counts_md(n):
    tier_word = WORDS.get(n["tiers"], str(n["tiers"]))
    comp = (f"- **{n['components']} documented components** on the [components page](docs/components.html) — "
            f"`lib/components.css` ships {n['families']} class families")
    if n["undocumented"]:
        comp += f"; {len(n['undocumented'])} have no section yet"
    return "\n".join([
        f"- **{n['tokens']} tokens** in `lib/tokens.css`, {tier_word} tiers (primitive → semantic → component), light and dark",
        comp,
        f"- **{n['patterns']} patterns**: " + " · ".join(n["pattern_titles"]),
    ])


def render_tokens_html(light, dark):
    out = []
    tier = None
    for t, name, value in light:
        if t != tier:
            if tier is not None:
                out.append("    </tbody></table></div>")
            tier = t
            out.append(f'  <div class="token-group-label">{html.escape(t)}</div>')
            out.append('  <div class="card" style="padding:0; overflow:hidden; margin-bottom: var(--space-24);">'
                       '<table class="table" style="font-size:var(--text-md);">'
                       '<thead><tr><th style="padding-left:var(--space-16);">Token</th><th>Light</th>'
                       '<th style="padding-right:var(--space-16);">Dark</th></tr></thead><tbody>')
        d = dark.get(name)
        dark_cell = f"<code>{html.escape(d)}</code>" if d and d != value else "—"
        out.append(f'      <tr><td class="td-primary" style="padding-left:var(--space-16);"><code>{html.escape(name)}</code></td>'
                   f'<td><code>{html.escape(value)}</code></td>'
                   f'<td style="padding-right:var(--space-16);">{dark_cell}</td></tr>')
    out.append("    </tbody></table></div>")
    return "\n".join(out)


# ------------------------------------------------------------------ splice

def splice_block(text, name, body, open_="<!--", close="-->"):
    start, end = f"{open_} record:{name} start {close}", f"{open_} record:{name} end {close}"
    i, j = text.find(start), text.find(end)
    if i < 0 or j < 0 or j < i:
        return text, False
    return text[: i + len(start)] + "\n" + body + "\n" + text[j:], True


def splice_inline(text, name, value, open_="<!--", close="-->"):
    start, end = f"{open_} record:{name} start {close}", f"{open_} record:{name} end {close}"
    pattern = re.compile(re.escape(start) + r".*?" + re.escape(end), re.S)
    new, n = pattern.subn(start + value + end, text)
    return new, n > 0


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--write", action="store_true", help="rewrite the rendered spots in place")
    args = ap.parse_args()

    light, dark = tokens()
    fams = families()
    comp_secs = sections("components.html")
    patterns = sections("patterns.html")
    home = documented(comp_secs, fams)
    components = [f for f in fams if f not in PARTS]
    undocumented = [f for f in components if f not in home]
    n = {
        "tokens": len({name for _, name, _ in light}),
        "tiers": len(token_tiers()),
        "components": len(comp_secs),
        "families": len(components),
        "undocumented": undocumented,
        "patterns": len(patterns),
        "pattern_titles": [t for t, _ in patterns],
        "findings": len(finding_ids()),
        "version": version(),
    }

    print(f"tokens {n['tokens']} ({n['tiers']} tiers) · documented components {n['components']} · "
          f"class families {n['families']} (+{len(fams) - len(components)} parts) · "
          f"patterns {n['patterns']} · findings {n['findings']} · v{n['version']}")
    if undocumented:
        print("\nSHIPPED, NO DOCS SECTION")
        for fam in undocumented:
            where = shown_inside(fam, comp_secs)
            print(f"  .{fam:14} {'shown inside: ' + where if where else 'not on the docs page'}")
    print()

    inline = {
        "n-tokens": str(n["tokens"]), "n-components": str(n["components"]),
        "n-families": str(n["families"]), "n-patterns": str(n["patterns"]),
        "n-findings": str(n["findings"]), "version": "v" + n["version"],
    }
    targets = [
        ROOT / "README.md", ROOT / "docs" / "index.html", ROOT / "docs" / "components.html",
        ROOT / "docs" / "foundations.html", ROOT / "docs" / "audit.html", ROOT / "docs" / "docs.js",
    ]
    stale = []
    for path in targets:
        if not path.exists():
            continue
        current = path.read_text()
        rendered = current
        if path.suffix == ".js":
            rendered, _ = splice_inline(rendered, "version", f"'v{n['version']}'", "/*", "*/")
        else:
            rendered, _ = splice_block(rendered, "counts", render_counts_md(n))
            rendered, _ = splice_block(rendered, "tokens", render_tokens_html(light, dark))
            for key, value in inline.items():
                rendered, _ = splice_inline(rendered, key, value)
        if rendered == current:
            continue
        stale.append(path)
        if args.write:
            path.write_text(rendered)
            print(f"rewrote {path.relative_to(ROOT)}")
        else:
            sys.stdout.writelines(difflib.unified_diff(
                current.splitlines(keepends=True), rendered.splitlines(keepends=True),
                fromfile=str(path.relative_to(ROOT)), tofile="rendered",
            ))

    if not stale:
        print("docs are current")
        return 0
    if args.write:
        return 0
    print(f"\n{len(stale)} file(s) stale — run with --write to update", file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())
