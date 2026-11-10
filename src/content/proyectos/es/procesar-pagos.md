---
titulo: procesar-pagos
resumen: Primeros pasos con Camunda 8 y Spring Boot. Despliega un modelo de proceso, inicia una instancia y atiende una tarea de servicio, con su guía en Javacadabra.
area: camunda
tecnologias: [Java 21, Spring Boot 3.4, Camunda 8.7, BPMN]
repo: https://github.com/vicente-priego-aviles/procesar-pagos
web: https://javacadabra.vercel.app/bpmn/camunda/introduccion-a-camunda-8/2-comenzando-como-desarrollador-de-java-usando-spring/
webTexto: Guía en Javacadabra
orden: 22
---

Proyecto de acompañamiento de una guía de mi blog. Usa el SDK de Camunda para Spring Boot contra una instalación local de Camunda e incluye ejemplos de las tres interacciones básicas con Zeebe:

1. Desplegar un modelo de proceso (`procesar-pagos.bpmn`: solicitud de pago recibida → preparar transacción → cargar tarjeta de crédito → pago ejecutado).
2. Iniciar una instancia de proceso.
3. Atender una tarea de servicio con un job worker (`CargarTarjetaCreditoWorker`).
