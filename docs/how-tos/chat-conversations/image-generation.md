# Image Generation (Text-to-Image)

## Overview

The Image Generation feature enables AI-powered creation of images directly from text prompts within Chat conversations and Agents. When using an LLM model with image generation capabilities (such as GPT-5.1, DALL-E 3, or other vision-enabled models) and the **Image Generator** internal tool is enabled, you can generate high-quality images through natural language descriptions.

Generated images appear inline as thumbnails in the conversation and can be viewed full-size or downloaded in multiple formats (PNG, JPG).

!!! info "Prerequisites"
    To use image generation, you need:
    
    * An LLM model that supports image generation (e.g., GPT-4o, GPT-5.1, DALL-E 3, DALL-E 2)
    * The **Image creation** internal tool enabled in your conversation or agent
    * Appropriate model configuration for image generation

---

## Accessing Image Generation

Image generation is available in two primary locations within ELITEA:

### From Chat Conversations

Enable image generation for ad-hoc conversations:

**Step 1: Open Internal Tools Configuration**

1. Navigate to your conversation
2. Locate the chat input toolbar at the bottom of the screen
2. Find the **Internal Tools** icon (⚙️ gear icon) next to the attachment button
3. Click the Internal Tools icon to open the configuration popup

**Step 2: Enable Image Creation**

1. In the configuration popup, you'll see a list of available internal tools
2. Find **Image creation** in the list
3. Click the toggle switch next to "Image creation" to enable it
4. A success notification appears: "Internal tools configuration updated"
5. Click outside the popup to close it

**Step 3: Select an Image Generation Model**

1. Locate the model selector at the top of the conversation
2. Click on the model selector dropdown
3. Choose a model with image generation capabilities (e.g., GPT-4o, GPT-5.1, DALL-E 3)
4. Verify the model is properly configured for your project

![Chat Image Creation Configuration](<../../img/how-tos/chat-conversations/internal tools/image-generation/chat-image-creation.gif>){width="700" loading="lazy"}

---

### In Agent Configuration

Configure image generation as part of an agent's capabilities:

1. Navigate to **Agents** and select or create an agent
2. Configure image generation in the agent settings
3. Use the agent in conversations with automatic image generation support

**Step 1: Access Agent Settings**

1. Navigate to **Agents** in the main menu
2. Select the agent you want to configure
3. Click the **Configuration** tab
4. Scroll to the **TOOLKITS** section

**Step 2: Enable Image Creation for the Agent**

1. Find the **Image creation** toggle at the bottom of the TOOLKITS section
2. Toggle the switch to enable image generation for this agent
3. The setting includes an info icon (ℹ️) with tooltip: "Enable AI-powered image generation capabilities"
4. This configuration is saved in the agent version metadata

**Step 3: Select an Image Generation Model**

1. Locate the model selector at the top of the conversation
2. Click on the model selector dropdown
3. Choose a model with image generation capabilities (e.g., GPT-4o, GPT-5.1, DALL-E 3)
4. Verify the model is properly configured for your project

**Step 4: Save Changes**

1. Click **Save** at the top of the configuration page
2. Image generation is now available in all new conversations using this agent
3. Existing conversations maintain their own internal tools settings

![Agent Image Creation Configuration](<../../img/how-tos/chat-conversations/internal tools/image-generation/agent-image-creation.gif>){width="700" loading="lazy"}

---

## How to Generate Images

Once enabled, generating images is as simple as asking the AI assistant:

1. In the message input field, type a prompt describing the image you want to create
2. Example: "Generate an image of a sunset over mountains"
3. Press **Send** or hit Enter
4. The AI will automatically invoke the image generation tool
5. Generated image(s) will appear inline in the conversation

![Generate image](<../../img/how-tos/chat-conversations/internal tools/image-generation/image-creation.gif>){width="700" loading="lazy"}

!!! info "Technical Limitations"

    * **Image Count**: Maximum 10 images per generation request
    * **Model Dependency**: Available features depend on the specific image generation model
    * **Quality vs Speed**: Higher quality images take longer to generate
    * **Size Constraints**: Maximum image size varies by model configuration

??? example "Basic Image Generation"

    **Example Prompts:**
    
    * "Generate an image of a sunset over mountains"
    * "Create a diagram showing a microservices architecture"
    * "Generate an illustration of a friendly robot assistant"
    * "Make an image of a modern office workspace"
    
    The AI will automatically invoke the image generation tool and return the generated image(s) inline in the conversation.

??? example "Advanced Image Generation"

    You can customize image generation with additional parameters:
    
    **Number of Images:**
    
    * "Generate 3 variations of a logo design"
    * Default: 1 image
    * Range: 1-10 images per request
    
    **Image Quality:**
    
    * "Generate a high-quality image of a product mockup"
    * Options: auto (default), low, medium, high
    * Quality setting depends on the underlying model capabilities
    
    **Image Size:**
    
    * "Create a 1024x1024 image of a landscape"
    * Default: auto (model-dependent)
    * Common sizes: 256x256, 512x512, 1024x1024, 1024x1792, etc.
    * Available sizes depend on the specific image generation model
    
    **Style Parameters:**
    
    * "Generate an image in a watercolor style"
    * Style options vary by model (some models support style parameters)

