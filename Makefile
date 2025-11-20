.PHONY: help install dev dev-landing dev-docs build serve clean validate

help: ## Show this help message
	@echo "ProjectAlita - Unified Landing & Documentation"
	@echo ""
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Install all dependencies (Next.js + MkDocs)
	@./scripts/install-deps.sh

validate: ## Validate the setup and check dependencies
	@./scripts/validate-setup.sh

dev: ## Start both landing page and docs dev servers
	@./scripts/dev-all.sh

dev-landing: ## Start only landing page dev server (port 3000)
	@./scripts/dev-landing.sh

dev-docs: ## Start only documentation dev server (port 8000)
	@./scripts/dev-docs.sh

build: ## Build both landing page and documentation
	@./scripts/build-all.sh

serve: ## Serve the built unified site locally (port 8080)
	@./scripts/serve-built.sh

clean: ## Clean build outputs and caches
	@echo "🧹 Cleaning build outputs..."
	@rm -rf web/out/
	@rm -rf web/.next/
	@rm -rf site/
	@rm -rf _local_preview/
	@echo "✅ Clean complete"

clean-all: clean ## Clean everything including dependencies
	@echo "🧹 Cleaning dependencies..."
	@rm -rf web/node_modules/
	@rm -rf venv/
	@echo "✅ Full clean complete"
