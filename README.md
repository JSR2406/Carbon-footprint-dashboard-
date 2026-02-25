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

## 🛠️ Setup Instructions

### Prerequisites
- **Node.js**: v18 or higher
- **Python**: 3.10 or higher
- **Docker & Docker Compose**: (Optional, for full stack orchestration)

### 1. Local Development Setup

#### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```
Copy `.env.example` to `.env` (or create one) and configure:
```env
DATABASE_URL=your_supabase_url
JWT_SECRET=your_secret
MQTT_BROKER=broker.emqx.io
```
Run the server:
```bash
uvicorn main:app --reload
```

#### Frontend
```bash
cd frontend
npm install
```
Configure `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_BASE_URL=ws://localhost:8000
```
Run the development server:
```bash
npm run dev
```

### 2. Docker Setup (Recommended)
You can spin up the entire infrastructure (MQTT Broker, TimescaleDB, Redis, and Backend) using Docker:
```bash
docker-compose up --build
```
The services will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- EMQX Dashboard: `http://localhost:18083`

### 3. Data Simulation
To see live data on the dashboard, run the sensor simulator:
```bash
python tools/sensor-simulator.py
```

## 📄 License
MIT License - DY Patil College of Engineering Lab Project.
