# ELITEA Release Notes
 
## Introduction
 
Discover **ELITEA** — your all-in-one platform for working with Generative AI and managing data-driven projects. ELITEA goes far beyond a simple repository: it’s a flexible workspace where you can create, organize, and collaborate on prompts, datasources, agents, pipelines, and collections with ease. From building complex workflows to managing AI assistants or connecting external tools, ELITEA gives you everything you need to bring your ideas to life.
 
## Information
 
* **Release Version**: 1.7.0
* **Released on**: 31-Aug-2025
* **Preview Access**: [For checking new features and changes](https://next.elitea.ai)
* **Access**: [ELITEA Platform](https://nexus.elitea.ai)
 
## New Features
 
### Chat Redesign and Enhancements
 
* Complete redesign of the Chat menu for a more intuitive and modern experience
* Quickly select frequently used entities (agents, pipelines) at the start of a conversation or during an active chat
* Instantly search and select any entity (agents, pipelines) by typing `#` followed by the first letters of the entity name
* Drag & drop support for moving conversations between the ungrouped list and folders, and vice versa
* Automatic grouping and sorting of conversations into date-based groups (Today, Yesterday, This Week, Older)
* Redesigned workflow for adding users to a conversation from the Participants sidebar
* Redesigned Conversations sidebar for improved navigation
* Redesigned Participants sidebar for better user management
 
### Complete Redesign and Enhancement for Thinking Steps
 
* Redesigned and enhanced Thinking Steps for agents, pipelines, and LLM model execution—both in Conversations and within Entities
* More informative step-by-step details, including which tools and LLMs participated, with their input and output data, for improved troubleshooting and debugging
* Thinking Steps are now preserved in Conversations for agents and pipelines, allowing later analysis and investigation
* Added support to display the duration of each agent and pipeline execution, giving users deeper insight into performance

### New Entity Type: Toolkits

Toolkits have been completely redesigned and are now a dedicated entity type in ELITEA, bringing major improvements to how you organize and reuse toolkits with Agents and Pipelines:

* A new Toolkits menu lets you view and manage all your created toolkits in one place.
* Creating a toolkit is now a streamlined process: simply choose the toolkit type, then configure it with an improved, user-friendly interface.
* You can now reuse the same toolkit across multiple agents and pipelines, eliminating the need to configure the same integration or logic repeatedly. This leads to better organization, consistency, and efficiency in your projects.
* When building or editing an agent or pipeline, you can either create a new toolkit (which will take you to the New Toolkit page) or select from your existing toolkit library.
* Note: When you add other agents or pipelines as components within an agent or pipeline, they are now also tracked and managed as toolkits, providing unified visibility and control.

### Pipelines: New Router and State Modifier Nodes
 
Two powerful new nodes have been added to Pipelines, expanding your pipelines capabilities:

* **Router** node: A simple, rule-based decision node. The Router node evaluates a condition using your current state or data, then selects one of several possible routes (branches) for the pipeline to follow. This enables dynamic, conditional logic within your automation flows.
* **State Modifier** node: A utility node that updates, transforms, or cleans up parts of the workflow’s state. Think of it as a “state editor”—you can use it to modify one or multiple variables, generate new content using templates, or reset portions of the state as needed.

### Postman Toolkit Integration

A new Postman toolkit is now available, enabling seamless integration between ELITEA and the Postman. With this toolkit, you can:

* **Automate API Testing**: Run and manage your Postman collections directly from ELITEA agents and pipelines.
* **Retrieve and Update Collections**: Access, duplicate, or update your Postman collections and requests as part of your automated workflows.
* **Leverage Postman Environments**: Use environment variables and configurations to make your API tests more dynamic and flexible.

For setup and usage details, see the [Postman Toolkit Guide](../integrations/toolkits/postman_toolkit.md).

### Zephyr Squad Toolkit Integration

A new Zephyr Squad toolkit is now available, allowing you to connect ELITEA with Zephyr Squad for advanced test management. With this toolkit, you can:

* **Manage Test Cases**: Create, update, and organize test cases within Zephyr Squad directly from ELITEA.
* **Automate Test Execution**: Trigger and track test executions as part of your automated workflows.
* **Synchronize Results**: Seamlessly sync test results and statuses between ELITEA and Zephyr Squad.

This integration helps unify your test management and automation processes, making it easier to maintain quality and traceability across your projects.

### Copy to Clipboard for Raw JSON View in Toolkits
 
A new **Copy to Clipboard** icon has been added to the Raw JSON View for Toolkits. This makes it quick and easy to copy the entire JSON configuration of any toolkit for sharing, backup, or advanced editing purposes.
  
## Changed Features
 
### Credentials: Formerly Integrations
 
* The feature previously known as "Integrations" has been renamed to Credentials and is now a dedicated service in ELITEA.
* Credentials allow you to configure authentication for different services at both the private (user) and project levels, supporting secure and flexible access management.
* All functionality previously available under Integrations remains, but is now managed from the new Settings → Credentials page for easier access and organization.
* Credentials can be reused across agents, pipelines, and toolkits, just as before.
* Added support for new services, including ServiceNow, Postman, ADO Plans, ADO Repos, and Bitbucket, expanding the range of integrations you can securely manage.
* This change improves clarity, centralizes credential management, and makes it easier to maintain secure connections to all your external tools.
 
### Artifacts: Complete Redesign and Enhancements
 
* The Artifacts menu has been completely redesigned for a more intuitive and efficient experience.
* The Buckets table has been enhanced for better organization and usability.
* New Preview File support allows you to view and review files and images directly within ELITEA, without needing to download them first.
* A new Buckets sidebar provides quick navigation between different storage buckets.
* You can now manually upload files from your PC directly into ELITEA.
* Added the ability to select and download multiple files at once for greater convenience.

 
## Fixed Issues
 
* **SQL Toolkit in Pipelines**: Fixed an issue where the SQL toolkit could not be used in pipelines. Previously, when using tools like list_tables_and_columns or execute_sql in a pipeline, the answer would appear in the steps but no LLM response was provided. Now, the LLM response containing the answer is correctly returned.
* **Pressing Enter to Save a Secret Also Inserts a Newline in the Value**: Fixed an issue where pressing the "Enter" key to save a secret would also insert a newline character into the value. Now, pressing Enter saves the secret without adding a newline.
* **Message Regenerate Function Fails After Agent or Pipeline Configuration Change**: Fixed a bug where the message regenerate function would fail with a 400 bad request error after making changes to an agent or pipeline configuration. Now, regenerating a message works as expected and reflects the updated configuration.
* **Monitoring Export Fails When No Token Usage**: Fixed an issue where exporting monitoring data would fail with a 400 error if there was no token usage for the selected project or timeframe. Now, an empty file is downloaded as expected.
* **Copy Secret Functionality Not Working on Safari Browser**: Fixed an issue where the "Copy Secret" feature in the Secrets table did not work on Safari browsers due to Clipboard API limitations. Now, copying secrets works in following way, Show value of the secret then click the Copy to clipboard icon.
* **Existing GitHub Toolkits Not Functioning**: After a recent update, existing GitHub toolkits may not function properly when editing or executing agents. Workaround: Delete the toolkit, add it again, configure it with the same settings, and save the agent.
* **General Usability Improvements**: Various general fixes and enhancements have been implemented across the platform to improve overall usability, responsiveness, and user experience.
 
 
## Known Issues
 
* **GIT Source Authentication**: SSH authentication for GIT sources fails. **Workaround**: Use HTTPS with Username and Password.
* **Collections Import**: After importing Collections, new collections are not being created under the Collections section.
* **Test Connection**: The test connection functionality for the toolkit is currently experiencing issues and may not operate correctly.
  **Confluence Dataset Label Filtering**: When using multiple labels (two or more) as a filter while creating a dataset of Confluence type, an error occurs. The system raises an `ApiValueError`, indicating that the CQL (Confluence Query Language) is invalid or missing. **Workaround**: Use a single label as a filter to avoid this issue.
