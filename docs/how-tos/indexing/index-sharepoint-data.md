# Index SharePoint Data

!!! warning "Availability"
    Indexing tools are available in the [Next environment](https://next.elitea.ai) (Release 1.7.0) and replace legacy Datasources/Datasets. For context, see [Release Notes 1.7.0](../../release-notes/rn_current.md#indexing-dedicated-toolkit-indexes-tab) and the [Indexing Overview](./indexing-overview.md).

!!! info "Migration from Datasources"
    In previous releases, there was a **Source type: File** option in Datasources. Now, Datasources have been removed from ELITEA, and users can perform the same action through SharePoint Toolkit indexing.
    
    **How to migrate from Datasources to SharePoint Toolkit:**
    
    1. **Add files to SharePoint**: Upload your documents to SharePoint document libraries or sites (if not already there)
    2. **Set up credentials**: Configure your SharePoint credentials in **Settings** → **Credentials** 
    3. **Create SharePoint Toolkit**: Go to **Toolkits** → **+ Create** → **SharePoint** and configure with your site details
    4. **Index your data**: Use the "Index Data" tool from the SharePoint Toolkit to create searchable indexes
    5. **Search and chat**: Use the toolkit in conversations or agents to query your indexed SharePoint content
    
    This provides the same SharePoint indexing capabilities as the previous Datasources system with improved performance and integration.

This guide provides a complete step-by-step walkthrough for indexing SharePoint data and then searching or chatting with the indexed content using ELITEA's AI-powered tools.

## Overview

SharePoint indexing allows you to create searchable indexes from your SharePoint document management and collaboration content:

- **Documents & Files**: Word documents, PDFs, Excel spreadsheets, PowerPoint presentations, and other file types
- **Document Libraries**: Organized collections of documents with metadata and version control
- **Lists & Custom Data**: Task lists, contact lists, custom data tables, and project tracking information
- **Site Collections**: Multiple SharePoint sites organized under a shared management structure
- **Metadata & Properties**: Document properties, custom fields, and content categorization

**What you can do with indexed SharePoint data:**

- **Semantic Search**: Find documents and content across SharePoint sites using natural language queries
- **Context-Aware Chat**: Get AI-generated answers from your document content with citations to specific files
- **Cross-Site Discovery**: Search across multiple SharePoint sites and document libraries
- **Document Analysis**: Extract insights and summaries from business documents and reports
- **Content Organization**: Analyze document types, usage patterns, and content relationships

**Common use cases:**

- Finding specific documents, policies, or procedures across your organization's SharePoint sites
- Onboarding new employees by allowing them to ask questions about company documents and processes
- Analyzing project documents and extracting key information for reporting and decision-making
- Support teams searching for solutions and documentation from indexed knowledge bases
- Compliance and audit teams finding relevant documents based on content and metadata

---

## Prerequisites

Before indexing SharePoint data, ensure you have:

1. **SharePoint Credential**: An Azure AD app registration with [authentication credentials](../credentials-toolkits/how-to-use-credentials.md#sharepoint-credential-setup) configured in ELITEA
2. **Vector Storage**: PgVector selected in Settings → [AI Configuration](../../menus/settings/ai-configuration.md)
3. **Embedding Model**: Selected in AI Configuration (defaults available) → [AI Configuration](../../menus/settings/ai-configuration.md)
4. **SharePoint Toolkit**: Configured with your SharePoint site details and credentials

### Required Permissions

Your SharePoint credential needs appropriate permissions based on what you want to index:

**For Content Access:**

- Read access to SharePoint sites and document libraries
- Permission to view the specific sites and libraries you want to index

**For Comprehensive Indexing:**

- Access to view document content and metadata
- Permission to access both public and restricted content (based on your requirements)
- Ability to read from multiple document libraries and lists

**Authentication Methods:**

- **Azure AD App Registration**: Client ID and Client Secret for application-only access
- **Delegated Permissions**: For user-context access (alternative approach)

---

## Step-by-Step: Creating a SharePoint Credential

1. **Register App in Azure AD**: Create an Azure AD app registration with appropriate SharePoint permissions
2. **Generate Client Secret**: Create a client secret for secure authentication
3. **Grant Site Permissions**: Use SharePoint's AppInv.aspx to grant site-level permissions
4. **Create Credential in ELITEA**: Navigate to **Credentials** → **+ Create** → **SharePoint** → enter details and save

!!! info "Detailed Instructions"
    For complete credential setup steps including Azure AD app registration, permissions, and security best practices, see:
    
    - [Create a Credential](../../getting-started/create-credential.md)
    - [SharePoint Credential Setup](../credentials-toolkits/how-to-use-credentials.md#sharepoint-credential-setup)
    - [SharePoint Toolkit Integration Guide](../../integrations/toolkits/sharepoint_toolkit.md)

---

## Step-by-Step: Configure SharePoint Toolkit

1. **Create Toolkit**: Navigate to **Toolkits** → **+ Create** → **SharePoint**
2. **Configure Settings**: Set SharePoint site URL and assign your SharePoint credential
3. **Enable Tools**: Select `Index Data`, `List Collections`, `Search Index`, `Stepback Search Index`, `Stepback Summary Index`, and `Remove Index` tools
4. **Save Configuration**

### Tool Overview:
   - **Index Data**: Creates searchable indexes from SharePoint documents and content
   - **List Collections**: Lists all available collections/indexes to verify what's been indexed
   - **Search Index**: Performs semantic search across indexed content using natural language queries
   - **Stepback Search Index**: Advanced search that breaks down complex questions into simpler parts for better results
   - **Stepback Summary Index**: Generates summaries and insights from search results across indexed content
   - **Remove Index**: Deletes existing collections/indexes when you need to clean up or start fresh

!!! info "Detailed Instructions"
    For complete toolkit configuration including site URL setup and authentication options, see:
    
    - [Toolkits Menu](../../menus/toolkits.md)
    - [SharePoint Toolkit Integration Guide](../../integrations/toolkits/sharepoint_toolkit.md)

---

## Step-by-Step: Index SharePoint Data

!!! info "Primary Interface"
    All indexing operations are performed via the **Indexes Tab Interface**. This dedicated interface provides comprehensive index management with visual status indicators, real-time progress monitoring, and integrated search capabilities.

!!! warning "Requirements"
    Before proceeding, ensure your project has PgVector and Embedding Model configured in Settings → AI Configuration, and your SharePoint toolkit has the **Index Data** tool enabled.

### Step 1: Access the Interface

1. **Navigate to Toolkits**: Go to **Toolkits** in the main navigation
2. **Select Your SharePoint Toolkit**: Choose your configured SharePoint toolkit from the list
3. **Open Indexes Tab**: Click on the **Indexes** tab in the toolkit detail view

If the tab is disabled or not visible, verify that:
- PgVector and Embedding Model are configured in Settings → AI Configuration
- The **Index Data** tool is enabled in your toolkit configuration

### Step 2: Create a New Index

1. **Click Create New Index**: In the Indexes sidebar, click the **+ Create New Index** button
2. **New Index Form**: The center panel displays the new index creation form

### Step 3: Configure Index Parameters

Fill in the required and optional parameters for your SharePoint indexing:

| Parameter | Required | Description | Example Value |
|-----------|----------|-------------|---------------|
| Index Name | ✓ | Suffix for collection name (max 7 chars) | `docs` or `files` |
| Clean Index | ✗ | Remove existing index data before re-indexing | ✓ (checked) or ✗ (unchecked) |
| Progress Step (0 - 100) | ✗ | Step size for progress reporting during indexing | `10` or `25` |
| Chunking Config | ✗ | Configuration for document chunking | Default or custom settings |
| limit_files | ✗ | Maximum number of files to index | `1000` (default) |
| include_extensions | ✗ | File extensions to include in indexing | `["*.docx", "*.pdf", "*.xlsx"]` |
| skip_extensions | ✗ | File extensions to skip when processing | `["*.exe", "*.zip", "*.png"]` |

### Step 4: Start Indexing

1. **Form Validation**: The **Index** button remains inactive until all required fields are filled
2. **Review Configuration**: Verify all parameters are correct
3. **Click Index Button**: Start the indexing process
4. **Monitor Progress**: Watch real-time updates with visual indicators:
      - 🔄 **In Progress**: Indexing is currently running
      - ✅ **Completed**: Indexing finished successfully
      - ❌ **Failed**: Indexing encountered an error

![Indexes tab](../../img/how-tos/indexing/sharepoint/sharepoint-index-tab.png)

!!! info "Alternative: Test Settings Method"
    For quick testing and validation, you can also use the **Test Settings** panel on the right side of the toolkit detail page. Select a model, choose the **Index Data** tool from the dropdown, configure parameters, and click **Run Tool**. However, the Indexes Tab Interface is the recommended approach for comprehensive index management.


### Step 5: Verify Index Creation

After indexing completes, verify the index was created successfully:

1. **Check Index Status**: Visual indicators show completion status
2. **Review Index Details**: Click on the created index to see metadata and document count
3. **Test Search**: Use the **Run** tab to test search functionality with sample queries

---

## Search and Chat with Indexed Data

Once your SharePoint data is indexed, you can use it in multiple ways:

### Using the Indexes Interface

**Direct Search via Indexes Tab:**

1. **Access Indexes Tab**: Navigate to your SharePoint toolkit → **Indexes** tab
2. **Select Index**: Click on your created index from the sidebar
3. **Open Run Tab**: Click the **Run** tab in the center panel
4. **Choose Search Tool**: Select from available search tools:
      - **Search Index**: Basic semantic search
      - **Stepback Search Index**: Advanced search with question breakdown
      - **Stepback Summary Index**: Summarized insights from search results
5. **Enter Query**: Type your natural language question
6. **View Results**: See responses with citations to specific SharePoint documents

![Run search](../../img/how-tos/indexing/sharepoint/sharepoint-index-run.png)

### Using Toolkit in Conversations and Agents

Your SharePoint toolkit can be used in two main contexts:

1. **In Conversations**: Add the toolkit as a participant to ask questions and search your indexed SharePoint data
2. **In Agents**: Include the toolkit when creating AI agents to give them access to your document data

**How to use:**

- **Start a New Conversation or Create an Agent**
- **Add Toolkit as Participant**: Select your SharePoint toolkit from the available toolkits
- **Ask Natural Language Questions**: The toolkit will automatically search your indexed data and provide relevant answers with citations

### Real-Life Example Workflow

Let's walk through a complete example of indexing and using a company's SharePoint document library:

**Step 1: Setup SharePoint Toolkit for Document Management**

**Step 2: Use in Conversations**

   Add toolkit to a conversation and start asking questions:

  - Navigate to **Conversations** → **+ New Conversation**
  - In the participants section click + to add Toolkit
  - Select your SharePoint toolkit from the available toolkits list

**Step 3: Index the Document Library**

 * **User Request in Chat:**
 
     > "Index all documents from our SharePoint site with suffix 'docs'. Include Word and PDF files but skip image files. Clean any existing index first."

   ![SharePoint Index Chat](../../img/how-tos/indexing/sharepoint/sharepoint-index-chat.png)

**Step 4: Verify Index Creation**

 * **User Request in Chat:**
 
     > "List my collections"

 * **SharePoint Toolkit Response:**

![SharePoint List](../../img/how-tos/indexing/sharepoint/sharepoint-list-collections.png)

 This confirms the indexing completed successfully and your document collection is available for searching.

**Step 5: Start the conversation and begin asking questions about your indexed content**

  * **User:** "What are the key points from our Q3 financial report?"
   
  * **SharePoint Toolkit:** "Based on your indexed documents, here are the key points from the Q3 financial report:
   
    1. **Revenue Growth**: 15% increase compared to Q2, reaching $2.3M total revenue
    2. **Cost Management**: Operating expenses reduced by 8% through efficiency initiatives
    3. **Market Expansion**: Successful launch in two new regional markets contributing 12% of revenue
   
   *Source: Q3_Financial_Report.pdf (Created: 2024-10-15, Modified: 2024-10-20)*"

   ![SharePoint Search](../../img/how-tos/indexing/sharepoint/sharepoint-index-search.png)
   
  * **User:** "Find me the latest project management templates"
   
  * **SharePoint Toolkit:** "Here are the latest project management templates from your indexed documents:
   
    **Templates Found:**

     1. **Project Charter Template v3.2**: Comprehensive project initiation document with stakeholder analysis
     2. **Sprint Planning Template**: Agile project management with backlog and capacity planning
     3. **Risk Management Matrix**: Template for identifying and tracking project risks
   
    **Template Features:**

     1. Pre-formatted sections for scope, objectives, and deliverables
     2. Built-in formulas for timeline and resource calculations
     3. Integration with company branding and approval workflows
   
   *Sources: Project_Charter_Template_v3.2.docx, Sprint_Planning_Template.xlsx, Risk_Management_Matrix.xlsx*"


## Troubleshooting & Tips

### Common Errors and Solutions

**"Indexes tab not visible" or "Tab disabled":**

- Verify PgVector and Embedding Model are configured in Settings → AI Configuration
- Ensure the **Index Data** tool is enabled in your SharePoint toolkit configuration
- Check that your toolkit supports indexing (SharePoint is supported)
- Refresh the browser page and retry

**"+ Create New Index button not working":**

- Verify all project-level prerequisites are met (PgVector and Embedding Model)
- Check that you have proper permissions for the toolkit
- Ensure the toolkit is properly saved with credentials

**"Authentication failed" or "Unauthorized access":**

  - Verify your SharePoint credential has the correct Client ID and Client Secret
  - Ensure your Azure AD app registration has appropriate permissions for SharePoint access
  - Check that admin consent has been granted for the application permissions
  - Verify the SharePoint site URL format includes `https://` and the complete site path

**"Site not found" or "Access denied to site":**

  - Verify the SharePoint site URL is correct and accessible
  - Ensure your Azure AD app has been granted permissions to the specific site collection using AppInv.aspx
  - Check that the site collection exists and is not archived or deleted
  - Confirm your app registration has the necessary SharePoint API permissions

**"No files indexed" or "Empty document library":**

  - Check that the document library contains accessible files
  - Verify file extensions are not being filtered out by Skip Extensions parameter
  - Ensure your app has read permissions to the document library
  - Try indexing without extension filters first, then add restrictions

**"Vector database connection failed" or "PgVector errors":**

  - Ensure PgVector is properly configured in Settings → AI Configuration
  - Verify the vector database is running and accessible
  - Check connection credentials and database permissions
  - Restart the vector database service if connection issues persist

**"File processing errors" or "Document parsing failures":**

  - Large files may cause timeouts; consider using file size limits or Skip Extensions
  - Binary files (executables, archives) should be excluded via Skip Extensions
  - Check available storage space for the vector database
  - Verify document formats are supported (Word, PDF, Excel, PowerPoint, text files)

### Performance and Scope Considerations

**For Large SharePoint Sites:**

- Use file type filters: `Include Extensions: ["*.docx", "*.pdf", "*.xlsx"]`
- Set reasonable file limits: start with 500-1000 files for testing
- Consider indexing by document library: create separate indexes for different libraries
- Index by content type: separate indexes for documents vs. lists vs. archived content

### Search Result Quality

**If search returns few/no results:**

- Lower the cut-off score from 0.5 to 0.35 or 0.3
- Increase search_top from 10 to 20 or 30
- Try rephrasing your query with document-specific terms (file names, content types)
- Verify the indexed content contains relevant information for your query

**For better search quality:**

- Include multiple document types for comprehensive coverage
- Use natural language queries rather than exact file names
- Leverage stepback search for complex business questions that require reasoning
- Create separate indexes for different content types (current vs archived, public vs restricted)

### Content-Specific Indexing Tips

**For Business Documents:**

- Focus on current documents: exclude outdated templates and archived files
- Include metadata-rich content: documents with proper titles, descriptions, and tags
- Index both working documents and finalized reports for complete coverage

**For Project Management:**

- Include project templates, status reports, and planning documents
- Index across multiple project sites for portfolio-level insights
- Consider including both active and completed projects for lessons learned

**For Knowledge Management:**

- Include policy documents, procedures, and training materials
- Index FAQ documents and troubleshooting guides for support scenarios
- Focus on documents with high business value and frequent access patterns

---

## References

!!! info "Related Documentation"
    For additional information and detailed setup instructions, see:
    
    - [Indexing Overview](./indexing-overview.md) - General indexing concepts and features
    - [Create a Credential](../../getting-started/create-credential.md) - Step-by-step credential creation guide
    - [How to Use Credentials](../credentials-toolkits/how-to-use-credentials.md) - Credential management and SharePoint setup
    - [Toolkits Menu](../../menus/toolkits.md) - Toolkit configuration and management
    - [SharePoint Toolkit Integration Guide](../../integrations/toolkits/sharepoint_toolkit.md) - Complete SharePoint toolkit reference
    - [AI Configuration](../../menus/settings/ai-configuration.md) - Vector storage and embedding model setup
    - [Chat Menu](../../menus/chat.md) - Creating conversations and adding toolkit participants

