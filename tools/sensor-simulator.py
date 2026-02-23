import time
import json
import random
from paho.mqtt import client as mqtt_client
from datetime import datetime

# Connection parameters
BROKER = "localhost"
PORT = 1883

try:
    client = mqtt_client.Client()
    client.connect(BROKER, PORT)
    print(f"Connected to MQTT broker at {BROKER}")
except Exception as e:
    print(f"Failed to connect to MQTT broker: {e}")
    # Still continue to define devices so user can see what it does
    pass

devices = [
    {"id": f"lab_sensor_{i:03d}", "type": "energy_meter", "building": "Computer Science Dept", "room": f"Lab {i // 10 + 1}"}
    for i in range(50)
]

print(f"Starting simulation for {len(devices)} devices...")

while True:
    for d in devices:
        payload = {
            "device_id": d["id"],
            "power_kw": round(random.uniform(0.03, 5.0), 3),
            "energy_kwh": round(random.uniform(100, 5000), 1),
            "voltage_v": round(random.gauss(230, 2), 1),
            "current_a": round(random.uniform(0.1, 20.0), 2),
            "building": d["building"],
            "room": d["room"],
            "lat": 18.6544 + random.uniform(-0.001, 0.001),
            "lng": 73.7731 + random.uniform(-0.001, 0.001),
            "timestamp": datetime.now().isoformat()
        }
        topic = f"campus/sensors/{d['id']}/data"
        try:
            client.publish(topic, json.dumps(payload))
            # print(f"📡 Published: {d['id']} - {payload['power_kw']}kW")
        except:
            pass
    
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Published data for {len(devices)} devices.")
    time.sleep(5)
