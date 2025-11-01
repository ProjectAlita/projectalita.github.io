# Migrate Datasources to Indexing

## Overview

This guide explains how to migrate your existing **Datasources** from the **Nexus environment** to **Indexing** in the **Next environment**. The new indexing system provides better performance, more flexibility, and standardized tools across all supported platforms.

### What Changed: Datasources → Indexing

**Before (Nexus - Datasources):**

- Datasources were standalone entities that created datasets
- Limited to specific data types and configurations
- Separate entity management outside of toolkits
- Fixed chunking and processing options

**Now (Next - Indexing):**

- Indexing is integrated directly into Toolkits
- Standardized tools available across all supported platforms
- Flexible collection management and naming
- Advanced search capabilities with stepback search
- Better chunking and metadata handling

!!! warning "Deduplication Deprecated"
    The **Deduplication** feature available in Datasources is deprecated and not available in the new Indexing system. Focus on using the improved search and filtering capabilities of the new indexing tools instead.

---

## Migration Process Overview

### Step 1: Identify Your Current Datasources

In the Nexus environment, review your existing datasources to understand:

- What type of data each datasource indexes (Jira, Confluence, Files, etc.)
- The scope and filters used in each datasource
- Which agents or pipelines use these datasources

### Step 2: Set Up Prerequisites in Next Environment

Before migrating, ensure you have:

1. **Credentials**: Migrate or recreate your credentials in the Next environment
2. **Vector Storage**: Configure PgVector in Settings → [AI Configuration](../../menus/settings/ai-configuration.md)
3. **Embedding Model**: Select an embedding model in [AI Configuration](../../menus/settings/ai-configuration.md)

### Step 3: Create Corresponding Toolkits

Create the appropriate toolkits in the Next environment based on your datasource types:

- **File/Table** → **[Artifact Toolkit](../../integrations/toolkits/artifact_toolkit.md)** or **[SharePoint Toolkit](../../integrations/toolkits/sharepoint_toolkit.md)**
- **Jira** → **[Jira Toolkit](../../integrations/toolkits/jira_toolkit.md)**
- **Confluence** → **[Confluence Toolkit](../../integrations/toolkits/confluence_toolkit.md)**
- **Git** → **[GitHub Toolkit](../../integrations/toolkits/github_toolkit.md)**

### Step 4: Index Your Data

Use the **Index Data** tool in each toolkit to recreate your indexed content with improved capabilities.

---

## Migration Examples by Datasource Type

### File/Table Datasources → Artifacts or SharePoint Indexing

**What you had in Nexus:**

- File datasources that indexed documents, spreadsheets, or text files
- Table datasources for structured data or spreadsheets
- Basic file content extraction and tabular data indexing

**What to do in Next:**

**Option A: Use SharePoint Indexing**

1. **Upload files to SharePoint** (if not already there):
     - Upload your files (documents, Excel, CSV, etc.) to your SharePoint site/library
     - Ensure files are accessible with your SharePoint credentials
