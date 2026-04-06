#!/usr/bin/env python3
"""Convert MkDocs Material content tabs to Mintlify <Tabs>/<Tab> components.

Handles:
- === "Title" headers (with optional blank line before body)
- 4-space-indented bodies (may contain blank lines within)
- Groups consecutive tab blocks into one <Tabs> wrapper
"""
import os
import sys


def convert_tabs(content):
    lines = content.split('\n')
    result = []
    i = 0
    tab_re = __import__('re').compile(r'^=== "([^"]+)"\s*$')

    while i < len(lines):
        if tab_re.match(lines[i]):
            # Collect all consecutive tab entries into one group
            tab_entries = []

            while i < len(lines) and tab_re.match(lines[i]):
                title = tab_re.match(lines[i]).group(1)
                i += 1

                # Skip optional single blank line after header
                if i < len(lines) and lines[i].strip() == '':
                    i += 1

                # Collect indented body (4-space or blank between indented lines)
                body_lines = []
                while i < len(lines):
                    line = lines[i]
                    if line.startswith('    '):
                        body_lines.append(line[4:])
                        i += 1
                    elif line.strip() == '':
                        # Look ahead: if next non-blank is still indented, keep it
                        j = i + 1
                        while j < len(lines) and lines[j].strip() == '':
                            j += 1
                        if j < len(lines) and lines[j].startswith('    '):
                            body_lines.append('')
                            i += 1
                        else:
                            # Blank line ends this tab body; skip it
                            i += 1
                            break
                    else:
                        break  # Non-indented, non-blank → end of body

                tab_entries.append((title, '\n'.join(body_lines).strip()))

            # Render <Tabs> block
            out = ['<Tabs>']
            for title, body in tab_entries:
                out.append(f'  <Tab title="{title}">')
                for bline in body.split('\n'):
                    out.append(f'    {bline}' if bline else '')
                out.append('  </Tab>')
            out.append('</Tabs>')
            result.append('\n'.join(out))
        else:
            result.append(lines[i])
            i += 1

    return '\n'.join(result)


def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    converted = convert_tabs(content)
    if converted != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(converted)
        return True
    return False


if __name__ == '__main__':
    target = sys.argv[1] if len(sys.argv) > 1 else '.'
    changed = 0
    for root, dirs, files in os.walk(target):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for fname in files:
            if fname.endswith('.mdx'):
                if process_file(os.path.join(root, fname)):
                    changed += 1
    print(f"Tab conversion complete. {changed} file(s) modified.")
