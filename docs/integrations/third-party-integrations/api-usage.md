# ELITEA API Integration Guide

## Overview

This guide provides comprehensive instructions for integrating with ELITEA AI agents using the REST API. Whether you're building custom applications, automating workflows, or integrating with third-party systems like JIRA or Power Automate, this guide covers all the essential API operations.

ELITEA offers two primary integration patterns:

| Pattern | Use Case | Description |
|---------|----------|-------------|
| **Conversation-based** | Multi-turn interactions | Create a conversation, add an agent participant, and exchange multiple messages with context retention |
| **Direct Prediction** | Single-shot requests | Call an agent directly for one-off tasks without managing conversation state |

## Authentication

All ELITEA API requests require authentication using a Personal Access Token (PAT).

### Obtaining a Personal Access Token

1. Navigate to **Settings** → **[Personal Access Tokens](../../menus/settings/personal-tokens.md)** in ELITEA
2. Click **Create Token**
3. Provide a descriptive name (e.g., "API Integration")
4. Copy and securely store the generated token

!!! warning "Token Security"
    - Store your PAT securely using environment variables or secret management
    - Never expose tokens in client-side code or version control
    - Rotate tokens periodically for enhanced security

### Authentication Header

Include the token in all API requests:

```
Authorization: Bearer {{YOUR_PAT}}
Content-Type: application/json
```

**curl Example:**

```bash
curl -X GET "https://next.elitea.ai/api/v1/..." \
  -H "Authorization: Bearer YOUR_PAT_HERE" \
  -H "Content-Type: application/json"
```

## Base URLs

| Environment | Base URL |
|-------------|----------|
| Production | `https://next.elitea.ai/api/v1/` |
| Development | `https://dev.elitea.ai/api/v1/` |

## Required Identifiers

Before making API calls, gather these identifiers from your ELITEA instance:

| Identifier | Location | Description |
|------------|----------|-------------|
| **Project ID** | Settings → Configuration | Your project's unique identifier |
| **Agent ID** | Agent details panel | The agent's unique identifier |
| **Agent Version ID** | Agent version selector | Specific version of the agent configuration |
| **Toolkit ID** | Toolkit configuration | (Optional) For attachment storage |

---

## Pattern 1: Conversation-Based Integration

Use this pattern for multi-turn interactions where context needs to be maintained across messages.

### Step 1: Create a Conversation

Creates a new conversation container for messages.

**Endpoint:**

```
POST {{BASE_URL}}chat/conversations/prompt_lib/{{PROJECT_ID}}
```

**Request Body:**

```json
{
  "name": "My Conversation Name",
  "is_private": false,
  "source": "alita",
  "participants": []
}
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name for the conversation |
| `is_private` | boolean | Whether the conversation is private |
| `source` | string | Source identifier (use `"alita"`) |
| `participants` | array | Initial participants (typically empty) |

**curl Example:**

```bash
curl -X POST "https://next.elitea.ai/api/v1/chat/conversations/prompt_lib/{{PROJECT_ID}}" \
  -H "Authorization: Bearer {{YOUR_PAT}}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Support-TICKET-123",
    "is_private": false,
    "source": "alita",
    "participants": []
  }'
