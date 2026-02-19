# Release Notes - 2.0.0
 
## Introduction
 
Welcome to **ELITEA** — your comprehensive platform for building, deploying, and managing AI-powered workflows and intelligent agents. This release introduces significant enhancements including new features for image handling, execution history tracking, pipeline node redesign, and expanded MCP capabilities. For a complete overview of ELITEA and its capabilities, see the [Introduction](../home/introduction.md).
 
## Information
 
* **Release Version**: 2.0.0
* **Released on**: 19-Feb-2026
* **Access for 2.0.0**: [Next environment](https://next.elitea.ai)


## New Features

### Agents & Pipelines: Set a Default Version

Choose which version of an agent or pipeline should be used as the **default**. This helps you keep a stable “go-to” version for everyday use, while continuing to iterate and experiment in other versions.

In addition, the previously used **latest** version naming is now **base**. When you create a new agent or pipeline, ELITEA automatically creates an initial version named **base** and sets it as the default.

**What you can do now:**

* **Make any version the default**: Use the **Set as a default** action to mark the selected version as the one ELITEA uses by default.
* **Start from a default base version**: New agents and pipelines start with a **base** version that is set as the default automatically.
* **Clear UI indication**: The default version is visually marked in the versions dropdown so you can confirm at a glance which one is active.
* **One default at a time**: Only one version can be the default; selecting a new default automatically replaces the previous one.
* **Safe version management**: The **base** version cannot be deleted, and default versions are protected to prevent accidental removal until another default is selected.

**Benefits:** Reduces confusion about which version is “live”, makes it easier to roll out updates by switching the default, and supports safer experimentation without disrupting day-to-day work.

For more information, see [Agent and Pipeline Versioning](../how-tos/agents-pipelines/entity-versioning.md).

### Agents & Pipelines: Import and Export

Move agents and pipelines between projects or environments by exporting them as portable files and importing them through a guided wizard. This makes it easier to share reusable building blocks, create backups, and maintain agent/pipeline configurations in version control.

!!! warning "No backward compatibility with pre-2.0.0 import/export"
    Agent and pipeline import/export formats in **2.0.0** are not backward compatible with previous releases. Exports created in **2.0.0** may not import into earlier versions, and exports from earlier versions may not import into **2.0.0**.

**What you can do now:**

* **Export a single agent or pipeline as Markdown**: Export downloads the **`.md`** file that includes the entity configuration (YAML frontmatter) and the instructions/body content.
* **Export agents/pipelines with dependencies as ZIP**: If an agent or pipeline references nested agents or pipelines, export downloads the **`.zip`** archive that includes the main entity and all referenced entities as separate **`.md`** files.
* **Import `.md` and `.zip` files with a preview wizard**: Upload an exported file to open the import wizard, review what will be created, and import it into the target project.
* **Validate models during import**: If the exported model is not available in the target project, you see a clear warning and can select an alternative before importing.
* **Preserve toolkit tool selection**: When exporting, the selected tools inside toolkits are saved and restored on import, so imported agents keep the same enabled tools.
* **Resolve nested references by name**: Nested agents and pipelines are matched and linked by name during import, so relationships are recreated reliably.
* **Use MD/ZIP formats only**: Import/export is streamlined to Markdown (`.md`) and ZIP (`.zip`) files; JSON formats are not supported.

**Benefits:** Makes agent and pipeline sharing and migration predictable and repeatable, reduces manual reconfiguration, and helps teams collaborate by exchanging portable files.

For more information, see [Export and Import Guide](../how-tos/agents-pipelines/import-export.md).

### Chat & Artifacts: Edit Generated Files in Canvas

Edit supported files generated in conversations (via the Artifacts toolkit) directly in Canvas, then save changes back to the same artifact file. This helps you iterate on AI-generated outputs (code, configs, notes, and data files) without downloading, re-uploading, or switching tools.

**What you can do now:**

* **Open artifact files in Canvas from chat**: Click the pencil icon or the file link in the conversation to start editing in Canvas.
* **Save changes back to the same file**: Saving overwrites the existing file in the selected Artifacts bucket so the latest version stays in one place.
* **Download files from the conversation**: Download the generated or modified artifact directly from chat when you need a local copy.
* **Discard changes when needed**: Use **Discard** to drop edits and return to the original file content.
* **Avoid losing work with an unsaved-changes warning**: If you navigate away without saving, ELITEA shows a notification so you can decide whether to save or discard.
* **Edit common text and code formats**: Canvas supports editing for a wide range of file types such as **`.py`**, **`.txt`**, **`.md`**, **`.json`**, **`.java`**, **`.cs`**, and **`.cpp`**.

**Benefits:** Faster iteration on generated deliverables, fewer manual copy/paste steps, and a single source of truth for working files stored in Artifacts.

For more information, see [File Editing in Canvas](../how-tos/chat-conversations/file-editing-canvas.md) and [Artifacts](../menus/artifacts.md).

### Chat & Agents: Smart Tools Selection (On-Demand Tool Loading)

When you work with many toolkits, ELITEA can now optimize how tools are provided to the AI. With **Smart Tools Selection** enabled, the assistant discovers and uses the right tools on-demand instead of receiving every tool definition up front—helping reduce overhead while keeping the same user experience.

**What you can do now:**

* **Enable Smart Tools Selection in Chat**: Turn it on from the **Internal Tools** menu in the chat input.
* **Enable Smart Tools Selection for an agent**: Turn it on in the agent configuration so new conversations with that agent use it by default.
* **Keep the same task results**: Tool execution works the same way—Smart Tools Selection changes efficiency (how tools are loaded), not what you can do.
* **Use it with other internal tools**: Smart Tools Selection can be enabled alongside tools like **Planner**.
* **Persist the setting**: In chat, the toggle remains enabled for the conversation even after a page refresh.

**Benefits:** Faster, more cost-efficient conversations when multiple toolkits are attached, with no change to how you ask for work to be done.

For more information, see [Smart Tools Selection Internal Tool](../how-tos/chat-conversations/smart-tools-selection-internal-tool.md).

### Chat & Agents: Sub-Agent Response Accordions (Swarm Mode)

When you use **Swarm Mode** (multi-agent collaboration), child agent responses are now shown inside the parent message as collapsible accordions, instead of appearing as separate chat messages.

**What you can do now:**

* **Review child agent outputs inline**: Sub-agent responses appear under the parent message, so the main conversation stays easy to follow.
* **Expand/collapse sub-agent content**: Open an accordion only when you need the full detail from a specific sub-agent.
* **See which agent responded**: Each accordion is labeled with the child agent name.
* **Keep history consistent after refresh**: Sub-agent responses are preserved when you reload the conversation.

**Benefits:** Cleaner chat history for swarm-based workflows, easier auditing of delegation steps, and faster scanning of results from multiple specialists.

For more information, see [Swarm Mode Internal Tool](../how-tos/chat-conversations/swarm-mode-internal-tool.md).

### Toolkits: ADO Wiki Optional Wiki Identifier

The ADO Wiki toolkit now supports an optional **Wiki Identifier** field, so you can explicitly control which Azure DevOps wiki the toolkit should use.

**What you can do now:**

* **Set a Wiki Identifier when needed**: Provide a specific identifier to target the right wiki for your operations.
* **Keep it optional**: If you leave the field empty, ELITEA uses the default identifier from the toolkit configuration.
* **Reduce ambiguity in wiki operations**: Make wiki read/update actions more predictable when multiple wikis exist.

**Benefits:** Faster configuration and fewer “wrong wiki” results when working across multiple Azure DevOps projects.

For more information, see [Azure DevOps Wiki, Boards, and Plans Toolkit Guide](../integrations/toolkits/ado_wiki_plan_board_toolkit.md).

### Chat: Pin and Reorder Folders

Keep your **Conversations** sidebar organized by pinning important folders for quick access and reordering folders to match your workflow.

**What you can do now:**

* **Pin folders for quick access**: Pin your most important folders so they stay easy to reach.
* **Reorder folders with drag-and-drop**: Change folder order directly in the UI.
* **Keep your setup across sessions**: Pinned folders and folder order persist until you change them.

**Benefits:** Faster navigation and a cleaner workspace when you manage many conversations.

For more information, see [Chat](../menus/chat.md).

### MCPs: Run History Tracking

MCPs now include a working **History** tab (similar to Toolkits), so you can review past runs for the current MCP and inspect the preserved conversation context.

**What you can do now:**

* **Review MCP runs for a specific MCP**: See when a run happened and its total duration.
* **Open a run to view the preserved conversation**: Run details show the associated chat in a read-only view.
* **Remove runs from the list**: Use the delete action to remove a run from the History view (without deleting it from the database).

**Benefits:** Easier auditing and troubleshooting of MCP activity, without leaving the MCP details page.

For more information, see [MCPs](../menus/mcps.md).

### Integrations: Langfuse Tracing

Langfuse tracing is now available through a standard ELITEA credential type (registered via the SDK), so you can enable observability for agent/pipeline executions without installing a separate plugin.

**What you can do now:**

* **Create Langfuse credentials**: Add a Langfuse credential from **Settings → Credentials** using your **Base URL**, **Public Key**, and **Secret Key**.
* **Validate the configuration**: Use **Test Connection** to verify the credential before using it.
* **Use tracing in minimal deployments**: Langfuse configuration is registered via the SDK, making it available even in environments that don’t include optional plugins.

**Benefits:** Easier troubleshooting and monitoring for agent workflows, with a consistent credential-based setup.

For more information, see [Langfuse](../integrations/third-party-integrations/langfuse.md) and [Credentials](../menus/credentials.md).

  
## Changed Features

### Settings: Redesigned Settings Menu and Sub-Menus

The **Settings** area has been refreshed to improve navigation and align key sub-menus with updated UI patterns.

**What changed:**

* **AI Configuration reorganized**: The page is split into **AI Configuration** and **OpenAI Template** tabs for clearer separation.
* **Personal Tokens simplified**: Download options for IDEs are now hidden to reduce visual noise.
* **Secrets protected**: Default/system secrets cannot be deleted, and the UI explains why deletion is blocked.
* **Users management updated**: The users-related settings area has an updated layout for inviting and editing users.
* **Monitoring reorganized**: Monitoring visuals have been updated, and **Groups** are now accessed under **Monitoring**.

**Benefits:** Faster setup, fewer mis-clicks in sensitive areas (like secrets), and a more consistent Settings experience.

For more information, see [Settings Overview](../menus/settings/settings-overview.md), [AI Configuration](../menus/settings/ai-configuration.md), [Personal Tokens](../menus/settings/personal-tokens.md), [Secrets](../menus/settings/secrets.md), [Users](../menus/settings/users.md), and [Monitoring](../menus/settings/monitoring.md).

### Artifacts: Updated Buckets and Artifacts Menu Experience

The **Artifacts** menu and buckets experience has been improved to make files easier to organize, review, and download.

**What changed:**

* **Refreshed Artifacts menu UI**: The Artifacts pages follow updated layouts for better usability.
* **Folder support in buckets**: You can organize artifacts using logical folders (including nested folders).
* **Retention enforcement via archiving**: When a bucket retention period expires, affected files are **archived** (not deleted) and hidden by default.
* **Optional archived visibility**: Use a toggle to show archived files when you need them.
* **Bulk download as ZIP**: Selecting multiple files downloads a single ZIP archive (named after the bucket) instead of downloading files one by one.

**Benefits:** Cleaner organization for large buckets, safer retention behavior, and faster bulk downloads.

For more information, see [Artifacts](../menus/artifacts.md).

### Entities: Refreshed Entity Menus and Unified Table Layout

Entity menus have been updated to improve consistency across the platform and align with the refreshed layouts used in **Settings** and **Artifacts**.

**What changed:**

* **Updated entity headers**: The header area has been redesigned across entity menus (Agents, Pipelines, Toolkits, MCPs, and Credentials).
* **Unified table styling**: Entity lists now use consistent table styles (row spacing, hover/selection behavior, and overall layout).
* **Unified pagination**: Pagination controls are now consistent across entity menus.
* **Import action repositioned**: In **Agents** and **Pipelines**, the Import icon is now placed next to the menu name for quicker access.
* **Agents header simplified**: The status dropdown has been removed from the Agents menu.

**Benefits:** A more consistent experience across entity pages, with cleaner headers and easier scanning of long lists.

For more information, see [Agents](../menus/agents.md), [Pipelines](../menus/pipelines.md), [Toolkits](../menus/toolkits.md), [MCPs](../menus/mcps.md), and [Credentials](../menus/credentials.md).

### Chat: Improved Conversation Rendering (Thinking Steps and Tool Calls)

Chat conversation rendering has been updated to make tool usage and AI reasoning easier to follow—especially when using **Smart Tools Selection**.

**What changed:**

* **Turn-based grouping**: Tool calls are grouped into logical turns, with tool badges displayed together in a single row.
* **Meta-tools hidden in Smart Tools Selection**: Technical meta-tools (such as `invoke_tool` and `list_toolkits`) are hidden when real toolkit tools are present.
* **Cleaner tool labels**: Tool calls use a compact badge format (for example, `GitHub: list_issues`) and remove verbose technical text.
* **Inline progress indicators**: Execution progress is shown inside the tool badge during runs.
* **No empty thinking steps**: Empty reasoning steps are filtered out to avoid blank entries in the conversation.

**Benefits:** Cleaner chat history, easier scanning of multi-tool workflows, and less technical noise in both streaming and history views.

### Canvas: Clearer Model Configuration and Save Behavior

Model configuration in Canvas has been updated to prevent accidental changes and make it clearer when updates take effect.

**What changed:**

* **Public agent models are locked**: When viewing a public agent in Canvas, the model selection is now read-only.
* **Save is required after model changes**: In private/team projects, changing the model in an agent or pipeline now marks the configuration as **unsaved** and requires an explicit **Save**.
* **Version-aware saving**: Model changes apply only to the current version after you save.

**Benefits:** Fewer unintended configuration changes, clearer expectations about which model is being used, and safer updates when working across multiple versions.

For more information, see [How to Create and Edit Agents from Canvas](../how-tos/chat-conversations/how-to-create-and-edit-agents-from-canvas.md), [How to Create and Edit Pipelines from Canvas](../how-tos/chat-conversations/how-to-create-and-edit-pipelines-from-canvas.md), and [How to Use Public Agents from Chat](../how-tos/chat-conversations/use-public-items-from-chat.md).

### Deprecation: Browser Toolkit and Browser Credentials

The **Browser toolkit** and **Browser credentials** are deprecated. For web search use cases, use a **Remote MCP server** that provides Web Search tools (for example, [Tavily](https://tavily.com)).

**Benefits:** More flexible web search integrations, clearer separation between platform and third-party tools, and easier switching between providers.

For more information, see [MCPs](../menus/mcps.md) and [Remote MCP Integration Guide](../integrations/mcp/create-and-use-remote-mcp.md).


## Fixed Issues

* [#3492](https://github.com/ProjectAlita/projectalita.github.io/issues/3492) **Missing Default PG Vector Configuration When Creating a Project**: After creating a new project, the default PgVector configuration may not be created immediately, which can block indexing prerequisites until the configuration is generated.
* [#3490](https://github.com/ProjectAlita/projectalita.github.io/issues/3490) **Chat Briefly Shows “New Conversation” View Instead of Loading Last Conversation**: When opening Chat, the UI can briefly display the New Conversation view while the last conversation is still loading, creating a misleading “no conversations” experience.
* [#3435](https://github.com/ProjectAlita/projectalita.github.io/issues/3435) **Tool Dropdown Lists Are Not Sorted Alphabetically in Nodes (Toolkit, LLM, MCP)**: Tool selection dropdowns in pipeline nodes can appear in an arbitrary order, making it harder to quickly find a specific tool.
* [#3382](https://github.com/ProjectAlita/projectalita.github.io/issues/3382) **Nested Agents/Pipelines Not Callable with Smart Tools Selection (Low Toolkit Count)**: Nested agents and pipelines may not be invoked when Smart Tools Selection is enabled and only a small number of tools are available.
* [#3389](https://github.com/ProjectAlita/projectalita.github.io/issues/3389) **Chat Thinking Steps Show Incorrect Agent/Pipeline Icons and Names**: When running an agent with a nested pipeline via chat commands, pipelines can be shown with the agent icon/name during and after execution.
* [#3377](https://github.com/ProjectAlita/projectalita.github.io/issues/3377) **Jinja2 Template Generation Truncated with GPT Models**: When generating Jinja2 templates in pipeline nodes, some GPT models can omit `{% ... %}` blocks, resulting in invalid/incomplete templates.
* [#3371](https://github.com/ProjectAlita/projectalita.github.io/issues/3371) **Internal Planner Not Invoked in Conversation Chat**: The Internal Planner toolkit may not run in Conversation chat (even when it works in Agent chat).
* [#3353](https://github.com/ProjectAlita/projectalita.github.io/issues/3353) **Serialization Failure When Calling get_wiki in Pipeline (WikiV2 Object)**: Pipelines using ADO Wiki tools like `get_wiki` may fail with serialization errors when raw `WikiV2` objects are persisted in state (for example, with `msgpack/jsonplus`), causing the run to error.
* [#3341](https://github.com/ProjectAlita/projectalita.github.io/issues/3341) **Index Tool Instances Stuck in “In progress” After Stopping Execution**: Stopped index runs can remain visible as “In progress” instead of transitioning to a final state.
* [#3325](https://github.com/ProjectAlita/projectalita.github.io/issues/3325) **Child Pipeline Code Node Can’t Read Mapped State Variable**: Nested pipelines may fail in Code nodes when accessing mapped state, causing an AttributeError.
* [#3323](https://github.com/ProjectAlita/projectalita.github.io/issues/3323) **Validation Errors Not Shown for pydantic_core Exceptions**: Some validation failures were suppressed in the UI, making errors harder to diagnose.
* [#3317](https://github.com/ProjectAlita/projectalita.github.io/issues/3317) **Code Node Fails with Pyodide Sandbox Read-Access Error**: Code node execution could fail due to sandbox read-access restrictions in the Pyodide environment.
* [#3290](https://github.com/ProjectAlita/projectalita.github.io/issues/3290) **Internal Planner + Smart Tools Selection Fails with gpt-4.1 on First Message**: The first prompt could fail when using Internal Planner with Smart Tools Selection on the `gpt-4.1` model.
* [#3288](https://github.com/ProjectAlita/projectalita.github.io/issues/3288) **Python Sandbox Fails Due to Missing Dependency**: Python sandbox and pipeline Code nodes could fail if the `langchain-sandbox` dependency was missing.
* [#3275](https://github.com/ProjectAlita/projectalita.github.io/issues/3275) **Parent Agent Cannot Execute Nested Agents or Pipelines**: Parent agents could fail to detect or resolve configured nested agents/pipelines, preventing delegation.
* [#3271](https://github.com/ProjectAlita/projectalita.github.io/issues/3271) **Code Node Newlines Double-Escaped Before Pyodide Execution**: Newline characters could be double-escaped, causing Python code to run as a single line unexpectedly.
* [#3261](https://github.com/ProjectAlita/projectalita.github.io/issues/3261) **Router/Decision Routes to Default Output Instead of END**: When routing to an END node, Router/Decision nodes could incorrectly follow the Default Output path.
* [#3220](https://github.com/ProjectAlita/projectalita.github.io/issues/3220) **ADO Test Plans: Custom Fields Fail to Populate on Test Case Creation**: Creating test cases with custom fields could fail with a ToolException-related error.
* [#3215](https://github.com/ProjectAlita/projectalita.github.io/issues/3215) **Nested/Child Agent Not Called When Parent Agent Is Used in Chat**: Child agents could be skipped in chat conversations when a parent agent was selected.
* [#3134](https://github.com/ProjectAlita/projectalita.github.io/issues/3134) **Incorrect Duration in Agents/Pipelines History After Error Runs**: Run durations could be calculated incorrectly when error runs occurred in the same conversation.
* [#2961](https://github.com/ProjectAlita/projectalita.github.io/issues/2961) **Regenerate Uses Old LLM Model After Model Change**: Regenerate could continue using the previous model instead of the newly selected model.

 
## Known Issues


* [#3563](https://github.com/ProjectAlita/projectalita.github.io/issues/3563) **Pipeline interrupts lost on export/import**: Pipelines that include interrupts may export without interrupt configuration (in both `.zip` and `.md`), so imported pipelines lose interrupt settings.
* [#3528](https://github.com/ProjectAlita/projectalita.github.io/issues/3528) **Update File Tool - Unable to Input Multi-line Format in Test Settings and Pipeline Node**: The `update_file` query field may not preserve required line breaks in Toolkit Test Settings or pipeline Toolkit nodes, causing OLD/NEW marker formatting errors.
* [#3516](https://github.com/ProjectAlita/projectalita.github.io/issues/3516) **State creation does not apply default values based on field type**: Newly created pipeline state fields can start as empty values instead of type-based defaults (for example, `0` for numbers or `[]` for arrays).
* [#3502](https://github.com/ProjectAlita/projectalita.github.io/issues/3502) **Default value changes for pipeline state not applied until page reload or chat clearing**: After updating a state’s default value, pipeline runs may continue using the previous value until you reload the page or start a new chat.
* [#3494](https://github.com/ProjectAlita/projectalita.github.io/issues/3494) **Swarm agent intermittently fails to transfer/execute the peers when both pipeline and agent are configured as toolkit**: In Swarm mode, `transfer_to_<agent>` calls can intermittently return without executing the delegated peer when both agent and pipeline toolkits are configured.
* [#3468](https://github.com/ProjectAlita/projectalita.github.io/issues/3468) **Published agent with sub-agents fails at runtime due to using latest versions instead of published versions**: Published agents with nested sub-agents can fail at runtime if sub-agents resolve to latest (draft) versions instead of the published versions.
* [#3464](https://github.com/ProjectAlita/projectalita.github.io/issues/3464) **Import Attach Duplicate Nested Entities When Multiple Versions Exist in Pipeline Hierarchy**: Importing certain pipeline hierarchies with multiple nested versions can create duplicated nested attachments (relationships), even though versions are created correctly.
* [#3400](https://github.com/ProjectAlita/projectalita.github.io/issues/3400) **Postman Toolkit: Folder Lookup Failure During Request Creation**: A folder created via the Postman toolkit may not be found in a subsequent step (for example, when creating a request by path), causing the run to fail.
* [#3388](https://github.com/ProjectAlita/projectalita.github.io/issues/3388) **SharePoint Indexing Displays Incorrect success message**: SharePoint indexing can show a “files indexed” success message even when the run is interrupted by repeated 429 errors, which can be misleading.
* [#3367](https://github.com/ProjectAlita/projectalita.github.io/issues/3367) **SharePoint index_data Fails with IndexError for Some Folder Configurations**: SharePoint toolkit indexing can fail with `IndexError: list index out of range` for empty folder settings or specific folder-path inputs.
* [#3366](https://github.com/ProjectAlita/projectalita.github.io/issues/3366) **SharePoint index_data fails to retrieve data from document libraries with hyphens in folder names**: The SharePoint `index_data` tool can fail with an “incorrect folder path” error when the target document library or folder name includes hyphens.
* [#3362](https://github.com/ProjectAlita/projectalita.github.io/issues/3362) **Chat Thought Duration Can Display Negative Values After Toolkit Exceptions**: When a pipeline stops due to certain toolkit-node exceptions, the Thought (thinking steps) duration can show negative time values.
* [#3359](https://github.com/ProjectAlita/projectalita.github.io/issues/3359) **Artifacts Toolkit create_file Fails When Optional Parameters Are Left Empty**: The `create_file` tool can fail if both `filedata` and `filepath` are omitted, even though the UI marks them as optional.
* [#3347](https://github.com/ProjectAlita/projectalita.github.io/issues/3347) **Deprecated Pipeline Node Fails When Calling a Nested Pipeline**: Executions can error when using the deprecated **Pipeline** node to invoke a nested pipeline.
* [#3322](https://github.com/ProjectAlita/projectalita.github.io/issues/3322) **Incorrect MCP settings and UI placement after Agent/Pipeline export/import**: After exporting/importing an agent with an attached Local MCP, the MCP can appear in the wrong UI location (Toolkits instead of MCPs) and/or lose settings.
* [#3321](https://github.com/ProjectAlita/projectalita.github.io/issues/3321) **Toolkit credentials show incorrect UI validation message after agent import despite functional credentials**: Imported toolkits can show incorrect credential-validation errors (and related UI inconsistencies) even though the toolkit works.
* [#3315](https://github.com/ProjectAlita/projectalita.github.io/issues/3315) **Pipeline export shows nested agents/pipelines duplicated in both nested agents and toolkits sections during import UI**: Import can display duplicated nested agents/pipelines across sections in the import UI even when the final imported result has no actual duplication.
* [#3307](https://github.com/ProjectAlita/projectalita.github.io/issues/3307) **Conversation Chat Doesn’t Detect Pipeline-Configured Artifacts Toolkit for Attachments**: When a pipeline participant has attachments enabled, chat can still prompt for artifact-toolkit selection instead of using the configured toolkit automatically.
* [#3287](https://github.com/ProjectAlita/projectalita.github.io/issues/3287) **Excel Indexing Misses Formula-Calculated Values**: When indexing Excel files that contain formulas, calculated values may not be indexed and can appear empty in the indexed content.
* [#3252](https://github.com/ProjectAlita/projectalita.github.io/issues/3252) **Input mapping fields persist when switching to tools without required/optional fields**: When switching tools in MCP/Toolkit nodes, input mapping fields from the previous tool can persist and be sent unexpectedly.
* [#3151](https://github.com/ProjectAlita/projectalita.github.io/issues/3151) **PPT Files Fail to Read or Index from Artifacts or SharePoint**: Reading or indexing PowerPoint files can raise errors instead of completing successfully or returning a clear “format not supported” message.
* [#3076](https://github.com/ProjectAlita/projectalita.github.io/issues/3076) **Non-Latest Agent/Pipeline Versions Don’t Save Name/Description Updates**: Editing the name/description in older versions can show a success message but not persist after reload.
* [#2939](https://github.com/ProjectAlita/projectalita.github.io/issues/2939) **Users Can Select Pipeline Versions Containing Interruptions or Deprecated Pipeline Node When Adding to Parent Pipelines**: When nesting pipelines, the UI can allow selecting pipeline versions that contain interruptions (or deprecated nodes), bypassing expected validation.
* [#2922](https://github.com/ProjectAlita/projectalita.github.io/issues/2922) **GitLab org Toolkit does not restrict access to specified repositories when only one repository is added**: GitLab org toolkits may ignore a single-repository restriction and operate across all project repositories.
* [#2304](https://github.com/ProjectAlita/projectalita.github.io/issues/2304) **MCP Client Disconnects on macOS**: MCP client disconnects from platform despite tray showing "connected" on macOS; logs show "packet queue is empty" errors and repeated disconnect/reconnect cycles.
* [#1163](https://github.com/ProjectAlita/projectalita.github.io/issues/1163) **MCP Only Executes Latest Version**: MCP-tagged resources execute the latest version regardless of which version has the MCP tag; only the latest version is accessible via MCP.
