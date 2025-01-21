# Pipeline Agent Framework

Welcome to the Pipeline Agent Framework guide for ELITEA! This guide will help you understand how to create your own intelligent **agents** within ELITEA, even if you don't have a background in coding. Think of these **agents** as helpful assistants that can guide users through tasks, answer questions, and automate processes. The Pipeline Agent Framework is specifically designed for creating the instructions that your **agents** will follow. Pipeline Agents are based on the LangChain backend and work with Azure OpenAI Service integrations.

Pipeline agents are designed for orchestrating the work of various entities together like prompts, agents, and datasources. This agent type must be selected when you are writing instructions for so-called 'master' agents.

In Pipeline agent instructions, you **can not** directly use available toolkits except for the following ones: prompts, agents, and datasources. These toolkits must be incorporated as part of 'child' agents that your Pipeline Agent orchestrates.

## What is the Pipeline Agent Framework?

Imagine you're building a process step-by-step. The **Pipeline Agent Framework** allows you to define these steps and how they connect in a clear and organized way. It's like creating a flowchart for your AI agent. You define individual actions (like asking a question or using a tool) and then connect them to create a smooth flow.

This framework uses a simple configuration language **YAML** to define how your **agent** works. YAML is designed to be easy to read and understand, making it perfect for describing the steps your **agent** will take. You'll write instructions in YAML that tell ELITEA how your agent should behave.

## Core Concepts: The Building Blocks of Your Pipeline Agent

Let's understand the key parts that make up your intelligent **agent**:

* **Nodes:** The fundamental building blocks representing individual actions or steps the agent can take.
    * These are the *verbs* of your agent's workflow, defining what the agent *does* at each stage.
    * Different node types allow for various actions, such as interacting with the user, calling external tools, or performing specific functions.
* **Transitions:** Define the flow and connections between nodes, dictating the sequence of actions the agent follows.
    * Transitions specify which node the agent should move to after completing the current node's task.
    * They create the directed path through the agent's workflow.
* **Decisions:** Enable the agent to make choices and branch its execution path based on available information or the outcome of a node.
    * Decision points allow for more dynamic and intelligent agent behavior.
    * The agent can evaluate different conditions and select the appropriate next step.
* **Conditions:** Allow for conditional transitions between nodes, where the next step depends on whether a specific rule or condition is met.
    * Conditions introduce logic into the agent's workflow, enabling it to react differently based on data or user input.
* **Entry Point:** Specifies the starting node of the agent's execution, defining where the agent begins its workflow.
    * This is the initial step from which the agent's journey begins.
* **Interruptions:** Provide mechanisms to pause the agent's execution at specific points, allowing for user intervention or inspection.
    * Interruptions can be set to occur before or after a particular node's execution.
* **State:** Represents the agent's memory defined by user, storing information gathered and used throughout its execution.
    * The **state** allows the agent to retain context and use previously acquired information in subsequent steps.
    * It can include default information like messages (conversation history) and custom data defined by the user.

### Nodes

**Nodes** are the individual actions or steps your agent can take. Each node performs a specific task. Think of them as verbs – what your **agent** *does*. The following **Node** types are available:

* **llm**: Enables the agent to interact with users using natural language, powered by AI models.
    * Used for asking questions, providing information, and engaging in conversational exchanges.
* **tool**: Allows the agent to utilize pre-built entities (prompts, agents and datasources) in ELITEA.
    * Facilitates actions like retrieving data, triggering other agents, or using specific prompts and datasources.
* **function**: Provides a mechanism for the agent to directly call and execute specific ELITEA functionalities with precise control over input mapping.
    * Offers a more advanced and potentially efficient way to interact with ELITEA's internal capabilities.
* **loop**: Enables the agent to repeatedly execute a specific task or action, often iterating over a list of items or until a condition is met.
    * Useful for processing collections of data or performing repetitive operations.
* **loop_tool**: Allows the agent to iterate through a list of inputs generated by another ELITEA agent, executing a specified tool or function for each item.
    * Facilitates workflows where the input for a repetitive task is dynamically generated by another entity.

#### Common Node Attributes

**Nodes** have the following attributes:

* **`id`**: A unique name for this specific step. This helps you refer to this node later in your instructions.
* **`type`**:  Specifies the kind of action this node will perform (e.g., asking a question, using a tool).
* **`input`**:  A list of information the node needs to perform its task. This information comes from the agent's memory (the `state`).
* **`output`**: A list of information the node produces after completing its task. This information is then stored in the agent's memory (the `state`).
* **`transition`**:  Specifies the `id` of the next node the agent should move to after this node is finished. If the value is `END`, the agent's execution will stop.
* **`condition`**:  Allows the agent to decide which node to go to next based on certain rules.
* **`decision`**: Allows the agent to choose the next node based on available information or the result of the current action.

**Node types**

Here are the different types of nodes you can use to build your agent:

#### Node type: llm

The **llm** node allows your **agent** to communicate with the user using the power of AI. You provide a `prompt` (a question or instruction), and the AI generates a response.

**Purpose:** To interact with the user, ask questions, provide information, and get feedback using natural language.

**Common Attributes for **llm** Nodes:**

* **`id`**: A unique name for this conversation step (e.g., `Conversation Partner`).
* **`type`**:  Always set this to **llm**.
* **`input` (optional)**: A list of information from the agent's memory (`state`) that the prompt might need. If your prompt uses variables (like in the `fstring` example), this is mandatory.
*   **`prompt`**: The question or instruction you want the AI to use.
    *   **`type`**: Specifies the format of the prompt. It can be either `string` or `fstring`.
        *   **`string`**:  A simple text prompt.
        *   **`fstring`**: A prompt that includes variables in the prompt's value (instrcutions).
    *   **`value`**: The actual text of the question or instruction.
* **`output` (optional)**: A list of names for the information you expect to extract from the user's response. This information will be stored back in the agent's memory (`state`).
* **`structured_output` (optional)**:  Set to `true` if you expect the AI's response to be in a structured format that makes it easy to extract the `output` values. The default is `false`. This also depends on the selected LLM model's capabilities.

**Example 1: llm node - Simple Text Prompt**

```yaml    
- id: Conversation Partner
  type: llm
  input: [input] # Optional, but included here as the prompt refers to user input
  prompt:
    type: string
    value: |
      To create a new User Story, I need some information from you. Could you please provide the 
      following details in the specified format?
      - **Jira Project ID**: (e.g., PLAN)
      - **EPIC ID**: (e.g., PLAN-128)
      - **Title**: (e.g., Checkout functionality)
      - **Description**: (e.g., "The informative description of future US.")
      Once you provide this information, I will ask for your approval (should be 'approved' word) to start the User Story creation process. Make your instructions to user highlighted by using markdown highlight for text.
  output: [description, jira_project_id, epic_id, us_title]
  structured_output: true
  transition: Confluence Extractor # You would define the next step here
```

