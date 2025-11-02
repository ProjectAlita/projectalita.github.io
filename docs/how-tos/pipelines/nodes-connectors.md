# Nodes Connectors

Learn how to connect nodes in your pipeline to create complete workflows. Connectors define the execution flow between nodes, determining how data and control moves through your pipeline.

---

## What Are Node Connectors?

**Node connectors** (also called **transitions** or **edges**) are the links between nodes that define your pipeline's execution path. They determine:

* **Execution order**: Which node runs after the current node completes
* **Data flow**: How outputs from one node become inputs for the next
* **Control flow**: How decisions and conditions route execution to different paths
* **Pipeline termination**: When and how the pipeline ends

Every pipeline requires at least two critical connection points:

1. **Entry Point**: The starting node where pipeline execution begins
2. **END Node**: The termination point where pipeline execution stops

![Pipeline connector overview showing entry point, node connections, and END](../../img/how-tos/pipelines/nodes-connectors/connector-overview.png)

---

## Entry Point Node

The **Entry Point** is the first node that executes when your pipeline runs. Every pipeline must have exactly one entry point.

### Setting an Entry Point

**Visual Method:**

1. Open your pipeline in Flow mode
2. Click the three-dots menu (⋮) on the node card
3. Select **Make entrypoint**

![Context menu showing Make entrypoint option](../../img/how-tos/pipelines/nodes-connectors/make-entrypoint-menu.png)

**YAML Method:**

```yaml
entry_point: "Node Name"
```

### Entry Point Rules

!!! warning "Important Restrictions"
    - Only **one node** can be the entry point
    - **Router** and **Condition** nodes **cannot** be entry points (they require input from previous nodes)
    - All other node types can serve as entry points
    - Entry point must be set before running the pipeline

!!! tip "Changing Entry Points"
    You can change the entry point by making a different node the entry point. The previous entry point will automatically lose its entry point status.

**See Also:** [Entry Point Guide](entry-point.md) for detailed configuration and patterns.

---

## END Node (Pipeline Termination)

The **END** node is a special termination point that stops pipeline execution. It's not a physical node in the canvas but a target for connections.

### When to Use END

Use `END` as the connection target when:

* Pipeline has completed all work
* No further processing is needed
* You want to explicitly stop execution

### How to Connect to END

**Visual Method:**

1. Drag a connector from a node
2. Release it in the canvas
3. Select **END** from the dropdown menu

**YAML Method:**

```yaml
transition: END
```

!!! note "All Paths Must Lead to END"
    Every execution path in your pipeline must eventually reach `END`. Pipelines without a termination point may cause unexpected behavior or incomplete execution.

![Pipeline flow showing multiple paths converging to END](../../img/how-tos/pipelines/nodes-connectors/end-node-convergence.png)

---

## Node Input and Output Ports

All nodes have **input** and **output** ports for connectors:

| Port Type | Purpose | Visual Indicator |
|-----------|---------|------------------|
| **Input** | Receives data/control from previous nodes | Top of node card |
| **Output** | Sends data/control to next nodes | Bottom of node card |
| **Default Output** | Fallback path (Router, Condition, Decision only) | Labeled separately |

![Node card showing input and output ports](../../img/how-tos/pipelines/nodes-connectors/node-ports-diagram.png)

---

## Connection Rules by Node Type

### Standard Nodes (Single Output)

Most nodes can have **only ONE output connection**:

* LLM
* Agent
* Function
* Tool
* Code
* Loop
* Loop from Tool
* State Modifier
* Pipeline (Subgraph)
* Decision

**Example:**

```yaml
- id: Process Data
  type: function
  transition: Display Results  # Single output only
```

### Multi-Output Nodes

Three node types support **multiple output connections**:

#### 1. Router Node

Routes execution based on conditional logic. Can have:

* **Multiple conditional outputs**: One for each defined route
* **Default output**: Fallback when no conditions match

**YAML Example:**

```yaml
- id: Route Request
  type: router
  condition: "{{ request_type }}"
  routes:
    - when: "{{ request_type == 'urgent' }}"
      transition: Priority Handler
    - when: "{{ request_type == 'standard' }}"
      transition: Standard Handler
  default: Error Handler  # Default output
```

