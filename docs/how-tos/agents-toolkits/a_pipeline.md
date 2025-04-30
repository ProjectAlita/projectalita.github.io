# Introduction to ELITEA Pipelines

Welcome to ELITEA Pipelines! Pipelines are your gateway to automating, streamlining, and scaling your work—no matter your technical background.

**What are ELITEA Pipelines?**  
ELITEA Pipelines are customizable, visual workflows that let you automate complex processes by connecting a series of steps (called nodes). Each node can perform an action, make a decision, loop through data, or interact with external tools like Jira, GitHub, Confluence, and more. Pipelines help you manage everything from simple tasks to intricate, multi-step operations—all in one place.

**Why use Pipelines?**
- **Save time:** Automate repetitive or multi-step tasks.
- **Reduce errors:** Ensure consistency and accuracy by letting the system handle the details.
- **Integrate tools:** Seamlessly connect with your favorite platforms and data sources.
- **Visualize your process:** Use the Flow Designer to see and manage your workflow at a glance.
- **Empower everyone:** No coding required—just drag, drop, and connect.

**How do Pipelines work?**
You build a pipeline by adding and connecting nodes. Each node represents a step: asking a question, running a tool, making a decision, or looping through items. You can design your workflow visually or use YAML for advanced customization. Once set up, your pipeline runs automatically, following your instructions and adapting to user input or data.

**Key Features:**
- Visual workflow design (Flow Designer)
- Advanced logic and branching (conditions, decisions)
- Integration with external services (toolkits)
- Monitoring and troubleshooting tools
- Support for both simple and advanced use cases

**Who is this guide for?**
This guide is for everyone—from business users to technical experts—who wants to automate and optimize their work in ELITEA. Whether you’re building your first pipeline or looking to master advanced features, you’ll find step-by-step instructions, best practices, and real-world examples here.

---

## 1. What Are Pipelines?

**Pipelines** in ELITEA are visual, step-by-step workflows that automate tasks, connect tools, and manage data across your organization. Think of a pipeline as a digital assistant that follows your instructions to get work done—whether that's creating user stories, processing data, or integrating with tools like Jira, GitHub, or Confluence.

**Key Benefits:**
- Automate repetitive or complex tasks
- Integrate multiple tools and data sources
- Visualize and control your workflow
- Reduce manual errors and save time

---

## 2. Core Concepts & Building Blocks of ELITEA Pipelines

Understanding the building blocks of ELITEA Pipelines is the key to designing powerful, flexible, and user-friendly workflows. This section explains each core concept in detail, with practical examples and best practices.

---

### 1. State: The Pipeline’s Memory

State is the memory of your pipeline. It stores all the information your workflow gathers, uses, and passes between steps. State can include:
- Conversation history (`messages`)
- Latest user input (`input`)
- Custom data (IDs, titles, lists, etc.)

**Types:**
- `str` (text)
- `int` (number)
- `list` (a list of items)
- `dict` (a dictionary/object)

**Best Practice:**
Always include `messages: list` in your custom state to track conversation history. If you don’t define a custom state, ELITEA will use the default (`messages` only).

**Example:**
```yaml
state:
  jira_project_id: str
  epic_id: str
  us_title: str
  description: str
  input: str
  messages: list
```

---

### 2. Entry Point: Where the Pipeline Starts

The entry point is the first node your pipeline will execute. It’s defined by the `entry_point` key and must match the `id` of one of your nodes.

Any node type can be an entry point:
- LLM (for user interaction)
- Function (for setup)
- Tool, Loop, or Loop from Tool

**Example:**
```yaml
entry_point: Conversation Partner
nodes:
  - id: Conversation Partner
    type: llm
    prompt:
      type: string
      value: "Welcome! Please provide the Jira Project ID."
    output: [jira_project_id]
    transition: Next Step
```

---

### 3. Nodes: The Steps of Your Pipeline

Nodes are the actions or steps in your pipeline. Each node does something: asks a question, runs a tool, processes data, or loops through items.

Node Types:
- **llm**: Interact with users using AI (prompts, questions, feedback)
- **tool**: Use pre-built tools, prompts, or datasources
- **function**: Call ELITEA functions with precise input mapping
- **loop**: Repeat an action for a list of items
- **loop_from_tool**: Get a list from another tool, then process each item

