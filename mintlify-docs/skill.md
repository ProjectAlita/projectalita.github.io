---
name: elitea
description: Build, deploy, and manage AI-powered agents and automated workflows with ELITEA. Use when creating agents, configuring pipelines, connecting toolkits, managing credentials, setting up MCP servers, indexing knowledge sources, or exploring integrations with Jira, GitHub, Confluence, Slack, and 30+ other services.
license: MIT
compatibility: Web platform accessible at https://next.elitea.ai. Extensions available for VS Code and IntelliJ IDEA.
metadata:
  author: ELITEA
  version: "2.0.1"
  docs: https://elitea.ai/docs
  platform: https://next.elitea.ai
---

# ELITEA

ELITEA is an enterprise AI platform that enables teams to create intelligent agents, automate complex workflows with pipelines, and connect to 30+ third-party services through toolkits — all from a unified web interface.

## Capabilities

### Agents
- Create AI agents that combine LLM instructions, toolkits, and integrations
- Configure agent behavior with system prompts, conversation starters, and variables
- Assign toolkits (Jira, GitHub, Confluence, Slack, etc.) so agents can take real actions
- Version, fork, import, and export agents across projects
- Run agents in Chat or invoke them inside pipelines
- Monitor agent execution history and performance

### Pipelines
- Build multi-step automated workflows using a visual flow editor
- Connect nodes: LLM nodes, Toolkit nodes, Code nodes, State Modifier nodes, Router nodes, Loop nodes
- Control flow with conditional routing (Jinja2 template syntax), loops, and entry points
- Pass state variables between nodes; define inputs and outputs per node
- Configure pipeline runs with step limits, interrupt points, and YAML-based configuration
- Chain pipelines together and use them inside agent conversations

### Toolkits
- Connect agents and pipelines to external services via pre-built toolkits
- Supported toolkits include: Jira, GitHub, GitLab, Bitbucket, ADO Repos, Confluence, SharePoint, Slack, TestRail, Xray Cloud, Zephyr Scale, Zephyr Enterprise, qTest, Rally, ReportPortal, TestIO, Figma, Salesforce, ServiceNow, SonarQube, Postman, SQL, PowerPoint, Memory, Artifact, OpenAPI (custom), Custom HTTP, Syngen, Google Places, Power Automate
- Create custom toolkits using OpenAPI spec or custom HTTP configuration
- Attach credentials to toolkits for authenticated access
- Test individual toolkit tools before using them in agents

### Credentials
- Securely store API keys, OAuth tokens, bearer tokens, basic auth, and database credentials
- Credentials are encrypted and centrally managed per project
- Assign credentials to toolkits; control access per user
- Supports personal (user-scoped) and shared credentials

### Indexing & Knowledge
- Index content from GitHub, Confluence, Jira, SharePoint, Figma, TestRail, Xray, Zephyr, ADO Wiki, and file artifacts
- Schedule automatic re-indexing with cron expressions
- Use vector search to query indexed knowledge from agents and pipelines
- Configure indexing parameters per source (JQL, CQL, GraphQL, file filters)

### Artifacts
- Create project-scoped storage buckets for temporary workflow data
- Read, write, update, and delete text-based files during agent/pipeline execution
- Share artifact context between agents in the same project
- Manage retention policies and download outputs

### MCP (Model Context Protocol)
- Host a local MCP server (stdio) to expose ELITEA agents to VS Code, Cursor, and other MCP-compatible tools
- Connect to remote MCP servers (SSE) for hosted integrations
- Make ELITEA toolkit tools available via MCP for use in external AI coding assistants
- Configure MCP clients to authenticate with ELITEA personal access tokens

### Chat & Conversations
- Chat directly with LLMs, agents, and pipelines in a unified interface
- Use Canvas to create and edit agents, pipelines, and toolkits without leaving chat
- Attach files, generate images, run Python sandboxes, and use internal AI tools
- Manage conversation context, history, and teammates
- Use Swarm Mode to coordinate multiple agents in a single conversation

### Extensions
- ELITEA Code: VS Code and IntelliJ extension for AI-assisted coding using ELITEA agents
- ELITEA Code Chat: Interactive chat panel in your IDE connected to ELITEA

## Workflows

### Create and configure an agent
1. Navigate to **Agents** in the ELITEA menu
2. Click **+ Agent** and provide a name, description, and LLM model
3. Write system instructions defining the agent's behavior and scope
4. Add toolkits (e.g., Jira Toolkit with a configured credential)
5. Optionally add conversation starters, variables, and welcome message
6. Save and test in Chat

### Build a pipeline
1. Navigate to **Pipelines** and click **+ Pipeline**
2. Open the Flow Editor and add nodes from the node palette
3. Connect nodes with edges; set entry point
4. Configure each node's inputs, outputs, and template/instructions
5. Add Router nodes for conditional branching; Loop nodes for iteration
6. Test with Pipeline Runs; inspect step-by-step execution
7. Save and invoke from Chat or from another pipeline/agent

### Connect a toolkit to an external service
1. Navigate to **Credentials** and create a credential for the target service (e.g., GitHub PAT)
2. Navigate to **Toolkits** and click **+ Toolkit**
3. Select the toolkit type (e.g., GitHub Toolkit)
4. Attach the credential and configure required parameters (org, repo, etc.)
5. Use **Test Tool** to validate connectivity
6. Assign the toolkit to an agent or pipeline node

### Set up MCP server in VS Code
1. Install Python 3.8+ and the `alita-sdk` MCP client
2. Create an ELITEA Personal Access Token in **Settings → Personal Tokens**
3. Add the MCP server configuration to VS Code's `settings.json` with your token, project ID, and ELITEA URL
4. Reload VS Code; the MCP server appears in GitHub Copilot agent mode
5. Use `@elitea` in Copilot Chat to invoke ELITEA agents from VS Code

### Index a knowledge source
1. Navigate to **Toolkits** and open or create a toolkit supporting indexing (e.g., Confluence Toolkit)
2. Go to the **Indexing** tab and configure source parameters (space key, CQL, labels, etc.)
3. Click **Index Now** or configure a cron schedule for automatic re-indexing
4. Once indexed, enable the toolkit's datasource in an agent to power semantic search

## Integration

### Supported tools and services
- **Project management**: Jira, ADO Boards, Rally, ServiceNow
- **Version control**: GitHub, GitLab, Bitbucket, ADO Repos
- **Documentation**: Confluence, SharePoint, ADO Wiki
- **Testing**: TestRail, Xray Cloud, Zephyr Scale, Zephyr Enterprise, qTest, ReportPortal, TestIO
- **Communication**: Slack
- **Design**: Figma
- **CRM/ERP**: Salesforce, ServiceNow
- **Code quality**: SonarQube
- **API testing**: Postman
- **Custom**: OpenAPI spec, custom HTTP endpoints, SQL databases
- **AI coding tools via MCP**: VS Code (GitHub Copilot), Cursor, Windsurf, Claude Code

### Authentication methods
- Personal Access Tokens (for API and MCP access)
- API keys, OAuth tokens, basic auth, bearer tokens (stored as Credentials)
- EPAM SSO for platform login

## Context

ELITEA is a web platform hosted at `https://next.elitea.ai`. Users log in with their EPAM account. Each user has a private project; teams share organization projects. The platform is built for enterprise teams in software development, QA, product management, and knowledge management who want to leverage LLMs without building custom integrations from scratch.

Documentation is at `https://elitea.ai/docs`. The current version is **2.0.1**.
