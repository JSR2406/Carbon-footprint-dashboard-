# DY Patil Carbon Dashboard

Real-time carbon monitoring system for DY Patil College of Engineering, Akurdi.

## 🚀 Features
- **Live Monitoring**: Real-time energy and carbon footprint tracking via MQTT and WebSockets.
- **Interactive Map**: Geospatial visualization of campus buildings and their current emissions.
- **AI-Powered Insights**: Automated detection of high energy consumption patterns.
- **Microservices Architecture**: Dockerized components including EMQX (MQTT), TimescaleDB, and FastAPI.

## 🚀 Deployment & Infrastructure
- **Frontend**: [Vercel Deployment](https://dy-patil-carbon-dashboard-rho.vercel.app)
- **Database**: Supabase Protected Postgres
- **Backend**: FastAPI (Ready for Railway/Vercel)

## 🛠️ Supabase Configuration
The backend is now connected to Supabase. To run locally, ensure your `.env` has:
```env
DATABASE_URL=postgresql://postgres:password@db.anubbaummlhpgmemwxzv.supabase.co:5432/postgres?sslmode=require
```

## 🏗️ Architecture
- **Sensors/Simulator**: Publishes data to EMQX broker on `campus/sensors/+/data`.
- **Backend**: Listens to MQTT, persists to TimescaleDB, and broadcasts to Frontend via WebSockets.
- **Frontend**: Subscribes to WebSockets for live updates and fetches historical data from the API.