Common Node Attributes:
- `id`: Unique name for the node
- `type`: Node type (llm, tool, function, etc.)
- `input`: State variables needed for this step
- `output`: State variables produced by this step
- `transition`: Next node to execute (or `END`)
- `condition`: Logic for conditional transitions (see below)
- `decision`: Logic for branching/choices (see below)
- `structured_output`: Set to `true` if expecting structured (e.g., JSON) output

**Example:**
```yaml
- id: Draft Creator
  type: tool
  tool: User Story Draft Prompt
  transition: Review Step
```

---

### 4. Transitions: Connecting the Steps

Transitions define the flow from one node to the next. Every node (except the last) should have a `transition` or logic that determines the next step.

- `transition: <node_id>`: Go to the specified node
- `transition: END`: Finish the pipeline

**Best Practice:**
Always ensure every path in your pipeline leads to `END` to avoid infinite loops.

**Example:**
```yaml
transition: Next Step
```

---

### 5. Conditions: Adding Logic

Conditions let your pipeline make decisions based on data or user input. They use Jinja2 templating for logic.

Attributes:
- `condition_input`: List of state variables to use in the condition
- `condition_definition`: Jinja2 logic to determine the next node

**Example:**
```yaml
condition:
  condition_input: [input]
  condition_definition: |
    {% if 'approved' in input|lower %}
    Publish Step
    {% else %}
    Review Step
    {% endif %}
```

---

### 6. Decisions: Smart Branching

Decisions allow the pipeline to choose the next step from a list, based on user input or data. The system uses AI to select the best match.

Attributes:
- `nodes`: List of possible next node IDs
- `description`: (Optional) Explain the decision logic
- `decisional_inputs`: State variables to consider
- `default_output`: Fallback node if no match

**Example:**
```yaml
decision:
  nodes: [Publish, Edit, END]
  description: "Choose next step based on user feedback."
  decisional_inputs: [input]
  default_output: Review
```

---

### 7. Interruptions: Pause for User Review

Interruptions let you pause the pipeline before or after specific nodes, so users can review, adjust, or approve data.

- `interrupt_before`: Pause before these nodes
- `interrupt_after`: Pause after these nodes

**Example:**
```yaml
interrupt_before:
  - User Story Publisher
interrupt_after:
  - User Feedback and Approval
```

---

### 8. Dependencies: Toolkits and Integrations

Toolkits connect your pipeline to external services (Jira, GitHub, Confluence, etc.) or internal ELITEA tools. You must add and configure all toolkits referenced in your pipeline.

**Best Practice:**
- Add all required toolkits in the pipeline configuration before running your workflow.
- For each tool or function node, ensure the referenced toolkit/tool name matches exactly.

---

### 9. Visual and YAML Design

- **Flow Designer:** Drag, drop, and connect nodes visually.
- **YAML Editor:** For advanced users, edit the YAML directly for full control.

**Tip:**
Use the Flow Designer for simple workflows and the YAML Editor for advanced logic, custom state, or complex branching.

---

### 10. Example: Putting It All Together

```yaml
state:
  jira_project_id: str
  input: str
  messages: list
entry_point: Start
interrupt_after:
  - Start
nodes:
  - id: Start
    type: llm
    prompt:
      type: string
      value: "Please provide the Jira Project ID."
    output: [jira_project_id]
    transition: END
```

---

## LLM Node: User Interaction with AI

The **LLM node** is the main way your pipeline interacts with users using AI. It can ask questions, gather information, provide feedback, or guide the user through a process. The LLM node is highly configurable and supports both simple and advanced use cases.

---

### What is an LLM Node?

An LLM (Large Language Model) node lets your pipeline “talk” to the user or process text using AI. You define what the AI should say or ask, what information it should extract, and how it should behave in the workflow.

---

### LLM Node Attributes & Configuration

Below is a structured explanation of each attribute, what it does, and how to use it:

#### 1. Prompt
- **What it is:** The main instruction or question the AI will present to the user.
- **How to configure:** Enter your prompt in the text area. You can expand to full screen for easier editing. CodeMirror support means you get syntax highlighting and formatting help.
- **Best practice:** Be clear and specific. Use markdown for formatting (e.g., bold, lists). For dynamic prompts, use variables (see “Use f-string” below).

