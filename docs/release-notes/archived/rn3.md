# ELITEA Release Notes

## Introduction

**ELITEA** is an innovative web application that revolutionizes how you interact with prompts. Designed as a dynamic workspace, it empowers users to create, organize, and collaborate on prompts like never before.

## Information

* **Release Version**: 1.1.0
* **Released on**: 31-May-2024
* **Access**: [ELITEA Platform](https://alita.lab.epam.com). **Note**: You need to enable Epam VPN to access ELITEA.
* **User Guide**: [ELITEA - User Guide](../../home/introduction.md)

## New Features

* **Agents Framework**: Introducing a powerful new feature, Agents, which integrates prompts, datasources, and external toolkits into a unified mechanism. This allows for seamless decision-making and action-taking processes, such as searching on Google or creating Jira tickets directly through the ELITEA platform.
* **Toolkits Available for Agents**:
	* **Prompt Toolkit**: Leverage pre-configured prompts from your ELITEA project to ensure consistent and accurate interactions.
	* **Datasource Toolkit**: Access structured data from pre-configured datasources, enhancing the Agent's ability to process and analyze information.
	* **OpenAPI Toolkit**: Integrate with OpenAPI-compliant APIs to expand the Agent's external functionalities and interactions.
	* **Browser Toolkit**: Equip your Agent with search engine capabilities, enabling access to a vast array of online information.
	* **Confluence Toolkit**: Integrate content from Confluence to enrich the Agent's knowledge base and improve response accuracy.
	* **GitHub Toolkit**: Allow your Agent to interact directly with GitHub repositories, enhancing version control and development processes.
	* **GitLab Toolkit**: Enable direct interaction with GitLab repositories, providing specific project data to support informed decisions.
	* **Jira Toolkit**: Manage Jira issues and projects directly from ELITEA, streamlining project management and enhancing productivity.
	* **Agent Toolkit**: Incorporate other pre-configured agents, enabling complex, layered interactions and processes within your projects.
* **Monitoring Enhancements**: Enhanced monitoring capabilities allow users to track usage statistics with selectable metrics and timeframes, providing deeper insights into application performance and usage patterns.

## Changed Features

* **Brand Transition**: Alita has been rebranded to **ELITEA**. This change reflects our commitment to evolving and enhancing the platform's capabilities, aligning with our vision to provide a more elite and refined experience for our users. All references to Alita in the platform, documentation, and related materials have been updated to reflect this new branding.

## Known Issues

* **Database Corruption During Indexing**: There is a risk of database corruption if a user searches in one dataset while another is indexing. **Workaround**: Create a new datasource and reindex the data within it to avoid this issue.
* **Prompt Saving Error**: Prompts cannot be saved if the **Name** field is filled using a copy/paste action that includes leading spaces.
* **Datasources - GIT source Authentication Issue**: Authentication using SSH for Git source type in Datasource fails. **Workaround**: Use the HTTPS option with Username and Password for successful authentication.
* **Agent: Confluence tool - Token Authentication type**: Authentication using Token for Confluence tool in Agents fails. **Workaround**: Use the API key option for successful authentication.

## Fixed Issues

* **Deduplication Enhancements**: Implemented several fixes and improvements to the deduplication functionality, enhancing data integrity and operational efficiency.
* **Delayed File Finder in ELITEA HUB**: Users may experience delays when accessing the file finder in ELITEA HUB.