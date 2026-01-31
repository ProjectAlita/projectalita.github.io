# Swarm Mode Internal Tool

## Overview

**Swarm Mode** is an internal tool that enables multi-agent collaboration in ELITEA. When enabled, all child agents share the full conversation history and can hand off control to each other, creating a coordinated team of specialized agents working together to complete complex tasks.

**Key Features:**

- **Shared Conversation History:** All agents in the swarm access the same conversation context
- **Dynamic Agent Handoff:** Agents can transfer control to specialized agents as needed
- **Seamless Collaboration:** Child agents work together while maintaining conversation continuity
- **Automatic Control Flow:** The parent agent coordinates work and receives control back after child agents complete tasks

!!! tip "When to Use Swarm Mode"
    Enable Swarm Mode when your workflow requires multiple specialized agents to collaborate on complex tasks. For example, a QA coordinator agent that delegates test execution to different testing specialists, or a development manager that coordinates between coding, review, and deployment agents.

---

## Prerequisites

- **Permission Level**: User role with agent edit access
- **Child Agents**: At least one child agent configured in the parent agent's toolkits
- **Use Case**: Tasks requiring specialized agents to collaborate and share context

---

## How It Works

**Traditional Agent vs Swarm Mode**

| Aspect | Traditional Agent | Swarm Mode |
|--------|-------------------|------------|
| **Agent Structure** | Single agent handles all tasks | Parent agent coordinates multiple specialist agents |
| **Conversation Context** | Only the active agent sees the conversation | All agents share the full conversation history |
| **Task Distribution** | Single agent attempts all tasks | Parent delegates tasks to specialized child agents |
| **Control Flow** | Linear execution | Dynamic handoff between parent and child agents |
| **Collaboration** | No inter-agent communication | Agents can transfer control and share results |

**Agent Roles**

Swarm Mode creates a two-tier architecture:

| Role | Description | Responsibilities |
|------|-------------|------------------|
| **Parent Agent** | Main coordinator | - Receives user requests<br>- Determines which specialist to involve<br>- Hands off tasks to child agents<br>- Coordinates overall workflow |
| **Child Agents** | Specialized agents | - Execute specific tasks using their tools<br>- Access full conversation history<br>- Return control to parent when done<br>- Can be other agents configured in the parent's toolkits |

**Workflow**

When Swarm Mode is enabled and child agents are configured:

1. **User Request:** User sends a message to the conversation
2. **Parent Analysis:** Parent agent analyzes the request and determines if a specialist is needed
3. **Handoff:** Parent uses a handoff tool (e.g., `transfer_to_test_agent`) to delegate to a child agent
4. **Specialist Work:** Child agent executes the task using its specialized tools and knowledge
5. **Return Control:** Child agent uses `transfer_to_parent` to return control after completing the task
6. **Continue Coordination:** Parent receives results and continues coordinating the overall workflow

!!! info "What Happens Behind the Scenes"
    When Swarm Mode is enabled, the system automatically creates handoff tools for each child agent. The parent agent receives instructions about available specialists and when to delegate tasks. All agents share the same conversation state, ensuring seamless collaboration.


---

## Enabling Swarm Mode in Conversations

Enable Swarm Mode for collaborative multi-agent conversations.

1. Navigate to your conversation.
2. Ensure the conversation's agent has at least one child agent configured in its toolkits.
3. Locate the chat input toolbar at the bottom of the screen.
4. Click the **Internal Tools** icon (value icon) next to the attachment button.
5. In the popup, find **Swarm Mode** in the list.
6. Click the toggle switch next to "Swarm Mode" to enable it.
7. A success toast notification appears: "Internal tools configuration updated".
8. Click anywhere outside the popup to close it.

![Chat](<../../img/how-tos/chat-conversations/internal tools/swarm-mode/swarm-mode-chat.gif>)

!!! info "Configuration Persistence"
    The Swarm Mode setting persists for the conversation. You can toggle it on/off at any time. However, Swarm Mode requires child agents to be configured in the agent's toolkits to function.

---

## Enabling Swarm Mode in Agent Configuration

Configure Swarm Mode as part of an agent's default configuration.

1. Navigate to **Agents** in the main menu.
2. Select the agent you want to configure or create a new agent.
3. Scroll to the **TOOLKITS** section.
4. Ensure you have added at least one child agent (using **+ Agent** button).
5. In the TOOLKITS section, find the **Swarm Mode** switch.
6. Toggle the switch to enable Swarm Mode for this agent.
7. Click **Save** at the top of the configuration page.
8. New conversations created with this agent will have Swarm Mode enabled by default.

![Agent](<../../img/how-tos/chat-conversations/internal tools/swarm-mode/swarm-mode-agent.gif>)

!!! tip "Configure Child Agents First"
    Always add and configure your child agents before enabling Swarm Mode. The parent agent needs at least one child agent to create a functional swarm.

