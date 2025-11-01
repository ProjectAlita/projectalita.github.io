# Internal Tools in Conversation

## Overview

Internal tools provide built-in capabilities that enhance your conversations and agents without requiring external integrations. Currently, Elitea supports the **Python Sandbox** internal tool, which enables secure Python code execution directly within your conversations using Pyodide (Python compiled to WebAssembly).

**Use cases:**

* Execute Python code snippets during conversations
* Perform calculations and data analysis
* Test Python algorithms in a secure environment
* Process data with Python libraries
* Generate visualizations and reports

## Prerequisites

* **Permission Level**: User role with conversation edit access
* **Conversation**: An active conversation or agent configuration
* **Backend**: Deno must be installed on the server (handled by system administrators)

## Enabling Internal Tools in Conversations

### Step 1: Open the Internal Tools Configuration

1. Navigate to your conversation
2. Locate the chat input toolbar at the bottom of the screen
3. Find the **Internal Tools** icon (value icon) next to the attachment button
4. Click the Internal Tools icon to open the configuration popup


### Step 2: Enable Python Sandbox

1. In the configuration popup, you'll see a list of available internal tools
2. Find **Python sandbox** in the list
3. Click the toggle switch next to "Python sandbox" to enable it
4. The tool description reads: "Enable Python code execution in a secure sandbox using [Pyodide](https://pyodide.org/en/stable/usage/packages-in-pyodide.html)"

![Enable Python Sandbox](<../../img/how-tos/chat-conversations/internal tools/enable-python-sandbox.png>)

### Step 3: Verify Enablement

1. Once enabled, the toggle switch will move to the ON position
2. A success toast notification will appear: "Internal tools configuration updated"
3. The configuration is saved immediately to the conversation metadata
4. Click anywhere outside the popup to close it

## Enabling Internal Tools in Agent Configuration

You can also configure internal tools as part of an agent's default configuration.

### Step 1: Access Agent Configuration

1. Navigate to **Agents** in the main menu
2. Select the agent you want to configure
3. Click the **Configuration** tab
4. Scroll to the **TOOLKITS** section

### Step 2: Enable Python Sandbox for the Agent

1. In the TOOLKITS section, find the **Python sandbox** switch at the bottom
2. Toggle the switch to enable Python sandbox for this agent
3. The setting includes an info icon (ℹ️) with a tooltip explaining the feature
4. This configuration is saved in the agent version metadata

### Step 3: Save Changes

1. Click **Save** at the top of the configuration page
2. The Python sandbox will now be available in all new conversations using this agent
3. Existing conversations are not affected and maintain their own internal tools settings

![Agent Python Sandbox](<../../img/how-tos/chat-conversations/internal tools/enable-python-sandbox-agent.png>)

## Using the Python Sandbox

Once enabled, the AI assistant can execute Python code during conversations.

**Example conversation:**

**User**: I'm writing a function to validate email addresses. Can you help me test it with various inputs to make sure it works correctly?

```python
import re

def validate_email(email):
    """
    Improved email validation with better edge case handling.
    """
    # Check for consecutive dots
    if '..' in email:
        return False

    # More strict regex pattern
    # Local part: starts and ends with alphanumeric, can contain ._+-% 
    # Domain: proper format with labels that start/end with alphanumeric
    pattern = (
        r'^[a-zA-Z0-9][a-zA-Z0-9._%+-]*[a-zA-Z0-9]'
        r'@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$'
        r'|^[a-zA-Z0-9]@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$'
    )

    return re.match(pattern, email) is not None
```

**Assistant**: I'll help you test your email validation function with a comprehensive set of test cases! Let me run various inputs through it to identify any edge cases.

*[Tool Used: pyodide_sandbox]*

```python
import re

def validate_email(email):
    """
    Improved email validation with better edge case handling.
    """
    # Check for consecutive dots
    if '..' in email:
        return False
    
    # More strict regex pattern
    pattern = r'^[a-zA-Z0-9][a-zA-Z0-9._%+-]*[a-zA-Z0-9]@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$|^[a-zA-Z0-9]@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$'
    
    return re.match(pattern, email) is not None

# Test cases
test_cases = [
    ("user@example.com", True),
    ("user.name@example.co.uk", True),
    ("user+tag@example.com", True),
    ("invalid.email@", False),
    ("@example.com", False),
    ("user@.com", False),
    ("user@example", False),
    ("user name@example.com", False),
    ("user@example..com", False),
]

print("Email Validation Test Results")
print("=" * 50)
passed = 0
failed = 0

for email, expected in test_cases:
    result = validate_email(email)
    status = "✓ PASS" if result == expected else "✗ FAIL"
    
    if result == expected:
        passed += 1
    else:
        failed += 1
    
    print(f"{status} | {email:30} | Expected: {expected}, Got: {result}")

print("=" * 50)
print(f"Results: {passed}/{len(test_cases)} passed, {failed} failed")

if failed > 0:
    print("\n⚠️  Some test cases failed. Review the pattern.")
else:
    print("\n✓ All test cases passed!")
```