**Explanation:**

* **`id: Conversation Partner`**:  This node is named "Conversation Partner".
* **`type: llm`**: This indicates it's an LLM node, meaning it will use AI to generate a response.
* **`input: [input]`**: This node takes the user's current input from the agent's chat history.
* **`prompt`**:
      * **`type: string`**: The prompt is a simple text instruction.
      * **`value`**: This is the actual instruction given to the AI. It asks the user for specific information to create a user story.
* **`output: [description, jira_project_id, epic_id, us_title]`**: The agent expects to extract the description, Jira project ID, Epic ID, and user story title from the user's response.
* **`structured_output: true`**: The agent expects the user to provide the information in a structured way (in a `json` format), making it easier to extract the output values.

**Example 2: llm node - Parametrized Prompt (fstring)**

```yaml
- id: User Feedback and Approval
  type: llm
  input: [input, enhanced_us, info_from_datasource] # Mandatory because of fstring
  output: [enhanced_us] # Mandatory because of fstring
  prompt:
    type: fstring
    value: |
      When reviewing and updating a user story, ensure its structure and format remain consistent with the original, unless the user specifically requests changes. Present the updated user story in its entirety, enriched with any necessary information, clearly and concisely for user feedback. Use the following variables to guide the process:
      - **Current User Input:** {input}
      - **Information from Data Source:** {info_from_datasource}
      - **Enhanced User Story:** {enhanced_us}
      Users can provide feedback through free form queries, which will be controlled by the "Current User Input" value. If the query contains "datasource:", access and incorporate specific data from the identified sources into the enhanced user story via "Information from Data Source". Present the full "Enhanced User Story" to the user, ensuring that the structure and format remain unchanged.
      Approval of the enhanced user story can be given by typing "approved," which will publish it to Jira. If no further changes or publication is desired, the user can type "finish" to conclude the session.
  transition: User Story Publisher # You would define the next step here
```

**Explanation:**

* **`id: User Feedback and Approval`**: This node is named "User Feedback and Approval".
* **`type: llm`**: This indicates it's an LLM node.
* **`input: [input, enhanced_us, info_from_datasource]`**: This node requires the user's current input, the enhanced user story, and information from a data source from the agent's memory. This is mandatory because the prompt uses these variables.
* **`prompt`**:
      * **`type: fstring`**: The prompt uses variables.
      * **`value`**: This instruction tells the AI how to present the updated user story to the user, incorporating information from different sources. It uses placeholders like `{input}`, `{info_from_datasource}`, and `{enhanced_us}` to insert the actual values from the agent's memory.
* **`output: [enhanced_us]`**: The agent expects the AI to potentially modify or confirm the enhanced user story.
* **`transition`**: You would specify the next node here.

#### Node type: tool

The **tool** node allows your **agent** to use pre-built entities (prompts, agents and datasources) in ELITEA. The `tool` node is similar to the `function` node.

**Purpose:** To leverage existing entities within ELITEA to perform specific tasks.

**Common Attributes for **tool** nodes:**

* **`id`**: A unique name for this tool usage step (e.g., `Draft User Story Creator`).
* **`type`**: Always set this to `tool`.
* **`tool`**: The name of the specific tool you want to use.       
* **`transition`**: The `id` of the next node to execute after the tool finishes.

**Example 1: tool node**

```yaml
- id: Draft User Story Creator
  type: tool
  tool: User Story Draft Prompt  # Assuming 'User Story Draft Prompt' is a defined prompt in ELITEA
  transition: User Story Enhance Aggregator
```

**Explanation:**

* **`id: Draft User Story Creator`**: This node is named "Draft User Story Creator".
* **`type: tool`**: This indicates it's a tool node.
* **`tool: User Story Draft Prompt`**: This node will use the ELITEA prompt named "User Story Draft Prompt".
* **`transition: User Story Enhance Aggregator`**: After the "User Story Draft Prompt" tool is executed, the agent will move to the node named "User Story Enhance Aggregator".

#### Node type: function

The **function** node is a more advanced way to interact with ELITEA entities. It allows you to call any ELITEA functionality, but you need to explicitly define how the inputs for that functionality are prepared. This gives you more control and can be more efficient in terms of token usage compared to using an **tool** node for input preparation.

**Purpose:** To directly call and utilize specific ELITEA functionalities with precise input mapping.

**Common Attributes for **function** nodes:**

* **`id`**: A unique name for this function call step (e.g., `Draft User Story Creator`).
* **`type`**: Always set this to `function`.
* **`input`**: A list of information from the agent's memory or chat history (`state`) that will be used to prepare the input for the ELITEA entity. This is mandatory.
* **`output`**: A list of names for the information that will be returned by the ELITEA entity. This is mandatory.
* **`input_mapping`**: Defines how the `input` from the agent's memory is mapped to the input parameters of the ELITEA entity.
      * **`type`**: Specifies how the input value is determined:
          * **`variable`**:  Uses the value of a variable from the agent's memory or chat history (`state`).
          * **`fstring`**: Creates a text string by combining values from the agent's memory or chat history.
          * **`fixed`**: Provides a specific, unchanging value.
      * **`value`**: The actual value or the template for creating the value.
* **`transition`**: The `id` of the next node to execute after the function call.

**Example 1: function node - Parametrized node (variable)**

```yaml
- id: Draft User Story Creator
  type: function
  input: [filtered_sumarized_info]
  output: [draft_us]
  input_mapping:
    input:
      type: variable
      value: filtered_sumarized_info
  transition: User Story Enhance Aggregator
```

**Explanation:**

* **`id: Draft User Story Creator`**: This node is named "Draft User Story Creator".
* **`type: function`**: This indicates it's a function node.
* **`input: [filtered_sumarized_info]`**: This node takes the `filtered_sumarized_info` from the agent's memory as input.
* **`output: [draft_us]`**: The function call is expected to produce a `draft_us` (draft user story).
* **`input_mapping`**:
      * **`input`**: This defines the input parameter for the ELITEA entity being called.
      * **`type: variable`**: The value for the `input` parameter will be taken directly from a variable in the agent's memory.
      * **`value: filtered_sumarized_info`**: The value of the `filtered_sumarized_info` variable will be used as the input.
* **`transition: User Story Enhance Aggregator`**: After the function call, the agent will move to the "User Story Enhance Aggregator" node.

**Example 2: function node - Parametrized node (fstring)**

```yaml
- id: User Story Enhance Aggregator
  input: [draft_us]
  output: [enhanced_us]
  input_mapping:
    task:
      type: fstring
      value: |
        Enhance the Narrative, Description and Scenarios with AC's for the given draft User Story: {draft_us}
    chat_history:
      type: fixed
      value: []
  type: function
  transition: User Feedback and Approval
```

**Explanation:**

