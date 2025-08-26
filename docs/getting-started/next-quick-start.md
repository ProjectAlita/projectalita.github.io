# Next Environment Quick Start

## Overview

The **Next** environment is a separate preview space for Release 1.7.0. It lets you explore new features safely using a point-in-time snapshot of your [Nexus](https://nexus.elitea.ai) data.

!!! info "Snapshot date and safe window"
	 The **Next** environment contains migrated data from your **Private** and **Team** projects as of Aug-15-2025, plus all 1.7.0 changes. Use this safe period to review updates, reconfigure indexes, set up credentials, and validate flows before Nexus is upgraded.

- **Access Next environment**: [https://next.elitea.ai](https://next.elitea.ai)
- **Release Notes**: [Release 1.7.0](../release-notes/rn_current.md)

## What was migrated from Nexus

Projects and their entities were migrated as a point-in-time copy (**Aug-15-2025**):

- Your **Private** projects
- Your **Team** projects
- **Public** project

Within projects, the following content was included:

- Agents
- Pipelines
- Toolkits that were used by your agents and pipelines
- Chats and conversations
- Collections
- Artifacts
- Secrets
- Personal Access Tokens

## What was migrated as a conversion

- **Prompts** → **Agents**: All prompts were converted to agents. You can now create agents without a toolkit (a lightweight replacement for prompts) and use variables with them.
- **Datasources** → **Temporary Toolkits**: All datasources were temporarily converted to toolkits and remain connected to agents/pipelines where they were previously linked in Nexus.

## What was not migrated

- **Datasets of datasources**: Recreate them using the **Index Data** capability available in supporting toolkits. See the section below: [Index data for a toolkit](#index-data-for-a-toolkit).
- **Integrations**: Recreate them as Credentials and attach to your Toolkits. See: [How to create a credential and attach it to the toolkit](#how-to-create-a-credential-and-attach-it-to-the-toolkit).

## Next steps

1. Create and attach credentials
	- See: [How to create a credential and attach it to the toolkit](#how-to-create-a-credential-and-attach-it-to-the-toolkit)
	- Guides: [Create a Credential](./create-credential.md) · [Create a Toolkit](./create-toolkit.md) · [Use Credentials](../how-tos/how-to-use-credentials.md)
2. Check your Toolkit Configuration
	- Verify tools enabled (e.g., Index data), correct Credential selected, PgVector and Embedding settings; Save, then test from Tool Testing.
	- See: [Check your Toolkit Configuration](#check-your-toolkit-configuration)
3. Check your agents and pipelines
	- Open each, resolve any configuration notices, and run one to confirm it executes.
	- See: [Check your agents and pipelines](#check-your-agents-and-pipelines)
4. Check your conversations
	- Add your agent/pipeline in Chat and send a simple prompt to validate end-to-end.
	- See: [Check your conversations](#check-your-conversations) · [Create a conversation](./create-conversation.md)
5. Index data for a toolkit
	- Use Tool Testing → Index Data to recreate datasets; parameters vary by toolkit.
	- See: [Index data for a toolkit](#index-data-for-a-toolkit) · Example: [Index GitHub data](../how-tos/indexing/index-github-data.md)

---

## How to create a credential and attach it to the toolkit

Keep it simple: create the credential, then assign it inside your toolkit.

1. **Create a credential**: Go to Credentials → + Create → pick type (e.g., GitHub, Jira) → fill fields → Save.
2. **Attach to a toolkit**: Go to Toolkits → create or open a toolkit → in Configuration, choose the Credential you created → Save.

See the detailed guide: [Create a Credential and Add It to a Toolkit](./create-credential.md). For broader concepts, see [Use Credentials](../how-tos/how-to-use-credentials.md).

## Check your Toolkit Configuration

Before using a toolkit (including indexing), verify configuration:

- **Tools**: Ensure the correct tools are enabled/selected for your use case (e.g., Index data, Create a file, Read file, etc.).
- **Credential**: Confirm the right Credential is assigned (private vs project scope as needed).
- **PgVector**: Select/verify PgVector (or your configured vector store) and **Embedding model settings**.
- **Save**: Click Save to persist changes before testing.
- **Test**: Use the **Test Settings** section to run a quick test and confirm the toolkit works.

## Check your agents and pipelines

After toolkits are configured:

- Open your agents and pipelines and confirm all attached toolkits are valid (no error banners or misconfiguration notices).
- Resolve any missing credentials or required fields.
- Execute an agent (or run a pipeline) to verify it responds and completes successfully.

## Check your conversations

Add your working agents, pipelines, and toolkits to a conversation and test end-to-end:

- Open Chat → add/select an Agent or Pipeline as a participant.
- Send a simple instruction and confirm the response.
- For details, see: [Creating a Conversation and Adding AI Assistants](./create-conversation.md).

## Index data for a toolkit

Create your first index using a toolkit that supports indexing:

Supported examples: ADO Repos, ADO Wiki/Boards/Test Plans, Bitbucket, GitHub, GitLab, Confluence, Jira, SharePoint, Artifact, Figma, TestRail, Xray Cloud, Zephyr Enterprise, Zephyr Scale.

Steps:

1. Open the toolkit and ensure the "Index data" tool is selected/enabled.
2. Go to the **Test Settings** section → select the "Index Data" tool from dropdown list.
3. Fill the required parameters/options (these vary by toolkit: collection suffix, branch name, blacklist files etc.).
4. **Run Tool** and wait for completion. Check the output for any errors and adjust configuration if needed.

!!! tip "Tips"
      - You can also trigger indexing from an Agent or from Chat by selecting an Agent/Toolkit that has the Index Data tool available, then instructing it to index the target (provide repo/site/project and scope).
      - Example guide: [Index GitHub data](../how-tos/indexing/index-github-data.md). Additional indexing guides will be added for other toolkits.

## Questions or issues? Contact Support

!!! info "Need help fast?"
	Email: [SupportAlita@epam.com](mailto:SupportAlita@epam.com). Include your environment (Next or Nexus), project name, workspace type (Private/Team), a clear issue description, and the expected result.

What to include so we can help quickly:

- Agents/Pipelines/Toolkits: screenshots or text of agent instructions, toolkit configuration (selected tools and assigned credential), and any error text/logs (expanded).
- Indexing: toolkit type, parameters/options used (repo/site/project, filters), and logs/output from Tool Testing.
- Chat/Conversations: exact instructions (queries), selected participant, (agent/pipeline/model), and any error banners.
- General: relevant screenshots; send one issue per email when possible.

See the full guidance: [How to Contact ELITEA Support](../support/contact-support.md).

