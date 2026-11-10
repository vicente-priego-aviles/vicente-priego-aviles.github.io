---
titulo: meta-harness
resumen: Software factory para Claude Code. Memoria del proyecto en Obsidian, carriles de trabajo FTD y ASDD, hooks que calculan el riesgo de cada cambio, revisión con subagentes de contexto limpio y menos tokens, medido.
area: ia
tecnologias: [Claude Code, Node.js, Python, Obsidian]
repo: https://github.com/vicente-priego-aviles/meta-harness
web: https://vicente-priego-aviles.github.io/meta-harness/
webTexto: Guía completa
destacado: 1
orden: 10
---

meta-harness monta en cada proyecto, a medida, lo que Claude Code necesita para trabajar con método:

- **Tres carriles de trabajo**: responder preguntas, **FTD** para cambios claros y **ASDD** para cambios con decisiones, con tu aprobación en los puntos clave.
- **Brain**: la memoria del proyecto en `brain/`, una bóveda de Obsidian versionada con el código (decisiones, specs, evidencias, lecciones).
- **Reglas que se cumplen**: hooks que calculan el riesgo de cada cambio, frenan comandos peligrosos y exigen spec y revisión antes de subir lo delicado.
- **Revisión con contexto limpio**: subagentes revisores que no ven la conversación y un verificador que descarta los falsos positivos.
- **Menos tokens, medido**: presupuesto para lo siempre cargado, salida de Maven reducida y el trabajo repartido entre modelos.

Pensado para proyectos Java con Spring Boot, DDD hexagonal, Camunda 8 / BPMN y Vaadin; el núcleo sirve para cualquier proyecto. Esta misma web se ha construido con él.
