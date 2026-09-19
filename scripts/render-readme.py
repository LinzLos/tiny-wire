#!/usr/bin/env python3
"""Render the README's counts from lib/ and the docs pages.

    python3 scripts/render-readme.py           # check: exit 1 if the README is stale
    python3 scripts/render-readme.py --write   # rewrite the counts block

Each number means one thing:
  tokens      unique custom-property names declared in lib/tokens.css
  components  <h2> sections on docs/components.html — the documented set
  patterns    <h2> sections on docs/patterns.html

It also lists what lib/components.css ships that has no docs section of its
own. That list should be empty; while it isn't, those are components a
reader cannot find.
"""
import argparse
import difflib
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
README = ROOT / "README.md"

# Class families that are parts of a form or a page, not components.
PARTS = {"field", "helper", "label", "section"}
# Heading word -> class family, where the two differ.
ALIASES = {"button": "btn"}
# Families that share one docs section with another family.
SHARED = {"tabs": {"tab"}}
WORDS = {1: "one", 2: "two", 3: "three", 4: "four", 5: "five"}


def strip_comments(css):
    return re.sub(r"/\*.*?\*/", "", css, flags=re.S)


def token_names():
    css = (ROOT / "lib" / "tokens.css").read_text()
    return sorted(set(re.findall(r"^\s*(--[a-z0-9-]+)\s*:", css, re.M)))


def token_tiers():
    css = (ROOT / "lib" / "tokens.css").read_text()
    return sorted(set(re.findall(r"TIER (\d)", css)))


def families():
    css = strip_comments((ROOT / "lib" / "components.css").read_text())
    return sorted(set(re.findall(r"^\.([a-z][a-z0-9]*)", css, re.M)))


def sections(page):
    """(heading, classes used under it) for every <h2> on a docs page."""
    html = (ROOT / "docs" / page).read_text()
    out = []
    for chunk in re.split(r"<h2[^>]*>", html)[1:]:
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


def render(n_tokens, tiers, n_sections, n_families, undocumented, patterns):
    tier_word = WORDS.get(len(tiers), str(len(tiers)))
    comp = (f"- **{n_sections} documented components** on the [components page](docs/components.html) — "
            f"`lib/components.css` ships {n_families} class families")
    if undocumented:
        comp += f"; {len(undocumented)} have no section yet"
    return "\n".join([
        f"- **{n_tokens} tokens** in `lib/tokens.css`, {tier_word} tiers (primitive → semantic → component), light and dark",
        comp,
        f"- **{len(patterns)} patterns**: " + " · ".join(t for t, _ in patterns),
    ])


def splice(text, block, body):
    start, end = f"<!-- record:{block} start -->", f"<!-- record:{block} end -->"
    i, j = text.find(start), text.find(end)
    if i < 0 or j < 0 or j < i:
        sys.exit(f"README is missing the {start} … {end} markers")
    return text[: i + len(start)] + "\n" + body + "\n" + text[j:]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--write", action="store_true", help="rewrite the counts block in README.md")
    args = ap.parse_args()

    tokens, tiers = token_names(), token_tiers()
    fams = families()
    comp_secs = sections("components.html")
    patterns = sections("patterns.html")
    home = documented(comp_secs, fams)
    components = [f for f in fams if f not in PARTS]
    undocumented = [f for f in components if f not in home]

    print(f"tokens {len(tokens)} ({len(tiers)} tiers) · documented components {len(comp_secs)} · "
          f"class families {len(components)} (+{len(fams) - len(components)} parts) · patterns {len(patterns)}")
    if undocumented:
        print("\nSHIPPED, NO DOCS SECTION")
        for fam in undocumented:
            where = shown_inside(fam, comp_secs)
            print(f"  .{fam:14} {'shown inside: ' + where if where else 'not on the docs page'}")
    print()

    current = README.read_text()
    rendered = splice(current, "counts", render(len(tokens), tiers, len(comp_secs), len(components), undocumented, patterns))
    if rendered == current:
        print("README is current")
        return 0
    if args.write:
        README.write_text(rendered)
        print("README rewritten")
        return 0
    sys.stdout.writelines(difflib.unified_diff(
        current.splitlines(keepends=True), rendered.splitlines(keepends=True),
        fromfile="README.md", tofile="rendered",
    ))
    print("\nREADME is stale — run with --write to update it", file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())
