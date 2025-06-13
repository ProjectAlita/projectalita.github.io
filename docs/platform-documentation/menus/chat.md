# Conversations

ELITEA Chat is an ultimate feature, allowing you to combine all ELITEA features in one place and achieve the best output and results.

In the ELITEA framework, a conversation is a dialogue among various participants such as selected language models, prompts, datasources, agents, and human users. The chat uses natural language to interact with a human and receive/give feedback. Within one conversation, you can refer to previous questions and answers. However, different conversations don’t share context.

All your conversations are stored on the ELITEA server, and you can access them from any device you use. All your conversations are accessible from the **Chat** menu.

Conversations support the following functionality:

* **Public and Private Conversations**: Share your conversation with other users from your project, involve them in the same conversation, or keep it private and visible only to you.
* **Participants**: Add various participants to the conversation, including other users in public conversations, prompts, data sources, agents, and language models, making them part of the conversation.
* **Canvas Mode**: Visualize and interact with conversation flows using a graphical canvas interface. 
* **Interactions**: Interact with added participants, copy generated responses, and more.
* **Managing Conversations**: Save conversations, pin the most important ones at the top of the screen, make private conversations public, delete conversations, clean the content of the conversation, and export the context of the conversation.
* **Folders**: Organize your conversations into folders for better management. You can create folders, move conversations to folders, edit folder names, or delete folders.
* **Playback**: During playback, you can move backward and forward through the playback process or stop the conversation by simulating the current conversation without any engagement with models.


For more details see [How to Use Chat Functionality](../../how-tos/how-to-use-chat-functionality.md).

![Chat_New](<../../img/platform/menus/chat/Chat_New.png>)

## Creating a Conversation

1. Click the **+ Conversation** button located at the top right corner or **+** icon next to **CONVERSATIONS**.
2. Provide the **Name**. By default, it is set to "New Conversation".
3. After creating Conversation add partiicpants to the conversation by clicking the **PARTICIPANTS +** button.
4. Start the conversation by typing your text (be it a question or a command) into the chat box. Use simple commands like "Go", "Start Generating", "Execute", or "Run it" and click the **Send** icon to begin.

![Chat_Create_Conversation](<../../img/platform/menus/chat/Chat_Create_Conversation.png>)

Your newly created conversation will subsequently appear on the Conversation's list.


## Creating a Folder

1. Click the **+ Folder** button located at the top of the **CONVERSATIONS** sidebar.
2. Provide a **Name** for the folder.
3. Click **Save** to create the folder. The new folder will appear in the **CONVERSATIONS** sidebar.

![Chat_Create_Folder](<../../img/platform/menus/chat/Chat_Create_Folder.png>)

### How to Move Conversations to a Folder

1. Right-click on the conversation you want to move.
2. Select **Move to** from the contextual menu.
3. Choose the target folder from the list. If no folder exists, you can create one by clicking **+ New Folder**.

![Chat_MoveTo_Folder](<../../img/platform/menus/chat/Chat_MoveTo_Folder.png>)


## Private and Public Conversations/Folders

### Private Conversations and Folders

- When creating a folder in a private project, you can add all types of participants, except users.
- These folders and their contents are only accessible to you.

### Team Project Conversations and Folders

If you are part of a team project:

- You can view all folders within the project.
- You can only see conversations inside folders if you are a member of those conversations.
- If you are a member of a conversation, you can move the conversation into a folder or remove it from the folder using the **Back to the list** option.
- You cannot delete a folder created by others, but you can move conversations inside the folder if you are a member of those conversations.

### Public Conversations and Folders

- Public folders are accessible to all members of the project.
- Conversations within public folders can be viewed and interacted with by all project members.
- Any member of the project can move conversations into public folders or remove them, depending on their permissions.
- Public folders cannot be converted to private folders.

## Participants

Participants are additional "tools" that can be added to the conversation to enhance it. The following types of participants are available:

