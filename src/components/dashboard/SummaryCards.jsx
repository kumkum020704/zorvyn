import React from 'react';
import { useApp } from '../../context/AppContext';
import { computeSummary } from '../../data/mockData';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

function fmt(n, prefix = '$') {
  return prefix + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const cards = [
  {
    key: 'balance',
    label: 'Total Balance',
    icon: Wallet,
    iconClass: 'balance',
    valueClass: 'balance',
    value: (s) => fmt(s.totalBalance),
    sub: 'All-time net balance',
  },
  {
    key: 'income',
    label: 'This Month Income',
    icon: TrendingUp,
    iconClass: 'income',
    valueClass: 'income',
    value: (s) => fmt(s.monthlyIncome),
    sub: 'Total income this month',
  },
  {
    key: 'expenses',
    label: 'This Month Expenses',
    icon: TrendingDown,
    iconClass: 'expense',
    valueClass: 'expense',
    value: (s) => fmt(s.monthlyExpenses),
    sub: 'Total expenses this month',
  },
  {
    key: 'savings',
    label: 'Savings Rate',
    icon: PiggyBank,
    iconClass: 'savings',
    valueClass: 'savings',
    value: (s) => `${s.savingsRate}%`,
    sub: 'Of income saved this month',
  },
];

export default function SummaryCards() {
  const { state } = useApp();
  const summary = computeSummary(state.transactions);

  return (
    <div className="summary-grid">
      {cards.map(({ key, label, icon: Icon, iconClass, valueClass, value, sub }) => (
        <div key={key} id={`summary-card-${key}`} className={`summary-card ${iconClass}`}>
          <div className="summary-card-header">
            <div>
              <div className="summary-card-label">{label}</div>
            </div>
            <div className={`summary-card-icon ${iconClass}`}>
              <Icon size={18} />
            </div>
          </div>
          <div className={`summary-card-value ${valueClass}`}>{value(summary)}</div>
          <div className="summary-card-sub">{sub}</div>
        </div>
      ))}
    </div>
  );
}
