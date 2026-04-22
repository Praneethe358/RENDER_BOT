# PulseKeep

PulseKeep is a decentralized uptime monitoring and keep-alive platform built for teams that want reliable visibility into service health. It provides secure multi-tenant monitoring, scheduled pinging, analytics, and alerting with a clean SaaS-grade dashboard.

## Features

- JWT-based authentication (register/login)
- Multi-user service isolation
- Scheduled ping engine with retry logic
- Uptime logs and analytics
- Email alerts on downtime and recovery
- Responsive React dashboard with analytics charts
- Docker support and CI workflow

## Screenshots

> Add screenshots of the dashboard, analytics, and auth pages here.

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React (Vite), Tailwind CSS, Recharts
- Infra: Docker, GitHub Actions

## Project Structure

```
backend/   # API server, pinger engine, alerts
frontend/  # React dashboard
```

## Getting Started (Local)

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Required env values:

- `MONGODB_URI`
- `JWT_SECRET`
- Email settings if you want alerts

### 2) Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Set `VITE_API_BASE_URL` to your backend URL.

## Docker Setup

```bash
docker compose up --build
```

The API runs on `http://localhost:5000` and MongoDB runs on `mongodb://localhost:27017/pulsekeep`.

## API Reference

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Services

- `GET /api/services`
- `POST /api/services`
- `DELETE /api/services/:id`

### Logs

- `GET /api/logs`

### Analytics

- `GET /api/analytics/:serviceId`

All non-auth endpoints require `Authorization: Bearer <token>`.

## Analytics

The analytics endpoint returns uptime percentage, total checks, and a time series of response times. The frontend uses this data to render uptime trends.

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/awesome`)
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License. See [LICENSE](LICENSE).
