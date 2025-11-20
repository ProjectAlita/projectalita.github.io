#!/bin/bash
# Quick validation script to test the complete setup

set -e

echo "🔍 Validating ProjectAlita unified deployment setup..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check function
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
    else
        echo -e "${RED}✗${NC} $1"
        exit 1
    fi
}

# 1. Check Node.js
echo "Checking prerequisites..."
command -v node > /dev/null 2>&1
check "Node.js installed ($(node --version))"

command -v npm > /dev/null 2>&1
check "npm installed ($(npm --version))"

command -v python3 > /dev/null 2>&1
check "Python 3 installed ($(python3 --version))"

command -v pip > /dev/null 2>&1 || command -v pip3 > /dev/null 2>&1
check "pip installed"

echo ""

# 2. Check directory structure
echo "Checking directory structure..."
[ -d "web" ]
check "web/ directory exists"

[ -f "web/package.json" ]
check "web/package.json exists"

[ -d "docs" ]
check "docs/ directory exists"

[ -f "mkdocs.yml" ]
check "mkdocs.yml exists"

[ -d "scripts" ]
check "scripts/ directory exists"

echo ""

# 3. Check scripts are executable
echo "Checking scripts..."
for script in scripts/*.sh; do
    [ -x "$script" ]
    check "$(basename $script) is executable"
done

echo ""

# 4. Check workflow files
echo "Checking GitHub Actions workflows..."
[ -f ".github/workflows/deploy-unified.yml" ]
check "deploy-unified.yml exists"

echo ""

# 5. Check if dependencies are installed
echo "Checking dependencies..."
if [ -d "web/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Next.js dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Next.js dependencies not installed (run: cd web && npm ci)"
fi

if command -v mkdocs > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} MkDocs installed ($(mkdocs --version))"
else
    echo -e "${YELLOW}⚠${NC} MkDocs not installed (run: pip install mkdocs mkdocs-material mkdocs-glightbox)"
fi

echo ""

# 6. Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✓ Validation complete!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "  1. Install dependencies:    ./scripts/install-deps.sh"
echo "  2. Start dev servers:       ./scripts/dev-all.sh"
echo "  3. Or start individually:"
echo "     - Landing:               ./scripts/dev-landing.sh"
echo "     - Docs:                  ./scripts/dev-docs.sh"
echo "  4. Build for production:    ./scripts/build-all.sh"
echo "  5. Preview built site:      ./scripts/serve-built.sh"
echo ""
echo "📚 Read README.md for more information"