**Example:**
```
Please provide the Jira Project ID and a short description of your request.
```

#### 2. Use f-string (Toggle)
- **What it is:** Allows you to use variables from the pipeline’s state in your prompt, using Python f-string syntax (e.g., `{variable_name}`).
- **When to use:** When you want the prompt to include dynamic information (e.g., user’s name, previous answers).
- **How to configure:** Toggle ON to enable f-string mode. Reference state variables in curly braces: `Hello {user_name}, please review your last input: {last_input}`
- **Important:** When using f-string, you must list all referenced variables in the “Input” field.

#### 3. Input (Dropdown List)
- **What it is:** The list of state variables the LLM node will use as context or to fill in f-string variables.
- **How to configure:** Select one or more variables from the dropdown. For entry point nodes, you can use `input` (the latest user message). For f-string prompts, include every variable you reference in the prompt.
- **Best practice:** Only include variables you actually use, to keep the context focused and efficient.

#### 4. Output (Dropdown List)
- **What it is:** The list of state variables where the LLM’s response will be saved.
- **How to configure:** Select one or more variables from the dropdown. The AI will try to extract these values from the user’s response.
- **When to use:** When you want to capture structured information (e.g., project ID, description, approval status).
- **Best practice:** Use clear, descriptive variable names.

#### 5. Response Key (Input Field)
- **What it is:** The key in the LLM’s response to use as the main output.
- **How to configure:** By default, this is `messages` (the conversation). You can set it to another key if your LLM returns structured data with a different field name.
- **When to use:** For advanced scenarios where your LLM or tool returns custom structured output.

#### 6. Interrupt Before (Toggle)
- **What it is:** Pauses the pipeline just before this node runs, allowing the user to review or adjust the state.
- **How to configure:** Toggle ON to enable.
- **When to use:** When you want a manual checkpoint before the AI asks the question or processes the prompt.

#### 7. Interrupt After (Toggle)
- **What it is:** Pauses the pipeline immediately after this node runs, so the user can review or edit the output before continuing.
- **How to configure:** Toggle ON to enable.
- **When to use:** For review, approval, or debugging steps.

#### 8. Structured Output (Toggle)
- **What it is:** Tells the LLM to return its answer in a structured format (like JSON), making it easier to extract multiple outputs.
- **How to configure:** Toggle ON if you want the AI to return structured data.
- **When to use:** When you want to extract several fields from the response (e.g., project ID, title, description).
- **Best practice:** Make your prompt clear about the expected format (e.g., “Respond in JSON with keys: project_id, description”).

---

### Example: Simple LLM Node

```yaml
- id: Get Project Info
  type: llm
  prompt:
    type: string
    value: "Please provide the Jira Project ID and a short description."
  output: [jira_project_id, description]
  transition: Next Step
```

### Example: LLM Node with f-string and Structured Output

```yaml
- id: Review Step
  type: llm
  input: [user_name, last_input]
  prompt:
    type: fstring
    value: "Hello {user_name}, please review your last input: {last_input}. Reply with 'approved' or your changes."
  output: [approval_status, changes]
  structured_output: true
  transition: END
```

---

### Quick Reference Table

| Attribute         | What it does                               | When to use / Best practice               |
| ----------------- | ------------------------------------------ | ----------------------------------------- |
| Prompt            | The AI’s question/instruction              | Always; be clear and specific             |
| Use f-string      | Enables variables in prompt                | For dynamic, personalized prompts         |
| Input             | State variables used in prompt/context     | For f-string or context-aware prompts     |
| Output            | Where to save extracted info from response | When you want to capture structured data  |
| Response key      | Field in LLM output to use                 | Advanced: for custom/structured responses |
| Interrupt before  | Pause before node runs                     | For manual review/checkpoint              |
| Interrupt after   | Pause after node runs                      | For review, approval, or debugging        |
| Structured Output | Expect JSON/structured response            | For multi-field extraction                |

---

### Best Practices

