#!/usr/bin/env python3
"""Verify no unconverted MkDocs syntax remains in mintlify-docs/."""
import os
import re
import sys

base = sys.argv[1] if len(sys.argv) > 1 else "mintlify-docs"

checks = {
    "!!! admonitions":      re.compile(r"^!!!", re.MULTILINE),
    "??? admonitions":      re.compile(r"^\?\?\?", re.MULTILINE),
    'content tabs (=== ")': re.compile(r'^=== "', re.MULTILINE),
    "{width} image attrs":  re.compile(r"\{[^}]*width", re.MULTILINE),
    ".md) links":           re.compile(r"\.md[)#]"),
}

all_clean = True
for root, dirs, files in os.walk(base):
    dirs[:] = [d for d in dirs if not d.startswith('.')]
    for fname in sorted(files):
        if not fname.endswith('.mdx'):
            continue
        path = os.path.join(root, fname)
        with open(path, encoding='utf-8') as f:
            content = f.read()
        # frontmatter
        if not content.lstrip('\ufeff').startswith('---'):
            print(f"[NO FM ] {path}")
            all_clean = False
        # syntax checks
        for label, rx in checks.items():
            if rx.search(content):
                print(f"[WARN  ] {path}  ({label})")
                all_clean = False

if all_clean:
    print("All clear — no unconverted MkDocs syntax found.")
else:
    sys.exit(1)
