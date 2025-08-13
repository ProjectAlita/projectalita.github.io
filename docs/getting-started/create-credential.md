# Create a Credential and Add It to a Toolkit

## Introduction

Integrating external services with ELITEA requires secure authentication and configuration. This is achieved by creating **Credentials** (for API keys, tokens, or login information) and connecting them to a **Toolkit** (an integration module, such as GitHub, Jira, or Azure DevOps).

---

## Step 1: Create a Credential

1. **Navigate to the Credentials Menu:**
      * Open the sidebar and select **Credentials**.

2. **Create a New Credential:**
      * Click the **`+ Create`** button.
      * In the "New Credentials" page, select the **Credential Type** (e.g., GitHub, Jira, Azure DevOps).
      * Fill in the required fields (such as API key, username, password, or select a secret from your vault).
      * Give the credential a clear, descriptive **name**.
3. **Save the Credential:**
      * Click **Save** to add the credential to your Credentials dashboard.
      * Your new credential will now be available for use when configuring toolkits.

!!! note "Reference"
      For detailed field requirements per toolkit (e.g., GitHub, Jira, Azure DevOps), review the toolkit-specific documentation. If a field expects a stored secret, ensure the secret is created before assigning it here. For broader guidance, see the [ELITEA documentation](https://elitea.ai/docs).

---

## Step 2: Add the Credential to a Toolkit

1. **Navigate to the Toolkits Menu:**
      * Open the sidebar and select **Toolkits**.

2. **Create or Edit a Toolkit:**
      * To add a new integration, click **`+ Create`** on the sidebar
      * To update an existing toolkit, click on it in the list to open its details.

3. **Configure Toolkit Details:**
      * Select the desired **Toolkit Type** (e.g., GitHub, Jira, Slack).
      * Enter required details (name, description, configuration options).

4. **Assign the Credential:**
      * In the CONFIGURATION section, open the “Credentials” dropdown menu.
      * Select the credential you created earlier from the list.
      * (If needed, use “New private credentials” or “New project credentials” to create and assign a new credential on the fly.)

5. **Save the Toolkit:**
      * Click **Save** to finalize your changes.
      * The toolkit will now use your credential to connect to the external service.

---

## Best Practices

* **Use descriptive names** for both credentials and toolkits so you can easily identify their purpose.
* **Store sensitive information as secrets** and reference them in your credentials for enhanced security.
* **Test connection** after adding a credential to ensure the integration works as expected.
* **Rotate credentials** and secrets regularly, and remove unused ones.

---

## Troubleshooting

* **Credential not appearing in toolkit dropdown?**
  * Make sure it was saved successfully and you have the correct project/scope selected.
* **Toolkit connection fails?**
  * Double-check the credential details (API key, token, permissions, etc.).
* **Unable to save toolkit?**
  * Ensure all required fields are filled out and you have the necessary permissions.
  
!!! note "Reference"
      For advanced details, refer to the [ELITEA documentation](https://elitea.ai/docs)

---

## Summary

By following these steps, you can securely create a credential and connect it to a toolkit, unlocking seamless integration with external services in ELITEA. This enables your agents and workflows to operate securely and efficiently.

---