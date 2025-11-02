# Appendix: Comparison Tables

Quick reference tables for choosing the right pipeline components. Use these tables to make informed decisions when building workflows.

!!! tip "Quick Navigation"
    Jump to: 
        - [State Types](#state-types) 
        - [Nodes by Category](#nodes-by-category) 
        - [Control Flow](#control-flow-comparison) 
        - [Execution](#execution-nodes-comparison) 
        - [Iteration](#iteration-comparison) 
        - [Input Mapping](#input-mapping-types) 
        - [Decision Guide](#when-to-use-what)

---

## State Types Comparison

Compare state variable types to choose the right one for your data.

| Type | Icon | Purpose | Default Value | Example Use Cases |
|------|------|---------|---------------|-------------------|
| **String** (`str`) | 📝 | Store text data | `""` (empty) | User story titles, descriptions, status messages, file paths |
| **Number** (`int`/`float`) | 🔢 | Store numeric values | `0` | Counters, IDs, scores, iteration indices, calculations |
| **List** (`list`) | 📋 | Store ordered collections | `[]` (empty) | Search results, file listings, batch items, conversation history |
| **Dictionary** (`dict`/`JSON`) | 🗂️ | Store key-value pairs | `{}` (empty) | API responses, configuration objects, metadata, structured data |

**Quick Selection Guide**:

```
Need to store...
│
├─ Single text value? → String
├─ Number or counter? → Number
├─ Multiple items? → List
└─ Structured data? → Dictionary
```

---

## Nodes by Category Comparison

### All 13 Node Types at a Glance

| Node Type | Category | Primary Purpose | LLM Required | External Tool | Key Feature |
|-----------|----------|-----------------|--------------|---------------|-------------|
| **LLM** | Interaction | Generate text, analyze content | ✅ Yes | ❌ No | Structured output, tool calling |
| **Agent** | Interaction | Delegate to specialized agents | ✅ Yes | ❌ No | Reusable agent configurations |
| **Function** | Execution | Direct toolkit execution | ❌ No | ✅ Yes | Explicit parameter mapping |
| **Tool** | Execution | LLM-assisted tool selection | ✅ Yes | ✅ Yes | Natural language task |
| **Code** | Execution | Custom Python logic | ❌ No | ❌ No | Full programming control |
| **Custom** | Execution | Advanced JSON config | Varies | Varies | Maximum flexibility |
| **Router** | Control Flow | Template-based routing | ❌ No | ❌ No | Multiple named paths |
| **Condition** | Control Flow | Conditional branching | ❌ No | ❌ No | Jinja2 logic |
| **Decision** | Control Flow | AI-powered routing | ✅ Yes | ❌ No | LLM decision making |
| **Loop** | Iteration | Iterate with task prep | ✅ Yes | ✅ Yes | LLM-prepared iterations |
| **Loop from Tool** | Iteration | Iterate over tool results | ✅ Yes | ✅ Yes | Two-stage execution |
| **State Modifier** | Utility | Transform state | ❌ No | ❌ No | Jinja2 templates |
| **Pipeline** | Utility | Nested pipeline execution | Varies | Varies | Workflow composition |

---

## Control Flow Comparison

Choose the right node for branching and routing.

### Router vs Condition vs Decision

| Feature | Router | Condition | Decision |
|---------|--------|-----------|----------|
| **Evaluation Method** | Template expressions | Jinja2 templates | LLM reasoning |
| **Configuration** | Condition + Routes + Default | Condition definition + Outputs | Description + Nodes |
| **Complexity** | Low-Medium | Medium | Low (natural language) |
| **Performance** | Fast | Fast | Slower (LLM call) |
| **Best For** | Multiple clear paths | Boolean logic | Contextual decisions |
| **Syntax** | `{% if %}`/`{% elif %}` | `{% if %}` returns node ID | Natural language |
| **Outputs** | Named routes list | Conditional outputs + default | Nodes list + default |
| **Use LLM** | ❌ No | ❌ No | ✅ Yes |
| **Example Use** | "Route by status: approved/rejected/pending" | "If approved AND ready → Publish" | "Analyze user intent and route" |

**Decision Tree for Control Flow**:

```
Need to make a decision?
│
├─ Clear rules with multiple paths? → Router
├─ Boolean condition (true/false)? → Condition
└─ Need AI interpretation? → Decision
```

### Control Flow Examples

**Router** (Multiple paths):
```yaml
condition: |
  {% if 'approved' in input|lower %}
    PublishNode
  {% elif 'rejected' in input|lower %}
    RejectNode
  {% else %}
    ReviewNode
  {% endif %}
```

**Condition** (Boolean branching):
```yaml
condition_definition: |
  {% if status == 'approved' and user_type == 'admin' %}
    AdminPath
  {% else %}
    RegularPath
  {% endif %}
```

**Decision** (AI-powered):
```yaml
description: |
  Analyze user request and route:
  - "SaveNode" if user wants to save
  - "EditNode" if user wants to edit
  - "END" if unclear
```

---

## Execution Nodes Comparison

Choose the right node for actions and integrations.

### Function vs Tool vs Code vs Custom

| Feature | Function | Tool | Code | Custom |
|---------|----------|------|------|--------|
| **Tool Selection** | Manual | LLM decides | N/A | Manual |
| **Parameters** | Explicit mapping | LLM generates | Python code | JSON config |
| **Use LLM** | ❌ No | ✅ Yes | ❌ No | Depends |
| **Configuration** | UI dropdowns | Task + toolkits | Code editor | JSON |
| **Flexibility** | Low | High | Very High | Very High |
| **Complexity** | Medium | Low | High | High |
| **Performance** | Fast | Slower | Fast | Fast |
| **Toolkit Types** | Toolkits, MCPs | Toolkits, MCPs | N/A | All (Toolkits, MCPs, Agents, Pipelines) |
| **Best For** | Known tool, clear params | Flexible workflows | Custom logic | Advanced integrations |

**When to Use Each**:

| Scenario | Recommended Node |
|----------|------------------|
| Create Jira ticket with known fields | **Function** |
| "Search Confluence and create summary" | **Tool** |
| Calculate discount based on business rules | **Code** |
| Execute custom MCP or Agent | **Custom** |
| Call API with fixed endpoint | **Function** or **Code** |
| Multi-step research workflow | **Tool** |
| Data transformation/processing | **Code** |
| Prototype new integration | **Custom** |

---

## Iteration Comparison

### Loop vs Loop from Tool

| Feature | Loop | Loop from Tool |
|---------|------|----------------|
| **Input Source** | Task instructions extract from state | Tool execution generates list |
| **Configuration** | Task + Toolkit/Tool | Toolkit + Tool + Variables Mapping |
| **Execution Stages** | 1. LLM prepares inputs<br>2. Execute tool per input | 1. Execute first tool (get list)<br>2. LLM prepares iteration inputs<br>3. Execute second tool per item |
| **Complexity** | Medium | High |
| **Variables Mapping** | Not required | **Required** (critical!) |
| **Use Case** | Known list in state | Dynamic list from tool |
| **Example** | Process files from chat history | Search Confluence, process each result |

**Variables Mapping Importance**:

!!! warning "Loop from Tool: Variables Mapping Required"
    The `variables_mapping` field is **critical** for Loop from Tool nodes. It maps the first tool's output fields to variable names for the second tool.
    
    Without correct mapping, the loop cannot access individual items from the first tool's results.

**Decision Guide**:

```
Need iteration?
│
├─ List already in state? → Loop
│  Example: file_list = ["file1.py", "file2.py"]
│
└─ List from tool execution? → Loop from Tool
   Example: search_index returns [{...}, {...}]
```

---

## Input Mapping Types

Compare input mapping types used in Function, Agent, and Custom nodes.

| Type | Purpose | Syntax | Example |
|------|---------|--------|---------|
| **Fixed** | Static value | `type: fixed`<br>`value: "static"` | `bucket_name: "production"` |
| **Variable** | State reference | `type: variable`<parameter name="value: state_var` | `query: user_question` |
| **F-String** | Dynamic interpolation | `type: fstring`<br>`value: "text {var}"` | `title: "Report for {project}"` |

**Usage Examples**:

```yaml
# Fixed - unchanging value
project_type:
  type: fixed
  value: "Story"

# Variable - from state
project_id:
  type: variable
  value: jira_project_id

# F-String - combine state vars
title:
  type: fstring
  value: "[{project_key}] {issue_type}: {summary}"
```

---

## Connection Types Comparison

Compare how nodes connect to each other.

| Connection Type | Node Types | Configuration | Example |
|-----------------|------------|---------------|---------|
| **Simple Transition** | All except Router/Condition/Decision | `transition: NodeID` | `transition: ProcessData` |
| **Router Routing** | Router | `condition` + `routes` + `default_output` | Routes to multiple named paths |
| **Condition Branching** | Condition | `condition_definition` + `conditional_outputs` | True/False branching |
| **Decision Routing** | Decision | `decision.nodes` + `default_output` | LLM-powered routing |
| **END Termination** | Any node | `transition: END` | Pipeline stops |

**Connection Patterns**:

```yaml
# Simple transition
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

# END termination
transition: END
```

---

## Interaction Nodes Comparison

### LLM vs Agent

| Feature | LLM Node | Agent Node |
|---------|----------|------------|
| **Configuration** | Full prompt control | Use agent's config |
| **Prompt Source** | Define in node | Agent's prompts |
| **Toolkits** | Select in node | Agent's toolkits |
| **Reusability** | Node-specific | Reuse across pipelines |
| **Flexibility** | Very High | Limited to agent design |
| **Setup Effort** | More (configure everything) | Less (use existing) |
| **Use Case** | Custom tasks | Specialized tasks |
| **Input Mapping** | Not applicable | Task + Chat History + custom vars |

**When to Use**:

- **LLM Node**: One-off tasks, custom prompts, full control needed
- **Agent Node**: Existing agent fits task, consistent behavior, reusability important

---

## Node Selection Decision Matrix

### By Use Case

| Goal | Recommended Nodes | Alternative |
|------|-------------------|-------------|
| Generate text/content | LLM, Agent | - |
| Call external API | Function, Code | Tool |
| Make decision | Condition, Router | Decision |
| Process list | Loop, Loop from Tool | Code |
| Transform state | State Modifier | Code |
| Nest workflows | Pipeline | - |
| Complex routing | Decision | Router |
| Simple branching | Router, Condition | - |

### By Complexity Level

**Beginner-Friendly**:

* LLM (simple prompts)
* Function (clear parameters)
* Router (basic conditions)
* State Modifier (simple templates)

**Intermediate**:

* Agent (input mapping)
* Tool (task instructions)
* Condition (Jinja2 logic)
* Loop (iteration logic)

**Advanced**:

* Code (Python programming)
* Custom (JSON configuration)
* Decision (LLM routing strategy)
* Loop from Tool (variables mapping)

---

## Quick Decision Guides

### "I need to..."

| Need | Use This Node |
|------|---------------|
| Call GPT-4 | LLM |
| Create Jira ticket | Function |
| Decide next step | Condition/Router |
| Process 100 files | Loop/Loop from Tool |
| Format output | State Modifier |
| Combine pipelines | Pipeline |
| Custom calculation | Code |
| Unknown tool needed | Tool |
| Execute agent | Agent |

### "My workflow needs..."

| Requirement | Solution |
|-------------|----------|
| AI generation | LLM, Agent, Tool |
| External service | Function, Tool, Code |
| Branching logic | Router, Condition, Decision |
| Repetition | Loop, Loop from Tool |
| State changes | State Modifier, Code |
| Nested workflow | Pipeline |
| Custom code | Code, Custom |

---

## Best Practices Summary

### State Management

✅ **Do**:

* Use descriptive names (`user_story_title` not `title`)
* Initialize with appropriate defaults
* Choose correct type for data
* Keep state minimal

❌ **Avoid**:

* Generic names (`data`, `temp`, `x`)
* Unused state variables
* Type mismatches

### Node Configuration

✅ **Do**:

* Use clear node IDs (`extract_requirements` not `node1`)
* Map all required parameters
* Include `messages` in output for interrupts
* Test with interrupts during development

❌ **Avoid**:

* Vague node IDs
* Missing required parameters
* Ignoring validation errors

### Flow Control

✅ **Do**:

* Use Router for multiple clear paths
* Use Condition for boolean logic
* Use Decision for AI interpretation
* Provide default outputs

❌ **Avoid**:

* Complex nested conditions
* Missing default fallbacks
* Unreachable nodes

### Execution

✅ **Do**:

* Use Function for known tools
* Use Tool for flexible workflows
* Use Code for custom logic
* Handle errors gracefully

❌ **Avoid**:

* Overusing Tool node (LLM overhead)
* Hardcoding sensitive data
* Ignoring error scenarios

---

## Common Patterns

### Pattern 1: Extract → Process → Act

```yaml
nodes:
  - id: GatherInfo      # LLM extracts data
  - id: ProcessData     # Code/Function processes
  - id: TakeAction      # Function executes
```

**Use For**: User story creation, ticket workflows, document generation

### Pattern 2: Conditional Workflow

```yaml
nodes:
  - id: CheckStatus     # Router/Condition checks
  - id: PathA           # Approved path
  - id: PathB           # Rejected path
```

**Use For**: Approval workflows, status-based routing

### Pattern 3: Batch Processing

```yaml
nodes:
  - id: GetList         # Function fetches items
  - id: ProcessEach     # Loop processes each
  - id: Summarize       # LLM summarizes results
```

**Use For**: Bulk operations, reporting, aggregation

### Pattern 4: Human-in-Loop

```yaml
nodes:
  - id: GenerateDraft   # LLM creates draft
  - id: ReviewPoint     # (interrupt_after: true)
  - id: ApprovalCheck   # Condition checks approval
  - id: Publish         # Function publishes
```

**Use For**: Content approval, review workflows

---

## Troubleshooting Guide

### Common Issues & Solutions

| Issue | Likely Cause | Solution |
|-------|--------------|----------|
| State variable not found | Not defined in state section | Add to `state:` section |
| Node won't execute | Missing required parameters | Check Input Mapping |
| Wrong path taken | Condition logic error | Review condition syntax |
| Loop doesn't iterate | Task unclear or wrong input | Clarify Task instructions |
| Tool call fails | Wrong parameter mapping | Verify Input Mapping types |
| Interrupt shows no output | Missing `messages` in output | Add `messages` to output list |

---

## Related Guides

**Foundation**:

* [Pipelines Overview](overview.md) - Start here to understand pipelines
* [States](states.md) - Deep dive into state management
* [Nodes Overview](nodes/overview.md) - Detailed node type explanations

**Node Categories**:

* [Interaction Nodes](nodes/interaction-nodes.md) - LLM and Agent details
* [Execution Nodes](nodes/execution-nodes.md) - Function, Tool, Code, Custom
* [Control Flow Nodes](nodes/control-flow-nodes.md) - Router, Condition, Decision
* [Iteration Nodes](nodes/iteration-nodes.md) - Loop and Loop from Tool
* [Utility Nodes](nodes/utility-nodes.md) - State Modifier and Pipeline

**Configuration**:

* [Entry Point](entry-point.md) - Define starting point
* [Nodes Connectors](nodes-connectors.md) - Connect nodes together
* [Flow Editor](flow-editor.md) - Visual pipeline building
* [YAML Configuration](yaml.md) - Code-based editing
