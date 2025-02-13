import { Transaction } from '../clients/ClientList';
import { useCurrency } from '../../context/CurrencyContext';

interface InsightsPanelProps {
  transactions: Transaction[];
}

export function InsightsPanel({ transactions }: InsightsPanelProps) {
  const { formatAmount } = useCurrency();

  // Calculate insights
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const topExpenseCategories = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const sortedCategories = Object.entries(topExpenseCategories)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Financial Insights</h3>
      
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {formatAmount(totalIncome)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {formatAmount(totalExpenses)}
            </p>
          </div>
        </div>

        {/* Top Expense Categories */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Top Expense Categories
          </h4>
          <div className="space-y-2">
            {sortedCategories.map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">{category}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatAmount(amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Rate */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Savings Rate
          </h4>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {totalIncome > 0 
                    ? `${Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)}%`
                    : '0%'
                  }
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ 
                  width: totalIncome > 0 
                    ? `${Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)}%`
                    : '0%'
                }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
