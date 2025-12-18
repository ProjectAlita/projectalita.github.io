# Release Notes - 2.0.0 Beta
 
## Introduction
 
Welcome to **ELITEA** — your comprehensive platform for building, deploying, and managing AI-powered workflows and intelligent agents. This release introduces significant enhancements including new features for image handling, execution history tracking, pipeline node redesign, and expanded MCP capabilities. For a complete overview of ELITEA and its capabilities, see the [Introduction](../home/introduction.md).
 
## Information
 
* **Release Version**: 2.0.0 Beta
* **Released on**: 10-Nov-2025
* **Access for 2.0.0 Beta**: [Next environment](https://next.elitea.ai)

 
## Important

* **Prompts deprecated**: The **Prompts** entity is deprecated. All existing prompts were converted to Agents. You can create Agents without attaching a Toolkit (a lightweight replacement for Prompts) and use variables with these agents.
* **Datasources deprecated**: The **Datasources** entity is deprecated. Your existing datasources remain available in this release so you can re-index and reconfigure them using the new **Index data** tool available in most Toolkits (e.g., GitHub, Confluence, Bitbucket, ADO Repos, Jira, etc.),  as even though they remain connected to agents, they cannot be used (as the datasets themselves are not migrated). **Note**: Creating new datasources or datasets is no longer supported.
* **Integrations replaced by Credentials**: Integrations are deprecated and replaced by Credentials as a standalone entity. Existing Integrations are not auto-migrated; recreate them as **Credentials** manually. See: [How to Use Credentials](../how-tos/credentials-toolkits/how-to-use-credentials.md).
* **Toolkits separated**: Toolkits are now a standalone entity under the Toolkits menu. Agents and Pipelines that previously had connected toolkits still keep those links; you can also reuse Toolkits across multiple entities. See: [How to create a toolkit](../how-tos/chat-conversations/how-to-create-and-edit-toolkits-from-canvas.md).

## New Features
 
### Chat: Support Images as attachments

You can now add images to a conversation and have agents or pipelines analyze them, plus receive AI‑generated images directly inline in the chat thread.

**What you can do now:**

* **Upload images** via drag & drop, file picker or copy-paste.
* **Supported formats**: JPEG, PNG, WebP, and non‑animated GIF.
* **Inline AI outputs**: Agents can return generated images as part of their response; they display inline just like user uploads.
* **Persistent storage**: All uploaded and generated images are stored durably with stable IDs/URLs and can be revisited from chat history and the Artifacts menu.
* **Reuse across sessions**: Reopen a conversation later and re-reference prior images without re-uploading.

This feature unlocks visual analysis use cases (UI reviews, diagram interpretation, data screenshot extraction) and enables workflows combining text + vision + generated imagery in a single conversational flow.

For detailed guidance, see [Attach Images and Files in Chat](../how-tos/chat-conversations/attach-images-and-files-in-chat.md).

### Indexing: Dedicated Toolkit Indexes Tab

A new Indexing tab is now available inside supported toolkits, giving you a consolidated workspace to manage and inspect all indexes created through that toolkit.

**What you can do now:**

* **View all indexes** associated with the toolkit in a single, paginated list (name, type/source, size, last updated, status).
* **Create new indexes** directly from the tab without leaving the toolkit configuration screen.
* **Reindex or refresh** an existing index to pull updated content (with clear in‑progress status feedback).
* **Delete obsolete indexes** to remove stale or unnecessary data and free resources.
* **Search & filter** indexes by name, status, or last updated time for faster navigation.
* **Inspect configuration**: Open an index detail panel to view configuration parameters (scope, filters, model/embedding settings, created by, timestamps).
* **History & activity**: *(available from next release)*: See recent operations (created, reindexed, failed attempts) with timestamps and outcomes for auditability.
* **Auto-Update Scheduler** *(available from next release)*: Configure automated updates for indexes at scheduled intervals to keep your data fresh without manual reindexing.

**Benefits:** Centralizes lifecycle management of indexed data, reduces duplication, and improves transparency into what content your agents and pipelines can search.

For detailed guidance, see [Using Indexes Tab Interface](../how-tos/indexing/using-indexes-tab-interface.md).

### Canvas: Edit Pipelines from Chat

Edit pipelines directly from chat conversations using Canvas, without leaving the active conversation context.

**What you can do now:**

* **Quick access**: Click the **Pencil icon** in Participants or the **Gear icon** when selecting a pipeline from chat input.
* **Configuration tab**: Adjust LLM model, toolkits, conversation starters, welcome message, steps limit, attachment permissions, and Pyodide sandbox settings.
* **Flow Editor tab**: Choose between visual drag-and-drop node configuration (Flow sub-tab) or direct YAML editing (YAML sub-tab).
* **Responsive canvas**: Resize by dragging the left edge to fit your screen.
* **Version-specific editing**: Changes apply only to the selected pipeline version.
* **Save or discard**: Commit changes with **Save** or cancel with **Discard** without affecting the pipeline.

This keeps you in the conversation flow, reduces context switching, and enables rapid iteration on pipeline logic with immediate testing in the same chat session.

For detailed guidance, see [Create and Edit Pipelines from Canvas](../how-tos/chat-conversations/how-to-create-and-edit-pipelines-from-canvas.md).


### Canvas: Create Toolkit and MCP Server

Create new toolkits and MCP servers directly from a conversation using Canvas, without leaving Chat.

**What you can do now:**

* **Create toolkits**: Build a new toolkit from scratch within the Canvas interface.
* **Create MCP servers**: Set up new MCP servers using the same Canvas workflow.
* **Configure during creation**: Set credentials, connection details (e.g., namespace), and select tools as you create.
* **Immediate availability**: Newly created toolkits or MCP servers are automatically attached to the active conversation for instant use.
* **Reusable resources**: Once created, reuse these toolkits or MCP servers across other agents, pipelines, and conversations.

For detailed guidance, see [Create and Edit Toolkits from Canvas](../how-tos/chat-conversations/how-to-create-and-edit-toolkits-from-canvas.md) and [Create and Edit MCPs from Canvas](../how-tos/chat-conversations/how-to-create-and-edit-mcps-from-canvas.md).


### Chat: Configurable Pyodide (Python) Sandbox Tool

Control Python code execution in conversations with a new toggle button for the Pyodide sandbox tool.

**What you can do now:**

* **Toggle button in chat input**: A new icon next to the Attachments button lets you enable or disable the Python sandbox tool (pyodide_sandbox) on demand.
* **Default state**: Disabled by default to avoid unnecessary tool invocation for non-Python queries.
* **Available everywhere**: The toggle is available in Conversations (Chat menu), Agents menu, and Pipelines menu chat inputs.
* **Session persistence**: Your enable/disable choice persists throughout the conversation session.
* **Smart invocation**: The tool activates only when enabled and when Python-related input is detected (e.g., "Write a Python script to calculate Fibonacci").
* **Clear guidance**: Hover over the icon to see a tooltip explaining the feature and recommended use cases.

This gives you precise control over when Python code execution is available, reducing unwanted tool calls and improving response accuracy for general queries.

For detailed guidance, see [Using the Python Sandbox Tool in Chat](../how-tos/chat-conversations/enable-internal-tools.md).

### Agents & Pipelines: Usage History Tracking

Track and review all agent and pipeline executions with a dedicated History tab that preserves run details and conversations for auditing and analysis.

**What you can do now:**

* **View execution history**: Access a dedicated **History** tab in both Agents and Pipelines menus to see all past runs.
* **Run details at a glance**: Each history entry displays the execution date and time, version executed, and total run duration.
* **Review preserved conversations**: Click any run to view the complete conversation that occurred during that execution.
* **Read-only access**: Preserved conversations are displayed in read-only mode for reference and auditing purposes.
* **Clean up history**: Remove runs from the History view using the Delete icon; runs are removed from the UI while preserved in the database for compliance.
* **Version tracking**: Identify which version of an agent or pipeline was used for each execution, useful when troubleshooting or comparing behavior across versions.

This feature enables better debugging, performance analysis, and compliance tracking by maintaining a complete audit trail of all agent and pipeline executions.

For detailed guidance, see [View Agents and Pipelines History](../how-tos/agents-pipelines/agents-pipelines-history.md).

### Jira: Atlassian API v3 Support

Jira toolkit now supports Atlassian API v3, ensuring compatibility with the latest Jira Cloud instances that require the updated API version.

**What changed:**

* **API v3 compatibility**: JQL searches and other Jira operations now work seamlessly with new Jira Cloud versions that mandate API v3 (`/rest/api/3/search/jql`).
* **Backward compatibility**: Existing Jira integrations using API v2 continue to work without modification.
* **Automatic version selection**: The toolkit detects and uses the appropriate API version based on your Jira instance configuration.
* **Improved efficiency**: Native v3 support eliminates the need for workarounds using generic request tools, reducing token usage and simplifying agent instructions.

This update ensures uninterrupted access to Jira data across both legacy and modern Jira Cloud deployments. **Note**: Atlassian API v3 support for Confluence toolkit will be available in future releases.


### MCP: Toolkits Available as Local Tools

ELITEA Toolkits are now accessible as local MCP tools in external clients like GitHub Copilot, alongside agents and pipelines.

**What you can do now:**
* **Discover all project toolkits**: Connect your ELITEA project and browse all available toolkits from MCP clients without requiring MCP tags.
* **Execute toolkit tools directly**: Run individual toolkit tools from GitHub Copilot chat or other MCP-compatible clients.
* **No tagging required**: Unlike agents and pipelines (which require MCP tags), all toolkits in your connected project are automatically available.
* **Unified workflow**: Access agents, pipelines, and toolkits from a single MCP connection for seamless cross-platform integration.

This expands MCP capabilities beyond agents and pipelines, enabling direct toolkit execution from your preferred development environment.

For detailed guidance, see [Using Toolkits via MCP](../integrations/mcp//make-tools-available-by-mcp.md).

  
## Changed Features
 
### Pipeline Enhancements and Node Model Changes

We redesigned the pipeline node model to make building, reading, and maintaining pipelines faster and more intuitive. The updated node set focuses each node on a single clear responsibility, adds visual color-coding for instant recognition, and removes legacy, overlapping nodes that previously caused confusion. These changes reduce setup friction, clarify configuration options, and improve troubleshooting.

**Color coding:** Each node type now has a distinct color family (e.g., Execution, Data, Control, Integration) so you can scan complex graphs and immediately understand structure without opening each node.

**Vertical flow layout:** Pipelines now use vertical orientation in Flow mode, with nodes arranged top-to-bottom instead of left-to-right. This improves readability, better integrates with chat-based editing workflows, and provides more natural flow visualization for complex pipelines.

**Enhanced LLM node:** The LLM node has been redesigned with separate **System** and **Task** fields replacing the previous Prompt field, giving you clearer control over context and instructions. Each field supports three input types: F-String (dynamic variable interpolation), Variable (direct state reference), or Fixed (static text). The node now also supports adding multiple toolkits and MCPs directly, with granular control to enable or disable individual tools—expanding LLM capabilities without requiring additional Function nodes.

!!! Important warning "Important"
    For detailed guidance, see [Updating LLM Nodes in Pipelines](../migration/v2.0.0/update-llm-nodes.md).

**Drag-and-drop node connections:** You can now drag connection leashes (connectors) from any node and release them in the canvas to trigger a smart dropdown menu. This menu lets you either connect to an existing node (with searchable list showing node names and icons) or create and connect a new node type in one fluid motion. The dropdown includes the already existing nodes and automatically connects the leash to your selected target—streamlining pipeline construction and reducing manual wiring steps.

**New Code node:** A new Code node type enables secure Python code execution within pipelines using the Pyodide sandbox environment. The node features a code field with three input types (F-String for dynamic variable interpolation, Variable for state-sourced code, or Fixed for static blocks), full-screen editing with Python syntax highlighting, configurable input/output state variable mapping, and advanced options including Interrupt Before/After and Structured Output toggles. Code executes in an isolated sandbox with automatic pipeline state injection as `alita_state`, supporting Python standard library and dynamically installable packages—ideal for custom data processing, transformations, and computational tasks directly within pipeline flows.


### Pipeline States: Redesigned Management Interface

Pipeline state management has been redesigned to provide a clearer, more intuitive workflow for configuring and managing state variables in Flow mode.

**What changed:**

* **States sidebar**: Click the new **States button** (located under the **+** node button in Flow mode) to open a resizable sidebar on the right displaying all states.
* **Default states**: The default **input** and **messages** states are always visible with toggle switches to activate/deactivate them as needed.
* **Icon-based visualization**: State types (string, list, JSON, number) are represented by icons instead of text for faster recognition.
* **Add custom states**: Click **+ Context** to add new state variables with validated names (letters, numbers, underscores only; must start with a letter), type selection, and optional default values.
* **Multi-line input**: Default value fields expand to 5-row text areas when the sidebar is resized, making it easier to enter and review longer values.
* **Real-time save**: State changes are applied and saved instantly without requiring a separate pipeline-wide save action.
* **Resizable sidebar**: Drag the left edge to adjust sidebar width to your preference; the size persists during your session.

**Why this is better:**

* More intuitive access and visual clarity for state configuration.
* Reduces errors with validated state names and clear type indicators.
* Instant save eliminates the risk of losing state configuration changes.
* Consistent interface across Pipelines menu and Canvas editing mode.

 
## Fixed Issues

* [#2376](https://github.com/ProjectAlita/projectalita.github.io/issues/2376) **Inflated Token Count in Monitoring**: Fixed token counting inaccuracy due to duplicate/transformed messages; monitoring now reflects actual tokens sent to LLM.
* [#2361](https://github.com/ProjectAlita/projectalita.github.io/issues/2361) **Flow Editor Crashes with Function/Custom Nodes**: Fixed React error (#185) when moving, editing, or modifying Function or Custom nodes in Flow Editor; nodes now manipulable without crashing.
* [#2340](https://github.com/ProjectAlita/projectalita.github.io/issues/2340) **Bitbucket Indexing Fails with JSON Files**: Fixed indexing failure with AttributeError when Bitbucket repositories contain JSON files; JSON files now properly indexed.
* [#2331](https://github.com/ProjectAlita/projectalita.github.io/issues/2331) **Model Settings Disabled in New Chat**: Fixed disabled Settings icon in new conversations preventing LLM configuration; settings now accessible before first message.
* [#2327](https://github.com/ProjectAlita/projectalita.github.io/issues/2327) **SharePoint Toolkit Permissions Error for External Sites**: Fixed "insufficient permissions" error when connecting to external SharePoint sites with properly configured credentials; toolkit now successfully connects using graph.microsoft.com/.default scope.
* [#2300](https://github.com/ProjectAlita/projectalita.github.io/issues/2300) **OpenAPI Toolkit Form View Missing**: Fixed OpenAPI toolkit opening in Raw JSON only after save; Form view now available for editing saved toolkits.
* [#2295](https://github.com/ProjectAlita/projectalita.github.io/issues/2295) **Pipeline Node Syntax Highlighting**: Fixed missing syntax validation and highlighting for Condition, Router, State Modifier, and Code node fields; now provides live Jinja2 and Python syntax validation.
* [#2286](https://github.com/ProjectAlita/projectalita.github.io/issues/2286) **MCP Pipeline Execution Failure**: Fixed issue where pipelines executed via GitHub Copilot MCP weren't running nodes properly; pipeline nodes now execute correctly.
* [#2240](https://github.com/ProjectAlita/projectalita.github.io/issues/2240) **Confluence Private Page Access Fails**: Fixed "Page not found" error when retrieving private Confluence pages with proper credentials; private pages now accessible.
* [#2233](https://github.com/ProjectAlita/projectalita.github.io/issues/2233) **Switch Assistant Selection Not Active**: Fixed issue where agents/pipelines selected from Frequently Used or Search weren't set as active participant in chat input; now automatically activated.
* [#2225](https://github.com/ProjectAlita/projectalita.github.io/issues/2225) **Pipeline Not Discoverable Without Agent MCP Tags**: Fixed issue where pipelines become undiscoverable from Copilot when included agents lack MCP tags; validation error now raised to indicate missing tags.
* [#2222](https://github.com/ProjectAlita/projectalita.github.io/issues/2222) **Deleted Messages Retained in Agent History**: Fixed issue where deleted messages in agent conversations remained in context and history; deleted messages now properly removed from both.
* [#2219](https://github.com/ProjectAlita/projectalita.github.io/issues/2219) **Pipeline-as-Toolkit Input Truncated**: Fixed issue where pipeline input was truncated to single character when called from agent; full input now properly passed.
* [#2217](https://github.com/ProjectAlita/projectalita.github.io/issues/2217) **Artifact UI Limited to 18 Buckets**: Fixed Artifact UI displaying maximum of 18 buckets without scrolling capability; additional buckets now accessible with proper scrolling.
* [#2214](https://github.com/ProjectAlita/projectalita.github.io/issues/2214) **Confluence Read Page Fails for Archived Pages**: Fixed read_page_by_id tool crash with IndexError when accessing archived, restricted, or deleted Confluence pages; now handles gracefully.
* [#2201](https://github.com/ProjectAlita/projectalita.github.io/issues/2201) **New Toolkit Redirects to Menu**: Fixed redirect to Toolkits menu instead of opening the newly created toolkit after saving.
* [#2181](https://github.com/ProjectAlita/projectalita.github.io/issues/2181) **LLM2 Node Displays LLM1 Chat History**: Fixed issue where final LLM node's output shows chat history from first LLM node instead of its own result.
* [#2180](https://github.com/ProjectAlita/projectalita.github.io/issues/2180) **Condition Branch to END Never Executes**: Fixed issue where condition/decision/router branch routed to END never fires; pipeline now properly completes.
* [#2167](https://github.com/ProjectAlita/projectalita.github.io/issues/2167) **LLM Model Dropdown Shows Technical Names**: Fixed LLM model dropdown showing technical model names instead of user-friendly Display names.
* [#2150](https://github.com/ProjectAlita/projectalita.github.io/issues/2150) **Missing Variables Error Despite Assignment**: Fixed error message about missing variables displayed even when values were assigned during pipeline execution.
* [#2149](https://github.com/ProjectAlita/projectalita.github.io/issues/2149) **Pipeline Fails on Consecutive Runs**: Fixed pipeline failing to start on consecutive runs without page refresh.
* [#2139](https://github.com/ProjectAlita/projectalita.github.io/issues/2139) **Clear Messages Doesn't Reset Session**: Fixed issue where Clear messages didn't fully reset session; new stream/session ID now properly generated.
* [#2135](https://github.com/ProjectAlita/projectalita.github.io/issues/2135) **Stale Toolkit References After Renaming**: Fixed stale references in pipeline nodes and YAML after renaming a toolkit; references now update automatically.
* [#2132](https://github.com/ProjectAlita/projectalita.github.io/issues/2132) **Next Node Doesn't Start with Interrupt**: Fixed issue where pipeline doesn't advance to the next node when Interrupt After or Interrupt Before is used.
* [#2117](https://github.com/ProjectAlita/projectalita.github.io/issues/2117) **Pipeline Stalls with Node Names Containing Spaces**: Fixed pipeline stalling after interrupt when node names contain spaces; output and message now properly forwarded.
* [#2116](https://github.com/ProjectAlita/projectalita.github.io/issues/2116) **Canvas Markdown Table Edit Causes Validation Error**: Fixed Pydantic ValidationError when sending messages after editing markdown tables in Canvas; content now properly serialized as string.
* [#2115](https://github.com/ProjectAlita/projectalita.github.io/issues/2115) **Jira Get Attachments Tool Failure**: Fixed get_Attachments tool failure for specific attachment types in Jira integration.
* [#2106](https://github.com/ProjectAlita/projectalita.github.io/issues/2106) **LLM Node with "Interrupt After" Blocks Flow**: Fixed issue where pipeline doesn't advance after LLM node with "Interrupt after" enabled; output is now properly passed to next node.
* [#2103](https://github.com/ProjectAlita/projectalita.github.io/issues/2103) **JSON Config Not Parsed Without Blur**: Fixed issue where JSON configuration in State modal wasn't parsed when Save was clicked without first blurring the input field.
* [#2098](https://github.com/ProjectAlita/projectalita.github.io/issues/2098) **Agent Version Switch LLM Model Display**: Fixed UI not updating the LLM model name when switching between agent versions.
* [#2095](https://github.com/ProjectAlita/projectalita.github.io/issues/2095) **Multiple Messages Sent During Processing**: Fixed issue where additional messages could be sent while the first message was still processing.
* [#2093](https://github.com/ProjectAlita/projectalita.github.io/issues/2093) **Postman Nested Environment Variables**: Fixed "Execute Request" tool failure in Postman toolkit when environment variables contain nested variable references.
* [#2085](https://github.com/ProjectAlita/projectalita.github.io/issues/2085) **Java/JS File Indexing in Artifacts**: Fixed issue where Java and JavaScript files failed to index in artifacts (reported "0 files found").
* [#2073](https://github.com/ProjectAlita/projectalita.github.io/issues/2073) **Toolkit Name with Spaces Causes Error**: Fixed invalid_request_error during agent execution when toolkit names contain spaces.
* [#2069](https://github.com/ProjectAlita/projectalita.github.io/issues/2069) **Error Message After Canvas Use**: Fixed error message displayed after using canvas in chat and continuing the conversation.
* [#2062](https://github.com/ProjectAlita/projectalita.github.io/issues/2062) **Message Regenerate with Anthropic Models**: Fixed regeneration failure with Anthropic models when there are errors in message history.
* [#2054](https://github.com/ProjectAlita/projectalita.github.io/issues/2054) **Deleted LLM Model Still Used**: Fixed issue where agents continued using a deleted LLM model instead of the new default model.
* [#2052](https://github.com/ProjectAlita/projectalita.github.io/issues/2052) **Thinking Steps During Canvas Generation**: Fixed issue where thinking steps and output weren't properly shown when opening canvas for MCP, toolkit, or agent during generation.
* [#2048](https://github.com/ProjectAlita/projectalita.github.io/issues/2048) **TestRail Indexing with Multiple Suites**: Fixed indexing failure in TestRail projects configured with multiple suites requiring Suite ID.
* [#2046](https://github.com/ProjectAlita/projectalita.github.io/issues/2046) **Unable to Save Tool Selection for New Toolkit**: Fixed "author_id required" error when selecting/unselecting tools of a newly added toolkit to an agent before saving.
* [#2033](https://github.com/ProjectAlita/projectalita.github.io/issues/2033) **User Input Removed When Opening Canvas**: Fixed issue where user input was cleared when opening canvas for toolkit, agent, or pipeline while starting a new conversation.
* [#1998](https://github.com/ProjectAlita/projectalita.github.io/issues/1998) **Toolkit List View Sorting Issue**: Fixed toolkit display issue when sorting by name in list view after navigating to subsequent pages.
* [#1997](https://github.com/ProjectAlita/projectalita.github.io/issues/1997) **Pipeline Execution with Toolkit Using Secret**: Fixed pipeline execution getting stuck when a toolkit uses the secret option in a Function node.
* [#1966](https://github.com/ProjectAlita/projectalita.github.io/issues/1966) **Generated Excel File Cannot Be Opened**: Fixed issue where Excel files generated using the Artifact toolkit's Create File tool couldn't be opened after downloading.
* [#1964](https://github.com/ProjectAlita/projectalita.github.io/issues/1964) **Confluence Indexing Options Ignored**: Fixed issue where Confluence toolkit indexing options (Include Restricted Content, Archived Content, Attachments, Comments, Labels) were ignored; options now properly control indexing behavior.
* [#1956](https://github.com/ProjectAlita/projectalita.github.io/issues/1956) **OpenAPI Toolkit Authentication with ELITEA Secret**: Fixed authentication failure in OpenAPI toolkit when using an ELITEA secret instead of a direct password.
* [#1902](https://github.com/ProjectAlita/projectalita.github.io/issues/1902) **Indexing Fails with Deleted Chunking Tool Value**: Fixed indexing failure when the chunking tool value is deleted from toolkits; now uses default value per toolkit.
* [#1901](https://github.com/ProjectAlita/projectalita.github.io/issues/1901) **Jira Toolkit Indexing from Agent Fails**: Fixed data indexing failure when initiated from an agent using Jira Toolkit.
* [#1862](https://github.com/ProjectAlita/projectalita.github.io/issues/1862) **Default Model Name Shown for Public Agents**: Fixed issue where the default model name was displayed instead of the selected model when executing public agents.
* [#1543](https://github.com/ProjectAlita/projectalita.github.io/issues/1543) **Unable to Set Nested Agents Variable Values**: Fixed issue where variables in nested agents couldn't be overridden from the parent agent or pipeline toolkit side.
 
 
## Known Issues

* [#2407](https://github.com/ProjectAlita/projectalita.github.io/issues/2407) **LLM Model Breaks When Clearing Token Fields**: Clearing "Context Window" or "Max Output Tokens" fields in LLM model configuration causes 500 error and model becomes unavailable; workaround is to delete and recreate the model with proper values.
* [#2405](https://github.com/ProjectAlita/projectalita.github.io/issues/2405) **No Upload Progress for Large File Attachments**: No upload progress indicator shown when attaching large files (5MB+) in conversations, causing UI to appear frozen; files eventually upload successfully.
* [#2389](https://github.com/ProjectAlita/projectalita.github.io/issues/2389) **Browser Toolkit Fails Without Credentials**: Browser toolkit execution fails when saved without credentials selected, even when Google tool is not selected; workaround is to add credentials.
* [#2375](https://github.com/ProjectAlita/projectalita.github.io/issues/2375) **Multi-File Attachment Rejected with Single Duplicate**: When selecting multiple files for chat attachment, all files (including unique ones) are rejected if one duplicate is present; workaround is to deselect duplicate files before attaching.
* [#2360](https://github.com/ProjectAlita/projectalita.github.io/issues/2360) **Deprecated Prompt Field in New LLM Nodes**: Newly created LLM nodes include deprecated "prompt" field in YAML alongside new "system" and "task" fields; deprecated field should be ignored.
* [#2352](https://github.com/ProjectAlita/projectalita.github.io/issues/2352) **SharePoint Toolkit Read List Fails with Graph API**: Read List functionality fails with error when SharePoint toolkit is configured to use Graph API; workaround unavailable.
* [#2351](https://github.com/ProjectAlita/projectalita.github.io/issues/2351) **Zephyr Essentials Reindexing Removes Previous Data**: Reindexing in Zephyr Essentials toolkit deletes previously indexed documents even when "Clean Index" is not selected; existing data is removed and reindexed.
* [#2350](https://github.com/ProjectAlita/projectalita.github.io/issues/2350) **Misleading Error Message for Token Limit**: Agent shows "Maximum tool execution iterations (15) reached" when actual issue is Max Output Tokens limit; increase Max Output Tokens in Anthropic model settings to resolve.
* [#2304](https://github.com/ProjectAlita/projectalita.github.io/issues/2304) **MCP Client Disconnects on macOS**: MCP client disconnects from platform despite tray showing "connected" on macOS; logs show "packet queue is empty" errors and repeated disconnect/reconnect cycles.
* [#2053](https://github.com/ProjectAlita/projectalita.github.io/issues/2053) **Claude Model Integration Error with Dial Key**: Claude model integration via Dial API key fails with "invalid structure" error on stream_options path.
* [#2051](https://github.com/ProjectAlita/projectalita.github.io/issues/2051) **Gemini/Claude Models Fail via Dial API**: Integrating Gemini or Claude models using Dial API key results in "invalid structure" error on stream_options path.
* [#1990](https://github.com/ProjectAlita/projectalita.github.io/issues/1990) **Browser Toolkit Fails Without Google Credentials**: Browser toolkit execution fails with "NoneType object is not a mapping" error when Google tool is not selected and credentials are missing.
* [#1986](https://github.com/ProjectAlita/projectalita.github.io/issues/1986) **ADO Attachment Reading Not Available**: Azure DevOps toolkit lacks capability to read attached images from work items.
* [#1869](https://github.com/ProjectAlita/projectalita.github.io/issues/1869) **Zephyr Essential Tools Return 400 Error**: Multiple tools in Zephyr Essential toolkit fail with "400 Client Error: Bad Request" including Create/Update operations for test cases, cycles, and executions.
* [#1746](https://github.com/ProjectAlita/projectalita.github.io/issues/1746) **Jira Attachment Content Limited to JSON/TXT**: Get Attachments Content tool in Jira toolkit does not support common file types (PNG, JPEG, XLSX); only JSON and TXT files are supported.
* [#1547](https://github.com/ProjectAlita/projectalita.github.io/issues/1547) **Jira JQL Search Fails Without Priority Field**: Jira toolkit fails with validation error when searching issues that lack the "priority" field; affects Jira configurations where priority field is disabled.
* [#1371](https://github.com/ProjectAlita/projectalita.github.io/issues/1371) **OpenAPI Toolkit Fails in Pipelines**: OpenAPI Toolkit cannot be used in pipeline function or tool nodes; execution fails with errors.
* [#1163](https://github.com/ProjectAlita/projectalita.github.io/issues/1163) **MCP Only Executes Latest Version**: MCP-tagged resources execute the latest version regardless of which version has the MCP tag; only the latest version is accessible via MCP.
