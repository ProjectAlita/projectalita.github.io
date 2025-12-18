# Context Management

## Overview

The Context Management feature provides intelligent control over conversation token usage through automated message pruning and summarization. When enabled as a project-level secret, it helps maintain conversation continuity while staying within model token limits by automatically managing message history, generating summaries of older conversations, and preserving important messages.

The Context Budget widget displays real-time token usage metrics across Chat conversations, Agent runs, Pipeline executions, and Application configurations, providing immediate visibility into context consumption and management status.

!!! info "Prerequisites"
    To use context management, you need:
    
    * Project-level secret named `context_manager` with value `true`
    * An active conversation in Chat, Agent, Pipeline, or Application
    * LLM model configured with context management support

---

## Enabling Context Management

Context management is controlled by a project-level secret that enables the feature across all applicable interfaces.

**Access Project Secrets**

1. Navigate to **Settings** in the main menu
2. Click on the **Secrets** section
3. Click **+** button
4. In the secret creation form:
      - **Name**: Enter `context_manager` (exact name required)
      - **Value**: Enter `true` (exact value required)
5. Click **✔** to store the secret

 ![Secret](../../img/how-tos/chat-conversations/context-management/context-manager-secret.gif){width="600" loading="lazy"}

!!! warning "Widget Visibility"
    The Context Budget widget only appears when the `context_manager` secret exists and is set to `true`. Changes take effect immediately after the secret is created or updated.

---

## Accessing Context Management

Context management is available in multiple locations within ELITEA:

### From Chat Conversations

Monitor and control context during active conversations:

1. Navigate to **Chat** → **Conversations** in the main menu
2. Select or create a conversation
3. Send the first message to initiate the conversation
4. The **Context Budget** widget appears in the right panel (bottom left) after the first message
5. The widget displays real-time token usage and management status
6. Click on the widget to view detailed metrics and controls

![Chat Context Budget](<../../img/how-tos/chat-conversations/context-management/chat-context-budget.gif>){width="600" loading="lazy"}

---

### In Agent Runs

Track context usage during agent execution:

1. Navigate to **Agents** and select an agent
2. Send the first message to initiate the conversation
3. The **Context Budget** widget appears above the chat panel interface after the first message
4. Monitor token consumption as the agent processes requests
5. View pruning and summarization activity in real-time

![Chat Context Budget](<../../img/how-tos/chat-conversations/context-management/agent-context-budget.gif>){width="600" loading="lazy"}

---

### In Pipeline Executions

Monitor context during pipeline chat panels:

1. Navigate to **Pipelines** and select a pipeline
2. Open the pipeline's chat panel interface
3. Send the first message to initiate the conversation
4. The **Context Budget** widget appears above the chat panel interface after the first message
5. Track context usage across pipeline node executions
6. Observe automatic context management as the pipeline runs

![Chat Context Budget](<../../img/how-tos/chat-conversations/context-management/chat-context-budget.gif>){width="600" loading="lazy"}
---

## Understanding the Context Budget Widget

The Context Budget widget provides three view modes that display progressively more detailed information.

**Collapsed View**

The minimal view shows essential token usage at a glance:

* **Status Indicator**: Simple line indicator showing 
usage status
      - Green: Normal usage (0-100%)
      - Orange: High usage (more than 100%)

![Collapsed View](<../../img/how-tos/chat-conversations/context-management/collapsed-view.png>){width="160" loading="lazy"}

---

**Compact View**

The compact view adds strategy and message tracking:

* **Strategy Indicator**: Current pruning strategy (e.g., "oldest_first", "importance_based")
* **Messages Count**: Total messages in conversation context
* **Summaries Count**: Number of generated summaries
* **Expand Button**: Click to reveal full details

    **Conversation**

       ![Compact View](<../../img/how-tos/chat-conversations/context-management/compact-view.png>){width="250" loading="lazy"}

    **Agents** and **Pipelines**

       ![Compact View](<../../img/how-tos/chat-conversations/context-management/compact-view-agent.png>){width="250" loading="lazy"}
---

**Expanded View**

The full view displays comprehensive context management details organized in collapsible sections. Click on each section to expand and configure settings.

**Available Sections:**

