import { DollarSign, Calendar } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';
import { useCurrency } from '../../context/CurrencyContext';
import { InsightsPanel } from './InsightsPanel';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

function MetricCard({ title, value, icon, onClick }: MetricCardProps) {
  return (
    <button
      onClick={onClick}
      className="relative p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            {icon}
          </div>
          <div className="text-left">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

export function MetricsGrid() {
  const { transactions } = useTransactions();
  const { formatAmount } = useCurrency();

  // Calculate metrics
  const currentMonthIncome = transactions
    .filter(t => t.type === 'income' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0);

  const currentMonthExpenses = transactions
    .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0);

  const cashBalance = currentMonthIncome - currentMonthExpenses;

  const averageMonthlyExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0) / 12;

  const runwayMonths = Math.floor(Math.max(0, cashBalance / averageMonthlyExpenses));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <MetricCard
          title="Cash Balance"
          value={formatAmount(cashBalance)}
          icon={<DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
        />
        <MetricCard
          title="Runway"
          value={`${runwayMonths} months`}
          icon={<Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
        />
      </div>

      <InsightsPanel transactions={transactions} />
    </div>
  );
}