??? example "Multi-Step Generation"

    You can refine images through conversation:
    
    1. **Initial Generation**: "Generate an image of a modern kitchen"
    2. **Review**: View the generated thumbnail
    3. **Refinement**: "Make it brighter and add more natural light"
    4. **Iteration**: Continue refining until satisfied

---
## Viewing and Managing Generated Images

Generated images appear as thumbnails in the conversation. Hover over any image to access management options:

**Fullscreen View:**

* Click the thumbnail to open fullscreen modal
* Press Escape or click outside to close

![Fuul size image](<../../img/how-tos/chat-conversations/internal tools/image-generation/image-full-size.gif>){width="450" loading="lazy"}

**Download:**

* Click the **Download icon** to save the image
* Available formats: PNG or JPG 

![Download image](<../../img/how-tos/chat-conversations/internal tools/image-generation/image-download.gif>){width="450" loading="lazy"}

!!! note "Storage and Deletion"
    Generated images are stored as base64 data in the chat history and don't consume Artifact Toolkit storage quota. Since images are not stored as attachments, they cannot be deleted individually. To remove generated images, you need to delete the entire message containing them or clear the chat history.

---

## Usage Scenarios

??? example "Creating Technical Diagrams"

    **Use Case**: Generate architecture diagrams, flowcharts, or system designs
    
    **Example Prompts:**
    
    * "Create a diagram showing a three-tier web application architecture with load balancer, web servers, and database"
    * "Generate a flowchart for a user authentication process"
    * "Make a network diagram showing VPN connection between offices"
    
    **Best Practices:**
    
    * Be specific about components and relationships
    * Mention diagram type (flowchart, sequence diagram, architecture diagram)
    * Specify colors or styles if needed
    * Request multiple variations to choose the best one

??? example "Generating Illustrations and Concept Art"

    **Use Case**: Create visual content for presentations, documentation, or creative projects
    
    **Example Prompts:**
    
    * "Generate an illustration of a team collaborating in a modern office"
    * "Create a hero image for a SaaS landing page showing productivity features"
    * "Make an icon set for a project management application"
    
    **Best Practices:**
    
    * Describe the mood and style (modern, minimalist, vibrant, professional)
    * Specify color schemes when important
    * Include context about the intended use
    * Generate multiple options for comparison

??? example "Design Mockups and Prototypes"

    **Use Case**: Quickly visualize UI/UX concepts or product designs
    
    **Example Prompts:**
    
    * "Generate a mockup of a mobile app dashboard for fitness tracking"
    * "Create a landing page design for an AI-powered writing assistant"
    * "Make a product card design for an e-commerce website"
    
    **Best Practices:**
    
    * Specify device type (mobile, tablet, desktop)
    * Mention key UI elements to include
    * Describe the color palette and brand style
    * Request specific layout patterns if needed

??? example "Data Visualization"

    **Use Case**: Create charts, graphs, or infographics from described data
    
    **Example Prompts:**
    
    * "Generate a bar chart comparing quarterly sales for 2024"
    * "Create an infographic showing the software development lifecycle"
    * "Make a pie chart showing market share distribution"
    
    **Best Practices:**
    
    * Clearly describe the data and labels
    * Specify chart type (bar, line, pie, scatter)
    * Mention color preferences for different data series
    * Include title and axis labels in your description

??? example "Educational and Training Content"

    **Use Case**: Generate visual aids for learning materials
    
    **Example Prompts:**
    
    * "Create an illustration explaining how photosynthesis works"
    * "Generate a diagram showing the layers of the OSI network model"
    * "Make an image demonstrating proper ergonomic sitting posture"
    
    **Best Practices:**
    
    * Focus on clarity and simplicity
    * Request labels or annotations
    * Use clear, step-by-step descriptions
    * Consider your audience's technical level

??? example "Marketing and Social Media Content"

    **Use Case**: Create branded visuals for marketing campaigns
    
    **Example Prompts:**
    
    * "Generate a social media post image announcing a product launch"
    * "Create a banner image for an email newsletter about new features"
    * "Make a promotional image for a webinar on AI automation"
    
    **Best Practices:**
    
    * Specify dimensions for the target platform
    * Include brand colors and style guidelines
    * Mention text placement areas if needed
    * Generate variations for A/B testing

---

## Best Practices

### Crafting Effective Prompts

??? tip "Be Specific and Descriptive"

    **Instead of:** "Generate a logo"
    
    **Try:** "Generate a modern, minimalist logo for a cloud storage company using blue and white colors, featuring a cloud icon"
    
    **Why:** Specific prompts yield more accurate results that match your vision.

