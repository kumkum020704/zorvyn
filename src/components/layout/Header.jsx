import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Moon, Download, Menu } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';

const PAGE_META = {
  dashboard:    { title: 'Dashboard',    subtitle: 'Your financial overview at a glance' },
  transactions: { title: 'Transactions', subtitle: 'Browse, filter and manage transactions' },
  insights:     { title: 'Insights',     subtitle: 'Understand your spending patterns' },
};

export default function Header({ activePage, onMobileMenuToggle }) {
  const { state, dispatch } = useApp();
  const meta = PAGE_META[activePage] || PAGE_META.dashboard;

  const toggleTheme = () =>
    dispatch({ type: 'SET_THEME', payload: state.theme === 'dark' ? 'light' : 'dark' });

  const setRole = (role) => dispatch({ type: 'SET_ROLE', payload: role });

  const handleExport = () => {
    const header = ['Date', 'Description', 'Category', 'Type', 'Amount'].join(',');
    const rows = state.transactions.map((t) => {
      const cat = CATEGORIES.find((c) => c.id === t.category);
      return [
        t.date,
        `"${t.description}"`,
        cat?.label || t.category,
        t.type,
        t.type === 'expense' ? -t.amount : t.amount,
      ].join(',');
    });
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fintrack-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="header header-area">
      {/* Left: hamburger + title */}
      <div className="header-left">
        <button
          className="menu-toggle"
          onClick={onMobileMenuToggle}
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          <Menu size={18} />
        </button>
        <div className="header-title-wrap">
          <div className="page-title">{meta.title}</div>
          <div className="page-subtitle">{meta.subtitle}</div>
        </div>
      </div>

      {/* Right: role switcher + icon controls
          On mobile (≤768px) these are hidden via CSS — the sidebar footer handles them */}
      <div className="header-right">
        <div className="role-switcher" id="role-switcher">
          <button
            id="role-viewer"
            className={`role-btn ${state.role === 'viewer' ? 'active' : ''}`}
            onClick={() => setRole('viewer')}
          >
            👁️ Viewer
          </button>
          <button
            id="role-admin"
            className={`role-btn ${state.role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
          >
            🛡️ Admin
          </button>
        </div>

        {state.role === 'admin' && (
          <button
            id="btn-export-csv"
            className="icon-btn"
            title="Export CSV"
            onClick={handleExport}
          >
            <Download size={16} />
          </button>
        )}

        <button
          id="btn-toggle-theme"
          className="icon-btn"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {state.theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