* **`id: User Story Enhance Aggregator`**: This node is named "User Story Enhance Aggregator".
* **`input: [draft_us]`**: This node takes the `draft_us` from the agent's memory as input.
* **`output: [enhanced_us]`**: The function call is expected to produce an `enhanced_us` (enhanced user story).
* **`input_mapping`**:
      * **`task`**: This defines the `task` input parameter for the ELITEA entity.
          * **`type: fstring`**: The value for the `task` parameter will be created using a template.
          * **`value`**: The template includes the `draft_us` variable from the agent's memory.
      * **`chat_history`**: This defines the `chat_history` input parameter.
          * **`type: fixed`**: The value for the `chat_history` parameter will be a fixed value.
          * **`value: []`**: The fixed value is an empty list.
* **`type: function`**: This indicates it's a function node.
* **`transition: User Feedback and Approval`**: After the function call, the agent will move to the "User Feedback and Approval" node.

#### Node type: loop

The **loop** node allows you to execute a specific task repeatedly. You define how to create the input for each iteration of the loop.

**Purpose:** To perform the same action multiple times, potentially with different inputs each time.

**Common Attributes for **loop** nodes:**

* **`id`**: A unique name for this loop step (e.g., `Documentor`).
* **`type`**: Always set this to `loop`.
* **`task`**: Instructions on how to create the input for each iteration of the loop. This often involves accessing and formatting data from the agent's memory.
* **`tool`**: The name of the ELITEA entity (like a prompt or another agent) that will be executed in each iteration of the loop.
* **`transition`**: The `id` of the next node to execute after the loop finishes.

**Example 1: loop node**

```yaml
- id: Documentor
  type: loop
  task: "Formulate ALL file paths from chat_history as a list of inputs. The input values should be of format \"{\"task\": \"<file path from chat history>\", \"chat_history\": [<actual chat history>]}\""
  tool: Code Documentation  # Assuming 'Code Documentation' is a defined prompt or agent in ELITEA
  transition: END
```

**Explanation:**

* **`id: Documentor`**: This node is named "Documentor".
* **`type: loop`**: This indicates it's a loop node.
* **`task`**: This instruction tells the agent how to prepare the input for each loop iteration. It specifies to extract file paths from the `chat_history` and format them into a specific structure.
* **`tool: Code Documentation`**: In each iteration of the loop, the agent will execute the ELITEA entity named "Code Documentation".
* **`transition: END`**: After the loop finishes, the agent's execution will stop.

#### Node type: loop_tool

The **loop_tool** node is similar to the **loop** node, but it gets the list of inputs for the loop from the output of another ELITEA agent.

**Purpose:** To iterate through a list of items generated by another agent and perform a specific action on each item.

**Common Attributes for **loop_tool** nodes:**

* **`id`**: A unique name for this loop step (e.g., `Documentor`).
* **`type`**: Always set this to `loop_tool`.
* **`tool`**: The name of the ELITEA agent that will generate the list of inputs for the loop.
* **`loop_tool`**: The name of the ELITEA entity (like a prompt or another agent) that will be executed for each item in the list.
* **`variables_mapping`**:  Specifies how the variables from the output of the `tool` are mapped to the input parameters of the `loop_tool`.
* **`input`**:  A list of information from the agent's memory (`state`) that might be needed by the `tool` that generates the input list.
* **`output`**: A list of names for the information produced by the `loop_tool` in each iteration.
* **`structured_output`**:  Indicates whether the output of the `loop_tool` is structured. Defaults to `False`.

**Example 1: loop-tool node**

```yaml
- id: Documentor
  type: loop_tool
  tool: File List Generator  # Assuming 'File List Generator' is an agent that outputs a list of files
  loop_tool: Code Documentation  # Assuming 'Code Documentation' is a prompt or agent
  variables_mapping:
    file_name: str
    output_dir: str
  input: []
  output: []
  structured_output: True
```

**Explanation:**

* **`id: Documentor`**: This node is named "Documentor".
* **`type: loop_tool`**: This indicates it's a `loop_from_tool` node.
* **`tool: File List Generator`**: The agent named "File List Generator" will be executed first to generate a list of files.
* **`loop_tool: Code Documentation`**: For each file in the list generated by "File List Generator", the agent named "Code Documentation" will be executed.
* **`variables_mapping`**: This specifies that the output of "File List Generator" contains `file_name` and `output_dir` variables (both strings), which will be used as input for "Code Documentation".
* **`input: []`**: The "File List Generator" agent doesn't require any specific input from the agent's memory in this case.
* **`output: []`**: The "Code Documentation" agent's output is not explicitly stored in the agent's memory in this example.
* **`structured_output: True`**: The output of the "Code Documentation" agent is expected to be structured.

### Transitions

**Transitions** define how the agent moves from one node to the next. They are the connections between the steps in your agent's workflow.

The **transition** within a node, the **transition** attribute specifies the `id` of the next node to be executed after the current node completes its task. If the `transition` is set to `END`, the agent's execution will stop.

**Example:**

```yaml
- id: Get User Input
  type: llm
  # ... other attributes ...
  transition: Process User Input

- id: Process User Input
  type: function
  # ... other attributes ...
  transition: END
```

In this example, after the "Get User Input" node is completed, the agent will move to the "Process User Input" node. After "Process User Input" is done, it will complete the execution of the agent.

### Decisions

The **decision** allows a node to choose the next node to execute based on available information or the result of its current action. This creates branching paths in your agent's workflow.

**Common Attributes for **decision**:**

* **`decision`**: Indicates that this node will make a decision.
    * **`nodes`**: A list of the possible `id`s of the nodes the agent can transition to.
    * **`description`**: A brief explanation of the decision being made.
    * **`decisional_inputs`**: A list of information from the agent's memory or chat history (`state`) that will be used to make the decision.
    * **`default_output`**: The `id` of the node to transition to if none of the specific decision conditions are met.

**Example 1: decision within an llm node:**

```yaml
- id: User Feedback
  type: llm
  # ... other attributes ...
  decision:
    nodes: ["Publish Story", "Request Clarification", "END"]
    description: "Decide the next step based on user feedback."
    decisional_inputs: ["user_input"]
    default_output: "User Feedback"
```

**Explanation:**

After the "User Feedback" node, the agent will examine the `user_input`. Based on the content of `user_input` (which you would define the logic for in the background), it can decide to go to "Publish Story", "Request Clarification", or end the execution (`END`). If the `user_input` doesn't match the criteria for any of those options, it will default back to the "User Feedback" node.

### Conditions

The **condition** attribute allows a node to move to different next nodes depending on whether a specific rule or condition is true or false. This lets you create more complex logic in your agent.

**Common Attributes for `condition`:**

* **`condition`**: Indicates that the transition depends on a condition.
    * **`condition_input`**: A list of information from the agent's memory or chat history (`state`) that will be used to evaluate the condition.
    * **`condition_definition`**: The actual rule or condition to be evaluated. This is often written using a templating language like Jinja.

