# Personalization

## Overview

The Personalization page provides comprehensive settings to customize how the AI assistant interacts with you across all new conversations. This page contains multiple configuration sections that control AI behavior, conversation memory management, and automatic summarization features.

When you access Personalization from your user profile menu, you'll find your user information at the top, followed by three main configuration sections organized as expandable accordions:

1. **Personalization**: Set default AI personality and custom instructions
2. **Default Context Management**: Control conversation memory and token usage
3. **Default Summarization**: Configure automatic conversation summarization

These settings automatically apply to every new conversation you create in Chat, Agents, and Pipelines, ensuring consistent behavior and optimal performance without manual configuration each time.

!!! info "Key Benefits"
    
    * **Comprehensive Control**: Manage AI behavior, memory, and summarization in one place
    * **Automatic Application**: Settings apply to all new conversations automatically
    * **Consistency**: Maintain uniform AI behavior across all projects and conversations  
    * **Efficiency**: Configure once, use everywhere—no repeated setup
    * **Optimization**: Balance conversation quality with token usage and costs

---

## Accessing Personalization

The Personalization page is accessed through your user profile menu.

**Navigation Path**

1. Click on your **User Avatar** at the bottom of the main sidebar
2. Select **Personalization** from the dropdown menu

![User Button Menu](<../../img/menus/profile/personalization/access-personalization.gif>){width="600" loading="lazy"}

---

## PERSONALIZATION

The Personalization accordion section provides two configuration options that control the AI assistant's default behavior and communication style.

![Default Instructions](<../../img/menus/profile/personalization/personalization-sub-section.gif>){width="600" loading="lazy"}

### Configuration Parameters

| Parameter | Type | Options/Default | Description |
|-----------|------|-----------------|-------------|
| **Default Personality** | Dropdown | Generic, QA, Nerdy, Quirky, Cynical | Communication style and approach for AI interactions |
| **Default Instructions** | Multiline text | (empty) | Custom guidelines that automatically apply to all new conversations |

---

**Default Personality**

Select the communication style and approach that the AI assistant will use by default in all new conversations.

**Available Personality Options**

| Personality | Communication Style | Best For |
|-------------|---------------------|----------|
| **Generic** | Balanced, professional assistant | General-purpose tasks, standard workflows, versatile applications |
| **QA** | Precise, technical, testing-focused | Quality assurance tasks, testing workflows, technical validation |
| **Nerdy** | Technical deep-dives, detailed explanations | Complex technical topics, learning new concepts, in-depth analysis |
| **Quirky** | Creative, playful, thinking outside the box | Brainstorming sessions, creative problem-solving, innovative approaches |
| **Cynical** | Skeptical, challenges assumptions | Critical analysis, risk assessment, design reviews |

!!! tip "Choosing the Right Personality"
    Consider your primary use cases when selecting a personality:
    
    * **Development Teams**: QA or Nerdy personalities for technical precision
    * **Creative Projects**: Quirky personality for innovative thinking
    * **Business Analysis**: Cynical personality for critical evaluation
    * **General Use**: Generic personality for balanced, versatile assistance

---

**Default Instructions**

Provide custom guidelines that automatically apply to all new conversations. These instructions define specific requirements, preferences, or constraints that the AI assistant should follow in every interaction.

!!! tip "What You Can Specify"
    
    * **Communication preferences**: Response format, level of detail, tone
    * **Technical requirements**: Programming languages, frameworks, coding standards
    * **Workflow guidelines**: Step-by-step approaches, validation requirements
    * **Domain knowledge**: Industry-specific terminology, company standards
    * **Output format**: How results should be presented or structured


**Example Instructions by Role**

??? example "Software Developer"

    ```
    Follow these guidelines in all responses:
    
    Code Standards:
    - Use TypeScript with strict mode enabled
    - Follow functional programming principles
    - Include JSDoc comments for all functions
    - Add error handling with typed error objects
    
    Testing:
    - Suggest unit tests using Jest
    - Include edge case scenarios
    - Provide test data examples
    
    Best Practices:
    - Consider performance implications
    - Suggest async/await over callbacks
    - Recommend clean code patterns
    - Flag potential security issues
    ```

??? example "QA Engineer"

    ```
    Apply testing best practices to all responses:
    
    Test Coverage:
    - Identify positive and negative test cases
    - Consider edge cases and boundary conditions
    - Include security testing considerations
    
    Documentation:
    - Provide clear, reproducible test steps
    - Include expected vs actual results format
    - Reference relevant testing standards (ISO 29119)
    
    Test Design:
    - Use BDD format (Given-When-Then) for test cases
    - Organize tests by priority (critical, high, medium, low)
    - Consider automation potential
    ```