* **Context Strategy & Token Management**: Configure pruning strategy, token limits, and message preservation settings
* **Summarization**: Enable automatic summarization and configure summary generation parameters
* **System Messages**: Manage system-level instructions and preservation settings

For detailed information about each parameter, see the [Configuration Parameters](#configuration-parameters) section below.

![Expanded View](<../../img/how-tos/chat-conversations/context-management/expanded-view.png>){width="300" loading="lazy"}

**Context Management Toggle**

At the top of the expanded view, there is a toggle switch to enable or disable Context Management entirely. When disabled, all automatic context management features (pruning and summarization) are turned off.

![Context Management Toggle](<../../img/how-tos/chat-conversations/context-management/context-managment-off.png>){width="300" loading="lazy"}

---


## How Context Management Works

**Automatic Token Tracking**

The system continuously monitors token consumption:

1. **Message Addition**: Every new message added to conversation context
2. **Token Estimation**: Tokens calculated using tiktoken library (with character-based fallback)
3. **Real-Time Display**: Context Budget widget updates immediately
4. **Threshold Monitoring**: System checks if usage exceeds summary_trigger_ratio
Context Management settings are organized into three main sections in the expanded view modal.

---
## Configuration Parameters

### Overview Metrics

| Metric | Description | Example |
|--------|-------------|---------|
| **Tokens** | Current token usage with percentage | "2,591 / 64,000 (4%)" |
| **Messages** | Total number of messages in conversation | "7" |
| **Summaries** | Number of generated summaries | "0" |

### Context Strategy & Token Management

| Parameter | Description | Default | Range/Options | Purpose |
|-----------|-------------|---------|---------------|---------|
| **Pruning Strategy** | Method for removing messages from context when limit is exceeded | Oldest First | • **Oldest First**: Remove oldest messages first when limit is reached<br>• **Importance Based**: Prioritize messages based on importance scoring<br>• **Thread Aware**: Maintain thread continuity when pruning messages<br>• **Hybrid**: Combine multiple strategies for optimal context management | Determines how messages are removed when context limit is exceeded<br>• **Note**:`Currently view-only in the UI`|
| **Max Context Tokens** | Maximum number of tokens to keep in conversation context | 64,000 tokens | 1,000 - 100,000 | Defines the upper limit before pruning or summarization occurs |
| **Preserve Recent Messages** | Number of most recent messages to always keep in context | 5 messages | 1 - 50 | Ensures the most recent messages are protected during context optimization |
| **Summaries Limit Count** | Maximum number of conversation summaries to maintain | 5 summaries | 1 - 20 | Prevents unlimited summary accumulation while preserving conversation history 

#### Pruning Strategy Details

**Oldest First (FIFO)**

* **Description**: Removes oldest messages first when context limit is reached
* **Behavior**: Simple chronological pruning
* **Use Case**: Basic context management with straightforward message history
* **Preserved**: Recent messages (per preserve_recent_messages setting)

**Importance Based**

* **Description**: Scores messages by importance and removes lowest-scored messages
* **Scoring Factors**:
     - Message recency (newer messages score higher)
     - Role importance (system/user messages scored higher than assistant)
     - Message length (longer messages may score higher)
     - Position in conversation (earlier messages in threads preserved)
* **Use Case**: Intelligent context management for complex conversations
* **Preserved**: High-importance messages and recent messages

!!! note "Strategy Selection"
    The pruning strategy dropdown is currently disabled in the UI.

#### How Pruning Works

When context approaches the token limit:

1. **Trigger Detection**: System detects usage approaching max_context_tokens
2. **Recent Message Protection**: Preserves last N messages (per preserve_recent_messages setting)
3. **Strategy Application**: Applies active pruning strategy (oldest_first or importance_based)
4. **Message Removal**: Removes messages according to strategy logic
5. **Context Rebuild**: Rebuilds conversation context with remaining messages

---

### Summarization

| Parameter | Description | Default | Range/Options | Purpose |
|-----------|-------------|---------|---------------|---------|
| **Enable Automatic Summarization** | Toggle to enable or disable automatic conversation summarization | Enabled | On/Off | Controls whether the system automatically generates summaries when context limits are approached |
| **Summarization Instructions** | Custom instructions for how summaries should be generated | "Generate a concise summary of the following conversation messages" | Free text (multiline) | Guides the LLM on how to create summaries that match your needs |
| **Summary Model** | AI model used for generating conversation summaries | Project's default model | All available LLM models from your project and shared models | Determines which model processes the summarization task |
| **Summary Trigger Ratio** | Trigger summarization when context reaches this percentage of max tokens | 0.8 (80%) | 0.1 - 1.0 | Controls when automatic summarization is initiated |
| **Min Messages for Summary** | Minimum number of messages required before creating a summary | 5 messages | 1 - 50 | Prevents summarization of very short conversations |
| **Target Summary Tokens** | Target length for generated summaries | 4,096 tokens | 1 - 100,000 | Controls the conciseness of generated summaries |

#### How Summarization Works

When summary_trigger_ratio threshold is reached:

1. **Summarization Trigger**: System detects token usage exceeds trigger ratio (e.g., 100%)
2. **Message Selection**: Identifies messages eligible for summarization (excludes preserved recent messages)
3. **Summary Generation**: LLM generates concise summary of selected messages using the configured Summary Model and Summarization Instructions
4. **Message Replacement**: Original messages replaced with summary in context
5. **Token Reduction**: Context token count reduced while preserving conversation continuity
6. **Summary Storage**: Summary tracked (total summaries limited by summaries_limit_count)

---

### System Messages

| Parameter | Description | Default | Range/Options | Purpose |
|-----------|-------------|---------|---------------|---------|
| **Always Preserve System Messages** | Toggle to keep system messages during context pruning | Enabled | On/Off | Ensures system-level instructions remain available throughout the conversation |
| **System Messages** | Custom system messages for the conversation | "You are a helpful assistant." | Free text (multiline) | Defines the AI assistant's role and behavior guidelines |

---

## Manual Context Optimization

In addition to automatic context management, you can manually trigger context optimization when needed. This is particularly useful when you want to immediately prune messages without waiting for automatic thresholds to be reached.

**When to Use Manual Optimization**

* **High Context Usage**: When you see the orange status indicator (>100% usage) in the Context Budget widget
* **Immediate Cleanup**: When you want to reduce token usage before continuing a conversation
* **Before Important Interactions**: To ensure maximum available context for upcoming complex tasks
* **Performance Issues**: When experiencing slow response times due to high token counts

**How to Manually Optimize**

1. Click on the **Context Budget** widget to open the expanded view
2. When context usage exceeds 100%, a yellow warning banner appears at the top with the message:
   
   ![Manual optimization](<../../img/how-tos/chat-conversations/context-management/optimizations-banner.png>){width="500" loading="lazy"}

3. Click the **Optimize now** button in the warning banner
4. Confirm the action in the dialog that appears
5. The system will immediately prune messages based on your configured strategy

!!! warning "Irreversible Action"
    Manual optimization cannot be undone. Preserved recent messages (per your configuration) will always be retained.

![Manual optimization](<../../img/how-tos/chat-conversations/context-management/manual-optimization .gif>){width="550" loading="lazy"}

**What Happens During Manual Optimization**

When you manually trigger optimization:

1. **Strategy Application**: The system applies your configured pruning strategy (oldest_first or importance_based)
2. **Message Protection**: Recent messages (per preserve_recent_messages setting) are protected from removal
3. **System Message Preservation**: If enabled, system messages are retained
4. **Token Reduction**: Messages are removed until the target token count (max_context_tokens) is reached
5. **Context Rebuild**: The conversation context is rebuilt with the remaining messages
6. **Widget Update**: The Context Budget widget updates to reflect the new token count

**Best Practices for Manual Optimization**

* **Review Settings First**: Before manually optimizing, review your Context Strategy settings to ensure recent message preservation is appropriate
* **Monitor Usage**: Use manual optimization proactively when you see the status indicator turning orange
* **Strategic Timing**: Trigger optimization before starting new complex tasks or multi-turn interactions
* **Combine with Configuration**: Use manual optimization alongside proper configuration of automatic settings for best results

---

## Usage Scenarios

??? example "Long-Running Conversations"

    **Use Case**: Maintain coherent conversations that exceed model token limits
    
    **Configuration:**
    
    * Max Context Tokens: 64,000
    * Summary Trigger Ratio: 0.8
    * Preserve Recent Messages: 10
    * Pruning Strategy: importance_based
    
    **Behavior:**
    
    1. User engages in extended conversation with AI assistant
    2. Context grows naturally as messages are added
    3. At 51,200 tokens (80% of 64,000), summarization triggers automatically
    4. System generates summary of older messages
    5. Last 10 messages always preserved for immediate context
    6. Conversation continues seamlessly with reduced token usage
    
    **Benefits:**
    
    * No manual intervention required
    * Important conversation details preserved in summaries
    * Recent context always available
    * Conversation never "forgets" early important information

??? example "Multi-Turn Agent Tasks"

    **Use Case**: Agent performing complex tasks requiring multiple interactions
    
    **Configuration:**
    
    * Max Context Tokens: 32,000
    * Summary Trigger Ratio: 0.75
    * Preserve Recent Messages: 5
    * Pruning Strategy: oldest_first
    
    **Behavior:**
    
    1. Agent starts task with initial instructions
    2. Multiple tool calls and responses accumulate
    3. At 24,000 tokens (75% of 32,000), oldest messages are pruned
    4. Last 5 exchanges preserved for immediate task context
    5. Agent continues task execution without context overflow
    
    **Benefits:**
    
    * Task execution never interrupted by token limits
    * Most recent tool results always accessible
    * Efficient token usage for long-running tasks
    * Simplified context management for automated workflows

??? example "Pipeline Chat Contexts"

    **Use Case**: Pipeline with chat panel interface requiring context preservation
    
    **Configuration:**
    
    * Max Context Tokens: 16,000
    * Summary Trigger Ratio: 0.8
    * Preserve Recent Messages: 8
    * Pruning Strategy: importance_based
    
    **Behavior:**
    
    1. Pipeline nodes generate output and chat messages
    2. User interactions add additional context
    3. Context Budget widget shows real-time usage across pipeline execution
    4. At 12,800 tokens (80% of 16,000), importance-based pruning occurs
    5. System preserves critical pipeline outputs and recent user messages
    6. Pipeline continues with optimized context
    
    **Benefits:**
    
    * Pipeline execution state preserved
    * User can continue interacting without interruption
    * Important node outputs retained
    * Balanced context across pipeline stages

---

## Best Practices

**Monitoring Context Usage**

??? tip "Regular Budget Checks"

    * Check Context Budget widget periodically during long conversations
    * Pay attention to color changes in the percentage bar:
      - Green: Safe range, no action needed
      - Yellow: Monitor closely, approaching limit
      - Red: Critical range, summarization or pruning likely
    * Expand widget to full view for detailed metrics when yellow or red
    * Use compact view for quick strategy and message count checks

??? tip "Understanding Token Consumption"

    * Different message types consume different token amounts:
      - System prompts: Variable (often 100-500 tokens)
      - User messages: Depends on length (typically 10-200 tokens)
      - Assistant responses: Variable (often 100-1000+ tokens)
      - Tool calls: Includes function definitions (can be 50-300 tokens each)
    * Attachments and images can significantly increase token usage
    * Summary messages reduce overall token count while preserving information

??? tip "Strategy Awareness"

    * Know which pruning strategy is active for your conversations
    * `oldest_first`: Predictable, simple, but may lose important early context
    * `importance_based`: Intelligent, preserves high-value messages, but less predictable
    * Contact administrator if strategy doesn't match your use case needs

---

**Optimizing Conversations**

??? tip "Message Structure"

    * Keep messages concise when possible to reduce token consumption
    * Break long messages into smaller logical chunks
    * Use clear, structured formatting to help importance-based scoring
    * Avoid unnecessary repetition or verbose phrasing

??? tip "Preserve Recent Messages Setting"

    * Adjust based on conversation type:
      - Quick Q&A: Lower number (3-5 messages)
      - Complex discussions: Higher number (10-15 messages)
      - Multi-step tasks: Medium number (5-10 messages)
    * Remember: Preserved messages are never pruned or summarized
    * Higher numbers mean more guaranteed context but less flexibility

??? tip "Summary Trigger Ratio"

    * Lower ratios (0.7-0.75): More frequent summarization, lower peak token usage
    * Higher ratios (0.8-0.9): Less frequent summarization, higher token efficiency
    * Balance based on:
      - Model token limits
      - Conversation importance
      - Cost considerations (summarization uses LLM calls)
      - Desired conversation continuity

---

## Troubleshooting Common Issues

??? warning "Context Budget Widget Not Visible"

    **Symptoms:**
    
    * Widget completely missing from right panel
    * No context management controls available
    
    **Diagnosis:**
    
    1. Verify project secret `context_manager` exists
    2. Check secret value is exactly `true` (case-sensitive)
    3. Confirm you're viewing a supported interface (Chat, Agent, Pipeline)
    4. Check browser console for errors
    
    **Resolution:**
    
    1. Navigate to Settings → Secrets
    2. Create or update `context_manager` secret with value `true`
    3. Refresh the page
    4. Widget should appear immediately if secret is correct

??? warning "Token Count Seems Inaccurate"

    **Symptoms:**
    
    * Displayed token count doesn't match expectations
    * Percentage bar doesn't align with message count
    
    **Explanation:**
    
    * Token counting uses tiktoken library with character-based fallback (~4 chars per token)
    * Different message types have different token densities
    * System messages, role labels, and formatting add overhead
    * Tool calls include function definitions in token count
    
    **Resolution:**
    
    * Token counts are estimates and may vary slightly from actual LLM processing
    * Focus on relative changes (increasing/decreasing) rather than absolute accuracy
    * If consistently far off, contact administrator to check token estimation configuration

??? warning "Summarization Not Occurring"

    **Symptoms:**
    
    * Token usage reaches trigger ratio but no summary is generated
    * Context continues to grow beyond expected limit
    
    **Possible Causes:**
    
    1. Insufficient messages to summarize (all recent messages preserved)
    2. Summary limit already reached (summaries_limit_count)
    3. LLM model configuration issue
    4. Backend summarization disabled
    
    **Resolution:**
    
    1. Check expanded view: Compare Messages vs Preserve Recent count
       - If Messages ≤ Preserve Recent, summarization cannot occur
    2. Check expanded view: Review Summaries count
       - If at limit (default 5), oldest summary will be replaced
    3. Verify LLM model is properly configured for text generation
    4. Contact administrator to check backend context management configuration

??? warning "Messages Disappearing Unexpectedly"

    **Symptoms:**
    
    * Messages from earlier in conversation no longer visible
    * Conversation feels disjointed or missing context
    
    **Explanation:**
    
    * This is expected behavior when pruning occurs
    * Messages are removed from context when token limit is approached
    * Pruned messages are not deleted, just removed from active context
    
    **Understanding:**
    
    1. Check Context Budget widget for strategy in use
    2. `oldest_first`: Messages disappear in chronological order
    3. `importance_based`: Lower-scored messages disappear first
    4. Recent messages (per preserve_recent_messages) never disappear
    
    **If Unwanted:**
    
    * Increase max_context_tokens to reduce pruning frequency
    * Increase preserve_recent_messages to keep more messages
    * Request administrator to adjust pruning strategy

??? warning "Performance Issues"

    **Symptoms:**
    
    * Slow message sending or response times
    * UI lag when interacting with Context Budget widget
    * Browser becomes unresponsive
    
    **Possible Causes:**
    
    1. Very high max_context_tokens causing expensive operations
    2. Excessive message count in conversation
    3. Frequent summarization operations
    4. Browser memory limitations
    
    **Resolution:**
    
    1. **Reduce max_context_tokens**:
       - Lower values mean less context to process
       - Typical range: 8,000 - 32,000 for optimal performance
    2. **Start new conversation**:
       - Very long conversations can accumulate state
       - Consider starting fresh for new topics
    3. **Check browser resources**:
       - Close unnecessary tabs
       - Ensure browser is up to date
       - Clear browser cache if needed
    4. **Contact administrator**:
       - May need to adjust backend processing limits
       - Could configure more aggressive pruning

---


!!! info "Related Documentation"
    
    * **[Chat Functionality](how-to-use-chat-functionality.md)** - General chat features and usage
    * **[Agent Configuration](../../menus/agents.md)** - Setting up agents with context management
    * **[Pipeline Configuration](../../menus/pipelines.md)** - Configuring pipelines with context support
    * **[Secrets Management](../../menus/settings/secrets.md)** - Managing project-level secrets including context_manager configuration
