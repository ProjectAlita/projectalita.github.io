# Migration Guide: Upgrading to v1.7.0

This guide helps you migrate from earlier versions to ELITEA v1.7.0, focusing on the transition to the **Next** environment and key system changes.

## Overview

Version 1.7.0 introduces significant improvements to ELITEA's data handling and workflow systems. The most notable change is the migration from Datasources to the new Indexing system, which provides better performance, flexibility, and standardized tools.

## What's New in v1.7.0

* **New Indexing System**: Replaces the legacy Datasources with integrated toolkit-based indexing
* **Next Environment**: A dedicated preview environment with a snapshot of your data for safe testing
* **Enhanced Credentials System**: Standalone credentials replace integrations
* **Improved Search Capabilities**: Advanced search tools including stepback search

## Migration Guides

### 1. Quick Start in Next Environment

Get up and running quickly in the Next environment with this comprehensive guide:

**[Quick Start for Next Environment](next-quick-start.md)**

This guide covers:

* What was migrated from Nexus (your main environment)
* What was converted (Prompts → Agents, Datasources → Temporary Toolkits)
* What needs to be recreated (Datasets, Integrations → Credentials)
* Step-by-step setup instructions
* How to configure EPAM AI DIAL keys for production use

### 2. Migrate Datasources to Indexing

Convert your legacy Datasources to the new Indexing system:

**[Migrate Datasources to Indexing](migrate-datasources-to-indexing.md)**

This comprehensive migration guide includes:

* Overview of changes from Datasources to Indexing
* Migration examples for each datasource type:
    * File/Table → Artifacts or SharePoint Indexing
    * Jira → Jira Indexing
    * Confluence → Confluence Indexing
    * Git → Repository Indexing
* Key improvements in the new indexing system
* Complete migration checklist

### 3. Configure AI DIAL Keys (Recommended)

Set up your own EPAM AI DIAL keys for production workloads:

**[Configure EPAM AI DIAL Keys](../../getting-started/configure-epam-ai-dial-key.md)**

The Next environment uses shared LLM models with daily limits. For sustained or production use, configure your own AI DIAL keys.

## Migration Process

Follow these steps for a smooth migration:

### Step 1: Review What Changed

Read the [Release Notes](../../release-notes/archived/rn11.md) to understand all changes in v1.7.0.

### Step 2: Access the Next Environment

1. Navigate to [https://next.elitea.ai](https://next.elitea.ai)
2. Sign in with your existing credentials
3. Review the migrated data snapshot (taken Aug-15-2025)

### Step 3: Recreate Credentials

Your old Integrations were not auto-migrated. Recreate them as Credentials:

1. Go to **Credentials** → **+ Create**
2. Select the credential type (GitHub, Jira, Confluence, etc.)
3. Fill in the required fields
4. Save and attach to your toolkits

See: [Create a Credential](../../getting-started/create-credential.md)

### Step 4: Configure Toolkits

Update your toolkits with the new credentials and indexing tools:

1. Open each toolkit that previously used a datasource
2. Attach the appropriate credential
3. Enable indexing tools (Index Data, Search Index, etc.)
4. Configure PgVector and Embedding settings
5. Save your changes

See: [Create a Toolkit](../../getting-started/create-toolkit.md)

### Step 5: Index Your Data

Use the new indexing system to recreate your datasets:

1. Open the toolkit with indexing tools enabled
2. Use **Test Settings** → select **Index Data** tool
3. Fill in the required parameters (collection suffix, scope, filters, etc.)
4. Run the indexing process
5. Verify the indexed data with search queries

See platform-specific guides in the [Migrate Datasources to Indexing](migrate-datasources-to-indexing.md) guide.

### Step 6: Test Your Agents and Pipelines

Verify that your AI workflows function correctly:

1. Open your agents and pipelines
2. Resolve any configuration notices
3. Execute test runs
4. Add agents/pipelines to conversations and test end-to-end

### Step 7: Configure AI DIAL Keys (Optional but Recommended)

For production use beyond evaluation limits:

1. Request an EPAM AI DIAL key
2. Go to **Settings** → **AI Configuration**
3. Create an AI DIAL credential
4. Create LLM models using your credential

See: [Configure EPAM AI DIAL Keys](../../getting-started/configure-epam-ai-dial-key.md)

## Key Differences from Previous Versions

### Datasources → Indexing

| **Before (Datasources)** | **Now (Indexing)** |
|--------------------------|---------------------|
| Standalone entities | Integrated into Toolkits |
| Limited data types | Standardized across all platforms |
| Fixed chunking options | Flexible chunking configurations |
| Basic search | Advanced search with stepback |
| Separate dataset management | Collection-based organization |

### Prompts → Agents

All prompts have been automatically converted to agents. Agents can now:

* Work without a toolkit (lightweight replacement for prompts)
* Use variables directly
* Be configured with more sophisticated behaviors

### Integrations → Credentials

Integrations are deprecated. Use the new Credentials system:

* Standalone entity for better management
* Attach to multiple toolkits
* Support for both project and private scopes
* More credential types available

## Troubleshooting

### Issue: Toolkit shows "Disconnected" or configuration errors

**Solution:**

1. Verify the credential is properly configured
2. Check that required tools are enabled
3. Ensure PgVector and Embedding model are selected
4. Save the toolkit and test from Tool Testing

### Issue: Search returns no results after indexing

**Solution:**

1. Verify the index was created successfully (check Tool Testing output)
2. Confirm the collection name/suffix matches your search
3. Check that the embedding model is the same used for indexing
4. Try using different search tools (Search Index vs Stepback Search Index)

### Issue: "Daily limit reached" for LLM models

**Solution:**

Configure your own EPAM AI DIAL keys following the [Configure EPAM AI DIAL Keys](../../getting-started/configure-epam-ai-dial-key.md) guide.

## Getting Help

If you encounter issues during migration:

* **FAQs**: Check [Frequently Asked Questions](../../support/faqs.md)
* **Contact Support**: Email [SupportAlita@epam.com](mailto:SupportAlita@epam.com)
* **Documentation**: Browse [How-To Guides](../../how-tos/indexing/indexing-overview.md)

When contacting support, include:

* Environment (Next or Nexus)
* Project name and workspace type (Private/Team)
* Clear description of the issue
* Screenshots or error messages
* Expected vs actual behavior

## Related Documentation

* [Release Notes - v1.7.0](../../release-notes/archived/rn11.md)
* [Indexing Overview](../../how-tos/indexing/indexing-overview.md)
* [Indexing Tools Reference](../../how-tos/indexing/indexing-tools.md)
* [How to Use Credentials](../../how-tos/credentials-toolkits/how-to-use-credentials.md)
* [Toolkits Menu Guide](../../menus/toolkits.md)

---

**Next Step:** Start with the [Quick Start for Next Environment](next-quick-start.md) guide to begin your migration.
