#!/bin/bash
# Serve the unified built site locally (simulates GitHub Pages structure)

set -e

echo "🌐 Setting up local preview of unified site..."
echo ""

# Create temporary deployment directory
DEPLOY_DIR="_local_preview"
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

# Check if builds exist
if [ ! -d "web/out" ]; then
    echo "❌ Next.js build not found. Run './scripts/build-all.sh' first."
    exit 1
fi

if [ ! -d "site" ]; then
    echo "❌ MkDocs build not found. Run './scripts/build-all.sh' first."
    exit 1
fi

# Copy Next.js build (landing page at root)
echo "📦 Copying landing page to root..."
cp -r web/out/* $DEPLOY_DIR/

# Copy MkDocs build (docs at /docs subdirectory)
echo "📦 Copying documentation to /docs..."
mkdir -p $DEPLOY_DIR/docs
cp -r site/* $DEPLOY_DIR/docs/

# Add .nojekyll
touch $DEPLOY_DIR/.nojekyll

echo ""
echo "✅ Unified site prepared in $DEPLOY_DIR/"
echo ""
echo "🚀 Starting local server..."
echo "📍 Landing page: http://localhost:8080"
echo "📍 Documentation: http://localhost:8080/docs/"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Serve with Python's built-in HTTP server
cd $DEPLOY_DIR
python3 -m http.server 8080
