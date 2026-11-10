---
titulo: sistema-reservas-viaje
resumen: Flight, hotel and car bookings orchestrated with Camunda 8. Six microservices with hexagonal architecture and DDD, parallel bookings and Saga compensations.
area: camunda
tecnologias: [Java 25, Spring Boot 4.1, Camunda 8.9, BPMN, jMolecules, Docker]
repo: https://github.com/vicente-priego-aviles/sistema-reservas-viaje
destacado: 3
orden: 20
diagrama:
  src: /diagramas/sistema-reservas-viaje.en.svg
  alt: "servicio-reservas starts the BPMN process in Camunda 8, which splits the work into three subprocesses (customer handling, booking and payment) served by the workers of servicio-clientes, servicio-vuelos, servicio-hoteles, servicio-alquiler-coches and servicio-pagos."
---

A travel booking system with Camunda 8 as the BPMN orchestrator. `servicio-reservas` coordinates and starts the process; the other microservices handle their tasks as job workers.

**Features**
- Hexagonal architecture: domain, application and infrastructure kept apart.
- DDD with explicit modelling through jMolecules; one aggregate per service (`Cliente`, `ReservaVuelo`, `ReservaHotel`, `ReservaAlquilerCoche`, `Pago`, `ReservaViaje`).
- Flight, hotel and car bookings in parallel, with automatic compensations (Saga pattern) when something fails.
- Observability with health checks, metrics and structured logs; deployment with Docker Compose.
- Unit, integration and architecture tests.
