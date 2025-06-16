# What is Canvas, and How Do You Use It in ELITEA?

## Introduction

Canvas is your all-in-one workspace for editing, refining, and collaborating on AI-generated content in ELITEA. Instead of copying results into other tools, you can work directly with code, tables, and diagrams—right where the conversation happens. Whether you’re a Business Analyst, QA, AQA, or developer, Canvas helps you and your team turn ideas into actionable, high-quality deliverables.

This guide will walk you through what Canvas is, how to use it, and how it fits into real-world SDLC scenarios. We’ll also point you to helpful resources and related documentation along the way.

## What is Canvas?

Canvas is a built-in editor that appears automatically when ELITEA generates code, tables, or [Mermaid](https://mermaid-js.github.io/) diagrams in a chat. It lets you and your teammates:

- Instantly edit outputs without leaving the platform
- Collaborate in real time
- Track changes and undo/redo edits
- Export or copy content in various formats

Canvas supports three main content types:

1. **Code Blocks** (e.g., Python, Java, YAML)
2. **Tables** (test matrices, requirements, data sets)
3. **Mermaid Diagrams** (flowcharts, sequence diagrams, ERDs)

## Getting Started with Canvas

### Prerequisites
- Access to an [ELITEA conversation](how-to-use-chat-functionality.md) with supported participants (Agents, Pipelines, or LLM Models)
- Content generated that’s compatible with Canvas (code, table, or diagram)

### How to Use Canvas
1. **Trigger Canvas**: Ask ELITEA to generate code, a table, or a diagram in chat.
2. **Look for the Pencil Icon**: When Canvas is available, you’ll see a ✏️ icon next to the output.
3. **Open the Editor**: Click the icon to launch Canvas for that content.
4. **Edit and Collaborate**: Make your changes. If you’re working with others, everyone can edit together in real time.
5. **Save and Export**: Save your changes, copy to clipboard, or export in your preferred format.

![Canvas Activation](../../img/platform/menus/chat/Canvas_Activation.png)

For more on starting conversations and adding participants, see the [Chat Functionality Guide](how-to-use-chat-functionality.md).

## Canvas Features at a Glance

### Universal Features
- **Copy to Clipboard**
- **Undo/Redo**
- **Save Changes**
- **Live Preview**
- **Multi-user Collaboration**

### Code Editor
- Syntax highlighting and language detection
- Auto-completion and bracket matching
- Code folding and find/replace
- [See more: Creating Prompts](creating-prompts.md)

### Table Editor
- Edit cells, add/remove rows and columns
- Import from CSV, export to XLSX or Markdown
- Sort, filter, and hide columns
- [Markdown Table Guide](https://www.markdownguide.org/extended-syntax/#tables)

### Mermaid Diagram Editor
- Live diagram preview
- Export as JPG, PNG, or SVG
- Syntax error detection
- [Mermaid.js Documentation](https://mermaid-js.github.io/)

## Real-World Use Cases

### For Business Analysts (BA)

#### Requirements Documentation
- **Generate a requirements matrix**: 
  ```
  Create a requirements traceability matrix for an e-commerce checkout feature including requirement ID, description, priority, acceptance criteria, and test case mapping.
  ```
- **Edit in Canvas**: Add missing details, adjust priorities, link to user stories, or import from CSV.
- **Collaborate**: Multiple BAs can update sections at once.

#### Process Flow Diagrams
- **Generate a flowchart**: 
  ```
  Create a Mermaid flowchart showing the user registration process including email verification, profile completion, and account activation steps.
  ```
- **Refine in Canvas**: Add decision points, error paths, or custom styles. Export for presentations.

#### User Story Mapping
- **Generate a user story map**: 
  ```
  Generate a user story mapping table for a mobile banking app including epics, user stories, acceptance criteria, and story points.
  ```
- **Enhance in Canvas**: Add dependencies, business value, or sprint mapping. Filter by persona or feature.

### For Quality Assurance (QA)

#### Test Case Documentation
- **Generate test cases**: 
  ```
  Create a comprehensive test case table for login functionality including test case ID, description, preconditions, test steps, expected results, and priority.
  ```
- **Refine in Canvas**: Add test data, environment specs, or map to requirements. Sort by priority.

#### Test Planning
- **Generate a test plan matrix**: 
  ```
  Generate a test planning matrix including test phases, objectives, entry/exit criteria, resources, and timelines for a web application release.
  ```
- **Collaborate in Canvas**: QA leads update resources, managers adjust timelines, add risk assessments, and export for review.

#### Defect Tracking
- **Create a defect tracking table**: 
  ```
  Create a defect tracking table with columns for defect ID, severity, priority, status, assigned developer, and resolution timeline.
  ```
- **Update in Canvas**: Import from tracking systems, update statuses, add root cause analysis, and generate reports.

### For Automated QA (AQA)

#### Test Automation Scripts
- **Generate a Selenium script**: 
  ```
  Create a Selenium WebDriver test script in Java for testing user login functionality including page object model implementation.
  ```
- **Develop in Canvas**: Add error handling, data-driven parameters, custom waits, and logging.

#### API Testing
- **Generate an API test framework**: 
  ```
  Generate a REST API testing framework using RestAssured including test data setup, request/response validation, and error handling.
  ```
- **Enhance in Canvas**: Add authentication, logging, parameterized tests, and performance checks.

#### CI/CD Pipeline Configuration
- **Generate a Jenkins pipeline**: 
  ```
  Create a Jenkins pipeline script for automated testing including build, test execution, and reporting stages.
  ```
- **Refine in Canvas**: Add parallel execution, environment configs, notifications, and deployment steps.

### Cross-Functional Collaboration

#### Requirements to Test Mapping
- **Generate a traceability matrix**: 
  ```
  Create a traceability matrix linking business requirements to test cases for a payment processing feature.
  ```
- **Collaborate in Canvas**: BAs update requirements, QA maps coverage, both validate completeness, and export for compliance.

#### Test Automation Planning
- **Generate an automation plan**: 
  ```
  Generate a test automation plan including manual test prioritization, automation tool selection, and implementation timeline.
  ```
- **Jointly develop in Canvas**: QA prioritizes, AQA estimates effort, both track progress and update strategy.

#### Process Documentation
- **Generate a workflow diagram**: 
  ```
  Create a comprehensive workflow diagram showing the software release process from development to production deployment.
  ```
- **Multi-team input in Canvas**: Devs add coding standards, QA adds checkpoints, DevOps adds deployment steps, management reviews.

## Tips and Best Practices

- **Start simple**: Build up your content step by step.
- **Save often**: Don’t lose your work—use the save button regularly.
- **Communicate**: Use chat to coordinate edits with your team.
- **Export regularly**: Download important content for backup or sharing.
- **Follow standards**: Use your team’s coding and documentation guidelines.

## Troubleshooting

- **Canvas not appearing?** Make sure your content is code, a table, or a diagram, and that you’re using a supported participant.
- **Performance issues?** Try breaking up large content, clearing your browser cache, or checking your connection.
- **Collaboration conflicts?** Coordinate with your team and save frequently.
- **Export problems?** Check file size and format compatibility, or try a different browser.

## More Resources

- [ELITEA Chat Documentation](../platform-documentation/menus/chat.md)
- [How to Use Chat Functionality](how-to-use-chat-functionality.md)
- [Creating Prompts](creating-prompts.md)
- [Markdown Table Guide](https://www.markdownguide.org/extended-syntax/#tables)
- [Mermaid.js Documentation](https://mermaid-js.github.io/)
- [ELITEA Support](../support-resources/contact-support.md)

## Conclusion

Canvas makes it easy to turn AI-generated content into real, actionable deliverables—without ever leaving ELITEA. Use it to collaborate, refine, and perfect your work, whether you’re building requirements, test cases, automation scripts, or diagrams. For more help, check out the resources above or reach out to the [ELITEA support team](../support-resources/contact-support.md).