- Use f-string for dynamic, context-aware prompts.
- Use structured output when you need to extract multiple fields.
- Use interruptions for review, approval, or debugging.
- Keep prompts clear and user-friendly.
- Always test your node with real data to ensure it behaves as expected.

---

## Tool Node: Integrating ELITEA Entities and Toolkits

The **Tool node** lets your pipeline use pre-built ELITEA entities—**agents, prompts, datasources**—or directly integrated toolkits (like Jira, Confluence, GitHub, etc.). It’s the easiest way to connect your workflow to powerful automations, data sources, and external services—no coding required.

---

### What is a Tool Node?

A Tool node is a step in your pipeline that calls an existing ELITEA entity or toolkit. It can fetch data, trigger actions, or run automations using the tools you’ve already set up in ELITEA.

**ELITEA Entity Types:**
- **Agent:** A reusable automation or workflow you’ve built in ELITEA.
- **Prompt:** A reusable instruction or template for the AI to follow.
- **Datasource:** A data retrieval or processing component within ELITEA (not an external database, but a defined entity for structured data access or transformation).

**Direct Toolkits:**  
These are integrations with external platforms (e.g., Jira, Confluence, GitHub) that you add and configure in your pipeline.

---

### Tool Node Attributes & Configuration

#### 1. Toolkit (Dropdown List)
- **What it is:**  
  Select which ELITEA entity (agent, prompt, datasource) or direct toolkit you want to use.
- **How to configure:**  
  - Choose from the list of available entities and toolkits you’ve added/configured for your pipeline.
  - **If you select an Agent or Prompt:** No further dropdowns are needed; you’re ready to configure the rest of the node.
  - **If you select a Datasource:** An additional **Tool** dropdown appears to select the specific data operation (e.g., “search”, “chat”) available for that datasource entity.
  - **If you select a Direct Toolkit:** An additional **Tool** dropdown appears to select the specific action or API operation (e.g., Jira “search”, Confluence “get page”).

#### 2. Tool (Dropdown List, conditional)
- **What it is:**  
  Appears only if you select a Datasource or Direct Toolkit.
- **How to configure:**  
  - Choose from the available tools for the selected entity or toolkit (e.g., “search”, “chat”, or specific API actions).
  - Only tools that have been configured in the toolkit setup will be shown.

#### 3. Task (Text Area)
- **What it is:**  
  An optional instruction or context for the tool, agent, prompt, or datasource you’re calling.
- **How to configure:**  
  - Enter a clear instruction or context for the tool.
  - Supports full screen editing and CodeMirror for syntax highlighting.
- **When to use:**  
  - Recommended for prompts, agents, or datasources that require a specific instruction or context.

#### 4. Input (Dropdown List)
- **What it is:**  
  The list of state variables to pass as input to the tool, agent, prompt, or datasource.
- **How to configure:**  
  - Select one or more variables from your pipeline’s state.
  - Only include variables that are needed for this tool/entity.

#### 5. Output (Dropdown List)
- **What it is:**  
  The list of state variables where the tool’s response will be saved.
- **How to configure:**  
  - Select one or more variables to store the output.

#### 6. Interrupt Before (Toggle)
- **What it is:**  
  Pauses the pipeline just before this node runs, allowing the user to review or adjust the state.

#### 7. Interrupt After (Toggle)
- **What it is:**  
  Pauses the pipeline immediately after this node runs, so the user can review or edit the output before continuing.

#### 8. Structured Output (Toggle)
- **What it is:**  
  Tells the tool/entity to return its answer in a structured format (like JSON), making it easier to extract multiple outputs.

---

### Example: Tool Node Using a Prompt

```yaml
- id: Draft Creator
  type: tool
  tool: User Story Draft Prompt
  task: "Draft a user story based on the provided requirements."
  input: [requirements]
  output: [draft_user_story]
  transition: Review Step
```

### Example: Tool Node Using a Datasource

```yaml
- id: Search Internal Data
  type: tool
  toolkit: MyDatasource
  tool: search
  task: "Find all records matching the user's query."
  input: [user_query]
  output: [search_results]
  structured_output: true
  transition: END
```

### Example: Tool Node Using a Direct Toolkit (e.g., Jira)

