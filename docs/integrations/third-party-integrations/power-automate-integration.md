# Guide: Integrating Power Automate with ELITEA AI Agents

## Introduction

### Purpose and Overview

This guide provides comprehensive instructions for integrating Microsoft Power Automate with ELITEA AI agents. By following this guide, you can create automated workflows that trigger ELITEA agents from various Microsoft 365 events and enable ELITEA agents to perform actions in Microsoft 365 services.

Power Automate integration enables **bidirectional communication**:

**Inbound Triggers (Microsoft 365 → ELITEA):**

- **React to Teams Messages:** Automatically process incoming Teams messages using ELITEA AI agents
- **Process Emails:** Route incoming emails to ELITEA agents for intelligent processing
- **Scheduled Processing:** Periodically check for mentions or specific conditions

**Outbound Actions (ELITEA → Microsoft 365):**

- **Reply to Teams:** Send messages back to Teams channels or chats
- **Send Emails:** Compose and send emails via Outlook
- **Reply to Emails:** Respond to email threads programmatically

!!! note "Two Integration Patterns"
    This guide covers two patterns:
    
    1. **Power Automate triggering ELITEA** - Flows that send data to ELITEA agents
    2. **ELITEA triggering Power Automate** - Agents using OpenAPI tools to invoke Power Automate HTTP endpoints

### Key Terms

| Term | Description |
|------|-------------|
| **Power Automate** | Microsoft's workflow automation platform (formerly Microsoft Flow) |
| **Flow** | An automated workflow in Power Automate |
| **Trigger** | The event that initiates a Power Automate flow |
| **HTTP Trigger** | An endpoint that allows external systems to invoke a flow |
| **ELITEA Agent** | An AI-powered assistant configured within the ELITEA platform |
| **Conversation** | A chat session in ELITEA that maintains context across multiple messages |
| **Participant** | An entity (agent or user) added to an ELITEA conversation |
| **Personal Access Token (PAT)** | Authentication credential for ELITEA API calls |
| **OpenAPI Tool** | A specification that allows ELITEA agents to call external APIs |

## Prerequisites

Before you begin, ensure you have:

- Access to Microsoft Power Automate (Premium license recommended for HTTP triggers)
- An ELITEA account with a configured agent
- ELITEA Personal Access Token (PAT) for API authentication
- The following ELITEA identifiers:
    - **Project ID:** Found in Settings → Configuration
    - **Agent ID:** The ID of your configured agent
    - **Agent Version ID:** The specific version of your agent to use
    - **Toolkit ID:** (Optional) For attachment storage configuration

!!! tip "Finding ELITEA IDs"
    Navigate to your agent in ELITEA and note the URL structure or check the agent details panel for the required IDs.

## ELITEA API Overview

Power Automate communicates with ELITEA through the following API endpoints:

### Core Endpoints

| Purpose | Method | Endpoint |
|---------|--------|----------|
| Create Conversation | POST | `{{API_URL}}chat/conversations/prompt_lib/{{ProjectID}}` |
| Add Agent Participant | POST | `{{API_URL}}chat/participants/prompt_lib/{{ProjectID}}/{{ConversationID}}` |
| Send Message | POST | `{{API_URL}}chat/messages/prompt_lib/{{ProjectID}}/{{ConversationUUID}}` |
| Check Existing Conversation | GET | `{{API_URL}}chat/conversations/prompt_lib/{{ProjectID}}/?query={{name}}&limit=1&source=alita` |
| Get Conversation Details | GET | `{{API_URL}}chat/conversation/prompt_lib/{{ProjectID}}/{{ConversationID}}` |
| Configure Attachment Storage | PUT | `{{API_URL}}chat/attachment_storage/prompt_lib/{{ProjectID}}/{{ConversationID}}` |
| Upload Attachment | POST | `{{API_URL}}chat/attachments/prompt_lib/{{ProjectID}}/{{ConversationID}}` |

### Base URLs

| Environment | URL |
|-------------|-----|
| Production (next) | `https://next.elitea.ai/api/v1/` |
| Development | `https://dev.elitea.ai/api/v1/` |

### Authentication

All API requests require a Bearer token in the Authorization header:

```
Authorization: Bearer {{Your_ELITEA_PAT}}
```

---

## Part 1: Power Automate → ELITEA (Inbound Triggers)

This section covers flows that send data from Microsoft 365 to ELITEA agents.

## Setup and Configuration

### Step 1: Prepare ELITEA Agent

1. Navigate to **[Agents](../../menus/agents.md)** in your ELITEA project
2. Create or select an existing agent for your automation
3. Configure the agent with appropriate instructions for handling automated requests
4. Note the following values:
    - **Agent ID:** Visible in agent details
    - **Agent Version ID:** Found in the version selector
    - **Project ID:** Located in Settings → **[Configuration](../../menus/settings/ai-configuration.md)**

