# Glossary

This glossary provides definitions for key terms, components, and features used across the ELITEA platform. Understanding these terms will help you navigate and utilize ELITEA more effectively.

---

## A

**Agent**
: A customizable virtual assistant or bot within ELITEA that automates specific tasks or sets of tasks. Agents combine external toolkits to make informed decisions and perform actions. They can integrate with external services like GitHub, Jira, or Salesforce to create powerful automation workflows.

**Artifact**
: A temporary file storage system in ELITEA that allows sharing and storing text-based files between agents and workflows. Artifacts are organized in buckets and provide temporary storage for data and context during agent operations, enabling create, read, update, and delete operations.

**Authentication**
: The security process used to verify access to external platforms and services. ELITEA supports various authentication methods including Basic, Bearer tokens, API keys, passwords, and private keys, often managed through the Secrets feature.

---

## B

**Bucket**
: A container or organizational unit within ELITEA's Artifacts system used to group and store related files. Buckets provide temporary file storage for agents and workflows, allowing users to create, manage, and organize files by project or purpose. Each bucket can contain multiple files and supports operations like upload, download, and deletion.

---

## C

**Chat**
: The conversational interface in ELITEA where users interact with AI models, agents, and pipelines. Chat brings together all ELITEA components in a natural interface for human-AI collaboration.

**Collection**
: A curated group of related entities (agents and pipelines) organized for efficient access and management. Collections help users organize their AI resources by themes, projects, or categories, and can be shared across team projects.

**Configuration**
: The setup and customization settings for various ELITEA components. This includes defining parameters for integrations, toolkits, agents, pipelines, and other platform features to match specific requirements and use cases.

**Conversation Starter**
: Pre-defined prompts or questions configured in agents or pipelines that help users initiate interactions. Conversation starters provide suggested entry points for engaging with AI components, making it easier for users to understand what the component can do and how to interact with it effectively.

**Credential**
: Secure authentication information (API keys, OAuth tokens, usernames, passwords) used to connect ELITEA agents and toolkits to external platforms. Credentials are managed centrally through the Credentials menu for security and convenience.

---

## D

**Datasource**
: A repository that extends Large Language Models (LLMs) by integrating user-specific or project-specific data not included in the model's training set. Datasources support various formats including files (PDF, DOCX, TXT, JSON), tables (CSV, XLSX), Git repositories, Confluence pages, and QTest projects.

---

## E

**ELITEA**
: The comprehensive platform for working with Generative AI and managing data-driven projects. ELITEA provides tools for creating, organizing, and collaborating on agents, pipelines, and collections.

**ELITEA Code**
: AI-powered IDE extensions for VS Code and IntelliJ that integrate with the ELITEA platform. These extensions provide intelligent code suggestions, automated test generation, code commenting, and access to ELITEA's agents directly within development environments.

**Embedding Model**
: AI models used to convert text and documents into vector representations that can be searched and retrieved to provide context to LLMs.

**Entity**
: A general term for the main components in ELITEA: Agents, Pipelines, Collections, and Artifacts. Entities can be organized, shared, and managed within projects.

**Entrypoint**
: The initial configuration or starting point for agents and pipelines that defines how they begin execution. Entrypoints specify the entry conditions, parameters, and initial state when an agent or pipeline is triggered, providing the foundation for automated workflows and interactions.

**Export**
: A feature that allows users to download and save ELITEA entities (agents, pipelines, collections) as files for backup, sharing, or migration purposes. Exported entities can be imported into other ELITEA projects or instances, enabling portability and collaboration across different environments.

---

## F

**Flow Designer**
: A visual interface for creating and managing pipelines in ELITEA. The Flow Designer allows users to drag and drop nodes, connect workflows, and design complex automation processes without requiring code.

**Fork**
: The process of creating a personal copy of an existing entity (agent, pipeline, or collection) from another user's shared work from the "Team" project. Forking allows users to customize and modify the copied entity without affecting the original, enabling experimentation and personalization while building upon existing work.