??? example "Technical Writer"

    ```
    Follow documentation best practices:
    
    Writing Style:
    - Use active voice and present tense
    - Follow Microsoft Writing Style Guide
    - Avoid jargon; explain technical terms
    - Use "you" to address the reader
    
    Structure:
    - Begin with purpose and overview
    - Use numbered steps for procedures
    - Include prerequisites sections
    - Add warnings and notes for important information
    
    Formatting:
    - Use consistent heading hierarchy
    - Include code blocks with syntax highlighting
    - Add visual examples or diagrams when relevant
    - Provide links to related documentation
    ```
---

## DEFAULT CONTEXT MANAGEMENT

The Default Context Management accordion section controls how conversation history is managed in all new conversations. These settings optimize token usage while preserving conversation continuity.

!!! info "What Is Context Management?"
    Context management determines how much conversation history is retained and passed to the AI model in each request. Managing context effectively balances:
    
    * **Quality**: More context helps AI provide relevant, coherent responses
    * **Cost**: Token usage directly affects API costs
    * **Performance**: Excessive context can slow response times
    * **Limits**: AI models have maximum token limits (context windows)

![Max Context Tokens](<../../img/menus/profile/personalization/default-context-management.gif>){width="600" loading="lazy"}

### Configuration Parameters

| Parameter | Type | Default | Range | Description |
|-----------|------|---------|-------|-------------|
| **Enable Context Management** | Toggle | ON | ON/OFF | Activates automatic context management |
| **Max Context Tokens** | Number | 64000 | 1000 - 10000000 | Maximum tokens allocated for conversation history |
| **Preserve Recent Messages** | Number | 5 | 1 - 99 | Minimum recent messages always retained in context |

---

**Enable Context Management**

Toggle to enable or disable automatic context management for new conversations.

**When Enabled:**

* Context is automatically managed based on Max Context Tokens setting
* System preserves recent messages as specified
* Older messages are automatically summarized or removed when token limit is approached
* Conversation continuity is maintained efficiently

**When Disabled:**

* All conversation history is sent with each request (until model limit reached)
* No automatic context optimization occurs
* May hit model token limits in longer conversations
* Higher token costs and potential performance issues

!!! tip "Recommendation"
    Keep context management **enabled** (default) for optimal performance and cost efficiency, especially for longer conversations.

---

**Max Context Tokens**

Specifies the maximum number of tokens to use for conversation context in each AI request.

!!! info "What Are Tokens?"
    * Basic units of text that AI models process
    * Approximately: 1 token ≈ 4 characters or ≈ 0.75 words in English
    * Example: "Hello, how are you?" ≈ 5-6 tokens
    * Both input (context) and output (response) count toward model limits

**Choosing the Right Value**

??? tip "Consider Your Model"

    Different AI models have different context windows:
    
    * **gpt-4.1**: 128,000 tokens
    * **GPT-4**: 8,192 tokens (standard) or 32,768 tokens (32k version)
    * **GPT-3.5 Turbo**: 16,385 tokens
    
    Set Max Context Tokens to **50-75% of your model's limit** to leave room for:
    
    * System instructions and prompts (your default instructions count here)
    * AI's response generation
    * Safety margins to prevent hitting hard limits

??? tip "Balance Quality vs Cost"

    * **Higher Values (100,000+)**: 
        * ✔️ Better context retention for very long conversations
        * ✔️ AI can reference information from much earlier in conversation
        * ✘ Higher token costs per request
        * ✘ Slower response times
    
    * **Medium Values (10,000-64,000)**:
        * ✔️ Good balance of quality and cost (recommended)
        * ✔️ Suitable for most use cases
        * ✔️ Efficient performance
    
    * **Lower Values (1,000-10,000)**:
        * ✔️ Minimal token costs
        * ✔️ Faster responses
        * ✘ May lose context in longer conversations
        * ✘ AI may "forget" earlier discussion points

??? tip "Adjust by Use Case"

    * **Short Q&A Sessions**: 10,000-20,000 tokens (quick questions, brief interactions)
    * **Standard Development**: 30,000-64,000 tokens (typical coding, documentation tasks)
    * **Long Technical Discussions**: 64,000-128,000 tokens (complex debugging, architecture reviews)
    * **Extensive Analysis**: 100,000+ tokens (large codebase reviews, comprehensive research)

---

**Preserve Recent Messages**

Specifies the minimum number of recent conversation messages to always keep in context, regardless of token limits.

!!! info "How It Works"
    1. **Priority Protection**: These messages are never removed or summarized, even if total tokens exceed Max Context Tokens
    2. **Recent Context**: Ensures AI always has immediate conversation context
    3. **Continuity**: Maintains coherent responses even when older context is summarized
    4. **Count Method**: Each user message and corresponding AI response counts as 2 messages

