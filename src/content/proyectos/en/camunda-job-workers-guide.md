---
titulo: camunda-job-workers-guide
resumen: A step-by-step guide to job workers on Camunda 8 Self-Managed with Spring Boot (in Spanish). Concepts, a Docker Compose environment and first workers.
area: camunda
tecnologias: [Java 25, Spring Boot 3.5, Camunda 8.8, BPMN, Docker Compose]
repo: https://github.com/vicente-priego-aviles/camunda-job-workers-guide
destacado: 4
orden: 21
---

A guide in chapters (in Spanish), written in Markdown inside the repository next to the sample project.

- **01 · Introduction and setup**: what a job worker and a job are (type, variables, headers), how to run Camunda with Docker Compose, check the services, open their web interfaces and troubleshoot.
- **02 · First steps**: create the project with Spring Initializr, configure the connection to Camunda, a minimal first worker (`saludar`) and others with more logic (`calcular`, `validar-usuario`), deploy BPMN processes, tests and a checklist.
