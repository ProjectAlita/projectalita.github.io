# YAML Configuration

Direct pipeline configuration through YAML provides advanced control over pipeline definitions. This guide covers the complete YAML schema, syntax, and configuration patterns for building pipelines programmatically.

!!! info "Target Audience"
    This guide is designed for **advanced users** who prefer code-based pipeline editing or need to version-control pipeline definitions.

## What is YAML View

The YAML view is a code-based editor for pipelines, available in the **Configuration** tab alongside [Flow Editor](flow-editor.md). It provides direct access to the underlying pipeline definition using YAML syntax.

**Key Features:**

* **Instant Flow Sync**: Changes in YAML instantly reflect in Flow view and vice versa
* **CodeMirror Highlighting**: Syntax highlighting for YAML structure and validation
* **Real-time Validation**: Immediate feedback on YAML syntax errors
* **Find & Replace**: **Ctrl+F** (Windows) or **⌘+F** (Mac) for search functionality
* **Version Control**: Copy/paste YAML for backup or sharing

![YAML Editor Interface](../../img/how-tos/pipelines/yaml/yaml-editor-interface.png)

---

## YAML Schema Structure

Every pipeline YAML consists of **four top-level sections**:

```yaml
entry_point: <node_id>        # Required: Starting node
state: {...}                   # Required: State variables
nodes: [...]                   # Required: Pipeline nodes
interrupt_after: [...]         # Optional: Interrupt points
```

### Top-Level Fields Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `entry_point` | String | ✅ Yes | ID of the starting node |
| `state` | Object | ✅ Yes | State variable definitions |
| `nodes` | Array | ✅ Yes | List of node configurations |
| `interrupt_after` | Array | ❌ No | Node IDs where execution pauses |

---

## State Configuration

The `state` section defines all variables used across the pipeline. Each variable has a **type** and optional **default value**.

### State Syntax

```yaml
state:
  <variable_name>:
    type: <data_type>
    value: <default_value>  # Optional
```

### Supported Data Types

| Type | Description | Example Value |
|------|-------------|---------------|
| `str` | String | `"Hello"` |
| `number` | Integer or float | `42`, `3.14` |
| `list` | Array | `[]`, `["a", "b"]` |
| `dict` | Dictionary/object | `{}`, `{"key": "value"}` |
| `bool` | Boolean | `true`, `false` |

### State Examples

**Simple State Variables:**
```yaml
state:
  input:
    type: str                # No default value
  messages:
    type: list               # No default value
  counter:
    type: number
    value: 0                 # Default: 0
  is_approved:
    type: bool
    value: false             # Default: false
```

**Complex State with Defaults:**
```yaml
state:
  question:
    type: str
    value: ''                # Empty string default
  qna_list:
    type: list
    value: []                # Empty list default
  index:
    type: number
    value: 0                 # Start at 0
  response_full:
    type: str
    value: ''                # Accumulator for responses
```

!!! tip "State Design Guidelines"
    - Define all variables used across nodes
    - Use descriptive names (`user_query` not `q`)
    - Initialize accumulators with empty values (`''`, `[]`, `0`)
    - Reference state variables in [States Guide](states.md)

---

## Node Configuration

The `nodes` array contains all pipeline nodes. Each node has a **common structure** plus **node-type-specific** fields.

### Common Node Fields

**Every node must include:**

```yaml
nodes:
  - id: <unique_node_id>     # Required: Node identifier
    type: <node_type>         # Required: Node type (llm, function, etc.)
    input: [...]              # Required: Input state variables
    output: [...]             # Required: Output state variables
    transition: <next_node>   # Required for non-terminal nodes
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | ✅ Yes | Unique node identifier (used in transitions) |
| `type` | String | ✅ Yes | Node type (see [Nodes Overview](nodes/overview.md)) |
| `input` | Array | ✅ Yes | List of state variables to read |
| `output` | Array | ✅ Yes | List of state variables to write |
| `transition` | String | Conditional | Next node ID (not needed if using `condition`, `decision`, or `END`) |

---

## Node-Type-Specific Configurations

Each node type has additional required fields. Below are complete configurations for all 13 node types.

### 1. LLM Node

**Purpose**: Call language models with system/task prompts  
**Reference**: [Interaction Nodes - LLM](nodes/interaction-nodes.md#llm-node)

```yaml
nodes:
  - id: Summarizer
    type: llm
    prompt:
      type: string           # Fixed prompt
      value: ''              # Empty if using input_mapping
    input:
      - article_text
    output:
      - messages             # Standard LLM output
    structured_output: false # Set true for JSON schema
    transition: NextNode
    input_mapping:
      system:
        type: fixed
        value: "You are an expert summarizer"
      task:
        type: fstring
        value: "Summarize this: {article_text}"
      chat_history:
        type: fixed
        value: []
    tool_names:              # Optional: Available toolkits
      toolkit_name:
        - tool1
        - tool2
