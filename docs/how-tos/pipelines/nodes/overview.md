# Pipeline Nodes Overview

Nodes are the **fundamental building blocks** of ELITEA Pipelines—individual steps that perform specific actions within your workflow. Think of nodes as specialized workers, each with a unique job, that combine together to create intelligent, automated processes.

## What are Nodes?

A node represents a single, discrete action in your pipeline. Each node:

* **Performs one specific task** (call an AI model, execute code, make a decision, etc.)
* **Receives input** from pipeline state
* **Produces output** that updates the state
* **Connects to other nodes** to form a complete workflow

Nodes are configured with parameters that define their behavior, and they execute sequentially or conditionally based on the connections you define.

![Node Concept Diagram](../../../img/how-tos/pipelines/nodes/node-concept-diagram.png)

### Node Execution Flow

When a pipeline runs:

1. **Entry Point**: Execution begins at the designated starting node
2. **Node Execution**: The active node reads from state, performs its action, and writes results back to state
3. **Transition**: Based on the node's configuration, execution moves to the next node
4. **Iteration**: The process continues until reaching an END transition or completing all nodes

!!! tip "State is Shared"
    All nodes in a pipeline share access to the same state. This means data written by one node is immediately available to all subsequent nodes.

## Common Node Attributes

While each node type has unique capabilities, all nodes share several common configuration attributes:

### Core Attributes

**`id`** (required)
: Unique identifier for the node within the pipeline. Must be unique across all nodes.

```yaml
id: "process_request"
```

**`type`** (required)
: Specifies the node type (llm, agent, function, tool, code, etc.). Determines the node's behavior and available parameters.

```yaml
type: "llm"
```

### Input/Output Attributes

**`input`** (optional, default: `["messages"]`)
: List of state variable names the node reads from. Defines which parts of the state the node can access.

```yaml
input: ["user_input", "messages", "config"]
```

**`output`** (optional, default: `[]`)
: List of state variable names the node writes to. Specifies where the node's results are stored in state.

```yaml
output: ["extracted_data", "confidence_score"]
```

!!! note "Default Behavior"
    If `output` is empty or not specified, results typically go to the `messages` state variable by default (varies by node type).

### Flow Control Attributes

**`transition`** (optional)
: Simple transition to another node. Specifies the next node to execute unconditionally.

```yaml
transition: "next_step"
```

**`condition`** (optional)
: Conditional branching using Jinja2 template logic. Evaluates an expression and routes to different nodes based on the result.

```yaml
condition:
  condition_input: ["status", "approval"]
  condition_definition: |
    {% if status == 'approved' and approval == true %}
    PublishNode
    {% else %}
    ReviewNode
    {% endif %}
```

**`decision`** (optional)
: AI-powered decision making. Uses LLM to determine the next node based on context.

```yaml
decision:
  nodes: ["Publish", "Edit", "Reject"]
  decisional_inputs: ["feedback", "messages"]
  default_output: "ReviewAgain"
```

### Node-Specific Attributes

Each node type has additional parameters specific to its function. These are covered in detail in the individual node type guides.

![Common Node Attributes](../../../img/how-tos/pipelines/nodes/common-node-attributes.png)

## Node Categories

ELITEA Pipelines provide **13 different node types** organized into **5 functional categories**. Understanding these categories helps you quickly identify the right node for your needs.

### Interaction Nodes

**Purpose**: Interact with users or AI models to gather information, generate responses, or delegate tasks.

**Node Types**:

