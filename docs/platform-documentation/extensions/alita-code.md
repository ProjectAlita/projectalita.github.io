# ELITEA Code

## Get Started with ELITEA Code

Welcome to the **ELITEA Code** your comprehensive resource for harnessing the power of the ultimate AI-powered IDE extension that's set to transform your coding workflow. ELITEA Code integrates seamlessly with VS Code and InteliiJ, offering intelligent suggestions, automating routine tasks, and providing a level of adaptability that's unmatched, all designed to elevate your coding experience.

### Why Choose ELITEA Code?

ELITEA Code is not just another IDE extension. It's a revolutionary tool designed to:

* **Boost Productivity**: With AI-powered suggestions, ELITEA Code analyzes your code in real-time, offering insights to enhance code quality, readability, and performance.
* **Automate Testing and Documentation**: Simplify the creation of unit tests, integration tests, and automated tests. ELITEA Code also enriches your code with automatic commenting, making it more accessible and maintainable.
* **Customizable Assistance**: Tailor ELITEA Code's assistance to your project's specific needs with customizable prompts, both internal and powered by ELITEA Backend's LLMs for external prompts.
* **Collaborative Features**: Share prompts, folders, and configurations with team members for seamless collaboration.


### Key Features

ELITEA Code comes packed with features designed to streamline your development process:

* AI-powered code suggestions for smarter coding
* Automated generation of unit tests, integration tests, and automated tests
* Automatic code commenting for better maintainability
* Customizable internal prompts for tailored assistance
* Project-specific external prompts, agents and datasources powered by ELITEA Backend
* Code explanation and optimization recommendations
* Seamless native IDE integration
* Playback Mode to step through conversations turn by turn for demos, debugging, or workflow reviews.
* Folder Sharing with team members or groups for collaborative work.
* Regular updates and enhancements
* Comprehensive documentation and dedicated support
* Collaboration-friendly design for team projects
* Secure and privacy-conscious implementation

## ELITEA Code for VS Code

ELITEA Code is a visual studio extension to handle prompt-engineering based code generation using ELITEA as a backend.

### Installation

Getting started with ELITEA Code is straightforward and involves a few simple steps:

1. Open VS Code and navigate to the **Extensions** section.
2. In the Marketplace, search for **Elite Code** and click **Install**.

![VS-EliteaCode-Install](<../../img/platform/extensions/code/VS-EliteaCode-Install.png>)

### Configuration on ELITEA HUB

To configure the necessary parameters for the Elitea Code extension, follow these steps:

1. Go to **Settings → Configuration** on the ELITEA HUB.
2. Click the **+** icon to create a new token.
   * Enter a name and set an expiration date for the token.
   * Click **Generate** to create the token.
   * Immediately copy and securely store the generated token; it will not be visible again once you close the pop-up window.
3. From the Integration Option dropdown list, select the desired LLM model (e.g., gpt-4o-2024-11-20, gpt-4o-2024-08-06, gpt-4o, etc.).
4. Once the LLM model is selected, the **Download VS Code Settings** icon will appear next to the created token.
5. Click this icon to download the `settings.json` file, which contains all necessary configuration information for integration with VS Code.

**Note**: The `settings.json` file includes essential information such as Project ID, ELITEA HUB's URL, LLM model, Integration UID, and the generated token.

**Important**: Alternatively, you can manually copy and paste all required parameters into the Elitea Code extension's settings in VS Code.

![VS-Elitea-Config](<../../img/platform/extensions/code/VS-Elitea-Config.png>)

### Configuration on VS Code

Once ELITEA Code is installed, setting it up to work with your project in ELITEA HUB involves:

