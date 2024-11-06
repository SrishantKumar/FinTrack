import { PieChart } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';
import { useCurrency } from '../../context/CurrencyContext';

export function ExpenseBreakdown() {
  const { transactions } = useTransactions();
  const { formatAmount } = useCurrency();

  // Get current month's expenses
  const currentDate = new Date();
  const currentMonthExpenses = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return t.type === 'expense' &&
           transactionDate.getMonth() === currentDate.getMonth() &&
           transactionDate.getFullYear() === currentDate.getFullYear();
  });

  // Group expenses by category
  const expensesByCategory = currentMonthExpenses.reduce((acc: { [key: string]: number }, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const expenses = Object.entries(expensesByCategory).map(([category, amount]) => ({
    category,
    amount,
    color: getCategoryColor(category)
  }));

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  function getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'Payroll': 'bg-blue-500',
      'Marketing': 'bg-green-500',
      'Infrastructure': 'bg-yellow-500',
      'Office': 'bg-purple-500',
      'Other': 'bg-gray-500'
    };
    return colors[category] || 'bg-gray-500';
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Expense Breakdown</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Current month</p>
        </div>
        <PieChart className="h-5 w-5 text-gray-400 dark:text-gray-500" />
      </div>

      <div className="space-y-4">
        {expenses.map((expense) => (
          <div key={expense.category}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {expense.category}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatAmount(expense.amount)}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <div
                className={`h-full rounded-full ${expense.color}`}
                style={{ width: `${(expense.amount / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}