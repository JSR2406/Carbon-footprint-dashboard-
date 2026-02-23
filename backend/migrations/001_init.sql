-- Enable TimescaleDB extension if available (not in Supabase usually, but for local)
-- CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

CREATE TABLE IF NOT EXISTS sensor_readings (
    id BIGSERIAL PRIMARY KEY,
    device_id TEXT NOT NULL,
    power_kw FLOAT NOT NULL,
    energy_kwh FLOAT NOT NULL,
    voltage_v FLOAT NOT NULL,
    current_a FLOAT NOT NULL,
    building TEXT NOT NULL,
    room TEXT NOT NULL,
    lat FLOAT NOT NULL,
    lng FLOAT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for device lookups
CREATE INDEX IF NOT EXISTS idx_device_id ON sensor_readings(device_id);
-- Index for time-series queries
CREATE INDEX IF NOT EXISTS idx_timestamp ON sensor_readings(timestamp DESC);

-- View for hourly carbon metrics
CREATE OR REPLACE VIEW hourly_carbon_metrics AS
SELECT 
    device_id,
    date_trunc('hour', timestamp) as hour,
    avg(power_kw) * 0.85 as co2e_kg_hour, -- EF = 0.85
    sum(energy_kwh) as total_energy
FROM sensor_readings
GROUP BY device_id, hour;
