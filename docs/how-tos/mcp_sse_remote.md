# Elitea MCP Server Integration via SSE Transport

## Overview

Elitea now provides **MCP Server capabilities** using **SSE (Server-Sent Events) transport**, enabling seamless interaction with MCP clients. This feature allows MCP clients to connect to the Elitea SSE MCP Server and communicate using the **MCP protocol**.

### MCP Protocol

For more details about the MCP protocol, refer to the official documentation: [MCP Protocol](https://modelcontextprotocol.io/).

## Connecting to the Elitea SSE MCP Server

To connect to the Elitea SSE MCP Server, use the following path format to build the full URL: _[ELITEA_SERVER_URL]/mcp_sse/[PROJECT_ID]/sse_.

### Example URL

For Eltea server https://my.elitea.ai and project with ID 5, the full URL would be: https://my.elitea.ai/mcp_sse/5/sse.

### Authentication and Authorization

A **token** is required for both authentication and authorization when connecting to the Elitea SSE MCP Server. Ensure that your MCP client is configured to include the token in the request headers.

## Elitea Agents as MCP Tools

The Elitea SSE MCP Server provides only **MCP tools capabilities**.  
Each Elitea **agent** (version: **latest**) marked with the tag **mcp** is exposed as a single tool with one parameter **task**.

## Supported MCP Clients

Only MCP clients that support **custom http headers** or implicitly add http header **Authorization: Bearer [TOKEN]** can be integrated with the Elitea SSE MCP Server. For example:

- **Visual Studio Code (VSCode):** Refer to the [VSCode MCP Server documentation](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) for more details on integration.