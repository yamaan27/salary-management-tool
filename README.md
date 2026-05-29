# Salary Management Tool

A full-stack employee management and salary analytics platform built with React, TypeScript, Node.js, Express, Prisma, PostgreSQL, and Docker.

## Overview

The Salary Management Tool provides employee lifecycle management and compensation analytics through a modern web interface. The application supports employee CRUD operations, search, pagination, salary intelligence dashboards, and country-specific compensation insights.

The project is structured as a monorepo and follows scalable full-stack architecture practices with shared types, containerized deployment, and production-ready infrastructure.

---

## Features

### Employee Management

* Create employees
* Update employee records
* Delete employees
* Search employees
* Paginated employee listing
* Form validation using Zod and React Hook Form
* Confirmation dialogs
* Toast notifications

### Analytics Dashboard

* Salary intelligence dashboard
* Country-specific salary insights
* Job title salary benchmarks
* Minimum salary analytics
* Maximum salary analytics
* Average salary analytics
* Median salary analytics
* Employee count metrics

### Engineering Features

* Monorepo architecture
* Shared TypeScript package
* Type-safe API contracts
* Prisma ORM integration
* PostgreSQL database
* Dockerized infrastructure
* Environment-based configuration
* Production deployment support

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Hook Form
* Zod
* Axios
* Sonner

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM

### Database

* PostgreSQL
* Neon Database

### Deployment

* Vercel (Frontend)
* Render (Backend)

### DevOps

* Docker
* Docker Compose
* PNPM Workspaces

---

## Project Structure

```text
salary-management-tool/

apps/
├── frontend/
└── backend/

packages/
└── shared/

Dockerfile.frontend
Dockerfile.backend
docker-compose.yml
pnpm-workspace.yaml
```

### Frontend

```text
apps/frontend
├── src
│   ├── api
│   ├── components
│   ├── pages
│   ├── routes
│   └── types
```

### Backend

```text
apps/backend
├── src
│   ├── repositories
│   ├── routes
│   ├── services
│   ├── prisma
│   └── seed
```

---

## Architecture

The application follows a layered backend architecture:

```text
Routes
   ↓
Services
   ↓
Repositories
   ↓
Prisma ORM
   ↓
PostgreSQL
```

Frontend and backend share common contracts through a dedicated shared package to ensure type consistency across the application.

---

## Analytics Engine

The analytics module provides:

### Country Insights

* Minimum salary
* Maximum salary
* Average salary
* Median salary
* Employee count

### Job Title Insights

Average salary calculations for:

* Software Engineer
* Senior Software Engineer
* Engineering Manager
* Product Manager
* HR Manager
* Data Analyst
* QA Engineer

Analytics are computed using Prisma aggregation queries directly against PostgreSQL.

---

## Local Development

### Prerequisites

* Node.js 20+
* PNPM
* PostgreSQL

### Install Dependencies

```bash
pnpm install
```

### Generate Prisma Client

```bash
cd apps/backend

pnpm prisma generate
```

### Run Database Migrations

```bash
pnpm prisma migrate deploy
```

### Seed Database

```bash
pnpm seed
```

### Start Frontend

```bash
cd apps/frontend

pnpm dev
```

### Start Backend

```bash
cd apps/backend

pnpm dev
```

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:4000
```

---

## Docker Setup

### Build and Start

```bash
docker compose up --build
```

### Stop Containers

```bash
docker compose down
```

### Reset Database and Rebuild

```bash
docker compose down -v
docker compose up --build
```

### Services

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:4000
```

PostgreSQL:

```text
localhost:5433
```

---

## Environment Variables

### Frontend

```env
VITE_API_URL=http://localhost:4000/api
```

### Backend

```env
DATABASE_URL=postgresql://username:password@localhost:5432/salarydb
PORT=4000
```

---

## Deployment

### Frontend

Hosted on Vercel.

Required environment variable:

```env
VITE_API_URL=https://salary-manager-api.onrender.com/api
```

### Backend

Hosted on Render.

Required environment variable:

```env
DATABASE_URL=<production_postgres_url>
```

---

## Seed Data

The application includes a deterministic seed generator that creates:

* 10,000 employees
* Multiple departments
* Multiple job titles
* Country-specific records
* Salary distributions based on job role

This allows analytics dashboards to operate on realistic datasets.

---

## API Endpoints

### Employees

```http
GET /api/employees
POST /api/employees
PATCH /api/employees/:id
DELETE /api/employees/:id
```

### Analytics

```http
GET /api/analytics/country/:country

GET /api/analytics/job-title?country=India&jobTitle=Engineering%20Manager
```

### Health Check

```http
GET /health
```

---

## Future Improvements

* Authentication and authorization
* Role-based access control
* Advanced filtering
* Export to CSV/Excel
* Charts and visual analytics
* Audit logging
* Employee performance tracking
* Salary trend forecasting
* CI/CD pipelines
* Kubernetes deployment

---

## Author

Mohammad Yamaan Ansari

Full Stack Developer

Built using React, TypeScript, Node.js, Prisma, PostgreSQL, Docker, Vercel, and Render.
