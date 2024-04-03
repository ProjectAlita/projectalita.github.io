# Prompts

## My libraries menu

The **My libraries** menu is a space designed to create prompts, datasources, collections and organize them.

My libraries menu consists of four pages (tabs):

1. **All** - on this page you can find all your created Prompts, Datasources and Collections.
2. **Prompts** - on this page you can find all your created Prompts.
3. **Datasources** - on this page you can find all your created Datasources.
4. **Collections** - on this page you can find all your created Collections.

![My Library](<../img/My Library.png>)

## My libraries - Prompts page

The **My libraries - Prompts** page serves as a dedicated inventory for all your prompts, irrespective of their current status. Consider it your personal repository for saving and organizing the prompts you've crafted. 

![Prompts-Detailed_View](<../img/Prompts-Detailed_View.png>)

### How to Create a New Prompt

In the context of AI and machine learning, a prompt is an instruction, question, or statement that is given to an AI model to elicit a response or output. It serves as the initial input for systems like conversational agents or generative models.

1. Click the **+ Prompt** button on the top right. 
2. Fill in the **Name**, **Description**, and **Context** fields.
3. Click **Save**.

**Note**: **Name** and **Description** are non-editable fields and can't be modified after saving the prompt.

![Prompt-Create_New_Prompt](<../img/Prompt-Create_New_Prompt.png>)

### How to Create Tags

In Alita, **Tags** serve as an efficient organizational tool that allows you to categorize and manage your collection of prompts. By assigning relevant tags to each prompt, you create an intuitive labeling system that facilitates quick access and retrieval. Later on, you can filter prompts by these tags, simplifying the process of finding the precise prompt you need among a vast collection, which is especially useful for users with an extensive library of different prompt types and topics.

**To add a tag to the prompt:**

1. Type a **tag name** or select from pre-existing tags from **Tags** input box.
2. Press **comma** or **Enter** to create/select tag.
3. Click **Save** to save the prompt with selected tags.
   
**Note:** User has the flexibility to assign one or more tags to each prompt, enabling a multi-dimensional labeling system.

![Prompt-Create_a_Tag](<../img/Prompt-Create_a_Tag.png>)

### How to Setup Messages

The MESSAGES section is a crucial component that allows users to structure the flow of interaction within a prompt.

* **System** message - a system prompt is a way of providing context and instructions to LLM, such as specifying a particular goal or role for LLM before asking it a question or giving it a task.
* **Assistant** message - an Assistant has instructions and can leverage models, tools, and knowledge to respond to user queries
* **User** message, on the other hand, exemplifies what a real human user might say or ask within a given scenario.

To enhance the interactivity of a prompt, user can add multiple messages of any type by clicking the **`+`** icon, selecting the desired message type, and providing the relevant content.
Additionally, user have the ability to delete, copy, and reorder messages to best fit the flow of the conversation, easily arranging them by dragging and dropping the message boxes as needed for optimal organization and presentation.

![Prompt-System_Messages](<../img/Prompt-System_Messages.png>)

### How to Use Variables

The variables within prompts add a layer of dynamic customization, allowing you to tailor prompts to specific needs or contexts.

**Variables** are denoted by double curly brackets (e.g., {{variable_name}}) and should be defined in the prompt's Context input box. Once a variable is entered into the CONTEXT, it automatically populates the VARIABLES section, where you can assign a value to that variable. This feature empowers users to create flexible and reusable prompts that can be easily adapted by changing the values of the variables as needed, without altering the entire prompt structure.

**Note**: User has the flexibility to define one or more variables in each prompt. Variables can also be defined in **Messages**.

![Prompt-Create_Variables](<../img/Prompt-Create_Variables.png>)


### How to Execute Prompt

To execute the prompt and get the output you have 2 options:

* **Chat** - is a specific type of input designed for conversational AI models, which aims to initiate or guide a dialogue. This can be in the form of a question, statement, or command that simulates human-like interaction, prompting the AI to produce a conversational response for engagement.
* **Completion** - is supplied to generative AI models, such as text or code generators, with the intent of the model continuing or completing the given input. The AI uses the context provided in the prompt to produce a coherent and contextually relevant extension or completion of the text.

#### Executing a Prompt Using the **Chat** Option:

1. **Configure the Prompt**: Initialize by providing the necessary context, identifying the prompt with a name, and defining variable values (if applicable).
2. **Select the AI Model**: Choose the appropriate AI model (e.g., gpt-4-0125-preview, gpt-35-turbo, etc.).
3. **Set the Temperature Parameter**: Adjust this parameter to control the level of creativity or unpredictability in responses.
4. **Advanced Parameters** (Optional): For finer control over response generation, you may adjust these optional settings:
    * **Top P (0-1)** - determines the cumulative probability threshold for selecting words, balancing between creativity (higher values) and consistency (lower values).
    * **Top K** - limits the choice of words to the K most probable, affecting the response's diversity and predictability.
    * **Maximum length** - sets the cap on the response length, helping tailor responses to be as concise or detailed as desired.
