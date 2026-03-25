# Release Notes - 2.0.1
 
## Introduction
 
Welcome to **ELITEA** — your comprehensive platform for building, deploying, and managing AI-powered workflows and intelligent agents. This release introduces significant enhancements including new features for image handling, execution history tracking, pipeline node redesign, and expanded MCP capabilities. For a complete overview of ELITEA and its capabilities, see the [Introduction](../home/introduction.md).
 
## Information
 
* **Release Version**: 2.0.1
* **Released on**: 26-Mar-2026
* **Access for 2.0.1**: [Next environment](https://next.elitea.ai)


## New Features

### Chat & Agents: Image Generation (Text-to-Image)

You can now generate images directly from text prompts in Chat and agents using the **Image Generator** internal tool, as long as your selected model supports image generation.

**What you can do now:**

* **Generate images from chat prompts**: Create images by describing what you want to see in natural language.
* **Enable Image Generator when needed**: Turn on **Image creation** from the **Internal Tools** configuration in a conversation, or enable it in an agent configuration.
* **Review results inline**: Generated images appear as thumbnails in the conversation.
* **Open full-size previews**: Click a thumbnail to view the image in a larger size.
* **Download generated images**: Download images after generation for reuse outside ELITEA.
* **Keep generated images organized**: Generated images are saved to the `attachments` Artifacts bucket for easier management.

**Benefits:** Faster visual prototyping and content creation, consistent image handling across Chat and agents, and predictable storage of generated outputs.

For more information, see [Image Generation (Text-to-Image)](../how-tos/chat-conversations/image-generation.md).

### Chat, Agents, and Pipelines: Sensitive Action Authorization Guardrail

ELITEA can now pause sensitive tool actions and require explicit human approval before the tool runs. This adds a human-in-the-loop guardrail for high-impact operations across conversations, agents, and pipelines.

**What you can do now:**

* **Require approval before sensitive tools execute**: When an agent attempts to run a protected action, ELITEA shows an authorization dialog instead of executing the tool immediately.
* **Review the pending action and parameters**: The dialog shows the action name and the parameters the agent plans to send, so you can verify what is about to happen.
* **Protect secrets in the review step**: Sensitive parameter values such as tokens, passwords, and API keys are masked automatically.
* **Approve or block the action explicitly**: Choose **Authorize** to continue or **Block** to skip the tool call.
* **Use the same guardrail across runtime contexts**: The authorization flow applies when sensitive tools are triggered from Chat, Agents, or Pipelines.

**Benefits:** Better control over sensitive operations, clearer user oversight for high-impact tool calls, and stronger alignment with organization-level AI safety policies.

For more information, see [Sensitive Action Authorization Guardrail](../how-tos/chat-conversations/sensitive-action-authorization-guardrail.md).

### Pipelines: Human-in-the-Loop (HITL) Node

Pipelines now support a dedicated **Human-in-the-Loop (HITL) Node** that adds explicit human decision points directly to the pipeline flow. Instead of relying only on hidden interrupt toggles in node settings, you can design visible approval and review checkpoints as part of the canvas.

**What you can do now:**

* **Add explicit approval checkpoints to pipelines**: Insert a HITL node wherever a workflow should pause for human review.
* **Route execution based on the user decision**: Configure separate outcomes for **Approve**, **Edit**, and **Reject** actions.
* **Review and edit content before continuing**: In edit scenarios, users can modify the relevant content/state and then resume the pipeline.
* **Make human intervention visible in the flow**: HITL checkpoints appear as first-class pipeline nodes rather than being hidden in advanced settings.
* **Support durable review steps**: Pipeline execution can pause at the HITL node and resume after the user decision, preserving the workflow state.

**Benefits:** Clearer approval workflows, better visibility of human review steps in pipeline design, and more flexible control over sensitive or high-value processing stages.

For more information, see [Control Flow Nodes](../how-tos/pipelines/nodes/control-flow-nodes.md), [Nodes and Connectors](../how-tos/pipelines/nodes-connectors.md), and [Pipelines](../menus/pipelines.md).

### Chat & Artifacts: Simplified Attachments Storage

Attachments in chat have been redesigned to reduce configuration friction and make files easier to locate and read. Instead of relying on opaque attachment identifiers, the system uses predictable, conversation-based file paths for storing and retrieving attachments.

**What you can do now:**

* **Use path-based attachment storage**: Attachments are stored and referenced by file path (for example, `/attachment/{conversation_id}/{filename}`) instead of `artifact_id`.
* **Keep attachments organized per conversation**: Uploaded files and images are grouped under the conversation so they are easier to find and manage.
* **Unify file and image handling**: Files and images follow the same storage and retrieval pattern for more consistent behavior.
* **Read attachments directly (no indexing overhead)**: Attachment access is optimized around direct read operations, reducing delays and unnecessary processing.
* **Work with folders more reliably**: Listing and saving files supports folder structures more consistently.
* **Get clearer upload/limit feedback**: Improved messaging helps you understand and resolve attachment size/count limits.

**Benefits:** Faster attachment workflows, clearer file organization, fewer storage-related errors, and more reliable attachment access across chat and integrations.

For more information, see [Attachments in Conversations](../how-tos/chat-conversations/attach-files.md) and [Artifacts](../menus/artifacts.md).

### Toolkits: SharePoint Toolkit Redesign and Indexing Enhancements

The **SharePoint toolkit** has been enhanced to make SharePoint indexing and content access more flexible and reliable—especially when working with large document libraries, external SharePoint instances, and personal SharePoint URLs.

**What you can do now:**

* **Authenticate via browser-based OAuth (session-only tokens)**: Complete the authentication flow in the browser and keep tokens in the browser session only (instead of persisting them server-side).
* **Index by folder (folder-based collections)**: Target specific folders and organize indexed content into separate collections for clearer ownership and retrieval.
* **Use a path parameter for targeted indexing**: Provide a folder/library path to scope indexing runs to exactly the content you need.
* **Exclude irrelevant content with a blacklist**: Prevent indexing of unwanted files (for example, large binaries or specific extensions) to improve relevance and performance.
* **Connect and index external SharePoint sites more reliably**: Improved permission handling and Graph/REST behavior reduces “insufficient permissions” and indexing failures in external (non-default) SharePoint environments.
* **Read OneNote files stored in SharePoint**: Access OneNote content stored on SharePoint sites through toolkit operations (Graph API / REST API).
* **Retrieve files using personal SharePoint URLs**: Fetch file metadata and content using personal SharePoint links (for example, `...-my.sharepoint.com/...`), which helps when files are shared as ticket attachments.
* **Work with more SharePoint content types with fewer failures**: Multiple toolkit reliability fixes improve reading, listing, and indexing across common SharePoint library structures.

**Benefits:** More precise indexing scope, better control over what is indexed, improved relevance of search results, more dependable SharePoint connectivity, and broader support for real-world SharePoint sharing patterns.

For more information, see [SharePoint Integration Toolkit Guide](../integrations/toolkits/sharepoint_toolkit.md) and [How to Index SharePoint Data](../how-tos/indexing/index-sharepoint-data.md).

### Artifacts: DOCX File Support in Artifact Toolkit

DOCX support has been expanded across **Artifacts** and **Canvas**, making it easier to open, edit, save, and work with Microsoft Word documents directly inside ELITEA.

**What you can do now:**

* **Open `.docx` files directly in Canvas and Artifacts**: Word documents can be opened from chat-related Canvas flows and from the Artifacts menu without leaving ELITEA.
* **Edit DOCX files in a Canvas**: Work with rendered document content directly instead of editing raw file data.
* **Use standard document editing controls**: Apply formatting, lists, tables, alignment, and other common document changes using the editor toolbar, ruler, and zoom controls.
* **Save changes back to the same `.docx` file**: Updates are saved with the **Save** button and written back in DOCX format.
* **Generate valid `.docx` files**: Create DOCX artifacts that open correctly in Word-compatible editors.
* **Read and update DOCX content more reliably**: Improved handling reduces binary/encoding issues and makes DOCX operations more predictable.

**Benefits:** Less context switching to external word processors, more reliable Word-document workflows in ELITEA, and smoother document editing and automation across chat, Canvas, and Artifacts.

For more information, see [Artifacts Toolkit Guide](../integrations/toolkits/artifact_toolkit.md), [Artifacts](../menus/artifacts.md), and [The DOCX Editor](../how-tos/chat-conversations/how-to-canvas.md#the-docx-editor).

### MCPs: OAuth Authentication for Preconfigured Remote MCPs

Remote MCP servers that are preconfigured in the environment (instead of being created in the UI) can now require OAuth authentication. This makes it easier to connect ELITEA to enterprise MCP endpoints that must be accessed through an authorization flow.

**What you can do now:**

* **Configure OAuth for preconfigured Remote MCPs**: Provide OAuth parameters (such as **Client ID**, **Client Secret**, and **Scopes**) in the Remote MCP configuration.
* **Enforce authentication when required**: Mark a Remote MCP as OAuth-protected so users are prompted to authenticate when they first access or use it.
* **Use authenticated Remote MCP tools after sign-in**: After successful authorization, the Remote MCP becomes available with an authenticated session.

**Benefits:** Secure access to protected Remote MCP endpoints, fewer manual workarounds for enterprise authentication, and a more consistent Remote MCP experience across environments.

For more information, see [Remote MCP Server Integration Guide](../integrations/mcp/create-and-use-remote-mcp.md) and [MCPs](../menus/mcps.md).

### Chat: Configurable Step Limit in Conversation Model Settings

Conversation Chat now lets you configure the **Step Limit** directly from the **Model Settings** modal in a conversation. This gives you more control over how many tool-execution iterations a conversation can use before stopping.

**What you can do now:**

* **Adjust Step Limit inside Conversation Chat**: Open the **Model Settings** modal in a conversation and set the Step Limit without creating a separate agent or pipeline.
* **Support longer multi-step tasks when needed**: Increase the limit for conversations that require more tool calls, such as deeper research, multi-file analysis, or longer automation flows.
* **Keep lightweight conversations constrained**: Leave the default behavior in place for simpler conversations where a lower limit is sufficient.
* **Configure the limit per conversation**: Tune the setting based on the needs of the current conversation instead of relying only on fixed defaults.

**Benefits:** More flexibility for ad-hoc conversation workflows, fewer interruptions from reaching the default step cap, and easier control of tool-execution depth directly in Chat.

For more information, see [How to Use Chat Functionality](../how-tos/chat-conversations/how-to-use-chat-functionality.md).

### Settings: Environment Settings for Environment Configuration

Admins can now manage environment-wide configuration from a dedicated **Environment Settings** area in the Public project. This provides a centralized place to adjust system behavior and restore defaults when needed.

**What you can do now:**

* **Configure environment-wide settings in one place**: Access a new admin-only **Environment Settings** page under Public project **Settings**.
* **Save and restore defaults**: Apply changes with **Save**, or use **Restore to Default** (with confirmation) to reset settings back to system defaults.
* **Set a System Sender Name**: Configure the display name used for system-generated messages across Chat, Agents, and Pipelines (default: **Elitea**).
* **Control error message duration**: Set how long error toasts remain visible across the application (default: **20 seconds**, configurable range: **5–60 seconds**).

**Benefits:** Easier environment customization and branding, more time to read and act on error messages, and a consistent admin experience for system-level settings.


## Changed Features

### Settings: Analytics Replaces Monitoring

Project-level usage visibility has been redesigned around a new **Analytics** dashboard in **Project Settings**, replacing the earlier Monitoring-based experience with a broader view of AI adoption and activity.

**What changed:**

* **Analytics replaces Monitoring for project-level usage insights**: The new Analytics experience is now the primary place to review adoption and activity trends instead of the previous Monitoring view.
* **Overview metrics added**: Project admins can review high-level KPIs such as AI-active users, LLM calls, tool runs, chat messages, and agent runs.
* **Drill-down views added for users, agents, and tools**: Analytics includes focused views to understand who is using AI capabilities most and which agents or tools are most active.
* **Health trends included**: Error-rate and activity trends are available in the same dashboard for faster usage and reliability review.
* **Admin-controlled availability**: The Analytics dashboard can be enabled or disabled through the Observability configuration.

**Benefits:** Clearer insight into AI adoption, easier analysis of project usage patterns, and a more actionable replacement for the previous Monitoring experience.

For more information, see [Analytics](../menus/settings/analytics.md).

### Agents and Pipelines: Improved Forking for Specific Versions

Forking agents and pipelines has been updated to make it easier to copy the configuration of a specific version into another project, with clearer project targeting and better handling when matching entities already exist.

**What changed:**

* **Fork a selected version more explicitly**: The workflow is focused on copying the configuration for the version you choose, instead of treating forking as a less controlled project-to-project copy.
* **Clearer target project selection**: The target project picker is easier to use and validates whether you have permission to fork into the selected project.
* **Conflict resolution options added**: When the target project already contains the same entity, ELITEA can guide you through actions such as rename, replace, or skip.
* **Safer handling of sensitive configuration**: Forked configurations continue to exclude sensitive values such as API keys, passwords, and similar secrets, with clearer warning behavior.

**Benefits:** More predictable cross-project reuse of agents and pipelines, fewer accidental conflicts during forking, and safer migration of versioned configurations between projects.

For more information, see [Forking](../how-tos/agents-pipelines/forking.md), [Agent and Pipeline Versioning](../how-tos/agents-pipelines/entity-versioning.md), and [Agents](../menus/agents.md).

### Import/Export: Simplified Import Wizard and Post-Import Credential Setup

Importing agents and pipelines has been streamlined to make it easier to review what you’re bringing in and to complete any required toolkit configuration after the import finishes.

**What changed:**

* **Simplified Import Wizard flow**: The wizard no longer includes an LLM model selection step, reducing the number of decisions you need to make during import.
* **Clear target project selection**: Import now emphasizes selecting the destination project up front.
* **Expandable import preview**: Imported agents and pipelines (including nested entities) show a compact summary by default, with **Show details / Hide details** to review descriptions, instructions, diagrams, toolkits, and other metadata.
* **Upfront configuration warning**: The import preview highlights that some toolkits may require manual configuration before they work (for example: credentials, embedding model settings, PgVector configuration, and similar requirements).
* **Post-import guidance for missing credentials**: After import, ELITEA can surface a summary of toolkits created with missing credentials and provide direct links to configure them, along with clear indicators in the Toolkits list.

**Benefits:** Faster imports with clearer previews, and less time spent hunting down toolkits that need credential setup before imported assets can run.

For more information, see [Import/Export Agents and Pipelines](../how-tos/agents-pipelines/import-export.md), [Toolkits](../menus/toolkits.md), and [Credentials](../menus/credentials.md).


### Administration: New Admin UI 

The platform administration interface has been redesigned as a standalone React single-page app served at `/admin/app`. This replaces the legacy Jinja2-based admin UI and simplifies the administration surface for platform admins.

**What changed:**

* **New admin interface location**: Administration is now provided via a dedicated Admin UI at `/admin/app` (platform admin access only).
* **Legacy admin UI replaced**: The previous theme/design-system/Jinja2-based admin experience is replaced in the admin context.
* **Admin scope simplified**: Several legacy sections are removed from the admin UI to reduce complexity and maintenance (for example, Monitoring/Monitoring Hub, External Providers, Deploy/Update buttons, Backup/Restore, Invites, DB migration UI, and other deprecated admin-only utilities).
* **Clearer core admin workflows**: Admin UI focuses on platform-level administration workflows such as user and role management, platform model configuration, and project management.

**Benefits:** Cleaner and more maintainable admin experience, reduced legacy surface area, and faster access to the most common platform administration tasks.

### Agents: Redesigned Internal Tools Section

The **Internal Tools** area in Agent detailed views has been reorganized to reduce clutter and make common actions easier to access. Pipelines no longer include an Internal Tools section, and pipeline attachments support has been removed.

**What changed:**

* **Action buttons moved to the top**: `+Toolkit`, `+MCP`, `+Agent`, and `+Pipeline` actions are now placed at the top of the Toolkits area for faster access.
* **Dedicated Internal Tools subsection for agents**: Internal Tools are now shown in a clearly separated subsection under Toolkits in Agent detailed views.
* **Two-column grid layout**: Agent Internal Tools are displayed in a compact, responsive two-column grid for quicker scanning.
* **Collapsed by default**: The view shows a small set of tools first (top 4), with **Show more / Show less** to expand and collapse the full list.
* **Pipeline attachments removed**: Pipelines no longer provide the previous attachments internal tool, and pipelines no longer include Internal Tools at all.

**Benefits:** Faster agent configuration, less visual noise in entity setup, clearer separation between internal tools and external toolkits or MCPs, and clearer expectations that pipelines no longer support attachments through Internal Tools.

For more information, see [Agents](../menus/agents.md), [Pipelines](../menus/pipelines.md), and [Toolkits](../menus/toolkits.md).

## Fixed Issues

* [#3839](https://github.com/ProjectAlita/projectalita.github.io/issues/3839) **Non-reasoning LLM models can receive an invalid `reasoning_effort` value**: Agent configurations using non-reasoning models can incorrectly store `reasoning_effort` as `medium` instead of `null`, which can cause failures when that unsupported parameter is sent to the model.
* [#3528](https://github.com/ProjectAlita/projectalita.github.io/issues/3528) **Update File Tool - Unable to Input Multi-line Format in Test Settings and Pipeline Node**: The `update_file` query field may not preserve required line breaks in Toolkit Test Settings or pipeline Toolkit nodes, causing OLD/NEW marker formatting errors.
* [#3513](https://github.com/ProjectAlita/projectalita.github.io/issues/3513) **Node renaming can fail without a clearly visible validation message**: When you try to rename a pipeline node to a name that already exists, the validation error can blink briefly instead of remaining visible long enough to explain the conflict.
* [#3516](https://github.com/ProjectAlita/projectalita.github.io/issues/3516) **State creation does not apply default values based on field type**: Newly created pipeline state fields can start as empty values instead of type-based defaults (for example, `0` for numbers or `[]` for arrays).
* [#3502](https://github.com/ProjectAlita/projectalita.github.io/issues/3502) **Default value changes for pipeline state not applied until page reload or chat clearing**: After updating a state’s default value, pipeline runs may continue using the previous value until you reload the page or start a new chat.
* [#3492](https://github.com/ProjectAlita/projectalita.github.io/issues/3492) **Missing Default PG Vector Configuration When Creating a Project**: After creating a new project, the default PgVector configuration may not be created immediately, which can block indexing prerequisites until the configuration is generated.
* [#3490](https://github.com/ProjectAlita/projectalita.github.io/issues/3490) **Chat Briefly Shows “New Conversation” View Instead of Loading Last Conversation**: When opening Chat, the UI can briefly display the New Conversation view while the last conversation is still loading, creating a misleading “no conversations” experience.
* [#3464](https://github.com/ProjectAlita/projectalita.github.io/issues/3464) **Import Attach Duplicate Nested Entities When Multiple Versions Exist in Pipeline Hierarchy**: Importing certain pipeline hierarchies with multiple nested versions can create duplicated nested attachments (relationships), even though versions are created correctly.
* [#3435](https://github.com/ProjectAlita/projectalita.github.io/issues/3435) **Tool Dropdown Lists Are Not Sorted Alphabetically in Nodes (Toolkit, LLM, MCP)**: Tool selection dropdowns in pipeline nodes can appear in an arbitrary order, making it harder to quickly find a specific tool.
* [#3382](https://github.com/ProjectAlita/projectalita.github.io/issues/3382) **Nested Agents/Pipelines Not Callable with Smart Tools Selection (Low Toolkit Count)**: Nested agents and pipelines may not be invoked when Smart Tools Selection is enabled and only a small number of tools are available.
* [#3389](https://github.com/ProjectAlita/projectalita.github.io/issues/3389) **Chat Thinking Steps Show Incorrect Agent/Pipeline Icons and Names**: When running an agent with a nested pipeline via chat commands, pipelines can be shown with the agent icon/name during and after execution.
* [#3388](https://github.com/ProjectAlita/projectalita.github.io/issues/3388) **SharePoint Indexing Displays Incorrect success message**: SharePoint indexing can show a “files indexed” success message even when the run is interrupted by repeated 429 errors, which can be misleading.
* [#3377](https://github.com/ProjectAlita/projectalita.github.io/issues/3377) **Jinja2 Template Generation Truncated with GPT Models**: When generating Jinja2 templates in pipeline nodes, some GPT models can omit `{% ... %}` blocks, resulting in invalid/incomplete templates.
* [#3371](https://github.com/ProjectAlita/projectalita.github.io/issues/3371) **Internal Planner Not Invoked in Conversation Chat**: The Internal Planner toolkit may not run in Conversation chat (even when it works in Agent chat).
* [#3367](https://github.com/ProjectAlita/projectalita.github.io/issues/3367) **SharePoint index_data Fails with IndexError for Some Folder Configurations**: SharePoint toolkit indexing can fail with `IndexError: list index out of range` for empty folder settings or specific folder-path inputs.
* [#3362](https://github.com/ProjectAlita/projectalita.github.io/issues/3362) **Chat Thought Duration Can Display Negative Values After Toolkit Exceptions**: When a pipeline stops due to certain toolkit-node exceptions, the Thought (thinking steps) duration can show negative time values.
* [#3359](https://github.com/ProjectAlita/projectalita.github.io/issues/3359) **Artifacts Toolkit create_file Fails When Optional Parameters Are Left Empty**: The `create_file` tool can fail if both `filedata` and `filepath` are omitted, even though the UI marks them as optional.
* [#3353](https://github.com/ProjectAlita/projectalita.github.io/issues/3353) **Serialization Failure When Calling get_wiki in Pipeline (WikiV2 Object)**: Pipelines using ADO Wiki tools like `get_wiki` may fail with serialization errors when raw `WikiV2` objects are persisted in state (for example, with `msgpack/jsonplus`), causing the run to error.
* [#3325](https://github.com/ProjectAlita/projectalita.github.io/issues/3325) **Child Pipeline Code Node Can’t Read Mapped State Variable**: Nested pipelines may fail in Code nodes when accessing mapped state, causing an AttributeError.
* [#3323](https://github.com/ProjectAlita/projectalita.github.io/issues/3323) **Validation Errors Not Shown for pydantic_core Exceptions**: Some validation failures were suppressed in the UI, making errors harder to diagnose.
* [#3322](https://github.com/ProjectAlita/projectalita.github.io/issues/3322) **Incorrect MCP settings and UI placement after Agent/Pipeline export/import**: After exporting/importing an agent with an attached Local MCP, the MCP can appear in the wrong UI location (Toolkits instead of MCPs) and/or lose settings.
* [#3321](https://github.com/ProjectAlita/projectalita.github.io/issues/3321) **Toolkit credentials show incorrect UI validation message after agent import despite functional credentials**: Imported toolkits can show incorrect credential-validation errors (and related UI inconsistencies) even though the toolkit works.
* [#3317](https://github.com/ProjectAlita/projectalita.github.io/issues/3317) **Code Node Fails with Pyodide Sandbox Read-Access Error**: Code node execution could fail due to sandbox read-access restrictions in the Pyodide environment.
* [#3315](https://github.com/ProjectAlita/projectalita.github.io/issues/3315) **Pipeline export shows nested agents/pipelines duplicated in both nested agents and toolkits sections during import UI**: Import can display duplicated nested agents/pipelines across sections in the import UI even when the final imported result has no actual duplication.
* [#3307](https://github.com/ProjectAlita/projectalita.github.io/issues/3307) **Conversation Chat Doesn’t Detect Pipeline-Configured Artifacts Toolkit for Attachments**: When a pipeline participant has attachments enabled, chat can still prompt for artifact-toolkit selection instead of using the configured toolkit automatically.
* [#3290](https://github.com/ProjectAlita/projectalita.github.io/issues/3290) **Internal Planner + Smart Tools Selection Fails with gpt-4.1 on First Message**: The first prompt could fail when using Internal Planner with Smart Tools Selection on the `gpt-4.1` model.
* [#3288](https://github.com/ProjectAlita/projectalita.github.io/issues/3288) **Python Sandbox Fails Due to Missing Dependency**: Python sandbox and pipeline Code nodes could fail if the `langchain-sandbox` dependency was missing.
* [#3287](https://github.com/ProjectAlita/projectalita.github.io/issues/3287) **Excel Indexing Misses Formula-Calculated Values**: When indexing Excel files that contain formulas, calculated values may not be indexed and can appear empty in the indexed content.
* [#3275](https://github.com/ProjectAlita/projectalita.github.io/issues/3275) **Parent Agent Cannot Execute Nested Agents or Pipelines**: Parent agents could fail to detect or resolve configured nested agents/pipelines, preventing delegation.
* [#3271](https://github.com/ProjectAlita/projectalita.github.io/issues/3271) **Code Node Newlines Double-Escaped Before Pyodide Execution**: Newline characters could be double-escaped, causing Python code to run as a single line unexpectedly.
* [#3261](https://github.com/ProjectAlita/projectalita.github.io/issues/3261) **Router/Decision Routes to Default Output Instead of END**: When routing to an END node, Router/Decision nodes could incorrectly follow the Default Output path.
* [#3220](https://github.com/ProjectAlita/projectalita.github.io/issues/3220) **ADO Test Plans: Custom Fields Fail to Populate on Test Case Creation**: Creating test cases with custom fields could fail with a ToolException-related error.
* [#3215](https://github.com/ProjectAlita/projectalita.github.io/issues/3215) **Nested/Child Agent Not Called When Parent Agent Is Used in Chat**: Child agents could be skipped in chat conversations when a parent agent was selected.
* [#3134](https://github.com/ProjectAlita/projectalita.github.io/issues/3134) **Incorrect Duration in Agents/Pipelines History After Error Runs**: Run durations could be calculated incorrectly when error runs occurred in the same conversation.
* [#3076](https://github.com/ProjectAlita/projectalita.github.io/issues/3076) **Non-Latest Agent/Pipeline Versions Don’t Save Name/Description Updates**: Editing the name/description in older versions can show a success message but not persist after reload.
* [#2961](https://github.com/ProjectAlita/projectalita.github.io/issues/2961) **Regenerate Uses Old LLM Model After Model Change**: Regenerate could continue using the previous model instead of the newly selected model.
* [#2204](https://github.com/ProjectAlita/projectalita.github.io/issues/2204) **Thinking Steps can show the technical model name instead of the Display Name**: In Thinking Steps, the UI can display the model’s technical identifier instead of the configured user-friendly Display Name.

 
## Known Issues

* [#3965](https://github.com/ProjectAlita/projectalita.github.io/issues/3965) **A sensitive tool in a later pipeline LLM node can skip authorization on its first invocation**: In pipelines that already received approval for a sensitive tool in an earlier node, the first sensitive tool call in a subsequent LLM node can execute without showing the authorization dialog.
* [#3963](https://github.com/ProjectAlita/projectalita.github.io/issues/3963) **Sensitive tools called through a nested agent can bypass the authorization dialog**: When a parent agent invokes a sub-agent that uses a sensitive tool, the Guardrails authorization dialog can be skipped entirely instead of requiring explicit approval.
* [#3957](https://github.com/ProjectAlita/projectalita.github.io/issues/3957) **Sensitive zero-parameter tools can execute without showing the approval dialog**: Tools marked as sensitive that require no input parameters can run immediately without triggering the Guardrails authorization dialog.
* [#3950](https://github.com/ProjectAlita/projectalita.github.io/issues/3950) **After approving a sensitive tool, the agent can restart earlier tool calls instead of resuming**: When you approve a sensitive tool action during a multi-step agent run, the agent can lose prior tool results and restart earlier steps, causing duplicate calls and repeated operations.
* [#3940](https://github.com/ProjectAlita/projectalita.github.io/issues/3940) **SharePoint `get_lists` returns folders instead of only lists**: The SharePoint `get_lists` tool can return folders that are not actual SharePoint lists, which makes the result set misleading.
* [#3886](https://github.com/ProjectAlita/projectalita.github.io/issues/3886) **Large SharePoint Excel indexing can fail with connection timeouts during embedding requests**: Indexing a large Excel file from SharePoint can fail due to repeated connection timeouts and API connection errors during embedding generation.
* [#3828](https://github.com/ProjectAlita/projectalita.github.io/issues/3828) **GitHub Toolkit `get_me` tool fails when retrieving the authenticated user**: The GitHub `get_me` tool can fail with an attribute error related to `twitter_username`, preventing the tool from returning authenticated user details.
* [#3791](https://github.com/ProjectAlita/projectalita.github.io/issues/3791) **Import can report 100% success while silently skipping Toolkits or MCPs on name conflict**: Importing an agent or pipeline can appear fully successful even when referenced Toolkits or MCPs are skipped because matching names already exist in the destination project.
* [#3741](https://github.com/ProjectAlita/projectalita.github.io/issues/3741) **ADO Repos `read_file` ignores `offset` and `limit` parameters**: The ADO Repos `read_file` tool can ignore requested line-range parameters and return the full file content instead of only the requested portion.
* [#3625](https://github.com/ProjectAlita/projectalita.github.io/issues/3625) **Pyodide sandbox can intermittently fail to load `certifi`, causing Code nodes to fail**: Code nodes that run in the Pyodide sandbox can intermittently fail with `ModuleNotFoundError: No module named 'certifi'`, which can break downstream nodes that depend on the Code node output.
* [#3468](https://github.com/ProjectAlita/projectalita.github.io/issues/3468) **Published agent with sub-agents fails at runtime due to using latest versions instead of published versions**: Published agents with nested sub-agents can fail at runtime if sub-agents resolve to latest (draft) versions instead of the published versions.
* [#3400](https://github.com/ProjectAlita/projectalita.github.io/issues/3400) **Postman Toolkit: Folder Lookup Failure During Request Creation**: A folder created via the Postman toolkit may not be found in a subsequent step (for example, when creating a request by path), causing the run to fail.
* [#3341](https://github.com/ProjectAlita/projectalita.github.io/issues/3341) **Index tool instances can remain stuck in `In progress` after stopping execution**: When an indexing run is stopped from chat, an agent, or a pipeline, the related Toolkit Index entry can remain stuck in `In progress` instead of moving to a final stopped state.
* [#3366](https://github.com/ProjectAlita/projectalita.github.io/issues/3366) **SharePoint index_data fails to retrieve data from document libraries with hyphens in folder names**: The SharePoint `index_data` tool can fail with an “incorrect folder path” error when the target document library or folder name includes hyphens.
* [#3347](https://github.com/ProjectAlita/projectalita.github.io/issues/3347) **Deprecated Pipeline Node Fails When Calling a Nested Pipeline**: Executions can error when using the deprecated **Pipeline** node to invoke a nested pipeline.
* [#3252](https://github.com/ProjectAlita/projectalita.github.io/issues/3252) **Input mapping fields persist when switching to tools without required/optional fields**: When switching tools in MCP/Toolkit nodes, input mapping fields from the previous tool can persist and be sent unexpectedly.
* [#3151](https://github.com/ProjectAlita/projectalita.github.io/issues/3151) **PPT Files Fail to Read or Index from Artifacts or SharePoint**: Reading or indexing PowerPoint files can raise errors instead of completing successfully or returning a clear “format not supported” message.
* [#2939](https://github.com/ProjectAlita/projectalita.github.io/issues/2939) **Users Can Select Pipeline Versions Containing Interruptions or Deprecated Pipeline Node When Adding to Parent Pipelines**: When nesting pipelines, the UI can allow selecting pipeline versions that contain interruptions (or deprecated nodes), bypassing expected validation.
* [#2922](https://github.com/ProjectAlita/projectalita.github.io/issues/2922) **GitLab org Toolkit does not restrict access to specified repositories when only one repository is added**: GitLab org toolkits may ignore a single-repository restriction and operate across all project repositories.
* [#2304](https://github.com/ProjectAlita/projectalita.github.io/issues/2304) **MCP Client Disconnects on macOS**: MCP client disconnects from platform despite tray showing "connected" on macOS; logs show "packet queue is empty" errors and repeated disconnect/reconnect cycles.
* [#1163](https://github.com/ProjectAlita/projectalita.github.io/issues/1163) **MCP Only Executes Latest Version**: MCP-tagged resources execute the latest version regardless of which version has the MCP tag; only the latest version is accessible via MCP.