![Router node with multiple output connectors](../../img/how-tos/pipelines/nodes-connectors/router-multiple-outputs.png)

#### 2. Condition Node

Boolean evaluation with two outputs:

* **True output**: When condition evaluates to true
* **False output**: When condition evaluates to false

**YAML Example:**

```yaml
- id: Check Approval
  type: condition
  condition: "{{ status == 'approved' }}"
  transitions:
    true: Publish Story
    false: Request Changes
```

![Condition node with true/false output paths](../../img/how-tos/pipelines/nodes-connectors/condition-outputs.png)

#### 3. Decision Node

LLM-powered routing with multiple possible destinations:

**YAML Example:**

```yaml
- id: Classify Intent
  type: decision
  description: "Analyze user intent and route appropriately"
  decision:
    nodes:
      - Bug Report Handler
      - Feature Request Handler
      - Question Handler
```

![Decision node with multiple intelligent routing options](../../img/how-tos/pipelines/nodes-connectors/decision-outputs.png)

### Custom Node (Special Case)

**Custom nodes** can be configured with **multiple outputs** by defining custom logic in the JSON configuration. The number of outputs depends on your implementation.

---

## Multiple Inputs

**All nodes can accept multiple input connections**. This allows:

* Convergence of different execution paths
* Merging results from parallel branches
* Reusing nodes in different contexts

**Example:**

```yaml
- id: Generate Report
  type: function
  # Can receive input from multiple nodes
  transition: Email Results

# Both paths lead to same node:
- id: Process Type A
  transition: Generate Report

- id: Process Type B
  transition: Generate Report
```

![Multiple nodes connecting to single node](../../img/how-tos/pipelines/nodes-connectors/multiple-inputs.png)

---

## YAML Connection Syntax

### Basic Transition

Connect one node to another:

```yaml
transition: <node_id>
```

**Example:**

```yaml
- id: Fetch Data
  type: function
  transition: Process Data  # Next node ID
```

### Conditional Transitions (Router)

Multiple routes with default fallback:

```yaml
condition: "{{ variable }}"
routes:
  - when: "{{ condition_1 }}"
    transition: Node A
  - when: "{{ condition_2 }}"
    transition: Node B
default: Default Node  # Optional fallback
```

### Boolean Transitions (Condition)

True/false paths:

```yaml
condition: "{{ expression }}"
transitions:
  true: Success Node
  false: Failure Node
```

### Decision-Based Transitions

LLM chooses from options:

```yaml
decision:
  nodes:
    - Option 1 Node
    - Option 2 Node
    - Option 3 Node
```

### Terminate Pipeline

```yaml
transition: END
```

---

## Creating Connections Visually

ELITEA provides multiple ways to create connections in Flow mode:

### Method 1: Drag from Node

1. Click and drag the **output port** (bottom of node)
2. Drag the connector line across the canvas
3. Release on the **input port** (top of target node)

![Dragging connector from output to input port](../../img/how-tos/pipelines/nodes-connectors/drag-connector.png)

### Method 2: Drag-and-Drop with Dropdown

This feature provides a faster way to connect nodes:

1. **Drag the connector** from any node's output port
2. **Release it in the middle of the canvas** (not on a specific node)
3. A **dropdown menu appears** with two options:

   **Dropdown Structure:**
   * **Row 1**: "Create New Node" option
   * **Below**: Existing nodes listed alphabetically (first 7 visible, scroll for more)

4. **Choose an option:**

   **Option A: Connect to Existing Node**
   * Select a node from the list
   * Connector automatically links to the selected node's input
   * Nodes displayed with **name** and **icon** for easy identification

   **Option B: Create New Node**
   * Click "Create New Node"
   * Secondary list appears showing all available node types
   * Select a node type (LLM, Function, Router, etc.)
   * New node is created with connector **automatically attached**
   * Configure the newly created node

5. **Cancel**: Click anywhere else on canvas to dismiss dropdown

![Drag-and-drop dropdown menu showing existing and new node options](../../img/how-tos/pipelines/nodes-connectors/dropdown-connect.png)

