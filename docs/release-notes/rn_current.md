# ELITEA Release Notes

## Introduction

**ELITEA** is an innovative web application that revolutionizes how you interact with prompts. Designed as a dynamic workspace, it empowers users to create, organize, and collaborate on prompts like never before.

## Information

* **Release Version**: 1.3.0
* **Released on**: 16-Sep-2024
* **Access**: [ELITEA Platform](https://alita.lab.epam.com). **Note**: You need to enable Epam VPN to access ELITEA.
* **User Guide**: [ELITEA - User Guide](../user-guide/intro.md) 

## New Features

* **New Navigation Flow**: Completely redesigned navigation flow within ELITEA HUB. Access prompts, datasources, agents, and collections through dedicated menus. A new Project Selection dropdown list has been added next to your avatar for easy switching between public and private projects. The 'My Libraries' menu has been completely removed.
* **Light Theme**: A new light theme has been added for users who prefer bright and vivid colors. Quickly switch between dark and light themes from the Settings menu.
* **Preloaded LLM Models**: Deploy, select, and use locally loaded LLM models to speed up output generation and allow simultaneous calls to LLM models.
* **Secrets**: Introducing a secure vault for setting up passwords, tokens, and other authentication options within ELITEA HUB. Configure secrets once and use them across various components like Agent's toolkits.
* **Notifications**: New notification functionality to alert users about various events such as prompt publishing status within the ELITEA Hub.
* **ELITEA Extensions**: Updated versions of Alita Chat and Alita Chat Code for VSCode and IntelliJ IDEs. These versions support prompt versioning and variables, allowing selection of versions and variable values. Enhanced design for Alita Code in VSCode IDE and improved settings management for Alita Code plugin in IntelliJ IDE. Option to download pre-generated settings for Alita Code from **ELITEA Hub** → **Configurations** page.
* **Pgvector Storage**: Added Pgvector storage type for datasources, enhancing indexing, saving, and querying of data.
* **New Agent Types**: Introduced new agent types including OpenAI, Llama, and Autogen. Enhanced performance and stability of ReAct and Alita agent types.
* **Bitbucket Toolkit for Agents**: Allow your Agent to interact directly with Bitbucket repositories, enhancing version control and development processes.
* **TesTrail Toolkit for Agents**: Allow your Agent to interact directly with TestRail test management tool.
* **New tools for Confluence Toolkit**: Added `Create page`, `Create pages`, `Delete page`, `Update page by id`, `Update page bt title`, `Update labels`, `Update pages`, `Site search`, `Search by title`, `Get page tree` and `Read page by id` tools.
* **Export Datasource**: New functionality to export datasource instructions, conversation starters, welcome messages, and settings. **Note**: Datasets within the datasource will not be exported for security reasons.
* **Welcome Message**: Added a welcome message feature for prompts, datasources, and agents, providing additional context. Currently, the welcome message is sent to LLM along with other instructions. Future updates will allow users to configure the delivery of welcome messages.
* **Conversation Starter**: Added a feature for prompts and datasources to configure and initiate conversations with predefined questions, queries, or information.

## Changed Features

* **Chat Functionality**: Completely redesigned and improved **Chat** functionality. Enhanced ability to search and add various participants easily. Fixes implemented for synchronization and speed issues. Now supports agent and prompt versions, as well as prompts with variables.
* **Monitoring**: Completely redesigned and enhanced Monitoring functionality. Now supports grouping projects and improved visualization with better charts and graphics.
* **Projects**: Redesigned the Settings→Users page to a Projects page, allowing project admins to add new users to projects. Also supports creating/selecting groups for monitoring functionality.

## Known Issues

* **Confluence Source Filtering**: Issues with filtering by Space key and Page IDs. **Workaround**: Use the filtering by **label** option.
* **Database Corruption During Indexing**: Risk of database corruption if simultaneous actions occur in different datasets for Chroma storage type. **Workaround**: Create a new datasource and reindex, or use Pgvector storage type when creating a datasource.
* **GIT Source Authentication**: SSH authentication for GIT sources fails. **Workaround**: Use HTTPS with Username and Password.

## Fixed Issues

* **Prompt Saving Error**: Fixed issues with saving prompts if the **Name** field contains leading spaces from copy/paste actions.
* **GitLab Toolkit - Set Active Branch Tool**: Resolved an issue where the 'Set Active Branch' tool was not functioning properly. Users can now successfully set the active branch in GitLab without encountering errors.
* **Typo in Error Message When Selecting 'Update File' from GitLab Tool**: Resolved an issue where a typo in the error message appeared when selecting the 'Update file' option from the GitLab tool.
* **Agents Disappear on Scroll and Incorrect Message Displayed**: Fixed an issue where agents disappeared from the page when scrolling, and an incorrect message was displayed. A page refresh was required to bring the agents back.
* **User Search Crash in Settings**: Resolved an issue where attempting to search for a user via the Teammates 'search box' in Settings→Projects→Users caused the UI to crash. The search functionality now operates smoothly without causing disruptions.
* **Date Selection Crash in Monitoring Settings**: Fixed a problem where selecting an incorrect date in the date fields on the Settings→Monitoring page caused the UI to crash. Proper error handling and date validation have been implemented to ensure stability and prevent crashes.