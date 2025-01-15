# Prompts Examples and Materials

## Prompts - Helpful Materials

To assist you in maximizing the capabilities of Prompts within the ELITEA platform, we have compiled a selection of helpful materials. These resources are designed to guide you through the processes of creating, setting up, configuring, and effectively using Prompts.

### Prompting Frameworks

To further refine the instructions and ensure high-quality responses from LLMs, you can utilize structured prompting frameworks. These frameworks help in crafting precise and effective prompts by breaking down the requirements into specific components. Below are examples of how to apply these frameworks in the context of software testing:

#### CREATE Framework

The **CREATE** framework helps in constructing detailed and focused prompts by defining the Character, Request, Examples, Adjustment, Type of Output, and Extras.

```
**Character**: Act as a senior software tester with expertise in regression testing.
**Request**: Develop a detailed regression testing strategy for an upcoming version release of our CRM software.
**Examples**: Include scenarios like:
  **Preconditions**: CRM software has been updated to the latest version.
  **Steps to reproduce**: User logs in and accesses the customer data module.
  **Expected results**: User should see updated customer data without any data loss.
**Adjustment**: Focus on critical modules like customer data management and transaction processing.
**Type of Output**: Format the strategy as a formal document with sections for objectives, scope, test scenarios, and resources.
**Extras**: After formulating the strategy, provide a rationale for the choice of specific test scenarios and their expected impact on the software quality.
```

#### Elavis Saravia Framework

This framework simplifies the prompt creation process into four main elements: Instruction, Context, Input Data, and Output Indicator.

```
**Instruction**: Generate test cases for user interface consistency across different devices.
**Context**: The application is a cross-platform tool accessible on desktops, tablets, and smartphones.
**Input Data**: User accesses the application from different devices.
**Output Indicator**: The output should be a list of test cases, each describing the test steps, the expected results, and the device type.
```

#### CRISPE Framework

The **CRISPE** framework provides a comprehensive approach by incorporating Capacity and Role, Insight, Statement, Personality, and Experiment.

```
**Capacity and Role**: Serve as an automated testing tool expert.
**Insight**: The software to be tested is an e-commerce platform with high transaction volumes and user concurrency.
**Statement**: Create automated test scripts that simulate multiple user transactions simultaneously.
**Personality**: Maintain a technical and precise tone throughout the test scripts.
**Experiment**: Offer three variations of the test script focusing on different aspects of the transaction process (e.g., payment processing, cart updates, and user login).
```

By integrating these frameworks into the **Context** section of your prompts, you can guide LLMs to produce more targeted and effective outputs. Each framework helps in structuring your request to the Gen AI, ensuring that all necessary details are included to generate the desired results.