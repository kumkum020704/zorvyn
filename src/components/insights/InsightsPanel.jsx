import React from 'react';
import { useApp } from '../../context/AppContext';
import { computeInsights, computeMonthlyTrend } from '../../data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell,
} from 'recharts';

function fmt(n) {
  return '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 16px',
      fontSize: '0.8rem',
      boxShadow: 'var(--shadow-lg)',
    }}>
      <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ color: p.color, display: 'flex', gap: 12, justifyContent: 'space-between' }}>
          <span>{p.name}</span>
          <strong>${p.value.toLocaleString()}</strong>
        </div>
      ))}
    </div>
  );
};

export default function InsightsPanel() {
  const { state } = useApp();
  const insights = computeInsights(state.transactions);
  const { highestCategory, expenseChange, prevMonth, currMonth, budgetUtilization, monthlyTrend } = insights;

  const changeNum = parseFloat(expenseChange);
  const changeDir = isNaN(changeNum) ? 'neutral' : changeNum > 0 ? 'up' : 'down';

  return (
    <div>
      {/* Top row: Highest category + MoM comparison */}
      <div className="insights-grid" style={{ marginBottom: 20 }}>
        {/* Highest spending category */}
        <div className="insight-card">
          <div className="insight-card-title">🏆 Highest Spending Category</div>
          {highestCategory ? (
            <div className="insight-category-highlight">
              <div className="cat-icon-large">{highestCategory.icon}</div>
              <div>
                <div className="cat-highlight-name">{highestCategory.name}</div>
                <div className="cat-highlight-amount">
                  ${highestCategory.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  All-time total
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state" style={{ padding: 20 }}>No data</div>
          )}
        </div>

        {/* Month-over-month */}
        <div className="insight-card">
          <div className="insight-card-title">📅 Month-over-Month Comparison</div>
          {prevMonth && currMonth ? (
            <>
              <div className="compare-row">
                <span className="compare-label">Previous ({prevMonth.month}) Income</span>
                <span className="compare-value" style={{ color: 'var(--income)' }}>{fmt(prevMonth.income)}</span>
              </div>
              <div className="compare-row">
                <span className="compare-label">Current ({currMonth.month}) Income</span>
                <span className="compare-value" style={{ color: 'var(--income)' }}>{fmt(currMonth.income)}</span>
              </div>
              <div className="compare-row">
                <span className="compare-label">Previous ({prevMonth.month}) Expenses</span>
                <span className="compare-value" style={{ color: 'var(--expense)' }}>{fmt(prevMonth.expenses)}</span>
              </div>
              <div className="compare-row">
                <span className="compare-label">Current ({currMonth.month}) Expenses</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="compare-value" style={{ color: 'var(--expense)' }}>{fmt(currMonth.expenses)}</span>
                  {expenseChange !== null && (
                    <span className={`change-chip ${changeDir}`}>
                      {changeDir === 'up' ? '↑' : '↓'} {Math.abs(changeNum)}%
                    </span>
                  )}
                </div>
              </div>
              <div className="compare-row">
                <span className="compare-label">Net Savings ({currMonth.month})</span>
                <span className="compare-value" style={{ color: currMonth.balance >= 0 ? 'var(--income)' : 'var(--expense)' }}>
                  {currMonth.balance >= 0 ? '+' : ''}{fmt(currMonth.balance)}
                </span>
              </div>
            </>
          ) : (
            <div className="empty-state" style={{ padding: 20 }}>Not enough data</div>
          )}
        </div>
      </div>

      {/* Monthly bar chart */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="chart-title">Monthly Income vs Expenses</div>
        <div className="chart-subtitle" style={{ marginBottom: 20 }}>Comparing your earnings and spending each month</div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthlyTrend} barGap={4} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '0.75rem' }} formatter={(v) => <span style={{ color: 'var(--text-secondary)' }}>{v}</span>} />
            <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={32} />
            <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Budget utilization */}
      <div className="card">
        <div className="chart-title" style={{ marginBottom: 4 }}>Budget Utilization</div>
        <div className="chart-subtitle" style={{ marginBottom: 20 }}>All-time spending vs estimated budgets per category</div>
        <div className="budget-list">
          {budgetUtilization.length === 0 ? (
            <div className="empty-state">No expense data available</div>
          ) : (
            budgetUtilization.map((cat) => {
              const pct = parseFloat(cat.utilization);
              const color =
                pct >= 100 ? 'var(--expense)' :
                pct >= 75  ? 'var(--warning)' :
                              cat.color;
              return (
                <div key={cat.id} className="budget-item">
                  <div className="budget-item-header">
                    <div className="budget-item-name">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </div>
                    <div className="budget-item-values">
                      <span className="budget-item-spent">${cat.value.toLocaleString()}</span>
                      <span>/ ${cat.budget.toLocaleString()}</span>
                      <span style={{ color, fontWeight: 600 }}>{pct}%</span>
                    </div>
                  </div>
                  <div className="budget-track">
                    <div
                      className="budget-fill"
                      style={{
                        width: `${Math.min(100, pct)}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
