# Documentation Creation Guide

## Overview

This repository uses a dedicated `documentation` branch for all documentation-related changes. This ensures that the `main` branch remains stable and production-ready, while allowing the team to accumulate, review, and refine documentation updates before publishing.

## Workflow

```
feature branch → documentation → main (publish)
```

### Step 1: Create Your Feature Branch

Always create your feature branch from the `documentation` branch:

```bash
git checkout documentation
git pull origin documentation
git checkout -b <branch-name>
```

### Step 2: Make Your Changes

- Edit documentation files
- Test locally using MkDocs:
  ```bash
  mkdocs serve -f mkdocs_el.yml
  ```
- Verify navigation, links, and formatting

### Step 3: Create Pull Request

- Create PR targeting `documentation` branch (NOT `main`)
- Request team review
- Address feedback and merge when approved

### Step 4: Publishing (Maintainers Only)

When ready to publish accumulated documentation changes:
- Create PR: `documentation` → `main`
- Final review of all changes
- Merge triggers deployment

---

## Branch Naming Conventions

### Format
```
<type>/<short-description>
```

All branch names should:
- Use lowercase letters
- Use hyphens (`-`) to separate words
- Be descriptive but concise
- Start with the appropriate type prefix

### Types and Examples

#### 1. **Release Notes** (`rn/`)
For creating or updating release notes.

**Examples:**
```
rn/version-1-6-0
rn/version-1-5-3
rn/hotfix-1-6-1
rn/update-1-6-0-corrections
```

**Usage:**
```bash
git checkout -b rn/version-1-7-0
```

---

#### 2. **New Features** (`feature/`)
For documenting new features or creating new documentation pages.

**Examples:**
```
feature/add-mcp-integration-guide
feature/add-api-authentication-docs
feature/add-troubleshooting-section
feature/add-deployment-guide
```

**Usage:**
```bash
git checkout -b feature/add-mcp-integration-guide
```

---

#### 3. **Enhancements** (`enhance/`)
For improving existing documentation (adding details, examples, clarifications).

**Examples:**
```
enhance/improve-getting-started
enhance/add-examples-to-api-docs
enhance/expand-configuration-options
enhance/add-diagrams-to-architecture
```

**Usage:**
```bash
git checkout -b enhance/improve-getting-started
```

---

#### 4. **Updates** (`update/`)
For updating existing content due to changes (version updates, deprecated features, corrections).

**Examples:**
```
update/api-endpoints-v2
update/configuration-parameters
update/deprecated-features
update/broken-links-fix
```

**Usage:**
```bash
git checkout -b update/api-endpoints-v2
```

---

#### 5. **Fixes** (`fix/`)
For fixing errors, typos, broken links, or formatting issues.

**Examples:**
```
fix/typos-in-installation-guide
fix/broken-links-in-nav
fix/code-block-formatting
fix/incorrect-command-syntax
```

**Usage:**
```bash
git checkout -b fix/typos-in-installation-guide
```

---

#### 6. **Restructure** (`restructure/`)
For reorganizing documentation structure, navigation, or major refactoring.

**Examples:**
```
restructure/reorganize-user-guides
restructure/split-large-document
restructure/improve-navigation
restructure/consolidate-api-docs
```

**Usage:**
```bash
git checkout -b restructure/reorganize-user-guides
```

---

## Quick Reference Table

| Type | Prefix | Use Case | Example |
|------|--------|----------|---------|
| **Release Notes** | `rn/` | New or updated release notes | `rn/version-1-6-0` |
| **New Features** | `feature/` | New documentation pages/sections | `feature/add-mcp-guide` |
| **Enhancements** | `enhance/` | Improve existing docs | `enhance/add-examples-to-api` |
| **Updates** | `update/` | Update existing content | `update/configuration-parameters` |
| **Fixes** | `fix/` | Fix errors, typos, links | `fix/broken-links-in-nav` |
| **Restructure** | `restructure/` | Reorganize structure | `restructure/improve-navigation` |

---

## Best Practices

### DO ✅
- Always branch from `documentation`
- Test locally before creating PR
- Use descriptive branch names
- Target `documentation` branch in PRs
- Keep changes focused (one topic per branch)
- Update navigation in `mkdocs_el.yml` if needed

### DON'T ❌
- Don't create branches from `main`
- Don't create PRs directly to `main`
- Don't use spaces in branch names
- Don't mix multiple unrelated changes
- Don't forget to pull latest `documentation` before branching

---

## Example Workflow

**Scenario:** Adding documentation for MCP Integration feature

```bash
# 1. Switch to documentation branch
git checkout documentation

# 2. Get latest changes
git pull origin documentation

# 3. Create feature branch
git checkout -b feature/add-mcp-integration-guide

# 4. Make changes
# Edit docs/user-guide/mcp-integration.md
# Update mkdocs_el.yml navigation

# 5. Test locally
mkdocs serve -f mkdocs_el.yml

# 6. Commit changes
git add .
git commit -m "Add MCP Integration guide with examples and configuration"

# 7. Push branch
git push -u origin feature/add-mcp-integration-guide

# 8. Create PR on GitHub
# Target: documentation branch
# Request review from team
```

---

## MkDocs Specific Guidelines

Since this repository uses MkDocs with `mkdocs_el.yml`:

1. **Add new pages to navigation:**
   ```yaml
   nav:
     - Home: index.md
     - Your New Page: path/to/new-page.md
   ```

2. **Test before PR:**
   ```bash
   mkdocs serve -f mkdocs_el.yml
   # Visit http://127.0.0.1:8000
   ```

3. **Common file locations:**
   - Documentation: `docs/` directory
   - Configuration: `mkdocs_el.yml`
   - Release Notes: `docs/release-notes/`

---

## Questions?

If you have questions about:
- Branch naming: Check the examples above
- Workflow: Review the "Example Workflow" section
- MkDocs: Consult the [MkDocs documentation](https://www.mkdocs.org/)
- Issues: Contact the repository maintainers or open an issue

---

## Publishing Process (Maintainers)

When documentation is ready to be published:

1. **Review all pending changes:**
   ```bash
   git checkout documentation
   git log main..documentation
   ```

2. **Create PR to main:**
   - Go to GitHub
   - Create PR: `documentation` → `main`
   - Title: "Publish documentation updates - [date]"
   - Review all accumulated changes

3. **Merge to main:**
   - Final approval
   - Merge PR
   - Deployment triggers automatically

---

**Last Updated:** 2025-12-14
Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-12-14 12:57:56
Current User's Login: epamLDadayan
