import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Activity, Zap, Thermometer, Clock, ArrowLeft, ShieldCheck, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const DeviceMonitor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [device, setDevice] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Simulated fetch
        setTimeout(() => {
            setDevice({
                id: id || 'fan_102',
                name: `Air Circulator ${id || '102'}`,
                type: 'Industrial Fan',
                location: 'Engineering Lab B, Floor 2',
                status: 'Active',
                efficiency: '92%',
                uptime: '142h 15m',
                current_metrics: {
                    power: 0.042,
                    voltage: 231.5,
                    current: 0.18,
                    temp: 34.2
                }
            });

            const mockHistory = Array.from({ length: 24 }, (_, i) => ({
                time: `${i}:00`,
                power: 0.035 + Math.random() * 0.01,
                temp: 32 + Math.random() * 5
            }));
            setHistory(mockHistory);
            setLoading(false);
        }, 8000);
    }, [id]);

    if (loading) {
        return (
            <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <div className="pulse-emerald" style={{ width: '64px', height: '64px', borderRadius: '50%', border: '4px solid var(--accent-primary)' }}></div>
                <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Initializing Real-time Telemetry...</p>
            </div>
        );
    }

    return (
        <div className='device-monitor'>
            <button
                onClick={() => navigate(-1)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '0.875rem' }}
            >
                <ArrowLeft size={16} /> Back to Fleet
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>{device.name}</h2>
                        <span style={{ padding: '4px 12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-primary)', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600 }}>{device.status}</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)' }}>{device.location} • ID: {device.id}</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="glass-card" style={{ padding: '10px 20px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Health Score</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-primary)' }}>98/100</div>
                    </div>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <Zap size={20} style={{ color: 'var(--accent-warm)', marginBottom: '1rem' }} />
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Real-time Load</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{device.current_metrics.power} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>kW</span></div>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <Activity size={20} style={{ color: 'var(--accent-secondary)', marginBottom: '1rem' }} />
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Amperage</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{device.current_metrics.current} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>A</span></div>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <Thermometer size={20} style={{ color: '#f87171', marginBottom: '1rem' }} />
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Core Temp</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{device.current_metrics.temp}°<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>C</span></div>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <Clock size={20} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Cycle Uptime</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{device.uptime}</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div className='glass-card' style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Load Profile (24h)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={history}>
                            <defs>
                                <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--accent-warm)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="var(--accent-warm)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                            <YAxis stroke="#64748b" fontSize={10} />
                            <Tooltip />
                            <Area type="monotone" dataKey="power" stroke="var(--accent-warm)" fillOpacity={1} fill="url(#colorPower)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className='glass-card' style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Thermal Stability</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={history}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                            <YAxis stroke="#64748b" fontSize={10} />
                            <Tooltip />
                            <Line type="monotone" dataKey="temp" stroke="#f87171" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className='glass-card' style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Maintenance Logs</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <ShieldCheck style={{ color: 'var(--accent-primary)' }} />
                            <div>
                                <div style={{ fontWeight: 600 }}>Standard Calibration</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Automated System Verification</div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '0.875rem' }}>
                            <div>24 Feb 2026</div>
                            <div style={{ color: 'var(--accent-primary)' }}>SUCCESS</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <AlertTriangle style={{ color: 'var(--accent-warm)' }} />
                            <div>
                                <div style={{ fontWeight: 600 }}>Voltage Fluctuation Detected</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Anomaly in Phase 1 Supply</div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '0.875rem' }}>
                            <div>22 Feb 2026</div>
                            <div style={{ color: 'var(--accent-warm)' }}>RESOLVED</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeviceMonitor;
