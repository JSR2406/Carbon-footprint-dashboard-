import React, { useState, useEffect } from 'react';
import { fetchStats } from '../api';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    PieChart, Pie, Cell
} from 'recharts';
import { Zap, Leaf, Activity, AlertTriangle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const data = [
    { name: '08:00', co2: 120, power: 45 },
    { name: '10:00', co2: 210, power: 82 },
    { name: '12:00', co2: 340, power: 125 },
    { name: '14:00', co2: 290, power: 110 },
    { name: '16:00', co2: 250, power: 95 },
    { name: '18:00', co2: 180, power: 70 },
    { name: '20:00', co2: 110, power: 40 },
];

const deptEmissions = [
    { name: 'Computer Sc.', value: 45, color: '#10b981' },
    { name: 'Mechanical', value: 30, color: '#3b82f6' },
    { name: 'Civil', value: 15, color: '#f59e0b' },
    { name: 'Admin', value: 10, color: '#ec4899' },
];

const StatCard = ({ title, value, unit, icon: Icon, trend, colorClass }) => (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div className={`p-2 rounded-lg`} style={{ color: `var(--${colorClass})`, background: `rgba(255,255,255,0.03)` }}>
                <Icon size={24} />
            </div>
            {trend && (
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: trend.startsWith('+') ? '#ef4444' : '#10b981' }}>
                    {trend}
                </span>
            )}
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{title}</div>
        <div style={{ fontSize: '2rem', fontWeight: 700 }}>
            {value}<span style={{ fontSize: '1rem', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>{unit}</span>
        </div>
    </div>
);

const Dashboard = ({ showMap }) => {
    const [livePower, setLivePower] = useState(124.5);
    const [activeSensors, setActiveSensors] = useState(127);
    const [stats, setStats] = useState({ co2: 842, anomalies: 3 });

    useEffect(() => {
        const loadInitialStats = async () => {
            try {
                const data = await fetchStats();
                setStats({ co2: data.total_co2e_today, anomalies: data.anomalies });
                setActiveSensors(data.active_devices);
            } catch (err) {
                console.error('Failed to load stats', err);
            }
        };
        loadInitialStats();
    }, []);

    useEffect(() => {
        const wsBase = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8000';
        const ws = new WebSocket(`${wsBase}/ws/campus`);
        ws.onmessage = (event) => {
            const payload = JSON.parse(event.data);
            if (payload.power_kw) setLivePower(payload.power_kw);
        };
        return () => ws.close();
    }, []);

    if (showMap) {
        return (
            <div className="glass-card" style={{ height: '75vh', overflow: 'hidden' }}>
                <MapContainer center={[18.6544, 73.7731]} zoom={17} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; CARTO'
                    />
                    <Marker position={[18.6544, 73.7731]}>
                        <Popup>
                            <div style={{ padding: '4px' }}>
                                <b style={{ color: '#10b981' }}>Computer Engineering Lab</b><br />
                                Load: 12.4 kW<br />
                                CO2: 8.5 kg/hr
                            </div>
                        </Popup>
                    </Marker>
                    <Circle center={[18.6544, 73.7731]} radius={60} pathOptions={{ color: '#10b981', fillOpacity: 0.1 }} />
                </MapContainer>
            </div>
        );
    }

    return (
        <>
            <div className="stat-grid" style={{ marginBottom: '2rem' }}>
                <StatCard title="Real-time Load" value={livePower.toFixed(1)} unit="kW" icon={Zap} trend="-4.2%" colorClass="accent-secondary" />
                <StatCard title="Estimated CO2" value={stats.co2.toFixed(0)} unit="kg" icon={Leaf} trend="+2.1%" colorClass="accent-primary" />
                <StatCard title="Fleet Status" value={activeSensors} unit="Active" icon={Activity} colorClass="accent-warm" />
                <StatCard title="Anomalies 24h" value={stats.anomalies} unit="Events" icon={AlertTriangle} colorClass="accent-warm" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem', height: '450px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Energy Intelligence</h3>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Live Stream</div>
                    </div>
                    <ResponsiveContainer width="100%" height="80%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                            <YAxis stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ background: '#171b22', border: '1px solid var(--border-color)', borderRadius: '12px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="power" stroke="#10b981" fillOpacity={1} fill="url(#colorPower)" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem', height: '450px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '2rem' }}>Dept Distribution</h3>
                    <ResponsiveContainer width="100%" height="60%">
                        <PieChart>
                            <Pie
                                data={deptEmissions}
                                innerRadius={70}
                                outerRadius={95}
                                paddingAngle={8}
                                dataKey="value"
                            >
                                {deptEmissions.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '1.5rem' }}>
                        {deptEmissions.map(d => (
                            <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: d.color }}></div>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{d.name}</span>
                                </div>
                                <span style={{ fontWeight: 600 }}>{d.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