5. **Initiate Interaction**: Enter your text (be it a question or a command) in the chat box and click the **Send** icon.

![Prompt-Chat_Option](<../img/Prompt-Chat_Option.png>)

Upon receiving the output, the following actions are available:

* To continue the dialogue, enter your subsequent text in the chat box and click the **Send** icon.
* To copy the output, click the **Copy to Clipboard** icon.
* To append the output to the **Assistant Message**, click the **Copy to Messages** icon.
* To generate a new response, click the **Regenerate** icon.
* To eliminate the current output, click the **Delete** icon.
* To purge the chat history, click the **Clean** icon.

![Prompt-Chat_Output](<../img/Prompt-Chat_Output.png>)

#### Executing a Prompt Using the **Completion** Option:

1. **Configure the Prompt**: Start by providing the necessary context, naming the prompt, and setting variable values (if needed).
2. **Select the AI Model**: Choose from the available AI models (e.g., gpt-4-0125-preview, gpt-35-turbo, etc.).
3. **Set the Temperature Parameter**: Adjust this to modulate the AI's creative or unpredictable outputs.
4. **Advanced Parameters** (Optional): For finer control over response generation, you may adjust these optional settings:
    * **Top P (0-1)** - determines the cumulative probability threshold for selecting words, balancing between creativity (higher values) and consistency (lower values).
    * **Top K** - limits the choice of words to the K most probable, affecting the response's diversity and predictability.
    * **Maximum length** - sets the cap on the response length, helping tailor responses to be as concise or detailed as desired.
5. Choose the **Completion** option.
6. **Initiate Execution**: Click the **Run** button.

![Prompt-Completion_Option](<../img/Prompt-Completion_Option.png>)

Upon receiving the output, the following actions are available:

* To regenerate the output, click the **Run** button again.
* To copy the output, utilize the **Copy to Clipboard** icon.

### Managing Prompt Versions: Save, Create Versions, and Manage

To optimally manage your prompts, understanding how to save and create versions is crucial. Follow these guidelines to efficiently save your prompt, create versions, and manage them.

#### How to Save a Prompt:

* To save your work on a prompt for the first time, simply click the **Save** button. This action creates what's known as the "**latest**" version of your prompt.
* You can continue to modify your prompt and save the changes to the "**latest**" version at any time by clicking the **Save** button again. If you wish to discard any changes made, you have the option to click the **Discard** button before saving.

**Remember**: The "**latest**" version represents the initial version you create. You can keep updating this version with your changes by saving them, without the need to create additional versions for your prompt.

#### How to Create New Versions:

For instances where you need to create and manage different iterations of your prompt:

1. **Initiate a New Version**: Start by clicking the **Save As Version** button.
2. **Name Your Version**: Enter a meaningful version name and confirm by clicking **Save**.

![Prompt-Save_Version](<../img/Prompt-Save_Version.png>)

Upon creating a new version of the prompt, several options become available to you:

* **Publish**: Make this particular version of the prompt available for use.
* **Delete**: Remove this version of the prompt if it’s no longer needed.
* **Execute**: Run this specific version of the prompt to see how it performs.
* **Navigate Versions**: Use the **Version** dropdown list to switch between and select different versions of the prompt. This allows for easy comparison and management of various iterations.

![Prompt-Saved_Version](<../img/Prompt-Saved_Version.png>)

By following these steps, you can effectively manage the lifecycle and iterations of your prompts, ensuring that each version is appropriately saved, published, and utilized as per your requirements.

### How to Publish a Prompt

To make your prompt available to the wider Epam Network and Communities, follow these steps for publication:

1. **Publishing Initiation**: With your prompt crafted and saved, initiate the process by clicking the **Publish** button.
2. **Version Naming**: Assign an informative version name (e.g., Gen-1.0) in the pop-up window. This name should encapsulate the essence or objective of the prompt, facilitating version management and future iterations.
3. **Review Submission**: Finalize your submission by clicking **Publish**, forwarding your prompt for the moderation review process. This stage is vital to guarantee the prompts shared within the Epam community meet a standard of quality and relevance.

![Prompt-Publishing](<../img/Prompt-Publishing.png>)

For publishing a specific version, firstly select the desired version and opt to publish. The chosen version's name appears in the "**Publish version**" pop-up window. It can be published as is or renamed before the final publication step.

**Note**: After publishing, the prompt can be retracted by selecting the **Unpublish** button.

#### Moderator Review Process

Submission to publication triggers a meticulous assessment by the moderators, tasked with ensuring prompt standards for quality, efficiency, and security are upheld.

**Evaluative Steps Undertaken by Moderators**:

1. **Initial Assessment**: An initial examination confirms the prompt's completeness and adherence to the submission guidelines.
2. **Content Review**: Evaluates the prompt’s relevance, clarity, compatibility with best practices, and information security.
3. **Practical Evaluation**: Assesses the prompt's operational feasibility, including variables, system commands, and projected outcomes.
4. **Compliance Check**: Final verification against community norms and security protocols, ensuring the protection of sensitive data.