!!! tip "Agent Instructions for Automation"
    Include clear instructions in your agent about the expected input format and how to respond. For example:
    
    - For email processing: "You will receive email content. Reply via email using the message ID provided."
    - For Teams: "This is a Teams request. You MUST reply via Teams."

### Step 2: Generate Personal Access Token

1. Go to **Settings** → **[Personal Access Tokens](../../menus/settings/personal-tokens.md)**
2. Click **Create Token**
3. Provide a descriptive name (e.g., "Power Automate Integration")
4. Copy and securely store the generated token

!!! warning "Token Security"
    Store your PAT securely. Never expose it in client-side code or share it publicly. Consider using environment variables or secure storage in Power Automate.

---

## Scenario 1: React to Teams Messages

This flow automatically responds to Teams chat messages using an ELITEA agent.

### Flow Overview

```
Trigger: When a new chat message is added (Teams)
    │
    ├─ Initialize Variables (API_URL, PROJECT_ID, AGENT_ID, etc.)
    │
    └─ For each message:
        │
        ├─ Get message details
        ├─ Get chat details (detect chat type)
        ├─ Check if @mentioned (for group/meeting chats)
        ├─ Detect reply/forward messages (optional)
        │
        ├─ Condition: Should process?
        │   - 1:1 chat: Always process
        │   - Group/Meeting: Only if @mentioned
        │   - Filter out bot's own messages
        │   - Filter out system events
        │
        ├─ Send immediate acknowledgment: "Working on your question..."
        │
        ├─ Build chat history from recent messages
        │
        ├─ Check for existing ELITEA conversation
        │   ├─ If exists: Retrieve participant ID
        │   └─ If new: Create conversation → Add agent → Get participant ID
        │
        ├─ Process hosted attachments (screenshots)
        │   └─ Upload to ELITEA attachment storage
        │
        ├─ Compose user input with context:
        │   - Message context (reply/forward indicators)
        │   - Chat history
        │   - Reply instructions with chat type
        │
        └─ Send message to ELITEA agent
```

### Step-by-Step Configuration

#### 1. Create the Flow

