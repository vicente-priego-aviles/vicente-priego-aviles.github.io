---
titulo: travel-booking-scenario
resumen: Proceso BPMN de reserva de vuelo y hotel con subprocesos de error y de compensación, reintentos de tarjeta y notificaciones al cliente, sobre Camunda 8.5 con Docker Compose.
area: camunda
tecnologias: [Java 17, Spring Boot 3.3, Camunda 8.5, BPMN, Docker Compose]
repo: https://github.com/vicente-priego-aviles/travel-booking-scenario
orden: 23
---

Un escenario de reserva de viaje modelado en BPMN y ejecutado con el SDK de Camunda para Spring Boot. El repositorio incluye los ficheros de Docker Compose para levantar Camunda 8 y un worker de cobro con tarjeta (`ChargeCreditCardWorker`).

**El proceso** (`travel-booking-scenario.bpmn`)
- Arranca con la solicitud de reserva de vuelo y habitación de hotel del cliente.
- Subproceso de reserva con temporizadores de 24 horas y eventos de cancelación.
- Subprocesos para gestionar errores de reserva, compensar lo ya reservado y actualizar los datos de la tarjeta, con un límite de reintentos.
- Notificaciones al cliente: reserva fallida, tarjeta no válida, empezar de nuevo y alternativas de vuelos y habitaciones.
