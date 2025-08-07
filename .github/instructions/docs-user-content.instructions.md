# Specialized Instructions – Docs Content

1. Map request to existing nav group (Home, Release Notes, Platform Documentation, Features Guides, Quick Start Guides, How TOs). Ask if ambiguous.
2. Use category skeletons from global instructions (Section 5).
3. Admonitions: ALWAYS use Material syntax (!!! note / !!! warning). Convert legacy > [!NOTE] or bold callouts.
4. For new page, propose:
   - File path (kebab-case)
   - Nav insertion snippet for mkdocs_el.yml
5. Quick Start: ≤7 steps; each begins with imperative verb.
6. How TO: Action-focused title; no conceptual deep dive beyond brief context.
7. Feature Guides: Include Concepts and Best Practices sections.
8. Platform Menu pages: Emphasize navigation path and typical tasks; link to relevant Quick Starts / How TOs.
9. Normalize links: remove double slashes; verify relative depth.
10. If Glossary term used but not defined: append “(Add to Glossary)” note once.
11. Screenshot placeholders:
    ![<purpose>](proposed-relative-path)
12. Release notes editing in these files is allowed but major workflow adjustments should go through changelog instructions.
13. No front matter unless requested; if present, keep minimal (title, description).
14. Provide internal self-check summary at end (optional) if substantive restructure.

Return full file content (not a diff) unless user explicitly requests a diff.