**Choosing the Right Value**

??? tip "Consider Conversation Style"

    * **Quick Q&A (1-3 messages)**: 
        * Each question is independent
        * Minimal context dependency
        * Lower value sufficient
    
    * **Iterative Development (5-10 messages)**:
        * Building on previous responses
        * Code refinements and iterations
        * Medium value recommended (default 5 works well)
    
    * **Complex Problem-Solving (10-20 messages)**:
        * Multi-step troubleshooting
        * Extended debugging sessions
        * Higher value ensures continuity

??? tip "Balance with Token Limits"

    * Recent messages are **always** kept, even if they exceed Max Context Tokens
    * If 5 recent messages contain 70,000 tokens but Max Context Tokens = 64,000:
        * All 5 recent messages are still preserved
        * Only older messages beyond these 5 are subject to token limits
    * Set this value carefully to avoid unintentionally high token usage

??? tip "Testing Recommendations"

    * **Start with default (5)** and monitor conversation quality
    * **Increase if**: AI loses track of recent discussion points
    * **Decrease if**: Token costs are too high and conversations are short
    * **Monitor**: Check how often you need to re-explain recent context

---

## DEFAULT SUMMARIZATION

The Default Summarization accordion section configures automatic conversation summarization for new conversations. When enabled, long conversations are automatically condensed to maintain context while reducing token usage.

!!! info "What Is Automatic Summarization?"
    As conversations grow longer, they consume more tokens and approach model limits. Automatic summarization:
    
    * **Detects** when conversation length reaches a threshold
    * **Generates** a concise summary of older messages
    * **Replaces** older messages with the summary
    * **Preserves** recent messages (as specified in Context Management)
    * **Maintains** conversation continuity while reducing tokens

![Default Summarization](<../../img/menus/profile/personalization/default-summarization.gif>){width="600" loading="lazy"}

### Configuration Parameters

| Parameter | Type | Default | Range/Options | Description |
|-----------|------|---------|---------------|-------------|
| **Enable automatic summarization** | Toggle | ON | ON/OFF | Activates automatic conversation summarization |
| **Summarization instructions** | Multiline text | "Generate a concise summary of the following conversation messages." | - | Custom instructions for summary generation |
| **Summary Model** | Dropdown | GPT-5 mini | GPT-5 mini, gpt-4.1 | AI model used for generating summaries |
| **Summary Trigger Ratio** | Number | 0.8 | 0.1 - 1.0 | Proportion of Max Context Tokens that triggers summarization |
| **Min Messages for Summary** | Number | 10 | 3 - 99 | Minimum messages before summarization can occur |
| **Target Summary Tokens** | Number | 4096 | 64 - 4096 | Target token count for generated summaries |

---

**Enable Automatic Summarization**

**When Enabled:**

* System monitors conversation length continuously
* Automatically triggers summarization when threshold is reached
* Older messages are condensed into a summary
* Recent messages remain untouched
* Token usage is optimized for long conversations

**When Disabled:**

* No automatic summarization occurs
* Full conversation history is maintained (subject to Context Management limits)
* May hit token limits faster in extended conversations
* Manual context management may be required

!!! tip "Recommendation"
    Keep summarization **enabled** (default) for conversations that may become lengthy, especially for:
    
    * Extended debugging or troubleshooting sessions
    * Iterative development work
    * Multi-topic discussions
    * Long-running analysis or research tasks

---

**Summarization Instructions**

Custom instructions that guide how conversation summaries are generated.

**Default Instructions:**

```
Generate a concise summary of the following conversation messages.
```

!!! tip "What You Can Specify"
    
    * **Summary style**: Bullet points vs paragraphs, technical vs conversational
    * **Focus areas**: What information to prioritize in summaries
    * **Format requirements**: Structure, length constraints, organization
    * **Preservation rules**: Critical information that must never be omitted
    * **Context needs**: How much detail to retain for continuity

**Example Custom Instructions**

??? example "Technical Discussions"

    ```
    Create a structured summary of the conversation:
    
    Format:
    - Use bullet points for key discussion topics
    - Preserve all code snippets and technical commands
    - Include decisions made and their rationale
    - List any unresolved questions or action items
    
    Content:
    - Focus on technical details, not social pleasantries
    - Maintain exact terminology and technical terms
    - Preserve version numbers, file paths, and configurations
    ```

??? example "Problem-Solving Sessions"

    ```
    Summarize the troubleshooting conversation:
    
    1. Problem Statement: Brief description of the original issue
    2. Steps Attempted: List of solutions tried and their outcomes
    3. Current Status: Where we are now in the debugging process
    4. Next Actions: What to try next
    
    Keep all error messages and diagnostic output verbatim.
    ```