---

## Using Swarm Mode

Once enabled and child agents are configured, Swarm Mode works transparently during conversations. The parent agent automatically coordinates with child agents based on the task requirements.

### What Happens During Conversations

1. **Automatic Handoff Detection:** The parent agent recognizes when a task requires a specialist's expertise
2. **Context Sharing:** When handing off, the child agent receives the full conversation history
3. **Specialized Execution:** The child agent uses its configured tools and knowledge to complete the task
4. **Seamless Return:** After completion, control returns to the parent agent
5. **Continuous Coordination:** The parent agent can delegate to different specialists as needed throughout the conversation

!!! example "Example Interaction"
    **User:** *"Run the API tests and if any fail, create bug reports in Jira"*

    **Behind the Scenes:**

    1. Parent agent receives the request
    2. Parent uses `transfer_to_test_agent` to hand off to the testing specialist
    3. Test agent executes API tests using its TestRail toolkit
    4. Test agent identifies failed tests and uses `transfer_to_parent`
    5. Parent analyzes failures and uses `transfer_to_bug_tracker_agent`
    6. Bug tracker agent creates Jira tickets for each failure
    7. Bug tracker agent returns control with `transfer_to_parent`
    8. Parent summarizes the results to the user

    !!! note "Handoff Tools Are Automatic"
        You don't need to manually create handoff tools. When Swarm Mode is enabled, the system automatically generates `transfer_to_[agent_name]` tools for the parent to call child agents, and `transfer_to_parent` for child agents to return control.

---

## Example Scenarios

??? example "QA Coordination Agent"
    **Scenario:** A QA team uses a coordinator agent to manage testing across multiple platforms and tools.

    **Configuration:**

    - Parent Agent: QA Coordinator
    - Child Agents:
      - API Test Agent (TestRail toolkit)
      - UI Test Agent (Selenium toolkit)
      - Performance Test Agent (JMeter toolkit)
    - Swarm Mode: Enabled

    **User Request:**

    > `Run a full test suite for the new release: API tests, UI smoke tests, and load testing. Create bug reports for any failures.`

    **Workflow:**

    1. QA Coordinator receives the request and plans the test strategy
    2. Hands off to API Test Agent → runs API tests, reports results
    3. Hands off to UI Test Agent → runs smoke tests, reports results
    4. Hands off to Performance Test Agent → runs load tests, reports metrics
    5. Coordinator summarizes all results and creates bug reports for failures
    6. User receives comprehensive test report with bug ticket links

??? example "Development Workflow Agent"
    **Scenario:** A development team uses a manager agent to coordinate code review and deployment tasks.

    **Configuration:**

    - Parent Agent: Dev Manager
    - Child Agents:
      - Code Review Agent (GitHub toolkit, code analysis tools)
      - Deployment Agent (Kubernetes toolkit, CI/CD tools)
    - Swarm Mode: Enabled

    **User Request:**

    > `Review the pull request for feature X, and if approved, deploy it to staging`

    **Workflow:**

    1. Dev Manager analyzes the request
    2. Hands off to Code Review Agent → reviews PR, checks tests, provides feedback
    3. Code Review Agent reports: "PR approved, all checks passed"
    4. Dev Manager hands off to Deployment Agent
    5. Deployment Agent deploys to staging, monitors deployment health
    6. Manager coordinates the entire process and reports completion

??? example "Content Creation Swarm"
    **Scenario:** A marketing team uses a content coordinator to create comprehensive marketing materials.

    **Configuration:**

    - Parent Agent: Content Coordinator
    - Child Agents:
      - Research Agent (web search, competitor analysis)
      - Writing Agent (content generation, copywriting)
      - Design Agent (image generation, Canva integration)
    - Swarm Mode: Enabled

    **User Request:**

    > `Create a blog post about our new product feature, including research, article, and featured image`

    **Workflow:**

    1. Content Coordinator breaks down the request
    2. Hands off to Research Agent → gathers market data, competitor info
    3. Hands off to Writing Agent → creates article using research insights
    4. Hands off to Design Agent → generates featured image
    5. Coordinator assembles all components and presents final blog post package

---

## Best Practices

??? tip "Design specialized child agents with clear purposes"
    Each child agent should have a well-defined specialization and appropriate toolkits. Avoid creating generic agents—instead, create focused specialists (e.g., "GitHub Issues Agent" vs. "Development Agent"). This makes handoff decisions clearer and more effective.

??? tip "Use descriptive agent names and descriptions"
    The parent agent uses child agent names and descriptions to decide when to hand off. Use clear, descriptive names like "API_Testing_Agent" and detailed descriptions that explain the agent's capabilities and when to use them.

