#!/usr/bin/env python3
"""Convert MkDocs Material admonitions to Mintlify MDX components.

Handles:
- !!! type "Optional Title"  -> <Component title="...">...</Component>
- ??? type "Optional Title"  -> <Accordion title="...">...</Accordion>
- Multi-paragraph bodies (blank lines within 4-space-indented block)
- Case-insensitive type matching
- Extra custom types used in ELITEA docs
"""
import re
import sys
import os

ADMONITION_MAP = {
    'note':      'Note',
    'tip':       'Tip',
    'info':      'Info',
    'warning':   'Warning',
    'danger':    'Warning',
    'example':   'Note',
    'success':   'Check',
    'question':  'Note',
    'abstract':  'Note',
    'quote':     'Note',
    # Extra types found in ELITEA docs
    'reference': 'Info',
    'related':   'Info',
    'important': 'Warning',
    'failure':   'Warning',
}

# Default title overrides for types that map to a different component
DEFAULT_TITLE_MAP = {
    'danger':    'Danger',
    'example':   'Example',
    'question':  'Question',
    'abstract':  'Abstract',
    'quote':     'Quote',
    'reference': 'Reference',
    'related':   'Related',
    'important': 'Important',
    'failure':   'Failure',
}


def convert_admonitions(content):
    """
    Parse the file line-by-line, collecting admonition blocks and replacing them
    with Mintlify MDX components. This approach correctly handles multi-paragraph
    bodies where blank lines appear between indented content lines.
    """
    lines = content.split('\n')
    result = []
    i = 0
    # Header pattern: !!! type "Optional Title" or ??? type "Optional Title"
    header_re = re.compile(
        r'^(!!!|\?\?\?)\s+(\w+)\s*(?:"([^"]*)")?\s*$'
    )

    while i < len(lines):
        m = header_re.match(lines[i])
        if m:
            marker = m.group(1)
            admon_type = m.group(2).lower()
            explicit_title = m.group(3)  # None if no title quoted

            # Collect body: lines that start with 4 spaces OR are blank,
            # but stop at consecutive blank lines that are followed by
            # a non-indented, non-blank line (end of block).
            i += 1
            body_lines = []

            while i < len(lines):
                line = lines[i]
                if line.startswith('    '):
                    body_lines.append(line[4:])  # dedent
                    i += 1
                elif line == '' or line.strip() == '':
                    # Blank line — look ahead: if next non-blank line is indented,
                    # keep the blank; otherwise end the block.
                    j = i + 1
                    while j < len(lines) and (lines[j] == '' or lines[j].strip() == ''):
                        j += 1
                    if j < len(lines) and lines[j].startswith('    '):
                        body_lines.append('')
                        i += 1
                    else:
                        break  # end of admonition block
                else:
                    break  # non-indented content ends the block

            body = '\n'.join(body_lines).strip()

            component = ADMONITION_MAP.get(admon_type, 'Note')

            # Determine title attribute
            if explicit_title:
                title = explicit_title
            elif admon_type in DEFAULT_TITLE_MAP:
                title = DEFAULT_TITLE_MAP[admon_type]
            else:
                title = None

            title_attr = f' title="{title}"' if title else ''

            if marker == '???':
                # Collapsible → Accordion
                accordion_title = title if title else admon_type.capitalize()
                block = f'<Accordion title="{accordion_title}">\n{body}\n</Accordion>'
            else:
                block = f'<{component}{title_attr}>\n{body}\n</{component}>'

            result.append(block)
        else:
            result.append(lines[i])
            i += 1

    return '\n'.join(result)


def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    converted = convert_admonitions(content)
    if converted != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(converted)
        return True
    return False


if __name__ == '__main__':
    target = sys.argv[1] if len(sys.argv) > 1 else '.'
    changed = 0
    for root, dirs, files in os.walk(target):
        # Skip hidden dirs
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for fname in files:
            if fname.endswith('.mdx'):
                if process_file(os.path.join(root, fname)):
                    changed += 1
    print(f"Admonition conversion complete. {changed} file(s) modified.")
