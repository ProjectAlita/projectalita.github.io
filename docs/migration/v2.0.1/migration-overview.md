# Migration Guide: Upgrading to v2.0.1

## Overview

Version 2.0.1 introduces significant improvements to pipeline nodes, deprecating several legacy node types and replacing them with more specialized, easier-to-use alternatives. This guide provides an overview of the changes and links to detailed migration instructions for each deprecated node type.

## What's Changing

The following pipeline nodes have been deprecated and will be removed in a future release (planned for 2026):

* **Condition Node** → Replaced by **Router Node** or **Decision Node**
* **Function Node** → Replaced by **Toolkit Node** and **MCP Node**
* **Tool Node** → Replaced by **Toolkit Node** and **MCP Node**
* **Loop Node** and **Loop for Tool Node** → Use alternative pipeline design patterns
* **Pipeline Node** → Replaced by enhanced **Agent Node**

!!! warning "Deprecation Timeline"
    Existing pipelines using deprecated nodes will continue to function, but you cannot add new instances of these nodes. Deprecated nodes are marked with a warning icon and "Deprecated!" text in the node header. Plan your migration before the 2026 removal date.

## Migration Priority

We recommend migrating in the following order:

1. **Condition Nodes** → Router/Decision Nodes (straightforward replacement)
2. **Function/Tool Nodes** → Toolkit/MCP Nodes (clear path with feature parity)
3. **Pipeline Nodes** → Agent Nodes (enhanced node now supports pipeline execution)
4. **Loop Nodes** → Alternative patterns (requires design rethinking)

## Detailed Migration Guides

Select the migration guide for the node type you need to update:

* [Condition Node Migration](condition-node-migration.md) - Migrate to Router or Decision nodes
* [Function Node Migration](function-node-migration.md) - Migrate to Toolkit or MCP nodes
* [Tool Node Migration](tool-node-migration.md) - Migrate to Toolkit or MCP nodes
* [Pipeline Node Migration](pipeline-node-migration.md) - Migrate to enhanced Agent node
* [Loop Node Migration](loop-node-migration.md) - Use alternative design patterns

## Migration Support

Each migration guide includes:

* **Visual Comparisons**: Side-by-side screenshots showing old vs. new node configurations
* **Step-by-Step Instructions**: Detailed procedures for replacing each deprecated node
* **Configuration Mapping**: How to transfer settings from old nodes to new ones
* **Example Conversions**: Real-world pipeline examples demonstrating the migration

## New Features in Replacement Nodes

The replacement nodes offer several improvements:

* **Clearer Responsibilities**: Specialized nodes (Toolkit Node, MCP Node) reduce configuration confusion
* **Better Input/Output State Management**: All new nodes support explicit state mappings
* **Improved Interrupt Handling**: Enhanced interrupt configuration options
* **Unified Interface**: Agent Node now handles both agent and pipeline execution
* **Enhanced Validation**: Better error messages and validation during pipeline design

## Need Help?

If you encounter issues during migration or have questions about which replacement node to use, please refer to the individual migration guides or contact support.

## No Automatic Migration

!!! info "Manual Migration Required"
    There is no automatic migration tool for deprecated nodes. You must manually replace deprecated nodes in your existing pipelines following the steps in the relevant migration guide. This ensures you maintain full control over your pipeline logic and can validate behavior after migration.