**Example 1: condition within an llm node:**

```yaml
- id: Get User Story Details
  type: llm
  input: [input]
  prompt:
    type: string
    value: "Please provide the description, Jira Project ID, EPIC ID, and User Story Title."
  output: [description, jira_project_id, epic_id, us_title]
  structured_output: true
  condition:
    condition_input: [description, jira_project_id, epic_id, us_title, input]
    condition_definition: |
      {% if 'approved' in input|lower and description and jira_project_id and epic_id and us_title %}
      Unified Content Aggregator
      {% else %}
      Conversation Partner
      {% endif %}
```

**Explanation:**

After the "Get User Story Details" node, the agent will check the `condition_definition`. It checks if the user's input (converted to lowercase) contains the word "approved" AND if the `description`, `jira_project_id`, `epic_id`, and `us_title` variables in the agent's memory have values.

* If the condition is true (the user typed "approved" and provided all the information), the agent will transition to the node named "Unified Content Aggregator".
* If the condition is false, the agent will transition to the node named "Conversation Partner".

### Entry Point and Interruptions

* The **entry_point**: This is defined at the top level of your **YAML** instructions and specifies the `id` of the first node that will be executed when the agent starts. This is the starting point of your agent's journey.

    **Example:**

    ```yaml
    entry_point: Conversation Partner
    ```

* **interrupt_before**: This is an optional attribute you can add to the top level of your YAML file. It allows you to pause the agent's execution *before* a specific node is executed and give control back to the user.

    **Example:**

    ```yaml
    interrupt_before:
      - Unified Content Aggregator
    ```

**Explanation:** This will pause the agent right before it executes the "Unified Content Aggregator" node.

* **interrupt_after**: This is an optional attribute you can add to the top level of your YAML file. It allows you to pause the agent's execution *after* a specific node has been executed and give control back to the user.

    **Example:**

    ```yaml
    interrupt_after:
      - Conversation Partner
    ```

**Explanation:** This will pause the agent right after it finishes executing the "Conversation Partner" node.

### State

The **state** is the agent's memory defined by user. It stores information that the agent gathers and uses throughout its execution. The default state includes `messages` (the conversation history). You can define **custom states** to store other relevant information. **Note:** If you define custome states, you must add messages into state.

**Example 1: State**

```yaml
state:
  jira_project_id: str
  epic_id: str
  us_title: str
  description: str
  input: str
  messages: list
  filtered_sumarized_info: str
  draft_us: str
  info_from_datasource: str
  enhanced_us: str
```

**Explanation:**

This **state** definition indicates that the agent will store information related to Jira project ID, Epic ID, user story title, description, user input, conversation history, summarized information, draft user story, information from a data source, and the enhanced user story. The `str` and `list` indicate the expected data type for each piece of information. If you only need the default `messages` state, you can omit the **state** section entirely.

## Creating Your First Pipeline Agent in ELITEA

Ready to build your own agent? Here's a step-by-step instructions to creating a Pipeline Agent in ELITEA:

1.  **Start a New Agent:**
    *   Look for the **"+ Agent"** button, located in the top right corner of the ELITEA interface. Click this button to begin creating a new agent.
    *   This action will open the **Configuration** tab for your new agent, where you'll define its settings and behavior.
2.  **Name and Describe Your Agent:**
    *   In the **Configuration** tab, you'll see fields for **Name** and **Description**.
    *   **Name:** Give your agent a clear and descriptive name. This name will help you easily identify your agent in ELITEA. For example, "User Story Creator" or "Code Documentor".
    *   **Description:** Write a brief description of what your agent does. This helps you and others understand the agent's purpose at a glance. For example, "Agent to guide users through creating user stories in Jira."
3.  **Add Tags (Optional):**
    *   The **Tags** input box allows you to categorize your agent using keywords or labels.
    *   You can either type in a new tag name and press Enter, or select from a list of tags you've used before.
    *   Tags are helpful for organizing and searching for your agents later, especially if you create many of them.
4.  **Choose the Agent Type:**
    *   Locate the **Agent type** dropdown menu in the **Configuration** tab.
    *   Select **"Pipeline"** from the dropdown. This tells ELITEA that you want to create a Pipeline Agent, which uses the YAML-based framework we're discussing in this guide.
5.  **Provide YAML Instructions:**
    *   This is the heart of creating a Pipeline Agent! In the **Instructions** field, you will write the YAML code that defines your agent's workflow.
    *   Refer to the previous sections of this guide to understand how to write YAML instructions, define nodes, transitions, conditions, and more.
    *   **Important:** Make sure your YAML is correctly formatted, especially the indentation. You can use the YAML Indentation Corrector prompt mentioned in the Troubleshooting section if needed.
6.  **Add and Set Up Toolkits:**
    *   Scroll down to the **Toolkits** section in the agent configuration.
    *   Toolkits provide your agent with access to various functionalities within ELITEA.
    *   Click **"Add Toolkit"** and choose the toolkits your agent needs to perform its tasks. For example, you might need a Jira toolkit to interact with Jira, or a data source toolkit to access external information.
    *   After adding a toolkit, you may need to configure it. This might involve providing API keys, connection details, or other settings specific to the toolkit. Follow the instructions provided for each toolkit you add.
    *   **Remember:** For Pipeline Agents, you generally won't directly add "prompt", "agent", or "datasource" toolkits here. These are orchestrated *within* your Pipeline Agent's YAML instructions, often as 'child' agents or functions.
7.  **Configure Conversation Starter and Welcome Message (Optional):**
    *   These optional settings allow you to customize the initial interaction with your agent.
    *   **Conversation Starter:** This is a predefined set of questions or prompts that are suggested to the user when they first start a conversation with your agent. It can help guide users on how to interact with the agent.
    *   **Welcome Message:** This is a message that your agent automatically sends to the user when a conversation begins. It can be used to greet the user, explain what the agent can do, or provide initial instructions.
    *   You can configure these in the **Conversation Starter** and **Welcome Message** sections of the agent configuration.
8.  **Save Your Agent:**
    *   Once you have filled in the necessary information, provided your YAML instructions, and added toolkits, click the **"Save"** button (usually located at the bottom or top of the configuration page).
    *   Saving your agent makes your configuration live and ready to use.

![Pipeline-Create_Agent](<../../img/how-tos/pipeline/Pipeline-Create_Agent.png>)   


## Best Practices and Use Cases

* **Start with a clear goal:** Define what you want your agent to achieve before you start building.
* **Break down complex tasks:** Divide large tasks into smaller, manageable nodes.
* **Use descriptive node IDs:** Choose names that clearly indicate the purpose of each node.
* **Plan your transitions carefully:** Ensure a logical flow between nodes.
* **Test your agent thoroughly:**  Run your agent through different scenarios to identify and fix any issues.
* **Utilize conditions and decisions for dynamic behavior:** Make your agent more intelligent by allowing it to adapt based on user input and data.
* **Leverage the **function** node for efficiency:** When interacting with ELITEA entities, consider using the **function** node for more direct and potentially token-saving interactions.