1. Open your project in VS Code.
2. Navigate to the `.vscode` folder and open the `settings.json` file. If this folder does not exist, create it and add a `settings.json` file.
3. Open the `settings.json` file downloaded from ELITEA HUB.
4. Copy all information from this file into the `.vscode/settings.json` file in your project. **Note**: Be careful not to overwrite other configurations. If previous ELITEA Code configurations exist, remove them before adding new information.
5. Save the file. The integration settings will now be applied under **Elitea Code → Extension Settings → Workspace** tab.
6. Go to **Extensions → ELITEA Code → Extension Settings**. Open the Workspace tab and verify that all parameters are correctly populated from the `settings.json` file. **Note**: Manual adjustments can be made if necessary.

![VS-Eliteacode-Settings](<../../img/platform/extensions/code/VS-EliteaCode-Settings.png>)

### Types of Settings in ELITEA Code

Elitea Code offers two types of settings to cater to different needs:

* **User Settings**: These are global settings that apply to all sessions across any workspace, providing a consistent environment across your projects.
* **Workspace Settings**: These are specific to a particular workspace, allowing for tailored configurations such as different project IDs or models, which is essential for managing separate environments or specific tasks.

The following settings are available in both tabs (which can either be prepopulated or manually configured):

**Main Settings**:

* **Eliteacode: LLMServer Url**: Enter the URL of your LLM service provider. For connecting to ELITEA Nexus env., use `https://nexus.elitea.ai/`.
* **Eliteacode: LLMAuth Token**: Provide your token for authentication with the LLM service provider. For ELITEA Prod env, input the generated Token.
* **Eliteacode: Project ID**: Input the Project ID for the ELITEA backend.
* **Eliteacode: Display Type**: Choose how the prediction results are displayed:

  * **append** - when you run `ELITEA Predict` the results will be displayed after the text or part that you have selected.
  * **split** - when you run `ELITEA Predict` the results will be displayed in a separate place (view).
  * **replace** - when you run `ELITEA Predict` the results will be displayed instead of the text or part that you have selected.
  * **prepend** -when you run `ELITEA predict` the results will be displayed before the text or part that you have selected.

* **Eliteacode Verify Ssl**: Toggle this setting to verify the LLM service provider's SSL certificate. For [Nexus](https://nexus.elitea.ai/) env, keep this checkbox not selected.
* **Eliteacode: Enable**: Toggle to enable or disable the ELITEA Code extension as needed.
* **Eliteacode: Debug**: Toggle to enable or disable the debugging feature as needed.

**Integration Settings**:

**Eliteacode: Select Integration**: Click here to select link to select the available models from dropdown list for above selected environment. Note: After selection the corresponding information will be automatically populated for **Eliteacode: LLMModel Name**, **Eliteacode: Integration Name** and **Eliteacode: Integration Uid** fields.
* **Eliteacode: LLMModel Name**: Write manually the desired LLM model name, if you don't want to preopoluate all information from .
* **Eliteacode: Integration Name**: This is the integration type which is used for selected LLM model setup in ELITEA→Settings-Integrations page. Will automatically be populated and set after selecting LLM model from **Eliteacode: Select Integration**.
* **Eliteacode: Integration Uid**: Enter the Integration UID from the ELITEA backend. Will automatically be populated and set after selecting LLM model from **Eliteacode: Select Integration**.

**Advanced Settings**:

* **Eliteacode: Custom Model Tokens**: Set the maximum completion tokens for selected custom model. This setting defines the maximum length of the AI's generated response, measured in tokens.
* **Eliteacode: Max Tokens**: Set the maximum completion tokens for selected model. This setting defines the maximum length of the AI's generated response, measured in tokens.
* **Eliteacode: Temperature**: Adjust the temperature setting for the selected model to control the randomness of the output.
* **Eliteacode: Top P**: Set the Top P value for the selected model. Also known as nucleus sampling, **Top P** offers another way to control the randomness of the output.
* **Eliteacode: Top K**: Set the Top K value for the selected model. This parameter limits the AI's token selection to the **K** most likely tokens at each step of the generation process.

These settings ensure that ELITEA Code is properly configured to interact with the ELITEA, allowing for seamless integration and efficient use of LLM models within your projects.