##### Possible Outcomes of the Review

Post-review, a prompt may be categorized as:

* **Published**: Fulfilling all criteria, the prompt is incorporated into the Prompt Library for community access.
* **Feedback for Revision**: Identified as promising but necessitating modifications. Constructive comments guide the revision.
* **Rejected**: Falling short of the required standards, the prompt is declined for publication.

##### Tracking the Status of Prompts

Prompts undergo several statuses through the review phase:

* **All Statuses**: An overview of all submissions regardless of their review stage.
* **Draft**: Saved yet unsubmitted prompts.
* **Published**: Moderation-approved prompts, now accessible in the Library.
* **On Moderation**: Prompts currently under review.
* **User Approval**: The prompt is pending prompt's author approval for publishing a new version.
* **Rejected**: Prompts evaluated and declined for publication.

For status inquiries on your prompts, direct to the "**My Libraries → Prompts**" section on the platform and choose the relevant status from the dropdown menu.

![Prompts-Status_Check](<../img/Prompts-Status_Check.png>)


### How to Add Prompt into Collection

To add prompts to your collection, follow these steps:

1. Once you've [created a collection](collections.md#how-to-create-a-collection), you can start adding relevant prompts. Navigate to the prompt you wish to add and select an option to **Add to Collection**.
2. Select the **Collection** you wish to add your prompt to from the pop-up window. You can add multiple prompts to a collection as long as they share the thematic relevance or purpose you've defined for your collection.

![Prompt-Add_to_Collection](<../img/Prompt-Add_to_Collection.png>)

### How to Export a Prompt

Exporting prompts allows you to utilize them across different platforms by choosing between two specific formats:

* **`[Alita format]`** - this JSON format is optimized for the Alita platform, incorporating Alita-centric details such as prompt versioning, variables with their possible values, tags, and model configurations.
* **`[DIAL format]`** - also in JSON format, it's tailored for integration with the Epam AI Dial platform, including only information and structuring relevant to DIAL.

#### Exporting Your Prompt:

1. Initiate the process by clicking the **Export prompt** icon.
2. Choose your preferred format (Alita or DIAL) for export.
3. The export process will generate a file, which will then be automatically downloaded to your device.

![Prompt-Export_Prompt](<../img/Prompt-Export_Prompt.png>)

This functionality facilitates the transfer and application of your prompts across different platforms by generating easily importable JSON files.

### How to Import a Prompt

To use the prompts created in other platforms, follow these simple steps.

1. **Initiate Import**: Select the **Import** option within Alita.
2. **Choose File**: Browse and select the exported JSON prompt file.
3. **Complete Process**: The prompt will be added under the **My libraries - Prompts** section in Alita.
4. **Use Prompt**: You can now access and utilize the imported prompt.

![Prompt-Import_Alita](<../img/Prompt-Import_Alita.png>)

**Note**: Alita supports [Jinja](https://jinja.palletsprojects.com/en/3.1.x/) template. Make sure the content and variables in your prompt adhere to this format, especially avoiding spaces in variable names. For more information please check [Alita and Epam AI Dial](../alita-dial.md) document.

## Prompts Menu

The **Prompts** menu showcases a collection of published and shared prompts within the community. By default, upon logging in, the user is directed to the **Latest** page of the Prompts menu, which presents newly published prompts.

### Layout of the Prompts Menu

The Prompts menu is organized into three distinct pages, each designed to offer a unique perspective on the available prompts:

* **Latest**: Displays all recently published prompts, providing a fresh look at the newest contributions to the community.
* **My Likes**: Highlights the prompts that you have liked. This personalized page allows you to revisit favorites effortlessly.
* **Trending**: Showcases the prompts with the highest number of likes, serving as a valuable resource for discovering top-rated prompts that hold significant value and popularity within the community.

![Prompts-Menu](<../img/Prompts-Menu.png>)

### Engaging with Published Prompts

Interaction within the community is highly encouraged to recognize and appreciate valuable prompts. The following actions enable active participation:

### Liking Published Prompts

Upon publication, a prompt becomes a crucial resource for the community. To support and acknowledge a prompt, use the **Like** functionality:

* To like a prompt, click on the **Heart** icon associated with it.
* If you wish to withdraw your like, simply click the **Heart** icon again to Unlike the prompt.

### Other Actions for Published Prompts

**Executing Published Prompts**:

* View and run published prompts by clicking on the prompt card or name. Refer to the [How to Execute Prompt](#how-to-execute-prompt) section for guidance on running a prompt.
* **Note**: Modifications to a published prompt cannot be saved for future use.

![Prompt-Executing_Public_Prompt](<../img/Prompt-Executing_Public_Prompt.png>)

**Adding Published Prompts to Collections**:

Enhance your collections by including published prompts. Visit the [How to Add Prompt into Collection](#how-to-add-prompt-into-collection) section for instructions on incorporation.

**Exporting Published Prompts**:

For external use or backup, published prompts can be exported. Details on this process are found in the [How to Export a Prompt](#how-to-export-a-prompt) section.