---

## I

**Import**
: A feature that allows users to upload and restore ELITEA entities (agents, pipelines, collections) from previously exported files. Import functionality enables users to migrate content between projects, restore backups, or share work across different ELITEA instances, maintaining the original configurations and relationships.

**Instruction**
: The core directive or guidance text that defines how an AI component (agent or pipeline) should behave and respond. Instructions serve as the primary programming mechanism for AI entities, specifying their purpose, behavior patterns, constraints, and objectives. Well-crafted instructions are crucial for achieving desired AI performance and outcomes.

**Integration**
: A configuration that establishes connections between ELITEA and external platforms such as Jira, Confluence, GitHub, GitLab, QTest, TestRail, Salesforce, and others. Integrations make external services available for use within agents and pipelines.

---

## L

**Likes**
: A social engagement feature that allows users to express approval or appreciation for entities (agents, pipelines, collections) in the ELITEA platform. Likes help identify popular and useful content within the community, providing feedback to creators and helping other users discover valuable resources.

**LLM (Large Language Model)**
: AI models that process and generate human-like text. ELITEA supports various LLM providers and models, allowing users to select appropriate models for different tasks and configure parameters like temperature and token limits.

---

## M

**Max Completion Tokens**
: A parameter that sets the maximum number of tokens (words, punctuation, or parts of words) that an AI model can generate in a single response. This setting helps control response length and manage computational costs by preventing excessively long outputs.

**MCP (Model Context Protocol)**
: A protocol that allows ELITEA to integrate with external MCP servers, extending the platform's capabilities by accessing tools and services from third-party MCP implementations.

**Monitoring**
: Analytics and tracking capabilities in ELITEA that provide insights into usage patterns, performance metrics, token consumption, engagement rates, and system health across agents, pipelines, and the overall platform.

---

## N

**Node**
: Individual components or steps within a pipeline workflow. Nodes can be LLM interactions, tool calls, functions, loops, conditions, or decisions that connect to form automated processes.

---

## P

**Personal Access Token (PAT)**
: A secure authentication credential used to access external platforms and services programmatically. In ELITEA, Personal Access Tokens are commonly used for integrations with platforms like GitHub, GitLab, Jira, and other external services, providing a more secure alternative to using passwords for API authentication.

**Pipeline**
: Automated workflows that connect sequences of states, actions, and decisions to streamline complex processes. Pipelines can integrate with toolkits and external APIs, and are designed using either the visual Flow Designer or programmatic YAML configuration.

**Private Project**
: A personal workspace in ELITEA accessible only to the individual user. Private projects allow users to create and manage their own agents, pipelines, and collections without sharing access.

**Project Selector**
: A user interface component that allows users to switch between different projects (Private Project, Team Projects, and Public Project) within the ELITEA platform. The project selector is typically located in the sidebar and provides quick access to navigate between different workspace environments and their associated entities.

**Prompt**
: Instructions, questions, or statements given to AI models to elicit specific responses or outputs. In ELITEA, prompts can include context, variables, welcome messages, conversation starters, and various configuration settings to guide AI behavior.

---

## R

**ReAct**
: An application type in ELITEA that uses JSON format for tool interactions. ReAct agents operate by reasoning about tasks and taking actions using available tools to achieve specified goals.

**Remaining Tokens**
: The count of available tokens left for use in the current AI model context window or session. This indicator helps users understand how much input capacity remains before reaching the model's token limit, which is important for managing long conversations or processing large documents.

**Role**
: User permission levels within ELITEA that control access to different features and capabilities. Roles can be customized and assigned to manage collaboration and security in team projects.

---

## S

**Secret**
: Sensitive information (passwords, tokens, API keys) stored securely in ELITEA's vault system. Secrets can be configured once and reused across multiple components like credentials and toolkits, enhancing security by avoiding hardcoded sensitive information.

