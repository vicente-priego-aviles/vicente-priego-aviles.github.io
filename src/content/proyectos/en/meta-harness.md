---
titulo: meta-harness
resumen: A software factory for Claude Code. Project memory in Obsidian, FTD and ASDD work lanes, hooks that score the risk of every change, clean-context subagent review and measured token savings.
area: ia
tecnologias: [Claude Code, Node.js, Python, Obsidian]
repo: https://github.com/vicente-priego-aviles/meta-harness
web: https://vicente-priego-aviles.github.io/meta-harness/
webTexto: Full guide (Spanish)
destacado: 1
orden: 10
---

meta-harness sets up, per project, what Claude Code needs to work methodically:

- **Three work lanes**: answering questions, **FTD** for clear changes and **ASDD** for changes with open decisions, with your approval at the key points.
- **Brain**: project memory in `brain/`, an Obsidian vault versioned with the code (decisions, specs, evidence, lessons).
- **Rules that are enforced**: hooks that score the risk of each change, stop dangerous commands and require a spec and a review before pushing sensitive work.
- **Clean-context review**: reviewer subagents that don't see the conversation, plus a verifier that discards false positives.
- **Fewer tokens, measured**: a budget for always-loaded context, trimmed Maven output and work split across models.

Designed for Java projects with Spring Boot, hexagonal DDD, Camunda 8 / BPMN and Vaadin; the core works for any project. This website was built with it.
