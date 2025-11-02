# Interaction Nodes

Interaction Nodes enable your pipeline to communicate with AI models and delegate tasks to specialized agents. These nodes form the "intelligent" layer of your workflow, allowing pipelines to generate text, analyze content, make decisions, and leverage pre-built AI capabilities.

**Available Interaction Nodes:**

* **[LLM Node](#llm-node)** - Directly interact with Large Language Models
* **[Agent Node](#agent-node)** - Delegate tasks to pre-configured AI agents

---

## LLM Node

The LLM Node provides direct access to Large Language Models (GPT-4, Claude, etc.) for text generation, analysis, extraction, and decision-making. It's the most versatile interaction node, supporting chat history, tool calling, and structured output extraction.

![LLM Node Interface](../../../../img/how-tos/pipelines/nodes/interaction/llm-node-interface.png)

### Purpose

Use the LLM Node to:

* **Generate text** based on prompts and context
* **Analyze content** and extract insights
* **Extract structured data** from unstructured text
* **Have conversations** with full chat history support
* **Call tools** via function calling
* **Make intelligent decisions** based on context

### Configuration

#### Basic Configuration

```yaml
- id: "analyze_feedback"
  type: "llm"
  input: ["user_input", "messages"]
  output: ["analysis", "sentiment"]
  structured_output: true
```

![LLM Node Basic Configuration](../../../../img/how-tos/pipelines/nodes/interaction/llm-node-basic-config.png)

#### Prompt Configuration

The LLM Node supports three types of prompt configurations:

**1. Fixed Prompt** (Type: `Fixed`)

Simple static instructions:

```yaml
- id: "generate_summary"
  type: "llm"
  prompt:
    type: "fixed"
    value: "Summarize the following text in 3 bullet points."
  input: ["messages"]
```

**2. F-String Prompt** (Type: `F-String`)

Dynamic prompts using state variables:

```yaml
- id: "personalized_response"
  type: "llm"
  prompt:
    type: "fstring"
    value: "Create a response for user {user_name} about {topic}. Use {tone} tone."
  input: ["user_name", "topic", "tone", "messages"]
```

**3. Variable Prompt** (Type: `Variable`)

Use a state variable as the entire prompt:

```yaml
- id: "dynamic_prompt"
  type: "llm"
  prompt:
    type: "variable"
    value: "instruction_from_state"
  input: ["instruction_from_state", "messages"]
```

![LLM Node Prompt Types](../../../../img/how-tos/pipelines/nodes/interaction/llm-node-prompt-types.png)

### Parameters

#### System

**Purpose**: Provide system-level instructions that set the LLM's behavior, role, or constraints.

**Type Options**:

* `Fixed` - Static system message
* `F-String` - System message with variables
* `Variable` - System message from state

**Example**:
```yaml
System:
  Type: Fixed
  Value: "You are a helpful technical documentation assistant. Always provide clear, accurate information."
```

#### Task

**Purpose**: Define the specific task or user request the LLM should process.

**Type Options**:

* `Fixed` - Static task
* `F-String` - Task with embedded variables
* `Variable` - Task from state variable

**Example**:

```yaml
Task:
  Type: F-String
  Value: "Analyze the user story: {user_story} and extract the requirements."
```

#### Chat History

**Purpose**: Provide conversation context from previous interactions.

**Type Options**:

* `Fixed` - Empty array `[]` (no history)
* `Variable` - Use `messages` state variable

**Example**:
```yaml
Chat history:
  Type: Variable
  Value: messages
Chat history:
  Type: Fixed
  Value: []  # No chat history
```

**With History**:
```yaml
Chat history:
  Type: Variable
  Value: messages  # Use conversation history from state
```

![LLM Node Parameters](../../../../img/how-tos/pipelines/nodes/interaction/llm-node-parameters.png)

#### Input

**Purpose**: Specify which state variables the LLM node reads from.

**Options**:

* Default states: `input`, `messages`
* Custom states: Any state variables you've defined

**Example**:

```yaml
Input:
  - input
  - messages
  - user_context
  - previous_results
```

![LLM Node Input Selection](../../../../img/how-tos/pipelines/nodes/interaction/llm-node-input-selection.png)

#### Output

**Purpose**: Define which state variables the LLM's response should populate.

**Options**:

* Default: `messages` (conversation history)
* Custom states: Define specific variables to extract

!!! warning "Important: Messages in Output for Interrupts"
    If you want meaningful output from LLM nodes with **structured output** during **interrupts**, it is **mandatory** to include `messages` in the output variables. Without `messages`, interrupt output may be incomplete or unclear.

**Example**:

```yaml
Output:
  - extracted_title
  - extracted_description
  - messages  # Required for interrupts with structured output
```yaml
Output:
  - extracted_title
  - extracted_description
  - messages  # Required for interrupts with structured output
```

![LLM Node Output Configuration](../../../../img/how-tos/pipelines/nodes/interaction/llm-node-output-config.png)

#### Toolkits

**Purpose**: Bind external tools and MCPs to the LLM for function calling.

**Available Options**:

* **Toolkits** - External service integrations (Jira, GitHub, Slack, etc.)
* **MCPs** (Model Context Protocol servers) - Custom integrations

**Selection Process**:

1. **Select Toolkit/MCP**: Choose one or more toolkits or MCPs from the dropdown
2. **Tool Dropdown Appears**: After selecting a toolkit, a corresponding "Tools" dropdown appears
3. **Select Tools**: Choose specific tools from the toolkit to make available to the LLM
4. **Multiple Toolkits**: You can select multiple toolkits; each gets its own tool selection dropdown

![LLM Node Toolkit Selection](../../../../img/how-tos/pipelines/nodes/interaction/llm-node-toolkit-selection.png)

**Example Configuration**:
```yaml
Toolkits:
  EPMALTA:
    - remove_index
    - list_collections
    - create_page
```

**How Tool Calling Works**:

1. LLM receives user request
2. LLM decides which tool(s) to call based on available tools
3. LLM generates tool call with appropriate arguments
4. Pipeline executes the tool
5. Tool result is returned to LLM
6. LLM formulates final response

![LLM Node Tool Calling Flow](../../../../img/how-tos/pipelines/nodes/interaction/llm-node-tool-calling.png)

#### Interrupt Before/After

**Purpose**: Pause pipeline execution before or after this node for inspection or user intervention.

**Use Cases**:

* Debug LLM responses
* Review extracted data before proceeding
* Allow user approval before continuing
* Inspect state at critical points

**Configuration**:
```yaml
Interrupt before: [enabled/disabled]
Interrupt after: [enabled/disabled]
```

#### Structured Output

**Purpose**: Force the LLM to return data in a structured format matching your output variables.

**When Enabled**:

* LLM response is parsed into individual state variables
* Output must match defined output variable types
* More reliable data extraction

**When Disabled**:

* LLM returns free-form text
* Response goes to `messages` state
* More flexible but less structured

**Example with Structured Output**:
```yaml
- id: "extract_user_story"
  type: "llm"
  structured_output: true
  output: ["title", "description", "acceptance_criteria", "messages"]
  prompt:
    type: "fixed"
    value: "Extract the title, description, and acceptance criteria from this user story."
```

**Result**: State variables `title`, `description`, and `acceptance_criteria` are populated with extracted values.

![LLM Node Structured Output](../../../../img/how-tos/pipelines/nodes/interaction/llm-node-structured-output.png)

### Examples

#### Example 1: Simple Text Generation

Generate a response based on user input:

```yaml
- id: "generate_response"
  type: "llm"
  input: ["input", "messages"]
  output: ["messages"]
  prompt:
    type: "fixed"
    value: "Provide a helpful response to the user's question."
```

#### Example 2: Structured Data Extraction

Extract specific fields from text:

```yaml
- id: "extract_requirements"
  type: "llm"
  input: ["user_story", "messages"]
  output: ["title", "description", "priority", "messages"]
  structured_output: true
  prompt:
    type: "fstring"
    value: |
      Extract the following from this user story: {user_story}
      - Title
      - Description
      - Priority (high/medium/low)
```

**Result**:

* `title` = "User Authentication"
* `description` = "Implement secure login..."
* `priority` = "high"
* `messages` = Full conversation with extraction details

#### Example 3: LLM with Tool Calling

LLM can search Confluence and create Jira tickets:

```yaml
- id: "research_and_create_ticket"
  type: "llm"
  input: ["task_description", "messages"]
  output: ["ticket_id", "messages"]
  prompt:
    type: "fstring"
    value: |
      Task: {task_description}
      
      1. Search Confluence for relevant documentation
      2. Create a Jira ticket with the findings
  toolkits:
    confluence_toolkit:
      - search_by_title
    jira_toolkit:
      - create_issue
```

**Execution Flow**:

1. LLM receives task description
2. LLM calls `confluence_toolkit.search_by_title`
3. LLM reviews search results
4. LLM calls `jira_toolkit.create_issue` with extracted info
5. LLM returns ticket ID

#### Example 4: Conversational LLM

Multi-turn conversation with context:

```yaml
- id: "conversation_partner"
  type: "llm"
  input: ["input", "messages", "user_preference"]
  output: ["messages"]
  prompt:
    type: "fstring"
    value: |
      You are a friendly assistant helping with {user_preference}.
      Maintain context from previous messages and provide personalized responses.
```

#### Example 5: Dynamic System Instructions

System message from state variable:

```yaml
- id: "adaptive_assistant"
  type: "llm"
  system:
    type: "variable"
    value: "custom_system_prompt"
  task:
    type: "variable"
    value: "user_request"
  input: ["custom_system_prompt", "user_request", "messages"]
  output: ["messages"]
```

### Best Practices

#### 1. Always Include `messages` in Output for Interrupts

When using structured output with interrupts:

✅ **Correct**:
```yaml
output: ["extracted_data", "status", "messages"]
structured_output: true
```

❌ **Avoid**:
```yaml
output: ["extracted_data", "status"]  # Missing messages
structured_output: true
```

#### 2. Use Appropriate Prompt Types

* **Fixed**: For static, unchanging instructions
* **F-String**: When you need to inject specific state variables
* **Variable**: When the entire prompt comes from state

#### 3. Limit Tool Binding

Only bind tools the LLM actually needs:

✅ **Good**: Select specific relevant tools
```yaml
toolkits:
  jira_toolkit:
    - create_issue
    - update_issue
```

❌ **Avoid**: Binding all tools unnecessarily
```yaml
toolkits:
  jira_toolkit:
    - [all 50+ tools selected]  # Confuses LLM
```

#### 4. Structure Your Prompts

Use clear, structured prompts:

✅ **Good**:
```yaml
prompt:
  type: "fstring"
  value: |
    ## Task
    Analyze the user story: {user_story}
    
    ## Requirements
    Extract:
    1. Title
    2. Description
    3. Acceptance Criteria
    
    ## Output Format
    Provide structured data for each field.
```

❌ **Avoid**: Vague prompts
```yaml
prompt:
  type: "fixed"
  value: "Do something with the data"
```

#### 5. Specify Output Variables Clearly

Match output variables to what you're extracting:

✅ **Good**:
```yaml
output: ["jira_project_id", "epic_id", "user_story_title", "messages"]
structured_output: true
```

#### 6. Use Chat History Wisely

- Include `messages` in input when context matters
- Use `[]` (empty array) for stateless single-turn requests

#### 7. Test with Interrupts

Use interrupts during development to verify LLM outputs:

```yaml
interrupt_after: true  # Pause after this node to inspect results
```

#### 8. Handle Tool Calling Errors

When using toolkits, account for potential tool failures in your prompt:

```yaml
prompt:
  type: "fixed"
  value: |
    Use available tools to complete the task.
    If a tool fails, explain what went wrong and suggest alternatives.
```

---

## Agent Node

The Agent Node allows you to delegate tasks to pre-configured AI agents that have been added to your pipeline. Instead of configuring LLM behavior from scratch, you leverage existing agents with specialized capabilities, prompts, and toolkits.

![Agent Node Interface](../../../../img/how-tos/pipelines/nodes/interaction/agent-node-interface.png)

### Purpose

Use the Agent Node to:

* **Delegate complex tasks** to specialized agents
* **Reuse existing agents** across multiple pipelines
* **Maintain consistency** with pre-configured agent behavior
* **Simplify workflows** by avoiding duplicate LLM configuration
* **Leverage agent-specific toolkits** and integrations

### Configuration

#### Basic Configuration

```yaml
- id: "content_reviewer"
  type: "agent"
  tool: "content_review_agent"
  input: ["draft_content", "messages"]
  output: ["review_result", "messages"]
```

![Agent Node Basic Configuration](../../../../img/how-tos/pipelines/nodes/interaction/agent-node-basic-config.png)

### Parameters

#### Agent

**Purpose**: Select which pre-configured agent to execute.

**Options**: Only agents that have been **added to the pipeline** appear in the dropdown.

**How to Add Agents**:

1. In Pipeline Configuration, go to the **Toolkits** section
2. Select agents from available agents
3. Added agents then become available in Agent Node dropdown

![Agent Node Agent Selection](../../../../img/how-tos/pipelines/nodes/interaction/agent-node-agent-selection.png)

**Example**:
```yaml
Agent: content_review_agent
```

#### Input

**Purpose**: Specify which state variables the agent reads from.

**Options**:

* Default states: `input`, `messages`
* Custom states: Any state variables you've defined

**Example**:
```yaml
Input:
  - user_feedback
  - draft_content
  - messages
```

#### Output

**Purpose**: Define which state variables the agent's response should populate.

**Options**:
- Default: `messages` (conversation history)
- Custom states: Specific variables the agent should populate

**Example**:
```yaml
Output:
  - review_result
  - approval_status
  - messages
```

#### Input Mapping

**Purpose**: Map pipeline state variables to the agent's expected input parameters.

**When It Appears**: The Input Mapping section appears **after you select an agent** from the dropdown.

**Default Mappings**:
Every agent node includes these two default mappings:

1. **TASK** - The specific task instruction for the agent
2. **CHAT_HISTORY** - Conversation history to provide context

![Agent Node Input Mapping Default](../../../../img/how-tos/pipelines/nodes/interaction/agent-node-input-mapping.png)

**Additional Mappings**:
If the selected agent has **custom variables** defined, those variables also appear as subsections under Input Mapping.

**Type Options for Each Mapping**:

* **F-String** - Formatted string with state variable placeholders
* **Variable** - Direct reference to a state variable
* **Fixed** - Static value

![Agent Node Input Mapping Types](../../../../img/how-tos/pipelines/nodes/interaction/agent-node-input-mapping-types.png)

**Example Configuration**:

```yaml
Input Mapping:
  TASK:
    Type: F-String
    Value: "Review the following content: {draft_content}. Provide feedback on clarity and accuracy."
  
  CHAT_HISTORY:
    Type: Fixed
    Value: []  # No history needed
```

**With Agent Variables**:

If the agent has a variable called `review_guidelines`:

```yaml
Input Mapping:
  TASK:
    Type: F-String
    Value: "Review: {draft_content}"
  
  CHAT_HISTORY:
    Type: Variable
    Value: messages
  
  review_guidelines:
    Type: Variable
    Value: company_standards  # Map to pipeline state
```

#### Interrupt Before/After

**Purpose**: Pause execution before or after the agent executes.

**Use Cases**:

* Verify agent selection
* Review agent output before proceeding
* Debug agent behavior

**Configuration**:
```yaml
Interrupt before: [enabled/disabled]
Interrupt after: [enabled/disabled]
```

### Examples

#### Example 1: Simple Agent Delegation

Delegate content review to a specialized agent:

```yaml
- id: "review_content"
  type: "agent"
  tool: "content_reviewer_agent"
  input: ["draft_article", "messages"]
  output: ["review_feedback", "messages"]
  input_mapping:
    task:
      type: "fstring"
      value: "Review this article: {draft_article}"
    chat_history:
      type: "fixed"
      value: []
```

#### Example 2: Agent with Variable Task

Task instruction comes from state:

```yaml
- id: "dynamic_task_agent"
  type: "agent"
  tool: "general_purpose_agent"
  input: ["task_instruction", "context_data", "messages"]
  output: ["agent_result", "messages"]
  input_mapping:
    task:
      type: "variable"
      value: "task_instruction"
    chat_history:
      type: "variable"
      value: "messages"
```

#### Example 3: Agent with Custom Variables

Agent has a custom `target_audience` variable:

```yaml
- id: "content_generator"
  type: "agent"
  tool: "content_creation_agent"
  input: ["topic", "target_audience", "messages"]
  output: ["generated_content", "messages"]
  input_mapping:
    task:
      type: "fstring"
      value: "Create content about {topic}"
    chat_history:
      type: "fixed"
      value: []
    target_audience:
      type: "variable"
      value: "target_audience"  # Map to pipeline state
```

#### Example 4: Sequential Agent Chain

Use multiple agents in sequence:

```yaml
nodes:
  - id: "research_agent"
    type: "agent"
    tool: "research_assistant"
    input: ["research_topic", "messages"]
    output: ["research_findings", "messages"]
    input_mapping:
      task:
        type: "fstring"
        value: "Research: {research_topic}"
      chat_history:
        type: "fixed"
        value: []
    transition: "writing_agent"
  
  - id: "writing_agent"
    type: "agent"
    tool: "content_writer"
    input: ["research_findings", "messages"]
    output: ["draft_article", "messages"]
    input_mapping:
      task:
        type: "fstring"
        value: "Write an article based on: {research_findings}"
      chat_history:
        type: "variable"
        value: "messages"
    transition: "review_agent"
  
  - id: "review_agent"
    type: "agent"
    tool: "content_reviewer"
    input: ["draft_article", "messages"]
    output: ["final_article", "messages"]
    input_mapping:
      task:
        type: "fstring"
        value: "Review and finalize: {draft_article}"
      chat_history:
        type: "variable"
        value: "messages"
```

#### Example 5: Agent with Conversation History

Maintain context across agent interactions:

```yaml
- id: "conversational_agent"
  type: "agent"
  tool: "chat_assistant"
  input: ["user_question", "messages"]
  output: ["agent_response", "messages"]
  input_mapping:
    task:
      type: "fstring"
      value: "User asks: {user_question}"
    chat_history:
      type: "variable"
      value: "messages"  # Full conversation history
```

### Best Practices

#### 1. Add Agents to Pipeline First

Before using Agent Node, ensure the agent is added in Pipeline Configuration > Toolkits section.

#### 2. Map Task Clearly

Provide clear, specific task instructions:

✅ **Good**:
```yaml
task:
  type: "fstring"
  value: "Analyze the user story '{user_story}' and extract requirements, acceptance criteria, and technical dependencies."
```

❌ **Avoid**:
```yaml
task:
  type: "variable"
  value: "input"  # Too vague
```

#### 3. Use Chat History Appropriately

- **With History**: Use when agent needs conversation context
- **Without History**: Use `[]` for independent, stateless tasks

#### 4. Map Custom Variables Correctly

If agent has custom variables, ensure they're properly mapped to pipeline state:

```yaml
# Agent has: project_id, sprint_number
input_mapping:
  task:
    type: "fstring"
    value: "Create sprint report"
  chat_history:
    type: "fixed"
    value: []
  project_id:
    type: "variable"
    value: "jira_project_id"  # From pipeline state
  sprint_number:
    type: "variable"
    value: "current_sprint"   # From pipeline state
```

#### 5. Include `messages` in Output

For debugging and continuity, include `messages`:

```yaml
output: ["agent_result", "messages"]
```

#### 6. Use Interrupts for Testing

Test agent behavior with interrupts:

```yaml
interrupt_after: true  # Review agent output
```

#### 7. Reuse Agents Across Pipelines

Create specialized agents once, reuse in multiple pipelines for consistency.

#### 8. Handle Agent Failures

Consider error handling in subsequent nodes:

```yaml
- id: "check_agent_result"
  type: "router"
  condition: "agent_result is not None"
  routes: ["success_path", "error_path"]
```

---

## Interaction Nodes Comparison

| Feature | LLM Node | Agent Node |
|---------|----------|------------|
| **Purpose** | Direct LLM interaction with full control | Delegate to pre-configured specialized agents |
| **Configuration** | Configure prompt, system, task from scratch | Use existing agent configuration |
| **Prompt** | Define in node (Fixed/F-String/Variable) | Inherited from agent, customized via Task mapping |
| **Toolkits** | Select Toolkits & MCPs, choose specific tools | Agent's toolkits are pre-configured |
| **Input** | State variables (input, messages, custom) | State variables (input, messages, custom) |
| **Output** | State variables (messages, custom) | State variables (messages, custom) |
| **Input Mapping** | Not applicable (direct state access) | Map pipeline state to agent parameters (Task, Chat History, custom variables) |
| **Structured Output** | Supported (enable via toggle) | Depends on agent configuration |
| **Conversation History** | Controlled via Chat history parameter | Controlled via CHAT_HISTORY mapping |
| **Reusability** | Node-specific configuration | Agent can be reused across pipelines |
| **Flexibility** | Highly flexible, configure everything | Limited to agent's design |
| **Complexity** | More setup required | Simpler, leverages existing agent |
| **Use Case** | Custom tasks, one-off requests, full control | Specialized tasks, consistent behavior, reusable workflows |

### When to Use LLM Node

✅ **Choose LLM Node when you need**:

* Full control over prompts and behavior
* Custom tool binding for specific workflow
* One-off or unique LLM interactions
* Structured output extraction
* Simple text generation without pre-configuration

### When to Use Agent Node

✅ **Choose Agent Node when you**:

* Have an existing agent that does exactly what you need
* Want to reuse agent logic across multiple pipelines
* Need consistent behavior from pre-configured agents
* Want to simplify pipeline by delegating to specialists
* Have agents with specific domain knowledge or toolkits

!!! tip "Combining Both"
    You can use both node types in the same pipeline:
    * **LLM Node** for custom, ad-hoc processing
    * **Agent Node** for specialized, reusable tasks

---

## Related

* **[Nodes Overview](overview.md)** - Understand all available node types
* **[Execution Nodes](execution-nodes.md)** - Call external tools and execute code
* **[States](../states.md)** - Manage data flow through pipeline state
* **[Connections](../connections.md)** - Link nodes together
* **[YAML Configuration](../yaml.md)** - See complete node syntax examples
