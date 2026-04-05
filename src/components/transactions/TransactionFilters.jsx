import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';

const expenseCategories = CATEGORIES.filter((c) => c.type === 'expense');
const incomeCategories  = CATEGORIES.filter((c) => c.type === 'income');
const allCategories     = [...incomeCategories, ...expenseCategories];

export default function TransactionFilters({ resultCount, total }) {
  const { state, dispatch } = useApp();
  const { filters } = state;

  const set = (partial) => dispatch({ type: 'SET_FILTER', payload: partial });
  const reset = () => dispatch({ type: 'RESET_FILTERS' });

  const hasActiveFilters =
    filters.search || filters.type !== 'all' || filters.category !== 'all' ||
    filters.dateFrom || filters.dateTo;

  return (
    <div className="filters-bar" id="filters-bar">
      {/* Search */}
      <div className="search-input-wrap">
        <span className="search-icon"><Search size={14} /></span>
        <input
          id="filter-search"
          type="text"
          className="search-input"
          placeholder="Search transactions…"
          value={filters.search}
          onChange={(e) => set({ search: e.target.value })}
        />
      </div>

      {/* Type */}
      <select
        id="filter-type"
        className="filter-select"
        value={filters.type}
        onChange={(e) => set({ type: e.target.value, category: 'all' })}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expenses</option>
      </select>

      {/* Category */}
      <select
        id="filter-category"
        className="filter-select"
        value={filters.category}
        onChange={(e) => set({ category: e.target.value })}
      >
        <option value="all">All Categories</option>
        {(filters.type === 'income' ? incomeCategories : filters.type === 'expense' ? expenseCategories : allCategories).map((c) => (
          <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
        ))}
      </select>

      {/* Date from */}
      <input
        id="filter-date-from"
        type="date"
        className="date-input"
        value={filters.dateFrom}
        onChange={(e) => set({ dateFrom: e.target.value })}
        title="From date"
      />

      {/* Date to */}
      <input
        id="filter-date-to"
        type="date"
        className="date-input"
        value={filters.dateTo}
        onChange={(e) => set({ dateTo: e.target.value })}
        title="To date"
      />

      {/* Reset */}
      {hasActiveFilters && (
        <button id="btn-reset-filters" className="btn btn-ghost btn-sm" onClick={reset}>
          <RotateCcw size={13} /> Reset
        </button>
      )}

      <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
        {resultCount} of {total}
      </div>
    </div>
  );
}
