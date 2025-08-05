# Secrets

## Introduction to Secrets

The **Secrets** feature in ELITEA serves as a secure vault designed to store and manage sensitive information such as passwords, tokens, API keys, and other authentication details. Secrets centralize the management of confidential data, letting you configure them once and reuse them across different components—especially in Credentials and Toolkits—within the platform.

---

## Creating a Secret

To add a new secret to the vault, follow these steps:

1. **Navigate to the Secrets Section:**  
   Go to the sidebar, select **Settings**, and then choose **Secrets**.
2. **Click the `+` icon** to initiate the creation of a new secret.
3. **Enter a descriptive name** for the secret to help you identify its use.
4. **In the Value field,** input the token, password, API key, or any other authentication details.
5. **Save the secret.** Once configured, this secret can be selected and used within various components of ELITEA.

---

## Managing Secrets

Secrets are managed securely via the **Secrets Table**, which displays all your configured secrets:

- **View Secret:** Click the **Eye** icon to reveal the value of a configured secret.
- **Copy Secret:** Click the hidden value to copy the secret to your clipboard.
- **Hide Secret:** Hide the secret value to maintain security.
- **Modify Secret:** Update the value if the credentials change.
- **Delete Secret:** Permanently remove a secret from the vault if it is no longer needed.

> **Tip:** Use descriptive names and review secrets regularly to ensure they are up to date and only accessible to authorized users.

---

## Using Secrets in Credentials

When you create or edit a Credential in ELITEA (for example, for GitHub, Jira, or Azure DevOps), you can reference secrets you've stored in the vault instead of pasting sensitive values directly. This approach improves security and makes it easier to rotate or update secrets.

### How to Use a Secret in a Credential

1. **Create the Secret:** First, create the secret as described above.
2. **Open the Credentials Menu:** Go to Credentials in the main navigation.
3. **Create or Edit a Credential:** Click `+ Create` or open an existing credential.
4. **Select the Relevant Field:** For fields such as "API Key", "Password", or "Token", you will see an option to reference a secret.
5. **Choose the Secret:** Select your stored secret from the dropdown.
6. **Save the Credential:** The credential will now use the referenced secret for authentication.

> **Note:**  For detailed instructions on creating credentials, refer to the  [Create Credentials](credentials.md) document. 

#### Example

For a GitHub credential, you might see fields like:

- Access Token (Secret)
- App Private Key (Secret)
- Password (Secret, optional)

For each of these, you can link an existing secret from your vault rather than entering the raw value.

---

## Secrets in Practice: How It Works

- When a toolkit use a credential referencing a secret, ELITEA retrieves the secret from the vault for authentication.
- Secrets remain encrypted at rest and are never exposed in logs or exported configurations.
- If you update or rotate a secret, all credentials using this secret will use the new value automatically.

---

## Best Practices

- **Never hardcode credentials:** Always store sensitive information as secrets.
- **Use unique secrets** for each integration or system.
- **Rotate secrets regularly** for enhanced security.
- **Audit and delete unused secrets** to minimize exposure.

---

## Troubleshooting

- **Secret Not Available in Dropdown:** Refresh the secrets list or ensure you have permission to access the secret.
- **Authentication Fails:** Double-check that the secret value is correct and up to date.
- **Can’t Edit/Delete Secret:** You may lack permission; contact your system administrator.

For advanced details, refer to the [ELITEA documentation](https://elitea.ai/docs) or your organization's security guidelines.

---

## Summary

The **Secrets** feature provides a centralized, secure, and auditable way to manage sensitive data across ELITEA. By leveraging secrets in your credentials, you increase both the flexibility and security of your integrations, while making updates and rotations seamless.

---