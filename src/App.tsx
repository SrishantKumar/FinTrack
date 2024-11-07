import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { MetricsGrid } from './components/metrics/MetricsGrid';
import { RevenueTrend } from './components/charts/RevenueTrend';
import { ExpenseBreakdown } from './components/charts/ExpenseBreakdown';
import { TransactionList } from './components/transactions/TransactionList';
import { DataSyncStatus } from './components/integration/DataSyncStatus';
import { QuickAddTransaction } from './components/transactions/QuickAddTransaction';
import { TeamSection } from './components/team/TeamSection';
import { CashBurnEducation } from './components/education/CashBurnEducation';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { useAuth } from './context/AuthContext';
import { Footer } from './components/layout/Footer';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return currentUser ? <>{children}</> : <Navigate to="/login" />;
}

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Routes>
          <Route path="/login" element={<><Login /><Footer /></>} />
          <Route path="/signup" element={<><SignUp /><Footer /></>} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
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
                    <CashBurnEducation />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                      <RevenueTrend />
                      <ExpenseBreakdown />
                    </div>

                    <QuickAddTransaction />
                    <TransactionList />
                    <TeamSection />
                  </main>
                  <Footer />
                </>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}