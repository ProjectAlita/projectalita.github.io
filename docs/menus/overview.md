# Platform Overview

## Main Interface

The ELITEA's main interface encompasses several sections, including the Discover Menu, Search feature, a Quick button for creating new items (conversation, agent, pipeline, collection, toolkit, credential, and bucket, importing entities), Project Selector, Settings, Tags, and Trending Authors.


**Sections:**

1. **Sidebar**: The sidebar drawer allows users to switch among different menus such as Chat, Agents, Pipelines, Collections, Artifacts, Credentials, and Toolkits.
2. **Theme Toggle**: A dark/light mode switcher located in the sidebar that allows users to switch between dark and light themes for optimal viewing experience.
3. **Project Selector**: A dropdown tool for quickly switching among available projects.
4. **+Create button**: A quick button that allows for the rapid creation of a new conversation, agent, pipeline, collection, toolkit, credential, or bucket. 
5. **Chat**: Menu, allowing access to all your private and public conversations, allowing for seamless communication and collaboration.
6. **Agents**: Menu, allowing you to view and manage all the agents you have created, each designed to perform specific tasks using external tools.
7. **Pipelines**: Menu, allowing you to access and manage all the pipelines you have created, design and automate workflows by connecting various nodes, such as conditions, decisions, loops, and tool integrations.
8. **Credentials**: Menu, allowing you to manage authentication credentials for external services and integrations used by your agents and pipelines.
9. **Toolkits**: Menu, allowing you to create and manage custom toolkits that can be used across different agents and pipelines to extend functionality. 
10. **MCPs**: Menu, allowing you to manage external Model Context Protocol (MCP) servers connected via the Elitea MCP Client. Create MCP entries, view their Connected/Disconnected state, enable specific tools, and use them with agents, pipelines, and conversations.
11. **Collections**: Menu, allowing you to manage your collections of agents and pipelines, organized for specific projects or themes.
12. **Artifacts**: Menu, allowing you to utilize the Artifacts feature to create Buckets in ELITEA for saving, updating (appending), reading, and deleting files. Artifacts serve as a temporary file storage solution, enhancing your project's data management capabilities.
13. **Import**: Functionality, allowing users to import agents and pipelines from JSON files.
14. **Socket Connected**: Status indicator showing the real-time connection status to the ELITEA servers, displayed at the bottom of the sidebar.
15. **Settings**: Menu, here, you can configure various project and user-specific settings.
16. **Notifications**: Notification bell allowing users to get notified about various events such as agent publishing status within ELITEA.
17. **User Profile**: User account section displaying the current user's name and avatar, accessible at the bottom of the sidebar for account management.
18. **Status**: Status indicators and filters showing the current state of agents and other entities (e.g., "All", "Draft", "Published" states). 
19. **View Modes**: Cards are displayed in responsive grid layouts that automatically adjust based on screen size and content.
20. **Search**: A Search box available to find agents, pipelines, collections, toolkits, and credentials by their names and descriptions.

    !!! note "Scope"
        The **Search** functionality operates within the selected menu and is not universal across the entire platform.

21. **Tags**: This section displays the tags (categories) associated with the content being viewed. The tags vary depending on the selected menu.
22. **Trending Authors**: Shows the authors who have recently contributed or shared the most trending agents and collections with the community.

![Intro_Main_Interface_Numbered_New](../img/menus/overview/main_interface_numbered_new.png)


## Menus

ELITEA platform consists of the following main menus:

* **Chat** 
* **Agents**
* **Pipelines**
* **Credentials**
* **Toolkits**
* **MCPs**
* **Collections**
* **Artifacts**


**Navigation**:

1. To navigate among the menus, click the **ELITEA** icon on the top left.
2. The **Sidebar** drawer is opened.
3. Click on the menu name to navigate to the desired menu.

![Intro_Main_Discover](../img/menus/overview/discover.png)


### General Navigation and Management Across the Platform

This section provides an overview of the common functionalities and actions available across various menus and pages within the platform. The aim is to ensure a consistent and efficient user experience by maintaining uniformity in navigation and management features across **Private**, **Team** and **Public** projects.

#### **Private** and **Team** projects navigation

In **Private** and **Team** projects you work with the same core menus listed below. In a **Private** project the content is visible only to you. In a **Team** project the entities (conversations, agents, pipelines, etc.) are shared and collaboratively manageable by the team members according to their permissions. The functional menus are:

