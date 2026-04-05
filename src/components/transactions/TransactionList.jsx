import React from 'react';
import { useApp } from '../../context/AppContext';
import TransactionRow from './TransactionRow';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const COLUMNS = [
  { key: 'date',        label: 'Date',        sortable: true },
  { key: 'description', label: 'Description', sortable: true },
  { key: 'category',    label: 'Category',    sortable: true },
  { key: 'type',        label: 'Type',        sortable: false },
  { key: 'amount',      label: 'Amount',      sortable: true },
];

function SortIcon({ colKey, sortBy, sortDir }) {
  if (sortBy !== colKey) return <ArrowUpDown size={12} style={{ opacity: 0.4, marginLeft: 4 }} />;
  return sortDir === 'asc'
    ? <ArrowUp size={12} style={{ marginLeft: 4, color: 'var(--primary-light)' }} />
    : <ArrowDown size={12} style={{ marginLeft: 4, color: 'var(--primary-light)' }} />;
}

export default function TransactionList({ transactions }) {
  const { state, dispatch } = useApp();
  const { filters, role } = state;
  const isAdmin = role === 'admin';

  const handleSort = (key) => {
    if (!COLUMNS.find((c) => c.key === key)?.sortable) return;
    const newDir = filters.sortBy === key && filters.sortDir === 'desc' ? 'asc' : 'desc';
    dispatch({ type: 'SET_FILTER', payload: { sortBy: key, sortDir: newDir } });
  };

  const handleEdit = (t) =>
    dispatch({ type: 'OPEN_MODAL', payload: { modal: 'edit', transaction: t } });

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }
  };

  if (!transactions.length) {
    return (
      <div className="tx-table-wrapper">
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <div className="empty-state-title">No transactions found</div>
          <div className="empty-state-sub">Try adjusting your filters or add a new transaction.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="tx-table-wrapper">
      <div style={{ overflowX: 'auto' }}>
        <table className="tx-table" id="transactions-table">
          <thead>
            <tr>
              {COLUMNS.map(({ key, label, sortable }) => (
                <th
                  key={key}
                  className={filters.sortBy === key ? 'sorted' : ''}
                  onClick={() => sortable && handleSort(key)}
                  style={{ cursor: sortable ? 'pointer' : 'default' }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    {label}
                    {sortable && <SortIcon colKey={key} sortBy={filters.sortBy} sortDir={filters.sortDir} />}
                  </span>
                </th>
              ))}
              {isAdmin && <th style={{ cursor: 'default' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <TransactionRow
                key={t.id}
                transaction={t}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <span>Showing {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}</span>
        <span>
          Total: {' '}
          <strong style={{ color: 'var(--text-primary)' }}>
            {(() => {
              const net = transactions.reduce((s, t) => s + (t.type === 'income' ? t.amount : -t.amount), 0);
              return (net >= 0 ? '+$' : '-$') + Math.abs(net).toLocaleString('en-US', { minimumFractionDigits: 2 });
            })()}
          </strong>
        </span>
      </div>
    </div>
  );
}
