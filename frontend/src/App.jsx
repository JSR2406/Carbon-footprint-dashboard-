import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Map as MapIcon, Database, Settings, Leaf,
  Zap, Wind, Activity, AlertTriangle, Building2, Search, BarChart3
} from 'lucide-react';

// Components & Pages
import Dashboard from './pages/Dashboard'; // We'll move old App logic here
import Analytics from './pages/Analytics';
import DeviceMonitor from './pages/DeviceMonitor';

const SidebarItem = ({ icon: Icon, label, path, active }) => (
  <Link
    to={path}
    style={{ textDecoration: 'none' }}
  >
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`}
      style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', transition: '0.3s' }}
    >
      <Icon size={20} />
      <span style={{ fontWeight: 500 }}>{label}</span>
    </div>
  </Link>
);

function App() {
  const location = useLocation();

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <nav className="nav-sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', paddingLeft: '1.5rem' }}>
          <div style={{ padding: '8px', background: 'var(--accent-primary)', borderRadius: '12px' }}>
            <Leaf size={24} color="white" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'white' }}>CARBON<span style={{ color: 'var(--accent-primary)' }}>IQ</span></span>
        </div>

        <div style={{ padding: '0 1rem' }}>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/" active={location.pathname === '/'} />
          <SidebarItem icon={BarChart3} label="Analytics" path="/analytics" active={location.pathname === '/analytics'} />
          <SidebarItem icon={Activity} label="Fleet Monitor" path="/devices" active={location.pathname.startsWith('/device')} />
          <SidebarItem icon={MapIcon} label="Campus Map" path="/map" active={location.pathname === '/map'} />
          <SidebarItem icon={AlertTriangle} label="Anomalies" path="/alerts" active={location.pathname === '/alerts'} />

          <div style={{ position: 'absolute', bottom: '2rem', width: '228px' }}>
            <SidebarItem icon={Settings} label="System Config" path="/settings" active={location.pathname === '/settings'} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="glass-card" style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search size={20} style={{ color: 'var(--text-muted)' }} />
            </button>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>CTRL + K to search</div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="glass-card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={16} className="pulse-emerald" style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>CORE ONLINE</span>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem' }}>AD</div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/devices" element={<DeviceMonitor />} />
          <Route path="/device/:id" element={<DeviceMonitor />} />
          <Route path="/map" element={<Dashboard showMap={true} />} />
          <Route path="/alerts" element={<Analytics />} /> {/* Placeholder */}
        </Routes>
      </main>

      <style>{`
        .nav-sidebar { width: 260px; height: 100vh; position: fixed; left: 0; top: 0; padding: 2rem 0; z-index: 100; background: rgba(10, 12, 16, 0.95); border-right: 1px solid var(--border-color); }
        .main-content { margin-left: 260px; padding: 2.5rem; width: calc(100% - 260px); min-height: 100vh; }
        .glass-card { background: var(--card-bg); backdrop-filter: var(--glass-effect); -webkit-backdrop-filter: var(--glass-effect); border: 1px solid var(--border-color); border-radius: 16px; transition: 0.2s; }
        .glass-card:hover { border-color: rgba(255,255,255,0.15); background: rgba(23, 27, 34, 0.85); }
        .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
      `}</style>
    </div>
  );
}

export default App;