**Note**: Restarting VS Code may be necessary for changes to take effect.

### Configuring ELITEA Code

To initialize **ELITEA Code** in your project:

1. Open any file and right-click to select **ELITEA → Init**.
2. This creates a `.promptLib` folder with default prompts and `prompts.json` files.

![VS-EliteaCode-Init](<../../img/platform/extensions/code/VS-EliteaCode-Init.png>)

### ELITEA Code Usage

#### Getting Started with Extension Commands

Jumpstart your Elitea Code experience with these essential commands:

* **Elitea: Init**: Initialize Elitea Code in your workspace by creating a `.promptLib` folder at the root. **Note**: After successful initalization the `Elitea: Init` command becomes unavailable.
* **Elitea: Create Prompt**: Craft a new prompt within the `.promptLib` folder.
* **Elitea: Extend Context**: Enhance the context of an existing prompt in the `.promptLib` folder.
* **Elitea: Predict**: Choose from a list of prompts and generate predictions based on your selection.
* **Elitea: Sync External Prompts**: Synchronize your external prompts, agents and datasources with ELITEA Backend.

**Elitea Code** is designed to be your coding companion, offering a blend of AI-powered efficiency and customizable support. Whether you're looking to enhance your productivity, streamline your testing process, or simply make your code more understandable, Elitea Code is here to help. Let's embark on this journey to revolutionize your coding experience together.

#### Synchronize External Prompts

Sync prompts, agents and datasources created in the Elitea HUB with your Elitea Code setup for seamless integration:

1. **Open `prompts.json`**: Locate and open the `prompts.json` file.
2. **Access Elitea Menu**: Right-click in the editor to see the Elitea menu option.
3. **Sync Prompts Option**: Select `Elitea: Sync External Prompts` from the submenu.
4. **Synchronization**: The prompts, agents and datasources will be synced and added to the `prompts.json` file.
5. **Usage**: These prompts, agents and datasources are now ready to be used with `Elitea: Predict` command.

![VS-EliteCode-Sync)](<../../img/platform/extensions/code/VS-EliteaCode-Sync.png>)

**Note**: To sync and use prompts, agents and datasources from ELITEA HUB, tag the prompt with `code` in ELITEA HUB.

#### Create a Prompt

Creating a custom prompt in Elitea Code allows you to tailor Gen AI suggestions to your specific tasks. Here's how to create one:

1. **Open a File**: Start by opening any file from your project, or create a new one.
2. **Access Elitea Menu**: Right-click in the editor view to bring up the context menu, where you'll find the Elitea item.
3. **Create Prompt Option**: Hover over Alita in the menu, and on the second level menu, select `Create Prompt`.
4. **Name Your Prompt**: Enter a name for your prompt-template, such as "Generate unit-tests".
5. **Describe Your Prompt**: Press Enter and provide a description for your prompt.
6. **Provide Prompt Content**: Press Enter again and input the content of your prompt. This can be modified later in the `.promptLib` folder.
7. **Finalize Creation**: Hit Enter to finalize. Elitea will add a reference to the new prompt in `prompts.json` and create a corresponding `.yaml` file in the `.promptLib` folder, which can be edited to extend content and add examples.

![VS-EliteaCode-CreatePrompt](<../../img/platform/extensions/code/VS-EliteaCode-CreatePrompt.png>)

![VS-EliteaCode-Prompt](<../../img/platform/extensions/code/VS-EliteaCode-Prompt.png>)

![VS-EliteaCode-PromptExample](<../../img/platform/extensions/code/VS-EliteaCode-PromptExample.png>)


#### Extend Prompt Context

Enhance the context of an existing prompt with selected text from your code, improving the relevance of AI suggestions:

1. **Open and Select**: Open any file from your project and select a portion of the text.
2. **Access Elitea Menu**: Right-click to open the context menu and find the Elitea item.
3. **Extend Context Option**: Hover over Elitea and select "Extend Context" from the submenu.
4. **Choose a Prompt**: Pick the prompt you wish to extend the context for from the dropdown list.
5. **Extend Context**: The selected text will be automatically added to the prompt's context, enriching its understanding for future suggestions.