??? tip "Keep child agent count manageable"
    While Swarm Mode supports multiple child agents, managing 3-5 specialists is optimal. Too many child agents can make coordination complex and slow down decision-making. Group related capabilities into single agents when appropriate.

??? tip "Configure comprehensive toolkits for child agents"
    Each child agent should have all the toolkits it needs to complete its specialized tasks independently. For example, a bug reporting agent needs both testing tools to verify bugs and Jira tools to create tickets.

??? tip "Test swarm coordination before production use"
    Run test scenarios to verify that handoffs work smoothly, agents return control properly, and the conversation flow makes sense. Check that child agents are being called appropriately based on task requirements.

??? tip "Combine with other internal tools"
    Swarm Mode works well with other internal tools like Smart Tools Selection (for token optimization), Data Analysis (for specialist data agents), and Python Sandbox (for code execution specialists).

??? tip "Monitor conversation flow and handoffs"
    Review conversation logs to understand handoff patterns and optimize agent coordination. If certain agents are rarely called or frequently called for wrong tasks, adjust agent descriptions and parent instructions.

??? tip "Provide clear parent agent instructions"
    The parent agent's system prompt should include guidance on when to delegate tasks and how to coordinate the overall workflow. Clear instructions improve handoff decisions and overall effectiveness.

---

## Troubleshooting

??? warning "Swarm Mode enabled but agents not collaborating"

    **Possible causes:**
    
    * No child agents configured in the parent agent's toolkits
    * Swarm Mode enabled without child agents present
    * Parent agent not recognizing when to hand off tasks
    
    **Solution:**
    
    1. Verify that child agents are added to the parent agent in the TOOLKITS section
    2. Check that child agents appear in the toolkits list with type "agent"
    3. Review parent agent's system prompt to ensure it knows when to delegate
    4. Test with explicit requests like "delegate this to [specialist agent name]"
    5. If no child agents are configured, Swarm Mode will fall back to standard agent behavior

??? warning "Child agent not returning control to parent"

    **Possible causes:**
    
    * Child agent completing task but not using `transfer_to_parent`
    * Child agent stuck in a loop or waiting for input
    * Conversation flow interrupted
    
    **Solution:**
    
    1. Check child agent's system prompt—it should know to return control when done
    2. Child agents automatically receive a `transfer_to_parent` handoff tool
    3. Review conversation logs to see where control flow stopped
    4. Restart the conversation if agents are stuck in an inconsistent state
    5. Ensure child agents have clear completion criteria

??? warning "Wrong agent being called for tasks"

    **Possible causes:**
    
    * Child agent names or descriptions not clear enough
    * Parent agent instructions unclear about delegation
    * Tasks require multiple specialists but only one is called
    
    **Solution:**
    
    1. Use descriptive agent names that clearly indicate specialization
    2. Enhance child agent descriptions to specify their exact capabilities
    3. Update parent agent's system prompt with clear delegation guidelines
    4. Review handoff tools—the parent sees tools like `transfer_to_[agent_name]` with the child's description
    5. Test with specific scenarios and refine agent descriptions based on results

??? warning "Conversation history not shared correctly"

    **Possible causes:**
    
    * Swarm Mode not properly enabled
    * Technical issue with shared state
    * Conversation interrupted and restarted
    
    **Solution:**
    
    1. Verify Swarm Mode toggle is enabled in Internal Tools popup
    2. Check that the success notification appeared when enabling
    3. All agents in a swarm automatically share conversation history via SwarmState
    4. If issues persist, try disabling and re-enabling Swarm Mode
    5. Start a new conversation to reset the swarm state

??? warning "Performance slower than expected"

    **Possible causes:**
    
    * Multiple handoffs adding latency
    * Child agents processing large context
    * Too many child agents configured
    
    **Solution:**
    
    1. Handoffs add processing time—this is expected behavior for coordination
    2. Limit the number of child agents to 3-5 specialists
    3. Consider if all delegations are necessary—some tasks may not need specialists
    4. Use Smart Tools Selection with Swarm Mode to reduce token overhead
    5. For simple tasks that don't need collaboration, consider disabling Swarm Mode

---

!!! note "Swarm Mode Requires Child Agents"
    Swarm Mode is designed for multi-agent collaboration. If no child agents are configured in the parent agent's toolkits, enabling Swarm Mode has no effect and the agent operates normally.

---

## Related Features

!!! info "Additional Resources"

    * **[Agent Configuration](../../menus/agents.md)** - Creating and configuring agents
    * **[Smart Tools Selection](smart-tools-selection-internal-tool.md)** - Optimize token usage with many toolkits
    * **[Chat Functionality](how-to-use-chat-functionality.md)** - General chat features and usage
    * **[Conversation Management](../../menus/chat.md)** - Managing conversations and settings
    * **[Toolkits Overview](../../menus/toolkits.md)** - Understanding and configuring toolkits
