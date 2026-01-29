```md
# Docker Compose Lab – Node.js + PostgreSQL

This project demonstrates a real-world Docker Compose setup using a Node.js application and a PostgreSQL database.  
It covers practical concepts like multi-container orchestration, environment variables, image optimization, and container startup dependencies.

---

## Tech Stack

- Node.js (Express)
- PostgreSQL 15
- Docker
- Docker Compose
- Docker Scout (for image security scanning)

---

## Project Structure

```

docker-compose-lab/
│
├── app/
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│
├── .env
├── .dockerignore
├── docker-compose.yml
└── README.md

```

---

## Key Concepts Covered

### 1. Docker Compose
- Manages multiple containers as a single application
- Handles networking between services
- Simplifies local development and testing

### 2. Environment Variables (`.env`)
- Centralized configuration
- Keeps secrets and configs out of code
- Automatically loaded by Docker Compose

### 3. `.dockerignore`
- Reduces Docker image size
- Prevents sensitive files from entering the image
- Improves build performance

### 4. Ephemeral Containers
- Containers are disposable
- Application state should not live inside containers
- PostgreSQL data is persisted using Docker volumes

### 5. Service Dependency Handling
- `depends_on` controls startup order
- Database readiness is handled using health checks
- Prevents application crashes during startup

---

## Environment Variables

Defined in `.env` file:

```

POSTGRES_USER=appuser
POSTGRES_PASSWORD=apppassword
POSTGRES_DB=appdb
DB_HOST=db

````

---

## Dockerfile Explanation

The application uses a lightweight Node.js Alpine image:

- Uses layer caching for faster builds
- No secrets baked into the image
- Exposes only required port

---

## docker-compose.yml Overview

Services:
- **app**: Node.js application
- **db**: PostgreSQL database

Features:
- Automatic service discovery
- Persistent database storage using volumes
- Health checks to ensure DB readiness
- Restart policy for resiliency

---

## How to Run the Application

### Prerequisites
- Docker
- Docker Compose (v2)

### Steps

Build and start the stack:
```bash
docker compose up -d --build
````

Check running containers:

```bash
docker ps
```

Test the application:

```bash
curl http://localhost:3000
```

Expected response:

```
Docker Compose app is running 🚀
```

---

## Common Issue: Database Connection Refused

### Problem

The application may fail if it tries to connect to PostgreSQL before the database is ready.

### Solution

* PostgreSQL health checks are used
* Application waits until DB is healthy
* Restart policy ensures automatic recovery

This reflects real-world container behavior in production systems.

---

## Image Security Scanning with Docker Scout

Login to Docker Hub:

```bash
docker login
```

Scan application image for CVEs:

```bash
docker scout cves <image-name>
```

Get recommendations:

```bash
docker scout recommendations <image-name>
```

Docker Scout helps:

* Identify vulnerable packages
* Improve base image selection
* Reduce attack surface

---

## Why This Setup Matters

This project reflects how containers are used in real environments:

* Containers are not managed individually
* Configuration is externalized
* Images are immutable
* Services are ephemeral
* Security scanning is part of the workflow

## Author

Created for hands-on learning and DevOps interview preparation.
<img width="461" height="144" alt="image" src="https://github.com/user-attachments/assets/d68f679d-a265-4ff9-940a-9d7f376e9f4c" />

```