```

**Input Mapping Types:**
- `fixed`: Static value
- `variable`: Reference state variable by name
- `fstring`: Template with `{variable}` placeholders

### 2. Agent Node

**Purpose**: Execute pre-configured agents  
**Reference**: [Interaction Nodes - Agent](nodes/interaction-nodes.md#agent-node)

```yaml
nodes:
  - id: ResearchAgent
    type: agent
    input:
      - user_query
    output:
      - research_results
    input_mapping:
      task:
        type: variable
        value: user_query
      chat_history:
        type: fixed
        value: []
    tool: "GitHub Expert"     # Agent name from dropdown
    transition: ProcessResults
```

### 3. Function Node

**Purpose**: Execute single toolkit function  
**Reference**: [Execution Nodes - Function](nodes/execution-nodes.md#function-node)

```yaml
nodes:
  - id: SearchDatabase
    type: function
    tool: search_index        # Function name
    toolkit_name: EPMALTA     # Toolkit name
    input:
      - query
    output:
      - search_results
    structured_output: false
    input_mapping:
      query:
        type: variable
        value: query
      search_top:
        type: fixed
        value: 10
      cut_off:
        type: fixed
        value: 0.5
      filter:
        type: fixed
        value: {}
    transition: ProcessResults
```

### 4. Tool Node

**Purpose**: Execute multiple toolkit functions  
**Reference**: [Execution Nodes - Tool](nodes/execution-nodes.md#tool-node)

```yaml
nodes:
  - id: MultiTool
    type: tool
    tool: ["function1", "function2"]  # Array of tools
    toolkit_name: MyToolkit
    input:
      - input_data
    output:
      - tool_results
    structured_output: false
    input_mapping:
      param1:
        type: variable
        value: input_data
    transition: NextNode
```

### 5. Code Node

**Purpose**: Execute Python code sandbox  
**Reference**: [Execution Nodes - Code](nodes/execution-nodes.md#code-node)

```yaml
nodes:
  - id: DataProcessor
    type: code
    code:
      type: fixed
      value: |
        import csv
        from io import StringIO
        
        # Access state via alita_state
        input_text = alita_state.get('input')
        
        # Process data
        result = {"processed": input_text.upper()}
        
        # Return dict updates state
        result
    input:
      - input
    output:
      - processed_data
    structured_output: true   # Return dict structure
    transition: NextNode
```

**Code Node Rules:**

* Use `alita_state.get('variable')` to read state
* Return a dictionary to update state
* Set `structured_output: true` for dict returns
* See [Code Node](nodes/execution-nodes.md#code-node) for sandbox details

### 6. Custom Node

**Purpose**: Execute custom Python code with toolkit access  
**Reference**: [Execution Nodes - Custom](nodes/execution-nodes.md#custom-node)

```yaml
nodes:
  - id: CustomProcessor
    type: custom
    code:
      type: fixed
      value: |
        # Custom logic with toolkits
        result = {"status": "processed"}
        result
    input:
      - input_data
    output:
      - custom_result
    structured_output: true
    transition: NextNode
    tool_names:               # Optional toolkit access
      toolkit1:
        - tool_a
```

### 7. Router Node

**Purpose**: Template-based routing  
**Reference**: [Control Flow Nodes - Router](nodes/control-flow-nodes.md#router-node)

```yaml
nodes:
  - id: CategoryRouter
    type: router
    default_output: DefaultNode  # Fallback node
    routes:
      - ProcessA
      - ProcessB
      - END
    input:
      - category
    condition: |
      {% if category == 'urgent' %}
        ProcessA
      {% elif category == 'normal' %}
        ProcessB
      {% else %}
        END
      {% endif %}
