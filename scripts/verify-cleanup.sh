#!/bin/bash
# Verify that old deployment configurations have been properly disabled

set -e

echo "🔍 Verifying old deployment cleanup..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check function
check_pass() {
    echo -e "${GREEN}✓${NC} $1"
}

check_fail() {
    echo -e "${RED}✗${NC} $1"
    HAS_ISSUES=true
}

check_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

HAS_ISSUES=false

echo "Checking for old deployment configurations..."
echo ""

# 1. Check old workflow is disabled
if [ -f ".github/workflows/deploy-docs.yml" ]; then
    check_fail "Old deploy-docs.yml is still active (should be renamed to .disabled)"
else
    check_pass "Old deploy-docs.yml workflow is disabled"
fi

# 2. Check web/.git doesn't exist
if [ -d "web/.git" ]; then
    check_fail "web/.git directory exists (old repo reference - should be removed)"
else
    check_pass "No separate git repo in web/ directory"
fi

# 3. Check for references to old landing repo
if grep -r "projectalita/landing" .github/workflows/*.yml 2>/dev/null | grep -v ".disabled" | grep -q .; then
    check_fail "Active workflow files still reference projectalita/landing repo"
else
    check_pass "No active workflows reference old landing repo"
fi

# 4. Check for DEPLOY_KEY usage in active workflows
if grep -r "DEPLOY_KEY" .github/workflows/*.yml 2>/dev/null | grep -v ".disabled" | grep -q .; then
    check_warn "DEPLOY_KEY found in active workflows (may be intentional)"
else
    check_pass "No DEPLOY_KEY references in active workflows"
fi

# 5. Check new unified workflow exists
if [ -f ".github/workflows/deploy-unified.yml" ]; then
    check_pass "New unified deployment workflow exists"
else
    check_fail "New deploy-unified.yml workflow is missing"
fi

# 6. Check unified workflow has correct paths
if grep -q "web/out/" .github/workflows/deploy-unified.yml 2>/dev/null; then
    check_pass "Unified workflow uses correct web/out/ path"
else
    check_warn "Unified workflow may have incorrect paths"
fi

# 7. Check for external_repository in active workflows
if grep -r "external_repository:" .github/workflows/*.yml 2>/dev/null | grep -v ".disabled" | grep -q .; then
    check_fail "Active workflows still deploy to external repository"
else
    check_pass "No active workflows deploy to external repositories"
fi

# 8. Check CNAME is correct
if [ -f "CNAME" ]; then
    CNAME_DOMAIN=$(cat CNAME | tr -d '\n\r')
    if [ "$CNAME_DOMAIN" = "elitea.ai" ]; then
        check_pass "CNAME points to elitea.ai"
    else
        check_warn "CNAME points to: $CNAME_DOMAIN (expected: elitea.ai)"
    fi
else
    check_warn "No CNAME file found"
fi

# 9. Check mkdocs site_url
if grep -q "site_url: https://elitea.ai/docs/" mkdocs.yml 2>/dev/null; then
    check_pass "MkDocs configured for unified deployment path (/docs/)"
else
    check_warn "MkDocs site_url may need adjustment"
fi

# 10. Check for old deployment docs
if [ -f "web/DEPLOYMENT.md" ] && grep -q "analysta-ai" web/DEPLOYMENT.md 2>/dev/null; then
    check_warn "web/DEPLOYMENT.md may contain outdated information"
else
    check_pass "No outdated deployment documentation in web/"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$HAS_ISSUES" = true ]; then
    echo -e "${RED}✗ Cleanup incomplete - issues found${NC}"
    echo ""
    echo "Recommended actions:"
    echo "  - Rename .github/workflows/deploy-docs.yml to .disabled"
    echo "  - Remove web/.git directory: rm -rf web/.git"
    echo "  - Review and update any workflow references"
    exit 1
else
    echo -e "${GREEN}✓ Cleanup verification passed!${NC}"
    echo ""
    echo "Old deployment configurations have been properly disabled."
    echo "The unified deployment is ready to use."
    exit 0
fi
