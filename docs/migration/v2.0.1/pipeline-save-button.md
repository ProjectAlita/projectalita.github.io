# Pipeline Save Button State Change

## Overview

Starting from **version 2.0.1**, the **Save** button in pipeline configuration is now **active immediately** when you open an existing pipeline **for the first time**. This change enables users to review and update pipelines in response to recent platform updates and improvements.

!!! info "What Changed"
    **First-Time Opening**: When you open an existing pipeline for the first time, the Save button is active immediately, allowing you to review and save after investigating recent updates.
    After your first save, the Save button activates only when modifications are detected.

---

## Why This Change Was Made

Recent platform updates have introduced significant improvements and changes that may affect existing pipelines:

### 1. Node Updates

Recent updates have enhanced key node types:

**LLM Node**

The **LLM Node** has been enhanced with improved field structure and expanded toolkit capabilities:

* **Redesigned Field Structure**: The previous "Response key" field has been replaced with separate **System** and **Task** fields, providing clearer control over context and instructions
* **Multiple Toolkit Support**: You can now add multiple toolkits and MCPs directly to the LLM node, with granular control to enable or disable individual tools
* **Improved Tool Calling**: Better handling of multi-step tool execution with automatic retry logic
* **Structured Output Enhancements**: More reliable JSON parsing and fallback mechanisms
* **Enhanced Error Messages**: More detailed error reporting for tool calling failures

These improvements expand LLM node capabilities without requiring additional Function nodes and may require you to review your configurations.

**Decision Node**

The **Decision Node** has been redesigned as a fully independent, standalone node in the pipeline:

* **Independent Node**: Decision Nodes are no longer "semi-nodes" or part of another node—they exist independently on the pipeline canvas with their own visual representation, configuration panel, and connection points
* **Multiple Input Connections**: You can now connect multiple upstream nodes to a single Decision Node, allowing it to evaluate inputs from various sources
* **Autonomous Operation**: The Decision Node acts independently from any previous node, with its own input/output state management
* **Enhanced Configuration**: Configure decision logic including conditional expressions, input mapping from connected nodes, and output routing to multiple downstream nodes based on decision outcomes

These improvements may require you to review your node configurations to ensure they're optimized for the latest capabilities.

### 2. YAML Structure Changes

The pipeline YAML structure has been reorganized for better clarity and readability:

* **New Order**: States → Entry Point → Nodes (according to the flow)
* **Improved Organization**: The new structure follows the logical flow of pipeline execution, making YAML files easier to read and understand
* **Better Maintainability**: Sequential node ordering matches the visual flow, simplifying debugging and manual edits

This change improves the overall pipeline configuration experience and may cause the YAML to be reformatted when you save.

### 3. Deprecated Node Types

Several node types have been deprecated and display warning indicators:

* **[Loop Node](loop-node-migration.md)** - Deprecated in favor of Router-based loop patterns
* **[Loop for Tool Node](loop-node-migration.md)** - Deprecated in favor of Router-based loop patterns  
* **[Function Node](function-node-migration.md)** - Deprecated in favor of Code Node
* **[Condition Node](condition-node-migration.md)** - Deprecated in favor of Router Node
* **[Tool Node](tool-node-migration.md)** - Deprecated in favor of Toolkit Node
* **[Pipeline (Subgraph) Node](pipeline-node-migration.md)** - Deprecated in favor of direct agent/pipeline toolkit integration

If your pipeline contains any of these deprecated nodes, you'll see a **yellow warning icon** with "Deprecated!" text in the node header. The active Save button allows you to review these warnings and migrate to recommended alternatives.

??? info "Viewing Deprecated Nodes"
    When you open a pipeline with deprecated nodes:
    
    * Each deprecated node displays a **warning icon** (⚠️) in the header
    * Hover over the warning to see: *"This node is deprecated and will be removed in a future version. View Migration Guide"*
    * Click the link to access detailed migration instructions
    * The Save button is active, allowing you to save changes after migration

### 4. Interface Simplification

The **Run** tab has been removed from the pipeline interface to streamline the user experience:

**Removed Run Tab**

The dedicated **Run** tab has been removed from pipeline configuration. You can now test pipelines directly from the **Configuration** tab using the **Chat** interface for conversational interaction. This provides flexible testing options based on your workflow and consolidates pipeline functionality into unified locations.


---

## What You Should Do

### Review Existing Pipelines

