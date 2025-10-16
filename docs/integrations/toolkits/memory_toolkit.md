# ELITEA Toolkit Guide: Memory Integration

## Introduction

### Purpose of this Guide

This guide is your definitive resource for integrating and utilizing the **Memory toolkit** within ELITEA. It provides a comprehensive, step-by-step walkthrough, from setting up PostgreSQL storage to configuring the toolkit in ELITEA and effectively using it within your Agents. By following this guide, you will unlock the power of persistent, long-term memory capabilities that enable your AI agents to remember information across conversations, learn from interactions, and provide more contextual and personalized responses. This integration empowers you to leverage AI-driven memory management to create truly intelligent, context-aware agents using the combined strengths of ELITEA and the langmem memory management library.

### Brief Overview of Memory Toolkit

The Memory toolkit is a sophisticated long-term memory solution for AI agents built on the **langmem** library. It provides intelligent memory management capabilities that enable your ELITEA agents to:

*   **Persistent Context Retention:** Store and retrieve information across multiple conversations and sessions, maintaining continuity and context over time.
*   **Intelligent Memory Management:** Automatically organize and categorize memories using namespace-based storage for easy retrieval and organization.
*   **PostgreSQL-Powered Storage:** Leverage robust PostgreSQL database storage with PgVector integration for reliable, scalable memory persistence.
*   **Semantic Memory Search:** Perform intelligent searches across stored memories to find relevant information based on context and meaning.
*   **Namespace Organization:** Organize memories by namespace to create isolated memory spaces for different agents, projects, or use cases.

Integrating the Memory toolkit with ELITEA brings advanced memory capabilities directly into your AI-driven workflows. Your ELITEA Agents can store important information, learn from past interactions, and provide more intelligent, context-aware responses by accessing their accumulated knowledge and experience.

## Prerequisites and Dependencies

### Required Dependencies

The Memory toolkit requires several key dependencies to function properly:

**Essential Requirements:**

1. **PostgreSQL Database:** A PostgreSQL database instance for memory storage
2. **PgVector Extension:** PostgreSQL extension for vector operations and storage
3. **langmem Library:** The core memory management library (automatically included in ELITEA)
4. **psycopg[binary]:** PostgreSQL adapter for Python (included in ELITEA runtime)

### Database Setup Requirements

Before creating your Memory toolkit, ensure you have:

1. **PostgreSQL Database Access:** A running PostgreSQL instance with appropriate permissions
2. **PgVector Extension Installed:** The database must have the PgVector extension enabled
3. **Connection String:** A valid PostgreSQL connection string in the format:
   ```
   postgresql://username:password@host:port/database_name
   ```

!!! note
    ELITEA provides default shared PgVector configurations for both Private and Team projects. You can use these shared configurations or create your own custom PgVector configuration.

## System Integration with ELITEA

To integrate the Memory toolkit with ELITEA, you need to follow a three-step process: **Configure PgVector → Create Memory Toolkit → Use in Agents**. This workflow ensures proper database connectivity and memory management configuration.

### Step 1: Configure PgVector Storage

Before creating a Memory toolkit, you must first set up PgVector storage configuration:

#### Using Default Shared Configuration

1. **Navigate to AI Configuration:** Open the sidebar and select **Settings** → **[AI Configuration](../../menus/settings/ai-configuration.md)**.
2. **Locate Vector Storage Section:** Find the "Vector Storage (PgVector)" section.
3. **Verify Default Configuration:** Confirm that default shared PgVector configurations are available:
     - **Private Projects:** Shared private PgVector configuration
     - **Team Projects:** Shared team PgVector configuration

#### Creating Custom PgVector Configuration

If you need a custom PgVector configuration:

1. **Navigate to AI Configuration:** Open the sidebar and select **Settings → AI Configuration**.
2. **Create New PgVector Configuration:** 
     - Click **"New private pgvector credentials"** or **"New project pgvector credentials"**
     - **Display Name:** Enter a descriptive name (e.g., "Memory Storage - Production")
     - **Connection String:** Enter your PostgreSQL connection string:
       ```
       postgresql://username:password@host:port/database_name
       ```
