# Create a Personal Access Token

## Introduction to Personal Access Tokens

Personal access tokens are secure "credentials" used to authenticate yourself and your applications to ELITEA’s backend services. These tokens act as your digital signature, granting your scripts, extensions, or integrations permission to perform actions on your behalf. Treat your tokens with the same level of security as your password—never share them publicly or expose them in code repositories.

---

## Step 1: Creating a Personal Access Token

To generate a new personal access token in ELITEA:

1. **Navigate to the Personal tokens Page:**
      * Open the sidebar, select **Settings**, then choose **Personal tokens**.

!!! tip "Tip"
      Use the project dropdown at the top to switch between projects and manage project-specific tokens or settings.

1. **Create a New Token:**
      * Click the **`+` icon** to create a new token.

2. **Complete the Token Details:**
      * Enter a **name** for your token to help you identify its purpose.
      * Set an **expiration date** to automatically revoke the token after a given period.
      * Click **Generate** to create the token.

3. **Copy and Store Your Token:**

!!! warning "Important"
      Once the token is generated, copy it immediately and store it securely. The token value will not be displayed again after you close the pop-up window.

---

## Step 2: Using a Personal Access Token

Personal access tokens are used to authorize API calls, extensions, or scripts. Here’s how you can use your token with ELITEA’s integrations:

1. **Select Integration Option:**
      * From the **Integration Option** dropdown, select the desired LLM model or backend integration (e.g., gpt-4, gpt-4o, etc.).

2. **Download Configuration for Extensions:**
      * Once you have selected the integration, the **Download VS Code Settings** and **Download Jetbrains Settings** icons will appear next to your token.
      * Click these icons to download ready-to-use configuration files for integrating ELITEA with the Alita Code extension in VSCode or JetBrains IDEs.

3. **Configure Your Environment:**
      * Follow the [Elitea Code Documentation](../integrations/extensions/elitea-code.md) for detailed instructions on adding your personal access token to your development environment.

---

## Best Practices

* **Keep tokens confidential:** Never share your token or check it into version control.
* **Use descriptive names:** Name your tokens according to their intended use (e.g., “VSCode Integration”).
* **Set expiration dates:** Regularly rotate tokens and set appropriate expiration.
* **Revoke unused tokens:** Delete tokens that are no longer needed.
* **Use project-specific tokens:** If you work across multiple projects, generate separate tokens for each project context.

---

## Troubleshooting

* **Token not working?** Ensure you are using the correct project configuration and the token has not expired or been revoked.
* **Lost token?** If you didn’t copy your token, delete it and generate a new one.
* **Integration setup issues?** Refer to the [Elitea Code Documentation](../integrations/extensions/elitea-code.md) or contact your administrator.

---

## Summary

Personal access tokens are your gateway to programmatic and extension-based access to ELITEA’s features. By following this guide, you can securely generate, manage, and use tokens to unlock seamless integrations tailored to your workflow.

---