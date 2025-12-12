# Organizing Entities in ELITEA

## Introduction

This guide provides a comprehensive overview of **Tags** and **PINs** in ELITEA, powerful features designed to help you organize and manage your **Entities** effectively. In ELITEA, **Entities** refer to **Agents, Pipelines, Credentials, Toolkits, and MCPs** – the core building blocks of your AI-powered workflows. Whether you are working in your **Private** workspace, collaborating within a **Team** project, or contributing to the **Public** project, mastering these organizational tools is key to maximizing your efficiency and leveraging the full potential of ELITEA. This guide will walk you through the concepts, configuration, usage, and best practices for utilizing **Tags** and **PINs**.

**Understanding Project Scopes:**

*   **Private Workspace:** Your personal and private area within ELITEA to create and manage your Entities. Only you have access to your **Private** workspace.
*   **Team Projects:** Collaborative spaces for teams to work together on projects, sharing and managing Entities. Access to Team projects is controlled by project roles and permissions.
*   **Public Project:** A shared, community space within ELITEA where published entities are available for all users to discover and utilize.

## Importance of Organizing Entities in ELITEA

As you build and utilize more Entities within ELITEA, effective organization becomes paramount. Without a robust organizational system, managing a growing number of entities can become challenging, leading to:

*   **Difficulty in Finding Entities:** Spending excessive time searching for the right Prompt, Datasource, or Agent among a long, unorganized list.
*   **Reduced Efficiency:** Slower workflows and decreased productivity due to the time wasted on searching and managing entities.
*   **Inconsistent Naming and Duplication:** Lack of a clear organizational structure can lead to inconsistent naming conventions and accidental duplication of entities, creating clutter and confusion.
*   **Hindered Collaboration:** Sharing and collaborating on entities becomes difficult when they are not properly categorized and organized, hindering team efficiency and knowledge sharing.

**Tags** and **PINs** in ELITEA directly address these challenges by providing intuitive and flexible ways to categorize and organize your AI artifacts, ensuring you can quickly find, utilize, and share the resources you need, when you need them.

## Overview of Tags

In ELITEA, **Tags** are your essential tool for categorizing and labeling individual Entities. Think of tags as keywords or labels that you attach to each Entity, allowing you to create a flexible and searchable organizational system. Tags are designed to:

*   **Categorize Entities:** Assign Entities to relevant categories based on topic, function, project, team, or any other criteria that makes sense for your workflow.
*   **Improve Searchability:** Make it easy to find specific Entities by filtering and searching based on assigned tags.
*   **Enable Flexible Grouping:** Group Entities based on multiple criteria by assigning multiple tags to each item.

**Configuring Tags for Entities:**

1.  **Access Entity Configuration:** Open the configuration settings for the Entity you want to tag.
2.  **Locate "Tags" Input Box:** Within the **Configuration** tab, find the **Tags** input box.
3.  **Add Tags:**
    *   **Type a Tag Name:** Begin typing the desired tag name.
    *   **Select or Create:** Select a suggested tag or create a new one by pressing **Enter**.
4.  **Save Configuration:** Click the **Save** button to save the Entity with the selected tags.

![Tags-Select_Tag](../../img/how-tos/entity-management/organizing-entities/Tags-Select_Tag.png)

**Note on 'code' Tag:**

The tag named `code` is reserved for integration with the Alita Code extension. If you create and assign the tag `code` to Prompts, Agents, or Datasources within your ELITEA project, it enables a special synchronization feature.

**Functionality of the `code` Tag:**

* **Alita Code Extension Connection**: When you set up the Alita Code extension and connect it to your ELITEA project, the extension will recognize and utilize Entities that are tagged with code.
* **Synchronization and Usage in Code Editor**: Entities tagged with code become accessible and usable directly within your IDE through the Alita Code extension. This allows you to seamlessly integrate your ELITEA-managed AI artifacts into your local coding workflows.

**Key Features of Tags:**

*   **Multi-Dimensional Labeling:** Assign multiple tags to each Entity for flexible categorization.
*   **Free-Form Text:** Create custom tags relevant to your specific needs.
*   **Searchable and Filterable:** Easily locate Entities using tag-based search and filtering.
*   **Visual Identification:** Tags are displayed as labels for quick identification.

**Searching and Filtering Entities by Tags:**

*   **Search by Tags:** Use the **Search** bar in any Entity menu (Prompts, Datasources, Agents) and type a tag name to filter the list.
*   **Filter by Tags:** Use the **Tags"** section in entity menus to select tags and narrow down the displayed list.

![Tags_Search_and_Filter](../../img/how-tos/entity-management/organizing-entities/Tags_Search_and_Filter.png)

---

## Overview of PINs

!!! info "Detailed PIN Documentation"
    For comprehensive information about using PINs, including step-by-step instructions, best practices, and FAQs, please refer to the dedicated **[Pin Entities Guide](working-with-pins.md)**.

**PINs** (Pinned Items) in ELITEA provide a simple way to keep your most frequently used entities at the top of their respective lists for quick access. PINs replace the deprecated Collections feature with a more streamlined approach to organizing your workspace.

**Key Benefits of PINs:**

*   **Quick Access:** Keep frequently used entities at the top of lists
*   **Personal Organization:** Each user maintains their own pins
*   **Simple Toggle:** One click to pin, one click to unpin
*   **Persistent:** Pinned items remain at the top across sessions
*   **Universal:** Works across all entity types (Agents, Pipelines, Credentials, Toolkits, MCPs)

**How to Pin Entities:**

Pinning is available in three different views:

*   **Card View:** Hover over an entity card and click the pin icon in the bottom-left corner
*   **Table View:** Hover over an entity row and click the pin icon that appears
*   **Detail View:** Click the pin icon in the toolbar when viewing entity details