```

**Router Syntax:**

* Uses **Jinja2 templates**
* Must return a node ID from `routes` or `default_output`
* Use `{% if %}`, `{% elif %}`, `{% else %}`, `{% endif %}`

### 8. Condition Node

**Purpose**: Boolean-based routing  
**Reference**: [Control Flow Nodes - Condition](nodes/control-flow-nodes.md#condition-node)

```yaml
nodes:
  - id: ApprovalCheck
    type: condition
    input:
      - input
      - branches
    output:
      - branches             # Pass-through output
    condition:
      condition_definition: |
        {% if 'approved' in input|lower and branches %}
          PublishNode
        {% else %}
          ReviewNode
        {% endif %}
      condition_input:
        - input
        - branches
      conditional_outputs:
        - PublishNode
      default_output: ReviewNode
```

**Condition Structure:**

* `condition_definition`: Jinja2 template returning node ID
* `condition_input`: Variables used in condition
* `conditional_outputs`: List of possible nodes
* `default_output`: Fallback node

### 9. Decision Node

**Purpose**: LLM-powered routing  
**Reference**: [Control Flow Nodes - Decision](nodes/control-flow-nodes.md#decision-node)

```yaml
nodes:
  - id: SmartRouter
    type: decision
    input:
      - user_input
    output:
      - classification
    decision:
      description: |
        Analyze user intent and route to:
        - "SaveNode" if user wants to save
        - "END" if request is unclear
      decisional_inputs:
        - user_input
      nodes:
        - SaveNode
      default_output: END
    tool_names:               # Optional toolkits
      toolkit1:
        - tool_a
```

**Decision Fields:**

* `description`: Instructions for LLM routing logic
* `decisional_inputs`: Variables LLM analyzes
* `nodes`: List of possible destinations
* `default_output`: Fallback node

### 10. Loop Node

**Purpose**: Iterate over task list  
**Reference**: [Iteration Nodes - Loop](nodes/iteration-nodes.md#loop-node)

```yaml
nodes:
  - id: ProcessItems
    type: loop
    input:
      - item_list
    output:
      - processed_items
    transition: SummaryNode
    input_mapping:
      task_instructions:
        type: fixed
        value: "Process each item with analysis"
      variables_mapping:
        type: fixed
        value:
          items: item_list    # Map state to loop variable
```

### 11. Loop from Tool Node

**Purpose**: Iterate over toolkit function results  
**Reference**: [Iteration Nodes - Loop from Tool](nodes/iteration-nodes.md#loop-from-tool-node)

```yaml
nodes:
  - id: ProcessSearchResults
    type: loop_from_tool
    tool: search_index
    toolkit_name: EPMALTA
    input:
      - query
    output:
      - all_results
    transition: AggregateResults
    input_mapping:
      task_instructions:
        type: fixed
        value: "Analyze each search result"
      variables_mapping:
        type: fixed
        value:
          results: search_results  # Tool output field
      query:
        type: variable
        value: query
```

!!! warning "Variables Mapping Required"
    `variables_mapping` is **critical** for Loop from Tool—see [Iteration Nodes](nodes/iteration-nodes.md#loop-from-tool-node).

### 12. State Modifier Node

**Purpose**: Transform state with Jinja2 templates  
**Reference**: [Utility Nodes - State Modifier](nodes/utility-nodes.md#state-modifier-node)

```yaml
nodes:
  - id: IncrementCounter
    type: state_modifier
    template: '{{ index + 1 }}'
    variables_to_clean: []    # Optional: clear variables
    input:
      - index
    output:
      - index                 # Overwrites index
    transition: NextNode
```

**Advanced Template Example:**
```yaml
nodes:
  - id: AggregateResponse
    type: state_modifier
    template: |
      {{ response_full }} 
      
      ## Question {{index}}
      {{question}} 
      
      ## Answer {{index}} 
      {{messages[-1].content }}
    variables_to_clean: []
    input:
      - response_full
      - messages
      - question
      - index
    output:
      - response_full
    transition: NextStep
