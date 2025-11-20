#!/bin/bash
# Start MkDocs documentation development server

set -e

echo "📚 Starting MkDocs documentation development server..."
echo "📍 URL: http://localhost:8000"
echo ""

# Check if mkdocs is installed
if ! command -v mkdocs &> /dev/null; then
    echo "⚠️  MkDocs not found. Installing dependencies..."
    if [ -f "requirements.txt" ]; then
        pip install -r requirements.txt
    else
        pip install mkdocs mkdocs-material mkdocs-glightbox
    fi
fi

mkdocs serve -f mkdocs.yml
