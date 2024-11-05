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
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { useAuth } from './context/AuthContext';

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <>
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
                    <TeamSection />
                  </main>
                </>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}