* **Models**: LLM models which can be added to the conversation to interact with Gen AI and get responses from the selected model.
* **Prompts**: Already created prompts within the project or public ones which can be added to the conversation to execute them and get responses.
* **Datasources**: Already created datasources within the project or public ones which can be added to the conversation to execute them and get responses.
* **Agents**: Already created agents within the project or public ones which can be added to the conversation to execute them and get responses.

**Note**: Another category of participant is the user, which can't be added, but in the case of public conversations, users within the project can follow the conversation, interact with it, and thus become participants.

### How to Add a Participant

To add a participant to a conversation:

1. Click the **Add participants** button if you just created a conversation or **+** icon next to **PARTICIPANTS**.
2. A pop-up window appears.
3. Type the letters of the name or description of the available participant in the Search field. You can also filter and select required participant by type or tags.
4. As soon as you see the participant that you need from the proposed list, click the **Chat Now** button on the participant card.
5. The participant will be immediately added to your conversation and become visible in the **PARTICIPANTS** section.

**Note**: Users will receive notifications when they are added as participants in a conversation. 

**Note**: You can also add several participants at once (by clicking in the cards) and then click the **Add Participants** button.

![Chat_Add_Participant](<../../img/platform/menus/chat/Chat_Add_Participant.png>)

### How to Use a Participant