**When to Use PINs:**

*   Pin entities you access frequently during active projects
*   Keep 5-10 pinned items per entity type for optimal effectiveness
*   Review and update your pins weekly to keep your workspace current
*   Unpin entities when projects are completed or priorities change

For complete details on pinning entities, unpinning, sorting behavior, and best practices, see the **[Pin Entities Guide](working-with-pins.md)**.

---

## Best Practices and Examples: Organizing Entities in ELITEA

Effective organization with **Tags** and **PINs** is crucial for managing your AI assets in ELITEA. Here are some best practices and examples to guide you:

**Tagging Strategies:**

*   **Tag by Topic or Subject Area:** Examples: `#UserStories`, `#CodeDocumentation`, `#CompetitiveAnalysis`.
*   **Tag by Function or Purpose:** Examples: `#Drafting`, `#Summarization`, `#DataRetrieval`.
*   **Tag by Project or Team:** Examples: `#ProjectAlpha`, `#TeamBeta`, `#MarketingDepartment`.
*   **Tag by User Skill Level:** Examples: `#BeginnerFriendly`, `#AdvancedUsers`.
*   **Maintain Consistency:** Establish and document a consistent tagging system.
*   **Combine General and Specific Tags:** Use a mix of tag granularity for effective categorization.

**Example Tagging Scenarios:**

*   **Prompt: "Draft User Story for Checkout Feature"**: Tags: `#UserStories`, `#Jira`, `#Drafting`, `#BeginnerFriendly`, `#ProjectAlpha`.
*   **Agent: "Confluence Page Publisher"**: Tags: `#Confluence`, `#Publishing`, `#Documentation`, `#TeamBeta`.
*   **Datasource: "Competitor Pricing Data - Web Scraper"**: Tags: `#CompetitiveAnalysis`, `#DataRetrieval`, `#MarketingDepartment`.

**Collection Strategies:**

*   **Group by Use Case or Workflow:** Example: "User Story Management Toolkit."
*   **Group by Project or Client:** Example: "Project Alpha - AI Assets Collection."
*   **Group by Theme or Topic:** Example: "Code Documentation Prompts Collection."
*   **Create "Starter Kits" or Template Collections:** Develop template collections for common tasks.
*   **Curate "Best Practices" Collections:** Share collections showcasing best practices within your organization.

**Example Collection Scenarios:**

*   **Collection: "User Story Management Toolkit"**: Contains Prompts, Agents, and Datasources for user story management.
*   **Collection: "Code Documentation Automation"**: Contains Prompts and Agents for code documentation.
*   **Collection: "Marketing Content Generation - Social Media"**: Contains Prompts and Datasources for social media marketing content.

**Combining Tags and Collections for Optimal Organization:**

*   **Collections for High-Level Grouping:** Use Collections as thematic folders.
*   **Tags for Granular Filtering:** Use Tags for detailed categorization within Collections.
*   **Example:** "Marketing Content Generation" Collection with tags like `#SocialMedia`, `#BlogPosts`, `#EmailMarketing`.


## Useful Links and Materials

To further expand your knowledge and skills in organizing Entities and utilizing Collections within ELITEA, here are some helpful resources:

*   **[ELITEA Public Project Guide](../../features/public-project.md)**:  Explore the ELITEA Public Project to discover and utilize community-shared Prompts and Collections. Learn more about the purpose and guidelines of the Public project.
*   **[Export and Import Guide](../../features/export-import.md)**:  Refer to the detailed Export and Import Guide for in-depth instructions on exporting and importing individual Entities and entire Collections within ELITEA.
**Example Tagging Scenarios:**

*   **Agent: "JIRA Issue Analyzer"**: Tags: `#Jira`, `#Analysis`, `#ProjectAlpha`, `#TeamBeta`.
*   **Pipeline: "Code Review Workflow"**: Tags: `#CodeReview`, `#Automation`, `#Development`.
*   **Toolkit: "Confluence Integration"**: Tags: `#Confluence`, `#Documentation`, `#Publishing`.

**Pinning Strategies:**

*   **Pin Active Project Resources:** Keep entities for current projects pinned for quick access
*   **Limit Pinned Items:** Maintain 5-10 pinned items per entity type for optimal effectiveness
*   **Review Regularly:** Update your pins weekly during project check-ins
*   **Unpin Completed Work:** Remove pins when projects are finished or priorities change
*   **Use for Temporary Organization:** Think of pins as your "working set" of frequently accessed entities

**Example Pinning Scenarios:**

*   **Active Sprint:** Pin the 3-5 agents and pipelines you're using most frequently this week
*   **Project Switch:** Unpin last week's resources and pin entities for the new project
*   **Onboarding:** Pin essential toolkits and credentials needed for daily work
*   **Experimentation:** Pin experimental agents you're actively testing and iterating on

**Combining Tags and PINs for Optimal Organization:**

*   **Tags for Categorization:** Use Tags to create a permanent organizational structure
*   **PINs for Quick Access:** Use PINs to highlight entities you need right now
*   **Example Workflow:** 
    - Tag all agents by project and function
    - Pin the 5 agents you're actively using this week
    - Search by tags when you need to find something specific
    - Adjust pins as your work priorities change---

## Useful Links and Materials

To further expand your knowledge and skills in organizing Entities within ELITEA, here are some helpful resources:

*   **[Pin Entities Guide](working-with-pins.md)**: Comprehensive guide to using PINs for quick access to frequently used entities
*   **[Search Entities](search-entities.md)**: Learn how to efficiently search and filter entities in ELITEA
*   **[Export and Import Guide](../../features/export-import.md)**: Instructions on exporting and importing entities