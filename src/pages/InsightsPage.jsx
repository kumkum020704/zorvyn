import React from 'react';
import InsightsPanel from '../components/insights/InsightsPanel';

export default function InsightsPage() {
  return (
    <div className="page-content">
      <div style={{ marginBottom: 24 }}>
        <div className="section-title" style={{ fontSize: '1rem' }}>Spending Insights</div>
        <div className="section-subtitle">Data-driven observations about your financial patterns</div>
      </div>
      <InsightsPanel />
    </div>
  );
}
