# Create a Toolkit and Add It to an Agent

## Introduction

Toolkits in ELITEA are the building blocks that empower your agents to interact with external systems like GitHub, Jira, Azure DevOps, and more. Assigning toolkits to agents enables them to perform automated actions, retrieve data, and streamline workflows across your enterprise tools.

---

## Step 1: Create a Toolkit

1. **Navigate to the Toolkits Menu:**
      * Open the sidebar and select **Toolkits**.

2. **Create a New Toolkit:**
      * Click the **`+ Create`** button located at the top of the sidebar.
      * In the New Toolkit page, select the **Toolkit Type** (e.g., GitHub, Jira, Slack).
      * Fill in required details:
        * **Name:** Give your toolkit a clear, descriptive name.
        * **Description:** Optionally, add a short description for clarity.
      * **Configure Credentials or Settings:**
        * In the CONFIGURATION section, select a credential from the “Credentials” dropdown, or create a new one if necessary.
        * Fill out any additional configuration fields as prompted (such as API endpoints, project keys, etc.).
      * **Configure Advanced Options (Optional):**
        * **PgVector Configuration:** Many toolkits now support vector database integration through PgVector. If available, select or configure a PgVector connection from the configuration dropdown to enable vector storage capabilities for document indexing and similarity search.
        * **Embedding Model:** For toolkits that support text processing and semantic search, select an appropriate embedding model configuration from the dropdown. This enables the toolkit to process and understand text content for advanced search and analysis features.
3. **Save the Toolkit:**
      * Click **Save** to add the toolkit to your dashboard.
      * The new toolkit will now appear in your list of available toolkits.
4. **Enable Tools:** 
     * Open the newly created toolkit.
     * Configure which specific tools are enabled for this toolkit. In the "Tools" section, check only the tools your agent will use. Enabling only necessary tools improves security (principle of least privilege) and optimizes performance.      

!!! note "Reference"
      For detailed instructions on creating credentials, refer to the [Create Credentials](../menus/credentials.md) document.
---

## Step 2: Add the Toolkit to an Agent

To integrate Slack or any other toolkit, you'll need to configure it within an ELITEA Agent. You can either create a new Agent or modify an existing one.

1. **Navigate to the Agents Menu:**
      * Open the sidebar and select **Agents**.

2. **Create or Edit Agent:**
      * **New Agent:** Click **"+ Create"** to create a new Agent. Define Agent details like name, description, instructions, and save it.
      * **Existing Agent:** Select the Agent you want to integrate with a toolkit and click on it to edit.

3. **Access Toolkits Section:** In the Agent configuration, scroll down to the **"Toolkits"** section.

4. **Add Toolkit:**  
      * In the "Toolkits" section, click the **"+ Toolkit"** button.
      * You can select an *already created toolkit* from the list and save the agent, or click **"Create new"** to be redirected to the new toolkit creation page.

5. **Save the Agent:**
      * Click **Save** to finalize your changes.
      * Your agent is now equipped with the selected toolkit(s) and can interact with the connected services.

---

## Best Practices

* **Assign only necessary toolkits** to each agent for the principle of least privilege.
* **Name agents and toolkits descriptively** so their roles and integrations are clear.
* **Test toolkits** before assigning to agents to ensure proper configuration.

---

## Troubleshooting

* **Toolkit not appearing in agent dropdown?**  
     * Ensure the toolkit was created and saved successfully.
* **Agent actions failing?**  
     * Double-check toolkit credentials and configuration, and ensure the agent has the correct toolkits assigned.
     * Verify that the required tools are enabled in the toolkit's tool selection.
* **PgVector or Embedding Model options not available?**
     * Ensure your toolkit type supports these advanced features (available in document/content processing toolkits).
     * Verify that PgVector database and embedding model configurations are set up in your project's AI Configuration.
* **Permission errors?**  
     * Make sure you have the necessary permissions to assign toolkits and agents.

!!! note "Reference"
      For advanced details, refer to the [ELITEA documentation](https://elitea.ai/docs)
---

## Summary

By following these steps, you can create a toolkit and assign it to an agent, enabling automated, secure, and powerful interactions with your enterprise tools through ELITEA agents.

---

!!! info "Additional Resources"
    
    * **[Glossary](../home/glossary.md)** — Definitions of common terms used across the platform
    * **[Toolkits](../menus/toolkits.md)** — Complete guide to the Toolkits menu interface and advanced configuration options
    * **[Agents](../menus/agents.md)** — Configure agents and assign toolkits to enable automated workflows
    * **[Credentials](../menus/credentials.md)** — Learn how to create and manage credentials used by toolkits
    