```

**Response:**

```json
{
  "id": 12345,
  "uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "Support-TICKET-123",
  "created_at": "2026-01-16T10:30:00Z",
  ...
}
```

!!! tip "Save These Values"
    Store `id` as `conversation_id` and `uuid` as `conversation_uuid` for subsequent API calls.

---

### Step 2: Add an Agent Participant

Adds an AI agent to the conversation.

**Endpoint:**

```
POST {{BASE_URL}}chat/participants/prompt_lib/{{PROJECT_ID}}/{{CONVERSATION_ID}}
```

**Request Body:**

```json
{
  "entity_name": "application",
  "entity_meta": {
    "id": {{AGENT_ID}},
    "project_id": {{PROJECT_ID}}
  },
  "entity_settings": {
    "version_id": {{AGENT_VERSION_ID}}
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `entity_name` | string | Always `"application"` for agents |
| `entity_meta.id` | integer | The Agent ID |
| `entity_meta.project_id` | integer | The Project ID |
| `entity_settings.version_id` | integer | The Agent Version ID |

**curl Example:**

```bash
curl -X POST "https://next.elitea.ai/api/v1/chat/participants/prompt_lib/{{PROJECT_ID}}/{{CONVERSATION_ID}}" \
  -H "Authorization: Bearer {{YOUR_PAT}}" \
  -H "Content-Type: application/json" \
  -d '{
    "entity_name": "application",
    "entity_meta": {
      "id": 62,
      "project_id": 630
    },
    "entity_settings": {
      "version_id": 93
    }
  }'
```

**Response:**

```json
{
  "id": 67890,
  "entity_name": "application",
  "entity_meta": {...},
  ...
}
```

!!! tip "Save Participant ID"
    Store `id` as `participant_id` for sending messages.

---

### Step 3: Send a Message

Sends a message to the conversation and receives the agent's response.

**Endpoint:**

```
POST {{BASE_URL}}chat/messages/prompt_lib/{{PROJECT_ID}}/{{CONVERSATION_UUID}}
```

**Request Body:**

```json
{
  "participant_id": {{PARTICIPANT_ID}},
  "user_input": "Your message or question here",
  "await_task_timeout": -1,
  "return_task_id": true
}
```

| Field | Type | Description |
|-------|------|-------------|
| `participant_id` | integer | The agent's participant ID |
| `user_input` | string | The message to send to the agent |
| `await_task_timeout` | integer | `-1` for synchronous, `0` for async |
| `return_task_id` | boolean | Whether to return task tracking ID |
| `attachments_info` | array | (Optional) List of attachment references |

**curl Example:**

```bash
curl -X POST "https://next.elitea.ai/api/v1/chat/messages/prompt_lib/{{PROJECT_ID}}/{{CONVERSATION_UUID}}" \
  -H "Authorization: Bearer {{YOUR_PAT}}" \
  -H "Content-Type: application/json" \
  -d '{
    "participant_id": 67890,
    "user_input": "Please review this user story and provide feedback",
    "await_task_timeout": -1,
    "return_task_id": true
  }'
```

**Response:**

```json
{
  "id": 111213,
  "content": "Based on my review of the user story...",
  "task_id": "task-abc123",
  ...
}
```

---

## Pattern 2: Direct Prediction (Single-Shot)

Use this pattern for one-off agent interactions without managing conversation state.

**Endpoint:**

```
POST {{BASE_URL}}applications/predict/prompt_lib/{{PROJECT_ID}}/{{AGENT_VERSION_ID}}
```

**Request Body:**

```json
{
  "user_input": "Your message or data here",
  "chat_history": [],
  "async_mode": false
}
```

| Field | Type | Description |
|-------|------|-------------|
| `user_input` | string | The message or data to send to the agent |
| `chat_history` | array | (Optional) Previous conversation context |
| `async_mode` | boolean | (Optional) `true` for async execution, `false` for sync |

### Synchronous Mode (Default)

The request waits for the agent to complete processing and returns the response.

**curl Example:**

```bash
curl -X POST "https://next.elitea.ai/api/v1/applications/predict/prompt_lib/{{PROJECT_ID}}/{{AGENT_VERSION_ID}}" \
  -H "Authorization: Bearer {{YOUR_PAT}}" \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "PROJ-123",
    "chat_history": []
  }'
```

### Asynchronous Mode

For long-running tasks, use async mode to avoid timeouts. The request returns immediately with a task ID.

**curl Example:**

```bash
curl -X POST "https://next.elitea.ai/api/v1/applications/predict/prompt_lib/{{PROJECT_ID}}/{{AGENT_VERSION_ID}}" \
  -H "Authorization: Bearer {{YOUR_PAT}}" \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Review PR #456 and provide detailed feedback",
    "chat_history": [],
    "async_mode": true
  }'
```

**Response (Async):**

```json
{
  "task_id": "task-xyz789",
  "status": "pending",
  ...
}
```

!!! info "When to Use Each Mode"
    **Synchronous (`async_mode: false`):**
    
    - Quick agent responses (< 30 seconds)
    - Simple Q&A without complex processing
    - When you need the response immediately
    
    **Asynchronous (`async_mode: true`):**
    
    - Long-running agent tasks
    - Complex processing (code review, document analysis)
    - Webhook-based integrations
    - Avoiding HTTP timeouts

!!! tip "Use Cases for Direct Prediction"
    - JIRA automation triggers
    - GitHub/GitLab webhook integrations (PR reviews)
    - Simple Q&A without context
    - One-time processing tasks

---

## Additional Endpoints

### Check Existing Conversation

Search for an existing conversation by name.

**Endpoint:**

```
GET {{BASE_URL}}chat/conversations/prompt_lib/{{PROJECT_ID}}/?query={{NAME}}&limit=1&source=alita
```

**curl Example:**

```bash
curl -X GET "https://next.elitea.ai/api/v1/chat/conversations/prompt_lib/{{PROJECT_ID}}/?query=Support-TICKET-123&limit=1&source=alita" \
  -H "Authorization: Bearer {{YOUR_PAT}}"
```

**Response:**

```json
{
  "total": 1,
  "rows": [
    {
      "id": 12345,
      "uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "name": "Support-TICKET-123",
      ...
    }
  ]
}
```

---

### Get Conversation Details

Retrieve full details of a conversation including participants.

**Endpoint:**

```
GET {{BASE_URL}}chat/conversation/prompt_lib/{{PROJECT_ID}}/{{CONVERSATION_ID}}
```

**curl Example:**

```bash
curl -X GET "https://next.elitea.ai/api/v1/chat/conversation/prompt_lib/{{PROJECT_ID}}/{{CONVERSATION_ID}}" \
  -H "Authorization: Bearer {{YOUR_PAT}}"
```

**Response:**

```json
{
  "id": 12345,
  "name": "Support-TICKET-123",
  "uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "participants": [
    {
      "id": 67890,
      "entity_name": "application",
      "entity_meta": {
        "id": 62,
        "project_id": 630
      }
    }
  ]
}
```

### Find Agent Participant ID

When reusing an existing conversation, you need to find the agent's participant ID from the participants array.

**Filter Logic (pseudo-code):**

```
participants.filter(
  item.entity_name == "application" AND
  item.entity_meta.id == YOUR_AGENT_ID
).first().id
```

**JavaScript Example:**

```javascript
const response = await fetch(`${API_URL}chat/conversation/prompt_lib/${PROJECT_ID}/${CONVERSATION_ID}`, {
  headers: { 'Authorization': `Bearer ${PAT}` }
});
const data = await response.json();

const agentParticipant = data.participants.find(
  p => p.entity_name === 'application' && 
       String(p.entity_meta?.id) === String(AGENT_ID)
);

const participantId = agentParticipant?.id;
```

**Python Example:**

```python
import requests

response = requests.get(
    f"{API_URL}chat/conversation/prompt_lib/{PROJECT_ID}/{CONVERSATION_ID}",
    headers={"Authorization": f"Bearer {PAT}"}
)
data = response.json()

agent_participant = next(
    (p for p in data["participants"] 
     if p["entity_name"] == "application" 
     and str(p["entity_meta"].get("id")) == str(AGENT_ID)),
    None
)

participant_id = agent_participant["id"] if agent_participant else None
```

!!! tip "Conversation Reuse Pattern"
    When building integrations that map external identifiers (like JIRA ticket IDs or Teams chat IDs) to ELITEA conversations:
    
    1. Store the mapping: `external_id → (conversation_id, conversation_uuid)`
    2. On new message, check if mapping exists
    3. If exists: Get conversation details → Find agent participant ID → Send message
    4. If not: Create conversation → Add agent → Store mapping → Send message

---

## Handling Attachments

### Step 1: Configure Attachment Storage

Before uploading attachments, configure the storage toolkit for the conversation.

**Endpoint:**

```
PUT {{BASE_URL}}chat/attachment_storage/prompt_lib/{{PROJECT_ID}}/{{CONVERSATION_ID}}
```

**Request Body:**

```json
{
  "toolkit_id": {{TOOLKIT_ID}}
}
```

**curl Example:**

```bash
curl -X PUT "https://next.elitea.ai/api/v1/chat/attachment_storage/prompt_lib/{{PROJECT_ID}}/{{CONVERSATION_ID}}" \
  -H "Authorization: Bearer {{YOUR_PAT}}" \
  -H "Content-Type: application/json" \
  -d '{"toolkit_id": 45}'
```

---

### Step 2: Upload Attachment

Upload a file to the conversation.

**Endpoint:**

```
POST {{BASE_URL}}chat/attachments/prompt_lib/{{PROJECT_ID}}/{{CONVERSATION_ID}}
```

**curl Example (file upload):**

```bash
curl -X POST "https://next.elitea.ai/api/v1/chat/attachments/prompt_lib/{{PROJECT_ID}}/{{CONVERSATION_ID}}" \
  -H "Authorization: Bearer {{YOUR_PAT}}" \
  -F "file=@/path/to/document.pdf" \
  -F "overwrite_attachments=1"
```

**Postman Configuration:**

1. **Method:** POST
2. **URL:** `{{BASE_URL}}chat/attachments/prompt_lib/{{PROJECT_ID}}/{{CONVERSATION_ID}}`
3. **Headers:** `Authorization: Bearer {{YOUR_PAT}}`
4. **Body:** Select `form-data`

    | Key | Type | Value |
    |-----|------|-------|
    | file | File | Select your file |
    | overwrite_attachments | Text | `1` |

**Programmatic Upload (Base64 Content):**

When uploading files programmatically (e.g., from Power Automate or custom code), use multipart/form-data with base64 content:

```json
{
  "$content-type": "multipart/form-data",
  "$multipart": [
    {
      "headers": {
        "Content-Disposition": "form-data; name=\"file\"; filename=\"screenshot.png\""
      },
      "body": {
        "$content-type": "image/png",
        "$content": "BASE64_ENCODED_FILE_CONTENT"
      }
    },
    {
      "headers": {
        "Content-Disposition": "form-data; name=\"overwrite_attachments\""
      },
      "body": "1"
    }
  ]
}
```

**Python Example (Programmatic Upload):**

```python
import requests
import base64

# Read and encode file
with open('screenshot.png', 'rb') as f:
    file_content = f.read()

response = requests.post(
    f"{API_URL}chat/attachments/prompt_lib/{PROJECT_ID}/{CONVERSATION_ID}",
    headers={"Authorization": f"Bearer {PAT}"},
    files={
        'file': ('screenshot.png', file_content, 'image/png'),
        'overwrite_attachments': (None, '1')
    }
)

print(response.json())  # [{"name": "screenshot.png", "bucket": "...", "file_size": 12345}]
```

**Response:**

```json
[
  {
    "name": "screenshot.png",
    "bucket": "artifacts-bucket-name",
    "file_size": 12345
  }
]
```

---

### Step 3: Reference Attachments in Message

Include uploaded attachments when sending a message.

**Request Body:**

```json
{
  "participant_id": {{PARTICIPANT_ID}},
  "user_input": "Please analyze the attached document",
  "await_task_timeout": -1,
  "return_task_id": true,
  "attachments_info": [
    {"name": "document.pdf"},
    {"name": "image.png"}
  ]
}
```

**Dynamic Construction:**

When building `attachments_info` dynamically (e.g., in Power Automate or loops):

```javascript
// JavaScript
let attachmentInfo = '';
uploadedFiles.forEach(file => {
  attachmentInfo += `{"name": "${file.name}"},`;
});
// Remove trailing comma
if (attachmentInfo.endsWith(',')) {
  attachmentInfo = attachmentInfo.slice(0, -1);
}
const attachments = JSON.parse(`[${attachmentInfo}]`);
```

```python
# Python
attachments_info = [{"name": f["name"]} for f in uploaded_files]
```

!!! tip "Supported File Types"
    ELITEA supports common file types including:
    
    - **Images:** PNG, JPEG, GIF, WebP
    - **Documents:** PDF, DOCX, TXT, MD
    - **Data:** CSV, JSON, XML
    - **Code:** Python, JavaScript, and other source files
    
    Check your agent's configuration for specific file size limits.
```

---

## Error Handling

### Common HTTP Status Codes

| Code | Meaning | Common Causes |
|------|---------|---------------|
| `200` | Success | Request completed successfully |
| `400` | Bad Request | Malformed JSON, missing required fields |
| `401` | Unauthorized | Invalid or expired PAT |
| `403` | Forbidden | Insufficient permissions |
| `404` | Not Found | Invalid Project ID, Agent ID, or Conversation ID |
| `500` | Server Error | Internal ELITEA error |

### Troubleshooting

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| 401 Unauthorized | Invalid or expired PAT | Generate a new Personal Access Token |
| 404 Not Found | Incorrect Project/Agent ID | Verify IDs in ELITEA Settings |
| 400 Bad Request | Malformed JSON body | Validate JSON syntax and required fields |
| Empty response | Wrong Agent Version ID | Use `ApplicationVersionID`, not `ApplicationID` |
| Timeout | Long agent processing | Use async pattern with `await_task_timeout: 0` |

!!! tip "Debugging Tips"
    - Test API requests independently using Postman or curl
    - Verify all IDs are correct and from the same project
    - Check that the Bearer token prefix is included
    - Ensure Content-Type header is set to `application/json`

---

## Integration Patterns

### Conversation Mapping Pattern

When integrating external systems (Teams, Slack, JIRA, Email) with ELITEA, you need a strategy to map external identifiers to ELITEA conversations.

**Pattern Overview:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CONVERSATION MAPPING FLOW                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────┐     ┌──────────────────┐     ┌──────────────┐ │
│  │ External Event  │ ──► │ Check Mapping    │ ──► │ Exists?      │ │
│  │ (Teams, JIRA)   │     │ (SharePoint/DB)  │     │              │ │
│  └─────────────────┘     └──────────────────┘     └──────┬───────┘ │
│                                                          │          │
│                              ┌─────────────────┐         │          │
│                              │                 │◄─── YES ┤          │
│                              │ Get Details     │         │          │
│                              │ Find Agent ID   │     NO ─┼──────┐   │
│                              │                 │         │      │   │
│                              └────────┬────────┘         │      ▼   │
│                                       │                  │ ┌────────┐│
│                                       ▼                  │ │Create  ││
│                              ┌─────────────────┐         │ │New     ││
│                              │ Send Message    │◄────────┼─┤Convo   ││
│                              │ with Attachments│         │ │+ Store ││
│                              └─────────────────┘         │ └────────┘│
│                                                          │          │
└─────────────────────────────────────────────────────────────────────┘
```

**Implementation Steps:**

1. **Store mapping** when creating a conversation:
   ```
   external_id → { conversation_id, conversation_uuid, created_at }
   ```

2. **Lookup mapping** on each new message:
   ```
   mapping = storage.get(external_id)
   ```

3. **If exists:** Get conversation details → Find agent participant → Send message

4. **If not exists:** Create conversation → Add agent → Store mapping → Send message

### Naming Convention Patterns

Use consistent conversation naming for easy identification and search:

| Source | Naming Pattern | Example |
|--------|---------------|---------|
| JIRA | `JIRA-{issueKey}` | `JIRA-PROJ-123` |
| Teams Channel | `Teams-{channelName}-{threadId}` | `Teams-Support-abc123` |
| Teams Chat | `TeamsChat-{chatId}` | `TeamsChat-19:abc...` |
| Email | `Email-{senderDomain}-{subject}` | `Email-customer-Support Request` |
| ServiceNow | `SNOW-{ticketNumber}` | `SNOW-INC0012345` |

**Search by Name:**

```bash
curl -X GET "https://next.elitea.ai/api/v1/chat/conversations/prompt_lib/{{PROJECT_ID}}/?query=JIRA-PROJ-123&limit=1&source=alita" \
  -H "Authorization: Bearer {{YOUR_PAT}}"
```

### Stateless vs Stateful Integrations

Choose the right pattern based on your use case:

| Pattern | Use Case | Conversation Behavior |
|---------|----------|----------------------|
| **Direct Prediction** | Single-turn, no history needed | No conversation created |
| **New Conversation per Request** | Isolated tasks, no continuity | Fresh context each time |
| **Persistent Conversation** | Multi-turn, context needed | Conversation reused by ID |

!!! info "Context Window Considerations"
    Persistent conversations accumulate history. For long-running integrations:
    
    - Consider periodic conversation reset (e.g., daily/weekly)
    - Use conversation naming with timestamps: `Support-{externalId}-{date}`
    - Monitor agent performance as context grows

---

## Complete Integration Examples

### Example: JIRA Issue Review Automation

```bash
# Direct prediction for JIRA automation
curl -X POST "https://next.elitea.ai/api/v1/applications/predict/prompt_lib/630/93" \
  -H "Authorization: Bearer {{YOUR_PAT}}" \
  -H "Content-Type: application/json" \
  -d '{"user_input": "PROJ-123"}'
```

### Example: Multi-Turn Support Conversation

```bash
# 1. Create conversation
CONV_RESPONSE=$(curl -s -X POST "https://next.elitea.ai/api/v1/chat/conversations/prompt_lib/630" \
  -H "Authorization: Bearer {{YOUR_PAT}}" \
  -H "Content-Type: application/json" \
  -d '{"name": "Support-Case-001", "is_private": false, "source": "alita", "participants": []}')

CONV_ID=$(echo $CONV_RESPONSE | jq -r '.id')
CONV_UUID=$(echo $CONV_RESPONSE | jq -r '.uuid')

# 2. Add agent participant
PART_RESPONSE=$(curl -s -X POST "https://next.elitea.ai/api/v1/chat/participants/prompt_lib/630/$CONV_ID" \
  -H "Authorization: Bearer {{YOUR_PAT}}" \
  -H "Content-Type: application/json" \
  -d '{"entity_name": "application", "entity_meta": {"id": 62, "project_id": 630}, "entity_settings": {"version_id": 93}}')

PART_ID=$(echo $PART_RESPONSE | jq -r '.id')

# 3. Send message
curl -X POST "https://next.elitea.ai/api/v1/chat/messages/prompt_lib/630/$CONV_UUID" \
  -H "Authorization: Bearer {{YOUR_PAT}}" \
  -H "Content-Type: application/json" \
  -d "{\"participant_id\": $PART_ID, \"user_input\": \"Hello, I need help with my account\", \"await_task_timeout\": -1, \"return_task_id\": true}"
```

---

## API Reference Summary

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Create Conversation | POST | `chat/conversations/prompt_lib/{{ProjectID}}` |
| Add Participant | POST | `chat/participants/prompt_lib/{{ProjectID}}/{{ConversationID}}` |
| Send Message | POST | `chat/messages/prompt_lib/{{ProjectID}}/{{ConversationUUID}}` |
| Direct Prediction | POST | `applications/predict/prompt_lib/{{ProjectID}}/{{AgentVersionID}}` |
| Check Conversation | GET | `chat/conversations/prompt_lib/{{ProjectID}}/?query={{name}}&limit=1&source=alita` |
| Get Conversation | GET | `chat/conversation/prompt_lib/{{ProjectID}}/{{ConversationID}}` |
| Configure Storage | PUT | `chat/attachment_storage/prompt_lib/{{ProjectID}}/{{ConversationID}}` |
| Upload Attachment | POST | `chat/attachments/prompt_lib/{{ProjectID}}/{{ConversationID}}` |

---

!!! related "Related Resources"
    - [Personal Access Token Setup](../../getting-started/create-personal-access-token.md)
    - [JIRA Automation with ELITEA](../../how-tos/credentials-toolkits/jira-automation-with-elitea.md)
    - [Power Automate Integration](./power-automate-integration.md)
    - [ELITEA API Public Collection (Postman)](https://www.postman.com/projectalita/elitea-api-public)