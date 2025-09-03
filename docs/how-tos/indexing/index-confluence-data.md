# Index Confluence Data

!!! warning "Availability"
    Indexing tools are available in the [Next environment](https://next.elitea.ai) (Release 1.7.0) and replace legacy Datasources/Datasets. For context, see [Release Notes 1.7.0](../../release-notes/rn_current.md#indexing-tools-replacement-for-datasets) and the [Indexing Overview](./indexing-overview.md).

This guide provides a complete step-by-step walkthrough for indexing Confluence data and then searching or chatting with the indexed content using ELITEA's AI-powered tools.

## Overview

Confluence indexing allows you to create searchable indexes from your Confluence knowledge base content:

- **Pages & Documentation**: Meeting notes, project documentation, how-to guides, and knowledge articles
- **Spaces**: Organized content collections for teams, projects, or departments
- **Labels & Metadata**: Content categorization and tagging systems
- **Attachments**: Document files, images, and other media attached to pages
- **Comments**: User discussions and collaborative input on pages

**What you can do with indexed Confluence data:**

- **Semantic Search**: Find information across your Confluence spaces using natural language queries
- **Context-Aware Chat**: Get AI-generated answers from your knowledge base with citations
- **Cross-Space Discovery**: Search across multiple Confluence spaces and projects
- **Knowledge Extraction**: Transform Confluence content into searchable organizational knowledge
- **Content Analysis**: Analyze patterns, gaps, and relationships in your documentation

**Common use cases:**

- Onboarding new team members by allowing them to ask questions about processes and documentation
- Finding specific procedures, policies, or best practices across your knowledge base
- Generating summaries or explanations from existing documentation
- Support ticket resolution using indexed knowledge articles and FAQ content
- Content audit and analysis to identify documentation gaps or outdated information

---

## Prerequisites

Before indexing Confluence data, ensure you have:

1. **Confluence Credential**: A Confluence API token or [authentication credentials](../how-to-use-credentials.md#confluence-credential-setup) configured in ELITEA
2. **Vector Storage**: PgVector selected in Settings → [AI Configuration](../../menus/settings/ai-configuration.md)
3. **Embedding Model**: Selected in AI Configuration (defaults available) → [AI Configuration](../../menus/settings/ai-configuration.md)
4. **Confluence Toolkit**: Configured with your Confluence instance details and credentials

### Required Permissions

Your Confluence credential needs appropriate permissions based on what you want to index:

**For Content Access:**
- Read access to Confluence spaces and pages
- Permission to view the specific spaces you want to index

**For Comprehensive Indexing:**
- Access to view attachments (if including attachments)
- Permission to view comments (if including comments)
- Access to both public and restricted content (based on your requirements)

**Authentication Methods:**
- **Basic Authentication**: Username and API Key
- **Bearer Token**: Confluence API token

---

## Step-by-Step: Creating a Confluence Credential

1. **Generate Confluence API Token** in your Atlassian account (Security → API Tokens)
2. **Create Credential in ELITEA**: Navigate to **Credentials** → **+ Create** → **Confluence** → enter details and save

!!! info "Detailed Instructions"
    For complete credential setup steps including token generation and security best practices, see:
    
    - [Create a Credential](../../getting-started/create-credential.md)
    - [Confluence Credential Setup](../how-to-use-credentials.md#confluence-credential-setup)
    - [Confluence Toolkit Guide](../../integrations/toolkits/confluence_toolkit.md) (Token generation section)

---

## Step-by-Step: Configure Confluence Toolkit

1. **Create Toolkit**: Navigate to **Toolkits** → **+ Create** → **Confluence**
2. **Configure Settings**: Set base URL, space, hosting option, and assign your Confluence credential
3. **Enable Tools**: Select `Index Data`, `List Collections`, `Search Index`, `Stepback Search Index`, `Stepback Summary Index`, and `Remove Index` tools
4. **Save Configuration**

### Tool Overview:
   - **Index Data**: Creates searchable indexes from Confluence pages and content
   - **List Collections**: Lists all available collections/indexes to verify what's been indexed
   - **Search Index**: Performs semantic search across indexed content using natural language queries
   - **Stepback Search Index**: Advanced search that breaks down complex questions into simpler parts for better results
   - **Stepback Summary Index**: Generates summaries and insights from search results across indexed content
   - **Remove Index**: Deletes existing collections/indexes when you need to clean up or start fresh

!!! info "Detailed Instructions"
    For complete toolkit configuration including space setup and authentication options, see:
    
    - [Toolkits Menu](../../menus/toolkits.md)
    - [Confluence Toolkit Integration Guide](../../integrations/toolkits/confluence_toolkit.md)

---

## Step-by-Step: Index Confluence Data

### Content Indexing (from Toolkit)

1. **Open Toolkit Test Settings:**
     - Navigate to your Confluence toolkit's detail page
     - In the **Test Settings** panel (right side), select a model (e.g., `gpt-4o`)

2. **Configure Index Data Tool:**

     - From the tool dropdown, select **"Index Data"**
     - Configure the following parameters:

     | Parameter | Description | Example Value |
     |-----------|-------------|---------------|
     | **Collection Suffix** * | Suffix for collection name (required) | `kb` or `docs` |
     | **Clean Index** | Remove existing index data before re-indexing | ✓ (checked) or ✗ (unchecked) |
     | **Chunking Tool** | Method for splitting content into chunks | Default chunking or custom |
     | **Include Restricted Content** | Index pages with restricted access | ✓ (checked) or ✗ (unchecked) |
     | **Include Archived Content** | Index archived pages and spaces | ✓ (checked) or ✗ (unchecked) |
     | **Include Attachments** | Index attachment content | ✓ (checked) or ✗ (unchecked) |
     | **Include Comments** | Index page comments | ✓ (checked) or ✗ (unchecked) |
     | **Include Labels** | Index page labels | ✓ (checked) or ✗ (unchecked) |
     | **Keep Markdown Format** | Preserve Markdown formatting in indexed content | ✓ (checked) or ✗ (unchecked) |
     | **Keep Newlines** | Preserve line breaks and formatting | ✓ (checked) or ✗ (unchecked) |
     | **Bins With Llm** | Use LLM for content binning/organization | ✓ (checked) or ✗ (unchecked) |

3. **Run Confluence Indexing:**
     - Click **"Run Tool"** 
     - Wait for completion (may take several minutes for large spaces)
     - Check the output for success confirmation or error messages

   ![Confluence Index Configuration](../../img/how-tos/indexing/confluence-index-toolkit.png)  
---

## Verification: Confirm Index Success

After indexing completes, verify the index was created successfully:

### Method 1: Using Test Settings (Technical Verification)

1. **Use List Collections Tool:**
     - In Test Settings, select **"List Collections"** tool
     - Run tool to see all available collections
     - Look for your collection with the specified suffix

2. **Test Basic Search:**
     - Select **"Search Index"** tool
     - **Simple Query**: e.g., `documentation setup process`
     - **Collection Suffix**: Your specified suffix
     - Run tool and verify relevant results are returned

---

## Search and Chat with Indexed Data

Once your Confluence data is indexed, you can use the toolkit to search and interact with your content in multiple ways:

### Using Toolkit in Conversations and Agents

Your Confluence toolkit can be used in two main contexts:

1. **In Conversations**: Add the toolkit as a participant to ask questions and search your indexed Confluence data
2. **In Agents**: Include the toolkit when creating AI agents to give them access to your Confluence knowledge base

**How to use:**

- **Start a New Conversation or Create an Agent**
- **Add Toolkit as Participant**: Select your Confluence toolkit from the available toolkits
- **Ask Natural Language Questions**: The toolkit will automatically search your indexed data and provide relevant answers with citations

### Real-Life Example Workflow

Let's walk through a complete example of indexing and using a company knowledge base:

**Step 1: Setup Confluence Toolkit for Company Knowledge Base**

 **Configure Confluence Toolkit:**

   - Base URL: `https://yourcompany.atlassian.net/wiki`
   - Space: `KB` (Knowledge Base space key)
   - Hosting Option: `Cloud`
   - Credential: Your Confluence API token
   - Tools enabled: `Index Data`, `List Collections`, `Search Index`, `Stepback Search Index`, `Stepback Summary Index`, `Remove Index`


**Step 2: Use in Conversations**

 **Add toolkit to a conversation and start asking questions:**

   - Navigate to **Conversations** → **+ New Conversation**
   - In the participants section click + to add Toolkit
   - Select your Confluence toolkit from the available toolkits list

**Step 3: Index the Knowledge Base**

 * **User Request in Chat:**
 
   > "Index our knowledge base with collection suffix 'kb'. Include attachments and labels but exclude comments. Keep markdown formatting and clean any existing index first."

![Confluence Index Configuration](../../img/how-tos/indexing/confluence-index.png)
 

**Step 4: Verify Index Creation**

 * **User Request:**
 
   > "List my collections"

 **Confluence Toolkit Response:**

 ![Confluence list collections](../../img/how-tos/indexing/confluence-list.png)

 This confirms the indexing completed successfully and your knowledge base collection is available for searching.

**Step 5: Start the conversation and begin asking questions about your indexed content**

  * **User Request:** "What is our company's vacation policy?"
   
  * **Confluence Toolkit:** "Based on your indexed knowledge base, here's your company's vacation policy:
   
    1. **Annual Leave Entitlement**: All full-time employees are entitled to 25 days of annual leave per year
    2. **Accrual System**: Vacation days accrue monthly at a rate of 2.08 days per month
    3. **Carryover Policy**: Up to 5 unused vacation days can be carried over to the next year...
   
   *Source: HR Policies → Employee Benefits → Vacation Policy (Page ID: 12345)*"

   ![Confluence Search](../../img/how-tos/indexing/confluence-search.png)
   
   * **User Request:** "How do I set up a new development environment?"
   
   * **Confluence Toolkit:** "Here's the step-by-step process for setting up a new development environment:
   
     **Prerequisites:**

      1. Install Docker Desktop
      2. Obtain access credentials from the DevOps team
      3. Clone the main repository from GitHub
   
     **Setup Steps:**

     1. Run the environment setup script: `./scripts/setup-dev.sh`
     2. Configure your local environment variables...
   
   *Source: Developer Documentation → Environment Setup → Development Environment (Page ID: 67890)*"

   ![Confluence Search](../../img/how-tos/indexing/confluence-search1.png)

## Troubleshooting & Tips

### Common Errors and Solutions

**"Space not found" or "Authentication failed":**

  - Verify your Confluence credential has the correct API token
  - Ensure the space key is exact and case-sensitive (e.g., `KB`, not `kb`)
  - Check that your token has appropriate permissions for the space

**"API rate limit exceeded":**

  - Large spaces may hit Confluence API limits
  - Reduce Max Pages or use more specific filtering (labels, CQL)
  - Wait and retry, or consider indexing in smaller batches

**"No documents indexed":**

  - Check your label or CQL filters aren't too restrictive
  - Verify the space contains pages matching your criteria
  - Try indexing without filters first, then add restrictions

**"Vector database connection failed" or "PgVector errors":**

  - Ensure PgVector is properly configured in Settings → AI Configuration
  - Verify the vector database is running and accessible
  - Check connection credentials and database permissions
  - Restart the vector database service if connection issues persist

**"Embedding model not found" or "Embedding errors":**

  - Verify an embedding model is selected in AI Configuration
  - Check if the embedding model is properly downloaded/initialized
  - Try switching to a different embedding model (e.g., text-embedding-ada-002)
  - Ensure sufficient system resources for the embedding model to load

### Performance and Scope Considerations

**For Large Confluence Spaces:**

- Use specific label filters: `label="documentation"` or `label="public"`
- Use CQL queries to target specific content: `space="KB" AND created>="2024-01-01"`
- Consider indexing by space hierarchy: index parent pages first, then children
- Set reasonable Max Pages limits: start with 100-500 pages for testing

### Search Result Quality

**If search returns few/no results:**

- Lower the cut-off score from 0.5 to 0.35 or 0.3
- Increase search_top from 10 to 20 or 30
- Try rephrasing your query with different keywords
- Verify the indexed content contains relevant information for your query

**For better search quality:**

- Include both pages and attachments for comprehensive coverage
- Use natural language queries rather than exact keyword matches
- Leverage stepback search for complex questions that require reasoning
- Create separate indexes for different content types (public vs internal, different spaces)

### Content-Specific Indexing Tips

**For Knowledge Base Content:**

- Focus on pages with `public` or `documentation` labels
- Include attachments for comprehensive policy and procedure documents
- Consider excluding comments unless they contain valuable information

**For Project Documentation:**

- Use space-specific indexing for better organization
- Include both current and archived content for historical context
- Index meeting notes and project updates separately from technical documentation

**For Troubleshooting Guides:**

- Include pages with labels like `troubleshooting`, `faq`, or `support`
- Index both internal and customer-facing content
- Consider including comments as they often contain additional solutions

---

## References

!!! info "Related Documentation"
    For additional information and detailed setup instructions, see:
    
    - [Indexing Overview](./indexing-overview.md) - General indexing concepts and features
    - [Create a Credential](../../getting-started/create-credential.md) - Step-by-step credential creation guide
    - [How to Use Credentials](../how-to-use-credentials.md) - Credential management and Confluence setup
    - [Toolkits Menu](../../menus/toolkits.md) - Toolkit configuration and management
    - [Confluence Toolkit Integration Guide](../../integrations/toolkits/confluence_toolkit.md) - Complete Confluence toolkit reference
    - [AI Configuration](../../menus/settings/ai-configuration.md) - Vector storage and embedding model setup
    - [Chat Menu](../../menus/chat.md) - Creating conversations and adding toolkit participants

