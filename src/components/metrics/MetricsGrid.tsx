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

  const metrics = [
    {
      name: 'Cash Balance',
      value: formatAmount(cashBalance),
      change: cashBalanceChange,
      trend: cashBalanceChange >= 0 ? 'up' : 'down',
      icon: DollarSign,
      animation: 'animate-float'
    },
    {
      name: 'Monthly Burn Rate',
      value: formatAmount(currentMonthExpenses),
      change: burnRateChange,
      trend: burnRateChange <= 0 ? 'up' : 'down', // Lower burn rate is better
      icon: TrendingDown,
      animation: 'animate-float'
    },
    {
      name: 'Revenue Growth',
      value: formatAmount(currentMonthIncome),
      change: revenueChange,
      trend: revenueChange >= 0 ? 'up' : 'down',
      icon: TrendingUp,
      animation: 'animate-float'
    },
    {
      name: 'Runway',
      value: `${runwayMonths} months`,
      change: runwayChange,
      trend: runwayChange >= 0 ? 'up' : 'down',
      icon: Clock,
      animation: 'animate-float'
    }
  ];

  const getModalComponent = () => {
    switch (activeModal) {
      case 'Cash Balance':
        return <CashBalanceModal onClose={() => setActiveModal(null)} />;
      case 'Monthly Burn Rate':
        return <BurnRateModal onClose={() => setActiveModal(null)} />;
      case 'Revenue Growth':
        return <RevenueGrowthModal onClose={() => setActiveModal(null)} />;
      case 'Runway':
        return <RunwayModal onClose={() => setActiveModal(null)} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CurrencySymbols />
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-all transform hover:-translate-y-1 duration-300"
            onClick={() => setActiveModal(metric.name)}
          >
            <div className="flex items-center justify-between">
              <div className={`p-2 bg-blue-50 dark:bg-blue-900 rounded-lg icon-3d ${metric.animation}`}>
                <metric.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className={`text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(1)}%
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{metric.name}</p>
          </div>
        ))}
      </div>

      <InsightsPanel />

      {getModalComponent()}
    </>
  );
}