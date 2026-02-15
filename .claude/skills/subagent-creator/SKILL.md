---
name: subagent-creator
description: Create specialized Claude Code sub-agents with custom system prompts and tool configurations. Use when users ask to create a new sub-agent, custom agent, specialized assistant, or want to configure task-specific AI workflows for Claude Code.
---

# Sub-agent Creator

Create specialized AI sub-agents for Claude Code that handle specific tasks with customized prompts and tool access.

**READ REFERENCES** before proposing to ensure accuracy:
- Available tools: `references/available-tools.md`
- Examples: `references/examples.md`
- Template: `assets/subagent-template.md`

## Sub-agent File Format

Sub-agents are Markdown files with YAML frontmatter stored in:
- **Project**: `.claude/agents/` (higher priority)
- **User**: `~/.claude/agents/` (lower priority)

### Structure

```markdown
---
name: subagent-name
description: When to use this subagent (include "use proactively" for auto-delegation)
tools: Tool1, Tool2, Tool3  # Optional - inherits all if omitted
model: sonnet               # Optional - sonnet/opus/haiku/inherit
skills: skill1, skill2      # Optional - auto-load skills
---

System prompt goes here. Define role, responsibilities, and behavior.
```

### Configuration Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Lowercase with hyphens |
| `description` | Yes | Purpose and when to use (key for auto-delegation) |
| `tools` | No | Comma-separated tool list (omit to inherit all) |
| `model` | No | `sonnet`, `opus`, `haiku`, or `inherit` |
| `skills` | No | Skills to auto-load |

## Simplified Q&A Process

### Step 1: Understand Purpose

Ask user: "Describe the agent's purpose and what it should do."

Based on their response, **internally propose** all properties:
- Name (derived from purpose)
- Tool group (based on purpose)
- Model (default: inherit)
- System prompt outline

**READ `references/available-tools.md` and `references/examples.md`** before proposing.

### Step 2: Model Selection (Optional)

Only ask if user needs specific capability:
- `haiku`: Fast, simple tasks (docs, formatting)
- `sonnet`: Balanced (most use cases)
- `opus`: Complex reasoning (architecture, debugging)
- `inherit`: Same as parent (default)

### Step 3: Location

Ask: "Global profile (all projects) or project-specific? (default: project)"

### Step 4: Single Review & Confirm

Present **one complete summary** with all proposed properties:

```
Name: code-reviewer
Model: inherit
Tools: Read, Grep, Glob, Bash
Location: .claude/agents/code-reviewer.md

System Prompt:
[preview first 3 lines]
```

Ask: "Here's your agent profile. Should I create it?"

**DO NOT ask for confirmations on individual items.** Only one final approval.

### Step 5: Create

On user confirmation, generate the profile using `assets/subagent-template.md` as base.

## Tool Groups

Organize tool selection by purpose:

| Group | Tools | Use Case |
|-------|-------|----------|
| **Read-Only** | Read, Grep, Glob | Analysis, review, audit |
| **Shell** | Bash | Commands, git, build |
| **Code Modify** | Read, Write, Edit, Grep, Glob | Feature development |
| **Full Power** | Read, Write, Edit, Grep, Glob, Bash | Full automation |
| **Web** | WebFetch, WebSearch | Research, docs lookup |
| **Task** | Task | Delegation to other agents |

**Default**: Read-Only + Shell for most agents. Add Write/Edit only if needed.

## Writing Effective Sub-agents

### Description Best Practices

The `description` field is critical for automatic delegation:

```yaml
# Good - specific triggers + proactive
description: Expert code reviewer. Use PROACTIVELY after writing or modifying code.

# Good - clear use cases
description: Debugging specialist for errors, test failures, and unexpected behavior.

# Bad - too vague
description: Helps with code
```

### System Prompt Guidelines

1. **Define role clearly**: "You are a [specific expert role]"
2. **List actions on invocation**: What to do first
3. **Specify responsibilities**: What the sub-agent handles
4. **Include guidelines**: Constraints and best practices
5. **Define output format**: How to structure responses

## Quick Start Example

Create a code reviewer sub-agent:

```bash
mkdir -p .claude/agents
```

Write to `.claude/agents/code-reviewer.md`:

```markdown
---
name: code-reviewer
description: Reviews code for quality and security. Use proactively after code changes.
tools: Read, Grep, Glob, Bash
model: inherit
---

You are a senior code reviewer.

When invoked:
1. Run git diff to see changes
2. Review modified files
3. Report issues by priority

Focus on:
- Code readability
- Security vulnerabilities
- Error handling
- Best practices
```

## Resources

- `references/available-tools.md` - Complete tool list with descriptions
- `references/examples.md` - Full examples (code-reviewer, debugger, data-scientist, etc.)
- `assets/subagent-template.md` - Starter template