import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { computeSpendingByCategory } from '../../data/mockData';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      padding: '10px 14px',
      fontSize: '0.8rem',
      boxShadow: 'var(--shadow-lg)',
    }}>
      <div style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>{d.icon} {d.name}</div>
      <div style={{ fontWeight: 700, color: d.color }}>${d.value.toLocaleString()}</div>
    </div>
  );
};

export default function SpendingBreakdownChart() {
  const { state } = useApp();
  const data = computeSpendingByCategory(state.transactions);
  const total = data.reduce((s, d) => s + d.value, 0);
  const [activeIdx, setActiveIdx] = useState(null);

  return (
    <div className="chart-container">
      <div className="chart-title">Spending Breakdown</div>
      <div className="chart-subtitle">All-time by category</div>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            onMouseEnter={(_, i) => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.id}
                fill={entry.color}
                opacity={activeIdx === null || activeIdx === index ? 1 : 0.4}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="donut-legend">
        {data.slice(0, 5).map((entry, idx) => (
          <div
            key={entry.id}
            className="legend-row"
            onMouseEnter={() => setActiveIdx(idx)}
            onMouseLeave={() => setActiveIdx(null)}
            style={{ cursor: 'default', opacity: activeIdx === null || activeIdx === idx ? 1 : 0.5, transition: 'opacity 0.2s' }}
          >
            <div className="legend-dot-label">
              <div className="legend-dot" style={{ background: entry.color }} />
              <span>{entry.icon} {entry.name}</span>
            </div>
            <div className="legend-value">
              ${entry.value.toLocaleString()}
              <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.72rem', marginLeft: 4 }}>
                ({((entry.value / total) * 100).toFixed(0)}%)
              </span>
            </div>
          </div>
        ))}
        {data.length > 5 && (
          <div className="legend-row" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            <span>+{data.length - 5} more categories</span>
            <span>${data.slice(5).reduce((s, d) => s + d.value, 0).toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
