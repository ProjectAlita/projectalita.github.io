#!/usr/bin/env python3
"""Add Mintlify frontmatter (title + description) to all .mdx files that lack it.

Logic:
- title  : first H1 heading, or filename-derived fallback
- description: first non-empty, non-heading, non-component paragraph line,
               truncated to 160 chars, quotes escaped
"""
import re
import os
import sys

# Matches a real frontmatter block (--- at position 0 on line 1)
FRONTMATTER_RE = re.compile(r'^\s*---\s*\n')

# H1 heading
H1_RE = re.compile(r'^#\s+(.+)', re.MULTILINE)

# Lines to skip when hunting for description
SKIP_LINE_RE = re.compile(
    r'^\s*$'              # blank
    r'|^#+\s'            # any heading
    r'|^<'               # MDX component
    r'|^---'             # HR / frontmatter
    r'|^\|'              # table
    r'|^!\['             # image
    r'|^\s*[-*+]\s'      # list item
    r'|^\s*\d+\.\s'      # ordered list
    r'|^```'             # code fence
)


def clean(text):
    """Strip inline markdown and escape double quotes for YAML."""
    text = re.sub(r'\*{1,2}([^*]+)\*{1,2}', r'\1', text)   # bold/italic
    text = re.sub(r'`([^`]+)`', r'\1', text)                 # inline code
    text = re.sub(r'\[([^\]]+)\]\([^)]*\)', r'\1', text)     # links
    text = text.replace('"', '\\"')
    return text.strip()


def derive_title_from_path(filepath):
    base = os.path.basename(filepath).replace('.mdx', '')
    return base.replace('-', ' ').replace('_', ' ').title()


def add_frontmatter(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if real frontmatter already present (--- on very first line)
    if content.lstrip('\ufeff').startswith('---'):
        return False

    # --- Title ---
    h1 = H1_RE.search(content)
    if h1:
        title = clean(h1.group(1))
    else:
        title = derive_title_from_path(filepath)

    # --- Description ---
    description = ''
    for line in content.splitlines():
        if SKIP_LINE_RE.match(line):
            continue
        candidate = clean(line)
        if len(candidate) < 10:
            continue
        description = candidate[:160]
        break
    if not description:
        description = title

    frontmatter = f'---\ntitle: "{title}"\ndescription: "{description}"\n---\n\n'

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(frontmatter + content)

    return True


if __name__ == '__main__':
    target = sys.argv[1] if len(sys.argv) > 1 else '.'
    added = 0
    skipped = 0
    for root, dirs, files in os.walk(target):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for fname in files:
            if fname.endswith('.mdx'):
                if add_frontmatter(os.path.join(root, fname)):
                    added += 1
                else:
                    skipped += 1
    print(f"Frontmatter complete: {added} added, {skipped} already had it.")
