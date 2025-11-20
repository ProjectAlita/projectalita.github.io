# Migration Guide: Unified Deployment

This guide explains the changes made to unify the landing page and documentation deployment.

## What Changed

### Before
- **Two separate repositories**:
  - `projectalita.github.io` - MkDocs documentation
  - `projectalita/landing` - Next.js landing page (separate repo)
- Two separate deployments
- Two separate workflows

### After
- **Single repository**: `projectalita.github.io`
- Both apps in one repo:
  - `/web` - Next.js landing page
  - `/docs` - MkDocs documentation
- Single unified deployment workflow
- Deployed to same GitHub Pages with different paths:
  - `/` (root) → Landing page
  - `/docs/` → Documentation

## Repository Cleanup

### Steps to Complete Migration

1. **Update GitHub Pages Settings**
   - Go to **Settings** → **Pages**
   - Change **Source** from "Deploy from branch" to **GitHub Actions**
   - Keep custom domain: `elitea.ai`

2. **Disable Old Workflow**
   ```bash
   # Rename or delete the old deploy-docs.yml
   git mv .github/workflows/deploy-docs.yml .github/workflows/deploy-docs.yml.old
   ```

3. **Archive Old Landing Repository**
   - Archive `projectalita/landing` repository on GitHub
   - Settings → General → Archive this repository

4. **Verify DNS Settings**
   Ensure your DNS has:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153
          185.199.109.153
          185.199.110.153
          185.199.111.153

   Type: CNAME
   Host: www
   Value: projectalita.github.io
   ```

## New Workflow

### File Structure
```
projectalita.github.io/
├── web/                          # Landing page (Next.js)
├── docs/                         # Documentation (MkDocs)
├── scripts/                      # Development scripts
│   ├── install-deps.sh          # Install all dependencies
│   ├── dev-landing.sh           # Start landing dev server
│   ├── dev-docs.sh              # Start docs dev server
│   ├── dev-all.sh               # Start both servers
│   ├── build-all.sh             # Build both apps
│   └── serve-built.sh           # Preview unified build
├── .github/workflows/
│   ├── deploy-unified.yml       # ✅ New unified workflow
│   └── deploy-docs.yml.old      # ❌ Old workflow (disabled)
└── README.md                     # Updated documentation
```

### Deployment Workflow

The new workflow (`.github/workflows/deploy-unified.yml`):
1. Builds Next.js landing page → `web/out/`
2. Builds MkDocs documentation → `site/`
3. Combines both into `_deploy/`:
   - Root: Landing page files
   - `/docs`: Documentation files
4. Deploys unified site to GitHub Pages

### Triggers

Auto-deploys on push to `main` when these paths change:
- `docs/**` - Documentation content
- `web/**` - Landing page code
- `mkdocs.yml` - MkDocs config
- `.github/workflows/deploy-unified.yml` - Workflow itself

## Development Workflow

### Quick Start
```bash
# First time setup
./scripts/install-deps.sh

# Daily development
./scripts/dev-all.sh
```

### Testing Before Deploy
```bash
# Build everything
./scripts/build-all.sh

# Preview exactly as it will appear on GitHub Pages
./scripts/serve-built.sh
# Visit: http://localhost:8080 (landing) and http://localhost:8080/docs/ (docs)
```

## Benefits

✅ **Unified version control** - Both apps versioned together  
✅ **Single deployment** - One workflow, one deploy  
✅ **Easier maintenance** - All code in one place  
✅ **Consistent releases** - Landing and docs always in sync  
✅ **Simplified CI/CD** - One set of secrets, one config  
✅ **Cost savings** - No need for separate landing repo  

## Rollback Plan

If issues arise, you can temporarily revert:

1. Re-enable old workflow:
   ```bash
   git mv .github/workflows/deploy-docs.yml.old .github/workflows/deploy-docs.yml
   ```

2. Unarchive landing repository

3. Change GitHub Pages source back to branch-based

However, the unified approach is recommended for long-term maintainability.

## Testing Checklist

Before marking migration complete:

- [ ] Landing page loads at https://elitea.ai
- [ ] Documentation loads at https://elitea.ai/docs/
- [ ] All navigation links work in docs
- [ ] Images load correctly in both apps
- [ ] Search works in documentation
- [ ] Mobile responsive on both sites
- [ ] Custom domain works correctly
- [ ] HTTPS certificate valid
- [ ] Local development scripts work
- [ ] Build preview script works

## Support

If you encounter issues:
1. Check GitHub Actions logs
2. Test locally with `./scripts/build-all.sh`
3. Preview with `./scripts/serve-built.sh`
4. Verify paths in `deploy-unified.yml` match actual structure

## Next Steps

1. ✅ Complete this migration
2. Archive `projectalita/landing` repository
3. Update any external links pointing to old repo
4. Update documentation about deployment process
5. Celebrate unified deployment! 🎉
