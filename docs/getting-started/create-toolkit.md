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
      * **Enable Tools:** In the “Tools” section, select only the tools your agent will use for security and clarity.

3. **Save the Toolkit:**
      * Click **Save** to add the toolkit to your dashboard.
      * The new toolkit will now appear in your list of available toolkits.

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
* **Permission errors?**  
     * Make sure you have the necessary permissions to assign toolkits and agents.

!!! note "Reference"
      For advanced details, refer to the [ELITEA documentation](https://elitea.ai/docs)
---

## Summary

By following these steps, you can create a toolkit and assign it to an agent, enabling automated, secure, and powerful interactions with your enterprise tools through ELITEA agents.

---