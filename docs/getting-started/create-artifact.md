# Create an Artifact Using an Agent

## Introduction

Artifacts in ELITEA are files (such as `.txt`, `.md`, `.csv`, `.json`, etc.) stored in project-specific buckets. Using the Artifact Toolkit with an Agent allows you to automate the creation, storage, and management of temporary files for workflows like logging, data sharing, or workflow state management.

---

## Step 1: Add the Artifact Toolkit to Your Agent


1. **Navigate to Agents:**  
      * Open the sidebar and select **Agents**.

2. **Create or Edit an Agent:**  
      * Click **"+ Create"** to make a new agent, or select an existing agent to edit.

3. **Access Toolkits Section:**  
      * In the Agent configuration, scroll to the **"Toolkits"** section.

4. **Add the Artifact Toolkit:**  
      * Click the **"+ Toolkit"** button.
      * You can now either:
        * **Select an existing toolkit** with type **Artifact** from the list and click **Save** to add it to your agent, **or**
        * Click **"Create new"** to be redirected to the new toolkit creation page, where you can set up a new Artifact Toolkit.

5. **Configure the Artifact Toolkit (if creating new):**  
      * **Bucket Name:** Enter a unique name for your bucket (acts as a folder for your files). If it doesn’t exist, it will be created automatically.
      * **Select Tools:** Choose which artifact tools to enable (e.g., Create File, Read File, List Files, Append Data, Delete File).
      * Click **Save** to add the new Artifact Toolkit to your agent.

---

## Step 2: Use the Agent to Create Artifacts

* When the agent is running, use its enabled tools to:
    * **Create File:** Save new files (artifacts) with any content you need.
    * **Append Data:** Add more information to existing files.
    * **Read File:** Retrieve and process stored artifact content.
    * **List Files:** See all files in your bucket.
    * **Delete File:** Clean up old or temporary files.
* **Provide Detailed Instructions:**  
  When asking the agent to create an artifact, always specify the file (artifact) name and type (e.g., `report.md`, `log.txt`). Clear, detailed instructions help the agent perform the task correctly.

Artifacts are accessible for 30 days by default and are shared among agents and users in the same ELITEA project.

---

## Tips & Best Practices

* Choose descriptive bucket and file names to keep your workspace organized.
* Only enable the artifact tools your agent actually needs.
* Artifacts are for temporary, non-confidential data—avoid storing sensitive info.
* Use different bucket names for independent workflows to prevent data collisions.

---

## Troubleshooting

* **File or Bucket Not Found?**  
    * Double-check names and use the List Files tool to verify contents.
* **Artifacts Missing?**  
    * Files are auto-deleted after 30 days; download important data before it expires.

---

## Learn More

* See the [full Artifact Toolkit Guide](../integrations/toolkits/artifact_toolkit.md) for advanced details and use cases.
* Get help from the [ELITEA documentation](https://elitea.ai/docs).

---