# StayLive Implementation Details

This document summarizes how StayLive is implemented across backend, frontend, and DevOps.

## 1) Architecture Overview

StayLive is a full-stack uptime monitoring platform with a Node.js API, a React dashboard, and a MongoDB datastore. It includes a scheduled pinger, log storage, analytics, and alerting.

- Backend: Express + Mongoose + node-cron
- Frontend: Vite + React + Tailwind + Recharts
- Infra: Docker + GitHub Actions

## 2) Backend Implementation

### Core API

- Services API: create, list, delete monitored endpoints.
- Logs API: return recent pings with status, response time, and timestamps.
- Analytics API: compute uptime percentage and return time-series metrics per service.

### Data Models

Service
- name (String)
- url (String)
- interval (Number, minutes)
- status (UP/DOWN)
- lastPing (Date)
- responseTime (Number)

Log
- serviceId (ObjectId -> Service)
- status (UP/DOWN)
- responseTime (Number)
- timestamp (Date)

### Pinger Engine

- Runs every minute via node-cron.
- Filters services that are due based on `interval` and `lastPing`.
- Performs HTTP GET with a 5s timeout.
- Retries up to 2 times when a ping fails or returns DOWN.
- Uses a per-service lock to avoid concurrent duplicate pings.
- Writes log entries for every ping.
- Updates status, lastPing, and responseTime on the Service record.

### Alerting

- Uses Nodemailer.
- Sends alerts only on status change (DOWN or recovery to UP).
- Email transport is enabled via env vars.

## 3) Frontend Implementation

### Navigation and Layout

- Sidebar navigation for Dashboard, Add Service, Logs.
- Top header with status messaging.
- Responsive layout and mobile sidebar.

### Pages

Dashboard
- Summary cards for total, UP, and DOWN services.
- Services table with status badges and delete actions.
- Response time mini chart.
- Analytics selector with uptime percentage and trend chart.

Add Service
- Form with name, URL, and interval dropdown.
- Validation with toast feedback.

Logs
- Table of pings with status filter.
- Empty and error states.

### UI System

- Reusable UI primitives: Button, Card, Table, Input, Select, Badge, Skeleton.
- Consistent typography, soft shadows, and rounded corners.
- Toast system for success/error feedback.

## 4) DevOps and Tooling

### Docker

- Backend Dockerfile for production builds.
- Docker Compose for local backend + MongoDB.

### CI/CD

- GitHub Actions workflow with install + test/build steps for both backend and frontend.

## 5) Environment Configuration

Backend
- MONGODB_URI
- EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM (optional)

Frontend
- VITE_API_BASE_URL

## 6) Key Endpoints

- GET /api/services
- POST /api/services
- DELETE /api/services/:id
- GET /api/logs
- GET /api/analytics/:serviceId

## 7) Notes

- Authentication has been removed as requested.
- The system is ready for future multi-tenant auth restoration if needed.
- Frontend is optimized for readability and clean state handling.