```

### 13. Pipeline (Subgraph) Node

**Purpose**: Execute nested pipelines  
**Reference**: [Utility Nodes - Pipeline](nodes/utility-nodes.md#pipeline-subgraph-node)

```yaml
nodes:
  - id: RunSubPipeline
    type: pipeline
    tool: "Baseline Automation assessment"  # Pipeline name
    input: []                 # Input from parent state
    output: []                # Output to parent state
    transition: NextNode
```

---

## Entry Point Configuration

The `entry_point` field specifies the **first node** to execute. See [Entry Point](entry-point.md) for complete rules.

```yaml
entry_point: StartNode

nodes:
  - id: StartNode
    type: llm
    # ... configuration
```

**Rules:**

* Must reference an existing node ID
* Only **one** entry point per pipeline
* Router/Condition nodes **cannot** be entry points

---

## Interrupt Configuration

The `interrupt_after` array defines **pause points** where execution stops for user input. See [Nodes Connectors - Interrupts](nodes-connectors.md#interrupt-options).

```yaml
interrupt_after:
  - ReviewNode
  - ApprovalCheck

nodes:
  - id: ReviewNode
    type: llm
    # Execution pauses AFTER this node completes
    transition: NextNode
```

**When to Use:**
- Human-in-the-loop workflows
- Review checkpoints
- Approval gates

---

## Connection Patterns

Nodes connect via `transition`, `condition`, `decision`, or routes. See [Nodes Connectors](nodes-connectors.md) for complete details.

### 1. Simple Transition

```yaml
nodes:
  - id: Step1
    type: llm
    transition: Step2        # Direct connection
  
  - id: Step2
    type: function
    transition: END          # Terminal node
```

### 2. Router Connection

```yaml
nodes:
  - id: CategoryRouter
    type: router
    default_output: DefaultNode
    routes:
      - ProcessA
      - ProcessB
    condition: |
      {% if category == 'urgent' %}
        ProcessA
      {% else %}
        ProcessB
      {% endif %}
```

### 3. Condition Connection

```yaml
nodes:
  - id: CheckApproval
    type: condition
    condition:
      condition_definition: |
        {% if 'approved' in input|lower %}
          PublishNode
        {% else %}
          ReviewNode
        {% endif %}
      conditional_outputs:
        - PublishNode
      default_output: ReviewNode
```

### 4. Decision Connection

```yaml
nodes:
  - id: SmartRouter
    type: decision
    decision:
      description: "Route based on user intent"
      nodes:
        - SaveNode
        - ProcessNode
      default_output: END
```

### 5. END Termination

```yaml
nodes:
  - id: FinalStep
    type: llm
    transition: END          # Pipeline terminates
```

---

## CodeMirror Features

The YAML editor includes **CodeMirror** for enhanced editing:

![CodeMirror Highlighting](../../img/how-tos/pipelines/yaml/codemirror-highlighting.png)

**Features:**

* **Syntax Highlighting**: Color-coded YAML structure
* **Error Detection**: Red underlines for invalid YAML
* **Auto-Indentation**: Automatic spacing for nested structures
* **Line Numbers**: Navigate large pipelines easily
* **Find & Replace**: 
    * **Windows**: `Ctrl + F`
    * **Mac**: `⌘ + F`

**Find & Replace Usage:**

```
1. Press Ctrl+F (or ⌘+F)
2. Type search term
3. Press Enter to find next
4. Click replace icon for substitutions
```

![Find Replace Feature](../../img/how-tos/pipelines/yaml/find-replace.png)

---

## Instant Flow Sync

Changes in YAML **instantly sync** to Flow Editor and vice versa.

**YAML → Flow:**
```yaml
# Add new node in YAML
nodes:
  - id: NewNode
    type: llm
    transition: END
```
→ **Immediately appears** in Flow Editor canvas

**Flow → YAML:**
- Add node via Flow Editor `+` button
- YAML updates automatically with new node structure

![Flow YAML Sync](../../img/how-tos/pipelines/yaml/flow-yaml-sync.png)

!!! tip "Two-Way Sync Benefits"
    - Start in Flow for visual layout
    - Switch to YAML for bulk edits (find/replace)
    - Copy YAML for version control
    - Paste YAML to duplicate pipelines

---

## Complete Working Examples

### Example 1: Simple Linear Pipeline

**Use Case**: Process input → Search → Summarize

```yaml
entry_point: ProcessInput
state:
  input:
    type: str
  search_results:
    type: str
  messages:
    type: list
