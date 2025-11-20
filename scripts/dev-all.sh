#!/bin/bash
# Start both Next.js landing page and MkDocs documentation servers concurrently

set -e

echo "🚀 Starting both development servers..."
echo ""
echo "📍 Landing page: http://localhost:3000"
echo "📍 Documentation: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Function to cleanup background processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping all servers..."
    kill $LANDING_PID $DOCS_PID 2>/dev/null || true
    exit 0
}

trap cleanup SIGINT SIGTERM

# Check if mkdocs is installed
if ! command -v mkdocs &> /dev/null; then
    echo "⚠️  MkDocs not found. Installing dependencies..."
    if [ -f "requirements.txt" ]; then
        pip install -r requirements.txt
    else
        pip install mkdocs mkdocs-material mkdocs-glightbox
    fi
fi

# Start MkDocs server in background
echo "📚 Starting MkDocs server..."
mkdocs serve -f mkdocs.yml &
DOCS_PID=$!

# Give MkDocs a moment to start
sleep 2

# Start Next.js server in background
echo "🚀 Starting Next.js server..."
cd web
npm run dev &
LANDING_PID=$!
cd ..

# Wait for both processes
wait $LANDING_PID $DOCS_PID
