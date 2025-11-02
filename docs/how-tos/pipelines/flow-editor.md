# Flow Editor

The Flow Editor is ELITEA's visual pipeline builder that lets you design, configure, and manage pipelines without writing code. Create complex workflows by dragging nodes onto the canvas, connecting them, and configuring their properties—all through an intuitive graphical interface.

---

## What is Flow Editor?

The **Flow Editor** is a visual workspace for building pipelines. It provides:

* **Drag-and-drop interface** for adding and arranging nodes
* **Visual connections** between nodes showing execution flow
* **Vertical layout** optimized for easy configuration
* **Instant YAML sync** - changes in Flow appear immediately in YAML (and vice versa)
* **Interactive configuration** - click nodes to configure their settings

![Flow Editor interface overview](../../img/how-tos/pipelines/flow-editor/flow-editor-overview.png)

---

## Accessing Flow Editor

1. Navigate to **Pipelines** menu
2. Open an existing pipeline or create a new one
3. Click the **Configuration** tab
4. Select **Flow** mode (appears alongside **YAML** tab)

![Configuration tab with Flow and YAML tabs](../../img/how-tos/pipelines/flow-editor/access-flow-editor.png)

!!! note "Flow and YAML Sync"
    Whatever you configure in Flow automatically appears in YAML format, and vice versa. Both views stay perfectly synchronized.

---

## Flow Editor Interface

The Flow Editor consists of several key areas:

![Flow Editor interface components labeled](../../img/how-tos/pipelines/flow-editor/interface-components.png)

### Main Components

| Component | Location | Purpose |
|-----------|----------|---------|
| **Canvas** | Center | Main workspace for arranging nodes |
| **Toolbar** | Left side | Tools for canvas control (zoom, layout, etc.) |
| **Add Node Button** | Top right (➕) | Opens node palette to add new nodes |
| **State Button** | Top right | Opens state configuration sidebar |
| **Configuration Panel** | Left side | Shows General info and Chat Input (collapsible) |
| **Flow/YAML Tabs** | Top center | Switch between visual and code views |

### Left Toolbar Buttons

![Left toolbar with action buttons](../../img/how-tos/pipelines/flow-editor/toolbar-buttons.png)

| Icon | Action | Keyboard Shortcut |
|------|--------|------------------|
| **➕** | Add new node | - |
| **➖** | Zoom out | - |
| **⛶** | Fit view (auto-center) | - |
| **🔒** | Lock/Unlock editing | - |
| **⬜** | Collapse/Expand all cards | - |
| **🔧** | Auto-fix layout | - |

---

## Adding Nodes

### Method 1: Add Node Button

1. Click the **➕** button (top right corner)
2. A node palette appears showing all available node types
3. Select the node type you want to add
4. Node appears on the canvas

![Add node button and node palette](../../img/how-tos/pipelines/flow-editor/add-node-palette.png)

**Available Node Types:**

* Agent
* Code
* Condition
* Custom
* Decision
* Function
* LLM
* Loop
* Loop from tool
* Pipeline (Subgraph)
* Router
* State modifier
* Tool

### Method 2: Drag from Connection

You can also add nodes while creating connections:

1. Drag a connector from an existing node
2. Release it in empty space on the canvas
3. Select **Create New Node** from the dropdown
4. Choose node type
5. New node is created with connection already attached

![Creating node from connection dropdown](../../img/how-tos/pipelines/flow-editor/create-from-connector.png)

---

## Configuring Nodes

Click on any node card to open its configuration panel:

![Node card with configuration panel open](../../img/how-tos/pipelines/flow-editor/node-configuration.png)

### Node Configuration Options

Each node type has specific configuration fields. Common options include:

* **Node Name** (click card title to rename)
* **Input/Output** state variables
* **Node-specific settings** (prompts, toolkits, conditions, etc.)
* **Advanced options** (Interrupt Before/After, Structured Output)

!!! tip "Renaming Nodes"
    Click on the node card title to rename most nodes. **Decision** and **Condition** nodes cannot be renamed.

### Renaming a Node

1. Click the **node card title**
2. Type the new name
3. Press **Enter** or click outside to save

![Renaming a node by clicking title](../../img/how-tos/pipelines/flow-editor/rename-node.png)

---

## Connecting Nodes

Nodes must be connected to define the execution flow. See the [Nodes Connectors Guide](nodes-connectors.md) for complete details.

