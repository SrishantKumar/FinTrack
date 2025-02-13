import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { MetricsGrid } from './components/metrics/MetricsGrid';
import { RevenueTrend } from './components/charts/RevenueTrend';
import { ExpenseBreakdown } from './components/charts/ExpenseBreakdown';
import { TransactionList } from './components/transactions/TransactionList';
import { DataSyncStatus } from './components/integration/DataSyncStatus';
import { QuickAddTransaction } from './components/transactions/QuickAddTransaction';
import { TeamSection } from './components/team/TeamSection';
import { ClientList } from './components/clients/ClientList';
import { CashBurnEducation } from './components/education/CashBurnEducation';
import { Footer } from './components/layout/Footer';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Header Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Financial Overview
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Track your startup's financial health and metrics
            </p>
            <div className="mt-4">
              <DataSyncStatus />
            </div>
          </div>

          {/* Metrics and Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <MetricsGrid />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <RevenueTrend />
            </div>
          </div>

          {/* Expense and Quick Add Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <ExpenseBreakdown />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <QuickAddTransaction />
            </div>
          </div>

          {/* Transactions Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <TransactionList />
          </div>

          {/* Client Profiles Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <ClientList />
          </div>

          {/* Education Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <CashBurnEducation />
          </div>

          {/* Team Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8" id="team-section">
            <TeamSection />
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}