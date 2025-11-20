#!/bin/bash
# Install all dependencies for both landing page and documentation

set -e

echo "📦 Installing all project dependencies..."
echo ""

# Install Next.js dependencies
echo "📦 Installing Next.js dependencies..."
cd web
npm ci
cd ..
echo "✅ Next.js dependencies installed"
echo ""

# Install Python/MkDocs dependencies
echo "📦 Installing MkDocs dependencies..."
if ! command -v pip &> /dev/null; then
    echo "❌ pip not found. Please install Python 3 first."
    exit 1
fi

if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
else
    pip install mkdocs mkdocs-material mkdocs-glightbox
fi
echo "✅ MkDocs dependencies installed"
echo ""

echo "🎉 All dependencies installed successfully!"
echo ""
echo "Available commands:"
echo "  - ./scripts/dev-landing.sh    # Start landing page dev server"
echo "  - ./scripts/dev-docs.sh       # Start docs dev server"
echo "  - ./scripts/dev-all.sh        # Start both servers"
echo "  - ./scripts/build-all.sh      # Build both apps"
echo "  - ./scripts/serve-built.sh    # Preview unified build locally"
