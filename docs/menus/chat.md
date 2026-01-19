# Conversations

## Introduction

ELITEA Chat is an ultimate feature, allowing you to combine all ELITEA features in one place and achieve the best output and results.

In the ELITEA framework, a conversation is a dialogue among various participants such as selected language models, agents, pipelines and human users. The chat uses natural language to interact with a human and receive/give feedback. Within one conversation, you can refer to previous questions and answers. However, different conversations don’t share context.

All your conversations are stored on the ELITEA server, and you can access them from any device you use. All your conversations are accessible from the **Chat** menu.

Conversations support the following functionality:

* **Project and Private Conversations**: Share your conversation with other users from your project, involve them in the same conversation, or keep it private and visible only to you.
* **Participants**: Add various participants to the conversation, including other users in public conversations, agents, pipelines, toolkits, MCPs, and language models, making them part of the conversation.
* **Create and Edit Entities**: Create and edit entities directly from the conversation (Agents, Pipelines, Toolkits, MCPs) without leaving the chat interface.
* **Canvas Mode**: Visualize and interact with conversation flows using a graphical canvas interface. 
* **Interactions**: Interact with added participants, copy generated responses, and more.
* **Managing Conversations**: Save conversations, pin the most important ones at the top of the screen, make private conversations public, delete conversations, clean the content of the conversation, and export the context of the conversation.
* **Folders**: Organize your conversations into folders for better management. You can create folders, move conversations to folders, edit folder names, or delete folders.
* **Playback**: During playback, you can move backward and forward through the playback process or stop the conversation by simulating the current conversation without any engagement with models.


For more details see [Chat Usage](../how-tos/chat-conversations/how-to-use-chat-functionality.md).

## Creating a Conversation

1. Go to the **Chat** section in the left sidebar.
2. Click the **+ Create** button at the top.
3. The chat input field appears and is highlighted to focus your attention.
4. Type your first message in the input field.
5. Press **Send** (or press Enter).
6. The new conversation is created and appears in the **CONVERSATIONS** sidebar.
7. The conversation name is automatically generated based on your message content. During name generation (1-2 seconds), you'll see a loader icon with "Naming" text next to the conversation item.

![Create_Conversation](<../img/menus/chat/create-conversation.gif>){: loading=lazy }

!!! tip "Quick Start"
    You can optionally add participants (agents, pipelines, or models) before sending your first message by typing **#** followed by the participant name, or by using the participant panel on the right.

**Conversation Sorting and Organization**

Conversations in the **CONVERSATIONS** sidebar are automatically organized by time periods for better navigation:

* **Today**: Conversations created or active today appear at the top.
* **Yesterday**: Conversations from the previous day are grouped together.
* **This Week**: Conversations from the current week are grouped together.
* **Older**: All conversations older than yesterday are grouped under this section.

This automatic time-based sorting helps you quickly locate recent conversations and maintain an organized conversation history. Pinned conversations will always appear at the very top, regardless of their creation date.


## Creating a Folder

1. Click the **+ Folder** button located at the top of the **CONVERSATIONS** sidebar.
2. Provide a **Name** for the folder.
3. Click **Save** to create the folder. The new folder will appear in the **CONVERSATIONS** sidebar.

![Chat_Create_Folder](<../img/menus/chat/create-folder.gif>){: loading=lazy }

**How to Move Conversations to a Folder**

1. Right-click on the conversation you want to move.
2. Select **Move to** from the contextual menu.
3. Choose the target folder from the list. If no folder exists, you can create one by clicking **+ New Folder**.

!!! tip "Quick Organization"
      Alternatively, you can drag and drop conversations directly into folders in the sidebar for quick organization.

![Chat_MoveTo_Folder](../img/menus/chat/moveto-folder.gif){: loading=lazy }

**How to Move Conversations Back to the Main List**

To move conversations from folders back to the main **CONVERSATIONS** list:

1. Navigate to the folder containing the conversation you want to move.
2. Right-click on the conversation inside the folder.
3. Select **Back to the list** from the contextual menu.
4. The conversation will be moved from the folder back to the main **CONVERSATIONS** list.

  ![Chat_MoveTo_list](<../img/menus/chat/moveto-list.gif>){: loading=lazy }

