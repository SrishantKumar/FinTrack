import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Clock } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';
import { useCurrency } from '../../context/CurrencyContext';
import { CashBalanceModal } from './CashBalanceModal';
import { BurnRateModal } from './BurnRateModal';
import { RevenueGrowthModal } from './RevenueGrowthModal';
import { RunwayModal } from './RunwayModal';
import { InsightsPanel } from '../insights/InsightsPanel';

export function MetricsGrid() {
  const { totalIncome, totalExpenses, cashBalance } = useTransactions();
  const { formatAmount } = useCurrency();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const metrics = [
    {
      name: 'Cash Balance',
      value: formatAmount(cashBalance),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign
    },
    {
      name: 'Monthly Burn Rate',
      value: formatAmount(totalExpenses),
      change: '-8.2%',
      trend: 'down',
      icon: TrendingDown
    },
    {
      name: 'Revenue Growth',
      value: formatAmount(totalIncome),
      change: '+2.3%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      name: 'Runway',
      value: '18 months',
      change: '+2 months',
      trend: 'up',
      icon: Clock
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setActiveModal(metric.name)}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <metric.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className={`text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {metric.change}
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