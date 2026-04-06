#!/usr/bin/env python3
"""Fix remaining malformed admonition header lines (second batch)."""
import os

BASE = os.path.dirname(os.path.abspath(__file__)) + "/../mintlify-docs"

fixes = {
    "how-tos/chat-conversations/data-analysis-internal-tool.mdx": [
        ('??? warning "Data Analysis tool requires file access\\""',
         '??? warning "Data Analysis tool requires file access"'),
    ],
    "how-tos/indexing/schedule-indexing.mdx": [
        ('??? example "Cron Expression Validation Errors"on Errors"',
         '??? example "Cron Expression Validation Errors"'),
        ('??? example "Schedule Not Executing"Executing"',
         '??? example "Schedule Not Executing"'),
        ('??? example "Schedule Enabled but No Notification"ification"',
         '??? example "Schedule Enabled but No Notification"'),
        ('??? info "Managing Multiple Schedules"Schedules"',
         '??? info "Managing Multiple Schedules"'),
        ('??? info "Monitoring and Maintenance"intenance"',
         '??? info "Monitoring and Maintenance"'),
    ],
}

for relpath, replacements in fixes.items():
    filepath = os.path.join(BASE, relpath)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
            print(f"Fixed in {relpath}: {old[:60]}")
        else:
            print(f"NOT FOUND in {relpath}: {old[:60]}")
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Done.")
