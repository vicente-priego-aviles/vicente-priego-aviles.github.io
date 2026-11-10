---
titulo: arquitectura-microservicios
resumen: Microservices with Spring Boot from zero to pro. An online shop built chapter by chapter, one Git branch per chapter, with hexagonal DDD, Neo4j and PostgreSQL, RabbitMQ and Kafka, transactional outbox and sagas.
area: spring
tecnologias: [Java 25, Spring Boot 4.1, Spring Cloud, Neo4j, PostgreSQL, RabbitMQ, Kafka]
repo: https://github.com/vicente-priego-aviles/arquitectura-microservicios
destacado: 2
orden: 30
diagrama:
  src: /diagramas/arquitectura-microservicios.en.svg
  alt: "Shop map: servicio-catalogo with Neo4j and servicio-pedidos with PostgreSQL, linked by HTTP Service Client; servicio-inventario with PostgreSQL receives producto-creado over RabbitMQ and pedido-creado over Kafka."
---

A tutorial shaped as a repository (in Spanish): `main` is the index and each chapter lives on its own branch, with a `README.md` explaining the design decisions and how to try it. Chapters build on each other.

**What it covers (chapters 0 to 14)**
- DDD and hexagonal architecture fundamentals, with graph relationships in Neo4j.
- An API documented with OpenAPI 3 / Swagger, domain events and `ProblemDetail` (RFC 7807/9457).
- A second microservice with JPA, PostgreSQL and Flyway; communication through Spring HTTP Service Client and an anti-corruption layer.
- Resilience (`@Retryable`, `@ConcurrencyLimit`, Resilience4j), web-layer tests and architecture rules with ArchUnit and jMolecules.
- Asynchronous messaging with Spring Cloud Stream (RabbitMQ and Kafka), transactional outbox and idempotent consumers.
- The Saga pattern solved twice on the same scenario: choreographed (chapter 13) and hand-orchestrated (chapter 14).