3. **Save Configuration:** Click **Save** to create the PgVector configuration.
4. **Refresh:** Click the **Refresh** icon to make the new configuration available in dropdown selections.


### Step 2: Create Memory Toolkit

Once your PgVector configuration is ready, create the Memory toolkit:

1. **Navigate to Toolkits Menu:** Open the sidebar and select **[Toolkits](../../menus/toolkits.md)**.
2. **Create New Toolkit:** Click the **`+ Create`** button.
3. **Select Memory:** Choose **Memory** from the list of available toolkit types.
4. **Configure Memory Settings:**
     - **Namespace:** Enter a unique namespace for this memory instance (e.g., "customer-support", "project-assistant", "research-agent")
         - **Important:** The namespace acts as an isolated memory space - agents with the same namespace share memories, while different namespaces are completely separate
     - **PgVector Configuration:** Select your PgVector configuration from the dropdown (shared or custom)
5. **Enable Desired Tools:** In the **"Tools"** section, select the checkboxes next to the specific memory tools you want to enable:
6. **Save Toolkit:** Click **Save** to create the toolkit.

![Memory Toolkit Configuration](../../img/integrations/toolkits/memory/memory-toolkit-create.png)

#### Available Tools:

The Memory toolkit provides two essential tools for intelligent memory management:

| **Tool Name** | **Description** | **Primary Use Case** |
|:-------------:|-----------------|----------------------|
| **Manage Memory** | Store, update, and organize information in the agent's memory | Save important facts, user preferences, conversation context, and key insights for future reference |
| **Search Memory** | Search and retrieve information from stored memories using semantic search | Find relevant past information, recall previous conversations, and access stored knowledge |

### Step 3: Use Toolkit in Agents, Pipelines, or Chat

Now you can add the configured Memory toolkit to your agents, pipelines, or use it directly in chat:

**For Agents:**

1. **Navigate to Agents:** Open the sidebar and select **[Agents](../../menus/agents.md)**.
2. **Create or Edit Agent:** Either create a new agent or select an existing agent to edit.
3. **Add Memory Toolkit:** 
     - In the **"Tools"** section of the agent configuration, click the **"+Toolkit"** icon
     - Select your configured Memory toolkit from the dropdown list
     - The toolkit will be added to your agent with the previously configured tools enabled

Your agent can now store and retrieve memories using the configured toolkit and namespace.

![Memory Agent Configuration](../../img/integrations/toolkits/memory/memory-agent.png)

**For Pipelines:**

1. **Navigate to Pipelines:** Open the sidebar and select **[Pipelines](../../menus/pipelines.md)**.
2. **Create or Edit Pipeline:** Either create a new pipeline or select an existing pipeline to edit.
3. **Add Memory Toolkit:** 
     - In the **"Tools"** section of the pipeline configuration, click the **"+Toolkit"** icon
     - Select your configured Memory toolkit from the dropdown list
     - The toolkit will be added to your pipeline with the previously configured tools enabled

     ![Memory Pipeline Configuration](../../img/integrations/toolkits/memory/memory-pipeline.png)

**For Chat:**

1. **Navigate to Chat:** Open the sidebar and select **[Chat](../../menus/chat.md)**.
2. **Add Memory Toolkit:** 
     - In the chat interface, click the **toolkit icon** to add toolkits
     - Select your configured Memory toolkit from the available options
     - Start using memory capabilities directly in your chat conversations

     ![Memory Chat Configuration](../../img/integrations/toolkits/memory/memory-chat.png)

## Understanding Namespaces

### What is a Namespace?

A **namespace** is a unique identifier that creates an isolated memory space for your agents. Think of it as a dedicated "brain" or "knowledge repository" that can be shared among multiple agents or kept private to a single agent.

### Key Namespace Concepts:

- **Isolation:** Different namespaces are completely separate - agents cannot access memories from other namespaces
- **Sharing:** Multiple agents using the same namespace share the same memory space
- **Organization:** Use namespaces to organize memories by project, department, use case, or agent type

