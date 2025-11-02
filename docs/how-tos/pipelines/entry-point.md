# Pipeline Entry Point

The Entry Point is the starting node of your pipeline—the first step in your workflow execution. Every pipeline must have exactly one entry point to determine where execution begins.

!!! warning "Required Configuration"
    **Every pipeline must have an entry point.** Without a designated entry point, the pipeline cannot start properly and will fail to execute.

---

## What is an Entry Point?

The **Entry Point** defines which node executes first when your pipeline runs. Think of it as the "starting line" of your workflow.

### Key Rules

**Single Entry Point**:

* **Exactly one node** must be designated as the entry point
* **Only one entry point** allowed per pipeline
* Pipeline execution always begins at this node

**Node Eligibility**:

* ✅ **Can be entry points**: LLM, Agent, Function, Tool, Code, Custom, Loop, Loop from Tool, State Modifier, Pipeline (Subgraph), Decision
* ❌ **Cannot be entry points**: Router and Condition nodes

**Why Router and Condition Can't Be Entry Points**:

Router and Condition nodes require input data to evaluate their conditions. At pipeline start, there's no prior execution, so no state variables have been populated yet.

```yaml
# ❌ Router needs 'status' from a prior node
- id: "status_router"
  type: "router"
  condition: |
    {% if status == 'approved' %}  # 'status' doesn't exist at start
```

Decision nodes CAN be entry points because they use LLM reasoning, which can work with initial input.

---

## Setting an Entry Point

### Visual Method (Flow Editor)

![Setting Entry Point in Flow Editor](../../../img/how-tos/pipelines/entry-point/set-entrypoint-menu.png)

**Steps**:

1. **Open your pipeline** in the Flow Editor
2. **Click the three dots** (⋮) in the top-right corner of the node card
3. **Select "Make entrypoint"** from the dropdown menu

![Entry Point Menu Option](../../../img/how-tos/pipelines/entry-point/make-entrypoint-option.png)

**Changing the Entry Point**:

To change which node is the entry point, simply select "Make entrypoint" on a different node. The previous entry point designation is automatically cleared.

!!! tip "Entry Point Switching"
    Only one entry point can exist. Setting a new entry point automatically removes the previous designation.

### YAML Method

In YAML configuration, define the entry point at the top level:

```yaml
entry_point: "node_id"

nodes:
  - id: "node_id"
    type: "llm"
    # ... node configuration
```

**Validation Rules**:

✅ **Valid**:
```yaml
entry_point: "greeting"

nodes:
  - id: "greeting"  # ID matches entry_point
    type: "llm"
```

❌ **Invalid - Non-existent node**:
```yaml
entry_point: "missing_node"  # Error: node doesn't exist
```

❌ **Invalid - Router as entry point**:
```yaml
entry_point: "route_decision"

nodes:
  - id: "route_decision"
    type: "router"  # Error: Router can't be entry point
```

---

## Choosing the Right Entry Point

Different node types serve different purposes as entry points:

| Node Type | Best For | Example Use Case |
|-----------|----------|------------------|
| **LLM** | Conversational workflows | Start with user greeting, collect requirements |
| **Agent** | Delegating to specialized agents | Initial data collection by expert agent |
| **Function** | API-driven workflows | Fetch data from external system |
| **Tool** | LLM-assisted tool selection | Flexible data retrieval with tool choice |
| **Code** | Custom initialization logic | Setup state, perform calculations |
| **Loop** | Batch processing | Process list of items from start |
| **Loop from Tool** | Discovery + processing | Fetch files, then process each |
| **State Modifier** | State initialization | Set up workflow variables |
| **Pipeline (Subgraph)** | Modular workflows | Execute setup pipeline first |
| **Decision** | Smart routing | Classify request, route to workflow |

### Common Patterns

**Pattern 1: Conversational Workflow**
```yaml
entry_point: "greet_user"

nodes:
  - id: "greet_user"
    type: "llm"
    prompt:
      type: "string"
      value: "Hello! How can I help you today?"
    output: ["user_request"]
    transition: "process_request"
```

