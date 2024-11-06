import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert, FinancialData, AlertThresholds } from '../types/alerts';
import { DEFAULT_ALERT_THRESHOLDS, ALERT_CHECK_INTERVAL } from '../constants/alerts';
import { useTransactions } from './TransactionContext';
import { v4 as uuidv4 } from 'uuid';

interface AlertContextType {
  alerts: Alert[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissAlert: (id: string) => void;
  thresholds: AlertThresholds;
  updateThresholds: (newThresholds: Partial<AlertThresholds>) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [thresholds, setThresholds] = useState<AlertThresholds>(DEFAULT_ALERT_THRESHOLDS);
  const { transactions, cashBalance } = useTransactions();

  const calculateFinancialMetrics = (): FinancialData => {
    // Calculate burn rate (average monthly expenses over last 3 months)
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    const recentExpenses = transactions
      .filter(t => t.type === 'expense' && new Date(t.date) >= threeMonthsAgo)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const burnRate = recentExpenses / 3;

    // Calculate cash runway in months
    const cashRunway = burnRate > 0 ? cashBalance / burnRate : 12;

    // Calculate expense growth (compare current month to previous month)
    const currentMonth = new Date().getMonth();
    const currentYearExpenses = transactions
      .filter(t => 
        t.type === 'expense' && 
        new Date(t.date).getMonth() === currentMonth
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const lastMonth = (currentMonth - 1 + 12) % 12;
    const lastMonthExpenses = transactions
      .filter(t => 
        t.type === 'expense' && 
        new Date(t.date).getMonth() === lastMonth
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const expenseGrowth = lastMonthExpenses > 0 
      ? ((currentYearExpenses - lastMonthExpenses) / lastMonthExpenses) * 100 
      : 0;

    return {
      burnRate,
      cashRunway,
      expenseGrowth
    };
  };

  const checkForAlerts = () => {
    const metrics = calculateFinancialMetrics();
    const newAlerts: Alert[] = [];

    if (metrics.burnRate > thresholds.burnRate) {
      newAlerts.push({
        id: uuidv4(),
        type: 'danger',
        title: 'High Burn Rate',
        message: `Your monthly burn rate of $${metrics.burnRate.toLocaleString()} exceeds the threshold of $${thresholds.burnRate.toLocaleString()}.`,
        timestamp: Date.now(),
        isRead: false
      });
    }

    if (metrics.cashRunway < thresholds.cashRunway) {
      newAlerts.push({
        id: uuidv4(),
        type: 'danger',
        title: 'Low Cash Runway',
        message: `Your cash runway of ${metrics.cashRunway.toFixed(1)} months is below the minimum threshold of ${thresholds.cashRunway} months.`,
        timestamp: Date.now(),
        isRead: false
      });
    }

    if (metrics.expenseGrowth > thresholds.expenseGrowth) {
      newAlerts.push({
        id: uuidv4(),
        type: 'warning',
        title: 'High Expense Growth',
        message: `Your expense growth rate of ${metrics.expenseGrowth.toFixed(1)}% exceeds the threshold of ${thresholds.expenseGrowth}%.`,
        timestamp: Date.now(),
        isRead: false
      });
    }

    if (newAlerts.length > 0) {
      setAlerts(prev => [...newAlerts, ...prev].slice(0, 50)); // Keep last 50 alerts
    }
  };

  useEffect(() => {
    checkForAlerts();
    const interval = setInterval(checkForAlerts, ALERT_CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, [transactions, thresholds]);

  const markAsRead = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, isRead: true } : alert
      )
    );
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const updateThresholds = (newThresholds: Partial<AlertThresholds>) => {
    setThresholds(prev => ({ ...prev, ...newThresholds }));
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <AlertContext.Provider value={{
      alerts,
      unreadCount,
      markAsRead,
      markAllAsRead,
      dismissAlert,
      thresholds,
      updateThresholds
    }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
}