import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Clock } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';
import { useCurrency } from '../../context/CurrencyContext';
import { CashBalanceModal } from './CashBalanceModal';
import { BurnRateModal } from './BurnRateModal';
import { RevenueGrowthModal } from './RevenueGrowthModal';
import { RunwayModal } from './RunwayModal';
import { InsightsPanel } from '../insights/InsightsPanel';

const CurrencySymbols = () => {
  return (
    <>
      <span className="currency-symbol-3d" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>$</span>
      <span className="currency-symbol-3d" style={{ top: '30%', right: '10%', animationDelay: '1s' }}>€</span>
      <span className="currency-symbol-3d" style={{ bottom: '20%', left: '15%', animationDelay: '2s' }}>₹</span>
      <span className="currency-symbol-3d" style={{ bottom: '40%', right: '20%', animationDelay: '3s' }}>£</span>
    </>
  );
};

export function MetricsGrid() {
  const { transactions, cashBalance } = useTransactions();
  const { formatAmount } = useCurrency();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Calculate month-over-month changes
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Current month data
  const currentMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const currentMonthIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentMonthExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // Previous month data
  const previousMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return (date.getMonth() === (currentMonth - 1) && date.getFullYear() === currentYear) ||
           (currentMonth === 0 && date.getMonth() === 11 && date.getFullYear() === currentYear - 1);
  });

  const previousMonthIncome = previousMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const previousMonthExpenses = previousMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate percentage changes
  const calculateChange = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const cashBalanceChange = calculateChange(cashBalance, cashBalance - (currentMonthIncome - currentMonthExpenses));
  const burnRateChange = calculateChange(currentMonthExpenses, previousMonthExpenses);
  const revenueChange = calculateChange(currentMonthIncome, previousMonthIncome);

  // Calculate runway in months
  const averageMonthlyExpenses = currentMonthExpenses || 1; // Avoid division by zero
  const runwayMonths = Math.floor(cashBalance / averageMonthlyExpenses);
  const previousRunway = Math.floor((cashBalance - (currentMonthIncome - currentMonthExpenses)) / averageMonthlyExpenses);
  const runwayChange = calculateChange(runwayMonths, previousRunway);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cash Balance */}
        <button
          onClick={() => setActiveModal('cashBalance')}
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Cash Balance</h3>
              <DollarSign className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatAmount(cashBalance)}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Available funds</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </button>

        {/* Burn Rate */}
        <button
          onClick={() => setActiveModal('burnRate')}
          className="bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Monthly Burn Rate</h3>
              <TrendingDown className="h-5 w-5 text-red-500 dark:text-red-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatAmount(currentMonthExpenses)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
              {burnRateChange >= 0 ? '+' : ''}{burnRateChange}% vs last month
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-red-400/5 to-red-400/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </button>

        {/* Revenue Growth */}
        <button
          onClick={() => setActiveModal('revenueGrowth')}
          className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Revenue Growth</h3>
              <TrendingUp className="h-5 w-5 text-green-500 dark:text-green-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatAmount(currentMonthIncome)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
              {revenueChange >= 0 ? '+' : ''}{revenueChange}% vs last month
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/5 to-green-400/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </button>

        {/* Runway */}
        <button
          onClick={() => setActiveModal('runway')}
          className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Runway</h3>
              <Clock className="h-5 w-5 text-purple-500 dark:text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{runwayMonths} months</p>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">At current burn rate</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/5 to-purple-400/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </button>
      </div>

      {/* Insights Panel */}
      <div className="mt-8">
        <InsightsPanel transactions={transactions} />
      </div>

      {/* Modals */}
      {activeModal === 'cashBalance' && (
        <CashBalanceModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'burnRate' && (
        <BurnRateModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'revenueGrowth' && (
        <RevenueGrowthModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'runway' && (
        <RunwayModal onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}