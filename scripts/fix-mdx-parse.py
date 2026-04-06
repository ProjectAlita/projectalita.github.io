#!/usr/bin/env python3
"""Fix two MDX parse issues across all .mdx files:

1. <br> → <br /> (MDX requires self-closing void tags)
2. <Frame> inside list items (indented) → unwrap to bare <img ... />
   (block-level JSX inside list-item continuation breaks MDX v2 parser)
"""
import os
import re
import sys

# Match an indented <Frame> block produced by convert-image-attrs.py:
#   (leading_spaces)<Frame>\n(any_spaces)<img ... />\n</Frame>
# The opening <Frame> has leading whitespace (≥1 space = inside list/indent).
# We keep the leading indent and just the <img> line.
#
# Pattern explanation:
#   (\s+)      → leading whitespace before <Frame> (captured as indent)
#   <Frame>\n  → literal opening tag + newline
#   [ \t]*     → optional whitespace before <img>
#   (<img [^/]*/>) → the self-closing img tag (captured)
#   \n[ \t]*   → newline + optional whitespace before </Frame>
#   </Frame>   → closing tag
INDENTED_FRAME_RE = re.compile(
    r'(\s+)<Frame>\n[ \t]*(<img [^>]*/>)\n[ \t]*</Frame>',
    re.MULTILINE
)

BR_RE = re.compile(r'<br\s*(?<!/)>')


def fix_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        original = f.read()

    content = original

    # Fix 1: <br> → <br />
    content = BR_RE.sub('<br />', content)

    # Fix 2: unwrap indented <Frame> blocks
    # Replace with: (indent)(img)
    content = INDENTED_FRAME_RE.sub(lambda m: m.group(1) + m.group(2), content)

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False


if __name__ == '__main__':
    base = sys.argv[1] if len(sys.argv) > 1 else '.'
    fixed = 0
    for root, dirs, files in os.walk(base):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for fname in sorted(files):
            if fname.endswith('.mdx'):
                if fix_file(os.path.join(root, fname)):
                    fixed += 1
    print(f"Fixed {fixed} files.")
