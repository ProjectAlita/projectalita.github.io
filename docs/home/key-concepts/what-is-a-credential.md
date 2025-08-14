# What is a Credential?

A credential is a secure storage mechanism that holds authentication information needed to connect agents to external services and systems. Think of credentials as digital keys that allow your agents to safely access and interact with third-party platforms on your behalf.

Key characteristics:

- **Secure**: Encrypted storage of sensitive authentication data
- **Reusable**: Multiple agents and toolkits can use the same credential
- **Centralized**: Manage all your service connections from one place

## Credentials in ELITEA

ELITEA Credentials provide a secure way to store and manage authentication information for external services. Each credential contains the necessary tokens, API keys, usernames, passwords, or other authentication data required to establish connections with specific platforms.

What makes ELITEA Credentials powerful:

- **Encrypted Storage**: All sensitive data is encrypted and securely stored
- **Easy Management**: Create, update, and delete credentials from a central location
- **Flexible Authentication**: Support for various authentication methods (API keys, OAuth, basic auth, etc.)
- **Access Control**: Control which agents and users can access specific credentials

Perfect for securely connecting your agents to external services without exposing sensitive authentication information in your workflows.

## Credential Examples

ELITEA supports various types of credentials for different authentication methods. Here are some popular examples:

- **API Key Credentials**: Store API keys for services like GitHub, Jira, or Slack
- **OAuth Credentials**: Manage OAuth tokens for services requiring authorization flows
- **Basic Auth Credentials**: Store username/password combinations for traditional authentication
- **Token-based Credentials**: Handle bearer tokens and other token-based authentication
- **Database Credentials**: Store connection strings and database authentication information

Each credential type is designed to work seamlessly with its corresponding toolkits, ensuring secure and reliable connections. Many more credential types are available in ELITEA to support additional authentication methods and services.

---

!!! info "Reference"
    Ready to manage your credentials? Check out the [Credentials menu](../../menus/credentials.md) to create and manage your service connections.

    For detailed definitions of terms and concepts, please refer to the [ELITEA Glossary](../glossary.md)
