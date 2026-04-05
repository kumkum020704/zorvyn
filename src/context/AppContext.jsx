import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { DEFAULT_TRANSACTIONS } from '../data/mockData';

const LS_KEY = 'finance_dashboard_state';

const defaultFilters = {
  search: '',
  type: 'all',
  category: 'all',
  dateFrom: '',
  dateTo: '',
  sortBy: 'date',
  sortDir: 'desc',
};

function getInitialState() {
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        transactions: parsed.transactions || DEFAULT_TRANSACTIONS,
        role: parsed.role || 'admin',
        theme: parsed.theme || 'dark',
        filters: defaultFilters,
        activeModal: null,
        editingTransaction: null,
      };
    }
  } catch (e) {}
  return {
    transactions: DEFAULT_TRANSACTIONS,
    role: 'admin',
    theme: 'dark',
    filters: defaultFilters,
    activeModal: null,
    editingTransaction: null,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case 'RESET_FILTERS':
      return { ...state, filters: defaultFilters };

    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };

    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case 'OPEN_MODAL':
      return { ...state, activeModal: action.payload.modal, editingTransaction: action.payload.transaction || null };

    case 'CLOSE_MODAL':
      return { ...state, activeModal: null, editingTransaction: null };

    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, getInitialState);

  // Persist to localStorage (excluding UI-only fields)
  useEffect(() => {
    const toSave = {
      transactions: state.transactions,
      role: state.role,
      theme: state.theme,
    };
    localStorage.setItem(LS_KEY, JSON.stringify(toSave));
  }, [state.transactions, state.role, state.theme]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  // Derived: filtered + sorted transactions
  const filteredTransactions = React.useMemo(() => {
    const { search, type, category, dateFrom, dateTo, sortBy, sortDir } = state.filters;
    let result = [...state.transactions];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    if (type !== 'all') result = result.filter((t) => t.type === type);
    if (category !== 'all') result = result.filter((t) => t.category === category);
    if (dateFrom) result = result.filter((t) => t.date >= dateFrom);
    if (dateTo) result = result.filter((t) => t.date <= dateTo);

    result.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (sortBy === 'amount') {
        valA = Number(valA);
        valB = Number(valB);
      }
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [state.transactions, state.filters]);

  return (
    <AppContext.Provider value={{ state, dispatch, filteredTransactions }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};