---

**Summary Model**

Specifies which AI model to use for generating conversation summaries.

!!! info "Available Models"
    Model availability depends on your account and integrations.

**Choosing the Right Model**

When selecting a summary model, consider the following factors:

* **Speed**: Faster models generate summaries more quickly but may provide less nuanced results
* **Cost**: Different models have varying API costs per token
* **Quality**: More advanced models typically produce higher quality summaries with better context preservation
* **Technical Content**: Some models are better at preserving technical terminology, code snippets, and specialized vocabulary

**General Considerations:**

* **Cost-Sensitive Projects**: Choose more economical models for routine conversations where basic summarization is sufficient
* **Quality-Critical Applications**: Use more capable models when summary accuracy and detail preservation are essential
* **Technical Discussions**: Advanced models typically better preserve technical terminology, code structures, and domain-specific language
* **Long Conversations**: More capable models generally handle extensive context more effectively and produce more coherent summaries

---

**Summary Trigger Ratio**

Specifies the threshold at which automatic summarization is triggered, as a ratio of current context to maximum context tokens.

**Understanding the Value:**

* **0.8 (default)**: Summarize at 80% of max tokens - recommended balance
* **0.5**: Summarize at 50% - more frequent summarization, keeps context leaner
* **0.9**: Summarize at 90% - less frequent summarization, maintains more detail
* **1.0**: Summarize only when max tokens reached - minimal summarization

!!! info "How It Works"
    Trigger Point = Max Context Tokens × Summary Trigger Ratio
    
    **Example:**
    
      - Max Context Tokens = 64,000
      - Summary Trigger Ratio = 0.8
      - Trigger Point = 64,000 × 0.8 = 51,200 tokens
      
      → Summarization occurs when context reaches 51,200 tokens

**Choosing the Right Ratio**

??? tip "Lower Ratio (0.5-0.7)"

    **When to Use:**
    
    * Cost optimization is priority
    * Conversations tend to be very long
    * Context quality remains good with aggressive summarization
    
    **Effects:**
    
    * ✔️ Lower token costs
    * ✔️ More headroom before hitting model limits
    * ✔️ Summaries generated earlier, keeping context concise
    * ✘ More frequent summarization may lose some detail
    * ✘ AI may need clarification more often

??? tip "Default Ratio (0.8)"

    **When to Use:**
    
    * Standard use cases (recommended for most users)
    * Balance between quality and cost
    * Default setting works well for typical conversations
    
    **Effects:**
    
    * ✔️ Good balance of context retention and efficiency
    * ✔️ Summarization triggered before approaching limits
    * ✔️ Leaves buffer for model's response generation
    * ✔️ Proven to work well in practice

??? tip "Higher Ratio (0.9-1.0)"

    **When to Use:**
    
    * Maximum context retention needed
    * Conversations are moderately long
    * Cost is less of a concern
    * Working with context-sensitive tasks
    
    **Effects:**
    
    * ✔️ Maximum detail preservation
    * ✔️ Less frequent summarization
    * ✔️ AI has more complete conversation history
    * ✘ Higher token costs
    * ✘ Risk of hitting model limits if conversation continues

---

**Min Messages for Summary**

Specifies the minimum number of messages required before summarization can be triggered.

**Why This Setting Exists:**

* **Prevents Premature Summarization**: Avoids summarizing very short conversations
* **Maintains Initial Context**: Early messages often contain critical setup information
* **Quality Control**: Summaries of very short exchanges may lose important nuance
* **Performance**: Avoids summarization overhead for brief interactions

!!! info "How It Works"
    **Summarization Prerequisites:**
    
    1. Message count ≥ Min Messages for Summary
       AND
    2. Current tokens ≥ (Max Context Tokens × Summary Trigger Ratio)
    
    **Example:**
    
      - Min Messages for Summary = 10
      
      - Conversation with 8 messages:
        → Summarization will NOT trigger (even if token threshold reached)
      
      - Conversation with 12 messages:
        → Summarization can trigger (if token threshold also reached)

**Choosing the Right Value**

??? tip "Short Conversations (3-5 messages)"

    **When to Use:**
    
    * Quick Q&A sessions
    * Single-topic inquiries
    * Brief clarifications
    
    **Setting: 3-5 messages**
    
    * Allows summarization of even short exchanges
    * Useful if conversations are always brief but token-heavy (e.g., code reviews)