**Pattern 2: Automated Data Pipeline**
```yaml
entry_point: "fetch_data"

nodes:
  - id: "fetch_data"
    type: "function"
    toolkit: "Database Connector"
    tool: "getDailyRecords"
    output: ["records"]
    transition: "process_records"
```

**Pattern 3: Smart Request Routing**
```yaml
entry_point: "classify_request"

nodes:
  - id: "classify_request"
    type: "decision"
    decision_input: "input"
    description: "Route to technical, billing, or general support"
    decision_outputs: ["technical", "billing", "general"]
    default_output: "general"
```

**Pattern 4: Batch Processing**
```yaml
entry_point: "process_files"

nodes:
  - id: "process_files"
    type: "loop_from_tool"
    toolkit: "GitHub Expert"
    tool: "getFilesFromDirectory"
    loop_toolkit: "Document Generator"
    variables_mapping:
      file_path: "task"
    structured_output: true
    output: ["documentation"]
    transition: "END"
```

---

## Common Errors and Solutions

### Error 1: Missing Entry Point

**Error Message**: "Pipeline must have an entry point"

**Solution**:
```yaml
# Add entry_point at top level
entry_point: "first_node"

nodes:
  - id: "first_node"
    # ... configuration
```

### Error 2: Invalid Node ID

**Error Message**: "Entry point 'xyz' does not exist in nodes"

**Solution**: Ensure entry_point matches an actual node ID
```yaml
entry_point: "greeting"  # Must match node ID

nodes:
  - id: "greeting"  # Matches entry_point
```

### Error 3: Router/Condition as Entry Point

**Error Message**: "Router nodes cannot be entry points" or "Condition nodes cannot be entry points"

**Solution**: Start with a different node type
```yaml
# ❌ Wrong
entry_point: "route_status"

# ✅ Correct
entry_point: "collect_status"

nodes:
  - id: "collect_status"
    type: "llm"
    output: ["status"]
    transition: "route_status"
  
  - id: "route_status"
    type: "router"
    # ... routing logic
```

---

## Best Practices

### 1. Match Entry Point to Workflow Type

**Conversational**: Start with LLM node  
**Automated**: Start with Function/Tool node  
**Routing**: Start with Decision node  
**Batch**: Start with Loop/Loop from Tool node  
**Modular**: Start with Pipeline (Subgraph) node

### 2. Initialize State Early

If your workflow needs setup, use State Modifier or Code nodes:

```yaml
entry_point: "initialize"

nodes:
  - id: "initialize"
    type: "state_modifier"
    template: "Workflow started at {{ timestamp }}"
    output: ["workflow_info"]
    transition: "main_process"
```

### 3. Verify Entry Point Matches Node ID

Always check that `entry_point` value exactly matches a node `id`:

✅ **Good**:
```yaml
entry_point: "start_node"

nodes:
  - id: "start_node"
```

❌ **Avoid**:
```yaml
entry_point: "start_node"

nodes:
  - id: "start"  # Mismatch
```

### 4. Test Entry Point Execution

After setting an entry point:

1. Run the pipeline
2. Verify the entry point node executes first
3. Check state after entry point execution
4. Confirm transition to next node works

### 5. Document Your Choice

Add a comment explaining why you chose a specific entry point:

```yaml
# Entry point: greet_user
# Starts with user interaction to collect project requirements
entry_point: "greet_user"
```

### 6. Avoid Router/Condition at Start

Remember: Router and Condition nodes need data from previous nodes. Always start with a node that can execute independently.

### 7. Use Decision for Intent Classification

If your pipeline's primary purpose is routing, Decision nodes make excellent entry points:

```yaml
entry_point: "classify_intent"

nodes:
  - id: "classify_intent"
    type: "decision"
    decision_input: "input"
    description: "Classify user intent and route appropriately"
```

---

## Related

* **[Nodes Overview](nodes/overview.md)** - Learn about all available node types
* **[States](states.md)** - Understand state management in pipelines
* **[Flow Editor](flow-editor.md)** - Visual pipeline building interface
* **[YAML Configuration](yaml.md)** - Complete YAML syntax reference
* **[Pipelines Overview](overview.md)** - Back to main pipelines guide
