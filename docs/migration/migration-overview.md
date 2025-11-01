# Migration & Upgrade Guides

This section contains version-specific guides to help you upgrade ELITEA to newer versions and migrate your resources between environments.

## Current Upgrade Paths

### Upgrading to 2.0.0 Beta (from 1.6.0/1.7.x)

The following guides will help you transition to ELITEA 2.0.0 Beta in the Next environment:

- **[Quick Start for Next Environment](v2.0/next-quick-start.md)** - Get started quickly in the Next environment with key workflow changes
- **[Configure AI Dial Keys](v2.0/configure-epam-ai-dial-key.md)** - Set up your own EPAM AI DIAL keys for production workloads
- **[Migrate Datasources to Indexing](v2.0/migrate-datasources-to-indexing.md)** - Convert legacy Datasources to the new Indexing system
- **[Configure and Use MCP Servers](v2.0/configure-and-use-mcp.md)** - Set up Model Context Protocol servers in ELITEA
- **[Update LLM Nodes in Pipelines](v2.0/update-llm-nodes.md)** - Upgrade your pipeline LLM nodes to the new enhanced format

## General Upgrade Process

When upgrading to a new version of ELITEA:

1. **Review Release Notes**: Read the [Release Notes](../release-notes/rn_current.md) for your target version to understand new features, changes, and known issues
2. **Check Breaking Changes**: Pay special attention to deprecated features and required migrations in the "Important" section
3. **Follow Migration Guides**: Use the version-specific guides above to complete required migrations
4. **Test Your Resources**: Verify that your agents, pipelines, toolkits, and conversations work correctly in the new environment

!!! warning "Environment-Specific Migrations"
    Version 2.0.0 Beta requires moving to a different environment (Next). Your resources are automatically migrated, but you need to reconfigure some elements like Credentials and Indexes. Review the migration guides carefully.

!!! info "Getting Help"
    If you encounter issues during migration, consult the [FAQs](../support/faqs.md) or [Contact Support](../support/contact-support.md).

## Archive

When migration guides become outdated (typically after 2-3 major releases), they will be moved to the [Archive](../archive/) section for historical reference.
