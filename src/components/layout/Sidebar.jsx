import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Sun, Moon } from 'lucide-react';

const navItems = [
  { id: 'dashboard',    label: 'Dashboard',     icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions',  icon: ArrowLeftRight },
  { id: 'insights',     label: 'Insights',      icon: Lightbulb },
];

export default function Sidebar({ activePage, onNavigate, mobileOpen, onClose }) {
  const { state, dispatch } = useApp();

  const setRole = (role) => dispatch({ type: 'SET_ROLE', payload: role });
  const toggleTheme = () =>
    dispatch({ type: 'SET_THEME', payload: state.theme === 'dark' ? 'light' : 'dark' });

  return (
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">💹</div>
        <span className="sidebar-logo-text">FinTrack</span>
      </div>

      <nav className="sidebar-nav">
        <span className="nav-label">Navigation</span>
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            id={`nav-${id}`}
            className={`nav-item ${activePage === id ? 'active' : ''}`}
            onClick={() => { onNavigate(id); onClose && onClose(); }}
          >
            <span className="nav-item-icon"><Icon size={16} /></span>
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        {/* Role + theme controls — only shown on mobile via CSS (desktop uses header) */}
        <div className="sidebar-mobile-controls">
          <div className="sidebar-mobile-controls-label">Switch Role</div>
          <div className="sidebar-role-switcher">
            <button
              id="sidebar-role-viewer"
              className={`sidebar-role-btn ${state.role === 'viewer' ? 'active viewer' : ''}`}
              onClick={() => setRole('viewer')}
            >
              👁️ Viewer
            </button>
            <button
              id="sidebar-role-admin"
              className={`sidebar-role-btn ${state.role === 'admin' ? 'active admin' : ''}`}
              onClick={() => setRole('admin')}
            >
              🛡️ Admin
            </button>
          </div>
          <button
            id="sidebar-theme-toggle"
            className="sidebar-theme-btn"
            onClick={toggleTheme}
            style={{ marginTop: 8 }}
          >
            {state.theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            {state.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </aside>
  );
}
