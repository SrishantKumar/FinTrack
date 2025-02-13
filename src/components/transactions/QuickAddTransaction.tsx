import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';

const categories = {
  income: ['Revenue', 'Investment', 'Other Income'],
  expense: ['Payroll', 'Marketing', 'Infrastructure', 'Office', 'Other']
};

const suggestedAmounts = [1000, 5000, 10000, 25000, 50000];

export function QuickAddTransaction() {
  const { addTransaction } = useTransactions();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await addTransaction({
        type,
        description,
        amount: parseFloat(amount),
        category,
        date
      });

      // Reset form
      setDescription('');
      setAmount('');
      setCategory('');
      setDate(new Date().toISOString().split('T')[0]);
      setIsOpen(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  if (!isOpen) {
    return (
      <div className="h-full flex flex-col">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Add</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="flex-1 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all group flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
          <span className="font-medium text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400">
            Add New Transaction
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add Transaction</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="space-y-4 flex-1">
          {/* Transaction Type */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setType('income')}
              className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                type === 'income'
                  ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                type === 'expense'
                  ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-700 dark:text-red-400'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              Expense
            </button>
          </div>

          {/* Description */}
          <div>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          {/* Amount */}
          <div>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {suggestedAmounts.map((suggestedAmount) => (
                <button
                  key={suggestedAmount}
                  type="button"
                  onClick={() => setAmount(suggestedAmount.toString())}
                  className="px-2 py-1 text-sm rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {suggestedAmount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <option value="">Select Category</option>
              {categories[type].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full p-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}