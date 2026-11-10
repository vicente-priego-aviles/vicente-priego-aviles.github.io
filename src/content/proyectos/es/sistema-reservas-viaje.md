---
titulo: sistema-reservas-viaje
resumen: Reservas de vuelo, hotel y coche orquestadas con Camunda 8. Seis microservicios con arquitectura hexagonal y DDD, reservas en paralelo y compensaciones con el patrón Saga.
area: camunda
tecnologias: [Java 25, Spring Boot 4.1, Camunda 8.9, BPMN, jMolecules, Docker]
repo: https://github.com/vicente-priego-aviles/sistema-reservas-viaje
destacado: 3
orden: 20
diagrama:
  src: /diagramas/sistema-reservas-viaje.es.svg
  alt: "servicio-reservas inicia el proceso BPMN en Camunda 8, que reparte el trabajo en tres subprocesos (gestión del cliente, reserva y pago) atendidos por los workers de servicio-clientes, servicio-vuelos, servicio-hoteles, servicio-alquiler-coches y servicio-pagos."
---

Un sistema de reservas de viaje con Camunda 8 como orquestador BPMN. `servicio-reservas` coordina e inicia el proceso; el resto de microservicios atienden sus tareas como job workers.

**Características**
- Arquitectura hexagonal: separación entre dominio, aplicación e infraestructura.
- DDD con el modelado explícito de jMolecules; un agregado por servicio (`Cliente`, `ReservaVuelo`, `ReservaHotel`, `ReservaAlquilerCoche`, `Pago`, `ReservaViaje`).
- Reservas simultáneas de vuelo, hotel y coche, con compensaciones automáticas (patrón Saga) si algo falla.
- Observabilidad con health checks, métricas y logs estructurados; despliegue con Docker Compose.
- Tests unitarios, de integración y de arquitectura.
