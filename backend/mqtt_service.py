import asyncio
import json
import os
from paho.mqtt import client as mqtt_client
from backend.database import SessionLocal
from backend.models import SensorReading

broker = os.getenv("MQTT_BROKER", "localhost")
port = 1883
topic = "campus/sensors/+/data"

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
            client.subscribe(topic)
        else:
            print(f"Failed to connect, return code {rc}")

    def on_message(client, userdata, msg):
        try:
            payload = json.loads(msg.payload.decode())
            reading = SensorReading(**payload)
            db = SessionLocal()
            try:
                # In a real app, we'd have a SQLAlchemy model for this.
                # Since we have SensorReading (Pydantic), we'll use a raw insert or define a table.
                # Assuming the tables were created by the migration/test script.
                from sqlalchemy import text
                db.execute(
                    text("INSERT INTO sensor_readings (device_id, power_kw, building, timestamp) VALUES (:d, :p, :b, :t)"),
                    {"d": reading.device_id, "p": reading.power_kw, "b": reading.building, "t": reading.timestamp}
                )
                db.commit()
                print(f"📡 Persisted {reading.device_id} to Supabase")
            finally:
                db.close()
        except Exception as e:
            print(f"Error processing message: {e}")

    client = mqtt_client.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(broker, port)
    return client

if __name__ == '__main__':
    client = connect_mqtt()
    client.loop_forever()
