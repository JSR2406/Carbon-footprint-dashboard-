import asyncio
from datetime import datetime
import json
import uuid

class AlertSystem:
    def __init__(self):
        self.alert_rules = {
            'HIGH_POWER': {'threshold': 2.0, 'devices': ['ac_*'], 'message': 'High power consumption detected'},
            'DEVICE_OFFLINE': {'threshold': 300, 'timeout_seconds': 300, 'message': 'Device offline'},
            'BUILDING_OVERLOAD': {'threshold': 50, 'building_limit': True, 'message': 'Building energy overload'}
        }
        self.active_alerts = []
    
    async def check_power_alert(self, device_id: str, power_kw: float):
        '''Check if device power exceeds threshold'''
        if power_kw > self.alert_rules['HIGH_POWER']['threshold']:
            alert = {
                'id': str(uuid.uuid4()),
                'type': 'HIGH_POWER',
                'device_id': device_id,
                'value': power_kw,
                'threshold': self.alert_rules['HIGH_POWER']['threshold'],
                'message': f'Device {device_id} consuming {power_kw}kW - exceeds limit',
                'timestamp': datetime.utcnow().isoformat(),
                'severity': 'HIGH' if power_kw > 3.5 else 'MEDIUM'
            }
            self.active_alerts.append(alert)
            await self.broadcast_alert(alert)
            return alert
        return None
    
    async def check_device_offline(self, device_id: str, last_seen: datetime):
        '''Check if device hasn't reported in timeout period'''
        timeout = self.alert_rules['DEVICE_OFFLINE']['timeout_seconds']
        if (datetime.utcnow() - last_seen).seconds > timeout:
            alert = {
                'id': str(uuid.uuid4()),
                'type': 'DEVICE_OFFLINE',
                'device_id': device_id,
                'message': f'Device {device_id} offline for {(datetime.utcnow() - last_seen).seconds} seconds',
                'timestamp': datetime.utcnow().isoformat(),
                'severity': 'HIGH'
            }
            self.active_alerts.append(alert)
            await self.broadcast_alert(alert)
            return alert
        return None
    
    async def broadcast_alert(self, alert: dict):
        '''Log alert for now. In real app, this sends to WebSocket/Email/SMS'''
        print(f'🚨 ALERT: {alert["message"]}')
    
    def get_active_alerts(self):
        '''Return current active alerts'''
        return self.active_alerts
    
    def clear_alert(self, alert_id: str):
        '''Clear specific alert'''
        self.active_alerts = [a for a in self.active_alerts if a.get('id') != alert_id]

# Singleton instance
alert_system = AlertSystem()
