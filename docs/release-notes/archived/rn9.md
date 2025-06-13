# ELITEA Release Notes

## Introduction

Discover **ELITEA** — your all-in-one platform for working with Generative AI and managing data-driven projects. ELITEA goes far beyond a simple repository: it’s a flexible workspace where you can create, organize, and collaborate on prompts, datasources, agents, pipelines, and collections with ease. From building complex workflows to managing AI assistants or connecting external tools, ELITEA gives you everything you need to bring your ideas to life.

## Information

* **Release Version**: 1.5.2
* **Released on**: 14-May-2025
* **Access**: [ELITEA Platform](https://nexus.elitea.ai)

## New Features

### Model Context Protocol (MCP) Support

ELITEA now supports the Model Context Protocol (MCP), enabling seamless integration with your development environments! Connect your VS Code directly to ELITEA agents through GitHub Copilot Chat with two options:

* **[SSE Transport](https://elitea.ai/docs/how-tos/mcp-server/)**: One-way, web-based communication ideal for receiving real-time updates
* **[STDIO Transport](https://elitea.ai/docs/how-tos/mcp-server-stdio/)**: Two-way communication perfect for local development workflows

This integration lets you use ELITEA agents directly from your IDE, enhancing productivity by bringing AI-powered assistance right into your development workflow. Configure at workspace or user level and let GitHub Copilot automatically suggest and invoke your ELITEA tools.

## Changed Features

No changes in this release.

## Fixed Issues

* **GitHub Toolkit Branch Values**: Fixed an issue where changing the active branch in a GitHub toolkit would incorrectly change the main branch value to match the active branch.
* **Jira Toolkit Name Display**: Fixed a bug where using a **Private** Jira configuration in a different project would cause the toolkit name to display as 'None' after saving the agent.
* **Create PR Change Comment Tool**: Fixed a bug where the tool incorrectly expected PR numbers as strings instead of integers, causing execution errors.
* **Salesforce Toolkit Error**: Resolved an issue where Salesforce toolkit operations would fail with "'SecretStr' object is not iterable" error, ensuring proper execution of Salesforce tools.
* **Bitbucket Default Branch**: Fixed a bug where the Bitbucket toolkit would ignore the default branch specified in configurations, requiring users to provide the branch in instructions.
* **"Add to Collection" Option Missing in Table View for Public Projects**: When working within a Public project, users currently can add entities (e.g., Prompts) to a Collection only from the Detailed (List) View. If the user switches to the Cards View and selects a Prompt to view its details, the "Add to Collection" option icon is not displayed.
* **General Usability Improvements**: Various general fixes and enhancements have been implemented across the platform to improve overall usability, responsiveness, and user experience.

## Known Issues

* **Existing GitHub Toolkits Not Functioning**: After a recent update, existing GitHub toolkits may not function properly when editing or executing agents. **Workaround**: Delete the toolkit, add it again, configure it with the same settings, and save the agent.
* **Chat Messages to Other Users**: When sending a message to an invited user in a conversation, the system may get stuck on "Assistant to Message" with an endless Thinking state. This issue will be fixed in an upcoming release.
* **GIT Source Authentication**: SSH authentication for GIT sources fails. **Workaround**: Use HTTPS with Username and Password.
* **Collections Import**: After importing Collections, new collections are not being created under the Collections section.
* **Test Connection**: The test connection functionality for the toolkit is currently experiencing issues and may not operate correctly.
  **Confluence Dataset Label Filtering**: When using multiple labels (two or more) as a filter while creating a dataset of Confluence type, an error occurs. The system raises an `ApiValueError`, indicating that the CQL (Confluence Query Language) is invalid or missing. **Workaround**: Use a single label as a filter to avoid this issue.
 