### Namespace Best Practices:

1. **Descriptive Names:** Use clear, descriptive namespace names (e.g., "hr-assistant", "customer-support-team", "research-project-alpha")
2. **Consistent Conventions:** Establish naming conventions for your organization (e.g., "department-role", "project-agent-type")
3. **Security Considerations:** Consider who should have access to shared memory spaces
4. **Scope Definition:** Match namespace scope to your intended memory sharing requirements

### Example Namespace Strategies:

- **Per-Project:** `project-web-redesign`, `project-mobile-app`
- **Per-Department:** `hr-department`, `sales-team`, `engineering-team`
- **Per-Use-Case:** `customer-support`, `content-creation`, `data-analysis`
- **Per-Agent:** `agent-sarah-personal`, `agent-research-bot`

## Working with Memory: Tools and Examples

The Memory toolkit provides two essential tools for managing agent memory: **Manage Memory** (for storing information) and **Search Memory** (for retrieving information). Here's how to use each tool with practical examples.

!!! info "Memory Storage Behavior"
    The Memory toolkit is designed to preserve existing information by default. When storing new memories:

    - **New information is added** without overwriting previously saved data
    - **Each memory entry gets a unique identifier** to prevent accidental data loss
    - **Existing memories remain intact** unless explicitly requested to be updated or replaced
    - **To update existing information**, users must specifically request to modify or replace existing memories

#### Example: QA Agent - User Story to Test Case Workflow

**Step 1: Get User Story from Jira**

   **User request:** "Get user story STORY-456 from Jira, analyze it"
   
 **Agent:** Agent uses Jira toolkit - Get Issue tool
   
   **Jira Toolkit Response:**

   - Summary: "User can reset password using email verification"
   - Story Points: 5
   - Description: "As a user, I want to reset my password using email verification so that I can regain access to my account when I forget my password"
   - Acceptance Criteria: 
      1. User clicks 'Forgot Password' link 
      2. User enters email address 
      3. System sends verification email 
      4. User clicks email link 
      5. User enters new password 
      6. Password is successfully updated"

**Step 2: Store Story in Memory**

   **User request:** "Now store this story analysis in memory so the team can access it later."

   **Agent:** Agent uses Manage Memory tool to store the information related to the STORY-456

**Step 3: Retrieve Story from Memory**

   User goes to the Chat and adds the memory toolkit to the chat team conversation

   **User request:** Retrieve the story related to resetting password

   **Agent:** Agent uses Search Memory tool to Search Memory for stored story

   **Memory Search Results:**

   - Summary: "User can reset password using email verification"
   - Story Points: 5
   - Description: "As a user, I want to reset my password using email verification so that I can regain access to my account when I forget my password"
   - Acceptance Criteria: 
      1. User clicks 'Forgot Password' link 
      2. User enters email address 
      3. System sends verification email 
      4. User clicks email link 
      5. User enters new password 
      6. Password is successfully updated"

**Step 4: Create Test Cases in TestRail**

**User request:** Create test cases in TestRail based on story

**Agent:** [Agent uses TestRail toolkit - Add Test Case tool]

  * **Command Parameters:** (using parameters retrieved from memory)

**TestRail Response:** The following test cases have been created:

   - Case ID: "TC-PWD-001"
   - Case ID: "TC-PWD-002"
   - Case ID: "TC-PWD-003"
   - Case ID: "TC-PWD-004"




## Memory Management Best Practices

### Effective Memory Storage

1. **Be Specific and Detailed:** Store specific, actionable information rather than vague summaries
      - **Good:** "Customer John prefers email communication, timezone EST, usually available 9-5pm, previous issue resolved with billing credit on 2024-01-15"
      - **Poor:** "Customer had an issue before"

2. **Include Context and Metadata:** Add relevant context that makes memories more searchable and useful
     - Include dates, categories, importance levels
     - Tag memories with relevant keywords

3. **Update and Maintain:** Regularly update memories when information changes
     - Update customer preferences
     - Mark old information as outdated
     - Remove irrelevant or outdated memories

