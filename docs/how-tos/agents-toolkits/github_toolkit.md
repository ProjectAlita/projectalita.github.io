# ELITEA Toolkit Guide: GitHub Integration

## 1. Introduction

### 1.1 Purpose of the Guide

This guide is designed to assist users in setting up and using ELITEA with a primary focus on its integration with **GitHub**. It provides step-by-step instructions on account setup, configuration, and connecting ELITEA to GitHub, empowering you to enhance efficiency and optimize task management within your software development workflows. This guide aims to help users of all levels understand and effectively use ELITEA, emphasizing its powerful integration capabilities with external software and toolkits. These integrations enable users to maximize the potential of ELITEA in their workflows, significantly enhancing productivity and improving the overall user experience.

### 1.2 Brief Overview of GitHub

GitHub is a leading web-based platform for version control and collaboration, widely used by developers globally. Key features of GitHub include:

*   **Collaborative Coding:** Facilitates team-based software development with features like pull requests, issue tracking, and project boards.
*   **Version Control with Git:** Utilizes Git for tracking changes in code, enabling efficient collaboration, branching, and version management.
*   **Code Hosting:** Provides a secure and reliable platform for hosting and managing code repositories.
*   **Workflow Automation (GitHub Actions):** Supports automation of software development workflows, including building, testing, and deployment.

By integrating GitHub with ELITEA, you can leverage the power of AI to streamline your development processes, automate code-related tasks, and enhance collaboration within your GitHub repositories, all from within the ELITEA environment.

### 1.3 Target Audience

This guide is intended for:

*   **End-Users:** Developers, software engineers, and project team members who want to use ELITEA Agents to automate GitHub-related tasks and improve their development workflows.
*   **Administrators:** ELITEA administrators responsible for setting up and managing toolkit integrations, ensuring secure and seamless connectivity to GitHub.
*   **Support Staff:**  Technical support personnel who will assist users with setting up the GitHub integration, troubleshooting issues, and understanding best practices.

This guide is written for users with a **beginner level of technical understanding**, assuming a basic familiarity with ELITEA and version control systems like Git and GitHub. No advanced technical expertise is required to follow this guide and implement the integration.

## 2. Account Setup and Initial Configuration

### 2.1 Account Creation

To create a GitHub account, if you don't already have one, follow these steps:

1.  **Visit GitHub Website:** Go to the official GitHub website: [github.com](https://github.com).
2.  **Sign Up:** Click on the **"Sign up"** button, typically located in the top right corner of the homepage.
3.  **Enter Details:** Follow the on-screen instructions to create your account. You will need to provide a username, email address, and password.
4.  **Verify Email:** GitHub will send a verification email to the address you provided. Click the verification link in the email to activate your account.
5.  **Log In:** Once your email is verified, log in to GitHub using your newly created username and password.

### 2.2 Access Requirements

*   **Valid Email Address:** You will need a valid email address to create a GitHub account.
*   **Repository Access:** Ensure you have access to the GitHub repositories you wish to integrate with ELITEA. This typically means you need to be a collaborator or member of the organization that owns the repository.
*   **Personal Access Token (Recommended):** For secure integration with ELITEA, you will need to generate a GitHub Personal Access Token (Classic). This token will be used by ELITEA to authenticate and access your GitHub repositories.

### 2.3 Software-Specific Setup: Generating a Personal Access Token (Classic) in GitHub

To allow ELITEA Agents to securely access and interact with your GitHub repositories, you need to generate a Personal Access Token (Classic) in GitHub and configure it with the necessary permissions.

**Steps to Generate a Personal Access Token (Classic) in GitHub:**

1.  **Log in to GitHub:** Access your GitHub account at [github.com](https://github.com).
2.  **Access Developer Settings:** Click on your profile avatar in the top right corner and then click on **"Settings"**.
3.  **Navigate to Developer Settings:** In the left-hand sidebar, scroll down and click on **"Developer settings"**.
4.  **Access Personal Access Tokens (Classic):** In the left-hand sidebar under "Personal access tokens," click on **"Tokens (classic)"**.
5.  **Generate New Token:** Click the **"Generate new token (classic)"** button.
6.  **Note:** If you have already created tokens, you might see a "Generate new token" button instead.
7.  **Provide Token Details:**
    *   **Note (Description):** In the "Note" field, enter a descriptive label for your token, such as "ELITEA Integration Token" or "ELITEA Agent Access." This helps you remember the purpose of this token later.
    *   **Expiration (Optional):** You can set an expiration date for the token if desired. For security best practices, consider setting an expiration to limit the token's validity period.
    *   **Select Permissions (Crucial for Security):** Carefully choose the **scopes** or permissions you grant to this token. **Grant only the minimum necessary permissions** required for your ELITEA Agent's intended interactions with GitHub. For typical ELITEA integration, you might need to select scopes like:
        *   `repo` (Full control of private repositories) or more granular `repo` scopes like:
            *   `repo:status` (Access commit status)
            *   `repo_deployment` (Access deployment statuses)
            *   `public_repo` (Access public repositories)
            *   `repo:invite` (Manage repository invitations)
            *   `security_events` (Read and write security events)
        *   `workflow` (Access workflows)
        *   `write:packages` (Upload or delete packages)
        *   `read:packages` (Download packages)
        *   `delete:packages` (Delete packages)
        *   `gist` (Access gists)
        *   `read:org` and `write:org` (if your Agent needs to access organization-level information)
        *   `user` (if your Agent needs to access user profile information)

    **Important Security Practice:**  **Do not grant "admin" or overly broad permissions to the token.** Granting only the necessary scopes minimizes the potential security impact if the token is ever compromised.
8.  **Generate Token:** Click the **"Generate token"** button at the bottom of the page.
9.  **Securely Copy and Store the Personal Access Token:**  **Immediately copy the generated token** that is displayed. **This is the only time you will see the full token value.** Store it securely in a password manager or a safe location. You will need this token to configure the GitHub toolkit in ELITEA.

    ![GitHub-Generate_Token](../../img/how-tos/github/GitHub-Generate_Token.png)

## 3. System Integration with ELITEA

### 3.1 Overview and Usage of GitHub Integration with ELITEA

The GitHub toolkit integration in ELITEA provides a powerful connection between your AI Agents and your GitHub repositories. This integration enables your Agents to:

*   **Access and Analyze Code:** Retrieve and analyze code files, documentation, and other content directly from your GitHub repositories.
*   **Automate Code Workflows:** Automate key development tasks such as branch management, file creation and updates, and pull request management.
*   **Enhance Collaboration and Code Review:** Streamline code review processes by enabling agents to create pull requests, add comments, and manage code changes.
*   **Integrate AI into Development Lifecycle:** Seamlessly integrate AI-powered automation into your software development lifecycle, improving efficiency and code quality.

### 3.2 Integration Steps: Configuring the GitHub Toolkit in ELITEA

To integrate GitHub with ELITEA and enable your Agents to interact with your repositories, follow these configuration steps within ELITEA:

1.  **Navigate to Agents Menu:** In ELITEA, go to the **Agents** menu and either **create a new Agent** or **edit an existing Agent** that you want to integrate with GitHub.
2.  **Access Toolkits Section:** Within the Agent configuration, scroll down to the **"Tools"** section.
3.  **Add Toolkit:** Click the **"+" icon** under the "TOOLS" section to add a new toolkit.
4.  **Select GitHub Toolkit:** From the dropdown list of available toolkits, choose **"GitHub"**. This will open the "New GitHub tool" configuration section.
5.  **Configure GitHub Toolkit Settings:**  Fill in the following configuration fields in the "New GitHub tool" section:

    *   **Name:**  Enter a descriptive **Name** for your GitHub toolkit instance. This name will be used to reference the toolkit within your Agent's instructions (e.g., "MyGitHubRepo", "CodeRepoAccess").
    *   **Description:** Provide a brief **Description** of the toolkit's purpose or the specific GitHub repository it will access (e.g., "Access to Project Alpha code repository").
    *   **URL:**  This field is pre-filled with the standard GitHub API URL: `https://api.github.com`. **Do not modify this URL unless you are connecting to a self-hosted GitHub Enterprise instance.**
    *   **Repository:** Enter the **Repository name** that you want to access with this toolkit. Use the format: `repository_owner/repository_name` (e.g., `ProjectAlita/alita-sdk`).
    *   **Main branch:** Specify the **Main branch** of your repository, typically `main` or `master`.
    *   **Authentication Options - Token:** Select the **"Token"** authentication option.
        *   **Password/Secret:** Choose **"Password"** and then paste the **Personal Access Token (Classic)** you generated in GitHub (during the "Software-Specific Setup" section of this guide) into the **"Password"** field.  **Important Security Note:** For enhanced security, consider using the **"Secret"** option instead and storing your Personal Access Token securely as a Secret within [Secrets](../../platform-documentation/menus/settings.md#secrets) feature.

    ![ELITEA GitHub Toolkit Configuration Screenshot](image-elitea-github-toolkit-config.png) (*Replace with actual screenshot of ELITEA GitHub Toolkit configuration*)

6.  **Enable Desired Tools:** In the **"Tools"** section within the GitHub toolkit configuration, **check the boxes next to the specific GitHub tools** you want to enable for your Agent. Select only the tools that your Agent will actually need to use to minimize unnecessary permissions and maintain security. Available tools include:
    *   **Get issues**
    *   **Get issue**
    *   **Comment on issue**
    *   **List open pull requests (PRs)**
    *   **Get pull request**
    *   **List pull request files**
    *   **Create pull request**
    *   **Create file**
    *   **Read file**
    *   **Update file**
    *   **Delete file**
    *   **List files in branch**
    *   **List branches in repo**
    *   **Set active branch**
    *   **Create branch**

7.  **Complete Setup:** Click the **arrow icon** (usually located at the top right of the toolkit configuration section) to complete the GitHub toolkit setup and return to the main Agent configuration menu.

### 3.3 Tool Overview: GitHub Toolkit Functionalities

Once the GitHub toolkit is configured and added to your Agent, you can leverage the following tools within your Agent's instructions to interact with your GitHub repositories:

*   **Get Issues:**  **Tool Name:** `github_get_issues`
    *   **Functionality:** Retrieves a list of issues from the specified GitHub repository.
    *   **Use Case:**  Allow Agents to fetch issue lists for task prioritization, reporting, or to provide users with issue summaries within ELITEA workflows.
*   **Get Issue:**  **Tool Name:** `github_get_issue`
    *   **Functionality:** Retrieves detailed information about a specific issue from a GitHub repository.
    *   **Use Case:** Enable Agents to fetch issue details for providing context, summarizing issue status, or incorporating issue information into ELITEA conversations.
*   **Comment on Issue:**  **Tool Name:** `github_comment_on_issue`
    *   **Functionality:** Adds a comment to a specific issue in a GitHub repository.
    *   **Use Case:** Automate adding comments to GitHub issues directly from ELITEA, facilitating communication, updates, and notifications within issue tracking workflows.
*   **List Open Pull Requests (PRs):**  **Tool Name:** `github_list_open_pull_requests`
    *   **Functionality:** Retrieves a list of open pull requests from the specified GitHub repository.
    *   **Use Case:** Allow Agents to fetch lists of open pull requests for code review reminders, reporting on pending changes, or providing users with PR summaries within ELITEA.
*   **Get Pull Request:**  **Tool Name:** `github_get_pull_request`
    *   **Functionality:** Retrieves detailed information about a specific pull request from a GitHub repository.
    *   **Use Case:** Enable Agents to fetch PR details for code review assistance, providing context on specific pull requests, or incorporating PR information into ELITEA workflows.
*   **List Pull Request Files:**  **Tool Name:** `github_list_pull_request_files`
    *   **Functionality:** Retrieves a list of files changed in a specific pull request from a GitHub repository.
    *   **Use Case:** Allow Agents to provide summaries of files changed in a PR, facilitate code review by listing modified files, or analyze the scope of code changes within ELITEA.
*   **Create Pull Request:**  **Tool Name:** `github_create_pull_request`
    *   **Functionality:** Creates a new pull request in the specified GitHub repository.
    *   **Use Case:** Automate pull request creation for code contributions, feature branches, or bug fixes directly from ELITEA, streamlining the code review and merging process.
*   **Create File:**  **Tool Name:** `github_create_file`
    *   **Functionality:** Creates a new file in the specified GitHub repository.
    *   **Use Case:** Automate the creation of new code files, documentation files, or configuration files within your repository directly from ELITEA workflows.
*   **Read File:**  **Tool Name:** `github_read_file`
    *   **Functionality:** Reads the content of a file from the specified GitHub repository.
    *   **Use Case:** Retrieve code snippets, configuration files, or documentation content from your repository to provide context or data to your ELITEA Agent or to users within ELITEA conversations.
*   **Update File:**  **Tool Name:** `github_update_file`
    *   **Functionality:** Updates the content of a specific file in a GitHub repository.
    *   **Use Case:** Automate updating code files, documentation, or configuration files within your repository based on ELITEA workflow outputs or user requests.
*   **Delete File:**  **Tool Name:** `github_delete_file`
    *   **Functionality:** Deletes a specific file from a GitHub repository.
    *   **Use Case:** Automate file deletion tasks within your repository, such as removing obsolete files or cleaning up temporary files generated by ELITEA workflows.
*   **List Files in Branch:**  **Tool Name:** `github_list_files_in_branch`
    *   **Functionality:** Retrieves a list of files in a specific branch of a GitHub repository.
    *   **Use Case:** Allow Agents to browse repository contents, provide users with file lists for navigation, or analyze file structures within ELITEA workflows.

## 4. Instructions and Prompts for Using the GitHub Toolkit

To effectively utilize the GitHub toolkit within your ELITEA Agents, you need to provide clear instructions within the Agent's "Instructions" field, telling the Agent *how* and *when* to use these tools.

**General Instruction Structure:**

When instructing your Agent to use a GitHub tool, you will typically follow this pattern:

```
Use the "[tool_name]" tool to [describe the action you want to perform].
Provide the following parameters:
- Parameter 1: <value or description of value>
- Parameter 2: <value or description of value>
- ...
```

**Example Agent Instructions for GitHub Toolkit Tools:**

*   **Agent Instructions for Creating a New Branch:**

    ```
    Use the "github_create_branch" tool to create a new branch in the repository.
    Provide the following parameters:
    - Repository Name: "your-github-username/your-repository-name"
    - New Branch Name: "feature-xyz"
    - Base Branch: "main"
    ```

*   **Agent Instructions for Listing Branches in a Repository:**

    ```
    Use the "github_list_branches_in_repo" tool to list all branches in the repository.
    Provide the following parameters:
    - Repository Name: "your-github-username/your-repository-name"
    ```

*   **Agent Instructions for Reading a File from a Repository:**

    ```
    Use the "github_read_file" tool to read the content of a file from the repository.
    Provide the following parameters:
    - Repository Name: "your-github-username/your-repository-name"
    - File Path: "path/to/your/file.txt"
    - Branch Name: "main"
    ```

**Important Considerations for Agent Instructions:**

*   **Tool Name Accuracy:** Ensure you use the correct **Tool Name** (e.g., `"github_create_pull_request"`) as listed in the "Tool Overview" section. Typos or incorrect tool names will prevent the Agent from using the toolkit correctly.
*   **Parameter Clarity:** Clearly specify the **parameters** required for each tool and provide instructions on where the Agent should obtain the values for these parameters (e.g., from user input, from previous steps in the workflow, or hardcoded values).
*   **Context and Examples:** Provide sufficient context and examples within your Agent's "Instructions" to guide the LLM in understanding *when* and *how* to use the GitHub toolkit tools effectively within your desired workflow.

## 5. Best Practices and Use Cases for GitHub Integration

### 5.1 Best Practices for Efficient Integration

*   **Test Integration Regularly:**  After setting up the GitHub toolkit and incorporating it into your Agents, **thoroughly test the integration** to ensure it is functioning as expected. Test each tool you intend to use to verify connectivity, authentication, and correct execution of GitHub actions.
*   **Monitor Agent Performance:**  After deploying Agents with GitHub integration, **monitor their performance** regularly. Track metrics like task completion success rate, execution time, and error rates to identify any potential issues or areas for optimization in your Agent's instructions or toolkit configurations.
*   **Follow Security Best Practices:**
    *   **Use Personal Access Tokens:** Always use GitHub Personal Access Tokens (Classic) instead of your main account password for integrations.
    *   **Grant Least Privilege:** Grant only the minimum necessary scopes/permissions to the Personal Access Token to limit potential security risks.
    *   **Securely Store Credentials:** Utilize ELITEA's Secrets Management feature to securely store and manage your GitHub Personal Access Tokens instead of hardcoding them directly in Agent configurations.
*   **Provide Clear Instructions and Prompts:**  Craft clear and unambiguous instructions within your ELITEA Agents to guide them in using the GitHub toolkit effectively. Use the prompt examples provided in this guide as a starting point and adapt them to your specific use cases.
*   **Start with Simple Use Cases:** Begin by implementing GitHub integration for simpler automation tasks and gradually progress to more complex workflows as you gain experience and confidence with the toolkit.

### 5.2 Use Cases for GitHub Toolkit Integration

The GitHub toolkit opens up a wide range of automation possibilities for your software development workflows within ELITEA. Here are some compelling use cases:

| Tool                      | Use Case Example                                                                                                                           | Benefit                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `Get Issues`              | Agent retrieves a list of open bug issues from a repository to prioritize bug fixing efforts.                                              | Provides developers with a prioritized bug list directly within ELITEA for efficient issue resolution.         |
| `Get Issue`               | Agent fetches details of a specific GitHub issue to provide context and information to a user during a troubleshooting session.            | Offers quick access to detailed issue information, improving context and understanding during problem-solving. |
| `Comment on Issue`        | Agent automatically adds a comment to a GitHub issue to update stakeholders on progress or request further information.                    | Streamlines communication and updates within issue tracking workflows, keeping teams informed.                 |
| `List Open Pull Requests` | Agent lists all open pull requests in a repository to remind developers about pending code reviews.                                        | Improves code review workflow by providing automated reminders and visibility of open PRs.                     |
| `Get Pull Request`        | Agent retrieves details of a specific pull request to provide context for code review or merging decisions.                                | Facilitates informed code reviews and merging by providing easy access to PR details within ELITEA.            |
| `List Pull Request Files` | Agent lists files changed in a pull request to quickly assess the scope and impact of code changes.                                        | Speeds up code review by providing a clear overview of files modified in a PR.                                 |
| `Create Pull Request`     | Agent automatically creates a pull request after a user completes a code modification task within ELITEA.                                  | Automates pull request creation, streamlining the code contribution and merging process.                       |
| `Create File`             | Agent generates a template code file or documentation file and automatically creates it in the repository.                                 | Automates file creation, ensuring consistent file templates and reducing manual file creation effort.          |
| `Read File`               | Agent retrieves a configuration file from the repository to dynamically adjust application settings based on the file content.             | Enables dynamic configuration management and allows Agents to adapt behavior based on repository files.        |
| `Update File`             | Agent automatically updates a configuration file in the repository based on changes detected in the ELITEA environment or user input.      | Automates configuration updates, ensuring consistency between ELITEA and repository configurations.            |
| `Delete File`             | Agent automatically deletes obsolete or temporary files from the repository to maintain codebase cleanliness.                              | Helps maintain a clean and organized codebase by automating the removal of unnecessary files.                  |
| `List Files in Branch`    | Agent lists all files in a specific branch to allow users to browse repository contents or select files for further actions within ELITEA. | Provides users with easy access to repository file listings for navigation and file-based workflows.           |

## 6. Integration Helpdesk/Common Issues and Key Terms

### 6.1 Troubleshooting Common Issues

*   **Connection Errors:**
    *   **Problem:** ELITEA Agent fails to connect to GitHub, resulting in errors during toolkit execution.
    *   **Possible Solutions:**
        *   **Verify GitHub API URL:** Double-check that the **URL** field in the toolkit configuration is set to the standard GitHub API URL: `https://api.github.com`.  Avoid modifying this unless you are using GitHub Enterprise Server.
        *   **Check Personal Access Token:** Ensure that the **Personal Access Token (Classic)** you provided is correct, has not expired, and is valid for your GitHub account and repository.
        *   **Verify Token Scopes:** Review the **scopes/permissions** granted to your Personal Access Token. Ensure it has the necessary scopes (e.g., `repo`, `workflow`, `issues`, `pull_request`) for the GitHub tools your Agent is trying to use.
        *   **Network Connectivity:** Confirm that both your ELITEA environment and your GitHub instance are connected to the internet and that there are no network connectivity issues blocking the integration.
*   **Permission Denied Errors:**
    *   **Problem:** Agent execution fails with "Permission Denied" or "Unauthorized" errors when trying to access or modify GitHub resources.
    *   **Possible Solutions:**
        *   **Verify Token Scopes:** Double-check the **scopes/permissions** granted to your Personal Access Token. Ensure it has the necessary scopes for the specific GitHub actions your Agent is trying to perform (e.g., `write:repo` scope for creating files or pull requests).
        *   **Repository Access:** Confirm that the GitHub account associated with the Personal Access Token has the required access to the specified repository. Verify that the account is a collaborator or member of the organization that owns the repository and has the necessary roles or permissions.
*   **Incorrect Repository or Branch Names:**
    *   **Problem:** Agent tools fail to operate on the intended repository or branch.
    *   **Possible Solutions:**
        *   **Double-Check Repository Name:** Carefully verify that you have entered the correct GitHub Repository name in the toolkit configuration, using the format `repository_owner/repository_name`. Pay attention to capitalization and spelling.
        *   **Verify Branch Name:** Ensure that you are using the correct branch name (e.g., `main`, `develop`, `feature-branch`) in your Agent's instructions when specifying branch-related parameters for GitHub tools. Branch names are case-sensitive in Git.

### 6.2 FAQs

1.  **Q: Can I use my regular GitHub password for the ELITEA integration?**
    *   **A:** No, it is **strongly recommended to use a GitHub Personal Access Token (Classic)** instead of your main account password for security reasons. Personal Access Tokens provide a more secure and controlled way to grant access to external applications like ELITEA.
2.  **Q: What scopes/permissions should I grant to the GitHub Personal Access Token?**
    *   **A:** Grant only the **minimum necessary scopes** required for your ELITEA Agent's intended interactions with GitHub. For typical integration, `repo` scope (or granular `repo` scopes), `workflow`, and potentially `issues` and `pull_request` scopes are commonly needed. Avoid granting "admin" or unnecessary permissions.
3.  **Q: What is the correct format for the GitHub Repository name in the toolkit configuration?**
    *   **A:**  The Repository name should be entered in the format `repository_owner/repository_name` (e.g., `ProjectAlita/alita-sdk`). Ensure you include both the repository owner's username or organization name and the repository name, separated by a forward slash `/`.
4.  **Q: Why is my Agent getting "Permission Denied" errors even though I think I have configured everything correctly?**
    *   **A:** Double-check the **scopes/permissions** granted to your GitHub Personal Access Token. Ensure that the token has the specific scopes required for the GitHub tools your Agent is trying to use (e.g., `write:repo` scope for creating files or pull requests). Also, verify that the GitHub account associated with the token has the necessary access to the target repository.

### 6.3 Glossary of Key Terms

*   **Personal Access Token (Classic):** A secure credential generated in GitHub to authorize access for applications like ELITEA, providing a more secure alternative to using your main account password.
*   **Repository:** A storage location for code, files, and version history in GitHub (and other version control systems).
*   **Branch:** A parallel version of a repository, used for isolating code changes and feature development.
*   **Pull Request (PR):** A request to merge code changes from one branch into another, often used for code review and collaboration.
*   **Toolkit:** In ELITEA, a toolkit refers to an integration with an external service or platform (like GitHub, Jira, Confluence) that provides a set of pre-built tools and functionalities for Agents to use.
*   **Scope (GitHub Permissions):**  Scopes define the level of access granted to a Personal Access Token, specifying what actions the token is authorized to perform within GitHub (e.g., `repo:read`, `workflow`, `issues`).

### 6.4 Support and Contact Information

If you encounter any issues, have questions, or require further assistance beyond what is covered in this guide regarding the GitHub integration or ELITEA Agents in general, please do not hesitate to contact our dedicated ELITEA Support Team. We are here to help you resolve any problems quickly and efficiently and ensure you have a smooth and productive experience with ELITEA.

**How to Reach ELITEA Support:**

*   **Email:**  **[SupportAlita@epam.com](mailto:SupportAlita@epam.com)**

**Best Practices for Effective Support Requests:**

To help us understand and resolve your issue as quickly as possible, please ensure you provide the following information in your support email:

*   **ELITEA Environment:** Clearly specify the ELITEA environment you are using (e.g., "Nexus," "Alita Lab," "EYE").
*   **Project Details:**  Indicate the **Project Name** and whether you are working in your **Private** workspace or a **Team** project.
*   **Detailed Issue Description:** Provide a clear, concise, and detailed description of the problem you are encountering. Explain what you were trying to do, what you expected to happen, and what actually occurred.
*   **Relevant Configuration Information:**  To help us diagnose the issue, please include relevant configuration details, such as:
    *   **Agent Instructions (Screenshot or Text):** If the issue is with an Agent, provide a screenshot or copy the text of your Agent's "Instructions" field.
    *   **Toolkit Configurations (Screenshots):** If the issue involves the GitHub toolkit or other toolkits, include screenshots of the toolkit configuration settings within your Agent.
*   **Error Messages (Full Error Text):** If you are encountering an error message, please provide the **complete error text**. In the Chat window, expand the error details and copy the full error message. This detailed error information is crucial for diagnosis.
*   **Your Query/Prompt (Exact Text):** If the issue is related to Agent execution, provide the exact query or prompt you used to trigger the issue.

**Before Contacting Support:**

We encourage you to first explore the resources available within this guide and the broader ELITEA documentation. You may find answers to common questions or solutions to known issues in the documentation.

