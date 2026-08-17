---
name: dsh-skill-adapter
description: Convert a public portable SKILL.md into a DSH-compatible skill with verified discovery paths, tool mapping, provenance checks, and safe fallbacks.
whenToUse: Use when a user asks to import, port, convert, or evaluate a Codex, Claude, or other public agent skill for DSH.
metadata: dsh-portable-skill-pack
---

# DSH Skill Adapter

1. Inspect the source Skill, license, revision, task triggers, tools, side effects, output contract, and verification steps.
2. Do not port a skill verbatim when its license, provenance, or permitted reuse is unclear; independently summarize its workflow instead.
3. Keep decision rules and checks; remove role-play, repeated host-agent rules, invented capability claims, and agent-specific private tool names.
4. Map each action to an enabled DSH capability: filesystem, configured shell, web search, browser plugin, or subagent.
5. For an unavailable capability, state a prerequisite or manual handoff. Never claim a replacement tool ran when it did not.
6. Write the adapted file at `.agents/skills/<name>/SKILL.md` or `.dsh/skills/<name>/SKILL.md` using a kebab-case name plus `name` and `description` frontmatter.
7. Require confirmation before deletion, publishing, deployment, external messages, or credential changes.
8. Verify that every command, path, and tool either exists in the active session or is labeled as a prerequisite.
9. Deliver the source/license assessment, DSH capability map, installation path, adapted `SKILL.md`, two trigger prompts, and one near-miss prompt.