nodes:
  - id: ProcessInput
    type: function
    tool: search_index
    toolkit_name: EPMALTA
    input:
      - input
    output:
      - search_results
    structured_output: false
    input_mapping:
      query:
        type: variable
        value: input
      search_top:
        type: fixed
        value: 5
    transition: Summarizer
  
  - id: Summarizer
    type: llm
    input:
      - search_results
    output:
      - messages
    structured_output: false
    transition: END
    input_mapping:
      system:
        type: fixed
        value: "Summarize search results"
      task:
        type: variable
        value: search_results
      chat_history:
        type: fixed
        value: []
```

### Example 2: Conditional Routing with Interrupt

**Use Case**: Process branches → User approval → Save or retry

```yaml
entry_point: ListBranches
state:
  input:
    type: str
  branches:
    type: str
  messages:
    type: list
nodes:
  - id: ListBranches
    type: function
    tool: list_branches_in_repo
    toolkit_name: GitHubToolkit
    input:
      - input
    output:
      - branches
    structured_output: false
    input_mapping: {}
    transition: FormatBranches
  
  - id: FormatBranches
    type: state_modifier
    template: |
      {% for name in branches | map(attribute='name') %}
      {{ name }}
      {% endfor %}
    variables_to_clean: []
    input:
      - branches
    output:
      - branches
    transition: ReviewBranches
  
  - id: ReviewBranches
    type: llm
    input:
      - input
      - branches
    output:
      - branches
    structured_output: false
    transition: ApprovalCheck
    input_mapping:
      system:
        type: fixed
        value: "Present branch list to user"
      task:
        type: fstring
        value: "User Input: {input}\nBranch List: {branches}"
      chat_history:
        type: fixed
        value: []
  
  - id: ApprovalCheck
    type: condition
    input:
      - input
      - branches
    output:
      - branches
    condition:
      condition_definition: |
        {% if 'approved' in input|lower and branches %}
          SaveBranches
        {% else %}
          ReviewBranches
        {% endif %}
      condition_input:
        - input
        - branches
      conditional_outputs:
        - SaveBranches
      default_output: ReviewBranches
  
  - id: SaveBranches
    type: llm
    input:
      - branches
    output:
      - messages
    structured_output: false
    transition: END
    input_mapping:
      system:
        type: fixed
        value: "Save branches to markdown file"
      task:
        type: fstring
        value: "create a markdown file: {branches}"
      chat_history:
        type: fixed
        value: []
    tool_names:
      FileToolkit:
        - createFile

interrupt_after:
  - ReviewBranches
```

### Example 3: Loop with Router Exit

**Use Case**: Process Q&A list → Check completion → Summarize

```yaml
entry_point: LoadQuestions
state:
  qna_list:
    type: list
    value: []
  index:
    type: number
    value: 0
  question:
    type: str
    value: ''
  answer:
    type: str
    value: ''
  result:
    type: str
  response_full:
    type: str
    value: ''
  messages:
    type: list
nodes:
  - id: LoadQuestions
    type: code
    code:
      type: fixed
      value: |
        # Load Q&A pairs from CSV
        qna = [{"question": "Q1", "answer": "A1"}, {"question": "Q2", "answer": "A2"}]
        result = {"qna_list": qna, "index": 0}
        result
    input: []
    output:
      - qna_list
      - index
    structured_output: true
    transition: GetQuestion
  
  - id: GetQuestion
    type: state_modifier
    template: '{{qna_list[index][''question'']}}'
    variables_to_clean: []
    input:
      - qna_list
      - index
    output:
      - question
    transition: ProcessQuestion
  
  - id: ProcessQuestion
    type: function
    tool: search_index
    toolkit_name: EPMALTA
    input:
      - question
    output:
      - result
    structured_output: false
    input_mapping:
      query:
        type: variable
        value: question
      search_top:
        type: fixed
        value: 5
    transition: AggregateResults
  
  - id: AggregateResults
    type: state_modifier
    template: '{{ response_full + "\n\n## Question " + (index|string) + "\n" + question + "\n\n" + result }}'
    variables_to_clean: []
    input:
      - response_full
      - question
      - result
      - index
    output:
      - response_full
    transition: IncrementIndex
  
  - id: IncrementIndex
    type: state_modifier
    template: '{{ index + 1 }}'
    variables_to_clean: []
    input:
      - index
    output:
      - index
    transition: ExitCheck
  
  - id: ExitCheck
    type: router
    default_output: Summarize
    routes:
      - GetQuestion
      - Summarize
    input:
      - index
      - qna_list
    condition: |
      {% if index < (qna_list | length) %}
        GetQuestion
      {% else %}
        Summarize
      {% endif %}
  
  - id: Summarize
    type: llm
    input:
      - response_full
    output:
      - messages
    structured_output: false
    transition: END
    input_mapping:
      system:
        type: fixed
        value: "Create summary report"
      task:
        type: variable
        value: response_full
      chat_history:
        type: fixed
        value: []
