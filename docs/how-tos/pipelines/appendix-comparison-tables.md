# Appendix: Comparison Tables

Quick reference for selecting pipeline components.

!!! tip "Quick Navigation" 
      - [State Types](#state-types-comparison) 
      - [Nodes by Category](#nodes-by-category-comparison) 
      - [Control Flow](#control-flow-comparison) 
      - [Execution](#execution-nodes-comparison) 
      - [Iteration](#iteration-comparison) 
      - [Input Mapping](#input-mapping-types) 
      - [Decision Guide](#node-selection-decision-matrix)

---

## State Types Comparison

| Type | Purpose | Default | Example Use Cases |
|------|---------|---------|-------------------|
| **String** | Text data | `""` | Titles, descriptions, status messages, file paths |
| **Number** | Numeric values | `0` | Counters, IDs, scores, indices |
| **List** | Ordered collections | `[]` | Search results, file lists, batch items |
| **JSON** | Key-value pairs | `{}` | API responses, config objects, metadata |

**Quick Guide:** Text → String · Counter → Number · Multiple items → List · Structured → JSON

---

## Nodes by Category Comparison

| Node | Category | Purpose | LLM | External Tool | Key Feature |
|------|----------|---------|-----|---------------|-------------|
| **LLM** | Interaction | Generate/analyze text | ✔️ | ✘ | Structured output, tool calling |
| **Agent** | Interaction | Specialized agents | ✔️ | ✘ | Reusable configurations |
| **Function** | Execution | Direct toolkit call | ✘ | ✔️ | Explicit parameters |
| **Tool** | Execution | LLM-assisted tool | ✔️ | ✔️ | Natural language task |
| **Code** | Execution | Python logic | ✘ | ✘ | Full programming control |
| **Custom** | Execution | Advanced config | Varies | Varies | Maximum flexibility |
| **Router** | Control Flow | Template routing | ✘ | ✘ | Multiple paths |
| **Condition** | Control Flow | Boolean branching | ✘ | ✘ | Jinja2 logic |
| **Decision** | Control Flow | AI routing | ✔️ | ✘ | LLM decision making |
| **Loop** | Iteration | Task-based iteration | ✔️ | ✔️ | LLM prepares inputs |
| **Loop from Tool** | Iteration | Tool result iteration | ✔️ | ✔️ | Two-stage execution |
| **State Modifier** | Utility | Transform state | ✘ | ✘ | Jinja2 templates |
| **Pipeline** | Utility | Nested pipelines | Varies | Varies | Workflow composition |

---

## Control Flow Comparison

| Feature | Router | Condition | Decision |
|---------|--------|-----------|----------|
| **Method** | Template expressions | Jinja2 boolean | LLM reasoning |
| **Performance** | Fast | Fast | Slower (LLM call) |
| **Best For** | Multiple clear paths | Boolean logic | Contextual decisions |
| **Syntax** | `{% if %}`/`{% elif %}` | `{% if %}` returns ID | Natural language |
| **Outputs** | Routes + default | Conditional + default | Nodes + default |

**Selection:** Multiple paths → Router · Boolean → Condition · AI interpretation → Decision

**Examples:**

```yaml
# Router - Multiple paths
condition: |
  {% if 'approved' in input|lower %}PublishNode
  {% elif 'rejected' in input|lower %}RejectNode
  {% else %}ReviewNode{% endif %}

# Condition - Boolean
condition_definition: |
  {% if status == 'approved' and user_type == 'admin' %}AdminPath
  {% else %}RegularPath{% endif %}

# Decision - AI-powered
description: |
  Route based on user intent:
  - SaveNode if wants to save
  - EditNode if wants to edit
  - END if unclear
```

---

## Execution Nodes Comparison

| Feature | Function | Tool | Code | Custom |
|---------|----------|------|------|--------|
| **Tool Selection** | Manual | LLM decides | N/A | Manual |
| **Parameters** | Explicit mapping | LLM generates | Python code | JSON config |
| **Use LLM** | ✘ | ✔️ | ✘ | Depends |
| **Flexibility** | Low | High | Very High | Very High |
| **Performance** | Fast | Slower | Fast | Fast |
| **Best For** | Known tool/params | Flexible workflows | Custom logic | Advanced integrations |

**When to Use:**

| Scenario | Use |
|----------|-----|
| Create Jira ticket with known fields | Function |
| "Search Confluence and create summary" | Tool |
| Calculate discount with business rules | Code |
| Execute custom MCP or Agent | Custom |
| Call API with fixed endpoint | Function or Code |
| Multi-step research workflow | Tool |
| Data transformation/processing | Code |

---

## Iteration Comparison

| Feature | Loop | Loop from Tool |
|---------|------|----------------|
| **Input Source** | Task extracts from state | Tool execution generates list |
| **Stages** | 1. LLM prepares<br>2. Execute per input | 1. First tool (get list)<br>2. LLM prepares<br>3. Second tool per item |
| **Variables Mapping** | Not required | **Required** |
| **Use Case** | Known list in state | Dynamic list from tool |
| **Example** | Process files from history | Search results, process each |

!!! warning "Loop from Tool"
    `variables_mapping` is **critical**—maps first tool's output to second tool's input variables

**Selection:** List in state → Loop · List from tool → Loop from Tool

---

## Input Mapping Types

| Type | Purpose | Syntax | Example |
|------|---------|--------|---------|
| **Fixed** | Static value | `type: fixed, value: "text"` | `bucket_name: "production"` |
| **Variable** | State reference | `type: variable, value: var_name` | `query: user_question` |
| **F-String** | Dynamic template | `type: fstring, value: "text {var}"` | `title: "Report for {project}"` |

**Example:**

```yaml
input_mapping:
  project_type:         # Fixed - unchanging
    type: fixed
    value: "Story"
  project_id:           # Variable - from state
    type: variable
    value: jira_project_id
  title:                # F-String - combine vars
    type: fstring
    value: "[{project_key}] {summary}"
```

---

## Connection Types Comparison

| Type | Node Types | Config | Example |
|------|------------|--------|---------|
| **Transition** | All except Router/Condition/Decision | `transition: NodeID` | `transition: ProcessData` |
| **Router** | Router | `condition` + `routes` + `default_output` | Multiple named paths |
| **Condition** | Condition | `condition_definition` + `conditional_outputs` | True/False branching |
| **Decision** | Decision | `decision.nodes` + `default_output` | LLM-powered routing |
| **END** | Any node | `transition: END` | Pipeline termination |

**Examples:**

```yaml
# Simple
transition: NextNode

# Router
condition: "{% if status == 'done' %}Complete{% endif %}"
routes: [Complete, Retry]
default_output: Review

# Condition
condition:
  condition_definition: "{% if approved %}Publish{% else %}Review{% endif %}"
  conditional_outputs: [Publish]
  default_output: Review

# Decision
decision:
  nodes: [Save, Edit, Reject]
  default_output: END
```

---

## Interaction Nodes Comparison

| Feature | LLM Node | Agent Node |
|---------|----------|------------|
| **Configuration** | Full prompt control | Use agent's config |
| **Prompts** | Define in node | Agent's prompts |
| **Toolkits** | Select in node | Agent's toolkits |
| **Reusability** | Node-specific | Reuse across pipelines |
| **Flexibility** | Very High | Limited to agent design |
| **Setup** | More effort | Less effort |

**Selection:** Custom task → LLM · Existing agent → Agent · Reusability needed → Agent

---

## Node Selection Decision Matrix

### By Use Case

| Goal | Recommended | Alternative |
|------|-------------|-------------|
| Generate text/content | LLM, Agent | - |
| Call external API | Function, Code | Tool |
| Make decision | Condition, Router | Decision |
| Process list | Loop, Loop from Tool | Code |
| Transform state | State Modifier | Code |
| Nest workflows | Pipeline | - |
| Complex routing | Decision | Router |

### By Complexity

* **Beginner:** LLM (simple), Function (clear params), Router (basic), State Modifier (simple)
* **Intermediate:** Agent, Tool, Condition, Loop
* **Advanced:** Code, Custom, Decision, Loop from Tool

### Quick Selection

| Need | Use |
|------|-----|
| Call GPT-4 | LLM |
| Create Jira ticket | Function |
| Decide next step | Condition/Router |
| Process 100 files | Loop/Loop from Tool |
| Format output | State Modifier |
| Combine pipelines | Pipeline |
| Custom calculation | Code |
| Unknown tool | Tool |
| Execute agent | Agent |

---

## Best Practices

### State Management

✔️ **Do:** Descriptive names (`user_story_title`), initialize defaults, correct types, minimal state

✘ **Avoid:** Generic names (`data`, `temp`), unused variables, type mismatches

### Node Configuration

✔️ **Do:** Clear IDs (`extract_requirements`), map required params, include `messages` for interrupts

✘ **Avoid:** Vague IDs (`node1`), missing parameters, ignoring validation

### Flow Control

✔️ **Do:** Router for multiple paths, Condition for boolean, Decision for AI, provide defaults

✘ **Avoid:** Complex nesting, missing fallbacks, unreachable nodes

### Execution

✔️ **Do:** Function for known tools, Tool for flexibility, Code for custom logic, handle errors

✘ **Avoid:** Overusing Tool (LLM overhead), hardcoded secrets, ignoring errors

---

## Common Patterns

**Extract → Process → Act**
```yaml
- id: GatherInfo      # LLM extracts
- id: ProcessData     # Code/Function processes
- id: TakeAction      # Function executes
```
*Use for: User stories, tickets, documents*

**Conditional Workflow**
```yaml
- id: CheckStatus     # Router/Condition
- id: PathA           # Approved
- id: PathB           # Rejected
```
*Use for: Approvals, status routing*

**Batch Processing**
```yaml
- id: GetList         # Function fetches
- id: ProcessEach     # Loop processes
- id: Summarize       # LLM summarizes
```
*Use for: Bulk operations, reporting*

**Human-in-Loop**
```yaml
- id: GenerateDraft   # LLM creates
- id: ReviewPoint     # interrupt_after
- id: ApprovalCheck   # Condition checks
- id: Publish         # Function publishes
```
*Use for: Content approval, reviews*

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| State variable not found | Not in state section | Add to `state:` |
| Node won't execute | Missing parameters | Check Input Mapping |
| Wrong path taken | Condition logic error | Review condition syntax |
| Loop doesn't iterate | Unclear task/wrong input | Clarify task instructions |
| Tool call fails | Wrong mapping | Verify mapping types |
| No interrupt output | Missing `messages` | Add to output list |

---

## Related Documentation

* [Pipelines Overview](overview.md) · [States](states.md) · [Nodes Overview](nodes/overview.md)
* [Interaction Nodes](nodes/interaction-nodes.md) · [Execution Nodes](nodes/execution-nodes.md)
* [Control Flow Nodes](nodes/control-flow-nodes.md) · [Iteration Nodes](nodes/iteration-nodes.md) · [Utility Nodes](nodes/utility-nodes.md)
* [Entry Point](entry-point.md) · [Nodes Connectors](nodes-connectors.md) · [Flow Editor](flow-editor.md) · [YAML Configuration](yaml.md)