??? tip "Standard Conversations (10 messages - default)"

    **When to Use:**
    
    * Typical development sessions
    * Moderate-length discussions
    * Balanced approach
    
    **Setting: 8-12 messages (default 10)**
    
    * Recommended for most use cases
    * Ensures conversation has established context before summarizing
    * Protects important early discussion from being condensed too soon

??? tip "Extended Conversations (15-30 messages)"

    **When to Use:**
    
    * Long troubleshooting sessions
    * In-depth technical discussions
    * Complex multi-step problem-solving
    
    **Setting: 15-30 messages**
    
    * Preserves more conversation history before summarization
    * Appropriate when early context is crucial for understanding
    * Use with higher Max Context Tokens to accommodate

---

**Target Summary Tokens**

Specifies the target length (in tokens) for generated conversation summaries.

**Token Reference:**

* **64 tokens**: ~48 words - very brief summary
* **256 tokens**: ~192 words - short paragraph summary
* **1024 tokens**: ~768 words - moderate detail summary
* **4096 tokens (default)**: ~3072 words - comprehensive summary

!!! info "How It Works"
    **Original Conversation:**
    
      - Messages 1-20: 45,000 tokens
      
    **After Summarization:**
    
      - Summary of messages 1-15: ~4,096 tokens (Target Summary Tokens)
      - Original messages 16-20: 15,000 tokens (preserved recent messages)
      
    **Result:**
    
      - Total Context: ~19,096 tokens (reduced from 45,000)

**Choosing the Right Value**

??? tip "Brief Summaries (64-512 tokens)"

    **When to Use:**
    
    * Conversations are highly repetitive
    * Maximum token savings needed
    * Simple Q&A that doesn't require much context
    
    **Effects:**
    
    * ✔️ Maximum token reduction
    * ✔️ Lowest summarization costs
    * ✔️ Fastest summary generation
    * ✘ May lose important details
    * ✘ AI may need clarification more often

??? tip "Moderate Summaries (512-2048 tokens)"

    **When to Use:**
    
    * Balance detail retention with token savings
    * Standard technical discussions
    * General-purpose conversations
    
    **Effects:**
    
    * ✔️ Good balance of detail and conciseness
    * ✔️ Preserves key points and decisions
    * ✔️ Reasonable token costs
    * ✔️ Suitable for most use cases

??? tip "Comprehensive Summaries (2048-4096 tokens - default)"

    **When to Use:**
    
    * Complex technical discussions
    * Multi-topic conversations
    * Conversations with critical context that must be preserved
    * Detailed problem-solving sessions
    
    **Effects:**
    
    * ✔️ Maximum detail preservation (default)
    * ✔️ Rich context for AI to reference
    * ✔️ Better continuity across long conversations
    * ✘ Higher summarization costs
    * ✘ Summaries themselves consume significant tokens

??? tip "Relationship with Summary Trigger Ratio"

    Consider both settings together:
    
    ```
    Scenario 1: Aggressive Compression
      Summary Trigger Ratio: 0.5 (early summarization)
      Target Summary Tokens: 512 (brief summaries)
      → Frequent, concise summaries = maximum token savings
    
    Scenario 2: Maximum Context (default)
      Summary Trigger Ratio: 0.8 (late summarization)
      Target Summary Tokens: 4096 (comprehensive summaries)
      → Infrequent, detailed summaries = maximum context retention
    
    Scenario 3: Balanced
      Summary Trigger Ratio: 0.7
      Target Summary Tokens: 2048
      → Moderate approach balancing both needs
    ```

---

## Long-term Memory

**Coming Soon**

Manage what the AI remembers about you across conversations.

!!! warning "Future Feature"
    Long-term memory capabilities are currently in development. This feature will allow you to:
    
    * Store persistent information about your preferences across all conversations
    * Build a knowledge base of your workflows and patterns
    * Enable the AI to remember your context without manual setup
    * Maintain continuity across different projects and time periods

---

## How Settings Apply

!!! warning "Important Information"
    **Automatic Application:**
    
    All settings automatically apply to every **new** conversation you create in Chat, Agents, and Pipelines. Settings are stored in your user profile and persist across sessions and devices.
    
    **Limitations:**
    
    * **Only affects new conversations**: Existing conversations retain their original settings
    * **Personal settings**: Does not apply to conversations created by other users or shared conversations
    * **Agent/Pipeline configs**: Agent and Pipeline definitions have their own independent settings
    * **Mid-conversation adjustments**: Context Management and Summarization can be changed during conversations using the Context Budget widget

---

## Understanding the Three Configuration Sections

The Personalization page contains three accordion sections that work together to provide comprehensive conversation control.