```

### Example 4: Nested Pipelines

**Use Case**: Run two sequential sub-pipelines

```yaml
entry_point: BaselineAssessment
state:
  input:
    type: str
  messages:
    type: list
nodes:
  - id: BaselineAssessment
    type: pipeline
    tool: "Baseline Automation assessment"
    input: []
    output: []
    transition: LayoutAssessment
  
  - id: LayoutAssessment
    type: pipeline
    tool: "Layout Automation Assessment"
    input: []
    output: []
    transition: END
```

---

## YAML Syntax Rules

Follow these rules to avoid validation errors:

### Indentation
```yaml
✅ Correct:
nodes:
  - id: Node1
    type: llm
    input:
      - var1

❌ Incorrect (mixed spaces/tabs):
nodes:
  - id: Node1
	type: llm    # Tab used instead of spaces
```

### Strings with Special Characters
```yaml
✅ Correct:
template: '{{ index + 1 }}'          # Single quotes
description: "Route based on input"  # Double quotes
value: |                             # Multi-line block
  Line 1
  Line 2

❌ Incorrect:
template: {{ index + 1 }}            # Missing quotes
description: Route: urgent           # Colon needs quotes
```

### Lists vs Objects
```yaml
✅ Correct:
input:
  - var1
  - var2
routes:
  - NodeA
  - NodeB

❌ Incorrect:
input: [var1, var2]    # Inline style (avoid for readability)
```

### Boolean and Null Values
```yaml
✅ Correct:
structured_output: true
structured_output: false
value: null

❌ Incorrect:
structured_output: True   # Must be lowercase
value: None               # Use null, not None
```

---

## Common YAML Errors

### Error 1: Invalid Indentation
```yaml
❌ Error:
nodes:
- id: Node1
  type: llm
   input:       # Extra space
    - var1

✅ Fix:
nodes:
  - id: Node1
    type: llm
    input:
      - var1
```

### Error 2: Missing Quotes
```yaml
❌ Error:
condition: {% if approved %}

✅ Fix:
condition: '{% if approved %}'
# OR
condition: |
  {% if approved %}
    NodeA
  {% endif %}
```

### Error 3: Undefined Node Reference
```yaml
❌ Error:
transition: NonExistentNode

✅ Fix:
# Ensure node exists:
nodes:
  - id: NonExistentNode
    type: llm
    # ...
```

### Error 4: Invalid Node Type
```yaml
❌ Error:
type: invalid_type

✅ Fix:
type: llm  # Use valid types: llm, agent, function, tool, code, custom, router, condition, decision, loop, loop_from_tool, state_modifier, pipeline
```

### Error 5: Missing Required Fields
```yaml
❌ Error:
nodes:
  - id: Node1
    type: llm
    # Missing: input, output, transition

✅ Fix:
nodes:
  - id: Node1
    type: llm
    input: []
    output: []
    transition: END