```yaml
- id: Search Jira Issues
  type: tool
  toolkit: Jira
  tool: search
  task: "Find all open issues assigned to the current user."
  input: [user_id]
  output: [jira_issues]
  structured_output: true
  transition: END
```

---

### Best Practices

- Always configure and test your ELITEA entities and toolkits before using them in a pipeline.
- Use the Task field to clarify what you want the tool/entity to do.
- Use structured output for complex or multi-field responses.
- Use interruptions for review or debugging.
- Keep input and output variables clear and focused.

---

## Function Node: Advanced Integration and Customization

The **Function node** is the most flexible and powerful node type in ELITEA Pipelines. It allows you to call ELITEA entities (agents, prompts, datasources) or direct toolkits (like Jira, Confluence, GitHub, etc.) with precise control over how inputs are mapped and outputs are handled. Use Function nodes when you need advanced data flow, efficiency, or custom logic.

---

### What is a Function Node?

A Function node is a step in your pipeline that calls a function-like entity—an agent, prompt, datasource, or toolkit action—using explicit input mapping. This means you decide exactly what data is sent, how it’s formatted, and where the results go.

---

### Function Node Attributes & Configuration

#### 1. Toolkit (Dropdown List)
- **What it is:**  
  Select which ELITEA entity (agent, prompt, datasource) or direct toolkit you want to use.
- **How to configure:**  
  - Choose from the list of available entities and toolkits you’ve added/configured for your pipeline.
  - **If you select an Agent or Prompt:** No further dropdowns are needed.
  - **If you select a Datasource or Direct Toolkit:** An additional **Tool** dropdown appears to select the specific operation (e.g., “search”, “chat”, or API action).

#### 2. Tool (Dropdown List, conditional)
- **What it is:**  
  Appears only if you select a Datasource or Direct Toolkit.
- **How to configure:**  
  - Choose from the available tools for the selected entity or toolkit.
  - Only tools configured in the toolkit setup will be shown.

#### 3. Input (Dropdown List)
- **What it is:**  
  The list of state variables to use as input for the function.
- **How to configure:**  
  - Select one or more variables from your pipeline’s state.
  - Only include variables needed for this function/entity.

#### 4. Output (Dropdown List)
- **What it is:**  
  The list of state variables where the function’s response will be saved.
- **How to configure:**  
  - Select one or more variables to store the output.

#### 5. Input Mapping (Dynamic Section)
- **What it is:**  
  The heart of the Function node—lets you map your pipeline’s state variables to the function’s parameters, with full control over formatting and value source.
- **How to configure:**  
  - The available mapping fields depend on the selected toolkit/entity/tool.
  - For each parameter, you set:
    - **Type:**  
      - **F-String:** Use variables and expressions (text area with CodeMirror support).  
        Example: `Enhance the user story: {draft_us}`
      - **Fixed:** Use a constant value (text area).
      - **Variable:** Select a variable from your state (dropdown).
    - **Value:**  
      - Enter the value or select the variable, depending on the type.
  - **Special fields:**  
    - **Task:** (for agents) The main instruction or task for the agent.
    - **Chat History:** Controls what conversation history is sent:
      - **Fixed:** `[]` (no history)
      - **Variable:** `messages` (all pipeline history)
    - **Input:** (for prompts) The main input for the prompt.
    - **Query:** (for datasources) The query to run.
    - **Other parameters:** If your selected agent, prompt, or tool has custom variables, they will appear for mapping as well.

**Best Practice:**  
- Use F-String for dynamic, context-aware instructions.
- Use Variable for passing state directly.
- Use Fixed for constants or to clear/reset values.

#### 6. Interrupt Before (Toggle)
- **What it is:**  
  Pauses the pipeline just before this node runs, allowing the user to review or adjust the state.

#### 7. Interrupt After (Toggle)
- **What it is:**  
  Pauses the pipeline immediately after this node runs, so the user can review or edit the output before continuing.

#### 8. Structured Output (Toggle)
- **What it is:**  
  Tells the function/entity to return its answer in a structured format (like JSON), making it easier to extract multiple outputs.

---

### How Input Mapping Works (By Entity Type)

