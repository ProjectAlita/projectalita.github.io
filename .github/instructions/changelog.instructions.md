# Specialized Instructions – Release Notes

Pattern:

- Current: docs/release-notes/rn_current.md (nav label = latest version)
- Archive: docs/release-notes/archived/rn{n}.md mapping to older versions

Steps for new release (when user confirms):

1. Copy current file to next archive name (increment highest n).
2. Update nav: move archived file under Archive with label “RN X.Y.Z”.
3. Replace rn_current.md content with new version template and update nav label.

Template:

```
# Release X.Y.Z (YYYY-MM-DD)

## Added
## Changed
## Fixed
## Deprecated
## Security
## Known Issues
```

Rules:

- No fabricated versions/CVEs.
- Categorize user-supplied bullets; ask if ambiguous.
- Use concise bullet phrasing: “Added support for …”, “Fixed issue where …”.
- Suggest “Migration” sub-section (under Deprecated) if actionable changes.

If user only supplies raw list, output categorized draft + nav snippet instructions.