1. Check that the participant is selected and added to the conversation.
2. If you see in the Conversation's main section "Select from the list or mention participant you wish to engage with.", then you need to include the participant that you want to use. To do it:
      * You can either click on the required participant option from the **PARTICIPANTS** section.
      * Or you can call the required participant from the "Type your message" input box by typing **/** - prompt, **#** - data source, **@** - agent, **>** - model. Then select it from the dropdown list.
3. After adding the active participant to the conversation, you can use it by typing simple commands like "Go", "Start Generating", "Execute", or "Run it" and click the **Send** icon to execute the participant.
4. To remove the participant from the conversation's active participant list, click the X icon. Note: This will not remove the participant from the Conversation entirely. You can call it again.

![Chat_Use_Participant](<../../img/platform/menus/chat/Chat_Use_Participant.png>)

### How to Configure/Modify Participants

You can easily configure participants that you have added to the conversation.

For **Models**:

1. Navigate to the model.
2. Click on the **Settings** icon.
3. You can configure the following settings for the model: Temperature, Top P (0-1), Top K, and Maximum Length.
4. To apply changes, click the **< SETTINGS** button.
5. You can also restore back to default settings by clicking the **Restore** icon.

![Chat_Model](<../../img/platform/menus/chat/Chat_Model.png>)

## Display Configured Conversation Starter

When you add a participant to a conversation, the configured conversation starter for that participant will automatically display in the chat. This feature helps guide the conversation and ensures that the participant's functionality is clear.

For example:
- Adding a prompt participant will display its configured starter message.
- Adding an agent participant will display its predefined instructions.

This feature improves usability and ensures a smooth start to conversations.

For **Prompts**:

1. Navigate to the prompt.
2. Click on the **Settings** icon.
3. Select the version of the prompt. By default the "latest" will be selected.
4. You can configure the following settings for the prompt:Temperature, Top P (0-1), Top K, and Maximum Length. If the prompt has variable(s), you can modify them as well.
5. To apply changes, click the **< SETTINGS** button.
6. You can also restore back to default settings by clicking the **Restore** icon.

![Chat_Prompts](<../../img/platform/menus/chat/Chat_Prompts.png>)

For **Datasources**:

1. Navigate to the datasource.
2. Click on the **Settings** icon.
3. You can configure the following settings for the datasource: 
      * **Embedding Settings**: Initial Lookup Result (1-50), Pages Per Document (1-30), Expected Search Result (1-40).
      * Temperature, Top P (0-1), Top K, and Maximum Length.
4. To apply changes, click the **< SETTINGS** button.
5. You can also restore back to default settings by clicking the **Restore** icon.

![Chat_Datasources](<../../img/platform/menus/chat/Chat_Datasources.png>)

For **Agents**:

1. Navigate to the agent.
2. Click on the **Settings** icon.
3. Select the version of the prompt. By default the "latest" will be selected.
4. You can configure the following settings for the agent: Temperature, Top P (0-1), Top K, and Maximum Length. If the agent has variable(s), you can modify them as well.
5. To apply changes, click the **< SETTINGS** button.
6. You can also restore back to default settings by clicking the **Restore** icon.

![Chat_Agents](<../../img/platform/menus/chat/Chat_Agents.png>)

### Actions for Conversation

The following actions are available for created conversations from **CONVERSATIONS** sidebar:

* **Delete**: To delete a single conversation, on the left panel, in the conversation contextual menu, select **Delete** and confirm your action.
* **Edit**: To rename a conversation, on the left panel, in the conversation contextual menu, select **Edit** and confirm your action.
* **Move To**: To move a conversation to a folder, on the left panel, in the conversation contextual menu, select **Move To** and choose the desired folder. If no folder exists, you can create one by clicking **+ New Folder**.
* **Export**: To export a single conversation, on the left panel, in the conversation contextual menu, point to Export. **Note**: Not applicable now.
* **Make Public**: To make a private conversation public, on the left panel, in the conversation contextual menu, click the **Make Public** icon. Note: You will not be able to convert it back to Private.
* **Playback**: The **Playback** mode can be used to simulate the current conversation without any engagement with models. This mode accurately reproduces the conversation like a recording. It's well designed for demo purposes.
* **Pin**: To pin a single conversation, on the left panel, in the conversation contextual menu, select **Pin**. Your conversation will be pinned at the top of your conversation's list. **Note**: You can unpin the conversation by clicking the **Unpin** action.

![Chat_Conversation_Actions](<../../img/platform/menus/chat/Chat_Conversation_Actions.png>)

### Actions for Folders

The following actions are available for managing folders in the **CONVERSATIONS** sidebar:

* **Edit Folder**: Select **Edit** in the folder contextual menu, update the folder name and click the **✔** button to save your changes.
* **Delete Folder**: Select **Delete** in the folder contextual menu and confirm the deletion. **Note**: Deleting a folder will not delete the conversations inside it; they will be moved back to the main **CONVERSATIONS** list.

![Chat_Folder_Actions](<../../img/platform/menus/chat/Chat_Folder_Actions.png>)


## Like/Dislike, Comment, and Regenerate Outputs

To engage with the generated outputs in conversations, utilize the **Like/Dislike** actions, add comments, or use the **Regenerate** option for refinement or feedback.

### How to Like/Dislike and Comment an Output

1. After generating an output in the conversation, **Thumbs Up** and **Thumbs Down** buttons displayed alongside the output.
2. Click the **Thumbs Up** icon to like the output or the **Thumbs Down** icon to dislike it.
3. After clicking the **Thumbs Down** icon, a **Leave comment** field will appear. Click on it, type your feedback in the input box, and press **Send** to save it.

![Chat_Like_Dislike](<../../img/platform/menus/chat/Chat_Like_Dislike.png>)


### How to Regenerate the Last Output

The **Regenerate Last Output** option becomes available only after initiating a conversation. This feature allows you to refine or correct the last generated output.

1. After generating an output in the conversation, click the **Regenerate** icon 🔄 
2. The system will regenerate the output based on the same input, providing a refined or corrected response.

![Chat_Regenerate](<../../img/platform/menus/chat/Chat_Regenerate.png>)

### Editing Generated Content with Canvas
 
The Canvas feature allows you to directly edit code, tables, and Mermaid diagrams generated during a conversation. This powerful tool enhances your ability to refine and customize outputs without leaving the chat interface.
 
Canvas becomes automatically available when a generated response is:
- Code
- A Table
- A Mermaid Diagram
 
When available, a **Pencil** icon ✏️ will appear alongside the generated output. Clicking this icon opens the Canvas editor for that specific content type.
 
The Canvas feature is supported when interacting with the following participants:
- Agents
- Pipelines
- LLM Models (direct interaction)
 
#### Editing Code with Canvas
 
1.  Click the **Pencil** icon ✏️ next to a code block to open the Canvas Code Editor.
2.  The editor will display the code, and the currently selected code language will be shown.
3.  You can directly edit the code within this view.
4.  Use the following actions:
    *   **Copy to clipboard**: Click the copy icon to copy the entire code block.
    *   **Undo/Redo**: Click the respective icons to revert or reapply changes.
    *   **Save**: Click the **X** icon to save your changes and close the Canvas editor. *(Placeholder for actual save icon/mechanism if 'X' is incorrect)*
 
![Canvas_Code_Editor](<../../img/platform/menus/chat/Canvas_Code_Editor.png>)

![Canvas_Code_Editor_Updates](<../../img/platform/menus/chat/Canvas_Code_Editor_Updates.png>)

 
#### Editing Tables with Canvas
 
1.  Click the **Pencil** icon ✏️ next to a table to open the Canvas Table Editor. Tables are presented in Markdown format within the editor but rendered as interactive tables.
2.  You can directly edit the table content and structure.
3.  Use the following actions:
    *   **Manual Editing**: Modify text directly in table cells and column headings.
    *   **Delete Rows**: Select the checkbox(es) next to the rows you wish to remove, then click the delete row icon.
    *   **Add Columns/Rows**: Click the **Add column** or **Add row** icons to expand the table.
    *   **Copy to clipboard**: Click the copy icon to copy the table data.
    *   **Import CSV**: Click the **Import table** icon to upload data from a CSV file.
    *   **Download as XLSX**: Click the **Download as xlsx** button to save the table data as an Excel file.
    *   **Undo/Redo**: Click the respective icons to revert or reapply changes.
    *   **Save**: Click the **X** icon to save your changes and close the Canvas editor. *(Placeholder for actual save icon/mechanism if 'X' is incorrect)*

    ![Canvas_Table_Editor](<../../img/platform/menus/chat/Canvas_Table_Editor.png>)

    ![Canvas_Table_Editor_Updates](<../../img/platform/menus/chat/Canvas_Table_Editor_Updates.png>)

 
**Table Manipulations:**
 
*   **Sorting**: Click the sorting icons (e.g., ▲▼) next to each column heading to sort the data in ascending or descending order for that column.
*   **Filtering**: Click the **...** (ellipsis) icon next to a column heading and select the **Filter** option to apply filters to the data in that column.
*   **Hiding Columns**: Click the **...** (ellipsis) icon next to a column heading and select the **Hide column** option to remove the column from view.
 
![Canvas_Table_Editor_Filtering](<../../img/platform/menus/chat/Canvas_Table_Editor_Filtering.png>)
 
#### Editing Mermaid Diagrams with Canvas
 
1.  Click the **Pencil** icon ✏️ next to a Mermaid diagram to open the Canvas Mermaid Diagram Editor.
2.  You can directly edit the Mermaid diagram code in the editor view.
3.  A live **Preview** of the diagram will be displayed below the editor, updating as you make changes to the code.
4.  Use the following actions:
    *   **Copy to clipboard**: Click the copy icon to copy the Mermaid diagram code.
    *   **Download**: Download the rendered diagram in JPG, PNG, or SVG formats using the respective download button.
    *   **Undo/Redo**: Click the respective icons to revert or reapply changes.
    *   **Save**: Click the **X** icon to save your changes and close the Canvas editor. *(Placeholder for actual save icon/mechanism if 'X' is incorrect)*
 
![Canvas_Mermaid_Editor](<../../img/platform/menus/chat/Canvas_Mermaid_Editor.png>)

![Canvas_Mermaid_Editor_Updates](<../../img/platform/menus/chat/Canvas_Mermaid_Editor_Updates.png>)

 