### Effective Memory Search

1. **Use Descriptive Search Queries:** Search with specific, descriptive terms
     - **Good:** "customer billing issues credit adjustment"
     - **Poor:** "customer problem"

2. **Search Before Storing:** Always search existing memories before storing new information to avoid duplicates

3. **Iterate Search Terms:** If initial search doesn't find relevant information, try different keywords or phrases


## Troubleshooting

### Common Issues and Solutions

#### Memory Toolkit Not Available in Dropdown

**Symptom:** Memory toolkit doesn't appear when creating a new toolkit.

**Solutions:**

1. **Check Installation:** Verify that ELITEA includes the langmem library
2. **Verify Permissions:** Ensure you have toolkit creation permissions
3. **Contact Support:** If the issue persists, contact ELITEA support

#### PgVector Configuration Connection Errors

**Symptom:** Cannot connect to PostgreSQL database or PgVector configuration fails.

**Solutions:**

1. **Verify Connection String:** Double-check the PostgreSQL connection string format:
   ```
   postgresql://username:password@host:port/database_name
   ```
2. **Test Database Access:** Verify you can connect to the database outside of ELITEA
3. **Check PgVector Extension:** Ensure the PgVector extension is installed and enabled in your PostgreSQL database
4. **Network Access:** Verify network connectivity between ELITEA and your PostgreSQL instance
5. **Credentials:** Confirm database username/password are correct and have appropriate permissions

#### Memory Tools Not Working

**Symptom:** Memory tools appear to run but don't store or retrieve information.

**Solutions:**

1. **Check Tool Selection:** Verify both "Manage Memory" and "Search Memory" tools are enabled in your toolkit
2. **Verify Namespace:** Ensure the namespace is correctly configured and consistent
3. **Database Permissions:** Check that the database user has CREATE, INSERT, SELECT, UPDATE permissions
4. **Connection Status:** Verify the PgVector configuration is working and connected

#### Namespace Isolation Issues

**Symptom:** Agents accessing memories from wrong namespace or cannot find expected memories.

**Solutions:**

1. **Verify Namespace Names:** Check that all agents using the same memory space have identical namespace values
2. **Case Sensitivity:** Ensure namespace names match exactly (case-sensitive)
3. **Special Characters:** Avoid special characters in namespace names that might cause parsing issues

#### Performance Issues

**Symptom:** Memory operations are slow or timing out.

**Solutions:**

1. **Database Performance:** Check PostgreSQL database performance and resources
2. **Memory Volume:** Large memory stores may require database optimization
3. **Search Optimization:** Use more specific search terms to improve query performance
4. **Database Indexing:** Consider adding database indexes for better search performance

### Error Messages

#### "langmem is required for MemoryToolkit"

**Cause:** The langmem library is not available or not properly installed.

**Solution:** This error typically indicates a system-level issue. Contact ELITEA support as the langmem library should be included in the standard ELITEA installation.

#### "PostgreSQL dependencies (psycopg) are required"

**Cause:** PostgreSQL adapter is not available.

**Solution:** This is a system-level dependency issue. Contact ELITEA support as psycopg should be included in the ELITEA runtime.

#### "Expected PostgresStore, got [other type]"

**Cause:** Invalid store configuration or connection issue.

**Solution:** 

1. Verify your PgVector configuration is correct
2. Test the database connection
3. **Recreate the PgVector configuration if necessary

### FAQ

1. **Q: Can multiple agents share the same memory namespace?**
     - **A:** Yes! Multiple agents using the same namespace will share the same memory space. This is useful for creating teams of agents that need to share knowledge and context.

2. **Q: How do I separate memories between different projects or use cases?**
     - **A:** Use different namespaces for different projects or use cases. Each namespace creates a completely isolated memory space.

3. **Q: Can I migrate memories from one namespace to another?**
     - **A:** Currently, there is no built-in migration tool. You would need to recreate memories in the new namespace. Plan your namespace strategy carefully from the beginning.

