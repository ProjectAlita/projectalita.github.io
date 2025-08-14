# What is an Agent?

An agent is a virtual assistant that automates tasks and streamlines workflows. Unlike simple automation, agents can make decisions, adapt to changing conditions, and perform actions across multiple systems to achieve specific goals.

Key characteristics:

- **Autonomous**: Operates independently with minimal supervision
- **Proactive**: Determines next steps without explicit instructions
- **Intelligent**: Uses AI to interpret instructions and make informed decisions

## Agents in ELITEA

ELITEA Agents are customizable virtual assistants that you create to handle specific tasks or workflows. Each agent combines instructions, toolkits, and integrations to perform complex actions like searching Google, creating Jira tickets, or managing GitHub repositories.

What makes ELITEA Agents powerful:

- **Customizable**: Define instructions, scope, and complexity for each agent
- **Integrated**: Connect with external toolkits and services seamlessly  
- **Scalable**: Handle tasks across different domains and complexity levels
- **Goal-oriented**: Work toward specific objectives rather than open-ended conversations

Perfect for automating repetitive tasks, processing information from multiple sources, and reducing manual effort while increasing productivity.

### Example: Daily Sprint Monitoring Agent

**Scenario**: Sarah is a project manager who needs to monitor her team's sprint progress every morning. Instead of manually checking Jira and updating stakeholders, she creates an agent to automate this workflow.

**Sarah's Task**: "I need to check our current sprint status, identify any blockers, and send a summary to the team channel every morning at 9 AM."

**Agent Configuration:**

- **Instructions**: "Monitor the current sprint for the 'MOBILE' project, identify high-priority issues and blockers, prepare a status summary, and send it to the 'Daily Status' Slack channel."

**Toolkits Used:**

- **Jira Toolkit** - This provides the agent with capabilities to:
    - Connect to Jira using Sarah's saved credentials  
    - Query issues by project, sprint, and status
    - Retrieve issue details, priorities, and assignees
    - Access comments and linked dependencies

- **Slack Toolkit** - For team notifications and escalations 

**How the Agent Works**:

1. **Data Collection**: Connects to Jira and retrieves all issues in the current sprint
2. **Analysis**: Reviews issue statuses, identifies blocked items, and checks due dates
3. **Decision Making**: Determines which issues need attention and prioritizes concerns
4. **Action**: Generates a structured summary and posts it to the designated Slack channel

**Sample Output:**

>   **MOBILE Sprint Day 3 Update:**
> 
> - 8/12 stories completed  
> -  **Blockers:** MOBILE-456 (waiting for API docs), MOBILE-789 (needs design review)
> -  **Items due today:** @john @maria @alex

This saves Sarah 30 minutes every morning and ensures consistent team communication.

---

!!! info "Reference"
    Ready to get started? Explore the [Agents menu](../../menus/agents.md) to create your first digital teammate.

    For detailed definitions of terms and concepts, please refer to the [ELITEA Glossary](../glossary.md)
