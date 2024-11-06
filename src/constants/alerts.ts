export const DEFAULT_ALERT_THRESHOLDS = {
  burnRate: 50000, // Monthly burn rate threshold in currency
  cashRunway: 6, // Minimum runway in months
  expenseGrowth: 15 // Maximum monthly expense growth percentage
};

export const ALERT_CHECK_INTERVAL = 1000 * 60 * 5; // Check every 5 minutes