| Entity Type    | Main Mapping Fields        | Typical Use/Example                                         |
| -------------- | -------------------------- | ----------------------------------------------------------- |
| Agent          | Task, Chat History, custom | Task: F-String/Variable/Fixed; Chat History: [] or messages |
| Prompt         | Input, custom              | Input: F-String/Variable/Fixed                              |
| Datasource     | Query, custom              | Query: F-String/Variable/Fixed                              |
| Direct Toolkit | Varies by tool             | Each tool exposes its own parameters for mapping            |

**Chat History Example:**
- Ignore history:  
  ```yaml
  chat_history:
    type: fixed
    value: []
  ```
- Pass all pipeline history:  
  ```yaml
  chat_history:
    type: variable
    value: messages
  ```

---

### Example: Function Node Calling an Agent

```yaml
- id: Enhance User Story
  type: function
  toolkit: MyAgent
  input: [draft_us]
  output: [enhanced_us]
  input_mapping:
    task:
      type: fstring
      value: "Enhance the following user story: {draft_us}"
    chat_history:
      type: fixed
      value: []
  transition: END
```

### Example: Function Node Calling a Prompt

```yaml
- id: Summarize Info
  type: function
  toolkit: MyPrompt
  input: [info]
  output: [summary]
  input_mapping:
    input:
      type: variable
      value: info
  transition: END
```

### Example: Function Node Calling a Datasource

```yaml
- id: Search Data
  type: function
  toolkit: MyDatasource
  tool: search
  input: [user_query]
  output: [results]
  input_mapping:
    query:
      type: fstring
      value: "SELECT * FROM records WHERE name LIKE '%{user_query}%'"
  structured_output: true
  transition: END
```

### Example: Function Node Calling a Direct Toolkit (e.g., Jira)

```yaml
- id: Create Jira Issue
  type: function
  toolkit: Jira
  tool: create_issue
  input: [project_id, summary, description]
  output: [issue_key]
  input_mapping:
    project:
      type: variable
      value: project_id
    summary:
      type: variable
      value: summary
    description:
      type: variable
      value: description
  transition: END
```

---

### Quick Reference Table

| Attribute         | What it does                                      | When to use / Best practice                   |
| ----------------- | ------------------------------------------------- | --------------------------------------------- |
| Toolkit           | Selects the agent, prompt, datasource, or toolkit | Always; must be configured in pipeline        |
| Tool              | Selects specific tool for datasource/toolkit      | Only for datasources or direct toolkits       |
| Input             | State variables passed to the function            | Only those needed by the function/entity      |
| Output            | Where to save extracted info from response        | For capturing structured data                 |
| Input Mapping     | Maps state to function parameters                 | Use F-String for dynamic, Variable for direct |
| Interrupt before  | Pause before node runs                            | For manual review/checkpoint                  |
| Interrupt after   | Pause after node runs                             | For review, approval, or debugging            |
| Structured Output | Expect JSON/structured response                   | For multi-field extraction                    |

---

### Best Practices

- Use Function nodes for advanced, efficient, and precise integrations.
- Always review available mapping fields for your selected entity/tool.
- Use F-String mapping for dynamic, context-aware instructions.
- Use Variable mapping for direct state passing.
- Use Fixed mapping for constants or to clear/reset values.
- Use interruptions for review or debugging.
- Test your node with real data to ensure mappings work as expected.

---

## 3. Setting Up a Pipeline

### A. Creating a Pipeline
1. Go to the **Pipelines** menu and click **+ Pipeline**.
2. Fill in the **Name** and **Description**.
3. (Optional) Add tags and a custom image for easy identification.
4. Add **Toolkits** to connect your pipeline to external services (like Jira, GitHub, etc.).
5. (Optional) Set a **Welcome Message** and **Conversation Starters** to guide users.
6. Click **Save**.

### B. Designing Your Workflow
- Use the **Flow Designer** (visual tab) to drag, drop, and connect nodes.
- Or use the **YAML Editor** (code tab) for advanced customization.

---

## 4. Node Types Explained

Nodes are the steps your pipeline takes. Here are the main types:

### **LLM Node**
- Interacts with users using AI (asks questions, gathers info, provides feedback)
- Example:
  ```yaml
  - id: Conversation Partner
    type: llm
    prompt:
      type: string
      value: "Please provide the Jira Project ID."
    output: [jira_project_id]
    transition: Next Step
  ```

