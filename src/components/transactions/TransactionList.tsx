import React, { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Filter, Search, Loader2, AlertCircle } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';
import { useCurrency } from '../../context/CurrencyContext';

interface FilterState {
  type: 'all' | 'income' | 'expense';
  category: string;
  dateRange: 'all' | 'today' | 'week' | 'month' | 'year';
}

export function TransactionList() {
  const { transactions, loading, error } = useTransactions();
  const { formatAmount } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    category: 'all',
    dateRange: 'all'
  });

  const categories = ['all', ...new Set(transactions.map(t => t.category))];

  const filterTransactions = (transaction: any) => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = 
      filters.type === 'all' || transaction.type === filters.type;

    const matchesCategory = 
      filters.category === 'all' || transaction.category === filters.category;

    const transactionDate = new Date(transaction.date);
    const today = new Date();
    const matchesDate = (() => {
      switch (filters.dateRange) {
        case 'today':
          return transactionDate.toDateString() === today.toDateString();
        case 'week':
          const weekAgo = new Date(today.setDate(today.getDate() - 7));
          return transactionDate >= weekAgo;
        case 'month':
          return (
            transactionDate.getMonth() === today.getMonth() &&
            transactionDate.getFullYear() === today.getFullYear()
          );
        case 'year':
          return transactionDate.getFullYear() === today.getFullYear();
        default:
          return true;
      }
    })();

    return matchesSearch && matchesType && matchesCategory && matchesDate;
  };

  const filteredTransactions = transactions.filter(filterTransactions);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading transactions...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-8">
        <div className="flex items-center justify-center text-red-500">
          <AlertCircle className="h-8 w-8" />
          <span className="ml-2">Error loading transactions. Please try again later.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
        <div className="mt-4 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 border rounded-lg flex items-center gap-2 transition-colors ${
              showFilters
                ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400'
                : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as FilterState['type'] }))}
                  className="w-full rounded-lg border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  <option value="all">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full rounded-lg border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value as FilterState['dateRange'] }))}
                  className="w-full rounded-lg border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {filteredTransactions.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            No transactions found matching your filters.
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="h-5 w-5 text-green-600 dark:text-green-300" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-red-600 dark:text-red-300" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{transaction.description}</h3>
                  <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{transaction.date}</span>
                    <span>•</span>
                    <span>{transaction.category}</span>
                    <span>•</span>
                    <span className="capitalize">{transaction.status}</span>
                  </div>
                </div>
              </div>
              <div className={`font-medium ${
                transaction.type === 'income' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}
                {formatAmount(transaction.amount)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}