1. **[LLM Node](interaction-nodes.md#llm-node)** - Interact with Large Language Models
    * Call AI models (GPT-4, Claude, etc.) for text generation
    * Support chat history and conversation context
    * Bind tools for function calling
    * Extract structured data from responses

2. **[Agent Node](interaction-nodes.md#agent-node)** - Delegate tasks to pre-built AI agents
    * Execute specialized agents within your pipeline
    * Leverage agent-specific capabilities
    * Pass context and get results
    * Combine multiple agents in workflows

**When to Use**:

* Generate text, summaries, or responses
* Analyze content or extract information
* Have contextual conversations
* Delegate to specialized AI capabilities

![Interaction Nodes Overview](../../../img/how-tos/pipelines/nodes/interaction/interaction-nodes-overview.png)

---

### Execution Nodes

**Purpose**: Perform actions, call external services, execute code, or trigger integrations.

**Node Types**:

1. **[Function Node](execution-nodes.md#function-node)** - Call toolkits and MCPs
      * Execute toolkit functions (Jira, GitHub, Slack, etc.)
      * Call Model Context Protocol (MCP) servers
      * ⚠️ **Important**: Only works with Toolkits and MCPs (prompts/datasources deprecated)
      * Map inputs and capture outputs

2. **[Tool Node](execution-nodes.md#tool-node)** - Execute individual tools with LLM assistance
      * Use LLM to prepare tool arguments
      * Call external tools and services
      * Process tool responses
      * Handle validation errors gracefully

3. **[Code Node](execution-nodes.md#code-node)** - Run custom Python code
      * Execute arbitrary Python scripts
      * Access pipeline state via `alita_state`
      * Process data, perform calculations
      * Integrate with external APIs
      * Return structured results

4. **[Custom Node](execution-nodes.md#custom-node)** - Advanced manual JSON configuration
      * Make manual and advanced configurations
      * Use any available toolkit (Agents, Pipelines, Toolkits, MCPs)
      * Full control via JSON-based configuration
      * For advanced users with specific requirements

**When to Use**:

* Call external services or APIs
* Execute custom business logic
* Process or transform data
* Integrate with third-party systems
* Perform calculations or validations

![Execution Nodes Overview](../../../img/how-tos/pipelines/nodes/execution/execution-nodes-overview.png)

---

### Control Flow Nodes

**Purpose**: Make decisions and route pipeline execution based on conditions or logic.

**Node Types**:

1. **[Router Node](control-flow-nodes.md#router-node)** - Route based on expression evaluation
      * Evaluate Python expressions
      * Direct flow to specific nodes based on result
      * Support multiple output routes
      * Use state variables in conditions

2. **[Condition Node](control-flow-nodes.md#condition-node)** - Branch using Jinja2 templates
      * Write conditional logic with Jinja2
      * Access state variables in templates
      * Use filters and complex expressions
      * Support if/elif/else patterns

3. **[Decision Node](control-flow-nodes.md#decision-node)** - AI-powered routing decisions
      * Let LLM decide the next step
      * Provide context for intelligent routing
      * Define possible decision outcomes
      * Fallback to default if unclear

**When to Use**:

* Branch workflow based on data values
* Implement business rules
* Create approval workflows
* Route based on AI interpretation
* Handle different scenarios dynamically

![Control Flow Nodes Overview](../../../img/how-tos/pipelines/nodes/control-flow/control-flow-nodes-overview.png)

---

### Iteration Nodes

**Purpose**: Repeat actions over collections of data or tool results.

**Node Types**:

1. **[Loop Node](iteration-nodes.md#loop-node)** - Iterate over data with LLM preparation
    * Loop through lists or arrays
    * Use LLM to prepare each iteration's input
    * Execute a tool for each item
    * Accumulate results

2. **[Loop from Tool Node](iteration-nodes.md#loop-from-tool-node)** - Iterate over tool output
    * Call a tool that returns a list
    * Loop through the tool's results
    * Execute another tool for each result item
    * Map variables between iterations
    * Aggregate loop outputs

**When to Use**:

* Process multiple items in batch
* Generate reports for each item in a list
* Execute repeated actions on collections
* Transform arrays of data
* Aggregate results from multiple operations

![Iteration Nodes Overview](../../../img/how-tos/pipelines/nodes/iteration/iteration-nodes-overview.png)

---

### Utility Nodes

**Purpose**: Manage state, combine workflows, and perform pipeline utilities.

**Node Types**:

1. **[State Modifier Node](utility-nodes.md#state-modifier-node)** - Transform and clean state
    * Use Jinja2 templates to modify state
    * Combine multiple state variables
    * Format and transform data
    * Clean up or reset state variables
    * Apply filters (from_json, base64_to_string, split_by_words, etc.)

2. **[Pipeline (Subgraph) Node](utility-nodes.md#pipeline-subgraph-node)** - Nest pipelines
    * Execute another pipeline as a node
    * Pass state between parent and child pipelines
    * Map inputs and outputs
    * Build modular, reusable workflows
    * Create complex multi-level pipelines

**When to Use**:

* Format output for specific purposes
* Combine data from multiple sources
* Clean up temporary state
* Reuse existing pipelines
* Organize complex workflows
- Create modular pipeline architectures

![Utility Nodes Overview](../../../img/how-tos/pipelines/nodes/utility/utility-nodes-overview.png)

---

## Choosing the Right Node Type

Selecting the appropriate node depends on what action you need to perform. Use this decision guide:

### Decision Tree

```
Need to...
│
├─ Generate text or analyze content?
│  └─ Use **LLM Node** or **Agent Node**
│
├─ Call an external service or API?
│  ├─ Via a Toolkit/MCP? → **Function Node**
│  ├─ Need LLM to prepare arguments? → **Tool Node**
│  └─ Custom integration? → **Code Node**
│
├─ Make a decision or branch?
│  ├─ Simple expression? → **Router Node**
│  ├─ Template logic? → **Condition Node**
│  └─ AI-powered? → **Decision Node**
│
├─ Process multiple items?
│  ├─ From state array? → **Loop Node**
│  └─ From tool output? → **Loop from Tool Node**
│
└─ Manage state or combine pipelines?
   ├─ Transform state? → **State Modifier Node**
   └─ Nest pipeline? → **Pipeline (Subgraph) Node**
```

### Quick Reference Table

| **Goal** | **Recommended Node** | **Alternative** |
|----------|---------------------|-----------------|
| Call GPT-4 for text generation | LLM Node | Agent Node |
| Create Jira ticket | Function Node | Code Node + API |
| Decide next step based on approval | Condition Node | Decision Node |
| Process list of user stories | Loop Node | Loop from Tool Node |
| Format output with template | State Modifier Node | Code Node |
| Execute custom Python logic | Code Node | Function Node (if toolkit exists) |
| Route by status (approved/rejected) | Router Node | Condition Node |
| Process API response array | Loop from Tool Node | Loop Node |
| Reuse existing pipeline | Pipeline (Subgraph) Node | Duplicate nodes |
| Advanced custom configuration | Custom Node | Code Node |

![Node Selection Guide](../../../img/how-tos/pipelines/nodes/node-selection-guide.png)

## Common Patterns

### Pattern 1: Gather → Process → Act

```yaml
nodes:
  # 1. Gather information using LLM
  - id: "gather_requirements"
    type: "llm"
    input: ["user_input", "messages"]
    output: ["requirements", "project_id"]
    structured_output: true
  
  # 2. Process with external tool
  - id: "create_tickets"
    type: "function"
    function: "jira_toolkit||create_issue"
    input: ["requirements", "project_id"]
    output: ["ticket_ids"]
  
  # 3. Act - send notification
  - id: "notify_team"
    type: "function"
    function: "slack_toolkit||send_message"
    input: ["ticket_ids"]
    transition: "END"
```

### Pattern 2: Conditional Branching

```yaml
nodes:
  - id: "check_approval"
    type: "router"
    condition: "status == 'approved'"
    input: ["status"]
    routes: ["approved", "rejected"]
    default_output: "review_needed"
  
  - id: "approved"
    type: "llm"
    # ... approved workflow
  
  - id: "rejected"
    type: "llm"
    # ... rejection workflow
  
  - id: "review_needed"
    type: "llm"
    # ... review workflow
```

### Pattern 3: Batch Processing with Loop

```yaml
nodes:
  - id: "fetch_users"
    type: "function"
    function: "api_toolkit||get_users"
    output: ["user_list"]
  
  - id: "process_each_user"
    type: "loop_from_tool"
    tool: "email_toolkit||send_email"
    variables_mapping:
      email:
        type: "variable"
        source: "tool"
        value: "user_email"
    output: ["email_results"]
```

### Pattern 4: State Transformation

```yaml
nodes:
  - id: "extract_data"
    type: "llm"
    output: ["raw_data", "metadata"]
  
  - id: "format_output"
    type: "state_modifier"
    template: |
      ## Report
      **Data**: {{raw_data}}
      **Metadata**: {{metadata | from_json}}
    input: ["raw_data", "metadata"]
    output: ["formatted_report"]
```

## Best Practices

### 1. Use Descriptive Node IDs

✅ **Good**:
```yaml
id: "extract_jira_requirements"
id: "send_slack_notification"
id: "approve_or_reject_decision"
```

❌ **Avoid**:
```yaml
id: "node1"
id: "process"
id: "step_final"
```

### 2. Minimize State Pollution

Only output what you need:

✅ **Good**:
```yaml
output: ["user_id", "status"]  # Only what's needed
```

❌ **Avoid**:
```yaml
output: ["user_id", "status", "temp_data", "debug_info", "raw_response"]
```

### 3. Choose the Right Tool

- **Function Node** for direct toolkit calls (faster, more reliable)
- **Tool Node** when LLM needs to prepare complex arguments
- **Code Node** for custom logic not available in toolkits

### 4. Handle Errors Gracefully

Use conditional nodes to check for errors:

```yaml
- id: "api_call"
  type: "function"
  output: ["result", "error"]

- id: "check_error"
  type: "router"
  condition: "error is not None"
  routes: ["handle_error", "continue_success"]
```

### 5. Keep Nodes Focused

Each node should do one thing well:

✅ **Good**: Separate nodes for fetch → process → send
```yaml
- id: "fetch_data"
- id: "process_data"
- id: "send_results"
```

❌ **Avoid**: One node doing everything
```yaml
- id: "fetch_process_and_send_everything"
```

### 6. Use Consistent Naming

Establish naming conventions for your team:

```yaml
# Verb-noun pattern
id: "fetch_users"
id: "create_ticket"
id: "validate_input"

# Or: subject-action pattern
id: "user_validation"
id: "ticket_creation"
id: "email_notification"
```

### 7. Document Complex Nodes

Use comments in YAML to explain non-obvious logic:

```yaml
# This node uses LLM to extract structured data from user stories
# Expected output: {title, description, acceptance_criteria}
- id: "extract_story_details"
  type: "llm"
  structured_output: true
  output: ["title", "description", "acceptance_criteria"]
```

## Comparison Quick View

For detailed comparisons of nodes within each category, see:

- **[Interaction Nodes Comparison](interaction-nodes.md#interaction-nodes-comparison)** - LLM vs Agent
- **[Execution Nodes Comparison](execution-nodes.md#execution-nodes-comparison)** - Function vs Tool vs Code vs Custom
- **[Control Flow Nodes Comparison](control-flow-nodes.md#control-flow-nodes-comparison)** - Router vs Condition vs Decision
- **[Iteration Nodes Comparison](iteration-nodes.md#iteration-nodes-comparison)** - Loop vs Loop from Tool
- **[Utility Nodes Comparison](utility-nodes.md#utility-nodes-comparison)** - State Modifier vs Pipeline

Or view all comparisons together in the **[Appendix - Comparison Tables](../appendix-comparison-tables.md)**.

## Related

* **[States](../states.md)** - Understand how nodes read from and write to pipeline state
* **[Connections](../connections.md)** - Learn how to link nodes together
* **[Entry Point](../entry-point.md)** - Define where your pipeline begins
* **[Flow Editor](../flow-editor.md)** - Build pipelines visually with drag-and-drop
* **[YAML Configuration](../yaml.md)** - See complete node definition syntax