**Use Cases:**

Pipeline Agents in ELITEA are particularly powerful for creating "master" agents. These master agents are designed for orchestration, meaning they manage and direct the flow between various other agents and ELITEA entities to achieve complex goals. Let's explore some detailed use cases:

### Use Case 1: User Story Creation Workflow Manager

**Scenario:** This agent guides a user through the entire process of creating a well-defined user story in Jira, from gathering initial requirements to publishing the final version.

**Solution:** This agent uses a combination of **llm** nodes for interacting with the user and **function** nodes to process information and interact with Jira. The **condition** is used for decision-making based on user input.

**YAML Instructions:**

```yaml
state:
  jira_project_id: str
  epic_id: str
  us_title: str
  description: str
  input: str
  messages: list
  filtered_sumarized_info: str
  draft_us: str
  info_from_datasource: str
  enhanced_us: str
entry_point: Conversation Partner
interrupt_after:
  - Conversation Partner
  - User Feedback and Approval
nodes:
  - id: Conversation Partner
    type: llm
    input: [input]
    prompt:
      type: string
      value: |
        To create a new User Story, I need some information from you. Could you please provide the following details in the specified format?
        - **Jira Project ID**: (e.g., PLAN)
        - **EPIC ID**: (e.g., PLAN-128)
        - **Title**: (e.g., Checkout functionality)
        - **Description**: (e.g., "The informative description of future US.")
        Once you provide this information, I will ask for your approval (should be 'approved' word) to start the User Story creation process. Make your instructions to user highlighted by using markdown highlight for text.
    output: [description, jira_project_id, epic_id, us_title]
    structured_output: true
    condition:
      condition_input: [description, jira_project_id, epic_id, us_title, input]
      condition_definition: |
        {% if 'approved' in input|lower and description and jira_project_id and epic_id and us_title %}
        Unified Content Aggregator
        {% else %}
        Conversation Partner
        {% endif %}
  - id: Unified Content Aggregator
    input: [epic_id, description]
    output: [filtered_sumarized_info]
    input_mapping:
      task:
        type: fstring
        value: |
          Epic ID: {epic_id}.
          Description: {description}
      chat_history:
        type: fixed
        value: []
    type: function
    transition: Draft User Story Creator
  - id: Draft User Story Creator
    type: function
    input: [filtered_sumarized_info]
    output: [draft_us]
    input_mapping:
      input:
        type: variable
        value: filtered_sumarized_info
    transition: User Story Enhance Aggregator
  - id: User Story Enhance Aggregator
    input: [draft_us]
    output: [enhanced_us]
    input_mapping:
      task:
        type: fstring
        value: |
          Enhance the Narrative, Description and Scenarios with AC's for the given draft User Story: {draft_us}
      chat_history:
        type: fixed
        value: []
    type: function
    transition: User Feedback and Approval
  - id: User Feedback and Approval
    type: llm
    input: [input, enhanced_us, info_from_datasource]
    output: [enhanced_us]
    prompt:
      type: fstring
      value: |
        When reviewing and updating a user story, ensure its structure and format remain consistent with the original, unless the user specifically requests changes. Present the updated user story in its entirety, enriched with any necessary information, clearly and concisely for user feedback. Use the following variables to guide the process:
        - **Current User Input:** {input}
        - **Information from Data Source:** {info_from_datasource}
        - **Enhanced User Story:** {enhanced_us}
        Users can provide feedback through free form queries, which will be controlled by the "Current User Input" value. If the query contains "datasource:", access and incorporate specific data from the identified sources into the enhanced user story via "Information from Data Source". Present the full "Enhanced User Story" to the user, ensuring that the structure and format remain unchanged.
        Approval of the enhanced user story can be given by typing "approved," which will publish it to Jira. If no further changes or publication is desired, the user can type "finish" to conclude the session.
    condition:
      condition_input: [input]
      condition_definition: |
        {% if 'approved' in input|lower %}
        User Story Publisher
        {% elif 'datasource:' in input|lower %}
        Special
        {% elif 'finish' in input|lower %}
        END
        {% else %}
        User Feedback and Approval
        {% endif %}
  - id: Special
    input: [input]
    output: [info_from_datasource]
    input_mapping:
      task:
        type: variable
        value: input
      chat_history:
        type: fixed
        value: []
    type: function
    transition: User Feedback and Approval
  - id: User Story Publisher
    input: [jira_project_id, epic_id, enhanced_us]
    input_mapping:
      task:
        type: fstring
        value: |
          Create User Story in Jira using the following details:
          Project Id: {jira_project_id}
          Parent Jira Issue ID: {epic_id}
          User Story content: {enhanced_us}
      chat_history:
        type: fixed
        value: []
    type: function
    transition: END
```

**Detailed Explanation:**