#### Predict (Execute) Prompt

To predict (execute) a prompt or an agent or a datasource directly from VS Code to generate Gen AI-driven code suggestions:

1. **Open a File and Select Text**: Open any project file and select the text you want to analyze or for which you need suggestions.
2. **Access Elitea Menu**: Right-click in the editor view to see the Elitea menu item.
3. **Predict Option**: Hover over Elitea and choose `Elitea Predict` from the submenu.
4. Select a Prompt, Agent or Datasource:
   * Choose the desired prompt, agent or datasource from the dropdown list.
   * **Version Selection**: Prompts may have multiple versions. Ensure you select the appropriate version from the dropdown list as different versions may vary in functionality and variables.
   * **Variable Management**: If the selected prompt version includes variables, you will either see prepopulated values or you can provide your own values. Ensure that all required variables are correctly filled to execute the prompt accurately.
5. **View Predictions**: After execution, the generated response will be displayed in your editor according to the method specified in your **Elitea Code: Default View Mode settings**. This could be appended, replaced, split, or prepended based on your configuration.

![VS-EliteaCode-Predict](<../../img/platform/extensions/code/VS-EliteaCode-Predict.png>)


![VS-EliteaCode-Predict(Response)](<../../img/platform/extensions/code/VS-EliteaCode-Predict(Response).png>)

**Note**: You can use default prompts, those you've created, or external prompts, agents and datasources synced from **ELITEA HUB**.

## EliteaCode for IntelliJ Idea

EliteaCode is a IntelliJ plugin to handle prompt-engineering based code generation using ELITEA as a backend.

### Installation

Getting started with Elitea Code is straightforward and involves a few simple steps:

1. Navigate to the **Settings**→**Plugins** section in IntelliJ.
2. Search for **Elitea** in the Marketplace and click **Install**.

![IJ-EliteaCode-Install](<../../img/platform/extensions/code/IJ-EliteaCode-Install.png>)

### Configuration on ELITEA HUB

To configure the necessary parameters for the Elitea Code extension, follow these steps:

1. Go to **Settings → Configuration** on the ELITEA HUB.
2. Click the **+** icon to create a new token.
   * Enter a name and set an expiration date for the token.
   * Click **Generate** to create the token.
   * Immediately copy and securely store the generated token; it will not be visible again once you close the pop-up window.
3. From the **Integration Option** dropdown list, select the desired LLM model (e.g., gpt-4o-2024-11-20, gpt-4o-2024-08-06, gpt-4o, etc.).
4. Once the LLM model is selected, the **Download Jetbrains Settings** icon will appear next to the created token.
5. Click this icon to download the `alita.xml` file, which contains all necessary configuration information (except generated token) for integration with IntelliJ.

![IJ-EliteaCode-Download](<../../img/platform/extensions/code/IJ-EliteaCode-Download.png>)

### Configuration on IntelliJ

Once Elitea Code is installed, setting it up to work with your project in ELITEA HUB involves:

1. Open your project in IntelliJ.
2. Navigate to the `.idea` folder and open the `alita.xml` file. If this folder does not exist, create it and add a `alita.xml` file.
3. Open the `alita.xml` file downloaded from ELITEA HUB.
4. Copy all information from this file into the `.idea/alita.xml` file in your project. **Note**: If previous Elitea Code configurations exist, remove them before adding new information.
5. Save the file. The integration settings will now be applied under **Settings → Tools → Alita** tab.
6. Go to **Settings → Tools → Alita**. Open it and verify that all parameters are correctly populated from the `alita.xml` file.
7. Copy and paste generated token to the **LLM Auth Token** field. 
8. Check and apply configuration:
      * Click the **Reload** icon next to the **Integration Name** dropdown list.
      * Select the `alita-useast-openai` as an integration and model gpt-4o-2024-11-20 for an example and click **OK** button.
