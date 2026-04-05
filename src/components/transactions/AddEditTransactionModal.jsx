import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { X } from 'lucide-react';

const empty = {
  date: new Date().toISOString().slice(0, 10),
  description: '',
  category: 'food',
  amount: '',
  type: 'expense',
};

export default function AddEditTransactionModal() {
  const { state, dispatch } = useApp();
  const { activeModal, editingTransaction } = state;
  const isEdit = activeModal === 'edit';

  const [form, setForm] = useState(empty);
  const [err, setErr] = useState({});

  useEffect(() => {
    if (isEdit && editingTransaction) {
      setForm({ ...editingTransaction, amount: String(editingTransaction.amount) });
    } else {
      setForm(empty);
    }
    setErr({});
  }, [isEdit, editingTransaction, activeModal]);

  const close = () => dispatch({ type: 'CLOSE_MODAL' });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = 'Enter a valid positive amount';
    if (!form.date) e.date = 'Date is required';
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const tx = {
      ...(isEdit ? { id: editingTransaction.id } : { id: Date.now().toString() }),
      date: form.date,
      description: form.description.trim(),
      category: form.category,
      type: form.type,
      amount: parseFloat(Number(form.amount).toFixed(2)),
    };
    dispatch({
      type: isEdit ? 'UPDATE_TRANSACTION' : 'ADD_TRANSACTION',
      payload: tx,
    });
    close();
  };

  // Filter categories by selected type
  const catOptions = CATEGORIES.filter((c) => c.type === form.type);

  // Reset category if it doesn't match new type
  useEffect(() => {
    const match = CATEGORIES.find((c) => c.id === form.category);
    if (match && match.type !== form.type) {
      setForm((f) => ({
        ...f,
        category: form.type === 'income' ? 'salary' : 'food',
      }));
    }
  }, [form.type]);

  if (activeModal !== 'add' && activeModal !== 'edit') return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="modal" id="transaction-modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <div className="modal-title">
            {isEdit ? '✏️ Edit Transaction' : '➕ Add Transaction'}
          </div>
          <button id="modal-close-btn" className="icon-btn" onClick={close} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Type toggle */}
            <div className="form-group">
              <label className="form-label">Type</label>
              <div className="type-toggle">
                <button
                  type="button"
                  id="type-income"
                  className={`type-btn income ${form.type === 'income' ? 'active' : ''}`}
                  onClick={() => set('type', 'income')}
                >
                  ↑ Income
                </button>
                <button
                  type="button"
                  id="type-expense"
                  className={`type-btn expense ${form.type === 'expense' ? 'active' : ''}`}
                  onClick={() => set('type', 'expense')}
                >
                  ↓ Expense
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="form-description">Description</label>
              <input
                id="form-description"
                type="text"
                className="form-input"
                placeholder="e.g. Grocery run, Monthly rent…"
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
              />
              {err.description && (
                <div style={{ color: 'var(--expense)', fontSize: '0.75rem', marginTop: 4 }}>{err.description}</div>
              )}
            </div>

            {/* Amount + Date */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="form-amount">Amount ($)</label>
                <input
                  id="form-amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  className="form-input"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) => set('amount', e.target.value)}
                />
                {err.amount && (
                  <div style={{ color: 'var(--expense)', fontSize: '0.75rem', marginTop: 4 }}>{err.amount}</div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="form-date">Date</label>
                <input
                  id="form-date"
                  type="date"
                  className="form-input"
                  value={form.date}
                  onChange={(e) => set('date', e.target.value)}
                />
                {err.date && (
                  <div style={{ color: 'var(--expense)', fontSize: '0.75rem', marginTop: 4 }}>{err.date}</div>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label" htmlFor="form-category">Category</label>
              <select
                id="form-category"
                className="form-select"
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
              >
                {catOptions.map((c) => (
                  <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" id="modal-cancel" className="btn btn-ghost" onClick={close}>Cancel</button>
            <button type="submit" id="modal-submit" className="btn btn-primary">
              {isEdit ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