| Aspect | PERSONALIZATION | DEFAULT CONTEXT MANAGEMENT | DEFAULT SUMMARIZATION |
|--------|----------------|---------------------------|----------------------|
| **Purpose** | Define AI personality and behavior | Manage conversation memory and token usage | Automatically condense long conversations |
| **What It Controls** | How the AI communicates | How much context is retained | When and how summaries are created |
| **When Applied** | At conversation creation | Throughout conversation lifecycle | During conversation when thresholds reached |
| **Key Settings** | • Default Personality<br>• Default Instructions | • Enable Toggle<br>• Max Context Tokens<br>• Preserve Recent Messages | • Enable Toggle<br>• Summarization Instructions<br>• Summary Model<br>• Trigger Ratio<br>• Min Messages<br>• Target Tokens |
| **Can Change Mid-Conversation** | ✘ No (set at creation) | ✔️ Yes (via Context Budget widget) | ✔️ Yes (via Context Budget widget) |
| **Primary Use Case** | Customize assistant personality and behavior | Optimize token usage and prevent limit errors | Maintain context quality in long conversations |
| **Impact On** | Response style and content | Token costs and context availability | Context efficiency and conversation continuity |

### How They Work Together

**Example Scenario: Long Development Session**

1. **PERSONALIZATION** (Foundation):
   - Personality: "Nerdy" - Technical deep-dives
   - Instructions: "Use TypeScript, include unit tests, explain trade-offs"
   - Result: AI uses technical language and provides detailed code examples

2. **DEFAULT CONTEXT MANAGEMENT** (Efficiency):
   - Max Context Tokens: 64,000
   - Preserve Recent Messages: 5
   - Result: AI can reference extensive history (up to 64K tokens) while always keeping last 5 exchanges

3. **DEFAULT SUMMARIZATION** (Optimization):
   - Enabled: Yes
   - Trigger Ratio: 0.8 (at 51,200 tokens)
   - Min Messages: 10
   - Target Tokens: 4,096
   - Result: After 10+ messages when context reaches 51K tokens, older messages are condensed into a 4K token summary

**Combined Effect**:

* AI maintains technical, detailed communication style throughout (Personalization)
* Conversation can continue indefinitely without hitting token limits (Context Management + Summarization)
* Recent context always available for coherent responses (Preserve Recent Messages)
* Token costs optimized by automatic summarization of older content
* Consistent quality even in very long debugging or development sessions

---

## Best Practices

**Configuring All Three Sections Together**

??? tip "Start with Defaults, Then Customize"

    1. **Test Default Settings First**:
       - Personalization: Generic personality, no custom instructions
       - Context Management: Enabled, 64,000 tokens, 5 preserved messages
       - Summarization: Enabled, 0.8 ratio, 10 min messages, 4,096 target tokens
    
    2. **Monitor Conversation Quality**:
       - Are responses in the style you need?
       - Do you hit token limits?
       - Does summarization maintain enough detail?
    
    3. **Adjust One Section at a Time**:
       - Change personality or add instructions first
       - Adjust context limits if needed
       - Fine-tune summarization last
    
    4. **Document What Works**:
       - Keep notes on effective configurations
       - Track which settings work for which types of tasks

??? tip "Consider Your Conversation Patterns"

    **For Short Conversations (< 20 messages):**
    
    * Focus on Personalization (personality + instructions most important)
    * Context Management: Lower token limits (20,000-30,000) to save costs
    * Summarization: Can disable or set higher min messages (15-20)
    
    **For Medium Conversations (20-50 messages):**
    
    * All three sections important
    * Context Management: Standard limits (40,000-64,000)
    * Summarization: Default settings work well
    
    **For Long Conversations (50+ messages):**
    
    * Context Management: Higher limits (64,000-128,000)
    * Summarization: Critical for cost control
    * Consider lower trigger ratio (0.6-0.7) for more aggressive summarization

??? tip "Balance Quality, Cost, and Performance"

    **Quality-Focused Configuration:**
    
    ```
    Personalization:
      - Personality: Match your work style
      - Instructions: Detailed, specific requirements
    
    Context Management:
      - Max Tokens: 100,000+ (high limit)
      - Preserve Messages: 10-15 (more recent context)
    
    Summarization:
      - Trigger Ratio: 0.9 (late summarization)
      - Target Tokens: 4,096 (comprehensive summaries)
      - Model: gpt-4.1 (high quality)
    
    Result: Maximum context retention, best AI responses, higher costs
    ```
    
    **Cost-Focused Configuration:**
    
    ```
    Personalization:
      - Personality: Generic (works for most cases)
      - Instructions: Brief, essential points only
    
    Context Management:
      - Max Tokens: 20,000 (lower limit)
      - Preserve Messages: 3-5 (minimal recent context)
    
    Summarization:
      - Trigger Ratio: 0.5 (early, frequent summarization)
      - Target Tokens: 1,024 (concise summaries)
      - Model: GPT-5 mini (efficient)
    
    Result: Minimal token usage, lower costs, may need more clarifications
    ```
    
    **Balanced Configuration (Recommended):**
    
    ```
    Personalization:
      - Personality: Choose based on primary use case
      - Instructions: 3-7 key requirements
    
    Context Management:
      - Max Tokens: 64,000 (default)
      - Preserve Messages: 5 (default)
    
    Summarization:
      - Trigger Ratio: 0.8 (default)
      - Target Tokens: 4,096 (default)
      - Model: GPT-5 mini (default)
    
    Result: Good quality, reasonable costs, works for most scenarios
    ```