**Output:**
```
Email Validation Test Results
==================================================
✓ PASS | user@example.com              | Expected: True, Got: True
✓ PASS | user.name@example.co.uk       | Expected: True, Got: True
✓ PASS | user+tag@example.com          | Expected: True, Got: True
✓ PASS | invalid.email@                | Expected: False, Got: False
✓ PASS | @example.com                  | Expected: False, Got: False
✓ PASS | user@.com                     | Expected: False, Got: False
✓ PASS | user@example                  | Expected: False, Got: False
✓ PASS | user name@example.com         | Expected: False, Got: False
✓ PASS | user@example..com             | Expected: False, Got: False
==================================================
Results: 9/9 passed, 0 failed

✓ All test cases passed!
```

Great! Your improved email validation function passes all test cases. The enhancements you made successfully handle:
- Consecutive dots (rejected)
- Domain without TLD (rejected)
- Proper multi-part domains (accepted)
- Special characters in local part (accepted when appropriate)

![Use Python Sandbox](<../../img/how-tos/chat-conversations/internal tools/executing-sandbox.png>)

The assistant can:

- Install Python packages via Pyodide (e.g., numpy, pandas, matplotlib)
- Execute multi-line Python scripts
- Maintain state between code executions in the same conversation
- Generate data visualizations
- Process files and data

## Verification Steps

### For Conversations

1. **Check the icon state**: The Internal Tools icon should be highlighted when tools are configured
2.  **Test execution**: Ask the assistant to execute a simple Python calculation

### For Agents

1. **Review agent configuration**: Check the Configuration tab to see enabled internal tools
2. **Start new conversation**: Create a new conversation with the agent
3. **Verify availability**: Confirm the Python sandbox is available without manual enablement

## Effects & Caveats

### What Happens When You Enable Python Sandbox

**Immediate effects:**

* The AI assistant gains the ability to execute Python code
* Code runs in a secure, isolated WebAssembly environment
* No access to your local file system or network (unless explicitly configured server-side)
* Execution results are returned in the conversation

**Performance considerations:**

* First code execution may take longer due to Pyodide initialization
* Subsequent executions are faster due to caching
* Complex computations or large data processing may have timeout limits

### Important Caveats

!!! warning "Security & Isolation"
    While the Python sandbox is isolated using Pyodide/WebAssembly, you should still review any code the assistant plans to execute, especially when working with sensitive data.

!!! info "Package Availability"
    Not all Python packages are available in Pyodide. See the [Pyodide packages list](https://pyodide.org/en/stable/usage/packages-in-pyodide.html) for supported packages.

!!! note "Stateful Execution"
    By default, the sandbox maintains state between executions within the same conversation. Variables and imports persist across multiple code blocks.

### Limitations

* **File I/O**: Limited file system access (no access to local files)
* **Network**: Restricted network access depending on server configuration
* **System Operations**: Cannot execute system-level commands
* **Packages**: Limited to Pyodide-compatible packages
* **Execution Time**: Long-running scripts may timeout

## Troubleshooting

### Issue: Internal Tools Icon Not Visible

**Possible causes:**

* You're on the Agents page (internal tools config is only available in conversations)
* The conversation is loading
* You're in a streaming response

**Solution:**

* Wait for the page to fully load
* Wait for any streaming responses to complete
* Ensure you're in a conversation view, not the Agents list

### Issue: "Failed to update internal tools config" Error

**Possible causes:**

* Network connectivity issues
* Backend API unavailable
* Insufficient permissions

**Solution:**

* Check your internet connection
* Refresh the page and try again
* Contact your administrator if the issue persists

### Issue: Python Code Fails to Execute

**Possible causes:**

* Deno not installed on the server
* Package not available in Pyodide
* Syntax errors in the code
* Timeout exceeded

**Solution:**

* Contact system administrator about Deno installation
* Use [Pyodide-compatible packages](https://pyodide.org/en/stable/usage/packages-in-pyodide.html)
* Review error messages in the assistant's response
* Break large computations into smaller chunks

### Issue: Configuration Not Saving in Agent

**Possible causes:**

* Form validation errors
* Missing required fields
* Conflicting configuration

**Solution:**

* Ensure all required agent fields are filled
* Save the entire configuration form, not just the internal tools toggle
* Check for any error messages at the top of the form

!!! info "Related Documentation"
    - [Pyodide Documentation](https://pyodide.org/en/stable/) - Learn about Python in WebAssembly
    - [Pyodide Packages](https://pyodide.org/en/stable/usage/packages-in-pyodide.html) - Available Python packages
    - [Agent Configuration](../../menus/agents.md) - Complete guide to agent configuration
    - [Conversation Management](../../menus/chat.md) - Managing conversations and settings

