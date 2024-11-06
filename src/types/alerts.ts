export interface FinancialData {
  burnRate: number;
  cashRunway: number;
  expenseGrowth: number;
}

export interface Alert {
  id: string;
  type: 'warning' | 'danger' | 'info';
  title: string;
  message: string;
  timestamp: number;
  isRead: boolean;
}

export interface AlertThresholds {
  burnRate: number;
  cashRunway: number;
  expenseGrowth: number;
}