9. To complete the setup click the **OK** button.

![IJ-EliteaCode-Settings](<../../img/platform/extensions/code/IJ-EliteaCode-Settings.png>)

### Settings in Elitea Code

Elitea Code includes the following settings:

* **LLM Provider**: Select the LLM Provider. To connect with ELITEA Hub, select `ELITEA` option.
* * **LLM Auth Token**: Provide your Bearer token for the LLM service provider.
* **Provide Settings**
    * **Project ID**: Enter the Project Id for ELITEA Backend, ignored for OpenAI.
    * **LLM Server URL**: Enter the URL to your LLM service provider. (e.g. `https://nexus.elitea.ai`)
    * **Integration Name**: Select the integration and integration model (e.g. alita-useast-openai gpt-4o-2024-11-20)
    * **Integration UID**: Enter the AI integration Id from ELITEA Backend, ignored for OpenAI.
    * **LLM Model Name**: Choose the LLM model from the dropdown list.
    * **Custom Model Name**: Enter a custom model name if the desired model is not listed. Check the **Use custom model** checkbox.
* **Display Type**: Select the default display mode for the predictions.
  * **append** - when you run `Elitea Predict` the results will be displayed after the text or part that you have selected. 
  * **split** - when you run `Elitea Predict` the results will be displayed in a separate place (view).
  * **replace** - when you run `Elitea Predict` the results will be displayed instead of the text or part that you have selected. 

**Advanced Settings**:
  * **LLM Response Timeout**: Set the response timeout, default is `90` seconds. 
  * **Max Tokens**: Set the max tokens for the selected model.
  * **Temperature**: Adjust the temperature for the selected model.
  * **Top K**: Set the Top K value for the selected model.
  * **Top P**: Set the Top P value for the selected model.

![IJ-EliteaCode_-ettings1](<../../img/platform/extensions/code/IJ-EliteaCode-Settings1.png>)

![IJ-EliteaCode-Settings2](<../../img/platform/extensions/code/IJ-EliteaCode-Settings2.png>)

![IJ-EliteaCode-Settings3](<../../img/platform/extensions/code/IJ-EliteaCode-Settings3.png>)

These settings ensure that Elitea Code is properly configured to interact with the ELITEA HUB, allowing for seamless integration and efficient use of LLM models within your projects.

**Note**: Restarting IntelliJ may be necessary for changes to take effect.

### Configuration

To initialize **Elitea Code** in your project:

1. Open any file and right-click to select **Alita → Alita:Init**.
2. This creates a `.promptLib` folder with default prompts and `prompts.json` files.

![IJ-EliteaCode-Init](<../../img/platform/extensions/code/IJ-EliteaCode-Init.png>)

### EliteaCode Usage

#### Getting Started with Extension Commands

Jumpstart your Elitea Code experience with these essential commands:

* **Alita: Init**: Initialize Elitea Code in your workspace by creating a `.promptLib` folder at the root. **Note**: After successful initalization the `Alita: Init` command becomes unavailable.
* **Elitea: Create Prompt**: Craft a new prompt within the `.promptLib` folder.
* **Elitea: Edit Context**: Edit the context of an existing prompt in the `.promptLib` folder.
* **Elitea: Predict**: Choose from a list of prompts and generate predictions based on your selection.
* **Elitea: Sync External Prompts**: Synchronize your external prompts, agents and datasources with ELITEA Backend.

#### Synchronize External Prompts

Sync prompts, agents and datasources created in the ELITEA HUB with your Elitea Code setup for seamless integration:

1. **Open `prompts.json`**: Locate and open the `prompts.json` file.
2. **Access Alita Menu**: Right-click in the editor to see the **Alita Actions** item.
3. **Sync Prompts Option**: Select the **Alita: Sync External Prompts** option from the submenu.
4. **Synchronization**: The prompts, agents and datasources will be synced and added to the `prompts.json` file.
5. **Usage**: These prompts, agents and datasources are now ready to be used with `Alita: Predict` command.