??? tip "Include Context and Purpose"

    **Instead of:** "Make an office image"
    
    **Try:** "Create an image of a modern open-plan office with collaborative workspaces for a tech startup presentation"
    
    **Why:** Context helps the AI understand the intended use and style.

??? tip "Specify Style and Mood"

    **Instead of:** "Generate a landscape"
    
    **Try:** "Generate a serene mountain landscape at sunset with warm orange and purple tones in a photorealistic style"
    
    **Why:** Style descriptions guide the aesthetic direction.

??? tip "Request Multiple Variations"

    **Instead of:** Single generation and hoping for the best
    
    **Try:** "Generate 3 different versions of a dashboard UI, each with a different color scheme"
    
    **Why:** Multiple variations provide options to choose from.

### Managing Generated Content

??? tip "Organize Your Images"

    * Download images promptly with descriptive filenames
    * Use browser download management or dedicated folders
    * Consider version numbers for iterative designs
    * Keep related images together for project work

??? tip "Iterate and Refine"

    * Review initial generation critically
    * Provide feedback for refinement ("make it brighter", "add more detail")
    * Build on successful elements from previous generations
    * Save intermediate versions you might want to reference

??? tip "Document Your Process"

    * Keep a record of effective prompts
    * Note which models work best for specific types of images
    * Document style preferences that yield consistent results
    * Share successful prompt patterns with your team

### Performance Optimization

??? tip "Model Selection"

    * Use faster models for quick iterations
    * Switch to high-quality models for final outputs
    * Consider model capabilities for specific image types
    * Monitor generation times and adjust accordingly

??? tip "Batch Requests Wisely"

    * Generate multiple variations in one request when possible
    * Avoid excessive image counts that slow responses
    * Balance quantity with quality requirements
    * Consider conversation context length

---

## Troubleshooting

??? warning "Issue: Image Generation Not Available"

    **Possible Causes:**
    
    * Image creation internal tool not enabled
    * Selected model doesn't support image generation
    * Model configuration missing image generation endpoint
    * Network connectivity issues
    
    **Solutions:**
    
    1. Verify the **Image creation** toggle is enabled in Internal Tools settings
    2. Check that the selected LLM model supports image generation
    3. Contact your administrator to verify model configuration
    4. Refresh the page and try again

??? warning "Issue: Image Generation Model is Not Configured"

    **Error Message:** "Image generation internal tool requested but no image generation model configured"
    
    **Cause:** The internal tool is enabled, but the selected model lacks image generation capabilities.
    
    **Solution:**
    
    1. Select a different model with image generation support
    2. Verify model configuration with your administrator
    3. Check integration settings for the image generation endpoint

??? warning "Issue: Generated Images Not Displaying"

    **Possible Causes:**
    
    * Image data format error
    * Browser compatibility issues
    * Base64 encoding problems
    * Network interruption during generation
    
    **Solutions:**
    
    1. Refresh the page and regenerate the image
    2. Try a different browser (Chrome, Firefox, Edge)
    3. Check browser console for errors
    4. Ensure stable network connection

??? warning "Issue: Low-Quality Image Results"

    **Possible Causes:**
    
    * Vague or ambiguous prompts
    * Quality parameter set too low
    * Model limitations
    * Size constraints
    
    **Solutions:**
    
    1. **Refine your prompt**: Add more specific details and context
    2. **Request higher quality**: Explicitly ask for "high-quality" images
    3. **Try different models**: Some models excel at specific image types
    4. **Specify larger sizes**: Request specific dimensions (e.g., 1024x1024)

??? warning "Issue: Download Fails"

    **Possible Causes:**
    
    * Browser blocking downloads
    * Base64 conversion error
    * Network timeout
    * Insufficient browser storage
    
    **Solutions:**
    
    1. Check browser download permissions
    2. Try right-clicking the image and "Save Image As"
    3. Refresh and try download again
    4. Clear browser cache and retry

??? warning "Issue: Image Generation Takes Too Long"

    **Possible Causes:**
    
    * Complex prompts requiring more processing
    * High-quality/large size settings
    * Server load or API rate limits
    * Network latency
    
    **Solutions:**
    
    1. Simplify your prompt for faster generation
    2. Use "auto" quality setting initially
    3. Generate one image at a time instead of multiple
    4. Wait for current operations to complete
    5. Try during off-peak hours if rate limited

---

## Related Documentation

!!! info "Additional Resources"
    
    * **[Agent Configuration](../../menus/agents.md)** - Setting up agents with internal tools
    * **[Chat Functionality](how-to-use-chat-functionality.md)** - General chat features and usage
    * **[Canvas in Conversation](how-to-canvas.md)** - Creating and editing content in chat
    * **[Attach Images and Files](attach-images-and-files-in-chat.md)** - Working with file attachments