1. **`state`**: Defines the information the agent will remember, such as Jira details, user input, and the evolving user story.
2. **`entry_point: Conversation Partner`**: The agent starts by engaging the user with the "Conversation Partner" node.
3. **`interrupt_after`**: Specifies points where the agent will pause and allow user intervention after the "Conversation Partner" and "User Feedback and Approval" nodes.
4. **`nodes`**:
    * **`Conversation Partner` (llm node)**:
        * **Purpose**: Gathers initial information (Jira Project ID, Epic ID, Title, Description) from the user using a prompt.
        * **`input: [input]`**: Takes the user's latest input.
        * **`prompt`**:  Instructs the user on what information to provide and in what format.
        * **`output: [description, jira_project_id, epic_id, us_title]`**: Extracts the provided information and stores it in the agent's `state`.
        * **`condition`**: Checks if the user has provided all necessary information and typed 'approved'. If so, it moves to "Unified Content Aggregator"; otherwise, it loops back to "Conversation Partner".
    * **`Unified Content Aggregator` (function node)**:
        * **Purpose**:  Prepares input for the next step by combining the Epic ID and Description.
        * **`input: [epic_id, description]`**: Uses the Epic ID and Description from the `state`.
        * **`output: [filtered_sumarized_info]`**: Stores the combined information.
        * **`input_mapping`**: Creates a formatted string (`fstring`) with the Epic ID and Description.
        * **`transition: Draft User Story Creator`**: Moves to the next step.
    * **`Draft User Story Creator` (function node)**:
        * **Purpose**: Creates a draft user story. This would likely call an internal ELITEA function or another agent.
        * **`input: [filtered_sumarized_info]`**: Uses the combined information from the previous step.
        * **`output: [draft_us]`**: Stores the generated draft user story.
        * **`input_mapping`**:  Passes the `filtered_sumarized_info` as input.
        * **`transition: User Story Enhance Aggregator`**: Proceeds to the enhancement phase.
    * **`User Story Enhance Aggregator` (function node)**:
        * **Purpose**: Enhances the draft user story with narratives, descriptions, and acceptance criteria.
        * **`input: [draft_us]`**: Takes the draft user story as input.
        * **`output: [enhanced_us]`**: Stores the enhanced user story.
        * **`input_mapping`**: Uses an `fstring` to instruct the enhancement process.
        * **`transition: User Feedback and Approval`**: Moves to get user feedback.
    *   **`User Feedback and Approval` (llm node)**:
        * **Purpose**: Presents the enhanced user story to the user for review and gathers feedback.
        * **`input: [input, enhanced_us, info_from_datasource]`**: Uses the current user input, the enhanced user story, and any information from external data sources.
        * **`prompt`**:  Provides instructions to the user on how to provide feedback, request data, approve, or finish.
        * **`output: [enhanced_us]`**: Updates the enhanced user story based on feedback.
        * **`condition`**: Directs the flow based on user input:
            * `approved`: Moves to "User Story Publisher".
            * `datasource:`: Moves to "Special" to fetch data.
            * `finish`: Ends the agent execution.
            * Other input: Loops back to "User Feedback and Approval".
    * **`Special` (function node)**:
        * **Purpose**: Handles requests for incorporating data from external sources.
        * **`input: [input]`**: Takes the user's input containing the datasource request.
        * **`output: [info_from_datasource]`**: Stores the fetched data.
        * **`input_mapping`**: Passes the user's input as the task.
        * **`transition: User Feedback and Approval`**: Returns to the feedback stage.
    * **`User Story Publisher` (function node)**:
        * **Purpose**: Publishes the approved user story to Jira.
        * **`input: [jira_project_id, epic_id, enhanced_us]`**: Uses the Jira details and the final user story.
        * **`input_mapping`**: Creates a formatted string with the Jira details and user story content for publishing.
        * **`transition: END`**: Completes the agent execution.

### Use Case 2: User Story Review Workflow Manager

**Scenario:** This agent assists in reviewing and updating existing user stories in Jira.

**Solution:** Similar to the creation workflow, this agent uses **llm** for user interaction and **function** nodes to read and update Jira. **condition** manages the flow based on user input.

**YAML Instructions:**

```yaml
entry_point: Conversation Partner
interrupt_after:
  - Conversation Partner
  - User Feedback and Approval
nodes:
  - id: Conversation Partner
    type: llm
    prompt:
      type: string
      value: |
      To review and update User Story, I need some information from you. Could you please provide the following details in the specified format?
      - **JIRA Ticket ID**: (e.g., PLAN-128)
      Once you provide this information, I will ask for your approval (should be 'approved' word) to start the US review process. Make your instructions to user highlighted by using markdown highlight for text.
    condition:
      condition_input: [messages]
      condition_definition: |
        {% if 'approved' in messages[-1]['content']|lower %}
        Jira_Read
        {% else %}
        Conversation Partner
        {% endif %}
  - id: Jira_Read
    type: function
    transition: User Feedback and Approval
  - id: User Feedback and Approval
    type: llm
    prompt: 
      type: string
      value: |
      Ensure that after each review and update, the structure and format of the updated User Story remain consistent with the original, unless the user explicitly requests changes.
      Present the user story for user review and approval.
        - **Free format instructions** to make changes.
        - **Type 'datasource:'** followed by instructions to enhance using datasources.
        - **Type 'approved'** to publish the enhanced User Story to Jira.
        - **Type 'finish'** if you don't want to publish the enhanced User Story to Jira or make further changes.
    condition:
      condition_input: [messages]
      condition_definition: |
        {% if 'approved' in messages[-1]['content']|lower %}
        Jira_Update
        {% elif 'datasource:' in messages[-1]['content']|lower %}
        Special
        {% elif 'finish' in messages[-1]['content']|lower %}
        END
        {% else %}
        User Feedback and Approval
        {% endif %}
  - id: Special
    type: function
    transition: User Feedback and Approval
  - id: Jira_Update
    type: function
    transition: END
```

**Detailed Explanation:**

1. **`entry_point: Conversation Partner`**: The agent starts by asking for the Jira Ticket ID.
2. **`interrupt_after`**: Allows user intervention after the initial information gathering and feedback stages.
3. **`nodes`**:
    * **`Conversation Partner` (llm node)**:
        * **Purpose**: Gets the Jira Ticket ID from the user.
        * **`prompt`**: Asks for the Jira Ticket ID and approval to start the review.
        * **`condition`**: Checks if the last message contains 'approved' (case-insensitive). If yes, moves to "Jira_Read"; otherwise, stays at "Conversation Partner".
    * **`Jira_Read` (function node)**:
        * **Purpose**: Reads the user story details from Jira using the provided Ticket ID.
        * **`transition: User Feedback and Approval`**: Proceeds to the feedback stage.
    * **`User Feedback and Approval` (llm node)**:
        * **Purpose**: Presents the user story for review and gathers feedback.
        * **`prompt`**: Provides instructions on how to provide feedback, request data, approve, or finish.
        * **`condition`**: Directs the flow based on the last message content:
            *   `approved`: Moves to "Jira_Update".
            *   `datasource:`: Moves to "Special".
            *   `finish`: Ends the execution.
            *   Other input: Loops back to "User Feedback and Approval".
    * **`Special` (function node)**:
        * **Purpose**: Handles requests for incorporating data from external sources (implementation details would be similar to the previous use case).
        * **`transition: User Feedback and Approval`**: Returns to the feedback stage.
    * **`Jira_Update` (function node)**:
        * **Purpose**: Updates the user story in Jira with the reviewed content.
        * **`transition: END`**: Completes the agent execution.

### Use Case 3: Code Documentation

**Scenario:** This agent automates the process of generating technical documentation for code files.

**Solution:** This agent uses a **tool** node to get a list of files and a **loop** node to iterate through each file and generate documentation.

**YAML Instructions:**

```yaml
entry_point: File List Extractor
nodes:
  - id: File List Extractor
    type: tool
    transition: Documentor
  - id: Documentor
    type: loop
    task: "Formulate ALL file paths from chat_history as a list of inputs. The input values should be of format \"{\"task\": \"<file path from chat history>\", \"chat_history\": [<actual chat history>]}\""
    tool: Code Documentation
    transition: END
```

**Detailed Explanation:**

1. **`entry_point: File List Extractor`**: The agent starts by extracting a list of files.
2. **`nodes`**:
    * **`File List Extractor` (tool node)**:
        * **Purpose**: Uses a pre-built tool (likely within ELITEA) to get a list of relevant files.
        * **`transition: Documentor`**: Moves to the documentation generation phase.
    * **`Documentor` (loop node)**:
        * **Purpose**: Iterates through the list of files and generates documentation for each.
        * **`task`**: Defines how to format the input for the "Code Documentation" tool for each file. It instructs the agent to take file paths from the `chat_history` and format them.
        * **`tool: Code Documentation`**:  This refers to an ELITEA entity (likely a prompt or another agent) responsible for generating documentation for a given file path.
        * **`transition: END`**: Completes the agent execution after processing all files.

