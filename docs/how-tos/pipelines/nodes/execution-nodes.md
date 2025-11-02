# Execution Nodes

Execution Nodes enable your pipeline to perform actions, call external tools, execute code, and integrate with APIs. These nodes form the "action" layer of your workflow, transforming data, triggering external systems, and performing computational tasks.

**Available Execution Nodes:**

- **[Function Node](#function-node)** - Execute specific toolkit/MCP functions with direct parameter mapping
- **[Tool Node](#tool-node)** - LLM-assisted tool selection and execution based on task instructions
- **[Code Node](#code-node)** - Execute custom Python code in a secure sandbox
- **[Custom Node](#custom-node)** - Advanced JSON-based configuration for any toolkit type

---

## Function Node

The Function Node executes specific tools from Toolkits or MCPs (Model Context Protocol servers) with direct parameter mapping. Unlike the Tool Node, which uses LLM intelligence to decide which tool to call, the Function Node directly invokes a pre-selected tool with explicitly mapped inputs.

![Function Node Interface](../../../../img/how-tos/pipelines/nodes/execution/function-node-interface.png)

### Purpose

Use the Function Node to:

- **Execute specific tools** without LLM decision-making overhead
- **Call external APIs** through toolkit integrations (Jira, Confluence, GitHub, etc.)
- **Perform deterministic actions** where the tool and parameters are known upfront
- **Map pipeline state** directly to tool parameters
- **Chain multiple tool calls** in sequence with precise control

!!! note "Function Node Scope"
    Function Nodes can use **Toolkits** and **MCPs** only. Prompts and datasources are fully deprecated. Agents and Pipelines now have their dedicated node types.

### Configuration

#### Basic Configuration

```yaml
- id: "create_jira_ticket"
  type: "function"
  toolkit: "jira_toolkit"
  tool: "create_issue"
  input: ["project_id", "issue_summary", "issue_description"]
  output: ["ticket_id", "messages"]
```

![Function Node Basic Configuration](../../../../img/how-tos/pipelines/nodes/execution/function-node-basic-config.png)

### Parameters

#### Toolkit

**Purpose**: Select which Toolkit or MCP contains the tool you want to execute.

**Options**:
- **Toolkits** - External service integrations (Jira, GitHub, Confluence, Slack, etc.)
- **MCPs** (Model Context Protocol servers) - Custom integrations

**Selection Process**:

1. **Select Toolkit/MCP**: Choose from the dropdown (can select multiple)
2. **Tool Dropdown Appears**: For each selected toolkit, a corresponding "Tool" dropdown appears
3. **Select Specific Tool**: Choose the exact tool to execute from that toolkit

![Function Node Toolkit Selection](../../../../img/how-tos/pipelines/nodes/execution/function-node-toolkit-selection.png)

**Example**:
```yaml
Toolkit: jira_toolkit
Tool: create_issue
```

**Multiple Toolkits**:

You can select multiple toolkits, and each will get its own tool dropdown. However, only **one tool** from one toolkit is executed per Function Node.

#### Tool

**Purpose**: Select the specific tool/function to execute from the chosen toolkit.

**Options**: Dropdown populated with all available tools from the selected toolkit.

**Example Tools**:
- `jira_toolkit`: `create_issue`, `update_issue`, `search_issues`, `add_comment`
- `confluence_toolkit`: `create_page`, `update_page`, `search_by_title`, `index_data`
- `github_toolkit`: `create_issue`, `create_pull_request`, `add_comment`

![Function Node Tool Selection](../../../../img/how-tos/pipelines/nodes/execution/function-node-tool-selection.png)

#### Input

**Purpose**: Specify which state variables the Function node reads from.

**Options**:
- Default states: `input`, `messages`
- Custom states: Any state variables you've defined

**Example**:
```yaml
Input:
  - project_id
  - issue_title
  - issue_description
  - messages
```

#### Output

**Purpose**: Define which state variables the tool's result should populate.

**Options**:
- `messages` - Store result in conversation history
- Custom states: Specific variables to extract from tool result

**Example**:
```yaml
Output:
  - ticket_id
  - ticket_url
  - messages
```

### Input Mapping

**Purpose**: Map pipeline state variables to the tool's required parameters.

**When It Appears**: The Input Mapping section appears **after you select a tool** from the dropdown.

**Mapping Structure**:

The Input Mapping section dynamically displays **only the parameters required by the selected tool**. Each parameter can have the following configuration:

- **Parameter Name**: Displayed in uppercase (e.g., `FILEDATA`, `FILENAME`, `BUCKET_NAME`)
- **Type Dropdown**: Choose how to provide the value
  - **F-String** - Formatted string with variable interpolation
  - **Variable** - Direct reference to a state variable
  - **Fixed** - Static value
- **Value Field**: Enter the value based on the selected type

![Function Node Input Mapping](../../../../img/how-tos/pipelines/nodes/execution/function-node-input-mapping.png)

**Input Mapping Categories**:

Input Mapping parameters are organized into:

1. **INPUT MAPPING (REQUIRED {n})** - Required parameters (must provide values)
2. **INPUT MAPPING (OPTIONAL {n})** - Optional parameters (can be left empty or set to `null`)

**Example Configuration**:

For a tool `createFile` with parameters `filedata`, `filename`, and optional `bucket_name`:

```yaml
INPUT MAPPING (REQUIRED 2):
  FILEDATA:
    Type: Variable
    Value: file_content  # From pipeline state
  
  FILENAME:
    Type: F-String
    Value: "report_{project_id}.txt"  # Interpolates project_id

INPUT MAPPING (OPTIONAL 1):
  BUCKET_NAME:
    Type: Fixed
    Value: null  # Or specific bucket name
```

**Type Examples**:

**F-String** (Dynamic interpolation):
```yaml
FILENAME:
  Type: F-String
  Value: "user_story_{ticket_id}_v{version}.md"
```

**Variable** (Direct state reference):
```yaml
FILEDATA:
  Type: Variable
  Value: generated_content
```

**Fixed** (Static value):
```yaml
BUCKET_NAME:
  Type: Fixed
  Value: "production-reports"
```

#### Interrupt Before/After

**Purpose**: Pause pipeline execution before or after this node for inspection or user intervention.

**Use Cases**:
- Review tool parameters before execution
- Inspect tool results before proceeding
- Debug tool integration issues
- Verify state before calling external APIs

**Configuration**:
```yaml
Interrupt before: [enabled/disabled]
Interrupt after: [enabled/disabled]
```

### Examples

#### Example 1: Create Jira Issue

Execute a Jira toolkit function to create an issue:

```yaml
- id: "create_ticket"
  type: "function"
  toolkit: "jira_toolkit"
  tool: "create_issue"
  input: ["project_key", "summary", "description", "issue_type"]
  output: ["jira_issue_id", "jira_issue_url", "messages"]
  input_mapping:
    project:
      type: "variable"
      value: "project_key"
    summary:
      type: "variable"
      value: "summary"
    description:
      type: "variable"
      value: "description"
    issuetype:
      type: "fixed"
      value: "Story"
    priority:
      type: "fixed"
      value: "Medium"
```

**Result**: Creates Jira issue and stores `jira_issue_id` and `jira_issue_url` in state.

#### Example 2: Create Confluence Page

Create a Confluence page with dynamic title and content:

```yaml
- id: "create_documentation"
  type: "function"
  toolkit: "confluence_toolkit"
  tool: "create_page"
  input: ["space_key", "page_title", "page_content"]
  output: ["page_id", "page_url", "messages"]
  input_mapping:
    space:
      type: "variable"
      value: "space_key"
    title:
      type: "fstring"
      value: "Requirements - {project_name}"
    body:
      type: "variable"
      value: "page_content"
    parent_id:
      type: "fixed"
      value: null
```

#### Example 3: Update GitHub Issue

Update an existing GitHub issue with new labels:

```yaml
- id: "update_github_issue"
  type: "function"
  toolkit: "github_toolkit"
  tool: "update_issue"
  input: ["repo_owner", "repo_name", "issue_number", "new_labels"]
  output: ["update_status", "messages"]
  input_mapping:
    owner:
      type: "variable"
      value: "repo_owner"
    repo:
      type: "variable"
      value: "repo_name"
    issue_number:
      type: "variable"
      value: "issue_number"
    labels:
      type: "variable"
      value: "new_labels"
    state:
      type: "fixed"
      value: "open"
```

#### Example 4: Search Confluence by Title

Search for Confluence pages matching a query:

```yaml
- id: "search_docs"
  type: "function"
  toolkit: "confluence_toolkit"
  tool: "search_by_title"
  input: ["search_query"]
  output: ["search_results", "messages"]
  input_mapping:
    query:
      type: "variable"
      value: "search_query"
    skip_images:
      type: "fixed"
      value: true
```

#### Example 5: Chain Function Calls

Create a Jira ticket, then add a comment:

```yaml
nodes:
  - id: "create_issue"
    type: "function"
    toolkit: "jira_toolkit"
    tool: "create_issue"
    input: ["project_key", "summary", "description"]
    output: ["issue_id", "messages"]
    input_mapping:
      project:
        type: "variable"
        value: "project_key"
      summary:
        type: "variable"
        value: "summary"
      description:
        type: "variable"
        value: "description"
      issuetype:
        type: "fixed"
        value: "Task"
    transition: "add_comment"
  
  - id: "add_comment"
    type: "function"
    toolkit: "jira_toolkit"
    tool: "add_comment"
    input: ["issue_id", "comment_text"]
    output: ["comment_id", "messages"]
    input_mapping:
      issue_key:
        type: "variable"
        value: "issue_id"
      comment:
        type: "fstring"
        value: "Automated comment: Issue created at {timestamp}"
```

### Best Practices

#### 1. Map Required Parameters Correctly

Always provide values for required parameters:

✅ **Correct**:
```yaml
input_mapping:
  project:
    type: "variable"
    value: "project_key"  # Mapped from state
  summary:
    type: "variable"
    value: "issue_summary"
```

❌ **Avoid**:
```yaml
input_mapping:
  project:
    type: "fixed"
    value: null  # Required parameter left empty
```

#### 2. Use Appropriate Type for Each Parameter

- **Variable**: When value comes from state
- **F-String**: When you need dynamic interpolation
- **Fixed**: For static, unchanging values

#### 3. Handle Optional Parameters

Set optional parameters to `null` if not needed:

```yaml
bucket_name:
  type: "fixed"
  value: null
```

#### 4. Include Output Variables

Capture important results in output variables:

```yaml
output: ["created_id", "created_url", "status", "messages"]
```

#### 5. Use Interrupts for Debugging

Enable interrupts when testing new integrations:

```yaml
interrupt_after: true  # Review tool results
```

#### 6. Validate State Variables

Ensure input state variables exist before the Function node executes:

```yaml
# Previous node should populate these
input: ["project_key", "summary", "description"]
```

#### 7. Choose Function Over Tool Node

Use Function Node when:

- You know exactly which tool to call
- Parameters are straightforward to map
- No LLM decision-making is needed
- Performance is critical (no LLM overhead)

#### 8. Document Complex Mappings

For complex F-String mappings, add comments in YAML:

```yaml
title:
  type: "fstring"
  value: "[{project_key}] {issue_type}: {summary}"  # Format: [PRJ-123] Bug: Description
```

---

## Tool Node

The Tool Node uses LLM intelligence to analyze a task instruction, select appropriate tools from available Toolkits/MCPs, and execute them with LLM-generated parameters. Unlike the Function Node, which requires explicit tool selection and parameter mapping, the Tool Node makes intelligent decisions about which tools to call and how.

![Tool Node Interface](../../../../img/how-tos/pipelines/nodes/execution/tool-node-interface.png)

### Purpose

Use the Tool Node to:

- **Delegate tool selection** to LLM based on natural language instructions
- **Handle complex workflows** where multiple tools might be needed
- **Simplify configuration** by avoiding manual parameter mapping
- **Leverage LLM reasoning** to choose the right tool for the task
- **Execute multi-step tool chains** dynamically

### Configuration

#### Basic Configuration

```yaml
- id: "research_and_document"
  type: "tool"
  task: "Search for information about {topic} in Confluence and create a summary document"
  toolkits: ["confluence_toolkit", "jira_toolkit"]
  input: ["topic", "messages"]
  output: ["summary_page_id", "messages"]
  structured_output: true
```

![Tool Node Basic Configuration](../../../../img/how-tos/pipelines/nodes/execution/tool-node-basic-config.png)

### Parameters

#### Toolkit

**Purpose**: Select which Toolkits or MCPs the LLM can choose tools from.

**Options**:
- **Toolkits** - External service integrations (Jira, GitHub, Confluence, Slack, etc.)
- **MCPs** (Model Context Protocol servers) - Custom integrations

**Selection**: You can select **multiple** Toolkits/MCPs. The LLM will have access to all tools from all selected toolkits.

![Tool Node Toolkit Selection](../../../../img/how-tos/pipelines/nodes/execution/tool-node-toolkit-selection.png)

**Example**:
```yaml
Toolkits:
  - confluence_toolkit
  - jira_toolkit
  - github_toolkit
```

**How It Works**:

1. User selects one or more toolkits
2. LLM receives descriptions of all available tools from those toolkits
3. LLM analyzes the task instruction
4. LLM decides which tool(s) to call and with what parameters
5. Pipeline executes the selected tools
6. LLM reviews results and may call additional tools if needed

#### Task

**Purpose**: Provide natural language instructions describing what the node should accomplish.

**Type Options**:
- **F-String** - Task with embedded state variables
- **Variable** - Task instruction from state variable
- **Fixed** - Static task instruction

![Tool Node Task Configuration](../../../../img/how-tos/pipelines/nodes/execution/tool-node-task-config.png)

**Examples**:

**F-String** (Dynamic task):
```yaml
Task:
  Type: F-String
  Value: "Search Confluence for documentation about {feature_name} and create a Jira ticket summarizing the findings."
```

**Variable** (Task from state):
```yaml
Task:
  Type: Variable
  Value: user_task_instruction
```

**Fixed** (Static task):
```yaml
Task:
  Type: Fixed
  Value: "Find all open Jira tickets in project ABC and export them to a CSV file."
```

#### Input

**Purpose**: Specify which state variables the Tool node reads from.

**Options**:
- Default states: `input`, `messages`
- Custom states: Any state variables you've defined

**Example**:
```yaml
Input:
  - topic
  - project_key
  - messages
```

#### Output

**Purpose**: Define which state variables the tool execution results should populate.

**Options**:
- `messages` - Store result in conversation history
- Custom states: Specific variables to extract from tool results

**Example**:
```yaml
Output:
  - search_results
  - created_ticket_id
  - messages
```

#### Interrupt Before/After

**Purpose**: Pause execution before or after the LLM executes tools.

**Use Cases**:
- Review which tools the LLM selected
- Inspect tool execution results
- Debug unexpected tool calls
- Verify LLM reasoning

**Configuration**:
```yaml
Interrupt before: [enabled/disabled]
Interrupt after: [enabled/disabled]
```

#### Structured Output

**Purpose**: Force the LLM to return results in a structured format matching your output variables.

**When Enabled**:
- LLM formats tool results into specific state variables
- More reliable data extraction from tool outputs
- Better integration with downstream nodes

**When Disabled**:
- LLM returns free-form summary of tool execution
- Results stored in `messages`
- More flexible but less structured

**Example with Structured Output**:
```yaml
- id: "extract_ticket_info"
  type: "tool"
  task: "Get Jira ticket {ticket_id} and extract the title, description, and assignee"
  toolkits: ["jira_toolkit"]
  output: ["ticket_title", "ticket_description", "ticket_assignee", "messages"]
  structured_output: true
```

### Examples

#### Example 1: Simple Tool Execution

Use Confluence toolkit to search for documentation:

```yaml
- id: "search_docs"
  type: "tool"
  task: "Search Confluence for pages about authentication"
  toolkits: ["confluence_toolkit"]
  input: ["messages"]
  output: ["messages"]
```

**How It Works**:
1. LLM receives task: "Search Confluence for pages about authentication"
2. LLM identifies `search_by_title` tool from `confluence_toolkit`
3. LLM generates parameters: `{"query": "authentication"}`
4. Tool executes and returns search results
5. LLM summarizes results in `messages`

#### Example 2: Multi-Tool Workflow

Research topic and create documentation:

```yaml
- id: "research_and_document"
  type: "tool"
  task: 
    type: "fstring"
    value: "Search Confluence for information about {topic}, then create a new Confluence page summarizing the findings in space {space_key}"
  toolkits: ["confluence_toolkit"]
  input: ["topic", "space_key", "messages"]
  output: ["new_page_id", "messages"]
  structured_output: true
```

**Execution Flow**:
1. LLM calls `search_by_title` with topic query
2. LLM reviews search results
3. LLM calls `create_page` with summarized content
4. LLM extracts `new_page_id` to state variable

#### Example 3: Structured Data Extraction

Extract specific fields from Jira ticket:

```yaml
- id: "extract_ticket_data"
  type: "tool"
  task:
    type: "fstring"
    value: "Get Jira ticket {ticket_key} and extract the summary, description, status, and assignee"
  toolkits: ["jira_toolkit"]
  input: ["ticket_key", "messages"]
  output: ["summary", "description", "status", "assignee", "messages"]
  structured_output: true
```

**Result**: State variables populated with specific extracted values.

#### Example 4: Complex Multi-Toolkit Workflow

Coordinate across multiple services:

```yaml
- id: "cross_platform_sync"
  type: "tool"
  task:
    type: "fstring"
    value: |
      1. Search Confluence for documentation about {feature_name}
      2. Find related Jira tickets in project {project_key}
      3. Create a GitHub issue summarizing the findings
      4. Add a comment to the Jira ticket with the GitHub issue link
  toolkits: ["confluence_toolkit", "jira_toolkit", "github_toolkit"]
  input: ["feature_name", "project_key", "messages"]
  output: ["github_issue_url", "jira_ticket_key", "messages"]
  structured_output: true
```

**Execution Flow**:
1. LLM calls Confluence `search_by_title`
2. LLM calls Jira `search_issues`
3. LLM calls GitHub `create_issue`
4. LLM calls Jira `add_comment`
5. LLM structures results into output variables

#### Example 5: Dynamic Task from State

Task instruction comes from previous node:

```yaml
- id: "execute_user_task"
  type: "tool"
  task:
    type: "variable"
    value: "user_instruction"
  toolkits: ["confluence_toolkit", "jira_toolkit", "github_toolkit"]
  input: ["user_instruction", "messages"]
  output: ["messages"]
```

**Use Case**: Allow users to provide natural language instructions that the Tool Node executes.

### Best Practices

#### 1. Write Clear Task Instructions

Provide specific, actionable tasks:

✅ **Good**:
```yaml
task: "Search Jira project ABC for open bugs with priority 'High' and export them to CSV"
```

❌ **Avoid**:
```yaml
task: "Do something with Jira tickets"
```

#### 2. Limit Toolkit Selection

Only bind toolkits relevant to the task:

✅ **Good**:
```yaml
toolkits: ["jira_toolkit"]  # Task only needs Jira
```

❌ **Avoid**:
```yaml
toolkits: ["jira_toolkit", "confluence_toolkit", "github_toolkit", "slack_toolkit"]  # Too many, confuses LLM
```

#### 3. Use Structured Output for Data Extraction

When you need specific values, enable structured output:

```yaml
structured_output: true
output: ["ticket_id", "ticket_url", "created_at", "messages"]
```

#### 4. Provide Context in Task

Include necessary context from state:

```yaml
task:
  type: "fstring"
  value: "Search for tickets in project {project_key} assigned to {user_name} with status 'In Progress'"
```

#### 5. Use Interrupts for Debugging

Review LLM tool selection and execution:

```yaml
interrupt_after: true  # See which tools LLM called and results
```

#### 6. Handle Multi-Step Tasks

Break complex workflows into clear steps:

```yaml
task: |
  Step 1: Search Confluence for {topic}
  Step 2: Extract key points from top 3 results
  Step 3: Create a summary document in space {space_key}
  Step 4: Return the page ID
```

#### 7. Choose Tool Node Over Function Node

Use Tool Node when:
- Task requires LLM reasoning about which tool to use
- Multiple tools might be needed
- You want natural language task specification
- Tool parameters are complex or context-dependent

#### 8. Monitor LLM Tool Calls

Review which tools the LLM selected to ensure expected behavior:

```yaml
interrupt_after: true
output: ["tool_calls", "results", "messages"]
```

---

## Code Node

The Code Node enables secure execution of custom Python code within a sandboxed environment (Pyodide/WebAssembly). It provides full Python capabilities for data processing, calculations, and custom logic without accessing the host system.

![Code Node Interface](../../../../img/how-tos/pipelines/nodes/execution/code-node-interface.png)

### Purpose

Use the Code Node to:

- **Execute custom Python logic** for data transformation and processing
- **Perform calculations** that don't require external tool integrations
- **Process pipeline state** with full programming control
- **Implement business rules** and conditional logic in Python
- **Transform data formats** between pipeline nodes
- **Call external APIs** directly from Python

### Configuration

#### Basic Configuration

```yaml
- id: "calculate_metrics"
  type: "code"
  code:
    type: "fixed"
    value: |
      import math
      numbers = alita_state.get('numbers', [])
      mean = sum(numbers) / len(numbers) if numbers else 0
      return {"average": mean, "count": len(numbers)}
  input: ["numbers"]
  output: ["average", "count"]
  structured_output: true
```

![Code Node Basic Configuration](../../../../img/how-tos/pipelines/nodes/execution/code-node-basic-config.png)

### Parameters

#### Code

**Purpose**: Provide the Python code to execute.

**Type Options**:
- **F-String** - Code with dynamic variable interpolation
- **Fixed** - Static Python code block
- **Variable** - Code sourced from a state variable

![Code Node Code Types](../../../../img/how-tos/pipelines/nodes/execution/code-node-code-types.png)

**Fixed Code** (Most common):
```yaml
Code:
  Type: Fixed
  Value: |
    # Your Python code here
    result = sum(alita_state.get('values', []))
    return {"total": result}
```

**F-String** (Dynamic code generation):
```yaml
Code:
  Type: F-String
  Value: |
    threshold = {threshold_value}
    data = alita_state.get('data', [])
    filtered = [x for x in data if x > threshold]
    return {"filtered_count": len(filtered)}
```

**Variable** (Code from state):
```yaml
Code:
  Type: Variable
  Value: python_code_from_state
```

**Full-Screen Editor**:

The Value field supports **full-screen mode** with:
- Python syntax highlighting
- Code detection and validation
- Multi-line code editing
- Syntax error highlighting

![Code Node Full Screen Editor](../../../../img/how-tos/pipelines/nodes/execution/code-node-fullscreen.png)

#### Input

**Purpose**: Specify which state variables to inject into the code execution context.

**How It Works**:
- Selected state variables become accessible via `alita_state` dictionary
- Example: If `numbers` is in input, access it as `alita_state.get('numbers', [])`

**Example**:
```yaml
Input:
  - user_data
  - configuration
  - previous_results
```

**Code Access**:
```python
user_data = alita_state.get('user_data', {})
config = alita_state.get('configuration', {})
prev = alita_state.get('previous_results', [])
```

#### Output

**Purpose**: Define which state variables the code's return value should populate.

**Behavior**:

**Without Output Variables** (or `messages` only):
- Code return value is added to `messages`

**With Output Variables**:
- Code return value must be a dictionary
- Only variables listed in `output` are updated in state
- Requires `structured_output: true` for proper mapping

**Example**:
```yaml
Output:
  - total
  - average
  - status
  - messages
```

#### Structured Output

**Purpose**: Enable parsing of code return value as structured data for state variable updates.

**When Enabled** (`true`):
- Code must return a dictionary
- Dictionary keys matching output variables update those state variables
- Non-matching keys are ignored

**When Disabled** (`false`):
- Code return value goes to `messages`
- No structured variable updates

**Example with Structured Output**:
```yaml
- id: "process_scores"
  type: "code"
  code:
    type: "fixed"
    value: |
      scores = alita_state.get('scores', [])
      return {
        "min_score": min(scores),
        "max_score": max(scores),
        "avg_score": sum(scores) / len(scores)
      }
  output: ["min_score", "max_score", "avg_score"]
  structured_output: true
```

**State Before**:
```yaml
scores: [85, 92, 78, 95, 88]
```

**State After**:
```yaml
scores: [85, 92, 78, 95, 88]
min_score: 78
max_score: 95
avg_score: 87.6
```

!!! note "Important: Output Variable Filtering"
    **Only variables listed in `output` will be updated**, even if the returned dictionary contains additional keys.
    
    Example:
    ```python
    return {
      "total": 100,      # ✅ In output list
      "average": 50,     # ✅ In output list
      "debug_info": {...} # ❌ NOT in output list, ignored
    }
    ```

#### Interrupt Before/After

**Purpose**: Pause execution before or after code execution.

**Use Cases**:
- Debug Python code
- Review execution results
- Inspect state variables before/after processing
- Verify calculations

**Configuration**:
```yaml
Interrupt before: [enabled/disabled]
Interrupt after: [enabled/disabled]
```

### Code Execution Environment

#### State Access

Access pipeline state via `alita_state` dictionary:

```python
# Read state variables
user_name = alita_state.get('user_name', 'Unknown')
scores = alita_state.get('scores', [])
config = alita_state.get('configuration', {})

# Process data
average = sum(scores) / len(scores) if scores else 0

# Return results
return {
  "user": user_name,
  "average_score": average,
  "total_scores": len(scores)
}
```

#### Alita Client Integration

When an Alita client is available, it's automatically injected as `alita_client`:

```python
# List artifacts from bucket
artifacts = alita_client.list_artifacts(bucket_name='production')

# Use artifacts in processing
artifact_names = [a['name'] for a in artifacts]
return {"artifact_count": len(artifacts), "names": artifact_names}
```

#### Available Libraries

**Standard Library**: Full Python standard library available

**Dynamic Package Installation**:
```python
import micropip
await micropip.install('package-name')
import package
```

**Network Access**: Enabled for external API calls:
```python
import requests
response = requests.get('https://api.example.com/data')
data = response.json()
return {"api_result": data}
```

### Examples

#### Example 1: Simple Calculation

Calculate sum and average:

```yaml
- id: "calculate_stats"
  type: "code"
  code:
    type: "fixed"
    value: |
      numbers = alita_state.get('numbers', [])
      if not numbers:
          return {"error": "No numbers provided"}
      
      total = sum(numbers)
      average = total / len(numbers)
      
      return {
        "total": total,
        "average": average,
        "count": len(numbers)
      }
  input: ["numbers"]
  output: ["total", "average", "count"]
  structured_output: true
```

#### Example 2: Data Filtering and Transformation

Filter and transform user data:

```yaml
- id: "filter_users"
  type: "code"
  code:
    type: "fixed"
    value: |
      import json
      
      users = alita_state.get('users', [])
      min_age = alita_state.get('min_age', 18)
      
      # Filter and transform
      eligible_users = []
      for user in users:
          if user.get('age', 0) >= min_age:
              eligible_users.append({
                  'id': user['id'],
                  'name': user['name'],
                  'email': user['email']
              })
      
      return {
        "eligible_users": eligible_users,
        "eligible_count": len(eligible_users),
        "filtered_count": len(users) - len(eligible_users)
      }
  input: ["users", "min_age"]
  output: ["eligible_users", "eligible_count", "filtered_count"]
  structured_output: true
```

#### Example 3: API Integration

Call external API and process results:

```yaml
- id: "fetch_weather"
  type: "code"
  code:
    type: "fixed"
    value: |
      import requests
      
      city = alita_state.get('city', 'London')
      api_key = alita_state.get('api_key', '')
      
      try:
          url = f"https://api.weather.com/v1/current?city={city}&key={api_key}"
          response = requests.get(url)
          data = response.json()
          
          return {
            "temperature": data['temp'],
            "condition": data['condition'],
            "humidity": data['humidity'],
            "status": "success"
          }
      except Exception as e:
          return {
            "error": str(e),
            "status": "failed"
          }
  input: ["city", "api_key"]
  output: ["temperature", "condition", "humidity", "status"]
  structured_output: true
```

#### Example 4: Complex Business Logic

Implement multi-step business rules:

```yaml
- id: "calculate_discount"
  type: "code"
  code:
    type: "fixed"
    value: |
      order_total = alita_state.get('order_total', 0)
      customer_tier = alita_state.get('customer_tier', 'bronze')
      is_first_order = alita_state.get('is_first_order', False)
      
      # Base discount by tier
      tier_discounts = {
        'bronze': 0.05,
        'silver': 0.10,
        'gold': 0.15,
        'platinum': 0.20
      }
      
      discount_rate = tier_discounts.get(customer_tier, 0)
      
      # First order bonus
      if is_first_order:
          discount_rate += 0.05
      
      # Volume discount
      if order_total > 1000:
          discount_rate += 0.05
      elif order_total > 500:
          discount_rate += 0.03
      
      # Cap at 30%
      discount_rate = min(discount_rate, 0.30)
      
      discount_amount = order_total * discount_rate
      final_total = order_total - discount_amount
      
      return {
        "discount_rate": discount_rate,
        "discount_amount": discount_amount,
        "final_total": final_total,
        "savings": discount_amount
      }
  input: ["order_total", "customer_tier", "is_first_order"]
  output: ["discount_rate", "discount_amount", "final_total", "savings"]
  structured_output: true
```

#### Example 5: JSON Processing

Parse and validate JSON data:

```yaml
- id: "validate_json"
  type: "code"
  code:
    type: "fixed"
    value: |
      import json
      
      raw_data = alita_state.get('raw_json', '')
      
      try:
          data = json.loads(raw_data)
          
          # Validation
          required_fields = ['id', 'name', 'email']
          missing_fields = [f for f in required_fields if f not in data]
          
          if missing_fields:
              return {
                "valid": False,
                "error": f"Missing fields: {', '.join(missing_fields)}"
              }
          
          # Extract and validate email
          email = data.get('email', '')
          valid_email = '@' in email and '.' in email
          
          return {
            "valid": valid_email,
            "user_id": data.get('id'),
            "user_name": data.get('name'),
            "user_email": email,
            "validation_status": "passed" if valid_email else "failed"
          }
      except json.JSONDecodeError as e:
          return {
            "valid": False,
            "error": f"Invalid JSON: {str(e)}"
          }
  input: ["raw_json"]
  output: ["valid", "user_id", "user_name", "user_email", "validation_status"]
  structured_output: true
```

### Best Practices

#### 1. Always Return Structured Data

When using `structured_output: true`, return dictionaries:

✅ **Correct**:
```python
return {
  "result": 42,
  "status": "success"
}
```

❌ **Avoid**:
```python
return 42  # Not structured
```

#### 2. Handle Errors Gracefully

Include try-except blocks:

```python
try:
    result = risky_operation()
    return {"result": result, "status": "success"}
except Exception as e:
    return {"error": str(e), "status": "failed"}
```

#### 3. Validate Input Data

Check state variables before processing:

```python
data = alita_state.get('data', [])
if not data:
    return {"error": "No data provided"}

# Process data...
```

#### 4. Use Descriptive Output Variables

Name output variables clearly:

✅ **Good**:
```yaml
output: ["total_revenue", "average_order_value", "customer_count"]
```

❌ **Avoid**:
```yaml
output: ["result1", "result2", "result3"]
```

#### 5. Keep Code Focused

One Code Node = One clear purpose:

✅ **Good**: Calculate metrics
❌ **Avoid**: Calculate metrics + Call API + Transform data + Validate

#### 6. Use Comments

Document complex logic:

```python
# Calculate tiered discount based on customer segment
tier_discounts = {'bronze': 0.05, 'silver': 0.10, 'gold': 0.15}
discount = tier_discounts.get(customer_tier, 0)

# Apply first-order bonus (5% additional)
if is_first_order:
    discount += 0.05
```

#### 7. Test with Interrupts

Debug code execution:

```yaml
interrupt_after: true  # Review execution results
```

#### 8. Optimize Performance

- Avoid heavy computations in frequently called nodes
- Cache expensive operations when possible
- Use efficient data structures

---

## Custom Node

The Custom Node provides advanced JSON-based configuration for executing any toolkit type (Toolkit, MCP, Agent, or Pipeline). It offers maximum flexibility and control over node behavior through direct JSON configuration.

![Custom Node Interface](../../../../img/how-tos/pipelines/nodes/execution/custom-node-interface.png)

### Purpose

Use the Custom Node to:

- **Execute any toolkit type** (Toolkit, MCP, Agent, Pipeline)
- **Configure complex integrations** with full JSON control
- **Prototype new node types** before formal implementation
- **Access advanced features** not exposed in standard nodes
- **Integrate custom MCPs** with specific configuration needs

!!! info "Advanced Configuration"
    Custom Node allows advanced users to make manual and advanced configurations using any available toolkits (Agents, Pipelines, Toolkits, and MCPs) with JSON-based configuration.

### Configuration

#### Basic Configuration

```yaml
- id: "custom_integration"
  type: "custom"
  toolkit: "super_max_toolkit"
  tool: "update_page_by_id"
  input: ["page_id", "new_content"]
  output: ["update_status", "messages"]
  input_mapping:
    page_id:
      type: "fixed"
      value: "12345"
    new_label:
      type: "fixed"
      value: null
    new_body:
      type: "fixed"
      value: null
    new_title:
      type: "fixed"
      value: null
    representation:
      type: "fixed"
      value: "storage"
```

![Custom Node Basic Configuration](../../../../img/how-tos/pipelines/nodes/execution/custom-node-basic-config.png)

### Parameters

#### Toolkit

**Purpose**: Select which toolkit type to execute.

**Options** (Custom Node supports ALL types):
- **Toolkits** - External service integrations
- **MCPs** - Model Context Protocol servers
- **Agents** - Pre-configured AI agents
- **Pipelines** - Other pipelines (subgraph execution)

![Custom Node Toolkit Selection](../../../../img/how-tos/pipelines/nodes/execution/custom-node-toolkit-selection.png)

**Example**:
```yaml
Toolkit: super_max_toolkit  # Could be any type
```

#### Tool

**Purpose**: Specify the tool/function to execute (if applicable).

**Note**: For Agents and Pipelines, this may not apply.

**Example**:
```yaml
Tool: update_page_by_id
```

#### Input

**Purpose**: Specify which state variables the Custom node reads from.

**Example**:
```yaml
Input:
  - page_id
  - content_data
  - messages
```

#### Output

**Purpose**: Define which state variables the execution result should populate.

**Example**:
```yaml
Output:
  - update_status
  - response_data
  - messages
```

#### Input Mapping

**Purpose**: Map pipeline state to toolkit parameters using JSON configuration.

**Structure**: After selecting a toolkit and tool, the Input Mapping section appears with:

1. **INPUT MAPPING (REQUIRED {n})**
2. **INPUT MAPPING (OPTIONAL {n})**

Each parameter has:
- **Type**: F-String, Variable, Fixed
- **Value**: Parameter value

![Custom Node Input Mapping](../../../../img/how-tos/pipelines/nodes/execution/custom-node-input-mapping.png)

**Example Configuration**:
```yaml
INPUT MAPPING (REQUIRED 1):
  PAGE_ID:
    Type: Fixed
    Value: "12345"

INPUT MAPPING (OPTIONAL 4):
  NEW_LABEL:
    Type: Fixed
    Value: null
  
  NEW_BODY:
    Type: Fixed
    Value: null
  
  NEW_TITLE:
    Type: Fixed
    Value: null
  
  REPRESENTATION:
    Type: Fixed
    Value: "storage"
```

#### JSON Configuration Display

The Custom Node displays the **raw JSON configuration** at the bottom of the node:

```json
{
  "type": "custom",
  "input_mapping": {
    "task": {
      "type": "fstring",
      "value": ""
    },
    "chat_history": {
      "type": "fixed",
      "value": []
    }
  }
}
```

![Custom Node JSON Configuration](../../../../img/how-tos/pipelines/nodes/execution/custom-node-json-display.png)

This JSON represents the complete node configuration and can be edited directly for advanced use cases.

#### Interrupt Before/After

**Purpose**: Pause execution before or after the Custom node executes.

**Configuration**:
```yaml
Interrupt before: [enabled/disabled]
Interrupt after: [enabled/disabled]
```

#### Structured Output

**Purpose**: Enable structured output parsing for result extraction.

**Configuration**:
```yaml
Structured output: [enabled/disabled]
```

### Examples

#### Example 1: Custom MCP Integration

Execute a custom MCP tool:

```yaml
- id: "custom_mcp_call"
  type: "custom"
  toolkit: "analytics_mcp"
  tool: "generate_report"
  input: ["start_date", "end_date", "report_type"]
  output: ["report_url", "report_data", "messages"]
  input_mapping:
    start_date:
      type: "variable"
      value: "start_date"
    end_date:
      type: "variable"
      value: "end_date"
    report_type:
      type: "fixed"
      value: "summary"
    format:
      type: "fixed"
      value: "pdf"
  structured_output: true
```

#### Example 2: Execute Agent as Toolkit

Use an agent within a Custom Node:

```yaml
- id: "call_agent"
  type: "custom"
  toolkit: "research_agent"
  input: ["research_topic", "messages"]
  output: ["research_findings", "messages"]
  input_mapping:
    task:
      type: "fstring"
      value: "Research: {research_topic}"
    chat_history:
      type: "variable"
      value: "messages"
  structured_output: true
```

#### Example 3: Pipeline Subgraph

Execute another pipeline as a subgraph:

```yaml
- id: "execute_subpipeline"
  type: "custom"
  toolkit: "data_processing_pipeline"
  input: ["raw_data", "config"]
  output: ["processed_data", "messages"]
  input_mapping:
    input_data:
      type: "variable"
      value: "raw_data"
    configuration:
      type: "variable"
      value: "config"
  structured_output: true
```

#### Example 4: Advanced Toolkit Configuration

Complex toolkit with many parameters:

```yaml
- id: "advanced_integration"
  type: "custom"
  toolkit: "enterprise_toolkit"
  tool: "complex_operation"
  input: ["entity_id", "operation_type", "metadata"]
  output: ["operation_result", "messages"]
  input_mapping:
    entity_id:
      type: "variable"
      value: "entity_id"
    operation:
      type: "variable"
      value: "operation_type"
    metadata:
      type: "variable"
      value: "metadata"
    retry_count:
      type: "fixed"
      value: 3
    timeout:
      type: "fixed"
      value: 30
    async_mode:
      type: "fixed"
      value: false
  structured_output: true
```

#### Example 5: Dynamic JSON Configuration

Use F-String for dynamic JSON values:

```yaml
- id: "dynamic_custom_node"
  type: "custom"
  toolkit: "api_toolkit"
  tool: "call_endpoint"
  input: ["user_id", "action", "payload"]
  output: ["api_response", "messages"]
  input_mapping:
    endpoint:
      type: "fstring"
      value: "/api/users/{user_id}/{action}"
    method:
      type: "fixed"
      value: "POST"
    headers:
      type: "fixed"
      value: '{"Content-Type": "application/json"}'
    body:
      type: "variable"
      value: "payload"
  structured_output: true
```

### Best Practices

#### 1. Use Custom Node for Advanced Cases

Choose Custom Node when:
- Standard nodes don't support your toolkit type
- You need full JSON control
- Working with custom MCPs or Pipelines
- Prototyping new integrations

#### 2. Validate JSON Configuration

Ensure JSON is valid before execution:

```json
{
  "type": "custom",
  "input_mapping": {
    "param1": {"type": "fixed", "value": "value1"},
    "param2": {"type": "variable", "value": "state_var"}
  }
}
```

#### 3. Document Complex Configurations

Add comments (in YAML) explaining JSON configuration:

```yaml
# Custom node for advanced MCP integration
# Calls analytics_mcp.generate_report with date range filtering
- id: "custom_mcp"
  type: "custom"
  toolkit: "analytics_mcp"
  # ... configuration
```

#### 4. Use Interrupts for Testing

Test custom configurations with interrupts:

```yaml
interrupt_after: true  # Review execution results
```

#### 5. Handle All Toolkit Types

Remember Custom Node supports:
- ✅ Toolkits
- ✅ MCPs
- ✅ Agents
- ✅ Pipelines

#### 6. Structured Output for Data Extraction

Enable structured output when extracting specific values:

```yaml
structured_output: true
output: ["specific_field1", "specific_field2", "messages"]
```

#### 7. Test with Standard Nodes First

Before using Custom Node, verify if Function/Tool nodes suffice:
- **Function Node**: For direct tool calls with known parameters
- **Tool Node**: For LLM-assisted tool selection
- **Custom Node**: For advanced cases only

#### 8. Keep JSON Readable

Format JSON configuration for readability:

```json
{
  "type": "custom",
  "input_mapping": {
    "task": {
      "type": "fstring",
      "value": "Process {item_id}"
    }
  }
}
```

---

## Execution Nodes Comparison

| Feature | Function Node | Tool Node | Code Node | Custom Node |
|---------|---------------|-----------|-----------|-------------|
| **Purpose** | Execute specific tool with explicit parameter mapping | LLM-assisted tool selection and execution | Execute custom Python code | Advanced JSON-based configuration for any toolkit type |
| **Toolkit Types** | Toolkits, MCPs | Toolkits, MCPs | N/A (Python sandbox) | Toolkits, MCPs, Agents, Pipelines |
| **Tool Selection** | Manual (user selects) | Automatic (LLM decides) | N/A | Manual (user selects) |
| **Parameter Mapping** | Explicit Input Mapping (per tool) | LLM generates parameters from task | State via `alita_state` | Explicit Input Mapping (JSON) |
| **Task Instruction** | No task field | Required (natural language) | Python code | Optional (depends on toolkit) |
| **LLM Usage** | No LLM | Yes (for tool selection and params) | No LLM | No LLM (unless calling Agent/LLM toolkit) |
| **Configuration** | UI-based parameter mapping | Natural language task + toolkit selection | Python code editor | JSON configuration |
| **Flexibility** | Low (predefined tools) | High (LLM reasoning) | Very High (full Python) | Very High (full JSON control) |
| **Complexity** | Medium | Low (natural language) | High (requires Python knowledge) | High (requires JSON understanding) |
| **Performance** | Fast (direct execution) | Slower (LLM overhead) | Fast (compiled sandbox) | Fast (direct execution) |
| **Structured Output** | Not applicable | Supported | Supported | Supported |
| **Input Mapping** | Required parameters + optional | LLM generates from task | `alita_state` dictionary | Required parameters + optional (JSON) |
| **Use Case** | Known tool, explicit parameters | Flexible tool selection, complex workflows | Custom logic, calculations, data processing | Advanced integrations, custom MCPs, subgraphs |
| **Best For** | Deterministic tool calls (create Jira ticket, search Confluence) | Dynamic tool selection (research and document, multi-step workflows) | Data transformation, business logic, API calls | Custom MCPs, Agents, Pipelines, prototype integrations |

### When to Use Each Node

#### Function Node ✅

**Choose Function Node when you**:
- Know exactly which tool to call
- Have straightforward parameter mapping
- Need fast, deterministic execution
- Don't require LLM reasoning
- Want explicit control over tool execution

**Example**: Create a Jira ticket with known project, summary, and description.

#### Tool Node ✅

**Choose Tool Node when you**:
- Need LLM to decide which tool(s) to call
- Have complex, multi-step workflows
- Want natural language task specification
- Require dynamic tool selection based on context
- Need LLM reasoning about tool parameters

**Example**: "Search Confluence for authentication docs, then create a Jira ticket summarizing the findings."

#### Code Node ✅

**Choose Code Node when you**:
- Need custom Python logic
- Require data transformation or processing
- Implement business rules and calculations
- Call external APIs directly
- Have logic too complex for standard nodes

**Example**: Calculate tiered discounts based on customer segment, order value, and first-order status.

#### Custom Node ✅

**Choose Custom Node when you**:
- Need to call Agents or Pipelines as toolkits
- Work with custom MCPs requiring specific configuration
- Require full JSON control over node behavior
- Prototype new integrations
- Standard nodes don't support your use case

**Example**: Execute a custom MCP or run another pipeline as a subgraph.

!!! tip "Combining Execution Nodes"
    You can use multiple execution node types in the same pipeline:
    
    ```yaml
    nodes:
      - id: "extract_data"
        type: "code"  # Custom Python extraction
        
      - id: "search_docs"
        type: "tool"  # LLM-assisted search
        
      - id: "create_ticket"
        type: "function"  # Deterministic ticket creation
        
      - id: "run_analysis"
        type: "custom"  # Execute analysis pipeline subgraph
    ```

---

## Related

- **[Nodes Overview](overview.md)** - Understand all available node types
- **[Interaction Nodes](interaction-nodes.md)** - LLM and Agent nodes for AI-powered tasks
- **[Control Flow Nodes](control-flow-nodes.md)** - Router, Condition, and Decision nodes
- **[States](../states.md)** - Manage data flow through pipeline state
- **[Connections](../connections.md)** - Link nodes together
- **[YAML Configuration](../yaml.md)** - See complete node syntax examples
