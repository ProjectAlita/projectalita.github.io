# ELITEA Release Notes

## Introduction

**ELITEA** is an innovative web application that revolutionizes how you interact with prompts. Designed as a dynamic workspace, it empowers users to create, organize, and collaborate on prompts like never before.

## Information

* **Release Version**: 1.4.0
* **Released on**: 15-Jan-2025
* **Access**: [ELITEA Platform](https://nexus.elitea.ai)

## New Features

* **Nexus Elitea Environment**: The new [Nexus](https://nexus.elitea.ai) env is available for all Epamers and can be accessed without enabling EPAM's VPN.
* **Agent Pipelines Framework**: This cutting-edge feature allows users to design complex workflows where agents, prompts, tools, and datasources are steps to achieve results. By leveraging a state-of-the-art graph-based approach, users can now craft intricate processes that utilize a wide array of tools and decision-making capabilities, all within a user-friendly environment.  
* **New Toolkits for Agents**: Enhance agent capabilities with the introduction of several powerful new toolkits, each designed to streamline specific aspects of project management, testing, and documentation:
    * **Report Portal**: Integrate with Epam's Report Portal for real-time test reporting and analysis, aggregating test results from various frameworks to provide insightful analytics.
    * **TestIO**: Leverage crowdtesting capabilities with TestIO, allowing agents to manage and deploy test cases to a community of testers for diverse and thorough testing coverage.
    * **ADO Boards**: Enhance project tracking and agile management by interacting with Azure DevOps Boards, managing tasks, backlogs, and sprints directly from ELITEA.
    * **ADO Wiki**: Manage and retrieve project documentation efficiently by accessing and updating Azure DevOps Wikis, facilitating better knowledge sharing.
    * **ADO Plans**: Streamline release and sprint planning within Azure DevOps, managing timelines, iterations, and deliverables effectively.
    * **XRAY Cloud**: Enhance test management and execution by creating, managing, and executing test cases directly in Jira.
    * **QTest**: Organize, track, and execute test cases with robust tools for reporting and analytics to enhance test management.
    * **Zephyr Scale**: Manage large volumes of test cases and cycles in Jira, supporting advanced test planning and metrics.
    * **Rally**: Access Rally’s agile project management features for better alignment, tracking, and execution of agile practices.
    * **GitLab Org**: Enable direct interaction with GitLab Org repositories, providing specific project data to support informed decisions.
    * **Google Places**: Connect to Google using **Find places** and **Find near** tools.
    * **Sonar**: Connect to Sonar Cube and retrieve data using the **Get Sonar data** tool.
    * **SQL**: Connect to Postgres and MySQL databases to execute SQL queries/scripts and display tables and data.
* **Export/Import of Agents and Datasources Configuration**: Facilitate the easy transfer of setup configurations between different environments or projects. **Note**: For security reasons, passwords and actual datasets are excluded from the export/import process.
* **Forking Prompts, Agents, and Datasources**: Introduce the forking feature to transfer Agents, Datasources, and Prompts between projects without needing to export and import the entities. **Note**: For security reasons, passwords and actual datasets are excluded from the forking process.
* **Integrations**: Enable seamless connections with external platforms such as Jira, Confluence, GitHub, and Testrail, enhancing workflow efficiency by allowing centralized management and improved collaboration across different tools.
* **Configurations**: Set up project-specific or personal configurations for Jira, Confluence, GitHub, and Testrail toolkits within the Agent interface, ensuring unique setups based on service URLs for optimal integration management.
* **Magic Prompt Assistant**: Auto-generate new prompts based on user input, enhancing the interactive capabilities of ELITEA.
* **UI Enhancements: Full Screen View**: Enable a Full Screen view for Context, Conversation Starter, and Welcome Message fields for Agents, Prompts, and Datasources.
* **New BDD Loader**: Reduce manual efforts required to update datasources for automation tests, allowing automation QAs to create specific datasources directly from the ELITEA UI.
* **Improved Sorting and Ordering for Projects Dropdown List**: Projects are now sorted in alphanumerical order, with Public and Private workspaces shown at the top of the list.
* **Filtering of Entities by Author within Projects**: Enhance navigation by allowing users to filter entities (prompts, datasources, collections, and agents) by author.
* **Artifacts**: Introduce a new feature allowing the creation of Buckets in ELITEA to save, update (append), read, and delete files using the Artifacts toolkit. Artifacts can be used as temporary file storage.
* **Chat Enhancements**: Add the ability to create grouped (Private) chats by adding users and select and show the history of each conversation with options such as All, Interaction, and Last N Messages.
* **Monitoring Enhancements**:
    * Included **Aggregation** functionality and an **Acceptance Rate** chart.
    * Persist user-selected filters during sessions in **Monitoring** Tabs for entities and the Monitoring page.
    * Introduce a special '**Monitor**' role to provide a more accurate representation of active project users and usage metrics by hiding specific users (e.g., Epam admins and Support Engineers) from the project users list and excluding them from monitoring calculations.
    * Show monitoring data per entity (for each prompt, datasource, and agent).
    * Add new key metrics, **Engagement** and **Acceptance rate**, to provide deeper insights into user interaction and satisfaction:
        * **Engagement**: Measures the percentage of active users out of all users who logged into ELITEA for the selected period.
        * **Acceptance Rate**: Tracks the percentage of interactions where users accepted the generated output by copying, downloading, or saving it.

## Changed Features

* **Entity Redesign**: Complete redesign of Prompts, Datasources, and Agents entities.
* **Collections**: Enhanced capability to add Datasources and Agents to a Collection, improving organizational efficiency.
* **UI Enhancements for Secrets Page**: Improved user interface for managing secrets.
* **Export Prompts and Collections in [DIAL] Format**: This option has been removed.
* **Chat Participants**: Complete redesign of the **Participants** page.
* **Maximum Length Option Renaming**: The Maximum length is renamed to '**Max Completion Tokens**', with an added option to view available remaining tokens using the '**Remaining tokens**' option.
* **Enable Save, Save as Version, and Discard Buttons in Toolkit Setup**: Allow users to save or discard changes without needing to return to the previous screen, reducing confusion and improving efficiency.

## Known Issues

* **GIT Source Authentication**: SSH authentication for GIT sources fails. **Workaround**: Use HTTPS with Username and Password.
* **Collections Import**: After importing Collections, new collections are not being created under the Collections section.
* **Test Connection**: The test connection functionality for the toolkit is currently experiencing issues and may not operate correctly.

## Fixed Issues

* **Confluence Source Filtering**: Resolved issues with filtering by Space key and Page IDs.
* **Error When Stopping Dataset in Running Status**: Fixed error message displayed when stopping the dataset running process.
* **Datasources - Clean Generated Result Button**: Fixed issue where the button was not working in deduplication/list view.
* **Unable to Search and Filter by Tag**: Fixed error message displayed during search and filter by tag.
* **Browser Toolkit: Multi Crawler Tool Fails with Validation Error**: The Multi Crawler tool in the Browser Toolkit fails with a validation error when attempting to execute a user query to gather information from several web pages.
* **Tags Editing Mode on Prompt's Page**: Resolved issue where there was no way to exit from tags editing mode if there weren't any changes, as the Discard button was deactivated.
* **Projects and Users Dropdown Lists on Monitoring Page**: Made sortable in alphanumerical order. Projects should have Private and Public categories at the top, followed by an alphabetical list. Users should be sorted alphabetically.
* **ELITEA Unresponsiveness During Agent Execution**: Fixed issue where ELITEA became unresponsive when executing an agent with several tools and toolkits. If a tool within the toolkits became unresponsive, the entire platform displayed errors. A page refresh was required to navigate back.
* **Renamed ELITEA Agent Display**: Fixed issue where a renamed ELITEA Agent was incorrectly displayed on the Agent View Wizard.
* **Browser Toolkit Tool Selection**: Resolved issue where it was not possible to select any tools other than Google without providing an API Key and CSE ID, which were mandatory regardless of the selected tools.
* **Created Secret Visibility**: Fixed issue where a created secret did not automatically appear in applicable places such as Integrations, Dataset, and Agent's toolkits. A page refresh was required for the secret to become visible.