### Use Case 4: Orchestrating US Creation and Test Case Generation

**Scenario:** This master agent orchestrates the creation of a user story followed by the generation of test cases for that user story.

**Solution:** This agent uses **function** nodes to trigger other specialized agents for user story creation and test case generation.

**YAML Instructions:**

```yaml
entry_point: BA Agent - Create User Stories
nodes:
  - id: BA Agent - Create User Stories
    type: function
    transition: QA Agent - Create Test Cases
  - id: QA Agent - Create Test Cases
    type: function
    transition: END
```

**Detailed Explanation:**

1. **`entry_point: BA Agent - Create User Stories`**: The agent starts by triggering the "BA Agent - Create User Stories".
2. **`nodes`**:
    * **`BA Agent - Create User Stories` (function node)**:
        * **Purpose**: Triggers another ELITEA agent specifically designed for user story creation.
        * **`transition: QA Agent - Create Test Cases`**: Once the user story is created, it moves to the test case generation phase.
    * **`QA Agent - Create Test Cases` (function node)**:
        * **Purpose**: Triggers another ELITEA agent responsible for generating test cases for the newly created user story.
        * **`transition: END`**: Completes the agent execution after test cases are generated.

This use case highlights the power of Pipeline Agents for orchestration. The master agent doesn't perform the detailed tasks itself but delegates them to specialized agents, creating a modular and efficient workflow.

### Use Case 5: Master - Bulk User Story Creation Workflow Manager

**Scenario:** This agent acts as a central hub for creating multiple user stories at once and then publishing them either to Jira or Confluence, depending on the user's provided information.

**Solution:** This agent utilizes an **llm** node for initial input, a **function** node to extract relevant information, a **tool** node to handle the bulk creation, another **llm** node to prepare data for publishing, and a **decision** node to route to the appropriate publishing function (**function** nodes for Jira and Confluence).

**YAML Instructions:**

```yaml
entry_point: User Input
nodes:
  - id: User Input
    type: llm
    prompt:
      type: string
      value: |
        Act as a router and route the user query to the appropriate node using the provided user input.
    transition: Jira Epic Extractor
  - id: Jira Epic Extractor
    type: function
    transition: Bulk User Stories Creator
  - id: Bulk User Stories Creator
    type: tool
    transition: Story Creator
  - id: Story Creator
    type: llm
    prompt:
      type: string
      value: |
        For publishing, provide the Project and EPIC if using the "Jira Bulk US Publisher" node. Provide the Confluence Space Key and Confluence  Parent Page ID if using the "Confluence Bulk US Publisher" node. Use the created bulk User Stories from the chat history and pass them unchanged to the next node. Carefully prepare the data for the next node including the initial provided by user input (first message in the chat history).
    decision:
      nodes:
        - Confluence Bulk US Publisher
        - Jira Bulk US Publisher
      description: |
        Select "Confluence Bulk US Publisher" if a Confluence Parent Page ID is provided in the user input. If not, select "Jira Bulk US Publisher." Ensure publishing occurs in only one node based on the presence of the Confluence Parent Page ID.
  - id: Confluence Bulk US Publisher
    type: function
    transition: END
  - id: Jira Bulk US Publisher
    type: function
    transition: END
```

**Detailed Explanation:**

1. **`entry_point: User Input`**: The agent begins by receiving user input in the "User Input" node.
2. **`nodes`**:
    *   **`User Input` (llm node)**:
        *   **Purpose**: Acts as an initial entry point, receiving the user's request for bulk user story creation. While the prompt itself is simple, in a real-world scenario, this node might contain more elaborate instructions to guide the user on providing the necessary information for bulk creation.
        *   **`prompt`**:  The prompt instructs the LLM to act as a router, preparing to send the user's query to the next appropriate node.
        *   **`transition: Jira Epic Extractor`**:  The agent proceeds to the "Jira Epic Extractor" node. Note that the naming of this transition might be slightly misleading as the agent intends to handle both Jira and Confluence publishing. A more generic name like "Extract Information" might be more accurate.
    *   **`Jira Epic Extractor` (function node)**:
        *   **Purpose**: This node is intended to extract relevant information from the user's input, such as the Jira Epic under which the user stories should be created. It's important to note that the current YAML doesn't explicitly define the `input`, `output`, or `input_mapping` for this node. In a functional implementation, these attributes would be crucial to define how the information is extracted.
        *   **`transition: Bulk User Stories Creator`**: After extracting the necessary information (presumably the Jira Epic), the agent moves to the "Bulk User Stories Creator" node.
    *   **`Bulk User Stories Creator` (tool node)**:
        *   **Purpose**: This node utilizes a pre-built tool within ELITEA to handle the actual creation of multiple user stories. The specifics of this tool (e.g., how it receives the user story data) are not detailed in the YAML.
        *   **`transition: Story Creator`**: Once the bulk user stories are created, the agent transitions to the "Story Creator" node to prepare them for publishing.
    *   **`Story Creator` (llm node)**:
        *   **Purpose**: This node prepares the created user stories and gathers necessary publishing information from the user.
        *   **`prompt`**: The prompt instructs the user to provide either Jira Project and EPIC details or Confluence Space Key and Parent Page ID, depending on where they want to publish the stories. It also emphasizes passing the created user stories (from the chat history) to the next node.
        *   **`decision`**: This attribute defines the logic for choosing the appropriate publishing node.
            *   **`nodes`**: Lists the possible next nodes: "Confluence Bulk US Publisher" and "Jira Bulk US Publisher".
            *   **`description`**: Explains the decision-making process: if a Confluence Parent Page ID is present in the user input, route to the Confluence publisher; otherwise, route to the Jira publisher. This ensures that the publishing happens in only one of the nodes.
    *   **`Confluence Bulk US Publisher` (function node)**:
        *   **Purpose**: This node utilizes a function within ELITEA to publish the bulk user stories to Confluence. The specific implementation details of this function are not shown in the YAML, but it would handle the interaction with the Confluence API.
        *   **`transition: END`**: After publishing to Confluence, the agent's execution is complete.
    *   **`Jira Bulk US Publisher` (function node)**:
        *   **Purpose**: This node utilizes a function within ELITEA to publish the bulk user stories to Jira. Similar to the Confluence publisher, the implementation details are not shown.
        *   **`transition: END`**: After publishing to Jira, the agent's execution is complete.

This use case demonstrates a more complex orchestration scenario where the Pipeline Agent acts as a smart router, guiding the user through bulk operations and making decisions based on the provided information to ensure the user stories are published to the correct platform.


