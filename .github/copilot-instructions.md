# Copilot Global Instructions – ELITEA Documentation (MkDocs + Material Theme)

These instructions guide GitHub Copilot (Chat + inline) when generating, editing, or restructuring documentation in this repository. They now explicitly reflect use of MkDocs with the Material for MkDocs theme and the locale‑specific config file mkdocs_el.yml.

# ==================================================================== 0. STACK & BUILD CONTEXT

- Static site generator: MkDocs
- Theme: Material for MkDocs (assumed standard features: admonitions, content tabs, icons, search, light/dark scheme)
- Primary config (Greek / “el” variant): mkdocs_el.yml (explicit nav; NOT filesystem auto‑nav)
- Serve locally:
  pip install mkdocs-material
  mkdocs serve -f mkdocs_el.yml
- Build:
  mkdocs build -f mkdocs_el.yml
- Navigation is fully declared in mkdocs_el.yml. New pages require BOTH file creation AND nav entry insertion to appear in the built site.

====================================================================

1. # AUDIENCE & VOICE
   Audience: Non‑technical or light‑technical business/analyst users.
   Tone: Clear, direct, reassuring, factual (no hype).
   Voice: Active (“Click”, “Select”), second person (“You”).
   Avoid: Over‑promising claims about AI determinism; unverified performance statements.

# ==================================================================== 2. NAVIGATION STRUCTURE (EXTRACTED FROM mkdocs_el.yml)

Top-level groups (current):

1. Home
   - home/glossary.md
   - home/introduction.md
2. Release Notes
   - release-notes/rn_current.md (Current: RN 1.6.0)
   - release-notes/archived/rn9.md … rn1.md (RN 1.5.2 → 1.0.0)
3. Platform Documentation
   - ELITEA Menus & Settings (platform-documentation/menus/\*.md)
   - ELITEA Extensions (platform-documentation/extensions/\*.md)
4. Features Guides
   - ELITEA Core Features (feature-guides/core-features/\*.md)
   - ELITEA Advanced Features (feature-guides/advanced-features/roles.md)
5. Quick Start Guides (quick-start/\*.md)
6. How TOs
   - MCP (how-tos/mcp/\*.md)

Copilot must:

- Map requests to an existing group when possible.
- Provide nav insertion snippet suggestions for mkdocs_el.yml when proposing new pages.
- Not silently reorder or rename nav groups.

# ==================================================================== 3. FILE NAMING & PATHS

Observed mix: kebab-case (personal-access-token.md) and snake_case (very_quickstart_guide.md).
Rules for NEW files:

- Prefer kebab-case (create-agent-pipeline.md).
- Keep existing legacy names unchanged unless user authorizes a migration.
- Place pages in group-consistent directories mirroring current taxonomy.

Release Notes Pattern:

- Current: rn_current.md (label in nav shows active version).
- Archive: archived/rn{n}.md where nav label supplies semantic version (“RN 1.5.2”).
  Do NOT infer version from file name; rely on nav label or user prompt.

# ==================================================================== 4. MATERIAL THEME CONVENTIONS

Admonitions (preferred syntax):
!!! note "Optional Title"
Body text (indented 4 spaces).

Supported types: note, tip, info, warning, danger, example, success, question, abstract, quote.
If title not needed: omit quoted string. Avoid the GitHub style > [!NOTE] inside docs unless specifically requested; convert legacy blocks to Material style when revising.

Collapsible details:
??? note "Advanced configuration"
Content hidden by default.

Tabs (for variants, environments, UI vs API):
=== "UI"
UI instructions here
=== "API"
API instructions here

Icons (when beneficial, sparing use):
:material-robot: Agents
(Only if it enhances clarity; do not overdecorate.)

Code highlighting:
Use triple backticks with language hints (`json, `bash). Avoid overly long inline code; break into fenced blocks.

Tables:
Use simple Markdown tables; avoid deep nesting (Material will render with accessible styling).

Content notes:

- Prefer admonitions for warnings, tips, and conceptual disclaimers instead of inline bold paragraphs.
- Do not build custom HTML for features Material already provides (tabs, admonitions) unless custom styling is mandated.

# ==================================================================== 5. STANDARD PAGE SKELETONS

(UNCHANGED logic, adapted to Material admonitions)

Platform Documentation (Menus / Extensions):

```
# <Menu or Extension Name>
Short purpose sentence.
## Key Capabilities
- …
## When to Use
## Access Path
## How It Works
## Common Tasks
- Task (link to How TO / Quick Start)
## Related
```

