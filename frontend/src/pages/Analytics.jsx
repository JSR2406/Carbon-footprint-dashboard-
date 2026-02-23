import React, { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Download, Filter, Building2, TrendingUp, Calendar, ArrowDown, ArrowUp } from 'lucide-react';

const Analytics = () => {
    const [view, setView] = useState('daily');

    const buildingData = [
        { name: 'Block A', energy: 156.2, co2e: 132.8, devices: 80 },
        { name: 'Block B', energy: 89.4, co2e: 76.0, devices: 87 },
        { name: 'Block C', energy: 67.8, co2e: 57.6, devices: 38 },
        { name: 'Library', energy: 23.1, co2e: 19.6, devices: 17 }
    ];

    const timelineData = [
        { date: 'Mon', energy: 45, co2e: 38 },
        { date: 'Tue', energy: 52, co2e: 44 },
        { date: 'Wed', energy: 48, co2e: 41 },
        { date: 'Thu', energy: 61, co2e: 52 },
        { date: 'Fri', energy: 55, co2e: 47 },
        { date: 'Sat', energy: 32, co2e: 28 },
        { date: 'Sun', energy: 28, co2e: 24 },
    ];

    const efficiencyData = [
        { name: 'Air Conditioning', value: 72 },
        { name: 'Lighting', value: 91 },
        { name: 'Workstations', value: 82 },
        { name: 'Lab Equipment', value: 68 }
    ];

    const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899'];

    return (
        <div className='analytics-page'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.25rem' }}>Analytics Engine</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Deep dive into campus-wide carbon performance</p>
                </div>
                <button className="glass-card" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-secondary)', border: 'none', color: 'white', fontWeight: 600 }}>
                    <Download size={18} />
                    Export Intelligence Report
                </button>
            </div>

            {/* Insight Grid */}
            <div className="stat-grid" style={{ marginBottom: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Energy Optimization</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-primary)' }}>+14.2% <ArrowUp size={20} style={{ display: 'inline' }} /></div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Compared to previous month</p>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Carbon Intensity</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f87171' }}>0.48 <span style={{ fontSize: '0.875rem' }}>kg/kWh</span></div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Target: 0.40 kg/kWh</p>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Renewal Energy Mix</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-warm)' }}>22.5%</div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Solar + Grid Balance</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem' }}>
                <div className='glass-card' style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Building Energy Benchmark</h3>
                    <ResponsiveContainer width='100%' height={300}>
                        <BarChart data={buildingData}>
                            <CartesianGrid strokeDasharray='3 3' vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey='name' stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <Tooltip overlayStyle={{ borderRadius: '12px' }} />
                            <Legend />
                            <Bar dataKey='energy' fill='var(--accent-secondary)' radius={[4, 4, 0, 0]} name='Energy (kWh)' />
                            <Bar dataKey='co2e' fill='var(--accent-primary)' radius={[4, 4, 0, 0]} name='CO₂e (kg)' />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className='glass-card' style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Emission Timeline (7-Day Analysis)</h3>
                    <ResponsiveContainer width='100%' height={300}>
                        <LineChart data={timelineData}>
                            <CartesianGrid strokeDasharray='3 3' vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey='date' stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <Tooltip />
                            <Legend />
                            <Line type='monotone' dataKey='energy' stroke='var(--accent-secondary)' strokeWidth={3} dot={{ r: 4 }} name='Energy' />
                            <Line type='monotone' dataKey='co2e' stroke='var(--accent-primary)' strokeWidth={3} dot={{ r: 4 }} name='Carbon' />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className='glass-card' style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Resource Efficiency Breakdown</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                        <ResponsiveContainer width='100%' height={250}>
                            <PieChart>
                                <Pie
                                    data={efficiencyData}
                                    cx='50%'
                                    cy='50%'
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey='value'
                                >
                                    {efficiencyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {efficiencyData.map((d, i) => (
                                <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: COLORS[i] }}></div>
                                        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{d.name}</span>
                                    </div>
                                    <span style={{ fontWeight: 600 }}>{d.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='glass-card' style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Weekly Area Distribution</h3>
                    <ResponsiveContainer width='100%' height={250}>
                        <AreaChart data={timelineData}>
                            <defs>
                                <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                            <Tooltip />
                            <Area type="monotone" dataKey="energy" stroke="#3b82f6" fillOpacity={1} fill="url(#colorArea)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
