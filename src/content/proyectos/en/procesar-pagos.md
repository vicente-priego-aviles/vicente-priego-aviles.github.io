---
titulo: procesar-pagos
resumen: First steps with Camunda 8 and Spring Boot. Deploys a process model, starts an instance and handles a service task, with its guide on Javacadabra (in Spanish).
area: camunda
tecnologias: [Java 21, Spring Boot 3.4, Camunda 8.7, BPMN]
repo: https://github.com/vicente-priego-aviles/procesar-pagos
web: https://javacadabra.vercel.app/bpmn/camunda/introduccion-a-camunda-8/2-comenzando-como-desarrollador-de-java-usando-spring/
webTexto: Guide on Javacadabra (Spanish)
orden: 22
---

Companion project for a guide on my blog. It uses the Camunda SDK for Spring Boot against a local Camunda installation and includes examples of the three basic interactions with Zeebe:

1. Deploying a process model (`procesar-pagos.bpmn`: payment request received → prepare transaction → charge credit card → payment executed).
2. Starting a process instance.
3. Handling a service task with a job worker (`CargarTarjetaCreditoWorker`).
