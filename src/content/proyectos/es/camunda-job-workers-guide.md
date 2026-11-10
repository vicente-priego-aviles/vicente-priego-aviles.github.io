---
titulo: camunda-job-workers-guide
resumen: Guía paso a paso de job workers en Camunda 8 Self-Managed con Spring Boot. Conceptos, entorno con Docker Compose y primeros workers.
area: camunda
tecnologias: [Java 25, Spring Boot 3.5, Camunda 8.8, BPMN, Docker Compose]
repo: https://github.com/vicente-priego-aviles/camunda-job-workers-guide
destacado: 4
orden: 21
---

Una guía en capítulos, escrita en Markdown dentro del propio repositorio junto al proyecto de ejemplo.

- **01 · Introducción y setup**: qué es un job worker y un job (tipo, variables, cabeceras), cómo levantar Camunda con Docker Compose, comprobar los servicios, entrar en sus interfaces web y resolver problemas.
- **02 · Primeros pasos**: crear el proyecto con Spring Initializr, configurar la conexión a Camunda, un primer worker mínimo (`saludar`) y otros con más lógica (`calcular`, `validar-usuario`), desplegar procesos BPMN, tests y una lista de verificación.
