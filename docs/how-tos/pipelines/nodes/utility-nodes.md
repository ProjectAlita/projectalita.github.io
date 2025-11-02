# Utility Nodes

Utility Nodes provide specialized functionality for state management and workflow composition. These nodes form the "supporting infrastructure" of your pipeline, allowing you to manipulate state variables and execute nested pipelines within your workflow.

**Available Utility Nodes:**

- **[State Modifier Node](#state-modifier-node)** - Transform, update, and clean up state variables using templates
- **[Pipeline (Subgraph) Node](#pipeline-subgraph-node)** - Execute another pipeline as a nested component

!!! note "Supporting Infrastructure"
    Utility nodes don't perform AI inference or external API calls directly. Instead, they provide essential support functions: state manipulation and workflow composition.

---

## State Modifier Node

The State Modifier Node updates, transforms, or cleans up parts of the workflow's state using Jinja2 templates. Think of it as a "state editor" that can modify variables, generate new content from templates, or reset portions of the state to prepare for subsequent nodes.

![State Modifier Node Interface](../../../../img/how-tos/pipelines/nodes/utility/state-modifier-interface.png)

### Purpose

Use the State Modifier Node to:

- **Transform state variables** using Jinja2 template logic
- **Generate formatted content** from existing state data
- **Clean up temporary variables** after processing
- **Prepare state** for the next node in the workflow
- **Aggregate or summarize data** from multiple state variables
- **Reset counters, flags, or temporary data** to avoid stale information

### Configuration

#### Basic Configuration

```yaml
- id: "format_greeting"
  type: "state_modifier"
  template: "Hello, {{ user_name }}! Welcome to {{ project_name }}."
  input: ["user_name", "project_name"]
  output: ["greeting_message"]
  variables_to_clean: ["user_name"]
  transition: "send_greeting"
```

![State Modifier Node Basic Configuration](../../../../img/how-tos/pipelines/nodes/utility/state-modifier-basic-config.png)

### Parameters

#### Jinja Template

**Purpose**: Define a Jinja2 template string to generate new content from state variables.

**Syntax**: Uses Jinja2 templating language with access to state variables specified in Input.

![State Modifier Node Jinja Template](../../../../img/how-tos/pipelines/nodes/utility/state-modifier-template.png)

**Example Template**:
```jinja2
Hello, {{ user_name }}!

Your project "{{ project_name }}" has {{ task_count }} tasks:
{% for task in tasks %}
- {{ task.title }} (Priority: {{ task.priority }})
{% endfor %}

Next steps: {{ next_steps }}
```

**Template Features**:

**Variable Substitution**:
```jinja2
{{ variable_name }}
```

**Conditional Logic**:
```jinja2
{% if status == 'approved' %}
Your request has been approved!
{% else %}
Your request is pending review.
{% endif %}
```

**Loops**:
```jinja2
{% for item in item_list %}
- {{ item.name }}: {{ item.value }}
{% endfor %}
```

**Filters**:
```jinja2
{{ user_name|upper }}  # Convert to uppercase
{{ description|truncate(100) }}  # Limit to 100 characters
{{ items|length }}  # Get count of items
{{ text|replace('old', 'new') }}  # Replace text
```

**String Formatting**:
```jinja2
Welcome, {{ first_name }} {{ last_name }}!
Total: ${{ price|round(2) }}
Date: {{ timestamp|default('N/A') }}
```

**Multi-line Templates**:
```jinja2
Summary Report
==============
Project: {{ project_name }}
Status: {{ status }}
Completed: {{ completed_tasks }}/{{ total_tasks }}

{% if completed_tasks == total_tasks %}
🎉 All tasks completed!
{% else %}
📋 {{ total_tasks - completed_tasks }} tasks remaining.
{% endif %}
```

**Template Best Practices**:

✅ **Good - Clear structure**:
```jinja2
# User Story Summary
Title: {{ title }}
Epic: {{ epic_id }}
Priority: {{ priority|default('Medium') }}

Description:
{{ description|wordwrap(80) }}
```

✅ **Good - Handle missing variables**:
```jinja2
Hello, {{ user_name|default('User') }}!
Status: {{ status|default('Unknown') }}
```

❌ **Avoid - Accessing undefined variables**:
```jinja2
Hello, {{ user_name }}!  # Fails if user_name not in input
```

#### Input

**Purpose**: Specify which state variables the template can access for rendering.

**Options**:
- Default states: `input`, `messages`
- Custom states: Any state variables you've defined

![State Modifier Node Input](../../../../img/how-tos/pipelines/nodes/utility/state-modifier-input.png)

**Example**:
```yaml
input: ["user_name", "project_name", "task_count", "tasks"]
```

**Input Usage**:

The template can only access variables listed in Input:

```yaml
input: ["user_name", "project_id"]
template: |
  User: {{ user_name }}
  Project: {{ project_id }}
  # Can access user_name and project_id
  # Cannot access other state variables
```

**Multiple Input Variables**:
```yaml
input: ["first_name", "last_name", "email", "role", "team"]
template: |
  Name: {{ first_name }} {{ last_name }}
  Email: {{ email }}
  Role: {{ role }} ({{ team }} team)
```

**Accessing Complex Data**:
```yaml
input: ["user_profile", "tasks"]
template: |
  User: {{ user_profile.name }}
  Email: {{ user_profile.email }}
  
  Tasks:
  {% for task in tasks %}
  - {{ task.title }}
  {% endfor %}
```

#### Output

**Purpose**: Specify which state variables should be updated with the rendered template result.

**Options**:
- New state variables (will be created)
- Existing state variables (will be overwritten)

![State Modifier Node Output](../../../../img/how-tos/pipelines/nodes/utility/state-modifier-output.png)

**Example**:
```yaml
output: ["greeting_message"]
```

**Single Output**:
```yaml
output: ["formatted_summary"]
# Template result written to 'formatted_summary' state variable
```

**Multiple Outputs**:
```yaml
output: ["summary", "notification"]
# If template produces multiple values, they can be written to different variables
# However, typically template produces single string result
```

**Output Behavior**:

The rendered template result is stored in the output variable(s):

```yaml
template: "Hello, {{ user_name }}!"
input: ["user_name"]
output: ["greeting"]

# After execution:
# state["greeting"] = "Hello, John!"
```

**Overwriting Existing State**:
```yaml
output: ["input"]  # Overwrites the 'input' state variable
template: "Processed: {{ input }}"
input: ["input"]
# Original input is transformed and replaced
```

#### Variables to Clean

**Purpose**: Specify state variables to reset or clear after the template is rendered.

**Options**:
- Any state variables (typically temporary or single-use variables)
- Empty list if no cleanup needed

![State Modifier Node Variables to Clean](../../../../img/how-tos/pipelines/nodes/utility/state-modifier-variables-to-clean.png)

**Example**:
```yaml
variables_to_clean: ["temp_data", "user_input", "processing_flag"]
```

**Cleanup Behavior**:

After rendering the template and updating output variables, specified variables are reset:

```yaml
variables_to_clean: ["user_name"]

# Before cleanup:
# state["user_name"] = "John"

# After cleanup:
# state["user_name"] = ""  # Reset to empty string
```

**When to Clean Variables**:

**Temporary Data**:
```yaml
variables_to_clean: ["temp_result", "intermediate_data"]
# Clear temporary calculations after processing
```

**User Input After Processing**:
```yaml
variables_to_clean: ["user_input"]
# Reset user input after extracting needed information
```

**Flags and Counters**:
```yaml
variables_to_clean: ["processing_flag", "retry_count"]
# Reset flags and counters for next iteration
```

**Prevent Stale Data**:
```yaml
variables_to_clean: ["previous_response"]
# Clear previous responses to avoid confusion
```

**Example with Cleanup**:
```yaml
- id: "process_and_clean"
  type: "state_modifier"
  template: |
    Processed data: {{ temp_data }}
    Result: {{ calculation_result }}
  input: ["temp_data", "calculation_result"]
  output: ["final_summary"]
  variables_to_clean: ["temp_data", "calculation_result"]
  # After execution:
  # - final_summary contains rendered template
  # - temp_data and calculation_result are reset to empty
```

**Cleanup Best Practices**:

✅ **Good - Clean temporary variables**:
```yaml
variables_to_clean: ["temp_calculation", "intermediate_result"]
```

❌ **Avoid - Cleaning variables still needed**:
```yaml
variables_to_clean: ["user_id"]  # If user_id needed by later nodes
```

### Examples

#### Example 1: Format User Greeting

Create a personalized greeting message:

```yaml
- id: "create_greeting"
  type: "state_modifier"
  template: |
    Hello, {{ user_name }}!
    
    Welcome to {{ project_name }}. You have {{ task_count }} tasks assigned.
  input: ["user_name", "project_name", "task_count"]
  output: ["greeting_message"]
  transition: "send_greeting"
```

**Result**:
```
Hello, John!

Welcome to ELITEA Platform. You have 5 tasks assigned.
```

#### Example 2: Generate Summary Report

Aggregate multiple state variables into a summary:

```yaml
- id: "create_summary"
  type: "state_modifier"
  template: |
    Project Summary Report
    ======================
    Project: {{ project_name }}
    Status: {{ status }}
    
    Completed Tasks: {{ completed_count }}/{{ total_count }}
    Progress: {{ (completed_count / total_count * 100)|round(1) }}%
    
    {% if completed_count == total_count %}
    ✅ All tasks completed!
    {% else %}
    📋 {{ total_count - completed_count }} tasks remaining.
    {% endif %}
    
    Next Milestone: {{ next_milestone|default('Not set') }}
  input: ["project_name", "status", "completed_count", "total_count", "next_milestone"]
  output: ["summary_report"]
  transition: "display_report"
```

#### Example 3: Clean Up After Processing

Process data and reset temporary variables:

```yaml
- id: "process_and_cleanup"
  type: "state_modifier"
  template: |
    User Story Created:
    ID: {{ created_id }}
    Title: {{ title }}
    Epic: {{ epic_id }}
  input: ["created_id", "title", "epic_id", "temp_description", "temp_metadata"]
  output: ["creation_confirmation"]
  variables_to_clean: ["temp_description", "temp_metadata", "draft_content"]
  transition: "notify_user"
```

**Effect**:
- Creates `creation_confirmation` with formatted message
- Clears `temp_description`, `temp_metadata`, `draft_content` from state

#### Example 4: Format List Items

Transform a list into formatted text:

```yaml
- id: "format_task_list"
  type: "state_modifier"
  template: |
    Your Tasks:
    {% for task in tasks %}
    {{ loop.index }}. {{ task.title }}
       Priority: {{ task.priority|default('Medium') }}
       Due: {{ task.due_date|default('No deadline') }}
    {% endfor %}
    
    Total: {{ tasks|length }} tasks
  input: ["tasks"]
  output: ["formatted_tasks"]
  transition: "display_tasks"
```

#### Example 5: Conditional Content Generation

Generate different content based on conditions:

```yaml
- id: "generate_notification"
  type: "state_modifier"
  template: |
    {% if approval_status == 'approved' %}
    ✅ Your request has been approved!
    
    Next steps:
    1. Review the implementation plan
    2. Schedule kickoff meeting
    3. Assign team members
    {% elif approval_status == 'rejected' %}
    ❌ Your request has been rejected.
    
    Reason: {{ rejection_reason|default('Not specified') }}
    
    You can:
    - Revise your request
    - Contact the reviewer for feedback
    {% else %}
    ⏳ Your request is pending review.
    
    Submitted: {{ submission_date }}
    Reviewer: {{ reviewer_name|default('Not assigned') }}
    {% endif %}
  input: ["approval_status", "rejection_reason", "submission_date", "reviewer_name"]
  output: ["notification_message"]
  variables_to_clean: ["rejection_reason"]
  transition: "send_notification"
```

#### Example 6: Data Transformation

Transform state data into new format:

```yaml
- id: "transform_user_data"
  type: "state_modifier"
  template: |
    {{ first_name|upper }} {{ last_name|upper }}
    Email: {{ email|lower }}
    Role: {{ role|title }}
    Team: {{ team|default('Unassigned') }}
  input: ["first_name", "last_name", "email", "role", "team"]
  output: ["formatted_user_info"]
  transition: "store_user"
```

#### Example 7: Reset Workflow State

Clear multiple variables to reset workflow:

```yaml
- id: "reset_workflow"
  type: "state_modifier"
  template: "Workflow reset completed."
  output: ["reset_confirmation"]
  variables_to_clean: ["temp_input", "processing_data", "error_message", "retry_count", "step_counter"]
  transition: "start_fresh"
```

### Best Practices

#### 1. Always List Input Variables

Explicitly specify all variables used in template:

✅ **Good**:
```yaml
input: ["user_name", "project_id", "task_count"]
template: "User {{ user_name }} has {{ task_count }} tasks in project {{ project_id }}"
```

❌ **Avoid**:
```yaml
input: []  # Template will fail if it tries to access variables
```

#### 2. Use Default Filters for Optional Variables

Handle missing or null values gracefully:

✅ **Good**:
```yaml
template: |
  Name: {{ user_name|default('Unknown User') }}
  Email: {{ email|default('No email provided') }}
```

❌ **Avoid**:
```yaml
template: |
  Name: {{ user_name }}  # Fails if user_name is missing
```

#### 3. Clean Up Temporary Variables

Reset variables that are no longer needed:

✅ **Good**:
```yaml
variables_to_clean: ["temp_input", "intermediate_result", "processing_flag"]
```

#### 4. Format Long Templates for Readability

Use multi-line YAML strings with proper indentation:

✅ **Good**:
```yaml
template: |
  Project Summary
  ===============
  Name: {{ project_name }}
  Status: {{ status }}
  
  Tasks: {{ completed }}/{{ total }}
```

❌ **Avoid**:
```yaml
template: "Project Summary\n===============\nName: {{ project_name }}\nStatus: {{ status }}\n\nTasks: {{ completed }}/{{ total }}"
```

#### 5. Test Templates with Sample Data

Verify template rendering before deployment:

**Testing Process**:
1. Create State Modifier node
2. Populate state with sample data
3. Run pipeline with interrupt after State Modifier
4. Verify output contains expected content
5. Adjust template as needed

#### 6. Use Descriptive Output Names

Name outputs to indicate their content:

✅ **Good**:
```yaml
output: ["formatted_summary", "user_greeting", "task_list"]
```

❌ **Avoid**:
```yaml
output: ["result", "output1", "temp"]
```

#### 7. Document Complex Templates

Add comments explaining template logic:

```yaml
# Generate user notification based on approval status
# - Approved: Show next steps
# - Rejected: Show reason and options
# - Pending: Show status and reviewer
template: |
  {% if approval_status == 'approved' %}
  ...
```

#### 8. Validate State Before Cleaning

Ensure cleaned variables aren't needed by later nodes:

✅ **Good Workflow**:
```yaml
- id: "process_data"
  type: "state_modifier"
  template: "Processed: {{ temp_data }}"
  input: ["temp_data"]
  output: ["final_result"]
  variables_to_clean: ["temp_data"]  # Safe, temp_data no longer needed
  transition: "display_result"  # Next node uses final_result, not temp_data
```

❌ **Avoid**:
```yaml
- id: "process_data"
  type: "state_modifier"
  variables_to_clean: ["user_id"]  # Bad if later nodes need user_id
```

#### 9. Use State Modifier for Formatting Only

Don't use for complex logic - use LLM or Code nodes instead:

✅ **Good - Simple formatting**:
```yaml
template: "Hello, {{ user_name }}! You have {{ count }} notifications."
```

❌ **Avoid - Complex processing**:
```yaml
template: |
  # Don't do complex calculations or API calls in templates
  {% set result = complex_calculation(data) %}  # Use Code node instead
```

#### 10. Combine Multiple Variables in Output

Generate comprehensive output in single template:

✅ **Good**:
```yaml
template: |
  User: {{ user_name }}
  Project: {{ project_name }}
  Status: {{ status }}
  Tasks: {{ task_count }}
output: ["complete_summary"]
```

❌ **Avoid - Multiple State Modifiers for simple concatenation**:
```yaml
# Don't create separate State Modifiers for each field
# when one template can generate all content
```

---

## Pipeline (Subgraph) Node

The Pipeline (Subgraph) Node executes another pipeline as a nested component within your workflow. This allows you to compose complex workflows from smaller, reusable pipeline modules, promoting modularity and maintainability.

![Pipeline Subgraph Node Interface](../../../../img/how-tos/pipelines/nodes/utility/pipeline-subgraph-interface.png)

### Purpose

Use the Pipeline (Subgraph) Node to:

- **Execute nested pipelines** within your main workflow
- **Reuse pipeline modules** across multiple parent pipelines
- **Modularize complex workflows** into smaller, manageable components
- **Create hierarchical pipeline structures** with parent-child relationships
- **Isolate functionality** in separate pipeline units
- **Simplify maintenance** by breaking large pipelines into focused modules

### Configuration

#### Basic Configuration

```yaml
- id: "execute_bug_pipeline"
  type: "pipeline"
  toolkit: "BUG - 2103"
  input: ["bug_description", "severity"]
  output: ["bug_analysis_result"]
  transition: "process_results"
```

![Pipeline Subgraph Node Basic Configuration](../../../../img/how-tos/pipelines/nodes/utility/pipeline-subgraph-basic-config.png)

### Parameters

#### Toolkit

**Purpose**: Select the pipeline to execute as a subgraph.

**Options**: Only **Pipelines** can be selected - no Toolkits, MCPs, or Agents.

![Pipeline Subgraph Node Toolkit](../../../../img/how-tos/pipelines/nodes/utility/pipeline-subgraph-toolkit.png)

**Example**:
```yaml
toolkit: "BUG - 2103"  # Name of the pipeline to execute
```

**Pipeline Selection**:

The dropdown shows all available pipelines in your ELITEA workspace:
- Pipeline must exist and be accessible
- Pipeline name must match exactly
- Selected pipeline executes as nested component

**Pipeline Execution**:

When the Pipeline node executes:
1. Parent pipeline passes input state to child pipeline
2. Child pipeline executes completely
3. Child pipeline output returned to parent pipeline
4. Parent pipeline continues with output from child

**Example Flow**:
```yaml
# Parent Pipeline
- id: "main_workflow"
  type: "llm"
  output: ["bug_description"]
  transition: "analyze_bug"

- id: "analyze_bug"
  type: "pipeline"
  toolkit: "Bug Analysis Pipeline"  # Executes child pipeline
  input: ["bug_description"]
  output: ["analysis_result"]
  transition: "create_ticket"

- id: "create_ticket"
  type: "function"
  input: ["analysis_result"]
  # Uses output from child pipeline
```

**Nested Pipeline Benefits**:

**Reusability**:
```yaml
# Multiple parent pipelines can call same child pipeline
Parent Pipeline A → Bug Analysis Pipeline
Parent Pipeline B → Bug Analysis Pipeline
Parent Pipeline C → Bug Analysis Pipeline
```

**Modularity**:
```yaml
# Break complex workflow into focused modules
Main Pipeline:
  ├─ Data Collection Pipeline
  ├─ Data Processing Pipeline
  └─ Report Generation Pipeline
```

**Maintenance**:
```yaml
# Update child pipeline once, affects all parents
Bug Analysis Pipeline (updated) →
  ← Parent Pipeline A (automatically uses new version)
  ← Parent Pipeline B (automatically uses new version)
```

#### Input

**Purpose**: Specify which state variables from the parent pipeline to pass to the child pipeline.

**Options**:
- Default states: `input`, `messages`
- Custom states: Any state variables defined in parent pipeline

**Example**:
```yaml
input: ["bug_description", "severity", "repository_name"]
```

**Input Mapping**:

State variables from parent pipeline are passed to child pipeline:

```yaml
# Parent Pipeline State:
{
  "bug_description": "Login button not responding",
  "severity": "high",
  "repository_name": "frontend-app"
}

# Pipeline Node Configuration:
input: ["bug_description", "severity"]

# Child Pipeline Receives:
{
  "bug_description": "Login button not responding",
  "severity": "high"
  # repository_name NOT passed (not in input list)
}
```

**Passing All State**:
```yaml
input: ["input", "messages", "custom_var1", "custom_var2"]
# Explicitly list all variables to pass
```

**Selective Passing**:
```yaml
input: ["bug_description"]
# Only pass specific variables child pipeline needs
```

#### Output

**Purpose**: Specify which state variables in the parent pipeline should be updated with results from the child pipeline.

**Options**:
- New state variables (will be created)
- Existing state variables (will be overwritten)

**Example**:
```yaml
output: ["analysis_result", "recommended_actions"]
```

**Output Mapping**:

Child pipeline output is written to parent pipeline state:

```yaml
# Child Pipeline Returns:
{
  "analysis": "Bug in event handler",
  "priority": "P1",
  "actions": ["Fix event binding", "Add error handling"]
}

# Pipeline Node Configuration:
output: ["analysis_result"]

# Parent Pipeline State Updated:
{
  "analysis_result": {
    "analysis": "Bug in event handler",
    "priority": "P1",
    "actions": ["Fix event binding", "Add error handling"]
  }
}
```

**Multiple Outputs**:
```yaml
output: ["bug_analysis", "fix_recommendations", "test_cases"]
# Child pipeline can return multiple values to different variables
```

**Overwriting Parent State**:
```yaml
output: ["input"]  # Overwrites parent's input variable
# Use cautiously - may lose original parent state
```

#### Interrupt Before / Interrupt After

**Purpose**: Control execution pausing for inspection or user intervention.

**Options**:
- **Interrupt Before**: Pause before executing child pipeline
- **Interrupt After**: Pause after child pipeline completes

**Example**:
```yaml
interrupt_before: true
interrupt_after: true
```

**When to Use Interrupts**:

**Interrupt Before**:
- Review input state before child execution
- Verify correct data passed to child pipeline
- Debug parent-to-child data flow

**Interrupt After**:
- Inspect child pipeline output
- Verify child pipeline execution completed correctly
- Review data returned to parent pipeline

### Examples

#### Example 1: Bug Analysis Module

Execute a specialized bug analysis pipeline:

```yaml
- id: "analyze_reported_bug"
  type: "pipeline"
  toolkit: "Bug Analysis Pipeline"
  input: ["bug_description", "severity", "affected_component"]
  output: ["bug_analysis"]
  transition: "create_jira_ticket"
```

**Use Case**: Parent pipeline collects bug report, child pipeline analyzes it, parent pipeline creates ticket.

#### Example 2: Document Generation Workflow

Call a document generation pipeline:

```yaml
- id: "generate_documentation"
  type: "pipeline"
  toolkit: "Code Documentation Pipeline"
  input: ["repository_name", "file_paths", "documentation_style"]
  output: ["generated_docs"]
  transition: "review_docs"
```

**Use Case**: Main workflow prepares file list, documentation pipeline generates docs, main workflow handles review.

#### Example 3: Multi-Stage Processing

Chain multiple pipeline subgraphs:

```yaml
nodes:
  - id: "collect_data"
    type: "llm"
    output: ["raw_data"]
    transition: "validate_data"
  
  - id: "validate_data"
    type: "pipeline"
    toolkit: "Data Validation Pipeline"
    input: ["raw_data"]
    output: ["validated_data"]
    transition: "process_data"
  
  - id: "process_data"
    type: "pipeline"
    toolkit: "Data Processing Pipeline"
    input: ["validated_data"]
    output: ["processed_data"]
    transition: "generate_report"
  
  - id: "generate_report"
    type: "pipeline"
    toolkit: "Report Generation Pipeline"
    input: ["processed_data"]
    output: ["final_report"]
    transition: "END"
```

**Use Case**: Modular data pipeline with separate validation, processing, and reporting stages.

#### Example 4: Conditional Pipeline Execution

Execute different pipelines based on conditions:

```yaml
- id: "determine_workflow"
  type: "llm"
  output: ["workflow_type"]
  transition: "route_workflow"

- id: "route_workflow"
  type: "router"
  condition: |
    {% if workflow_type == 'bug_fix' %}
    bug_pipeline
    {% elif workflow_type == 'feature' %}
    feature_pipeline
    {% else %}
    general_pipeline
    {% endif %}
  routes: ["bug_pipeline", "feature_pipeline", "general_pipeline"]
  input: ["workflow_type"]
  default_output: "general_pipeline"

- id: "bug_pipeline"
  type: "pipeline"
  toolkit: "Bug Fix Pipeline"
  input: ["bug_details"]
  output: ["bug_result"]
  transition: "END"

- id: "feature_pipeline"
  type: "pipeline"
  toolkit: "Feature Development Pipeline"
  input: ["feature_requirements"]
  output: ["feature_result"]
  transition: "END"

- id: "general_pipeline"
  type: "pipeline"
  toolkit: "General Workflow Pipeline"
  input: ["task_description"]
  output: ["general_result"]
  transition: "END"
```

#### Example 5: Iterative Pipeline Execution

Execute pipeline for multiple items using Loop node:

```yaml
- id: "process_multiple_bugs"
  type: "loop"
  toolkit: "Bug Analysis Pipeline"
  task: |
    For each bug in the bug_list state variable:
    - Pass bug_id and bug_description
    - Execute Bug Analysis Pipeline
  input: ["bug_list"]
  output: ["all_bug_analyses"]
  transition: "compile_report"
```

**Use Case**: Process a list of bugs, executing the same pipeline for each one.

### Best Practices

#### 1. Design Child Pipelines for Reusability

Create focused, single-purpose pipelines:

✅ **Good - Focused child pipeline**:
```yaml
# Bug Analysis Pipeline: Only analyzes bugs
# Can be called from multiple parent pipelines
```

❌ **Avoid - Overly specific child pipeline**:
```yaml
# "Project X Bug Analysis for Sprint 5 Pipeline"
# Too specific, hard to reuse
```

#### 2. Pass Only Needed Input

Don't pass entire parent state unnecessarily:

✅ **Good**:
```yaml
input: ["bug_description", "severity"]  # Only what child needs
```

❌ **Avoid**:
```yaml
input: ["input", "messages", "var1", "var2", "var3", ...]  # Passing everything
```

#### 3. Use Clear Output Names

Name outputs to indicate child pipeline results:

✅ **Good**:
```yaml
output: ["bug_analysis_result", "recommended_fix"]
```

❌ **Avoid**:
```yaml
output: ["result", "output"]
```

#### 4. Document Parent-Child Relationship

Comment on what child pipeline does:

```yaml
# Execute Bug Analysis Pipeline to analyze reported bug
# Returns: bug severity, root cause, recommended actions
- id: "analyze_bug"
  type: "pipeline"
  toolkit: "Bug Analysis Pipeline"
  input: ["bug_description"]
  output: ["analysis_result"]
```

#### 5. Test Child Pipeline Independently

Verify child pipeline works before nesting:

**Testing Workflow**:
1. Test child pipeline standalone with sample input
2. Verify child pipeline produces expected output
3. Then integrate into parent pipeline
4. Test parent-child interaction

#### 6. Avoid Deep Nesting

Limit nesting depth for maintainability:

✅ **Good - 2-3 levels**:
```
Main Pipeline
  ├─ Data Processing Pipeline
  └─ Report Generation Pipeline
```

❌ **Avoid - Deep nesting**:
```
Main Pipeline
  └─ Pipeline A
      └─ Pipeline B
          └─ Pipeline C
              └─ Pipeline D  # Too deep
```

#### 7. Handle Pipeline Failures

Plan for child pipeline errors:

```yaml
- id: "execute_analysis"
  type: "pipeline"
  toolkit: "Analysis Pipeline"
  input: ["data"]
  output: ["analysis"]
  transition: "check_result"

- id: "check_result"
  type: "condition"
  conditional_input: "analysis"
  condition: |
    {% if analysis %}
    process_success
    {% else %}
    handle_error
    {% endif %}
  conditional_outputs: ["process_success"]
  default_output: "handle_error"
```

#### 8. Use Interrupts for Debugging

Enable interrupts during development:

```yaml
interrupt_before: true  # Review input before child executes
interrupt_after: true   # Review output after child completes
```

**Disable in production**:
```yaml
interrupt_before: false
interrupt_after: false
```

#### 9. Version Child Pipelines

Maintain stable child pipeline versions:

**Best Practice**:
- Create versioned copies of child pipelines (e.g., "Bug Analysis v1", "Bug Analysis v2")
- Parent pipelines reference specific versions
- Test changes in new versions before updating parents

#### 10. Monitor Execution Performance

Be aware of nested execution overhead:

!!! warning "Performance Considerations"
    Each Pipeline node adds overhead:
    - Child pipeline initialization
    - State copying between parent and child
    - Additional transitions and node executions
    
    For performance-critical workflows:
    - Minimize nesting depth
    - Optimize child pipelines
    - Consider combining simple child pipelines into parent

---

## Utility Nodes Comparison

| Feature | State Modifier Node | Pipeline (Subgraph) Node |
|---------|---------------------|--------------------------|
| **Purpose** | Transform and clean up state variables | Execute nested pipeline within workflow |
| **Primary Function** | State manipulation using templates | Workflow composition and modularity |
| **Core Mechanism** | Jinja2 template rendering | Nested pipeline execution |
| **Input** | State variables for template | State variables passed to child pipeline |
| **Output** | Rendered template result | Child pipeline results |
| **Template Support** | Yes (Jinja2) | No (child pipeline handles logic) |
| **Variable Cleanup** | Yes (variables_to_clean) | No (child pipeline manages own state) |
| **Complexity** | Low (template-based) | Medium (pipeline composition) |
| **Use for Data** | Formatting, aggregation, transformation | Complete workflow execution |
| **Reusability** | Template can be reused | Pipeline can be called from multiple parents |
| **Best For** | Formatting messages, cleaning state, generating summaries | Modular workflows, reusable components, complex logic |
| **Example Use Case** | Format user greeting, generate report summary | Execute bug analysis module, run validation workflow |
| **Execution Overhead** | Minimal (template rendering) | Higher (full pipeline execution) |
| **Debugging** | Review template and output | Review child pipeline execution + output |

### When to Use Each Node

#### State Modifier Node ✅

**Choose State Modifier Node when you need to**:
- **Format text or messages** using state data
- **Transform state variables** with simple logic
- **Generate summaries or reports** from existing state
- **Clean up temporary variables** after processing
- **Prepare state** for the next node
- **Concatenate or aggregate data** from multiple variables

**Example Scenarios**:
- "Format a greeting message with user name and project info"
- "Generate a summary report from task counts and status"
- "Clean up temporary input after extracting needed data"
- "Transform user data into formatted profile string"

**Example**:
```yaml
- id: "format_message"
  type: "state_modifier"
  template: "Hello, {{ user }}! You have {{ count }} tasks."
  input: ["user", "count"]
  output: ["greeting"]
```

#### Pipeline (Subgraph) Node ✅

**Choose Pipeline (Subgraph) Node when you need to**:
- **Execute a reusable workflow module**
- **Modularize complex pipelines** into smaller components
- **Create hierarchical workflows** with parent-child relationships
- **Reuse the same logic** across multiple pipelines
- **Isolate complex functionality** in separate pipeline
- **Compose workflows** from tested, stable modules

**Example Scenarios**:
- "Execute a bug analysis workflow within the main pipeline"
- "Call a data validation pipeline before processing"
- "Run a report generation module after data collection"
- "Execute different specialized pipelines based on workflow type"

**Example**:
```yaml
- id: "analyze_bug"
  type: "pipeline"
  toolkit: "Bug Analysis Pipeline"
  input: ["bug_description"]
  output: ["analysis"]
```

### Choosing Between State Modifier and Pipeline Subgraph

| Criteria | State Modifier Node | Pipeline (Subgraph) Node |
|----------|---------------------|--------------------------|
| **Simple text formatting** | ✅ **Best choice** | Overkill |
| **Complex multi-step logic** | ❌ Limited to templates | ✅ **Best choice** |
| **State cleanup needed** | ✅ **Best choice** | N/A |
| **Reusable workflow** | ❌ Can't reuse templates easily | ✅ **Best choice** |
| **Data transformation** | ✅ Good for simple transforms | Use for complex processing |
| **Workflow modularization** | ❌ Not applicable | ✅ **Best choice** |
| **Performance critical** | ✅ Minimal overhead | Slower (nested execution) |
| **Message generation** | ✅ **Best choice** | Overkill |
| **Call external APIs** | ❌ Cannot do | ✅ Child pipeline can |
| **LLM processing needed** | ❌ Cannot do | ✅ Child pipeline can |

!!! tip "Complementary Usage"
    State Modifier and Pipeline nodes often work together:
    
    ```yaml
    # Main Pipeline
    - id: "collect_data"
      type: "llm"
      output: ["raw_data"]
      transition: "process_data"
    
    # Execute complex processing in child pipeline
    - id: "process_data"
      type: "pipeline"
      toolkit: "Data Processing Pipeline"
      input: ["raw_data"]
      output: ["processed_data"]
      transition: "format_result"
    
    # Format output with State Modifier
    - id: "format_result"
      type: "state_modifier"
      template: |
        Processing Complete
        ===================
        Items processed: {{ processed_data.count }}
        Status: {{ processed_data.status }}
      input: ["processed_data"]
      output: ["formatted_message"]
      transition: "END"
    ```

---

## Related

- **[Nodes Overview](overview.md)** - Understand all available node types
- **[Execution Nodes](execution-nodes.md)** - Function, Tool, Code, and Custom nodes
- **[Control Flow Nodes](control-flow-nodes.md)** - Router, Condition, and Decision nodes
- **[Iteration Nodes](iteration-nodes.md)** - Loop and Loop from Tool nodes
- **[States](../states.md)** - Comprehensive state management guide
- **[Connections](../connections.md)** - Link nodes together
- **[YAML Configuration](../yaml.md)** - Complete syntax reference with examples

## State Modifier Node

[Content to be added]

### Purpose

[Content to be added]

### Configuration

[Content to be added]

### Parameters

[Content to be added]

### Examples

[Content to be added]

### Best Practices

[Content to be added]

## Pipeline (Subgraph) Node

[Content to be added]

### Purpose

[Content to be added]

### Configuration

[Content to be added]

### Parameters

[Content to be added]

### Examples

[Content to be added]

### Best Practices

[Content to be added]

## Utility Nodes Comparison

[Content to be added]

| Feature | State Modifier Node | Pipeline (Subgraph) Node |
|---------|---------------------|--------------------------|
| **Purpose** | [Content to be added] | [Content to be added] |
| **Use Cases** | [Content to be added] | [Content to be added] |
| **Complexity** | [Content to be added] | [Content to be added] |
| **When to Use** | [Content to be added] | [Content to be added] |

## Related

- [Nodes Overview](overview.md)
- [States](../states.md)
- [YAML Configuration](../yaml.md)
