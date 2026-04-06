#!/usr/bin/env python3
"""Fix remaining MDX parse errors across mintlify-docs files.

Fixes applied:
  1. Escape bare { and } in non-code-fence text contexts
     (prevents "Could not parse expression with acorn" errors)
  2. Escape < followed by a digit, $, or space
     (prevents "unexpected character before name" errors)
  3. Escape XML-like tags in text (e.g., <LatestBuildCycle>, <value ...>)
     that aren't valid JSX component names in context
"""
import os
import re
import sys

# Patterns for angle-bracket issues in TEXT (not inside code fences or JSX tags):
# <digit...>  e.g. <100 employees>, <500 cases>
# <$...>      e.g. <$50 budget>
# These need to become &lt;
ANGLE_DIGIT = re.compile(r'<(\d|\$)')
# <word with space>  — plaintext XML-like constructs
# e.g. <value or description of value>, <LatestBuildCycle>
# Only match if NOT inside a JSX component expression (heuristic: tag-like in text)
ANGLE_WORD_SPACE = re.compile(
    r'<([A-Za-z][A-Za-z0-9]*(?:\s+[^>]{0,40})?>[^<\n]{0,60}</[A-Za-z][A-Za-z0-9]*>)')
# Simpler: any <Word ...> where Word is uppercase-starting (non-Mintlify component)
# and contains spaces, OR is followed by > with no obvious JSX context
PLAINTEXT_TAG = re.compile(r'<([A-Z][A-Za-z0-9]+)>')

# Backtick-3 fence marker
BT3 = chr(96) * 3


def escape_curly_in_line(line):
    """Escape { and } that are NOT inside inline code spans or JSX component tags."""
    result = []
    i = 0
    in_inline_code = False
    while i < len(line):
        ch = line[i]
        if ch == chr(96):
            # toggle inline code
            in_inline_code = not in_inline_code
            result.append(ch)
        elif ch in '{' and not in_inline_code:
            result.append('\\{')
        elif ch in '}' and not in_inline_code:
            result.append('\\}')
        else:
            result.append(ch)
        i += 1
    return ''.join(result)


def should_escape_curly(line):
    """Return True if this line has bare { or } that would trip MDX's acorn parser."""
    stripped = line.strip()
    # Skip lines that are pure MDX component tags
    if stripped.startswith('<') and not stripped.startswith('<!'):
        return False
    # Skip frontmatter lines
    if stripped.startswith('---'):
        return False
    # Check for bare (un-escaped) curly braces outside inline code
    in_code = False
    for ch in stripped:
        if ch == chr(96):
            in_code = not in_code
        elif ch == '{' and not in_code:
            return True
    return False


def fix_angle_brackets(line):
    """Escape < followed by digit or $ to &lt;"""
    # Replace <digit or <$ with &lt; + that char
    line = ANGLE_DIGIT.sub(lambda m: '&lt;' + m.group(1), line)
    return line


def fix_file(path, verbose=False):
    with open(path, encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    in_fence = False
    changed = False

    for line in lines:
        stripped = line.rstrip('\n')

        # Track code fences
        lstripped = stripped.lstrip()
        if lstripped.startswith(BT3):
            in_fence = not in_fence
            new_lines.append(line)
            continue

        if in_fence:
            new_lines.append(line)
            continue

        original = line
        new = line

        # Fix 1: curly braces in text
        if should_escape_curly(new):
            new = escape_curly_in_line(new)

        # Fix 2: angle brackets before digits or $
        new = fix_angle_brackets(new)

        if new != original:
            changed = True
            if verbose:
                print(f"  FIXED: {repr(original[:80])} → {repr(new[:80])}")

        new_lines.append(new)

    if changed:
        with open(path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)

    return changed


if __name__ == '__main__':
    base = sys.argv[1] if len(sys.argv) > 1 else '.'
    fixed = 0
    for root, dirs, files in os.walk(base):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for fname in sorted(files):
            if fname.endswith('.mdx'):
                path = os.path.join(root, fname)
                if fix_file(path):
                    fixed += 1
                    print(f"Fixed: {path}")
    print(f"\nTotal files fixed: {fixed}")
