import React from 'react';
import { getCategoryById } from '../../data/mockData';
import { Pencil, Trash2 } from 'lucide-react';

export default function TransactionRow({ transaction: t, isAdmin, onEdit, onDelete }) {
  const cat = getCategoryById(t.category);

  return (
    <tr>
      <td>
        <div className="tx-date">
          {new Date(t.date + 'T00:00:00').toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
          })}
        </div>
      </td>
      <td>
        <div className="tx-description">{t.description}</div>
      </td>
      <td>
        <span className="badge badge-cat">
          {cat?.icon} {cat?.label || t.category}
        </span>
      </td>
      <td>
        <span className={`badge ${t.type === 'income' ? 'badge-income' : 'badge-expense'}`}>
          {t.type === 'income' ? '↑ Income' : '↓ Expense'}
        </span>
      </td>
      <td>
        <span className={`tx-amount ${t.type}`}>
          {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </td>
      {isAdmin && (
        <td>
          <div className="tx-actions">
            <button
              className="action-btn edit"
              title="Edit"
              onClick={() => onEdit(t)}
            >
              <Pencil size={13} />
            </button>
            <button
              className="action-btn danger"
              title="Delete"
              onClick={() => onDelete(t.id)}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}
