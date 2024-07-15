# ELITEA Release Notes

## Introduction

**ELITEA** is an innovative web application that revolutionizes how you interact with prompts. Designed as a dynamic workspace, it empowers users to create, organize, and collaborate on prompts like never before.

## Information

* **Release Version**: 1.2.1
* **Released on**: 15-July-2024
* **Access**: [ELITEA Platform](https://alita.lab.epam.com). **Note**: You need to enable Epam VPN to access ELITEA.
* **User Guide**: [ELITEA - User Guide](../user-guide/intro.md) 

## New Features

* **Chat Functionality**: Introducing a comprehensive Chat feature that integrates all ELITEA functionalities into a single, cohesive environment for optimal output and collaboration:
    * **Public and Private Conversations**: Engage openly with project members or conduct private discussions visible only to selected users.
    * **Participants**: Enrich conversations by adding diverse participants such as users, prompts, data sources, agents, and language models.
    * **Interactions**: Seamlessly interact with participants, copy responses, and utilize generated content effectively.
    * **Conversation Management**: Organize your chats by saving, pinning, altering privacy settings, deleting, clearing, or exporting conversation contexts.
    * **Playback Feature**: Navigate through conversation history with playback controls, allowing you to review without active model engagement.
* **Artifact Toolkit for Agents**: A new toolkit that enables agents to save their generated outputs directly as files, enhancing data management and retrieval.
* **Jira Toolkit Enhancements**: Introduce a tool to adjust the status of Jira issues directly, streamlining project management tasks.
* **Browser Toolkit Extensions**:
    * **Single URL Crawler**: This tool is designed to crawl data from a specific web page within the Agent's context, making it ideal for targeted data extraction tasks.
    * **Multi URL Crawler**: Use this tool to crawl data from multiple specified web pages within the Agent's context. It is suitable for broader data gathering operations across various sources.
    * **Get HTML Content**: This tool allows you to retrieve the HTML content of a specified web page within the Agent's context, providing direct access to the page's structural data.
* **Alita Agent Type**: A new agent type that combines the strengths of OpenAI's and Langchain's ReAct approaches for complex, open-ended scenarios. This agent maintains chat history, improving its performance in prolonged interactions.

## Changed Features

* **Confluence Toolkit Adjustments**: Removed the **Create Page** and **Page Exists** tools to streamline functionalities.
* **Browser Toolkit Changes**: Removed the **Duckduckgo** search tool.
* **Agent Type Updates**: Declared the **Raw** agent type as obsolete, now reserved for legacy agents only.
* **Datasource Authentication**: Temporarily disabled SSH authentication for GIT sources, recommending HTTPS with Username and Password as an alternative.

## Known Issues

* **Confluence Source Filtering**: Issues with filtering by Space key and Page IDs. **Workaround**: Use the filtering by **label** option.
* **Database Corruption During Indexing**: Risk of database corruption if simultaneous actions occur in different datasets. **Workaround**: Create a new datasource and reindex.
* **Prompt Saving Error**: Issues saving prompts if the **Name** field contains leading spaces from copy/paste actions.
* **GIT Source Authentication**: SSH authentication for GIT sources fails. **Workaround**: Use HTTPS with Username and Password.


## Fixed Issues

* **Confluence Tool Authentication**: Resolved an issue with Token authentication; users should now use the API key method.
* **GitLab Toolkit**: Implemented several fixes to enhance functionality.
* **Browser Toolkit**: Added exception handling to operate without a Google CSE ID, ensuring broader accessibility and functionality.
