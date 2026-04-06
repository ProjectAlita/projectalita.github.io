#!/usr/bin/env python3
"""Convert MkDocs attr_list image attributes to Mintlify <Frame>/<img> components.

Handles:
- ![alt](path){width="N"}
- ![alt](path){width="N" loading="lazy"}
- ![alt](path){loading=lazy, width="N"}
- ![alt](<path with spaces>){...}   (angle-bracket paths)
- Images inside table cells → strip {…} only (no <Frame> wrapper)
- Standalone images → <Frame><img src="..." alt="..." width="N" /></Frame>
"""
import re
import os
import sys


# Matches ![alt](<path> or path){...attrs...}
IMG_RE = re.compile(
    r'!\[([^\]]*)\]'          # ![alt]
    r'\((<[^>]*>|[^)]*)\)'    # (path) or (<path>)
    r'\{([^}]*)\}'            # {attrs}
)


def parse_attrs(attr_str):
    """Extract width value from an attribute string like 'width="600" loading="lazy"'."""
    m = re.search(r'width\s*=\s*"?(\d+)"?', attr_str)
    return m.group(1) if m else None


def convert_image(line):
    """
    Convert all attr_list images on a line.
    - Inside table row (line has |): strip {…} only.
    - Standalone image line: replace with <Frame><img .../></Frame>.
    """
    stripped = line.strip()
    is_table_row = stripped.startswith('|') or (stripped.count('|') >= 2 and stripped.index('|') < 10)

    def replacer(m):
        alt = m.group(1)
        raw_path = m.group(2)
        attr_str = m.group(3)
        # Normalise path: remove angle brackets
        path = raw_path.strip('<>').strip()
        width = parse_attrs(attr_str)

        if is_table_row:
            # Inside table: just render plain image, no Frame
            return f'![{alt}]({path})'
        else:
            width_attr = f' width="{width}"' if width else ''
            return f'<Frame>\n  <img src="{path}" alt="{alt}"{width_attr} />\n</Frame>'

    return IMG_RE.sub(replacer, line)


def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    changed = False
    for line in lines:
        if IMG_RE.search(line):
            new_line = convert_image(line)
            if new_line != line:
                changed = True
                line = new_line
        new_lines.append(line)

    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        return True
    return False


if __name__ == '__main__':
    target = sys.argv[1] if len(sys.argv) > 1 else '.'
    modified = 0
    for root, dirs, files in os.walk(target):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for fname in files:
            if fname.endswith('.mdx'):
                if process_file(os.path.join(root, fname)):
                    modified += 1
    print(f"Image attribute conversion complete. {modified} file(s) modified.")