**Socket Connection**
: The real-time communication link between the ELITEA client interface and the server. The socket connection status indicator, displayed at the bottom of the sidebar, shows whether the user has an active connection to ELITEA servers. This connection enables real-time features like live collaboration, instant notifications, and immediate response updates during AI interactions.

**State**
: The memory system of a pipeline that serves as a dynamic repository for all information gathered, processed, and passed between workflow steps. State maintains context and data throughout pipeline execution.

**SubGraph**
: A modular pipeline feature that allows entire pipelines to be included as components within other pipelines, enabling reusable and scalable workflow building.

---

## T

**Tag**
: Organizational labels used to categorize and filter agents, pipelines, and collections. Tags enable efficient searching and grouping of related content within ELITEA.

**Team Project**
: Collaborative workspaces in ELITEA where multiple users can work together, share entities, and manage resources based on assigned roles and permissions.

**Temperature (0.1 - 1.0)**
: A parameter that controls the randomness and creativity of AI model responses. Lower values (0.1-0.3) produce more focused, deterministic, and predictable outputs, while higher values (0.7-1.0) generate more creative, diverse, and unpredictable responses. A value of 0.0 makes the model completely deterministic.

**Toolkit**
: Sets of tools and integrations that extend the capabilities of agents and pipelines. Toolkits can include internal ELITEA components (other agents) or external service integrations (Jira, GitHub, Confluence, etc.).

**Tool**
: Individual functions or capabilities within a toolkit that perform specific actions or operations. Tools are the building blocks that make up toolkits, providing discrete functionality such as creating tickets, reading files, sending messages, or executing API calls. Each tool typically corresponds to a specific operation that can be performed on an external service or within ELITEA.

**Top K**
: A parameter that limits the AI model's word selection to the K most likely next tokens at each step. For example, Top K = 40 means the model only considers the 40 most probable next words. Lower values create more focused responses, while higher values allow for more diversity in word choice.

**Top P (0.1 - 1.0)**
: Also known as nucleus sampling, this parameter controls response diversity by considering only the smallest set of tokens whose cumulative probability exceeds the P threshold. For example, Top P = 0.9 means the model considers the most likely tokens that together account for 90% of the probability mass. Lower values produce more focused responses, while higher values allow for more creativity.

**Transition**
: The connections between nodes in a pipeline that define the flow of execution and how steps connect to each other in automated workflows.

---

## U

**Users**
: Individuals who have access to the ELITEA platform and can create, manage, and interact with various entities such as agents, pipelines, collections, and artifacts. Users can participate in private projects (personal workspaces), team projects (collaborative environments), or public projects (community spaces). Each user has specific roles and permissions that determine their access levels and capabilities within different project contexts.

---

## V

**Variable**
: Dynamic placeholders in components that can be filled with different values during execution, allowing for flexible and reusable AI interactions.

**Version**
: A snapshot or iteration of an entity (agent, pipeline, collection) that tracks changes and modifications over time. ELITEA maintains version history for entities, allowing users to compare different versions, revert to previous states, and track the evolution of their AI assets. Each version preserves the configuration and settings at the time it was created.

---

## W

**Welcome Message**
: An introductory text displayed when users first interact with an agent or pipeline. Welcome messages provide context about the component's purpose, capabilities, and how to use it effectively. They serve as user-friendly introductions that help set expectations and guide user interactions.

**Workspace**
: The environment within ELITEA where users access and manage their projects. Workspaces can be private (individual) or team-based (collaborative), each providing different levels of access and sharing capabilities.

---

## X

**XMLChat**
: An application type in ELITEA that uses XML format for tool interactions instead of JSON. XMLChat is particularly suitable for LLama and Anthropic models that work better with XML-structured inputs.

---

## Y

**YAML Editor**
: A programmatic interface for configuring pipelines using YAML syntax, providing advanced users with precise control over workflow definitions and settings beyond what's available in the visual Flow Designer.

---