```

---

## Validation Checklist

Before saving YAML, verify:

* [ ] **Entry point** exists and references valid node ID
* [ ] **All nodes** have unique IDs
* [ ] **All transitions** reference existing nodes or END
* [ ] **State variables** referenced in nodes are defined in `state` section
* [ ] **Input/output arrays** use valid state variable names
* [ ] **Node-specific fields** are complete (e.g., LLM has `input_mapping`)
* [ ] **YAML syntax** is valid (no red underlines in editor)
* [ ] **Indentation** uses spaces (not tabs)
* [ ] **Quotes** surround strings with special characters (`:`, `{`, `%`)

---

## Best Practices

### ✅ Do's

**1. Use Descriptive Node IDs**
```yaml
✅ Good:
- id: FetchUserData
- id: ValidateEmail
- id: SendNotification

❌ Avoid:
- id: Node1
- id: Step2
```

**2. Initialize State Defaults**
```yaml
✅ Good:
state:
  counter:
    type: number
    value: 0        # Clear starting point
  results:
    type: list
    value: []       # Empty accumulator
```

**3. Use Multi-Line Blocks for Templates**
```yaml
✅ Good:
template: |
  {% if index < (qna_list | length) %}
    GetQuestion
  {% else %}
    Summarize
  {% endif %}

❌ Avoid:
template: '{% if index < (qna_list | length) %}GetQuestion{% else %}Summarize{% endif %}'
```

**4. Group Related Nodes**
```yaml
✅ Good:
nodes:
  # Data Loading
  - id: LoadData
  - id: ValidateData
  
  # Processing
  - id: TransformData
  - id: EnrichData
  
  # Output
  - id: FormatResults
  - id: SaveResults
```

**5. Version Control YAML**
```bash
# Copy YAML to file
cat > pipeline_v1.yaml

# Commit to git
git add pipeline_v1.yaml
git commit -m "Add Q&A processing pipeline"
```

### ❌ Don'ts

**1. Don't Hardcode Sensitive Data**
```yaml
❌ Avoid:
input_mapping:
  api_key:
    type: fixed
    value: "sk-123456..."  # Use Credentials instead
```

**2. Don't Create Unreachable Nodes**
```yaml
❌ Avoid:
nodes:
  - id: Node1
    transition: Node3  # Node2 is unreachable
  - id: Node2
    transition: END
  - id: Node3
    transition: END
```

**3. Don't Mix Inline and Block Styles**
```yaml
❌ Avoid:
input: [var1, var2]    # Inline
output:                # Block
  - result
```

**4. Don't Duplicate Node IDs**
```yaml
❌ Avoid:
nodes:
  - id: ProcessData
    type: llm
  - id: ProcessData   # Duplicate ID!
    type: function
```

**5. Don't Forget END Termination**
```yaml
❌ Avoid:
nodes:
  - id: FinalNode
    type: llm
    transition: AnotherNode  # No END termination

✅ Correct:
nodes:
  - id: FinalNode
    type: llm
    transition: END
```

---

## YAML Workflow Tips

**1. Start with Flow, Refine in YAML**
- Use Flow Editor to layout nodes visually
- Switch to YAML for bulk edits (find/replace node IDs, update mappings)
- Copy YAML for backup before major changes

**2. Use Find/Replace for Bulk Updates**
```yaml
# Example: Update all toolkit references
Find:    toolkit_name: OldToolkit
Replace: toolkit_name: NewToolkit
```

**3. Test Incrementally**
- Add one node at a time
- Run pipeline after each addition
- Check for YAML validation errors (red underlines)

**4. Copy YAML for Sharing**
```yaml
# Share pipeline definitions with team
1. Copy YAML from editor
2. Paste into shared document or repository
3. Teammates can paste YAML into their ELITEA instance
```

**5. Use Comments for Documentation**
```yaml
nodes:
  # Step 1: Load and validate input data
  - id: LoadData
    type: code
    # ...
  
  # Step 2: Process each item in loop
  - id: ProcessItems
    type: loop
    # ...
```

---

## Related

* **[Flow Editor](flow-editor.md)** - Visual pipeline building with instant YAML sync
* **[States](states.md)** - State variable design and Flow mode
* **[Nodes Overview](nodes/overview.md)** - All 13 node types reference
* **[Nodes Connectors](nodes-connectors.md)** - Connection patterns and transitions
* **[Entry Point](entry-point.md)** - Entry point configuration rules
* **[Interaction Nodes](nodes/interaction-nodes.md)** - LLM and Agent node details
* **[Execution Nodes](nodes/execution-nodes.md)** - Function, Tool, Code, Custom nodes
* **[Control Flow Nodes](nodes/control-flow-nodes.md)** - Router, Condition, Decision nodes
* **[Iteration Nodes](nodes/iteration-nodes.md)** - Loop and Loop from Tool nodes
* **[Utility Nodes](nodes/utility-nodes.md)** - State Modifier and Pipeline nodes
