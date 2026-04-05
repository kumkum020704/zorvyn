import React from 'react';
import { useApp } from '../context/AppContext';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionList from '../components/transactions/TransactionList';
import AddEditTransactionModal from '../components/transactions/AddEditTransactionModal';
import { Plus } from 'lucide-react';

export default function TransactionsPage() {
  const { state, dispatch, filteredTransactions } = useApp();
  const isAdmin = state.role === 'admin';

  const openAddModal = () =>
    dispatch({ type: 'OPEN_MODAL', payload: { modal: 'add' } });

  return (
    <div className="page-content">
      <div className="section-header">
        <div>
          <div className="section-title">All Transactions</div>
          <div className="section-subtitle">
            {state.transactions.length} total records
          </div>
        </div>
        {isAdmin && (
          <button
            id="btn-add-transaction"
            className="btn btn-primary"
            onClick={openAddModal}
          >
            <Plus size={16} /> Add Transaction
          </button>
        )}
      </div>

      <TransactionFilters
        resultCount={filteredTransactions.length}
        total={state.transactions.length}
      />

      <TransactionList transactions={filteredTransactions} />

      <AddEditTransactionModal />
    </div>
  );
}
