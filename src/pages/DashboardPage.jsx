import React from 'react';
import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart';
import SpendingBreakdownChart from '../components/dashboard/SpendingBreakdownChart';
import { useApp } from '../context/AppContext';
import { getCategoryById } from '../data/mockData';
import { ArrowRight } from 'lucide-react';

function RecentTransactions({ onNavigate }) {
  const { state } = useApp();
  const recent = [...state.transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  return (
    <div className="card" style={{ marginTop: 20 }}>
      <div className="section-header">
        <div>
          <div className="section-title">Recent Transactions</div>
          <div className="section-subtitle">Latest 6 activity items</div>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          id="btn-view-all-transactions"
          onClick={() => onNavigate('transactions')}
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          View All <ArrowRight size={13} />
        </button>
      </div>
      <div className="recent-list">
        {recent.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">💸</div>
            <div className="empty-state-title">No transactions yet</div>
            <div className="empty-state-sub">Add your first transaction to get started.</div>
          </div>
        ) : (
          recent.map((t) => {
            const cat = getCategoryById(t.category);
            return (
              <div key={t.id} className="recent-item">
                <div className="recent-icon">{cat?.icon || '📦'}</div>
                <div className="recent-info">
                  <div className="recent-desc">{t.description}</div>
                  <div className="recent-meta">
                    {cat?.label} · {new Date(t.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <div className={`recent-amount ${t.type}`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default function DashboardPage({ onNavigate }) {
  return (
    <div className="page-content">
      <SummaryCards />

      <div className="charts-grid">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>

      <RecentTransactions onNavigate={onNavigate} />
    </div>
  );
}