Feature Guide:

```
# <Feature Name> Guide
Intro (what + why).
## Concepts
## Setup / Prerequisites
## Usage Patterns
## Examples
## Best Practices
## Limitations
## Related
```

Quick Start:

```
# <Task Name> Quick Start
## Overview
## Prerequisites
## Steps
1. …
2. …
## Result
## Next Steps
```

How TO:

```
# <Action-Oriented Title>
## Goal
## Prerequisites
## Steps
## Verification
## Troubleshooting
```

Release Notes:

```
# Release <Version> (YYYY-MM-DD)
## Added
## Changed
## Fixed
## Deprecated
## Security
## Known Issues
```

Glossary (single page):
Bold term + single-sentence definition; optional brief extension.

# ==================================================================== 6. FRONT MATTER & METADATA

MkDocs + Material does NOT require front matter by default; avoid injecting YAML unless the site build process uses page-level meta. If front matter is used (user indicates), keep keys minimal (title, description) and do not fabricate version numbers. When uncertain: ask.

# ==================================================================== 7. LINKING PRACTICES

- Use relative paths; eliminate accidental double slashes (../how-tos/foo.md not ..//how-tos/foo.md).
- Link first glossary term occurrence per page (if anchors exist).
- Avoid absolute site URLs unless linking cross-locale or external domain.

# ==================================================================== 8. SCREENSHOTS & MEDIA

No entrenched convention detected; recommended:
docs/assets/images/<group>/<topic>-<state>-step<n>.png
Alt text = purpose (“Agents list displaying status badges”), not decorative description.
Material supports light/dark theme switching—prefer neutral images (cropped UI) that remain legible in both themes. If dark-specific, suffix -dark.

Embed:
![Agents list showing active agents](../../assets/images/platform/agents-list-step1.png)

Optional caption (Material):
![Alt text](path){ width="800" }

# ==================================================================== 9. ACCESSIBILITY & I18N

- Write neutral source English ready for localization (Greek config suggests per-locale expansion).
- Avoid idioms, humor requiring cultural context.
- Provide descriptive link text (“See Pipelines Menu”) not “click here”.

# ==================================================================== 10. AI FEATURE DISCLOSURE

If a page explains AI-generated outputs:
!!! note "AI Output Variability"
AI-generated responses may vary. Review outputs before acting on them.

Avoid deterministic claims (“always returns” → “can return”).

# ==================================================================== 11. RELEASE NOTES WORKFLOW

When new version is published:

1. Copy rn_current.md → archived/rn{nextNumber}.md (increment highest).
2. Insert archived file into nav under Archive with proper “RN X.Y.Z” label.
3. Replace rn_current.md contents with new version section template.
4. Update nav label of rn_current.md to new version (RN X.Y.Z).
   Copilot must provide instructions; not perform renames autonomously unless user explicitly requests.

# ==================================================================== 12. QUALITY CHECKLIST (COPILOT INTERNAL)

[ ] Category skeleton adhered to  
[ ] Navigation group suggested (with nav snippet)  
[ ] File naming consistent (kebab-case for new)  
[ ] Admonitions use Material syntax (no legacy blockquotes)  
[ ] Links sanitized (no double slashes)  
[ ] Glossary linkage (first occurrence only)  
[ ] No fabricated features/versions/CVEs  
[ ] Steps ≤7 in Quick Start unless justified  
[ ] Release note sections properly categorized  
[ ] Screenshots (if proposed) have semantic filenames + alt placeholders

# ==================================================================== 13. WHEN INFORMATION IS MISSING

Ask clarifying questions if:

- Target nav group unclear
- Version not specified for release notes
- Whether to archive previous release
- Need for screenshots / number of steps ambiguous
- Requirement for front matter unknown

# ==================================================================== 14. EXAMPLES

Admonition conversion:
Legacy:

> **Note:** Pipelines require a project.

Material:
!!! note
Pipelines require a project.

Tabs example for UI vs CLI (if CLI support documented):
=== "UI" 1. Open **Pipelines**.
=== "API"
`bash
    curl -X POST /pipelines
    `

# ==================================================================== 15. PROHIBITED

- Creating new top-level nav groups without user instruction
- Mixing Quick Start + deep Concept sections in one file
- Adding raw HTML replicating Material features
- Inventing version histories or security notices

End of Global Instructions.