4. **Q: How much data can I store in memory?**
     - **A:** The storage limit depends on your PostgreSQL database configuration and available storage. The Memory toolkit is designed to handle substantial amounts of data efficiently.

5. **Q: Can I use the same PgVector configuration for multiple Memory toolkits?**
     - **A:** Yes! Multiple Memory toolkits can share the same PgVector configuration. They will be isolated by their respective namespaces.

6. **Q: How do I back up my agent's memories?**
     - **A:** Since memories are stored in your PostgreSQL database, use standard PostgreSQL backup procedures to back up your memory data.

7. **Q: Can I search across multiple namespaces simultaneously?**
     - **A:** No, memory searches are confined to a single namespace. If you need to search across multiple memory spaces, you'll need to configure separate search operations for each namespace.

8. **Q: Is there a limit to how many memories I can store in a namespace?**
     - **A:** There is no hard limit imposed by the Memory toolkit. Practical limits depend on your PostgreSQL database configuration and available storage space.

### Support and Contact Information

If you encounter any persistent issues, have further questions, or require additional assistance beyond the scope of this guide regarding the Memory toolkit integration or ELITEA Agents in general, please do not hesitate to contact our dedicated ELITEA Support Team.

**How to Reach ELITEA Support:**

*   **Email:**  **[SupportAlita@epam.com](mailto:SupportAlita@epam.com)**

**Best Practices for Submitting Effective Support Requests:**

To enable our support team to understand and resolve your issue as efficiently as possible, please include the following critical information in your support email:

*   **ELITEA Environment Details:** Clearly specify the ELITEA environment you are currently using (e.g., "Next" or the specific name of your ELITEA instance).
*   **Project Context:**  Indicate the **Project Name** within ELITEA where you are experiencing the issue and specify whether you are working in your **Private** workspace or a **Team** project.
*   **Memory Toolkit Configuration Details:**
    *   **Namespace:** The exact namespace used in your Memory toolkit
    *   **PgVector Configuration:** Details about your PgVector configuration (shared or custom)
    *   **Tools Enabled:** Which memory tools are enabled in your toolkit
*   **Detailed Issue Description:** Provide a clear, concise, and comprehensive description of the problem you are encountering. Articulate precisely what you were attempting to do, what behavior you expected to observe, and what actually occurred.
*   **Database Information:** If the issue is related to memory storage/retrieval:
    *   PostgreSQL version and configuration details
    *   PgVector extension version
    *   Any database error messages
*   **Complete Error Messages:** If you are encountering any error messages, provide the **complete and unabridged error text**.
*   **Agent/Memory Operations:** If the issue relates to specific memory operations, provide details about:
    *   What information you were trying to store or retrieve
    *   The exact search terms or queries used
    *   Expected vs. actual results

---

## Summary

The Memory toolkit integration with ELITEA follows a streamlined workflow:

1. **🗄️ Configure PgVector** - Set up PostgreSQL database storage with PgVector extension for memory persistence
2. **🧠 Create Memory Toolkit** - Configure the Memory toolkit with namespace and PgVector connection  
3. **🚀 Use in Modules** - Add the toolkit to Agents, Pipelines, and use directly in Chat for intelligent memory management

**Key Benefits:**
- **Persistent Context:** Information survives across sessions and conversations
- **Intelligent Organization:** Namespace-based memory organization for isolation and sharing
- **Semantic Search:** Find relevant memories using natural language queries
- **Scalable Storage:** PostgreSQL-powered storage that grows with your needs
- **Team Collaboration:** Shared memory spaces for agent teams and departments


!!! reference "External Resources"
    *   **PostgreSQL Documentation:** [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/) - *Official PostgreSQL documentation for database setup and configuration.*
    *   **PgVector Extension:** [https://github.com/pgvector/pgvector](https://github.com/pgvector/pgvector) - *Official PgVector extension documentation and installation guide.*
    *   **LangMem Library:** [https://langmem.dev](https://langmem.dev) - *Documentation for the langmem memory management library used by the Memory toolkit.*
    *   **PostgreSQL Connection Strings:** [https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING) - *Official guide to PostgreSQL connection string formats.*