When you first open an existing pipeline, the active Save button enables you to:

1. **Open the Pipeline**: Navigate to your pipeline in the Configuration tab
2. **Inspect for Deprecated Nodes**: Look for yellow warning icons (⚠️) on any nodes
3. **Review LLM Node Configurations**: Check if your LLM nodes can benefit from new features
4. **Test Execution**: Use the Chat interface to test pipeline behavior
5. **Save After Review**: Click **Save** to confirm the pipeline configuration after your review

After this first save, the Save button will only activate when you make actual configuration changes.

### Investigate Recent Changes

Even if you don't make configuration changes, reviewing your pipeline helps ensure:

* **Compatibility**: Your pipeline works correctly with updated node implementations
* **Optimization**: You're taking advantage of new LLM node capabilities
* **Migration Readiness**: You're aware of deprecated nodes that need future migration
* **Configuration Validity**: All settings are properly configured after interface updates

---

## Frequently Asked Questions
??? question "Why is the Save button active even though I didn't make changes?"

    When you **first open an existing pipeline**, the Save button is active by default to allow you to **review and investigate** your pipeline after recent platform updates. This ensures you can explicitly save after verifying that:
    
    * Deprecated nodes are identified and planned for migration
    * LLM nodes are configured to use new features
    * The pipeline works correctly with updated implementations
    
    **After your first save**, the Save button returns to normal behavior—it only activates when you actually modify the configuration.
    You're in control—save when you're ready, after reviewing updates.

??? question "Do I need to save every pipeline immediately?"

    No, you don't need to save immediately. When you first open a pipeline, the active Save button is for your convenience when you're ready to:
    
    * Confirm the pipeline configuration after reviewing
    * Migrate deprecated nodes to recommended alternatives
    * Update LLM node settings to use new capabilities
    * Make any other configuration changes
    
    Existing pipelines continue to function without saving. Once you do save after your first review, the Save button will only activate when you make actual changes.

??? question "What happens if I click Save without making changes?"

    When you first open a pipeline, clicking Save without making changes confirms the current configuration. This:
    
    * Acknowledges that you've reviewed the pipeline
    * Confirms compatibility with recent updates
    * Marks the pipeline as reviewed
    * Returns the Save button to normal behavior (only active when changes are made)
    
    After this first save, the Save button will only activate when you actually modify the configuration.
??? question "Will my pipeline break if I don't save?"

    No, existing pipelines continue to work without saving. However, reviewing and saving after inspection helps ensure:
    
    * You're aware of any deprecated nodes that need future migration
    * You understand which features have been updated
    * Your configuration is explicitly confirmed as compatible
    * The Save button returns to normal behavior for future edits
    
    The first-time active Save button is a prompt for review, not a requirement.
    The active Save button is a tool for maintaining pipeline health, not a requirement.

??? question "Where did the Run tab go?"

    The **Run** tab has been removed. Test your pipeline from the **Chat** interface instead:
    
    1. Navigate to **Chat** from the main menu
    2. Add your pipeline using `#PipelineName` or the assistant switcher
    3. Send messages to test execution
    4. Monitor results directly in the conversation
    
    This provides a more intuitive testing experience with full conversation context.

??? question "How do I know if my pipeline has deprecated nodes?"

    Deprecated nodes display a **yellow warning icon** (⚠️) with "Deprecated!" text in the node header. To check:
    
    1. Open your pipeline in the Configuration tab
    2. Switch to Flow Editor view
    3. Look for nodes with warning icons
    4. Hover over the icon to see the deprecation message
    5. Click "View Migration Guide" for detailed migration instructions
    
    The active Save button allows you to save after migrating these nodes.

---

!!! info "Additional Resources"
    * **[Pipeline Runs](../../how-tos/pipelines/pipeline-runs.md)** - Complete guide to monitoring pipeline execution
    * **[Flow Editor](../../how-tos/pipelines/flow-editor.md)** - Visual pipeline design interface
    * **[LLM Node](../../how-tos/pipelines/nodes/interaction-nodes.md#llm-node)** - Updated LLM node documentation
    * **[Chat Interface](../../how-tos/chat-conversations/how-to-create-and-edit-pipelines-from-canvas.md)** - Testing pipelines from Chat
    * **[Deprecated Nodes Overview](../../how-tos/pipelines/nodes/overview.md#deprecated-nodes)** - List of all deprecated node types