* **Chat** menu: Access all your private and public conversations, allowing for seamless communication and collaboration.
* **Agents** menu: View and manage all the agents you have created, each designed to perform specific tasks using external tools.
* **Pipelines** menu: Access and manage all the pipelines you have created, design and automate workflows by connecting various nodes, such as conditions, decisions, loops, and tool integrations.
* **Credentials** menu: Manage authentication credentials for external services and integrations used by your agents and pipelines.
* **Toolkits** menu: Create and manage custom toolkits that can be used across different agents and pipelines to extend functionality.
* **MCPs** menu: Manage external MCP servers connected to your project via the Elitea MCP Client. Create MCP entries, monitor their Connected/Disconnected state, enable the tools you need, and use them across agents, pipelines, and conversations.
* **Collections** menu: Manage your collections of agents and pipelines, organized for specific projects or themes.
* **Artifacts** menu: Utilize the Artifacts feature to create Buckets in ELITEA for saving, updating (appending), reading, and deleting files. Artifacts serve as a temporary file storage solution, enhancing your project's data management capabilities.

![Intro_Main_Interface_Numbered_New](../img/menus/overview/project.png)

#### **Public** project navigation

In a **Public** project, you can engage with the community and explore content created by other users through the following sections:

* **Chat** menu: Engage in public conversations, explore shared discussions, and collaborate with the community by adding participants from published agents, pipelines, and other community resources.
* **Agents** menu: Navigate through the Latest agents, explore agents you've liked (My Likes), and discover Trending agents within the community.
* **Pipelines** menu: Discover the Latest pipelines, explore pipelines you've liked (My Likes), and find Trending pipelines shared by the community.
* **Credentials** menu: View credential definitions that have been intentionally published for community reuse (e.g., demo or shared integration keys). Private / sensitive credentials remain restricted and are never exposed in Public projects.
* **Toolkits** menu: Discover publicly shared toolkits that bundle reusable actions or integrations you can leverage in your own agents and pipelines.
* **Collections** menu: Explore the Latest collections, view collections you've liked (My Likes), and discover Trending collections that are gaining attention.
* **Artifacts** menu: Access publicly shared artifact buckets or files generated by published agents and pipelines (read-only). Use them to review outputs, sample data sets, or reference materials shared with the community.

While the context may vary depending on the specific page you're viewing, the core principles of action and functionality remain consistent. This unified approach ensures that whether you are navigating a "Private" or "Team" project, the experience is intuitive and user-friendly, facilitating effective management and exploration of content within the platform.

![Intro_Main_Interface_Numbered_New](../img/menus/overview/publick.png)

### Common Viewing Options

** **Card grid view**: Offers a responsive card-format display of items like agents, pipelines, collections, and toolkits. The layout automatically adjusts the number of columns based on screen size, making it easy to visually scan through content.
* **Table view**: Provides an in-depth look at individual items, presenting extensive details for a comprehensive analysis.

### Search and Filtering Functionality

* **Search**: Seamlessly locate specific items by their name or description using the search feature, which operates within the menu you are currently exploring. This tool is invaluable for quickly finding relevant content across agents, pipelines, collections, toolkits, and credentials.
* **Filtering**: Streamline your search by filtering items using specific tags. This feature is especially useful for discovering content related to particular subjects or themes.

### Sorting Options (Detailed View Only)

* **Name & Description**: Alphabetically organize items by their names, providing an effortless method to find specific titles.
* **Created**: Sort items by their creation date to monitor the chronological development of content or pinpoint the newest additions.
* **Type**: Order items by their defined type (applicable for **Credentials** and **Toolkits** to distinguish categories or implementation kinds).
* **Status**: Order Toolkits by their lifecycle status (e.g., Draft, Published) — applicable only to **Toolkits**.
* **Likes**: Order items by the number of likes they have received. This functionality is applicable for content within **Public** project.
* **Authors**: Sort items by the author's name.

These standardized functionalities across different menus and pages are designed to simplify navigation and enhance the content management process within the platform, promoting a coherent and user-friendly environment.

---

!!! note "Reference"
    For detailed definitions of terms and concepts used throughout the ELITEA platform, please refer to the [ELITEA Glossary](../home/glossary.md).

