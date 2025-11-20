# ProjectAlita - Unified Landing & Documentation Site

This repository contains both the landing page (Next.js) and documentation (MkDocs) for ProjectAlita, deployed together to GitHub Pages.

## 🌐 Live Sites

- **Landing Page**: https://elitea.ai
- **Documentation**: https://elitea.ai/docs/

## 📁 Repository Structure

```
projectalita.github.io/
├── web/                    # Next.js landing page
│   ├── pages/             # Next.js pages
│   ├── src/               # Source code
│   ├── public/            # Static assets
│   ├── out/               # Build output (generated)
│   └── package.json
│
├── docs/                  # MkDocs documentation source
│   ├── home/
│   ├── getting-started/
│   ├── how-tos/
│   └── ... (other docs)
│
├── site/                  # MkDocs build output (generated)
├── scripts/               # Development & build scripts
├── mkdocs.yml            # MkDocs configuration
└── .github/workflows/     # GitHub Actions workflows
    └── deploy-unified.yml # Unified deployment workflow
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (for Next.js landing page)
- **Python** 3.x (for MkDocs documentation)
- **pip** (Python package manager)

### Initial Setup

```bash
# Install all dependencies (Next.js + MkDocs)
./scripts/install-deps.sh
```

## 💻 Local Development

### Option 1: Run Both Servers Together (Recommended)

```bash
./scripts/dev-all.sh
```

This starts:
- Landing page at http://localhost:3000
- Documentation at http://localhost:8000

Press `Ctrl+C` to stop both servers.

### Option 2: Run Servers Individually

**Landing page only:**
```bash
./scripts/dev-landing.sh
```
Opens at http://localhost:3000

**Documentation only:**
```bash
./scripts/dev-docs.sh
```
Opens at http://localhost:8000

## 🏗️ Building & Testing

### Build Everything

```bash
./scripts/build-all.sh
```

This builds:
- Next.js → `web/out/`
- MkDocs → `site/`

### Preview Built Site Locally

```bash
./scripts/serve-built.sh
```

This creates a unified preview matching the production structure:
- Landing: http://localhost:8080
- Docs: http://localhost:8080/docs/

Perfect for testing before deployment! Press `Ctrl+C` to stop.

## 📦 Deployment

### Automatic Deployment

The site deploys automatically to GitHub Pages when you push to `main` branch:

```bash
git add .
git commit -m "Update content"
git push origin main
```

GitHub Actions will:
1. Build the Next.js landing page
2. Build the MkDocs documentation
3. Combine them into a unified deployment
4. Deploy to GitHub Pages

### Manual Deployment

Trigger deployment manually from GitHub:
1. Go to **Actions** tab
2. Select **Deploy Landing + Docs to GitHub Pages**
3. Click **Run workflow**

### Deployment Structure

```
GitHub Pages (elitea.ai)
├── / (root)              → Next.js landing page
└── /docs/                → MkDocs documentation
```

## 🔧 Configuration

### Landing Page (Next.js)

Configuration: `web/next.config.js`

```javascript
{
  output: 'export',           // Static export
  trailingSlash: true,        // Add trailing slashes
  images: { unoptimized: true } // No image optimization for static export
}
```

### Documentation (MkDocs)

Configuration: `mkdocs.yml`

Key settings:
- `site_url: https://elitea.ai/docs/` - Documentation base URL
- Theme: Material for MkDocs
- Plugins: search, glightbox (image lightbox)

## 📝 Making Changes

### Update Landing Page

1. Edit files in `web/` directory
2. Test locally: `./scripts/dev-landing.sh`
3. Commit and push (auto-deploys)

### Update Documentation

1. Edit Markdown files in `docs/` directory
2. Test locally: `./scripts/dev-docs.sh`
3. Commit and push (auto-deploys)

### Add New Documentation Page

1. Create new `.md` file in appropriate `docs/` subdirectory
2. Add entry to `nav:` section in `mkdocs.yml`
3. Test locally to verify navigation

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `./scripts/install-deps.sh` | Install all dependencies |
| `./scripts/dev-landing.sh` | Start landing page dev server |
| `./scripts/dev-docs.sh` | Start documentation dev server |
| `./scripts/dev-all.sh` | Start both servers concurrently |
| `./scripts/build-all.sh` | Build both applications |
| `./scripts/serve-built.sh` | Preview unified build locally |

## 🐛 Troubleshooting

### MkDocs not found

```bash
pip install mkdocs mkdocs-material mkdocs-glightbox
```

### Next.js dependencies issues

```bash
cd web
rm -rf node_modules package-lock.json
npm install
```

### Port already in use

- Landing (3000): Kill the process or use a different port
- Docs (8000): Kill the process or specify different port with `mkdocs serve -a localhost:8001`

### Build fails in GitHub Actions

1. Check Actions tab for error logs
2. Test build locally: `./scripts/build-all.sh`
3. Ensure all paths in workflow match new structure

## 📚 Documentation

- [MkDocs Documentation](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [Next.js Documentation](https://nextjs.org/docs)

## 🔒 GitHub Pages Settings

Ensure these settings in your repository:

1. **Settings** → **Pages**
2. **Source**: GitHub Actions (not branch-based)
3. **Custom domain**: elitea.ai
4. Ensure DNS A records point to GitHub Pages IPs

## 📄 License

See [LICENSE](LICENSE) file for details.
