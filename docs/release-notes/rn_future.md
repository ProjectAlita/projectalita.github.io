# ELITEA Release Notes
 
## Introduction
 
Discover **ELITEA** — your all-in-one platform for working with Generative AI and managing data-driven projects. ELITEA goes far beyond a simple repository: it’s a flexible workspace where you can create, organize, and collaborate on prompts, datasources, agents, pipelines, and collections with ease. From building complex workflows to managing AI assistants or connecting external tools, ELITEA gives you everything you need to bring your ideas to life.
 
## Information
 
* **Release Version**: 1.7.2
* **Released on**: 10-Oct-2025
* **Preview Access for 1.7.2**: [Next environment](https://next.elitea.ai)

 
## Important

- **Availability**: Version 1.7.2 is available in the [Next environment](https://next.elitea.ai) only. Nexus will remain on its current version (1.6.0) for now. The **Next** environment contains a full copy of your projects, agents, pipelines, toolkits, and chats migrated from Nexus, plus all 1.7.2 features and updates. Use this safe transition window to review changes, configure new Indexes, set up Credentials, and verify your workflows before Nexus is upgraded.
- **Prompts deprecated**: The **Prompts** entity is deprecated. All existing prompts were converted to Agents. You can create Agents without attaching a Toolkit (a lightweight replacement for Prompts) and use variables with these agents.
- **Datasources deprecated**: The **Datasources** entity is deprecated. Your existing datasources remain available in this release so you can re-index and reconfigure them using the new **Index data** tool available in most Toolkits (e.g., GitHub, Confluence, Bitbucket, ADO Repos, Jira, etc.),  as even though they remain connected to agents, they cannot be used (as the datasets themselves are not migrated). **Note**: Creating new datasources or datasets is no longer supported.
- **Integrations replaced by Credentials**: Integrations are deprecated and replaced by Credentials as a standalone entity. Existing Integrations are not auto-migrated; recreate them as **Credentials** manually. See: [How to Use Credentials](../how-tos/how-to-use-credentials.md).
- **Toolkits separated**: Toolkits are now a standalone entity under the Toolkits menu. Agents and Pipelines that previously had connected toolkits still keep those links; you can also reuse Toolkits across multiple entities. See: [How to create a toolkit](../getting-started/create-toolkit.md).
- **Temporary limitations (Next environment)**: Exporting agents/pipelines from Nexus and importing them into Next is not supported due to compatibility differences. **Forking** functionality may not work fully in **Next**. Both will be redesigned and enhanced in the upcoming release.
- **Shared LLM models (Next environment)**: The LLM models provided in **Next** are shared and intended for evaluation only and have daily limits. For any production workload, request your own EPAM AI DIAL keys and configure them in Settings → [AI Configuration](../menus/settings/ai-configuration.md). For a quick walkthrough, see the: [How to configure and use Epam AI Dial keys](../getting-started/create-credential.md).

!!! Reference
    For a short walkthrough of working in the **Next** environment, see the [Next - Quick Start Guide](../getting-started/next-quick-start.md).

## New Features
 
### Chat: Support Images as attachments

You can now add images to a conversation and have agents or pipelines analyze them, plus receive AI‑generated images directly inline in the chat thread.

**What you can do now:**
* **Upload images** via drag & drop or file picker.
* **Supported formats**: JPEG, PNG, WebP, and non‑animated GIF.
* **Inline AI outputs**: Agents can return generated images as part of their response; they display inline just like user uploads.
* **Persistent storage**: All uploaded and generated images are stored durably with stable IDs/URLs and can be revisited from chat history and the Artifacts menu.
* **Reuse across sessions**: Reopen a conversation later and re-reference prior images without re-uploading.

This feature unlocks visual analysis use cases (UI reviews, diagram interpretation, data screenshot extraction) and enables workflows combining text + vision + generated imagery in a single conversational flow.


### Indexing: Dedicated Toolkit Indexes Tab

A new Indexing tab is now available inside supported toolkits, giving you a consolidated workspace to manage and inspect all indexes created through that toolkit.

**What you can do now:**
* **View all indexes** associated with the toolkit in a single, paginated list (name, type/source, size, last updated, status).
* **Create new indexes** directly from the tab without leaving the toolkit configuration screen.
* **Reindex or refresh** an existing index to pull updated content (with clear in‑progress status feedback).
* **Delete obsolete indexes** to remove stale or unnecessary data and free resources.
* **Search & filter** indexes by name, status, or last updated time for faster navigation.
* **Inspect configuration**: Open an index detail panel to view configuration parameters (scope, filters, model/embedding settings, created by, timestamps).
* **History & activity**: See recent operations (created, reindexed, failed attempts) with timestamps and outcomes for auditability.

**Benefits:** Centralizes lifecycle management of indexed data, reduces duplication, and improves transparency into what content your agents and pipelines can search.

For usage examples of indexing tools, see [Index GitHub data](../how-tos/indexing/index-github-data.md).


### Canvas: Create Toolkit and MCP Server

* Create a new toolkit directly from a conversation using Canvas, without leaving Chat.
* Create a new MCP server from the same Canvas interface.
* Configure credentials, settings (e.g., namespace or connection details), and select tools during creation.
* Automatically attach the newly created toolkit or MCP server to the active conversation so it can be used immediately.
* Reuse created toolkits or MCP servers across other agents, pipelines, and conversations.

  
## Changed Features
 
### Pipeline Enhancements and Node Model Changes

We redesigned the pipeline node model to make building, reading, and maintaining pipelines faster and more intuitive. The updated node set focuses each node on a single clear responsibility, adds visual color-coding for instant recognition, and removes legacy, overlapping nodes that previously caused confusion. These changes reduce setup friction, clarify configuration options, and improve troubleshooting.

**What’s new (current node palette):**
* **Agent**: Runs an Agent directly. Replaces generic function usage for agent execution and enforces an Agent-only selection for clarity.
* **Toolkits** (replaces generic Function): Executes tools from one or more selected Toolkits. Purpose-built for integration/tool operations without needing to pick an Agent.
* **MCP** (specialized): Dedicated node for MCP Servers. Mirrors previous Function behavior but scoped only to MCP endpoints, reducing irrelevant options.
* **Pipeline**: Embed or call another pipeline (unchanged in core behavior) for modular, reusable orchestration.
* **Router**: Rule-based branching (unchanged) with clearer labeling + color coding.
* **Decision** (split out): Former conditional logic extracted into its own distinct node (separate from Router) for binary / evaluative decisions without route tables.
* **State Modifier**: Enhanced with additional filter and transform options to edit, sanitize, derive, or reset parts of pipeline state more precisely.
* **LLM**: Core model invocation node (unchanged) now supports improved visual grouping when combined with Agent / Toolkit operations.

**Color coding:** Each node type now has a distinct color family (e.g., Execution, Data, Control, Integration) so you can scan complex graphs and immediately understand structure without opening each node.

**Removed legacy / redundant nodes:**

* Loop
* Loop from Tool
* Tool
* Condition (functionality covered by new Decision + Router patterns)
* Function (replaced by specialized Agent / Toolkits / MCP nodes)

**Why this is better:**

* Clearer mental model: Each node answers “What am I operating on?” (Agent, Toolkit, MCP, Pipeline, State, Logic, LLM).
* Faster configuration: Filtered selectors (e.g., MCP-only in MCP node) eliminate scrolling through irrelevant resources.
* Reduced duplication: Removes overlapping ways to do the same thing, simplifying documentation and onboarding.
* Easier debugging: Color-coded categories + explicit node intent speed root cause analysis.
* Future extensibility: New specialized nodes can be added without reintroducing generic complexity.

**Migration notes:** Existing pipelines using deprecated nodes continue to run, but editing them prompts a guided migration path to the new node types where possible.

These enhancements collectively make pipeline setup more user-friendly, reduce misconfiguration risk, and streamline advanced orchestration patterns.

 
## Fixed Issues
 
* **Pipelines with Anthropic Models**: Unable to execute pipelines when agents which are configured to use Anthropic models. **Workaround**: Use GPT models in the agents.
* **Message Regenerate with Anthropic**: Regenerate of the output fails if there are errors in conversation message history when using Anthropic models.
* **Toolkit/Credentials Table Sorting**: Toolkit and Credentials lists are not displayed properly when sorted in table view.
* **Thinking Steps in Canvas During Generation**: Thinking steps and output are not rendered correctly when opening Canvas for MCP, Toolkit, or Agent/Pipeline while output is being generated.
* **Selecting Tools in Newly Added Toolkit**: Unable to select/unselect tools of a newly added toolkit in an agent and save the changes.
* **Figma Toolkit Tools Not Working**: Figma toolkit operations (e.g., Get File, Get Team Projects, Index Data) may fail.
* **TestRail Indexing with Multiple Suites**: Indexing fails when a project has multiple suites; Suite ID is required.
* **Deleted LLM Model Still Used**: A deleted LLM model can continue to be used by agents instead of the new default in certain scenarios.
* **Gemini/Claude via Dial API**: “Invalid structure” error when integrating Gemini or Claude models using a Dial API key.
* **qTest Test Cases Default Folder**: Test cases default to the root folder in qTest when a parent folder ID is not specified.
 
 
## Known Issues
 
Will be added according to the release progress.
