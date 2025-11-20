#!/bin/bash
# Build both Next.js landing page and MkDocs documentation

set -e

echo "🏗️  Building all applications..."
echo ""

# Build Next.js landing page
echo "📦 Building Next.js landing page..."
cd web
npm ci
npm run build
cd ..
echo "✅ Next.js build complete (output: web/out/)"
echo ""

# Build MkDocs documentation
echo "📦 Building MkDocs documentation..."
if ! command -v mkdocs &> /dev/null; then
    echo "⚠️  MkDocs not found. Installing dependencies..."
    if [ -f "requirements.txt" ]; then
        pip install -r requirements.txt
    else
        pip install mkdocs mkdocs-material mkdocs-glightbox
    fi
fi
mkdocs build --clean --config-file mkdocs.yml
echo "✅ MkDocs build complete (output: site/)"
echo ""

echo "🎉 All builds complete!"
echo ""
echo "Build outputs:"
echo "  - Landing page: web/out/"
echo "  - Documentation: site/"
