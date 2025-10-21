# ELITEA Release Notes
 
## Introduction
 
Discover **ELITEA** — your all-in-one platform for working with Generative AI and managing data-driven projects. ELITEA goes far beyond a simple repository: it’s a flexible workspace where you can create, organize, and collaborate on prompts, datasources, agents, pipelines, and collections with ease. From building complex workflows to managing AI assistants or connecting external tools, ELITEA gives you everything you need to bring your ideas to life.
 
## Information
 
* **Release Version**: 1.7.1
* **Released on**: 26-Sep-2025
* **Preview Access for 1.7.1**: [Next environment](https://next.elitea.ai)

 
## Important

- **Availability**: Version 1.7.1 is available in the [Next environment](https://next.elitea.ai) only. Nexus will remain on its current version (1.6.0) for now. The **Next** environment contains a full copy of your projects, agents, pipelines, toolkits, and chats migrated from Nexus, plus all 1.7.1 features and updates. Use this safe transition window to review changes, configure new Indexes, set up Credentials, and verify your workflows before Nexus is upgraded.
- **Prompts deprecated**: The **Prompts** entity is deprecated. All existing prompts were converted to Agents. You can create Agents without attaching a Toolkit (a lightweight replacement for Prompts) and use variables with these agents.
- **Datasources deprecated**: The **Datasources** entity is deprecated. Your existing datasources remain available in this release so you can re-index and reconfigure them using the new **Index data** tool available in most Toolkits (e.g., GitHub, Confluence, Bitbucket, ADO Repos, Jira, etc.),  as even though they remain connected to agents, they cannot be used (as the datasets themselves are not migrated). **Note**: Creating new datasources or datasets is no longer supported.
- **Integrations replaced by Credentials**: Integrations are deprecated and replaced by Credentials as a standalone entity. Existing Integrations are not auto-migrated; recreate them as **Credentials** manually. See: [How to Use Credentials](../how-tos/how-to-use-credentials.md).
- **Toolkits separated**: Toolkits are now a standalone entity under the Toolkits menu. Agents and Pipelines that previously had connected toolkits still keep those links; you can also reuse Toolkits across multiple entities. See: [How to create a toolkit](../getting-started/create-toolkit.md).
- **Temporary limitations (Next environment)**: Exporting agents/pipelines from Nexus and importing them into Next is not supported due to compatibility differences. **Forking** functionality may not work fully in **Next**. Both will be redesigned and enhanced in the upcoming release.
- **Shared LLM models (Next environment)**: The LLM models provided in **Next** are shared and intended for evaluation only and have daily limits. For any production workload, request your own EPAM AI DIAL keys and configure them in Settings → [AI Configuration](../menus/settings/ai-configuration.md). For a quick walkthrough, see the: [How to configure and use Epam AI Dial keys](../getting-started/create-credential.md).

!!! Reference
    For a short walkthrough of working in the **Next** environment, see the [Next - Quick Start Guide](../getting-started/next-quick-start.md).

## New Features
 
 
### Canvas: Toolkit and MCP Server Editing Support

* Modify the selected toolkit or MCP server directly from a conversation via Canvas without leaving Chat.
* Edit any selected version of a toolkit or MCP server.
* From Canvas, add toolkits, agents, pipelines, or MCP servers to the selected entity.

For usage details, see [Canvas in Conversation](../getting-started/canvas-in-conversation.md).

### Canvas: Create Agent from Chat

* Create a new agent directly from a conversation using Canvas, without leaving Chat.
* Configure the agent’s basic details and attach toolkits during creation.
* Start using the newly created agent immediately within the same conversation.


### Settings: Default LLM Model (Project-wide)

You can now set a project-wide default LLM model from **Settings → [AI Configuration](../menus/settings/ai-configuration.md)**. The selected model becomes the default used across your project for:

* Conversations
* Agents
* Pipelines
* Toolkits

This helps standardize execution behavior and reduces per-entity setup.

### Agents Enhancements

* Agent types have been deprecated.
* **Toolkits** section enhancements for Agents/Pipelines:
  * +**MCP** button: Click to select from all available MCP servers or create a new MCP server.


### Pipelines: Node Enhancements

The following enhancements improve flexibility and control when building pipelines:

* **LLM node enhancements**: You can now select and use Toolkits directly from the LLM node.
* **Function node changes**: The Function node now only allows selecting Toolkits and MCP Servers as toolkits, ensuring clearer, safer execution contexts.
* **Agent node enhancements**: Added Input Mapping and variable support for Agents used inside the Agent node, enabling more precise data flow and configuration.
* **Other fixes and improvements**: General stability, performance, and UX improvements across the pipeline builder.

### Memory Toolkit Integration

A new Memory toolkit is now available, bringing long-term, persistent memory to your agents powered by PostgreSQL + PgVector and the langmem library.

* **Persistent context retention**: Store and recall information across conversations and sessions for continuity.
* **Semantic memory search**: Retrieve relevant memories using meaning-based search over vectorized data.
* **Namespace-based organization**: Isolate or share memories by namespace across agents or chat threads.
* **Works across ELITEA**: Use in Agents, Pipelines, and Conversations.

For setup and usage details, see the [Memory Toolkit Guide](../integrations/toolkits/memory_toolkit.md).

  
## Changed Features
 
### Save and Update Any Version of Agents or Pipelines

Previously, you could only save changes to the "**latest**" version of an Agent or Pipeline. Now, the **Save** action is available for any already created version, allowing you to continuously refine and update that version without having to create additional versions.

* Save edits on any existing version (not only the ""**latest**").
* Reduce version sprawl by updating established versions directly.
* Applies to both Agents and Pipelines.


 
## Fixed Issues
 
* **MCP Servers as Toolkits in LLM/Function Nodes**: Fixed an issue preventing MCP Servers from being added as toolkits to the LLM and Function nodes and used within pipelines.
* **Participants Selection in Conversation**: Fixed an issue where you couldn’t search and select an agent, pipeline, or toolkit from +Agent / +Pipeline / +Toolkit when the list required scrolling in the Participants section of the Conversation.
* **Confluence Space-Wide Indexing**: Fixed the inability to index an entire Confluence space using the Index Data tool.
* **SharePoint Index Data Execution**: Fixed failures when running the Index Data tool in the SharePoint toolkit.
* **Stepback Index Tools for Confluence and Artifacts**: Fixed Stepback Summary Index and Stepback Search Index tools not working for Confluence and Artifacts toolkits.
* **Pipeline Configuration Run Button**: Fixed an issue where the “Run” button was not visible when opening the Pipeline Configuration tab.
* **GPT-5/GPT-5 Mini Execution Errors**: Fixed errors when executing GPT-5 and GPT-5 Mini models from agents due to unsupported temperature and top-p values.
* **OpenAPI Toolkit Tool Execution**: Fixed the inability to execute tools from the OpenAPI toolkit.
 
 
## Known Issues
 
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
