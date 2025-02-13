import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Filter, Search, Loader2, AlertCircle, ChevronDown } from 'lucide-react';
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
  const [showAllTransactions, setShowAllTransactions] = useState(false);
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

  const filteredTransactions = transactions
    .filter(filterTransactions)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const displayedTransactions = showAllTransactions
    ? filteredTransactions
    : filteredTransactions.slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Transactions</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {showAllTransactions 
              ? `Showing all ${filteredTransactions.length} transactions`
              : `Showing last 10 of ${filteredTransactions.length} transactions`}
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value as FilterState['type'] })}
            className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={filters.dateRange}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value as FilterState['dateRange'] })}
            className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center gap-2 p-4 text-red-800 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <p>Error loading transactions. Please try again later.</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Transactions List */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                {displayedTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="group hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">
                      {transaction.description}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">
                      {transaction.category}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-right">
                      <span className="flex items-center justify-end gap-1">
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        )}
                        <span
                          className={
                            transaction.type === 'income'
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }
                        >
                          {formatAmount(transaction.amount)}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredTransactions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
              </div>
            )}
          </div>

          {/* View All Button */}
          {!showAllTransactions && filteredTransactions.length > 10 && (
            <button
              onClick={() => setShowAllTransactions(true)}
              className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              View All Transactions
              <ChevronDown className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}