!!! tip "Search in Dropdown"
    Use the search bar in the dropdown to quickly find nodes by name when you have many nodes in your pipeline.

### Method 3: Auto-Connect New Nodes

When creating a new node via the **+ Add Node** button:

1. Click **+ Add Node**
2. Select node type
3. New node appears
4. If a connector is active (from step 2 of Method 2), it auto-connects
5. Otherwise, manually connect using Method 1 or 2

---

## Interrupt Options

**Interrupt Before** and **Interrupt After** are advanced options that pause pipeline execution for human review or intervention.

### Interrupt Before

Pauses execution **before a node runs**. Useful for:

* Reviewing inputs before critical operations
* Confirming decisions before irreversible actions
* Manual data validation

**YAML Syntax:**

```yaml
interrupt_before:
  - Node Name
```

**Visual Method:**

1. Open node configuration
2. Expand **Advanced** section
3. Toggle **Interrupt Before** to ON

![Interrupt Before toggle in node configuration](../../img/how-tos/pipelines/nodes-connectors/interrupt-before.png)

### Interrupt After

Pauses execution **after a node completes**. Useful for:

* Reviewing outputs before proceeding
* Verifying results of LLM processing
* Allowing human feedback before next step

**YAML Syntax:**

```yaml
interrupt_after:
  - Node Name
```

**Visual Method:**

1. Open node configuration
2. Expand **Advanced** section
3. Toggle **Interrupt After** to ON

![Interrupt After toggle in node configuration](../../img/how-tos/pipelines/nodes-connectors/interrupt-after.png)

### Combined Interrupts Example

```yaml
interrupt_before:
  - Publish to Jira  # Pause before publishing

interrupt_after:
  - Generate User Story  # Pause after generation
  - Review Feedback  # Pause after review
```

### Resuming After Interrupt

When a pipeline pauses at an interrupt:

1. Pipeline execution **stops** at the interrupt point
2. User can **review** the state, outputs, or inputs
3. User **clicks Continue** or sends a message to resume
4. Pipeline **continues** from where it paused

!!! warning "Interrupt Limitations"
    - Interrupts only work in **interactive mode** (Chat interface)
    - Programmatic/API executions may ignore interrupts
    - Use interrupts sparingly to avoid breaking automated workflows

![Pipeline paused at interrupt with continue button](../../img/how-tos/pipelines/nodes-connectors/interrupt-resume.png)

---

## Connection Best Practices

### 1. Always Set an Entry Point

Before running your pipeline, ensure an entry point is configured.

✅ **Good:**

```yaml
entry_point: "Start Processing"
```

❌ **Bad:**

```yaml
# Missing entry_point - pipeline won't run
```

### 2. All Paths Must End

Every execution branch should lead to `END`.

✅ **Good:**

```yaml
- id: Process Complete
  type: function
  transition: END  # Clear termination
```

❌ **Bad:**

```yaml
- id: Process Complete
  type: function
  # Missing transition - hangs indefinitely
```

### 3. Avoid Circular Connections

Don't create loops that never reach `END`.

❌ **Bad:**

```yaml
- id: Node A
  transition: Node B

- id: Node B
  transition: Node A  # Infinite loop!
```

✅ **Good (Intentional Loop):**

```yaml
- id: Process Item
  type: loop
  tool: Item Processor
  transition: END  # Controlled loop with termination
```

### 4. Use Descriptive Node Names

Clear names make connections easier to understand.

✅ **Good:**

```yaml
- id: Validate User Input
  transition: Process Valid Data
```

❌ **Bad:**

```yaml
- id: Node1
  transition: Node2  # What do these do?
```

### 5. Default Outputs for Safety

Always provide a default path for Router and Decision nodes.

✅ **Good:**

```yaml
- id: Route Request
  type: router
  routes:
    - when: "{{ type == 'A' }}"
      transition: Handler A
  default: Error Handler  # Handles unexpected cases
```

❌ **Bad:**

```yaml
- id: Route Request
  type: router
  routes:
    - when: "{{ type == 'A' }}"
      transition: Handler A
  # No default - fails on unexpected input
```

### 6. Test Connections Incrementally

Build and test your pipeline step-by-step:

