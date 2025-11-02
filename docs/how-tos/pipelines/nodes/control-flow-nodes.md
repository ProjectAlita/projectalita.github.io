# Control Flow Nodes

Control Flow Nodes enable your pipeline to make decisions, route execution down different paths, and implement conditional logic. These nodes form the "decision-making" layer of your workflow, allowing pipelines to adapt behavior based on data, conditions, and intelligent reasoning.

**Available Control Flow Nodes:**

* **[Router Node](#router-node)** - Route execution based on condition matching with multiple named paths
* **[Condition Node](#condition-node)** - Branch execution based on conditional logic with named outputs
* **[Decision Node](#decision-node)** - LLM-powered intelligent routing based on natural language criteria

---

## Router Node

The Router Node evaluates a condition and routes pipeline execution to one of multiple named paths. It uses template-based conditions (similar to Jinja2 syntax) to determine which route to take, with a default fallback route if no conditions match.

![Router Node Interface](../../../../img/how-tos/pipelines/nodes/control-flow/router-node-interface.png)

### Purpose

Use the Router Node to:

* **Route execution** to different paths based on state variable values
* **Implement branching logic** with multiple named routes
* **Evaluate complex conditions** using template syntax
* **Provide fallback behavior** with default output
* **Create multi-path workflows** based on data conditions

### Configuration

#### Basic Configuration

```yaml
- id: "route_by_status"
  type: "router"
  condition: |
    {% if 'approved' in input|lower %}
    ArticlePublisher
    {% elif 'finish' in input|lower %}
    END
    {% endif %}
  routes: ["ArticlePublisher", "END"]
  input: ["input"]
  default_output: "ArticleReviewer"
```

![Router Node Basic Configuration](../../../../img/how-tos/pipelines/nodes/control-flow/router-node-basic-config.png)

### Parameters

#### Condition

**Purpose**: Define the conditional logic that determines which route to take.

**Syntax**: Uses template syntax (Jinja2-like) with:

* `{% if condition %}` - Start conditional block
* `{% elif condition %}` - Alternative condition
* `{% else %}` - Fallback condition
* `{% endif %}` - End conditional block
* State variable access: Use variable names directly (e.g., `input`, `status`, `user_type`)
* Filters: `|lower`, `|upper`, `in` operator for substring matching

![Router Node Condition](../../../../img/how-tos/pipelines/nodes/control-flow/router-node-condition.png)

**Example Condition**:
```jinja2
{% if 'approved' in input|lower %}
ArticlePublisher
{% elif 'finish' in input|lower %}
END
{% endif %}
```

**How It Works**:

1. Router evaluates the condition from top to bottom
2. When a condition matches, it returns the associated route name
3. Execution proceeds to the node specified in that route
4. If no conditions match, execution goes to the default output

**Template Features**:

**String Operations**:

```jinja2
{% if 'error' in status|lower %}
ErrorHandler
{% elif status|upper == 'SUCCESS' %}
SuccessPath
{% endif %}
```

**Comparisons**:

```jinja2
{% if priority == 'high' %}
UrgentPath
{% elif priority == 'medium' %}
NormalPath
{% else %}
LowPriorityPath
{% endif %}
```

**Logical Operators**:

```jinja2
{% if status == 'approved' and user_type == 'admin' %}
AdminApprovedPath
{% elif status == 'approved' %}
UserApprovedPath
{% endif %}
```

#### Routes

**Purpose**: Define the named paths (node IDs) that the router can select.

**Configuration**: List of node IDs that correspond to the route names returned by the condition.

![Router Node Routes](../../../../img/how-tos/pipelines/nodes/control-flow/router-node-routes.png)

**Example**:
```yaml
Routes:
  - ArticlePublisher
  - END
```

**Route Mapping**:

The condition returns a route name, which must match a node ID in the Routes list:

```jinja2
Condition returns: "ArticlePublisher"
Routes contains: ["ArticlePublisher", "END"]
Execution goes to: Node with ID "ArticlePublisher"
```

**Important**: Route names in the condition must **exactly match** node IDs in the pipeline.

#### Input

**Purpose**: Specify which state variables the Router node reads for condition evaluation.

**Options**:

* Default states: `input`, `messages`
* Custom states: Any state variables you've defined

**Example**:
```yaml
Input:
  - input
  - status
  - user_type
```

**Usage in Condition**:
```jinja2
{% if 'approved' in input|lower and status == 'ready' %}
ApprovedPath
{% endif %}
```

#### Default Output

**Purpose**: Specify the fallback route if no conditions in the Router match.

**Options**: Select a node ID from available nodes in the pipeline.

**Example**:
```yaml
Default Output: ArticleReviewer
```

**Fallback Behavior**:

If the condition doesn't return any route name:
```jinja2
{% if 'approved' in input|lower %}
ArticlePublisher
{% elif 'finish' in input|lower %}
END
{% endif %}
```

And `input` contains "pending" (no match):
→ Execution goes to `Default Output` ("ArticleReviewer")

### Examples

#### Example 1: Simple Status Router

Route based on approval status:

```yaml
- id: "approval_router"
  type: "router"
  condition: |
    {% if 'approved' in input|lower %}
    PublishArticle
    {% elif 'rejected' in input|lower %}
    NotifyAuthor
    {% elif 'finish' in input|lower %}
    END
    {% endif %}
  routes: ["PublishArticle", "NotifyAuthor", "END"]
  input: ["input"]
  default_output: "RequestReview"
```

**Execution Flow**:

* Input contains "approved" → Go to `PublishArticle` node
* Input contains "rejected" → Go to `NotifyAuthor` node
* Input contains "finish" → Go to `END` node
* Input contains "pending" → Go to `RequestReview` (default)

#### Example 2: Priority-Based Router

Route tickets by priority level:

```yaml
- id: "priority_router"
  type: "router"
  condition: |
    {% if priority|lower == 'critical' %}
    UrgentHandler
    {% elif priority|lower == 'high' %}
    HighPriorityHandler
    {% elif priority|lower == 'medium' %}
    NormalHandler
    {% else %}
    LowPriorityHandler
    {% endif %}
  routes: ["UrgentHandler", "HighPriorityHandler", "NormalHandler", "LowPriorityHandler"]
  input: ["priority"]
  default_output: "NormalHandler"
```

#### Example 3: User Type Router

Route based on user permissions:

```yaml
- id: "user_type_router"
  type: "router"
  condition: |
    {% if user_role == 'admin' %}
    AdminWorkflow
    {% elif user_role == 'manager' %}
    ManagerWorkflow
    {% elif user_role == 'user' %}
    UserWorkflow
    {% endif %}
  routes: ["AdminWorkflow", "ManagerWorkflow", "UserWorkflow"]
  input: ["user_role"]
  default_output: "GuestWorkflow"
```

#### Example 4: Multi-Condition Router

Combine multiple conditions:

```yaml
- id: "complex_router"
  type: "router"
  condition: |
    {% if status == 'approved' and user_type == 'premium' %}
    PremiumApprovedPath
    {% elif status == 'approved' %}
    StandardApprovedPath
    {% elif status == 'pending' and priority == 'high' %}
    UrgentReviewPath
    {% elif status == 'pending' %}
    NormalReviewPath
    {% endif %}
  routes: ["PremiumApprovedPath", "StandardApprovedPath", "UrgentReviewPath", "NormalReviewPath"]
  input: ["status", "user_type", "priority"]
  default_output: "DefaultPath"
```

#### Example 5: String Matching Router

Route based on keyword detection:

```yaml
- id: "keyword_router"
  type: "router"
  condition: |
    {% if 'bug' in input|lower or 'error' in input|lower %}
    BugFixWorkflow
    {% elif 'feature' in input|lower or 'enhancement' in input|lower %}
    FeatureWorkflow
    {% elif 'documentation' in input|lower or 'docs' in input|lower %}
    DocsWorkflow
    {% endif %}
  routes: ["BugFixWorkflow", "FeatureWorkflow", "DocsWorkflow"]
  input: ["input"]
  default_output: "GeneralWorkflow"
```

### Best Practices

#### 1. Always Provide Default Output

Ensure fallback behavior for unmatched conditions:

✅ **Good**:
```yaml
default_output: "FallbackNode"
```

❌ **Avoid**:
```yaml
# Missing default_output - pipeline may fail
```

#### 2. Match Route Names Exactly

Route names in condition must match node IDs:

✅ **Good**:
```jinja2
{% if status == 'approved' %}
ArticlePublisher  # Matches node ID exactly
{% endif %}
```

❌ **Avoid**:
```jinja2
{% if status == 'approved' %}
article_publisher  # Case mismatch
{% endif %}
```

#### 3. Order Conditions by Specificity

Place most specific conditions first:

✅ **Good**:
```jinja2
{% if status == 'approved' and priority == 'high' %}
UrgentApproved
{% elif status == 'approved' %}
NormalApproved
{% endif %}
```

❌ **Avoid**:
```jinja2
{% if status == 'approved' %}  # Too broad, catches all approved
NormalApproved
{% elif status == 'approved' and priority == 'high' %}  # Never reached
UrgentApproved
{% endif %}
```

#### 4. Use Filters for String Comparisons

Normalize strings for reliable matching:

✅ **Good**:
```jinja2
{% if 'approved' in input|lower %}
```

❌ **Avoid**:
```jinja2
{% if 'approved' in input %}  # Case-sensitive, may miss "Approved"
```

#### 5. List All Routes

Include all possible routes in the Routes list:

✅ **Good**:
```yaml
routes: ["PathA", "PathB", "PathC", "END"]
```

#### 6. Test All Paths

Ensure every condition path is reachable:

```yaml
# Test cases:
# - status='approved' → PathA
# - status='pending' → PathB
# - status='rejected' → PathC
# - status='unknown' → DefaultPath
```

#### 7. Use Descriptive Route Names

Name routes clearly to indicate their purpose:

✅ **Good**:
```yaml
routes: ["ApprovedWorkflow", "RejectedWorkflow", "PendingReview"]
```

❌ **Avoid**:
```yaml
routes: ["Path1", "Path2", "Path3"]
```

#### 8. Document Complex Conditions

Add comments in YAML to explain routing logic:

```yaml
# Routes based on approval status and user type
# - Admin + Approved → FastTrackPublish
# - User + Approved → StandardPublish
# - Any + Pending → ReviewQueue
condition: |
  {% if status == 'approved' and user_type == 'admin' %}
  FastTrackPublish
  {% elif status == 'approved' %}
  StandardPublish
  {% elif status == 'pending' %}
  ReviewQueue
  {% endif %}
```

---

## Condition Node

The Condition Node branches pipeline execution based on conditional logic, similar to the Router Node but with a focus on binary or multi-output branching. It evaluates template-based conditions and routes to named conditional outputs.

![Condition Node Interface](../../../../img/how-tos/pipelines/nodes/control-flow/condition-node-interface.png)

### Purpose

Use the Condition Node to:

* **Branch execution** based on state variable conditions
* **Create named output paths** for different conditions
* **Implement if-else logic** in pipeline flow
* **Route to specific nodes** based on evaluation results
* **Provide multiple conditional branches** with named outputs

### Configuration

#### Basic Configuration

```yaml
- id: "approval_check"
  type: "condition"
  conditional_input: "input"
  condition: |
    {% if 'approved' in input|lower %}
    Article Publisher
    {% else %}
    Article Reviewer
    {% endif %}
  conditional_outputs: ["Article Publisher"]
  default_output: "END"
```

![Condition Node Basic Configuration](../../../../img/how-tos/pipelines/nodes/control-flow/condition-node-basic-config.png)

### Parameters

#### Conditional Input

**Purpose**: Specify which state variable to use for condition evaluation.

**Options**:

* Default states: `input`, `messages`
* Custom states: Any state variables you've defined

![Condition Node Conditional Input](../../../../img/how-tos/pipelines/nodes/control-flow/condition-node-conditional-input.png)

**Example**:
```yaml
Conditional input: input
```

**Usage in Condition**:
```jinja2
{% if 'approved' in input|lower %}
Article Publisher
{% endif %}
```

#### Condition

**Purpose**: Define the conditional logic that determines which output path to take.

**Syntax**: Uses template syntax (Jinja2-like) similar to Router Node.

![Condition Node Condition Field](../../../../img/how-tos/pipelines/nodes/control-flow/condition-node-condition.png)

**Example Condition**:
```jinja2
{% if 'approved' in input|lower %}
Article Publisher
{% else %}
Article Reviewer
{% endif %}
```

**Template Syntax**:

**String Matching**:
```jinja2
{% if 'approved' in input|lower %}
ApprovedPath
{% else %}
RejectedPath
{% endif %}
```

**Comparisons**:
```jinja2
{% if status == 'complete' %}
CompletePath
{% else %}
IncompletePath
{% endif %}
```

**Multiple Conditions**:
```jinja2
{% if 'urgent' in input|lower %}
UrgentPath
{% elif 'normal' in input|lower %}
NormalPath
{% else %}
LowPriorityPath
{% endif %}
```

#### Conditional Outputs

**Purpose**: Define the named output paths that the condition can route to.

**Configuration**: List of node IDs or route names that correspond to the outputs returned by the condition.

![Condition Node Conditional Outputs](../../../../img/how-tos/pipelines/nodes/control-flow/condition-node-conditional-outputs.png)

**Example**:
```yaml
Conditional outputs:
  - Article Publisher
```

**How It Works**:

The condition returns a route name, which must be listed in Conditional Outputs:

```jinja2
Condition returns: "Article Publisher"
Conditional outputs contains: ["Article Publisher"]
Execution goes to: Node "Article Publisher"
```

**Multiple Outputs**:
```yaml
Conditional outputs:
  - Article Publisher
  - Article Reviewer
  - Urgent Reviewer
```

#### Default Output

**Purpose**: Specify the fallback route if the condition doesn't match any conditional outputs or returns `{% endif %}` without a match.

**Example**:
```yaml
Default output: END
```

### Examples

#### Example 1: Binary Approval Check

Simple approved/rejected branching:

```yaml
- id: "approval_check"
  type: "condition"
  conditional_input: "input"
  condition: |
    {% if 'approved' in input|lower %}
    PublishNode
    {% else %}
    ReviewNode
    {% endif %}
  conditional_outputs: ["PublishNode"]
  default_output: "ReviewNode"
```

**Execution Flow**:
- Input contains "approved" → Go to `PublishNode`
- Input doesn't contain "approved" → Go to `ReviewNode` (default)

#### Example 2: Multi-Branch Status Check

Route based on multiple status values:

```yaml
- id: "status_check"
  type: "condition"
  conditional_input: "status"
  condition: |
    {% if status == 'approved' %}
    ApprovedWorkflow
    {% elif status == 'pending' %}
    PendingWorkflow
    {% elif status == 'rejected' %}
    RejectedWorkflow
    {% else %}
    UnknownWorkflow
    {% endif %}
  conditional_outputs: ["ApprovedWorkflow", "PendingWorkflow", "RejectedWorkflow"]
  default_output: "UnknownWorkflow"
```

#### Example 3: Keyword-Based Routing

Route based on keyword detection:

```yaml
- id: "keyword_check"
  type: "condition"
  conditional_input: "input"
  condition: |
    {% if 'urgent' in input|lower or 'critical' in input|lower %}
    UrgentHandler
    {% elif 'normal' in input|lower %}
    NormalHandler
    {% else %}
    LowPriorityHandler
    {% endif %}
  conditional_outputs: ["UrgentHandler", "NormalHandler"]
  default_output: "LowPriorityHandler"
```

#### Example 4: Validation Check

Validate data before proceeding:

```yaml
- id: "validation_check"
  type: "condition"
  conditional_input: "validation_status"
  condition: |
    {% if validation_status == 'valid' %}
    ProcessData
    {% else %}
    ErrorHandler
    {% endif %}
  conditional_outputs: ["ProcessData"]
  default_output: "ErrorHandler"
```

#### Example 5: User Permission Check

Route based on user permissions:

```yaml
- id: "permission_check"
  type: "condition"
  conditional_input: "user_role"
  condition: |
    {% if user_role == 'admin' or user_role == 'manager' %}
    PrivilegedWorkflow
    {% else %}
    StandardWorkflow
    {% endif %}
  conditional_outputs: ["PrivilegedWorkflow"]
  default_output: "StandardWorkflow"
```

### Best Practices

#### 1. Always Define Default Output

Provide fallback for unmatched conditions:

✅ **Good**:
```yaml
default_output: "FallbackNode"
```

#### 2. List All Conditional Outputs

Include all possible output paths:

✅ **Good**:
```yaml
conditional_outputs: ["PathA", "PathB", "PathC"]
```

#### 3. Use Clear Output Names

Name outputs to indicate their purpose:

✅ **Good**:
```yaml
conditional_outputs: ["ApprovedWorkflow", "RejectedWorkflow"]
```

❌ **Avoid**:
```yaml
conditional_outputs: ["Output1", "Output2"]
```

#### 4. Normalize Input for Comparisons

Use filters for case-insensitive matching:

✅ **Good**:
```jinja2
{% if 'approved' in input|lower %}
```

#### 5. Match Output Names Exactly

Condition returns must match conditional_outputs exactly:

✅ **Good**:
```jinja2
{% if status == 'approved' %}
ApprovedWorkflow  # Matches conditional_outputs
{% endif %}
```

#### 6. Test All Branches

Verify each conditional path:

```yaml
# Test cases:
# - input='approved' → ApprovedWorkflow
# - input='rejected' → RejectedWorkflow
# - input='unknown' → DefaultWorkflow
```

#### 7. Use Descriptive Conditional Input

Name input variables clearly:

✅ **Good**:
```yaml
conditional_input: "approval_status"
```

❌ **Avoid**:
```yaml
conditional_input: "x"
```

#### 8. Document Branching Logic

Add comments explaining routing:

```yaml
# Routes approved requests to fast-track, others to review
condition: |
  {% if 'approved' in input|lower %}
  FastTrackPublish
  {% else %}
  ManualReview
  {% endif %}
```

---

## Decision Node

The Decision Node uses LLM intelligence to make routing decisions based on natural language criteria. Unlike Router and Condition nodes that use template-based conditions, the Decision Node analyzes the decision input and description to intelligently select the appropriate output path.

![Decision Node Interface](../../../../img/how-tos/pipelines/nodes/control-flow/decision-node-interface.png)

### Purpose

Use the Decision Node to:

* **Make intelligent routing decisions** using LLM reasoning
* **Route based on natural language criteria** without writing conditions
* **Handle complex decision logic** that's difficult to express in templates
* **Leverage context and semantics** for routing decisions
* **Simplify decision-making** with descriptive instructions

### Configuration

#### Basic Configuration

```yaml
- id: "intelligent_router"
  type: "decision"
  decision_input: "input"
  description: |
    Your task is to redirect a user to a proper node
    - if users wants to save listed branches then redirect to "LLM 2" node;
    - If the request is unclear, redirect to "END" node.
  decision_outputs: ["LLM 2"]
  default_output: "END"
```

![Decision Node Basic Configuration](../../../../img/how-tos/pipelines/nodes/control-flow/decision-node-basic-config.png)

### Parameters

#### Decision Input

**Purpose**: Specify which state variable the LLM analyzes to make the routing decision.

**Options**:

* Default states: `input`, `messages`
* Custom states: Any state variables you've defined

![Decision Node Decision Input](../../../../img/how-tos/pipelines/nodes/control-flow/decision-node-decision-input.png)

**Example**:
```yaml
Decision input: input
```

**Usage**: The LLM reads this state variable's content and analyzes it against the description criteria.

#### Description

**Purpose**: Provide natural language instructions describing how the LLM should make routing decisions.

**Format**: Clear, structured instructions with specific routing criteria.

![Decision Node Description](../../../../img/how-tos/pipelines/nodes/control-flow/decision-node-description.png)

**Example Description**:
```yaml
Description: |
  Your task is to redirect a user to a proper node
  - if users wants to save listed branches then redirect to "LLM 2" node;
  - If the request is unclear, redirect to "END" node.
```

**Best Practices for Descriptions**:

**Clear Criteria**:
```yaml
Description: |
  Route user requests based on intent:
  - Technical questions → TechnicalSupport
  - Billing questions → BillingSupport
  - General inquiries → GeneralSupport
  - Unclear requests → HumanAgent
```

**Specific Examples**:
```yaml
Description: |
  Analyze the user request and route accordingly:
  
  Route to "BugWorkflow" if:
  - User reports an error or bug
  - User describes unexpected behavior
  - User mentions system failures
  
  Route to "FeatureWorkflow" if:
  - User requests new functionality
  - User suggests improvements
  - User asks about capabilities
  
  Route to "HelpWorkflow" for all other cases.
```

**Structured Format**:
```yaml
Description: |
  ## Task
  Classify customer support requests
  
  ## Routing Rules
  1. Urgent issues (system down, data loss) → UrgentSupport
  2. Technical problems (bugs, errors) → TechnicalSupport
  3. Account questions (billing, subscriptions) → AccountSupport
  4. General questions → GeneralSupport
  
  ## Default
  If unclear or ambiguous → HumanAgent
```

#### Decision Outputs

**Purpose**: Define the possible output paths the LLM can select from.

**Configuration**: List of node IDs that the LLM can route execution to.

![Decision Node Decision Outputs](../../../../img/how-tos/pipelines/nodes/control-flow/decision-node-decision-outputs.png)

**Example**:
```yaml
Decision outputs:
  - LLM 2
  - TechnicalSupport
  - BillingSupport
```

**How It Works**:

1. LLM analyzes `decision_input` content
2. LLM reviews `description` for routing criteria
3. LLM selects appropriate output from `decision_outputs`
4. Execution proceeds to the selected node
5. If LLM can't decide, execution goes to `default_output`

#### Default Output

**Purpose**: Specify the fallback route if the LLM cannot make a confident decision.

**Example**:
```yaml
Default output: END
```

### Examples

#### Example 1: Customer Support Router

Route customer inquiries by intent:

```yaml
- id: "support_router"
  type: "decision"
  decision_input: "customer_message"
  description: |
    Analyze the customer message and route to the appropriate support team:
    
    - Technical issues (bugs, errors, system problems) → TechnicalSupport
    - Billing questions (invoices, payments, subscriptions) → BillingSupport
    - Account issues (login, password, profile) → AccountSupport
    - General questions (how-to, features, documentation) → GeneralSupport
    
    If the request is urgent or critical, route to UrgentSupport.
    If unclear, route to HumanAgent for manual review.
  decision_outputs: ["TechnicalSupport", "BillingSupport", "AccountSupport", "GeneralSupport", "UrgentSupport"]
  default_output: "HumanAgent"
```

#### Example 2: Content Moderation Router

Route content based on moderation analysis:

```yaml
- id: "content_moderator"
  type: "decision"
  decision_input: "user_content"
  description: |
    Analyze user-submitted content and route appropriately:
    
    Route to "AutoApprove" if:
    - Content is appropriate and safe
    - No policy violations detected
    - Content quality is acceptable
    
    Route to "ManualReview" if:
    - Content is borderline or questionable
    - Requires human judgment
    - Contains sensitive topics
    
    Route to "AutoReject" if:
    - Content clearly violates policies
    - Contains prohibited material
    - Is spam or malicious
  decision_outputs: ["AutoApprove", "ManualReview"]
  default_output: "AutoReject"
```

#### Example 3: Sentiment-Based Router

Route based on customer sentiment:

```yaml
- id: "sentiment_router"
  type: "decision"
  decision_input: "customer_feedback"
  description: |
    Analyze customer feedback sentiment and route accordingly:
    
    - Very positive feedback → ThankYouResponse
    - Positive feedback → StandardResponse
    - Neutral feedback → FollowUpResponse
    - Negative feedback → ConcernResponse
    - Very negative or angry feedback → UrgentResponse
  decision_outputs: ["ThankYouResponse", "StandardResponse", "FollowUpResponse", "ConcernResponse"]
  default_output: "UrgentResponse"
```

#### Example 4: Task Priority Router

Route tasks by priority assessment:

```yaml
- id: "priority_router"
  type: "decision"
  decision_input: "task_description"
  description: |
    Assess task priority and route to appropriate workflow:
    
    Critical Priority (route to CriticalWorkflow):
    - System outages or failures
    - Security vulnerabilities
    - Data loss or corruption
    - Immediate business impact
    
    High Priority (route to HighPriorityWorkflow):
    - Important features or bugs
    - Customer-facing issues
    - Deadline-driven tasks
    
    Normal Priority (route to NormalWorkflow):
    - Standard features or improvements
    - Non-urgent bugs
    - Maintenance tasks
    
    Low Priority (route to LowPriorityWorkflow):
    - Nice-to-have features
    - Minor improvements
    - Backlog items
  decision_outputs: ["CriticalWorkflow", "HighPriorityWorkflow", "NormalWorkflow"]
  default_output: "LowPriorityWorkflow"
```

#### Example 5: Language Detection Router

Route based on detected language:

```yaml
- id: "language_router"
  type: "decision"
  decision_input: "user_message"
  description: |
    Detect the language of the user message and route to appropriate language handler:
    
    - English messages → EnglishSupport
    - Spanish messages → SpanishSupport
    - French messages → FrenchSupport
    - German messages → GermanSupport
    - Other languages → TranslationService
    
    If language cannot be detected, route to EnglishSupport as default.
  decision_outputs: ["EnglishSupport", "SpanishSupport", "FrenchSupport", "GermanSupport", "TranslationService"]
  default_output: "EnglishSupport"
```

### Best Practices

#### 1. Write Clear Decision Criteria

Provide specific, unambiguous routing rules:

✅ **Good**:
```yaml
description: |
  Route based on request type:
  - "bug report" or "error" → BugWorkflow
  - "feature request" → FeatureWorkflow
  - "question" or "help" → SupportWorkflow
```

❌ **Avoid**:
```yaml
description: "Route the request appropriately"  # Too vague
```

#### 2. Provide Examples in Description

Help the LLM understand with examples:

✅ **Good**:
```yaml
description: |
  Route customer requests:
  
  Technical Support (examples: "app crashed", "error 500", "can't login"):
  → TechnicalSupport
  
  Billing Support (examples: "invoice question", "payment failed"):
  → BillingSupport
```

#### 3. Always Define Default Output

Provide fallback for unclear cases:

✅ **Good**:
```yaml
default_output: "HumanReview"
```

#### 4. List All Decision Outputs

Include all possible routing targets:

✅ **Good**:
```yaml
decision_outputs: ["PathA", "PathB", "PathC", "PathD"]
```

#### 5. Structure Descriptions Clearly

Use headings, lists, and clear formatting:

✅ **Good**:
```yaml
description: |
  ## Task
  Route support tickets
  
  ## Rules
  1. Urgent → UrgentSupport
  2. Technical → TechnicalSupport
  3. General → GeneralSupport
```

#### 6. Use Decision Node for Complex Routing

Choose Decision Node when:
- Routing logic is complex or nuanced
- Requires semantic understanding
- Template conditions are too rigid
- Human-like judgment is needed

#### 7. Test with Various Inputs

Verify LLM routing across different scenarios:

```yaml
# Test cases:
# - "app crashed" → TechnicalSupport
# - "billing question" → BillingSupport
# - "how do I..." → GeneralSupport
# - "urgent: data loss!" → UrgentSupport
```

#### 8. Monitor Decision Quality

Review LLM routing decisions periodically:

```yaml
# Enable interrupts during testing to review decisions
interrupt_after: true
```

#### 9. Provide Context in Description

Help the LLM make better decisions:

✅ **Good**:
```yaml
description: |
  Context: This is a customer support pipeline.
  Users submit requests that need to be categorized.
  
  Route technical issues to TechnicalSupport.
  Route billing questions to BillingSupport.
```

#### 10. Use Descriptive Output Names

Name outputs clearly to match description:

✅ **Good**:
```yaml
decision_outputs: ["TechnicalSupport", "BillingSupport", "GeneralSupport"]
```

❌ **Avoid**:
```yaml
decision_outputs: ["Output1", "Output2", "Output3"]
```

---

## Control Flow Nodes Comparison

| Feature | Router Node | Condition Node | Decision Node |
|---------|-------------|----------------|---------------|
| **Purpose** | Route execution based on template conditions with multiple paths | Branch execution based on conditional logic with named outputs | LLM-powered intelligent routing based on natural language criteria |
| **Decision Logic** | Template-based conditions (Jinja2-like) | Template-based conditions (Jinja2-like) | LLM reasoning from natural language description |
| **Configuration** | Condition, Routes, Input, Default Output | Conditional Input, Condition, Conditional Outputs, Default Output | Decision Input, Description, Decision Outputs, Default Output |
| **LLM Usage** | No LLM | No LLM | Yes (LLM analyzes and decides) |
| **Condition Syntax** | Template syntax with filters (`{% if %}`, `|lower`, `in`) | Template syntax with filters (`{% if %}`, `|lower`, `in`) | Natural language instructions |
| **Complexity** | Medium (template syntax) | Medium (template syntax) | Low (natural language) |
| **Flexibility** | High (full template control) | High (full template control) | Very High (LLM reasoning) |
| **Performance** | Fast (template evaluation) | Fast (template evaluation) | Slower (LLM overhead) |
| **Output Definition** | Routes list | Conditional outputs list | Decision outputs list |
| **Default Behavior** | Default output if no match | Default output if no match | Default output if LLM uncertain |
| **Best For** | Explicit multi-path routing with known conditions | Binary or multi-branch logic with clear conditions | Complex routing requiring semantic understanding |
| **Use Case** | Status-based routing, priority levels, keyword matching | Approval checks, validation branching, permission gates | Customer support routing, sentiment analysis, intent classification |

### When to Use Each Node

#### Router Node ✅

**Choose Router Node when you**:

* Need multiple named routes based on conditions
* Have explicit condition logic you can express in templates
* Want fast, deterministic routing without LLM overhead
* Know all possible paths and conditions upfront
* Need to match keywords, compare values, or check status

**Example**: Route tickets by priority level (critical/high/medium/low) or approval status (approved/pending/rejected).

#### Condition Node ✅

**Choose Condition Node when you**:

* Need binary or multi-branch conditional logic
* Have clear if-else routing requirements
* Want to use template-based conditions
* Need named conditional outputs for clarity
* Prefer explicit condition evaluation

**Example**: Approval check (approved → PublishPath, rejected → ReviewPath), validation branching (valid → ProcessPath, invalid → ErrorPath).

#### Decision Node ✅

**Choose Decision Node when you**:

* Need LLM intelligence for routing decisions
* Routing logic is complex or nuanced
* Want natural language decision criteria
* Require semantic understanding of input
* Template conditions are too rigid or complex

**Example**: Customer support routing by intent, sentiment-based routing, content moderation decisions.

!!! tip "Choosing Between Router and Condition"
    **Router Node** and **Condition Node** are very similar. The main differences:
    
    * **Router**: Uses `condition` + `routes` + `input` + `default_output`
    * **Condition**: Uses `conditional_input` + `condition` + `conditional_outputs` + `default_output`
    
    Both support the same template syntax. Choose based on your preference or existing patterns in your pipeline.

!!! tip "Combining Control Flow Nodes"
    You can use multiple control flow node types in the same pipeline:
    
    ```yaml
    nodes:
      - id: "initial_router"
        type: "router"  # Fast template-based routing
        
      - id: "approval_check"
        type: "condition"  # Binary approval branching
        
      - id: "intelligent_classifier"
        type: "decision"  # LLM-powered classification
    ```

---

## Related

* **[Nodes Overview](overview.md)** - Understand all available node types
* **[Interaction Nodes](interaction-nodes.md)** - LLM and Agent nodes for AI-powered tasks
* **[Execution Nodes](execution-nodes.md)** - Function, Tool, Code, and Custom nodes
* **[Iteration Nodes](iteration-nodes.md)** - Loop and Loop from Tool nodes
* **[States](../states.md)** - Manage data flow through pipeline state
* **[Connections](../connections.md)** - Link nodes together
* **[YAML Configuration](../yaml.md)** - See complete node syntax examples