**Choosing Default Personality**

??? tip "Align with Primary Use Case"

    * **Single Role**: Choose the personality that best matches your main work function
    * **Multiple Roles**: Select the personality you use most frequently
    * **Team Accounts**: If shared, choose Generic for balanced, versatile interactions
    * **Experimentation**: Try different personalities over a few days to find what works best

??? tip "Consider Team Communication Style"

    * **Formal Environments**: Generic or QA for professional, technical communication
    * **Creative Teams**: Quirky for innovative, out-of-the-box thinking
    * **Technical Teams**: Nerdy for deep, detailed technical discussions
    * **Critical Review**: Cynical for thorough, skeptical analysis

??? tip "Personality Can Be Overridden"

    * Personalization sets the default for all new conversations
    * Individual conversations can have different settings if needed
    * No need to frequently change your default unless your work focus shifts

---

**Writing Effective Default Instructions**

??? tip "Be Specific and Actionable"

    **Good Examples:**
    
    * ✔️ "Always include code examples in Python with type hints"
    * ✔️ "Structure responses with a summary paragraph first, then details"
    * ✔️ "Check for security vulnerabilities in all code suggestions"
    
    **Avoid Vague Instructions:**
    
    * ✘ "Be helpful" (too generic, no clear action)
    * ✘ "Give good answers" (subjective, no specific guidance)
    * ✘ "Make things clear" (ambiguous, means different things to different people)

??? tip "Keep Instructions Focused"

    * **Prioritize**: Include only the most important requirements
    * **Length**: Aim for 3-7 key points (typically 100-300 words)
    * **Clarity**: Use clear, direct language without ambiguity
    * **Relevance**: Focus on instructions that apply broadly to your work
    
    **Too Many Instructions Can:**
    
    * Confuse the AI with conflicting requirements
    * Reduce response quality due to complexity
    * Make it harder to maintain and update over time

??? tip "Use Consistent Terminology"

    * **Standards**: Reference specific frameworks, style guides, or methodologies
      * Example: "Follow PEP 8 for Python code" instead of "use good Python style"
    * **Technical Terms**: Use precise technical vocabulary
      * Example: "Use async/await pattern" instead of "make it asynchronous"
    * **Format**: Specify exact formats
      * Example: "Use ISO 8601 date format (YYYY-MM-DD)" instead of "use standard dates"
    * **Examples**: Include brief examples for complex requirements

??? tip "Structure Instructions Logically"

    Organize instructions by category for better clarity:
    
    ```
    Communication Style:
    - Use clear, concise language
    - Include executive summaries for complex topics
    
    Technical Requirements:
    - Follow PEP 8 for Python code
    - Include unit test examples
    
    Output Format:
    - Structure responses with numbered steps
    - Use markdown formatting for code blocks
    ```

??? tip "Review and Update Regularly"

    * **Monthly Review**: Check if instructions still match your current needs
    * **Project Changes**: Update when starting new types of projects or roles
    * **Team Feedback**: Adjust based on conversation quality and outcomes
    * **Refinement**: Simplify or clarify instructions that aren't working well
    * **Version Control**: Keep notes on what changes you make and why

---

**Testing Your Personalization Settings**

??? tip "Test Incrementally"

    * **Start Simple**: Begin with just personality selection, no custom instructions
    * **Add Instructions Gradually**: Add one instruction at a time
    * **Evaluate Each**: Use the new settings in several conversations before adding more
    * **Document**: Keep notes on what works well and what doesn't
    * **Iterate**: Refine based on actual conversation outcomes

??? tip "Create Test Conversations"

    * **Test Personality**: Create a new conversation and ask open-ended questions to see personality in action
    * **Test Instructions**: Ask the AI to perform tasks that should trigger your custom instructions
    * **Compare Responses**: Try same question with different personality settings to see differences
    * **Edge Cases**: Test with requests that might conflict with your instructions

---

## Troubleshooting

