# 🎓 University Management System

A robust University Management System built using **Angular** (frontend) and **Spring Boot Microservices** (backend), designed to efficiently handle administrative, academic, and user interactions within a university setting.

[📽️ Click to Watch Demo Video](https://drive.google.com/file/d/1X_PjFP_1jbldg_NgH6BzKkTp4X-vyUyR/view?usp=sharing)

---

## 🧩 Tech Stack

### Frontend
- 🌐 [Angular](https://angular.io/) – SPA development, component-based UI
- 🎨 Bootstrap – Responsive design
- 📦 RxJS – Reactive programming for state & API interactions

### Backend (Microservices Architecture)
- ☕ Spring Boot – Core framework for building REST APIs
- 🧩 Spring Cloud – Service discovery, configuration
- 📚 Spring Data JPA – ORM layer
- 🔐 Spring Security – Authentication and authorization
- 💬 Spring Boot Admin – Monitoring microservices
- 📈 Eureka – Service registry & discovery
- 🪄 API Gateway – Routing, filtering requests
- 🛠️ Config Server – Centralized configuration management

### Database
- 🐘 PostgreSQL – Primary relational database
- 🧠 H2 – For testing

---

## 🏗️ Microservices Structure

```plaintext
├── api-gateway-service
├── eureka-service (Eureka)
├── course-service
├── exam-service
├── user-service
└── frontend (Angular)