!!! tip "Quick Organization"
      Alternatively, you can drag and drop conversations directly into folders in the sidebar for quick organization.
!!! note "Note"
      This action is only available if you are a member of the conversation or have the necessary permissions.


## Private and Public Conversations/Folders

**Private Conversations and Folders**

* When creating a conversations in a private project, you can add all types of participants, except users.
* These folders and their contents are only accessible to you.

**Team Project Conversations and Folders**

If you are part of a team project:

* You can view all folders within the project.
* You can only see conversations inside folders if you are a member of those conversations.
* If you are a member of a conversation, you can move the conversation into a folder or remove it from the folder using the **Back to the list** option.
* You cannot delete a folder created by others, but you can move conversations inside the folder if you are a member of those conversations.

**Public Conversations and Folders**

* Public folders are accessible to all members of the project.
* Conversations within public folders can be viewed and interacted with by all project members.
* Any member of the project can move conversations into public folders or remove them, depending on their permissions.
* Public folders cannot be converted to private folders.

## Participants

Participants are additional "tools" that can be added to the conversation to enhance it. The following types of participants are available:

* **Models**: LLM models which can be added to the conversation to interact with Gen AI and get responses from the selected model.
* **Agents/Pipelines**: Agents or pipelines—either already created within the project or available as public resources—that can be added to the conversation to execute them and receive responses.

!!! note "Note"
      Another category of participant is the user, which can't be added, but in the case of public conversations, users within the project can follow the conversation, interact with it, and thus become participants.


### How to Add Users to a Conversation
1. In the **PARTICIPANTS** panel, click the users icon next to your avatar.
2. Select **Add users** from the dropdown menu.
3. The **Add users** modal will appear with a search bar.
4. Use the search bar to find teammates by name.
5. Select one or more users from the list by clicking on them.
6. Click **Add** to confirm. The selected users will be added as participants to your chat.
7. Added users will appear in the **PARTICIPANTS** section.  Hover over user avatars in the participant list or type **@username** in the chat input to mention and notify teammates in the conversation. To mention everyone in the conversation, select the **All Users** option.
   ![Add User](<../img/menus/chat/add-user.gif>){: loading=lazy }        

!!! note "Note"
      * Users can be removed by hovering over their name in the participants list and clicking the remove icon.
      * Users will receive notifications when they are added as participants in a conversation.


### Adding Participants (Agents, Pipelines, Toolkits, MCPs)

You can add various AI participants to enhance your conversations:

**Method 1: Using the Participants Panel**

1. In the **PARTICIPANTS** section on the right side of the screen, you'll see collapsible sections for:
   - **agents**
   - **pipelines**
   - **toolkits**
   - **MCPs**
2. Click the **+** icon next to any section title to add participants of that type.
3. Select the desired participant from the list (e.g., an Agent, Pipeline, Toolkit, or MCP).
4. The selected participant will appear in the **PARTICIPANTS** panel.
5. Click on a participant in the list to activate and interact with it.

![Add participants](../img/menus/chat/add-participants-section.gif){: loading=lazy }

**Method 2: Using the # Symbol (Quick Access)**

1. In the chat input box, type `#` to see a dropdown list of frequently used participants.
2. Continue typing to filter participants by name (e.g., `#Jira` will show all Jira-related participants).
3. Select a participant from the filtered list (e.g., `#Data Analysis Agent`, `#Jira Toolkit`).
4. The selected participant will appear as a chip above the input box and in the **PARTICIPANTS** panel.

![Add participants](../img/menus/chat/add-participants-search.gif){: loading=lazy }

**Creating New Participants:**

You can also create new participants directly from the chat interface:

* **Agents**: Click **Create new agent** in the agents section to open the Agent Canvas
* **Pipelines**: Click **Create new pipeline** in the pipelines section to open the Pipeline Canvas
* **Toolkits**: Click **+ Create new Toolkit** in the toolkits section to configure integrations
* **MCPs**: Click **Create new MCP** in the MCPs section to connect Model Context Protocol servers
![Create New Participants](../img/menus/chat/canvas-create.gif)


**Managing Participants:**

* To remove a participant, hover over their card in the **PARTICIPANTS** list and click the remove icon.
* All participants appear in the right sidebar for easy switching between them.

## Display Configured Conversation Starter