### **Tool Node**
- Uses pre-built tools, prompts, or datasources
- Example:
  ```yaml
  - id: Draft Creator
    type: tool
    tool: User Story Draft Prompt
    transition: Review Step
  ```

### **Function Node**
- Calls ELITEA functions with precise input mapping (more efficient for advanced users)
- Example:
  ```yaml
  - id: Data Fetcher
    type: function
    input: [input]
    output: [data]
    input_mapping:
      task:
        type: variable
        value: input
    transition: END
  ```

### **Loop Node**
- Repeats an action for a list of items
- Example:
  ```yaml
  - id: Documentor
    type: loop
    task: "Formulate ALL file paths from chat_history as a list of inputs."
    tool: Code Documentation
    transition: END
  ```

### **Loop from Tool Node**
- Gets a list from another tool, then processes each item
- Example:
  ```yaml
  - id: listpages
    type: loop_from_tool
    tool: list_pages_with_label
    loop_tool: Confluence helper
    variables_mapping:
      id: task
      messages: chat_history
    transition: END
  ```

---

## 5. Transitions, Conditions, and Decisions

- **Transitions:** Move from one node to the next (e.g., `transition: Next Step` or `transition: END`)
- **Conditions:** Use logic to choose the next node (e.g., if user says 'approved', go to publish step)
- **Decisions:** Let the pipeline choose from several possible next steps based on user input or data

**Example Condition:**
```yaml
condition:
  condition_input: [input]
  condition_definition: |
    {% if 'approved' in input|lower %}
    Publish Step
    {% else %}
    Review Step
    {% endif %}
```

**Example Decision:**
```yaml
decision:
  nodes: [Publish, Edit, END]
  description: "Choose next step based on user feedback."
  decisional_inputs: [input]
  default_output: Review
```

---

## 6. Best Practices

- **Plan your workflow:** Sketch your steps before building
- **Use clear names:** Name nodes and variables descriptively
- **Test as you go:** Use interruptions to pause and check data
- **Start simple:** Use tool nodes for quick setup; use function nodes for efficiency as you get comfortable
- **Always end with `transition: END`** to finish the workflow cleanly

---

## 7. Practical Examples

### Example 1: User Story Creation Workflow
```yaml
state:
  jira_project_id: str
  epic_id: str
  us_title: str
  description: str
  input: str
  messages: list
entry_point: Conversation Partner
nodes:
  - id: Conversation Partner
    type: llm
    prompt:
      type: string
      value: "Please provide the Jira Project ID, Epic ID, Title, and Description."
    output: [description, jira_project_id, epic_id, us_title]
    structured_output: true
    transition: Draft Creator
  - id: Draft Creator
    type: tool
    tool: User Story Draft Prompt
    transition: END
```

### Example 2: Bulk User Story Creation and Publishing
```yaml
entry_point: User Input
nodes:
  - id: User Input
    type: llm
    prompt:
      type: string
    transition: Bulk Creator
  - id: Bulk Creator
    type: tool
    tool: Bulk US Creator
    transition: Publisher
  - id: Publisher
    type: tool
    tool: Jira Bulk US Publisher
    transition: END
```

---

## 8. Troubleshooting

- **YAML errors:** Check indentation and key names; use the YAML Indentation Corrector in ELITEA
- **Node not found:** Make sure node IDs match exactly everywhere
- **Pipeline won’t start:** Check that `entry_point` matches a node ID
- **Unexpected results:** Use interruptions to pause and inspect the state
- **Toolkit issues:** Ensure all required toolkits are added and configured

---

## 9. Further Resources

- [Nodes in ELITEA Pipelines Guide](./pipeline-agent-framework.md)
- [ELITEA Pipelines Menu Guide](../../platform-documentation/menus/pipelines.md)
- [Public Agent Examples](https://nexus.elitea.ai/alita_ui/agents/latest)
- [YAML Specification](https://yaml.org/spec/)
- [Jinja2 Templating](https://jinja.palletsprojects.com/en/3.1.x/)

---

With ELITEA Pipelines, you can automate, integrate, and optimize your workflows—no coding required. Start simple, experiment, and build powerful automations tailored to your needs!