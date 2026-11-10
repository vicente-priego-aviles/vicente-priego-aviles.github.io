---
titulo: travel-booking-scenario
resumen: A BPMN flight and hotel booking process with error and compensation subprocesses, card retries and customer notifications, on Camunda 8.5 with Docker Compose.
area: camunda
tecnologias: [Java 17, Spring Boot 3.3, Camunda 8.5, BPMN, Docker Compose]
repo: https://github.com/vicente-priego-aviles/travel-booking-scenario
orden: 23
---

A travel booking scenario modelled in BPMN and run with the Camunda SDK for Spring Boot. The repository includes Docker Compose files to start Camunda 8 and a credit card charging worker (`ChargeCreditCardWorker`).

**The process** (`travel-booking-scenario.bpmn`)
- Starts with the customer's flight and hotel room booking request.
- A booking subprocess with 24-hour timers and cancellation events.
- Subprocesses to handle booking errors, compensate what was already booked and update the card details, with a retry limit.
- Customer notifications: failed booking, invalid card, start again and flight and room alternatives.
