import React from 'react';
import { PieChart } from 'lucide-react';

const expenses = [
  { category: 'Payroll', amount: 45000, color: 'bg-blue-500' },
  { category: 'Marketing', amount: 15000, color: 'bg-green-500' },
  { category: 'Infrastructure', amount: 12000, color: 'bg-yellow-500' },
  { category: 'Office', amount: 8000, color: 'bg-purple-500' },
  { category: 'Other', amount: 5000, color: 'bg-gray-500' }
];

export function ExpenseBreakdown() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Expense Breakdown</h3>
          <p className="text-sm text-gray-500">Current month</p>
        </div>
        <PieChart className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {expenses.map((expense) => (
          <div key={expense.category}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900">{expense.category}</span>
              <span className="text-sm text-gray-500">
                ${expense.amount.toLocaleString()}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div
                className={`h-full rounded-full ${expense.color}`}
                style={{ width: `${(expense.amount / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}