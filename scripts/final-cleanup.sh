#!/bin/bash
# Final cleanup script - removes old git repository from web folder

set -e

echo "🧹 Final cleanup of old deployment configuration..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Safety check - make sure we're in the right directory
if [ ! -f "mkdocs.yml" ] || [ ! -d "web" ]; then
    echo -e "${RED}Error: Must be run from repository root${NC}"
    exit 1
fi

echo "This script will remove:"
echo "  - web/.git directory (old landing repo reference)"
echo ""

# Check if web/.git exists
if [ -d "web/.git" ]; then
    WEB_GIT_SIZE=$(du -sh web/.git 2>/dev/null | cut -f1)
    echo -e "${YELLOW}Found:${NC} web/.git directory (${WEB_GIT_SIZE})"
    
    # Show what repo it was pointing to
    if [ -f "web/.git/config" ]; then
        echo ""
        echo "Old git remote:"
        grep -A 2 '\[remote "origin"\]' web/.git/config 2>/dev/null || echo "  (no remote configured)"
    fi
    
    echo ""
    read -p "Remove web/.git directory? [y/N] " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf web/.git
        echo -e "${GREEN}✓${NC} Removed web/.git directory"
    else
        echo "Skipped removal of web/.git"
        exit 0
    fi
else
    echo -e "${GREEN}✓${NC} web/.git directory does not exist (already clean)"
fi

echo ""
echo "Running verification..."
./scripts/verify-cleanup.sh

echo ""
echo -e "${GREEN}✓ Cleanup complete!${NC}"
