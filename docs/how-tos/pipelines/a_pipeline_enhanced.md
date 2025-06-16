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
This guide is for everyone—from business users to technical experts—who wants to automate and optimize their work in ELITEA. Whether you're building your first pipeline or looking to master advanced features, you'll find step-by-step instructions, best practices, and real-world examples here.

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

Key concepts covered:

1. [State](#1-state-the-pipelines-memory): The memory system for your pipeline
2. [Entry Point](#2-entry-point-where-the-pipeline-starts): Where execution begins
3. [Nodes](#3-nodes-the-steps-of-your-pipeline): The individual steps and actions
4. [Transitions](#4-transitions-connecting-the-steps): How steps connect to each other
5. [Conditions](#5-conditions-adding-logic): Adding logical branching with rules
6. [Decisions](#6-decisions-smart-branching): AI-powered selection of next steps
7. [Interruptions](#7-interruptions-pause-for-human-review-and-input): Strategic pause points for human review
8. [Dependencies](#8-dependencies-toolkits-and-integrations): Connecting to external tools and services

---

### 1. State: The Pipeline's Memory

State is the memory of your pipeline. It serves as the central repository for all information your workflow gathers, processes, and passes between steps. Think of it as a dynamic database that evolves as your pipeline executes.

#### Understanding State Components

Your pipeline's state can include:

- **Conversation history (`messages`)**: A record of all exchanges between the user and pipeline
- **Latest user input (`input`)**: The most recent message from the user
- **Custom data**: Any information specific to your workflow (IDs, titles, descriptions, etc.)

#### Key State Variables

Two state variables are particularly important to understand:

- **`input` (Latest User Message)**:
  - Acts as the pipeline's short-term memory
  - Always contains *only* the most recent message from the user
  - Gets automatically updated each time the user enters a new message
  - Useful when you need to process just the latest user response

- **`messages` (Entire Conversation History)**:
  - Functions as the pipeline's long-term memory
  - Stores the complete history of all messages exchanged
  - Maintains both user messages and pipeline responses
  - Essential for context-aware interactions

#### Supported Data Types

You can use these data types in your custom state:

- **String** (`str` in YAML): Text values (names, descriptions, IDs as text)
- **Number** (`number` in YAML): Numeric values (counts, IDs as numbers)
- **List** (`list` in YAML): Collections of items (options, results, steps)
- **Json** (`dict` in YAML): Key-value structures (complex data, nested information)

> **Note:** When designing in the Flow Designer UI, you'll see these types as String, Number, List, and Json. However, when writing YAML code directly, you must use `str`, `number`, `list`, and `dict` respectively.

#### Best Practices

- **Always include `messages: list`** in your custom state definition to maintain conversation history
- If you don't define a custom state, ELITEA automatically uses the default state (`messages` only)
- Use descriptive variable names that clearly indicate the purpose of each state item
- Only create state variables you actually need for your workflow

#### Example

```yaml
state:
  jira_project_id: str    # Stores the Jira project identifier
  epic_id: str            # Tracks which epic this work belongs to
  us_title: str           # Holds the user story title
  description: str        # Contains the detailed description
  story_points: number    # Numeric estimate of work effort
  team_members: list      # List of assigned team members
  metadata: dict          # JSON data like {"priority": "high", "status": "in progress"}
  input: str              # Latest user message (automatically updated)
  messages: list          # Full conversation history (required)
```

#### When to Define Custom State

- **Define custom state when**: Your pipeline needs to track specific information beyond the conversation
- **Skip state definition when**: You only need the default conversation history tracking

---

### 2. Entry Point: Where the Pipeline Starts

The entry point is the first node your pipeline will execute. It's defined by the `entry_point` key and must match the `id` of one of your nodes.

> **Note:** Any node type can be used as an entry point:
>
> - **LLM nodes**: Best for conversational workflows where you want to begin with a user interaction
> - **Function nodes**: Ideal for setup operations or when you need to initialize data before user interaction
> - **Tool nodes**: Good for workflows that start with a specific tool operation
> - **Loop/Loop from Tool nodes**: Useful when your pipeline begins by processing a collection of items

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

Nodes are the individual actions or steps your pipeline can take. Each node performs a specific task in your workflow. Think of them as verbs – what your pipeline *does*.

#### Node Types

The following node types are available in ELITEA Pipelines:

- **[Function](#function-node-advanced-integration-and-customization)**: Provides a mechanism for the pipeline to directly call and execute specific ELITEA functionalities with precise control over input mapping.
  - Offers a more advanced and potentially efficient way to interact with ELITEA's internal capabilities.

- **[LLM](#llm-node-user-interaction-with-ai)**: Enables the pipeline to interact with users using natural language, powered by AI models.
  - Used for asking questions, providing information, and engaging in conversational exchanges.

- **[Loop](#loop-node-repeated-actions)**: Enables the pipeline to repeatedly execute a specific task or action, often iterating over a list of items or until a condition is met.
  - Useful for processing collections of data or performing repetitive operations.

- **[Loop from Tool](#loop-from-tool-node-dynamic-iteration)**: Allows the pipeline to iterate through a list of inputs generated by another ELITEA agent, executing a specified tool or function for each item.
  - Facilitates workflows where the input for a repetitive task is dynamically generated by another entity.

- **[Tool](#tool-node-integrating-elitea-entities-and-toolkits)**: Allows the pipeline to utilize pre-built entities (prompts, agents and datasources) in ELITEA.
  - Facilitates actions like retrieving data, triggering other agents, or using specific prompts and datasources.

#### Transition Controls

In addition to the core node types, ELITEA Pipelines use two special transition control mechanisms:

- **[Condition](#conditions-adding-logic)**: A flow control feature that lets the pipeline make decisions based on data or user input using Jinja2 templating logic.
  - Used for creating branching paths with specific criteria for each path.

- **[Decision](#decisions-smart-branching)**: An AI-powered selection mechanism that evaluates the best next step from multiple options based on the current context.
  - Ideal for complex routing where the logic depends on natural language understanding.

#### Common Node Attributes

All nodes, regardless of type, have the following common attributes:

- **`id`**: A unique identifier for this specific node. Used to reference this node in transitions, conditions, or decisions.
- **`type`**: Specifies the kind of action this node will perform (e.g., `llm`, `tool`, `function`, `loop`, `loop_from_tool`).
- **`input` (optional)**: A list of state variables the node needs to perform its task.
- **`output` (optional)**: A list of state variables the node produces, which are then stored back in the pipeline's state.
- **`transition`**: Specifies the `id` of the next node to execute (or `END` to complete the workflow).
- **`condition` (optional)**: Allows conditional transitions based on rules defined with Jinja2 templating.
- **`decision` (optional)**: Allows AI-powered selection of the next node from a predefined list.
- **`structured_output` (optional)**: Set to `true` when expecting structured data (e.g., JSON) as output.
- **`interrupt_before` (optional)**: Defined at the pipeline level, pauses execution and allows user review before this node runs.
- **`interrupt_after` (optional)**: Defined at the pipeline level, pauses execution and allows user review after this node completes.

#### Flow Designer vs. YAML: Node Terminology Reference

The table below maps how nodes and their attributes appear in the visual Flow Designer versus how they're written in YAML code:

| Flow Designer UI      | YAML Code                     | Description                                            |
| --------------------- | ----------------------------- | ------------------------------------------------------ |
| **LLM**               | `type: llm`                   | Node for AI-powered user interaction                   |
| **Tool**              | `type: tool`                  | Node for using pre-built ELITEA entities               |
| **Function**          | `type: function`              | Node for direct, efficient toolkit calls               |
| **Loop**              | `type: loop`                  | Node for repeated operations on items                  |
| **Loop from Tool**    | `type: loop_from_tool`        | Node for iterating through dynamically generated lists |
| **Condition**         | `condition:`                  | Flow control mechanism for logical branching           |
| **Decision**          | `decision:`                   | AI-powered mechanism for next node selection           |
| **Input Variables**   | `input: [var1, var2]`         | State variables used by the node                       |
| **Output Variables**  | `output: [result1, result2]`  | State variables produced by the node                   |
| **Next Step**         | `transition: Next Node ID`    | Defines the next node to execute                       |
| **End Pipeline**      | `transition: END`             | Terminates the pipeline execution                      |
| **Structured Output** | `structured_output: true`     | Indicates JSON/structured data output                  |
| **Interrupt Before**  | `interrupt_before: [Node ID]` | Pauses before node execution for review                |
| **Interrupt After**   | `interrupt_after: [Node ID]`  | Pauses after node execution for review                 |

> **Note:** In the Flow Designer UI, you interact with visual components and form fields, while in YAML you work with text-based key-value pairs. The table above helps translate between these two interfaces.

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

### 7. Interruptions: Pause for Human Review and Input

Interruptions provide strategic pause points in your pipeline workflow, enabling human intervention, review, and input at critical stages. They're essential for implementing approval processes, quality checks, and ensuring humans remain "in the loop" for important decisions.

#### Types of Interruptions

ELITEA Pipelines support two distinct types of interruptions:

- **`interrupt_before`**: Pauses execution *before* a node runs, giving users a chance to review inputs or preparation steps
- **`interrupt_after`**: Pauses execution *after* a node completes, allowing users to validate outputs or results

#### When to Use Interruptions

Interruptions are particularly valuable in these scenarios:

1. **Approval workflows**: For getting sign-off before publishing or making permanent changes
2. **Quality control**: To verify data accuracy or completeness before proceeding
3. **Decision points**: When human judgment adds significant value to automated processes
4. **Sensitive operations**: For actions involving financial data, critical systems, or high-risk changes
5. **Debugging**: To inspect what's happening at specific points during development

#### Configuration Options

Interruptions are defined at the pipeline level, not within individual nodes:

```yaml
interrupt_before:
  - Node ID 1
  - Node ID 2
interrupt_after:
  - Node ID 3
  - Node ID 4
```

You can configure interruptions in multiple ways:

- **Node-specific**: Interrupt before or after specific nodes (shown above)
- **Combined approach**: Use both `interrupt_before` and `interrupt_after` in the same pipeline
- **Multiple nodes**: Configure interruptions for any number of nodes

#### User Experience During Interruptions

When a pipeline reaches an interruption point:

1. **Execution pauses**: The system shows the current state and context
2. **Notification**: Users are informed that the pipeline is waiting for their input
3. **Review interface**: Users can see relevant data and state variables
4. **Action options**: Users can:
   - **Resume**: Continue pipeline execution without changes
   - **Modify**: Edit state variables before proceeding
   - **Terminate**: Stop the pipeline execution if needed

#### Best Practices for Interruptions

- **Be selective**: Use interruptions strategically at key decision points, not for every step
- **Provide context**: Ensure your pipeline provides clear information at interruption points
- **Consider user roles**: Identify who needs to review at each interruption point
- **Balance automation**: Too many interruptions defeat the purpose of automation
- **Document expectations**: Make it clear what reviewers should check for

#### Example: Interruptions for Approval Workflow

```yaml
# Pipeline configuration
state:
  jira_ticket: dict
  approval_status: str
  input: str
  messages: list
  
entry_point: Create Ticket
interrupt_before:
  - Submit Ticket  # Pause for review before submitting
interrupt_after:
  - Get Approval   # Pause after collecting approval information

nodes:
  - id: Create Ticket
    type: llm
    prompt:
      type: string
      value: "Let's create a new ticket. What's the issue?"
    output: [jira_ticket]
    transition: Get Approval
    
  - id: Get Approval
    type: llm
    prompt:
      type: string
      value: "Who approved this ticket?"
    output: [approval_status]
    transition: Submit Ticket
    
  - id: Submit Ticket
    type: tool
    tool: jira_create_ticket
    input: [jira_ticket, approval_status]
    transition: END
```

In this example:

- Users can review and modify the ticket details before submission
- There's a pause after collecting approval information to verify it's correct

#### Impact on Pipeline Design

When incorporating interruptions into your pipeline design:

- **Flow visualization**: In the Flow Designer, nodes with interruptions are visually distinguished
- **Execution planning**: Consider the timing and frequency of interruptions in your workflow
- **User communication**: Design your prompts to clearly explain what users should check at each interruption
- **Fallback handling**: Plan for cases where users might reject or terminate the pipeline

#### Advanced Example: Multi-stage Document Review Pipeline

Here's a comprehensive example of using interruptions in a document review and publication workflow:

```yaml
# Pipeline for document review and publication with strategic interruption points
state:
  document: dict        # The document content and metadata
  review_comments: list # Feedback from reviewers
  approval_status: str  # Current approval status
  final_version: dict   # The polished, ready-to-publish version
  input: str            # Latest user message
  messages: list        # Full conversation history
  
entry_point: Draft Document
interrupt_before:
  - Request Reviews     # Pause before sending for review
  - Publish Document    # Final approval before publication
interrupt_after:
  - Collect Feedback    # Review the feedback before making changes
  - Implement Changes   # Check changes before finalization

nodes:
  - id: Draft Document
    type: llm
    prompt:
      type: string
      value: "Let's create a draft document. What's the topic and main points to include?"
    output: [document]
    transition: Request Reviews
    
  - id: Request Reviews
    type: tool
    tool: send_for_review
    input: [document]
    transition: Collect Feedback
    
  - id: Collect Feedback
    type: tool
    tool: gather_review_comments
    input: [document]
    output: [review_comments]
    transition: Assess Feedback
    
  - id: Assess Feedback
    type: llm
    prompt:
      type: string
      value: "Based on the feedback received, would you like to proceed with changes or request additional reviews?"
    output: [approval_status]
    transition: Feedback Decision
    
  - id: Feedback Decision
    condition:
      condition_input: [approval_status]
      condition_definition: |
        {% if 'proceed' in approval_status|lower %}
        Implement Changes
        {% else %}
        Request Reviews
        {% endif %}
    
  - id: Implement Changes
    type: llm
    prompt:
      type: string
      value: "Let's implement the feedback. Here are the review comments: {{ review_comments|tojson }}. How should we revise the document?"
    input: [review_comments, document]
    output: [final_version]
    transition: Publish Document
    
  - id: Publish Document
    type: tool
    tool: publish_document
    input: [final_version]
    output: [document]
    transition: END
```

This example demonstrates strategic use of interruptions:

- **Before sending for review**: Allows users to check document quality
- **After collecting feedback**: Gives opportunity to assess reviewer comments
- **After implementing changes**: Ensures revisions meet expectations
- **Before publication**: Final approval checkpoint

These interruptions create a controlled workflow with human oversight at critical decision points while still automating the process itself.

#### Interruptions and Agent Design Philosophy

Interruptions represent an important design philosophy within ELITEA Pipelines: **Human-in-the-Loop AI**. This approach recognizes that while automation brings efficiency, human judgment, creativity, and oversight remain essential.

**Key benefits of the human-in-the-loop approach:**

1. **Balanced automation**: Automate routine tasks while preserving human judgment for critical decisions
2. **Progressive trust**: Start with more interruptions and reduce them as confidence in the pipeline grows
3. **Adaptability**: Tune the level of human involvement based on task criticality and context
4. **Learning opportunity**: Review interruption points can help refine prompts and pipeline logic over time

When designing pipelines with interruptions, consider:

- **Are there ethical, financial, or security implications** where human review is essential?
- **What state variables** should be visible to reviewers at each interruption point?
- **How often** should interruptions occur to balance efficiency with control?
- **Who** will be responsible for reviewing and approving at each interruption?

Ultimately, well-placed interruptions help maintain the perfect balance between automation and human oversight, leveraging the strengths of both approaches.

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

## Loop Node: Repeated Actions

The **Loop Node** enables your pipeline to perform the same action multiple times, either on a list of items or until a certain condition is met. This is particularly valuable for batch processing, data transformation, or any workflow that requires iteration.

---

### What is a Loop Node?

A Loop Node is a special type of node that executes the same operation repeatedly across multiple inputs. Think of it as a "for each" statement in programming - it takes a list of items and processes each one using the same approach.

---

### Loop Node Attributes & Configuration

#### 1. Task (Text Area)

- **What it is:** The instruction that will generate a list of items to iterate over.
- **How to configure:** Enter a clear instruction that will result in the AI generating a structured list.
- **Best practice:** Be specific about the format you expect the list to be in.

#### 2. Tool (Dropdown List)

- **What it is:** The tool, agent, or prompt that will be executed for each item in the list.
- **How to configure:** Select from available tools in your workspace.
- **Best practice:** Choose a tool designed to work with individual items rather than batches.

#### 3. Input (Dropdown List)

- **What it is:** State variables that will be used to generate the list of items.
- **How to configure:** Select variables that contain the source data for iteration.
- **Best practice:** Include any context needed for the AI to understand how to split or generate the list.

#### 4. Output (Dropdown List)

- **What it is:** Where the results of all iterations will be stored.
- **How to configure:** Typically a list or dictionary-type variable.
- **Best practice:** Create a dedicated variable for loop results rather than overwriting existing data.

#### 5. Interrupt Before/After (Toggle)

- **What it is:** Pauses the pipeline before or after the loop executes.
- **When to use:** For debugging complex loops or when you need to review the items or results.
- **See also:** [Interruptions: Pause for Human Review and Input](#7-interruptions-pause-for-human-review-and-input)

#### 6. Structured Output (Toggle)

- **What it is:** Whether to expect and process results as structured data.
- **When to use:** Almost always enable this for loops to ensure proper data handling.

---

### Example: Loop Node for Processing Multiple Items

```yaml
- id: Process Documents
  type: loop
  task: "Extract all document IDs from the input list and process each one."
  tool: Document Processor
  input: [document_list]
  output: [processed_results]
  structured_output: true
  transition: Summarize Results
```

---

### Best Practices for Loop Nodes

- **Be clear about list format:** In the task, specify exactly how the list should be structured
- **Test with small lists first:** Start with 2-3 items to ensure your loop works correctly
- **Include error handling:** Consider how to handle failures in individual iterations
- **Watch for performance:** Large lists may take significant processing time
- **Use structured output:** Always enable structured output for consistent data handling

---

## Loop from Tool Node: Dynamic Iteration

The **Loop from Tool Node** is a specialized node that combines tool execution with iteration. It first calls a tool to generate a list of items, then processes each item using another specified tool. This is ideal when your list of inputs comes from an external source or requires complex generation logic.

---

### What is a Loop from Tool Node?

A Loop from Tool Node first executes a tool that returns a list of items, then applies a second tool to each item in that list. It's like a two-step process: (1) get the list, (2) process each item in the list. This is perfect for scenarios where you don't know the exact items to process until runtime.

---

### Loop from Tool Node Attributes & Configuration

#### 1. Tool (Dropdown List)

- **What it is:** The tool that will generate the list of items to iterate over.
- **How to configure:** Select a tool that returns a structured list or collection.
- **Best practice:** Use tools specifically designed to return lists (e.g., search results, database queries).

#### 2. Loop Tool (Dropdown List)

- **What it is:** The tool that will be executed for each item in the generated list.
- **How to configure:** Select a tool that's designed to process individual items.
- **Best practice:** Ensure this tool handles single items well and returns consistent output format.

#### 3. Variables Mapping (Key-Value Pairs)

- **What it is:** Maps pipeline state variables to parameters for the tools.
- **How to configure:** Define which variable goes to which parameter for both tools.
- **Best practice:** Use clear mapping that ensures all required parameters are properly filled.

#### 4. Input (Dropdown List)

- **What it is:** State variables to pass to the list-generating tool.
- **How to configure:** Select variables that provide context for list generation.
- **Best practice:** Include only what's needed for proper list generation.

#### 5. Output (Dropdown List)

- **What it is:** Where to store the consolidated results of all iterations.
- **How to configure:** Select or create an appropriate state variable.
- **Best practice:** Use a list-type variable for collecting all results.

#### 6. Interrupt Before/After (Toggle)

- **What it is:** Whether to pause the pipeline before or after execution.
- **When to use:** For reviewing the generated list or final results.
- **See also:** [Interruptions: Pause for Human Review and Input](#7-interruptions-pause-for-human-review-and-input)

---

### Example: Loop from Tool Node

```yaml
- id: Process Wiki Pages
  type: loop_from_tool
  tool: list_pages_with_label
  loop_tool: Confluence helper
  variables_mapping:
    id: task
    messages: chat_history
  input: [label_name]
  output: [processed_pages]
  transition: Generate Summary
```

In this example, the node first calls `list_pages_with_label` to get a list of Confluence pages with a specified label, then processes each page using the `Confluence helper` tool.

---

### Best Practices for Loop from Tool Nodes

- **Ensure the list-generating tool returns well-structured data**
- **Design the processing tool to handle individual items gracefully**
- **Use clear variable mapping to avoid parameter confusion**
- **Consider performance implications for potentially large lists**
- **Test the entire workflow with different list sizes**
- **Add appropriate error handling for both the list generation and item processing steps**
