# Quick Start Guide - Developer Setup

Get up and running with the ProjectAlita unified landing page and documentation in 5 minutes.

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18+ installed
- ✅ Python 3.x installed
- ✅ Git installed

## 1️⃣ Clone & Setup (First Time Only)

```bash
# Clone the repository
git clone https://github.com/ProjectAlita/projectalita.github.io.git
cd projectalita.github.io

# Validate your environment
./scripts/validate-setup.sh

# Install all dependencies
./scripts/install-deps.sh
```

**Alternative using Make:**
```bash
make validate
make install
```

## 2️⃣ Start Development

### Option A: Run Everything Together (Recommended)

```bash
./scripts/dev-all.sh
```

This starts:
- 🚀 Landing page: http://localhost:3000
- 📚 Documentation: http://localhost:8000

Press `Ctrl+C` to stop all servers.

**Alternative:**
```bash
make dev
```

### Option B: Run Individually

**Landing Page Only:**
```bash
./scripts/dev-landing.sh
# or
make dev-landing
```

**Documentation Only:**
```bash
./scripts/dev-docs.sh
# or
make dev-docs
```

## 3️⃣ Make Your Changes

### Editing Landing Page
- Edit files in `web/` directory
- Changes auto-reload at http://localhost:3000

### Editing Documentation
- Edit Markdown files in `docs/` directory
- Changes auto-reload at http://localhost:8000

### Adding New Documentation Page
1. Create new `.md` file in appropriate `docs/` subdirectory
2. Add entry to `nav:` section in `mkdocs.yml`
3. Reload docs server to see changes

## 4️⃣ Build & Test

### Build Everything
```bash
./scripts/build-all.sh
# or
make build
```

### Preview Built Site (Exactly as on Production)
```bash
./scripts/serve-built.sh
# or
make serve
```

Visit:
- Landing: http://localhost:8080
- Docs: http://localhost:8080/docs/

This simulates the exact structure deployed to GitHub Pages!

## 5️⃣ Deploy

### Automatic Deployment
Simply push to `main` branch:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

GitHub Actions automatically:
1. Builds both apps
2. Combines them
3. Deploys to https://elitea.ai

### Manual Deployment
1. Go to GitHub **Actions** tab
2. Select **Deploy Landing + Docs to GitHub Pages**
3. Click **Run workflow**

## 📋 Common Commands Cheatsheet

| Task | Script | Make |
|------|--------|------|
| Validate setup | `./scripts/validate-setup.sh` | `make validate` |
| Install deps | `./scripts/install-deps.sh` | `make install` |
| Dev (both) | `./scripts/dev-all.sh` | `make dev` |
| Dev landing | `./scripts/dev-landing.sh` | `make dev-landing` |
| Dev docs | `./scripts/dev-docs.sh` | `make dev-docs` |
| Build all | `./scripts/build-all.sh` | `make build` |
| Preview built | `./scripts/serve-built.sh` | `make serve` |
| Clean builds | - | `make clean` |
| Show help | - | `make help` |

## 🐛 Troubleshooting

### "Command not found: mkdocs"
```bash
pip install mkdocs mkdocs-material mkdocs-glightbox
```

### "Port 3000 already in use"
Kill the existing process:
```bash
lsof -ti:3000 | xargs kill -9
```

### "Port 8000 already in use"
```bash
lsof -ti:8000 | xargs kill -9
```

### Node modules issues
```bash
cd web
rm -rf node_modules package-lock.json
npm install
```

### Python package issues
```bash
pip install --upgrade mkdocs mkdocs-material mkdocs-glightbox
```

## 🔗 Useful Links

- 📖 Full README: [README.md](README.md)
- 🔄 Migration Guide: [MIGRATION.md](MIGRATION.md)
- 🌐 Live Site: https://elitea.ai
- 📚 Live Docs: https://elitea.ai/docs/

## 💡 Tips

1. **Use `make help`** to see all available commands
2. **Run `./scripts/validate-setup.sh`** after pulling changes
3. **Test locally with `./scripts/serve-built.sh`** before pushing
4. **Both apps auto-reload** during development
5. **Check GitHub Actions** for deployment status

## Need Help?

1. Check the [troubleshooting section](#-troubleshooting)
2. Review the [full README](README.md)
3. Ask the team in your project chat

Happy coding! 🚀
