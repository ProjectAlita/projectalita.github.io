#!/usr/bin/env python3
"""Fix malformed admonition header lines in mintlify-docs before final conversion pass."""
import os

BASE = os.path.dirname(os.path.abspath(__file__)) + "/../mintlify-docs"

fixes = {
    "release-notes/archived/rn13.mdx": [
        ("!!! Important warning", "!!! warning"),
    ],
    "how-tos/pipelines/nodes/execution-nodes.mdx": [
        ('??? note "MCP Node" Node"', '??? note "MCP Node"'),
        ('??? note "Code Node"Node"', '??? note "Code Node"'),
        ('??? note "Custom Node"Node"', '??? note "Custom Node"'),
    ],
    "how-tos/pipelines/pipeline-runs.mdx": [
        ('??? example "Using Interrupt Points Effectively"fectively"', '??? example "Using Interrupt Points Effectively"'),
        ('??? example "Run Monitoring Tips"ring Tips"', '??? example "Run Monitoring Tips"'),
    ],
    "menus/profile/personalization.mdx": [
        ('??? warning "\\"Failed to Save Settings\\" Error Appears"',
         '??? warning "Failed to Save Settings Error Appears"'),
    ],
    "how-tos/chat-conversations/attach-files.mdx": [
        ('??? warning "Cannot delete attachment with \\"Also delete from artifact toolkit\\" option"',
         '??? warning "Cannot delete attachment with Also delete from artifact toolkit option"'),
    ],
    "how-tos/chat-conversations/file-editing-canvas.mdx": [
        ('??? warning "Issue: \\"View/Edit file\\" Icon Not Available for Attachments"',
         '??? warning "Issue: View/Edit file Icon Not Available for Attachments"'),
    ],
    "how-tos/chat-conversations/planner-internal-tool.mdx": [
        ('??? warning "Issue: "Internal tools configuration updated" But Planner Still Not Working"',
         '??? warning "Issue: Internal tools configuration updated But Planner Still Not Working"'),
    ],
}

for relpath, replacements in fixes.items():
    filepath = os.path.join(BASE, relpath)
    if not os.path.exists(filepath):
        print(f"MISSING: {filepath}")
        continue
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
            print(f"Fixed '{old[:50]}...' in {relpath}")
        else:
            print(f"NOT FOUND: '{old[:60]}' in {relpath}")
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("\nAll fixes applied.")