![IJ-EliteaCode-Sync)](<../../img/platform/extensions/code/IJ-EliteaCode-Sync.png>)

**Note**: To sync and use prompts, agents and datasources from ELITEA HUB, tag the prompt with `code` in ELITEA HUB.

#### Create a Prompt

Creating a custom prompt in Elitea Code allows you to tailor Gen AI suggestions to your specific tasks. Here's how to create one:

1. **Open a File**: Start by opening any file from your project, or create a new one.
2. **Access Elitea Menu**: Right-click in the editor view to bring up the context menu, where you'll find the **Alita Actions** item.
3. **Create Prompt Option**: Hover over **Alita Actions** in the menu, and on the second level menu, select **Alita: Create Prompt**. The Create Prompt window is opened:
    * **Name**: Assign a descriptive name that clearly reflects the aim of the prompt.
    * **Description**: Summarize the purpose of the prompt, detailing what it intends to achieve. 
    * **Context**: Well crafted prompt corresponding to well-acceppted Frameworks for creating prompts (e.g. CREATE, CRISPE, Elavis Saravia, etc.). In case the prompt's context contains **Variables**, then provide the names and values of the variables in the Variables section.
    * Click the **Use the project integration settings in the context file** checkbox to configure Model, Top-P, Top-K, Tempreature and MaX Tokens settings.
4. Click the **Ok** button to create a prompt. This can be modified later in the `.promptLib` folder. Alita Code will add a reference to the new prompt in `prompts.json` and create a corresponding `.yaml` file in the `.promptLib` folder, which can be edited to extend content and add examples.

![IJ-EliteaCode-CreatePrompt](<../../img/platform/extensions/code/IJ-EliteaCode-CreatePrompt.png>)

#### Edit Prompt Context

Enhance the context of an existing prompt with selected text from your code, improving the relevance of AI suggestions:

1. **Open and Select**: Open any file from your project and select a portion of the text.
2. **Access Alita Menu**: Right-click to open the context menu and find the **Alita Actions** item.
3. **Edit Context Option**: Hover over **Alita Actions** and select **Alita: Edit Context** from the submenu.
4. **Choose a Prompt**: Select the prompt you wish to modify for from the list and click the **Edit** button.
5. **Edit Context** The selected prompt's `yaml` file will be opened where you can make the changes.

![IJ-EliteaCode_Edit](<../../img/platform/extensions/code/IJ-EliteaCode-Edit.png>)

#### Predict (Execute) Prompt

To predict (execute) a prompt or an agent or a datasource directly from IntelliJ to generate Gen AI-driven code suggestions:

1. **Open a File and Select Text**: Open any project file and select the text you want to analyze or for which you need suggestions.
2. **Access Alita Menu**: Right-click in the editor view to see the **Alita Actions** item.
3. **Predict Option**: Hover over **Alita Actions** and choose **Alita: Predict** from the submenu.
4. Select a Prompt, Agent or Datasource:
   * Choose the desired prompt, agent or datasource from the dropdown list.
   * **Version Selection**: Prompts may have multiple versions. Ensure you select the appropriate version from the dropdown list as different versions may vary in functionality and variables.
   * **Variable Management**: If the selected prompt version includes variables, you will either see prepopulated values or you can provide your own values. Ensure that all required variables are correctly filled to execute the prompt accurately.
5. **View Predictions**: After execution, the generated response will be displayed in your editor according to the method specified in your **EliteaCode: Display Type**. 

![IJ-EliteaCode-Predict](<../../img/platform/extensions/code/IJ-EliteaCode-Predict.png>)

![IJ-EliteaCode-Predict(Response)](<../../img/platform/extensions/code/IJ-EliteaCode-Predict(Response).png>)

**Note**: You can use default prompts, those you've created, or external prompts, agents and datasources synced from **ELITEA HUB**.