When you add a participant to a conversation, the configured conversation starter for that participant will automatically display in the chat. This feature improves usability and ensures a smooth start to conversations by providing immediate context and guidance on how to interact with each participant.

![Conversation Starter](<../img//menus/chat/conversation-starter.gif>){: loading=lazy }

## Internal Tools

Internal tools provide built-in capabilities that enhance your conversations without requiring external integrations. These tools can be enabled directly from the chat interface or configured as part of an agent's default setup.

**Available Internal Tools:**

* **[Python Sandbox](../how-tos/chat-conversations/python-sandbox-internal-tool.md)**: Execute Python code securely in conversations using Pyodide (Python compiled to WebAssembly). Useful for calculations, data processing, testing algorithms, and generating visualizations.
* **[Planner](../how-tos/chat-conversations/planner-internal-tool.md)**: Create, manage, and track tasks and action items directly within conversations. Set priorities, due dates, and monitor task progress without switching to external task management tools.
* **[Data Analysis](../how-tos/chat-conversations/data-analysis-internal-tool.md)**: Perform Pandas-based data analysis on uploaded files (CSV, Excel, etc.) using natural language queries. Automatically processes data and generates charts with downloadable results.

**Enabling Internal Tools:**

1. Navigate to your conversation
2. Locate the **Internal Tools** icon (value icon) in the chat input toolbar at the bottom of the screen, next to the attachment button
3. Click the Internal Tools icon to open the configuration popup
4. Find the tool you want to enable in the list
5. Click the toggle switch next to the tool name to enable it
6. A success notification will appear: "Internal tools configuration updated"
7. Click anywhere outside the popup to close it

![Enabling Internal Tools](<../img//menus/chat/enable-internal-tools.gif>){: loading=lazy }

Once enabled, the AI assistant can automatically use these tools during conversations when appropriate.

!!! tip "Agent Configuration"
    You can also enable internal tools as part of an agent's default configuration in the **TOOLKITS** section. This makes the tools available in all new conversations using that agent.

## Attachments in Conversations

Attach files and images directly to chat conversations for AI-powered analysis. This feature enables multimodal interactions where AI can process visual content, documents, and data files alongside text-based queries.

**Key Capabilities:**

* **Image Analysis**: Upload images for visual analysis, OCR, content extraction, and AI-powered interpretation
* **Document Processing**: Attach documents for content indexing, semantic search, and information retrieval
* **Data Files**: Upload CSV, JSON, and other data formats for analysis and processing
* **Multiple Upload Methods**: Click to browse, drag-and-drop, or paste from clipboard
* **Centralized Storage**: All attachments stored in Artifact buckets with configurable retention policies

**How Attachments Work:**

The attachment functionality is integrated with the **Artifact Toolkit**. When you enable attachments, you must link it to an Artifact Toolkit. Every file you attach is automatically uploaded and stored in the specific Artifact bucket associated with that toolkit. This provides centralized file management through the **Artifacts** section.

**Enabling Attachments in a Conversation:**

1. Open a new or existing conversation
2. Locate the **paperclip icon** in the message input area at the bottom
3. Click the paperclip icon
4. If attachments are not configured, the **Attachment settings** popup appears automatically
5. Configure storage by either:
   - Selecting an existing Artifact Toolkit from the dropdown, or
   - Creating a new toolkit by selecting "Create new" and entering a bucket name
6. Click **Save**

![Attachments](../img/how-tos/chat-conversations/attachments/enable-attachment-chat.gif)

Once enabled, you can upload files by clicking the paperclip icon, dragging and dropping files into the chat, or pasting from clipboard.

For detailed information about attachments, including agent configuration and file management, see [Attach Images and Files in Chat](../how-tos/chat-conversations/attach-images-and-files-in-chat.md).

## Adding LLM Models

**Selecting a Model:**

1. Click the **model selector dropdown** at the bottom of the chat.
2. Select a desired LLM model from the available options (e.g., gpt-4o, gpt-5.1, Claude).

**Configuring Model Settings:**

Click the **Settings** (⚙️) icon next to the model selector to fine-tune the response generation. The settings vary depending on the selected model:

**For Reasoning Models** (e.g., GPT-5.1):

* **Reasoning** - Controls the depth of logical thinking and problem-solving with three levels:
    * **Low**: Fast, surface-level reasoning with concise answers and minimal steps
    * **Medium**: Balanced reasoning with clear explanations and moderate multi-step thinking (default)
    * **High**: Deep, thorough reasoning with detailed step-by-step analysis (may be slower)

**For Standard Models** (e.g., GPT-4o):

* **Creativity** - Controls response randomness and creativity. Lower values produce more focused and deterministic outputs, while higher values generate more diverse and creative responses with five levels (1-5):
    * **1**: Highly focused and deterministic outputs
    * **2**: Mostly focused with slight variation
    * **3**: Balanced between focus and creativity (default)
    * **4**: More varied and creative responses
    * **5**: Maximum creativity and diversity

**Max Completion Tokens** (All Models):

Limits the maximum length of AI responses measured in tokens (roughly 4 characters per token):

* **Auto** (default): System automatically sets the token limit to 4096 tokens
* **Custom**: Manually set a specific token limit for responses
    * When Custom is selected, you can enter a specific number of maximum tokens
    * The interface shows remaining tokens available after your specified limit
    * Setting too high a value will show an error if it exceeds the model's maximum output tokens


![Settings](<../img/menus/chat/chat-model-settings.gif>){: loading=lazy }

## Context Budget

The **Context Budget** widget provides intelligent control over conversation token usage through automated message management. When enabled, it displays real-time token usage metrics and allows you to configure how the system manages conversation context as it approaches model token limits.

**Enabling Context Budget**

To use Context Budget, you need to enable it at the project level:

1. Navigate to **Settings** → **Secrets**
2. Create a new secret with:
   - **Name**: `context_manager`
   - **Value**: `true`
3. The Context Budget widget will appear immediately after enabling

**Widget Location**

The Context Budget widget appears in the bottom-left area of the **PARTICIPANTS** panel on the right side of the chat interface after you send the first message in a conversation.

![Chat Context Budget](<../img/how-tos/chat-conversations/context-management/chat-context-budget.gif>){width="600" loading="lazy"}

**Widget Views**

The widget has three views that provide progressively more detailed information:

* **Collapsed View**: Shows a simple line indicator of token usage status (green for normal, orange for high usage)
* **Compact View**: Displays pruning strategy, message count, summaries count, and an expand button
* **Expanded View**: Provides comprehensive configuration options organized in collapsible sections

**Key Features**

* **Real-time Token Tracking**: Monitor token consumption as you add messages to the conversation
* **Automatic Context Management**: System automatically prunes old messages or generates summaries when approaching token limits
* **Manual Optimization**: Manually trigger context optimization when usage exceeds 100%
* **Configurable Strategies**: Choose between different pruning strategies (oldest_first, importance_based)
* **Message Preservation**: Configure how many recent messages are always protected from pruning
* **Summarization**: Enable automatic summarization of older messages to reduce token usage while preserving conversation context

**Configuration Parameters**

When you expand the Context Budget widget, you can configure:

* **Context Strategy & Token Management**: Set max context tokens, preserve recent messages count, and pruning strategy
* **Summarization**: Enable/disable automatic summarization, configure summary instructions and trigger ratio
* **System Messages**: Manage system-level instructions and preservation settings

For detailed information about Context Budget configuration and usage, see [Context Management Guide](../how-tos/chat-conversations/context-management.md).


## Actions for Conversation

The following actions are available for created conversations from **CONVERSATIONS** sidebar:

* **Delete**: To delete a single conversation, on the left panel, in the conversation contextual menu, select **Delete** and confirm your action.
* **Edit**: To rename a conversation, on the left panel, in the conversation contextual menu, select **Edit** and confirm your action.
* **Move To**: To move a conversation to a folder, on the left panel, in the conversation contextual menu, select **Move To** and choose the desired folder. If no folder exists, you can create one by clicking **+ New Folder**.
* **Export**: To export a single conversation, on the left panel, in the conversation contextual menu, point to Export. `(Not applicable now.)`
* **Make Public**: To make a private conversation public, on the left panel, in the conversation contextual menu, click the **Make Public** icon. Note: You will not be able to convert it back to Private.
* **Share**: To share a conversation with team members, select **Share** from the conversation contextual menu. This action copies a direct link to the conversation to your clipboard. Team members can use this link to access and view the conversation. (`available for team project`) 
* **Playback**: The **Playback** mode can be used to simulate the current conversation without any engagement with models. This mode accurately reproduces the conversation like a recording and includes forward/backward navigation controls. It's well designed for demo purposes and allows you to step through conversations turn by turn. During playback, you can use keyboard arrows (left/right) or the on-screen controls to navigate through the conversation history.
* **Pin**: To pin a single conversation, on the left panel, in the conversation contextual menu, select **Pin**. Your conversation will be pinned at the top of your conversation's list. 

![Chat_Conversation_Actions](<../img/menus/chat/conversation_action.png>){: loading=lazy }

### Sharing Conversations

The conversation sharing feature allows you to share conversations with team members by providing them with a direct link. This is particularly useful for collaboration, code reviews, troubleshooting, and knowledge sharing within your team.

!!! warning "Important Permissions"
    * **Team Projects Only**: Conversation sharing is only available for conversations in team projects. You cannot share conversations from personal projects.
    * **Team Members**: Only team members who have access to the project can view shared conversations.
    * **Access Level**: Recipients must have appropriate permissions within the project to access the shared content.

**How Conversation Sharing Works**

When you share a conversation, ELITEA generates a unique URL that includes the conversation ID, name, and a special parameter that identifies it as a shared conversation. Team members who receive this link can access and view the complete conversation history in their browser.

**How to Share a Conversation**

1. Navigate to the **CONVERSATIONS** sidebar in the **Chat** section.
2. Locate the conversation you want to share.
3. Hover over the conversation to reveal the contextual menu.
4. Select **Share** from the menu options.
5. The conversation link is automatically copied to your clipboard.
6. You will see a notification: "The link has been copied to the clipboard."
7. Paste the link in your communication channel (email, Slack, Teams, etc.) to share it with team members.

![Chat_Share_Conversation](<../img/menus/chat/share-conversation.gif>){: loading=lazy }


**Use Cases for Sharing Conversations**

* **Collaboration**: Share conversations to involve team members in ongoing discussions or problem-solving sessions
* **Code Reviews**: Share conversations containing code generation or refactoring for peer review
* **Troubleshooting**: Share error discussions with technical support or senior team members
* **Knowledge Transfer**: Share valuable conversations as learning resources for team members
* **Documentation**: Share conversations that demonstrate best practices or solutions to common problems
* **Demos and Presentations**: Share conversations to demonstrate ELITEA capabilities or AI-assisted workflows

!!! tip "Sharing vs Making Public"
    The **Share** action is different from **Make Public**. Sharing creates a link for easy access while maintaining existing permissions, whereas making a conversation public changes its visibility settings permanently and cannot be reversed.

**Accessing Shared Conversations**

When a team member clicks on a shared conversation link:

1. The link opens in their browser
2. ELITEA automatically navigates to the specified conversation
3. The conversation opens with the complete history visible
4. The recipient can read the entire conversation thread
5. Depending on their permissions, they may be able to interact with or continue the conversation

!!! note "Access Permissions"
    If a user doesn't have access or permissions to the shared conversation (i.e., the conversation is not public and the user is not added as a participant), clicking the shared link will navigate them to the chat interface, but they will not be able to view the conversation content. This is the expected behavior to maintain conversation privacy and security.



## Actions for Folders

The following actions are available for managing folders in the **CONVERSATIONS** sidebar:

* **Edit Folder**: Select **Edit** in the folder contextual menu, update the folder name and click the **✔** button to save your changes.
* **Delete Folder**: Select **Delete** in the folder contextual menu and confirm the deletion. **Note**: Deleting a folder will not delete the conversations inside it; they will be moved back to the main **CONVERSATIONS** list.
* **Export**: To export a single folder, on the left panel, in the folder contextual menu, point to Export.  

    !!! note "Note"
        To be available in future updates.

![Chat_Folder_Actions](<../img/menus/chat/folder_actions.png>){: loading=lazy }


## Like/Dislike, Comment, and Regenerate Outputs

To engage with the generated outputs in conversations, utilize the **Like/Dislike** actions, add comments, or use the **Regenerate** option for refinement or feedback.

**How to Like/Dislike and Comment an Output**

1. After generating an output in the conversation, **Thumbs Up** and **Thumbs Down** buttons displayed alongside the output.
2. Click the **Thumbs Up** icon to like the output or the **Thumbs Down** icon to dislike it.
3. After clicking the **Thumbs Down** icon, a **Leave comment** field will appear. Click on it, type your feedback in the input box, and press **Send** to save it.

![Chat_Like_Dislike](<../img/menus/chat/like_dislike.png>){: loading=lazy }

**How to Regenerate the Last Output**

The **Regenerate Last Output** option becomes available only after initiating a conversation. This feature allows you to refine or correct the last generated output.

1. After generating an output in the conversation, click the **Regenerate** icon 🔄 . 
2. The system will regenerate the output based on the same input, providing a refined or corrected response.

![Chat_Regenerate](<../img/menus/chat/regenerate.gif>){: loading=lazy }

**Editing Generated Content with Canvas**
 
The Canvas feature allows you to directly edit code, tables, and Mermaid diagrams generated during a conversation. This powerful tool enhances your ability to refine and customize outputs without leaving the chat interface.
 
Canvas becomes automatically available when a generated response is:

* Code
* A Table
* A Mermaid Diagram
 
When available, a **Pencil** icon ✏️ will appear alongside the generated output. Clicking this icon opens the Canvas editor for that specific content type.
 
The Canvas feature is supported when interacting with the following participants:
* Agents
* Pipelines
* LLM Models (direct interaction)

   ![Canvas](<../img/menus/chat/canvas-open.gif>){: loading=lazy }

### Real-time Collaboration in Canvas

Canvas supports real-time collaborative editing where multiple users can work on the same content simultaneously:

* **Multi-user Editing**: Multiple team members can edit the same canvas content at the same time
* **User Indicators**: See who else is currently editing the content with user avatars and names
* **Live Updates**: Changes made by other users appear in real-time
* **Edit Conflicts**: The system manages edit conflicts automatically to ensure data integrity
 
#### Editing Code with Canvas
 
1.  Click the **Pencil** icon ✏️ next to a code block to open the Canvas Code Editor.
2.  The editor will display the code, and the currently selected code language will be shown.
3.  You can directly edit the code within this view.
4.  Use the following actions:
    * **Copy to clipboard**: Click the copy icon to copy the entire code block.
    * **Undo/Redo**: Click the respective icons to revert or reapply changes.
    * **Save**: Click the **X** icon to save your changes and close the Canvas editor. *(Placeholder for actual save icon/mechanism if 'X' is incorrect)*
 
![Canvas_Code_Editor](<../img/menus/chat/canvas_code.png>){: loading=lazy }

 
#### Editing Tables with Canvas
 
1.  Click the **Pencil** icon ✏️ next to a table to open the Canvas Table Editor. Tables are presented in Markdown format within the editor but rendered as interactive tables.
2.  You can directly edit the table content and structure.
3.  Use the following actions:
    * **Manual Editing**: Modify text directly in table cells and column headings.
    * **Delete Rows**: Select the checkbox(es) next to the rows you wish to remove, then click the delete row icon.
    * **Add Columns/Rows**: Click the **Add column** or **Add row** icons to expand the table.
    * **Copy to clipboard**: Click the copy icon to copy the table data.
    * **Import CSV**: Click the **Import table** icon to upload data from a CSV file.
    * **Download as XLSX**: Click the **Download as xlsx** button to save the table data as an Excel file.
    * **Undo/Redo**: Click the respective icons to revert or reapply changes.
    * **Save**: Click the **X** icon to save your changes and close the Canvas editor. *(Placeholder for actual save icon/mechanism if 'X' is incorrect)*

    ![Canvas_Table_Editor](<../img/menus/chat/canvas_table.png>){: loading=lazy }

 
**Table Manipulations:**
 
* **Sorting**: Click the sorting icons (e.g., ▲▼) next to each column heading to sort the data in ascending or descending order for that column.
* **Filtering**: Click the **...** (ellipsis) icon next to a column heading and select the **Filter** option to apply filters to the data in that column.
* **Hiding Columns**: Click the **...** (ellipsis) icon next to a column heading and select the **Hide column** option to remove the column from view.
* **Column Resizing**: Drag the column borders to resize columns to your preferred width.
* **Cell Editing**: Double-click any cell to edit its content directly within the table interface.
 
![Canvas_Table_Editor_Filtering](<../img/menus/chat/canvas-table-filtering.gif>){: loading=lazy }
 
#### Editing Mermaid Diagrams with Canvas

1. Click the **Pencil** icon ✏️ next to a Mermaid diagram to open the Canvas Mermaid Diagram Editor.
2. You can directly edit the Mermaid diagram code in the editor view.
3. A live **Preview** of the diagram will be displayed below the editor, updating as you make changes to the code.
4. Use the following actions:
    * **Copy to clipboard**: Click the copy icon to copy the Mermaid diagram code.
    * **Download**: Download the rendered diagram in JPG, PNG, or SVG formats using the respective download button.
    * **Undo/Redo**: Click the respective icons to revert or reapply changes.
    * **Save**: Click the **X** icon to save your changes and close the Canvas editor. *(Placeholder for actual save icon/mechanism if 'X' is incorrect)*

      ![Canvas_Mermaid_Editor](<../img/menus/chat/canvas_mermaid.png>){: loading=lazy }



---

## Clear Chat History

The **Clear Chat History** feature allows you to remove all messages and content from the current conversation while keeping the conversation itself and its participants intact. This is useful when you want to start fresh with the same setup or clean up a conversation that has become too long.

1. In the **PARTICIPANTS** panel on the right side of the chat interface, locate the **Clear chat history** button at the bottom.
2. Click the **Clear chat history** button.
3. A confirmation dialog will appear asking you to confirm the action.
4. Click **Confirm** to proceed with clearing the chat history.

      ![Canvas_Mermaid_Editor](<../img/menus/chat/clear-history.gif>){: loading=lazy }

!!! note "Note"
       * This action will permanently remove all messages, responses, and generated content from the conversation. The conversation itself, its name, participants, and settings will remain unchanged.
       * This action cannot be undone. Make sure to export or save any important content before clearing the chat history.

---

## Troubleshooting

??? warning "Conversation Not Loading"
    Check your network connection and refresh the page. If the issue persists, verify you have access permissions to the conversation.

??? warning "Cannot Add Participants"
    Ensure you have the necessary permissions. For team projects, verify that the participant (agent, pipeline, toolkit, or MCP) exists and is accessible to you.

??? warning "Attachments Not Working"
    Verify that attachments are enabled for the conversation and linked to an Artifact Toolkit. Check that your file format is supported and within size limits.

??? warning "Internal Tools Not Appearing"
    Ensure internal tools are enabled via the Internal Tools icon in the chat input toolbar. For agents, verify the tools are configured in the agent's TOOLKITS section.

??? warning "Model Not Responding"
    Check that you have selected a valid LLM model and that your project has access to it. Verify token limits and model settings are correctly configured.

??? warning "Context Budget Issues"
    Ensure the `context_manager` secret is set to `true` in Settings → Secrets. Check that you've sent at least one message for the widget to appear.

??? warning "Canvas Editor Not Opening"
    Verify that the generated content is in a supported format (code, table, or Mermaid diagram). Check that you're interacting with a compatible participant (agent, pipeline, or LLM model).

??? warning "Shared Conversation Link Not Working"
    Ensure the recipient has access to the team project and appropriate permissions. Verify the conversation hasn't been deleted or made private.

For further assistance, contact your platform administrator.

### Support Contact

If you encounter issues not covered in this guide or need additional assistance with chat conversations, please refer to **[Contact Support](../support/contact-support.md)** for detailed information on how to reach the ELITEA Support Team.

---

!!! info "Additional Resources"
    Explore these comprehensive guides to master ELITEA Chat features:

    * [How to Create and Edit Agents from Canvas](../how-tos/chat-conversations/how-to-create-and-edit-agents-from-canvas.md)
    * [How to Create and Edit Pipelines from Canvas](../how-tos/chat-conversations/how-to-create-and-edit-pipelines-from-canvas.md)
    * [How to Create and Edit Toolkits from Canvas](../how-tos/chat-conversations/how-to-create-and-edit-toolkits-from-canvas.md)
    * [How to Create and Edit MCPs from Canvas](../how-tos/chat-conversations/how-to-create-and-edit-mcps-from-canvas.md)
    * [How to Use Canvas](../how-tos/chat-conversations/how-to-canvas.md)
    * [Use Public Items from Chat](../how-tos/chat-conversations/use-public-items-from-chat.md)