1. Create entry point node
2. Add one connected node
3. Test execution
4. Add more nodes gradually
5. Test after each addition

---

## Common Connection Patterns

### Linear Flow

Simplest pattern: straight line of execution.

```yaml
entry_point: "Step 1"
nodes:
  - id: Step 1
    type: function
    transition: Step 2

  - id: Step 2
    type: llm
    transition: Step 3

  - id: Step 3
    type: function
    transition: END
```

![Linear flow diagram](../../img/how-tos/pipelines/nodes-connectors/pattern-linear.png)

### Conditional Branching

Route based on conditions.

```yaml
entry_point: "Check Status"
nodes:
  - id: Check Status
    type: condition
    condition: "{{ approved }}"
    transitions:
      true: Publish
      false: Request Changes

  - id: Publish
    type: function
    transition: END

  - id: Request Changes
    type: llm
    transition: END
```

![Conditional branching diagram](../../img/how-tos/pipelines/nodes-connectors/pattern-conditional.png)

### Multi-Path Routing

Multiple branches based on complex logic.

```yaml
entry_point: "Classify Request"
nodes:
  - id: Classify Request
    type: router
    condition: "{{ request_type }}"
    routes:
      - when: "{{ request_type == 'bug' }}"
        transition: Bug Handler
      - when: "{{ request_type == 'feature' }}"
        transition: Feature Handler
      - when: "{{ request_type == 'question' }}"
        transition: Question Handler
    default: General Handler

  # Each handler leads to END
```

![Multi-path routing diagram](../../img/how-tos/pipelines/nodes-connectors/pattern-multipath.png)

### Converging Paths

Multiple branches merge into single node.

```yaml
entry_point: "Route Input"
nodes:
  - id: Route Input
    type: decision
    decision:
      nodes:
        - Process Type A
        - Process Type B

  - id: Process Type A
    type: function
    transition: Generate Report

  - id: Process Type B
    type: function
    transition: Generate Report

  - id: Generate Report  # Convergence point
    type: function
    transition: END
```

![Converging paths diagram](../../img/how-tos/pipelines/nodes-connectors/pattern-convergence.png)

---

## Troubleshooting Connections

### Pipeline Won't Start

**Symptom**: Pipeline doesn't execute when run.

**Causes**:

* No entry point set
* Entry point node doesn't exist
* Router/Condition set as entry point

**Solution**:

1. Check entry point in YAML: `entry_point: "Node Name"`
2. Verify node name matches exactly (case-sensitive)
3. Ensure entry point is not Router or Condition

### Connector Not Appearing

**Symptom**: Visual connector doesn't show between nodes.

**Causes**:

* Connection not saved
* Invalid node ID in transition
* YAML syntax error

**Solution**:

1. Refresh the page
2. Check YAML for typos in `transition:` value
3. Verify target node exists with correct ID

### Pipeline Hangs

**Symptom**: Pipeline runs but never completes.

**Causes**:

* Missing `END` transitions
* Circular connections
* Interrupt without resume

**Solution**:

1. Trace all paths to ensure they reach `END`
2. Check for accidental loops (Node A → Node B → Node A)
3. Review interrupt settings and ensure manual resume

### Multiple Outputs Not Working

**Symptom**: Only one output works from Router/Condition/Decision.

**Causes**:

* Incorrect node type (using Function instead of Router)
* YAML syntax error
* Missing default path

**Solution**:

1. Verify node type is Router, Condition, or Decision
2. Check routes/transitions syntax in YAML
3. Add default path for safety

---

## Related Resources

* **[Entry Point Guide](entry-point.md)**: Detailed entry point configuration
* **[States Guide](states.md)**: Managing data flow between nodes
* **[Control Flow Nodes](nodes/control-flow-nodes.md)**: Router, Condition, and Decision nodes
* **[Flow Editor Guide](flow-editor.md)**: Visual pipeline editing
* **[YAML Configuration](yaml.md)**: Complete YAML syntax reference

---

**Next Steps:**

* Learn about the [Flow Editor](flow-editor.md) for visual pipeline design
* Explore [YAML Configuration](yaml.md) for advanced connection patterns
* Review [Control Flow Nodes](nodes/control-flow-nodes.md) for routing strategies
