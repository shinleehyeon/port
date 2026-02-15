# Available Tools for Sub-agents
Sub-agents can be granted access to any of Claude Code's internal tools. If tools field is omitted, the sub-agent inherits all tools from the main thread.
## Tool Groups
### Read-Only Group
Best for: Code analysis, documentation review, security audits
| Tool | Description |
|------|-------------|
| Read | Read file contents |
| Glob | Find files by pattern matching |
| Grep | Search file contents with regex |
### Shell Group
Best for: Git operations, build commands, system tasks
| Tool | Description |
|------|-------------|
| Bash | Execute shell commands |
### Code Modify Group
Best for: Feature implementation, bug fixes, refactoring
| Tool | Description |
|------|-------------|
| Write | Create or overwrite files |
| Edit | Make precise edits to existing files |
### Web Group
Best for: Research, documentation lookup, API exploration
| Tool | Description |
|------|-------------|
| WebFetch | Fetch and process web content |
| WebSearch | Search the web |
### Task Group
Best for: Delegation, complex multi-step workflows
| Tool | Description |
|------|-------------|
| Task | Spawn sub-agents (use sparingly in sub-agents) |
| TodoWrite | Manage task lists |
### Interaction Group
Best for: Clarification, user input gathering
| Tool | Description |
|------|-------------|
| AskUser | Ask user questions for clarification |
### IDE Tools (when available)
| Tool | Description |
|------|-------------|
| mcp__ide__getDiagnostics | Get language diagnostics from VS Code |
| mcp__ide__executeCode | Execute code in Jupyter kernel |
### MCP Tools
Sub-agents can also access tools from configured MCP servers. MCP tool names follow the pattern mcp__<server>__<tool>.
## Common Tool Combinations
### Read-Only Research
yaml
tools: Read, Grep, Glob

Best for: Security audits, code review (report-only), analysis
### Read + Shell (Recommended Default)
yaml
tools: Read, Grep, Glob, Bash

Best for: Most review/analysis tasks that need git or shell access
### Code Modification
yaml
tools: Read, Write, Edit, Grep, Glob, Bash

Best for: Implementing features, fixing bugs, refactoring
### Full Power (Use Sparingly)
yaml
tools: Read, Write, Edit, Grep, Glob, Bash, Task, WebFetch

Best for: Complex automation requiring delegation and research
### Full Access
Omit the tools field to inherit all available tools.
## Tool Selection Guidelines
1. **Start minimal**: Begin with Read-Only + Shell, add more only if needed
2. **Avoid Task in sub-agents**: Can cause recursive spawning issues
3. **Write/Edit require trust**: Only for well-tested agents
4. **WebFetch for research**: Useful for docs lookup, not for general browsing