??? warning "Settings Not Applying to New Conversations"

    **Symptoms:**
    
    * New conversations don't reflect configured personality
    * Default instructions not being followed in new conversations
    * AI behavior seems unchanged after saving settings
    
    **Diagnosis:**
    
    1. Verify you clicked **Save Changes** button and saw success message
    2. Check if you're testing in an existing conversation (settings only apply to new ones)
    3. Confirm settings are visible when reopening Profile settings page
    4. Look for any error messages that appeared during save
    
    **Resolution:**
    
    1. Navigate back to Profile settings → Personalization
    2. Verify all configurations are present and correct
    3. Click **Save Changes** again to ensure persistence
    4. Create a brand new conversation (not continuing an existing one)
    5. Test with specific questions that should trigger your personality/instructions
    6. Clear browser cache if issues persist: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)

??? warning "AI Not Following Default Instructions"

    **Symptoms:**
    
    * AI responses don't follow specified guidelines
    * Instructions appear to be partially followed or ignored
    * Inconsistent behavior across different conversations
    
    **Possible Causes:**
    
    1. **Instructions Too Complex**: Conflicting or contradictory requirements
    2. **Instructions Too Vague**: Ambiguous guidelines that AI can't interpret clearly
    3. **Model Limitations**: Some instructions may be beyond model's current capabilities
    4. **User Messages Override**: Your questions contradict default instructions
    
    **Resolution:**
    
    1. **Simplify Instructions**:
       - Reduce to 3-5 key points
       - Make each instruction specific and actionable
       - Remove any conflicting requirements
       - Test with minimal instructions first, then add complexity
    
    2. **Clarify Requirements**:
       - Replace vague terms ("good", "clear", "helpful") with specific examples
       - Use concrete technical terminology
       - Provide examples of desired behavior in the instructions themselves
    
    3. **Check for Conflicts**:
       - Review instructions for contradictions
       - Ensure personality choice aligns with instruction style
       - Test with Generic personality to isolate instruction issues
    
    4. **Test Incrementally**:
       - Start with one instruction, verify it works in new conversation
       - Add instructions one at a time
       - Identify which instruction causes problems
       - Refine problematic instruction before adding more

??? warning "Personality Selection Not Visible in Responses"

    **Symptoms:**
    
    * All personalities seem to behave the same way
    * Communication style doesn't match selected personality
    * Can't tell the difference between Generic and other personalities
    
    **Explanation:**
    
    * Personality differences are subtle and contextual
    * Some tasks (e.g., simple data retrieval, calculations) don't show personality variation
    * Personality affects tone, approach, and detail level, not factual accuracy
    
    **Understanding:**
    
    * **Personality Affects**: Tone of voice, level of technical detail, approach to problem-solving, communication style, enthusiasm level
    * **Personality Doesn't Affect**: Factual accuracy, basic task completion, data retrieval, calculations
    * **Most Visible In**: Complex explanations, recommendations, creative tasks, problem-solving approaches, code reviews
    
    **To See Personality Differences:**
    
    1. **Ask Open-Ended Questions**: "How should I approach optimizing this code?" or "What are the trade-offs?"
    2. **Request Analysis**: "Analyze this architecture" or "Review this design"
    3. **Compare Side-by-Side**: Create conversations with different personalities, ask the same complex question
    4. **Use Creative Tasks**: Brainstorming, problem-solving, or design discussions show personality most clearly

??? warning "Save Operation Fails"

    **Symptoms:**
    
    * "Save Changes" button doesn't respond
    * Error message appears after clicking Save
    * Settings don't persist after page reload
    
    **Possible Causes:**
    
    1. Network connectivity issues
    2. Session timeout (logged out)
    3. Server error or maintenance
    4. Browser issues or extensions blocking request
    
    **Resolution:**
    
    1. **Check Network**: Ensure stable internet connection
    2. **Refresh Page**: Reload page and try again (Ctrl+R or Cmd+R)
    3. **Check Login**: Verify you're still logged in, re-authenticate if needed
    4. **Try Different Browser**: Test in incognito/private mode or different browser
    5. **Clear Cache**: Clear browser cache and cookies
    6. **Check Console**: Open browser console (F12) to see any error messages
    7. **Contact Support**: If issue persists, contact administrator with error details

---

!!! info "Related Documentation"
    
    * **[Context Management](../../how-tos/chat-conversations/context-management.md)** - Manage conversation memory and token usage
    * **[Chat Functionality](../../how-tos/chat-conversations/how-to-use-chat-functionality.md)** - Using chat features and conversations
    * **[Creating Agents](../../how-tos/chat-conversations/how-to-create-and-edit-agents-from-canvas.md)** - Configure agents with custom instructions
