# Iteration Nodes

Iteration Nodes enable your pipeline to perform repetitive tasks, processing multiple items systematically. These nodes form the "looping" layer of your workflow, allowing pipelines to handle lists, batch operations, and iterative processing with precision and control.

**Available Iteration Nodes:**

* **[Loop Node](#loop-node)** - Execute a toolkit repeatedly based on task instructions
* **[Loop from Tool Node](#loop-from-tool-node)** - Generate a list dynamically and process each item

!!! note "Understanding Iteration"
    Iteration nodes are powerful but can be complex. They allow you to process multiple items (files, records, tasks) in a single pipeline execution, making them essential for automation and batch processing workflows.

---

## Loop Node

The Loop Node executes a selected toolkit repeatedly, creating input for each iteration based on task instructions. It's designed for scenarios where you know what needs to be iterated over and can describe how to create inputs for each iteration.

![Loop Node Interface](../../../../img/how-tos/pipelines/nodes/iteration/loop-node-interface.png)

### Purpose

Use the Loop Node to:

* **Process lists of items** where you define iteration logic in the Task field
* **Execute the same action repeatedly** with different inputs
* **Automate batch operations** across multiple entities
* **Iterate through data** extracted from state or previous nodes
* **Repeat toolkit execution** until all items are processed

### Configuration

#### Basic Configuration

```yaml
- id: "process_files"
  type: "loop"
  toolkit: "llm-node"
  tool: "createFile"
  task: |
    Formulate ALL file paths from chat_history as a list of inputs.
    For each file path, create a dictionary with:
    - "task": the file path
    - "chat_history": the entire chat history
  input: ["messages"]
  output: ["processed_files"]
  transition: "END"
```

![Loop Node Basic Configuration](../../../../img/how-tos/pipelines/nodes/iteration/loop-node-basic-config.png)

### Parameters

#### Toolkit

**Purpose**: Select the toolkit type that will be executed in each loop iteration.

**Options**:

* **Toolkits** - ELITEA toolkits (e.g., GitHub, Jira, Confluence)
* **MCPs** - Model Context Protocol servers
* **Agents** - ELITEA agents
* **Pipelines** - Other pipeline executions

![Loop Node Toolkit Selection](../../../../img/how-tos/pipelines/nodes/iteration/loop-node-toolkit.png)

**Toolkit Selection Behavior**:

When you select **Toolkits** or **MCPs**:

* A **Tool** dropdown appears
* You must select a specific tool from the chosen toolkit/MCP
* Example: Select "GitHub Expert" toolkit → Choose "createFile" tool

When you select **Agents** or **Pipelines**:

* No additional dropdown appears
* The toolkit itself is executed directly

**Example - Toolkit with Tool**:
```yaml
toolkit: "llm-node"  # Toolkit type
tool: "createFile"   # Specific tool from llm-node toolkit
```

**Example - Agent**:
```yaml
toolkit: "Code Documentation Agent"  # Agent name, no tool needed
```

#### Tool

**Purpose**: Select the specific tool from the chosen toolkit or MCP.

**Availability**: Only appears when Toolkit is set to **Toolkits** or **MCPs**.

![Loop Node Tool Selection](../../../../img/how-tos/pipelines/nodes/iteration/loop-node-tool.png)

**Example**:
```yaml
toolkit: "GitHub Expert"
tool: "createFile"
```

**Tool Selection**:
- Dropdown shows all available tools from the selected toolkit/MCP
- Each toolkit provides different tools
- Tool parameters are configured through the Task field and input mapping

#### Task

**Purpose**: Provide instructions on how to formulate the input for each iteration of the loop.

**Format**: Natural language instructions describing how to extract or create input data from the current state or chat history.

![Loop Node Task Field](../../../../img/how-tos/pipelines/nodes/iteration/loop-node-task.png)

**Example Task**:
```yaml
task: |
  Formulate ALL file paths from chat_history as a list of inputs.
  For each file path, create a dictionary with:
  - "task": the file path to document
  - "chat_history": the entire conversation history
```

**Task Instructions**:

The Task field tells the Loop Node:

1. **Where to find the items** to iterate over (e.g., "from chat_history", "from input", "from file_list state")
2. **How to extract each item** (e.g., "extract all file paths", "parse JSON array")
3. **How to format the input** for each iteration (e.g., "create a dictionary with keys...")

**Common Task Patterns**:

**Pattern 1: Extract from Chat History**:
```yaml
task: |
  Extract all file paths mentioned in the chat_history.
  For each file path, create input with:
  - "file_path": the path
  - "action": "document"
```

**Pattern 2: Process State Variable List**:
```yaml
task: |
  Process each item in the file_list state variable.
  For each item, create input with:
  - "task": f"Process file: {item}"
  - "chat_history": []
```

**Pattern 3: Generate Range**:
```yaml
task: |
  Generate inputs for numbers 1 through 10.
  For each number, create input with:
  - "task": f"Process item {number}"
  - "index": number
```

**Pattern 4: Parse JSON Array**:
```yaml
task: |
  Parse the user_stories state variable as JSON array.
  For each user story object, create input with:
  - "task": story["title"]
  - "description": story["description"]
  - "epic_id": story["epic_id"]
```

**How Task Works**:

The Loop Node uses the Task instructions with an internal LLM to:

1. Analyze the current state and chat history
2. Identify items to iterate over
3. Generate a list of inputs based on your instructions
4. Execute the toolkit for each input in the list

!!! tip "Task Clarity"
    Be specific in your Task instructions. The clearer you are about what to extract and how to format it, the more reliably the Loop Node will execute.

#### Input

**Purpose**: Specify which state variables the Loop Node reads when executing the Task instructions.

**Options**:

* Default states: `input`, `messages`
* Custom states: Any state variables you've defined

**Example**:
```yaml
input: ["messages", "file_list", "project_id"]
```

**Usage in Task**:

The Loop Node uses these input variables to:

* Extract items to iterate over
* Provide context for iteration logic
* Access data needed for each iteration

**Example with Input**:
```yaml
input: ["messages", "files_to_process"]
task: |
  For each file in the files_to_process state variable:
  - Create input with "file_path": file
  - Add context from messages
```

#### Output

**Purpose**: Specify state variable names to store the results from all loop iterations.

**Options**:

* Single output: Results concatenated as string
* Multiple outputs: Different aspects of results

**Example**:
```yaml
output: ["documentation_results", "processed_count"]
```

**Output Accumulation**:

The Loop Node accumulates results from each iteration:

* **Single output**: All iteration results joined into one string
* Results from each iteration are appended
* Final output contains complete results from all iterations

**Example Output Behavior**:

```yaml
# Iteration 1 result: "File 1 documented"
# Iteration 2 result: "File 2 documented"
# Iteration 3 result: "File 3 documented"
# Final output: "File 1 documented\nFile 2 documented\nFile 3 documented"
```

#### Structured Output

**Purpose**: Enable structured output parsing for loop results.

**Options**:

* **Enabled** (toggle on): Parse toolkit responses as structured data
* **Disabled** (toggle off): Treat responses as plain text

**When to Enable**:

* Toolkit returns JSON or structured data
* You need to extract specific fields from results
* Results will be used in subsequent nodes with structured input

**Example**:
```yaml
structured_output: true
```

!!! warning "Structured Output Requirements"
    Only enable structured output if the toolkit being called actually returns structured data (JSON, dict). Otherwise, parsing may fail.

### Examples

#### Example 1: Document Multiple Files

Process a list of file paths and generate documentation:

```yaml
- id: "document_files"
  type: "loop"
  toolkit: "Code Documentation Agent"
  task: |
    Formulate ALL file paths from chat_history as a list of inputs.
    For each file path, create a dictionary with:
    - "task": the file path to document
    - "chat_history": the entire conversation history
  input: ["messages"]
  output: ["documentation"]
  transition: "compile_docs"
```

**How It Works**:

1. Loop Node reads `messages` (chat history)
2. Task instructions tell it to extract all file paths
3. For each file path found:
      * Creates input: `{"task": "/path/to/file.py", "chat_history": [...]}`
      * Executes "Code Documentation Agent" with this input
4. Accumulates all documentation results into `documentation` state variable
5. Transitions to "compile_docs" node

#### Example 2: Batch Process User Stories

Create multiple Jira user stories from a list:

```yaml
- id: "create_user_stories"
  type: "loop"
  toolkit: "Jira Expert"
  tool: "createUserStory"
  task: |
    Parse the user_stories state variable as a JSON array.
    For each user story object:
    - "project_id": story["project_id"]
    - "epic_id": story["epic_id"]
    - "title": story["title"]
    - "description": story["description"]
  input: ["user_stories"]
  output: ["created_stories"]
  structured_output: true
  transition: "summary"
```

**Execution Flow**:

1. Reads `user_stories` state (JSON array)
2. Task parses array and extracts each story
3. For each story:
      * Maps fields to Jira tool parameters
      * Calls `createUserStory` tool
4. Collects all created story IDs
5. Stores results in `created_stories`

#### Example 3: Process Numbers Range

Generate reports for a range of IDs:

```yaml
- id: "generate_reports"
  type: "loop"
  toolkit: "Report Generator Agent"
  task: |
    Generate inputs for report IDs from 1 to 10.
    For each ID number, create input with:
    - "task": f"Generate report for ID {id}"
    - "report_id": id
    - "chat_history": []
  output: ["reports"]
  transition: "END"
```

**How It Works**:

1. Task generates 10 iterations (IDs 1-10)
2. Each iteration calls Report Generator Agent
3. Agent receives specific report ID
4. All reports accumulated in `reports` output

#### Example 4: Iterate Through State List

Process items from a custom state variable:

```yaml
- id: "process_branches"
  type: "loop"
  toolkit: "GitHub Expert"
  tool: "analyzeBranch"
  task: |
    For each branch name in the branches_to_analyze state:
    - "task": f"Analyze branch {branch_name}"
    - "branch": branch_name
    - "repository": repository_name
  input: ["branches_to_analyze", "repository_name"]
  output: ["branch_analysis"]
  structured_output: true
  transition: "create_summary"
```

#### Example 5: Conditional Iteration

Process only items meeting criteria:

```yaml
- id: "process_priority_tasks"
  type: "loop"
  toolkit: "Task Processor Agent"
  task: |
    From the tasks state variable, select only tasks with priority='high'.
    For each high-priority task:
    - "task": task["title"]
    - "priority": task["priority"]
    - "assignee": task["assignee"]
    - "chat_history": []
  input: ["tasks"]
  output: ["processed_tasks"]
  transition: "notify_completion"
```

### Best Practices

#### 1. Write Clear Task Instructions

Provide explicit, step-by-step instructions:

✅ **Good**:
```yaml
task: |
  Extract all file paths from messages.
  For each file path:
  1. Create "task" field with the path
  2. Create "action" field with value "document"
  3. Include full chat_history
```

❌ **Avoid**:
```yaml
task: "Process files"  # Too vague
```

#### 2. Specify Input Variables

List all state variables the Task needs:

✅ **Good**:
```yaml
input: ["messages", "project_id", "file_list"]
```

❌ **Avoid**:
```yaml
input: []  # Task may not have access to needed data
```

#### 3. Use Structured Output When Appropriate

Enable structured output for JSON-returning toolkits:

✅ **Good**:
```yaml
toolkit: "Jira Expert"
tool: "createIssue"
structured_output: true  # Jira returns structured data
```

#### 4. Provide Clear Output Names

Name outputs to indicate what they contain:

✅ **Good**:
```yaml
output: ["documentation_results", "error_count"]
```

❌ **Avoid**:
```yaml
output: ["result"]  # Unclear what this contains
```

#### 5. Consider Performance

Be mindful of iteration count:

!!! warning "Performance Considerations"
    Each iteration executes the toolkit, which may involve:
    - LLM calls (costs tokens)
    - API requests (rate limits)
    - Processing time (user wait)
    
    For large lists (>20 items), consider:
    - Breaking into smaller batches
    - Using interrupts to show progress
    - Implementing error handling

#### 6. Test with Small Lists First

Start with a few iterations:

✅ **Good Workflow**:
```yaml
# Test with 2-3 items first
task: |
  Process the first 3 file paths from messages.
  For each path...
```

Then scale up:
```yaml
# After testing, process all items
task: |
  Process ALL file paths from messages.
  For each path...
```

#### 7. Handle Empty Lists

Account for scenarios with no items:

```yaml
task: |
  If no file paths are found in messages, return empty list.
  Otherwise, for each file path found:
  - "task": the file path
  - "chat_history": messages
```

#### 8. Use Descriptive Toolkit Names

Select toolkits with clear purposes:

✅ **Good**:
```yaml
toolkit: "GitHub File Analyzer"
```

❌ **Avoid**:
```yaml
toolkit: "Helper Agent"  # Unclear purpose
```

#### 9. Document Expected Input Format

Comment on what the Task expects:

```yaml
# Expects messages to contain file paths like:
# "Process these files: /path/to/file1.py, /path/to/file2.js"
task: |
  Extract all file paths from messages...
```

#### 10. Plan Transition After Loop

Ensure next node handles loop output:

```yaml
output: ["documentation"]
transition: "compile_documentation"  # This node should expect 'documentation' input
```

---

## Loop from Tool Node

The Loop from Tool Node is a two-stage iteration mechanism: first, it executes a toolkit to generate a list of items, then it processes each item in that list using a second toolkit. This is ideal for dynamic iteration where the list of items isn't known beforehand.

![Loop from Tool Node Interface](../../../../img/how-tos/pipelines/nodes/iteration/loop-from-tool-interface.png)

### Purpose

Use the Loop from Tool Node to:

* **Dynamically generate iteration lists** using a toolkit
* **Process items from tool outputs** (e.g., files from a directory, tickets from Jira)
* **Chain two toolkits** where first generates inputs for second
* **Automate discovery and processing** workflows
* **Handle variable-length lists** determined at runtime

### Configuration

#### Basic Configuration

```yaml
- id: "process_github_files"
  type: "loop_from_tool"
  toolkit: "GitHub Expert"
  tool: "getFilesFromDirectory"
  structured_output: true
  loop_toolkit: "llm-node"
  loop_tool: "createFile"
  variables_mapping:
    file_path: "task"
    file_content: "content"
  input: ["repository_name", "directory_path"]
  output: ["processed_files"]
  transition: "END"
```

![Loop from Tool Node Basic Configuration](../../../../img/how-tos/pipelines/nodes/iteration/loop-from-tool-basic-config.png)

### Parameters

#### Toolkit (List Generator)

**Purpose**: Select the toolkit that will generate the list of items to iterate over.

**Options**:

* **Toolkits** - ELITEA toolkits
* **MCPs** - Model Context Protocol servers
* **Agents** - ELITEA agents
* **Pipelines** - Other pipelines

![Loop from Tool Node Toolkit](../../../../img/how-tos/pipelines/nodes/iteration/loop-from-tool-toolkit.png)

**First-Stage Toolkit**:

This toolkit is executed **once** at the beginning to generate the list:

* For **Toolkits/MCPs**: Must select a specific **Tool**
* For **Agents/Pipelines**: Toolkit is executed directly

**Example**:
```yaml
toolkit: "GitHub Expert"  # Toolkit type
tool: "getFilesFromDirectory"  # Tool that returns list of files
```

#### Tool (List Generator Tool)

**Purpose**: Select the specific tool that generates the item list.

**Availability**: Only appears when Toolkit is set to **Toolkits** or **MCPs**.

**Example**:
```yaml
toolkit: "GitHub Expert"
tool: "getFilesFromDirectory"
```

**Tool Output Requirements**:

The tool must return structured data (list or array):
```json
[
  {"file_path": "/path/to/file1.py", "file_content": "..."},
  {"file_path": "/path/to/file2.py", "file_content": "..."},
  {"file_path": "/path/to/file3.py", "file_content": "..."}
]
```

#### Loop Toolkit (Item Processor)

**Purpose**: Select the toolkit that will process each item in the generated list.

**Options**:

* **Toolkits** - ELITEA toolkits
* **MCPs** - Model Context Protocol servers
* **Agents** - ELITEA agents
* **Pipelines** - Other pipelines

![Loop from Tool Node Loop Toolkit](../../../../img/how-tos/pipelines/nodes/iteration/loop-from-tool-loop-toolkit.png)

**Second-Stage Toolkit**:

This toolkit is executed **for each item** in the list:

* For **Toolkits/MCPs**: Must select a specific **Loop Tool**
* For **Agents/Pipelines**: Toolkit is executed directly

**Example**:
```yaml
loop_toolkit: "llm-node"  # Toolkit type
loop_tool: "createFile"   # Tool to run for each file
```

#### Loop Tool (Item Processor Tool)

**Purpose**: Select the specific tool that processes each item.

**Availability**: Only appears when Loop Toolkit is set to **Toolkits** or **MCPs**.

**Example**:
```yaml
loop_toolkit: "llm-node"
loop_tool: "createFile"
```

**Loop Tool Input**:

The loop tool receives input from Variables Mapping for each item.

#### Variables Mapping

**Purpose**: Map output fields from the list-generating tool to input parameters of the item-processing tool.

**Critical Component**: This is the most important configuration for Loop from Tool nodes.

![Loop from Tool Node Variables Mapping](../../../../img/how-tos/pipelines/nodes/iteration/loop-from-tool-variables-mapping.png)

**Format**:
```yaml
variables_mapping:
  <output_field_from_list_tool>: <input_parameter_for_loop_tool>
```

**Example**:
```yaml
variables_mapping:
  file_path: "task"           # Map file_path to task parameter
  file_content: "FILEDATA"    # Map file_content to FILEDATA parameter
  bucket_name: "BUCKET_NAME"  # Map bucket_name to BUCKET_NAME parameter
```

**How Variables Mapping Works**:

1. **List Tool Output** (first toolkit):
   ```json
   [
     {"file_path": "/src/app.py", "file_content": "print('hello')"},
     {"file_path": "/src/utils.py", "file_content": "def helper(): pass"}
   ]
   ```

2. **Variables Mapping**:
   ```yaml
   variables_mapping:
     file_path: "task"
     file_content: "content"
   ```

3. **Loop Tool Input** (for each item):
   
   * Iteration 1: `{"task": "/src/app.py", "content": "print('hello')"}`
   * Iteration 2: `{"task": "/src/utils.py", "content": "def helper(): pass"}`

**Variables Mapping Configuration**:

In the UI, Variables Mapping shows:

* **Variable Name** (left): Output field name from list tool
* **Type**: Fixed, F-String, or Variable
* **Value** (right): Input parameter name for loop tool

**Example from Screenshot**:
```
BUCKET_NAME     Type: Fixed      Value: null
FILEDATA        Type: Fixed      Value: [mapped from file_content]
FILENAME        Type: Fixed      Value: [mapped from file_path]
```

**Mapping Types**:

**Type: Fixed**:
```yaml
variables_mapping:
  file_path: "task"  # Direct mapping
```

**Type: F-String**:
```yaml
variables_mapping:
  file_path: "Process file: {file_path}"  # Format string
```

**Type: Variable**:
```yaml
variables_mapping:
  file_path: "{repository_name}/{file_path}"  # Combine variables
```

!!! warning "Variables Mapping Requirement"
    Variables Mapping is **mandatory** for Loop from Tool nodes. Without it, the loop tool won't know how to receive data from the list tool.

#### Task

**Purpose**: Optional instructions for the list-generating toolkit (first stage).

**Usage**: Provide context or instructions to the tool that generates the list.

**Example**:
```yaml
task: "Get all Python files from the src directory"
```

**When to Use Task**:

* List-generating toolkit needs specific instructions
* You want to filter or customize the list generation
* Agent or LLM-based toolkit requires context

#### Input

**Purpose**: Specify state variables needed by the list-generating toolkit.

**Example**:
```yaml
input: ["repository_name", "directory_path", "file_extension"]
```

**Input Usage**:

The first-stage toolkit uses these inputs to generate the list:
```yaml
# First toolkit needs repository_name to know where to look
input: ["repository_name"]
toolkit: "GitHub Expert"
tool: "getFilesFromDirectory"
```

#### Output

**Purpose**: Specify state variable names to store accumulated results from all loop iterations.

**Example**:
```yaml
output: ["documentation_results", "file_count"]
```

**Output Accumulation**:

Results from each iteration of the loop tool are accumulated:

* All loop tool responses combined into single output
* Final output contains results from processing all items

#### Structured Output

**Purpose**: Enable structured output parsing for the list-generating tool.

**When to Enable**:

* List tool returns JSON or structured data
* You need to parse array of objects
* Variables Mapping depends on structured fields

**Example**:
```yaml
structured_output: true
```

!!! tip "Structured Output for List Generation"
    Almost always enable `structured_output: true` for Loop from Tool nodes, since the list tool must return an array or list of items to iterate over.

### Examples

#### Example 1: Document Files from GitHub Directory

Get files from GitHub and generate documentation for each:

```yaml
- id: "document_github_files"
  type: "loop_from_tool"
  toolkit: "GitHub Expert"
  tool: "getFilesFromDirectory"
  task: "Get all Python files from the src directory"
  structured_output: true
  loop_toolkit: "Code Documentation Agent"
  variables_mapping:
    file_path: "task"
    file_content: "source_code"
  input: ["repository_name"]
  output: ["documentation"]
  transition: "create_readme"
```

**Execution Flow**:
1. **Stage 1**: `GitHub Expert.getFilesFromDirectory` executes
      * Returns list: `[{"file_path": "/src/app.py", "file_content": "..."}, ...]`
2. **Variables Mapping**: Maps `file_path` → `task`, `file_content` → `source_code`
3. **Stage 2**: For each file:
      * Calls `Code Documentation Agent` with `{"task": "/src/app.py", "source_code": "..."}`
4. **Output**: Accumulates all documentation in `documentation` state
5. **Transition**: Goes to `create_readme` node

#### Example 2: Process Confluence Pages

List Confluence pages and process each:

```yaml
- id: "process_confluence_pages"
  type: "loop_from_tool"
  toolkit: "Confluence Expert"
  tool: "listPagesWithLabel"
  structured_output: true
  loop_toolkit: "Confluence Content Processor"
  variables_mapping:
    page_id: "task"
    page_title: "title"
    page_content: "content"
  input: ["space_key", "label"]
  output: ["processed_pages"]
  transition: "create_summary"
```

**How It Works**:

1. `listPagesWithLabel` returns pages array
2. Each page has `page_id`, `page_title`, `page_content`
3. Loop processes each page with Confluence Content Processor
4. Results accumulated in `processed_pages`

#### Example 3: Batch Create Jira Issues

Generate issues from template and create each in Jira:

```yaml
- id: "batch_create_issues"
  type: "loop_from_tool"
  toolkit: "Issue Template Generator"  # Agent that generates issue list
  task: "Generate 10 test issues for sprint planning"
  structured_output: true
  loop_toolkit: "Jira Expert"
  loop_tool: "createIssue"
  variables_mapping:
    project_id: "PROJECT_ID"
    issue_type: "ISSUE_TYPE"
    title: "TITLE"
    description: "DESCRIPTION"
  output: ["created_issues"]
  transition: "notify_team"
```

#### Example 4: Process Data from MCP Server

Get data from MCP and process each record:

```yaml
- id: "process_customer_records"
  type: "loop_from_tool"
  toolkit: "CustomerDB_MCP"
  tool: "getActiveCustomers"
  structured_output: true
  loop_toolkit: "Customer Processor Agent"
  variables_mapping:
    customer_id: "task"
    customer_name: "name"
    customer_email: "email"
    customer_status: "status"
  input: ["date_range"]
  output: ["processed_customers"]
  transition: "generate_report"
```

#### Example 5: Nested Pipeline Execution

Get list of tasks and execute pipeline for each:

```yaml
- id: "execute_task_pipelines"
  type: "loop_from_tool"
  toolkit: "Task List Generator"
  task: "Generate list of tasks from project plan"
  structured_output: true
  loop_toolkit: "Task Processing Pipeline"  # Another pipeline
  variables_mapping:
    task_id: "task"
    task_name: "name"
    task_assignee: "assignee"
  input: ["project_id"]
  output: ["pipeline_results"]
  transition: "END"
```

### Best Practices

#### 1. Ensure List Tool Returns Structured Data

The first toolkit must return an array:

✅ **Good - Tool returns array**:
```json
[
  {"file_path": "/file1.py", "content": "..."},
  {"file_path": "/file2.py", "content": "..."}
]
```

❌ **Avoid - Tool returns plain text**:
```
file1.py, file2.py, file3.py
```

#### 2. Map All Required Loop Tool Parameters

Include all necessary mappings:

✅ **Good**:
```yaml
variables_mapping:
  file_path: "task"
  file_content: "content"
  file_name: "name"
  bucket: "BUCKET_NAME"
```

#### 3. Enable Structured Output

Always enable for list generation:

✅ **Good**:
```yaml
structured_output: true
```

#### 4. Test List Generation First

Verify the list tool works before adding loop processing:

**Testing Workflow**:
1. Create simple pipeline with just the list tool
2. Verify it returns expected array
3. Check field names in output
4. Then add Loop from Tool node with verified mapping

#### 5. Use Descriptive Variable Names

Clear mapping names improve readability:

✅ **Good**:
```yaml
variables_mapping:
  customer_id: "task"
  customer_name: "name"
  customer_email: "email"
```

❌ **Avoid**:
```yaml
variables_mapping:
  id: "x"
  name: "y"
  email: "z"
```

#### 6. Handle Empty Lists

Account for no results from list tool:

**Best Practice**:

* Ensure list tool returns empty array `[]` not null
* Loop from Tool will skip execution if list is empty
* Plan transition for zero-iteration scenario

#### 7. Consider List Size Limits

Be aware of iteration count:

!!! warning "Performance Warning"
    Loop from Tool executes loop toolkit **for each item** in the list.
    
    - 100 files = 100 loop toolkit executions
    - Each execution may call LLM or external APIs
    - Consider rate limits, costs, and processing time
    
    **Recommendation**: For large lists (>50 items), consider:
    - Breaking into smaller batches
    - Using pagination in list tool
    - Adding interrupt points

#### 8. Provide Input for List Tool

Ensure list tool has needed context:

✅ **Good**:
```yaml
input: ["repository_name", "branch_name", "directory_path"]
toolkit: "GitHub Expert"
tool: "getFilesFromDirectory"
```

#### 9. Use Task for Additional Context

Provide instructions to list tool:

✅ **Good**:
```yaml
task: "Get only Python files modified in the last 7 days from src directory"
toolkit: "GitHub Expert"
tool: "getFilesFromDirectory"
```

#### 10. Document Mapping Expectations

Comment expected structure:

```yaml
# List tool returns: [{"file_path": str, "content": str, "size": int}]
# Loop tool expects: {"task": str, "data": str}
variables_mapping:
  file_path: "task"
  content: "data"
  # Note: 'size' not mapped, loop tool doesn't need it
```

#### 11. Plan for Failures

Consider what happens if list tool fails:

**Best Practice**:
- Ensure list tool has error handling
- Test with empty repositories, missing directories, etc.
- Provide default output if list generation fails

#### 12. Chain Outputs Properly

Ensure accumulated output is usable by next node:

```yaml
output: ["documentation_results"]
transition: "compile_documentation"  # This node expects 'documentation_results'
```

---

## Iteration Nodes Comparison

| Feature | Loop Node | Loop from Tool Node |
|---------|-----------|---------------------|
| **Purpose** | Execute toolkit repeatedly based on task instructions | Generate list dynamically, then process each item |
| **Input Source** | Task instructions describe how to extract/create inputs | First toolkit generates the list of inputs |
| **Iteration Logic** | Defined in Task field using natural language | Defined by output of list-generating toolkit |
| **Toolkit Selection** | Single toolkit (Toolkits/MCPs/Agents/Pipelines) | Two toolkits: list generator + item processor |
| **Tool Selection** | Optional (for Toolkits/MCPs only) | Two tools: list tool + loop tool (for Toolkits/MCPs) |
| **Variables Mapping** | Not applicable | **Required** - maps list tool outputs to loop tool inputs |
| **Configuration Complexity** | Medium (Task instructions) | High (two toolkits + variables mapping) |
| **Use When** | You can describe iteration logic in Task | You need to dynamically discover items to process |
| **List Generation** | Internal (from Task + LLM) | External (from toolkit execution) |
| **Best For** | Static lists, known iteration patterns | Dynamic lists, file discovery, database queries |
| **Example Use Case** | Process file paths mentioned in chat | Get files from GitHub directory and process each |
| **Performance** | Task execution + N toolkit calls | List tool call + N loop toolkit calls |
| **Output** | Accumulated results from all iterations | Accumulated results from all loop iterations |

### When to Use Each Node

#### Loop Node ✅

**Choose Loop Node when**:

* Items to iterate are **mentioned in chat or state**
* You can **describe extraction logic** in natural language
* List is **relatively static** or user-provided
* You want **simpler configuration** (single toolkit)
* Iteration logic is **straightforward**

**Example Scenarios**:

* "Process these 5 file paths I mentioned"
* "Create user stories for IDs 1 through 10"
* "Document all files listed in the project_files state"
* "Generate reports for each branch name in the chat"

**Example**:
```yaml
- id: "process_listed_files"
  type: "loop"
  toolkit: "Document Generator"
  task: "Process each file path mentioned in the chat_history"
  input: ["messages"]
  output: ["documentation"]
```

#### Loop from Tool Node ✅

**Choose Loop from Tool Node when**:

* Items to iterate must be **dynamically discovered**
* List comes from **external source** (GitHub, Jira, database, MCP)
* You need to **query/fetch** the list at runtime
* List generation requires **toolkit or API call**
* List size is **unknown beforehand**

**Example Scenarios**:

* "Get all files from GitHub repo and document each"
* "List all open Jira tickets and process each"
* "Query database for active users and send email to each"
* "Fetch Confluence pages with label X and analyze each"

**Example**:
```yaml
- id: "process_discovered_files"
  type: "loop_from_tool"
  toolkit: "GitHub Expert"
  tool: "getFilesFromDirectory"
  loop_toolkit: "Document Generator"
  variables_mapping:
    file_path: "task"
    file_content: "content"
  structured_output: true
  output: ["documentation"]
```

### Choosing Between Loop and Loop from Tool

| Criteria | Loop Node | Loop from Tool Node |
|----------|-----------|---------------------|
| **List is in chat/state** | ✅ **Best choice** | Can work but overcomplicated |
| **List must be fetched** | ❌ Cannot do this | ✅ **Best choice** |
| **Simple iteration** | ✅ **Best choice** | Overkill |
| **Complex discovery** | ❌ Limited by Task field | ✅ **Best choice** |
| **Known list size** | ✅ Good fit | Either works |
| **Unknown list size** | Can work with clear Task | ✅ **Best choice** |
| **Configuration speed** | ✅ Faster (1 toolkit) | Slower (2 toolkits + mapping) |
| **Maintenance** | ✅ Simpler | More complex |

!!! tip "Start Simple"
    If you're unsure, start with **Loop Node**. It's simpler to configure and test.
    
    Upgrade to **Loop from Tool Node** when you need dynamic list generation from external sources.

!!! tip "Combining Iteration Nodes"
    You can use both node types in the same pipeline:
    
    ```yaml
    nodes:
      # Use Loop from Tool to discover files
      - id: "discover_files"
        type: "loop_from_tool"
        toolkit: "GitHub Expert"
        tool: "getFilesFromDirectory"
        loop_toolkit: "File Classifier"
        variables_mapping:
          file_path: "task"
        output: ["classified_files"]
        transition: "process_high_priority"
      
      # Use Loop to process subset mentioned in chat
      - id: "process_high_priority"
        type: "loop"
        toolkit: "Priority Processor"
        task: "Process high-priority files from classified_files state"
        input: ["classified_files"]
        output: ["results"]
        transition: "END"
    ```

---

## Related

* **[Nodes Overview](overview.md)** - Understand all available node types
* **[Execution Nodes](execution-nodes.md)** - Function, Tool, Code, and Custom nodes
* **[Control Flow Nodes](control-flow-nodes.md)** - Router, Condition, and Decision nodes
* **[States](../states.md)** - Manage data flow and variables
* **[Connections](../connections.md)** - Link nodes together
* **[YAML Configuration](../yaml.md)** - Complete syntax reference with examples