2. **Create SharePoint Credential**:
     - Create credential in **Credentials** → **+ Create** → **[SharePoint](../../how-tos/credentials-toolkits/how-to-use-credentials.md#sharepoint-credential-setup)**
3. **Create SharePoint Toolkit** with your SharePoint credentials
4. **Index SharePoint files** containing your data:
     - Select **Index Data** tool and specify indexing parameters (e.g., collection suffix, file type filters, etc.)
5. **Advanced Search Capabilities**:
     - Use **Stepback Search Index** for complex document queries
     - Search across multiple SharePoint libraries with semantic understanding

**Option B: Use Artifacts Indexing (for local files)**

1. **Upload files to Artifacts**: 
     - Navigate to **Artifacts** → **+ Create** bucket
     - Upload your files to the artifact bucket

2. **Create Artifact Toolkit**:
     - Navigate to **Toolkits** → **+ Create** → **Artifact**
     - Specify the bucket name containing your files
     - Enable indexing tools: `Index Data`, `Search Index`, `Stepback Search Index`, `Stepback Summary Index`, `List Collections`, `Remove Index`

3. **Index your artifact data**:
     - Use **Index Data** tool and specify indexing parameters (e.g., collection suffix, chunking method, clean index option, file filters, etc.)
4. **Advanced Search Capabilities**:
     - Use **Stepback Search Index** for complex document queries
     - Search across multiple artifact buckets with semantic understanding
     

!!! info "Detailed Instructions"
    For complete step-by-step instructions, see: 

       - **[Index SharePoint Data](../../how-tos/indexing/index-sharepoint-data.md)**
       - **[Index Artifacts Data](../../how-tos/indexing/index-artifacts-data.md)**

---

### Jira Datasources → Jira Indexing

**What you had in Nexus:**

- Jira datasources that indexed issues, stories, comments, and attachments
- Project-based or JQL-filtered content

**What to do in Next:**

1. **Create Jira Credential**:
     - Use your existing Jira API token (or generate a new one if needed)
     - Create credential in **[Credentials](../../how-tos/credentials-toolkits/how-to-use-credentials.md#jira-credential-setup)** → **+ Create** → **Jira**

2. **Create Jira Toolkit**:
     - Navigate to **Toolkits** → **+ Create** → **Jira**
     - Configure with your Jira instance URL and credentials
     - Enable indexing tools: `Index Data`, `Search Index`, `Stepback Search Index`, `Stepback Summary Index`, `List Collections`, `Remove Index`

3. **Index Jira Data**:
     - Use **Index Data** tool and specify indexing parameters (e.g., collection suffix, project keys or JQL queries, etc.)

4. **Enhanced Search Capabilities**:
      - Use **Stepback Search Index** for complex queries
      - Search across multiple projects with natural language

!!! info "Detailed Instructions"
    For complete step-by-step instructions, see: **[Index Jira Data](../../how-tos/indexing/index-jira-data.md)**

---

### Confluence Datasources → Confluence Indexing

**What you had in Nexus:**

- Confluence datasources that indexed pages, spaces, and attachments
- Space-based or label-filtered content

**What to do in Next:**

1. **Create Confluence Credential**:
     - Use your existing Confluence API token (or generate a new one if needed)
     - Create credential in **Credentials** → **+ Create** → **[Confluence](../../how-tos/credentials-toolkits/how-to-use-credentials.md#confluence-credential-setup)**

2. **Create Confluence Toolkit**:
     - Navigate to **Toolkits** → **+ Create** → **Confluence**
     - Configure with your Confluence instance and credentials
     - Enable indexing tools: `Index Data`, `Search Index`, `Stepback Search Index`, `Stepback Summary Index`, `List Collections`, `Remove Index`

3. **Index Confluence Data**:
     - Use **Index Data** tool and specify indexing parameters (collection suffix, space keys, content filters, etc...)
4. **Advanced Documentation Search**:
     - Use **Stepback Summary Index** for documentation analysis
     - Search across multiple spaces with semantic queries

!!! info "Detailed Instructions"
    For complete step-by-step instructions, see: **[Index Confluence Data](../../how-tos/indexing/index-confluence-data.md)**

---

### Git Datasources → Repository Indexing

**What you had in Nexus:**

- Git datasources that indexed code repositories, documentation, and commit history
- Branch-based or repository-wide content indexing
- Basic code and documentation search

**What to do in Next:**

1. **Create Repository Credential**:
     - Use your existing GitHub Personal Access Token (or generate a new one if needed)
     - Create credential in **Credentials** → **+ Create** → **[GitHub](../../how-tos/credentials-toolkits/how-to-use-credentials.md#github-credential-setup)**

2. **Create Repository Toolkit**:
    - Navigate to **Toolkits** → **+ Create** → **GitHub**
     - Configure with your repository URL and credentials
     - Enable indexing tools: `Index Data`, `Search Index`, `Stepback Search Index`, `Stepback Summary Index`, `List Collections`, `Remove Index`

3. **Index Repository Data**:
     - Use **Index Data** tool and specify indexing parameters (collection suffix, branch name, file type filters, etc.)

4. **Enhanced Code and Documentation Search**:
     - Use **Stepback Search Index** for complex code analysis queries
     - Search across multiple GitHub repositories with semantic understanding
     - Find code patterns, documentation, and implementation examples

!!! info "Detailed Instructions"
    For complete step-by-step instructions, see: **[Index Repository Data](../../how-tos/indexing/index-github-data.md)**

---

## Key Improvements in Indexing

### Better Search Capabilities

**New search tools available:**

- **Search Index**: Basic semantic search across indexed content
- **Stepback Search Index**: Advanced search that breaks down complex questions for better results
- **Stepback Summary Index**: Search with automatic summarization of results
- **List Collections**: View all available indexed collections
- **Remove Index**: Clean up or refresh indexed data

### Improved Organization

**Collection Management:**

- Use meaningful collection suffixes to organize different types of content
- Create multiple indexes for different scopes or time periods
- Better naming conventions for easier discovery

### Enhanced Integration

**Toolkit Integration:**

- Indexing tools are built into each toolkit
- Consistent experience across all platforms
- Direct integration with conversations and agents

---

## Migration Checklist

### Before You Start

- ☐ Review all existing datasources in Nexus environment
- ☐ Document the scope and purpose of each datasource
- ☐ Identify which agents/pipelines use each datasource
- ☐ Plan your new collection naming strategy

### Setting Up Next Environment

- ☐ Configure Vector Storage (PgVector) in AI Configuration
- ☐ Select Embedding Model in AI Configuration
- ☐ Recreate or migrate credentials for each data source
- ☐ Create appropriate toolkits for each data type

### Migration Process

- ☐ Start with most critical datasources first
- ☐ Create indexes using the Index Data tool in each toolkit
- ☐ Test search functionality with sample queries
- ☐ Update agents and pipelines to use new toolkits
- ☐ Verify search results match expected content

### Post-Migration

- ☐ Remove references to old datasources in agents/pipelines
- ☐ Train team members on new indexing tools
- ☐ Establish process for maintaining and updating indexes
- ☐ Consider creating multiple collections for better organization

---

## Getting Help

If you encounter issues during migration:

1. **Check Prerequisites**: Ensure vector storage and embedding models are properly configured
2. **Review Toolkit Configuration**: Verify credentials and connection settings
3. **Test with Small Scope**: Start with a small subset of data to validate the process
4. **Consult Documentation**: Each indexing guide provides troubleshooting for specific platforms

!!! info "Related Documentation"
    For platform-specific guidance and detailed troubleshooting:
    
    - **[Indexing Overview](../../how-tos/indexing/indexing-overview.md)** - *Complete guide to indexing system and capabilities*
    - **[Indexing Tools](../../how-tos/indexing/indexing-tools.md)** - *Detailed reference for all indexing tools*
    - **[Index Artifacts Data](../../how-tos/indexing/index-artifacts-data.md)** - *Index files and documents*
    - **[Index Jira Data](../../how-tos/indexing/index-jira-data.md)** - *Index Jira issues and project data*
    - **[Index Confluence Data](../../how-tos/indexing/index-confluence-data.md)** - *Index Confluence pages and spaces*
    - **[Index SharePoint Data](../../how-tos/indexing/index-sharepoint-data.md)** - *Index SharePoint files and sites*
    - **[Index Repository Data](../../how-tos/indexing/index-github-data.md)** - *Index GitHub repositories*
    - **[AI Configuration](../../menus/settings/ai-configuration.md)** - *Configure vector storage and embedding models*
    - **[Create a Credential](../../getting-started/create-credential.md)** - *Set up authentication for data sources*
    - **[Toolkits Menu](../../menus/toolkits.md)** - *General toolkit configuration guide*

---
