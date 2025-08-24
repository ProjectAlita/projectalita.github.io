# AI Configuration

The **AI Configuration** section serves as the central hub for managing essential technical settings that enable the smooth operation of ELITEA's features, such as Alita Code or Alita Code Chat. This section provides configuration details and management for AI models and related services within your project environment.

!!! note "Project-Specific Configurations"
    The available settings and configurations may vary depending on the project selected. It's important to select the appropriate project from the project dropdown menu to access specific configurations relevant to that project.

---

## Key Configuration Fields

**Server Configuration:**

* **Server URL** - The base server URL for your ELITEA instance (e.g., `https://nexus.elitea.ai`)
* **Project ID** - The unique identifier for your current project, used for API calls and service requests
* **OpenAI-BaseURL** - The API endpoint URL for OpenAI-compatible services, typically formatted as `{server_url}/llm/v1`
* **OpenAI-Project** - The project identifier used for OpenAI API compatibility (displayed when a model is selected)

![Settings menu](../../img/menus/settings/ai-configurations/server-config.png)

**Copy Configuration Features:**

All configuration fields in the AI Configuration section include convenient copy functionality:

* **Individual Field Copy** - Each configuration field displays a copy button when you hover over it
* **Click to Copy** - Simply click the copy button next to any field to copy its value to your clipboard
* **Copy All Configuration** - Use the copy icon in the top-right corner to copy all configuration details at once
* **Automatic Feedback** - A toast notification confirms when values are successfully copied
* **Code Examples** - Generated code snippets include copy buttons for easy integration into your projects

This copy functionality makes it easy to transfer configuration values between different environments, share settings with team members, or integrate values into your development workflow.

![Settings menu](../../img/menus/settings/ai-configurations/copy_config.png)

---

## Model Selection and Code Examples

**Model Selection:**

The model selection dropdown allows you to choose from configured LLM models available in your project. When you select a model:

* **Model Capabilities Display** - View supported capabilities of the selected model including Chat, Completion, Embeddings, Function Calling, Reasoning, and Code Generation
* **Configuration Details** - Access technical details and settings for the selected model
* **Integration Information** - See the integration name and model specifications

**Code Examples and Downloads:**

After selecting a model, you can generate and download code examples in multiple programming languages:

* **cURL Example** - Download `api_example.sh` file with command-line API usage examples
* **Node.js Example** - Download `api_example.js` file with JavaScript/Node.js integration code  
* **Python Example** - Download `api_example.py` file with Python API integration examples

**Code Example Features:**

* **Language Selection** - Choose between cURL, Node.js, and Python code examples using the dropdown
* **Pre-configured Parameters** - Downloaded files include server URL, project ID, model settings, and authentication details
* **Ready-to-Use Code** - Each example contains complete, functional code that you can immediately use in your projects
* **Copy and Download** - Both copy to clipboard and download file options available
* **Live Preview** - Code examples update dynamically based on your selected model and configuration

These code examples provide ready-to-use integration templates, eliminating the need to write API integration code from scratch.

![Download config example](../../img/menus/settings/ai-configurations/code-configs.png)

---

## Available Configurations

The Available Configurations section displays organized categories of your configured integrations. Each section shows both personal and shared configurations within your project, with status indicators for each configuration.

**LLM Models**

* Lists configured Large Language Model providers and their associated models
* Displays model configurations with status indicators (OK • Shared or OK • Local)
* Includes models from providers like OpenAI, Azure OpenAI, Vertex AI, Ollama, Amazon Bedrock, and HuggingFace
* Shows integration name and model specifications for each configuration

![Download config example](../../img/menus/settings/ai-configurations/available-configs.png)

**Embedding Models**

* Shows configured embedding model integrations for text processing and similarity calculations
* Lists available embedding providers and their specific models
* Supports various embedding providers for vector similarity operations

**Vector Storage** 

* Displays configured vector database connections for embeddings and similarity search
* Includes providers like PGVector, Chroma, and other supported vector stores
* Shows connection details and configuration status

![Download config example](../../img/menus/settings/ai-configurations/available-configs1.png)


**Configuration Management:**

* Each configuration displays the configuration name, integration type, and sharing status (Local vs Shared)
* Click on any configuration to edit or view its details (except for shared configurations in non-public projects)
* Use the `+` button in the Available Configurations header to create new model credentials

---

## Creating Model Credentials

You can create new model credentials directly from the AI Configuration section.

**From AI Configuration:**

1. **Access Credential Creation:** Click the `+` button in the Available Configurations header
2. **Automatic Navigation:** The system navigates to the credential creation page with model configuration context
3. **Integration Selection:** Choose from available integration types based on your project's configured schemas

**Available Credential Types:**

The system supports various credential types depending on your project configuration, including:

* **Azure OpenAI** - For Azure OpenAI service integrations
* **OpenAI** - For standard OpenAI API connections
* **Vertex AI** - For Google Cloud Vertex AI integrations  
* **Amazon Bedrock** - For AWS Bedrock AI services
* **HuggingFace** - For HuggingFace model integrations
* **Ollama** - For local Ollama model deployments
* **PGVector** - For PostgreSQL vector database connections
* **Chroma** - For Chroma vector database integrations
* **AI Dial** - For AI Dial platform connections

![Download config example](../../img/menus/settings/ai-configurations/new-configs.png)


**Configuration Steps:**

1. **Enter Credential Details:** Provide a descriptive name for the credential
2. **Authentication Information:** Enter required API keys, endpoints, tokens, or connection strings
3. **Service-Specific Parameters:** Configure parameters specific to the selected integration type
4. **Save and Verify:** Click **Save** to create the credential and verify the connection

**Integration Usage:**

Once saved, credentials become available throughout the platform for various integrations:
 
* Model selection dropdowns throughout the platform automatically include configured credentials
* Toolkit setups that need specific AI capabilities
* Assign specific AI capabilities to toolkit operations
* Configure embedding models for text processing tools
* Set up vector storage connections for data retrieval tools
* Set up LLM providers for agent reasoning and decision-making 

!!! tip "Best Practices"
    - Regularly rotate API keys and tokens for security
    - Use descriptive names for credentials to easily identify their purpose
    - Test credentials after creation to ensure proper connectivity
    - Organize credentials by project scope (personal vs shared) based on team needs