## Troubleshooting

Building and running Pipeline Agents can sometimes present challenges. This section provides guidance on how to diagnose and resolve common issues. Remember to carefully check the error messages displayed in the Chat window during the agent's execution, as they often provide valuable clues.

Here are some common problems and how to address them:

*   **YAML Syntax:**
    *   **Problem:** The agent fails to load or behaves unexpectedly due to errors in the basic structure of the YAML file.
    *   **Solution:** Ensure you have a solid understanding of fundamental YAML syntax, including:
        *   **Key-value pairs:** Data is represented as `key: value`.
        *   **Indentation:** Consistent indentation is crucial for defining hierarchy and structure.
        *   **Lists:** Use hyphens (-) to denote items in a list.
        *   **Data types:** Be mindful of data types (strings, numbers, booleans, lists, dictionaries).
        *   **Avoid tabs:** Use spaces for indentation.
*   **YAML Indentation Issue:**
    *   **Problem:** The agent fails to load or behaves unexpectedly due to incorrect YAML formatting.
    *   **Solution:** YAML relies heavily on proper indentation (using spaces, not tabs) to define its structure. Ensure that your YAML instructions are correctly indented. You can use the [YAML Indentation Corrector](https://nexus.elitea.ai/alita_ui/1/prompts/all/31?viewMode=public) prompt within ELITEA to automatically fix indentation issues in your YAML code.
*   **Agent not starting:**
    *   **Problem:** The agent doesn't begin execution when you expect it to.
    *   **Solution:** Double-check the `entry_point` defined in your YAML file. Ensure that the value you've provided exactly matches the `id` of the node you intend to be the starting point of your agent's workflow. Even a small typo can prevent the agent from starting correctly.
*   **Unexpected transitions:**
    *   **Problem:** The agent moves to a different node than you intended.
    *   **Solution:** Carefully review the `transition`, `condition`, and `decision` attributes of the node *from which* the unexpected transition occurred.
        *   **`transition`**: Verify that the `id` of the target node is spelled correctly.
        *   **`condition`**: Analyze the `condition_input` and `condition_definition`. Ensure the logic in your Jinja2 template is correct and that the referenced state variables contain the expected data.
        *   **`decision`**: Examine the `decisional_inputs` and the `default_output`. Understand the criteria for each possible transition and ensure your `default_output` is correctly set.
*   **Node Names Issue:**
    *   **Problem:** The agent cannot find or execute a specific node.
    *   **Solution:**
        *   **Verify Node IDs:** Double-check that the `id` values you've assigned to your nodes are spelled correctly and consistently throughout your YAML file. This is crucial for `transition`, `condition`, and `decision` attributes that reference other nodes.
        *   **ELITEA Toolkit Names:** If you are using ELITEA toolkits (prompts, datasources, or agents) as nodes ensure that the node names in your YAML instructions *exactly* matches the names of the toolkit in ELITEA. Names are case-sensitive.
*   **Node Name Issue with **llm** nodes:**
    *   **Problem:** Transitions, conditions, or decisions are not correctly referencing an **llm** node.
    *   **Solution:** Confirm that the `id` you've given to your **llm** node is accurate and that you are using this exact `id` when referencing the `llm` node in `transition`, `condition`, or `decision` attributes of other nodes.
*   **Incorrect data in state:**
    *   **Problem:** The agent is using or displaying incorrect information.
    *   **Solution:** Utilize the `interrupt_before` or `interrupt_after` attributes in your YAML to strategically pause the agent's execution at specific nodes. When the agent pauses, inspect the current `state` (the agent's memory) to see the values of the variables. This allows you to verify if the data is being populated and updated as expected at different stages of the workflow.
*   **Condition Format Issue:**
    *   **Problem:** Conditions are not evaluating as expected, leading to incorrect transitions.
    *   **Solution:** Remember that conditions in Pipeline Agents use the Jinja2 templating language. Carefully review your `condition_definition` to ensure:
        *   Correct Jinja2 syntax is used (e.g., `{% if condition %}`, `{% else %}`, `{% endif %}`).
        *   Variables from the `condition_input` are referenced correctly within the Jinja2 template.
        *   The logical operators and comparisons in your condition are accurate.
*   **Errors in node execution:**
    *   **Problem:** A specific node fails to execute its intended action.
    *   **Solution:**
        *   **Examine Error Messages:** Pay close attention to the specific error messages displayed in the ELITEA Chat window during the agent's execution. These messages often pinpoint the exact cause of the error.
        *   **function node Input/Output Mappings:** For **function** nodes, meticulously review the `input` and `output` attributes, as well as the `input_mapping`. Ensure that:
            *   The `input` list correctly references variables in your agent's `state`.
            *   The `output` list specifies where the function's results should be stored in the `state`.
            *   The `input_mapping` correctly defines how data from the `state` is being passed to the function's parameters (using `variable`, `fstring`, or `fixed`).
        *   **Tool Availability:** If the error involves a **tool** node, verify that the specified **tool** (ELITEA prompt, datasource, or agent) exists and is accessible within your ELITEA environment.
*   **Debugging Complex Pipelines:**
    *   **Problem:** Identifying the root cause of errors in agents with many nodes and complex logic can be difficult.
    *   **Solution:**
        *   **Systematic Analysis:** Break down the execution flow step-by-step.
        *   **Strategic Interruptions:** Use `interrupt_before` and `interrupt_after` at multiple points in the pipeline to inspect the `state` and understand how data is changing.
        *   **Simplify Temporarily:** Consider temporarily commenting out sections of your YAML to isolate the part of the pipeline where the error is occurring.
        *   **Review Error Messages:** Pay close attention to any error messages generated during execution, as they often provide clues about the location and nature of the problem.

By systematically checking these potential issues and utilizing the debugging tools available in ELITEA, you can effectively troubleshoot and refine your Pipeline Agents.

## Useful Links and Materials

To further enhance your understanding and skills in building Pipeline Agents, here are some helpful resources:

* **[ELITEA Agents Configuration](../../platform-documentation/menus/agents.md)**: Learn more about configuring and managing agents within ELITEA.
* **[Public Agents in Nexus](https://nexus.elitea.ai/alita_ui/agents/latest)**: Discover and study real-world examples of Pipeline Agents created by the ELITEA community. This is a great source of inspiration and practical learning.
* **[Alita SDK GitHub Repository](https://github.com/ProjectAlita/alita-sdk/tree/main)**: Explore the codebase behind the Pipeline Agent Framework and its nodes. This is a valuable resource for understanding the inner workings and extending its capabilities. 
* **[YAML Specification](https://yaml.org/spec/)**: Gain a comprehensive understanding of YAML syntax and structure.
* **[Jinja Templating Engine Documentation](https://jinja.palletsprojects.com/en/3.1.x/)** Master the syntax and features of Jinja2, the templating language used for defining conditions in Pipeline Agents.
