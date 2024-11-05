import { Navbar } from '../components/layout/Navbar';
import { MetricsGrid } from '../components/metrics/MetricsGrid';
import { RevenueTrend } from '../components/charts/RevenueTrend';
import { ExpenseBreakdown } from '../components/charts/ExpenseBreakdown';
import { TransactionList } from '../components/transactions/TransactionList';
import { DataSyncStatus } from '../components/integration/DataSyncStatus';
import { QuickAddTransaction } from '../components/transactions/QuickAddTransaction';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Financial Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track your startup's financial health and metrics
          </p>
        </div>

        <DataSyncStatus />
        <MetricsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RevenueTrend />
          <ExpenseBreakdown />
        </div>

        <QuickAddTransaction />
        <TransactionList />
      </main>
    </div>
  );
}