# ELITEA Code Chat 

ELITEA Code Chat for VSCode and IntelliJ is an auxiliary GUI for ELITEA Code, allowing you to utilize the functionality of ELITEA Code and chat with ELITEA. It provides a seamless interface for interacting with prompts, datasources, and agents configured in ELITEA.


## Pre-requisite

ELITEA Code Chat operates in conjunction with ELITEA Code for both VS Code and IntelliJ. To utilize ELITEA Code Chat, you must first install ELITEA Code from their respective marketplaces:

* **VS Code**: Install [ELITEA Code](https://marketplace.visualstudio.com/items?itemName=ProjectAlita.AlitaCode) from the VS Code Marketplace.
* **IntelliJ**: Install [ELITEA Code](https://plugins.jetbrains.com/plugin/23040-alitacode) from the JetBrains Marketplace.

**Important**: Ensure that ELITEA Code is not only installed but also properly configured with ELITEA to function correctly. For detailed installation and configuration instructions, please refer to the [ELITEA Code documentation](elitea-code.md). This step is crucial for enabling the full capabilities of ELITEA Code Chat within your development environment.

## Features list:

* Chat with ELITEA directly using the model settings configured in the ELITEA Code extension.
* Type trigger chat to add participants to chat:
  - `/` for prompts
  - `#` for datasources
  - `@` for agents
  
* **Integration with External Tools**: Seamlessly integrate with Jira and Slack for task management and communication.

**Note**: ELITEA Code Chat doesn't support Chat History. In case of restarting VS Code or IntelliJ, the Chat History will be cleared.

## ELITEA Code Chat for VS code

ELITEA Code Chat is a Visual Studio Code extension that works as a chatting companion using ELITEA Code.

### Installation

Getting started with ELITEA Code Chat is straightforward:

1. Navigate to the **Extensions** section in VS Code.
2. Search for **ELITEA Code Chat** in the Marketplace and click **Install**.

![VS-EliteaChat-Install](<../../img/integrations/extensions/chat/VS-EliteaChat-Install.png>)

**Note**: After successful installation ELITEA Code Chat shortcut will be added to left menu of VS Code.

### ELITEA Code Chat Usage

With ELITEA Code Chat set up, you can now:

* **Prompts** - call and use prompts configured in ELITEA.
* **Datasources** - call and use datasources configured in ELITEA.
* **Agents** - call and use agents configured in ELITEA.
* **Chat** - is a specific type of input designed for conversational AI models, which aims to initiate or guide a dialogue. This can be in the form of a question, statement, or command that simulates human-like interaction, prompting the AI to produce a conversational response for engagement.

**Important:** To successfully call and utilize prompts, datasources, or agents from ELITEA, it is essential that these items are tagged with `code` in ELITEA. This tag ensures that the resources are correctly categorized and accessible. Ensure that the `code` tag is applied to relevant prompts, datasources, and agents to enable their proper functionality within the ELITEA ecosystem.

**Additional Interaction Features:**


* **Stop Generating**: Interrupt the generation of output at any time by clicking the **Stop Generating** button.
* **Auto Scroll to Bottom**: Automatically scroll to the bottom of the output as it is generated.
* **Reload ELITEA Code Settings**: Reload and update ELITEA Code settings.

![VS-EliteaChat-StopGen](<../../img/integrations/extensions/chat/VS-EliteaChat-StopGen.png>)


**Post-Output Actions:**

* **Continue the Dialogue**: To keep the conversation going, simply type your next question or command in the chat box and click the **Send** icon.
* **Copy the Output**: Click the **Copy to clipboard** icon to copy the generated text for use elsewhere.
* **Delete Output**: To remove the current output from the chat, click the **Delete** icon.
* **Purge Chat History**: For a fresh start or to clear sensitive data, click the **Clean** icon to erase the chat history.
* **Specialized Download Options** for **Tabular** outputs. When the Gen AI generates output in a tabular format, additional options become available to manage and utilize this structured data:
    * **Download as xlsx**: Allows you to save the tabular output directly in an Excel spreadsheet format, facilitating easy data manipulation and analysis.
    * **Copy as markdown**: Enables copying the tabular output in markdown format, suitable for use in markdown-supported environments like GitHub or blogging platforms.
    * **Copy as html**: Permits copying the tabular output in HTML format, ideal for integration into web pages or emails, preserving the formatting and structure.

![VS-EliteaChat-Buttons](<../../img/integrations/extensions/chat/VS-EliteaChat-Buttons.png>)

#### Prompts

To call and use **Prompts** from ELITEA:

1. Open the Elitea Code Chat.
2. Type `/` in the chat box.
3. Select the prompt that you want to run.
      * **Version Selection**: Prompts may have multiple versions. Ensure you select the appropriate version from the dropdown list as different versions may vary in functionality and variables.
      * **Variable Management**: If the selected prompt version includes variables, a dialog will appear allowing you to input or modify the values. Prepopulated values might be present, or you may need to provide your own. Ensure that all required variables are correctly filled to execute the prompt accurately. You can adjust or update variable values at any time by clicking the **Settings** icon.
4. Once all instructions for the prompt are set in the **Context** and/or **Messages** sections, you can start the execution by typing your text (be it a question or a command)  into the chat box. Use simple commands like "Go", "Start Generating", "Execute", or "Run it" and click the **Send** icon to begin. These commands signal the Gen AI to process the information and generate the desired output based on the configured settings.
5. If you need to start a fresh conversation or prompt, simply click the **X** icon to clear the current setup and begin anew.

![VS-EliteaChat-CallPrompt](<../../img/integrations/extensions/chat/VS-EliteaChat-CallPrompt.png>)

![VS-EliteaChat-PromptVariable](<../../img/integrations/extensions/chat/VS-EliteaChat-PromptVariable.png>)

#### Datasources

To call and use **Datasources** from ELITEA:

1. Open the Elitea Code Chat.
2. Type `#` in the chat box.
3. Select the datasource that you want to run.
4. Start conversation in the form of a question, statement, or command that simulates human-like **interaction**.
5. If you need to start a fresh conversation or datasource, simply click the **X** icon to clear the current setup and begin anew.

![VS-EliteaChat-Datasource](<../../img/integrations/extensions/chat/VS-EliteaChat-Datasource.png>)

#### Agents

To call and use **Agents** from ELITEA:

1. Open the Elitea Code Chat.
2. Type `@` in the chat box.
3. Select the prompt that you want to run.
      * **Version Selection**: Agents may have multiple versions. Ensure you select the appropriate version from the dropdown list as different versions may vary in functionality and variables.
      * **Variable Management**: If the selected agent version includes variables, a dialog will appear allowing you to input or modify the values. Prepopulated values might be present, or you may need to provide your own. Ensure that all required variables are correctly filled to execute the agent accurately. You can adjust or update variable values at any time by clicking the **Settings** icon.
4. Start conversation in the form of a question, statement, or command that simulates human-like **interaction**.
5. If you need to start a fresh conversation or application, simply click the **X** icon to clear the current setup and begin anew.

![VS-EliteaChat-Agent](<../../img/integrations/extensions/chat/VS-EliteaChat-Agent.png>)

#### Chat

1. Open the Elitea Code Chat.
2. Start conversation in the form of a question, statement, or command that simulates human-like **interaction**.

## Elitea Code Chat for IntelliJ

EliteaCodeChat is an IntelliJ plugin to work as chatting companion using EliteaCode.

### Installation

Getting started with EliteaCodeChat is straightforward:

1. Navigate to the **Settings**→**Plugins** section in IntelliJ.
2. Search for **EliteaCodeChat** in the Marketplace and click **Install**.

![IJ-EliteaChat-Install](<../../img/integrations/extensions/chat/IJ-EliteaChat-Install.png>)

Elitea Chat for IntelliJ offers two distinct modes to cater to different user preferences and integration styles. Each mode is designed to provide a seamless user experience while aligning with specific design philosophies:

* **Native Mode**: This mode is tailored to blend seamlessly with the IntelliJ environment. It adheres to the native design and style guidelines of IntelliJ, ensuring that the interface feels familiar and integrated for users who prefer consistency with their development environment.
* **React Mode**: Designed to echo the aesthetics and usability of ELITEA, this mode brings the distinctive look and feel of ELITEA's design language into IntelliJ. It's ideal for users who enjoy the ELITEA interface and wish to have a similar user experience within the IntelliJ platform.

Both modes are crafted to provide a robust and intuitive chat interface, allowing users to choose according to their design preference and familiarity.

**Note**:

* After successful installation EliteaCodeChat shortcut will be added to right menu of IntelliJ.
* To ensure seamless integration and functionality, the Elitea Code and EliteaCodeChat plugins must be installed with matching versions. Please verify that both plugins are updated to the same version to avoid compatibility issues.
* To successfully call and utilize prompts, datasources, or agents from ELITEA, it is essential that these items are tagged with `code` in ELITEA. This tag ensures that the resources are correctly categorized and accessible. Ensure that the `code` tag is applied to relevant prompts, agents, datasources, and applications to enable their proper functionality within the ELITEA ecosystem.


### EliteaCodeChat Usage

#### Prompts

To call and use **Prompts** from ELITEA:

1. Open the EliteaCodeChat.
2. Select the **React** or **Native** tab.
3. Type `/` in the chat box.
4. Select the prompt that you want to run.
      * **Version Selection**: Prompts may have multiple versions. Ensure you select the appropriate version from the dropdown list as different versions may vary in functionality and variables.
      * **Variable Management**: If the selected prompt version includes variables, a dialog will appear allowing you to input or modify the values. Prepopulated values might be present, or you may need to provide your own. Ensure that all required variables are correctly filled to execute the prompt accurately. You can adjust or update variable values at any time by clicking the **Settings** icon.

![IJ-EliteaChat-Prompt](<../../img/integrations/extensions/chat/IJ-EliteaChat-Prompt.png>)

![IJ-EliteaChat-Variable](<../../img/integrations/extensions/chat/IJ-EliteaChat-Variable.png>)


5. Once all instructions for the prompt are set in the **Context** and/or **Messages** sections, you can start the execution by typing your text (be it a question or a command)  into the chat box. Use simple commands like "Go", "Start Generating", "Execute", or "Run it" and click the **Send** icon to begin. These commands signal the Gen AI to process the information and generate the desired output based on the configured settings.
6. If you need to start a fresh conversation or prompt, simply click the **X** icon to clear the current setup and begin a new one.

![IJ-EliteaChat-Chat](<../../img/integrations/extensions/chat/IJ-EliteaChat-Chat.png>)

#### Datasources

To call and use **Datasources** from ELITEA:

1. Open the EliteaCodeChat.
2. Select the **React** or **Native** tab.
3. Type `#` in the chat box.
4. Select the datasource that you want to run.
5. Start conversation in the form of a question, statement, or command that simulates human-like **interaction**.
6. If you need to start a fresh conversation or datasource, simply click the **X** icon to clear the current setup and begin anew.

![IJ-EliteaChat-Datasource](<../../img/integrations/extensions/chat/IJ-EliteaChat-Datasource.png>)

#### Agents

To call and use **Agents** from ELITEA:

1. Open the EliteaCodeChat.
2. Select the **React** tab.
3. Type `@` in the chat box.
4. Select the agent that you want to run.
      * **Version Selection**: Agents may have multiple versions. Ensure you select the appropriate version from the dropdown list as different versions may vary in functionality and variables.
      * **Variable Management**: If the selected agent version includes variables, a dialog will appear allowing you to input or modify the values. Prepopulated values might be present, or you may need to provide your own. Ensure that all required variables are correctly filled to execute the agent accurately. You can adjust or update variable values at any time by clicking the **Settings** icon.
5. Start conversation in the form of a question, statement, or command that simulates human-like **interaction**.
6. If you need to start a fresh conversation or application, simply click the **X** icon to clear the current setup and begin anew.

![IJ-EliteaChat-Agent](<../../img/integrations/extensions/chat/IJ-EliteaChat-Agent.png>)

#### Chat

1. Open the EliteaCodeChat.
2. Select either the **Native** or **React** tab.
3. Start conversation in the form of a question, statement, or command that simulates human-like **interaction**.

![IJ-EliteaChat-Native](<../../img/integrations/extensions/chat/IJ-EliteaChat-Native.png>)

#### Additional Interaction Features for React Mode

* **Auto scroll to bottom**: This option can be toggled on or off to automatically scroll to the bottom of the output as it is being generated. This feature is helpful during long outputs to keep the most recent content visible.
* **Reload Elitea Code Settings**: This option allows to reload and update Elitea Code settings.
* **Stop generating**: To stop generation of output.

![IJ-EliteaChat-Buttons](<../../img/integrations/extensions/chat/IJ-EliteaChat-Buttons.png>) 


**Post-Output Actions for React Mode:**

* **Continue the Dialogue**: To keep the conversation going, simply type your next question or command in the chat box and click the **Send** icon.
* **Copy the Output**: Click the **Copy to clipboard** icon to copy the generated text for use elsewhere.
* **Delete Output**: To remove the current output from the chat, click the **Delete** icon.
* **Purge Chat History**: For a fresh start or to clear sensitive data, click the **Clean** icon to erase the chat history.
* **Specialized Download Options** for **Tabular** outputs. When the Gen AI generates output in a tabular format, additional options become available to manage and utilize this structured data:
    * **Download as xlsx**: Allows you to save the tabular output directly in an Excel spreadsheet format, facilitating easy data manipulation and analysis.
    * **Copy as markdown**: Enables copying the tabular output in markdown format, suitable for use in markdown-supported environments like GitHub or blogging platforms.
    * **Copy as html**: Permits copying the tabular output in HTML format, ideal for integration into web pages or emails, preserving the formatting and structure.

![IJ-EliteaChat-Download](<../../img/integrations/extensions/chat/IJ-EliteaChat-Download.png>) 

**Additional Interaction Features for Native Mode**:

* **Copy the Output**: Click the **Copy to clipboard** icon to copy the generated text for use elsewhere.
* **Delete Output**: Remove the current output from the chat by clicking the **Delete** icon.

**Note**: The **Native Mode** is designed to provide a simpler interface with limited post-output actions, focusing on core functionality.

![IJ-EliteaChat-NativeButton](<../../img/integrations/extensions/chat/IJ-EliteaChat-NativeButton.png>) 
