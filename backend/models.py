from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SensorReading(BaseModel):
    device_id: str
    power_kw: float
    energy_kwh: float
    voltage_v: float
    current_a: float
    building: str
    room: str
    lat: float
    lng: float
    timestamp: datetime

class CarbonMetric(BaseModel):
    device_id: str
    co2e_kg_hour: float
    total_co2e_kg: float
    ef: float = 0.85
