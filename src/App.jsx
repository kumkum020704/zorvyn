import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import InsightsPage from './pages/InsightsPage';

function AppShell() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':    return <DashboardPage onNavigate={setActivePage} />;
      case 'transactions': return <TransactionsPage />;
      case 'insights':     return <InsightsPage />;
      default:             return <DashboardPage onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <div className="sidebar-area">
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
          mobileOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        {sidebarOpen && (
          <div
            className="sidebar-backdrop show"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>

      {/* Header */}
      <Header
        activePage={activePage}
        onMobileMenuToggle={() => setSidebarOpen((v) => !v)}
      />

      {/* Main content */}
      <main className="main-area" style={{ paddingTop: 'var(--header-height)' }}>
        {renderPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