1. Navigate to [make.powerautomate.com](https://make.powerautomate.com)
2. Click **Create** → **Automated cloud flow**
3. Name: "React on Teams message trigger"
4. Trigger: **When a new chat message is added** (Microsoft Teams)

#### 2. Initialize Variables

Add the following **Initialize variable** actions in sequence:

| Variable Name | Type | Example Value |
|---------------|------|---------------|
| ChatHistory | String | (empty) |
| API_URL | String | `https://next.elitea.ai/api/v1/` |
| AGENT_ID | String | `62` |
| AGENT_VERSION_ID | String | `93` |
| PROJECT_ID | Integer | `630` |
| attachments | String | (empty) |
| attachment_info | String | (empty) |

#### 3. Process Messages

Add **For each** action on `triggerOutputs()?['body/value']`:

**Get Message Details:**

```
Action: HTTP Request (Teams connector)
URI: /v1.0/me/chats/@{item()?['conversationId']}/messages/@{item()?['messageId']}
Method: GET
```

#### 4. Detect Chat Type

Teams has three chat types that require different handling:

| Chat Type | Value | Behavior |
|-----------|-------|----------|
| 1:1 Chat | `oneOnOne` | Respond to all messages |
| Group Chat | `group` | Respond only when @mentioned |
| Meeting Chat | `meeting` | Respond only when @mentioned |

**Get Chat Details:**

```
Action: HTTP Request (Teams connector)
URI: /v1.0/me/chats/@{item()?['conversationId']}
Method: GET
```

**Compose_chatType:**

```
Inputs: @body('Get_Chat_Details')?['chatType']
```

#### 5. Detect @Mentions

For group and meeting chats, check if the bot was mentioned using the `mentions` array from the message details.

!!! info "Message Structure with Mentions"
    The Graph API returns a `mentions` array containing each @mention in the message:
    ```json
    {
      "mentions": [
        {
          "id": 0,
          "mentionText": "Elitea Bot",
          "mentioned": {
            "user": {
              "id": "d346094f-19d8-48e7-b53e-fd7909afff91",
              "displayName": "Elitea Bot"
            }
          }
        }
      ]
    }
    ```

**Compose_isMentioned (using Bot User ID - most reliable):**

```
@contains(string(body('Get_Message_details')?['mentions']), 'YOUR_BOT_USER_ID')
```

Replace `YOUR_BOT_USER_ID` with your bot's actual user ID (e.g., `d346094f-19d8-48e7-b53e-fd7909afff91`).

**Alternative (check by display name):**

```
@contains(string(body('Get_Message_details')?['mentions']), '"displayName":"Elitea Bot"')
```

#### 6. Detect Reply and Forwarded Messages

Optionally detect if a message is a reply or forwarded content:

**Compose_isReply:**

```
@contains(body('Get_Message_details')?['body']?['content'], 'schema.skype.com/Reply')
```

**Compose_isForwarded:**

```
@contains(body('Get_Message_details')?['body']?['content'], 'schema.skype.com/Forward')
```

**Compose_MessageContext:**

```
@concat(
  if(outputs('Compose_isReply'), '[REPLY] ', ''),
  if(outputs('Compose_isForwarded'), '[FORWARDED] ', '')
)
```

#### 7. Filter Messages (Main Condition)

Combine all checks into a single condition to determine if the message should be processed:

**Condition Expression (Advanced Mode):**

```
@and(
  not(equals(outputs('Compose_username'), 'Elitea Bot')),
  equals(body('Get_Message_details')?['messageType'], 'message'),
  equals(body('Get_Message_details')?['eventDetail'], null),
  or(
    equals(outputs('Compose_chatType'), 'oneOnOne'),
    and(
      or(
        equals(outputs('Compose_chatType'), 'group'),
        equals(outputs('Compose_chatType'), 'meeting')
      ),
      outputs('Compose_isMentioned')
    )
  )
)
```

This logic:

- **Always processes** 1:1 chat messages
- **Only processes** group/meeting chat messages when the bot is @mentioned
- **Filters out** bot's own messages (prevents infinite loops)
- **Filters out** system events (member added/removed, etc.)

!!! tip "Optional: Include Replies"
    To also respond to replies in group chats (assuming they're continuing a conversation):
    ```
    or(
      outputs('Compose_isMentioned'),
      outputs('Compose_isReply')
    )
    ```

#### 8. Send Acknowledgment

```
Action: HTTP Request (Teams connector)
URI: /v1.0/me/chats/@{item()?['conversationId']}/messages
Method: POST
Body: {
  "body": {
    "contentType": "html",
    "content": "{{username}}, working on your question. Please wait until I reply."
  }
}
```

#### 9. Build Chat History

Use a **Loop** on recent messages to build context:

```
Append to ChatHistory:
@concat(
  formatDateTime(items('Loop_Messages')?['createdDateTime'],'yyyy-MM-dd HH:mm:ss'),
  ' | ',
  items('Loop_Messages')?['from']?['user']?['displayName'],
  ' | ',
  body('htmltotext'),
  '\n'
)
```

#### 10. Check/Create Conversation

**Check Existing:**

```
HTTP GET:
@{variables('API_URL')}chat/conversations/prompt_lib/@{variables('PROJECT_ID')}/?query=Teams: {{displayName}}&limit=1&source=alita
```

**Condition: If conversation exists (total > 0):**

- Get conversation details
- Filter for agent participant
- Extract participant ID

**Else (Create New):**

1. Create conversation
2. Configure attachment storage
3. Add agent as participant

#### 11. Handle Screenshots and Attachments

Screenshots pasted into Teams messages are stored as "hosted contents". Process them as follows:

**List Hosted Contents:**

```
Action: HTTP Request (Teams connector)
URI: /v1.0/me/chats/@{item()?['conversationId']}/messages/@{item()?['messageId']}/hostedContents
Method: GET
```

**Loop Through Each Hosted Content:**

```
For each: body('List_Hosted_Contents')['value']
```

**Get Screenshot Content:**

```
URI: /v1.0/me/chats/@{item()?['conversationId']}/messages/@{item()?['messageId']}/hostedContents/@{items('Loop_Screenshots')['id']}/$value
Method: GET
```

**Check if Image (Condition):**

```
@or(
  contains(outputs('Get_Screenshot')?['body']?['$content-type'], 'image/png'),
  contains(outputs('Get_Screenshot')?['body']?['$content-type'], 'image/jpeg')
)
```

**Generate Filename:**

```
@concat(
  'screenshot_',
  item()?['messageId'],
  '_',
  substring(items('Loop_Screenshots')?['id'], 0, 8),
  if(
    contains(outputs('Get_Screenshot')?['headers']?['Content-Type'], 'png'),
    '.png',
    '.jpg'
  )
)
```

**Convert to Binary:**

```
@base64ToBinary(outputs('Get_Screenshot')?['body']?['$content'])
```

**Upload to ELITEA:**

```json
HTTP POST: @{variables('API_URL')}chat/attachments/prompt_lib/@{variables('PROJECT_ID')}/@{ConversationID}
Body: {
  "$content-type": "multipart/form-data",
  "$multipart": [
    {
      "headers": {
        "Content-Disposition": "form-data; name=\"file\"; filename=\"{{ScreenshotName}}\""
      },
      "body": {
        "$content-type": "{{Content-Type}}",
        "$content": "{{BinaryContent}}"
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

**Append to attachment_info:**

```
Value: {'name': '@{outputs('ScreenshotName')}'},
```

**Clean Trailing Comma (after loop):**

```
Condition: @endsWith(variables('attachment_info'), ',')
If Yes: @slice(variables('attachment_info'), 0, sub(length(variables('attachment_info')), 1))
```

#### 12. Send Message to Agent

**Compose User Input with Context:**

Include message context (reply/forward indicators) and chat history:

```
@concat(
  outputs('Compose_MessageContext'),
  body('Get_Message_details')?['from']?['user']?['displayName'],
  ' says: ',
  body('Get_Message_details')?['body']?['content'],
  '\n\n<ChatHistory>\n',
  variables('ChatHistory'),
  '</ChatHistory>',
  '\n\n<ReplyInstructions>',
  'This is a Teams ', outputs('Compose_chatType'), ' request. ',
  'Conversation ID: ', item()?['conversationId'], '. ',
  'You MUST reply via Teams.',
  '</ReplyInstructions>'
)
```

**Send to Agent:**

```json
HTTP POST: @{variables('API_URL')}chat/messages/prompt_lib/@{variables('PROJECT_ID')}/@{ConversationUUID}
Body: {
  "participant_id": {{participant_id}},
  "user_input": "{{ComposeUserInput output}}",
  "await_task_timeout": -1,
  "return_task_id": true,
  "attachments_info": @{json(concat('[', variables('attachment_info'), ']'))}
}
```

### Complete Flow Structure

```
React on Teams message trigger
│
├─ Trigger: When a new chat message is added
│
├─ Initialize Variables (7 variables)
│
└─ For each Message:
    │
    ├─ Get Messages (chat history)
    ├─ Get Message details
    ├─ Get Chat Details
    ├─ Compose_chatType
    ├─ Compose_isMentioned
    ├─ Compose_isReply (optional)
    ├─ Compose_isForwarded (optional)
    ├─ List Hosted Attachments
    ├─ Compose_username
    │
    └─ Condition: Should process message?
        │
        ├─ [Yes] Process:
        │   ├─ Send acknowledgment
        │   ├─ Build chat history
        │   ├─ Check/create ELITEA conversation
        │   ├─ Process screenshots
        │   ├─ Compose user input
        │   └─ Send to agent
        │
        └─ [No] Skip (or handle system events)
```

---

## Scenario 2: Process Incoming Emails

This flow processes emails sent to a monitored mailbox and routes them to ELITEA agents.

### Flow Overview

```
Trigger: When a new email arrives (Office 365) / Recurrence (scheduled)
    │
    ├─ Filter for relevant emails (mentions, keywords)
    │
    ├─ Initialize Variables
    │
    └─ For each email:
        │
        ├─ Convert HTML body to plain text
        │
        ├─ Check SharePoint for existing conversation mapping
        │   ├─ If exists: Retrieve ELITEA conversation
        │   └─ If new: Create conversation → Store mapping
        │
        ├─ Process attachments
        │   └─ Upload to ELITEA
        │
        ├─ Compose message with metadata:
        │   - From, Subject, Body
        │   - Message ID for replies
        │   - Attachment references
        │
        ├─ Send to ELITEA agent
        │
        └─ Mark email as read
```

### Two Approaches

#### Option A: Email Trigger (Real-time)

Trigger: **When a new email arrives (V3)**

- **To:** Your monitored mailbox (e.g., `SupportAlita@epam.com`)
- Processes emails as they arrive

#### Option B: Scheduled Check (Polling)

Trigger: **Recurrence** (e.g., every 1 minute)

- **Get emails (V3):** Fetch unread emails with specific criteria
- **Filter:** Check for @mentions or keywords
- Useful for more controlled processing

### Key Configuration

#### Email Metadata Composition

```json
{
  "from": "@{triggerOutputs()?['body/from']}",
  "message_id": "@{triggerOutputs()?['body/id']}",
  "file_links": "@variables('filelinks')",
  "to": "@triggerOutputs()?['body/toRecipients']",
  "subject": "@{triggerOutputs()?['body/subject']}",
  "conversation_id": "@{triggerOutputs()?['body/conversationId']}",
  "received": "@{triggerOutputs()?['body/receivedDateTime']}",
  "body": "@{variables('content')}"
}
```

#### Reply Instructions

Include the message ID so the agent can reply:

```
<Instructions>Reply via email, message id is:'@{items('Apply_to_each')?['id']}'</Instructions>
```

#### Conversation Persistence with SharePoint

Use a SharePoint list to map email conversations to ELITEA conversations:

| Column | Type | Description |
|--------|------|-------------|
| Instance | Text | ELITEA instance (next, dev) |
| ConversationID | Text | Email conversation ID |
| EliteaConversationId | Number | ELITEA conversation ID |
| EliteaConversationUUID | Text | ELITEA conversation UUID |
| Source | Text | "Email" |
| Identifier | Text | Email subject |

---

## Part 2: ELITEA → Power Automate (Outbound Actions)

This section covers HTTP-triggered flows that ELITEA agents can invoke using OpenAPI tools.

### Creating HTTP-Triggered Flows

HTTP triggers create webhook endpoints that ELITEA agents can call.

!!! info "Premium Connector Required"
    HTTP Request triggers require a Power Automate Premium license.

### Scenario 3: Reply to Teams Channel

Allows ELITEA agents to post replies in Teams channels.

#### Flow Configuration

**Trigger:** When an HTTP request is received

**Request Body Schema:**

```json
{
  "type": "object",
  "properties": {
    "replyToMessageId": {"type": "string"},
    "teamId": {"type": "string"},
    "channelId": {"type": "string"},
    "body": {"type": "string"}
  }
}
```

**Action:** Reply with a message in a channel (Teams connector)

| Parameter | Value |
|-----------|-------|
| Poster | User |
| Location | Channel |
| Parent Message ID | `@triggerBody()?['replyToMessageId']` |
| Team | `@triggerBody()?['teamId']` |
| Channel | `@triggerBody()?['channelId']` |
| Message Body | `@triggerBody()?['body']` |

**Response:**

```json
{"ok": true, "message": "Teams reply was sent"}
```

### Scenario 4: Reply to Teams Chat

Allows ELITEA agents to send messages to Teams 1:1 or group chats.

#### Flow Configuration

**Trigger:** When an HTTP request is received

**Request Body Schema:**

```json
{
  "type": "object",
  "properties": {
    "conversationid": {"type": "string"},
    "body": {"type": "string"}
  }
}
```

**Action:** HTTP Request (Teams connector - Graph API)

```
URI: /v1.0/me/chats/@{triggerBody()?['conversationid']}/messages
Method: POST
Body: {
  "body": {
    "contentType": "html",
    "content": "{{escaped_body}}"
  }
}
```

!!! warning "JSON Escaping"
    The message body must be properly escaped for JSON. Use expressions to escape quotes and newlines:
    ```
    @concat(
      '{"body":{"contentType":"html","content":"',
      replace(replace(triggerBody()?['body'], '"', '\\"'), '\n', '\\n'),
      '"}}'
    )
    ```

### Scenario 5: Send Email

Allows ELITEA agents to compose and send new emails.

#### Flow Configuration

**Trigger:** When an HTTP request is received

**Request Body Schema:**

```json
{
  "type": "object",
  "properties": {
    "To": {"type": "string"},
    "CC": {"type": "string"},
    "subject": {"type": "string"},
    "body": {"type": "string"}
  }
}
```

**Action:** Send an email (V2) - Office 365 Outlook

| Parameter | Value |
|-----------|-------|
| To | `@triggerBody()?['To']` |
| Subject | `[Support] @{triggerBody()?['subject']}` |
| Body | `@triggerBody()?['body']` |
| CC | `@triggerBody()?['CC']` |

### Scenario 6: Reply to Email

Allows ELITEA agents to reply to existing email threads.

#### Flow Configuration

**Trigger:** When an HTTP request is received

**Request Body Schema:**

```json
{
  "type": "object",
  "properties": {
    "messageid": {"type": "string"},
    "body": {"type": "string"}
  }
}
```

**Action:** Reply to email (V3) - Office 365 Outlook

| Parameter | Value |
|-----------|-------|
| Message ID | `@triggerBody()?['messageid']` |
| Body | `@triggerBody()?['body']` |
| Reply All | `true` |

---

## Configuring OpenAPI Tools in ELITEA

To enable ELITEA agents to call Power Automate flows, create an OpenAPI tool specification.

### Example: Reply to Email OpenAPI Spec

```json
{
  "openapi": "3.0.1",
  "info": {
    "title": "Power Automate Email Reply",
    "version": "1.0.0",
    "description": "Replies to an existing email message via Power Automate"
  },
  "servers": [
    {
      "url": "https://{{environment}}.api.powerplatform.com:443"
    }
  ],
  "paths": {
    "/powerautomate/automations/direct/workflows/{{workflow_id}}/triggers/manual/paths/invoke": {
      "post": {
        "operationId": "ReplyEmail",
        "summary": "Reply to email",
        "description": "Replies to an email identified by messageid",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["messageid", "body"],
                "properties": {
                  "messageid": {
                    "type": "string",
                    "description": "Unique identifier of the email to reply to"
                  },
                  "body": {
                    "type": "string",
                    "format": "html",
                    "description": "HTML-formatted email reply body"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {"description": "Success"},
          "400": {"description": "Bad Request"},
          "500": {"description": "Server Error"}
        }
      }
    }
  }
}
```

### Agent Instructions for OpenAPI Tools

Include clear guidance in your agent instructions:

```
When replying to emails:
- Use the ReplyEmail tool with the message_id provided in the input
- Format the body as professional HTML with:
  - Clear action items
  - Proper signature with name, title, and contact info
  - EPAM branding
- Escape double quotes in HTML attributes (href=\"...\")
- Images supported via <img> tags with HTTPS URLs
```

---

## Handling Attachments

Power Automate flows can upload attachments to ELITEA conversations for agent processing.

### Step 1: Configure Attachment Storage

Before uploading, configure the attachment storage for the conversation:

```
HTTP PUT: @{variables('API_URL')}chat/attachment_storage/prompt_lib/@{variables('PROJECT_ID')}/@{ConversationID}
Body: {
  "toolkit_id": {{toolkit_id}}
}
```

!!! info "Toolkit ID"
    The `toolkit_id` refers to a storage toolkit configured in your ELITEA project (e.g., Artifacts toolkit).

### Step 2: Upload Attachment

**Power Automate Format:**

```json
HTTP POST: @{variables('API_URL')}chat/attachments/prompt_lib/@{variables('PROJECT_ID')}/@{ConversationID}
Content-Type: multipart/form-data
Body: {
  "$multipart": [
    {
      "headers": {
        "Content-Disposition": "form-data; name=\"file\"; filename=\"{{filename}}\""
      },
      "body": {
        "$content-type": "{{content_type}}",
        "$content": "{{base64_content}}"
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

**curl Example:**

```bash
curl -X POST "https://next.elitea.ai/api/v1/chat/attachments/prompt_lib/{{PROJECT_ID}}/{{CONVERSATION_ID}}" \
  -H "Authorization: Bearer {{YOUR_PAT}}" \
  -F "file=@/path/to/document.pdf" \
  -F "overwrite_attachments=1"
```

**curl with Base64 Content (inline):**

```bash
curl -X POST "https://next.elitea.ai/api/v1/chat/attachments/prompt_lib/{{PROJECT_ID}}/{{CONVERSATION_ID}}" \
  -H "Authorization: Bearer {{YOUR_PAT}}" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@-;filename=image.png;type=image/png" <<< "$(base64 -d <<< '{{BASE64_CONTENT}}')" \
  -F "overwrite_attachments=1"
```

**Postman Configuration:**

1. **Method:** POST
2. **URL:** `https://next.elitea.ai/api/v1/chat/attachments/prompt_lib/{{PROJECT_ID}}/{{CONVERSATION_ID}}`
3. **Headers:**
    - `Authorization`: `Bearer {{YOUR_PAT}}`
4. **Body:** Select `form-data`
   
    | Key | Type | Value |
    |-----|------|-------|
    | file | File | Select your file |
    | overwrite_attachments | Text | `1` |

!!! tip "Supported File Types"
    ELITEA supports common file types including images (PNG, JPEG, GIF), documents (PDF, DOCX, TXT), and data files (CSV, JSON). Check your agent's configuration for specific file size limits.

### Step 3: Include in Message

Reference uploaded attachments in your message:

```json
{
  "participant_id": "@{participant_id}",
  "user_input": "{{message}}",
  "await_task_timeout": -1,
  "return_task_id": true,
  "attachments_info": [{"name": "{{filename1}}"}, {"name": "{{filename2}}"}]
}
```

### Processing Attachments from Different Sources

#### Teams Hosted Content (Images)

```
1. List Hosted Attachments:
   GET /v1.0/me/chats/@{conversationId}/messages/@{messageId}/hostedContents

2. Get Content:
   GET /v1.0/me/chats/@{conversationId}/hostedContents/@{attachmentId}/$value

3. Convert to binary:
   @base64ToBinary(outputs('GetAttachmentContent')?['body']?['$content'])

4. Upload to ELITEA
```

#### Email Attachments

```
1. Get Attachment:
   Use Office 365 "Get Attachment (V2)" action

2. Extract content:
   @outputs('Get_Attachment_(V2)')?['body/contentBytes']

3. Upload to ELITEA
```

---

## Error Handling Pattern

All HTTP-triggered flows should implement proper error handling:

```
Scope - Try
    │
    ├─ Main logic actions
    │
    └─ Response (200):
        {"ok": true, "message": "Success message"}

Scope - Catch (Run after: Try → Failed, Skipped, TimedOut)
    │
    └─ Response (500):
        {
          "ok": false,
          "message": "Processing failed",
          "error": "@{string(result('Scope_-_Try'))}"
        }
```

---

## Complete Flow Examples

### Example 1: Teams Bot Flow Structure

```
React on Teams message trigger
│
├─ Trigger: When a new chat message is added
│
├─ Initialize Variables:
│   ├─ ChatHistory (String)
│   ├─ API_URL: "https://next.elitea.ai/api/v1/"
│   ├─ AGENT_ID: "62"
│   ├─ AGENT_VERSION_ID: "93"
│   ├─ PROJECT_ID: 630
│   ├─ attachments (String)
│   └─ attachment_info (String)
│
└─ For each Message:
    │
    ├─ Get Messages (recent history)
    ├─ Get Message details
    ├─ Get Chat Details                    ← NEW: Get chat type
    ├─ Compose_chatType                    ← NEW: oneOnOne/group/meeting
    ├─ Compose_isMentioned                 ← NEW: Check mentions array
    ├─ Compose_isReply (optional)          ← NEW: Detect replies
    ├─ Compose_isForwarded (optional)      ← NEW: Detect forwards
    ├─ List Hosted Attachments
    ├─ Compose username
    │
    └─ Condition: Should process message?
        │                                   ↓ Enhanced condition with chat type
        ├─ [Yes] Process message:
        │   ├─ Send acknowledgment
        │   ├─ Parse chat history
        │   ├─ Select relevant messages
        │   ├─ Loop to build history string
        │   │
        │   ├─ Check existing conversation (HTTP GET)
        │   ├─ Parse response
        │   │
        │   └─ Condition: Conversation exists?
        │       │
        │       ├─ [Yes] Use existing:
        │       │   ├─ Get conversation details
        │       │   ├─ Filter for agent participant
        │       │   ├─ Process screenshots
        │       │   └─ Send message with context
        │       │
        │       └─ [No] Create new:
        │           ├─ Create conversation
        │           ├─ Configure attachment storage
        │           ├─ Add agent participant
        │           ├─ Process screenshots
        │           └─ Send message with context
        │
        └─ [No] Handle system events or skip
```

!!! info "Chat Type Filtering"
    The enhanced condition ensures:
    
    - **1:1 chats:** All messages processed
    - **Group chats:** Only @mentioned messages processed
    - **Meeting chats:** Only @mentioned messages processed

### Example 2: Email Processing Flow Structure

```
CheckEmails (Scheduled)
│
├─ Trigger: Recurrence (every 1 minute)
│
├─ Get emails (V3):
│   └─ Folder: Inbox, Unread only, Top 10
│
├─ Filter emails with mentions (@Elitea Bot)
│
├─ Initialize Variables:
│   └─ (Same as Teams, plus Source, ConversationID, etc.)
│
└─ For each filtered email:
    │
    ├─ Get items from SharePoint (existing mapping?)
    │
    └─ Condition: Mapping exists?
        │
        ├─ [Yes] Use existing conversation:
        │   ├─ Get ELITEA conversation details
        │   └─ Extract participant ID
        │
        └─ [No] Create new:
            ├─ Create ELITEA conversation
            ├─ Store mapping in SharePoint
            ├─ Configure attachment storage
            └─ Add agent participant
    │
    ├─ Process attachments:
    │   └─ Upload each to ELITEA
    │
    ├─ Convert HTML to text
    │
    ├─ Send message with instructions:
    │   └─ "Reply via email, message id: {{id}}"
    │
    └─ Mark email as read
```

### Example 3: HTTP Reply Flow Structure

```
Reply to Teams message Http trigger
│
├─ Trigger: When an HTTP request is received
│   └─ Schema: {conversationid, body}
│
├─ Scope - Try:
│   ├─ Send Graph API request (POST message)
│   └─ Response 200: {"ok": true, "message": "..."}
│
└─ Scope - Catch:
    └─ Response 500: {"ok": false, "error": "..."}
```

---

## Verification

After setting up your flows:

### Test Inbound Flows (Power Automate → ELITEA)

1. **Trigger the Flow:**
    - For Teams: Send a message to the monitored chat
    - For Email: Send an email to the monitored mailbox
    - Use the **Test** button in Power Automate for manual testing

2. **Check ELITEA:**
    - Navigate to your ELITEA Chat
    - Verify the conversation was created
    - Confirm the agent received and processed the message

3. **Review Flow History:**
    - Check the flow run history for any errors
    - Examine HTTP response bodies for debugging

### Test Outbound Flows (ELITEA → Power Automate)

1. **Get the HTTP Trigger URL:**
    - Open your flow
    - Copy the HTTP POST URL from the trigger

2. **Test with curl or Postman:**
    ```bash
    curl -X POST "{{trigger_url}}" \
      -H "Content-Type: application/json" \
      -d '{"messageid": "test", "body": "<p>Test message</p>"}'
    ```

3. **Configure ELITEA Agent:**
    - Add the OpenAPI tool to your agent
    - Test the agent with appropriate prompts

## Troubleshooting

### Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| 401 Unauthorized (ELITEA) | Invalid or expired PAT | Generate a new Personal Access Token |
| 404 Not Found (ELITEA) | Incorrect Project/Agent ID | Verify IDs in ELITEA Settings |
| 400 Bad Request | Malformed JSON body | Check JSON syntax and required fields |
| Timeout | Agent processing time | Increase timeout or use async pattern |
| Infinite loop (Teams) | Bot responding to own messages | Add condition to filter bot messages |
| HTTP trigger not found | Flow not saved/published | Save and enable the flow |
| Teams message not sent | Graph API permissions | Check Teams connector permissions |
| Bot not responding in group chat | @mention not detected | Use mentions array with bot user ID |
| isMentioned returns wrong value | Checking body content instead of mentions | Use `contains(string(mentions), 'BOT_USER_ID')` |
| Screenshots not uploaded | Hosted content not found | Check hostedContents API path includes messageId |

### Debug Tips

!!! tip "Enable Detailed Logging"
    Add **Compose** actions to log intermediate values during development. View outputs in the flow run history.

- Use **Run after** settings to handle failures gracefully
- Add error handling with **Scope** and **Try-Catch** patterns
- Check Power Automate run history for detailed error messages
- Use the **Peek code** feature to see raw JSON of actions
- Test HTTP requests independently using Postman

### Preventing Infinite Loops

For Teams integrations, always check:

1. The message sender is not the bot account
2. The message type is "message" (not system events)
3. The eventDetail is null (not member added/removed events)
4. For group/meeting chats: the bot is @mentioned

**Basic Condition (1:1 chats only):**

```
@and(
  not(equals(outputs('Compose_username'), 'Elitea Bot')),
  equals(body('Get_Message_details')?['messageType'], 'message'),
  equals(body('Get_Message_details')?['eventDetail'], null)
)
```

**Enhanced Condition (with chat type filtering):**

```
@and(
  not(equals(outputs('Compose_username'), 'Elitea Bot')),
  equals(body('Get_Message_details')?['messageType'], 'message'),
  equals(body('Get_Message_details')?['eventDetail'], null),
  or(
    equals(outputs('Compose_chatType'), 'oneOnOne'),
    and(
      or(
        equals(outputs('Compose_chatType'), 'group'),
        equals(outputs('Compose_chatType'), 'meeting')
      ),
      outputs('Compose_isMentioned')
    )
  )
)
```

This enhanced condition:

- **Always processes** 1:1 chat messages
- **Only processes** group/meeting messages when @mentioned
- **Filters out** all system events and bot's own messages

### Detecting @Mentions Reliably

Use the `mentions` array from the message details rather than parsing HTML content:

**By Bot User ID (most reliable):**

```
@contains(string(body('Get_Message_details')?['mentions']), 'YOUR_BOT_USER_ID')
```

**By Display Name:**

```
@contains(string(body('Get_Message_details')?['mentions']), '"displayName":"Elitea Bot"')
```

!!! tip "Finding Your Bot's User ID"
    Check the `mentions` array in a test message. Each mention includes the user's `id` field:
    ```json
    {
      "mentions": [{
        "mentioned": {
          "user": {
            "id": "d346094f-19d8-48e7-b53e-fd7909afff91",
            "displayName": "Elitea Bot"
          }
        }
      }]
    }
    ```

## Security Best Practices

1. **Store Credentials Securely:**
    - Use Power Automate's **Connections** for Microsoft 365 authentication
    - Store ELITEA PATs securely (consider Azure Key Vault for production)
    - Never hardcode tokens in flow definitions

2. **Limit Permissions:**
    - Create dedicated service accounts for automation
    - Use least-privilege principles for API tokens
    - Restrict flow access to authorized users

3. **Monitor and Audit:**
    - Review flow run history regularly
    - Set up alerts for failed runs
    - Enable logging for security-sensitive operations

4. **Validate Inputs:**
    - Sanitize user inputs before processing
    - Validate message sources
    - Implement rate limiting for HTTP triggers

!!! related "Related Resources"
    - [API Usage Guide](./api-usage.md)
    - [JIRA Automation with ELITEA](../../how-tos/credentials-toolkits/jira-automation-with-elitea.md)
    - [Personal Access Token Setup](../../getting-started/create-personal-access-token.md)
    - [Agents Overview](../../menus/agents.md)
    - [Microsoft Power Automate Documentation](https://learn.microsoft.com/en-us/power-automate/)
    - [Microsoft Graph API Reference](https://learn.microsoft.com/en-us/graph/api/overview)
