# AI Configuration

The **AI Configuration** section provides comprehensive management of AI models, embeddings, vector storage, and related integrations within your project environment. This section features two main tabs for configuration management and code template generation.

!!! note "Project-Specific Configurations"
    The available settings and configurations may vary depending on the project selected. Select the appropriate project from the project dropdown menu to access specific configurations relevant to that project.

---

## Accessing AI Configuration

To access the AI Configuration section:

1. Click on the **Settings** icon in the main navigation sidebar.
2. Select **AI Configuration** from the settings menu.
3. The AI Configuration interface will display with two tabs available:
     - **AI Configuration** - Main configuration and integrations management
     - **OpenAI Template** - Code examples and templates

![AI Configuration](../../img/menus/settings/ai-configurations/access-configurations.gif){loading=lazy}
---

## AI Configuration Tab

### Server Configuration Fields

The top section displays essential server and project information with click-to-copy functionality:

![Settings menu](../../img/menus/settings/ai-configurations/server-config.png){loading=lazy}

| Field | Description |
|-------|-------------|
| **OpenAI-BaseURL** | The API endpoint URL for OpenAI-compatible services (formatted as `{server_url}/llm/v2`) |
| **OpenAI-Project** | The project identifier used for OpenAI API compatibility |
| **Server URL** | The base server URL for your ELITEA instance |
| **Project ID** | The unique identifier for your current project |

!!! tip "Copy Functionality:"
    * **Click to Copy** - Click any field value to copy it to your clipboard
    * **Copy All** - Use the copy icon in the top-right corner to copy all configuration details at once

---

## Integrations

The Integrations section displays all configured AI service integrations organized by type. Click the **+** button in the header to create new integrations.

### LLM Models

![Download config example](../../img/menus/settings/ai-configurations/llm-config.png){loading=lazy}

Displays configured Large Language Model providers and their models.

**Default Model Settings:**

| Setting | Description | Examples |
|---------|-------------|----------|
| **Default** ⓘ | Used for most activities by default. Start here; switch to Low-tier or High-tier when needed | General purpose models |
| **High-tier** ⓘ | More capable (and more expensive) models for complex workflows (multi-step reasoning, heavy tool usage) | Anthropic Sonnet 4.5/Opus, OpenAI GPT-5.2, Google Gemini 3 Pro |
| **Low-tier** ⓘ | Cheaper/faster models for routine tasks (diagram fixing, formatting, simple edits) | GPT mini from OpenAI, Gemini Flash from Google, Anthropic Haiku |

!!! note "Configuration Cards:"
    Each LLM configuration displays:

    * **Integration Icon** - Visual indicator of the provider (OpenAI, Azure, Vertex AI, Claude, Amazon Bedrock, Ollama, HuggingFace, AI Dial, etc.)
    * **Model Name** - Display name of the configured model
    * **Status Indicator** - Shows "OK • Shared" or "OK • Local" depending on sharing status
    * **Tier Badges** - If applicable, displays "High-Tier", "Low-Tier", or "Default" badge
    * **Click to Edit** - Click on any card to view or edit configuration details (if permissions allow)

#### Creating a New LLM Model:

1. **Ensure Credentials Exist** - Before adding a model, create AI credentials for your provider (see [AI Credentials](#ai-credentials) section)
2. **Click the + Button** - In the Integrations section header (or main navigation sidebar), click the **+** button
3. **Select Integration Type** - Choose **LLM Model** from the list of available integration types
4. **Fill Required Fields:**

    | Field | Description |
    |-------|-------------|
    | **Display Name** | Enter a friendly name for the model (e.g., "GPT-4o Production") |
    | **ID*** | Auto-populated from the Display Name |
    | **Name*** | Enter the exact model identifier from the provider (e.g., "gpt-4o", "claude-3-sonnet-20240229") |
    | **Context Window** | Specify the maximum context window size in tokens (e.g., 128000) |
    | **Max Output Tokens** | Set the maximum output token limit (e.g., 16000) |
    | **Supports Reasoning** | Enable if the model supports reasoning capabilities (e.g., for GPT-5.1 o3-mini) |
    | **Supports Vision** | Enable if the model can process and understand images |
    | **Low Tier** | Mark this model as suitable for routine, cost-effective tasks |
    | **High Tier** | Mark this model as suitable for complex workflows requiring advanced capabilities |
    | **Credentials** | Select the AI credential configuration from the dropdown |

5. **Click Save** - The model will be created and appear in the LLM Models section
6. **Set as Default** (Optional) - Use the dropdown in Default Model Settings to assign this model as the Default model

![New LLM](../../img/menus/settings/ai-configurations/new-llm-model.gif){loading=lazy}

!!! tip "Model Name Accuracy"
    The model name must exactly match the provider's identifier. Refer to your provider's documentation:
    
    - **OpenAI**: [Model names](https://platform.openai.com/docs/models)
    - **Anthropic**: [Claude models](https://docs.anthropic.com/claude/docs/models-overview)
    - **Azure OpenAI**: Deployment name from your Azure portal
    - **Vertex AI**: Model names from Google Cloud console


### Embedding Models

![Embedding Models](../../img/menus/settings/ai-configurations/embedding-models.png){loading=lazy}

Embedding models convert text into numerical vector representations (embeddings) that capture semantic meaning. These vectors enable similarity comparisons, semantic search, and retrieval-augmented generation (RAG) workflows. Embedding models are essential for features like document indexing, knowledge base search, and context retrieval.

 **Default embedding model ⓘ**  Generates embeddings (vectors) used for indexing and semantic search (RAG). Affects retrieval quality and performance 

!!! note "Configuration Cards:"
    Each embedding model configuration displays:
    
    * **Integration Icon** - Visual indicator of the provider (OpenAI, Azure, HuggingFace, etc.)
    * **Model Name** - Display name of the configured embedding model
    * **Status Indicator** - Shows "OK • Shared" or "OK • Local" depending on sharing status
    * **Click to Edit** - Click on any card to view or edit configuration details (if permissions allow)

#### Creating a New Embedding Model:

1. **Ensure Credentials Exist** - Before adding a model, create AI credentials for your provider (see [AI Credentials](#ai-credentials) section)
2. **Click the + Button** - In the Integrations section header (or main navigation sidebar), click the **+** button
3. **Select Integration Type** - Choose **Embedding Model** from the list of available integration types
4. **Fill Required Fields:**

    | Field | Description |
    |-------|-------------|
    | **Display Name** | Enter a descriptive name (e.g., "OpenAI Embeddings Large") |
    | **ID*** | Auto-populated from the Display Name |
    | **Name*** | Enter the exact model identifier (e.g., "text-embedding-3-large", "text-embedding-ada-002") |
    | **Credentials** | Select credentials from the dropdown |

5. **Click Save** - The embedding model will be created and available for selection
6. **Set as Default** (Optional) - Use the "Default embedding model" dropdown to make this the default for RAG operations

![Embedding Model](../../img/menus/settings/ai-configurations/new-embedding-model.gif){loading=lazy}

!!! info "Common Embedding Models"
    - **OpenAI**: text-embedding-3-large (3072 dims), text-embedding-3-small (1536 dims), text-embedding-ada-002 (1536 dims)
    - **Azure OpenAI**: Same models as OpenAI, use your Azure deployment name
    - **HuggingFace**: sentence-transformers/all-MiniLM-L6-v2 (384 dims), BAAI/bge-large-en-v1.5 (1024 dims)
    - **Vertex AI**: textembedding-gecko@003 (768 dims)

### Vector Storage

![Vector Storage](../../img/menus/settings/ai-configurations/vector-storage.png){loading=lazy}

Vector storage systems (vector databases) store and manage embedding vectors generated by embedding models. These specialized databases enable efficient similarity searches across large collections of embeddings, supporting features like semantic search, document retrieval, and knowledge base queries. Vector databases optimize storage and retrieval of high-dimensional vector data.

**Default vector storage ⓘ** Where embeddings are stored for retrieval/search. Choose based on persistence and scale requirements 

!!! note "Configuration Cards:"
    Each vector storage configuration displays:
    
    * **Integration Icon** - Visual indicator of the provider (PGVector, Chroma, etc.)
    * **Storage Name** - Display name of the configured vector storage
    * **Status Indicator** - Shows "OK • Shared" or "OK • Local" depending on sharing status
    * **Click to Edit** - Click on any card to view or edit configuration details (if permissions allow)

#### Creating a New Vector Storage Configuration:

1. **Click the + Button** - In the Integrations section header (or main navigation sidebar), click the **+** button
2. **Select Integration Type** - Choose **Vector Storage** from the list of available integration types
3. **Select Vector Storage Provider** - Choose **PGVector** (PostgreSQL extension for vector storage)
4. **Fill Required Fields:**

    | Field | Description |
    |-------|-------------|
    | **Display Name** | Enter a descriptive name (e.g., "Production PGVector") |
    | **ID*** | Auto-populated from the Display Name |
    | **Connection String** | PostgreSQL connection string |

5. **Click Save** - The vector storage configuration will be created
6. **Set as Default** (Optional) - Use the "Default vector storage" dropdown to make this the default

![Vector Storage](../../img/menus/settings/ai-configurations/new-vector-storage.gif){loading=lazy}

!!! warning "PGVector Extension Required"
    For PGVector configurations, ensure the PostgreSQL database has the `pgvector` extension installed:
    ```sql
    CREATE EXTENSION IF NOT EXISTS vector;
    ```

### Image Generation

![Image Generation](../../img/menus/settings/ai-configurations/image-generation.png){loading=lazy}

Image generation models create images from text descriptions (text-to-image) or modify existing images based on prompts. These AI models enable creative workflows, visual content creation, and automated image production based on natural language instructions.

**Default image generation model**  Select the default model for image generation tasks 

!!! note "Configuration Cards:"
    Each image generation model configuration displays:
    
    * **Integration Icon** - Visual indicator of the provider (OpenAI DALL-E, Azure, etc.)
    * **Model Name** - Display name of the configured image generation model
    * **Status Indicator** - Shows "OK • Shared" or "OK • Local" depending on sharing status
    * **Click to Edit** - Click on any card to view or edit configuration details (if permissions allow)

#### Creating a New Image Generation Model:

1. **Ensure Credentials Exist** - Before adding a model, create AI credentials for your provider (see [AI Credentials](#ai-credentials) section)
2. **Click the + Button** - In the Integrations section header (or main navigation sidebar), click the **+** button
3. **Select Integration Type** - Choose **Image Generation Model** from the list of available integration types
4. **Fill Required Fields:**

    | Field | Description |
    |-------|-------------|
    | **Display Name** | Enter a descriptive name (e.g., "DALL-E 3 Standard") |
    | **ID*** | Auto-populated from the Display Name |
    | **Name*** | Enter the exact model identifier (e.g., "dall-e-3", "dall-e-2") |
    | **Credentials** | Select the appropriate AI credential from the dropdown |

5. **Click Save** - The image generation model will be created and available
6. **Set as Default** (Optional) - Use the "Default image generation model" dropdown to set as default

![New Image Generation Model](../../img/menus/settings/ai-configurations/new-image-generation-model.gif){loading=lazy}

!!! info "Supported Providers"
    - **OpenAI DALL-E 3**: High-quality image generation with text rendering capabilities
    - **OpenAI DALL-E 2**: Fast image generation with good quality
    - **Azure OpenAI**: DALL-E models through Azure endpoints
    - **Other Providers**: Stability AI, Midjourney (if configured with appropriate integrations)

### AI Credentials

!!! warning "Conditional Visibility"
    The **AI Credentials** section only appears when credentials are configured in your project. If no credentials exist, this section will be hidden.

AI Credentials are authentication configurations that store API keys, tokens, endpoints, and connection strings for accessing AI service providers. These credentials serve as the foundation for other integrations, enabling secure communication with external AI platforms without exposing sensitive authentication details in individual model configurations. Multiple models and integrations can reference the same credentials, providing centralized credential management.

!!! note "Configuration Cards:"
    Each AI Credentials configuration displays:
    
    * **Integration Icon** - Visual indicator of the provider (OpenAI, Azure, Anthropic, Vertex AI, etc.)
    * **Credential Name** - Display name of the configured credentials
    * **Status Indicator** - Shows "OK • Shared" or "OK • Local" depending on sharing status
    * **Click to Edit** - Click on any card to view or edit configuration details (if permissions allow)


#### Creating New AI Credentials:

1. **Click the + Button** - In the Integrations section header (or main navigation sidebar), click the **+** button
2. **Select Integration Type** - Choose **AI Credentials** from the list of available integration types
3. **Select Provider Type** - Choose the AI service provider you want to configure:

    | Provider | Description |
    |----------|-------------|
    | **AI Dial** | For EPAM AI Dial platform |
    | **Amazon Bedrock** | For AWS AI services |
    | **Azure OpenAI** | For Azure-hosted OpenAI services |
    | **Ollama** | For local/self-hosted models |
    | **OpenAI** | For OpenAI API access |
    | **Vertex AI** | For Google Cloud AI services |

4. **Fill Provider-Specific Fields:**

    **For OpenAI:**

    | Field | Description | Example |
    |-------|-------------|----------|
    | **Display Name*** | Enter a descriptive name | "OpenAI Production Key" |
    | **ID*** | Auto-populated from the Display Name | |
    | **Api Base*** | OpenAI API endpoint URL | `https://api.openai.com/v1` |
    | **Api Key** | Your OpenAI API key from [platform.openai.com](https://platform.openai.com) | `sk-proj-...` |

    **For Azure OpenAI:**

    | Field | Description | Example |
    |-------|-------------|----------|
    | **Display Name*** | Enter a descriptive name | "Azure OpenAI East US" |
    | **ID*** | Auto-populated from the Display Name |  |
    | **Api Base*** | Azure OpenAI endpoint URL | `https://your-resource.openai.azure.com` |
    | **Api Key** | Azure OpenAI API key from Azure portal | `a1b2c3d4e5f6...` |
    | **Api Version** | Azure API version | `2024-02-15-preview` |


    **For Vertex AI:**

    | Field | Description | Example |
    |-------|-------------|----------|
    | **Display Name** | Enter a descriptive name | "GCP Vertex AI" |
    | **ID*** | Auto-populated from the Display Name |  |
    | **Vertex Project*** | Google Cloud project ID | `my-gcp-project-123456` |
    | **Vertex Location*** | GCP region | `us-central1` |
    | **Vertex Credentials*** | Paste the complete JSON content from downloaded service account key file | `{"type": "service_account", "project_id": "...", ...}` |

    **For Amazon Bedrock:**

    | Field | Description | Example |
    |-------|-------------|----------|
    | **Display Name*** | Enter a descriptive name | "AWS Bedrock US-East-1" |
    | **ID*** | Auto-populated from the Display Name | |
    | **Aws Access Key Id** | IAM access key | `AKIAIOSFODNN7EXAMPLE` |
    | **Aws Secret Access Key** | IAM secret access key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
    | **Aws Region Name** | AWS region | `us-east-1` |

    **For AI Dial:**

    | Field | Description | Example |
    |-------|-------------|----------|
    | **Display Name** | Enter a descriptive name | "EPAM AI Dial Personal" |
    | **ID*** | Auto-populated from the Display Name |  |
    | **Api Base*** | AI Dial endpoint URL | `https://ai-proxy.lab.epam.com` |
    | **Api Key** | Your personal AI Dial token | `aidial_...` |
    | **Api Version** | API version for AI Dial | `2025-04-01-preview` |

    **For Ollama:**

    | Field | Description | Example |
    |-------|-------------|----------|
    | **Display Name*** | Enter a descriptive name | "Local Ollama Server" |
    | **ID*** | Auto-populated from the Display Name |  |
    | **Api Base*** | Ollama server URL | `http://localhost:11434` |

5. **Click Save** - The credential configuration will be created and available for use

![AI Credentials](../../img/menus/settings/ai-configurations/new-ai-credentials.gif){loading=lazy}

!!! warning "Security Best Practices"
    - Never share API keys in public channels or commit them to version control
    - Use environment-specific credentials (separate keys for dev, staging, production)
    - Regularly rotate API keys for enhanced security
    - Use "Local" credentials for personal testing, "Shared" only when necessary
    - Monitor API usage to detect unauthorized access

!!! tip "Credential Reusability"
    One credential configuration can be used by multiple models. For example, a single OpenAI credential can support GPT-4o, GPT-3.5, and multiple embedding models, reducing the need for duplicate credential management.

---
### Default Model Selection

The default model settings in the Integrations section control which models are automatically selected for new chats and agents:

* **Default Model** - Used for most activities (new chats, agents, general operations)
* **High-tier Model** - Selected when high-capability processing is needed
* **Low-tier Model** - Used for routine, cost-effective tasks
* **Default Embedding Model** - Used for text embedding operations
* **Default Vector Storage** - Used for vector database operations
* **Default Image Generation Model** - Used for image generation tasks

**Usage Impact:**

* New chat conversations use the default model unless manually changed
* New agents use the default model unless manually configured
* Existing conversations and agents retain their previously configured models
* Changes apply immediately without requiring save


!!! danger "Do Not Modify Default Models"
    Do not modify the default PG Vector or LLM models in the project, as this may cause improper project functionality and system instability. These default models are essential for core platform operations.

---
## OpenAI Template Tab

The **OpenAI Template** tab generates ready-to-use code examples for integrating applications with ELITEA's AI models using OpenAI-compatible API format. Templates are pre-configured with server settings and support cURL, Node.js, and Python, enabling quick implementation without manual setup.

**How to Access:**

Click "**OpenAI Template**" in the tab bar at the top of the AI Configuration page.

![OpenAI](../../img/menus/settings/ai-configurations/openai-template.png){loading=lazy}

**Model and Language Selection:**

* **Model** dropdown - Select from available configured LLM models
* **Code** dropdown - Choose programming language (cURL, Node.js, or Python)

**Action Buttons:**

* **Copy Button** - Copy the code example to clipboard
* **Download Button** - Download code example file with appropriate extension:
    - cURL → `api_example.sh`
    - Node.js → `api_example.js`  
    - Python → `api_example.py`

**Code Example Features:**

* Pre-configured with server URL, project ID, and model settings
* Dynamic updates based on selected model and language
* Includes authentication placeholder (`Your_Personal_Token`)
* Syntax highlighting for better readability

---

## Troubleshooting

??? warning "No Access to LLM Message"
    **Problem:** "No access to LLM" message is displayed when using custom LLM configurations. The exact message may vary depending on the provider.
    
    **Solution Steps:**
    
    1. **Verify Provider Access:** Use your model provider's platform help center or documentation pages to confirm you have access to the specific LLM mentioned in your configuration
    2. **Test Credentials:** Use a CURL request to verify that your credentials can successfully access the model
    3. **Check Model Availability:** Ensure the model name exactly matches the provider's model identifier
    4. **Validate Authentication:** Confirm your API keys, tokens, or authentication credentials are valid and not expired

??? warning "Authentication Failed Errors"
    **Problem:** Receiving 401 (Unauthorized) or 403 (Forbidden) errors when testing credentials.
    
    **Solution Steps:**
    
    1. **Check Credential Values:**
        - Verify API keys, tokens, or passwords are correct
        - Ensure there are no extra spaces or hidden characters
        - Confirm credentials haven't expired
    
    2. **Verify Permissions:**
        - Ensure your account has necessary permissions for the integration
        - Check if you need specific scopes or roles enabled
        - Verify service URLs are accurate and accessible
    
    3. **Provider-Specific Checks:**
        - **OpenAI:** Verify your API key starts with `sk-` and is from the correct organization
        - **Azure OpenAI:** Confirm the API version matches your deployment and endpoint URL is correct
        - **Vertex AI:** Ensure the service account JSON has the required IAM permissions
        - **Amazon Bedrock:** Verify IAM user has `bedrock:InvokeModel` permissions

??? warning "Connection Errors"
    **Problem:** Unable to connect to AI provider endpoints (Connection refused, timeout, SSL errors).
    
    **Solution Steps:**
    
    1. **Network Connectivity:**
        - Verify you can reach the endpoint URL from your network
        - Check if there are firewall or proxy restrictions
        - Ensure the endpoint URL is correct and accessible
    
    2. **SSL/Certificate Issues:**
        - Verify the endpoint uses a valid SSL certificate
        - Check if your organization uses custom certificates
        - For self-hosted solutions, ensure certificates are properly configured
    
    3. **URL Format:**
        - Ensure URLs start with `http://` or `https://`
        - Remove trailing slashes from base URLs
        - Verify the hostname is correct (no typos)

??? warning "Model Not Found Errors"
    **Problem:** Errors indicating the specified model doesn't exist or isn't available.
    
    **Solution Steps:**
    
    1. **Verify Model Name:**
        - Check the exact model identifier from provider documentation
        - Model names are case-sensitive
        - Ensure no extra spaces or characters in the model name
    
    2. **Check Model Availability:**
        - Confirm the model is available in your region
        - Verify your subscription/account has access to the model
        - Check if the model has been deprecated or renamed
    
    3. **Provider Documentation:**
        - **OpenAI:** Check [platform.openai.com/docs/models](https://platform.openai.com/docs/models)
        - **Anthropic:** Check [docs.anthropic.com/claude/docs/models-overview](https://docs.anthropic.com/claude/docs/models-overview)
        - **Azure OpenAI:** Use your deployment name from Azure portal
        - **Vertex AI:** Check Google Cloud console for available models

??? warning "EPAM AI Dial Specific Issues"
    **Problem:** EPAM AI Dial integration failures with personal tokens.
    
    **Common Issues:**
    
    - **Limited Model Access:** EPAM AI Dial personal tokens provided to EPAMers have access to a very limited model list
    - **Permission Issues:** Token may lack necessary permissions for specific models
    - **Token Scope:** Personal tokens may have restricted capabilities
    
    **Resolution Steps:**
    
    1. **Verify Model Access:**
        - Review the AI Dial documentation for permission check procedures
        - Execute permission verification requests for your specific model
        - Confirm your token has access to the model you're trying to use
    
    2. **Token Management:**
        - Check token expiration date
        - Verify token permissions and scopes
        - Consider using project-level tokens if available for broader model access
    
    3. **Contact Support:**
        - Contact EPAM AI Dial administrators if additional model access is required
        - Request specific model permissions if needed

??? warning "Credential Configuration Not Appearing"
    **Problem:** Newly created credentials don't show up in dropdown menus or integration lists.
    
    **Solution Steps:**
    
    1. **Verify Creation:**
        - Confirm the credential was successfully saved
        - Check for any error messages during creation
        - Refresh the page or credential list
    
    2. **Check Permissions:**
        - Ensure you have permissions to view the credential
        - Verify you're viewing the correct project scope
        - Check if credential is marked as "Local" vs "Shared"
    
    3. **Credential Type:**
        - Confirm the credential type matches the integration requirement
        - Verify the credential hasn't been deleted by another user

??? warning "Rate Limiting or Quota Errors"
    **Problem:** Receiving rate limit or quota exceeded errors from AI providers.
    
    **Solution Steps:**
    
    1. **Check Usage Limits:**
        - Review your provider's rate limits and quotas
        - Check your current usage in the provider's dashboard
        - Verify your subscription tier and limits
    
    2. **Implement Best Practices:**
        - Use appropriate tier models (Low-tier for routine tasks)
        - Implement retry logic with exponential backoff
        - Consider upgrading your plan if consistently hitting limits
    
    3. **Monitor Usage:**
        - Track API usage across your team
        - Set up alerts for approaching quota limits
        - Consider using project-level credentials for better visibility



