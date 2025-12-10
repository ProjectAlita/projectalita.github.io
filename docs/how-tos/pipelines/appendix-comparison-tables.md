# Appendix: Comparison Tables

Quick reference for selecting pipeline components.

!!! tip "Quick Navigation" 
      - [State Types](#state-types-comparison) 
      - [Nodes by Category](#nodes-by-category-comparison) 
      - [Control Flow](#control-flow-comparison) 
      - [Execution](#execution-nodes-comparison) 
      - [Input Mapping](#input-mapping-types) 
      - [Utility Nodes](#utility-nodes-comparison) 
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
| **Toolkit** | Execution | Direct ELITEA toolkit call | ✘ | ✔️ | Explicit parameters, fast |
| **MCP** | Execution | Model Context Protocol tools | ✘ | ✔️ | Remote MCP servers |
| **Code** | Execution | Python logic | ✘ | ✘ | Full programming control |
| **Custom** | Execution | Advanced config | Varies | Varies | Maximum flexibility |
| **Router** | Control Flow | Template routing | ✘ | ✘ | Multiple paths |
| **Decision** | Control Flow | AI routing | ✔️ | ✘ | LLM decision making |
| **State Modifier** | Utility | Transform state | ✘ | ✘ | Jinja2 templates |
| **Printer** | Utility | Display output to users | ✘ | ✘ | Pause & show messages |

---

## Control Flow Comparison

| Feature | Router | Decision |
|---------|--------|----------|
| **Method** | Template expressions | LLM reasoning |
| **Performance** | Fast | Slower (LLM call) |
| **Best For** | Multiple clear paths, boolean logic | Contextual decisions |
| **Syntax** | `{% if %}`/`{% elif %}` | Natural language |
| **Outputs** | Routes + default | Nodes + default |

**Selection:** Multiple paths or boolean logic → Router · AI interpretation → Decision

**Examples:**

```yaml
# Router - Multiple paths
condition: |
  {% if 'approved' in input|lower %}PublishNode
  {% elif 'rejected' in input|lower %}RejectNode
  {% else %}ReviewNode{% endif %}

# Router - Boolean logic
condition: |
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

| Feature | Toolkit | MCP | Code | Custom |
|---------|---------|-----|------|--------|
| **Tool Selection** | Manual | Manual | N/A | Manual |
| **Parameters** | Explicit mapping | Explicit mapping | Python code | JSON config |
| **Use LLM** | ✘ | ✘ | ✘ | Depends |
| **Flexibility** | Medium | Medium | Very High | Very High |
| **Performance** | Fast | Fast | Fast | Fast |
| **Best For** | ELITEA toolkit calls | MCP server tools | Custom logic | Advanced integrations |

**When to Use:**

| Scenario | Use |
|----------|-----|
| Create Jira ticket with known fields | Toolkit |
| Connect to GitHub MCP server | MCP |
| Calculate discount with business rules | Code |
| Execute custom MCP or Agent | Custom |
| Call API with fixed endpoint | Toolkit or Code |
| Access filesystem via MCP | MCP |
| Data transformation/processing | Code |

---

## Utility Nodes Comparison

| Feature | State Modifier | Printer |
|---------|----------------|----------|
| **Purpose** | Transform state variables | Display output to users |
| **Input** | State variables | State variables or text |
| **Output** | Modified state | User interface message |
| **Template Engine** | Jinja2 | Fixed/Variable/F-String |
| **Pipeline Pause** | No | Yes (waits for user) |
| **Use Case** | Combine/format data | Show progress/results |
| **Example** | Aggregate responses, increment counter | Display report, show status |

**State Modifier Features:**
- Combine multiple state variables with templates
- Apply filters: `from_json`, `base64_to_string`, `split_by_words`
- Clean up temporary variables
- Format structured output

**Printer Features:**
- Display formatted messages during execution
- Pause pipeline for user review
- Support Fixed, Variable, and F-String types
- Resume after user acknowledgment

**Selection:** Transform/format data → State Modifier · Show output to user → Printer

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
| **Transition** | All except Router/Decision | `transition: NodeID` | `transition: ProcessData` |
| **Router** | Router | `condition` + `routes` + `default_output` | Multiple named paths |
| **Decision** | Decision | `decision.nodes` + `default_output` | LLM-powered routing |
| **END** | Any node | `transition: END` | Pipeline termination |

**Examples:**

```yaml
# Simple
transition: NextNode

# Router - Multiple paths
condition: "{% if status == 'done' %}Complete{% endif %}"
routes: [Complete, Retry]
default_output: Review

# Router - Boolean
condition: |
  {% if approved %}Publish
  {% else %}Review
  {% endif %}
routes: [Publish, Review]
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
| Call ELITEA toolkit | Toolkit | Code |
| Execute MCP server tool | MCP | Code |
| Make decision | Router | Decision |
| Transform state | State Modifier | Code |
| Display output to user | Printer | - |
| Complex routing | Decision | Router |
| Custom logic | Code | - |

### By Complexity

* **Beginner:** LLM (simple), Toolkit (clear params), Router (basic), State Modifier (simple), Printer
* **Intermediate:** Agent, MCP, Decision
* **Advanced:** Code, Custom

### Quick Selection

| Need | Use |
|------|-----|
| Call GPT-4 | LLM |
| Create Jira ticket | Toolkit |
| Decide next step | Router |
| Format output | State Modifier |
| Show progress message | Printer |
| Custom calculation | Code |
| Execute MCP tool | MCP |
| Execute agent | Agent |
| Advanced integration | Custom |

---

## Best Practices

### State Management

✔️ **Do:** Descriptive names (`user_story_title`), initialize defaults, correct types, minimal state

✘ **Avoid:** Generic names (`data`, `temp`), unused variables, type mismatches

### Node Configuration

✔️ **Do:** Clear IDs (`extract_requirements`), map required params, include `messages` for interrupts

✘ **Avoid:** Vague IDs (`node1`), missing parameters, ignoring validation

### Flow Control

✔️ **Do:** Router for multiple paths and boolean logic, Decision for AI reasoning, provide defaults

✘ **Avoid:** Complex nesting, missing fallbacks, unreachable nodes

### Execution

✔️ **Do:** Toolkit for ELITEA tools, MCP for MCP servers, Code for custom logic, handle errors

✘ **Avoid:** Hardcoded secrets, ignoring errors, wrong node for task

---

## Common Patterns

**Extract → Process → Act**
```yaml
- id: GatherInfo      # LLM extracts
- id: ProcessData     # Code processes
- id: TakeAction      # Toolkit executes
```
*Use for: User stories, tickets, documents*

**Conditional Workflow**
```yaml
- id: CheckStatus     # Router
- id: PathA           # Approved
- id: PathB           # Rejected
```
*Use for: Approvals, status routing*

**Data Integration**
```yaml
- id: FetchData       # Toolkit or MCP
- id: Transform       # Code node
- id: Display         # Printer shows result
```
*Use for: API integration, data processing*

**Human-in-Loop**
```yaml
- id: GenerateDraft   # LLM creates
- id: ShowDraft       # Printer displays
- id: ApprovalCheck   # Router checks
- id: Publish         # Toolkit publishes
```
*Use for: Content approval, reviews*

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| State variable not found | Not in state section | Add to `state:` |
| Node won't execute | Missing parameters | Check Input Mapping |
| Wrong path taken | Router logic error | Review condition syntax |
| Toolkit call fails | Wrong mapping | Verify mapping types |
| MCP connection fails | Server not configured | Check MCP server settings |
| Printer not showing | Wrong input type | Verify printer input_mapping |
| No interrupt output | Missing `messages` | Add to output list |

---

## Related Documentation

* [Pipelines Overview](overview.md) · [States](states.md) · [Nodes Overview](nodes/overview.md)
* [Interaction Nodes](nodes/interaction-nodes.md) · [Execution Nodes](nodes/execution-nodes.md)
* [Control Flow Nodes](nodes/control-flow-nodes.md) · [Utility Nodes](nodes/utility-nodes.md)
* [Entry Point](entry-point.md) · [Nodes Connectors](nodes-connectors.md) · [Flow Editor](flow-editor.md) · [YAML Configuration](yaml.md)
