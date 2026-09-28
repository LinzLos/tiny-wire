#!/usr/bin/env python3
"""Verify lib/tokens.js color values match lib/tokens.css.

    python3 scripts/check-tokens.py    # exit 1 on any drift

tokens.js hand-mirrors the RESOLVED value of every color token so JS
consumers read what the browser computes. Nothing ties the two files
together at runtime, so this check does: it resolves each var() chain
in tokens.css — the light `:root`, then the dark overrides cascaded on
top of it — and compares the result against the literal in tokens.js.

Covered: `primitives` (against the light block; JS carries the light
ramps only) and `tokens.colors.light` / `tokens.colors.dark`. JS keys
map to CSS names as camelCase → kebab-case (surfaceSubtle →
--surface-subtle). Typography / spacing / radius / shadows are not
compared: they differ in shape (bare numbers vs px), and the color
blocks are where drift has actually threatened.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

VAR_RE = re.compile(r"^var\((--[a-z0-9-]+)\)$")
# key: 'value' — JS object entries whose value is a string literal.
PAIR_RE = re.compile(r"([A-Za-z0-9]+):\s*'([^']+)'")


def camel_to_kebab(name):
    return re.sub(r"([a-z0-9])([A-Z])", r"\1-\2", name).lower()


def strip_comments(text):
    return re.sub(r"/\*.*?\*/", "", text)


# ------------------------------------------------------------------ tokens.css

def css_declarations():
    """({name: value} for the light :root, {name: value} for the dark block).
    Line-based, same shape as render-docs.py: several declarations can share
    a line, so match anywhere."""
    css = (ROOT / "lib" / "tokens.css").read_text()
    light, dark, block = {}, {}, None
    for line in css.splitlines():
        if re.match(r"^:root\s*\{", line):
            block = light
        elif re.match(r'^:root\[data-theme="dark"\]\s*\{', line):
            block = dark
        elif line.startswith("}"):
            block = None
        if block is None:
            continue
        for name, value in re.findall(r"(--[a-z0-9-]+)\s*:\s*([^;]+);", strip_comments(line)):
            block[name] = value.strip()
    return light, dark


def resolve(value, env):
    """Follow var(--x) chains to a literal (logo → brand → cobalt-600 → hex)."""
    seen = set()
    while (m := VAR_RE.match(value)):
        name = m.group(1)
        if name in seen or name not in env:
            return None
        seen.add(name)
        value = env[name]
    return value


# ------------------------------------------------------------------ tokens.js

def js_primitives(js):
    """{css name: value} from `export const primitives`. Groups nest one
    level (warm.950 → --warm-950); the rest are scalars (amberChart →
    --amber-chart)."""
    body = re.search(r"export const primitives = \{(.*?)\n\}", js, re.S).group(1)
    out = {}

    def grab_group(m):
        prefix = camel_to_kebab(m.group(1))
        for key, value in PAIR_RE.findall(m.group(2)):
            out[f"--{prefix}-{key}"] = value
        return ""

    scalars = re.sub(r"([A-Za-z0-9]+):\s*\{([^}]*)\}", grab_group, body)
    for key, value in PAIR_RE.findall(scalars):
        out["--" + camel_to_kebab(key)] = value
    return out


def js_colors(js, theme):
    """{css name: value} from tokens.colors.<theme>. The first `light: {` /
    `dark: {` in the file is the colors block (fontWeight's `light: 300`
    and azure's `light: '#…'` open no brace)."""
    block = re.search(theme + r":\s*\{(.*?)\}", js, re.S).group(1)
    return {"--" + camel_to_kebab(k): v for k, v in PAIR_RE.findall(block)}


# ------------------------------------------------------------------ compare

def norm(value):
    return re.sub(r"\s+", " ", value).strip().upper() if value else value


def compare(label, js_map, env, problems):
    ok = 0
    for css_name, js_value in js_map.items():
        if css_name not in env:
            problems.append(f"{label}: {css_name} is in tokens.js but not declared in tokens.css")
            continue
        css_value = resolve(env[css_name], env)
        if css_value is None:
            problems.append(f"{label}: {css_name} does not resolve in tokens.css ({env[css_name]})")
        elif norm(css_value) != norm(js_value):
            problems.append(f"{label}: {css_name} is {js_value} in tokens.js but {css_value} in tokens.css")
        else:
            ok += 1
    return f"{label} {ok}/{len(js_map)}"


def main():
    js = strip_comments((ROOT / "lib" / "tokens.js").read_text())
    light, dark = css_declarations()
    dark_env = {**light, **dark}

    problems = []
    counts = [
        compare("primitives", js_primitives(js), light, problems),
        compare("colors.light", js_colors(js, "light"), light, problems),
        compare("colors.dark", js_colors(js, "dark"), dark_env, problems),
    ]
    print(" · ".join(counts))
    if problems:
        print()
        for p in problems:
            print(f"  ! {p}")
        print(f"\n{len(problems)} mismatch(es) — update lib/tokens.js to match lib/tokens.css", file=sys.stderr)
        return 1
    print("tokens.js matches tokens.css")
    return 0


if __name__ == "__main__":
    sys.exit(main())
