# ELITEA Release Notes
 
## Introduction
 
Discover **ELITEA** — your all-in-one platform for working with Generative AI and managing data-driven projects. ELITEA goes far beyond a simple repository: it’s a flexible workspace where you can create, organize, and collaborate on prompts, datasources, agents, pipelines, and collections with ease. From building complex workflows to managing AI assistants or connecting external tools, ELITEA gives you everything you need to bring your ideas to life.
 
## Information
 
* **Release Version**: 1.6.0
* **Released on**: 13-June-2025
* **Access**: [ELITEA Platform](https://nexus.elitea.ai)
 
## New Features
 
### Canvas: In-Place Editing for Code, Tables, and Diagrams
 
Canvas is now available in ELITEA, providing a seamless way to edit, refine, and work with AI-generated content directly within your conversations. With Canvas, you can:
 
* Instantly edit generated code blocks, tables, and Mermaid diagrams
* Use advanced features like undo/redo, copy to clipboard, and export in multiple formats
* Enjoy syntax highlighting, table import/export, and live diagram previews
 
Canvas is designed to support a wide range of SDLC activities, including requirements documentation, test case management, automation script development, and process visualization. Whether you’re a BA, QA, AQA, or developer, Canvas helps you turn ideas into actionable deliverables—without ever leaving the conversation.
 
For more details and practical examples, see the [Canvas User Guide](../how-tos/canvas.md).
 
### MCP Client Integration: Use Tools from Any MCP Server
 
ELITEA now empowers you to connect with external Model Context Protocol (MCP) servers and use their tools directly within your ELITEA project! With this new capability, you can:
 
* Add tools from other MCP servers to your VS Code and configure them with your ELITEA project
* Seamlessly access and use these external tools alongside your existing ELITEA agents and pipelines
* See new tools from integrated MCP servers appear automatically under your Agents toolkits in the ELITEA platform UI
 
This opens up a world of possibilities for cross-platform collaboration and tool sharing—no matter where your MCP server is hosted. Easily extend your ELITEA project with specialized tools from other teams, organizations, or even your own custom MCP deployments. 

For more details and practical examples, see the [Elitea MCP Client Integration via STDIO](../how-tos/mcp/mcp-client.md).

### Integration Support for GitLab

Enhanced Integration Support for GitLab, allowing users to configure authentication parameters:

* **Private Workspace Configuration**: Each user can set up their own GitLab authentication parameters for personalized access.
* **Project Configuration**: Configure GitLab service accounts for the entire project, enabling centralized management.
* **Personal and Project Configurations**: Added support for both personal and project-level configurations within the GitLab Toolkit and Integration.

### SubGraphs in Pipelines: Modular Workflow Building
 
You can now modularize and scale your complex workflows with SubGraphs in Pipelines! This powerful feature allows you to include an entire Pipeline as a toolkit within another Pipeline, making it easier to break down, reuse, and manage sophisticated automation flows.
 
With SubGraphs, you can:
 
* Build large workflows by composing smaller, reusable Pipelines
* Simplify maintenance and updates by isolating logic into modular units
* Scale your automation by nesting Pipelines as needed
 
This enhancement is perfect for teams looking to streamline development, promote best practices, and keep even the most complex processes organized and maintainable.

### ServiceNow Toolkit Integration

A new **ServiceNow toolkit** is now available, enabling integration between ELITEA and the **ServiceNow** system. With this toolkit, you can:

* **Create Incident**: Quickly open new incidents in ServiceNow directly from ELITEA.
* **Update Incident**: Modify existing incidents without leaving your ELITEA workspace.
* **Get Incidents**: Retrieve and view incident data from ServiceNow for streamlined tracking and reporting.

This integration helps automate IT service management workflows and enhances collaboration between your ELITEA projects and ServiceNow environments.

### PPTX Toolkit Integration

A new **PPTX toolkit** is now available, enabling integration between ELITEA and Microsoft PowerPoint. With this toolkit, you can:

* **Fill Template**: Automatically populate PowerPoint templates with your project data or AI-generated content.
* **Translate Presentation**: Instantly translate entire presentations to different languages for global collaboration.

This toolkit streamlines the creation and localization of PowerPoint presentations directly from your ELITEA workspace.

### Copy to Clipboard for Raw JSON View in Toolkits
 
A new **Copy to Clipboard** icon has been added to the Raw JSON View for Toolkits. This makes it quick and easy to copy the entire JSON configuration of any toolkit for sharing, backup, or advanced editing purposes.
  
## Changed Features
 
### Enhancements for Viewer Role
 
Users with the Viewer role now have expanded capabilities within their "Team" project. In addition to viewing available entities, Viewers can now:
 
* Execute Agents, Prompts, Datasources, and Pipelines
* Create Conversations and Conversation Folders from Chats
* Execute entities directly from Conversations
 
**Note:** The Viewer role does not allow any modification or deletion permissions within the "Team" project.
 
### Monitoring Changes
 
* By default, your "Team" project will be selected to display monitoring data instead of "All" projects.
* The default timeframe (From and To Dates) has been changed from "1 month" to "1 week".
* The default aggregation has been changed from "Week" to "Day".
 
### Toolkit Name and Type Validation Warning
 
A new WARNING-level validation has been introduced for toolkits and tools that share the same name and type within a project. If duplicate toolkits are detected, ELITEA will now highlight these cases to help you avoid accidental duplication and unpredictable results from agents.
 
**Why this matters:** Toolkits with identical names and types may cause confusion, unexpected behavior, or conflicts during execution. Always ensure your toolkits names are unique within their type to maintain clarity and reliability in your workflows.

### Smart Drawer Session Persistence

You can now keep the Smart Drawer collapsed or expanded for the entire session. Your preference is remembered, making navigation more consistent and tailored to your workflow.

### Improved Multi-Tab Navigation

Multi-tab navigation has been enhanced by adding meaningful section names to tab titles. Now, the menu name or entity name where you are currently working is shown in the tab, making it easier to identify and switch between open sections.

### API Request Change for Posting Messages to Chat

The API for posting messages to Chat has been updated for improved simplicity and consistency:

- **Previous behavior:** Users needed to provide the chat ID in the URL and the conversation ID in the body of the POST request.
- **Current behavior:** Users now only need to provide the conversation UID in the URL. The chat ID is no longer required. 

### GitHub Integrations Visibility Change

* **GitHub** Integrations: To make it clearer which connection is being used, GitHub integrations are now displayed as **https://api.github.com** in selection lists. (Previously, it appeared simply as "GitHub.") Only one GitHub integration is allowed per workspace or project, so this change helps you easily identify the integration endpoint. For more details, check [Integrations and Configurations Guide](../feature-guides/core-features/integrations.md).
 
## Fixed Issues
 
* **Chat Messages to Other Users**: When sending a message to an invited user in a conversation, the system may get stuck on "Assistant to Message" with an endless Thinking state.
* **GitLab Toolkit File Listing**: Fixed an issue where the GitLab toolkit would not list files for some repositories.
* **Chat Playback Input Display**: Fixed an issue where user messages were not shown in the input field during playback mode when stepping through messages. Now, as you navigate through playback, the input field correctly displays the corresponding user message.
* **Chat Playback Scrolling**: Resolved a problem where users could not scroll up to view previous messages while in playback mode. You can now freely scroll through the entire chat history during playback.
* **Multi-User Chat Message Visibility**: Fixed an issue where messages sent by other users in a multi-user chat were not displayed. Previously, if a second user sent a message, it would appear empty. Now, all user messages are reliably shown in the chat as expected.
* **ADO Plans 'create_test_suite' Tool Execution**: Fixed an issue where running the 'create_test_suite' tool would fail if parameters were not provided in key-value format. Previously, if parameters were entered as plain text, the agent would fail with an error and eventually stop with the message: "Agent stopped due to max iterations." Now, the tool correctly handles parameter input and prevents unnecessary agent failures.
* **State Parameter Default Values**: Fixed an issue where default values for state variables (state params) in Pipelines were not being saved. 
* **General Usability Improvements**: Various general fixes and enhancements have been implemented across the platform to improve overall usability, responsiveness, and user experience.
 
 
## Known Issues
 
* **Existing GitHub Toolkits Not Functioning**: After a recent update, existing GitHub toolkits may not function properly when editing or executing agents. **Workaround**: Delete the toolkit, add it again, configure it with the same settings, and save the agent.
* **GIT Source Authentication**: SSH authentication for GIT sources fails. **Workaround**: Use HTTPS with Username and Password.
* **Collections Import**: After importing Collections, new collections are not being created under the Collections section.
* **Test Connection**: The test connection functionality for the toolkit is currently experiencing issues and may not operate correctly.
  **Confluence Dataset Label Filtering**: When using multiple labels (two or more) as a filter while creating a dataset of Confluence type, an error occurs. The system raises an `ApiValueError`, indicating that the CQL (Confluence Query Language) is invalid or missing. **Workaround**: Use a single label as a filter to avoid this issue.
