---
titulo: arquitectura-microservicios
resumen: De cero a pro en microservicios con Spring Boot. Una tienda online construida capítulo a capítulo, una rama de Git por capítulo, con DDD hexagonal, Neo4j y PostgreSQL, RabbitMQ y Kafka, outbox transaccional y sagas.
area: spring
tecnologias: [Java 25, Spring Boot 4.1, Spring Cloud, Neo4j, PostgreSQL, RabbitMQ, Kafka]
repo: https://github.com/vicente-priego-aviles/arquitectura-microservicios
destacado: 2
orden: 30
diagrama:
  src: /diagramas/arquitectura-microservicios.es.svg
  alt: "Mapa de la tienda: servicio-catalogo con Neo4j y servicio-pedidos con PostgreSQL, unidos por HTTP Service Client; servicio-inventario con PostgreSQL recibe producto-creado por RabbitMQ y pedido-creado por Kafka."
---

Un tutorial en forma de repositorio: `main` es el índice y cada capítulo vive en su propia rama, con un `README.md` que explica las decisiones de diseño y cómo probarlo. Los capítulos son acumulativos.

**Qué cubre (capítulos 0 a 14)**
- Fundamentos de DDD y arquitectura hexagonal, con relaciones de grafo en Neo4j.
- API documentada con OpenAPI 3 / Swagger, eventos de dominio y `ProblemDetail` (RFC 7807/9457).
- Segundo microservicio con JPA, PostgreSQL y Flyway; comunicación con Spring HTTP Service Client y capa anticorrupción.
- Resiliencia (`@Retryable`, `@ConcurrencyLimit`, Resilience4j), tests de la capa web y reglas de arquitectura con ArchUnit y jMolecules.
- Mensajería asíncrona con Spring Cloud Stream (RabbitMQ y Kafka), outbox transaccional y consumidores idempotentes.
- El patrón Saga resuelto dos veces sobre el mismo escenario: coreografiada (capítulo 13) y orquestada a mano (capítulo 14).
