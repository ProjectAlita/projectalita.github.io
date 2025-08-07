# ELITEA Documentation Authoring & Copilot Instruction Guide

This README explains how to use, extend, and maintain the documentation authoring guidelines enforced through Copilot instruction files.

## 1. What Lives Where

| File | Purpose |
|------|---------|
| .github/copilot-instructions.md | Global rules (structure, tone, MkDocs + Material usage). |
| .github/instructions/docs-user-content.instructions.md | Rules for general page creation & revision. |
| .github/instructions/changelog.instructions.md | Release note workflow and template. |
| .github/instructions/glossary.instructions.md | Format & curation rules for glossary. |
| .github/instructions/screenshots.instructions.md | Screenshot naming and inclusion standards. |
| .github/instructions/prompt-helper.instructions.md | Template guidance for asking Copilot for new docs. |
| README-DOCS-INSTRUCTIONS.md | Human-facing summary & maintenance guide (this file). |
| mkdocs_el.yml | Primary (locale-specific) navigation; must be updated when adding new pages. |

## 2. Local Preview (MkDocs + Material)

Install dependencies (example):

```bash
pip install mkdocs-material
mkdocs serve -f mkdocs_el.yml
```

Site will serve at http://127.0.0.1:8000 (default) with live reload.

## 3. Adding a New Page

1. Choose appropriate nav group (confirm existing groups first).
2. Create file under matching directory (kebab-case name).
3. Use the skeleton for its category (Quick Start / Feature Guide / Platform Menu / How TO).
4. Insert an entry into mkdocs_el.yml under the correct group & indentation.
5. Run mkdocs serve -f mkdocs_el.yml to validate:
   - Navigation appearance
   - Link correctness (no double “//”)
6. Open PR with:
   - New file
   - mkdocs_el.yml diff
   - (If images) new assets in docs/assets/images/…

## 4. Release Notes Workflow

When a new version is released:
1. Copy current content from docs/release-notes/rn_current.md to archived/rn{nextNumber}.md (increment n).
2. Add the archived file to the “Archive” subsection in mkdocs_el.yml with label “RN X.Y.Z”.
3. Overwrite rn_current.md with template:

```
# Release X.Y.Z (YYYY-MM-DD)

## Added
## Changed
## Fixed
## Deprecated
## Security
## Known Issues
```

4. Update nav label for rn_current.md to “RN X.Y.Z”.
5. Validate links and section ordering.

## 5. Screenshot Standards

- Directory: docs/assets/images/<group>/<topic>-<state>-step<n>.png
- Semantic names (no timestamps).
- Alt text: functional (“Chat canvas showing multi-agent outputs”), not aesthetic.
- Redact sensitive data; use dummy placeholders.
- Avoid including OS chrome unless necessary for clarity.

## 6. Admonitions (Material Theme)

Use:
```
!!! tip "Faster Setup"
    You can import existing prompts to skip manual creation.
```

Collapsible:
```
??? note "Advanced Threshold Settings"
    These options are experimental.
```

Avoid legacy blockquote or custom HTML admonitions unless migration WIP.

## 7. Tabs (When Needed)

```
=== "UI"
    1. Open **Agents**.
=== "API"
    ```bash
    curl -X POST /agents
    ```
```

Use sparingly—only for genuine modality differences (UI vs API).

## 8. Glossary Maintenance

File: docs/home/glossary.md  
Add new terms alphabetically; keep definitions concise. Link to menu/feature docs where relevant. Avoid overloading with general computing terms unless ELITEA-specific nuance exists.

## 9. Quality Checklist (Manual Review)

Before merging:
- Right nav group + mkdocs_el.yml updated
- Heading hierarchy begins with # (one H1)
- Steps are imperative verbs
- Admonitions in Material syntax
- No double slashes in relative links
- Glossary terms cross-linked once
- No fabricated version/CVE claims
- Screenshots (if added) have alt text and semantic names

## 10. Requesting Copilot Assistance

Use prompt helper pattern (see .github/instructions/prompt-helper.instructions.md). Provide:
- Category
- Target path
- Prerequisites
- Desired outcome
- Steps count / constraints
- Needed screenshots
- Glossary additions

Example request:
“Generate a Platform Documentation page for ‘Notifications’ menu. Path: docs/platform-documentation/menus/notifications.md. Include Key Capabilities, Access Path, Common Tasks (link to Quick Start pages), 2 screenshot suggestions.”

## 11. Updating Instructions

If site structure changes (new nav group, new content type):
1. Update mkdocs_el.yml.
2. Amend .github/copilot-instructions.md (nav section + category definitions).
3. Adjust specialized instruction modules if new patterns needed.
4. Document change here (changelog section below).

## 12. Common Pitfalls & Resolutions

| Pitfall | Resolution |
|---------|------------|
| Page added but not visible | Missing nav entry in mkdocs_el.yml. |
| Broken relative links | Recalculate path depth; remove accidental double slash. |
| Admonition renders as plain text | Incorrect indentation or missing 4-space indent for body. |
| Glossary term repeated with conflicting phrasing | Normalize to canonical term; merge variants. |
| Release archive numbering skipped | Recount existing rn{n}.md in archived; next = max(n)+1. |

## 13. Proposed Future Enhancements (Optional)

- Introduce consistent kebab-case migration (with redirect plugin).
- Add version macros if multi-version docs become necessary.
- Enforce linting (mdformat + markdownlint + link checker).
- Automate release note archival via script.

## 14. Instruction Set Changelog (Manual)

| Date | Change | Files Affected |
|------|--------|----------------|
| 2025-08-07 | Added MkDocs Material guidance & this README | Global + README |
| (add new rows) | | |

## 15. Questions / Gaps to Clarify

If any of these apply, seek clarification before extending instructions:
- Are localized builds (other than mkdocs_el.yml) planned (mkdocs_en.yml etc.)?
- Do we need a formal front matter meta schema?
- Should we enforce uniform kebab-case going forward?

---

Maintained by: (Add owners / GitHub handles)  
Feedback path: Open an issue titled “[Docs Instructions] <summary>”.

End of README.