### Creating Connections

**Method 1: Drag and Drop**

1. Click and hold the **output port** (bottom of node card)
2. Drag the connector line to the **input port** (top of target node)
3. Release to create the connection

![Dragging connector from output to input](../../img/how-tos/pipelines/flow-editor/drag-connection.png)

**Method 2: Drop on Canvas**

1. Drag connector from a node
2. Release in empty canvas space
3. Select existing node or create new node from dropdown
4. Connection auto-completes

![Dropdown menu for connecting or creating nodes](../../img/how-tos/pipelines/flow-editor/connection-dropdown.png)

### Deleting Connections

**Option 1:** Click on the connection line to select it, then press **Delete**

**Option 2:** Click on the connection line to highlight it, then click again to delete

![Selected connection line highlighted](../../img/how-tos/pipelines/flow-editor/delete-connection.png)

---

## Managing Nodes

### Node Card Actions

Click the **three-dots menu (⋮)** on any node card to access node actions:

![Node card three-dots menu](../../img/how-tos/pipelines/flow-editor/node-menu-options.png)

**Available Actions:**

| Action | Description |
|--------|-------------|
| **Make entrypoint** | Set this node as the pipeline entry point |
| **Delete** | Remove the node from the pipeline |

!!! warning "Deleting Nodes"
    Deleting a node also removes all its connections. Make sure to reconnect remaining nodes after deletion.

### Moving Nodes

Rearrange nodes to improve visual clarity:

1. Click on a node card
2. Drag it to a new position on the canvas
3. Release to place

![Moving a node card on canvas](../../img/how-tos/pipelines/flow-editor/move-node.png)

!!! tip "Vertical Layout"
    The Flow Editor uses a **vertical (top-to-bottom) layout** for optimal readability. Nodes execute from top to bottom following the connections.

---

## Canvas Controls

### Zoom and Pan

**Zoom In/Out:**

* Click **➕** (zoom in) or **➖** (zoom out) in the toolbar
* Use mouse scroll wheel

**Pan the Canvas:**

* Click and drag on empty canvas space
* Use trackpad/mouse scroll

### Fit View

Click the **⛶ Fit View** button to auto-center and zoom the canvas to show all nodes.

![Fit view button centers all nodes](../../img/how-tos/pipelines/flow-editor/fit-view.png)

### Lock/Unlock Editing

Click the **🔒 Lock** button to prevent accidental changes:

* **Locked**: Cannot move, add, delete, or modify nodes
* **Unlocked**: Full editing capability

![Lock button toggle](../../img/how-tos/pipelines/flow-editor/lock-editing.png)

### Collapse/Expand Cards

Toggle between compact and detailed node views:

* **Collapsed**: Shows only node name and type icon
* **Expanded**: Shows all configuration fields

Click **⬜ Collapse/Expand** button to toggle all nodes at once.

![Collapsed vs expanded node cards](../../img/how-tos/pipelines/flow-editor/collapse-expand-cards.png)

### Auto-Fix Layout

Click **🔧 Auto-fix Layout** to automatically rearrange nodes for optimal spacing and alignment.

![Auto-fix layout reorganizes nodes](../../img/how-tos/pipelines/flow-editor/auto-fix-layout.png)

---

## Configuring States

Click the **State** button (top right) to open the state configuration sidebar.

![State sidebar panel](../../img/how-tos/pipelines/flow-editor/state-sidebar.png)

**In the State Sidebar:**

* View all pipeline state variables
* Add new custom states
* Configure default values
* Set state data types (String, Number, Array, Object)

See the [States Guide](states.md) for complete state configuration details.

---

## Collapsing Side Panels

Maximize canvas space by collapsing the configuration panels:

### Collapse General Section

1. Click the arrow next to **GENERAL**
2. Section collapses, showing only the header
3. Click again to expand

![Collapsing General section](../../img/how-tos/pipelines/flow-editor/collapse-general.png)

### Collapse Chat Input Section

1. Click the arrow next to **CHAT INPUT** (if visible)
2. Section collapses
3. Click again to expand

**Benefits:**

* More canvas space for complex pipelines
* Better focus on visual flow
* Easier navigation with many nodes

---

## Flow to YAML Synchronization

Changes made in Flow Editor **instantly appear in YAML**:

1. Add/modify nodes in Flow
2. Switch to **YAML** tab
3. See the updated YAML code
4. Switch back to **Flow** to continue visual editing

![Flow and YAML tabs showing synchronized content](../../img/how-tos/pipelines/flow-editor/flow-yaml-sync.png)

!!! note "Two-Way Sync"
    Edits in YAML also update the Flow view immediately. You can work in whichever mode you prefer.

---

## Common Workflows

### Building a Simple Pipeline

1. **Add Entry Point Node**
      * Click ➕ button
      * Select node type (e.g., LLM)
      * Configure the node

2. **Make it Entry Point**
      * Click ⋮ on node card
      * Select **Make entrypoint**

3. **Add Next Node**
      * Click ➕ button
      * Select next node type
      * Configure it

4. **Connect Nodes**
      * Drag from first node's output to second node's input

5. **Add Termination**
      * Drag from last node's output
      * Release in canvas
      * Select **END** from dropdown

6. **Save**
      * Click **Save** button (top right)

![Simple linear pipeline workflow](../../img/how-tos/pipelines/flow-editor/simple-workflow.png)

### Creating Conditional Flow

1. Add a **Router**, **Condition**, or **Decision** node
2. Configure the routing logic
3. Add multiple nodes for different paths
4. Connect each conditional output to appropriate nodes
5. Ensure all paths eventually reach **END**

![Conditional branching workflow](../../img/how-tos/pipelines/flow-editor/conditional-workflow.png)

---

## Best Practices

### 1. Use Descriptive Node Names

Rename nodes to reflect their purpose:

✅ **Good**: "Validate User Input", "Generate Report", "Send Email"

❌ **Bad**: "LLM Node", "Function Node 2", "Tool"

### 2. Organize Vertically

Arrange nodes in a **top-to-bottom flow** for readability:

* Entry point at top
* Processing nodes in middle
* END at bottom

### 3. Collapse Side Panels for Complex Pipelines

When working with many nodes:

* Collapse **GENERAL** and **CHAT INPUT** sections
* Use **Fit View** to see entire pipeline
* Use **Collapse Cards** for overview, **Expand** when configuring

### 4. Use Auto-Fix Layout Regularly

After adding/moving several nodes, click **Auto-fix Layout** to maintain clean alignment.

### 5. Test Incrementally

* Build pipeline step-by-step
* Test after adding each node
* Verify connections before adding more complexity

### 6. Save Frequently

Click **Save** often to prevent data loss, especially after:

* Adding multiple nodes
* Creating complex connections
* Configuring important settings

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Delete selected node/connection | **Delete** or **Backspace** |
| Save pipeline | **Ctrl/Cmd + S** |
| Undo | **Ctrl/Cmd + Z** |
| Redo | **Ctrl/Cmd + Shift + Z** |

---

## Troubleshooting

### Nodes Not Connecting

**Problem**: Cannot create connection between nodes.

**Solutions**:

* Check if nodes are compatible (e.g., Router requires specific output nodes)
* Verify you're dragging from output port (bottom) to input port (top)
* Try **Auto-fix Layout** if nodes are overlapping

### Canvas is Blank

**Problem**: Flow Editor shows empty canvas.

**Solutions**:

* Switch to **YAML** tab to check if pipeline has nodes
* Click **Fit View** to center nodes
* Refresh the page

### Changes Not Saving

**Problem**: Edits disappear after closing pipeline.

**Solutions**:

* Click **Save** button before navigating away
* Check for error messages at top of screen
* Verify network connection

### Node Configuration Not Opening

**Problem**: Clicking node doesn't show configuration panel.

**Solutions**:

* Click directly on the node card (not the connection lines)
* Unlock editing if canvas is locked (🔒 button)
* Expand the **GENERAL** section if collapsed

---

## Related Resources

* **[Nodes Connectors](nodes-connectors.md)**: Learn how to connect nodes and manage transitions
* **[States Guide](states.md)**: Configure state variables for data flow
* **[YAML Configuration](yaml.md)**: Work directly with YAML code
* **[Nodes Overview](nodes/overview.md)**: Understand all 13 node types
* **[Entry Point Guide](entry-point.md)**: Set up pipeline starting points

---

**Next Steps:**

* Explore [YAML Configuration](yaml.md) for advanced pipeline editing
* Review [Nodes Connectors](nodes-connectors.md) for connection patterns
* Learn about [States](states.md) for managing pipeline data
